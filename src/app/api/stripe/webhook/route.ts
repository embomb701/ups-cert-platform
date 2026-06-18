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

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { userId, productId, email } = session.metadata ?? {};
  if (!userId || !productId) {
    console.error('Missing metadata on session', session.id);
    return;
  }

  // Update purchase status to complete
  await adminDb.collection('purchases').doc(session.id).update({
    status: 'complete',
    stripePaymentIntentId: session.payment_intent ?? '',
    completedAt: FieldValue.serverTimestamp(),
  });

  if (productId === 'jr_fse_exam') {
    // Jr. FSE: create access record directly
    await adminDb
      .collection('users')
      .doc(userId)
      .collection('examAccess')
      .doc('jr_fse')
      .set(
        {
          productId: 'jr_fse_exam',
          purchaseId: session.id,
          granted: true,
          grantedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
  }

  if (productId === 'fse_ai_exam') {
    // FSE AI: create access record directly (no scheduling needed)
    await adminDb
      .collection('users')
      .doc(userId)
      .collection('examAccess')
      .doc('fse_ai')
      .set(
        {
          productId: 'fse_ai_exam',
          purchaseId: session.id,
          granted: true,
          grantedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
  }

  if (productId === 'fse_proctored_exam') {
    // FSE: create proctored order — does NOT unlock exam
    await adminDb.collection('proctoredExamOrders').add({
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
  }

  // Audit log
  await adminDb.collection('auditLogs').add({
    userId,
    eventType: 'purchase_completed',
    eventDetails: { productId, sessionId: session.id },
    createdAt: FieldValue.serverTimestamp(),
    severity: 'info',
  });
}
