import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { getModule, ALL_MODULES, KITCHEN_MODULES, COURSE_SEQUENCES } from '@/data/index';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase-token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const { moduleId, answers } = await req.json();
    if (typeof moduleId !== 'string' || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
    }

    const mod = getModule(moduleId);
    if (!mod) return NextResponse.json({ error: 'Module not found' }, { status: 404 });

    const progressDoc = await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).get();
    const data = progressDoc.data() ?? {};

    // All slides must be completed first
    const completedSlides: number[] = data.completedSlides ?? [];
    for (let i = 0; i < mod.slides.length; i++) {
      if (!completedSlides.includes(i)) {
        return NextResponse.json({ error: `Slide ${i} must be completed before taking the module test` }, { status: 403 });
      }
    }

    // Once-per-day rule
    const lastTestAt = data.lastTestAt;
    if (lastTestAt) {
      const lastDate = lastTestAt.toDate ? lastTestAt.toDate() : new Date(lastTestAt);
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      if (lastDate >= midnight) {
        return NextResponse.json({ error: 'Module test can only be taken once per day', nextAvailableAt: new Date(midnight.getTime() + 24 * 60 * 60 * 1000).toISOString() }, { status: 429 });
      }
    }

    // Score the test (must be 100%)
    if (answers.length !== mod.test.length) {
      return NextResponse.json({ error: 'Answer count mismatch' }, { status: 400 });
    }

    const results = mod.test.map((q, i) => ({
      correct: answers[i] === q.correct,
      correctAnswer: q.correct,
      explanation: q.exp,
    }));

    const allCorrect = results.every((r) => r.correct);

    // Always record last test attempt (resets the daily limit)
    const updateData: Record<string, unknown> = {
      lastTestAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      testAttempts: FieldValue.increment(1),
    };

    if (allCorrect) {
      updateData.completedAt = FieldValue.serverTimestamp();
      updateData.passed = true;
    } else {
      // Must redo all slides before retrying
      updateData.completedSlides = [];
    }

    await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).set(updateData, { merge: true });

    if (!allCorrect) {
      return NextResponse.json({
        passed: false,
        results,
        message: 'You must score 100% to pass. You must complete all slides again before retrying tomorrow.',
      });
    }

    // Check course completion — passing a module can complete the UPS course
    // (modules 1-28) and/or the Kitchen course (shared 1-10 + kitchen 11-27).
    const allProgressSnap = await adminDb.collection('users').doc(uid).collection('trainingProgress').get();
    const completedIds = new Set<string>();
    allProgressSnap.forEach((doc) => {
      const d = doc.data();
      if (d.passed && d.completedAt) completedIds.add(doc.id);
    });
    // Include the current module we just passed
    completedIds.add(moduleId);

    const upsComplete = ALL_MODULES.every((m) => completedIds.has(m.id));
    const kitchenCourse = [...ALL_MODULES.filter((m) => m.num <= 10), ...KITCHEN_MODULES];
    const kitchenComplete = kitchenCourse.every((m) => completedIds.has(m.id));
    const hvacComplete = COURSE_SEQUENCES['training_hvac'].every((m) => completedIds.has(m.id));
    const generatorComplete = COURSE_SEQUENCES['training_generator'].every((m) => completedIds.has(m.id));
    const datacenterComplete = COURSE_SEQUENCES['training_datacenter'].every((m) => completedIds.has(m.id));
    const solarComplete = COURSE_SEQUENCES['training_solar'].every((m) => completedIds.has(m.id));
    const evChargingComplete = COURSE_SEQUENCES['training_evcharging'].every((m) => completedIds.has(m.id));
    const dcPlantsComplete = COURSE_SEQUENCES['training_dcplants'].every((m) => completedIds.has(m.id));
    const batteryComplete = COURSE_SEQUENCES['training_battery'].every((m) => completedIds.has(m.id));
    const dcEngineerComplete = COURSE_SEQUENCES['training_dcengineer'].every((m) => completedIds.has(m.id));

    if (upsComplete) {
      // Grant Jr. FSE exam access (from training path, not test-out)
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fse_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fse').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    // Free practice exams unlock on course completion (UPS uses its legacy
    // practice_test doc via the claim flow; the other courses grant directly)
    const grantPractice = (doc: string) =>
      adminDb.collection('users').doc(uid).collection('examAccess').doc(doc).set(
        { granted: true, free: true, freeViaTraining: true, grantedAt: FieldValue.serverTimestamp() },
        { merge: true }
      );

    if (kitchenComplete) {
      await grantPractice('practice_jr_kitchen_fse');
      // Grant Jr. Kitchen FSE exam access (from training path, not test-out)
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_kitchen_fse_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_kitchen_fse').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (hvacComplete) {
      await grantPractice('practice_jr_hvac_fse');
      // Grant Jr. HVAC FSE exam access (from training path, not test-out)
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_hvac_fse_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_hvac_fse').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (generatorComplete) {
      await grantPractice('practice_jr_gen_fse');
      // Grant Jr. Generator FSE exam access (from training path, not test-out)
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_gen_fse_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_gen_fse').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (datacenterComplete) {
      await grantPractice('practice_jr_dc_cft');
      // Grant Jr. Data Center CFT exam access (from training path, not test-out)
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_dc_cft_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_dc_cft').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (solarComplete) {
      await grantPractice('practice_jr_solar_fse');
      // Grant Jr. Solar FSE exam access (from training path, not test-out)
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_solar_fse_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_solar_fse').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (evChargingComplete) {
      await grantPractice('practice_jr_ev_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_ev_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_ev_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (dcPlantsComplete) {
      await grantPractice('practice_jr_dcp_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_dcp_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_dcp_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (batteryComplete) {
      await grantPractice('practice_jr_battery_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_battery_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_battery_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (dcEngineerComplete) {
      await grantPractice('practice_jr_dc_engineer');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_dc_engineer_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_dc_engineer').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    const trainingComplete = upsComplete || kitchenComplete || hvacComplete || generatorComplete || datacenterComplete || solarComplete || evChargingComplete || dcPlantsComplete || batteryComplete || dcEngineerComplete;
    return NextResponse.json({ passed: true, results, trainingComplete });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
