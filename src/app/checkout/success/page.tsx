'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const product = searchParams.get('product');
  const isFseProctored = product === 'fse_proctored_exam';

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
          <h2 className="text-base font-semibold text-amber-300 mb-1">Next Step: Schedule Your Session</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Head to your dashboard to submit your contact info. We'll reach out directly to schedule your proctored exam session.
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
