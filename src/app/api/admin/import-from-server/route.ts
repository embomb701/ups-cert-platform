import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// JSON files are read from disk at request time via fs.readFileSync.
// next.config.js outputFileTracingIncludes ensures data/questions/** is
// deployed alongside the function. Nothing is webpack-bundled — cold start
// is minimal (just firebase-admin + a few KB of route logic).

type QuestionRecord = Record<string, unknown>;

const STATIC_JSON_FILES = new Set([
  'jr-fsc-sample.json',
  'jr-fse-all-questions.json',
  'book-jr-fse-questions.json',
  'fsc-sample.json',
  'book-fse-questions.json',
  'kitchen-jr-fse-fresh.json',
  'hvac-jr-fse-fresh.json',
  'generator-jr-fse-fresh.json',
  'datacenter-jr-fresh.json',
  'solar-jr-fresh.json',
  'ev-jr-fresh.json',
  'dcp-jr-fresh.json',
  'battery-jr-fresh.json',
  'dc-engineer-jr-fresh.json',
  'marine-jr-fresh.json',
  'pool-jr-fresh.json',
  'hvac-tech-jr-fresh.json',
  'solar-installer-jr-fresh.json',
  'wind-turbine-jr-fresh.json',
  'elevator-tech-jr-fresh.json',
  'fire-alarm-tech-jr-fresh.json',
  'bmet-tech-jr-fresh.json',
  'bas-tech-jr-fresh.json',
  'ref-tech-jr-fresh.json',
  'plc-tech-jr-fresh.json',
  'security-tech-jr-fresh.json',
  'field-pm-jr-fresh.json',
  'pump-tech-jr-fresh.json',
]);

// Maps each derived-bank key to the exact function name exported from kitchenBank.
// kitchenBank is loaded dynamically only when one of these keys is requested,
// keeping the cold-start bundle small (no course-module data at init time).
const DERIVED_KEY_TO_FN: Record<string, string> = {
  'kitchen-jr-fse-derived':     'buildKitchenBankQuestions',
  'hvac-jr-fse-derived':        'buildHvacBankQuestions',
  'generator-jr-fse-derived':   'buildGeneratorBankQuestions',
  'datacenter-jr-derived':      'buildDataCenterBankQuestions',
  'solar-jr-derived':           'buildSolarBankQuestions',
  'ev-jr-derived':              'buildEvChargingBankQuestions',
  'dcp-jr-derived':             'buildDcPlantsBankQuestions',
  'battery-jr-derived':         'buildBatteryBankQuestions',
  'dc-engineer-jr-derived':     'buildDcEngineerBankQuestions',
  'marine-jr-derived':          'buildMarineBankQuestions',
  'pool-jr-derived':            'buildPoolBankQuestions',
  'hvac-tech-jr-derived':       'buildHvacTechBankQuestions',
  'solar-installer-jr-derived': 'buildSolarInstBankQuestions',
  'wind-turbine-jr-derived':    'buildWindTurbineBankQuestions',
  'elevator-tech-jr-derived':   'buildElevatorTechBankQuestions',
  'fire-alarm-tech-jr-derived': 'buildFireAlarmTechBankQuestions',
  'bmet-tech-jr-derived':       'buildBmetTechBankQuestions',
  'bas-tech-jr-derived':        'buildBasTechBankQuestions',
  'ref-tech-jr-derived':        'buildRefTechBankQuestions',
  'plc-tech-jr-derived':        'buildPlcTechBankQuestions',
  'security-tech-jr-derived':   'buildSecurityTechBankQuestions',
  'field-pm-jr-derived':        'buildFieldPmBankQuestions',
  'pump-tech-jr-derived':       'buildPumpTechBankQuestions',
};

async function getFileQuestions(name: string): Promise<QuestionRecord[] | null> {
  if (STATIC_JSON_FILES.has(name)) {
    try {
      const raw = readFileSync(join(process.cwd(), 'data', 'questions', name), 'utf-8');
      return JSON.parse(raw) as QuestionRecord[];
    } catch {
      return null;
    }
  }
  if (name in DERIVED_KEY_TO_FN) {
    const kb = await import('@/lib/exam/kitchenBank');
    const fn = kb[DERIVED_KEY_TO_FN[name] as keyof typeof kb] as unknown as () => QuestionRecord[];
    return fn();
  }
  return null;
}

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
  'solar-jr-fresh.json',
  'solar-jr-derived',
  'ev-jr-fresh.json',
  'ev-jr-derived',
  'dcp-jr-fresh.json',
  'dcp-jr-derived',
  'battery-jr-fresh.json',
  'battery-jr-derived',
  'dc-engineer-jr-fresh.json',
  'dc-engineer-jr-derived',
  'marine-jr-fresh.json',
  'marine-jr-derived',
  'pool-jr-fresh.json',
  'pool-jr-derived',
  'hvac-tech-jr-fresh.json',
  'hvac-tech-jr-derived',
  'solar-installer-jr-fresh.json',
  'solar-installer-jr-derived',
  'wind-turbine-jr-fresh.json',
  'wind-turbine-jr-derived',
  'elevator-tech-jr-fresh.json',
  'elevator-tech-jr-derived',
  'fire-alarm-tech-jr-fresh.json',
  'fire-alarm-tech-jr-derived',
  'bmet-tech-jr-fresh.json',
  'bmet-tech-jr-derived',
  'bas-tech-jr-fresh.json',
  'bas-tech-jr-derived',
  'ref-tech-jr-fresh.json',
  'ref-tech-jr-derived',
  'plc-tech-jr-fresh.json',
  'plc-tech-jr-derived',
  'security-tech-jr-fresh.json',
  'security-tech-jr-derived',
  'field-pm-jr-fresh.json',
  'field-pm-jr-derived',
  'pump-tech-jr-fresh.json',
  'pump-tech-jr-derived',
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

    const BATCH_SIZE = 500;

    for (const file of filesToImport) {
      const questions = await getFileQuestions(file);
      if (!questions || questions.length === 0) {
        filesNotFound.push(file);
        continue;
      }

      // Build all batches then commit them in parallel to reduce round-trips.
      // Wrap commits in a 40-second deadline so a hung gRPC connection never
      // blocks the response — the client will receive a 500 and move on.
      const batches: ReturnType<typeof adminDb.batch>[] = [];
      let count = 0;
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
          count++;
        }
        batches.push(batch);
      }
      const deadline = new Promise<never>((_, rej) =>
        setTimeout(() => rej(new Error(`Firestore write timed out for ${file}`)), 40_000)
      );
      await Promise.race([Promise.all(batches.map((b) => b.commit())), deadline]);
      totalCreated += count;

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
