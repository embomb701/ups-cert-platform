import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

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

              <div className="card-dark p-8 text-center">
                <p className="text-white font-semibold mb-2">Get the Book</p>
                <p className="text-sm text-gray-400 mb-6">Available on Amazon / Kindle Direct Publishing</p>
                <a
                  href="https://a.co/d/046t1AvW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-colors"
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
