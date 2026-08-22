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

  // ── DATA CENTER ENGINEER ────────────────────────────────────────────────
  // The engineering sequel to the CFT course: design, sizing, commissioning,
  // and credentials. Shares the full CFT technical foundation (UPS, generator,
  // HVAC, and DC ops modules) and adds six engineering-specific modules.
  dcengineer: {
    tracks: ['Critical Power & Cooling Foundation', 'Engineering Design', 'Commissioning & Career'],
    modules: [
      { id: 'ups-overview', sharedFrom: 'ups-overview', track: 'Critical Power & Cooling Foundation', title: 'Overview of UPS Systems', desc: 'The power chain\'s core machine — topologies and architecture', chapters: ['Double-conversion, line-interactive, and standby topologies', 'UPS system architecture'] },
      { id: 'pdu-sts', sharedFrom: 'pdu-sts', track: 'Critical Power & Cooling Foundation', title: 'PDU, RPP, and STS Systems', desc: 'Distribution between UPS and racks', chapters: ['Power distribution units', 'Static transfer switches'] },
      { id: 'rectifiers', sharedFrom: 'rectifiers', track: 'Critical Power & Cooling Foundation', title: 'Rectifiers', desc: 'AC to DC — the UPS front end', chapters: ['Rectifier fundamentals', 'Bridge rectifiers and filtering'] },
      { id: 'inverters', sharedFrom: 'inverters', track: 'Critical Power & Cooling Foundation', title: 'Inverters', desc: 'DC to AC — the UPS output stage', chapters: ['Inverter fundamentals', 'PWM and output characteristics'] },
      { id: 'battery-types', sharedFrom: 'battery-types', track: 'Critical Power & Cooling Foundation', title: 'Battery Types and Chemistry', desc: 'The strings that hold the load during transfer', chapters: ['Lead-acid and VRLA', 'Li-ion and alternatives'] },
      { id: 'battery-safety', sharedFrom: 'battery-safety', track: 'Critical Power & Cooling Foundation', title: 'Battery Safety and Handling', desc: 'PPE, installation, and testing', chapters: ['Hazards and PPE', 'Testing and maintenance'] },
      { id: 'gen-starting-systems', sharedFrom: 'gen-starting-systems', track: 'Critical Power & Cooling Foundation', title: 'Starting Systems & Cranking Circuits', desc: 'The ten seconds that matter', chapters: ['Cranking circuit and battery chargers', 'Cold-start readiness'] },
      { id: 'gen-controls', sharedFrom: 'gen-controls', track: 'Critical Power & Cooling Foundation', title: 'Generator Controllers, Sensors & Alarms', desc: 'Start sequences and event logs', chapters: ['Controller and sequence', 'Alarms and remote monitoring'] },
      { id: 'gen-ats', sharedFrom: 'gen-ats', track: 'Critical Power & Cooling Foundation', title: 'Automatic Transfer Switches', desc: 'Two live sources — the safety and service discipline', chapters: ['Transfer sequence', 'ATS safety'] },
      { id: 'gen-critical-power', sharedFrom: 'gen-critical-power', track: 'Critical Power & Cooling Foundation', title: 'Generators in Critical Power Systems', desc: 'NEC 700/701/702 and the generator-UPS handshake', chapters: ['Critical power chain and NEC classes'] },
      { id: 'gen-nfpa110', sharedFrom: 'gen-nfpa110', track: 'Critical Power & Cooling Foundation', title: 'NFPA 110 & Compliance Testing', desc: 'The testing calendar and documentation', chapters: ['The standard and testing calendar'] },
      { id: 'hvac-psychrometrics', sharedFrom: 'hvac-psychrometrics', track: 'Critical Power & Cooling Foundation', title: 'Psychrometrics & Human Comfort', desc: 'Temperature, humidity, dew point — the air physics', chapters: ['Temperature and moisture', 'Sensible and latent heat'] },
      { id: 'hvac-air-distribution', sharedFrom: 'hvac-air-distribution', track: 'Critical Power & Cooling Foundation', title: 'Air Distribution, Ductwork & Airflow', desc: 'Blowers, static pressure, CFM', chapters: ['Blowers and static pressure', 'Filters and balancing'] },
      { id: 'hvac-chillers-hydronics', sharedFrom: 'hvac-chillers-hydronics', track: 'Critical Power & Cooling Foundation', title: 'Chillers, Boilers & Hydronic Systems', desc: 'Chilled water plants and cooling towers', chapters: ['Why big buildings move water', 'Pumps, valves, and hydronic balancing'] },
      { id: 'dc-cooling', sharedFrom: 'dc-cooling', track: 'Critical Power & Cooling Foundation', title: 'Data Center Cooling Systems', desc: 'CRAC/CRAH, containment, and the liquid-cooling transition', chapters: ['CRAC vs CRAH and the room airflow circuit', 'Containment, ASHRAE envelopes, and liquid cooling'] },
      { id: 'dc-monitoring', sharedFrom: 'dc-monitoring', track: 'Critical Power & Cooling Foundation', title: 'EPMS, BMS & DCIM Monitoring', desc: 'The three monitoring stacks — reading what the facility knows', chapters: ['The three stacks: EPMS, BMS, DCIM', 'Alarms, trends, and event forensics'] },
      { id: 'dc-operations', sharedFrom: 'dc-operations', track: 'Critical Power & Cooling Foundation', title: 'Critical Facility Operations Discipline', desc: 'MOPs, SOPs, EOPs — the operational culture engineers design for', chapters: ['Why data centers run on procedure', 'Redundancy, rounds, and incident response'] },
      { id: 'dce-design', track: 'Engineering Design', title: 'Data Center Design Fundamentals', desc: 'Tier methodology, site selection, redundancy architecture, and PUE design targets', chapters: ['Tier methodology and site selection', 'Redundancy architecture and PUE design'] },
      { id: 'dce-electrical', track: 'Engineering Design', title: 'Electrical System Design', desc: 'MV service, switchgear, generator/UPS sizing, distribution, harmonics, and power density', chapters: ['Service entrance, switchgear, and standby sizing', 'Power distribution, density, and harmonics'] },
      { id: 'dce-mechanical', track: 'Engineering Design', title: 'Mechanical System Design', desc: 'Cooling load, chiller plant, economizers, CRAC/CRAH sizing, and PUE arithmetic', chapters: ['Cooling load and chilled water plant design', 'Economizers, CRAC/CRAH sizing, and PUE arithmetic'] },
      { id: 'dce-cabling', track: 'Engineering Design', title: 'Structured Cabling and Physical Infrastructure', desc: 'TIA-942 hierarchy, fiber/copper selection, cable management, and physical security design', chapters: ['TIA-942 cabling architecture', 'Physical security design'] },
      { id: 'dce-commissioning', track: 'Commissioning & Career', title: 'Commissioning and Acceptance Testing', desc: 'Commissioning levels, FAT/SAT, IST scenarios, and the handover package', chapters: ['Commissioning levels and factory acceptance', 'Integrated systems testing and handover'] },
      { id: 'dce-career', track: 'Commissioning & Career', title: 'Career as a Data Center Engineer', desc: 'MEP firms, commissioning roles, PE licensing, ATD/RCDD credentials, and the AI decade opportunity', chapters: ['The engineering career path', 'Credentials and the AI decade opportunity'] },
    ],
  },

  // ── MARINE SYSTEMS TECHNICIAN ────────────────────────────────────────────
  marine: {
    tracks: ['Electrical Foundation', 'Power Systems', 'Safety & Career'],
    modules: [
      { id: 'marine-electrical', track: 'Electrical Foundation', title: 'Shore Power & AC Electrical', desc: 'ABYC E-11 shore power standards, ELCI protection, reverse polarity, and galvanic isolators', chapters: ['Shore power 30A/50A, ABYC E-11', 'Reverse polarity and ELCI 30mA protection', 'Galvanic isolators vs isolation transformers', 'Marine bonding system (#8 AWG)', 'The 7-inch fuse rule'] },
      { id: 'marine-batteries', track: 'Electrical Foundation', title: 'Marine Battery Systems', desc: 'CCA/MCA/RC ratings, battery types, house/start bank isolation, ACR vs diode isolator, multi-stage charging', chapters: ['CCA, MCA, RC ratings', 'Flooded, AGM, LiFePO4, gel types', 'House vs start bank isolation', 'ACR vs diode isolator', 'Multi-stage charging and LiFePO4 BMS load-dump'] },
      { id: 'marine-inverter', track: 'Power Systems', title: 'Marine Inverters & Inverter/Chargers', desc: 'Pure sine wave requirements, sizing for surge loads, ABYC A-31, and VE.Bus communication', chapters: ['Pure sine vs modified sine wave', 'Sizing: running watts + motor start surge', 'Current draw calculation at 12V', 'ABYC A-31 and transfer relay timing', 'BMS communication via CAN bus'] },
      { id: 'marine-wiring', track: 'Power Systems', title: 'Marine Wiring & NMEA 2000', desc: 'Tinned copper requirements, voltage drop, color codes, crimp terminals, NMEA 2000 network installation', chapters: ['ABYC E-11 wire specifications (tinned copper, 105°C)', 'Voltage drop: 3% safety, 10% non-critical', 'Marine color coding', 'Crimp terminals only — wire nuts prohibited', 'NMEA 2000: CAN bus, terminators, spur limits'] },
      { id: 'marine-safety', track: 'Safety & Career', title: 'Marine Safety Systems', desc: 'Bilge pumps, CO detection, 4-minute blower rule, clean agent suppression, and anode selection', chapters: ['Bilge pump sizing and float switch wiring', 'CO and the 4-minute bilge blower rule (33 CFR 175.110)', 'Clean agent fire suppression (HFC-227ea, Novec 1230)', 'Halon ban under Montreal Protocol', 'Sacrificial anode selection by water type'] },
      { id: 'marine-career', track: 'Safety & Career', title: 'Marine Technician Career Path', desc: 'ABYC E-11 certification, MMT designation, NMEA Installer, manufacturer certs, and compensation', chapters: ['ABYC Marine Electrical Technician (E-11)', 'ABYC MMT requirements and 3-year recert', 'NMEA Installer certification', 'Manufacturer certs (Victron, Raymarine, Garmin)', 'Employment sectors and compensation $42K–$130K+'] },
    ],
  },

  // ── POOL EQUIPMENT TECHNICIAN ────────────────────────────────────────────
  pool: {
    tracks: ['Hydraulics & Electrical', 'Chemistry & Treatment', 'Automation & Career'],
    modules: [
      { id: 'pool-motors', track: 'Hydraulics & Electrical', title: 'Pool Pump Motors & Hydraulics', desc: 'Pump affinity laws, DOE 2021 VSP mandate, TDH, system curves, cavitation diagnosis', chapters: ['Affinity laws (P ∝ N³)', 'DOE 2021 efficiency rule — VSPs above 1 HP', 'Permanent magnet motors + built-in VFD', 'TDH and system curve matching', 'Cavitation: symptoms and root causes'] },
      { id: 'pool-electrical', track: 'Hydraulics & Electrical', title: 'Pool Electrical Safety — NEC 680', desc: 'Equipotential bonding, GFCI zones, underwater lighting, and panelboard placement', chapters: ['NEC Article 680 scope', 'Equipotential bonding (#8 AWG solid copper)', 'GFCI zones: 6-foot exclusion, 20-foot GFCI zone', '120V underwater lights: GFCI + ground continuity monitor', 'Pool sub-panel placement (5-foot minimum)'] },
      { id: 'pool-heating', track: 'Hydraulics & Electrical', title: 'Pool & Spa Heating Systems', desc: 'Gas heater sizing, heat pump COP, solar collectors, and evaporative heat loss', chapters: ['Gas heater BTU sizing formula', 'Heat pump COP 4–6 and cold-weather limits', 'Titanium heat exchangers for salt pools', 'Solar collector sizing (50–100% of pool area)', 'Evaporation as dominant heat loss — cover ROI'] },
      { id: 'pool-filtration', track: 'Hydraulics & Electrical', title: 'Pool Filtration Systems', desc: 'Sand, cartridge, and DE filters; turnover calculation; backwash procedures; winterization', chapters: ['Sand (20–40 µm), Cartridge (10–15 µm), DE (3–5 µm)', 'Turnover: gal ÷ hrs ÷ 60 = GPM required', 'Backwash trigger: 8–10 psi above clean baseline', 'DE recharge after backwash', 'Winterization freeze protection'] },
      { id: 'pool-chemical', track: 'Chemistry & Treatment', title: 'Salt Chlorine Generators & Water Chemistry', desc: 'SCG electrolysis, ORP/pH relationship, CYA management, and chemical controller calibration', chapters: ['SCG electrolysis: Cl₂ → HOCl', 'Salt range 2,700–3,400 ppm', 'ORP 650–750 mV target', 'pH 7.4–7.6: HOCl activity vs pH chart', 'CYA 30–50 ppm (60–80 SCG); >100 ppm = stabilizer lock'] },
      { id: 'pool-automation', track: 'Automation & Career', title: 'Pool Automation & Control Systems', desc: 'Load centers, relay boards, VSP integration protocols, flow sensors, and freeze protection', chapters: ['Load center and relay board architecture', 'Pentair IntelliCenter, Hayward OmniLogic, Jandy iAquaLink', 'RS-485 Modbus VSP communication (IntelliFlo)', 'Flow sensor interlock before heater enable', 'Freeze protection: 38–40°F threshold, overrides manual off'] },
      { id: 'pool-career', track: 'Automation & Career', title: 'Pool Equipment Technician Career Path', desc: 'CPO/AFO credentials, PHTA CST, electrical licensing scope, route economics, and compensation', chapters: ['CPO (PHTA) and AFO (NRPA) credentials', 'PHTA Certified Service Technician (CST)', 'NEC 680 electrical work requires licensed electrician', 'Route economics: 70–90 pools/week at $100–200/month', 'Compensation $55K–$150K+ self-employed specialist'] },
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

  // ── HVAC TECHNICIAN ──────────────────────────────────────────────────────
  'hvac-tech': {
    tracks: ['Refrigeration & Electrical', 'Systems & Comfort', 'Codes & Career'],
    modules: [
      { id: 'hvact-refrigeration', track: 'Refrigeration & Electrical', title: 'Refrigeration Cycle & Thermodynamics', desc: 'Vapor-compression cycle, P-H diagrams, superheat, subcooling, and charging methods', chapters: ['Four-component cycle', 'P-H diagram and refrigerant states', 'Superheat target 8–12°F', 'Subcooling target 10–15°F', 'Charging by weight and field superheat method', 'Blend fractionation and liquid charging'] },
      { id: 'hvact-electrical', track: 'Refrigeration & Electrical', title: 'Electrical Controls & Safety', desc: 'Contactors, capacitors, motor circuits, NEC Article 440, and LOTO procedures', chapters: ['Contactor coil 24V / contacts line voltage', 'PSC motor and run capacitor ±10%', 'Dual-run capacitors (HERM/FAN/COM)', 'NEC 440: 125% RLA conductors, MOCP, disconnect within sight', 'OSHA 1910.147 LOTO — all energy sources', 'Test-before-touch protocol'] },
      { id: 'hvact-heatpump', track: 'Systems & Comfort', title: 'Heat Pumps & Mini-Splits', desc: 'Reversing valve, defrost cycle, SEER2/HSPF2, and mini-split installation', chapters: ['Reversing valve — O/B wiring energized-cooling convention', 'Heating mode: outdoor coil = evaporator', 'Defrost cycle — aux heat energizes, outdoor fan stops', 'SEER2/HSPF2 updated test conditions', 'Inverter compressor variable-speed advantages', 'Flare connections — no field brazing'] },
      { id: 'hvact-airhandling', track: 'Systems & Comfort', title: 'Air Handling & Distribution', desc: 'Ductwork design, TESP, MERV ratings, filtration, and IAQ', chapters: ['Total external static pressure (TESP)', 'Manual D duct sizing procedure', 'MERV 8–11 residential sweet spot', 'Return duct undersizing — most common error', 'Flex duct: 4-foot max support, no kinks', 'CO₂ demand-controlled ventilation'] },
      { id: 'hvact-epa608', track: 'Codes & Career', title: 'EPA Section 608 & Refrigerant Handling', desc: 'Recovery requirements, AIM Act, A2L safety, GWP, and the R-410A phase-out', chapters: ['Section 608 prohibition on knowing venting', 'Four certification types: I, II, III, Universal', 'ARI 700 purity for reclaimed refrigerant', 'AIM Act: 85% HFC phasedown by 2036', 'R-410A prohibited in new equipment after Jan 1 2025', 'A2L (R-454B, R-32): flammability precautions and leak detection'] },
      { id: 'hvact-career', track: 'Codes & Career', title: 'HVAC Troubleshooting & Career Path', desc: 'Systematic diagnosis, NATE certification, state licensing, and career progression', chapters: ['Four-quadrant pressure check', 'Fault signature library: high/low suction + high/low discharge', 'True RMS meter for VFD/inverter systems', 'NATE Core + specialty exams', 'EPA 608 federal requirement vs state HVAC license', 'Career path: apprentice → journeyman → specialty tech → contractor'] },
    ],
  },

  // ── SOLAR INSTALLER ──────────────────────────────────────────────────────
  'solar-inst': {
    tracks: ['PV Fundamentals & Codes', 'Equipment & Storage', 'Installation & Career'],
    modules: [
      { id: 'sinst-pv-fundamentals', track: 'PV Fundamentals & Codes', title: 'PV Cell Physics & System Design', desc: 'I-V curves, STC ratings, temperature coefficients, irradiance, shading, and system sizing', chapters: ['Photovoltaic effect and I-V curve', 'STC: 1000 W/m², 25°C cell, AM1.5', 'Temperature coefficient of Pmax: –0.35%/°C typical', 'Peak sun hours (PSH) and PVWatts', 'Shading and bypass diodes', 'Derate factors and system sizing'] },
      { id: 'sinst-nec690', track: 'PV Fundamentals & Codes', title: 'NEC Article 690 & Solar Safety', desc: 'String voltage limits, conductor sizing, rapid shutdown, AFCI, and grounding', chapters: ['NEC 690.7: 600V residential, 1000V commercial max DC', 'NEC 690.8: conductors at 125% Isc', 'Max string Voc at record low temperature', 'NEC 690.12: RSD ≤30V in 30 seconds', 'NEC 690.11: AFCI — DC arcs are self-sustaining', 'UL 2703 bonding hardware and EGC'] },
      { id: 'sinst-inverters', track: 'Equipment & Storage', title: 'String Inverters & Power Optimizers', desc: 'MPPT, grid-tie anti-islanding, dual-MPPT strings, power optimizers, and microinverters', chapters: ['MPPT algorithm and I-V tracking', 'Anti-islanding per UL 1741 / IEEE 1547', 'String sizing: Vmin and Vmax both checked', 'Transformerless inverters and isolation monitoring', 'Power optimizers: DC-DC per module', 'Microinverters: AC at each module, built-in RSD'] },
      { id: 'sinst-battery', track: 'Equipment & Storage', title: 'Battery Storage Systems & NEC 706', desc: 'AC/DC coupling, LiFePO4 chemistry, BMS, and energy storage system safety', chapters: ['AC-coupled vs DC-coupled efficiency', 'Hybrid inverter backup operation', 'LiFePO4 thermal stability vs NMC', 'BMS: overcharge, over-discharge, thermal protection', 'NEC 706: disconnect, UL 9540 listing, ventilation', 'Depth of discharge and cycle life'] },
      { id: 'sinst-mounting', track: 'Installation & Career', title: 'Mounting, Racking & Commissioning', desc: 'Roof attachment, structural loading, conduit methods, and commissioning procedures', chapters: ['Lag bolt 2.5" minimum rafter penetration', 'Flashing every roof penetration', 'Dead load, snow load, wind uplift', 'USE-2/PV Wire for outdoor exposed conductors', 'Pre-commissioning: Voc and Isc measurement per string', 'AHJ inspection and utility PTO required before energizing'] },
      { id: 'sinst-nabcep', track: 'Installation & Career', title: 'NABCEP Certification & Solar Career', desc: 'NABCEP PV Associate vs PVIP, state licensing, solar design tools, and career progression', chapters: ['NABCEP PV Associate: knowledge-based, no experience minimum', 'NABCEP PVIP: 58 hours field experience + advanced exam', 'State electrical licensing vs NABCEP credential', 'Federal ITC 30% (2024–2032)', 'Aurora Solar and PVWatts design tools', 'Career path: installer → lead → designer → contractor; storage specialty premium'] },
    ],
  },

  // ── ELEVATOR TECHNICIAN ───────────────────────────────────────────────────
  'elevator-tech': {
    tracks: ['Mechanics & Drive Systems', 'Electrical & Safety', 'Hydraulics & Career'],
    modules: [
      { id: 'elev-mechanics', track: 'Mechanics & Drive Systems', title: 'Elevator Types, Traction & Drive Systems', desc: 'Traction vs hydraulic, roping configurations, counterweight, VVVF drives, and machine-room-less design', chapters: ['Traction vs hydraulic: sheave vs ram', '1:1 and 2:1 roping; counterweight 40-50% rated load', 'VVVF regenerative drives: 35-50% energy savings', 'Gearless vs geared machines', 'Machine room vs MRL: 60-90 F requirement'] },
      { id: 'elev-electrical', track: 'Mechanics & Drive Systems', title: 'Controllers, Door Systems & Interlocks', desc: 'Relay vs microprocessor controllers, door operator types, ASME A17.1 door interlocks, and traveling cable systems', chapters: ['Relay logic vs microprocessor controllers', 'VVVF door operators: smooth speed ramp', 'Door interlocks: mechanical AND electrical per ASME A17.1 2.12', 'Nudging: reduced-force close after ~20s dwell', 'Traveling cable: junction box to moving car'] },
      { id: 'elev-safety', track: 'Electrical & Safety', title: 'Safety Devices & ASME A17.1 Codes', desc: 'Governors, car safeties, spring and oil buffers, pit safety equipment, and firefighter operation Phase I and Phase II', chapters: ['Governor trips at 115% contract speed', 'Instantaneous safety <=150 fpm; gradual above 150 fpm', 'Oil buffers required above 200 fpm (no rebound)', 'Pit stop switch within 3 feet of access door', 'Phase I lobby recall; Phase II in-car firefighter control'] },
      { id: 'elev-hydraulic', track: 'Hydraulics & Career', title: 'Hydraulic Elevator Systems', desc: 'Hydraulic power units, jack types, rupture valves, lowering control, and temperature compensation', chapters: ['HPU: motor-pump, tank, valve manifold', 'In-ground, telescoping, and holeless jack types', 'Rupture valve closes at 0.3 m/s above rated lowering speed', 'Drift limit: 3 inches per 15 minutes per ASME A17.1', 'ISO 4406 oil cleanliness monitoring'] },
      { id: 'elev-maintenance', track: 'Hydraulics & Career', title: 'Preventive Maintenance & Troubleshooting', desc: 'Hoist rope inspection, lubrication schedules, door adjustment, vibration analysis, and systematic fault diagnosis', chapters: ['6x19 rope: 6 broken wires per lay = retire; 8:1 safety factor', 'Guide rail lubrication and sheave groove inspection', 'Door gap max 3/8 inch; closing KE max 2.5 ft-lb', 'ISO 10816 vibration zone limits for rotating components', 'Fault code log: first step for no-movement diagnosis'] },
      { id: 'elev-career', track: 'Hydraulics & Career', title: 'Inspections, Modernization & Elevator Career', desc: 'ASME A17.3 for existing elevators, QEI credential, periodic inspections, modernization scope, and NEIEP/IUEC career pathways', chapters: ['ASME A17.3: existing elevator safety code', 'QEI credential: ASME/NAESA, renew every 3 years', 'Category 1 annual; Category 5 every 5 years', 'Controller/drive modernization: acceptance test + QEI witness required', 'NEIEP 4-year apprenticeship; BLS $99K median; 6% growth'] },
    ],
  },

  // ── FIRE ALARM & SUPPRESSION TECHNICIAN ─────────────────────────────────
  'fire-alarm-tech': {
    tracks: ['Detection & Control', 'Suppression Systems', 'ITM & Career'],
    modules: [
      { id: 'fire-fundamentals', track: 'Detection & Control', title: 'Fire Alarm Systems & NFPA 72 Fundamentals', desc: 'Alarm system types, initiating devices, addressable vs conventional, and the National Fire Alarm and Signaling Code', chapters: ['NFPA 72: National Fire Alarm and Signaling Code', 'Conventional zones vs addressable SLC addresses', 'Ionization: fast-flaming fires; photoelectric: smoldering fires', 'Fixed-temp heat: 135 F standard; rate-of-rise: 12 F/min', 'Class A vs Class B wiring: redundant return vs EOL resistor'] },
      { id: 'fire-panels', track: 'Detection & Control', title: 'Control Panels, NAC Circuits & Notification Appliances', desc: 'FACP programming, SLC loops, NAC circuits, horns, strobes, voice evacuation, and output module wiring', chapters: ['FACP battery backup: 24 hours standby + 5 minutes alarm', 'SLC polling: hundreds of addressable devices per loop', 'NAC: power to horns, strobes, speakers; supervised', 'Strobes: synchronize within 200 ms; Temporal-3 evacuation signal', 'VES: 10 dB above ambient; MNS all-hazard override'] },
      { id: 'fire-suppression', track: 'Suppression Systems', title: 'Suppression Systems: Sprinklers & Clean Agents', desc: 'NFPA 13 sprinkler types, wet/dry/pre-action/deluge systems, clean agent suppression, and kitchen hood systems', chapters: ['Wet pipe: always water; dry pipe: pressurized air in piping', 'Double-interlock pre-action: detection + head required', 'Deluge: open heads flood zone on valve trip; aircraft hangars', 'FM-200: ~7-8% design concentration; Novec 1230: zero ODP', 'NFPA 17A wet chemical: saponification; K-class extinguishers'] },
      { id: 'fire-itm', track: 'ITM & Career', title: 'Inspection, Testing & Maintenance (NFPA 72 & NFPA 25)', desc: 'Required frequencies for alarm and sprinkler ITM, acceptance testing, and documentation requirements', chapters: ['Smoke detectors: annual functional test with listed aerosol', 'Battery: 24-hour discharge + 5-minute alarm load test', 'NFPA 25: standard heads replace at 50 years; fast-response at 20', 'Dry pipe trip test: water to inspector test valve within 60 seconds', '100% acceptance test required; records kept for life of system'] },
      { id: 'fire-troubleshoot', track: 'ITM & Career', title: 'Troubleshooting, Ground Faults & Special Hazard Systems', desc: 'Common trouble conditions, ground fault isolation, VESDA aspirating detection, CO systems, and special hazard applications', chapters: ['Ground fault: NFPA 72 must not cause alarm or prevent signaling', 'Isolation modules: isolate SLC short without disabling loop', 'VESDA: 0.001-0.2% obscuration/m; data centers, clean rooms', 'CO: NFPA 720; no alarm at 70 ppm/60 min; alarm at 400 ppm/15 min', 'CO2 total-flooding: toxic above 5%; pre-discharge alarm required'] },
      { id: 'fire-career', track: 'ITM & Career', title: 'Codes, NICET Certification & Career Paths', desc: 'AHJ roles, listing agencies, NICET certification levels, career outlook, and the fire protection job market', chapters: ['AHJ (fire marshal/department) approves plans and accepts system', 'UL listing and FM Approvals: nationally recognized test labs', 'NICET Level II: 2 years + exam; journeyman standard', 'NICET renewed every 3 years; Level IV requires 10 years', 'BLS median ~$63,000-$65,000; 5-7% growth; CFPE from SFPE'] },
    ],
  },

  // ── BIOMEDICAL EQUIPMENT TECHNICIAN (BMET) ───────────────────────────────
  'bmet-tech': {
    tracks: ['Healthcare Environment & Safety', 'Diagnostic & Life Support Equipment', 'PM & Career'],
    modules: [
      { id: 'bmet-fundamentals', track: 'Healthcare Environment & Safety', title: 'Biomedical Equipment & the Healthcare Environment', desc: 'BMET role, healthcare facility structure, medical device classes, NFPA 99 risk categories, and regulatory agencies', chapters: ['TJC Equipment Management Programs (EMPs)', 'FDA Class I/II/III device classification and 510(k) vs PMA', 'NFPA 99 risk categories 1-4', 'Ground continuity <0.2 ohms in patient care receptacles', 'Isolated Power Systems (IPS) and Line Isolation Monitors (LIM)'] },
      { id: 'bmet-electrical', track: 'Healthcare Environment & Safety', title: 'Electrical Safety & Patient Leakage Current Testing', desc: 'Macroshock vs microshock, leakage current limits, electrical safety analyzers, and equipment testing procedures', chapters: ['Macroshock 100-300 mA; microshock 10-50 µA directly to cardiac tissue', 'IEC 60601-1 Type CF limit: 10 µA normal condition', 'ESA test sequence: line voltage, ground, chassis leakage, patient lead leakage', 'Open neutral and open ground single-fault conditions', 'ESU REM monitoring and RF frequency range 400 kHz-5 MHz'] },
      { id: 'bmet-equipment', track: 'Diagnostic & Life Support Equipment', title: 'Diagnostic & Imaging Equipment', desc: 'ECG, pulse oximetry, blood pressure monitoring, ultrasound, X-ray, CT, and MRI safety fundamentals', chapters: ['ECG bandwidth: diagnostic 0.05-150 Hz vs monitoring 0.5-40 Hz', 'SpO2 wavelengths 660 nm/940 nm; accuracy affected by motion and nail polish', 'NIBP oscillometric method; AAMI accuracy ±5 mmHg', 'X-ray kVp accuracy ±5%; ultrasound 2-15 MHz', 'CT Hounsfield units; MRI zones I-IV and Zone IV projectile risk'] },
      { id: 'bmet-lifesupport', track: 'Diagnostic & Life Support Equipment', title: 'Life Support & Therapeutic Equipment', desc: 'Ventilators, infusion pumps, defibrillators, physiologic monitoring, and anesthesia machine fundamentals', chapters: ['Ventilator parameters: VT, RR, PIP, PEEP, FiO2; VCV vs PCV vs PSV', 'High-pressure alarm: increased resistance; low-pressure: disconnection', 'Infusion pump: free-flow protection and ±5% flow accuracy', 'Biphasic defibrillator 120-200 J vs monophasic 360 J', 'Capnography EtCO2 normal 35-45 mmHg; IBP zeroed at phlebostatic axis'] },
      { id: 'bmet-itm', track: 'PM & Career', title: 'Preventive Maintenance & Regulatory Compliance', desc: 'PM programs, work order documentation, equipment recalls, HIPAA for BMETs, and quality management systems', chapters: ['PM intervals: life-support every 6-12 months; AEM for low-risk equipment', 'FDA Class I recall: reasonable probability of death or serious injury', 'HIPAA PHI sanitization: degaussing, cryptographic erase, or physical destruction', 'SMDA: device-related death reported within 10 working days', 'Calibration traceability to NIST-traceable reference standards'] },
      { id: 'bmet-career', track: 'PM & Career', title: 'CBET Certification & Biomedical Career Paths', desc: 'CBET exam requirements, CLES and CRES credentials, career outlook, and professional development in biomedical technology', chapters: ['CBET by AAMI: 165 questions, 3 hours; 45 CEUs every 5 years', 'CLES: lab equipment specialist; CRES: radiology equipment specialist', 'ISO (Independent Service Organization): multi-OEM service experience', 'BLS median ~$57,000-$60,000; 10% employment growth projected', 'Career path: BMET I/II/III → senior → lead → manager → clinical engineer'] },
    ],
  },

  // ── WIND TURBINE TECHNICIAN ───────────────────────────────────────────────
  'wind-tech': {
    tracks: ['Wind Resource & Drivetrain', 'Electrical & Controls', 'Safety & Career'],
    modules: [
      { id: 'wtur-wind-resource', track: 'Wind Resource & Drivetrain', title: 'Wind Resource & Rotor Aerodynamics', desc: 'Power equation, Betz limit, IEC wind classes, hub-height extrapolation, TSR, and wake losses', chapters: ['P = 1/2 rho A v^3 Cp', 'IEC Classes I/II/III', 'Power law hub-height scaling', 'Betz limit 59.3%', 'Tip speed ratio 7-9', 'Wake effect and spacing'] },
      { id: 'wtur-drivetrain', track: 'Wind Resource & Drivetrain', title: 'Drivetrain, Gearbox & Bearing Systems', desc: 'Gear ratios, ISO 4406 oil analysis, planetary stage failure modes, vibration analysis, and alignment', chapters: ['3-stage gearbox 80:1-110:1', 'ISO 4406 cleanliness code', 'Planetary stage micropitting', 'SRB/TRB main bearings', 'BPFO/BPFI vibration frequencies', 'Laser alignment tolerances'] },
      { id: 'wtur-electrical', track: 'Electrical & Controls', title: 'Electrical Systems & Grid Interconnection', desc: 'DFIG +/-30% slip, full-power converter, IGBT cooling, LVRT, nacelle transformer, and lightning protection', chapters: ['DFIG stator direct, rotor via 30% converter', 'FPC 100% power decoupling', 'IGBT max 150 degrees C', 'LVRT stay connected + reactive boost', 'Buchholz relay protection', '34.5 kV collection system'] },
      { id: 'wtur-controls', track: 'Electrical & Controls', title: 'Turbine Controls, SCADA & Fault Diagnosis', desc: 'Pitch control, emergency feathering, yaw drive, cable twist, OPC-UA SCADA, and power curve analysis', chapters: ['Pitch fine at below-rated, feather above rated', 'Battery-backed emergency feather', 'Yaw: cos^3 power loss per degree', 'Cable twist +/-3 turns limit', 'ISO 10816 Zone C/D thresholds', 'Power curve binning per IEC 61400-12'] },
      { id: 'wtur-safety', track: 'Safety & Career', title: 'Tower Climbing, Fall Protection & Electrical Safety', desc: '5,000 lb anchors, GWO WAH, 100% tie-off, LOTO for wind turbines, arc flash PPE, and confined space', chapters: ['PFAS anchor 5,000 lb OSHA requirement', 'GWO WAH certification', '100% tie-off Y-lanyard transfers', 'LOTO: LV + MV + feeder lockout + test before touch', 'NFPA 70E Category 1/2 at 690 V', 'Hub confined space permit + atmospheric test'] },
      { id: 'wtur-career', track: 'Safety & Career', title: 'Maintenance, Blade Inspection & Wind Career', desc: 'PM schedules, leading edge erosion, LPS continuity, GWO certifications, and career progression', chapters: ['6-month minor / annual major PM', 'Blade LEE 2-5% AEP loss + LEP repair', 'LPS continuity <= 1 ohm IEC 61400-24', 'Gearbox borescope and spalling', 'GWO BST 5 modules valid 2 years', 'Tech I -> Tech II -> Senior Tech -> Site Manager'] },
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
  color: 'blue' | 'orange' | 'teal' | 'amber' | 'violet' | 'yellow' | 'green' | 'sky' | 'rose' | 'cyan' | 'emerald';
  totalModules: number;
  stripeProductId?: string;
  testOutProductId?: string;
  comingSoon?: boolean;
  free?: boolean;
  price?: string;
  examLevel?: string;
}

export const COURSES: TrainingCourse[] = [
  {
    id: 'critical-environment',
    title: 'Critical Environment Fundamentals',
    shortTitle: 'CE Fundamentals',
    tagline: 'Essential knowledge for anyone entering mission-critical facilities — data centers, hospitals, electrical rooms, and industrial infrastructure. Covers safety protocols, electrical hazard awareness, environmental controls, access procedures, and emergency response.',
    accessKey: 'critical_environment',
    certTitle: 'Critical Environment Fundamentals Certificate',
    color: 'emerald',
    totalModules: 8,
    free: true,
  },
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
    examLevel: 'jr_fse',
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
    comingSoon: false,
    examLevel: 'jr_kitchen_fse',
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
    comingSoon: false,
    examLevel: 'jr_hvac_fse',
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
    comingSoon: false,
    examLevel: 'jr_gen_fse',
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
    comingSoon: false,
    examLevel: 'jr_dc_cft',
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
    comingSoon: false,
    examLevel: 'jr_solar_fse',
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
    comingSoon: false,
    examLevel: 'jr_ev_tech',
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
    comingSoon: false,
    examLevel: 'jr_dcp_tech',
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
    comingSoon: false,
    examLevel: 'jr_battery_tech',
  },
  {
    id: 'dcengineer',
    title: 'Data Center Engineer',
    shortTitle: 'DC Engineer',
    tagline: 'Design, commission, and verify mission-critical facilities — tier methodology, electrical/mechanical sizing, and the engineering credential for the AI buildout decade.',
    accessKey: 'training_dcengineer',
    certTitle: 'Jr. Data Center Engineer',
    color: 'cyan',
    totalModules: 33,
    stripeProductId: 'training_dcengineer',
    testOutProductId: 'jr_dc_engineer_test_human',
    comingSoon: false,
    examLevel: 'jr_dc_engineer',
  },
  {
    id: 'marine',
    title: 'Marine Systems Technician',
    shortTitle: 'Marine Tech',
    tagline: 'Service boat electrical systems — ABYC E-11, shore power, battery banks, inverters, NMEA 2000, and the growing marine electrification market.',
    accessKey: 'training_marine',
    certTitle: 'Jr. Marine Systems Technician',
    color: 'blue',
    totalModules: 16,
    stripeProductId: 'training_marine',
    testOutProductId: 'jr_marine_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_marine_tech',
  },
  {
    id: 'pool',
    title: 'Pool Equipment Technician',
    shortTitle: 'Pool Equipment Tech',
    tagline: 'Service residential and commercial pools — VSP pumps, NEC 680 electrical, filtration, heating, salt chlorine generators, and automation controllers.',
    accessKey: 'training_pool',
    certTitle: 'Jr. Pool Equipment Technician',
    color: 'sky',
    totalModules: 17,
    stripeProductId: 'training_pool',
    testOutProductId: 'jr_pool_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_pool_tech',
  },
  {
    id: 'hvac-tech',
    title: 'HVAC Technician',
    shortTitle: 'HVAC Tech',
    tagline: 'Service residential and light-commercial HVAC systems — refrigeration cycle, heat pumps, controls, EPA 608, A2L refrigerants, and NATE certification.',
    accessKey: 'training_hvac_tech',
    certTitle: 'Jr. HVAC Technician',
    color: 'emerald',
    totalModules: 16,
    stripeProductId: 'training_hvac_tech',
    testOutProductId: 'jr_hvac_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_hvac_tech',
  },
  {
    id: 'solar-inst',
    title: 'Solar Installer',
    shortTitle: 'Solar Installer',
    tagline: 'Install and commission residential and commercial solar PV systems — NEC 690, string design, MLPE, battery storage, and NABCEP certification.',
    accessKey: 'training_solar_inst',
    certTitle: 'Jr. Solar Installer',
    color: 'amber',
    totalModules: 16,
    stripeProductId: 'training_solar_inst',
    testOutProductId: 'jr_solar_inst_test_human',
    comingSoon: false,
    examLevel: 'jr_solar_inst',
  },
  {
    id: 'wind-tech',
    title: 'Wind Turbine Technician',
    shortTitle: 'Wind Turbine',
    tagline: 'Service utility-scale wind turbines — drivetrain, electrical systems, SCADA, LVRT, GWO safety, and AWEA career pathways.',
    accessKey: 'training_wind_tech',
    certTitle: 'Jr. Wind Turbine Technician',
    color: 'sky',
    totalModules: 16,
    stripeProductId: 'training_wind_tech',
    testOutProductId: 'jr_wind_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_wind_tech',
  },
  {
    id: 'elevator-tech',
    title: 'Elevator Technician',
    shortTitle: 'Elevator Tech',
    tagline: 'Install and service elevators — traction and hydraulic systems, ASME A17.1 codes, VVVF drives, safety devices, and NEIEP/IUEC career pathways.',
    accessKey: 'training_elevator_tech',
    certTitle: 'Jr. Elevator Technician',
    color: 'teal',
    totalModules: 16,
    stripeProductId: 'training_elevator_tech',
    testOutProductId: 'jr_elevator_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_elevator_tech',
  },
  {
    id: 'fire-alarm-tech',
    title: 'Fire Alarm & Suppression Technician',
    shortTitle: 'Fire Alarm Tech',
    tagline: 'Install and service fire alarm systems — NFPA 72, addressable panels, sprinklers, clean agents, ITM, and NICET certification pathways.',
    accessKey: 'training_fire_alarm_tech',
    certTitle: 'Jr. Fire Alarm Technician',
    color: 'rose',
    totalModules: 16,
    stripeProductId: 'training_fire_alarm_tech',
    testOutProductId: 'jr_fire_alarm_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_fire_alarm_tech',
  },
  {
    id: 'bmet-tech',
    title: 'Biomedical Equipment Technician',
    shortTitle: 'BMET',
    tagline: 'Maintain and repair hospital medical equipment — electrical safety, patient monitoring, ventilators, imaging, and CBET certification pathways.',
    accessKey: 'training_bmet_tech',
    certTitle: 'Jr. Biomedical Equipment Technician',
    color: 'blue',
    totalModules: 16,
    stripeProductId: 'training_bmet_tech',
    testOutProductId: 'jr_bmet_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_bmet_tech',
  },
  {
    id: 'bas-tech',
    title: 'Building Automation Systems Technician',
    shortTitle: 'BAS Tech',
    tagline: 'Program, commission, and maintain BAS/BMS systems — BACnet, Modbus, DDC controllers, HVAC control sequences, and Niagara/NCA certification pathways.',
    accessKey: 'training_bas_tech',
    certTitle: 'Jr. Building Automation Systems Technician',
    color: 'emerald',
    totalModules: 16,
    stripeProductId: 'training_bas_tech',
    testOutProductId: 'jr_bas_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_bas_tech',
  },
  {
    id: 'ref-tech',
    title: 'Commercial Refrigeration Technician',
    shortTitle: 'Ref Tech',
    tagline: 'Service walk-in coolers, freezers, rack systems, and display cases — vapor compression, refrigerants, EPA 608, TXV/EEV controls, and NATE/RSES certification pathways.',
    accessKey: 'training_ref_tech',
    certTitle: 'Jr. Commercial Refrigeration Technician',
    color: 'cyan',
    totalModules: 16,
    stripeProductId: 'training_ref_tech',
    testOutProductId: 'jr_ref_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_ref_tech',
  },
  {
    id: 'plc-tech',
    title: 'Industrial Controls & PLC Technician',
    shortTitle: 'PLC Tech',
    tagline: 'Program, troubleshoot, and maintain PLC systems — ladder logic, HMI/SCADA, industrial networking (EtherNet/IP, Modbus), VFD integration, and ISA CCST certification pathways.',
    accessKey: 'training_plc_tech',
    certTitle: 'Jr. Industrial Controls & PLC Technician',
    color: 'orange',
    totalModules: 16,
    stripeProductId: 'training_plc_tech',
    testOutProductId: 'jr_plc_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_plc_tech',
  },
  {
    id: 'security-tech',
    title: 'Electronic Security Systems Technician',
    shortTitle: 'Security Tech',
    tagline: 'Install and service access control, CCTV, and intrusion systems — Wiegand, OSDP, IP cameras, PoE, NVR/VMS design, and ESA CAT/CEST certification pathways.',
    accessKey: 'training_security_tech',
    certTitle: 'Jr. Electronic Security Systems Technician',
    color: 'violet',
    totalModules: 16,
    stripeProductId: 'training_security_tech',
    testOutProductId: 'jr_security_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_security_tech',
  },
  {
    id: 'field-pm',
    title: 'Field Project Manager',
    shortTitle: 'Field PM',
    tagline: 'Lead field projects from initiation through closeout — scope, schedule, budget, stakeholder management, change control, and PM certification pathways including PMP®.',
    accessKey: 'training_field_pm',
    certTitle: 'Jr. Field Project Manager',
    color: 'teal',
    totalModules: 16,
    stripeProductId: 'training_field_pm',
    testOutProductId: 'jr_field_pm_test_human',
    examLevel: 'jr_field_pm',
  },
  {
    id: 'pump-tech',
    title: 'Pump Technician',
    shortTitle: 'Pump Tech',
    tagline: 'Install, service, and troubleshoot centrifugal and positive-displacement pumps — seals, bearings, alignment, cavitation diagnosis, and preventive maintenance for industrial and HVAC pump systems.',
    accessKey: 'training_pump_tech',
    certTitle: 'Jr. Pump Technician',
    color: 'sky',
    totalModules: 16,
    stripeProductId: 'training_pump_tech',
    testOutProductId: 'jr_pump_tech_test_human',
    examLevel: 'jr_pump_tech',
  },
  {
    id: 'industrial-ref',
    title: 'Industrial Refrigeration Operator',
    shortTitle: 'Industrial Ref',
    tagline: 'Ammonia systems, two-stage compression, evaporative condensers, flooded evaporators, OSHA PSM compliance, and RETA certification prep for food processing and cold storage careers.',
    accessKey: 'training_industrial_ref',
    certTitle: 'Jr. Industrial Refrigeration Operator',
    color: 'cyan',
    totalModules: 16,
    stripeProductId: 'training_industrial_ref',
    testOutProductId: 'jr_industrial_ref_test_human',
    comingSoon: false,
    examLevel: 'jr_industrial_ref',
  },
  {
    id: 'dc-ops',
    title: 'Data Center Operations Manager',
    shortTitle: 'DC Ops Manager',
    tagline: 'Uptime Institute Tiers, power chain management, PUE/WUE efficiency metrics, DCIM platforms, change management, compliance (NFPA 75/76/110, OSHA, EPA), and the financial skills to justify infrastructure investment — the full operations management toolkit.',
    accessKey: 'training_dc_ops',
    certTitle: 'Jr. Data Center Operations Manager',
    color: 'blue',
    totalModules: 15,
    stripeProductId: 'training_dc_ops',
    testOutProductId: 'jr_dc_ops_test_human',
    comingSoon: false,
    examLevel: 'jr_dc_ops',
  },
  {
    id: 'building-cx',
    title: 'Building Commissioning (Cx) Agent',
    shortTitle: 'Building Cx',
    tagline: 'ASHRAE Guideline 0 process, HVAC functional testing, BAS sequence verification, enclosure commissioning, LEED EA credits, and the BCxP/CBCP certification path — the QA discipline that makes buildings perform as designed.',
    accessKey: 'training_building_cx',
    certTitle: 'Jr. Building Commissioning Agent',
    color: 'emerald',
    totalModules: 15,
    stripeProductId: 'training_building_cx',
    testOutProductId: 'jr_building_cx_test_human',
    comingSoon: false,
    examLevel: 'jr_building_cx',
  },
  {
    id: 'telecom',
    title: 'Telecom OSP Technician',
    shortTitle: 'Telecom OSP',
    tagline: 'Fiber splicing, OTDR testing, copper plant, DMARC extensions, cell site power, and structured cabling certification — the full outside plant skill set.',
    accessKey: 'training_telecom',
    certTitle: 'Jr. Telecom OSP Technician',
    color: 'violet',
    totalModules: 16,
    stripeProductId: 'training_telecom',
    testOutProductId: 'jr_telecom_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_telecom_tech',
  },
  {
    id: 'switchgear-tech',
    title: 'Switchgear & Substation Technician',
    shortTitle: 'Switchgear Tech',
    tagline: 'Metal-clad MV switchgear, protective relaying and coordination, NETA acceptance/maintenance testing, arc flash and MV safety, and substation grounding — the critical-power discipline data center buildout runs on.',
    accessKey: 'training_switchgear_tech',
    certTitle: 'Jr. Switchgear & Substation Technician',
    color: 'amber',
    totalModules: 16,
    stripeProductId: 'training_switchgear_tech',
    testOutProductId: 'jr_switchgear_tech_test_human',
    comingSoon: false,
    examLevel: 'jr_switchgear_tech',
  },
];
