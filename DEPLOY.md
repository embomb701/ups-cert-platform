# Deployment Guide — GitHub + Netlify

## Step 1 — Push to GitHub (Terminal, ~2 min)

Open a terminal and navigate to this project folder, then run:

```bash
git init
git add .
git commit -m "Initial MVP scaffold"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ups-cert-platform.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your GitHub username.
> Create the repo first at https://github.com/new — name it `ups-cert-platform`, private, no README.

---

## Step 2 — Create Netlify Site (~2 min)

1. Go to https://app.netlify.com
2. Click **Add new site → Import an existing project**
3. Choose **GitHub**
4. Authorize Netlify to access your GitHub if prompted
5. Select the `ups-cert-platform` repository
6. Build settings (should auto-detect, but verify):
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** `20`
7. Click **Deploy site**

---

## Step 3 — Add Environment Variables in Netlify (~3 min)

In your Netlify site dashboard go to **Site configuration → Environment variables → Add a variable** and add every value from `.env.example`:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Console → Project Settings → Web app |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Same |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Same |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Same |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Same |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Same |
| `FIREBASE_CLIENT_EMAIL` | Firebase Console → Service Accounts → Generate key |
| `FIREBASE_PRIVATE_KEY` | Same (include full key with `\n` newlines) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same |
| `STRIPE_WEBHOOK_SECRET` | After Step 4 below |
| `STRIPE_PRICE_ID_JR_FSC` | Stripe Dashboard → Products → Jr. FSC price ID |
| `STRIPE_PRICE_ID_FSC` | Stripe Dashboard → Products → FSC price ID |
| `NEXT_PUBLIC_SITE_URL` | Your Netlify site URL (e.g. `https://your-site.netlify.app`) |
| `ADMIN_EMAILS` | Your email address |
| `IP_HASH_SECRET` | Any long random string (32+ chars) |

After adding variables, trigger a **redeploy** from the Deploys tab.

---

## Step 4 — Set Up Stripe Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://YOUR-SITE.netlify.app/api/stripe/webhook`
4. Select event: `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to Netlify as `STRIPE_WEBHOOK_SECRET` and redeploy

---

## Step 5 — Deploy Firestore Rules

```bash
# Install Firebase CLI if needed
npm install -g firebase-tools

# Login
firebase login

# Initialize (select your project)
firebase use YOUR_PROJECT_ID

# Deploy rules
firebase deploy --only firestore:rules
```

---

## Step 6 — Import Sample Questions

```bash
# From the project folder
npm run validate-questions
npm run import-questions -- --file data/questions/jr-fsc-sample.json
npm run import-questions -- --file data/questions/fsc-sample.json
```

---

## Step 7 — Set Yourself as Admin

1. Sign in to the deployed site with Google
2. Go to Firebase Console → Firestore → `users` collection
3. Find your user document (by email)
4. Add field: `role` = `"admin"`

---

## You're Live

Your site will be at `https://your-site-name.netlify.app`.

Netlify auto-deploys every time you push to the `main` branch on GitHub.
