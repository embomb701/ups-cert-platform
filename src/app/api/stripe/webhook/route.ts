import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';
import { getStripe } from '@/lib/stripe/client';
import { adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig ?? '', webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: 'Handler error' }, { status: 500 });
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

async function grantTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_portal')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  // Record a pending Jr. FSE grant — unlocked automatically when all 28 modules complete
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_fse_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });

  // Training purchasers get the practice test included free
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('practice_test')
    .set({
      granted: true,
      free: true,
      freeViaTraining: true,
      purchaseId,
      grantedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
}

async function grantKitchenTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_kitchen')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_kitchen_fse_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrKitchenFseAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_kitchen_fse_test_human',
    examLevel: 'jr_kitchen_fse',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Kitchen FSE Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantHvacTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_hvac')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_hvac_fse_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrHvacFseAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_hvac_fse_test_human',
    examLevel: 'jr_hvac_fse',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. HVAC FSE Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantGeneratorTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_generator')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_gen_fse_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrGenFseAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_gen_fse_test_human',
    examLevel: 'jr_gen_fse',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Generator FSE Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantDataCenterTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_datacenter')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_dc_cft_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrDcCftAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_dc_cft_test_human',
    examLevel: 'jr_dc_cft',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Data Center CFT Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantSolarTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_solar')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_solar_fse_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrSolarFseAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_solar_fse_test_human',
    examLevel: 'jr_solar_fse',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Solar FSE Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantEvChargingTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_evcharging')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_ev_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrEvTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_ev_tech_test_human',
    examLevel: 'jr_ev_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. EV Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantBatteryTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_battery')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_battery_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrBatteryTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_battery_tech_test_human',
    examLevel: 'jr_battery_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Battery Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantDcPlantsTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_dcplants')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_dcp_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrDcpTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_dcp_tech_test_human',
    examLevel: 'jr_dcp_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. DC Plants Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantDcEngineerTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_dcengineer')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_dc_engineer_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrDcEngineerAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_dc_engineer_test_human',
    examLevel: 'jr_dc_engineer',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Data Center Engineer Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantMarineTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_marine')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_marine_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrMarineTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_marine_tech_test_human',
    examLevel: 'jr_marine_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Marine Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantPoolTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_pool')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_pool_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrPoolTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_pool_tech_test_human',
    examLevel: 'jr_pool_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Pool Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantJrFseAccess(
  userId: string,
  purchaseId: string,
  proctoring: 'ai' | 'human',
) {
  if (proctoring === 'ai') {
    // AI proctored: grant immediately — browser anti-cheat handles integrity
    await adminDb
      .collection('users').doc(userId)
      .collection('examAccess').doc('jr_fse')
      .set(
        { granted: true, testOut: true, testOutFailed: false, proctoring: 'ai', purchaseId, grantedAt: FieldValue.serverTimestamp() },
        { merge: true }
      );
  } else {
    // Human proctored: create scheduling order — admin unlocks before exam can start
    await adminDb.collection('proctoredExamOrders').add({
      userId,
      purchaseId,
      productId: 'jr_fse_test_human',
      examLevel: 'jr_fse',
      testOut: true,
      proctoring: 'human',
      status: 'scheduling_pending',
      schedulingStatus: 'awaiting_contact',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      proctorId: null,
      proctorName: null,
      meetingLink: null,
      adminNotes: 'Jr. FSE Human Proctored Test-Out — schedule proctor session and unlock when ready.',
    });
  }
}

async function grantFseAccess(userId: string, email: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    email,
    purchaseId,
    productId: 'fse_proctored_exam',
    examLevel: 'fse',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'FSE Human Proctored Exam — schedule proctor session and unlock when ready.',
  });
}

