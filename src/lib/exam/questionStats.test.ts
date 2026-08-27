import { describe, it, expect } from 'vitest';
import { wrongRatePct, rankWorstQuestions, type QuestionStatRow } from './questionStats';

function row(overrides: Partial<QuestionStatRow>): QuestionStatRow {
  return {
    id: 'q1',
    examLevel: 'jr_fse',
    category: 'Test Category',
    questionText: 'Sample question?',
    safetyCritical: false,
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
    ...overrides,
  };
}

describe('wrongRatePct', () => {
  it('returns 0 for a question never asked', () => {
    expect(wrongRatePct({ timesAsked: 0, timesWrong: 0 })).toBe(0);
  });

  it('computes the correct percentage', () => {
    expect(wrongRatePct({ timesAsked: 100, timesWrong: 37 })).toBe(37);
    expect(wrongRatePct({ timesAsked: 4, timesWrong: 1 })).toBe(25);
  });

  it('rounds to the nearest whole point', () => {
    expect(wrongRatePct({ timesAsked: 3, timesWrong: 1 })).toBe(33); // 33.33 -> 33
    expect(wrongRatePct({ timesAsked: 3, timesWrong: 2 })).toBe(67); // 66.67 -> 67
  });

  it('handles a 100% wrong-rate question', () => {
    expect(wrongRatePct({ timesAsked: 10, timesWrong: 10 })).toBe(100);
  });
});

describe('rankWorstQuestions', () => {
  it('excludes rows below the minimum sample size', () => {
    const rows = [
      row({ id: 'small-sample', timesAsked: 2, timesWrong: 2 }),   // 100% wrong but tiny sample
      row({ id: 'big-sample', timesAsked: 50, timesWrong: 10 }),   // 20% wrong, real sample
    ];
    const ranked = rankWorstQuestions(rows, 10);
    expect(ranked.map((r) => r.id)).toEqual(['big-sample']);
  });

  it('sorts worst wrong-rate first', () => {
    const rows = [
      row({ id: 'ok', timesAsked: 100, timesWrong: 10 }),      // 10%
      row({ id: 'bad', timesAsked: 100, timesWrong: 80 }),     // 80%
      row({ id: 'mid', timesAsked: 100, timesWrong: 40 }),     // 40%
    ];
    const ranked = rankWorstQuestions(rows, 10);
    expect(ranked.map((r) => r.id)).toEqual(['bad', 'mid', 'ok']);
  });

  it('breaks ties in wrong-rate by higher sample size first', () => {
    const rows = [
      row({ id: 'small', timesAsked: 20, timesWrong: 10 }),   // 50%, n=20
      row({ id: 'large', timesAsked: 200, timesWrong: 100 }), // 50%, n=200
    ];
    const ranked = rankWorstQuestions(rows, 10);
    expect(ranked.map((r) => r.id)).toEqual(['large', 'small']);
  });

  it('attaches the computed wrongRate to each row', () => {
    const rows = [row({ id: 'q1', timesAsked: 20, timesWrong: 5 })];
    const ranked = rankWorstQuestions(rows, 10);
    expect(ranked[0].wrongRate).toBe(25);
  });

  it('defaults to a minimum sample size of 10', () => {
    const rows = [row({ id: 'q1', timesAsked: 9, timesWrong: 9 })];
    expect(rankWorstQuestions(rows)).toEqual([]);
  });

  it('returns an empty array for an empty input', () => {
    expect(rankWorstQuestions([])).toEqual([]);
  });
});
