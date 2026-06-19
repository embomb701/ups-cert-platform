import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';
import { scoreAttempt, generateCertNumber } from '@/lib/exam/engine';
import {
  calculateRiskScore,
  classifyRiskLevel,
  shouldFlagForReview,
} from '@/lib/exam/antiCheat';
import { hashIpOrNull, getRealIp } from '@/lib/utils/ipHash';
import { FieldValue } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from 'uuid';
import type { ExamAnswer, SuspiciousEvent } from '@/types';

/** Internal control-flow error carrying an HTTP status. */
class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

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
    const attemptId = body?.attemptId;
    const answers = (body?.answers ?? []) as ExamAnswer[];

    if (typeof attemptId !== 'string' || attemptId.length === 0 || attemptId.includes('/')) {
      return NextResponse.json({ error: 'Invalid attemptId' }, { status: 400 });
    }
    if (!Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid answers' }, { status: 400 });
    }

    // Atomically CLAIM the attempt so two concurrent submits (e.g. the timer
    // expiring while the user clicks "Submit") cannot both score it and issue
    // two certificates. Only the request that flips in_progress -> completed
    // proceeds; the loser gets 409.
    const attemptRef = adminDb.collection('examAttempts').doc(attemptId);
    let attempt: FirebaseFirestore.DocumentData;
    try {
      attempt = await adminDb.runTransaction(async (tx) => {
        const snap = await tx.get(attemptRef);
        if (!snap.exists) throw new HttpError(404, 'Attempt not found');
        const data = snap.data()!;
        if (data.userId !== uid) throw new HttpError(403, 'Unauthorized');
        if (data.status !== 'in_progress') {
          throw new HttpError(409, 'Attempt already submitted or not in progress');
        }
        tx.update(attemptRef, {
          status: 'completed',
          completedAt: FieldValue.serverTimestamp(),
        });
        return data;
      });
    } catch (e) {
      if (e instanceof HttpError) {
        return NextResponse.json({ error: e.message }, { status: e.status });
      }
      throw e;
    }

    // SERVER-SIDE SCORING ONLY (the attempt is now exclusively claimed)
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

    const ipHash = hashIpOrNull(getRealIp(req));

    // Record scoring results (status/completedAt were already set atomically
    // in the claim transaction above).
    await attemptRef.update({
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

    // Persist the breakdown so the results page can re-read it later.
    await attemptRef.update({ categoryBreakdown });

    let certificateNumber: string | undefined;
    let certificateId: string | undefined;

    // Issue certificate if passed and not flagged
    if (passed && !flagged) {
      certificateId = uuidv4();
      certificateNumber = generateCertNumber(attempt.examLevel);
      const certTitle =
        attempt.examLevel === 'jr_fse'
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

      await attemptRef.update({
        certificateId,
        certificateNumber,
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
