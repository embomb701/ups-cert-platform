import { MODULES } from './modules';
import { MODULES_SAFETY } from './modules-safety';
import { MODULES_METERS } from './modules-meters';
import { MODULES_PART2 } from './modules-part2';
import { MODULES_PART3 } from './modules-part3';
import { MODULES_PART4 } from './modules-part4';
import { MODULES_PART5 } from './modules-part5';

export type { QuizQ, Slide, TrainingModule } from './modules';

export const ALL_MODULES = [
  ...MODULES,
  ...MODULES_SAFETY,
  ...MODULES_METERS,
  ...MODULES_PART2,
  ...MODULES_PART3,
  ...MODULES_PART4,
  ...MODULES_PART5,
];

export function getModule(id: string) {
  return ALL_MODULES.find((m) => m.id === id) ?? null;
}
