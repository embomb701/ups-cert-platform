import type { TrainingModule } from './modules';

export const REF_TECH_MODULES: TrainingModule[] = [
  {
    id: 'ref-fundamentals',
    num: 11,
    title: 'Refrigeration Fundamentals',
    desc: 'Vapor compression cycle, thermodynamic principles, superheat, subcooling, and refrigerant properties.',
    slides: [
      {
        title: 'Vapor Compression Cycle',
        body: [
          'The vapor compression refrigeration cycle has four stages. (1) The compressor receives low-pressure refrigerant vapor from the evaporator and raises its pressure and temperature — work input drives the cycle. (2) The condenser rejects heat to the ambient; high-pressure vapor condenses to liquid. (3) The metering device (TXV or EEV) throttles the liquid to low pressure and temperature. (4) The evaporator absorbs heat from the refrigerated space; low-pressure liquid boils to vapor.',
          'Heat flows from the low-temperature refrigerated space to the high-temperature ambient — the opposite of the natural direction. The compressor supplies the energy to drive this "uphill" heat transfer. The coefficient of performance (COP) measures efficiency: COP = heat removed ÷ work input. A higher COP means less electrical energy per unit of refrigeration.',
        ],
        keyPoints: [
          'Four stages: compressor (raises pressure) → condenser (rejects heat) → metering device (drops pressure) → evaporator (absorbs heat)',
          'Compressor work moves heat from cold space to warm ambient against natural heat flow direction',
          'COP = heat removed ÷ compressor work input; higher COP = greater efficiency',
        ],
        quiz: [
          {
            q: 'In the vapor compression cycle, which component raises refrigerant pressure and temperature?',
            a: ['Condenser', 'Compressor', 'Evaporator', 'Metering device'],
            correct: 1,
            exp: 'The compressor does mechanical work on the refrigerant vapor, raising both its pressure and temperature before it enters the condenser.',
          },
          {
            q: 'The evaporator in a vapor compression system absorbs heat from:',
            a: ['The compressor motor', 'The ambient outdoor air', 'The refrigerated space or load', 'The condenser fan discharge'],
            correct: 2,
            exp: 'The evaporator is the low-pressure heat exchanger where liquid refrigerant boils and absorbs heat from the food, air, or product in the refrigerated space.',
          },
        ],
      },
      {
        title: 'Superheat and Subcooling',
        body: [
          'Superheat is the temperature rise of refrigerant vapor above the saturation (boiling) point at a given pressure, measured at the evaporator outlet. TXV target: 8–12°F. Low superheat (below 5°F) risks liquid slugging the compressor because liquid refrigerant cannot be compressed and can bend connecting rods or shatter valves. High superheat (above 15°F) means the evaporator is starved of refrigerant, reducing capacity and wasting evaporator surface.',
          'Subcooling is the temperature drop of liquid refrigerant below the saturation (condensing) point at the condenser outlet. Target: 10–15°F. Adequate subcooling ensures that only liquid (no vapor) reaches the metering device — refrigerant entering the TXV as a vapor-liquid mixture causes the valve to hunt and starves the evaporator. Insufficient subcooling (flash gas in the liquid line) is a common cause of low capacity complaints.',
        ],
        keyPoints: [
          'Superheat = temperature above saturation at evaporator outlet; target 8–12°F for TXV',
          'Low superheat risks liquid slugging; high superheat starves the evaporator',
          'Subcooling = temperature below saturation at condenser outlet; target 10–15°F',
          'Insufficient subcooling causes flash gas at the metering device, reducing capacity',
        ],
        quiz: [
          {
            q: 'What is the standard TXV superheat target at the evaporator outlet?',
            a: ['20–30°F', '8–12°F', '2–4°F', '40–50°F'],
            correct: 1,
            exp: 'TXV superheat is set to 8–12°F to ensure all refrigerant is fully vaporized before reaching the compressor, without excessive superheat that would reduce evaporator capacity.',
          },
          {
            q: 'Flash gas in the liquid line entering the TXV is caused by:',
            a: ['High suction superheat', 'Insufficient subcooling', 'Refrigerant overcharge', 'Condenser fan failure'],
            correct: 1,
            exp: 'If subcooling is inadequate, refrigerant partially boils (flashes) in the liquid line before reaching the TXV, causing the valve to feed vapor instead of liquid — reducing capacity and causing hunting.',
          },
        ],
      },
      {
        title: 'Pressure-Temperature Relationship',
        body: [
          'For a pure refrigerant, saturation pressure and temperature are uniquely related — the P-T chart maps this relationship. Knowing the refrigerant and suction pressure, the technician reads the saturation temperature; comparing it to the measured suction line temperature gives superheat. Similarly, comparing the measured liquid line temperature to the saturation temperature at head pressure gives subcooling.',
          'Always verify against the specific refrigerant P-T chart. Common examples: R-404A at 25°F evaporating is approximately 27 psig suction; at 120°F condensing it is approximately 330 psig head. R-448A and R-449A (R-404A replacements) have different P-T relationships and require their own charts. Never assume one HFC blend has the same P-T data as another.',
        ],
        keyPoints: [
          'P-T relationship is unique to each refrigerant — always use the correct P-T chart',
          'Suction pressure → saturation temperature → compare to actual temp → gives superheat',
          'Head pressure → saturation temperature → compare to liquid line temp → gives subcooling',
          'R-404A replacements (R-448A, R-449A) have different P-T charts — do not interchange',
        ],
        quiz: [
          {
            q: 'A technician measures suction pressure and converts it to saturation temperature using a P-T chart. Comparing that saturation temperature to the actual suction line temperature gives:',
            a: ['Subcooling', 'Head pressure', 'Superheat', 'Compression ratio'],
            correct: 2,
            exp: 'Superheat = actual suction line temperature minus saturation temperature at the measured suction pressure. The P-T chart provides the saturation temperature for any measured pressure.',
          },
          {
            q: 'Why must technicians use the correct P-T chart for each refrigerant?',
            a: ['All HFC blends share the same P-T relationship', 'Each refrigerant has a unique pressure-temperature relationship', 'P-T charts are only needed for CFC and HCFC refrigerants', 'P-T charts are used only to determine superheat, not subcooling'],
            correct: 1,
            exp: 'The saturation pressure-temperature relationship is unique to each refrigerant. Using the wrong P-T chart will produce incorrect superheat and subcooling readings, leading to misdiagnosis.',
          },
        ],
      },
      {
        title: 'Heat Transfer in Refrigeration',
        body: [
          'Three modes of heat transfer apply in refrigeration systems. Conduction moves heat through solid materials — fin-to-tube contact in a coil transfers heat from the fin surface to the refrigerant inside the tube. Convection moves heat via fluid movement — forced-convection evaporators use fans to move air across the coil surface, dramatically increasing the heat transfer rate versus natural convection. Radiation plays a minor role in refrigeration but matters in high-temperature environments.',
          'Evaporator and condenser capacity depend on the temperature difference (TD) between the refrigerant and the air, airflow velocity, coil surface area, and fin spacing. Dirty coils and blocked airflow reduce capacity by increasing resistance to heat transfer. Ice buildup on an evaporator coil acts as an insulator, drastically reducing heat transfer — this is why defrost cycles are essential to system performance.',
        ],
        keyPoints: [
          'Conduction: heat through solids (fin-to-tube contact); convection: heat via fluid flow (fan-forced air)',
          'Forced convection (fan-forced) provides far more heat transfer than natural convection',
          'Coil capacity depends on TD (temp difference), airflow, surface area, fin spacing',
          'Ice on evaporator coil is an insulator — reduces heat transfer and requires defrost',
        ],
        quiz: [
          {
            q: 'Which heat transfer mode dominates in a fan-forced commercial refrigeration evaporator?',
            a: ['Radiation', 'Natural convection', 'Forced convection', 'Conduction through the coil fins only'],
            correct: 2,
            exp: 'Evaporator fans force air across the coil surface, making forced convection the dominant and most effective heat transfer mode in commercial refrigeration coils.',
          },
          {
            q: 'Ice buildup on an evaporator coil reduces capacity primarily because:',
            a: ['Ice blocks the defrost heaters', 'Ice acts as an insulating layer that reduces heat transfer from air to refrigerant', 'Ice increases airflow resistance but improves heat transfer', 'Ice raises the suction pressure beyond design limits'],
            correct: 1,
            exp: 'Ice has very low thermal conductivity compared to aluminum or copper fins. Ice accumulation on the coil surface creates an insulating barrier that prevents heat from transferring from the air to the refrigerant.',
          },
        ],
      },
      {
        title: 'Compression Ratio and System Efficiency',
        body: [
          'Compression ratio is the absolute discharge pressure divided by the absolute suction pressure. A high compression ratio forces the compressor to work harder, generating more heat and reducing efficiency. Rule of thumb: compression ratios above 10:1 lead to excessively high discharge temperatures that degrade compressor oil and shorten valve life. Low-temperature freezer systems inherently have higher compression ratios than medium-temperature cooler systems.',
          'Reducing head pressure or raising suction pressure reduces the compression ratio and improves efficiency. Floating head pressure control lowers condensing temperature in cool ambient conditions. Floating suction pressure control raises the suction set point at part load. Both strategies reduce compressor work and energy consumption — key energy efficiency practices in modern commercial refrigeration rack systems.',
        ],
        keyPoints: [
          'Compression ratio = absolute discharge pressure ÷ absolute suction pressure',
          'High compression ratio: more heat generated, reduced efficiency, higher discharge temp',
          'Ratios above 10:1 risk oil degradation and valve damage',
          'Floating head/suction pressure control reduces compression ratio and improves efficiency',
        ],
        quiz: [
          {
            q: 'Compression ratio in a refrigeration system is calculated as:',
            a: ['Discharge temperature divided by suction temperature', 'Absolute discharge pressure divided by absolute suction pressure', 'Gauge discharge pressure minus gauge suction pressure', 'Suction pressure divided by discharge pressure'],
            correct: 1,
            exp: 'Compression ratio = absolute discharge pressure (psia) ÷ absolute suction pressure (psia). Absolute pressure = gauge pressure + 14.7 psia at sea level.',
          },
          {
            q: 'Floating head pressure control saves energy by:',
            a: ['Increasing suction pressure at full load', 'Allowing condensing temperature to rise with ambient temperature', 'Lowering condensing temperature in cool ambient conditions', 'Cycling condenser fans at fixed intervals regardless of load'],
            correct: 2,
            exp: 'Floating head pressure allows head pressure to drop when ambient temperature is cool, reducing compression ratio and compressor work — saving significant energy at part-load and mild-weather conditions.',
          },
        ],
      },
    ],
    test: [
      { q: 'What is the correct order of the vapor compression refrigeration cycle?', a: ['Compressor → Condenser → Metering device → Evaporator', 'Evaporator → Condenser → Compressor → Metering device', 'Condenser → Compressor → Evaporator → Metering device', 'Metering device → Compressor → Condenser → Evaporator'], correct: 0, exp: 'Refrigerant vapor is compressed, then condensed (heat out), then throttled through the metering device, then evaporated (heat in) — completing the cycle.' },
      { q: 'What is the standard target superheat range at a TXV outlet?', a: ['8–12°F', '20–30°F', '2–4°F', '40–50°F'], correct: 0, exp: 'TXV superheat is typically set to 8–12°F to ensure full evaporation without allowing liquid refrigerant to reach the compressor.' },
      { q: 'What does subcooling prevent at the metering device inlet?', a: ['Flash gas formation', 'Compressor overheating', 'Condenser flooding', 'High superheat'], correct: 0, exp: 'Adequate subcooling (10–15°F) keeps refrigerant in liquid state through the liquid line so no flash gas forms at the metering device.' },
      { q: 'If suction superheat is too low, what risk does the compressor face?', a: ['Liquid slugging', 'High discharge temperature', 'Low head pressure', 'Compressor short cycling'], correct: 0, exp: 'Low superheat means liquid refrigerant may reach the compressor — liquid is incompressible and can damage valves or connecting rods.' },
      { q: 'In a vapor compression system, where does the refrigerant absorb heat from the refrigerated space?', a: ['Evaporator', 'Condenser', 'Compressor', 'Receiver'], correct: 0, exp: 'The evaporator is the low-pressure heat exchanger where liquid refrigerant boils and absorbs heat from the cabinet or space.' },
      { q: 'What condition does high subcooling combined with normal superheat typically indicate?', a: ['Overcharge of refrigerant', 'Low refrigerant charge', 'Plugged filter-drier', 'Failed TXV'], correct: 0, exp: 'High subcooling often points to refrigerant overcharge — too much liquid in the system subcools the condenser outlet excessively.' },
      { q: 'Which component raises the pressure AND temperature of the refrigerant vapor?', a: ['Compressor', 'Condenser', 'Evaporator', 'Receiver'], correct: 0, exp: 'The compressor does mechanical work on the vapor, raising both its pressure and temperature before it enters the condenser.' },
      { q: 'Flash gas at the metering device inlet is caused by insufficient:', a: ['Subcooling', 'Superheat', 'Head pressure', 'Evaporator airflow'], correct: 0, exp: 'Insufficient subcooling allows refrigerant to boil (flash) before reaching the metering device, reducing capacity.' },
      { q: 'The pressure-temperature (P-T) relationship describes:', a: ['The saturation temperature corresponding to a given refrigerant pressure', 'The relationship between compressor speed and capacity', 'The ratio of heat absorbed to work input', 'The superheat at different load conditions'], correct: 0, exp: 'For a pure refrigerant, saturation pressure uniquely determines saturation temperature — the P-T chart maps this relationship.' },
      { q: 'Which heat transfer mode dominates in a fan-forced commercial refrigeration evaporator?', a: ['Forced convection', 'Conduction', 'Radiation', 'Natural convection'], correct: 0, exp: 'Evaporator fans force air across the coil surface, making forced convection the dominant heat transfer mode.' },
    ],
  },
  {
    id: 'ref-refrigerants',
    num: 12,
    title: 'Refrigerants & EPA 608',
    desc: 'Refrigerant classifications, ODP, GWP, HFCs, HFOs, natural refrigerants, A2L safety, and EPA Section 608 requirements.',
    slides: [
      {
        title: 'Refrigerant Classifications',
        body: [
          'Refrigerants are classified by chemical family and safety group. CFCs (R-11, R-12) are fully halogenated and are banned globally due to high ozone depletion potential (ODP) and high GWP. HCFCs (R-22) have moderate ODP and are phased out under the Montreal Protocol. HFCs (R-134a, R-404A, R-410A) have zero ODP but high GWP — the focus of current phase-down regulations. HFOs (R-1234yf, R-1234ze, R-1234zeE) have ultra-low GWP but are mildly flammable (A2L class).',
          'Natural refrigerants include R-290 (propane, A3 — highly flammable), R-717 (ammonia, B2L — toxic and mildly flammable), and R-744 (CO2, A1 — non-flammable, non-toxic). Each has unique properties: propane has excellent thermodynamics but strict charge limits; ammonia is highly efficient and used in industrial systems; CO2 operates at high pressures and must use transcritical cycles when ambient exceeds its critical point of 31.1°C.',
        ],
        keyPoints: [
          'CFCs banned (high ODP/GWP); HCFCs (R-22) phased out (moderate ODP); HFCs: zero ODP but high GWP',
          'HFOs: ultra-low GWP, mildly flammable (A2L) — emerging replacements for high-GWP HFCs',
          'Naturals: R-290 propane (A3), R-717 ammonia (B2L), R-744 CO2 (A1)',
          'CO2 critical point: 31.1°C / 87.8°F — above this, transcritical operation required',
        ],
        quiz: [
          {
            q: 'Which refrigerant family has zero ozone depletion potential (ODP) but high global warming potential (GWP)?',
            a: ['CFCs (R-11, R-12)', 'HCFCs (R-22)', 'HFCs (R-404A, R-410A)', 'HFOs (R-1234yf)'],
            correct: 2,
            exp: 'HFCs contain no chlorine, so they have zero ODP. However, HFCs are potent greenhouse gases with high GWP values (R-404A GWP = 3922), making them the target of current phase-down regulations.',
          },
          {
            q: 'R-290 (propane) is classified as which safety group?',
            a: ['A1 (non-flammable)', 'A2L (mildly flammable)', 'A3 (highly flammable)', 'B2L (toxic, mildly flammable)'],
            correct: 2,
            exp: 'R-290 propane is classified A3 — highly flammable, with a very low lower flammability limit. Its use is limited to small charge applications with strict ventilation requirements.',
          },
        ],
      },
      {
        title: 'Key GWP Values and Replacements',
        body: [
          'Current phase-down regulations focus on high-GWP HFCs. Key values: R-22 (HCFC) GWP 1810 — phased out. R-404A GWP 3922 — the most common commercial refrigerant, now being replaced. R-410A GWP 2088 — dominant in HVAC, being replaced by A2L blends. R-32 GWP 675 (A2L). R-448A GWP ~1387 and R-449A GWP ~1397 are the primary drop-in replacements for R-404A in commercial refrigeration. R-454B (Opteon XL41) GWP ~467 is the primary R-410A replacement.',
          'Natural refrigerants have very low GWP: R-290 propane GWP 3, R-744 CO2 GWP 1, R-717 ammonia GWP 0. These are environmentally preferred but carry flammability or toxicity risks that require special system designs, charge limits, and safety equipment. The industry is transitioning toward lower-GWP alternatives driven by the AIM Act in the US and F-Gas regulations in the EU.',
        ],
        keyPoints: [
          'R-404A GWP 3922 → replaced by R-448A (~1387) or R-449A (~1397) in commercial refrigeration',
          'R-410A GWP 2088 → replaced by R-454B (A2L, GWP ~467) in new HVAC/refrigeration equipment',
          'R-32 GWP 675 (A2L); R-290 GWP 3; R-744 GWP 1; R-717 GWP 0',
          'AIM Act (US) and F-Gas (EU) drive HFC phase-down toward lower-GWP alternatives',
        ],
        quiz: [
          {
            q: 'What is the GWP of R-404A?',
            a: ['675', '2088', '3922', '1387'],
            correct: 2,
            exp: 'R-404A has a GWP of 3922, one of the highest among common commercial refrigerant blends. It is being phased down and replaced by lower-GWP alternatives like R-448A and R-449A.',
          },
          {
            q: 'Which refrigerant blend is the primary drop-in replacement for R-404A in commercial refrigeration?',
            a: ['R-410A', 'R-32', 'R-448A or R-449A', 'R-134a'],
            correct: 2,
            exp: 'R-448A (Solstice N40) and R-449A (Opteon XP40) are the most widely adopted replacements for R-404A in commercial refrigeration, offering significantly lower GWP (~1390) while working in existing R-404A equipment.',
          },
        ],
      },
      {
        title: 'A2L Safety Requirements',
        body: [
          'A2L refrigerants (R-454B, R-32, R-1234yf, R-452B) are classified "mildly flammable" with a lower flammability limit (LFL) above 6.5% v/v in air and a burning velocity below 10 cm/s. They are far safer than A3 (propane) but still require precautions: A2L-rated equipment, leak detection in enclosed spaces, and prohibition of open flames for leak detection. Ignition is unlikely under normal service conditions but possible near ignition sources with very large leaks.',
          'Key A2L service rules: do not use open flames (torch leak testing) in A2L systems. Do not use standard recovery equipment — use A2L-rated recovery machines. Ensure adequate ventilation during service. System charging must use weight-based (scale) methods, not sight-glass methods, as A2L blends are zeotropic. Always follow equipment manufacturer A2L service guidelines, as system designs differ from traditional A1 refrigerant systems.',
        ],
        keyPoints: [
          'A2L: mildly flammable, LFL > 6.5% v/v, burning velocity < 10 cm/s',
          'No open flames for leak detection on A2L systems',
          'Use A2L-rated recovery equipment; ensure adequate ventilation during service',
          'Charge by weight (scale), not sight glass — A2L blends are zeotropic',
        ],
        quiz: [
          {
            q: 'Which safety precaution is required when leak testing A2L refrigerant systems?',
            a: ['Use a heated diode halogen detector only', 'A torch (open flame) test is acceptable for A2L systems', 'Use a certified electronic or combustible gas detector — no open flames', 'UV dye is the only approved method for A2L systems'],
            correct: 2,
            exp: 'Open flame leak testing is prohibited on A2L systems due to flammability risk. Electronic leak detectors capable of detecting A2L refrigerants must be used. Some A2L refrigerants also require combustible gas detectors.',
          },
          {
            q: 'R-454B is classified as A2L, meaning it is:',
            a: ['Non-flammable and non-toxic', 'Highly flammable with low LFL', 'Mildly flammable with LFL above 6.5% v/v', 'Toxic and mildly flammable'],
            correct: 2,
            exp: 'A2L refrigerants are "mildly flammable" — their lower flammability limit (LFL) is above 6.5% v/v in air, and their burning velocity is below 10 cm/s. They are much less flammable than A3 propane but still require specific safety precautions.',
          },
        ],
      },
      {
        title: 'Natural Refrigerants',
        body: [
          'R-290 (propane) has excellent thermodynamic properties and ultra-low GWP (3) but is classified A3 (highly flammable). Maximum retail charge limits protect against explosion risk: EU EN 378 limits charges to 150 g per circuit in commercial display cases. US regulations vary by jurisdiction and application. R-290 systems require hermetically sealed components, no open spark ignition sources, and mechanical ventilation.',
          'R-744 (CO2) operates at much higher pressures than HFCs. The critical point is 31.1°C / 87.8°F at 1071 psia. When ambient exceeds this temperature, CO2 cannot condense in a conventional subcritical cycle — a gas cooler (rather than a condenser) is used, and the system enters transcritical operation. CO2 is classified A1 (non-toxic, non-flammable) but is an asphyxiant at high concentrations in enclosed spaces. R-717 (ammonia) is extremely efficient (GWP = 0) and used in large industrial refrigeration but is toxic (B2L) — requires emergency response planning.',
        ],
        keyPoints: [
          'R-290: GWP 3, A3 (highly flammable), max 150 g per circuit in EU retail applications',
          'R-744 CO2: A1, critical point 31.1°C / 87.8°F / 1071 psia — above critical = transcritical cycle',
          'CO2 is an asphyxiant in confined spaces; ammonia is toxic (B2L) — requires emergency planning',
          'R-717 ammonia: GWP 0, highest efficiency — used in large industrial systems only',
        ],
        quiz: [
          {
            q: 'What is the maximum R-290 (propane) charge limit per circuit in EU commercial retail refrigeration equipment?',
            a: ['500 g', '150 g', '1 kg', '50 g'],
            correct: 1,
            exp: 'EU EN 378 limits R-290 charges to 150 g per hermetically sealed circuit in retail display equipment to minimize the risk of ignition from this highly flammable A3 refrigerant.',
          },
          {
            q: 'When ambient temperature exceeds the CO2 critical point (31.1°C), a CO2 refrigeration system:',
            a: ['Automatically switches to R-744 subcritical operation', 'Must use a gas cooler instead of a condenser (transcritical operation)', 'Shuts down on high-pressure safety', 'Switches to R-290 backup refrigerant'],
            correct: 1,
            exp: 'Above the critical point, CO2 cannot condense to a liquid in a conventional condenser. The high-side heat exchanger becomes a "gas cooler," and the system operates transcritically — a fundamentally different thermodynamic cycle.',
          },
        ],
      },
      {
        title: 'EPA Section 608 Requirements',
        body: [
          'EPA Section 608 of the Clean Air Act requires technicians to be certified before purchasing or handling refrigerants in stationary systems. Four certification types: Type I covers small appliances (sealed, ≤5 lb, factory-charged — household refrigerators, window ACs). Type II covers high-pressure appliances (R-22, R-134a, HFCs, HFOs — the vast majority of commercial refrigeration). Type III covers low-pressure appliances (R-11, R-123 — large centrifugal chillers). Universal certification covers all types.',
          'Venting refrigerants to the atmosphere is illegal under EPA 608. Technicians must use certified recovery equipment and follow required recovery efficiencies before opening systems. De minimis releases (small amounts released during good-faith recovery) are allowable. Refrigerant records must be kept for systems with >50 lb charge. Any technician caught knowingly venting can face significant civil penalties. Certification is offered by EPA-approved organizations such as ESCO Institute, NATE, and RSES.',
        ],
        keyPoints: [
          'EPA 608 requires certification before purchasing or handling refrigerants in stationary systems',
          'Type I: small appliances ≤5 lb; Type II: high-pressure (HFCs, commercial refrigeration); Type III: low-pressure (centrifugal chillers)',
          'Venting refrigerants is illegal; use certified recovery equipment before opening systems',
          'Systems with >50 lb charge require refrigerant records; knowingly venting risks civil penalties',
        ],
        quiz: [
          {
            q: 'EPA 608 Type II certification is required to service which type of system?',
            a: ['Small appliances with less than 5 lb of refrigerant', 'High-pressure systems using R-22, HFCs, and HFOs', 'Low-pressure centrifugal chiller systems', 'Any ammonia refrigeration system'],
            correct: 1,
            exp: 'Type II covers high-pressure appliances — the category that includes virtually all commercial refrigeration equipment using R-22, R-404A, R-448A, R-449A, R-454B, and other HFC and HFO blends.',
          },
          {
            q: 'Under EPA Section 608, what is the penalty for knowingly venting regulated refrigerants?',
            a: ['A verbal warning from EPA for first offenses', 'Revocation of EPA certification only', 'Significant civil penalties per day of violation', 'Required additional training only'],
            correct: 2,
            exp: 'EPA Section 608 allows civil penalties up to tens of thousands of dollars per day for knowingly venting ozone-depleting substances or their substitutes. Enforcement has been actively pursued by the EPA.',
          },
        ],
      },
    ],
    test: [
      { q: 'What is the GWP of R-404A?', a: ['3922', '2088', '675', '1810'], correct: 0, exp: 'R-404A has a GWP of 3922, one of the highest among commercial HFC blends, and is being replaced by R-448A and R-449A.' },
      { q: 'Which refrigerant is classified A2L?', a: ['R-454B', 'R-404A', 'R-744', 'R-134a'], correct: 0, exp: 'R-454B (Opteon XL41) is an A2L refrigerant — mildly flammable — being introduced as the primary replacement for R-410A in new equipment.' },
      { q: 'The maximum retail charge limit for R-290 propane in Europe is approximately:', a: ['150 g', '500 g', '50 g', '1 kg'], correct: 0, exp: 'EN 378 limits R-290 charges to 150 g per circuit in retail/commercial display equipment to minimize ignition risk from this highly flammable propane.' },
      { q: 'What is the critical point temperature of R-744 CO2?', a: ['31.1°C / 87.8°F', '40.7°C / 105.3°F', '-78.5°C / -109.3°F', '15.0°C / 59.0°F'], correct: 0, exp: 'CO2 has a critical point at 31.1°C / 87.8°F and 1071 psia. Above the critical point, CO2 enters a transcritical state used in transcritical refrigeration systems.' },
      { q: 'Which EPA 608 certification type covers high-pressure refrigerants like R-22 and R-410A?', a: ['Type II', 'Type I', 'Type III', 'Type IV'], correct: 0, exp: 'Type II covers servicing of high-pressure appliances including systems using R-22, R-134a, R-410A, and other HFCs/HFOs.' },
      { q: 'R-22 is classified as an HCFC and was phased out primarily because of its:', a: ['Ozone depletion potential (ODP)', 'High global warming potential (GWP)', 'Toxicity (B-safety class)', 'A2L flammability'], correct: 0, exp: 'R-22 is an HCFC with an ODP of 0.055. The Montreal Protocol mandated its phase-out because HCFCs deplete stratospheric ozone.' },
      { q: 'R-744 CO2 refrigerant safety classification is:', a: ['A1', 'B2L', 'A2L', 'A3'], correct: 0, exp: 'CO2 (R-744) is classified A1 — non-toxic and non-flammable. It is an asphyxiant at high concentrations but carries no flammability risk.' },
      { q: 'Which HFC blend is the recommended drop-in replacement for R-404A in commercial refrigeration?', a: ['R-448A or R-449A', 'R-410A', 'R-32', 'R-134a'], correct: 0, exp: 'R-448A (Solstice N40) and R-449A (Opteon XP40) are the primary HFC blends replacing R-404A — both have significantly lower GWP (~1300).' },
      { q: 'What does EPA Section 608 prohibit?', a: ['Venting refrigerants to atmosphere', 'Using recovery cylinders over 400 psig', 'Mixing refrigerant types in recovery equipment', 'Recovering refrigerant without a manifest'], correct: 0, exp: 'EPA 608 makes it illegal to knowingly vent ozone-depleting substances and most substitutes. Technicians must recover refrigerant before opening systems.' },
      { q: 'An A2L refrigerant differs from an A3 refrigerant in that A2L has:', a: ['Lower flammability (higher LFL) than A3', 'Higher GWP than A3', 'Higher toxicity than A3', 'Lower ODP than A3'], correct: 0, exp: 'A2L refrigerants are "mildly flammable" with an LFL above 6.5% v/v and low burning velocity. A3 refrigerants (like propane) are highly flammable with much lower LFLs.' },
    ],
  },
  {
    id: 'ref-commercial',
    num: 13,
    title: 'Commercial Refrigeration Systems',
    desc: 'Walk-in coolers and freezers, rack systems, display cases, defrost methods, and system configurations.',
    slides: [
      {
        title: 'Walk-in Coolers and Freezers',
        body: [
          'Walk-in coolers maintain 35°F (2°C) for produce, dairy, and beverages. Walk-in freezers maintain 0°F (-18°C) for frozen food storage. Both use insulated panel construction — typically 4-inch urethane foam panels for coolers and 6-inch panels for freezers. The thicker insulation in freezers minimizes heat gain and the refrigeration load on the evaporator.',
          'Freezer-specific considerations: floor heaters prevent frost heave (ground freezing expands and can crack the floor slab). Door heaters prevent the door gasket from freezing to the door frame. Condensate drain lines must be heat-traced because sub-freezing temperatures inside will freeze any water in the drain before it exits the building. Anti-sweat heaters on display freezer door glass prevent condensation that obscures product visibility.',
        ],
        keyPoints: [
          'Walk-in cooler target: 35°F (2°C); walk-in freezer target: 0°F (-18°C)',
          'Freezer panels: 6-inch urethane (vs. 4-inch for coolers) to reduce heat gain',
          'Freezer floor heaters prevent frost heave; door heaters prevent gasket freeze',
          'Condensate drain lines must be heat-traced in freezers to prevent drain freeze',
        ],
        quiz: [
          {
            q: 'What is the standard target temperature for a walk-in freezer?',
            a: ['35°F (2°C)', '0°F (-18°C)', '-20°F (-29°C)', '10°F (-12°C)'],
            correct: 1,
            exp: 'Walk-in freezers are designed to maintain 0°F (-18°C) for safe long-term frozen food storage, meeting FDA and USDA frozen food storage requirements.',
          },
          {
            q: 'Walk-in freezer floor heaters are installed to prevent:',
            a: ['Ice buildup on the floor surface during normal operation', 'Frost heave from ground freezing beneath the slab', 'Condensate drain line freezing', 'Refrigerant migration to the floor level'],
            correct: 1,
            exp: 'Without floor heaters, sub-zero temperatures propagate through the floor slab into the soil below. Frozen soil expands, causing frost heave that can crack the slab and damage structural supports.',
          },
        ],
      },
      {
        title: 'Rack Refrigeration Systems',
        body: [
          'Supermarket parallel compressor racks use multiple compressors on a common suction manifold serving multiple display cases and walk-in units. Parallel racks allow staged capacity control — compressors cycle on and off (or unload) as the total load changes. Medium-temperature racks serve produce and dairy at approximately 20–25°F evaporating temperature; low-temperature racks serve frozen food at approximately -25 to -20°F evaporating.',
          'Modern rack systems use electronic rack controllers (from Danfoss, Emerson/Copeland, Hussmann) that optimize compressor staging, implement floating head and suction pressure control, manage defrost scheduling, and provide remote monitoring via Modbus, LonWorks, or Ethernet. Parallel racks offer significantly better part-load efficiency than single-compressor systems because compressors can be staged precisely to match the actual load at any time.',
        ],
        keyPoints: [
          'Parallel rack: multiple compressors on a common suction manifold; staged capacity control',
          'Medium-temp rack: ~20–25°F evaporating (dairy, produce); low-temp: ~-25 to -20°F (frozen)',
          'Electronic rack controllers optimize staging, floating pressures, defrost scheduling',
          'LonWorks, Modbus, or Ethernet connectivity for remote monitoring and control',
        ],
        quiz: [
          {
            q: 'In a supermarket parallel compressor rack, multiple compressors share a common:',
            a: ['Condenser fan array only', 'Suction manifold', 'Individual suction and discharge lines', 'Receiver with no manifold'],
            correct: 1,
            exp: 'Parallel rack compressors connect to a common suction header, pulling refrigerant vapor from multiple display cases and walk-in units simultaneously, allowing staged capacity to match variable store loads.',
          },
          {
            q: 'A low-temperature supermarket rack typically operates at a suction temperature equivalent to:',
            a: ['20–25°F evaporating', '35–40°F evaporating', '-25 to -20°F evaporating', '-40 to -35°F evaporating'],
            correct: 2,
            exp: 'Low-temperature racks serve frozen food display cases and walk-in freezers, requiring suction conditions equivalent to -25 to -20°F evaporating temperature to maintain product at 0°F.',
          },
        ],
      },
      {
        title: 'Display Cases and Night Curtains',
        body: [
          'Open multideck display cases use air curtains — a continuous sheet of air flowing down the open face — to minimize infiltration of warm store air into the refrigerated space. LED lighting is now standard and replaces fluorescent lamps; LED generates far less heat, reducing the load on the evaporator coil and improving efficiency. Reach-in cases with glass doors perform better than open cases because the door virtually eliminates infiltration.',
          'Night curtains are fabric or rigid panels that seal the open face of display cases when the store is closed. Night curtains reduce infiltration by up to 80% overnight, dramatically cutting compressor runtime, energy consumption, and product temperature rise. Some stores use automatic motorized night curtains that deploy at closing and retract at opening. Night curtains have minimal payback periods and are one of the highest-ROI energy efficiency measures in supermarket operations.',
        ],
        keyPoints: [
          'Open multideck cases use air curtains to minimize warm air infiltration',
          'LED lighting standard: less heat load on evaporator, improved efficiency vs. fluorescent',
          'Night curtains reduce infiltration by ~80%, cut energy and extend product life',
          'Reach-in glass door cases significantly outperform open multideck cases for energy efficiency',
        ],
        quiz: [
          {
            q: 'Night curtains on open multideck display cases primarily reduce:',
            a: ['Defrost heater energy consumption', 'Compressor energy by reducing infiltration when the store is closed', 'Refrigerant charge by reducing evaporator load', 'Fan noise in the sales floor'],
            correct: 1,
            exp: 'Night curtains seal the open face of display cases after hours, reducing warm store air infiltration by up to 80% — dramatically cutting the compressor runtime and energy consumption overnight.',
          },
          {
            q: 'LED lighting in display cases reduces energy consumption primarily by:',
            a: ['Reducing defrost frequency by keeping the coil warmer', 'Eliminating the need for anti-sweat heaters on glass doors', 'Generating far less heat than fluorescent lamps, reducing evaporator load', 'Reducing fan speeds needed to maintain air curtain velocity'],
            correct: 2,
            exp: 'LED lamps generate significantly less heat than fluorescent or incandescent lamps. Less heat inside the display case means the refrigeration system removes less heat, reducing compressor runtime and energy use.',
          },
        ],
      },
      {
        title: 'Defrost Methods',
        body: [
          'Frost accumulates on evaporator coils because the coil surface temperature is below the dew point of the air. Four defrost methods are used in commercial refrigeration. Electric defrost: resistance heaters mounted on or near the evaporator coil melt frost; simplest and most common in reach-in and small walk-in applications. Off-cycle defrost: suitable only for coolers where the coil temperature is above freezing — the refrigeration system stops and ambient air temperature melts frost without heaters.',
          'Hot gas defrost: the most energy-efficient method. Discharge gas from the compressor is diverted through the evaporator coil, using heat already in the system to melt frost instead of consuming additional electrical energy. Demand defrost (also called adaptive defrost): sensors on the coil detect frost and only initiate defrost when needed — skipping unnecessary cycles reduces defrost heater energy by 30–50% and minimizes product temperature excursions. Defrost is terminated by time, temperature (coil termination sensor), or demand (optical/thermal sensors).',
        ],
        keyPoints: [
          'Electric defrost: most common, resistance heaters — simple but consumes extra energy',
          'Off-cycle defrost: only works in coolers where coil temp is above 32°F',
          'Hot gas defrost: most energy efficient — recycles compressor discharge heat',
          'Demand/adaptive defrost: initiates only when frost detected, reduces cycles by 30–50%',
        ],
        quiz: [
          {
            q: 'Which defrost method is most energy efficient in commercial refrigeration?',
            a: ['Electric resistance defrost', 'Off-cycle defrost', 'Hot gas defrost', 'Reverse-cycle defrost'],
            correct: 2,
            exp: 'Hot gas defrost diverts compressor discharge gas through the evaporator, using heat already present in the refrigerant cycle rather than consuming additional electrical energy as resistive heaters do.',
          },
          {
            q: 'Off-cycle defrost is only suitable for use in:',
            a: ['Freezer cases maintaining product at 0°F', 'Ice cream display cases at -20°F', 'Cooler cases where coil temperature is above 32°F', 'All commercial refrigeration applications'],
            correct: 2,
            exp: 'Off-cycle defrost simply stops refrigeration and allows ambient air to warm the coil. This only works when the ambient air temperature is above freezing and the coil temperature is above 32°F — conditions found in medium-temperature cooler applications only.',
          },
        ],
      },
      {
        title: 'Head Pressure Control',
        body: [
          'In cold weather, outdoor condensers can over-condense refrigerant, collapsing head pressure. When head pressure drops too low, the expansion valve cannot maintain proper flow, suction pressure collapses, and the system hunts (cycles rapidly) or shuts down on low-pressure safety. Head pressure control maintains a minimum condensing pressure to ensure stable system operation in cold ambient conditions.',
          'Methods of head pressure control: fan cycling (simplest — turns off condenser fans to raise head pressure), VFD-driven condenser fans (smooth speed control), liquid flooding (injecting liquid refrigerant into the condenser to reduce its effective area and raise pressure). Floating head pressure control allows head pressure to vary with ambient temperature — dropping in cool weather to reduce compression ratio and save energy, while ensuring it never falls below the minimum required for stable operation.',
        ],
        keyPoints: [
          'Low ambient causes head pressure to collapse, leading to hunting or low-pressure lockout',
          'Head pressure control maintains minimum condensing pressure in cold weather',
          'Methods: fan cycling, VFD condenser fans, liquid flooding of condenser',
          'Floating head pressure: head drops with ambient temp, saving energy while maintaining stability',
        ],
        quiz: [
          {
            q: 'Head pressure control on a commercial refrigeration system is required primarily to prevent:',
            a: ['High ambient temperature from overloading the condenser', 'Head pressure collapsing in cold weather, causing system hunting or lockout', 'Refrigerant overcharge in cold seasons', 'Compressor short cycling at full load'],
            correct: 1,
            exp: 'In cold ambient conditions, an uncontrolled condenser can drop head pressure too low for the expansion valve to operate correctly, causing the suction pressure to collapse and the system to hunt or trip on low-pressure safety.',
          },
          {
            q: 'Floating head pressure control saves energy by:',
            a: ['Raising head pressure above design in cool weather', 'Allowing condensing temperature to drop with ambient temp in cool weather', 'Cycling condenser fans at a fixed 50% duty cycle', 'Locking head pressure at the maximum design value year-round'],
            correct: 1,
            exp: 'Floating head pressure control allows head pressure to track ambient temperature downward when conditions allow, reducing compression ratio and compressor work — generating significant energy savings in cool or cold weather.',
          },
        ],
      },
    ],
    test: [
      { q: 'What is the standard target temperature for a walk-in freezer?', a: ['0°F (-18°C)', '35°F (2°C)', '-20°F (-29°C)', '10°F (-12°C)'], correct: 0, exp: 'Walk-in freezers are designed to maintain 0°F (-18°C) for safe long-term storage of frozen foods in compliance with food safety standards.' },
      { q: 'Walk-in freezer floor heaters are installed primarily to prevent:', a: ['Frost heave from ground freezing beneath the slab', 'Ice buildup on the floor surface', 'Condensate drain line freezing', 'Panel delamination from moisture'], correct: 0, exp: 'Without floor heaters, the sub-zero temperatures in a walk-in freezer can freeze the ground beneath the slab, causing frost heave that damages the foundation and panels.' },
      { q: 'Which defrost method is the most energy efficient in commercial refrigeration?', a: ['Hot gas defrost', 'Electric defrost', 'Off-cycle defrost', 'Reverse-cycle defrost'], correct: 0, exp: 'Hot gas defrost recycles heat already in the system (compressor discharge gas) to melt frost, rather than consuming additional electrical energy as resistive heaters do.' },
      { q: 'In a parallel compressor rack system, multiple compressors share a common:', a: ['Suction manifold', 'Discharge manifold only', 'Oil separator', 'Condenser coil'], correct: 0, exp: 'Parallel rack systems connect multiple compressors to a common suction header serving multiple display cases and walk-in units, allowing staged capacity control.' },
      { q: 'What suction pressure range is typical for a medium-temperature supermarket rack?', a: ['20–25°F evaporating equivalent', '-25 to -20°F evaporating equivalent', '35–40°F evaporating equivalent', '10–15°F evaporating equivalent'], correct: 0, exp: 'Medium-temp racks serving produce and dairy display cases typically operate at suction conditions equivalent to 20–25°F evaporating temperature.' },
      { q: 'Night curtains on open display cases primarily reduce:', a: ['Energy consumption when the store is closed', 'Defrost frequency', 'Refrigerant charge requirements', 'Fan noise'], correct: 0, exp: 'Night curtains seal the open face of display cases after hours, dramatically reducing infiltration of warm store air and cutting compressor runtime.' },
      { q: 'Head pressure control in cold weather is necessary to prevent:', a: ['Low suction pressure and system hunting', 'High discharge temperature', 'Refrigerant migration to compressor', 'Overfeeding of the TXV'], correct: 0, exp: 'Without head pressure control, cold ambient causes the condenser to over-condense refrigerant, collapsing suction pressure and causing instability.' },
      { q: 'Off-cycle defrost is suitable for which type of refrigerated case?', a: ['Coolers operating above 32°F coil temperature', 'Freezer cases at 0°F', 'Ice cream cases at -20°F', 'Low-temp display cases'], correct: 0, exp: 'Off-cycle defrost works only when ambient air temperature is above 32°F and coil temperature is above freezing — adequate to melt light frost naturally.' },
      { q: 'LED lighting in display cases improves system performance because it:', a: ['Reduces heat load on the evaporator coil', 'Increases defrost frequency', 'Raises the condensing temperature', 'Improves refrigerant flow'], correct: 0, exp: 'LED lighting generates far less heat than fluorescent lamps, reducing the heat load that the refrigeration system must remove from the display case.' },
      { q: 'Floating head pressure control saves energy by:', a: ['Lowering condensing temperature in cool ambient conditions', 'Raising suction pressure in warm ambient conditions', 'Reducing compressor speed at full load', 'Staging condenser fans at fixed intervals'], correct: 0, exp: 'Floating head pressure allows head pressure to drop with ambient temperature, reducing compression ratio and improving compressor efficiency in cool weather.' },
    ],
  },
  {
    id: 'ref-controls',
    num: 14,
    title: 'Refrigeration Controls & Metering',
    desc: 'TXV operation, electronic expansion valves, case controllers, demand defrost, and capacity control strategies.',
    slides: [
      {
        title: 'Thermostatic Expansion Valve (TXV)',
        body: [
          'The TXV (thermostatic expansion valve) maintains constant superheat at the evaporator outlet by modulating refrigerant flow. Its three pressure elements balance against each other: the thermal bulb (clamped to the suction line at the evaporator outlet) generates a pressure signal proportional to suction line temperature. Evaporator outlet pressure opposes the bulb pressure. A spring-loaded adjustment provides the superheat set point. The TXV opens wider when bulb pressure exceeds the sum of evaporator pressure plus spring pressure, and closes when evaporator pressure plus spring dominates.',
          'An external equalizer is required on evaporators with significant pressure drop across the coil — it connects the TXV diaphragm to the actual coil outlet pressure rather than inlet pressure. Without an external equalizer on a large coil, the TXV would "see" the inlet pressure and respond incorrectly. Hunting (oscillating superheat) indicates mislocated thermal bulb, incorrect superheat adjustment, contamination in the power element, or loss of charge in the power element. TXV service includes bulb insulation, bulb clamp tightness, and superheat verification.',
        ],
        keyPoints: [
          'TXV maintains constant superheat by balancing bulb pressure vs. evaporator pressure + spring',
          'Target superheat: 8–12°F; external equalizer required on coils with significant pressure drop',
          'Hunting: oscillating superheat — caused by mislocated bulb, wrong adjustment, or contaminated power element',
          'Verify TXV function: check bulb attachment, insulation, and superheat at design conditions',
        ],
        quiz: [
          {
            q: 'A TXV external equalizer is required when the evaporator has:',
            a: ['An EEV installed in parallel', 'Significant pressure drop across the coil circuits', 'A large thermal bulb that cannot sense temperature', 'High subcooling at the liquid line inlet'],
            correct: 1,
            exp: 'On large multi-circuit evaporators with significant pressure drop, an external equalizer connects the TXV diaphragm to the coil outlet pressure so it responds to actual outlet conditions rather than inlet pressure.',
          },
          {
            q: 'TXV hunting (oscillating superheat) is most commonly caused by:',
            a: ['Refrigerant overcharge in the system', 'Mislocated or unsecured thermal bulb, incorrect superheat setting, or contaminated power element', 'High ambient temperature causing head pressure spikes', 'Defrost termination thermostat malfunction'],
            correct: 1,
            exp: 'Hunting occurs when the TXV overcorrects repeatedly — most often from a thermal bulb that is poorly insulated, not secured tightly, incorrectly positioned, or a power element that is contaminated or has lost its refrigerant charge.',
          },
        ],
      },
      {
        title: 'Electronic Expansion Valve (EEV)',
        body: [
          'The EEV uses a stepper motor (or pulse-width modulated solenoid) driven by a case controller to modulate refrigerant flow with much greater precision and speed than a TXV. The controller receives suction temperature and pressure inputs, calculates superheat in real time, and positions the EEV to maintain a target superheat (typically 3–5°F — lower than a TXV can reliably achieve). EEVs respond faster to load changes and can handle a wider operating range.',
          'EEVs are used extensively in supermarket rack systems where case controllers manage each display case individually. The case controller communicates with the rack controller over LonWorks, Modbus, or a proprietary network, allowing centralized superheat monitoring, alarm management, and defrost scheduling. EEV-based systems enable demand defrost and precise load balancing across multiple cases — capabilities not practical with TXVs.',
        ],
        keyPoints: [
          'EEV: stepper motor driven by case controller; achieves 3–5°F superheat vs. TXV 8–12°F',
          'Faster response, wider operating range than TXV',
          'Case controller uses suction T + P sensors to calculate and control superheat in real time',
          'Communicates via LonWorks or Modbus to rack controller for centralized monitoring',
        ],
        quiz: [
          {
            q: 'Compared to a TXV, an EEV can achieve:',
            a: ['Higher superheat (20–25°F) for improved compressor safety', 'Lower superheat (3–5°F) with faster response and wider operating range', 'Identical superheat but with simpler installation', 'Higher suction pressure at all operating conditions'],
            correct: 1,
            exp: 'EEVs with electronic controllers can precisely target 3–5°F superheat — lower than a TXV — improving evaporator efficiency while reacting faster to load changes and handling a wider range of operating conditions.',
          },
          {
            q: 'A case controller driving an EEV calculates superheat using:',
            a: ['Coil inlet temperature and ambient temperature only', 'Suction temperature and suction pressure sensors at the evaporator outlet', 'Head pressure and discharge temperature', 'Defrost termination thermostat and ambient humidity'],
            correct: 1,
            exp: 'The case controller receives suction temperature (from a sensor at the evaporator outlet) and suction pressure, converts pressure to saturation temperature via P-T relationship, and calculates superheat = actual temp minus saturation temp.',
          },
        ],
      },
      {
        title: 'Case Controllers and Demand Defrost',
        body: [
          'Case controllers (from Danfoss, Emerson/Alco, Hussmann, Heatcraft) manage EEVs, defrost scheduling, case alarms, data logging, and communication for individual display cases or zones. They connect to sensors (suction temperature, suction pressure, coil temperature, return air temperature, product temperature, optical frost detectors) and actuators (EEV, defrost heaters, fan contactors, liquid line solenoids).',
          'Demand defrost (adaptive defrost) uses sensors to initiate defrost only when frost is detected on the evaporator coil. Methods: optical sensors use an infrared or photoelectric beam across the coil face — frost breaks the beam and triggers defrost. Thermal sensors monitor coil outlet temperature — if the outlet temperature stays significantly above the coil temperature, little frost has accumulated. Demand defrost reduces defrost frequency by 30–50% compared to fixed-time schedules, saving energy and reducing product temperature excursions that can accelerate spoilage.',
        ],
        keyPoints: [
          'Case controllers manage EEV, defrost, alarms, and communication for each display case',
          'Communicate via LonWorks or Modbus to rack controller for centralized monitoring',
          'Demand defrost initiates only when frost detected — cuts defrost cycles by 30–50%',
          'Optical (IR beam) or thermal sensors detect frost; saves energy and reduces product temp swings',
        ],
        quiz: [
          {
            q: 'Demand (adaptive) defrost reduces energy use primarily by:',
            a: ['Switching from electric to hot gas defrost automatically', 'Initiating defrost only when frost is detected, skipping unnecessary cycles', 'Running defrost heaters at lower wattage', 'Shortening every defrost cycle to 5 minutes maximum'],
            correct: 1,
            exp: 'Demand defrost uses sensors to skip scheduled defrost cycles when the coil is frost-free, reducing heater energy by 30–50% and minimizing product temperature excursions that can accelerate spoilage.',
          },
          {
            q: 'Which type of sensor is used in optical demand defrost to detect frost accumulation?',
            a: ['Suction pressure transducer', 'Infrared or photoelectric beam aimed at the coil surface', 'Ambient humidity sensor in the store', 'Coil inlet temperature sensor'],
            correct: 1,
            exp: 'Optical demand defrost uses an infrared or photoelectric beam across the evaporator coil face. As frost accumulates, it blocks the beam — triggering the case controller to initiate a defrost cycle.',
          },
        ],
      },
      {
        title: 'Compressor Capacity Control',
        body: [
          'Multiple methods control compressor capacity in commercial refrigeration. Cylinder unloading (reciprocating compressors): bypass valves open passages that prevent certain cylinders from compressing, reducing active displacement. A 6-cylinder compressor with 2 cylinders unloaded operates at 67% capacity. Digital scroll (Emerson/Copeland Digital): the scroll unloads for a fraction of each cycle, providing capacity modulation from 10% to 100% without staging.',
          'VFD-driven compressors provide the most precise capacity modulation by varying compressor RPM continuously between minimum and maximum speed. Rack controllers can stage multiple fixed-speed compressors while also modulating one VFD compressor for fine capacity control. Floating suction pressure control raises the suction set point when load decreases and multiple compressors unload, reducing compression ratio and improving efficiency at part load. All modern rack controllers implement some form of floating suction to optimize efficiency.',
        ],
        keyPoints: [
          'Cylinder unloading: bypass valves reduce active cylinders in reciprocating compressors',
          'Digital scroll: rapid load/unload cycling provides 10–100% modulation without staging',
          'VFD-driven compressor: continuous speed modulation — most precise capacity control',
          'Floating suction pressure: raises suction setpoint at part load to reduce compression ratio',
        ],
        quiz: [
          {
            q: 'Cylinder unloading on a reciprocating compressor reduces capacity by:',
            a: ['Reducing compressor motor voltage to slow its speed', 'Opening bypass ports that prevent certain cylinders from compressing', 'Closing the suction valve inlet to restrict refrigerant flow', 'Cycling the compressor on and off rapidly at part load'],
            correct: 1,
            exp: 'Cylinder unloaders open passages that bypass refrigerant back to the suction side before it can be compressed, effectively reducing the number of active cylinders and decreasing the compressor\'s pumping capacity.',
          },
          {
            q: 'Floating suction pressure control in a rack system raises suction set point when:',
            a: ['System load increases and more compressors are needed', 'Ambient temperature rises above design conditions', 'Load decreases and multiple compressors begin to unload', 'Defrost is active on all cases simultaneously'],
            correct: 2,
            exp: 'When load drops and compressors start to unload, the rack controller raises the suction set point, allowing evaporating temperature to rise — reducing compression ratio and improving efficiency at part load.',
          },
        ],
      },
      {
        title: 'Liquid Line Solenoids and System Controls',
        body: [
          'Liquid line solenoids (LLS) are normally-closed solenoid valves in the liquid line that cut off refrigerant flow to a case or zone when not needed. They prevent the evaporator from flooding during off cycles and enable pump-down — a control sequence where the LLS closes, the compressor continues to run until suction pressure drops to a low-pressure cut-out, then stops. Pump-down evacuates refrigerant from the evaporator, preventing migration to the compressor crankcase during long off cycles.',
          'High-pressure and low-pressure safety controls protect the system from operation outside safe limits. High-pressure cut-out (HPCO): stops the compressor if head pressure exceeds the safe limit (typically 400–450 psig for R-404A systems). Low-pressure cut-out (LPCO): stops the compressor if suction pressure drops too low. Oil pressure differential switches protect the compressor by stopping it if oil pressure fails to build within a start-up time delay. Anti-short-cycle timers prevent rapid compressor cycling that overloads the motor.',
        ],
        keyPoints: [
          'Liquid line solenoid (LLS): normally closed, cuts refrigerant to case; enables pump-down',
          'Pump-down: LLS closes, compressor evacuates evaporator, then stops — prevents refrigerant migration',
          'HPCO: stops compressor if head pressure exceeds safe limit; LPCO: stops on low suction',
          'Oil pressure differential switch: stops compressor if oil pressure fails to build at startup',
        ],
        quiz: [
          {
            q: 'A pump-down cycle in a commercial refrigeration system involves:',
            a: ['Pumping oil through the compressor to verify lubrication before startup', 'Closing the liquid line solenoid so the compressor evacuates refrigerant from the evaporator before stopping', 'Pumping refrigerant from the condenser to the receiver for storage', 'Removing refrigerant from the system for leak repair'],
            correct: 1,
            exp: 'Pump-down: the liquid line solenoid closes, cutting refrigerant flow to the evaporator. The compressor continues running and pulls refrigerant out of the evaporator until suction drops to the LPCO setpoint, then stops — preventing refrigerant migration during long off cycles.',
          },
          {
            q: 'An oil pressure differential switch on a compressor protects against:',
            a: ['High refrigerant charge overloading the oil separator', 'Failure to build adequate oil pressure at startup, indicating lubrication failure', 'Oil contamination from refrigerant floodback', 'Excessive oil temperature from high compression ratio'],
            correct: 1,
            exp: 'The oil pressure differential switch monitors the difference between oil pump discharge pressure and suction pressure. If adequate oil pressure does not build within the time delay at startup, the switch shuts down the compressor to prevent bearing damage from inadequate lubrication.',
          },
        ],
      },
    ],
    test: [
      { q: 'What does a TXV maintain constant at the evaporator outlet?', a: ['Superheat', 'Subcooling', 'Suction pressure', 'Refrigerant temperature'], correct: 0, exp: 'The TXV senses evaporator outlet temperature and pressure; its power element modulates flow to maintain a fixed superheat (typically 8–12°F).' },
      { q: 'An external equalizer on a TXV is required when the evaporator has:', a: ['Significant pressure drop across the coil', 'A large thermal bulb', 'An EEV installed in parallel', 'High subcooling at the inlet'], correct: 0, exp: 'On large multi-circuit evaporators with significant pressure drop, an external equalizer connects the TXV diaphragm to the coil outlet so it responds to true outlet pressure rather than inlet pressure.' },
      { q: 'Compared to a TXV, an EEV can typically achieve:', a: ['Lower superheat (3–5°F)', 'Higher superheat (20–25°F)', 'Identical superheat with slower response', 'Higher suction pressure'], correct: 0, exp: 'EEVs with electronic controllers can precisely target 3–5°F superheat — lower than a TXV — improving evaporator efficiency without risking liquid slugging.' },
      { q: 'TXV hunting (oscillating superheat) is most commonly caused by:', a: ['Incorrect superheat setting or bulb location', 'Refrigerant overcharge', 'High head pressure', 'Defrost termination failure'], correct: 0, exp: 'Hunting occurs when the TXV overcorrects — often due to a mislocated or unsecured thermal bulb, wrong superheat setting, or contamination in the power element.' },
      { q: 'What communication protocol do many Danfoss case controllers use to connect to a rack controller?', a: ['LonWorks or Modbus', 'BACnet/IP', 'Ethernet/IP', 'PROFIBUS'], correct: 0, exp: 'Danfoss AK case controllers commonly use LON (LonWorks) or Modbus to communicate refrigeration data to the rack controller or building management system.' },
      { q: 'Demand defrost reduces energy use by:', a: ['Initiating defrost only when frost is detected', 'Running defrost at lower wattage', 'Using hot gas instead of electric heaters', 'Shortening fixed-time defrost duration'], correct: 0, exp: 'Demand/adaptive defrost skips scheduled defrost cycles when sensors confirm the coil is frost-free, cutting unnecessary heater operation and product temperature swings.' },
      { q: 'Cylinder unloading on a reciprocating compressor reduces capacity by:', a: ['Opening bypass ports to reduce active cylinder count', 'Reducing compressor motor voltage', 'Cycling the compressor on and off rapidly', 'Throttling suction inlet'], correct: 0, exp: 'Cylinder unloaders open passages that allow refrigerant to bypass certain cylinders, reducing the effective displacement and output capacity.' },
      { q: 'A VFD on a scroll compressor in a rack system provides:', a: ['Continuous capacity modulation by varying compressor speed', 'Two-stage capacity (100%/50%)', 'On/off staging only', 'Defrost control'], correct: 0, exp: 'A VFD-driven scroll compressor can modulate speed continuously between minimum and maximum RPM, providing the most precise capacity control in rack refrigeration.' },
      { q: 'Floating suction pressure control in a rack system raises suction set point when:', a: ['System load decreases and multiple compressors unload', 'Ambient temperature rises above design', 'Defrost is active on all cases', 'The EEV is fully open'], correct: 0, exp: 'When load drops and compressors start to unload, the rack controller raises the suction set point, reducing compression ratio and improving efficiency at part load.' },
      { q: 'Which sensor type do optical demand defrost systems use to detect frost accumulation?', a: ['Infrared or photoelectric sensor aimed at the coil surface', 'Suction pressure transducer', 'Coil inlet temperature sensor', 'Ambient humidity sensor'], correct: 0, exp: 'Optical demand defrost uses an infrared or photoelectric beam across the evaporator coil face; frost accumulation breaks the beam and signals that defrost is needed.' },
    ],
  },
  {
    id: 'ref-troubleshoot',
    num: 15,
    title: 'Troubleshooting Commercial Refrigeration',
    desc: 'High head pressure, low suction pressure, compressor diagnosis, leak detection, and systematic fault analysis.',
    slides: [
      {
        title: 'High Head Pressure Diagnosis',
        body: [
          'High head pressure forces the compressor to work harder, raises discharge temperature, and risks overloading the compressor motor. Common causes: dirty or blocked condenser coil (most common field cause — reduced airflow raises condensing temperature), failed condenser fan motor or blade, refrigerant overcharge (too much refrigerant increases the condensing pressure), non-condensable gases (air or nitrogen in the system occupy condenser volume without condensing), and restrictions in the discharge line.',
          'Non-condensable gases (NCGs) are identified by comparing the actual head pressure to the saturation pressure corresponding to the measured condenser outlet temperature. If head pressure is significantly above saturation at the condenser outlet temperature, NCGs are present. NCGs are removed by full refrigerant recovery followed by deep evacuation (below 300 microns) before recharging. Never "purge" NCGs by venting — it is illegal and wastes refrigerant.',
        ],
        keyPoints: [
          'High head pressure: dirty condenser (most common), failed fan, overcharge, or non-condensables',
          'Non-condensables identified: head pressure exceeds saturation at condenser outlet temperature',
          'Remove NCGs: full refrigerant recovery + deep vacuum (below 300 microns) + recharge',
          'Never purge NCGs to atmosphere — illegal under EPA 608 and wastes refrigerant',
        ],
        quiz: [
          {
            q: 'The most common field cause of high head pressure in commercial refrigeration is:',
            a: ['Non-condensable gases in the system', 'Refrigerant overcharge', 'Dirty or blocked condenser coil', 'Failed high-pressure cut-out switch'],
            correct: 2,
            exp: 'Dirt and debris blocking the condenser coil reduces airflow, raising condensing temperature and discharge pressure. It is the most common cause of high head pressure encountered during service calls.',
          },
          {
            q: 'Non-condensable gases (air/nitrogen) in a refrigeration system are confirmed when:',
            a: ['Suction pressure is lower than expected', 'Head pressure is significantly higher than the saturation pressure at the condenser outlet temperature', 'Subcooling is below the target range', 'Superheat is above 20°F at the evaporator outlet'],
            correct: 1,
            exp: 'Non-condensables occupy condenser space without condensing. Comparing head pressure to the saturation pressure at the measured condenser outlet temperature reveals their presence: if head pressure exceeds saturation, NCGs are confirmed.',
          },
        ],
      },
      {
        title: 'Low Suction Pressure Diagnosis',
        body: [
          'Low suction pressure (also called low suction) indicates the evaporator is not receiving enough refrigerant, or the compressor is pumping too hard relative to the load. Key diagnostic: check subcooling. Low subcooling + low suction = refrigerant undercharge (not enough refrigerant in the liquid line). Normal/high subcooling + low suction = restriction downstream of the filter-drier — could be a plugged filter-drier (verify with temperature drop or pressure drop across the drier), TXV/EEV underfeeding, or plugged evaporator distributor nozzle.',
          'Low suction in cold ambient conditions (without head pressure control) is often normal — the condenser is super-efficient, head pressure drops low, and the TXV cannot maintain normal flow. This is not a fault but a design limitation that requires proper head pressure control. A technician must always evaluate suction pressure in context of the full system operating conditions: ambient temperature, load, refrigerant charge, and condensing conditions.',
        ],
        keyPoints: [
          'Low suction + low subcooling = refrigerant undercharge (most likely cause)',
          'Low suction + normal/high subcooling = restriction downstream: plugged drier, TXV, or distributor',
          'Verify filter-drier: temperature drop or pressure drop across drier (>2 psig = replace)',
          'Low suction in cold ambient (no head pressure control) = normal condition, not a fault',
        ],
        quiz: [
          {
            q: 'Low suction pressure combined with low subcooling most likely indicates:',
            a: ['Dirty condenser coil', 'Refrigerant undercharge', 'Liquid line restriction', 'Non-condensable gases'],
            correct: 1,
            exp: 'Low subcooling confirms insufficient refrigerant in the liquid line. Combined with low suction, this is the classic symptom pattern of a refrigerant undercharge.',
          },
          {
            q: 'Low suction pressure with normal subcooling most likely points to:',
            a: ['Refrigerant undercharge', 'Dirty condenser reducing head pressure', 'A restriction between the liquid line and evaporator outlet', 'Compressor valve failure'],
            correct: 2,
            exp: 'Normal subcooling confirms adequate refrigerant in the liquid line. Low suction with normal subcooling suggests a restriction downstream — plugged filter-drier, TXV/EEV underfeeding, or plugged evaporator distributor nozzle.',
          },
        ],
      },
      {
        title: 'Compressor Diagnosis',
        body: [
          'High discharge temperature (above 225°F) stresses compressor oil and valve materials. Causes: low refrigerant charge (reduces suction pressure, increasing compression ratio), high compression ratio from dirty condenser, high suction superheat (vapor entering the compressor is too hot, further raising discharge temperature), poor motor cooling (hermetic compressors rely on suction gas flow to cool the motor windings).',
          'Compressor failure indicators: high discharge temperature trips on temperature cutout; overload protection trips (check voltage, motor winding resistance for open winding or ground fault); liquid slugging noise on startup (check TXV superheat and crankcase heater function); oil level low in a sight glass (refrigerant floodback washing oil out of the crankcase); compressor starts and immediately trips (check starting capacitor in single-phase units, or all safety controls).',
        ],
        keyPoints: [
          'Discharge temp above 225°F: low charge (high compression ratio), dirty condenser, or high superheat',
          'Compressor overload trip: check voltage, winding resistance for open winding or ground fault',
          'Liquid slugging on startup: check TXV superheat and crankcase heater operation',
          'Low oil level: check for refrigerant floodback washing oil from crankcase during off cycles',
        ],
        quiz: [
          {
            q: 'A compressor discharge temperature above 225°F most commonly results from:',
            a: ['Low refrigerant charge, dirty condenser, or excessive suction superheat', 'Normal operation at design conditions with high ambient temperature', 'Refrigerant overcharge causing liquid slugging', 'Defrost heater malfunction'],
            correct: 0,
            exp: 'Discharge temperatures above 225°F indicate excessive compression ratio or excessive inlet superheat. Common causes: low refrigerant charge (raises compression ratio), dirty condenser (raises head pressure), or high suction superheat (evaporator starved of refrigerant).',
          },
          {
            q: 'Liquid slugging noise at compressor startup is most often caused by:',
            a: ['Refrigerant migration to the crankcase during the off cycle', 'Defective discharge valve in the compressor', 'High ambient temperature causing excessive head pressure', 'Low suction superheat at the evaporator outlet'],
            correct: 0,
            exp: 'During long off cycles, refrigerant migrates to the cool compressor crankcase and mixes with oil. On startup, the liquid refrigerant/oil mixture enters the compression chamber and slugs the valves. Crankcase heaters and pump-down cycles prevent migration.',
          },
        ],
      },
      {
        title: 'Refrigerant Leak Detection',
        body: [
          'Electronic halogen detector (heated diode or infrared): the most common method for detecting HFC and HCFC refrigerants. Heated diode sensors detect all halogenated refrigerants. Infrared sensors are highly specific to the target refrigerant and are less prone to false alarms. UV dye: fluorescent dye added to the system circulates with the refrigerant and exits at the leak point — a UV lamp reveals the dye location. Useful for finding slow leaks that electronic detectors miss.',
          'Soap bubbles: simple and effective for large visible leaks at accessible fittings and Schrader valves. Ultrasonic detector: detects turbulent gas flow at the leak point as an ultrasonic signal — effective in noisy environments where electronic detectors generate false alarms. For A2L and A3 refrigerants (R-454B, R-290): use a certified combustible gas detector — halogen detectors do not reliably respond to non-halogenated refrigerants. Never use open flames for leak detection on any system.',
        ],
        keyPoints: [
          'Electronic halogen detector: most common for HFCs; heated diode or infrared sensor',
          'UV dye: finds slow leaks; circulates with refrigerant, visible under UV light',
          'Soap bubbles: simple for large leaks; ultrasonic: good in noisy environments',
          'A2L/A3 refrigerants: use combustible gas detector, NOT halogen detector; no open flames ever',
        ],
        quiz: [
          {
            q: 'Which leak detection method must be used for A2L and A3 refrigerants such as R-454B and R-290?',
            a: ['Heated diode halogen detector', 'Certified combustible gas detector', 'UV dye with UV light only', 'Open flame torch test'],
            correct: 1,
            exp: 'A2L and A3 refrigerants are flammable and may not be reliably detected by halogen detectors. Certified combustible gas detectors must be used. Open flame testing is strictly prohibited near any flammable refrigerant.',
          },
          {
            q: 'UV dye leak detection is most useful for finding:',
            a: ['Large leaks at accessible Schrader valve fittings', 'Slow leaks that electronic detectors cannot detect reliably', 'Leaks in non-halogenated A2L refrigerant systems', 'Leaks while the system is fully evacuated'],
            correct: 1,
            exp: 'UV dye circulates with the refrigerant and accumulates at leak sites over time. It is particularly valuable for finding slow leaks that do not generate enough halogen concentration for electronic detectors to reliably alarm.',
          },
        ],
      },
      {
        title: 'Systematic Fault Analysis',
        body: [
          'Systematic fault analysis uses measured system parameters to confirm a diagnosis rather than guessing. Key measurements: suction pressure (convert to saturation temperature), suction line temperature (calculate superheat), head pressure (convert to condensing temperature), liquid line temperature (calculate subcooling), discharge line temperature, compressor amperage. Compare all measurements to design conditions — deviations reveal the fault.',
          'Common symptom patterns: High suction + high discharge = refrigerant overcharge or non-condensable gases. Low suction + high discharge = dirty condenser, high ambient, or high load. Low suction + low discharge = low refrigerant charge or compressor valve failure (compressor not pumping). Low suction + low discharge + high superheat = severe refrigerant undercharge or complete TXV/EEV failure. Systematic analysis eliminates guesswork and prevents unnecessary part replacement.',
        ],
        keyPoints: [
          'Measure suction P, suction line T, head P, liquid line T, discharge T, and amperage — compare to design',
          'High suction + high discharge = overcharge or non-condensables',
          'Low suction + high discharge = dirty condenser, high load, or high ambient',
          'Low suction + low discharge = low charge or compressor valve failure',
        ],
        quiz: [
          {
            q: 'High suction pressure AND high discharge pressure together most commonly indicate:',
            a: ['Low refrigerant charge', 'Dirty evaporator coil reducing airflow', 'Refrigerant overcharge or non-condensable gases', 'Compressor valve failure'],
            correct: 2,
            exp: 'When both suction and discharge are elevated above design, the system has too much total refrigerant (overcharge) or non-condensable gases increasing overall system pressure on both sides.',
          },
          {
            q: 'Low suction pressure combined with low discharge pressure most commonly indicates:',
            a: ['Refrigerant overcharge', 'Dirty condenser', 'Low refrigerant charge or compressor valve failure', 'High ambient temperature'],
            correct: 2,
            exp: 'When both suction and discharge are depressed, either refrigerant is short (low charge) or the compressor is not pumping effectively (worn or failed suction/discharge valves that allow refrigerant to bypass without full compression).',
          },
        ],
      },
    ],
    test: [
      { q: 'The most common cause of high head pressure in commercial refrigeration is:', a: ['Dirty or blocked condenser coil', 'Non-condensable gases', 'Refrigerant overcharge', 'Discharge line restriction'], correct: 0, exp: 'A dirty condenser coil is the most frequent field cause of high head pressure — reduced airflow raises condensing temperature and head pressure.' },
      { q: 'Non-condensable gases in a refrigeration system are best removed by:', a: ['Recovering refrigerant and evacuating the system', 'Running the system at high head pressure until they purge', 'Adding refrigerant to dilute them', 'Bleeding from the high-side service port'], correct: 0, exp: 'Non-condensables (air, nitrogen) must be removed by full refrigerant recovery followed by deep evacuation to below 300 microns before recharging.' },
      { q: 'Low suction pressure combined with low subcooling indicates:', a: ['Refrigerant undercharge', 'Restriction in the liquid line', 'Plugged evaporator distributor', 'TXV overfeeding'], correct: 0, exp: 'Low subcooling confirms reduced refrigerant in the liquid line. Combined with low suction, this is a classic low-charge symptom.' },
      { q: 'Low suction pressure with normal subcooling most likely points to:', a: ['Restriction between the liquid line and evaporator', 'Low refrigerant charge', 'Dirty condenser', 'Failed head pressure control'], correct: 0, exp: 'If subcooling is normal (refrigerant charge is adequate), low suction pressure suggests a restriction downstream — filter-drier, TXV/EEV underfeeding, or plugged distributor nozzle.' },
      { q: 'A compressor discharge temperature above 225°F indicates:', a: ['High compression ratio, low charge, or poor motor cooling', 'Normal operation at design conditions', 'Refrigerant overcharge', 'Condenser fan cycling'], correct: 0, exp: 'Discharge temperatures above 225°F risk overheating compressor oil and valves. Common causes: high compression ratio (dirty condenser), low refrigerant charge (low suction), or excessive suction superheat.' },
      { q: 'Liquid slugging in a compressor on startup is most often caused by:', a: ['Refrigerant migration to the crankcase during off cycle', 'Low subcooling at the liquid line', 'High head pressure', 'TXV hunting'], correct: 0, exp: 'During off cycles, refrigerant migrates to the cool compressor crankcase and mixes with oil. On startup, liquid flashes, causing slugging. Crankcase heaters and pump-down cycles prevent this.' },
      { q: 'Which leak detection method is best suited for A2L and A3 refrigerants?', a: ['Certified combustible gas detector', 'Heated diode halogen detector', 'UV dye with UV light', 'Soap bubble test'], correct: 0, exp: 'A2L (mildly flammable) and A3 (highly flammable) refrigerants require a combustible gas detector to safely detect leaks — halogen detectors are not appropriate for flammable refrigerants.' },
      { q: 'High suction AND high discharge pressure together most commonly indicate:', a: ['Refrigerant overcharge or non-condensable gases', 'Low refrigerant charge', 'Dirty evaporator coil', 'Failed TXV (stuck closed)'], correct: 0, exp: 'When both suction and discharge are elevated, the system has too much refrigerant or non-condensables increasing total system pressure.' },
      { q: 'Low suction AND low discharge pressure combined most commonly indicate:', a: ['Low refrigerant charge or compressor valve failure', 'High ambient temperature', 'Refrigerant overcharge', 'High suction superheat'], correct: 0, exp: 'When both suction and discharge are depressed, refrigerant is either short (low charge) or the compressor is not pumping effectively (failed suction or discharge valves).' },
      { q: 'A pressure drop greater than 2 psig across a liquid line filter-drier indicates:', a: ['A plugged or saturated drier requiring replacement', 'Normal operating condition', 'Refrigerant overcharge', 'Non-condensable gases'], correct: 0, exp: 'A significant pressure drop across the filter-drier indicates it is saturated with moisture or debris and must be replaced to prevent flow restriction.' },
    ],
  },
  {
    id: 'ref-career',
    num: 16,
    title: 'Career Pathways & Certifications',
    desc: 'EPA 608 Types I-IV, NATE, RSES CMS, career development, and professional standards in commercial refrigeration.',
    slides: [
      {
        title: 'EPA Section 608 Certification Types',
        body: [
          'EPA Section 608 of the Clean Air Act requires any technician who purchases or handles refrigerants in stationary refrigeration or air-conditioning systems to be certified. Four types exist. Type I covers small appliances — systems that are factory-charged with 5 lb or less of refrigerant and use hermetically sealed compressors (household refrigerators, window ACs, water coolers). These are serviced differently from commercial systems.',
          'Type II covers high-pressure appliances — the category that includes virtually all commercial refrigeration. HFCs (R-404A, R-448A, R-449A, R-410A), HFOs (R-454B, R-1234yf), and HCFCs (R-22) all fall under Type II. Type III covers low-pressure appliances — centrifugal chillers using R-11 or R-123 at below-atmospheric-pressure suction. Universal certification covers all three types and is the most versatile credential. EPA-approved testing organizations include ESCO Institute, NATE, and RSES.',
        ],
        keyPoints: [
          'Type I: small appliances, sealed systems ≤5 lb (household refrigerators, window ACs)',
          'Type II: high-pressure (R-22, HFCs, HFOs) — covers all commercial refrigeration',
          'Type III: low-pressure (R-11, R-123 centrifugal chillers)',
          'Universal: covers all three types — most versatile EPA 608 credential',
        ],
        quiz: [
          {
            q: 'Which EPA 608 certification type covers commercial refrigeration systems using R-404A, R-448A, and R-454B?',
            a: ['Type I', 'Type II', 'Type III', 'Type IV'],
            correct: 1,
            exp: 'Type II covers high-pressure appliances. All HFCs and HFOs used in commercial display cases, walk-in coolers, and rack systems are high-pressure refrigerants that fall under Type II certification.',
          },
          {
            q: 'EPA 608 Universal certification is valuable because it:',
            a: ['Replaces the need for NATE or RSES certification', 'Covers all three certification types (I, II, and III)', 'Allows technicians to vent regulated refrigerants without penalty', 'Is required for ammonia refrigeration work'],
            correct: 1,
            exp: 'Universal certification demonstrates competency across all three EPA 608 types — small appliances, high-pressure, and low-pressure systems — making it the most versatile EPA credential a technician can hold.',
          },
        ],
      },
      {
        title: 'NATE Certification',
        body: [
          'North American Technician Excellence (NATE) is the most widely recognized third-party HVACR certification organization in North America. NATE certifications are earned by passing a Core knowledge exam plus a specialty exam. The Commercial Refrigeration specialty tests knowledge of refrigeration systems, refrigerant handling, EPA 608, controls, troubleshooting, and energy efficiency across all major commercial refrigeration equipment types.',
          'NATE certification demonstrates verified technical competency to employers, contractors, and customers — unlike trade-school completion, which demonstrates training but not field proficiency. NATE certificates must be renewed every 5 years through continuing education credits or re-examination. Many contractors require NATE certification for employment or promotion, and some municipalities accept NATE credentials in lieu of local licensing in specific trades.',
        ],
        keyPoints: [
          'NATE: most widely recognized third-party HVACR certification in North America',
          'Core exam + specialty exam (Commercial Refrigeration) required for certification',
          'Tests: refrigeration systems, refrigerant handling, controls, troubleshooting, energy efficiency',
          'Renewal every 5 years via continuing education or re-examination',
        ],
        quiz: [
          {
            q: 'NATE Commercial Refrigeration certification requires passing:',
            a: ['Only the Core knowledge exam', 'A Core exam plus the Commercial Refrigeration specialty exam', 'Three separate exams covering refrigerants, controls, and troubleshooting', 'An EPA 608 Universal exam administered by NATE'],
            correct: 1,
            exp: 'NATE certifications require passing a Core knowledge exam covering HVACR fundamentals, plus a specialty exam (Commercial Refrigeration) covering systems, refrigerants, controls, troubleshooting, and energy efficiency.',
          },
          {
            q: 'NATE certification must be renewed every:',
            a: ['1 year', '3 years', '5 years', '10 years'],
            correct: 2,
            exp: 'NATE certifications expire every 5 years. Technicians must earn continuing education credits or re-pass the examination to maintain their NATE credential.',
          },
        ],
      },
      {
        title: 'RSES and CMS Designation',
        body: [
          'The Refrigeration Service Engineers Society (RSES) is a professional organization for refrigeration and HVACR service technicians, offering training, technical publications, and professional credentials. The Certified Member Specialist (CMS) designation is RSES\'s advanced credential recognizing deep expertise in refrigeration systems. CMS examination covers system design, component selection, advanced troubleshooting, energy analysis, and refrigerant management — exceeding the scope of basic installation and service knowledge.',
          'RSES publishes Service Application Manuals (SAMs), technical bulletins, and online courses that are widely used for training and reference in the refrigeration industry. Local RSES chapters provide networking, training, and peer support for working technicians. The RSES CMS credential, combined with NATE Commercial Refrigeration certification and EPA 608 Universal, represents a comprehensive professional credential package for a commercial refrigeration technician.',
        ],
        keyPoints: [
          'RSES: professional organization for refrigeration technicians; training, publications, credentials',
          'CMS (Certified Member Specialist): advanced RSES credential for deep refrigeration expertise',
          'CMS exam covers system design, component selection, advanced troubleshooting, energy analysis',
          'RSES Service Application Manuals (SAMs) widely used for technical reference in the industry',
        ],
        quiz: [
          {
            q: 'The CMS (Certified Member Specialist) designation in refrigeration is issued by:',
            a: ['NATE (North American Technician Excellence)', 'RSES (Refrigeration Service Engineers Society)', 'EPA (Environmental Protection Agency)', 'ASHRAE'],
            correct: 1,
            exp: 'The CMS designation is issued by RSES and recognizes advanced refrigeration expertise. It is earned by passing an advanced examination covering design, troubleshooting, and energy analysis.',
          },
          {
            q: 'RSES Service Application Manuals (SAMs) are primarily used for:',
            a: ['Government compliance documentation for EPA 608', 'Technical reference and training in refrigeration and HVACR', 'Refrigerant certification testing preparation only', 'Employer payroll and HR management in HVACR companies'],
            correct: 1,
            exp: 'RSES SAMs are technical reference manuals covering refrigeration principles, system design, troubleshooting procedures, and component details — widely used by technicians and instructors as authoritative industry references.',
          },
        ],
      },
      {
        title: 'Career Pathways in Commercial Refrigeration',
        body: [
          'Entry-level pathway: EPA 608 certification (minimum Type II) plus vocational training, apprenticeship, or technical school refrigeration program. Junior technician: works under supervision performing preventive maintenance, filter changes, leak checks, and basic component replacements. Building familiarity with rack controllers, case controllers, and P-T relationships is the key skill development area.',
          'Advancement: senior/lead technician independently diagnoses and services complete rack systems, commissions new display cases and walk-in units, programs case controllers and EEVs, and mentors junior technicians. Service manager: manages a team, handles customer relationships, estimates jobs. Refrigeration engineer/consultant: system design, energy audits, specification writing for new construction and retrofit projects. Large industrial refrigeration (ammonia systems) is a specialized high-wage career track requiring additional safety training.',
        ],
        keyPoints: [
          'Entry: EPA 608 Type II + vocational training or apprenticeship; perform PM under supervision',
          'Junior tech: PM, leak checks, component replacements under supervision; learn rack/case controllers',
          'Senior tech: independent diagnosis, commissioning, EEV/case controller programming',
          'Advanced: service manager (team/customer), engineer (system design, energy audits)',
        ],
        quiz: [
          {
            q: 'The minimum EPA 608 certification type required to purchase and handle HFC refrigerants used in commercial display cases is:',
            a: ['Type I', 'Type II', 'Type III', 'Universal only'],
            correct: 1,
            exp: 'Type II certification covers high-pressure refrigerants including all HFCs used in commercial refrigeration. Any technician who handles R-404A, R-448A, R-449A, R-454B, or similar refrigerants in stationary systems must hold at least Type II certification.',
          },
          {
            q: 'A senior commercial refrigeration technician is distinguished from a junior technician primarily by the ability to:',
            a: ['Perform preventive maintenance without supervision', 'Independently diagnose complex system faults and commission new systems', 'Purchase refrigerants with an EPA 608 certification', 'Replace filters and clean condenser coils without supervision'],
            correct: 1,
            exp: 'Senior technicians independently diagnose complex faults across complete rack systems, commission new equipment, program case controllers and EEVs, and serve as technical resources for junior technicians — capabilities that develop with experience and training beyond entry-level PM work.',
          },
        ],
      },
      {
        title: 'ASHRAE Standards and Professional Standards',
        body: [
          'ASHRAE Standard 15 (Safety Standard for Refrigeration Systems) governs equipment room requirements, machinery room ventilation, refrigerant detector placement and alarm setpoints, relief valve piping and discharge locations, signage, and emergency procedures. Any commercial refrigeration system with a charge above specific thresholds triggers machinery room requirements. Technicians must be familiar with Standard 15 for system design review and compliance.',
          'ASHRAE Standard 34 provides the refrigerant numbering (R-numbers) and safety classification system (A1/A2L/B2L/A3 etc.). IIAR (International Institute of Ammonia Refrigeration) publishes standards governing ammonia systems. All commercial refrigeration work must comply with local mechanical codes, OSHA requirements (LOTO for energized equipment, PPE for refrigerant handling), and EPA 608. NFPA 70 (National Electrical Code) governs electrical wiring of refrigeration equipment.',
        ],
        keyPoints: [
          'ASHRAE 15: safety standard for refrigeration machinery rooms — ventilation, detectors, relief piping',
          'ASHRAE 34: refrigerant numbering and safety classification system',
          'IIAR: ammonia refrigeration standards — required for industrial ammonia system work',
          'OSHA LOTO required before opening refrigerant circuits; PPE required for refrigerant handling',
        ],
        quiz: [
          {
            q: 'ASHRAE Standard 15 primarily governs:',
            a: ['Refrigerant safety classifications and numbering (A1, A2L, B2L, A3)', 'Minimum efficiency standards for commercial refrigeration compressors', 'Safety requirements for refrigeration machinery rooms including ventilation and detector placement', 'Commercial refrigeration technician certification requirements'],
            correct: 2,
            exp: 'ASHRAE Standard 15 is the Safety Standard for Refrigeration Systems. It covers machinery room requirements, ventilation rates, refrigerant detector placement, relief valve discharge, and emergency procedures for systems above certain charge thresholds.',
          },
          {
            q: 'OSHA lockout/tagout (LOTO) procedures in commercial refrigeration are required before:',
            a: ['Checking operating pressures at a service port', 'Performing visual inspection of display cases', 'Opening any refrigerant circuit or working on energized electrical components', 'Reading case controller data via the HMI display'],
            correct: 2,
            exp: 'LOTO is required before opening pressurized refrigerant circuits or working on energized electrical equipment. It protects the technician from unexpected energization, pressurized refrigerant release, and electrical shock during service work.',
          },
        ],
      },
    ],
    test: [
      { q: 'Which EPA 608 certification type is required to service high-pressure commercial refrigeration systems (R-404A, R-448A)?', a: ['Type II', 'Type I', 'Type III', 'Type IV'], correct: 0, exp: 'Type II covers high-pressure refrigerants including all HFCs and HCFCs used in commercial display cases, walk-in coolers, and rack systems.' },
      { q: 'EPA 608 Type I certification covers which systems?', a: ['Small appliances with sealed systems containing 5 lb or less of refrigerant', 'High-pressure commercial refrigeration systems', 'Low-pressure centrifugal chiller systems', 'All refrigeration system types'], correct: 0, exp: 'Type I is specific to small appliances — factory-sealed, hermetically sealed systems with no more than 5 lb of refrigerant, such as window ACs and household refrigerators.' },
      { q: 'NATE Commercial Refrigeration certification demonstrates competency in:', a: ['System troubleshooting, controls, refrigerant handling, and energy efficiency', 'EPA refrigerant purchase authorization only', 'Ammonia system design exclusively', 'HVAC residential service'], correct: 0, exp: 'NATE Commercial Refrigeration tests a broad range of skills including troubleshooting, controls programming, refrigerant regulations, and energy-efficient operation of commercial systems.' },
      { q: 'Which organization issues the CMS (Certified Member Specialist) designation in refrigeration?', a: ['RSES (Refrigeration Service Engineers Society)', 'NATE (North American Technician Excellence)', 'EPA (Environmental Protection Agency)', 'ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers)'], correct: 0, exp: 'RSES offers the CMS credential as an advanced designation for refrigeration specialists, covering design, troubleshooting, and energy analysis.' },
      { q: 'ASHRAE Standard 15 governs:', a: ['Safety requirements for refrigeration systems including equipment rooms and relief venting', 'Refrigerant designation and safety classification', 'Energy efficiency of commercial refrigeration equipment', 'Technician certification requirements'], correct: 0, exp: 'ASHRAE 15 is the Safety Standard for Refrigeration Systems — it specifies machinery room requirements, detector placement, relief device piping, and emergency procedures.' },
      { q: 'ASHRAE Standard 34 is primarily used to:', a: ['Classify refrigerant safety groups (toxicity and flammability)', 'Define equipment room ventilation rates', 'Set minimum efficiency standards for compressors', 'Specify leak detection alarm thresholds'], correct: 0, exp: 'ASHRAE 34 provides the naming convention (R-numbers) and the A1/A2L/B2L etc. safety classification system for all refrigerants.' },
      { q: 'What entry-level credential is federally required before a technician can purchase refrigerants?', a: ['EPA Section 608 certification', 'NATE Core certification', 'OSHA 10 card', 'State mechanical contractor license'], correct: 0, exp: 'Federal law requires EPA 608 certification to purchase EPA-controlled refrigerants. It is the baseline credential for any HVACR or refrigeration technician.' },
      { q: 'Which industry standard organization publishes refrigeration safety standards for ammonia (R-717) systems?', a: ['IIAR (International Institute of Ammonia Refrigeration)', 'RSES', 'NATE', 'ASHRAE only'], correct: 0, exp: 'IIAR publishes the primary safety standards for ammonia refrigeration, including system design, operator training, emergency response, and mechanical integrity programs.' },
      { q: 'A refrigeration technician advancing from junior to senior level typically gains the ability to perform:', a: ['Independent commissioning and controls programming without supervision', 'Refrigerant purchase and basic PM only', 'System design and energy audits', 'Team management and estimating'], correct: 0, exp: 'Senior technicians take on independent service calls, commission new systems, and program case controllers and rack controllers — tasks requiring deep troubleshooting experience.' },
      { q: 'Lockout/tagout (LOTO) procedures in commercial refrigeration are most critical when:', a: ['Opening refrigerant circuits on energized equipment for service', 'Performing visual inspection of display cases', 'Checking operating pressures at service ports', 'Reviewing P-T charts for refrigerant identification'], correct: 0, exp: 'LOTO is required before opening any pressurized or energized system for service to protect the technician from unexpected startup, electrical hazards, and refrigerant release.' },
    ],
  },
];
