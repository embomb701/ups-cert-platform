import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export async function POST(req: NextRequest) {
  try {
    const decoded = await requireAdmin(req);
    if (decoded instanceof NextResponse) return decoded;

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
