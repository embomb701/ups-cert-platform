import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

// This webhook handler (route.ts, ~1550 lines) is a Next.js route file —
// it can only export HTTP method handlers (Next's own generated types
// reject anything else), and it touches live Stripe/Firestore clients at
// import time, so it can't be imported directly in a unit test without a
// much larger refactor. Instead, these tests read the source as text and
// verify the structural invariants that actually matter for a payment
// webhook: every sellable product has a handler, no case label silently
// shadows another, and every package grants exactly its own course's
// training + test-out access — not a copy-pasted neighbor's.
//
// This is deliberately not exhaustive of runtime behavior; it exists to
// catch the specific bug class this file invites (adding/renaming a
// product and forgetting a matching case, or copy-pasting a course block
// and missing a rename) before it ships.

const routeSrc = readFileSync(join(__dirname, 'route.ts'), 'utf8');
const stripeClientSrc = readFileSync(join(process.cwd(), 'src/lib/stripe/client.ts'), 'utf8');
const dataIndexSrc = readFileSync(join(process.cwd(), 'src/data/index.ts'), 'utf8');

function extractStripeProductKeys(): string[] {
  return [...stripeClientSrc.matchAll(/^\s{2}(\w+):\s*\{/gm)].map((m) => m[1]);
}

function extractCaseLabels(): string[] {
  return [...routeSrc.matchAll(/case '([^']+)':/g)].map((m) => m[1]);
}

function extractCourseSequenceKeys(): string[] {
  const block = dataIndexSrc.match(/COURSE_SEQUENCES: Record<string, TrainingModule\[\]> = \{([\s\S]*?)\n\};/);
  if (!block) throw new Error('Could not locate COURSE_SEQUENCES in src/data/index.ts — has it moved?');
  return [...block[1].matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1]);
}

interface CaseBlock {
  label: string;
  grantCalls: string[];
}

function extractCaseBlocks(): CaseBlock[] {
  const blockRe = /case '([^']+)':\s*\n((?:.*\n)*?)\s*break;/g;
  const blocks: CaseBlock[] = [];
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(routeSrc))) {
    const [, label, body] = m;
    blocks.push({ label, grantCalls: [...body.matchAll(/await (grant\w+)\(/g)].map((x) => x[1]) });
  }
  return blocks;
}

// Case labels that exist for backward compatibility with old Stripe price
// IDs and are NOT expected to appear in the current STRIPE_PRODUCTS catalog.
// If this list needs to grow, that's fine — but it should grow
// deliberately, not silently.
const KNOWN_LEGACY_ONLY_CASES = new Set(['training_portal', 'jr_fse_exam']);

describe('Stripe webhook — every sellable product has a handler', () => {
  it('has a switch case for every STRIPE_PRODUCTS key', () => {
    const productKeys = extractStripeProductKeys();
    const cases = new Set(extractCaseLabels());
    expect(productKeys.length).toBeGreaterThan(0); // sanity: the regex still matches something

    const uncovered = productKeys.filter((k) => !cases.has(k));
    expect(uncovered, `these STRIPE_PRODUCTS keys have no case — a purchase would silently no-op: ${uncovered.join(', ')}`).toEqual([]);
  });

  it('has no duplicate case labels (a duplicate silently shadows the first match)', () => {
    const cases = extractCaseLabels();
    const seen = new Map<string, number>();
    for (const c of cases) seen.set(c, (seen.get(c) ?? 0) + 1);
    const dupes = [...seen.entries()].filter(([, n]) => n > 1).map(([label]) => label);
    expect(dupes, `duplicate case labels found: ${dupes.join(', ')}`).toEqual([]);
  });

  it('has no case label that is neither a real product nor a known legacy alias', () => {
    const productKeys = new Set(extractStripeProductKeys());
    const cases = extractCaseLabels();
    const orphans = cases.filter((c) => !productKeys.has(c) && !KNOWN_LEGACY_ONLY_CASES.has(c));
    expect(orphans, `unexpected case label(s) matching neither a product nor a known legacy alias: ${orphans.join(', ')}`).toEqual([]);
  });
});

