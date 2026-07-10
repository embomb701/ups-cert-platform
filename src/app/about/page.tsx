import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Mastering Field Service <span className="text-gradient">Training Portal</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-2">
            A division of <span className="text-white font-semibold">FA Consulting and Recruiting</span>
          </p>
          <p className="text-gray-400 leading-relaxed">
            We exist to bridge a gap that has existed in the UPS and critical power industry for decades:
            too many open roles, not enough trained people — and no clear path for the next generation to get in.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container-site max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div className="card-dark p-6 border-indigo-900/50">
              <div className="text-2xl mb-3">🏭</div>
              <h3 className="text-base font-semibold text-white mb-2">For the Industry</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Help organizations find qualified, pre-vetted field service candidates who already
                understand UPS fundamentals — reducing training time, improving safety, and raising
                the floor on technical competence across the industry.
              </p>
            </div>
            <div className="card-dark p-6 border-green-900/50">
              <div className="text-2xl mb-3">🎓</div>
              <h3 className="text-base font-semibold text-white mb-2">For the Next Generation</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Give motivated people — regardless of background — a credible, structured path into
                a rewarding, in-demand career in UPS field service engineering.
              </p>
            </div>
          </div>

          {/* Francis Aiello bio */}
          <div className="card-dark p-8 mb-10">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-full bg-indigo-900/60 border border-indigo-700 flex items-center justify-center shrink-0 text-2xl font-bold text-indigo-300">
                FA
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Francis Aiello</h2>
                <p className="text-sm text-indigo-400">CEO, FA Consulting and Recruiting</p>
                <p className="text-sm text-gray-500">Author · VP of Field Services · 25+ Years in the Industry</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                Francis Aiello has spent over 25 years working in the UPS and critical power field service
                industry — not in a classroom, but in the field. His career has touched every level of the
                profession: field service associate, field service engineer, supervisor, scheduler, manager,
                director, and now Vice President of Field Services.
              </p>
              <p>
                That breadth of experience across every role in the career path is what makes this
                platform different. The content here isn't derived from theory or textbooks — it's built
                from startup, commissioning, troubleshooting, service coordination, billing, quoting,
                field documentation, customer communication, team leadership, and field operations across
                a wide range of UPS systems, manufacturers, topologies, and critical environments.
              </p>
              <p>
                Francis is also the author of{' '}
                <em className="text-gray-200">Mastering Uninterruptible Power Supplies, Field Service Engineering</em> —
                the technical foundation on which the Mastering Field Service certifications are based.
                The book was written specifically to give motivated individuals the knowledge base
                needed to step into a UPS field service role and perform safely and competently from day one.
              </p>
              <p>
                FA Consulting and Recruiting was founded to operationalize that mission: connecting
                qualified candidates to employers, and helping employers find people who are already
                prepared to work.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-14">
            {[
              { stat: '25+', label: 'Years in the industry' },
              { stat: 'Every', label: 'Career level held' },
              { stat: '1 Book', label: 'Written from real experience' },
            ].map(s => (
              <div key={s.stat} className="text-center card-dark p-5">
                <p className="text-2xl font-bold text-indigo-400 mb-1">{s.stat}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>

          {/* About the platform */}
          <div className="card-dark p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-3">About the Platform</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              The Mastering Field Service Training Portal is built to be a serious, industry-backed training
              and certification platform — not a quick-quiz certificate mill. The goal is a credential
              that actually means something to a hiring manager: proof that a candidate has studied
              the material seriously, retained the foundational knowledge, and is ready to be trained
              in a real field environment.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              The certifications are tied directly to{' '}
              <em>Mastering Uninterruptible Power Supplies, Field Service Engineering</em>.
              Employer partnerships, additional certification levels, and expanded training content
              are actively in development.
            </p>
          </div>

          {/* Independence statement */}
          <div className="card-dark p-6 bg-amber-950/20 border-amber-900/40 mb-10">
            <h3 className="text-sm font-semibold text-amber-200 mb-2">Independence Statement</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              The Mastering Field Service Training Portal is operated by FA Consulting and Recruiting and
              is not affiliated with, endorsed by, or sponsored by any employer, manufacturer,
              customer, or service company unless explicitly stated. The certifications offered here
              are educational knowledge credentials. They do not authorize energized electrical work,
              replace employer training, replace OEM qualification, replace electrical licensing,
              replace NFPA 70E or OSHA requirements, or replace site-specific procedures.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/certifications/junior" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
              View Certifications →
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm transition-colors">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
