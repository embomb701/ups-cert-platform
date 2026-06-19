import type { Metadata } from 'next';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';

export const metadata: Metadata = {
  title: 'Junior UPS Field Service Certification Exam — $200',
  description:
    'The Jr. FSE Exam validates foundational UPS field service knowledge. Browser-based, 50 questions, timed, $200.',
};

export default function JuniorCertPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arc-500/60 to-transparent" />
        <div className="container-site section-pad">
          <div className="mx-auto max-w-4xl">
            <span className="badge-jr mb-5 inline-flex">Entry Level Knowledge Credential</span>
            <h1 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Junior UPS Field Service Certification
            </h1>
            <p className="mt-5 font-display text-4xl font-bold text-arc-300">$200</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-gray-400">
              This credential demonstrates junior-level UPS field service knowledge for candidates entering
              the critical power field service industry. It is based on the material from{' '}
              <em className="text-gray-300">Mastering Uninterruptible Power Supplies, Field Service Engineering</em>.
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section-pad">
        <div className="container-site mx-auto max-w-5xl">
          <p className="kicker mb-3">Exam Overview</p>
          <h2 className="mb-10 text-2xl font-bold text-white">Format, Access &amp; Outcomes</h2>

          <div className="mb-14 grid gap-6 md:grid-cols-3">
            <div className="card-dark p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-arc-500/30 bg-arc-500/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-arc-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="14" rx="2" />
                  <path d="M8 21h8M12 18v3" />
                </svg>
              </div>
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-arc-300">Exam Format</h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {[
                  'Browser-based online delivery',
                  '50 questions per attempt',
                  'Selected from 1,000-question Jr. FSE bank',
                  'Randomized question order',
                  'Randomized answer order',
                  '90 seconds per question',
                  'No backtracking',
                  'Auto-submit on timer expiration',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-dark p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-arc-500/30 bg-arc-500/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-arc-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </div>
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-arc-300">Access Rules</h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {[
                  'Google login required',
                  'Stripe payment required ($200)',
                  'One attempt every 90 days',
                  'Account and IP/network cooldown enforced',
                  'Suspicious activity logged',
                  'Failed attempts still trigger cooldown',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-dark p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-arc-500/30 bg-arc-500/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-arc-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 4 7v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-5z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-arc-300">On Pass</h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {[
                  'Passing score: 80% or higher',
                  'Jr. FSE Certificate PDF issued',
                  'Public verification link created',
                  'Score and category breakdown shown',
                  'Missed question review available',
                  'Certificate status: valid',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="kicker mb-3">Knowledge Domains</p>
              <h2 className="mb-4 text-xl font-bold text-white">What the Exam Tests</h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                The Jr. FSE Exam covers foundational UPS field service concepts at a junior/entry level.
                It requires genuine study of the book. It is not easy and is designed to separate candidates
                who have studied the material from those who have not.
              </p>
              <ul className="grid grid-cols-2 gap-2.5">
                {[
                  'UPS purpose and critical load protection',
                  'Basic AC/DC electrical theory',
                  'Safe meter use and measurement',
                  'Battery basics and safety',
                  'Rectifier and inverter basics',
                  'Static bypass basics',
                  'Maintenance bypass basics',
                  'STS and PDU/RPP basics',
                  'Alarm recognition',
                  'Basic troubleshooting sequence',
                  'LOTO and PPE awareness',
                  'Escalation judgment',
                  'Field documentation',
                  'Customer communication',
                  'Recognizing unsafe conditions',
                  'Service workflow',
                ].map((t) => (
                  <li key={t} className="flex gap-1.5 text-xs text-gray-400">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-arc-400" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="card-dark p-7">
                <h3 className="mb-4 text-base font-semibold text-white">Anti-Cheat Measures</h3>
                <ul className="space-y-2 text-xs text-gray-400">
                  {[
                    'Account and payment tied to attempt',
                    'IP/network hash tracking and cooldown',
                    'Large randomized question bank',
                    'Fullscreen enforcement prompt',
                    'Tab switch, blur, and visibility detection',
                    'Copy, paste, cut, and right-click disabled',
                    'Text selection disabled',
                    'Suspicious events logged and risk-scored',
                    'Flagged attempts reviewed by admin',
                    'Certificates revocable if fraud is found',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hazard-stripe rounded-2xl p-7">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-voltage-200">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-voltage-300" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                  </svg>
                  Important Disclaimer
                </h3>
                <p className="text-xs leading-relaxed text-gray-400">
                  This credential demonstrates junior-level UPS field service knowledge. It does not
                  authorize unsupervised electrical work, energized work, OEM service work, or work beyond
                  the candidate&apos;s employer-approved scope. Employers should still provide onboarding,
                  safety training, site-specific procedures, OEM training, and supervised field experience.
                </p>
              </div>

              <div className="pt-2 text-center">
                <PurchaseButton
                  productId="jr_fse_exam"
                  label="Purchase Jr. FSE Exam — $200"
                  className="btn-arc block w-full text-center"
                />
                <p className="mt-2 text-xs text-gray-500">Google account required. Payment via Stripe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare CTA */}
      <section className="border-y border-white/10 bg-carbon-900/40 section-pad">
        <div className="container-site mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm text-gray-400">Want to compare all three certification levels?</p>
          <Link href="/certifications/compare" className="text-sm font-medium text-arc-400 hover:text-arc-300">
            Compare Jr. FSE vs. FSE side-by-side &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
