import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { sanitizeQuestionsForClient } from '@/lib/exam/engine';
import { isDue, sortForReview } from '@/lib/exam/spacedRepetition';
import type { ExamLevel, Question } from '@/types';

export const dynamic = 'force-dynamic';

const SESSION_SIZE = 20;

// GET /api/review/[examLevel] — the current user's missed-question review
// queue for one course: how many questions are being tracked, how many are
// mastered, and up to SESSION_SIZE due-right-now questions (sanitized, no
// answer key) ready to serve as a review session.
export async function GET(req: NextRequest, { params }: { params: Promise<{ examLevel: string }> }) {
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

    const { examLevel } = await params;

    const snap = await adminDb
      .collection('users').doc(uid)
      .collection('missedQuestions')
      .where('examLevel', '==', examLevel as ExamLevel)
      .get();

    const now = new Date();
    let masteredCount = 0;
    const active: Array<{ id: string; nextReviewAt: Date; timesWrong: number }> = [];

    for (const doc of snap.docs) {
      const data = doc.data();
      if (data.mastered) {
        masteredCount++;
        continue;
      }
      active.push({
        id: doc.id,
        nextReviewAt: data.nextReviewAt?.toDate?.() ?? new Date(data.nextReviewAt),
        timesWrong: data.timesWrong ?? 1,
      });
    }

    const due = sortForReview(active).filter((r) => isDue({ mastered: false, nextReviewAt: r.nextReviewAt }, now));
    const dueIds = due.slice(0, SESSION_SIZE).map((r) => r.id);

    const questionSnaps = dueIds.length
      ? await adminDb.getAll(...dueIds.map((id) => adminDb.collection('questionBank').doc(id)))
      : [];

    const questions: Question[] = questionSnaps
      .filter((d) => d.exists)
      .map((d) => ({ id: d.id, ...d.data() } as Question));

    return NextResponse.json({
      totalTracked: snap.size,
      masteredCount,
      dueCount: due.length,
      questions: sanitizeQuestionsForClient(questions),
    });
  } catch (err) {
    console.error('Review queue fetch error:', err);
    return NextResponse.json({ error: 'Failed to load review queue' }, { status: 500 });
  }
}
