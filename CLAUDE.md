# CLAUDE.md — UPS Certification Platform

## Project Overview

This is a full-stack Next.js 14 TypeScript certification and training platform for the UPS (Uninterruptible Power Supply) field service industry.

**Book:** *Mastering Uninterruptible Power Supplies, Field Service Engineering*
**Products:** Jr. FSC Exam ($200, browser-based) and FSC Exam ($500, proctored)

## Tech Stack

- **Next.js 14** — App Router, TypeScript
- **Tailwind CSS** — Dark theme, custom brand colors
- **Firebase Auth** — Google Sign-In only
- **Firebase Firestore** — All data storage
- **Firebase Storage** — Certificate PDFs (future)
- **Stripe** — Checkout + webhooks
- **Netlify** — Deployment

## Architecture Notes

### Auth Flow
- Google Sign-In only via Firebase Auth
- `AuthProvider` context wraps the entire app
- Admin access controlled by `ADMIN_EMAILS` env var
- Server routes verify Firebase ID tokens from Authorization header

### Exam Security (CRITICAL)
- Questions are NEVER sent to the client with correct answers
- Scoring is ALWAYS done server-side in `/api/exam/submit`
- The client only receives sanitized `QuestionForExam` objects (no `correctAnswerId`, no `explanation`)
- Correct answers live only in Firestore, read only by admin SDK server routes

### Jr. FSC Exam Access Flow
1. User signs in
2. User purchases via Stripe Checkout
3. Webhook at `/api/stripe/webhook` creates `users/{uid}/examAccess/jr_fsc` record
4. User navigates to exam rules → accepts → starts exam
5. `/api/exam/start` verifies purchase, cooldown, IP lock → selects 50 random questions → creates attempt record
6. Client runs exam with timer + anti-cheat
7. `/api/exam/submit` scores server-side → issues certificate if passed
8. `/api/exam/event` receives anti-cheat events for risk scoring

### FSC Exam Access Flow
1. User purchases FSC exam via Stripe
2. Webhook creates `proctoredExamOrders` record with status `scheduling_pending`
3. Admin schedules session, assigns proctor
4. Admin calls `/api/admin/proctor-unlock` to set status to `ready`
5. Candidate starts exam — server verifies `status == 'ready'` before allowing start
6. Proctor monitors live session
7. Exam scored server-side, certificate issued

### IP Hashing
- IP addresses are NEVER stored in plaintext in Firestore
- All IP storage uses HMAC-SHA256 with `IP_HASH_SECRET`
- `hashIp()` and `getRealIp()` are in `src/lib/utils/ipHash.ts`

### Question Banks
- Two completely separate collections: `examLevel: 'jr_fsc'` and `examLevel: 'fsc'`
- Questions with `active: false` are excluded from exam selection
- Both banks stored in `questionBank` Firestore collection
- Questions fetched only server-side during exam start

## File Structure

```
src/
├── app/
│   ├── layout.tsx              — Root layout with AuthProvider
│   ├── page.tsx                — Home page
│   ├── book/                   — Book sales page
│   ├── certifications/
│   │   ├── junior/             — Jr. FSC exam details
│   │   ├── proctored/          — FSC exam details
│   │   └── compare/            — Side-by-side comparison
│   ├── employers/              — Employer value pages
│   ├── verify/[certNumber]/    — Public certificate verification
│   ├── training/               — Coming soon training page
│   ├── about/                  — About the program creator
│   ├── login/                  — Google sign-in page
│   ├── dashboard/              — User dashboard
│   ├── checkout/
│   │   ├── success/            — Post-payment success
│   │   └── cancel/             — Checkout cancelled
│   ├── exam/
│   │   ├── rules/[examType]/   — Exam rules acceptance
│   │   ├── [examType]/         — Exam interface
│   │   └── results/[attemptId] — Results page
│   ├── admin/                  — Admin dashboard and sub-pages
│   ├── privacy/                — Privacy policy
│   ├── terms/                  — Terms and disclaimer
│   └── api/
│       ├── stripe/
│       │   ├── checkout/       — Create Stripe Checkout Session
│       │   └── webhook/        — Stripe webhook fulfillment
│       ├── exam/
│       │   ├── start/          — Start exam, select questions
│       │   ├── submit/         — Server-side scoring
│       │   └── event/          — Anti-cheat event logging
│       └── admin/
│           ├── proctor-unlock/ — Unlock FSC exam session
│           ├── revoke-certificate/
│           └── clear-ip-lock/
├── components/
│   ├── layout/                 — Header, Footer, FooterDisclaimer
│   ├── auth/AuthProvider.tsx   — Firebase auth context
│   ├── ui/Button.tsx           — Shared UI components
│   ├── exam/
│   │   ├── AntiCheatWrapper    — Event listeners + fullscreen
│   │   ├── ExamQuestion        — Question + choices UI
│   │   └── ExamTimer           — Per-question countdown timer
│   └── certificate/            — Certificate display (future)
├── lib/
│   ├── firebase/
│   │   ├── client.ts           — Client SDK init
│   │   ├── admin.ts            — Admin SDK init (server only)
│   │   └── auth.ts             — Google sign-in, sign-out
│   ├── stripe/client.ts        — Stripe SDK init + products
│   ├── exam/
│   │   ├── engine.ts           — Question selection, scoring (server only)
│   │   └── antiCheat.ts        — Event weights, risk scoring
│   └── utils/
│       ├── ipHash.ts           — HMAC IP hashing
│       └── formatters.ts       — Date, currency, score formatters
├── types/index.ts              — All shared TypeScript types
data/
├── questions/
│   ├── jr-fsc-sample.json      — 20 Jr. FSC sample questions
│   └── fsc-sample.json         — 15 FSC sample questions
scripts/
├── validate-questions.ts       — Pre-import validation
└── import-questions.ts         — Firestore importer
```

## Adding More Questions

1. Add questions to a JSON file following the schema in `data/questions/jr-fsc-sample.json`
2. Run `npm run validate-questions -- --file your-file.json`
3. Run `npm run import-questions -- --file your-file.json`
4. Use `--overwrite` flag to update existing questions by id

## Search/Replace Placeholders Before Launch

- `[PLATFORM NAME]` — replace with your actual platform/organization name throughout
- `[DATE]` — replace in privacy.tsx and terms.tsx
- `[SUPPORT EMAIL PLACEHOLDER]` — replace with your actual support email
- Amazon/KDP link in `book/page.tsx`

## Safety and Legal Notes

The codebase contains multiple required disclaimers about the educational nature of these certifications. Do not remove the disclaimer text from:
- Footer (`FooterDisclaimer.tsx`)
- Certification pages
- Certificate verification page
- Exam results page
- Terms and Privacy pages

## Deployment Checklist

1. Fill all `.env.example` values in Netlify environment settings
2. Create Firebase project with Google Auth enabled
3. Deploy Firestore rules (`firestore.rules`)
4. Create Stripe products and price IDs
5. Configure Stripe webhook pointing to `{SITE_URL}/api/stripe/webhook`
6. Import sample questions with `npm run import-questions`
7. Set your admin email in `ADMIN_EMAILS` env var
8. Push to GitHub → Netlify auto-deploys
