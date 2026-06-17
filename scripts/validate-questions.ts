#!/usr/bin/env ts-node
/**
 * validate-questions.ts
 * Validates question JSON files against the Question schema before import.
 *
 * Usage:
 *   npm run validate-questions
 *   npm run validate-questions -- --file data/questions/jr-fsc-sample.json
 */

import fs from 'fs';
import path from 'path';

interface AnswerChoice {
  id: string;
  text: string;
}

interface Question {
  id: string;
  examLevel: 'jr_fsc' | 'fsc';
  category: string;
  subcategory: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  questionText: string;
  choices: AnswerChoice[];
  correctAnswerId: string;
  explanation: string;
  referenceBookSection: string;
  safetyCritical: boolean;
  reviewRequired: boolean;
  active: boolean;
  estimatedTimeSeconds: number;
  tags: string[];
}

const VALID_EXAM_LEVELS = ['jr_fsc', 'fsc'];
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard', 'expert'];
const VALID_CHOICE_IDS = ['A', 'B', 'C', 'D'];

function validateQuestion(q: Record<string, unknown>, index: number): string[] {
  const errors: string[] = [];
  const prefix = `Question[${index}] id="${q.id ?? 'MISSING'}"`;

  if (!q.id || typeof q.id !== 'string' || q.id.trim() === '') {
    errors.push(`${prefix}: missing or empty "id"`);
  }

  if (!VALID_EXAM_LEVELS.includes(q.examLevel as string)) {
    errors.push(`${prefix}: invalid examLevel "${q.examLevel}" (must be jr_fsc or fsc)`);
  }

  if (!q.category || typeof q.category !== 'string') {
    errors.push(`${prefix}: missing "category"`);
  }

  if (!q.subcategory || typeof q.subcategory !== 'string') {
    errors.push(`${prefix}: missing "subcategory"`);
  }

  if (!VALID_DIFFICULTIES.includes(q.difficulty as string)) {
    errors.push(`${prefix}: invalid difficulty "${q.difficulty}"`);
  }

  if (!q.questionText || typeof q.questionText !== 'string' || (q.questionText as string).length < 10) {
    errors.push(`${prefix}: missing or too short "questionText"`);
  }

  if (!Array.isArray(q.choices) || (q.choices as unknown[]).length < 2) {
    errors.push(`${prefix}: "choices" must be an array with at least 2 items`);
  } else {
    const choices = q.choices as AnswerChoice[];
    for (const c of choices) {
      if (!VALID_CHOICE_IDS.includes(c.id)) {
        errors.push(`${prefix}: choice id "${c.id}" is invalid (must be A/B/C/D)`);
      }
      if (!c.text || c.text.trim() === '') {
        errors.push(`${prefix}: choice "${c.id}" has empty text`);
      }
    }

    const choiceIds = choices.map((c) => c.id);
    if (!choiceIds.includes(q.correctAnswerId as string)) {
      errors.push(`${prefix}: correctAnswerId "${q.correctAnswerId}" does not match any choice id`);
    }
  }

  if (!q.correctAnswerId || typeof q.correctAnswerId !== 'string') {
    errors.push(`${prefix}: missing "correctAnswerId"`);
  }

  if (!q.explanation || typeof q.explanation !== 'string' || (q.explanation as string).length < 20) {
    errors.push(`${prefix}: missing or too short "explanation"`);
  }

  if (!q.referenceBookSection || typeof q.referenceBookSection !== 'string') {
    errors.push(`${prefix}: missing "referenceBookSection"`);
  }

  if (typeof q.safetyCritical !== 'boolean') {
    errors.push(`${prefix}: "safetyCritical" must be boolean`);
  }

  if (typeof q.reviewRequired !== 'boolean') {
    errors.push(`${prefix}: "reviewRequired" must be boolean`);
  }

  if (typeof q.active !== 'boolean') {
    errors.push(`${prefix}: "active" must be boolean`);
  }

  if (typeof q.estimatedTimeSeconds !== 'number' || (q.estimatedTimeSeconds as number) < 10) {
    errors.push(`${prefix}: "estimatedTimeSeconds" must be a number >= 10`);
  }

  if (!Array.isArray(q.tags)) {
    errors.push(`${prefix}: "tags" must be an array`);
  }

  return errors;
}

function validateFile(filePath: string): void {
  console.log(`\nValidating: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ERROR: File not found: ${filePath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  let questions: Record<string, unknown>[];

  try {
    questions = JSON.parse(raw);
  } catch (e) {
    console.error(`  ERROR: Invalid JSON in ${filePath}: ${e}`);
    process.exit(1);
  }

  if (!Array.isArray(questions)) {
    console.error('  ERROR: Root must be a JSON array of question objects');
    process.exit(1);
  }

  const allErrors: string[] = [];
  const ids = new Set<string>();

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const errs = validateQuestion(q, i);
    allErrors.push(...errs);

    // Duplicate ID check
    const id = q.id as string;
    if (ids.has(id)) {
      allErrors.push(`Question[${i}]: DUPLICATE id "${id}"`);
    } else {
      ids.add(id);
    }
  }

  if (allErrors.length > 0) {
    console.error(`  FAILED — ${allErrors.length} error(s):`);
    allErrors.forEach((e) => console.error(`    ✗ ${e}`));
    process.exit(1);
  } else {
    console.log(`  PASSED — ${questions.length} questions validated, no errors`);
  }
}

// Main
const args = process.argv.slice(2);
const fileArg = args.indexOf('--file');

if (fileArg !== -1 && args[fileArg + 1]) {
  validateFile(args[fileArg + 1]);
} else {
  // Validate all sample files
  const defaultFiles = [
    path.join(__dirname, '../data/questions/jr-fsc-sample.json'),
    path.join(__dirname, '../data/questions/fsc-sample.json'),
  ];
  defaultFiles.forEach(validateFile);
}

console.log('\nValidation complete.\n');
