import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';
import { hashIpOrNull, getRealIp } from '@/lib/utils/ipHash';
import { FieldValue } from 'firebase-admin/firestore';

// Cap how many events a single request may persist. The client batches at most
// a handful per flush; anything larger is abuse and would also blow past
// Firestore's 500-write batch limit.
const MAX_EVENTS_PER_REQUEST = 50;

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

    if (typeof attemptId !== 'string' || attemptId.length === 0 || attemptId.includes('/')) {
      return NextResponse.json({ error: 'Invalid attemptId' }, { status: 400 });
    }
    if (!Array.isArray(events)) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
    if (events.length > MAX_EVENTS_PER_REQUEST) {
      return NextResponse.json({ error: 'Too many events' }, { status: 400 });
    }

    // Keep only well-formed event objects with a string type; ignore the rest.
    const cleanEvents = events.filter(
      (e) => e && typeof e === 'object' && typeof e.type === 'string'
    );
    if (cleanEvents.length === 0) {
      return NextResponse.json({ ok: true, logged: 0 });
    }

    // Verify attempt belongs to user
    const attemptSnap = await adminDb.collection('examAttempts').doc(attemptId).get();
    if (!attemptSnap.exists || attemptSnap.data()?.userId !== uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const ipHash = hashIpOrNull(getRealIp(req));

    // Log each event type
    const batch = adminDb.batch();
    for (const evt of cleanEvents) {
      const ref = adminDb.collection('auditLogs').doc();
      batch.set(ref, {
        userId: uid,
        attemptId,
        eventType: 'suspicious_event',
        eventDetails: evt,
        createdAt: FieldValue.serverTimestamp(),
        ipHash,
        severity: evt.type === 'devtools_detected' ? 'critical' : 'warning',
      });
    }
    await batch.commit();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Event log error:', err);
    return NextResponse.json({ error: 'Failed to log events' }, { status: 500 });
  }
}
