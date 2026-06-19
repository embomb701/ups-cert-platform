import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employer Team Packages — Coming Soon',
};

const packages = [
  { label: '5 Jr. FSE Exam Seats', desc: 'Best for small hiring cohorts or pilot programs.' },
  { label: '10 Jr. FSE Exam Seats', desc: 'For teams onboarding a class of junior field technicians.' },
  { label: '25 Jr. FSE Exam Seats', desc: 'Larger programs or organizations with ongoing hiring.' },
  { label: 'Custom Employer Training Package', desc: 'Combined book + exam + training access. Contact us for pricing.' },
  { label: 'Proctored FSE Exam Scheduling', desc: 'For employers sending selected candidates through the FSE exam process.' },
];

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voltage-500/60 to-transparent" />
        <div className="container-site section-pad">
          <div className="mx-auto max-w-4xl">
            <span className="badge-jr mb-5 inline-block">Coming Soon</span>
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
              Employer &amp; <span className="text-voltage-gradient">Team Packages</span>
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-gray-400">
              Employers will soon be able to purchase multiple exam seats for technician candidates,
              apprentices, electricians, data center staff, or new field service hires. Contact us to
              discuss your needs.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-4xl mx-auto">
          <p className="kicker mb-3">Planned Offerings</p>
          <h2 className="mb-8 text-2xl font-bold text-white">Buy Seats for Your Team</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-14">
            {packages.map((pkg) => (
              <div key={pkg.label} className="card-dark p-6 opacity-80">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-semibold text-white">{pkg.label}</h3>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-400">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-400">{pkg.desc}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="relative overflow-hidden rounded-3xl border border-voltage-500/20 bg-carbon-850 p-10 text-center sm:p-12">
            <div className="absolute inset-0 -z-10 bg-carbon-radial" />
            <p className="kicker mb-4 justify-center">Get in Touch</p>
            <h2 className="mb-3 text-2xl font-bold text-white">Contact Us</h2>
            <p className="mb-8 text-sm text-gray-400">
              Interested in employer packages or bulk exam seats? Reach out to discuss options.
            </p>
            {/* Placeholder contact form */}
            <form className="max-w-sm mx-auto space-y-3 text-left">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-carbon-900/60 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-voltage-500 focus:outline-none focus:ring-1 focus:ring-voltage-500/40"
              />
              <input
                type="email"
                placeholder="Work email"
                className="w-full rounded-xl border border-white/10 bg-carbon-900/60 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-voltage-500 focus:outline-none focus:ring-1 focus:ring-voltage-500/40"
              />
              <textarea
                rows={3}
                placeholder="Tell us about your team and needs"
                className="w-full resize-none rounded-xl border border-white/10 bg-carbon-900/60 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-voltage-500 focus:outline-none focus:ring-1 focus:ring-voltage-500/40"
              />
              <button type="submit" className="btn-voltage w-full justify-center">
                Submit Inquiry
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">[Contact form submission not yet wired — add your email or a form service in production]</p>
          </div>
        </div>
      </section>
    </>
  );
}
