import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ExamAttempt, ExamAnswer, Question } from '@/types';

// ---------------------------------------------------------------
// Fake Firestore — just enough of the chain the engine calls:
// adminDb.collection(name).doc(id).get() -> { exists, data(), id }
// ---------------------------------------------------------------
type FakeStore = Record<string, Record<string, any>>;

function makeFakeDb(store: FakeStore) {
  return {
    collection(name: string) {
      return {
        doc(id: string) {
          return {
            get: async () => {
              const data = store[name]?.[id];
              return {
                exists: data !== undefined,
                id,
                data: () => data,
              };
            },
          };
        },
      };
    },
  };
}

let fakeStore: FakeStore = {};

vi.mock('@/lib/firebase/admin', () => ({
  get adminDb() {
    return makeFakeDb(fakeStore);
  },
}));

// Import after the mock is registered so the module picks up the mocked adminDb.
const { scoreAttempt, generateCertNumber, shuffleArray, sanitizeQuestionsForClient, buildRandomizedChoiceOrder } =
  await import('./engine');

function makeQuestion(overrides: Partial<Question> = {}): Question {
  return {
    id: 'q1',
    examLevel: 'jr_fse',
    category: 'electrical',
    subcategory: 'basics',
    difficulty: 'easy',
    questionText: 'What is Ohm\'s Law?',
    choices: [
      { id: 'A', text: 'V = IR' },
      { id: 'B', text: 'P = VI' },
      { id: 'C', text: 'E = mc^2' },
      { id: 'D', text: 'F = ma' },
    ],
    correctAnswerId: 'A',
    explanation: 'V = IR is Ohm\'s Law.',
    referenceBookSection: '1.1',
    safetyCritical: false,
    reviewRequired: false,
    active: true,
    estimatedTimeSeconds: 60,
    tags: [],
    ...overrides,
  } as Question;
}

function makeAttempt(overrides: Partial<ExamAttempt> = {}): ExamAttempt {
  return {
    id: 'attempt1',
    userId: 'user1',
    email: 'user@example.com',
    productId: 'training_course',
    examLevel: 'jr_fse',
    status: 'in_progress',
    selectedQuestionIds: ['q1', 'q2'],
    randomizedQuestionOrder: ['q1', 'q2'],
    randomizedChoiceOrder: {},
    answers: [],
    passingScore: 80,
    suspiciousEvents: [],
    suspiciousEventsCount: 0,
    suspiciousRiskLevel: 'low',
    flaggedForReview: false,
    ...overrides,
  } as unknown as ExamAttempt;
}

beforeEach(() => {
  fakeStore = {};
});

