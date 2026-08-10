'use client';

import { useState } from 'react';
import { getIdToken } from '@/lib/firebase/auth';

export function RevokeCertButton({ certId, certNumber }: { certId: string; certNumber: string }) {
  const [state, setState] = useState<'idle' | 'revoking' | 'done'>('idle');

  async function handleRevoke() {
    if (!confirm(`Revoke certificate ${certNumber}? This action is permanent.`)) return;
    const reason = prompt('Reason for revocation (optional):') ?? '';
    setState('revoking');
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/revoke-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token ?? ''}` },
        body: JSON.stringify({ certificateId: certId, reason }),
      });
      if (res.ok) setState('done');
      else setState('idle');
    } catch {
      setState('idle');
    }
  }

  if (state === 'done') return <span className="text-xs text-red-400 font-medium">Revoked</span>;
  return (
    <button
      onClick={handleRevoke}
      disabled={state === 'revoking'}
      className="text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-40"
    >
      {state === 'revoking' ? 'Revoking…' : 'Revoke'}
    </button>
  );
}
