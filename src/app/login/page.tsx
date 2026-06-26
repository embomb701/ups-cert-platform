'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithGoogle } from '@/lib/firebase/auth';
import { useAuth } from '@/components/auth/AuthProvider';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [signing, setSigning] = useState(false);

  // Returning user: cookie already set by AuthProvider before this effect fires
  useEffect(() => {
    if (!loading && user) router.replace('/training');
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    setSigning(true);
    setError(null);
    try {
      const result = await signInWithGoogle();
      // Get the token and set the cookie synchronously before navigating
      const token = await result.getIdToken();
      document.cookie = `firebase-token=${token}; path=/; max-age=3500; SameSite=Lax`;
      router.replace('/training');
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e?.message ?? 'Sign-in failed. Please try again.');
      setSigning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gray-950 flex-1 border-r border-gray-800">
        <div className="max-w-md">
          <div className="inline-block px-3 py-1 bg-blue-900/40 border border-blue-700 text-blue-300 text-xs font-semibold rounded-full mb-6">
            Career in 6 months · No college required
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            A <span className="text-blue-400">$55K–$100K</span> career the industry is desperate to fill.
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Hospitals, data centers, and military installations run 24/7 on Uninterruptible Power Supplies.
            FSE Academy trains and certifies you to service them — structured 6-month program, no degree required.
          </p>
          <div className="space-y-4">
            {[
              '24-module, 6-month structured training program',
              'Jr. FSE certification exam included at completion',
              '$1,499 total — less than one month of college tuition',
              'Credential recognized by employers in critical power',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-green-400 font-bold text-lg mt-0.5">✓</span>
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col justify-center items-center px-8 flex-1 max-w-lg mx-auto w-full">
        <div className="w-full max-w-sm">
          <Link href="/" className="inline-block mb-8 text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to home
          </Link>

          <h1 className="text-2xl font-bold text-white mb-1">Create your free account</h1>
          <p className="text-gray-400 text-sm mb-8">
            Already have an account? Signing in below will log you in.
          </p>

          <button
            onClick={handleGoogleSignIn}
            disabled={signing}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-60 text-gray-900 font-medium text-sm transition-colors"
          >
            {signing ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {signing ? 'Signing in...' : 'Continue with Google'}
          </button>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-900/30 border border-red-700">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-6 leading-relaxed text-center">
            By continuing you agree to our{' '}
            <Link href="/terms" className="text-blue-400 hover:text-blue-300">Terms</Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>.
          </p>

          <div className="mt-8 p-4 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              After signing in, you will be taken to your training portal where you can enroll in the
              6-Month Training Course or take a Jr. FSE or FSE certification exam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
