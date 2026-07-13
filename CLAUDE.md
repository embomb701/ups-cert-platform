# CLAUDE.md — Mastering Field Service Training Portal

## Project Overview

Full-stack Next.js 14 TypeScript training and certification platform for field
service trades, operated by FA Consulting and Recruiting (Francis Aiello).
Public name: **Mastering Field Service Training Portal** (domain fse-academy.com,
search indexing deliberately blocked until launch).

**Four course tracks**, all sharing one 10-module electrical/safety foundation:

| Course | id | Modules | Exam level | Cert prefix | Status |
|---|---|---|---|---|---|
| UPS FSE | `ups` | 28 | `jr_fse` / `fse` | JR / FSE | Live |
| Commercial Kitchen FSE | `kitchen` | 27 | `jr_kitchen_fse` | KJR | comingSoon |
| HVAC FSE | `hvac` | 25 | `jr_hvac_fse` | HJR | comingSoon |
| Generator (Power Gen) FSE | `generator` | 25 | `jr_gen_fse` | GJR | comingSoon |

Cross-course module sharing: HVAC reuses the Kitchen refrigeration modules
(`kitchen-refrigeration-cycle`, `kitchen-refrigeration-service`); Generator
reuses the UPS battery modules (`battery-types`, `battery-safety`).

**Book:** *Mastering Uninterruptible Power Supplies, Field Service Engineering*
(source of the UPS question banks; lives at `D:\FA Consulting & Recruiting\My Books\Mastering UPS 2nd`).

## Tech Stack

- **Next.js 14** — App Router, TypeScript
- **Tailwind CSS** — dark theme; brand gradient utilities in `globals.css`; Inter via next/font
- **Firebase Auth** — Google Sign-In AND email/password (`src/lib/firebase/auth.ts`)
- **Firebase Firestore** — all data (users, examAccess, trainingProgress, questionBank, examAttempts, certificates, proctoredExamOrders, purchases, ipExamLocks, auditLogs)
- **Stripe** — Checkout with inline `price_data` (dashboard products NOT used); product catalog in `src/lib/stripe/client.ts`
- **SendGrid** — schedule-request and contact emails (sender careers@aiellorecruiter.com)
- **Vercel** — deployment; push to `main` auto-deploys

## Key Architecture

### Courses and modules
- Course metadata + coming-soon outlines: `src/data/courses.ts` (`COURSES`,
  `*_MODULE_PLACEHOLDERS` with tracks/chapters).
- Module content: `src/data/modules*.ts` (UPS, in `ALL_MODULES`),
  `kitchen-modules.ts`, `hvac-modules.ts`, `generator-modules.ts` (each kept
  OUT of `ALL_MODULES` so the UPS completion check is unaffected).
- `src/data/index.ts` is the hub: `getModule()` searches all collections;
  `COURSE_SEQUENCES` (keyed by examAccess key) defines each course's ordered
  module list; `accessKeysForModule()` says which enrollments open a module;
  `prevModuleCandidates()` powers the course-aware 3-day unlock rule.
- Training gating: `src/lib/utils/trainingAccess.ts` (`getGrantedCourseKeys`,
  `moduleUnlockState`) used by the module page and `api/training/slide/start`.
- Gating rules: 5-min slide timer, 100% section quizzes, 10-question module
  test (100%, once/day), 3-day wait between modules, free trial = lesson 1 of
  modules 1-3.

### Exams
- Selection/scoring server-side only: `src/lib/exam/engine.ts`.
  `QUESTIONS_PER_EXAM = 10` pre-launch — **change to 50 at launch**.
- Question banks live in Firestore `questionBank`, filtered by `examLevel`.
  Import via Admin → Question Bank → "Import All Questions from Server"
  (`api/admin/import-from-server` — static imports only; fs doesn't work on
  Vercel). Derived banks are generated at import time from course content in
  `src/lib/exam/kitchenBank.ts` (kitchen/hvac/generator builders); fresh
  scenario questions in `data/questions/*-fresh.json`.
  **After adding bank content, someone must click the import button.**
- Jr-course exams (kitchen/hvac/generator) share a generalized branch in
  `api/exam/start` (`JR_COURSE_EXAMS` config: label, productId, courseKey).
  Access = training-completion grant (`examAccess/<examLevel>`) OR
  proctor-unlocked test-out order. 90-day account + IP cooldowns. Jr exams are
  AI-proctored (AIProctorWrapper); `fse` is human-proctored via
  `proctoredExamOrders` + admin unlock.
- Completing a course converts `examAccess/<level>_pending` (set by the
  webhook) into the exam grant — see `api/training/module/test`.

### Purchases
- Checkout builds line items from `STRIPE_PRODUCTS` (inline price_data); the
  webhook (`api/stripe/webhook`) grants access per `productId` in metadata.
- Buy buttons are gated by `comingSoon` in `courses.ts` — flipping that flag
  is the enrollment launch switch per course.

### Exam security (unchanged and critical)
- Questions never reach the client with answers; scoring server-side; IPs
  stored only as HMAC hashes (`IP_HASH_SECRET`); anti-cheat events risk-scored;
  certificates revocable; public verification at `/verify/[certificateNumber]`.

## Pre-launch checklist (owner decisions)
1. Admin import click after deploys with new bank content.
2. `comingSoon: false` per course when ready to sell (+ optional env price IDs).
3. `QUESTIONS_PER_EXAM` 10 → 50.
4. Contact page phone is placeholder (555) 555-5555.
5. Search indexing is blocked on purpose (robots) until owner's go.

## Conventions
- Run `npx tsc --noEmit` and `npm run build` before pushing; push to main deploys.
- Keep the required educational-credential disclaimers (footer, cert pages,
  verify, results, terms/privacy) intact.
- Long generated content: check for stray non-ASCII (CJK/Cyrillic) characters.
