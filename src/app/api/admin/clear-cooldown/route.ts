import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split('Bearer ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token).catch(() => null);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    if (!(await checkIsAdmin(decoded.uid, decoded.email ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { uid, examLevel } = await req.json();
    if (!uid || !examLevel) {
      return NextResponse.json({ error: 'uid and examLevel required' }, { status: 400 });
    }

    const snap = await adminDb
      .collection('examAttempts')
      .where('userId', '==', uid)
      .where('examLevel', '==', examLevel)
      .get();

    const batch = adminDb.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));

    const ipSnap = await adminDb
      .collection('ipExamLocks')
      .where('userId', '==', uid)
      .where('examLevel', '==', examLevel)
      .get();
    ipSnap.docs.forEach((d) => batch.delete(d.ref));

    await batch.commit();

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
