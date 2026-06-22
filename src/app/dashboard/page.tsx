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
  const [fseOrderStatus, setFseOrderStatus] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // FSE scheduling request form
  const [schedName, setSchedName] = useState('');
  const [schedPhone, setSchedPhone] = useState('');
  const [schedEmail, setSchedEmail] = useState('');
  const [schedSubmitting, setSchedSubmitting] = useState(false);
  const [schedDone, setSchedDone] = useState(false);
  const [schedError, setSchedError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      try {
        const token = await getIdToken();
        const [accessRes, attemptsRes, adminRes] = await Promise.all([
          fetch('/api/user/access', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/user/attempts', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/user/is-admin', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const accessData = await accessRes.json();
        setJrAccess(accessData.jr_fse === true);
        setAiAccess(accessData.fse_ai === true);
        setFseOrderStatus(accessData.fse_proctored ?? null);
        // Pre-fill scheduling form with known info
        setSchedName(user.displayName ?? '');
        setSchedEmail(user.email ?? '');
        if (attemptsRes.ok) {
          const attemptsData = await attemptsRes.json();
          setAttempts(attemptsData.attempts ?? []);
        }
        const adminData = await adminRes.json();
        setIsAdmin(adminData.isAdmin === true);
      } catch {
        // silently fail — show not purchased / no attempts
      } finally {
        setDataLoading(false);
      }
    }
    load();
  }, [user]);

  async function handleScheduleRequest(e: React.FormEvent) {
    e.preventDefault();
    setSchedSubmitting(true);
    setSchedError('');
    try {
      const token = await getIdToken();
      const res = await fetch('/api/notify/schedule-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: schedName, phone: schedPhone, email: schedEmail }),
      });
      const data = await res.json();
      if (data.ok) {
        setSchedDone(true);
      } else {
        setSchedError(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setSchedError('Request failed. Please try again.');
    }
    setSchedSubmitting(false);
  }

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
                <span className={fseOrderStatus ? 'text-green-400' : 'text-gray-300'}>
                  {dataLoading ? '…' : fseOrderStatus ? 'Purchased' : 'Not purchased'}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Scheduling status</span>
                <span className={
                  fseOrderStatus === 'ready' ? 'text-green-400'
                  : fseOrderStatus ? 'text-amber-400'
                  : 'text-gray-300'
                }>
                  {dataLoading ? '…'
                    : fseOrderStatus === 'ready' ? 'Ready — start when proctor confirms'
                    : fseOrderStatus === 'scheduling_pending' || fseOrderStatus === 'awaiting_contact' ? 'Schedule your session below'
                    : fseOrderStatus ? fseOrderStatus.replace(/_/g, ' ')
                    : '—'}
                </span>
              </div>
            </div>
            {fseOrderStatus === 'ready' ? (
              <Link href="/exam/rules/fse" className="block w-full text-center px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium transition-colors">
                Start FSE Exam
              </Link>
            ) : fseOrderStatus ? (
              schedDone ? (
                <div className="rounded-lg bg-green-950/40 border border-green-800/40 px-4 py-3 text-xs text-green-400">
                  Request received! We'll contact you at <span className="font-semibold">{schedPhone}</span> to schedule your exam session.
                </div>
              ) : (
                <form onSubmit={handleScheduleRequest} className="space-y-2">
                  <p className="text-xs text-gray-500 mb-3">Submit your contact info and we'll reach out to schedule your proctored session.</p>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={schedName}
                    onChange={(e) => setSchedName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-amber-600"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number *"
                    value={schedPhone}
                    onChange={(e) => setSchedPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-amber-600"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={schedEmail}
                    onChange={(e) => setSchedEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-amber-600"
                  />
                  {schedError && <p className="text-xs text-red-400">{schedError}</p>}
                  <button
                    type="submit"
                    disabled={schedSubmitting}
                    className="w-full px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-medium transition-colors"
                  >
                    {schedSubmitting ? 'Sending…' : 'Request Scheduling Contact'}
                  </button>
                </form>
              )
            ) : (
              <Link href="/certifications/proctored" className="block w-full text-center px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium transition-colors">
                Purchase FSE Exam — $500
              </Link>
            )}
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
                    {a.passed === true ? `Passed (${Math.round(a.score ?? 0)}%)` : a.passed === false ? `Failed (${Math.round(a.score ?? 0)}%)` : 'In progress'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {isAdmin && (
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
