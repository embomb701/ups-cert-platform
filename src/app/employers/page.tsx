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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voltage-500/60 to-transparent" />
        <div className="container-site section-pad">
          <div className="mx-auto max-w-4xl">
            <p className="kicker mb-5">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-voltage-400" />
              For Employers
            </p>
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
              Hire <span className="text-voltage-gradient">Verified, Qualified</span> Technicians
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-gray-400">
              The critical power industry needs qualified people. These certifications provide a
              knowledge benchmark employers can use to identify candidates who have genuinely studied
              UPS field service fundamentals before entering the field.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/verify" className="btn-voltage btn-lg">
                Verify a Certificate
              </Link>
              <Link href="/employers/packages" className="btn-outline btn-lg">
                Team Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry context */}
      <section className="section-pad">
        <div className="container-site max-w-5xl mx-auto">
          <p className="kicker mb-3">The Industry Context</p>
          <h2 className="mb-8 text-2xl font-bold text-white">Growing Demand, Hard-to-Verify Skills</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-dark p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-arc-500/30 bg-arc-500/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-arc-300" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18M7 14l3-3 3 3 5-6" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                UPS systems support data centers, hospitals, industrial facilities, communication systems,
                financial systems, and AI infrastructure. The demand for people who understand UPS field
                service is growing. Hyperscale computing, AI workloads, and increasing data center
                density are all driving new capacity — and new demand for capable service personnel.
              </p>
            </div>
            <div className="card-dark p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-voltage-500/30 bg-voltage-500/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Employers need a way to identify candidates who have studied the fundamentals before they
                enter the field. Traditional hiring processes often have no way to distinguish a candidate
                who has genuinely studied UPS systems from one who simply claims experience. These
                certifications are designed to provide that signal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credential value */}
      <section className="border-y border-white/10 bg-carbon-900/40 section-pad">
        <div className="container-site max-w-5xl mx-auto">
          <p className="kicker mb-3">What Each Credential Signals</p>
          <h2 className="mb-8 text-2xl font-bold text-white">Two Levels of Verified Knowledge</h2>

          {/* Jr FSE Employer Value */}
          <div className="card-dark p-8 mb-6">
            <div className="flex items-start gap-4 mb-5">
              <span className="badge-jr shrink-0">Jr. FSE</span>
              <div>
                <h3 className="text-lg font-bold text-white">Junior UPS Field Service Certification — $200</h3>
                <p className="text-sm text-gray-400">Entry/junior-level knowledge credential</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2.5 text-sm text-gray-400">
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />Browser-based exam, 50 randomized questions</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />Passing score: 80%</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />1,000-question Jr. FSE bank</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />Certificate issued if passed</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />Timed — 90 seconds per question</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />Publicly verifiable at /verify</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />Anti-cheat deterrents and audit logging</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />Useful as a hiring signal for supervised junior field service candidates</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />Account and IP/network tracking</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-arc-500" />One attempt per 90 days</span>
            </div>
          </div>

          {/* FSE Employer Value */}
          <div className="card-dark p-8">
            <div className="flex items-start gap-4 mb-5">
              <span className="badge-fse shrink-0">FSE</span>
              <div>
                <h3 className="text-lg font-bold text-white">UPS Field Service Certification — $500</h3>
                <p className="text-sm text-gray-400">Advanced, proctored knowledge credential</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2.5 text-sm text-gray-400">
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Proctored live by approved organization representative</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Stronger exam integrity through live proctoring</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />1,000-question FSE bank — separate from Jr. FSE</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Passing score: 80%</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />More technical, scenario-based, troubleshooting-focused</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Certificate issued if passed</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Identity confirmed before session</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Publicly verifiable at /verify</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Proctor must unlock the exam</span>
              <span className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />Useful as a stronger technical knowledge signal for FSE-level candidates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers + integrity */}
      <section className="section-pad">
        <div className="container-site max-w-5xl mx-auto">
          {/* Employer Disclaimer */}
          <div className="panel hazard-stripe overflow-hidden p-7 mb-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-voltage-300 mb-3">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
              </svg>
              Important Limitations
            </h3>
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
          <div className="card-dark p-7 mb-10">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 4 7v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-5z" />
              </svg>
              A Note on Exam Integrity
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              No browser-based exam can guarantee cheating is impossible. The Jr. FSE Exam uses layered
              deterrents, randomized delivery, timed questions, account controls, IP/network tracking,
              payment records, and audit logging to make cheating harder, less useful, and easier to
              identify. The FSE Exam adds live proctoring, which provides a stronger level of exam
              integrity.
            </p>
          </div>

          <div className="rule-voltage mb-8" />
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
            <Link href="/verify" className="text-sm font-medium text-voltage-400 hover:text-voltage-300">
              Verify a certificate &rarr;
            </Link>
            <Link href="/employers/packages" className="text-sm font-medium text-gray-400 hover:text-white">
              Employer team packages (coming soon) &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
