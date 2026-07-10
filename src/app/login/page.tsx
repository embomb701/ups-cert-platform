'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
  authErrorMessage,
  type User,
} from '@/lib/firebase/auth';
import { useAuth } from '@/components/auth/AuthProvider';

type Mode = 'signin' | 'signup' | 'reset';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Returning user: cookie already set by AuthProvider before this effect fires
  useEffect(() => {
    if (!loading && user) router.replace('/training');
  }, [user, loading, router]);

  const finishLogin = async (u: User) => {
    // Get the token and set the cookie synchronously before navigating
    const token = await u.getIdToken();
    document.cookie = `firebase-token=${token}; path=/; max-age=3500; SameSite=Lax`;
    router.replace('/training');
  };

  const handleGoogle = async () => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await finishLogin(await signInWithGoogle());
    } catch (err) {
      setError(authErrorMessage(err));
      setBusy(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === 'reset') {
        await resetPassword(email);
        setNotice('Password reset email sent. Check your inbox (and spam folder).');
        setBusy(false);
        return;
      }
      const u =
        mode === 'signup'
          ? await signUpWithEmail(name, email, password)
          : await signInWithEmail(email, password);
      await finishLogin(u);
    } catch (err) {
      setError(authErrorMessage(err));
      setBusy(false);
    }
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setNotice(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors';

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center px-16 flex-1 border-r border-gray-800 bg-gradient-to-br from-blue-950/40 via-gray-950 to-gray-950">
        <div className="max-w-md">
          <div className="inline-block px-3 py-1 bg-blue-900/40 border border-blue-700 text-blue-300 text-xs font-semibold rounded-full mb-6">
            Career in 3–6 months · No college required
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            A <span className="text-gradient">$55K–$100K</span> career the industry is desperate to fill.
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Hospitals, data centers, and military installations run 24/7 on Uninterruptible Power Supplies.
            The Mastering Field Service Training Portal trains and certifies you to service them — structured
            self-paced program, no degree required.
          </p>
          <div className="space-y-4">
            {[
              '28-module structured training, done in 3–6 months',
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
      <div className="flex flex-col justify-center items-center px-8 py-12 flex-1 max-w-lg mx-auto w-full">
        <div className="w-full max-w-sm">
          <Link href="/" className="inline-block mb-8 text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to home
          </Link>

          <h1 className="text-2xl font-bold text-white mb-1">
            {mode === 'signup' && 'Create your free account'}
            {mode === 'signin' && 'Welcome back'}
            {mode === 'reset' && 'Reset your password'}
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            {mode === 'signup' && (
              <>Already have an account?{' '}
                <button onClick={() => switchMode('signin')} className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign in
                </button>
              </>
            )}
            {mode === 'signin' && (
              <>New here?{' '}
                <button onClick={() => switchMode('signup')} className="text-blue-400 hover:text-blue-300 font-medium">
                  Create a free account
                </button>
              </>
            )}
            {mode === 'reset' && 'Enter your email and we will send you a reset link.'}
          </p>

          {mode !== 'reset' && (
            <>
              <button
                onClick={handleGoogle}
                disabled={busy}
                className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-60 text-gray-900 font-medium text-sm transition-colors"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-800" />
                <span className="text-xs text-gray-500 uppercase tracking-wider">or use email</span>
                <div className="flex-1 h-px bg-gray-800" />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name (appears on your certificate)"
                autoComplete="name"
                className={inputClass}
              />
            )}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              autoComplete="email"
              className={inputClass}
            />
            {mode !== 'reset' && (
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'Password (6+ characters)' : 'Password'}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                className={inputClass}
              />
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {busy && <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />}
              {mode === 'signup' && (busy ? 'Creating account...' : 'Create free account')}
              {mode === 'signin' && (busy ? 'Signing in...' : 'Sign in')}
              {mode === 'reset' && (busy ? 'Sending...' : 'Send reset link')}
            </button>
          </form>

          <div className="mt-4 text-center">
            {mode === 'signin' && (
              <button onClick={() => switchMode('reset')} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Forgot your password?
              </button>
            )}
            {mode === 'reset' && (
              <button onClick={() => switchMode('signin')} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                ← Back to sign in
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-900/30 border border-red-700">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}
          {notice && (
            <div className="mt-4 p-3 rounded-lg bg-green-900/30 border border-green-700">
              <p className="text-xs text-green-400">{notice}</p>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-6 leading-relaxed text-center">
            By continuing you agree to our{' '}
            <Link href="/terms" className="text-blue-400 hover:text-blue-300">Terms</Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
