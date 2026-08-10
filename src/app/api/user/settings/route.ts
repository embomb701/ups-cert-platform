import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.split('Bearer ')[1];

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const {
    displayName,
    emailRemindersEnabled,
    profileVisible,
    openToOpportunities,
    headline,
    location,
  } = body as {
    displayName?: string;
    emailRemindersEnabled?: boolean;
    profileVisible?: boolean;
    openToOpportunities?: boolean;
    headline?: string;
    location?: string;
  };

  const firestoreUpdate: Record<string, unknown> = {};

  if (typeof displayName === 'string') {
    const trimmed = displayName.trim().slice(0, 80);
    await adminAuth.updateUser(uid, { displayName: trimmed });
    firestoreUpdate.displayName = trimmed;
  }
  if (typeof emailRemindersEnabled === 'boolean') {
    firestoreUpdate.emailRemindersEnabled = emailRemindersEnabled;
  }
  if (typeof profileVisible === 'boolean') {
    firestoreUpdate.profileVisible = profileVisible;
  }
  if (typeof openToOpportunities === 'boolean') {
    firestoreUpdate.openToOpportunities = openToOpportunities;
  }
  if (typeof headline === 'string') {
    firestoreUpdate.headline = headline.trim().slice(0, 120);
  }
  if (typeof location === 'string') {
    firestoreUpdate.location = location.trim().slice(0, 80);
  }

  if (Object.keys(firestoreUpdate).length > 0) {
    await adminDb.collection('users').doc(uid).set(firestoreUpdate, { merge: true });
  }

  return NextResponse.json({ ok: true });
}
