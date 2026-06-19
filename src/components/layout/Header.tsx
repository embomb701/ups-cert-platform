'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { signOut } from '@/lib/firebase/auth';

const navLinks = [
  { label: 'Book', href: '/book' },
  { label: 'Jr. FSE', href: '/certifications/junior' },
  { label: 'FSE AI', href: '/certifications/ai-proctored' },
  { label: 'FSE', href: '/certifications/proctored' },
  { label: 'Employers', href: '/employers' },
  { label: 'Training', href: '/training' },
  { label: 'About', href: '/about' },
];

function BoltMark() {
  return (
    <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-voltage-gradient shadow-voltage">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-carbon-950" fill="currentColor" aria-hidden>
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
      </svg>
    </span>
  );
}

export function Header() {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-carbon-950/85 backdrop-blur-md">
      <div className="container-site">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <Link href="/" className="group flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <BoltMark />
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold uppercase tracking-wide text-white">
                Mastering <span className="text-voltage-400">FSE</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
                UPS Field Service
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth / Dashboard */}
          <div className="hidden items-center gap-3 lg:flex">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                      Dashboard
                    </Link>
                    <button onClick={() => signOut()} className="text-sm text-gray-500 transition-colors hover:text-white">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="btn-voltage">
                    Sign In
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="p-2 text-gray-400 hover:text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="space-y-1 border-t border-white/10 py-4 lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-white/10 pt-3">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                    Dashboard
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-500 hover:bg-white/5 hover:text-white">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-semibold text-voltage-400 hover:text-voltage-300">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
