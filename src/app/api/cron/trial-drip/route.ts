import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { sendTrialDripEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_EMAILS_PER_RUN = 150;

// Days since account creation that trigger each step
const STEP_DELAYS = [1, 3, 7] as const;

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const now = Date.now();
  let sent = 0;
  let skipped = 0;
  let pageToken: string | undefined;

  do {
    const listResult = await adminAuth.listUsers(1000, pageToken);
    pageToken = listResult.pageToken;

    for (const user of listResult.users) {
      if (sent >= MAX_EMAILS_PER_RUN) break;
      if (!user.email) { skipped++; continue; }

      const uid = user.uid;
      const accountAgeMs = now - new Date(user.metadata.creationTime).getTime();
      const accountAgeDays = accountAgeMs / DAY_MS;

      // Only process accounts 1–30 days old
      if (accountAgeDays < 1 || accountAgeDays > 30) { skipped++; continue; }

      const userRef = adminDb.collection('users').doc(uid);
      const profileSnap = await userRef.get();
      const profile = profileSnap.data() ?? {};

      if (profile.emailRemindersEnabled === false) { skipped++; continue; }

      const step: number = profile.trialDripStep ?? 0;
      if (step >= 3) { skipped++; continue; }

      // Skip if user has purchased anything (examAccess doc with a purchaseId)
      const accessSnap = await userRef.collection('examAccess')
        .where('granted', '==', true)
        .limit(10)
        .get();
      const hasPaid = accessSnap.docs.some((doc) => !!doc.data().purchaseId);
      if (hasPaid) {
        // Mark drip done so we never check again
        await userRef.set({ trialDripStep: 3 }, { merge: true });
        skipped++;
        continue;
      }

      // Determine which step to send based on account age
      const nextStep = (step + 1) as 1 | 2 | 3;
      const requiredDays = STEP_DELAYS[nextStep - 1];
      if (accountAgeDays < requiredDays) { skipped++; continue; }

      const displayName =
        (profile.displayName as string | undefined) ??
        user.displayName ??
        user.email?.split('@')[0] ??
        '';

      await sendTrialDripEmail(user.email, displayName, nextStep, uid).catch(() => {});

      await userRef.set(
        { trialDripStep: nextStep, trialDripLastSentAt: FieldValue.serverTimestamp() },
        { merge: true },
      );

      sent++;
    }

    if (sent >= MAX_EMAILS_PER_RUN) break;
  } while (pageToken);

  return NextResponse.json({ sent, skipped });
}
