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

export interface TrainingCourse {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  accessKey: string;
  certTitle: string;
  color: 'blue' | 'orange' | 'teal' | 'amber';
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
];
