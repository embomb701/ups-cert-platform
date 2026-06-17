import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import {
  selectExamQuestions,
  sanitizeQuestionsForClient,
  buildRandomizedChoiceOrder,
  shuffleArray,
} from '@/lib/exam/engine';
import { hashIp, getRealIp } from '@/lib/utils/ipHash';
import { serverTimestamp } from 'firebase-admin/firestore';
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
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let uid: string, email: string;
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
      email = decoded.email ?? '';
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const examLevel = body.examLevel as ExamLevel;

    if (!['jr_fsc', 'fsc'].includes(examLevel)) {
      return NextResponse.json({ error: 'Invalid exam level' }, { status: 400 });
    }

    const ipHash = hashIp(getRealIp(req));

    if (examLevel === 'jr_fsc') {
      // Verify purchase
      const accessSnap = await adminDb
        .collection('users')
        .doc(uid)
        .collection('examAccess')
        .doc('jr_fsc')
        .get();

      if (!accessSnap.exists || !accessSnap.data()?.granted) {
        return NextResponse.json({ error: 'No valid Jr. FSC exam purchase found.' }, { status: 403 });
      }

      // Check account-based cooldown
      const recentAttempts = await adminDb
        .collection('examAttempts')
        .where('userId', '==', uid)
        .where('examLevel', '==', 'jr_fsc')
        .where('cooldownUntil', '>', new Date())
        .limit(1)
        .get();

      if (!recentAttempts.empty) {
        const attempt = recentAttempts.docs[0].data();
        return NextResponse.json({
          error:
            'A recent Junior FSC Exam attempt has already been associated with this account or network. Junior FSC Exam attempts are limited to once every 90 days. Contact support if you believe this is an error.',
          cooldownUntil: attempt.cooldownUntil?.toDate(),
        }, { status: 429 });
      }

      // Check IP-based cooldown
      const ipLock = await adminDb
        .collection('ipExamLocks')
        .where('ipHash', '==', ipHash)
        .where('examLevel', '==', 'jr_fsc')
        .where('cooldownUntil', '>', new Date())
        .where('clearedByAdmin', '==', false)
        .limit(1)
        .get();

      if (!ipLock.empty) {
        return NextResponse.json({
          error:
            'A recent Junior FSC Exam attempt has already been associated with this account or network. Junior FSC Exam attempts are limited to once every 90 days. Contact support if you believe this is an error.',
        }, { status: 429 });
      }
    }

    if (examLevel === 'fsc') {
      // FSC: verify proctor has unlocked this session
      const readyOrder = await adminDb
        .collection('proctoredExamOrders')
        .where('userId', '==', uid)
        .where('productId', '==', 'fsc_proctored_exam')
        .where('status', '==', 'ready')
        .limit(1)
        .get();

      if (readyOrder.empty) {
        return NextResponse.json({
          error:
            'Your FSC Exam session has not been unlocked yet. Your proctor must mark your session as ready before you can begin.',
        }, { status: 403 });
      }
    }

    // Select and randomize questions
    const questions = await selectExamQuestions(examLevel);
    const questionOrder = shuffleArray(questions.map((q) => q.id));
    const choiceOrder = buildRandomizedChoiceOrder(questions);
    const cooldownUntil = addDays(new Date(), COOLDOWN_DAYS);

    // Create attempt record
    const attemptId = uuidv4();
    await adminDb.collection('examAttempts').doc(attemptId).set({
      id: attemptId,
      userId: uid,
      email,
      productId: examLevel === 'jr_fsc' ? 'jr_fsc_exam' : 'fsc_proctored_exam',
      examLevel,
      status: 'in_progress',
      startedAt: serverTimestamp(),
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
      cooldownUntil: examLevel === 'jr_fsc' ? cooldownUntil : null,
      proctored: examLevel === 'fsc',
    });

    // Set IP lock for Jr. FSC
    if (examLevel === 'jr_fsc') {
      await adminDb.collection('ipExamLocks').add({
        ipHash,
        examLevel: 'jr_fsc',
        productId: 'jr_fsc_exam',
        userId: uid,
        email,
        attemptId,
        createdAt: serverTimestamp(),
        cooldownUntil,
        clearedByAdmin: false,
      });
    }

    // Send sanitized questions to client (no correct answers)
    const clientQuestions = sanitizeQuestionsForClient(questions).map((q) => ({
      ...q,
      choices: q.choices.map((c) => ({
        ...c,
        // reorder choices per randomized order
      })),
    }));

    return NextResponse.json({
      attemptId,
      questions: sanitizeQuestionsForClient(
        questions.sort(
          (a, b) => questionOrder.indexOf(a.id) - questionOrder.indexOf(b.id)
        )
      ),
      choiceOrder,
      timePerQuestion: TIME_PER_QUESTION,
      proctored: examLevel === 'fsc',
    });
  } catch (err) {
    console.error('Exam start error:', err);
    return NextResponse.json({ error: 'Failed to start exam. Please try again.' }, { status: 500 });
  }
}
