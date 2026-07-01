'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';

interface Status {
  free: boolean;
  freeViaTraining?: boolean;
  freeNote?: string | null;
  price: number;
  hasAccess?: boolean;
}

export function PracticeTestButton({ className }: { className?: string }) {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<Status | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    const fetchStatus = async () => {
      const headers: Record<string, string> = {};
      if (user) {
        try {
          const token = await user.getIdToken();
          headers.Authorization = `Bearer ${token}`;
        } catch {}
      }
      fetch('/api/practice-test/status', { headers })
        .then((r) => r.json())
        .then(setStatus)
        .catch(() => setStatus({ free: false, price: 1499, hasAccess: false }));
    };

    fetchStatus();
  }, [user, authLoading]);

  if (!status || authLoading) {
    return <div className="h-10 rounded-lg bg-gray-700 animate-pulse" />;
  }

  // Already has access — go straight to exam
  if (status.hasAccess || claimed) {
    return (
      <div className="text-center space-y-1">
        <p className="text-green-400 text-sm font-semibold">
          {status.freeViaTraining ? 'Included with your training ✓' : 'Practice test ready ✓'}
        </p>
        <Link
          href="/exam/rules/practice_jr_fse"
          className={className ?? 'inline-block px-5 py-2.5 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg text-sm transition-colors'}
        >
          Take Practice Test →
        </Link>
      </div>
    );
  }

  // Free (global toggle or training) — show claim button
  if (status.free) {
    if (!user) {
      return (
        <Link href="/login" className={className}>
          Sign In to Claim Free Practice Test
        </Link>
      );
    }

    const handleClaim = async () => {
      setClaiming(true);
      setError(null);
      try {
        const token = await getIdToken();
        const res = await fetch('/api/practice-test/claim', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setClaimed(true);
        } else {
          setError(data.error ?? 'Failed to claim. Please try again.');
        }
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setClaiming(false);
      }
    };

    return (
      <div>
        <button onClick={handleClaim} disabled={claiming} className={className}>
          {claiming ? 'Claiming...' : 'Claim Free Practice Test'}
        </button>
        {status.freeNote && (
          <p className="text-xs text-green-400 mt-1.5 text-center">{status.freeNote}</p>
        )}
        {error && <p className="text-xs text-red-400 mt-1.5 text-center">{error}</p>}
      </div>
    );
  }

  // Not yet eligible — complete all training modules to unlock
  return (
    <div className="text-center space-y-1">
      <p className="text-gray-400 text-sm">Complete all 28 training modules to unlock the practice exam.</p>
    </div>
  );
}
