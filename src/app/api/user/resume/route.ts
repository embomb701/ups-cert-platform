import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { sendResumeUploadedEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const MAX_BYTES = 5 * 1024 * 1024; // 5MB

async function requireUid(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  try {
    const decoded = await adminAuth.verifyIdToken(authHeader.split('Bearer ')[1]);
    return decoded.uid;
  } catch {
    return null;
  }
}

// Emails the resume directly — never written to a file store. Only a
// lightweight "a resume exists" record lives in Firestore (filename +
// timestamp), which is what powers the "Resume on file" badge employers
// see and the dashboard's own display. Once sent, the app has no copy.
export async function POST(req: NextRequest) {
  const uid = await requireUid(req);
  if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get('resume');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File is too large — 5MB maximum.' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  // Trust magic bytes over the client-supplied MIME type / filename extension.
  if (buffer.subarray(0, 5).toString('utf8') !== '%PDF-') {
    return NextResponse.json({ error: 'Only PDF files are accepted.' }, { status: 400 });
  }

  const fileName = (file.name || 'resume.pdf').slice(0, 150);

  const authUser = await adminAuth.getUser(uid);
  try {
    await sendResumeUploadedEmail(authUser.displayName ?? '', authUser.email ?? '', fileName, buffer);
  } catch (err) {
    console.error('Resume upload email failed:', err);
    return NextResponse.json({ error: 'Could not send your resume. Please try again.' }, { status: 502 });
  }

  await adminDb.collection('users').doc(uid).set(
    {
      resumeFileName: fileName,
      resumeUploadedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return NextResponse.json({ ok: true, fileName });
}

// Clears the "resume on file" record. There's no stored file to delete —
// re-submitting just means uploading again, which re-sends the email.
export async function DELETE(req: NextRequest) {
  const uid = await requireUid(req);
  if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await adminDb.collection('users').doc(uid).set(
    {
      resumeFileName: FieldValue.delete(),
      resumeUploadedAt: FieldValue.delete(),
      resumeShareConsent: false,
    },
    { merge: true },
  );

  return NextResponse.json({ ok: true });
}
