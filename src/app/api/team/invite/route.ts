import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let uid: string;
  let inviterEmail: string;
  try {
    const decoded = await adminAuth.verifyIdToken(authHeader.split('Bearer ')[1]);
    uid = decoded.uid;
    inviterEmail = decoded.email ?? '';
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const body = await req.json();
  const { email, courseKey, orderId } = body as { email?: string; courseKey?: string; orderId?: string };

  if (!email || !courseKey || !orderId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  // Verify the order belongs to this user
  const orderSnap = await adminDb.collection('employerOrders').doc(orderId).get();
  if (!orderSnap.exists || orderSnap.data()?.userId !== uid) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const order = orderSnap.data()!;
  const totalSeats: number = order.seats ?? 0;

  // Count active invitations for this order (pending + accepted)
  const activeInvitesSnap = await adminDb
    .collection('teamInvitations')
    .where('orderId', '==', orderId)
    .where('status', 'in', ['pending', 'accepted'])
    .get();

  if (activeInvitesSnap.size >= totalSeats) {
    return NextResponse.json({ error: 'No seats remaining for this order' }, { status: 400 });
  }

  // Prevent duplicate active invitation to the same email in this order
  const duplicateSnap = await adminDb
    .collection('teamInvitations')
    .where('orderId', '==', orderId)
    .where('inviteeEmail', '==', normalizedEmail)
    .where('status', 'in', ['pending', 'accepted'])
    .get();

  if (!duplicateSnap.empty) {
    return NextResponse.json({ error: 'An active invitation already exists for this email' }, { status: 400 });
  }

  const token = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await adminDb.collection('teamInvitations').doc(token).set({
    token,
    orderId,
    inviterUid: uid,
    inviterEmail,
    inviteeEmail: normalizedEmail,
    courseKey,
    status: 'pending',
    createdAt: FieldValue.serverTimestamp(),
    expiresAt,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return NextResponse.json({ token, link: `${siteUrl}/invite/${token}` });
}
