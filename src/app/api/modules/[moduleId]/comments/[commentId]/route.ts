import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';

export const dynamic = 'force-dynamic';

// Authors can delete their own comment; admins can delete any.
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ moduleId: string; commentId: string }> }) {
  const { commentId } = await params;

  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let uid: string;
  let email: string;
  try {
    const decoded = await adminAuth.verifyIdToken(authHeader.split('Bearer ')[1]);
    uid = decoded.uid;
    email = decoded.email?.toLowerCase() ?? '';
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const ref = adminDb.collection('moduleComments').doc(commentId);
  const snap = await ref.get();
  if (!snap.exists) {
    return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
  }

  const isOwner = snap.data()?.uid === uid;
  if (!isOwner) {
    const isAdmin = await checkIsAdmin(uid, email);
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await ref.delete();
  return NextResponse.json({ success: true });
}
