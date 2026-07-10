import type { TrainingModule } from './modules';

// Commercial Kitchen FSE course — kitchen-specific modules (nums 11-27).
// These live OUTSIDE ALL_MODULES so the UPS training-completion check
// (ALL_MODULES.every) is not affected. Lookup goes through getModule()
// in data/index.ts, which searches both collections.
// Module numbering continues from the shared foundation (modules 1-10).

export const KITCHEN_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 11 — KITCHEN EQUIPMENT ELECTRICAL SYSTEMS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-electrical-systems',
    num: 11,
    title: 'Kitchen Equipment Electrical Systems',
    desc: 'How commercial kitchen equipment is powered and controlled — from the wall to the element. Voltages, heating elements, motors, contactors, and wiring diagrams.',
    slides: [
      {
        title: 'Kitchen Power: Voltages and Circuits',
        body: [
          'Commercial kitchens run on a mix of voltages, and the first question on every service call is: what am I connected to? Light-duty equipment (blenders, small warmers, POS terminals) runs on 120V single-phase. Most serious cooking equipment — fryers, griddles, ovens, dishwashers — runs on 208V or 240V, either single-phase or three-phase. Large installations may feed heavy equipment at 480V three-phase.',
          '208V and 240V look similar on a spec plate but they are not interchangeable. 208V comes from two legs of a 120/208V three-phase wye service. 240V comes from a single-phase 120/240V service or a delta system. A heating element rated for 240V produces only about 75% of its rated wattage on 208V — a fryer that seems "slow to recover" may simply be a 240V unit installed on a 208V service. Always compare the equipment data plate to the measured supply voltage.',
          'Three-phase matters in kitchens for the same reason it matters everywhere: more power through smaller conductors, and smoother loading. Three-phase kitchen equipment splits its heating elements across the three phases. If one phase is lost (single-phasing), part of the equipment keeps working — a griddle that heats on one side but not the other, or a fryer bank where only some elements heat, is a classic lost-phase symptom.',
          'Every piece of fixed kitchen equipment should have a means of disconnect — a breaker, a cord-and-plug, or a local disconnect switch. Finding and verifying the disconnect is step one of your LOTO procedure from Module 9, and you verify dead with your meter using the live-dead-live method from Module 10. A kitchen is a wet, grounded, stainless-steel environment: everything you touch is a grounded surface, which makes electrical safety discipline even more critical than in a dry electrical room.',
        ],
        tables: [
          {
            caption: 'Common commercial kitchen voltages',
            headers: ['Voltage', 'Phase', 'Typical Equipment', 'Notes'],
            rows: [
              ['120V', 'Single', 'Small counter equipment, controls, POS', 'Standard receptacles'],
              ['208V', 'Single or Three', 'Fryers, griddles, ovens, dish machines', 'Two or three legs of a 120/208V wye'],
              ['240V', 'Single or Three', 'Same equipment classes as 208V', 'Element wattage drops ~25% if run on 208V'],
              ['480V', 'Three', 'Large ovens, central dish machines, rooftop equipment', 'Requires extra PPE per NFPA-70E'],
            ],
          },
        ],
        keyPoints: [
          'Kitchens mix 120V, 208V, 240V, and sometimes 480V — verify the data plate against the measured supply',
          'A 240V element on a 208V supply delivers only ~75% of rated wattage — classic "slow equipment" complaint',
          'Partial heating on three-phase equipment (one side cold) suggests a lost phase',
          'Stainless steel + water = grounded environment everywhere; LOTO and live-dead-live are mandatory',
        ],
        quiz: [
          {
            q: 'A customer complains their fryer recovers slowly. The data plate says 240V, and you measure 208V at the supply. The most likely explanation is:',
            a: ['The oil is too old', 'The element delivers only about 75% of rated wattage on the lower voltage', 'The thermostat is miscalibrated', 'The supply breaker is failing'],
            correct: 1,
            exp: 'Element power drops with the square of voltage: (208/240)² ≈ 0.75. A 240V-rated element on 208V produces about three-quarters of its rated heat — slow recovery is the symptom.',
          },
          {
            q: 'A three-phase griddle heats on the left side but stays cold on the right. The classic cause is:',
            a: ['A dirty griddle plate', 'A lost phase (single-phasing)', 'Low gas pressure', 'A failed high-limit on the left side'],
            correct: 1,
            exp: 'Three-phase equipment splits elements across phases. Losing one phase kills the elements on that phase while the rest keep heating — partial heating is the fingerprint of single-phasing.',
          },
          {
            q: 'Why is electrical safety discipline even more critical in a kitchen than in a dry electrical room?',
            a: ['Kitchen voltages are higher', 'Kitchens use DC power', 'Wet floors and grounded stainless steel surround you — a fault current path is always within reach', 'Kitchen breakers trip more slowly'],
            correct: 2,
            exp: 'Water and grounded stainless steel everywhere mean your body is almost always near a return path to ground. The same shock that might be survivable in a dry room can be fatal in a wet kitchen.',
          },
        ],
      },
      {
        title: 'Heating Elements, Thermostats, and Safety Controls',
        body: [
          'The heating element is the heart of electric cooking equipment. Most kitchen elements are tubular (calrod-style): a nichrome resistance wire packed in magnesium-oxide insulation inside a metal sheath. They fail three ways: open (broken wire — no heat, infinite ohms), shorted to sheath (leakage to ground — trips breakers or GFCIs), or degraded (correct continuity but weak heat from partial damage).',
          'Testing an element is a Module 10 skill applied to a new component. Kill and lock out the power, disconnect at least one element lead so you are not reading through parallel paths, then measure resistance. A good element reads a specific resistance you can predict: R = V²/P. A 240V, 5,000W element should read 240²/5000 ≈ 11.5 Ω. Infinite = open. Also megger or measure element-to-sheath: anything but very high resistance means the element is leaking to ground and must be replaced.',
          'Thermostats regulate temperature by cycling the element. Kitchens use three main types: hydraulic bulb-and-capillary thermostats (a fluid-filled bulb expands and mechanically opens contacts), electromechanical, and electronic thermostats using thermistor or RTD probes feeding a control board. When food temperature is wrong, calibrate first — verify actual temperature with a trusted thermometer before condemning parts.',
          'Every heating appliance has a high-limit: a separate safety thermostat that opens the circuit if temperature runs away. Fryer high-limits are the most safety-critical device in the kitchen — a stuck fryer thermostat without a working high-limit means an oil fire. High-limits are usually manual-reset. A repeatedly tripping high-limit is never the problem; it is the evidence of a problem — find out why the temperature is running high. Never, ever bypass a high-limit, even "temporarily for testing."',
        ],
        tables: [
          {
            caption: 'Element failure modes and meter readings',
            headers: ['Failure', 'Resistance Reading', 'Symptom'],
            rows: [
              ['Open element', 'OL / infinite', 'No heat from that element'],
              ['Shorted to sheath', 'Low ohms element-to-ground', 'Trips breaker or GFCI'],
              ['Healthy element', 'R ≈ V² ÷ P (e.g., 11.5 Ω for 240V/5kW)', 'Normal heating'],
            ],
          },
        ],
        keyPoints: [
          'Element check: expected resistance is R = V²/P — measure with power locked out and one lead disconnected',
          'Element-to-sheath leakage trips breakers/GFCIs — replace the element',
          'Verify actual temperature with a trusted thermometer before condemning a thermostat',
          'A tripping high-limit is evidence of another problem — never bypass it',
        ],
        quiz: [
          {
            q: 'What resistance should a healthy 240V, 6,000W element read?',
            a: ['About 9.6 Ω', 'About 40 Ω', 'About 0.5 Ω', 'OL (infinite)'],
            correct: 0,
            exp: 'R = V²/P = 240² ÷ 6000 = 57,600 ÷ 6000 = 9.6 Ω. Learning to predict element resistance turns your ohmmeter into a pass/fail element tester.',
          },
          {
            q: 'A fryer keeps tripping its manual-reset high-limit. The correct response is:',
            a: ['Replace the high-limit — it is obviously weak', 'Bypass the high-limit temporarily to confirm the fryer otherwise works', 'Diagnose why the oil temperature is running high — the high-limit is doing its job', 'Reset it and tell the customer to call back if it happens again'],
            correct: 2,
            exp: 'The high-limit is a safety backstop. Repeated trips mean the primary thermostat or its sensing is letting temperature run away. Bypassing a fryer high-limit risks an oil fire.',
          },
          {
            q: 'An element reads correct resistance lead-to-lead, but 15 Ω from either lead to the metal sheath. This element:',
            a: ['Is healthy', 'Is open', 'Is leaking to ground and must be replaced', 'Just needs the leads cleaned'],
            correct: 2,
            exp: 'Element-to-sheath should be effectively infinite. 15 Ω to the sheath is a dead short to ground — it will trip breakers or energize the chassis. Replace it.',
          },
        ],
      },
      {
        title: 'Motors, Contactors, and Reading Kitchen Wiring Diagrams',
        body: [
          'Beyond heat, kitchens are full of motion: mixer motors, dishwasher wash pumps, conveyor drives, refrigeration compressors and fan motors, hood exhaust fans. Small kitchen motors are usually single-phase induction motors that need a starting method — split-phase, capacitor-start, or permanent split capacitor (PSC). When a single-phase motor hums but does not spin, suspect the start components: the capacitor or the start relay/switch, not necessarily the motor windings.',
          'Heavy loads are switched by contactors — electrically operated switches you already know from UPS work. A small control circuit (often 24V or 120V through the thermostat and safeties) energizes the contactor coil, and the contactor contacts carry the heavy element or motor current. This separation is the single most useful diagnostic concept in kitchen equipment: is the problem in the control circuit (thermostat, high-limit, timer, door switch — the things that decide) or the load circuit (contactor contacts, element, motor — the things that do)?',
          'Contactor failures are predictable: burned or pitted contacts (voltage drop across closed contacts — measure millivolts across each pole under load), a failed coil (no pull-in; check for coil voltage first — if voltage is present and it does not pull in, the coil is bad; if voltage is absent, the control circuit is interrupted upstream), and chattering (low control voltage or a failing safety switch cycling rapidly).',
          'Kitchen equipment service manuals give you the same drawings you learned in Module 7: a schematic (how the circuit works logically) and often a wiring/connection diagram (where the physical wires run). The fastest diagnostic path is almost always: get the schematic, identify the control chain — L1 through fuse, power switch, timer, thermostat, high-limit, door switch, to the contactor coil — and hunt the open point with your meter. Every switch and safety in that chain is a suspect; the schematic tells you the order to check them.',
        ],
        keyPoints: [
          'A humming, non-spinning single-phase motor usually has failed start components (capacitor/relay), not bad windings',
          'Control circuit decides, load circuit does — split every fault into one side or the other',
          'Contactor: coil voltage present + no pull-in = bad coil; no coil voltage = open control chain upstream',
          'Diagnose from the schematic: trace the control chain and hunt the open with your meter',
        ],
        quiz: [
          {
            q: 'A dishwasher wash pump motor hums loudly but will not spin. The most likely failure is:',
            a: ['The motor windings are burned open', 'The start capacitor or start relay has failed', 'The impeller is missing', 'The supply voltage is 240V instead of 208V'],
            correct: 1,
            exp: 'Humming means the run winding is energized but the motor cannot develop starting torque — the classic signature of a failed start capacitor or start relay in a single-phase motor.',
          },
          {
            q: 'You measure 120V across a contactor coil, but the contactor does not pull in. The fault is:',
            a: ['Upstream in the control circuit', 'The contactor coil itself', 'The heating element', 'The supply breaker'],
            correct: 1,
            exp: 'Coil voltage present + no pull-in = dead coil. If the coil voltage were missing, you would hunt upstream through the thermostat, high-limit, and switches for the open point.',
          },
          {
            q: 'An oven heats only when the door switch is held by hand. Using the control-chain method, the diagnosis is:',
            a: ['Replace the elements', 'The door switch or its actuation is faulty — it is an open point in the control chain', 'The contactor contacts are pitted', 'The oven needs a new control board'],
            correct: 1,
            exp: 'The control chain is interrupted at the door switch. Holding it closes the chain and the oven works — the switch or the door alignment that presses it is the fault.',
          },
        ],
      },
    ],
    test: [
      { q: 'A 240V-rated heating element connected to a 208V supply delivers approximately:', a: ['100% of rated wattage', '90% of rated wattage', '75% of rated wattage', '50% of rated wattage'], correct: 2, exp: 'Power scales with voltage squared: (208/240)² ≈ 0.75, so about 75% of rated wattage — the classic cause of "slow" equipment.' },
      { q: 'A three-phase fryer bank where only some elements heat suggests:', a: ['Old oil', 'A lost phase', 'A bad thermostat', 'Low water pressure'], correct: 1, exp: 'Three-phase equipment distributes elements across phases; losing one phase kills only the elements on that phase.' },
      { q: 'The expected resistance of a healthy 208V, 4,000W element is about:', a: ['0.9 Ω', '10.8 Ω', '52 Ω', '208 Ω'], correct: 1, exp: 'R = V²/P = 208² ÷ 4000 = 43,264 ÷ 4000 ≈ 10.8 Ω.' },
      { q: 'Before measuring element resistance you must:', a: ['Set the meter to volts', 'Lock out power and disconnect at least one element lead', 'Warm the element up first', 'Remove the element from the appliance'], correct: 1, exp: 'Ohmmeter readings require a dead circuit, and disconnecting one lead prevents reading through parallel paths in the circuit.' },
      { q: 'An element that reads low ohms from a lead to its metal sheath will:', a: ['Heat normally', 'Trip the breaker or GFCI', 'Read OL lead-to-lead', 'Run at reduced wattage'], correct: 1, exp: 'Leakage from element to grounded sheath is a ground fault — it trips protection and can energize the chassis.' },
      { q: 'A repeatedly tripping fryer high-limit means:', a: ['The high-limit is weak and should be jumpered out', 'Temperature is actually running too high — find out why', 'The oil needs filtering', 'The fryer needs a bigger high-limit'], correct: 1, exp: 'The high-limit is the safety backstop against an oil fire. Trips are evidence of a runaway temperature problem — usually thermostat or sensing. Never bypass it.' },
      { q: 'The control circuit / load circuit distinction means:', a: ['AC vs DC sections', 'The circuit that decides (thermostat, safeties, timers) vs the circuit that does (contactor contacts, elements, motors)', 'High voltage vs low voltage', 'The left and right sides of the schematic'], correct: 1, exp: 'Splitting every fault into "decision side" or "power side" is the fastest way to isolate kitchen equipment problems.' },
      { q: 'A contactor coil has proper voltage across it but does not pull in. You should:', a: ['Replace the coil/contactor', 'Check the thermostat', 'Check the door switch', 'Reset the breaker'], correct: 0, exp: 'Voltage present + no pull-in = the coil itself has failed. Missing voltage would send you upstream through the control chain instead.' },
      { q: 'A single-phase motor that hums but will not start most likely has:', a: ['Burned run windings', 'A failed start capacitor or start relay', 'A bent shaft', 'The wrong supply frequency'], correct: 1, exp: 'The hum is the run winding energized without starting torque — start components are the prime suspect.' },
      { q: 'The fastest systematic way to find why an appliance will not heat is to:', a: ['Replace the most expensive part first', 'Trace the control chain on the schematic and hunt the open point with a meter', 'Swap the appliance with a working one', 'Measure the supply voltage and stop there'], correct: 1, exp: 'The schematic shows every switch and safety between the line and the contactor coil in order — hunt the open point methodically.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 12 — ELECTRIC COMMERCIAL COOKING EQUIPMENT
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-electric-cooking',
    num: 12,
    title: 'Electric Commercial Cooking Equipment',
    desc: 'Fryers, griddles, ovens, and steamers — applying element, thermostat, and control-chain skills to the equipment that cooks.',
    slides: [
      {
        title: 'Electric Fryers',
        body: [
          'An electric fryer is a tank of oil with immersion elements, a thermostat, a high-limit, and a contactor. Everything from Module 11 applies directly. The elements sit in the oil (or swing up out of it for cleaning); the thermostat probe senses oil temperature; the high-limit probe sits near the elements as the last line of defense against an oil fire.',
          'Fryer service calls cluster around a few complaints. "No heat": trace the control chain — power, switches, thermostat, high-limit (check its reset button first; a tripped high-limit is both a quick fix and a mandatory investigation), contactor coil, contactor contacts, elements. "Slow recovery": verify supply voltage against the data plate (the 208/240 trap), test each element — on multi-element fryers one open element leaves the others carrying the load slowly. "Overheating / high-limit trips": thermostat calibration, a fallen or oil-crusted probe reading the wrong thing, or welded contactor contacts that never open — the most dangerous failure in the fryer world.',
          'Oil condition affects diagnosis. Old, broken-down oil smokes at lower temperatures, leading to "fryer runs hot" complaints when the actual temperature is fine. Always verify with a calibrated thermometer probe in the oil next to the thermostat probe before adjusting or condemning anything. Melt cycles matter too: solid shortening fryers use a low-power pulsing melt mode so elements do not scorch through a solid block; a fryer stuck in melt cycle heats agonizingly slowly and mimics element failure.',
          'Safety around fryers is unforgiving: 350°F oil causes instant deep burns, and water in hot oil erupts. Never lean over an open fryer while diagnosing, never let condensation or your drink near the tank, and treat every welded-contactor report as an emergency — that fryer must not be left in service.',
        ],
        keyPoints: [
          'Fryer no-heat = walk the control chain; always check the high-limit reset first, then find out why it tripped',
          'Slow recovery: verify 208 vs 240 supply, then test each element individually',
          'Welded contactor contacts = uncontrolled heating = the most dangerous fryer failure',
          'Verify oil temperature with a calibrated thermometer before adjusting or condemning parts',
        ],
        quiz: [
          {
            q: 'A fryer overshoots its setpoint and eventually trips the high-limit. You find the contactor pulled in continuously even with the thermostat turned to minimum. The failure is:',
            a: ['A weak high-limit', 'Welded contactor contacts that never open', 'An open heating element', 'Low supply voltage'],
            correct: 1,
            exp: 'Contacts that stay closed regardless of the thermostat mean the load circuit can never shut off — uncontrolled heating held back only by the high-limit. Replace the contactor; do not leave the fryer in service.',
          },
          {
            q: 'A solid-shortening fryer heats very slowly for the first several minutes after startup. This is most likely:',
            a: ['A failing element', 'The melt cycle operating normally', 'A tripped high-limit', 'Low oil level'],
            correct: 1,
            exp: 'Melt mode pulses the elements at low duty so they do not scorch through solid shortening. Slow initial heating is by design; sustained slow heating after melt-out is a real symptom.',
          },
        ],
      },
      {
        title: 'Griddles, Ranges, and Induction',
        body: [
          'Electric griddles are heating elements clamped or brazed under a thick steel plate, usually divided into independently thermostated zones. Zone-by-zone complaints map directly to zone components: one cold zone = that zone\'s element, thermostat, or contactor. Uneven cooking within a zone often is not electrical at all — a warped or carbon-caked plate insulates unevenly. Temperature checks on a griddle are done with a surface thermometer at the center of each zone after full preheat.',
          'Electric ranges (hot tops and French plates) are simpler: solid elements under cast plates with infinite-heat switches — a cycling switch that pulses the element on a duty cycle rather than sensing temperature. A plate stuck on full or dead usually means the infinite switch, not the element; you can hear and feel a good infinite switch click as it cycles.',
          'Induction is different physics: a coil under a ceramic surface generates a high-frequency magnetic field that induces eddy currents directly in ferrous cookware — the pan is the element. There is no heat without a ferromagnetic pan of sufficient diameter, and the electronics (inverter board, pan-detection, IGBTs — the same switching devices as a UPS inverter) do the work. Field diagnosis of induction is mostly: verify with a known-good induction pan, read the error codes, check cooling fans and air filters (power electronics die from clogged airflow), then board-level swap per the manufacturer manual.',
          'Your UPS background is a genuine advantage on induction equipment: it is a power-electronics inverter that happens to cook. Rectifier, DC bus, IGBT full-bridge, resonant coil — the block diagram reads like a UPS with a pan instead of a load bus. Treat DC bus capacitors with the same respect: they hold lethal charge after power-off.',
        ],
        keyPoints: [
          'Griddle zone cold = that zone\'s element/thermostat/contactor; uneven cooking may be a warped or dirty plate',
          'Range plate stuck on full or dead: suspect the infinite switch before the element',
          'Induction needs a ferrous pan — always test with a known-good pan before opening anything',
          'Induction = power electronics: clogged cooling airflow kills boards; DC bus caps hold charge after power-off',
        ],
        quiz: [
          {
            q: 'One zone of a three-zone griddle stays cold; the other two heat normally. Your first suspects are:',
            a: ['The supply breaker', 'That zone\'s element, thermostat, or contactor', 'The griddle plate thickness', 'The other two zones back-feeding'],
            correct: 1,
            exp: 'Independent zones mean independent element/thermostat/contactor sets. A single cold zone points inside that zone\'s own circuit.',
          },
          {
            q: 'An induction hob shows "no pan" errors with the customer\'s cookware but works with your test pan. The problem is:',
            a: ['The inverter board', 'The customer\'s cookware is not sufficiently ferromagnetic or is too small', 'The pan-detection circuit', 'The supply voltage'],
            correct: 1,
            exp: 'Induction only couples to ferrous cookware of adequate diameter. A known-good test pan is the fastest way to separate cookware problems from equipment problems.',
          },
          {
            q: 'Why do induction units demand the same capacitor discipline as UPS work?',
            a: ['They use batteries', 'Their DC bus capacitors hold lethal charge after power-off', 'They run on DC supply', 'Their coils stay magnetized'],
            correct: 1,
            exp: 'An induction unit is a rectifier + DC bus + IGBT inverter. The bus capacitors store dangerous energy after shutdown — verify discharge before touching, exactly as on a UPS.',
          },
        ],
      },
      {
        title: 'Ovens, Steamers, and Water',
        body: [
          'Electric convection ovens add two things to the basic element/thermostat/contactor pattern: a circulating fan and a door interlock. The fan motor is part of the cooking system — a dead or slow fan causes uneven bakes and long cook times even with perfect elements. Most convection ovens interrupt fan and heat through the door switch, so "oven stops when I let go of the door" complaints are door switch and hinge alignment, not controls.',
          'Conveyor ovens (pizza and sandwich chains) move product through a heated tunnel on a chain belt. Heat complaints follow the standard element chain; the conveyor side is a gearmotor, belt tension, and a speed control. Belt speed IS cook time — verify actual belt transit time against spec with a stopwatch before touching temperatures.',
          'Steamers and kettles introduce the kitchen\'s hardest-working enemy: water and its minerals. A steamer boils water into steam with immersion elements or a steam generator; every gallon boiled leaves its scale behind on elements and sensors. Scale insulates elements (slow heating, then element burnout — an element cooking under a scale blanket runs far hotter than designed), fouls water-level probes (generator overfills or dry-fires), and plugs solenoid valves. The service pattern on steam equipment is heavy on descaling, water treatment verification, and level-probe cleaning.',
          'Water quality is a diagnosis category of its own: if a location kills steamer elements every few months, the fix is not better elements — it is water treatment (filtration, softening, or scale-inhibitor systems) and a descaling schedule. Learn to read scale: white crusty carbonate deposits mean hard water and an absent or exhausted treatment system. Selling the customer a water fix is a legitimate part of the repair.',
        ],
        keyPoints: [
          'Convection oven uneven bakes with good elements: check the circulating fan and door interlock',
          'Conveyor ovens: verify belt transit time with a stopwatch before adjusting temperature',
          'Scale insulates elements (slow heat → burnout), fouls level probes, and plugs solenoids',
          'Repeated element failures at one site = water quality problem, not an element problem',
        ],
        quiz: [
          {
            q: 'A convection oven bakes unevenly although all elements test good. The next component to check is:',
            a: ['The thermostat', 'The circulating fan motor', 'The contactor', 'The supply voltage'],
            correct: 1,
            exp: 'Convection cooking depends on forced air circulation. A dead or slow fan produces uneven, extended bakes even with healthy elements.',
          },
          {
            q: 'A steamer at one site burns out elements every three months. The correct professional fix is:',
            a: ['Install heavier-duty elements', 'Address water quality — treatment and a descaling schedule', 'Increase the thermostat setpoint', 'Replace the steamer'],
            correct: 1,
            exp: 'Scale blankets make elements overheat and fail. New elements will fail on the same schedule until the water is treated and descaling is routine.',
          },
        ],
      },
    ],
    test: [
      { q: 'The mandatory first check on a fryer with no heat is:', a: ['The oil level', 'The high-limit reset (and then why it tripped)', 'The element resistance', 'The thermostat calibration'], correct: 1, exp: 'A tripped manual-reset high-limit is the most common quick find — but every trip demands finding the root cause of the overtemperature.' },
      { q: 'Welded contactor contacts on a fryer cause:', a: ['No heat at all', 'Uncontrolled heating that only the high-limit can stop', 'Slow recovery', 'Nuisance breaker trips'], correct: 1, exp: 'Contacts that never open mean the elements are always powered regardless of the thermostat — the most dangerous fryer failure.' },
      { q: 'One element open on a three-element fryer produces:', a: ['No heat', 'Slow recovery with the remaining elements carrying the load', 'Overheating', 'GFCI trips'], correct: 1, exp: 'The remaining elements still heat the oil, just too slowly — test each element individually to find the open one.' },
      { q: 'A range hot-top plate stuck at full power regardless of the knob setting most likely has:', a: ['A shorted element', 'A failed infinite (cycling) switch', 'A tripped high-limit', 'Low supply voltage'], correct: 1, exp: 'The infinite switch pulses the element on a duty cycle. Stuck contacts in the switch leave the element permanently energized.' },
      { q: 'An induction hob works with a cast-iron pan but not an aluminum one because:', a: ['Aluminum melts too easily', 'Induction heating requires ferromagnetic cookware', 'The aluminum pan is too heavy', 'Cast iron conducts electricity to the coil'], correct: 1, exp: 'The magnetic field induces eddy currents only in ferrous material — aluminum and copper cookware do not couple (on standard induction).' },
      { q: 'The leading environmental killer of induction power boards is:', a: ['Grease on the glass', 'Clogged cooling fans and air filters', 'Hard water', 'Excessive pan weight'], correct: 1, exp: 'Induction is power electronics: IGBTs and boards depend on airflow. Kitchens clog filters with grease-laden dust fast.' },
      { q: 'A convection oven that shuts off heat and fan when the door is released slightly has a problem in:', a: ['The thermostat', 'The door switch or door/hinge alignment', 'The element circuit', 'The control board'], correct: 1, exp: 'The door interlock interrupts fan and heat. If normal door closure does not actuate the switch, the switch or alignment is at fault.' },
      { q: 'On a conveyor oven with undercooked product, before touching the temperature you should:', a: ['Increase the setpoint 25°F', 'Time the belt transit against specification with a stopwatch', 'Replace the elements', 'Slow the belt to half speed'], correct: 1, exp: 'Belt speed is cook time. A drifted speed control or worn drive changes cooking without any temperature fault.' },
      { q: 'Scale on a steamer immersion element causes:', a: ['Faster heating', 'The element to run hotter than design under the scale blanket and eventually burn out', 'Lower water usage', 'Better steam quality'], correct: 1, exp: 'Scale insulates. The element must run hotter to push heat through the deposit — shortening its life dramatically.' },
      { q: 'White crusty deposits and repeated element failures at one location tell you:', a: ['The elements are cheap', 'Hard water with missing or exhausted treatment — fix the water', 'The voltage is too high', 'The staff is misusing the equipment'], correct: 1, exp: 'Carbonate scale is the signature of untreated hard water. Until treatment and descaling are in place, every new element inherits the same death sentence.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 13 — THE REFRIGERATION CYCLE
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-refrigeration-cycle',
    num: 13,
    title: 'The Refrigeration Cycle',
    desc: 'The physics of moving heat: phase change, the four components, refrigerants, pressures, superheat and subcooling — the foundation for all refrigeration service.',
    slides: [
      {
        title: 'Heat, Phase Change, and How Refrigeration Moves It',
        body: [
          'Refrigeration does not make cold — it moves heat. Heat always flows from warmer to cooler. A refrigerator is a machine that pumps heat from somewhere you do not want it (inside the cabinet) to somewhere you can reject it (the air around the condenser), using a refrigerant as the vehicle.',
          'The trick that makes this efficient is phase change. When a liquid evaporates, it absorbs a large amount of heat — the latent heat of vaporization — without changing temperature. When vapor condenses back to liquid, it releases that same heat. Boil a refrigerant inside the cabinet and it soaks up heat there; condense it outside and it dumps that heat outside. Do this in a loop and you have a refrigeration system.',
          'Pressure is the control knob. A refrigerant\'s boiling point depends on its pressure: at low pressure it boils cold (R-404A boils around -15°F at low system pressures), at high pressure it condenses warm (well above kitchen ambient). By compressing the vapor on one side and letting it expand on the other, the system sets up a low-pressure cold side and a high-pressure hot side of the same loop.',
          'This pressure-temperature relationship is the master key of refrigeration diagnosis. Every refrigerant has a published PT chart: for a given pressure, saturated refrigerant sits at a known temperature. Gauges read pressure, but what a tech really reads is temperature — where the refrigerant is boiling and condensing. Everything in Module 15 (troubleshooting) builds on this idea.',
        ],
        tables: [
          {
            caption: 'The two sides of every refrigeration system',
            headers: ['', 'Low side (cold)', 'High side (hot)'],
            rows: [
              ['Pressure', 'Low', 'High'],
              ['Refrigerant state', 'Boiling liquid → vapor (absorbing heat)', 'Condensing vapor → liquid (rejecting heat)'],
              ['Location', 'Evaporator, inside the cabinet', 'Condenser, outside the cabinet'],
            ],
          },
        ],
        keyPoints: [
          'Refrigeration moves heat; it does not create cold',
          'Evaporating liquid absorbs large latent heat; condensing vapor releases it',
          'Pressure sets the boiling point — low pressure boils cold, high pressure condenses warm',
          'The PT chart converts gauge pressure to saturation temperature — the master diagnostic key',
        ],
        quiz: [
          {
            q: 'A refrigeration system cools the cabinet by:',
            a: ['Generating cold at the compressor', 'Boiling refrigerant in the evaporator so it absorbs cabinet heat, then rejecting that heat at the condenser', 'Blowing air over ice', 'Removing humidity only'],
            correct: 1,
            exp: 'Heat is absorbed by evaporating refrigerant inside and released by condensing it outside. The system is a heat pump, not a cold generator.',
          },
          {
            q: 'Why does phase change matter so much in refrigeration?',
            a: ['It looks impressive on gauges', 'Evaporation and condensation move large amounts of latent heat at a constant temperature', 'It prevents compressor wear', 'It changes the refrigerant color'],
            correct: 1,
            exp: 'Latent heat dwarfs sensible heat: boiling and condensing the refrigerant moves far more heat per pound than merely warming or cooling it.',
          },
          {
            q: 'The pressure-temperature (PT) chart tells you:',
            a: ['The refrigerant charge weight', 'The saturation temperature of the refrigerant at a given pressure', 'The compressor amperage', 'The airflow across the coil'],
            correct: 1,
            exp: 'For saturated refrigerant, pressure and temperature lock together. Gauges read pressure; the PT chart translates that into where the refrigerant boils or condenses.',
          },
        ],
      },
      {
        title: 'The Four Components',
        body: [
          'Every mechanical refrigeration system — from a reach-in to a supermarket rack — has the same four components in the same order. The compressor takes cool low-pressure vapor from the evaporator and squeezes it into hot high-pressure vapor. It is the pump of the loop and the biggest electrical load; it is also the most expensive part, which is why so much of service discipline exists to protect it.',
          'The condenser is a coil with a fan (in kitchens, almost always air-cooled) where the hot high-pressure vapor rejects heat to ambient air and condenses into a warm high-pressure liquid. Condensers live where the equipment lives — which in a kitchen means grease and dust. A dirty condenser cannot reject heat, pressures climb, capacity falls, and the compressor overheats: the single most common root cause in kitchen refrigeration failure is a filthy condenser coil.',
          'The metering device separates the high side from the low side: a small restriction that flashes warm high-pressure liquid down to cold low-pressure mist. Kitchen equipment uses capillary tubes (a fixed length of tiny tubing, common in reach-ins) or thermostatic expansion valves (TXVs, which modulate flow to hold a set superheat at the evaporator outlet). The evaporator is the cold coil inside the cabinet where that mist boils, absorbing heat from the cabinet air blown across it by the evaporator fan.',
          'Around the loop: compressor → hot vapor → condenser → warm liquid → metering device → cold boiling mist → evaporator → cool vapor → back to the compressor. Say it until it is automatic. Every gauge reading, every temperature you touch on the tubing, and every fault you will ever diagnose is located somewhere on this loop.',
        ],
        tables: [
          {
            caption: 'The four components',
            headers: ['Component', 'In', 'Out', 'Job'],
            rows: [
              ['Compressor', 'Cool low-pressure vapor', 'Hot high-pressure vapor', 'Pump the loop; raise pressure'],
              ['Condenser', 'Hot high-pressure vapor', 'Warm high-pressure liquid', 'Reject heat to ambient; condense'],
              ['Metering device', 'Warm high-pressure liquid', 'Cold low-pressure mist', 'Restrict flow; drop the pressure'],
              ['Evaporator', 'Cold low-pressure mist', 'Cool low-pressure vapor', 'Absorb cabinet heat; boil the refrigerant'],
            ],
          },
        ],
        keyPoints: [
          'Compressor → condenser → metering device → evaporator — memorize the loop',
          'The most common kitchen refrigeration root cause is a dirty condenser coil',
          'Capillary tube = fixed metering (reach-ins); TXV = modulating metering holding a set superheat',
          'Every fault you will ever diagnose lives somewhere on this four-component loop',
        ],
        quiz: [
          {
            q: 'The correct order of refrigerant flow is:',
            a: ['Compressor → evaporator → metering device → condenser', 'Compressor → condenser → metering device → evaporator', 'Condenser → compressor → evaporator → metering device', 'Evaporator → condenser → compressor → metering device'],
            correct: 1,
            exp: 'Compressor (pressurize) → condenser (reject heat) → metering device (drop pressure) → evaporator (absorb heat) → back to compressor.',
          },
          {
            q: 'The single most common root cause of kitchen refrigeration problems is:',
            a: ['Low refrigerant charge', 'A dirty condenser coil', 'A failed TXV', 'A bad door gasket'],
            correct: 1,
            exp: 'Kitchen air is grease and dust; condensers filter it constantly. A blanketed condenser cannot reject heat — pressures rise, capacity falls, compressors cook.',
          },
          {
            q: 'A TXV differs from a capillary tube because it:',
            a: ['Is cheaper', 'Modulates refrigerant flow to hold a set superheat', 'Only works on freezers', 'Eliminates the need for a compressor'],
            correct: 1,
            exp: 'A cap tube is a fixed restriction. A TXV senses evaporator outlet temperature and adjusts flow to maintain superheat across changing loads.',
          },
        ],
      },
      {
        title: 'Refrigerants, Superheat, and Subcooling',
        body: [
          'Refrigerants are chemicals chosen to boil at useful temperatures under practical pressures. Kitchen equipment historically ran R-22 and R-404A; environmental regulation (ozone depletion, then global warming potential) is driving the industry through R-448A/R-449A blends toward lower-GWP refrigerants like R-290 (propane — flammable, A3 class) and R-454B. Every refrigerant has its own PT chart, and blends have a twist called glide: they boil across a small temperature range rather than at one point.',
          'The law behind this is EPA Section 608: you must hold EPA 608 certification to purchase most refrigerants or open a system that contains them. Venting refrigerant is illegal — recovery into approved cylinders is mandatory. A kitchen FSE working refrigeration needs 608 Type I (small appliances) at minimum, and realistically Type II (high-pressure systems). This course prepares you for the concepts; the 608 exam itself is a separate certification you will take — and module 27 maps that path.',
          'Superheat and subcooling are the two numbers that turn gauge readings into diagnosis. Superheat = how many degrees the vapor leaving the evaporator is above its saturation (boiling) temperature. It proves all the liquid finished boiling before reaching the compressor — liquid entering a compressor destroys it (slugging). Low superheat warns of flooding; high superheat means the evaporator is being starved of refrigerant.',
          'Subcooling = how many degrees the liquid leaving the condenser is below its saturation (condensing) temperature. It proves the refrigerant fully condensed and there is solid liquid feeding the metering device. Low subcooling suggests undercharge; high subcooling suggests overcharge or liquid backing up in the condenser. Measure both with a PT chart, an accurate pipe thermometer, and your gauges: superheat and subcooling together tell you what the charge and the metering device are actually doing.',
        ],
        tables: [
          {
            caption: 'Superheat and subcooling quick reference',
            headers: ['Measurement', 'Where', 'Proves', 'Low reading suggests', 'High reading suggests'],
            rows: [
              ['Superheat', 'Evaporator outlet (suction line)', 'All liquid boiled off — compressor is safe', 'Flooding risk / overfeeding', 'Starved evaporator (undercharge or metering restriction)'],
              ['Subcooling', 'Condenser outlet (liquid line)', 'Full condensation — solid liquid feed', 'Undercharge', 'Overcharge / liquid backing up'],
            ],
          },
        ],
        keyPoints: [
          'EPA 608 certification is legally required to buy refrigerant and open systems; venting is illegal',
          'Superheat (evaporator outlet above saturation) proves the compressor is protected from liquid',
          'Subcooling (condenser outlet below saturation) proves solid liquid feeds the metering device',
          'High superheat = starved evaporator; low subcooling = undercharge — the two numbers diagnose the charge',
        ],
        quiz: [
          {
            q: 'Superheat measured at the evaporator outlet proves that:',
            a: ['The condenser is clean', 'All liquid refrigerant boiled off before the vapor reaches the compressor', 'The charge is full', 'The thermostat is calibrated'],
            correct: 1,
            exp: 'Vapor above saturation temperature cannot contain liquid. Superheat is the proof that the compressor is protected from slugging.',
          },
          {
            q: 'A system shows high superheat and low subcooling. The classic interpretation is:',
            a: ['Overcharge', 'Undercharge — the evaporator is starved and little liquid is stacked in the condenser', 'Dirty evaporator', 'Failed compressor valves'],
            correct: 1,
            exp: 'Too little refrigerant starves the evaporator (high superheat) and leaves minimal condensed liquid (low subcooling) — the fingerprint of undercharge or a big leak.',
          },
          {
            q: 'Venting refrigerant to the atmosphere while servicing is:',
            a: ['Acceptable for small amounts', 'Illegal under EPA Section 608 — recovery is mandatory', 'Allowed for non-flammable refrigerants', 'Allowed if the customer approves'],
            correct: 1,
            exp: 'Section 608 prohibits knowingly venting regulated refrigerants. Recovery into approved cylinders is required, and certification is required to open systems.',
          },
        ],
      },
    ],
    test: [
      { q: 'Refrigeration systems cool by:', a: ['Creating cold', 'Moving heat from inside the cabinet to the ambient air', 'Dehumidifying only', 'Slowing molecular motion directly'], correct: 1, exp: 'A refrigeration system is a heat pump: absorb heat in the evaporator, reject it at the condenser.' },
      { q: 'The component that raises refrigerant pressure and drives the loop is the:', a: ['Condenser', 'Compressor', 'Evaporator', 'TXV'], correct: 1, exp: 'The compressor pumps low-pressure vapor up to high pressure, driving circulation.' },
      { q: 'Heat is rejected to the surrounding air at the:', a: ['Evaporator', 'Condenser', 'Metering device', 'Suction line'], correct: 1, exp: 'Hot high-pressure vapor condenses in the condenser, releasing its heat to ambient.' },
      { q: 'The metering device:', a: ['Raises pressure', 'Drops high-pressure liquid to low-pressure mist feeding the evaporator', 'Filters the refrigerant', 'Measures the charge'], correct: 1, exp: 'Cap tube or TXV — a restriction that separates high side from low side and flashes liquid to cold mist.' },
      { q: 'Boiling point of a refrigerant depends on:', a: ['Its color', 'Its pressure', 'The compressor brand', 'The cabinet size'], correct: 1, exp: 'Pressure sets saturation temperature — the foundation of the PT chart and all gauge diagnosis.' },
      { q: 'A dirty condenser coil causes:', a: ['Lower head pressure', 'High head pressure, lost capacity, and compressor overheating', 'Higher superheat only', 'Frost on the evaporator'], correct: 1, exp: 'Blocked heat rejection drives the high side up, robs capacity, and overheats the compressor — the #1 kitchen refrigeration root cause.' },
      { q: 'Superheat is measured at the:', a: ['Condenser outlet', 'Evaporator outlet / suction line', 'Compressor discharge', 'Metering device inlet'], correct: 1, exp: 'Superheat = suction line temperature minus low-side saturation temperature from the PT chart.' },
      { q: 'Liquid refrigerant entering a compressor causes:', a: ['Better cooling', 'Slugging that can destroy the compressor', 'Higher efficiency', 'Lower amp draw'], correct: 1, exp: 'Liquids are incompressible. Slugging breaks valves and rods — superheat exists to prove liquid never reaches the compressor.' },
      { q: 'High subcooling with low superheat suggests:', a: ['Undercharge', 'Overcharge or refrigerant overfeeding', 'A clean condenser', 'Normal operation'], correct: 1, exp: 'Excess refrigerant stacks liquid in the condenser (high subcooling) and risks flooding the evaporator (low superheat).' },
      { q: 'To legally open and service refrigerant-containing systems you must:', a: ['Notify the building owner', 'Hold EPA Section 608 certification and recover rather than vent', 'Use only R-290', 'Work under 5 lbs of charge'], correct: 1, exp: 'EPA 608 certification is the legal gate for refrigerant work; recovery is mandatory and venting is illegal.' },
    ],
  },
];
