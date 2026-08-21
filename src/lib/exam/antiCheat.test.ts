import { describe, it, expect } from 'vitest';
import { calculateRiskScore, classifyRiskLevel, shouldFlagForReview, EVENT_WEIGHTS } from './antiCheat';
import type { SuspiciousEvent } from '@/types';

function ev(type: SuspiciousEvent['type'], count: number): SuspiciousEvent {
  return { type, count, lastOccurredAt: new Date() };
}

describe('calculateRiskScore', () => {
  it('returns 0 for no events', () => {
    expect(calculateRiskScore([])).toBe(0);
  });

  it('weights an event type by its configured weight', () => {
    // tab_switch weight is 3, so 2 occurrences = 6
    expect(calculateRiskScore([ev('tab_switch', 2)])).toBe(6);
  });

  it('caps a single event type at 5x its weight regardless of count', () => {
    // tab_switch weight 3, cap = 15. 100 occurrences should still cap at 15,
    // not blow the score up to 300 — a candidate who alt-tabs constantly
    // shouldn't score identically to someone who opened devtools once.
    expect(calculateRiskScore([ev('tab_switch', 100)])).toBe(15);
    expect(calculateRiskScore([ev('tab_switch', 5)])).toBe(15); // exactly at the cap boundary
    expect(calculateRiskScore([ev('tab_switch', 4)])).toBe(12); // just under the cap
  });

  it('sums contributions across multiple distinct event types', () => {
    // tab_switch: min(2*3, 15) = 6, devtools_detected: min(1*10, 50) = 10
    const score = calculateRiskScore([ev('tab_switch', 2), ev('devtools_detected', 1)]);
    expect(score).toBe(16);
  });

  it('defaults to weight 1 for a type not present in EVENT_WEIGHTS', () => {
    const unknown = { type: 'something_new' as SuspiciousEvent['type'], count: 3, lastOccurredAt: new Date() };
    expect(calculateRiskScore([unknown])).toBe(3);
  });

  it('scores the AI camera events, which carry the highest per-occurrence weight', () => {
    expect(calculateRiskScore([ev('ai_multiple_faces', 1)])).toBe(EVENT_WEIGHTS.ai_multiple_faces);
    expect(calculateRiskScore([ev('ai_no_face', 1)])).toBe(EVENT_WEIGHTS.ai_no_face);
    expect(calculateRiskScore([ev('ai_looking_away', 1)])).toBe(EVENT_WEIGHTS.ai_looking_away);
  });
});

describe('classifyRiskLevel — boundaries', () => {
  it('classifies 0 and 5 as low, 6 as medium (the low/medium boundary)', () => {
    expect(classifyRiskLevel(0)).toBe('low');
    expect(classifyRiskLevel(5)).toBe('low');
    expect(classifyRiskLevel(6)).toBe('medium');
  });

  it('classifies 15 as medium, 16 as high (the medium/high boundary)', () => {
    expect(classifyRiskLevel(15)).toBe('medium');
    expect(classifyRiskLevel(16)).toBe('high');
  });

  it('classifies 30 as high, 31 as critical (the high/critical boundary)', () => {
    expect(classifyRiskLevel(30)).toBe('high');
    expect(classifyRiskLevel(31)).toBe('critical');
  });

  it('classifies very large scores as critical', () => {
    expect(classifyRiskLevel(1000)).toBe('critical');
  });
});

describe('shouldFlagForReview', () => {
  it('does not flag low or medium risk', () => {
    expect(shouldFlagForReview('low')).toBe(false);
    expect(shouldFlagForReview('medium')).toBe(false);
  });

  it('flags high and critical risk', () => {
    expect(shouldFlagForReview('high')).toBe(true);
    expect(shouldFlagForReview('critical')).toBe(true);
  });
});

describe('EVENT_WEIGHTS — shared with the admin events route', () => {
  // src/app/api/admin/attempts/[id]/events/route.ts imports this constant
  // directly rather than keeping its own copy. This test exists mainly to
  // make sure a future edit here doesn't silently drop a key that route
  // depends on.
  it('has a positive weight for every event type SuspiciousEvent can carry', () => {
    const types: SuspiciousEvent['type'][] = [
      'tab_switch', 'blur', 'visibility_change', 'fullscreen_exit',
      'copy_attempt', 'paste_attempt', 'cut_attempt', 'right_click',
      'text_selection', 'devtools_detected',
      'ai_looking_away', 'ai_no_face', 'ai_multiple_faces',
    ];
    for (const t of types) {
      expect(EVENT_WEIGHTS[t], `missing/invalid weight for ${t}`).toBeGreaterThan(0);
    }
  });
});
