'use client';

// Referral attribution — first-touch, localStorage-backed.
// Flow: captureReferralCode() runs on every page load (AuthProvider), storing
// ?ref=<uid> from the URL. On first signup, the stored code is sent to
// /api/referral/track (server-side, admin SDK) to credit the referrer, since
// client Firestore rules don't allow writing another user's document.

const REF_STORAGE_KEY = 'mfs_ref';
const REF_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

interface StoredReferral {
  code: string;
  capturedAt: number;
}

export function captureReferralCode(): void {
  if (typeof window === 'undefined') return;
  try {
    const ref = new URLSearchParams(window.location.search).get('ref')?.trim();
    if (!ref) return;

    // First-touch attribution — don't clobber an already-stored code.
    if (window.localStorage.getItem(REF_STORAGE_KEY)) return;

    const entry: StoredReferral = { code: ref, capturedAt: Date.now() };
    window.localStorage.setItem(REF_STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage unavailable (private browsing, etc.) — referral tracking skipped
  }
}

export function getStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(REF_STORAGE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as StoredReferral;
    if (Date.now() - entry.capturedAt > REF_MAX_AGE_MS) {
      window.localStorage.removeItem(REF_STORAGE_KEY);
      return null;
    }
    return entry.code || null;
  } catch {
    return null;
  }
}

export function clearReferralCode(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(REF_STORAGE_KEY);
  } catch {
    // ignore
  }
}
