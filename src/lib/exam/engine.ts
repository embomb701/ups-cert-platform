/**
 * Exam Engine — server-side only scoring and question selection.
 * Never import in client components.
 */

import { adminDb } from '@/lib/firebase/admin';
import { v4 as uuidv4 } from 'uuid';
import type {
  ExamLevel,
  Question,
  QuestionForExam,
  ExamAttempt,
  ExamAnswer,
} from '@/types';

const QUESTIONS_PER_EXAM = 50;
const DEFAULT_PASSING_SCORE = 80;

// ---------------------------------------------------------------
// Question selection
// ---------------------------------------------------------------
export async function selectExamQuestions(
  examLevel: ExamLevel,
  count = QUESTIONS_PER_EXAM
): Promise<Question[]> {
  const snap = await adminDb
    .collection('questionBank')
    .where('examLevel', '==', examLevel)
    .where('active', '==', true)
    .get();

  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Question));

  if (all.length < count) {
    console.warn(
      `Only ${all.length} active ${examLevel} questions found, expected ${count}.`
    );
  }

  return shuffleArray(all).slice(0, Math.min(count, all.length));
}

// ---------------------------------------------------------------
// Shuffle helper (Fisher-Yates)
// ---------------------------------------------------------------
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------
// Strip correct answers before sending to client
// ---------------------------------------------------------------
export function sanitizeQuestionsForClient(questions: Question[]): QuestionForExam[] {
  return questions.map(({ correctAnswerId, explanation, ...safe }) => safe);
}

// ---------------------------------------------------------------
// Randomize answer choices per question
// ---------------------------------------------------------------
export function buildRandomizedChoiceOrder(
  questions: Question[]
): Record<string, string[]> {
  const order: Record<string, string[]> = {};
  for (const q of questions) {
    order[q.id] = shuffleArray(q.choices.map((c) => c.id));
  }
  return order;
}

// ---------------------------------------------------------------
// Server-side scoring (never trust client-submitted scores)
// ---------------------------------------------------------------
export async function scoreAttempt(
  attemptId: string,
  answers: ExamAnswer[]
): Promise<{ score: number; passed: boolean; correctCount: number }> {
  const attemptSnap = await adminDb.collection('examAttempts').doc(attemptId).get();
  if (!attemptSnap.exists) throw new Error('Attempt not found');

  const attempt = attemptSnap.data() as ExamAttempt;
  const questionIds = attempt.selectedQuestionIds;

  // Fetch the actual questions from the bank
  const questionDocs = await Promise.all(
    questionIds.map((id) => adminDb.collection('questionBank').doc(id).get())
  );

  const questions: Question[] = questionDocs
    .filter((d) => d.exists)
    .map((d) => ({ id: d.id, ...d.data() } as Question));

  const questionMap: Record<string, Question> = {};
  for (const q of questions) questionMap[q.id] = q;

  let correct = 0;
  for (const answer of answers) {
    const q = questionMap[answer.questionId];
    if (!q) continue;
    if (answer.selectedChoiceId === q.correctAnswerId) correct++;
  }

  const score = questions.length > 0 ? (correct / questions.length) * 100 : 0;
  const passed = score >= (attempt.passingScore ?? DEFAULT_PASSING_SCORE);

  return { score, passed, correctCount: correct };
}

// ---------------------------------------------------------------
// Generate a unique certificate number
// ---------------------------------------------------------------
export function generateCertNumber(examLevel: ExamLevel): string {
  const prefix = examLevel === 'jr_fse' ? 'JR' : 'FSE';
  const year = new Date().getFullYear();
  const rand = uuidv4().split('-')[0].toUpperCase();
  return `${prefix}-${year}-${rand}`;
}
