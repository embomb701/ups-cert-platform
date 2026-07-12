import type { TrainingModule } from './modules';

// Generator (Power Generation) FSE course — generator-specific modules
// (course positions 13-25). The sequence is: shared foundation 1-10, the
// two UPS battery modules at positions 11-12 (battery-types,
// battery-safety), then these. Nums are course positions. Kept OUT of
// ALL_MODULES so the UPS completion check is unaffected.

export const GENERATOR_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 13 — STARTING SYSTEMS & CRANKING CIRCUITS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gen-starting-systems',
    num: 13,
    title: 'Starting Systems & Cranking Circuits',
    desc: 'Starters, station battery chargers, and cranking circuits — the systems behind the #1 generator failure: failure to start.',
    slides: [
      {
        title: 'The Cranking Circuit',
        body: [
          'A standby generator has one moment that matters: the ten seconds after the outage begins. Industry failure statistics are blunt — the largest share of failed generator starts trace to the starting system, and most of those to batteries. Everything you learned in the battery modules (11-12) now has an engine bolted to it.',
          'The cranking circuit is a brutal, simple DC power path: battery → heavy positive cable → starter solenoid → starter motor, with the return through the frame/ground cable. Cranking a big diesel draws hundreds to over a thousand amps for several seconds. At those currents, small resistances become huge voltage drops (Ohm\'s law at maximum stakes): one corroded lug or loose ground strap that reads "fine" at rest can eat 2-3 volts under crank and leave the starter too weak to roll the engine.',
          'The definitive test is voltage drop UNDER CRANK — a battery and circuit reveal themselves only under load. Measure battery terminal voltage while cranking (a healthy 12V system stays above roughly 9.5-10V; a 24V system above ~19-20V). Then hunt drops across each segment while cranking: across the positive cable run, across the solenoid contacts, across the ground path. More than a few tenths across any cable or connection marks the failure point. This one technique — load the circuit, measure the drops — resolves the majority of crank complaints without guessing.',
          'The starter itself is a DC series motor with a solenoid that both engages the pinion and closes the main contacts. Its failure repertoire: click-no-crank (solenoid engages but main contacts are burned, or the battery collapses — the under-crank voltage tells you which), slow crank (voltage drops, worn brushes/bushings, or engine drag from cold thick oil), spin-no-crank (pinion/flywheel engagement), and nothing at all (control circuit: crank relay, controller output, safety interlocks like E-stops and coolant-level switches in the crank chain).',
        ],
        tables: [
          {
            caption: 'Crank complaints → first measurements',
            headers: ['Symptom', 'Decisive measurement'],
            rows: [
              ['Click, no crank', 'Battery volts under crank: collapses = battery; holds = solenoid contacts/starter'],
              ['Slow crank', 'Voltage drops across each cable segment under crank; oil temp/viscosity'],
              ['No click at all', '24V/12V at the crank relay and controller output; interlock chain (E-stop!)'],
              ['Spin, no engagement', 'Pinion and flywheel ring gear inspection'],
            ],
          },
        ],
        keyPoints: [
          'Most failed generator starts trace to the starting system, most of those to batteries',
          'Cranking currents make small resistances into big voltage drops — test UNDER CRANK',
          '12V systems should hold ~9.5-10V cranking (24V: ~19-20V); hunt segment drops for the rest',
          'No-click failures live in the control chain: relays, controller, E-stops, interlocks',
        ],
        quiz: [
          {
            q: 'A generator cranks too slowly to start. Battery open-circuit voltage reads 12.7V, but during crank the terminal voltage holds 11.8V while the starter post sees only 8.9V. The fault is:',
            a: ['A weak battery', 'Resistance in the cabling/connections between battery and starter — nearly 3V is dropping in the path under load', 'A worn starter', 'Thick oil'],
            correct: 1,
            exp: 'The battery holds up under load; the voltage dies in transit. Segment-by-segment drop testing under crank finds the corroded lug or ground strap eating the 3 volts.',
          },
          {
            q: 'Why must cranking-circuit testing be done under crank rather than at rest?',
            a: ['Meters read better when circuits are loaded', 'Resistances that are invisible at no load produce large voltage drops only when hundreds of amps flow', 'Cranking warms the battery for accuracy', 'It saves a test step'],
            correct: 1,
            exp: 'V = I × R: at 500+ amps, a few milliohms of corrosion becomes volts of loss. At rest (near-zero current), the same corrosion reads as a healthy circuit.',
          },
          {
            q: 'A generator gives no response at all to a start command — no click, no crank. The first territory to check is:',
            a: ['The battery cells', 'The control chain: E-stop switches, crank relay, controller crank output, and safety interlocks', 'The fuel system', 'The alternator'],
            correct: 1,
            exp: 'Silence means the command never reached the solenoid. Someone\'s bumped E-stop is a legendary find; the interlock and relay chain is the map.',
          },
        ],
      },
      {
        title: 'Station Battery Chargers',
        body: [
          'A standby generator\'s battery spends 99.9% of its life waiting — which means the battery charger, not the engine, is the battery\'s daily companion, and a quietly failed charger is a dead generator discovered at the worst moment. Station chargers are float chargers: they hold the battery at a maintenance voltage (roughly 13.2-13.5V for 12V lead-acid, doubled for 24V systems) indefinitely, with an equalize mode for periodic cell balancing on flooded batteries.',
          'Charger literacy: verify output voltage at the battery (not just the charger display), verify actual charging current behavior (a healthy float shows small maintenance current; a battery drawing heavy current on float for days is failing or sulfated), and know the alarm outputs — good chargers alarm on AC loss, low DC volts, and charger failure, and those alarms should land in the generator controller or building monitoring, not blink unseen in a corner.',
          'The failure patterns: chargers backfeeding off (blown fuses, tripped input breakers — the charger died months ago and the battery has been slowly self-discharging since), voltage set wrong (chronic undercharge sulfates the battery; overcharge boils it dry — check electrolyte on flooded cells), and alternator confusion: the engine-driven charging alternator maintains the battery only WHILE RUNNING, which for a standby set is a couple of hours a month. The station charger carries the real duty; a healthy alternator does not excuse a dead charger.',
          'The battery-side discipline comes from modules 11-12, applied on a schedule: terminal condition and torque, electrolyte levels (flooded), voltage and specific gravity or conductance testing, and load testing annually — because float voltage can look perfect on a battery with no capacity left. NFPA 110 (module 23) turns all of this into required, documented routine; here you learn why each item earns its place.',
        ],
        keyPoints: [
          'The float charger, not the engine alternator, keeps a standby battery alive — verify it at the battery',
          'Heavy sustained float current = failing/sulfated battery; wrong float voltage kills slowly either way',
          'Charger alarms (AC loss, low DC) must land somewhere humans look',
          'Float voltage can look perfect on a dead battery — capacity/load testing is the truth',
        ],
        quiz: [
          {
            q: 'A generator failed its monthly test with dead batteries. The engine alternator tests healthy, and the customer is confused: "it charges when it runs, right?" The explanation is:',
            a: ['The alternator is actually bad', 'The engine runs only hours per month — the station float charger carries the battery, and it had failed', 'The batteries were too old to charge', 'The starter drained them'],
            correct: 1,
            exp: 'A standby set\'s alternator contributes almost nothing across a month of sitting. The silent death of the float charger is the classic root cause behind "mysteriously" dead batteries.',
          },
          {
            q: 'A float charger shows 13.4V at the battery, but the 3-year-old battery fails its annual load test badly. The lesson is:',
            a: ['The charger is overcharging', 'Float voltage indicates charge state, not capacity — a sulfated battery floats pretty and dies under load', 'The load tester is faulty', 'Load tests damage batteries'],
            correct: 1,
            exp: 'Voltage is not capacity. Only a load (or conductance) test reveals whether the battery can actually deliver cranking amps — why annual capacity testing is required practice.',
          },
        ],
      },
      {
        title: 'Cold Starts, Block Heaters, and Readiness',
        body: [
          'NFPA 110 Type 10 systems must carry load within 10 seconds of the outage — which means a cold diesel must fire nearly instantly. That readiness is manufactured by keeping the engine warm: block heaters (jacket-water heaters) circulate heated coolant through the block continuously, keeping it near 90-120°F so oil flows, fuel atomizes, and compression ignition happens on the first revolutions.',
          'Block heater failures are quiet and common: a burned element, a failed thermostat, a plugged circulation loop, or just a tripped breaker — discovered only when the generator starts hard, smokes white (unburned fuel from cold cylinders), or fails a cold-morning test. The touch test on the walkaround (upper heater hose warm, gradient across the loop) plus amp-clamping the heater circuit takes one minute and belongs in every PM. Heaters also fail expensively the other way: element scale (your old enemy) and low coolant cooking the element.',
          'The rest of the readiness inventory: fuel valves open and day tank full (module 17), controller in AUTO (a controller left in OFF/manual after service is the most embarrassing root cause in the industry — the last human to touch it owns it), no active alarms, battery/charger healthy as above, and jacket water/oil at levels. The professional habit: every departure from a generator site ends with the AUTO-check ritual — controller in auto, breakers closed, valves open, charger on, heater on. Write it on the ticket.',
          'White/blue/black smoke completes the cold-start literacy: WHITE = unburned fuel — cold engine (heater failure), low compression, or timing; BLUE = burning oil; BLACK = rich mixture/overload/air starvation. Ten seconds of watching the exhaust at start tells you where to look next — the generator equivalent of reading flame color on burners.',
        ],
        keyPoints: [
          'Block heaters manufacture the 10-second start; touch-test and amp-clamp them every PM',
          'White smoke at start = cold/unburned fuel — suspect the heater first',
          'Departure ritual: controller in AUTO, breakers closed, valves open, charger on, heater on',
          'Smoke colors: white = unburned fuel, blue = oil, black = rich/overloaded/air-starved',
        ],
        quiz: [
          {
            q: 'A hospital generator failed its 10-second start on a cold morning, smoking white before catching. The engine cranked strongly. The prime suspect is:',
            a: ['The starting batteries', 'A failed block heater — the cold engine could not fire fuel promptly', 'The alternator', 'The transfer switch'],
            correct: 1,
            exp: 'Strong crank rules out the battery side; white smoke plus delayed firing on a cold engine is the block-heater failure signature. The touch test would have caught it on PM.',
          },
          {
            q: 'The single most preventable cause of a standby generator failing to respond to an outage is:',
            a: ['Fuel gelling', 'The controller left in OFF or MANUAL after the last service visit', 'Utility voltage sensing', 'Alternator failure'],
            correct: 1,
            exp: 'Not-in-auto is the industry\'s most embarrassing and most human failure mode. The departure ritual — verify AUTO, every visit, on the ticket — exists to make it impossible.',
          },
        ],
      },
    ],
    test: [
      { q: 'The leading cause of standby generator start failures is:', a: ['Fuel contamination', 'The starting system — batteries above all', 'Alternator faults', 'Control software'], correct: 1, exp: 'Industry statistics put batteries and the starting system at the top of the failure list — why this module leads the track.' },
      { q: 'A healthy 12V battery under crank should hold approximately:', a: ['12.6V', 'Above ~9.5-10V', 'Above 11.9V', 'Any voltage above 6V'], correct: 1, exp: 'Cranking sag is normal; collapse below ~9.5V marks a failing battery (or huge circuit drops — measure both).' },
      { q: 'Voltage-drop testing of cranking cables must be performed:', a: ['With the engine off and circuit at rest', 'While cranking — the drops only appear under load current', 'With the battery disconnected', 'Only in cold weather'], correct: 1, exp: 'Milliohms of corrosion become volts only at hundreds of cranking amps. Load the circuit, then measure.' },
      { q: 'Click-no-crank with battery voltage holding firm under the attempt indicates:', a: ['A dead battery', 'Burned solenoid main contacts or a failed starter', 'An open E-stop', 'Low coolant'], correct: 1, exp: 'The solenoid engaged (click) and the battery held: the heavy-current path through the contacts/starter is the suspect.' },
      { q: 'A standby generator battery is kept alive day to day by:', a: ['The engine-driven alternator', 'The station float charger', 'Solar trickle', 'The transfer switch'], correct: 1, exp: 'The engine runs hours per month; the float charger works 24/7. Its silent failure is the classic dead-battery root cause.' },
      { q: 'A battery drawing heavy float current for days indicates:', a: ['Normal absorption', 'A failing or sulfated battery (or a shorted cell)', 'A strong charger', 'Cold weather'], correct: 1, exp: 'Healthy floats settle to small maintenance current; sustained heavy draw is the battery consuming itself.' },
      { q: 'Float voltage reading correct proves:', a: ['The battery will crank the engine', 'Only charge state — capacity requires load or conductance testing', 'The charger is oversized', 'Nothing at all'], correct: 1, exp: 'Sulfated batteries float pretty and die under load; annual capacity tests exist for exactly this gap.' },
      { q: 'Block heaters exist to:', a: ['Prevent battery freezing', 'Keep the engine warm enough for immediate starting (the 10-second requirement)', 'Warm the operator cab', 'Heat the fuel tank'], correct: 1, exp: 'Warm jacket water = flowing oil and firing cylinders on the first revolutions — the manufactured readiness of standby power.' },
      { q: 'White exhaust smoke during a hard cold start indicates:', a: ['Burning oil', 'Unburned fuel from cold cylinders — check the block heater', 'Rich mixture', 'Coolant leak into exhaust'], correct: 1, exp: 'White = fuel vapor that failed to ignite: cold engine (heater), compression, or timing. Blue = oil; black = rich/overload.' },
      { q: 'The professional departure ritual at every generator site ends with verifying:', a: ['The paint condition', 'Controller in AUTO, breakers closed, valves open, charger and heater energized', 'The hour meter', 'Fuel receipts'], correct: 1, exp: 'The not-in-auto failure is 100% human and 100% preventable — the ritual, documented on the ticket, makes it so.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 14 — DIESEL ENGINE FUNDAMENTALS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gen-engine-fundamentals',
    num: 14,
    title: 'Diesel Engine Fundamentals',
    desc: 'The four-stroke diesel: compression ignition, air systems, governors — and why 1800 RPM means 60 Hz.',
    slides: [
      {
        title: 'Compression Ignition and the Four Strokes',
        body: [
          'A diesel engine is an air compressor that burns fuel in its own heat. The four strokes: INTAKE (piston down, drawing in air — air only, unlike gasoline engines), COMPRESSION (piston up, squeezing the air 15-20:1 until it reaches ~1000°F), POWER (fuel injected as a fine mist into that furnace-hot air ignites spontaneously — compression ignition, no spark plug anywhere), EXHAUST (piston up, pushing out combustion gases). Two revolutions per power stroke, cylinders phased so the crankshaft receives continuous power.',
          'Everything diagnostic flows from that cycle. Diesel needs three things: AIR (clean, abundant — filters and turbo), COMPRESSION (rings, valves — the heat source itself), and FUEL (clean, timed, atomized — module 17). A diesel that cranks but will not fire is missing one of the three, and the interrogation order is usually fuel (most common), then air, then compression (measured with a compression or leak-down test, and hinted at by white smoke and blow-by).',
          'The air system earns its own attention on generator-scale engines: air filters with restriction indicators (a clogged filter chokes power and blackens exhaust), TURBOCHARGERS (exhaust-driven compressors force-feeding the cylinders — listen for the healthy whistle, watch for oil leaks at the shaft, and never shut down a worked turbo without a cooldown idle: its bearings cook in stagnant oil), and AFTERCOOLERS/charge-air coolers (cooling the compressed intake air for density — leaks show as power loss and oil misting).',
          'Engine literacy is sensory before it is instrumental: a healthy diesel has an even, steady rhythm; misfires make lumpy rhythm and shaking; the turbo whistles smoothly; exhaust runs clear to light haze under load. Add the gauges — oil pressure (immediately after start, the first vital sign), coolant temperature, and charge pressure where fitted — and the panel\'s story completes the physical.',
        ],
        keyPoints: [
          'Diesel = compression ignition: intake air only, fuel injected into ~1000°F compressed air',
          'Cranks-but-won\'t-fire = missing air, compression, or fuel — interrogate fuel first',
          'Turbo discipline: cooldown idle after load; oil at the shaft and dull whine are failure signs',
          'Sensory baseline first: rhythm, smoke, whistle — then gauges (oil pressure is vital sign #1)',
        ],
        quiz: [
          {
            q: 'A diesel has no spark plugs because:',
            a: ['Diesels use glow plugs for all ignition', 'Fuel injected into highly compressed, ~1000°F air ignites spontaneously — compression ignition', 'The magneto replaces them', 'Diesel fuel is pre-ignited in the injectors'],
            correct: 1,
            exp: 'Compression heat IS the ignition source. (Glow plugs on smaller engines only assist cold starts — they are not the running ignition.)',
          },
          {
            q: 'An operator shut a generator down immediately after a two-hour full-load run. The component this habit destroys over time is:',
            a: ['The starter', 'The turbocharger — its bearings cook in stagnant oil without a cooldown idle', 'The radiator', 'The governor'],
            correct: 1,
            exp: 'A worked turbo glows; oil flow stops at shutdown. The cooldown idle (a few minutes) lets it cool with oil flowing — most controllers program it for exactly this reason.',
          },
        ],
      },
      {
        title: 'Governors: Why 1800 RPM Means 60 Hz',
        body: [
          'A generator engine has one sacred duty beyond running: holding EXACT speed. The alternator (module 18) produces AC whose frequency is locked to shaft RPM: a 4-pole alternator makes 60 Hz at exactly 1800 RPM (2-pole: 3600, 6-pole: 1200). Every load the building adds tries to drag the engine down; every load removed lets it surge. The GOVERNOR is the control system that holds RPM — and therefore frequency — against those swings.',
          'Governor generations you will meet: MECHANICAL (flyweights against a spring moving the fuel rack — rugged, drifts, droops), ELECTRONIC (a magnetic pickup counts flywheel teeth; a controller drives an actuator on the fuel system — fast and precise), and full-authority ECM engines (the engine computer governs as one function among many). The mode vocabulary matters once paralleling enters (module 21): ISOCHRONOUS governors hold exact frequency regardless of load (standby standard); DROOP governors allow frequency to sag slightly with load (used for load sharing).',
          'Frequency diagnosis is engine diagnosis — memorize this fork: WRONG VOLTAGE at correct frequency = alternator/AVR problem (module 18); WRONG FREQUENCY = engine/governor problem, full stop. A generator putting out 55 Hz is an engine running at 1650 RPM: hunt fuel starvation, governor/actuator faults, or overload. HUNTING (rhythmic surging up and down) is the governor oscillating — classic causes: air in fuel, sticking actuator/linkage, unstable gain settings, or an erratic magnetic pickup signal.',
          'Load response completes the picture: when a big load hits, a healthy set dips briefly in frequency and voltage and recovers in a couple of seconds (specifications call this transient response). A set that stalls, wallows, or trips on load steps has fuel delivery, turbo lag, governor tuning, or plain overload problems — and data center/UPS loads (module 22) are the most demanding audience for exactly this behavior.',
        ],
        tables: [
          {
            caption: 'The diagnostic fork',
            headers: ['Symptom', 'Territory'],
            rows: [
              ['Voltage wrong, frequency correct', 'Alternator / AVR (module 18)'],
              ['Frequency wrong (or unstable)', 'Engine / governor / fuel'],
              ['Both collapse under load', 'Overload, or engine unable to carry (fuel, air, turbo)'],
            ],
          },
        ],
        keyPoints: [
          'Frequency is locked to RPM: 4-pole = 60 Hz at exactly 1800 RPM',
          'Wrong frequency = engine/governor problem; wrong voltage at right frequency = AVR/alternator',
          'Hunting (rhythmic surging) = air in fuel, sticky linkage/actuator, gain, or pickup signal',
          'Isochronous holds exact Hz (standby standard); droop allows sag for load sharing',
        ],
        quiz: [
          {
            q: 'A generator outputs 208V exactly, but at 57 Hz. The problem territory is:',
            a: ['The AVR', 'The engine/governor — 57 Hz means the engine is turning ~1710 RPM instead of 1800', 'The transfer switch', 'The exciter'],
            correct: 1,
            exp: 'Frequency IS engine speed. Voltage being correct clears the AVR; hunt fuel delivery, governor, or load for the missing 90 RPM.',
          },
          {
            q: 'A diesel generator surges rhythmically up and down in speed at steady load. The classic suspect list is:',
            a: ['Bad batteries', 'Air in the fuel, sticking governor linkage/actuator, unstable gain, or a noisy speed-pickup signal', 'A failed block heater', 'Undersized alternator'],
            correct: 1,
            exp: 'Hunting is the governor chasing itself. Air in fuel is the most common field cause; linkage, tuning, and the pickup complete the list.',
          },
          {
            q: 'For paralleled generators sharing load, governors are configured in:',
            a: ['Isochronous on every unit with no coordination', 'Droop (or coordinated isochronous load-sharing controls) so units divide load predictably', 'Manual mode', 'Off'],
            correct: 1,
            exp: 'Two uncoordinated isochronous governors fight each other. Droop — or modern isochronous load-share controllers — lets paralleled engines divide the work (module 21).',
          },
        ],
      },
      {
        title: 'Engine Protection and Reading the Engine',
        body: [
          'Generator engines protect themselves through a shutdown hierarchy wired into the controller (module 19 covers the panel side; here is the engine side). The classic hard shutdowns: LOW OIL PRESSURE (bearings die in seconds without oil — this trip is never bypassed, ever), HIGH COOLANT TEMPERATURE (module 15\'s territory), OVERSPEED (a runaway engine is a grenade — the overspeed trip, typically ~110-115% of rated RPM, is a life-safety device tested per procedure), and OVERCRANK (protecting the starter from endless cranking on a no-start).',
          'Each shutdown is a witness statement, the fryer high-limit rule at engine scale: an overspeed trip demands investigating the governor/actuator before any reset; low-oil-pressure trips demand verifying actual pressure with a mechanical gauge (senders lie — the $20 sender is the most-replaced part on generator engines, but VERIFY with a gauge before trusting either the sender or the engine); high-temp trips get module 15\'s cooling interrogation.',
          'The walkaround discipline finds problems before they are shutdowns: oil level and condition (milky = coolant intrusion; fuel smell = injector dilution — both are oil-analysis flags), coolant level and DCA test strips, belt condition, leaks mapped (mark and date drips: "new leak" vs "old stain" is diagnosis), exhaust system integrity (leaks in enclosures are CO hazards — your gas-module CO discipline applies to engine exhaust absolutely), air filter indicator, and vibration/mounts. Ten minutes, every visit, documented.',
          'Oil analysis programs close the loop for fleets: a sample per service interval tracks wear metals (iron, copper, aluminum trending up = bearings/liners wearing), coolant intrusion (sodium/potassium), fuel dilution, and soot. It is the engine\'s bloodwork — cheap, predictive, and the difference between planned overhauls and 2 a.m. catastrophes on critical sites.',
        ],
        keyPoints: [
          'Hard shutdowns — low oil pressure, high coolant temp, overspeed, overcrank — are never bypassed',
          'Trips are witnesses: verify with mechanical gauges (senders lie) and find causes before resets',
          'Walkaround: oil condition (milky/fuel-cut), leaks mapped and dated, exhaust integrity (CO!), filters',
          'Oil analysis is engine bloodwork: wear metals, coolant, fuel dilution — predictive, not optional on critical sites',
        ],
        quiz: [
          {
            q: 'A generator shut down on low oil pressure, but the dipstick shows full and the oil looks good. Before restarting you must:',
            a: ['Reset and restart — the level is fine', 'Verify actual oil pressure with a mechanical gauge: senders lie, but bearings do not survive being wrong', 'Replace the oil pump', 'Bypass the switch for the test'],
            correct: 1,
            exp: 'The most-replaced part is the $20 sender — but the verification gauge is what separates "bad sender" from "engine about to destroy itself." Never restart on hope.',
          },
          {
            q: 'Engine oil on the dipstick looks milky, like coffee with cream. This indicates:',
            a: ['Overfilled oil', 'Coolant intrusion into the oil — internal leak (head gasket, cooler) needing immediate investigation', 'Normal condensation', 'Fuel dilution'],
            correct: 1,
            exp: 'Milky oil is water/coolant emulsified in oil — a head gasket or oil-cooler breach. Running on it grinds bearings; oil analysis confirms with sodium/potassium markers.',
          },
        ],
      },
    ],
    test: [
      { q: 'Diesel engines ignite fuel by:', a: ['Spark plugs', 'Injecting it into air heated ~1000°F by 15-20:1 compression', 'Glow plugs during all operation', 'Pre-heating the fuel'], correct: 1, exp: 'Compression ignition: the compressed air IS the ignition source; glow plugs only assist cold starts on some engines.' },
      { q: 'A diesel that cranks well but never fires is missing one of:', a: ['Spark, coil, or points', 'Air, compression, or fuel', 'Voltage, frequency, or phase', 'Oil, coolant, or belts'], correct: 1, exp: 'The diesel trinity. Fuel problems are most common; air and compression complete the interrogation.' },
      { q: 'A 4-pole alternator produces 60 Hz at:', a: ['3600 RPM', 'Exactly 1800 RPM', '1200 RPM', 'Any speed above idle'], correct: 1, exp: 'Frequency = RPM × poles ÷ 120. The governor\'s sacred duty is holding that 1800.' },
      { q: 'Output at 62 Hz and rising means the problem is in:', a: ['The AVR', 'The engine speed/governor', 'The exciter diodes', 'The load'], correct: 1, exp: 'Frequency is engine speed, full stop. Voltage problems at correct frequency point to the alternator side.' },
      { q: 'Governor hunting (rhythmic surge) is classically caused by:', a: ['A weak battery', 'Air in fuel, sticking linkage/actuator, unstable gain, or a noisy speed pickup', 'A dirty radiator', 'Low coolant'], correct: 1, exp: 'The governor oscillates when its fuel response or feedback is corrupted — air in fuel leads the field list.' },
      { q: 'Isochronous governing means:', a: ['Speed droops with load', 'Exact frequency held regardless of load — the standby standard', 'Manual throttle control', 'Variable frequency'], correct: 1, exp: 'Isochronous holds 60.0 Hz from no load to full load; droop trades sag for parallel load sharing.' },
      { q: 'The engine shutdown that is never bypassed under any circumstances is:', a: ['High coolant temp', 'Low oil pressure (and overspeed — the life-safety trips)', 'Overcrank', 'Low fuel'], correct: 1, exp: 'Bearings die in seconds without oil; a runaway engine is lethal. These trips are absolute.' },
      { q: 'Turbochargers require a cooldown idle after loaded running because:', a: ['The exhaust needs to clear', 'Their bearings cook in stagnant oil if stopped hot', 'Fuel lines need to depressurize', 'The governor needs recalibration'], correct: 1, exp: 'A worked turbo glows red; stopping oil flow at that temperature carbonizes the bearings — controllers program the idle for this.' },
      { q: 'Black exhaust smoke under load indicates:', a: ['Coolant leak', 'Rich mixture: overload, air starvation (filter/turbo), or injection faults', 'Normal diesel operation', 'Water in fuel'], correct: 1, exp: 'Black = unburned carbon from too much fuel for the air available: check load, filters, turbo, injection.' },
      { q: 'Oil analysis programs detect:', a: ['Only oil level', 'Wear metals, coolant intrusion, fuel dilution, and soot — trending toward failures before they happen', 'Battery condition', 'Fuel quality only'], correct: 1, exp: 'The engine\'s bloodwork: iron/copper trends, sodium (coolant), dilution — planned overhauls instead of 2 a.m. failures.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 15 — GASEOUS-FUELED ENGINES
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gen-gaseous-engines',
    num: 15,
    title: 'Gaseous-Fueled Engines',
    desc: 'Natural gas and propane gensets: spark ignition, fuel trains, and the gas-safety discipline applied to engines.',
    slides: [
      {
        title: 'Spark Ignition and the Gaseous Difference',
        body: [
          'Below a few hundred kW — the home-standby and small-commercial market that Generac built — gaseous engines dominate: natural gas from the utility means no fuel storage, no fuel rot, no fuel deliveries during a disaster (as long as the gas grid stands), and cleaner emissions. The engine itself changes fundamentally: gaseous fuel will not compression-ignite reliably, so these are SPARK-IGNITED engines — lower compression, spark plugs, ignition coils, and an air-fuel mixing system instead of injectors.',
          'The fuel path will feel familiar from your gas training: utility or tank supply → regulators stepping to inches-w.c. → a fuel shutoff solenoid (energized to open, part of the safety chain) → mixer/carburetor or fuel-injection metering → cylinders. Propane systems add tank considerations (vapor vs liquid withdrawal, tank size vs cold-weather vaporization capacity — an undersized LP tank in winter cannot boil off vapor fast enough for full load, starving the engine exactly when worked hardest).',
          'Everything from your gas-combustion discipline transfers: manometer verification of supply and regulator pressures (under load, not just static), leak-testing every fitting disturbed, fuel-train component literacy (regulators, solenoids), and the emergency protocol. What is new is the engine wrapped around it: gaseous engines derate with heat and altitude more than diesels, are sensitive to fuel energy content, and — critically for standby sizing — a natural-gas engine typically produces less power than the same displacement diesel.',
          'Ignition-system service is lawn-mower-familiar at industrial scale: spark plugs (gapped, scheduled — fouled plugs cause the misfires that dominate gaseous-engine complaints), coils (often coil-per-cylinder), and the ignition module timing it all. A gaseous engine that runs rough interrogates as: plugs/coils (most common), fuel pressure under load, mixture adjustment, then valves/compression.',
        ],
        keyPoints: [
          'Gaseous = spark ignition: plugs, coils, mixer — compression ignition does not work on gas',
          'Gas-train discipline transfers whole: manometer under load, leak tests, solenoid safety chain',
          'Undersized LP tanks starve engines in cold weather (vaporization limit)',
          'Rough running: plugs/coils first, then fuel pressure under load, mixture, compression',
        ],
        quiz: [
          {
            q: 'A propane standby set runs perfectly in mild weather but stumbles and dies under full load on the coldest nights. The classic cause is:',
            a: ['Ignition coils failing when cold', 'The LP tank cannot vaporize fuel fast enough — cold slows boil-off and full load demands maximum vapor', 'Thickened oil', 'The block heater'],
            correct: 1,
            exp: 'Vapor-withdrawal LP systems depend on tank heat to boil liquid. Cold + high demand exceeds vaporization capacity: pressure collapses under load precisely when the generator is needed most. Tank sizing is the fix.',
          },
          {
            q: 'A natural gas generator misfires and runs rough. The most common first find is:',
            a: ['A failed governor', 'Fouled/worn spark plugs or a weak coil', 'Water in the fuel', 'A slipped timing belt'],
            correct: 1,
            exp: 'Spark-ignition engines live and die by their ignition components. Plugs and coils dominate gaseous-engine rough-running calls — scheduled plug service prevents most of them.',
          },
        ],
      },
      {
        title: 'Fuel Trains, Verification, and Bi-Fuel',
        body: [
          'The gaseous fuel train is a safety chain you verify end to end: supply valve open (with the same seismic/emergency valves some jurisdictions require), primary regulator delivering spec pressure TO the secondary/engine regulator, fuel solenoid opening on crank (listen/feel for the clunk; verify coil voltage during crank — a solenoid that never opens is a perfect no-start with perfect everything else), and mixer/metering delivering the right air-fuel ratio. Measure pressures WITH THE ENGINE CRANKING/RUNNING — static pressure proves nothing about flow capacity; a failing regulator holds static and collapses under demand exactly like the weak thermopile of your gas training.',
          'Pipe sizing haunts gaseous generators: a generator is often the largest gas appliance on the property by far, and a unit tee\'d onto an existing line without a sizing calculation starves at load — showing as clean starts, rough full-load running, and pressure collapsing on the manometer as load rises. New installs and "it never ran right since day one" complaints both start with the pipe-size question (and the meter capacity behind it).',
          'Emissions and governors: gaseous industrial engines often run closed-loop mixture control with oxygen sensors and catalysts in regulated areas — the automotive analogy is direct, and so is the diagnostic thinking (a lying O2 sensor drives mixture insane). Governing is electronic throttle-body on most modern units: the same speed/frequency law as diesel (module 14) with a throttle plate instead of a fuel rack.',
          'BI-FUEL and DUAL-FUEL round out the fuel story: bi-fuel diesels aspirate natural gas to displace a majority of diesel consumption (extending on-site fuel autonomy for data centers), switching seamlessly back to full diesel if gas is lost; dedicated dual-fuel spark engines switch between NG and LP with regulator/orifice provisions per fuel — your kitchen conversion lesson at engine scale: fuels are never interchangeable without the configured hardware.',
        ],
        keyPoints: [
          'Verify pressures cranking/running — static readings hide flow-starved regulators and pipes',
          'The fuel solenoid must prove open on crank: a silent solenoid is the perfect gaseous no-start',
          'Generators are usually the biggest gas appliance on site: pipe/meter sizing causes full-load starvation',
          'Bi-fuel diesels displace diesel with NG and revert seamlessly; fuels are never swapped without configuration',
        ],
        quiz: [
          {
            q: 'A natural gas generator starts and idles perfectly but stumbles at 70% load; the manometer shows supply pressure collapsing as load rises. The investigation is:',
            a: ['Ignition timing', 'Gas piping/meter capacity and regulator flow — the supply starves under demand', 'The alternator', 'Valve adjustment'],
            correct: 1,
            exp: 'Pressure that collapses with flow is a delivery-capacity problem: undersized pipe, an inadequate meter, or a failing regulator. Static readings would have shown "perfect."',
          },
          {
            q: 'A gaseous engine cranks endlessly with strong spark and good static gas pressure but never fires. The component to verify during crank is:',
            a: ['The starter', 'The fuel shutoff solenoid — coil voltage present and the valve actually opening', 'The battery charger', 'The air filter'],
            correct: 1,
            exp: 'Everything looks perfect until you check whether fuel is actually admitted during crank. The solenoid (or its control signal) is the silent-no-start classic.',
          },
        ],
      },
    ],
    test: [
      { q: 'Gaseous generator engines use spark ignition because:', a: ['It is cheaper', 'Gaseous fuels will not compression-ignite reliably', 'Spark is more efficient', 'Diesel injectors clog on gas'], correct: 1, exp: 'Gas needs a spark: lower compression, plugs, and coils replace the diesel\'s compression ignition.' },
      { q: 'The chief operational advantage of natural gas standby power is:', a: ['More power per displacement', 'No on-site fuel storage, spoilage, or delivery dependence — the utility is the tank', 'Quieter exhaust', 'No maintenance'], correct: 1, exp: 'Grid-fed fuel eliminates the storage/quality battles of diesel — with grid dependence as the tradeoff.' },
      { q: 'An LP vapor-withdrawal system in severe cold risks:', a: ['Fuel freezing solid', 'Vaporization starvation: the tank cannot boil off vapor fast enough for full load', 'Regulator icing only', 'Nothing — cold aids LP'], correct: 1, exp: 'Boil-off depends on tank heat; cold plus full demand collapses vapor pressure — tank sizing is the fix.' },
      { q: 'Gaseous fuel pressures must be verified:', a: ['Static, engine off', 'With the engine cranking/running — under actual flow demand', 'Only at the meter', 'Annually'], correct: 1, exp: 'Static hides everything: regulators, pipes, and meters that starve under flow read perfect at rest.' },
      { q: 'The most common cause of gaseous-engine rough running is:', a: ['Governor drift', 'Ignition components: fouled plugs and weak coils', 'Bad batteries', 'Exhaust leaks'], correct: 1, exp: 'Spark-ignition engines misfire through their plugs and coils first — scheduled plug service is the preventive.' },
      { q: 'A generator tee\'d onto existing gas piping without sizing calculations classically shows:', a: ['Immediate failure to crank', 'Clean starts but starvation at load — the largest appliance on an unsized line', 'High oil pressure', 'Overspeed trips'], correct: 1, exp: 'Standby gensets dwarf other gas appliances; unsized pipe feeds an idle but starves a loaded engine.' },
      { q: 'The fuel shutoff solenoid on a gaseous engine:', a: ['Opens on crank as part of the safety chain — and its silent failure is a perfect no-start', 'Stays open permanently', 'Only closes on overspeed', 'Is optional'], correct: 0, exp: 'Energized-to-open on crank/run: verify voltage AND actual opening when chasing gaseous no-starts.' },
      { q: 'Bi-fuel diesel systems:', a: ['Mix gasoline with diesel', 'Displace much of the diesel with natural gas and revert seamlessly to full diesel if gas is lost', 'Alternate daily between fuels', 'Require dual alternators'], correct: 1, exp: 'NG aspiration extends on-site diesel autonomy (data center favorite) with automatic full-diesel fallback.' },
      { q: 'Converting a gaseous engine between NG and LP requires:', a: ['Nothing — they interchange', 'Configured regulator/orifice/mixture hardware per fuel — never a straight swap', 'Only a software setting', 'A new alternator'], correct: 1, exp: 'The kitchen conversion rule at engine scale: pressures and energy density differ; hardware must match the fuel.' },
      { q: 'Gas-leak discipline on generator fuel trains is:', a: ['Relaxed outdoors', 'Identical to all gas work: every disturbed fitting leak-tested before leaving', 'Only for indoor units', 'The utility\'s job'], correct: 1, exp: 'The fuel train is a gas train. Bubble/detector testing of everything touched is non-negotiable, enclosure or open pad.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 16 — COOLING, LUBRICATION & BLOCK HEATERS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gen-cooling-lubrication',
    num: 16,
    title: 'Cooling, Lubrication & Block Heaters',
    desc: 'Radiators, coolant chemistry, oil systems, and the fluids walkaround — where most preventable engine failures are prevented.',
    slides: [
      {
        title: 'Cooling Systems',
        body: [
          'A generator engine converts roughly a third of its fuel to electricity and must reject comparable energy as heat — the cooling system is doing industrial work every loaded minute. The standard architecture: engine-driven water pump circulates coolant through the block and head, a THERMOSTAT holds operating temperature (typically 180-200°F) by modulating flow to the RADIATOR, where an engine-driven fan (unit-mounted sets) pulls massive airflow through the core. Larger installations use REMOTE RADIATORS with electric fans, or heat exchangers to building water.',
          'Overheat diagnosis follows the flow: COOLANT (level first — and find where it went: puddles, hoses, radiator seep, or internally into oil/exhaust), AIRFLOW (radiator core blocked by debris/cottonwood — the kitchen condenser story with a diesel behind it; fan belts, fan clutch, missing shrouds — a lost shroud can cost a third of airflow), THERMOSTAT (stuck closed = fast overheat; stuck open = never reaches temp, which wet-stacks diesels — module 17), WATER PUMP (weep-hole drips, bearing wobble), and finally internal causes (scale in the jacket, combustion gas leaking into coolant — bubbles in the expansion tank, hydrocarbon test strips).',
          'ENCLOSURE AIRFLOW is the generator-specific trap: sound-attenuated enclosures and generator rooms must move enormous air — intake louvers, exhaust discharge, and recirculation matter as much as the radiator itself. A generator that overheats only at full load on hot days with a clean radiator often has an enclosure problem: blocked louvers, failed motorized damper actuators (they must PROVE open — some controllers interlock on them), or discharge air short-circuiting back to intake.',
          'Never open a hot pressurized cooling system: the pressure cap raises the boiling point, and opening it flashes superheated coolant to steam in your face — the fryer-oil rule of this trade. Cool first, crack the cap staged, and treat pressure caps as testable components (a weak cap lowers boiling point and causes mystery boil-overs).',
        ],
        keyPoints: [
          'Overheat interrogation: coolant level/whereabouts → airflow (core, belts, shroud) → thermostat → pump → internal',
          'Enclosure airflow is half the cooling system: louvers, damper proving, recirculation',
          'Stuck-open thermostats under-temp the engine and cause wet stacking',
          'Never open a hot pressurized system — steam-flash burns; test pressure caps as components',
        ],
        quiz: [
          {
            q: 'A generator in a sound enclosure overheats only during full-load summer tests; the radiator core is clean and coolant perfect. The generator-specific suspect is:',
            a: ['The oil cooler', 'Enclosure airflow: blocked louvers, failed damper actuators, or hot discharge air recirculating to intake', 'The thermostat', 'The block heater'],
            correct: 1,
            exp: 'The enclosure is part of the cooling system. Full-load-hot-day-only overheats with clean cores point at the box, its louvers, and recirculation — not the engine.',
          },
          {
            q: 'A missing fan shroud on a unit-mounted radiator causes:',
            a: ['Cosmetic issues only', 'A major loss of effective airflow through the core — the fan recirculates around itself instead of pulling through', 'Higher oil pressure', 'Faster warm-up'],
            correct: 1,
            exp: 'The shroud forces the fan to draw through the core. Without it, air short-circuits around the blade tips — a third of the cooling gone with nothing "broken."',
          },
        ],
      },
      {
        title: 'Coolant Chemistry and Lubrication',
        body: [
          'Diesel coolant is chemistry, not just antifreeze: the 50/50 ethylene-glycol mix sets freeze/boil protection (verify with refractometer), but heavy-duty diesels additionally require SCA/DCA supplemental additives (or modern extended-life OAT coolants) to prevent LINER CAVITATION — wet cylinder liners vibrate microscopically, imploding bubbles that pit through the liner into the crankcase over years. Test strips measure additive concentration; dosing per results is real PM, and mixing coolant families (conventional/OAT) degrades both. A pitted-through liner is a catastrophic, entirely chemistry-preventable failure.',
          'Lubrication carries the load: oil circulates from pan through pump, filters, coolers, to bearings and the valvetrain. The service canon: correct spec oil (API/OEM diesel ratings; viscosity per climate), filters at interval, and the pressure vital-sign (immediate at start, stable when hot; falling hot-idle pressure trends bearing wear). Module 14\'s oil-analysis bloodwork rides on this system, and the dipstick literacy repeats: milky = coolant, fuel-thin with diesel smell = injector dilution (also washes cylinders), rising level = something entering (fuel or coolant), black is normal for diesel (soot) — condition beats color.',
          'Standby-specific wear rules differ from trucks: hours are low but calendar time and idling are high. Oil and coolant age chemically even unused (acids accumulate, additives deplete), so change intervals run on months as well as hours; and light-load running (module 17\'s wet stacking) glazes cylinders and dilutes oil. The annual full-service — oil, filters (oil/fuel/air), coolant test/dose, belts/hoses — is the fleet standard NFPA 110 formalizes.',
          'Block heaters (module 13 introduced them as readiness) live in this system: they heat JACKET WATER, so a low coolant level can expose and burn the element, thermosiphon or pump loops must stay unobstructed, and heater hoses fail like all hoses but with 24/7 duty. The PM touch: upper heater hose warm with a gradient across the loop, amp draw per rating, and hoses/clamps inspected — the one-minute check that protects the 10-second start.',
        ],
        keyPoints: [
          'Diesel coolant needs SCA/DCA (or OAT) against liner cavitation — test strips and dosing are real PM',
          'Oil pressure is the vital sign; oil condition (milky/fuel-thin) and analysis are the bloodwork',
          'Standby fluids age on calendar time, not just hours — annual service regardless of usage',
          'Block heaters: warm-hose touch test, amp draw, hoses/clamps — protects the 10-second start',
        ],
        quiz: [
          {
            q: 'A heavy-duty diesel developed coolant in its oil; teardown shows cylinder liners pitted through from the coolant side. The prevention this site skipped was:',
            a: ['Oil changes', 'Coolant additive (SCA/DCA) testing and dosing — liner cavitation is chemistry-preventable', 'Air filter service', 'Valve adjustments'],
            correct: 1,
            exp: 'Wet-liner cavitation implodes bubbles against the liner wall for years until it pits through. The additive package prevents it; the test strip proves the package.',
          },
          {
            q: 'A standby generator ran only 40 hours this year. Its oil and coolant:',
            a: ['Are fine until 250 hours', 'Still require annual service — fluids degrade chemically on calendar time, and standby duty is hard on them', 'Never need changing', 'Only need topping off'],
            correct: 1,
            exp: 'Acids, moisture, and additive depletion accumulate in a sitting engine. Standby PM runs on months AND hours — whichever comes first.',
          },
        ],
      },
    ],
    test: [
      { q: 'Diesel engine operating temperature is typically held at:', a: ['120-140°F', '180-200°F by the thermostat', '250-280°F', 'Whatever ambient allows'], correct: 1, exp: 'The thermostat modulates radiator flow to hold design temperature — too cool is as harmful as too hot.' },
      { q: 'The overheat interrogation begins with:', a: ['Replacing the thermostat', 'Coolant level — and finding where the missing coolant went', 'A new radiator cap', 'Retarding the timing'], correct: 1, exp: 'Level first, then the leak hunt: external (hoses, seep) or internal (oil, exhaust) — the answer directs everything after.' },
      { q: 'A thermostat stuck OPEN causes:', a: ['Rapid overheating', 'An engine that never reaches temperature — inviting wet stacking on diesels', 'Higher oil pressure', 'No effect'], correct: 1, exp: 'Under-temperature running is a real fault: incomplete combustion, slobber, and glazing follow.' },
      { q: 'Generator enclosures affect cooling because:', a: ['They only reduce noise', 'Intake louvers, damper proving, and recirculation govern the air the radiator gets', 'They trap fuel vapors', 'They shade the radiator'], correct: 1, exp: 'The box is part of the cooling circuit: blocked or unproven dampers overheat clean engines at load.' },
      { q: 'Opening a hot pressurized cooling system risks:', a: ['Coolant dilution', 'Superheated coolant flashing to steam — severe burns', 'Air locks only', 'Thermostat damage'], correct: 1, exp: 'The cap holds boiling point above 212°F; releasing pressure flashes it instantly. Cool first, stage the cap.' },
      { q: 'SCA/DCA additives in heavy-duty diesel coolant prevent:', a: ['Freezing', 'Wet-liner cavitation pitting', 'Radiator scale', 'Hose swelling'], correct: 1, exp: 'The additive film protects vibrating liners from bubble implosion — tested by strips, dosed by results.' },
      { q: 'Milky oil on the dipstick means:', a: ['Normal soot', 'Coolant is entering the oil — investigate before running', 'Fuel dilution', 'Overfill'], correct: 1, exp: 'Emulsified coolant in oil = internal breach (gasket, cooler). Running on it destroys bearings.' },
      { q: 'Standby generator oil intervals run on:', a: ['Hours only', 'Months AND hours — fluids age chemically while sitting', 'Fuel consumption', 'Load factor only'], correct: 1, exp: 'Calendar-based annual service is the standby rule; low hours never excuse old fluids.' },
      { q: 'Falling hot-idle oil pressure over months of readings suggests:', a: ['Better break-in', 'Bearing wear trending — oil analysis and planning beat waiting for the shutdown', 'A failing sender only', 'Overcooled oil'], correct: 1, exp: 'The trend is the message (verify sender with a gauge): pressure erosion at hot idle is classic wear evidence.' },
      { q: 'The block heater PM check consists of:', a: ['Replacing it annually', 'Warm-hose touch test, amp draw against rating, hose/clamp inspection', 'Megger testing monthly', 'Nothing — they are sealed'], correct: 1, exp: 'One minute per visit protects the 10-second start: heat present, current right, hoses sound.' },
    ],
  },
];
