import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Email Preferences — Mastering Field Service',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { uid?: string; action?: string };
}

export default async function UnsubscribePage({ searchParams }: Props) {
  const uid = (searchParams.uid ?? '').trim();
  const action = searchParams.action;

  if (!uid) {
    return <ErrorPage message="This unsubscribe link is missing a user ID. Please use the link from your email." />;
  }

  const userRef = adminDb.collection('users').doc(uid);
  const snap = await userRef.get();

  if (!snap.exists) {
    return <ErrorPage message="This unsubscribe link is no longer valid." />;
  }

  if (action === 'unsubscribe') {
    await userRef.set({ emailRemindersEnabled: false }, { merge: true });
    return <ConfirmPage uid={uid} subscribed={false} />;
  }

  if (action === 'resubscribe') {
    await userRef.set({ emailRemindersEnabled: true, lastProgressReminderAt: FieldValue.delete() }, { merge: true });
    return <ConfirmPage uid={uid} subscribed={true} />;
  }

  // Default: show current status and option to change
  const emailRemindersEnabled = snap.data()?.emailRemindersEnabled !== false;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full card-dark p-8 text-center space-y-5">
        <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">Email Preferences</h1>
          <p className="text-sm text-gray-400 mt-1">
            Training progress reminder emails
          </p>
        </div>

        <div className={`rounded-lg border px-4 py-3 text-sm ${
          emailRemindersEnabled
            ? 'border-emerald-800/60 bg-emerald-950/20 text-emerald-400'
            : 'border-gray-700 bg-gray-800/30 text-gray-400'
        }`}>
          {emailRemindersEnabled
            ? 'You are currently subscribed to training reminders.'
            : 'You are currently unsubscribed from training reminders.'}
        </div>

        {emailRemindersEnabled ? (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">
              We send at most one reminder per week when you haven&apos;t completed a module recently.
            </p>
            <Link
              href={`/unsubscribe?uid=${encodeURIComponent(uid)}&action=unsubscribe`}
              className="block w-full px-4 py-2.5 rounded-lg border border-red-800/60 text-red-400 hover:bg-red-950/20 text-sm font-medium transition-colors"
            >
              Unsubscribe from reminders
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">
              You won&apos;t receive any more training reminder emails.
            </p>
            <Link
              href={`/unsubscribe?uid=${encodeURIComponent(uid)}&action=resubscribe`}
              className="block w-full px-4 py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 text-sm font-medium transition-colors"
            >
              Re-subscribe to reminders
            </Link>
          </div>
        )}

        <p className="text-xs text-gray-600">
          Transactional emails (certificates, order confirmations) are not affected.
        </p>

        <Link href="/" className="block text-xs text-gray-600 hover:text-gray-400 transition-colors">
          Back to Mastering Field Service
        </Link>
      </div>
    </div>
  );
}

function ConfirmPage({ uid, subscribed }: { uid: string; subscribed: boolean }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full card-dark p-8 text-center space-y-5">
        <div className={`w-12 h-12 rounded-full border flex items-center justify-center mx-auto ${
          subscribed
            ? 'bg-emerald-900/40 border-emerald-700/60'
            : 'bg-gray-800 border-gray-700'
        }`}>
          {subscribed ? (
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">
            {subscribed ? 'Re-subscribed' : 'Unsubscribed'}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {subscribed
              ? 'You\'ll receive weekly training reminders again.'
              : 'You won\'t receive training reminder emails anymore.'}
          </p>
        </div>

        <p className="text-xs text-gray-600">
          Transactional emails (certificates, order confirmations) are not affected.
        </p>

        <div className="flex flex-col gap-2">
          <Link
            href={`/unsubscribe?uid=${encodeURIComponent(uid)}`}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            {subscribed ? 'Unsubscribe again' : 'Changed your mind? Re-subscribe'}
          </Link>
          <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            Back to Mastering Field Service
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorPage({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full card-dark p-8 text-center space-y-4">
        <h1 className="text-lg font-bold text-white">Invalid Link</h1>
        <p className="text-sm text-gray-400">{message}</p>
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          Back to home
        </Link>
      </div>
    </div>
  );
}
