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

  // Record a pending Jr. FSE grant — unlocked automatically when all 24 modules complete
  await adminDb
    .collection('users').doc(userId)
    .collection('examAccess').doc('jr_fse_pending')
    .set({ fromTraining: true, purchaseId, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
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
    // ── Standalone training course ─────────────────────────────────────────
    case 'training_course':
    case 'training_portal': // backwards-compat for old purchases
      await grantTrainingAccess(userId, pid);
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
