import { MODULES } from './modules';
import { MODULES_SCHEMATICS } from './modules-schematics';
import { MODULES_SAFETY } from './modules-safety';
import { MODULES_METERS } from './modules-meters';
import { MODULES_PART2 } from './modules-part2';
import { MODULES_PART3 } from './modules-part3';
import { MODULES_PART4 } from './modules-part4';
import { MODULES_PART5 } from './modules-part5';
import { KITCHEN_MODULES } from './kitchen-modules';
import type { TrainingModule } from './modules';

export type { QuizQ, Slide, TrainingModule } from './modules';
export { KITCHEN_MODULES };

// ALL_MODULES is the UPS course sequence (modules 1-28). Kitchen-specific
// modules live in KITCHEN_MODULES (nums 11-27) so the UPS training-completion
// check (ALL_MODULES.every) is unaffected. Modules 1-10 are shared by both
// courses.
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
  return ALL_MODULES.find((m) => m.id === id) ?? KITCHEN_MODULES.find((m) => m.id === id) ?? null;
}

export function isKitchenModule(mod: TrainingModule): boolean {
  return mod.id.startsWith('kitchen-');
}

// Which examAccess doc(s) grant access to a module. Shared foundation
// modules (1-10) are accessible from any course enrollment; the generic
// refrigeration modules are shared between the Kitchen and HVAC courses.
const HVAC_SHARED_KITCHEN_IDS = ['kitchen-refrigeration-cycle', 'kitchen-refrigeration-service'];

export function accessKeysForModule(mod: TrainingModule): string[] {
  if (isKitchenModule(mod)) {
    return HVAC_SHARED_KITCHEN_IDS.includes(mod.id)
      ? ['training_kitchen', 'training_hvac']
      : ['training_kitchen'];
  }
  if (mod.num <= 10) return ['training_portal', 'training_kitchen', 'training_hvac'];
  return ['training_portal'];
}

// Previous module within the module's own course sequence (for the 3-day
// unlock rule). Kitchen module 11 follows shared module 10; kitchen modules
// 12+ follow the kitchen sequence. UPS modules follow the UPS sequence.
export function getPrevModule(mod: TrainingModule): TrainingModule | null {
  if (mod.num <= 1) return null;
  if (isKitchenModule(mod) && mod.num > 11) {
    return KITCHEN_MODULES.find((m) => m.num === mod.num - 1) ?? null;
  }
  return ALL_MODULES.find((m) => m.num === mod.num - 1) ?? null;
}
