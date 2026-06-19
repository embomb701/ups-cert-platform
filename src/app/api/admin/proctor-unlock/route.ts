import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export async function POST(req: NextRequest) {
  try {
    const decoded = await requireAdmin(req);
    if (decoded instanceof NextResponse) return decoded;

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
