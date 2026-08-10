import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { getModule, ALL_MODULES, KITCHEN_MODULES, COURSE_SEQUENCES } from '@/data/index';
import { FieldValue } from 'firebase-admin/firestore';
import { sendModuleCompleteEmail, sendCourseCompleteEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase-token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;
    const userEmail = decoded.email ?? '';
    const userName = decoded.name || userEmail;

    const { moduleId, answers } = await req.json();
    if (typeof moduleId !== 'string' || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
    }

    const mod = getModule(moduleId);
    if (!mod) return NextResponse.json({ error: 'Module not found' }, { status: 404 });

    const progressDoc = await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).get();
    const data = progressDoc.data() ?? {};
    const wasPreviouslyPassed = !!(data.passed);

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
    // Snapshot before adding current module — used to detect which course just became complete
    const completedIdsBefore = new Set(completedIds);
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
    const marineComplete = COURSE_SEQUENCES['training_marine'].every((m) => completedIds.has(m.id));
    const poolComplete = COURSE_SEQUENCES['training_pool'].every((m) => completedIds.has(m.id));
    const hvacTechComplete = COURSE_SEQUENCES['training_hvac_tech'].every((m) => completedIds.has(m.id));
    const solarInstComplete = COURSE_SEQUENCES['training_solar_inst'].every((m) => completedIds.has(m.id));
    const windTechComplete = COURSE_SEQUENCES['training_wind_tech'].every((m) => completedIds.has(m.id));
    const elevatorTechComplete = COURSE_SEQUENCES['training_elevator_tech'].every((m) => completedIds.has(m.id));
    const fireAlarmTechComplete = COURSE_SEQUENCES['training_fire_alarm_tech'].every((m) => completedIds.has(m.id));
    const bmetTechComplete = COURSE_SEQUENCES['training_bmet_tech'].every((m) => completedIds.has(m.id));
    const basComplete = COURSE_SEQUENCES['training_bas_tech'].every((m) => completedIds.has(m.id));
    const refComplete = COURSE_SEQUENCES['training_ref_tech'].every((m) => completedIds.has(m.id));
    const plcComplete = COURSE_SEQUENCES['training_plc_tech'].every((m) => completedIds.has(m.id));
    const securityTechComplete = COURSE_SEQUENCES['training_security_tech'].every((m) => completedIds.has(m.id));
    const fieldPmComplete = COURSE_SEQUENCES['training_field_pm'].every((m) => completedIds.has(m.id));
    const pumpTechComplete = COURSE_SEQUENCES['training_pump_tech'].every((m) => completedIds.has(m.id));
    const industrialRefComplete = COURSE_SEQUENCES['training_industrial_ref'].every((m) => completedIds.has(m.id));
    const dcOpsComplete = COURSE_SEQUENCES['training_dc_ops'].every((m) => completedIds.has(m.id));
    const buildingCxComplete = COURSE_SEQUENCES['training_building_cx'].every((m) => completedIds.has(m.id));
    const telecomComplete = COURSE_SEQUENCES['training_telecom'].every((m) => completedIds.has(m.id));

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

    if (marineComplete) {
      await grantPractice('practice_jr_marine_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_marine_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_marine_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (poolComplete) {
      await grantPractice('practice_jr_pool_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_pool_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_pool_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (hvacTechComplete) {
      await grantPractice('practice_jr_hvac_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_hvac_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_hvac_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (solarInstComplete) {
      await grantPractice('practice_jr_solar_inst');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_solar_inst_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_solar_inst').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (windTechComplete) {
      await grantPractice('practice_jr_wind_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_wind_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_wind_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (elevatorTechComplete) {
      await grantPractice('practice_jr_elevator_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_elevator_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_elevator_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (fireAlarmTechComplete) {
      await grantPractice('practice_jr_fire_alarm_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fire_alarm_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fire_alarm_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (bmetTechComplete) {
      await grantPractice('practice_jr_bmet_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_bmet_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_bmet_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (basComplete) {
      await grantPractice('practice_jr_bas_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_bas_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_bas_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (refComplete) {
      await grantPractice('practice_jr_ref_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_ref_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_ref_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (plcComplete) {
      await grantPractice('practice_jr_plc_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_plc_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_plc_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (securityTechComplete) {
      await grantPractice('practice_jr_security_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_security_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_security_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (fieldPmComplete) {
      await grantPractice('practice_jr_field_pm');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_field_pm_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_field_pm').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (pumpTechComplete) {
      await grantPractice('practice_jr_pump_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_pump_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_pump_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (industrialRefComplete) {
      await grantPractice('practice_jr_industrial_ref');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_industrial_ref_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_industrial_ref').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (dcOpsComplete) {
      await grantPractice('practice_jr_dc_ops');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_dc_ops_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_dc_ops').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (buildingCxComplete) {
      await grantPractice('practice_jr_building_cx');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_building_cx_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_building_cx').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    if (telecomComplete) {
      await grantPractice('practice_jr_telecom_tech');
      const pendingDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_telecom_tech_pending').get();
      const pendingData = pendingDoc.data();
      if (pendingData?.fromTraining) {
        await adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_telecom_tech').set(
          { granted: true, testOut: false, testOutFailed: false, fromTraining: true, purchaseId: pendingData.purchaseId, trainingCompletedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    // ── Emails (best-effort — never block the response) ─────────────────────
    if (userEmail) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masteringfse.com';

      const courseCompletions: Array<{ name: string; certTitle: string }> = [];
      const justCompleted = (modules: Array<{ id: string }>) =>
        !modules.every((m) => completedIdsBefore.has(m.id)) && modules.every((m) => completedIds.has(m.id));

      if (justCompleted(ALL_MODULES)) courseCompletions.push({ name: 'UPS Field Service Engineering', certTitle: 'Jr. UPS Field Service Engineer' });
      if (justCompleted([...ALL_MODULES.filter((m) => m.num <= 10), ...KITCHEN_MODULES])) courseCompletions.push({ name: 'Commercial Kitchen FSE', certTitle: 'Jr. Commercial Kitchen Field Service Engineer' });
      if (justCompleted(COURSE_SEQUENCES['training_hvac'])) courseCompletions.push({ name: 'HVAC Field Service Engineering', certTitle: 'Jr. HVAC Field Service Engineer' });
      if (justCompleted(COURSE_SEQUENCES['training_generator'])) courseCompletions.push({ name: 'Power Generation Field Service Engineering', certTitle: 'Jr. Power Generation Field Service Engineer' });
      if (justCompleted(COURSE_SEQUENCES['training_datacenter'])) courseCompletions.push({ name: 'Data Center Critical Facilities', certTitle: 'Jr. Data Center Critical Facilities Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_solar'])) courseCompletions.push({ name: 'Solar & Battery Energy Storage', certTitle: 'Jr. Solar & Storage Field Service Engineer' });
      if (justCompleted(COURSE_SEQUENCES['training_evcharging'])) courseCompletions.push({ name: 'EV Charging Infrastructure', certTitle: 'Jr. EV Charging Infrastructure Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_dcplants'])) courseCompletions.push({ name: 'Telecom DC Power Plants', certTitle: 'Jr. Telecom Power Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_battery'])) courseCompletions.push({ name: 'Battery Systems Technician', certTitle: 'Jr. Battery Systems Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_dcengineer'])) courseCompletions.push({ name: 'Data Center Engineer', certTitle: 'Jr. Data Center Engineer' });
      if (justCompleted(COURSE_SEQUENCES['training_marine'])) courseCompletions.push({ name: 'Marine Systems Technician', certTitle: 'Jr. Marine Systems Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_pool'])) courseCompletions.push({ name: 'Pool Equipment Technician', certTitle: 'Jr. Pool Equipment Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_hvac_tech'])) courseCompletions.push({ name: 'HVAC Technician', certTitle: 'Jr. HVAC Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_solar_inst'])) courseCompletions.push({ name: 'Solar Installer', certTitle: 'Jr. Solar Installer' });
      if (justCompleted(COURSE_SEQUENCES['training_wind_tech'])) courseCompletions.push({ name: 'Wind Turbine Technician', certTitle: 'Jr. Wind Turbine Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_elevator_tech'])) courseCompletions.push({ name: 'Elevator Technician', certTitle: 'Jr. Elevator Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_fire_alarm_tech'])) courseCompletions.push({ name: 'Fire Alarm & Suppression Technician', certTitle: 'Jr. Fire Alarm Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_bmet_tech'])) courseCompletions.push({ name: 'Biomedical Equipment Technician', certTitle: 'Jr. Biomedical Equipment Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_bas_tech'])) courseCompletions.push({ name: 'Building Automation Systems Technician', certTitle: 'Jr. Building Automation Systems Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_ref_tech'])) courseCompletions.push({ name: 'Commercial Refrigeration Technician', certTitle: 'Jr. Commercial Refrigeration Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_plc_tech'])) courseCompletions.push({ name: 'Industrial Controls & PLC Technician', certTitle: 'Jr. Industrial Controls & PLC Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_security_tech'])) courseCompletions.push({ name: 'Electronic Security Systems Technician', certTitle: 'Jr. Electronic Security Systems Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_field_pm'])) courseCompletions.push({ name: 'Field Project Manager', certTitle: 'Jr. Field Project Manager' });
      if (justCompleted(COURSE_SEQUENCES['training_pump_tech'])) courseCompletions.push({ name: 'Pump Technician', certTitle: 'Jr. Pump Technician' });
      if (justCompleted(COURSE_SEQUENCES['training_industrial_ref'])) courseCompletions.push({ name: 'Industrial Refrigeration Operator', certTitle: 'Jr. Industrial Refrigeration Operator' });
      if (justCompleted(COURSE_SEQUENCES['training_dc_ops'])) courseCompletions.push({ name: 'Data Center Operations Manager', certTitle: 'Jr. Data Center Operations Manager' });
      if (justCompleted(COURSE_SEQUENCES['training_building_cx'])) courseCompletions.push({ name: 'Building Commissioning (Cx) Agent', certTitle: 'Jr. Building Commissioning Agent' });
      if (justCompleted(COURSE_SEQUENCES['training_telecom'])) courseCompletions.push({ name: 'Telecom OSP Technician', certTitle: 'Jr. Telecom OSP Technician' });

      Promise.allSettled([
        ...(wasPreviouslyPassed ? [] : [sendModuleCompleteEmail(userEmail, userName, mod.title, `${siteUrl}/training`)]),
        ...courseCompletions.map((c) => sendCourseCompleteEmail(userEmail, userName, c.name, c.certTitle, `${siteUrl}/dashboard`)),
      ]).catch(() => {});
    }

    const trainingComplete = upsComplete || kitchenComplete || hvacComplete || generatorComplete || datacenterComplete || solarComplete || evChargingComplete || dcPlantsComplete || batteryComplete || dcEngineerComplete || marineComplete || poolComplete || hvacTechComplete || solarInstComplete || windTechComplete || elevatorTechComplete || fireAlarmTechComplete || bmetTechComplete || basComplete || refComplete || plcComplete || securityTechComplete || fieldPmComplete || pumpTechComplete || industrialRefComplete || dcOpsComplete || buildingCxComplete || telecomComplete;
    return NextResponse.json({ passed: true, results, trainingComplete });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
