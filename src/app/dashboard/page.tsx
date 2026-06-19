'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';

interface Attempt { id: string; examLevel: string; score?: number; passed?: boolean; completedAt?: any; }

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  const [jrAccess, setJrAccess] = useState(false);
  const [aiAccess, setAiAccess] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      try {
        const token = await getIdToken();
        const res = await fetch('/api/user/access', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setJrAccess(data.jr_fse === true);
        setAiAccess(data.fse_ai === true);
      } catch {
        // silently fail — show not purchased
      } finally {
        setDataLoading(false);
      }
    }
    load();
  }, [user]);

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
            <span className="badge-jr text-xs mb-1 block w-fit">Jr. FSE Exam</span>
            <h2 className="text-base font-semibold text-white mb-4">Junior UPS FSE Certification</h2>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Purchase status</span>
                <span className={jrAccess ? 'text-green-400' : 'text-gray-300'}>
                  {dataLoading ? '…' : jrAccess ? 'Purchased' : 'Not purchased'}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Exam access</span>
                <span className={jrAccess ? 'text-green-400' : 'text-gray-300'}>
                  {dataLoading ? '…' : jrAccess ? 'Unlocked' : '—'}
                </span>
              </div>
            </div>
            {jrAccess ? (
              <Link href="/exam/rules/jr_fse" className="block w-full text-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
                Start Jr. FSE Exam
              </Link>
            ) : (
              <Link href="/certifications/junior" className="block w-full text-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
                Purchase Jr. FSE Exam — $200
              </Link>
            )}
          </div>

          {/* FSE AI Card */}
          <div className="card-dark p-6 border-purple-900/50">
            <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-950/50 border border-purple-800/50 px-2 py-0.5 rounded mb-1">FSE AI Exam</span>
            <h2 className="text-base font-semibold text-white mb-4">FSE AI Proctored Certification</h2>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Purchase status</span>
                <span className={aiAccess ? 'text-green-400' : 'text-gray-300'}>
                  {dataLoading ? '…' : aiAccess ? 'Purchased' : 'Not purchased'}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Exam access</span>
                <span className={aiAccess ? 'text-green-400' : 'text-gray-300'}>
                  {dataLoading ? '…' : aiAccess ? 'Unlocked' : '—'}
                </span>
              </div>
            </div>
            {aiAccess ? (
              <Link href="/exam/rules/fse_ai" className="block w-full text-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
                Start FSE AI Exam
              </Link>
            ) : (
              <Link href="/certifications/ai-proctored" className="block w-full text-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
                Purchase FSE AI Exam — $349
              </Link>
            )}
          </div>

          {/* FSE Human Card */}
          <div className="card-dark p-6">
            <span className="badge-fse text-xs mb-1 block w-fit">FSE Exam</span>
            <h2 className="text-base font-semibold text-white mb-4">UPS FSE Human Proctored</h2>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Purchase status</span>
                <span className="text-gray-300">—</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Scheduling status</span>
                <span className="text-gray-300">—</span>
              </div>
            </div>
            <Link href="/certifications/proctored" className="block w-full text-center px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium transition-colors">
              Purchase FSE Exam — $500
            </Link>
          </div>
        </div>

        {/* Attempt History */}
        <div className="card-dark p-6 mb-6">
          <h2 className="text-base font-semibold text-white mb-4">Attempt History</h2>
          {dataLoading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : attempts.length === 0 ? (
            <p className="text-sm text-gray-500">No attempts on record.</p>
          ) : (
            <div className="space-y-2">
              {attempts.map(a => (
                <div key={a.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-800 last:border-0">
                  <span className="text-gray-400">{a.examLevel === 'jr_fse' ? 'Jr. FSE' : a.examLevel === 'fse_ai' ? 'FSE AI' : 'FSE'}</span>
                  <span className={a.passed ? 'text-green-400' : a.passed === false ? 'text-red-400' : 'text-gray-400'}>
                    {a.passed === true ? `Passed (${a.score}%)` : a.passed === false ? `Failed (${a.score}%)` : 'In progress'}
                  </span>
                </div>
              ))}
            </div>
          )}
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
