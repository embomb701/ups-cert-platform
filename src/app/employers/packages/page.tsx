import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Employer Team Packages — Coming Soon',
};

const packages = [
  { label: '5 Jr. FSC Exam Seats', desc: 'Best for small hiring cohorts or pilot programs.' },
  { label: '10 Jr. FSC Exam Seats', desc: 'For teams onboarding a class of junior field technicians.' },
  { label: '25 Jr. FSC Exam Seats', desc: 'Larger programs or organizations with ongoing hiring.' },
  { label: 'Custom Employer Training Package', desc: 'Combined book + exam + training access. Contact us for pricing.' },
  { label: 'Proctored FSC Exam Scheduling', desc: 'For employers sending selected candidates through the FSC exam process.' },
];

export default function PackagesPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-4xl mx-auto">
        <span className="badge-jr mb-4 inline-block">Coming Soon</span>
        <h1 className="text-3xl font-bold text-white mb-4">Employer &amp; Team Packages</h1>
        <p className="text-gray-400 leading-relaxed max-w-2xl mb-12">
          Employers will soon be able to purchase multiple exam seats for technician candidates,
          apprentices, electricians, data center staff, or new field service hires. Contact us to
          discuss your needs.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {packages.map((pkg) => (
            <div key={pkg.label} className="card-dark p-6 opacity-70">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-white">{pkg.label}</h3>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">Coming Soon</span>
              </div>
              <p className="text-sm text-gray-400">{pkg.desc}</p>
            </div>
          ))}
        </div>

        <div className="card-dark p-8 text-center">
          <h2 className="text-lg font-bold text-white mb-3">Contact Us</h2>
          <p className="text-sm text-gray-400 mb-6">
            Interested in employer packages or bulk exam seats? Reach out to discuss options.
          </p>
          {/* Placeholder contact form */}
          <form className="max-w-sm mx-auto space-y-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="email"
              placeholder="Work email"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <textarea
              rows={3}
              placeholder="Tell us about your team and needs"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
            <button
              type="submit"
              className="w-full px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
            >
              Submit Inquiry
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">[Contact form submission not yet wired — add your email or a form service in production]</p>
        </div>
      </div>
    </section>
  );
}
