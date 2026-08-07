import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
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

  const { token } = await req.json() as { token?: string };
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const inviteRef = adminDb.collection('teamInvitations').doc(token);
  const inviteSnap = await inviteRef.get();

  if (!inviteSnap.exists) {
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
  }

  const invite = inviteSnap.data()!;

  if (invite.status !== 'pending') {
    return NextResponse.json({ error: 'Invitation is no longer valid' }, { status: 400 });
  }

  const expiresAt: Date = invite.expiresAt instanceof Date
    ? invite.expiresAt
    : invite.expiresAt?.toDate?.() ?? new Date(0);

  if (new Date() > expiresAt) {
    return NextResponse.json({ error: 'Invitation has expired' }, { status: 400 });
  }

  // Grant training access
  await adminDb
    .collection('users').doc(uid)
    .collection('examAccess').doc(invite.courseKey)
    .set({
      granted: true,
      grantedAt: FieldValue.serverTimestamp(),
      grantedVia: 'team_invitation',
      invitationToken: token,
      inviterUid: invite.inviterUid,
    }, { merge: true });

  await inviteRef.update({
    status: 'accepted',
    acceptedByUid: uid,
    acceptedAt: FieldValue.serverTimestamp(),
  });

  return NextResponse.json({ success: true, courseKey: invite.courseKey });
}
