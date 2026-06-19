import type { Metadata } from 'next';
import VerifyForm from './VerifyForm';

export const metadata: Metadata = { title: 'Verify a Certificate' };

export default function VerifyLandingPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="kicker mb-4 justify-center">
            <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-voltage-400" />
            Credential Lookup
          </p>
          <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-voltage-500/30 bg-voltage-500/10">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-4z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-white mb-3">
            Verify a Certificate
          </h1>
          <p className="text-gray-400 text-sm">
            Enter a certificate number to verify its status, candidate name, and certification level.
          </p>
        </div>
        <div className="panel p-8">
          <VerifyForm />
        </div>
      </div>
    </section>
  );
}
