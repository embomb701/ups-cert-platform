import Stripe from 'stripe';

/**
 * Server-side Stripe client. Never use in client components.
 * The secret key is only available server-side.
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable.');
  }
  return new Stripe(key, {
    apiVersion: '2024-04-10',
    typescript: true,
  });
}

export const STRIPE_PRODUCTS = {
  jr_fsc_exam: {
    name: 'Junior UPS Field Service Certification Exam',
    shortName: 'Jr. FSC Exam',
    priceInCents: 20000, // $200.00
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_FSC ?? '',
  },
  fsc_proctored_exam: {
    name: 'UPS Field Service Certification Exam (Proctored)',
    shortName: 'FSC Exam',
    priceInCents: 50000, // $500.00
    stripePriceId: process.env.STRIPE_PRICE_ID_FSC ?? '',
  },
} as const;
