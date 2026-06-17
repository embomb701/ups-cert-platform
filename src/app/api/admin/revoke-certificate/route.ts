import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';
import { FieldValue } from 'firebase-admin/firestore';

function isAdmin(email: string): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());
  return admins.includes(email.toLowerCase());
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!decoded.email || !isAdmin(decoded.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

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
