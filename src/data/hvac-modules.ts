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
];
