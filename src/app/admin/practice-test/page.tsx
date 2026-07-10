'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getIdToken } from '@/lib/firebase/auth';

export default function PracticeTestAdminPage() {
  const [free, setFree] = useState(false);
  const [freeNote, setFreeNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/practice-test/status')
      .then((r) => r.json())
      .then((data) => {
        setFree(data.free ?? false);
        setFreeNote(data.freeNote ?? '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/practice-test-toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ free, freeNote }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Failed to save.');
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="section-pad">
      <div className="container-site max-w-2xl mx-auto">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-300 mb-6 inline-block">
          ← Admin Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-white mb-2">Practice Test Settings</h1>
        <p className="text-gray-500 text-sm mb-8">
          The Jr. FSE Practice Test normally costs $14.99. Enable free mode to let users claim it at
          no charge — useful for promotions, demos, or beta testing. Changes take effect immediately.
        </p>

        {loading ? (
          <div className="h-40 bg-gray-800 animate-pulse rounded-xl" />
        ) : (
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`rounded-xl border p-6 ${free ? 'border-green-700 bg-green-900/20' : 'border-gray-700 bg-gray-800'}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-semibold text-lg">
                    Practice Test is currently{' '}
                    <span className={free ? 'text-green-400' : 'text-amber-400'}>
                      {free ? 'FREE' : 'PAID ($14.99)'}
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {free
                      ? 'Users can claim the practice test at no charge.'
                      : 'Users must pay $14.99 via Stripe to access the practice test.'}
                  </p>
                </div>
              </div>

              {/* Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFree(false)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    !free
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                  }`}
                >
                  Paid ($14.99)
                </button>
                <button
                  onClick={() => setFree(true)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    free
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                  }`}
                >
                  Free
                </button>
              </div>
            </div>

            {/* Free Note */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Free note (shown to users when free, optional)
              </label>
              <input
                type="text"
                value={freeNote}
                onChange={(e) => setFreeNote(e.target.value)}
                placeholder="e.g. Free for a limited time — no code needed"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Save */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
              {saved && <span className="text-green-400 text-sm">Saved ✓</span>}
              {error && <span className="text-red-400 text-sm">{error}</span>}
            </div>

            {/* Info */}
            <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4 text-xs text-gray-500 space-y-1">
              <p><strong className="text-gray-400">What the practice test is:</strong> Same Jr. FSE question bank (50 questions, 90 sec/question). Results and score shown. No certificate issued — it&apos;s for practice only, not a certification attempt.</p>
              <p><strong className="text-gray-400">Free vs paid:</strong> Free mode lets users click &quot;Claim Free Practice Test&quot; on the site — no Stripe. Paid mode sends them through normal Stripe checkout at $14.99.</p>
              <p><strong className="text-gray-400">This does not affect:</strong> Jr. FSE Test-Out ($299 human proctored), the 3-to-6-Month Training Course ($1,499), or any other product.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
