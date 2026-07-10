import type { Metadata } from 'next';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import { PracticeTestButton } from '@/components/exam/PracticeTestButton';

export const metadata: Metadata = {
  title: 'Jr. FSE Certification — Test-Out Exam $299',
  description:
    'Already working in the field? Test out of the 3-to-6-Month Training Course for $299. One attempt — pass and you\'re certified. Fail and you must complete the training to try again.',
};

export default function JuniorCertPage() {
  return (
    <>
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site max-w-4xl mx-auto">
          <span className="badge-jr mb-4 inline-block">Jr. FSE Certification</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Junior UPS Field Service Certification Exam
          </h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl mb-6">
            The Jr. FSE credential validates foundational UPS field service knowledge. There are
            two paths to earning it — the 3-to-6-Month Training Course, or the Test-Out Exam for
            candidates already working in the industry.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#test-out" className="px-5 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold transition-colors">
              Test-Out Exam — $299
            </Link>
            <Link href="/training" className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors">
              3-to-6-Month Training Course — $1,499 →
            </Link>
          </div>
        </div>
      </section>

      {/* Test-Out Section */}
      <section id="test-out" className="section-pad">
        <div className="container-site max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Test-Out Exam — $299</h2>
            <p className="text-gray-400 max-w-2xl">
              For experienced technicians already working with UPS systems. Skip the 3-to-6-month training
              and test directly for your Jr. FSE certification. <strong className="text-white">You get one attempt.</strong>{' '}
              If you don&apos;t pass, you must complete the full 3-to-6-Month Training Course before
              trying again.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card-dark p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Exam Format</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Browser-based online delivery</li>
                <li>50 questions per attempt</li>
                <li>Selected from 1,000-question Jr. FSE bank</li>
                <li>Randomized question and answer order</li>
                <li>90 seconds per question</li>
                <li>No backtracking</li>
                <li>Auto-submit on timer expiration</li>
              </ul>
            </div>
            <div className="card-dark p-6 border-amber-900/60 bg-amber-950/10">
              <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wide mb-3">Test-Out Rules</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="text-amber-200 font-medium">One attempt only</li>
                <li>Pass: Jr. FSE certification issued</li>
                <li>Fail: must complete training course</li>
                <li>Training completion unlocks retry</li>
                <li>Google login required</li>
                <li>Suspicious activity logged and risk-scored</li>
              </ul>
            </div>
            <div className="card-dark p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">On Pass</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Passing score: 80% or higher</li>
                <li>Jr. FSE Certificate PDF issued</li>
                <li>Public verification link created</li>
                <li>Score and category breakdown shown</li>
                <li>Certificate status: valid</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">What the Exam Tests</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                The Jr. FSE Exam covers foundational UPS field service concepts. It requires genuine
                knowledge of the material — it is not easy and is designed to separate candidates
                who understand the field from those who do not.
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
                  <li>&#x2022; Large randomized question bank (1,000+ questions)</li>
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

              <div className="pt-2 space-y-3">
                <div className="card-dark p-5 border-blue-700/60 bg-blue-950/20">
                  <p className="text-sm font-semibold text-blue-300 mb-1">Best Value: 3-to-6-Month Training Course</p>
                  <p className="text-xs text-gray-400 mb-1">$1,499 — includes training + Jr. FSE exam at completion</p>
                  <p className="text-xs text-gray-500 mb-3">Pass all 28 modules → exam unlocked automatically</p>
                  <Link
                    href="/training"
                    className="block w-full px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors text-center"
                  >
                    View Training Course →
                  </Link>
                </div>

                <div className="relative flex items-center gap-3">
                  <div className="flex-1 border-t border-gray-800" />
                  <span className="text-xs text-gray-600">or test out directly</span>
                  <div className="flex-1 border-t border-gray-800" />
                </div>

                <PracticeTestButton
                  className="block w-full px-6 py-2.5 rounded-lg bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white font-semibold text-sm transition-colors text-center"
                />
                <PurchaseButton
                  productId="jr_fse_test_human"
                  label="Test-Out (Human Proctored) — $299"
                  className="block w-full px-6 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold text-sm transition-colors text-center"
                />

                <div className="relative flex items-center gap-3">
                  <div className="flex-1 border-t border-gray-800" />
                  <span className="text-xs text-gray-600">or add the book</span>
                  <div className="flex-1 border-t border-gray-800" />
                </div>

                <div className="card-dark p-4 border-amber-900/40 bg-amber-950/10">
                  <p className="text-xs font-semibold text-amber-200 mb-1">Signed Copy of the Book — $69.99</p>
                  <p className="text-xs text-gray-400 mb-2">Personally signed by Francis Aiello. Includes shipping to US addresses.</p>
                  <PurchaseButton
                    productId="signed_book"
                    label="Buy Signed Book — $69.99 →"
                    className="block w-full px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold text-xs transition-colors text-center"
                  />
                </div>

                <p className="text-xs text-gray-500 text-center">Google account required. Payment via Stripe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-gray-900">
        <div className="container-site max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-400 mb-4">Want to compare both certification levels?</p>
          <Link href="/certifications/compare" className="text-sm text-indigo-400 hover:text-indigo-300">
            Compare Jr. FSE vs. FSE side-by-side &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
