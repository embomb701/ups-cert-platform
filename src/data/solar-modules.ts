import type { TrainingModule } from './modules';

// Solar & Battery Energy Storage course — solar-specific modules (course
// positions 13-21). The sequence is: shared foundation 1-10, the UPS battery
// modules at positions 11-12 (battery-types, battery-safety), then these.
// Nums are course positions. Kept OUT of ALL_MODULES.

export const SOLAR_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 13 — PV CELL & MODULE FUNDAMENTALS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'solar-pv-fundamentals',
    num: 13,
    title: 'PV Cell & Module Fundamentals',
    desc: 'How sunlight becomes DC: cells, modules, the IV curve, and the factors that steal production.',
    slides: [
      {
        title: 'The Photovoltaic Effect and the Module',
        body: [
          'A solar cell is a semiconductor diode built to be hit by light: photons striking the silicon knock electrons loose across a p-n junction, and the junction\'s built-in field sweeps them out as DC current. No moving parts, no fuel, no combustion — just physics that works for 25+ years, degrading about half a percent annually. Everything in solar service traces back to this cell and the things that interfere with it.',
          'Cells are wired in series inside a MODULE (panel): a typical residential module runs 60-72 cells (or 120-144 half-cut cells), producing 350-450+ watts at roughly 30-50 volts. The nameplate tells the story in test-condition numbers: Pmax (rated power), Voc (open-circuit voltage — the maximum, cold-morning number), Isc (short-circuit current), and Vmp/Imp (the voltage and current at the maximum power point where the module actually works). These ratings assume STC — Standard Test Conditions (1000 W/m² irradiance, 25°C cell temperature) — which the real world rarely provides.',
          'Two environmental levers move production constantly: IRRADIANCE drives CURRENT almost linearly (half the sun, half the amps), while TEMPERATURE drives VOLTAGE inversely (hot cells lose voltage — roughly 0.3-0.4% per °C, which is why panels produce best on cold, clear days and why rooftop modules baking at 65°C give up real power). Burn this asymmetry in: current problems point at light and shading; voltage problems point at temperature and circuit issues.',
          'Module technologies you will meet: monocrystalline (the modern default), older polycrystalline fleets, bifacial modules (harvesting reflected light on the back face — mounted high with reflective ground), and thin-film in utility niches. Half-cut cell and multi-busbar designs reduce internal resistance losses; integrated bypass diodes (usually three per module) let a module route current around a shaded or damaged cell group instead of choking the whole string — remember those diodes: they fail, and their failure signature appears in module 14.',
        ],
        tables: [
          {
            caption: 'Nameplate vocabulary',
            headers: ['Rating', 'Meaning', 'Field significance'],
            rows: [
              ['Voc', 'Open-circuit voltage', 'Maximum voltage — highest when COLD; string sizing math'],
              ['Isc', 'Short-circuit current', 'Maximum current — scales with irradiance'],
              ['Vmp / Imp', 'Max-power-point voltage/current', 'Where MPPT holds the module'],
              ['Pmax @ STC', 'Rated watts at 1000 W/m², 25°C', 'The number reality rarely matches exactly'],
            ],
          },
        ],
        keyPoints: [
          'Cells are light-driven diodes: photons in, DC out, ~0.5%/yr degradation over 25+ years',
          'Irradiance drives current; temperature drives voltage (inversely) — the diagnostic asymmetry',
          'STC ratings assume 1000 W/m² and 25°C cells — real conditions always differ',
          'Bypass diodes (≈3/module) route around shaded cell groups; their failures have signatures',
        ],
        quiz: [
          {
            q: 'A system produces noticeably MORE power on a cold, brilliantly clear January afternoon than on a hazy 95°F July day. The physics is:',
            a: ['Winter sun is closer', 'Cold cells hold higher voltage while clear skies deliver full irradiance current — heat robs voltage in summer', 'The inverter prefers winter', 'Snow reflection only'],
            correct: 1,
            exp: 'Voltage falls ~0.3-0.4% per °C of cell temperature. Cold + clear = high voltage AND high current: the best production weather there is.',
          },
          {
            q: 'A module\'s output current has dropped to half of expected while its voltage reads normal. The first suspect class is:',
            a: ['Cell temperature', 'Reduced light reaching the cells: shading, soiling, or debris — current follows irradiance', 'A failed bypass diode', 'Loose grounding'],
            correct: 1,
            exp: 'Current scales with light almost linearly. Half the amps at normal volts says half the photons: look up (shade) and look at the glass (soiling) before opening anything.',
          },
        ],
      },
      {
        title: 'The IV Curve and What Steals Production',
        body: [
          'The IV curve is the module\'s signature: sweep from short-circuit (max current, zero volts) to open-circuit (max volts, zero current) and plot every operating point between. The healthy curve is a smooth shoulder; its "knee" is the maximum power point. Module 19 makes curve-tracing your commissioning instrument — here you learn to READ it: a lowered flat top = current loss (soiling, shading, degradation); a shortened width = voltage loss (temperature, bad cells, wiring); STEPS or notches in the curve = mismatch within the module — classically a shaded cell group or an activated/failed bypass diode.',
          'SHADING is solar\'s disproportionate villain: because cells in series carry one shared current, shading a single cell can throttle an entire cell group — the bypass diode then routes around that group, sacrificing its voltage to save the string\'s current. A chimney shadow crossing one module at 3pm daily shows up as a repeating afternoon production dent. Learn to think in shadows and seasons: winter\'s low sun throws long shadows that summer commissioning never saw.',
          'SOILING is the slow thief: dust, pollen, bird droppings (concentrated hot-spot risk, not just loss), leaf litter at row bottoms. Uniform soiling skims a few percent; localized heavy soiling behaves like shading, complete with hot spots. HOT SPOTS — localized heating where a bad or blocked cell dissipates its neighbors\' power — are found by IR camera (module 19) and matter doubly: production loss now, accelerated degradation and even fire risk later.',
          'Module-level failure catalog for the walkaround: DELAMINATION and browning (moisture ingress paths), CRACKED cells from hail/handling (snail trails as the visible symptom), burned junction boxes (failed diodes or loose connections — smell and discoloration), and PID (potential-induced degradation — voltage-stress-driven losses in some fleets, sometimes recoverable with mitigation hardware). The eyes-first discipline of every course applies: most module problems announce themselves visually before any meter is needed.',
        ],
        keyPoints: [
          'IV curve reading: lower top = current loss; narrower width = voltage loss; steps = mismatch/diode action',
          'One shaded cell throttles a whole series group — bypass diodes trade voltage to save current',
          'Soiling skims percent; localized soiling makes hot spots — IR finds them before they burn',
          'Walkaround catalog: delamination, snail trails, burned J-boxes, PID — eyes first, always',
        ],
        quiz: [
          {
            q: 'An IV curve trace of a string shows two distinct steps in an otherwise smooth curve. The classic meaning is:',
            a: ['Perfect string health', 'Mismatch within the string: shaded/damaged cell groups with bypass diodes conducting around them', 'Inverter failure', 'Excess irradiance'],
            correct: 1,
            exp: 'Each step is a cell group dropping out via its bypass diode — shading, soiling patches, or damaged cells. The curve counts the sacrificed groups for you.',
          },
          {
            q: 'A single bird dropping dead-center on one cell concerns you more than uniform light dust across the array because:',
            a: ['It is harder to clean', 'The fully blocked cell becomes a hot spot, dissipating its neighbors\' power as heat — a degradation and fire risk, not just a loss', 'It voids the warranty', 'It attracts more birds'],
            correct: 1,
            exp: 'Uniform soiling skims production; a blocked cell in a conducting string becomes a resistive heater. Localized blockage = hot-spot physics.',
          },
        ],
      },
    ],
    test: [
      { q: 'A PV cell generates electricity when:', a: ['Heated by the sun', 'Photons free electrons across its p-n junction, swept out as DC', 'Wind moves its surface', 'UV ionizes the air'], correct: 1, exp: 'The photovoltaic effect: light in, DC out — a diode built to be illuminated.' },
      { q: 'Typical module degradation is about:', a: ['5% per year', '0.5% per year over a 25+ year life', 'Zero until failure', '10% per decade guaranteed'], correct: 1, exp: 'Roughly half a percent annually — the warranty math of the industry.' },
      { q: 'Voc is highest:', a: ['On hot afternoons', 'On cold mornings — voltage rises as temperature falls', 'At solar noon in summer', 'During storms'], correct: 1, exp: 'The inverse temperature relationship: cold cells = maximum voltage, the number string sizing fears.' },
      { q: 'Module current scales primarily with:', a: ['Temperature', 'Irradiance — half the light, half the amps', 'Humidity', 'Wire gauge'], correct: 1, exp: 'Current follows photons nearly linearly; the diagnostic asymmetry\'s other half.' },
      { q: 'STC ratings assume:', a: ['Real rooftop conditions', '1000 W/m² irradiance at 25°C cell temperature', 'Sea-level winter', 'Manufacturer optimism'], correct: 1, exp: 'Standard Test Conditions — the lab yardstick reality rarely matches (hot cells lose voltage).' },
      { q: 'Bypass diodes in modules exist to:', a: ['Boost voltage', 'Route current around shaded/damaged cell groups instead of choking the string', 'Prevent lightning damage', 'Charge batteries directly'], correct: 1, exp: 'They sacrifice a group\'s voltage to preserve string current — and leave steps in IV curves when active.' },
      { q: 'Shading one cell in a series group:', a: ['Costs one cell\'s output', 'Can throttle the entire group\'s current — series strings carry one shared current', 'Has no effect', 'Only matters at dawn'], correct: 1, exp: 'Series physics: the weakest cell caps the group, which is why shadows cost far more than their area.' },
      { q: 'Hot spots are dangerous because:', a: ['They melt snow unevenly', 'A blocked/bad cell dissipates its neighbors\' power as heat — degradation and fire risk', 'They confuse MPPT', 'They attract lightning'], correct: 1, exp: 'The blocked cell becomes a resistive heater inside the laminate; IR cameras exist for this hunt.' },
      { q: 'Snail trails on a module surface indicate:', a: ['Actual snails', 'Micro-cracked cells showing chemical discoloration paths', 'Normal aging', 'Cleaning residue'], correct: 1, exp: 'The visible fingerprint of cell cracking from hail or handling — a walkaround catalog item.' },
      { q: 'The first instrument in module diagnosis is:', a: ['A megger', 'Your eyes: delamination, browning, burned J-boxes, and soiling announce themselves visually', 'An oscilloscope', 'A drone'], correct: 1, exp: 'The eyes-first walkaround religion of every course applies on the roof too.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 14 — ARRAYS, STRINGS & DC-SIDE DESIGN
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'solar-arrays-dc',
    num: 14,
    title: 'Arrays, Strings & DC-Side Design',
    desc: 'Series/parallel string math, cold-Voc sizing, combiners, MPPT, and the unique dangers of a source you cannot turn off.',
    slides: [
      {
        title: 'String Math and the Cold-Morning Ceiling',
        body: [
          'Modules wire in SERIES into strings — voltages add, one current flows — and strings parallel into arrays — currents add at a shared voltage. The foundation-course circuit laws run everything: a string of 12 modules at 40 Vmp each presents ~480 V to the inverter; three such strings in parallel triple the current. Every DC-side fault you will ever chase is series/parallel reasoning with sunshine behind it.',
          'STRING SIZING is a winter calculation, and this is the field\'s most consequential design rule: string Voc must never exceed the inverter\'s maximum input (and code\'s 600 V residential / 1000-1500 V commercial ceilings) — AT THE COLDEST EXPECTED TEMPERATURE, when Voc peaks. A string designed casually in July can present destructive overvoltage on the first −10°C clear dawn: the inverter\'s input stage is the victim. Temperature-corrected Voc math (module datasheet coefficients × record-low design temp) is the check; NEC tables provide the correction factors when datasheets are missing.',
          'Downstream hardware: COMBINER BOXES merge parallel strings through fuses (string fusing protects conductors from the combined backfeed of parallel neighbors into a faulted string), HOME RUNS carry the combined DC to the inverter, and DISCONNECTS provide the code-required isolation points. Connector discipline matters disproportionately: the field-crimped MC4-style connector is the industry\'s most notorious failure point — mismatched brands, bad crimps, and water ingress cause arcs, burned connectors, and ground faults; connector inspection belongs in every array walkaround.',
          'MPPT (Maximum Power Point Tracking) is the inverter continuously adjusting its input operating point to hold each string at the knee of its IV curve as sun and temperature move it around. Practical implications: separate MPPT inputs exist so differently-oriented or differently-shaded roof faces do not drag each other down (mixing east and west strings on one tracker wastes both), and MODULE-LEVEL power electronics — microinverters and DC optimizers — push tracking to each panel, buying shade tolerance and per-module monitoring at the cost of more electronics on the roof (rapid-shutdown compliance rides along; module 16).',
        ],
        keyPoints: [
          'Series adds voltage, parallel adds current — all DC diagnosis is this plus sunshine',
          'String sizing is a COLD calculation: temperature-corrected Voc vs inverter/code ceilings',
          'MC4-style connectors are the #1 DC failure point: crimps, brand-mixing, water — inspect always',
          'Separate MPPT inputs per orientation; optimizers/micros trade electronics for shade tolerance',
        ],
        quiz: [
          {
            q: 'An inverter failed on the coldest clear morning of the year; its string of 14 modules was added last summer by another installer. The engineering error to check first is:',
            a: ['Snow load on the roof', 'String Voc at record-low temperature exceeding the inverter\'s maximum input — the cold-morning overvoltage classic', 'Undersized wire', 'Dirty modules'],
            correct: 1,
            exp: 'Voc peaks in cold. A string sized against summer numbers can cross the input ceiling on the first frigid dawn — temperature-corrected Voc math is the non-negotiable check.',
          },
          {
            q: 'East-facing and west-facing roof strings landed on one shared MPPT input. The consequence is:',
            a: ['Perfect averaging', 'Each face drags the other off its power point through the day — measurable production loss on both', 'Inverter overheating', 'Code violation only'],
            correct: 1,
            exp: 'One tracker cannot hold two different optimal points. Orientation-mixed strings sabotage each other — separate MPPT inputs (or optimizers) exist for exactly this.',
          },
        ],
      },
      {
        title: 'The Source You Cannot Turn Off',
        body: [
          'Here is solar\'s defining safety fact, stated plainly: WHENEVER LIGHT HITS THE ARRAY, THE DC SIDE IS ENERGIZED. No disconnect de-energizes the modules themselves; opening the DC disconnect merely stops current flow — full string Voc still sits across open contacts and every conductor upstream. Your foundation LOTO discipline gets a solar amendment: isolate, then treat everything array-side as live, always, and plan work accordingly (dawn/dusk work windows for connector-level tasks, opaque coverings when the procedure truly demands a dead module).',
          'DC ARC FAULTS are solar\'s signature hazard: DC has no zero-crossing to snuff an arc, so a failing connector or chafed conductor can sustain a plasma arc that starts fires. Code answered with AFCI (arc-fault circuit interruption) built into modern inverters — nuisance AFCI trips are therefore DIAGNOSTIC GOLD, not annoyances: something in the DC path is arcing or noisy (that connector catalog again), and "resetting until it stays on" is the forbidden move.',
          'GROUND FAULTS on the DC side behave unlike anything in AC land: transformerless inverters run ISOLATION TESTS at every wake-up (Riso measurements) and refuse to start below thresholds — the classic morning-fault-clears-by-noon pattern is MOISTURE in a connector or junction box (dew-wet insulation leaks at dawn, dries by lunch). The hunt is the megger discipline from your foundation, applied string by string with the array treated as live: isolate strings at the combiner, test each to ground, split-half your way to the wet connector.',
          'Working the DC side, consolidated: gloves and eye protection at minimum per site policy (arc-rated where thresholds demand), never open a connector under load (draw = arc — verify current is zero via the inverter/clamp first), respect fuse ratings in combiners (a string fuse is not a service disconnect), and label literacy (module 16\'s placards are your map of what is energized from where). The trade\'s memorable summary: the roof is a generator that sunrise turns on whether or not anyone is ready.',
        ],
        keyPoints: [
          'Light on the array = energized DC, disconnects notwithstanding — plan work around this fact',
          'DC arcs do not self-extinguish: AFCI trips are diagnostic gold; never reset-until-it-holds',
          'Morning ground faults that clear by noon = moisture in a connector/J-box; megger string by string',
          'Never open connectors under load; verify zero current first — draw equals arc',
        ],
        quiz: [
          {
            q: 'An inverter refuses to start each morning on an isolation (Riso) fault, then runs normally from late morning onward. The classic cause is:',
            a: ['A failing inverter', 'Moisture in a connector or junction box leaking to ground when dew-wet, drying as the sun climbs', 'Undersized strings', 'Grid voltage sag'],
            correct: 1,
            exp: 'The dawn-fault-noon-recovery pattern is the moisture signature. String-by-string megger isolation finds the wet point — often one bad connector crimp letting water in.',
          },
          {
            q: 'Repeated AFCI trips on one string should be treated as:',
            a: ['Inverter firmware noise to reset through', 'Evidence of a real arcing/degrading connection in that string\'s DC path — inspect before it becomes a fire', 'Utility interference', 'Normal cloud-edge behavior'],
            correct: 1,
            exp: 'DC arcs sustain and ignite. The AFCI heard something: the connector/conductor hunt is mandatory, and reset-until-quiet is the forbidden move.',
          },
          {
            q: 'Before separating an MC4 connector during daylight service you must:',
            a: ['Wipe it clean', 'Verify the circuit is carrying zero current — opening under load draws a DC arc across the connector', 'Warm it by hand', 'Ground yourself to the rail'],
            correct: 1,
            exp: 'Voltage will be present regardless (light = energized), but arcs need current. Confirm zero flow (inverter off/disconnect open, clamp-verified) before any connector opens.',
          },
        ],
      },
    ],
    test: [
      { q: 'Series-wired modules combine by:', a: ['Adding currents', 'Adding voltages with one shared current', 'Averaging power', 'Isolating faults'], correct: 1, exp: 'Strings stack voltage; paralleling strings stacks current — foundation circuit law with sunshine.' },
      { q: 'String sizing must be verified against:', a: ['Summer noon output', 'Temperature-corrected Voc at the record-low design temperature vs inverter/code ceilings', 'Average annual production', 'Wire color codes'], correct: 1, exp: 'Cold morning Voc is the destructive maximum — the field\'s most consequential design check.' },
      { q: 'String fuses in combiner boxes protect against:', a: ['Lightning', 'Parallel strings backfeeding combined current into a faulted string', 'MPPT errors', 'Overvoltage'], correct: 1, exp: 'A faulted string can sink its healthy neighbors\' current; the fuse caps that backfeed.' },
      { q: 'The DC side\'s most notorious physical failure point is:', a: ['Module glass', 'Field-made MC4-style connectors: crimps, brand mixing, water ingress', 'Rail bonding', 'The disconnect handle'], correct: 1, exp: 'The connector catalog drives arcs, ground faults, and AFCI trips — inspect on every walkaround.' },
      { q: 'MPPT continuously:', a: ['Limits current for safety', 'Adjusts the operating point to hold strings at their IV-curve knee as conditions move', 'Balances phases', 'Charges batteries'], correct: 1, exp: 'The tracker chases maximum power as irradiance and temperature slide the curve around.' },
      { q: 'Opening the DC disconnect makes the array conductors:', a: ['Fully de-energized', 'Still energized at full Voc whenever light hits the modules — only current flow stops', 'Grounded', 'Safe to cut'], correct: 1, exp: 'The defining solar safety fact: sunrise turns the generator on regardless of switches.' },
      { q: 'DC arc faults are uniquely dangerous because:', a: ['They are louder', 'DC has no zero-crossing to extinguish the arc — it sustains and ignites', 'They trip breakers instantly', 'They only occur at night'], correct: 1, exp: 'AC arcs self-snuff 120 times a second; DC arcs burn until interrupted — hence AFCI.' },
      { q: 'Repeated AFCI trips demand:', a: ['Firmware resets until stable', 'A physical inspection hunt for the arcing/degrading connection', 'Bigger fuses', 'Ignoring during cloudy weather'], correct: 1, exp: 'The detector heard arcing. Reset-until-quiet trades a nuisance for a fire.' },
      { q: 'A ground fault present at dawn that clears by midday indicates:', a: ['Inverter aging', 'Moisture-driven leakage drying with the sun — hunt the wet connector by string isolation', 'Utility backfeed', 'Frost heave'], correct: 1, exp: 'Dew-wet insulation leaks at wake-up Riso tests; megger split-half the strings to the culprit.' },
      { q: 'Separate MPPT inputs (or per-module electronics) exist because:', a: ['Code requires two of everything', 'Differently oriented/shaded strings drag each other off their power points when shared', 'Inverters need redundancy', 'Fuses require it'], correct: 1, exp: 'One tracker, one optimal point: mixed orientations sabotage each other without separation.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 15 — SOLAR INVERTERS & POWER CONVERSION
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'solar-inverters',
    num: 15,
    title: 'Solar Inverters & Power Conversion',
    desc: 'String, central, and microinverter architectures, grid-interactive behavior, IEEE 1547 — the UPS student meets the grid-tie inverter.',
    slides: [
      {
        title: 'Grid-Tie Anatomy and the Architectures',
        body: [
          'The UPS student\'s homecoming, chapter three: a solar inverter is the familiar power-electronics story — DC in, MPPT stage, DC bus, IGBT/MOSFET bridge synthesizing AC — pointed at the grid instead of a protected load. Same capacitor discipline (the DC bus holds charge after shutdown; verify discharge, always), same thermal reality (power electronics die of heat: clogged fans, blocked heatsinks, and attic-mounted inverters cooking in July are your service bread-and-butter), same event logs as first witness.',
          'The residential/commercial architectures: STRING INVERTERS (the workhorse — strings land directly; one or several MPPT inputs; wall-mounted; whole-array electronics in one serviceable box), MICROINVERTERS (one small inverter per module — AC leaves the roof; per-module MPPT and monitoring; failures are granular and rooftop-located), and DC OPTIMIZERS + inverter (per-module DC-DC trackers feeding a simplified central inverter — the hybrid position). Utility-scale adds CENTRAL inverters (shipping-container class). Service implications differ sharply: string inverter fault = one visit to one box; micro fault = roof work to swap one unit while the rest keep producing.',
          'Grid-INTERACTIVE means the inverter synchronizes to the utility and pushes current INTO it — which demands manners: it must match grid voltage/frequency/phase continuously (a PLL doing the sync-check relay\'s job from the generator course, continuously), ride through minor disturbances, and — the absolute rule — STOP exporting when the grid dies. ANTI-ISLANDING is that rule\'s enforcement: an inverter feeding a dead utility line would energize wires that lineworkers believe dead; certified inverters detect grid loss and disconnect within seconds. Standard grid-tie systems therefore produce NOTHING in a blackout — the customer conversation you will have a hundred times, and the sales bridge to module 17\'s batteries.',
          'IEEE 1547 (with UL 1741 certification) governs the manners in detail, and its modern revision made inverters grid CITIZENS: mandatory ride-through of specified voltage/frequency excursions, volt-VAR and frequency-watt support functions, and utility-selectable profiles. Field consequence: inverter grid settings are UTILITY-GOVERNED configuration — set per the interconnection agreement\'s required profile, never casually adjusted to "make the trips stop" (the protection-relay lesson from switchgear, in software).',
        ],
        keyPoints: [
          'Same power-electronics rules: DC bus discharge verification, heat kills, logs first',
          'String vs micro vs optimizer architectures trade serviceability against granularity',
          'Anti-islanding is absolute: grid dies → export stops — lineworker lives depend on it',
          'IEEE 1547/UL 1741 grid settings are utility-governed config, never tuned to silence trips',
        ],
        quiz: [
          {
            q: 'A customer is angry their new grid-tie solar array produced nothing during last week\'s blackout. The correct explanation is:',
            a: ['The installer wired it wrong', 'Anti-islanding: certified inverters must stop exporting when the grid dies, protecting lineworkers — backup requires batteries and an islanding-capable system', 'The modules were too hot', 'The utility disabled it remotely'],
            correct: 1,
            exp: 'Standard grid-tie systems shut down by design and by law during outages. The hundred-times customer conversation — and the natural bridge to storage (module 17).',
          },
          {
            q: 'An inverter in a baking attic derates every summer afternoon and has now faulted on overtemperature. Before condemning boards, the service reality to address is:',
            a: ['Firmware version', 'Thermal environment: clogged fans/heatsinks and the mounting location itself — power electronics die of heat', 'String polarity', 'Grid frequency'],
            correct: 1,
            exp: 'The power-electronics family\'s universal killer. Clean the cooling path, verify fans, and flag the location — the same lesson from UPS rooms to induction hobs to VFDs.',
          },
          {
            q: 'A utility\'s interconnection letter specifies a volt-VAR profile the inverter must run. A tech who changes grid settings to stop nuisance trips has:',
            a: ['Solved the problem', 'Violated the interconnection agreement — grid-support settings are utility-governed; diagnose WHY the grid conditions trip it instead', 'Improved efficiency', 'Voided module warranties only'],
            correct: 1,
            exp: 'The switchgear protection-relay rule in software: settings implement an agreement with the grid. Trips are evidence about site voltage — investigate, coordinate, never silence.',
          },
        ],
      },
      {
        title: 'Inverter Diagnosis and Hybrids',
        body: [
          'Inverter faults arrive as codes, and the code families map cleanly: DC-SIDE codes (overvoltage — the cold-Voc lesson; ground fault/Riso — the moisture hunt; AFCI — the arc hunt) point AT THE ARRAY, not the box; GRID-SIDE codes (over/under voltage, over/under frequency) point at the UTILITY INTERFACE — and chronically high grid-voltage trips are usually the SITE\'s voltage rising as the array exports into local impedance (long service drops, light neighborhood load), a real electrical finding for the utility conversation, not an inverter defect; INTERNAL codes (bus imbalance, relay test failure, overtemperature) are the box itself — and the only family where board-level condemnation lives.',
          'The diagnostic sequence, standardized: read the event log and code history (patterns and timestamps — the every-course rule), verify the DC side (string voltages present and plausible at the inputs, per-MPPT), verify the AC side (grid voltage at the terminals — measured, not assumed), then judge the inverter between two verified interfaces. An inverter with healthy DC in and healthy grid out that will not run has earned suspicion; one starved or fed bad grid has not.',
          'Production-based triage before any truck roll: modern fleets are monitored (module 19), and the monitoring separates "no production" (inverter/system down), "one string low" (DC-side string fault), "one module low" (micro/optimizer granularity), and "everything slightly low" (soiling, degradation, or a derating inverter). The kitchen course\'s telemetry lesson applies verbatim: the dashboard starts the diagnosis before the drive.',
          'HYBRID inverters close the module: one box managing PV input, battery charge/discharge, grid interaction, AND backup-load islanding (making its own island legally — the anti-islanding rule\'s licensed exception, via transfer equipment that separates the home from the grid first). They are the residential storage default and the bridge to module 17: a UPS, a charge controller, and a grid-tie inverter sharing one enclosure — every course you have taken, in one wall-mounted box.',
        ],
        keyPoints: [
          'Code families: DC-side → the array; grid-side → the interface/site voltage; internal → the box',
          'Chronic high-voltage trips often = site voltage rise under export — a utility conversation, not a defect',
          'Verify DC in and AC out before judging the inverter between them',
          'Hybrids = grid-tie + charger + islanding UPS in one box — the storage default',
        ],
        quiz: [
          {
            q: 'An inverter logs frequent AC-overvoltage trips every sunny midday; your meter confirms 253 V at its terminals during export on a nominal-240 service. The finding is:',
            a: ['A failing inverter voltage sensor', 'Real site voltage rise as the array exports into local grid impedance — document and escalate to the utility/interconnection channel', 'String Voc too high', 'A bad neutral'],
            correct: 1,
            exp: 'The inverter is truthfully reporting the grid it sees. Export into a soft grid raises local voltage; the fix is a utility-side/interconnection conversation, never a settings silence.',
          },
          {
            q: 'Monitoring shows one string reading zero on a two-MPPT string inverter while the other string produces normally. The truck-roll plan targets:',
            a: ['Inverter replacement', 'That string\'s DC path: fuse, connectors, string wiring, and its input — the granularity already localized the fault', 'Grid settings', 'Module cleaning'],
            correct: 1,
            exp: 'Per-MPPT monitoring did the split-half for you: one dead input = one string\'s DC chain to hunt, arriving with the right parts.',
          },
        ],
      },
    ],
    test: [
      { q: 'A solar grid-tie inverter\'s power stage is:', a: ['A transformer only', 'The familiar MPPT → DC bus → switching bridge — UPS architecture aimed at the grid', 'A mechanical rotary converter', 'A rectifier'], correct: 1, exp: 'The power-electronics family resemblance: same stages, same capacitor and thermal disciplines.' },
      { q: 'Microinverter architecture means:', a: ['One small inverter per module, AC leaving the roof, per-module MPPT/monitoring', 'A smaller central inverter', 'DC to the basement', 'Only for commercial'], correct: 0, exp: 'Granular production and granular failures — roof work to service, but neighbors keep producing.' },
      { q: 'Anti-islanding requires that on grid failure the inverter:', a: ['Keeps powering the house', 'Ceases export within seconds — dead lines must stay dead for lineworkers', 'Switches to DC output', 'Alarms only'], correct: 1, exp: 'The absolute grid-tie rule; backup power requires islanding-capable systems with proper separation.' },
      { q: 'Standard grid-tie systems during a blackout produce:', a: ['Full power', 'Nothing — by design and law', 'DC only', 'Half power'], correct: 1, exp: 'The hundred-times customer conversation, and the bridge to battery storage.' },
      { q: 'IEEE 1547 / UL 1741 govern:', a: ['Racking torque', 'Grid-interactive behavior: ride-through, support functions, and certified disconnection', 'Module glass', 'Battery chemistry'], correct: 1, exp: 'The inverter-as-grid-citizen standard; its settings implement the interconnection agreement.' },
      { q: 'DC-side fault codes (Riso, AFCI, input overvoltage) point at:', a: ['The inverter boards', 'The array and its wiring — the box is the messenger', 'The utility', 'The meter'], correct: 1, exp: 'Code-family mapping: DC codes send you to strings, connectors, and cold-Voc math.' },
      { q: 'Chronic midday AC-overvoltage trips usually indicate:', a: ['Inverter sensor drift', 'Site voltage rise as export meets local grid impedance — a utility-channel finding', 'Too many modules', 'Reversed polarity'], correct: 1, exp: 'Real, measurable, and not a defect: soft grids rise under export; escalate through interconnection channels.' },
      { q: 'The inverter diagnostic frame is:', a: ['Replace and observe', 'Logs first, verify DC in, verify AC out, judge the box between verified interfaces', 'Grid settings first', 'Thermal camera only'], correct: 1, exp: 'Two verified interfaces bracket the suspect — the universal method wearing solar clothes.' },
      { q: 'Fleet monitoring triage distinguishes:', a: ['Nothing useful', 'System-down vs string-down vs module-down vs everything-slightly-low — before the truck rolls', 'Only revenue', 'Weather patterns'], correct: 1, exp: 'The telemetry lesson: granularity localizes the fault class and loads the right parts.' },
      { q: 'A hybrid inverter combines:', a: ['Two string inverters', 'PV input, battery management, grid interaction, and legal backup islanding in one unit', 'AC and DC meters', 'Micro and central designs'], correct: 1, exp: 'Grid-tie + charger + islanding UPS in one wall box — module 17\'s hardware home.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 16 — NEC 690/705, RAPID SHUTDOWN & INTERCONNECTION
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'solar-installation-codes',
    num: 16,
    title: 'NEC 690/705, Rapid Shutdown & Interconnection',
    desc: 'The code layer: Article 690, rapid shutdown, the 120% rule, grounding/bonding, labels, and the AHJ/utility approval world.',
    slides: [
      {
        title: 'Article 690 and Rapid Shutdown',
        body: [
          'NEC ARTICLE 690 is solar\'s home in the code: circuit sizing built on module ratings times safety factors (the famous 1.56 stack on Isc — 125% for continuous sun ceiling, 125% for continuous-duty conductors), disconnect requirements (a means to isolate the PV system, and equipment disconnects where service happens), and the conductor/overcurrent rules that make the DC side legal. You will not memorize the article here; you will learn its shape so inspections and drawings make sense — and so the string of a failed inspection reads as specific fixes, not mystery.',
          'RAPID SHUTDOWN (690.12) is the firefighter provision and the code story every solar tech must own: rooftop conductors must fall to safe voltage limits within seconds of initiation — inside the array boundary to 80 V within 30 seconds under current rules — so crews can cut, vent, and walk roofs without meeting live 600 V home runs. The implementation is MODULE-LEVEL electronics (optimizers, micros, or dedicated MLRSD devices) answering a transmitter\'s heartbeat: initiation (the marked RSD switch, or simply killing AC) silences the heartbeat, and every module\'s electronics collapse their output.',
          'Rapid-shutdown SERVICE is a real fault category: a dead transmitter (or its power supply) collapses the whole array (produces the "no DC voltage anywhere" mystery — the array is obediently shut down), mismatched or failed module electronics create per-module dropouts, and initiation-switch wiring is a legitimate suspect on any system-dead call for systems so equipped. Know which RSD scheme a site uses BEFORE diagnosing its DC side: on an RSD system, no-voltage-at-the-inverter may mean the safety system is working, not that the array failed.',
          'TESTING rapid shutdown belongs in commissioning and periodic service: initiate, verify voltage collapse at the array boundary with your meter, restore, verify the handshake recovers. It is the fire-suppression-adjacent discipline of this trade — the system that exists for the worst day gets tested on the good ones, and its labels (next slide) tell the crews it exists.',
        ],
        keyPoints: [
          'Article 690 shapes conductor sizing (the 1.56 Isc stack), disconnects, and DC legality',
          'Rapid shutdown: rooftop DC collapses to ≤80 V inside the boundary on initiation — for firefighters',
          'A dead RSD transmitter mimics total array failure: know the site\'s scheme before DC diagnosis',
          'Test RSD at commissioning and PM: initiate, verify collapse, restore, verify recovery',
        ],
        quiz: [
          {
            q: 'A service call reports "the whole array is dead — zero DC volts at the inverter" on an optimizer-equipped system. Before climbing to the roof, the RSD-literate check is:',
            a: ['Megger every string', 'Whether rapid shutdown is initiated or its transmitter/power supply has failed — obedient shutdown looks exactly like total failure', 'Replace the inverter', 'Check module warranties'],
            correct: 1,
            exp: 'Optimizers hold outputs collapsed without the transmitter heartbeat. The safety system working (or its controller dead) produces the zero-volt mystery — check the RSD chain first.',
          },
          {
            q: 'Rapid shutdown exists primarily to protect:',
            a: ['The inverter from surges', 'Firefighters working on and around the roof during an emergency', 'The modules from arcs', 'Utility meters'],
            correct: 1,
            exp: 'Crews must cut and vent roofs without meeting live home-run voltage. The 80 V boundary rule is written for their axes and their lives.',
          },
        ],
      },
      {
        title: 'Interconnection, Grounding, and the Paper Layer',
        body: [
          'NEC 705 governs CONNECTING a source to premises wiring, and its famous child is the 120% RULE: on a load-side connection, (main breaker + solar backfeed breaker) may not exceed 120% of the busbar rating — the reason a 200 A panel with a 200 A main accepts at most a 40 A solar breaker, positioned at the OPPOSITE end of the bus from the main (the rule\'s geometry matters: sources feeding opposite ends cannot overload the middle). When arrays outgrow the math: supply-side connections, main-breaker derates, or panel upgrades — decisions above your entry pay grade to design, squarely within it to recognize on drawings and verify in the field.',
          'GROUNDING AND BONDING carry solar-specific texture atop your foundation: module frames and racking bond via listed hardware (WEEBs, bonding lugs, integrated rail systems — torque and inspect; corroded or missing bonds fail inspections and megger hunts alike), the DC equipment-grounding conductor accompanies the circuit, and modern transformerless systems run UNGROUNDED (functionally-grounded) arrays whose fault detection is the inverter\'s Riso test rather than a grounded-conductor fuse — which is why module 14\'s ground-fault hunts read the way they do.',
          'LABELS are the system\'s self-documentation and a legal requirement: rapid-shutdown placards at service equipment (telling crews the system type and initiation point), DC circuit labels with voltages, directory placards mapping multiple sources, and warning labels at every point of interconnection. Inspectors read labels the way you read one-lines; missing or wrong labels fail final inspections and — worse — misinform the next emergency responder or technician. Label literacy is also your fastest site survey: the placard set tells the system\'s whole story before a panel opens.',
          'The PAPER LAYER completes the trade: permits and PLAN REVIEW before work, the AHJ\'s inspection at completion (their jurisdiction, their interpretation — the professional posture is preparation and courtesy, never argument), the UTILITY\'s interconnection agreement and its PTO — Permission To Operate — as the finish line (energizing export before PTO violates the agreement and can void it), and net-metering/tariff paperwork defining the economics. Your role at entry: know the sequence, keep systems off until PTO where required, and treat the document trail with the NFPA-110-grade respect the generator course taught — in this industry, the paperwork IS the project\'s legality.',
        ],
        keyPoints: [
          'The 120% rule: main + solar breaker ≤ 120% of busbar, backfeed at the opposite bus end',
          'Bond frames/racking with listed hardware; ungrounded arrays rely on inverter Riso detection',
          'Labels are legal self-documentation: crews and inspectors navigate by them — so can you',
          'Permits → inspection → interconnection → PTO: no export before permission to operate',
        ],
        quiz: [
          {
            q: 'A 200 A busbar panel with a 200 A main needs a solar backfeed. The 120% rule allows a solar breaker up to:',
            a: ['200 A', '40 A, installed at the opposite end of the bus from the main', '100 A anywhere', '60 A next to the main'],
            correct: 1,
            exp: '200 × 1.2 = 240; 240 − 200 (main) = 40 A — and the opposite-end placement is part of the rule\'s physics: opposing sources cannot overload the bus middle.',
          },
          {
            q: 'A completed system passed inspection but the utility\'s PTO letter has not arrived. The customer wants it turned on "since it works." The professional answer is:',
            a: ['Energize — inspection is what matters', 'The system stays off/non-exporting until Permission To Operate: energizing early violates the interconnection agreement', 'Export only at night', 'Energize at half power'],
            correct: 1,
            exp: 'PTO is the utility\'s gate, separate from the AHJ\'s. Early export breaches the agreement that makes the system legal and paid — the paperwork IS the project.',
          },
        ],
      },
    ],
    test: [
      { q: 'The 1.56 factor applied to Isc in circuit sizing comes from:', a: ['Marketing margin', '125% for continuous irradiance ceiling × 125% for continuous-duty conductors', 'Temperature correction', 'Utility rules'], correct: 1, exp: 'The stacked 1.25 × 1.25 of Article 690\'s conductor math.' },
      { q: 'Rapid shutdown requires conductors inside the array boundary to fall to:', a: ['0 V instantly', '≤80 V within 30 seconds of initiation (current-rule figure)', '≤600 V', 'Half voltage'], correct: 1, exp: 'The firefighter provision: initiation collapses module-level outputs to safe-touch territory.' },
      { q: 'Rapid shutdown is implemented by:', a: ['A bigger disconnect', 'Module-level electronics obeying a transmitter heartbeat — silence collapses the array', 'String fuses', 'AC relays only'], correct: 1, exp: 'Optimizers/micros/MLRSD devices hold output only while the keep-alive signal exists.' },
      { q: 'A failed RSD transmitter presents as:', a: ['Overproduction', 'A completely dead array — obedient shutdown mimics total failure', 'AC overvoltage', 'Nuisance AFCI'], correct: 1, exp: 'Know the site\'s scheme first: zero DC everywhere may mean the safety system is simply in charge.' },
      { q: 'NEC 705\'s 120% rule constrains:', a: ['Module count', 'Main + backfeed breaker sum vs busbar rating on load-side interconnections', 'Inverter efficiency', 'String Voc'], correct: 1, exp: 'The busbar-protection math that sizes the solar breaker — with opposite-end placement.' },
      { q: 'The solar backfeed breaker is placed:', a: ['Adjacent to the main', 'At the opposite end of the busbar from the main', 'Anywhere', 'Outside the panel'], correct: 1, exp: 'Opposing ends: two sources feeding toward the middle cannot exceed segment ratings.' },
      { q: 'Module frames and racking are bonded via:', a: ['Paint-piercing hope', 'Listed hardware (bonding lugs, WEEBs, integrated rails) — torqued and inspected', 'The DC negative', 'Concrete anchors'], correct: 1, exp: 'Listed bonding is inspectable and required; corroded bonds fail inspections and fault-hunts alike.' },
      { q: 'Transformerless ("ungrounded") array ground-fault protection lives in:', a: ['A grounded-conductor fuse', 'The inverter\'s isolation (Riso) testing', 'The string fuses', 'The racking'], correct: 1, exp: 'Modern systems detect leakage by measurement, not fuse — the module-14 morning-fault pattern\'s home.' },
      { q: 'System labels/placards exist because:', a: ['Branding', 'Crews, inspectors, and techs navigate the system by them — they are legal self-documentation', 'UV protection', 'Warranty tracking'], correct: 1, exp: 'The placard set tells the whole story before a cover opens; missing labels fail finals and misinform responders.' },
      { q: 'PTO (Permission To Operate) is:', a: ['The AHJ inspection', 'The utility\'s authorization gate — no export before it, regardless of inspection status', 'The installer sign-off', 'A module certification'], correct: 1, exp: 'Separate from the AHJ: the interconnection agreement\'s finish line, breached by early energization.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 17 — BATTERY ENERGY STORAGE SYSTEMS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'solar-bess-systems',
    num: 17,
    title: 'Battery Energy Storage Systems',
    desc: 'BESS from wall units to containers: architectures, the BMS as the battery\'s brain, operating modes, and AC vs DC coupling.',
    slides: [
      {
        title: 'BESS Architectures and the BMS',
        body: [
          'Battery storage completes what module 15\'s anti-islanding conversation started: PV without storage dies with the grid; PV WITH storage rides through. The residential/commercial BESS landscape: WALL UNITS (10-20 kWh lithium packs — the Powerwall class — with integrated or paired hybrid inverters), STACKED/RACK systems (modular batteries scaling to tens of kWh in garages and small commercial rooms), and CONTAINERIZED BESS (utility/C&I scale — the shipping-container battery plants marching across substations, with their own HVAC, fire systems, and module-18 safety world).',
          'Under every skin, the same hierarchy from your battery modules: CELLS (almost universally lithium — LFP increasingly dominant for stationary storage: safer chemistry, longer cycle life, no cobalt) grouped into MODULES, modules into PACKS/CABINETS, managed by the BMS. The BMS (Battery Management System) is the battery\'s brain and your primary service interface: it balances cells, enforces charge/discharge limits (voltage, current, temperature windows), estimates SOC (state of charge) and SOH (state of health), and — critically — DISCONNECTS the battery through its contactors when limits are violated.',
          'BMS literacy is the trade skill: its data is the battery\'s event log (the every-course rule — cell voltages, temperatures, balancing activity, fault history), its fault hierarchy explains "dead" batteries (a BESS offline on a cell-overvoltage or temperature fault is PROTECTING itself — root-cause before reset, the fryer rule at 400 volts), and its cell-level detail finds the weak module (one cell group sagging under load = the module to swap; the series-string weakest-cell reality from your battery testing module, now instrumented).',
          'Operating MODES define what the customer bought: SELF-CONSUMPTION (store solar noon, spend solar evening — maximizing own-use where export pays poorly), BACKUP (hold reserve for outages — the anti-islanding exception via transfer equipment), TIME-OF-USE arbitrage (charge cheap, discharge expensive), and grid-services programs (VPPs — utility-dispatched fleets). Mode misconfiguration is a real complaint category: a battery set to backup-only "never doing anything" is working exactly as configured — the kitchen mis-config lesson, in storage clothes.',
        ],
        keyPoints: [
          'Hierarchy: cells (LFP rising) → modules → packs, ruled by the BMS brain',
          'The BMS balances, limits, estimates SOC/SOH, and disconnects on violations — root-cause its faults before reset',
          'Cell-level BMS data finds the weak module: the instrumented weakest-cell hunt',
          'Modes matter: self-consumption, backup, TOU, VPP — "idle" batteries are often just configured that way',
        ],
        quiz: [
          {
            q: 'A homeowner reports their battery "never does anything" — SOC sits at 100% for weeks while grid power flows normally. The first check is:',
            a: ['BMS failure', 'The operating mode: a backup-reserve configuration holds full charge by design, awaiting an outage', 'Dead cells', 'Inverter faults'],
            correct: 1,
            exp: 'Backup mode is supposed to look idle. Mode configuration against the customer\'s actual intent (self-consumption? TOU?) is the mis-config lesson before any hardware suspicion.',
          },
          {
            q: 'A BESS dropped offline on a cell-overtemperature fault overnight and the customer wants it reset immediately. The professional sequence is:',
            a: ['Reset — it is probably a glitch', 'Read the BMS logs first: which cells, what temperature, what was happening — the battery disconnected to protect itself, and lithium temperature faults get root-caused before any reset', 'Replace the whole pack', 'Disable temperature protection'],
            correct: 1,
            exp: 'The fryer high-limit rule at pack scale, with module 18\'s stakes: a lithium thermal complaint is never reset-and-hope. The BMS log says which cells and why.',
          },
        ],
      },
      {
        title: 'Coupling, Sizing Truths, and Commissioning',
        body: [
          'AC-COUPLED storage pairs a battery inverter with any existing PV system (retrofit-friendly; PV AC output charges the battery through its own inverter; round-trip efficiency pays double conversion) — with a critical islanding detail: during off-grid operation the battery inverter FORMS the island grid and the PV inverter syncs to it; the battery inverter throttles PV by frequency-shifting when the battery fills (frequency-watt in action — module 15\'s grid citizenship running a micro-grid of one house). DC-COUPLED storage puts battery and PV on a shared DC bus inside a hybrid inverter (new-install default; one conversion stage; charge-from-solar even when the grid is down and the AC side is dark).',
          'Sizing truths for honest customer conversations: kWh is ENERGY (how long), kW is POWER (how much at once) — a 13.5 kWh / 5 kW battery runs a 4 kW load for ~3 hours but can NEVER start a 6 kW well pump regardless of charge; SURGE ratings govern motor starting (the well-pump and AC-condenser questions of every backup consult — soft-starters are the frequent companion sale); and whole-home vs PARTIAL-HOME backup (a protected-loads subpanel of the circuits that matter) is the design conversation that prevents the "why did my battery die in two hours" callback.',
          'BESS COMMISSIONING is procedure-grade work: physical install per listing (spacing/clearances — module 18 territory), firmware alignment across battery, inverter, and gateway (version-mismatched components produce the weirdest faults in the industry — the update-first rule of storage service), configuration (modes, reserve %, current limits, and CT PLACEMENT — the consumption CTs that tell the system which way power flows: reversed or misplaced CTs make batteries charge when they should discharge, the single most common storage commissioning error), and a full functional test: grid-loss simulation, backup pickup verified, throttling observed, recharge confirmed.',
          'Storage service economics mirror every course: monitoring-driven fleets (module 19), degradation conversations grounded in SOH data (batteries fade — warranty thresholds typically guarantee ~70% at 10 years; the trend file tells the story), and the maintenance rhythm of firmware, torque checks, thermal inspection, and BMS log review. The battery is the newest machine in this portal — and the one whose habits you already own from modules 11-12.',
        ],
        keyPoints: [
          'AC-coupled: retrofit + frequency-shift PV throttling off-grid; DC-coupled: hybrid default, charges dark',
          'kWh = how long, kW = how much, surge = motor starting — the honest sizing triangle',
          'Reversed/misplaced consumption CTs are the #1 commissioning error: batteries behave backwards',
          'Firmware alignment first: version mismatch is storage\'s weird-fault factory',
        ],
        quiz: [
          {
            q: 'Off-grid during an outage, a customer\'s AC-coupled PV inverter keeps cycling off as the battery approaches full. This behavior is:',
            a: ['A failing PV inverter', 'The battery inverter frequency-shifting to throttle PV production into a full battery — island power management working as designed', 'Anti-islanding malfunction', 'Grid interference'],
            correct: 1,
            exp: 'In the island, the battery inverter is the grid-former and speaks IEEE-1547 frequency-watt to the PV inverter: rising frequency = "back off." Designed behavior that generates service calls.',
          },
          {
            q: 'A newly commissioned battery charges from the grid at peak rates and discharges at midnight — backwards from its TOU program. The classic error is:',
            a: ['Defective battery', 'Consumption/solar CTs reversed or misplaced — the system\'s power-direction senses are backwards', 'Wrong chemistry', 'Utility meter fault'],
            correct: 1,
            exp: 'The CTs are the system\'s eyes on power flow. Reversed CTs invert every decision — the most common storage commissioning error, found with a clamp meter and the monitoring live view.',
          },
          {
            q: 'A 13.5 kWh / 5 kW-rated battery cannot start the customer\'s 6 kW well pump even at 100% charge because:',
            a: ['The battery is degraded', 'Power rating (kW), not energy (kWh), caps instantaneous delivery — and motor surges demand even more; a soft-starter or bigger power stage is the fix', 'The pump is 240 V', 'The BMS is limiting temperature'],
            correct: 1,
            exp: 'kWh is the tank; kW is the pipe. The honest sizing triangle (energy, power, surge) is the backup consult\'s core math.',
          },
        ],
      },
    ],
    test: [
      { q: 'The dominant stationary-storage chemistry trend is:', a: ['Lead-acid', 'LFP lithium — safer, longer cycle life, cobalt-free', 'NiCd', 'Sodium exclusively'], correct: 1, exp: 'LFP\'s thermal stability and cycle life made it the stationary default.' },
      { q: 'The BMS\'s protective disconnect means a "dead" BESS is often:', a: ['Scrap', 'Protecting itself from a limit violation — read its logs and root-cause before reset', 'A wiring fault', 'A firmware bug always'], correct: 1, exp: 'The fryer rule at pack scale: the disconnect is a witness statement, not a defect.' },
      { q: 'SOC and SOH are:', a: ['Interchangeable', 'State of charge (how full now) and state of health (capacity remaining vs new)', 'Voltage readings', 'BMS brands'], correct: 1, exp: 'SOC is today\'s fuel gauge; SOH is the aging story warranties are written against.' },
      { q: 'A backup-reserve-mode battery sitting at 100% SOC for weeks is:', a: ['Faulty', 'Working exactly as configured — holding reserve for an outage', 'Overcharged', 'Miswired'], correct: 1, exp: 'Mode literacy before hardware suspicion: idle-looking backup batteries are on duty.' },
      { q: 'DC-coupled storage\'s distinctive capability is:', a: ['Cheaper install always', 'Charging from solar even when the grid and AC side are down — shared DC bus in the hybrid', 'No BMS needed', 'Higher voltage'], correct: 1, exp: 'One conversion stage and dark-charging: the new-install default architecture.' },
      { q: 'AC-coupled systems throttle PV off-grid by:', a: ['Physical disconnects', 'The battery inverter shifting island frequency — frequency-watt telling the PV inverter to back off', 'Shading panels', 'Reversing CTs'], correct: 1, exp: 'The grid-former speaks 1547 to its one-house grid; cycling PV near full battery is by design.' },
      { q: 'kWh vs kW vs surge on a spec sheet mean:', a: ['The same thing three ways', 'Energy duration, continuous power, and motor-starting headroom — the honest sizing triangle', 'AC vs DC vs peak', 'Charge vs discharge vs idle'], correct: 1, exp: 'The tank, the pipe, and the kick: every backup consult\'s core math.' },
      { q: 'The most common storage commissioning error is:', a: ['Wrong wire color', 'Reversed or misplaced consumption CTs inverting the system\'s power-flow senses', 'Over-torqued lugs', 'Missing labels'], correct: 1, exp: 'Backwards CTs make batteries charge at peak and discharge at midnight — clamp meter plus live view finds it.' },
      { q: 'Version-mismatched firmware across battery/inverter/gateway causes:', a: ['Nothing — versions are cosmetic', 'The industry\'s weirdest faults — alignment is the update-first rule of storage service', 'Faster charging', 'Warranty extension'], correct: 1, exp: 'Storage components negotiate constantly; mismatched dialects produce ghost behavior.' },
      { q: 'Typical lithium storage warranties guarantee roughly:', a: ['100% forever', '~70% capacity at ~10 years — SOH trends tell the real story', '50% at 2 years', 'No capacity terms'], correct: 1, exp: 'Degradation is designed-for: the SOH trend file grounds every fade conversation.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 18 — BESS SAFETY & NFPA 855
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'solar-bess-safety',
    num: 18,
    title: 'BESS Safety & NFPA 855',
    desc: 'Thermal runaway, the codes and listings that contain it, and the handling/emergency discipline of large lithium systems.',
    slides: [
      {
        title: 'Thermal Runaway: The Hazard That Writes the Rules',
        body: [
          'Every rule in this module exists because of one failure mode: THERMAL RUNAWAY. An abused lithium cell (overcharged, over-discharged then charged, crushed, punctured, internally shorted, or overheated) can enter a self-accelerating exothermic decomposition: temperature rises → chemistry breaks down releasing heat and flammable gas → temperature rises faster. A cell in runaway vents electrolyte gases (white "smoke" that is actually flammable vapor — a pre-ignition warning), can jet flame, and — the system-level nightmare — PROPAGATES: heating its neighbors past their trigger point, cascading cell to cell, module to module.',
          'Runaway is chemistry-dependent (LFP\'s higher trigger temperature and gentler energy release is WHY it conquered stationary storage — but LFP is resistant, not immune) and, crucially, ONCE STARTED IT DOES NOT NEED OXYGEN: the cell\'s own chemistry supplies the oxidizer, which is why smothering does not work, why water\'s job is COOLING neighbors to stop propagation rather than extinguishing, and why "extinguished" battery fires reignite hours or days later. Stranded-energy awareness completes the picture: a burned pack\'s surviving cells remain charged and dangerous through the cleanup.',
          'PREVENTION is therefore the entire game, and the layers you service ARE the prevention: the BMS enforcing the operating window (module 17 — its limits are runaway\'s first fence), mechanical protection (clearances, impact protection — the garage wall unit\'s biggest daily threat is the family car), thermal management (packs\' cooling systems and the ambient limits in listings), and CHARGE DISCIPLINE (never charging a frozen, swollen, damaged, or deeply-over-discharged battery — the intake questions of every battery service call).',
          'Field trigger-awareness, the walkaround catalog: SWELLING (a bulging module is venting-pressure evidence — do not charge, do not puncture, escalate per procedure), impact damage or drops (damaged = quarantine, even if it "seems fine" — runaway can begin hours after mechanical abuse), heat complaints and BMS temperature-fault history, and water exposure (flooded packs are compromised packs). The trade\'s posture: lithium is safely serviceable EXACTLY as long as its rules are respected — the same sentence your gas modules taught, with a different fuel.',
        ],
        keyPoints: [
          'Runaway is self-accelerating and self-oxidizing: smothering fails; water COOLS neighbors to stop cascade',
          'Vented white vapor is flammable pre-ignition gas; "out" battery fires reignite — stranded energy persists',
          'The BMS window, mechanical protection, thermal management, and charge discipline ARE the prevention',
          'Swollen, dropped, frozen-charged, or flooded packs: quarantine and escalate — never charge damage',
        ],
        quiz: [
          {
            q: 'A garage wall battery shows visible case swelling after a BMS overvoltage fault history. The correct field response is:',
            a: ['Push the case flat and reset the BMS', 'Do not charge, do not puncture, isolate per procedure, and escalate — swelling is venting-pressure evidence of a compromised pack', 'Discharge it fully with a load bank', 'Drill a vent hole'],
            correct: 1,
            exp: 'A swollen lithium module is a pre-runaway warning label written by the cell itself. Quarantine and manufacturer/disposal procedures — never mechanical "fixes."',
          },
          {
            q: 'Fire crews "extinguished" a small BESS fire an hour ago; the customer asks you to begin cleanup. The lithium-specific danger is:',
            a: ['Toxic soot only', 'Reignition: runaway chemistry self-oxidizes and stranded energy persists in surviving cells — battery fires relight hours or days later', 'Voltage backfeed to the grid', 'Slippery floors'],
            correct: 1,
            exp: 'Water stops propagation by cooling; it does not "put out" the chemistry. Post-fire packs are treated as energized, unstable hazards under specialist protocols.',
          },
        ],
      },
      {
        title: 'NFPA 855, Listings, and Emergency Discipline',
        body: [
          'NFPA 855 is the installation standard for stationary energy storage — the BESS sibling of the generator course\'s NFPA 110 — and its shape matters to you: capacity thresholds triggering its scope, LOCATION rules (what may live in dwellings/garages vs dedicated rooms vs outdoors — residential unit-size caps and their spacing), SEPARATION distances between units and from openings/exits, maximum stored energy per room/area, and required fire detection/suppression by installation class. When a homeowner asks "why can\'t we just add four more wall batteries in the garage," 855\'s aggregate limits and spacing tables are the answer.',
          'The LISTING layer: UL 9540 certifies the SYSTEM (battery + inverter + controls as a tested combination — mixing unlisted combinations voids the basis of the permit), and UL 9540A is the TEST METHOD that characterizes thermal-runaway propagation behavior (its report tells AHJs whether/how a product cascades — driving the spacing and suppression the code assigns). Your field translation: install and service TO THE LISTING (spacing, orientation, ambient limits in the manual are certification conditions, not suggestions), and recognize that undocumented substitutions (a different battery model on an existing inverter) are code events, not parts swaps.',
          'Emergency discipline for the technician: pre-plan awareness (know the site\'s disconnects and the FIRST-RESPONDER placards module 16\'s labeling world extends here), the vented-gas rule (white vapor from a pack = flammable atmosphere + likely toxic — evacuate and ventilate thinking, not diagnosis-in-the-cloud thinking: your CO and gaseous-fuel reflexes transfer), electrical isolation BEFORE approach where procedure allows (contactors open ≠ terminals dead — the pack side stays live, module 12\'s discipline), and the referral boundary: fire events, damaged-pack recovery, and disposal logistics belong to specialists and manufacturer programs — your job is recognition, isolation, documentation, and the call.',
          'Round out with transport/storage rules you will actually touch: lithium modules ship as Class 9 dangerous goods (documentation and packaging rules for warranty returns — the swollen module does NOT ride loose in your van), site storage of spares within listed limits, and end-of-life chains (manufacturer take-back and lithium recyclers — the maturing loop this industry is building). The kitchen course\'s "documentation is the product" and the generator course\'s "legal-grade evidence" habits both apply whenever a battery event occurs: BESS incidents are insurance events by default.',
        ],
        keyPoints: [
          'NFPA 855 = the 110 of storage: location, separation, aggregate limits, detection/suppression',
          'UL 9540 lists the system combination; 9540A characterizes propagation — install to the listing',
          'Vented vapor = evacuate/ventilate reflexes; contactors open ≠ pack terminals dead',
          'Damaged packs, fires, disposal: recognize, isolate, document, refer — Class 9 shipping for returns',
        ],
        quiz: [
          {
            q: 'A customer wants a fifth and sixth wall battery added in their attached garage. The code-literate first check is:',
            a: ['Wall stud spacing', 'NFPA 855 aggregate energy limits and unit separation rules for dwelling garages — capacity caps may force a different location or design', 'Paint color for heat', 'HOA approval'],
            correct: 1,
            exp: '855\'s residential tables cap per-unit and aggregate energy with spacing requirements. "Just add more" meets a real code ceiling — the answer is design, not squeezing.',
          },
          {
            q: 'A warranty-replacement battery module (slightly swollen) needs to go back to the manufacturer. It travels:',
            a: ['Loose in the van bed with tools', 'As Class 9 dangerous goods per the manufacturer\'s packaging and documentation program — damaged lithium has its own shipping rules', 'In the customer\'s trunk', 'Only by drone'],
            correct: 1,
            exp: 'Lithium is regulated freight, and damaged/recalled lithium doubly so. The RMA program\'s packaging instructions are law, not suggestion.',
          },
        ],
      },
    ],
    test: [
      { q: 'Thermal runaway is:', a: ['A BMS software bug', 'Self-accelerating exothermic cell decomposition that can cascade to neighbors', 'Inverter overheating', 'Rapid discharge'], correct: 1, exp: 'Heat begets breakdown begets heat: the failure mode that writes every storage rule.' },
      { q: 'Runaway does not need external oxygen because:', a: ['It burns hydrogen', 'The cell chemistry supplies its own oxidizer — smothering fails; cooling neighbors is the strategy', 'Packs are sealed', 'It is electrical, not fire'], correct: 1, exp: 'Self-oxidizing chemistry: water\'s job is propagation-stopping cooling, and reignition risk persists.' },
      { q: 'White vapor venting from a lithium pack is:', a: ['Steam — harmless', 'Flammable, likely toxic electrolyte gas — a pre-ignition warning demanding evacuation reflexes', 'Coolant leak', 'Dust'], correct: 1, exp: 'The vented-gas rule: your gaseous-fuel and CO reflexes transfer to the battery room.' },
      { q: 'A swollen battery module is:', a: ['Cosmetic', 'Venting-pressure evidence: quarantine, never charge or puncture, escalate', 'Normal in summer', 'Recoverable by pressing flat'], correct: 1, exp: 'The cell wrote its own warning label; mechanical "fixes" are ignition attempts.' },
      { q: 'LFP dominance in stationary storage owes to:', a: ['Cheapest energy density', 'Higher runaway trigger temperature and gentler failure — resistant (not immune) chemistry', 'Cobalt content', 'Faster charging only'], correct: 1, exp: 'Chemistry-level safety margins made LFP the stationary default.' },
      { q: 'NFPA 855 governs:', a: ['Cell manufacturing', 'ESS installation: locations, separation, aggregate limits, detection/suppression', 'Utility tariffs', 'Module recycling only'], correct: 1, exp: 'The storage sibling of NFPA 110 — the answer to "why can\'t we just add more batteries here."' },
      { q: 'UL 9540 vs 9540A:', a: ['Identical documents', 'System-combination listing vs the propagation-characterization test method that informs spacing/suppression', 'US vs Canada', 'AC vs DC ratings'], correct: 1, exp: 'The listing and the fire-behavior test: together they define what the AHJ permits.' },
      { q: 'Installing to the listing means:', a: ['Any compatible-looking combination', 'Spacing, orientation, ambient, and component combinations per certification — substitutions are code events', 'Following the sales quote', 'Torque specs only'], correct: 1, exp: 'The manual\'s conditions are the certification\'s conditions; unlisted mixes void the permit\'s basis.' },
      { q: 'With BMS contactors open, pack terminals are:', a: ['Dead', 'Still live on the pack side — battery-module isolation discipline applies', 'Grounded', 'Below 12 V'], correct: 1, exp: 'Contactor state is not terminal state: the module-12 verification rules never retire.' },
      { q: 'After any BESS fire or damage event, the technician\'s role is:', a: ['Extinguish and repair', 'Recognition, isolation, documentation, and referral to specialist/manufacturer programs — these are insurance events by default', 'Immediate disassembly', 'Silent disposal'], correct: 1, exp: 'Legal-grade evidence habits plus the referral boundary: damaged lithium belongs to specialists.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 19 — COMMISSIONING & PERFORMANCE VERIFICATION
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'solar-commissioning',
    num: 19,
    title: 'Commissioning & Performance Verification',
    desc: 'IV-curve tracing, IR imaging, performance ratio, and monitoring handoff — proving a system performs to model.',
    slides: [
      {
        title: 'The Commissioning Sequence and Its Instruments',
        body: [
          'Solar commissioning proves four layers in order — MECHANICAL (racking torque per spec, module clamps, roof penetrations flashed, bonding continuity), DC (per-string Voc and polarity BEFORE first inverter connection — reversed strings destroy input stages; short-circuit or operating current per string against irradiance-adjusted expectations; insulation resistance to ground), AC (grid voltage/rotation at the inverter, protection settings per the interconnection profile), and SYSTEM (inverter startup per manual, rapid-shutdown initiation/recovery verified, monitoring commissioned) — with the generator course\'s baseline religion throughout: today\'s recorded numbers are every future diagnosis\'s reference.',
          'IV-CURVE TRACING is the commissioning instrument that separates professionals: a tracer sweeps each string and plots the measured curve against the modeled curve for the moment\'s measured irradiance and temperature (tracers pair with a pyranometer/reference cell and temperature probes). One trace answers what hours of guesswork cannot: LOW CURRENT everywhere = soiling/irradiance measurement issues; LOW VOLTAGE = missing modules in string or wrong count; STEPS = mismatch, shading, bypass diodes conducting (module 13\'s reading, now quantified); ROUNDED KNEE = series-resistance problems — degraded connectors and cabling. Commissioning traces filed per string are the fleet\'s birth certificates.',
          'THERMAL IMAGING (IR) rides every commissioning and PM: modules scanned under load reveal hot cells and hot spots (module 13\'s hazard, visualized), and every DC connection point — combiner lugs, disconnect terminals, connector pairs — gets the warm-spot hunt your foundation taught (a connector 20°C above its twin is tomorrow\'s AFCI trip or fire). Drone IR scales this to large arrays; the physics is identical.',
          'The remaining verification set: TORQUE with marked witness lines (terminations per spec — the loose-lug story of every course), POLARITY discipline (the one mistake with instant hardware cost), GROUND-CONTINUITY spot checks across the bonded racking system, and RSD FUNCTIONAL TEST (module 16: initiate, measure boundary voltage collapse, restore). The habit stack is familiar by design — this module is your foundation instruments meeting a new machine.',
        ],
        keyPoints: [
          'Order: mechanical → DC (Voc/polarity BEFORE inverter!) → AC → system, with everything recorded',
          'IV traces vs model: low-I = light/soiling, low-V = count, steps = mismatch, soft knee = resistance',
          'IR under load: hot cells and warm connections are tomorrow\'s failures, visible today',
          'Reversed string polarity destroys inverter inputs — the check that precedes first connection',
        ],
        quiz: [
          {
            q: 'A commissioning IV trace of one string shows the expected current but roughly one module\'s worth of missing voltage, with a clean curve shape. The likely find is:',
            a: ['Soiling', 'A module missing from the string (or one bypassed entirely) — string count/wiring against the design', 'High irradiance', 'A failing tracer'],
            correct: 1,
            exp: 'Voltage adds in series: a whole module\'s Voc absent with normal current and shape means the string is one module short of design — count, wiring, or a fully-bypassed unit.',
          },
          {
            q: 'An IR scan under load shows one MC4 pair 25°C hotter than every neighbor. The professional action is:',
            a: ['Note it as within tolerance', 'Treat it as a failing connection: de-energize per procedure, inspect/remake the connection, and re-scan — warm today is arcing tomorrow', 'Spray it with coolant', 'Increase string fusing'],
            correct: 1,
            exp: 'The warm-connection hunt of every course: resistance heating at a DC connector is the AFCI trip and fire precursor. Fix it while it is only warm.',
          },
        ],
      },
      {
        title: 'Performance Ratio and the Monitoring Handoff',
        body: [
          'PERFORMANCE RATIO (PR) is the industry\'s honesty metric: actual energy delivered ÷ energy the modeled system should deliver given the ACTUAL measured irradiance and temperature over the period. PR strips the weather out of the argument — a customer\'s "it made less than last month" may be pure weather (PR steady), while "PR fell from 0.84 to 0.71" is a real system problem hiding under a sunny month\'s decent totals. Healthy fixed arrays typically run PR ~0.75-0.85; commissioning establishes the site\'s baseline PR, and PM revisits it.',
          'The production-verification stack at commissioning: measured AC output against expectation for the moment\'s conditions (clamp/inverter data vs irradiance math), energy-model comparison across the first weeks (monitoring makes this automatic), and the documentation set — as-built string map (which modules on which MPPT — the map every future string diagnosis needs), commissioning traces and IR images, recorded settings, and the interconnection/PTO paper trail (module 16). The kitchen course\'s birth-certificate commissioning lesson applies verbatim.',
          'MONITORING HANDOFF makes the fleet serviceable: gateway online and reporting (cellular/WiFi/Ethernet — the connectivity realities of the kitchen course\'s IoT lesson), per-device visibility verified (every optimizer/micro reporting; every string\'s channel mapped and LABELED in the platform to match the as-built), alert thresholds and recipients configured (who learns about the failure — the service company, ideally, before the customer), and the OWNER walkthrough: what the app shows, what normal looks like, what to call about. Fleets whose monitoring was commissioned lazily generate the "it\'s been down for four months" calls that embarrass everyone.',
          'And the closing habit transfer: commissioning IS sales for the service relationship — the documented baseline, the labeled monitoring, the owner who understands their normal: every one converts into the O&M contract (module 20\'s economics) that makes solar service a business instead of a callback pool. Document like the generator course, verify like the HVAC course, and hand off like the professional this portal trained.',
        ],
        keyPoints: [
          'PR = actual ÷ modeled-for-actual-weather: the metric that separates weather from faults',
          'The as-built string map + traces + IR + settings = the system\'s birth certificate',
          'Monitoring handoff: every device reporting, channels labeled to match as-built, alerts routed to the servicer',
          'Commissioned baselines and literate owners convert directly into O&M contracts',
        ],
        quiz: [
          {
            q: 'A customer complains production dropped 20% versus last month. Monitoring shows PR steady at 0.83 both months. The explanation is:',
            a: ['Hidden degradation', 'Weather: the system converted the available sun at unchanged efficiency — last month simply had more sun', 'Inverter derating', 'Meter error'],
            correct: 1,
            exp: 'PR strips weather from the argument. Steady PR with lower totals is climatology, not fault — the honesty metric doing its job in the customer conversation.',
          },
          {
            q: 'The single commissioning artifact that most accelerates every future string-level diagnosis is:',
            a: ['The sales proposal', 'The as-built string map with monitoring channels labeled to match — which modules, which string, which MPPT', 'A photo of the crew', 'The torque wrench certificate'],
            correct: 1,
            exp: 'Monitoring granularity is only as useful as its mapping. "String 7 is low" means nothing until string 7 is findable on the roof — the map is the Rosetta stone.',
          },
        ],
      },
    ],
    test: [
      { q: 'Per-string Voc and polarity are verified:', a: ['After a week of operation', 'Before first inverter connection — reversed strings destroy input stages', 'Only on cloudy days', 'By the utility'], correct: 1, exp: 'The instant-hardware-cost mistake: polarity is proven before anything is plugged.' },
      { q: 'An IV curve\'s rounded/soft knee indicates:', a: ['Excess irradiance', 'Series-resistance problems: degraded connectors and cabling', 'Perfect health', 'Cold weather'], correct: 1, exp: 'Resistance rounds the power point: the connector catalog\'s curve signature.' },
      { q: 'Steps in a string IV trace mean:', a: ['A tracer fault', 'Mismatch within the string — shading, damaged groups, bypass diodes conducting', 'Grid instability', 'Perfect balance'], correct: 1, exp: 'Each step is a sacrificed cell group: module 13\'s reading, quantified at commissioning.' },
      { q: 'IR scanning of connections under load hunts:', a: ['Loose insulation colors', 'Resistance heating — warm points that become arcs and fires', 'UV damage', 'Moisture ingress directly'], correct: 1, exp: 'The universal warm-connection hunt applied to DC: 20°C over its twin is a finding, not a note.' },
      { q: 'Performance Ratio compares:', a: ['This month vs last month', 'Actual energy vs modeled energy for the ACTUAL measured weather', 'AC vs DC power', 'PR is a battery metric'], correct: 1, exp: 'Weather-normalized honesty: steady PR = climate variation; falling PR = real problem.' },
      { q: 'Healthy fixed-array PR typically runs:', a: ['0.30-0.40', '~0.75-0.85', '0.99+', 'Above 1.0'], correct: 1, exp: 'The baseline band commissioning establishes and PM re-verifies.' },
      { q: 'The as-built string map documents:', a: ['Sales commissions', 'Which modules form which string on which MPPT, matched to labeled monitoring channels', 'Roof shingle type', 'Cable colors'], correct: 1, exp: 'The Rosetta stone between monitoring alarms and physical rooftop locations.' },
      { q: 'Rapid-shutdown functional testing at commissioning verifies:', a: ['Label adhesion', 'Initiation collapses boundary voltage and the system recovers on restore', 'Transmitter branding', 'Breaker torque'], correct: 1, exp: 'The fire-day system is proven on a good day — initiate, measure, restore, verify.' },
      { q: 'Monitoring alerts should route first to:', a: ['Only the homeowner', 'The servicing company — fleets are triaged from dashboards before customers notice', 'The utility', 'No one, to avoid noise'], correct: 1, exp: 'The telemetry lesson: the servicer who sees the failure first owns the relationship (and avoids the four-months-down call).' },
      { q: 'Commissioning documentation converts commercially into:', a: ['Nothing', 'The O&M service relationship: baselines, labeled monitoring, and literate owners become contracts', 'Higher module prices', 'Utility rebates only'], correct: 1, exp: 'The birth-certificate lesson: commissioning done right is the service business\'s foundation.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 20 — SOLAR + STORAGE TROUBLESHOOTING CAPSTONE
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'solar-troubleshooting',
    num: 20,
    title: 'Solar + Storage Troubleshooting Capstone',
    desc: 'Underproduction trees, inverter and storage fault families, ground-fault hunts on live arrays — the universal method on the roof.',
    slides: [
      {
        title: 'The Underproduction Tree',
        body: [
          'Solar\'s defining complaint is a number, not a noise: "it is making less than it should." The tree, monitoring-first (module 19\'s triage): SYSTEM-DEAD → inverter/RSD/AC-side (is the array obediently shut down? Module 16\'s transmitter check; is the AC breaker/grid present?); ONE STRING LOW/DEAD → that string\'s DC chain (fuse, connectors, wiring — arrive with the map); ONE MODULE LOW (granular fleets) → that module/optimizer/micro; EVERYTHING PROPORTIONALLY LOW → the shared causes: soiling, uniform degradation, inverter derating (thermal — the attic in July), or clipping (an undersized-inverter design reality, not a fault); NEW STEPWISE PATTERN → shading changes (that tree grew; that vent pipe\'s winter shadow) — the seasonal-shadow literacy of module 13.',
          'The weather-normalization discipline guards the whole tree: compare against irradiance-adjusted expectation or PR (module 19), never raw month-to-month totals — half of "underproduction" complaints are climatology, resolved with the PR conversation, not a ladder. The other half divide by the tree, and the tree\'s first split (monitoring granularity) usually finishes the localization before the truck moves.',
          'On-roof verification tools per branch: the clamp meter for string currents (mid-day comparisons between sibling strings — the healthy twins betray the sick one), IV tracer for the definitive string signature, IR for hot spots and connections, and irradiance reference for honest expectations. The split-half instinct applies literally: a dead string\'s fault is hunted by voltage checks at accessible midpoints — combiner, transitions, connector clusters.',
          'The recurring solar-specific catalog, consolidated: MC4/connector failures (the #1), string fuse opens (find WHY — a fuse that opened saw backfeed or fault current), RSD component failures (obedient-shutdown mysteries), bypass-diode failures (persistent one-module steps, J-box heat), optimizer/micro unit failures (granular dropouts with per-unit codes), and soiling/shading evolution. Add module 17-18 for storage and you hold the whole domain\'s suspect file.',
        ],
        keyPoints: [
          'Monitoring-first triage: system/string/module/proportional/stepwise each name their branch',
          'Weather-normalize before diagnosing: PR resolves half of all underproduction complaints',
          'Sibling-string comparison with a clamp meter is the roof\'s fastest split-half',
          'The catalog: connectors, string fuses (find why), RSD, bypass diodes, optimizers, shade evolution',
        ],
        quiz: [
          {
            q: 'Monitoring shows every string down exactly ~30% on clear days, with normal voltages and a smooth proportional pattern. The suspect class is:',
            a: ['A string fuse', 'Shared causes: uniform soiling, inverter thermal derating, or clipping — proportional-everything points at the common path or surface', 'One failed optimizer', 'A grid fault'],
            correct: 1,
            exp: 'Uniform proportional loss is the shared-cause signature (the kitchen epidemic lesson): the common surface (soiling) or the common electronics (derate/clipping), not any single string.',
          },
          {
            q: 'A string fuse is found open. The professional action is:',
            a: ['Replace it and leave when production resumes', 'Find why it opened — string fuses see backfeed into faults; megger and inspect the string before and after re-fusing', 'Install a larger fuse', 'Bypass it temporarily'],
            correct: 1,
            exp: 'The every-course fuse rule: protection that operated is a witness. The string took fault or backfeed current from its parallel siblings — find the fault the fuse survived.',
          },
        ],
      },
      {
        title: 'Storage Faults and the Combined System',
        body: [
          'Storage complaints sort into the module-17 frame: NOT CHARGING (mode/reserve configuration first — the "idle by design" catalog; then CT placement/orientation — the backwards-eyes classic; then BMS limits — temperature-blocked charging in cold garages is designed lithium protection, not failure); NOT DISCHARGING (mode again, minimum-reserve settings, BMS protective states); CAPACITY COMPLAINTS ("it used to last all night" → SOH trend data versus load-growth honesty — the new hot tub story lives in the consumption graph); and OFFLINE/FAULTED (BMS logs first, always — the battery\'s own event log outranks every guess).',
          'Backup failures deserve their own tree because they surface at the worst moment: WHOLE-HOME-DARK during outage → transfer equipment (did the island form? — gateway/transfer switch function, the ATS lesson in solar clothes), backup-loads-subpanel mapping (that circuit was never on the protected panel — the two-hours-and-dead expectations conversation), and capacity/surge reality (module 17\'s sizing triangle meeting the well pump). TEST the island at commissioning and PM: simulated grid loss, pickup verified — the generator course\'s transfer-testing religion, translated.',
          'Combined-system reasoning ties the capstone: PV charging depends on storage state (full battery + export limits = throttled PV that looks "broken" — frequency-shift in AC-coupled islands, curtailment settings on-grid); storage health depends on PV sizing (a chronically under-charged battery in a shaded-array home is a design mismatch presenting as battery complaints); and the monitoring platform sees both sides — read the POWER FLOW graphs (PV/battery/grid/load traces over a day answer most "why did it do that" questions visually, the EPMS-trend lesson at house scale).',
          'The capstone\'s close, familiar by now: verify fixes under real conditions (a full sun-day\'s trace, an island test, a charge/discharge cycle), root-cause the root cause (the failed connector\'s water path; the reversed CT\'s missing commissioning check; the shading\'s actual tree), feed the pattern library, and document to the standard every course set. Nine trades, one method — the roof just adds sunshine.',
        ],
        keyPoints: [
          'Storage order: mode/config → CTs → BMS limits/logs → hardware; cold-garage charge blocks are protection',
          'Backup failures: island formation, protected-panel mapping, sizing triangle — test transfers like generators',
          'Full-battery PV throttling and under-sized-array battery starvation are system stories, not unit faults',
          'Power-flow graphs answer most "why" questions visually — read them before rolling',
        ],
        quiz: [
          {
            q: 'Each cold morning a garage-mounted battery refuses to charge until midday; BMS logs show low-temperature charge inhibition. This is:',
            a: ['A failing BMS', 'Lithium charge protection working: charging frozen cells causes plating damage — the BMS waits for safe temperature (heater kits/relocation are the design answers)', 'Reversed CTs', 'Inverter derating'],
            correct: 1,
            exp: 'Module 18\'s charge discipline, automated: cold-charge inhibition protects the cells. The finding is environmental design (heating, location), not a defect.',
          },
          {
            q: 'During an outage test, the island forms and the battery carries the house — but the kitchen refrigerator is dark. The explanation is:',
            a: ['Battery undersized', 'That circuit is not on the protected-loads subpanel — a backup-scope mapping issue, not a power failure', 'Refrigerator surge', 'Inverter fault'],
            correct: 1,
            exp: 'Partial-home backup protects the panel it protects. The commissioning walkthrough and panel schedule set expectations; the fix is scope/design, not capacity.',
          },
        ],
      },
    ],
    test: [
      { q: 'The first triage question on underproduction is:', a: ['Which module failed', 'What the monitoring pattern shows: system/string/module/proportional/stepwise', 'The customer\'s bill', 'Panel brand'], correct: 1, exp: 'Monitoring granularity localizes the fault class before the truck moves.' },
      { q: 'Half of underproduction complaints resolve via:', a: ['Module replacement', 'Weather-normalization: PR analysis showing climate, not fault', 'Firmware updates', 'String re-fusing'], correct: 1, exp: 'Raw month totals lie; PR separates climatology from real problems.' },
      { q: 'Proportional-everything-low points at:', a: ['One bad string', 'Shared causes: soiling, thermal derate, clipping — the common surface or path', 'Grid frequency', 'One optimizer'], correct: 1, exp: 'The shared-cause law: uniform loss = common cause, never a single component.' },
      { q: 'The roof\'s fastest string diagnosis is:', a: ['Removing modules', 'Clamp-meter sibling comparison: healthy twins betray the sick string', 'Night testing', 'Warranty forms'], correct: 1, exp: 'Mid-day sibling currents are the literal split-half on the roof.' },
      { q: 'An opened string fuse demands:', a: ['A bigger fuse', 'Finding the fault it protected against before re-fusing — megger and inspect the string', 'Immediate replacement only', 'Ignoring if production is okay'], correct: 1, exp: 'The universal fuse rule: it operated because current flowed where it should not.' },
      { q: 'A battery that will not charge below 32°F garage temps is exhibiting:', a: ['BMS failure', 'Designed lithium cold-charge protection against plating damage', 'CT reversal', 'Inverter throttling'], correct: 1, exp: 'Charge discipline automated: the answer is heat/location design, not a reset.' },
      { q: '"It used to last all night" capacity complaints are grounded against:', a: ['Customer memory', 'SOH trend data AND the consumption graph — degradation vs load growth honestly separated', 'Module warranties', 'Weather records'], correct: 1, exp: 'The new hot tub lives in the load trace; real fade lives in SOH — the data settles it.' },
      { q: 'Backup circuits that stay dark during a successful island indicate:', a: ['Battery failure', 'Protected-loads panel scope: those circuits were never in the backup design', 'Frequency drift', 'A dead gateway'], correct: 1, exp: 'Partial-home backup covers its subpanel; scope conversations beat capacity accusations.' },
      { q: 'A "broken" PV array that throttles every afternoon in an off-grid island with a full battery is:', a: ['Failing', 'Being curtailed by design — nowhere for the energy to go; frequency-shift/curtailment at work', 'Shaded', 'Underperforming its PR'], correct: 1, exp: 'Energy must have a destination: full battery + no grid = intentional throttle (module 17\'s island lesson).' },
      { q: 'The most information-dense view for combined-system "why" questions is:', a: ['The inverter nameplate', 'The daily power-flow graph: PV, battery, grid, and load traces together', 'The string map alone', 'Utility bills'], correct: 1, exp: 'The house-scale EPMS trend: most behavioral mysteries resolve visually in the flow graph.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 21 — CAREER IN SOLAR & STORAGE
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'solar-career',
    num: 21,
    title: 'Career in Solar & Storage',
    desc: 'The fastest-growing electrical trade: market segments, NABCEP, the O&M business, and where solar careers lead.',
    slides: [
      {
        title: 'The Market and the Ladder',
        body: [
          'Solar employs more people than any other electricity-generation technology in America, and storage attach rates are climbing toward ubiquity — the growth story is structural (costs down an order of magnitude in 15 years, policy tailwinds, and the electrification wave), and the SERVICE side is its least-crowded corner: installation booms attracted crews by the thousand, but the fleets they built now age into an O&M market desperate for diagnostic talent. A portal graduate arrives with precisely the scarce half: electrical fundamentals, instrument literacy, batteries, and the troubleshooting method.',
          'The segments and their textures: RESIDENTIAL (install crews, and the service/warranty divisions that mint techs into diagnosticians), COMMERCIAL & INDUSTRIAL (rooftop and carport scale — string-inverter fleets, real O&M contracts), UTILITY-SCALE (tracker fields and central inverters — a plant-operations world adjacent to the generator course\'s), O&M SPECIALISTS (third-party fleet caretakers — the pure-service employers), and STORAGE-FIRST roles (BESS commissioning and service — the module 17-18 skill premium, growing fastest of all).',
          'NABCEP is the industry\'s credential ladder: entry ASSOCIATE credentials (PV and storage flavors — realistic first-year targets that this course\'s content maps toward), the flagship PV INSTALLATION PROFESSIONAL, and — the service tech\'s crown — the PV TECHNICAL SALES and SYSTEM INSPECTOR/COMMISSIONING & MAINTENANCE specialist paths. Electrical LICENSING context varies by state (some require solar work under electrical licenses — the journeyman path pairs powerfully with this trade), and manufacturer certifications (inverter and battery OEMs) carry the same warranty-authorization economics as every course: the certified tech is the dispatchable tech.',
          'Compensation: install-crew entry commonly $40-55K; SERVICE/O&M techs $55-80K with experience; commissioning specialists, BESS-fluent techs, and utility-scale plant roles above that — with the observation this portal has earned the right to repeat: diagnostic scarcity pays. The tech who can trace an IV curve, read a BMS log, and write a root-cause report is not competing with installation labor.',
        ],
        keyPoints: [
          'Install boomed; SERVICE is the under-supplied side — aging fleets need diagnosticians',
          'Segments: residential service, C&I O&M, utility-scale plants, storage-first roles (fastest premium)',
          'NABCEP Associate → Professional/specialist paths; state licensing and OEM certs ride along',
          'Service/O&M $55-80K+, commissioning and BESS fluency above — diagnostic scarcity pays',
        ],
        quiz: [
          {
            q: 'The structurally under-supplied corner of the solar labor market is:',
            a: ['Panel installation labor', 'Service/O&M diagnostics: the boom built fleets faster than it built technicians who can troubleshoot them', 'Sales', 'Permitting clerks'],
            correct: 1,
            exp: 'Install crews scaled with the boom; the aging-fleet service market did not. The portal graduate\'s diagnostic stack lands on the scarce side.',
          },
          {
            q: 'The industry\'s recognized certification body is:',
            a: ['EGSA', 'NABCEP — Associate through Professional and specialist credentials', 'CFESA', 'NATE'],
            correct: 1,
            exp: 'NABCEP is solar\'s ladder, the analog of NATE/CFESA/EGSA in the sibling trades — with Associate credentials as realistic first-year targets.',
          },
        ],
      },
      {
        title: 'The Kit, the Craft, and the Paths',
        body: [
          'The kit from the curriculum: the FOUNDATION set (DMM rated for the DC voltages you will meet, clamp with DC capability, megger for the module-14 hunts), the SOLAR set (IV-curve tracer as you grow into commissioning work, irradiance reference cell, IR camera — the three that separate diagnosticians from part-swappers), the SAFETY set (glove program per site policy, opaque module covers for the rare truly-dead requirement, lockout gear), and the STORAGE additions (manufacturer interface tools/apps — the BMS conversation happens through them). Van stock mirrors the catalog: MC4 connectors and the CORRECT crimper (brand-matched — the mixing sin), string fuses, sealants/flashing spares, and the label stock module 16 made you respect.',
          'The craft habits translate whole, with solar\'s additions: SUN-WINDOW planning (production diagnosis needs producing hours; connector work loves early/late light), WEATHER discipline (roofs, wind, and wet tile — the trade\'s fall hazards outrank its electrical ones statistically: harness discipline is life discipline), the CUSTOMER-EDUCATION load (solar owners watch their apps like day traders — the PR conversation, the seasonal expectation reset, and the mode-configuration walkthrough are recurring deliverables), and the documentation religion that O&M contracts are literally built from.',
          'The service-business shape: O&M CONTRACTS (annual inspections, monitoring response, PR reporting — recurring revenue with the kitchen-course economics), monitoring-driven dispatch (the fleet dashboard as triage — module 19\'s handoff done right feeding module 20\'s tree), warranty administration (module/inverter/battery claims are process work the disciplined tech turns into a service line), and the retrofit wave (aging fleets need RSD upgrades, storage additions, inverter replacements — installation skills applied surgically to live systems).',
          'The paths: SERVICE TECH → COMMISSIONING SPECIALIST (the tracer-and-report expert new construction demands) → O&M LEAD/manager; the STORAGE SPECIALIST branch (BESS commissioning, C&I storage, the coming V2X world); UTILITY-SCALE plant operations (the generator course\'s plant discipline under different panels); TECHNICAL SALES and system design; and OWNERSHIP — solar O&M is young enough that the route-density land grab is still on, and the documented, monitored, honest operator wins it. Same hallway as all nine rooms: honest diagnosis, faithful documentation, continuous learning — carried up a ladder, in sunshine.',
        ],
        keyPoints: [
          'The differentiator kit: IV tracer, irradiance reference, IR camera — plus brand-correct MC4 tooling',
          'Fall protection outranks electrical statistically: harness discipline is life discipline',
          'O&M contracts + monitoring dispatch + warranty administration = the recurring-revenue engine',
          'Paths: commissioning specialist, storage/BESS branch, utility plants, design/sales, ownership',
        ],
        quiz: [
          {
            q: 'Statistically, the solar service trade\'s greatest injury hazard is:',
            a: ['DC arc flash', 'Falls — roof work makes harness and ladder discipline the trade\'s first safety religion', 'Battery fires', 'Heat stroke alone'],
            correct: 1,
            exp: 'The electrical hazards are real and trained-for; gravity injures more solar workers than electricity. Fall protection is the discipline that brings techs home.',
          },
          {
            q: 'The three instruments that most distinguish a solar diagnostician from a parts-swapper are:',
            a: ['Bigger ladders, more fuses, spare inverters', 'IV-curve tracer, irradiance reference, and IR camera — measurement against model, honestly normalized', 'Drone, tablet, megaphone', 'Two multimeters and hope'],
            correct: 1,
            exp: 'Module 19\'s stack: trace against model at measured irradiance, image the heat. The tech who measures owns the diagnosis — and the O&M contract.',
          },
        ],
      },
    ],
    test: [
      { q: 'Solar\'s labor-market structure means the portal graduate is scarcest in:', a: ['Panel hauling', 'Service/O&M diagnostics for the aging installed fleet', 'Door-to-door sales', 'Racking assembly'], correct: 1, exp: 'The boom built systems faster than troubleshooters; diagnosis is the under-supplied side.' },
      { q: 'NABCEP Associate credentials are:', a: ['Lifetime achievements', 'Realistic first-year targets this curriculum maps toward', 'Utility requirements', 'Only for engineers'], correct: 1, exp: 'The entry rung of solar\'s recognized ladder, with Professional and specialist paths above.' },
      { q: 'OEM inverter/battery certifications matter because:', a: ['They replace NABCEP', 'Warranty authorization makes the certified tech the dispatchable tech — the every-course economics', 'They are free', 'Code requires them'], correct: 1, exp: 'The manufacturer-school lesson, ninth verse: authorization routes the work.' },
      { q: 'Experienced solar service/O&M technicians commonly earn:', a: ['$25-35K', '$55-80K, with commissioning and BESS specialists above', 'Minimum wage plus sun', '$150K to start'], correct: 1, exp: 'Diagnostic scarcity pays: the service side clears well above install labor.' },
      { q: 'The trade\'s statistically dominant injury mechanism is:', a: ['Arc flash', 'Falls from roofs and ladders — harness discipline first', 'Chemical exposure', 'Lifting'], correct: 1, exp: 'Gravity beats electricity in the injury statistics: fall protection is safety religion #1.' },
      { q: 'MC4 crimp tooling must be:', a: ['Any pliers', 'Brand-matched to the connector system — mixed components are the classic failure seed', 'Hydraulic always', 'Borrowed'], correct: 1, exp: 'The connector catalog begins at the crimper: brand-correct tooling and components, always.' },
      { q: 'O&M contracts are built from:', a: ['Handshakes', 'Documented baselines, labeled monitoring, PR reporting, and response commitments', 'Panel warranties', 'Utility mandates'], correct: 1, exp: 'The recurring-revenue engine: commissioning artifacts and monitoring discipline become the product.' },
      { q: 'The retrofit wave in aging fleets includes:', a: ['Nothing serviceable', 'RSD upgrades, storage additions, and inverter replacements on live systems', 'Repainting modules', 'Removing monitoring'], correct: 1, exp: 'Yesterday\'s installs need today\'s code and storage — surgical installation skills on energized fleets.' },
      { q: 'The storage-specialist branch is attractive because:', a: ['Less training needed', 'BESS commissioning/service demand is growing fastest and pays the premium', 'No customer contact', 'It avoids roofs entirely'], correct: 1, exp: 'Modules 17-18\'s skills meet the attach-rate curve: storage fluency is the premium lane.' },
      { q: 'The portal\'s career thesis, in its solar verse:', a: ['Sunshine sells itself', 'Honest diagnosis, faithful documentation, continuous learning — measured against model, in every room including this one', 'Certifications alone suffice', 'Install fast, move on'], correct: 1, exp: 'Nine rooms, one hallway: the habits are the career, on the roof as everywhere.' },
    ],
  },
];
