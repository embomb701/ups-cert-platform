import type { TrainingModule } from './modules';

// HVAC FSE course — HVAC-specific modules (course positions 13-25).
// The HVAC course sequence is: shared foundation modules 1-10, then the
// two refrigeration core modules shared from the Kitchen course
// (kitchen-refrigeration-cycle at position 11, kitchen-refrigeration-service
// at position 12), then these modules. Nums here are course positions.
// Kept OUT of ALL_MODULES so the UPS completion check is unaffected.

export const HVAC_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 13 — PSYCHROMETRICS & HUMAN COMFORT
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'hvac-psychrometrics',
    num: 13,
    title: 'Psychrometrics & Human Comfort',
    desc: 'What comfort actually is: dry bulb, wet bulb, dew point, and the temperature-humidity relationship every HVAC system exists to control.',
    slides: [
      {
        title: 'The Air You Condition: Temperature and Moisture',
        body: [
          'HVAC does not just cool air — it conditions it, and conditioning means controlling two things at once: temperature and moisture. Every comfort complaint you will ever chase reduces to one or both. The vocabulary that lets you measure and reason about them is called psychrometrics, and it is less scary than the name.',
          'Dry-bulb temperature is what an ordinary thermometer reads — the temperature everyone means when they say "it is 75 degrees." Wet-bulb temperature is read by a thermometer whose bulb is wrapped in a wet wick with air moving across it: evaporation cools the bulb, and the drier the air, the more evaporation, the lower the reading. The gap between dry bulb and wet bulb is therefore a direct measure of how dry the air is. Equal readings mean saturated air (100% humidity); a wide gap means dry air.',
          'Relative humidity (RH) expresses how much moisture the air holds as a percentage of the most it could hold at its current temperature. The trap in that definition: warm air can hold far more moisture than cool air. Cool a room without removing any moisture and RH climbs; heat it and RH falls. This is why winter heating makes buildings desert-dry and why a struggling air conditioner leaves a space "cold but clammy."',
          'Dew point is the temperature at which air becomes saturated and moisture begins condensing. It is the most physically honest moisture number: air at 55°F dew point contains the same moisture whether the room is at 65°F or 85°F. Every cold surface below the dew point sweats — which is why supply ducts, cold water pipes, and under-charged evaporator coils drip, and why the dew point tells you whether condensation problems are an equipment fault or just physics.',
        ],
        tables: [
          {
            caption: 'The four air measurements',
            headers: ['Measurement', 'What it tells you', 'Field instrument'],
            rows: [
              ['Dry bulb (DB)', 'Ordinary air temperature', 'Any thermometer'],
              ['Wet bulb (WB)', 'Temperature + evaporation → moisture content', 'Sling/digital psychrometer'],
              ['Relative humidity (RH)', 'Moisture as % of max at this temperature', 'Hygrometer'],
              ['Dew point (DP)', 'Temperature where condensation starts', 'Calculated / digital meter'],
            ],
          },
        ],
        keyPoints: [
          'Conditioning = controlling temperature AND moisture; every comfort complaint involves one or both',
          'Wet bulb vs dry bulb gap measures dryness: equal = saturated, wide gap = dry',
          'RH is relative to temperature: cooling raises RH, heating lowers it, with no moisture change',
          'Any surface below the dew point sweats — physics, not necessarily an equipment fault',
        ],
        quiz: [
          {
            q: 'A room is cooled from 80°F to 70°F with no moisture removed. Its relative humidity:',
            a: ['Falls', 'Rises — cooler air holds less moisture, so the same moisture is a larger fraction of maximum', 'Stays exactly the same', 'Drops to zero'],
            correct: 1,
            exp: 'RH is relative to the maximum the air could hold at its temperature. Cooling shrinks that maximum, so unchanged moisture = higher RH.',
          },
          {
            q: 'Wet-bulb and dry-bulb thermometers read the same temperature. The air is:',
            a: ['Very dry', 'Saturated — at 100% relative humidity', 'Exactly at comfort conditions', 'Below freezing'],
            correct: 1,
            exp: 'The wet bulb reads lower only when evaporation cools it. No evaporation means the air can hold no more moisture — saturation.',
          },
          {
            q: 'A customer complains that an uninsulated supply duct through a humid attic "leaks water." The duct surface is below the attic air\'s dew point. The water is:',
            a: ['A refrigerant leak', 'Condensation from attic air on the cold duct surface — an insulation/vapor problem, not a leak', 'Rain intrusion', 'Condensate pump overflow'],
            correct: 1,
            exp: 'Any surface below dew point condenses moisture from the surrounding air. Cold ducts in humid unconditioned spaces sweat until insulated and vapor-sealed.',
          },
        ],
      },
      {
        title: 'Sensible Heat, Latent Heat, and the Psychrometric Chart',
        body: [
          'Cooling a building is two different jobs sold as one. Sensible cooling lowers the air temperature — the part a thermometer sees. Latent cooling removes moisture — the part that happens when humid air crosses a cold evaporator coil and its moisture condenses to the drain. The evaporator does both simultaneously, and the split between them matters: a system doing mostly latent work cools the air less, and a system doing only sensible work leaves the space clammy.',
          'Air conditioners remove moisture as a byproduct of running the coil below the air\'s dew point. This is why the condensate drain is a diagnostic instrument: an air conditioner in a humid climate that produces no condensate is either oversized (cooling the air so fast it satisfies the thermostat before dehumidifying — short cycles, cold clammy rooms) or not running its coil cold enough. Oversizing is the classic residential sin: bigger is not better, because comfort needs runtime for moisture removal.',
          'The psychrometric chart plots all the air properties on one map: dry bulb across the bottom, moisture content up the side, curved RH lines, and diagonal wet-bulb lines. You do not need to be a chart wizard in the field — digital psychrometers do the math — but you need to read the story: any air condition is a point; heating slides the point right, cooling slides left, humidifying moves up, dehumidifying moves down. A cooling coil moves air down-and-left along a curve toward the coil surface temperature.',
          'Comfort itself is a zone, not a number: roughly 68-78°F with 30-60% RH satisfies most people, and ASHRAE Standard 55 formalizes it. The practical service insight is that complaints name a temperature but often mean humidity: "it never gets cool" at 74°F/65% RH is a latent problem (dehumidification), and "too cold" complaints in winter offices are often dry air, drafts, or radiant effects. Measure both numbers before believing either.',
        ],
        keyPoints: [
          'Sensible = temperature change; latent = moisture removal; the coil does both and the split matters',
          'No condensate in humid weather = red flag: oversizing or a coil not doing latent work',
          'Oversized AC short-cycles: satisfies the thermostat without dehumidifying — cold and clammy',
          'Comfort is a temperature + humidity zone (≈68-78°F, 30-60% RH); measure both before diagnosing',
        ],
        quiz: [
          {
            q: 'A newly installed, generously oversized AC cools the house fast, but the family complains it feels cold and clammy. The mechanism is:',
            a: ['Low refrigerant charge', 'Short cycles satisfy the thermostat before the coil removes meaningful moisture — sensible done, latent not', 'A dirty filter', 'Backwards thermostat wiring'],
            correct: 1,
            exp: 'Moisture removal needs runtime. Oversized equipment wins the temperature race and loses the humidity war — the classic argument against oversizing.',
          },
          {
            q: 'On a psychrometric chart, dehumidifying air without changing its temperature moves the point:',
            a: ['Right', 'Left', 'Straight down', 'Along an RH curve'],
            correct: 2,
            exp: 'Vertical axis is moisture content: down = drier. Horizontal moves are temperature; real coil processes combine both (down and left).',
          },
        ],
      },
      {
        title: 'Measuring Air in the Field',
        body: [
          'Psychrometrics earns its keep when you measure. The modern tool is a digital psychrometer (or thermo-hygrometer): it reads dry bulb, RH, and computes wet bulb and dew point. Older but honorable: the sling psychrometer, two thermometers whirled on a handle, wet wick on one. Whatever the tool, verify it — meters drift, and a humidity sensor that reads 15% off will misdiagnose entire buildings. Salt-solution calibration checks or a known-good reference keep you honest.',
          'The measurements that decide real service calls: RETURN AIR dry bulb and wet bulb (what the system is being asked to do), SUPPLY AIR dry bulb (what it is delivering), and outdoor conditions (what the equipment fights). From return and supply you get the temperature split — typically around 16-22°F across a healthy DX cooling coil under normal humidity. The split is a triage number, not a verdict: low split says low capacity reaching the air (charge, airflow too high, weak compressor); an unusually high split usually says low airflow (the same cold being stuffed into less air).',
          'Humidity changes the split: very humid return air spends more of the coil\'s work on latent removal, legitimately shrinking the sensible split. This is why charts in manufacturer literature index target split against return-air wet bulb — and why the tech who measures only dry bulb chases ghosts on muggy days.',
          'Two more field moments where psychrometrics is the diagnosis: evaporator freeze-ups (a coil running below 32°F saturation turns condensate to ice — caused by low airflow or low charge, and the ice then blocks more airflow in a death spiral), and "duct sweating" or musty smells (surfaces below dew point, oversizing, or ventilation imbalance). When moisture is the complaint, the psychrometer is the meter that matters.',
        ],
        keyPoints: [
          'Measure return DB/WB, supply DB, and outdoor conditions — the triangle every diagnosis sits in',
          'Healthy DX cooling split ≈ 16-22°F; low split = capacity, high split = usually low airflow',
          'Humid return air legitimately shrinks the sensible split — index against wet bulb',
          'Freeze-ups and sweating surfaces are psychrometric events: airflow, charge, or dew point',
        ],
        quiz: [
          {
            q: 'Supply-to-return split measures 26°F on a system rated for ~18°F. The first suspect is:',
            a: ['Overcharge', 'Low airflow — the same cooling packed into less air', 'An oversized condenser', 'High outdoor temperature'],
            correct: 1,
            exp: 'Less air across the coil means each cubic foot gets colder. Filters, blower speed, and duct restrictions are the hunt before touching refrigerant.',
          },
          {
            q: 'On a very humid day, a correctly charged system shows a 14°F split instead of its usual 18°F. This is:',
            a: ['A failing compressor', 'Expected — high return-air humidity shifts coil work from sensible to latent', 'A dirty condenser', 'Thermostat error'],
            correct: 1,
            exp: 'Latent load is invisible to a dry-bulb thermometer. Manufacturer split tables index against return wet bulb for exactly this reason.',
          },
          {
            q: 'An evaporator coil is a solid block of ice. The two root-cause families are:',
            a: ['Overcharge and dirty condenser', 'Low airflow and low refrigerant charge — both drive the coil below freezing', 'High humidity and high airflow', 'Thermostat and contactor faults'],
            correct: 1,
            exp: 'Starve the coil of warm air OR of refrigerant and its saturation temperature falls below 32°F; condensate freezes and the ice chokes airflow further.',
          },
        ],
      },
    ],
    test: [
      { q: 'Dry-bulb temperature is:', a: ['The temperature of moist surfaces', 'Ordinary air temperature read by a standard thermometer', 'Always lower than wet bulb', 'The condensation temperature'], correct: 1, exp: 'Dry bulb is plain air temperature; wet bulb adds evaporation to reveal moisture.' },
      { q: 'A large gap between wet-bulb and dry-bulb readings means:', a: ['Saturated air', 'Dry air — strong evaporation cools the wet bulb', 'Broken thermometer', 'High dew point'], correct: 1, exp: 'The drier the air, the more evaporation from the wick, the lower the wet bulb reads relative to dry bulb.' },
      { q: 'Dew point is:', a: ['The comfort setpoint', 'The temperature at which air saturates and condensation begins', 'Always 55°F', 'The evaporator temperature'], correct: 1, exp: 'Surfaces below the dew point sweat — the physically honest measure of the air\'s moisture content.' },
      { q: 'Sensible cooling changes ______; latent cooling changes ______.', a: ['moisture / temperature', 'temperature / moisture', 'pressure / volume', 'RH / dew point'], correct: 1, exp: 'Sensible = what a thermometer sees; latent = moisture condensed out at the coil.' },
      { q: 'An air conditioner dehumidifies because:', a: ['It filters moisture', 'Its evaporator runs below the air\'s dew point, condensing moisture to the drain', 'Refrigerant absorbs water', 'The blower compresses the air'], correct: 1, exp: 'The cold coil is below dew point; moisture condenses on it and drains away — latent cooling.' },
      { q: 'Oversized cooling equipment causes:', a: ['Better comfort', 'Short cycling that cools without adequate dehumidification — cold and clammy', 'Lower bills only', 'Higher humidity removal'], correct: 1, exp: 'Latent removal needs runtime; oversized systems satisfy the thermostat too fast to dry the air.' },
      { q: 'A typical healthy sensible split across a DX cooling coil is about:', a: ['5-8°F', '16-22°F', '30-40°F', '50°F'], correct: 1, exp: 'Roughly 16-22°F under normal conditions, indexed against return-air wet bulb on humid days.' },
      { q: 'An abnormally HIGH temperature split most often indicates:', a: ['Low refrigerant', 'Low airflow across the coil', 'An oversized blower', 'Low outdoor ambient'], correct: 1, exp: 'The same cooling concentrated in less air over-chills it: filters, blower, and duct restrictions first.' },
      { q: 'The comfort zone most occupants accept is roughly:', a: ['60-65°F at any humidity', '68-78°F with 30-60% RH', '75°F exactly', '72°F with 80% RH'], correct: 1, exp: 'ASHRAE 55 territory: a temperature band plus a humidity band — both matter to comfort.' },
      { q: 'A cooling coil frozen into an ice block traces to:', a: ['Too much return air', 'Low airflow or low charge driving coil saturation below 32°F', 'High head pressure', 'A failed condensate pump'], correct: 1, exp: 'Both starve the coil into sub-freezing operation; ice then blocks airflow and accelerates itself.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 14 — AIR DISTRIBUTION, DUCTWORK & AIRFLOW
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'hvac-air-distribution',
    num: 14,
    title: 'Air Distribution, Ductwork & Airflow',
    desc: 'Blowers, static pressure, CFM, filters, and balancing — the delivery system that most "refrigeration" complaints actually live in.',
    slides: [
      {
        title: 'Blowers and the Air They Move',
        body: [
          'Refrigeration makes cold; the blower delivers it. Comfort systems move air measured in CFM (cubic feet per minute), and the design rule of thumb for cooling is roughly 400 CFM per ton of refrigeration (350 in humid climates for more latent work, up to 450 in dry ones). A 3-ton system wants about 1,200 CFM. When airflow strays far from that target, everything downstream lies to you: splits shift, coils freeze or run warm, and charging by pressures becomes fiction. Airflow is verified BEFORE refrigerant on any performance diagnosis.',
          'Three blower breeds run the market. Belt-drive blowers (commercial equipment, RTUs): motor, pulleys, belt — service items are belt tension/condition and pulley alignment, and airflow can be tuned by adjustable pulleys. Direct-drive PSC blowers (older residential): fixed speeds selected by tap wires, cheap and simple. ECM/variable-speed blowers (modern equipment): electronically commutated motors that maintain programmed airflow against changing duct restriction — quieter and efficient, but they mask duct problems by muscling through restriction until they run hot, loud, and power-hungry.',
          'That ECM behavior matters diagnostically: a PSC blower in a choked duct system simply moves less air (visible as a high split); an ECM blower in the same system keeps moving its programmed CFM at higher wattage — the symptom shifts from "poor cooling" to "high bills, noisy grilles, motor failures." Meeting an ECM system means asking what the ducts are doing to it.',
          'Blower service realities: dirty blower wheels lose real capacity (a wheel caked with dust moves dramatically less air — clean wheels are a legitimate repair, not housekeeping); capacitors on PSC motors fail like all capacitors (Module 10 testing applies); ECM failures split between the motor and its control module, often replaceable separately. And every blower complaint begins at the filter, because the cheapest part in the system controls the whole system.',
        ],
        tables: [
          {
            caption: 'Blower types at a glance',
            headers: ['Type', 'Where', 'Choked-duct behavior', 'Common service'],
            rows: [
              ['Belt drive', 'Commercial / RTU', 'Less air', 'Belts, pulleys, bearings'],
              ['PSC direct drive', 'Older residential', 'Less air (high split)', 'Capacitors, speed taps'],
              ['ECM variable speed', 'Modern systems', 'Same air, more watts, more noise', 'Modules, programming'],
            ],
          },
        ],
        keyPoints: [
          'Design target ≈ 400 CFM/ton (350 humid, 450 dry); verify airflow before refrigerant diagnosis',
          'PSC in bad ducts moves less air; ECM moves rated air at higher wattage and noise',
          'Dirty blower wheels quietly destroy capacity — cleaning them is a real repair',
          'Every airflow complaint starts at the filter',
        ],
        quiz: [
          {
            q: 'A 4-ton system in a mixed climate should move approximately:',
            a: ['400 CFM', '1,600 CFM', '4,000 CFM', '800 CFM'],
            correct: 1,
            exp: '≈400 CFM per ton × 4 tons = 1,600 CFM. The number every airflow verification starts from.',
          },
          {
            q: 'A homeowner with a new variable-speed (ECM) furnace reports whistling grilles and higher electric bills, but cooling is fine. The likely story is:',
            a: ['The ECM is defective', 'Restrictive ductwork: the ECM forces its programmed CFM through the restriction at high wattage and velocity', 'Refrigerant overcharge', 'Wrong thermostat'],
            correct: 1,
            exp: 'ECM blowers hide duct sins by muscling through them. The comfort survives; the noise, watts, and eventually the motor pay the price.',
          },
          {
            q: 'Cooling capacity dropped gradually over two years; charge and split check odd, and the blower wheel is caked solid with dust. The honest first repair is:',
            a: ['Recharging the system', 'Cleaning the blower wheel and re-verifying airflow before judging anything else', 'A new compressor', 'Bigger supply grilles'],
            correct: 1,
            exp: 'A caked wheel moves far less air than its rating. Every downstream reading is distorted until airflow is restored.',
          },
        ],
      },
      {
        title: 'Static Pressure: The Blood Pressure of the System',
        body: [
          'Static pressure is duct system blood pressure, measured in inches of water column (the same unit as gas pressure, conveniently) with a manometer and probe ports drilled before and after the air handler. Total external static pressure (TESP) = the pressure the blower fights outside the equipment: return-side suction plus supply-side pressure. Residential equipment is typically rated for 0.5 in. w.c. TESP; the epidemic field reality is systems running 0.8-1.0+ — the hypertension of HVAC.',
          'Measuring is minutes: drill test ports, probe the return plenum before the equipment (negative reading) and the supply plenum after it (positive), add magnitudes. Compare to the data plate rating. Then localize like a voltage drop hunt: measure across the filter (a loaded filter or a restrictive high-MERV filter can eat 0.3+ alone), across the coil (a dirty evaporator is a hidden pressure hog), and note what remains for the actual ducts.',
          'High static has signatures per component: undersized or crushed return ducts (the most common single sin — returns starve systems more than supplies), closed or blocked registers, kinked flex duct sagging between joists, filters chosen for marketing MERV instead of system reality, and matted evaporator coils. Symptoms upstream: noisy grilles, low CFM (PSC) or hot loud ECMs, frozen coils, short heat-exchanger life on furnaces (overheating from low airflow), and rooms that never conditioned properly since the day the house was built.',
          'The professional discipline: static pressure belongs in every PM and every performance diagnosis, the way blood pressure belongs in every physical. It is a two-minute measurement that explains years of complaints, sells legitimate duct repairs, and separates the tech who fixes systems from the parts-changer who condemns compressors in choked ductwork.',
        ],
        keyPoints: [
          'TESP = return suction + supply pressure, vs equipment rating (typically ~0.5 in. w.c. residential)',
          'Localize like voltage drop: filter, coil, then ducts — measure across each',
          'Return-side restriction is the most common duct sin; high-MERV filters are hidden hogs',
          'Static pressure belongs in every PM — the two-minute measurement that explains everything',
        ],
        quiz: [
          {
            q: 'A system rated 0.5 in. w.c. measures 0.9 TESP; the pressure drop across the brand-new "allergen defense" filter alone is 0.45. The immediate insight is:',
            a: ['The blower is failing', 'The restrictive filter is consuming nearly the system\'s whole pressure budget — spec a lower-drop filtration solution', 'The coil is dirty', 'The ducts are oversized'],
            correct: 1,
            exp: 'Marketing-MERV filters can eat more static than the entire duct design allows. Filtration must be spec\'d to the system\'s pressure budget (or the return enlarged).',
          },
          {
            q: 'Static pressure is measured with:',
            a: ['Refrigerant gauges', 'A manometer at test ports before and after the air handler', 'An ammeter on the blower', 'An anemometer at the registers'],
            correct: 1,
            exp: 'The same manometer family as gas work: return side reads negative, supply positive; magnitudes add to TESP.',
          },
          {
            q: 'The duct-side restriction most commonly strangling residential systems is:',
            a: ['Oversized supply trunks', 'Undersized or restricted RETURN air paths', 'Too many registers', 'Smooth metal duct'],
            correct: 1,
            exp: 'Returns are chronically under-built and further choked by closed doors and furniture. A starved return suffocates the whole system.',
          },
        ],
      },
      {
        title: 'Ducts, Filters, and Balancing',
        body: [
          'Duct systems have a grammar: supply trunks and branches deliver conditioned air to rooms; returns bring it back; the two must roughly balance in every closed-off space or pressure imbalances whistle under doors and starve rooms. Leakage is the silent thief — typical homes leak 20-30% of duct air into attics and crawlspaces, which is both an efficiency disaster and a building-pressure problem (supply leaks depressurize the house, pulling in humid or dusty infiltration; return leaks in a moldy crawlspace deliver that air to the bedrooms). Look for disconnected flex, unsealed boots, and the crushed sections behind every water heater.',
          'Flex duct earns special scorn when misused: rated fine when stretched taut and supported, it becomes a pressure-drop nightmare when sagging in long unsupported festoons, kinked around corners, or compressed through tight framing. A ten-foot sagging flex run can outrestrict fifty feet of decent metal duct. The eye finds these problems faster than any instrument — crawl and look.',
          'Filters exist on a spectrum from fiberglass see-through (protects the equipment only) through MERV 8-11 pleats (reasonable dust/pollen filtration at manageable drop) to MERV 13+ and HEPA territory (real filtration, real static cost — needing deeper media cabinets with more surface area to keep the pressure drop civil). The rules: match the filter to the system\'s pressure budget, size media cabinets generously, and set change schedules by the site\'s reality (dust, pets, kitchen grease) rather than the box\'s promise.',
          'Balancing closes the module: dampers at branch takeoffs (not the register grilles) set room-by-room flow; measure with an anemometer or flow hood when precision matters, or commission by comfort when it does not. Room complaints follow patterns: the far room starved by a long undersized branch, the bonus room over the garage with three exterior surfaces and one sad duct, the closed-door bedroom with no return path (undercut the door, add a transfer grille). Airflow is the least glamorous and most decisive half of HVAC — the tech who owns it owns comfort.',
        ],
        keyPoints: [
          'Duct leakage (20-30% typical) wastes capacity AND creates building-pressure/IAQ problems',
          'Sagging, kinked flex duct is the field\'s favorite hidden restriction — crawl and look',
          'Filtration is a pressure-budget decision: high MERV demands generous media area',
          'Balance at branch dampers; solve room complaints with return paths, not just more supply',
        ],
        quiz: [
          {
            q: 'A return-side duct leak in a damp, moldy crawlspace primarily causes:',
            a: ['Higher supply static', 'Crawlspace air — moisture, odors, spores — drawn into the system and delivered to the living space', 'Frozen evaporator coils', 'Compressor overheating'],
            correct: 1,
            exp: 'Return leaks inhale whatever surrounds them. The duct system becomes a delivery service for the worst air in the building.',
          },
          {
            q: 'A master bedroom is always stuffy with the door closed, fine with it open. The classic fix is:',
            a: ['A bigger supply register', 'A return path — undercut the door or add a transfer/jump grille', 'Higher blower speed', 'A dedicated thermostat'],
            correct: 1,
            exp: 'Closed doors trap supply air and pressurize the room, choking its own airflow. The room needs a way for air to get back out.',
          },
        ],
      },
    ],
    test: [
      { q: 'The cooling airflow rule of thumb is approximately:', a: ['100 CFM/ton', '400 CFM/ton', '1,000 CFM/ton', '50 CFM/ton'], correct: 1, exp: '≈400 CFM per ton (350 humid to 450 dry climates) — the number airflow verification starts from.' },
      { q: 'Airflow must be verified before refrigerant diagnosis because:', a: ['Gauges need airflow to work', 'Wrong airflow distorts splits, pressures, and charging into fiction', 'EPA requires it', 'Refrigerant follows air'], correct: 1, exp: 'Every refrigerant-side reading assumes design airflow; without it you diagnose ghosts.' },
      { q: 'An ECM blower in restrictive ductwork responds by:', a: ['Moving less air quietly', 'Maintaining programmed CFM at higher wattage and noise', 'Shutting down', 'Reversing rotation'], correct: 1, exp: 'ECMs muscle through restriction — masking duct problems as bills, noise, and motor wear.' },
      { q: 'Total external static pressure is measured:', a: ['Inside the compressor', 'With a manometer: return-side suction plus supply-side pressure vs the equipment rating', 'At the furthest register', 'Across the condenser'], correct: 1, exp: 'TESP is the pressure the blower fights outside the cabinet — typically rated ~0.5 in. w.c. residential.' },
      { q: 'The pressure-drop hunt across a high-static system checks, in order:', a: ['Compressor, condenser, TXV', 'Filter, evaporator coil, then the duct runs themselves', 'Thermostat, contactor, capacitor', 'Registers only'], correct: 1, exp: 'Localize like voltage drop: measure across each candidate restriction and see who eats the budget.' },
      { q: 'The most common residential duct deficiency is:', a: ['Oversized returns', 'Undersized or restricted return air paths', 'Too much metal duct', 'Excess dampers'], correct: 1, exp: 'Starved returns suffocate systems: high static, low CFM, frozen coils, cooked heat exchangers.' },
      { q: 'Sagging, kinked flex duct matters because:', a: ['It looks unprofessional', 'Short bad flex runs can out-restrict long runs of decent duct', 'It leaks refrigerant', 'It only affects heating'], correct: 1, exp: 'Flex performs when taut and supported; festooned or kinked it becomes the system\'s biggest resistor.' },
      { q: 'Choosing a MERV 13 filter for a system means:', a: ['Nothing else changes', 'Budgeting its higher pressure drop — usually with a deeper, larger media cabinet', 'Cleaning it monthly', 'Faster blower speeds automatically'], correct: 1, exp: 'Real filtration costs static. Surface area (deep media cabinets) buys it back.' },
      { q: 'Supply duct leakage into an attic causes:', a: ['House pressurization', 'Lost capacity and house depressurization that pulls in infiltration', 'Better attic ventilation', 'Lower bills'], correct: 1, exp: 'Paid-for conditioned air heats the attic while the house sucks in outdoor/crawl air to replace it.' },
      { q: 'Room-by-room airflow is properly balanced using:', a: ['Register grilles fully closed where too cold', 'Branch dampers at takeoffs, verified by measurement or systematic comfort checks', 'Blower speed changes per complaint', 'Closing doors'], correct: 1, exp: 'Dampers at the takeoff balance without grille noise; closing registers just raises static.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 15 — SPLIT SYSTEMS & HEAT PUMPS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'hvac-split-heatpumps',
    num: 15,
    title: 'Split Systems & Heat Pumps',
    desc: 'The workhorse of comfort cooling: split system anatomy, heat pumps and reversing valves, defrost, and charging by the correct method.',
    slides: [
      {
        title: 'Split System Anatomy',
        body: [
          'A split system divides the refrigeration circuit between two boxes: the outdoor unit (compressor, condenser coil, condenser fan) and the indoor section (evaporator coil sitting on a furnace or inside an air handler), joined by the line set — a small insulated suction line and a smaller liquid line. Everything from the refrigeration core modules applies directly; what changes is geography, and geography creates the split system\'s characteristic service points.',
          'The line set is a component, not just plumbing: length and elevation limits come from the manufacturer (oil must return to the compressor up long risers), the suction line must stay insulated end to end (bare suction line = capacity loss and sweating), and flare or brazed joints at four ends are the classic leak sites. Add the two service valves at the outdoor unit — your gauge connections and system isolation points.',
          'Indoor, the evaporator coil lives with the airflow lessons of Module 14: an A-coil matted with dust behaves exactly like a starved return. Under it sits the condensate system — primary drain with trap, and either a secondary drain, an overflow pan, or a float switch that kills cooling before the ceiling gets wet. Clogged condensate drains are among the most common summer calls; a float switch that opened is a system that "died" with a two-minute fix and an underlying drain-cleaning job.',
          'Outdoor, the condenser lives the kitchen condenser\'s life in gentler form: cottonwood fluff, grass clippings, and dog-run dust instead of grease. Coil cleaning, straight fins, and two feet of clearance are the PM basics. The controls in the outdoor box — contactor, dual run capacitor (fan + compressor in one can), and increasingly an inverter drive — are the Module 10/11 electrical skill set verbatim: the dual capacitor is the single most-replaced part in residential air conditioning.',
        ],
        keyPoints: [
          'Line set rules: length/elevation limits, insulated suction line, joints are the leak sites',
          'Condensate management: traps, float switches — a tripped float is a "dead" system with a drain problem',
          'The dual run capacitor is the most-replaced part in residential AC — test, don\'t guess',
          'Outdoor coil hygiene and clearance are the PM backbone, same physics as kitchen condensers',
        ],
        quiz: [
          {
            q: 'An AC quit on the hottest day; the air handler is fine but the outdoor unit hums briefly and stops. The compressor and fan share one dual run capacitor reading 2µF on a 45/5 rating. The repair is:',
            a: ['A new compressor', 'Replace the dual capacitor and verify start/run current afterward', 'Recharge the system', 'A new contactor'],
            correct: 1,
            exp: 'A collapsed dual capacitor strands both motors. It is the most common single failure in residential cooling — and the cheapest.',
          },
          {
            q: 'Cooling stopped, and you find the secondary drain pan float switch open with the pan full of water. The correct service is:',
            a: ['Bypass the float and restore cooling', 'Clear the primary condensate drain, dry the pan, verify flow, and leave the float in service', 'Replace the float switch', 'Add a bigger pan'],
            correct: 1,
            exp: 'The float did its job: it stopped a ceiling flood. The repair is the drain blockage; bypassing the protection invites the water damage it prevented.',
          },
          {
            q: 'A long bare (uninsulated) suction line through a hot attic causes:',
            a: ['Higher subcooling', 'Capacity loss and sweating — the cool vapor absorbs attic heat before reaching the compressor', 'Liquid slugging', 'Nothing significant'],
            correct: 1,
            exp: 'Suction insulation preserves the refrigeration effect and prevents condensation. Bare line trades cooling for attic heating and drips.',
          },
        ],
      },
      {
        title: 'Heat Pumps: The Cycle Runs Both Ways',
        body: [
          'A heat pump is an air conditioner with a reversing valve: a four-way valve that swaps which coil is the evaporator and which is the condenser. Summer: indoor coil evaporates (cools the house), outdoor coil condenses. Winter: outdoor coil evaporates — absorbing heat from cold outdoor air (there is heat in 20°F air; the refrigerant just has to boil colder than that) — and the indoor coil condenses, heating the house. Same four components, same PT chart, plus a valve, a second metering path, and control logic.',
          'The reversing valve is controlled by a solenoid (energized in cooling for most brands — the O terminal; a few use B, energized in heating). Its failures: stuck mid-position (both lines lukewarm, capacity terrible in both modes), refusing to shift (heating when cooling is called or vice versa — check the solenoid coil and the O/B thermostat signal before condemning the valve), and internal leakage (hot gas bypassing to suction: looks like a weak compressor — a temperature check across the valve\'s tubes finds it, more than a few degrees difference between the lines that should match means leakage).',
          'Winter brings defrost: the outdoor coil runs below freezing and frosts exactly like a freezer evaporator (Module 14 of the kitchen course, outdoors). Heat pumps defrost by briefly reversing into cooling mode — hot gas through the outdoor coil — while shutting the outdoor fan and firing auxiliary heat indoors so the supply air does not blow cold. Steam rising off the outdoor unit for a couple of minutes is NORMAL defrost, a fact that generates no-fault service calls every winter. Failed defrost (bad sensor/board or stuck valve) shows as an outdoor unit encased in ice — which then destroys capacity and can break fan blades.',
          'Auxiliary heat completes the winter system: electric strips (or a furnace in dual-fuel setups) that cover defrost cycles, deep-cold shortfall, and emergency operation if the compressor dies. Aux/emergency heat is expensive heat — strips draw brutal amperage — so a heat pump "working fine" on strips alone is a broken heat pump with a hidden electric bill. Check strip staging, and when a customer reports high winter bills with good comfort, suspect the compressor side quietly dead and the strips silently carrying the house.',
        ],
        keyPoints: [
          'Reversing valve swaps coil roles; O terminal solenoid (usually energized in cooling) controls it',
          'Valve leakage mimics a weak compressor — temperature-check across the valve lines',
          'Steam off the outdoor unit in winter = normal defrost; an ice-encased unit = failed defrost',
          'High winter bills + good comfort = suspect strips silently carrying a dead compressor',
        ],
        quiz: [
          {
            q: 'A heat pump heats poorly and cools poorly; compressor amps are normal, and two lines at the reversing valve that should match temperature differ by 15°F. The diagnosis is:',
            a: ['Low charge', 'Internal reversing valve leakage bypassing hot gas to suction', 'A weak compressor', 'A failed defrost board'],
            correct: 1,
            exp: 'Hot gas leaking across the valve robs both modes and imitates compressor weakness. The temperature signature across the valve is the test that separates them.',
          },
          {
            q: 'A customer reports their heat pump "smoking" in winter; you find brief clouds off the outdoor unit every hour or so, then normal running. This is:',
            a: ['A refrigerant leak flashing', 'Normal defrost cycles boiling frost off the coil', 'An electrical fire beginning', 'Crankcase heater failure'],
            correct: 1,
            exp: 'Defrost reverses hot gas through the frosted outdoor coil, and the melting frost flashes to vapor — a cloud of steam, not smoke.',
          },
          {
            q: 'A heat pump home\'s comfort is fine but winter electric bills doubled. The productive suspicion is:',
            a: ['The utility misread the meter', 'The compressor side has failed and electric auxiliary strips are silently carrying the heating load', 'The thermostat is miscalibrated', 'The ducts grew leaks'],
            correct: 1,
            exp: 'Strips maintain comfort at several times the cost of compressor heat. "Fine but expensive" is the classic silent-failure signature — check what is actually running.',
          },
        ],
      },
      {
        title: 'Charging Split Systems and Meeting Mini-Splits',
        body: [
          'Charging method follows the metering device — the rule from the refrigeration core, now with HVAC\'s names on it. TXV systems: charge to SUBCOOLING (the valve holds superheat steady, so superheat cannot tell you about charge; the liquid line\'s subcooling against the data-plate target — typically 8-12°F — is the truth). Fixed-orifice/piston systems: charge to SUPERHEAT against the manufacturer\'s chart indexed by outdoor temperature and return-air wet bulb (Module 13 pays off here). Weigh-in remains the gold standard whenever the charge is being set from empty, adjusted for line set length beyond the factory allowance.',
          'The charging prerequisites are non-negotiable and mostly Module 14: verified airflow, clean coils, correct blower speed, and stable operating conditions (run ten-plus minutes; do not charge in weather extremes the tables exclude). More residential systems are mischarged by gauge-jockey guessing than by leaks: the discipline of subcooling/superheat targets plus a scale is what separates charging from gambling.',
          'Mini-splits (ductless) compress the whole trade into a wall unit: inverter-driven variable-speed compressors, electronic expansion valves, communicating controls between head and outdoor unit, and factory charges for a specified line length (weigh in the difference for longer runs — many mini-splits have no practical field-charging tables at all: weigh or evacuate-and-weigh). Their service quirks: error codes count blink patterns on the head unit, condensate pumps in ceiling cassettes fail like all condensate pumps, blower wheels grow biological fur that demands deep cleaning, and communication faults between units imitate everything (check the interconnect wiring polarity and integrity early).',
          'VRF/VRV (variable refrigerant flow) scales the mini-split idea to whole buildings — one outdoor system, many indoor heads, refrigerant routed and metered by branch controllers, some systems moving heat between zones simultaneously. Entry-level scope: recognize the architecture, respect that diagnosis leans on manufacturer software and training, and know that the fundamentals you own (electrical, airflow, psychrometrics, refrigeration physics) remain the ground truth those tools sit on. Manufacturer certification is the ticket into VRF work — a Module 25 career note planted early.',
        ],
        keyPoints: [
          'TXV → charge by subcooling; fixed orifice → superheat charts; from-empty → weigh in',
          'Charging prerequisites: verified airflow, clean coils, stable run — or the numbers lie',
          'Mini-splits: factory charge + weigh-in adjustments, blink-code diagnostics, communication faults',
          'VRF is manufacturer-certified territory; your fundamentals are the ground truth under its tools',
        ],
        quiz: [
          {
            q: 'A TXV-equipped split system needs its charge verified. The correct target is:',
            a: ['Superheat at the evaporator', 'Subcooling at the liquid line against the data-plate target', 'Suction pressure of 70 psi', 'A full sight glass'],
            correct: 1,
            exp: 'The TXV holds superheat constant regardless of charge, hiding charge errors from superheat. Subcooling reveals what the condenser is stacking.',
          },
          {
            q: 'A mini-split needs refrigerant after a repair; the line run is 40 ft and the factory charge covers 25 ft. The correct procedure is:',
            a: ['Charge to 10°F subcooling', 'Evacuate and weigh in the factory charge plus the manufacturer\'s per-foot adder for the extra 15 ft', 'Add gas until the head gets cold', 'Charge to the beer-can-cold suction line'],
            correct: 1,
            exp: 'Inverter mini-splits defy conventional charging tables. Weight is the method: factory charge plus the published grams-per-foot for line length beyond allowance.',
          },
        ],
      },
    ],
    test: [
      { q: 'A split system\'s line set consists of:', a: ['Two electrical conduits', 'An insulated suction line and a smaller liquid line', 'A gas pipe and a drain', 'Supply and return ducts'], correct: 1, exp: 'The two refrigerant lines join the outdoor and indoor sections; suction stays insulated end to end.' },
      { q: 'The most commonly replaced electrical part in residential AC is:', a: ['The contactor coil', 'The dual run capacitor', 'The transformer', 'The defrost board'], correct: 1, exp: 'One can serves compressor and fan; when it collapses, the outdoor unit hums and stalls.' },
      { q: 'A tripped condensate float switch means:', a: ['Replace the switch', 'The primary drain is blocked — the switch prevented water damage', 'Low refrigerant', 'The evaporator froze'], correct: 1, exp: 'The float kills cooling before the pan overflows. Clear the drain; never bypass the protection.' },
      { q: 'A heat pump moves heat in winter by:', a: ['Electric strips only', 'Evaporating refrigerant in the cold outdoor coil to absorb outdoor heat, condensing indoors', 'Reversing the blower', 'Burning refrigerant'], correct: 1, exp: 'The reversing valve makes the outdoor coil the evaporator — boiling colder than the outdoor air to soak up its heat.' },
      { q: 'The reversing valve is shifted by:', a: ['Gas pressure from the manifold', 'A solenoid driven by the thermostat O (or B) signal', 'The defrost thermostat', 'Manual lever'], correct: 1, exp: 'O energizes in cooling on most brands; verify the signal and solenoid before condemning the valve body.' },
      { q: 'Brief steam clouds off an outdoor heat pump unit in winter indicate:', a: ['Compressor burnout', 'Normal defrost melting coil frost', 'A dangerous refrigerant leak', 'Crankcase overheating'], correct: 1, exp: 'Defrost sends hot gas through the frosted coil; melt water flashes to visible vapor — expected behavior.' },
      { q: 'An outdoor unit encased solid in ice indicates:', a: ['Normal cold-weather operation', 'Failed defrost (sensor, board, or valve) requiring service', 'Overcharge', 'A snowstorm only'], correct: 1, exp: 'Working defrost keeps coils clear. An ice-block unit has lost defrost and is losing capacity and fan blades.' },
      { q: 'On a fixed-orifice system, charge is verified by:', a: ['Subcooling', 'Superheat against the manufacturer chart (outdoor temp + return wet bulb indexed)', 'Liquid line temperature alone', 'Compressor amps'], correct: 1, exp: 'Without a modulating valve, superheat responds to charge; the chart indexes the target to conditions.' },
      { q: 'Charging any system before verifying airflow is wrong because:', a: ['EPA prohibits it', 'Airflow errors distort superheat, subcooling, and pressures — you charge to a lie', 'Gauges read backwards', 'It voids the thermostat warranty'], correct: 1, exp: 'Module 14\'s rule: the refrigerant readings assume design CFM. Fix air first.' },
      { q: 'Mini-split systems beyond their factory line-length allowance are charged by:', a: ['Sight glass', 'Weighing in the published grams/ounces per additional foot', 'Subcooling to 20°F', 'Running until the coil sweats'], correct: 1, exp: 'Inverter systems defeat table-based charging; the scale and the manufacturer\'s per-foot adder are the method.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 16 — PACKAGED ROOFTOP UNITS & ECONOMIZERS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'hvac-rtus',
    num: 16,
    title: 'Packaged Rooftop Units & Economizers',
    desc: 'The commercial workhorse: everything in one curb-mounted box — cooling stages, gas heat, and the free-cooling economizer that is usually broken.',
    slides: [
      {
        title: 'The RTU: A Whole System in a Box',
        body: [
          'A packaged rooftop unit (RTU) is the entire split system plus the furnace plus the blower in one weatherproof cabinet on a roof curb: condenser section and compressors on one end, evaporator coil and blower in the airstream, a gas heat section (or electric strips / heat pump circuit), filters, an outdoor-air hood, and a control panel — with supply and return duct openings dropping through the curb into the building. Most light-commercial buildings you will ever serve — strip malls, restaurants (your kitchen customers\' dining rooms), offices, dollar stores — run on RTUs from 3 to 25+ tons.',
          'Roof work reframes safety before anything else: ladder/hatch discipline, distance from unprotected edges, weather exposure, and the electrical realities of 208/230/460V three-phase equipment with a disconnect at the unit (LOTO applies on a roof exactly as in a kitchen). Add the RTU-specific traps: belt-drive blowers with real pulleys (fingers), spring-loaded access panels in wind, and hot roofs in summer — hydrate and schedule accordingly.',
          'Capacity in commercial RTUs comes in stages: two or more compressors (sometimes with unloaders or variable-speed) on separate refrigeration circuits, and multi-stage gas valves or burner racks. Staging is the diagnostic gift: circuits are independent, so a unit "cooling but not keeping up" may simply be running on one of two circuits — check each circuit\'s pressures and amp draws separately, and check that the thermostat/controls are actually calling second stage. Half of "weak RTU" complaints are one dead circuit or one stage never commanded.',
          'The RTU service rhythm is a PM checklist with Module 14 and refrigeration-core DNA: filters (often neglected into collapse), belt condition and tension, pulley alignment, blower and motor bearings, both coils cleaned (condenser coils on roofs collect exactly what the neighborhood exhausts — including your kitchen hoods\' grease two curbs over), condensate drains and traps (RTU traps must match the unit\'s negative/positive pressure design or they suck air instead of draining), contactor/capacitor checks per circuit, and heat exchanger inspection before every heating season.',
        ],
        keyPoints: [
          'RTU = complete system on a curb; most light-commercial buildings run on them',
          'Roof safety first: edges, weather, three-phase LOTO at the unit disconnect',
          'Staged capacity: check each circuit and each stage separately — half of "weak" is one dead stage',
          'PM rhythm: filters, belts, coils, condensate traps matched to cabinet pressure, per-circuit electrical',
        ],
        quiz: [
          {
            q: 'A 10-ton, two-circuit RTU "cools but never catches up" on hot afternoons. Circuit 1 runs normal pressures; circuit 2\'s compressor contactor never pulls in although the thermostat calls Y2. The problem class is:',
            a: ['Undersized unit', 'A second-stage control/electrical fault — one circuit is doing the whole job', 'Low charge in circuit 1', 'Dirty filters'],
            correct: 1,
            exp: 'Independent circuits mean independent diagnosis. Half of weak-RTU complaints are a stage that is never commanded or never engages.',
          },
          {
            q: 'An RTU condensate trap on a draw-through (negative pressure) blower design is missing. The result is:',
            a: ['Faster drainage', 'The drain sucks air instead of draining — condensate backs up into the cabinet and overflows', 'No effect', 'Higher static pressure only'],
            correct: 1,
            exp: 'Negative cabinet pressure pulls air up an untrapped drain, holding water in the pan. The trap depth must match the design static.',
          },
        ],
      },
      {
        title: 'Economizers: Free Cooling and Why It Is Usually Broken',
        body: [
          'An economizer is the RTU\'s free-cooling machine: a set of outdoor-air and return-air dampers with an actuator and logic that, when outdoor air is cool and dry enough, cools the building with outside air instead of compressors. Restaurants and offices generate cooling load year-round — an economizer can carry the whole load through mild weather and shoulder seasons at fan-only cost. On paper it is the highest-ROI device on the roof; in the field, studies keep finding the majority broken, stuck, or disabled — which makes economizer literacy a genuine service differentiator.',
          'How it decides: a changeover strategy compares outdoor air against a limit (dry-bulb changeover) or against return air (differential), with better systems using enthalpy sensors that account for humidity (Module 13: cool-but-muggy outdoor air is not free cooling — its latent load lands on the coil later). When outdoor conditions qualify and cooling is called, the actuator modulates outdoor dampers open — often satisfying first-stage cooling entirely; compressors stage on only if free cooling falls short.',
          'The failure catalog: seized or disconnected actuators (the #1 — motors dead, linkages flopping), dampers rusted or bird-nested, sensors drifted or unplugged, controls mis-set (changeover set so low it never engages — a polite way to disable it), and the vandalism class: dampers screwed shut by someone tired of complaints. Two honest minutes with the actuator (command it via the controller or jumper per the manual, watch the dampers travel) plus a sensor sanity check tells you the whole story.',
          'The minimum-position duty matters even more than free cooling: economizer dampers also provide the building\'s code-required minimum outdoor air during occupied hours (Module 19 territory). Dampers screwed shut do not just waste compressor energy — they cut off the building\'s ventilation, and stuffy-air/CO2 complaints follow. Every economizer repair verifies three states: minimum position at occupied idle, free-cooling modulation when conditions qualify, and full return to minimum when they do not.',
        ],
        keyPoints: [
          'Economizers cool with outdoor air when it qualifies — highest-ROI, most-broken device on the roof',
          'Enthalpy (humidity-aware) changeover beats dry-bulb: muggy "cool" air is not free cooling',
          'Actuator travel test + sensor sanity check = the whole diagnosis in minutes',
          'Dampers also deliver code minimum outdoor air — screwed-shut dampers are a ventilation violation',
        ],
        quiz: [
          {
            q: 'An office complains of afternoon stuffiness and high CO2 readings; on the roof you find the economizer dampers screwed shut with deck screws. Beyond removing them, you must:',
            a: ['Nothing — free cooling is optional', 'Restore and verify the minimum outdoor-air position, since the dampers provide the building\'s required ventilation', 'Replace the RTU', 'Set changeover to 40°F'],
            correct: 1,
            exp: 'Minimum position is the building\'s code ventilation. Screwing dampers shut silenced a drafts complaint by suffocating the occupants.',
          },
          {
            q: 'On a 55°F very humid morning, a dry-bulb-changeover economizer floods the space with outdoor air and the space gets clammy. The upgrade that fixes this behavior class is:',
            a: ['A bigger actuator', 'Enthalpy (humidity-aware) changeover sensing', 'Lower changeover setpoint', 'Locking the dampers at minimum'],
            correct: 1,
            exp: 'Dry-bulb logic sees 55°F as free cooling; enthalpy logic sees the moisture and declines. Module 13 in a sheet-metal costume.',
          },
        ],
      },
      {
        title: 'RTU Controls, Curbs, and the Roof Environment',
        body: [
          'RTU controls span three generations you will meet on the same roof: conventional thermostat wiring (R, Y1, Y2, W1, W2, G straight to the unit), unit-mounted control boards with fault LEDs and staging logic, and BAS-connected units (Module 21) where a building system commands the unit and your thermostat instincts must route through a controller. Identify which generation you are on before diagnosing — a "no cooling" on a BAS unit may be a schedule or setpoint upstream, not a fault in the box.',
          'Phase matters on the roof: three-phase compressors and blowers die from single-phasing (Module 11\'s lost-leg lesson at building scale) and reverse rotation. Scroll compressors run backwards if phase sequence is reversed after utility work or a disconnect swap — loud, no pumping, and quickly fatal; a phase-rotation meter confirms sequence when anything three-phase was touched. Voltage imbalance between legs above a few percent overheats motor windings — measure all three phase pairs, not just one.',
          'The curb and its geography are part of the machine: duct connections must seal to the curb (leaky curbs condition the roof deck and whistle), penetrations flashed, condensate routed to a drain and not across walkways (winter ice), gas piping supported with drip legs and sediment traps, and clearances respected for coil air and service access. Note the neighbors too: an RTU downwind of a kitchen exhaust fan inherits a grease-loaded condenser — the cross-trade insight that ties your two customer bases together.',
          'Economizer, staging, phase, curb: the RTU rewards the checklist mind. Its owner rarely sees it, so it fails invisibly until comfort collapses — the strongest PM sales story in commercial HVAC, and the equipment where your kitchen-side discipline (document, photograph, recommend in writing) converts directly into contract revenue.',
        ],
        keyPoints: [
          'Identify the control generation first: thermostat-wired, board-managed, or BAS-commanded',
          'Three-phase discipline: check rotation after any disconnect work; measure imbalance across all legs',
          'Scroll compressors run backwards on reversed phase sequence — loud, not pumping, quickly fatal',
          'Curb integrity, gas drip legs, condensate routing, and exhaust-fan neighbors are part of the unit',
        ],
        quiz: [
          {
            q: 'After an electrician replaced an RTU disconnect, the scroll compressor is suddenly loud and moves no refrigerant. The first check is:',
            a: ['Refrigerant charge', 'Phase rotation — a reversed sequence spins scrolls backwards', 'The run capacitor', 'The defrost board'],
            correct: 1,
            exp: 'Reversed phase sequence after electrical work is the classic backwards-scroll story: noise, no pumping, imminent failure. Rotation meter, then swap two legs.',
          },
          {
            q: 'A BAS-connected RTU has "no cooling" but the unit tests perfectly in manual/test mode. The next investigation is:',
            a: ['Replace the unit board', 'Upstream: the BAS schedule, setpoints, or commands to the unit', 'The economizer actuator', 'The curb seal'],
            correct: 1,
            exp: 'A healthy unit awaiting commands points up the control chain — the building system\'s schedule or setpoint is the "fault."',
          },
        ],
      },
    ],
    test: [
      { q: 'A packaged RTU contains:', a: ['Only the condenser section', 'The complete cooling system, heat section, and blower in one curb-mounted cabinet', 'Only air handling', 'Just the economizer'], correct: 1, exp: 'Everything in one box on the roof, with supply/return dropping through the curb.' },
      { q: 'Multi-circuit RTU diagnosis requires:', a: ['Checking only circuit 1', 'Evaluating each refrigeration circuit and each commanded stage independently', 'Averaging both circuits\' pressures', 'Doubling gauge readings'], correct: 1, exp: 'Circuits are independent systems; a dead second stage masquerades as a weak unit.' },
      { q: 'An untrapped condensate drain on a negative-pressure RTU section:', a: ['Drains faster', 'Sucks air and holds water in the pan until it overflows', 'Needs no trap', 'Improves airflow'], correct: 1, exp: 'The blower\'s suction defeats gravity in an untrapped drain; trap depth must exceed cabinet static.' },
      { q: 'An economizer provides free cooling by:', a: ['Extra compressor stages', 'Cooling with qualifying outdoor air through modulating dampers before compressors run', 'Bypassing the evaporator', 'Night operation only'], correct: 1, exp: 'When outdoor air is cool/dry enough, dampers deliver it as first-stage cooling at fan-only cost.' },
      { q: 'Enthalpy changeover improves on dry-bulb changeover by:', a: ['Reacting faster', 'Accounting for humidity so muggy "cool" air is not treated as free cooling', 'Using less power', 'Eliminating sensors'], correct: 1, exp: 'Latent load makes humid outdoor air expensive later; enthalpy logic sees total heat, not just temperature.' },
      { q: 'Economizer dampers at minimum position during occupied hours provide:', a: ['Free cooling', 'The building\'s code-required outdoor ventilation air', 'Exhaust relief', 'Defrost air'], correct: 1, exp: 'Minimum outdoor air is a ventilation duty, independent of free cooling — screwed-shut dampers violate it.' },
      { q: 'The fastest economizer health check is:', a: ['A year of trend logs', 'Commanding the actuator and watching damper travel, plus a sensor sanity check', 'Replacing the logic module', 'Smoke testing the ducts'], correct: 1, exp: 'Two minutes: does it move through its range on command, and do the sensors read reality?' },
      { q: 'Voltage imbalance on a three-phase RTU should be checked by measuring:', a: ['One phase pair', 'All three phase-to-phase pairs and comparing', 'Phase to ground only', 'Amps only'], correct: 1, exp: 'Imbalance beyond a few percent overheats windings; it only shows when all pairs are compared.' },
      { q: 'Gas piping at an RTU requires:', a: ['Flexible connector only', 'Support, a drip leg/sediment trap, and proper flashing at penetrations', 'Copper tubing', 'No shutoff on roofs'], correct: 1, exp: 'Standard gas discipline follows the pipe onto the roof — plus weather integrity at every penetration.' },
      { q: 'An RTU downwind of a kitchen exhaust fan will suffer:', a: ['Nothing — roofs are open air', 'A grease-loaded condenser coil needing kitchen-style cleaning attention', 'Higher gas pressure', 'Economizer over-cooling'], correct: 1, exp: 'The kitchen\'s exhaust becomes the RTU\'s intake problem — the cross-trade condenser story continues.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 17 — FURNACES & HEATING SYSTEMS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'hvac-heating',
    num: 17,
    title: 'Furnaces & Heating Systems',
    desc: 'Gas furnaces — sequence of operation, heat exchangers, and the safety chain — plus electric heat. The gas module skills, applied to the box that heats buildings.',
    slides: [
      {
        title: 'The Gas Furnace Sequence of Operation',
        body: [
          'Everything from the gas systems module (kitchen course Module 18 / your combustion training) applies — furnaces just run it in a strict, diagnosable order. Memorize the modern sequence: (1) Thermostat calls W. (2) Control board runs safety pre-checks and starts the INDUCER (draft) motor. (3) The PRESSURE SWITCH proves the inducer is actually moving flue gases — no proof, no ignition. (4) Igniter energizes (hot-surface glow or spark) after any pre-purge. (5) GAS VALVE opens; burners light. (6) FLAME SENSOR proves flame within seconds via flame rectification — the microamp signal you already know. (7) Burners heat the HEAT EXCHANGER for a set delay, then the BLOWER starts, pushing house air across the exchanger. (8) Call ends: gas closes, inducer post-purges, blower runs off its delay.',
          'The sequence is the diagnostic map because the board halts at the failed step: no inducer = board/power/motor; inducer runs but no ignition = pressure switch chain (the switch itself, but more often what it is honestly reporting — blocked flue or intake, failed inducer performance, blocked condensate on condensing furnaces, or a cracked hose); ignites then drops = flame sensor (clean the rod, check ground — the kitchen lesson verbatim); lights but blower never comes = board timer or blower circuit; repeated overheat trips = airflow (Module 14: filters, blower, ducts) before anything else.',
          'Furnace boards flash fault codes and store history — read them, but verify like always: a "pressure switch stuck open" code indicts the whole draft-proving chain, not just the switch. Measure: does the inducer draw right amps? Does the switch see its designed negative pressure (inches w.c. — your manometer again) at its hose? Is the flue clear? The switch is the messenger; shooting it is the amateur move (jumping it out is the dangerous one — never leave a bypassed pressure switch).',
          'High-efficiency (90%+) condensing furnaces add a second heat exchanger that wrings latent heat from flue gases until they condense — hence PVC venting (cool acidic flue gas), a condensate system with its own drain/trap/pump duties (kitchen condensate lessons apply, including the float-switch-style blockages), and intake piping that can pull outdoor combustion air. Their extra no-heat causes: blocked/frozen condensate lines and vent terminations (snow, ice, wasp nests) — walk the venting on every condensing-furnace call.',
        ],
        tables: [
          {
            caption: 'Sequence stall points → suspects',
            headers: ['Where it stalls', 'Suspect chain'],
            rows: [
              ['No inducer', 'Power, board, inducer motor'],
              ['Inducer runs, no ignition', 'Pressure switch chain: flue/intake blockage, inducer weak, condensate, hose, switch'],
              ['Lights then drops out', 'Flame sensor rod / burner ground (microamps)'],
              ['Heats, blower never starts', 'Board delay/relay, blower motor/capacitor'],
              ['Cycles on high-limit', 'AIRFLOW: filter, blower wheel, ducts — then the limit itself'],
            ],
          },
        ],
        keyPoints: [
          'Learn the sequence cold: thermostat → inducer → pressure switch → igniter → gas → flame proof → blower',
          'The board stalls at the failed step — the sequence is the diagnostic map',
          'Pressure switch codes indict the draft chain, not just the switch; never leave one bypassed',
          'Condensing furnaces add condensate and PVC-vent failure modes — walk the venting every call',
        ],
        quiz: [
          {
            q: 'A furnace\'s inducer runs continuously but ignition never attempts; the board flashes a pressure-switch fault. Your manometer shows the switch hose seeing only -0.2 in. w.c. against a -0.7 rating, and the flue termination is packed with a bird nest. The correct repair is:',
            a: ['Replace the pressure switch', 'Clear the flue blockage and re-verify draft — the switch was honestly reporting failed draft', 'Jumper the switch to restore heat', 'Replace the inducer'],
            correct: 1,
            exp: 'The switch is the messenger of the draft system. The blockage was the fault; a jumpered switch would have vented flue gas into the home.',
          },
          {
            q: 'A furnace lights beautifully, runs eight seconds, and shuts down, three times to lockout. The highest-probability fix is:',
            a: ['A new gas valve', 'Clean the flame sensor rod and verify burner ground', 'Raise gas pressure', 'A new control board'],
            correct: 1,
            exp: 'The kitchen lesson exactly: flame present, microamp proof too weak. The oxide-coated rod is furnace service\'s most common two-minute repair.',
          },
          {
            q: 'A 96% condensing furnace quits during a hard freeze; the board shows pressure-switch faults. A check specific to this furnace class is:',
            a: ['The thermocouple', 'Frozen/blocked condensate drainage and iced intake/vent terminations', 'The standing pilot', 'Belt tension'],
            correct: 1,
            exp: 'Condensing furnaces make water and breathe through PVC. Ice in the condensate trap or at the terminations blocks draft proof — the winter classic.',
          },
        ],
      },
      {
        title: 'Heat Exchangers, Limits, and the Safety Chain',
        body: [
          'The heat exchanger is the wall between fire and the air people breathe: combustion on one side, house air on the other. A crack or rupture breaches that wall — flue gases (CO among them) can mix into supply air, and blower pressure can disturb burner flames. Inspection is a heating-season duty: visual with mirrors/borescope where access allows, flame-disturbance watch when the blower starts (flames that dance or roll out at blower start suggest a breach), and combustion analysis (Module 18 skills — rising CO or erratic O2 when the blower runs is instrumental evidence).',
          'Condemning a heat exchanger is a serious, documented act: it typically ends the furnace (exchanger replacement labor approaches replacement cost on older units) and it carries safety weight both ways — missing a real crack risks lives; inventing one to sell a furnace is the industry\'s ugliest fraud. The standard: see it (photograph it), or prove it instrumentally, and put it in writing. If a unit is condemned, gas off per your authority, red-tag procedure, and the customer informed in writing.',
          'The limit family backs up the exchanger: the HIGH-LIMIT switch (opens on plenum overtemperature — cycling limits mean airflow problems first, always), ROLLOUT switches at the burner compartment (flames escaping forward — a proved rollout is evidence of blockage or exchanger breach and is manual-reset for a reason: find the cause, never just reset), and AUXILIARY/blocked-vent limits per design. The kitchen fryer rule generalizes: a safety that tripped is a witness, not a suspect; interrogate the system, not the switch.',
          'Venting completes combustion safety: natural-draft B-vent (hot flue gas rises — spillage tests at the draft hood after several minutes of running matter), induced-draft 80% furnaces (the inducer + pressure switch you know), and direct-vent condensing systems (sealed PVC intake and exhaust). Any vent-connector corrosion, white staining, backdraft streaking, or spillage evidence is a report-and-correct item — and every gas-heat call in a tight modern house should keep the make-up-air lesson in mind: exhaust appliances and furnaces compete for the same air.',
        ],
        keyPoints: [
          'The exchanger separates fire from breathing air; inspect visually AND instrumentally (CO under blower)',
          'Condemnation standard: see it or prove it, photograph it, put it in writing — both errors are grave',
          'Cycling high-limits = airflow first; a tripped rollout = find the cause, never just reset',
          'Vent evidence (corrosion, staining, spillage) is a report-and-correct item every time',
        ],
        quiz: [
          {
            q: 'Burner flames visibly dance and lift when the blower kicks in, and your analyzer shows CO in the supply airstream climbing after blower start. This indicates:',
            a: ['Normal induced-draft behavior', 'A breached heat exchanger allowing blower air and combustion to interact — condemnation-grade evidence', 'A weak flame sensor', 'Oversized ductwork'],
            correct: 1,
            exp: 'Blower-coupled flame disturbance plus CO migration into supply air is the instrumental signature of a breach: document, red-tag per procedure, written notice.',
          },
          {
            q: 'A furnace repeatedly trips its high-limit. The professional order of investigation is:',
            a: ['Replace the limit switch first', 'Airflow: filter, blower wheel, duct restrictions — then verify the limit\'s rating and operation', 'Lower the gas pressure', 'Add a bigger blower motor'],
            correct: 1,
            exp: 'Limits trip because plenums overheat, and plenums overheat from starved airflow. The switch is the witness — Module 14 is the suspect.',
          },
        ],
      },
      {
        title: 'Electric Heat and Dual-Fuel Systems',
        body: [
          'Electric heat is the simple sibling: resistance heat strips (sequenced banks of elements, 5-25kW) in air handlers, either as primary heat or as a heat pump\'s auxiliary. The physics is Module 11 verbatim — elements, R = V²/P, airflow protection — at bigger amperage: a 15kW strip bank at 240V draws over 60A, which is why strips stage on via SEQUENCERS (time-delay relays or board control bringing banks on in steps) rather than slamming on at once, and why wire, breaker, and lug condition at the air handler deserve real inspection (heat + high amps + decades = burned lugs and melted whips).',
          'Electric-heat diagnosis is honest and fast: verify the call, then per bank check sequencer operation, element continuity (predictable resistance from the kW rating), the inline fuses/breakers on the heater kit, and the airflow safeties (thermal limits and fusible links protecting against blower failure — a blown fusible link means find the overheat cause, the fryer rule again). Melted or burned components get replaced with correct-gauge, correct-temperature-rating parts — no household wire nuts inside heater kits.',
          'Dual-fuel systems pair a heat pump with a gas furnace: the heat pump carries mild weather economically; below a balance point (or by utility-rate logic) the system switches to gas — and the two never run together onto the same coil (furnace heat would drive the heat pump\'s indoor coil, now a condenser, insane). The control that enforces this (thermostat or board logic with an outdoor sensor) is where dual-fuel faults live: wrong balance point, failed outdoor sensor, or miswired changeover produces either expensive strip/gas overuse or a compressor short-cycling against a firing furnace.',
          'Sizing sanity closes heating: a heat-pump home that "needs" auxiliary strips all winter in a mild climate, or a furnace that short-cycles on its limit in a renovated tight house, are capacity-mismatch stories — sometimes equipment, often envelope changes (new windows, insulation) that outdated equipment sizing no longer matches. You will not re-engineer buildings at entry level, but recognizing "this equipment no longer fits this building" and saying so in writing is the adult version of parts-changing.',
        ],
        keyPoints: [
          'Strips stage via sequencers; 15kW at 240V is 60+ amps — inspect lugs, wire, and connections seriously',
          'Element diagnosis: predictable resistance from kW rating; blown fusible link = find the overheat cause',
          'Dual fuel: heat pump above balance point, gas below, never both — faults live in the changeover logic',
          'Chronic aux-heat reliance or limit short-cycling = capacity/envelope mismatch worth reporting',
        ],
        quiz: [
          {
            q: 'A 10kW, 240V strip bank should draw approximately:',
            a: ['10 A', '42 A', '100 A', '4.2 A'],
            correct: 1,
            exp: 'I = P/V = 10,000 ÷ 240 ≈ 42A. Predicting current and resistance from ratings is the Module 11 skill at heating scale.',
          },
          {
            q: 'On a dual-fuel system, the furnace and the heat pump compressor must not heat simultaneously because:',
            a: ['The breaker cannot carry both', 'Furnace heat entering the indoor coil (acting as the heat pump\'s condenser) drives head pressure destructively high', 'Gas and refrigerant react', 'The thermostat overheats'],
            correct: 1,
            exp: 'In heating, the indoor coil is the heat pump\'s condenser. Feeding it furnace-heated air sends condensing pressure toward trip/failure — changeover logic exists to prevent exactly this.',
          },
        ],
      },
    ],
    test: [
      { q: 'The correct start of a modern gas furnace sequence is:', a: ['Igniter → gas → inducer', 'Thermostat call → inducer → pressure switch proof → igniter → gas valve → flame proof → blower', 'Blower → gas → igniter', 'Gas valve → pressure switch → blower'], correct: 1, exp: 'Draft is proven before ignition, flame before continued gas, heat before the blower — the map every diagnosis follows.' },
      { q: 'The pressure switch on an induced-draft furnace proves:', a: ['Gas pressure', 'That the inducer is producing design draft — flue gases will actually leave', 'Blower speed', 'Thermostat voltage'], correct: 1, exp: 'No draft proof, no ignition. Its faults indict the whole venting/draft chain, not just the switch.' },
      { q: 'Jumping out a pressure switch to restore heat is:', a: ['A standard temporary fix', 'Dangerous and prohibited — it removes the proof that flue gases are venting', 'Fine on 80% furnaces', 'Required for testing'], correct: 1, exp: 'A bypassed draft proof can vent combustion products (CO) into the home. Diagnose the draft; never leave a bypass.' },
      { q: 'A furnace that lights and drops out repeatedly, then locks out, most commonly needs:', a: ['A gas valve', 'Its flame sensor rod cleaned and burner ground verified', 'A new inducer', 'Higher manifold pressure'], correct: 1, exp: 'Weak flame-rectification microamps from an oxidized rod — the most common furnace repair, shared DNA with kitchen ovens.' },
      { q: 'Furnace blower start is delayed after burner light-off because:', a: ['The board is slow', 'The exchanger warms first so the system does not blow cold air', 'Gas needs stabilizing', 'The limit requires it'], correct: 1, exp: 'The heat-exchanger warm-up delay is by design; blower-off delay at cycle end harvests remaining heat.' },
      { q: 'Repeated high-limit trips are investigated first at:', a: ['The gas pressure', 'Airflow: filter, blower wheel, and duct restriction', 'The limit switch itself', 'The thermostat'], correct: 1, exp: 'Plenums overheat when starved of air. The limit is the witness; Module 14 holds the suspects.' },
      { q: 'Condemning a heat exchanger requires:', a: ['Any furnace over 15 years old', 'Visual or instrumental proof (photographed/documented) and written customer notice', 'A second opinion only', 'Manufacturer approval'], correct: 1, exp: 'See it or prove it, document it, write it — the standard that protects lives and honesty alike.' },
      { q: 'A tripped (manual-reset) rollout switch means:', a: ['Reset it and monitor', 'Flames escaped the burner area — find the blockage or breach before any reset restores service', 'The blower failed', 'Low gas pressure'], correct: 1, exp: 'Rollout is evidence of combustion escaping its chamber. The fryer high-limit rule: the safety is a witness, not the fault.' },
      { q: 'Electric heat strips stage on through sequencers because:', a: ['Elements need warm-up', 'Simultaneous multi-bank inrush at 40-100+ amps would hammer the electrical system', 'Thermostats require it', 'Sequencers filter noise'], correct: 1, exp: 'Staging spreads brutal resistive loads over steps — and gives diagnosis a per-bank structure.' },
      { q: 'In a dual-fuel system, below the balance point the system:', a: ['Runs heat pump plus furnace together', 'Switches from heat pump to furnace — the two never heat the same coil simultaneously', 'Uses strips only', 'Shuts down'], correct: 1, exp: 'Gas replaces (never joins) the heat pump below the economic/capacity balance point; the changeover logic is where faults hide.' },
    ],
  },
];
