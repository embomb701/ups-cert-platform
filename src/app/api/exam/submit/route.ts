import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { sendCertEarnedEmail } from '@/lib/email';
import { COURSES } from '@/data/courses';

export const dynamic = 'force-dynamic';
import { scoreAttempt, generateCertNumber } from '@/lib/exam/engine';
import { recordPracticeMisses } from '@/lib/exam/reviewQueue';
import { recordQuestionStats } from '@/lib/exam/questionStats';
import {
  calculateRiskScore,
  classifyRiskLevel,
  shouldFlagForReview,
} from '@/lib/exam/antiCheat';
import { hashIp, getRealIp } from '@/lib/utils/ipHash';
import { checkRateLimit } from '@/lib/utils/rateLimit';
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

    // Rate limit: 5 exam submissions per hour per user
    const rl = await checkRateLimit(uid, 'exam_submit', 5, 60 * 60 * 1000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many submission attempts. Please wait before retrying.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } },
      );
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

    // Per-question performance tracking (admin analytics) — every scored
    // attempt, practice or real, counts. Best-effort: never blocks the
    // score response a student is waiting on.
    try {
      const statQuestions = questionDocs
        .filter((qSnap) => qSnap.exists)
        .map((qSnap) => {
          const q = qSnap.data()!;
          return {
            id: qSnap.id,
            examLevel: attempt.examLevel,
            category: q.category as string,
            questionText: q.questionText as string,
            correctAnswerId: q.correctAnswerId as string,
            safetyCritical: !!q.safetyCritical,
          };
        });
      await recordQuestionStats(adminDb, statQuestions, answers);
    } catch (err) {
      console.error('recordQuestionStats failed (non-fatal):', err);
    }

    let certificateNumber: string | undefined;
    let certificateId: string | undefined;

    // Practice attempts: return score/results immediately without cert or test-out flag
    if (attempt.isPractice) {
      // Update the missed-question review queue — best-effort, never blocks
      // the score response the student is waiting on.
      try {
        const answeredQuestions = questionDocs
          .filter((qSnap) => qSnap.exists)
          .map((qSnap) => {
            const q = qSnap.data()!;
            return { id: qSnap.id, category: q.category as string, correctAnswerId: q.correctAnswerId as string };
          });
        await recordPracticeMisses(adminDb, uid, attempt.examLevel, answeredQuestions, answers);
      } catch (err) {
        console.error('recordPracticeMisses failed (non-fatal):', err);
      }

      return NextResponse.json({
        score,
        passed,
        passingScore: attempt.passingScore ?? 80,
        correctCount,
        examLevel: attempt.examLevel,
        isPractice: true,
        categoryBreakdown,
        flaggedForReview: false,
      });
    }

    // Real exam: if test-out and failed, lock until training complete
    if (!passed && attempt.examLevel === 'jr_fse') {
      const accessSnap = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fse').get();
      if (accessSnap.exists && accessSnap.data()?.testOut) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fse').update({ testOutFailed: true });
      }
    }
    const JR_COURSE_LEVELS = ['jr_kitchen_fse', 'jr_hvac_fse', 'jr_gen_fse', 'jr_dc_cft', 'jr_solar_fse', 'jr_ev_tech', 'jr_dcp_tech', 'jr_battery_tech', 'jr_dc_engineer', 'jr_marine_tech', 'jr_pool_tech', 'jr_hvac_tech', 'jr_solar_inst', 'jr_wind_tech', 'jr_elevator_tech', 'jr_fire_alarm_tech', 'jr_bmet_tech', 'jr_bas_tech', 'jr_ref_tech', 'jr_plc_tech', 'jr_security_tech', 'jr_field_pm', 'jr_pump_tech', 'jr_industrial_ref', 'jr_dc_ops', 'jr_building_cx', 'jr_telecom_tech', 'jr_switchgear_tech'];
    if (!passed && JR_COURSE_LEVELS.includes(attempt.examLevel) && (attempt as { testOut?: boolean }).testOut) {
      await adminDb.collection('users').doc(uid).collection('examAccess').doc(attempt.examLevel).set(
        { testOut: true, testOutFailed: true },
        { merge: true }
      );
    }

    // Issue certificate if passed and not flagged
    if (passed && !flagged) {
      certificateId = uuidv4();
      certificateNumber = generateCertNumber(attempt.examLevel);
      const certTitle =
        attempt.examLevel === 'jr_fse'
          ? 'Junior UPS Field Service Certification'
          : attempt.examLevel === 'jr_kitchen_fse'
          ? 'Junior Commercial Kitchen Field Service Certification'
          : attempt.examLevel === 'jr_hvac_fse'
          ? 'Junior HVAC Field Service Certification'
          : attempt.examLevel === 'jr_gen_fse'
          ? 'Junior Power Generation Field Service Certification'
          : attempt.examLevel === 'jr_dc_cft'
          ? 'Junior Data Center Critical Facilities Certification'
          : attempt.examLevel === 'jr_solar_fse'
          ? 'Junior Solar & Storage Field Service Certification'
          : attempt.examLevel === 'jr_ev_tech'
          ? 'Junior EV Charging Infrastructure Technician Certification'
          : attempt.examLevel === 'jr_dcp_tech'
          ? 'Junior Telecom DC Power Plants Technician Certification'
          : attempt.examLevel === 'jr_battery_tech'
          ? 'Junior Battery Systems Technician Certification'
          : attempt.examLevel === 'jr_dc_engineer'
          ? 'Junior Data Center Engineer Certification'
          : attempt.examLevel === 'jr_marine_tech'
          ? 'Junior Marine Systems Technician Certification'
          : attempt.examLevel === 'jr_pool_tech'
          ? 'Junior Pool Equipment Technician Certification'
          : attempt.examLevel === 'jr_hvac_tech'
          ? 'Junior HVAC Technician Certification'
          : attempt.examLevel === 'jr_solar_inst'
          ? 'Junior Solar Installer Certification'
          : attempt.examLevel === 'jr_wind_tech'
          ? 'Junior Wind Turbine Technician Certification'
          : attempt.examLevel === 'jr_elevator_tech'
          ? 'Junior Elevator Technician Certification'
          : attempt.examLevel === 'jr_fire_alarm_tech'
          ? 'Junior Fire Alarm Technician Certification'
          : attempt.examLevel === 'jr_bmet_tech'
          ? 'Junior Biomedical Equipment Technician Certification'
          : attempt.examLevel === 'jr_bas_tech'
          ? 'Junior Building Automation Systems Technician Certification'
          : attempt.examLevel === 'jr_ref_tech'
          ? 'Junior Commercial Refrigeration Technician Certification'
          : attempt.examLevel === 'jr_plc_tech'
          ? 'Junior Industrial Controls & PLC Technician Certification'
          : attempt.examLevel === 'jr_security_tech'
          ? 'Junior Electronic Security Systems Technician Certification'
          : attempt.examLevel === 'jr_field_pm'
          ? 'Junior Field Project Manager Certification'
          : attempt.examLevel === 'jr_pump_tech'
          ? 'Junior Pump Technician Certification'
          : attempt.examLevel === 'jr_industrial_ref'
          ? 'Junior Industrial Refrigeration Operator Certification'
          : attempt.examLevel === 'jr_dc_ops'
          ? 'Junior Data Center Operations Manager Certification'
          : attempt.examLevel === 'jr_building_cx'
          ? 'Junior Building Commissioning Agent Certification'
          : attempt.examLevel === 'jr_telecom_tech'
          ? 'Junior Telecom OSP Technician Certification'
          : attempt.examLevel === 'jr_switchgear_tech'
          ? 'Junior Switchgear & Substation Technician Certification'
          : 'UPS Field Service Certification';

      await adminDb.collection('certificates').doc(certificateId).set({
        id: certificateId,
        certificateNumber,
        userId: uid,
        candidateName: attempt.candidateName || attempt.displayName || '',
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

      // Cert earned email — best-effort
      try {
        const userRecord = await adminAuth.getUser(uid);
        if (userRecord.email && certificateNumber) {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';
          const accessKey = COURSES.find((c) => c.examLevel === attempt.examLevel)?.accessKey;
          sendCertEarnedEmail(
            userRecord.email,
            userRecord.displayName || userRecord.email,
            certTitle,
            certificateNumber,
            `${siteUrl}/verify/${certificateNumber}`,
            accessKey ? `${siteUrl}/jobs?course=${accessKey}` : undefined,
          ).catch(() => {});
        }
      } catch {
        // email failure is non-fatal
      }
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
