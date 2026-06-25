import Stripe from 'stripe';

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY environment variable.');
  return new Stripe(key, { apiVersion: '2024-04-10', typescript: true });
}

export const STRIPE_PRODUCTS = {
  // ── Individual exams ──────────────────────────────────────────
  jr_fse_exam: {
    name: 'Jr. FSE Certification Exam',
    shortName: 'Jr. FSE Exam',
    priceInCents: 19900,
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_FSE ?? '',
  },
  fse_ai_exam: {
    name: 'FSE Certification Exam — AI Proctored',
    shortName: 'FSE AI Exam',
    priceInCents: 34900,
    stripePriceId: process.env.STRIPE_PRICE_ID_FSE_AI ?? '',
  },
  fse_proctored_exam: {
    name: 'FSE Certification Exam — Human Proctored',
    shortName: 'FSE Human Proctored Exam',
    priceInCents: 64900,
    stripePriceId: process.env.STRIPE_PRICE_ID_FSE ?? '',
  },

  // ── Training ──────────────────────────────────────────────────
  training_portal: {
    name: 'FSE Academy Training Portal Access',
    shortName: 'Training Portal',
    priceInCents: 14900,
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING ?? 'price_1TmJLsB8fedYuRufhjtQgnSS',
  },

  // ── Bundles ───────────────────────────────────────────────────
  fse_ai_bundle: {
    name: 'FSE AI Complete Bundle — Training + AI Proctored Exam',
    shortName: 'FSE AI Complete Bundle',
    priceInCents: 44900,
    stripePriceId: process.env.STRIPE_PRICE_ID_FSE_AI_BUNDLE ?? 'price_1TmJObB8fedYuRufyk9sM6gP',
  },
  fse_human_bundle: {
    name: 'FSE Human Complete Bundle — Training + Human Proctored Exam + Signed Book',
    shortName: 'FSE Human Complete Bundle',
    priceInCents: 69900,
    stripePriceId: process.env.STRIPE_PRICE_ID_FSE_BUNDLE ?? 'price_1TmJPtB8fedYuRufMs2WCa5I',
  },

  // ── Employer packs (Stripe IDs added once created) ────────────
  employer_5pack: {
    name: 'Employer Team Pack — 5 FSE Human Complete Bundles',
    shortName: '5-Seat Team Pack',
    priceInCents: 339900,
    stripePriceId: process.env.STRIPE_PRICE_ID_EMPLOYER_5PACK ?? '',
  },
  employer_10pack: {
    name: 'Employer Team Pack — 10 FSE Human Complete Bundles',
    shortName: '10-Seat Team Pack',
    priceInCents: 525000,
    stripePriceId: process.env.STRIPE_PRICE_ID_EMPLOYER_10PACK ?? '',
  },
} as const;
