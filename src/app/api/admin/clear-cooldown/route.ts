import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split('Bearer ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let decoded: Awaited<ReturnType<typeof adminAuth.verifyIdToken>>;
    try {
      decoded = await adminAuth.verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!ADMIN_EMAILS.includes(decoded.email?.toLowerCase() ?? '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { uid, examLevel } = await req.json();
    if (!uid || !examLevel) {
      return NextResponse.json({ error: 'uid and examLevel required' }, { status: 400 });
    }

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

    // Audit log
    const { FieldValue } = await import('firebase-admin/firestore');
    await adminDb.collection('auditLogs').add({
      userId: decoded.uid,
      eventType: 'admin_action',
      eventDetails: { action: 'clear_cooldown', targetUserId: uid, examLevel, deleted: snap.size + ipSnap.size },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'warning',
    });

    return NextResponse.json({ deleted: snap.size + ipSnap.size });
  } catch (err: any) {
    console.error('Clear cooldown error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
