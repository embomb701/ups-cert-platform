import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';
import { getStripe, STRIPE_PRODUCTS } from '@/lib/stripe/client';
import { adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { sendOrderConfirmationEmail } from '@/lib/email';

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
      await handleCheckoutCompleted(event.id, session);
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.id) {
        await adminDb.collection('purchases').doc(session.id).set(
          { status: 'expired', expiredAt: FieldValue.serverTimestamp() },
          { merge: true },
        );
      }
    } else if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge;
      await adminDb.collection('auditLogs').add({
        eventType: 'charge_refunded',
        eventDetails: {
          chargeId: charge.id,
          amount: charge.amount_refunded,
          paymentIntent: charge.payment_intent,
        },
        createdAt: FieldValue.serverTimestamp(),
        severity: 'warning',
      });
      // Mark any matching purchase as refunded
      const purchasesSnap = await adminDb
        .collection('purchases')
        .where('stripePaymentIntentId', '==', charge.payment_intent ?? '')
        .limit(1)
        .get();
      if (!purchasesSnap.empty) {
        await purchasesSnap.docs[0].ref.set(
          { status: 'refunded', refundedAt: FieldValue.serverTimestamp() },
          { merge: true },
        );
      }
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

async function grantHvacTechTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_hvac_tech')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_hvac_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrHvacTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_hvac_tech_test_human',
    examLevel: 'jr_hvac_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. HVAC Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantSolarInstTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_solar_inst')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_solar_inst_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrSolarInstAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_solar_inst_test_human',
    examLevel: 'jr_solar_inst',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Solar Installer Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantWindTechTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_wind_tech')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_wind_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrWindTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_wind_tech_test_human',
    examLevel: 'jr_wind_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Wind Turbine Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantFireAlarmTechTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_fire_alarm_tech')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_fire_alarm_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrFireAlarmTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_fire_alarm_tech_test_human',
    examLevel: 'jr_fire_alarm_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Fire Alarm Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantSecurityTechTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_security_tech')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_security_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrSecurityTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_security_tech_test_human',
    examLevel: 'jr_security_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Security Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantFieldPmTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_field_pm')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_field_pm_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrFieldPmAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_field_pm_test_human',
    examLevel: 'jr_field_pm',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Field PM Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantPumpTechTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_pump_tech')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_pump_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrPumpTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_pump_tech_test_human',
    examLevel: 'jr_pump_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Pump Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantPlcTechTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_plc_tech')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_plc_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrPlcTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_plc_tech_test_human',
    examLevel: 'jr_plc_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. PLC Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantRefTechTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_ref_tech')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_ref_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrRefTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_ref_tech_test_human',
    examLevel: 'jr_ref_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Ref Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantBasTechTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_bas_tech')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_bas_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrBasTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_bas_tech_test_human',
    examLevel: 'jr_bas_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. BAS Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantBmetTechTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_bmet_tech')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_bmet_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrBmetTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_bmet_tech_test_human',
    examLevel: 'jr_bmet_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. BMET Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantElevatorTechTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_elevator_tech')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_elevator_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrElevatorTechAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_elevator_tech_test_human',
    examLevel: 'jr_elevator_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Elevator Tech Human Proctored Test-Out — schedule proctor session and unlock when ready.',
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

async function grantIndustrialRefTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_industrial_ref')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_industrial_ref_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrIndustrialRefAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_industrial_ref_test_human',
    examLevel: 'jr_industrial_ref',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Industrial Ref Operator Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantDcOpsTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_dc_ops')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_dc_ops_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrDcOpsAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_dc_ops_test_human',
    examLevel: 'jr_dc_ops',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Data Center Operations Manager Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantBuildingCxTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_building_cx')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_building_cx_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrBuildingCxAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_building_cx_test_human',
    examLevel: 'jr_building_cx',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Building Commissioning Agent Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

async function grantTelecomTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('training_telecom')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });

  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_telecom_tech_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function grantJrTelecomAccess(userId: string, purchaseId: string) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    purchaseId,
    productId: 'jr_telecom_tech_test_human',
    examLevel: 'jr_telecom_tech',
    testOut: true,
    proctoring: 'human',
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: 'Jr. Telecom OSP Technician Human Proctored Test-Out — schedule proctor session and unlock when ready.',
  });
}

// ── Main handler ───────────────────────────────────────────────────────────

