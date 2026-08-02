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
import { buildKitchenBankQuestions, buildHvacBankQuestions, buildGeneratorBankQuestions, buildDataCenterBankQuestions, buildSolarBankQuestions, buildEvChargingBankQuestions, buildDcPlantsBankQuestions, buildBatteryBankQuestions, buildDcEngineerBankQuestions, buildMarineBankQuestions, buildPoolBankQuestions, buildHvacTechBankQuestions, buildSolarInstBankQuestions, buildWindTurbineBankQuestions, buildElevatorTechBankQuestions, buildFireAlarmTechBankQuestions, buildBmetTechBankQuestions, buildBasTechBankQuestions, buildRefTechBankQuestions, buildPlcTechBankQuestions, buildSecurityTechBankQuestions } from '@/lib/exam/kitchenBank';

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
  'solar-jr-fresh.json':       solarFresh as QuestionRecord[],
  'ev-jr-fresh.json':          evFresh as QuestionRecord[],
  'dcp-jr-fresh.json':         dcpFresh as QuestionRecord[],
  'battery-jr-fresh.json':     batteryFresh as QuestionRecord[],
  'dc-engineer-jr-fresh.json': dcEngineerFresh as QuestionRecord[],
  'marine-jr-fresh.json':      marineFresh as QuestionRecord[],
  'pool-jr-fresh.json':        poolFresh as QuestionRecord[],
  'hvac-tech-jr-fresh.json':   hvacTechFresh as QuestionRecord[],
  'solar-installer-jr-fresh.json': solarInstFresh as QuestionRecord[],
  'wind-turbine-jr-fresh.json': windTechFresh as QuestionRecord[],
  'elevator-tech-jr-fresh.json': elevatorTechFresh as QuestionRecord[],
  // Derived from course content (shared foundation + course-specific modules)
  'kitchen-jr-fse-derived':    buildKitchenBankQuestions() as unknown as QuestionRecord[],
  'hvac-jr-fse-derived':       buildHvacBankQuestions() as unknown as QuestionRecord[],
  'generator-jr-fse-derived':  buildGeneratorBankQuestions() as unknown as QuestionRecord[],
  'datacenter-jr-derived':     buildDataCenterBankQuestions() as unknown as QuestionRecord[],
  'solar-jr-derived':          buildSolarBankQuestions() as unknown as QuestionRecord[],
  'ev-jr-derived':             buildEvChargingBankQuestions() as unknown as QuestionRecord[],
  'dcp-jr-derived':            buildDcPlantsBankQuestions() as unknown as QuestionRecord[],
  'battery-jr-derived':        buildBatteryBankQuestions() as unknown as QuestionRecord[],
  'dc-engineer-jr-derived':    buildDcEngineerBankQuestions() as unknown as QuestionRecord[],
  'marine-jr-derived':         buildMarineBankQuestions() as unknown as QuestionRecord[],
  'pool-jr-derived':           buildPoolBankQuestions() as unknown as QuestionRecord[],
  'hvac-tech-jr-derived':      buildHvacTechBankQuestions() as unknown as QuestionRecord[],
  'solar-installer-jr-derived': buildSolarInstBankQuestions() as unknown as QuestionRecord[],
  'wind-turbine-jr-derived':   buildWindTurbineBankQuestions() as unknown as QuestionRecord[],
  'elevator-tech-jr-derived':  buildElevatorTechBankQuestions() as unknown as QuestionRecord[],
  'fire-alarm-tech-jr-fresh.json': fireAlarmTechFresh as unknown as QuestionRecord[],
  'fire-alarm-tech-jr-derived': buildFireAlarmTechBankQuestions() as unknown as QuestionRecord[],
  'bmet-tech-jr-fresh.json': bmetTechFresh as unknown as QuestionRecord[],
  'bmet-tech-jr-derived': buildBmetTechBankQuestions() as unknown as QuestionRecord[],
  'bas-tech-jr-fresh.json': basTechFresh as unknown as QuestionRecord[],
  'bas-tech-jr-derived': buildBasTechBankQuestions() as unknown as QuestionRecord[],
  'ref-tech-jr-fresh.json': refTechFresh as unknown as QuestionRecord[],
  'ref-tech-jr-derived': buildRefTechBankQuestions() as unknown as QuestionRecord[],
  'plc-tech-jr-fresh.json': plcTechFresh as unknown as QuestionRecord[],
  'plc-tech-jr-derived': buildPlcTechBankQuestions() as unknown as QuestionRecord[],
  'security-tech-jr-fresh.json': securityTechFresh as unknown as QuestionRecord[],
  'security-tech-jr-derived': buildSecurityTechBankQuestions() as unknown as QuestionRecord[],
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
