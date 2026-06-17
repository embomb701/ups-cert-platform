# [PLATFORM NAME] — UPS Field Service Certification Platform

Professional UPS field service certification and training platform built on Next.js, Firebase, and Stripe.

**Products:**
- **Jr. FSC Exam** — $200, browser-based, 50 randomized questions, 90-day cooldown
- **FSC Exam** — $500, proctored live, 50 randomized questions, scheduling required

Based on the book *Mastering Uninterruptible Power Supplies, Field Service Engineering*.

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/ups-cert-platform.git
cd ups-cert-platform
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local and fill in all values
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
2. **Dashboard** → Products → Create two products:
   - "Junior UPS Field Service Certification Exam" — $200 one-time
   - "UPS Field Service Certification Exam (Proctored)" — $500 one-time
3. Copy price IDs to `.env.local` (`STRIPE_PRICE_ID_JR_FSC`, `STRIPE_PRICE_ID_FSC`)
4. Copy publishable and secret keys to `.env.local`
5. Set up webhook (after deploying):
   - Stripe Dashboard → Developers → Webhooks → Add endpoint
   - URL: `https://your-site.netlify.app/api/stripe/webhook`
   - Events: `checkout.session.completed`
   - Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 5. Import sample questions

```bash
# Validate first
npm run validate-questions

# Import to Firestore
npm run import-questions -- --file data/questions/jr-fsc-sample.json
npm run import-questions -- --file data/questions/fsc-sample.json
```

### 6. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

---

## Deployment to Netlify

### Via GitHub

1. Push your repo to GitHub
2. Log in to [Netlify](https://app.netlify.com) → New site from Git
3. Select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. **Environment variables** → Add all values from `.env.example`
6. Deploy

### Netlify config (optional `netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Stripe webhook for Netlify

After your first Netlify deploy, go to Stripe Dashboard → Webhooks → Add endpoint:
- `https://your-site.netlify.app/api/stripe/webhook`
- Event: `checkout.session.completed`
- Copy the signing secret to Netlify environment variables as `STRIPE_WEBHOOK_SECRET`

---

## Admin Setup

1. Sign in to the platform with your Google account
2. In Firebase Console → Firestore → `users` collection → find your document
3. Set `role: "admin"` on your user document
4. Also add your email to `ADMIN_EMAILS` env var
5. The `/admin` route will now be accessible

---

## Question Bank — Adding Full 1,000 Question Banks

The sample banks include ~20 Jr. FSC and ~15 FSC questions. To build the full 1,000-question banks:

1. Create questions from the book content following the JSON schema in `data/questions/jr-fsc-sample.json`
2. Validate: `npm run validate-questions -- --file your-new-file.json`
3. Import: `npm run import-questions -- --file your-new-file.json`
4. Repeat for each batch

**Question schema fields:**
- `id` — unique string identifier (e.g., `jr_fsc_meter_042`)
- `examLevel` — `jr_fsc` or `fsc`
- `category`, `subcategory` — topic classification
- `difficulty` — `easy`, `medium`, `hard`, `expert`
- `questionText` — the question
- `choices` — array of `{id: "A"|"B"|"C"|"D", text: string}`
- `correctAnswerId` — `"A"`, `"B"`, `"C"`, or `"D"`
- `explanation` — why the answer is correct (shown after exam, not during)
- `referenceBookSection` — book chapter/section reference
- `safetyCritical` — boolean
- `reviewRequired` — boolean (admin review before activation)
- `active` — boolean (false = excluded from exam selection)
- `estimatedTimeSeconds` — suggested time
- `tags` — array of string tags

---

## Testing the Platform

### Test payment flow (local)
1. Use Stripe test mode keys in `.env.local`
2. Use Stripe test card: `4242 4242 4242 4242`, any future date, any CVC
3. After payment, check Firestore for `users/{uid}/examAccess/jr_fsc` record

### Test webhook locally
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Test exam flow
1. Sign in, purchase Jr. FSC exam, accept rules, start exam
2. Verify questions appear (no correct answers in source)
3. Complete exam, verify score appears in Firestore `examAttempts`
4. If passed, verify certificate in Firestore `certificates`
5. Visit `/verify/[certificateNumber]` to test public verification

### Test certificate verification
- Go to `/verify/[certificateNumber]` — should show valid certificate
- Revoke a certificate via admin API → verify page shows "revoked"

---

## Search-Replace Placeholders Before Launch

| Placeholder | Replace With |
|---|---|
| `[PLATFORM NAME]` | Your actual platform/organization name |
| `[DATE]` | Actual dates in privacy.tsx and terms.tsx |
| `[SUPPORT EMAIL PLACEHOLDER]` | Your support email address |
| Amazon/KDP link in `book/page.tsx` | Your actual Amazon book URL |

---

## Known Limitations (MVP)

- Dashboard purchase/attempt status is placeholder UI (Firestore queries not wired to UI components yet)
- Certificate PDF generation not yet implemented (requires server-side PDF library)
- Admin dashboard sub-pages (users, purchases, attempts) are stubs — need Firestore data wiring
- Contact/inquiry form not connected to email service
- Training modules are coming soon placeholder only
- Stripe Price IDs must be created manually in Stripe Dashboard
- `exam/[examType]/page.tsx` does not yet pass server-supplied `choiceOrder` to `ExamQuestion` (uses client-side fallback)

## Recommended Next Upgrades

1. Wire Firestore queries into Dashboard for real purchase/attempt status
2. Implement PDF certificate generation (Puppeteer or react-pdf)
3. Build full admin UI with Firestore data tables
4. Add email notifications (purchase confirmation, exam result, certificate delivery)
5. Connect contact form to email service (Resend, SendGrid, etc.)
6. Add Stripe customer portal for purchase history
7. Wire up training module purchase flow
8. Add proctor-facing UI for FSC session management
9. Add question bank management UI (activate/deactivate, filter by category)
10. Build full Jr. FSC and FSC question banks from the book content

---

## Important Disclaimers

**This platform must remain independent.** Do not add:
- Current employer name or logo
- Customer names or project names
- Internal documents, photos, or procedures
- OEM-specific proprietary content

These certifications are educational knowledge credentials. They do not authorize energized electrical work, replace employer training, OEM qualification, electrical licensing, NFPA 70E, OSHA requirements, or site-specific procedures.

See `src/components/layout/FooterDisclaimer.tsx` for the required site-wide disclaimer.
