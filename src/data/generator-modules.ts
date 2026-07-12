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

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 17 — DIESEL FUEL SYSTEMS, STORAGE & QUALITY
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gen-fuel-systems',
    num: 17,
    title: 'Diesel Fuel Systems, Storage & Quality',
    desc: 'Tanks, day tanks, transfer pumps, fuel polishing, diesel bug, and wet stacking — the fuel problems that quietly kill standby reliability.',
    slides: [
      {
        title: 'The Fuel Path',
        body: [
          'Diesel gets from storage to cylinder through a path you must know cold: MAIN TANK (sub-base under the unit, above-ground outside, or underground) → transfer pump (if remote) → DAY TANK (a smaller local tank keeping engine-ready fuel at the right head, with its own level controls and pumps on bigger installs) → primary filter/water separator → engine lift pump → secondary filters → injection system → and RETURN lines carrying hot excess fuel back (diesels return significant fuel — which warms and stirs the tank).',
          'Injection has generations: mechanical inline/rotary pumps with mechanical injectors (older sets — timed, rugged, rebuildable), electronic unit injectors, and COMMON RAIL (a high-pressure rail feeding electronically fired injectors at tens of thousands of psi — precise, quiet, and utterly intolerant of dirty fuel or amateur line-opening: rail pressures maim; respect published procedures absolutely).',
          'Air is the fuel path\'s classic saboteur: suction-side leaks (fittings, filter seals, day-tank pickups) admit air that shows as hard starting, hunting (module 14), stumbling under load, and dying after running — with NO visible fuel leak, because the leak is on the vacuum side. Cracking lines to check for foam, pressurizing the suction side, or clear-hose inspection finds them. After any filter change or run-out, bleeding/priming per the engine\'s procedure is the difference between a start and an hour of cranking.',
          'Filters and separators earn their keep in dirty-fuel reality: primary separators spin/settle water out (drain the bowl on the walkaround — water in the bowl is a message about the tank), secondaries protect injection at fine microns, and vacuum/restriction gauges across filters tell you when they are loading before the engine stumbles. A generator that runs clean at idle and starves at load with a healthy tank often has just this: loaded filters flowing enough for idle, not for demand.',
        ],
        keyPoints: [
          'Know the path: main tank → transfer → day tank → separator → lift pump → filters → injection → return',
          'Common rail = extreme pressure: dirty fuel intolerance and published-procedure-only line work',
          'Suction-side air leaks cause hard starts/hunting/stall with no visible leak — hunt the vacuum side',
          'Water in the separator bowl is a tank-condition message; restriction gauges predict filter starvation',
        ],
        quiz: [
          {
            q: 'A generator starts hard, hunts at load, and dies minutes after each run; no fuel leaks are visible anywhere. The classic cause is:',
            a: ['A failing injection pump', 'An air leak on the suction side of the fuel system — air enters where fuel does not exit', 'Water in the fuel', 'A clogged return line'],
            correct: 1,
            exp: 'Vacuum-side leaks admit air invisibly. Foam in cracked lines or clear-hose inspection finds what no drip ever will — the classic hunting/stall root cause.',
          },
          {
            q: 'A set idles perfectly but loses power and smokes at load; fuel filters have never been changed and the restriction gauge reads deep in the red. The mechanism is:',
            a: ['Bad injectors', 'Loaded filters that pass idle flow but starve full-load demand', 'Weak batteries', 'Governor drift'],
            correct: 1,
            exp: 'Filters fail progressively: idle\'s trickle passes, load\'s torrent does not. The restriction gauge is the early warning the PM should have read.',
          },
        ],
      },
      {
        title: 'Fuel Quality: The Silent Reliability Killer',
        body: [
          'Standby diesel has a storage problem trucks never face: the fuel SITS — for months or years — and diesel degrades. The threat list: WATER (condensation breathes into tanks through vents daily; water sinks, corrodes, feeds biology, and destroys common-rail systems), MICROBIAL GROWTH ("diesel bug" — bacteria and fungi living at the fuel/water interface, forming slime mats that slough off and kill filters in hours, classically discovered during an extended outage when the tank gets stirred and drawn down), OXIDATION/AGING (gums and darkening — modern ULSD ages faster than old diesel did), and CONTAMINATION from deliveries.',
          'The defense program: keep tanks FULL (less air space = less condensation breathing), TEST fuel annually or better on critical sites (lab samples pulled from the tank BOTTOM where water and bug live — clean top samples lie), TREAT with biocide when growth appears (and expect the die-off to load filters — plan the filter changes), and POLISH: fuel-polishing systems circulate tank contents through filtration/water separation, portable rigs as a service or permanent systems on critical sites. Polishing plus testing is a legitimate, recurring service line — data centers buy it the way kitchens buy hood cleaning.',
          'The catastrophic pattern to burn into memory: a site\'s generator runs its monthly 30-minute tests for years on the clean upper fuel, then a real 3-day outage draws the tank down, stirs the bottom, and the accumulated water/bug sludge hits the filters six hours in — the generator dies mid-outage with "no warning." Bottom-sampling, polishing, and honest tank assessments exist to prevent exactly this story, and it is the story that sells them.',
          'Storage compliance basics ride along: containment (double-wall tanks or dikes), leak monitoring on regulated tanks, venting, spill provisions at fills, and fuel gauging that actually works (stick the tank when gauges matter — electronic senders fail like all senders). Know your jurisdiction\'s lines: tank INSTALLATION and major repairs are licensed specialty work; monitoring, sampling, polishing coordination, and documentation are squarely yours.',
        ],
        keyPoints: [
          'Diesel bug lives at the fuel/water interface and kills filters when a REAL outage stirs the tank',
          'Sample from the tank bottom — clean top samples lie; keep tanks full against condensation',
          'Biocide treatment sheds debris: plan filter changes behind it; polishing is a recurring service line',
          'Tank install/repair is licensed territory; sampling, polishing, and documentation are yours',
        ],
        quiz: [
          {
            q: 'A generator passed every monthly 30-minute test for three years, then died six hours into a real outage with filters full of black slime. The mechanism was:',
            a: ['Coincidental injector failure', 'Diesel bug and water accumulated at the tank bottom — short tests never drew deep or stirred the tank; the real outage did', 'Sabotage', 'Fuel gelling'],
            correct: 1,
            exp: 'The classic standby tragedy: clean-top-fuel tests pass while the bottom builds sludge. Bottom sampling and polishing programs exist because of exactly this story.',
          },
          {
            q: 'Standby fuel tanks are kept as full as practical because:',
            a: ['Fuel is cheaper in bulk', 'Less air space means less daily condensation breathing — less water, less bug habitat', 'Full tanks stabilize the unit', 'Regulations require it'],
            correct: 1,
            exp: 'Tanks inhale humid air as they cool each night; the condensation becomes the water layer the bug lives on. Full tanks breathe less.',
          },
        ],
      },
      {
        title: 'Wet Stacking and Load Discipline',
        body: [
          'Diesels are built to work, and standby diesels mostly do not — which creates their signature disease: WET STACKING. Running at light load (rule of thumb: chronically below ~30% of rating), a diesel never reaches full combustion temperatures; unburned fuel and soot accumulate in the exhaust — cylinders glaze, injectors carbon up, and the stack literally drips wet black residue ("slobber"). Left chronic, power capability degrades and the engine that tests fine at idle cannot carry its rated load when the real outage demands it.',
          'The signs on the walkaround: black oily residue weeping from exhaust joints, excessive black smoke when load finally is applied, and a history of no-load or light-load-only exercise. The cure is heat and work: run the unit under substantial load (manufacturers commonly prescribe operating at ≥30% for exercise, and burn-off runs at higher loads to clean an already-slobbered engine — sustained loaded running that brings exhaust temps up and burns the deposits out).',
          'This is why LOAD MATTERS in testing (module 23 formalizes it): a generator exercised weekly at no load is being maintained INTO failure. Building-load tests use the facility itself; when the building cannot supply enough (or transfer is unacceptable), a LOAD BANK — a portable or permanent resistive (or resistive/reactive) load — provides the work. Load banking is simultaneously a compliance test, a wet-stacking cure, and the only honest proof the set can carry its nameplate.',
          'Fuel consumption literacy rounds out the module: a loaded diesel burns roughly 7 gallons per hour per 100 kW (very rough field number) — so tank sizing translates to runtime (a 500-gallon tank on a 150 kW set at full load ≈ two days), day tanks buffer hours not days, and refueling logistics during extended outages are part of the emergency plan you help customers think through. The tech who can talk runtime, fuel testing, and load discipline is talking resilience — the language the customer\'s boss speaks.',
        ],
        keyPoints: [
          'Chronic light-load running wet-stacks diesels: glazing, carbon, slobber, lost capability',
          'Exercise under real load (≥~30%); burn-off runs cure slobbered engines',
          'No-load weekly exercise is maintenance INTO failure — load banks provide honest work',
          'Runtime math: ~7 gal/hr per 100 kW loaded; tank size = outage endurance',
        ],
        quiz: [
          {
            q: 'A generator exercised weekly at no load for years shows black oily residue weeping from exhaust joints and smokes heavily when loaded. The condition and cure are:',
            a: ['Failed turbo seals; replace the turbo', 'Wet stacking from chronic light load; sustained loaded running (load bank burn-off) to restore it', 'Overfueling; replace injectors', 'Normal diesel behavior'],
            correct: 1,
            exp: 'Slobber is unburned fuel and soot from an engine never worked hot. The cure is the work it was denied — loaded burn-off runs, then a corrected exercise program.',
          },
          {
            q: 'A hospital asks how long their 500-gallon tank runs a 250 kW generator at full load. The field estimate is roughly:',
            a: ['A week', 'About 28 hours (≈17.5 gal/hr at 250 kW)', 'Four days', 'Two hours'],
            correct: 1,
            exp: '~7 gal/hr per 100 kW → ~17.5 gal/hr at 250 kW → 500 ÷ 17.5 ≈ 28-29 hours. Runtime math turns tanks into honest emergency-planning numbers.',
          },
        ],
      },
    ],
    test: [
      { q: 'A day tank exists to:', a: ['Store a month of fuel', 'Keep engine-ready fuel local at proper head, fed from main storage', 'Cool the return fuel', 'Meet EPA rules only'], correct: 1, exp: 'The day tank buffers the engine from remote main storage with its own level controls and pumps.' },
      { q: 'Common-rail injection systems demand:', a: ['Nothing special', 'Extremely clean fuel and published-procedure-only work — rail pressures are dangerous', 'Weekly bleeding', 'Leaded fuel'], correct: 1, exp: 'Tens of thousands of psi: contamination destroys it and careless line-opening injures people.' },
      { q: 'Suction-side air leaks present as:', a: ['Visible drips', 'Hard starts, hunting, stall-after-running — with no visible leak', 'High fuel pressure', 'White smoke only'], correct: 1, exp: 'Air enters where fuel does not exit; the vacuum side leaks invisibly and corrupts delivery.' },
      { q: 'Water found in the separator bowl means:', a: ['Normal condensation to ignore', 'The tank has water — investigate and address the source, not just the bowl', 'Bad fuel delivery only', 'A failed lift pump'], correct: 1, exp: 'The bowl is the messenger: tank water feeds corrosion and diesel bug until removed.' },
      { q: '"Diesel bug" is:', a: ['A fuel additive', 'Microbial growth at the fuel/water interface whose slime kills filters', 'Injector wear', 'Cold-weather gelling'], correct: 1, exp: 'Bacteria/fungi mats slough off and plug filtration — classically during the real outage that stirs the tank.' },
      { q: 'Fuel samples for quality testing are pulled from:', a: ['The filler neck', 'The tank BOTTOM, where water and growth live', 'The return line', 'The day tank top'], correct: 1, exp: 'Top fuel lies. The bottom sample tells the truth about water, bug, and sediment.' },
      { q: 'After biocide treatment of an infected tank, expect:', a: ['Immediate clean fuel', 'Die-off debris loading filters — schedule changes behind the treatment', 'Higher fuel pressure', 'No further action ever'], correct: 1, exp: 'Killing the mat sheds it into the fuel; polishing and staged filter changes complete the cure.' },
      { q: 'Wet stacking is caused by:', a: ['Overloading', 'Chronic light-load running that never reaches full combustion temperature', 'Water in fuel', 'Cold coolant only'], correct: 1, exp: 'Unburned fuel and soot accumulate in an under-worked diesel: glazing, carbon, slobber, lost capacity.' },
      { q: 'The honest proof a generator can carry nameplate load is:', a: ['A clean no-load run', 'A load bank (or real building load) test at substantial load', 'New filters', 'A strong crank'], correct: 1, exp: 'Only work proves capability — and the same loaded running cures and prevents wet stacking.' },
      { q: 'A loaded diesel burns roughly:', a: ['1 gal/hr per 100 kW', '7 gal/hr per 100 kW', '20 gal/hr per 100 kW', '0.5 gal/hr per 100 kW'], correct: 1, exp: 'The field number that converts tank gallons into outage endurance for emergency planning.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 18 — ALTERNATORS & VOLTAGE REGULATION
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gen-alternators',
    num: 18,
    title: 'Alternators & Voltage Regulation',
    desc: 'Synchronous alternators, brushless excitation, and AVRs — where engine rotation becomes regulated electrical power.',
    slides: [
      {
        title: 'The Synchronous Alternator',
        body: [
          'The alternator is where the UPS student comes home: a rotating magnetic field (the ROTOR, carrying DC field windings) sweeps past stationary output windings (the STATOR), inducing three-phase AC whose frequency is rotor speed (module 14\'s law) and whose VOLTAGE is set by field strength. Control the field current and you control output voltage — that single sentence is this whole module.',
          'Modern generator alternators are BRUSHLESS: instead of brushes feeding the rotor, a small EXCITER generator rides the same shaft — its stator carries DC from the regulator, its rotor generates AC that a ROTATING RECTIFIER (diodes spinning on the shaft) converts to DC for the main field. No brushes to wear; the price is a diode set spinning at 1800 RPM whose failure is a classic fault (output voltage low and unresponsive — diode testing is a standard alternator procedure). Many sets add a PMG (permanent magnet generator) pilot exciter so the regulator has clean, load-independent supply power.',
          'The AVR (automatic voltage regulator) closes the loop: it senses output voltage and drives exciter field current to hold the setpoint through load swings. AVR literacy: sensing wiring matters (lost sensing = voltage runaway or collapse — some AVRs fail safe, some fail high), adjustment pots/settings (voltage, stability/gain, under-frequency roll-off) are set per book values not by feel, and UNDER-FREQUENCY ROLL-OFF is the clever bit — when the engine lugs below ~57-58 Hz, the AVR deliberately reduces voltage (V/Hz protection) so the engine can recover: sagging voltage during a block load is often the AVR protecting the engine, not failing.',
          'The diagnostic fork from module 14, now completed from the other side: WRONG/UNSTABLE VOLTAGE at correct frequency lives here — AVR, sensing, exciter, rotating diodes, or the windings themselves. NO VOLTAGE at all (a healthy engine spinning a dead stator) has its own short list: AVR failure, loss of residual magnetism (older self-excited sets need FLASHING the field — a controlled procedure applying momentary DC per the manual), rotating diodes, or an open in the excitation chain.',
        ],
        keyPoints: [
          'Field current controls voltage; RPM controls frequency — the two-knob model of the alternator',
          'Brushless = exciter + rotating rectifier: spinning diode failure is the classic low-voltage fault',
          'Under-frequency roll-off deliberately sags voltage to help a lugging engine — protection, not failure',
          'No-voltage short list: AVR, residual magnetism (field flashing), rotating diodes, excitation chain',
        ],
        quiz: [
          {
            q: 'A generator holds exactly 60.0 Hz but outputs only 380V on a 480V system, unresponsive to AVR adjustment. The classic suspect is:',
            a: ['The governor', 'Failed rotating rectifier diodes starving the main field', 'Low fuel pressure', 'The transfer switch'],
            correct: 1,
            exp: 'Perfect frequency clears the engine. Low, unresponsive voltage with a working AVR points down the excitation chain — the spinning diode set is the classic culprit, testable per procedure.',
          },
          {
            q: 'During a large block load, output voltage dips well below setpoint while frequency sags to 57.5 Hz, then both recover together. This behavior is:',
            a: ['A failing AVR', 'Under-frequency roll-off: the AVR reducing voltage on purpose so the lugging engine can recover', 'A shorted stator', 'Governor hunting'],
            correct: 1,
            exp: 'V/Hz protection trades voltage for engine recovery during load steps. Voltage tracking frequency down and back is the signature of the feature, not a fault.',
          },
          {
            q: 'An older self-excited generator that sat for years spins perfectly but produces zero output voltage. The likely first procedure is:',
            a: ['Replace the stator', 'Field flashing — restoring lost residual magnetism per the manufacturer procedure', 'A new governor', 'Rewinding the rotor'],
            correct: 1,
            exp: 'Self-excitation bootstraps from residual magnetism, which long storage can lose. Controlled momentary DC to the field per the book restores it.',
          },
        ],
      },
      {
        title: 'Testing, Connections, and Power Quality',
        body: [
          'Alternator testing is your meter craft on big windings: INSULATION RESISTANCE (megger, windings to ground — moisture is the great enemy of sitting alternators; low readings often recover with drying procedures before anyone condemns a rewind), WINDING RESISTANCE (phase-to-phase should match closely; imbalance suggests shorted turns), DIODE TESTING (each rotating diode forward/reverse with the set stopped), and EXCITER checks per the book. Always with the machine locked out and, on capacitor-fitted systems, discharged — the UPS disciplines apply verbatim.',
          'Reconnectable alternators bring transformer literacy to the pad: twelve-lead machines reconnect for voltages (208/240/480, wye/delta) per the nameplate diagrams — and a "wrong voltage everywhere by the same ratio" complaint on a new install is often a reconnection or sensing-tap error, not a fault. Grounding and bonding per the installation design (separately derived system decisions, neutral switching at the ATS — module 20\'s territory) complete the connection picture.',
          'Generator power quality matters more as loads got electronic: voltage BALANCE between phases (imbalance heats motors — measure all three pairs), WAVEFORM quality (nonlinear UPS/VFD loads distort generator output more than utility because generator source impedance is higher — the reason generator/UPS compatibility engineering exists, module 22), and TRANSIENT RESPONSE (how far voltage/frequency dip and how fast they recover on load steps — specified, testable with a load bank, and the number data centers care about most).',
          'Field wisdom for the fork\'s edge cases: single-phase output loss = one stator winding path or connection (check lugs before condemning windings — a hot, discolored lug is a resistance story you already know); nuisance voltage instability that tracks engine hunting is a GOVERNOR problem arriving dressed as an AVR problem (stabilize frequency first, then judge voltage); and any alternator work beyond diodes/AVR/connections (rewinds, bearing replacement on big machines) is specialty shop territory — diagnose, document, refer.',
        ],
        keyPoints: [
          'Megger sitting alternators before condemning: moisture reads low and often dries out',
          'Twelve-lead reconnection errors masquerade as faults on new installs — verify against the nameplate',
          'Voltage instability that tracks frequency instability is a governor problem in an AVR costume',
          'Diodes, AVR, connections are field scope; rewinds and big-machine internals are the shop\'s',
        ],
        quiz: [
          {
            q: 'A generator\'s output voltage wobbles constantly. Watching the panel, frequency wobbles in exact sympathy. The productive first repair territory is:',
            a: ['The AVR stability pot', 'The engine/governor — stabilize frequency first, then judge the voltage regulation', 'The rotating diodes', 'The stator windings'],
            correct: 1,
            exp: 'Voltage rides frequency through the AVR\'s V/Hz behavior. A hunting governor makes a healthy AVR look unstable — module 14\'s fork applies before any AVR adjustment.',
          },
          {
            q: 'A long-stored generator meggers at 0.5 MΩ windings-to-ground. Before recommending a rewind you should:',
            a: ['Condemn the alternator', 'Apply drying procedures (heat/circulation per the book) and re-test — moisture absorption is common and recoverable', 'Flash the field', 'Bypass the megger test'],
            correct: 1,
            exp: 'Sitting windings absorb moisture; controlled drying often restores insulation readings entirely. Rewinds are condemned only after drying fails.',
          },
        ],
      },
    ],
    test: [
      { q: 'Alternator output voltage is controlled by:', a: ['Engine RPM', 'Field (excitation) current', 'The transfer switch', 'Stator size'], correct: 1, exp: 'RPM sets frequency; field strength sets voltage — the two-knob model.' },
      { q: 'Brushless excitation delivers DC to the main field via:', a: ['Carbon brushes', 'A shaft-mounted exciter and rotating rectifier diodes', 'A battery', 'The AVR directly'], correct: 1, exp: 'The exciter\'s AC is rectified by diodes spinning on the shaft — no brushes, but a testable diode set.' },
      { q: 'Failed rotating diodes classically present as:', a: ['High frequency', 'Low output voltage unresponsive to AVR adjustment at correct frequency', 'Engine hunting', 'No cranking'], correct: 1, exp: 'A starved main field cannot make voltage regardless of AVR effort — the classic excitation-chain fault.' },
      { q: 'A PMG (pilot exciter) provides:', a: ['Engine starting power', 'Clean, load-independent supply power for the voltage regulator', 'Battery charging', 'Frequency sensing'], correct: 1, exp: 'The permanent-magnet pilot keeps the AVR powered regardless of output distortion or load.' },
      { q: 'Under-frequency roll-off causes:', a: ['Voltage collapse faults', 'Deliberate voltage reduction when the engine lugs, aiding recovery', 'Frequency boost', 'Diode failure'], correct: 1, exp: 'V/Hz protection: sagging voltage during block loads is often the feature working, not a defect.' },
      { q: 'Zero output from a healthy-spinning older self-excited set often needs:', a: ['A rewind', 'Field flashing to restore residual magnetism', 'New bearings', 'A bigger AVR'], correct: 1, exp: 'Self-excitation bootstraps from residual magnetism, lost in storage and restored by the controlled flashing procedure.' },
      { q: 'Low megger readings on a stored alternator first warrant:', a: ['Immediate rewind', 'Drying procedures and re-test — moisture is common and recoverable', 'Higher test voltage', 'Ignoring the reading'], correct: 1, exp: 'Moisture absorption dominates storage insulation loss; drying restores most machines.' },
      { q: 'Identical wrong voltage on all phases of a newly installed 12-lead machine suggests:', a: ['Stator failure', 'A reconnection or sensing-tap error against the nameplate diagram', 'Bad fuel', 'Governor miscalibration'], correct: 1, exp: 'Proportionally wrong everywhere = configuration, not damage. Verify the lead connection first.' },
      { q: 'Voltage instability tracking frequency instability is diagnosed as:', a: ['An AVR fault', 'A governor/engine problem — stabilize frequency before judging regulation', 'Diode failure', 'Load imbalance'], correct: 1, exp: 'The AVR follows V/Hz: hunting engines dress up as unstable regulators.' },
      { q: 'Field scope on alternators ends at:', a: ['All internal work', 'Diodes, AVR, connections, testing — rewinds and major internals go to specialty shops', 'Nothing — refer everything', 'Bearing replacement on all machines'], correct: 1, exp: 'Diagnose, document, refer: the boundary discipline of every course, applied to big rotating iron.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 19 — GENERATOR CONTROLLERS, SENSORS & ALARMS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gen-controls',
    num: 19,
    title: 'Generator Controllers, Sensors & Alarms',
    desc: 'The control panel: start sequences, senders, alarm hierarchies, event logs, and remote monitoring of standby assets.',
    slides: [
      {
        title: 'The Controller and Its Sequence',
        body: [
          'The generator controller is the machine\'s brain and witness: it watches utility/remote start signals, runs the start sequence, monitors every sensor, protects the engine and alternator, and records everything. Modern controllers (Deep Sea, ComAp, and the OEM families from Cummins/CAT/Generac/Kohler) are the kitchen-course control boards grown up — and the same discipline applies: inputs first, outputs second, the board itself last.',
          'Master the AUTO start sequence as a stall map, exactly like the furnace: (1) START SIGNAL arrives (ATS contacts closing, remote input, or scheduled exercise). (2) PRE-START: alarms checked, prelube/glow where fitted, fuel solenoid commanded. (3) CRANK: starter engaged for a programmed cycle (e.g., 10s crank / 10s rest × 3 attempts) while the controller watches for DISCONNECT SPEED — the RPM (from the magnetic pickup or alternator frequency) proving the engine fired, at which crank drops out. (4) WARMUP/protection-arming delays (oil pressure must appear within seconds or trip). (5) Ready to load — the ATS or breaker takes over (module 20). (6) On stop: COOLDOWN idle (module 14\'s turbo lesson, programmed), then fuel solenoid drops.',
          'Every no-start interrogation walks that sequence: Did the signal arrive (controller display shows the call)? Did it attempt crank (relay click, starter engagement — module 13\'s chain)? Did it crank but never "see" firing (a failed magnetic pickup makes a RUNNING engine look dead to the controller, which keeps cranking into it or trips overcrank — the classic pickup fault)? Did it fire and immediately trip (the alarm list tells you: oil pressure sender circuit, coolant level, emergency stop)? The controller\'s event log timestamps each step — read it before touching anything.',
          'Sensor literacy inherits from every course: SENDERS (resistive oil pressure/temp senders verified against chart with an ohmmeter, and against reality with mechanical gauges — module 14\'s "senders lie"), SWITCHES (pressure/temp/level — continuity tested, actuated where possible), the MAGNETIC PICKUP (an AC generator counting flywheel teeth: verify output voltage while cranking, gap per spec, and remember its dual role in crank-disconnect AND governor speed sensing on many sets), and wiring in a vibrating, hot, oily environment — chafed harnesses cause more "controller faults" than controllers do.',
        ],
        keyPoints: [
          'Learn the AUTO sequence as a stall map: signal → pre-start → crank → disconnect speed → warmup → load',
          'A failed magnetic pickup makes a running engine invisible: overcrank trips and crank-into-running-engine',
          'Senders verified by ohmmeter AND mechanical gauge; harness chafe outnumbers controller failures',
          'The event log timestamps every step — read the witness before touching the machine',
        ],
        quiz: [
          {
            q: 'A generator cranks, clearly fires and runs — then the starter keeps grinding into the running engine until an overcrank alarm. The classic fault is:',
            a: ['The starter solenoid', 'The magnetic pickup (or its wiring): the controller never saw disconnect speed from an engine it cannot hear', 'The fuel solenoid', 'The oil pressure sender'],
            correct: 1,
            exp: 'Crank disconnect depends on the speed signal. A dead pickup leaves the controller blind to the running engine — the signature is exactly this grinding overlap.',
          },
          {
            q: 'A set starts, runs three seconds, and trips "low oil pressure" every attempt. A mechanical gauge shows 45 psi in those seconds. The fault is:',
            a: ['The oil pump', 'The sender/switch or its circuit — pressure is real but the controller cannot see it', 'The pickup', 'Worn bearings'],
            correct: 1,
            exp: 'Real pressure + trip = a lying sensor circuit. The mechanical-gauge verification (module 14) separates the $20 sender from the $20,000 engine every time.',
          },
        ],
      },
      {
        title: 'Alarms, Logs, and Remote Monitoring',
        body: [
          'Controllers speak in a two-tier hierarchy you must respect: WARNINGS (pre-alarms — high coolant temp approaching, low fuel, charger fail, battery voltage low — the set keeps running while asking for help) and SHUTDOWNS (the module 14 hard trips — the set stops to save itself). The professional rules: every warning gets investigated before it graduates to a shutdown at 2 a.m.; every shutdown gets root-caused before reset (the fryer rule, forever); and NOTHING gets bypassed to "keep it available" — a generator that destroys itself during the outage helped no one.',
          'The EVENT LOG is the finest diagnostic gift in this trade: timestamped starts, stops, alarms, and operating parameters. An intermittent complaint ("it shut down last Tuesday, ran fine since") becomes archaeology: the log shows high coolant temperature climbing over 20 minutes at 40% load on a 95°F afternoon — and you are now diagnosing a specific cooling-capacity event instead of a ghost. Export/photograph logs before clearing anything, and correlate with weather, load, and site events like the kitchen course taught.',
          'Remote monitoring completed the transformation of generator service: controllers ship with (or gain via gateways) connectivity feeding OEM platforms and third-party fleet dashboards — start/stop notifications, alarm push, fuel level, battery voltage, and exercise results across a whole fleet from one screen. For service companies this is triage gold (module 23\'s telemetry lesson): the dead battery charger announces itself weeks before the failed start, IF someone owns the watching. Offering monitored-fleet service — you watch, you dispatch, you document — is the generator trade\'s version of the PM contract engine.',
          'Controller configuration closes the panel: crank cycles, delays, setpoints, exercise schedules (day/time/duration/loaded-or-not — module 23), and communication settings all live in menus behind passwords. The kitchen configuration lesson verbatim: record settings before changes, verify against spec after any controller swap (a replacement controller with default settings is a different machine), and leave the exercise clock set — an un-programmed exerciser silently ends the weekly self-test regime the site thinks it has.',
        ],
        keyPoints: [
          'Warnings run-and-report; shutdowns stop-and-protect: investigate the first, root-cause the second, bypass neither',
          'The event log turns intermittents into archaeology — export before clearing, correlate with load/weather',
          'Remote monitoring = pre-failure triage: the dead charger announces itself weeks early if someone watches',
          'Controller swaps demand configuration verification: defaults make it a different machine',
        ],
        quiz: [
          {
            q: 'A customer reports their generator "randomly shut down last week but is fine now." Your first diagnostic act is:',
            a: ['A test run', 'Reading the controller event log: the timestamped alarm and parameters around the shutdown', 'Replacing the batteries', 'A fuel sample'],
            correct: 1,
            exp: 'The controller witnessed everything: which trip, what the temperatures/pressures were doing, for how long. The log converts the ghost story into a specific event.',
          },
          {
            q: 'After a controller replacement, the generator runs but the weekly exercise never happens and cooldown seems absent. The cause is:',
            a: ['A defective new controller', 'Default configuration — the exercise schedule, delays, and setpoints were never programmed to match the old unit', 'A failed pickup', 'Wrong battery voltage'],
            correct: 1,
            exp: 'The kitchen board lesson at generator scale: a controller is its configuration. Record before, program after, verify against spec.',
          },
        ],
      },
    ],
    test: [
      { q: 'Crank disconnect is triggered by:', a: ['A timer alone', 'The controller sensing firing speed via the magnetic pickup or alternator frequency', 'Oil pressure', 'The operator'], correct: 1, exp: 'The speed signal proves the engine fired; crank drops out at disconnect RPM.' },
      { q: 'A typical automatic crank cycle is:', a: ['Continuous until start', 'Programmed bursts with rests (e.g., 10s crank / 10s rest × 3) then overcrank lockout', 'One 60-second attempt', 'Two seconds maximum'], correct: 1, exp: 'Cycled cranking protects the starter and batteries; overcrank stops a hopeless no-start.' },
      { q: 'Oil pressure must appear within seconds of firing or:', a: ['A warning logs', 'The controller trips the engine — the never-bypassed protection', 'The AVR reduces voltage', 'Cooldown begins'], correct: 1, exp: 'Bearings die in seconds unlubricated; the arming delay expires and the trip is absolute.' },
      { q: 'Warnings differ from shutdowns because warnings:', a: ['Stop the engine gently', 'Keep the set running while flagging developing problems for investigation', 'Clear themselves', 'Only occur off-line'], correct: 1, exp: 'The two-tier hierarchy: pre-alarms ask for help; shutdowns take it. Both get investigated.' },
      { q: 'A failed magnetic pickup can cause:', a: ['Low oil pressure', 'Overcrank trips and cranking into a running engine — plus governor chaos where it feeds speed control', 'High coolant temp', 'AVR failure'], correct: 1, exp: 'Blind to speed, the controller cannot disconnect crank; where the governor shares the signal, speed control corrupts too.' },
      { q: 'Resistive senders are verified by:', a: ['Visual inspection', 'Ohmmeter against the resistance chart AND a mechanical gauge against reality', 'Replacement on schedule', 'The controller display'], correct: 1, exp: 'Two-source truth: the chart proves the sender, the gauge proves the engine — senders lie in both directions.' },
      { q: 'More "controller faults" are actually caused by:', a: ['Firmware bugs', 'Chafed, vibration-damaged wiring harnesses in the hot oily engine environment', 'Operator error', 'Lightning'], correct: 1, exp: 'The harness lives hard; the controls lesson of every course — wiring before boards.' },
      { q: 'Before clearing a controller event log you should:', a: ['Nothing — clear freely', 'Export or photograph it — the timestamped history is diagnostic archaeology', 'Reset all alarms twice', 'Disconnect the battery'], correct: 1, exp: 'The log is the witness statement for every intermittent; preserve it before anything erases it.' },
      { q: 'Remote monitoring platforms earn their keep by:', a: ['Replacing PMs', 'Announcing developing failures (charger loss, battery decline, failed exercises) before the outage finds them', 'Starting generators remotely for fun', 'Reducing fuel use'], correct: 1, exp: 'Watched fleets fail rarely: the monitoring + dispatch + documentation loop is the generator PM engine.' },
      { q: 'An un-programmed exercise schedule after controller work means:', a: ['Nothing — exercise is optional', 'The weekly self-test regime silently ended — verify and restore the schedule', 'Better fuel economy', 'The ATS takes over exercising'], correct: 1, exp: 'Sites believe the exerciser is running; a defaulted controller quietly stopped it. Verify configuration after every swap.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 20 — AUTOMATIC TRANSFER SWITCHES
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gen-ats',
    num: 20,
    title: 'Automatic Transfer Switches',
    desc: 'The ATS: sensing the outage, starting the generator, and moving the load — with two live sources in one cabinet.',
    slides: [
      {
        title: 'Anatomy and the Transfer Sequence',
        body: [
          'The automatic transfer switch is the decision-maker of standby power: it watches utility power, commands the generator when utility fails, moves the load, and moves it back — automatically, in the middle of the night, with nobody there. Anatomy: UTILITY (normal) source lugs, GENERATOR (emergency) source lugs, LOAD lugs, a mechanically interlocked transfer mechanism (the two sources must never connect to each other), voltage/frequency sensing on both sources, a controller with its timers, and the engine-start contacts wired to module 19\'s controller.',
          'The sequence, end to end: (1) Utility fails/degrades below setpoints. (2) TIME DELAY ENGINE START (typically 1-3 seconds — riding through blinks so the generator does not start for every flicker). (3) Engine-start contacts close; the generator starts (module 13-19\'s whole story). (4) The ATS watches the generator side; when voltage AND frequency are acceptable (module 18-14), (5) TRANSFER to emergency after its delay. (6) Utility returns: RETRANSFER DELAY (typically many minutes — proving utility stability before giving the load back). (7) Retransfer, then (8) ENGINE COOLDOWN run, unloaded, then stop. Every timer exists for a reason, and knowing the reasons lets you read a site\'s behavior.',
          'Transfer TYPES answer the question "what happens to the load mid-move": OPEN TRANSITION (break-before-make — the standard; the load blinks momentarily on each transfer), DELAYED TRANSITION (open, pause in neutral, then close — the pause lets motor fields decay so big motors are not slammed with out-of-phase power; elevator and pump sites love it), and CLOSED TRANSITION (make-before-break — a momentary sub-cycle parallel of utility and generator so the load never blinks; requires sync-check supervision and utility blessing, and drags module 21\'s paralleling physics into the ATS cabinet).',
          'The service rhythm: exercise clocks (the ATS often runs the weekly generator exercise, loaded or unloaded — verify the schedule exists and matches intent, module 19\'s lesson), contact inspection per manufacturer intervals (transfer contacts carry full building current and erode), mechanism lubrication, sensing calibration, and control-wiring integrity between ATS and generator (the engine-start pair is the most important two wires on the site: many "generator failed to start" outages were actually these wires or their connections failing to deliver the command).',
        ],
        keyPoints: [
          'Learn the timer chain: start delay (ride-through) → generator acceptable → transfer → retransfer delay → cooldown',
          'Open transition blinks; delayed transition protects big motors; closed transition never blinks but parallels sources',
          'The engine-start wire pair is the site\'s most critical circuit — many "generator failures" are its failures',
          'Exercise clocks, contact wear, and sensing calibration are the ATS service rhythm',
        ],
        quiz: [
          {
            q: 'During an outage the generator started and ran perfectly at the pad, but the building stayed dark; the ATS never transferred. The generator-side voltage at the ATS sensing terminals reads correct. The suspect territory is:',
            a: ['The alternator', 'The ATS itself: its acceptability sensing/settings, transfer timer, or the transfer mechanism/controller', 'The engine governor', 'The utility'],
            correct: 1,
            exp: 'Good power delivered to a switch that never moved: the decision-maker is the fault. Sensing setpoints, timers, and mechanism are the interrogation — with two live sources demanding full safety discipline.',
          },
          {
            q: 'A pump station\'s motors slam violently on every retransfer with an open-transition ATS. The engineered fix is:',
            a: ['Faster transfer', 'Delayed-transition transfer — the neutral pause lets motor fields decay before reconnection', 'Bigger motors', 'Closed transition without supervision'],
            correct: 1,
            exp: 'Spinning motors hold residual voltage; instant out-of-phase reconnection slams them mechanically and electrically. The programmed pause is exactly the cure.',
          },
        ],
      },
      {
        title: 'ATS Safety and Service Discipline',
        body: [
          'The ATS cabinet is the most dangerous place in the standby system for one reason: TWO SOURCES. Utility dead does not mean the cabinet is dead (the generator side may be live, or start any second); generator locked out does not kill the utility side. LOTO on an ATS means BOTH sources — utility disconnect AND generator (controller to OFF, per its lockout provisions, and battery/start circuit secured for work in the cabinet) — plus verification testing of every section you will touch, remembering the control transformers and sensing circuits that stay live from either side. Arc-flash PPE per the site\'s labels applies at service-entrance-rated gear especially.',
          'Service-entrance-rated ATSs add the utility MAIN function (disconnect and often service OCPD) into the same enclosure — with the utility neutral bonded there and everything that implies. SWITCHED-NEUTRAL (4-pole) ATSs exist for separately derived generator installations: whether the neutral transfers with the phases is an installation-design fact you verify, not guess, because it determines grounding behavior and ground-fault sensing on both sources.',
          'Testing an ATS honestly requires making it work: monthly/periodic transfer testing (NFPA 110 territory, module 23) by simulated utility failure (the test switch or opening the normal source per procedure — coordinated with the facility, because the load WILL blink on open transition), observing the full sequence with a stopwatch against the programmed delays, and inspecting contacts/mechanism on the manufacturer\'s schedule with both sources locked out. Bypass-isolation ATSs — the hospital-grade design — let you test and service the transfer mechanism while a manual bypass carries the load: learn the drawout/bypass procedure per the specific unit before touching one.',
          'The failure catalog: sensing relays/boards drifting (transfers at wrong thresholds, or utility "acceptable" while lights flicker), timer failures, contact erosion (heat discoloration at lugs — the resistance story), mechanism binding (exercised rarely, then fails to move during the real event — mechanisms need their exercise as much as engines), and the humble engine-start wiring. And the sales truth the whole module teaches: an un-exercised, un-inspected ATS is the single point of failure that makes every dollar spent on the generator worthless.',
        ],
        keyPoints: [
          'Two-source LOTO: utility AND generator secured, every section verified — the cabinet\'s defining hazard',
          'Neutral handling (3-pole vs 4-pole switched neutral) is installation design — verify, never guess',
          'Bypass-isolation designs allow service under load — learn each unit\'s procedure first',
          'Mechanisms fail from lack of exercise: the untested ATS is the system\'s single point of failure',
        ],
        quiz: [
          {
            q: 'Before working inside an ATS cabinet during a utility outage, the required assumption is:',
            a: ['The cabinet is dead — utility is out', 'Both sources are potentially live: the generator side is hot or may start automatically — LOTO both sources and verify every section', 'Only the load lugs are dangerous', 'Sensing circuits are always dead'],
            correct: 1,
            exp: 'The outage that killed utility just made the generator side live (or about to be). Two-source LOTO with verification is the non-negotiable ATS discipline.',
          },
          {
            q: 'A facility\'s generator has been flawless for years, but during a real outage the ATS mechanism failed to move — it had never been transfer-tested. The lesson is:',
            a: ['ATSs are unreliable', 'The un-exercised transfer mechanism is the system\'s single point of failure: periodic transfer testing is as essential as engine exercise', 'Open transition is obsolete', 'The generator should be bigger'],
            correct: 1,
            exp: 'Mechanisms bind when never moved. A perfect generator behind a frozen switch delivers nothing — the module\'s selling truth for real testing programs.',
          },
        ],
      },
    ],
    test: [
      { q: 'The time-delay engine start (1-3s) exists to:', a: ['Warm the starter', 'Ride through momentary utility blinks without starting the generator', 'Protect the ATS contacts', 'Charge the batteries'], correct: 1, exp: 'Every flicker should not launch a diesel; the short delay filters blinks from outages.' },
      { q: 'The ATS transfers to generator only when:', a: ['The engine cranks', 'Generator voltage AND frequency reach acceptable setpoints', 'Oil pressure appears', 'Ten minutes pass'], correct: 1, exp: 'Acceptability sensing protects the load from bad power — module 14/18\'s numbers become permission.' },
      { q: 'The long retransfer delay exists because:', a: ['Contacts need cooling', 'Utility must prove stable before the load returns — outages often recur in clusters', 'Generators need runtime', 'Codes require exactly 30 minutes'], correct: 1, exp: 'Bouncing back to a flickering utility re-blinks the load repeatedly; the delay demands sustained stability.' },
      { q: 'After retransfer, the generator:', a: ['Stops instantly', 'Runs an unloaded cooldown before stopping', 'Stays running for an hour by code', 'Transfers to a load bank'], correct: 1, exp: 'The programmed cooldown protects the turbo and engine (module 14) after loaded running.' },
      { q: 'Delayed-transition ATSs pause in neutral to:', a: ['Save contact wear', 'Let motor residual fields decay before reconnection — protecting large motors', 'Test the generator', 'Satisfy utilities'], correct: 1, exp: 'Out-of-phase reconnection slams spinning motors; the pause is the engineered mercy.' },
      { q: 'Closed-transition transfer requires:', a: ['Nothing special', 'Sync-check supervision (and utility approval) — it momentarily parallels the sources', 'A bigger generator', 'A 4-pole switch'], correct: 1, exp: 'Make-before-break means a real parallel: module 21\'s physics supervised into a sub-cycle overlap.' },
      { q: 'The most safety-critical fact about ATS cabinets is:', a: ['High enclosure temperature', 'Two sources: either side may be live or become live regardless of the other', 'Sharp edges', 'DC control voltage'], correct: 1, exp: 'Utility-dead ≠ cabinet-dead. Two-source LOTO with verification defines ATS work.' },
      { q: 'Whether an ATS switches the neutral (4-pole) is determined by:', a: ['Technician preference', 'The installation\'s separately-derived-system design — verified, never guessed', 'The generator size', 'Utility policy alone'], correct: 1, exp: 'Neutral switching sets grounding and ground-fault behavior; it is design fact, not field option.' },
      { q: 'Bypass-isolation ATSs exist so that:', a: ['Transfers happen faster', 'The transfer mechanism can be tested/serviced while a manual bypass carries the load', 'Neutrals can float', 'Generators parallel'], correct: 1, exp: 'Hospital-grade serviceability: learn each unit\'s drawout/bypass procedure before touching it.' },
      { q: 'Many "generator failed to start during the outage" events are actually:', a: ['Fuel failures', 'Failures of the engine-start wiring/contacts between ATS and controller — the command never arrived', 'Alternator faults', 'Operator error'], correct: 1, exp: 'Two humble wires carry the whole system\'s purpose; their integrity is checked on every ATS service.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 21 — PARALLELING & SWITCHGEAR BASICS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gen-paralleling',
    num: 21,
    title: 'Paralleling & Switchgear Basics',
    desc: 'Multiple generators on one bus: synchronization, load sharing, paralleling switchgear — and where entry-level scope ends.',
    slides: [
      {
        title: 'Synchronization: Joining the Bus',
        body: [
          'Large facilities parallel generators — multiple sets on one bus — for capacity (loads bigger than one engine), redundancy (N+1: any one set can fail), and efficiency (run only the engines the load needs). The physics gate is SYNCHRONIZATION: before a generator\'s breaker may close onto a live bus, it must match that bus in VOLTAGE (within a few percent), FREQUENCY (nearly equal — a slight positive slip is used so the incoming set picks up load), and PHASE ANGLE (the waveforms aligned at the moment of closure).',
          'Closing out of sync is the most violent event in the power world short of a fault: the bus instantly drags the incoming machine into step, with torque transients that can shear couplings, damage windings, and trip everything. This is why SYNC-CHECK RELAYS (permissive devices that block breaker closure outside tight windows) supervise every paralleling point, why automatic synchronizers trim the governor and AVR to walk the incoming machine into the window, and why the old manual synchroscope-and-lamps skill still gets taught: understanding what the automation is doing is what lets you diagnose it.',
          'Once paralleled, the division of labor becomes counterintuitive and essential: on a shared bus, an individual governor\'s fuel setting controls that machine\'s kW SHARE (real power), and its AVR/excitation controls its kVAR share (reactive power) — not the bus frequency and voltage, which belong to the system. Load-sharing controls (droop, or isochronous load-sharing lines/networks — module 14\'s vocabulary matured) coordinate the fleet so engines divide kW proportionally; cross-current/droop compensation divides kVAR. A set hogging or shedding kW has a governor/load-share problem; one circulating vars has an excitation/compensation problem.',
          'The operational sequences complete the picture: dead-bus start (first set closes onto a dead bus without sync — someone must be first, and the controls arbitrate who), subsequent sets synchronize on, load ramps and soft transfers, and reverse-power protection (a motoring generator — engine failed, alternator driving it as a motor — trips on reverse power before it burns fuel backwards). These are the behaviors you will watch paralleling switchgear perform; understanding them is the entry ticket.',
        ],
        keyPoints: [
          'Sync = matching voltage, frequency (slight slip), and phase angle before closure; sync-check relays enforce it',
          'Out-of-sync closure shears couplings and damages windings — the trade\'s most violent mistake',
          'On a shared bus: governor sets a machine\'s kW share, excitation its kVAR share',
          'Dead-bus logic, load ramps, and reverse-power protection are the sequences to recognize',
        ],
        quiz: [
          {
            q: 'On a two-generator bus, unit A carries 80% of the kW while unit B loafs at 20%, though both are rated equally. Frequency and voltage are normal. The territory to investigate is:',
            a: ['Unit A\'s alternator', 'The governors/load-sharing controls — kW division among paralleled sets is a fuel/governor function', 'Unit B\'s AVR', 'The bus itself'],
            correct: 1,
            exp: 'On a shared bus, each machine\'s kW share follows its governor/load-share settings. Voltage/excitation problems would show as kVAR imbalance instead.',
          },
          {
            q: 'A sync-check relay refuses to permit a generator breaker to close even though the panel meters "look close." The professional response is:',
            a: ['Jumper the relay — meters are close enough', 'Trust the permissive: verify the sync inputs and the actual match (voltage/slip/phase) — the relay exists to prevent the most damaging closure in the trade', 'Close the breaker manually', 'Trip the bus first'],
            correct: 1,
            exp: 'The sync check is the last guard before coupling-shearing torque. "Close" by meter eyeball is not in-window; diagnose why, never bypass.',
          },
        ],
      },
      {
        title: 'Switchgear, Protection, and the Scope Boundary',
        body: [
          'Paralleling SWITCHGEAR is the bus\'s home: generator breakers (electrically operated, often drawout), the paralleling controls (synchronizers, load-share modules or integrated PLC-based masters), PROTECTION relays (overcurrent, reverse power, over/under voltage and frequency, differential on larger machines), metering, and master controls sequencing the whole plant (start priorities, load add/shed steps, bus optimization). Modern systems concentrate all of it into redundant PLC masters with HMI screens — the BAS lesson of the HVAC course applies: the screen shows what the system thinks; verification is physical.',
          'Load management rides the same gear: LOAD ADD/SHED steps (non-critical loads shed if plant capacity tightens, restored in priority order), generator START PRIORITIES rotating run hours across the fleet, and on utility-paralleled plants, the import/export controls and utility PROTECTION requirements (anti-islanding and interconnection relays) that come with operating in parallel with the grid — a regulated, utility-blessed domain with its own testing regime.',
          'Your entry-level scope in a switchgear room, stated plainly: OWN the generators themselves (everything modules 13-19 taught — the engines, alternators, controllers feeding this room), the observation and documentation of sequences (watching a plant exercise and recording what stepped wrong is real diagnostic contribution), first-line electrical checks at the generator ends, and the housekeeping/inspection items your PM covers. DEFER: protection relay settings and testing (a licensed/NETA-certified specialty), breaker internal maintenance (drawout racking has its own training and arc-flash reality), PLC master programming, and any utility-interconnection work. The kettle/suppression/chiller rule at its highest-stakes form: diagnose to the boundary, document, refer.',
          'Why this module matters to the entry tech anyway: paralleling sites are where generator careers point (module 25) — data centers, hospitals, and utility plants pay the premium for exactly this literacy, and the tech who arrives already speaking sync, load share, and reverse power gets invited into the switchgear apprenticeship that the parts-changer never sees. Watch every plant sequence you legally can, log what you saw, and collect the vocabulary — it is the ladder.',
        ],
        keyPoints: [
          'Switchgear = breakers + sync/load-share controls + protection relays + master sequencing (PLC/HMI)',
          'Load add/shed, start priorities, and utility-parallel protections are recognized behaviors, not settings you touch',
          'Defer: relay settings/testing (NETA territory), breaker internals, PLC programming, utility interconnection',
          'The literacy is the career ladder: paralleling sites pay the premium for exactly this vocabulary',
        ],
        quiz: [
          {
            q: 'During a plant test, generator 3\'s breaker trips on "reverse power" moments after paralleling. The physical meaning is:',
            a: ['Too much output current', 'Generator 3\'s engine stopped producing power and the bus began motoring it — the alternator was driving the engine', 'A grounded neutral', 'Excess kVAR'],
            correct: 1,
            exp: 'Reverse power = the machine consuming instead of producing: a failed/fuel-starved engine being spun as a motor. The relay trips it before damage — investigate the engine, not the relay.',
          },
          {
            q: 'A customer asks you to "just adjust the protection relay pickup since it keeps tripping." The correct response is:',
            a: ['Adjust it 10% and monitor', 'Decline and refer: protection settings are engineered and their modification/testing is licensed (NETA-type) specialty work — investigate WHY it trips instead', 'Bypass the relay temporarily', 'Replace the relay'],
            correct: 1,
            exp: 'Protection settings implement an engineered coordination study. Field-adjusting them to silence trips removes protection precisely where it proved needed — diagnose the cause, document, refer the settings question.',
          },
        ],
      },
    ],
    test: [
      { q: 'Facilities parallel generators for:', a: ['Simpler wiring', 'Capacity, redundancy (N+1), and efficiency (run only what the load needs)', 'Lower fuel quality tolerance', 'Quieter operation'], correct: 1, exp: 'One bus, many engines: bigger loads, survivable failures, and right-sized running.' },
      { q: 'Synchronization requires matching:', a: ['Only voltage', 'Voltage, frequency (slight slip), and phase angle', 'Only frequency', 'kW and kVAR'], correct: 1, exp: 'All three within tight windows before the breaker may close onto a live bus.' },
      { q: 'Closing a generator breaker badly out of sync causes:', a: ['A minor flicker', 'Violent torque transients: sheared couplings, winding damage, tripped plant', 'Reverse rotation', 'Fuel dilution'], correct: 1, exp: 'The bus yanks the machine into step instantly — the most damaging mistake in the trade.' },
      { q: 'Sync-check relays:', a: ['Speed up transfers', 'Block breaker closure outside the permitted sync window — never to be bypassed', 'Measure fuel', 'Balance kVAR'], correct: 1, exp: 'The last permissive guard before closure; diagnosing why it refuses beats overriding it.' },
      { q: 'On a shared bus, an individual machine\'s kW share is set by:', a: ['Its AVR', 'Its governor/load-share control (fuel)', 'The bus voltage', 'Its breaker'], correct: 1, exp: 'Fuel = real power share; excitation = kVAR share — the paralleled division of labor.' },
      { q: 'kVAR circulating between paralleled sets points to:', a: ['Governor problems', 'Excitation/AVR and droop-compensation issues', 'Fuel restrictions', 'Bus faults'], correct: 1, exp: 'Reactive power follows excitation: cross-current compensation and AVR matching divide the vars.' },
      { q: 'Reverse-power protection trips a generator that:', a: ['Overproduces kW', 'Is being motored by the bus after its engine fails', 'Exceeds voltage', 'Loses its exciter only'], correct: 1, exp: 'A dead engine becomes a load; the relay removes it before the backwards-driven damage.' },
      { q: 'Dead-bus logic exists because:', a: ['Buses need cleaning', 'The first generator must close onto a dead bus without sync — controls arbitrate which one', 'Utilities require it', 'Load banks need priority'], correct: 1, exp: 'Someone is always first; the plant controls elect and permit exactly one dead-bus closure.' },
      { q: 'Protection relay settings and testing belong to:', a: ['Any generator tech', 'Licensed/NETA-certified specialists implementing the coordination study', 'The customer', 'The utility only'], correct: 1, exp: 'Engineered protection is not field-adjustable scope: diagnose causes, document, refer settings.' },
      { q: 'The entry tech\'s value in a paralleling plant is:', a: ['Reprogramming the master PLC', 'Owning the generators feeding it, observing/documenting sequences, and speaking the vocabulary that earns the switchgear apprenticeship', 'Adjusting relays', 'Racking breakers untrained'], correct: 1, exp: 'The generators are yours; the literacy is the ladder into the premium rooms — with the boundary respected.' },
    ],
  },
];
