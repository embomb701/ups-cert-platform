import type { TrainingModule } from './modules';

// Telecom DC Power Plants course — course-specific modules (positions 13-17).
// The sequence is: shared foundation 1-10, battery-types + battery-safety at
// positions 11-12 (shared from ALL_MODULES), then these. Kept OUT of ALL_MODULES.

export const DCPLANTS_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 13 — -48V DC PLANT ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dcp-architecture',
    num: 13,
    title: '-48V DC Plant Architecture',
    desc: 'Why telecom runs on -48V DC, how a plant is assembled, float operation, plant sizing, and positive-ground discipline.',
    slides: [
      {
        title: 'Why -48V and the Always-On Architecture',
        body: [
          'Telecom power runs on -48 V DC, and the reason is not arbitrary — it is a 140-year-old engineering decision that still makes sense. The NEGATIVE GROUND convention means the DC bus runs at -48 V (negative with respect to the grounded return), with the +48 V return bonded to earth ground. The electrochemical reason: when DC flows through dissimilar metals in the presence of moisture, galvanic corrosion attacks the POSITIVE conductor. By making the return (positive) the grounded conductor, corrosion is directed toward the return copper and building ground — not toward the critical negative conductors feeding equipment. A corrosion-driven break in the return path fails safely (equipment shuts off); a corrosion break in the negative feed fails the load. Bell System engineers made this call in the late 1800s when the first telephone exchanges ran on wet cells in building basements, and the entire global telecom infrastructure inherited it.',
          'The ARCHITECTURE is built for one requirement above all others: NEVER LOSE POWER TO THE LOAD. Telecom plants are parallel-redundant float systems: RECTIFIERS convert utility AC to -48 V DC and float the DC bus; BATTERIES ride in parallel with the bus behind the rectifiers; LOAD (radios, switches, routers) draws directly from the bus. Under normal conditions the rectifiers carry 100% of the load and keep the batteries at full charge. When utility power fails, the rectifiers drop out, the batteries instantly take the load without any switching event — the bus voltage sags slightly as batteries discharge, but the load sees a smooth transition in milliseconds. There is no UPS inverter, no static switch, no transfer event. The battery IS the bus. This is the always-on architecture that gives telecom its reliability pedigree.',
          'FLOAT VOLTAGE is the bus voltage maintained by the rectifiers during normal operation. For VRLA (valve-regulated lead-acid) strings — the dominant battery chemistry in telecom — float is typically 2.23–2.27 V per cell, which across a 24-cell string (nominal 48 V) puts the bus at 53.5–54.5 V. Yes, the nominally "-48V" bus runs at 54 V during float — this is normal and expected. Equipment is designed for the full bus range: minimum voltage (battery discharged to end-of-discharge threshold, roughly 1.75 V/cell × 24 = 42 V) through maximum float (54.5 V). EQUALIZE voltage is a higher, periodic charge voltage (2.33–2.40 V/cell) used to bring all cells in a string to full charge and reduce sulfation — typically scheduled every 30–90 days at controller-defined intervals.',
        ],
        tables: [
          {
            caption: 'DC plant voltage reference points',
            headers: ['Condition', 'Cell voltage (VRLA)', 'Bus voltage (24-cell string)', 'Meaning'],
            rows: [
              ['Float', '2.23–2.27 V', '53.5–54.5 V', 'Normal: rectifiers carry load, batteries full'],
              ['Equalize', '2.33–2.40 V', '56–57.6 V', 'Periodic high-charge: corrects sulfation'],
              ['End of discharge', '~1.75 V', '~42 V', 'LVD threshold: disconnect non-critical loads'],
              ['Emergency cutoff', '1.67–1.75 V', '~40 V', 'Protect cells from deep damage'],
            ],
          },
        ],
        keyPoints: [
          'Negative ground: corrosion directed to return copper, not the critical negative feed conductors',
          'Batteries ride the bus in parallel with rectifiers — no transfer switch, no interruption on utility failure',
          'Float bus runs at ~54 V; "−48 V" is the nominal, not the operating voltage',
          'Load range: 42 V (discharged) to 57.6 V (equalize) — equipment must tolerate the full swing',
        ],
        quiz: [
          {
            q: 'Why does telecom use negative-ground -48V rather than positive-ground +48V DC?',
            a: ['Negative voltage is safer', 'Electrochemical: galvanic corrosion attacks the positive conductor; negative-ground directs corrosion to the return/ground path, protecting the critical negative feed conductors', 'Rectifiers cannot produce positive ground', 'International telecom standards require it arbitrarily'],
            correct: 1,
            exp: 'The negative-ground convention is a deliberate corrosion-management decision: the sacrificial positive return conductor is bonded to ground, protecting the load-feeding negative conductors.',
          },
          {
            q: 'During a utility power failure at a -48V plant, the load experiences:',
            a: ['A brief interruption while batteries transfer online', 'No interruption — batteries are already on the bus in parallel with rectifiers, continuing to supply the load seamlessly', 'A transfer switch operation taking 10-20 ms', 'A 42 V drop immediately'],
            correct: 1,
            exp: 'The parallel float architecture has no transfer event. Batteries ride the bus continuously; the rectifiers simply stop contributing and the batteries take over instantly.',
          },
        ],
      },
      {
        title: 'Plant Sizing, Grounding, and the Return Path',
        body: [
          'PLANT SIZING follows two rules that must both be satisfied: N+1 RECTIFIERS (enough total capacity to carry full load plus at least one spare module — if any one brick fails, the remaining N carry the load without shedding) and RESERVE TIME (battery capacity sufficient to carry the full site load for the required hours until power restoration or generator start). Reserve time requirements vary by site criticality: rural cell sites might be 2 hours; central offices might be 8 hours; some carrier SLAs require 24-hour reserves for critical nodes. The reserve-time calculation: Ah = (site load in amperes) × (reserve hours) ÷ (discharge efficiency factor, typically 0.8). A 100 A site requiring 4 hours needs 500 Ah of battery — the designer then selects string capacity and number of strings with appropriate margin for cell aging.',
          'POSITIVE-GROUND GROUNDING is the most conceptually difficult aspect for technicians trained on AC and UPS systems, and getting it wrong is dangerous. In a -48 V plant: the DC RETURN bus (the +48 V side, which is 48 V positive relative to the -48 V bus) is bonded to the BUILDING GROUND at one point (the main ground bar, or MGB). Equipment chassis connect to the DC return, not to a separate safety ground — in a properly designed telecom installation, the equipment chassis IS the return conductor path. The DC bus negative conductor goes to the battery negative and to load equipment negative terminals. NEVER apply AC safety-ground thinking (separate equipment ground from circuit conductors) to a DC plant return — they are the same conductor in this architecture.',
          'ONE-LINE LITERACY for a DC plant: rectifier shelf → main battery distribution fuse board (MBDFB) or bus bar → BATTERY DISCONNECT FUSE → battery strings; MBDFB also feeds → BATTERY DISTRIBUTION FUSE BOARD (BDFB) panels → load equipment fuses. Reading the one-line tells you the isolation path for any work: to isolate a battery string you open its disconnect; to isolate a load you open its BDFB fuse. The PLANT CONTROLLER monitors bus voltage, string voltages, individual rectifier status, load current, and alarm contacts, logging all events with timestamps — the same "logs first" rule applies: before touching anything, read the controller.',
        ],
        keyPoints: [
          'N+1 rectifiers: any single brick failure leaves full load capacity intact',
          'Reserve time sizing: Ah = load (A) × hours ÷ 0.8 — the carrier\'s SLA defines the hours',
          'Positive-ground: DC return bonded to building ground; equipment chassis IS the return path',
          'One-line literacy: MBDFB → BDFB → loads; battery string disconnect isolates the string',
        ],
        quiz: [
          {
            q: 'A cell site carries 80 A of DC load and requires 4 hours of battery reserve. Minimum battery capacity (at 0.8 efficiency) is:',
            a: ['240 Ah', '320 Ah', '400 Ah', '160 Ah'],
            correct: 2,
            exp: 'Reserve Ah = 80 A × 4 h ÷ 0.8 = 400 Ah. The 0.8 efficiency factor accounts for discharge losses and aging margin.',
          },
          {
            q: 'At a -48V plant, equipment chassis are bonded to:',
            a: ['The -48V negative bus', 'The DC return (+48V side), which is itself bonded to building ground — chassis IS the return path', 'A separate safety ground conductor', 'Nothing — they float'],
            correct: 1,
            exp: 'Positive-ground architecture bonds the return conductor (positive side) to earth, making the equipment chassis part of the return current path. AC ground conventions do not apply.',
          },
        ],
      },
    ],
    test: [
      { q: 'The -48V negative-ground convention protects infrastructure by:', a: ['Running lower voltage', 'Directing galvanic corrosion to the return/ground path rather than the current-carrying negative conductors', 'Using thicker wire', 'Eliminating batteries'], correct: 1, exp: 'Corrosion attacks the positive conductor. Grounding the return (positive side) makes it the sacrificial path.' },
      { q: 'In normal float operation, a 24-cell VRLA string runs the bus at approximately:', a: ['48 V exactly', '54 V — 2.25 V/cell × 24 cells = 54 V float', '42 V', '57.6 V always'], correct: 1, exp: 'Float voltage (2.23–2.27 V/cell) × 24 cells puts the bus at 53.5–54.5 V — not 48 V.' },
      { q: 'When utility power fails at a -48V plant, the load experiences:', a: ['A brief transfer interruption', 'No interruption — the parallel float architecture has no switch; batteries are already on the bus', 'A 10 ms UPS transfer', 'A voltage dip to 42 V'], correct: 1, exp: 'The always-on architecture is its signature advantage: batteries ride the bus continuously with no transfer event.' },
      { q: 'N+1 rectifier sizing means:', a: ['One backup plant at another site', 'Enough bricks that losing any single one still covers full load — the +1 is the spare module', 'N = number of batteries', 'Redundant AC feeds only'], correct: 1, exp: 'N+1 means N modules carry the load with one spare; any single failure is absorbed without load shedding.' },
      { q: 'Reserve time is determined by:', a: ['Rectifier capacity', 'Battery Ah capacity ÷ 0.8, divided by load amperes — the carrier\'s SLA defines the required hours', 'Utility reliability statistics', 'The generator fuel tank size'], correct: 1, exp: 'Reserve Ah = load × hours ÷ 0.8. The SLA-mandated reserve hours drive the battery capacity requirement.' },
      { q: 'Equalize voltage (2.33–2.40 V/cell) is used to:', a: ['Run loads more efficiently', 'Periodically bring all cells to full charge and reduce sulfation — scheduled every 30–90 days', 'Replace battery strings', 'Balance rectifier output'], correct: 1, exp: 'Equalize is a controlled high-voltage charge cycle that corrects charge imbalances and sulfation in VRLA strings.' },
      { q: 'The equipment chassis in a -48V positive-ground plant is bonded to:', a: ['The -48V bus directly', 'The DC return (+48V side / building ground) — chassis is part of the return current path', 'A separate equipment ground only', 'Nothing for isolation'], correct: 1, exp: 'In positive-ground architecture the return IS the safety ground. Chassis bonded to return is the designed current path.' },
      { q: 'A BDFB in a DC plant is:', a: ['A battery discharge function board', 'Battery Distribution Fuse Board — the panel that feeds load equipment from the main DC bus', 'A backup DC feed bus', 'A rectifier shelf'], correct: 1, exp: 'BDFB (Battery Distribution Fuse Board) is the downstream distribution panel distributing DC to individual load circuits.' },
      { q: 'Before working on any DC plant, the first action is:', a: ['Pull all fuses', 'Read the plant controller — event logs, alarm history, current bus voltage, and rectifier status tell you the plant state', 'Verify the AC input is live', 'Open the main battery disconnect'], correct: 1, exp: 'Logs first, always. The controller has the event history, alarm state, and current measurements — know the plant before touching it.' },
      { q: 'The minimum bus voltage threshold for a -48V plant (end of discharge) is approximately:', a: ['48 V', '54 V', '42 V — about 1.75 V/cell × 24 cells', '36 V'], correct: 2, exp: 'End-of-discharge at ~1.75 V/cell × 24 cells ≈ 42 V. Below this the LVD disconnects non-critical loads to protect the batteries.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 14 — RECTIFIER SHELVES & PLANT CONTROLLERS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dcp-rectifiers',
    num: 14,
    title: 'Rectifier Shelves & Plant Controllers',
    desc: 'Modular hot-swap rectifiers, float and equalize voltage management, temperature compensation, and the plant controller\'s role.',
    slides: [
      {
        title: 'Modular Rectifier Shelves and Float Management',
        body: [
          'Telecom rectifiers are engineered for one service reality: they must be replaceable under full load without interrupting the DC bus. HOT-SWAP RECTIFIER SHELVES hold multiple 1.2–5 kW power modules (bricks) in a common shelf with a shared output bus bar. Each brick connects to the bus through a diode or FET-based OR-ing circuit that prevents a failed module from backfeeding the bus; pulling a failed brick live is a designed, documented procedure. The shelf controller monitors each brick and reports status to the plant controller. SICK-BRICK DIAGNOSIS follows the same logic as DCFC module faults and UPS module faults: a plant delivering 2/3 of rated current with all other parameters normal has one or two bricks failed — the shelf display identifies the failed position. Arrive knowing the position from the remote monitoring system before touching the shelf.',
          'FLOAT VOLTAGE is temperature-compensated in properly configured plants. VRLA batteries self-discharge faster and accept charge differently at temperature extremes: hot batteries (above 25°C) need a LOWER float voltage to prevent overcharge and thermal runaway; cold batteries (below 10°C) need a HIGHER float voltage to achieve full charge. The plant controller applies TEMPERATURE COMPENSATION via a thermistor probe mounted on the battery string: a typical coefficient is -3 to -5 mV per cell per °C above 25°C. A battery room running at 40°C without temperature compensation runs the batteries 15–25 mV per cell too high — accelerating water loss, plate corrosion, and thermal runaway risk. Verify temperature compensation is active and the probe is seated in the string (not dangling in air) on every PM visit.',
          'BATTERY TEST CYCLES are managed by the plant controller on schedule or on demand: FLOAT-TO-DISCHARGE tests briefly lower the charge current to verify the battery can sustain the bus (shallow test), while full CAPACITY TESTS (done externally or via a dedicated test unit) verify Ah delivery to a defined end voltage. The controller also manages ALARM THRESHOLDS: high bus voltage (rectifier overvoltage or equalize running), low bus voltage (under-rectifier or battery deep discharge), ground fault detection (leakage to the return conductor indicates insulation breakdown), and individual rectifier faults. These thresholds are configurable — know the carrier-standard setpoints before assuming an alarm is a malfunction.',
        ],
        keyPoints: [
          'Hot-swap bricks: OR-ing prevents failed modules from pulling down the bus; replacement is live-bus work',
          'Sick-brick pattern: proportional derating with specific shelf position flagged — read the shelf before the truck',
          'Temperature compensation: -3 to -5 mV/cell/°C above 25°C — verify probe is seated in the string, not free-hanging',
          'Controller alarm thresholds are carrier-configurable: know the site spec before concluding an alarm is a defect',
        ],
        quiz: [
          {
            q: 'A telecom rectifier shelf has eight 1.5 kW modules installed; the plant is delivering 9 kW instead of the expected 12 kW. The shelf display shows two modules in fault. The correct action is:',
            a: ['Replace the entire shelf', 'Identify the two faulted positions from the shelf display and replace those bricks — the other six continue serving the load', 'Open the main battery disconnect first', 'Reduce the load to match available power'],
            correct: 1,
            exp: 'Modular rectifier design: failed bricks derate total output proportionally. Two failed bricks out of eight explains the 25% derating. Replace the identified modules, live-bus procedure per manufacturer.',
          },
          {
            q: 'A -48V plant in a hot equipment room (42°C battery temperature) has temperature compensation disabled. The risk is:',
            a: ['Batteries charging too slowly', 'Overcharge: float voltage too high for the elevated temperature accelerates water loss, corrosion, and thermal runaway risk in VRLA cells', 'Rectifiers faulting on over-temperature', 'The LVD triggering prematurely'],
            correct: 1,
            exp: 'VRLA batteries at high temperature need lower float voltage. Without compensation, the uncorrected voltage drives accelerated gassing, dryout, and thermal runaway — the plant\'s most serious battery failure mode.',
          },
        ],
      },
      {
        title: 'Plant Controllers, AC Feeds, and the Generator Connection',
        body: [
          'The PLANT CONTROLLER is the brain of the DC plant: it sets float and equalize voltages (or receives them from remote management), manages temperature compensation, monitors and commands individual rectifier modules, controls the LVD (low-voltage disconnect) relay, annunciates alarms to local panels and remote network operations centers (NOC), and logs all events with timestamps. Modern controllers communicate via SNMP, Modbus, or proprietary protocols to the carrier\'s NMS (Network Management System) — the telecom equivalent of the OCPP backend. The event log is the first instrument you read at any plant: timestamp-correlated alarms, battery test results, and rectifier events tell the story of every significant plant condition in the past weeks or months. A plant that alarms intermittently at 3 AM every night has a pattern worth reading before dispatching.',
          'AC FEED TO THE RECTIFIERS is where the generator course connects directly. Most cell sites have a single AC service feed; larger sites have dual feeds from separate utility circuits. When utility fails, the site ATS (automatic transfer switch — generator course Module 21) starts the standby generator and transfers the AC feed to the rectifiers. The rectifiers then resume carrying the DC load from generator power while the batteries recharge. THE CRITICAL SEQUENCE: on utility loss → batteries immediately take load → generator cranks (up to 30 seconds) → ATS transfers → rectifiers restart and ramp up → batteries begin recharge. A site that runs only on batteries during this window is a TEMPORARY condition; a site that runs on batteries for hours means either generator failure, generator low-fuel, or ATS fault — the remote monitoring alarm should distinguish these. Understanding this sequence is what turns the generator course and the DC plant course into one operational picture.',
          'RECTIFIER INSTALLATION DISCIPLINE: new modules must match the shelf\'s configured voltage and current ratings (mixing incompatible bricks causes bus instability), firmware should match the shelf controller\'s requirement (the same firmware-match lesson from DCFC), and current sharing must be verified after installation — all bricks in a shelf should be contributing approximately equal current (visible on the shelf display). A brick contributing zero current is an OR-ing failure or a configuration mismatch; a brick contributing disproportionate current means others are underloading, likely indicating their OR-ing circuits or voltage regulation are slightly off. Measurement: clamp-meter each brick output or read the shelf display; equalization within ±10% is acceptable.',
          ],
        keyPoints: [
          'Plant controller: event log first — timestamps reveal patterns that dispatch cannot see without them',
          'SNMP/Modbus/NMS: the controller reports to the carrier NOC the same way OCPP reports to the EV network backend',
          'Generator sequence: utility loss → batteries → generator → ATS → rectifiers ramp up → battery recharge',
          'New brick installation: match voltage/current spec AND firmware; verify current sharing after replacement',
        ],
        quiz: [
          {
            q: 'A plant controller logs a low-voltage alarm at 3:12 AM every night, clearing by 3:45 AM. The alarms correlate with no rectifier faults. The most productive first investigation is:',
            a: ['Replace the controller', 'Review the event log for pattern context: repeated timed alarms suggest a scheduled or environmental event — load spike, battery test cycle, or nightly HVAC compressor start', 'Replace the battery strings', 'Increase the LVD threshold'],
            correct: 1,
            exp: 'Timed, self-clearing alarms are diagnostic patterns, not random failures. The event log\'s timestamps reveal what else happened at 3 AM — a load surge, a scheduled battery test, or environmental equipment cycling.',
          },
          {
            q: 'After a utility outage at a cell site, the batteries discharge for 45 minutes before the plant stabilizes. This indicates:',
            a: ['The batteries are defective', 'The generator start, ATS transfer, and rectifier ramp-up sequence took 45 minutes — investigate ATS transfer time, generator start reliability, and whether the site has redundant AC feeds', 'The rectifiers are oversized', 'Normal operation'],
            correct: 1,
            exp: 'Standard ATS transfer should occur within seconds to minutes of utility failure. A 45-minute battery discharge means something in the generator-ATS-rectifier sequence delayed — generator won\'t-start, ATS fault, or remote-monitoring misidentification.',
          },
        ],
      },
    ],
    test: [
      { q: 'Telecom rectifier modules use OR-ing circuits to:', a: ['Balance current among bricks', 'Prevent a failed module from backfeeding current from the bus into the failed brick — isolates the failure', 'Provide equalize voltage', 'Control temperature compensation'], correct: 1, exp: 'OR-ing (diode or FET-based) is what makes hot-swap replacement safe: the failed brick cannot sink bus current through itself.' },
      { q: 'A rectifier shelf delivering 9 kW instead of 12 kW with two modules in fault is exhibiting:', a: ['A total plant failure', 'The sick-brick derating pattern — two of N bricks failed, remaining bricks carry the load at proportionally reduced total output', 'An AC feed problem', 'Battery backfeed'], correct: 1, exp: 'Proportional derating from identified failed bricks — the modular architecture absorbs failures without total outage.' },
      { q: 'Temperature compensation on a VRLA plant reduces float voltage when:', a: ['Temperatures drop below 0°C', 'Battery temperature rises above 25°C — hot batteries need lower voltage to avoid overcharge', 'Rectifiers overheat', 'Utility voltage sags'], correct: 1, exp: 'The compensation coefficient (mV/cell/°C) applies a lower float voltage at elevated temperatures, preventing overcharge-driven thermal runaway.' },
      { q: 'A temperature compensation probe found hanging free in air (not on the battery string) will cause:', a: ['No effect — it reads air temperature acceptably', 'Incorrect compensation: air temperature differs from battery temperature, leading to wrong float voltage for the actual battery condition', 'The plant to shut down', 'Rectifiers to equalize continuously'], correct: 1, exp: 'The probe must contact the battery string. Air temperature differs from battery temperature — a free-hanging probe applies wrong compensation and is a PM correction item.' },
      { q: 'The plant controller communicates to the carrier NOC typically via:', a: ['J1772 pilot signal', 'SNMP, Modbus, or proprietary protocols — the same monitoring-to-backend paradigm as OCPP for EV chargers', 'Cellular only', 'Manual log books'], correct: 1, exp: 'NMS/NOC communication protocols vary by carrier and equipment generation; SNMP is the most common open standard.' },
      { q: 'When utility power fails at a cell site with a standby generator, the battery discharge period ends when:', a: ['The batteries reach 42 V', 'The ATS transfers AC to the generator and rectifiers ramp back up to carry the load and begin battery recharge', 'The site load sheds automatically', 'The NOC dispatches a tech'], correct: 1, exp: 'Generator start → ATS transfer → rectifiers online = end of battery-only operation. This sequence typically takes 10–30 seconds, not 45 minutes.' },
      { q: 'After installing a replacement rectifier brick, current sharing should be verified by:', a: ['Checking the display for equal temperature', 'Clamp-metering each brick output or reading per-brick current on the shelf display — all bricks should contribute within ±10%', 'Measuring bus voltage only', 'Running an equalize cycle'], correct: 1, exp: 'Equal current sharing confirms the new brick\'s OR-ing and regulation are correct. A brick at zero current or disproportionate current has a configuration or hardware issue.' },
      { q: 'New rectifier bricks installed in an existing shelf must match:', a: ['Only the voltage rating', 'Voltage rating, current rating, AND firmware version — mismatches cause bus instability or controller handshake failures', 'Only the physical form factor', 'The battery string voltage only'], correct: 1, exp: 'The same firmware-match lesson as DCFC modules and any paralleled power electronics: all bricks in a shelf must be compatible in all three dimensions.' },
      { q: 'Equalize voltage cycles are scheduled to:', a: ['Replace capacity tests', 'Correct charge imbalances and sulfation in VRLA strings — periodic high-voltage charge managed by the controller', 'Test the LVD function', 'Run when AC fails'], correct: 1, exp: 'Equalize is a maintenance charge cycle: higher than float voltage, time-limited, scheduled at 30–90 day intervals per the battery manufacturer\'s spec.' },
      { q: 'A plant controller alarm that recurs at the same time every night and clears by itself is best investigated by:', a: ['Replacing the controller', 'Reading the event log for the specific timestamps and correlated events — timed self-clearing alarms are pattern diagnoses, not random failures', 'Increasing the alarm threshold', 'Resetting the controller to factory defaults'], correct: 1, exp: 'Patterns in timed alarms reveal scheduled events (battery tests, load spikes, HVAC compressors) that drive bus voltage fluctuations — the log tells the story.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 15 — DC DISTRIBUTION, FUSING & LVD
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dcp-distribution',
    num: 15,
    title: 'DC Distribution, Fusing & LVD',
    desc: 'BDFBs, fuse panels, low-voltage disconnect, live-bus work discipline, and the millivolt-drop hunt at high DC current.',
    slides: [
      {
        title: 'DC Distribution Architecture and Live-Bus Safety',
        body: [
          'DC distribution in a telecom plant flows from the main bus through a hierarchy of protection devices before reaching equipment. The MAIN BATTERY DISTRIBUTION FUSE BOARD (MBDFB) or main bus bar is the first distribution point off the rectifier bus: it holds the battery string fuses or disconnects (one per string) and the main feeds to downstream panels. From the MBDFB flow BATTERY DISTRIBUTION FUSE BOARDS (BDFBs) — the rack-mounted panels that serve individual equipment frames, each position fused for the specific load. Some carriers use BATTERY DISTRIBUTION CIRCUIT BREAKER BOARDS (BDCBBs) with breakers instead of fuses for resettable protection. READING THE ONE-LINE from MBDFB through BDFB to equipment frame tells you exactly what fuse to open to isolate any load.',
          'LIVE-BUS WORK DISCIPLINE is the most critical safety competency in DC plant work — and it differs fundamentally from AC work discipline. The -48 V bus is ALWAYS energized as long as batteries are connected. You cannot "turn off" the bus the way you de-energize an AC circuit; even with all rectifiers failed, the batteries hold the bus. SAFE WORK RULES: (1) INSULATED TOOLS ONLY — a standard screwdriver contacting both bus bars simultaneously is a welding machine; insulated tools prevent accidental shorts. (2) ONE CONDUCTOR AT A TIME — when connecting or disconnecting lugs at the bus bar, expose, connect, and cover one conductor completely before touching the second. (3) REMOVE JEWELRY — rings and watchbands across a DC bus conduct hundreds of amps without tripping any protection. (4) VERIFY POLARITY before connecting any load — reversed polarity in a DC system destroys equipment instantly. (5) INSULATE ADJACENT CONDUCTORS — rubber mats or insulating caps on adjacent lugs while working on one position.',
          'FUSE SELECTION AND VERIFICATION at BDFBs follows the load current plus margin (typically fuse at 125% of maximum load). BLOWN FUSE DIAGNOSIS: a fuse that clears once for a load that subsequently runs normally may have been a transient (cold-start current surge, lightning event); a fuse that clears repeatedly is a real overload or short. Before replacing a blown fuse, measure the resistance of the load circuit to ground and between conductors — a short on the load side would blow the replacement immediately. DC fuses are NOT AC fuses and must not be substituted (AC fuses can sometimes be physically fitted but lack the DC arc-interruption ratings; a DC arc at 54 V does not self-extinguish at current zero the way AC arcs do). Always replace with the correct DC-rated fuse at the specified current and voltage rating.',
        ],
        keyPoints: [
          'MBDFB → BDFB → equipment frame: read the one-line to find the right fuse for any load isolation',
          'Live-bus work: insulated tools, one conductor at a time, remove jewelry, verify polarity — the bus never goes dead',
          'DC fuses are NOT AC fuses: DC-rated at both the current and voltage for the application',
          'Repeated fuse clearing = real overload or short — measure load resistance before replacing',
        ],
        quiz: [
          {
            q: 'A technician needs to isolate a single equipment frame in a BDFB for replacement. The correct action is:',
            a: ['Open the main battery disconnect to de-energize the entire plant', 'Identify the frame\'s BDFB position and open (or pull) that fuse only — isolating the one circuit while the rest of the plant remains live', 'Pull all BDFB fuses as a precaution', 'Wait for a utility outage to create a battery-only, lower-risk state'],
            correct: 1,
            exp: 'DC plant work is live-bus work by definition. The BDFB fuse for the specific frame is the correct isolation point — not the main disconnect, which would interrupt all loads.',
          },
          {
            q: 'A tech\'s metal watchband contacts the positive and negative bus bars in a BDFB simultaneously. The result will be:',
            a: ['A brief tingle — the voltage is only 54 V', 'Severe arc burn: hundreds of amperes flow through the watchband with no fuse protection between the bus and the contact point', 'A blown fuse safely interrupting the arc', 'An GFCI trip stopping the current'],
            correct: 1,
            exp: '54 V DC with battery capacity behind it can deliver thousands of amperes into a short-circuit path like a watchband — the arc will be severe and instantaneous. Remove all jewelry before any DC plant live work.',
          },
        ],
      },
      {
        title: 'LVD, the Millivolt-Drop Hunt, and Load Balancing',
        body: [
          'The LOW-VOLTAGE DISCONNECT (LVD) is the plant\'s last-resort load protection function: when bus voltage falls to a configured threshold (typically 42–44 V, or 1.75 V/cell), the LVD relay opens and disconnects non-critical loads from the bus. Critical loads (the revenue-generating radios and switches) remain connected; non-critical loads (HVAC, lighting, some monitoring) are shed. The intent is to SACRIFICE NON-CRITICAL LOADS TO PRESERVE BATTERY RUNTIME for critical loads. LVD setpoints are carrier-configured and critically important: set too high, LVD trips during normal voltage fluctuations; set too low, critical equipment shuts down before the batteries reach LVD. When a site\'s LVD has operated (reported by the controller), the investigation is: why did bus voltage reach that threshold — battery capacity degraded below the reserve-time requirement, the load grew beyond the battery\'s rated discharge rate, or generator/ATS failed to start.',
          'THE MILLIVOLT-DROP HUNT is the DC plant equivalent of the electrical troubleshooting principle "resistance is the enemy" — and at telecom DC currents (often 100–500 A per bus section), even 1 milliohm of added resistance generates voltage drops that steal effective bus voltage from equipment. Causes: LOOSE LUG connections (the most common — torque checked on PM), OXIDIZED CONTACTS on fuse clips or breaker contacts, UNDERSIZED OR DAMAGED CABLE sections. The test: measure DC voltage between two points that should be at equal potential (same bus, opposite ends of a cable section) with the load carrying current. A drop of more than a few millivolts per bus section indicates resistance. The investigation then follows the suspect section: measure at each connection point working from the source toward the load until the drop localizes to one connection or conductor. Resolution: clean oxidation, retorque lugs, repair or replace damaged cable.',
          'LOAD BALANCING across BDFB positions and battery strings keeps the plant operating within its design parameters. BDFB LOAD BALANCE: heavy equipment frames should not all connect to one BDFB panel; distribute high-current loads across panels to prevent a single panel or feed cable from overloading. BATTERY STRING BALANCE: if a plant has multiple parallel strings, each string should contribute approximately equal current — unequal contributions indicate one string has higher internal resistance (aging cells) or a fuse/connection problem. Measuring string currents (clamp meter at each string fuse) during load gives the picture; a string contributing 30% of its peers is an early finding for a string that will fail the next capacity test.',
        ],
        keyPoints: [
          'LVD at ~42 V disconnects non-critical loads to preserve battery runtime for critical loads — investigate WHY it operated',
          'Millivolt-drop hunt: measure between equal-potential points under load; resistance at any connection is the fault',
          'LUG torque is the #1 PM item: loose lugs are the leading cause of millivolt drops and connection failures',
          'String current balance: unequal string contributions reveal high-resistance (aging) strings before they fail capacity',
        ],
        quiz: [
          {
            q: 'A plant\'s LVD operated during last night\'s 30-minute utility outage. The site has a 4-hour reserve-time battery design. The most likely finding is:',
            a: ['The LVD setpoint is set too high and should be lowered', 'Battery capacity has degraded significantly below the design reserve — the strings can no longer sustain full load for the required period before reaching 42 V', 'The rectifiers failed — LVD only operates when rectifiers fault', 'Normal operation at the end of a 4-hour reserve'],
            correct: 1,
            exp: 'A 30-minute discharge reaching the LVD threshold on a 4-hour design means the batteries are delivering only ~12% of their rated capacity — likely failed strings that have not been capacity tested recently.',
          },
          {
            q: 'A millivolt-drop measurement between the source bus bar and the equipment frame terminal reads 45 mV at 200 A of load. The milliohm resistance this represents, and the appropriate action, are:',
            a: ['0.045 mΩ — acceptable', '0.225 mΩ — investigate: 45 mV / 200 A = 0.225 mΩ; this drop is above specification for a direct bus connection and suggests a loose lug or oxidized contact', '45 mΩ — replace all wiring', '2.25 mΩ — shut down the load immediately'],
            correct: 1,
            exp: 'R = V/I = 0.045 V / 200 A = 0.225 mΩ. For a direct low-resistance bus connection this is elevated; check and retorque all lugs between the two measurement points.',
          },
        ],
      },
    ],
    test: [
      { q: 'The MBDFB in a DC plant is:', a: ['The main battery backup for distribution failures', 'Main Battery Distribution Fuse Board — the primary distribution point off the rectifier bus feeding BDFBs and battery string fuses', 'A monitoring protocol for battery systems', 'A type of grounding device'], correct: 1, exp: 'MBDFB is the top-of-distribution hardware: rectifier bus feeds it, battery strings connect through it, and it distributes to BDFBs.' },
      { q: 'Live DC bus work always requires:', a: ['AC LOTO procedures', 'Insulated tools, one conductor at a time, no jewelry, polarity verification — the bus cannot be de-energized while batteries are connected', 'The utility to be off', 'A second person only'], correct: 1, exp: 'The battery holds the bus regardless of rectifier and utility state. All DC plant work is live-bus work by definition.' },
      { q: 'DC fuses must not be substituted with AC fuses because:', a: ['They have different form factors', 'DC arcs do not self-extinguish at current zero (there is no current zero in DC) — DC-rated fuses have arc-interruption capability for sustained DC arcs', 'AC fuses blow too slowly', 'Voltage ratings are unrelated'], correct: 1, exp: 'DC arc interruption is fundamentally harder than AC: no zero-crossing means the arc must be physically stretched and cooled. DC fuses are specifically designed for this.' },
      { q: 'A fuse that clears repeatedly after replacement indicates:', a: ['Defective replacement fuses', 'A real overload or short on the load side — measure load resistance before installing another fuse', 'The battery voltage is too high', 'Normal cold-start transient behavior'], correct: 1, exp: 'One clearing can be a transient; repeated clearing is a real fault. Measure the load circuit before the next replacement.' },
      { q: 'LVD (Low-Voltage Disconnect) is designed to:', a: ['Protect batteries from overcharge', 'Disconnect non-critical loads when bus voltage falls to threshold (~42 V), sacrificing them to preserve runtime for critical loads', 'Prevent the generator from starting', 'Disconnect the rectifiers from the AC feed'], correct: 1, exp: 'LVD is load-shedding to preserve battery runtime for revenue-generating equipment — the last line of defense against a total site blackout.' },
      { q: 'A millivolt-drop hunt localizes resistance by:', a: ['Measuring current at each battery string', 'Measuring DC voltage between equal-potential points under load — the drop localizes to the connection or conductor with elevated resistance', 'Checking the plant controller alarms', 'Pulling BDFB fuses one at a time'], correct: 1, exp: 'Equal-potential points under load should show zero drop. A measured drop localizes to the section between the two measurement points — then work the section point by point.' },
      { q: 'The leading cause of millivolt drops in DC plant connections is:', a: ['Undersized battery strings', 'Loose lug connections — torque drift over time creates oxidized, resistive interfaces under high current', 'Oversized fuses', 'High ambient temperature'], correct: 1, exp: 'Lug torque is a PM item for exactly this reason. Loose lugs oxidize, resistance rises, voltage drops steal bus voltage from equipment.' },
      { q: 'Battery string current balance is checked by:', a: ['Measuring bus voltage only', 'Clamp-metering each string\'s fuse output under load — unequal contributions reveal high-resistance or aging strings', 'Reading the plant controller battery voltage display', 'Running an equalize cycle'], correct: 1, exp: 'String current balance requires individual string current measurement under load — the controller\'s bus voltage does not reveal per-string contribution differences.' },
      { q: 'Reversed polarity when connecting a DC load causes:', a: ['A slow over-temperature fault', 'Instant equipment damage — DC systems have no phase reversal protection; reversed polarity applies voltage in the wrong direction to sensitive electronics', 'The LVD to operate', 'A fuse to clear only if the current exceeds rated'], correct: 1, exp: 'Polarity verification before connecting any DC load is a non-negotiable step — reversed polarity destroys equipment without necessarily clearing a fuse.' },
      { q: 'BDFB load balancing ensures:', a: ['All batteries share equal current', 'Heavy-current equipment frames are distributed across panels so no single panel or feed cable is overloaded', 'All rectifiers share equal load', 'The LVD threshold is never reached'], correct: 1, exp: 'Concentrating high-current loads on one BDFB overloads that panel and its feed cable. Distribution across panels keeps each within rating.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 16 — CELL SITES, HUTS & OUTSIDE PLANT POWER
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dcp-sites',
    num: 16,
    title: 'Cell Sites, Huts & Outside Plant Power',
    desc: 'Site anatomy, reserve-time discipline, generator connections, remote monitoring, storm response, and RF safety on tower sites.',
    slides: [
      {
        title: 'Site Anatomy and the Reserve-Time Religion',
        body: [
          'A typical macro cell site has three power domains working together: the SHELTER POWER system (the DC plant and its AC feed), the TOWER LOADS (radio equipment, antennas, and their mounting — the actual revenue-generating hardware), and the ENVIRONMENTAL SYSTEMS (HVAC, lighting, security, cameras — non-critical loads from the DC plant\'s LVD perspective). SHELTER TYPES vary: ground-level equipment shelters (climate-controlled steel buildings), equipment cabinets on concrete pads (huts — smaller footprint, climate-controlled), and rooftop installations in urban environments. The DC plant lives in the shelter or hut: rectifier shelf, battery strings (flooded lead-acid or VRLA), plant controller, distribution panels. Tower or rooftop equipment connects via DC cable runs from the shelter — cable runs of 50–200 feet that must be sized for voltage drop at the DC current levels involved.',
          'RESERVE TIME is not just a specification — it is the metric that network operations tracks after every outage and that drives site investment. A site that goes "dark" (equipment loses power before generator transfer) is a network event with financial and regulatory consequences for the carrier. The reserve-time discipline means: (1) BATTERY CAPACITY TESTING on a defined schedule (annual for VRLA, more frequently as strings age past 80% of life) to verify Ah delivery has not degraded below the reserve requirement; (2) SITE LOAD AUDITING to confirm total draw has not grown beyond the battery design (added radios, new RRH equipment, LTE/5G upgrades all add load); (3) GENERATOR TEST RUNS on schedule to confirm start reliability; (4) DOCUMENTATION of actual reserve time achieved in the last outage event. A field tech who notes that a 4-hour site discharged to LVD in 90 minutes is filing a critical finding, not a routine service note.',
          'PORTABLE GENSET CONNECTIONS at cell sites are the outside-plant tech\'s most hazard-dense task. A PORTABLE GENERATOR connected to a cell site MUST connect through a transfer point that DISCONNECTS THE UTILITY FEED before the generator connects — this is both a code requirement (NEC 702 for optional standby) and a life-safety requirement (a generator backfeeding utility lines can kill the line crew restoring the outage). Many cell sites have a dedicated GENSET RECEPTACLE on the outside of the shelter with an interlocked connection that mechanically prevents simultaneous connection of utility and generator. BEFORE CONNECTING THE GENSET: verify the utility disconnect is open, verify the genset is running at stable voltage and frequency, then connect and transfer. After the utility restores and stabilizes: transfer back to utility, then disconnect and stop the genset. Never parallel a portable genset to utility power.',
        ],
        keyPoints: [
          'Site anatomy: shelter (DC plant) → tower/equipment (revenue loads) → environmental (LVD-shedable)',
          'Reserve time is a tracked SLA metric: capacity testing, load auditing, and generator testing maintain it',
          'A site that LVD-trips in 90 min vs a 4-hour design is a critical finding, not a routine note',
          'Portable genset: utility disconnect open BEFORE genset connection — never parallel to utility',
        ],
        quiz: [
          {
            q: 'A field tech services a cell site and notes the reserve time achieved during last week\'s 45-minute outage was 45 minutes — but the site is designed for 4 hours. The correct reporting action is:',
            a: ['Note it in the service log and move on', 'File a critical finding: battery capacity has failed to less than 20% of design — the site will go dark on the next 1-hour outage', 'Increase the LVD threshold to buy more reserve time', 'The 45-minute outage was too short to verify anything'],
            correct: 1,
            exp: 'A 4-hour design discharging to LVD in 45 minutes means battery capacity is below 20% of rated. This is a high-priority finding requiring immediate string replacement or augmentation.',
          },
          {
            q: 'Before connecting a portable generator to a cell site\'s genset receptacle during a utility outage, the required first step is:',
            a: ['Start the generator first, then connect', 'Verify the utility disconnect is open — the interlock should enforce this, but verify independently before connecting', 'Get NOC approval first', 'Disconnect the battery strings'],
            correct: 1,
            exp: 'Utility disconnect open = no backfeed risk. This is the first and non-negotiable step regardless of whether the site has interlocking hardware — verify, do not assume.',
          },
        ],
      },
      {
        title: 'Remote Monitoring, Storm Response, and RF Safety',
        body: [
          'REMOTE MONITORING at cell sites is the operational infrastructure that makes route work possible: each site\'s plant controller reports alarm states, battery voltage, load current, rectifier status, temperature, and door/environmental sensor states to the carrier NOC via SNMP, cellular modem, or dedicated data circuit. The NOC sees every site\'s status on a dashboard and dispatches to sites with active alarms. The field tech\'s relationship to remote monitoring is bidirectional: READ the remote monitoring data before dispatch (what does the NOC see? what time did the alarm trigger? what was the bus voltage trend?) and UPDATE the NOC after service (cleared the alarm, replaced brick #3, bus voltage now normal). A cleared alarm reported only in the local service log but not communicated to the NOC results in duplicate dispatches from the NOC team who still sees the alarm — NOC coordination is a professional basic.',
          'STORM RESPONSE is the highest-intensity operating mode in the cell site world. When a storm tracks across a service territory, carriers activate elevated operational postures: field techs pre-position at strategic points, portable gensets are staged at fuel-hungry sites, NOC increases polling frequency on at-risk sites, and the priority list for dispatch is set before the storm makes the decisions for you. TRIAGE ORDER during widespread outages: (1) sites that have already gone dark (LVD operated, loads lost) — restore power immediately; (2) sites at critical battery state — genset connection before they go dark; (3) sites with generator failures — restore generator reliability while battery holds; (4) sites with full reserve and running generator — monitor only. The carrier and NOC set the priority list; the field tech executes it. Understanding the triage logic helps you push back when a dispatch priority seems wrong.',
          'RF AWARENESS ON TOWER SITES is the safety domain unique to cell site work. RADIO FREQUENCY (RF) ENERGY from transmitting antennas can cause THERMAL BURNS to tissue in proximity — the risk is real at the power levels of cell site transmitters (up to hundreds of watts of RF at the antenna port, which translates to high power density near the antenna face). FCC regulations and carrier RF safety programs define MINIMUM APPROACH DISTANCES to energized antennas. AS A POWER PLANT TECH: you are on the site, not on the tower, and the power plant work is in the shelter — but if work takes you onto a rooftop or near the antenna array (rare for DC power work, common during multi-trade outage responses), the RF safety rules apply. SITE ENTRY PROCEDURES include reviewing the RF environment, and carriers typically require proof of RF safety training (OSHA RF awareness) before granting tower access. The short version: if you are working in the shelter, you are not in the RF zone; if anything takes you above the shelter roof, ask about RF status before proceeding.',
        ],
        keyPoints: [
          'Close the loop with the NOC after every service call — clear the alarm at the NOC, not just in the local log',
          'Storm triage order: sites already dark → critical battery state → generator failures → monitored sites',
          'RF on tower sites: thermal burn risk near transmitting antennas; minimum approach distances apply to all workers on the site',
          'DC power work stays in the shelter — if anything takes you near the antenna array, confirm RF safety status',
        ],
        quiz: [
          {
            q: 'After replacing a failed rectifier brick and confirming the plant is normal, the field tech\'s last communication action is:',
            a: ['Nothing — the plant controller will auto-clear the alarm', 'Contact the NOC to confirm the alarm has cleared at the monitoring system and log the repair action', 'Email the site owner', 'Log it in the truck\'s dispatch system only'],
            correct: 1,
            exp: 'Plant controllers sometimes require manual clear or NOC confirmation to close an alarm. If the NOC still sees the alarm, a duplicate dispatch is generated. Always close the loop.',
          },
          {
            q: 'During storm operations, a field tech receives two dispatch orders simultaneously: Site A has been dark (LVD operated, loads lost) for 20 minutes; Site B has 2 hours of battery remaining but its generator has not started. Priority is:',
            a: ['Site B — preventing the outage is more important than recovering from one', 'Site A — restoring a dark site immediately is the top priority; site B has time and the battery is the safety margin for that time', 'Flip a coin — both are equal priority', 'Call the NOC for guidance, then wait'],
            correct: 1,
            exp: 'Triage order: dark sites first. Site A is already causing a network outage — every minute of darkness is real impact. Site B has 2 hours of margin — head to Site A now, NOC coordinates Site B coverage.',
          },
        ],
      },
    ],
    test: [
      { q: 'The three power domains at a typical macro cell site are:', a: ['Rectifiers, batteries, distribution', 'Shelter power (DC plant), tower/revenue loads, and environmental systems (LVD-shedable)', 'AC feed, backup generator, solar', 'Carrier network, backhaul, and power'], correct: 1, exp: 'Site anatomy in power terms: the DC plant in the shelter, the revenue-generating radio loads on the tower, and environmental support loads that the LVD can shed.' },
      { q: 'Reserve time is maintained by:', a: ['Increasing the number of rectifiers', 'Periodic battery capacity testing, site load auditing, and generator test runs — all three must be current for reserve time to be valid', 'Running the plant controller at a lower voltage', 'Increasing LVD threshold'], correct: 1, exp: 'Reserve time is the intersection of battery capacity (Ah tested), load (A measured), and generator reliability — all three degrade independently and must be tracked.' },
      { q: 'A 4-hour reserve site that reaches LVD after 45 minutes of utility outage indicates:', a: ['The LVD threshold is set too high', 'Battery capacity has degraded to less than 20% of design — a high-priority finding for string replacement', 'Normal variation in reserve time estimates', 'The site load increased slightly'], correct: 1, exp: '45 min / 4 hour design = ~19% capacity. This is a critical deficiency requiring immediate action, not a service note.' },
      { q: 'Before connecting a portable genset to a cell site, the non-negotiable first step is:', a: ['Start the genset and let it warm up', 'Verify the utility disconnect is open — prevent backfeed that could injure utility line crews', 'Disconnect the battery strings', 'Get NOC permission'], correct: 1, exp: 'Utility open = no backfeed risk. Always verify this independently even if an interlock is supposed to enforce it.' },
      { q: 'After clearing an alarm at the cell site, the field tech must:', a: ['Only log it in the service record', 'Also confirm with the NOC that the alarm has cleared in the monitoring system — failure to close the loop results in a duplicate dispatch', 'Send an email to the NOC manager', 'Wait 24 hours for auto-clear'], correct: 1, exp: 'NOC loop closure is a professional basic. The monitoring system may not auto-clear; the NOC team needs a technician confirmation to close the event.' },
      { q: 'During storm response, the dispatch priority for a site with 90 minutes of battery remaining and a failed generator is:', a: ['Highest — loss is imminent', 'Second tier: the site has margin while sites already dark are the first priority', 'Lowest — it is still running', 'Equal to a dark site'], correct: 1, exp: 'Triage: dark sites first (already impacting the network), then sites with margin approaching exhaustion, then generator failures with buffer, then monitored stable sites.' },
      { q: 'RF thermal burn risk near cell site antennas is due to:', a: ['Electrical shock from the antenna terminals', 'Radio frequency energy from transmitting antennas depositing heat in tissue at close range — real risk at cell site power levels', 'UV radiation from the tower lighting', 'Battery off-gassing near the tower'], correct: 1, exp: 'RF at transmitter power levels creates localized tissue heating at close range to the antenna — the occupational safety concern for tower-proximity work.' },
      { q: 'For a DC power plant technician, the RF zone on a cell site typically is:', a: ['Everywhere on the site', 'Not in the shelter — DC power work is in the shelter; above-roof or antenna-proximity work requires RF safety awareness and clearance', 'In the battery room only', 'In the BDFB panel area'], correct: 1, exp: 'DC plant work stays in the shelter. RF risk increases only if work takes the tech near or above the roofline to the antenna arrays — at which point RF status must be confirmed.' },
      { q: 'Cable voltage drop from shelter to tower equipment at high DC current is managed by:', a: ['Using smaller gauge wire to reduce resistance', 'Sizing cable for the current and run length to keep voltage drop within equipment specifications — undersized cables steal effective bus voltage from loads', 'Running AC to the tower instead', 'Increasing float voltage to compensate'], correct: 1, exp: 'Long DC cable runs at high current (100+ A) require careful conductor sizing; millivolt drops over 50–100 feet add up and reduce effective voltage at the equipment.' },
      { q: 'A site load audit is performed to:', a: ['Verify the battery string count', 'Confirm total DC load has not grown beyond the battery reserve-time design — new radio equipment adds load invisibly over time', 'Check the AC feed voltage', 'Test the LVD threshold'], correct: 1, exp: 'Network equipment additions (LTE/5G upgrades, new RRH units) increase site load without triggering a formal design review — the load audit catches this drift before it shrinks reserve time silently.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 17 — CAREER IN TELECOM POWER
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dcp-career',
    num: 17,
    title: 'Career in Telecom Power',
    desc: 'Carriers, tower companies, contractors, certifications, storm response realities, and career paths in telecom DC power.',
    slides: [
      {
        title: 'The Telecom Power Market and Your Role',
        body: [
          'Telecom DC power is one of the most persistent trades in the electrical services world — the network never stops, the batteries always need service, and the infrastructure buildout for 5G and Open RAN is adding new sites faster than the existing ones are being retired. The EMPLOYER LANDSCAPE divides into four groups: NATIONAL CARRIERS (AT&T, Verizon, T-Mobile and their tower portfolios) employ in-house field technicians and power engineers for their managed sites; TOWER COMPANIES (American Tower, Crown Castle, SBA Communications) own the physical tower structures and increasingly the on-site power infrastructure, employing power techs for their own plant maintenance contracts; NETWORK CONTRACTORS (major services companies that do outsourced NOC, field maintenance, and buildout work for carriers) are the largest single employer of telecom power techs; and BATTERY SERVICE COMPANIES (specialized firms that do string replacement, capacity testing, and BESS commissioning across all industries including telecom) serve all of the above.',
          'WHAT THE JOB ACTUALLY IS: telecom DC power work is route-based for most field tech roles. A route tech carries a territory of 50–200 sites, makes scheduled PM visits (quarterly battery inspections, annual capacity tests, controller calibrations, generator test runs), and responds to NOC-dispatched alarms for their sites. Storm response collapses the route into emergency mode: sustained 16-hour days, fuel runs for portable gensets, overnight site sits at critical locations during and after major events. The work is largely solo — one tech, one truck, one site at a time — which rewards self-directed judgment, NOC communication skills, and the ability to diagnose independently without calling for help every hour. The generator course\'s "reserve time" vocabulary and the battery course\'s testing knowledge are the daily tools; this course\'s plant architecture knowledge is what distinguishes a power tech from a generic field tech.',
          'COMPENSATION AND ENTRY POINTS: Jr. Telecom Power Technician roles (where this credential applies) typically enter at $20–$30/hour for route work, with progression to $35–$55/hour for senior power techs carrying larger territories or critical-site responsibility. STORM RESPONSE PAY — overtime and hazard differentials during declared disasters — can significantly supplement base compensation for field techs willing to deploy. Per-diem multi-state deployment roles during storm recovery are the aggressive income path for mobile techs. CAREER CEILING is higher than most trade careers: power engineers (PE-licensed or with senior carrier experience) designing plant infrastructure earn $80,000–$130,000+/year; NOC operations managers overseeing national site portfolios are comparably compensated.',
        ],
        keyPoints: [
          'Four employer groups: national carriers, tower companies, network contractors, battery service specialists',
          'Route-based work: 50–200 sites per territory, PM visits plus NOC-dispatched alarm response',
          'Storm response: the defining intensity event — overtime-compensated, logistically demanding, reputation-building',
          'Jr. entry: $20–$30/hr; senior power tech: $35–$55/hr; power engineer ceiling: $80,000–$130,000+',
        ],
        quiz: [
          {
            q: 'Tower companies (American Tower, Crown Castle) differ from national carriers as employers because:',
            a: ['They do not employ power technicians', 'They own the physical tower infrastructure and maintain the site power plant independent of the carrier tenants — their power tech role focuses on the infrastructure, not the carrier\'s network equipment', 'They only employ licensed electricians', 'They only do solar power installations'],
            correct: 1,
            exp: 'Tower companies are neutral hosts to multiple carriers on one tower — they maintain the shared infrastructure (power, shelter, ground system) while carriers maintain their own radio equipment on the structure.',
          },
          {
            q: 'Storm response work is significant for telecom power techs because:',
            a: ['It is mandatory unpaid overtime', 'It is overtime-compensated, often with hazard differentials, and represents a significant income multiplier for field techs deployed during disaster recovery', 'It only involves generator fueling', 'Carriers never pay overtime during storms'],
            correct: 1,
            exp: 'Storm deployment is premium-compensated work. Techs who build a reputation for reliable storm deployment are preferentially dispatched to high-value recovery missions.',
          },
        ],
      },
      {
        title: 'Certifications, Route Work, and Career Paths',
        body: [
          'CARRIER-SPECIFIC QUALIFICATIONS are the credential currency in telecom power. Unlike EVITP or NFPA 70E (which are industry-wide standards), most large carriers maintain their own training and qualification programs for technicians working on their infrastructure: AT&T\'s vendor qualification programs, Verizon\'s NEBS (Network Equipment Building System) standards literacy requirements, and T-Mobile\'s contractor certification processes all have specific elements. These are in addition to, not instead of, general power credentials. The path: this portal\'s credential establishes foundational knowledge; then the specific carrier or tower company qualification program completes the operational authorization for their specific equipment platforms (Emerson Liebert rectifiers, Alpha Technologies, Vertiv, Arguss — each has platform-specific service training). The foundation is the translator across platforms; the platform training is the working authorization.',
          'NEBS (Network Equipment Building System) is the carrier standard governing equipment that goes into central offices and cell sites: temperature, seismic, fire safety, EMI, and installation requirements. A tech working in carrier environments will encounter NEBS-compliant equipment and must understand that NEBS-specified installation requirements (bonding, grounding, clearances) are not optional — carriers audit compliance and failed installations are rejected or decommissioned. The most practical NEBS element for power techs: GROUNDING AND BONDING requirements in NEBS GR-1089 specify exactly how every conductive element in a central office or shelter must be bonded to the main ground bar, and how connections must be made and documented. A DC plant installed to NEBS-grounding standards has predictable, auditable, and safe return paths — an installation that skips NEBS bonding creates the return-path resistance problems that generate the millivolt-drop complaints of module 15.',
          'CAREER PATHS from DC plant tech follow predictable progressions: FIELD TECHNICIAN (route work, PM, alarm response) → SENIOR POWER TECH (larger territory, critical sites, junior tech mentoring) → POWER ENGINEER (infrastructure design, DC plant specifications, carrier standards compliance — often requires EE or related degree, or equivalent field experience recognized by the carrier) → OPERATIONS CENTER (NOC power analyst, managing alert queues and dispatch for a regional portfolio — off the truck, office-based). A parallel path runs to MULTI-DISCIPLINE FIELD WORK: the tech who understands DC plants, UPS systems, and generators is the "all-in-one" field engineer carriers increasingly prefer — one resource who can troubleshoot any element of the power infrastructure chain. The trades covered by this portal are engineered to develop exactly that profile.',
        ],
        keyPoints: [
          'Carrier qualifications are platform-specific and in addition to foundational credentials — this portal translates across platforms',
          'NEBS GR-1089 governs bonding and grounding in carrier facilities — non-compliance triggers audits and rejections',
          'Multi-discipline profile (DC plant + UPS + generator) is the carrier\'s preferred single-resource deployment',
          'Career ceiling: power engineer or NOC operations at $80,000–$130,000+ for field-to-management transitions',
        ],
        quiz: [
          {
            q: 'A carrier\'s NEBS GR-1089 compliance requirement for a DC plant installation means:',
            a: ['The equipment must be painted a specific color', 'All conductive elements must be bonded to the main ground bar per specified methods, documented and auditable — non-compliance is a rejected installation', 'Only battery strings are covered', 'NEBS only applies to radio equipment, not power plants'],
            correct: 1,
            exp: 'NEBS GR-1089 governs bonding and grounding comprehensively. Non-compliant installations fail carrier audits and must be corrected before acceptance — the compliance documentation is as important as the physical work.',
          },
          {
            q: 'The most valued field technician profile in modern carrier telecom power work is:',
            a: ['A specialist in only DC plant rectifiers', 'Multi-discipline: DC plant, UPS, and generator in one resource — carriers prefer deploying one tech who can troubleshoot the full power chain', 'A licensed electrician only', 'A NOC analyst who has never been on a site'],
            correct: 1,
            exp: 'Carriers minimize truck rolls and maximize site resolution rates by preferring techs who can diagnose and resolve any power element on the site. The portal\'s multi-course structure builds exactly this profile.',
          },
        ],
      },
    ],
    test: [
      { q: 'Tower companies (American Tower, Crown Castle) employ power technicians to:', a: ['Maintain only the carrier\'s radio equipment', 'Maintain the shared site infrastructure — power plant, shelter, grounding, generator — independent of the carrier tenants', 'Only install new towers', 'Manage the NOC alarm queue'], correct: 1, exp: 'Tower companies are neutral infrastructure hosts. Their power tech role covers the shared plant that all carrier tenants depend on.' },
      { q: 'A route-based DC power tech typically maintains:', a: ['One critical central office', '50–200 cell sites per territory with scheduled PMs and NOC-dispatched alarm response', 'Only sites during storm response', 'Only new construction sites'], correct: 1, exp: 'Route work is the daily reality: a territory of sites, regular PM visits, and alarm-driven emergency response. Solo, truck-based, judgment-intensive.' },
      { q: 'Storm response work is financially significant for telecom power techs because:', a: ['Carriers waive normal billing during storms', 'Overtime and hazard differentials during disaster events significantly supplement base compensation', 'Storm response is unpaid volunteering', 'It only lasts a few hours'], correct: 1, exp: 'Extended deployment during storms at overtime rates with hazard differentials can equal months of normal income in days — a meaningful career factor for mobile field techs.' },
      { q: 'Carrier-specific qualification programs (AT&T, Verizon, T-Mobile) are:', a: ['Replacements for this portal\'s credential', 'In addition to foundational credentials — they authorize work on specific carrier platforms and equipment; the foundation translates across all of them', 'Only required for management roles', 'Optional for contract workers'], correct: 1, exp: 'Platform qualifications layer on top of foundational knowledge. The foundation enables the tech to learn any platform faster; the platform training authorizes specific site work.' },
      { q: 'NEBS GR-1089 is most relevant to DC power techs because:', a: ['It specifies battery chemistry standards', 'It governs bonding and grounding requirements in carrier facilities — the same practices that prevent the millivolt-drop and return-path problems of field service', 'It defines rectifier voltage ranges', 'It only applies to new construction, not field service'], correct: 1, exp: 'Proper bonding and grounding per NEBS GR-1089 is the installation standard that field service must maintain and restore. Understanding it makes compliance audits understandable, not arbitrary.' },
      { q: 'The multi-discipline tech profile (DC plant + UPS + generator) is preferred by carriers because:', a: ['It reduces hiring costs only', 'One resource can troubleshoot and resolve any element of the site power chain — minimizing truck rolls, dispatch complexity, and site downtime', 'Carriers want fewer employees', 'It is an OSHA requirement'], correct: 1, exp: 'Multi-discipline capability directly translates to faster site resolution and fewer escalated dispatches. This is the carrier\'s operational preference and the field tech\'s career differentiator.' },
      { q: 'Jr. Telecom Power Technician entry compensation is approximately:', a: ['$12–$15/hour', '$20–$30/hour for route-based field work', '$50/hour immediately', '$80,000/year at entry'], correct: 1, exp: 'Jr. telecom power tech entry is $20–$30/hr, scaling to $35–$55/hr at senior level, with engineering and management paths above that.' },
      { q: 'The career path from field tech to power engineer typically requires:', a: ['Only storm response experience', 'Accumulated field experience recognized by the carrier, or an EE/technical degree — the engineering role designs plant infrastructure rather than servicing it', 'Completing only this course', 'A licensed electrician credential only'], correct: 1, exp: 'Power engineer roles involve infrastructure design and carrier standards compliance — they require demonstrated technical depth beyond field service, typically via degree or extensive senior field experience.' },
      { q: 'The NOC operations analyst career path differs from field tech by:', a: ['Being a demotion', 'Moving from truck-based site response to office-based alarm management, dispatch coordination, and portfolio monitoring — off the road, higher complexity', 'Requiring no technical knowledge', 'Paying significantly less'], correct: 1, exp: 'NOC analyst roles leverage field experience for remote diagnosis and dispatch coordination. They are office-based, often regionally or nationally scoped, and represent a promotion track for techs who prefer operations to field work.' },
      { q: 'A telecom power tech\'s most distinctive daily tool compared to a generic field tech is:', a: ['A larger truck', 'Mastery of the DC plant architecture, battery reserve-time management, and carrier-specific plant controller systems', 'A licensed electrician credential', 'Knowledge of RF safety only'], correct: 1, exp: 'DC plant architecture, reserve-time discipline, and plant controller literacy are what a telecom power specialist brings that a generic field tech does not. This course builds that distinctive knowledge base.' },
    ],
  },
];
