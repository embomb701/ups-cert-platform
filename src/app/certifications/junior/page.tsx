import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Junior UPS Field Service Certification Exam — $200',
  description:
    'The Jr. FSC Exam validates foundational UPS field service knowledge. Browser-based, 50 questions, timed, $200.',
};

export default function JuniorCertPage() {
  return (
    <>
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site max-w-4xl mx-auto">
          <span className="badge-jr mb-4 inline-block">Entry Level Knowledge Credential</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Junior UPS Field Service Certification
          </h1>
          <p className="text-2xl font-bold text-indigo-400 mb-4">$200</p>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            This credential demonstrates junior-level UPS field service knowledge for candidates entering
            the critical power field service industry. It is based on the material from{' '}
            <em>Mastering Uninterruptible Power Supplies, Field Service Engineering</em>.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card-dark p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Exam Format</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Browser-based online delivery</li>
                <li>50 questions per attempt</li>
                <li>Selected from 1,000-question Jr. FSC bank</li>
                <li>Randomized question order</li>
                <li>Randomized answer order</li>
                <li>90 seconds per question</li>
                <li>No backtracking</li>
                <li>Auto-submit on timer expiration</li>
              </ul>
            </div>
            <div className="card-dark p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Access Rules</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Google login required</li>
                <li>Stripe payment required ($200)</li>
                <li>One attempt every 90 days</li>
                <li>Account and IP/network cooldown enforced</li>
                <li>Suspicious activity logged</li>
                <li>Failed attempts still trigger cooldown</li>
              </ul>
            </div>
            <div className="card-dark p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">On Pass</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Passing score: 80% or higher</li>
                <li>Jr. FSC Certificate PDF issued</li>
                <li>Public verification link created</li>
                <li>Score and category breakdown shown</li>
                <li>Missed question review available</li>
                <li>Certificate status: valid</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">What the Exam Tests</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                The Jr. FSC Exam covers foundational UPS field service concepts at a junior/entry level.
                It requires genuine study of the book. It is not easy and is designed to separate candidates
                who have studied the material from those who have not.
              </p>
              <ul className="grid grid-cols-2 gap-2">
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
                  <li key={t} className="text-xs text-gray-400 flex gap-1.5">
                    <span className="text-indigo-400 shrink-0 mt-0.5">&#10003;</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="card-dark p-6">
                <h3 className="text-base font-semibold text-white mb-3">Anti-Cheat Measures</h3>
                <ul className="space-y-1.5 text-xs text-gray-400">
                  <li>&#x2022; Account and payment tied to attempt</li>
                  <li>&#x2022; IP/network hash tracking and cooldown</li>
                  <li>&#x2022; Large randomized question bank</li>
                  <li>&#x2022; Fullscreen enforcement prompt</li>
                  <li>&#x2022; Tab switch, blur, and visibility detection</li>
                  <li>&#x2022; Copy, paste, cut, and right-click disabled</li>
                  <li>&#x2022; Text selection disabled</li>
                  <li>&#x2022; Suspicious events logged and risk-scored</li>
                  <li>&#x2022; Flagged attempts reviewed by admin</li>
                  <li>&#x2022; Certificates revocable if fraud is found</li>
                </ul>
              </div>

              <div className="card-dark p-6 bg-amber-950/20 border-amber-900/50">
                <h3 className="text-sm font-semibold text-amber-200 mb-2">Important Disclaimer</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  This credential demonstrates junior-level UPS field service knowledge. It does not
                  authorize unsupervised electrical work, energized work, OEM service work, or work beyond
                  the candidate&apos;s employer-approved scope. Employers should still provide onboarding,
                  safety training, site-specific procedures, OEM training, and supervised field experience.
                </p>
              </div>

              <div className="text-center pt-2">
                <Link href="/login" className="block w-full px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors text-center">
                  Sign In to Purchase Jr. FSC Exam — $200
                </Link>
                <p className="text-xs text-gray-500 mt-2">Google account required. Payment via Stripe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-gray-900">
        <div className="container-site max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-400 mb-4">Want to compare both certification levels?</p>
          <Link href="/certifications/compare" className="text-sm text-indigo-400 hover:text-indigo-300">
            Compare Jr. FSC vs. FSC side-by-side &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
