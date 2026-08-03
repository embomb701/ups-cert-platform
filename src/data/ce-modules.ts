import type { TrainingModule } from './modules';

export const CE_MODULES: TrainingModule[] = [
  {
    id: 'ce-what-is-critical-env',
    num: 1,
    title: 'What Is a Critical Environment?',
    desc: 'Definition, examples, uptime tiers, and why these facilities demand procedures that don\'t exist in ordinary commercial buildings.',
    slides: [
      {
        title: 'Defining Critical Environments',
        body: [
          'A critical environment is any facility where loss of power, cooling, or environmental control causes immediate harm to people, loss of irreplaceable data, or failure of life-safety systems. The consequences of failure are measured in lives, millions of dollars per hour, or national security.',
          'The most common critical environments you will enter as a field technician: data centers and server rooms, hospital ICUs and operating suites, telecom central offices and network operations centers, financial trading floors, water treatment facilities, and industrial control rooms.',
          'What separates a critical environment from a normal commercial building is not the presence of expensive equipment — it is the consequence of failure. A server in an office is expensive. The same server in an air traffic control center is a public safety system.',
          'Critical environments have written procedures for everything: who can enter, what tools are allowed, what work requires a change request, and what happens when something goes wrong. Ignoring these procedures can result in immediate removal from the site, termination of the service contract, and personal liability.',
        ],
        keyPoints: [
          'Critical environment = facility where failure causes immediate harm, massive financial loss, or safety system failure',
          'Common types: data centers, hospitals, telecom, financial, water treatment, industrial control',
          'The consequence of failure — not the cost of equipment — defines criticality',
          'Every critical site has written procedures; ignoring them has serious consequences',
        ],
        quiz: [
          {
            q: 'What primarily defines a "critical environment"?',
            a: ['The consequence of failure — harm, data loss, or life-safety system failure', 'The cost of the equipment installed in the facility', 'The physical size of the building', 'The number of employees who work there'],
            correct: 0,
            exp: 'Critical environments are defined by the consequence of failure — lives at risk, irreplaceable data, or life-safety systems going offline. Expensive equipment alone does not make an environment critical.',
          },
          {
            q: 'Which of the following is NOT typically considered a critical environment?',
            a: ['A retail clothing store with a server room', 'A hospital ICU with continuous patient monitoring', 'An air traffic control center', 'A telecom central office powering 911 services'],
            correct: 0,
            exp: 'A retail clothing store — even one with a server room — is not a critical environment because its failure does not cause immediate harm to people or public safety. The other three examples all have life-safety consequences.',
          },
          {
            q: 'A field technician ignores a site\'s entry procedures and enters without an escort. What is the most likely consequence?',
            a: ['Immediate removal from site and potential loss of the service contract', 'A verbal warning from the security guard', 'A note in their personnel file', 'No consequence if the work is completed successfully'],
            correct: 0,
            exp: 'Violating entry procedures in a critical environment typically results in immediate removal and can terminate the service contract between your company and the customer.',
          },
        ],
      },
      {
        title: 'Uptime Tiers and Why They Matter',
        body: [
          'The Uptime Institute defines four data center tiers that measure fault tolerance. Tier I offers 99.671% uptime — about 28.8 hours of downtime per year. Tier IV offers 99.9995% uptime — less than 27 minutes per year. Every procedure in a Tier IV facility exists to protect that number.',
          'Tier I: Basic. Single path for power and cooling. No redundancy. Annual downtime: ~28.8 hours. Typical example: a small server room in an office building.',
          'Tier II: Redundant Capacity. Redundant power and cooling components, but still a single distribution path. Annual downtime: ~22 hours.',
          'Tier III: Concurrently Maintainable. Multiple paths for power and cooling. Any single component can be maintained without shutting down. Annual downtime: ~1.6 hours. Most enterprise data centers.',
          'Tier IV: Fault Tolerant. Fully redundant, active paths. A single failure causes automatic failover with no service interruption. Annual downtime: ~26.3 minutes. Highest criticality.',
          'As a technician, knowing the tier tells you how much risk exists. In a Tier I facility, one mistake can take everything offline. In Tier IV, the system is designed to survive mistakes — but the procedures are also the strictest.',
        ],
        keyPoints: [
          'Tier I: single path, ~28.8 hrs downtime/yr',
          'Tier II: redundant components, single path',
          'Tier III: multiple paths, concurrently maintainable, ~1.6 hrs/yr',
          'Tier IV: fully fault tolerant, active redundancy, ~26 min/yr',
          'Higher tier = stricter procedures AND more protection against errors',
        ],
        quiz: [
          {
            q: 'Which data center tier allows any single component to be maintained without shutting down operations?',
            a: ['Tier III — Concurrently Maintainable', 'Tier I — Basic', 'Tier II — Redundant Capacity', 'Tier IV — Fault Tolerant'],
            correct: 0,
            exp: 'Tier III (Concurrently Maintainable) has multiple power and cooling paths so any single component can be taken offline for maintenance without affecting operations.',
          },
          {
            q: 'Approximately how much annual downtime does a Tier IV facility target?',
            a: ['Less than 27 minutes per year', 'Less than 2 hours per year', 'Less than 10 hours per year', 'Less than 28 hours per year'],
            correct: 0,
            exp: 'Tier IV targets 99.9995% uptime — approximately 26.3 minutes of downtime per year. This requires full redundancy with no single points of failure.',
          },
          {
            q: 'A Tier I facility has one UPS and one CRAC unit with no backup. A technician accidentally trips a breaker. What happens?',
            a: ['Everything on that circuit goes offline — no redundancy to absorb the fault', 'The redundant UPS takes over automatically', 'The generator starts and carries the load', 'Nothing — the Tier I design handles this'],
            correct: 0,
            exp: 'Tier I has no redundant paths. A tripped breaker in a Tier I facility takes everything on that circuit offline immediately.',
          },
        ],
      },
      {
        title: 'Who Works in Critical Environments — and What Is Expected',
        body: [
          'Critical environments are staffed and serviced by several overlapping groups: facility operations teams (NOC, data center operations), OEM service technicians (the role most of you are training for), third-party contractors (electrical, mechanical, low-voltage), and project teams during build-outs.',
          'OEM service technicians — the primary audience for this training — are on-site to service specific equipment. Your scope is the equipment you are contracted to maintain. You do not touch systems outside your scope, even to "help." Cross-contamination between systems is a common source of outages.',
          'Critical environments expect three things from every technician on site: (1) You know your scope and stay within it. (2) You communicate before you act. (3) You document everything before you leave.',
          'Site operations teams track every change in the data center. If you replaced a battery string, it goes in the change log. If you updated firmware, it goes in the change log. If you moved a cable to get better access and moved it back, it goes in the change log. Documentation is not optional.',
        ],
        keyPoints: [
          'OEM techs service specific equipment — do not touch systems outside your scope',
          'Communicate before you act — always inform the site lead what you are about to do',
          'Document everything: parts replaced, settings changed, firmware updated, even temporary moves',
          'Cross-contamination between systems (touching what you shouldn\'t) is a leading cause of outages',
        ],
        quiz: [
          {
            q: 'A technician notices a loose cable on a network switch while servicing a UPS. The switch is not in their scope. What should they do?',
            a: ['Inform the site lead and document the observation — do not touch the switch', 'Reseat the cable since it is a quick fix and they are already there', 'Ignore it — not their equipment, not their problem', 'Fix it and mention it when they get back to the office'],
            correct: 0,
            exp: 'You must stay within your scope. Touching equipment you are not contracted to service can cause outages and creates liability. The correct action is to inform the site lead and document what you observed.',
          },
          {
            q: 'Why is documentation required even for temporary actions like moving a cable and moving it back?',
            a: ['Site operations tracks every change; even temporary moves must be logged', 'Only permanent changes need to be documented', 'Documentation is only required if something goes wrong', 'Company policy requires it but site operations does not need it'],
            correct: 0,
            exp: 'Critical environment change management tracks every action — including temporary ones. If something goes wrong after your visit, the change log is how operations determines what changed.',
          },
        ],
      },
    ],
    test: [
      { q: 'What defines a critical environment?', a: ['The consequence of failure — harm, data loss, or life-safety failure', 'The number of servers installed', 'The age of the building', 'Whether it has 24/7 staffing'], correct: 0, exp: 'Critical environments are defined by the consequences of failure, not by equipment cost or facility age.' },
      { q: 'Which of the following is a critical environment?', a: ['Hospital ICU with continuous patient monitoring', 'A hotel lobby with a Wi-Fi router', 'A retail store backroom server', 'A home office with a UPS'], correct: 0, exp: 'A hospital ICU with continuous patient monitoring is a critical environment — failure directly affects patient safety.' },
      { q: 'Tier III data centers are best described as:', a: ['Concurrently maintainable with multiple power and cooling paths', 'Fault tolerant with fully active redundant paths', 'Basic single-path facilities', 'Redundant capacity with single distribution'], correct: 0, exp: 'Tier III is Concurrently Maintainable — components can be serviced without shutting down, but not fully fault tolerant.' },
      { q: 'A Tier IV facility targets approximately how much annual downtime?', a: ['Less than 27 minutes per year', 'Less than 2 hours per year', 'Less than 28 hours per year', 'Zero downtime is guaranteed'], correct: 0, exp: 'Tier IV targets 99.9995% uptime — approximately 26 minutes of downtime per year.' },
      { q: 'A technician enters a critical facility without following the entry procedure. The most likely result is:', a: ['Immediate removal from site and potential contract termination', 'A verbal warning', 'No consequence if the work is done correctly', 'A written warning on their first offense'], correct: 0, exp: 'Violating entry procedures in critical environments is treated very seriously and typically results in immediate removal.' },
      { q: 'An OEM technician notices a problem with a system outside their scope of work. The correct action is:', a: ['Inform the site lead and document the observation without touching the system', 'Fix it since they are already on site', 'Ignore it — not their equipment', 'Take photos and fix it next visit'], correct: 0, exp: 'Staying within scope is mandatory. Inform the site lead and document what you saw, but do not touch equipment outside your contract.' },
      { q: 'Why must even temporary cable moves be documented in a critical environment?', a: ['Site change logs track every action; documentation allows root cause analysis if problems arise', 'Only to satisfy company audit requirements', 'Temporary moves are not actually required to be documented', 'Because cables are expensive and must be tracked for inventory'], correct: 0, exp: 'Change logs exist so that if anything goes wrong after a technician visit, operations can trace exactly what was done.' },
      { q: 'Tier I facilities have approximately how much annual downtime?', a: ['28.8 hours per year', '1.6 hours per year', '26 minutes per year', '22 hours per year'], correct: 0, exp: 'Tier I (Basic) offers 99.671% uptime, corresponding to approximately 28.8 hours of downtime per year.' },
      { q: 'The three core expectations of every technician in a critical environment are:', a: ['Know your scope, communicate before acting, document everything', 'Work fast, minimize downtime, report to your manager', 'Stay quiet, follow instructions, leave no tools behind', 'Sign in, do the work, sign out'], correct: 0, exp: 'Critical environments expect: (1) staying within scope, (2) communicating before acting, (3) documenting all work.' },
      { q: 'Cross-contamination in critical environments refers to:', a: ['A technician touching systems outside their contracted scope, risking an outage', 'Biological contamination from poor hygiene in server rooms', 'Electrical interference between two power systems', 'Mixing different cable colors in a structured cabling installation'], correct: 0, exp: 'Cross-contamination means touching or interacting with systems outside your scope — a leading cause of outages caused by service technicians.' },
    ],
  },

  {
    id: 'ce-electrical-hazards',
    num: 2,
    title: 'Electrical Hazard Awareness',
    desc: 'Arc flash, shock, and electrocution basics — understanding the hazards before you work near energized equipment.',
    slides: [
      {
        title: 'Shock, Electrocution, and Voltage Thresholds',
        body: [
          'Electric shock occurs when current passes through the human body. Current — not voltage — is what kills. As little as 10 milliamps (mA) can cause involuntary muscle lock. 100 mA through the chest for one second is potentially fatal.',
          'Voltage matters because it drives current through body resistance. Wet skin resistance drops from 100,000 ohms (dry) to as low as 1,000 ohms. At 120V with 1,000 ohm resistance: I = 120/1000 = 120 mA — lethal.',
          'In critical environments you will encounter: 120V/240V branch circuits, 208V and 480V three-phase distribution, 48V DC telecom power (low voltage but high current), and potentially 12kV switchgear in larger facilities.',
          'The most dangerous characteristic of electrical hazards: the hazard is invisible. You cannot see voltage. You cannot feel current until it is too late. This is why procedures, PPE, and LOTO exist — not to slow you down, but because electricity gives no warning.',
        ],
        keyPoints: [
          'Current (mA) kills — 10 mA causes muscle lock, 100 mA can be lethal',
          'Voltage drives current through body resistance — wet skin dramatically lowers resistance',
          'Common voltages in critical environments: 120V, 208V, 480V AC; 48V DC; possibly 12kV',
          'Electricity is invisible — you cannot detect a hazard by looking at equipment',
        ],
        quiz: [
          {
            q: 'What is the primary factor that determines the severity of an electric shock?',
            a: ['The amount of current (milliamps) passing through the body', 'The voltage at the source', 'The duration of contact only', 'The type of PPE being worn'],
            correct: 0,
            exp: 'Current through the body causes the physiological harm. Voltage drives that current, but it is the milliamps flowing through the chest that cause ventricular fibrillation and death.',
          },
          {
            q: 'A technician\'s hands are wet. How does this affect the risk of working near a 120V circuit?',
            a: ['It dramatically increases risk — wet skin lowers body resistance and allows more current to flow', 'It has no effect — 120V is low voltage', 'It slightly increases risk but is generally safe', 'Wet skin actually protects because it is a better conductor and current flows around the body'],
            correct: 0,
            exp: 'Wet skin can drop body resistance from 100,000 ohms to 1,000 ohms. At 120V, this means current increases 100x — from a safe 1.2 mA to a potentially lethal 120 mA.',
          },
          {
            q: 'Why is it difficult to visually identify an electrical hazard?',
            a: ['Voltage is invisible — energized and de-energized equipment looks identical', 'Electrical equipment is always labeled with its voltage', 'High voltage equipment glows or buzzes audibly', 'The color of wiring always indicates voltage level'],
            correct: 0,
            exp: 'You cannot see voltage. Energized and de-energized equipment looks exactly the same. This is the core reason LOTO, testing before touching, and arc flash PPE are mandatory — not optional courtesy steps.',
          },
        ],
      },
      {
        title: 'Arc Flash: The Invisible Explosion',
        body: [
          'An arc flash is a sudden, violent release of energy caused by an unintended electrical arc between conductors. It produces a plasma fireball that can reach 35,000°F (four times the surface temperature of the sun), a pressure wave that throws people across rooms, and a sound blast that permanently damages hearing.',
          'Arc flash energy is measured in calories per square centimeter (cal/cm²). NFPA 70E defines PPE categories based on this incident energy level. Category 1 is the minimum (4 cal/cm²); Category 4 is the highest (40 cal/cm²). Second-degree burns begin at 1.2 cal/cm².',
          'Arc flash most commonly occurs when: a tool is dropped across conductors, dust or moisture tracks current between phases, cable insulation is damaged, or a switchgear door is opened on an energized bus without proper PPE.',
          'In critical environments, the most common arc flash risk points are: 480V switchgear and motor control centers (MCCs), 208V distribution panels, and battery strings during maintenance (battery banks can source thousands of amps at low voltage).',
        ],
        keyPoints: [
          'Arc flash = violent energy release — plasma at 35,000°F, pressure wave, and sound blast',
          'Incident energy measured in cal/cm²; second-degree burns start at 1.2 cal/cm²',
          'NFPA 70E PPE categories 1–4 based on incident energy level',
          'Common risk points: 480V switchgear, MCCs, distribution panels, battery banks',
        ],
        quiz: [
          {
            q: 'An arc flash plasma fireball can reach approximately what temperature?',
            a: ['35,000°F — four times the surface temperature of the sun', '1,000°F — similar to a propane torch', '5,000°F — similar to a welding arc', '700°F — similar to a conventional oven at maximum temperature'],
            correct: 0,
            exp: 'Arc flash plasma reaches approximately 35,000°F — four times the surface temperature of the sun. This is why arc flash PPE must be rated in cal/cm² for the specific hazard level.',
          },
          {
            q: 'At what incident energy level do second-degree burns begin?',
            a: ['1.2 cal/cm²', '4 cal/cm²', '8 cal/cm²', '40 cal/cm²'],
            correct: 0,
            exp: 'Second-degree burns begin at approximately 1.2 cal/cm². NFPA 70E Category 1 PPE provides protection to 4 cal/cm² — the minimum arc flash PPE rating.',
          },
          {
            q: 'Which of the following is a common cause of arc flash in critical environments?',
            a: ['A tool dropped across energized conductors in a panel', 'Operating equipment at less than its rated voltage', 'Using insulated tools when working near conductors', 'Maintaining safe approach boundaries'],
            correct: 0,
            exp: 'Dropping a tool across energized conductors is a common cause of arc flash. The tool bridges two conductors or a conductor and ground, causing an arc. Other common causes include damaged insulation, dust tracking, and improper panel work.',
          },
        ],
      },
      {
        title: 'Approach Boundaries and Safe Work Practices',
        body: [
          'NFPA 70E defines three approach boundaries around energized electrical conductors. The Limited Approach Boundary is the outer boundary — unqualified persons must stop here. The Restricted Approach Boundary requires proper PPE and specific training. The Arc Flash Boundary is the distance at which an arc flash would cause a curable second-degree burn (1.2 cal/cm²).',
          'As a field technician entering a critical environment, you are expected to know: (1) Where the energized equipment is and what voltage level it operates at. (2) Whether you have the training and PPE to work within those boundaries. (3) When to stop and call someone who does.',
          'Safe work practices in critical environments: assume everything is energized until tested; never use a tool that touches a conductor without verifying de-energization; close all panel doors and covers when not actively working; report any unusual sounds (buzzing, crackling) or smells (burning) immediately.',
          'The phrase "test before you touch" is the most important habit in electrical field service. A non-contact voltage tester (NCVT) takes two seconds to confirm de-energization. That two seconds can save your life.',
        ],
        keyPoints: [
          'Three NFPA 70E boundaries: Limited (outer), Restricted (PPE required), Arc Flash (1.2 cal/cm²)',
          'Know the voltage level before approaching; know whether you have the PPE and training',
          'Test before you touch — always verify de-energization before contact',
          'Report unusual sounds or smells immediately — do not investigate alone',
        ],
        quiz: [
          {
            q: 'The Arc Flash Boundary is defined as the distance at which:',
            a: ['An arc flash would cause a curable second-degree burn (1.2 cal/cm²)', 'An unqualified person must stop', 'PPE is required to proceed', 'All energized work is prohibited'],
            correct: 0,
            exp: 'The Arc Flash Boundary is calculated based on the distance at which incident energy is 1.2 cal/cm² — the threshold for a curable second-degree burn. Inside this boundary, arc flash PPE is required.',
          },
          {
            q: 'A technician hears buzzing and smells something burning near a distribution panel. What should they do?',
            a: ['Report it immediately to the site lead and do not investigate alone', 'Open the panel door to check for a loose connection', 'Ignore it if the panel\'s indicator lights look normal', 'Turn off the nearest circuit breaker to investigate'],
            correct: 0,
            exp: 'Buzzing and burning smells near electrical equipment are signs of a potential arc or arcing fault. Do not investigate alone or open the panel. Report to the site lead immediately.',
          },
          {
            q: 'Before touching a conductor that has been de-energized by switching off a breaker, a technician should:',
            a: ['Test for voltage with a non-contact voltage tester before any contact', 'Trust that the breaker correctly isolated the circuit', 'Wait 30 seconds for any stored energy to discharge', 'Put on insulated gloves and proceed'],
            correct: 0,
            exp: '"Test before you touch" is not optional. Breakers can fail to open, labels can be wrong, and parallel power sources may still energize the circuit. Always verify de-energization independently.',
          },
        ],
      },
    ],
    test: [
      { q: 'What current level can cause involuntary muscle lock during electric shock?', a: ['10 milliamps (mA)', '1 milliamp (mA)', '100 milliamps (mA)', '1 amp (A)'], correct: 0, exp: '10 mA causes involuntary muscle contraction — the "let-go threshold" is just below this. 100 mA through the chest is potentially lethal.' },
      { q: 'Wet skin lowers body resistance primarily because:', a: ['Moisture is a conductor that reduces the insulating layer of dry skin', 'Water absorbs electrical energy before it enters the body', 'Wet skin creates a ground path away from vital organs', 'There is no significant difference between wet and dry skin resistance'], correct: 0, exp: 'Dry skin resistance can exceed 100,000 ohms. Wet skin drops to 1,000 ohms — increasing current flow by a factor of 100 for the same voltage.' },
      { q: 'Arc flash plasma temperature is approximately:', a: ['35,000°F', '1,000°F', '5,000°F', '700°F'], correct: 0, exp: 'Arc flash plasma reaches approximately 35,000°F — four times the surface of the sun.' },
      { q: 'Second-degree burns from arc flash begin at what incident energy level?', a: ['1.2 cal/cm²', '4 cal/cm²', '8 cal/cm²', '40 cal/cm²'], correct: 0, exp: 'The second-degree burn threshold is 1.2 cal/cm² — this is why the Arc Flash Boundary is calculated at this level.' },
      { q: 'NFPA 70E PPE Category 1 provides protection up to:', a: ['4 cal/cm²', '1.2 cal/cm²', '8 cal/cm²', '25 cal/cm²'], correct: 0, exp: 'Category 1 is the minimum arc flash PPE rating, protecting to 4 cal/cm² of incident energy.' },
      { q: 'The most dangerous characteristic of electrical hazards is:', a: ['They are invisible — energized equipment looks identical to de-energized equipment', 'They produce a loud warning sound before discharging', 'They only occur at high voltage levels', 'They are easy to identify by the heat they produce'], correct: 0, exp: 'Electrical hazards give no visual warning. This is the fundamental reason for LOTO, testing before touching, and arc flash PPE.' },
      { q: 'Which of the following is a common arc flash trigger in critical environments?', a: ['A tool dropped across energized conductors', 'Operating equipment at rated voltage', 'Using rubber-insulated tools', 'Maintaining approach boundaries'], correct: 0, exp: 'Tools dropped across energized conductors are a common arc flash initiator. Other causes include damaged insulation, dust accumulation, and improper panel work.' },
      { q: 'The Arc Flash Boundary is the distance at which:', a: ['Incident energy equals 1.2 cal/cm² — the curable second-degree burn threshold', 'Unqualified persons must stop', 'PPE requirement begins', 'Energized work is completely prohibited'], correct: 0, exp: 'The Arc Flash Boundary is calculated to be where a person without arc flash PPE would receive a curable second-degree burn (1.2 cal/cm²).' },
      { q: '"Test before you touch" means:', a: ['Verify de-energization with a voltage tester before any contact, regardless of what the breaker position shows', 'Put on gloves before touching equipment', 'Ask the site lead if the circuit is safe before starting', 'Check the breaker label to confirm the correct circuit is off'], correct: 0, exp: 'Test before you touch means independently verifying de-energization with a meter or NCVT. Breaker positions and labels can be wrong.' },
      { q: 'A technician hears buzzing near an electrical panel. The correct action is:', a: ['Report immediately to the site lead — do not open the panel or investigate alone', 'Open the panel and inspect for a loose connection', 'Ignore it if the panel indicator lights are normal', 'Reset the nearest circuit breaker'], correct: 0, exp: 'Buzzing indicates potential arcing. Do not investigate alone or open the panel. Report immediately.' },
    ],
  },

  {
    id: 'ce-loto-basics',
    num: 3,
    title: 'Lockout / Tagout (LOTO) Basics',
    desc: 'The six-step de-energization procedure, why it exists, and when it applies to field technicians in critical facilities.',
    slides: [
      {
        title: 'Why LOTO Exists',
        body: [
          'Lockout/Tagout (LOTO) is OSHA\'s standard (29 CFR 1910.147) for controlling hazardous energy during service and maintenance. It exists because equipment can re-energize unexpectedly — someone flips a breaker while you are inside, a stored capacitor discharges, a spring-loaded mechanism releases.',
          'LOTO deaths are preventable. OSHA estimates LOTO compliance prevents approximately 120 fatalities and 50,000 injuries annually in the US. The standard is not bureaucratic paperwork — it is the difference between going home and not.',
          'Hazardous energy includes more than electricity: pneumatic pressure, hydraulic pressure, stored mechanical energy (springs, gravity), thermal energy, and chemical energy. In critical environments, electrical energy is the primary concern, but UPS systems also contain stored energy in capacitors and battery banks.',
          'A UPS system in bypass mode is particularly dangerous because the output bus remains fully energized from utility power even though the UPS inverter is "off." The bypass path feeds live voltage to points a technician might assume are isolated. Always trace the energy path, do not assume based on switch position.',
        ],
        keyPoints: [
          'LOTO (OSHA 29 CFR 1910.147) controls hazardous energy during service — prevents unexpected re-energization',
          'OSHA estimates LOTO compliance prevents ~120 deaths and 50,000 injuries annually',
          'Hazardous energy includes electrical, pneumatic, hydraulic, mechanical, and thermal sources',
          'UPS in bypass mode: output bus is still live from utility — do not assume isolation from switch position',
        ],
        quiz: [
          {
            q: 'LOTO is required because:',
            a: ['Equipment can re-energize unexpectedly — someone flips a breaker, stored energy discharges, or a remote start activates', 'OSHA requires paperwork for all maintenance activities', 'It is only required for high-voltage equipment above 480V', 'It slows down maintenance to ensure quality'],
            correct: 0,
            exp: 'LOTO exists specifically to prevent unexpected re-energization — from someone switching a breaker remotely, stored capacitor energy discharging, or automatic restart systems activating.',
          },
          {
            q: 'A UPS is placed in bypass mode before maintenance begins. Is the output bus de-energized?',
            a: ['No — in bypass mode, utility power energizes the output bus directly through the bypass path', 'Yes — bypass mode de-energizes the entire UPS output', 'Only if the input breaker is also opened', 'It depends on the brand of UPS'],
            correct: 0,
            exp: 'Bypass mode routes utility power directly to the output bus, bypassing the inverter. The output bus remains fully energized. A technician assuming bypass means safe-to-touch risks electrocution.',
          },
          {
            q: 'Which of the following is NOT a form of hazardous energy covered by LOTO?',
            a: ['Ambient temperature in a climate-controlled room (68°F)', 'Stored energy in a capacitor bank', 'Pneumatic pressure in an actuator', 'Gravity acting on a suspended load'],
            correct: 0,
            exp: 'Ambient room temperature (68°F) is not a hazardous energy source. LOTO covers stored electrical energy, pneumatic/hydraulic pressure, mechanical stored energy (springs, gravity), and thermal energy above ambient.',
          },
        ],
      },
      {
        title: 'The Six-Step LOTO Procedure',
        body: [
          'Step 1 — Identify all energy sources. Before anything else, identify every source of energy that feeds the equipment: utility power paths, UPS bypass paths, generator connections, battery systems, capacitor banks, and pneumatic lines.',
          'Step 2 — Notify affected employees. Anyone working in the area must know that the equipment will be de-energized. This prevents someone from re-energizing a circuit to "test something" while you are inside.',
          'Step 3 — De-energize the equipment. Shut down the equipment using the normal stopping procedure. Do not forcefully interrupt a live load if a controlled shutdown is possible.',
          'Step 4 — Isolate all energy sources. Open all isolating devices (breakers, disconnects, valves). A breaker in the OFF position is not sufficient alone — it must be physically locked.',
          'Step 5 — Apply lockout/tagout devices. Place your personal lock on every isolating device. The lock is yours — only you hold the key. Multiple workers each apply their own lock to a hasp.',
          'Step 6 — Verify isolation. Test the circuit with an appropriate meter to confirm zero energy. For electrical: test for voltage. For pneumatic: test for pressure. For capacitor banks: verify discharge time has elapsed and voltage reads zero.',
        ],
        keyPoints: [
          '1. Identify all energy sources',
          '2. Notify affected employees',
          '3. De-energize using normal shutdown',
          '4. Isolate all energy sources (open all disconnects)',
          '5. Apply YOUR personal lock — one lock per worker',
          '6. Verify isolation — test before touching',
        ],
        quiz: [
          {
            q: 'In Step 5 of LOTO, two technicians are working on the same panel. How many locks should be applied?',
            a: ['Two — each technician applies their own personal lock to the hasp', 'One — one lock per isolation point regardless of the number of workers', 'None — a tag alone is sufficient when multiple people are present', 'Three — one lock per energy source plus one for the supervisor'],
            correct: 0,
            exp: 'Each worker applies their own personal lock. The equipment cannot be re-energized until every worker removes their lock. Group lockout uses a hasp that accepts multiple locks.',
          },
          {
            q: 'After applying lockout devices, the next step is:',
            a: ['Verify isolation by testing for the absence of energy before touching anything', 'Begin maintenance — the locks confirm isolation', 'Have a supervisor confirm the locks are applied correctly', 'Wait 5 minutes for residual voltage to dissipate'],
            correct: 0,
            exp: 'Step 6 is verification — always test for zero energy with a meter before touching. Locks confirm that nobody will intentionally re-energize, but stored energy (capacitors, gravity, pressure) may still be present.',
          },
          {
            q: 'During Step 4 (isolate energy sources), opening the main breaker alone is:',
            a: ['Insufficient — the breaker must also be physically locked in the open position', 'Sufficient if a tag is also applied', 'Sufficient for voltages under 480V', 'The correct and complete isolation for most critical environment equipment'],
            correct: 0,
            exp: 'A breaker in the OFF position can be accidentally or intentionally turned back on. Physical lockout devices prevent this. LOTO requires both isolation AND physical lockout.',
          },
        ],
      },
      {
        title: 'LOTO in Critical Environments — Special Considerations',
        body: [
          'Critical environments add complexity to LOTO because equipment often has multiple energy paths. A data center UPS, for example, may be fed from two separate utility services, a bypass path, and a static bypass. All paths must be identified and isolated.',
          'Many critical facilities operate under a "Permit to Work" or "Change Management" system that must be approved before LOTO can begin. You cannot start LOTO until the work order is approved, the system is scheduled for maintenance, and the NOC is notified.',
          'A common mistake: locking out only the equipment breaker and ignoring the static bypass or maintenance bypass. If utility power feeds through the bypass while you are working on the output side, you are not protected.',
          'Re-energization is also a procedure. Before removing locks and restoring power: verify all personnel are clear, all tools are removed, guards are replaced, and every worker has removed their lock. Never remove another person\'s lock — this is an OSHA violation and can cause a fatality.',
        ],
        keyPoints: [
          'Multiple energy paths are common in critical environments — identify ALL of them before starting LOTO',
          'Permit to Work / Change Management approval is required before starting LOTO in most critical facilities',
          'Lock out EVERY path — static bypass, maintenance bypass, and utility feeds — not just the main breaker',
          'Never remove another person\'s lock — each worker removes their own at re-energization',
        ],
        quiz: [
          {
            q: 'A critical environment\'s UPS has a main input breaker, a static bypass, and a maintenance bypass. For LOTO, a technician should:',
            a: ['Isolate and lock all three paths — main input, static bypass, and maintenance bypass', 'Lock only the main input breaker — the bypasses are passive and not energy sources', 'Lock the main input breaker and apply a tag to the bypasses', 'Ask the site lead which breaker is the most important one'],
            correct: 0,
            exp: 'All energy paths must be isolated and locked. Static and maintenance bypass paths can carry live utility power to the output bus even when the main input is locked out.',
          },
          {
            q: 'A supervisor needs to restart equipment urgently but one technician\'s lock is still on the isolation point. The supervisor should:',
            a: ['Contact the technician and have them remove their own lock after verifying they are clear', 'Cut the lock — it is a work emergency', 'Remove the lock with a master key that supervisors carry for this purpose', 'Add their own lock and rekey the technician\'s lock remotely'],
            correct: 0,
            exp: 'Only the person who applied a lock may remove it. This is an absolute OSHA requirement. If a technician cannot be reached, there is a documented emergency procedure — but it is not simply cutting the lock.',
          },
          {
            q: 'In a critical facility, when can LOTO begin?',
            a: ['After the work order is approved, the maintenance window is scheduled, and the NOC is notified', 'Immediately when the technician arrives on site', 'As soon as the customer gives verbal authorization', 'Only during off-peak hours when no users are active'],
            correct: 0,
            exp: 'Critical facilities require Permit to Work or Change Management approval before any planned maintenance can begin, including LOTO. Spontaneous lockouts without notification can trigger alarms and emergency responses.',
          },
        ],
      },
    ],
    test: [
      { q: 'OSHA\'s LOTO standard is:', a: ['29 CFR 1910.147 — Control of Hazardous Energy', '29 CFR 1910.269 — Electric Power Generation', 'NFPA 70E — Electrical Safety in the Workplace', 'NFPA 110 — Emergency and Standby Power'], correct: 0, exp: 'LOTO is governed by OSHA 29 CFR 1910.147 — Control of Hazardous Energy.' },
      { q: 'Step 1 of the LOTO procedure is:', a: ['Identify all energy sources', 'Notify affected employees', 'De-energize the equipment', 'Apply lockout devices'], correct: 0, exp: 'You must identify every energy source before doing anything else — electrical feeds, bypass paths, battery systems, pneumatic lines, and stored energy.' },
      { q: 'A UPS in bypass mode:', a: ['Has a live output bus energized by utility power through the bypass path', 'Is fully de-energized and safe to touch', 'Has its output bus de-energized but input live', 'Is safe to work on if the inverter is off'], correct: 0, exp: 'Bypass mode routes live utility voltage directly to the output bus. The output is fully energized from utility power, independent of the inverter state.' },
      { q: 'Step 6 of LOTO requires:', a: ['Testing for zero energy with an appropriate meter before touching', 'Having a supervisor sign off on the lockout', 'Waiting 10 minutes after applying locks for energy to dissipate', 'Confirming with the NOC that power has been removed'], correct: 0, exp: 'Verification (Step 6) requires physically testing for the absence of hazardous energy using an appropriate instrument before any contact.' },
      { q: 'Two technicians are performing LOTO on the same panel. How many locks are required?', a: ['Two — one from each technician', 'One — only the lead technician\'s lock is required', 'Three — one per energy source', 'None — a tag per person is sufficient'], correct: 0, exp: 'Each worker applies their own personal lock. The equipment cannot be re-energized until all workers remove their individual locks.' },
      { q: 'A tag alone (without a lock) on an isolation point:', a: ['Does not prevent re-energization — only warns that lockout has been applied', 'Is equally effective as a lock for circuit protection', 'Is acceptable for equipment that cannot be locked', 'Is the required method for 120V circuits'], correct: 0, exp: 'A tag is a warning device only. It does not physically prevent re-energization. Physical lockout is required; tagout alone is only used when physical lockout is not possible.' },
      { q: 'Before beginning LOTO in a critical facility, a technician must:', a: ['Obtain Permit to Work / Change Management approval and notify the NOC', 'Simply inform the nearest available employee', 'Only notify their supervisor at their own company', 'Begin immediately to minimize equipment downtime'], correct: 0, exp: 'Critical facilities require formal change management approval before planned maintenance can begin.' },
      { q: 'Never remove another person\'s lock because:', a: ['Only the person who applied the lock knows they are clear — removing it could re-energize while they are still inside', 'It damages the lock mechanism', 'Company policy forbids it', 'It voids the equipment warranty'], correct: 0, exp: 'Each lock represents a person who may still be in a hazardous area. Removing someone else\'s lock can cause re-energization while they are still exposed.' },
      { q: 'For a UPS with a main input, static bypass, and maintenance bypass, LOTO requires:', a: ['All three paths isolated and locked', 'Only the main input locked', 'Main input locked; bypass paths tagged only', 'The path determined by the site lead'], correct: 0, exp: 'All energy paths must be isolated and locked. Any un-locked path can re-energize the equipment.' },
      { q: 'Re-energization after LOTO requires:', a: ['All personnel clear, all tools removed, guards replaced, and every worker\'s lock removed', 'Supervisor authorization only', 'Testing the equipment while workers are still at their positions', 'Removing locks and immediately restoring power'], correct: 0, exp: 'Re-energization is a procedure: verify all personnel are clear, remove all tools and guards, and each worker removes their own lock before power is restored.' },
    ],
  },

  {
    id: 'ce-environmental-controls',
    num: 4,
    title: 'Environmental Controls',
    desc: 'Temperature, humidity, airflow containment, and fire suppression systems — why they exist and what happens when they fail.',
    slides: [
      {
        title: 'Temperature and Humidity in Critical Facilities',
        body: [
          'Electronic equipment generates heat. Servers, UPS systems, battery banks, and power distribution units all convert a fraction of electrical energy to heat. If that heat cannot be removed, equipment shuts down on thermal protection — or fails permanently.',
          'ASHRAE TC 9.9 recommends inlet air temperature for servers at 64.4°F–80.6°F (18°C–27°C) and relative humidity between 20% and 80% non-condensing. Most critical facilities maintain stricter ranges: 68°F–75°F and 45%–55% RH.',
          'Humidity matters: too low and static electricity accumulates on components (ESD risk). Too high and condensation forms on cold components — water in a server rack is catastrophic. High humidity also corrodes electrical contacts over time.',
          'CRAC (Computer Room Air Conditioning) and CRAH (Computer Room Air Handler) units maintain these conditions. A failed CRAC in a dense data center raises room temperature 10°F in minutes. Most critical facilities monitor temperature continuously and alarm on deviations of 2°F or more.',
        ],
        keyPoints: [
          'ASHRAE recommends 64–81°F inlet temperature, 20–80% RH for server equipment',
          'Most critical facilities target 68–75°F and 45–55% RH — tighter than ASHRAE minimums',
          'Low humidity → ESD risk; high humidity → condensation and corrosion',
          'CRAC/CRAH failure can raise room temp 10°F in minutes in dense environments',
        ],
        quiz: [
          {
            q: 'Why is low humidity a problem in a data center or server room?',
            a: ['Static electricity (ESD) accumulates on equipment, increasing the risk of component damage', 'Equipment cools too efficiently and may over-cool', 'Air becomes too dry for cooling units to function', 'Low humidity increases airborne contamination'],
            correct: 0,
            exp: 'Low humidity allows electrostatic charge to build up on equipment and personnel. ESD discharge can damage or destroy sensitive electronic components.',
          },
          {
            q: 'A CRAC unit fails in a dense data center. What is the likely immediate result?',
            a: ['Room temperature rises rapidly — potentially 10°F or more within minutes', 'Equipment automatically adjusts to compensate', 'Humidity drops immediately, creating ESD risk', 'No immediate effect since servers have internal cooling'],
            correct: 0,
            exp: 'Dense data centers generate enormous heat. A failed CRAC unit can raise room temperature 10°F or more in minutes, triggering equipment thermal shutdowns.',
          },
          {
            q: 'Condensation forming on server components is most likely caused by:', a: ['High humidity in the room combined with cold air hitting warm equipment', 'Low humidity causing moisture to be absorbed from the air', 'Equipment running below its rated operating temperature', 'CRAC units operating at too low a temperature setpoint only'], correct: 0, exp: 'Condensation occurs when warm, humid air contacts cold surfaces. This can happen if room humidity is high and cold air is introduced near warm equipment.' },
        ],
      },
      {
        title: 'Hot/Cold Aisle Containment',
        body: [
          'Data centers organize server racks in alternating hot and cold aisles. Server racks intake cool air from the front (cold aisle) and exhaust hot air from the back (hot aisle). CRAC units supply cold air to the cold aisle via raised floor plenum or overhead ducts.',
          'Without proper containment, hot air recirculates to the cold aisle, raising inlet temperatures and reducing cooling efficiency. Containment systems — physical barriers at the ends of aisles and above rows — prevent this mixing.',
          'Cold aisle containment (CAC): encloses the cold aisle, feeding cold air only to server intakes. Hot aisle containment (HAC): encloses the hot aisle, capturing and returning exhaust air directly to CRAC units. Both approaches improve efficiency by 20–40%.',
          'As a technician, you must maintain containment. Leaving a rack door open, removing a blanking panel, or routing a cable through the aisle barrier creates a bypass path for hot air — reducing cooling efficiency for the entire row.',
        ],
        keyPoints: [
          'Cold aisle = server rack fronts (air intake); hot aisle = server rack backs (exhaust)',
          'Containment prevents hot/cold air mixing, improving cooling efficiency 20–40%',
          'Blanking panels fill empty rack spaces — removing them creates hot air recirculation paths',
          'Always replace blanking panels and close rack doors after work',
        ],
        quiz: [
          {
            q: 'In a hot/cold aisle arrangement, where does cool air enter the server rack?',
            a: ['The front of the rack, facing the cold aisle', 'The back of the rack, facing the hot aisle', 'The top of the rack through overhead vents', 'Equally from all sides of the rack'],
            correct: 0,
            exp: 'Server racks intake cool air from the front (cold aisle) and exhaust hot air from the rear (hot aisle). This is the fundamental design of hot/cold aisle cooling.',
          },
          {
            q: 'A technician removes a blanking panel from an empty rack slot and does not replace it. This creates:', a: ['A path for hot air to recirculate into the cold aisle, reducing cooling efficiency', 'Improved airflow for the remaining equipment in the rack', 'No significant effect — blanking panels are aesthetic only', 'A fire hazard due to exposed wiring'], correct: 0, exp: 'Blanking panels fill empty rack spaces to prevent hot air from the hot aisle from passing through the rack into the cold aisle. Without them, hot air recirculates and inlet temperatures rise.' },
          {
            q: 'What is the primary purpose of hot aisle containment (HAC)?',
            a: ['Capture hot exhaust air and return it directly to CRAC units, preventing mixing with cold aisle air', 'Provide a physical barrier to prevent technicians from entering hot areas', 'Reduce the temperature of the hot aisle to safe working levels', 'Separate racks into isolated zones for maintenance'],
            correct: 0,
            exp: 'HAC captures hot exhaust air from the backs of racks and channels it directly to CRAC return air intakes, preventing it from mixing with cold aisle supply air.',
          },
        ],
      },
      {
        title: 'Fire Suppression Systems',
        body: [
          'Critical environments use specialized fire suppression to protect equipment that cannot survive a water sprinkler discharge. The primary systems are clean agent gas systems (FM-200, Novec 1230, CO2) and pre-action water systems.',
          'Clean agent systems discharge a gas that suppresses fire by removing heat (FM-200, Novec 1230) or displacing oxygen (CO2). They leave no residue, so equipment survives the discharge. Clean agent systems are triggered by dual-detector agreement — two sensors must alarm before automatic discharge, preventing false activations.',
          'CO2 systems are effective but dangerous to personnel — CO2 at suppression concentration is fatal. Any room protected by CO2 must be evacuated before discharge. CO2 is typically reserved for unmanned areas like generator rooms and cable vaults.',
          'Pre-action water systems are two-stage: the pipe network normally contains pressurized air, not water. A first alarm pressurizes the system; a second alarm (or sprinkler head activation) releases water. This provides protection against accidental sprinkler discharge while still using water as the suppressant.',
          'Your role in a fire emergency: activate the manual pull station if safe, evacuate immediately, do not re-enter to save equipment, and report to the designated assembly point. Never use CO2 extinguishers in occupied spaces.',
        ],
        keyPoints: [
          'Clean agent systems (FM-200, Novec 1230): suppress fire without residue, safe for equipment',
          'CO2 systems: effective but lethal at suppression concentration — for unmanned areas only',
          'Pre-action systems: air-filled pipes prevent accidental water discharge; water releases on confirmed fire',
          'In a fire: pull station, evacuate, do not re-enter, report to assembly point',
        ],
        quiz: [
          {
            q: 'Why are clean agent suppression systems (FM-200, Novec 1230) preferred in data centers over water sprinklers?',
            a: ['They suppress fire without leaving residue that would damage equipment, and do not require equipment replacement after activation', 'They are cheaper than water sprinkler systems', 'They provide faster response than water systems', 'They eliminate the need for smoke detectors'],
            correct: 0,
            exp: 'Clean agent systems leave no residue — equipment typically survives the discharge and can continue operating after the area is ventilated. Water discharge destroys servers and electrical equipment.',
          },
          {
            q: 'A room is protected by a CO2 suppression system. A technician sees smoke near the ceiling. What is the first action?',
            a: ['Evacuate immediately — CO2 at suppression concentration is fatal to personnel', 'Investigate the smoke source before pulling the fire alarm', 'Stay and use a CO2 extinguisher to address the fire before the automatic system activates', 'Call the NOC and wait for instructions'],
            correct: 0,
            exp: 'CO2 at fire-suppression concentration displaces enough oxygen to cause loss of consciousness and death within seconds. Evacuate immediately at the first sign of fire in a CO2-protected space.',
          },
          {
            q: 'A pre-action water suppression system normally contains:',
            a: ['Pressurized air — water only enters the pipes when a fire is confirmed', 'Water pressurized and ready to discharge at any sprinkler activation', 'Clean agent gas as a first stage and water as a backup', 'Nothing — pipes are dry until the first alarm'],
            correct: 0,
            exp: 'Pre-action systems keep the pipe network dry (filled with pressurized air) until a fire alarm is confirmed. This prevents accidental discharge from a mechanical failure or accidental sprinkler head damage.',
          },
        ],
      },
    ],
    test: [
      { q: 'ASHRAE TC 9.9 recommends server inlet temperature of:', a: ['64.4°F–80.6°F (18°C–27°C)', '50°F–60°F (10°C–15°C)', '55°F–70°F (13°C–21°C)', '80°F–95°F (27°C–35°C)'], correct: 0, exp: 'ASHRAE TC 9.9 recommends 18°C–27°C (64.4°F–80.6°F) for server inlet air. Most critical facilities target the tighter range of 68–75°F.' },
      { q: 'Low relative humidity in a server room primarily creates what risk?', a: ['ESD accumulation on equipment', 'Condensation on cold components', 'Accelerated corrosion of contacts', 'Overheating of equipment'], correct: 0, exp: 'Low humidity allows electrostatic discharge (ESD) to build up, risking damage to sensitive electronic components.' },
      { q: 'In a hot/cold aisle arrangement, server racks exhaust hot air from:', a: ['The back of the rack, into the hot aisle', 'The front of the rack, into the cold aisle', 'The top of the rack, into the overhead plenum', 'Evenly from all sides of the rack'], correct: 0, exp: 'Server racks intake cool air from the front (cold aisle) and exhaust hot air from the rear into the hot aisle.' },
      { q: 'Blanking panels in server racks serve what purpose?', a: ['Fill empty rack slots to prevent hot air from recirculating through the rack into the cold aisle', 'Provide additional structural support for equipment', 'Serve as aesthetic covers for unused rack space', 'Provide grounding paths for equipment in the rack'], correct: 0, exp: 'Blanking panels seal unused rack space to prevent hot aisle air from flowing backward through the rack into the cold aisle.' },
      { q: 'A CRAC unit failure in a dense data center typically causes:', a: ['A rapid rise in room temperature — potentially 10°F or more within minutes', 'Gradual temperature increase over several hours', 'An immediate automatic shutdown of all servers', 'No immediate temperature change if the room is large'], correct: 0, exp: 'Dense data centers generate enormous heat loads. CRAC failure can raise temperature 10°F or more in minutes, triggering equipment thermal shutdowns.' },
      { q: 'FM-200 and Novec 1230 are preferred in data centers because:', a: ['They suppress fire without leaving residue that would damage equipment', 'They are the cheapest suppression option', 'They work by displacing oxygen, which protects against all fire types', 'They are effective without requiring smoke detectors'], correct: 0, exp: 'Clean agent systems leave no residue — servers and electrical equipment typically survive the discharge. Water or CO2 would require complete equipment replacement or create life safety hazards.' },
      { q: 'A CO2 suppression system is most appropriate for:', a: ['Unmanned areas such as generator rooms and cable vaults', 'All data center server rooms', 'Areas with personnel present at all times', 'Rooms with sensitive electronics where clean agent is too expensive'], correct: 0, exp: 'CO2 at suppression concentration is fatal. It is reserved for unmanned areas where personnel evacuation is not a concern.' },
      { q: 'Pre-action fire suppression systems normally contain what in their pipe network?', a: ['Pressurized air — water only enters on confirmed fire alarm', 'Water, pressurized and ready to discharge', 'Clean agent gas', 'Nothing — pipes are completely empty until activation'], correct: 0, exp: 'Pre-action systems keep pipes air-filled until a fire is confirmed by two alarm stages, preventing accidental water discharge.' },
      { q: 'Hot aisle containment (HAC) improves cooling efficiency by:', a: ['Capturing exhaust air and routing it directly to CRAC return intakes, preventing mixing with cold air', 'Providing physical barriers that slow hot air velocity', 'Redirecting hot air upward through the ceiling plenum', 'Insulating racks to reduce heat output'], correct: 0, exp: 'HAC channels hot exhaust air directly back to CRAC units, preventing it from mixing with cold supply air and improving overall cooling efficiency.' },
      { q: 'During a fire emergency in a critical facility, a technician should:', a: ['Activate the pull station if safe, evacuate immediately, and report to the assembly point — do not re-enter', 'Stay to protect critical equipment until instructed to leave', 'Use a fire extinguisher to attempt to suppress the fire before evacuating', 'Call the NOC first and await instructions before evacuating'], correct: 0, exp: 'Life safety first: activate the pull station, evacuate immediately, and do not re-enter regardless of the equipment impact.' },
    ],
  },

  {
    id: 'ce-access-protocols',
    num: 5,
    title: 'Access Control and Site Protocols',
    desc: 'Badging, escort requirements, change management, and how to communicate with site operations before starting any work.',
    slides: [
      {
        title: 'Physical Access Control Systems',
        body: [
          'Critical facilities use multiple layers of physical access control: perimeter security (fencing, guard posts), building access (badge readers), and internal zone access (server cage locks, raised floor access, specific rack locks). Access to each zone is logged automatically.',
          'Visitor and contractor access differs from employee access. Contractors are typically issued temporary badges and must be escorted by an authorized employee or site representative throughout their visit. Piggybacking — following someone through a secure door without your own badge swipe — is a security violation regardless of intent.',
          'Most critical facilities maintain a visitor log separate from the badge access system. You will sign in, present identification, receive a visitor badge, and be assigned an escort. Upon departure, the badge is returned and your departure time is recorded. Some facilities photograph all visitors.',
          'Your company\'s service contract specifies which zones you are permitted to access. If your escort takes you somewhere you have not been authorized, the correct response is to ask whether this is within your contracted scope, not to proceed silently.',
        ],
        keyPoints: [
          'Multiple access zones: perimeter → building → cage → specific rack — each logged automatically',
          'Contractors need escorts; piggybacking (tailgating) is a security violation',
          'Always sign in, receive a visitor badge, and sign out when departing',
          'Know your contracted access zones — ask if taken somewhere outside your scope',
        ],
        quiz: [
          {
            q: 'Piggybacking (tailgating) in a critical facility means:', a: ['Following someone through a secure door without using your own badge', 'Carrying heavy equipment through a corridor on a cart', 'Assisting another technician with a physically demanding task', 'Accessing a system remotely from outside the building'], correct: 0, exp: 'Piggybacking is entering a secure area by following an authorized person through the door without independently authenticating. It is a security policy violation even with good intentions.' },
          {
            q: 'A contractor\'s escort takes them to a server cage that is not in their work order. The contractor should:', a: ['Ask whether access to this zone is within their contracted scope before proceeding', 'Follow the escort without question — they are authorized to be there', 'Refuse to enter any space not explicitly in the work order, regardless of the escort', 'Contact their supervisor and wait for verbal approval before moving'], correct: 0, exp: 'Contractors should know their authorized scope and verify before accessing areas outside it. Following an escort into an unauthorized zone does not make the access legitimate.' },
          {
            q: 'When a contractor departs a critical facility, they should:', a: ['Return their visitor badge and sign out so their departure time is logged', 'Keep the badge in case they need to return later that day', 'Leave the badge at the front desk without signing out', 'Email the site contact to confirm their departure'], correct: 0, exp: 'Badge return and sign-out is required. It completes the visitor log entry and ensures the facility knows all contractors have departed.' },
        ],
      },
      {
        title: 'Change Management and Work Order Procedures',
        body: [
          'Every action in a critical environment is governed by change management. A change request (CR) is a formal document that describes what work will be done, when it will happen, what systems are affected, what the risk is, and what the rollback plan is if something goes wrong.',
          'Changes are typically classified by impact: standard changes (pre-approved, routine, low-risk), normal changes (require review and approval, moderate impact), and emergency changes (immediate approval required for service-affecting situations).',
          'Your work order is tied to an approved change request. If you need to do something not covered in the work order — even a small adjustment that seems routine — you must request a change before doing it. Unauthorized changes, even if successful, are a protocol violation and can end the service relationship.',
          'The NOC (Network Operations Center) or data center operations team monitors the facility. Before starting work, you call the NOC to declare your work order open. When you are done, you call to close it. If anything unexpected happens during the work, you call the NOC immediately. They maintain situational awareness for the entire facility.',
        ],
        keyPoints: [
          'Every action requires an approved change request — including small adjustments not in the original work order',
          'Change types: standard (pre-approved), normal (review required), emergency (immediate for service-affecting issues)',
          'Always call the NOC to open your work order before starting and close it when finished',
          'Unauthorized changes — even successful ones — are protocol violations',
        ],
        quiz: [
          {
            q: 'During a maintenance visit, a technician notices a minor firmware update would improve performance. This was not in the work order. They should:', a: ['Submit a change request for approval before performing the update', 'Apply the update since it improves the system and is low-risk', 'Note it in the service report for next visit', 'Ask the site lead verbally and proceed if they say yes'], correct: 0, exp: 'Any action not in the approved work order requires a new change request, regardless of how minor or beneficial it seems. Verbal approvals are not sufficient.' },
          {
            q: 'What is the purpose of calling the NOC before starting your work order?', a: ['To declare the work open so operations has situational awareness and can respond if alarms trigger during the work', 'To get permission to access the building', 'To confirm the equipment is running normally before starting', 'Only required for high-risk emergency changes'], correct: 0, exp: 'The NOC monitors the facility continuously. Declaring your work order open tells them to expect alarms related to your activity and to coordinate with you if something unexpected happens.' },
          {
            q: 'An emergency change request is used for:', a: ['Immediate work required to restore or prevent service-affecting failures', 'Any change that takes less than 15 minutes', 'Routine maintenance that was scheduled incorrectly', 'Work that does not require NOC notification'], correct: 0, exp: 'Emergency changes require immediate approval specifically for situations that affect service or prevent imminent failure. They still require documentation and approval, just on an accelerated timeline.' },
        ],
      },
      {
        title: 'Communication Standards on Site',
        body: [
          'Communication in a critical environment follows a specific chain. When you arrive: check in with the site representative, confirm your work order number, identify your escort, and review any site-specific safety briefing required. Do not start work until this sequence is complete.',
          'Speak in specifics. "I\'m going to turn off the UPS" is unacceptable. "I\'m going to initiate a controlled shutdown of UPS-A1 in Room 104 per work order CR-2024-10847, and the output load will transfer to bypass. Transfer expected at 10:15" is acceptable.',
          'If something unexpected happens — an alarm, a tripped breaker, an unusual sound — stop work and inform the site lead immediately. Do not attempt to diagnose and fix an unexpected condition without authorization. In critical environments, "I thought I could fix it" has caused catastrophic outages.',
          'Keep your phone off mute and accessible throughout the work. If the NOC cannot reach you while your work order is open, they have no way to coordinate if a problem develops. Some facilities require a radio handset while on site.',
        ],
        keyPoints: [
          'On arrival: check in, confirm work order number, get escort, complete safety briefing before starting',
          'Communicate in specifics — which equipment, which room, what action, at what time',
          'Stop immediately and inform the site lead if anything unexpected occurs — do not self-diagnose',
          'Stay reachable: NOC must be able to contact you throughout the open work order',
        ],
        quiz: [
          {
            q: 'Which statement is appropriate communication before performing a planned UPS transfer?', a: ['"I\'m initiating a controlled shutdown of UPS-A1 in Room 104 per CR-2024-10847. Transfer to bypass at 10:15."', '"I\'m turning off the UPS now."', '"Starting the UPS work."', '"Just letting you know I\'m about to do the maintenance."'], correct: 0, exp: 'Critical environment communication requires specifics: which equipment, which room, what action, which work order, and timing. Vague statements leave site operations unable to coordinate.' },
          {
            q: 'During maintenance, a technician hears an unexpected alarm from adjacent equipment. The correct response is:', a: ['Stop work immediately and inform the site lead — do not investigate or attempt to fix the alarm', 'Silence the alarm and continue the original work order', 'Investigate quickly to determine if it is related to their work', 'Call their supervisor and continue working while waiting for guidance'], correct: 0, exp: 'Unexpected conditions require an immediate work stoppage and notification to the site lead. Self-diagnosis and unauthorized intervention in unexpected situations is a leading cause of cascading failures.' },
          {
            q: 'Why must a technician remain reachable (phone on, radio accessible) while a work order is open?', a: ['The NOC needs to coordinate if a related alarm occurs or the situation changes during the work', 'Company policy requires it for liability reasons', 'So the customer can approve each step as it is completed', 'Only required for overnight or weekend work orders'], correct: 0, exp: 'With an open work order, the NOC is expecting alarms and needs to coordinate with the technician if anything changes. An unreachable technician during active work is a serious gap in situational awareness.' },
        ],
      },
    ],
    test: [
      { q: 'Piggybacking (tailgating) at a critical facility is:', a: ['Following someone through a secure door without your own badge — a security violation', 'Carrying equipment on a cart through a secured area', 'An approved access method for contractors', 'Entering an area slightly ahead of your escort'], correct: 0, exp: 'Piggybacking means entering a secure area behind an authorized person without independently authenticating. It is a security violation.' },
      { q: 'A contractor is escorted to a server cage outside their work order scope. They should:', a: ['Ask if access to this zone is within contracted scope before entering', 'Enter since the escort is authorized there', 'Refuse to enter and leave the facility', 'Call their supervisor from outside the door'], correct: 0, exp: 'Contractors must know their authorized zones and verify before accessing areas not listed in their work order.' },
      { q: 'Every planned action in a critical environment requires:', a: ['An approved change request before work begins', 'Verbal approval from the site lead', 'Only notification after the work is complete', 'Nothing if the action takes less than 15 minutes'], correct: 0, exp: 'Change management requires formal approval before any action, including minor adjustments not in the original work order.' },
      { q: 'Before starting work, a technician must call the NOC to:', a: ['Declare the work order open so operations has situational awareness', 'Request access to the building', 'Confirm equipment status', 'Only required if the work involves a shutdown'], correct: 0, exp: 'Opening the work order with the NOC ensures they are aware of planned activity and can coordinate if alarms trigger during the work.' },
      { q: 'A technician performs a firmware update not included in their work order but approved verbally by the site lead. This is:', a: ['A protocol violation — verbal approval is not sufficient; a change request is required', 'Acceptable since the site lead authorized it', 'Acceptable for low-risk changes under 30 minutes', 'Correct procedure for standard changes'], correct: 0, exp: 'Verbal approvals do not substitute for documented change requests. Unauthorized changes are a protocol violation regardless of verbal permission.' },
      { q: 'Appropriate communication before a planned equipment transfer is:', a: ['"Initiating transfer of UPS-A1 to bypass per CR-2024-10847 at 10:15."', '"Starting the UPS work now."', '"Just giving you a heads up before I begin."', '"Turning off the UPS."'], correct: 0, exp: 'Critical environment communication must be specific: which equipment, which action, which work order, and the timing.' },
      { q: 'During maintenance, an unexpected alarm sounds from adjacent equipment. The technician should:', a: ['Stop work immediately and notify the site lead', 'Silence the alarm and continue original work', 'Investigate the alarm before notifying anyone', 'Continue working and mention the alarm in the close-out call'], correct: 0, exp: 'Unexpected conditions require immediate work stoppage and notification. Self-diagnosis without authorization causes cascading failures.' },
      { q: 'Access zones in a critical facility are logged to:', a: ['Create an auditable record of who accessed which areas and when', 'Prevent equipment theft only', 'Track employee work hours', 'Monitor environmental conditions by zone'], correct: 0, exp: 'Badge access logs create a complete audit trail of physical access — essential for security reviews, incident investigations, and compliance audits.' },
      { q: 'Why must visitor badges be returned upon departure?', a: ['To complete the visitor log and confirm the contractor has left the facility', 'Badges are reusable and must be returned for cost reasons', 'Only required if the contractor will return on another day', 'Badge return is optional if the contractor signed in electronically'], correct: 0, exp: 'Badge return completes the visitor log entry and confirms the facility knows all visitors have departed. An unreturned badge represents an open access credential.' },
      { q: 'A technician must remain reachable throughout an open work order because:', a: ['The NOC must be able to reach them to coordinate if a related alarm or unexpected event occurs', 'Company policy requires availability during all paid hours', 'The customer must be able to approve each step', 'In case another technician needs assistance on a different work order'], correct: 0, exp: 'With an open work order, the NOC expects activity and needs to coordinate with the technician if anything changes in the facility during their work.' },
    ],
  },

  {
    id: 'ce-emergency-procedures',
    num: 6,
    title: 'Emergency Procedures',
    desc: 'Fire response, medical emergencies, emergency power shutdowns, and evacuation — what to do when things go wrong in a critical facility.',
    slides: [
      {
        title: 'Emergency Power Off (EPO) and Power Shutdowns',
        body: [
          'Emergency Power Off (EPO) systems cut all power to a facility zone instantly. EPO buttons are typically red, mushroom-shaped, and located near exits. They are designed for situations where the alternative is injury or death — not for equipment malfunctions.',
          'Accidental EPO activation is one of the most costly mistakes in critical facility work. A single EPO button press can take down hundreds of servers, interrupt thousands of transactions, and cause financial losses in the millions. EPO buttons are typically guarded with a cover for this reason.',
          'Planned emergency shutdowns differ from EPO. A planned shutdown follows a procedure: notify the NOC, confirm all critical loads are transferred or protected, notify affected parties, then shut down in a controlled sequence. The inverse applies to restart.',
          'Generator automatic transfer: when utility power fails, automatic transfer switches (ATS) start the generator and transfer load within 10–30 seconds depending on the design. UPS systems carry the load during this gap. If the generator fails to start or the ATS fails to transfer, the UPS runtime is the only protection remaining.',
        ],
        keyPoints: [
          'EPO is for life-safety emergencies only — accidental activation can cause millions in damages',
          'EPO buttons are guarded with covers specifically to prevent accidental activation',
          'Planned shutdowns follow a controlled procedure; EPO does not',
          'Generator ATS transfer covers the utility-to-generator gap; UPS is the bridge until transfer',
        ],
        quiz: [
          {
            q: 'An EPO button should be activated when:', a: ['There is an immediate threat to human life that requires all power to be removed instantly', 'A server overheats and needs to be shut down quickly', 'A circuit breaker trips and needs to be reset', 'Equipment is malfunctioning and the technician needs to troubleshoot'], correct: 0, exp: 'EPO is a life-safety device for emergencies where instant power removal is needed to protect human life. Equipment malfunctions, overheating, and troubleshooting use controlled procedures, not EPO.' },
          {
            q: 'Why are EPO buttons typically covered by a protective guard?', a: ['To prevent accidental activation, which can cause massive equipment damage and financial losses', 'To identify them clearly as emergency devices', 'Because they are sensitive electronic components', 'To prevent unauthorized use by personnel without EPO training'], correct: 0, exp: 'Accidental EPO activation can take down an entire data center floor. The protective cover requires a deliberate action (lifting the cover) before the button can be pressed.' },
          {
            q: 'During a utility power failure, what provides power while the generator starts?', a: ['The UPS system bridges the gap during the 10–30 second generator start and ATS transfer time', 'The data center continues on utility power until the generator is confirmed running', 'A battery backup directly connected to the ATS', 'The generator starts instantaneously, so no bridge is needed'], correct: 0, exp: 'UPS systems provide seamless power during the generator start sequence and ATS transfer — typically 10–30 seconds. Without UPS, a utility failure would cause an immediate outage.' },
        ],
      },
      {
        title: 'Fire Response in Critical Environments',
        body: [
          'Critical facility fire response follows a sequence: Discover → Alarm → Confine → Evacuate. If you discover fire, activate the nearest pull station, evacuate, and report to the designated assembly point. Do not use elevators. Do not re-enter to save equipment.',
          'Many critical facilities suppress fires with automatic clean agent or CO2 systems. Know before you enter: what suppression system protects the room you are working in. CO2 protection means evacuation at first alarm — do not wait to confirm.',
          'Suppression system pre-discharge alarms are designed to give personnel time to evacuate before the agent releases. A pre-discharge alarm (typically a different tone or strobe pattern) is your signal to immediately stop all work and leave.',
          'After a suppression system activation, the room may be contaminated with CO2, halon replacement agents, or FM-200. Do not re-enter without confirmation from the site safety officer that the atmosphere is safe. Some agents are irritants; CO2 remains dangerous until the room is ventilated.',
        ],
        keyPoints: [
          'Fire response sequence: Discover → Alarm → Confine → Evacuate',
          'Know the suppression type in your working area — CO2 requires immediate evacuation at first alarm',
          'Pre-discharge alarms signal immediate evacuation before the suppression agent releases',
          'Do not re-enter after suppression system activation until safety officer confirms it is safe',
        ],
        quiz: [
          {
            q: 'The first action upon discovering a fire in a critical facility is:', a: ['Activate the nearest fire alarm pull station', 'Call the NOC to report the fire', 'Attempt to extinguish the fire with the nearest extinguisher', 'Notify your supervisor before taking any action'], correct: 0, exp: 'Activating the pull station is the first action — it triggers the alarm, notifies the fire department, and may initiate the suppression system pre-discharge sequence.' },
          {
            q: 'You hear a pre-discharge alarm in a room protected by CO2. You should:', a: ['Immediately stop all work and evacuate — CO2 at suppression concentration is lethal', 'Finish your current task quickly before leaving', 'Contact the NOC to confirm the alarm is real before evacuating', 'Put on available respiratory protection and continue working'], correct: 0, exp: 'CO2 at suppression concentration displaces enough oxygen to cause unconsciousness within seconds. A pre-discharge alarm requires immediate evacuation — no exceptions.' },
          {
            q: 'After a clean agent suppression system activates in a server room, a technician should:', a: ['Wait for the site safety officer to confirm atmospheric safety before re-entering', 'Re-enter after 5 minutes to check equipment status', 'Enter with a wet cloth over their face for protection', 'Re-enter only if they do not smell the agent'], correct: 0, exp: 'Even clean agents can be irritants at suppression concentrations, and CO2 remains dangerous. Always wait for explicit confirmation from the safety officer before re-entry.' },
        ],
      },
      {
        title: 'Medical Emergencies and Electrical Injury Response',
        body: [
          'Electrical injuries are different from other traumatic injuries. Visible burns at contact points may be minor while internal injuries are severe — current travels through the body along the path of least resistance, damaging organs, nerves, and causing cardiac arrhythmias that may not present immediately.',
          'Do not touch a victim who is still in contact with the energy source. De-energize the circuit using the nearest breaker or EPO — do not use your hands to pull the victim away. If you cannot de-energize, call 911 immediately and keep others clear.',
          'After the victim is clear of the source: call 911 immediately, do not move the victim unless they are in immediate danger, check for breathing and pulse, and begin CPR if trained and if there is no pulse. An AED should be applied as soon as possible.',
          'Every person working near electrical equipment should hold a current CPR/First Aid/AED certification. The time from cardiac arrest to brain injury is approximately 4–6 minutes. Response time for emergency services in many critical environments is longer than that. The technician on site is often the only person who can save a colleague\'s life.',
        ],
        keyPoints: [
          'Electrical injury: visible burns may be minor while internal injuries are severe — always treat as serious',
          'Do NOT touch a victim still in contact — de-energize first using breaker or EPO',
          'After victim is clear: 911 immediately, CPR if trained, AED as soon as available',
          '4–6 minutes to brain injury from cardiac arrest — on-site CPR is often the only timely response',
        ],
        quiz: [
          {
            q: 'A coworker has been shocked and is still in contact with a live conductor. Your first action is:', a: ['De-energize the circuit immediately using the nearest breaker or EPO before touching the victim', 'Grab the victim\'s clothing to pull them free from the conductor', 'Call 911 before taking any action', 'Yell for help and wait for someone with more training to arrive'], correct: 0, exp: 'Touching a victim still in contact with a live conductor will make you the second victim. De-energize first — breaker, disconnect, or EPO — then approach the victim.' },
          {
            q: 'A victim of electrical shock has been freed from the source and appears conscious. You should:', a: ['Call 911 regardless — electrical injuries can cause internal damage and delayed cardiac arrest not visible externally', 'Assess the visible burns and call 911 only if they appear serious', 'Have the victim rest and monitor them for 30 minutes before deciding on medical care', 'Treat any visible burns with water and send them home if they say they feel okay'], correct: 0, exp: 'Electrical injuries always require medical evaluation. Current passing through the body causes internal injuries and cardiac arrhythmias that can cause delayed collapse. Call 911 immediately.' },
          {
            q: 'Why is on-site CPR and AED training mandatory for people working near electrical equipment?', a: ['Emergency services may take longer than the 4–6 minute window before brain injury from cardiac arrest', 'Company insurance requires it', 'OSHA mandates it for all electrical work', 'Because hospitals do not know how to treat electrical injuries'], correct: 0, exp: 'Cardiac arrest causes brain injury within 4–6 minutes. Emergency services in many critical environments take longer than this to arrive. The on-site technician is often the only person who can respond in time.' },
        ],
      },
    ],
    test: [
      { q: 'EPO buttons in a critical facility are designed for:', a: ['Life-safety emergencies requiring instant power removal', 'Equipment malfunctions needing quick shutdown', 'Testing the emergency shutdown system', 'Planned maintenance shutdowns'], correct: 0, exp: 'EPO is a last resort for life-safety emergencies only. Accidental activation can cause millions in damages.' },
      { q: 'EPO buttons have protective covers to:', a: ['Prevent accidental activation', 'Protect the electronics inside', 'Limit use to authorized personnel by adding a key lock', 'Identify them as emergency devices'], correct: 0, exp: 'The cover prevents accidental activation. Pressing EPO requires deliberately lifting the cover first.' },
      { q: 'During a utility power failure, the UPS provides power to:', a: ['Bridge the 10–30 second gap while the generator starts and the ATS transfers load', 'Provide unlimited backup power until utility is restored', 'Power only critical IT loads while the generator handles HVAC', 'Maintain power only if the outage is less than 30 seconds'], correct: 0, exp: 'UPS systems bridge the gap between utility failure and generator/ATS transfer — typically 10–30 seconds.' },
      { q: 'The fire response sequence in a critical facility is:', a: ['Discover → Alarm → Confine → Evacuate', 'Discover → Confine → Call → Evacuate', 'Alarm → Extinguish → Evacuate → Report', 'Call → Alarm → Confine → Evacuate'], correct: 0, exp: 'Discover → Alarm (pull station) → Confine (close doors) → Evacuate to assembly point.' },
      { q: 'A pre-discharge alarm in a CO2-protected room signals:', a: ['Immediate evacuation before CO2 releases', 'A false alarm — verify before evacuating', 'Time to put on respiratory protection', 'The start of the 30-second countdown to discharge'], correct: 0, exp: 'Pre-discharge alarms are your only warning before CO2 releases. CO2 at suppression concentration is lethal — evacuate immediately.' },
      { q: 'After a suppression system activates, you may re-enter when:', a: ['The site safety officer confirms atmospheric safety', 'After 5 minutes', 'After the agent smell dissipates', 'Immediately — clean agents are safe for personnel'], correct: 0, exp: 'Even clean agents can be irritants, and CO2 remains dangerous until ventilated. Wait for explicit safety officer clearance.' },
      { q: 'A coworker is in contact with a live conductor. You should first:', a: ['De-energize using the nearest breaker or EPO before touching them', 'Grab their clothing and pull them free', 'Call 911 first', 'Yell for help'], correct: 0, exp: 'Touching a victim in contact with live voltage makes you the second victim. De-energize first.' },
      { q: 'Electrical shock victims should always:', a: ['Receive medical evaluation even if they appear uninjured', 'Rest for 30 minutes and only call 911 if symptoms develop', 'Be treated for visible burns only', 'Return to work after the shock if they feel okay'], correct: 0, exp: 'Electrical current causes internal injuries and cardiac arrhythmias that may not present immediately. All electrical injury victims need medical evaluation.' },
      { q: 'Brain injury from cardiac arrest begins approximately:', a: ['4–6 minutes after cardiac arrest', '10–15 minutes after cardiac arrest', '1–2 minutes after cardiac arrest', '20–30 minutes after cardiac arrest'], correct: 0, exp: 'Brain injury begins within 4–6 minutes of cardiac arrest. This is why on-site CPR and AED response is critical when emergency services cannot arrive in time.' },
      { q: 'On-site CPR/AED training is essential for field technicians because:', a: ['Emergency services often cannot arrive within the 4–6 minute window before brain injury from cardiac arrest', 'It is required by OSHA for all electrical workers', 'It reduces company insurance premiums', 'It is only required for lead technicians'], correct: 0, exp: 'The 4–6 minute window before brain injury is often shorter than emergency service response times at remote or secured critical facilities.' },
    ],
  },

  {
    id: 'ce-cpr-aed',
    num: 7,
    title: 'CPR, First Aid, and AED Awareness',
    desc: 'Why CPR and AED certification is mandatory for anyone working near electrical equipment, and what to do while waiting for EMS.',
    slides: [
      {
        title: 'Cardiac Arrest and Electrical Shock',
        body: [
          'Electrical current passing through the chest can disrupt the heart\'s electrical rhythm and cause ventricular fibrillation (V-fib) — a state where the heart quivers instead of pumping. V-fib is the most common cause of sudden cardiac arrest from electrical shock.',
          'The most dangerous aspect of V-fib from electrical shock: it may not occur immediately. Delayed cardiac arrest — occurring minutes to hours after the initial shock — is documented in medical literature. This is why all electrical shock victims require immediate medical evaluation, even if they initially appear fine.',
          'CPR (Cardiopulmonary Resuscitation) manually pumps oxygenated blood to the brain and vital organs when the heart is not pumping effectively. Without CPR, brain cells begin dying within 4–6 minutes of cardiac arrest. With bystander CPR, survival rates approximately double.',
          'An AED (Automated External Defibrillator) delivers a controlled electrical shock to restore the heart\'s normal rhythm from V-fib or pulseless ventricular tachycardia (V-tach). AEDs are designed for untrained users — they analyze heart rhythm, determine if a shock is needed, and will not deliver a shock if the rhythm is normal.',
        ],
        keyPoints: [
          'Electrical current can cause ventricular fibrillation (V-fib) — a life-threatening arrhythmia',
          'Delayed cardiac arrest is possible hours after the initial shock — always call 911',
          'CPR doubles survival rates from cardiac arrest',
          'AEDs analyze rhythm and only shock if needed — designed for untrained responders',
        ],
        quiz: [
          {
            q: 'What cardiac condition does electrical shock most commonly cause?', a: ['Ventricular fibrillation (V-fib) — uncoordinated heart quivering instead of pumping', 'Complete heart block', 'Atrial flutter', 'Sinus tachycardia'], correct: 0, exp: 'Electrical current disrupts the heart\'s electrical conduction system, commonly causing ventricular fibrillation — where the heart quivers without pumping blood.' },
          {
            q: 'Why is it dangerous to send an electrical shock victim home even if they say they feel fine?', a: ['Delayed cardiac arrest can occur minutes to hours after the initial shock', 'Internal burns may not be visible but are always fatal', 'Electrical shock causes lasting neurological damage that requires monitoring', 'Company liability requires medical documentation of all electrical injuries'], correct: 0, exp: 'Delayed V-fib from electrical shock is documented. A victim who initially feels fine can experience cardiac arrest hours later. All electrical shock victims require immediate medical evaluation.' },
          {
            q: 'Without bystander CPR, brain injury begins approximately:', a: ['4–6 minutes after cardiac arrest', '10 minutes after cardiac arrest', '2 minutes after cardiac arrest', '1 minute after cardiac arrest'], correct: 0, exp: 'Without oxygenated blood reaching the brain, irreversible brain cell death begins within 4–6 minutes of cardiac arrest.' },
        ],
      },
      {
        title: 'What to Do While Waiting for EMS',
        body: [
          'The Chain of Survival for cardiac arrest: (1) Recognize cardiac arrest and call 911. (2) Start CPR immediately. (3) Use an AED as soon as available. (4) Hand off to advanced care (EMS/paramedics). Each link in the chain increases survival probability. Breaking any link reduces it.',
          'Calling 911: provide your exact location (address AND room number in a large facility), the nature of the emergency, the number of victims, and whether CPR is in progress. Do not hang up — the dispatcher can guide you through CPR.',
          'Starting CPR: the current standard for adults is hands-only CPR if you are not trained — 100–120 compressions per minute on the center of the chest, compressing 2–2.4 inches. If trained, add rescue breaths at a 30:2 ratio. Do not stop until EMS arrives or an AED advises no shock and the victim shows signs of life.',
          'AED use: power on, follow audio and visual prompts, attach pads as shown (one below the right collarbone, one below the left armpit), ensure nobody is touching the victim when analyzing or delivering a shock, and follow all prompts. Resume CPR immediately after each shock.',
        ],
        keyPoints: [
          'Chain of Survival: Recognize → 911 → CPR → AED → EMS',
          'Call 911 with exact location — room number and address in a large facility',
          'Hands-only CPR: 100–120 compressions per minute, 2–2.4 inch depth, center of chest',
          'AED: follow all prompts, ensure no contact during analysis and shock, resume CPR immediately after shock',
        ],
        quiz: [
          {
            q: 'When calling 911 for a cardiac arrest in a data center, you should provide:', a: ['Exact location (address and room number), nature of emergency, number of victims, and CPR status', 'Company name and service contract number', 'The victim\'s employee ID and emergency contact', 'A description of what caused the cardiac arrest'], correct: 0, exp: 'Dispatchers need the exact location to direct EMS correctly. In large facilities, room numbers are critical. They also need to know if CPR is in progress to coordinate response.' },
          {
            q: 'The correct compression rate for adult hands-only CPR is:', a: ['100–120 compressions per minute', '60–80 compressions per minute', '140–160 compressions per minute', 'As fast as possible — speed is more important than rate'], correct: 0, exp: '100–120 compressions per minute (roughly two per second) is the recommended rate. Too slow does not maintain circulation; too fast does not allow the heart to refill between compressions.' },
          {
            q: 'When an AED is prompting "Analyzing rhythm — do not touch the patient," you should:', a: ['Ensure no one is touching the victim and step back', 'Continue compressions lightly while the AED analyzes', 'Hold the victim still so the AED gets an accurate reading', 'Continue CPR until the AED gives the clear-to-shock prompt'], correct: 0, exp: 'Anyone touching the victim during AED analysis can interfere with the ECG reading and may receive the shock. Ensure all responders step back and do not touch the victim.' },
        ],
      },
      {
        title: 'AED Locations and Certification Requirements',
        body: [
          'Most critical facilities are required to have AEDs accessible within a certain distance of any work area. When you begin work at a new site, locating the nearest AED is part of your site orientation — like locating the fire exits. If no orientation is offered, ask the site representative.',
          'AEDs require minimal maintenance: periodic battery checks and pad replacement before expiration. In critical facilities, AED maintenance is typically included in the facility\'s life-safety equipment inspection program. If you notice a missing or expired AED, report it to the site lead.',
          'CPR/First Aid/AED certification is required for field technicians working near electrical equipment. The American Red Cross and American Heart Association both offer courses accepted by most employers. Certification is typically valid for 2 years before renewal is required.',
          'Certification is not a checkbox — it is a skill that requires practice to execute under stress. Hands-on training with manikins and practice AEDs builds the muscle memory needed to respond effectively when adrenaline is affecting your coordination and judgment.',
        ],
        keyPoints: [
          'Locate the nearest AED on arrival at every new site — part of site orientation',
          'Report missing, expired, or damaged AEDs to the site lead',
          'CPR/First Aid/AED certification: required, typically valid 2 years, Red Cross and AHA both accepted',
          'Hands-on training builds muscle memory needed to perform under stress',
        ],
        quiz: [
          {
            q: 'When arriving at a new critical facility to perform maintenance, a technician should:', a: ['Locate the nearest AED and emergency exits as part of site orientation', 'Begin the work order as soon as the escort arrives', 'Review the AED manual before starting any work', 'Ask the NOC for the AED location only if a medical emergency occurs'], correct: 0, exp: 'Locating AEDs and emergency exits is part of site orientation — before any work begins. In an emergency, you will not have time to search.' },
          {
            q: 'CPR/First Aid/AED certification is required for electrical field technicians because:', a: ['Emergency services may not arrive within the 4–6 minute window before brain injury from cardiac arrest', 'OSHA mandates it for all workers in any industry', 'It reduces insurance premiums for the employer', 'It is only required if the technician works alone'], correct: 0, exp: 'The 4–6 minute brain injury window is often shorter than EMS response time at secured critical facilities. On-site certified responders are often the only timely intervention available.' },
          {
            q: 'How often does CPR/First Aid/AED certification typically need to be renewed?', a: ['Every 2 years', 'Every year', 'Every 5 years', 'Once — initial certification does not expire'], correct: 0, exp: 'Standard CPR/First Aid/AED certification (Red Cross, AHA) is valid for 2 years. Renewal typically involves a skills refresher to maintain hands-on proficiency.' },
        ],
      },
    ],
    test: [
      { q: 'Electrical shock most commonly causes what cardiac condition?', a: ['Ventricular fibrillation (V-fib)', 'Complete heart block', 'Sinus tachycardia', 'Atrial fibrillation'], correct: 0, exp: 'Electrical current disrupts cardiac conduction and most commonly causes ventricular fibrillation, where the heart quivers without pumping blood effectively.' },
      { q: 'Why must all electrical shock victims receive medical evaluation even if they feel fine?', a: ['Delayed cardiac arrest can occur hours after the initial shock', 'Internal burns always cause delayed symptoms', 'OSHA requires documentation of all electrical incidents', 'Their perceived condition may not reflect neurological damage'], correct: 0, exp: 'Delayed V-fib from electrical shock is documented. A victim who initially feels fine can experience cardiac arrest hours later.' },
      { q: 'Brain injury from cardiac arrest begins approximately:', a: ['4–6 minutes without oxygenated blood', '10 minutes without treatment', '1–2 minutes without a heartbeat', '20 minutes if the person was healthy before arrest'], correct: 0, exp: 'Irreversible brain cell death begins within 4–6 minutes of cardiac arrest without CPR to maintain oxygenated blood flow.' },
      { q: 'The Chain of Survival sequence for cardiac arrest is:', a: ['Recognize → 911 → CPR → AED → EMS', 'Call → Assess → CPR → Defibrillate', 'AED → CPR → 911 → EMS', 'Recognize → CPR → 911 → AED'], correct: 0, exp: 'Recognize cardiac arrest, call 911, start CPR, use AED when available, and hand off to EMS. Breaking any link reduces survival probability.' },
      { q: 'The correct adult CPR compression rate is:', a: ['100–120 per minute', '60–80 per minute', '150+ per minute', '40–60 per minute'], correct: 0, exp: '100–120 compressions per minute — approximately two per second — maintains adequate circulation during cardiac arrest.' },
      { q: 'AED pad placement for an adult victim uses:', a: ['One pad below the right collarbone, one below the left armpit', 'Both pads on the center of the chest', 'One pad on the chest, one on the back', 'Pad placement is determined by the AED analysis'], correct: 0, exp: 'Standard AED placement: one pad just below the right clavicle (collarbone) and one below and to the left of the left nipple (below the left armpit).' },
      { q: 'When an AED is analyzing rhythm, you must:', a: ['Ensure no one is touching the victim', 'Continue light chest compressions', 'Hold the victim still', 'Resume CPR until told to stop'], correct: 0, exp: 'Contact with the victim during AED analysis interferes with the ECG reading and risks delivering the shock to the responder.' },
      { q: 'CPR/First Aid/AED certification is typically valid for:', a: ['2 years', '1 year', '5 years', 'Indefinitely with an annual written test'], correct: 0, exp: 'Standard CPR/AED certification from the Red Cross or AHA is valid for 2 years, after which renewal with hands-on skills refresher is required.' },
      { q: 'On arriving at a new critical facility, a technician should locate:', a: ['The nearest AED and fire exits before beginning work', 'Only the fire exits — AED location is the facility\'s responsibility', 'The AED only if they will be working alone', 'Nothing — site orientation is the facility\'s responsibility'], correct: 0, exp: 'Knowing AED and exit locations before an emergency occurs is essential. In an emergency there is no time to search. Ask if a site orientation is not offered.' },
      { q: 'AEDs will deliver a shock only when:', a: ['The victim\'s heart rhythm is shockable (V-fib or pulseless V-tach)', 'Compressions are not being performed', 'The victim is confirmed unconscious', 'The operator instructs it to shock'], correct: 0, exp: 'AEDs analyze the cardiac rhythm and will only instruct a shock if a shockable rhythm (V-fib or pulseless V-tach) is detected. They will not shock a victim with a normal or non-shockable rhythm.' },
    ],
  },

  {
    id: 'ce-professionalism',
    num: 8,
    title: 'Professionalism in Critical Environments',
    desc: 'Communication standards, documentation, customer relations, and how to build a reputation as a trusted technician in the field.',
    slides: [
      {
        title: 'Customer Communication and Expectations',
        body: [
          'The customer\'s primary expectation in a critical environment is not that you fix everything — it is that you make their facility more stable, not less stable, every time you are on site. A technician who causes a problem while fixing a different one is worse than one who does less and causes no disruption.',
          'Communicate your plan before every action. Before any shutdown, transfer, or change: brief the site representative on what you are about to do, what the expected impact is, and how long it will take. "I\'m going to run a capacity test on battery string B2. This will not affect the UPS output. The test takes approximately 45 minutes." This is professional communication.',
          'Manage expectations about outcomes. Not every service call resolves the problem. If you need parts, say so immediately with a timeline. If the root cause is unclear, say so and describe your diagnostic plan. Customers tolerate bad news; they do not tolerate being misled or kept in the dark.',
          'Language matters. Avoid technical jargon with non-technical site contacts — use plain language and ask if your explanation makes sense. With technical contacts (data center engineers, facilities managers), match their level. Reading your audience prevents miscommunication in both directions.',
        ],
        keyPoints: [
          'Goal: make the facility more stable with every visit — not better at fixing and worse at not breaking things',
          'Brief the site rep before every action: what, why, expected impact, and duration',
          'Communicate bad news immediately — customers tolerate problems, not surprises',
          'Match communication style to the audience — plain language vs. technical detail',
        ],
        quiz: [
          {
            q: 'The primary goal of a field technician on a service call in a critical environment is:', a: ['To improve facility stability — leaving it more reliable than when they arrived', 'To complete the work order as quickly as possible', 'To demonstrate technical expertise to the customer', 'To identify additional billable work during the visit'], correct: 0, exp: 'The highest standard is making the facility more stable with every visit. A technician who resolves one issue but creates another has failed, regardless of how well-intentioned the action was.' },
          {
            q: 'Before running a scheduled battery test, the technician should:', a: ['Brief the site representative on what will happen, the expected impact, and the timeline', 'Start the test and inform the NOC after it begins', 'Only notify the NOC — site representatives do not need technical briefings', 'Wait until the test is complete to inform anyone unless something goes wrong'], correct: 0, exp: 'Briefing the site representative (and the NOC) before any action is a core communication standard in critical environments. It ensures they are not surprised by alarms or unexpected behavior during the test.' },
          {
            q: 'A technician cannot identify the root cause of an intermittent alarm. The appropriate response is:', a: ['Explain what has been checked, describe the next diagnostic steps, and provide a timeline for resolution', 'Tell the customer the problem is fixed to avoid a difficult conversation', 'Replace components until the alarm stops without documenting the root cause', 'Close the work order and schedule a follow-up without explanation'], correct: 0, exp: 'Honesty about unresolved issues maintains trust. Customers understand that some problems are intermittent and complex. Misrepresenting the resolution erodes the relationship and delays the actual fix.' },
        ],
      },
      {
        title: 'Service Documentation Standards',
        body: [
          'Service documentation is not optional and not administrative overhead — it is the technical memory of the facility. Future technicians use your service report to understand what was done, what was found, and what still needs attention. Poor documentation causes repeat problems and repeat service calls.',
          'Every service report should include: equipment identification (serial number, location, asset tag), work performed (specific actions taken, parts replaced with part numbers and serial numbers), test results (actual measurements, not "within spec" — write the number), and any observations outside the scope of the work order.',
          'Photograph everything that matters: the equipment\'s initial state, any abnormal conditions found, parts before removal, and final state after repair. Photographs resolve disputes and provide documentation that words alone cannot match.',
          'Obtain the site representative\'s signature before you leave. An unsigned service report is a claim you made to yourself. A signed service report is a mutual record of what was done and accepted. If the representative declines to sign, note the reason in the report and escalate.',
        ],
        keyPoints: [
          'Service reports are the technical memory of the facility — future techs depend on your documentation',
          'Always include: equipment ID, specific work performed, actual measurements (not "within spec"), and observations',
          'Photograph initial state, abnormal conditions, parts before removal, and final state',
          'Obtain site representative signature before departure — unsigned reports are unverified claims',
        ],
        quiz: [
          {
            q: 'A service report records battery float voltage as "within spec" instead of the actual voltage measured. This is a problem because:', a: ['Future technicians cannot trend the data or identify degradation without actual numbers', 'It is a policy violation that requires a corrective action report', 'The customer has the right to the exact numbers for their records', '"Within spec" does not document which specification was used as the standard'], correct: 0, exp: 'Trending battery voltage over multiple visits identifies degrading strings before failure. "Within spec" provides no data for trending. Always record actual measurements.' },
          {
            q: 'Why should service reports include part serial numbers for all replaced components?', a: ['To create a complete audit trail for warranty claims, recalls, and failure analysis', 'Only for parts over $500 in value', 'So the technician can claim credit for the repair', 'Part numbers only are sufficient — serial numbers are optional'], correct: 0, exp: 'Serial numbers allow tracking of specific component failures across the fleet, supporting recall notifications, warranty claims, and manufacturer failure analysis.' },
          {
            q: 'A site representative refuses to sign the service report. The technician should:', a: ['Note the reason for the refusal in the report and escalate to their supervisor or account manager', 'Leave without documentation and follow up by email', 'Insist on a signature before leaving the premises', 'Fabricate a signature to complete the work order'], correct: 0, exp: 'Note the refusal and reason, then escalate. Never leave the situation undocumented, never fabricate documentation, and avoid confrontation with the customer at the site level.' },
        ],
      },
      {
        title: 'Building a Professional Reputation',
        body: [
          'In field service, reputation is the most important career asset. Companies hire technicians they trust with expensive equipment and sensitive customer relationships. Your reputation is built call by call, site by site, over years — and it can be damaged in a single interaction.',
          'The behaviors that build a strong reputation: showing up on time (or calling ahead if delayed), leaving the work area cleaner than you found it, following up on open items without being asked, and treating every person on site — from the security guard to the vice president — with equal respect.',
          'Social media and professional networks travel fast in the service industry. The data center manager at one company knows the manager at three others. What you say about a customer or employer online or at industry events will reach people you cannot predict.',
          'Continuous learning is not optional in field service. Equipment evolves. New technologies (lithium battery systems, modular UPS, distributed energy resources) require ongoing education. Technicians who stop learning stop being valuable. The industry rewards curiosity.',
        ],
        keyPoints: [
          'Reputation is built by consistent behavior across hundreds of calls over years — and can be damaged in one',
          'Professional behaviors: punctual, clean work areas, proactive follow-up, equal respect for everyone on site',
          'The service industry is small — your professional reputation travels through networks you cannot see',
          'Continuous learning is essential — technology evolves and the industry rewards curiosity',
        ],
        quiz: [
          {
            q: 'A technician is delayed on the way to a service call. The professional response is:', a: ['Call the site ahead of time to inform them of the delay and provide a revised ETA', 'Arrive when possible and apologize when they get there', 'Skip the call and reschedule without notifying the customer', 'Send an email notification after arriving late'], correct: 0, exp: 'Proactive communication about delays shows respect for the customer\'s time and allows them to adjust plans. Calling ahead demonstrates professionalism; arriving late without notice damages the relationship.' },
          {
            q: 'Why should a technician treat the security guard at a critical facility with the same respect as the facility manager?', a: ['Reputation is built on consistent behavior with everyone — and the service industry is small enough that interactions travel', 'Security guards can deny future access to the site', 'Company policy requires equal treatment of all personnel', 'Security guards often control access approvals'], correct: 0, exp: 'Professional behavior is consistent, not selective. The service industry is relationship-driven and small — how you treat every person at a site reflects on your professional character and travels through networks.' },
          {
            q: 'What does "continuous learning" mean for a field service technician?', a: ['Staying current with evolving equipment and technology, including emerging systems in your trade', 'Completing the annual mandatory safety training modules', 'Reading all service bulletins for equipment currently in the customer\'s install base', 'Reviewing your past service reports to identify repeat failure patterns'], correct: 0, exp: 'Field service technology evolves constantly — lithium battery systems, modular infrastructure, IoT monitoring, and distributed energy resources are all changing the skills required. Technicians who stop learning lose value.' },
        ],
      },
    ],
    test: [
      { q: 'The primary goal of a field technician in a critical environment is:', a: ['To improve facility stability with every visit', 'To complete the work order in minimum time', 'To identify additional work for the next service call', 'To demonstrate technical expertise to the customer'], correct: 0, exp: 'The highest standard is leaving the facility more reliable than before your visit — not causing disruption while fixing the original problem.' },
      { q: 'Before performing any planned action in a critical environment, you should:', a: ['Brief the site representative on what you will do, the expected impact, and the timeline', 'Start the work and inform the NOC after completion', 'Only notify the NOC — site contacts are not required for routine work', 'Proceed without briefing if the action is included in the approved work order'], correct: 0, exp: 'Briefing the site representative before every action is a core standard. It ensures they are not surprised by alarms and can coordinate with their team.' },
      { q: 'Recording "within spec" instead of actual measurements in a service report is problematic because:', a: ['Actual numbers are required to trend equipment performance over time and detect degradation', 'It violates service documentation policy', '"Within spec" is legally ambiguous', 'Customers need the exact number for their regulatory filings'], correct: 0, exp: 'Trending requires actual data. "Within spec" provides no trend data, making it impossible to detect gradual degradation before failure.' },
      { q: 'Service reports should include part serial numbers because:', a: ['They support warranty claims, recall tracking, and manufacturer failure analysis', 'Only serial numbers confirm that a replacement was actually performed', 'Serial numbers are required by OSHA for all replacement parts', 'Company billing systems require them for parts over $200'], correct: 0, exp: 'Serial numbers create a complete audit trail for specific component tracking — essential for warranty, recall notifications, and fleet-wide failure analysis.' },
      { q: 'A site representative declines to sign the service report. You should:', a: ['Note the reason in the report and escalate to your supervisor or account manager', 'Insist on a signature before leaving the facility', 'Leave and follow up by email to document the visit', 'Fabricate a signature to complete the work order'], correct: 0, exp: 'Document the refusal and reason, then escalate. Never fabricate signatures and avoid confrontation at the site level.' },
      { q: 'Which behavior best demonstrates professionalism in field service?', a: ['Proactively following up on open items without being asked', 'Completing the most work orders in a day', 'Avoiding contact with non-technical site personnel', 'Limiting customer communication to required notifications only'], correct: 0, exp: 'Proactive follow-up without being asked demonstrates reliability and builds trust — one of the most valued professional traits in field service.' },
      { q: 'A technician is 30 minutes behind schedule for a service call. They should:', a: ['Call the site immediately to inform them and provide a revised ETA', 'Arrive late and apologize in person', 'Send a text message to the site contact after arriving', 'Skip the call and reschedule if the delay is more than 15 minutes'], correct: 0, exp: 'Proactive communication about delays respects the customer\'s time and allows them to adjust. Call ahead — do not arrive late without notice.' },
      { q: 'Why is the service industry said to have a "small world" effect on reputation?', a: ['Managers and decision-makers at different companies know each other; behavior at one site travels through professional networks', 'Field service companies share employee records across the industry', 'Social media makes technician behavior visible to all customers simultaneously', 'The number of critical facilities in any region is small enough that all customers know each other'], correct: 0, exp: 'The service industry is relationship-driven. Decision-makers at competing companies know each other, attend the same events, and share experiences about service vendors and individual technicians.' },
      { q: 'Leaving the work area cleaner than you found it demonstrates:', a: ['Respect for the customer\'s facility and a commitment to professional standards', 'Compliance with OSHA housekeeping requirements', 'That no tool was left behind — the primary purpose of post-work cleanup', 'That the technician has extra time at the end of the service call'], correct: 0, exp: 'Cleanliness demonstrates respect for the customer\'s environment and reflects professional character. It is noticed — in both directions.' },
      { q: 'Continuous learning is important for field technicians because:', a: ['Technology in field service evolves constantly, and technicians who stop learning lose value', 'Certification requirements mandate annual learning hours', 'Equipment manufacturers require it to maintain warranty authorizations', 'It is only important for technicians who want to move into management'], correct: 0, exp: 'New technologies (lithium batteries, modular UPS, distributed energy resources, IoT monitoring) continuously change the skills required in field service. Curiosity and ongoing learning are career differentiators.' },
    ],
  },
];
