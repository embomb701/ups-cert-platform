import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(authHeader.split('Bearer ')[1]);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const body = await req.json() as Record<string, unknown>;

  const allowed: Record<string, unknown> = {};
  if (typeof body.openToOpportunities === 'boolean') allowed.openToOpportunities = body.openToOpportunities;
  if (typeof body.profileVisible === 'boolean') allowed.profileVisible = body.profileVisible;
  if (typeof body.headline === 'string') allowed.headline = body.headline.trim().slice(0, 120);
  if (typeof body.location === 'string') allowed.location = body.location.trim().slice(0, 80);

  if (Object.keys(allowed).length === 0) {
    return NextResponse.json({ error: 'No valid fields' }, { status: 400 });
  }

  await adminDb.collection('users').doc(uid).set(
    { ...allowed, updatedAt: FieldValue.serverTimestamp() },
    { merge: true },
  );

  return NextResponse.json({ success: true });
}
