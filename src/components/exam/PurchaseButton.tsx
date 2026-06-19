'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';
import type { ProductId } from '@/types';

interface PurchaseButtonProps {
  productId: ProductId;
  label: string;
  className?: string;
}

export function PurchaseButton({ productId, label, className }: PurchaseButtonProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) return null;

  if (!user) {
    return (
      <a
        href="/login"
        className={className}
      >
        Sign In to Purchase
      </a>
    );
  }

  const handlePurchase = async () => {
    setPurchasing(true);
    setError(null);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to start checkout. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={purchasing}
        className={className}
      >
        {purchasing ? 'Redirecting to checkout...' : label}
      </button>
      {error && <p className="text-xs text-red-400 mt-2 text-center">{error}</p>}
    </div>
  );
}
