import type { Metadata } from 'next';
import Link from 'next/link';
import { PackagesForm } from './PackagesForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata: Metadata = {
  title: 'Employer & Team Packages — Mastering Field Service',
  description:
    'Bulk exam seats and training packages for employers. Certify your field service candidates before day one — 5, 10, or 25 seat packs, or a custom training arrangement.',
  openGraph: {
    title: 'Employer Team Packages — Mastering Field Service',
    description: 'Bulk seat packages for UPS FSE, HVAC, Data Center, and more. Contact us for pricing.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Employer Packages' }],
  },
  twitter: { card: 'summary_large_image', images: [`${SITE_URL}/api/og`] },
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
          <PackagesForm />
        </div>

        <div className="mt-8 text-center">
          <Link href="/employers" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            ← Back to Employer Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
