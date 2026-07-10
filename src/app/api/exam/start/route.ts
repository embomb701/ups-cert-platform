import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';
import {
  selectExamQuestions,
  sanitizeQuestionsForClient,
  buildRandomizedChoiceOrder,
  shuffleArray,
} from '@/lib/exam/engine';
import { hashIp, getRealIp } from '@/lib/utils/ipHash';
import { FieldValue } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from 'uuid';
import type { ExamLevel } from '@/types';
import { addDays } from 'date-fns';

const COOLDOWN_DAYS = 90;
const TIME_PER_QUESTION = 90;

export async function POST(req: NextRequest) {
  try {
    // Authenticate
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: `Unauthorized — header: ${authHeader ? 'present but invalid' : 'missing'}` }, { status: 401 });

    let uid: string, email: string, displayName: string;
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
      email = decoded.email ?? '';
      displayName = decoded.name ?? '';
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const rawExamLevel = body.examLevel as string;
    // practice_jr_fse uses the jr_fse question bank but skips cooldowns and cert issuance
    const isPractice = rawExamLevel === 'practice_jr_fse';
    const examLevel = (isPractice ? 'jr_fse' : rawExamLevel) as ExamLevel;
    const candidateName = (body.candidateName as string | undefined)?.trim() ?? '';

    if (!['jr_fse', 'fse'].includes(examLevel)) {
      return NextResponse.json({ error: 'Invalid exam level' }, { status: 400 });
    }

    const ipHash = hashIp(getRealIp(req));

    // Practice test: verify practice_test access, skip cooldown/IP checks
    if (isPractice) {
      const practiceSnap = await adminDb
        .collection('users').doc(uid)
        .collection('examAccess').doc('practice_test')
        .get();
      if (!practiceSnap.exists || !practiceSnap.data()?.granted) {
        return NextResponse.json({
          error: 'No practice test access found. Purchase the Jr. FSE Practice Test to continue.',
        }, { status: 403 });
      }
    }

    if (!isPractice && examLevel === 'jr_fse') {
      // Verify purchase
      const accessSnap = await adminDb
        .collection('users')
        .doc(uid)
        .collection('examAccess')
        .doc('jr_fse')
        .get();

      if (!accessSnap.exists || !accessSnap.data()?.granted) {
        return NextResponse.json({ error: 'No valid Jr. FSE exam purchase found.' }, { status: 403 });
      }

      const accessData = accessSnap.data()!;

      // Test-out failure check: if they failed a test-out attempt, they must complete training first
      if (accessData.testOut && accessData.testOutFailed) {
        const allProgressSnap = await adminDb.collection('users').doc(uid).collection('trainingProgress').get();
        const completedModuleIds = new Set<string>();
        allProgressSnap.forEach((doc) => {
          const d = doc.data();
          if (d.passed && d.completedAt) completedModuleIds.add(doc.id);
        });
        const { ALL_MODULES } = await import('@/data/index');
        const trainingComplete = ALL_MODULES.every((m) => completedModuleIds.has(m.id));
        if (!trainingComplete) {
          return NextResponse.json({
            error: 'You did not pass the Jr. FSE Test-Out. You must complete the 3-to-6-Month Training Course before you can attempt the exam again.',
            requiresTraining: true,
          }, { status: 403 });
        }
        // Training is complete — clear the testOutFailed flag and allow the attempt
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fse').update({ testOutFailed: false });
      }

      // Check account-based cooldown (filter in memory to avoid composite index)
      const recentAttempts = await adminDb
        .collection('examAttempts')
        .where('userId', '==', uid)
        .where('examLevel', '==', 'jr_fse')
        .get();

      const now = new Date();
      const activeCooldown = recentAttempts.docs.find((d) => {
        const cooldownUntil = d.data().cooldownUntil?.toDate?.();
        return cooldownUntil && cooldownUntil > now;
      });

      if (activeCooldown) {
        return NextResponse.json({
          error:
            'A recent Junior FSE Exam attempt has already been associated with this account or network. Junior FSE Exam attempts are limited to once every 90 days. Contact support if you believe this is an error.',
          cooldownUntil: activeCooldown.data().cooldownUntil?.toDate(),
        }, { status: 429 });
      }

      // Check IP-based cooldown (filter in memory to avoid composite index)
      const ipLocks = await adminDb
        .collection('ipExamLocks')
        .where('ipHash', '==', ipHash)
        .where('examLevel', '==', 'jr_fse')
        .get();

      const activeIpLock = ipLocks.docs.find((d) => {
        const data = d.data();
        const cooldownUntil = data.cooldownUntil?.toDate?.();
        return cooldownUntil && cooldownUntil > now && !data.clearedByAdmin;
      });

      if (activeIpLock) {
        return NextResponse.json({
          error:
            'A recent Junior FSE Exam attempt has already been associated with this account or network. Junior FSE Exam attempts are limited to once every 90 days. Contact support if you believe this is an error.',
        }, { status: 429 });
      }
    }

    if (examLevel === 'fse') {
      // FSE: verify proctor has unlocked this session
      const readyOrder = await adminDb
        .collection('proctoredExamOrders')
        .where('userId', '==', uid)
        .where('productId', '==', 'fse_proctored_exam')
        .where('status', '==', 'ready')
        .limit(1)
        .get();

      if (readyOrder.empty) {
        return NextResponse.json({
          error:
            'Your FSE Exam session has not been unlocked yet. Your proctor must mark your session as ready before you can begin.',
        }, { status: 403 });
      }
    }

    // Block duplicate in_progress attempts
    const existingSnap = await adminDb
      .collection('examAttempts')
      .where('userId', '==', uid)
      .where('examLevel', '==', examLevel)
      .where('status', '==', 'in_progress')
      .limit(1)
      .get();

    if (!existingSnap.empty) {
      return NextResponse.json(
        { error: 'You already have an exam in progress. Please complete or wait for it to expire before starting a new attempt.' },
        { status: 409 }
      );
    }

    // Select and randomize questions
    const questions = await selectExamQuestions(examLevel);
    if (questions.length === 0) {
      return NextResponse.json({ error: 'No exam questions are available yet. Please contact support.' }, { status: 503 });
    }
    const questionOrder = shuffleArray(questions.map((q) => q.id));
    const choiceOrder = buildRandomizedChoiceOrder(questions);
    const cooldownUntil = addDays(new Date(), COOLDOWN_DAYS);

    // Create attempt record
    const attemptId = uuidv4();
    await adminDb.collection('examAttempts').doc(attemptId).set({
      id: attemptId,
      userId: uid,
      email,
      displayName,
      candidateName: candidateName || displayName || email,
      productId: isPractice ? 'practice_test' : (examLevel === 'jr_fse' ? 'jr_fse_test_human' : 'fse_proctored_exam'),
      examLevel,
      isPractice,
      status: 'in_progress',
      startedAt: FieldValue.serverTimestamp(),
      startIpHash: ipHash,
      selectedQuestionIds: questions.map((q) => q.id),
      randomizedQuestionOrder: questionOrder,
      randomizedChoiceOrder: choiceOrder,
      answers: [],
      score: null,
      passed: null,
      passingScore: 80,
      suspiciousEvents: [],
      suspiciousEventsCount: 0,
      suspiciousRiskLevel: 'low',
      flaggedForReview: false,
      // Practice tests have no cooldown; real Jr. FSE attempts get 90-day cooldown
      cooldownUntil: (!isPractice && examLevel === 'jr_fse') ? cooldownUntil : null,
      proctored: examLevel === 'fse',
      proctoringType: examLevel === 'fse' ? 'human' : null,
    });

    // Set IP lock only for real (non-practice) Jr. FSE attempts
    if (!isPractice && examLevel === 'jr_fse') {
      await adminDb.collection('ipExamLocks').add({
        ipHash,
        examLevel: 'jr_fse',
        productId: 'jr_fse_test_human',
        userId: uid,
        email,
        attemptId,
        createdAt: FieldValue.serverTimestamp(),
        cooldownUntil,
        clearedByAdmin: false,
      });
    }

    return NextResponse.json({
      attemptId,
      questions: sanitizeQuestionsForClient(
        questions.sort(
          (a, b) => questionOrder.indexOf(a.id) - questionOrder.indexOf(b.id)
        )
      ),
      choiceOrder,
      timePerQuestion: TIME_PER_QUESTION,
      proctored: examLevel === 'fse',
    });
  } catch (err: any) {
    console.error('Exam start error:', err);
    return NextResponse.json({ error: `Exam start failed: ${err?.message ?? String(err)}` }, { status: 500 });
  }
}
