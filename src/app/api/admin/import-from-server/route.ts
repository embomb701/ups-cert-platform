import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function isAdmin(email: string): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());
  return admins.includes(email.toLowerCase());
}

const QUESTION_FILES = [
  'jr-fsc-sample.json',
  'jr-fse-all-questions.json',
  'book-jr-fse-questions.json',
  'fsc-sample.json',
  'book-fse-questions.json',
];

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!decoded.email || !isAdmin(decoded.email)) {
      return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const fileName = body.file as string | undefined;

    // If a specific file is requested, import just that one
    const filesToImport = fileName ? [fileName] : QUESTION_FILES;

    const dataDir = path.join(process.cwd(), 'data', 'questions');
    const collection = adminDb.collection('questionBank');

    let totalCreated = 0;
    let totalUpdated = 0;
    let totalSkipped = 0;
    let filesProcessed: string[] = [];
    let filesNotFound: string[] = [];

    for (const file of filesToImport) {
      const filePath = path.join(dataDir, file);
      if (!fs.existsSync(filePath)) {
        filesNotFound.push(file);
        continue;
      }

      const questions: Record<string, unknown>[] = JSON.parse(
        fs.readFileSync(filePath, 'utf8')
      );

      const BATCH_SIZE = 400;
      for (let i = 0; i < questions.length; i += BATCH_SIZE) {
        const chunk = questions.slice(i, i + BATCH_SIZE);
        const batch = adminDb.batch();

        for (const q of chunk) {
          const id = q.id as string;
          if (!id) continue;
          const docRef = collection.doc(id);
          const snap = await docRef.get();
          batch.set(
            docRef,
            {
              ...q,
              createdAt: snap.exists ? snap.data()?.createdAt : FieldValue.serverTimestamp(),
              updatedAt: FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
          if (snap.exists) totalUpdated++;
          else totalCreated++;
        }

        await batch.commit();
      }

      filesProcessed.push(`${file} (${questions.length})`);
    }

    await adminDb.collection('auditLogs').add({
      userId: decoded.uid,
      eventType: 'bulk_questions_imported_from_server',
      eventDetails: { filesProcessed, filesNotFound, totalCreated, totalUpdated },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'info',
    });

    return NextResponse.json({
      ok: true,
      filesProcessed,
      filesNotFound,
      totalCreated,
      totalUpdated,
      totalSkipped,
    });
  } catch (err: any) {
    console.error('Import from server error:', err);
    return NextResponse.json({ error: err.message ?? 'Import failed' }, { status: 500 });
  }
}
