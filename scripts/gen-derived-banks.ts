/**
 * Pre-generates all derived question bank JSON files so the Vercel serverless
 * function can serve them via fs.readFileSync without importing kitchenBank.
 *
 * Run: npx tsx scripts/gen-derived-banks.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

import {
  buildKitchenBankQuestions,
  buildHvacBankQuestions,
  buildGeneratorBankQuestions,
  buildDataCenterBankQuestions,
  buildSolarBankQuestions,
  buildEvChargingBankQuestions,
  buildDcPlantsBankQuestions,
  buildBatteryBankQuestions,
  buildDcEngineerBankQuestions,
  buildMarineBankQuestions,
  buildPoolBankQuestions,
  buildHvacTechBankQuestions,
  buildSolarInstBankQuestions,
  buildWindTurbineBankQuestions,
  buildElevatorTechBankQuestions,
  buildFireAlarmTechBankQuestions,
  buildBmetTechBankQuestions,
  buildBasTechBankQuestions,
  buildRefTechBankQuestions,
  buildPlcTechBankQuestions,
  buildSecurityTechBankQuestions,
  buildFieldPmBankQuestions,
  buildPumpTechBankQuestions,
  buildSwitchgearTechBankQuestions,
  buildWaterWastewaterBankQuestions,
} from '../src/lib/exam/kitchenBank';

const BANKS: Record<string, () => unknown[]> = {
  'kitchen-jr-fse-derived':     buildKitchenBankQuestions,
  'hvac-jr-fse-derived':        buildHvacBankQuestions,
  'generator-jr-fse-derived':   buildGeneratorBankQuestions,
  'datacenter-jr-derived':      buildDataCenterBankQuestions,
  'solar-jr-derived':           buildSolarBankQuestions,
  'ev-jr-derived':              buildEvChargingBankQuestions,
  'dcp-jr-derived':             buildDcPlantsBankQuestions,
  'battery-jr-derived':         buildBatteryBankQuestions,
  'dc-engineer-jr-derived':     buildDcEngineerBankQuestions,
  'marine-jr-derived':          buildMarineBankQuestions,
  'pool-jr-derived':            buildPoolBankQuestions,
  'hvac-tech-jr-derived':       buildHvacTechBankQuestions,
  'solar-installer-jr-derived': buildSolarInstBankQuestions,
  'wind-turbine-jr-derived':    buildWindTurbineBankQuestions,
  'elevator-tech-jr-derived':   buildElevatorTechBankQuestions,
  'fire-alarm-tech-jr-derived': buildFireAlarmTechBankQuestions,
  'bmet-tech-jr-derived':       buildBmetTechBankQuestions,
  'bas-tech-jr-derived':        buildBasTechBankQuestions,
  'ref-tech-jr-derived':        buildRefTechBankQuestions,
  'plc-tech-jr-derived':        buildPlcTechBankQuestions,
  'security-tech-jr-derived':   buildSecurityTechBankQuestions,
  'field-pm-jr-derived':        buildFieldPmBankQuestions,
  'pump-tech-jr-derived':       buildPumpTechBankQuestions,
  'switchgear-tech-jr-derived': buildSwitchgearTechBankQuestions,
  'water-wastewater-jr-derived': buildWaterWastewaterBankQuestions,
};

const outDir = join(process.cwd(), 'data', 'questions');

for (const [name, builder] of Object.entries(BANKS)) {
  process.stdout.write(`  ${name}... `);
  const questions = builder();
  writeFileSync(join(outDir, `${name}.json`), JSON.stringify(questions));
  console.log(`${questions.length}q`);
}
console.log('Done — all derived banks written to data/questions/');
