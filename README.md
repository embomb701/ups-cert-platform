# Mastering Field Service — Certification Platform

Field service certification and training platform built on Next.js, Firebase, and Stripe. Trains and certifies technicians across 28 trade programs (UPS/FSE, HVAC, generators, data center power, solar/BESS, EV charging, marine, pool equipment, fire alarm, BMET, and more) — each with a training course, a written certification exam, and public certificate verification.

Based on the book *Mastering Uninterruptible Power Supplies, Field Service Engineering*.

The full, current product catalog (names, prices, Stripe price ID env vars) lives in `src/lib/stripe/client.ts` (`STRIPE_PRODUCTS`) — treat that file as the source of truth, not this README.

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/embomb701/ups-cert-platform.git
cd ups-cert-platform
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local and fill in real values — every variable is documented inline there.
```

### 3. Firebase setup

1. Go to [Firebase Console](https://console.firebase.google.com) → Create project
2. **Authentication** → Sign-in method → Enable Google
3. **Firestore** → Create database → Start in production mode
4. **Project Settings** → General → Your apps → Add Web app → copy config to `.env.local`
5. **Project Settings** → Service Accounts → Generate new private key → copy values to `.env.local`
6. Deploy Firestore rules: `firebase deploy --only firestore:rules`

### 4. Stripe setup

1. Create a [Stripe account](https://stripe.com)
2. **Dashboard** → Products → create a price for each entry in `STRIPE_PRODUCTS` (`src/lib/stripe/client.ts`) you intend to sell
3. Copy each price ID to the matching `STRIPE_PRICE_ID_*` variable in `.env.local`
4. Copy publishable and secret keys to `.env.local`
5. Set up the webhook (after deploying — see [DEPLOY.md](./DEPLOY.md))

### 5. Question bank

Real question banks already live in `data/questions/*.json` (one `*-jr-fresh.json`/`*-jr-derived.json` pair per program). To validate and (re-)import them:

```bash
npm run validate-questions -- --file data/questions/<file>.json
npm run import-questions -- --file data/questions/<file>.json
```

### 6. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

The site is gated behind `src/middleware.ts` (an unbranded username/password screen) until launch — see the `SITE_GATE_*` variables in `.env.example`.

---

## Deployment

The live site deploys to **Vercel**, auto-deploying on every push to `main`. See [DEPLOY.md](./DEPLOY.md) for the full setup (env vars, Stripe webhook, Firestore rules, admin bootstrap).

---

## Testing

```bash
npm run type-check   # tsc --noEmit
npm run lint         # next lint
npm test             # vitest run — unit tests for exam scoring and Stripe pricing
npm run test:watch   # vitest, watch mode
```

Test coverage today focuses on the highest-integrity-risk logic: exam scoring (`src/lib/exam/engine.test.ts`) and the Stripe product/pricing table (`src/lib/stripe/client.test.ts`). The Stripe webhook handler (`src/app/api/stripe/webhook/route.ts`) is not yet covered — it's large (60+ per-product access-grant functions) and needs tests written deliberately, not generated in bulk.

### Manual smoke test — payment flow
1. Use Stripe test-mode keys in `.env.local`
2. Test card: `4242 4242 4242 4242`, any future date, any CVC
3. After payment, check Firestore for the corresponding purchase/access record

### Manual smoke test — webhook locally
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Manual smoke test — exam flow
1. Sign in, purchase an exam, accept the rules, start the exam
2. Verify questions render with no correct answers present in the client payload
3. Complete the exam, verify the score in Firestore `examAttempts`
4. If passed, verify the certificate in Firestore `certificates`
5. Visit `/verify/[certificateNumber]` to confirm public verification works

---

## Admin Setup

1. Sign in to the platform with your Google account
2. In Firebase Console → Firestore → `users` collection → find your document
3. Set `role: "admin"` on your user document
4. Also add your email to the `ADMIN_EMAILS` env var
5. The `/admin` route will now be accessible

---

## Important Disclaimers

**This platform must remain independent.** Do not add:
- Current employer name or logo
- Customer names or project names
- Internal documents, photos, or procedures
- OEM-specific proprietary content

These certifications are educational knowledge credentials. They do not authorize energized electrical work, replace employer training, OEM qualification, electrical licensing, NFPA 70E, OSHA requirements, or site-specific procedures.

See `src/components/layout/FooterDisclaimer.tsx` for the required site-wide disclaimer.
