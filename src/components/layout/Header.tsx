'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { signOut } from '@/lib/firebase/auth';

const navLinks = [
  { label: 'Training', href: '/training' },
  { label: 'Certifications', href: '/certifications/junior' },
  { label: 'Employers', href: '/employers' },
  { label: 'Book', href: '/book' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800">
      <div className="container-site">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="text-base font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
              FSE Academy
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {!loading && (
              user ? (
                <>
                  <Link href="/training" className="text-sm text-gray-300 hover:text-white transition-colors">
                    My Training
                  </Link>
                  <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <button onClick={() => signOut()} className="text-sm text-gray-500 hover:text-white transition-colors">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Sign In
                  </Link>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  >
                    Get Started Free
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="lg:hidden border-t border-gray-800 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-2 text-sm text-gray-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-800 space-y-2">
              {user ? (
                <>
                  <Link href="/training" onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-sm text-gray-300 hover:text-white">
                    My Training
                  </Link>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-sm text-gray-300 hover:text-white">
                    Dashboard
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="block w-full text-left px-2 py-2 text-sm text-gray-400 hover:text-white">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block mx-2 py-2.5 text-center text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors">
                  Get Started Free
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
