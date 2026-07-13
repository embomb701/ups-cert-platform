import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Static imports — webpack bundles these into the Vercel function at build time.
// fs.readFileSync CANNOT be used here: data/ is not included in the serverless bundle.
import jrFscSample from '../../../../../data/questions/jr-fsc-sample.json';
import jrFseAll from '../../../../../data/questions/jr-fse-all-questions.json';
import bookJrFse from '../../../../../data/questions/book-jr-fse-questions.json';
import fscSample from '../../../../../data/questions/fsc-sample.json';
import bookFse from '../../../../../data/questions/book-fse-questions.json';
import kitchenFresh from '../../../../../data/questions/kitchen-jr-fse-fresh.json';
import hvacFresh from '../../../../../data/questions/hvac-jr-fse-fresh.json';
import generatorFresh from '../../../../../data/questions/generator-jr-fse-fresh.json';
import datacenterFresh from '../../../../../data/questions/datacenter-jr-fresh.json';
import { buildKitchenBankQuestions, buildHvacBankQuestions, buildGeneratorBankQuestions, buildDataCenterBankQuestions } from '@/lib/exam/kitchenBank';

type QuestionRecord = Record<string, unknown>;

const BUNDLED_FILES: Record<string, QuestionRecord[]> = {
  'jr-fsc-sample.json':        jrFscSample as QuestionRecord[],
  'jr-fse-all-questions.json': jrFseAll as QuestionRecord[],
  'book-jr-fse-questions.json': bookJrFse as QuestionRecord[],
  'fsc-sample.json':           fscSample as QuestionRecord[],
  'book-fse-questions.json':   bookFse as QuestionRecord[],
  'kitchen-jr-fse-fresh.json': kitchenFresh as QuestionRecord[],
  'hvac-jr-fse-fresh.json':    hvacFresh as QuestionRecord[],
  'generator-jr-fse-fresh.json': generatorFresh as QuestionRecord[],
  'datacenter-jr-fresh.json':  datacenterFresh as QuestionRecord[],
  // Derived from course content (shared foundation + course-specific modules)
  'kitchen-jr-fse-derived':    buildKitchenBankQuestions() as unknown as QuestionRecord[],
  'hvac-jr-fse-derived':       buildHvacBankQuestions() as unknown as QuestionRecord[],
  'generator-jr-fse-derived':  buildGeneratorBankQuestions() as unknown as QuestionRecord[],
  'datacenter-jr-derived':     buildDataCenterBankQuestions() as unknown as QuestionRecord[],
};

const FILE_ORDER = [
  'jr-fsc-sample.json',
  'jr-fse-all-questions.json',
  'book-jr-fse-questions.json',
  'fsc-sample.json',
  'book-fse-questions.json',
  'kitchen-jr-fse-fresh.json',
  'kitchen-jr-fse-derived',
  'hvac-jr-fse-fresh.json',
  'hvac-jr-fse-derived',
  'generator-jr-fse-fresh.json',
  'generator-jr-fse-derived',
  'datacenter-jr-fresh.json',
  'datacenter-jr-derived',
];

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!(await checkIsAdmin(decoded.uid, decoded.email ?? ''))) {
      return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const fileName = body.file as string | undefined;
    const filesToImport = fileName ? [fileName] : FILE_ORDER;

    const collection = adminDb.collection('questionBank');
    let totalCreated = 0;
    const filesProcessed: string[] = [];
    const filesNotFound: string[] = [];

    for (const file of filesToImport) {
      const questions = BUNDLED_FILES[file];
      if (!questions || questions.length === 0) {
        filesNotFound.push(file);
        continue;
      }

      const BATCH_SIZE = 400;
      for (let i = 0; i < questions.length; i += BATCH_SIZE) {
        const chunk = questions.slice(i, i + BATCH_SIZE);
        const batch = adminDb.batch();

        for (const q of chunk) {
          const id = q.id as string;
          if (!id) continue;
          batch.set(
            collection.doc(id),
            { ...q, updatedAt: FieldValue.serverTimestamp() },
            { merge: true }
          );
          totalCreated++;
        }

        await batch.commit();
      }

      filesProcessed.push(`${file} (${questions.length})`);
    }

    await adminDb.collection('auditLogs').add({
      userId: decoded.uid,
      eventType: 'bulk_questions_imported_from_server',
      eventDetails: { filesProcessed, filesNotFound, totalCreated },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'info',
    });

    return NextResponse.json({ ok: true, filesProcessed, filesNotFound, totalCreated, totalUpdated: 0 });
  } catch (err: any) {
    console.error('Import from server error:', err);
    return NextResponse.json({ error: err.message ?? 'Import failed' }, { status: 500 });
  }
}
