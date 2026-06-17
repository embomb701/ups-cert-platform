import type { Metadata } from 'next';

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
          <form action="" method="get" onSubmit={(e) => {
            e.preventDefault();
            const val = (document.getElementById('cert-number') as HTMLInputElement)?.value?.trim();
            if (val) window.location.href = `/verify/${encodeURIComponent(val)}`;
          }}>
            <label htmlFor="cert-number" className="block text-sm text-gray-400 mb-2">
              Certificate Number
            </label>
            <input
              id="cert-number"
              type="text"
              placeholder="e.g. JR-2025-A1B2C3"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 mb-4 font-mono"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
            >
              Verify Certificate
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
