import { adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Sliding-window rate limiter backed by Firestore.
 * Non-transactional — allows a small burst of ~2× on concurrent requests,
 * which is acceptable for advisory limiting (not hard security).
 *
 * Documents live at: userRateLimits/{uid}/{action}
 * Auto-cleaned by resetting the window on each new period.
 */
export async function checkRateLimit(
  uid: string,
  action: string,
  max: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const ref = adminDb.collection('userRateLimits').doc(uid).collection('actions').doc(action);
  const now = Date.now();

  const snap = await ref.get();

  if (!snap.exists) {
    await ref.set({ count: 1, windowStart: now, updatedAt: now });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }

  const data = snap.data()!;
  const windowStart: number = data.windowStart?.toMillis?.() ?? data.windowStart ?? 0;
  const resetAt = windowStart + windowMs;

  if (now >= resetAt) {
    // Window expired — reset
    await ref.set({ count: 1, windowStart: now, updatedAt: now });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }

  const count: number = data.count ?? 0;

  if (count >= max) {
    return { allowed: false, remaining: 0, resetAt };
  }

  await ref.update({ count: FieldValue.increment(1), updatedAt: now });
  return { allowed: true, remaining: max - count - 1, resetAt };
}
