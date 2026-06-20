import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { attemptId: string } }
) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];

    const attemptSnap = await adminDb.collection('examAttempts').doc(params.attemptId).get();
    if (!attemptSnap.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const attempt = attemptSnap.data()!;

    // Verify ownership if token provided, otherwise check status
    if (idToken) {
      try {
        const decoded = await adminAuth.verifyIdToken(idToken);
        if (attempt.userId !== decoded.uid) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }

    if (attempt.status !== 'completed') {
      return NextResponse.json({ error: 'Attempt not completed' }, { status: 400 });
    }

    // Build category breakdown from stored question IDs
    const questionIds: string[] = attempt.selectedQuestionIds ?? [];
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};

    if (questionIds.length > 0) {
      const questionDocs = await Promise.all(
        questionIds.map((id) => adminDb.collection('questionBank').doc(id).get())
      );
      const answers: { questionId: string; selectedChoiceId: string | null }[] = attempt.answers ?? [];

      for (const qSnap of questionDocs) {
        if (!qSnap.exists) continue;
        const q = qSnap.data()!;
        const cat = q.category as string;
        if (!categoryBreakdown[cat]) categoryBreakdown[cat] = { correct: 0, total: 0 };
        categoryBreakdown[cat].total++;
        const userAnswer = answers.find((a) => a.questionId === qSnap.id);
        if (userAnswer?.selectedChoiceId === q.correctAnswerId) {
          categoryBreakdown[cat].correct++;
        }
      }
    }

    // Get certificate number if issued
    let certificateNumber: string | undefined;
    if (attempt.certificateId) {
      const certSnap = await adminDb.collection('certificates').doc(attempt.certificateId).get();
      if (certSnap.exists) {
        certificateNumber = certSnap.data()!.certificateNumber;
      }
    }

    return NextResponse.json({
      score: attempt.score ?? 0,
      passed: attempt.passed ?? false,
      passingScore: attempt.passingScore ?? 80,
      examLevel: attempt.examLevel,
      certificateId: attempt.certificateId,
      certificateNumber,
      categoryBreakdown,
      flaggedForReview: attempt.flaggedForReview ?? false,
    });
  } catch (err: any) {
    console.error('Result fetch error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
