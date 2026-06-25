import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PurchaseButton } from '@/components/exam/PurchaseButton';

export const metadata: Metadata = {
  title: 'The Book — Mastering Uninterruptible Power Supplies',
  description:
    'A practical, field-focused guide to UPS systems written for people entering or advancing in UPS field service engineering.',
};

const chapters = [
  'UPS purpose, architecture, and critical load protection',
  'AC and DC electrical fundamentals — voltage, current, resistance, power',
  'Safe meter use — multimeters, amp clamps, measurement concepts',
  'Battery systems — chemistry, strings, floats, safety',
  'Rectifiers — operation and role in UPS systems',
  'Inverters — operation, output, and topology differences',
  'Static bypass and static transfer switches (STS)',
  'Maintenance bypass procedures and transfer sequences',
  'PDU, RPP, and downstream distribution',
  'UPS alarms — reading, interpreting, escalating',
  'Troubleshooting logic — systematic field reasoning',
  'Startup, commissioning, and handover',
  'Field documentation and service reporting',
  'Customer communication and critical load protection mindset',
  'Safety concepts — LOTO, PPE, energized work awareness, escalation',
];

export default function BookPage() {
  return (
    <>
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-4">The Book</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Mastering Uninterruptible Power Supplies
          </h1>
          <p className="text-xl text-gray-300 mb-6">Field Service Engineering</p>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            A practical field-focused guide written for people entering or advancing in UPS field service.
            Built around the realities of what you encounter in the field — not only classroom theory.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-4xl mx-auto">
          <div className="flex justify-center mb-10">
            <Image
              src="/book-cover.jpg"
              alt="Mastering Uninterruptible Power Supplies — Field Service Engineering book cover"
              width={340}
              height={440}
              className="rounded-lg shadow-2xl shadow-blue-950/50"
              priority
            />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold text-white mb-6">What the Book Covers</h2>
              <ul className="space-y-3">
                {chapters.map((ch) => (
                  <li key={ch} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-indigo-400 mt-0.5 shrink-0">&#10003;</span>
                    {ch}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="card-dark p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Who This Book Is For</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>&#x2022; People trying to enter the UPS or critical power field service industry</li>
                  <li>&#x2022; Electricians and technicians moving into UPS work</li>
                  <li>&#x2022; Data center operations staff who want deeper UPS knowledge</li>
                  <li>&#x2022; Junior field technicians preparing for real field work</li>
                  <li>&#x2022; Anyone studying for the Jr. FSE or FSE certification exams</li>
                </ul>
              </div>

              <div className="card-dark p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Why UPS Field Service Knowledge Matters</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  UPS systems protect critical loads that cannot tolerate even a momentary power interruption.
                  Hospitals, data centers, financial systems, and AI infrastructure all depend on these systems
                  working correctly. The people who service them need to understand how they operate, how to
                  measure safely, how to interpret what they see, and when to escalate.
                </p>
              </div>

              <div className="card-dark p-6">
                <h3 className="text-lg font-semibold text-white mb-3">How the Book Supports the Exams</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The Jr. FSE and FSE certification exams are based directly on the material in this book.
                  Reading and understanding the book is the primary way to prepare for both exams. The exams
                  are designed to reward people who actually studied the content.
                </p>
              </div>

              <div className="card-dark p-6 space-y-4">
                <p className="text-white font-semibold">Get the Book</p>

                <div className="border border-amber-700/50 bg-amber-950/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-amber-200 mb-1">✍️ Signed Copy — $69.99</p>
                  <p className="text-xs text-gray-400 mb-3">
                    Personally signed by Francis Aiello. Ships to US addresses — price includes shipping.
                  </p>
                  <PurchaseButton
                    productId="signed_book"
                    label="Buy Signed Copy — $69.99 →"
                    className="block w-full px-5 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold text-sm transition-colors text-center"
                  />
                  <p className="text-xs text-gray-600 mt-2 text-center">Google account required. Ships after payment.</p>
                </div>

                <div className="relative flex items-center gap-3">
                  <div className="flex-1 border-t border-gray-800" />
                  <span className="text-xs text-gray-600">or buy on Amazon</span>
                  <div className="flex-1 border-t border-gray-800" />
                </div>

                <a
                  href="https://a.co/d/046t1AvW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-5 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold text-sm transition-colors"
                >
                  Buy on Amazon &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cert CTA */}
      <section className="section-pad bg-gray-900">
        <div className="container-site max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-white mb-3">Ready to Test Your Knowledge?</h2>
          <p className="text-gray-400 mb-6 text-sm">
            After reading the book, take the Jr. FSE Exam to earn a formal knowledge credential.
          </p>
          <Link href="/certifications/junior" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
            View the Jr. FSE Exam &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
