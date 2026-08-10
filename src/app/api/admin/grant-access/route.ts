import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let adminUid: string;
  let adminEmail = '';
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    adminUid = decoded.uid;
    adminEmail = decoded.email?.toLowerCase() ?? '';
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!(await checkIsAdmin(adminUid, adminEmail))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { email, accessKey, note } = body as { email?: string; accessKey?: string; note?: string };

  if (!email || !accessKey) {
    return NextResponse.json({ error: 'email and accessKey are required' }, { status: 400 });
  }

  let targetUid: string;
  let targetEmail: string;
  try {
    const targetUser = await adminAuth.getUserByEmail(email.trim().toLowerCase());
    targetUid = targetUser.uid;
    targetEmail = targetUser.email ?? email;
  } catch {
    return NextResponse.json({ error: `No user found with email: ${email}` }, { status: 404 });
  }

  await adminDb
    .collection('users').doc(targetUid)
    .collection('examAccess').doc(accessKey)
    .set({
      granted: true,
      grantedAt: FieldValue.serverTimestamp(),
      grantedByAdmin: true,
      adminGrantedBy: adminEmail,
      adminNote: note ?? '',
    }, { merge: true });

  await adminDb.collection('auditLogs').add({
    userId: adminUid,
    eventType: 'admin_grant_access',
    eventDetails: { targetUid, targetEmail, accessKey, note: note ?? '' },
    createdAt: FieldValue.serverTimestamp(),
    severity: 'warning',
  });

  return NextResponse.json({ success: true, uid: targetUid, email: targetEmail, accessKey });
}
