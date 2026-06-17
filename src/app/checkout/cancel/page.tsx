import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Checkout Cancelled' };

export default function CheckoutCancelPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-lg mx-auto text-center">
        <div className="card-dark p-10">
          <h1 className="text-xl font-bold text-white mb-3">Checkout Cancelled</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Your checkout was cancelled and no payment was taken. You can return to the certification
            pages whenever you are ready.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/certifications/junior" className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors">
              Jr. FSE Exam
            </Link>
            <Link href="/certifications/proctored" className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-medium text-sm transition-colors">
              FSE Exam
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
