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

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 14 — COMMERCIAL REFRIGERATION EQUIPMENT
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-refrigeration-equipment',
    num: 14,
    title: 'Commercial Refrigeration Equipment',
    desc: 'Walk-ins, reach-ins, blast chillers, defrost systems, gaskets, and drains — the equipment the refrigeration cycle lives inside.',
    slides: [
      {
        title: 'Walk-Ins and Reach-Ins',
        body: [
          'A walk-in cooler or freezer is a refrigerated room: insulated panels locked together, a door, an evaporator coil unit inside, and a condensing unit (compressor + condenser) on the roof, on the ground outside, or on top of the box. Coolers hold roughly 35-38°F; freezers hold roughly -10 to 0°F. That difference drives real design differences: freezers need door-frame heaters to keep the door from freezing shut, heated pressure-relief ports, and active defrost.',
          'The box itself is part of the refrigeration system. Damaged panel insulation, an open pressure-relief port, a door that does not self-close, or torn door gaskets all add heat load the machinery must remove. A walk-in that "cannot hold temperature" with a perfectly healthy refrigeration circuit usually has a load problem: staff propping the door, a failed door closer, gaskets you can pass a dollar bill through, or hot product loaded straight into the box.',
          'Reach-ins, undercounters, and refrigerated prep tables are self-contained versions of the same system, typically with capillary-tube metering and the condensing unit in the base or top. Their special enemy is placement: shoved against a wall, next to the fryer bank, with a condenser fed 100°F air through a grille packed with grease dust. Verify clearance and coil condition before deeper diagnosis — many "failing" reach-ins are simply suffocating.',
          'Prep tables add a design quirk: the food pans over the rail are cooled indirectly, and lids left open or overfilled pans defeat it. Prep rails failing food-safety temperature checks with a healthy system are usually an operations problem — document it and educate the customer rather than chasing phantom refrigerant faults.',
        ],
        keyPoints: [
          'Freezers need door-frame heaters and heated relief ports — coolers usually do not',
          '"Cannot hold temp" with a healthy circuit = load problem: doors, gaskets, hot product',
          'Reach-ins suffocate: verify condenser clearance and coil cleanliness before deep diagnosis',
          'Prep-rail temperature complaints are often operational (open lids, overfilled pans)',
        ],
        quiz: [
          {
            q: 'A walk-in freezer door keeps freezing shut. The failed component is most likely the:',
            a: ['Evaporator fan', 'Door-frame heater', 'Compressor', 'Defrost timer'],
            correct: 1,
            exp: 'Freezer door frames are heated to prevent melt/refreeze bonding at the gasket. A dead frame heater lets the door freeze to the frame.',
          },
          {
            q: 'A reach-in beside the fryer bank runs warm; pressures show high head pressure and the condenser coil is packed with grease dust. The first corrective action is:',
            a: ['Add refrigerant', 'Clean the condenser coil and verify clearance/airflow', 'Replace the compressor', 'Lower the thermostat setpoint'],
            correct: 1,
            exp: 'A blocked condenser in hot air cannot reject heat. Clean the coil and restore airflow before judging anything else — most "failing" reach-ins are suffocating.',
          },
        ],
      },
      {
        title: 'Defrost Systems',
        body: [
          'Every evaporator running below freezing grows frost: humidity from the air freezes onto the coil. Frost insulates the coil and blocks airflow, so freezer evaporators must be defrosted on a schedule. Coolers running above-freezing coil temperatures can usually defrost passively (off-cycle defrost — the fans keep running between cooling calls and cabinet air melts the light frost).',
          'Freezers need active defrost, two main kinds. Electric defrost: heating elements clamped into the evaporator coil energize while the compressor stops; a defrost termination thermostat ends the cycle when the coil is clear, and a fail-safe timer ends it regardless. Hot-gas defrost: the system routes hot discharge gas through the evaporator, melting frost from inside the tubing — faster and more efficient, more common on ice machines and larger systems.',
          'The defrost cycle is orchestrated by a timer or electronic control: typically 2-4 defrosts per day, 20-45 minutes maximum. During defrost the evaporator fans stop (so heat is not blown into the box) and after defrost many systems delay the fans until the coil re-freezes the remaining droplets. Meltwater runs down the drain pan and out a heated drain line (freezer drains must be heated or the drain plug of ice defeats everything).',
          'Defrost failures have signatures. Completely iced coil block = no defrost happening: dead timer, dead elements (measure their resistance), or a stuck termination stat. Ice only on part of the coil or refrozen sheets in the pan = drainage problem: dead drain-pan heater or drain-line heater, plugged drain. Box warm right after visible steam/water events = defrost stuck ON (welded timer contacts or shorted termination stat). Learn to read the ice — its pattern tells you which part failed.',
        ],
        tables: [
          {
            caption: 'Reading the ice',
            headers: ['What you see', 'Likely failure'],
            rows: [
              ['Solid frost block over whole coil', 'No defrost: timer, elements, or termination stat'],
              ['Clear coil but ice sheets in drain pan', 'Drain pan/line heater dead or drain plugged'],
              ['Icicles below the evaporator', 'Drain overflow — plugged or unheated drain'],
              ['Coil clear, box warm, water vapor present', 'Defrost stuck on — welded contacts / shorted stat'],
            ],
          },
        ],
        keyPoints: [
          'Freezer evaporators need active defrost (electric elements or hot gas) on a timed schedule',
          'Fans stop during defrost; freezer drain lines must be heated',
          'Full frost block = defrost not happening; ice in the pan = drainage/heater failure',
          'Defrost termination stat ends the cycle; the timer is the fail-safe',
        ],
        quiz: [
          {
            q: 'A freezer evaporator is a solid block of frost. The defrost component chain to check is:',
            a: ['Compressor, condenser, TXV', 'Timer/control, defrost elements, termination thermostat', 'Door gasket and hinges', 'Thermostat and contactor'],
            correct: 1,
            exp: 'A full frost block means defrost cycles are not happening or not producing heat: verify the timer initiates, the elements draw current (or measure resistance), and the termination stat is not stuck open-circuit.',
          },
          {
            q: 'The coil defrosts fine, but sheets of refrozen ice cover the drain pan and icicles hang below it. The failure is:',
            a: ['Not enough defrost cycles', 'The drain pan or drain line heater is dead, or the drain is plugged', 'The evaporator fan runs during defrost', 'An overcharged system'],
            correct: 1,
            exp: 'Meltwater that cannot leave refreezes in the pan and overflows. Defrost is working; drainage is not.',
          },
          {
            q: 'Why do evaporator fans stop during defrost?',
            a: ['To save energy', 'So defrost heat is not blown into the product zone', 'To protect the fan blades from ice', 'To reduce noise'],
            correct: 1,
            exp: 'Running fans during defrost would pump element heat and moisture straight into the box, warming product and frosting everything else.',
          },
        ],
      },
      {
        title: 'Blast Chillers, Gaskets, and the Service Walkaround',
        body: [
          'Blast chillers take hot food through the food-danger zone fast (roughly 140°F to below 40°F within safety guidelines) using oversized refrigeration and violent airflow, monitored by food probes. They are heavily loaded, control-rich machines: service calls revolve around probe accuracy, airflow (fans, and door seals that must survive constant loading), and control faults. Verify probes in ice water (32°F) — a drifted probe fails cycles even when refrigeration is perfect.',
          'Door gaskets deserve respect as refrigeration components. A leaking gasket is a 24/7 heat and humidity leak: capacity loss, coil frost, drain load, and energy waste. Test with the paper strip pull — the gasket should grip a strip anywhere around the door. Most snap or press into a retainer channel and replace in minutes. While at the door: check the closer, the hinges (a sagging door never seals), and freezer frame-heater warmth.',
          'Build a standard refrigeration walkaround and run it on every call before opening gauges: 1) Box temperature vs setpoint — trust your thermometer, not the display. 2) Doors: gaskets, closers, frame heat. 3) Evaporator: frost pattern, fans running, coil condition, drain clear. 4) Condensing unit: coil clean, fan running, clearance, unusual noise. 5) Product loading: airflow blocked? Hot product? 6) Only then, if the answer is not already found, connect gauges — every gauge connection loses a little refrigerant and risks contamination.',
          'This discipline matters commercially too: half of kitchen refrigeration complaints resolve without opening the system — a cleaned coil, a swapped gasket, a cleared drain, a corrected loading habit. Fast, cheap, honest fixes build the customer trust that keeps service contracts alive.',
        ],
        keyPoints: [
          'Blast chiller complaints: verify food probes in ice water before blaming refrigeration',
          'Gasket test: a paper strip should grip anywhere around the door',
          'Walk the system — box temp, doors, evaporator, condenser, loading — before connecting gauges',
          'Half of refrigeration complaints resolve without opening the sealed system',
        ],
        quiz: [
          {
            q: 'A blast chiller aborts cycles claiming food never reaches temperature, but the cabinet pulls down normally. Check first:',
            a: ['The compressor valves', 'The food probe calibration in ice water', 'The refrigerant charge', 'The door hinges'],
            correct: 1,
            exp: 'The cycle is judged by the food probe. A drifted probe fails cycles with perfect refrigeration — ice-water verification takes two minutes.',
          },
          {
            q: 'Why should gauges be the last step, not the first?',
            a: ['Gauges are usually inaccurate', 'Most complaints resolve at coils, doors, drains, and loading — and every gauge connection costs refrigerant and risks contamination', 'Customers dislike seeing gauges', 'Pressures never indicate faults'],
            correct: 1,
            exp: 'The walkaround finds the majority of faults non-invasively. Opening ports on a sealed, healthy system does it small harm for no gain.',
          },
        ],
      },
    ],
    test: [
      { q: 'Typical holding temperatures are approximately:', a: ['Cooler 45-50°F, freezer 20°F', 'Cooler 35-38°F, freezer -10 to 0°F', 'Cooler 32°F, freezer -40°F', 'Cooler 40-45°F, freezer 10°F'], correct: 1, exp: 'Commercial coolers hold roughly 35-38°F; freezers hold roughly -10 to 0°F.' },
      { q: 'Door-frame heaters on walk-in freezers exist to:', a: ['Warm the product', 'Prevent the door from freezing shut and the gasket from icing', 'Assist defrost', 'Reduce compressor load'], correct: 1, exp: 'Without frame heat, melt/refreeze bonds the gasket and door to the frame.' },
      { q: 'A walk-in with a healthy refrigeration circuit that cannot hold temperature most often has:', a: ['A bad PT chart', 'A load problem: propped/leaking doors, torn gaskets, or hot product', 'The wrong refrigerant', 'An oversized compressor'], correct: 1, exp: 'Excess heat load defeats good machinery — doors, gaskets, and loading habits are the usual culprits.' },
      { q: 'Off-cycle defrost works only when:', a: ['The coil runs below -10°F', 'The coil temperature is near/above freezing so cabinet air can melt light frost between cooling calls', 'Elements are fitted', 'Hot gas is available'], correct: 1, exp: 'Coolers can defrost passively; freezers cannot — they need electric or hot-gas defrost.' },
      { q: 'During electric defrost, the evaporator fans:', a: ['Run at high speed', 'Stop, so heat is not blown into the box', 'Reverse direction', 'Cycle on and off'], correct: 1, exp: 'Fans stop during defrost and typically delay after it, so element heat and moisture stay at the coil.' },
      { q: 'A completely frost-blocked freezer evaporator indicates:', a: ['Too many defrosts', 'Defrost is not occurring: timer/control, elements, or termination stat', 'A plugged drain', 'An overcharge'], correct: 1, exp: 'No effective defrost lets frost accumulate into a block — verify initiation, element heat, and termination.' },
      { q: 'Refrozen ice sheets in the drain pan point to:', a: ['Failed defrost elements', 'A dead pan/drain heater or plugged drain', 'A failed door closer', 'Low charge'], correct: 1, exp: 'Defrost melted the frost; the water could not leave. Drainage and its heaters are the fault.' },
      { q: 'Blast chillers judge cycle success primarily by:', a: ['Elapsed time only', 'Food probe temperature', 'Compressor amp draw', 'Door openings'], correct: 1, exp: 'The food probe drives the cycle — probe accuracy is the first check on failed-cycle complaints.' },
      { q: 'The paper-strip test checks:', a: ['Evaporator airflow', 'Door gasket sealing grip around the full perimeter', 'Drain flow', 'Frame heater current'], correct: 1, exp: 'A healthy gasket grips a paper strip at every point around the door.' },
      { q: 'Gauges should be connected:', a: ['First, on every call', 'Only after the walkaround (temps, doors, coils, drains, loading) fails to find the fault', 'Only on freezers', 'Never'], correct: 1, exp: 'Most complaints resolve non-invasively; each gauge connection costs refrigerant and risks contamination.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 15 — REFRIGERATION TROUBLESHOOTING & SERVICE
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-refrigeration-service',
    num: 15,
    title: 'Refrigeration Troubleshooting & Service',
    desc: 'Systematic diagnosis with gauges and thermometers, leak detection, recovery and charging, and compressor electrical testing.',
    slides: [
      {
        title: 'Reading the System: Pressures, Superheat, Subcooling',
        body: [
          'With the walkaround done and the fault still hidden, it is gauge time. Connect to the service ports, read low-side and high-side pressures, convert both to saturation temperatures with the PT chart for the refrigerant on the data plate, and measure actual line temperatures at the evaporator outlet and condenser outlet. Now you have superheat and subcooling — and the system will tell you its story.',
          'Learn the classic patterns. Low suction + high superheat + low subcooling = undercharge (or a leak — same thing, one is just slower). Low suction + high superheat + normal/high subcooling = a starved evaporator with plenty of liquid available: restricted metering device or plugged filter-drier. High head + high subcooling = overcharge or condenser problems; check the coil and fan before removing charge. Low suction + low airflow evidence (iced coil, dead fan) = an airflow problem masquerading as a refrigerant problem — fix airflow first, then re-evaluate.',
          'A restricted filter-drier gives itself away with a temperature drop across it: feel or measure inlet vs outlet — a drier is not a metering device and should have no meaningful temperature difference. Frost or sweat starting at the drier or a kink in the liquid line marks the false restriction point.',
          'Two cardinal rules. First: never adjust charge based on pressures alone — superheat and subcooling are the truth-tellers; pressures move with load, airflow, and ambient. Second: diagnose to a root cause, not a symptom. Adding refrigerant to a leaking system without finding the leak is not a repair — it is renting the customer their own equipment failure on a schedule, and with regulated refrigerants it is increasingly a compliance problem too.',
        ],
        tables: [
          {
            caption: 'Classic gauge patterns',
            headers: ['Suction', 'Head', 'Superheat', 'Subcooling', 'Points to'],
            rows: [
              ['Low', 'Low', 'High', 'Low', 'Undercharge / leak'],
              ['Low', 'Normal-high', 'High', 'Normal-high', 'Restricted metering / plugged drier'],
              ['High-ish', 'High', 'Low', 'High', 'Overcharge (or condenser problem)'],
              ['Low', 'Low-normal', 'Low', 'Normal', 'Evaporator airflow (frost, dead fan)'],
            ],
          },
        ],
        keyPoints: [
          'Convert pressures to saturation temps; superheat and subcooling tell the story',
          'High superheat + low subcooling = undercharge; high superheat + good subcooling = restriction',
          'A filter-drier with a temperature drop across it is restricted',
          'Never charge by pressures alone, and never top off a leaking system without finding the leak',
        ],
        quiz: [
          {
            q: 'Low suction pressure, high superheat, and normal subcooling most likely indicate:',
            a: ['Undercharge', 'A restricted metering device or plugged filter-drier', 'A dirty condenser', 'An overcharge'],
            correct: 1,
            exp: 'Plenty of liquid is condensed (normal subcooling) but the evaporator is starved (high superheat, low suction): the liquid is being held back by a restriction.',
          },
          {
            q: 'You feel a distinct temperature drop from the filter-drier inlet to its outlet. This means:',
            a: ['Normal operation', 'The drier is restricted and acting like a metering device', 'The charge is overfilled', 'The TXV has failed open'],
            correct: 1,
            exp: 'A drier should pass liquid with no meaningful pressure or temperature change. A temperature drop marks a pressure drop — the drier is plugged.',
          },
          {
            q: 'Why is topping off a leaking system without leak repair unacceptable?',
            a: ['It voids the gauge warranty', 'The leak persists, the customer pays repeatedly, and venting regulated refrigerant into the atmosphere continues', 'Refrigerant brands cannot be mixed', 'It overloads the compressor'],
            correct: 1,
            exp: 'It is a non-repair: the failure returns on schedule, the refrigerant bill repeats, and regulated refrigerant keeps escaping. Find and fix the leak.',
          },
        ],
      },
      {
        title: 'Leak Detection, Recovery, and Charging',
        body: [
          'Finding leaks is a craft with layered tools. Start visual: oil stains mark leak points, because refrigerant carries oil with it as it escapes — look at braze joints, flare fittings, coil return bends, and anywhere tubing rubs. Electronic leak detectors sniff parts-per-million concentrations; move slowly (an inch per second) below joints, since refrigerant is heavier than air. Soap-bubble solution confirms and pinpoints what the sniffer suspects. UV dye injected into the system marks slow leaks for the follow-up visit.',
          'Once the system must be opened: recovery is the legal and professional first step. Connect the recovery machine and pull the refrigerant into a rated recovery cylinder — never fill any cylinder beyond 80%, and use a scale. After repair, pressure-test with dry nitrogen (never oxygen, never air), soap-testing the repair, then evacuate with a vacuum pump to below 500 microns measured on a micron gauge. The vacuum both removes air and boils off moisture; a system that will not hold its vacuum still leaks or is still wet.',
          'Charging: weigh it in. The data plate states the factory charge for self-contained equipment — a scale and patience beat guesswork every time. On TXV systems charge to subcooling; on cap-tube systems charge to superheat, checking against manufacturer charts. Charge liquid into the high side of a non-running system or throttle vapor into the suction of a running one — never dump liquid into the suction line of a running compressor.',
          'Respect the newer refrigerants: A2L (mildly flammable, like R-454B) and A3 (flammable, R-290 propane) classes are spreading through kitchen equipment. They demand rated recovery machines, spark-free tools and ventilation discipline. R-290 self-contained units often have tiny critical charges and sealed circuits by design — many are treated as replace-the-sealed-system rather than field-repair. Check the data plate class before you open anything.',
        ],
        keyPoints: [
          'Oil stains mark leaks; sniff slowly below joints; soap confirms; UV dye catches slow leaks',
          'Recover before opening; pressure-test with dry nitrogen only; evacuate below 500 microns',
          'Weigh the charge in per the data plate; TXV systems verify by subcooling, cap-tube by superheat',
          'A2L/A3 refrigerants (R-454B, R-290) require rated equipment and spark-free discipline',
        ],
        quiz: [
          {
            q: 'The correct gas for pressure-testing a repaired system is:',
            a: ['Compressed air', 'Oxygen', 'Dry nitrogen', 'CO2 from a beverage tank'],
            correct: 2,
            exp: 'Dry nitrogen is inert and moisture-free. Air introduces moisture; oxygen with refrigerant oil is an explosion hazard.',
          },
          {
            q: 'Evacuating to below 500 microns proves:',
            a: ['The compressor is healthy', 'The system is leak-tight and dry (moisture boiled off)', 'The charge weight is correct', 'The TXV superheat is set'],
            correct: 1,
            exp: 'A deep vacuum that holds shows no leaks and no remaining moisture off-gassing — the standard of a clean, dry system.',
          },
          {
            q: 'The safest, most accurate way to charge a self-contained reach-in is:',
            a: ['Add gas until the box feels cold', 'Weigh in the data-plate charge with a scale', 'Charge until the sight glass clears', 'Fill until head pressure reaches 300 psi'],
            correct: 1,
            exp: 'Self-contained equipment lists its exact factory charge. Weighing it in removes every guess; verify with superheat/subcooling afterward.',
          },
        ],
      },
      {
        title: 'Compressor Electrical Diagnosis',
        body: [
          'When the box is warm and the compressor is silent, the question is electrical before it is mechanical. Single-phase hermetic compressors have three terminals: Common, Run, and Start (C-R-S). With power locked out and wires removed, measure the three winding resistances: R-to-S should equal C-R plus C-S. An open winding (OL) or a short to the shell (any continuity terminal-to-case) condemns the compressor. Mark the terminal identities before disconnecting anything.',
          'Most single-phase compressors start via a relay and capacitor set: a start capacitor (high µF, momentary) switched out by a potential relay, plus a run capacitor that stays in circuit. Capacitor testing is a Module 10 skill: discharge safely, then measure µF against the rating (typically ±6-10%). A humming compressor that trips its overload usually has failed start components — always test and replace those before condemning the compressor itself. The overload protector (a thermal/current switch in series with Common) can also fail: an overload that reads open when cool is dead.',
          'A compressor that will not start on a hot condenser may be in thermal overload lockout: give it time to cool, then investigate why it overheated — dirty condenser, high head pressure, low charge cooling the motor insufficiently, or voltage sag under load. Measure voltage at the compressor terminals during a start attempt: a big sag implicates the supply or connections, not the compressor.',
          'Mechanical condemnation is the last resort and has evidence standards: correct windings, correct capacitors, correct voltage, and it still trips instantly or draws locked-rotor amps → seized. Runs but cannot build differential pressure with valves confirmed by a pump-down or manufacturer test → broken valves. Compressor replacement also demands answering why it died — acid test the oil on burnouts and install the correct suction/liquid driers — or the replacement inherits the same death.',
        ],
        keyPoints: [
          'C-R-S winding check: R-S = C-R + C-S; open winding or short-to-case condemns it',
          'Humming + overload trips = test the start relay and capacitors first',
          'Hot lockout: let it cool and find the overheating cause; check for voltage sag at start',
          'On burnouts, acid-test the oil and fit driers, or the new compressor dies the same death',
        ],
        quiz: [
          {
            q: 'On a single-phase hermetic compressor, resistance R-to-S measures the sum of C-R and C-S because:',
            a: ['The windings are shorted', 'Run and Start windings join at the Common terminal', 'The overload adds resistance', 'The capacitor is in circuit'],
            correct: 1,
            exp: 'Common is the junction of the two windings; measuring across R and S traverses both windings in series.',
          },
          {
            q: 'A compressor hums for a few seconds then clicks off repeatedly. Before condemning it you must:',
            a: ['Recover the charge', 'Test the start relay, start capacitor, and run capacitor', 'Replace the thermostat', 'Add refrigerant'],
            correct: 1,
            exp: 'Failed start gear produces exactly this symptom on a healthy compressor. Start components are cheap; compressors are not.',
          },
          {
            q: 'Continuity between any compressor terminal and the steel shell means:',
            a: ['Normal grounding', 'A grounded (shorted) winding — the compressor is condemned', 'The overload is closed', 'The capacitor is charged'],
            correct: 1,
            exp: 'Windings must be isolated from the case. Any terminal-to-shell continuity is a grounded motor — replacement, plus finding out why.',
          },
        ],
      },
    ],
    test: [
      { q: 'The two measurements that reveal what the refrigerant charge is doing are:', a: ['Amps and volts', 'Superheat and subcooling', 'Suction pressure and box temperature', 'Head pressure and ambient'], correct: 1, exp: 'Pressures alone move with load and ambient; superheat and subcooling anchor the diagnosis.' },
      { q: 'Undercharge classically shows:', a: ['Low superheat, high subcooling', 'High superheat, low subcooling', 'Low superheat, low subcooling', 'Normal superheat, high subcooling'], correct: 1, exp: 'A starved evaporator (high superheat) with little liquid stacked in the condenser (low subcooling).' },
      { q: 'A temperature drop across the filter-drier indicates:', a: ['Normal function', 'Restriction — the drier is plugged', 'Overcharge', 'A failed condenser fan'], correct: 1, exp: 'Temperature drop = pressure drop where none belongs. The drier is choking liquid flow.' },
      { q: 'An iced-over evaporator with a dead fan produces gauge readings that mimic:', a: ['Overcharge', 'A refrigerant-side fault — fix airflow first, then re-evaluate', 'A bad compressor', 'A plugged drain'], correct: 1, exp: 'No airflow means no heat load reaching the coil: suction drops and readings lie until airflow is restored.' },
      { q: 'Electronic leak detection should be performed:', a: ['Quickly, above the joints', 'Slowly, below joints — refrigerant is heavier than air', 'Only with the system off', 'Only outdoors'], correct: 1, exp: 'Move about an inch per second and probe beneath fittings where heavier-than-air refrigerant drifts.' },
      { q: 'Recovery cylinders must never be filled beyond:', a: ['50%', '80%', '95%', '100%'], correct: 1, exp: '80% fill by weight leaves expansion room — overfilled cylinders are hydrostatic bombs. Use a scale.' },
      { q: 'A system evacuated to 400 microns that rises rapidly and stalls around 1,500 microns is:', a: ['Dry and tight', 'Still wet (moisture boiling off)', 'Leaking to atmosphere', 'Overcharged'], correct: 1, exp: 'A stall in the low thousands is moisture vapor pressure; a continuous rise to atmospheric indicates a leak.' },
      { q: 'The preferred charging method for self-contained kitchen refrigeration is:', a: ['Charge to a clear sight glass', 'Weigh in the data-plate charge', 'Charge to 20 psi suction', 'Charge until the compressor quiets'], correct: 1, exp: 'The factory charge is printed on the plate — weigh it in, then verify with superheat/subcooling.' },
      { q: 'A humming single-phase compressor that trips its overload most often needs:', a: ['A new compressor', 'New start relay/capacitors after testing them', 'More refrigerant', 'A larger overload'], correct: 1, exp: 'Failed start components mimic compressor death. Test the cheap parts before condemning the expensive one.' },
      { q: 'After a compressor burnout, the replacement must be protected by:', a: ['A larger breaker', 'Acid-testing the oil and installing appropriate clean-up driers', 'Higher superheat', 'A hard-start kit only'], correct: 1, exp: 'Burnout acids remain in the system. Without clean-up, the new compressor inherits the contamination and fails.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 16 — ICE MACHINES
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-ice-machines',
    num: 16,
    title: 'Ice Machines',
    desc: 'Cube, flake, and nugget machines — the harvest cycle, water systems, cleaning, and troubleshooting the kitchen\'s most water-dependent refrigeration.',
    slides: [
      {
        title: 'How Ice Machines Make Ice',
        body: [
          'An ice machine is a refrigeration system whose evaporator is a mold. Cube machines pump a film of water over a cold grid or vertical plate evaporator; layers freeze until a thickness sensor (or timed conductivity probe) declares the slab ready. Then comes the trick that defines the breed: harvest. The machine runs hot discharge gas through the evaporator (hot-gas defrost on demand), warming the plate just enough to release the ice, which slides into the bin. Freeze, harvest, repeat.',
          'Flake and nugget machines freeze continuously instead: water enters a cylindrical evaporator where a rotating auger scrapes ice off the wall and extrudes it — soft flake for display and healthcare, compressed nugget ("chewable ice") for beverages. No harvest cycle, but a gearmotor and auger bearing that live under constant load: rumbling, squealing, or metal flakes in the ice mean auger or bearing wear, and a seized auger takes the gearbox with it.',
          'Bin control shuts the machine down when ice backs up to a sensor — a thermostat bulb, mechanical flap, or photo-eye. A machine that never shuts off overflows the bin; one that never starts may just have a blocked or dirty bin sensor. Photo-eyes fouled with scale dust are a thirty-second fix that looks like a dead machine.',
          'Know the cycle to diagnose the cycle. Watch a full freeze-harvest sequence before touching anything: How long is freeze? Does the slab release cleanly or hang? Does water flow evenly over the plate? A ten-minute observation usually localizes the fault to water, refrigeration, or harvest — the three subsystems every ice complaint lives in.',
        ],
        keyPoints: [
          'Cube machines alternate freeze and hot-gas harvest; flake/nugget machines freeze continuously via auger',
          'Auger noise or metal in the ice = bearing/auger wear — act before the gearbox dies',
          'A "dead" machine may be a dirty bin sensor or fouled photo-eye',
          'Watch one full cycle before diagnosing: water, refrigeration, or harvest',
        ],
        quiz: [
          {
            q: 'Harvest on a cube machine is accomplished by:',
            a: ['Electric heaters in the bin', 'Routing hot discharge gas through the evaporator to release the slab', 'Reversing the water pump', 'Stopping the compressor until the ice melts free'],
            correct: 1,
            exp: 'Hot-gas harvest warms the evaporator from inside, releasing the ice sheet without melting significant product.',
          },
          {
            q: 'A nugget ice machine produces a grinding rumble and fine metal glitter in the ice. This indicates:',
            a: ['Normal break-in', 'Auger and bearing wear — service now before the gearmotor is destroyed', 'Low water pressure', 'A refrigerant overcharge'],
            correct: 1,
            exp: 'Metal in the ice is auger/bearing material. Continued operation seizes the auger and takes the gearbox — and metal in ice is a health hazard.',
          },
        ],
      },
      {
        title: 'Water: The Other Half of the Machine',
        body: [
          'Every pound of ice is a pound of water that flowed through a valve, a reservoir, a pump, and a distributor. Water faults cause the majority of ice machine complaints. Low incoming pressure or a clogged inlet strainer starves the reservoir; a weak or scaled circulation pump films the plate unevenly (thin, cloudy, or partial slabs); a blocked distributor tube makes stripes of missing cubes — the ice itself is a map of the water flow.',
          'Scale is enemy number one. As water freezes, minerals concentrate in the remaining reservoir water, so ice machines scale faster than any other water appliance. Scale on the evaporator makes ice stick through harvest (long or failed harvests); scale on probes blinds thickness and level sensing; scale in the pump and distributor starves the flow. This is why filtration is mandatory and why phosphate or scale-inhibitor cartridges exist specifically for ice.',
          'Cleaning is scheduled service, not optional: an acid-descale cycle (nickel-safe scale remover circulated per the manufacturer\'s procedure) followed by sanitizing (the slime and mold side of the machine — air carries yeast into this warm, wet cabinet). Twice a year minimum, quarterly in bakeries and pizzerias where airborne yeast thrives. Document it: ice is legally food, and health inspectors treat the machine as a food-contact surface.',
          'Freeze-up is the classic terminal symptom: a slab that would not release (scale, weak harvest, or thickness probe fault) freezes the next batch on top of itself until the evaporator is a glacier. Thaw completely (no picks, no torches near the plate — puncturing an evaporator totals the machine), then find the root cause: descale, verify harvest gas flow, and test the thickness sensor. A freeze-up without a root-cause fix will repeat within weeks.',
        ],
        keyPoints: [
          'Read the ice: thin/cloudy/partial slabs and missing-cube stripes map the water faults',
          'Ice machines scale faster than any other appliance — filtration plus descaling schedule is mandatory',
          'Clean AND sanitize on schedule; ice is food and the machine is a food-contact surface',
          'Freeze-ups: thaw fully without tools, then fix the root cause or it repeats',
        ],
        quiz: [
          {
            q: 'A cube machine makes slabs with two vertical stripes of missing cubes. The cause is:',
            a: ['Low refrigerant', 'Blocked passages in the water distributor tube', 'A failed harvest valve', 'A bad bin thermostat'],
            correct: 1,
            exp: 'Each distributor opening feeds a column of the plate. Blocked holes starve those columns — the missing cubes literally point at the blockage.',
          },
          {
            q: 'Ice machines must be periodically sanitized, not just descaled, because:',
            a: ['Sanitizer removes scale faster', 'Airborne yeast and mold colonize the warm, wet cabinet — ice is a food-contact system', 'The refrigerant requires it', 'Descaler damages plastic'],
            correct: 1,
            exp: 'Descaling addresses minerals; sanitizing addresses biological growth. Health codes treat ice as food and the machine as a food-contact surface.',
          },
          {
            q: 'The correct response to a fully frozen-up evaporator is:',
            a: ['Chip the ice off with a screwdriver', 'Thaw completely without tools, then diagnose and fix the root cause', 'Run extra harvest cycles until it clears', 'Turn the machine off overnight, then back on'],
            correct: 1,
            exp: 'Picks and heat guns puncture evaporators — a totaled machine. Thaw, then find why harvest failed (scale, probe, hot-gas valve) or the glacier returns.',
          },
        ],
      },
      {
        title: 'Troubleshooting by Symptom',
        body: [
          'Low ice production has a fixed interrogation order. First, environment: an ice machine is rated at 70°F air / 50°F water; a 95°F closet over a fryer can halve production with nothing broken. Second, water: pressure, strainer, pump, distributor. Third, the condenser (grease-dusted, as always in kitchens). Fourth, cycle times against the nameplate chart — long freeze cycles point at refrigeration (charge, TXV, harvest valve leaking hot gas continuously); long harvests point at scale or weak hot gas.',
          'A leaking harvest (hot-gas) valve is the sneaky one: it bleeds hot discharge gas into the evaporator during freeze, extending freeze cycles and slashing production while all pressures look "sort of normal." A suction line that runs warm during freeze, or a freeze cycle far over chart time with a clean plate and good water, points to it. It is the ice machine\'s equivalent of the welded contactor — a component that will not stop doing its job.',
          'Machine controls now run diagnostics: modern boards flash error codes for long freeze, long harvest, high discharge temperature, and probe faults. Codes are direction, not verdicts — a "long harvest" code does not say whether the cause is scale, a weak valve, or a blinded probe. Combine the code with your cycle observation and water inspection before ordering parts.',
          'Ice quality complaints close the loop: cloudy ice = mineral-heavy or air-entrained water (filtration, circulation); shallow or hollow cubes = thickness probe or water starvation; off-taste = overdue cleaning, exhausted carbon filter, or something stored in the bin that should not be (the bin is not a beer cooler, though customers disagree). Every quality complaint is a water or sanitation conversation, and a professional one to have — it is where service contracts are born.',
        ],
        keyPoints: [
          'Production complaints: check environment (70/50 rating), water, condenser, then cycle times vs chart',
          'A leaking hot-gas valve extends freeze cycles and quietly halves production',
          'Error codes give direction, not verdicts — verify with observation',
          'Ice quality complaints = water treatment and sanitation conversations',
        ],
        quiz: [
          {
            q: 'An ice machine in a 95°F utility closet produces half its rated ice with no fault codes. The most likely explanation is:',
            a: ['A failing compressor', 'Ambient heat — machines are rated at 70°F air / 50°F water', 'A bad thickness probe', 'Wrong refrigerant'],
            correct: 1,
            exp: 'Capacity ratings assume 70/50 conditions. Hot ambient air slashes condenser performance and production with nothing actually broken.',
          },
          {
            q: 'Freeze cycles run far over chart time; the plate is clean, water flow is good, and the suction line runs warm during freeze. Suspect:',
            a: ['The water pump', 'A leaking harvest (hot-gas) valve bleeding heat into the evaporator', 'A plugged distributor', 'The bin sensor'],
            correct: 1,
            exp: 'Hot gas leaking into the evaporator during freeze fights the refrigeration effect — long freezes, warm suction, quietly ruined production.',
          },
        ],
      },
    ],
    test: [
      { q: 'Cube machines release ice from the evaporator by:', a: ['Bin heaters', 'A hot-gas harvest cycle', 'Auger pressure', 'Warm water rinse only'], correct: 1, exp: 'Hot discharge gas warms the evaporator to release the slab — the defining cycle of cube machines.' },
      { q: 'Flake and nugget machines differ from cube machines because they:', a: ['Use no compressor', 'Freeze continuously and scrape ice off with an auger', 'Harvest twice per cycle', 'Need no water supply'], correct: 1, exp: 'A rotating auger continuously scrapes and extrudes ice — no freeze/harvest alternation.' },
      { q: 'Metal flakes in nugget ice indicate:', a: ['Water contamination', 'Auger/bearing wear requiring immediate service', 'Normal auger polish', 'Scale breakup'], correct: 1, exp: 'Metal in ice is worn auger/bearing material — a health hazard and a gearbox failure in progress.' },
      { q: 'A machine that never starts although the bin is empty may simply have:', a: ['A seized compressor', 'A dirty or blocked bin sensor / photo-eye', 'An open TXV', 'No refrigerant'], correct: 1, exp: 'Bin controls fouled by scale dust read "bin full" — a thirty-second cleaning masquerading as a dead machine.' },
      { q: 'Stripes of missing cubes on a slab map directly to:', a: ['Refrigerant shortage', 'Blocked distributor passages over those columns', 'A cracked evaporator', 'Harvest valve leakage'], correct: 1, exp: 'The ice is a picture of the water flow — starved columns sit under blocked distributor holes.' },
      { q: 'Ice machines scale faster than other water appliances because:', a: ['They run colder', 'Freezing concentrates minerals in the remaining reservoir water', 'Their pumps add minerals', 'Ice attracts calcium'], correct: 1, exp: 'Pure water freezes out first, so reservoir mineral concentration climbs all day — accelerating scale everywhere the water touches.' },
      { q: 'Proper ice machine sanitation matters legally because:', a: ['It extends warranty', 'Ice is food and the machine is a food-contact surface', 'Refrigerant rules require it', 'It reduces energy use'], correct: 1, exp: 'Health inspectors treat ice as food. Cleaning and sanitizing on schedule, documented, is compliance — not courtesy.' },
      { q: 'The correct freeze-up recovery is:', a: ['Chip the evaporator clear and restart', 'Thaw completely, then fix the root cause (scale, probe, harvest)', 'Add refrigerant', 'Shorten the freeze timer'], correct: 1, exp: 'Tools puncture evaporators and total machines. Thaw, then cure the cause, or the glacier rebuilds within weeks.' },
      { q: 'A leaking hot-gas valve during the freeze cycle causes:', a: ['Short freeze cycles', 'Extended freeze cycles and reduced production with a warm suction line', 'Bin overflow', 'High superheat only at harvest'], correct: 1, exp: 'Discharge heat bleeding into the evaporator fights freezing — the machine works overtime to make less ice.' },
      { q: 'Cloudy ice and off-taste complaints point to:', a: ['The refrigeration circuit', 'Water quality, exhausted filtration, or overdue cleaning', 'The auger gearmotor', 'The bin thermostat'], correct: 1, exp: 'Quality complaints are water and sanitation issues — filtration, descaling, sanitizing, and bin discipline.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 17 — FOOD HOLDING, DISPLAY & MERCHANDISING
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-holding-display',
    num: 17,
    title: 'Food Holding, Display & Merchandising',
    desc: 'Hot holding, steam tables, and refrigerated display — precise temperature control where food safety law meets equipment service.',
    slides: [
      {
        title: 'Food Safety Temperatures: The Rules You Service To',
        body: [
          'Holding equipment exists because of one fact: bacteria multiply fastest between 40°F and 140°F — the danger zone. Health codes require cold food held at or below 40°F (41°F in many jurisdictions) and hot food at or above 135-140°F. Every piece of holding equipment is a machine for staying out of that zone, and every service call on one is ultimately a food-safety call.',
          'This changes how you verify your work. "It feels cold" and "the display says 38" are not verification. Use a calibrated thermometer — probe test product or a water/glycol simulant, not just cabinet air, because air temperature swings with door openings while product temperature is what the law and the bacteria care about. Verify your own thermometer in ice water (32°F) routinely.',
          'Understand the operational boundary: holding equipment holds — it is not designed to heat food up or cool food down. A steam table loaded with cold product, or a cold well loaded with warm product, will fail inspection with zero equipment fault. When a "failing" unit checks out healthy, tactfully verify the loading practice before leaving: it protects the customer from a citation and you from a callback.',
          'Documentation is part of the repair. Record found temperatures, corrected temperatures, and your thermometer verification on the ticket. If equipment cannot hold safe temperature and cannot be repaired on the spot, say so explicitly to the operator — food safety liability is real, and the paper trail proves you handled it professionally.',
        ],
        keyPoints: [
          'Danger zone 40-140°F: cold holding ≤40°F, hot holding ≥135-140°F per local code',
          'Verify with a calibrated probe on product or simulant — not cabinet air, not the display',
          'Holding equipment holds; it does not reheat or chill — check loading practices',
          'Document found/corrected temperatures on every holding-equipment ticket',
        ],
        quiz: [
          {
            q: 'The food danger zone — where bacteria multiply fastest — is:',
            a: ['32-100°F', '40-140°F', '0-32°F', '140-212°F'],
            correct: 1,
            exp: 'Cold holding stays at/below ~40°F and hot holding at/above ~135-140°F specifically to keep food out of the 40-140°F multiplication zone.',
          },
          {
            q: 'A hot well checks out mechanically perfect but the food in it measures 120°F. The likely cause is:',
            a: ['A hidden element fault', 'Cold or room-temperature food was loaded into holding equipment that only holds', 'The thermostat needs recalibration', 'Low supply voltage'],
            correct: 1,
            exp: 'Holding equipment maintains temperature; it cannot drive cold product up to 140°F. Verify loading practice before condemning healthy equipment.',
          },
        ],
      },
      {
        title: 'Hot Holding: Cabinets, Steam Tables, and Drawers',
        body: [
          'Hot holding cabinets are insulated boxes with heating elements, a thermostat, usually a fan for even distribution, and often a humidity system — either a water pan over an element or a filled reservoir generating gentle steam so food holds without drying. The service set is familiar from Module 11: elements (R = V²/P), thermostats verified against a probe, fans, door gaskets. The humidity side adds water-level devices, evaporator pans, and — because water is involved — scale on everything again.',
          'Steam tables and bain-maries hold pans of food over hot water or steam wells. Dry-well versions run elements under the wells directly (and burn out fast when operators run them dry-well-style with water anyway, or wet-style without water — read the design before judging the failure). Common faults: infinite-switch failures per well, element burnout, and corroded well bottoms from years of salted water — recommend deliming here too.',
          'Heated holding drawers and strips (fry stations, pass windows) are simple element-and-thermostat devices; radiant strip warmers fail by element burnout and broken quartz tubes — handle quartz elements with gloves, skin oil creates hot spots that shorten their lives.',
          'A recurring hot-holding theme is recovery behavior: every door opening or fresh pan drops temperature, and well-designed equipment recovers within minutes. Complaints of "runs cold at lunch rush" often reflect capacity misuse (door held open, cold pans cycling through) rather than faults. Observe the equipment during actual service if the complaint is intermittent — ten minutes of watching beats three parts changed on speculation.',
        ],
        keyPoints: [
          'Humidity systems add water, level devices, and scale to the standard element/thermostat set',
          'Know whether a well is wet or dry design before judging its failure',
          'Handle quartz radiant elements with gloves — skin oil creates failure hot spots',
          'Intermittent "runs cold at rush" complaints: observe during service before changing parts',
        ],
        quiz: [
          {
            q: 'A steam table well designed for wet operation has been run dry for months. The expected damage is:',
            a: ['Scale buildup', 'Burned-out elements and heat-damaged well bottoms', 'A flooded cabinet', 'Thermostat drift only'],
            correct: 1,
            exp: 'Wet-well elements rely on water as their heat sink. Run dry, they overheat themselves and cook the well structure.',
          },
          {
            q: 'Quartz radiant warmer elements should be installed with gloves because:',
            a: ['They shatter at a touch', 'Skin oils create hot spots that shorten element life', 'They carry residual charge', 'Fingerprints void the warranty'],
            correct: 1,
            exp: 'Oil residue on quartz concentrates heat locally — the classic cause of early radiant element failure.',
          },
        ],
      },
      {
        title: 'Refrigerated Display and Merchandising Cases',
        body: [
          'Refrigerated display cases sell food while refrigerating it — and the selling part (open fronts, glass, lights, constant customer access) fights the refrigerating part all day. Open multi-deck cases hold their cold with an air curtain: a sheet of refrigerated air blown from top discharge to bottom return grille that acts as an invisible door. Anything that disturbs the curtain — blocked return grilles, product stacked past the load line, a pedestal fan aimed at the case, a door propped nearby — spills the cold and warms the product.',
          'This makes display-case diagnosis uniquely environmental. Before gauges: check product stacked beyond load-line stickers, clean the return and discharge grilles (they inhale crumbs and labels all day), verify all evaporator and curtain fans run, and ask what changed in the room (new ceiling fan? Relocated AC vent blowing across the case?). Glass-door merchandisers replace the curtain with doors and gaskets — anti-sweat heaters in the frames and glass prevent condensation, and dead heaters show up as fogged, dripping doors.',
          'Case lighting and night covers matter more than they look: lights add heat inside the refrigerated envelope (LED retrofits genuinely reduce load), and night covers on open cases drop overnight load dramatically — recommend both when a marginal case struggles in a hot store.',
          'Multi-case installations may run on remote racks (a compressor room serving many cases through piping) — then your scope is the case side: fans, defrost, drains, curtains, valves, and controls, with rack work coordinated per site rules. Know where your responsibility boundary is on rack systems before opening anything: a case tech who tampers with rack controls uninvited creates store-wide problems.',
        ],
        keyPoints: [
          'Open cases live and die by the air curtain — load lines, grilles, fans, and room drafts',
          'Fogged, sweating glass doors = dead anti-sweat heaters',
          'LED retrofits and night covers meaningfully cut case load — recommend them',
          'On remote-rack installations, know your boundary: case side vs rack side',
        ],
        quiz: [
          {
            q: 'An open multi-deck case runs warm every afternoon after the store aims a pedestal fan down its aisle. The fault is:',
            a: ['A failing compressor', 'The fan disrupts the air curtain, spilling refrigerated air', 'A plugged drain', 'Undercharge'],
            correct: 1,
            exp: 'The air curtain is the case\'s invisible door. Cross-drafts tear it open — the most common environmental cause of warm open cases.',
          },
          {
            q: 'Glass doors on a merchandiser are fogged and dripping inside the store. The failed component is:',
            a: ['The evaporator fan', 'The anti-sweat (frame/glass) heaters', 'The door gasket', 'The case lighting'],
            correct: 1,
            exp: 'Anti-sweat heaters keep glass and frames above dew point. When they die, humidity condenses on the cold surfaces immediately.',
          },
          {
            q: 'Product stacked above the load-line stickers in an open case causes:',
            a: ['Better product visibility with no downside', 'Disruption of the air curtain and warm product on top', 'Higher head pressure', 'Faster defrost'],
            correct: 1,
            exp: 'The load line marks where the air curtain flows. Product above it sits outside the refrigerated envelope and blocks the curtain for everything below.',
          },
        ],
      },
    ],
    test: [
      { q: 'Cold and hot holding thresholds (typical health code) are:', a: ['≤50°F and ≥120°F', '≤40°F and ≥135-140°F', '≤32°F and ≥165°F', '≤45°F and ≥100°F'], correct: 1, exp: 'Cold at or below ~40°F, hot at or above ~135-140°F — bracketing the 40-140°F danger zone.' },
      { q: 'Proper temperature verification on holding equipment uses:', a: ['The unit display', 'A calibrated probe on product or a simulant', 'The cabinet air reading only', 'The customer\'s report'], correct: 1, exp: 'Product temperature is what codes and bacteria respond to; displays and air temps mislead. Verify your thermometer in ice water.' },
      { q: 'Holding equipment loaded with food far from holding temperature will:', a: ['Recover it within minutes', 'Fail inspection with no equipment fault — holding equipment only holds', 'Automatically boost output', 'Trip its high-limit'], correct: 1, exp: 'Holding maintains temperature; it is not designed to reheat or chill product through the danger zone.' },
      { q: 'A humidity-equipped holding cabinet adds which recurring service issue?', a: ['Refrigerant leaks', 'Scale on water pans, elements, and level devices', 'Belt wear', 'Gas pressure drift'], correct: 1, exp: 'Wherever kitchen water is heated, scale follows — humidity systems inherit the full descaling burden.' },
      { q: 'Elements in a wet-design steam well run without water will:', a: ['Last longer', 'Overheat and burn out while damaging the well', 'Use less energy safely', 'Cycle normally'], correct: 1, exp: 'Water is the design heat sink. Dry operation overheats the element and cooks the well structure.' },
      { q: 'The air curtain on an open display case functions as:', a: ['A defrost mechanism', 'The invisible door retaining refrigerated air', 'A condensate evaporator', 'A humidity control'], correct: 1, exp: 'The top-to-bottom refrigerated air sheet is what keeps an open case cold; disrupt it and the case warms.' },
      { q: 'The first checks on a warm open display case are:', a: ['Gauges and superheat', 'Load lines, grilles, curtain/evaporator fans, and room drafts', 'Compressor windings', 'Refrigerant recovery'], correct: 1, exp: 'Open-case problems are environmental more often than mechanical — check the curtain\'s enemies before the sealed system.' },
      { q: 'Condensation streaming down merchandiser door glass indicates:', a: ['Overcharge', 'Failed anti-sweat heaters', 'A plugged drain', 'Excess refrigeration'], correct: 1, exp: 'Anti-sweat heaters hold the glass above dew point; their failure fogs and drips immediately in humid stores.' },
      { q: 'Night covers and LED lighting retrofits on display cases:', a: ['Are cosmetic only', 'Meaningfully reduce refrigeration load', 'Increase defrost frequency', 'Violate health codes'], correct: 1, exp: 'Lights add heat inside the envelope and open cases lose cold all night — both retrofits cut real load.' },
      { q: 'On a remote-rack installation, the case technician\'s default scope is:', a: ['The compressor rack controls', 'Case-side systems: fans, defrost, drains, curtains, valves, controls', 'Store HVAC', 'Everything including rack setpoints'], correct: 1, exp: 'Rack changes affect every case in the store — case techs stay case-side unless explicitly responsible for the rack.' },
    ],
  },
];
