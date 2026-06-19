import type { Metadata } from 'next';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';

export const metadata: Metadata = {
  title: 'UPS Field Service Certification Exam (Proctored) — $500',
  description:
    'The FSE Exam is a proctored, advanced UPS field service knowledge credential. $500, scheduling required.',
};

export default function ProctoredCertPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voltage-500/60 to-transparent" />
        <div className="container-site section-pad">
          <div className="mx-auto max-w-4xl">
            <span className="badge-fse mb-5 inline-flex">Advanced — Proctored</span>
            <h1 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
              UPS Field Service Certification
            </h1>
            <p className="mt-5 font-display text-4xl font-bold text-voltage-300">$500</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-gray-400">
              The UPS Field Service Certification is a more advanced, proctored credential intended to
              validate deeper technical understanding and stronger readiness for field service work.
              Based on{' '}
              <em className="text-gray-300">Mastering Uninterruptible Power Supplies, Field Service Engineering</em>.
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section-pad">
        <div className="container-site mx-auto max-w-5xl">
          <p className="kicker mb-3">Exam Overview</p>
          <h2 className="mb-10 text-2xl font-bold text-white">Format, Scheduling &amp; Outcomes</h2>

          <div className="mb-14 grid gap-6 md:grid-cols-3">
            <div className="card-dark p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-voltage-500/30 bg-voltage-500/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="14" rx="2" />
                  <path d="M8 21h8M12 18v3" />
                </svg>
              </div>
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-voltage-300">Exam Format</h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {[
                  'Proctored live — approved organization representative',
                  '50 questions per session',
                  'Selected from 1,000-question FSE bank',
                  'Randomized question and answer order',
                  '90 seconds per question (configurable)',
                  'No backtracking',
                  'More difficult — scenario-based questions',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-dark p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-voltage-500/30 bg-voltage-500/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 10h18" />
                </svg>
              </div>
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-voltage-300">Access &amp; Scheduling</h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {[
                  'Google login required',
                  'Stripe payment required ($500)',
                  'Exam does not unlock immediately on purchase',
                  'Scheduling required after purchase',
                  'Identity confirmed before exam begins',
                  'Proctor must unlock the exam session',
                  'Proctor may monitor, stop, or flag the attempt',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-dark p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-voltage-500/30 bg-voltage-500/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 4 7v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-5z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-voltage-300">On Pass</h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {[
                  'Passing score: 80% or higher',
                  'FSE Certificate PDF issued',
                  'Proctored exam noted on certificate',
                  'Public verification link created',
                  'Certificate status: valid',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="kicker mb-3">Knowledge Domains</p>
              <h2 className="mb-4 text-xl font-bold text-white">What the FSE Exam Tests</h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                The FSE Exam includes everything from the Jr. FSE level, but at greater technical depth,
                plus advanced topics including component theory, transfer types, troubleshooting decision
                trees, measurement interpretation, and scenario-based field reasoning.
              </p>
              <div className="space-y-2.5">
                {[
                  ['Detailed UPS topology', 'Rectifier and inverter operating theory'],
                  ['PWM, SCR, IGBT concepts', 'Gate drive and commutation'],
                  ['Open and closed transition transfers', 'Static switch operation'],
                  ['Make-before-break and break-before-make risks', 'Synchronization and phase rotation'],
                  ['DC bus behavior and battery discharge', 'Stored energy and backfeed hazards'],
                  ['Multimeter and amp clamp interpretation', 'Failure mode and alarm analysis'],
                  ['Startup and commissioning checks', 'Escalation decisions'],
                ].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-2 gap-2">
                    <div className="flex gap-1.5 text-xs text-gray-400">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {a}
                    </div>
                    <div className="flex gap-1.5 text-xs text-gray-400">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {b}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="card-dark p-7">
                <h3 className="mb-2 text-base font-semibold text-white">Why Proctored?</h3>
                <p className="text-xs leading-relaxed text-gray-400">
                  The FSE Exam requires live proctoring by an approved organization representative. This
                  provides identity verification, observation, and a stronger level of exam integrity
                  compared to browser-based only controls. The higher price reflects the scheduling,
                  coordination, and proctoring involved.
                </p>
              </div>

              <div className="card-dark p-7">
                <h3 className="mb-4 text-base font-semibold text-white">How It Works</h3>
                <ol className="space-y-2.5 text-xs text-gray-400">
                  {[
                    'Purchase the FSE Exam for $500',
                    'Your dashboard will show scheduling instructions',
                    'An approved proctor will be assigned',
                    'Your exam session is scheduled and identity confirmed',
                    'Proctor unlocks the exam for your session',
                    'You complete the proctored exam',
                    'Certificate issued if passed',
                  ].map((t, i) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-voltage-500/40 font-mono text-[10px] text-voltage-300">
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="hazard-stripe rounded-2xl p-7">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-voltage-200">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-voltage-300" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                  </svg>
                  Important Disclaimer
                </h3>
                <p className="text-xs leading-relaxed text-gray-400">
                  This credential demonstrates UPS field service knowledge through a proctored
                  examination. It does not replace employer authorization, site-specific training, OEM
                  qualification, safety training, electrical licensing, NFPA 70E, OSHA requirements,
                  or supervised field experience.
                </p>
              </div>

              <div className="pt-2 text-center">
                <PurchaseButton
                  productId="fse_proctored_exam"
                  label="Purchase FSE Exam — $500"
                  className="btn-voltage block w-full text-center"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Exam requires scheduling after purchase. Proctor unlock required before start.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
