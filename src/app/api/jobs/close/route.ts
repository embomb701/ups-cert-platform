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

  const { listingId, action } = await req.json() as { listingId?: string; action?: 'close' | 'reopen' };

  if (!listingId || !action) {
    return NextResponse.json({ error: 'Missing listingId or action' }, { status: 400 });
  }

  const listingSnap = await adminDb.collection('jobListings').doc(listingId).get();
  if (!listingSnap.exists) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }

  if (listingSnap.data()?.postedByUid !== uid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  await adminDb.collection('jobListings').doc(listingId).update({
    status: action === 'close' ? 'closed' : 'active',
    updatedAt: FieldValue.serverTimestamp(),
  });

  return NextResponse.json({ success: true });
}
