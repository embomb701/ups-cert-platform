import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-lg mx-auto text-center">
        <p className="text-7xl font-black text-gray-800 mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-gray-400 text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/courses"
            className="px-5 py-2.5 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            Browse courses
          </Link>
        </div>
      </div>
    </section>
  );
}
