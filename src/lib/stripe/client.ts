import Stripe from 'stripe';

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY environment variable.');
  return new Stripe(key, { apiVersion: '2024-04-10', typescript: true });
}

export const STRIPE_PRODUCTS = {
  // ── Main training program ─────────────────────────────────────
  // $1,499 — 6-month course, all 24 modules, Jr. FSE exam included at completion
  training_course: {
    name: '6-Month UPS FSE Training Course + Jr. FSE Certification Exam',
    shortName: 'FSE Training Course',
    priceInCents: 149900,
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_COURSE ?? process.env.STRIPE_PRICE_ID_TRAINING ?? 'price_1TmJLsB8fedYuRufhjtQgnSS',
  },

  // ── Test-out exam ─────────────────────────────────────────────
  // $299 — ONE attempt; fail = must complete training course to retry
  jr_fse_exam: {
    name: 'Jr. FSE Certification Exam — Test-Out',
    shortName: 'Jr. FSE Test-Out',
    priceInCents: 29900,
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_FSE ?? 'price_1TjlXWB8fedYuRufuS9JnW1B',
  },

  // ── Advanced certifications ───────────────────────────────────
  fse_proctored_exam: {
    name: 'FSE Certification Exam — Human Proctored',
    shortName: 'FSE Human Proctored Exam',
    priceInCents: 64900,
    stripePriceId: process.env.STRIPE_PRICE_ID_FSE ?? 'price_1TjlZdB8fedYuRuf69YOExVF',
  },

  // ── Physical products ─────────────────────────────────────────
  signed_book: {
    name: 'Mastering Uninterruptible Power Supplies — Signed Copy',
    shortName: 'Signed Book (Ships to You)',
    priceInCents: 6999,
    stripePriceId: process.env.STRIPE_PRICE_ID_SIGNED_BOOK ?? 'price_1TmL58B8fedYuRufJ5zfszYd',
  },

  // ── Employer packs ────────────────────────────────────────────
  // 5 training seats — saves ~$500 vs individual
  employer_5pack: {
    name: 'Employer Team Pack — 5 Training Course Seats',
    shortName: '5-Seat Team Pack',
    priceInCents: 699900,
    stripePriceId: process.env.STRIPE_PRICE_ID_EMPLOYER_5PACK ?? 'price_1TmJoaB8fedYuRufbhA6kKkC',
  },
  // 10 training seats — saves ~$1,000 vs individual
  employer_10pack: {
    name: 'Employer Team Pack — 10 Training Course Seats',
    shortName: '10-Seat Team Pack',
    priceInCents: 1299900,
    stripePriceId: process.env.STRIPE_PRICE_ID_EMPLOYER_10PACK ?? 'price_1TmJq1B8fedYuRuf2wQ2Osrd',
  },
} as const;

export type ProductId = keyof typeof STRIPE_PRODUCTS;
