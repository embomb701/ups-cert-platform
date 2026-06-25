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

async function grantTrainingAccess(userId: string, purchaseId: string) {
  await adminDb
    .collection('users')
    .doc(userId)
    .collection('examAccess')
    .doc('training_portal')
    .set({ granted: true, grantedAt: FieldValue.serverTimestamp(), purchaseId }, { merge: true });
}

async function grantExamAccess(userId: string, examDoc: string, productId: string, purchaseId: string) {
  await adminDb
    .collection('users')
    .doc(userId)
    .collection('examAccess')
    .doc(examDoc)
    .set({ productId, purchaseId, granted: true, grantedAt: FieldValue.serverTimestamp() }, { merge: true });
}

async function createProctoredOrder(userId: string, email: string, purchaseId: string, productId: string, includesBook = false) {
  await adminDb.collection('proctoredExamOrders').add({
    userId,
    email,
    purchaseId,
    productId,
    status: 'scheduling_pending',
    schedulingStatus: 'awaiting_contact',
    includesSignedBook: includesBook,
    bookShipped: false,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    proctorId: null,
    proctorName: null,
    meetingLink: null,
    adminNotes: includesBook ? 'SIGNED BOOK INCLUDED — ship to candidate before exam date.' : '',
  });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { userId, productId, email } = session.metadata ?? {};
  if (!userId || !productId) {
    console.error('Missing metadata on session', session.id);
    return;
  }

  await adminDb.collection('purchases').doc(session.id).update({
    status: 'complete',
    stripePaymentIntentId: session.payment_intent ?? '',
    completedAt: FieldValue.serverTimestamp(),
  });

  // ── Individual exams ─────────────────────────────────────────
  if (productId === 'jr_fse_exam') {
    await grantExamAccess(userId, 'jr_fse', 'jr_fse_exam', session.id);
  }

  if (productId === 'fse_ai_exam') {
    await grantExamAccess(userId, 'fse_ai', 'fse_ai_exam', session.id);
  }

  if (productId === 'fse_proctored_exam') {
    await createProctoredOrder(userId, email ?? '', session.id, 'fse_proctored_exam', false);
  }

  // ── Training portal ──────────────────────────────────────────
  if (productId === 'training_portal') {
    await grantTrainingAccess(userId, session.id);
  }

  // ── Bundles ──────────────────────────────────────────────────
  if (productId === 'fse_ai_bundle') {
    await Promise.all([
      grantTrainingAccess(userId, session.id),
      grantExamAccess(userId, 'fse_ai', 'fse_ai_exam', session.id),
    ]);
  }

  if (productId === 'fse_human_bundle') {
    await Promise.all([
      grantTrainingAccess(userId, session.id),
      createProctoredOrder(userId, email ?? '', session.id, 'fse_proctored_exam', true),
    ]);
  }

  // ── Employer packs ───────────────────────────────────────────
  if (productId === 'employer_5pack' || productId === 'employer_10pack') {
    const seats = productId === 'employer_10pack' ? 10 : 5;
    await adminDb.collection('employerOrders').add({
      userId,
      email,
      purchaseId: session.id,
      productId,
      seats,
      seatsUsed: 0,
      status: 'active',
      createdAt: FieldValue.serverTimestamp(),
      adminNotes: `Employer purchased ${seats}-seat pack. ${seats} signed books to ship. Contact to coordinate candidate onboarding.`,
    });
  }

  await adminDb.collection('auditLogs').add({
    userId,
    eventType: 'purchase_completed',
    eventDetails: { productId, sessionId: session.id },
    createdAt: FieldValue.serverTimestamp(),
    severity: 'info',
  });
}