describe('Stripe webhook — package cases grant exactly two calls, training + test-out', () => {
  it('every pkg_* case calls exactly one *TrainingAccess and one other grant function', () => {
    const pkgBlocks = extractCaseBlocks().filter((b) => b.label.startsWith('pkg_'));
    expect(pkgBlocks.length).toBeGreaterThan(0);

    for (const b of pkgBlocks) {
      expect(b.grantCalls, `${b.label} should call exactly 2 grant functions, found: ${b.grantCalls.join(', ')}`).toHaveLength(2);
      const trainingCalls = b.grantCalls.filter((c) => /Training/.test(c));
      const otherCalls = b.grantCalls.filter((c) => !/Training/.test(c));
      expect(trainingCalls, `${b.label}: expected exactly one *TrainingAccess call`).toHaveLength(1);
      expect(otherCalls, `${b.label}: expected exactly one non-training (test-out) grant call`).toHaveLength(1);
    }
  });
});

describe('Stripe webhook — cross-trade bundle cases grant every one of their component courses', () => {
  // Unlike pkg_* (one course's training + its own test-out), a bundle_* case
  // spans multiple courses' training access and nothing else — expressed
  // here explicitly per bundle so a bundle silently missing a component
  // course's grant call fails loudly instead of shipping a bundle that
  // charges for N courses but only unlocks N-1 of them.
  const bundles: Record<string, string[]> = {
    bundle_critical_power: [
      'grantTrainingAccess',
      'grantGeneratorTrainingAccess',
      'grantSwitchgearTechTrainingAccess',
      'grantDataCenterTrainingAccess',
    ],
    bundle_refrigeration: [
      'grantKitchenTrainingAccess',
      'grantRefTechTrainingAccess',
      'grantIndustrialRefTrainingAccess',
    ],
    bundle_renewable_energy: [
      'grantSolarTrainingAccess',
      'grantSolarInstTrainingAccess',
      'grantEvChargingTrainingAccess',
      'grantWindTechTrainingAccess',
    ],
    bundle_building_systems: [
      'grantBasTechTrainingAccess',
      'grantFireAlarmTechTrainingAccess',
      'grantBuildingCxTrainingAccess',
      'grantElevatorTechTrainingAccess',
    ],
  };

  it('every bundle_* case calls exactly its expected set of *TrainingAccess functions', () => {
    const bundleBlocks = extractCaseBlocks().filter((b) => b.label.startsWith('bundle_'));
    expect(bundleBlocks.length).toBe(Object.keys(bundles).length);

    for (const b of bundleBlocks) {
      const expected = bundles[b.label];
      expect(expected, `${b.label} has a case but no expected-calls entry in this test — add one`).toBeTruthy();
      expect(new Set(b.grantCalls), `${b.label}: expected exactly ${JSON.stringify(expected)}, found ${JSON.stringify(b.grantCalls)}`).toEqual(new Set(expected));
      // Every call in a bundle must be a *TrainingAccess call — no test-out
      // grants belong in a training-only bundle.
      for (const call of b.grantCalls) {
        expect(call, `${b.label}: ${call} is not a *Training* grant — bundles are training-only`).toMatch(/Training/);
      }
    }
  });

  it('every bundle_* product key in STRIPE_PRODUCTS has a case here', () => {
    const productKeys = extractStripeProductKeys().filter((k) => k.startsWith('bundle_'));
    const cases = new Set(extractCaseLabels());
    const uncovered = productKeys.filter((k) => !cases.has(k));
    expect(uncovered, `bundle products with no case: ${uncovered.join(', ')}`).toEqual([]);
  });
});

describe('Stripe webhook — every training grant writes to a real course key', () => {
  it("every training-grant function's first Firestore doc id is a real COURSE_SEQUENCES key", () => {
    const courseKeys = new Set(extractCourseSequenceKeys());
    const funcRe = /async function (grant\w*Training\w*|grantTrainingAccess)\(userId: string,[^)]*\) \{([\s\S]*?)\n\}/g;
    let m: RegExpExecArray | null;
    let checked = 0;
    while ((m = funcRe.exec(routeSrc))) {
      const [, name, body] = m;
      const firstDocId = body.match(/\.doc\('([^']+)'\)/)?.[1];
      expect(firstDocId, `${name}: expected at least one .doc('...') call`).toBeTruthy();
      expect(courseKeys.has(firstDocId!), `${name} writes to '${firstDocId}', which is not a key in COURSE_SEQUENCES`).toBe(true);
      checked++;
    }
    expect(checked).toBeGreaterThan(20); // sanity: we actually found the templated functions
  });
});
