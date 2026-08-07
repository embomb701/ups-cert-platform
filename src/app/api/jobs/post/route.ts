import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

const JOB_TYPES = ['full-time', 'part-time', 'contract', 'temporary'] as const;
type JobType = typeof JOB_TYPES[number];

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let uid: string;
  let email: string;
  try {
    const decoded = await adminAuth.verifyIdToken(authHeader.split('Bearer ')[1]);
    uid = decoded.uid;
    email = decoded.email ?? '';
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // Verify employer has an active order
  const orderSnap = await adminDb
    .collection('employerOrders')
    .where('userId', '==', uid)
    .where('status', '==', 'active')
    .limit(1)
    .get();

  if (orderSnap.empty) {
    return NextResponse.json({ error: 'An active employer pack is required to post jobs' }, { status: 403 });
  }

  const body = await req.json();
  const { title, company, location, type, description, courseRequirements, contactEmail } = body as {
    title?: string;
    company?: string;
    location?: string;
    type?: string;
    description?: string;
    courseRequirements?: string[];
    contactEmail?: string;
  };

  if (!title?.trim() || !company?.trim() || !location?.trim() || !description?.trim() || !contactEmail?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!JOB_TYPES.includes(type as JobType)) {
    return NextResponse.json({ error: 'Invalid job type' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
    return NextResponse.json({ error: 'Invalid contact email' }, { status: 400 });
  }

  const docRef = await adminDb.collection('jobListings').add({
    title: title.trim(),
    company: company.trim(),
    location: location.trim(),
    type,
    description: description.trim(),
    courseRequirements: Array.isArray(courseRequirements) ? courseRequirements.slice(0, 10) : [],
    contactEmail: contactEmail.trim().toLowerCase(),
    postedByUid: uid,
    postedByEmail: email,
    status: 'active',
    applicationCount: 0,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return NextResponse.json({ id: docRef.id });
}
