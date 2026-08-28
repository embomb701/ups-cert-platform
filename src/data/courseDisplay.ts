// Shared display/lookup tables for rendering course cards and routing to
// course hub pages. Colocated here (rather than in courses.ts) since these
// are presentation concerns, not curriculum data — used by the catalog grid
// and the course-finder quiz.

export const COURSE_TEXT_COLOR: Record<string, string> = {
  blue: 'text-blue-400', orange: 'text-orange-400', teal: 'text-teal-400',
  amber: 'text-amber-400', violet: 'text-violet-400', yellow: 'text-yellow-400',
  green: 'text-green-400', sky: 'text-sky-400', rose: 'text-rose-400',
  cyan: 'text-cyan-400', emerald: 'text-emerald-400',
};

export const COURSE_BORDER_COLOR: Record<string, string> = {
  blue: 'border-blue-800/50', orange: 'border-orange-800/50', teal: 'border-teal-800/50',
  amber: 'border-amber-800/50', violet: 'border-violet-800/50', yellow: 'border-yellow-800/50',
  green: 'border-green-800/50', sky: 'border-sky-800/50', rose: 'border-rose-800/50',
  cyan: 'border-cyan-800/50', emerald: 'border-emerald-800/50',
};

export const COURSE_CATEGORIES: { label: string; ids: string[] }[] = [
  {
    label: 'Critical Power & Data Center',
    ids: ['ups', 'datacenter', 'dcengineer', 'dc-ops', 'dcplants', 'battery', 'switchgear-tech'],
  },
  {
    label: 'Generation & Renewables',
    ids: ['generator', 'solar', 'solar-inst', 'evcharging', 'wind-tech'],
  },
  {
    label: 'HVAC & Mechanical',
    ids: ['hvac', 'hvac-tech', 'ref-tech', 'industrial-ref', 'pool', 'pump-tech'],
  },
  {
    label: 'Building & Facilities',
    ids: ['building-cx', 'bas-tech', 'fire-alarm-tech', 'elevator-tech'],
  },
  {
    label: 'Kitchen & Specialty',
    ids: ['kitchen', 'marine'],
  },
  {
    label: 'Controls, IT & Safety',
    ids: ['plc-tech', 'security-tech', 'bmet-tech', 'telecom'],
  },
  {
    label: 'Management',
    ids: ['field-pm'],
  },
  {
    label: 'Free Courses',
    ids: ['critical-environment'],
  },
];

export const COURSE_HUB_ROUTES: Record<string, string> = {
  ups: '/training/ups', kitchen: '/training/kitchen', hvac: '/training/hvac',
  generator: '/training/generator', solar: '/training/solar', battery: '/training/battery',
  datacenter: '/training/datacenter', 'dc-ops': '/training/dc-ops', dcplants: '/training/dcplants',
  evcharging: '/training/evcharging', 'industrial-ref': '/training/industrial-ref',
  'building-cx': '/training/building-cx', telecom: '/training/telecom',
  'critical-environment': '/training/critical-environment',
  dcengineer: '/training/dcengineer', marine: '/training/marine', pool: '/training/pool',
  'hvac-tech': '/training/hvac-tech', 'solar-inst': '/training/solar-inst',
  'wind-tech': '/training/wind-tech', 'elevator-tech': '/training/elevator-tech',
  'fire-alarm-tech': '/training/fire-alarm-tech', 'bmet-tech': '/training/bmet-tech',
  'bas-tech': '/training/bas-tech', 'ref-tech': '/training/ref-tech',
  'plc-tech': '/training/plc-tech', 'security-tech': '/training/security-tech',
  'field-pm': '/training/field-pm', 'pump-tech': '/training/pump-tech',
  'switchgear-tech': '/training/switchgear-tech',
};
