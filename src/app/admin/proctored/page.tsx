'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getIdToken } from '@/lib/firebase/auth';

interface ProctoredOrder {
  id: string;
  userId: string;
  email: string;
  status: string;
  adminNotes?: string;
  proctorName?: string;
  meetingLink?: string;
  createdAt?: string;
  manuallyCreated?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  scheduling_pending: 'text-amber-400',
  awaiting_contact: 'text-amber-400',
  scheduled: 'text-blue-400',
  proctor_assigned: 'text-blue-400',
  ready: 'text-green-400',
  in_progress: 'text-green-400',
  completed: 'text-gray-400',
  passed: 'text-green-400',
  failed: 'text-red-400',
  certificate_issued: 'text-indigo-400',
};

export default function AdminProctoredPage() {
  const [orders, setOrders] = useState<ProctoredOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newUid, setNewUid] = useState('');
  const [createMsg, setCreateMsg] = useState('');
  const [unlocking, setUnlocking] = useState<string | null>(null);

  async function loadOrders() {
    setLoading(true);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/proctored-orders', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch {}
    setLoading(false);
  }

  useEffect(() => { loadOrders(); }, []);

  async function handleCreate() {
    if (!newEmail || !newUid) { setCreateMsg('Both UID and email are required'); return; }
    setCreating(true);
    setCreateMsg('');
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/proctored-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: newUid, email: newEmail }),
      });
      const data = await res.json();
      if (data.ok) {
        setCreateMsg(`Order created: ${data.orderId}`);
        setNewEmail('');
        setNewUid('');
        await loadOrders();
      } else {
        setCreateMsg(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setCreateMsg(`Error: ${e.message}`);
    }
    setCreating(false);
  }

  async function handleUnlock(orderId: string) {
    setUnlocking(orderId);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/proctor-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderId, proctorName: 'Approved organization representative' }),
      });
      const data = await res.json();
      if (data.ok) await loadOrders();
      else alert(`Unlock failed: ${data.error}`);
    } catch (e: any) {
      alert(`Unlock failed: ${e}`);
    }
    setUnlocking(null);
  }

  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-white">&larr; Admin</Link>
          <h1 className="text-xl font-bold text-white">Proctored FSE Orders</h1>
        </div>

        {/* Manual order creation */}
        <div className="card-dark p-6 mb-6">
          <h2 className="text-sm font-semibold text-white mb-1">Manual Order Creation</h2>
          <p className="text-xs text-gray-500 mb-4">
            Use this if a candidate purchased but the Stripe webhook did not create an order record.
            Get the user UID from Firebase Console → Authentication.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="User UID (from Firebase Auth)"
              value={newUid}
              onChange={(e) => setNewUid(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="email"
              placeholder="User email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-medium transition-colors"
          >
            {creating ? 'Creating…' : 'Create Order'}
          </button>
          {createMsg && <p className="text-xs mt-2 text-indigo-400">{createMsg}</p>}
        </div>

        {/* Orders list */}
        <div className="card-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">All Proctored Orders ({orders.length})</h2>
            <button onClick={loadOrders} className="text-xs text-gray-500 hover:text-white">Refresh</button>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-gray-500">No proctored orders found.</p>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="border border-gray-800 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm text-white font-medium truncate">{o.email}</p>
                      <p className="text-xs text-gray-500 font-mono">{o.userId}</p>
                      <p className="text-xs text-gray-600 mt-0.5">Order: {o.id}</p>
                      {o.createdAt && <p className="text-xs text-gray-600">{new Date(o.createdAt).toLocaleString()}</p>}
                      {o.manuallyCreated && <span className="text-xs text-amber-500">Manually created</span>}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs font-semibold ${STATUS_COLORS[o.status] ?? 'text-gray-400'}`}>
                        {o.status.replace(/_/g, ' ')}
                      </span>
                      {o.status !== 'ready' && o.status !== 'completed' && o.status !== 'passed' && o.status !== 'failed' && o.status !== 'certificate_issued' && (
                        <button
                          onClick={() => handleUnlock(o.id)}
                          disabled={unlocking === o.id}
                          className="px-3 py-1 rounded bg-green-800 hover:bg-green-700 disabled:opacity-50 text-white text-xs font-medium transition-colors"
                        >
                          {unlocking === o.id ? 'Unlocking…' : 'Unlock Exam'}
                        </button>
                      )}
                    </div>
                  </div>
                  {o.adminNotes && <p className="text-xs text-gray-500 mt-2 italic">{o.adminNotes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Workflow */}
        <div className="card-dark p-5 mt-6 bg-amber-950/20 border-amber-900/40">
          <p className="text-xs text-amber-300 font-semibold mb-2">FSE Exam Workflow</p>
          <ol className="space-y-1 text-xs text-gray-400">
            <li>1. <strong className="text-gray-300">scheduling_pending</strong> — Candidate paid. Contact them to schedule.</li>
            <li>2. <strong className="text-gray-300">ready</strong> — Click "Unlock Exam" above once proctor is confirmed.</li>
            <li>3. Candidate starts exam from their dashboard.</li>
            <li>4. Exam scored server-side. Certificate issued if passed and not flagged.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