describe('scoreAttempt', () => {
  it('scores 100% and passes when every answer is correct', async () => {
    fakeStore.examAttempts = { attempt1: makeAttempt() };
    fakeStore.questionBank = {
      q1: makeQuestion({ id: 'q1', correctAnswerId: 'A' }),
      q2: makeQuestion({ id: 'q2', correctAnswerId: 'B' }),
    };
    const answers: ExamAnswer[] = [
      { questionId: 'q1', selectedChoiceId: 'A', answeredAt: new Date(), timeSpentSeconds: 10 },
      { questionId: 'q2', selectedChoiceId: 'B', answeredAt: new Date(), timeSpentSeconds: 10 },
    ];

    const result = await scoreAttempt('attempt1', answers);

    expect(result.score).toBe(100);
    expect(result.correctCount).toBe(2);
    expect(result.passed).toBe(true);
  });

  it('scores 0% and fails when every answer is wrong', async () => {
    fakeStore.examAttempts = { attempt1: makeAttempt() };
    fakeStore.questionBank = {
      q1: makeQuestion({ id: 'q1', correctAnswerId: 'A' }),
      q2: makeQuestion({ id: 'q2', correctAnswerId: 'B' }),
    };
    const answers: ExamAnswer[] = [
      { questionId: 'q1', selectedChoiceId: 'C', answeredAt: new Date(), timeSpentSeconds: 10 },
      { questionId: 'q2', selectedChoiceId: 'D', answeredAt: new Date(), timeSpentSeconds: 10 },
    ];

    const result = await scoreAttempt('attempt1', answers);

    expect(result.score).toBe(0);
    expect(result.correctCount).toBe(0);
    expect(result.passed).toBe(false);
  });

  it('treats a null selectedChoiceId (unanswered) as incorrect, not a crash', async () => {
    fakeStore.examAttempts = { attempt1: makeAttempt({ selectedQuestionIds: ['q1'] }) };
    fakeStore.questionBank = { q1: makeQuestion({ id: 'q1', correctAnswerId: 'A' }) };
    const answers: ExamAnswer[] = [
      { questionId: 'q1', selectedChoiceId: null, answeredAt: new Date(), timeSpentSeconds: 90 },
    ];

    const result = await scoreAttempt('attempt1', answers);

    expect(result.correctCount).toBe(0);
    expect(result.score).toBe(0);
  });

  it('is a strict >= comparison against passingScore, not a rounded one', async () => {
    // 8/10 = 80% exactly, passingScore 80 -> should pass (>=, not >)
    fakeStore.examAttempts = {
      attempt1: makeAttempt({
        selectedQuestionIds: Array.from({ length: 10 }, (_, i) => `q${i}`),
        passingScore: 80,
      }),
    };
    fakeStore.questionBank = {};
    for (let i = 0; i < 10; i++) {
      fakeStore.questionBank[`q${i}`] = makeQuestion({ id: `q${i}`, correctAnswerId: 'A' });
    }
    const answers: ExamAnswer[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: `q${i}`,
      selectedChoiceId: i < 8 ? 'A' : 'B', // 8 correct, 2 wrong
      answeredAt: new Date(),
      timeSpentSeconds: 10,
    }));

    const result = await scoreAttempt('attempt1', answers);

    expect(result.score).toBe(80);
    expect(result.passed).toBe(true);
  });

  it('fails a candidate one question short of a custom, stricter passingScore', async () => {
    fakeStore.examAttempts = {
      attempt1: makeAttempt({
        selectedQuestionIds: Array.from({ length: 10 }, (_, i) => `q${i}`),
        passingScore: 90, // stricter than the 80 default
      }),
    };
    fakeStore.questionBank = {};
    for (let i = 0; i < 10; i++) {
      fakeStore.questionBank[`q${i}`] = makeQuestion({ id: `q${i}`, correctAnswerId: 'A' });
    }
    const answers: ExamAnswer[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: `q${i}`,
      selectedChoiceId: i < 8 ? 'A' : 'B', // 80%, below the 90% bar
      answeredAt: new Date(),
      timeSpentSeconds: 10,
    }));

    const result = await scoreAttempt('attempt1', answers);

    expect(result.score).toBe(80);
    expect(result.passed).toBe(false);
  });

  it('falls back to the 80% default when the attempt has no passingScore', async () => {
    const attempt = makeAttempt({ selectedQuestionIds: ['q1'] });
    delete (attempt as any).passingScore;
    fakeStore.examAttempts = { attempt1: attempt };
    fakeStore.questionBank = { q1: makeQuestion({ id: 'q1', correctAnswerId: 'A' }) };
    const answers: ExamAnswer[] = [
      { questionId: 'q1', selectedChoiceId: 'A', answeredAt: new Date(), timeSpentSeconds: 10 },
    ];

    const result = await scoreAttempt('attempt1', answers);

    expect(result.passed).toBe(true); // 100% clears the implied 80% default
  });

  it('throws when the attempt does not exist, rather than silently scoring nothing', async () => {
    fakeStore.examAttempts = {};

    await expect(scoreAttempt('missing-attempt', [])).rejects.toThrow('Attempt not found');
  });

  it('ignores answers for questions that are not part of the attempt (no client-side score inflation)', async () => {
    fakeStore.examAttempts = { attempt1: makeAttempt({ selectedQuestionIds: ['q1'] }) };
    fakeStore.questionBank = { q1: makeQuestion({ id: 'q1', correctAnswerId: 'A' }) };
    const answers: ExamAnswer[] = [
      { questionId: 'q1', selectedChoiceId: 'A', answeredAt: new Date(), timeSpentSeconds: 10 },
      // Injected answer for a question that was never part of this attempt.
      { questionId: 'not-in-attempt', selectedChoiceId: 'A', answeredAt: new Date(), timeSpentSeconds: 10 },
    ];

    const result = await scoreAttempt('attempt1', answers);

    expect(result.correctCount).toBe(1);
    expect(result.score).toBe(100);
  });

  it('does not divide by zero when the attempt has no questions', async () => {
    fakeStore.examAttempts = { attempt1: makeAttempt({ selectedQuestionIds: [] }) };
    fakeStore.questionBank = {};

    const result = await scoreAttempt('attempt1', []);

    expect(result.score).toBe(0);
    expect(result.passed).toBe(false);
    expect(Number.isFinite(result.score)).toBe(true);
  });
});

