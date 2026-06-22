'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';

const CALENDLY_BASE = 'https://calendly.com/careers-aiellorecruiter/30min';

function SuccessContent() {
  const searchParams = useSearchParams();
  const product = searchParams.get('product');
  const isFseProctored = product === 'fse_proctored_exam';
  const { user } = useAuth();

  const calendlyUrl = (() => {
    const params = new URLSearchParams();
    if (user?.email) params.set('email', user.email);
    if (user?.displayName) params.set('name', user.displayName);
    const qs = params.toString();
    return qs ? `${CALENDLY_BASE}?${qs}` : CALENDLY_BASE;
  })();

  return (
    <div className="card-dark p-10">
      <div className="w-14 h-14 rounded-full bg-green-900 border border-green-700 flex items-center justify-center mx-auto mb-6">
        <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">Payment Successful</h1>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        Your purchase has been confirmed. Your dashboard will reflect the updated status within
        a few moments once the payment webhook is processed.
      </p>

      {isFseProctored && (
        <div className="rounded-xl border border-amber-800/40 bg-amber-950/30 p-6 mb-6 text-left">
          <h2 className="text-base font-semibold text-amber-300 mb-1">Schedule Your Exam Session</h2>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Your FSE Human Proctored exam requires a live proctored session. Use the button below
            to pick a date and time that works for you. A proctor will confirm your slot and you
            will receive access to begin your exam at the scheduled time.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-semibold text-sm transition-colors"
          >
            Schedule My Exam Session
          </a>
          <p className="text-xs text-gray-600 mt-3">
            You can also schedule later from your dashboard.
          </p>
        </div>
      )}

      <p className="text-xs text-gray-500 mb-8">
        If your exam access does not appear within a few minutes, please contact support.
        Do not refresh or re-submit payment.
      </p>
      <Link href="/dashboard" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-lg mx-auto text-center">
        <Suspense fallback={
          <div className="card-dark p-10">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </div>
    </section>
  );
}
