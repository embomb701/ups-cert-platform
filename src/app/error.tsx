'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section-pad">
      <div className="container-site max-w-lg mx-auto text-center">
        <p className="text-5xl font-black text-gray-800 mb-4">500</p>
        <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-gray-400 text-sm mb-8">
          An unexpected error occurred. Please try again, or contact us if the problem persists.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            Go home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-gray-700 font-mono">Error ID: {error.digest}</p>
        )}
      </div>
    </section>
  );
}
