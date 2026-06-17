import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Program Creator and Platform',
};

export default function AboutPage() {
  return (
    <>
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            About the Platform
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Mastering FSE is an independent educational platform built to give motivated people a
            serious path to UPS field service knowledge. It is not affiliated with, endorsed by, or
            sponsored by any employer, manufacturer, customer, or service company unless explicitly stated.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">About the Program Creator</h2>

          <div className="space-y-5 text-gray-400 leading-relaxed text-sm mb-10">
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

          <div className="card-dark p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-3">About This Platform</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              Mastering FSE is designed to be more than a personal project. The goal is a serious,
              organization-backed training and certification platform that can grow to include broader
              content, additional certification levels, employer partnerships, and eventually a recognized
              credential in the UPS and critical power field service industry.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              The certifications are based directly on the book{' '}
              <em>Mastering Uninterruptible Power Supplies, Field Service Engineering</em>. Passing an
              exam on this platform demonstrates that a candidate has studied the material seriously
              and retained the foundational knowledge needed to be trainable, safety-minded, and useful
              in a UPS field service environment.
            </p>
          </div>

          <div className="card-dark p-6 bg-amber-950/20 border-amber-900/40">
            <h3 className="text-sm font-semibold text-amber-200 mb-2">Independence Statement</h3>
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
            <Link href="/certifications/junior" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
              View the Jr. FSE Exam &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
