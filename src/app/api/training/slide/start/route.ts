import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { getModule } from '@/data/index';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase-token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;
    const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map((s) => s.trim().toLowerCase());
    const isAdmin = adminEmails.includes(decoded.email?.toLowerCase() ?? '');

    const { moduleId, slideIndex } = await req.json();
    if (typeof moduleId !== 'string' || typeof slideIndex !== 'number') {
      return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
    }

    const mod = getModule(moduleId);
    if (!mod) return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    if (slideIndex < 0 || slideIndex >= mod.slides.length) {
      return NextResponse.json({ error: 'Slide index out of range' }, { status: 400 });
    }

    // Verify portal access
    const accessDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('training_portal').get();
    if (!accessDoc.exists || !accessDoc.data()?.granted) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Verify module unlock (1-week rule between modules) — bypassed for admins
    if (!isAdmin && mod.num > 1) {
      const prevMod = (await import('@/data/index')).ALL_MODULES.find((m) => m.num === mod.num - 1);
      if (prevMod) {
        const prevProgress = await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(prevMod.id).get();
        const prevData = prevProgress.data();
        if (!prevData?.completedAt) {
          return NextResponse.json({ error: 'Previous module not completed' }, { status: 403 });
        }
        const completedAt = prevData.completedAt.toDate ? prevData.completedAt.toDate() : new Date(prevData.completedAt);
        const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - completedAt.getTime() < oneWeekMs) {
          return NextResponse.json({ error: 'Must wait 1 week after completing previous module', unlockAt: new Date(completedAt.getTime() + oneWeekMs).toISOString() }, { status: 403 });
        }
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
