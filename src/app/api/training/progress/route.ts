import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { ALL_MODULES } from '@/data/index';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase-token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const accessDoc = await adminDb
      .collection('users')
      .doc(uid)
      .collection('examAccess')
      .doc('training_portal')
      .get();

    if (!accessDoc.exists || !accessDoc.data()?.granted) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const progressSnap = await adminDb
      .collection('users')
      .doc(uid)
      .collection('trainingProgress')
      .get();

    const progress: Record<string, unknown> = {};
    progressSnap.forEach((doc) => {
      progress[doc.id] = doc.data();
    });

    return NextResponse.json({ progress, modules: ALL_MODULES.map((m) => ({ id: m.id, num: m.num, title: m.title, desc: m.desc, slideCount: m.slides.length })) });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
