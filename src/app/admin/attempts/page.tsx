'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';

interface Attempt {
  id: string;
  userId: string;
  email: string;
  displayName: string;
  examLevel: string;
  status: string;
  score: number | null;
  passed: boolean | null;
  passingScore: number;
  flaggedForReview: boolean;
  suspiciousRiskLevel: string;
  startedAt: string | null;
  completedAt: string | null;
  cooldownUntil: string | null;
  certificateId: string | null;
}

const LEVEL_LABELS: Record<string, string> = {
  jr_fse: 'Jr. FSE',
  fse_ai: 'FSE AI',
  fse: 'FSE',
};

const STATUS_COLORS: Record<string, string> = {
  in_progress: 'text-yellow-400',
  completed: 'text-green-400',
  abandoned: 'text-gray-400',
  timed_out: 'text-orange-400',
  invalidated: 'text-red-400',
};

export default function AdminAttemptsPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get('level') ?? 'jr_fse';

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [fetching, setFetching] = useState(true);
  const [clearing, setClearing] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) router.replace('/dashboard');
  }, [user, profile, loading, router]);

  async function loadAttempts() {
    setFetching(true);
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/admin/attempts?level=${level}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAttempts(data.attempts ?? []);
    } catch {
      setAttempts([]);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    if (user && profile?.role === 'admin') loadAttempts();
  }, [user, profile, level]);

  async function clearCooldown(userId: string, examLevel: string, attemptId: string) {
    if (!confirm(`Clear ALL ${examLevel} attempts and IP locks for this user? This lets them retake the exam immediately.`)) return;
    setClearing(attemptId);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/clear-cooldown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ uid: userId, examLevel }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Cleared ${data.deleted} record(s). User can now retake the exam.`);
        loadAttempts();
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage('Request failed.');
    } finally {
      setClearing(null);
    }
  }

  if (loading) return null;

  return (
    <section className="section-pad">
      <div className="container-site max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 mb-1 block">&larr; Admin Dashboard</Link>
            <h1 className="text-xl font-bold text-white">Exam Attempts</h1>
          </div>
          <div className="flex gap-2">
            {['jr_fse', 'fse_ai', 'fse'].map((l) => (
              <Link
                key={l}
                href={`/admin/attempts?level=${l}`}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  level === l
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {LEVEL_LABELS[l]}
              </Link>
            ))}
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded bg-indigo-950/50 border border-indigo-800 text-sm text-indigo-300">
            {message}
            <button onClick={() => setMessage(null)} className="ml-3 text-gray-500 hover:text-white">✕</button>
          </div>
        )}

        <div className="card-dark overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-gray-500 uppercase">
                <th className="text-left py-3 px-4">User</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Score</th>
                <th className="text-left py-3 px-4">Risk</th>
                <th className="text-left py-3 px-4">Started</th>
                <th className="text-left py-3 px-4">Cooldown Until</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 text-sm">Loading…</td>
                </tr>
              ) : attempts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 text-sm">No attempts found.</td>
                </tr>
              ) : (
                attempts.map((a) => (
                  <tr key={a.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="py-3 px-4">
                      <p className="text-white text-xs font-medium">{a.email}</p>
                      {a.displayName && <p className="text-gray-500 text-xs">{a.displayName}</p>}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium ${STATUS_COLORS[a.status] ?? 'text-gray-400'}`}>
                        {a.status.replace('_', ' ')}
                      </span>
                      {a.flaggedForReview && (
                        <span className="ml-2 text-xs text-red-400 bg-red-950/50 border border-red-800 px-1.5 py-0.5 rounded">
                          flagged
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {a.score !== null ? (
                        <span className={a.passed ? 'text-green-400' : 'text-red-400'}>
                          {Math.round(a.score)}% {a.passed ? '✓' : '✗'}
                        </span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs ${
                        a.suspiciousRiskLevel === 'critical' ? 'text-red-400' :
                        a.suspiciousRiskLevel === 'high' ? 'text-orange-400' :
                        a.suspiciousRiskLevel === 'medium' ? 'text-yellow-400' :
                        'text-gray-500'
                      }`}>
                        {a.suspiciousRiskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">
                      {a.startedAt ? new Date(a.startedAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">
                      {a.cooldownUntil ? new Date(a.cooldownUntil).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {a.certificateId && (
                          <Link
                            href={`/admin/certificates`}
                            className="text-xs text-indigo-400 hover:text-indigo-300"
                          >
                            Cert
                          </Link>
                        )}
                        <button
                          onClick={() => clearCooldown(a.userId, a.examLevel, a.id)}
                          disabled={clearing === a.id}
                          className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
                        >
                          {clearing === a.id ? 'Clearing…' : 'Clear & Reset'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-600 mt-4">
          "Clear & Reset" deletes all attempts and IP locks for that user + exam level, allowing an immediate retake.
        </p>
      </div>
    </section>
  );
}
