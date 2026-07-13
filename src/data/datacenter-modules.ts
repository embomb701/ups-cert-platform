import type { TrainingModule } from './modules';

// Data Center Critical Facilities course — the four data-center-specific
// modules (course positions 25-28). The rest of the 28-module course is
// assembled from shared foundation (1-10), UPS core (11-16), Generator core
// (17-21), and HVAC cooling modules (22-24) — see COURSE_SEQUENCES.

export const DATACENTER_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 25 — DATA CENTER COOLING SYSTEMS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dc-cooling',
    num: 25,
    title: 'Data Center Cooling Systems',
    desc: 'CRAC/CRAH units, hot/cold aisle containment, airflow management, and the liquid-cooling transition — every watt of IT is a watt of cooling.',
    slides: [
      {
        title: 'The Heat Problem and Room Cooling',
        body: [
          'A data center is a machine for converting electricity into computation, and thermodynamics collects its tax: essentially every watt delivered to the IT load becomes heat that must leave the room, continuously, forever. A 1 MW data hall is a 1 MW heater running 24/7 — which is why cooling is roughly a third of a traditional facility\'s power bill and why the cooling plant is co-equal with the power chain in the critical facilities job.',
          'The classic room-cooling machines: CRAC units (Computer Room Air Conditioner — a DX refrigeration system in a cabinet: compressors, evaporator, remote or glycol condenser; everything from the refrigeration core applies) and CRAH units (Computer Room Air Handler — chilled-water coils fed by a central plant, no compressors in the room; the HVAC chillers module applies). Both typically discharge cold air down into a raised-floor plenum, feed it up through perforated tiles to server intakes, and pull hot return air back at the top.',
          'The room is an airflow circuit, and the Module-14 lessons (HVAC) rule it: perforated-tile placement IS the air distribution system (tiles in the hot aisle are a classic misconfiguration — cooling nobody), underfloor blockages (cable dams) starve racks like crushed ducts, and BYPASS (cold air returning without touching a server) and RECIRCULATION (hot exhaust re-entering server intakes) are the twin sins every airflow audit hunts. A rack complaining of heat in a room full of cold air almost always has an airflow-path problem, not a capacity problem.',
          'CRAC/CRAH service is your existing skill set in a new cabinet: filters and belts, condensate systems (a plugged CRAH drain above a live floor is a legendary incident), humidifiers (infrared or ultrasonic — and their scale problems), chilled-water valves and actuators (BAS lessons), DX circuits on CRACs (superheat/subcooling as always), and unit-level controls with their own event logs. Fleet discipline matters: units share the room, so one unit fighting another (one humidifying while its neighbor dehumidifies) is a classic tuning find.',
        ],
        keyPoints: [
          'Every IT watt is a heat watt: cooling is co-equal with power in this job',
          'CRAC = DX in a cabinet; CRAH = chilled-water coil — your refrigeration/HVAC cores apply directly',
          'Bypass and recirculation are the twin airflow sins; tile placement is the air distribution system',
          'Fleet tuning: units fighting each other (humidify vs dehumidify) wastes capacity invisibly',
        ],
        quiz: [
          {
            q: 'A rack reports inlet temperatures of 95°F while the room\'s CRAH units run at half capacity with cold aisles measurably cold. The most likely problem class is:',
            a: ['Insufficient cooling capacity', 'An airflow path problem: recirculation of hot exhaust or blocked tile/underfloor delivery to that rack', 'Failed chillers', 'Overloaded PDUs'],
            correct: 1,
            exp: 'Cold air exists; it is not reaching the servers. Recirculation over/around racks and underfloor blockages overheat equipment in rooms with surplus capacity — the audit hunts the path, not the plant.',
          },
          {
            q: 'Two adjacent CRAC units log constant runtime: one humidifying, the other dehumidifying. The finding is:',
            a: ['Normal redundancy', 'The units are fighting each other — wasting energy and capacity; align their setpoints/deadbands', 'A refrigerant leak', 'BMS failure'],
            correct: 1,
            exp: 'Units sharing one air mass with mismatched humidity setpoints wage invisible war. Fleet-level setpoint discipline is a classic efficiency and capacity recovery.',
          },
        ],
      },
      {
        title: 'Containment, Envelopes, and Free Cooling',
        body: [
          'HOT/COLD AISLE arrangement is the room\'s first airflow law: racks face intake-to-intake across a cold aisle and exhaust into shared hot aisles, so cold supply and hot return never mix — in theory. CONTAINMENT makes the theory physical: cold-aisle containment (doors and roofs over the cold aisle) or hot-aisle containment (capturing exhaust into a ceiling return plenum) separates the air masses, and the difference is dramatic: contained rooms run warmer supply, higher CRAH setpoints, and far less bypass. Your service reality: containment only works when maintained — missing blanking panels in racks (recirculation inside the rack!), open floor cutouts, propped doors, and unsealed cable penetrations are the audit checklist.',
          'ASHRAE TC 9.9 envelopes govern what "cold enough" means, and they widened dramatically: recommended inlet air of roughly 64.4–80.6°F (18–27°C) replaced the old meat-locker rooms. Warmer setpoints save enormous energy and expand free-cooling hours — but they shrink the thermal ride-through margin when cooling fails: a room at 78°F has minutes fewer than a room at 68°F before servers throttle. That tradeoff (efficiency vs ride-through) is a design decision you operate within, and it is why cooling-failure response times matter more in modern rooms.',
          'Free cooling at data center scale extends the HVAC economizer lesson: air-side economizers duct filtered outdoor air directly (climate and contamination permitting), water-side economizers use cooling towers + heat exchangers to make chilled water without running chiller compressors when outdoor wet-bulb is low. The metric wrapping all of it is PUE (Power Usage Effectiveness = total facility power ÷ IT power): a PUE of 1.5 means half again as much power overhead as compute; modern free-cooled facilities chase 1.1-1.2. Field relevance: your coil cleaning, damper repairs, and setpoint discipline move the PUE needle measurably — cooling technicians are efficiency engineers whether they know it or not.',
          'Cooling failures have a signature discipline: thermal RIDE-THROUGH is short (minutes, set by room mass and load density), so cooling equipment restarts after power events are choreographed (chilled-water plants restart in staged sequences; know your site\'s), and "cooling on generator" is a design question you must know the answer to at your site — some facilities shed mechanical load during transfer and count on ride-through, which turns a slow generator start into a thermal event even with perfect power.',
        ],
        keyPoints: [
          'Containment works only when maintained: blanking panels, floor cutouts, doors, penetrations',
          'Wider ASHRAE envelopes save energy but shrink thermal ride-through — response time matters more',
          'PUE = total power ÷ IT power: your coils, dampers, and setpoints move it measurably',
          'Know your site: cooling restart sequences and whether mechanical load rides the generator',
        ],
        quiz: [
          {
            q: 'After an IT refresh removed half the servers from several racks, nearby racks began overheating although room capacity is now hugely surplus. The classic cause is:',
            a: ['The CRAHs are oversized now', 'Missing blanking panels in the half-empty racks let hot exhaust recirculate through the empty U-spaces to the intakes', 'The chillers are failing', 'PUE is too low'],
            correct: 1,
            exp: 'Empty rack spaces without blanking panels are recirculation highways inside the rack itself. The cheapest fix in data center cooling: plastic panels.',
          },
          {
            q: 'During a utility outage, power transferred perfectly to generator in 9 seconds — but servers thermal-throttled anyway. The design fact that explains it is:',
            a: ['Generators produce dirty power', 'Mechanical/cooling loads were shed during transfer and the room\'s thermal ride-through at its warm setpoint was shorter than the cooling restart sequence', 'UPS batteries failed', 'The CRAHs need new filters'],
            correct: 1,
            exp: 'Power ride-through and thermal ride-through are different clocks. Warm, dense rooms have minutes; staged chilled-water restarts can take longer — a known design tradeoff the CFT must know at their site.',
          },
        ],
      },
      {
        title: 'The Liquid Cooling Transition',
        body: [
          'AI changed the physics: racks that historically drew 5-15 kW now arrive at 40, 80, 120+ kW for GPU clusters, and air simply cannot carry heat away from silicon at those densities. The industry\'s answer is liquid — water and engineered coolants moved to the heat instead of air — and the critical facilities tech of this decade services it.',
          'The liquid-cooling ladder: REAR-DOOR HEAT EXCHANGERS (a chilled-water coil replacing the rack\'s back door — the room stays air-cooled, but each rack exhausts neutral air; service = coils, valves, and leak vigilance at rack scale), DIRECT-TO-CHIP (cold plates on CPUs/GPUs fed by a Coolant Distribution Unit — the CDU is your new machine: pumps, heat exchangers separating the facility water from the technology loop, filters, and sensors), and IMMERSION (servers submerged in dielectric fluid tanks — still niche, with its own fluid-handling world).',
          'The CDU is where your trades converge: it is a small hydronic plant (HVAC module lessons — pumps, ΔT, flow), with power-electronics-grade cleanliness demands (particulates kill microchannel cold plates; filtration and fluid chemistry are life-and-death), quick-disconnect manifolds to every server (each one a potential drip), and leak detection everywhere (rope sensors in trays, under floors — because water and megawatt busways share the room now). Fluid chemistry maintenance (corrosion inhibitors, biocide in technology loops) is the kitchen course\'s water-treatment religion, at silicon prices.',
          'Career framing: air-cooling skills remain the fleet\'s bulk, but liquid-literacy is the differentiation of the next decade — the tech who can service a CDU, read a technology-loop chemistry report, and respond to a leak alarm without panic is walking into the highest-density, highest-paying rooms in the industry. This module makes you conversant; OEM training (per platform) makes you authorized — the manufacturer-school economics of every other course, again.',
        ],
        keyPoints: [
          'AI rack densities (40-120+ kW) exceed air\'s physics — liquid is the industry answer',
          'The ladder: rear-door HX → direct-to-chip with CDUs → immersion',
          'The CDU is a hydronic plant with silicon-grade cleanliness: filtration and fluid chemistry are critical',
          'Leak detection and response discipline: water now lives beside the busways',
        ],
        quiz: [
          {
            q: 'A direct-to-chip cooling loop shows rising GPU temperatures across many servers while CDU supply temperature and flow read normal. The silicon-scale suspect is:',
            a: ['The facility chillers', 'Cold-plate microchannel fouling from particulate/chemistry problems in the technology loop', 'Room airflow', 'The UPS'],
            correct: 1,
            exp: 'Normal supply + normal flow + hot chips = heat transfer failing at the plates. Microchannels foul from particulates and chemistry drift — why technology-loop filtration and fluid maintenance are non-negotiable.',
          },
          {
            q: 'The CDU\'s core architectural job is:',
            a: ['Compressing refrigerant', 'Separating the facility water loop from the technology (server) loop via heat exchanger while managing pumps, filtration, and monitoring', 'Replacing the UPS', 'Dehumidifying the room'],
            correct: 1,
            exp: 'Facility water is too dirty and too wild for cold plates. The CDU isolates loops, conditions the technology-side fluid, and is the serviceable heart of direct-to-chip cooling.',
          },
        ],
      },
    ],
    test: [
      { q: 'Essentially every watt delivered to IT equipment becomes:', a: ['Stored energy', 'Heat the cooling plant must remove continuously', 'Reactive power', 'Light'], correct: 1, exp: 'Thermodynamics taxes computation: a 1 MW hall is a 1 MW heater, forever.' },
      { q: 'A CRAH differs from a CRAC because the CRAH:', a: ['Has no fans', 'Uses chilled-water coils from a central plant instead of its own DX refrigeration', 'Only humidifies', 'Sits on the roof'], correct: 1, exp: 'CRAC = compressors in the cabinet (DX); CRAH = coil fed by the chiller plant.' },
      { q: 'Bypass and recirculation are:', a: ['Two chiller modes', 'Cold air missing the servers, and hot exhaust re-entering intakes — the twin airflow sins', 'Generator transfer states', 'BMS alarm tiers'], correct: 1, exp: 'Both waste capacity and overheat racks in "cold" rooms; airflow audits exist to hunt them.' },
      { q: 'Missing blanking panels in racks cause:', a: ['Lower PUE', 'In-rack recirculation: exhaust returns through empty U-spaces to the intakes', 'Better airflow', 'Chilled-water leaks'], correct: 1, exp: 'The cheapest fix in the room: panels block the internal recirculation highway.' },
      { q: 'Modern ASHRAE inlet envelopes (up to ~80°F) trade:', a: ['Nothing — warmer is free', 'Large energy savings against shorter thermal ride-through when cooling fails', 'Server warranty for efficiency', 'Humidity for temperature'], correct: 1, exp: 'Warm rooms save energy and extend free cooling but leave fewer minutes before throttling on cooling loss.' },
      { q: 'PUE measures:', a: ['Power quality', 'Total facility power divided by IT power — the overhead ratio your maintenance moves', 'UPS efficiency only', 'Cooling tons per rack'], correct: 1, exp: 'PUE 1.5 = 50% overhead. Coil cleaning, dampers, and setpoint discipline are PUE work.' },
      { q: 'Water-side economization makes chilled water using:', a: ['Extra compressors', 'Cooling towers and heat exchangers when outdoor wet-bulb is low — compressors off', 'City water', 'DX circuits'], correct: 1, exp: 'The free-cooling lesson at plant scale: evaporation does the chiller\'s job in cool weather.' },
      { q: 'Thermal ride-through is:', a: ['Generator start time', 'The minutes a room can absorb cooling loss before equipment overheats — shorter in warm, dense rooms', 'Battery runtime', 'Chiller restart delay'], correct: 1, exp: 'Power and thermal ride-through are different clocks; modern envelopes shrink the thermal one.' },
      { q: 'Rack densities driving the liquid-cooling transition are:', a: ['1-2 kW', '40-120+ kW for AI/GPU clusters — beyond air\'s carrying capacity', '5 kW', 'Unchanged for decades'], correct: 1, exp: 'AI hardware broke air cooling\'s physics; liquid moved to the chips in response.' },
      { q: 'The CDU in direct-to-chip cooling:', a: ['Chills the whole room', 'Isolates facility water from the technology loop and manages pumps, filtration, and fluid condition', 'Replaces the CRAHs', 'Stores coolant only'], correct: 1, exp: 'A small hydronic plant with silicon-grade cleanliness duties — the serviceable heart of liquid cooling.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 26 — EPMS, BMS & DCIM MONITORING
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dc-monitoring',
    num: 26,
    title: 'EPMS, BMS & DCIM Monitoring',
    desc: 'The monitoring stacks: electrical power monitoring, building management, and DCIM — the room\'s flight recorders and your diagnostic superpower.',
    slides: [
      {
        title: 'The Three Stacks',
        body: [
          'A data center watches itself through three overlapping systems, and the critical facilities tech lives in all of them. The EPMS (Electrical Power Monitoring System) instruments the power chain: utility feeds, switchgear, generators, UPS modules, PDUs, busways, down to branch circuits — live one-line screens, per-device metering, waveform capture on events, and alarm streams. The BMS (Building Management System — the HVAC course\'s BAS, wearing its data center badge) runs and monitors the mechanical plant: chillers, CRAHs, pumps, towers, dampers, sensors. DCIM (Data Center Infrastructure Management) sits above both plus the IT layer: rack-level capacity, asset tracking, environmental sensors, and the planning views that decide where the next server lands.',
          'The EPMS one-line screen is Module 7 (drawings) made live: the same one-line diagram you learned to read now shows real breaker states, real loads, real alarms. Fluency means walking the chain on glass — utility → gear → ATS/generator → UPS → distribution → floor — and knowing what NORMAL looks like at your site (baseline literacy, as always), because diagnosing an event starts with recognizing which numbers moved.',
          'Sensor truth is the eternal law (kitchen probes, HVAC static sensors, generator senders — now at facility scale): a branch-circuit CT reading garbage, a stuck damper feedback, a drifted temperature probe in a hot aisle each corrupt the decisions and alarms built on them. Calibration checks and command-vs-reality verification (the BAS graphic says the valve is open — is it?) are PM line items here exactly as in the HVAC course.',
          'Your working relationship with the stacks: READ them constantly (rounds increasingly happen on glass before they happen on foot), TRUST but VERIFY them (walk the floor; meters in hand), and FEED them honestly (your work orders, readings, and closure notes become the history the next tech\'s diagnosis leans on — documentation religion, now with a database).',
        ],
        keyPoints: [
          'EPMS = the power chain live; BMS = the mechanical plant; DCIM = capacity/assets above both',
          'The EPMS one-line is your drawings module made live — walk the chain on glass',
          'Sensor truth at facility scale: calibration and command-vs-reality checks are PM items',
          'Read constantly, verify physically, feed honestly — the stacks are shared memory',
        ],
        quiz: [
          {
            q: 'The DCIM shows a rack drawing 2 kW; your clamp meter on its feed reads 9 A at 208V (~1.9 kVA per phase measured across three phases totaling ~5.6 kW). The professional next step is:',
            a: ['Trust the DCIM — it is the system of record', 'Investigate the discrepancy: likely a mis-mapped or faulty branch-circuit CT — the monitoring is lying about this rack', 'Derate the rack', 'Recalibrate your clamp meter to match'],
            correct: 1,
            exp: 'Meters beat databases. A mis-mapped CT under-reporting a rack corrupts capacity planning and hides overload risk — sensor-truth verification is the finding, and fixing the instrumentation is the work order.',
          },
          {
            q: 'The EPMS live one-line\'s greatest diagnostic value during an event is:',
            a: ['Its color scheme', 'Showing which stage of the power chain the abnormality entered — walking the chain on glass', 'Replacing field measurements', 'Automatic repairs'],
            correct: 1,
            exp: 'Utility → gear → generator/ATS → UPS → distribution: the live one-line localizes events the way the sequence-of-operation localizes furnace faults.',
          },
        ],
      },
      {
        title: 'Alarms, Trends, and Event Forensics',
        body: [
          'Alarm philosophy is a designed system, not noise: severities tiered (informational → warning → urgent → critical), routing mapped (who gets paged for what), and thresholds set with intent. The enemy is ALARM FATIGUE — a console crying wolf hundreds of times a shift trains operators to ignore it, and ignored consoles precede famous outages. Your contribution: clear the nuisance sources you service (the CRAH that alarms humidity every morning because its sensor drifts; the breaker with a chattering auxiliary contact), and never silence/shelve an alarm without a ticket that says why and until when.',
          'TRENDS are the facility\'s vital-signs charts and your predictive superpower — the year-over-year PM baselines of every course, automated: a UPS module\'s inverter temperature creeping monthly, a chilled-water ΔT narrowing (fouling coils), a generator battery\'s float current rising (the module-13 lesson, graphed), a rack inlet warming as its aisle\'s tiles get shuffled. Fifteen minutes of trend review before a PM visit converts the visit from inspection to targeted hunt.',
          'EVENT FORENSICS is where the stacks shine: after any power event, the EPMS holds a time-synchronized record — which breaker moved first, what the UPS saw at its input, when the generator start command fired, voltage waveforms at millisecond resolution. Reconstructing the sequence (with the generator controller\'s and UPS\'s own logs — every machine\'s event log, correlated) is the legal-grade root-cause discipline of the generator course, now with facility-wide instrumentation. Preserve first, conclude second, always.',
          'Time synchronization is the quiet hero: correlated forensics require synchronized clocks (NTP across devices) — a facility whose device clocks drift minutes apart cannot reconstruct causality. Noticing and reporting clock drift on the gear you service is the kind of small professional catch that marks the tech who understands the system.',
        ],
        keyPoints: [
          'Alarm fatigue precedes outages: fix nuisance sources; never shelve alarms without documented why/when',
          'Trends are automated PM baselines — review before every visit; hunt what moved',
          'Event forensics: time-synced EPMS + each machine\'s own logs, preserved before conclusions',
          'Clock sync (NTP) underpins causality — report drift like the professional catch it is',
        ],
        quiz: [
          {
            q: 'A UPS transferred to battery for 40 ms last Tuesday with no utility event recorded anywhere. Before condemning the UPS, the monitoring-literate move is:',
            a: ['Replace the UPS input board', 'Pull the time-synchronized EPMS records and every device log around that timestamp — find what the chain actually saw, in order', 'Clear the alarm and monitor', 'Blame the utility'],
            correct: 1,
            exp: 'Forty milliseconds is invisible to humans and vivid to the EPMS. Waveform capture and correlated logs reveal whether the disturbance was upstream, at the gear, or in the UPS\'s own sensing.',
          },
          {
            q: 'An operator has shelved the same CRAH humidity alarm every shift for months. The professional response is:',
            a: ['Continue shelving — it is routine', 'Fix the root cause (drifted sensor/mis-tuned setpoint) and restore the alarm\'s meaning — routine shelving is alarm fatigue institutionalized', 'Delete the alarm point', 'Raise the threshold until it stops'],
            correct: 1,
            exp: 'Every routinely ignored alarm trains the console\'s audience to ignore the next one — which someday is real. Nuisance-alarm elimination is safety work.',
          },
        ],
      },
    ],
    test: [
      { q: 'The EPMS monitors:', a: ['Only the UPS', 'The electrical chain end to end: utility, gear, generators, UPS, PDUs, branch circuits', 'The chillers', 'IT applications'], correct: 1, exp: 'The power chain instrumented live — the one-line diagram with real numbers on it.' },
      { q: 'DCIM sits above EPMS/BMS to provide:', a: ['Waveform capture', 'Rack-level capacity, asset, and environmental views for planning and operations', 'Chiller sequencing', 'Generator control'], correct: 1, exp: 'The capacity-and-assets layer: where the next server lands and what every rack draws.' },
      { q: 'The eternal sensor-truth law at facility scale means:', a: ['Sensors are always right', 'Monitoring decisions are only as honest as their instruments — calibration and command-vs-reality checks are PM items', 'Meters are obsolete', 'Only DCIM matters'], correct: 1, exp: 'Mis-mapped CTs and drifted probes corrupt everything downstream — verify physically.' },
      { q: 'Alarm fatigue is dangerous because:', a: ['It wears out consoles', 'Routinely ignored alarms train operators to miss the real one', 'It uses bandwidth', 'It voids warranties'], correct: 1, exp: 'The crying-wolf console precedes famous outages; nuisance-alarm elimination is safety work.' },
      { q: 'Shelving/silencing an alarm requires:', a: ['Nothing — operator discretion', 'A ticket documenting why and until when', 'Manager approval only', 'Deleting the point'], correct: 1, exp: 'Undocumented silencing is how facilities forget they are blind somewhere.' },
      { q: 'Trend review before a PM visit:', a: ['Wastes time', 'Converts inspection into a targeted hunt for what has moved since baseline', 'Replaces the visit', 'Is only for engineers'], correct: 1, exp: 'The year-over-year baseline discipline of every course, automated and graphed.' },
      { q: 'After a power event, EPMS waveform capture tells you:', a: ['Which vendor to blame', 'What each stage of the chain actually saw, at millisecond resolution and in sequence', 'Whether PUE changed', 'Nothing useful'], correct: 1, exp: 'Facility-wide forensics: which breaker moved first, what the UPS input saw, when commands fired.' },
      { q: 'Correlated event forensics depends on:', a: ['Vendor cooperation', 'Time synchronization (NTP) across devices — drifting clocks destroy causality', 'Cloud storage', 'Color-coded cables'], correct: 1, exp: 'Reconstruction requires synchronized timestamps; clock drift is a reportable defect.' },
      { q: 'A narrowing chilled-water ΔT trend suggests:', a: ['Improving efficiency', 'Coil fouling or flow problems developing — investigate before capacity complaints arrive', 'Sensor perfection', 'Lower IT load only'], correct: 1, exp: 'ΔT trends are the hydronic vital sign: fouling and bypass show up here first.' },
      { q: 'Your closure notes and readings in the monitoring/ticket stack are:', a: ['Bureaucracy', 'The shared memory the next diagnosis leans on — documentation religion with a database', 'Optional for techs', 'Legal liability only'], correct: 1, exp: 'Feed the stacks honestly: future-you and every colleague inherit what you record.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 27 — CRITICAL FACILITY OPERATIONS DISCIPLINE
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dc-operations',
    num: 27,
    title: 'Critical Facility Operations Discipline',
    desc: 'MOPs, SOPs, EOPs, change management, rounds, and concurrent maintainability — the operational culture that keeps five-nines alive.',
    slides: [
      {
        title: 'Why Data Centers Run on Procedure',
        body: [
          'Everything else this portal taught assumed a forgiving world: a kitchen down for an hour loses lunch; a house without cooling waits for you. A data center outage is measured in millions per hour, breached contracts, and headlines — so the industry evolved a safety culture borrowed from aviation and nuclear power: WORK HAPPENS ONLY THROUGH WRITTEN PROCEDURE. This is the module where good hands meet institutional discipline, and the techs who embrace it inherit the best rooms in the trade.',
          'The procedure trinity: SOPs (Standard Operating Procedures — how routine things are done: rounds, readings, filter changes), MOPs (Methods of Procedure — step-by-step scripts for specific maintenance: "Annual PM, UPS Module 3," written in advance, peer-reviewed, listing every step, every verification, every back-out), and EOPs (Emergency Operating Procedures — pre-scripted responses to failures: loss of chilled water, UPS on battery, generator fail-to-start — so 3 a.m. hands follow tested logic instead of adrenaline).',
          'A MOP\'s anatomy teaches the culture: purpose and scope, risk level and approvals, affected systems and their redundancy state during the work, step-by-step actions each with expected result and verification, STOP-WORK criteria (what reading/response halts everything), back-out procedure from any step, and required signatures — including yours. Executing a MOP means initialing steps as performed, not skimming; deviations require stopping and escalating, not improvising. This will feel slow the first month and lifesaving the first time step 14\'s expected reading is wrong.',
          'CHANGE MANAGEMENT wraps every non-routine act: work is requested, risk-assessed, approved, scheduled into maintenance windows, and communicated — nobody, including the most senior tech, opens a panel in a critical facility on impulse. The generator course\'s departure ritual and the kitchen course\'s documentation religion were rehearsals; here they are institutional law with your signature on it.',
        ],
        keyPoints: [
          'SOPs = routine; MOPs = scripted maintenance; EOPs = pre-scripted emergencies',
          'MOPs execute step-by-initialed-step; deviations stop and escalate, never improvise',
          'STOP-WORK criteria and back-out plans are the script\'s soul — know them before step 1',
          'Change management is law: no impulse work in a critical facility, ever',
        ],
        quiz: [
          {
            q: 'At step 14 of a UPS PM MOP, the expected DC bus reading is absent — a value the MOP did not anticipate appears instead. The trained response is:',
            a: ['Improvise a fix quickly to stay on schedule', 'Stop work per the MOP\'s criteria, hold the system in its current safe state, and escalate before proceeding', 'Skip to step 15', 'Back out silently and reschedule'],
            correct: 1,
            exp: 'Unexpected readings are exactly what STOP-WORK criteria exist for. The MOP culture trades heroics for reliability — stop, stabilize, escalate is the professional move.',
          },
          {
            q: 'EOPs exist because:',
            a: ['Regulators demand paperwork', '3 a.m. emergency hands follow tested written logic better than adrenaline-driven improvisation', 'Techs cannot be trusted', 'Insurance requires them'],
            correct: 1,
            exp: 'Aviation\'s checklist lesson: pre-scripted, rehearsed responses beat on-the-spot invention precisely when stakes and stress peak.',
          },
        ],
      },
      {
        title: 'Redundancy, Rounds, and Incident Response',
        body: [
          'Redundancy vocabulary governs what you may touch and when: N (exactly enough capacity — nothing spare), N+1 (one spare unit of each system — the workhorse standard), 2N (two complete independent paths — A and B sides from utility through UPS to dual-corded servers). CONCURRENT MAINTAINABILITY is the design promise that any component can be maintained without dropping the load — and MAINTENANCE reduces redundancy: an N+1 UPS system with one module in bypass for PM is running at N, which is why change management asks "what is our redundancy state during this work?" and why weather, utility work, and high-load days can freeze otherwise-approved maintenance windows.',
          'The A/B discipline of 2N facilities is a daily physical reality: dual power paths must stay independent (an extension cord between A and B power strips defeats millions of dollars of design — and gets found on rounds), dual-corded servers verified actually cabled to both sides, and single-corded orphans documented with transfer switches. On the mechanical side: valve line-ups define which pumps/chillers serve which loops, and a mispositioned valve after maintenance is the hydronic version of the not-in-AUTO generator — the walkdown after any work verifies line-ups against the drawing.',
          'ROUNDS formalize the walkaround religion of every course into shifts: scheduled routes with recorded readings (on paper or tablet), eyes on every room, and the discipline that readings get RECORDED not remembered — because trends (module 26) are built from honest rounds, and because "it was fine at 0200" carries legal weight after an incident. Good rounds catch the weeping valve, the new noise, the warm breaker, the shelved alarm — the pre-failure evidence every course taught you to see.',
          'INCIDENT RESPONSE choreography: roles (incident commander, communicator, hands), the discipline of one voice to the customer and one log of actions taken, EOPs as the script, and the POST-INCIDENT REVIEW as the learning engine — blameless in style, ruthless in root cause (the five-whys chain: the breaker tripped ← because it was overloaded ← because a circuit was mis-mapped in DCIM ← because a change closed without verification ← fix the closure process, not just the breaker). The generator course\'s legal-grade documentation habits apply to every incident artifact.',
        ],
        keyPoints: [
          'N / N+1 / 2N vocabulary decides what you may touch; maintenance temporarily reduces redundancy',
          'A/B independence is physical daily discipline; valve line-ups verified against drawings after any work',
          'Rounds = the walkaround religion in shifts: recorded, honest, trend-feeding',
          'Incidents: roles, one log, EOP scripts, and blameless-but-ruthless post-incident review',
        ],
        quiz: [
          {
            q: 'During rounds in a 2N facility you find a power strip extension cord connecting an A-side rack PDU to a B-side outlet "temporarily" feeding an orphan device. The significance is:',
            a: ['Harmless resourcefulness', 'It couples the independent A and B paths — a fault or maintenance on either side can now affect both; document, escalate, and get it corrected properly', 'Fine if under 10 amps', 'Only an aesthetic violation'],
            correct: 1,
            exp: 'The whole 2N promise is path independence. One improvised cord defeats the design; rounds exist to find exactly this, and the fix is a proper transfer switch or dual-cording, through change management.',
          },
          {
            q: 'An N+1 chilled water plant has one chiller down for approved PM when a second chiller trips. The facility is now:',
            a: ['Still N+1', 'Below N — an active capacity emergency requiring the EOP, not just a repair ticket', 'At 2N', 'Fine due to ride-through'],
            correct: 1,
            exp: 'Maintenance had already spent the +1. The trip takes the plant below need: EOP response (load management, emergency restart priorities, escalation) — the redundancy-state awareness the module drills.',
          },
        ],
      },
    ],
    test: [
      { q: 'Work in critical facilities happens:', a: ['At tech discretion', 'Only through written, approved procedure (SOPs/MOPs/EOPs) and change management', 'Fastest hands first', 'Only at night'], correct: 1, exp: 'The aviation-grade culture: no impulse work, every act scripted, approved, and signed.' },
      { q: 'A MOP is:', a: ['A cleaning tool', 'A step-by-step, peer-reviewed script for a specific maintenance task with verifications, stop-work criteria, and back-out', 'A monthly operations plan', 'A vendor manual'], correct: 1, exp: 'The Method of Procedure: initialed step by step, deviations stop and escalate.' },
      { q: 'STOP-WORK criteria exist to:', a: ['Extend billable hours', 'Halt execution the moment reality diverges from the script — stabilize and escalate beats improvise', 'Punish slow techs', 'Satisfy auditors only'], correct: 1, exp: 'Unexpected readings are the signal to stop, not to get creative — reliability over heroics.' },
      { q: 'N+1 redundancy means:', a: ['Two of everything', 'One spare unit beyond need — and maintenance on any unit temporarily reduces the system to N', 'No spares', 'New plus one year old'], correct: 1, exp: 'The workhorse standard, and the reason change management tracks redundancy state during work.' },
      { q: '2N architecture promises:', a: ['Double speed', 'Two fully independent paths (A/B) from utility to dual-corded load', 'Two operators', 'Twice the PUE'], correct: 1, exp: 'Complete path independence — defeated by any improvised A-to-B coupling.' },
      { q: 'Concurrent maintainability means:', a: ['Two techs per task', 'Any component can be maintained without dropping the critical load', 'Working faster', 'Maintenance during incidents'], correct: 1, exp: 'The design promise that PM never requires an outage — used through change-managed windows.' },
      { q: 'A mispositioned valve found after plant maintenance is analogous to:', a: ['A dirty filter', 'The generator course\'s not-in-AUTO: a human-state error the post-work walkdown exists to catch', 'Normal drift', 'A design flaw'], correct: 1, exp: 'Line-up verification against drawings is the hydronic departure ritual.' },
      { q: 'Rounds readings must be:', a: ['Memorized', 'Recorded honestly — they feed trends and carry evidentiary weight after incidents', 'Estimated', 'Optional when busy'], correct: 1, exp: '"It was fine at 0200" only counts written down; rounds are the walkaround religion in shifts.' },
      { q: 'During an incident, communication follows:', a: ['Everyone updates the customer', 'One voice to the customer, one log of actions, roles assigned per the EOP', 'Silence until resolved', 'Social media'], correct: 1, exp: 'Choreographed roles and a single action log keep response coherent and reviewable.' },
      { q: 'A post-incident review is:', a: ['A blame assignment', 'Blameless in style, ruthless in root cause — fixing processes, not just parts', 'Optional for small events', 'A legal deposition'], correct: 1, exp: 'The learning engine: five-whys to the process failure behind the part failure.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 28 — CAREER IN DATA CENTER FACILITIES
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dc-career',
    num: 28,
    title: 'Career in Data Center Facilities',
    desc: 'The premium room: CFT roles, the shift-work reality, certifications, and the operator-to-chief path in the industry the AI boom is building.',
    slides: [
      {
        title: 'The Market and the Role',
        body: [
          'Data centers are the defining construction boom of this decade: AI demand has hyperscalers (the cloud giants), colocation providers, and enterprises building gigawatts of capacity — every megawatt of which needs critical facilities technicians the industry openly cannot find. The CFT role is the destination this portal\'s stack was built toward: the UPS course\'s power chain, the generator course\'s standby plant, the HVAC course\'s cooling, module 25-27\'s data-center specifics — one technician, one room, all of it.',
          'The employers and their flavors: HYPERSCALE (massive campuses, deep procedures, structured career ladders, excellent benefits — and the most rigorous operations culture), COLOCATION (multi-tenant facilities, customer-facing polish matters, variety across suites), ENTERPRISE (banks, healthcare — often calmer, tied to the parent business), and the OPERATIONS CONTRACTORS who staff facilities for owners (a common entry door with routes upward). Adjacent doors: commissioning agents (testing new builds — travel-heavy, skill-compounding), and the OEM field service teams (UPS/generator/cooling manufacturers) serving these same rooms.',
          'Compensation runs at the top of this portal\'s trades: entry CFT/operator roles commonly $55-75K, experienced techs $75-100K+, leads and chief engineers well beyond — with hyperscale locations, night-shift differentials, and hot markets pushing higher. The trade for those numbers is the SHIFT REALITY: data centers run 24/7/365 and so do their facility teams — 12-hour shifts on rotating patterns, nights and holidays included. Some techs thrive on the schedule (blocks of days off), others transfer to day-shift roles (PM planners, vendor coordinators) as they advance; go in with eyes open.',
          'What hiring managers actually screen for, in their own words: electrical fundamentals that survive questioning (your foundation), the safety reflexes (LOTO stories, arc-flash literacy), evidence of documentation discipline, and temperament — the calm, procedural, ego-light profile module 27 trained. Certifications open doors; the interview probes whether the habits behind them are real.',
        ],
        keyPoints: [
          'The AI buildout has every operator hunting CFTs; this portal\'s stack (UPS+Gen+Cooling+Ops) is the exact profile',
          'Employer flavors: hyperscale, colo, enterprise, operations contractors, commissioning, OEM field teams',
          'Entry $55-75K, experienced $75-100K+, leads/chiefs beyond — traded against 24/7 shift reality',
          'Interviews screen fundamentals, safety reflexes, documentation habits, and procedural temperament',
        ],
        quiz: [
          {
            q: 'The career profile this portal\'s combined curriculum most directly produces for data centers is:',
            a: ['A software administrator', 'The critical facilities technician: fluent across the UPS power chain, standby generation, cooling plant, and operations discipline in one role', 'A network engineer', 'A construction electrician'],
            correct: 1,
            exp: 'The CFT owns the room\'s physical layer end to end — exactly the cross-trade stack (power, standby, cooling, procedure) these courses assembled.',
          },
          {
            q: 'The honest tradeoff against data center facilities\' premium compensation is:',
            a: ['Dangerous work with no procedures', 'The 24/7/365 shift reality: rotating 12-hour patterns including nights and holidays', 'Low job security', 'Constant travel'],
            correct: 1,
            exp: 'The room never sleeps and neither does its coverage. Blocks of days off suit many; day-shift paths open with advancement — but enter with eyes open.',
          },
        ],
      },
      {
        title: 'The Ladder and the Long Game',
        body: [
          'The credential landscape: this portal\'s certificates (the technical stack), then the data-center-specific layer — CDCP/CDCS (Certified Data Centre Professional/Specialist), Uptime Institute\'s ATD/AOS accreditations (design/operations literacy the industry respects), BICSI\'s DCDC on the design side — plus the perennial OEM schools (the UPS, generator, chiller, and now CDU manufacturers whose authorizations make you dispatchable, the economics every course taught). None replace the fundamentals; each converts them into door-opening paper.',
          'The internal ladder is unusually legible: CFT/operator → shift lead → chief engineer/facility manager → regional/portfolio roles — with lateral doors into commissioning, capacity engineering, vendor management, and construction-side operations consulting. The differentiators at each rung are the habits this portal preached: the tech whose rounds are honest, whose MOP execution is exact, whose incident notes survive review, and who can EXPLAIN systems (teaching juniors is the audition for lead) climbs fast in an industry starving for exactly that.',
          'The liquid-cooling decade (module 25) is the timely bet: air-cooled fleets need today\'s skills; the AI halls being built need techs conversant in CDUs, fluid chemistry, and leak response — and almost nobody is yet. Volunteering for the liquid training, the new-hall commissioning, the CDU vendor school is how a two-year tech becomes the site authority on the highest-density rooms.',
          'The portal\'s closing word: nine trades, one method. Whether the room holds fryers or FLOPS, the career is built the same way — honest diagnosis, faithful documentation, continuous learning, and the safety reflexes that bring you home. The data center is simply where all nine roads meet, and where the industry pays best for the habits you now own. Go run the rooms that run the world.',
        ],
        keyPoints: [
          'Credential layer: CDCP/CDCS, Uptime accreditations, BICSI — atop this portal\'s stack and OEM schools',
          'Ladder: CFT → shift lead → chief → portfolio; teaching juniors is the audition for lead',
          'Liquid-cooling fluency is the decade\'s differentiator — volunteer for it early',
          'Nine trades, one method: the habits are the career, and this room pays best for them',
        ],
        quiz: [
          {
            q: 'The fastest way for a junior CFT to become indispensable during the AI buildout is:',
            a: ['Seniority alone', 'Volunteering into the liquid-cooling/CDU training and new-hall commissioning that almost no incumbent techs have yet', 'Avoiding night shifts', 'Specializing in one vendor\'s UPS only'],
            correct: 1,
            exp: 'The highest-density halls are hiring for skills the workforce has not built yet. Early liquid-cooling fluency turns a two-year tech into the site authority.',
          },
          {
            q: 'Across all nine of this portal\'s trades, the common engine of career advancement is:',
            a: ['Certifications alone', 'Honest diagnosis, faithful documentation, continuous learning, and safety reflexes — the habits every course drilled', 'Overtime volume', 'Brand loyalty'],
            correct: 1,
            exp: 'The portal\'s thesis, one last time: the habits are the career. The data center is where they pay best — but they travel to every room.',
          },
        ],
      },
    ],
    test: [
      { q: 'The demand driver making CFTs the industry\'s scarcest hire is:', a: ['Declining construction', 'The AI/cloud buildout adding gigawatts of capacity that all need facilities teams', 'Automation replacing techs', 'Shrinking colocation'], correct: 1, exp: 'Every new megawatt needs technicians; the buildout outruns the workforce.' },
      { q: 'The CFT role combines:', a: ['Networking and coding', 'The UPS power chain, standby generation, cooling plant, and operations discipline in one technician', 'Sales and marketing', 'Construction trades only'], correct: 1, exp: 'The room\'s entire physical layer — the exact stack this portal assembled.' },
      { q: 'Hyperscale operators are characterized by:', a: ['Loose procedures', 'Massive campuses, the most rigorous operations culture, and structured ladders', 'No shift work', 'Single-tenant suites'], correct: 1, exp: 'The deep-procedure end of the market — module 27\'s culture at maximum.' },
      { q: 'Data center facilities compensation:', a: ['Trails other trades', 'Tops this portal\'s trades: entry $55-75K, experienced $75-100K+, leads beyond', 'Is commission-based', 'Is capped at $60K'], correct: 1, exp: 'The premium room pays premium rates — traded against the 24/7 shift reality.' },
      { q: 'The shift reality of the role is:', a: ['Monday-Friday days', '24/7/365 coverage: rotating 12-hour patterns including nights and holidays', 'On-call only', 'Seasonal'], correct: 1, exp: 'The room never sleeps; enter with eyes open (and enjoy the blocks of days off).' },
      { q: 'Industry-respected data center credentials include:', a: ['Only OEM schools', 'CDCP/CDCS, Uptime Institute accreditations, BICSI — atop technical fundamentals', 'Driving certifications', 'None exist'], correct: 1, exp: 'The paper layer that converts fundamentals into open doors — never a substitute for them.' },
      { q: 'The audition for shift lead is typically:', a: ['Longest tenure', 'Teaching juniors and explaining systems — the facility bets on who develops others', 'Fastest MOP execution', 'Most overtime'], correct: 1, exp: 'Leads multiply competence; the tech who can teach is the tech who gets promoted.' },
      { q: 'Liquid-cooling fluency matters now because:', a: ['Air cooling is banned', 'AI halls need CDU/fluid-literate techs and almost none exist yet — early adopters become site authorities', 'It is easier than air', 'OSHA requires it'], correct: 1, exp: 'Module 25\'s decade bet: the skills gap is the opportunity.' },
      { q: 'Commissioning-agent roles offer:', a: ['Less technical depth', 'Travel-heavy, skill-compounding work testing new builds — a strong lateral door', 'No relevance to CFTs', 'Only office work'], correct: 1, exp: 'Testing new facilities end-to-end builds the deepest systems literacy in the industry.' },
      { q: 'The portal\'s unifying career thesis, proven across nine trades, is:', a: ['Specialize immediately', 'Honest diagnosis, faithful documentation, continuous learning, and safety reflexes are the career — everywhere', 'Certifications guarantee success', 'Data centers are the only path'], correct: 1, exp: 'One method, nine rooms. The habits travel; the data center just pays them best.' },
    ],
  },
];
