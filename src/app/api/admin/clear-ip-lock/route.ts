import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';

export const dynamic = 'force-dynamic';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!(await checkIsAdmin(decoded.uid, decoded.email ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { lockId, notes } = await req.json();
    if (!lockId) return NextResponse.json({ error: 'lockId required' }, { status: 400 });

    await adminDb.collection('ipExamLocks').doc(lockId).update({
      clearedByAdmin: true,
      adminNotes: notes ?? '',
      clearedAt: FieldValue.serverTimestamp(),
      clearedByAdminUid: decoded.uid,
    });

    await adminDb.collection('auditLogs').add({
      userId: decoded.uid,
      eventType: 'ip_lock_cleared',
      eventDetails: { lockId, notes },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'info',
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Clear IP lock error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
