import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { sendProgressReminderEmail } from '@/lib/email';
import { COURSES } from '@/data/courses';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const STALE_MS = 7 * 24 * 60 * 60 * 1000;       // 7 days inactive = eligible for reminder
const COOLDOWN_MS = 6 * 24 * 60 * 60 * 1000;      // min 6 days between reminders per user
const MAX_EMAILS_PER_RUN = 200;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masteringfse.com';

const HUB_ROUTES: Record<string, string> = {
  ups: '/training/ups', kitchen: '/training/kitchen', hvac: '/training/hvac',
  generator: '/training/generator', solar: '/training/solar', battery: '/training/battery',
  datacenter: '/training/datacenter', 'dc-ops': '/training/dc-ops', dcplants: '/training/dcplants',
  evcharging: '/training/evcharging', 'industrial-ref': '/training/industrial-ref',
  'building-cx': '/training/building-cx', telecom: '/training/telecom',
  'critical-environment': '/training/critical-environment',
  dcengineer: '/training/dcengineer', marine: '/training/marine', pool: '/training/pool',
  'hvac-tech': '/training/hvac-tech', 'solar-inst': '/training/solar-inst',
  'wind-tech': '/training/wind-tech', 'elevator-tech': '/training/elevator-tech',
  'fire-alarm-tech': '/training/fire-alarm-tech', 'bmet-tech': '/training/bmet-tech',
  'bas-tech': '/training/bas-tech', 'ref-tech': '/training/ref-tech',
  'plc-tech': '/training/plc-tech', 'security-tech': '/training/security-tech',
  'field-pm': '/training/field-pm', 'pump-tech': '/training/pump-tech',
};

function tsToMs(ts: unknown): number {
  if (!ts) return 0;
  if (ts instanceof Timestamp) return ts.toDate().getTime();
  if (typeof ts === 'string') return new Date(ts).getTime();
  return 0;
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const now = Date.now();
  const staleThreshold = now - STALE_MS;
  const cooldownThreshold = now - COOLDOWN_MS;

  let sent = 0;
  let skipped = 0;
  let pageToken: string | undefined;

  const courseMap = Object.fromEntries(COURSES.map((c) => [c.accessKey, c]));

  do {
    const listResult = await adminAuth.listUsers(1000, pageToken);
    pageToken = listResult.pageToken;

    for (const user of listResult.users) {
      if (sent >= MAX_EMAILS_PER_RUN) break;
      if (!user.email) { skipped++; continue; }

      const uid = user.uid;
      const userRef = adminDb.collection('users').doc(uid);

      // Check opt-out and reminder cooldown
      const profileSnap = await userRef.get();
      const profileData = profileSnap.data() ?? {};
      if (profileData.emailRemindersEnabled === false) { skipped++; continue; }
      const lastReminder = tsToMs(profileData.lastProgressReminderAt);
      if (lastReminder > cooldownThreshold) { skipped++; continue; }

      // Find an enrolled course
      const accessSnap = await userRef.collection('examAccess')
        .where('granted', '==', true)
        .limit(5)
        .get();
      if (accessSnap.empty) { skipped++; continue; }

      // Find most recent training activity across all courses
      const recentSnap = await userRef.collection('trainingProgress')
        .where('completedAt', '>', new Date(staleThreshold))
        .limit(1)
        .get();
      if (!recentSnap.empty) { skipped++; continue; }

      // User is enrolled but stale — pick the most relevant course to link
      let pickedCourse = COURSES.find((c) => c.accessKey === accessSnap.docs[0].id);
      if (!pickedCourse) {
        // Try each granted doc to find a known course
        for (const doc of accessSnap.docs) {
          const match = courseMap[doc.id];
          if (match) { pickedCourse = match; break; }
        }
      }
      if (!pickedCourse) { skipped++; continue; }

      const courseHref = HUB_ROUTES[pickedCourse.id] ?? '/training';
      const courseUrl = `${SITE_URL}${courseHref}`;

      // Find oldest completedAt to compute days inactive
      const anyProgressSnap = await userRef.collection('trainingProgress')
        .orderBy('completedAt', 'desc')
        .limit(1)
        .get();
      let daysInactive = 7;
      if (!anyProgressSnap.empty) {
        const lastMs = tsToMs(anyProgressSnap.docs[0].data().completedAt);
        if (lastMs > 0) daysInactive = Math.floor((now - lastMs) / (24 * 60 * 60 * 1000));
      }

      const displayName = profileData.displayName as string | undefined
        ?? user.displayName
        ?? user.email?.split('@')[0]
        ?? '';

      await sendProgressReminderEmail(
        user.email,
        displayName,
        pickedCourse.title,
        courseUrl,
        daysInactive,
        uid,
      ).catch(() => {});

      await userRef.set(
        { lastProgressReminderAt: FieldValue.serverTimestamp() },
        { merge: true },
      );

      sent++;
    }

    if (sent >= MAX_EMAILS_PER_RUN) break;
  } while (pageToken);

  return NextResponse.json({ sent, skipped });
}
