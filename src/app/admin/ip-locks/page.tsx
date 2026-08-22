'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';

interface IpLock {
  id: string;
  email: string;
  examLevel: string;
  userId: string;
  ipHash: string;
  attemptId: string;
  createdAt: string | null;
  cooldownUntil: string | null;
  clearedByAdmin: boolean;
  adminNotes: string;
  clearedAt: string | null;
}

const LEVEL_LABELS: Record<string, string> = {
  jr_fse: 'Jr. FSE',
  jr_kitchen_fse: 'Jr. Kitchen FSE',
  jr_hvac_fse: 'Jr. HVAC FSE',
  jr_gen_fse: 'Jr. Generator FSE',
  jr_dc_cft: 'Jr. Data Center CFT',
  jr_solar_fse: 'Jr. Solar FSE',
  jr_ev_tech: 'Jr. EV Tech',
  jr_dcp_tech: 'Jr. DC Plants Tech',
  jr_battery_tech: 'Jr. Battery Tech',
  jr_dc_engineer: 'Jr. DC Engineer',
  jr_marine_tech: 'Jr. Marine Tech',
  jr_pool_tech: 'Jr. Pool Tech',
  jr_hvac_tech: 'Jr. HVAC Tech',
  jr_solar_inst: 'Jr. Solar Installer',
  jr_wind_tech: 'Jr. Wind Turbine Tech',
  jr_elevator_tech: 'Jr. Elevator Tech',
  jr_fire_alarm_tech: 'Jr. Fire Alarm Tech',
  jr_bmet_tech: 'Jr. BMET Tech',
  jr_bas_tech: 'Jr. BAS Tech',
  jr_ref_tech: 'Jr. Ref Tech',
  jr_plc_tech: 'Jr. PLC Tech',
  jr_security_tech: 'Jr. Security Tech',
  jr_field_pm: 'Jr. Field PM',
  jr_pump_tech: 'Jr. Pump Tech',
  jr_industrial_ref: 'Jr. Industrial Ref',
  jr_dc_ops: 'Jr. DC Ops',
  jr_building_cx: 'Jr. Building Cx',
  jr_telecom_tech: 'Jr. Telecom OSP',
  jr_switchgear_tech: 'Jr. Switchgear Tech',
};

function fmt(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString() + ' ' + new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function isExpired(iso: string | null) {
  if (!iso) return false;
  return new Date(iso) < new Date();
}

function AdminIpLocksContent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [locks, setLocks] = useState<IpLock[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [clearing, setClearing] = useState<string | null>(null);
  const [notesFor, setNotesFor] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/dashboard');
  }, [user, loading, router]);

  const loadLocks = useCallback(async () => {
    setFetching(true);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/ip-locks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLocks(data.locks ?? []);
    } catch {
      setLocks([]);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (user) loadLocks();
  }, [user, loadLocks]);

  async function confirmClear(lockId: string) {
    setClearing(lockId);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/clear-ip-lock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lockId, notes }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('IP lock cleared.');
        setNotesFor(null);
        setNotes('');
        loadLocks();
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

  const visible = locks.filter((l) => showAll || (!l.clearedByAdmin && !isExpired(l.cooldownUntil)));
  const activeCount = locks.filter((l) => !l.clearedByAdmin && !isExpired(l.cooldownUntil)).length;

  return (
    <section className="section-pad">
      <div className="container-site max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 mb-1 block">&larr; Admin Dashboard</Link>
            <h1 className="text-xl font-bold text-white">IP Locks</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {activeCount} active lock{activeCount !== 1 ? 's' : ''} · {locks.length} total
            </p>
          </div>
          <button
            onClick={() => setShowAll((v) => !v)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              showAll ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {showAll ? 'Active Only' : 'Show All'}
          </button>
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
                <th className="text-left py-3 px-4">Exam Level</th>
                <th className="text-left py-3 px-4">Locked</th>
                <th className="text-left py-3 px-4">Cooldown Until</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">Loading…</td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">No active IP locks.</td>
                </tr>
              ) : (
                visible.map((lock) => {
                  const expired = isExpired(lock.cooldownUntil);
                  const active = !lock.clearedByAdmin && !expired;
                  return (
                    <>
                      <tr
                        key={lock.id}
                        className={`border-b border-gray-800/50 ${active ? '' : 'opacity-50'}`}
                      >
                        <td className="py-3 px-4">
                          <p className="text-white text-xs font-medium">{lock.email || '—'}</p>
                          <p className="text-gray-600 text-xs font-mono">{lock.userId.slice(0, 12)}…</p>
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-300">
                          {LEVEL_LABELS[lock.examLevel] ?? lock.examLevel}
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-400">{fmt(lock.createdAt)}</td>
                        <td className="py-3 px-4 text-xs text-gray-400">{fmt(lock.cooldownUntil)}</td>
                        <td className="py-3 px-4">
                          {lock.clearedByAdmin ? (
                            <span className="text-xs text-gray-500">cleared by admin</span>
                          ) : expired ? (
                            <span className="text-xs text-gray-500">expired</span>
                          ) : (
                            <span className="text-xs text-red-400 font-medium">active</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {active && notesFor !== lock.id && (
                            <button
                              onClick={() => { setNotesFor(lock.id); setNotes(''); }}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              Clear Lock
                            </button>
                          )}
                          {lock.clearedByAdmin && lock.adminNotes && (
                            <span className="text-xs text-gray-600 italic">{lock.adminNotes}</span>
                          )}
                        </td>
                      </tr>
                      {notesFor === lock.id && (
                        <tr key={`${lock.id}-clear`} className="bg-gray-900/60">
                          <td colSpan={6} className="px-6 py-3">
                            <div className="flex items-center gap-3 max-w-lg">
                              <input
                                type="text"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Admin notes (optional)"
                                className="flex-1 px-3 py-1.5 text-xs bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-600 focus:outline-none focus:border-indigo-600"
                              />
                              <button
                                onClick={() => confirmClear(lock.id)}
                                disabled={clearing === lock.id}
                                className="px-3 py-1.5 rounded text-xs font-medium bg-red-700 hover:bg-red-600 text-white disabled:opacity-50"
                              >
                                {clearing === lock.id ? 'Clearing…' : 'Confirm Clear'}
                              </button>
                              <button
                                onClick={() => setNotesFor(null)}
                                className="text-xs text-gray-500 hover:text-gray-300"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-600 mt-4">
          Clearing a lock lets the user retake the exam from a different IP immediately. IP hash is one-way and never reversible.
        </p>
      </div>
    </section>
  );
}

export default function AdminIpLocksPage() {
  return (
    <Suspense>
      <AdminIpLocksContent />
    </Suspense>
  );
}
