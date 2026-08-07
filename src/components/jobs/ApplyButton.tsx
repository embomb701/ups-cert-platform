'use client';

import { useState } from 'react';
import { getIdToken } from '@/lib/firebase/auth';

interface Props {
  listingId: string;
  isLoggedIn: boolean;
}

export function ApplyButton({ listingId, isLoggedIn }: Props) {
  const [status, setStatus] = useState<'idle' | 'composing' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoggedIn) {
    return (
      <a
        href={`/login?redirect=/jobs/${listingId}`}
        className="block w-full py-3 px-5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors text-sm text-center"
      >
        Sign in to apply
      </a>
    );
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-700/50 bg-green-950/20 p-4 text-center">
        <p className="text-green-400 font-semibold text-sm">Application submitted!</p>
        <p className="text-gray-500 text-xs mt-1">The employer will contact you at your account email.</p>
      </div>
    );
  }

  async function handleApply() {
    setSubmitting(true);
    setErrorMsg('');
    try {
      const token = await getIdToken();
      if (!token) { setErrorMsg('Not signed in'); setSubmitting(false); return; }

      const res = await fetch('/api/jobs/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ listingId, message }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? 'Failed to apply'); setStatus('error'); setSubmitting(false); return; }
      setStatus('success');
    } catch {
      setErrorMsg('Network error — please try again');
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

  if (status === 'composing' || status === 'error') {
    return (
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Optional note to employer</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Brief intro, relevant experience, or questions…"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 resize-none"
          />
        </div>
        {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
        <div className="flex gap-2">
          <button
            onClick={handleApply}
            disabled={submitting}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>
          <button
            onClick={() => { setStatus('idle'); setErrorMsg(''); }}
            className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setStatus('composing')}
      className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors text-sm"
    >
      Apply for this position
    </button>
  );
}
