import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';
import { hashIp, getRealIp } from '@/lib/utils/ipHash';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let uid: string;
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { attemptId, events } = await req.json();

    if (!attemptId || !Array.isArray(events)) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    // Verify attempt belongs to user
    const attemptSnap = await adminDb.collection('examAttempts').doc(attemptId).get();
    if (!attemptSnap.exists || attemptSnap.data()?.userId !== uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const ipHash = hashIp(getRealIp(req));

    // Log each event type
    const batch = adminDb.batch();
    for (const evt of events) {
      const ref = adminDb.collection('auditLogs').doc();
      batch.set(ref, {
        userId: uid,
        attemptId,
        eventType: 'suspicious_event',
        eventDetails: evt,
        createdAt: FieldValue.serverTimestamp(),
        ipHash,
        severity: ['devtools_detected', 'ai_multiple_faces'].includes(evt.type) ? 'critical' : 'warning',
      });
    }
    await batch.commit();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Event log error:', err);
    return NextResponse.json({ error: 'Failed to log events' }, { status: 500 });
  }
}
