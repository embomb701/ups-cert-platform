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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voltage-500/60 to-transparent" />
        <div className="container-site section-pad">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
            <div>
              <p className="kicker mb-5">
                <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-voltage-400" />
                The Book
              </p>
              <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
                Mastering <span className="text-voltage-gradient">Uninterruptible Power Supplies</span>
              </h1>
              <p className="mt-5 font-mono text-sm uppercase tracking-widest text-arc-300">
                Field Service Engineering
              </p>
              <p className="mt-6 max-w-xl leading-relaxed text-gray-400">
                A practical field-focused guide written for people entering or advancing in UPS field service.
                Built around the realities of what you encounter in the field — not only classroom theory.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://a.co/d/046t1AvW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-voltage btn-lg"
                >
                  Buy on Amazon &rarr;
                </a>
                <Link href="/certifications/junior" className="btn-outline btn-lg">
                  View the Exams
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-6 -z-10 bg-carbon-radial blur-xl" />
                <Image
                  src="/book-cover.jpg"
                  alt="Mastering Uninterruptible Power Supplies — Field Service Engineering book cover"
                  width={340}
                  height={440}
                  className="rounded-xl border border-white/10 shadow-panel"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contents + sidebar */}
      <section className="section-pad">
        <div className="container-site max-w-5xl mx-auto">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="kicker mb-3">Inside the Book</p>
              <h2 className="mb-6 text-2xl font-bold text-white">What the Book Covers</h2>
              <ul className="space-y-3">
                {chapters.map((ch) => (
                  <li key={ch} className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {ch}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="card-dark p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-arc-500/30 bg-arc-500/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-arc-300" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">Who This Book Is For</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />People trying to enter the UPS or critical power field service industry</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Electricians and technicians moving into UPS work</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Data center operations staff who want deeper UPS knowledge</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Junior field technicians preparing for real field work</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Anyone studying for the Jr. FSE or FSE certification exams</li>
                </ul>
              </div>

              <div className="card-dark p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-voltage-500/30 bg-voltage-500/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 4 7v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-5z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">Why UPS Field Service Knowledge Matters</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  UPS systems protect critical loads that cannot tolerate even a momentary power interruption.
                  Hospitals, data centers, financial systems, and AI infrastructure all depend on these systems
                  working correctly. The people who service them need to understand how they operate, how to
                  measure safely, how to interpret what they see, and when to escalate.
                </p>
              </div>

              <div className="card-dark p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-voltage-500/30 bg-voltage-500/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">How the Book Supports the Exams</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The Jr. FSE and FSE certification exams are based directly on the material in this book.
                  Reading and understanding the book is the primary way to prepare for both exams. The exams
                  are designed to reward people who actually studied the content.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-voltage-500/20 bg-carbon-850 p-8 text-center">
                <div className="absolute inset-0 -z-10 bg-carbon-radial" />
                <p className="kicker mb-4 justify-center">Get the Book</p>
                <p className="mb-1 font-display text-xl font-bold text-white">Order Your Copy</p>
                <p className="mb-6 text-sm text-gray-400">Available on Amazon / Kindle Direct Publishing</p>
                <a
                  href="https://a.co/d/046t1AvW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-voltage"
                >
                  Buy on Amazon &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cert CTA */}
      <section className="border-y border-white/10 bg-carbon-900/40 section-pad">
        <div className="container-site max-w-2xl mx-auto text-center">
          <p className="kicker mb-3 justify-center">Next Step</p>
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to Test Your Knowledge?</h2>
          <p className="mb-7 text-gray-400">
            After reading the book, take the Jr. FSE Exam to earn a formal knowledge credential.
          </p>
          <Link href="/certifications/junior" className="btn-voltage btn-lg">
            View the Jr. FSE Exam &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
