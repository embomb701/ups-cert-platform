import Link from 'next/link';

export const metadata = { title: 'Offline', robots: { index: false } };

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-sm text-center">
        <div className="text-4xl mb-4">📡</div>
        <h1 className="text-xl font-bold text-white mb-2">You&apos;re offline</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          No connection right now. Pages you&apos;ve already opened — including training modules —
          stay available offline. New pages will load once you&apos;re back online.
        </p>
        <Link href="/training" className="inline-block px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors">
          Go to Training Portal
        </Link>
      </div>
    </div>
  );
}
