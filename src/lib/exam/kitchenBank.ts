/**
 * Derived question banks — built from course content.
 *
 * Converts the slide quizzes and module tests of a course into
 * questionBank records. IDs are stable (prefix + module id + slide/test
 * index) so re-imports merge instead of duplicating.
 *
 * - Kitchen course (shared 1-10 + kitchen 11-27) → examLevel 'jr_kitchen_fse'
 * - HVAC course (shared 1-10 + refrigeration core + hvac 13-25) → 'jr_hvac_fse'
 */

import { ALL_MODULES, KITCHEN_MODULES, HVAC_MODULES, GENERATOR_MODULES, EV_MODULES, DCPLANTS_MODULES, BATTERY_MODULES, MARINE_MODULES, POOL_MODULES, HVAC_TECH_MODULES, SOLAR_INSTALLER_MODULES, WIND_TURBINE_MODULES, ELEVATOR_TECH_MODULES, FIRE_ALARM_TECH_MODULES, BMET_TECH_MODULES, BAS_TECH_MODULES, REF_TECH_MODULES, PLC_TECH_MODULES, SECURITY_TECH_MODULES, COURSE_SEQUENCES } from '@/data/index';
import type { TrainingModule, QuizQ } from '@/data/modules';

const CHOICE_IDS = ['A', 'B', 'C', 'D'] as const;

type DerivedExamLevel = 'jr_kitchen_fse' | 'jr_hvac_fse' | 'jr_gen_fse' | 'jr_dc_cft' | 'jr_solar_fse' | 'jr_ev_tech' | 'jr_dcp_tech' | 'jr_battery_tech' | 'jr_dc_engineer' | 'jr_marine_tech' | 'jr_pool_tech' | 'jr_hvac_tech' | 'jr_solar_inst' | 'jr_wind_tech' | 'jr_elevator_tech' | 'jr_fire_alarm_tech' | 'jr_bmet_tech' | 'jr_bas_tech' | 'jr_ref_tech' | 'jr_plc_tech' | 'jr_security_tech' | 'jr_field_pm' | 'jr_pump_tech';

interface BankQuestion {
  id: string;
  examLevel: DerivedExamLevel;
  category: string;
  subcategory: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionText: string;
  choices: { id: string; text: string }[];
  correctAnswerId: string;
  explanation: string;
  referenceBookSection: string;
  safetyCritical: boolean;
  reviewRequired: boolean;
  active: boolean;
  estimatedTimeSeconds: number;
  tags: string[];
}

function toBankQuestion(
  q: QuizQ,
  id: string,
  examLevel: DerivedExamLevel,
  mod: TrainingModule,
  subcategory: string,
  difficulty: 'easy' | 'medium' | 'hard',
): BankQuestion {
  return {
    id,
    examLevel,
    category: mod.title,
    subcategory,
    difficulty,
    questionText: q.q,
    choices: q.a.map((text, i) => ({ id: CHOICE_IDS[i], text })),
    correctAnswerId: CHOICE_IDS[q.correct],
    explanation: q.exp,
    referenceBookSection: `Module ${mod.num} — ${mod.title}`,
    safetyCritical: /LOTO|lockout|NFPA|arc flash|high-limit|carbon monoxide|\bCO\b|suppression|interlock|asphyxi|rollout|relief valve|Legionella|backdraft/i.test(q.q + q.exp),
    reviewRequired: false,
    active: true,
    estimatedTimeSeconds: 60,
    tags: [mod.id],
  };
}

function buildBank(
  courseModules: TrainingModule[],
  examLevel: DerivedExamLevel,
  idPrefix: string,
): BankQuestion[] {
  const out: BankQuestion[] = [];
  for (const mod of courseModules) {
    mod.slides.forEach((slide, si) => {
      slide.quiz.forEach((q, qi) => {
        out.push(toBankQuestion(q, `${idPrefix}_${mod.id}_s${si}q${qi}`, examLevel, mod, slide.title, 'easy'));
      });
    });
    mod.test.forEach((q, ti) => {
      out.push(toBankQuestion(q, `${idPrefix}_${mod.id}_t${ti}`, examLevel, mod, 'Module Test', 'medium'));
    });
  }
  return out;
}

const FOUNDATION = ALL_MODULES.filter((m) => m.num <= 10);
const REFRIGERATION_CORE = KITCHEN_MODULES.filter((m) =>
  ['kitchen-refrigeration-cycle', 'kitchen-refrigeration-service'].includes(m.id)
);

export function buildKitchenBankQuestions(): BankQuestion[] {
  return buildBank([...FOUNDATION, ...KITCHEN_MODULES], 'jr_kitchen_fse', 'kjr');
}

export function buildHvacBankQuestions(): BankQuestion[] {
  return buildBank([...FOUNDATION, ...REFRIGERATION_CORE, ...HVAC_MODULES], 'jr_hvac_fse', 'hjr');
}

const BATTERY_CORE = ALL_MODULES.filter((m) =>
  ['battery-types', 'battery-safety'].includes(m.id)
);

export function buildGeneratorBankQuestions(): BankQuestion[] {
  return buildBank([...FOUNDATION, ...BATTERY_CORE, ...GENERATOR_MODULES], 'jr_gen_fse', 'gjr');
}

export function buildDataCenterBankQuestions(): BankQuestion[] {
  // The DC course sequence IS the curriculum: foundation + shared cores + dc-* modules
  return buildBank(COURSE_SEQUENCES['training_datacenter'], 'jr_dc_cft', 'dct');
}

export function buildSolarBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_solar'], 'jr_solar_fse', 'sjr');
}

export function buildEvChargingBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_evcharging'], 'jr_ev_tech', 'evjr');
}

export function buildDcPlantsBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_dcplants'], 'jr_dcp_tech', 'dcpjr');
}

export function buildBatteryBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_battery'], 'jr_battery_tech', 'batjr');
}

export function buildDcEngineerBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_dcengineer'], 'jr_dc_engineer', 'dcejr');
}

export function buildMarineBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_marine'], 'jr_marine_tech', 'marjr');
}

export function buildPoolBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_pool'], 'jr_pool_tech', 'poljr');
}

export function buildHvacTechBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_hvac_tech'], 'jr_hvac_tech', 'hvtjr');
}

export function buildSolarInstBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_solar_inst'], 'jr_solar_inst', 'slrjr');
}

export function buildWindTurbineBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_wind_tech'], 'jr_wind_tech', 'wnjr');
}

export function buildElevatorTechBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_elevator_tech'], 'jr_elevator_tech', 'eljr');
}

export function buildFireAlarmTechBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_fire_alarm_tech'], 'jr_fire_alarm_tech', 'fatjr');
}

export function buildBmetTechBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_bmet_tech'], 'jr_bmet_tech', 'bmetjr');
}

export function buildBasTechBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_bas_tech'], 'jr_bas_tech', 'basjr');
}

export function buildRefTechBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_ref_tech'], 'jr_ref_tech', 'refjr');
}

export function buildPlcTechBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_plc_tech'], 'jr_plc_tech', 'plcjr');
}

export function buildSecurityTechBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_security_tech'], 'jr_security_tech', 'secjr');
}

export function buildFieldPmBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_field_pm'], 'jr_field_pm', 'fpmjr');
}

export function buildPumpTechBankQuestions(): BankQuestion[] {
  return buildBank(COURSE_SEQUENCES['training_pump_tech'], 'jr_pump_tech', 'pumjr');
}
