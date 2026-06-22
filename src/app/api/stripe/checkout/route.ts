import { NextRequest, NextResponse } from 'next/server';
import { getStripe, STRIPE_PRODUCTS } from '@/lib/stripe/client';

export const dynamic = 'force-dynamic';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { hashIp, getRealIp } from '@/lib/utils/ipHash';
import type { ProductId } from '@/types';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    // Verify Firebase auth token from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    let uid: string;
    let email: string;
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
      email = decoded.email ?? '';
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const productId = body.productId as ProductId;

    const product = STRIPE_PRODUCTS[productId];
    if (!product) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    const stripe = getStripe();

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: product.priceInCents,
            product_data: {
              name: product.name,
              description: `Mastering FSE — ${product.shortName}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: uid,
        email,
        productId,
      },
      success_url: `${siteUrl}/checkout/success?product=${productId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    });

    // Record the pending purchase in Firestore
    const ipHash = hashIp(getRealIp(req));
    await adminDb.collection('purchases').doc(session.id).set({
      id: session.id,
      userId: uid,
      email,
      productId,
      stripeCheckoutSessionId: session.id,
      amount: product.priceInCents,
      currency: 'usd',
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      purchaseIpHash: ipHash,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err?.message ?? err);
    const msg = err?.message ?? 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
