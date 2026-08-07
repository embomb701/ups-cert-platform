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
  let applicantEmail: string;
  let applicantName: string;
  try {
    const decoded = await adminAuth.verifyIdToken(authHeader.split('Bearer ')[1]);
    uid = decoded.uid;
    applicantEmail = decoded.email ?? '';
    applicantName = decoded.name ?? '';
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const { listingId, message } = await req.json() as { listingId?: string; message?: string };

  if (!listingId) {
    return NextResponse.json({ error: 'Missing listingId' }, { status: 400 });
  }

  const listingSnap = await adminDb.collection('jobListings').doc(listingId).get();
  if (!listingSnap.exists || listingSnap.data()?.status !== 'active') {
    return NextResponse.json({ error: 'Listing not found or closed' }, { status: 404 });
  }

  const listing = listingSnap.data()!;

  // Prevent duplicate applications
  const dupSnap = await adminDb
    .collection('jobApplications')
    .where('listingId', '==', listingId)
    .where('applicantUid', '==', uid)
    .limit(1)
    .get();

  if (!dupSnap.empty) {
    return NextResponse.json({ error: 'You have already applied to this listing' }, { status: 400 });
  }

  await adminDb.collection('jobApplications').add({
    listingId,
    listingTitle: listing.title,
    company: listing.company,
    applicantUid: uid,
    applicantEmail,
    applicantName,
    message: message?.trim() ?? '',
    status: 'pending',
    createdAt: FieldValue.serverTimestamp(),
  });

  await adminDb.collection('jobListings').doc(listingId).update({
    applicationCount: FieldValue.increment(1),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return NextResponse.json({ success: true });
}