// ── Main handler ───────────────────────────────────────────────────────────

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { userId, productId, email } = session.metadata ?? {};
  if (!userId || !productId) {
    console.error('Missing metadata on session', session.id);
    return;
  }

  // Mark purchase complete
  await adminDb.collection('purchases').doc(session.id).update({
    status: 'complete',
    stripePaymentIntentId: session.payment_intent ?? '',
    completedAt: FieldValue.serverTimestamp(),
  });

  const pid = session.id;

  switch (productId) {
    // ── Standalone training course (UPS) ──────────────────────────────────
    case 'training_course':
    case 'training_portal': // backwards-compat for old purchases
      await grantTrainingAccess(userId, pid);
      break;

    // ── Standalone training course (Kitchen) ──────────────────────────────
    case 'training_kitchen':
      await grantKitchenTrainingAccess(userId, pid);
      break;

    // ── Kitchen Test-Out ───────────────────────────────────────────────────
    case 'jr_kitchen_fse_test_human':
      await grantJrKitchenFseAccess(userId, pid);
      break;

    // ── Package: Kitchen Training + Kitchen Test-Out ───────────────────────
    case 'pkg_training_kitchen_testout':
      await grantKitchenTrainingAccess(userId, pid);
      await grantJrKitchenFseAccess(userId, pid);
      break;

    // ── Standalone training course (HVAC) ──────────────────────────────────
    case 'training_hvac':
      await grantHvacTrainingAccess(userId, pid);
      break;

    // ── HVAC Test-Out ───────────────────────────────────────────────────────
    case 'jr_hvac_fse_test_human':
      await grantJrHvacFseAccess(userId, pid);
      break;

    // ── Package: HVAC Training + HVAC Test-Out ──────────────────────────────
    case 'pkg_training_hvac_testout':
      await grantHvacTrainingAccess(userId, pid);
      await grantJrHvacFseAccess(userId, pid);
      break;

    // ── Standalone training course (Generator) ──────────────────────────────
    case 'training_generator':
      await grantGeneratorTrainingAccess(userId, pid);
      break;

    // ── Generator Test-Out ───────────────────────────────────────────────────
    case 'jr_gen_fse_test_human':
      await grantJrGenFseAccess(userId, pid);
      break;

    // ── Package: Generator Training + Test-Out ───────────────────────────────
    case 'pkg_training_generator_testout':
      await grantGeneratorTrainingAccess(userId, pid);
      await grantJrGenFseAccess(userId, pid);
      break;

    // ── Standalone training course (Data Center) ─────────────────────────────
    case 'training_datacenter':
      await grantDataCenterTrainingAccess(userId, pid);
      break;

    // ── Data Center Test-Out ──────────────────────────────────────────────────
    case 'jr_dc_cft_test_human':
      await grantJrDcCftAccess(userId, pid);
      break;

    // ── Package: Data Center Training + Test-Out ─────────────────────────────
    case 'pkg_training_datacenter_testout':
      await grantDataCenterTrainingAccess(userId, pid);
      await grantJrDcCftAccess(userId, pid);
      break;

    // ── Standalone training course (Solar/BESS) ──────────────────────────────
    case 'training_solar':
      await grantSolarTrainingAccess(userId, pid);
      break;

    // ── Solar Test-Out ─────────────────────────────────────────────────────────
    case 'jr_solar_fse_test_human':
      await grantJrSolarFseAccess(userId, pid);
      break;

    // ── Package: Solar Training + Test-Out ────────────────────────────────────
    case 'pkg_training_solar_testout':
      await grantSolarTrainingAccess(userId, pid);
      await grantJrSolarFseAccess(userId, pid);
      break;

    // ── Standalone training course (EV Charging) ─────────────────────────────
    case 'training_evcharging':
      await grantEvChargingTrainingAccess(userId, pid);
      break;

    // ── EV Charging Test-Out ──────────────────────────────────────────────────
    case 'jr_ev_tech_test_human':
      await grantJrEvTechAccess(userId, pid);
      break;

    // ── Package: EV Charging Training + Test-Out ─────────────────────────────
    case 'pkg_training_evcharging_testout':
      await grantEvChargingTrainingAccess(userId, pid);
      await grantJrEvTechAccess(userId, pid);
      break;

    // ── Standalone training course (DC Plants) ───────────────────────────────
    case 'training_dcplants':
      await grantDcPlantsTrainingAccess(userId, pid);
      break;

    // ── DC Plants Test-Out ────────────────────────────────────────────────────
    case 'jr_dcp_tech_test_human':
      await grantJrDcpTechAccess(userId, pid);
      break;

    // ── Package: DC Plants Training + Test-Out ───────────────────────────────
    case 'pkg_training_dcplants_testout':
      await grantDcPlantsTrainingAccess(userId, pid);
      await grantJrDcpTechAccess(userId, pid);
      break;

    // ── Standalone training course (Battery Systems) ─────────────────────────
    case 'training_battery':
      await grantBatteryTrainingAccess(userId, pid);
      break;

    // ── Battery Systems Test-Out ──────────────────────────────────────────────
    case 'jr_battery_tech_test_human':
      await grantJrBatteryTechAccess(userId, pid);
      break;

    // ── Package: Battery Systems Training + Test-Out ─────────────────────────
    case 'pkg_training_battery_testout':
      await grantBatteryTrainingAccess(userId, pid);
      await grantJrBatteryTechAccess(userId, pid);
      break;

    // ── Standalone training course (Data Center Engineer) ─────────────────────
    case 'training_dcengineer':
      await grantDcEngineerTrainingAccess(userId, pid);
      break;

    // ── DC Engineer Test-Out ──────────────────────────────────────────────────
    case 'jr_dc_engineer_test_human':
      await grantJrDcEngineerAccess(userId, pid);
      break;

    // ── Package: DC Engineer Training + Test-Out ─────────────────────────────
    case 'pkg_training_dcengineer_testout':
      await grantDcEngineerTrainingAccess(userId, pid);
      await grantJrDcEngineerAccess(userId, pid);
      break;

    // ── Standalone training course (Marine Systems) ───────────────────────────
    case 'training_marine':
      await grantMarineTrainingAccess(userId, pid);
      break;

    // ── Marine Tech Test-Out ──────────────────────────────────────────────────
    case 'jr_marine_tech_test_human':
      await grantJrMarineTechAccess(userId, pid);
      break;

    // ── Package: Marine Tech Training + Test-Out ──────────────────────────────
    case 'pkg_training_marine_testout':
      await grantMarineTrainingAccess(userId, pid);
      await grantJrMarineTechAccess(userId, pid);
      break;

    // ── Standalone training course (Pool Equipment) ───────────────────────────
    case 'training_pool':
      await grantPoolTrainingAccess(userId, pid);
      break;

    // ── Pool Tech Test-Out ────────────────────────────────────────────────────
    case 'jr_pool_tech_test_human':
      await grantJrPoolTechAccess(userId, pid);
      break;

    // ── Package: Pool Tech Training + Test-Out ────────────────────────────────
    case 'pkg_training_pool_testout':
      await grantPoolTrainingAccess(userId, pid);
      await grantJrPoolTechAccess(userId, pid);
      break;

    // ── Practice test ($14.99 — no cert issued, not a test-out) ──────────
    case 'practice_test':
      await adminDb
        .collection('users').doc(userId)
        .collection('examAccess').doc('practice_test')
        .set({ granted: true, purchaseId: pid, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
      break;

    // ── Standalone Jr. FSE test-outs ──────────────────────────────────────
    case 'jr_fse_exam':     // old product ID
      await grantJrFseAccess(userId, pid, 'ai');
      break;

    case 'jr_fse_test_human':
      await grantJrFseAccess(userId, pid, 'human');
      break;

    // ── Standalone FSE exam ───────────────────────────────────────────────
    case 'fse_proctored_exam':
      await grantFseAccess(userId, email ?? '', pid);
      break;

    // ── Package: Training + Jr. FSE Human ────────────────────────────────
    case 'pkg_training_jr_human':
      await grantTrainingAccess(userId, pid);
      await grantJrFseAccess(userId, pid, 'human');
      break;

    // ── Package: Training + FSE ───────────────────────────────────────────
    case 'pkg_training_fse':
      await grantTrainingAccess(userId, pid);
      await grantFseAccess(userId, email ?? '', pid);
      break;

    // ── Physical: Signed book ─────────────────────────────────────────────
    case 'signed_book': {
      const shipping = session.shipping_details;
      await adminDb.collection('bookOrders').add({
        userId,
        email,
        purchaseId: pid,
        productId: 'signed_book',
        status: 'pending_shipment',
        shippingName: shipping?.name ?? '',
        shippingAddress: shipping?.address ?? {},
        createdAt: FieldValue.serverTimestamp(),
        shipped: false,
        shippedAt: null,
        trackingNumber: null,
        adminNotes: 'SIGNED BOOK ORDER — sign and ship to address from Stripe.',
      });
      break;
    }

    // ── Employer packs ────────────────────────────────────────────────────
    case 'employer_5pack':
    case 'employer_10pack': {
      const seats = productId === 'employer_10pack' ? 10 : 5;
      await adminDb.collection('employerOrders').add({
        userId,
        email,
        purchaseId: pid,
        productId,
        seats,
        seatsUsed: 0,
        status: 'active',
        createdAt: FieldValue.serverTimestamp(),
        adminNotes: `Employer purchased ${seats}-seat pack. Contact to coordinate candidate onboarding.`,
      });
      break;
    }

    default:
      console.warn('Unhandled productId in webhook:', productId);
  }

  await adminDb.collection('auditLogs').add({
    userId,
    eventType: 'purchase_completed',
    eventDetails: { productId, sessionId: session.id },
    createdAt: FieldValue.serverTimestamp(),
    severity: 'info',
  });
}
