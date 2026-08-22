/**
 * Spaced repetition for missed-question review.
 *
 * A 5-box Leitner schedule. A question only enters box 1 the first time a
 * student misses it on a practice attempt. From there:
 *   - Wrong answer  → back to box 1, due immediately (now).
 *   - Correct answer → advance one box, next review pushed out by that
 *     box's interval.
 *   - Correct answer while already in the top box (5) → mastered; it drops
 *     out of the active review queue entirely.
 *
 * Kept as pure functions (no Firestore/date-now dependency baked in) so the
 * scheduling logic is fully unit-testable in isolation.
 */

export const MIN_BOX = 1;
export const MAX_BOX = 5;

// Days until the next review, keyed by the box the question is *in*.
// Box 1 is "just missed" — due immediately, no wait.
export const BOX_INTERVAL_DAYS: Record<number, number> = {
  1: 0,
  2: 1,
  3: 3,
  4: 7,
  5: 14,
};

export interface ReviewBoxState {
  box: number;
  mastered: boolean;
}

export interface ReviewResult {
  box: number;
  mastered: boolean;
  nextReviewAt: Date;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * A student just missed this question on a practice attempt (or is seeing
 * it for the first time as a miss). Always resets to box 1, due now.
 */
export function recordMiss(now: Date): ReviewResult {
  return { box: MIN_BOX, mastered: false, nextReviewAt: now };
}

/**
 * A student answered a review-queue question. `current` is the question's
 * state before this answer (defaults to a fresh box-1 miss if it has never
 * been reviewed before, i.e. this is the first time it's ever been missed).
 */
export function applyReviewAnswer(
  current: ReviewBoxState,
  correct: boolean,
  now: Date
): ReviewResult {
  if (!correct) {
    return { box: MIN_BOX, mastered: false, nextReviewAt: now };
  }

  if (current.box >= MAX_BOX) {
    // Correct while already at the top box — mastered, leaves the queue.
    return { box: current.box, mastered: true, nextReviewAt: now };
  }

  const nextBox = current.box + 1;
  return { box: nextBox, mastered: false, nextReviewAt: addDays(now, BOX_INTERVAL_DAYS[nextBox]) };
}

/** Is this record due for review right now? Mastered questions are never due. */
export function isDue(record: { mastered: boolean; nextReviewAt: Date }, now: Date): boolean {
  return !record.mastered && record.nextReviewAt.getTime() <= now.getTime();
}

/**
 * Sort due-soonest first, then by timesWrong descending (a question missed
 * repeatedly surfaces before one missed only once, once both are due).
 */
export function sortForReview<T extends { nextReviewAt: Date; timesWrong: number }>(records: T[]): T[] {
  return [...records].sort((a, b) => {
    const byDate = a.nextReviewAt.getTime() - b.nextReviewAt.getTime();
    if (byDate !== 0) return byDate;
    return b.timesWrong - a.timesWrong;
  });
}
