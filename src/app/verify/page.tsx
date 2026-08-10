import type { Metadata } from 'next';
import VerifyForm from './VerifyForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masteringfse.com';

export const metadata: Metadata = {
  title: 'Verify a Certificate — Mastering Field Service',
  description:
    'Instantly verify any Mastering Field Service certificate. Enter the certificate number to confirm the candidate name, certification level, and current status.',
  openGraph: {
    title: 'Certificate Verification — Mastering Field Service',
    description: 'Verify any FSE or Jr. FSE certificate by number. Public, instant, and free.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Verify a Certificate' }],
  },
  twitter: { card: 'summary_large_image', images: [`${SITE_URL}/api/og`] },
};

export default function VerifyLandingPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">Verify a Certificate</h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          Enter a certificate number to verify its status, candidate name, and certification level.
        </p>
        <div className="card-dark p-8">
          <VerifyForm />
        </div>
      </div>
    </section>
  );
}
