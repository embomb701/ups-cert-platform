import type { Metadata } from 'next';
import { ContactForm } from './ContactForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata: Metadata = {
  title: 'Contact Us — Mastering Field Service',
  description:
    'Have a question about training, exams, or certifications? Reach out to the Mastering Field Service team. We respond within 24 hours on business days.',
  openGraph: {
    title: 'Contact Mastering Field Service',
    description: 'Questions about training, certifications, or employer programs? We respond within 24 hours.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Contact Us' }],
  },
  twitter: { card: 'summary_large_image', images: [`${SITE_URL}/api/og`] },
};

export default function ContactPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-gray-400 text-sm mb-8">
          Have a question about the program, exams, or certifications? Send us a message or reach us directly.
        </p>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Phone</p>
              <a href="tel:4844160134" className="text-white font-medium hover:text-indigo-300 transition-colors">
                (484) 416-0134
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Email</p>
              <a href="mailto:careers@aiellorecruiter.com" className="text-white font-medium hover:text-indigo-300 transition-colors break-all">
                careers@aiellorecruiter.com
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Response Time</p>
              <p className="text-sm text-gray-400">Within 24 hours on business days</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
