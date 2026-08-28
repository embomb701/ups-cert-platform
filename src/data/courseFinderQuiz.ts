// Data + scoring for the course-finder quiz (/course-finder). Not a certified
// aptitude instrument — a short, honest way to point someone at 2-3 tracks
// worth a closer look out of the 29 on the platform. Course ids reference
// TrainingCourse.id in src/data/courses.ts.

export interface QuizOption {
  label: string;
  weights: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'environment',
    question: 'Which of these sounds most like your ideal workday?',
    options: [
      {
        label: 'Data centers & mission-critical power rooms',
        weights: { ups: 3, datacenter: 3, dcengineer: 3, 'dc-ops': 3, dcplants: 3, battery: 3, 'switchgear-tech': 3 },
      },
      {
        label: 'Solar fields, generator yards, EV chargers',
        weights: { generator: 3, solar: 3, 'solar-inst': 3, evcharging: 3, 'wind-tech': 3 },
      },
      {
        label: 'Rooftops, mechanical rooms, walk-in coolers',
        weights: { hvac: 3, 'hvac-tech': 3, 'ref-tech': 3, 'industrial-ref': 3, pool: 3, 'pump-tech': 3 },
      },
      {
        label: 'Hospitals, office towers, big commercial buildings',
        weights: { 'building-cx': 3, 'bas-tech': 3, 'fire-alarm-tech': 3, 'elevator-tech': 3 },
      },
      {
        label: 'Restaurant kitchens & marinas',
        weights: { kitchen: 3, marine: 3 },
      },
      {
        label: 'Control panels, security racks, server rooms',
        weights: { 'plc-tech': 3, 'security-tech': 3, 'bmet-tech': 3, telecom: 3 },
      },
      {
        label: 'Leading the crew, not just running the tools',
        weights: { 'field-pm': 3 },
      },
    ],
  },
  {
    id: 'problem-type',
    question: 'What kind of problems do you like solving?',
    options: [
      {
        label: 'Electrical & power — panels, circuits, systems that keep the lights on',
        weights: { ups: 2, generator: 2, 'switchgear-tech': 2, battery: 2, dcplants: 2, evcharging: 2, solar: 2, 'solar-inst': 2 },
      },
      {
        label: 'Mechanical & fluid systems — motors, refrigerant, pumps',
        weights: { hvac: 2, 'hvac-tech': 2, 'ref-tech': 2, 'industrial-ref': 2, pool: 2, 'pump-tech': 2, kitchen: 2, marine: 2, 'water-wastewater': 2 },
      },
      {
        label: 'Software, networks & controls — programming, logic, integration',
        weights: { 'plc-tech': 2, 'bas-tech': 2, 'security-tech': 2, telecom: 2, dcengineer: 2, 'dc-ops': 2 },
      },
      {
        label: 'Physical & life-safety systems — moving parts, protecting people',
        weights: { 'elevator-tech': 2, 'fire-alarm-tech': 2, 'wind-tech': 2, 'building-cx': 2, 'bmet-tech': 2 },
      },
    ],
  },
  {
    id: 'travel',
    question: 'How do you feel about travel?',
    options: [
      {
        label: 'Love it — a different site every week',
        weights: { ups: 2, kitchen: 2, hvac: 2, generator: 2, datacenter: 2, solar: 2, dcengineer: 2 },
      },
      {
        label: "Some travel is fine, but I want a home base too",
        weights: { 'hvac-tech': 2, 'solar-inst': 2, 'elevator-tech': 2, 'fire-alarm-tech': 2, 'security-tech': 2, 'plc-tech': 2, 'ref-tech': 2, 'pump-tech': 2, 'bmet-tech': 2, telecom: 2 },
      },
      {
        label: "I'd rather own one site than travel between them",
        weights: { 'dc-ops': 2, 'building-cx': 2, 'bas-tech': 2, 'field-pm': 2, 'water-wastewater': 2 },
      },
    ],
  },
  {
    id: 'physical',
    question: "What's your physical comfort zone?",
    options: [
      {
        label: 'Heights, ladders, confined spaces',
        weights: { 'elevator-tech': 2, 'wind-tech': 2, telecom: 2, 'switchgear-tech': 2, marine: 2 },
      },
      {
        label: 'Lifting and hands-on mechanical work',
        weights: { hvac: 2, 'hvac-tech': 2, 'ref-tech': 2, 'industrial-ref': 2, 'pump-tech': 2, kitchen: 2, generator: 2, pool: 2 },
      },
      {
        label: 'Mostly at a bench, panel, or laptop',
        weights: { 'plc-tech': 2, 'security-tech': 2, 'bas-tech': 2, 'bmet-tech': 2, 'field-pm': 2, 'dc-ops': 2, dcengineer: 2 },
      },
    ],
  },
  {
    id: 'motivation',
    question: 'What pulls you toward this field in the first place?',
    options: [
      {
        label: 'Keeping hospitals & healthcare infrastructure running',
        weights: { 'bmet-tech': 2, ups: 2, datacenter: 2 },
      },
      {
        label: 'The AI and data center buildout',
        weights: { datacenter: 2, dcengineer: 2, 'dc-ops': 2, 'switchgear-tech': 2, battery: 2 },
      },
      {
        label: 'The renewable energy shift',
        weights: { solar: 2, 'solar-inst': 2, evcharging: 2, 'wind-tech': 2, battery: 2 },
      },
      {
        label: 'Buildings & mechanical systems, the steady classics',
        weights: { hvac: 2, 'hvac-tech': 2, 'ref-tech': 2, 'building-cx': 2, 'elevator-tech': 2, 'fire-alarm-tech': 2 },
      },
      {
        label: 'Food service, marine, or something off the beaten path',
        weights: { kitchen: 2, marine: 2, pool: 2 },
      },
    ],
  },
];

/** Ranks course ids by accumulated score, highest first. Stable on ties. */
export function rankCourseIds(scores: Record<string, number>): string[] {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
}
