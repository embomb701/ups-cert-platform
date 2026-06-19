'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { formatDate, cooldownDaysRemaining } from '@/lib/utils/formatters';

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-sm text-gray-400">
            Signed in as <span className="text-gray-200">{user.email}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Jr FSE Card */}
          <div className="card-dark p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="badge-jr text-xs mb-1 block w-fit">Jr. FSE Exam</span>
                <h2 className="text-base font-semibold text-white">Junior UPS Field Service Certification</h2>
              </div>
            </div>
            {/* Placeholder — real data comes from Firestore purchase/attempt queries */}
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Purchase status</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Exam status</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Last attempt</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Cooldown</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Certificate</span>
                <span className="text-gray-300">—</span>
              </div>
            </div>
            <Link
              href="/certifications/junior"
              className="block w-full text-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              Purchase Jr. FSE Exam — $200
            </Link>
          </div>

          {/* FSE AI Card */}
          <div className="card-dark p-6 border-purple-900/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-950/50 border border-purple-800/50 px-2 py-0.5 rounded mb-1">FSE AI Exam</span>
                <h2 className="text-base font-semibold text-white">FSE AI Proctored Certification</h2>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Purchase status</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Exam status</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Last attempt</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Certificate</span>
                <span className="text-gray-300">—</span>
              </div>
            </div>
            <Link
              href="/certifications/ai-proctored"
              className="block w-full text-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors"
            >
              Purchase FSE AI Exam — $349
            </Link>
          </div>

          {/* FSE Card */}
          <div className="card-dark p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="badge-fse text-xs mb-1 block w-fit">FSE Exam — Proctored</span>
                <h2 className="text-base font-semibold text-white">UPS Field Service Certification</h2>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Purchase status</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Scheduling status</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Proctor assigned</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Exam status</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Certificate</span>
                <span className="text-gray-300">—</span>
              </div>
            </div>
            <Link
              href="/certifications/proctored"
              className="block w-full text-center px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
            >
              Purchase FSE Exam — $500
            </Link>
          </div>
        </div>

        {/* Attempt History placeholder */}
        <div className="card-dark p-6 mb-6">
          <h2 className="text-base font-semibold text-white mb-4">Attempt History</h2>
          <p className="text-sm text-gray-500">No attempts on record.</p>
        </div>

        {/* Certificates placeholder */}
        <div className="card-dark p-6">
          <h2 className="text-base font-semibold text-white mb-4">Certificates</h2>
          <p className="text-sm text-gray-500">No certificates issued yet.</p>
        </div>

        {profile?.role === 'admin' && (
          <div className="mt-6 text-center">
            <Link href="/admin" className="text-sm text-indigo-400 hover:text-indigo-300">
              Admin Dashboard &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
