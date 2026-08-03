import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

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
import solarFresh from '../../../../../data/questions/solar-jr-fresh.json';
import evFresh from '../../../../../data/questions/ev-jr-fresh.json';
import dcpFresh from '../../../../../data/questions/dcp-jr-fresh.json';
import batteryFresh from '../../../../../data/questions/battery-jr-fresh.json';
import dcEngineerFresh from '../../../../../data/questions/dc-engineer-jr-fresh.json';
import marineFresh from '../../../../../data/questions/marine-jr-fresh.json';
import poolFresh from '../../../../../data/questions/pool-jr-fresh.json';
import hvacTechFresh from '../../../../../data/questions/hvac-tech-jr-fresh.json';
import solarInstFresh from '../../../../../data/questions/solar-installer-jr-fresh.json';
import windTechFresh from '../../../../../data/questions/wind-turbine-jr-fresh.json';
import elevatorTechFresh from '../../../../../data/questions/elevator-tech-jr-fresh.json';
import fireAlarmTechFresh from '../../../../../data/questions/fire-alarm-tech-jr-fresh.json';
import bmetTechFresh from '../../../../../data/questions/bmet-tech-jr-fresh.json';
import basTechFresh from '../../../../../data/questions/bas-tech-jr-fresh.json';
import refTechFresh from '../../../../../data/questions/ref-tech-jr-fresh.json';
import plcTechFresh from '../../../../../data/questions/plc-tech-jr-fresh.json';
import securityTechFresh from '../../../../../data/questions/security-tech-jr-fresh.json';
import fieldPmFresh from '../../../../../data/questions/field-pm-jr-fresh.json';
import pumpTechFresh from '../../../../../data/questions/pump-tech-jr-fresh.json';
// kitchenBank is NOT imported at module level — it pulls in ALL course data which
// balloons the cold-start bundle. We use a dynamic import inside getFileQuestions
// instead, so the chunk only loads when a derived bank is actually requested.

type QuestionRecord = Record<string, unknown>;

// Static JSON files — already in memory from webpack static imports.
const STATIC_FILES: Record<string, QuestionRecord[]> = {
  'jr-fsc-sample.json':             jrFscSample as QuestionRecord[],
  'jr-fse-all-questions.json':      jrFseAll as QuestionRecord[],
  'book-jr-fse-questions.json':     bookJrFse as QuestionRecord[],
  'fsc-sample.json':                fscSample as QuestionRecord[],
  'book-fse-questions.json':        bookFse as QuestionRecord[],
  'kitchen-jr-fse-fresh.json':      kitchenFresh as QuestionRecord[],
  'hvac-jr-fse-fresh.json':         hvacFresh as QuestionRecord[],
  'generator-jr-fse-fresh.json':    generatorFresh as QuestionRecord[],
  'datacenter-jr-fresh.json':       datacenterFresh as QuestionRecord[],
  'solar-jr-fresh.json':            solarFresh as QuestionRecord[],
  'ev-jr-fresh.json':               evFresh as QuestionRecord[],
  'dcp-jr-fresh.json':              dcpFresh as QuestionRecord[],
  'battery-jr-fresh.json':          batteryFresh as QuestionRecord[],
  'dc-engineer-jr-fresh.json':      dcEngineerFresh as QuestionRecord[],
  'marine-jr-fresh.json':           marineFresh as QuestionRecord[],
  'pool-jr-fresh.json':             poolFresh as QuestionRecord[],
  'hvac-tech-jr-fresh.json':        hvacTechFresh as QuestionRecord[],
  'solar-installer-jr-fresh.json':  solarInstFresh as QuestionRecord[],
  'wind-turbine-jr-fresh.json':     windTechFresh as QuestionRecord[],
  'elevator-tech-jr-fresh.json':    elevatorTechFresh as QuestionRecord[],
  'fire-alarm-tech-jr-fresh.json':  fireAlarmTechFresh as QuestionRecord[],
  'bmet-tech-jr-fresh.json':        bmetTechFresh as QuestionRecord[],
  'bas-tech-jr-fresh.json':         basTechFresh as QuestionRecord[],
  'ref-tech-jr-fresh.json':         refTechFresh as QuestionRecord[],
  'plc-tech-jr-fresh.json':         plcTechFresh as QuestionRecord[],
  'security-tech-jr-fresh.json':    securityTechFresh as QuestionRecord[],
  'field-pm-jr-fresh.json':         fieldPmFresh as QuestionRecord[],
  'pump-tech-jr-fresh.json':        pumpTechFresh as QuestionRecord[],
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
  if (name in STATIC_FILES) return STATIC_FILES[name];
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

    const BATCH_SIZE = 400;

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
