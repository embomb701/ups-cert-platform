import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';
import { scoreAttempt, generateCertNumber } from '@/lib/exam/engine';
import {
  calculateRiskScore,
  classifyRiskLevel,
  shouldFlagForReview,
} from '@/lib/exam/antiCheat';
import { hashIp, getRealIp } from '@/lib/utils/ipHash';
import { FieldValue } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from 'uuid';
import type { ExamAnswer, SuspiciousEvent } from '@/types';

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
    const { attemptId, answers } = body as { attemptId: string; answers: ExamAnswer[] };

    // Verify attempt belongs to this user
    const attemptSnap = await adminDb.collection('examAttempts').doc(attemptId).get();
    if (!attemptSnap.exists) {
      return NextResponse.json({ error: 'Attempt not found' }, { status: 404 });
    }

    const attempt = attemptSnap.data()!;
    if (attempt.userId !== uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (attempt.status === 'completed') {
      return NextResponse.json({ error: 'Attempt already submitted' }, { status: 409 });
    }

    // SERVER-SIDE SCORING ONLY
    const { score, passed, correctCount } = await scoreAttempt(attemptId, answers);

    // Retrieve accumulated suspicious events (from the event log route)
    const eventsSnap = await adminDb
      .collection('auditLogs')
      .where('attemptId', '==', attemptId)
      .where('eventType', '==', 'suspicious_event')
      .get();

    const suspiciousEvents: SuspiciousEvent[] = eventsSnap.docs.map(
      (d) => d.data().eventDetails as SuspiciousEvent
    );

    const riskScore = calculateRiskScore(suspiciousEvents);
    const riskLevel = classifyRiskLevel(riskScore);
    const flagged = shouldFlagForReview(riskLevel);

    const ipHash = hashIp(getRealIp(req));

    // Update attempt
    await adminDb.collection('examAttempts').doc(attemptId).update({
      status: 'completed',
      completedAt: FieldValue.serverTimestamp(),
      completionIpHash: ipHash,
      answers,
      score,
      passed,
      suspiciousRiskLevel: riskLevel,
      suspiciousEventsCount: suspiciousEvents.length,
      flaggedForReview: flagged,
    });

    // Generate category breakdown
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    const questionIds: string[] = attempt.selectedQuestionIds ?? [];
    const questionDocs = await Promise.all(
      questionIds.map((id) => adminDb.collection('questionBank').doc(id).get())
    );

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

    let certificateNumber: string | undefined;
    let certificateId: string | undefined;

    // Issue certificate if passed and not flagged
    if (passed && !flagged) {
      certificateId = uuidv4();
      certificateNumber = generateCertNumber(attempt.examLevel);
      const certTitle =
        attempt.examLevel === 'jr_fsc'
          ? 'Junior UPS Field Service Certification'
          : 'UPS Field Service Certification';

      await adminDb.collection('certificates').doc(certificateId).set({
        id: certificateId,
        certificateNumber,
        userId: uid,
        candidateName: attempt.displayName ?? '',
        productId: attempt.productId,
        examLevel: attempt.examLevel,
        certificationTitle: certTitle,
        issuedAt: FieldValue.serverTimestamp(),
        score,
        status: 'valid',
        publicVerificationSlug: certificateNumber,
        publicScoreEnabled: false,
      });

      await adminDb.collection('examAttempts').doc(attemptId).update({
        certificateId,
      });

      // Audit log
      await adminDb.collection('auditLogs').add({
        userId: uid,
        attemptId,
        eventType: 'certificate_generated',
        eventDetails: { certificateNumber, examLevel: attempt.examLevel, score },
        createdAt: FieldValue.serverTimestamp(),
        severity: 'info',
      });
    }

    return NextResponse.json({
      score,
      passed,
      passingScore: attempt.passingScore ?? 80,
      correctCount,
      examLevel: attempt.examLevel,
      certificateNumber,
      certificateId,
      categoryBreakdown,
      flaggedForReview: flagged,
    });
  } catch (err) {
    console.error('Exam submit error:', err);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
