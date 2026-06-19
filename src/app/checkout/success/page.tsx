import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Purchase Successful' };

export default function CheckoutSuccessPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-lg mx-auto text-center">
        <div className="panel relative overflow-hidden p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voltage-500/60 to-transparent" />
          <div className="absolute inset-0 -z-10 bg-carbon-radial" />
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="kicker mb-3 justify-center">Payment Confirmed</p>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-white mb-3">
            <span className="text-voltage-gradient">Payment Successful</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Your purchase has been confirmed. Your dashboard will reflect the updated status within
            a few moments once the payment webhook is processed.
          </p>
          <p className="text-xs text-gray-500 mb-8">
            If your exam access does not appear within a few minutes, please contact support.
            Do not refresh or re-submit payment.
          </p>
          <Link href="/dashboard" className="btn-voltage btn-lg">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
