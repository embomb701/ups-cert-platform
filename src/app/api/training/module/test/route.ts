import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { getModule, ALL_MODULES } from '@/data/index';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase-token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const { moduleId, answers } = await req.json();
    if (typeof moduleId !== 'string' || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
    }

    const mod = getModule(moduleId);
    if (!mod) return NextResponse.json({ error: 'Module not found' }, { status: 404 });

    const progressDoc = await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).get();
    const data = progressDoc.data() ?? {};

    // All slides must be completed first
    const completedSlides: number[] = data.completedSlides ?? [];
    for (let i = 0; i < mod.slides.length; i++) {
      if (!completedSlides.includes(i)) {
        return NextResponse.json({ error: `Slide ${i} must be completed before taking the module test` }, { status: 403 });
      }
    }

    // Once-per-day rule
    const lastTestAt = data.lastTestAt;
    if (lastTestAt) {
      const lastDate = lastTestAt.toDate ? lastTestAt.toDate() : new Date(lastTestAt);
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      if (lastDate >= midnight) {
        return NextResponse.json({ error: 'Module test can only be taken once per day', nextAvailableAt: new Date(midnight.getTime() + 24 * 60 * 60 * 1000).toISOString() }, { status: 429 });
      }
    }

    // Score the test (must be 100%)
    if (answers.length !== mod.test.length) {
      return NextResponse.json({ error: 'Answer count mismatch' }, { status: 400 });
    }

    const results = mod.test.map((q, i) => ({
      correct: answers[i] === q.correct,
      correctAnswer: q.correct,
      explanation: q.exp,
    }));

    const allCorrect = results.every((r) => r.correct);

    // Always record last test attempt (resets the daily limit)
    const updateData: Record<string, unknown> = {
      lastTestAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      testAttempts: FieldValue.increment(1),
    };

    if (allCorrect) {
      updateData.completedAt = FieldValue.serverTimestamp();
      updateData.passed = true;
    } else {
      // Must redo all slides before retrying
      updateData.completedSlides = [];
    }

    await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).set(updateData, { merge: true });

    if (!allCorrect) {
      return NextResponse.json({
        passed: false,
        results,
        message: 'You must score 100% to pass. You must complete all slides again before retrying tomorrow.',
      });
    }

    // Check if ALL 24 modules are now complete — if so, unlock Jr. FSE exam
    let trainingComplete = false;
    if (mod.num === ALL_MODULES.length) {
      // This was the last module — verify all others are complete too
      const allProgressSnap = await adminDb.collection('users').doc(uid).collection('trainingProgress').get();
      const completedIds = new Set<string>();
      allProgressSnap.forEach((doc) => {
        const d = doc.data();
        if (d.passed && d.completedAt) completedIds.add(doc.id);
      });
      // Include the current module we just passed
      completedIds.add(moduleId);
      trainingComplete = ALL_MODULES.every((m) => completedIds.has(m.id));
    } else {
      // Fast check: count completed modules
      const allProgressSnap = await adminDb.collection('users').doc(uid).collection('trainingProgress').get();
      const completedIds = new Set<string>();
      allProgressSnap.forEach((doc) => {
        const d = doc.data();
        if (d.passed && d.completedAt) completedIds.add(doc.id);
      });
      completedIds.add(moduleId);
      trainingComplete = ALL_MODULES.every((m) => completedIds.has(m.id));
    }

    if (trainingComplete) {
      // Grant Jr. FSE exam access (from training path, not test-out)
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fse_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fse').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    return NextResponse.json({ passed: true, results, trainingComplete });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
