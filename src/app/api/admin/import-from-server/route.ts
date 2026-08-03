import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// All JSON files and kitchenBank are dynamically imported so NONE of this data
// appears in the cold-start bundle. The main chunk is tiny; each file's chunk
// is loaded from disk only when that specific file is requested.

type QuestionRecord = Record<string, unknown>;

// Each value is a thunk that dynamic-imports exactly one JSON file.
// webpack code-splits these into separate chunks at build time.
const STATIC_FILE_IMPORTERS: Record<string, () => Promise<{ default: QuestionRecord[] }>> = {
  'jr-fsc-sample.json':            () => import('../../../../../data/questions/jr-fsc-sample.json') as never,
  'jr-fse-all-questions.json':     () => import('../../../../../data/questions/jr-fse-all-questions.json') as never,
  'book-jr-fse-questions.json':    () => import('../../../../../data/questions/book-jr-fse-questions.json') as never,
  'fsc-sample.json':               () => import('../../../../../data/questions/fsc-sample.json') as never,
  'book-fse-questions.json':       () => import('../../../../../data/questions/book-fse-questions.json') as never,
  'kitchen-jr-fse-fresh.json':     () => import('../../../../../data/questions/kitchen-jr-fse-fresh.json') as never,
  'hvac-jr-fse-fresh.json':        () => import('../../../../../data/questions/hvac-jr-fse-fresh.json') as never,
  'generator-jr-fse-fresh.json':   () => import('../../../../../data/questions/generator-jr-fse-fresh.json') as never,
  'datacenter-jr-fresh.json':      () => import('../../../../../data/questions/datacenter-jr-fresh.json') as never,
  'solar-jr-fresh.json':           () => import('../../../../../data/questions/solar-jr-fresh.json') as never,
  'ev-jr-fresh.json':              () => import('../../../../../data/questions/ev-jr-fresh.json') as never,
  'dcp-jr-fresh.json':             () => import('../../../../../data/questions/dcp-jr-fresh.json') as never,
  'battery-jr-fresh.json':         () => import('../../../../../data/questions/battery-jr-fresh.json') as never,
  'dc-engineer-jr-fresh.json':     () => import('../../../../../data/questions/dc-engineer-jr-fresh.json') as never,
  'marine-jr-fresh.json':          () => import('../../../../../data/questions/marine-jr-fresh.json') as never,
  'pool-jr-fresh.json':            () => import('../../../../../data/questions/pool-jr-fresh.json') as never,
  'hvac-tech-jr-fresh.json':       () => import('../../../../../data/questions/hvac-tech-jr-fresh.json') as never,
  'solar-installer-jr-fresh.json': () => import('../../../../../data/questions/solar-installer-jr-fresh.json') as never,
  'wind-turbine-jr-fresh.json':    () => import('../../../../../data/questions/wind-turbine-jr-fresh.json') as never,
  'elevator-tech-jr-fresh.json':   () => import('../../../../../data/questions/elevator-tech-jr-fresh.json') as never,
  'fire-alarm-tech-jr-fresh.json': () => import('../../../../../data/questions/fire-alarm-tech-jr-fresh.json') as never,
  'bmet-tech-jr-fresh.json':       () => import('../../../../../data/questions/bmet-tech-jr-fresh.json') as never,
  'bas-tech-jr-fresh.json':        () => import('../../../../../data/questions/bas-tech-jr-fresh.json') as never,
  'ref-tech-jr-fresh.json':        () => import('../../../../../data/questions/ref-tech-jr-fresh.json') as never,
  'plc-tech-jr-fresh.json':        () => import('../../../../../data/questions/plc-tech-jr-fresh.json') as never,
  'security-tech-jr-fresh.json':   () => import('../../../../../data/questions/security-tech-jr-fresh.json') as never,
  'field-pm-jr-fresh.json':        () => import('../../../../../data/questions/field-pm-jr-fresh.json') as never,
  'pump-tech-jr-fresh.json':       () => import('../../../../../data/questions/pump-tech-jr-fresh.json') as never,
};

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
  if (name in STATIC_FILE_IMPORTERS) {
    const mod = await STATIC_FILE_IMPORTERS[name]();
    return mod.default;
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
      await Promise.all(batches.map((b) => b.commit()));
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
