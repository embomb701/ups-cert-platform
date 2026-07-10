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

export type KitchenTrack =
  | 'Electrical Systems'
  | 'Refrigeration'
  | 'Fire, Gas & Ventilation'
  | 'Warewashing & Beverage'
  | 'Controls & Professional Service';

export interface KitchenModulePlaceholder {
  id: string;
  title: string;
  desc: string;
  track: KitchenTrack;
  chapters: string[];
}

// Modules 11–27, in teaching order. Foundation (modules 1–10, shared with the
// UPS program) covers basic electricity, NFPA-70E, LOTO, and meter skills.
export const KITCHEN_MODULE_PLACEHOLDERS: KitchenModulePlaceholder[] = [
  // ── ELECTRICAL SYSTEMS ─────────────────────────────────────────────────
  {
    id: 'kitchen-electrical-systems',
    title: 'Kitchen Equipment Electrical Systems',
    desc: 'How commercial kitchen equipment is powered and controlled — from the wall to the element',
    track: 'Electrical Systems',
    chapters: [
      'Kitchen power: 120/208/240/480V, single-phase and three-phase circuits',
      'Heating elements — calrod, tubular, and infrared: how they work and how they fail',
      'Motors, compressors, and fan circuits in kitchen equipment',
      'Contactors, relays, thermostats, and high-limit safety switches',
      'Reading kitchen equipment wiring diagrams and schematics',
      'Live testing vs dead testing on kitchen equipment (applying NFPA-70E and LOTO)',
    ],
  },
  {
    id: 'kitchen-electric-cooking',
    title: 'Electric Commercial Cooking Equipment',
    desc: 'Fryers, conveyor ovens, griddles, steamers, and induction — heating elements, thermostats, and controls',
    track: 'Electrical Systems',
    chapters: [
      'Electric fryers: elements, thermostats, high-limits, and oil management',
      'Griddles, ranges, and induction cooking technology',
      'Convection and conveyor ovens: airflow, elements, and belt drives',
      'Steamers and kettles: steam generation, water quality, and descaling',
      'Testing and replacing heating elements safely',
      'Common electric cooking failures and diagnosis flowcharts',
    ],
  },

  // ── REFRIGERATION ──────────────────────────────────────────────────────
  {
    id: 'kitchen-refrigeration-cycle',
    title: 'The Refrigeration Cycle',
    desc: 'Thermodynamics, phase change, compression cycles, and how commercial refrigeration systems move heat',
    track: 'Refrigeration',
    chapters: [
      'Heat, temperature, and phase change — the physics of moving heat',
      'The four components: compressor, condenser, metering device, evaporator',
      'Refrigerants and environmental regulations (EPA 608 overview)',
      'Pressure-temperature relationships, superheat, and subcooling',
      'Reading refrigeration gauges and system pressures',
    ],
  },
  {
    id: 'kitchen-refrigeration-equipment',
    title: 'Commercial Refrigeration Equipment',
    desc: 'Walk-ins, reach-ins, display cases, blast chillers, and refrigerant handling — EPA 608 overview',
    track: 'Refrigeration',
    chapters: [
      'Walk-in coolers and freezers: panels, doors, and evaporator placement',
      'Reach-ins, undercounters, and prep tables',
      'Blast chillers and flash freezing',
      'Defrost systems: electric, hot-gas, and off-cycle',
      'Door gaskets, hinges, frame heaters, and condensate drains',
    ],
  },
  {
    id: 'kitchen-refrigeration-service',
    title: 'Refrigeration Troubleshooting & Service',
    desc: 'Systematic fault diagnosis, refrigerant recovery, leak detection, and component replacement',
    track: 'Refrigeration',
    chapters: [
      'Systematic diagnosis: airflow first, then controls, then refrigerant',
      'Leak detection methods: electronic, bubble, and dye',
      'Refrigerant recovery, evacuation, and charging procedures',
      'Compressor testing: windings, capacitors, and start relays',
      'Coil cleaning and condenser maintenance',
      'Field case studies: warm walk-in, iced evaporator, short-cycling compressor',
    ],
  },
  {
    id: 'kitchen-ice-machines',
    title: 'Ice Machines',
    desc: 'Harvest cycles, water treatment, refrigerant circuits — full PM and troubleshooting for commercial ice',
    track: 'Refrigeration',
    chapters: [
      'Cube, flake, and nugget machines — how each makes ice',
      'The harvest cycle step by step',
      'Water filtration, scale, and water quality problems',
      'Cleaning and sanitization procedures (health code compliance)',
      'Error codes and troubleshooting by symptom',
    ],
  },
  {
    id: 'kitchen-holding-display',
    title: 'Food Holding, Display & Merchandising',
    desc: 'Hot holding cabinets, steam tables, refrigerated display cases, and precision temperature control',
    track: 'Refrigeration',
    chapters: [
      'Food safety temperatures and why they matter (HACCP basics for techs)',
      'Hot holding cabinets, steam tables, and bain-maries',
      'Refrigerated display and merchandising cases',
      'Temperature verification, calibration, and humidity control',
    ],
  },

  // ── FIRE, GAS & VENTILATION ────────────────────────────────────────────
  {
    id: 'kitchen-gas-systems',
    title: 'Gas Systems & Combustion Safety',
    desc: 'Gas supply lines, pressure regulators, solenoid valves, ignition systems, and combustion analysis',
    track: 'Fire, Gas & Ventilation',
    chapters: [
      'Natural gas vs propane: properties, pressures, and safety',
      'Gas supply: piping, shutoffs, and pressure regulators',
      'Manifolds, orifices, and burner adjustment',
      'Ignition systems: standing pilot, spark, and hot-surface',
      'Flame sensing: thermocouples and flame rectification',
      'Combustion analysis and carbon monoxide safety',
      'Leak testing procedures — every connection, every time',
    ],
  },
  {
    id: 'kitchen-ranges-combiovens',
    title: 'Ranges, Combi Ovens & Specialty Equipment',
    desc: 'Commercial ranges, combination steam/convection ovens, tilt skillets, and braising pans',
    track: 'Fire, Gas & Ventilation',
    chapters: [
      'Commercial ranges and burner service (gas and electric)',
      'Gas fryers: burners, thermopiles, and gas valves',
      'Combi ovens: steam + convection in one box',
      'Water treatment for combi ovens and steamers',
      'Tilt skillets, braising pans, and kettles',
      'Control calibration and temperature verification',
    ],
  },
  {
    id: 'kitchen-ventilation-fire',
    title: 'Ventilation, Hoods & Fire Suppression',
    desc: 'Exhaust hoods, make-up air, grease filters, Ansul and Amerex fire suppression — inspection and service',
    track: 'Fire, Gas & Ventilation',
    chapters: [
      'Hood types, capture velocity, and make-up air balance',
      'Grease filters, ductwork, and NFPA 96 requirements',
      'Wet-chemical fire suppression systems: tanks, nozzles, and detection lines',
      'Fusible links, manual pull stations, and automatic gas shutoff interlocks',
      'Inspection intervals and compliance documentation',
      'What a kitchen tech may and may not service — certification boundaries',
    ],
  },

  // ── WAREWASHING & BEVERAGE ─────────────────────────────────────────────
  {
    id: 'kitchen-dishwashers',
    title: 'Commercial Dishwashers & Warewashing',
    desc: 'Undercounter, door-type, and conveyor machines — wash/rinse temps, booster heaters, chemical dosing',
    track: 'Warewashing & Beverage',
    chapters: [
      'High-temp vs low-temp (chemical) sanitizing machines',
      'Undercounter, door-type, and conveyor machines',
      'Wash and rinse temperatures, booster heaters, and gauges',
      'Chemical dosing pumps and detergent systems',
      'Fill valves, drains, wash pumps, and wash arm service',
    ],
  },
  {
    id: 'kitchen-beverage-equipment',
    title: 'Coffee, Espresso & Beverage Equipment',
    desc: 'Commercial espresso machines, brewers, frozen beverage dispensers, and post-mix systems',
    track: 'Warewashing & Beverage',
    chapters: [
      'Commercial coffee brewers: spray heads, timers, and water delivery',
      'Espresso machines: boilers, group heads, and pressure',
      'Frozen beverage and soft-serve equipment',
      'Post-mix soda systems: carbonators, ratios, and refrigeration',
      'Water quality: the #1 killer of beverage equipment',
    ],
  },

  // ── CONTROLS & PROFESSIONAL SERVICE ────────────────────────────────────
  {
    id: 'kitchen-digital-controls',
    title: 'Digital Controls & Connectivity',
    desc: 'Microprocessor controls, error code diagnosis, IoT-connected kitchen equipment, and POS integration',
    track: 'Controls & Professional Service',
    chapters: [
      'Microprocessor controls: inputs, outputs, and sensors',
      'Reading and interpreting manufacturer error codes',
      'Temperature probes and sensor testing',
      'IoT-connected equipment and remote monitoring',
      'Firmware, configuration, and control board replacement',
    ],
  },
  {
    id: 'kitchen-preventive-maintenance',
    title: 'Preventive Maintenance Programs',
    desc: 'PM schedules, service agreements, documentation standards, and warranty management',
    track: 'Controls & Professional Service',
    chapters: [
      'Why PM sells: cost of downtime in a commercial kitchen',
      'PM checklists by equipment type',
      'Service agreements and documentation standards',
      'Warranty procedures and manufacturer relations',
    ],
  },
  {
    id: 'kitchen-troubleshooting',
    title: 'Systematic Troubleshooting & Diagnostics',
    desc: 'Fault isolation methodology, manufacturer diagnostic codes, and field repair decision trees',
    track: 'Controls & Professional Service',
    chapters: [
      'The universal diagnostic method: symptom → system → component',
      'Electrical, gas, and refrigeration decision trees',
      'Using service manuals and technical support effectively',
      'Repair vs replace: making the call in the field',
      'Capstone scenarios across all equipment classes',
    ],
  },
  {
    id: 'kitchen-startup-commissioning',
    title: 'Startup, Commissioning & Customer Handoff',
    desc: 'Equipment installation verification, startup checklists, operator training, and sign-off procedures',
    track: 'Controls & Professional Service',
    chapters: [
      'Installation verification: utilities, clearances, and ventilation',
      'Startup checklists by equipment type',
      'Operator training and customer handoff',
      'Sign-off documentation and liability',
    ],
  },
  {
    id: 'kitchen-career',
    title: 'Career in Commercial Kitchen Field Service',
    desc: 'Job market, EPA 608 certification path, customer relations, service pricing, and career advancement',
    track: 'Controls & Professional Service',
    chapters: [
      'The commercial kitchen service job market',
      'Certification path: EPA 608, CFESA, and manufacturer training',
      'Customer relations in an operating kitchen',
      'Service pricing, parts, and truck stock',
      'Career advancement: lead tech, service manager, and beyond',
    ],
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
    totalModules: 27,
    stripeProductId: 'training_kitchen',
    testOutProductId: 'jr_kitchen_fse_test_human',
    comingSoon: true,
  },
];
