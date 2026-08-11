'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';

interface AuditLog {
  id: string;
  userId: string | null;
  eventType: string;
  eventDetails: Record<string, unknown>;
  severity: string;
  createdAt: string | null;
  attemptId: string | null;
}

const EVENT_LABELS: Record<string, string> = {
  admin_action: 'Admin Action',
  ip_lock_cleared: 'IP Lock Cleared',
  admin_grant_access: 'Access Granted',
  certificate_generated: 'Certificate Generated',
  certificate_revoked: 'Certificate Revoked',
  questions_imported: 'Questions Imported',
  bulk_questions_imported_from_server: 'Bulk Import (Server)',
  practice_test_made_free: 'Practice Test → Free',
  practice_test_made_paid: 'Practice Test → Paid',
  proctor_unlock: 'Proctor Unlock',
  manual_proctor_order_created: 'Manual Proctor Order',
  suspicious_event: 'Suspicious Event',
  practice_exam_claimed: 'Practice Exam Claimed',
  schedule_request: 'Schedule Request',
};

const SEVERITY_COLORS: Record<string, string> = {
  info: 'text-gray-400 bg-gray-800',
  warning: 'text-yellow-400 bg-yellow-950/40',
  error: 'text-red-400 bg-red-950/40',
  critical: 'text-red-300 bg-red-900/60 font-semibold',
};

const SEVERITIES = ['all', 'info', 'warning', 'error', 'critical'];

function fmt(iso: string | null) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function detailSummary(log: AuditLog): string {
  const d = log.eventDetails;
  if (!d || Object.keys(d).length === 0) return '';
  if (log.eventType === 'admin_action' && d.action) return `action: ${d.action}`;
  if (log.eventType === 'admin_grant_access') return `→ ${d.targetEmail ?? ''} / ${d.accessKey ?? ''}`;
  if (log.eventType === 'certificate_generated') return `${d.examLevel ?? ''} · ${d.score ?? ''}%`;
  if (log.eventType === 'certificate_revoked') return `reason: ${d.reason ?? ''}`;
  if (log.eventType === 'questions_imported') return `${d.created ?? 0} created, ${d.updated ?? 0} updated`;
  if (log.eventType === 'bulk_questions_imported_from_server') return `${d.totalCreated ?? 0} created`;
  if (log.eventType === 'ip_lock_cleared') return d.notes ? `notes: ${d.notes}` : '';
  return Object.entries(d).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(' · ');
}

function AdminAuditContent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [fetching, setFetching] = useState(true);
  const [severity, setSeverity] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/dashboard');
  }, [user, loading, router]);

  const loadLogs = useCallback(async () => {
    setFetching(true);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/audit', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLogs(data.logs ?? []);
    } catch {
      setLogs([]);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (user) loadLogs();
  }, [user, loadLogs]);

  if (loading) return null;

  const visible = severity === 'all' ? logs : logs.filter((l) => l.severity === severity);

  return (
    <section className="section-pad">
      <div className="container-site max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 mb-1 block">&larr; Admin Dashboard</Link>
            <h1 className="text-xl font-bold text-white">Audit Logs</h1>
            <p className="text-xs text-gray-500 mt-0.5">Last 200 entries, newest first.</p>
          </div>
          <div className="flex gap-1.5">
            {SEVERITIES.map((s) => (
              <button
                key={s}
                onClick={() => setSeverity(s)}
                className={`px-3 py-1.5 rounded text-xs font-medium capitalize transition-colors ${
                  severity === s ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="card-dark overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-gray-500 uppercase">
                <th className="text-left py-3 px-4">Time</th>
                <th className="text-left py-3 px-4">Event</th>
                <th className="text-left py-3 px-4">Severity</th>
                <th className="text-left py-3 px-4">Actor (UID)</th>
                <th className="text-left py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">Loading…</td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">No log entries found.</td>
                </tr>
              ) : (
                visible.map((log) => (
                  <>
                    <tr
                      key={log.id}
                      onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                      className="border-b border-gray-800/50 hover:bg-gray-800/20 cursor-pointer"
                    >
                      <td className="py-2.5 px-4 text-xs text-gray-400 whitespace-nowrap">{fmt(log.createdAt)}</td>
                      <td className="py-2.5 px-4 text-xs text-gray-200 font-medium">
                        {EVENT_LABELS[log.eventType] ?? log.eventType.replace(/_/g, ' ')}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded ${SEVERITY_COLORS[log.severity] ?? 'text-gray-400 bg-gray-800'}`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-xs text-gray-500 font-mono">
                        {log.userId ? log.userId.slice(0, 12) + '…' : '—'}
                      </td>
                      <td className="py-2.5 px-4 text-xs text-gray-400 max-w-xs truncate">
                        {detailSummary(log)}
                      </td>
                    </tr>
                    {expandedId === log.id && (
                      <tr key={`${log.id}-detail`} className="bg-gray-900/60">
                        <td colSpan={5} className="px-6 py-3">
                          <div className="space-y-1">
                            {log.userId && (
                              <p className="text-xs text-gray-400">
                                <span className="text-gray-600">Actor UID:</span>{' '}
                                <span className="font-mono">{log.userId}</span>
                              </p>
                            )}
                            {log.attemptId && (
                              <p className="text-xs text-gray-400">
                                <span className="text-gray-600">Attempt ID:</span>{' '}
                                <span className="font-mono">{log.attemptId}</span>
                              </p>
                            )}
                            <p className="text-xs text-gray-600 uppercase tracking-wide mt-2 mb-1">Event Details</p>
                            <pre className="text-xs text-gray-300 bg-gray-950 rounded p-3 overflow-x-auto">
                              {JSON.stringify(log.eventDetails, null, 2)}
                            </pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default function AdminAuditPage() {
  return (
    <Suspense>
      <AdminAuditContent />
    </Suspense>
  );
}
