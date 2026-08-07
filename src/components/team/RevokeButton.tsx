'use client';

import { useState } from 'react';
import { getIdToken } from '@/lib/firebase/auth';

interface Props {
  token: string;
  onRevoked?: () => void;
}

export function RevokeButton({ token, onRevoked }: Props) {
  const [status, setStatus] = useState<'idle' | 'confirming' | 'loading'>('idle');

  async function doRevoke() {
    setStatus('loading');
    try {
      const idToken = await getIdToken();
      if (!idToken) { setStatus('idle'); return; }
      await fetch('/api/team/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ token }),
      });
      onRevoked?.();
      // Reload page to reflect new state
      window.location.reload();
    } catch {
      setStatus('idle');
    }
  }

  if (status === 'confirming') {
    return (
      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={doRevoke}
          className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded transition-colors"
        >
          Confirm
        </button>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs text-gray-500 hover:text-gray-300 px-2 py-1 rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setStatus('confirming')}
      disabled={status === 'loading'}
      className="flex-shrink-0 text-xs text-gray-500 hover:text-red-400 disabled:opacity-50 transition-colors px-2 py-1 rounded"
    >
      {status === 'loading' ? 'Revoking…' : 'Revoke'}
    </button>
  );
}
