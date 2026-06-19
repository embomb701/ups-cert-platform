import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export async function POST(req: NextRequest) {
  try {
    const decoded = await requireAdmin(req);
    if (decoded instanceof NextResponse) return decoded;

    const { certificateId, reason } = await req.json();
    if (!certificateId) return NextResponse.json({ error: 'certificateId required' }, { status: 400 });

    await adminDb.collection('certificates').doc(certificateId).update({
      status: 'revoked',
      revokedAt: FieldValue.serverTimestamp(),
      revokedBy: decoded.uid,
      revocationReason: reason ?? '',
    });

    await adminDb.collection('auditLogs').add({
      userId: decoded.uid,
      eventType: 'certificate_revoked',
      eventDetails: { certificateId, reason },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'critical',
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Revoke error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
