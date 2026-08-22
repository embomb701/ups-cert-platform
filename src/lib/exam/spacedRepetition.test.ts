import { describe, it, expect } from 'vitest';
import {
  recordMiss,
  applyReviewAnswer,
  isDue,
  sortForReview,
  MIN_BOX,
  MAX_BOX,
  BOX_INTERVAL_DAYS,
} from './spacedRepetition';

const NOW = new Date('2026-01-15T12:00:00.000Z');

describe('recordMiss', () => {
  it('always resets to box 1, due immediately', () => {
    const result = recordMiss(NOW);
    expect(result.box).toBe(MIN_BOX);
    expect(result.mastered).toBe(false);
    expect(result.nextReviewAt).toEqual(NOW);
  });
});

describe('applyReviewAnswer', () => {
  it('resets to box 1 on a wrong answer, regardless of current box', () => {
    for (const box of [1, 2, 3, 4, 5]) {
      const result = applyReviewAnswer({ box, mastered: false }, false, NOW);
      expect(result.box).toBe(MIN_BOX);
      expect(result.mastered).toBe(false);
      expect(result.nextReviewAt).toEqual(NOW);
    }
  });

  it('advances one box on a correct answer below the top box', () => {
    const result = applyReviewAnswer({ box: 1, mastered: false }, true, NOW);
    expect(result.box).toBe(2);
    expect(result.mastered).toBe(false);
  });

  it('schedules the next review using that box\'s interval', () => {
    const result = applyReviewAnswer({ box: 2, mastered: false }, true, NOW);
    expect(result.box).toBe(3);
    const expected = new Date(NOW);
    expected.setDate(expected.getDate() + BOX_INTERVAL_DAYS[3]);
    expect(result.nextReviewAt).toEqual(expected);
  });

  it('marks mastered on a correct answer at the top box, without advancing further', () => {
    const result = applyReviewAnswer({ box: MAX_BOX, mastered: false }, true, NOW);
    expect(result.box).toBe(MAX_BOX);
    expect(result.mastered).toBe(true);
  });

  it('never produces a box outside [MIN_BOX, MAX_BOX]', () => {
    for (const box of [1, 2, 3, 4, 5]) {
      for (const correct of [true, false]) {
        const result = applyReviewAnswer({ box, mastered: false }, correct, NOW);
        expect(result.box).toBeGreaterThanOrEqual(MIN_BOX);
        expect(result.box).toBeLessThanOrEqual(MAX_BOX);
      }
    }
  });

  it('every box has a defined, non-negative interval, and intervals strictly increase', () => {
    const boxes = [1, 2, 3, 4, 5];
    let prev = -1;
    for (const b of boxes) {
      const interval = BOX_INTERVAL_DAYS[b];
      expect(interval).toBeGreaterThanOrEqual(0);
      expect(interval).toBeGreaterThan(prev);
      prev = interval;
    }
  });
});

describe('isDue', () => {
  it('is due when nextReviewAt is now or in the past', () => {
    expect(isDue({ mastered: false, nextReviewAt: NOW }, NOW)).toBe(true);
    expect(isDue({ mastered: false, nextReviewAt: new Date(NOW.getTime() - 1000) }, NOW)).toBe(true);
  });

  it('is not due when nextReviewAt is in the future', () => {
    expect(isDue({ mastered: false, nextReviewAt: new Date(NOW.getTime() + 1000) }, NOW)).toBe(false);
  });

  it('mastered questions are never due, even if nextReviewAt is in the past', () => {
    expect(isDue({ mastered: true, nextReviewAt: new Date(NOW.getTime() - 1000) }, NOW)).toBe(false);
  });
});

describe('sortForReview', () => {
  it('sorts soonest-due first', () => {
    const records = [
      { id: 'a', nextReviewAt: new Date('2026-01-20'), timesWrong: 1 },
      { id: 'b', nextReviewAt: new Date('2026-01-10'), timesWrong: 1 },
      { id: 'c', nextReviewAt: new Date('2026-01-15'), timesWrong: 1 },
    ];
    expect(sortForReview(records).map((r) => r.id)).toEqual(['b', 'c', 'a']);
  });

  it('breaks ties by timesWrong descending', () => {
    const records = [
      { id: 'a', nextReviewAt: new Date('2026-01-10'), timesWrong: 1 },
      { id: 'b', nextReviewAt: new Date('2026-01-10'), timesWrong: 3 },
      { id: 'c', nextReviewAt: new Date('2026-01-10'), timesWrong: 2 },
    ];
    expect(sortForReview(records).map((r) => r.id)).toEqual(['b', 'c', 'a']);
  });

  it('does not mutate the input array', () => {
    const records = [
      { id: 'a', nextReviewAt: new Date('2026-01-20'), timesWrong: 1 },
      { id: 'b', nextReviewAt: new Date('2026-01-10'), timesWrong: 1 },
    ];
    const original = [...records];
    sortForReview(records);
    expect(records).toEqual(original);
  });
});
