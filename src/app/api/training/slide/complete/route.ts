import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { getModule } from '@/data/index';
import { FieldValue } from 'firebase-admin/firestore';

const SLIDE_MIN_SECONDS = 300; // 5 minutes

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase-token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;
    const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map((s) => s.trim().toLowerCase());
    const isAdmin = adminEmails.includes(decoded.email?.toLowerCase() ?? '');

    const { moduleId, slideIndex, answers } = await req.json();
    if (typeof moduleId !== 'string' || typeof slideIndex !== 'number' || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
    }

    const mod = getModule(moduleId);
    if (!mod) return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    if (slideIndex < 0 || slideIndex >= mod.slides.length) {
      return NextResponse.json({ error: 'Slide index out of range' }, { status: 400 });
    }

    const slide = mod.slides[slideIndex];

    // Verify 5-minute minimum time (bypassed for admins)
    const progressDoc = await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).get();
    const data = progressDoc.data() ?? {};
    if (!isAdmin) {
      const slideKey = `slide_${slideIndex}_startedAt`;
      const startedAt = data[slideKey];
      if (!startedAt) {
        return NextResponse.json({ error: 'Slide not started' }, { status: 400 });
      }
      const startedDate = startedAt.toDate ? startedAt.toDate() : new Date(startedAt);
      const elapsedSeconds = (Date.now() - startedDate.getTime()) / 1000;
      if (elapsedSeconds < SLIDE_MIN_SECONDS) {
        return NextResponse.json({ error: 'Minimum 5 minutes required', secondsRemaining: Math.ceil(SLIDE_MIN_SECONDS - elapsedSeconds) }, { status: 403 });
      }
    }

    // Score the section quiz (must be 100%)
    if (answers.length !== slide.quiz.length) {
      return NextResponse.json({ error: 'Answer count mismatch' }, { status: 400 });
    }

    const results = slide.quiz.map((q, i) => ({
      correct: answers[i] === q.correct,
      correctAnswer: q.correct,
      explanation: q.exp,
    }));

    const allCorrect = results.every((r) => r.correct);

    if (!allCorrect) {
      return NextResponse.json({ passed: false, results });
    }

    // Mark slide complete
    const completedSlides: number[] = data.completedSlides ?? [];
    if (!completedSlides.includes(slideIndex)) completedSlides.push(slideIndex);

    await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).set(
      { completedSlides, [`slide_${slideIndex}_completedAt`]: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );

    return NextResponse.json({ passed: true, results });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
