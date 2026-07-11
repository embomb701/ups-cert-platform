/**
 * Jr. Kitchen FSE question bank — derived from course content.
 *
 * Converts the slide quizzes and module tests of the kitchen course
 * (shared foundation modules 1-10 + kitchen modules 11-27) into
 * questionBank records with examLevel 'jr_kitchen_fse'. IDs are stable
 * (module id + slide/test index) so re-imports merge instead of duplicating.
 */

import { ALL_MODULES, KITCHEN_MODULES } from '@/data/index';
import type { TrainingModule, QuizQ } from '@/data/modules';

const CHOICE_IDS = ['A', 'B', 'C', 'D'] as const;

interface BankQuestion {
  id: string;
  examLevel: 'jr_kitchen_fse';
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
  mod: TrainingModule,
  subcategory: string,
  difficulty: 'easy' | 'medium' | 'hard',
): BankQuestion {
  return {
    id,
    examLevel: 'jr_kitchen_fse',
    category: mod.title,
    subcategory,
    difficulty,
    questionText: q.q,
    choices: q.a.map((text, i) => ({ id: CHOICE_IDS[i], text })),
    correctAnswerId: CHOICE_IDS[q.correct],
    explanation: q.exp,
    referenceBookSection: `Module ${mod.num} — ${mod.title}`,
    safetyCritical: /LOTO|lockout|NFPA|arc flash|high-limit|carbon monoxide|\bCO\b|suppression|interlock|asphyxi/i.test(q.q + q.exp),
    reviewRequired: false,
    active: true,
    estimatedTimeSeconds: 60,
    tags: [mod.id],
  };
}

export function buildKitchenBankQuestions(): BankQuestion[] {
  // Kitchen course = shared foundation modules 1-10 + kitchen modules 11-27
  const courseModules = [
    ...ALL_MODULES.filter((m) => m.num <= 10),
    ...KITCHEN_MODULES,
  ];

  const out: BankQuestion[] = [];
  for (const mod of courseModules) {
    mod.slides.forEach((slide, si) => {
      slide.quiz.forEach((q, qi) => {
        out.push(toBankQuestion(q, `kjr_${mod.id}_s${si}q${qi}`, mod, slide.title, 'easy'));
      });
    });
    mod.test.forEach((q, ti) => {
      out.push(toBankQuestion(q, `kjr_${mod.id}_t${ti}`, mod, 'Module Test', 'medium'));
    });
  }
  return out;
}
