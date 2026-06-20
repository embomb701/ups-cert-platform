import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const decoded = await adminAuth.verifyIdToken(token);
  if (!ADMIN_EMAILS.includes(decoded.email?.toLowerCase() ?? '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { uid, examLevel } = await req.json();

  // Delete all attempts for this user+examLevel (clears cooldown)
  const snap = await adminDb
    .collection('examAttempts')
    .where('userId', '==', uid)
    .where('examLevel', '==', examLevel)
    .get();

  const batch = adminDb.batch();
  snap.docs.forEach((d) => batch.delete(d.ref));

  // Also clear IP locks
  const ipSnap = await adminDb
    .collection('ipExamLocks')
    .where('userId', '==', uid)
    .where('examLevel', '==', examLevel)
    .get();
  ipSnap.docs.forEach((d) => batch.delete(d.ref));

  await batch.commit();

  return NextResponse.json({ deleted: snap.size + ipSnap.size });
}
