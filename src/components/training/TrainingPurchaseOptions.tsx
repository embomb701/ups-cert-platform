'use client';

import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import { PracticeTestButton } from '@/components/exam/PracticeTestButton';

export function TrainingPurchaseOptions() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-white">UPS Field Service Engineering Academy</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose your path to Jr. FSE or FSE certification. Train from scratch with the 6-month
            course, or test out if you already work in the field.
          </p>
        </div>

        {/* ── MAIN PRODUCT: Training Course ──────────────────────────────── */}
        <div className="rounded-xl border-2 border-blue-600 bg-blue-950/20 p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="inline-block px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-3">
                RECOMMENDED
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">6-Month Training Course</h2>
              <p className="text-4xl font-bold text-white mb-1">$1,499</p>
              <p className="text-blue-300 text-sm mb-4">Jr. FSE Certification Exam included at completion</p>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-xl">
                The complete structured program. 24 modules over 6 months covering everything from
                electrical fundamentals to advanced UPS systems, battery safety, troubleshooting,
                and professional field conduct. Pass all 24 modules and the Jr. FSE exam is unlocked
                at no extra cost.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  '24 training modules · 72 slides',
                  '5-minute timer enforced per slide',
                  '100% required on every section quiz',
                  '100% required on every module test (once per day)',
                  '1-week minimum between modules',
                  'Jr. FSE Certification Exam included',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 space-y-3 min-w-[200px]">
              <PurchaseButton
                productId="training_course"
                label="Enroll — $1,499"
                className="block w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-center transition-colors"
              />
              <p className="text-xs text-gray-500 text-center">Grants immediate training portal access</p>
            </div>
          </div>
        </div>

        {/* ── PRACTICE TEST ───────────────────────────────────────────────── */}
        <div className="rounded-xl border border-green-800/60 bg-green-950/10 p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="inline-block px-2 py-0.5 bg-green-700/40 border border-green-700/60 text-green-300 text-xs font-semibold rounded-full mb-2">
                PRACTICE — NO CERT ISSUED
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Jr. FSE Practice Test</h2>
              <p className="text-3xl font-bold text-white mb-3">$14.99</p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                Take a real 50-question Jr. FSE exam to see how you score. Same question pool, same
                format, same time limits. Results and category breakdown shown. No certificate issued —
                this is for practice only, not a test-out attempt.
              </p>
            </div>
            <div className="flex-shrink-0 min-w-[200px]">
              <PracticeTestButton
                className="block w-full py-2.5 px-5 bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ── JR. FSE TEST-OUT OPTIONS ────────────────────────────────────── */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Jr. FSE Test-Out</h2>
          <p className="text-gray-400 text-sm mb-5">
            Already working with UPS systems? Skip the training and test directly for your Jr. FSE
            certification. <span className="text-amber-300 font-medium">One attempt only.</span>{' '}
            Fail and you must complete the training course before trying again.
          </p>
          <div className="rounded-xl border border-amber-800/60 bg-amber-950/10 p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="inline-block mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/60 border border-amber-700 text-amber-300 font-semibold">
                    HUMAN PROCTORED
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Jr. FSE Test-Out</h3>
                <p className="text-3xl font-bold text-white mb-3">$299</p>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li className="flex gap-2"><span className="text-amber-400 flex-shrink-0">→</span>50-question exam with live proctor</li>
                  <li className="flex gap-2"><span className="text-amber-400 flex-shrink-0">→</span>Session scheduled after purchase</li>
                  <li className="flex gap-2"><span className="text-amber-400 flex-shrink-0">→</span>Pass = Jr. FSE certification issued</li>
                  <li className="flex gap-2 text-amber-400"><span className="flex-shrink-0">→</span>One attempt — fail means training required</li>
                </ul>
              </div>
              <div className="flex-shrink-0 min-w-[200px]">
                <PurchaseButton
                  productId="jr_fse_test_human"
                  label="Buy Test-Out — $299"
                  className="block w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── FSE EXAM ────────────────────────────────────────────────────── */}
        <div>
          <h2 className="text-xl font-bold text-white mb-5">FSE Certification — Human Proctored</h2>
          <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">FSE Exam — Human Proctored</h3>
              <p className="text-3xl font-bold text-white mb-3">$649</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-gray-400">
                {['50 questions', 'Human proctored session', '80% to pass', 'Scheduled after purchase', 'FSE Certificate issued', 'Advanced-level content'].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-500 flex-shrink-0 mt-0.5">→</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <PurchaseButton
                productId="fse_proctored_exam"
                label="Buy FSE Exam — $649"
                className="block w-full md:w-48 py-3 px-6 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ── PACKAGES ────────────────────────────────────────────────────── */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Packages — Save $49</h2>
          <p className="text-gray-400 text-sm mb-5">
            Bundle the training course with a test-out or exam option.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                name: 'Training + Jr. FSE Human Test-Out',
                price: '$1,749',
                desc: 'Training Course + Jr. FSE Test-Out (Human Proctored)',
                saving: 'Save $49 vs individual',
                productId: 'pkg_training_jr_human' as const,
              },
              {
                name: 'Training + FSE Exam',
                price: '$2,099',
                desc: 'Training Course + FSE Exam (Human Proctored)',
                saving: 'Save $49 vs individual',
                productId: 'pkg_training_fse' as const,
              },
            ].map((pkg, i) => (
              <div key={i} className="rounded-xl border border-blue-800 bg-blue-950/10 p-5">
                <h3 className="text-white font-semibold mb-1">{pkg.name}</h3>
                <p className="text-2xl font-bold text-white mb-1">{pkg.price}</p>
                <p className="text-green-400 text-xs mb-3 font-medium">{pkg.saving}</p>
                <p className="text-gray-400 text-xs mb-5 leading-relaxed">{pkg.desc}</p>
                <PurchaseButton
                  productId={pkg.productId}
                  label={`Buy Package — ${pkg.price}`}
                  className="block w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── PHYSICAL BOOK ────────────────────────────────────────────────── */}
        <div className="rounded-xl border border-amber-900/40 bg-amber-950/10 p-6 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">Signed Copy of the Book</h3>
            <p className="text-2xl font-bold text-white mb-2">$69.99</p>
            <p className="text-gray-400 text-sm">
              <em>Mastering Uninterruptible Power Supplies, Field Service Engineering</em> — personally
              signed by Francis Aiello. Ships to US addresses.
            </p>
          </div>
          <div className="flex-shrink-0">
            <PurchaseButton
              productId="signed_book"
              label="Buy Signed Book — $69.99"
              className="block py-2.5 px-5 bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-xs">
            All purchases via Stripe. Google account required.{' '}
            <Link href="/about" className="text-gray-500 hover:text-gray-400">About the instructor →</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
