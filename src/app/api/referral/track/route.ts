import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

// Credits a referral on a new signup. Called once, client-side, right after
// a new user doc is created (see ensureUserDoc in lib/firebase/auth.ts).
// Idempotent: a user can only be credited to one referrer, ever.
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(authHeader.split('Bearer ')[1]);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({})) as { refCode?: string };
  const refUid = body.refCode?.trim();

  if (!refUid || refUid === uid) {
    return NextResponse.json({ credited: false });
  }

  const userRef = adminDb.collection('users').doc(uid);
  const referrerRef = adminDb.collection('users').doc(refUid);

  const [userSnap, referrerSnap] = await Promise.all([userRef.get(), referrerRef.get()]);

  // Not a real user yet, already credited to someone, or referrer doesn't exist — no-op.
  if (!userSnap.exists || userSnap.data()?.referredBy || !referrerSnap.exists) {
    return NextResponse.json({ credited: false });
  }

  await Promise.all([
    userRef.set({ referredBy: refUid }, { merge: true }),
    referrerRef.set({ referralCount: FieldValue.increment(1) }, { merge: true }),
  ]);

  return NextResponse.json({ credited: true });
}
