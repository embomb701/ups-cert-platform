export interface QuizQ {
  q: string;
  a: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  exp: string;
}

export interface PracticalChoice {
  id: string;
  label: string;
  sublabel?: string;
}

export interface PracticalMeter {
  id: string;
  label: string;
  detail: string;
  icon: string;
}

export interface PracticalDialMode {
  id: string;
  label: string;
  symbol: string;
}

export type PracticalStepType = 'meter_select' | 'dial_select' | 'lead_placement' | 'scenario';

export interface PracticalStep {
  id: string;
  type: PracticalStepType;
  title: string;
  prompt: string;
  meters?: PracticalMeter[];
  correctMeter?: string;
  dialModes?: PracticalDialMode[];
  correctDial?: string;
  redOptions?: PracticalChoice[];
  blackOptions?: PracticalChoice[];
  correctRed?: string;
  correctBlack?: string;
  scenarioOptions?: PracticalChoice[];
  correctScenario?: string;
  hint?: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

export interface PracticalExercise {
  intro: string;
  steps: PracticalStep[];
}

// ── Meter Simulator types ────────────────────────────────────────────────────

export interface MeterTestPoint {
  id: string;
  label: string;
  sublabel?: string;
  color?: 'red' | 'black' | 'blue' | 'green' | 'gray' | 'orange';
}

export interface MeterSimTask {
  id?: string;
  instruction: string;
  hint?: string;
  meterType: 'dmm' | 'clamp' | 'megger';
  // DMM
  correctDial?: string;
  correctRedJack?: 'vomA' | 'a10';
  correctRedPoint?: string;
  correctBlackPoint?: string;
  // Clamp
  correctClampDial?: string;
  correctClampAround?: string;
  // Megger
  correctMeggerVoltage?: string;
  correctMeggerLine?: string;
  correctMeggerEarth?: string;
  requiresMeggerTest?: boolean;
  // What the display shows in correct state
  displayReading: string;
  // What to show for common wrong setups  {condition key → reading}
  wrongReadings?: Record<string, string>;
  explanation: string;
}

export interface MeterSimExercise {
  intro: string;
  circuitLabel: string;
  circuitDescription: string;
  testPoints: MeterTestPoint[];
  tasks: MeterSimTask[];
}

export interface SlideTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface Slide {
  title: string;
  body: string[];
  tables?: SlideTable[];
  keyPoints: string[];
  quiz: QuizQ[];
  practical?: PracticalExercise;
  meterSim?: MeterSimExercise;
  widget?: string;
}

export interface TrainingModule {
  id: string;
  num: number;
  title: string;
  desc: string;
  slides: Slide[];
  test: QuizQ[];
}

export const MODULES: TrainingModule[] = [
  {
    id: 'intro-electricity',
    num: 1,
    title: 'Introduction to Electricity & Electronics',
    desc: 'Atomic structure, electrical charge, conductors, insulators — the foundational concepts every FSE must understand before touching a UPS.',
    slides: [
      {
        title: 'Atomic Structure and Electrical Charge',
        body: [
          'All matter is made of atoms. Each atom has a nucleus containing positively charged protons and neutral neutrons, surrounded by negatively charged electrons in orbital shells. The outermost electrons — called valence electrons — are what electricity is all about.',
          'In conductive materials like copper, valence electrons are loosely held and can move freely from one atom to the next. This movement of electrons is electric current. In insulating materials like rubber, valence electrons are tightly bound and resist movement.',
          'Charge is measured in coulombs (C). One ampere of current means one coulomb of charge passing a point every second. Opposite charges attract; like charges repel. A voltage difference (potential difference) is what pushes electrons through a conductor. Without a voltage difference, electrons move randomly with no net flow.',
          'Static electricity occurs when charge builds up without a complete circuit. In field service, electrostatic discharge (ESD) can destroy sensitive electronics. Always ground yourself before handling circuit boards.',
        ],
        tables: [
          {
            caption: 'Subatomic particles at a glance',
            headers: ['Particle', 'Charge', 'Location', 'Role in Electricity'],
            rows: [
              ['Proton',   '+ Positive', 'Nucleus',         'Defines element; does not move in circuits'],
              ['Neutron',  'Neutral',    'Nucleus',         'No role in electrical conduction'],
              ['Electron', '− Negative', 'Orbital shells',  'Valence electrons flow → create current'],
            ],
          },
        ],
        keyPoints: [
          'Electrons carry negative charge; protons carry positive charge',
          'Free electrons in conductors create current flow',
          'Voltage (potential difference) is the force that drives current',
          'Static electricity = charge buildup without a circuit',
          'ESD can destroy sensitive electronics — always ground yourself',
        ],
        practical: {
          intro: 'Two real ESD and charge scenarios you will face in the field. Choose the correct action.',
          steps: [
            {
              id: 'esd-1',
              type: 'scenario',
              title: 'Scenario A: Handling a Control Board',
              prompt: 'You need to swap a UPS control board. The new board arrived in an anti-static bag. What should you do BEFORE removing it from the bag and touching it?',
              scenarioOptions: [
                { id: 'gloves',  label: 'Put on rubber gloves — they insulate you from the board' },
                { id: 'ground',  label: 'Touch the metal UPS chassis first (or wear an ESD wrist strap) to equalize your charge with the equipment', sublabel: 'Correct approach' },
                { id: 'fast',    label: 'Work quickly — minimize contact time to reduce ESD risk' },
                { id: 'carpet',  label: 'Stand on carpet — it absorbs static electricity' },
              ],
              correctScenario: 'ground',
              hint: 'ESD occurs when two objects at different charge potentials make contact. How do you eliminate that difference?',
              correctFeedback: 'Correct. Touching the metal chassis (or using an ESD wrist strap connected to ground) equalizes your electrostatic potential with the equipment before you handle the board. Rubber gloves insulate you — they do not ground you.',
              incorrectFeedback: 'Incorrect. Working fast, rubber gloves, or carpet do not prevent ESD. You must equalize your charge by touching a grounded metal surface or wearing an ESD wrist strap before handling sensitive electronics.',
            },
            {
              id: 'esd-2',
              type: 'scenario',
              title: 'Scenario B: Charge Buildup Identification',
              prompt: 'A field tech walks across a carpeted data center floor (low humidity) and feels a small "snap" when touching a metal equipment rack. What physical phenomenon just occurred, and what risk does it pose?',
              scenarioOptions: [
                { id: 'short',   label: 'A short circuit in the rack wiring — the rack should be inspected immediately' },
                { id: 'esd',     label: 'Electrostatic discharge (ESD) — static charge built up on the tech discharged through the rack', sublabel: 'Correct — and electronics nearby could have been damaged' },
                { id: 'ground',  label: 'Normal grounding — this is the expected behavior of a properly grounded rack' },
                { id: 'spark',   label: 'A loose AC connection arcing — needs immediate investigation' },
              ],
              correctScenario: 'esd',
              hint: 'Walking on carpet builds up charge on the body through friction (triboelectric effect). What happens when that charge suddenly discharges?',
              correctFeedback: 'Correct. Walking on carpet in low humidity generates thousands of volts of static charge through triboelectric friction. The "snap" is ESD — that charge discharged through the rack. Any exposed circuit boards nearby could have been damaged even if the tech felt nothing beyond the snap.',
              incorrectFeedback: 'Incorrect. This is classic ESD from triboelectric charging. The snap you feel is electrostatic charge discharging, not a circuit fault. The danger is to any electronics that shared the discharge path.',
            },
          ],
        },
        quiz: [
          { q: 'What is the charge of an electron?', a: ['Positive', 'Negative', 'Neutral', 'Variable'], correct: 1, exp: 'Electrons carry a negative charge. Protons are positive and neutrons are neutral.' },
          { q: 'What part of an atom is most relevant to electrical conduction?', a: ['Nucleus', 'Neutron', 'Valence electrons', 'Proton'], correct: 2, exp: 'Valence electrons in the outermost shell are loosely held in conductors and free to move, creating current.' },
          { q: 'What drives electrons through a conductor?', a: ['Temperature', 'Voltage (potential difference)', 'Atomic weight', 'Neutron count'], correct: 1, exp: 'Voltage is the electrical potential difference that pushes electrons through a conductor.' },
          { q: 'In which material are valence electrons loosely held?', a: ['Insulator', 'Semiconductor', 'Conductor', 'Ceramic'], correct: 2, exp: 'Conductors like copper have loosely held valence electrons that move freely to create current.' },
          { q: 'One ampere of current equals:', a: ['One watt per second', 'One coulomb per second', 'One volt per ohm', 'One joule per volt'], correct: 1, exp: '1 ampere = 1 coulomb of charge passing a point per second.' },
          { q: 'What is ESD?', a: ['Electrical Short Detection', 'Electrostatic Discharge', 'Electron Surge Damping', 'Emergency Shutdown Device'], correct: 1, exp: 'ESD (Electrostatic Discharge) is the sudden release of built-up static charge that can destroy electronic components.' },
          { q: 'Like charges:', a: ['Attract each other', 'Repel each other', 'Have no interaction', 'Cancel out to zero'], correct: 1, exp: 'Like charges (+ and +, or – and –) repel each other. Opposite charges attract.' },
          { q: 'Static electricity results from:', a: ['Excessive current flow', 'Charge buildup without a complete circuit', 'Low voltage levels', 'AC frequency changes'], correct: 1, exp: 'Static electricity is charge that has accumulated on a surface without a path to flow through a circuit.' },
          { q: 'The unit of electrical charge is the:', a: ['Ampere', 'Volt', 'Coulomb', 'Farad'], correct: 2, exp: 'Charge is measured in coulombs (C). Current (amperes) is the rate of charge flow.' },
          { q: 'Before handling a circuit board in the field, you should:', a: ['Wear rubber gloves only', 'Work quickly to minimize exposure', 'Ground yourself to prevent ESD', 'Remove the battery first'], correct: 2, exp: 'Grounding yourself equalizes your charge with the equipment, preventing ESD damage to sensitive components.' },
        ],
      },
      {
        title: 'Voltage, Current, and Resistance',
        body: [
          'Voltage (V) is electrical pressure — the force that pushes electrons through a circuit. It is measured in volts and always exists between two points. You cannot have voltage at a single point; it is always a difference. In UPS systems, you routinely work with 48V DC battery strings, 120/208/240V AC input, and 480V three-phase input on larger systems.',
          'Current (I) is the rate of electron flow, measured in amperes (amps). It flows through components and wires. Current follows the path of least resistance. When working on UPS systems, you must always know how much current flows — too much current causes heat, insulation failure, and fire.',
          'Resistance (R) is opposition to current flow, measured in ohms (Ω). Every material has resistance. Resistance converts electrical energy to heat. A short circuit is near-zero resistance — current spikes to dangerous levels. An open circuit is infinite resistance — current cannot flow at all.',
          'These three quantities are related by Ohm\'s Law: V = I × R. Increase voltage with fixed resistance, current increases. Increase resistance with fixed voltage, current decreases. This relationship governs everything you measure and troubleshoot in a UPS.',
        ],
        tables: [
          {
            caption: 'V, I, R quick reference',
            headers: ['Quantity', 'Symbol', 'Unit', 'Measured With', 'UPS Example'],
            rows: [
              ['Voltage',    'V', 'Volts (V)',  'DMM V AC or V DC',    '48V DC battery string, 120V AC output'],
              ['Current',    'I', 'Amperes (A)','DMM A / Clamp meter', '15A UPS output to load'],
              ['Resistance', 'R', 'Ohms (Ω)',   'DMM Ω (de-energized)','0.3Ω cable resistance, OL = blown fuse'],
            ],
          },
        ],
        keyPoints: [
          'Voltage is electrical pressure, always measured between two points',
          'Current is rate of electron flow (amperes)',
          'Resistance opposes current flow (ohms)',
          'Short circuit = near-zero resistance = dangerously high current',
          'Open circuit = infinite resistance = zero current flow',
        ],
        widget: 'ohms-law-explorer',
        practical: {
          intro: 'Apply Ohm\'s Law to two real UPS fault scenarios. Choose what the reading or symptom tells you.',
          steps: [
            {
              id: 'vcr-1',
              type: 'scenario',
              title: 'Scenario A: Hot Wire',
              prompt: 'During a PM visit you notice that the 10 AWG output cable on a UPS feels noticeably warm — warmer than expected for a wire that should only carry 15A. The circuit has been running for 6 hours. What does this tell you?',
              scenarioOptions: [
                { id: 'normal',    label: 'Normal — wires always run warm under any load' },
                { id: 'overload',  label: 'The wire is carrying more current than its rated capacity (P = I²R heat dissipation is excessive)', sublabel: 'Investigate the load and wire rating' },
                { id: 'voltage',   label: 'Input voltage is too high — causing excess heat' },
                { id: 'resistance',label: 'Wire resistance has decreased — less heat should be generated' },
              ],
              correctScenario: 'overload',
              hint: 'Think about what causes a wire to generate heat. Resistance converts electrical energy to heat: P = I²R.',
              correctFeedback: 'Correct. Heat in a wire is proportional to I²R — if the wire feels unusually hot it is carrying more current than its rated capacity. 10 AWG wire is rated for about 30A (conduit) but even approaching that limit causes noticeable warmth. Check the connected load against the UPS nameplate and wire ampacity.',
              incorrectFeedback: 'Incorrect. Wire heats up because resistance converts electrical energy into thermal energy (P = I²R). A noticeably warm wire means either the current exceeds the wire\'s ampacity, or there is a poor connection with elevated contact resistance.',
            },
            {
              id: 'vcr-2',
              type: 'scenario',
              title: 'Scenario B: Zero Voltage Across a Component',
              prompt: 'You measure voltage across a fuse (probes on each side). The circuit is live but the fuse reads 0V. What does this tell you?',
              scenarioOptions: [
                { id: 'blown',   label: 'Fuse is blown — voltage would appear across a blown fuse (open circuit), not a good one', sublabel: 'Actually this is backward thinking' },
                { id: 'good',    label: 'Fuse is good — a good fuse has near-zero resistance so near-zero voltage drops across it', sublabel: 'Correct — Ohm\'s Law: V = I × R_fuse ≈ 0' },
                { id: 'short',   label: 'Circuit is shorted — zero voltage means no current is flowing' },
                { id: 'meter',   label: 'Meter is broken — there must be some voltage across every component' },
              ],
              correctScenario: 'good',
              hint: 'Use Ohm\'s Law: V = I × R. A good fuse has near-zero resistance. What voltage drops across near-zero resistance?',
              correctFeedback: 'Correct. A good fuse has near-zero resistance (~0.1Ω). By Ohm\'s Law: V = I × R ≈ 15A × 0.1Ω = 1.5V (or much less for a new fuse). You will read near-zero voltage across a healthy fuse. A BLOWN fuse reads the full supply voltage because the open circuit puts all the voltage across the gap.',
              incorrectFeedback: 'Think again using Ohm\'s Law: V = I × R. A good fuse has near-zero resistance (R ≈ 0). Multiply any current by near-zero resistance and you get near-zero voltage drop. A blown fuse is an open circuit — all the supply voltage appears across the open gap.',
            },
          ],
        },
        quiz: [
          { q: 'Voltage is best described as:', a: ['Rate of electron flow', 'Opposition to current', 'Electrical pressure between two points', 'Power consumed per second'], correct: 2, exp: 'Voltage is electrical pressure or potential difference — the force that drives electrons through a circuit.' },
          { q: 'Current is measured in:', a: ['Volts', 'Ohms', 'Watts', 'Amperes'], correct: 3, exp: 'Current (I) is measured in amperes (A). It is the rate of electron flow through a conductor.' },
          { q: 'What happens to current if resistance increases and voltage stays the same?', a: ['Current increases', 'Current decreases', 'Current stays the same', 'Voltage also changes'], correct: 1, exp: 'From Ohm\'s Law, I = V/R. If R increases and V is fixed, I decreases.' },
          { q: 'A short circuit is characterized by:', a: ['Very high resistance', 'Near-zero resistance', 'Normal current flow', 'High voltage'], correct: 1, exp: 'A short circuit has near-zero resistance, which allows extremely high (potentially dangerous) current to flow.' },
          { q: 'An open circuit means:', a: ['Current is very high', 'Resistance is near zero', 'Current cannot flow at all', 'Voltage is zero'], correct: 2, exp: 'An open circuit has infinite resistance — the circuit path is broken and no current can flow.' },
          { q: 'Resistance is measured in:', a: ['Amperes', 'Volts', 'Watts', 'Ohms'], correct: 3, exp: 'Resistance (R) is measured in ohms (Ω), named after Georg Simon Ohm.' },
          { q: 'Which of these is a typical battery string voltage in a UPS system?', a: ['5V DC', '12V DC', '48V DC', '120V DC'], correct: 2, exp: '48V DC battery strings are extremely common in UPS systems. Some larger systems use 240V DC battery strings.' },
          { q: 'What does resistance do to electrical energy?', a: ['Stores it', 'Amplifies it', 'Converts it to heat', 'Converts it to light'], correct: 2, exp: 'Resistance converts electrical energy into heat. This is why overloaded wires and components get hot.' },
          { q: 'Current follows:', a: ['The longest path', 'The path of least resistance', 'The highest voltage path', 'A random path'], correct: 1, exp: 'Electrical current always follows the path of least resistance — which is why short circuits are so dangerous.' },
          { q: 'Voltage can be measured at:', a: ['A single point', 'Between two points', 'At ground only', 'On any conductor'], correct: 1, exp: 'Voltage is always a potential DIFFERENCE between two points. It cannot exist at a single point alone.' },
        ],
      },
      {
        title: 'Conductors, Insulators, and Semiconductors',
        body: [
          'Conductors allow current to flow with very low resistance. Copper is the most common conductor in UPS and electrical systems because of its high conductivity, flexibility, and relatively low cost. Silver conducts better than copper but is too expensive for most applications. Aluminum is used in large power cables where weight and cost matter more than conductivity per cross-section.',
          'Insulators have very high resistance and do not allow significant current flow. Rubber, PVC plastic, glass, and air are common insulators. Insulation on wires protects against accidental contact and prevents short circuits. Never remove insulation from wires unless performing authorized work. Damaged insulation is a fire and shock hazard.',
          'Semiconductors have conductivity between conductors and insulators, and their conductivity can be controlled. Silicon and germanium are common semiconductor materials. Diodes, transistors, and integrated circuits are all semiconductor devices. In a UPS, power semiconductor devices like SCRs (silicon controlled rectifiers) and IGBTs (insulated gate bipolar transistors) control the conversion of AC to DC and back.',
          'Wire sizing is critical. Wire is rated by American Wire Gauge (AWG) — a lower AWG number means a thicker wire with lower resistance and higher current capacity. AWG 4 wire can carry far more current than AWG 18. Undersized wire for a given current load will overheat — a primary cause of electrical fires.',
        ],
        tables: [
          {
            caption: 'Material classification',
            headers: ['Category', 'Resistivity', 'Examples', 'UPS Application'],
            rows: [
              ['Conductor',    'Very low (< 10⁻⁶ Ω·m)', 'Copper, Aluminum, Silver',       'Busbars, wiring, terminals, contacts'],
              ['Insulator',    'Very high (> 10⁶ Ω·m)',  'PVC, Rubber, Glass, Air',        'Wire jackets, standoffs, conduit'],
              ['Semiconductor','Controlled (variable)',   'Silicon, Germanium, GaN',        'IGBTs, SCRs, diodes, gate drivers'],
            ],
          },
          {
            caption: 'Common AWG sizes in UPS field service',
            headers: ['AWG', 'Diameter', 'Max Current (typical)', 'Common Use'],
            rows: [
              ['4',  '5.19 mm', '85–95 A',  'UPS input feeds, main output busbars'],
              ['10', '2.59 mm', '30–40 A',  'Branch circuit output, battery cables'],
              ['14', '1.63 mm', '15–20 A',  'Control wiring, signal leads'],
              ['18', '1.02 mm', '7–10 A',   'Low-current control circuits, sensors'],
            ],
          },
        ],
        keyPoints: [
          'Copper is the primary conductor in UPS systems',
          'Damaged insulation is a fire and shock hazard',
          'Lower AWG number = thicker wire = more current capacity',
          'Semiconductors control current in rectifiers and inverters',
          'IGBTs and SCRs are the key power semiconductors in UPS systems',
        ],
        widget: 'material-sorter',
        practical: {
          intro: 'Two field scenarios requiring you to identify materials and respond to hazards correctly.',
          steps: [
            {
              id: 'mat-1',
              type: 'scenario',
              title: 'Scenario A: Cracked Cable Insulation',
              prompt: 'During a visual inspection you notice a 120V AC output cable with badly cracked and brittle PVC insulation. The inner copper conductors are partially visible in two spots. The UPS is currently running under load. What is the correct immediate action?',
              scenarioOptions: [
                { id: 'tape',    label: 'Wrap the damaged section in electrical tape immediately — this fixes the hazard quickly' },
                { id: 'note',    label: 'Log it in the maintenance report for the next scheduled visit — it is not an emergency if the UPS is running' },
                { id: 'loto',    label: 'Notify the customer, de-energize the circuit using LOTO procedures, and replace the cable before returning to service', sublabel: 'Correct — exposed conductors are an immediate shock and fire hazard' },
                { id: 'rubber',  label: 'Hold the cable with rubber gloves while continuing to work — rubber insulates, so it is safe' },
              ],
              correctScenario: 'loto',
              hint: 'Exposed copper conductors on a live 120V circuit are an immediate hazard. Taping over the damage does not restore the insulation\'s rated capacity.',
              correctFeedback: 'Correct. Exposed conductors are an immediate electrical shock and fire hazard — OSHA 1910.303 requires that conductors be covered with insulation rated for the voltage. Tape does not restore rated insulation. The correct action is to notify the customer, perform LOTO on that circuit, and replace the cable.',
              incorrectFeedback: 'Incorrect. Cracked insulation with exposed conductors is an IMMEDIATE hazard (shock, arc flash, fire). Deferring it or taping it does not eliminate the hazard — insulation tape is not rated as primary insulation for 120V circuits. The circuit must be de-energized and the cable replaced.',
            },
            {
              id: 'mat-2',
              type: 'scenario',
              title: 'Scenario B: Wire Gauge Selection',
              prompt: 'You are replacing a failed output cable on a 120V UPS that delivers up to 30A to the load. The storage van has AWG 10, AWG 14, and AWG 18 wire available. Which should you use?',
              scenarioOptions: [
                { id: 'awg18',  label: 'AWG 18 — thinner wire is easier to route through tight spaces' },
                { id: 'awg14',  label: 'AWG 14 — rated for 15–20A; this should be fine with a 30A load', sublabel: 'Warning: this would be undersized' },
                { id: 'awg10',  label: 'AWG 10 — rated for 30–40A; properly sized for this circuit', sublabel: 'Correct choice' },
                { id: 'any',    label: 'Any wire works as long as the insulation color is correct' },
              ],
              correctScenario: 'awg10',
              hint: 'Lower AWG number = thicker wire = more current capacity. Match or exceed the circuit\'s maximum current.',
              correctFeedback: 'Correct. AWG 10 is rated for 30–40A depending on insulation type and installation method — exactly right for a 30A circuit. AWG 14 is rated for only 15–20A and would overheat, potentially causing a fire. Wire gauge must always match or exceed the circuit\'s maximum current demand.',
              incorrectFeedback: 'Incorrect. Using undersized wire on a 30A circuit causes the wire to overheat (P = I²R heat). AWG 10 is the minimum appropriate choice — rated for 30–40A. AWG 14 is a 15A wire and AWG 18 is a 7–10A wire; both would overheat dangerously on this circuit.',
            },
          ],
        },
        quiz: [
          { q: 'Which material is the most common conductor in UPS wiring?', a: ['Silver', 'Aluminum', 'Copper', 'Gold'], correct: 2, exp: 'Copper is the standard conductor for UPS and electrical system wiring due to its high conductivity and cost-effectiveness.' },
          { q: 'What does a lower AWG number indicate about a wire?', a: ['Thinner wire with less capacity', 'Thicker wire with more capacity', 'Higher resistance', 'Better insulation'], correct: 1, exp: 'Lower AWG number = thicker wire = lower resistance = higher current carrying capacity.' },
          { q: 'Which of the following is an insulator?', a: ['Copper', 'Aluminum', 'PVC plastic', 'Silver'], correct: 2, exp: 'PVC (polyvinyl chloride) plastic is a common electrical insulator used on wire jackets and conduit.' },
          { q: 'What is an IGBT?', a: ['Insulated Gate Bipolar Transistor', 'Integrated Gate Bus Terminal', 'Inverter Gate Boost Technology', 'Internal Ground Bypass Transfer'], correct: 0, exp: 'IGBT stands for Insulated Gate Bipolar Transistor — a key power semiconductor used in modern UPS inverters.' },
          { q: 'Damaged wire insulation is a hazard because:', a: ['It increases resistance unnecessarily', 'It exposes live conductors creating shock and fire risk', 'It changes the AWG rating', 'It blocks current flow'], correct: 1, exp: 'Damaged insulation exposes live conductors, creating risk of electrical shock, short circuits, and electrical fires.' },
          { q: 'Semiconductors are used in UPS systems primarily to:', a: ['Insulate high-voltage sections', 'Control power conversion (AC to DC and back)', 'Provide grounding paths', 'Store energy'], correct: 1, exp: 'Semiconductor devices like IGBTs and SCRs control the rectification and inversion processes in a UPS.' },
          { q: 'What happens when undersized wire carries too much current?', a: ['Voltage increases', 'Wire overheats — fire risk', 'Current decreases automatically', 'Resistance decreases'], correct: 1, exp: 'Undersized wire has insufficient current capacity — it overheats under excess load, which is a primary cause of electrical fires.' },
          { q: 'Silicon is an example of a:', a: ['Conductor', 'Insulator', 'Semiconductor', 'Superconductor'], correct: 2, exp: 'Silicon is the most common semiconductor material, used in diodes, transistors, and integrated circuits.' },
          { q: 'Which conductor material is sometimes used in large power cables where weight matters?', a: ['Copper', 'Aluminum', 'Gold', 'Steel'], correct: 1, exp: 'Aluminum is used in large power cables (like utility distribution) where weight and cost are more important than conductivity per size.' },
          { q: 'An SCR in a UPS rectifier is best described as:', a: ['A storage capacitor', 'A silicon controlled rectifier — a semiconductor switch', 'A static charge regulator', 'A short circuit relay'], correct: 1, exp: 'SCR (Silicon Controlled Rectifier) is a semiconductor device that acts as a controlled switch to convert AC to DC in the rectifier stage.' },
        ],
      },
    ],
    test: [
      { q: 'What part of an atom carries negative charge?', a: ['Proton', 'Neutron', 'Electron', 'Nucleus'], correct: 2, exp: 'Electrons carry a negative charge and their movement creates electrical current.' },
      { q: 'One ampere equals:', a: ['One volt per ohm', 'One coulomb per second', 'One watt per volt', 'One joule per second'], correct: 1, exp: '1 ampere = 1 coulomb of charge passing a point per second — this is the definition of electric current.' },
      { q: 'A short circuit is characterized by:', a: ['Very high resistance and low current', 'Very low resistance and very high current', 'Normal operating current', 'High voltage and low current'], correct: 1, exp: 'A short circuit has near-zero resistance, which causes current to spike to extremely high levels.' },
      { q: 'What does a lower AWG number indicate?', a: ['Thinner wire', 'Higher resistance', 'Less current capacity', 'Thicker wire with more capacity'], correct: 3, exp: 'Lower AWG = thicker wire = lower resistance = higher current carrying capacity.' },
      { q: 'Which material is the most common conductor in UPS systems?', a: ['Silver', 'Copper', 'Aluminum', 'Gold'], correct: 1, exp: 'Copper is standard for UPS wiring because of its high conductivity, flexibility, and cost-effectiveness.' },
      { q: 'Voltage is always measured:', a: ['At a single point', 'Between two points', 'At ground reference only', 'As an absolute value'], correct: 1, exp: 'Voltage is a potential DIFFERENCE — it always exists between two points, never at a single point alone.' },
      { q: 'What is the primary function of insulation on electrical wire?', a: ['Reduce wire resistance', 'Prevent accidental contact and short circuits', 'Increase current capacity', 'Mark wire polarity'], correct: 1, exp: 'Insulation prevents accidental contact with live conductors and prevents short circuits between adjacent wires.' },
      { q: 'Which semiconductor device is commonly used in UPS inverters to control power conversion?', a: ['LED', 'IGBT', 'Capacitor', 'Inductor'], correct: 1, exp: 'IGBTs (Insulated Gate Bipolar Transistors) are the primary switching devices in modern UPS inverters.' },
      { q: 'ESD stands for:', a: ['Electrical System Diagnosis', 'Electrostatic Discharge', 'Emergency Shutdown Device', 'Electronic Surge Detection'], correct: 1, exp: 'ESD = Electrostatic Discharge — sudden release of static charge that can destroy electronic components.' },
      { q: 'If resistance doubles and voltage stays constant, current:', a: ['Doubles', 'Stays the same', 'Halves', 'Quadruples'], correct: 2, exp: 'From Ohm\'s Law: I = V/R. If R doubles and V is fixed, I is cut in half.' },
    ],
  },

  {
    id: 'electric-circuits',
    num: 2,
    title: 'Electric Circuits — Series and Parallel',
    desc: 'How current behaves in series and parallel circuits, Kirchhoff\'s Laws, and how these principles apply to UPS battery strings and load distribution.',
    slides: [
      {
        title: 'Series Circuits',
        body: [
          'In a series circuit, components are connected end-to-end in a single path. There is only one path for current to flow. If any component fails (opens), the entire circuit loses current — like old-style Christmas lights where one bad bulb killed the whole string.',
          'In a series circuit: (1) The same current flows through every component. (2) The total resistance equals the sum of all individual resistances: R_total = R1 + R2 + R3 + ... (3) The total voltage is the sum of all individual voltage drops: V_total = V1 + V2 + V3 + ...',
          'UPS battery strings are a key series circuit application. Multiple 2V cells are connected in series to produce 48V, 120V, or 240V strings. If one cell fails open, the entire string loses voltage. A failed cell that shorts creates a voltage imbalance that stresses adjacent cells. Battery voltage across the string can be measured to verify all cells are contributing.',
          'Voltage dividers are series circuits where you intentionally divide voltage across resistors. Control boards use voltage dividers to create reference voltages and scale high voltages to safe levels for measurement circuits.',
        ],
        tables: [
          {
            caption: 'Series circuit rules',
            headers: ['Property', 'Series Circuit Rule', 'UPS Example'],
            rows: [
              ['Current',    'Same through ALL components', 'Every cell in a 48V string carries the same charge current'],
              ['Voltage',    'Adds up: V_total = V1 + V2 + …', '24 × 2V cells = 48V string'],
              ['Resistance', 'Adds up: R_total = R1 + R2 + …', 'Cable + fuse + contacts all add resistance to the charge path'],
              ['Failure',    'One open = entire circuit fails', 'One failed-open cell kills the entire battery string'],
            ],
          },
        ],
        keyPoints: [
          'Series = one path for current, same current through all components',
          'Series total resistance = sum of all resistances',
          'Series total voltage = sum of all voltage drops',
          'UPS battery strings are series circuits',
          'One open component kills current flow in the entire series circuit',
        ],
        widget: 'series-parallel-sim',
        practical: {
          intro: 'Two battery string scenarios that apply series circuit principles.',
          steps: [
            {
              id: 'series-1',
              type: 'scenario',
              title: 'Scenario A: Dead Battery String',
              prompt: 'A 48V UPS has a 24-cell lead-acid battery string. During a PM, you measure only 44V across the entire string. Individual cell measurements show 23 cells at 2.05–2.10V and one cell at 0.02V. What is the most likely cause and correct action?',
              scenarioOptions: [
                { id: 'charger',  label: 'The charger is faulty — 44V instead of 48V means undercharge. Replace the charger.' },
                { id: 'cell',     label: 'One cell has failed (0.02V = shorted or failed open). The weak cell brings down the entire string voltage. Replace the failed cell or battery block.', sublabel: 'Correct — series circuit behavior' },
                { id: 'load',     label: 'The UPS load is too high — drawing the battery voltage down.' },
                { id: 'ambient',  label: 'Ambient temperature is too high — batteries run at lower voltage in heat.' },
              ],
              correctScenario: 'cell',
              hint: 'In a series circuit, one bad element brings down the entire chain. A cell at 0.02V has essentially failed. 23 × 2.05V = 47.15V; if the bad cell contributes 0V, total = 47.15V ≈ confirmed.',
              correctFeedback: 'Correct. In a series battery string, every cell\'s voltage adds up. One cell at 0.02V has failed (internal short). It drags the entire string voltage down. The fix is replacing that cell or battery block. After replacement, re-equalize the string and recheck all cell voltages.',
              incorrectFeedback: 'Incorrect. Look at the individual cell readings: 23 cells × ~2.07V = ~47.6V, but one cell at 0.02V subtracts from the total, giving ~44V. This is classic series circuit failure — one weak link brings down the whole string.',
            },
            {
              id: 'series-2',
              type: 'scenario',
              title: 'Scenario B: Series Voltage Divider on Control Board',
              prompt: 'A UPS control board uses a voltage divider: two 10kΩ resistors in series across 48V, with the midpoint connected to a comparator input. What voltage should appear at the midpoint?',
              scenarioOptions: [
                { id: 'v48',  label: '48V — the full supply voltage' },
                { id: 'v24',  label: '24V — equal resistors divide the voltage equally in series', sublabel: 'Correct — V_mid = V × R2/(R1+R2) = 48 × 0.5 = 24V' },
                { id: 'v0',   label: '0V — no current flows through resistors in series with the input' },
                { id: 'v12',  label: '12V — the comparator input reduces the voltage by half again' },
              ],
              correctScenario: 'v24',
              hint: 'Two equal resistors in series form a 50/50 voltage divider. V_midpoint = V_supply × (R2 / (R1 + R2)).',
              correctFeedback: 'Correct. Two equal resistors divide the voltage equally: V_mid = 48V × (10kΩ / 20kΩ) = 24V. This is how control boards safely scale down 48V battery signals to the 3.3V or 5V range that microcontrollers can read — using a chain of voltage divider resistors.',
              incorrectFeedback: 'Think about the voltage divider formula: V_out = V_in × R2/(R1+R2). With R1=R2=10kΩ, V_out = 48V × (10/20) = 24V. Equal series resistors split the voltage in half.',
            },
          ],
        },
        quiz: [
          { q: 'In a series circuit, current through each component is:', a: ['Different for each component', 'Zero unless all components work', 'The same through all components', 'Divided equally'], correct: 2, exp: 'In a series circuit there is only one path, so the same current must flow through every component.' },
          { q: 'Total resistance in a series circuit with R1=10Ω, R2=20Ω, R3=30Ω is:', a: ['10Ω', '20Ω', '60Ω', '6Ω'], correct: 2, exp: 'Series total resistance = R1+R2+R3 = 10+20+30 = 60Ω.' },
          { q: 'If one component in a series circuit fails open, what happens?', a: ['Only that component stops working', 'Current increases', 'The entire circuit loses current flow', 'Other components compensate'], correct: 2, exp: 'An open in a series circuit breaks the only current path — the entire circuit stops.' },
          { q: 'UPS battery strings are connected in:', a: ['Parallel only', 'Series to achieve desired voltage', 'A mix with no pattern', 'Delta configuration'], correct: 1, exp: 'Battery cells are connected in series to add their voltages together and achieve the required string voltage (48V, 120V, etc.).' },
          { q: 'In a series circuit, the sum of all voltage drops equals:', a: ['Zero', 'The largest single voltage drop', 'The supply voltage', 'Half the supply voltage'], correct: 2, exp: 'By Kirchhoff\'s Voltage Law, the sum of all voltage drops in a series circuit equals the total supply voltage.' },
          { q: 'Three 2V battery cells connected in series produce:', a: ['2V', '6V', '3V', '0.67V'], correct: 1, exp: 'Series voltages add: 2+2+2 = 6V.' },
          { q: 'A voltage divider is a practical application of:', a: ['A parallel circuit', 'A series circuit', 'A short circuit', 'A resonant circuit'], correct: 1, exp: 'A voltage divider uses series resistors to create a fraction of the supply voltage at the midpoint.' },
          { q: 'If you measure voltage across one battery cell in a 48V string of 24 cells, you expect approximately:', a: ['48V', '24V', '2V', '0.5V'], correct: 2, exp: '48V ÷ 24 cells = 2V per cell in a series string of 2V lead-acid cells.' },
          { q: 'What distinguishes a series circuit from a parallel circuit?', a: ['Series has multiple current paths', 'Series has one current path', 'Series has lower resistance', 'Series has higher current'], correct: 1, exp: 'A series circuit has exactly one path for current. A parallel circuit has multiple paths.' },
          { q: 'Which happens when a battery cell in a UPS string shorts (goes to near-zero resistance)?', a: ['That string produces more voltage', 'The string voltage drops and adjacent cells are stressed', 'Current stops flowing', 'The UPS increases output voltage'], correct: 1, exp: 'A shorted cell removes its voltage contribution and its low resistance causes high current through adjacent cells, accelerating their degradation.' },
        ],
      },
      {
        title: 'Parallel Circuits',
        body: [
          'In a parallel circuit, components are connected across the same two nodes — they share the same voltage. There are multiple paths for current. If one branch fails open, current continues through the other branches. This is why circuit breakers in your house can fail individually without cutting power to everything else.',
          'In a parallel circuit: (1) Voltage across every branch is identical. (2) Total current is the sum of branch currents: I_total = I1 + I2 + I3. (3) Total resistance is always less than the smallest individual resistor. For two resistors: 1/R_total = 1/R1 + 1/R2.',
          'UPS battery strings in data centers are often connected in parallel after being assembled as series strings. Two 48V strings in parallel still produce 48V but with twice the current capacity and doubled runtime. This is the most common configuration for large UPS systems — multiple strings in parallel provide both capacity and redundancy.',
          'Parallel UPS configurations also protect critical loads by allowing one UPS to fail while others continue to serve the load. Understanding parallel circuits is essential for reading single-line diagrams and understanding how bypass switches reroute power.',
        ],
        tables: [
          {
            caption: 'Parallel vs. series — quick comparison',
            headers: ['Property', 'Series', 'Parallel', 'UPS Relevance'],
            rows: [
              ['Voltage',    'Divides among components',   'Same across all branches',    'Strings in series: voltage adds. Strings in parallel: voltage stays the same'],
              ['Current',    'Same through all',           'Divides among branches',      'High load → current splits across parallel strings'],
              ['Resistance', 'Adds up (R_total = ΣR)',    'Decreases (1/R = Σ 1/Rn)',   'Parallel strings lower internal resistance = less voltage sag'],
              ['Fault',      'One open = all stop',        'One open = others continue',  'Parallel UPS: one unit fails, others carry the load (N+1)'],
            ],
          },
        ],
        keyPoints: [
          'Parallel = same voltage across all branches, current divides',
          'Total parallel resistance is always less than the smallest branch resistance',
          'Multiple battery strings in parallel = more capacity, same voltage',
          'Parallel UPS systems provide N+1 redundancy',
          'A failed branch in parallel does not stop other branches',
        ],
        practical: {
          intro: 'Two parallel circuit scenarios from real UPS data center environments.',
          steps: [
            {
              id: 'para-1',
              type: 'scenario',
              title: 'Scenario A: Adding a Battery String',
              prompt: 'A 48V UPS currently has two parallel battery strings, each rated 100Ah. A customer wants to add a third identical 100Ah string in parallel. After adding the third string, what changes and what stays the same?',
              scenarioOptions: [
                { id: 'voltage',  label: 'Battery voltage increases to 72V (48V × 3 strings)' },
                { id: 'cap',      label: 'Voltage stays 48V; total Ah capacity increases to 300Ah (more runtime)', sublabel: 'Correct — parallel adds capacity, not voltage' },
                { id: 'nothing',  label: 'Nothing changes — additional strings are redundant' },
                { id: 'current',  label: 'Voltage stays 48V but the UPS reduces its output power because of the extra string' },
              ],
              correctScenario: 'cap',
              hint: 'Parallel branches share the same voltage. Current (and therefore Ah capacity) is additive. What does that mean for runtime?',
              correctFeedback: 'Correct. Parallel strings maintain the same voltage (48V) while tripling the Ah capacity (300Ah). More Ah = more runtime under the same load. The UPS can now sustain the load approximately 3× longer than with one string. This is why data centers add battery cabinets to extend runtime without changing the UPS output voltage.',
              incorrectFeedback: 'Incorrect. Parallel circuits share the same voltage — adding more strings does NOT increase voltage. Instead, it increases current capacity (Ah). 3 strings × 100Ah = 300Ah total. Same 48V but much longer runtime.',
            },
            {
              id: 'para-2',
              type: 'scenario',
              title: 'Scenario B: N+1 UPS Failure',
              prompt: 'A data center has three 100kW UPS units in N+1 parallel configuration, serving a 200kW load. One UPS fails completely and drops offline. What happens to the load?',
              scenarioOptions: [
                { id: 'lose',     label: 'Load is lost — three UPS units are needed to carry 200kW' },
                { id: 'half',     label: 'Load drops to 100kW — only one UPS remains working' },
                { id: 'continue', label: 'The two remaining UPS units each pick up 100kW (their full capacity) and the 200kW load continues uninterrupted', sublabel: 'Correct — N+1 means N=2 are needed, 1 is spare' },
                { id: 'bypass',   label: 'The system switches to utility bypass and operates without protection' },
              ],
              correctScenario: 'continue',
              hint: 'N+1 means: N units needed to carry full load + 1 spare. With N=2 needed, having 3 means any one can fail without a load impact.',
              correctFeedback: 'Correct. N+1 configuration means there is always one unit beyond what is needed. With a 200kW load and 3 × 100kW UPS units (N=2 needed, N+1=3 installed), the failure of any single unit leaves exactly the capacity needed to carry the full load. Each remaining unit goes from ~67kW to 100kW — both at full capacity. The load continues uninterrupted.',
              incorrectFeedback: 'Incorrect. N+1 means "N units needed to serve the load plus one extra." With 3 UPS units serving 200kW (N=2 needed), the loss of one unit leaves 2 × 100kW = 200kW — exactly enough capacity. This is the point of N+1 redundancy: any single unit can fail without load interruption.',
            },
          ],
        },
        quiz: [
          { q: 'In a parallel circuit, the voltage across each branch is:', a: ['Different for each branch', 'Divided equally among branches', 'The same for all branches', 'Zero in all branches'], correct: 2, exp: 'All branches in a parallel circuit share the same voltage — they are connected to the same two nodes.' },
          { q: 'If branch 1 draws 3A and branch 2 draws 5A in a parallel circuit, total current is:', a: ['2A', '4A', '8A', '15A'], correct: 2, exp: 'Parallel circuit total current = sum of branch currents: 3+5 = 8A.' },
          { q: 'Two 10Ω resistors in parallel have a total resistance of:', a: ['20Ω', '10Ω', '5Ω', '2.5Ω'], correct: 2, exp: '1/R_total = 1/10 + 1/10 = 2/10, so R_total = 5Ω. Parallel resistance is always less than the smallest branch.' },
          { q: 'If one branch in a parallel circuit fails open:', a: ['All branches stop working', 'Only that branch loses current', 'All voltage drops to zero', 'Total current doubles'], correct: 1, exp: 'A failed open branch simply stops carrying current. Other branches continue to work normally.' },
          { q: 'Two 48V battery strings connected in parallel produce:', a: ['96V', '24V', '48V', 'Double the runtime at same voltage'], correct: 3, exp: 'Parallel strings maintain the same voltage (48V) but double the current capacity and runtime.' },
          { q: 'Total resistance in a parallel circuit is always:', a: ['Equal to the largest resistor', 'Greater than all individual resistors', 'Less than the smallest resistor', 'The average of all resistors'], correct: 2, exp: 'Adding parallel paths always reduces total resistance below the smallest individual branch resistance.' },
          { q: 'Why are battery strings connected in parallel in large UPS systems?', a: ['To increase voltage', 'To reduce cost', 'To increase capacity and provide redundancy', 'To reduce heat generation'], correct: 2, exp: 'Parallel strings increase Ah capacity (longer runtime) and provide string-level redundancy if one string fails.' },
          { q: 'Which configuration provides N+1 redundancy?', a: ['One large UPS', 'Series UPS units', 'Multiple UPS units in parallel (N+1)', 'A single UPS with a bypass'], correct: 2, exp: 'N+1 means N units needed to carry the load plus 1 extra — if any one unit fails, the others handle the load.' },
          { q: 'In a parallel circuit, adding more branches causes total resistance to:', a: ['Increase', 'Stay the same', 'Decrease', 'Become infinite'], correct: 2, exp: 'Each added parallel branch creates another current path, reducing total resistance.' },
          { q: 'A 120V house outlet circuit has 15A protection. With two loads of 8A and 6A in parallel, what is the total current draw?', a: ['7A', '14A', '48A', '14A — which trips the breaker'], correct: 1, exp: '8+6=14A. The circuit can handle 15A so the breaker does not trip. Answer is 14A total.' },
        ],
      },
      {
        title: 'Kirchhoff\'s Laws',
        body: [
          'Kirchhoff\'s Current Law (KCL) states that the sum of all currents entering a node equals the sum of all currents leaving it. Current cannot appear or disappear at a junction — it is conserved. If 10A enters a node and splits, the branches must collectively carry exactly 10A.',
          'Kirchhoff\'s Voltage Law (KVL) states that the sum of all voltages around any closed loop equals zero. Going around a loop, voltage rises (sources) and drops (resistors, loads) must balance. This is how you analyze complex circuits and verify your measurements are sensible.',
          'In practice, KCL helps you find unknown currents in complex parallel circuits. KVL helps you trace voltage drops through a circuit to locate excessive resistance, poor connections, or failed components. If measured drops don\'t add up to the source voltage, you have either a measurement error or an unexpected voltage source (like a bad battery).',
          'When troubleshooting a UPS, you apply KVL every time you trace through the input, rectifier, DC bus, inverter, and output stages. The voltages must balance at each stage. If the output voltage is wrong, trace back through the chain using KVL thinking to isolate which stage is at fault.',
        ],
        tables: [
          {
            caption: 'KCL vs. KVL — What each law tells you',
            headers: ['Law', 'Statement', 'Applies to', 'UPS Use Case'],
            rows: [
              ['KCL', 'Current in = current out at every node', 'Junctions / parallel branches', 'Verify current splits at battery bus — if 20A in and only 18A measured out, there is a leakage path'],
              ['KVL', 'Voltage drops around any loop sum to zero', 'Closed loops / series paths', 'Trace 480V input → rectifier → DC bus → inverter → output; drops must balance'],
            ],
          },
          {
            caption: 'UPS stage voltages — KVL trace example (single-phase 120V UPS)',
            headers: ['Stage', 'Expected Voltage', 'If Wrong — Suspect'],
            rows: [
              ['AC Input',      '120V AC',  'Utility outage, blown main fuse'],
              ['After Rectifier', '170V DC', 'Blown rectifier diode, failed SCR'],
              ['DC Bus',         '48V DC',   'Battery disconnected, charger fault'],
              ['Inverter Output', '120V AC', 'Failed IGBT, inverter control fault'],
              ['Load Output',    '120V AC',  'Bypass switch fault, output short'],
            ],
          },
        ],
        keyPoints: [
          'KCL: Current into a node = current out of a node (current is conserved)',
          'KVL: Sum of voltages around any closed loop = zero',
          'KVL helps identify the stage where a fault occurs',
          'KCL helps verify current measurements at branch points',
          'Apply these laws when tracing faults through UPS stages',
        ],
        practical: {
          intro: 'Apply KVL and KCL to diagnose two real UPS faults.',
          steps: [
            {
              id: 'kvl-1',
              type: 'scenario',
              title: 'Scenario A: KVL Fault Trace — Low Output Voltage',
              prompt: 'A 48V UPS is outputting only 90V AC instead of 120V AC. You measure: AC input = 120V ✓, DC bus = 44V (low, spec is 48V), inverter output = 90V. Using KVL thinking, which stage is most likely at fault?',
              scenarioOptions: [
                { id: 'input',   label: 'The AC input rectifier is losing 4V — replace the rectifier diodes' },
                { id: 'dcbus',   label: 'The DC bus is low at 44V — charger or battery issue is causing reduced DC, leading to reduced inverter output', sublabel: 'Correct — follow the voltage trace' },
                { id: 'bypass',  label: 'The bypass switch is faulty — replace it' },
                { id: 'load',    label: 'The load is drawing too much current — reduce the load' },
              ],
              correctScenario: 'dcbus',
              hint: 'In KVL tracing, the first stage that deviates from spec is where you focus. AC input is fine. DC bus is low. The inverter cannot produce proper output from reduced DC input.',
              correctFeedback: 'Correct. KVL trace: AC input is normal (120V ✓), but DC bus is low (44V vs. 48V spec). The inverter is operating on reduced DC, so its output is proportionally low. The fault is upstream — in the charger circuit or battery (high internal resistance pulling down the bus). You would next check battery float voltage and charger current output.',
              incorrectFeedback: 'Incorrect. KVL tracing means you follow the signal path and stop at the first point where voltage deviates from spec. AC input is normal, DC bus is low. That is where the fault is. The inverter is simply reproducing what it is given — a low DC bus produces low AC output.',
            },
            {
              id: 'kcl-1',
              type: 'scenario',
              title: 'Scenario B: KCL Current Balance — Battery Bus Leak',
              prompt: 'A clamp meter at the charger output reads 20A flowing into the 48V battery bus. You clamp each battery string and read 8A on string 1, 9A on string 2, and 2A on string 3. Does the current balance, and what does KCL tell you?',
              scenarioOptions: [
                { id: 'ok',    label: '8+9+2 = 19A out vs 20A in — close enough, measurement error only' },
                { id: 'leak',  label: '8+9+2 = 19A — 1A is unaccounted for; KCL says there is a leakage path, possibly to chassis ground or a shorted component', sublabel: 'Correct — KCL reveals a hidden current path' },
                { id: 'string3', label: 'String 3 is carrying too little current; replace string 3 batteries' },
                { id: 'meter', label: 'The charger output meter is wrong; recalibrate it' },
              ],
              correctScenario: 'leak',
              hint: 'KCL says total current in must equal total current out. If you can account for only 19A of the 20A the charger is delivering, the missing 1A has to be going somewhere — where?',
              correctFeedback: 'Correct. KCL is unambiguous: 20A in, 8+9+2 = 19A to the strings. The missing 1A is going somewhere that is not a battery string — a leakage path. This could be a wiring fault, insulation failure, or component shorted to chassis. This finding would trigger a megger insulation test on the DC bus and wiring. String 3 carrying low current is a separate concern (possibly higher internal resistance) but is not the KCL violation.',
              incorrectFeedback: 'Incorrect. KCL is precise — current cannot disappear. If 20A enters the node and only 19A is accounted for in the three strings, 1A is flowing somewhere else. This is not measurement rounding error for a current this size. A consistent 1A leakage to ground in a 48V system is a real fault that needs investigation.',
            },
          ],
        },
        quiz: [
          { q: 'Kirchhoff\'s Current Law states that at any node:', a: ['Voltage sums to zero', 'Current in equals current out', 'Resistance is constant', 'Power is divided equally'], correct: 1, exp: 'KCL: the sum of currents entering a node equals the sum leaving it. Current is conserved.' },
          { q: 'Kirchhoff\'s Voltage Law states that around any closed loop:', a: ['Current sums to zero', 'Power is constant', 'Sum of all voltages equals zero', 'Resistance sums to supply voltage'], correct: 2, exp: 'KVL: the algebraic sum of all voltage rises and drops around any closed loop equals zero.' },
          { q: 'If 12A enters a node and two branches leave, branch 1 carries 7A. Branch 2 carries:', a: ['12A', '7A', '5A', '19A'], correct: 2, exp: 'By KCL: 12A in = 7A + branch2. Branch2 = 12-7 = 5A.' },
          { q: 'A 24V source in a series loop has three resistors with drops of 8V, 10V, and X. What is X?', a: ['24V', '18V', '6V', '2V'], correct: 2, exp: 'By KVL: 8+10+X = 24, so X = 6V.' },
          { q: 'When tracing voltage through a UPS, KVL helps you:', a: ['Calculate battery capacity', 'Identify which stage has a fault by checking voltages', 'Measure current at each stage', 'Determine watt capacity'], correct: 1, exp: 'KVL thinking helps you trace voltage from input through each stage to find where voltage is wrong.' },
          { q: 'KCL is most useful when:', a: ['Measuring voltage drops', 'Finding unknown branch currents at a junction', 'Calculating total resistance', 'Checking insulation resistance'], correct: 1, exp: 'KCL is applied at current junctions (nodes) to find unknown currents when you know the others.' },
          { q: 'If measured voltage drops in a circuit do not sum to source voltage, this indicates:', a: ['The circuit is working normally', 'A measurement error or unexpected voltage source', 'Kirchhoff\'s law is wrong', 'The components are in parallel'], correct: 1, exp: 'If KVL doesn\'t balance, either a measurement is wrong or there is an unexpected voltage source (bad battery, etc.).' },
          { q: 'In a UPS, the stages in the voltage path are:', a: ['Battery, switch, output', 'Input, rectifier, DC bus, inverter, output', 'Fuse, transformer, output', 'Grid, bypass, load'], correct: 1, exp: 'A double-conversion UPS processes power through: AC input → rectifier → DC bus → inverter → AC output.' },
          { q: 'Kirchhoff\'s laws apply to:', a: ['DC circuits only', 'AC circuits only', 'Both AC and DC circuits', 'Only balanced three-phase circuits'], correct: 2, exp: 'Kirchhoff\'s laws apply to all circuits regardless of AC or DC, as long as you account for complex impedances in AC.' },
          { q: 'If a UPS output voltage is too low, KVL thinking tells you to:', a: ['Replace the battery immediately', 'Trace back through each stage to find where voltage drops below spec', 'Increase the load', 'Check the bypass switch'], correct: 1, exp: 'Trace from output backward through each stage. The stage where voltage first deviates from spec identifies the fault area.' },
        ],
      },
    ],
    test: [
      { q: 'In a series circuit, the same _____ flows through every component.', a: ['Voltage', 'Current', 'Resistance', 'Power'], correct: 1, exp: 'Series circuits have one path — the same current must flow through every component.' },
      { q: 'Three 16Ω resistors in series have a total resistance of:', a: ['5.3Ω', '16Ω', '32Ω', '48Ω'], correct: 3, exp: 'Series: 16+16+16 = 48Ω.' },
      { q: 'In a parallel circuit, _____ is the same across all branches.', a: ['Current', 'Resistance', 'Voltage', 'Power'], correct: 2, exp: 'All parallel branches share the same two nodes and therefore the same voltage.' },
      { q: 'Two 8Ω resistors in parallel have a total resistance of:', a: ['16Ω', '8Ω', '4Ω', '2Ω'], correct: 2, exp: '1/R_total = 1/8 + 1/8 = 2/8; R_total = 4Ω.' },
      { q: 'KCL says current into a node equals:', a: ['Voltage across the node', 'Current out of the node', 'Zero always', 'Total circuit resistance'], correct: 1, exp: 'Kirchhoff\'s Current Law: sum of currents in = sum of currents out at any node.' },
      { q: 'KVL says the sum of voltages around a closed loop equals:', a: ['The source voltage', 'Zero', 'Total resistance', 'Total current'], correct: 1, exp: 'Kirchhoff\'s Voltage Law: algebraic sum of all voltages (rises and drops) around any closed loop = 0.' },
      { q: 'Battery strings in a UPS are connected in series to:', a: ['Increase current capacity', 'Achieve the required voltage', 'Reduce resistance', 'Improve efficiency'], correct: 1, exp: 'Series-connecting cells adds their voltages together to achieve the required string voltage.' },
      { q: 'If one cell in a series battery string fails open:', a: ['Only that cell loses voltage', 'The entire string loses current flow', 'Voltage increases across other cells', 'The UPS switches to bypass'], correct: 1, exp: 'An open in a series string breaks the only current path — the string produces no current.' },
      { q: 'Adding more parallel battery strings to a UPS:', a: ['Increases string voltage', 'Decreases string voltage', 'Increases capacity and runtime', 'Reduces battery count'], correct: 2, exp: 'Parallel strings maintain the same voltage but multiply current capacity and runtime.' },
      { q: 'When troubleshooting a UPS with low output voltage, the best approach using circuit analysis is to:', a: ['Replace all batteries', 'Use KVL to trace voltage through each stage to isolate the fault', 'Check all circuit breakers', 'Reset the UPS'], correct: 1, exp: 'KVL-based stage-by-stage voltage tracing identifies exactly which stage is not performing correctly.' },
    ],
  },

  {
    id: 'electronic-components',
    num: 3,
    title: 'Electronic Components',
    desc: 'Resistors, capacitors, inductors, diodes, and transformers — what they do, how to identify them, and their roles in UPS systems.',
    slides: [
      {
        title: 'Resistors and Capacitors',
        body: [
          'A resistor is a passive component that opposes current flow. Resistors are used to limit current, divide voltage, and set bias levels in circuits. They are rated by resistance (ohms) and power dissipation (watts). In UPS control circuits, precision resistors create reference voltages. Larger power resistors (chassis mount) are used as bleeder resistors to drain capacitors safely after shutdown.',
          'A capacitor stores electrical energy in an electric field between two conductive plates separated by an insulator (dielectric). Capacitance is measured in farads (F) — most practical capacitors are microfarads (µF) or picofarads (pF). Capacitors block DC while passing AC. They are used for filtering, energy storage, and power factor correction.',
          'In UPS systems, large electrolytic capacitors on the DC bus smooth rectified voltage by storing and releasing energy to fill in the gaps between AC peaks. Capacitors degrade over time — electrolyte dries out, ESR (equivalent series resistance) increases, and they can fail catastrophically (bulge or vent). Capacitor failure is one of the most common causes of UPS failure. Always discharge capacitors before working on power electronics.',
          'Capacitors are also used for power factor correction (PFC) banks at the input of large UPS systems. A poorly maintained PFC capacitor bank reduces efficiency and stresses the supply. When a capacitor fails in a UPS, it must be replaced with one of identical rating (capacitance, voltage, temperature, and physical form factor).',
        ],
        tables: [
          {
            caption: 'Passive component quick-reference',
            headers: ['Component', 'Unit', 'Stores / Opposes', 'Key UPS Role', 'Failure Mode'],
            rows: [
              ['Resistor',   'Ohms (Ω)',     'Opposes current',         'Voltage references, current limiting, bleeder',     'Open (no current) or change in value'],
              ['Capacitor',  'Farads (F)',   'Stores charge in E-field', 'DC bus smoothing, PFC banks, snubber circuits',    'Electrolyte dry-out → high ESR, bulge, vent'],
            ],
          },
        ],
        keyPoints: [
          'Resistors limit current and divide voltage',
          'Capacitors store energy in an electric field, block DC, pass AC',
          'DC bus capacitors smooth rectified voltage in UPS',
          'Capacitors degrade over time — increasing ESR is a warning sign',
          'Always discharge capacitors before working on power electronics',
        ],
        practical: {
          intro: 'Two scenarios applying resistor and capacitor knowledge in UPS service.',
          steps: [
            {
              id: 'cap-1',
              type: 'scenario',
              title: 'Scenario A: Capacitor Discharge Before Service',
              prompt: 'You have just shut down a 48V UPS with a large DC bus capacitor bank. The UPS display is off and the input breaker is open. What is the correct action before touching the DC bus terminals inside the cabinet?',
              scenarioOptions: [
                { id: 'touch',   label: 'The display is off so it\'s safe — proceed immediately' },
                { id: 'wait',    label: 'Wait 5 minutes then touch the terminals briefly to check for tingle' },
                { id: 'discharge', label: 'Use a UPS discharge procedure or a bleeder resistor to verify the capacitors are discharged, then confirm with a meter before touching', sublabel: 'Correct — verify discharge before contact' },
                { id: 'gloves',  label: 'Put on rubber gloves and touch the terminals — gloves are enough protection' },
              ],
              correctScenario: 'discharge',
              hint: 'Displays use low power and go dark immediately. Large capacitors can hold full DC bus voltage for minutes after shutdown.',
              correctFeedback: 'Correct. DC bus capacitors in a UPS can hold dangerous voltage for minutes — sometimes tens of minutes — after the unit is shut down. The display going dark means almost nothing; it runs off a separate low-power supply. Always follow the manufacturer\'s discharge procedure or apply a bleeder resistor and verify with a meter that the voltage has fallen below safe levels before making contact.',
              incorrectFeedback: 'Incorrect. The display going dark is not a reliable indicator that the capacitors are discharged. Large electrolytic capacitors can hold full DC bus voltage for minutes after shutdown. Without verification, you are at serious risk of a fatal shock from DC voltage. Always use a discharge procedure and confirm with a meter.',
            },
            {
              id: 'cap-2',
              type: 'scenario',
              title: 'Scenario B: Capacitor Replacement Specification',
              prompt: 'A DC bus capacitor has failed visually (bulged top). The label reads: 470µF, 400V, 85°C, 35×50mm. Which replacement is acceptable?',
              scenarioOptions: [
                { id: 'low-v',  label: '470µF, 200V, 85°C — lower voltage rating is fine since the bus is only 170V' },
                { id: 'match',  label: '470µF, 400V, 105°C — same capacitance and voltage, higher temperature rated', sublabel: 'Correct — this is a safe upgrade' },
                { id: 'high-c', label: '1000µF, 400V, 85°C — more capacitance is always better' },
                { id: 'low-t',  label: '470µF, 400V, 65°C — temperature rating doesn\'t matter if it fits' },
              ],
              correctScenario: 'match',
              hint: 'Never use a lower voltage-rated capacitor. Temperature rating is a minimum — higher is acceptable. Capacitance must be the same.',
              correctFeedback: 'Correct. The replacement must have matching or higher capacitance, matching or higher voltage rating, and matching or higher temperature rating. A 105°C cap is actually an upgrade over 85°C — it will last longer in a warm UPS environment. Never use a lower voltage-rated capacitor (a 400V DC bus peak can be 565V with ripple). Higher capacitance in a bus filter is generally safe but may not fit and is unnecessary.',
              incorrectFeedback: 'Incorrect. Capacitor replacement requires matching the voltage rating at minimum (never go lower), matching capacitance, and the temperature rating must be equal or higher. A 200V capacitor on a 400V bus will fail immediately and catastrophically. Temperature rating matters — 65°C in a 85°C environment will fail prematurely.',
            },
          ],
        },
        quiz: [
          { q: 'Capacitance is measured in:', a: ['Ohms', 'Farads', 'Henrys', 'Watts'], correct: 1, exp: 'Capacitance is measured in farads (F). Practical values are usually microfarads (µF) or picofarads (pF).' },
          { q: 'Capacitors in UPS power electronics primarily:', a: ['Convert AC to DC', 'Amplify voltage', 'Smooth DC bus voltage by storing and releasing energy', 'Protect against overload'], correct: 2, exp: 'Large electrolytic capacitors on the DC bus smooth ripple in the rectified voltage.' },
          { q: 'What does ESR stand for in the context of capacitors?', a: ['Electric Surge Resistance', 'Equivalent Series Resistance', 'External Signal Regulation', 'Electron Storage Rating'], correct: 1, exp: 'ESR (Equivalent Series Resistance) is internal resistance in a capacitor. High ESR indicates a degraded capacitor.' },
          { q: 'Why must capacitors be discharged before servicing a UPS?', a: ['To reset the circuit', 'They store dangerous charge that persists after power is removed', 'To check capacitance', 'To test the rectifier'], correct: 1, exp: 'Capacitors store charge and can hold dangerous voltage long after the UPS is powered off. Discharge before touching.' },
          { q: 'Resistors are used in UPS control circuits to:', a: ['Store energy', 'Create reference voltages and limit current', 'Amplify signals', 'Convert AC to DC'], correct: 1, exp: 'Precision resistors in control circuits create voltage references and current-limiting paths for sensors and logic circuits.' },
          { q: 'A capacitor blocks:', a: ['AC signals', 'DC and passes AC', 'High-frequency signals', 'Current entirely'], correct: 1, exp: 'Capacitors block DC (steady-state) while allowing AC (changing signals) to pass through.' },
          { q: 'A bulging or vented electrolytic capacitor indicates:', a: ['Normal operation at high load', 'Capacitor failure — must be replaced', 'Capacitor is fully charged', 'High voltage applied'], correct: 1, exp: 'Physical bulging or venting means the capacitor has internally failed and must be replaced immediately.' },
          { q: 'Capacitors for power factor correction (PFC) are located:', a: ['In the battery string', 'On the DC bus', 'At the AC input of the UPS', 'Inside the battery cabinet'], correct: 2, exp: 'PFC capacitor banks correct the power factor of the load the UPS presents to the utility grid at the input.' },
          { q: 'When replacing a failed capacitor, you must match:', a: ['Color only', 'Capacitance, voltage rating, and temperature rating', 'Capacitance only', 'Physical size only'], correct: 1, exp: 'Always replace capacitors with exact equivalents — wrong ratings cause premature failure or dangerous operation.' },
          { q: 'Power rating of a resistor tells you:', a: ['Maximum voltage it can handle', 'How much power it can dissipate as heat without damage', 'Its resistance value', 'Its frequency response'], correct: 1, exp: 'Resistor power rating (watts) specifies the maximum heat it can safely dissipate. Exceeding it causes failure or fire.' },
        ],
      },
      {
        title: 'Inductors and Diodes',
        body: [
          'An inductor stores energy in a magnetic field. It is simply a coil of wire — as current changes, the magnetic field changes, which induces a voltage opposing the change (Lenz\'s Law). Inductance is measured in henrys (H), with millihenrys (mH) and microhenrys (µH) being more common. Inductors oppose rapid changes in current, making them ideal for filtering and energy storage in switching power supplies.',
          'In UPS systems, inductors appear as output filter chokes (to smooth inverter output waveform), input line reactors (to reduce harmonic distortion from the rectifier), and in battery charger circuits. When an inductor\'s current is suddenly interrupted (switch opens), the collapsing magnetic field generates a high-voltage spike — this is called inductive kickback and can destroy semiconductor switches. Protection diodes (freewheeling diodes) are placed across inductors to absorb these spikes.',
          'A diode is a semiconductor device that allows current to flow in one direction only (forward-biased) and blocks it in the other direction (reverse-biased). The forward voltage drop is approximately 0.7V for silicon diodes. Diodes are used in rectifiers to convert AC to DC, as protection diodes against reverse polarity, and as freewheeling diodes across inductors.',
          'Zener diodes are designed to operate in reverse breakdown at a specific voltage, making them useful as voltage references and protection devices. In UPS control circuits, zener diodes set precision voltage levels for comparators and protection circuits. A failed diode typically either opens (no current flow) or shorts (current flows both ways) — both conditions disrupt circuit operation.',
        ],
        tables: [
          {
            caption: 'Inductors and diodes — key properties and failures',
            headers: ['Component', 'Unit', 'What it does', 'UPS Example', 'Failure Symptom'],
            rows: [
              ['Inductor',        'Henrys (H)',    'Stores energy in magnetic field; opposes current change',     'Output filter choke, input line reactor',    'Open = no current path; saturated core = no filtering'],
              ['Freewheeling diode', 'V forward', 'Provides current path when switch opens (prevents kickback)', 'Across IGBT in inverter stage',             'Shorted = transistor destruction; open = voltage spike'],
              ['Silicon diode',   '~0.7V fwd drop', 'One-way current gate',                                     'Rectifier bridge, reverse polarity protection', 'Shorted = conducts both ways; open = no rectification'],
              ['Zener diode',     'Vz (breakdown)', 'Conducts in reverse at precise Vz',                        'Voltage reference in control board',        'Shorted = no regulation; open = control voltage collapses'],
            ],
          },
        ],
        keyPoints: [
          'Inductors store energy in magnetic fields, oppose rapid current changes',
          'Inductive kickback = voltage spike when inductor current is interrupted',
          'Freewheeling diodes protect semiconductor switches from inductive kickback',
          'Diodes allow current in one direction only',
          'Silicon diode forward voltage drop ≈ 0.7V',
        ],
        practical: {
          intro: 'Two scenarios testing inductor and diode knowledge in UPS fault diagnosis.',
          steps: [
            {
              id: 'ind-1',
              type: 'scenario',
              title: 'Scenario A: Inductive Kickback Damage',
              prompt: 'A UPS inverter IGBT transistor has failed shorted. There is no visible burn damage on the IGBT itself. The freewheeling diode across the output inductor measures shorted in both directions with an ohmmeter. What most likely happened?',
              scenarioOptions: [
                { id: 'igbt',   label: 'The IGBT failed first and caused the diode to short' },
                { id: 'diode',  label: 'The freewheeling diode failed open first, allowing inductive kickback voltage to destroy the IGBT', sublabel: 'Correct — diode failure leads to IGBT destruction' },
                { id: 'over',   label: 'The load was too heavy and overloaded both components' },
                { id: 'cap',    label: 'A capacitor failure on the DC bus caused both failures' },
              ],
              correctScenario: 'diode',
              hint: 'A freewheeling diode that is now shorted may have first failed open. Think about what happens to the IGBT when the diode that was protecting it is gone.',
              correctFeedback: 'Correct. The failure sequence is: freewheeling diode fails open → next time the IGBT switches off, the inductor current has no path → inductive kickback spike rises to hundreds of volts → destroys the IGBT. Now the diode measures shorted because it failed in a different mode, or was destroyed by the same event. When replacing the IGBT, always replace the freewheeling diode at the same time — they are a matched pair.',
              incorrectFeedback: 'Incorrect. The most common failure chain is: freewheeling diode fails first (open circuit) → inductive kickback destroys the IGBT on the next switching cycle. The IGBT has no protection from the inductor energy spike once the diode is gone. A shorted diode reading on a diode that was supposed to be a protection component typically means it failed earlier — possibly open, then the voltage spike caused it to short.',
            },
            {
              id: 'diode-1',
              type: 'scenario',
              title: 'Scenario B: Diode Testing with Ohmmeter',
              prompt: 'You are testing a silicon rectifier diode from a UPS rectifier bridge. With the ohmmeter set to diode test mode, you measure 0.68V in the forward direction and 0.00V (or OL on a good meter) in the reverse direction. What does this indicate?',
              scenarioOptions: [
                { id: 'bad',   label: 'The diode is faulty — forward voltage should be higher than 0.68V' },
                { id: 'shorted', label: 'The diode is shorted — 0.00V in reverse means it conducts both ways' },
                { id: 'good',  label: 'The diode is good — 0.68V forward (near 0.7V for silicon) and no conduction in reverse is correct behavior', sublabel: 'Correct — this is normal diode behavior' },
                { id: 'open',  label: 'The diode is open — the reverse measurement confirms it' },
              ],
              correctScenario: 'good',
              hint: 'A good silicon diode drops about 0.6–0.7V forward. In reverse, a good diode blocks — a meter reads OL (overload/infinite resistance). 0.00V reverse means it is shorted.',
              correctFeedback: 'Correct. A good silicon diode reads 0.6–0.7V in forward bias (diode test mode) and OL (over-limit / infinite resistance) in reverse bias. Your reading of 0.68V forward and OL reverse is textbook healthy diode behavior. A shorted diode reads near 0V in BOTH directions. A failed-open diode reads OL in BOTH directions.',
              incorrectFeedback: 'Incorrect. A healthy silicon diode reads 0.6–0.7V in forward bias and OL (infinite) in reverse. This diode reads 0.68V forward (within spec) and 0.00V/OL in reverse (blocking correctly). 0.00V in reverse on a good meter means OL — no conduction. If reverse read 0.00V meaning actual near-zero resistance, that would indicate a short. Review the diode test mode interpretation.',
            },
          ],
        },
        quiz: [
          { q: 'Inductance is measured in:', a: ['Farads', 'Ohms', 'Henrys', 'Volts'], correct: 2, exp: 'Inductance is measured in henrys (H), with millihenrys (mH) and microhenrys (µH) being common practical values.' },
          { q: 'Inductors oppose:', a: ['Constant current flow', 'Rapid changes in current', 'High voltage', 'DC power'], correct: 1, exp: 'Inductors oppose changes in current. Constant DC flows through an inductor easily; changing current is opposed.' },
          { q: 'What is inductive kickback?', a: ['Excess current from a large inductor', 'A high-voltage spike when inductor current is suddenly interrupted', 'Inductor resonance at high frequency', 'Magnetic field saturation'], correct: 1, exp: 'When current through an inductor is interrupted, the collapsing magnetic field generates a high-voltage spike called inductive kickback.' },
          { q: 'A freewheeling diode is placed across an inductor to:', a: ['Increase inductance', 'Absorb inductive kickback spikes and protect switches', 'Convert AC to DC', 'Measure inductor current'], correct: 1, exp: 'The freewheeling (flyback) diode provides a current path for the inductor\'s energy when the switch opens, preventing destructive voltage spikes.' },
          { q: 'A diode allows current to flow:', a: ['In both directions equally', 'In one direction only', 'Only when voltage exceeds 10V', 'Only with AC applied'], correct: 1, exp: 'A diode is a one-way valve for current — forward-biased allows current, reverse-biased blocks it.' },
          { q: 'The forward voltage drop of a silicon diode is approximately:', a: ['0.1V', '0.3V', '0.7V', '1.5V'], correct: 2, exp: 'Silicon diodes have a forward voltage drop of approximately 0.7V when conducting.' },
          { q: 'A diode that is shorted will:', a: ['Block current in both directions', 'Allow current in both directions', 'Increase resistance', 'Require higher voltage to conduct'], correct: 1, exp: 'A shorted diode allows current through in both directions, losing its rectification function.' },
          { q: 'What does a line reactor (input inductor) do in a UPS system?', a: ['Increases voltage to the rectifier', 'Reduces harmonic distortion from the rectifier', 'Stores backup energy', 'Controls battery charging current'], correct: 1, exp: 'Input line reactors reduce harmonic current distortion that the UPS rectifier injects back onto the utility supply.' },
          { q: 'A Zener diode operates in:', a: ['Forward bias only', 'Reverse breakdown at a specific voltage', 'Only AC circuits', 'Both directions below 0.7V'], correct: 1, exp: 'Zener diodes are designed to conduct in reverse at a precise breakdown voltage, used for voltage regulation and references.' },
          { q: 'Output filter chokes (inductors) in UPS inverters:', a: ['Amplify the output voltage', 'Smooth the PWM switching waveform into a clean sine wave', 'Store battery energy', 'Block DC from the output'], correct: 1, exp: 'Output filter inductors (with capacitors) form a low-pass filter that converts the PWM square wave into a smooth AC sine wave output.' },
        ],
      },
      {
        title: 'Transformers',
        body: [
          'A transformer transfers electrical energy between two circuits through electromagnetic induction. It consists of primary and secondary coils wound around a magnetic core. An AC voltage applied to the primary creates a changing magnetic field in the core, which induces a voltage in the secondary. Transformers only work with AC — they cannot transform DC.',
          'The voltage transformation ratio equals the turns ratio: Vsecondary/Vprimary = Nsecondary/Nprimary. A step-up transformer increases voltage (secondary has more turns). A step-down transformer decreases voltage (secondary has fewer turns). Isolation transformers have a 1:1 ratio — they don\'t change voltage but electrically isolate the secondary circuit from the primary, which improves safety and reduces noise.',
          'In UPS systems, transformers appear in several places: input isolation transformers to separate the UPS from the supply, output transformers to match load voltage requirements, and battery charger transformers. Some UPS topologies are "transformer-based" (using a large output transformer) while others are "transformerless" (smaller and lighter but without galvanic isolation).',
          'Transformer efficiency is very high (95-99%) but they do generate heat, especially at high loads. Overloading a transformer causes excessive core temperature, insulation breakdown, and eventually failure. Transformers also produce audible hum at line frequency (60Hz in the US) — this is normal. Abnormally loud hum or burning smell indicates overload or failure.',
        ],
        tables: [
          {
            caption: 'Transformer turns ratio and voltage examples',
            headers: ['Type', 'Turns Ratio (Pri:Sec)', 'Voltage In → Out', 'UPS Application'],
            rows: [
              ['Step-down',   '2:1',   '480V → 240V',  'Facility power to UPS input'],
              ['Step-down',   '4:1',   '480V → 120V',  'UPS output for single-phase load'],
              ['Isolation',   '1:1',   '120V → 120V',  'Galvanic isolation for medical/sensitive loads'],
              ['Step-up',     '1:2',   '120V → 240V',  'Output matching for high-voltage loads'],
            ],
          },
        ],
        keyPoints: [
          'Transformers transfer AC energy via electromagnetic induction',
          'Turns ratio determines voltage step-up or step-down',
          'Transformers cannot transform DC',
          'Isolation transformers provide electrical isolation, not voltage change',
          'Overloaded transformers overheat — burning smell = replace',
        ],
        practical: {
          intro: 'Two scenarios applying transformer knowledge during UPS commissioning and service.',
          steps: [
            {
              id: 'xfmr-1',
              type: 'scenario',
              title: 'Scenario A: Selecting a Step-Down Transformer',
              prompt: 'You are commissioning a single-phase 120V UPS from a 480V three-phase panel. You need a step-down transformer to feed the UPS input. The UPS draws 20A at 120V (2400VA). What transformer specification should you select?',
              scenarioOptions: [
                { id: 'one-to-one', label: '1:1 isolation transformer — it provides galvanic isolation and matches 480V output' },
                { id: 'four-to-one', label: '4:1 step-down transformer, rated for at least 2.5 kVA, single-phase 480V primary / 120V secondary', sublabel: 'Correct — 480V to 120V requires 4:1 ratio' },
                { id: 'two-to-one', label: '2:1 step-down transformer — 480V in → 240V out, close enough' },
                { id: 'stepup', label: 'Step-up transformer to raise 120V to 480V before the UPS' },
              ],
              correctScenario: 'four-to-one',
              hint: '480V ÷ 120V = 4. The transformer must convert 480V primary to 120V secondary. Turns ratio = 4:1.',
              correctFeedback: 'Correct. A 4:1 step-down transformer takes 480V primary to 120V secondary (480 ÷ 120 = 4). The kVA rating must match or exceed the load: 2400VA = 2.4 kVA minimum, so a 2.5 or 3 kVA unit is appropriate. Never use a 1:1 isolation transformer for this application — it would output 480V to a 120V UPS input, which would destroy the UPS.',
              incorrectFeedback: 'Incorrect. The turns ratio needed is 480V ÷ 120V = 4:1. A 2:1 transformer would output 240V (too high). A 1:1 would output 480V (dangerous). The correct choice is a 4:1 step-down at sufficient kVA rating for the load.',
            },
            {
              id: 'xfmr-2',
              type: 'scenario',
              title: 'Scenario B: Why the Transformer is Humming Loudly',
              prompt: 'During a routine PM on a 3-phase UPS installation, you notice the input isolation transformer is humming significantly louder than during your previous visit 6 months ago. There is no burning smell. The UPS is showing 85% load. What is the most likely cause and what should you do?',
              scenarioOptions: [
                { id: 'normal', label: 'Transformers always hum — the louder hum is just your ears adapting. No action needed.' },
                { id: 'overload', label: 'The load has increased toward the transformer\'s rated capacity. The increased core flux causes louder magnetostrictive hum. Document the load increase and check if it is within the transformer\'s rated capacity.', sublabel: 'Correct — higher load = louder hum' },
                { id: 'failure', label: 'The transformer is about to fail — replace it immediately.' },
                { id: 'frequency', label: 'The utility frequency has shifted to 120Hz, doubling the hum.' },
              ],
              correctScenario: 'overload',
              hint: 'Transformer hum is caused by magnetostriction — the core vibrating at line frequency. More load = stronger magnetic field = louder hum. No burning smell is a positive sign.',
              correctFeedback: 'Correct. Louder hum without burning smell strongly suggests increased load. The magnetic field in the core is proportional to load — higher load creates stronger field, more magnetostriction, louder hum. At 85% load you are not overloading (100%+ would generate heat and eventually burning smell), but you should document it and advise the site to monitor. If load grows further or hum becomes abnormal, thermal inspection may be warranted.',
              incorrectFeedback: 'Incorrect. A significant increase in hum over a known baseline is a meaningful change. Transformer hum increases with load (magnetostriction). At 85% load with louder hum but no burning smell, the transformer is not critically failing but the load increase should be documented. A burning smell would indicate actual overheating.',
            },
          ],
        },
        quiz: [
          { q: 'Transformers work by:', a: ['Converting DC to AC', 'Electromagnetic induction between primary and secondary coils', 'Direct electrical connection between windings', 'Storing energy in capacitors'], correct: 1, exp: 'Transformers use electromagnetic induction — AC in the primary creates a changing magnetic field that induces voltage in the secondary.' },
          { q: 'Why can\'t transformers operate on DC?', a: ['DC voltage is too low', 'DC doesn\'t create a changing magnetic field needed for induction', 'DC has too high a current', 'DC is stored in the core'], correct: 1, exp: 'Induction requires a CHANGING magnetic field. Constant DC creates a constant field — no change, no induction in the secondary.' },
          { q: 'A transformer with a 2:1 turns ratio (primary:secondary) is a:', a: ['Step-up transformer', 'Step-down transformer', 'Isolation transformer', 'Auto-transformer'], correct: 1, exp: 'Primary:secondary = 2:1 means secondary has fewer turns — voltage steps down (e.g., 480V in → 240V out).' },
          { q: 'An isolation transformer with 1:1 turns ratio:', a: ['Doubles the voltage', 'Provides electrical isolation without changing voltage', 'Is used to step down voltage', 'Converts DC to AC'], correct: 1, exp: 'A 1:1 isolation transformer electrically separates primary and secondary circuits for safety and noise reduction without changing voltage.' },
          { q: 'If a UPS transformer smells like burning, you should:', a: ['Continue monitoring', 'Reduce the load slightly', 'Shut down and investigate — transformer may be failing', 'Check the battery string'], correct: 2, exp: 'Burning smell from a transformer indicates overloading or insulation breakdown — shut down before it fails catastrophically.' },
          { q: 'Transformer efficiency is typically:', a: ['50-70%', '70-85%', '85-94%', '95-99%'], correct: 3, exp: 'Quality power transformers operate at 95-99% efficiency. Even so, heat management is important at high loads.' },
          { q: 'Transformer-based UPS systems, compared to transformerless:', a: ['Are lighter and smaller', 'Provide galvanic isolation but are heavier', 'Are less efficient', 'Cannot handle three-phase loads'], correct: 1, exp: 'Transformer-based UPS provide galvanic isolation between input and output but are larger and heavier than transformerless designs.' },
          { q: 'The audible 60Hz hum from a transformer is:', a: ['A sign of failure', 'Normal — caused by magnetostrictive vibration of the core', 'Caused by loose connections', 'A ground fault indicator'], correct: 1, exp: '60Hz hum from transformers is normal — it is caused by magnetostriction (core material vibrating at line frequency).' },
          { q: 'Which formula relates transformer voltage to turns ratio?', a: ['Vs/Vp = Is/Ip', 'Vs/Vp = Ns/Np', 'Vs = Vp × Ip', 'Vs = Np/Ns × R'], correct: 1, exp: 'Vs/Vp = Ns/Np — secondary voltage over primary voltage equals secondary turns over primary turns.' },
          { q: 'Overloading a transformer primarily causes:', a: ['High output voltage', 'Low output voltage', 'Excessive core heating and insulation breakdown', 'Frequency change at output'], correct: 2, exp: 'Overloaded transformers generate excess heat in the core and windings, eventually breaking down winding insulation.' },
        ],
      },
    ],
    test: [
      { q: 'What do DC bus capacitors in a UPS do?', a: ['Convert DC to AC', 'Smooth rectified voltage ripple', 'Store battery energy', 'Correct power factor'], correct: 1, exp: 'Large DC bus capacitors smooth the ripple in rectified voltage, providing a stable DC supply for the inverter.' },
      { q: 'ESR increasing in a capacitor indicates:', a: ['Higher capacitance', 'Capacitor degradation', 'Lower leakage', 'Improved performance'], correct: 1, exp: 'Rising ESR (Equivalent Series Resistance) is a key indicator of electrolytic capacitor aging and degradation.' },
      { q: 'What is inductive kickback?', a: ['Back-EMF from a motor', 'High-voltage spike when inductor current is interrupted', 'Magnetic saturation', 'Inductor resonance'], correct: 1, exp: 'When inductor current is interrupted, the collapsing field produces a voltage spike (kickback) that can destroy switching transistors.' },
      { q: 'A freewheeling diode is used to:', a: ['Rectify AC to DC', 'Protect switches from inductive kickback', 'Regulate voltage', 'Filter output waveform'], correct: 1, exp: 'Freewheeling (flyback) diodes provide a safe path for inductor energy when the switching transistor turns off.' },
      { q: 'A silicon diode\'s forward voltage drop is approximately:', a: ['0.1V', '0.3V', '0.7V', '1.2V'], correct: 2, exp: 'Silicon diodes drop approximately 0.7V when forward-biased and conducting.' },
      { q: 'Transformers require _____ to operate.', a: ['DC only', 'Both AC and DC', 'AC only', 'High frequency only'], correct: 2, exp: 'Transformers require AC because they depend on a changing magnetic field to induce voltage in the secondary.' },
      { q: 'A 480V:240V transformer has a turns ratio of:', a: ['1:1', '1:2', '2:1', '4:1'], correct: 2, exp: 'Vsec/Vpri = Nsec/Npri → 240/480 = 1/2. Primary has 2× the turns of secondary. Ratio = 2:1.' },
      { q: 'An isolation transformer differs from a step-down transformer because:', a: ['It converts DC to AC', 'It has no core', 'It provides galvanic isolation without necessarily changing voltage', 'It is more efficient'], correct: 2, exp: 'Isolation transformers separate circuits electrically (galvanic isolation) and may have any turns ratio, including 1:1.' },
      { q: 'Why must capacitors be discharged before servicing UPS power electronics?', a: ['To prevent data loss', 'They retain dangerous voltage after power is removed', 'To allow accurate measurements', 'To prevent noise'], correct: 1, exp: 'Capacitors store charge and maintain dangerous voltages long after power is removed — always discharge before touching.' },
      { q: 'Output filter chokes (inductors) in a UPS inverter:', a: ['Store battery energy', 'Convert AC to DC', 'Smooth PWM output into a sine wave', 'Provide overcurrent protection'], correct: 2, exp: 'Output inductors work with filter capacitors to convert the PWM square wave from the inverter into a smooth sine wave output.' },
    ],
  },

  {
    id: 'ac-dc-systems',
    num: 4,
    title: 'AC and DC Systems',
    desc: 'Direct current, alternating current, waveforms, RMS voltage, power factor, and three-phase power — essential knowledge for every UPS field technician.',
    slides: [
      {
        title: 'DC Power Fundamentals',
        body: [
          'Direct Current (DC) flows in one direction only and maintains a constant polarity. Batteries produce DC — the positive terminal is always positive, the negative terminal is always negative. UPS battery strings, DC bus voltages, and control circuits all operate on DC. Common UPS DC bus voltages include 48V, 240V, and 400V DC.',
          'DC is characterized by its voltage magnitude and polarity. You must always observe polarity when working with DC — connecting a battery backwards can destroy electronics instantly. Multimeters measure DC voltage with red (+) and black (−) probes. A negative reading simply means you have the probes reversed relative to the actual polarity.',
          'DC has zero frequency — it does not oscillate. This means DC cannot be transformed directly with a standard transformer. To transmit DC power over long distances efficiently, it must either be converted to AC first, or transmitted as High Voltage DC (HVDC) using special converters. Inside a UPS, the rectifier converts AC to DC; the inverter converts DC back to AC.',
          'Current ripple on a DC bus refers to small AC components superimposed on the DC level, caused by the rectification process. Capacitors on the DC bus filter this ripple. Excessive ripple indicates insufficient capacitance (often from aged/failed capacitors) and can cause inverter instability and audible noise.',
        ],
        tables: [
          {
            caption: 'Common UPS DC bus voltages and applications',
            headers: ['DC Bus Voltage', 'Typical UPS Capacity', 'Battery String Config', 'Notes'],
            rows: [
              ['48V DC',   '≤10 kVA',    '24 × 2V cells in series',       'Small rack UPS, telecom systems'],
              ['120V DC',  '10–30 kVA',  '60 × 2V cells in series',       'Mid-range standalone UPS'],
              ['240V DC',  '20–80 kVA',  '120 × 2V or 20 × 12V in series', 'Larger tower/modular systems'],
              ['400V DC',  '40–300+ kVA', '192+ cells or modular pack',   'Modern transformerless high-power UPS'],
            ],
          },
        ],
        keyPoints: [
          'DC flows in one direction only — constant polarity',
          'Common UPS DC bus voltages: 48V, 240V, 400V DC',
          'Always observe polarity when working with DC',
          'Rectifier converts AC to DC; inverter converts DC to AC',
          'DC ripple on the bus is filtered by capacitors',
        ],
        practical: {
          intro: 'Two DC power scenarios encountered during UPS battery and bus work.',
          steps: [
            {
              id: 'dc-1',
              type: 'scenario',
              title: 'Scenario A: Reversed Polarity on a Battery String',
              prompt: 'A junior technician accidentally connects the positive terminal of a new 48V battery string to the negative bus bar and the negative terminal to the positive bus bar before switching in the string. What should be done immediately and why?',
              scenarioOptions: [
                { id: 'switch', label: 'Switch the string in anyway — the UPS controls will correct the polarity' },
                { id: 'disc',   label: 'Do not switch in the string. Disconnect it immediately and reconnect with correct polarity before switching in. DC reverse polarity can destroy battery charger electronics, fuses, and bus capacitors instantly.', sublabel: 'Correct — reverse polarity is catastrophic' },
                { id: 'fuse',   label: 'The fuse will blow and protect everything — switch it in and see what happens' },
                { id: 'meter',  label: 'Measure the voltage first to confirm polarity, then switch in regardless' },
              ],
              correctScenario: 'disc',
              hint: 'DC polarity must be correct before making the final connection. A fuse protecting on fault current, not on reverse polarity — reverse polarity will still damage electronics before the fuse opens.',
              correctFeedback: 'Correct. Reverse polarity on a DC battery string is a high-severity fault. The bus capacitors will be reverse-biased immediately (destroying them), the charger rectifier will be reverse-biased, and fuses may blow — but not before semiconductors and capacitors are damaged. The only correct action is to never switch in a reverse-polarity string. Verify polarity with a meter BEFORE making the live connection.',
              incorrectFeedback: 'Incorrect. UPS controls cannot correct reversed polarity. The moment a reverse-polarity battery string connects to the bus, electrolytic capacitors are reverse-biased (catastrophic failure), charger rectifiers see reverse voltage, and semiconductors are destroyed. Fuses may eventually blow but not fast enough to prevent component damage. Never switch in any DC source without verifying polarity first.',
            },
            {
              id: 'dc-2',
              type: 'scenario',
              title: 'Scenario B: Diagnosing DC Bus Ripple',
              prompt: 'A UPS is generating audible buzz from the inverter output and the AC output voltage shows small oscillations. You set your DMM to AC voltage and measure 4V AC riding on the 240V DC bus. What does this tell you?',
              scenarioOptions: [
                { id: 'normal',  label: '4V of AC ripple on 240V DC is normal — less than 2%, not worth investigating' },
                { id: 'cap',     label: 'Excessive DC bus ripple suggests the filter capacitors have degraded (high ESR). The capacitors are no longer smoothing the rectified voltage effectively. This correlates with the audible buzz and output voltage variations.', sublabel: 'Correct — ripple points to capacitor degradation' },
                { id: 'rect',    label: 'The rectifier has failed — a working rectifier produces pure DC with zero ripple' },
                { id: 'load',    label: 'The connected load is injecting AC back onto the DC bus' },
              ],
              correctScenario: 'cap',
              hint: 'DC bus ripple is filtered by bus capacitors. When they age, their ESR rises and they can no longer absorb ripple. The ripple then passes through to the inverter and appears on the output.',
              correctFeedback: 'Correct. DC bus ripple (AC component on DC) that exceeds spec (typically 1–2% of bus voltage) indicates capacitor degradation. At 240V DC, 4V of ripple is about 1.7% — borderline and worth investigating. The ripple passes through the inverter and causes buzz and output instability. The next step is ESR measurement of the bus capacitors. This is a predictive maintenance finding that could prevent unexpected shutdown.',
              incorrectFeedback: 'Incorrect. While some ripple is inherent in rectified DC, excessive ripple specifically indicates that the smoothing capacitors are not doing their job. This is the most common finding when bus capacitors age. A working rectifier always produces rippled DC — capacitors smooth it. When they fail, the ripple increases and passes through to the output.',
            },
          ],
        },
        quiz: [
          { q: 'DC (Direct Current) is characterized by:', a: ['Oscillating polarity', 'Constant direction and polarity', 'Zero voltage always', 'Sinusoidal waveform'], correct: 1, exp: 'DC flows in one constant direction and has fixed polarity — positive is always positive, negative is always negative.' },
          { q: 'Which of these is a typical UPS DC bus voltage?', a: ['120V DC', '240V DC', '480V DC', '12V DC'], correct: 1, exp: '240V DC is a common UPS DC bus voltage. 48V DC is common in smaller systems. 400V DC is used in some modern transformerless UPS.' },
          { q: 'What happens if you reverse-connect a battery (wrong polarity)?', a: ['Nothing — polarity doesn\'t matter for batteries', 'Electronics connected to it can be destroyed instantly', 'Current simply flows backwards normally', 'Battery charges itself'], correct: 1, exp: 'Reverse polarity applies reverse voltage to electronics, potentially destroying them immediately. Polarity ALWAYS matters.' },
          { q: 'Why can\'t a standard transformer directly transform DC?', a: ['DC voltage is too low', 'DC has no changing magnetic field for induction', 'Transformers only work with three-phase', 'DC frequency is too high'], correct: 1, exp: 'Transformers require a CHANGING magnetic field. DC is constant — it produces a constant field, with no induction in the secondary.' },
          { q: 'When your multimeter shows a negative DC voltage reading:', a: ['The circuit is broken', 'The probes are reversed relative to actual polarity', 'The battery is dead', 'The meter is faulty'], correct: 1, exp: 'A negative reading on DC means your probes are backwards (red on negative, black on positive). Swap them for a correct positive reading.' },
          { q: 'Capacitors on the DC bus filter:', a: ['High-frequency interference', 'Current ripple from the rectification process', 'Reverse polarity', 'Three-phase imbalance'], correct: 1, exp: 'Rectified AC has ripple — small AC variations superimposed on the DC level. Bus capacitors smooth this ripple.' },
          { q: 'A UPS rectifier converts:', a: ['DC to AC', 'AC to DC', 'AC to higher AC voltage', 'DC battery to load voltage'], correct: 1, exp: 'The rectifier converts AC input power to DC for the battery and DC bus.' },
          { q: 'A UPS inverter converts:', a: ['AC to DC', 'DC to AC', 'Battery to higher DC voltage', 'Three-phase to single-phase'], correct: 1, exp: 'The inverter converts DC bus/battery power back into AC for the connected loads.' },
          { q: 'DC ripple on the bus is considered excessive when:', a: ['Any ripple is present', 'Capacitors are new', 'It causes inverter instability or audible noise', 'The battery is fully charged'], correct: 2, exp: 'Some ripple is normal, but excessive ripple (often from aging capacitors) degrades performance and causes noise/instability.' },
          { q: 'In a UPS, what converts AC grid power to DC for the battery charger?', a: ['Inverter', 'Static bypass switch', 'Rectifier', 'Isolation transformer'], correct: 2, exp: 'The rectifier stage converts AC input to DC for both the DC bus and the battery charging circuit.' },
        ],
      },
      {
        title: 'AC Power and Waveforms',
        body: [
          'Alternating Current (AC) periodically reverses direction. In the US, AC at 60Hz completes 60 full cycles per second. One cycle consists of a positive half-cycle and a negative half-cycle. The standard household and commercial supply is 60Hz single-phase at 120V or 240V, or 60Hz three-phase at 208V or 480V (line-to-line).',
          'The pure AC sine wave has a peak voltage that is higher than the RMS (root mean square) voltage we normally state. For US single-phase 120V RMS, the peak voltage is 169.7V (120 × √2). RMS voltage is the DC-equivalent voltage for power delivery — a 120V AC (RMS) source delivers the same power as 120V DC to a resistive load.',
          'Frequency is measured in hertz (Hz). US power is 60Hz; Europe and most of the world use 50Hz. UPS systems are designed for their target frequency. A UPS rated for 60Hz cannot simply be used on a 50Hz supply without adjustment. The inverter in a UPS generates its output frequency independently of the input — in bypass mode, the output frequency must match the input to allow seamless transfer.',
          'AC waveform quality matters to sensitive loads. A pure sine wave is ideal. A UPS inverter should produce a true sine wave output with total harmonic distortion (THD) of less than 5% at rated load. Loads that require clean sine wave output include medical equipment, audio systems, and some variable frequency drives.',
        ],
        tables: [
          {
            caption: 'AC waveform types and UPS output quality',
            headers: ['Waveform Type', 'THD', 'Load Compatibility', 'UPS Source'],
            rows: [
              ['True sine wave',     '<3%',    'All loads including medical, VFDs, audio',  'Online double-conversion UPS inverter'],
              ['Modified sine wave', '20-45%', 'Resistive loads; damages motors and drives', 'Cheap offline/standby UPS'],
              ['Square wave',        '>50%',   'Simple resistive loads only',               'Basic ferroresonant designs'],
              ['Utility sine wave',  '<5%',    'All loads',                                  'Bypass mode from clean utility'],
            ],
          },
        ],
        widget: 'waveform-viewer',
        keyPoints: [
          'US AC: 60Hz, 120V or 240V single-phase, 208V or 480V three-phase',
          'RMS voltage is the useful power-equivalent voltage (not peak)',
          '120V RMS has a peak of about 170V',
          'Inverter output must be true sine wave with low THD',
          'UPS inverter generates its own frequency independently of input',
        ],
        practical: {
          intro: 'Two AC power scenarios involving waveform quality and RMS calculations.',
          steps: [
            {
              id: 'ac-1',
              type: 'scenario',
              title: 'Scenario A: Modified Sine Wave Damage',
              prompt: 'A customer plugs a variable frequency drive (VFD) controlling an HVAC fan into a standby UPS on utility power. Utility fails; UPS switches to battery and outputs a modified sine wave. Within 30 minutes the VFD faults and shuts down. What is the most likely cause?',
              scenarioOptions: [
                { id: 'power',  label: 'The UPS battery ran out in 30 minutes — needs more battery' },
                { id: 'wave',   label: 'Modified sine wave contains high harmonic content (high THD). VFDs are sensitive to waveform distortion and fault on poor-quality AC. The VFD was not compatible with a modified sine wave UPS.', sublabel: 'Correct — modified sine wave + VFD = incompatibility' },
                { id: 'freq',   label: 'The UPS output frequency shifted to 50Hz, confusing the VFD' },
                { id: 'surge',  label: 'The transfer time from utility to battery caused a voltage surge that damaged the VFD' },
              ],
              correctScenario: 'wave',
              hint: 'VFDs require clean power to operate their internal rectifier and control circuitry. Modified sine wave has significant harmonic content that can cause their protective functions to trip.',
              correctFeedback: 'Correct. Variable frequency drives have rectifier front ends and sensitive control electronics. High-THD modified sine wave power (20–45% THD) overloads their input rectifier harmonically and can trigger overvoltage or overcurrent protection faults. VFDs require true sine wave UPS protection. Substituting a true sine wave (online double-conversion) UPS would resolve the incompatibility.',
              incorrectFeedback: 'Incorrect. Standby UPS on battery typically provides runtime of 10–60 minutes for small loads — battery depletion is unlikely in 30 minutes for a fan drive. The root cause is waveform incompatibility: modified sine wave UPS output + VFD = fault. VFDs require true sine wave power.',
            },
            {
              id: 'ac-2',
              type: 'scenario',
              title: 'Scenario B: RMS vs. Peak Voltage Confusion',
              prompt: 'A technician measures UPS output voltage with an oscilloscope and sees the waveform peak at 169V. They report the UPS output voltage is wrong (spec is 120V). Is their diagnosis correct?',
              scenarioOptions: [
                { id: 'wrong',  label: 'Yes — the output should peak at 120V. 169V is too high and may damage the load.' },
                { id: 'right',  label: 'No — 169V peak is exactly correct for a 120V RMS supply. Peak = RMS × √2 = 120 × 1.414 ≈ 169.7V. The technician confused RMS with peak voltage.', sublabel: 'Correct — peak ≠ RMS' },
                { id: 'maybe',  label: 'Possibly — the oscilloscope may be reading incorrectly; use a DMM instead' },
                { id: 'bypass', label: 'The UPS is in bypass and the utility voltage is elevated' },
              ],
              correctScenario: 'right',
              hint: 'Voltage specs (120V, 240V) are always given in RMS. Peak voltage is always higher: Peak = RMS × √2.',
              correctFeedback: 'Correct. All AC voltage ratings (120V, 240V, 480V) are RMS values. The peak of a 120V RMS sine wave is 120 × √2 ≈ 169.7V. A 169V peak reading on an oscilloscope is perfectly normal and expected for a 120V RMS supply. DMMs measuring AC voltage read RMS directly. An oscilloscope shows peak — always divide by √2 to get RMS, or read the scope\'s RMS measurement function.',
              incorrectFeedback: 'Incorrect. 120V is the RMS value. An oscilloscope shows peak voltage, which is RMS × √2 = 169.7V. This is correct. The mistake was confusing RMS and peak values. Electrical standards always specify RMS, not peak.',
            },
          ],
        },
        quiz: [
          { q: 'US AC power operates at:', a: ['50Hz', '60Hz', '120Hz', '25Hz'], correct: 1, exp: 'US AC power is at 60Hz. Most of the rest of the world uses 50Hz.' },
          { q: 'RMS voltage is:', a: ['The peak voltage of the AC waveform', 'The average voltage of the AC waveform', 'The DC-equivalent voltage for power delivery', 'Half the peak voltage'], correct: 2, exp: 'RMS (root mean square) voltage is the AC equivalent of DC voltage for power calculations — a 120V AC RMS delivers the same power as 120V DC to a resistive load.' },
          { q: 'What is the peak voltage of a 120V RMS AC supply?', a: ['84.8V', '120V', '169.7V', '240V'], correct: 2, exp: 'Peak = RMS × √2 = 120 × 1.414 ≈ 169.7V.' },
          { q: 'How many complete cycles does 60Hz AC complete per second?', a: ['30', '60', '120', '600'], correct: 1, exp: '60Hz means 60 complete cycles (positive and negative half-cycles) per second.' },
          { q: 'THD stands for:', a: ['Total Harmonic Distortion', 'Transformer Heat Dissipation', 'Transfer Hold Duration', 'Three-phase High Demand'], correct: 0, exp: 'THD = Total Harmonic Distortion. A UPS should deliver output with less than 5% THD for sensitive loads.' },
          { q: 'What does the UPS inverter produce independently of the input supply?', a: ['DC voltage', 'Its own output frequency', 'Battery charging current', 'Input power factor'], correct: 1, exp: 'The inverter generates output frequency independently. It can maintain stable 60Hz output even if input frequency varies.' },
          { q: 'A true sine wave output from a UPS is required for:', a: ['Incandescent light bulbs', 'Simple resistive loads', 'Medical equipment and sensitive electronics', 'Only three-phase loads'], correct: 2, exp: 'Medical equipment, audio systems, and some drives require clean sine wave power. Stepped or modified sine wave causes problems.' },
          { q: 'In a UPS operating in bypass mode, the output frequency must:', a: ['Be generated by the inverter', 'Match the input frequency for seamless transfer', 'Be double the input frequency', 'Be 50Hz regardless of input'], correct: 1, exp: 'For a seamless transfer back to inverter mode, the inverter must sync its frequency to the bypass (utility) frequency.' },
          { q: 'European AC power is typically:', a: ['60Hz / 120V', '50Hz / 230V', '60Hz / 240V', '50Hz / 120V'], correct: 1, exp: 'European standard is 50Hz at 230V single-phase, compared to US 60Hz at 120/240V.' },
          { q: 'One AC cycle consists of:', a: ['One positive half-cycle only', 'One positive and one negative half-cycle', 'Two positive and two negative half-cycles', 'A DC pulse'], correct: 1, exp: 'One complete AC cycle = one positive half-cycle + one negative half-cycle.' },
        ],
      },
      {
        title: 'Power Factor and Three-Phase Power',
        body: [
          'Power factor (PF) is the ratio of real power (watts, doing actual work) to apparent power (VA, product of voltage and current). PF = W / VA. A purely resistive load has PF = 1.0 (unity). Motors, transformers, and switching power supplies have reactive components that shift current out of phase with voltage, reducing power factor below 1.0.',
          'Low power factor means you are drawing more current from the supply than you are converting to useful work. A UPS rated at 10kVA with 0.9 PF rating can deliver 9kW of real power. Understanding power factor prevents overloading circuits — a circuit breaker protects based on current (amps), regardless of power factor.',
          'Three-phase AC power uses three conductors, each carrying a sine wave 120 degrees out of phase with the others. This system is far more efficient for large power delivery. Data center UPS systems are typically three-phase in and three-phase out (or three-phase in, single-phase out for smaller loads). Line-to-neutral voltage in a 208V three-phase system is 120V. Line-to-neutral in a 480V three-phase system is 277V.',
          'In three-phase systems, a balanced load draws equal current on all three phases. Unbalanced loads (more on one phase than others) cause excessive heating on the overloaded phase and neutral current. In a UPS installation, a field technician must verify load balance across phases and report significant imbalance to site management.',
        ],
        tables: [
          {
            caption: 'Three-phase voltage relationships',
            headers: ['System Voltage (L-L)', 'Line-to-Neutral', 'Common Use', 'UPS Application'],
            rows: [
              ['208V 3Ø',  '120V',  'Small data center, office 3Ø power',          'Three-phase UPS with single-phase PDU outputs'],
              ['480V 3Ø',  '277V',  'Industrial and large commercial facilities',  'Large UPS input; lighting at 277V L-N'],
              ['400V 3Ø',  '230V',  'European/international standard',             'International UPS installations'],
            ],
          },
        ],
        widget: 'power-triangle',
        keyPoints: [
          'Power Factor = Real Power (W) / Apparent Power (VA)',
          'Unity power factor (PF = 1.0) means all apparent power does real work',
          '208V three-phase: 120V line-to-neutral; 480V: 277V line-to-neutral',
          'Low PF means more current drawn for same real power',
          'Unbalanced three-phase loads cause overheating and neutral current',
        ],
        practical: {
          intro: 'Two power factor and three-phase scenarios from real data center UPS installations.',
          steps: [
            {
              id: 'pf-1',
              type: 'scenario',
              title: 'Scenario A: UPS Capacity and Power Factor',
              prompt: 'A 20 kVA UPS is rated at 0.9 power factor. The data center manager wants to add 16 kW of new server load. Is there enough UPS capacity? Assume the new servers have a 0.95 PF.',
              scenarioOptions: [
                { id: 'no-check', label: '20 kVA > 16 kW so there is enough capacity — no need to check further' },
                { id: 'pf-check', label: 'At 0.95 PF, 16 kW of servers draws 16.8 kVA. UPS max real power = 20 × 0.9 = 18 kW and max VA is 20 kVA. 16.8 kVA < 20 kVA and 16 kW < 18 kW — capacity is sufficient, but you are at 84% VA loading.', sublabel: 'Correct — check both kW and kVA limits' },
                { id: 'watts',    label: '16 kW < 20 kVA so there is definitely room — power factor doesn\'t matter for UPS sizing' },
                { id: 'exceed',   label: '16 kW exceeds the 18 kW real power limit — the UPS cannot handle this load' },
              ],
              correctScenario: 'pf-check',
              hint: 'Check both limits: UPS real power limit = VA × PF = 20,000 × 0.9 = 18 kW. UPS VA limit = 20 kVA. Load VA = load W ÷ PF = 16,000 ÷ 0.95 = 16,842 VA.',
              correctFeedback: 'Correct. You must check both VA and kW limits. The UPS can deliver a maximum of 18 kW (20 kVA × 0.9 PF) and 20 kVA. The load draws 16 kW and 16,842 VA — both within limits at about 84% VA loading. This is good — you have headroom. However, if the data center plans to grow to 20+ kW, the UPS will be the bottleneck.',
              incorrectFeedback: 'Incorrect. You cannot simply compare kW to kVA — they have different units. You must check against both the UPS\'s kW capacity (VA × PF = 18 kW) and kVA rating (20 kVA). Load VA = 16,000W ÷ 0.95 PF = 16,842 VA. Both 16 kW and 16,842 VA are within limits. Power factor always matters for UPS sizing.',
            },
            {
              id: 'pf-2',
              type: 'scenario',
              title: 'Scenario B: Three-Phase Load Imbalance',
              prompt: 'You measure phase currents on a three-phase 208V UPS output: Phase A = 45A, Phase B = 48A, Phase C = 22A. What is the concern and what should you do?',
              scenarioOptions: [
                { id: 'ok',      label: 'These currents are within normal range for 208V three-phase — no action needed' },
                { id: 'imbal',   label: 'Phase C is carrying roughly half the current of A and B. This significant imbalance (>5% difference) causes excess neutral current and may indicate a tripped branch breaker or uneven load distribution. Document and report to site management for load rebalancing.', sublabel: 'Correct — >15A difference is significant imbalance' },
                { id: 'replace', label: 'Replace the UPS — this imbalance means the unit is failing' },
                { id: 'batt',    label: 'Check the battery — phase imbalance often indicates battery degradation' },
              ],
              correctScenario: 'imbal',
              hint: 'Balanced three-phase means all three phases carry roughly equal current. A 26A difference between phase C and the others is more than a minor variation.',
              correctFeedback: 'Correct. Phase C carrying 22A vs. A/B at 45–48A is a significant imbalance (~50% difference). This causes: elevated neutral current (proportional to the imbalance), increased thermal stress on A and B phases, and reduced efficiency. The most likely cause is uneven load distribution — PDUs or branch circuits are unevenly loaded between phases, or a phase C breaker has tripped. Document the readings and recommend load rebalancing. The UPS itself is likely fine.',
              incorrectFeedback: 'Incorrect. A 26A difference between phases represents significant imbalance. In a balanced three-phase system, currents should be within 5–10% of each other. Phase C at 22A vs. Phase A at 45A is a ~50% imbalance. This is not a UPS failure but a distribution/load balance problem that causes neutral current, overheating on the heavier phases, and reduced efficiency.',
            },
          ],
        },
        quiz: [
          { q: 'Power Factor is defined as:', a: ['Watts × VA', 'Watts / VA', 'VA / Watts', 'Amps × Volts'], correct: 1, exp: 'PF = Real Power (W) / Apparent Power (VA). Unity PF = 1.0 means 100% efficient use of apparent power.' },
          { q: 'A 10 kVA UPS with 0.8 power factor can deliver how many kilowatts of real power?', a: ['10 kW', '12.5 kW', '8 kW', '0.8 kW'], correct: 2, exp: 'Real power = VA × PF = 10,000 × 0.8 = 8,000W = 8 kW.' },
          { q: 'A unity power factor (PF = 1.0) means:', a: ['No current is drawn', 'All apparent power is converted to real power', 'The load is purely inductive', 'Current leads voltage by 90 degrees'], correct: 1, exp: 'PF = 1.0 means the current and voltage are perfectly in phase — all VA is doing real work (W = VA).' },
          { q: 'Three-phase AC uses how many conductors (not counting neutral/ground)?', a: ['1', '2', '3', '4'], correct: 2, exp: 'Three-phase uses 3 hot conductors, each 120 degrees out of phase, plus neutral and/or ground conductors.' },
          { q: 'In a 208V three-phase system, line-to-neutral voltage is:', a: ['208V', '120V', '277V', '480V'], correct: 1, exp: '208V ÷ √3 ≈ 120V. In a 208V three-phase system (delta-wye), line-to-neutral is 120V.' },
          { q: 'In a 480V three-phase system, line-to-neutral voltage is approximately:', a: ['120V', '208V', '240V', '277V'], correct: 3, exp: '480V ÷ √3 ≈ 277V line-to-neutral in a 480V system.' },
          { q: 'Unbalanced three-phase loads cause:', a: ['Lower output voltage', 'Excessive heating on the overloaded phase and neutral current', 'Improved efficiency', 'Reduced frequency'], correct: 1, exp: 'Imbalanced loads result in different currents per phase — the overloaded phase overheats and neutral current increases.' },
          { q: 'Why does low power factor increase current draw on a circuit?', a: ['Low PF increases resistance', 'Low PF means more current is needed to deliver the same real power', 'Low PF increases voltage', 'Low PF reduces frequency'], correct: 1, exp: 'Current × Voltage = VA. For fixed real power (W) at lower PF, you need more VA, which means more current for the same voltage.' },
          { q: 'Circuit breakers protect conductors based on:', a: ['Watts consumed', 'Power factor', 'Current (amps)', 'Voltage level'], correct: 2, exp: 'Breakers trip on current — they protect wiring from overheating due to excess current, regardless of power factor or watts.' },
          { q: 'A field technician should report significant phase imbalance because:', a: ['It improves UPS efficiency', 'It causes overheating of the loaded phase and stresses the system', 'It is required by OSHA', 'It improves power factor'], correct: 1, exp: 'Phase imbalance causes one phase to carry disproportionate current — leading to overheating and stress on UPS and distribution equipment.' },
        ],
      },
    ],
    test: [
      { q: 'DC is characterized by:', a: ['Alternating polarity at 60Hz', 'Constant direction and fixed polarity', 'Sinusoidal waveform', 'Zero current flow'], correct: 1, exp: 'DC flows in one direction with fixed polarity. It does not alternate.' },
      { q: 'The UPS rectifier converts:', a: ['DC to AC', 'AC to DC', 'Frequency up', 'Single-phase to three-phase'], correct: 1, exp: 'The rectifier converts AC input power to DC for the battery and internal DC bus.' },
      { q: 'US AC power frequency is:', a: ['50 Hz', '60 Hz', '120 Hz', '400 Hz'], correct: 1, exp: 'US standard AC power is at 60 Hz. Europe and most of the world use 50 Hz.' },
      { q: 'RMS voltage represents:', a: ['Peak voltage', 'Average voltage', 'DC-equivalent power-delivery voltage', 'Minimum voltage in a cycle'], correct: 2, exp: 'RMS voltage is the AC equivalent of DC voltage for power calculations.' },
      { q: '120V RMS AC has a peak voltage of approximately:', a: ['120V', '150V', '170V', '240V'], correct: 2, exp: 'Peak = 120 × √2 ≈ 169.7V ≈ 170V.' },
      { q: 'Power factor is defined as:', a: ['Watts × Amps', 'Watts / VA', 'VA / Watts', 'Volts / Ohms'], correct: 1, exp: 'PF = Real Power (W) / Apparent Power (VA).' },
      { q: 'In a 208V three-phase system, line-to-neutral voltage is:', a: ['208V', '120V', '277V', '480V'], correct: 1, exp: '208V ÷ √3 = 120V line-to-neutral.' },
      { q: 'What does the UPS inverter generate independently from the input grid?', a: ['Battery voltage', 'Output frequency', 'DC bus voltage', 'Rectifier output'], correct: 1, exp: 'The UPS inverter generates its output frequency internally, independent of the input grid frequency.' },
      { q: 'Capacitors on the UPS DC bus are used to:', a: ['Convert AC to DC', 'Filter DC ripple from rectification', 'Store battery energy', 'Power factor correction only'], correct: 1, exp: 'DC bus capacitors smooth the ripple superimposed on the DC bus by the rectification process.' },
      { q: 'Unbalanced three-phase loading causes:', a: ['Better efficiency', 'Overheating of the most loaded phase', 'Reduced frequency', 'Lower neutral current'], correct: 1, exp: 'Imbalanced phases cause unequal currents — the most loaded phase and its wiring can overheat.' },
    ],
  },

  {
    id: 'ohms-law-power',
    num: 5,
    title: "Ohm's Law and Power Formula",
    desc: "The two most fundamental equations in electrical work — V = IR and P = IV. Every calculation an FSE makes traces back to these.",
    slides: [
      {
        title: "Ohm's Law — V = IR",
        body: [
          "Ohm's Law: V = I × R (Voltage equals Current times Resistance). This single equation has three forms: V = I × R (find voltage), I = V / R (find current), R = V / I (find resistance). Every UPS measurement, every fuse rating, every wire sizing calculation traces back to this relationship.",
          "In the field: when you measure 48V DC bus and 12Ω load, you immediately know 4A flows (I = 48/12). When you see a 5A fuse protecting a 24V circuit, you know the load resistance must be at least 4.8Ω (R = 24/5). When a 2Ω cable run carries 20A, you know 40V drops across it (V = 20 × 2) — a significant and wasteful loss.",
          "Using the VIR triangle: draw a triangle with V on top, I on the bottom-left, R on the bottom-right. Cover the quantity you want to find. If you cover V, you see I × R. If you cover I, you see V/R. If you cover R, you see V/I.",
          "Limitations of Ohm's Law: it applies to resistive loads only. Capacitors and inductors have reactive impedance that varies with frequency. Non-linear loads like switching power supplies do not obey Ohm's Law linearly. In these cases, you use impedance (Z) instead of resistance, but the underlying principle is the same.",
        ],
        keyPoints: [
          "V = I × R (find voltage)", "I = V / R (find current)", "R = V / I (find resistance)",
          "Applies directly to resistive loads",
          "Use the VIR triangle to remember which formula to apply",
        ],
        quiz: [
          { q: "A 12V battery drives current through a 4Ω resistor. How much current flows?", a: ['3A', '4A', '12A', '48A'], correct: 0, exp: "I = V/R = 12/4 = 3A." },
          { q: "8A flows through a 5Ω resistor. What voltage is across it?", a: ['1.6V', '13V', '40V', '0.6V'], correct: 2, exp: "V = I × R = 8 × 5 = 40V." },
          { q: "48V DC is applied and 6A flows. What is the resistance?", a: ['0.125Ω', '8Ω', '288Ω', '42Ω'], correct: 1, exp: "R = V/I = 48/6 = 8Ω." },
          { q: "If voltage doubles and resistance stays the same, current:", a: ['Halves', 'Stays the same', 'Doubles', 'Quadruples'], correct: 2, exp: "I = V/R. Double V with fixed R → double I." },
          { q: "If resistance doubles and voltage stays the same, current:", a: ['Halves', 'Doubles', 'Stays the same', 'Quadruples'], correct: 0, exp: "I = V/R. Double R with fixed V → I is halved." },
          { q: "A 240V bus feeds a load through a cable with 0.5Ω resistance. The cable carries 20A. The voltage drop across the cable is:", a: ['10V', '20V', '240V', '0.5V'], correct: 0, exp: "V_drop = I × R_cable = 20 × 0.5 = 10V. The load sees 230V, not 240V." },
          { q: "A 3A fuse protects a 24V circuit. The minimum load resistance to prevent blowing the fuse is:", a: ['8Ω', '3Ω', '24Ω', '72Ω'], correct: 0, exp: "R = V/I_max = 24/3 = 8Ω. Below 8Ω, current exceeds 3A and blows the fuse." },
          { q: "What happens in a short circuit (R approaches zero)?", a: ['Current drops to zero', 'Voltage rises dramatically', 'Current rises toward infinity', 'Power stays constant'], correct: 2, exp: "I = V/R. As R→0, I→∞. This is why fuses and breakers exist." },
          { q: "The VIR triangle helps you:", a: ['Remember all three Ohm\'s Law rearrangements', 'Calculate power', 'Draw circuit diagrams', 'Measure resistance'], correct: 0, exp: "The VIR triangle is a memory tool: cover V to get I×R, cover I to get V/R, cover R to get V/I." },
          { q: "Ohm's Law applies directly to:", a: ['Capacitors', 'Inductors', 'Resistive loads', 'All loads equally'], correct: 2, exp: "Ohm's Law directly applies to resistive loads. Reactive components (capacitors, inductors) require impedance calculations." },
        ],
      },
      {
        title: 'Power Formula — P = IV',
        body: [
          "The power formula: P = I × V (power in watts = current × voltage). Power can also be expressed as P = I²R or P = V²/R — all three are equivalent when you use Ohm's Law. Watts (W) is the unit of real power. Kilowatts (kW = 1000W) is most common in UPS work.",
          "In a UPS system: a 100kVA UPS at 0.9 PF delivers 90kW of real power. Each kW of load draws about 4.2A at 240V single-phase (I = P/V = 1000/240). At 480V three-phase, 100kW load draws I = P/(V×√3) ≈ 120A. These calculations help you verify CT (current transformer) readings and understand load distribution.",
          "Power dissipation in resistors is waste — heat. A 1Ω wire resistance carrying 10A dissipates P = I²R = 100 × 1 = 100W as heat. This is why wire sizing and connection quality matter — every ohm of resistance in a current-carrying path wastes power and generates heat.",
          "Energy is power consumed over time: E = P × t, measured in watt-hours (Wh) or kilowatt-hours (kWh). Battery runtime calculations use this: a battery rated at 100Ah × 48V = 4800Wh theoretical energy. At 80% efficiency supporting a 2kW load: 4800 × 0.8 / 2000 = 1.92 hours of runtime.",
        ],
        keyPoints: [
          "P = I × V (basic power formula)",
          "P = I²R (power dissipated in a resistance)",
          "P = V²/R (power from voltage across a resistance)",
          "Energy = Power × Time (Wh or kWh)",
          "Resistive losses in wiring = heat = wasted power",
        ],
        quiz: [
          { q: "A circuit draws 10A at 120V. Power consumed is:", a: ['12W', '120W', '1200W', '12000W'], correct: 2, exp: "P = I × V = 10 × 120 = 1200W = 1.2kW." },
          { q: "P = I²R means that if current doubles in a resistor, power:", a: ['Doubles', 'Triples', 'Quadruples', 'Stays the same'], correct: 2, exp: "P = I²R. If I doubles, I² quadruples — power increases by 4×." },
          { q: "A 1Ω cable resistance carries 15A. How much power is wasted as heat?", a: ['15W', '225W', '1W', '150W'], correct: 1, exp: "P = I²R = 15² × 1 = 225 × 1 = 225W wasted as heat in the cable." },
          { q: "A 90kW load at 480V three-phase draws approximately how many amps per phase?", a: ['188A', '375A', '108A', '625A'], correct: 2, exp: "I = P/(V×√3) = 90,000/(480×1.732) ≈ 90,000/831 ≈ 108A." },
          { q: "Kilowatt-hours (kWh) measure:", a: ['Power at an instant', 'Energy consumed over time', 'Current flow rate', 'Voltage level'], correct: 1, exp: "kWh is a unit of energy — power (kW) multiplied by time (hours)." },
          { q: "A 48V × 100Ah battery has approximately how much stored energy?", a: ['4,800 Wh', '48 Wh', '100 Wh', '480 Wh'], correct: 0, exp: "Energy = V × Ah = 48 × 100 = 4,800 Wh = 4.8 kWh (theoretical maximum)." },
          { q: "Which formula finds power when you know voltage and resistance?", a: ['P = I×V', 'P = I²R', 'P = V²/R', 'P = V/I'], correct: 2, exp: "P = V²/R uses just voltage and resistance, without needing current." },
          { q: "Why is cable resistance important in large UPS installations?", a: ['It affects battery capacity', 'It wastes power as heat and causes voltage drop', 'It improves power factor', 'It reduces current'], correct: 1, exp: "Cable resistance causes P = I²R losses (heat) and V = I×R voltage drops — significant at high currents." },
          { q: "A 1000W load runs for 8 hours. Energy consumed:", a: ['1000 Wh', '8000 Wh = 8 kWh', '125 Wh', '8W'], correct: 1, exp: "E = P×t = 1000W × 8h = 8000Wh = 8kWh." },
          { q: "If a load draws 5A at 240V, the load resistance is:", a: ['48Ω', '1200Ω', '240Ω', '5Ω'], correct: 0, exp: "R = V/I = 240/5 = 48Ω." },
        ],
      },
      {
        title: "Applying Ohm's Law and Power Formulas in UPS Field Work",
        body: [
          "Field calculations you will perform routinely: (1) Verify battery string voltage — count cells, multiply by nominal cell voltage. 24 cells × 2V = 48V string. If measured is 47.5V, calculate per-cell average: 47.5/24 = 1.98V/cell (slight low but normal on discharge). (2) Estimate load current from nameplate watts and supply voltage. 5kW load at 208V single-phase: I = 5000/208 = 24A. Size cables and breakers for at least 24A × 1.25 NEC factor = 30A.",
          "Voltage drop in long cable runs: a 100-foot run of AWG 10 wire has resistance of about 0.1Ω (both conductors). At 20A, the drop is I×R = 20 × 0.1 = 2V. For a 120V supply, that's a 1.7% drop — usually acceptable. At 50A, drop = 5V — 4.2% — getting marginal. At 100A, the wire is undersized and dangerous.",
          "Heat dissipation calculations protect equipment. A power resistor rated 50W must not dissipate more than 50W. If it's across 100V, it draws P = V²/R = 10000/200 = 50W (if R=200Ω). If resistance drops to 100Ω due to a fault, P = 10000/100 = 100W — instantly overloaded.",
          "Always double-check nameplate data against actual field conditions. A UPS rated 80kVA at 0.8 PF delivers 64kW. If someone has connected 70kW of load, the UPS is overloaded by 9.4% — it may not trip immediately but will run hot and reduce component life. These calculations are part of every service visit.",
        ],
        keyPoints: [
          "Cell count × cell voltage = expected string voltage",
          "Load current = Load watts / Supply voltage",
          "Cable voltage drop = Current × Cable resistance",
          "Heat dissipated = V²/R or I²R — must be within component rating",
          "Always verify UPS load against nameplate kVA × PF",
        ],
        quiz: [
          { q: "A 48V battery string has 24 cells. Average cell voltage should be:", a: ['1V', '2V', '4V', '48V'], correct: 1, exp: "48V / 24 cells = 2V per cell. Lead-acid battery cells have a nominal voltage of 2V per cell." },
          { q: "A 3kW load at 240V draws approximately:", a: ['3A', '12.5A', '720A', '80A'], correct: 1, exp: "I = P/V = 3000/240 = 12.5A." },
          { q: "NEC requires conductors to be sized at 125% of continuous load. A 20A continuous load needs wire rated for at least:", a: ['20A', '25A', '16A', '30A'], correct: 1, exp: "20A × 1.25 = 25A minimum conductor rating per NEC code for continuous loads." },
          { q: "100 feet of AWG 10 wire (both conductors) has about 0.1Ω resistance. Carrying 30A, the voltage drop is:", a: ['0.3V', '3V', '30V', '0.1V'], correct: 1, exp: "V_drop = I × R = 30 × 0.1 = 3V across the cable run." },
          { q: "A 100kVA UPS at 0.9 PF delivers how many kW?", a: ['100 kW', '90 kW', '110 kW', '111 kW'], correct: 1, exp: "Real power = VA × PF = 100,000 × 0.9 = 90,000W = 90kW." },
          { q: "If a UPS is delivering 90kW but is rated for 80kW maximum, it is:", a: ['Operating normally', 'Operating at 88% efficiency', 'Overloaded by 12.5%', 'Operating at full capacity'], correct: 2, exp: "90kW / 80kW = 1.125 — it is overloaded by 12.5%. This will cause overheating and reduce component life." },
          { q: "You measure 47.5V on a 48V, 24-cell battery string. Average cell voltage is:", a: ['2.0V', '1.98V', '2.02V', '1.9V'], correct: 1, exp: "47.5 / 24 = 1.979V ≈ 1.98V per cell." },
          { q: "A 200Ω power resistor is connected across 100V. Power dissipated is:", a: ['2W', '20W', '50W', '200W'], correct: 2, exp: "P = V²/R = 10000/200 = 50W." },
          { q: "If the same resistor's resistance drops to 100Ω due to a fault, dissipated power becomes:", a: ['50W', '100W', '150W', '25W'], correct: 1, exp: "P = V²/R = 10000/100 = 100W — double its rating. It will overheat and fail." },
          { q: "During a service visit, which calculation helps you verify a UPS is not overloaded?", a: ['Battery string voltage check', 'Measuring ambient temperature', 'Total load kW vs. nameplate kVA × PF', 'Checking inverter output frequency'], correct: 2, exp: "Compare total connected load (kW) to the UPS nameplate kVA rating × power factor. If load > capacity, it is overloaded." },
        ],
      },
      {
        title: 'Test Equipment Selection',
        body: [
          'Field service engineers use three primary test instruments: the Digital Multimeter (DMM), the Clamp Meter, and the Insulation Resistance Tester (megohmmeter). Selecting the wrong tool gives invalid readings, damages equipment, or risks injury. Know which tool to use before reaching into your bag.',
          'The Digital Multimeter (DMM) is the most versatile: it measures AC/DC voltage, resistance, continuity, diode forward voltage, small inline current (up to 10A), frequency, and capacitance. A high-quality DMM (Fluke 87V, Klein MM700, Ideal 61-340) is your primary troubleshooting tool. For voltage and resistance, the meter is always connected IN PARALLEL with the component being measured.',
          'The Clamp Meter measures current by clamping around a single conductor and reading the magnetic field that current creates — no circuit interruption required. Essential for live, high-current circuits (30A, 100A, 400A+). Most clamp meters also measure AC voltage and resistance. Critical note: standard clamp meters only read AC current. DC clamp meters must include a Hall-effect sensor and be specifically selected for DC work.',
          'The Insulation Resistance Tester (megohmmeter, "Megger") applies a high DC test voltage (500V, 1000V, or 2500V) between a conductor and ground and measures the resulting leakage current to calculate insulation resistance in megaohms (MΩ). Good insulation shows hundreds or thousands of MΩ. Values below 1 MΩ indicate significant degradation. Critical for aged cables, battery interconnects, and transformer windings before re-energizing.',
        ],
        keyPoints: [
          'DMM: voltage, resistance, continuity, small inline current — most versatile daily tool',
          'Clamp meter: non-contact current measurement — no circuit interruption, safe on live cables',
          'Megger: high-voltage insulation resistance test (MΩ) — reveals breakdown not visible at low voltage',
          'Standard clamp meters only read AC current — verify Hall-effect sensor if DC current needed',
          'Selecting the wrong tool wastes time, gives invalid readings, or damages equipment',
        ],
        quiz: [
          { q: 'Which meter measures current without breaking the circuit?', a: ['DMM in inline ammeter mode', 'Clamp meter', 'Insulation resistance tester', 'Power quality analyzer'], correct: 1, exp: 'A clamp meter wraps around a single conductor and reads the magnetic field to calculate current — no circuit interruption.' },
          { q: 'An insulation resistance test applies a test voltage of:', a: ['1.5V (internal battery)', '9–12V (DMM levels)', '500–1000V (high voltage)', 'The operating line voltage'], correct: 2, exp: 'Insulation testers apply 500V, 1000V, or higher test voltage to stress insulation and reveal high-voltage breakdown.' },
          { q: 'Good cable insulation resistance should read:', a: ['Near 0 MΩ (low resistance is best)', 'Under 1 MΩ', 'Above 1 MΩ — typically hundreds of MΩ', 'Exactly 1 MΩ'], correct: 2, exp: 'Healthy insulation shows very high resistance (hundreds or thousands of MΩ). Values below 1 MΩ indicate serious degradation.' },
          { q: 'Standard inductive clamp meters can only measure:', a: ['DC current', 'AC current', 'Both AC and DC equally', 'Resistance and voltage only'], correct: 1, exp: 'Standard clamp meters use inductive sensing and only work with AC current. DC clamp meters require a Hall-effect sensor.' },
          { q: 'A DMM measures voltage and resistance with the meter connected in _____ with the component.', a: ['Series', 'Parallel', 'Ground bypass loop', 'Bypass mode'], correct: 1, exp: 'Voltage and resistance are measured with the meter IN PARALLEL across the component — touching both terminals simultaneously.' },
          { q: 'A DMM ammeter is connected in _____ with the load to measure current.', a: ['Parallel', 'Series (circuit must be broken to insert it)', 'Ground reference only', 'Bypass'], correct: 1, exp: 'Current measurement requires the DMM to be in SERIES — the circuit is broken and the meter inserted so all load current flows through it.' },
          { q: 'To check if a 15-year-old transformer winding has degraded insulation, use a:', a: ['DMM in Ω mode', 'Clamp meter', 'Insulation resistance tester (megger)', 'True-RMS power quality analyzer'], correct: 2, exp: 'Insulation degradation shows up only at high voltage — a DMM\'s 1.5V test current cannot detect breakdown that occurs at 240V+ operating voltage.' },
          { q: 'For UPS field service, the gold-standard DMM brand is:', a: ['RadioShack', 'Fluke', 'Harbor Freight', 'Craftsman'], correct: 1, exp: 'Fluke DMMs (especially the 87V) are the industry standard for quality, safety ratings (CAT III/IV), and measurement accuracy.' },
          { q: 'You need to verify 120V AC output from a UPS. The best tool is:', a: ['Clamp meter (voltage mode)', 'DMM in V AC mode', 'Insulation resistance tester', 'Either equally — just pick one'], correct: 1, exp: 'A DMM in V AC mode is the most precise and reliable for voltage measurements. Clamp meters can measure voltage but typically with less resolution.' },
          { q: 'MΩ on an insulation tester readout stands for:', a: ['Milli-ohms (thousandths)', 'Mega-ohms (millions of ohms)', 'Micro-ohms (millionths)', 'Milli-amperes'], correct: 1, exp: 'MΩ = megaohms = millions of ohms. Healthy insulation shows hundreds or thousands of MΩ. Capital M = mega (10^6).' },
        ],
        practical: {
          intro: 'Before taking any measurement, you must select the right instrument. The wrong choice wastes time, gives invalid readings, or can damage your meter. Work through these three field scenarios.',
          steps: [
            {
              id: 'tool-1',
              type: 'meter_select',
              title: 'Scenario A: Live 200A Cable Current Check',
              prompt: 'A UPS output cable carries approximately 200A. You need to verify the current matches the nameplate load. The circuit cannot be de-energized. Which tool do you use?',
              meters: [
                { id: 'dmm', label: 'Digital Multimeter', detail: 'Inline ammeter mode requires breaking the circuit to insert it in series — dangerous and impractical at 200A', icon: '🔢' },
                { id: 'clamp', label: 'Clamp Meter', detail: 'Clamps around one conductor — reads magnetic field without any circuit interruption — safe for live, high-current cables', icon: '🔄' },
                { id: 'megger', label: 'Insulation Tester (Megger)', detail: 'Applies 500V–2500V test voltage to measure insulation resistance — not designed to measure operating current', icon: '⚡' },
              ],
              correctMeter: 'clamp',
              hint: 'Which tool can measure current on a live circuit without breaking or disconnecting anything?',
              correctFeedback: 'Correct! A clamp meter clamps around a single conductor and reads the magnetic field produced by current flow. No disconnection — ideal for live, high-current cables. For accurate readings, clamp around ONE conductor only (not both in a cable bundle).',
              incorrectFeedback: 'Incorrect. A DMM ammeter requires breaking the 200A circuit to insert in series — extremely dangerous. A Megger applies high test voltage and is exclusively for insulation resistance tests, not operating current.',
            },
            {
              id: 'tool-2',
              type: 'meter_select',
              title: 'Scenario B: Aged Battery Cable Insulation',
              prompt: 'A 14-year-old 240V DC battery interconnect cable shows surface cracking on its jacket. Before re-energizing after maintenance, you need to verify the insulation has not broken down. Which tool?',
              meters: [
                { id: 'dmm', label: 'DMM (Ω mode)', detail: 'Resistance mode applies only 1.5V–9V internally. Cannot detect insulation that breaks down under operating voltage (240V)', icon: '🔢' },
                { id: 'clamp', label: 'Clamp Meter', detail: 'Measures AC/DC current and voltage — has no insulation testing function at high voltage', icon: '🔄' },
                { id: 'megger', label: 'Insulation Tester (Megger)', detail: 'Applies 500V, 1000V, or 2500V test voltage — detects insulation breakdown that only appears under high-voltage stress', icon: '⚡' },
              ],
              correctMeter: 'megger',
              hint: 'Insulation failure may only occur at the actual operating voltage — not at the 1.5V that a standard ohmmeter applies.',
              correctFeedback: 'Correct! Insulation resistance testing (megger test) applies high test voltage to reveal breakdown not detectable at low voltage. A 240V cable needs testing at 500V or 1000V to verify it will hold at operating conditions.',
              incorrectFeedback: 'A DMM in Ω mode applies only 1.5–9V — far too low to stress insulation rated for 240V. Degraded insulation may pass a low-voltage test and fail immediately when energized. Only a megger applies enough voltage to reveal the fault.',
            },
            {
              id: 'tool-3',
              type: 'meter_select',
              title: 'Scenario C: Reading 48V DC Battery String Voltage',
              prompt: 'You need to measure the voltage of a 48V DC UPS battery string during a routine inspection. Which tool is the best choice?',
              meters: [
                { id: 'dmm', label: 'Digital Multimeter (V mode)', detail: 'Measures AC and DC voltage with high precision — purpose-built for battery voltage checks', icon: '🔢' },
                { id: 'clamp', label: 'Clamp Meter (V mode)', detail: 'Can measure voltage, but most are optimized for current — less precise for DC voltage than a dedicated DMM', icon: '🔄' },
                { id: 'megger', label: 'Insulation Tester', detail: 'Not designed for voltage measurement — applies its own high voltage, which will damage the meter if connected to a battery', icon: '⚡' },
              ],
              correctMeter: 'dmm',
              hint: 'This is a straightforward DC voltage measurement — use the tool designed for precision voltage readings.',
              correctFeedback: 'Correct! A DMM in V DC mode is the go-to tool for battery voltage checks. Red probe to positive terminal, black to negative. The display shows true DC voltage with millivolt precision. Never use a megger for voltage measurement.',
              incorrectFeedback: 'While a clamp meter CAN measure voltage, the DMM is the preferred tool for precision DC readings. The megger is dangerous here — it applies its own high test voltage and must never be connected to an energized source like a battery.',
            },
          ],
        },
      },
      {
        title: 'Voltage Measurement — Mode and Lead Placement',
        body: [
          'Voltage measurement is the most common task in UPS field service. You measure battery strings, DC bus voltage, AC input, and output voltage multiple times per service call. Two critical decisions before you touch anything: (1) Is this AC or DC? Set the correct mode. (2) Are the leads in the right jacks?',
          'AC voltage mode (V~) is required for: utility input (120V, 208V, 240V, 480V), UPS output, bypass line, and any transformer secondary that feeds AC loads. DC voltage mode (V─) is required for: battery strings (12V, 24V, 48V, 240V), DC bus (240V, 400V DC), and all control circuit voltages. Using AC mode on a DC source (or vice versa) gives a reading of zero or nonsense values — not an error message.',
          'Lead placement rule that never changes for voltage and resistance: BLACK lead → COM jack, RED lead → VΩmA jack. The COM jack is the common return for all measurements. The VΩmA jack handles voltage (all ranges), resistance, and small current. The 10A jack is exclusively for current measurement and should never have a lead plugged in during voltage measurement.',
          'Range selection: auto-ranging DMMs (the standard today) automatically select the correct range when you connect. If using a manual-ranging meter, always start at the highest range and step down — connecting a 10V meter to 480V will destroy the meter immediately. On auto-range meters, simply select V AC or V DC, connect the probes, and read the stable value.',
        ],
        keyPoints: [
          'V AC (~) for utility, UPS output, bypass, and transformer secondary voltages',
          'V DC (─) for batteries, DC bus, and all direct current measurements',
          'For voltage AND resistance: BLACK → COM always, RED → VΩmA always',
          'Wrong AC/DC mode gives 0V reading — not an error, just silent wrong answer',
          '10A jack is ONLY for current — never plug red lead there for voltage',
        ],
        quiz: [
          { q: 'To measure 48V DC battery string voltage, set the meter to:', a: ['V AC (~)', 'V DC (─)', 'Ω resistance', 'A DC current'], correct: 1, exp: 'V DC mode for all direct current sources. Battery voltage is constant polarity DC — V AC mode would show 0V.' },
          { q: 'To measure 120V AC UPS output, set the meter to:', a: ['V DC (─)', 'V AC (~)', 'Ω resistance', 'A AC current'], correct: 1, exp: 'V AC mode for all alternating current. UPS output, utility input, and bypass feeds are all AC.' },
          { q: 'For all voltage measurements, the BLACK lead goes to:', a: ['VΩmA jack', 'COM jack', '10A jack', 'Any available jack'], correct: 1, exp: 'BLACK lead ALWAYS → COM jack for voltage and resistance. No exceptions.' },
          { q: 'For all voltage measurements, the RED lead goes to:', a: ['COM jack', 'VΩmA jack', '10A jack', 'Whichever is open'], correct: 1, exp: 'RED lead → VΩmA jack for all voltage and resistance measurements. Only moves to 10A for current measurement.' },
          { q: 'You set the meter to V DC and connect to a 120V AC source. The display shows:', a: ['120V (correct)', 'Double the AC voltage', 'Near 0V or unstable reading', 'Infinite resistance'], correct: 2, exp: 'V DC mode on an AC source shows near-zero or fluctuating values — it cannot detect alternating polarity. No error is generated, just a wrong reading.' },
          { q: 'The 10A input jack on a DMM is used only for:', a: ['Voltage measurements above 100V', 'Current measurements where red lead must be moved there', 'All resistance measurements', 'Auto-ranging mode'], correct: 1, exp: 'The 10A jack is exclusively for current (ammeter) measurements. Using it accidentally for voltage shorts the fuse and may destroy the meter.' },
          { q: 'An auto-ranging DMM in V AC mode connected to 208V three-phase should:', a: ['Require the user to manually select the 200V range', 'Display OL (over limit)', 'Automatically select the correct range and display ~208V', 'Show 120V line-to-neutral'], correct: 2, exp: 'Auto-ranging meters automatically step to the appropriate measurement range. Select mode, connect, and read.' },
          { q: 'Measuring DC bus voltage with red on the negative terminal gives:', a: ['Correct positive reading', 'A negative reading — probes are reversed', 'Damage to the meter', 'Zero volts'], correct: 1, exp: 'A negative DC reading means probes are reversed (red on –, black on +). Swap them for the correct positive reading.' },
          { q: 'Before measuring voltage at a live UPS terminal, which action is NOT a required safety step?', a: ['Verify meter is set to correct AC/DC mode', 'Confirm leads are in correct jacks', 'Turn off the UPS to de-energize before measuring voltage', 'Wear appropriate PPE for the voltage level'], correct: 2, exp: 'Voltage measurement is performed on live circuits — de-energizing defeats the purpose. Safe practice requires correct mode, correct leads, and appropriate PPE.' },
          { q: 'DC bus voltage in a large double-conversion UPS is typically:', a: ['12V DC', '48V DC', '120V DC', '240V to 400V DC'], correct: 3, exp: 'Large UPS systems commonly use 240V or 400V DC internal buses. The 400V DC bus matches the peak of European 230V AC for efficient transformerless inverter design.' },
        ],
        practical: {
          intro: 'Voltage measurement requires the right mode (AC vs DC) AND correct lead placement. Getting either wrong means a 0V reading with no error message. Practice these critical steps before your first service call.',
          steps: [
            {
              id: 'dial-ac',
              type: 'dial_select',
              title: 'Step 1: Measuring AC Output — Set the Dial',
              prompt: 'You are about to measure the output voltage of a UPS rated for 120V AC. The UPS is energized and running normally. Select the correct meter mode.',
              dialModes: [
                { id: 'vdc', label: 'V DC', symbol: '─' },
                { id: 'vac', label: 'V AC', symbol: '~' },
                { id: 'ohm', label: 'Resistance', symbol: 'Ω' },
                { id: 'aac', label: 'A AC (current)', symbol: '~A' },
                { id: 'adc', label: 'A DC (current)', symbol: '─A' },
                { id: 'hz', label: 'Frequency', symbol: 'Hz' },
              ],
              correctDial: 'vac',
              hint: 'UPS output is alternating current — the same type as a standard wall outlet.',
              correctFeedback: 'Correct! V AC (~) mode for all alternating current voltage. This covers UPS output, utility input, bypass feeds, and transformer secondaries. V DC mode would show 0V on this AC source.',
              incorrectFeedback: 'Incorrect. AC (alternating current) requires V AC (~) mode. V DC mode cannot detect alternating polarity and displays near-zero. Always match the measurement type: AC sources → V AC, DC sources → V DC.',
            },
            {
              id: 'leads-v',
              type: 'lead_placement',
              title: 'Step 2: Voltage Measurement — Connect the Leads',
              prompt: 'The meter is in V AC mode. Before touching any terminals, verify your lead placement. Where does each lead plug into the meter?',
              redOptions: [
                { id: 'com', label: 'COM', sublabel: 'Common / return for all measurements' },
                { id: 'voma', label: 'VΩmA', sublabel: 'Voltage, resistance, small current' },
                { id: 'ua', label: 'µA/mA', sublabel: 'Very small current only (< 200mA)' },
                { id: 'a10', label: '10A', sublabel: 'High current — fused, amps only' },
              ],
              blackOptions: [
                { id: 'com', label: 'COM', sublabel: 'Common / return for all measurements' },
                { id: 'voma', label: 'VΩmA', sublabel: 'Voltage, resistance, small current' },
                { id: 'ua', label: 'µA/mA', sublabel: 'Very small current only (< 200mA)' },
                { id: 'a10', label: '10A', sublabel: 'High current — fused, amps only' },
              ],
              correctRed: 'voma',
              correctBlack: 'com',
              hint: 'Black goes to the COMMON jack. Red goes to the jack labeled for voltage, ohms, and milliamps.',
              correctFeedback: 'Correct! BLACK → COM, RED → VΩmA for all voltage and resistance measurements. This lead placement never changes for V AC, V DC, or Ω mode. The 10A jack is only for current measurement.',
              incorrectFeedback: 'Incorrect lead placement. For ALL voltage and resistance measurements: BLACK → COM, RED → VΩmA. This is the universal setup. Only switch the red lead to 10A when switching to current (ammeter) mode.',
            },
            {
              id: 'dial-dc',
              type: 'dial_select',
              title: 'Step 3: Battery String Voltage — Set the Dial',
              prompt: 'Now you are moving to the battery cabinet to measure a 48V DC battery string. What mode do you set?',
              dialModes: [
                { id: 'vdc', label: 'V DC', symbol: '─' },
                { id: 'vac', label: 'V AC', symbol: '~' },
                { id: 'ohm', label: 'Resistance', symbol: 'Ω' },
                { id: 'aac', label: 'A AC (current)', symbol: '~A' },
                { id: 'adc', label: 'A DC (current)', symbol: '─A' },
                { id: 'hz', label: 'Frequency', symbol: 'Hz' },
              ],
              correctDial: 'vdc',
              hint: 'Batteries produce direct current with fixed polarity. They never alternate.',
              correctFeedback: 'Correct! V DC (─) mode for all battery and DC bus measurements. If the reading is negative, your probes are reversed — red on the negative terminal. Swap them for the correct positive reading.',
              incorrectFeedback: 'Incorrect. Batteries produce DC voltage — it never alternates. V AC mode would display near-zero on a DC battery string. Use V DC (─) for all battery, DC bus, and control circuit DC measurements.',
            },
          ],
        },
      },
      {
        title: 'Resistance and Current Measurement',
        body: [
          'Resistance measurement (ohmmeter mode, Ω) has one absolute rule: the circuit MUST be de-energized. The ohmmeter works by passing a small test current from its own internal battery through the component and measuring the response. Any external voltage from a live circuit overrides this — the meter displays garbage values and the input circuit can be destroyed instantly.',
          'To measure resistance safely: (1) De-energize and isolate the circuit — open all breakers, disconnect at both ends if possible. (2) Discharge any capacitors (discharge time varies — check the service manual). (3) Set meter to Ω. (4) Connect RED → VΩmA, BLACK → COM — same jacks as voltage. (5) Touch probes to both ends of the component. (6) Read the stable value. OL (over limit / overload) means open circuit. Near 0Ω means short circuit.',
          'Current measurement with a DMM (inline ammeter mode) requires breaking the circuit to insert the meter in series. The critical detail: before switching to current mode, you MUST move the red lead from VΩmA to the 10A jack (for currents up to 10A). The VΩmA jack has a small internal fuse — typically 200mA to 500mA. Connecting a circuit with more than that current to VΩmA instantly blows the fuse. Many technicians leave the meter unusable by forgetting to switch jacks.',
          'Clamp meters bypass the inline series problem — clamp the jaws around ONE conductor only. Clamping around both conductors (hot and neutral together) cancels the magnetic fields and gives a reading of zero. Standard inductive clamp meters only measure AC current. For DC current (battery charger output, DC distribution), verify your clamp meter specifically supports DC measurement with a Hall-effect sensor.',
        ],
        keyPoints: [
          'NEVER measure resistance (Ω) on a live circuit — external voltage destroys the meter',
          'Resistance uses same jacks as voltage: RED → VΩmA, BLACK → COM',
          'OL in Ω mode = open circuit; near 0Ω = short circuit',
          'Current (inline): RED must move to 10A jack — VΩmA fuse blows at 200–500mA',
          'Clamp meter: clamp around ONE conductor only — two conductors cancel to zero',
        ],
        quiz: [
          { q: 'Before measuring resistance (Ω) of a component, you MUST first:', a: ['Set the highest resistance range', 'De-energize and isolate the circuit completely', 'Move the red lead to the 10A jack', 'Set the meter to V AC mode first'], correct: 1, exp: 'CRITICAL: The circuit must be dead before Ω measurement. The ohmmeter applies its own test voltage — external voltage from a live circuit destroys the meter and gives wrong readings.' },
          { q: 'Why can you NOT measure resistance on a live circuit?', a: ['The circuit changes resistance when energized', 'Ohmmeter applies its own test voltage — external voltage conflicts, gives false readings and damages the meter', 'Resistance is only relevant when de-energized', 'You actually can — this is a myth'], correct: 1, exp: 'The ohmmeter uses its own internal battery (1.5V–9V) to push test current. Adding external voltage to this creates an unpredictable conflict that destroys the measurement circuit.' },
          { q: 'A resistance measurement shows "OL" (or ∞). This means:', a: ['The circuit is shorted (zero resistance)', 'Normal resistance within range', 'Open circuit — resistance is infinite (broken path)', 'The internal battery is dead'], correct: 2, exp: 'OL = over limit = infinite resistance = open circuit. The current path is broken — wire disconnected, fuse blown, contact failed open.' },
          { q: 'For inline DC current measurement (up to 8A), the RED lead goes to:', a: ['VΩmA jack (same as voltage)', 'COM jack', '10A jack (different from voltage mode!)', 'Ground terminal'], correct: 2, exp: 'Current measurement: RED → 10A jack — NOT VΩmA. This is the most important lead placement distinction to memorize.' },
          { q: 'You forget to move the red lead from VΩmA to 10A before measuring 5A current. What happens?', a: ['Meter reads half the correct current', 'Nothing — VΩmA works for any measurement', 'The internal fuse blows — meter shows no reading', 'Meter reads twice the actual current'], correct: 2, exp: 'The VΩmA jack has a tiny fuse (200mA–500mA). Connecting 5A through it destroys the fuse immediately. Meter shows blank or zero until fuse is replaced.' },
          { q: 'Continuity mode (beeper) activates when resistance is:', a: ['Above 1000Ω', 'Above 100Ω', 'Below a low threshold (good connection)', 'Exactly 0Ω'], correct: 2, exp: 'Continuity beeps when resistance is below the threshold (typically 30–50Ω). Beep = good connection. No beep = open circuit.' },
          { q: 'To check if a fuse is blown, you should use:', a: ['V AC mode on a live circuit', 'Ω or continuity mode — circuit must be de-energized', 'A DC current mode', 'Hz frequency mode'], correct: 1, exp: 'Test fuses with Ω or continuity on a de-energized circuit. Good fuse: near 0Ω, beeps. Blown fuse: OL, no beep. Never test fuses in-circuit on a live supply.' },
          { q: 'When clamping a clamp meter around a 2-conductor cable (hot + neutral together), the reading shows:', a: ['The sum of both currents', 'The correct load current', 'Near zero — the magnetic fields cancel', 'Double the load current'], correct: 2, exp: 'Current flows out on one conductor and back on the other — the equal and opposite magnetic fields cancel inside the clamp. Always clamp ONE conductor only.' },
          { q: 'Standard inductive clamp meters cannot measure DC current because:', a: ['DC is too slow for the clamp electronics', 'DC creates a constant (non-alternating) magnetic field that standard inductive jaws cannot sense', 'DC current is always too large for clamp meters', 'DMMs are required for all DC measurements'], correct: 1, exp: 'Inductive clamp meters detect the alternating magnetic field of AC current. DC creates a constant field — no induction occurs. DC clamp meters use a Hall-effect sensor to detect constant magnetic fields.' },
          { q: 'The correct procedure for inline current measurement with a DMM is:', a: ['Set A mode → connect in parallel → read', 'Move red to 10A → set A mode → break circuit → insert in series → read', 'Leave red in VΩmA → set A mode → connect → read', 'Use V mode with a known shunt resistor only'], correct: 1, exp: 'Sequence: (1) Move red lead to 10A jack. (2) Set mode to A (AC or DC). (3) Break the circuit at a safe point. (4) Insert meter in series. (5) Re-energize and read.' },
        ],
        practical: {
          intro: 'Resistance and current measurement have distinct safety rules and different lead placements. A wrong choice can blow an internal fuse, destroy the meter, or injure you. Practice the critical decisions here.',
          steps: [
            {
              id: 'hot-dead',
              type: 'scenario',
              title: 'Safety Check: Hot or Dead Circuit?',
              prompt: 'You need to measure the contact resistance of a battery disconnect switch. You have your meter set to Ω (resistance). What must be true before connecting?',
              scenarioOptions: [
                { id: 'live-ok', label: 'Circuit can be live — resistance mode handles it automatically' },
                { id: 'dead', label: 'Circuit MUST be de-energized (dead) — never measure resistance on live circuits' },
                { id: 'one-lead', label: 'Disconnect only one end of the switch — the other can stay connected to live' },
                { id: 'low-v', label: 'Only needs to be dead if the voltage is above 100V' },
              ],
              correctScenario: 'dead',
              hint: 'Remember: an ohmmeter applies its OWN test voltage to measure resistance. What happens if the circuit also has external voltage on it?',
              correctFeedback: 'Correct! ALWAYS de-energize before measuring resistance. The ohmmeter applies its own small test voltage (internal battery). External circuit voltage on top of this gives completely false readings and can destroy the meter input stage in milliseconds.',
              incorrectFeedback: 'DANGEROUS. The ohmmeter applies its own test voltage to measure resistance. If the circuit is live, you have two voltage sources in conflict — the reading is meaningless AND the external voltage can destroy the meter input. The circuit MUST be dead.',
            },
            {
              id: 'leads-ohm',
              type: 'lead_placement',
              title: 'Resistance Measurement Lead Placement',
              prompt: 'Circuit is now de-energized. Meter is set to Ω. Where do the leads plug in to measure resistance?',
              redOptions: [
                { id: 'com', label: 'COM', sublabel: 'Common / return' },
                { id: 'voma', label: 'VΩmA', sublabel: 'Voltage, ohms, milliamps' },
                { id: 'a10', label: '10A', sublabel: 'High current input only' },
              ],
              blackOptions: [
                { id: 'com', label: 'COM', sublabel: 'Common / return' },
                { id: 'voma', label: 'VΩmA', sublabel: 'Voltage, ohms, milliamps' },
                { id: 'a10', label: '10A', sublabel: 'High current input only' },
              ],
              correctRed: 'voma',
              correctBlack: 'com',
              hint: 'Resistance uses the same lead jacks as voltage measurement.',
              correctFeedback: 'Correct! Resistance measurement: RED → VΩmA, BLACK → COM — same as voltage. The VΩmA jack handles all non-current measurements (voltage AC, voltage DC, resistance, continuity, diode, frequency).',
              incorrectFeedback: 'Resistance uses the same jacks as voltage: RED → VΩmA, BLACK → COM. The VΩmA jack is the universal measurement input. Only move the red lead to 10A for current (ammeter) mode.',
            },
            {
              id: 'leads-amps',
              type: 'lead_placement',
              title: 'Current Measurement — Lead Placement (Different from Voltage!)',
              prompt: 'The circuit is re-energized. You need to measure 7A DC battery charger output current inline. IMPORTANT: lead placement changes for current. Where do the leads plug in?',
              redOptions: [
                { id: 'com', label: 'COM', sublabel: 'Common / return' },
                { id: 'voma', label: 'VΩmA', sublabel: 'Voltage, ohms — fused at ~200mA, WILL BLOW for 7A' },
                { id: 'a10', label: '10A', sublabel: 'Current up to 10A — correct for ammeter mode' },
              ],
              blackOptions: [
                { id: 'com', label: 'COM', sublabel: 'Common / return' },
                { id: 'voma', label: 'VΩmA', sublabel: 'Voltage, ohms — not for current' },
                { id: 'a10', label: '10A', sublabel: 'Current up to 10A' },
              ],
              correctRed: 'a10',
              correctBlack: 'com',
              hint: 'Current measurement uses a DIFFERENT red jack than voltage and resistance. Look at which jack is labeled for amps.',
              correctFeedback: 'Correct! For current measurement: RED → 10A jack, BLACK → COM. This is the critical difference from voltage/resistance mode. The 10A jack bypasses the small fuse in VΩmA. Forgetting to switch blows the internal fuse and disables the meter.',
              incorrectFeedback: 'IMPORTANT: For current, RED MUST go to the 10A jack — NOT VΩmA! The VΩmA input is fused at only 200mA–500mA. Plugging 7A through it blows the fuse instantly and renders the meter inoperative. RED → 10A, BLACK → COM for all ammeter (current) measurements.',
            },
            {
              id: 'clamp-placement',
              type: 'scenario',
              title: 'Clamp Meter Technique',
              prompt: 'You are using a clamp meter on a 2-wire power cable (hot + neutral together in a rubber jacket). You clamp the jaws around the entire cable. The meter reads 0.0A but you know there is load current. What went wrong?',
              scenarioOptions: [
                { id: 'dead-battery', label: 'The clamp meter battery is dead — replace it' },
                { id: 'both-conductors', label: 'Clamping around both conductors (hot + neutral) cancels the magnetic fields — must clamp ONE conductor only' },
                { id: 'dc-current', label: 'Standard clamp meters cannot read DC current — but this is AC so that is not the issue' },
                { id: 'wrong-mode', label: 'The meter is in voltage mode, not current mode' },
              ],
              correctScenario: 'both-conductors',
              hint: 'Current flows OUT on one conductor and returns on the other. Think about what that means for the magnetic fields inside the clamp.',
              correctFeedback: 'Correct! Current flows out on hot (+) and returns on neutral (–). These equal and opposite currents create equal and opposite magnetic fields that cancel inside the clamp, giving 0A. ALWAYS clamp around ONE conductor only — separate the conductors if needed.',
              incorrectFeedback: 'The issue is clamping both conductors simultaneously. The outgoing and returning currents create equal and opposite magnetic fields that cancel inside the clamp — perfect cancellation gives 0A reading. Always separate conductors and clamp around ONE wire only.',
            },
          ],
        },
      },
    ],
    test: [
      { q: "A 24V source drives current through a 8Ω resistor. Current = ?", a: ['0.33A', '3A', '8A', '192A'], correct: 1, exp: "I = V/R = 24/8 = 3A." },
      { q: "5A flows through a 12Ω resistor. Voltage across it = ?", a: ['2.4V', '17V', '60V', '600V'], correct: 2, exp: "V = I × R = 5 × 12 = 60V." },
      { q: "P = I²R means if current triples, power:", a: ['Triples', 'Increases 6×', 'Increases 9×', 'Doubles'], correct: 2, exp: "P = I²R. Triple I → I² increases by 9×." },
      { q: "A 2kW load at 120V draws:", a: ['16.7A', '60A', '240kA', '0.06A'], correct: 0, exp: "I = P/V = 2000/120 = 16.7A." },
      { q: "A 48V, 100Ah battery stores approximately:", a: ['148 Wh', '480 Wh', '4800 Wh', '10000 Wh'], correct: 2, exp: "Energy = V × Ah = 48 × 100 = 4800 Wh = 4.8 kWh." },
      { q: "A short circuit (R ≈ 0) causes current to:", a: ['Drop to zero', 'Rise toward infinity', 'Stay the same', 'Oscillate'], correct: 1, exp: "I = V/R. As R approaches zero, I approaches infinity — this is why overcurrent protection is essential." },
      { q: "80kVA at 0.9 PF delivers how many kW?", a: ['80 kW', '72 kW', '89 kW', '90 kW'], correct: 1, exp: "Real power = 80,000 × 0.9 = 72,000W = 72kW." },
      { q: "Voltage drop on a cable carrying 25A through 0.2Ω resistance:", a: ['5V', '0.2V', '25V', '2V'], correct: 0, exp: "V = I × R = 25 × 0.2 = 5V drop across the cable." },
      { q: "A 48-cell string at nominal 2V/cell should measure:", a: ['24V', '48V', '96V', '2V'], correct: 2, exp: "48 cells × 2V = 96V. This is a 96V DC string." },
      { q: "NEC 125% factor for continuous loads means a 40A continuous circuit needs conductors rated:", a: ['32A', '40A', '50A', '60A'], correct: 2, exp: "40A × 1.25 = 50A minimum conductor rating." },
    ],
  },

  {
    id: 'scientific-notation',
    num: 6,
    title: 'Scientific Notation and Powers of 10',
    desc: 'Reading and writing electrical quantities using scientific notation and SI prefixes — milliamps, kilowatts, megahertz — used daily in UPS field service.',
    slides: [
      {
        title: 'Scientific Notation Fundamentals',
        body: [
          'Scientific notation expresses very large or very small numbers as a coefficient times a power of 10. Format: M × 10^N, where M is a number between 1 and 10, and N is the exponent. Examples: 47,000 = 4.7 × 10^4. 0.00025 = 2.5 × 10^-4.',
          'In electrical work, you encounter a vast range of magnitudes — from picofarads (0.000000000001 F) to megawatts (1,000,000 W). Scientific notation makes these manageable. A 0.47 µF capacitor = 4.7 × 10^-7 F. A 480kW UPS = 4.8 × 10^5 W.',
          'Multiplying powers of 10: add the exponents. (2 × 10^3) × (3 × 10^2) = 6 × 10^5. Dividing powers of 10: subtract the exponents. (8 × 10^6) ÷ (4 × 10^3) = 2 × 10^3.',
          'Converting to/from standard notation: positive exponent → move decimal right (larger number). Negative exponent → move decimal left (smaller number). 3.5 × 10^3 = 3,500. 3.5 × 10^-3 = 0.0035.',
        ],
        keyPoints: [
          'Scientific notation: M × 10^N where 1 ≤ M < 10',
          'Positive exponent = large number (move decimal right)',
          'Negative exponent = small number (move decimal left)',
          'Multiply: add exponents; Divide: subtract exponents',
          'Used to express electrical quantities from pF to MW',
        ],
        quiz: [
          { q: '47,000 in scientific notation is:', a: ['47 × 10^3', '4.7 × 10^4', '4.7 × 10^3', '0.47 × 10^5'], correct: 1, exp: '47,000 = 4.7 × 10^4 (move decimal 4 places left to get coefficient between 1 and 10).' },
          { q: '0.00025 in scientific notation is:', a: ['2.5 × 10^4', '25 × 10^-5', '2.5 × 10^-4', '0.25 × 10^-3'], correct: 2, exp: '0.00025 = 2.5 × 10^-4 (coefficient 2.5, move decimal 4 places right to restore original).' },
          { q: '(3 × 10^4) × (2 × 10^3) = ?', a: ['5 × 10^7', '6 × 10^7', '6 × 10^12', '6 × 10^1'], correct: 1, exp: '3×2=6, 10^4 × 10^3 = 10^(4+3) = 10^7. Result: 6 × 10^7.' },
          { q: '(9 × 10^6) ÷ (3 × 10^2) = ?', a: ['3 × 10^4', '3 × 10^3', '3 × 10^8', '6 × 10^4'], correct: 0, exp: '9÷3=3, 10^6 ÷ 10^2 = 10^(6-2) = 10^4. Result: 3 × 10^4.' },
          { q: '5.2 × 10^3 in standard notation is:', a: ['0.0052', '52', '520', '5,200'], correct: 3, exp: '5.2 × 10^3 = 5,200 (move decimal 3 places right).' },
          { q: '3.8 × 10^-3 in standard notation is:', a: ['3800', '380', '0.038', '0.0038'], correct: 3, exp: '3.8 × 10^-3 = 0.0038 (move decimal 3 places left).' },
          { q: 'A 480kW UPS in scientific notation is:', a: ['4.8 × 10^3 W', '4.8 × 10^4 W', '4.8 × 10^5 W', '4.8 × 10^6 W'], correct: 2, exp: '480kW = 480,000W = 4.8 × 10^5 W.' },
          { q: 'A 0.00047 F capacitor in scientific notation is:', a: ['4.7 × 10^-3 F', '4.7 × 10^-4 F', '4.7 × 10^3 F', '47 × 10^-5 F'], correct: 1, exp: '0.00047 = 4.7 × 10^-4 F.' },
          { q: 'The correct form for scientific notation requires the coefficient (M) to be:', a: ['Any number', 'Between 1 and 10 (1 ≤ M < 10)', 'Between 0 and 1', 'A whole number only'], correct: 1, exp: 'In proper scientific notation, the coefficient must be at least 1 and less than 10.' },
          { q: '(5 × 10^-2) × (4 × 10^3) = ?', a: ['9 × 10^1', '20 × 10^1', '2 × 10^2', '2 × 10^1'], correct: 2, exp: '5×4=20, 10^(-2+3)=10^1. 20×10^1 = 2×10^2 (normalize coefficient).' },
        ],
      },
      {
        title: 'SI Prefixes in Electrical Work',
        body: [
          'SI prefixes replace powers of 10 with convenient single-letter abbreviations. The most important for electrical work: pico (p, 10^-12), nano (n, 10^-9), micro (µ, 10^-6), milli (m, 10^-3), kilo (k, 10^3), mega (M, 10^6), giga (G, 10^9).',
          'Common examples: 1 milliamp (1mA) = 0.001A = 1 × 10^-3 A. 1 kilowatt (1kW) = 1000W = 10^3 W. 1 microfarad (1µF) = 0.000001F = 10^-6 F. 1 megahertz (1MHz) = 1,000,000Hz = 10^6 Hz.',
          'In UPS work you constantly convert between prefixes: a 100µA control signal = 0.1mA = 0.0001A. A 22kΩ resistor = 22,000Ω. A 100mV signal = 0.1V. A 10kVA UPS = 10,000VA. Converting: multiply by the ratio of the two prefix values.',
          'Battery capacity is measured in ampere-hours (Ah) or milliampere-hours (mAh). A 100Ah battery supplies 100 amps for 1 hour (theoretically) or 50 amps for 2 hours, etc. Large UPS battery strings use multiple 100Ah to 500Ah jars connected in series and parallel.',
        ],
        keyPoints: [
          'milli (m) = 10^-3, micro (µ) = 10^-6, kilo (k) = 10^3, mega (M) = 10^6',
          '1 kW = 1000 W; 1 mA = 0.001 A; 1 µF = 0.000001 F',
          'Battery capacity in Ah (ampere-hours)',
          'Know how to convert between prefix levels',
          'Case matters: m = milli (10^-3), M = mega (10^6)',
        ],
        quiz: [
          { q: '1 kilowatt (kW) equals:', a: ['100 W', '1000 W', '10,000 W', '0.001 W'], correct: 1, exp: 'Kilo = 10^3. 1 kW = 1 × 10^3 W = 1000 W.' },
          { q: '1 milliamp (mA) equals:', a: ['1000 A', '0.1 A', '0.001 A', '10 A'], correct: 2, exp: 'Milli = 10^-3. 1 mA = 0.001 A.' },
          { q: '1 microfarad (µF) equals:', a: ['10^-3 F', '10^-6 F', '10^-9 F', '10^-12 F'], correct: 1, exp: 'Micro (µ) = 10^-6. 1 µF = 10^-6 F.' },
          { q: 'A 22kΩ resistor has a resistance of:', a: ['22 Ω', '220 Ω', '2,200 Ω', '22,000 Ω'], correct: 3, exp: 'Kilo = 10^3. 22 kΩ = 22 × 1000 = 22,000 Ω.' },
          { q: 'What prefix is abbreviated M (capital)?', a: ['Milli (10^-3)', 'Mega (10^6)', 'Micro (10^-6)', 'Milli (10^3)'], correct: 1, exp: 'Capital M = Mega (10^6). Lowercase m = milli (10^-3). Case matters!' },
          { q: '500mV expressed in volts is:', a: ['500 V', '5 V', '0.5 V', '0.05 V'], correct: 2, exp: 'Milli = 10^-3. 500 mV = 500 × 10^-3 V = 0.5 V.' },
          { q: 'A 100Ah battery can supply 50A for approximately how long?', a: ['50 hours', '100 hours', '2 hours', '0.5 hours'], correct: 2, exp: 'Ah ÷ A = hours of runtime. 100Ah ÷ 50A = 2 hours (theoretical, actual is less due to efficiency).' },
          { q: '0.047 µF in picofarads (pF) is:', a: ['47 pF', '470 pF', '4,700 pF', '47,000 pF'], correct: 3, exp: '1 µF = 10^6 pF. 0.047 µF = 0.047 × 10^6 pF = 47,000 pF.' },
          { q: 'A 10 kVA UPS expressed in VA is:', a: ['10 VA', '100 VA', '1,000 VA', '10,000 VA'], correct: 3, exp: 'Kilo = 1000. 10 kVA = 10 × 1000 = 10,000 VA.' },
          { q: 'Pico (p) prefix represents:', a: ['10^-3', '10^-6', '10^-9', '10^-12'], correct: 3, exp: 'Pico = 10^-12. Used for very small capacitances in high-frequency circuits.' },
        ],
      },
      {
        title: 'Converting Units in Electrical Calculations',
        body: [
          'Unit conversion is a critical daily skill for an FSE. When Ohm\'s Law says I = V/R, all values must be in compatible base units (amps, volts, ohms) or the math gives wrong answers. Convert all prefixed units to base units before calculating, then convert the result back to a convenient prefix.',
          'Example: A 4.7kΩ resistor with 15V across it. I = V/R = 15V / 4700Ω = 0.00319A = 3.19mA. Do NOT write 15/4.7 — that gives wrong units. Convert k to base (×1000) first.',
          'Power calculation with mixed units: P = I²R. If I = 25mA = 0.025A and R = 10kΩ = 10,000Ω: P = (0.025)² × 10,000 = 0.000625 × 10,000 = 6.25W. Alternatively, P = I²R = (2.5×10^-2)² × (10^4) = 6.25×10^-4 × 10^4 = 6.25W.',
          'Important unit pairs in UPS work: VA (volt-amperes for apparent power) vs. W (watts for real power). kWh (energy) vs. kW (power). Ah (battery capacity) vs. A (current). Always verify you are using the correct unit for the calculation at hand.',
        ],
        keyPoints: [
          'Convert all values to base units before applying formulas',
          'Convert result back to convenient prefix for readability',
          '4.7kΩ = 4700Ω; 25mA = 0.025A',
          'VA ≠ W (apparent vs. real power)',
          'kWh (energy) vs. kW (power) — different quantities',
        ],
        quiz: [
          { q: 'Before applying Ohm\'s Law, you should:', a: ['Use any prefix units directly', 'Convert all values to base units (A, V, Ω)', 'Convert everything to milliamps', 'Use kilo units throughout'], correct: 1, exp: 'All quantities must be in compatible base units (amps, volts, ohms) before applying Ohm\'s Law to get correct results.' },
          { q: 'I = V/R. V = 15V, R = 4.7kΩ. Current in milliamps is approximately:', a: ['3.19 mA', '31.9 mA', '319 mA', '0.319 mA'], correct: 0, exp: 'I = 15 / 4700 = 0.00319 A = 3.19 mA.' },
          { q: 'P = I²R. I = 25mA, R = 10kΩ. Power in watts:', a: ['62.5W', '6.25W', '0.625W', '625W'], correct: 1, exp: 'Convert: 25mA = 0.025A, 10kΩ = 10000Ω. P = (0.025)² × 10000 = 6.25W.' },
          { q: 'VA (volt-amperes) and W (watts) differ because:', a: ['They are the same unit', 'VA is apparent power; W is real power', 'W includes reactive power; VA does not', 'VA is used only for DC'], correct: 1, exp: 'VA = apparent power (V×I regardless of phase). W = real power (actual work done). Difference = power factor.' },
          { q: 'A UPS rated 20kVA at 0.8 PF delivers _____ kW:', a: ['20 kW', '16 kW', '25 kW', '10 kW'], correct: 1, exp: 'kW = kVA × PF = 20 × 0.8 = 16 kW.' },
          { q: 'Kilowatt-hours (kWh) measure:', a: ['Power output rate', 'Energy consumed over time', 'Current flow', 'Reactive power'], correct: 1, exp: 'kWh = energy. Power × time = energy. A 1kW load running 3 hours uses 3kWh.' },
          { q: '2200µF converted to millifarads (mF) is:', a: ['2.2 mF', '22 mF', '0.22 mF', '220 mF'], correct: 0, exp: '1 mF = 1000 µF. 2200 µF ÷ 1000 = 2.2 mF.' },
          { q: 'A circuit draws 250mA at 12V. Power consumed:', a: ['0.3 W', '3 W', '300 W', '30 W'], correct: 1, exp: 'P = I × V = 0.25A × 12V = 3W.' },
          { q: 'Battery capacity in Ah tells you:', a: ['Battery voltage', 'How much current it can supply for how long', 'Battery internal resistance', 'Number of cells'], correct: 1, exp: 'Ah = current (A) × time (hours). A 200Ah battery can supply 200A for 1 hour or 100A for 2 hours (theoretical).' },
          { q: 'V = 48V, R = 0.5Ω (cable). Current through cable and voltage drop:', a: ['I=96A, V_drop=48V', 'I=24A, V_drop=12V', 'I=96A, V_drop=24V (that\'s wrong — think again)', 'Cannot determine without power factor'], correct: 0, exp: 'I = V/R = 48/0.5 = 96A; V_drop = I×R = 96×0.5 = 48V — the entire voltage drops across the cable (a dead short across the battery!).' },
        ],
      },
    ],
    test: [
      { q: '5.6 × 10^4 in standard notation is:', a: ['56', '560', '5600', '56000'], correct: 3, exp: '5.6 × 10^4 = 56,000 (move decimal 4 places right).' },
      { q: '0.0033 in scientific notation is:', a: ['33 × 10^-4', '3.3 × 10^-3', '3.3 × 10^3', '0.33 × 10^-2'], correct: 1, exp: '0.0033 = 3.3 × 10^-3.' },
      { q: '1 milliamp = _____ amps:', a: ['1000 A', '0.1 A', '0.001 A', '10 A'], correct: 2, exp: 'Milli = 10^-3. 1 mA = 0.001 A.' },
      { q: 'Mega (M) represents:', a: ['10^3', '10^6', '10^9', '10^-6'], correct: 1, exp: 'Mega = 10^6. Capital M = Mega (10^6); lowercase m = milli (10^-3).' },
      { q: 'V = 24V, R = 2.2kΩ. Current in mA:', a: ['10.9 mA', '52.8 mA', '10.9 A', '1.09 mA'], correct: 0, exp: 'I = 24/2200 = 0.0109A = 10.9mA.' },
      { q: 'P = I²R. I = 50mA, R = 1kΩ. Power:', a: ['50W', '2.5W', '0.05W', '250W'], correct: 1, exp: '(0.05A)² × 1000Ω = 0.0025 × 1000 = 2.5W.' },
      { q: '10kVA at 0.9 PF = _____ kW:', a: ['10 kW', '11 kW', '9 kW', '0.9 kW'], correct: 2, exp: '10 × 0.9 = 9 kW.' },
      { q: 'A 100Ah battery at 25A discharge lasts approximately:', a: ['100 hours', '4 hours', '25 hours', '2500 hours'], correct: 1, exp: '100Ah / 25A = 4 hours (theoretical).' },
      { q: 'VA and W differ because:', a: ['They use different voltages', 'VA is apparent power; W is real power', 'W accounts for frequency; VA does not', 'They are identical for all loads'], correct: 1, exp: 'VA = apparent power (I×V). W = real power (actual work). Ratio = power factor.' },
      { q: '47 µF converted to nanofarads (nF) is:', a: ['0.047 nF', '47,000 nF', '4700 nF', '470 nF'], correct: 1, exp: '1 µF = 1000 nF. 47 µF = 47,000 nF.' },
    ],
  },
];

// Modules 7-24 will be added in subsequent data chunks
// The system reads MODULES array — append remaining modules to this array
