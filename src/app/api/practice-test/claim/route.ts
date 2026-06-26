import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

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

    // Verify practice test is currently free
    const settingsSnap = await adminDb.collection('settings').doc('practiceTest').get();
    if (!settingsSnap.exists || settingsSnap.data()?.free !== true) {
      return NextResponse.json({ error: 'Practice test is not currently free.' }, { status: 403 });
    }

    // Grant access
    await adminDb
      .collection('users').doc(uid)
      .collection('examAccess').doc('practice_test')
      .set({
        granted: true,
        free: true,
        purchaseId: 'free_claim',
        grantedAt: FieldValue.serverTimestamp(),
      }, { merge: true });

    await adminDb.collection('auditLogs').add({
      userId: uid,
      eventType: 'practice_test_claimed_free',
      eventDetails: {},
      createdAt: FieldValue.serverTimestamp(),
      severity: 'info',
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Practice test claim error:', err);
    return NextResponse.json({ error: 'Failed to claim practice test.' }, { status: 500 });
  }
}
