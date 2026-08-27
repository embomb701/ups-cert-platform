/**
 * Per-question performance tracking — server-side only (uses firebase-admin).
 *
 * Every scored attempt (practice or real) increments a running tally per
 * question in questionStats/{questionId}: how many times it's been asked,
 * how many times it was answered correctly. This is the admin-facing
 * signal for finding a genuinely broken or ambiguous question — the exact
 * bug class that turned up by hand this session (a wrong answer key, a
 * threshold copied from the wrong standard) shows up here as a question
 * with an anomalously high wrong-rate relative to its category, well
 * before a support ticket does.
 *
 * Incremented via FieldValue.increment so concurrent submissions from
 * different students never race/clobber each other.
 */

import type { Firestore } from 'firebase-admin/firestore';
import { FieldValue } from 'firebase-admin/firestore';
import type { ExamAnswer, ExamLevel } from '@/types';

interface AnsweredQuestion {
  id: string;
  examLevel: ExamLevel;
  category: string;
  questionText: string;
  correctAnswerId: string;
  safetyCritical: boolean;
}

export async function recordQuestionStats(
  adminDb: Firestore,
  questions: AnsweredQuestion[],
  answers: ExamAnswer[]
): Promise<void> {
  if (questions.length === 0) return;

  const answerByQuestionId = new Map(answers.map((a) => [a.questionId, a]));
  const statsCollection = adminDb.collection('questionStats');
  const batch = adminDb.batch();

  for (const q of questions) {
    const userAnswer = answerByQuestionId.get(q.id);
    const correct = userAnswer?.selectedChoiceId === q.correctAnswerId;
    const ref = statsCollection.doc(q.id);

    batch.set(
      ref,
      {
        examLevel: q.examLevel,
        category: q.category,
        questionText: q.questionText,
        safetyCritical: q.safetyCritical,
        timesAsked: FieldValue.increment(1),
        timesCorrect: FieldValue.increment(correct ? 1 : 0),
        timesWrong: FieldValue.increment(correct ? 0 : 1),
        lastAnsweredAt: new Date(),
      },
      { merge: true }
    );
  }

  await batch.commit();
}

export interface QuestionStatRow {
  id: string;
  examLevel: string;
  category: string;
  questionText: string;
  safetyCritical: boolean;
  timesAsked: number;
  timesCorrect: number;
  timesWrong: number;
}

/**
 * Wrong-rate as a percentage, rounded to the nearest whole point. Pure
 * function — no Firestore dependency — so the ranking logic is directly
 * unit-testable.
 */
export function wrongRatePct(row: { timesAsked: number; timesWrong: number }): number {
  if (row.timesAsked <= 0) return 0;
  return Math.round((row.timesWrong / row.timesAsked) * 100);
}

/**
 * Rank rows worst-first by wrong-rate, excluding any row below the minimum
 * sample size — a question asked twice and missed twice is 100% wrong but
 * tells you nothing yet; a question asked 200 times and missed 140 does.
 */
export function rankWorstQuestions(rows: QuestionStatRow[], minSample = 10): (QuestionStatRow & { wrongRate: number })[] {
  return rows
    .filter((r) => r.timesAsked >= minSample)
    .map((r) => ({ ...r, wrongRate: wrongRatePct(r) }))
    .sort((a, b) => b.wrongRate - a.wrongRate || b.timesAsked - a.timesAsked);
}
