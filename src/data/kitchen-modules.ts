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

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 18 — GAS SYSTEMS & COMBUSTION SAFETY
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-gas-systems',
    num: 18,
    title: 'Gas Systems & Combustion Safety',
    desc: 'Natural gas and propane, regulators, ignition and flame sensing, combustion quality, and the leak-testing discipline that keeps kitchens standing.',
    slides: [
      {
        title: 'Gas Fundamentals: Fuels, Pressures, and Regulators',
        body: [
          'Kitchens burn two fuels. Natural gas (mostly methane) arrives by pipeline and is lighter than air — leaks rise. Propane (LP) comes from tanks and is heavier than air — leaks pool at floor level and in pits, which changes where you sniff and how dangerous a small leak is. Appliances are built or converted for one specific fuel: orifice sizes and regulator settings differ because propane carries roughly 2.5 times the energy per cubic foot and runs at higher pressure.',
          'Gas pressure in kitchens is measured in inches of water column (in. w.c.) — a unit so small that 28 in. w.c. equals about 1 psi. Typical manifold pressures: natural gas appliances around 3.5-4 in. w.c., propane around 10-11 in. w.c. You measure it with a manometer at the appliance pressure tap, with the burners firing. Every gas appliance has a regulator that steps the building supply down to its manifold pressure; a failed or mis-set regulator starves or over-fires every burner downstream at once.',
          'Fuel conversion is a formal procedure: change the orifices, convert or adjust the regulator, adjust air shutters, and label the appliance. An appliance connected to the wrong fuel is dangerous in both directions — natural gas orifices on propane over-fire wildly (sooting, flame rollout, overheat); propane orifices on natural gas starve to uselessness.',
          'Know the supply chain you are standing in: building shutoff, appliance shutoff valve (required within reach of each appliance), flexible connector (rated, and never reused after kinking), and quick-disconnects on movable equipment with restraint cables so the connector never carries the pull. Before any burner diagnosis, verify the basics: is the appliance valve fully open, is the flex connector kinked behind a shoved-back fryer, and does the manifold pressure read correct on your manometer while firing?',
        ],
        tables: [
          {
            caption: 'Natural gas vs propane',
            headers: ['Property', 'Natural Gas', 'Propane (LP)'],
            rows: [
              ['Relative to air', 'Lighter — leaks rise', 'Heavier — leaks pool low'],
              ['Typical manifold pressure', '~3.5-4 in. w.c.', '~10-11 in. w.c.'],
              ['Energy per ft³', '~1,000 BTU', '~2,500 BTU'],
              ['Source', 'Pipeline', 'Tank / cylinder'],
            ],
          },
        ],
        keyPoints: [
          'Natural gas rises; propane pools low — it changes leak behavior and where you test',
          'Manifold pressure is measured in inches w.c. with a manometer, burners firing',
          'Wrong-fuel orifices are dangerous both directions — conversions are formal procedures',
          'Check appliance valve, flex connector condition, and manifold pressure before burner diagnosis',
        ],
        quiz: [
          {
            q: 'Why does a propane leak demand sniffing at floor level?',
            a: ['Propane detectors only work when low', 'Propane is heavier than air and pools low', 'Propane is odorless above waist height', 'Floor drafts concentrate all gases'],
            correct: 1,
            exp: 'LP vapor sinks and accumulates at floor level, in pits and low corners — exactly where an ignition source finds it.',
          },
          {
            q: 'A gas fryer barely produces flame after being shoved back against the wall during cleaning. Your first check is:',
            a: ['The thermostat', 'A kinked flexible gas connector or partially closed appliance valve', 'The high-limit', 'The burner orifices'],
            correct: 1,
            exp: 'Movable equipment pinches its own flex connector constantly. Verify the supply path and manifold pressure before touching burner components.',
          },
          {
            q: 'Natural gas appliances typically run manifold pressure around:',
            a: ['3.5-4 in. w.c.', '10-11 in. w.c.', '5 psi', '28 psi'],
            correct: 0,
            exp: 'NG manifolds run ~3.5-4 in. w.c.; propane runs ~10-11 in. w.c. — one of the reasons fuels are never interchangeable without conversion.',
          },
        ],
      },
      {
        title: 'Ignition and Flame Sensing',
        body: [
          'Every gas appliance must answer two questions: how do we light the flame, and how do we prove it stayed lit? Lighting: standing pilots (a small always-on flame, still common on ranges and older fryers), spark ignition (a high-voltage electrode clicking at the burner or pilot), and hot-surface ignition (a glowing silicon-carbide or silicon-nitride element, common on newer ovens). Proving: this is the safety heart of the appliance, because gas flowing without flame is the disaster scenario.',
          'Standing-pilot appliances prove flame with a thermocouple: the pilot flame heats a bimetal junction generating ~25-30 millivolts, which holds open a magnetic safety valve. Pilot goes out → millivolts die → valve snaps shut. A pilot that lights but will not stay lit when you release the button is the classic weak thermocouple (measure it: under ~20mV under flame means replace) — or a pilot flame too small or misaimed to bathe the thermocouple. Thermopiles (stacks of thermocouples, 250-750mV) power entire millivolt control systems on some fryers: same physics, more voltage.',
          'Electronic systems prove flame by flame rectification: a small AC voltage on the flame sensor rod passes through the ionized flame to ground, and because the flame conducts asymmetrically, a small DC current (measured in microamps) results. The control demands its minimum microamp signal within the trial-for-ignition window or it locks out. The signature failure is a sensor rod coated in oxide or kitchen grime: flame present, current too low, appliance locks out after "lighting perfectly for ten seconds." The fix is famous: gently clean the rod with fine abrasive, verify its porcelain is uncracked, verify a solid burner ground path — because the flame current returns through the burner and appliance chassis.',
          'Respect the lockout logic. Controls allow limited ignition trials then lock out for a reason: repeated trials pump unburned gas into the appliance and flue. Never bypass a flame sensor, never hold a gas valve open manually, and after any lockout, find out why before resetting a third time. The control is not being difficult — it is refusing to fill the kitchen with gas.',
        ],
        keyPoints: [
          'Thermocouple: ~25-30mV holds the pilot safety valve; weak output = pilot will not stay lit',
          'Flame rectification proves flame via microamp DC current through the flame to ground',
          'Dirty sensor rod / bad burner ground = lights then locks out — clean the rod, verify ground',
          'Lockouts protect against gas accumulation: diagnose the cause, never bypass flame proving',
        ],
        quiz: [
          {
            q: 'A standing pilot lights but goes out the moment the pilot button is released. The classic cause is:',
            a: ['High gas pressure', 'A weak thermocouple (or pilot flame not bathing it)', 'A failed thermostat', 'Blocked flue'],
            correct: 1,
            exp: 'The thermocouple\'s millivolts hold the safety valve open. Weak output (or a misaimed pilot flame) lets the valve snap shut on release.',
          },
          {
            q: 'A convection oven ignites, runs ten seconds, then shuts down and eventually locks out. The most common culprit is:',
            a: ['A leaking gas valve', 'A grime-coated flame sensor rod or poor burner ground giving insufficient microamps', 'An oversized orifice', 'A stuck high-limit'],
            correct: 1,
            exp: 'Flame is clearly present — the control just cannot prove it. Clean the rod, check its porcelain, and verify the ground path; microamps return through the chassis.',
          },
          {
            q: 'Repeated manual resets of an ignition lockout without diagnosis are dangerous because:',
            a: ['They wear out the reset button', 'Each failed trial adds unburned gas to the appliance and flue', 'They erase the error history', 'The control loses calibration'],
            correct: 1,
            exp: 'Lockout exists to stop gas accumulation after failed trials. Reset-and-retry cycling builds exactly the gas charge the lockout exists to prevent.',
          },
        ],
      },
      {
        title: 'Combustion Quality, CO, and Leak Testing',
        body: [
          'A healthy gas flame is blue, stable, and quiet, with well-defined inner cones. Yellow, lazy, sooting flames mean incomplete combustion — insufficient primary air (adjust the air shutter), a dirty burner, or an over-fired orifice. Lifting or blowing flames mean too much air or pressure; flashback (burning inside the burner tube) means too little velocity. Every incomplete-combustion flame is manufacturing carbon monoxide.',
          'CO is the invisible stake in this trade: colorless, odorless, and lethal, produced whenever combustion is incomplete or flue gases spill back into the room. Symptoms in staff (headache, nausea, "the kitchen makes me dizzy") are a red-flag report — treat it as an emergency, not a comfort complaint. A combustion analyzer reading flue gas quantifies what your eyes cannot: CO ppm (air-free CO in flue gas should generally be under 100 ppm for commercial cooking appliances; anything approaching 400 requires immediate correction or shutdown), O2, and flue temperature. Kitchens add a unique factor: appliances live under exhaust hoods, and combustion appliances compete with the hood for air. A hood pulling hard in a kitchen with failed make-up air can starve burners and even reverse flues — Module 20 territory, but the combustion symptoms appear on your gas call.',
          'Leak testing is not an event; it is a habit. Every fitting you touched gets tested before you leave — approved bubble solution (never dish soap with corrosive salts on stainless steel/gas lines, use gas-rated solution) or an electronic combustible-gas detector. Test method: pressurize normally, brush or spray solution on every joint, watch for growing bubbles. For whole-appliance verification after major work, a manometer standing test (valve off, watch for pressure decay) catches what spot checks miss.',
          'The gas emergency protocol, memorized: strong gas smell → do not switch anything electrical on or off (a light switch is an ignition source), get people out, shut the gas at the safest accessible point, ventilate with doors, and call the utility/emergency line from outside. You are the professional in the room: staff will follow the calm person with a plan.',
        ],
        keyPoints: [
          'Blue and stable = healthy; yellow/sooty = incomplete combustion = CO production',
          'Analyzer numbers over eyeball: air-free CO under ~100 ppm; approaching 400 = correct or shut down',
          'Every fitting touched gets bubble-tested before you leave — no exceptions',
          'Gas emergency: no electrical switching, evacuate, shut off, ventilate, call from outside',
        ],
        quiz: [
          {
            q: 'A fryer burner shows lazy yellow flames and soot streaks up the flue. This flame is:',
            a: ['Normal for propane', 'Incomplete combustion producing CO — correct air/burner condition now', 'Too much primary air', 'Evidence of high gas pressure only'],
            correct: 1,
            exp: 'Yellow, sooting flames are oxygen-starved combustion manufacturing CO. Air shutter, burner cleanliness, and orifice sizing are the correction points.',
          },
          {
            q: 'Kitchen staff report afternoon headaches and dizziness near the cook line. Your response is:',
            a: ['Suggest better ventilation someday', 'Treat as a CO emergency: analyzer check, ventilate, shut down offending equipment as needed', 'Check the walk-in first', 'Schedule a follow-up next week'],
            correct: 1,
            exp: 'CO symptoms in staff are a red-alert report. Measure, ventilate, and remove the source — this is the call where the trade saves lives.',
          },
          {
            q: 'During a strong-gas-smell emergency, flipping the lights on or off is prohibited because:',
            a: ['It wastes electricity', 'Switch arcing can ignite the gas-air mixture', 'The lights interfere with detectors', 'Codes require darkness'],
            correct: 1,
            exp: 'Any switching arc is an ignition source in a combustible atmosphere. Leave electrical states as they are, evacuate, shut off gas, ventilate.',
          },
        ],
      },
    ],
    test: [
      { q: 'Propane leaks differ from natural gas leaks because propane:', a: ['Rises to the ceiling', 'Is heavier than air and pools at floor level', 'Has no odorant', 'Cannot ignite indoors'], correct: 1, exp: 'LP sinks and accumulates low — changing both the hazard and where you test for it.' },
      { q: 'Kitchen gas manifold pressure is measured with a:', a: ['Refrigeration gauge set', 'Manometer, in inches of water column, while firing', 'Multimeter', 'Combustion analyzer'], correct: 1, exp: 'Inches w.c. is the unit (28 in. w.c. ≈ 1 psi); the manometer connects at the appliance pressure tap with burners on.' },
      { q: 'Running natural-gas orifices on propane causes:', a: ['Weak, starved flames', 'Severe over-firing with sooting and rollout risk', 'No change', 'Automatic regulator compensation'], correct: 1, exp: 'Propane packs ~2.5x the energy per cubic foot at higher pressure — NG orifices pass far too much fuel.' },
      { q: 'A thermocouple holding a pilot safety valve generates approximately:', a: ['25-30 millivolts', '5 volts', '120 volts', '25-30 microamps'], correct: 0, exp: 'The pilot-heated junction produces tens of millivolts, just enough to hold the magnetic safety valve open.' },
      { q: 'Flame rectification proves a flame exists by:', a: ['Measuring flame temperature', 'A microamp DC current conducted through the ionized flame to ground', 'Light detection', 'Gas flow measurement'], correct: 1, exp: 'The flame conducts asymmetrically, rectifying the sensor\'s AC to a small DC current the control counts in microamps.' },
      { q: 'An appliance that lights, runs seconds, then drops out repeatedly most often needs:', a: ['A new gas valve', 'Its flame sensor rod cleaned and burner ground verified', 'Higher gas pressure', 'A new thermostat'], correct: 1, exp: 'Oxide/grime on the rod chokes the microamp signal; the current also needs a sound ground path through the burner.' },
      { q: 'The purpose of ignition lockout after failed trials is to:', a: ['Protect the ignitor from wear', 'Prevent unburned gas accumulating in the appliance and flue', 'Save energy', 'Force a service call'], correct: 1, exp: 'Each failed trial dumps gas. Lockout stops the accumulation that repeated blind resets would create.' },
      { q: 'A healthy gas burner flame appears:', a: ['Tall, yellow, and wavering', 'Blue and stable with defined inner cones', 'Orange with black tips', 'Nearly invisible and lifting off the burner'], correct: 1, exp: 'Blue and stable indicates complete combustion; yellow/sooty flames are CO factories; lifting flames have excess air/velocity.' },
      { q: 'Air-free CO in commercial appliance flue gas approaching 400 ppm requires:', a: ['A note on the ticket', 'Immediate correction or equipment shutdown', 'Re-test next visit', 'Opening a window'], correct: 1, exp: 'Elevated CO is an active hazard: correct the combustion problem or shut the appliance down before leaving.' },
      { q: 'Before leaving any gas job you must:', a: ['Reset all lockouts twice', 'Leak-test every fitting you disturbed with approved solution or detector', 'Raise manifold pressure 10%', 'Disable the flame sensor'], correct: 1, exp: 'Every touched joint gets tested, every time. Gas leak discipline is what keeps kitchens standing.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 19 — RANGES, COMBI OVENS & SPECIALTY EQUIPMENT
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-ranges-combiovens',
    num: 19,
    title: 'Ranges, Combi Ovens & Specialty Equipment',
    desc: 'Applying gas and electric skills to the cook line: ranges, gas fryers, combi ovens, and steam-jacketed specialty equipment.',
    slides: [
      {
        title: 'Ranges and Gas Fryers',
        body: [
          'The commercial range is the simplest gas appliance you will service — which makes it the place to master fundamentals. Open top burners: a valve per burner, orifice, venturi with air shutter, and (older units) standing pilots or (newer) spark ignition. Complaints map directly: uneven flame = clogged burner ports (boil-overs carbonize in them — clean with a brush and port tool, never drill ports oversize); yellow flame = air shutter or debris in the venturi; pilot outage = thermocouple chain from Module 18. Range ovens add a thermostat-driven oven burner with its own safety valve and pilot/ignitor — a range oven that will not fire while the top works fine isolates the fault to the oven\'s own gas chain.',
          'Gas fryers marry Module 18 to Module 12\'s fryer logic. Millivolt fryers are beautifully self-contained: a thermopile in the pilot flame powers the gas valve and thermostat directly — no wall plug at all. A dead millivolt fryer is diagnosed with a meter in millivolts: thermopile output (typically 350-750mV loaded), then the circuit through the high-limit and thermostat to the valve coil. Electronic-ignition fryers move the same functions to a control board, spark ignitor, and flame sensor.',
          'Fryer burners fire into tubes running through the oil (tube-fired) or against the tank walls. Combustion problems show as slow recovery, soot at the flue outlets, or oil temperature lag — and remember the Module 12 rule that recovery complaints can also be thermostat/probe issues; a combustion-side check (flame appearance, flue condition, manifold pressure) separates the two quickly.',
          'The griddle and broiler variants follow range logic: multiple burners under a plate (thermostatic per section on griddles) or radiants above/below the product (broilers/salamanders — mostly cleaning-related failures, since they live in a rain of grease). Across all of them, the diagnostic frame stays identical: fuel path → ignition → flame proving → control chain. Master it once, apply it everywhere.',
        ],
        keyPoints: [
          'Clogged burner ports from boil-overs cause uneven flames — clean, never drill',
          'Millivolt fryers run entirely on thermopile power: diagnose with a meter in mV through the safety chain',
          'Fryer combustion problems (soot, slow recovery) vs control problems: check flame and flue first',
          'One diagnostic frame everywhere: fuel path → ignition → flame proving → control chain',
        ],
        quiz: [
          {
            q: 'A range top burner burns unevenly with flame missing along one side after a heavy boil-over. The fix is:',
            a: ['Increase manifold pressure', 'Clean the carbonized burner ports with brush and port tool', 'Replace the burner valve', 'Drill the ports one size larger'],
            correct: 1,
            exp: 'Boil-overs carbonize in ports and block them. Clean to restore the pattern — drilling oversizes the ports and permanently over-fires the burner.',
          },
          {
            q: 'A millivolt gas fryer is completely dead: pilot lights and holds, but the main burner never fires. Your meter should trace:',
            a: ['120V through the contactor', 'Thermopile millivolts through the high-limit and thermostat to the gas valve coil', 'Microamps at the flame rod', 'Resistance of the heating elements'],
            correct: 1,
            exp: 'Millivolt systems are powered entirely by the thermopile. Voltage-drop the mV circuit through each safety and the thermostat to find the open or weak link.',
          },
        ],
      },
      {
        title: 'Combi Ovens',
        body: [
          'The combi oven — convection heat, steam, or both at once — is the most complex box on the cook line: a convection oven, a steam generator, water systems, drain systems, and a computer, sharing one stainless shell. Service demands system separation: is the complaint in heat (elements or gas burner + blower), steam (generator or direct-spritz injection, water fill, level probes), water/drain (fill valves, drain pumps, condensate tempering), or control (probes, board, door switch)?',
          'Steam generation is where combis suffer, and the reason is Module 12\'s old enemy at maximum intensity: scale. Boiler-based combis concentrate minerals exactly like ice machines do, and their level probes, heating elements, and drain valves scale up on a schedule set by the local water. Symptoms: slow steam, "fill" faults from blinded level probes, drain valves that will not seal (boiler drains constantly), and eventually element burnout. Water treatment matched to the manufacturer spec (often reverse osmosis with remineralization, or specific filtration) plus rigorous automatic/manual descaling cycles are not optional accessories — they are the difference between a 15-year oven and a 5-year one.',
          'Combis also self-clean (automated wash systems with detergent and rinse-aid pumps), and door mechanics matter more than on any oven: the door gasket seals steam pressure, the hinges take daily abuse, and a leaking door shows as visible steam plumes, wet floors, long cook times, and error codes. Gasket and hinge inspection is minutes; steam loss diagnosis without it is hours.',
          'Approach combi faults through the machine\'s own diagnostics first — these are software-rich appliances with genuinely useful error logs and service menus (access codes live in the service manual). Then verify physically: a "steam fault" code plus two minutes watching the level probes fill cycle beats an hour of guessing. And before every combi visit: bring the manual for that model. Combi architectures differ enough between manufacturers that model-specific documentation is a tool, not a crutch.',
        ],
        keyPoints: [
          'Split every combi complaint: heat / steam / water & drain / control',
          'Scale is the combi killer — water treatment to manufacturer spec plus descaling discipline',
          'Steam leaks at the door (gasket/hinges) mimic generator faults — inspect the door first',
          'Use the oven\'s own error logs and service menus, with the model-specific manual in hand',
        ],
        quiz: [
          {
            q: 'A boiler combi throws repeated fill faults although water supply pressure is good. The classic cause is:',
            a: ['A failed door switch', 'Scale-blinded water level probes', 'A dead convection blower', 'Wrong detergent'],
            correct: 1,
            exp: 'Level probes sense water conductivity; scale coating insulates them so the control never "sees" the water it has. Descale and clean the probes.',
          },
          {
            q: 'A combi runs long cook times with visible steam around the door edge. Before generator diagnosis, check:',
            a: ['The water filter', 'The door gasket and hinge adjustment', 'The drain pump', 'The control board firmware'],
            correct: 1,
            exp: 'Steam escaping the door is capacity walking away. Gasket/hinge inspection takes minutes and explains the symptom directly.',
          },
          {
            q: 'The most important preparation for servicing an unfamiliar combi model is:',
            a: ['Extra fuses', 'The model-specific service manual and diagnostic access codes', 'A larger manometer', 'Spare door gaskets'],
            correct: 1,
            exp: 'Combi architectures vary sharply by manufacturer. The service manual\'s diagnostics, menus, and procedures are primary tools on these machines.',
          },
        ],
      },
      {
        title: 'Steam-Jacketed Kettles, Tilt Skillets, and Pressure Equipment',
        body: [
          'Steam-jacketed kettles cook with steam condensing inside a double-wall jacket — either self-contained (a sealed jacket with its own element/burner boiling a permanent water charge) or direct-connected to building steam. Self-contained kettles live and die by jacket integrity: the sealed charge of treated water boils, condenses, and returns forever — unless air leaks in or water leaks out. A kettle that heats slowly or unevenly often needs its jacket vacuum re-established (purging air per the manual) or has lost jacket water; both show on the jacket pressure/vacuum gauge. The jacket safety valve is a pressure vessel relief device — test per procedure and never plug, cap, or "upgrade" it.',
          'Tilt skillets (braising pans) are flat-bottom kettles that tilt to pour: thermostatic elements or gas burners under a thick plate, a tilt mechanism (manual worm gear or motorized), and the usual control chain. Their characteristic wear is mechanical — tilt gear wear, pour-lip damage, and element/wiring fatigue from decades of tilting — plus food-safety-critical thermostat accuracy verified with a surface probe.',
          'Pressure steamers cook in a sealed compartment above atmospheric pressure, which means they are small pressure vessels with interlocks: a door that cannot open under pressure, a pressure relief valve, gauges, and timers. Respect the interlock chain absolutely — a defeated door interlock on a pressure steamer is a face-level steam explosion waiting for a hurried cook. Test reliefs and interlocks per the manufacturer procedure and document them; this is equipment where "it works" is not the standard — "its safeties work" is.',
          'Across specialty steam equipment, one qualification note: jurisdictions vary on who may service pressure vessels and building-steam connections. Know your local boundary (some jacket/vessel repairs require certified welders or licensed boiler work) — the professional move is refusing gracefully and referring correctly when a repair crosses into licensed territory.',
        ],
        keyPoints: [
          'Self-contained kettle heating problems: jacket air/water charge — check the jacket gauge first',
          'Never plug or bypass a jacket safety valve — it is pressure vessel relief',
          'Pressure steamer door interlocks and reliefs are life-safety: test and document, never defeat',
          'Know local licensing boundaries on pressure vessels and building steam — refer when required',
        ],
        quiz: [
          {
            q: 'A self-contained steam-jacketed kettle heats slowly and its jacket gauge shows no vacuum cold. The kettle most likely needs:',
            a: ['A larger burner', 'Air purged / jacket vacuum re-established and water charge verified per the manual', 'A new thermostat', 'Descaling of the cooking surface'],
            correct: 1,
            exp: 'Air in the jacket ruins condensing heat transfer. The cold-vacuum reading is the tell; purge and recharge per procedure.',
          },
          {
            q: 'The door interlock on a pressure steamer exists to:',
            a: ['Keep heat in', 'Prevent the door opening while the cavity is pressurized — preventing a steam explosion at the operator', 'Save energy', 'Protect the gasket'],
            correct: 1,
            exp: 'Opening a pressurized compartment releases explosive steam at face level. The interlock chain is life-safety equipment, tested and never defeated.',
          },
        ],
      },
    ],
    test: [
      { q: 'Blocked range burner ports after boil-overs should be:', a: ['Drilled larger', 'Cleaned with a brush and port tool', 'Ignored if flame exists', 'Sealed with high-temp epoxy'], correct: 1, exp: 'Cleaning restores the designed flame pattern; drilling permanently over-fires the burner.' },
      { q: 'A millivolt fryer control system is powered by:', a: ['A 120V wall circuit', 'The pilot-heated thermopile', 'A battery pack', 'The building\'s low-voltage transformer'], correct: 1, exp: 'The thermopile (hundreds of mV) powers valve, thermostat, and safeties — no external power at all.' },
      { q: 'Soot at a gas fryer\'s flue outlets indicates:', a: ['Normal aging', 'Combustion problems producing CO — inspect burners, air, and venting now', 'Old oil', 'A weak thermopile'], correct: 1, exp: 'Soot is incomplete combustion made visible; treat as a combustion/CO problem, not cosmetics.' },
      { q: 'The universal gas appliance diagnostic order is:', a: ['Control chain → flame → fuel', 'Fuel path → ignition → flame proving → control chain', 'Ignition → fuel → controls → flame', 'Whatever the error code says'], correct: 1, exp: 'Verify gas supply and pressure, then lighting, then proving, then the control logic — the frame fits every gas appliance.' },
      { q: 'The most destructive recurring problem in boiler-type combi ovens is:', a: ['Door slams', 'Scale from untreated water', 'Excess detergent', 'Voltage sags'], correct: 1, exp: 'Scale blinds probes, buries elements, and jams drains — water treatment plus descaling discipline is the combi\'s lifeline.' },
      { q: 'Scale-coated level probes in a combi boiler cause:', a: ['Overheating elements only', 'False fill/water faults because the control cannot sense water conductivity', 'Faster steam production', 'Door leaks'], correct: 1, exp: 'Conductivity probes insulated by scale read "no water" regardless of actual level.' },
      { q: 'Visible steam escaping a combi door during cooking means:', a: ['The generator is oversized', 'Check gasket and hinges before deeper steam-system diagnosis', 'Normal operation', 'The drain is plugged'], correct: 1, exp: 'Door leaks bleed steam capacity and mimic generator weakness — the two-minute door inspection comes first.' },
      { q: 'A jacket safety valve on a steam kettle may be:', a: ['Capped if it drips', 'Tested per procedure only — never plugged or bypassed', 'Replaced with a pipe plug temporarily', 'Adjusted to a higher pressure for faster cooking'], correct: 1, exp: 'It is pressure-vessel relief. Defeating it turns a kettle into a bomb; a dripping valve gets replaced, not plugged.' },
      { q: 'A defeated door interlock on a pressure steamer risks:', a: ['Longer cook times', 'An operator-level steam explosion when the door opens under pressure', 'Higher water bills', 'Gasket wear'], correct: 1, exp: 'The interlock prevents opening under pressure. Its defeat is a direct, severe injury hazard.' },
      { q: 'When a kettle repair crosses into certified pressure-vessel/boiler work, the professional response is:', a: ['Attempt it carefully', 'Refuse gracefully and refer to appropriately licensed service', 'Have the customer sign a waiver', 'Do it but skip documentation'], correct: 1, exp: 'Licensing boundaries on pressure vessels exist in most jurisdictions — referring correctly protects everyone, including you.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 20 — VENTILATION, HOODS & FIRE SUPPRESSION
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-ventilation-fire',
    num: 20,
    title: 'Ventilation, Hoods & Fire Suppression',
    desc: 'Exhaust hoods, make-up air, NFPA 96 grease safety, and wet-chemical fire suppression — the systems that keep the kitchen breathing and standing.',
    slides: [
      {
        title: 'Hoods, Exhaust, and Make-Up Air',
        body: [
          'Everything that cooks does so under a hood. Type I hoods handle grease-producing equipment (fryers, griddles, ranges, charbroilers) and connect to grease-rated ductwork and fans; Type II hoods handle heat and steam only (dishwashers, some ovens). The distinction is legal and structural: grease-laden vapor demands liquid-tight welded ducts, fire-rated clearances, and cleanable design under NFPA 96 — the standard governing commercial kitchen ventilation and fire protection.',
          'A hood works by capture and containment: the exhaust fan pulls a designed airflow through the hood face, dragging smoke and grease vapor through filters into the duct. Grease filters (baffle type — vertical blades that fling grease into troughs by inertia) are the first line of fire defense: they strip grease before the duct. Mesh filters are not permitted in Type I hoods. Filters must be in place, undamaged, and oriented correctly (baffles vertical, so grease drains) whenever grease equipment operates — a missing filter is an open grease highway to the duct.',
          'Every cubic foot exhausted must re-enter as make-up air (MUA), through a dedicated MUA unit or transfer air. When MUA fails — dampers stuck, MUA fan dead, filters clogged — the kitchen goes negative: doors slam or whistle, pilot flames outage mysteriously, hoods spill smoke at the edges, gas appliance flues backdraft (CO, Module 18), and the dining room HVAC gets dragged into the kitchen. Diagnosing "the hood is not capturing" therefore always means checking both sides: exhaust performance AND make-up supply.',
          'Airflow reality checks are simple and persuasive: smoke at the hood edge shows capture or spill directly; a door held open a crack tells you building balance by feel and sound. Instrument checks (anemometer at the filter face against design velocities) quantify it. And the recurring service killers are humble: grease-bound fan bearings and belts on the roof, exhaust fan blades caked into imbalance (vibration → bearing death), hinge kits absent so nobody ever cleans the fan, and MUA filters that have never been changed.',
        ],
        keyPoints: [
          'Type I = grease-rated hood/duct/fan under NFPA 96; Type II = heat/steam only',
          'Baffle filters are fire safety equipment: in place, undamaged, baffles vertical — always',
          'Failed make-up air turns the kitchen negative: pilot outages, smoke spill, flue backdrafting',
          'Check both sides of airflow: exhaust performance and make-up supply, plus roof fan condition',
        ],
        quiz: [
          {
            q: 'A kitchen suffers mysterious pilot outages, doors that whistle, and smoke rolling out of the hood edges. The unifying cause is:',
            a: ['Bad thermocouples throughout', 'Failed make-up air leaving the kitchen strongly negative', 'An oversized exhaust fan', 'Low gas pressure'],
            correct: 1,
            exp: 'Negative building pressure starves pilots, spills hood capture, and backdrafts flues. Restore make-up air before chasing individual symptoms.',
          },
          {
            q: 'Mesh-style filters found installed in a Type I grease hood should be:',
            a: ['Cleaned and reinstalled', 'Replaced with proper baffle filters — mesh is not permitted over grease equipment', 'Doubled up for better filtration', 'Left if the customer prefers them'],
            correct: 1,
            exp: 'NFPA 96 requires baffle-type grease filters in Type I hoods; mesh loads with grease and becomes fuel above the fire.',
          },
        ],
      },
      {
        title: 'Grease, Ducts, and NFPA 96 Discipline',
        body: [
          'Grease is fuel, and the exhaust system is a chimney coated in it. Duct fires are the catastrophic kitchen event: a flare-up ignites duct grease, and the fire travels the duct through the building at temperatures that defeat ordinary construction. NFPA 96 is written around preventing exactly this, and its logic shapes everything you touch: liquid-tight ducts, access panels for cleaning, clearance to combustibles, grease-collection at the fan, and — the big one — scheduled professional cleaning of the entire exhaust system by certified cleaners (frequency by cooking volume: solid-fuel and high-volume operations monthly/quarterly, typical kitchens semi-annually).',
          'Your service role interacts with this constantly. Filters and troughs you handle directly. Visible grease accumulation in the hood plenum or duct entrance, missing access panels, ductwork gaps, or a grease-soaked roof around the fan are conditions you document and report every time you see them — in writing, to the operator. You are not the duct cleaner, but you are frequently the only technically literate set of eyes that looks up there between cleanings.',
          'Exhaust fans on Type I systems are grease-rated (upblast centrifugal, discharging away from the roof, with grease drains and collection). Service realities: hinge kits let the fan tip up for duct cleaning access (absent hinge kits mean the duct behind the fan never gets cleaned — report it); belts slip in grease-fogged housings; bearings die from imbalance as blades cake. A fan changed without cleaning its housing and verifying drainage inherits the environment that killed its predecessor.',
          'Interlocks knit ventilation into the rest of the kitchen: NFPA 96 requires that cooking equipment under the hood cannot operate without exhaust running (and makeup air interlocked accordingly) — typically via a current sensor or airflow switch proving the fan. A dead interlock proving switch shows up as "the whole cook line is dead" and gets misdiagnosed as an electrical failure for hours if you do not know the interlock exists. When any hood or suppression work disables cooking, that is by design, not malfunction.',
        ],
        keyPoints: [
          'Duct grease is building-fire fuel: NFPA 96 cleaning schedules by certified cleaners are mandatory',
          'Document and report visible duct/plenum grease, missing access panels, or grease-soaked roofs — every time',
          'Type I fans: hinge kits, grease drainage, clean housings — or the new fan dies like the old one',
          'Cooking equipment is interlocked to exhaust: a failed proving switch mimics a dead cook line',
        ],
        quiz: [
          {
            q: 'The entire gas cook line is dead, but breakers and gas supply check fine. The overlooked suspect is:',
            a: ['A failed hood exhaust interlock / proving switch that must run for cooking equipment to operate', 'Simultaneous thermostat failure', 'The fire department shut the street gas', 'All thermocouples aged out together'],
            correct: 0,
            exp: 'NFPA 96 interlocks cooking equipment to exhaust operation. A dead fan or failed proving switch disables the line by design.',
          },
          {
            q: 'During an unrelated fryer repair you notice heavy grease stalactites inside the hood plenum. You should:',
            a: ['Ignore it — not your system', 'Scrape it quickly and move on', 'Document it and report it to the operator in writing as a fire hazard needing certified cleaning', 'Schedule yourself to clean the ducts'],
            correct: 2,
            exp: 'Duct/plenum grease is building-fire fuel. Reporting in writing protects lives and liability; certified exhaust cleaners do the remediation.',
          },
        ],
      },
      {
        title: 'Wet-Chemical Fire Suppression',
        body: [
          'Above every Type I hood sits an automatic fire suppression system — almost universally wet-chemical (UL 300 listed): a tank of potassium-based liquid agent, a releasing mechanism, distribution piping to nozzles aimed at each appliance, the plenum, and the duct, and detection by fusible links (metal elements that melt at rated temperature) or thermal detectors along the hood. When it fires, the agent saponifies burning grease — turns the fuel surface to soap foam — cooling and sealing it against reflash.',
          'Actuation does three things at once, and you must know all three because you will meet them mid-diagnosis: agent discharges to the protected surfaces; the gas supply to equipment under the hood shuts automatically (a mechanical gas valve or electric solenoid tied to the release); and electrical equipment under the hood typically drops via shunt-trip breakers or contactors. A kitchen where "everything under the hood died and there is a chemical smell" has had a discharge — and a kitchen where gas will not restore may have a tripped suppression gas valve someone missed.',
          'The service boundary is bright-line: fire suppression systems are inspected, maintained, and recharged ONLY by licensed fire protection contractors on a code-mandated semi-annual schedule. Kitchen equipment techs do not recharge tanks, do not replace fusible links, do not re-aim or cap nozzles, and never move appliances in ways that break nozzle aim — appliance-to-nozzle alignment is part of the listed design. What you DO: verify nozzle caps are present (they keep grease out of nozzles — missing caps get reported), confirm the manual pull station is visible and unobstructed, check inspection tags for currency (out-of-date tags are a written report item), and after ANY appliance relocation, flag that suppression must be reviewed by the fire protection contractor.',
          'The kitchen fire protocol rounds out your competence: small grease fire → the manual pull station is always an option and shuts fuel down with the discharge; never water on grease, never move a flaming fryer, and class-K portable extinguishers are the follow-up to suppression discharge, not a substitute. After any discharge: equipment under the hood stays down until suppression is recharged and the system re-armed by the licensed contractor — and the cleanup (that soap everywhere) plus gas/electric restoration is where your trade re-enters the story.',
        ],
        keyPoints: [
          'Wet chemical saponifies grease fires and seals against reflash; discharge also kills gas and power under the hood',
          'Licensed fire protection contractors only: recharge, links, nozzles, aiming — bright-line boundary',
          'Your checks: nozzle caps present, pull station clear, inspection tags current, report appliance moves',
          '"Everything under the hood is dead" after a discharge includes tripped gas valves and shunt breakers',
        ],
        quiz: [
          {
            q: 'After a suppression discharge, the gas cook line will not restore even with breakers reset. The likely reason is:',
            a: ['Melted gas piping', 'The suppression-linked mechanical gas valve tripped and must be reset/re-armed as part of system restoration', 'Utility shutoff', 'Coincidental regulator failure'],
            correct: 1,
            exp: 'Discharge automatically closes the gas valve serving hood equipment. Restoration follows the licensed contractor\'s re-arming of the system.',
          },
          {
            q: 'A customer asks you to swap the fryer and the griddle positions under the hood. Beyond the utilities, you must:',
            a: ['Nothing else — equipment placement is the customer\'s choice', 'Flag that suppression nozzle aiming is appliance-specific and the fire protection contractor must review the change', 'Re-aim the nozzles yourself to match', 'Remove the nozzle caps for better coverage'],
            correct: 1,
            exp: 'Nozzle-to-appliance alignment is part of the listed system design. Moving appliances without suppression review leaves the new arrangement unprotected.',
          },
          {
            q: 'Missing chrome caps on suppression nozzles over the char-broiler should be:',
            a: ['Ignored — caps are cosmetic', 'Reported: caps keep grease from plugging nozzles, and plugged nozzles fail to discharge', 'Replaced with tape', 'Removed from the other nozzles for symmetry'],
            correct: 1,
            exp: 'Blow-off caps protect nozzle orifices from grease loading. A grease-plugged nozzle may not discharge over a fire — report for fire-protection service.',
          },
        ],
      },
    ],
    test: [
      { q: 'Type I hoods differ from Type II because they:', a: ['Are larger', 'Handle grease-laden vapor and require grease-rated ducts, filters, and suppression per NFPA 96', 'Handle steam only', 'Need no fans'], correct: 1, exp: 'Grease changes everything: welded liquid-tight duct, baffle filters, fire suppression, and cleaning schedules.' },
      { q: 'Grease baffle filters must be oriented:', a: ['Baffles horizontal', 'Baffles vertical so collected grease drains to the troughs', 'At 45 degrees', 'Orientation does not matter'], correct: 1, exp: 'Vertical baffles let inertially collected grease run down to the collection trough instead of pooling in the airstream.' },
      { q: 'A strongly negative kitchen (failed make-up air) causes:', a: ['Better hood capture', 'Pilot outages, smoke spill at hood edges, and flue backdrafting', 'Lower CO risk', 'Quieter fans'], correct: 1, exp: 'Exhaust without make-up starves the space: combustion air, hood containment, and flue draft all suffer at once.' },
      { q: 'Kitchen exhaust duct interiors are cleaned by:', a: ['The equipment tech during PMs', 'Certified exhaust cleaning companies on NFPA 96 schedules', 'The kitchen staff monthly', 'Nobody — ducts self-clean'], correct: 1, exp: 'System-wide grease removal is a certified specialty on code-mandated frequency; techs document and report what they see.' },
      { q: 'The purpose of exhaust fan hinge kits is:', a: ['Hurricane resistance', 'Tipping the fan up so the duct and fan can actually be cleaned', 'Vibration damping', 'Bird exclusion'], correct: 1, exp: 'Without a hinge kit the duct behind the fan never gets cleaned — a standard write-up item.' },
      { q: 'Cooking appliances under a Type I hood are interlocked so they:', a: ['Heat faster', 'Cannot operate unless the exhaust system runs', 'Share one thermostat', 'Shut off at closing time'], correct: 1, exp: 'NFPA 96 requires exhaust operation for cooking — a failed proving switch mimics a dead cook line.' },
      { q: 'Wet-chemical agent extinguishes grease fires by:', a: ['Displacing oxygen with inert gas', 'Saponification — converting the burning grease surface to a sealing soap foam', 'Freezing the oil', 'High-pressure blast'], correct: 1, exp: 'The potassium agent reacts with hot grease to form foam that cools and seals against reflash — the UL 300 principle.' },
      { q: 'Fusible links in a suppression system:', a: ['Carry electrical current', 'Melt at rated temperature to trigger discharge', 'Filter grease', 'Support the filters'], correct: 1, exp: 'The links are the thermal detection: fire heat melts them, releasing the mechanism.' },
      { q: 'Recharging suppression tanks and replacing fusible links is work for:', a: ['Any kitchen equipment tech', 'Licensed fire protection contractors only', 'The restaurant manager', 'The duct cleaning crew'], correct: 1, exp: 'Fire suppression maintenance is licensed, code-scheduled work — a bright-line boundary for equipment techs.' },
      { q: 'After a suppression discharge, equipment under the hood may return to service:', a: ['As soon as it is wiped down', 'Only after the licensed contractor recharges and re-arms the system (and gas/power are properly restored)', 'The next morning', 'Once the smell fades'], correct: 1, exp: 'The kitchen is unprotected until the system is recharged and re-armed; gas valves and shunt trips restore as part of that process.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 21 — COMMERCIAL DISHWASHERS & WAREWASHING
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-dishwashers',
    num: 21,
    title: 'Commercial Dishwashers & Warewashing',
    desc: 'High-temp and chemical sanitizing machines, wash/rinse systems, booster heaters, chemical dosing, and the water mechanics of clean dishes.',
    slides: [
      {
        title: 'How Commercial Dish Machines Sanitize',
        body: [
          'A commercial dish machine has one legal job: sanitized ware. Two technologies deliver it. High-temp machines sanitize with heat: a final rinse of 180°F water (design target; 160°F minimum at the dish surface) delivered by a booster heater. Low-temp (chemical) machines sanitize with chlorine-based sanitizer dosed into a cooler final rinse (typically 120-140°F, 50-100 ppm chlorine). The machine type determines the entire service pattern: high-temp problems are heat problems; low-temp problems are chemistry problems.',
          'The formats scale with volume: undercounter machines (bars, cafés), door/hood machines (the workhorse — rack slides in, hood pulls down), conveyor machines (racks ride a chain through wash/rinse zones), and flight machines (a continuous belt, no racks, institutional scale). All share the same anatomy: a wash tank with heater holding recirculated detergent water, a wash pump driving spray arms, a timed cycle, and the final sanitizing rinse from fresh water.',
          'Health codes verify results, and so do you: temperature gauges must work, and the proof standard for high-temp machines is a surface-temperature check (irreversible thermolabel on a plate through a cycle, or a max-registering thermometer) — 160°F at the dish. For low-temp, chlorine test strips on the final rinse. Leave every dish machine call with the sanitizing proof done and written on the ticket: this machine is the health inspector\'s first stop.',
          'The failure taxonomy to carry in: results problems (dirty, spotted, filmed, or unsanitized ware), cycle problems (will not start, will not fill, will not drain, stuck in cycle), and leak/mechanical problems (doors, pumps, arms, racks). Every complaint sorts into one of the three, and each has its own short list.',
        ],
        tables: [
          {
            caption: 'High-temp vs low-temp sanitizing',
            headers: ['', 'High-Temp', 'Low-Temp (Chemical)'],
            rows: [
              ['Sanitizer', '180°F final rinse (160°F at dish)', '50-100 ppm chlorine in final rinse'],
              ['Key hardware', 'Booster heater', 'Sanitizer dosing pump'],
              ['Verification', 'Thermolabel / max-register thermometer', 'Chlorine test strips'],
              ['Classic failure', 'Booster underperformance', 'Empty product / failed dosing pump'],
            ],
          },
        ],
        keyPoints: [
          'High-temp = heat problems; low-temp = chemistry problems — identify the machine type first',
          'Proof standard: 160°F at the dish surface (thermolabel) or 50-100 ppm chlorine (test strips)',
          'Verify and document sanitizing performance on every dish machine call',
          'Sort every complaint: results, cycle, or leak/mechanical',
        ],
        quiz: [
          {
            q: 'The sanitizing proof for a high-temp machine is:',
            a: ['The gauge reading 180°F', 'A thermolabel or max-registering thermometer confirming 160°F at the dish surface', 'Steam visible during rinse', 'The booster power light'],
            correct: 1,
            exp: 'Gauges read water in the pipe; codes care about dish-surface temperature. The thermolabel through a cycle is the accepted proof.',
          },
          {
            q: 'A low-temp machine washing well but failing sanitizer test strips most likely has:',
            a: ['A weak wash pump', 'An empty sanitizer container or failed/airlocked dosing pump', 'A cold wash tank', 'A blocked drain'],
            correct: 1,
            exp: 'Low-temp sanitizing is pure chemistry: no chlorine reaching the rinse means no sanitizing, and the dosing system is the suspect chain.',
          },
        ],
      },
      {
        title: 'Heat: Tanks, Boosters, and Temperature Complaints',
        body: [
          'High-temp machines are a chain of heaters. Incoming hot water (building supply, 110-140°F) fills the wash tank, where a tank heater (element under the water, or steam coil) holds wash temperature around 150-160°F. The booster heater — a compact high-power water heater, electric elements or steam — raises final-rinse water to 180°F. Each heater is a Module 11 element system: elements (R = V²/P), thermostats, high-limits, contactors — plus, because this is kitchen water at its hottest, the heaviest scale burden in the building.',
          'Temperature complaints localize by which temperature is wrong. Wash temp low: tank heater chain, or the machine is being run faster than the tank can recover (flood of cold racks). Rinse temp low: verify incoming water temperature FIRST — a booster is sized to raise water roughly 40°F, so 100°F incoming water yields a 140°F rinse from a perfectly healthy booster (the building water heater is your fault line, not the machine). Then the booster chain: elements (scale-shrouded elements underheat before they fail), thermostat, and the pressure/flow conditions its sensors demand.',
          'Scale, once more, with feeling: booster tanks and their elements scale faster than anything else you service. Symptoms: rinse temperature sliding down over weeks, elements failing in rotation, and rinse pressure dropping as the tank throat narrows. Deliming boosters and wash tanks on a schedule (and verifying any water treatment) belongs in every dish-machine PM.',
          'Steam-heated machines swap elements for steam coils and control valves — the diagnostic logic is identical (heat source, control, high-limit) with steam supply pressure as the "incoming voltage." Verify steam pressure and trap function before condemning coils; a failed steam trap floods the coil with condensate and mimics a dead heater.',
        ],
        keyPoints: [
          'Rinse temp low: check INCOMING water temp first — boosters raise water ~40°F, no more',
          'Scale-shrouded booster elements underheat before they fail — delime on schedule',
          'Wash temp low under rush conditions may be recovery capacity, not a fault',
          'Steam machines: verify steam pressure and traps before condemning coils',
        ],
        quiz: [
          {
            q: 'A high-temp machine rinses at 145°F. Incoming water to the booster measures 105°F. The correct conclusion is:',
            a: ['The booster has failed', 'The building water heater is delivering low water — a healthy booster can only add ~40°F', 'The rinse thermostat is misadjusted', 'The machine needs a bigger booster'],
            correct: 1,
            exp: 'Boosters are sized for roughly a 40°F rise. 105 + 40 = 145: the booster is doing its job on starved input. Fix the building hot water first.',
          },
          {
            q: 'A booster\'s rinse temperature has drifted down over two months and one element has failed. The underlying condition to fix is:',
            a: ['Undersized wiring', 'Scale accumulation on elements and tank — delime and address water treatment', 'A weak contactor', 'Excessive rack throughput'],
            correct: 1,
            exp: 'Scale insulates elements (falling performance) and overheats them (rotating failures). New elements without deliming repeat the cycle.',
          },
        ],
      },
      {
        title: 'Results, Cycles, and Chemistry',
        body: [
          'Dirty ware with good temperatures is a mechanics-and-chemistry problem. Walk the wash path: spray arms spinning freely with clear nozzles (food debris and broken glass plug them; scale narrows them), wash pump strong (a worn impeller or a pump strainer full of debris starves every arm), curtains in place on conveyors (missing curtains let zones cross-contaminate), racks correct (wrong racks stack ware into shadows). Detergent dosing next: most machines use conductivity-controlled dosing into the wash tank — a probe coated in grease reads "enough detergent" forever and doses nothing.',
          'Spotting and film speak chemistry: white film that vinegar dissolves = mineral scale (hard water, exhausted treatment, or rinse-aid empty); film vinegar ignores = detergent residue (over-dosing or weak final rinse); greasy redeposit = wash water exhausted (staff not changing tank water) or detergent under-dosed. The rinse-aid pump (tiny peristaltic, prone to dried-out squeeze tubes) earns its keep here — sheeting action is what makes ware dry spotless.',
          'Cycle faults follow the machine\'s sequence and its interlocks: will not start = door switch/latch (the #1), then controls; will not fill = fill valve, float/level probe (scale again), or a drain that will not seal (water in, water out); will not drain = drain pump/valve and the plugged standpipe or shared grease-trap line the machine drains into (a slow building drain masquerades as a machine fault); stuck mid-cycle = timers/boards and the temperature holds (some machines wait for rinse temperature — a "stuck" machine may be waiting on a starved booster: circle back to heat).',
          'Warewashing closes with the professional habits: verify final results with your own eyes (run a full rack), leave dosing rates where the chemical rep set them unless you have cause and document any change, and coach the operator on the free stuff — scrapping practices, tank water changes, curtain placement, deliming schedule. The dish machine is the most operator-dependent appliance in the kitchen; half its "failures" are workflow.',
        ],
        keyPoints: [
          'Dirty ware, good temps: arms, nozzles, pump, strainer, curtains, racks, then detergent probe',
          'Vinegar test on film: dissolves = mineral/rinse-aid issue; persists = detergent residue',
          'Will not start = door switch first; will not fill = valve/level probe/drain seal; stuck = may be waiting on rinse temp',
          'Run a full rack to verify results; document chemical changes; coach operator workflow',
        ],
        quiz: [
          {
            q: 'Ware exits with a white film. Vinegar on a test plate dissolves it instantly. The film is:',
            a: ['Detergent residue — reduce dosing', 'Mineral scale/hard-water film — water treatment and rinse-aid are the fix path', 'Bacterial growth', 'Wash-arm grease'],
            correct: 1,
            exp: 'Acid-soluble white film is mineral. Check softener/treatment status and rinse-aid delivery; detergent residue would ignore the vinegar.',
          },
          {
            q: 'A conveyor machine washes poorly though pumps and temps check out. Several zone curtains are missing. The curtains matter because:',
            a: ['They are cosmetic splash guards only', 'They separate zones — without them wash and rinse water cross-contaminate and spray patterns collapse', 'They hold heat in the vent hood', 'They slow the conveyor'],
            correct: 1,
            exp: 'Curtains are functional zone barriers. Missing curtains let detergent wash into the rinse and sprays short-circuit — poor results with healthy machinery.',
          },
          {
            q: 'A dish machine "will not start" with power confirmed. The first component to check is:',
            a: ['The wash pump capacitor', 'The door switch / latch engagement', 'The booster heater', 'The drain valve'],
            correct: 1,
            exp: 'The door interlock is the gate for everything and takes the most physical abuse. It is the #1 no-start cause on dish machines.',
          },
        ],
      },
    ],
    test: [
      { q: 'High-temp machines sanitize with:', a: ['Chlorine at 50-100 ppm', 'A 180°F final rinse achieving 160°F at the dish surface', 'Quaternary ammonia', 'UV light'], correct: 1, exp: 'Heat sanitizing: 180°F rinse design, proven by 160°F at the ware surface.' },
      { q: 'Low-temp machines sanitize with:', a: ['160°F wash water', 'Chlorine sanitizer dosed at ~50-100 ppm in the final rinse', 'Steam injection', 'Rinse aid'], correct: 1, exp: 'Chemical sanitizing replaces heat: chlorine concentration verified by test strips.' },
      { q: 'The booster heater\'s job is to:', a: ['Heat the wash tank', 'Raise final-rinse water roughly 40°F to sanitizing temperature', 'Pressurize the building supply', 'Dry the ware'], correct: 1, exp: 'The booster lifts building hot water (~140°F) to the 180°F rinse — and can only add about 40°F.' },
      { q: 'Rinse temperature 40°F low with a healthy booster usually traces to:', a: ['The rinse thermostat', 'Low incoming water temperature from the building heater', 'Excess rinse pressure', 'A failed thermolabel'], correct: 1, exp: 'Boosters amplify what they receive. Starved incoming water is the first check on low-rinse-temp calls.' },
      { q: 'The heaviest scale burden in the kitchen is found in:', a: ['The walk-in evaporator', 'Booster heaters and dish machine tanks', 'Fryer oil', 'The ice bin'], correct: 1, exp: 'Hottest water + constant throughput = fastest scaling. Deliming belongs in every dish machine PM.' },
      { q: 'A detergent conductivity probe coated in grease causes:', a: ['Over-dosing', 'No detergent dosing — the probe forever reads "enough"', 'Foaming', 'High rinse temperature'], correct: 1, exp: 'The coated probe reports adequate conductivity regardless of actual detergent, so the pump never doses.' },
      { q: 'Greasy redeposit on washed ware points to:', a: ['Rinse aid overdose', 'Exhausted wash-tank water or under-dosed detergent', 'A hot booster', 'Excess chlorine'], correct: 1, exp: 'Saturated tank water re-paints soil onto ware — tank change discipline and dosing verification are the fixes.' },
      { q: 'The most common cause of a no-start dish machine is:', a: ['A failed control board', 'The door switch or latch not engaging', 'A tripped booster high-limit', 'Low water pressure'], correct: 1, exp: 'The abused door interlock gates the entire cycle — always the first check.' },
      { q: 'A machine that fills, then immediately loses its water usually has:', a: ['A cracked wash arm', 'A drain valve/flapper failing to seal', 'An oversized fill valve', 'A stuck float'], correct: 1, exp: 'Water in, water straight out: the drain seal is the leak path to check first.' },
      { q: 'A conveyor machine "stuck" mid-cycle that resumes after several minutes may be:', a: ['Haunted', 'Waiting on rinse temperature from a starved or scaled booster', 'Suffering belt stretch', 'Out of rinse aid'], correct: 1, exp: 'Temperature-hold logic pauses cycles until sanitizing temp is available — a heat problem wearing a control-problem costume.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 22 — COFFEE, ESPRESSO & BEVERAGE EQUIPMENT
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-beverage-equipment',
    num: 22,
    title: 'Coffee, Espresso & Beverage Equipment',
    desc: 'Brewers, espresso machines, frozen beverage and soft-serve, and post-mix soda systems — small water systems where quality is the product.',
    slides: [
      {
        title: 'Coffee Brewers and Espresso Machines',
        body: [
          'A commercial coffee brewer is a small water system: fill valve, heated tank with thermostat and element (hello, Module 11 and scale), a timed dispense valve, and a spray head that showers water over the grounds. Faults are compact and familiar: no brew = fill/level or dispense valve; weak coffee = short water volume (timer, valve flow, or a scale-narrowed spray head that channels water down the middle of the bed); tepid coffee = element/thermostat chain; warmers on the base are simple elements switched per station.',
          'Espresso machines raise the stakes: a pressure boiler (or dual boilers/thermoblocks) holding water at ~1-1.5 bar for steam and brew water around 200°F, a pump driving ~9 bar through the coffee, group heads with precision gaskets, and steam wands. They are pressure vessels with all the discipline that implies: relief valves sacred, gauges verified, and heating elements interlocked to water level (dry-fire kills boilers). Classic complaints: no steam pressure (element/thermostat/pressurestat chain), pump not building 9 bar (pump wear, or — always — scale in the flow path), leaking group heads (gaskets are consumables), and "sour/bitter shots," which are usually temperature or grind issues that a pressure-and-temperature verification either confirms as equipment or hands back to the barista.',
          'Water quality is not a footnote here — it is the product. Espresso and coffee water wants filtration and controlled hardness (some minerality brews better than none, which is why straight RO is often wrong for coffee); machine longevity wants scale control. The practical answer is beverage-specific filtration/treatment cartridges, sized and dated, plus descaling per the manufacturer. When a café\'s machines keep failing, audit the treatment system first: an exhausted cartridge quietly executes every machine downstream of it.',
          'On the counter nearby live the adjacent species: bulk brewers, tea brewers, and hot-water dispensers — all the same tank/element/valve pattern; and airpots/urns whose complaints (cold, slow) are usually their own warmers or seals, not the brewer. The pattern recognition is the skill: everything on the beverage counter is a tank, an element, a thermostat, a valve, and a scale problem in different proportions.',
        ],
        keyPoints: [
          'Brewer faults: fill/dispense valves, timer volume, spray head condition, element chain',
          'Espresso machines are pressure vessels: relief valves and water-level interlocks are sacrosanct',
          'Weak shots/no pressure: suspect scale in the flow path before condemning pumps',
          'Beverage water wants controlled minerality — audit treatment cartridges when machines keep failing',
        ],
        quiz: [
          {
            q: 'A brewer produces weak coffee; the spray head shows heavy scale with only the center holes open. The mechanism of the weak brew is:',
            a: ['Water too hot', 'Channeling — water pours down the center of the grounds bed instead of showering evenly', 'Beans too coarse', 'The timer running long'],
            correct: 1,
            exp: 'A scaled spray head concentrates flow through the middle, under-extracting the outer bed. Descale/replace the spray head and audit water treatment.',
          },
          {
            q: 'An espresso machine\'s pump gauge reads 6 bar at the group instead of 9. Before replacing the pump you should:',
            a: ['Rebuild the group head', 'Check for scale restriction in the flow path and verify against a blind-filter pressure test', 'Adjust the pressurestat', 'Change the water filter housing O-ring'],
            correct: 1,
            exp: 'Scale restrictions mimic pump wear. A blind-filter (backflush) test isolates true pump output from flow-path losses.',
          },
        ],
      },
      {
        title: 'Frozen Beverage and Soft-Serve',
        body: [
          'Frozen beverage machines (granita, frozen carbonated drinks) and soft-serve machines are refrigeration systems (Modules 13-15 apply wholesale) wrapped around a product cylinder: refrigerant chills the cylinder wall, a motor-driven auger/beater scrapes the freezing product off the wall and keeps it in motion, and consistency control decides when to run refrigeration (by beater motor torque/amp draw — thicker product loads the motor — or by product temperature/viscosity sensors).',
          'The mechanical wear parts define the service rhythm: beater blades and scraper edges wear (product gets icy/coarse), drive belts and gearboxes carry heavy loads, and the shaft seals and O-rings around the product cylinder are consumables whose failure shows as product leaking into drip trays or — worse — into the gearbox. O-ring and seal kits, lubricated with food-safe lube only, on schedule, are the difference between a machine and a mess.',
          'Soft-serve adds dairy, and dairy adds law: these machines pasteurize or hold product cold under strict health rules, demand daily/weekly disassembly and cleaning by staff, and their "failures" are overwhelmingly assembly errors after cleaning — mis-seated beaters, missing O-rings, misassembled door valves. The first diagnostic question on any soft-serve call: "when was it last torn down and who reassembled it?" Verify correct assembly before condemning anything.',
          'Consistency complaints sort neatly: too soft = refrigeration side (the usual suspects: condenser cleanliness first) or overloaded hopper/mix issues; too hard/icy = consistency control setting, worn beaters, or low mix level freezing product solid; motor overloads tripping = product frozen too hard (control), worn drive, or a gearbox dying. And on any machine with a mix hopper: mix out-of-date or foamed by overfilling behaves like a machine fault — the product is part of the system.',
        ],
        keyPoints: [
          'Frozen beverage = refrigeration + auger: consistency controlled via beater load or product sensors',
          'Seals and O-rings are scheduled consumables with food-safe lube — leaks into trays/gearboxes otherwise',
          'Soft-serve "failures" after cleaning are usually reassembly errors — verify assembly first',
          'Too soft = refrigeration side; too hard/icy = control, beaters, or mix level',
        ],
        quiz: [
          {
            q: 'A soft-serve machine leaks product into the drip tray after last night\'s cleaning. The most likely cause is:',
            a: ['A refrigerant leak', 'A missing or mis-seated shaft/door O-ring from reassembly', 'A failed compressor', 'Overfilled hopper'],
            correct: 1,
            exp: 'Post-cleaning leaks are assembly casualties: verify every seal and O-ring seat before deeper diagnosis. It is the #1 soft-serve service pattern.',
          },
          {
            q: 'A granita machine serves watery product; its condenser coil is packed with dust. The chain of cause is:',
            a: ['Weak mix — blame the syrup', 'Blocked condenser → poor refrigeration → cylinder cannot freeze product to consistency', 'Auger spinning too fast', 'Ambient too cold'],
            correct: 1,
            exp: 'Module 13\'s first law returns: a suffocated condenser cannot reject heat, so the cylinder never reaches consistency. Clean the coil, then re-evaluate.',
          },
        ],
      },
      {
        title: 'Post-Mix Soda and Dispense Systems',
        body: [
          'Post-mix soda systems build the drink at the tap: chilled carbonated water and syrup meet at the dispensing valve in a fixed ratio. The chain: a CO2 supply (cylinders or bulk) at regulated pressures, a carbonator (pump, tank, and level probe making soda water), syrup delivery (bag-in-box pumped by CO2-driven diaphragm pumps), a chiller (cold plate in an ice bin, or mechanical remote chiller), and the valves. Every complaint decomposes along that chain.',
          'Flat soda = carbonation side: CO2 pressure low or off, carbonator pump/probe fault, or warm water (carbonation collapses in warm water — a failed chiller makes "flat" drinks that are really warm drinks). No syrup / all soda = syrup side: empty BIB, a starved CO2 line to the syrup pump, a stalled pump, or a kinked line. Wrong taste = ratio: valves meter water and syrup to a spec (commonly around 5:1); a brix cup or ratio device under the nozzle measures both streams, and valve flow controls adjust them. Off-flavors with correct ratio = water filtration overdue, lines due for sanitizing, or syrup past date.',
          'CO2 itself deserves respect: it is an asphyxiant that displaces air silently. Bulk CO2 systems and cylinder banks in closed back rooms plus a leak equal a real hazard — many jurisdictions now require CO2 monitors where bulk systems live. If you enter a syrup room and feel breathless or the monitor alarms, leave first and ventilate; never troubleshoot inside a CO2 cloud.',
          'Beverage closes the equipment tour with a commercial note: soda systems are often maintained under the soda brand\'s own service program, cold plates belong to ice-bin installs, and the boundaries between your contract, the beverage company\'s tech, and the ice machine vendor vary site by site. Learn each account\'s boundaries — the fastest way to burn goodwill is redoing (or breaking) another vendor\'s covered work.',
        ],
        keyPoints: [
          'Flat soda = CO2, carbonator, or WARM WATER (failed chilling) — warm drinks read as flat',
          'Ratio complaints: measure water and syrup with a brix cup, adjust valve flow controls',
          'CO2 displaces air silently — respect monitors, ventilate, never work inside a leak',
          'Know the vendor boundaries on beverage accounts before touching covered equipment',
        ],
        quiz: [
          {
            q: 'Every flavor on a soda tower pours flat, and drinks feel barely cool. The unified diagnosis is:',
            a: ['All syrup pumps failed at once', 'The chiller/cold plate has failed — warm water cannot hold carbonation', 'The CO2 blend is wrong', 'All valves need rebuilding'],
            correct: 1,
            exp: 'One failure explaining all flavors: carbonation collapses in warm water. Fix the chilling, and the "flat" complaint resolves.',
          },
          {
            q: 'Before working in a back room housing a bulk CO2 tank, the professional precaution is:',
            a: ['Bring a flashlight', 'Heed the CO2 monitor / ventilate — CO2 displaces air silently and asphyxiates', 'Wear hearing protection', 'Shut off the syrup pumps'],
            correct: 1,
            exp: 'CO2 is heavier than air, invisible, and silent. Monitors exist because techs and staff have died in syrup rooms — alarm or breathlessness means leave and ventilate.',
          },
        ],
      },
    ],
    test: [
      { q: 'Weak coffee from a brewer with a heavily scaled spray head is caused by:', a: ['Overheated water', 'Channeled water flow under-extracting the grounds bed', 'Excess brew volume', 'A slow warmer element'], correct: 1, exp: 'Scale closes outer spray holes; water pours down the bed\'s center and under-extracts the rest.' },
      { q: 'Espresso machine boiler elements are interlocked to water level because:', a: ['It saves energy', 'Dry-firing destroys the element and boiler', 'Steam pressure rises otherwise', 'The pump needs backpressure'], correct: 1, exp: 'An element exposed by low water overheats instantly — the interlock is boiler protection.' },
      { q: 'An espresso pump reading low pressure should first be checked against:', a: ['A new gauge', 'Scale restriction via a blind-filter test isolating pump output from flow-path losses', 'A different grinder', 'Higher voltage'], correct: 1, exp: 'Scale mimics pump wear; the blind-filter test separates the two before parts are ordered.' },
      { q: 'Straight RO water is often wrong for coffee because:', a: ['It is too expensive', 'Some mineral content is needed for proper extraction and flavor', 'It damages pumps', 'It cannot be heated'], correct: 1, exp: 'Beverage treatment aims for controlled minerality, not zero — brew chemistry needs some hardness.' },
      { q: 'Soft-serve machines that "fail" the morning after cleaning most often have:', a: ['Compressor faults', 'Reassembly errors: mis-seated beaters, missing O-rings, misassembled valves', 'Refrigerant loss overnight', 'Mix spoilage'], correct: 1, exp: 'Daily teardown means daily reassembly risk — verify assembly before condemning components.' },
      { q: 'Icy, coarse texture from a frozen beverage machine suggests:', a: ['A dirty condenser', 'Worn beater/scraper blades or consistency set too hard / low mix', 'CO2 shortage', 'An oversized compressor'], correct: 1, exp: 'Scraping and consistency control make smooth product; worn blades and over-hard settings make ice.' },
      { q: 'Soft-serve product too soft with a grease-blanketed condenser is explained by:', a: ['Bad mix', 'The refrigeration side failing to freeze — clean the condenser first', 'A slipping belt', 'An overfilled hopper only'], correct: 1, exp: 'The kitchen\'s first law again: suffocated condensers cannot freeze product to spec.' },
      { q: 'Soda pouring as all syrup with no fizz from every valve indicates:', a: ['All valves failed', 'Carbonated water side down: CO2, carbonator pump/probe, or water supply', 'Syrup over-pressure', 'Cold plate failure'], correct: 1, exp: 'The common element across all valves is the soda-water supply — the carbonation chain is the suspect.' },
      { q: 'Drink ratio (water:syrup) is verified with:', a: ['A thermometer', 'A brix cup or ratio device measuring both streams at the valve', 'A manometer', 'Taste testing'], correct: 1, exp: 'The ratio cup catches both streams; valve flow controls adjust to the spec (commonly ~5:1).' },
      { q: 'The CO2 hazard in beverage back rooms is:', a: ['Flammability', 'Silent air displacement causing asphyxiation', 'Corrosive fumes', 'High-pressure shrapnel only'], correct: 1, exp: 'CO2 quietly fills enclosed spaces from the floor up. Monitors, ventilation, and leaving when alarmed are the discipline.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 23 — DIGITAL CONTROLS & CONNECTIVITY
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-digital-controls',
    num: 23,
    title: 'Digital Controls & Connectivity',
    desc: 'Microprocessor controls, sensors, error codes, and connected kitchen equipment — diagnosing the computer that runs the appliance.',
    slides: [
      {
        title: 'Inputs, Outputs, and the Control Board',
        body: [
          'Modern kitchen equipment replaced electromechanical thermostats and timers with a control board: a microprocessor reading inputs (temperature probes, level probes, door switches, pressure switches, flame sensors) and driving outputs (relays and triacs switching contactors, valves, ignitors, motors, displays). Every board fault call reduces to one question asked three ways: is the input lying, is the output failing, or is the board itself dead?',
          'Inputs first, because they fail most. Temperature sensing is dominated by thermistors (resistance falls as temperature rises on the common NTC type) and RTDs (resistance rises with temperature, typically 1000Ω-type in kitchen gear): both are verified with an ohmmeter against the manufacturer\'s resistance-temperature chart — a probe reading 50°F wrong makes a healthy board do insane things. Probe wiring matters as much as probes: kitchen vibration, heat, and cleaning chemicals attack connectors; a corroded probe plug adds resistance that reads as temperature error. Switch inputs (doors, pressure, floats) verify with continuity and by watching the board\'s own diagnostic display as you actuate them.',
          'Outputs are half board, half external: when a load does not run, measure whether the board is delivering the output voltage at its terminal. Output voltage present + load dead = external problem (the Module 11 chain: contactor, motor, element). No output voltage with all input conditions satisfied = board output stage — and many "dead outputs" are really an unsatisfied interlock the logic is honoring, which is why you check inputs first and read the manual\'s ladder of conditions.',
          'Board replacement discipline: kill power (boards die from live disconnection), photograph every connector before touching, transfer configuration (DIP switches, jumpers, program settings — a new board with wrong configuration creates a second fault), and find out WHY the board died. Boards murdered by water ingress from pressure-washing, chronic overvoltage, or a shorted external load will murder their replacements identically. The board is rarely the root cause; it is usually the victim.',
        ],
        keyPoints: [
          'Every control fault: lying input, failing output, or dead board — in that order of likelihood',
          'Verify probes with an ohmmeter against the resistance-temperature chart; check connectors too',
          'Output voltage present = external load problem; absent = check interlock conditions before the board',
          'Replaced boards die again unless you find what killed the original',
        ],
        quiz: [
          {
            q: 'An oven overshoots wildly. Its NTC thermistor probe measures 40kΩ at room temperature; the chart says it should read 10kΩ. The correct action is:',
            a: ['Replace the control board', 'Replace the probe (and inspect its connector) — the board is acting correctly on false data', 'Recalibrate the display', 'Adjust the offset until it cooks right'],
            correct: 1,
            exp: 'A probe reading far off-chart feeds the board fiction. The board responds correctly to wrong data — fix the data source.',
          },
          {
            q: 'A board shows the heat cycle active but its heat output terminal measures 0V with all safeties closed. Before condemning the board:',
            a: ['Replace it — 0V proves it', 'Verify every interlock condition in the manual\'s output logic — many "dead outputs" are the logic honoring an unsatisfied condition', 'Jumper the output to test the contactor', 'Reflash the firmware'],
            correct: 1,
            exp: 'Boards withhold outputs when any required condition (door, fan proving, temperature window, time delay) is unmet. Read the ladder before replacing the computer.',
          },
          {
            q: 'The most common reason a replacement control board fails within weeks is:',
            a: ['Factory defects', 'The root cause that killed the first board (water ingress, shorted load, overvoltage) was never found', 'Static during installation', 'Firmware mismatch'],
            correct: 1,
            exp: 'Boards are usually victims, not causes. Diagnose the murder weapon or the replacement inherits it.',
          },
        ],
      },
      {
        title: 'Error Codes, Diagnostics, and Service Modes',
        body: [
          'Error codes are the appliance\'s testimony — valuable, but testimony, not verdict. A code names the condition the board detected, not the component that caused it: "E31 — high discharge temperature" on a combi tells you what was sensed; whether the cause is a dirty condenser, a failed fan, a lying sensor, or an actual refrigerant fault is still your job. The productive pattern: code → look up its detection logic in the service manual → verify the sensed condition independently with your own instruments → then trace cause.',
          'Service modes are the underused power tool: most modern kitchen controls hide a technician menu (key sequences or codes from the service manual) exposing live sensor readings, manual output actuation (run THIS fan, open THIS valve, fire THIS ignitor — component testing without disassembly), error history with timestamps, cycle counters, and configuration. Error history converts intermittent complaints from folklore into data: "F2 seventeen times, always around 11am Saturdays" points at the lunch-rush pattern nobody mentioned on the ticket.',
          'Firmware and configuration round out the software layer: some faults are cured by manufacturer firmware updates (and some plagues are caused by wrong versions); configuration menus set equipment personality (voltage, gas type, altitude, Fahrenheit/Celsius, feature flags) — a unit "broken since installation" is often mis-configured, not defective. Record configuration before and after any change, and after any board swap verify configuration against the data plate and manual, not against memory.',
          'When boards misbehave randomly — ghost resets, scrambled displays, codes that shotgun across systems — think environment before silicon: supply voltage (measure under load; kitchens brown out at rush), grounding (control electronics need the solid ground path that corroded kitchen connections deny), moisture intrusion (lift the board and look for the pressure-washer stains), and heat (a control compartment whose cooling vents are grease-blocked cooks its own computer). The kitchen is the harshest environment consumer-grade electronics ever face; respect what it does to them.',
        ],
        keyPoints: [
          'Codes name the detected condition, not the guilty component — verify independently, then trace cause',
          'Learn the service menus: live sensor data, manual output actuation, and error history with timestamps',
          'Mis-configuration mimics defects: verify config against data plate after every board swap',
          'Random board behavior: check voltage under load, ground integrity, moisture, and compartment heat first',
        ],
        quiz: [
          {
            q: 'A fryer intermittently resets mid-shift; error history shows resets cluster at 11:45am daily. Supply voltage at the fryer measures 189V during the lunch rush (rated 208V). The diagnosis is:',
            a: ['A failing control board', 'Building voltage sag under rush load — an electrical supply problem, not an appliance fault', 'Grease on the display', 'Firmware corruption'],
            correct: 1,
            exp: 'Brownouts reset control electronics on schedule with kitchen load. The error history found the pattern; the meter found the cause.',
          },
          {
            q: 'The fastest way to test whether a combi\'s drain pump itself works is:',
            a: ['Run full cycles and listen', 'Actuate the pump directly from the service menu\'s output test', 'Remove and bench-test it', 'Measure its winding resistance only'],
            correct: 1,
            exp: 'Manual output actuation runs the component on command — isolating it from cycle logic and interlocks in seconds.',
          },
        ],
      },
      {
        title: 'Connected Kitchens',
        body: [
          'Kitchen equipment is joining the network: combis, fryers, refrigeration, and ice machines increasingly ship with WiFi/Ethernet, feeding manufacturer clouds and kitchen-management platforms — remote temperature logging (HACCP compliance automated), error alerts pushed to managers and service companies before staff notice, recipe/menu distribution across chains, and usage analytics. For service, telemetry is a gift: a remote dashboard showing a walk-in\'s temperature climbing since 2am, with compressor cycling data, is diagnosis begun before the truck rolls.',
          'The tech\'s connectivity duties are mostly practical: getting equipment onto the customer\'s network (kitchens are RF-hostile — stainless steel everywhere; equipment often needs the site\'s IT for credentials and firewall rules), verifying cloud registration per the manufacturer\'s app, and knowing what the platform can tell you before and during a call. Connectivity failures themselves are usually network-side: credentials changed, router replaced, IT blocked the port — verify the appliance\'s network status screen before blaming its radio.',
          'Connected equipment adds etiquette and boundaries: remote parameter changes (setpoints, recipes) may be locked to the chain\'s corporate account — do not fight the lock, coordinate with it; software/firmware pushed remotely by manufacturers can change behavior between your visits (check version history when "it worked last week"); and customer data (sales volumes visible in usage stats) deserves the same discretion as anything else you see in a business\'s back room.',
          'Where this heads is worth knowing for module 27\'s career lens: service organizations increasingly triage from telemetry, dispatch with probable-cause and parts predicted, and sell uptime monitoring as a product. The tech who can read a cloud dashboard, correlate it with gauge-and-meter reality on site, and close the loop in the platform\'s work order is the tech the connected-kitchen era promotes.',
        ],
        keyPoints: [
          'Telemetry starts diagnosis before arrival: temperature history and cycling data are evidence',
          'Connectivity faults are usually network-side: check the appliance\'s network status screen first',
          'Respect remote-management locks and check firmware version history on "changed behavior" calls',
          'Reading dashboards + verifying on-site with instruments = the promotable connected-kitchen skill set',
        ],
        quiz: [
          {
            q: 'A chain\'s connected fryer stopped reporting to its dashboard the week the store replaced its router. The first check is:',
            a: ['The fryer\'s control board', 'The appliance\'s network status screen and re-joining it to the new network', 'The fryer\'s temperature probe', 'The cloud service status page only'],
            correct: 1,
            exp: 'The timeline names the suspect: new router, new credentials. Network-side causes dominate connectivity failures.',
          },
          {
            q: 'Remote telemetry shows a walk-in climbing from 36°F to 50°F between 2-6am with the compressor running continuously. Before arrival, the strongest hypothesis is:',
            a: ['Staff left the door open all night', 'A capacity-side fault (dirty condenser, low charge, iced evaporator) — running-but-losing points at capacity, not control', 'The board lost its setpoint', 'The telemetry is wrong'],
            correct: 1,
            exp: 'Continuous running with rising temperature is a machine trying and failing — capacity-side faults. A door event would show recovery after closing; control faults show not-running.',
          },
        ],
      },
    ],
    test: [
      { q: 'The diagnostic order for control-system faults is:', a: ['Board, outputs, inputs', 'Inputs (sensors/switches), outputs, then the board itself', 'Firmware first', 'Replace the board and observe'], correct: 1, exp: 'Inputs fail most and make healthy boards act insane; outputs next; the board itself is the last suspect.' },
      { q: 'An NTC thermistor\'s resistance:', a: ['Rises with temperature', 'Falls as temperature rises', 'Stays constant', 'Depends on voltage'], correct: 1, exp: 'Negative Temperature Coefficient: verify against the chart with an ohmmeter.' },
      { q: 'Board output terminal shows proper voltage but the motor does not run. The fault is:', a: ['The board output stage', 'External: wiring, contactor, or the motor itself', 'The input sensors', 'The firmware'], correct: 1, exp: 'Voltage delivered = board did its job. The Module 11 load chain takes over from there.' },
      { q: 'Before unplugging connectors on a control board you should:', a: ['Discharge the display', 'Kill power and photograph the connector layout', 'Warm the board', 'Ground the chassis to neutral'], correct: 1, exp: 'Live disconnection kills boards; photos prevent reassembly errors that create second faults.' },
      { q: 'An error code tells you:', a: ['Which part to replace', 'The condition the board detected — cause still requires verification', 'The repair procedure', 'Whether warranty applies'], correct: 1, exp: 'Codes are testimony, not verdicts: verify the sensed condition with instruments, then trace cause.' },
      { q: 'Service-mode error history is most valuable for:', a: ['Warranty claims', 'Converting intermittent complaints into time-stamped patterns', 'Resetting the appliance', 'Impressing the customer'], correct: 1, exp: 'Timestamps and counts turn "it sometimes dies" into "it dies at every lunch rush" — a diagnosable pattern.' },
      { q: 'A unit "broken since install" that behaves as if built for different conditions likely has:', a: ['Shipping damage', 'Wrong configuration (voltage/gas/altitude/units) — verify config against the data plate', 'A counterfeit board', 'Bad firmware'], correct: 1, exp: 'Configuration sets the appliance\'s personality; mis-set menus mimic hardware defects from day one.' },
      { q: 'Ghost resets and scrambled displays across an appliance\'s controls suggest checking first:', a: ['Every sensor', 'Supply voltage under load, grounding, moisture, and compartment heat', 'The relay outputs', 'Cloud connectivity'], correct: 1, exp: 'Environment kills kitchen electronics: brownouts, bad grounds, pressure-washer water, and grease-blocked cooling.' },
      { q: 'A connected appliance that stopped reporting after site IT changes should first be checked at:', a: ['The manufacturer cloud', 'Its own network status screen / rejoining the network', 'The control board', 'The building firewall logs'], correct: 1, exp: 'Network-side causes dominate: credentials and routers change; radios rarely die on schedule with IT work.' },
      { q: 'Telemetry showing continuous compressor run with climbing box temperature indicates:', a: ['A control fault', 'A capacity-side fault: condenser, charge, or airflow', 'A door left open briefly', 'Telemetry error'], correct: 1, exp: 'Trying-but-losing is capacity; not-trying is control. Remote data sorts the call before the truck rolls.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 24 — PREVENTIVE MAINTENANCE PROGRAMS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-preventive-maintenance',
    num: 24,
    title: 'Preventive Maintenance Programs',
    desc: 'PM as a discipline and a product: what to check, how often, how to document it, and why kitchens buy it.',
    slides: [
      {
        title: 'Why PM Sells and What It Contains',
        body: [
          'A commercial kitchen loses money by the minute when equipment dies mid-service: a failed walk-in can cost thousands in product; a dead fryer or dish machine can close a line or the whole house. Preventive maintenance exists because the math is lopsided — a scheduled visit costs a fraction of one emergency call plus its downtime, and this course has already taught you why: nearly every killer fault (grease-blanketed condensers, scale-buried elements, worn door gaskets, blinded probes, greasy fan bearings) is a slow, visible, preventable accumulation.',
          'A kitchen PM visit has a rhythm built from everything you now know. Refrigeration: condenser and evaporator coils cleaned, gaskets paper-tested, drains flushed and heaters verified, temperatures logged against spec, ice machine cleaned/sanitized per schedule. Cooking: burners and pilots inspected and flames judged, elements and connections checked, thermostats verified against a calibrated probe, high-limits tested, oil and combustion condition noted. Warewashing: delime per water conditions, arms and nozzles cleared, dosing verified with strips/labels, final-rinse proof documented. Ventilation: filters, visible plenum condition, fan belts and bearings, interlock function. Everything: cords, plugs, legs and casters, and the water treatment cartridges that protect it all — dated and changed.',
          'Frequency follows duty: quarterly is the workhorse cadence for full kitchen PM, with monthly touches for high-abuse items (ice machine cleaning in yeast-heavy operations, fryer boil-outs, condenser washes in grease-heavy stores) and semi-annual/annual for deeper work (combi descale cycles, calibrations, ventilation deep checks). Water treatment changes ride their own gallons-or-months schedule. A good program tunes cadence per site — the pizza shop\'s ice machine and the seafood house\'s walk-ins do not live identical lives.',
        ],
        keyPoints: [
          'PM economics: scheduled visits cost a fraction of emergency downtime — that is the pitch and the truth',
          'Every PM item traces to a killer fault you now know: coils, scale, gaskets, probes, belts, filters',
          'Quarterly full-kitchen cadence, tuned per site: monthly high-abuse touches, deeper semi-annual work',
          'Water treatment cartridges are PM\'s quiet backbone — dated, changed, documented',
        ],
        quiz: [
          {
            q: 'The strongest honest argument for a kitchen PM contract is:',
            a: ['It voids fewer warranties', 'Most catastrophic kitchen failures are slow, visible accumulations that scheduled visits catch cheaply', 'It guarantees no failures ever', 'Techs prefer scheduled work'],
            correct: 1,
            exp: 'Dirty condensers, scale, worn gaskets, greasy bearings: the killers accumulate visibly. PM interrupts them at a fraction of downtime cost.',
          },
          {
            q: 'PM frequency should be set by:',
            a: ['A universal industry standard', 'Each site\'s duty and conditions — grease load, water quality, hours, and equipment mix', 'The customer\'s budget alone', 'Manufacturer defaults only'],
            correct: 1,
            exp: 'Quarterly is the workhorse baseline, but the yeast-heavy bakery\'s ice machine and the grease-heavy grill\'s condensers earn monthly attention.',
          },
        ],
      },
      {
        title: 'Documentation, Agreements, and Warranty',
        body: [
          'PM without documentation is rumor. Every visit produces a written record per unit: what was inspected, measured values (temperatures, pressures, sanitizer ppm, rinse proof), what was cleaned/adjusted/replaced, and — the high-value line — conditions noted and recommendations made. That recommendations line is where PM protects everyone: "condenser fan bearing noisy, replacement recommended" dated three months before the walk-in failure is the difference between a trusted advisor and a lawsuit defendant. Photos cost nothing and settle everything.',
          'Service agreements formalize the deal, and you should understand what yours covers even if you never write one: scope (which equipment, which tasks, what cadence), what is included (labor? parts? priority response?) versus billable, response-time commitments for covered customers, and exclusions (abuse, operator error, acts of grease). Techs live the agreement\'s edges daily: knowing whether the dead pump in front of you is covered work, billable work, or quote-first work is as much a part of professionalism as the repair.',
          'Warranty is the third documentation domain. Equipment warranties (typically 1 year parts and labor through authorized servicers, longer on specific components like compressors or tanks) demand: verified model/serial and install date, failure documentation the manufacturer accepts, authorization before major repairs, correct claim procedure, and returned parts tagged and shipped as directed. Two field rules: never tell a customer definitively "that is warranty" before verification (unverified promises come out of somebody\'s pocket), and document root cause even on warranty jobs — warranty replaces the victim, but your Module 15/23 discipline still has to catch the murderer or the claim repeats.',
          'The commercial loop closes here: PM visits generate the condition reports; condition reports generate approved repairs; documented repairs build the trust that renews agreements. The technician who writes clearly, photographs faithfully, and recommends honestly is not doing paperwork — they are building the book of business that keeps them employed at the top rate.',
        ],
        keyPoints: [
          'Every PM visit: measured values, actions taken, and dated recommendations — with photos',
          'Know your agreement\'s edges: covered vs billable vs quote-first, per equipment and task',
          'Never promise warranty before verification; follow claim procedure; tag and return parts',
          'Documentation is the product: condition reports → approved repairs → renewed trust',
        ],
        quiz: [
          {
            q: 'Three months after your PM report noted "compressor start components weakening, replacement recommended — declined by manager," the walk-in fails overnight. Your documentation:',
            a: ['Is irrelevant now', 'Protects your company and frames the failure as a declined recommendation, not negligence', 'Should be revised after the fact', 'Voids the customer\'s insurance'],
            correct: 1,
            exp: 'Dated findings with declined recommendations are exactly why PM documentation exists — for the customer\'s planning and everyone\'s protection.',
          },
          {
            q: 'A customer insists a failed 3-year-old fryer element "must be warranty." The professional response is:',
            a: ['Agree to keep goodwill', 'Verify model/serial, install date, and warranty terms before making any commitment', 'Refuse outright', 'Split the difference on the bill'],
            correct: 1,
            exp: 'Warranty is a verifiable fact, not a negotiation. Unverified promises become someone\'s unplanned expense — usually yours.',
          },
        ],
      },
    ],
    test: [
      { q: 'The economic case for PM rests on:', a: ['Cheaper parts in bulk', 'Scheduled visits costing far less than emergency failures plus downtime and product loss', 'Manufacturer rebates', 'Fewer invoices'], correct: 1, exp: 'One prevented walk-in failure or line-down event pays for a year of visits.' },
      { q: 'The single most failure-preventing PM task in kitchens is:', a: ['Tightening screws', 'Cleaning condenser coils (and the airflow they need)', 'Updating firmware', 'Replacing all gaskets annually'], correct: 1, exp: 'The grease-dusted condenser is the #1 root cause in kitchen refrigeration — PM interrupts it on schedule.' },
      { q: 'High-temp dish machine PM must document:', a: ['Detergent brand', 'Final-rinse sanitizing proof (temperature at the ware)', 'Rack count', 'Water bill'], correct: 1, exp: 'Sanitizing proof is the health-code heart of the machine — measured and written every visit.' },
      { q: 'Water treatment cartridges on PM programs are:', a: ['Optional extras', 'Dated, changed on schedule, and documented — they protect everything downstream', 'Cleaned and reused', 'Only for espresso machines'], correct: 1, exp: 'Exhausted treatment quietly executes steamers, boosters, combis, and ice machines. The cartridge date is cheap insurance.' },
      { q: 'A noted-but-declined PM recommendation should be:', a: ['Deleted to avoid friction', 'Documented with date and the decline — it protects both parties later', 'Repeated verbally only', 'Escalated to the manufacturer'], correct: 1, exp: 'The dated, declined recommendation is the professional record when the predicted failure arrives.' },
      { q: 'Service agreement "edges" a tech must know are:', a: ['Font and formatting', 'What is covered vs billable vs quote-first for the equipment in front of them', 'The salesperson\'s commission', 'Renewal dates only'], correct: 1, exp: 'Whether this repair is covered work changes what you do next — knowing is part of the job.' },
      { q: 'Before telling a customer a repair is under warranty you must:', a: ['Check their payment history', 'Verify model/serial, install date, and terms', 'Call the distributor', 'Nothing — goodwill first'], correct: 1, exp: 'Warranty is verifiable fact; premature promises become unfunded costs.' },
      { q: 'On warranty repairs, root-cause diagnosis is:', a: ['Skippable — the part is free', 'Still mandatory, or the replacement fails and the claim repeats', 'The manufacturer\'s job', 'Only for compressors'], correct: 1, exp: 'Warranty replaces victims; your diagnosis still has to catch the killer (scale, voltage, water, airflow).' },
      { q: 'Photos on PM and repair tickets are:', a: ['Unprofessional', 'Cheap, decisive documentation of conditions found and work done', 'A privacy violation', 'Only for insurance claims'], correct: 1, exp: 'A photo of the grease-blanketed coil or the scale-buried element settles every later question.' },
      { q: 'The commercial loop PM documentation feeds is:', a: ['Reports → filing cabinet', 'Condition reports → approved repairs → trust → renewed agreements', 'Photos → social media', 'Findings → warranty claims'], correct: 1, exp: 'Honest, documented findings are how PM programs grow — the paperwork is the product.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 25 — SYSTEMATIC TROUBLESHOOTING & DIAGNOSTICS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-troubleshooting',
    num: 25,
    title: 'Systematic Troubleshooting & Diagnostics',
    desc: 'The capstone method: one diagnostic frame across electrical, gas, refrigeration, and water — plus repair-vs-replace judgment.',
    slides: [
      {
        title: 'The Universal Method',
        body: [
          'Seventeen modules of equipment reduce to one method. 1) DEFINE the complaint precisely — interrogate the operator: What exactly does it do? Since when? All the time or sometimes-when? What changed (new staff, new cleaning routine, renovation, that new fan)? Half of diagnosis is turning "the oven is broken" into "the second shelf bakes pale on weekends." 2) VERIFY the complaint yourself — reproduce it, measure it; you cannot fix what you have not observed, and you will bill embarrassingly for fixing what did not exist. 3) LOCALIZE to a subsystem — every appliance in this course decomposes: power/fuel supply → conversion (elements, burners, compressor) → distribution (air, water, refrigerant) → control (sensors, logic, safeties). The walkarounds, control-chain traces, and freeze/harvest observations you have learned are all localization rituals. 4) ISOLATE the component with instruments — meter, manometer, gauges, thermometer: measurements, not vibes. 5) REPAIR, then 6) VERIFY THE FIX under real conditions — a full cycle, a full rack, a full recovery to setpoint — and 7) FIND THE ROOT CAUSE so the repair survives you: the burned element was killed by scale; the dead board was killed by the pressure washer; the seized compressor was killed by the condenser. Fix the killer, not just the corpse.',
          'The method has force-multipliers. Split-half: on any chain (the control ladder, a gas train, a water path), test the middle first — each measurement halves the search space; the fifteen-component chain falls in four measurements. Swap-test: identical adjacent equipment (fryer banks, twin valves) lets you exchange a suspect part and watch whether the fault follows it. Pattern library: everything this course taught — the 208/240 trap, the welded contactor, the frost signatures, the microamp-starved flame rod, the scale-blinded probe — is a catalog of priors; check the catalog before checking everything.',
          'And the discipline that separates professionals: change ONE variable at a time (shotgun repairs that "fix" things teach nothing and often un-fix under warranty), write down readings as you take them (memory lies by the third measurement), and when truly stuck, re-verify your assumptions from zero — the "dead" circuit that was never actually verified dead, the "correct" gas pressure measured with burners off, the data plate nobody read. Stuck diagnoses are almost always a false assumption, not a mysterious machine.',
        ],
        keyPoints: [
          'Define → verify → localize → isolate → repair → verify fix → root cause: every call, every system',
          'Split-half search on chains; swap-tests on twins; the course\'s fault patterns as your priors',
          'One variable at a time, readings written down, fixes verified under real load',
          'Stuck? Re-verify assumptions from zero — the mystery is usually a false premise',
        ],
        quiz: [
          {
            q: 'A 12-component control chain shows an open somewhere. Split-half search finds it in at most:',
            a: ['12 measurements', 'About 4 measurements (halving each time)', '6 measurements', '2 measurements'],
            correct: 1,
            exp: '12 → 6 → 3 → 1-2: binary search collapses chains logarithmically. Test the middle, not the ends.',
          },
          {
            q: 'You replace three parts at once and the fryer works. The problem with this "win" is:',
            a: ['Inventory paperwork', 'You learned nothing, billed for two innocent parts, and cannot answer which fix holds when it recurs', 'The parts needed burn-in', 'Nothing — results matter'],
            correct: 1,
            exp: 'Shotgun repairs destroy the information the fault contained. One variable at a time is slower per step and faster per truth.',
          },
          {
            q: 'The step that keeps a correct repair from failing again in eight weeks is:',
            a: ['Torque-checking fasteners', 'Root-cause analysis — identifying what killed the failed component', 'Premium replacement parts', 'A longer test cycle'],
            correct: 1,
            exp: 'Elements die of scale, boards die of water, compressors die of condensers. Replace the victim AND arrest the killer.',
          },
        ],
      },
      {
        title: 'Cross-System Reasoning',
        body: [
          'Real kitchen faults ignore subsystem boundaries, and the best diagnosticians reason across them. The course\'s recurring cross-system chains: WATER → EVERYTHING (untreated water kills steamer elements, blinds combi probes, plugs espresso paths, films dishware — one exhausted cartridge, five "unrelated" tickets); AIRFLOW → REFRIGERATION AND COMBUSTION (the failed make-up air unit that starves fryer burners, spills the hood, AND runs every condenser hot in a now-negative 95°F kitchen); POWER QUALITY → ELECTRONICS (the rush-hour brownout resetting boards across the cook line); VENTILATION INTERLOCKS → "EVERYTHING DIED" (the proving switch that shut the whole line down by design).',
          'Multi-symptom calls are therefore a gift: symptoms that share a cause point at it. Three flavors flat at the soda tower = the shared carbonation/chilling chain, not three valves. Every gas appliance sooting = building gas pressure or combustion air, not five dirty burners. Walk-in AND prep table AND ice machine all struggling since Tuesday = what changed Tuesday in their shared environment (condenser airflow? Ambient? Power?). Ask "what do the victims share?" before dispatching yourself down five separate rabbit holes.',
          'Repair-versus-replace is the judgment layer on top of diagnosis, and it is a numbers conversation delivered honestly: repair cost against replacement cost, age against expected service life, this failure against the unit\'s failure history (the third compressor conversation is really a replacement conversation), efficiency and refrigerant obsolescence (repairing an R-404A antique into its fourth leak has a compliance clock ticking), parts availability, and downtime tolerance (the only fryer in a food truck buys repairs a fourth back-up fryer never would). Your job is the honest framing with numbers — "this repair is $900 on a $2,400 unit in year nine of a ten-year life" — and the customer\'s job is the decision.',
          'The capstone habit: after every interesting call, close the loop on yourself. What did the fault turn out to be? What was the earliest evidence that pointed there? What would have found it faster? Diagnosticians are built call by call from exactly that review — the pattern library grows, the priors sharpen, and the tech who does this for five years walks into kitchens knowing what is wrong before the tool bag opens. That tech is Module 27\'s subject: the one who becomes the lead, the trainer, the manager.',
        ],
        keyPoints: [
          'Shared-cause reasoning: multi-symptom calls point at what the victims share',
          'Water, airflow, power quality, and interlocks are the great cross-system killers',
          'Repair-vs-replace: honest numbers (cost, age, history, refrigerant, downtime) — customer decides',
          'Review every interesting call: earliest evidence, faster path — that is how diagnosticians are built',
        ],
        quiz: [
          {
            q: 'Since Tuesday: the walk-in runs warm, the prep table struggles, and the ice machine\'s production halved. The diagnostic question to ask FIRST is:',
            a: ['Which unit is oldest?', 'What do all three share, and what changed Tuesday (ambient heat, condenser airflow, power)?', 'Which has the lowest charge?', 'Who serviced them last?'],
            correct: 1,
            exp: 'Three refrigeration victims with one onset date share an environmental cause — find Tuesday\'s change before opening three sealed systems.',
          },
          {
            q: 'A 9-year-old reach-in (typical life ~10-12 years) needs a $900 compressor; replacement is $2,400. The professional move is:',
            a: ['Just do the repair — it is authorized work', 'Present both numbers with age and history honestly and let the customer decide', 'Refuse the repair', 'Recommend replacement to raise the ticket'],
            correct: 1,
            exp: 'Repair-vs-replace is the customer\'s economic decision, made well only when the tech frames the numbers honestly.',
          },
        ],
      },
    ],
    test: [
      { q: 'The correct first step on any service call is:', a: ['Open the control panel', 'Define and verify the complaint precisely — reproduce and measure it', 'Check the breaker', 'Read error codes'], correct: 1, exp: 'You cannot fix what you have not observed; precise definition halves the diagnosis.' },
      { q: 'Every kitchen appliance localizes into the subsystems:', a: ['Left side, right side', 'Supply → conversion → distribution → control', 'Analog vs digital', 'Wet vs dry'], correct: 1, exp: 'Power/fuel in, conversion to heat/cold/motion, distribution by air/water/refrigerant, governed by controls — the universal decomposition.' },
      { q: 'Split-half diagnosis means:', a: ['Two techs working opposite ends', 'Testing the middle of a chain so each measurement halves the search space', 'Checking half the appliance per visit', 'Splitting the invoice'], correct: 1, exp: 'Binary search on any chain: logarithmic instead of linear hunting.' },
      { q: 'A swap-test is valid when:', a: ['Any two parts look similar', 'Identical adjacent equipment lets a suspect part move and the fault follow (or not)', 'The part is cheap', 'The manual allows it'], correct: 1, exp: 'Twin fryer banks and matched valves let the fault vote: it follows the guilty part.' },
      { q: 'Changing several parts at once is poor practice because:', a: ['It is slower', 'It destroys causal information, bills innocents, and leaves recurrence unexplainable', 'Manufacturers forbid it', 'It voids calibration'], correct: 1, exp: 'One variable at a time preserves the information the fault contains.' },
      { q: 'A correct repair without root-cause analysis:', a: ['Is complete', 'Leaves the killer in place — the replacement dies on the same schedule', 'Just needs documentation', 'Earns the same trust'], correct: 1, exp: 'Scale, water, airflow, and voltage kill again unless arrested.' },
      { q: 'Multi-symptom calls across several machines are best opened by asking:', a: ['Which machine matters most?', 'What do the victims share, and what changed at symptom onset?', 'Which is under warranty?', 'Which is loudest?'], correct: 1, exp: 'Shared-cause reasoning: environment, water, power, and airflow serve many machines at once.' },
      { q: 'A whole cook line dead with good breakers should immediately suggest:', a: ['Mass appliance failure', 'A shared upstream cause — like the hood exhaust interlock/proving switch', 'Vandalism', 'A utility brownout only'], correct: 1, exp: 'NFPA 96 interlocks kill the line by design when exhaust proving fails — the classic shared-cause trap.' },
      { q: 'Repair-vs-replace framing belongs to:', a: ['The tech\'s preference', 'Honest numbers — repair cost, unit age/life, failure history, refrigerant status, downtime — with the customer deciding', 'The manufacturer', 'Whoever pays the invoice'], correct: 1, exp: 'The tech frames facts; the customer owns the economic decision.' },
      { q: 'The habit that builds diagnostic mastery over years is:', a: ['Collecting service manuals', 'Reviewing each interesting call: what was the earliest evidence and the faster path?', 'Memorizing error codes', 'Upgrading tools annually'], correct: 1, exp: 'The post-call review grows the pattern library that lets veterans smell the fault from the doorway.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 26 — STARTUP, COMMISSIONING & CUSTOMER HANDOFF
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-startup-commissioning',
    num: 26,
    title: 'Startup, Commissioning & Customer Handoff',
    desc: 'Installation verification, startup procedure, operator training, and the documentation that closes an install professionally.',
    slides: [
      {
        title: 'Installation Verification and Startup',
        body: [
          'Commissioning is proving a machine is installed right before proving it runs right — because startup on a bad installation certifies a future failure. The verification sweep, before anything powers on: UTILITIES — supply voltage/phase against the data plate (the 208/240 trap is born at installation), correctly sized and dedicated breakers, gas type and manifold pressure verified with your manometer (a propane-converted unit on natural gas is an installation error you catch NOW), water supply pressure and treatment in place, drains with proper air gaps (direct-plumbed drains on food equipment violate code). PLACEMENT — clearances to combustibles per the data plate, condenser breathing room, level (fryers drain and doors swing by level; refrigeration oil returns by level), under the hood if it cooks (with suppression nozzle coverage confirmed for the new arrangement — Module 20), and restrained flexible gas connectors on castered equipment.',
          'Then startup per the manufacturer\'s sequence — which exists because order matters: combis prime their generators before heating; refrigeration establishes oil and pressures before loading; gas equipment proves ignition and combustion (flame appearance, manometer under fire) before calibration. During startup you baseline the unit: record operating temperatures, pressures, amp draws, and combustion values while it is new and right. That baseline sheet is a gift to every future tech — including you — because "what should it read?" now has a documented answer for this exact unit.',
          'Run the machine through a real cycle under real conditions — a full preheat and recovery, a rack through the dish machine with sanitizing proof, ice through a full freeze-harvest, product to temperature in the blast chiller. Commissioning is complete when the machine has done its actual job once, measured, in front of you.',
        ],
        keyPoints: [
          'Verify utilities against the data plate BEFORE power-on: voltage/phase, gas type and pressure, water, drains, breakers',
          'Placement is performance: clearances, condenser air, level, hood coverage, restrained connectors',
          'Follow the manufacturer\'s startup sequence and record a baseline (temps, pressures, amps, combustion)',
          'Done means the machine performed its real job once, measured, in front of you',
        ],
        quiz: [
          {
            q: 'A new fryer\'s data plate says 240V/3Ø; the receptacle measures 208V/3Ø. The commissioning action is:',
            a: ['Start it anyway — it will just run a little slow', 'Stop and resolve the supply mismatch now — element output and warranty both depend on it', 'Derate the thermostat', 'Swap elements for 208V versions yourself and continue'],
            correct: 1,
            exp: 'Commissioning exists to catch exactly this. Starting up a mismatched unit certifies chronic complaints and a warranty argument.',
          },
          {
            q: 'Recording baseline readings (temps, pressures, amps) at startup matters because:',
            a: ['Manufacturers require it for registration', 'It documents what THIS healthy unit reads — the reference every future diagnosis will wish it had', 'It fills out the invoice', 'Codes demand it'],
            correct: 1,
            exp: 'A documented healthy baseline turns future "is this reading normal?" questions into lookups instead of guesses.',
          },
        ],
      },
      {
        title: 'Operator Training and Professional Handoff',
        body: [
          'The most reliable predictor of a new machine\'s service history is not the brand — it is the training of the people who use and clean it daily. You have seen the evidence all course: soft-serve "failures" that are reassembly errors, prep tables defeated by overfilled pans, boil-overs clogging burners, pressure-washed control boards, dish machines run on exhausted tank water. Handoff training targets exactly these: daily operation (startup, shutdown, what normal looks and sounds like), cleaning boundaries (what gets cleaned how, and the NEVER list — never pressure-wash controls, never hose electrical compartments, never scrape the evaporator), consumable duties (filters, oil, deliming schedules, treatment cartridge dates), and the difference between operator tasks and service calls (reset one high-limit trip? Maybe. Reset it daily? Call).',
          'Train the people who actually do the work — the opening cook and the closing dishwasher, not just the manager — and train show-then-do: walk it, then watch them do it. Leave the laminated quick-card (normal readings, daily/weekly duties, "call service if" triggers, and the service number) mounted on or near the unit. Ten minutes of handoff training prevents the plurality of year-one service calls, and the calls it prevents are the unprofitable, trust-eroding kind.',
          'Close with documentation: a commissioning report (installation verified with any deficiencies noted and who owns them, startup measurements/baseline, real-cycle results with sanitizing or temperature proof where applicable, training delivered and to whom) — signed by the customer. Register the warranty with model, serial, and startup date, and leave the paperwork trail organized (manuals to the manager, quick-card on the machine, report copies to the office and your file). Deficiency handling is a professional skill of its own: what you found, whose scope fixes it (electrician? plumber? GC?), and what limits it imposes meanwhile — in writing, without drama. The signed commissioning report is the birth certificate of the machine\'s service life and frequently the first page of a service relationship that outlives the warranty.',
        ],
        keyPoints: [
          'Train the actual operators, show-then-do, with the NEVER list explicit (pressure washing kills boards)',
          'Leave the quick-card: normal readings, duties, call-service triggers, and your number',
          'Commissioning report: verification, baseline, real-cycle proof, training record — customer-signed',
          'Deficiencies: documented, scoped to the right trade, limits stated — in writing, without drama',
        ],
        quiz: [
          {
            q: 'The highest-leverage ten minutes at a new equipment handoff is spent on:',
            a: ['Reviewing the invoice', 'Training the actual daily operators on operation, cleaning boundaries, and call-service triggers', 'Photographing the install', 'Registering the warranty'],
            correct: 1,
            exp: 'Operator behavior drives year-one service history. The NEVER list and the quick-card prevent the most common, least profitable calls.',
          },
          {
            q: 'During commissioning you find the site electrician landed the new combi on an undersized breaker. You should:',
            a: ['Fix the breaker yourself to finish the job', 'Document the deficiency, assign it to the electrical scope in writing, and state what is limited until corrected', 'Start the unit and let the breaker prove itself', 'Cancel the commissioning silently'],
            correct: 1,
            exp: 'Deficiency handling: found, documented, routed to the owning trade, with interim limits stated. Professional, in writing, no drama.',
          },
        ],
      },
    ],
    test: [
      { q: 'Commissioning begins with:', a: ['The first heat cycle', 'Verifying the installation (utilities, placement, code items) against the data plate before power-on', 'Warranty registration', 'Operator training'], correct: 1, exp: 'Startup on a bad install certifies future failures — verification comes first.' },
      { q: 'The voltage check at commissioning catches:', a: ['Loose terminals', 'The 208/240 mismatch that otherwise becomes years of "slow equipment" complaints', 'Reversed polarity only', 'Utility billing errors'], correct: 1, exp: 'Supply-vs-data-plate mismatch is born at installation and cheapest to fix on day one.' },
      { q: 'Food equipment drains require:', a: ['Direct plumbing to the sewer', 'An air gap to prevent backflow contamination', 'A trap primer', 'Copper piping only'], correct: 1, exp: 'The air gap is a code-required backflow barrier between food equipment and drainage.' },
      { q: 'Relocating cooking appliances under a hood requires suppression review because:', a: ['The hood may be too small', 'Nozzle aiming is appliance-specific in the listed design', 'Fire codes tax relocations', 'The gas flex may be short'], correct: 1, exp: 'Module 20\'s rule surfaces at commissioning: nozzle-to-appliance alignment is part of the fire system design.' },
      { q: 'Startup baseline documentation should include:', a: ['Only the serial number', 'Operating temps, pressures, amp draws, and combustion values while the unit is new and right', 'The installer\'s names', 'Photos only'], correct: 1, exp: 'The healthy baseline is the reference every future diagnosis will lean on.' },
      { q: 'Commissioning is complete when:', a: ['The unit powers on', 'The machine has performed its real job once, measured (full cycle, sanitizing/temperature proof as applicable)', 'The customer pays', 'The packaging is removed'], correct: 1, exp: 'Real work, measured, in front of you — not just lights and fans.' },
      { q: 'Handoff training should be delivered to:', a: ['The owner only', 'The people who actually operate and clean the machine daily', 'The GC', 'Whoever signs'], correct: 1, exp: 'The opening cook and closing dishwasher determine the machine\'s service history.' },
      { q: 'The explicit NEVER list for operators includes:', a: ['Never adjust the thermostat', 'Never pressure-wash controls or hose electrical compartments', 'Never clean the condenser', 'Never call service'], correct: 1, exp: 'Water intrusion from aggressive cleaning is a leading killer of kitchen control electronics.' },
      { q: 'An installation deficiency found at commissioning is handled by:', a: ['Fixing it regardless of trade', 'Documenting it, assigning it to the owning scope in writing, and stating interim limits', 'Ignoring it if the unit runs', 'Canceling the install'], correct: 1, exp: 'Route it to the right trade, on paper, with consequences stated — professionalism without drama.' },
      { q: 'The signed commissioning report functions as:', a: ['A sales receipt', 'The machine\'s service-life birth certificate: verification, baseline, proof, and training record', 'A warranty substitute', 'Internal paperwork only'], correct: 1, exp: 'It anchors warranty, future diagnosis, and the service relationship in one signed document.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 27 — CAREER IN COMMERCIAL KITCHEN FIELD SERVICE
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'kitchen-career',
    num: 27,
    title: 'Career in Commercial Kitchen Field Service',
    desc: 'The job market, the certification ladder (EPA 608, CFESA, manufacturer schools), customer craft, and where the career leads.',
    slides: [
      {
        title: 'The Market and the Certification Ladder',
        body: [
          'Every restaurant, hospital cafeteria, school kitchen, hotel, stadium, grocery deli, and ghost kitchen in the country runs equipment that breaks, and the technicians who fix it are in chronic short supply — the same demographic cliff driving the UPS trade (Module 28 of that course tells the twin story): an aging workforce, too few entrants, and equipment growing more complex. Employers include dedicated commercial kitchen service companies (many CFESA-member firms), manufacturers\' own service arms, chain restaurants\' in-house teams, and general facilities companies. Entry technicians typically start in the $45-60K range, experienced multi-discipline techs (refrigeration + cooking + steam) commonly reach $70-90K, and lead/specialist roles — with the certifications below and OEM authorizations — exceed that, before the overtime that kitchen emergencies reliably supply.',
          'The certification ladder is concrete and worth climbing in order. EPA 608 (legally required for refrigerant work — Module 13): study Core + Type II at minimum; the Universal certification (all types) is the standard flex. CFESA (Commercial Food Equipment Service Association) certification is the industry\'s own credential track — written exams in Electric, Gas, Steam, and Refrigeration; certify in three or more (with the customer-service module) and you are a CFESA Certified Master Technician, the recognized top card in this trade. Manufacturer schools (Hobart, Rational, Middleby brands, Frymaster, Manitowoc/Welbilt, Hoshizaki, Taylor and many more) grant the model-specific training and warranty authorization that make you dispatchable — and more billable — on their equipment; companies routinely fund these because authorized techs are how they win OEM warranty work. Round it out per your niche: food-safety handler cards for working in live kitchens, gas-work qualifications where jurisdictions require them, and the OSHA-10/electrical safety base this course already gave you.',
          'This course\'s certificate — with the shared electrical foundation, NFPA-70E discipline, and meter craft of Modules 1-10 — is your entry credential: proof to an employer that the fundamentals are installed and the expensive part (safe habits) is already trained. Pair it with EPA 608 within your first months on the job; let your employer route you into CFESA and manufacturer schools from there.',
        ],
        keyPoints: [
          'Chronic technician shortage across every food-service vertical; complexity is rising, supply is not',
          'Ladder: EPA 608 (legal gate) → CFESA categories → Master Technician; manufacturer schools = warranty authorization',
          'Entry ~$45-60K; multi-discipline $70-90K; lead/OEM-authorized above that, plus reliable overtime',
          'This certificate + EPA 608 in your first months is the proven entry combination',
        ],
        quiz: [
          {
            q: 'The certification legally required before independent refrigerant work is:',
            a: ['CFESA Master Technician', 'EPA Section 608', 'OSHA-30', 'A manufacturer school certificate'],
            correct: 1,
            exp: '608 is the federal legal gate for opening systems and buying refrigerant; everything else is professional credential on top.',
          },
          {
            q: 'CFESA Master Technician status requires:',
            a: ['Ten years of service', 'Certification in three or more categories (Electric, Gas, Steam, Refrigeration) plus the customer-service module', 'A manufacturer sponsorship', 'An engineering degree'],
            correct: 1,
            exp: 'Master Technician is the trade\'s recognized top credential — three-plus written category certifications earn it.',
          },
          {
            q: 'Manufacturer training schools matter economically because they:',
            a: ['Are vacations', 'Grant warranty authorization that makes you dispatchable and billable on that brand\'s OEM work', 'Replace EPA 608', 'Are required by OSHA'],
            correct: 1,
            exp: 'Authorized techs are how service companies win manufacturer warranty contracts — which is why employers fund the schools.',
          },
        ],
      },
      {
        title: 'The Craft of the Job and Where It Leads',
        body: [
          'Kitchen service has a texture no other trade quite matches: you work in someone\'s livelihood, during their workday, around fire, water, 400°F oil, and a head chef whose lunch rush you are standing in. The soft-skill set is therefore part of the trade: announce yourself and work clean (food safety around your work area — your drill shavings cannot end up near prep), communicate in operator language ("the part that releases the ice was failing; it is replaced and I watched two perfect harvests" beats a part number), deliver bad news with options (repair/replace framing from Module 25), and leave every site cleaner than found with the paperwork done — the Module 24 loop: documentation is the product. Reliability compounds: kitchens remember the tech who showed up during the Saturday disaster, and route-density and contract renewals follow that reputation.',
          'Build the working kit deliberately: the Module 10 meter craft (DMM, clamp, megger where appropriate) plus manometer and combustion analyzer (Module 18), refrigeration gauges/scale/vacuum instruments and recovery gear (Module 15), thermometers you trust and verify (Module 17), and the humble decisive kit — gasket rollers, port brushes, coil combs, test strips, thermolabels. Van stock mirrors the failure patterns you now know: contactors, elements for your route\'s common units, universal thermostats and high-limits, gaskets, O-ring kits, dosing tubes, capacitors, and the water-treatment cartridges that fix root causes.',
          'The paths from the truck: LEAD/SENIOR TECH and field trainer (the Module 25 reviewer who builds other diagnosticians); SPECIALIST (the region\'s combi wizard or espresso/refrigeration authority — depth pays); SERVICE MANAGER/OPERATIONS (dispatch, contracts, P&L — the documentation habit is the audition); TECHNICAL SALES/OEM ROLES (factory service reps, trainers, and territory managers are overwhelmingly ex-techs); and OWNERSHIP — kitchen service is a fragmented industry of route-sized companies, and the tech with five years of route relationships, a master ticket or two, and clean paperwork habits is looking at the most realistic small-business runway in the trades. Every one of those doors opens off the same hallway: diagnose honestly, document faithfully, keep learning the ladder. Welcome to the trade.',
        ],
        keyPoints: [
          'Soft skills are trade skills: work clean in live kitchens, speak operator language, frame options honestly',
          'Kit and van stock mirror the course\'s failure patterns — including water treatment (root causes, not corpses)',
          'Paths: lead/trainer, specialist, service manager, OEM/technical sales, and realistic ownership',
          'Every path opens off the same hallway: honest diagnosis, faithful documentation, continuous learning',
        ],
        quiz: [
          {
            q: 'Explaining a completed repair to a kitchen manager is best done by:',
            a: ['Quoting part numbers and error codes', 'Operator language plus proof: what failed, what was done, and the verified result you watched', 'Leaving the old part on the counter', 'Emailing the service manual section'],
            correct: 1,
            exp: '"It is fixed and I watched it do its job correctly" in plain language is the communication the customer buys.',
          },
          {
            q: 'The most realistic ownership runway in this trade exists because:',
            a: ['Franchises are cheap', 'The industry is fragmented into route-sized companies where five years of relationships and clean paperwork is a viable foundation', 'Equipment is easy to finance', 'Manufacturers sell territories'],
            correct: 1,
            exp: 'Kitchen service remains a local-relationship business — the documented, trusted tech is most of the way to a company.',
          },
        ],
      },
    ],
    test: [
      { q: 'The commercial kitchen service labor market is characterized by:', a: ['Oversupply of techs', 'Chronic shortage with rising equipment complexity', 'Declining demand', 'Automation replacing techs'], correct: 1, exp: 'Aging workforce, few entrants, more complex equipment — the same shortage story as critical power.' },
      { q: 'EPA 608 Universal certification covers:', a: ['Small appliances only', 'All appliance types/categories of refrigerant work', 'Only R-290 systems', 'Automotive systems'], correct: 1, exp: 'Universal = all types; the standard professional target beyond the Type II minimum.' },
      { q: 'CFESA written certification categories are:', a: ['Bronze, Silver, Gold', 'Electric, Gas, Steam, and Refrigeration', 'Level 1-4', 'Cooking and Cooling'], correct: 1, exp: 'The four category exams (plus customer service) build to Master Technician at three or more.' },
      { q: 'Manufacturer warranty authorization typically requires:', a: ['Five years in trade', 'Completing that manufacturer\'s training school', 'CFESA membership', 'A state license'], correct: 1, exp: 'OEM schools grant the model training and the authorization that makes warranty work dispatchable to you.' },
      { q: 'Experienced multi-discipline kitchen techs commonly earn:', a: ['$30-40K', 'Roughly $70-90K, with leads and specialists above that', 'Minimum wage plus tips', '$150K to start'], correct: 1, exp: 'Refrigeration + cooking + steam breadth, with certifications, is what moves techs into the upper band.' },
      { q: 'Working in a live kitchen requires:', a: ['Working only after hours', 'Clean-work discipline: protecting food areas from your debris and coordinating around service', 'A food handler manager on site', 'Shutting the kitchen down'], correct: 1, exp: 'You are a guest in a food-production environment during its workday — cleanliness and coordination are trade skills.' },
      { q: 'Van stock should be built from:', a: ['Whatever is on sale', 'The failure patterns of your route\'s equipment — contactors, elements, gaskets, O-rings, treatment cartridges', 'One of every part', 'Manufacturer starter kits only'], correct: 1, exp: 'Stock mirrors the priors: the parts this course\'s fault patterns predict you will need.' },
      { q: 'The audition for service management roles is largely:', a: ['Seniority', 'The documentation, communication, and reliability habits shown as a tech', 'A management degree', 'Sales numbers'], correct: 1, exp: 'Dispatch, contracts, and P&L are run on exactly the habits Modules 24-26 train.' },
      { q: 'The specialist path (combi wizard, espresso authority) pays because:', a: ['Specialists work less', 'Depth on complex, high-value equipment commands premium rates and OEM relationships', 'It avoids paperwork', 'Generalists are being phased out'], correct: 1, exp: 'The hardest boxes (combis, espresso, refrigeration racks) reward the deepest techs.' },
      { q: 'The common foundation of every advancement path in this trade is:', a: ['Certifications alone', 'Honest diagnosis, faithful documentation, and continuous learning', 'Overtime volume', 'Brand loyalty'], correct: 1, exp: 'Lead, specialist, manager, OEM, or owner — all are built on the same three habits.' },
    ],
  },
];
