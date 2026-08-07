'use client';

import { useState } from 'react';
import { getIdToken } from '@/lib/firebase/auth';

interface Props {
  listingId: string;
  currentStatus: 'active' | 'closed';
}

export function CloseListingButton({ listingId, currentStatus }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const action = currentStatus === 'active' ? 'close' : 'reopen';

  async function handle() {
    setStatus('loading');
    try {
      const token = await getIdToken();
      if (!token) { setStatus('idle'); return; }
      await fetch('/api/jobs/close', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ listingId, action }),
      });
      window.location.reload();
    } catch {
      setStatus('idle');
    }
  }

  return (
    <button
      onClick={handle}
      disabled={status === 'loading'}
      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 ${
        action === 'close'
          ? 'border-gray-600 text-gray-400 hover:border-red-600 hover:text-red-400'
          : 'border-green-700 text-green-400 hover:border-green-500'
      }`}
    >
      {status === 'loading' ? '…' : action === 'close' ? 'Close listing' : 'Reopen listing'}
    </button>
  );
}
