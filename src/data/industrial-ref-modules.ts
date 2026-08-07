import type { TrainingModule } from './modules';

export const INDUSTRIAL_REF_MODULES: TrainingModule[] = [
  {
    id: 'ir-overview',
    num: 1,
    title: 'Industrial Refrigeration — Industry and Careers',
    desc: 'Who hires industrial refrigeration operators and technicians, what the work looks like, what certifications matter, and the pay range across food processing, cold storage, and chemical plant applications.',
    slides: [
      {
        title: 'The Industrial Refrigeration Industry',
        body: [
          'Industrial refrigeration uses large-scale refrigerant systems — primarily ammonia (R-717) and increasingly CO2 (R-744) — to cool and freeze products in food processing, cold storage, chemical manufacturing, ice rinks, and pharmaceutical facilities. These are not residential or commercial systems scaled up; they are fundamentally different in refrigerant, pressure levels, safety requirements, and control complexity.',
          'The food chain depends entirely on industrial refrigeration. Beef, pork, and poultry processing plants run massive ammonia systems to chill carcasses within hours of slaughter. Dairy plants pasteurize and chill milk. Produce distributors hold millions of pounds of fruit and vegetables at precise temperatures. Frozen food manufacturers run multi-stage freezer systems. Breweries ferment and condition beer at carefully controlled temperatures. Without the refrigeration systems — and the people who maintain them — the food supply chain fails.',
          'Major employer types: food processing and packing plants (Tyson, JBS, Smithfield, Sysco DCs), cold storage warehouses (Lineage Logistics, Americold, United States Cold Storage), ice rink operators, beverage manufacturers (breweries, soft drink plants), chemical process plants that use refrigeration for process temperature control, and industrial contractors who build and service these systems.',
          'Industrial refrigeration is a trade that is resistant to offshoring and automation — someone must physically operate and maintain the equipment on-site. The workforce is aging, and skilled operators are retiring faster than they are being replaced. Demand consistently exceeds supply, which has driven wages significantly above other skilled trades.',
        ],
        keyPoints: [
          'Industrial refrigeration primary refrigerants: ammonia (R-717) and CO2 (R-744) — not scaled-up commercial HVAC systems',
          'Key industries: food processing, cold storage, breweries, pharmaceutical, chemical process, ice rinks',
          'Workforce shortage: aging workforce retiring faster than new operators enter — strong labor market',
          'Major employers: food processing giants, logistics cold chains (Lineage, Americold), industrial contractors',
        ],
        quiz: [
          {
            q: 'Industrial refrigeration systems primarily use which refrigerant that is fundamentally different from residential/commercial HVAC systems?',
            a: ['Ammonia (R-717) — toxic and flammable but with zero GWP and outstanding thermodynamic properties', 'R-410A — the same refrigerant used in residential systems but at higher pressures', 'R-134a — used at industrial scale due to its high capacity', 'Propane (R-290) — standard for all food processing applications'],
            correct: 0,
            exp: 'Ammonia (R-717) is the dominant industrial refrigerant due to superior thermodynamic efficiency, zero ozone depletion, and zero global warming potential. However, it is toxic and requires specialized safety systems not found in commercial HVAC.',
          },
          {
            q: 'The primary reason industrial refrigeration technicians are in high demand is:',
            a: ['The existing workforce is aging and retiring faster than new operators enter the field', 'Refrigeration systems are becoming more complex, requiring more people to operate each one', 'New regulations require double-staffing of all ammonia systems', 'The food processing industry is expanding into new geographic markets'],
            correct: 0,
            exp: 'The industrial refrigeration workforce skews older. Retirements are outpacing new entrants, creating a persistent labor shortage that has pushed wages significantly higher than comparable skilled trades.',
          },
          {
            q: 'Which of the following operations would NOT typically use industrial ammonia refrigeration?',
            a: ['A residential apartment building with central air conditioning', 'A beef processing plant chilling carcasses post-slaughter', 'A large cold storage warehouse holding frozen produce', 'A brewery controlling fermentation tank temperatures'],
            correct: 0,
            exp: 'Residential apartment buildings use commercial HVAC refrigerants (R-410A, R-32, R-454B). Industrial ammonia systems are found in food processing, cold storage, and process industries — not residential applications.',
          },
        ],
      },
      {
        title: 'RETA Certifications and Career Paths',
        body: [
          'RETA (Refrigerating Engineers and Technicians Association) is the industry\'s primary certification body. RETA offers four progressive certifications: CIRO (Certified Industrial Refrigeration Operator) — entry-level, no experience required to test; CIRO+ (Certified Industrial Refrigeration Operator Plus) — advanced operator level; CRST (Certified Refrigeration Service Technician) — service and maintenance technician; and CRES (Certified Refrigeration Engineer Specialist) — the senior engineering-level designation.',
          'Career progression in industrial refrigeration: Entry — Refrigeration Operator in Training (rotating shifts, learning system operations under supervision), earning $45,000–$58,000. Operator — licensed and certified operator running a facility\'s refrigeration plant independently, earning $60,000–$75,000. Senior Operator / Chief Engineer — responsible for the entire refrigeration plant, capital planning, and managing other operators, earning $75,000–$100,000+. Refrigeration Technician (contractor side) — installs and services systems, requires more technical skills in pipe fitting and controls, earning $65,000–$90,000+.',
          'State licensing: many states require operators of facilities above certain ammonia thresholds to hold a state-issued refrigeration operator license. Requirements vary — some states accept RETA CIRO, others have independent examinations. High-pressure boiler and pressure vessel experience is sometimes transferable. Always check the specific requirements for the state where you will work.',
          'Adjacent certifications that increase value: EPA Section 608 Universal Certification (required to purchase and handle HFC refrigerants, useful for mixed-refrigerant facilities), OSHA 30-Hour General Industry, RETA safety training, and process safety management (PSM) training for facilities covered under OSHA 29 CFR 1910.119.',
        ],
        keyPoints: [
          'RETA certifications: CIRO (entry) → CIRO+ → CRST (service tech) → CRES (engineer specialist)',
          'Pay range: entry operator $45–58K, licensed operator $60–75K, chief engineer/senior tech $75–100K+',
          'Many states require a licensed refrigeration operator for facilities above ammonia inventory thresholds — check state requirements',
          'Adjacent certs: EPA 608, OSHA 30-Hour, RETA safety, PSM training for covered facilities',
        ],
        quiz: [
          {
            q: 'The RETA CIRO certification is best described as:',
            a: ['An entry-level industrial refrigeration operator certification that can be tested without prior work experience', 'A senior engineering credential requiring 10+ years in the field', 'A state-required license for operating ammonia systems above 10,000 lbs', 'A certification for refrigeration contractors who install new systems'],
            correct: 0,
            exp: 'CIRO (Certified Industrial Refrigeration Operator) is RETA\'s entry-level certification — no experience requirement to take the exam, making it the starting point for new entrants to the field.',
          },
          {
            q: 'EPA Section 608 Universal Certification is relevant to industrial refrigeration technicians because:',
            a: ['It is required to purchase and handle HFC refrigerants, useful at facilities that use both ammonia and HFC systems', 'It specifically covers ammonia refrigeration handling — the primary industrial refrigerant', 'It is the OSHA certification required for entry into any refrigeration machine room', 'It is only relevant to HVAC technicians — ammonia systems are exempt from Section 608'],
            correct: 0,
            exp: 'Ammonia (R-717) is not a regulated refrigerant under EPA Section 608 — but HFCs are. Technicians at facilities using both refrigerant types (common in mixed systems) need 608 Universal for the HFC side.',
          },
          {
            q: 'A facility with a large ammonia charge may be subject to which OSHA regulation requiring a written Process Safety Management plan?',
            a: ['OSHA 29 CFR 1910.119 — Process Safety Management of Highly Hazardous Chemicals', 'OSHA 29 CFR 1910.146 — Permit-Required Confined Spaces', 'OSHA 29 CFR 1910.147 — Control of Hazardous Energy (LOTO)', 'EPA Section 608 — Refrigerant Management'],
            correct: 0,
            exp: 'Facilities with 10,000+ lbs of ammonia refrigerant are subject to OSHA PSM (29 CFR 1910.119), which requires written procedures, mechanical integrity programs, process hazard analysis, and incident investigation protocols.',
          },
        ],
      },
      {
        title: 'The Industrial Refrigeration Machine Room',
        body: [
          'The refrigeration machine room (engine room) houses the compressors, vessels, and associated equipment that form the refrigerant circuit. Machine rooms are designed to contain and detect refrigerant releases. Required features: ammonia detection system (continuous monitoring with alarm and auto-ventilation activation), sufficient ventilation (typically 30+ air changes per hour triggered by leak detection), emergency shutdown controls accessible outside the room, proper lighting, eyewash stations, and PPE storage at the entry.',
          'Machine room entry procedures: before entering, check the ammonia detector display outside the room. If the detector reads above 25 ppm, do not enter without SCBA (Self-Contained Breathing Apparatus). Minimum PPE for routine entry: chemical splash goggles, chemical-resistant gloves, and awareness of egress routes. For any work on refrigerant-containing systems: full face shield or SCBA depending on the potential exposure.',
          'Typical machine room equipment: compressor packages (one or more compressors with oil separators), pressure vessels (high-pressure receiver, low-pressure receiver, suction accumulator/surge drum, intercooler, oil pot), pumped liquid recirculation systems (low-pressure liquid pumps feeding evaporators), condensers (typically evaporative type located outside), and the engine room control panel managing system pressures, temperatures, and alarms.',
          'Refrigerant inventory management: facilities covered under EPA RMP (Risk Management Plan — 40 CFR Part 68) must maintain accurate ammonia inventory records. The threshold triggering RMP is 10,000 lbs of ammonia onsite. RMP requires an off-site consequence analysis (what happens to surrounding areas if a worst-case release occurs) and emergency response coordination with local authorities. The operator who knows the system and its inventory is a key part of facility emergency planning.',
        ],
        keyPoints: [
          'Machine room requires: ammonia detector at entry, 30+ ACH ventilation, outside emergency shutdown, eyewash stations',
          'Entry: check detector before entering — do not enter above 25 ppm without SCBA',
          'Machine room contains: compressors, vessels (HP receiver, LP receiver, accumulator, intercooler), liquid pumps, condenser connection, control panel',
          'EPA RMP: 10,000 lb ammonia threshold triggers written Risk Management Plan and off-site consequence analysis',
        ],
        quiz: [
          {
            q: 'Upon approaching the machine room, the ammonia detector display shows 30 ppm. You should:',
            a: ['Not enter without SCBA — 30 ppm exceeds the 25 ppm threshold for unprotected entry', 'Enter cautiously — 30 ppm is below the IDLH (300 ppm) and is safe for short exposures', 'Enter and ventilate — the detector triggers ventilation automatically at 25 ppm so you will be safe', 'Only enter if wearing chemical splash goggles — 30 ppm does not require breathing protection'],
            correct: 0,
            exp: '25 ppm is the OSHA PEL-TWA for ammonia — the threshold above which an 8-hour exposure is hazardous. Above 25 ppm, SCBA (positive-pressure) is required before entering the machine room.',
          },
          {
            q: 'The EPA Risk Management Plan (RMP) is triggered when a facility has:',
            a: ['10,000 lbs or more of ammonia onsite', '1,000 lbs — the standard threshold for all toxic refrigerants', 'Any quantity of ammonia refrigerant — RMP applies to all ammonia facilities', '50,000 lbs — only the largest industrial systems require an RMP'],
            correct: 0,
            exp: 'The EPA RMP threshold for ammonia (R-717) is 10,000 lbs. Facilities at or above this quantity must develop a written RMP, conduct an off-site consequence analysis, and coordinate with local emergency responders.',
          },
          {
            q: 'A suction accumulator/surge drum in the machine room protects:',
            a: ['The compressor from liquid ammonia slugs — it separates any liquid carryover before refrigerant vapor enters the compressor suction', 'The high-pressure receiver from overpressure during a defrost cycle', 'The evaporative condenser from fouling by separating particulates', 'The liquid feed pumps from vapor entrainment in the suction line'],
            correct: 0,
            exp: 'Liquid ammonia entering a compressor cylinder (liquid slugging) causes catastrophic mechanical damage. The accumulator/surge drum ensures only vapor reaches the compressor suction by holding any liquid carryover.',
          },
        ],
      },
    ],
    test: [
      { q: 'The primary refrigerant used in industrial refrigeration is:', a: ['Ammonia (R-717) — zero GWP, excellent thermodynamics, but toxic', 'R-410A — same as residential systems but at higher pressures', 'R-134a — widely used in industrial food processing', 'CO2 (R-744) — the only industrial refrigerant in use today'], correct: 0, exp: 'Ammonia (R-717) dominates industrial refrigeration. It has superior thermodynamics and zero environmental impact but requires safety systems due to its toxicity.' },
      { q: 'Major industrial refrigeration employers include:', a: ['Food processing plants, cold storage warehouses, breweries, and industrial contractors', 'Residential HVAC contractors and apartment building managers', 'Data center operators exclusively — the primary use of large-scale cooling', 'Pharmaceutical retail chains with large walk-in coolers'], correct: 0, exp: 'Food processing (Tyson, Smithfield), cold storage logistics (Lineage, Americold), breweries, and industrial contractors are the primary employers of industrial refrigeration operators.' },
      { q: 'The RETA CIRO certification is:', a: ['An entry-level operator certification with no experience prerequisite', 'A senior engineering credential requiring 10+ years', 'A state license required in most states for ammonia systems', 'A contractor installation certification'], correct: 0, exp: 'CIRO (Certified Industrial Refrigeration Operator) is RETA\'s entry-level credential. No prior work experience is required to take the exam.' },
      { q: 'The OSHA regulation covering ammonia facilities with 10,000+ lbs is:', a: ['29 CFR 1910.119 — Process Safety Management (PSM)', '29 CFR 1910.146 — Confined Spaces', '29 CFR 1910.147 — Control of Hazardous Energy', 'EPA Section 608 — Refrigerant Management'], correct: 0, exp: 'OSHA PSM (29 CFR 1910.119) applies to facilities with 10,000+ lbs of ammonia. It requires written procedures, process hazard analysis, and mechanical integrity programs.' },
      { q: 'Machine room ventilation for ammonia facilities typically activates at:', a: ['25 ppm — automatically starting forced ventilation at the OSHA PEL-TWA alarm level', '300 ppm — the IDLH (immediately dangerous to life and health) level', '1000 ppm — the LEL (lower explosive limit) for ammonia', '5 ppm — the odor detection threshold'], correct: 0, exp: 'Ventilation systems in ammonia machine rooms are designed to activate at the alarm threshold, typically set at or near 25 ppm (OSHA PEL-TWA), to prevent concentrations from building toward dangerous levels.' },
      { q: 'The machine room ammonia detector shows 30 ppm. You should:', a: ['Not enter without SCBA — 30 ppm exceeds the 25 ppm threshold for unprotected entry', 'Enter with splash goggles only — 30 ppm is safe for short exposure', 'Enter and check the ventilation system — it should have already activated', 'Call 911 immediately — 30 ppm is an emergency evacuation threshold'], correct: 0, exp: 'Above 25 ppm (OSHA PEL-TWA), unprotected entry is prohibited. SCBA is required. However, 30 ppm is not at the IDLH (300 ppm) or evacuation threshold — SCBA entry to investigate is appropriate.' },
      { q: 'The EPA RMP threshold for ammonia is:', a: ['10,000 lbs onsite — triggers written Risk Management Plan requirement', '1,000 lbs', '5,000 lbs', '50,000 lbs — only the largest systems'], correct: 0, exp: '10,000 lbs of ammonia onsite triggers the EPA RMP requirement under 40 CFR Part 68.' },
      { q: 'A suction accumulator protects the compressor from:', a: ['Liquid ammonia slugging — liquid in the cylinder causes catastrophic mechanical damage', 'High discharge pressure', 'Oil contamination in the suction line', 'Refrigerant freeze-up at low ambient temperatures'], correct: 0, exp: 'The accumulator separates any liquid carryover from the suction vapor before it reaches the compressor. Liquid slugging destroys valves, pistons, and connecting rods.' },
      { q: 'An operator career progression with RETA certifications typically follows:', a: ['CIRO (entry) → CIRO+ → CRST (service tech) → CRES (engineer specialist)', 'CRES first — then downward to CIRO for operational roles', 'CRST → CIRO — service tech certification is the entry point', 'All RETA levels must be taken simultaneously as a package'], correct: 0, exp: 'RETA\'s progression is CIRO (entry operator) → CIRO+ (advanced operator) → CRST (service technician) → CRES (engineer specialist).' },
      { q: 'Compared to commercial HVAC, industrial refrigeration pays:', a: ['Significantly more — experienced operators earn $75,000–$100,000+, driven by the labor shortage and PSM complexity', 'The same — equivalent skill levels earn equivalent wages', 'Less — industrial work has more downtime between tasks', 'Entry-level only — no career advancement path exists in industrial refrigeration'], correct: 0, exp: 'Industrial refrigeration operators earn substantially more than commercial HVAC techs at comparable experience levels, driven by the labor shortage, the specialized knowledge required, and the 24/7 operational demands of food processing.' },
    ],
  },

  {
    id: 'ir-refrigeration-principles',
    num: 2,
    title: 'Industrial Refrigeration Cycle — Principles and Refrigerants',
    desc: 'Vapor compression cycle fundamentals at industrial scale — P-h diagrams, ammonia properties, two-stage cycles, CO2 cascade systems, and how to read system pressures to understand what the refrigerant is doing.',
    slides: [
      {
        title: 'The Vapor Compression Cycle at Industrial Scale',
        body: [
          'All vapor compression refrigeration systems — residential, commercial, and industrial — move heat from a low-temperature space to a higher-temperature space by cycling a refrigerant through four states: liquid, low-pressure vapor, high-pressure vapor, and high-pressure liquid. What differs at industrial scale is the refrigerant (ammonia), the equipment sizes, the system complexity (two-stage, multi-evaporator), and the safety infrastructure.',
          'The four cycle stages: (1) Evaporation — liquid ammonia absorbs heat from the product or space being cooled and evaporates to vapor at low pressure. (2) Compression — the compressor draws in low-pressure vapor and compresses it to high pressure, raising its temperature significantly. (3) Condensation — high-pressure, high-temperature vapor releases its heat to the environment (via an evaporative condenser or cooling tower) and condenses back to liquid. (4) Expansion — liquid passes through an expansion device (expansion valve or float valve), dropping to low pressure and partially flashing to vapor, completing the cycle.',
          'The Pressure-Enthalpy (P-h) diagram is the industrial refrigeration professional\'s primary analysis tool. It plots refrigerant pressure on the vertical axis and enthalpy (heat content) on the horizontal axis. The vapor dome (saturation curve) separates liquid (left of dome), the two-phase region (under the dome), and superheated vapor (right of dome). The four cycle stages appear as a rectangle on the P-h diagram: horizontal left leg = evaporation, vertical right leg = compression, horizontal right leg = condensation, vertical left leg = expansion. Superheat, subcooling, and compression work are all readable from the diagram.',
          'Reading the system by pressure: ammonia saturation pressures correspond directly to temperatures. At −20°F evaporating temperature, ammonia saturation pressure is approximately 18.3 psig. At +86°F condensing temperature, saturation pressure is approximately 154 psig. An operator who knows ammonia saturation tables (or uses a PT chart) can determine the evaporating and condensing temperatures just by reading the suction and discharge pressure gauges — no thermometers needed at the vessels.',
        ],
        keyPoints: [
          'Four cycle stages: evaporation → compression → condensation → expansion (same for all vapor compression systems)',
          'P-h diagram: pressure vs enthalpy — the standard analysis tool; the cycle is a rectangle on the diagram',
          'Ammonia pressure-temperature relationship: suction pressure reveals evaporating temperature, discharge pressure reveals condensing temperature',
          'Reading pressures on site is the primary skill for diagnosing system operation — PT chart is the operator\'s reference',
        ],
        quiz: [
          {
            q: 'In the vapor compression cycle, the refrigerant absorbs heat from the refrigerated space during:',
            a: ['Evaporation — liquid refrigerant absorbs heat and evaporates to low-pressure vapor', 'Condensation — high-pressure vapor releases heat to the environment', 'Compression — the compressor adds heat to the vapor', 'Expansion — the pressure drop releases heat from the refrigerant'],
            correct: 0,
            exp: 'Evaporation is the heat absorption stage. Liquid refrigerant in the evaporator absorbs heat from the product or space being cooled, changing to low-pressure vapor.',
          },
          {
            q: 'An industrial refrigeration system is running with a suction pressure of 18.3 psig for ammonia. An operator consulting a PT chart will find the evaporating temperature is approximately:',
            a: ['-20°F — ammonia saturation temperature at 18.3 psig', '+86°F — this corresponds to the condensing temperature', '-40°F — indicating an extremely low-temperature freezer application', '+32°F — the standard evaporating temperature for fresh produce storage'],
            correct: 0,
            exp: 'Ammonia saturation at 18.3 psig = approximately −20°F. Knowing saturation tables/PT chart lets an operator determine operating temperatures directly from pressure gauges.',
          },
          {
            q: 'On a P-h diagram, the compression stage of the refrigeration cycle appears as:',
            a: ['A line rising steeply from low to high pressure at roughly constant enthalpy (slight right shift for superheat)', 'A horizontal line at high pressure (heat rejection to the condenser)', 'A vertical drop from high to low pressure at the expansion device', 'A horizontal line at low pressure (heat absorption in the evaporator)'],
            correct: 0,
            exp: 'Compression raises pressure with a near-vertical rise on the P-h diagram, moving from the low-pressure suction point to the high-pressure discharge point. The slight rightward shift represents the work of compression added as superheat.',
          },
        ],
      },
      {
        title: 'Ammonia Properties and Two-Stage Systems',
        body: [
          'Ammonia (R-717) has exceptional thermodynamic properties that make it the industrial refrigerant of choice: the highest refrigerating effect per pound of any common refrigerant, excellent heat transfer characteristics, very low viscosity, and zero GWP. The latent heat of vaporization for ammonia at 5°F is approximately 561 BTU/lb — compared to 82 BTU/lb for R-134a. This means for the same cooling duty, an ammonia system circulates roughly 7x less refrigerant mass, resulting in smaller pipes, lower pumping costs, and faster response.',
          'Ammonia physical properties to know: boiling point at atmospheric pressure is −28°F (−33°C). Vapor density is lighter than air (specific gravity 0.59) — ammonia vapors rise and accumulate at the ceiling and in roof voids. This is opposite to most HFC refrigerants, which are heavier than air and accumulate at floor level. Machine room detectors should be placed high (near ceiling) for ammonia detection. IDLH (immediately dangerous to life and health): 300 ppm. OSHA PEL-TWA: 25 ppm. Flammability: ammonia is flammable in air at 15–28% by volume (the UEL/LEL range) — extremely high concentrations required; a typical refrigerant leak will not reach flammable concentrations in a ventilated machine room.',
          'Two-stage (compound) compression: industrial refrigeration systems serving freezer applications often require evaporating temperatures of −20°F to −40°F or lower. Compressing from −40°F suction directly to +86°F condensing in a single stage results in very high compression ratios (above 7:1), which causes high discharge temperatures, poor volumetric efficiency, and mechanical stress. Two-stage compression solves this by using a high-stage compressor and a low-stage compressor with an intercooler between them. The intercooler cools the intermediate-pressure gas and removes flash gas from the economizer port, improving overall system efficiency by 15–25% compared to single-stage compression at the same conditions.',
          'Economizer/intercooler types: flash intercooler (most common in industrial systems) — high-pressure liquid from the condenser is partially flashed through a float valve into the intercooler vessel at intermediate pressure. The flash gas saturates the intermediate-pressure gas from the low-stage compressor. The remaining liquid (now subcooled) feeds the low-pressure evaporators. Closed-type intercooler — a coil in the vessel passes liquid refrigerant for subcooling without mixing, useful when the intermediate stage gas and the liquid feed pressures are different.',
        ],
        keyPoints: [
          'Ammonia latent heat: ~561 BTU/lb at 5°F vs 82 BTU/lb for R-134a — 7× less refrigerant mass for same cooling duty',
          'Ammonia rises (specific gravity 0.59) — detectors go near ceiling; opposite of HFC refrigerants which fall',
          'Two-stage compression: used below −20°F evaporating to control compression ratio — 15–25% efficiency improvement',
          'Flash intercooler: partially flashes liquid at intermediate pressure to cool the intermediate gas and subcool liquid to low-stage',
        ],
        quiz: [
          {
            q: 'Why do ammonia machine room detectors typically mount near the ceiling?',
            a: ['Ammonia vapor is lighter than air (specific gravity 0.59) and rises — concentrations build at the ceiling first', 'Ammonia vapors are heavier than air and accumulate on the ceiling due to temperature stratification', 'Ceiling mounting avoids false alarms from floor-level cleaning chemicals', 'Detectors are ceiling-mounted to keep them away from foot traffic — placement height does not affect accuracy'],
            correct: 0,
            exp: 'Ammonia has a specific gravity of 0.59 — lighter than air. It rises and accumulates at the ceiling and in roof voids. This is opposite to most HFC refrigerants, which are heavier than air and sink to the floor.',
          },
          {
            q: 'The primary reason industrial freezer systems use two-stage compression instead of single-stage is:',
            a: ['To avoid excessively high compression ratios that cause poor efficiency and high discharge temperatures when evaporating at −40°F or lower', 'Single-stage compressors are not available in the sizes required for industrial duty', 'Two-stage systems use less ammonia refrigerant for the same cooling capacity', 'Two-stage systems meet OSHA requirements for redundancy in hazardous refrigerant systems'],
            correct: 0,
            exp: 'Compressing from −40°F suction to +86°F condensing in one stage produces compression ratios above 8:1, causing excessive discharge temperatures, poor volumetric efficiency, and oil breakdown. Two-stage compression limits each stage to a manageable ratio (typically 3:1 to 4:1 per stage).',
          },
          {
            q: 'The ammonia IDLH (Immediately Dangerous to Life and Health) concentration is:',
            a: ['300 ppm — the OSHA IDLH for ammonia', '25 ppm — the OSHA PEL-TWA', '50,000 ppm — the lower flammable limit', '1,000 ppm — the maximum short-term exposure limit (STEL)'],
            correct: 0,
            exp: 'The OSHA IDLH for ammonia is 300 ppm. At this concentration, immediate evacuation and SCBA are required. The PEL-TWA is 25 ppm for an 8-hour work shift.',
          },
        ],
      },
      {
        title: 'CO2 and Other Industrial Refrigerant Options',
        body: [
          'CO2 (R-744) is the fastest-growing refrigerant in industrial refrigeration, particularly for new food retail and cold storage facilities. CO2 has zero ozone depletion potential (ODP) and a very low global warming potential (GWP = 1, the reference point). The main disadvantage: CO2 operates at much higher pressures than ammonia or HFCs. At room temperature, CO2 saturation pressure is approximately 850 psig — versus 154 psig for ammonia at 86°F. Equipment and piping must be rated for high pressure.',
          'CO2 in cascade systems: the most common industrial CO2 configuration is a cascade system, where CO2 operates in the low-temperature stage (the cold side, serving the freezer evaporators) and ammonia or an HFC operates in the high-temperature stage (condensing the CO2 in a cascade heat exchanger). This limits the CO2 system to the low side, where its higher pressures are manageable, while using the proven properties of ammonia or HFC at the warm side.',
          'Transcritical CO2 systems: when CO2 operates above its critical point (87.8°F / 1,070 psig), it enters a supercritical state where it cannot condense conventionally. These transcritical CO2 systems are common in European food retail stores and are growing in North America. They require a gas cooler (not a condenser) on the high side and significantly different control strategies. Flash gas bypasses and ejectors are used to improve transcritical efficiency, especially at high ambient temperatures.',
          'HFCs in industrial refrigeration: R-507A, R-404A, and R-448A/449A (lower-GWP HFO blends) are used in some industrial applications, particularly where ammonia is not practical (supermarket DCs, pharmaceutical cold chain, some food processing sub-areas). HFCs are subject to EPA phasedown under the AIM Act (reducing production by 85% by 2036). Knowledge of both ammonia and HFC industrial systems maximizes employability.',
        ],
        keyPoints: [
          'CO2 (R-744): GWP = 1, zero ODP, but very high operating pressures (~850 psig at ambient) — requires heavy-duty piping and components',
          'Cascade systems: CO2 on low side (freezer), ammonia or HFC on high side — limits each refrigerant to its ideal operating range',
          'Transcritical CO2: above critical point (87.8°F / 1,070 psig) — uses gas cooler instead of condenser, increasingly common in food retail',
          'HFCs (R-507A, R-404A, R-448A): subject to AIM Act phasedown — HFO blends have lower GWP but still above CO2',
        ],
        quiz: [
          {
            q: 'The global warming potential (GWP) of CO2 (R-744) is:',
            a: ['1 — the reference value against which all other refrigerants are compared', '2,088 — the GWP of R-404A, a common HFC used in industrial applications', '0 — CO2 has zero global warming impact because it is a natural gas', '11,700 — the GWP of R-23, used in ultra-low temperature applications'],
            correct: 0,
            exp: 'CO2 is the reference refrigerant with GWP = 1. All other refrigerants are compared to CO2. R-404A (GWP ~3,922) and R-507A (GWP ~3,985) have dramatically higher global warming impact.',
          },
          {
            q: 'In a CO2/ammonia cascade system, CO2 operates on:',
            a: ['The low-temperature side, serving freezer evaporators — ammonia condenses the CO2 in the cascade heat exchanger', 'The high-temperature side — CO2 is used for condensing while ammonia serves the evaporators', 'Both sides — a cascade system uses two identical CO2 circuits in series', 'Neither side — cascade refers to sequencing compressor capacity, not refrigerant selection'],
            correct: 0,
            exp: 'CO2 handles the low-temperature (freezer) side where its higher pressures are manageable. Ammonia on the high side condenses the CO2 in the cascade heat exchanger (which is the evaporator for the ammonia side).',
          },
          {
            q: 'The main reason CO2 systems require heavier-duty piping and components than ammonia systems is:',
            a: ['CO2 saturation pressure at room temperature is approximately 850 psig — versus 154 psig for ammonia at the same temperature', 'CO2 is corrosive to standard steel piping materials', 'CO2 systems run at higher temperatures that require high-temperature alloys', 'CO2 has a higher refrigerant density that causes erosion in standard piping'],
            correct: 0,
            exp: 'CO2 has a much higher saturation pressure at ambient temperatures than ammonia or HFCs. Piping, vessels, and components must be rated for these pressures — approximately 5–6 times higher than an equivalent ammonia system.',
          },
        ],
      },
    ],
    test: [
      { q: 'In the vapor compression cycle, the compressor moves refrigerant from:', a: ['Low-pressure suction to high-pressure discharge, raising temperature as well as pressure', 'High-pressure liquid to low-pressure vapor (expansion stage)', 'Low-pressure vapor to low-pressure liquid (condensation)', 'High-pressure vapor back to the evaporator'], correct: 0, exp: 'The compressor draws low-pressure suction vapor and discharges high-pressure, high-temperature vapor — driving heat toward the high-pressure (hot) side of the system.' },
      { q: 'An operator reads 18.3 psig on the ammonia suction pressure gauge. Using a PT chart, the evaporating temperature is approximately:', a: ['-20°F', '+32°F', '-40°F', '+86°F'], correct: 0, exp: 'Ammonia at 18.3 psig saturation pressure = approximately −20°F. PT charts let operators read temperature from pressure at any point in the system.' },
      { q: 'Ammonia\'s latent heat of vaporization (~561 BTU/lb) compared to R-134a (~82 BTU/lb) means an ammonia system moves:', a: ['Far less refrigerant mass for the same cooling duty — roughly 7× less, enabling smaller pipes and lower pumping costs', 'The same refrigerant mass — latent heat doesn\'t affect mass flow rate', 'More refrigerant mass — higher BTU/lb means more refrigerant is required', 'The same cooling effect per unit volume, but at lower pressures'], correct: 0, exp: 'Higher latent heat means more BTUs are absorbed per pound of refrigerant. For the same total cooling load, a system with higher latent heat circulates less mass — smaller pipes, pumps, and lower energy.' },
      { q: 'Ammonia vapors in a machine room will:', a: ['Rise and accumulate near the ceiling — specific gravity 0.59 (lighter than air)', 'Sink to the floor — heavier than air like most HFCs', 'Diffuse evenly throughout the room within seconds of release', 'Follow ventilation patterns — direction of accumulation is unpredictable'], correct: 0, exp: 'Ammonia is lighter than air. It rises and accumulates at the ceiling and in roof voids. Detectors must be ceiling-mounted, and high-side ventilation is critical.' },
      { q: 'Two-stage (compound) compression is used in industrial freezer systems to:', a: ['Keep compression ratios in a manageable range and reduce discharge temperature at very low suction pressures', 'Meet OSHA redundancy requirements for ammonia systems', 'Reduce the amount of ammonia refrigerant required', 'Allow both ammonia and CO2 to operate in the same system circuit'], correct: 0, exp: 'At −40°F suction, single-stage compression ratios exceed 8:1, causing excessive discharge temperatures and poor efficiency. Two-stage limits each stage to 3:1–4:1, improving both efficiency and reliability.' },
      { q: 'The ammonia IDLH is:', a: ['300 ppm', '25 ppm', '50 ppm', '1,000 ppm'], correct: 0, exp: '300 ppm is the OSHA IDLH for ammonia. The PEL-TWA is 25 ppm. SCBA is required above 25 ppm for entry and mandatory for escape above 300 ppm.' },
      { q: 'CO2 (R-744) has a GWP of:', a: ['1 — the reference value for all refrigerant GWP comparisons', '0 — natural gases have zero GWP', '11 — slightly above zero but well below HFCs', '3,922 — the same as R-404A'], correct: 0, exp: 'GWP is defined relative to CO2, making CO2\'s GWP exactly 1 by definition. All other refrigerants are compared to this benchmark.' },
      { q: 'CO2 cascade systems use CO2 on the low side because:', a: ['CO2\'s high pressures are more manageable at low evaporating temperatures where the pressure differential is smaller', 'CO2 has the highest latent heat of any refrigerant, making it ideal for the coldest stage', 'Low-side equipment is cheaper and can tolerate CO2\'s corrosive properties', 'Regulatory requirements mandate CO2 for all low-temperature refrigeration below −20°F'], correct: 0, exp: 'The low side of a cascade system operates at lower temperatures where CO2 pressures are more reasonable. The high side uses ammonia or an HFC, which is better suited for condensing at ambient temperatures.' },
      { q: 'Transcritical CO2 systems differ from subcritical CO2 systems because:', a: ['They operate above the critical point (87.8°F / 1,070 psig) and use a gas cooler instead of a condenser', 'They use two stages of CO2 compression with an intercooler between them', 'They operate at lower pressures than subcritical systems and require special low-pressure vessels', 'They must be cascaded with an HFC system — standalone transcritical CO2 is not possible'], correct: 0, exp: 'Above the critical point, CO2 cannot condense in the traditional sense. A gas cooler removes heat from supercritical CO2 vapor, and flash tank/ejector systems recover efficiency.' },
      { q: 'The EPA AIM Act affects HFC refrigerants used in industrial refrigeration by:', a: ['Requiring an 85% reduction in HFC production and import by 2036, accelerating transition to lower-GWP alternatives', 'Banning all HFCs immediately and requiring immediate conversion to ammonia', 'Requiring annual reporting of HFC usage above 50 lbs', 'Mandating all new industrial refrigeration systems use CO2 exclusively'], correct: 0, exp: 'The AIM Act phases down HFC production and import by 85% by 2036, driving food processing and cold storage facilities to transition from R-404A/R-507A to lower-GWP alternatives (HFOs, ammonia, CO2).' },
    ],
  },

  {
    id: 'ir-ammonia-safety',
    num: 3,
    title: 'Ammonia Safety — PPE, Emergency Response, and Process Safety',
    desc: 'Ammonia toxicology, PPE selection and donning, OSHA PSM requirements, emergency shutdown procedures, evacuation, and first response to a release — the life-safety foundation of the trade.',
    slides: [
      {
        title: 'Ammonia Toxicology and Exposure Limits',
        body: [
          'Ammonia is a colorless gas with a pungent, distinctive odor. The human nose detects ammonia at 5–20 ppm — well below the OSHA PEL-TWA of 25 ppm. This makes odor a useful early warning but NOT a reliable safety system. The odor detection threshold is 5 ppm; however, olfactory fatigue (the nose "going nose-blind") can occur at concentrations above 100 ppm, causing you to stop smelling a gas that is still present and increasing. Never rely on odor alone to assess ammonia concentration.',
          'Exposure limits: OSHA PEL-TWA = 25 ppm (8-hour average). ACGIH TLV-STEL (Short-Term Exposure Limit) = 25 ppm for 15 minutes. NIOSH IDLH = 300 ppm. At 300 ppm, immediate evacuation with SCBA is required. At 500 ppm, severe lung damage can occur within 30 minutes. At 1,700 ppm, even brief exposure is fatal. At 2,132–2,982 ppm, the concentration becomes flammable (though ignition of ammonia vapor in air requires significant energy due to its high lower flammable limit).',
          'Health effects of ammonia exposure: ammonia is a highly water-soluble alkaline gas. It reacts with moisture in the eyes, nose, throat, and lungs to form ammonium hydroxide, a caustic compound. Low-level exposure (25–100 ppm) causes eye and respiratory irritation, tearing, and coughing. Moderate exposure (100–300 ppm) causes chemical conjunctivitis, throat burning, and chest tightness. High exposure (300+ ppm) causes chemical burns to the respiratory tract, pulmonary edema (fluid in the lungs), and can be rapidly fatal. Skin contact with liquid ammonia causes frostbite in addition to chemical burns.',
          'First aid for exposure: eye or skin contact with ammonia — flush with large amounts of water for 15–20 minutes continuously. Remove contaminated clothing while flushing (except where clothing is frozen to skin). Inhalation exposure — remove from contaminated area immediately. Administer oxygen if available and the rescuer is trained. Seek medical attention for any significant exposure. Do NOT enter a contaminated area without proper PPE to rescue an incapacitated worker — you will become a second victim.',
        ],
        keyPoints: [
          'OSHA PEL-TWA: 25 ppm (8-hour). IDLH: 300 ppm — SCBA required for entry above 25 ppm',
          'Olfactory fatigue above ~100 ppm — odor is NOT a reliable safety measure above initial detection',
          'Ammonia is alkaline and water-soluble — reacts with moisture in eyes/airways to form caustic ammonium hydroxide',
          'First aid: 15–20 minutes continuous water flush for eye/skin; remove from area for inhalation; do not enter without PPE to rescue',
        ],
        quiz: [
          {
            q: 'An operator reports "I can\'t smell the ammonia anymore but the detector still reads 150 ppm." This most likely indicates:',
            a: ['Olfactory fatigue — the nose has become desensitized to the smell at elevated concentrations', 'The detector is malfunctioning — if there is no smell, there is no ammonia present', 'A different gas is present — ammonia is always detectable by smell at 150 ppm', 'The operator has a natural insensitivity to ammonia odor'],
            correct: 0,
            exp: 'Olfactory fatigue causes the sense of smell to diminish or disappear at elevated ammonia concentrations. An operator who can no longer smell ammonia may still be in a dangerous concentration. Always trust the detector over your nose.',
          },
          {
            q: 'Ammonia causes respiratory damage because it:',
            a: ['Is highly water-soluble and alkaline — it dissolves in airway moisture to form caustic ammonium hydroxide', 'Displaces oxygen in the lungs — ammonia is heavier than oxygen and settles in alveoli', 'Is an asphyxiant — it chemically binds to hemoglobin and prevents oxygen transport', 'Is only damaging at concentrations above 1,000 ppm — low-level exposure causes no respiratory harm'],
            correct: 0,
            exp: 'Ammonia\'s high water solubility causes it to dissolve immediately in airway moisture to form ammonium hydroxide, which is caustic and burns the respiratory epithelium. This is why even moderate exposures cause chest tightness and throat burning.',
          },
          {
            q: 'Someone covered in liquid ammonia (from a hose or vessel) must be decontaminated by:',
            a: ['Continuous water flushing for 15–20 minutes — removing contaminated clothing while flushing (unless frozen to skin)', 'Neutralizing the ammonia with a mild acid solution before water rinsing', 'Dry wiping the skin to absorb the liquid before any water contact', 'Soap and water wash only — water alone is ineffective for liquid ammonia exposure'],
            correct: 0,
            exp: 'Water dilution and removal is the correct first aid — 15–20 continuous minutes. Acid neutralization is inappropriate and dangerous. Soap and water or dry wiping alone are insufficient.',
          },
        ],
      },
      {
        title: 'PPE Selection and Donning for Ammonia Work',
        body: [
          'PPE for ammonia work is selected based on the potential exposure level. Routine machine room entry (system operating normally): chemical splash goggles (not safety glasses — ammonia vapors can still reach the eyes over safety glasses), and chemical-resistant gloves. For any maintenance where ammonia may be released or where you are working in concentrations above 25 ppm: supplied-air respirator or SCBA, full face piece, chemical splash suit or impervious apron, chemical-resistant gloves and boots.',
          'SCBA (Self-Contained Breathing Apparatus) types used for ammonia: open-circuit SCBA carries compressed air in a cylinder worn on the back (30–60 minute duration depending on cylinder size and work rate). This is the standard for emergency response and entry above the IDLH. Supplied-air respirator (SAR/airline respirator) provides air through a hose connected to a remote air source — allows longer duration than SCBA but limits mobility. For IDLH atmospheres, a SAR with SCBA escape backup is required by OSHA.',
          'Donning SCBA correctly: conduct a positive-pressure and negative-pressure fit check before entering a contaminated atmosphere. Positive pressure check: cover the exhalation valve and exhale gently — the mask should pressurize and hold. Negative pressure check: cover the inhalation valve and inhale gently — the mask should collapse against the face. Any seal failure means the SCBA is not properly fitted and will not protect against IDLH concentrations. Facial hair in the seal area prevents a proper seal — OSHA requires SCBA wearers to be clean-shaven in the seal area.',
          'Emergency escape hoods (escape respirators): for non-routine escape scenarios, some facilities provide escape hoods (EEBDs — Emergency Escape Breathing Devices) at strategic locations throughout the facility. These are not for rescue or entry — they provide 10–15 minutes of protection for a worker to escape from a contaminated area. Every employee who might need to use one must be trained before the emergency, not during it.',
        ],
        keyPoints: [
          'Routine entry: chemical splash goggles + chemical-resistant gloves minimum — safety glasses alone are insufficient',
          'Above 25 ppm (IDLH-entry work): full SCBA or SAR with SCBA escape backup — full face piece required',
          'SCBA donning: positive-pressure fit check (exhale with exhalation valve covered) + negative-pressure check (inhale with inhalation valve covered)',
          'Facial hair in the SCBA seal area invalidates the seal — clean-shaven in seal area is an OSHA requirement for respirator users',
        ],
        quiz: [
          {
            q: 'An operator doing routine machine room rounds (no abnormal conditions) should wear at minimum:',
            a: ['Chemical splash goggles and chemical-resistant gloves — safety glasses do not adequately protect the eyes from ammonia vapor', 'SCBA — all machine room entry requires supplied air regardless of conditions', 'Safety glasses and standard work gloves — the same PPE used anywhere in the facility', 'No PPE is required for routine rounds if the system is operating normally'],
            correct: 0,
            exp: 'Chemical splash goggles (sealed to the face) are required for machine room entry because ammonia vapor can reach the eyes over or around safety glasses. Gloves protect against incidental contact with fittings that may carry ammonia residue.',
          },
          {
            q: 'A proper SCBA positive-pressure fit check involves:',
            a: ['Covering the exhalation valve and exhaling gently — the mask should pressurize and hold without leaking', 'Putting the mask on and breathing normally for 30 seconds to check comfort', 'Covering the inhalation valve and inhaling to see if the mask collapses', 'Spraying ammonia at the mask seal area and checking for odor'],
            correct: 0,
            exp: 'The positive-pressure check: cover the exhalation valve, exhale gently — the mask should pressurize and hold. A pressure drop indicates a seal leak. The negative-pressure check is separate: cover the inhalation valve, inhale gently — the mask should collapse against the face.',
          },
          {
            q: 'Emergency escape hoods (EEBDs) placed throughout an ammonia facility are intended for:',
            a: ['Allowing workers to escape from a contaminated area — not for rescue entry or extended work in ammonia atmospheres', 'Providing 60 minutes of air supply for rescue teams responding to a release', 'Serving as a backup to SCBA during normal maintenance operations', 'Any worker who forgets their SCBA — EEBDs are an acceptable substitute for SCBA at any time'],
            correct: 0,
            exp: 'EEBDs provide 10–15 minutes of air for escape only. They are not rated for entry into or work in IDLH atmospheres. Workers must be trained before an emergency — not during one.',
          },
        ],
      },
      {
        title: 'Emergency Procedures and Process Safety Management',
        body: [
          'Emergency response to an ammonia release follows a clear sequence: (1) Sound the alarm / activate the building notification system. (2) Evacuate all personnel not trained in emergency response. (3) Account for all personnel at the muster point. (4) Identify trained responders with proper PPE and SCBA. (5) Emergency shutdown if required and safe to do from outside the affected area. (6) Notify the fire department, LEPC (Local Emergency Planning Committee), and if required, report to the EPA and OSHA National Response Center. (7) If the leak can be isolated safely by qualified personnel, do so — otherwise contain the perimeter and let the fire department take over.',
          'Emergency shutdown (ESD) for industrial refrigeration: the machine room must have an ESD panel or button accessible from outside the room that stops compressors and activates emergency ventilation. Modern systems also have ESD actions for: closing solenoid valves on liquid feed to isolate sections of the system, closing discharge gas valves, and sounding the facility alarm. Knowing the ESD system for your specific facility is part of PSM operator training.',
          'OSHA PSM (29 CFR 1910.119) elements that operators interact with daily: (1) Process Safety Information (PSI) — the written documentation of the system design, P&ID drawings, safety data sheets; operators must know where this is. (2) Operating Procedures — written step-by-step procedures for startup, normal operation, shutdown, and emergency operations; operators must follow them. (3) Mechanical Integrity Program — the documented inspection and testing schedule for pressure vessels, safety relief valves, detectors, and systems; operators often perform or witness this testing. (4) Incident Investigation — any release, near-miss, or abnormal event must be investigated and documented; operators submit initial reports.',
          'Safety relief valves (SRVs) are the last line of defense against vessel overpressure. Each pressure vessel in an ammonia system has one or more SRVs set to open before the vessel MAWP (Maximum Allowable Working Pressure) is exceeded. SRVs are required by ASME code and must be tested and recertified on a defined schedule (typically every 5 years). SRVs on ammonia systems discharge to a safe location — never to atmosphere inside the machine room. Most systems route SRV discharge to a water tank (diffusion tank) or vent stack above the roof.',
        ],
        keyPoints: [
          'Emergency release response: alarm → evacuate → account for personnel → trained responders with SCBA → ESD → notify authorities',
          'ESD panel must be accessible outside the machine room — stops compressors, activates emergency ventilation, closes solenoid valves',
          'PSM elements operators work with: Process Safety Information, Operating Procedures, Mechanical Integrity Program, Incident Investigation',
          'SRVs discharge to diffusion tank or vent stack — NEVER to atmosphere inside the machine room',
        ],
        quiz: [
          {
            q: 'During an ammonia release, the correct first action for a worker without emergency response training is:',
            a: ['Activate the alarm and evacuate to the designated muster point — do not re-enter without authorization', 'Return to the machine room to manually shut off compressors', 'Find and don available PPE before evacuating to better assist in the response', 'Call 911 before activating the facility alarm'],
            correct: 0,
            exp: 'Non-responders must evacuate immediately. Attempting to perform emergency actions without training and PPE results in additional casualties. Sound the alarm as you leave and proceed to the muster point for personnel accountability.',
          },
          {
            q: 'The Emergency Shutdown (ESD) panel for an ammonia machine room must be located:',
            a: ['Outside the machine room — so personnel can initiate shutdown without entering a contaminated area', 'Inside the machine room near the main compressor control panel for fastest access', 'In the facility\'s main electrical room — centralized control for all building systems', 'Adjacent to the evaporative condenser on the roof'],
            correct: 0,
            exp: 'The ESD must be accessible from outside the machine room. If the room is contaminated, personnel cannot enter to activate an interior shutdown without proper PPE and SCBA — the exterior ESD allows safe shutdown.',
          },
          {
            q: 'Safety relief valves (SRVs) on ammonia vessels discharge to:',
            a: ['A water diffusion tank or a vent stack above the roof — never directly to the machine room atmosphere', 'The suction side of the compressor to recover the refrigerant', 'Directly to atmosphere inside the machine room — the ventilation system handles any release', 'A refrigerant recovery cylinder when the SRV activates'],
            correct: 0,
            exp: 'Discharging an SRV into the machine room would immediately create a hazardous concentration. SRVs must discharge to a safe location — either a water diffusion tank that absorbs the ammonia, or a vent stack that carries it above roof level and away from air intakes.',
          },
        ],
      },
    ],
    test: [
      { q: 'The OSHA PEL-TWA for ammonia is:', a: ['25 ppm (8-hour time-weighted average)', '300 ppm (IDLH)', '5 ppm (odor detection threshold)', '50 ppm (STEL for 15 minutes)'], correct: 0, exp: 'The OSHA PEL-TWA for ammonia is 25 ppm. Above this level, SCBA is required for entry. The NIOSH IDLH is 300 ppm.' },
      { q: 'Olfactory fatigue means:', a: ['The nose stops detecting ammonia at elevated concentrations — the smell disappears even though gas is present', 'Ammonia permanently damages the sense of smell at any concentration above the PEL', 'Workers develop an immunity to ammonia odor after years of exposure', 'The ammonia detector reads falsely low after extended exposure to elevated concentrations'], correct: 0, exp: 'Olfactory fatigue causes the sense of smell to diminish or disappear at elevated concentrations. Never rely on odor alone — always trust a calibrated detector.' },
      { q: 'Ammonia causes respiratory injury because it:', a: ['Dissolves in airway moisture to form caustic ammonium hydroxide', 'Is an asphyxiant that displaces oxygen', 'Chemically bonds to hemoglobin and prevents oxygen transport', 'Freezes airway tissue at typical release temperatures'], correct: 0, exp: 'Ammonia is alkaline and highly water-soluble. It dissolves in the moisture of the eyes, throat, and airways to form ammonium hydroxide, which burns and damages tissue.' },
      { q: 'First aid for liquid ammonia on the skin requires:', a: ['Continuous water flushing for 15–20 minutes — remove clothing while flushing unless frozen to skin', 'Acid neutralization before water rinsing', 'Dry absorption to remove the liquid before flushing', 'Soap and water only — plain water dilutes without removing the ammonia'], correct: 0, exp: '15–20 minutes of continuous water flushing removes and dilutes ammonia from the skin. Acid neutralization is dangerous and contraindicated. Clothing must be removed except where it is frozen to skin.' },
      { q: 'Minimum PPE for routine ammonia machine room entry is:', a: ['Chemical splash goggles and chemical-resistant gloves', 'Safety glasses and standard work gloves', 'SCBA and full chemical suit', 'No specific PPE if the system is operating normally'], correct: 0, exp: 'Chemical splash goggles (sealed to the face) protect the eyes from vapor that safety glasses cannot block. Chemical-resistant gloves protect hands from incidental contact.' },
      { q: 'A valid SCBA positive-pressure fit check confirms:', a: ['The mask seals against the face when the exhalation valve is covered and the wearer exhales gently', 'The air cylinder is full before entry', 'The mask does not fog during normal breathing', 'The mask collapses against the face when the inhalation valve is covered'], correct: 0, exp: 'The positive-pressure fit check: cover the exhalation valve, exhale gently — the mask should pressurize without leaking. This is distinct from the negative-pressure check (cover inhalation valve, inhale gently — mask should collapse against face).' },
      { q: 'Emergency Escape Breathing Devices (EEBDs) in an ammonia facility are intended for:', a: ['Worker escape only — not for rescue entry or extended work', 'Rescue teams entering the machine room after a release', 'Any worker who needs supplemental air for maintenance work', 'Backup protection for SCBA-equipped responders'], correct: 0, exp: 'EEBDs provide 10–15 minutes of protection for escape only. They are NOT approved for rescue entry or maintenance work. Training on EEBDs must happen before an emergency.' },
      { q: 'During an ammonia release, the first action for a non-responder is:', a: ['Activate the alarm and evacuate to the muster point for personnel accountability', 'Don PPE from the nearest storage cabinet', 'Return to the machine room to shut down the compressors', 'Call 911 first, then evacuate'], correct: 0, exp: 'Non-responders must alarm and evacuate immediately. Accountability at the muster point allows responders to confirm all personnel are out before entry.' },
      { q: 'The OSHA PSM Mechanical Integrity element requires:', a: ['Documented inspection and testing schedules for pressure vessels, SRVs, detectors, and safety systems', 'A written evacuation plan for all scenarios above 25 ppm', 'Daily operator rounds with signed logbook entries only', 'Annual third-party audit of all ammonia system piping'], correct: 0, exp: 'Mechanical Integrity under PSM covers pressure vessel inspections, SRV testing, safety system testing (detectors, alarms), and piping inspection — all on documented schedules.' },
      { q: 'Safety relief valves (SRVs) on ammonia vessels must discharge to:', a: ['A water diffusion tank or vent stack above the roof — never inside the machine room', 'The low-pressure suction side of the system to recover refrigerant', 'The atmosphere above the cooling tower', 'A refrigerant recovery unit adjacent to the vessel'], correct: 0, exp: 'Discharging to the machine room interior creates an immediate hazardous atmosphere. SRVs must discharge to a water diffusion tank or safely elevated vent stack.' },
    ],
  },

  {
    id: 'ir-compressors',
    num: 4,
    title: 'Industrial Compressors — Types, Operation, and Maintenance',
    desc: 'Reciprocating, screw, and centrifugal compressors at industrial scale — capacity control, oil systems, vibration, seal maintenance, and how to spot compressor faults before they become failures.',
    slides: [
      {
        title: 'Reciprocating and Screw Compressors',
        body: [
          'Reciprocating compressors (piston compressors) use pistons driven by a crankshaft to compress refrigerant vapor. They are the oldest and most widely understood compressor type in industrial refrigeration. Characteristics: excellent efficiency at high compression ratios and low suction pressures, very tolerant of wet operation (some liquid carryover), available in single- and multi-cylinder configurations, and mechanically robust but with more moving parts than screw compressors (valves, pistons, rods, crossheads). Common industrial sizes: 50–1,500 HP.',
          'Screw compressors (rotary screw) use two helical rotors — a male and female rotor — that mesh together to progressively compress refrigerant vapor as gas is trapped between rotor profiles and moved from the suction side to the discharge. Characteristics: fewer moving parts than reciprocating (no valves, no pistons), smooth continuous flow with less vibration, very reliable and low maintenance in the long run, but more sensitive to liquid slugging than reciprocating compressors. Modern screw compressors include variable Vi (Volume Index) — internally adjustable slide valve that changes the built-in compression ratio to match system conditions. Available in a wide range from 50–3,000+ HP.',
          'Capacity control: both compressor types have capacity control mechanisms to match refrigerating capacity to the load. Reciprocating compressors use cylinder unloaders — pneumatically or electrically actuated lifter valves that hold the suction valve open during compression, preventing that cylinder from contributing. Unloaders allow capacity to be stepped (e.g., 100%/75%/50%/25%). Screw compressors use a slide valve — a bypass mechanism that reduces the effective rotor length, allowing infinitely variable capacity from typically 25% to 100%.',
          'Oil systems for industrial compressors: industrial refrigeration compressors require lubrication of bearings and, in screw compressors, oil injection into the rotors for sealing and cooling. The oil system includes an oil separator (separates oil from discharge gas), oil reservoir, oil pump (for positive-displacement supply), oil filter, and oil cooler. Oil contamination in the refrigerant circuit reduces heat transfer in evaporators and increases system energy consumption. Oil management is one of the most important maintenance activities in an industrial refrigeration system.',
        ],
        keyPoints: [
          'Reciprocating: pistons on crankshaft, excellent at high compression ratios, tolerant of liquid, many moving parts',
          'Screw: helical rotors, continuous flow, fewer moving parts, more sensitive to liquid — variable Vi and slide valve capacity control',
          'Capacity control: unloaders (reciprocating, stepped) vs slide valve (screw, variable)',
          'Oil systems: separator → reservoir → pump → filter → cooler — oil in the refrigerant reduces evaporator efficiency',
        ],
        quiz: [
          {
            q: 'The slide valve on a screw compressor provides:',
            a: ['Infinitely variable capacity control from typically 25% to 100% by changing the effective length of the rotor compression path', 'On/off control only — the slide valve is fully open or fully closed', 'Stepped capacity in 25% increments — the same as unloaders on a reciprocating compressor', 'Compression ratio adjustment — the slide valve changes discharge pressure independently of suction pressure'],
            correct: 0,
            exp: 'The slide valve bypasses a portion of the rotor length, reducing the effective compression path. This provides continuously variable capacity (not stepped like unloaders) from minimum to maximum load.',
          },
          {
            q: 'Oil contamination in a refrigeration system evaporator will cause:',
            a: ['Reduced heat transfer — oil coats heat transfer surfaces and insulates them from the refrigerant', 'Improved heat transfer — oil increases the heat capacity of the refrigerant-oil mixture', 'No effect on evaporator performance — oil stays in solution and does not affect heat transfer', 'Higher evaporating temperature — oil raises the boiling point of the refrigerant mixture'],
            correct: 0,
            exp: 'Oil coating on evaporator tubes acts as an insulator, reducing heat transfer from the refrigerated space to the refrigerant. This increases energy consumption and reduces system capacity.',
          },
          {
            q: 'Cylinder unloaders on a reciprocating compressor:',
            a: ['Hold the suction valve open during compression, preventing that cylinder from doing work — reducing capacity in steps', 'Unload the crankshaft by reducing speed during low-load conditions', 'Bypass discharge gas back to suction during light-load operation', 'Are only used during startup to reduce motor load — they disengage when the compressor reaches full speed'],
            correct: 0,
            exp: 'Unloaders hold suction valves open, so the cylinder draws vapor but does not compress it — the gas simply flows back out the suction valve on the compression stroke. This removes that cylinder\'s contribution to compressor capacity.',
          },
        ],
      },
      {
        title: 'Oil Management, Seals, and Startup Procedures',
        body: [
          'Oil management is one of the most critical and most often neglected aspects of industrial refrigeration maintenance. Ammonia and most compressor oils are not miscible — they do not mix well and tend to separate. Oil migrates through the system and accumulates in evaporators, vessels, and low points in the piping. An oil accumulation of 1/8 inch in an evaporator tube reduces heat transfer by approximately 20%. Regular oil recovery (draining oil from low-side receivers, evaporators, and oil pots) is an essential routine task.',
          'Oil analysis: periodic oil sampling from the compressor crankcase or oil separator identifies degradation before it becomes a problem. Key oil analysis parameters: viscosity (should match specification — viscosity change indicates contamination or thermal breakdown), acid number (increased acid number indicates refrigerant breakdown products — a sign of moisture ingress or overheating), particulate count (metal particles indicate wear), and water content. Most industrial refrigeration oil suppliers provide mail-in analysis kits.',
          'Shaft seals (mechanical seals): compressor shafts that extend outside the compressor body require shaft seals to prevent refrigerant and oil from leaking along the shaft. Industrial compressors use mechanical face seals — a rotating seal ring presses against a stationary seat, with a very small film of oil providing the sealing interface. Mechanical seal failures are a common source of refrigerant leaks. Warning signs: oil weeping at the shaft, refrigerant odor at the seal area, increasing ammonia detector readings in the area of the seal.',
          'Compressor startup procedure (general sequence): (1) Verify oil level and pressure. (2) Verify cooling water or refrigerant cooling to the oil cooler is flowing. (3) Open suction and discharge service valves (if manual). (4) Verify suction superheat — start with at least 10°F of superheat to prevent liquid slugging. (5) Start the compressor at minimum capacity (unloaders loaded off / slide valve at minimum). (6) Monitor discharge temperature, suction and discharge pressure, oil pressure, and vibration in the first minutes of operation. (7) Load the compressor gradually as the system settles.',
        ],
        keyPoints: [
          '1/8 inch of oil in an evaporator tube reduces heat transfer ~20% — regular oil recovery from low points is essential',
          'Oil analysis: viscosity, acid number, particulate count, water content — periodic sampling before failure rather than after',
          'Shaft seal warning signs: oil weeping, refrigerant odor, ammonia detector increase near shaft — seal failure = refrigerant leak',
          'Startup: verify oil level/pressure, verify cooling flow, open valves, confirm suction superheat, start at minimum capacity, monitor',
        ],
        quiz: [
          {
            q: 'Oil accumulation of 1/8 inch in an evaporator tube reduces heat transfer by approximately:',
            a: ['20% — a significant efficiency loss that accumulates progressively if oil recovery is not performed', '5% — a minor effect that is within normal operating tolerance', '50% — oil is so insulating that even thin layers double the required compressor horsepower', 'No measurable effect — oil in a flooded evaporator mixes with refrigerant and does not coat surfaces'],
            correct: 0,
            exp: 'Oil acts as an insulator on heat transfer surfaces. A 1/8-inch oil film reduces heat transfer by approximately 20%. In a large system, this translates to significant additional compressor energy consumption and reduced capacity.',
          },
          {
            q: 'An increasing acid number in an oil analysis report indicates:',
            a: ['Refrigerant breakdown products or moisture contamination — a sign of overheating or water ingress requiring investigation', 'Normal oil aging — acid number always increases with operating hours', 'The oil is over-lubricated and should be partially drained', 'The compressor is operating at too high a compression ratio, producing acid from metal wear'],
            correct: 0,
            exp: 'Acid number increases when refrigerant decomposes in the oil (usually from overheating or moisture ingress). This is a warning sign — the root cause must be identified and corrected before compressor damage occurs.',
          },
          {
            q: 'Minimum suction superheat before starting a compressor should be at least:',
            a: ['10°F of superheat — to ensure only dry vapor enters the compressor and prevent liquid slugging at startup', '0°F — saturated suction is acceptable for startup since the compressor warms quickly', 'At least 30°F — higher superheat is always safer for compressor startup', 'Superheat is only checked after the compressor reaches full speed — it doesn\'t matter at startup'],
            correct: 0,
            exp: 'Liquid slugging at startup is one of the most damaging events for a compressor. Starting with at least 10°F of superheat confirms only vapor is entering the compressor suction, preventing hydraulic damage to valves and pistons.',
          },
        ],
      },
      {
        title: 'Vibration, Fault Detection, and Preventive Maintenance',
        body: [
          'Vibration monitoring is the most powerful early warning tool for industrial compressor health. Every rotating machine produces a characteristic vibration signature. Changes in that signature — increases in overall vibration level, appearance of new frequency components — indicate developing faults. Common vibration-related faults: imbalance (rotating parts are not in balance, visible at 1× running speed), misalignment (coupling or shaft misalignment, visible at 2× running speed and axial vibration), bearing damage (produces high-frequency vibration components that appear before the bearing fails catastrophically).',
          'Vibration severity standards: ISO 10816 provides guidelines for evaluating vibration severity in industrial machinery. For a typical industrial refrigeration compressor mounted rigidly, an overall vibration velocity above 0.4 in/s RMS is typically reason for investigation; above 0.7 in/s, plan for maintenance at the next available window; above 1.1 in/s, immediate investigation is warranted. Trending is more important than absolute values — a compressor that increases from 0.2 to 0.6 in/s RMS over three months is telling you something is developing.',
          'Discharge temperature monitoring: high discharge temperature is the most universal indicator of compressor problems. Normal discharge temperature for an ammonia screw compressor with oil cooling is typically 200–230°F (93–110°C). Warning at 240°F; Alarm at 250°F; Shutdown at 260°F (130°C) in typical settings. High discharge temperature causes: excessive compression ratio (system problem), liquid floodback insufficient superheat, oil cooling failure, discharge valve leakage (for reciprocating), or excessive slide valve loading at startup.',
          'Preventive maintenance schedule elements for industrial compressors: daily — review operating log (suction/discharge pressure, discharge temperature, oil pressure, oil level, vibration); weekly — check oil level, inspect for oil or refrigerant leaks, review trending data; monthly — oil sample for analysis; annually — inspect coupling, clean oil strainer/filter, test safety controls (HP cutout, oil pressure safety), inspect shaft seal; major overhaul (per manufacturer\'s hours) — bearing replacement, valve inspection (reciprocating), rotor clearance check (screw).',
        ],
        keyPoints: [
          'Vibration monitoring: trending changes are more important than absolute levels — watch for 1× (imbalance), 2× (misalignment), high-frequency (bearing)',
          'ISO 10816: >0.4 in/s investigate, >0.7 in/s plan maintenance, >1.1 in/s immediate action',
          'Discharge temperature: normal ~200–230°F for oil-cooled screw; warning 240°F, alarm 250°F, shutdown 260°F',
          'PM schedule: daily log, weekly oil/leak check, monthly oil sample, annual controls testing, overhaul per manufacturer hours',
        ],
        quiz: [
          {
            q: 'A vibration reading that was 0.2 in/s RMS three months ago and is now 0.6 in/s RMS indicates:',
            a: ['A developing fault that warrants investigation even though absolute level may be within some limits — trend is the key indicator', 'Normal variation — vibration changes of 3× are expected over a compressor\'s operating life', 'The compressor needs immediate emergency shutdown — any increase above 0.5 in/s is critical', 'The measurement is likely a sensor error — a 3× increase over 3 months is not physically possible'],
            correct: 0,
            exp: 'Trending is more diagnostic than absolute values. A 3× increase over 3 months indicates a developing fault — bearing degradation, increasing misalignment, or another mechanical issue. Investigate the root cause before it becomes a failure.',
          },
          {
            q: 'High discharge temperature on an oil-cooled screw compressor above 250°F indicates:',
            a: ['An alarm condition requiring investigation — possible causes include oil cooling failure, excessive compression ratio, or insufficient suction superheat', 'Normal operation — screw compressors run hot at full capacity', 'Immediate shutdown is required — 250°F causes catastrophic bearing failure within minutes', 'The oil temperature sensor is faulty — discharge temperatures above 240°F are impossible on modern screw compressors'],
            correct: 0,
            exp: 'Normal oil-cooled screw discharge is 200–230°F. 250°F is typically the alarm setpoint. Above this, investigate oil cooling, system conditions, and valve integrity before the compressor reaches shutdown temperature.',
          },
          {
            q: 'Vibration at 2× running speed (twice the shaft RPM) most commonly indicates:',
            a: ['Shaft or coupling misalignment — misalignment produces vibration at twice the rotational frequency', 'Mass imbalance of a rotating component', 'Rolling element bearing damage', 'Discharge valve leakage on a reciprocating compressor'],
            correct: 0,
            exp: '2× running speed vibration is the classic signature of misalignment. 1× = imbalance. High-frequency components = bearing defects. Discharge valve leakage produces irregular waveforms at the valve frequency.',
          },
        ],
      },
    ],
    test: [
      { q: 'The slide valve on a screw compressor controls:', a: ['Capacity continuously from ~25% to 100% by changing the effective rotor compression length', 'On/off operation only', 'Discharge pressure independently of suction conditions', 'Volume Index (Vi) — the built-in compression ratio'], correct: 0, exp: 'The slide valve bypasses a variable portion of the rotor length, providing continuous (not stepped) capacity modulation.' },
      { q: 'Cylinder unloaders on a reciprocating compressor reduce capacity by:', a: ['Holding suction valves open during compression so the cylinder does no compression work', 'Reducing crankshaft speed via a variable frequency drive', 'Bypassing discharge gas back to the suction manifold', 'Reducing the piston stroke length'], correct: 0, exp: 'Unloaders hold suction valves open — gas that is drawn in just flows back out during the compression stroke. The cylinder uses no net energy and provides no refrigerating effect.' },
      { q: 'Oil contamination of 1/8 inch in an evaporator tube:', a: ['Reduces heat transfer by approximately 20%', 'Has no measurable effect on heat transfer', 'Reduces heat transfer by 5% — within operating tolerance', 'Improves heat transfer by adding a thermal contact layer'], correct: 0, exp: '1/8-inch oil film ≈ 20% reduction in evaporator heat transfer. Regular oil recovery from low-side vessels and low points is essential maintenance.' },
      { q: 'The correct first step when starting an industrial compressor is to verify:', a: ['Oil level and oil pressure are correct before energizing the motor', 'Suction superheat first — oil level is checked after the first startup cycle', 'The discharge valve is closed — compression occurs before the valve is opened', 'Refrigerant charge weight against the design spec'], correct: 0, exp: 'Oil level and pressure must be verified before start. A compressor that starts with low oil pressure or an empty crankcase will experience catastrophic bearing failure within seconds.' },
      { q: 'A vibration trending from 0.2 to 0.6 in/s RMS over 3 months indicates:', a: ['A developing mechanical fault requiring investigation', 'Normal operating variation within acceptable limits', 'Immediate shutdown is required', 'A calibration error in the vibration sensor'], correct: 0, exp: 'A 3× increase in vibration over 3 months is significant trending. ISO 10816 suggests investigation above 0.4 in/s for rigid-mounted machines — and the rate of change is equally important.' },
      { q: 'High discharge temperature on a screw compressor can be caused by:', a: ['Oil cooling failure, excessive compression ratio, or insufficient suction superheat', 'Low suction pressure only', 'Compressor running at minimum load with the slide valve fully retracted', 'Condenser pressure that is too low'], correct: 0, exp: 'High discharge temperature has multiple causes: inadequate oil cooling, high compression ratio from high condensing or low suction pressure, or insufficient superheat causing heat of compression to be excessive.' },
      { q: 'An increasing acid number in compressor oil analysis indicates:', a: ['Moisture ingress or overheating causing refrigerant to decompose in the oil', 'Normal aging — acid number always rises with operating hours within normal range', 'The oil should be topped off — acid dilution restores the number', 'The compressor is operating at ideal conditions — acid number increases with efficiency'], correct: 0, exp: 'Acid number increases indicate refrigerant breakdown products in the oil, usually from moisture contamination or overheating. The root cause must be corrected before compressor damage occurs.' },
      { q: 'Shaft seal failure on a compressor manifests as:', a: ['Oil weeping at the shaft, refrigerant odor at the seal, and increasing ammonia detector readings', 'High discharge temperature', 'Low oil pressure alarm', 'Suction pressure rising above normal'], correct: 0, exp: 'Mechanical shaft seal failure allows refrigerant and oil to escape along the shaft. Warning signs: oil weeping, ammonia smell at the shaft area, and gradual increase in ammonia detector readings near the compressor.' },
      { q: 'Vibration at 1× running speed most commonly indicates:', a: ['Mass imbalance of a rotating component', 'Shaft misalignment', 'Rolling element bearing damage', 'Discharge valve leakage'], correct: 0, exp: '1× = imbalance (rotating mass is off-center). 2× = misalignment. High-frequency = bearing defects. Knowing which frequency indicates which fault guides maintenance action.' },
      { q: 'During a compressor startup, the slide valve should be set to:', a: ['Minimum position — load the compressor gradually to avoid thermal shock and high current inrush', 'Maximum capacity — starting at full load prevents condensation in the oil', 'Exactly 50% — the balanced starting point per ISO standards', 'Whatever position it was in when last shut down — position is maintained through the off cycle'], correct: 0, exp: 'Starting at minimum slide valve position reduces the mechanical and electrical load during startup and allows a controlled ramp-up as the system reaches stable conditions.' },
    ],
  },

  {
    id: 'ir-condensers-evaporators',
    num: 5,
    title: 'Heat Rejection, Evaporators, and System Controls',
    desc: 'Evaporative condensers, cooling tower water treatment, flooded evaporators, hot gas defrost, liquid recirculation systems, and the control strategies that optimize industrial refrigeration efficiency.',
    slides: [
      {
        title: 'Evaporative Condensers and Heat Rejection',
        body: [
          'Industrial refrigeration systems reject heat primarily through evaporative condensers — heat exchangers where high-pressure ammonia vapor condenses inside coil tubes while water is sprayed over the outside of the coils and air is drawn through by fans. Heat removal occurs through both sensible cooling (air absorbs heat) and evaporative cooling (water evaporates, absorbing latent heat). Evaporative condensers are dramatically more efficient than air-cooled condensers because the leaving water wet-bulb temperature is lower than the ambient dry-bulb temperature.',
          'Condenser sizing is based on heat rejection duty, not on refrigerating capacity alone. The total heat of rejection = refrigerating capacity + heat of compression. For an ammonia system, the heat of rejection is approximately 20–25% more than the refrigerating capacity at a given set of conditions. Undersizing the condenser results in high condensing pressure, which increases compressor power consumption and can exceed the compressor\'s high-pressure cutout.',
          'Water treatment for evaporative condensers is critical. The evaporation process concentrates dissolved minerals in the recirculating water. Without treatment: scale (calcium carbonate deposits) builds on coil surfaces and reduces heat transfer; biological growth (including Legionella bacteria) develops in the warm, humid water; corrosion attacks the coil and basin materials. Water treatment program elements: chemical scale inhibitors, biocides (for Legionella control), corrosion inhibitors, and blowdown (controlled wasting of concentrated water and replacement with fresh makeup water). Many jurisdictions require Legionella water management plans for evaporative cooling towers and condensers.',
          'Winterization and freeze protection: evaporative condensers must be protected when ambient temperatures drop below freezing. Options: drain the water basin and transition to dry operation (using only fan airflow for heat rejection at reduced capacity), heat the basin with electric immersion heaters or steam coils, or use a glycol loop between the condenser and the refrigerant coil. Freezing water in the condenser coil or basin causes extensive damage.',
        ],
        keyPoints: [
          'Evaporative condensers: coil tubes with spray water + fans — both sensible and latent heat rejection; far more efficient than air-cooled',
          'Total heat rejection = refrigerating capacity + heat of compression (≈20–25% more than the cooling load)',
          'Water treatment: scale inhibitors, biocides (Legionella control), blowdown — Legionella water management plans required in many jurisdictions',
          'Winterization: drain basin for dry operation, heat the basin, or use a glycol loop — protect against freeze damage',
        ],
        quiz: [
          {
            q: 'An evaporative condenser is more efficient than an air-cooled condenser because:',
            a: ['It uses water evaporation to remove latent heat, allowing condensing to approach the ambient wet-bulb temperature rather than dry-bulb', 'It uses larger fans that move more air over the condenser coil', 'It adds refrigerant subcooling by flooding the coil with cold water', 'It is installed closer to the compressor, reducing refrigerant line pressure drop'],
            correct: 0,
            exp: 'Evaporative cooling allows heat rejection at conditions approaching the wet-bulb temperature, which is always lower than dry-bulb (sometimes dramatically so in dry climates). This means lower condensing pressure and less compressor work.',
          },
          {
            q: 'Legionella bacteria is a concern in evaporative condenser water systems because:',
            a: ['The warm, wet, nutrient-rich water provides ideal conditions for Legionella growth — which can be aerosolized by the fan system', 'Legionella contaminates refrigerant if it enters the condenser coil', 'Legionella causes scale buildup that reduces condenser heat transfer', 'Legionella is only a concern in potable water systems — cooling water systems are excluded'],
            correct: 0,
            exp: 'Evaporative condenser water is warm (68–85°F range), aerosolized by the fans, and recirculated — ideal conditions for Legionella proliferation. If Legionella-laden aerosols are inhaled, Legionnaires\' disease (a severe pneumonia) can result.',
          },
          {
            q: 'High condensing pressure (higher than design) in an industrial refrigeration system will cause:',
            a: ['Increased compressor power consumption and possible high-pressure cutout — resulting in higher energy costs and potential system shutdown', 'Lower compressor discharge temperature — high pressure means the gas is denser and cooler', 'Faster refrigeration of product — more pressure means more cooling capacity', 'Reduced condenser water treatment requirements — higher pressure dissolves scale'],
            correct: 0,
            exp: 'Compressor power consumption rises significantly with increasing condensing pressure. The pressure difference (lift) between suction and discharge directly drives compressor work. High condensing pressure can also trip the HP cutout, shutting down the system.',
          },
        ],
      },
      {
        title: 'Flooded Evaporators and Liquid Recirculation Systems',
        body: [
          'Industrial refrigeration evaporators are predominantly flooded — the refrigerant liquid level is maintained inside the evaporator, and heat exchange occurs with boiling liquid rather than expanding liquid from an expansion valve. Flooded evaporators have much higher heat transfer coefficients than DX (direct expansion) evaporators because the boiling liquid maintains continuous contact with the tube surfaces without the vapor blankets that occur in partially wetted DX coils.',
          'Pumped liquid recirculation (overfeed): to maintain a flooded condition and ensure the entire evaporator coil is wetted, liquid refrigerant is pumped from the low-pressure receiver to the evaporator at a recirculation rate of 2:1 to 4:1 (for every pound of refrigerant evaporated, 2–4 pounds of liquid are pumped to the coil). The unevaporated liquid returns to the low-pressure receiver. Low-pressure recirculation pumps (LPR pumps) are typically seal-less centrifugal pumps designed for low-temperature liquid ammonia or CO2.',
          'Defrost methods for low-temperature evaporators: product stored below 32°F causes moisture to freeze on the evaporator coil surfaces. Ice accumulation insulates the coil and reduces heat transfer — periodic defrost is required. Industrial defrost methods: hot gas defrost (most common) — hot high-pressure gas from the compressor discharge is diverted to the evaporator coil, melting ice from the inside out; electric defrost — electric resistance heaters in or around the coil; water defrost — water sprayed over the coil; air defrost — used only for coils operating just below 32°F in protected environments.',
          'Hot gas defrost control: the defrost cycle includes: pump down (close the liquid feed solenoid, allow the coil to pump out refrigerant); hot gas admission (open the hot gas solenoid, pressurize and heat the coil); defrost (coil remains on hot gas until a defrost termination thermostat or timer calls the end); equalization (purge hot gas before re-admitting cold liquid). Defrost cycles that are too long waste energy and may partially defrost stored product; too short, and ice bridges remain. Termination on temperature (detecting when the coil reaches a temperature above 32°F) is more reliable than timer termination alone.',
        ],
        keyPoints: [
          'Flooded evaporators: liquid level maintained inside coil, much higher heat transfer than DX — standard for industrial refrigeration',
          'Liquid recirculation: 2:1 to 4:1 recirculation rate ensures full coil wetting; LPR pumps return unevaporated liquid to the LP receiver',
          'Hot gas defrost: most common method — diverts compressor discharge gas to melt ice from inside the coil',
          'Defrost cycle: pump down → hot gas admission → defrost → equalization before re-admitting cold liquid',
        ],
        quiz: [
          {
            q: 'Flooded evaporators are preferred over DX (direct expansion) evaporators in industrial refrigeration because:',
            a: ['The liquid level maintained in the coil provides continuous boiling contact, yielding much higher heat transfer coefficients', 'Flooded systems use less refrigerant because liquid is metered more precisely', 'DX systems cannot be used with ammonia — flooded is the only safe configuration', 'Flooded evaporators operate at lower pressures, reducing compressor work'],
            correct: 0,
            exp: 'Boiling liquid contact with heat transfer surfaces is more efficient than the partially wetted surfaces in DX coils, where vapor blankets insulate portions of the coil from the refrigerant liquid.',
          },
          {
            q: 'A liquid recirculation rate of 4:1 means:',
            a: ['4 pounds of liquid are pumped to the evaporator for every 1 pound that evaporates — the 3 unevaporated pounds return to the receiver', '4 evaporators are served by one recirculation pump', 'The pump delivers 4 times the evaporating temperature differential needed for the load', 'The recirculation system operates at 400% of the refrigerant inventory per hour'],
            correct: 0,
            exp: '4:1 recirculation: for every pound of refrigerant evaporated in the coil, 4 pounds of liquid are pumped to the coil. 3 unevaporated pounds return to the low-pressure receiver, ensuring the coil stays fully flooded.',
          },
          {
            q: 'The pump-down step at the beginning of a hot gas defrost cycle serves to:',
            a: ['Remove liquid refrigerant from the evaporator coil before hot gas is admitted — liquid in the coil when hot gas is introduced can cause hydraulic shock', 'Stop the recirculation pump motor to prevent damage during defrost', 'Pre-heat the evaporator to reduce total defrost time', 'Equalize pressure across the hot gas solenoid before it opens'],
            correct: 0,
            exp: 'Hot gas admitted suddenly into a coil full of cold liquid refrigerant can cause hydraulic shock (liquid hammer) and pressure spikes. Pump-down evacuates the liquid before hot gas is introduced.',
          },
        ],
      },
      {
        title: 'System Controls and Energy Management',
        body: [
          'Modern industrial refrigeration systems are controlled by programmable logic controllers (PLCs) or dedicated refrigeration controllers (e.g., Heatcraft, Danfoss, Johnson Controls) that manage suction pressure setpoints, condensing pressure, defrost scheduling, alarm management, and energy optimization. The operator interface is typically a touchscreen HMI (Human Machine Interface) or SCADA system that shows system-wide pressures, temperatures, equipment status, and historical trends.',
          'Float control and expansion devices: flooded evaporators are fed through high-side float valves or low-side float valves that maintain the liquid level inside the evaporator or the low-pressure receiver. Float valves provide level-based liquid metering without the hunting and pressure disturbances of thermostatic expansion valves. For lower-cost applications, hand expansion valves (HEVs) allow manual adjustment of liquid feed, requiring an experienced operator to set and monitor.',
          'Suction pressure optimization (floating setpoint): a major energy management strategy. Instead of controlling suction pressure at a fixed setpoint regardless of conditions (e.g., always hold −25°F suction), a floating setpoint controller continuously looks for the highest possible suction pressure that still satisfies all running evaporators. When refrigeration load is low (cooler at setpoint, product properly cooled), the suction pressure can be raised — reducing the compression ratio and saving energy. Floating setpoint control can reduce compressor energy consumption by 10–20% in facilities with variable refrigeration loads.',
          'Condensing pressure reset (floating condensing): similarly, condensing pressure can be allowed to float downward as ambient wet-bulb temperature decreases. Rather than holding 175 psig on a cold night when the evaporative condenser could maintain 120 psig, floating condensing pressure saves compressor energy. Caution: some system components (float valves, hot gas defrost solenoids) have minimum operating pressure differences — floating too low causes operational problems. System-specific minimums must be programmed into the controller.',
        ],
        keyPoints: [
          'PLC/refrigeration controllers manage suction setpoint, condensing pressure, defrost, alarms — HMI/SCADA shows real-time trends',
          'Float valves: maintain liquid level in flooded evaporators — more stable than TXVs for industrial flooded systems',
          'Floating suction setpoint: raises suction pressure to the highest acceptable value — saves 10–20% on compressor energy during part-load',
          'Floating condensing: allows condensing pressure to drop at night/cool ambient — saves compressor energy but observe minimum ΔP requirements',
        ],
        quiz: [
          {
            q: 'A floating suction setpoint control strategy saves energy by:',
            a: ['Raising suction pressure to the highest level that satisfies all evaporators during part-load — reducing compressor lift and energy consumption', 'Lowering suction pressure during off-peak hours to pre-cool product faster', 'Varying the suction setpoint based on ambient temperature alone', 'Reducing the number of compressors running regardless of load requirements'],
            correct: 0,
            exp: 'Every degree (or psi) increase in suction pressure reduces compressor compression ratio and saves energy. Floating setpoint finds the highest allowable suction while still satisfying the coldest evaporator on the system.',
          },
          {
            q: 'A high-side float valve on an industrial refrigeration system maintains:',
            a: ['The liquid level in the high-pressure receiver or at the inlet of the evaporator, metering liquid flow into the low-pressure side', 'The discharge gas temperature at the compressor outlet', 'The liquid level in the low-pressure suction accumulator', 'The recirculation rate of the LPR pump system'],
            correct: 0,
            exp: 'High-side float valves sense the liquid level on the high-pressure side and open to feed liquid into the lower-pressure evaporator or low-pressure receiver when the level rises above the setpoint.',
          },
          {
            q: 'When setting minimum condensing pressure limits in a floating condensing control program, the primary concern is:',
            a: ['Maintaining sufficient pressure differential across float valves, hot gas solenoids, and other pressure-dependent devices', 'Preventing refrigerant from freezing at extremely low condensing pressures', 'Meeting OSHA minimum operating pressure requirements for ammonia systems', 'Preventing the condenser fans from overspeeding at low condensing pressure'],
            correct: 0,
            exp: 'Many system components require a minimum pressure differential to operate correctly — float valves need pressure to feed liquid, hot gas defrost solenoids need differential pressure to open reliably. Setting condensing pressure too low causes operational problems even though it would save energy.',
          },
        ],
      },
    ],
    test: [
      { q: 'Evaporative condensers are more efficient than air-cooled condensers because:', a: ['They cool refrigerant toward the ambient wet-bulb temperature through water evaporation — lower than dry-bulb temperature', 'They use larger fans that move more air across the coil', 'They add refrigerant subcooling by immersing the coil in cold water', 'They do not require fans — natural draft is sufficient for heat rejection'], correct: 0, exp: 'Wet-bulb temperature is always ≤ dry-bulb temperature, often significantly lower in dry climates. Evaporative condensers approach wet-bulb, dramatically reducing condensing pressure and compressor work.' },
      { q: 'The total heat of rejection in an industrial refrigeration system equals:', a: ['Refrigerating capacity + heat of compression (≈ 120–125% of the refrigerating capacity)', 'Only the refrigerating capacity — the heat of compression is dissipated by the compressor body', 'The refrigerating capacity only at the peak load condition', 'The refrigerating capacity minus heat lost through insulation'], correct: 0, exp: 'The condenser must reject all the heat absorbed by the refrigerant in the evaporator PLUS the heat added by the compressor. For ammonia systems this is typically 120–125% of the refrigerating capacity.' },
      { q: 'Legionella bacteria is controlled in evaporative condenser water systems through:', a: ['Biocide treatment and a documented water management plan — many jurisdictions legally require this', 'Keeping water pH below 5.0 to prevent biological growth', 'Draining and refilling the basin weekly with fresh water', 'Legionella is not a concern in industrial refrigeration — only potable water systems need management'], correct: 0, exp: 'Warm, aerosolizing evaporative systems require active biocide treatment and water management plans. Many jurisdictions require these plans under ASHRAE Guideline 12-2000 or local codes.' },
      { q: 'Flooded evaporators provide better heat transfer than DX evaporators because:', a: ['Boiling liquid maintains continuous coil contact with higher heat transfer coefficient than partially-wetted DX coils', 'Flooded systems run at lower temperatures requiring less compressor work', 'DX systems cannot be pressure-tested for ammonia service', 'Flooded systems require no expansion valve, reducing pressure drop across the circuit'], correct: 0, exp: 'Continuous boiling liquid contact vs. partially wetted surfaces in DX — the heat transfer coefficient is significantly higher in the flooded configuration.' },
      { q: 'A liquid recirculation rate of 3:1 means:', a: ['3 pounds of liquid are pumped to the evaporator for every pound evaporated — 2 unevaporated pounds return to the LP receiver', 'The pump runs 3 times per hour', 'The evaporator is 3× oversized relative to the minimum requirement', '3 coils are connected in parallel per pump circuit'], correct: 0, exp: '3:1 recirculation: 3 lbs pumped, 1 lb evaporated, 2 lbs return to the LP receiver — maintaining a flooded condition throughout the coil.' },
      { q: 'The pump-down step before hot gas defrost serves to:', a: ['Remove liquid from the evaporator before hot gas entry — preventing hydraulic shock from liquid-vapor pressure spikes', 'Pre-heat the compressor before diverting discharge gas to the coil', 'Close the liquid feed solenoid and allow the coil to gradually warm through air convection', 'Reduce system pressure to a safe level before opening the hot gas solenoid valve'], correct: 0, exp: 'Pumping down removes liquid refrigerant from the coil before hot gas is admitted. Hot gas meeting cold liquid causes pressure spikes and hydraulic shock that can damage coil tubes and solenoid valves.' },
      { q: 'Floating suction setpoint control saves energy by:', a: ['Raising suction pressure to the highest level that satisfies all evaporators, reducing compression ratio', 'Lowering suction pressure to increase the refrigerating effect per pound of refrigerant', 'Reducing compressor speed via VFD while holding constant setpoint', 'Cycling compressors off completely during part-load periods'], correct: 0, exp: 'Higher suction pressure = lower compression ratio = less compressor work. Floating setpoint always seeks the highest suction pressure that still satisfies the coldest load in the system.' },
      { q: 'Hot gas defrost termination based on coil temperature is preferred over timer-only termination because:', a: ['Temperature termination stops defrost when ice is actually gone — timer alone risks short defrost (ice remaining) or long defrost (energy waste and product warming)', 'Timer termination is not permitted by ASHRAE 15 for ammonia systems', 'Temperature sensors are less expensive to install than defrost timers', 'Timer-based defrost cannot be used with hot gas — only with electric defrost'], correct: 0, exp: 'Timer-only defrost is imprecise — ice accumulation varies with door openings, product load, and ambient conditions. Temperature termination detects when the coil has actually cleared ice, optimizing defrost length for conditions.' },
      { q: 'Minimum condensing pressure limits in a floating condensing program are set to:', a: ['Ensure sufficient pressure differential for float valves, hot gas solenoids, and other pressure-dependent components', 'Prevent compressor overspeeding at low condensing pressures', 'Meet EPA minimum pressure requirements for ammonia systems', 'Prevent refrigerant from condensing into the liquid state in the compressor discharge'], correct: 0, exp: 'Many components require minimum ΔP to operate — float valves need pressure to drive liquid flow, hot gas solenoids need differential to open. Setting condensing too low defeats these systems.' },
      { q: 'High condensing pressure in an industrial refrigeration system is most directly caused by:', a: ['Poor heat rejection from the condenser — dirty coil, failed fans, water treatment failure, or high ambient wet-bulb', 'High suction pressure from a lightly loaded system', 'Low refrigerant charge — too little refrigerant in the high side', 'An oversized compressor running at full capacity in cool weather'], correct: 0, exp: 'High condensing pressure results from the condenser not rejecting enough heat — dirty coil surfaces, failed fans, scale buildup from poor water treatment, or elevated ambient wet-bulb temperature are the primary causes.' },
    ],
  },

  {
    id: 'ir-troubleshooting',
    num: 6,
    title: 'Troubleshooting and Systematic Fault Diagnosis',
    desc: 'Systematic approach to industrial refrigeration faults — high head pressure, high suction pressure, low suction pressure, compressor faults, oil management problems, and the documentation that supports preventive action.',
    slides: [
      {
        title: 'The Systematic Troubleshooting Approach',
        body: [
          'Industrial refrigeration troubleshooting is pattern recognition applied to a dynamic system. Before changing anything, build a clear picture: record all current operating parameters (suction pressure, discharge pressure, discharge temperature, condenser approach temperature, oil pressure, any alarms active). Compare against what is normal for current conditions. The gap between what you observe and what is expected is the problem statement — and usually points to a small number of possible causes.',
          'The four-step approach: (1) Observe — record all pressures, temperatures, and equipment status without changing anything first. (2) Compare — against normal baselines for the same load and ambient conditions. What is high? What is low? What is not running that should be? (3) Identify — using the deviations identified, generate a list of possible causes for each deviation. Use the P-h diagram and your knowledge of the system to reason through where each cause would show up. (4) Test — change one variable at a time and observe the result. Never make multiple simultaneous changes — you won\'t know which change fixed the problem (or made it worse).',
          'Documentation as a diagnostic tool: an industrial refrigeration system that is logged consistently accumulates pattern data. A system whose condensing pressure rises 5 psi every two weeks has scale building up on the condenser coil — you can see it before it becomes a crisis. A compressor whose discharge temperature trends up 3°F per month may have developing valve leakage (for reciprocating) or oil cooling degradation. Trending data turns reactive maintenance into predictive maintenance.',
          'Common alarm scenarios and their primary differentials: High Discharge Pressure alarm — first check condenser (fans running? water flow? coil clean?), then check refrigerant load (heat load suddenly higher?), then check for non-condensables (air in the system). Low Suction Pressure alarm — first check for load reduction (is the refrigerated space at setpoint?), then check liquid feed (is the float or expansion valve passing liquid?), then check suction line solenoids (all open that should be?), then check for a refrigerant leak.',
        ],
        keyPoints: [
          'Before touching anything: record all pressures, temperatures, and status — build the full picture first',
          'Four steps: Observe → Compare (against normal) → Identify (probable causes) → Test (one change at a time)',
          'Consistent logging creates trending data that identifies problems weeks before failure — the foundation of predictive maintenance',
          'Alarm first-response: check the simplest, most accessible cause first (condenser fans, float valve, solenoid) before assuming a major fault',
        ],
        quiz: [
          {
            q: 'When responding to a High Discharge Pressure alarm, the first thing to check is:',
            a: ['The condenser — are fans running, is water flow present, is the coil clean — the most common and accessible cause', 'The compressor discharge temperature to confirm the fault before checking the condenser', 'Refrigerant charge weight — high discharge pressure always means overcharge', 'The system log for the last known normal condition — no action until historical data is reviewed'],
            correct: 0,
            exp: 'High discharge pressure most commonly results from condenser problems (failed fans, fouled coil, loss of water flow, high ambient). Check the simplest/most accessible cause first before assuming a more complex fault.',
          },
          {
            q: 'The primary reason for changing only one variable at a time during troubleshooting is:',
            a: ['To isolate whether the change caused a corresponding response — multiple simultaneous changes make root cause identification impossible', 'OSHA prohibits multiple simultaneous process changes without a written MOC (Management of Change)', 'Changing multiple variables simultaneously causes system instability that trips safety shutdowns', 'Industry practice only — multiple changes are acceptable as long as they are all reversible'],
            correct: 0,
            exp: 'If you change two things and the problem resolves, you do not know which change fixed it — or whether the combination is even safe to leave. One change at a time provides clear cause-and-effect information.',
          },
          {
            q: 'Consistent operating log data showing condensing pressure rising 5 psi every two weeks most likely indicates:',
            a: ['Scale buildup on the condenser coil reducing heat transfer — a proactive water treatment or cleaning issue', 'Refrigerant overcharge accumulating in the high-pressure receiver', 'Progressive mechanical failure of the compressor discharge valves', 'A refrigerant leak from the suction side causing a refrigerant concentration shift to the high side'],
            correct: 0,
            exp: 'Gradual, steady rise in condensing pressure over weeks is the classic pattern for condenser coil fouling (scale or biological deposits). This is predictable from trending data and correctable with cleaning before it becomes a crisis.',
          },
        ],
      },
      {
        title: 'Common Fault Diagnoses — High Head, High Suction, and Liquid Problems',
        body: [
          'High discharge (head) pressure: most common causes: (1) Condenser fouling — scale or biological deposits reduce heat transfer; cleaning restores performance. (2) Condenser fan failure — one or more fans not running; check breakers and motors. (3) Loss of condenser water flow — check pump, strainer, spray nozzles. (4) High ambient wet-bulb — a system problem during a heat wave is often not a fault — it\'s a capacity vs. design condition issue. (5) Non-condensables in the system — air or nitrogen in the refrigerant circuit does not condense and accumulates in the high side, raising head pressure; vent non-condensables from the high-pressure receiver using a non-condensable purger or manual vent procedure.',
          'High suction pressure (too warm): most common causes: (1) Excessive refrigeration load — more heat is entering the refrigerated space than designed (warm weather, door openings, product processing heat). (2) Low refrigerant charge — insufficient refrigerant to absorb the load. (3) Compressor capacity insufficient for load — compressor stage offline, low volumetric efficiency. (4) Liquid feed restriction upstream of evaporators — float valve stuck, liquid solenoid not fully open, strainer plugged.',
          'Low suction pressure (too cold, excessive pulldown): most common causes: (1) Very low load — space is below setpoint and the compressor is maintaining lower-than-necessary suction. Should be handled by floating setpoint control or cycling compressors. (2) Defective or stuck-open liquid feed — excessive refrigerant flooding the evaporator lowers the evaporating temperature. (3) A suction pressure transducer or controller fault — verify with a calibrated gauge before adjusting system parameters.',
          'Liquid slugging and wet returns: when liquid refrigerant enters the compressor suction, it cannot be compressed and causes catastrophic valve, piston, and connecting rod damage. Causes: suction accumulator liquid level too high (check float or drain), sudden load change overwhelming the accumulator, defrost cycle returning liquid (pump-down timing incorrect), or loss of superheat in a direct-expansion circuit. Symptoms: banging noises from the compressor, frost on suction line immediately at the compressor suction flange, high suction pressure with low discharge temperature.',
        ],
        keyPoints: [
          'High head pressure: check condenser (fouling, fans, water) first, then non-condensables (vent from high-pressure receiver)',
          'High suction pressure: excessive load, low refrigerant charge, compressor capacity loss, liquid feed restriction',
          'Low suction pressure: light load (floating setpoint should handle it), stuck-open liquid feed, or instrument fault',
          'Liquid slugging: banging compressor + frost at suction flange + low discharge temperature — immediate shutdown and inspection required',
        ],
        quiz: [
          {
            q: 'Non-condensable gases in the refrigerant system (air, nitrogen) cause:',
            a: ['High discharge pressure because non-condensables accumulate in the condenser and reduce effective condensing area', 'Low discharge pressure because non-condensables dilute the refrigerant vapor', 'Low suction pressure because non-condensables occupy volume in the low side', 'No pressure change — non-condensables pass harmlessly through the system'],
            correct: 0,
            exp: 'Non-condensables (air or nitrogen) do not condense at normal condensing temperatures and pressures. They accumulate in the condenser and high-pressure receiver, taking up space and raising head pressure. They must be vented from the system.',
          },
          {
            q: 'Frost on the compressor suction flange during operation indicates:',
            a: ['Liquid refrigerant is entering the compressor suction — an immediate risk of liquid slugging requiring investigation and possible emergency shutdown', 'The compressor is operating at optimal low-temperature conditions', 'The suction pressure is slightly lower than normal — frost is expected during heavy load periods', 'The suction line insulation is damaged — a maintenance item but not operationally urgent'],
            correct: 0,
            exp: 'Frost at the compressor suction flange means the suction line is at or below the frost point of the air — which only happens when liquid refrigerant is present. Liquid slugging causes immediate mechanical damage. Investigate and correct before damage occurs.',
          },
          {
            q: 'When low suction pressure is caused by a stuck-open liquid feed float valve, the symptom will also include:',
            a: ['Low refrigerated space temperature (below setpoint) and possibly frost back to the compressor — too much liquid is flooding the evaporator', 'High suction superheat — the excess liquid absorbs all heat before reaching the compressor', 'High discharge temperature — excessive liquid causes the compressor to work harder', 'High discharge pressure — the extra liquid raises the condensing pressure'],
            correct: 0,
            exp: 'A stuck-open float valve floods the evaporator with more liquid than needed, driving evaporating temperature very low. The refrigerated space goes below setpoint (too cold), suction pressure drops (evaporating at lower temperature), and liquid may carry back to the compressor.',
          },
        ],
      },
      {
        title: 'Energy Efficiency, Documentation, and PSM Records',
        body: [
          'Energy efficiency in industrial refrigeration is directly measurable using the system COP (Coefficient of Performance) or the specific energy consumption (kW per ton of refrigeration). Tracking energy consumption relative to refrigeration load over time reveals degradation — a system that required 0.8 kW/ton a year ago but now requires 1.1 kW/ton has a measurable problem somewhere. Common causes of efficiency degradation: condenser fouling, evaporator oil accumulation, compressor valve wear (reciprocating), compressor slide valve wear, refrigerant undercharge, and excessive suction superheat in DX circuits.',
          'Key efficiency benchmarks: an ammonia refrigeration system in good condition should produce approximately 3.5–5.0 COP at typical frozen food storage conditions (−25°F evaporating, 85°F condensing). At fresh produce/cooler conditions (28°F evaporating, 85°F condensing), COP of 4.5–6.5 is achievable. Significantly lower COP indicates either a system problem or abnormal operating conditions. These numbers provide benchmarks for evaluating whether energy optimization is worthwhile versus repairing a fault.',
          'Operating logs as PSM documentation: under OSHA PSM (1910.119), the Mechanical Integrity element requires that inspections and tests be documented with the results, the equipment inspected, the date, and the name of the person who performed the test. Operating logs — if consistent and complete — satisfy part of this documentation requirement. Pressure vessel inspection records (NBIC-format), SRV test certificates, ammonia detector calibration logs, and PSM incident investigation reports are all part of the operator\'s record-keeping responsibility.',
          'Management of Change (MOC) under PSM: any change to the refrigeration system — adding an evaporator, changing set points, replacing a control valve with a different model — requires a written MOC review before implementation. MOC evaluates whether the change introduces new hazards or undermines existing safety measures. Bypassing MOC is a PSM violation that can result in significant OSHA fines. Document even small changes — they become critical references during incident investigations.',
        ],
        keyPoints: [
          'COP and kW/ton trending reveals efficiency degradation — track against a baseline to identify problems before they worsen',
          'Good ammonia system COP: ~3.5–5.0 at freezer conditions, ~4.5–6.5 at cooler conditions',
          'PSM Mechanical Integrity documentation: inspection records, SRV certifications, detector calibration logs, with date/technician/results',
          'PSM Management of Change (MOC): any system modification requires written review before implementation — even setpoint changes',
        ],
        quiz: [
          {
            q: 'A refrigeration system that previously operated at 0.8 kW/ton now requires 1.1 kW/ton for the same load and conditions. This most likely indicates:',
            a: ['A system efficiency degradation — possible causes include condenser fouling, evaporator oil accumulation, or compressor wear', 'The load has increased — more kW/ton is normal when the refrigerated space is warmer', 'The utility power quality has changed — voltage fluctuations increase apparent energy consumption', 'Normal aging — all refrigeration systems increase in kW/ton consumption by approximately 5% per year'],
            correct: 0,
            exp: 'kW/ton increasing for the same conditions and load means the system is doing the same cooling job with more energy — efficiency has degraded. Trending against the baseline identifies this early, before the degradation becomes severe.',
          },
          {
            q: 'Under OSHA PSM\'s Management of Change (MOC) requirement, which action requires a written MOC review?',
            a: ['Adding a new evaporator coil to an existing ammonia system — this changes system design and must be reviewed for new hazards', 'Replacing a failed compressor with an identical model from the same manufacturer', 'Conducting the routine monthly oil analysis', 'Adjusting the setpoint on the condenser fan staging controller by 2 psi within the original design range'],
            correct: 0,
            exp: 'MOC applies to changes in process technology, equipment, and procedures. Adding a new evaporator is a design change that could affect system pressure, liquid feed balance, and emergency response considerations. It requires written MOC review.',
          },
          {
            q: 'Operating log documentation satisfies part of which PSM element?',
            a: ['Mechanical Integrity — logs demonstrate ongoing monitoring of safety-critical equipment parameters with dates and technician signatures', 'Process Hazard Analysis — logs identify hazards by tracking near-miss events', 'Employee Participation — logs show operators are engaged with the process', 'Pre-Startup Safety Review — logs demonstrate the system was verified before initial startup'],
            correct: 0,
            exp: 'Mechanical Integrity requires documentation of inspections, tests, and monitoring — operating logs with dates, parameters, and the responsible operator\'s signature satisfy this requirement for routine monitoring activities.',
          },
        ],
      },
    ],
    test: [
      { q: 'The first step in systematic troubleshooting is:', a: ['Observe and record all operating parameters before changing anything', 'Change the most likely failed component immediately to restore operation quickly', 'Notify the facility manager before taking any troubleshooting actions', 'Review the last maintenance record to identify recently changed components'], correct: 0, exp: 'Observe first — record suction pressure, discharge pressure, discharge temperature, equipment status, and alarms. The full picture before any change is the foundation of systematic diagnosis.' },
      { q: 'High discharge pressure with all condenser fans confirmed running most likely indicates:', a: ['Condenser coil fouling, loss of water flow, or non-condensables in the system', 'Compressor valve leakage on the discharge side', 'Low refrigerant charge in the high-pressure receiver', 'Excessive suction superheat at the compressor inlet'], correct: 0, exp: 'With fans confirmed running, the next checks are water flow (spray nozzles, pump, basin), coil cleanliness, and non-condensables. Each can raise head pressure with fans running normally.' },
      { q: 'Non-condensable gases in the refrigerant system cause high head pressure because:', a: ['They do not condense and accumulate in the condenser, reducing effective condensing area', 'They are heavier than refrigerant and sink to the condenser bottom, blocking liquid subcooling', 'They raise the refrigerant dew point, requiring higher condensing temperature', 'Non-condensables cause high suction pressure, not high discharge pressure'], correct: 0, exp: 'Non-condensables (air, nitrogen) do not condense and accumulate in the high-pressure receiver and condenser, displacing refrigerant and raising head pressure.' },
      { q: 'Frost on the compressor suction flange during operation indicates:', a: ['Liquid refrigerant entering the compressor — an immediate liquid slugging risk requiring investigation', 'Normal operation at low evaporating temperatures — frost is expected', 'Suction line insulation failure — moisture condensation on a cold pipe', 'The compressor is overcooled by the refrigerant — reduce suction line insulation'], correct: 0, exp: 'Frost at the suction flange means the suction line is at or below freezing — only possible with liquid refrigerant present. Liquid slugging causes catastrophic mechanical damage.' },
      { q: 'High suction pressure can be caused by:', a: ['Excessive refrigeration load, low refrigerant charge, or insufficient compressor capacity', 'Non-condensables in the high side', 'Stuck-open liquid feed valve flooding the evaporator', 'All fans running at the evaporative condenser simultaneously'], correct: 0, exp: 'High suction pressure means the compressor cannot maintain setpoint — causes include too much heat load, not enough refrigerant, or insufficient compressor capacity.' },
      { q: 'A system\'s kW/ton increased from 0.8 to 1.1 for the same conditions. This most likely indicates:', a: ['Efficiency degradation from fouling, oil accumulation, or compressor wear', 'The utility has raised electricity rates', 'Normal seasonal variation', 'The load monitoring sensor is miscalibrated'], correct: 0, exp: 'kW/ton should be stable for a well-maintained system at consistent conditions. An increase indicates that more energy is required to do the same cooling work — a diagnostic indicator of system degradation.' },
      { q: 'Under OSHA PSM, Management of Change (MOC) is required when:', a: ['Adding new equipment or making design changes that were not part of the original system', 'Replacing a failed component with an identical replacement', 'Performing routine maintenance per the established PM schedule', 'Adjusting setpoints within the original design operating range'], correct: 0, exp: 'MOC applies to changes in technology, equipment, or procedures. Like-for-like replacement within the same design parameters does not require MOC, but any change that alters the process design does.' },
      { q: 'Mechanical Integrity documentation under PSM must include:', a: ['The inspection date, results, equipment inspected, and name of the person performing the inspection', 'Only the pass/fail result for each inspection — detailed data is optional', 'A supervisor signature only — technician identity is not a PSM requirement', 'Results for safety-critical items only — routine maintenance items are excluded'], correct: 0, exp: 'OSHA PSM requires documentation of who inspected what, when, and the results — for all safety-critical equipment. This creates an audit trail and historical record for incident investigation.' },
      { q: 'A good COP for an ammonia system at typical frozen food storage conditions is approximately:', a: ['3.5–5.0 — at around −25°F evaporating and 85°F condensing', '1.0–1.5 — refrigeration COPs are always below 2.0', '8.0–10.0 — ammonia\'s high efficiency produces very high COPs', '10.0–15.0 — modern variable-speed industrial systems exceed this range'], correct: 0, exp: 'An ammonia system in good condition at freezer conditions typically achieves COP of 3.5–5.0. Higher COPs are achievable at warmer evaporating temperatures (cooler applications).' },
      { q: 'Liquid slugging in a compressor is most immediately identified by:', a: ['Banging/knocking from the compressor and frost on the suction flange near the compressor', 'High discharge temperature alarm', 'Low oil pressure alarm', 'High suction superheat reading at the compressor inlet'], correct: 0, exp: 'Liquid slugging produces a characteristic knock or bang as liquid impacts compressor valves and pistons. Simultaneous frost at the suction flange confirms liquid is entering the compressor suction.' },
    ],
  },
];