describe('generateCertNumber', () => {
  it('uses the correct prefix for each known exam level', () => {
    const cases: Array<[Parameters<typeof generateCertNumber>[0], string]> = [
      ['jr_fse', 'JR'],
      ['jr_kitchen_fse', 'KJR'],
      ['jr_hvac_fse', 'HJR'],
      ['jr_gen_fse', 'GJR'],
      ['jr_dc_cft', 'DCT'],
      ['jr_solar_fse', 'SJR'],
      ['jr_ev_tech', 'EVT'],
      ['jr_dcp_tech', 'DCP'],
      ['jr_battery_tech', 'BAT'],
      ['jr_dc_engineer', 'DCE'],
      ['jr_marine_tech', 'MAR'],
      ['jr_pool_tech', 'POL'],
      ['jr_hvac_tech', 'HVT'],
      ['jr_solar_inst', 'SLR'],
      ['jr_wind_tech', 'WND'],
      ['jr_elevator_tech', 'ELV'],
      ['jr_fire_alarm_tech', 'FAT'],
      ['jr_bmet_tech', 'BMT'],
      ['jr_bas_tech', 'BAS'],
      ['jr_ref_tech', 'REF'],
      ['jr_plc_tech', 'PLC'],
      ['jr_security_tech', 'SEC'],
      ['jr_field_pm', 'FPM'],
      ['jr_pump_tech', 'PMP'],
      ['jr_industrial_ref', 'IRF'],
      ['jr_dc_ops', 'DCO'],
      ['jr_building_cx', 'BCX'],
      ['jr_telecom_tech', 'TEL'],
      ['jr_switchgear_tech', 'SWG'],
      ['fse', 'FSE'],
    ];
    for (const [level, prefix] of cases) {
      expect(generateCertNumber(level)).toMatch(new RegExp(`^${prefix}-\\d{4}-[0-9A-F]{8}$`));
    }
  });

  it('includes the current calendar year', () => {
    const year = new Date().getFullYear();
    expect(generateCertNumber('jr_fse')).toContain(`-${year}-`);
  });

  it('generates a different random suffix on each call', () => {
    const a = generateCertNumber('jr_fse');
    const b = generateCertNumber('jr_fse');
    expect(a).not.toBe(b);
  });
});

describe('shuffleArray', () => {
  it('returns an array with the same elements (no items lost or duplicated)', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result).toHaveLength(input.length);
    expect([...result].sort()).toEqual([...input].sort());
  });

  it('does not mutate the original array', () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    shuffleArray(input);
    expect(input).toEqual(copy);
  });

  it('actually reorders elements (deterministic check via a mocked RNG)', () => {
    const input = ['a', 'b', 'c', 'd'];
    // Force Math.random to always return 0, which drives Fisher-Yates
    // to a specific, predictable reversal-like permutation.
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0);
    const result = shuffleArray(input);
    spy.mockRestore();
    expect(result).not.toEqual(input);
  });

  it('handles empty and single-element arrays without error', () => {
    expect(shuffleArray([])).toEqual([]);
    expect(shuffleArray([1])).toEqual([1]);
  });
});

describe('sanitizeQuestionsForClient', () => {
  it('strips correctAnswerId and explanation before the question reaches the browser', () => {
    const q = makeQuestion({ correctAnswerId: 'A', explanation: 'Because physics.' });
    const [safe] = sanitizeQuestionsForClient([q]);

    expect(safe).not.toHaveProperty('correctAnswerId');
    expect(safe).not.toHaveProperty('explanation');
    expect(safe.id).toBe(q.id);
    expect(safe.choices).toEqual(q.choices);
  });
});

describe('buildRandomizedChoiceOrder', () => {
  it('produces a shuffled order containing exactly each question\'s own choice ids', () => {
    const q1 = makeQuestion({ id: 'q1', choices: [{ id: 'A', text: '' }, { id: 'B', text: '' }, { id: 'C', text: '' }] });
    const q2 = makeQuestion({ id: 'q2', choices: [{ id: 'A', text: '' }, { id: 'B', text: '' }] });

    const order = buildRandomizedChoiceOrder([q1, q2]);

    expect([...order.q1].sort()).toEqual(['A', 'B', 'C']);
    expect([...order.q2].sort()).toEqual(['A', 'B']);
  });
});
