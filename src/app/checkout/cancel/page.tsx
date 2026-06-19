import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Checkout Cancelled' };

export default function CheckoutCancelPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-lg mx-auto text-center">
        <div className="panel p-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 9v6m4-6v6M5 7h14l-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7zm3 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
          <p className="kicker mb-3 justify-center">No Charge Made</p>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-3">Checkout Cancelled</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-7">
            Your checkout was cancelled and no payment was taken. You can return to the certification
            pages whenever you are ready.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/certifications/junior" className="btn-voltage">
              Jr. FSE Exam
            </Link>
            <Link href="/certifications/proctored" className="btn-outline">
              FSE Exam
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
