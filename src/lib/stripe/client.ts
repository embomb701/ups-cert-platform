import Stripe from 'stripe';

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY environment variable.');
  return new Stripe(key, { apiVersion: '2024-04-10', typescript: true });
}

export const STRIPE_PRODUCTS = {
  // ─────────────────────────────────────────────────────────────────────────
  // TRAINING PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  // 6-month program: 24 modules, Jr. FSE exam unlocked after completion
  training_course: {
    name: '6-Month UPS FSE Training Course + Jr. FSE Certification Exam',
    shortName: 'Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_COURSE ?? 'price_1TmJLsB8fedYuRufhjtQgnSS',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // JR. FSE TEST-OUT (skip training — one attempt only, fail = must train)
  // ─────────────────────────────────────────────────────────────────────────

  // AI proctored: browser-based anti-cheat, no scheduling required
  jr_fse_test_ai: {
    name: 'Jr. FSE Certification Exam — AI Proctored Test-Out',
    shortName: 'Jr. FSE Test-Out (AI Proctored)',
    priceInCents: 19900,    // $199
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_FSE_AI ?? 'price_1TjlXWB8fedYuRufuS9JnW1B',
  },

  // Human proctored: live proctor session, more accountability
  jr_fse_test_human: {
    name: 'Jr. FSE Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. FSE Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_FSE_HUMAN ?? 'price_1TjlXWB8fedYuRufuS9Jnhum',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FSE EXAM (advanced — human proctored only)
  // ─────────────────────────────────────────────────────────────────────────

  fse_proctored_exam: {
    name: 'FSE Certification Exam — Human Proctored',
    shortName: 'FSE Exam (Human Proctored)',
    priceInCents: 64900,    // $649
    stripePriceId: process.env.STRIPE_PRICE_ID_FSE ?? 'price_1TjlZdB8fedYuRuf69YOExVF',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PACKAGES (training + exam bundle — save vs buying separately)
  // ─────────────────────────────────────────────────────────────────────────

  // Training + Jr. FSE AI test-out ($1,499 + $199 = $1,698 → $1,649, save $49)
  pkg_training_jr_ai: {
    name: 'Training Course + Jr. FSE Test-Out (AI Proctored)',
    shortName: 'Training + Jr. FSE AI Package',
    priceInCents: 164900,   // $1,649
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_JR_AI ?? 'price_1pkg_training_jr_ai',
  },

  // Training + Jr. FSE Human test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_jr_human: {
    name: 'Training Course + Jr. FSE Test-Out (Human Proctored)',
    shortName: 'Training + Jr. FSE Human Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_JR_HUMAN ?? 'price_1pkg_training_jr_human',
  },

  // Training + FSE ($1,499 + $649 = $2,148 → $2,099, save $49)
  pkg_training_fse: {
    name: 'Training Course + FSE Exam (Human Proctored)',
    shortName: 'Training + FSE Package',
    priceInCents: 209900,   // $2,099
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_FSE ?? 'price_1pkg_training_fse',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHYSICAL PRODUCTS
  // ─────────────────────────────────────────────────────────────────────────

  signed_book: {
    name: 'Mastering Uninterruptible Power Supplies — Signed Copy',
    shortName: 'Signed Book (Ships to You)',
    priceInCents: 6999,     // $69.99
    stripePriceId: process.env.STRIPE_PRICE_ID_SIGNED_BOOK ?? 'price_1TmL58B8fedYuRufJ5zfszYd',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EMPLOYER PACKS
  // ─────────────────────────────────────────────────────────────────────────

  employer_5pack: {
    name: 'Employer Team Pack — 5 Training Course Seats',
    shortName: '5-Seat Team Pack',
    priceInCents: 699900,   // $6,999
    stripePriceId: process.env.STRIPE_PRICE_ID_EMPLOYER_5PACK ?? 'price_1TmJoaB8fedYuRufbhA6kKkC',
  },

  employer_10pack: {
    name: 'Employer Team Pack — 10 Training Course Seats',
    shortName: '10-Seat Team Pack',
    priceInCents: 1299900,  // $12,999
    stripePriceId: process.env.STRIPE_PRICE_ID_EMPLOYER_10PACK ?? 'price_1TmJq1B8fedYuRuf2wQ2Osrd',
  },
} as const;

export type ProductId = keyof typeof STRIPE_PRODUCTS;
