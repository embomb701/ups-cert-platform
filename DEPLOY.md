# Deployment Guide — GitHub + Vercel

The live site (`fse-academy.com` / `masteringfse.com`) is a Vercel project (`a-team12/ups-cert-platform`) that auto-deploys to production on every push to `main`. This guide covers setting that up from scratch, or reproducing it for a fork.

## Step 1 — Push to GitHub (Terminal, ~2 min)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ups-cert-platform.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your GitHub username.
> Create the repo first at https://github.com/new.

---

## Step 2 — Create the Vercel Project (~2 min)

Via the dashboard:
1. Go to https://vercel.com/new
2. Import the `ups-cert-platform` GitHub repository
3. Framework preset should auto-detect as **Next.js** — leave build/output settings default
4. Deploy

Or via the CLI (`npm install -g vercel`, or use `npx vercel`):
```bash
vercel link      # link this folder to the Vercel project
vercel --prod     # deploy to production
```

---

## Step 3 — Add Environment Variables (~5 min)

In the Vercel dashboard: **Project → Settings → Environment Variables**. Add every value from `.env.example` (each one is documented inline in that file — Firebase client + admin config, Stripe secret/publishable keys and per-product price IDs, `NEXT_PUBLIC_SITE_URL`, `ADMIN_EMAILS`, `IP_HASH_SECRET`, `SEED_SECRET`, `CRON_SECRET`, `SENDGRID_API_KEY`, and the `SITE_GATE_*` trio).

Or via the CLI:
```bash
vercel env add STRIPE_SECRET_KEY production
# ...repeat per variable, or use `vercel env pull` to sync an existing .env.local
```

After adding variables, redeploy (`vercel --prod`, or push a commit) so the build picks them up.

**Site gate:** until the site is meant to be public, `src/middleware.ts` blocks every visitor behind a username/password screen driven by `SITE_GATE_USER` / `SITE_GATE_PASSWORD` / `SITE_GATE_SECRET`. Leaving any of the three unset fails the gate closed (nobody gets in — including you). To actually go live, either delete `src/middleware.ts` or set `SITE_GATE_ENABLED=false`.

---

## Step 4 — Set Up the Stripe Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://YOUR-DOMAIN/api/stripe/webhook`
4. Select event: `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to Vercel as `STRIPE_WEBHOOK_SECRET` and redeploy

`/api/*` routes are explicitly excluded from the site gate (see `src/middleware.ts`) so the webhook stays reachable even while the rest of the site is gated.

---

## Step 5 — Deploy Firestore Rules

```bash
npm install -g firebase-tools
firebase login
firebase use YOUR_PROJECT_ID
firebase deploy --only firestore:rules
```

---

## Step 6 — Import Question Banks

```bash
npm run validate-questions -- --file data/questions/<file>.json
npm run import-questions -- --file data/questions/<file>.json
```

Repeat per program — one `*-jr-fresh.json` / `*-jr-derived.json` pair lives in `data/questions/` for each of the 28 trade programs.

---

## Step 7 — Set Yourself as Admin

1. Sign in to the deployed site with Google
2. Go to Firebase Console → Firestore → `users` collection
3. Find your user document (by email)
4. Add field: `role` = `"admin"`
5. Add your email to the `ADMIN_EMAILS` env var and redeploy

---

## Verifying a Deploy

```bash
vercel ls                      # recent deployments and their status
vercel inspect <deployment-url>  # status, target, and which domains it's aliased to
```

A `Ready` / `Production` deployment aliased to your custom domain means the push is live — though if the site gate (Step 3) is still enabled, "live" means "reachable and gated," not "publicly browsable."
