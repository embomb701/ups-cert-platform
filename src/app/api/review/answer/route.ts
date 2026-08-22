import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { recordMiss, applyReviewAnswer } from '@/lib/exam/spacedRepetition';

export const dynamic = 'force-dynamic';

// POST /api/review/answer — submit one answer during a review session.
// Unlike a real or practice exam, review mode gives immediate feedback
// (correct answer + explanation) since it's a study aid, not a graded
// attempt — nothing here issues a score, a certificate, or counts toward
// any cooldown.
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let uid: string;
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const { questionId, selectedChoiceId } = body as { questionId?: string; selectedChoiceId?: string };
    if (!questionId || typeof questionId !== 'string') {
      return NextResponse.json({ error: 'questionId is required' }, { status: 400 });
    }

    const questionSnap = await adminDb.collection('questionBank').doc(questionId).get();
    if (!questionSnap.exists) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }
    const question = questionSnap.data()!;
    const correct = !!selectedChoiceId && selectedChoiceId === question.correctAnswerId;

    const ref = adminDb.collection('users').doc(uid).collection('missedQuestions').doc(questionId);
    const existingSnap = await ref.get();
    const now = new Date();

    let box: number;
    let mastered: boolean;
    let nextReviewAt: Date;

    if (existingSnap.exists) {
      const data = existingSnap.data()!;
      if (data.mastered) {
        // Already mastered (e.g. answered again via a stale client) — no-op the schedule.
        box = data.box ?? 5;
        mastered = true;
        nextReviewAt = data.nextReviewAt?.toDate?.() ?? now;
      } else {
        const result = correct
          ? applyReviewAnswer({ box: data.box ?? 1, mastered: false }, true, now)
          : recordMiss(now);
        box = result.box;
        mastered = result.mastered;
        nextReviewAt = result.nextReviewAt;
        await ref.update({
          timesWrong: correct ? (data.timesWrong ?? 0) : (data.timesWrong ?? 0) + 1,
          box,
          mastered,
          nextReviewAt,
          lastAnsweredAt: now,
          ...(mastered ? { masteredAt: now } : {}),
        });
      }
    } else {
      // Being answered via review mode without a tracked record — treat a
      // wrong answer as a fresh miss; a correct answer with nothing to
      // track means there's nothing to write.
      if (correct) {
        return NextResponse.json({
          correct: true,
          correctAnswerId: question.correctAnswerId,
          explanation: question.explanation,
          box: null,
          mastered: false,
        });
      }
      const result = recordMiss(now);
      box = result.box;
      mastered = result.mastered;
      nextReviewAt = result.nextReviewAt;
      await ref.set({
        questionId,
        examLevel: question.examLevel,
        category: question.category,
        timesWrong: 1,
        box,
        mastered,
        firstMissedAt: now,
        lastAnsweredAt: now,
        nextReviewAt,
      });
    }

    return NextResponse.json({
      correct,
      correctAnswerId: question.correctAnswerId,
      explanation: question.explanation,
      box,
      mastered,
    });
  } catch (err) {
    console.error('Review answer error:', err);
    return NextResponse.json({ error: 'Failed to record answer' }, { status: 500 });
  }
}
