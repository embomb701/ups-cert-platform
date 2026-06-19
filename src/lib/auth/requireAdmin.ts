import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

/** True if the email is in the ADMIN_EMAILS allowlist. */
export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const admins = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(email.toLowerCase());
}

export type AdminContext = { uid: string; email: string };

/**
 * Verify the caller is an authenticated admin. Returns the admin context on
 * success, or a NextResponse (401 for missing/invalid token, 403 for non-admin)
 * to return directly. Centralizes admin authorization so every admin route
 * fails consistently (and returns 401 — not a generic 500 — on a bad token).
 */
export async function requireAdmin(
  req: NextRequest
): Promise<AdminContext | NextResponse> {
  const authHeader = req.headers.get('Authorization');
  const idToken = authHeader?.split('Bearer ')[1];
  if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let decoded;
  try {
    decoded = await adminAuth.verifyIdToken(idToken);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  if (!isAdminEmail(decoded.email)) {
    return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
  }

  return { uid: decoded.uid, email: decoded.email! };
}
