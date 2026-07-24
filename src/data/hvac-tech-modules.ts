import type { TrainingModule } from './modules';

export const HVAC_TECH_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULE 11 — REFRIGERATION CYCLE & THERMODYNAMICS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'hvact-refrigeration',
    num: 11,
    title: 'Refrigeration Cycle & Thermodynamics',
    desc: 'Vapor-compression cycle, pressure-enthalpy relationships, superheat, subcooling, and refrigerant properties.',
    slides: [
      {
        title: 'Vapor-Compression Cycle Fundamentals',
        body: [
          'The vapor-compression refrigeration cycle moves heat from a low-temperature source to a high-temperature sink using four components: compressor, condenser, metering device (TXV or orifice), and evaporator.',
          'The compressor draws low-pressure refrigerant vapor from the evaporator, compresses it to high temperature and pressure, and delivers hot discharge gas to the condenser.',
          'In the condenser, the hot refrigerant vapor rejects heat to the ambient air (or water), condensing to a liquid — heat flows from the high-temperature refrigerant to the lower-temperature outdoor air.',
          'The metering device (TXV or fixed orifice) creates a pressure drop: high-pressure liquid enters, and low-pressure liquid/vapor mixture exits, causing flash evaporation and a temperature drop to below the space temperature.',
          'In the evaporator, low-pressure refrigerant absorbs heat from the conditioned space, boiling into a vapor — this is where the useful cooling effect occurs.',
          'The pressure-enthalpy (P-H) diagram plots the complete cycle: vertical lines represent compression and condensing; the horizontal line across the saturation dome represents the metering device and evaporation.',
          'Refrigerant states track predictably: leaving the evaporator as superheated vapor, leaving the condenser as subcooled liquid — these two values (superheat and subcooling) are the primary diagnostic measurements on any system.',
        ],
        keyPoints: [
          'Four-component cycle: compressor → condenser → metering device → evaporator — in that pressure order',
          'Refrigerant absorbs heat in the evaporator (useful cooling) and rejects heat in the condenser (to outdoors)',
          'P-H diagram shows all four cycle processes; superheat and subcooling are the key diagnostic measurements',
        ],
        quiz: [
          {
            q: 'In the vapor-compression refrigeration cycle, where does the refrigerant absorb heat from the conditioned space?',
            a: ['Compressor', 'Condenser', 'Metering device', 'Evaporator'],
            correct: 3,
            exp: 'The evaporator is located inside the conditioned space. Low-pressure refrigerant enters as a cold liquid/vapor mixture and boils into vapor by absorbing heat from the return air — this is the useful cooling effect.',
          },
          {
            q: 'Which two measurements represent the primary diagnostic benchmarks on a properly charged and operating refrigeration system?',
            a: ['Discharge pressure and suction pressure', 'Superheat and subcooling', 'Ambient temperature and return air temperature', 'Compressor amps and supply voltage'],
            correct: 1,
            exp: 'Superheat (temperature above saturation at the evaporator outlet) confirms complete boiling before the compressor. Subcooling (temperature below saturation at the condenser outlet) confirms full liquid column to the metering device. Together they verify correct charge and system operation.',
          },
        ],
      },
      {
        title: 'Superheat, Subcooling & Charging Methods',
        body: [
          'Superheat is the number of degrees the refrigerant vapor temperature EXCEEDS the saturation temperature at the evaporator outlet pressure — measured at the suction line near the evaporator.',
          'Target superheat for fixed-orifice systems is typically 8–12°F at the evaporator coil; TXV systems target 8–12°F at the TXV bulb location — too high means undercharged or restricted liquid line, too low risks liquid slugging the compressor.',
          'Subcooling is the number of degrees the liquid refrigerant temperature falls BELOW saturation temperature at the condenser outlet — measured at the liquid line leaving the condenser.',
          'Target subcooling for most systems is 10–15°F; insufficient subcooling allows flash gas to form in the liquid line before the metering device, robbing system capacity and causing erratic TXV operation.',
          'Charging by weight (factory specification) is most accurate for new installations — evacuate the system to 500 microns or lower, then weigh in the exact refrigerant charge specified on the nameplate.',
          "Charging by superheat is used in the field on fixed-orifice residential systems — use the manufacturer's superheat chart (outdoor WB + indoor DB → target superheat) to avoid undercharging in cold weather.",
          'R-410A and R-32 are zeotropic blends that must always be charged as liquid from the cylinder to prevent fractionation — inverting the cylinder or using a liquid-port adapter delivers liquid phase.',
        ],
        keyPoints: [
          'Superheat = vapor temperature above saturation at suction line — target 8–12°F for most systems; too low = flood-back risk',
          'Subcooling = liquid temperature below saturation at liquid line — target 10–15°F; too low = flash gas before TXV',
          'Blended refrigerants (R-410A, R-32) must be charged as liquid to prevent fractionation',
        ],
        quiz: [
          {
            q: 'A technician measures 35°F superheat on a fixed-orifice R-410A system. Subcooling is only 4°F. What is the most likely diagnosis?',
            a: ['System is overcharged — recover refrigerant', 'System is undercharged — add refrigerant carefully', 'Condenser fan motor is failed — replace it', 'TXV is hunting — replace the TXV'],
            correct: 1,
            exp: 'High superheat (35°F vs. target 8–12°F) combined with low subcooling (4°F vs. target 10–15°F) is the classic signature of an undercharged system. There is insufficient refrigerant to fully cool the condenser or feed the evaporator. Add refrigerant in small increments, checking superheat and subcooling after each addition.',
          },
          {
            q: 'Why must R-410A always be charged as a liquid from the cylinder?',
            a: ['Liquid is lighter and evaporates faster', 'R-410A is a blend — charging as vapor causes fractionation, altering the mixture ratio in the system', 'Liquid charging prevents discharge pressure from rising', 'The TXV can only meter liquid refrigerant'],
            correct: 1,
            exp: 'R-410A is a near-azeotropic blend of R-32 and R-125. When charged as vapor, the more volatile component (R-32) evaporates preferentially, leaving a different mixture in the cylinder and putting an off-ratio blend in the system. Always invert the cylinder or use a liquid-port fitting to ensure liquid-phase charging.',
          },
        ],
      },
    ],
    test: [
      { q: 'Which component in the vapor-compression cycle increases refrigerant pressure and temperature?', a: ['Evaporator', 'Condenser', 'Metering device', 'Compressor'], correct: 3, exp: 'The compressor draws low-pressure vapor from the evaporator and compresses it to high pressure and temperature, enabling heat rejection in the condenser.' },
      { q: 'Target superheat for a TXV-equipped system measured at the bulb location is typically:', a: ['0–3°F', '4–7°F', '8–12°F', '20–30°F'], correct: 2, exp: 'TXV systems target 8–12°F superheat at the bulb — enough to ensure complete boiling without excess superheat that reduces capacity.' },
      { q: 'A system shows 25°F subcooling and 3°F superheat. What condition does this indicate?', a: ['Normal operation', 'Undercharged system', 'Overcharged system — evaporator is flooded', 'Restricted liquid line'], correct: 2, exp: 'High subcooling (25°F) with very low superheat (3°F) indicates overcharge — excess refrigerant floods the evaporator, raising subcooling and dropping superheat dangerously close to liquid slugging.' },
      { q: 'On which diagram are the four processes of the refrigeration cycle (compression, condensing, expansion, evaporation) typically plotted?', a: ['T-S (temperature-entropy) diagram', 'P-H (pressure-enthalpy) diagram', 'Psychrometric chart', 'Mollier diagram for steam'], correct: 1, exp: 'The P-H diagram is the standard tool for plotting vapor-compression cycles. Vertical lines represent adiabatic compression and condensing; the horizontal line through the saturation dome shows the metering device and evaporation.' },
      { q: 'What is the purpose of evacuating a refrigerant system to 500 microns before charging?', a: ['To measure the refrigerant charge by vacuum', 'To remove moisture and non-condensables that would raise condensing pressure and cause acid formation', 'To test for compressor valve leaks', 'To reset the TXV superheat setting'], correct: 1, exp: 'Evacuation removes air (non-condensable) and moisture. Non-condensables raise head pressure and reduce efficiency. Moisture combines with refrigerant oil to form acids that attack compressor windings, bearings, and copper plating.' },
      { q: 'In which component does the refrigerant change from high-pressure liquid to low-pressure liquid/vapor mixture?', a: ['Compressor', 'Condenser', 'Metering device (TXV or orifice)', 'Accumulator'], correct: 2, exp: 'The metering device (TXV or fixed orifice) creates a pressure drop by restricting flow. High-pressure liquid enters; the drop in pressure causes flash evaporation, lowering the refrigerant temperature below the evaporator air temperature.' },
      { q: 'Which refrigerant must NEVER be charged as vapor due to fractionation risk?', a: ['R-22 (a single-component refrigerant)', 'R-134a (a single-component refrigerant)', 'R-410A (a blend of R-32 and R-125)', 'Ammonia (R-717)'], correct: 2, exp: 'R-410A is a blend. Vapor-phase charging allows the more volatile R-32 to leave the cylinder preferentially, altering the blend ratio in the system and degrading performance. Always charge R-410A as liquid.' },
      { q: 'A TXV (thermostatic expansion valve) senses refrigerant conditions at which point in the system?', a: ['Compressor discharge', 'Liquid line before the valve', 'Evaporator outlet — via the sensing bulb', 'Condenser outlet'], correct: 2, exp: 'The TXV sensing bulb clamps to the suction line at the evaporator outlet. It senses refrigerant temperature and pressure to modulate the valve opening, maintaining the set superheat.' },
      { q: 'Flash gas in the liquid line is caused by insufficient:', a: ['Superheat', 'Subcooling', 'Suction pressure', 'Compressor oil'], correct: 1, exp: 'Subcooling ensures the liquid refrigerant remains below saturation temperature before reaching the metering device. Without adequate subcooling, any heat gain in the liquid line (from friction, long runs, or solar gain) can cause vapor bubbles — flash gas — that starve the TXV and reduce capacity.' },
      { q: 'What is the correct first step when adding refrigerant charge to an R-410A system in the field?', a: ['Connect gauges and immediately open the cylinder valve', 'Verify system is fully evacuated, then add weighed charge', 'Connect liquid-phase port on the cylinder and add refrigerant with the compressor running while monitoring superheat and subcooling', 'Add refrigerant until suction pressure matches the outdoor temperature on the PT chart'], correct: 2, exp: 'Field charging of a running R-410A system requires: liquid-phase cylinder port (prevents fractionation), compressor running (so superheat and subcooling can be measured), and incremental additions while monitoring both values to approach target.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 12 — ELECTRICAL CONTROLS & SAFETY
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'hvact-electrical',
    num: 12,
    title: 'Electrical Controls & Safety for HVAC',
    desc: 'Contactors, capacitors, motor circuits, NEC HVAC requirements, and lockout/tagout procedures.',
    slides: [
      {
        title: 'Contactors, Capacitors & Motor Circuits',
        body: [
          'The contactor is an electromagnetic switch that connects line-voltage power (typically 208–240V) to the compressor and condenser fan motor — it is controlled by the low-voltage thermostat circuit (24V) through the contactor coil.',
          'Pitted or burned contactor contacts increase resistance, generate heat, and can cause voltage drop that starves the compressor — contacts should be inspected at every maintenance visit; replace at first sign of pitting.',
          'Single-phase PSC (permanent split capacitor) motors use a run capacitor in the auxiliary winding circuit to create a phase shift that produces starting and running torque — without the capacitor, the motor hums and fails to start.',
          'Capacitor ratings are in microfarads (μF) and voltage — a failed capacitor typically shows a bulged top, and measured capacitance will be more than ±10% from the nameplate rating.',
          'Hard-start kits add a start capacitor and potential relay in parallel with the run capacitor, providing extra starting torque on low-voltage or heavily loaded conditions — often used on heat pumps during cold-weather start.',
          'The compressor crankcase heater must be energized for at least 4 hours before start-up following a shutdown — refrigerant migration to the compressor sump during off cycles causes oil dilution and liquid slugging on the next start.',
          'Dual-run capacitors contain both the compressor run capacitor and fan motor run capacitor in one housing — the common terminal and the two "Herm" (compressor) and "Fan" terminals must be correctly identified before replacement.',
        ],
        keyPoints: [
          'Contactor coil is 24V; contacts carry line voltage — inspect contacts at every PM, replace at first sign of pitting',
          'PSC motor capacitor creates phase shift for torque — check capacitance within ±10% of nameplate μF rating',
          'Crankcase heater must run ≥4 hours before compressor start after any extended shutdown',
        ],
        quiz: [
          {
            q: 'A PSC condenser fan motor hums but does not rotate when power is applied. What is the most likely cause?',
            a: ['Contactor contacts are pitted and not closing fully', 'Run capacitor has failed — motor cannot develop starting torque', 'Thermostat is set too low', 'Crankcase heater is still energized'],
            correct: 1,
            exp: 'PSC motors rely on the run capacitor to create the phase shift needed for starting torque. A humming but non-rotating motor with correct voltage at the terminals is the classic sign of a failed capacitor. Disconnect power, measure capacitance, and replace if outside ±10% of the nameplate rating.',
          },
          {
            q: 'Why must the compressor crankcase heater be energized for at least 4 hours before starting the compressor after a long shutdown?',
            a: ['To pre-heat refrigerant so it flows faster', 'To drive refrigerant that migrated into the compressor oil out of the sump before start-up', 'To charge the run capacitor to operating voltage', 'To close the contactor contacts safely'],
            correct: 1,
            exp: 'During off cycles, refrigerant migrates to the coldest point in the system — often the compressor crankcase. It dissolves into the compressor oil, causing foaming on start-up. The crankcase heater boils the refrigerant out of the oil before the compressor is started, preventing oil loss and bearing damage.',
          },
        ],
      },
      {
        title: 'NEC HVAC Requirements & LOTO Safety',
        body: [
          'NEC Article 440 governs air conditioning and refrigeration equipment — it sets rules for conductor sizing, overcurrent protection, and disconnecting means specific to motor-compressor loads.',
          'The disconnecting means for HVAC equipment must be within sight of the equipment (NEC 440.14) and must be readily accessible — a lockable disconnect switch or lockable breaker satisfies this requirement.',
          'Conductor ampacity for a single motor-compressor is calculated at 125% of the nameplate rated-load amperes (RLA) per NEC 440.32 — the compressor nameplate lists both RLA and LRA (locked-rotor amperes).',
          "The equipment overcurrent device (breaker or fuse) is sized per the manufacturer's nameplate MOCP (Maximum Overcurrent Protection) rating — this often exceeds the wire ampacity because motor inrush must be tolerated.",
          'Lockout/Tagout (LOTO) under OSHA 29 CFR 1910.147 requires isolating all energy sources (electrical, refrigerant pressure, stored mechanical energy) before servicing — electrical alone is insufficient if refrigerant pressure remains in the system.',
          'The six-step LOTO process: (1) notify affected employees, (2) identify all energy sources, (3) shut down the equipment, (4) isolate energy sources, (5) lock and tag each isolation point, (6) verify zero energy state before touching any component.',
          'Test-before-touch: after applying locks, use a calibrated non-contact voltage tester or meter to verify zero voltage at the equipment terminals — assume equipment is live until proven otherwise.',
        ],
        keyPoints: [
          'NEC 440: HVAC conductors at 125% RLA; disconnect within sight of unit; MOCP on nameplate governs OCP device size',
          'LOTO isolates ALL energy sources — electrical, pressure, and stored mechanical — not just the breaker',
          'Test-before-touch every time: verify zero voltage with calibrated meter after locking out',
        ],
        quiz: [
          {
            q: 'An HVAC condensing unit nameplate shows RLA = 16A and MOCP = 35A. What size fuse is acceptable for the overcurrent protection device?',
            a: ['20A (125% of RLA)', '25A (next size up from RLA)', '35A (the nameplate MOCP)', '45A (150% of RLA)'],
            correct: 2,
            exp: 'NEC 440 requires the equipment overcurrent device to NOT EXCEED the manufacturer\'s MOCP rating. The nameplate MOCP of 35A is the maximum allowed. Exceeding it may void the listing and create a fire hazard. Never size above MOCP, even if standard sizes jump.',
          },
          {
            q: 'After locking out and tagging out an HVAC unit\'s electrical disconnect, a technician discovers the system has 250 psi in the refrigerant circuit. What is the correct next step?',
            a: ['Proceed — the electrical lockout is sufficient', 'Open the service valve to vent the refrigerant before proceeding', 'Install a pressure-side lockout device or recover refrigerant before working on pressurized components', 'Wait 30 minutes for pressure to equalize'],
            correct: 2,
            exp: 'LOTO requires control of ALL hazardous energy sources. Refrigerant pressure is a separate energy source — 250 psi can cause severe injury if a fitting is inadvertently loosened. Use isolation valves, recovery equipment, or pressure-rated lockout devices to control the refrigerant hazard before servicing pressurized components.',
          },
        ],
      },
    ],
    test: [
      { q: 'What is the standard control voltage for the HVAC thermostat circuit and contactor coil?', a: ['120V AC', '24V AC', '12V DC', '48V DC'], correct: 1, exp: 'HVAC low-voltage control circuits operate at 24V AC, supplied by a step-down transformer typically rated 40–75 VA. This voltage energizes the contactor coil, reversing valve, and other control components.' },
      { q: 'Per NEC 440.32, HVAC branch circuit conductors must be sized at what percentage of the compressor nameplate RLA?', a: ['100%', '115%', '125%', '150%'], correct: 2, exp: 'NEC 440.32 requires individual branch circuit conductors for a single motor-compressor to have an ampacity of at least 125% of the nameplate rated-load amperes (RLA) to handle continuous operation without overheating.' },
      { q: 'A dual-run capacitor has three terminals labeled HERM, FAN, and COMMON. Which terminal connects to the compressor auxiliary winding?', a: ['FAN', 'COMMON', 'HERM', 'Any terminal — they are interchangeable'], correct: 2, exp: 'HERM (hermetically sealed compressor) connects to the compressor auxiliary winding. FAN connects to the condenser fan motor auxiliary winding. COMMON is the shared electrical connection. Swapping HERM and FAN will damage one or both motors.' },
      { q: 'Which OSHA standard governs lockout/tagout procedures for controlling hazardous energy during equipment servicing?', a: ['OSHA 29 CFR 1910.132 (PPE)', 'OSHA 29 CFR 1910.147 (Control of Hazardous Energy)', 'OSHA 29 CFR 1910.303 (Electrical — General)', 'OSHA 29 CFR 1926.403 (Construction Electrical)'], correct: 1, exp: '29 CFR 1910.147 is the LOTO standard for general industry. It requires written procedures, authorized employee training, individual locks for each worker, and verification of zero energy state before work begins.' },
      { q: 'A capacitor\'s nameplate rating is 45 μF ±6%. What is the acceptable measured capacitance range before replacement is required?', a: ['40–50 μF', '42.3–47.7 μF', '35–55 μF', '44–46 μF'], correct: 1, exp: '45 μF × 0.06 = 2.7 μF tolerance. Acceptable range is 42.3–47.7 μF. Most field standards accept ±10%, giving 40.5–49.5 μF. A capacitor reading outside this range should be replaced even without visible physical damage.' },
      { q: 'What is the correct procedure for verifying zero energy state after applying a lockout on an HVAC unit?', a: ['Check that the disconnect handle is in the OFF position', 'Press the thermostat down button and listen for the compressor', 'Use a calibrated voltage tester or multimeter to verify zero voltage at the equipment terminals', 'Visually inspect the contactors for an open gap'], correct: 2, exp: 'Visual checks and switch positions are not sufficient — LOTO verification requires a test instrument. Test-before-touch: apply the lockout, then use a calibrated tester at the equipment terminals. A failed breaker or miswired panel can leave voltage present even with the disconnect open.' },
      { q: 'The compressor nameplate shows LRA = 95A. What does LRA represent?', a: ['Line Rated Amps — continuous rating at full load', 'Locked-Rotor Amperes — starting inrush when the shaft is stationary', 'Lowest Reliable Amperage — minimum current for proper operation', 'Load Reduction Amps — reduced amperage at partial load'], correct: 1, exp: 'LRA is the inrush current drawn when the compressor starts and the rotor is momentarily stationary. This value — typically 5–7× RLA — is used to select time-delay fuses and hard-start components that tolerate the start inrush without tripping.' },
      { q: 'A disconnect for an HVAC condensing unit must be located how relative to the equipment per NEC 440.14?', a: ['Within 50 feet', 'Within sight of the unit', 'In the main electrical panel only', 'Adjacent to the indoor air handler'], correct: 1, exp: 'NEC 440.14 requires the disconnecting means to be within sight of the HVAC equipment — meaning visible and not more than 50 feet away. This ensures the technician working on the unit can see the disconnect is open, preventing accidental re-energization.' },
      { q: 'What is the purpose of a hard-start kit on a single-phase HVAC compressor?', a: ['Reduce running current to save energy', 'Provide extra starting torque to overcome high head pressure or low voltage on start', 'Delay the contactor closure by 5 minutes after power-up', 'Monitor compressor winding temperature'], correct: 1, exp: 'A hard-start kit (start capacitor + potential relay) adds extra capacitance in the auxiliary winding circuit during the start interval. This increases starting torque, allowing the compressor to start under high head pressure, low voltage, or worn conditions that would otherwise cause a failed start.' },
      { q: 'Which test verifies that pitted contactor contacts are causing excessive voltage drop at the compressor?', a: ['Measure amperage at the contactor load-side terminals', 'Measure voltage across the closed contacts under load — should be less than 1V', 'Measure voltage at the contactor coil terminals', 'Check the capacitor μF with the contactor open'], correct: 1, exp: 'Voltage drop across closed contacts is measured by placing meter leads on the LINE and LOAD terminals of the same leg while the contactor is closed and the compressor is running. More than 1V across closed contacts indicates excessive resistance from pitting or carbon buildup.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 13 — HEAT PUMPS & MINI-SPLITS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'hvact-heatpump',
    num: 13,
    title: 'Heat Pumps & Mini-Split Systems',
    desc: 'Reversing valve operation, defrost cycle, SEER2/HSPF2 ratings, and mini-split installation.',
    slides: [
      {
        title: 'Heat Pump Reversing Valve & Defrost',
        body: [
          'A heat pump adds a reversing valve (also called a 4-way valve) to the refrigeration circuit — by reversing refrigerant flow direction, the system can either heat or cool the indoor space.',
          'In cooling mode, the indoor coil acts as the evaporator (absorbs heat from the room); in heating mode, the reversing valve switches flow so the outdoor coil becomes the evaporator (absorbs heat from the outdoor air) and the indoor coil becomes the condenser (releases heat into the room).',
          'Heat pumps can extract useful heat from outdoor air down to about -13°F (-25°C) with modern variable-speed compressors — below this point, electric resistance auxiliary heat supplements or takes over.',
          'The reversing valve is energized in cooling mode on most equipment ("energized-cooling" or O/B wiring) — when the thermostat O terminal energizes the valve, the system is in cooling; on heat call, the valve de-energizes and refrigerant flows in the heating direction.',
          'Frost forms on the outdoor coil in heating mode below about 45°F outdoor temperature combined with high humidity — frost accumulation insulates the coil, reducing heat absorption and efficiency.',
          'Defrost is initiated by a time-and-temperature or demand control: the reversing valve briefly switches to cooling mode (outdoor coil becomes the condenser), melting frost with hot refrigerant — simultaneously, the outdoor fan stops and indoor auxiliary heat is energized to prevent blowing cold air.',
          'A defrost board controls initiation timing, maximum defrost duration (typically 10 minutes), and termination via a defrost thermostat clipped to the coil — if defrost terminates on time rather than temperature, the thermostat may be faulty or in the wrong location.',
        ],
        keyPoints: [
          'Reversing valve switches refrigerant direction: outdoor coil is evaporator in heating mode, condenser in cooling mode',
          'Defrost = brief cooling mode reversal to melt coil frost; outdoor fan stops, aux heat energizes during defrost',
          'On most units: O/B terminal energized = cooling mode (check wiring label — some brands energize on heat)',
        ],
        quiz: [
          {
            q: 'In heat pump heating mode, which coil acts as the evaporator (absorbing heat from the environment)?',
            a: ['Indoor coil', 'Outdoor coil', 'Both coils simultaneously', 'Neither — heating mode uses electric resistance strips only'],
            correct: 1,
            exp: 'In heating mode, the reversing valve redirects refrigerant so the outdoor coil becomes the evaporator. It absorbs heat energy from the outdoor air (even at low temperatures), and the indoor coil acts as the condenser, releasing heat into the living space.',
          },
          {
            q: 'A heat pump\'s defrost cycle is initiating every 30 minutes and running the full 10-minute maximum duration without terminating early. What does this suggest?',
            a: ['Normal operation in very cold, humid weather', 'Defrost thermostat is likely faulty or improperly located — coil is melting but sensor is not detecting defrost termination temperature', 'The reversing valve is stuck in cooling mode', 'Outdoor ambient temperature is too warm for frost to form'],
            correct: 1,
            exp: 'When defrost runs to the maximum time limit rather than terminating on the coil thermostat, it indicates the thermostat is not sensing the coil temperature correctly — it may be in the wrong location, have poor thermal contact, or be defective. Repeated maximum-duration defrosts waste energy and may damage the compressor.',
          },
        ],
      },
      {
        title: 'Mini-Split Systems & Efficiency Ratings',
        body: [
          'Mini-split (ductless) systems consist of an outdoor condensing unit connected to one or more indoor air handlers (heads) via refrigerant lines and low-voltage control wiring — no ductwork is required.',
          'Multi-zone mini-splits connect up to 8 indoor heads to one outdoor unit; the outdoor inverter-driven compressor modulates capacity to match the total indoor load, with each zone independently controlled.',
          'Inverter-driven compressors vary motor speed (and thus refrigerant flow rate and capacity) continuously, unlike single-speed compressors that cycle on and off — this reduces energy use, eliminates temperature swings, and allows operation at lower outdoor temperatures.',
          'SEER2 (Seasonal Energy Efficiency Ratio 2) measures cooling efficiency over an entire season; effective January 2023, SEER2 replaces SEER and uses a higher external static pressure test condition — the same unit will typically show a lower SEER2 than its old SEER rating.',
          'HSPF2 (Heating Seasonal Performance Factor 2) measures heat pump heating efficiency over a season — it represents BTU of heat produced per watt-hour of electricity consumed across a range of outdoor temperatures, including defrost and auxiliary heat use.',
          'Mini-split refrigerant line sets must be insulated to prevent condensation and capacity loss — the vapor (suction) line carries cold, low-pressure refrigerant in cooling mode and must be fully insulated; the liquid line typically needs insulation only in heating mode.',
          'Proper flaring of the copper line set connections is critical — a poor flare causes refrigerant leaks; use a ratcheting flare tool to the correct torque and inspect for cracks, ovality, or roughness before tightening the flare nut.',
        ],
        keyPoints: [
          'Inverter compressor modulates speed continuously — better efficiency and comfort than single-speed cycling',
          'SEER2 (cooling) and HSPF2 (heating) are the current DOE efficiency metrics — SEER2 tests at higher static pressure than old SEER',
          'Flare connections on mini-split line sets must be perfect — a bad flare means refrigerant leak; no field soldering',
        ],
        quiz: [
          {
            q: 'What is the primary advantage of an inverter-driven compressor over a single-speed compressor?',
            a: ['It eliminates the need for a reversing valve in heat pump operation', 'It varies compressor speed to precisely match load, reducing energy use, temperature swings, and allowing lower-temperature operation', 'It operates at higher refrigerant pressure for more capacity', 'It does not require a run capacitor'],
            correct: 1,
            exp: 'Inverter (variable-speed) compressors modulate between roughly 15–100% of rated capacity by varying the motor frequency. This allows them to maintain set temperature with minimal cycling, operate more efficiently at part load, and extract useful heat at lower outdoor temperatures than single-speed compressors.',
          },
          {
            q: 'A mini-split line set shows refrigerant oil staining at a flare connection. What is the correct repair?',
            a: ['Tighten the flare nut with a wrench to stop the leak', 'Apply refrigerant-compatible sealant around the connection', 'Recover the refrigerant, cut and re-flare the tubing, and remake the connection to spec', 'Add refrigerant to compensate for the leak and monitor for 30 days'],
            correct: 2,
            exp: 'Oil staining at a flare indicates a refrigerant leak at the connection. Tightening a bad flare often cracks it further. The correct repair is to recover refrigerant, cut back the tubing to good copper, make a new flare using a proper ratcheting flare tool, and remake the connection. Adding refrigerant without fixing the leak is illegal under Section 608 and ineffective.',
          },
        ],
      },
    ],
    test: [
      { q: 'In a heat pump, which component allows the system to reverse refrigerant flow direction to switch between heating and cooling?', a: ['Accumulator', 'Check valve', 'Reversing (4-way) valve', 'Suction line filter-drier'], correct: 2, exp: 'The reversing (4-way) valve is the key component that distinguishes a heat pump from a cooling-only system. It redirects refrigerant flow so the indoor and outdoor coil functions can be swapped.' },
      { q: 'On a standard "O" wiring heat pump thermostat, when the O/B terminal is de-energized, the system is in what mode?', a: ['Cooling mode', 'Heating mode', 'Emergency heat mode', 'Fan-only mode'], correct: 1, exp: 'On O-wired thermostats (most common), energizing O puts the reversing valve in the cooling position. De-energizing O allows the valve spring to shift to heating position. Always verify by checking the equipment wiring label.' },
      { q: 'SEER2 replaced SEER as the DOE cooling efficiency metric in 2023. How does the SEER2 test condition differ from the old SEER test?', a: ['SEER2 uses a higher outdoor test temperature', 'SEER2 uses a higher external static pressure, making conditions more realistic and resulting in lower numerical ratings', 'SEER2 measures only peak cooling performance, not seasonal average', 'SEER2 requires testing at multiple geographic locations'], correct: 1, exp: 'SEER2 uses 0.5 in. w.g. external static pressure vs. 0.1 in. w.g. for old SEER — closer to real-world ductwork conditions. The same unit will show a lower SEER2 than its old SEER number (approximately 5% lower on average).' },
      { q: 'What initiates an HVAC heat pump defrost cycle?', a: ['The thermostat calls for emergency heat', 'A time-and-temperature or demand control detecting frost buildup on the outdoor coil', 'The outdoor ambient temperature dropping below 32°F', 'The indoor air handler detects a freezing indoor coil'], correct: 1, exp: 'Defrost is initiated by a dedicated defrost control board using time (fixed intervals of 30–90 min) plus an outdoor coil temperature sensor that must be below a set threshold, or by demand defrost sensing coil conductance changes. Frost requires both cold temperatures AND high humidity.' },
      { q: 'During heat pump defrost cycle, what happens to the indoor auxiliary electric heat strips?', a: ['They are de-energized to prevent overheating', 'They energize to maintain indoor temperature while the heat pump temporarily shifts to cooling mode', 'They remain in whatever state the thermostat commanded', 'They are disconnected by the defrost board to protect the compressor'], correct: 1, exp: 'During defrost, the reversing valve switches to cooling mode — the indoor coil becomes the evaporator, blowing cold air. The auxiliary heat strips automatically energize to temper the supply air and maintain indoor comfort during the defrost period.' },
      { q: 'A multi-zone mini-split system has 5 indoor heads connected to one outdoor unit. How does the outdoor unit respond when only 2 of 5 zones are calling for cooling?', a: ['It runs at full capacity and the unused zones shut their louvers', 'The inverter compressor modulates down to match the reduced load of only 2 active zones', 'It shuts off completely until all 5 zones call simultaneously', 'It runs at 40% capacity regardless of zone demand'], correct: 1, exp: 'Inverter-driven outdoor units continuously modulate compressor speed to match the aggregate demand of the active indoor heads. Running 2 of 5 zones means the compressor operates at a fraction of full capacity, maintaining efficiency and avoiding the energy waste of full-speed cycling.' },
      { q: 'Which refrigerant is most commonly used in modern residential mini-split systems in North America?', a: ['R-22 (HCFC — phased out)', 'R-134a (used in automotive)', 'R-410A (HFC — current standard)', 'R-290 (propane — A3 flammable)'], correct: 2, exp: 'R-410A is the dominant refrigerant in North American residential mini-splits and conventional splits as of 2024. R-32 is gaining ground (higher GWP efficiency, lower GWP than R-410A) and R-454B / R-32 will replace R-410A under new EPA SNAP rules.' },
      { q: 'What is HSPF2 and what does it measure?', a: ['Heating System Performance Factor — measures peak heating output in BTU', 'Heating Seasonal Performance Factor 2 — BTU of heat produced per watt-hour consumed over the full heating season', 'Heat Sink Performance Factor — efficiency of the outdoor coil as a heat absorber', 'High-Speed Performance Factor — compressor efficiency at maximum speed'], correct: 1, exp: 'HSPF2 is the seasonal heating efficiency metric for heat pumps under the updated DOE test procedure. A higher HSPF2 means more BTU of heat delivered per watt-hour consumed, accounting for defrost cycles, auxiliary heat use, and varying outdoor temperatures over the heating season.' },
      { q: 'Why must the suction line of a mini-split line set be insulated in cooling mode?', a: ['To prevent the refrigerant from overheating before reaching the compressor', 'To prevent condensation on the cold suction line that would cause moisture damage and capacity loss', 'To reduce refrigerant pressure drop in the line', 'To comply with SEER2 testing requirements'], correct: 1, exp: 'In cooling mode, the suction line carries cold, low-pressure refrigerant vapor from the indoor evaporator to the outdoor compressor. Without insulation, warm humid air condenses on the cold pipe, wasting refrigerant capacity, causing dripping, and promoting mold and corrosion.' },
      { q: 'A technician is making a flare connection on a 3/8" copper line for a mini-split. After flaring, the flare shows a small crack in the bell. What should be done?', a: ['Apply Nylog refrigerant sealant and proceed', 'Tighten extra firmly to compress the crack closed', 'Cut back the tubing, discard the cracked flare end, and re-flare with a ratcheting flare tool', 'Use a push-fit connector over the flare end to reinforce it'], correct: 2, exp: 'A cracked flare will leak refrigerant under system pressure. The only correct fix is to cut back at least 1" past the crack, inspect the copper for work-hardening or contamination, and make a new flare. A ratcheting flare tool with the correct die size produces a consistent, leak-free flare.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 14 — AIR HANDLING & DISTRIBUTION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'hvact-airhandling',
    num: 14,
    title: 'Air Handling & Distribution Systems',
    desc: 'Ductwork design, static pressure, airflow measurement, filtration, and indoor air quality.',
    slides: [
      {
        title: 'Ductwork Design & Static Pressure',
        body: [
          'Total external static pressure (TESP) is the sum of the static pressure drops across all components in the air distribution system — supply ductwork, return ductwork, filter, coil, and any accessories — that the air handler blower must overcome.',
          'Most residential air handlers are rated at 0.5 in. w.g. (water gauge) TESP; commercial equipment may be rated to 1.0–2.5 in. w.g. — exceeding the rated TESP reduces airflow, overloads the blower motor, and causes high static pressure fault codes on variable-speed systems.',
          'The extended plenum (trunk and branch) duct system is the most common residential design: a large main trunk off the air handler with takeoffs to individual branch runs — reducing trunk size as branches are taken off maintains velocity.',
          'Duct leakage is the primary cause of HVAC efficiency loss in homes — ducts in unconditioned spaces (attic, crawlspace) typically leak 20–40% of conditioned air before it reaches the living space; pressure testing and duct sealing (mastic or UL 181 tape) are the remediation standard.',
          'Undersized return ducts are the single most common installation error — insufficient return air causes negative pressure in the house, pulling unconditioned air in through gaps, raising humidity, and increasing energy use.',
          'Manual D (ACCA) is the industry standard duct sizing procedure — it calculates required airflow to each room based on the Manual J load calculation, then sizes ductwork to deliver that airflow at acceptable velocity and pressure drop.',
          'Flexible duct must be fully extended and supported at maximum 4-foot intervals; a compressed or kinked flex duct section can increase static pressure dramatically and reduce airflow to the room by 50% or more.',
        ],
        keyPoints: [
          'TESP must not exceed equipment rating — undersized ducts or dirty filters raise static and reduce airflow',
          'Return duct undersizing = negative house pressure, humidity problems, and infiltration',
          'Flex duct must be fully extended, no kinks or sags — compressed flex dramatically increases static pressure',
        ],
        quiz: [
          {
            q: 'A homeowner complains that one bedroom is significantly warmer than the rest of the house. The technician finds the flex duct branch to that room is severely compressed at a joist penetration. What is the likely cause of the comfort problem?',
            a: ['The TXV is not feeding that zone properly', 'The compressed flex duct has increased static pressure and dramatically reduced airflow to that room', 'The room thermostat is defective', 'The evaporator coil is partially frozen, blocking that branch'],
            correct: 1,
            exp: 'Compressed flex duct multiplies friction losses — a 6" round flex duct compressed to 3" oval may have 5–10× the friction of a properly extended run. The reduced airflow leaves the room under-conditioned. The fix is to reroute the duct with adequate clearance at the joist and ensure full extension with proper support.',
          },
          {
            q: 'What does high total external static pressure (TESP) measured on a residential air handler indicate?',
            a: ['The system has more airflow than designed', 'There is excessive resistance in the duct system — dirty filter, undersized ducts, or restrictions — reducing blower airflow', 'The refrigerant charge is too high', 'The outdoor unit is oversized for the indoor coil'],
            correct: 1,
            exp: 'High TESP means the blower is working against more resistance than it was designed for. Common causes include: clogged filter, undersized ducts, kinked flex, closed dampers, or a dirty evaporator coil. High TESP reduces airflow, decreases capacity, and can cause freeze-up (low airflow) or motor overload.',
          },
        ],
      },
      {
        title: 'Filtration & Indoor Air Quality',
        body: [
          'MERV (Minimum Efficiency Reporting Value) rates filter efficiency from 1–16: MERV 1–4 catches large particles; MERV 8–11 catches mold, dust mites, and pet dander; MERV 13–16 catches bacteria, smoke, and fine particles — higher MERV also increases static pressure drop across the filter.',
          'A MERV 16 filter installed in a residential air handler designed for MERV 6 will raise static pressure to the point that airflow is severely reduced — always check the manufacturer\'s maximum allowable filter MERV rating before upgrading.',
          'HEPA (High Efficiency Particulate Air) filters capture 99.97% of particles 0.3 μm and larger — they are not compatible with standard residential air handlers without a bypass or additional blower due to extreme static pressure drop.',
          'Carbon monoxide (CO) in HVAC: a cracked heat exchanger in a gas furnace can allow combustion gases (including CO) to mix with supply air — the heat exchanger must be visually inspected for cracks at every furnace maintenance, using a smoke pencil or combustion analyzer to detect cross-contamination.',
          'Carbon dioxide (CO₂) monitoring is used in commercial HVAC for demand-controlled ventilation (DCV): when occupancy is low, CO₂ is low and outdoor air dampers modulate down; rising CO₂ signals increased occupancy and the system opens dampers to deliver more fresh air.',
          'Relative humidity (RH) in conditioned spaces should be maintained between 35–60% — below 35% causes dry skin, static electricity, and wood damage; above 60% promotes mold growth, dust mites, and structural moisture damage.',
          'Whole-house dehumidifiers are installed in series with the HVAC system (typically in the return plenum) and run independently of the cooling system — in mild weather when cooling is not needed but humidity is high, the dehumidifier maintains RH without overcooling the space.',
        ],
        keyPoints: [
          'Higher MERV = better filtration but higher static pressure drop — never exceed the air handler\'s maximum MERV rating',
          'Cracked heat exchanger = CO cross-contamination into supply air — inspect at every furnace PM',
          'Maintain indoor RH 35–60%; below 35% = static and wood damage; above 60% = mold and dust mites',
        ],
        quiz: [
          {
            q: 'A homeowner installs MERV 16 filters in a residential air handler rated for MERV 8. What is the most likely outcome?',
            a: ['Significantly improved air quality with no performance impact', 'Increased static pressure across the filter, reduced airflow, possible coil freeze-up, and motor overload', 'Reduced energy consumption due to cleaner coil', 'The thermostat will display a filter change reminder sooner'],
            correct: 1,
            exp: 'MERV 16 filters have much higher static pressure drop than MERV 8. In a residential system designed for MERV 8, the higher restriction reduces airflow through the coil, which can freeze the evaporator (low airflow with refrigerant still absorbing heat), overload the blower motor, and reduce system capacity.' },
          {
            q: 'During a gas furnace inspection, a technician holds a smoke pencil near a suspected heat exchanger crack while the burner is firing and the blower is running. The smoke is drawn toward the crack and disappears. What does this indicate?',
            a: ['Normal heat exchanger operation — slight air movement is expected', 'A crack allows negative-pressure supply air to pull combustion gases (including CO) through the heat exchanger into the supply airstream', 'The filter is dirty and restricting return air', 'The induced draft motor is running too fast'],
            correct: 1,
            exp: 'A cracked heat exchanger creates a path between the combustion side and supply air side. The blower creates slight positive pressure on the supply side, or the draft fan creates negative pressure on the combustion side, causing combustion gases including CO to enter the supply air. This is a life-safety hazard requiring immediate system shutdown and heat exchanger replacement.',
          },
        ],
      },
    ],
    test: [
      { q: 'What does TESP stand for, and what does it measure in an HVAC air distribution system?', a: ['Total Equipment Static Pressure — compressor pressure differential', 'Total External Static Pressure — resistance the blower must overcome to move air through the duct system', 'Total Efficiency Static Performance — seasonal energy rating', 'Thermal Exchange Static Point — evaporator saturation pressure'], correct: 1, exp: 'TESP is the sum of all static pressure drops in the air distribution path (supply ducts, return ducts, filter, coil, diffusers) measured external to the air handler. It represents the resistance the blower must overcome and is compared to the equipment\'s rated ESP.' },
      { q: 'What MERV range is typically recommended for residential systems to capture dust, pollen, mold spores, and pet dander without excessive static pressure?', a: ['MERV 1–4 (low restriction)', 'MERV 8–11 (moderate efficiency)', 'MERV 13–16 (hospital grade)', 'HEPA (beyond MERV scale)'], correct: 1, exp: 'MERV 8–11 is the residential sweet spot — efficient enough to capture allergens and mold spores but low enough pressure drop to work with standard residential blowers. MERV 13+ is viable in some systems but must be verified against the manufacturer\'s maximum allowable static.' },
      { q: 'The ACCA Manual D procedure is used to:', a: ['Calculate heating and cooling loads for a building (load calculation)', 'Size ductwork to deliver correct airflow to each room at acceptable velocity and pressure drop', 'Select the correct equipment size based on load', 'Calculate refrigerant charge by weight'], correct: 1, exp: 'Manual D is ACCA\'s duct design standard. It uses the room-by-room airflow requirements from Manual J (load calculation) to size supply and return ducts for proper velocity, noise, and pressure drop.' },
      { q: 'Demand-controlled ventilation (DCV) in a commercial building uses which sensor to modulate outdoor air dampers?', a: ['Temperature sensor in the return air', 'CO₂ sensor in the return air or occupied zone', 'Humidity sensor at the supply diffuser', 'CO sensor at the outdoor air intake'], correct: 1, exp: 'CO₂ is a proxy for occupancy — humans exhale CO₂, so a rising CO₂ level indicates more people in the space requiring more ventilation. DCV systems modulate the outdoor air damper to maintain a target CO₂ level (typically 1,000–1,200 ppm), reducing ventilation energy when spaces are partially occupied.' },
      { q: 'What is the recommended indoor relative humidity range for occupied spaces?', a: ['20–35%', '35–60%', '60–75%', '75–85%'], correct: 1, exp: 'The ASHRAE and EPA recommended range is 35–60% RH. Below 35%, occupants experience dry skin, static electricity, and wood/furniture damage. Above 60%, mold growth, dust mite proliferation, and structural moisture damage become concerns.' },
      { q: 'Flexible duct must be supported at a maximum interval of:', a: ['2 feet', '4 feet', '6 feet', '8 feet'], correct: 1, exp: 'ACCA and duct manufacturers specify maximum 4-foot support intervals for flexible duct. Longer unsupported spans allow the duct to sag, which creates increased friction, reduced airflow, and potential for premature failure of the inner liner.' },
      { q: 'An HVAC technician finds a cracked heat exchanger in a gas furnace during a maintenance visit. What is the correct action?', a: ['Continue operation and note it for the next visit', 'Apply high-temperature sealant to the crack and continue', 'Immediately shut down the furnace and notify the owner — CO hazard; heat exchanger must be replaced', 'Increase combustion air to dilute any CO that enters the supply air'], correct: 2, exp: 'A cracked heat exchanger is a life-safety emergency. Carbon monoxide from combustion can enter the living space supply air. The correct action is immediate shutdown, tagging the unit out of service, notifying the homeowner of the CO hazard, and arranging for heat exchanger replacement or furnace replacement before restarting.' },
      { q: 'Why is return duct undersizing the most common HVAC installation error?', a: ['It causes the supply air to be too warm', 'Insufficient return area creates negative pressure in the house, pulling unconditioned infiltration air in and reducing system efficiency', 'It overloads the outdoor compressor', 'It causes the thermostat to cycle too rapidly'], correct: 1, exp: 'Adequate return air pathways are essential for proper system operation. Undersized returns create a vacuum in the house — infiltration air enters through gaps, bringing in humidity, pollutants, and unconditioned air. The result is high humidity, high energy bills, and comfort complaints.' },
      { q: 'What is the correct field method to verify duct leakage in an existing residential system?', a: ['Measure supply air temperature at each diffuser', 'Perform a duct blower (blower door with duct leakage adapter) pressurization test to quantify cfm leakage to outside', 'Check static pressure at the air handler and compare to nameplate', 'Visually inspect accessible duct joints for gaps'], correct: 1, exp: 'A duct leakage test (Duct Blaster) pressurizes the duct system to 25 Pa and measures the flow required to maintain pressure — this directly quantifies leakage. Visual inspection misses leaks inside walls, crawlspaces, or under insulation. Duct testing is required by many energy codes.' },
      { q: 'HEPA filtration is generally NOT compatible with residential split systems because:', a: ['HEPA filters are not rated for HVAC applications', 'HEPA filters have extremely high static pressure drop that exceeds residential blower capability', 'HEPA requires 3-phase power for the filter ionizer', 'HEPA filters must be regenerated at temperatures above 250°F'], correct: 1, exp: 'HEPA filters have a pressure drop of 0.5–1.5 in. w.g. or more — far exceeding the 0.1–0.3 in. w.g. a residential filter typically contributes. Standard residential blowers cannot deliver adequate airflow against HEPA resistance without a dedicated HEPA bypass air cleaner with its own powered blower.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 15 — EPA SECTION 608 & REFRIGERANT HANDLING
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'hvact-epa608',
    num: 15,
    title: 'EPA Section 608 & Refrigerant Handling',
    desc: 'Clean Air Act Section 608, refrigerant recovery requirements, GWP, the AIM Act, and HFO transition refrigerants.',
    slides: [
      {
        title: 'Section 608 Recovery Requirements',
        body: [
          'EPA Section 608 of the Clean Air Act prohibits the knowing venting of Class I (CFCs, HCFCs) and Class II (HFCs) refrigerants — technicians must recover refrigerant before opening any system that contains more than a de minimis amount.',
          'Section 608 certification is required for any technician who purchases refrigerant in containers larger than 2 lbs — four certification types exist: Type I (small appliances ≤5 lbs factory-charged), Type II (high-pressure systems), Type III (low-pressure systems), and Universal (all three).',
          'Recovery efficiency requirements depend on system type and compressor condition: a system with an operating compressor must be recovered to at least 0 psig (for high-pressure refrigerants) or to the pressure specified in the EPA tables for that refrigerant.',
          'Refrigerant recovery equipment must be listed to ARI 740 standard — the equipment certification category determines what recovery depth (vacuum level) the machine must achieve on various system sizes.',
          'Recovered refrigerant that is returned to the same system or to another system owned by the same customer does not require reclamation — but refrigerant sold or transferred to another owner must meet ARI 700 purity standards (reclaimed grade).',
          'Section 608 fines can reach $44,539 per day per violation for knowing venting — EPA enforcement uses informants, vendor records, and purchase tracking to identify violations.',
          'The de minimis exemption allows small amounts released "in the course of good faith attempts to recover" — it does not allow deliberate venting; technicians must use recovery equipment even when residual amounts remain.',
        ],
        keyPoints: [
          'Section 608: MUST recover refrigerant before opening any system — no deliberate venting of CFCs, HCFCs, or HFCs',
          'Four cert types: I (small appliance), II (high-pressure), III (low-pressure), Universal — required to buy in containers >2 lbs',
          'Reclaimed refrigerant (sold to another owner) must meet ARI 700 purity; own-system recovery needs no reclaim',
        ],
        quiz: [
          {
            q: 'Under EPA Section 608, which action is ALWAYS required before opening a refrigerant circuit containing R-410A?',
            a: ['Notify the EPA regional office 24 hours in advance', 'Recover the refrigerant to the required vacuum depth using certified recovery equipment', 'Obtain a Section 609 automotive certification', 'Apply for a one-time venting exemption from the EPA'],
            correct: 1,
            exp: 'R-410A is a Class II HFC refrigerant subject to Section 608. Knowing venting is prohibited. The technician must use certified recovery equipment (ARI 740 listed) to recover the charge to the required depth before opening the system — there is no permit or exemption for deliberate venting.',
          },
          {
            q: 'A technician recovers refrigerant from a customer\'s rooftop unit into a recovery cylinder and then transfers it to a different customer\'s system. Is this compliant with Section 608?',
            a: ['Yes — recovered refrigerant can be transferred freely between any systems', 'No — refrigerant transferred to a different owner\'s system must be reclaimed to ARI 700 purity standards first', 'Yes — as long as both customers agree in writing', 'No — recovered refrigerant must be returned to the original system only'],
            correct: 1,
            exp: 'Section 608 allows recovered refrigerant to be returned to the same system or other systems owned by the same customer without reclamation. Transfer to a different owner\'s system requires reclamation to ARI 700 purity — it must be processed by a certified reclamer to remove contaminants and verify composition.',
          },
        ],
      },
      {
        title: 'AIM Act, GWP & Low-GWP Refrigerant Transition',
        body: [
          'The AIM Act (American Innovation and Manufacturing Act, 2020) gives the EPA authority to phase down HFC production and consumption by 85% over 15 years — HFCs like R-410A have a GWP of ~2,088 and are targeted for replacement.',
          'GWP (Global Warming Potential) measures a refrigerant\'s heat-trapping effect relative to CO₂ over 100 years — R-22 (GWP 1,810), R-410A (GWP 2,088), R-32 (GWP 675), R-454B (GWP 466), R-32 is gaining adoption in mini-splits.',
          'Effective January 1, 2025, new residential and light commercial HVAC equipment must use refrigerants with GWP ≤700 — R-410A is prohibited in new equipment; R-454B (Opteon XL41) and R-32 are leading replacement candidates.',
          'R-454B is an A2L refrigerant — mildly flammable (lower flammability limit of 9.9% by volume in air), requiring equipment with A2L-rated components, spark-ignition prevention, and leak detection in enclosed applications per ASHRAE 15 and UL 60335-2-40.',
          'A2L refrigerants require modified service procedures: lower charge limits for enclosed spaces, refrigerant detectors in machine rooms, ignition-source elimination (no open flames, no non-intrinsically-safe power tools while refrigerant may be present), and A2L-rated recovery equipment.',
          'R-22 (HCFC) production was banned in the United States after January 1, 2020 — only reclaimed or recovered R-22 may be used for servicing existing equipment; new equipment must use an approved alternative.',
          'Technicians servicing legacy R-22 equipment must hold at least a Type II Section 608 certification and use recovery equipment approved for R-22; mixing refrigerants in recovery cylinders is prohibited and creates a hazardous, unidentifiable mixture.',
        ],
        keyPoints: [
          'AIM Act phases down HFC production 85% by 2036 — R-410A prohibited in new equipment after Jan 1, 2025',
          'A2L refrigerants (R-454B, R-32): mildly flammable — no open flames, no venting, leak detectors required in enclosed spaces',
          'R-22 is banned from production — only reclaimed R-22 may be used for service; never mix refrigerants in recovery cylinders',
        ],
        quiz: [
          {
            q: 'A technician is servicing a new R-454B (A2L refrigerant) split system in an equipment room. Which precaution is required that is NOT needed for R-410A systems?',
            a: ['Wearing refrigerant-rated gloves', 'Eliminating ignition sources and using a refrigerant leak detector in the enclosed space due to A2L mild flammability', 'Using a longer recovery hose', 'Charging the system as vapor rather than liquid'],
            correct: 1,
            exp: 'A2L refrigerants like R-454B are mildly flammable — they can ignite if concentration exceeds the lower flammability limit (LFL) and an ignition source is present. In enclosed equipment rooms, ASHRAE 15 and UL 60335-2-40 require refrigerant leak detectors, ignition-source elimination, and minimum ventilation rates to prevent dangerous accumulation.',
          },
          {
            q: 'A customer has a 15-year-old R-22 rooftop unit with a large refrigerant leak. What is the correct approach to refilling the charge?',
            a: ['Purchase new R-22 from a wholesale supplier', 'Use only reclaimed or recovered R-22 meeting ARI 700 purity — no new R-22 has been manufactured in the US since January 2020', 'Use R-410A as a drop-in replacement without system modification', 'Blend R-22 with R-407C to stretch the supply'],
            correct: 1,
            exp: 'New R-22 production (including import) was banned after January 1, 2020. Only reclaimed or recovered R-22 that meets ARI 700 purity standards may be used for service. R-410A and R-407C are NOT drop-in replacements — they require different compressor oil, pressures, and metering devices. The customer should evaluate equipment replacement.',
          },
        ],
      },
    ],
    test: [
      { q: 'Which EPA regulation governs refrigerant recovery and prohibits the knowing venting of refrigerants during HVAC service?', a: ['Clean Air Act Section 609 (mobile air conditioning)', 'Clean Air Act Section 608 (stationary refrigeration and AC)', 'OSHA 29 CFR 1910.120 (hazardous waste)', 'EPA SNAP Rule 23 (substitutes)'], correct: 1, exp: 'Section 608 covers stationary refrigeration and air conditioning equipment. It prohibits knowing venting of Class I (CFCs/HCFCs) and Class II (HFCs) refrigerants and requires EPA-certified technicians to use certified recovery equipment.' },
      { q: 'What is the minimum container size of refrigerant that requires Section 608 technician certification to purchase?', a: ['1 lb', '2 lbs', '5 lbs', '20 lbs'], correct: 1, exp: 'Technicians must hold Section 608 certification to purchase refrigerant in containers exceeding 2 lbs. Containers 2 lbs and under are available without certification (e.g., small cans for unitary equipment defined as small appliances under the rule).' },
      { q: 'The AIM Act targets an 85% phasedown of HFC production and consumption by which year?', a: ['2025', '2030', '2036', '2050'], correct: 2, exp: 'The AIM Act (2020) sets an 85% phasedown of HFC production and consumption by 2036, using a step-down schedule. The EPA\'s AIM Act rulemaking implements this schedule through allowance allocations to producers and importers.' },
      { q: 'R-454B has a GWP of approximately 466. Why is this significant for new HVAC equipment sold after January 1, 2025?', a: ['GWP 466 makes R-454B exempt from Section 608 recovery requirements', 'GWP 466 is below the 700 GWP limit required for new residential HVAC equipment — making R-454B compliant with the EPA\'s AIM Act equipment rule', 'GWP 466 qualifies R-454B for a tax credit under the Inflation Reduction Act', 'GWP 466 means R-454B can be vented without penalty'], correct: 1, exp: 'The EPA\'s AIM Act equipment rule prohibits new residential and light commercial HVAC equipment using refrigerants with GWP above 700 after January 1, 2025. R-454B\'s GWP of ~466 is well below this limit, making it EPA-compliant for new equipment. R-410A\'s GWP of 2,088 is not.' },
      { q: 'What ASHRAE safety classification applies to R-454B and R-32, indicating they are mildly flammable?', a: ['A1 (non-flammable)', 'A2L (mildly flammable, lower burning velocity)', 'A2 (flammable)', 'A3 (highly flammable)'], correct: 1, exp: 'A2L refrigerants have a burning velocity ≤10 cm/s and a lower flammability limit (LFL) ≥3.5% — they can burn but only under specific conditions. A2L is distinct from A2 (higher burning velocity) and A3 (highly flammable, like propane R-290).' },
      { q: 'Which recovery cylinder color indicates it contains a flammable refrigerant (A2, A2L, or A3 ASHRAE class)?', a: ['Gray with a yellow shoulder', 'Yellow with a gray shoulder', 'Red with a gray shoulder', 'Blue with a gray shoulder'], correct: 0, exp: 'AHRI/DOT cylinder color coding: gray body with a yellow shoulder indicates the cylinder contains flammable refrigerant. Standard recovered/recycled refrigerant cylinders (gray body, yellow shoulder) also use this pattern. Technicians must verify cylinder labels — do not rely on color alone.' },
      { q: 'R-22 production was banned in the United States after what date?', a: ['January 1, 2010', 'January 1, 2015', 'January 1, 2020', 'January 1, 2025'], correct: 2, exp: 'The Clean Air Act phased out R-22 (an HCFC) production and import on January 1, 2020. After this date, only reclaimed, recycled, or previously produced R-22 may be used for servicing existing equipment.' },
      { q: 'Recovered refrigerant that will be sold to another building owner must meet which purity standard?', a: ['AHRI 740 (recovery equipment standard)', 'ARI 700 (refrigerant purity standard for reclaimed refrigerant)', 'ASHRAE 15 (safety standard)', 'EPA Method 25 (emissions measurement)'], correct: 1, exp: 'ARI 700 specifies the purity requirements for reclaimed refrigerant — moisture content, non-condensables, acidity, and blend ratio are all tested. Refrigerant transferred to a different owner must meet ARI 700; refrigerant returned to the same system or same customer\'s system does not require reclamation.' },
      { q: 'What is the consequence of mixing two different refrigerants (e.g., R-410A and R-22) in a recovery cylinder?', a: ['The refrigerants separate back out within 24 hours', 'The mixture cannot be reclaimed economically and must be disposed of as hazardous waste — and the cylinder is contaminated', 'The mixed refrigerant can be used in any system with a TXV', 'There is no consequence — all HFC refrigerants are interchangeable'], correct: 1, exp: 'Mixing refrigerants creates an unidentifiable blend. Reclamation facilities cannot economically separate blends, so the contaminated cylinder must be destroyed as hazardous waste. The technician also faces potential Section 608 violations for improper handling. Always use separate, labeled recovery cylinders for each refrigerant type.' },
      { q: 'What does the ARI 740 standard govern in the context of Section 608 compliance?', a: ['Purity requirements for reclaimed refrigerant sold commercially', 'Performance and efficiency testing requirements for refrigerant recovery equipment', 'The GWP calculation methodology for new refrigerants', 'Recovery cylinder pressure ratings and valve specifications'], correct: 1, exp: 'ARI 740 sets the testing and performance standards for refrigerant recovery/recycling equipment. Section 608 requires technicians to use recovery equipment that meets ARI 740, ensuring the equipment can achieve the required recovery efficiency levels specified by the EPA.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 16 — HVAC TROUBLESHOOTING & CAREER PATH
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'hvact-career',
    num: 16,
    title: 'HVAC Troubleshooting & Career Path',
    desc: 'Systematic diagnosis methodology, NATE certification, state licensing, and HVAC career progression.',
    slides: [
      {
        title: 'Systematic HVAC Troubleshooting',
        body: [
          'Systematic troubleshooting follows a defined process rather than random part replacement: (1) gather symptom information, (2) confirm the symptom, (3) identify possible causes, (4) test in order of likelihood and safety, (5) repair and verify, (6) document.',
          'The "refrigerant system is a system" principle: a single measured value (such as suction pressure) is meaningless without knowing subcooling, superheat, outdoor temperature, indoor return air temperature, and airflow — always take a complete set of measurements before drawing conclusions.',
          'The four-quadrant check: measure suction pressure/temperature, discharge pressure/temperature, subcooling (liquid line), and superheat (suction line) — these four values, combined with ambient conditions, pinpoint most refrigerant-side faults.',
          'Common fault signatures: high suction + low discharge = compressor valve leak; low suction + low discharge + low subcooling = undercharge; high suction + high discharge = overcharge or non-condensables; normal pressures + low superheat + freeze-up = low airflow.',
          'Electrical troubleshooting follows the circuit: verify line voltage, then check contactor coil voltage (24V), then contactor contact voltage (line voltage at load side), then motor terminal voltage — each step isolates the fault to a component or wiring segment.',
          'Using a True RMS clamp meter is essential for troubleshooting variable-speed drives and inverter compressors — a standard averaging-type meter reads incorrectly on non-sinusoidal waveforms from VFDs, giving false amperage and voltage readings.',
          'Service documentation — completed service tickets with measurements, parts replaced, and customer signature — is both a legal record of work performed and a history file that enables predictive maintenance and trend analysis on repeat-call equipment.',
        ],
        keyPoints: [
          'Take a complete set of measurements before diagnosing — suction, discharge, subcooling, superheat, and ambient conditions',
          'Four-quadrant check pinpoints most refrigerant faults — learn the classic pressure/temperature signatures',
          'True RMS meter required for VFD and inverter systems — standard meters read incorrectly on non-sine waveforms',
        ],
        quiz: [
          {
            q: 'A residential AC system shows normal suction pressure, normal discharge pressure, but the evaporator coil is icing up. What is the most likely cause?',
            a: ['Refrigerant overcharge', 'Low airflow across the evaporator coil — dirty filter, collapsed duct, or failed blower', 'Compressor valve failure', 'Liquid line restriction'],
            correct: 1,
            exp: 'Normal pressures with a freezing coil indicates the refrigerant charge and system pressures are acceptable, but the coil is not absorbing enough heat due to insufficient airflow. Ice forms because the coil temperature drops below 32°F when air is not carrying enough BTU across it. Check filter, indoor blower operation, duct restrictions, and coil cleanliness.',
          },
          {
            q: 'A technician is troubleshooting a system with an inverter-driven compressor and reads 18 amps with a standard clamp meter, but the VFD nameplate says rated output is 12A. What is the most likely explanation?',
            a: ['The compressor is failing and drawing excess current', 'The standard averaging meter is reading incorrectly on the distorted waveform from the VFD — a True RMS meter is required', 'The VFD is overloaded and needs to be replaced', 'The clamp meter is faulty — replace it'],
            correct: 1,
            exp: 'Variable-frequency drives produce non-sinusoidal current waveforms with harmonic content. Standard averaging-type clamp meters are calibrated for pure sine waves and give erroneously high readings on distorted waveforms. A True RMS meter accurately measures the actual effective current regardless of waveform shape.',
          },
        ],
      },
      {
        title: 'NATE Certification & HVAC Career Path',
        body: [
          'NATE (North American Technician Excellence) is the most recognized HVAC technician certification in the industry — the Core exam covers general HVAC knowledge, and specialty exams (Air Conditioning, Heat Pumps, Gas Heating, etc.) demonstrate competency in specific disciplines.',
          'NATE-certified technicians command higher wages and employer preference — studies show NATE-certified techs complete first-call repairs more often, generate fewer callbacks, and have higher customer satisfaction scores.',
          'State HVAC licensing varies widely: some states require no license, others require an apprenticeship plus journeyman exam, and a few require a contractor\'s license for all HVAC work — always verify your state\'s requirements before working independently.',
          'EPA Section 608 certification is federally required and has no state-level substitute — it is the baseline requirement for any technician who purchases or handles refrigerant in containers over 2 lbs, regardless of state licensing status.',
          'HVAC career progression: apprentice (on-the-job training under journeyman) → journeyman technician (licensed in licensing states) → senior or specialty technician (commercial refrigeration, VRF, Building Automation) → HVAC contractor/business owner.',
          'Building automation systems (BAS) are a growing specialty — technicians who can integrate HVAC controls with Modbus, BACnet, and LON protocols are in high demand in commercial and institutional markets.',
          'Continuing education is required to maintain NATE certification (16 hours every 5 years) and may be required by state licensing boards — staying current with A2L refrigerant procedures, heat pump technology, and energy codes is essential for career advancement.',
        ],
        keyPoints: [
          'NATE Core + specialty exam = most recognized credential in HVAC; improves wages, callbacks, and customer satisfaction',
          'EPA 608 is federal requirement for refrigerant purchase — no state substitute; get Universal certification for maximum versatility',
          'State licensing requirements vary — verify your state before working independently; some states require contractor\'s license',
        ],
        quiz: [
          {
            q: 'Which certification is a federal requirement for purchasing refrigerant in containers larger than 2 lbs, regardless of state HVAC licensing?',
            a: ['NATE Core certification', 'EPA Section 608 certification', 'OSHA 10-hour construction safety card', 'ICC HVAC inspector certification'],
            correct: 1,
            exp: 'EPA Section 608 certification is the federal requirement for refrigerant purchase and handling. It is not a state credential and cannot be substituted by any state license. NATE is a voluntary industry credential. EPA 608 is required nationwide regardless of what state licensing exists or does not exist.',
          },
          {
            q: 'Which NATE exam must all HVAC technicians pass BEFORE taking a specialty exam (Air Conditioning, Heat Pumps, etc.)?',
            a: ['NATE Senior-level exam', 'NATE Core exam (general HVAC knowledge)', 'NATE Contractor Management exam', 'NATE Building Automation exam'],
            correct: 1,
            exp: 'The NATE Core exam tests general HVAC knowledge and is a prerequisite for all NATE specialty exams. After passing Core, technicians choose specialty exams — Air Conditioning, Gas Heating, Heat Pumps, Refrigeration, or others — to demonstrate competency in specific equipment categories.',
          },
        ],
      },
    ],
    test: [
      { q: 'A system shows high suction pressure, low discharge pressure, and suction and discharge pressures are nearly equalized. What fault does this suggest?', a: ['Refrigerant overcharge', 'Compressor valve failure — the compressor is not pumping effectively', 'Restricted liquid line', 'Non-condensables in the system'], correct: 1, exp: 'Equalized or near-equalized suction and discharge pressures with a running compressor indicate the compressor is not creating the pressure differential required for the cycle — a classic sign of failed suction or discharge valve reeds that allow gas to pass freely through the compressor.' },
      { q: 'Low suction pressure, low discharge pressure, and low subcooling together indicate:', a: ['Compressor valve failure', 'Refrigerant overcharge', 'Undercharge or liquid line restriction', 'Condenser fan failure'], correct: 2, exp: 'This triad — low suction, low discharge, low subcooling — points to insufficient refrigerant reaching the condenser. Undercharge (not enough refrigerant in the system) or a liquid line restriction (filter-drier restriction or kinked line) both starve the system of refrigerant mass flow, lowering pressures throughout.' },
      { q: 'What is the FIRST step in systematic HVAC troubleshooting?', a: ['Replace the most likely failed component', 'Recover the refrigerant charge', 'Gather symptom information from the customer and confirm the symptom', 'Check the breaker panel for tripped breakers'], correct: 2, exp: 'Systematic troubleshooting begins with information gathering — when did the problem start, is it constant or intermittent, any recent changes, what does the customer experience? Then confirm the symptom yourself before taking measurements or replacing parts.' },
      { q: 'NATE certification must be renewed by completing continuing education. How many hours are required every 5 years?', a: ['8 hours', '16 hours', '24 hours', '40 hours'], correct: 1, exp: 'NATE requires 16 hours of continuing education for recertification every 5 years. Education must come from NATE-approved providers and cover relevant technical topics.' },
      { q: 'A high suction pressure combined with high discharge pressure and adequate subcooling suggests:', a: ['Undercharge', 'Compressor valve failure', 'Overcharge or non-condensables raising head pressure', 'Expansion valve stuck closed'], correct: 2, exp: 'High suction + high discharge with adequate subcooling suggests too much refrigerant mass in the system (overcharge) or non-condensable gases (air) in the high side that raise head pressure without corresponding heat rejection. Overcharge also shows high subcooling; non-condensables show abnormal head pressure with relatively normal subcooling.' },
      { q: 'Why is a True RMS clamp meter required when measuring current on a variable-frequency drive output?', a: ['True RMS meters have a higher current range', 'VFD output is a synthesized non-sine waveform — averaging meters read the waveform incorrectly, giving false current readings', 'True RMS meters are safer to use around high-voltage drives', 'VFDs require a special meter clamp diameter'], correct: 1, exp: 'Standard averaging clamp meters assume a pure sine wave and apply a fixed correction factor. VFD outputs are PWM (pulse-width modulated) waveforms with significant harmonic content. A True RMS meter calculates the actual RMS value from the waveform samples, giving accurate readings regardless of waveform shape.' },
      { q: 'In licensing states, what is the typical career progression for an HVAC technician?', a: ['Journeyman → Apprentice → Master → Inspector', 'Apprentice → Journeyman → Specialty/Senior Tech → Contractor', 'Technician → NATE-Certified → EPA-Certified → Contractor', 'Helper → Installer → Service Tech → Service Manager'], correct: 1, exp: 'In licensing states, the formal progression is: apprentice (registered with state, working under a licensed journeyman), journeyman (licensed after exam and experience), specialty or senior technician (commercial, VRF, BAS), and ultimately contractor (business license allowing independent operation).' },
      { q: 'Which communication protocol is commonly used in commercial Building Automation Systems for HVAC integration?', a: ['Modbus TCP and BACnet', 'NMEA 2000 and CAN bus', 'PROFIBUS and DeviceNet', 'RS-232 and IEEE 802.11'], correct: 0, exp: 'BACnet (Building Automation and Control Networks) is the ASHRAE/ANSI standard protocol for commercial HVAC and building automation. Modbus (RS-485 or TCP) is widely used for equipment-level communication. HVAC technicians with BAS knowledge are in high demand.' },
      { q: 'An HVAC system has normal pressures but the indoor evaporator coil is completely iced over. After defrosting, what is the first component to check?', a: ['TXV superheat setting', 'Refrigerant charge level', 'Blower motor and airflow — dirty filter, failed capacitor, seized bearing', 'Outdoor condenser coil cleanliness'], correct: 2, exp: 'Iced evaporator with normal pressures points to insufficient airflow as the primary cause. Low airflow means not enough heat is being absorbed from the air, so the coil temperature drops below freezing. Check blower capacitor, motor amps, filter condition, and return air path before adjusting refrigerant charge.' },
      { q: 'What is the primary benefit of completing service documentation with measured values after every HVAC service call?', a: ['Required by EPA Section 608 for all refrigerant work', 'Provides a baseline and trend data for predictive maintenance; serves as legal documentation of work performed', 'Allows the technician to charge higher labor rates', 'Required by NATE certification for recertification credit'], correct: 1, exp: 'Detailed service records with measured values (pressures, temperatures, amps, voltages, refrigerant added or removed) create a history of system performance. Deviations from baseline values at future visits reveal developing problems before failure. Records also protect the technician legally in case of disputes about work performed.' },
    ],
  },
];
