import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let email: string;
    let uid: string;
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
      email = (decoded.email ?? '').toLowerCase();
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!ADMIN_EMAILS.includes(email)) {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    }

    const { free, freeNote } = await req.json() as { free: boolean; freeNote?: string };

    await adminDb.collection('settings').doc('practiceTest').set({
      free,
      freeNote: freeNote ?? '',
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: email,
    }, { merge: true });

    await adminDb.collection('auditLogs').add({
      userId: uid,
      eventType: free ? 'practice_test_made_free' : 'practice_test_made_paid',
      eventDetails: { freeNote: freeNote ?? '' },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'info',
    });

    return NextResponse.json({ success: true, free });
  } catch (err) {
    console.error('Practice test toggle error:', err);
    return NextResponse.json({ error: 'Toggle failed.' }, { status: 500 });
  }
}
