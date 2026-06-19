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
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'charge.refunded':
      case 'charge.dispute.created':
        await handleRefundOrDispute(event.data.object as Stripe.Charge | Stripe.Dispute, event.type);
        break;
      default:
        // Unhandled event types are acknowledged so Stripe stops retrying.
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: 'Handler error' }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Only fulfill once the payment is actually captured. A completed session can
  // exist with payment_status 'unpaid' (e.g. async/delayed methods) — granting
  // access then would be free product.
  if (session.payment_status !== 'paid') {
    console.warn('Session completed but not paid; skipping fulfillment', session.id, session.payment_status);
    return;
  }

  const meta = session.metadata ?? {};

  // Claim the purchase atomically so Stripe's at-least-once / retry deliveries
  // cannot double-fulfill. Also recover identifiers from the pending doc if the
  // session metadata is missing or events arrive out of order.
  const purchaseRef = adminDb.collection('purchases').doc(session.id);
  const claim = await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(purchaseRef);
    const existing = snap.exists ? snap.data()! : null;

    if (existing?.status === 'complete') {
      return { state: 'already_done' as const };
    }

    const userId = meta.userId || existing?.userId;
    const productId = meta.productId || existing?.productId;
    const email = meta.email || existing?.email || '';

    if (!userId || !productId) {
      return { state: 'unresolved' as const };
    }

    tx.set(
      purchaseRef,
      {
        id: session.id,
        userId,
        productId,
        email,
        stripeCheckoutSessionId: session.id,
        status: 'complete',
        stripePaymentIntentId:
          typeof session.payment_intent === 'string' ? session.payment_intent : '',
        completedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return { state: 'fulfill' as const, userId, productId, email };
  });

  if (claim.state === 'already_done') {
    return; // idempotent: this delivery was already processed
  }

  if (claim.state === 'unresolved') {
    console.error('Cannot fulfill checkout session — missing userId/productId', session.id);
    await adminDb.collection('auditLogs').add({
      eventType: 'fulfillment_failed',
      eventDetails: { sessionId: session.id, reason: 'missing_metadata' },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'critical',
    });
    return;
  }

  const { userId, productId, email } = claim;

  if (productId === 'jr_fse_exam') {
    await grantExamAccess(userId, 'jr_fse', 'jr_fse_exam', session.id);
  } else if (productId === 'fse_ai_exam') {
    await grantExamAccess(userId, 'fse_ai', 'fse_ai_exam', session.id);
  } else if (productId === 'fse_proctored_exam') {
    // Deterministic doc id keyed by the session so retries do not create
    // duplicate orders. create() is a no-op-via-catch if it already exists,
    // which also avoids clobbering a status a proctor has already advanced.
    try {
      await adminDb.collection('proctoredExamOrders').doc(session.id).create({
        userId,
        email,
        purchaseId: session.id,
        productId: 'fse_proctored_exam',
        status: 'scheduling_pending',
        schedulingStatus: 'awaiting_contact',
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        proctorId: null,
        proctorName: null,
        meetingLink: null,
        adminNotes: '',
      });
    } catch (err: unknown) {
      // ALREADY_EXISTS (code 6) on a retry is expected; rethrow anything else.
      if ((err as { code?: number })?.code !== 6) throw err;
    }
  }

  // Audit log — only runs on first fulfillment thanks to the idempotency guard.
  await adminDb.collection('auditLogs').add({
    userId,
    eventType: 'purchase_completed',
    eventDetails: { productId, sessionId: session.id },
    createdAt: FieldValue.serverTimestamp(),
    severity: 'info',
  });
}

async function grantExamAccess(
  userId: string,
  accessDoc: 'jr_fse' | 'fse_ai',
  productId: string,
  purchaseId: string
) {
  await adminDb
    .collection('users')
    .doc(userId)
    .collection('examAccess')
    .doc(accessDoc)
    .set(
      {
        productId,
        purchaseId,
        granted: true,
        grantedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
}

/**
 * Revoke exam access and flag the purchase when a charge is refunded or
 * disputed. Best-effort: matched by payment intent recorded at fulfillment.
 */
async function handleRefundOrDispute(
  obj: Stripe.Charge | Stripe.Dispute,
  eventType: string
) {
  const paymentIntent =
    typeof obj.payment_intent === 'string' ? obj.payment_intent : null;
  if (!paymentIntent) return;

  const matches = await adminDb
    .collection('purchases')
    .where('stripePaymentIntentId', '==', paymentIntent)
    .limit(5)
    .get();

  for (const doc of matches.docs) {
    const purchase = doc.data();
    await doc.ref.set(
      { status: 'refunded', refundedAt: FieldValue.serverTimestamp(), refundEvent: eventType },
      { merge: true }
    );

    // Pull the access grant for self-serve exams.
    const accessDoc =
      purchase.productId === 'jr_fse_exam'
        ? 'jr_fse'
        : purchase.productId === 'fse_ai_exam'
        ? 'fse_ai'
        : null;
    if (accessDoc && purchase.userId) {
      await adminDb
        .collection('users')
        .doc(purchase.userId)
        .collection('examAccess')
        .doc(accessDoc)
        .set({ granted: false, revokedAt: FieldValue.serverTimestamp() }, { merge: true });
    }

    await adminDb.collection('auditLogs').add({
      userId: purchase.userId ?? null,
      eventType: 'purchase_refunded',
      eventDetails: { purchaseId: doc.id, paymentIntent, eventType },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'warning',
    });
  }
}
