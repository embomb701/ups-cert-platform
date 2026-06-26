'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';
import { PurchaseButton } from './PurchaseButton';

interface Status {
  free: boolean;
  freeNote?: string | null;
  price: number;
}

export function PracticeTestButton({ className }: { className?: string }) {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<Status | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/practice-test/status')
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({ free: false, price: 1499 }));
  }, []);

  if (!status || authLoading) {
    return <div className="h-10 rounded-lg bg-gray-700 animate-pulse" />;
  }

  if (status.free) {
    if (!user) {
      return (
        <Link href="/login" className={className}>
          Sign In to Claim Free Practice Test
        </Link>
      );
    }

    if (claimed) {
      return (
        <div className="text-center">
          <p className="text-green-400 text-sm font-semibold">Practice test claimed!</p>
          <Link href="/exam/rules/jr_fse" className="text-blue-400 text-xs hover:underline">
            Go take it now →
          </Link>
        </div>
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

  return (
    <PurchaseButton
      productId="practice_test"
      label="Buy Practice Test — $14.99"
      className={className}
    />
  );
}
