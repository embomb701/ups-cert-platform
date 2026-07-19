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

import { ALL_MODULES, KITCHEN_MODULES, HVAC_MODULES, GENERATOR_MODULES, EV_MODULES, COURSE_SEQUENCES } from '@/data/index';
import type { TrainingModule, QuizQ } from '@/data/modules';

const CHOICE_IDS = ['A', 'B', 'C', 'D'] as const;

type DerivedExamLevel = 'jr_kitchen_fse' | 'jr_hvac_fse' | 'jr_gen_fse' | 'jr_dc_cft' | 'jr_solar_fse' | 'jr_ev_tech';

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
