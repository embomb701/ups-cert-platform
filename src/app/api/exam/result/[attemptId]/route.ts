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

    const questionIds: string[] = attempt.selectedQuestionIds ?? [];
    const randomizedOrder: string[] = attempt.randomizedQuestionOrder ?? questionIds;
    const answers: { questionId: string; selectedChoiceId: string | null }[] = attempt.answers ?? [];

    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    const questionReview: {
      id: string;
      questionText: string;
      choices: { id: string; text: string }[];
      correctAnswerId: string;
      selectedChoiceId: string | null;
      isCorrect: boolean;
      explanation: string;
      category: string;
    }[] = [];

    if (questionIds.length > 0) {
      const questionDocs = await Promise.all(
        questionIds.map((id) => adminDb.collection('questionBank').doc(id).get())
      );

      // Build a map for quick lookup
      const qMap: Record<string, any> = {};
      for (const qSnap of questionDocs) {
        if (!qSnap.exists) continue;
        qMap[qSnap.id] = { id: qSnap.id, ...qSnap.data() };
      }

      // Build review in the order the user saw questions
      const orderedIds = randomizedOrder.filter((id) => qMap[id]);
      for (const id of orderedIds) {
        const q = qMap[id];
        const userAnswer = answers.find((a) => a.questionId === id);
        const selectedChoiceId = userAnswer?.selectedChoiceId ?? null;
        const isCorrect = selectedChoiceId === q.correctAnswerId;

        const cat = q.category as string;
        if (!categoryBreakdown[cat]) categoryBreakdown[cat] = { correct: 0, total: 0 };
        categoryBreakdown[cat].total++;
        if (isCorrect) categoryBreakdown[cat].correct++;

        questionReview.push({
          id,
          questionText: q.questionText,
          choices: q.choices ?? [],
          correctAnswerId: q.correctAnswerId,
          selectedChoiceId,
          isCorrect,
          explanation: q.explanation ?? '',
          category: cat,
        });
      }
    }

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
      questionReview,
      flaggedForReview: attempt.flaggedForReview ?? false,
    });
  } catch (err: any) {
    console.error('Result fetch error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
