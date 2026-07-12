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

  // 3-to-6-month program: 28 modules, Jr. FSE exam unlocked after completion
  training_course: {
    name: 'UPS FSE Training Course (3–6 Months) + Jr. FSE Certification Exam',
    shortName: 'Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_COURSE ?? 'price_1TmJLsB8fedYuRufhjtQgnSS',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PRACTICE TEST — not a certification attempt; no cert issued on pass
  // Can be made temporarily free by admin via Firestore settings/practiceTest
  // ─────────────────────────────────────────────────────────────────────────

  practice_test: {
    name: 'Jr. FSE Practice Exam',
    shortName: 'Jr. FSE Practice Test',
    priceInCents: 1499,     // $14.99
    stripePriceId: process.env.STRIPE_PRICE_ID_PRACTICE_TEST ?? 'price_1TmflrB8fedYuRufBJZIH3CC',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // JR. FSE TEST-OUT (skip training — one attempt only, fail = must train)
  // ─────────────────────────────────────────────────────────────────────────

  // Human proctored: live proctor session, more accountability
  jr_fse_test_human: {
    name: 'Jr. FSE Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. FSE Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_FSE_HUMAN ?? 'price_1TmfniB8fedYuRufPOIIsixS',
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

  // Training + Jr. FSE Human test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_jr_human: {
    name: 'Training Course + Jr. FSE Test-Out (Human Proctored)',
    shortName: 'Training + Jr. FSE Human Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_JR_HUMAN ?? 'price_1TmflsB8fedYuRufm9Uqnfti',
  },

  // Training + FSE ($1,499 + $649 = $2,148 → $2,099, save $49)
  pkg_training_fse: {
    name: 'Training Course + FSE Exam (Human Proctored)',
    shortName: 'Training + FSE Package',
    priceInCents: 209900,   // $2,099
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_FSE ?? 'price_1TmflsB8fedYuRufQCtOIJN5',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // COMMERCIAL KITCHEN FSE PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_kitchen: {
    name: 'Commercial Kitchen FSE Training Course + Jr. Kitchen FSE Certification Exam',
    shortName: 'Kitchen Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_KITCHEN ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_kitchen_fse_test_human: {
    name: 'Jr. Kitchen FSE Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Kitchen FSE Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_KITCHEN_FSE_HUMAN ?? '',
  },

  // Kitchen training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_kitchen_testout: {
    name: 'Kitchen Training Course + Jr. Kitchen FSE Test-Out (Human Proctored)',
    shortName: 'Kitchen Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_KITCHEN_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // HVAC FSE PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_hvac: {
    name: 'HVAC FSE Training Course + Jr. HVAC FSE Certification Exam',
    shortName: 'HVAC Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_HVAC ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_hvac_fse_test_human: {
    name: 'Jr. HVAC FSE Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. HVAC FSE Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_HVAC_FSE_HUMAN ?? '',
  },

  // HVAC training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_hvac_testout: {
    name: 'HVAC Training Course + Jr. HVAC FSE Test-Out (Human Proctored)',
    shortName: 'HVAC Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_HVAC_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GENERATOR (POWER GENERATION) FSE PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_generator: {
    name: 'Power Generation FSE Training Course + Jr. Generator FSE Certification Exam',
    shortName: 'Generator Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_GENERATOR ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_gen_fse_test_human: {
    name: 'Jr. Generator FSE Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Generator FSE Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_GEN_FSE_HUMAN ?? '',
  },

  // Generator training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_generator_testout: {
    name: 'Generator Training Course + Jr. Generator FSE Test-Out (Human Proctored)',
    shortName: 'Generator Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_GENERATOR_TESTOUT ?? '',
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
