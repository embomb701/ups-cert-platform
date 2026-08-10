import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SuccessContent } from './SuccessContent';

export const metadata: Metadata = {
  title: 'Order Confirmed — Mastering Field Service',
  robots: { index: false },
};

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
