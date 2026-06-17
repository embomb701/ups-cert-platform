import type { Metadata } from 'next';
import VerifyForm from './VerifyForm';

export const metadata: Metadata = { title: 'Verify a Certificate' };

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
