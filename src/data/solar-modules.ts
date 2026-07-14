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
];
