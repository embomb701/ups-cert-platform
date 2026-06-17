import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UPS Field Service Certification Exam (Proctored) — $500',
  description:
    'The FSC Exam is a proctored, advanced UPS field service knowledge credential. $500, scheduling required.',
};

export default function ProctoredCertPage() {
  return (
    <>
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site max-w-4xl mx-auto">
          <span className="badge-fsc mb-4 inline-block">Advanced — Proctored</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            UPS Field Service Certification
          </h1>
          <p className="text-2xl font-bold text-amber-400 mb-4">$500</p>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            The UPS Field Service Certification is a more advanced, proctored credential intended to
            validate deeper technical understanding and stronger readiness for field service work.
            Based on <em>Mastering Uninterruptible Power Supplies, Field Service Engineering</em>.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card-dark p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Exam Format</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Proctored live — approved organization representative</li>
                <li>50 questions per session</li>
                <li>Selected from 1,000-question FSC bank</li>
                <li>Randomized question and answer order</li>
                <li>90 seconds per question (configurable)</li>
                <li>No backtracking</li>
                <li>More difficult — scenario-based questions</li>
              </ul>
            </div>
            <div className="card-dark p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Access &amp; Scheduling</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Google login required</li>
                <li>Stripe payment required ($500)</li>
                <li>Exam does not unlock immediately on purchase</li>
                <li>Scheduling required after purchase</li>
                <li>Identity confirmed before exam begins</li>
                <li>Proctor must unlock the exam session</li>
                <li>Proctor may monitor, stop, or flag the attempt</li>
              </ul>
            </div>
            <div className="card-dark p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">On Pass</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Passing score: 80% or higher</li>
                <li>FSC Certificate PDF issued</li>
                <li>Proctored exam noted on certificate</li>
                <li>Public verification link created</li>
                <li>Certificate status: valid</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">What the FSC Exam Tests</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                The FSC Exam includes everything from the Jr. FSC level, but at greater technical depth,
                plus advanced topics including component theory, transfer types, troubleshooting decision
                trees, measurement interpretation, and scenario-based field reasoning.
              </p>
              <div className="space-y-2">
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
                    <div className="text-xs text-gray-400 flex gap-1.5">
                      <span className="text-amber-400 shrink-0">&#10003;</span>{a}
                    </div>
                    <div className="text-xs text-gray-400 flex gap-1.5">
                      <span className="text-amber-400 shrink-0">&#10003;</span>{b}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="card-dark p-6">
                <h3 className="text-base font-semibold text-white mb-2">Why Proctored?</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  The FSC Exam requires live proctoring by an approved organization representative. This
                  provides identity verification, observation, and a stronger level of exam integrity
                  compared to browser-based only controls. The higher price reflects the scheduling,
                  coordination, and proctoring involved.
                </p>
              </div>

              <div className="card-dark p-6">
                <h3 className="text-base font-semibold text-white mb-3">How It Works</h3>
                <ol className="space-y-2 text-xs text-gray-400">
                  <li>1. Purchase the FSC Exam for $500</li>
                  <li>2. Your dashboard will show scheduling instructions</li>
                  <li>3. An approved proctor will be assigned</li>
                  <li>4. Your exam session is scheduled and identity confirmed</li>
                  <li>5. Proctor unlocks the exam for your session</li>
                  <li>6. You complete the proctored exam</li>
                  <li>7. Certificate issued if passed</li>
                </ol>
              </div>

              <div className="card-dark p-6 bg-amber-950/20 border-amber-900/50">
                <h3 className="text-sm font-semibold text-amber-200 mb-2">Important Disclaimer</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  This credential demonstrates UPS field service knowledge through a proctored
                  examination. It does not replace employer authorization, site-specific training, OEM
                  qualification, safety training, electrical licensing, NFPA 70E, OSHA requirements,
                  or supervised field experience.
                </p>
              </div>

              <div className="text-center pt-2">
                <Link href="/login" className="block w-full px-6 py-3 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-semibold text-sm transition-colors text-center">
                  Sign In to Purchase FSC Exam — $500
                </Link>
                <p className="text-xs text-gray-500 mt-2">
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
