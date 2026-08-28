import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb, adminStorage } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const MAX_BYTES = 5 * 1024 * 1024; // 5MB

function resumePath(uid: string) {
  return `resumes/${uid}/resume.pdf`;
}

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

// Upload (or replace) the caller's own resume.
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

  const bucket = adminStorage.bucket();
  const storageFile = bucket.file(resumePath(uid));
  await storageFile.save(buffer, {
    contentType: 'application/pdf',
    metadata: { cacheControl: 'private, no-store' },
  });

  const fileName = (file.name || 'resume.pdf').slice(0, 150);
  await adminDb.collection('users').doc(uid).set(
    {
      resumeFileName: fileName,
      resumeSizeBytes: buffer.length,
      resumeUploadedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return NextResponse.json({ ok: true, fileName });
}

// Stream the caller's own resume back (view/download).
export async function GET(req: NextRequest) {
  const uid = await requireUid(req);
  if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const bucket = adminStorage.bucket();
  const storageFile = bucket.file(resumePath(uid));
  const [exists] = await storageFile.exists();
  if (!exists) return NextResponse.json({ error: 'No resume on file' }, { status: 404 });

  const [buffer] = await storageFile.download();
  const userSnap = await adminDb.collection('users').doc(uid).get();
  const fileName = (userSnap.data()?.resumeFileName as string) || 'resume.pdf';

  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${fileName.replace(/"/g, '')}"`,
      'Cache-Control': 'private, no-store',
    },
  });
}

// Remove the caller's own resume entirely.
export async function DELETE(req: NextRequest) {
  const uid = await requireUid(req);
  if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const bucket = adminStorage.bucket();
  const storageFile = bucket.file(resumePath(uid));
  await storageFile.delete({ ignoreNotFound: true });

  await adminDb.collection('users').doc(uid).set(
    {
      resumeFileName: FieldValue.delete(),
      resumeSizeBytes: FieldValue.delete(),
      resumeUploadedAt: FieldValue.delete(),
      resumeShareConsent: false,
    },
    { merge: true },
  );

  return NextResponse.json({ ok: true });
}
