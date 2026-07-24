import type { TrainingModule } from './modules';

export const MARINE_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULE 11 — MARINE ELECTRICAL SYSTEMS & ABYC E-11
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'marine-electrical',
    num: 11,
    title: 'Marine Electrical Systems & ABYC E-11',
    desc: 'Shore power, galvanic protection, marine bonding system, and DC panel standards.',
    slides: [
      {
        title: 'Shore Power & Galvanic Protection',
        body: [
          '30A shore power delivers a single 120V hot leg; 50A shore power delivers two 120V hot legs (split-phase, 240V leg-to-leg) — the distinction matters for load balancing and equipment selection.',
          'ABYC E-11 ("AC and DC Electrical Systems on Boats") is the primary voluntary standard; compliance is mandatory for NMMA-certified builds and expected by marine surveyors and insurers.',
          'Reverse polarity at marina pedestals is common — a polarity indicator (red = reversed) must be checked before energizing any onboard loads; operating with reversed polarity creates shock and corrosion hazards.',
          'Galvanic corrosion occurs when dissimilar metals (bronze through-hull, stainless prop shaft, aluminum outboard bracket) submerged in conductive seawater form a galvanic cell — zinc anodes corrode sacrificially to protect other metals.',
          'A galvanic isolator installs in series with the shore power ground wire and uses two diode pairs to block low-level DC galvanic current while passing 60 Hz AC safety ground — ABYC requires a minimum 1.0 V DC blocking capability.',
          'An isolation transformer magnetically couples shore AC to the boat without a physical ground connection, completely eliminating the shore ground path — gold standard for metal-hull vessels and long-term liveaboards.',
          'ELCI (Equipment Leakage Circuit Interrupter) breakers at the shore inlet trip at ~30 mA ground fault current, protecting swimmers from electric shock drowning caused by AC leakage into marina water.',
        ],
        keyPoints: [
          '30A = single 120V; 50A = split-phase 120V/240V — always verify before connecting high-voltage loads',
          'Galvanic isolator blocks DC leakage only; isolation transformer severs shore ground entirely — the superior solution for metal boats',
          'Check polarity indicator before energizing; ELCI at inlet required on new ABYC installations',
        ],
        quiz: [
          {
            q: 'A vessel\'s polarity indicator light glows red when plugged into a marina slip. What is the correct response?',
            a: ['Increase the load to stabilize voltage', 'Do NOT energize onboard loads — shore power polarity is reversed and must be corrected first', 'Engage the galvanic isolator bypass', 'Trip the ELCI breaker to reset polarity'],
            correct: 1,
            exp: 'Reversed polarity means the hot and neutral conductors are swapped at the pedestal. Operating with reversed polarity creates shock hazard on AC equipment and accelerates galvanic corrosion. Notify the marina and do not use shore power until corrected.',
          },
          {
            q: 'Which device provides COMPLETE isolation from the shore power ground, eliminating the galvanic path through the shore green wire entirely?',
            a: ['Galvanic isolator', 'ELCI breaker', 'Polarity indicator', 'Isolation transformer'],
            correct: 3,
            exp: 'An isolation transformer uses magnetic coupling to transfer AC power without any physical conductor connection to shore. This severs the shore ground wire, eliminating all galvanic and stray-current paths through the water. A galvanic isolator only blocks DC; the shore ground wire still connects.',
          },
        ],
      },
      {
        title: 'Marine Bonding System & DC Panel Standards',
        body: [
          'Marine bonding connects all submerged and near-water metal hardware (through-hulls, props, shafts, keel bolts, rudder hardware) to a common bonding conductor routed to the zinc anode system — its purpose is corrosion protection, not electrical safety.',
          'The bonding conductor must be green-insulated or bare copper, minimum #8 AWG stranded, per ABYC E-11 — it is not a safety ground and must not be confused with the AC green wire.',
          'The DC negative bus is the common negative return for all DC circuits — it is NOT earth ground; current returns to the battery, not into bilge water.',
          'ABYC E-11 requires a fuse or circuit breaker within 7 inches of every positive battery terminal on every unprotected positive conductor — protecting the wire run from short-circuit fault close to the battery.',
          'Switches and overcurrent devices are installed on the ungrounded (positive) conductor only; the negative conductor runs unbroken to the bus.',
          'Tinned copper conductors are strongly preferred in marine environments — bare copper oxidizes rapidly in salt air, increasing resistance at terminals and causing heat; standard automotive wire is not acceptable.',
          'Battery selector switches (1-2-BOTH-OFF) must never be switched under heavy load — breaking an alternator circuit under load causes a load-dump voltage spike that destroys alternator diodes and sensitive electronics.',
        ],
        keyPoints: [
          'Bonding = corrosion protection for underwater metals; Grounding = shock protection for AC chassis — two separate systems',
          'ABYC 7-inch rule: fuse or breaker required on every positive conductor within 7" of battery terminal',
          'Marine wire must be 600 V rated, 105°C insulated, tinned copper — automotive wire is prohibited',
        ],
        quiz: [
          {
            q: 'What is the PRIMARY purpose of the marine bonding system?',
            a: ['Provide a return path for AC shore power current', 'Protect underwater metals from galvanic and stray-current corrosion', 'Ground AC equipment chassis for shock protection', 'Carry excess alternator output to the bilge pump'],
            correct: 1,
            exp: 'Bonding connects underwater metals (through-hulls, props, shafts) through a low-resistance conductor to the zinc anode system. The zinc corrodes sacrificially, protecting the more valuable hardware. This is a corrosion-control function entirely separate from the AC safety grounding system.',
          },
          {
            q: 'Why should a battery selector switch NEVER be rotated under heavy alternator load?',
            a: ['It drains both battery banks simultaneously', 'Breaking the circuit under load creates a voltage spike that can exceed 100 V and destroy alternator diodes and electronics', 'It disconnects the bonding conductor from the through-hulls', 'It bypasses the ELCI protection at the shore power inlet'],
            correct: 1,
            exp: 'When a loaded alternator circuit is broken, the collapsing magnetic field generates an inductive spike (load dump) that can reach 80–150 V. This destroys rectifier diodes in the alternator and can damage chart plotters, VHF radios, and other electronics.',
          },
        ],
      },
    ],
    test: [
      { q: 'Which ABYC document is the primary standard governing AC and DC electrical systems on recreational vessels?', a: ['ABYC A-31', 'ABYC E-11', 'ABYC H-2', 'ABYC P-1'], correct: 1, exp: 'ABYC E-11 "AC and DC Electrical Systems on Boats" covers wiring methods, overcurrent protection, grounding, bonding, shore power, and all major marine electrical topics.' },
      { q: 'A 50A shore power service delivers which voltage configuration to the vessel?', a: ['120 V single-phase only', '240 V single-phase only', '120 V / 240 V split-phase — two 120 V hot legs', '208 V three-phase'], correct: 2, exp: '50A shore power is split-phase: two 120 V hot legs referenced to neutral, providing 240 V leg-to-leg. This allows larger AC loads and balanced distribution across two legs.' },
      { q: 'An ELCI breaker at the shore power inlet is set to trip at approximately what leakage current?', a: ['5 mA', '15 mA', '30 mA', '100 mA'], correct: 2, exp: 'ELCI breakers trip at approximately 30 mA ground fault — higher than a standard GFCI (5 mA) but sufficient to protect swimmers from electric shock drowning from AC leaking into marina water.' },
      { q: 'What is the minimum conductor gauge for the marine bonding conductor per ABYC E-11?', a: ['#14 AWG', '#12 AWG', '#10 AWG', '#8 AWG'], correct: 3, exp: 'ABYC E-11 requires the bonding conductor to be minimum #8 AWG stranded, green-insulated or bare copper, to ensure adequate current-carrying capacity and low resistance to the zinc anode system.' },
      { q: 'Per ABYC E-11, a fuse or circuit breaker must be installed on positive DC conductors within how many inches of the battery terminal?', a: ['3 inches', '5 inches', '7 inches', '12 inches'], correct: 2, exp: 'The 7-inch rule protects the uninsulated section of conductor between the terminal and the first protection device. A fault in this zone is otherwise protected only by the battery\'s short-circuit current capacity.' },
      { q: 'Why is tinned copper wire required (or strongly preferred) for marine wiring instead of bare copper?', a: ['Tinned copper is lighter', 'Bare copper oxidizes in salt air, increasing resistance and creating hot connections — tinned copper resists this corrosion', 'Tinned copper carries higher amperage', 'Bare copper is prohibited by USCG 33 CFR Part 183'], correct: 1, exp: 'Salt air and moisture cause bare copper to form green copper oxide and carbonate, dramatically increasing contact resistance at terminals. Tinned copper slows this oxidation, maintaining low-resistance connections over years of marine service.' },
      { q: 'On a marine DC distribution panel, overcurrent protection and switches must be installed on which conductor?', a: ['The negative (grounded) conductor only', 'Both positive and negative conductors', 'The positive (ungrounded) conductor only', 'Either conductor, technician choice'], correct: 2, exp: 'Per ABYC E-11, switches and breakers are on the positive (ungrounded) conductor. The negative conductor returns unbroken to the battery negative bus, minimizing the number of connections in the return path.' },
      { q: 'Galvanic corrosion in a marina occurs because:', a: ['Shore power voltage is too high', 'Dissimilar metals submerged in conductive seawater form a galvanic cell, causing the anodic metal to corrode', 'AC leakage current from the marina heats the water around the hull', 'Bonding conductors carry DC current into the water'], correct: 1, exp: 'The galvanic series ranks metals by electrochemical potential. When dissimilar metals are electrically connected and submerged in an electrolyte (salt water), the less noble (anodic) metal corrodes to protect the more noble (cathodic) metal.' },
      { q: 'Which federal regulation establishes mandatory electrical standards for recreational vessels manufactured for sale in the United States?', a: ['ABYC E-11', 'NEC Article 553', 'USCG 33 CFR Part 183', 'NMMA Certification Program'], correct: 2, exp: 'USCG 33 CFR Part 183, Subpart I establishes federal mandatory safety standards for recreational vessel electrical systems at manufacture. ABYC E-11 is a voluntary standard that typically exceeds the federal minimums and is widely adopted by the industry.' },
      { q: 'A galvanic isolator is installed in series with the shore power green (ground) wire. Its function is to:', a: ['Block the AC safety ground path to reduce shock risk', 'Block low-level DC galvanic current while still passing 60 Hz AC fault current through the safety ground', 'Replace the ELCI breaker for ground fault protection', 'Convert single-phase shore power to split-phase'], correct: 1, exp: 'The galvanic isolator uses back-to-back diode pairs to present a high impedance to small DC voltages (galvanic currents) while allowing 60 Hz AC ground fault current to pass normally, maintaining safety ground continuity.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 12 — MARINE BATTERY BANKS & CHARGING
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'marine-batteries',
    num: 12,
    title: 'Marine Battery Banks & Charging Systems',
    desc: 'Battery types, CCA vs MCA ratings, house vs. start banks, ACR vs. isolators, and multi-stage charging.',
    slides: [
      {
        title: 'Marine Battery Types & Selection',
        body: [
          'Marine batteries serve three functions: starting (high cranking amps for engine start), deep-cycle (sustained house loads), and dual-purpose (compromise; adequate for both but optimized for neither).',
          'Cold Cranking Amps (CCA) is measured at 0°F; Marine Cranking Amps (MCA) is measured at 32°F — batteries perform better at warmer temperatures, so MCA is always a higher number than CCA for the same battery.',
          'Reserve Capacity (RC) measures how many minutes a fully charged battery can deliver 25 A before terminal voltage falls to 10.5 V — the key spec for sizing house banks for overnight use.',
          'Flooded lead-acid batteries are lowest cost but vent hydrogen gas during charging, require ventilated battery compartments, and need periodic distilled-water additions.',
          'AGM (Absorbed Glass Mat) batteries are sealed, maintenance-free, mount in any orientation, tolerate deeper cycling than flooded, and are the standard choice for house banks in modern vessels.',
          'LiFePO4 (lithium iron phosphate) batteries offer 80–100% usable capacity versus 50% for lead-acid, are significantly lighter, and have 2,000–5,000 cycle life — but require a BMS (Battery Management System) and lithium-compatible charging sources.',
          'Gel batteries are sensitive to overcharge voltage and slow charge rates; AGM or lithium has largely displaced gel in new marine installations.',
        ],
        keyPoints: [
          'CCA (@0°F) < MCA (@32°F) for same battery — compare ratings at the same test temperature',
          'Lead-acid: ~50% usable capacity; LiFePO4: 80–100% usable — doubles effective bank size per pound',
          'LiFePO4 requires BMS and all charge sources (alternator, shore charger, solar) must use lithium charge profiles',
        ],
        quiz: [
          {
            q: 'A battery is rated 850 MCA and 680 CCA. Why is the MCA number higher?',
            a: ['MCA measures AC output; CCA measures DC', 'MCA is tested at 32°F; CCA at 0°F — warmer temperature yields higher cranking performance from the same battery', 'MCA includes reserve capacity; CCA does not', 'Industry standards require MCA to be exactly 125% of CCA'],
            correct: 1,
            exp: 'Battery internal resistance decreases at warmer temperatures, allowing more current to flow. Since MCA is measured at 32°F and CCA at 0°F, the same battery always shows higher MCA than CCA.',
          },
          {
            q: 'What is the key usable-capacity advantage of LiFePO4 batteries over AGM for a house bank?',
            a: ['Lithium is cheaper per amp-hour up front', 'Lithium provides 80–100% usable capacity versus ~50% for lead-acid — effectively doubling usable energy per installed amp-hour', 'Lithium does not require a Battery Management System', 'Lithium uses the same charge voltage profile as AGM, simplifying installation'],
            correct: 1,
            exp: 'Lead-acid batteries should not be routinely discharged below 50% SOC (depth of discharge) to preserve cycle life. LiFePO4 can safely reach 20% SOC, providing nearly twice the usable energy from the same rated capacity.',
          },
        ],
      },
      {
        title: 'Battery Banks, Isolation & Charging',
        body: [
          'Most vessels use a dual-bank system: a dedicated start battery for engine cranking and a separate house bank for 12 V loads — isolation ensures house loads cannot strand the engine by depleting the start battery.',
          'Diode-based battery isolators split charging current to multiple banks simultaneously but introduce a 0.6–0.7 V voltage drop, causing chronic undercharging — sulfation on lead-acid, shortened life.',
          'An ACR (Automatic Charging Relay) senses charging voltage (~13.0–13.2 V) and closes a relay to combine banks; when charging stops, voltage drops and it opens — no voltage penalty, full charge voltage reaches both banks.',
          'Shore power battery chargers (multi-stage) convert AC to DC through bulk (max current), absorption (constant voltage, tapering current), and float (maintenance) stages — mandatory for AGM and lithium; single-stage ferroresonant chargers overcharge and damage modern batteries.',
          'Alternators must be derated to 70–80% of rated output for continuous marine duty; automotive-duty alternators run intermittently, but motor-sailing or extended engine charging runs them continuously until thermal failure.',
          'Lithium BMS self-protection can disconnect the battery under high-current charging — with the alternator running, the sudden open circuit creates a load-dump spike that destroys alternator diodes; a DC-DC charger or smart regulator with BMS communication prevents this.',
          'MPPT solar charge controllers continuously track the panel\'s maximum power point across varying irradiance and temperature, extracting 15–30% more energy than PWM controllers — standard on cruising boats for house bank maintenance.',
        ],
        keyPoints: [
          'ACR preferred over diode isolator — no voltage drop means full charge voltage reaches both banks',
          'Multi-stage charger required for all modern battery chemistries — bulk, absorption, float in sequence',
          'Lithium BMS disconnect risk: use DC-DC charger or alternator smart regulator with BMS comms to prevent load-dump damage',
        ],
        quiz: [
          {
            q: 'What is the primary advantage of an ACR (Automatic Charging Relay) over a diode-based battery isolator?',
            a: ['ACR is less expensive', 'ACR introduces no voltage drop, ensuring full charge voltage reaches both battery banks', 'ACR works only with lithium batteries', 'ACR combines banks permanently, eliminating isolation'],
            correct: 1,
            exp: 'Diode isolators drop 0.6–0.7 V, causing batteries to charge at lower than source voltage — chronic undercharging and sulfation. ACRs use a relay that closes with near-zero resistance drop, delivering full charge voltage to both banks.',
          },
          {
            q: 'Why is a DC-DC charger or smart alternator regulator with BMS communication recommended when charging lithium banks?',
            a: ['Lithium requires higher DC voltage than an alternator can output', 'A BMS self-protection disconnect under alternator load causes a load-dump spike that destroys alternator diodes', 'Lithium banks cannot accept current from AC chargers', 'Lithium requires three-stage charging that alternators cannot provide'],
            correct: 1,
            exp: 'If the BMS disconnects the lithium bank while the alternator supplies current, the inductive field collapses rapidly, generating a high-voltage spike (load dump). A DC-DC charger isolates the alternator from the BMS; a smart regulator communicates with the BMS to ramp down current before disconnect.',
          },
        ],
      },
    ],
    test: [
      { q: 'Which marine battery type vents hydrogen gas during charging and requires a ventilated battery compartment?', a: ['AGM', 'Gel', 'LiFePO4', 'Flooded lead-acid'], correct: 3, exp: 'Flooded (wet-cell) lead-acid batteries produce hydrogen gas during the gassing phase of charging, creating an explosion risk in enclosed spaces. Ventilation ducts or blowers are required in battery compartments.' },
      { q: 'Reserve Capacity (RC) on a marine battery is the number of minutes a fully charged battery sustains what discharge current before reaching 10.5 V?', a: ['10 A', '25 A', '50 A', '100 A'], correct: 1, exp: 'RC is measured at 25 A discharge at 80°F. It directly answers "how long can I run house loads before the battery is depleted" — the most useful spec for sizing a cruising house bank.' },
      { q: 'A diode-based battery isolator causes what problem for lead-acid battery banks?', a: ['It reverses the charge polarity on one bank', 'The 0.6–0.7 V voltage drop causes chronic undercharging and sulfation', 'It combines both banks during discharge, draining the start battery', 'It draws 5–10 A of standby current, draining the house bank overnight'], correct: 1, exp: 'Each diode drops 0.6–0.7 V. With a 14.4 V alternator, the house bank only sees 13.7 V — not enough to complete absorption and bring the battery to full charge, leading to progressive sulfation and reduced capacity.' },
      { q: 'An ACR (Automatic Charging Relay) closes to combine battery banks when it senses approximately what voltage?', a: ['12.4 V', '12.6 V', '13.0–13.2 V', '14.4 V'], correct: 2, exp: '13.0–13.2 V indicates a charging source is active (alternator or shore charger). The ACR closes to allow simultaneous charging of both banks, then reopens when voltage drops after charging stops.' },
      { q: 'For continuous marine alternator duty (motor-sailing, extended charging runs), alternator output should be derated to what percentage of its rated capacity?', a: ['50%', '60%', '70–80%', '90%'], correct: 2, exp: 'Automotive alternators are rated for intermittent duty. Running at full output continuously generates excessive heat. Derating to 70–80% allows adequate cooling margin and dramatically extends alternator life in continuous-duty marine service.' },
      { q: 'Which stage of multi-stage battery charging delivers maximum current to a deeply discharged battery?', a: ['Float', 'Absorption', 'Bulk', 'Equalization'], correct: 2, exp: 'Bulk charging applies maximum current (limited by charger rating or battery acceptance) until the battery reaches absorption voltage. This stage handles the majority of energy transfer and is fastest in time per amp-hour returned.' },
      { q: 'LiFePO4 batteries can routinely be discharged to what state of charge without significant cycle life impact?', a: ['80% SOC (20% DOD)', '50% SOC (50% DOD)', '30% SOC (70% DOD)', '20% SOC (80% DOD)'], correct: 3, exp: 'LiFePO4 chemistry is tolerant of deep discharge — most manufacturers allow 80% depth of discharge (to 20% SOC) routinely, and the battery will still achieve 2,000+ cycles. This doubles usable capacity compared to lead-acid limited to 50% DOD.' },
      { q: 'What type of solar charge controller extracts the most energy from a solar panel across varying irradiance and temperature?', a: ['PWM (Pulse Width Modulation)', 'Shunt controller', 'MPPT (Maximum Power Point Tracking)', 'Series regulator'], correct: 2, exp: 'MPPT controllers continuously find the voltage at which the panel produces maximum power (the peak of its I-V curve), regardless of battery voltage or irradiance. They extract 15–30% more energy than PWM controllers, which simply clamp panel voltage to battery voltage.' },
      { q: 'A house bank of 200 Ah (lead-acid) has an effective usable capacity of approximately:', a: ['200 Ah', '150 Ah', '100 Ah', '60 Ah'], correct: 2, exp: 'Lead-acid batteries should not be routinely discharged below 50% SOC to avoid accelerated sulfation and shortened cycle life. Therefore a 200 Ah bank has approximately 100 Ah of practical usable capacity.' },
      { q: 'When sizing a house bank for a 3-day passage consuming 80 Ah/day with lead-acid batteries, the minimum bank capacity should be:', a: ['240 Ah', '360 Ah', '480 Ah', '600 Ah'], correct: 2, exp: '80 Ah/day × 3 days = 240 Ah consumed. At 50% DOD limit for lead-acid, the bank must hold twice that: 240 Ah × 2 = 480 Ah. With lithium at 80% DOD, 300 Ah would suffice.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 13 — MARINE INVERTERS & INVERTER/CHARGERS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'marine-inverter',
    num: 13,
    title: 'Marine Inverters & Inverter/Chargers',
    desc: 'Pure sine vs. modified sine wave, inverter sizing, inverter/charger transfer relays, and onboard AC systems.',
    slides: [
      {
        title: 'Inverter Selection & Sizing',
        body: [
          'An inverter converts DC battery power to 120 V AC, allowing AC appliances to operate when off the dock without running a generator.',
          'Pure sine wave inverters produce a clean AC waveform identical to utility power — required for variable speed drives (blenders, hand tools), microwave inverter technology, medical equipment, and modern electronics with switching power supplies.',
          'Modified sine wave (quasi-sine) inverters produce a stepped approximation of AC — lower cost but incompatible with many loads; they cause variable speed motors to run hot, microwave inverter outputs to fluctuate, and laptop power supplies to run inefficiently.',
          'Inverter sizing: total the running watts of all loads expected to run simultaneously, then add motor start surge allowance — single-phase induction motors draw 2–3× running current at start-up.',
          'Inverter efficiency is typically 85–92%; a 1,500 W AC load requires roughly 1,750 W of DC input at 88% efficiency: 1,500 ÷ 0.88 = 1,705 W.',
          'DC cable current at 12 V is very high: a 2,000 W inverter at 12 V draws approximately 185 A — DC cables must be #2/0 AWG or larger for runs under 6 feet, fused within 7 inches of the battery terminal.',
          'ABYC A-31 governs inverter installation, including ventilation, fusing, mounting orientation, and transfer relay requirements.',
        ],
        keyPoints: [
          'Pure sine wave required for variable speed motors, medical equipment, and modern electronics',
          'Size for simultaneous load sum + motor start surge (2–3× running watts for induction motors)',
          'High DC current at 12 V: 2,000 W inverter draws ~185 A — cable gauge and fusing are critical',
        ],
        quiz: [
          {
            q: 'A technician installs a modified sine wave inverter to power a variable speed drill, a laptop, and a phone charger. What is the primary concern?',
            a: ['Modified sine wave inverters cannot deliver enough watts for these loads', 'Modified sine wave AC causes variable speed tools to run hot and may damage laptop power supplies', 'Modified sine wave is only for AC output above 120 V', 'The phone charger will operate but the drill and laptop will not receive power'],
            correct: 1,
            exp: 'Variable speed motor controllers require clean AC to modulate speed correctly — modified sine wave causes them to run at incorrect speeds, overheat, and fail. Laptop switching supplies are less sensitive but run hotter and less efficiently on modified sine wave.',
          },
          {
            q: 'A 3,000 W inverter operating at 90% efficiency on a 12 V system draws approximately how many amps from the battery?',
            a: ['167 A', '222 A', '278 A', '333 A'],
            correct: 2,
            exp: '3,000 W ÷ 12 V ÷ 0.90 efficiency = 278 A. This is why very large 12 V inverters require extremely short, heavy cable runs — even a few milliohms of resistance causes significant voltage drop and wasted heat at these current levels.',
          },
        ],
      },
      {
        title: 'Inverter/Chargers & Onboard AC Systems',
        body: [
          'An inverter/charger combines a pure sine wave inverter, a multi-stage battery charger, and an automatic transfer relay in a single unit — simplifying installation, reducing space, and providing seamless shore-to-inverter switching.',
          'The transfer relay detects shore or generator AC and automatically connects it to the onboard AC bus; when AC input is lost, the relay switches to inverter output in 16–30 ms — fast enough for most loads to remain undisturbed.',
          'Modern inverter/chargers communicate with lithium BMS via CAN bus protocols (Victron VE.Bus, Mastervolt MasterBus) to dynamically adjust charge parameters, preventing overcharge and coordinating shutdown before BMS trips.',
          'Onboard AC distribution mirrors residential wiring: a main AC panel with branch circuits protected by 15 A or 20 A breakers; GFCI protection is required by ABYC at outlets in heads, galleys, and on deck.',
          'Generator integration uses a second transfer switch input — common priority order is shore → generator → inverter; AGS (Automatic Generator Start) triggers when battery SOC drops to a configured threshold.',
          'Large vessels may parallel two or more inverter/chargers for higher total output (up to 15 kW+) or configure split-phase 240 V output.',
          'Undersized shore power cords cause voltage drop that reduces inverter/charger output and may trip ELCI breakers — always use the cord gauge specified for the inlet amperage rating.',
        ],
        keyPoints: [
          'Transfer relay switches shore to inverter in 16–30 ms — seamless for most loads; critical UPS loads may still need a UPS',
          'BMS communication coordinates charge cutoff before lithium protection trips — prevents load-dump damage to the inverter/charger',
          'AGS starts generator automatically at low SOC — prevents dead batteries and eliminates manual generator management on passage',
        ],
        quiz: [
          {
            q: 'What happens inside an inverter/charger when shore power is suddenly lost at the dock?',
            a: ['The unit shuts down and must be manually switched to inverter mode', 'The transfer relay automatically switches the AC bus from shore input to inverter output in 16–30 ms', 'The battery charger reverses to supply the shore power outlet', 'The unit locks out until voltage is restored to prevent surge damage'],
            correct: 1,
            exp: 'The built-in transfer relay continuously monitors AC input and switches the onboard AC bus from shore input to inverter output automatically. The 16–30 ms transition is typically fast enough for TVs, refrigerators, and most appliances to remain running.',
          },
          {
            q: 'Why does an inverter/charger with BMS communication improve the safety of lithium battery installations?',
            a: ['BMS communication allows the inverter to output higher voltage for lithium charging', 'The inverter/charger can reduce or stop charging current on BMS command, preventing load-dump damage from a sudden BMS disconnect', 'BMS communication controls the transfer relay timing', 'It eliminates the need for a multi-stage charge profile'],
            correct: 1,
            exp: 'When the BMS communicates over CAN bus, it can signal the inverter/charger to ramp down output current before it opens its protection circuit. Without communication, a sudden BMS trip causes a load-dump spike that can damage both the inverter/charger and the alternator.',
          },
        ],
      },
    ],
    test: [
      { q: 'Which ABYC document governs the installation of inverters on recreational vessels?', a: ['ABYC E-11', 'ABYC A-31', 'ABYC H-2', 'ABYC P-1'], correct: 1, exp: 'ABYC A-31 "Battery Chargers and Inverters" covers installation requirements for inverters and chargers, including ventilation, mounting, wire sizing, fusing, and transfer relay requirements specific to marine vessels.' },
      { q: 'Which type of inverter output waveform is required for variable speed motor drives and sensitive electronic equipment?', a: ['Modified sine wave', 'Square wave', 'Pure sine wave', 'Quasi-sine wave'], correct: 2, exp: 'Pure sine wave inverters replicate utility-quality AC. Variable speed drives, microwave inverter circuits, medical equipment, and switching power supplies require pure sine wave for correct and safe operation.' },
      { q: 'A 2,400 W inverter operating at 85% efficiency on a 24 V system draws how many amps from the battery bank?', a: ['58 A', '100 A', '118 A', '141 A'], correct: 2, exp: '2,400 W ÷ 24 V ÷ 0.85 = 117.6 A ≈ 118 A. Operating at 24 V rather than 12 V halves the current for the same power output, allowing smaller gauge DC cables.' },
      { q: 'What is the typical transfer time of an inverter/charger switching from shore power to inverter mode?', a: ['0 ms — instantaneous', '16–30 ms', '200–500 ms', '1–2 seconds'], correct: 1, exp: '16–30 ms is fast enough for most household appliances and electronics to remain operating. Servers and some medical devices may reset; those applications may require a dedicated online UPS in addition to the inverter/charger.' },
      { q: 'Motor start surge for a single-phase induction motor (refrigerator compressor, pump) is typically how many times its running current?', a: ['Equal to running current', '1.2–1.5×', '2–3×', '5–7×'], correct: 2, exp: 'Single-phase induction motors draw 2–3× (or more) their running current at startup. The inverter must supply this brief surge without shutting down — sizing the inverter to peak demand rather than running watts is essential.' },
      { q: 'An Automatic Generator Start (AGS) system typically triggers based on what condition?', a: ['Time of day only', 'Battery SOC dropping below a configured threshold', 'Shore power voltage falling below 110 V', 'AC load exceeding 80% of inverter capacity'], correct: 1, exp: 'AGS monitors battery state of charge (or voltage) and starts the generator when banks deplete to a preset level (e.g., 30% SOC). It shuts the generator down after batteries reach absorption voltage, preventing both over-discharge and overcharge.' },
      { q: 'A cruising vessel has shore power, a generator, and an inverter/charger. What is the most common automatic source priority?', a: ['Inverter → Generator → Shore', 'Generator → Inverter → Shore', 'Shore → Generator → Inverter', 'Shore → Inverter → Generator'], correct: 2, exp: 'Shore power is used first (free electricity from the marina). If shore is lost, the generator starts automatically (limited by fuel, but cheaper than battery cycling). Inverter mode is last resort for quiet or fuel-free operation at anchor.' },
      { q: 'What problem arises when an undersized shore power cord is used with a high-amperage inverter/charger in charging mode?', a: ['The cord melts the transfer relay contacts', 'Voltage drop in the cord reduces charging voltage at the charger input, reducing charge current and tripping the ELCI breaker', 'The charger outputs DC on the AC bus', 'The BMS disconnects the lithium bank immediately'], correct: 1, exp: 'Resistance in an undersized cord causes voltage drop proportional to current. At high charge currents, this can reduce input voltage enough to reduce charger output, trip ELCI ground fault protection, or cause the charger to fault on low input voltage.' },
      { q: 'The DC cable from the battery bank to a 3,000 W, 12 V inverter must handle approximately 278 A. What is the minimum recommended cable gauge for a 4-foot run?', a: ['#4 AWG', '#2 AWG', '#2/0 AWG', '#4/0 AWG'], correct: 2, exp: 'At 278 A, #2/0 AWG is typically required for a 4-foot run to keep voltage drop within acceptable limits and stay within the wire\'s ampacity. Longer runs or higher wattage inverters may need #4/0 AWG.' },
      { q: 'When multiple inverter/chargers are connected in parallel on a 12 V vessel to achieve higher output, what must all units share?', a: ['A single DC input breaker only', 'The same DC battery bus and synchronized AC output (via communication cable) to prevent circulating currents between units', 'Individual battery banks — parallel inverters must never share a bank', 'Separate AC distribution panels; they cannot feed the same AC bus'], correct: 1, exp: 'Parallel inverter/chargers must be synchronized via a communication cable so their AC outputs are phase-locked. Unsynchronized AC outputs fed to the same bus create circulating currents that damage both units.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 14 — DC WIRING STANDARDS & NMEA ELECTRONICS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'marine-wiring',
    num: 14,
    title: 'DC Wiring, Bus Design & NMEA 2000',
    desc: 'ABYC E-11 wiring rules, voltage drop limits, color coding, NMEA 2000 backbone design, and electronics power budgeting.',
    slides: [
      {
        title: 'ABYC E-11 Wiring & Voltage Drop',
        body: [
          'ABYC E-11 wire sizing uses 105°C-rated conductors; automotive wire is typically 80°C rated and prohibited in ABYC-compliant marine installations.',
          'ABYC voltage drop limits: 3% maximum for engine circuits and safety-critical loads (bilge pumps, navigation lights, fire suppression), 10% for non-critical loads (cabin lighting, fans).',
          'Voltage drop formula: V_drop = 2 × L × I × R, where L is the one-way run length in feet, I is load current in amps, and R is conductor resistance per foot from ABYC Table XI.',
          'All DC conductors must be rated at 600 V minimum per ABYC E-11 — even though system voltage is 12 V or 24 V, the higher rating ensures adequate insulation integrity in the harsh marine environment.',
          'ABYC color coding: positive = yellow/red-stripe or red; negative = yellow; bonding = green or bare; AC hot (ungrounded) = black; AC neutral = white; AC safety ground = green/yellow.',
          'Terminations must use crimp ring terminals or fork terminals with heat-shrink; wire nuts, push-in connectors, and twist-and-tape splices are expressly prohibited in marine DC wiring.',
          'MRBF (Master Fuse) terminal fuse holders are used for large conductors (#4 AWG and larger) where standard ANL or MIDI fuses do not physically fit — installed within 7 inches of the battery positive terminal.',
        ],
        keyPoints: [
          'Marine wire: 105°C insulation, 600 V rated, tinned copper — automotive wire prohibited',
          '3% voltage drop for safety circuits; 10% for non-critical — tighter than NEC to account for marine duty',
          'Wire nuts prohibited; only crimp ring/fork terminals with heat-shrink are ABYC compliant',
        ],
        quiz: [
          {
            q: 'A bilge pump circuit has a 3% voltage drop on a 12 V system. What voltage drop in volts does this represent?',
            a: ['0.12 V', '0.36 V', '0.72 V', '1.2 V'],
            correct: 1,
            exp: '3% of 12 V = 0.36 V. At 13.5 V (charging voltage), 3% = 0.405 V — still under 0.5 V. Voltage drop above 3% reduces bilge pump flow rate; in a flooding emergency, reduced pump capacity can be fatal.',
          },
          {
            q: 'ABYC E-11 requires marine wiring conductors to be rated at a minimum of:',
            a: ['60 V', '120 V', '300 V', '600 V'],
            correct: 3,
            exp: 'ABYC E-11 requires 600 V minimum insulation rating for all marine conductors, regardless of system voltage. The higher rating ensures the insulation withstands voltage transients, chafe, and the marine environment over many years.',
          },
        ],
      },
      {
        title: 'NMEA 2000 Networks & Electronics Power',
        body: [
          'NMEA 2000 is a CAN-bus-based marine data network connecting chart plotters, depth sounders, wind instruments, GPS, VHF radios, AIS transponders, autopilots, and engine monitors on a single backbone.',
          'The NMEA 2000 backbone requires a 120Ω terminator at each physical end of the trunk cable — missing terminators cause signal reflections that corrupt CAN bus frames, producing random data dropouts across all connected devices.',
          'DeviceNet Micro-C connectors are the standard NMEA 2000 connector; T-connectors tap drop cables from the trunk — drop cables (spurs) are limited to 6 meters per NMEA 2000 specification.',
          'NMEA 2000 backbone voltage must remain 9–16 V; a power injector should be added when multiple devices load the backbone, to maintain voltage above 9 V at all points.',
          'NMEA 0183 is the older single-talker/multi-listener serial protocol operating at 4,800 baud (standard) or 38,400 baud (AIS high-speed variant) — many legacy instruments still use it alongside NMEA 2000.',
          'Electronics power budget for an overnight offshore passage: chart plotter 2–4 A, VHF 0.5–1 A receive / 6 A transmit peak, AIS transponder 0.5–0.7 A, autopilot 2–5 A (load dependent), radar 3–8 A — total 8–18 A continuous, driving 80–175 Ah per 10-hour watch.',
          'EPIRBs and PLBs are registered to the vessel or person and transmit on 406 MHz to COSPAS-SARSAT satellites — they are battery-backed, not part of the normal DC power budget, but registration must be current.',
        ],
        keyPoints: [
          'NMEA 2000 needs 120Ω terminator at each backbone end — missing terminator causes network-wide dropouts',
          'Drop cable (spur) max 6 m from T-connector to device — longer spurs degrade signal integrity',
          'Electronics can draw 8–18 A continuously on passage — size house bank to include electronics load in 24-hour budget',
        ],
        quiz: [
          {
            q: 'An NMEA 2000 network shows random data loss from all connected devices. The most likely cause is:',
            a: ['A GPS talker sentence error', 'A missing or failed terminator at one end of the backbone', 'An NMEA 0183 device interfering with NMEA 2000 traffic', 'Insufficient power injector voltage'],
            correct: 1,
            exp: 'NMEA 2000 uses CAN bus, which requires exactly two 120Ω terminators — one at each physical end of the trunk cable. A missing terminator causes signal reflections that corrupt CAN frames, generating random errors across all devices on the bus.',
          },
          {
            q: 'What is the maximum allowed length of an NMEA 2000 drop cable (spur) from a T-connector to a device?',
            a: ['1 meter', '3 meters', '6 meters', '15 meters'],
            correct: 2,
            exp: 'The NMEA 2000 specification limits spur cables to 6 meters (approximately 20 feet). Longer spurs act as unterminated stubs that reflect signals back onto the bus, degrading signal integrity — especially significant as more devices are added.',
          },
        ],
      },
    ],
    test: [
      { q: 'ABYC E-11 sets the maximum voltage drop for a bilge pump (safety-critical) circuit at:', a: ['1%', '3%', '5%', '10%'], correct: 1, exp: 'Safety-critical circuits (bilge pumps, fire suppression, navigation lights) are limited to 3% voltage drop. This ensures adequate voltage and current reach the device — a bilge pump with 10% voltage drop may not deliver adequate flow rate in a flooding emergency.' },
      { q: 'Which wire connection method is expressly prohibited by ABYC E-11 in marine DC wiring?', a: ['Crimp ring terminals', 'Solder-and-heat-shrink with mechanical support', 'Wire nuts (twist-on connectors)', 'Marine-grade butt splice connectors'], correct: 2, exp: 'Wire nuts rely on spring tension to maintain contact. Marine vibration, moisture, and corrosion cause these to loosen and corrode, creating high-resistance connections that overheat. ABYC requires mechanical crimp connections.' },
      { q: 'NMEA 2000 operates on which underlying industrial network protocol?', a: ['Ethernet', 'Modbus RTU', 'CAN bus (Controller Area Network)', 'RS-485 serial'], correct: 2, exp: 'NMEA 2000 uses the CAN bus physical and data-link layers, operating at 250 kbps. The same technology is used in automotive OBD-II systems, though NMEA 2000 uses its own message protocol (PGNs — Parameter Group Numbers).' },
      { q: 'How many terminators does an NMEA 2000 backbone require, and where?', a: ['One, at the power injection point', 'Two, one at each physical end of the trunk cable', 'One per T-connector tap', 'Three — both ends plus one at the midpoint of long runs'], correct: 1, exp: 'CAN bus requires exactly two 120Ω terminators, one at each physical end of the trunk cable. The parallel combination of 120Ω + 120Ω = 60Ω — the correct characteristic impedance for the bus.' },
      { q: 'The NMEA 0183 standard operates at which baud rate for standard navigation instruments?', a: ['1,200 baud', '4,800 baud', '9,600 baud', '38,400 baud'], correct: 1, exp: 'Standard NMEA 0183 runs at 4,800 baud (bits per second). High-speed NMEA 0183 HS at 38,400 baud is used for AIS (Automatic Identification System) data, which requires higher throughput for multiple vessel tracking.' },
      { q: 'An NMEA 2000 backbone has seven devices connected and exhibits intermittent dropouts only at the farthest devices. What should be checked first?', a: ['Replace the GPS unit', 'Add a power injector to maintain backbone voltage above 9 V at all points', 'Replace all T-connectors', 'Reduce the number of devices to five'], correct: 1, exp: 'Multiple devices load the backbone cable\'s resistance, dropping voltage further from the injection point. If backbone voltage falls below 9 V at far devices, they lose power and drop off the network. A power injector at the far end restores voltage.' },
      { q: 'A vessel running a 3 A chart plotter, 0.7 A AIS, 1 A VHF (receive), and 3 A autopilot continuously for 10 hours consumes approximately:', a: ['37 Ah', '55 Ah', '77 Ah', '110 Ah'], correct: 3, exp: '(3 + 0.7 + 1 + 3) = 7.7 A × 10 hours = 77 Ah. At 50% DOD for lead-acid, the house bank must be at least 154 Ah to safely run just the electronics — this illustrates why cruising boats need 200–400 Ah+ banks.' },
      { q: 'What marine regulation requires bilge blowers to operate for at least 4 minutes before starting a gasoline engine?', a: ['ABYC E-11', 'USCG 33 CFR 175.110', 'NFPA 303', 'NMMA Certification Standard G-20'], correct: 1, exp: 'USCG 33 CFR 175.110 requires enclosed engine spaces with gasoline-powered engines to be ventilated by a blower for at least 4 minutes before starting to clear any accumulated fuel vapors, preventing explosion risk.' },
      { q: 'MRBF terminal fuses are used in marine applications for:', a: ['Replacing all ANL fuses at any amperage', 'Overcurrent protection of large (#4 AWG and heavier) conductors within 7 inches of the battery terminal where standard fuse holders are impractical', 'Protecting NMEA 2000 backbone power injection', 'Fusing individual circuit breaker panel outputs'], correct: 1, exp: 'MRBF (Master Fuse) terminal fuses mount directly to large battery cables, providing the required within-7-inch overcurrent protection for high-current conductors (windlass, bow thruster, inverter) without a bulky fuse holder.' },
      { q: 'ABYC color coding for the DC negative conductor in a 12 V marine system is:', a: ['Black', 'White', 'Yellow', 'Gray'], correct: 2, exp: 'ABYC E-11 specifies yellow for DC negative conductors. Black is reserved for AC ungrounded (hot) conductors in marine wiring, avoiding the NEC convention of black = DC positive that could cause dangerous cross-system confusion.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 15 — MARINE SAFETY SYSTEMS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'marine-safety',
    num: 15,
    title: 'Marine Safety Systems',
    desc: 'Bilge pumps, float switches, CO detectors, fire suppression, portable extinguishers, and USCG compliance.',
    slides: [
      {
        title: 'Bilge Pumps, Float Switches & CO Detection',
        body: [
          'Bilge pump sizing is measured in gallons per hour (GPH); a common rule of thumb for coastal cruising is 1,500–3,500 GPH capacity — higher for offshore vessels, lower for small daysailers.',
          'Manual bilge pumps (diaphragm or rotary) serve as backup when the 12 V system fails; USCG regulations require manual capability on Class 2 and larger vessels.',
          'Automatic float switches wire in parallel with the panel switch — the pump runs automatically when bilge water reaches float trigger height, regardless of whether the panel switch is on.',
          'Float switch wiring must be done carefully: automatic mode requires a float switch in parallel with the panel "on" position; a dedicated "auto" circuit with both manual and auto selections is safer and cleaner.',
          'Carbon monoxide (CO) detectors are required aboard vessels with gasoline engines, generators, or any enclosed cooking appliances — CO is odorless, colorless, and can incapacitate at 200 ppm; death occurs rapidly above 1,600 ppm.',
          'CO detectors must be installed at breathing height in each sleeping space and adjacent to any enclosed engine or generator space — not at ceiling height (CO disperses throughout the cabin, unlike propane which sinks).',
          'Bilge blower systems on gasoline-powered vessels must ventilate the engine space for 4 minutes before starting — USCG 33 CFR 175.110.',
        ],
        keyPoints: [
          'Float switch in parallel with panel switch — pump runs automatically on bilge water rise',
          'CO is odorless and colorless — detector placement at breathing height in sleeping spaces is mandatory',
          '4-minute blower rule before starting gasoline engines — USCG 33 CFR 175.110',
        ],
        quiz: [
          {
            q: 'A bilge pump float switch is wired in parallel with the panel manual switch. When bilge water rises to the float trigger, the pump will:',
            a: ['Pump only if the panel switch is in the ON position', 'Pump regardless of panel switch position, including when the switch is OFF', 'Trigger an alarm but not run the pump until manually started', 'Run for 30 seconds then require manual reset'],
            correct: 1,
            exp: 'Parallel wiring creates an OR condition — the pump runs if EITHER the panel switch OR the float switch is energized. This is the correct automatic bilge pump wiring; the pump protects the vessel even when the panel switch is off.',
          },
          {
            q: 'Where should CO detectors be mounted in a vessel\'s main cabin?',
            a: ['At ceiling height, as CO rises like smoke', 'At or near breathing height, since CO distributes throughout the cabin rather than concentrating at the ceiling', 'Only in the engine room bilge', 'At the waterline in the bilge'],
            correct: 1,
            exp: 'Unlike propane (which sinks) or smoke (which rises), CO distributes roughly uniformly throughout enclosed spaces. Detectors at breathing height (similar to residential placement) provide the earliest warning for sleeping occupants.',
          },
        ],
      },
      {
        title: 'Fire Suppression & USCG Compliance',
        body: [
          'Fixed fire suppression systems use clean-agent gases (HFC-227ea/FM-200, FK-5-1-12/Novec 1230) that extinguish fire by interrupting the chemical chain reaction without leaving damaging residue — critical for protecting electronics and engines.',
          'Halon 1301 (the historic standard) is no longer manufactured under the Montreal Protocol but is still legally installed in older vessels; replacement agents must achieve equivalent suppression effectiveness.',
          'Portable fire extinguishers are rated by USCG class: Class B:C extinguishers (dry chemical or CO₂) for engine compartments and fuel fires; Class A:B:C for general use.',
          'USCG regulations require specific minimum portable extinguisher quantities by vessel length: vessels under 26 ft need at least one B-I; 26–40 ft need at least two B-I or one B-II.',
          'Anti-siphon valves on fuel fill and fuel supply lines prevent fuel from siphoning back through the engine or generator fuel system and into the bilge — required for all permanently installed fuel tanks.',
          'USCG documentation (certificate of documentation or state registration) must be carried aboard at all times; vessel documentation number must be marked on an interior structural element.',
          'NFPA 303 "Fire Protection Standard for Marinas and Boatyards" governs the shore-side electrical infrastructure that the marine technician works near — understanding it protects the technician and the vessels.',
        ],
        keyPoints: [
          'Clean-agent fixed suppression (HFC-227ea, FK-5-1-12) — no residue, engine room and electronics safe',
          'Class B:C portable extinguisher required in engine compartment; size per vessel length per USCG',
          'Anti-siphon valves required on permanently installed fuel tanks to prevent fuel siphoning into bilge',
        ],
        quiz: [
          {
            q: 'Why are clean-agent fixed fire suppression systems (HFC-227ea) preferred over dry chemical systems in engine rooms?',
            a: ['Clean agents are cheaper', 'Clean agents extinguish without leaving damaging residue on engines and electronics, allowing immediate restart after discharge', 'Clean agents are effective only on Class A fires', 'Dry chemical is prohibited in marine engine rooms by ABYC'],
            correct: 1,
            exp: 'Dry chemical leaves a corrosive powder residue that requires extensive cleanup and can permanently damage precision engine components and electronics. Clean agents dissipate as gas, leaving no residue — the engine or generator can be inspected and restarted after resolving the fire cause.',
          },
          {
            q: 'For a 32-foot powerboat, what is the USCG minimum portable fire extinguisher requirement?',
            a: ['One B-I extinguisher', 'Two B-I or one B-II extinguishers', 'Three B-I extinguishers', 'One B-III extinguisher'],
            correct: 1,
            exp: 'USCG regulations for vessels 26–40 feet require at least two B-I or one B-II portable fire extinguisher. Additional extinguishers may be required if the vessel has enclosed spaces or permanently installed fuel systems.',
          },
        ],
      },
    ],
    test: [
      { q: 'A vessel\'s bilge pump float switch is wired in series (not parallel) with the panel switch. The effect is:', a: ['The pump runs automatically whenever bilge water rises', 'The pump runs only when BOTH the panel switch AND the float switch are energized — an incorrect installation that prevents automatic operation', 'Identical performance to parallel wiring', 'The pump runs at half speed in automatic mode'], correct: 1, exp: 'Series wiring creates an AND condition — both switches must be on. If the panel switch is off, rising bilge water cannot activate the pump automatically, defeating the purpose of the float switch. Correct wiring is parallel.' },
      { q: 'Carbon monoxide (CO) gas presents a lethal hazard aboard vessels primarily because:', a: ['CO is highly visible as a gray-green gas', 'CO is odorless and colorless, giving no sensory warning before incapacitating occupants', 'CO is heavier than air and accumulates in the bilge', 'CO affects only children and elderly passengers'], correct: 1, exp: 'CO provides no sensory warning — it is completely odorless and colorless. It binds to hemoglobin 200× more strongly than oxygen, causing hypoxia even at moderate concentrations (200 ppm causes symptoms; 1,600 ppm can cause death in under an hour).' },
      { q: 'USCG 33 CFR 175.110 requires gasoline-powered vessel bilge blowers to operate for at least how long before engine start?', a: ['1 minute', '2 minutes', '4 minutes', '10 minutes'], correct: 2, exp: '4 minutes of powered ventilation is required to purge gasoline vapor from enclosed engine compartments before starting. Gasoline vapor is heavier than air and accumulates in the bilge — ignition can cause a catastrophic explosion.' },
      { q: 'Fixed fire suppression systems using halon 1301 on older vessels cannot be recharged after discharge because:', a: ['Halon 1301 is no longer available — production was banned under the Montreal Protocol due to ozone depletion', 'Halon 1301 is too expensive for recreational vessels', 'ABYC E-11 prohibits halon in fire suppression systems', 'Halon 1301 is only approved for commercial vessels over 65 feet'], correct: 0, exp: 'Halon 1301 is an extremely effective fire suppressant but depletes stratospheric ozone. The Montreal Protocol (1987) banned its production; existing supplies are recycled and expensive. Vessels replacing halon systems use HFC-227ea or FK-5-1-12 (Novec 1230).' },
      { q: 'A Class B:C fire extinguisher is required in the engine compartment primarily because Class B covers:', a: ['Wood, paper, and textile fires', 'Flammable liquid fires (gasoline, diesel, oil)', 'Electrical fires only', 'Metal fires (magnesium, titanium)'], correct: 1, exp: 'Class B extinguishers cover flammable liquid fires — gasoline, diesel, engine oil, and transmission fluid are the primary fire risks in a marine engine room. Class C indicates suitability for use on or near energized electrical equipment without shock risk.' },
      { q: 'Anti-siphon valves are required on permanently installed marine fuel tanks to prevent:', a: ['Fuel from flowing backward through the fuel fill fitting when the tank is full', 'Fuel from siphoning from the tank through the engine or generator fuel line into the bilge when the engine is off', 'Air from entering the fuel supply line and causing vapor lock', 'Diesel fuel from migrating into gasoline tanks through shared vent lines'], correct: 1, exp: 'Without an anti-siphon valve on the fuel supply fitting, gravity can drive fuel from a full tank through the fuel line, past the engine fuel pump check valve, and into the engine — eventually overflowing into the bilge, creating a fire and pollution hazard.' },
      { q: 'Where should a CO detector be mounted in a vessel sleeping cabin?', a: ['At ceiling level, since CO is lighter than air', 'At breathing height (similar to residential placement), since CO distributes throughout the cabin', 'In the bilge below the sleeping area', 'Adjacent to the propane solenoid valve only'], correct: 1, exp: 'CO is close to the density of air and distributes relatively uniformly throughout enclosed spaces (unlike propane, which sinks, or smoke, which rises). Detectors at breathing height mirror proven residential detector placement standards.' },
      { q: 'NFPA 303 governs fire protection at:', a: ['Vessel engine room suppression systems', 'Marinas and boatyards — the shore-side electrical and fire infrastructure', 'USCG-inspected vessels over 100 gross tons', 'Portable fire extinguisher specifications only'], correct: 1, exp: 'NFPA 303 "Fire Protection Standard for Marinas and Boatyards" covers marina electrical systems, fire detection, sprinkler requirements, fueling operations, and general fire safety — the shore-side environment that marine technicians work in daily.' },
      { q: 'A 35-foot sailboat requires which minimum USCG fire extinguisher arrangement?', a: ['One B-I extinguisher anywhere on the vessel', 'Two B-I or one B-II extinguisher', 'Three B-I or two B-II extinguishers', 'One B-III extinguisher'], correct: 1, exp: 'Vessels 26–40 feet require a minimum of two B-I or one B-II portable fire extinguisher. The B-I and B-II designations indicate minimum extinguisher size — more extinguishers are always acceptable and recommended for offshore use.' },
      { q: 'USCG vessel documentation (Certificate of Documentation) requires the documentation number to be:', a: ['Displayed on the outside hull in letters at least 4 inches high', 'Marked on an interior structural part of the vessel in block-type Arabic numerals at least 3 inches high', 'Recorded only on the USCG registration database', 'Printed on the vessel\'s registration certificate carried aboard'], correct: 1, exp: 'USCG regulations require the documentation number to be permanently marked on an interior structural member (frame, keel, etc.) of the vessel in block-type Arabic numerals not less than 3 inches in height — a tamper-evident identification measure.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 16 — MARINE TECHNICIAN CAREER PATH
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'marine-career',
    num: 16,
    title: 'Marine Technician Career Path',
    desc: 'ABYC certifications, manufacturer credentials, marine industry employment sectors, and compensation ranges.',
    slides: [
      {
        title: 'ABYC Certifications & Professional Standards',
        body: [
          'ABYC (American Boat and Yacht Council) certifications are the industry standard for professional marine technicians — surveyors, insurers, and dealers expect ABYC credentials when evaluating technician competency.',
          'The ABYC Marine Electrical Technician certification (based on E-11) is the most sought-after specialty — covering AC/DC systems, shore power, battery banks, inverters, and bonding.',
          'ABYC Systems Certification (broader) covers marine systems including plumbing, fuel, steering, and engine systems in addition to electrical — the path to ABYC Master Marine Technician status.',
          'ABYC Master Marine Technician (MMT) requires multiple specialty certifications, documented work hours, and recertification every 3 years — the gold standard for marina service departments and boatyard lead technicians.',
          'NMEA Installer certification (from the National Marine Electronics Association) demonstrates competency in installing and commissioning chart plotters, VHF radios, AIS, and NMEA 2000 networks.',
          'Manufacturer-specific certifications (Victron Energy, Mastervolt, Furuno, Raymarine, Garmin) are required by dealers for warranty work and demonstrate proficiency with specific product lines.',
          'The combination of ABYC Electrical + ABYC Systems + NMEA Installer is the strongest entry credential for a marine electronics and electrical technician role.',
        ],
        keyPoints: [
          'ABYC Marine Electrical (E-11) is the most in-demand specialty certification for electrical systems work',
          'ABYC Master Marine Technician = multiple specialties + documented hours + 3-year recertification',
          'NMEA Installer + manufacturer certs (Victron, Raymarine) maximize employment and warranty eligibility',
        ],
        quiz: [
          {
            q: 'Which ABYC certification is most directly relevant to a technician specializing in battery banks, shore power systems, and inverter/charger installation?',
            a: ['ABYC Master Marine Technician', 'ABYC Marine Electrical Technician (E-11 specialty)', 'ABYC Systems Certification (plumbing/fuel)', 'NMEA Installer Certification'],
            correct: 1,
            exp: 'The ABYC Marine Electrical Technician certification is grounded in ABYC E-11, the standard governing all marine AC/DC electrical systems. It is the direct credential for technicians working on shore power, battery systems, inverters, and marine wiring.',
          },
          {
            q: 'Why do marine electronics dealers typically require technicians to hold manufacturer-specific certifications (e.g., Raymarine, Garmin)?',
            a: ['ABYC prohibits warranty work without manufacturer certs', 'Manufacturer certifications are required to perform warranty repairs and demonstrate product-line-specific configuration knowledge', 'Manufacturer certs replace NMEA Installer certification', 'They are required only for commercial vessel work'],
            correct: 1,
            exp: 'Manufacturers require authorized dealer technicians to complete product-specific training to be eligible for warranty claim reimbursement. This training covers installation nuances, firmware updates, diagnostic procedures, and configuration specific to each product line.',
          },
        ],
      },
      {
        title: 'Marine Industry Employment & Compensation',
        body: [
          'Marina service departments employ technicians for boat maintenance, winterization, commissioning, repairs, and customer warranty work — steady year-round work in warm climates, seasonal in northern markets.',
          'Boatyards and shipyards handle larger vessels and more complex refit work — fiberglass, paint, carpentry, and systems — with stronger job security but less electrical specialization.',
          'Mobile marine technicians operate independently, driving to client vessels at marinas or on moorings — higher earning potential per hour, but requires tools, a service vehicle, and business administration skills.',
          'Yacht management and delivery services need technicians with broad competency who can operate and maintain vessels during deliveries and owner absence — often involves travel.',
          'Hyperspecialization in lithium battery systems and marine renewable energy (solar + wind + alternator management) is the highest-demand and best-compensated niche in the current market.',
          'Compensation: entry-level $42,000–$58,000 (marina technician with basic ABYC); experienced $65,000–$90,000 (ABYC MMT + manufacturer certs); senior/specialist or mobile self-employed $90,000–$130,000+.',
          'The most effective entry path for a career technician: ABYC Electrical certification first, work in a marina service department 2–3 years to build documented hours, then specialize in electronics/lithium systems for maximum market value.',
        ],
        keyPoints: [
          'Mobile technician: highest hourly rate but requires self-employment infrastructure',
          'Lithium systems and marine renewable energy: highest-demand niche today',
          'Entry path: ABYC Electrical → marina service department (build hours) → specialty certification → specialist roles',
        ],
        quiz: [
          {
            q: 'Which marine technician employment sector typically offers the highest earning potential per hour worked?',
            a: ['Marina service department technician (salaried)', 'Boatyard general maintenance worker', 'Mobile marine technician (self-employed)', 'Yacht club dockhand with electronics duties'],
            correct: 2,
            exp: 'Mobile marine technicians bill hourly rates of $100–$180/hour in many markets (2024), capturing the full rate without marina overhead. The tradeoff is self-employment complexity — tools, vehicle, insurance, billing, and business development.',
          },
          {
            q: 'What specialization currently commands the highest demand and compensation premiums in the marine technician market?',
            a: ['Traditional gasoline outboard engine repair', 'Fiberglass repair and paint', 'Lithium battery systems and marine renewable energy integration', 'Compass calibration and traditional navigation'],
            correct: 2,
            exp: 'Lithium battery banks, solar MPPT systems, alternator regulation, and inverter/charger integration are complex, high-value systems that most marina technicians cannot fully service. Specialists with documented lithium competency (Victron, Mastervolt, lithium BMS experience) command premium rates.',
          },
        ],
      },
    ],
    test: [
      { q: 'ABYC recertification for Master Marine Technician (MMT) is required every:', a: ['1 year', '2 years', '3 years', '5 years'], correct: 2, exp: 'ABYC MMT certification requires recertification every 3 years to ensure technicians stay current with updated standards, new technology, and revised code requirements. The recertification process includes testing on updated ABYC standards.' },
      { q: 'Which certifying body issues the NMEA Installer certification for marine electronics installation?', a: ['ABYC', 'USCG', 'National Marine Electronics Association (NMEA)', 'NFPA'], correct: 2, exp: 'NMEA (National Marine Electronics Association) administers the NMEA Installer certification program, testing competency in marine electronics installation including NMEA 2000 network design, VHF/DSC, AIS, chart plotters, and integration best practices.' },
      { q: 'A marina service department technician with ABYC Electrical certification and 3 years experience can typically expect to earn:', a: ['$28,000–$38,000', '$42,000–$58,000', '$65,000–$90,000', '$110,000–$150,000'], correct: 1, exp: 'Entry to mid-level marina technicians with ABYC credentials typically earn $42,000–$58,000 in 2024 US markets. Experienced ABYC MMT holders with manufacturer certifications can reach $65,000–$90,000, and specialist mobile technicians can exceed $90,000.' },
      { q: 'What documented requirement does ABYC impose for technicians progressing toward Master Marine Technician (MMT) status, beyond passing exams?', a: ['A Coast Guard merchant mariner credential', 'Documented work hours in the applicable specialty areas', 'A college degree in marine engineering', 'Completion of a 2-year USCG-approved apprenticeship'], correct: 1, exp: 'ABYC MMT status requires not only passing specialty certification exams but also documented professional work hours in the marine industry, demonstrating real-world experience beyond classroom knowledge.' },
      { q: 'A technician specializing in lithium battery systems on yachts commands premium compensation primarily because:', a: ['Lithium work requires a USCG engineering license', 'Lithium systems are complex (BMS, charge source coordination, DC-DC converters) and most technicians lack training, making qualified specialists scarce and high-value', 'Lithium battery work is classified as hazardous materials handling requiring special certification', 'Insurance companies mandate lithium specialist sign-off on all battery installations'], correct: 1, exp: 'Lithium battery systems require understanding of BMS operation, charge source compatibility, load-dump protection, MPPT solar integration, and alternator regulation — a stack of interrelated knowledge most general marine technicians have not developed. Scarcity drives compensation.' },
      { q: 'A mobile marine technician\'s primary cost advantage over a marina service department is:', a: ['Lower tool cost since customers supply tools', 'Capturing the full hourly rate without employer overhead — no shared markup on labor', 'Access to manufacturer warranty reimbursement that marina employees cannot receive', 'Avoidance of ABYC certification requirements for independent work'], correct: 1, exp: 'A marina service department technician earns a fraction of the billing rate — the rest goes to shop overhead, profit margin, and administration. A mobile technician bills the customer directly, capturing significantly more of the revenue per hour worked, offset by self-employment costs.' },
      { q: 'Manufacturer-specific marine product certifications (Victron, Raymarine) are primarily valuable for:', a: ['Meeting ABYC recertification requirements', 'Eligibility for warranty repair reimbursement and demonstrating product-specific installation and configuration expertise', 'Satisfying USCG licensing requirements for marine electronics work', 'Replacing NMEA Installer certification'], correct: 1, exp: 'Manufacturers require authorized technicians to hold product-specific certifications to process warranty claims and perform authorized service. Beyond warranty, product certs provide deep product knowledge that customers pay a premium for.' },
      { q: 'Which marine industry segment typically offers the most complex and highest-skill electrical refit work?', a: ['Marina service departments (routine maintenance)', 'Yacht delivery services', 'Boatyards and shipyards handling major refit projects', 'Outboard engine dealers'], correct: 2, exp: 'Major yacht refits at boatyards involve full system replacements, complete rewiring, lithium battery bank installations, solar/wind integration, and complex electronic system upgrades — the highest-complexity, highest-skill work in the marine service industry.' },
      { q: 'The ABYC Marine Electrical Technician specialty certification is primarily based on which ABYC standard?', a: ['ABYC A-31', 'ABYC E-11', 'ABYC H-2', 'ABYC P-1'], correct: 1, exp: 'The ABYC Marine Electrical Technician certification tests knowledge of ABYC E-11 "AC and DC Electrical Systems on Boats" — the foundational marine electrical standard covering all aspects of vessel electrical systems.' },
      { q: 'The recommended entry path for a marine technician targeting electrical specialization and maximum long-term compensation is:', a: ['Start as a mobile technician immediately to maximize hourly rate', 'ABYC Electrical cert first → marina service department (2–3 years, documented hours) → specialty certs (lithium, NMEA, manufacturer) → specialist or mobile role', 'College marine engineering degree → boatyard supervisor → ABYC exams', 'USCG merchant mariner credential → offshore vessel engineer → shore-based technical role'], correct: 1, exp: 'Marina service work builds documented hours and exposure to diverse systems under mentorship. ABYC and manufacturer certs are more achievable and marketable than formal engineering degrees for the technical specialist path. The specialty/mobile pivot maximizes compensation once experience is established.' },
    ],
  },
];
