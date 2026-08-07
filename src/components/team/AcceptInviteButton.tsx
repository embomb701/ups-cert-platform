'use client';

import { useState } from 'react';
import { getIdToken } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

interface Props {
  token: string;
  courseName: string;
}

export function AcceptInviteButton({ token, courseName }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleAccept() {
    setStatus('loading');
    try {
      const idToken = await getIdToken();
      if (!idToken) { setErrorMsg('Not signed in'); setStatus('error'); return; }
      const res = await fetch('/api/team/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Failed to accept invitation');
        setStatus('error');
        return;
      }
      setStatus('success');
      setTimeout(() => router.push('/training'), 1500);
    } catch {
      setErrorMsg('Network error — please try again');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-700/50 bg-green-950/20 p-5 text-center">
        <p className="text-green-400 font-semibold text-sm mb-1">Access granted!</p>
        <p className="text-gray-400 text-xs">Redirecting to {courseName}…</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleAccept}
        disabled={status === 'loading'}
        className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors text-sm"
      >
        {status === 'loading' ? 'Accepting…' : `Accept — start ${courseName}`}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs text-center">{errorMsg}</p>
      )}
    </div>
  );
}
