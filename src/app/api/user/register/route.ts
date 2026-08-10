import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { sendWelcomeEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const token = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;
    const email = decoded.email ?? '';
    const name = decoded.name ?? email.split('@')[0] ?? '';

    const userRef = adminDb.collection('users').doc(uid);
    const snap = await userRef.get();

    if (snap.exists) {
      return NextResponse.json({ isNew: false });
    }

    await userRef.set({
      email,
      displayName: name,
      createdAt: FieldValue.serverTimestamp(),
      emailRemindersEnabled: true,
      profileVisible: true,
      openToOpportunities: false,
    });

    // Send welcome email best-effort
    if (email) {
      sendWelcomeEmail(email, name, uid).catch(() => {});
    }

    return NextResponse.json({ isNew: true });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
