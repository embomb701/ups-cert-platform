import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Employer Resources — UPS Field Service Certification',
  description:
    'Why these certifications matter for employers hiring UPS field service candidates.',
};

export default function EmployersPage() {
  return (
    <>
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why These Certifications Matter for Employers
          </h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            The critical power industry needs qualified people. These certifications provide a
            knowledge benchmark employers can use to identify candidates who have genuinely studied
            UPS field service fundamentals before entering the field.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">The Industry Context</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <p className="text-sm text-gray-400 leading-relaxed">
              UPS systems support data centers, hospitals, industrial facilities, communication systems,
              financial systems, and AI infrastructure. The demand for people who understand UPS field
              service is growing. Hyperscale computing, AI workloads, and increasing data center
              density are all driving new capacity — and new demand for capable service personnel.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Employers need a way to identify candidates who have studied the fundamentals before they
              enter the field. Traditional hiring processes often have no way to distinguish a candidate
              who has genuinely studied UPS systems from one who simply claims experience. These
              certifications are designed to provide that signal.
            </p>
          </div>

          {/* Jr FSC Employer Value */}
          <div className="card-dark p-8 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="badge-jr shrink-0">Jr. FSC</span>
              <div>
                <h3 className="text-lg font-bold text-white">Junior UPS Field Service Certification — $200</h3>
                <p className="text-sm text-gray-400">Entry/junior-level knowledge credential</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-sm text-gray-400">
                <li>&#x2022; Browser-based exam, 50 randomized questions</li>
                <li>&#x2022; 1,000-question Jr. FSC bank</li>
                <li>&#x2022; Timed — 90 seconds per question</li>
                <li>&#x2022; Anti-cheat deterrents and audit logging</li>
                <li>&#x2022; Account and IP/network tracking</li>
                <li>&#x2022; One attempt per 90 days</li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>&#x2022; Passing score: 80%</li>
                <li>&#x2022; Certificate issued if passed</li>
                <li>&#x2022; Publicly verifiable at /verify</li>
                <li>&#x2022; Useful as a hiring signal for supervised junior field service candidates</li>
              </ul>
            </div>
          </div>

          {/* FSC Employer Value */}
          <div className="card-dark p-8 mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="badge-fsc shrink-0">FSC</span>
              <div>
                <h3 className="text-lg font-bold text-white">UPS Field Service Certification — $500</h3>
                <p className="text-sm text-gray-400">Advanced, proctored knowledge credential</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-sm text-gray-400">
                <li>&#x2022; Proctored live by approved organization representative</li>
                <li>&#x2022; 1,000-question FSC bank — separate from Jr. FSC</li>
                <li>&#x2022; More technical, scenario-based, troubleshooting-focused</li>
                <li>&#x2022; Identity confirmed before session</li>
                <li>&#x2022; Proctor must unlock the exam</li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>&#x2022; Stronger exam integrity through live proctoring</li>
                <li>&#x2022; Passing score: 80%</li>
                <li>&#x2022; Certificate issued if passed</li>
                <li>&#x2022; Publicly verifiable at /verify</li>
                <li>&#x2022; Useful as a stronger technical knowledge signal for FSE-level candidates</li>
              </ul>
            </div>
          </div>

          {/* Employer Disclaimer */}
          <div className="card-dark p-6 bg-amber-950/20 border-amber-900/40 mb-8">
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              No online or proctored exam can guarantee job performance by itself. These certifications
              do not replace employer onboarding, safety qualification, OEM training, electrical
              licensing, NFPA 70E training, OSHA requirements, site-specific procedures, or supervised
              field experience. They are designed to help employers identify candidates who have studied
              the material and demonstrated knowledge of UPS field service concepts at the stated level.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Passing one of these exams should not be viewed as permission for the candidate to work
              beyond their approved scope. It should be viewed as evidence that the candidate has made a
              serious effort to learn the field and has demonstrated knowledge through a difficult,
              controlled exam process.
            </p>
          </div>

          {/* Exam integrity note */}
          <div className="card-dark p-6 mb-8">
            <h3 className="text-sm font-semibold text-white mb-2">A Note on Exam Integrity</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              No browser-based exam can guarantee cheating is impossible. The Jr. FSC Exam uses layered
              deterrents, randomized delivery, timed questions, account controls, IP/network tracking,
              payment records, and audit logging to make cheating harder, less useful, and easier to
              identify. The FSC Exam adds live proctoring, which provides a stronger level of exam
              integrity.
            </p>
          </div>

          <div className="text-center">
            <Link href="/verify" className="text-sm text-indigo-400 hover:text-indigo-300 mr-6">
              Verify a certificate &rarr;
            </Link>
            <Link href="/employers/packages" className="text-sm text-gray-400 hover:text-white">
              Employer team packages (coming soon) &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
