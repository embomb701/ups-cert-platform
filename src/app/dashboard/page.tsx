'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';

const cards = [
  {
    badge: 'badge-jr',
    badgeLabel: 'Jr. FSE Exam',
    title: 'Junior UPS Field Service Certification',
    rows: ['Purchase status', 'Exam status', 'Last attempt', 'Cooldown', 'Certificate'],
    buyHref: '/certifications/junior',
    buyLabel: 'Purchase Jr. FSE Exam — $200',
    rulesHref: '/exam/rules/jr_fse',
    rulesLabel: 'Already purchased? Review rules & begin',
    accent: 'text-arc-300 hover:text-arc-200',
  },
  {
    badge: 'badge-ai',
    badgeLabel: 'FSE AI Exam',
    title: 'FSE AI Proctored Certification',
    rows: ['Purchase status', 'Exam status', 'Last attempt', 'Certificate'],
    buyHref: '/certifications/ai-proctored',
    buyLabel: 'Purchase FSE AI Exam — $349',
    rulesHref: '/exam/rules/fse_ai',
    rulesLabel: 'Already purchased? Review rules & begin',
    accent: 'text-fuchsia-300 hover:text-fuchsia-200',
  },
  {
    badge: 'badge-fse',
    badgeLabel: 'FSE Exam — Proctored',
    title: 'UPS Field Service Certification',
    rows: ['Purchase status', 'Scheduling status', 'Proctor assigned', 'Exam status', 'Certificate'],
    buyHref: '/certifications/proctored',
    buyLabel: 'Purchase FSE Exam — $500',
    rulesHref: '/exam/rules/fse',
    rulesLabel: 'Session unlocked? Review rules & begin',
    accent: 'text-voltage-300 hover:text-voltage-200',
  },
];

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-voltage-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <section className="section-pad">
      <div className="container-site mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="kicker mb-2">Your Workspace</p>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-400">
            Signed in as <span className="font-mono text-gray-200">{user.email}</span>
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="card-dark flex flex-col p-6">
              <span className={`${c.badge} mb-3 w-fit`}>{c.badgeLabel}</span>
              <h2 className="mb-5 text-base font-semibold text-white">{c.title}</h2>

              {/* Placeholder — real data comes from Firestore purchase/attempt queries */}
              <div className="mb-6 space-y-2.5 text-sm">
                {c.rows.map((row) => (
                  <div key={row} className="flex justify-between border-b border-white/5 pb-2 text-gray-400">
                    <span>{row}</span>
                    <span className="text-gray-300">—</span>
                  </div>
                ))}
              </div>

              <Link href={c.buyHref} className="btn-voltage mt-auto w-full">
                {c.buyLabel}
              </Link>
              <Link href={c.rulesHref} className={`mt-3 block text-center text-xs ${c.accent}`}>
                {c.rulesLabel} &rarr;
              </Link>
            </div>
          ))}
        </div>

        <div className="mb-6 card-dark p-6">
          <h2 className="mb-4 text-base font-semibold text-white">Attempt History</h2>
          <p className="text-sm text-gray-500">No attempts on record.</p>
        </div>

        <div className="card-dark p-6">
          <h2 className="mb-4 text-base font-semibold text-white">Certificates</h2>
          <p className="text-sm text-gray-500">No certificates issued yet.</p>
        </div>

        {profile?.role === 'admin' && (
          <div className="mt-6 text-center">
            <Link href="/admin" className="text-sm font-medium text-voltage-400 hover:text-voltage-300">
              Admin Dashboard &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
