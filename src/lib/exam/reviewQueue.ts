/**
 * Missed-question review queue — server-side only (uses firebase-admin).
 *
 * Called after every scored *practice* attempt to update each answered
 * question's spaced-repetition state in users/{uid}/missedQuestions/{id}:
 *   - Wrong answer  → upsert the record, reset to box 1 (see spacedRepetition.ts).
 *   - Right answer  → if the question was already in the queue, advance its
 *     box (or mark it mastered); if it was never missed, do nothing — only
 *     questions a student has actually gotten wrong are tracked.
 *
 * A full retake of a practice test therefore doubles as a review pass on
 * top of the dedicated review-session flow.
 */

import type { Firestore } from 'firebase-admin/firestore';
import { recordMiss, applyReviewAnswer } from './spacedRepetition';
import type { ExamAnswer, ExamLevel } from '@/types';

interface AnsweredQuestion {
  id: string;
  category: string;
  correctAnswerId: string;
}

export async function recordPracticeMisses(
  adminDb: Firestore,
  uid: string,
  examLevel: ExamLevel,
  questions: AnsweredQuestion[],
  answers: ExamAnswer[]
): Promise<void> {
  if (questions.length === 0) return;

  const now = new Date();
  const answerByQuestionId = new Map(answers.map((a) => [a.questionId, a]));
  const missedCollection = adminDb.collection('users').doc(uid).collection('missedQuestions');

  const refs = questions.map((q) => missedCollection.doc(q.id));
  const existingSnaps = await adminDb.getAll(...refs);
  const existingById = new Map(existingSnaps.map((snap) => [snap.id, snap]));

  const batch = adminDb.batch();
  let writes = 0;

  for (const q of questions) {
    const userAnswer = answerByQuestionId.get(q.id);
    const correct = userAnswer?.selectedChoiceId === q.correctAnswerId;
    const existingSnap = existingById.get(q.id);
    const ref = missedCollection.doc(q.id);

    if (!correct) {
      if (existingSnap?.exists) {
        const data = existingSnap.data()!;
        const { box, mastered, nextReviewAt } = recordMiss(now);
        batch.update(ref, {
          timesWrong: (data.timesWrong ?? 0) + 1,
          box,
          mastered,
          nextReviewAt,
          lastAnsweredAt: now,
        });
      } else {
        batch.set(ref, {
          questionId: q.id,
          examLevel,
          category: q.category,
          timesWrong: 1,
          box: 1,
          mastered: false,
          firstMissedAt: now,
          lastAnsweredAt: now,
          nextReviewAt: now,
        });
      }
      writes++;
      continue;
    }

    // Correct answer — only matters if this question was already being tracked.
    if (existingSnap?.exists) {
      const data = existingSnap.data()!;
      if (data.mastered) continue; // already mastered, nothing to do

      const result = applyReviewAnswer({ box: data.box ?? 1, mastered: false }, true, now);
      batch.update(ref, {
        box: result.box,
        mastered: result.mastered,
        nextReviewAt: result.nextReviewAt,
        lastAnsweredAt: now,
        ...(result.mastered ? { masteredAt: now } : {}),
      });
      writes++;
    }
  }

  if (writes > 0) {
    await batch.commit();
  }
}
