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
      return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
    }

    const { orderId, proctorName, proctorId, meetingLink, notes } = await req.json();
    if (!orderId) return NextResponse.json({ error: 'orderId required' }, { status: 400 });

    await adminDb.collection('proctoredExamOrders').doc(orderId).update({
      status: 'ready',
      proctorId: proctorId ?? decoded.uid,
      proctorName: proctorName ?? 'Approved organization representative',
      meetingLink: meetingLink ?? null,
      adminNotes: notes ?? '',
      updatedAt: FieldValue.serverTimestamp(),
    });

    await adminDb.collection('auditLogs').add({
      userId: decoded.uid,
      eventType: 'proctor_unlock',
      eventDetails: { orderId, proctorName },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'info',
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Proctor unlock error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