async function handleCheckoutCompleted(eventId: string, session: Stripe.Checkout.Session) {
  // Idempotency guard: skip if this Stripe event was already processed
  const eventRef = adminDb.collection('processedWebhookEvents').doc(eventId);
  const alreadyProcessed = await adminDb.runTransaction(async (tx) => {
    const doc = await tx.get(eventRef);
    if (doc.exists) return true;
    tx.set(eventRef, { processedAt: FieldValue.serverTimestamp(), sessionId: session.id });
    return false;
  });
  if (alreadyProcessed) {
    console.log('Duplicate webhook event skipped:', eventId);
    return;
  }

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

    // ── Standalone training course (HVAC Technician) ─────────────────────────
    case 'training_hvac_tech':
      await grantHvacTechTrainingAccess(userId, pid);
      break;

    // ── HVAC Tech Test-Out ────────────────────────────────────────────────────
    case 'jr_hvac_tech_test_human':
      await grantJrHvacTechAccess(userId, pid);
      break;

    // ── Package: HVAC Tech Training + Test-Out ────────────────────────────────
    case 'pkg_training_hvac_tech_testout':
      await grantHvacTechTrainingAccess(userId, pid);
      await grantJrHvacTechAccess(userId, pid);
      break;

    // ── Standalone training course (Solar Installer) ──────────────────────────
    case 'training_solar_inst':
      await grantSolarInstTrainingAccess(userId, pid);
      break;

    // ── Solar Installer Test-Out ──────────────────────────────────────────────
    case 'jr_solar_inst_test_human':
      await grantJrSolarInstAccess(userId, pid);
      break;

    // ── Package: Solar Installer Training + Test-Out ──────────────────────────
    case 'pkg_training_solar_inst_testout':
      await grantSolarInstTrainingAccess(userId, pid);
      await grantJrSolarInstAccess(userId, pid);
      break;

    // ── Standalone training course (Fire Alarm Technician) ───────────────────
    case 'training_fire_alarm_tech':
      await grantFireAlarmTechTrainingAccess(userId, pid);
      break;

    // ── Fire Alarm Tech Test-Out ──────────────────────────────────────────────
    case 'jr_fire_alarm_tech_test_human':
      await grantJrFireAlarmTechAccess(userId, pid);
      break;

    // ── Package: Fire Alarm Tech Training + Test-Out ──────────────────────────
    case 'pkg_training_fire_alarm_tech_testout':
      await grantFireAlarmTechTrainingAccess(userId, pid);
      await grantJrFireAlarmTechAccess(userId, pid);
      break;

    // ── Standalone training course (Biomedical Equipment Technician) ──────────
    case 'training_bmet_tech':
      await grantBmetTechTrainingAccess(userId, pid);
      break;

    // ── BMET Test-Out ─────────────────────────────────────────────────────────
    case 'jr_bmet_tech_test_human':
      await grantJrBmetTechAccess(userId, pid);
      break;

    // ── Package: BMET Training + Test-Out ────────────────────────────────────
    case 'pkg_training_bmet_tech_testout':
      await grantBmetTechTrainingAccess(userId, pid);
      await grantJrBmetTechAccess(userId, pid);
      break;

    // ── Standalone training course (Commercial Refrigeration) ────────────────
    case 'training_ref_tech':
      await grantRefTechTrainingAccess(userId, pid);
      break;

    // ── Ref Tech Test-Out ─────────────────────────────────────────────────────
    case 'jr_ref_tech_test_human':
      await grantJrRefTechAccess(userId, pid);
      break;

    // ── Package: Ref Tech Training + Test-Out ─────────────────────────────────
    case 'pkg_training_ref_tech_testout':
      await grantRefTechTrainingAccess(userId, pid);
      await grantJrRefTechAccess(userId, pid);
      break;

    // ── Standalone training course (Industrial Controls & PLC) ───────────────
    case 'training_plc_tech':
      await grantPlcTechTrainingAccess(userId, pid);
      break;

    // ── PLC Tech Test-Out ─────────────────────────────────────────────────────
    case 'jr_plc_tech_test_human':
      await grantJrPlcTechAccess(userId, pid);
      break;

    // ── Package: PLC Tech Training + Test-Out ────────────────────────────────
    case 'pkg_training_plc_tech_testout':
      await grantPlcTechTrainingAccess(userId, pid);
      await grantJrPlcTechAccess(userId, pid);
      break;

    // ── Standalone training course (Electronic Security Systems) ─────────────
    case 'training_security_tech':
      await grantSecurityTechTrainingAccess(userId, pid);
      break;

    // ── Security Tech Test-Out ────────────────────────────────────────────────
    case 'jr_security_tech_test_human':
      await grantJrSecurityTechAccess(userId, pid);
      break;

    // ── Package: Security Tech Training + Test-Out ───────────────────────────
    case 'pkg_training_security_tech_testout':
      await grantSecurityTechTrainingAccess(userId, pid);
      await grantJrSecurityTechAccess(userId, pid);
      break;

    // ── Standalone training course (Building Automation Systems) ─────────────
    case 'training_bas_tech':
      await grantBasTechTrainingAccess(userId, pid);
      break;

    // ── BAS Tech Test-Out ─────────────────────────────────────────────────────
    case 'jr_bas_tech_test_human':
      await grantJrBasTechAccess(userId, pid);
      break;

    // ── Package: BAS Tech Training + Test-Out ────────────────────────────────
    case 'pkg_training_bas_tech_testout':
      await grantBasTechTrainingAccess(userId, pid);
      await grantJrBasTechAccess(userId, pid);
      break;

    // ── Standalone training course (Elevator Technician) ────────────────────
    case 'training_elevator_tech':
      await grantElevatorTechTrainingAccess(userId, pid);
      break;

    // ── Elevator Tech Test-Out ────────────────────────────────────────────────
    case 'jr_elevator_tech_test_human':
      await grantJrElevatorTechAccess(userId, pid);
      break;

    // ── Package: Elevator Tech Training + Test-Out ───────────────────────────
    case 'pkg_training_elevator_tech_testout':
      await grantElevatorTechTrainingAccess(userId, pid);
      await grantJrElevatorTechAccess(userId, pid);
      break;

    // ── Standalone training course (Wind Turbine Technician) ─────────────────
    case 'training_wind_tech':
      await grantWindTechTrainingAccess(userId, pid);
      break;

    // ── Wind Turbine Tech Test-Out ────────────────────────────────────────────
    case 'jr_wind_tech_test_human':
      await grantJrWindTechAccess(userId, pid);
      break;

    // ── Package: Wind Turbine Tech Training + Test-Out ────────────────────────
    case 'pkg_training_wind_tech_testout':
      await grantWindTechTrainingAccess(userId, pid);
      await grantJrWindTechAccess(userId, pid);
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

    // ── Standalone training course (Field Project Manager) ───────────────────
    case 'training_field_pm':
      await grantFieldPmTrainingAccess(userId, pid);
      break;

    // ── Field PM Test-Out ─────────────────────────────────────────────────────
    case 'jr_field_pm_test_human':
      await grantJrFieldPmAccess(userId, pid);
      break;

    // ── Package: Field PM Training + Test-Out ────────────────────────────────
    case 'pkg_training_field_pm_testout':
      await grantFieldPmTrainingAccess(userId, pid);
      await grantJrFieldPmAccess(userId, pid);
      break;

    // ── Standalone training course (Pump Technician) ─────────────────────────
    case 'training_pump_tech':
      await grantPumpTechTrainingAccess(userId, pid);
      break;

    // ── Pump Tech Test-Out ────────────────────────────────────────────────────
    case 'jr_pump_tech_test_human':
      await grantJrPumpTechAccess(userId, pid);
      break;

    // ── Package: Pump Tech Training + Test-Out ───────────────────────────────
    case 'pkg_training_pump_tech_testout':
      await grantPumpTechTrainingAccess(userId, pid);
      await grantJrPumpTechAccess(userId, pid);
      break;

    // ── Standalone training course (Industrial Refrigeration Operator) ───────
    case 'training_industrial_ref':
      await grantIndustrialRefTrainingAccess(userId, pid);
      break;

    // ── Industrial Ref Test-Out ───────────────────────────────────────────────
    case 'jr_industrial_ref_test_human':
      await grantJrIndustrialRefAccess(userId, pid);
      break;

    // ── Package: Industrial Ref Training + Test-Out ───────────────────────────
    case 'pkg_training_industrial_ref_testout':
      await grantIndustrialRefTrainingAccess(userId, pid);
      await grantJrIndustrialRefAccess(userId, pid);
      break;

    // ── Standalone training course (Data Center Operations Manager) ───────────
    case 'training_dc_ops':
      await grantDcOpsTrainingAccess(userId, pid);
      break;

    // ── DC Ops Test-Out ───────────────────────────────────────────────────────
    case 'jr_dc_ops_test_human':
      await grantJrDcOpsAccess(userId, pid);
      break;

    // ── Package: DC Ops Training + Test-Out ──────────────────────────────────
    case 'pkg_training_dc_ops_testout':
      await grantDcOpsTrainingAccess(userId, pid);
      await grantJrDcOpsAccess(userId, pid);
      break;

    // ── Standalone training course (Building Commissioning Agent) ─────────────
    case 'training_building_cx':
      await grantBuildingCxTrainingAccess(userId, pid);
      break;

    // ── Building Cx Test-Out ──────────────────────────────────────────────────
    case 'jr_building_cx_test_human':
      await grantJrBuildingCxAccess(userId, pid);
      break;

    // ── Package: Building Cx Training + Test-Out ──────────────────────────────
    case 'pkg_training_building_cx_testout':
      await grantBuildingCxTrainingAccess(userId, pid);
      await grantJrBuildingCxAccess(userId, pid);
      break;

    // ── Standalone training course (Telecom OSP Technician) ───────────────────
    case 'training_telecom':
      await grantTelecomTrainingAccess(userId, pid);
      break;

    // ── Telecom Test-Out ──────────────────────────────────────────────────────
    case 'jr_telecom_tech_test_human':
      await grantJrTelecomAccess(userId, pid);
      break;

    // ── Package: Telecom Training + Test-Out ──────────────────────────────────
    case 'pkg_training_telecom_testout':
      await grantTelecomTrainingAccess(userId, pid);
      await grantJrTelecomAccess(userId, pid);
      break;

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

  // Order confirmation email — best effort
  if (email) {
    const customerName = session.customer_details?.name ?? '';
    const productEntry = (STRIPE_PRODUCTS as Record<string, { name: string; shortName: string }>)[productId];
    const productName = productEntry?.shortName ?? productEntry?.name ?? productId;
    const amountCents = session.amount_total ?? 0;
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ups-cert-platform.vercel.app';
    sendOrderConfirmationEmail(email, customerName, productName, amountCents, `${SITE_URL}/dashboard`).catch(() => {});
  }
}
