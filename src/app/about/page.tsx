import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Program Creator and Platform',
};

const careerLadder = [
  'Field Service Associate',
  'Field Service Engineering',
  'Supervision & Scheduling',
  'Management',
  'Director-Level Field Service Leadership',
  'Vice President-Level Field Service Leadership',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voltage-500/60 to-transparent" />
        <div className="container-site section-pad">
          <div className="mx-auto max-w-3xl">
            <p className="kicker mb-5">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-voltage-400" />
              The Program
            </p>
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
              About the <span className="text-voltage-gradient">Platform</span>
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-gray-400">
              Mastering FSE is an independent educational platform built to give motivated people a
              serious path to UPS field service knowledge. It is not affiliated with, endorsed by, or
              sponsored by any employer, manufacturer, customer, or service company unless explicitly stated.
            </p>
          </div>
        </div>
      </section>

      {/* Program creator */}
      <section className="section-pad">
        <div className="container-site max-w-3xl mx-auto">
          <p className="kicker mb-3">Two Decades in the Field</p>
          <h2 className="mb-8 text-2xl font-bold text-white">About the Program Creator</h2>

          <div className="space-y-5 text-gray-400 leading-relaxed text-sm">
            <p>
              The program creator has worked in the UPS and critical power field service industry since
              2005. That is more than two decades of hands-on work with UPS systems, batteries, STS
              systems, electrical, mechanical, and electromechanical equipment in real field environments.
            </p>
            <p>
              The career path started at the field service associate level and progressed through field
              service engineering, supervision, scheduling, management, director-level field service
              leadership, and vice president-level field service leadership. Nearly every role in the
              UPS field service career path has been occupied at some point.
            </p>
            <p>
              The work has included startup, commissioning, troubleshooting, service coordination,
              billing, quoting, field documentation, customer communication, team leadership, and
              field service operations across a wide range of UPS systems, manufacturers, topologies,
              and critical environments.
            </p>
            <p>
              The book and certifications are built from that experience — not from theory alone. The
              material reflects what actually matters in the field: safe measurement, correct judgment,
              protecting the critical load, understanding what you are looking at, and knowing when to
              escalate.
            </p>
          </div>

          {/* Career ladder */}
          <div className="mt-10 card-dark p-7">
            <p className="kicker mb-5">Every Rung of the Ladder</p>
            <ol className="space-y-3">
              {careerLadder.map((role, i) => (
                <li key={role} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-voltage-500/30 bg-voltage-500/10 font-display text-sm font-bold text-voltage-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium text-gray-200">{role}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* About platform + disclaimer */}
      <section className="border-y border-white/10 bg-carbon-900/40 section-pad">
        <div className="container-site max-w-3xl mx-auto">
          <div className="card-dark p-7 mb-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-arc-500/30 bg-arc-500/10">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-arc-300" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21V10l9-7 9 7v11h-6v-7H9v7H3z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white mb-3">About This Platform</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              Mastering FSE is designed to be more than a personal project. The goal is a serious,
              organization-backed training and certification platform that can grow to include broader
              content, additional certification levels, employer partnerships, and eventually a recognized
              credential in the UPS and critical power field service industry.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              The certifications are based directly on the book{' '}
              <em className="text-gray-300">Mastering Uninterruptible Power Supplies, Field Service Engineering</em>. Passing an
              exam on this platform demonstrates that a candidate has studied the material seriously
              and retained the foundational knowledge needed to be trainable, safety-minded, and useful
              in a UPS field service environment.
            </p>
          </div>

          <div className="panel hazard-stripe overflow-hidden p-7">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-voltage-300 mb-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
              </svg>
              Independence Statement
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              This is an independent educational platform and is not affiliated with, endorsed by, or
              sponsored by any employer, manufacturer, customer, or service company unless explicitly
              stated. The certifications offered here are educational knowledge credentials. They do not
              authorize energized electrical work, replace employer training, replace OEM qualification,
              replace electrical licensing, replace NFPA 70E or OSHA requirements, or replace
              site-specific procedures.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link href="/certifications/junior" className="btn-voltage btn-lg">
              View the Jr. FSE Exam &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
