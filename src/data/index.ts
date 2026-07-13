import { MODULES } from './modules';
import { MODULES_SCHEMATICS } from './modules-schematics';
import { MODULES_SAFETY } from './modules-safety';
import { MODULES_METERS } from './modules-meters';
import { MODULES_PART2 } from './modules-part2';
import { MODULES_PART3 } from './modules-part3';
import { MODULES_PART4 } from './modules-part4';
import { MODULES_PART5 } from './modules-part5';
import { KITCHEN_MODULES } from './kitchen-modules';
import { HVAC_MODULES } from './hvac-modules';
import { GENERATOR_MODULES } from './generator-modules';
import { DATACENTER_MODULES } from './datacenter-modules';
import type { TrainingModule } from './modules';

export type { QuizQ, Slide, TrainingModule } from './modules';
export { KITCHEN_MODULES, HVAC_MODULES, GENERATOR_MODULES, DATACENTER_MODULES };

// ALL_MODULES is the UPS course sequence (modules 1-28). Kitchen-specific
// modules live in KITCHEN_MODULES (nums 11-27) and HVAC-specific modules in
// HVAC_MODULES (course positions 13-25) so the UPS training-completion check
// (ALL_MODULES.every) is unaffected. Modules 1-10 are shared by all courses;
// the two generic refrigeration modules are shared by Kitchen and HVAC.
export const ALL_MODULES = [
  ...MODULES,
  ...MODULES_SCHEMATICS,
  ...MODULES_SAFETY,
  ...MODULES_METERS,
  ...MODULES_PART2,
  ...MODULES_PART3,
  ...MODULES_PART4,
  ...MODULES_PART5,
];

export function getModule(id: string): TrainingModule | null {
  return (
    ALL_MODULES.find((m) => m.id === id) ??
    KITCHEN_MODULES.find((m) => m.id === id) ??
    HVAC_MODULES.find((m) => m.id === id) ??
    GENERATOR_MODULES.find((m) => m.id === id) ??
    DATACENTER_MODULES.find((m) => m.id === id) ??
    null
  );
}

export function isKitchenModule(mod: TrainingModule): boolean {
  return mod.id.startsWith('kitchen-');
}

export function isHvacModule(mod: TrainingModule): boolean {
  return mod.id.startsWith('hvac-');
}

// ── Course sequences ────────────────────────────────────────────────────
// Ordered module lists per course (keyed by examAccess key), containing only
// BUILT modules. Used for the 3-day unlock rule (a module unlocks when the
// previous module in the user's enrolled course sequence is complete) and to
// derive which enrollments grant access to a module.
const byNum = (a: TrainingModule, b: TrainingModule) => a.num - b.num;
const FOUNDATION = ALL_MODULES.filter((m) => m.num <= 10).sort(byNum);
const byIds = (source: TrainingModule[], ids: string[]) =>
  ids.map((id) => source.find((m) => m.id === id)).filter((m): m is TrainingModule => !!m);

const HVAC_SHARED_KITCHEN_IDS = ['kitchen-refrigeration-cycle', 'kitchen-refrigeration-service'];
const BATTERY_CORE_IDS = ['battery-types', 'battery-safety'];

export const COURSE_SEQUENCES: Record<string, TrainingModule[]> = {
  training_portal: [...ALL_MODULES].sort(byNum),
  training_kitchen: [...FOUNDATION, ...[...KITCHEN_MODULES].sort(byNum)],
  training_hvac: [
    ...FOUNDATION,
    ...byIds(KITCHEN_MODULES, HVAC_SHARED_KITCHEN_IDS),
    ...[...HVAC_MODULES].sort(byNum),
  ],
  training_generator: [
    ...FOUNDATION,
    ...byIds(ALL_MODULES, BATTERY_CORE_IDS),
    ...[...GENERATOR_MODULES].sort(byNum),
  ],
  // Data Center CFT: assembled from existing UPS, Generator, and HVAC
  // modules in curriculum order, plus the dc-* specific modules.
  training_datacenter: [
    ...FOUNDATION,
    ...byIds(ALL_MODULES, ['ups-overview', 'pdu-sts', 'rectifiers', 'inverters', 'battery-types', 'battery-safety']),
    ...byIds(GENERATOR_MODULES, ['gen-starting-systems', 'gen-controls', 'gen-ats', 'gen-critical-power', 'gen-nfpa110']),
    ...byIds(HVAC_MODULES, ['hvac-psychrometrics', 'hvac-air-distribution', 'hvac-chillers-hydronics']),
    ...[...DATACENTER_MODULES].sort(byNum),
  ],
  // Solar/BESS, DC Plants, and Battery Tech share the battery core;
  // their course-specific modules join as they are built.
  training_solar: [...FOUNDATION, ...byIds(ALL_MODULES, BATTERY_CORE_IDS)],
  training_evcharging: [...FOUNDATION],
  training_dcplants: [...FOUNDATION, ...byIds(ALL_MODULES, BATTERY_CORE_IDS)],
  training_battery: [...FOUNDATION, ...byIds(ALL_MODULES, BATTERY_CORE_IDS)],
};

// Which examAccess doc(s) grant access to a module — derived from course
// sequence membership, so shared modules automatically accept every course
// that includes them.
export function accessKeysForModule(mod: TrainingModule): string[] {
  const keys = Object.entries(COURSE_SEQUENCES)
    .filter(([, seq]) => seq.some((m) => m.id === mod.id))
    .map(([key]) => key);
  return keys.length > 0 ? keys : ['training_portal'];
}

// Previous module for a course sequence (null if first or not in sequence).
export function prevModuleInCourse(courseKey: string, mod: TrainingModule): TrainingModule | null {
  const seq = COURSE_SEQUENCES[courseKey];
  if (!seq) return null;
  const idx = seq.findIndex((m) => m.id === mod.id);
  if (idx <= 0) return null;
  return seq[idx - 1];
}

// Candidate previous modules across the courses that include this module.
// The unlock rule accepts ANY enrolled course whose predecessor is complete
// — so shared modules unlock correctly for whichever course the student is on.
export function prevModuleCandidates(mod: TrainingModule, courseKeys?: string[]): TrainingModule[] {
  const keys = courseKeys ?? accessKeysForModule(mod);
  const seen = new Set<string>();
  const out: TrainingModule[] = [];
  for (const key of keys) {
    const prev = prevModuleInCourse(key, mod);
    if (prev && !seen.has(prev.id)) {
      seen.add(prev.id);
      out.push(prev);
    }
  }
  return out;
}

// Back-compat single-prev helper (UPS/kitchen callers). Prefer
// prevModuleCandidates for shared modules.
export function getPrevModule(mod: TrainingModule): TrainingModule | null {
  if (mod.num <= 1) return null;
  if (isHvacModule(mod)) return prevModuleInCourse('training_hvac', mod);
  if (mod.id.startsWith('gen-')) return prevModuleInCourse('training_generator', mod);
  if (mod.id.startsWith('dc-')) return prevModuleInCourse('training_datacenter', mod);
  if (isKitchenModule(mod) && mod.num > 11) {
    return KITCHEN_MODULES.find((m) => m.num === mod.num - 1) ?? null;
  }
  return ALL_MODULES.find((m) => m.num === mod.num - 1) ?? null;
}
