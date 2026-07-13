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

// ─────────────────────────────────────────────────────────────────────────
// HVAC FSE course outline — modules 11-25 (foundation 1-10 shared with all
// programs; modules 11-12 reuse the Kitchen course's generic refrigeration
// modules; 13-25 are HVAC-specific and in development).
// ─────────────────────────────────────────────────────────────────────────

export type HvacTrack =
  | 'Refrigeration Core'
  | 'Air & Comfort'
  | 'Heating & Cooling Equipment'
  | 'Controls & Building Systems'
  | 'Professional Service';

export interface HvacModulePlaceholder {
  id: string;
  title: string;
  desc: string;
  track: HvacTrack;
  chapters: string[];
  /** id of an existing module reused from another course (content already built) */
  sharedFrom?: string;
}

export const HVAC_MODULE_PLACEHOLDERS: HvacModulePlaceholder[] = [
  // ── REFRIGERATION CORE (shared with Kitchen FSE — content ready) ───────
  {
    id: 'kitchen-refrigeration-cycle',
    sharedFrom: 'kitchen-refrigeration-cycle',
    title: 'The Refrigeration Cycle',
    desc: 'Phase change, the four components, refrigerants, pressures, superheat and subcooling — identical physics whether the box cools food or a building',
    track: 'Refrigeration Core',
    chapters: [
      'Heat, phase change, and how refrigeration moves heat',
      'The four components: compressor, condenser, metering device, evaporator',
      'Refrigerants, EPA 608, superheat and subcooling',
    ],
  },
  {
    id: 'kitchen-refrigeration-service',
    sharedFrom: 'kitchen-refrigeration-service',
    title: 'Refrigeration Troubleshooting & Service',
    desc: 'Gauge diagnosis, leak detection, recovery/evacuation/charging, and compressor electrical testing — the sealed-system craft',
    track: 'Refrigeration Core',
    chapters: [
      'Reading the system: pressures, superheat, subcooling patterns',
      'Leak detection, recovery, and charging',
      'Compressor electrical diagnosis',
    ],
  },

  // ── AIR & COMFORT ───────────────────────────────────────────────────────
  {
    id: 'hvac-psychrometrics',
    title: 'Psychrometrics & Human Comfort',
    desc: 'What comfort actually is: the temperature-humidity relationship that all HVAC exists to control',
    track: 'Air & Comfort',
    chapters: [
      'Dry bulb, wet bulb, dew point, and relative humidity',
      'Reading the psychrometric chart (without fear)',
      'Sensible vs latent heat — why humidity is half the cooling job',
      'Comfort zones, setpoints, and why occupants complain',
      'Measuring air conditions: hygrometers and wet-bulb tools in the field',
    ],
  },
  {
    id: 'hvac-air-distribution',
    title: 'Air Distribution, Ductwork & Airflow',
    desc: 'Blowers, static pressure, CFM, filters, and balancing — most "refrigeration" complaints are airflow complaints',
    track: 'Air & Comfort',
    chapters: [
      'Blowers and fan laws: PSC, ECM, and belt-drive',
      'Static pressure: measuring with a manometer, total external static',
      'CFM measurement and the airflow targets (≈400 CFM/ton)',
      'Ductwork: supply, return, leakage, and common design sins',
      'Filters and MERV ratings — the cheapest fix in HVAC',
      'Balancing basics: dampers, registers, and room-by-room complaints',
    ],
  },

  // ── HEATING & COOLING EQUIPMENT ────────────────────────────────────────
  {
    id: 'hvac-split-heatpumps',
    title: 'Split Systems & Heat Pumps',
    desc: 'The workhorse: condensing units, air handlers, heat pumps, reversing valves, and defrost',
    track: 'Heating & Cooling Equipment',
    chapters: [
      'Split system anatomy: condenser, line set, evaporator coil, air handler',
      'Heat pumps: running the cycle backwards through the reversing valve',
      'Heat pump defrost cycles and auxiliary/emergency heat',
      'Mini-splits and VRF basics: inverter compressors and communicating controls',
      'Charging split systems: subcooling (TXV) and superheat (fixed orifice) methods',
      'Classic split-system failure patterns',
    ],
  },
  {
    id: 'hvac-rtus',
    title: 'Packaged Rooftop Units & Economizers',
    desc: 'RTUs: the commercial workhorse — cooling, gas heat, and free-cooling economizers in one curb-mounted box',
    track: 'Heating & Cooling Equipment',
    chapters: [
      'RTU anatomy and roof work safety',
      'Staging: multi-compressor and multi-burner capacity control',
      'Economizers: free cooling, dampers, actuators, and why most are broken',
      'Curb, condensate, and weather integrity',
      'RTU service rhythm: belts, bearings, coils, and controls',
    ],
  },
  {
    id: 'hvac-heating',
    title: 'Furnaces & Heating Systems',
    desc: 'Gas furnaces (heat exchangers, inducers, ignition sequences) and electric heat — building on the gas combustion module skills',
    track: 'Heating & Cooling Equipment',
    chapters: [
      'Gas furnace sequence of operation: call → inducer → pressure switch → ignition → flame proving → blower',
      'Heat exchangers: cracks, CO risk, and inspection',
      'Ignition systems and flame sensing (hot-surface, direct spark, flame rod)',
      'High-limit, rollout, and pressure switches — the safety chain',
      'Electric heat strips, sequencers, and heat pump auxiliary heat',
      'Condensing furnaces: secondary heat exchangers and condensate handling',
    ],
  },
  {
    id: 'hvac-chillers-hydronics',
    title: 'Chillers, Boilers & Hydronic Systems',
    desc: 'Water as the heat carrier: chilled water plants, cooling towers, boilers, pumps, and hydronic loops',
    track: 'Heating & Cooling Equipment',
    chapters: [
      'Hydronic principles: why big buildings move water instead of air',
      'Chillers: evaporator barrels, condenser water, and capacity control',
      'Cooling towers: approach, range, water treatment, and Legionella awareness',
      'Boilers and hot-water loops: aquastats, circulators, and expansion tanks',
      'Pumps, valves, and hydronic balancing basics',
      'The scope boundary: operator-level vs licensed chiller/boiler work',
    ],
  },
  {
    id: 'hvac-ventilation-iaq',
    title: 'Ventilation & Indoor Air Quality',
    desc: 'Outside air, CO2, filtration, and building pressure — the air people actually breathe',
    track: 'Heating & Cooling Equipment',
    chapters: [
      'Why buildings need outside air: ASHRAE 62.1 in plain language',
      'Demand-controlled ventilation and CO2 sensors',
      'ERVs and HRVs: recovering energy from exhaust air',
      'Filtration deep-dive: MERV, HEPA, and pressure-drop tradeoffs',
      'Building pressurization: infiltration, exfiltration, and door complaints',
      'IAQ complaints: diagnosing odors, humidity, and stuffiness systematically',
    ],
  },

  // ── CONTROLS & BUILDING SYSTEMS ────────────────────────────────────────
  {
    id: 'hvac-controls',
    title: 'Thermostats & 24V Control Circuits',
    desc: 'The R-W-Y-G-C alphabet: low-voltage control wiring, thermostats, and sequences of operation',
    track: 'Controls & Building Systems',
    chapters: [
      'The 24V transformer and the control-circuit alphabet (R, W, Y, G, C, O/B)',
      'Conventional, heat pump, and communicating thermostat wiring',
      'Sequences of operation: reading and verifying them with a meter',
      'Contactors, relays, and defrost boards in the control chain',
      'Smart thermostats: the C-wire problem and common mis-installs',
    ],
  },
  {
    id: 'hvac-bas',
    title: 'Building Automation, DDC & VFDs',
    desc: 'When the building runs the equipment: automation systems, sensors, and variable-speed drives',
    track: 'Controls & Building Systems',
    chapters: [
      'BAS/DDC architecture: controllers, sensors, actuators, and front-ends',
      'Common protocols in plain terms: BACnet, Modbus, and proprietary systems',
      'Sensors and calibration: temperature, pressure, CO2, and what drift does',
      'VFDs: what they do, basic parameters, and fault codes',
      'Working alongside controls contractors: the service boundary',
    ],
  },

  // ── PROFESSIONAL SERVICE ───────────────────────────────────────────────
  {
    id: 'hvac-refrigerants-charging',
    title: 'HVAC Refrigerants & Charging Practices',
    desc: 'R-410A to A2L transition, charging methods by metering device, and refrigerant-circuit discipline at HVAC scale',
    track: 'Professional Service',
    chapters: [
      'The refrigerant transition: R-22 legacy, R-410A, and A2L (R-454B, R-32)',
      'A2L handling: sensors, rated tools, and ventilation discipline',
      'Charging by subcooling, superheat, and weigh-in — choosing the right method',
      'Line sets: sizing, length limits, and oil return',
      'Filter-driers, sight glasses, and circuit accessories',
    ],
  },
  {
    id: 'hvac-preventive-maintenance',
    title: 'Seasonal Preventive Maintenance',
    desc: 'Spring cooling and fall heating PMs: the checklist discipline that carries HVAC service companies',
    track: 'Professional Service',
    chapters: [
      'Why HVAC PM is seasonal and how contracts are structured',
      'Cooling-season PM: coils, charge verification, drains, capacitors, amps',
      'Heating-season PM: heat exchangers, combustion, safeties, CO checks',
      'Documentation, baselines, and the recommendations pipeline',
    ],
  },
  {
    id: 'hvac-troubleshooting',
    title: 'HVAC Troubleshooting Capstone',
    desc: 'No-cool, no-heat, and comfort complaints: the universal method applied across airflow, refrigeration, and controls',
    track: 'Professional Service',
    chapters: [
      'The no-cool decision tree: power → controls → airflow → refrigeration',
      'The no-heat decision tree: call → safety chain → ignition → distribution',
      'Comfort complaints with healthy equipment: airflow, humidity, and zoning',
      'Cross-system reasoning: when controls, air, and refrigerant faults imitate each other',
      'Repair vs replace in HVAC: efficiency, refrigerant phase-outs, and honest framing',
    ],
  },
  {
    id: 'hvac-career',
    title: 'Career in HVAC Field Service',
    desc: 'The biggest trade of the three: licensing, NATE, unions, and where HVAC careers lead',
    track: 'Professional Service',
    chapters: [
      'The HVAC job market: residential, commercial, and industrial paths',
      'Certifications: EPA 608, NATE, state licensing, and manufacturer training',
      'Tools of the trade and building the van',
      'Career paths: lead, controls specialist, chiller tech, estimator, owner',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Generator (Power Generation) FSE course outline — modules 11-25.
// Foundation 1-10 shared with all programs; modules 11-12 reuse the UPS
// course's battery modules (content already built); 13-25 are
// generator-specific and in development.
// ─────────────────────────────────────────────────────────────────────────

export type GeneratorTrack =
  | 'Batteries & Starting'
  | 'Engines & Fuel'
  | 'Generation & Controls'
  | 'Transfer & Integration'
  | 'Compliance & Professional Service';

export interface GeneratorModulePlaceholder {
  id: string;
  title: string;
  desc: string;
  track: GeneratorTrack;
  chapters: string[];
  /** id of an existing module reused from another course (content already built) */
  sharedFrom?: string;
}

export const GENERATOR_MODULE_PLACEHOLDERS: GeneratorModulePlaceholder[] = [
  // ── BATTERIES & STARTING (11-12 shared with UPS FSE — content ready) ────
  {
    id: 'battery-types',
    sharedFrom: 'battery-types',
    title: 'Battery Types and Chemistry',
    desc: 'Lead-acid fundamentals, VRLA, and alternative chemistries — the same batteries that back UPS systems crank the generators',
    track: 'Batteries & Starting',
    chapters: [
      'Lead-acid battery fundamentals',
      'VRLA batteries and critical-power applications',
      'Alternative battery technologies (NiCd, NiMH, Li-ion)',
    ],
  },
  {
    id: 'battery-safety',
    sharedFrom: 'battery-safety',
    title: 'Battery Safety and Handling',
    desc: 'Hazards, PPE, installation, connection, and testing — battery discipline is identical across UPS and generator work',
    track: 'Batteries & Starting',
    chapters: [
      'Hazards and PPE requirements',
      'Battery installation and connection',
      'Battery testing and maintenance',
    ],
  },
  {
    id: 'gen-starting-systems',
    title: 'Starting Systems & Cranking Circuits',
    desc: 'Starters, battery chargers, and cranking circuits — the systems behind the #1 generator failure: failure to start',
    track: 'Batteries & Starting',
    chapters: [
      'Cranking circuits: starter motors, solenoids, and cabling',
      'Station battery chargers: float/equalize, alarms, and why they fail quietly',
      'Cranking-circuit diagnosis: voltage drop under crank (the meter test that finds it all)',
      'Block heaters and cold-start readiness',
      'Why generators fail to start: the statistics and the checklist',
    ],
  },

  // ── ENGINES & FUEL ──────────────────────────────────────────────────────
  {
    id: 'gen-engine-fundamentals',
    title: 'Diesel Engine Fundamentals',
    desc: 'The four-stroke diesel: compression ignition, turbocharging, governors, and the mechanical heart of standby power',
    track: 'Engines & Fuel',
    chapters: [
      'Four-stroke compression-ignition cycle',
      'Air systems: turbochargers, aftercoolers, and air filters',
      'Governors and speed control — why 1800 RPM means 60 Hz',
      'Engine protection: oil pressure, coolant temp, overspeed shutdowns',
      'Reading an engine: sight, sound, smoke color, and gauges',
    ],
  },
  {
    id: 'gen-gaseous-engines',
    title: 'Gaseous-Fueled Engines',
    desc: 'Natural gas and propane gensets: spark ignition, fuel trains, and the gas-safety discipline applied to engines',
    track: 'Engines & Fuel',
    chapters: [
      'Spark-ignition gaseous engines vs diesel',
      'Gas fuel trains: regulators, solenoid valves, and leak discipline',
      'Ignition systems and misfire diagnosis',
      'Derating, altitude, and fuel-quality realities',
      'Bi-fuel and dual-fuel configurations',
    ],
  },
  {
    id: 'gen-cooling-lubrication',
    title: 'Cooling, Lubrication & Block Heaters',
    desc: 'Radiators, coolant chemistry, oil systems, and the block heaters that make 10-second starts possible',
    track: 'Engines & Fuel',
    chapters: [
      'Cooling systems: radiators, thermostats, pumps, and remote radiators',
      'Coolant chemistry: mixtures, DCA/SCA additives, and testing',
      'Lubrication: oil circuits, pressures, analysis programs',
      'Block heaters: sizing, failure symptoms, and NFPA 110 start requirements',
      'Leaks, hoses, and belts: the walkaround that prevents failures',
    ],
  },
  {
    id: 'gen-fuel-systems',
    title: 'Diesel Fuel Systems, Storage & Quality',
    desc: 'Tanks, day tanks, transfer pumps, fuel polishing, and the fuel-quality problems that kill standby reliability',
    track: 'Engines & Fuel',
    chapters: [
      'Fuel paths: main tanks, day tanks, transfer pumps, and priming',
      'Injection systems overview: mechanical to common-rail',
      'Fuel quality: water, microbial growth ("diesel bug"), and polishing systems',
      'Tank compliance basics: containment, venting, and gauging',
      'Wet stacking: what underloaded diesels do to themselves',
    ],
  },

  // ── GENERATION & CONTROLS ───────────────────────────────────────────────
  {
    id: 'gen-alternators',
    title: 'Alternators & Voltage Regulation',
    desc: 'Synchronous alternators, excitation, and AVRs — where engine rotation becomes regulated electrical power',
    track: 'Generation & Controls',
    chapters: [
      'Synchronous alternator construction and operation',
      'Excitation systems: brushless exciters and PMGs',
      'Automatic voltage regulators: sensing, stability, and adjustment',
      'Frequency vs voltage: engine problems vs alternator problems',
      'Alternator testing: insulation, diodes, and winding checks',
    ],
  },
  {
    id: 'gen-controls',
    title: 'Generator Controllers, Sensors & Alarms',
    desc: 'The control panel: start sequences, sensors, alarm codes, and remote monitoring of standby assets',
    track: 'Generation & Controls',
    chapters: [
      'Controller anatomy: start/stop logic, cooldown timers, and modes',
      'Sensors and senders: pressure, temperature, speed, and level',
      'Alarm and shutdown hierarchies — warnings vs shutdowns',
      'Event logs and remote monitoring platforms',
      'The controller as witness: reading the story of a failed start',
    ],
  },

  // ── TRANSFER & INTEGRATION ─────────────────────────────────────────────
  {
    id: 'gen-ats',
    title: 'Automatic Transfer Switches',
    desc: 'The ATS: sensing the outage, starting the generator, and moving the load — open, delayed, and closed transition',
    track: 'Transfer & Integration',
    chapters: [
      'ATS anatomy and the transfer sequence end to end',
      'Open, delayed, and closed-transition transfer types',
      'Time delays: engine start, transfer, retransfer, and cooldown',
      'Exercisers and scheduled testing',
      'ATS service safety: two live sources in one cabinet',
    ],
  },
  {
    id: 'gen-paralleling',
    title: 'Paralleling & Switchgear Basics',
    desc: 'Multiple generators on one bus: synchronization, load sharing, and where entry-level scope ends',
    track: 'Transfer & Integration',
    chapters: [
      'Why parallel: capacity, redundancy, and load demand',
      'Synchronization: voltage, frequency, and phase matching',
      'Load sharing: droop and isochronous control in plain terms',
      'Paralleling switchgear: breakers, protection, and controls',
      'The scope boundary: what belongs to switchgear specialists',
    ],
  },
  {
    id: 'gen-critical-power',
    title: 'Generators in Critical Power Systems',
    desc: 'Where the generator meets the UPS: data centers, hospitals, and NEC emergency vs standby classifications',
    track: 'Transfer & Integration',
    chapters: [
      'The critical power chain: utility → ATS → generator → UPS → load',
      'NEC Article 700/701/702: emergency, legally required, and optional standby',
      'Hospital and life-safety systems: what the classifications demand',
      'Generator-UPS interaction: ride-through, frequency windows, and load steps',
      'Data center redundancy: N, N+1, 2N in the generator plant',
    ],
  },

  // ── COMPLIANCE & PROFESSIONAL SERVICE ──────────────────────────────────
  {
    id: 'gen-nfpa110',
    title: 'NFPA 110 & Compliance Testing',
    desc: 'The standard that runs standby power: levels, types, weekly/monthly/annual testing, load banks, and documentation',
    track: 'Compliance & Professional Service',
    chapters: [
      'NFPA 110 levels, types, and classes in plain language',
      'Weekly inspections and monthly load tests: what must happen and be recorded',
      'Annual testing and the 3-year 4-hour test',
      'Load bank testing: when building load is not enough, and curing wet stacking',
      'Documentation: the records the AHJ and the insurer will ask for',
    ],
  },
  {
    id: 'gen-troubleshooting',
    title: 'Generator Troubleshooting Capstone',
    desc: 'Fail-to-start, fail-to-transfer, and power-quality trees — the universal method applied to standby power',
    track: 'Compliance & Professional Service',
    chapters: [
      'The fail-to-start tree: batteries → cranking → fuel → engine → controller',
      'The fail-to-transfer tree: sensing → start signal → ATS logic → mechanism',
      'Runs-but-power-wrong: voltage, frequency, and regulation diagnosis',
      'Shutdown investigations: reading the controller\'s story',
      'PM programs for generators: the compliance calendar as the maintenance plan',
    ],
  },
  {
    id: 'gen-career',
    title: 'Career in Power Generation Service',
    desc: 'The generator trade: EGSA certification, manufacturer schools, and where standby power careers lead',
    track: 'Compliance & Professional Service',
    chapters: [
      'The market: data centers, healthcare, telecom, and rental power',
      'EGSA certification and the credential ladder',
      'Manufacturer schools: Cummins, Generac, Caterpillar, Kohler',
      'The kit and the truck: what generator techs carry',
      'Career paths: field tech to switchgear, controls, sales, and ownership',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Generic course outlines — newer courses (Data Center, Solar/BESS, EV
// Charging, DC Plants, Battery Tech) use one shared placeholder shape,
// rendered by the shared OutlinePortal component.
// ─────────────────────────────────────────────────────────────────────────

export interface CourseModulePlaceholder {
  id: string;
  title: string;
  desc: string;
  track: string;
  chapters: string[];
  /** id of an existing module reused from another course (content already built) */
  sharedFrom?: string;
}

export interface CourseOutline {
  tracks: string[];
  modules: CourseModulePlaceholder[];
}

export const COURSE_OUTLINES: Record<string, CourseOutline> = {
  // ── DATA CENTER CRITICAL FACILITIES ─────────────────────────────────────
  // The capstone bundle: mostly assembled from existing UPS, Generator, and
  // HVAC modules, plus four data-center-specific modules.
  datacenter: {
    tracks: ['Critical Power — UPS Side', 'Critical Power — Generator Side', 'Cooling & Airflow', 'Data Center Operations'],
    modules: [
      { id: 'ups-overview', sharedFrom: 'ups-overview', track: 'Critical Power — UPS Side', title: 'Overview of UPS Systems', desc: 'Topologies, components, and architecture — the machines that bridge the outage', chapters: ['What a UPS is and why it matters', 'Standby, line-interactive, double-conversion topologies', 'UPS components and system architecture'] },
      { id: 'pdu-sts', sharedFrom: 'pdu-sts', track: 'Critical Power — UPS Side', title: 'PDU, RPP, and STS Systems', desc: 'The distribution layer between UPS and the racks', chapters: ['Power distribution units', 'Remote power panels and downstream distribution', 'Static transfer switches'] },
      { id: 'rectifiers', sharedFrom: 'rectifiers', track: 'Critical Power — UPS Side', title: 'Rectifiers', desc: 'AC to DC conversion — the front end of every UPS and charger', chapters: ['Rectifier fundamentals', 'Half-wave and full-wave rectification', 'Bridge rectifiers and filtering'] },
      { id: 'inverters', sharedFrom: 'inverters', track: 'Critical Power — UPS Side', title: 'Inverters', desc: 'DC back to AC — the output stage that carries the critical load', chapters: ['Inverter fundamentals', 'PWM inverters and output characteristics', 'Inverter monitoring and alarms'] },
      { id: 'battery-types', sharedFrom: 'battery-types', track: 'Critical Power — UPS Side', title: 'Battery Types and Chemistry', desc: 'The strings that buy the seconds', chapters: ['Lead-acid fundamentals', 'VRLA and data center applications', 'Li-ion and alternatives'] },
      { id: 'battery-safety', sharedFrom: 'battery-safety', track: 'Critical Power — UPS Side', title: 'Battery Safety and Handling', desc: 'PPE, installation, testing — battery-room discipline', chapters: ['Hazards and PPE', 'Installation and connection', 'Testing and maintenance'] },
      { id: 'gen-starting-systems', sharedFrom: 'gen-starting-systems', track: 'Critical Power — Generator Side', title: 'Starting Systems & Cranking Circuits', desc: 'The ten seconds that matter — batteries, chargers, block heaters', chapters: ['The cranking circuit', 'Station battery chargers', 'Cold starts and readiness'] },
      { id: 'gen-controls', sharedFrom: 'gen-controls', track: 'Critical Power — Generator Side', title: 'Generator Controllers, Sensors & Alarms', desc: 'Start sequences, event logs, remote monitoring', chapters: ['The controller and its sequence', 'Alarms, logs, and remote monitoring'] },
      { id: 'gen-ats', sharedFrom: 'gen-ats', track: 'Critical Power — Generator Side', title: 'Automatic Transfer Switches', desc: 'Sensing the outage and moving the load — two live sources in one cabinet', chapters: ['Anatomy and the transfer sequence', 'ATS safety and service discipline'] },
      { id: 'gen-critical-power', sharedFrom: 'gen-critical-power', track: 'Critical Power — Generator Side', title: 'Generators in Critical Power Systems', desc: 'NEC 700/701/702 and the generator-UPS handshake', chapters: ['The critical power chain and NEC classes', 'The generator-UPS handshake'] },
      { id: 'gen-nfpa110', sharedFrom: 'gen-nfpa110', track: 'Critical Power — Generator Side', title: 'NFPA 110 & Compliance Testing', desc: 'The testing calendar and documentation the AHJ demands', chapters: ['The standard and the testing calendar', 'Running the tests and selling the program'] },
      { id: 'hvac-psychrometrics', sharedFrom: 'hvac-psychrometrics', track: 'Cooling & Airflow', title: 'Psychrometrics & Human Comfort', desc: 'Temperature, humidity, dew point — the physics of cooling', chapters: ['Temperature and moisture', 'Sensible and latent heat', 'Measuring air in the field'] },
      { id: 'hvac-air-distribution', sharedFrom: 'hvac-air-distribution', track: 'Cooling & Airflow', title: 'Air Distribution, Ductwork & Airflow', desc: 'Blowers, static pressure, CFM — air delivery fundamentals', chapters: ['Blowers and the air they move', 'Static pressure', 'Ducts, filters, and balancing'] },
      { id: 'hvac-chillers-hydronics', sharedFrom: 'hvac-chillers-hydronics', track: 'Cooling & Airflow', title: 'Chillers, Boilers & Hydronic Systems', desc: 'Chilled water plants and cooling towers — how big buildings move heat', chapters: ['Why big buildings move water', 'Boilers and hot-water heating', 'Terminal units and the scope boundary'] },
      { id: 'dc-cooling', track: 'Data Center Operations', title: 'Data Center Cooling Systems', desc: 'CRAC/CRAH units, hot/cold aisle containment, economization, and the liquid-cooling transition', chapters: ['Heat load: why every watt of IT is a watt of cooling', 'CRAC vs CRAH: DX and chilled-water room cooling', 'Hot/cold aisle, containment, and airflow management on the raised floor', 'Economizer and free-cooling strategies at data center scale', 'Liquid cooling: rear-door, direct-to-chip, and immersion — the AI-era shift', 'Temperature/humidity envelopes (ASHRAE TC 9.9) and why they widened'] },
      { id: 'dc-monitoring', track: 'Data Center Operations', title: 'EPMS, BMS & DCIM Monitoring', desc: 'The monitoring stacks: electrical power monitoring, building management, and data center infrastructure management', chapters: ['The three stacks: EPMS (power), BMS (mechanical), DCIM (capacity/assets)', 'One-line literacy on the EPMS: reading the live power chain', 'Alarm philosophies: severity tiers, nuisance alarms, and alarm fatigue', 'Sensors and metering: branch circuit monitoring, PDU metering, environmental probes', 'Using trends for diagnosis: the monitoring stack as your event log'] },
      { id: 'dc-operations', track: 'Data Center Operations', title: 'Critical Facility Operations Discipline', desc: 'MOPs, SOPs, EOPs, change management, and rounds — the operational culture that keeps five-nines alive', chapters: ['Why data centers run on procedure: the cost of a millisecond', 'MOPs, SOPs, and EOPs: written procedure as the only way work happens', 'Change management: approvals, windows, and back-out plans', 'Rounds and readings: the walkaround formalized into shifts', 'Incident response: roles, communication, and the post-incident review', 'Concurrent maintainability: N, N+1, 2N and what you may touch when'] },
      { id: 'dc-career', track: 'Data Center Operations', title: 'Career in Data Center Facilities', desc: 'The premium room: CFT roles, certifications, and the operator-to-chief path', chapters: ['The data center job market: hyperscale, colo, enterprise, edge', 'Roles: critical facility tech, shift lead, chief engineer, facility manager', 'Certifications: this portal + OEM schools + industry credentials (CDCP, Uptime accreditations)', 'Compensation and shift-work reality', 'The dual-fluency thesis: UPS + Generator + Cooling in one tech'] },
    ],
  },

  // ── SOLAR + BATTERY ENERGY STORAGE ──────────────────────────────────────
  solar: {
    tracks: ['Batteries & Storage Core', 'Photovoltaics', 'Power Conversion & Code', 'Professional Service'],
    modules: [
      { id: 'battery-types', sharedFrom: 'battery-types', track: 'Batteries & Storage Core', title: 'Battery Types and Chemistry', desc: 'Lead-acid through lithium — the chemistry BESS is built on', chapters: ['Lead-acid fundamentals', 'VRLA applications', 'Li-ion and alternatives'] },
      { id: 'battery-safety', sharedFrom: 'battery-safety', track: 'Batteries & Storage Core', title: 'Battery Safety and Handling', desc: 'The safety discipline that scales from strings to containers', chapters: ['Hazards and PPE', 'Installation and connection', 'Testing and maintenance'] },
      { id: 'solar-pv-fundamentals', track: 'Photovoltaics', title: 'PV Cell & Module Fundamentals', desc: 'How sunlight becomes DC: cells, modules, IV curves, and the factors that steal production', chapters: ['The photovoltaic effect and cell construction', 'Modules, ratings, and the IV curve', 'Irradiance, temperature, and shading: what moves production', 'Module technologies: mono, bifacial, thin film', 'Degradation, hot spots, and module-level faults'] },
      { id: 'solar-arrays-dc', track: 'Photovoltaics', title: 'Arrays, Strings & DC-Side Design', desc: 'Series/parallel string math, combiners, MPPT, and DC-side safety', chapters: ['String math: voltage adds in series, current in parallel', 'Cold-temperature Voc: why string sizing is a winter calculation', 'Combiner boxes, fusing, and DC home runs', 'MPPT: how inverters hunt the power point', 'DC arc faults and the unique dangers of a source you cannot turn off'] },
      { id: 'solar-inverters', track: 'Power Conversion & Code', title: 'Solar Inverters & Power Electronics', desc: 'String, central, and microinverters — the UPS student meets the grid-tie inverter', chapters: ['Grid-tie inverter anatomy: the familiar DC-to-AC story', 'String vs central vs micro/optimizer architectures', 'Anti-islanding and grid-support functions (IEEE 1547)', 'Inverter diagnostics: error codes, curves, and event logs', 'Hybrid inverters: PV + battery + grid in one box'] },
      { id: 'solar-installation-codes', track: 'Power Conversion & Code', title: 'NEC 690/705, Rapid Shutdown & Interconnection', desc: 'The code layer: labeling, rapid shutdown, disconnects, and utility interconnection', chapters: ['NEC 690: the solar article in plain language', 'Rapid shutdown: why, how, and testing it', 'NEC 705: interconnection and the 120% rule', 'Grounding, bonding, and labeling requirements', 'Permits, AHJs, and utility approval flows'] },
      { id: 'solar-bess-systems', track: 'Batteries & Storage Core', title: 'Battery Energy Storage Systems', desc: 'BESS at residential and commercial scale: BMS, containers, and how storage stacks with solar', chapters: ['BESS architectures: residential wall units to container systems', 'The BMS: cell balancing, protection, and its data as your event log', 'Charge/discharge strategies: self-consumption, backup, demand response', 'AC-coupled vs DC-coupled storage', 'Commissioning a BESS: verification before energization'] },
      { id: 'solar-bess-safety', track: 'Batteries & Storage Core', title: 'BESS Safety & NFPA 855', desc: 'Thermal runaway, fire codes, and the safety discipline of large lithium installations', chapters: ['Thermal runaway: mechanism, propagation, and why prevention is everything', 'NFPA 855 and UL 9540/9540A in plain terms', 'Spacing, enclosures, and suppression systems', 'Damaged/faulted lithium handling and emergency response', 'The documentation and inspection regime'] },
      { id: 'solar-commissioning', track: 'Professional Service', title: 'Commissioning & Performance Verification', desc: 'IV curve tracing, thermal imaging, and proving a system performs to model', chapters: ['Commissioning sequence: mechanical → DC → AC → monitoring', 'IV curve tracing: the diagnostic that sees string health', 'Thermal imaging for modules and connections', 'Performance ratio: actual vs modeled production', 'Monitoring platform setup and owner handoff'] },
      { id: 'solar-troubleshooting', track: 'Professional Service', title: 'Solar + Storage Troubleshooting Capstone', desc: 'Underproduction, inverter faults, and storage misbehavior — the universal method on the roof', chapters: ['The underproduction tree: monitoring → strings → modules → inverter', 'Inverter fault families and their meanings', 'BESS complaints: capacity fade, imbalance, communication faults', 'Ground faults and isolation testing on live-source arrays', 'The service economics: O&M contracts and monitoring-driven dispatch'] },
      { id: 'solar-career', track: 'Professional Service', title: 'Career in Solar & Storage', desc: 'NABCEP, the growth curve, and where solar/BESS careers lead', chapters: ['The market: residential, C&I, utility-scale, and O&M', 'NABCEP certifications and the credential ladder', 'Adjacent tickets: electrical licensing paths and OSHA', 'Career paths: installer → service tech → commissioning → O&M management'] },
    ],
  },

  // ── EV CHARGING INFRASTRUCTURE ──────────────────────────────────────────
  evcharging: {
    tracks: ['Charging Fundamentals', 'DC Fast Charging', 'Networks & Sites', 'Professional Service'],
    modules: [
      { id: 'ev-charging-levels', track: 'Charging Fundamentals', title: 'Charging Levels, Standards & Connectors', desc: 'L1/L2/DCFC, J1772, NACS, CCS — the landscape and the handshake between car and charger', chapters: ['Level 1, Level 2, DC fast: power levels and use cases', 'Connectors: J1772, CCS, NACS/Tesla, CHAdeMO legacy', 'The charging handshake: pilot signals and communication', 'Onboard vs offboard chargers: where the power conversion lives', 'The EVSE is a smart contactor; the DCFC is a power plant'] },
      { id: 'ev-l2-service', track: 'Charging Fundamentals', title: 'Level 2 Charger Systems & Service', desc: 'The workhorse EVSE: installation quality, GFCI behavior, and the faults that strand commuters', chapters: ['L2 anatomy: contactor, pilot board, metering, cable/connector', 'Circuit sizing, load calculation, and NEC 625', 'CCID/ground-fault behavior and nuisance trips', 'Cable and connector wear: the highest-touch failure point', 'Commercial L2 fleets: load sharing and multi-port units'] },
      { id: 'ev-dcfc-power', track: 'DC Fast Charging', title: 'DCFC Power Electronics', desc: 'Inside the fast charger: rectifier stacks, power modules, and the UPS student\'s homecoming', chapters: ['DCFC architecture: AC input → rectifier/PFC → isolated DC stages → the vehicle', 'Power modules: paralleled converter bricks and their failure/derating behavior', 'Cooling: air and liquid-cooled cabinets (dirty filters strike again)', 'DC bus and capacitor safety discipline (the UPS rules verbatim)', 'Module-level diagnosis: derated chargers and the sick-brick pattern'] },
      { id: 'ev-dcfc-cables', track: 'DC Fast Charging', title: 'High-Power Cables, Cooling & Connectors', desc: 'Liquid-cooled cables, connector thermals, and the mechanical wear life of public hardware', chapters: ['Why 350 kW needs liquid-cooled cables', 'Coolant loops in cables and cabinets: leaks, pumps, and temps', 'Connector thermal sensing and charge derating', 'Public-hardware abuse: drops, drive-offs, vandalism, and retractors', 'Cable/connector replacement discipline'] },
      { id: 'ev-networks', track: 'Networks & Sites', title: 'Networks, Payment & OCPP Diagnostics', desc: 'The software layer: OCPP, backends, payment systems — and why so many "broken" chargers are network faults', chapters: ['OCPP in plain language: charger-to-backend messaging', 'Session flow: authorize → start → meter → stop → settle', 'Cellular/network connectivity: the desert of dead modems', 'Remote diagnostics and firmware management', 'The uptime problem: why network faults dominate public-charger complaints'] },
      { id: 'ev-site-power', track: 'Networks & Sites', title: 'Site Power, Utility & Load Management', desc: 'Getting megawatts to a parking lot: transformers, demand charges, load management, and storage-buffered sites', chapters: ['Site one-lines: utility service, transformers, switchgear to chargers', 'Demand charges and why load management exists', 'Power sharing/rotation among chargers', 'Battery-buffered charging sites (the BESS crossover)', 'Utility coordination and interconnection realities'] },
      { id: 'ev-troubleshooting', track: 'Professional Service', title: 'EV Charger Troubleshooting Capstone', desc: 'Dead units, failed sessions, and derated charging — the universal method at the charging plaza', chapters: ['The dead-charger tree: power → boards → network → software', 'Failed-session diagnosis: handshake, payment, vehicle-side faults', 'Derated charging: modules, cooling, cable temps', 'Using backend logs with on-site instruments (both event logs, always)', 'Field safety: DC bus discipline and two-source thinking at battery-buffered sites'] },
      { id: 'ev-career', track: 'Professional Service', title: 'Career in EV Charging Infrastructure', desc: 'EVITP, network operators, and the buildout decade', chapters: ['The market: networks, OEMs, contractors, fleet depots', 'EVITP certification and electrical licensing context', 'Uptime contracts: the service business model of charging', 'Career paths: field tech → commissioning → network operations'] },
    ],
  },

  // ── DC POWER PLANTS (TELECOM) ───────────────────────────────────────────
  dcplants: {
    tracks: ['Batteries Core', 'Plant Architecture', 'Sites & Service'],
    modules: [
      { id: 'battery-types', sharedFrom: 'battery-types', track: 'Batteries Core', title: 'Battery Types and Chemistry', desc: 'The strings that hold up the network', chapters: ['Lead-acid fundamentals', 'VRLA applications', 'Li-ion and alternatives'] },
      { id: 'battery-safety', sharedFrom: 'battery-safety', track: 'Batteries Core', title: 'Battery Safety and Handling', desc: 'Battery-room discipline, telecom edition', chapters: ['Hazards and PPE', 'Installation and connection', 'Testing and maintenance'] },
      { id: 'dcp-architecture', track: 'Plant Architecture', title: '-48V DC Plant Architecture', desc: 'Why telecom runs on -48V DC and how a plant is put together', chapters: ['Why -48V: history, corrosion, and the always-on architecture', 'Plant anatomy: rectifiers, battery strings, distribution, controller', 'Float operation: the load rides the bus, batteries ride behind it', 'Plant sizing: N+1 rectifiers and reserve-time math', 'Grounding and return: positive-ground discipline'] },
      { id: 'dcp-rectifiers', track: 'Plant Architecture', title: 'Rectifier Shelves & Plant Controllers', desc: 'Modular rectifiers, hot-swap discipline, and the controller that runs the plant', chapters: ['Modular rectifier shelves: paralleled bricks, hot-swappable', 'Float/equalize voltages and temperature compensation', 'The plant controller: alarms, thresholds, remote monitoring', 'Rectifier failure patterns and the sick-brick diagnosis', 'AC feeds and transfer: where the generator course connects'] },
      { id: 'dcp-distribution', track: 'Plant Architecture', title: 'DC Distribution, Fusing & LVD', desc: 'BDFBs, fuse panels, low-voltage disconnects, and working a live DC bus safely', chapters: ['Distribution: BDFB/BDCBB panels, fuses and breakers', 'Low-voltage disconnect: sacrificing loads to save the batteries', 'Live-bus work discipline: insulated tools, one-conductor-at-a-time', 'Fuse verification and load balancing across feeds', 'Cabling, lugs, and the millivolt-drop hunt at high DC current'] },
      { id: 'dcp-sites', track: 'Sites & Service', title: 'Cell Sites, Huts & Outside Plant Power', desc: 'The field reality: towers, huts, gensets, and the reserve-time religion', chapters: ['Site anatomy: shelter power, tower loads, environmental systems', 'Reserve time: battery hours as the network\'s survival metric', 'Site generators and portable-genset connections (the generator crossover)', 'Remote monitoring and storm-response operations', 'Access, safety, and RF awareness on tower sites'] },
      { id: 'dcp-career', track: 'Sites & Service', title: 'Career in Telecom Power', desc: 'Carriers, contractors, and the always-on career', chapters: ['The market: carriers, tower companies, DAS/small cell, contractors', 'Certifications and carrier-specific quals', 'Storm response and route work realities', 'Career paths: field tech → power engineer → operations'] },
    ],
  },

  // ── BATTERY TECHNICIAN ──────────────────────────────────────────────────
  battery: {
    tracks: ['Chemistry & Safety Core', 'Testing & Service', 'Applications & Career'],
    modules: [
      { id: 'battery-types', sharedFrom: 'battery-types', track: 'Chemistry & Safety Core', title: 'Battery Types and Chemistry', desc: 'The foundation: lead-acid through lithium', chapters: ['Lead-acid fundamentals', 'VRLA applications', 'Li-ion and alternatives'] },
      { id: 'battery-safety', sharedFrom: 'battery-safety', track: 'Chemistry & Safety Core', title: 'Battery Safety and Handling', desc: 'The discipline that keeps battery techs alive', chapters: ['Hazards and PPE', 'Installation and connection', 'Testing and maintenance'] },
      { id: 'bat-lead-acid-deep', track: 'Chemistry & Safety Core', title: 'Lead-Acid Systems Deep Dive', desc: 'Flooded and VRLA in depth: charging regimes, failure modes, and life management', chapters: ['Flooded cells: electrolyte, specific gravity, watering discipline', 'VRLA in depth: recombination, dry-out, thermal runaway', 'Charging regimes: float, equalize, temperature compensation', 'Failure modes: sulfation, corrosion, plate shedding, connection drift', 'Life expectancy math and end-of-life criteria'] },
      { id: 'bat-lithium', track: 'Chemistry & Safety Core', title: 'Lithium Systems & the BMS', desc: 'Li-ion chemistries, battery management systems, and the safety architecture around them', chapters: ['Chemistry families: LFP, NMC, and what each trades', 'Cells, modules, packs: the lithium hierarchy', 'The BMS: balancing, protection limits, state estimation', 'Reading BMS data: the battery\'s own event log', 'Transport, storage, and damaged-cell handling rules'] },
      { id: 'bat-testing', track: 'Testing & Service', title: 'Battery Testing & Diagnostics', desc: 'Capacity tests, impedance/conductance trending, thermography — proving what a string can actually deliver', chapters: ['Why voltage lies: charge state vs capacity', 'Capacity/discharge testing: the honest test (IEEE 450/1188 literacy)', 'Impedance and conductance: trending as early warning', 'Thermal imaging: connections and cells under load', 'Interpreting results: the weakest-cell reality of series strings'] },
      { id: 'bat-installation', track: 'Testing & Service', title: 'String Installation, Replacement & Commissioning', desc: 'Torque, interconnects, commissioning charges, and the craft of swapping strings in live systems', chapters: ['Replacement planning: live-system risk and isolation strategies', 'Racking, spill containment, and room requirements', 'Torque and interconnect discipline: the millivolt hunt', 'Commissioning: initial charge, baseline readings, documentation', 'Disposal and recycling chains (lead\'s virtuous loop, lithium\'s maturing one)'] },
      { id: 'bat-motive', track: 'Applications & Career', title: 'Motive Power & Industrial Chargers', desc: 'Forklift and industrial batteries: opportunity charging, watering systems, and the warehouse market', chapters: ['Motive-power duty: deep cycling vs standby float', 'Industrial chargers: conventional, opportunity, fast', 'Watering systems and maintenance programs', 'Fleet battery management and rotation', 'The lithium transition in motive power'] },
      { id: 'bat-career', track: 'Applications & Career', title: 'Career in Battery Service', desc: 'The specialist who serves every other trade on this portal', chapters: ['The market: UPS strings, telecom, BESS, motive, rental', 'Where battery techs sit in every other course\'s world', 'Certifications and IEEE-standard literacy as a differentiator', 'Career paths: string tech → test specialist → BESS commissioning'] },
    ],
  },
};

export interface TrainingCourse {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  accessKey: string;
  certTitle: string;
  color: 'blue' | 'orange' | 'teal' | 'amber' | 'violet' | 'yellow' | 'green' | 'sky' | 'rose';
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
  {
    id: 'hvac',
    title: 'HVAC Field Service Engineering',
    shortTitle: 'HVAC FSE',
    tagline: 'Service heating, cooling, and ventilation — split systems, rooftop units, chillers, and building controls.',
    accessKey: 'training_hvac',
    certTitle: 'Jr. HVAC Field Service Engineer',
    color: 'teal',
    totalModules: 25,
    stripeProductId: 'training_hvac',
    testOutProductId: 'jr_hvac_fse_test_human',
    comingSoon: true,
  },
  {
    id: 'generator',
    title: 'Power Generation Field Service Engineering',
    shortTitle: 'Generator FSE',
    tagline: 'Service standby and prime power — diesel and gas generators, transfer switches, and critical power systems.',
    accessKey: 'training_generator',
    certTitle: 'Jr. Power Generation Field Service Engineer',
    color: 'amber',
    totalModules: 25,
    stripeProductId: 'training_generator',
    testOutProductId: 'jr_gen_fse_test_human',
    comingSoon: true,
  },
  {
    id: 'datacenter',
    title: 'Data Center Critical Facilities',
    shortTitle: 'Data Center CFT',
    tagline: 'Run the rooms that run the internet — UPS, generators, cooling, and operations discipline in one role.',
    accessKey: 'training_datacenter',
    certTitle: 'Jr. Data Center Critical Facilities Technician',
    color: 'violet',
    totalModules: 28,
    stripeProductId: 'training_datacenter',
    testOutProductId: 'jr_dc_cft_test_human',
    comingSoon: true,
  },
  {
    id: 'solar',
    title: 'Solar & Battery Energy Storage',
    shortTitle: 'Solar/BESS FSE',
    tagline: 'Service PV arrays, inverters, and battery energy storage — the fastest-growing electrical trade in America.',
    accessKey: 'training_solar',
    certTitle: 'Jr. Solar & Storage Field Service Engineer',
    color: 'yellow',
    totalModules: 21,
    stripeProductId: 'training_solar',
    testOutProductId: 'jr_solar_fse_test_human',
    comingSoon: true,
  },
  {
    id: 'evcharging',
    title: 'EV Charging Infrastructure',
    shortTitle: 'EV Charging Tech',
    tagline: 'Service Level 2 and DC fast chargers — power electronics, networks, and the buildout decade.',
    accessKey: 'training_evcharging',
    certTitle: 'Jr. EV Charging Infrastructure Technician',
    color: 'green',
    totalModules: 18,
    stripeProductId: 'training_evcharging',
    testOutProductId: 'jr_ev_tech_test_human',
    comingSoon: true,
  },
  {
    id: 'dcplants',
    title: 'Telecom DC Power Plants',
    shortTitle: 'DC Plant Tech',
    tagline: 'Service the -48V plants, battery strings, and cell-site power that keep the network alive.',
    accessKey: 'training_dcplants',
    certTitle: 'Jr. Telecom Power Technician',
    color: 'sky',
    totalModules: 17,
    stripeProductId: 'training_dcplants',
    testOutProductId: 'jr_dcp_tech_test_human',
    comingSoon: true,
  },
  {
    id: 'battery',
    title: 'Battery Systems Technician',
    shortTitle: 'Battery Tech',
    tagline: 'The specialist trade inside every other: strings, BESS, testing, and lithium — batteries as a career.',
    accessKey: 'training_battery',
    certTitle: 'Jr. Battery Systems Technician',
    color: 'rose',
    totalModules: 18,
    stripeProductId: 'training_battery',
    testOutProductId: 'jr_battery_tech_test_human',
    comingSoon: true,
  },
];
