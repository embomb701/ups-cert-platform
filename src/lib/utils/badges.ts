import { COURSES } from '@/data/courses';

// ---------------------------------------------------------------
// Open Badges 2.0 (hosted verification, no baking/signing required —
// a reachable, stable assertion URL under our own domain IS the
// verification per spec) shared constants and lookups.
// ---------------------------------------------------------------

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const BADGE_ISSUER_ID = `${SITE_URL}/api/badges/issuer`;

// Advanced/proctored levels that aren't tied to a specific COURSES
// entry (the courses array only carries the Jr. training-track exam
// levels) get their titles here instead.
const STANDALONE_TITLES: Record<string, string> = {
  fse: 'UPS Field Service Engineer (Human Proctored)',
  fse_ai: 'UPS Field Service Engineer (AI Proctored)',
};

export function badgeTitleForExamLevel(examLevel: string): string {
  const course = COURSES.find((c) => c.examLevel === examLevel);
  return course?.certTitle ?? STANDALONE_TITLES[examLevel] ?? examLevel;
}

export function badgeColorForExamLevel(examLevel: string): string {
  const course = COURSES.find((c) => c.examLevel === examLevel);
  // Matches src/data/courses.ts `color` values to the hex each now actually
  // renders as on-site. "blue" specifically is NOT stock Tailwind blue —
  // tailwind.config.ts renames that key to a warm orange/copper accent
  // (see its "Palette philosophy" comment) — so a course with color:'blue'
  // needs its badge to use that same corrected value, not literal blue, or
  // the issued badge image would visually contradict the site it came from.
  const COLOR_HEX: Record<string, string> = {
    blue: '#ce480c', orange: '#f97316', teal: '#14b8a6', amber: '#f59e0b',
    violet: '#8b5cf6', yellow: '#eab308', green: '#22c55e', sky: '#0ea5e9',
    rose: '#f43f5e', cyan: '#06b6d4', emerald: '#10b981',
  };
  return COLOR_HEX[course?.color ?? ''] ?? '#6366f1';
}
