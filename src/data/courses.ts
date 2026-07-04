export const SHARED_MODULE_IDS = [
  'intro-electricity',
  'electric-circuits',
  'electronic-components',
  'ac-dc-systems',
  'ohms-law-power',
  'scientific-notation',
  'electrical-drawings',
  'nfpa-70e',
  'loto',
  'meter-fundamentals',
] as const;

export interface KitchenModulePlaceholder {
  id: string;
  title: string;
  desc: string;
}

export const KITCHEN_MODULE_PLACEHOLDERS: KitchenModulePlaceholder[] = [
  {
    id: 'kitchen-refrigeration-cycle',
    title: 'The Refrigeration Cycle',
    desc: 'Thermodynamics, phase change, compression cycles, and how commercial refrigeration systems move heat',
  },
  {
    id: 'kitchen-refrigeration-equipment',
    title: 'Commercial Refrigeration Equipment',
    desc: 'Walk-ins, reach-ins, display cases, blast chillers, and refrigerant handling — EPA 608 overview',
  },
  {
    id: 'kitchen-refrigeration-service',
    title: 'Refrigeration Troubleshooting & Service',
    desc: 'Systematic fault diagnosis, refrigerant recovery, leak detection, and component replacement',
  },
  {
    id: 'kitchen-electric-cooking',
    title: 'Electric Commercial Cooking Equipment',
    desc: 'Fryers, conveyor ovens, griddles, steamers, and induction — heating elements, thermostats, and controls',
  },
  {
    id: 'kitchen-gas-systems',
    title: 'Gas Systems & Combustion Safety',
    desc: 'Gas supply lines, pressure regulators, solenoid valves, ignition systems, and combustion analysis',
  },
  {
    id: 'kitchen-ranges-combiovens',
    title: 'Ranges, Combi Ovens & Specialty Equipment',
    desc: 'Commercial ranges, combination steam/convection ovens, tilt skillets, and braising pans',
  },
  {
    id: 'kitchen-ventilation-fire',
    title: 'Ventilation, Hoods & Fire Suppression',
    desc: 'Exhaust hoods, make-up air, grease filters, Ansul and Amerex fire suppression — inspection and service',
  },
  {
    id: 'kitchen-dishwashers',
    title: 'Commercial Dishwashers & Warewashing',
    desc: 'Undercounter, door-type, and conveyor machines — wash/rinse temps, booster heaters, chemical dosing',
  },
  {
    id: 'kitchen-ice-machines',
    title: 'Ice Machines',
    desc: 'Harvest cycles, water treatment, refrigerant circuits — full PM and troubleshooting for commercial ice',
  },
  {
    id: 'kitchen-beverage-equipment',
    title: 'Coffee, Espresso & Beverage Equipment',
    desc: 'Commercial espresso machines, brewers, frozen beverage dispensers, and post-mix systems',
  },
  {
    id: 'kitchen-holding-display',
    title: 'Food Holding, Display & Merchandising',
    desc: 'Hot holding cabinets, steam tables, refrigerated display cases, and precision temperature control',
  },
  {
    id: 'kitchen-digital-controls',
    title: 'Digital Controls & Connectivity',
    desc: 'Microprocessor controls, error code diagnosis, IoT-connected kitchen equipment, and POS integration',
  },
  {
    id: 'kitchen-preventive-maintenance',
    title: 'Preventive Maintenance Programs',
    desc: 'PM schedules, service agreements, documentation standards, and warranty management',
  },
  {
    id: 'kitchen-troubleshooting',
    title: 'Systematic Troubleshooting & Diagnostics',
    desc: 'Fault isolation methodology, manufacturer diagnostic codes, and field repair decision trees',
  },
  {
    id: 'kitchen-startup-commissioning',
    title: 'Startup, Commissioning & Customer Handoff',
    desc: 'Equipment installation verification, startup checklists, operator training, and sign-off procedures',
  },
  {
    id: 'kitchen-career',
    title: 'Career in Commercial Kitchen Field Service',
    desc: 'Job market, EPA 608 certification path, customer relations, service pricing, and career advancement',
  },
];

export interface TrainingCourse {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  accessKey: string;
  certTitle: string;
  color: 'blue' | 'orange';
  totalModules: number;
  stripeProductId: string;
  testOutProductId: string;
  comingSoon: boolean;
}

export const COURSES: TrainingCourse[] = [
  {
    id: 'ups',
    title: 'UPS Field Service Engineering',
    shortTitle: 'UPS FSE',
    tagline: 'Service uninterruptible power supplies in data centers, hospitals, and critical infrastructure.',
    accessKey: 'training_portal',
    certTitle: 'Jr. UPS Field Service Engineer',
    color: 'blue',
    totalModules: 28,
    stripeProductId: 'training_course',
    testOutProductId: 'jr_fse_test_human',
    comingSoon: false,
  },
  {
    id: 'kitchen',
    title: 'Commercial Kitchen Field Service Engineering',
    shortTitle: 'Kitchen FSE',
    tagline: 'Service commercial kitchen equipment — refrigeration, cooking, warewashing, and controls.',
    accessKey: 'training_kitchen',
    certTitle: 'Jr. Commercial Kitchen Field Service Engineer',
    color: 'orange',
    totalModules: 26,
    stripeProductId: 'training_kitchen',
    testOutProductId: 'jr_kitchen_fse_test_human',
    comingSoon: true,
  },
];
