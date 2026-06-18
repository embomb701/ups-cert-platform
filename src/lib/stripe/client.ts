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
  jr_fse_exam: {
    name: 'Junior UPS Field Service Certification Exam',
    shortName: 'Jr. FSE Exam',
    priceInCents: 20000, // $200.00
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_FSE ?? '',
  },
  fse_ai_exam: {
    name: 'UPS FSE Certification Exam — AI Proctored',
    shortName: 'FSE AI Proctored Exam',
    priceInCents: 34900, // $349.00
    stripePriceId: process.env.STRIPE_PRICE_ID_FSE_AI ?? '',
  },
  fse_proctored_exam: {
    name: 'UPS FSE Certification Exam — Human Proctored',
    shortName: 'FSE Human Proctored Exam',
    priceInCents: 50000, // $500.00
    stripePriceId: process.env.STRIPE_PRICE_ID_FSE ?? '',
  },
} as const;
