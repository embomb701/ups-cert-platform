import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { getModule } from '@/data/index';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { getGrantedCourseKeys, moduleUnlockState } from '@/lib/utils/trainingAccess';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase-token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;
    const isAdmin = await checkIsAdmin(uid, decoded.email ?? '');

    const { moduleId, slideIndex } = await req.json();
    if (typeof moduleId !== 'string' || typeof slideIndex !== 'number') {
      return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
    }

    const mod = getModule(moduleId);
    if (!mod) return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    if (slideIndex < 0 || slideIndex >= mod.slides.length) {
      return NextResponse.json({ error: 'Slide index out of range' }, { status: 400 });
    }

    // Verify course access — free trial allows slide 0 of modules 1-3
    const isFreeTrialSlide = mod.num <= 3 && slideIndex === 0;
    let grantedKeys: string[] = [];
    if (!isAdmin) {
      grantedKeys = await getGrantedCourseKeys(uid, mod);
      if (!isFreeTrialSlide && grantedKeys.length === 0) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }
    }

    // Verify module unlock (3-day rule within the user's enrolled course
    // sequence) — bypassed for admins and free trial
    if (!isAdmin && !isFreeTrialSlide && mod.num > 1) {
      const state = await moduleUnlockState(uid, mod, grantedKeys);
      if (state.locked) {
        if (state.unlockDate) {
          return NextResponse.json({ error: 'Must wait 3 days after completing previous module', unlockAt: state.unlockDate.toISOString() }, { status: 403 });
        }
        return NextResponse.json({ error: 'Previous module not completed' }, { status: 403 });
      }
    }

    // Verify previous slides completed — bypassed for admins
    if (!isAdmin && slideIndex > 0) {
      const modProgress = await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).get();
      const data = modProgress.data() ?? {};
      const completedSlides: number[] = data.completedSlides ?? [];
      for (let i = 0; i < slideIndex; i++) {
        if (!completedSlides.includes(i)) {
          return NextResponse.json({ error: `Slide ${i} not completed` }, { status: 403 });
        }
      }
    }

    // Record slide start time
    const slideKey = `slide_${slideIndex}_startedAt`;
    await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).set(
      { [slideKey]: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
