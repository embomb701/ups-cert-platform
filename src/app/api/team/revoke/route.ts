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

  if (invite.inviterUid !== uid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  if (invite.status === 'revoked') {
    return NextResponse.json({ error: 'Already revoked' }, { status: 400 });
  }

  // If accepted, remove the member's course access
  if (invite.status === 'accepted' && invite.acceptedByUid) {
    await adminDb
      .collection('users').doc(invite.acceptedByUid)
      .collection('examAccess').doc(invite.courseKey)
      .delete();
  }

  await inviteRef.update({
    status: 'revoked',
    revokedAt: FieldValue.serverTimestamp(),
    revokedByUid: uid,
  });

  return NextResponse.json({ success: true });
}
