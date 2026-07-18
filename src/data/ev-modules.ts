import type { TrainingModule } from './modules';

// EV Charging Infrastructure course — course-specific modules (positions 11-18).
// The sequence is: shared foundation 1-10, then these. Kept OUT of ALL_MODULES.

export const EV_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 11 — CHARGING LEVELS, STANDARDS & CONNECTORS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ev-charging-levels',
    num: 11,
    title: 'Charging Levels, Standards & Connectors',
    desc: 'L1/L2/DCFC, J1772, CCS, NACS — the landscape of charging standards and the handshake between car and charger.',
    slides: [
      {
        title: 'The Three Levels and the Connector Zoo',
        body: [
          'EV charging divides by power level, and the levels define the job: LEVEL 1 is a standard 120 V outlet delivering 1.4–1.9 kW — the overnight dribble-charger that costs nearly nothing to install and takes 18–40 hours to fill a pack from empty. Most drivers never need more, but most will never see a field service call on it either — it is a cord set attached to the car, not a piece of infrastructure. LEVEL 2 is 240 V, 16–80 A, 3.8–19.2 kW — the EVSE (Electric Vehicle Supply Equipment) installed at homes, workplaces, and destination locations. L2 is your daily bread: real hardware, NEC 625 scope, contactor-based units with pilot signal boards, metering, and a connector. DCFC (DC Fast Charging) starts around 25 kW and scales past 350 kW in current deployments — a power plant in a parking lot, converting three-phase AC to high-voltage DC on-board the charger, not the vehicle. "Fast charger" is sometimes written DC Fast Charger (DCFC) or simply "Level 3," though Level 3 is informal. As a tech you will use Level 1 and 2 and DCFC.',
          'The connector landscape is in transition and the history matters for fleet work: J1772 (the "J-plug") is the SAE standard for L1/L2 and was universal in North America for a decade — a five-pin AC connector with a mechanical latch and a dedicated control pilot pin. CCS (Combined Charging System) extends J1772 with two DC pins below, allowing the same inlet to accept L2 AC and DCFC DC sessions — the dominant DCFC standard in the US through most of the 2020s. NACS (North American Charging Standard, originally Tesla\'s proprietary connector) carries AC or DC in a compact two-pin form factor; following Tesla\'s licensing of the standard and the industry\'s broad adoption, NACS has become the US default for new models, with most automakers committed. CHAdeMO is the legacy Japanese DCFC standard — still in service at older Nissan Leaf stations and some commercial fleets, but declining fast. Service implication: adapter cables and multi-standard DCFC units become field service vocabulary; confirm inlet type and adapter availability before dispatching.',
          'MEGAWATT CHARGING SYSTEM (MCS) is the emerging standard for commercial truck depots — 1+ MW per session. It won\'t appear in your service territory for a few years, but its architecture (dedicated substation-class infrastructure per site) is the outer edge of the site-power discussion in module 16.',
        ],
        tables: [
          {
            caption: 'Charging level comparison',
            headers: ['Level', 'Voltage', 'Typical power', 'Session time (empty → 200 mi)', 'Connector (US)'],
            rows: [
              ['L1', '120 V AC, 1Ø', '1.4–1.9 kW', '20–40 hours', 'J1772 or NACS'],
              ['L2', '240 V AC, 1Ø/3Ø', '3.8–19.2 kW', '3–8 hours', 'J1772 or NACS'],
              ['DCFC', '400–1000 V DC', '25–350+ kW', '15–45 minutes', 'CCS or NACS'],
            ],
          },
        ],
        keyPoints: [
          'L1 = cord set on the car; L2 = installed EVSE; DCFC = on-site AC-to-DC power plant',
          'J1772 (AC), CCS (AC + DC pins), NACS (AC or DC, compact) — know your connectors before dispatch',
          'CHAdeMO is legacy and declining; confirm inlet type for fleet calls',
          'DCFC power levels matter for site power and demand charges (module 16)',
        ],
        quiz: [
          {
            q: 'A commercial vehicle fleet uses CHAdeMO connectors on their older Nissan Leafs and is adding new vehicles with NACS inlets. The field service reality is:',
            a: ['All chargers work with all connectors', 'Fleet may need adapter cables or mixed-standard chargers; verify inlet and adapter availability before dispatch', 'CHAdeMO and NACS are identical', 'Only DCFC stations are affected'],
            correct: 1,
            exp: 'Connector standards coexist in real fleets. Adapter availability and charger compatibility are pre-dispatch questions, not surprises discovered on-site.',
          },
          {
            q: 'A customer says their Level 2 EVSE feels hot and charges slowly. "Level 2 EVSE" means you are dealing with:',
            a: ['A 120 V cord set attached to the car', 'An installed 240 V supply unit with a contactor, pilot board, and connector — actual hardware to service', 'A DCFC that is derated', 'A utility transformer'],
            correct: 1,
            exp: 'L2 EVSE is real infrastructure: contactor, pilot signal circuit, metering, connector — all serviceable components with real failure modes.',
          },
        ],
      },
      {
        title: 'The Charging Handshake: Control Pilot and EVSE States',
        body: [
          'The J1772 CONTROL PILOT signal is the invisible handshake that makes EV charging safe — and it is the first thing to understand when L2 sessions fail or refuse to start. The pilot is a 1 kHz square wave (±12 V) generated by the EVSE on a dedicated pin in the connector. The vehicle\'s onboard charger reads this signal and responds by closing a resistor across the pilot to ground, which the EVSE detects as a voltage level shift. This two-way dialog defines four key states: STATE A (+12 V) is standby — no vehicle connected; STATE B (±9 V) is vehicle connected, not ready — the car\'s pilot resistor has loaded the line; STATE C (±6 V) is vehicle ready to charge, relay closed request — the EVSE may now close its contactor and apply power; STATE D (±3 V) adds ventilation requirement (rare for BEVs, used for some PHEVs and hydrogen). The pilot\'s DUTY CYCLE communicates the EVSE\'s maximum current offer: a 50% duty cycle means 25 A, roughly, per the J1772 encoding table. Service shortcut: a session that connects but never starts is often a pilot signal fault — bad pilot board, corroded pilot pin, or wiring break between the board and connector.',
          'EVSE STATES E and F signal fault conditions: State E is a pilot signal collapse (short to ground — vehicle detected a ground fault or EVSE hardware error); State F is EVSE indicating a fault (no pilot signal). Field meters often have a J1772 pilot-test mode; a quality clamp and scope confirm the ±12 V, 1 kHz waveform. Pilot signal issues rarely leave evidence elsewhere — the session just refuses, and the vehicle may or may not show an error. Learn to go to the pilot circuit when "connects but won\'t charge" arrives.',
          'DCFC uses a different communication layer: ISO 15118 (PLC over pilot) for CCS/NACS smart charging, CHAdeMO\'s own CAN-based protocol for CHAdeMO, and at power levels above roughly 80 kW, AUTOMATIC NEGOTIATION of DC voltage and current between charger and vehicle. The charger does not simply apply voltage — it negotiates a target, the vehicle\'s BMS confirms, and the charger ramps. COMMUNICATION FAULTS at DCFC (protocol errors, CAN bus noise, PLC glitches) are a distinct fault family from power hardware faults, and they are where network-connected diagnostics (module 15) earn their keep.',
        ],
        keyPoints: [
          'J1772 pilot: 1 kHz PWM, ±12 V; state B → vehicle connected, state C → charge authorized',
          'Duty cycle encodes max current offer; "connects but won\'t charge" = check pilot first',
          'States E/F = fault conditions; scope or pilot-mode meter confirms waveform health',
          'DCFC uses ISO 15118 / CHAdeMO CAN for voltage/current negotiation — comm faults are their own family',
        ],
        quiz: [
          {
            q: 'A customer\'s L2 EVSE connects to their car but never initiates a session. The pilot circuit reads State B (±9 V) and never transitions to State C. The most productive first check is:',
            a: ['Replace the contactor', 'Pilot circuit integrity: pilot pin condition on the connector, pilot board output, and wiring between them', 'Utility voltage', 'Firmware version'],
            correct: 1,
            exp: 'State B means the vehicle answered the EVSE; the handshake then failed. Pilot board output and connector pin condition are the transition-to-State-C failure path.',
          },
          {
            q: 'A DCFC session fails with a "communication error" immediately after the vehicle plugs in. Power electronics check out fine. The fault family is:',
            a: ['AC power supply', 'Vehicle-to-charger communication: ISO 15118 or CHAdeMO protocol layer, CAN/PLC noise, or vehicle-side compatibility', 'Ground fault', 'Thermal derating'],
            correct: 1,
            exp: 'DCFC communication errors before power delivery starts point at the negotiation layer (protocol, PLC, CAN) — not power hardware. The two fault families have different diagnostic tools.',
          },
        ],
      },
    ],
    test: [
      { q: 'Level 2 EVSE delivers:', a: ['120 V AC at 1–2 kW', '240 V AC at 3.8–19.2 kW — the installed infrastructure level', '400–1000 V DC', 'Three-phase at 350 kW'], correct: 1, exp: 'L2 is the installed 240 V EVSE level: real hardware with contactors, pilot boards, and connectors.' },
      { q: 'CCS (Combined Charging System) adds to J1772:', a: ['Wireless charging', 'Two DC pins below the AC J1772 inlet — one connector accepts both L2 and DCFC sessions', 'A second AC plug', 'Battery monitoring'], correct: 1, exp: 'CCS is the AC J1772 inlet extended downward with DC contacts — the same inlet serves both charge levels.' },
      { q: 'NACS is significant because:', a: ['It only works on Teslas', 'It became the US industry standard, adopted broadly for new models', 'It requires three-phase AC', 'It is exclusive to DCFC'], correct: 1, exp: 'Originally Tesla\'s connector, NACS was licensed and adopted industry-wide — the US default for new vehicles.' },
      { q: 'J1772 State C means:', a: ['No vehicle connected', 'Vehicle connected and ready; the EVSE may close its contactor and deliver power', 'Fault detected', 'Ventilation required'], correct: 1, exp: 'State C is the charge-authorized state: the handshake complete, contactor closure is permitted.' },
      { q: 'J1772 pilot duty cycle communicates:', a: ['Utility frequency', 'The EVSE\'s maximum current offer to the vehicle', 'Connector temperature', 'Session revenue'], correct: 1, exp: 'The PWM duty cycle encodes the available current limit — the vehicle\'s charger reads and respects it.' },
      { q: '"Connects but won\'t charge" on an L2 EVSE should be diagnosed starting with:', a: ['The utility meter', 'The pilot signal circuit: pilot board output, pilot pin condition, and State transition behavior', 'A new cable', 'Contactor replacement'], correct: 1, exp: 'Session refusal after successful connection is the pilot circuit\'s signature — scope it before opening anything else.' },
      { q: 'CHAdeMO is best described as:', a: ['The current US standard', 'A legacy DCFC connector standard, declining but still in service at older installations and fleets', 'The same as CCS', 'A cable management system'], correct: 1, exp: 'CHAdeMO is real in the field at older Nissan Leaf stations and some commercial fleets — know it but know it is fading.' },
      { q: 'DCFC differs from L2 in that:', a: ['It runs on 120 V', 'AC-to-DC conversion happens in the charger unit, not the vehicle — the charger is the offboard power converter', 'It uses the J1772 pilot protocol', 'It charges slower'], correct: 1, exp: 'DCFC puts the rectifier/inverter stack at the station; L2 uses the vehicle\'s onboard charger. The tech\'s scope shifts accordingly.' },
      { q: 'ISO 15118 is the protocol used for:', a: ['L1 charging', 'DCFC vehicle-to-charger communication (CCS/NACS), including power negotiation and smart charging', 'Mechanical connector locking', 'NEC compliance reporting'], correct: 1, exp: 'The communication layer above the pilot: negotiates DC voltage and current, enables smart charging and bidirectional flow.' },
      { q: 'Megawatt Charging System (MCS) is aimed at:', a: ['Residential solar pairing', 'Commercial truck depots requiring 1+ MW per session', 'Smartphones', 'L2 fleets'], correct: 1, exp: 'MCS is the emerging heavy transport standard — substation-class infrastructure, not a residential or light-vehicle technology.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 12 — LEVEL 2 CHARGER SYSTEMS & SERVICE
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ev-l2-service',
    num: 12,
    title: 'Level 2 Charger Systems & Service',
    desc: 'L2 anatomy, NEC 625, GFCI behavior, cable and connector wear — the workhorse EVSE that fills most service trucks.',
    slides: [
      {
        title: 'L2 Anatomy and NEC 625',
        body: [
          'An L2 EVSE is architecturally simple — and that simplicity means there are only so many things to fault. The core is a CONTACTOR or solid-state relay that connects utility power to the vehicle when the pilot handshake authorizes it. Upstream of the contactor: the INPUT PROTECTION circuit (integral or upstream OCPD per NEC 625.40, sized at 125% of continuous current), GROUND FAULT PROTECTION (a Class A GFCI function is required by NEC 625.22 for L2 — 5 mA trip threshold, same as bathroom and kitchen receptacles), and MONITORING for input voltage and any internal fault condition. The PILOT BOARD generates the J1772 control pilot signal and reads state transitions; it also receives the enable signal from whatever network intelligence is present. A METERING circuit (CT or Hall-effect sensor) measures session energy for billing. Downstream: the CABLE and CONNECTOR. Write this list on your mental checklist: contactor, input protection, GFCI circuit, pilot board, metering, cable, connector — roughly in the order they fail.',
          'NEC ARTICLE 625 is the governing code for EV charging equipment, and knowing its key requirements focuses field troubleshooting. Section 625.22 mandates GFCI protection at EVSE — this is why nuisance GFCI trips are the most common L2 complaint you will receive. Section 625.40 specifies branch circuit sizing at 125% of EVSE nameplate (so a 32 A EVSE needs a 40 A circuit minimum — the overcurrent device, the breaker, AND the wire). Section 625.54 requires that EVSE be accessible to users and maintainable. Section 625.44 covers disconnecting means — the EVSE itself can serve as the disconnect if it has a lockable off position, or a dedicated disconnect upstream can satisfy the requirement. When a customer mentions a breaker tripping or the EVSE "going offline," the NEC 625.40 sizing math is your first sanity check.',
          'GROUND FAULT BEHAVIOR at L2 deserves its own paragraph because it generates more service calls than any other L2 failure mode. The NEC 625.22 GFCI function trips on 5 mA of imbalance between hot and neutral — and vehicles, cables, and connectors can all create that imbalance. The VEHICLE\'S ONBOARD CHARGER is a switching power supply with Y-capacitors to chassis ground; on certain vehicles, these capacitors create a small but measurable ground current. In wet conditions or with a worn cable jacket, the leakage rises and trips the GFCI. Standard troubleshooting: test the EVSE on a known-good vehicle; test the suspect vehicle on a known-good EVSE; megger the cable. NUISANCE TRIPS that only occur on one vehicle model are almost always that vehicle\'s charger — not the EVSE. Reset-without-investigating is the forbidden move: a real ground fault in a cable is a safety issue.',
        ],
        keyPoints: [
          'L2 checklist: contactor, input protection, GFCI, pilot board, metering, cable, connector',
          'NEC 625.40: branch circuit at 125% of EVSE nameplate — 32 A EVSE needs 40 A circuit',
          'NEC 625.22 mandates 5 mA Class A GFCI — the source of most L2 service calls',
          'Vehicle-EVSE ground fault testing: isolate with a known-good unit on each side',
        ],
        quiz: [
          {
            q: 'A 48 A L2 EVSE is tripping its upstream 50 A breaker intermittently at full load. The NEC 625.40 sizing check reveals:',
            a: ['The breaker is defective', 'The branch circuit must be sized at 125% of EVSE nameplate: 48 A × 1.25 = 60 A minimum — the 50 A circuit is undersized', 'The EVSE is drawing more than rated', 'The wire gauge is fine'],
            correct: 1,
            exp: 'NEC 625.40: 125% continuous load rule. A 48 A EVSE demands a 60 A circuit; the 50 A breaker is a code-and-hardware mismatch.',
          },
          {
            q: 'An L2 EVSE trips its GFCI only when a specific vehicle model is plugged in, but three other vehicles charge normally. The most likely cause is:',
            a: ['A failed GFCI circuit in the EVSE', 'The specific vehicle\'s onboard charger creating ground leakage exceeding 5 mA — a vehicle-side issue, not EVSE', 'A bad contactor', 'A pilot signal fault'],
            correct: 1,
            exp: 'Vehicle selectivity is the diagnostic key: Y-capacitor leakage in one vehicle model is a known L2 failure mode. The EVSE is acting correctly.',
          },
        ],
      },
      {
        title: 'Cable, Connector, and Commercial L2 Service',
        body: [
          'The CABLE and CONNECTOR assembly is the highest-touch component in any L2 EVSE and the part that fails most from use. A typical L2 cable carries current at 240 V — the jacket protects conductors from abrasion, UV, vehicle drive-overs, and sub-zero flexing. Signs of cable degradation: outer jacket cracking (UV or cold-embrittlement), kinking at the strain relief near the EVSE or connector ends, exposed insulation, and smell (burning jacket insulation from an intermittent connection). Resistance checks with a low-ohm meter across each conductor (hot, neutral, ground, pilot) confirm integrity; a megger test (conductor to conductor, conductor to ground) checks insulation. A cable that meggers below 1 MΩ is replaced — no patch repair on charging cables.',
          'The CONNECTOR takes the most abuse: dropped on pavement, dragged, driven over, and plugged/unplugged thousands of times. Failure modes: LATCH FAILURE (the mechanical retention latch wears and the connector disengages during charging, tripping the EVSE); PIN WEAR or CARBON BUILDUP on the contacts (rising contact resistance → heat → discoloration → failure); BROKEN CONNECTOR SHELL (physical damage from drops or vehicle door contact); PILOT PIN CORROSION (produces intermittent pilot signals — State B/C oscillation during a session, reported as "charging pauses"). Connector inspection is a walkaround item: pull the handle, inspect the face, check latch function, look for heat discoloration on the pins. A connector replacement is a defined swap at a connector-body repair kit; the cable does not always need to go with it.',
          'COMMERCIAL L2 MULTI-PORT units and LOAD SHARING add complexity unique to workplace and fleet installations. A 100 A circuit feeding six dual-port L2 units does not mean 16.6 A per port continuously — a LOAD MANAGEMENT CONTROLLER distributes available capacity dynamically as vehicles come and go, throttling pilot duty cycle to advertise lower max current when the circuit is stressed. Field consequence: a vehicle charging "slowly" at a multi-port unit may be operating exactly as designed — the load management reduced its pilot duty cycle offer because eight other vehicles arrived at lunchtime. Distinguish load-management throttling (normal, confirmed via EVSE status screen or network portal) from a hardware fault (one port consistently at zero while others work) before reaching for parts.',
        ],
        keyPoints: [
          'Cable: jacket cracks, kinks at strain reliefs, smell — megger below 1 MΩ = replace',
          'Connector: latch wear, pin carbon, pilot pin corrosion — inspect face and pins on every call',
          'Pilot pin corrosion = intermittent State B/C oscillation during sessions, reported as "pausing"',
          'Multi-port load sharing throttles pilot duty cycle — "slow charging" may be normal under load management',
        ],
        quiz: [
          {
            q: 'A customer reports their L2 session "keeps pausing" every few minutes, resuming on its own. Logs show repeated State B/C transitions during an active session. The likely culprit is:',
            a: ['Utility voltage sag', 'Pilot pin corrosion on the connector: intermittent pilot contact causes the EVSE to repeatedly lose and re-detect the vehicle', 'A faulty contactor', 'Thermal derating'],
            correct: 1,
            exp: 'Pilot pin corrosion produces exactly this: an intermittent control pilot that cycles through states during a session. Inspect and clean/replace the connector face.',
          },
          {
            q: 'At a workplace with a 12-port managed L2 installation, six vehicles all report charging at 16 A instead of the rated 32 A. The network portal shows load management active at 50% capacity. This indicates:',
            a: ['Six defective EVSE units', 'Normal load management behavior: the controller halved each port\'s pilot duty cycle to share the available circuit capacity', 'A failed contactor bank', 'Utility curtailment'],
            correct: 1,
            exp: 'Load management reduces pilot duty cycle per port dynamically. 50% capacity = 50% current offer. Confirm via the network portal before ordering parts.',
          },
        ],
      },
    ],
    test: [
      { q: 'NEC 625.40 requires the L2 branch circuit to be sized at:', a: ['100% of EVSE nameplate', '125% of EVSE continuous current — for a 32 A EVSE, a 40 A minimum circuit', '80% for safety', '150% for commercial'], correct: 1, exp: 'Continuous load at 125% is the EV charging branch circuit rule — the most common site sizing error.' },
      { q: 'NEC 625.22 mandates for L2 EVSE:', a: ['Three-phase input only', 'Class A GFCI protection (5 mA trip threshold)', 'Arc-fault protection only', 'A dedicated transformer'], correct: 1, exp: 'Every L2 EVSE must have a 5 mA Class A GFCI — the source of nuisance trips and many service calls.' },
      { q: 'The most common reason an L2 EVSE generates a service call is:', a: ['Contactor failure', 'GFCI trips — from vehicle leakage, cable degradation, or wet conditions', 'Pilot board burnout', 'Metering error'], correct: 1, exp: 'NEC-mandated GFCI at 5 mA is sensitive enough that vehicle Y-capacitors and aged cables trip it regularly.' },
      { q: 'A cable that meggers below 1 MΩ (conductor to ground) should be:', a: ['Taped and returned to service', 'Replaced — no patch repair on charging cables', 'Dried and retested tomorrow', 'Re-meggered at higher voltage'], correct: 1, exp: 'Charging cable insulation standards are safety-critical; below 1 MΩ is replacement, not repair.' },
      { q: 'Latch failure in an L2 connector causes:', a: ['GFCI trips', 'The connector to disengage during charging, tripping the EVSE and interrupting the session', 'Slow charging', 'Pilot signal errors only'], correct: 1, exp: 'Latch wear is the connector\'s mechanical failure mode — it disengages under cable weight or vehicle movement.' },
      { q: 'An L2 EVSE trips GFCI on Vehicle A but charges Vehicle B and C normally. The most likely fault is:', a: ['A bad GFCI module in the EVSE', 'Vehicle A\'s onboard charger creating excess ground leakage — a vehicle-side fault', 'A bad connector', 'The branch circuit breaker'], correct: 1, exp: 'Vehicle selectivity points to the vehicle, not the EVSE. The GFCI is doing its job; one vehicle has abnormal leakage.' },
      { q: 'Pilot pin corrosion on an L2 connector is recognized by:', a: ['A tripped GFCI', 'Intermittent session pausing — repeated State B/C transitions during charging', 'A stuck contactor', 'No symptoms until failure'], correct: 1, exp: 'Corroded pilot pins cause intermittent contact, cycling the EVSE between states during a session.' },
      { q: 'On a managed multi-port L2 installation, "slow charging" at all ports during peak occupancy means:', a: ['A failed load management controller', 'Normal operation: the system distributed available capacity by reducing pilot duty cycle offers', 'All contactors are derated', 'The circuit breaker is undersized'], correct: 1, exp: 'Load management throttles current by lowering duty cycle — the network portal confirms normal vs fault.' },
      { q: 'The J1772 pilot circuit is generated by:', a: ['The vehicle battery', 'The EVSE — the charger reads and responds to set up the session handshake', 'The utility transformer', 'The contactor coil'], correct: 1, exp: 'The EVSE generates the pilot; the vehicle\'s onboard charger reads it and responds via resistor states.' },
      { q: 'A burning smell at an L2 connector with discolored pins indicates:', a: ['Normal heat from charging current', 'Elevated contact resistance from wear or contamination causing localized heating — replacement required', 'An inverter fault in the vehicle', 'Cable rated too high'], correct: 1, exp: 'Discoloration plus smell at connector pins means resistive heating — the fire-risk scenario that demands replacement, not cleaning.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 13 — DCFC POWER ELECTRONICS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ev-dcfc-power',
    num: 13,
    title: 'DCFC Power Electronics',
    desc: 'Inside the fast charger: rectifier stacks, power modules, DC bus safety, and the UPS student\'s architectural homecoming.',
    slides: [
      {
        title: 'DCFC Architecture — The UPS Parallel',
        body: [
          'A DC Fast Charger is a large, grid-connected power converter — and if you spent time in the UPS course, you already know 80% of its architecture. The power chain: THREE-PHASE AC INPUT at 480 V (commercial) or occasionally 208 V (older installs) enters an INPUT FILTER and EMI suppression stage, then a PFC/RECTIFIER section (AC to intermediate DC bus), then ISOLATED DC-DC CONVERSION stages that produce the final output voltage delivered to the vehicle. Sound familiar? UPS course module: rectifier → DC bus → inverter. DCFC: rectifier → DC bus → isolated DC-DC converter. The same power-electronics family, aimed at a different load. The DC bus voltage is typically 650–800 V DC internal; the output to the vehicle is actively regulated from roughly 150 V (small EV at low state of charge) to 1000 V (long-range truck BEV), with output current up to 500+ A at the highest-power sites. Everything you learned about DC bus capacitors — the charge they hold after shutdown, the verify-before-touch discipline, the danger of sneak paths through filter caps — applies here, voltage-scaled.',
          'The defining DCFC architecture: MODULAR POWER MODULES. Rather than one large converter, a DCFC is assembled from a stack of parallel power module "bricks" — each module typically 10–50 kW — that the controller parallels to reach the site\'s rated output. A 180 kW charger might contain six 30 kW modules; a 350 kW charger twelve or more. This modularity exists for the same reason UPS N+1 redundancy exists: a single failed module derates but does not kill the charger. From a service standpoint this is the most important architectural fact in the field: a DCFC that charges at 2/3 of rated power has one sick module (the "sick-brick pattern") — swap the brick, restore full output. The controller actively monitors each module\'s contribution; the status display or network portal shows per-module health. Arrive knowing which module is flagged before you open the cabinet.',
          'COOLING is the other story the modules tell: each brick dissipates heat via its own heatsink (air-cooled at lower power levels) or a liquid-cooling loop (standard above ~150 kW and universal at 350 kW+). The liquid cooling loop — glycol mix, pump, heat exchanger/radiator — is the HVAC student\'s territory: pump failure, coolant leaks, restricted flow, and air in the loop all degrade thermal management and cause module derating or shutdown. Inlet coolant temperature is the number to monitor; target is typically under 40°C at the module inlet. Dirty air filters on air-cooled units produce the same outcome on a different medium. The universal lesson repeats: electronics die of heat, and the cooling path deserves the first walkaround check.',
        ],
        keyPoints: [
          'DCFC = rectifier → DC bus → isolated DC-DC output: the UPS architecture aimed at a vehicle',
          'Modular design: parallel power module "bricks" — one sick module = derated output, not dead charger',
          'Per-module health visible on display/portal — know which module is flagged before opening cabinet',
          'Cooling: liquid loops above ~150 kW; pump, flow, and inlet temp are the thermal walkaround',
        ],
        quiz: [
          {
            q: 'A 240 kW DCFC charges at 160 kW maximum; all other functions appear normal. The most likely cause is:',
            a: ['A complete power supply failure', 'One or two of the parallel power modules have faulted — the sick-brick derating pattern', 'A blown AC input fuse', 'Vehicle-side BMS limiting'],
            correct: 1,
            exp: 'Partial derating with otherwise normal operation is the modular architecture\'s signature: one sick brick reduces total capacity proportionally. Check per-module status first.',
          },
          {
            q: 'A liquid-cooled DCFC begins derating and logging thermal alerts on hot summer afternoons. Coolant temperature at the module inlet is 55°C against a 40°C spec. The service path is:',
            a: ['Replace the power modules', 'Investigate the cooling loop: pump operation, heat exchanger cleanliness, coolant level, glycol mix — inlet temp is the symptom, not the cause', 'Upgrade the AC feed', 'Add more modules'],
            correct: 1,
            exp: 'Elevated inlet coolant temperature points upstream in the cooling loop. The modules are protectively derating against heat; restoring loop performance restores output.',
          },
        ],
      },
      {
        title: 'DC Bus Safety, Module Diagnostics, and the Sick-Brick Pattern',
        body: [
          'The DCFC cabinet DC bus is a hazard that demands the same discipline UPS techs learned around battery bus bars and DC link caps — and the voltages are higher. The internal DC bus runs 650–800 V; the output DC bus presents whatever voltage the vehicle negotiated, up to 1000 V. CAPACITOR DISCHARGE is not instantaneous: after AC input opens, stored energy in the intermediate bus capacitors sustains voltage for seconds to minutes. Every DCFC manufacturer\'s service procedure includes a WAIT TIME after AC disconnect before touching internal DC components — respect it exactly, do not estimate it. A DISCHARGE VERIFICATION PROCEDURE (voltage measurement at designated test points with a CAT III meter, reading below a threshold voltage per the manufacturer) confirms it is safe to proceed. This is the UPS DC bus discipline stated on a heavier voltage scale: verify discharge before you touch.',
          'MODULE-LEVEL DIAGNOSTICS is where DCFC service concentrates day to day. The controller logs FAULT EVENTS per module: overvoltage, overcurrent, overtemperature, communication loss with the controller, and output regulation failure. The EVENT LOG TIMESTAMP pattern matters: a module that faults every afternoon at peak ambient temperature has a thermal problem (cooling path, fan, thermal paste on the heatsink); one that faults randomly regardless of time has a hardware or communication issue; one that faulted once after a grid event may have taken an input surge. Read the log; read the pattern; then act. Module swaps are the most common corrective maintenance: verify the replacement brick matches the model number and firmware version required by the controller (mixed firmware in a parallel stack causes instability — the controller handshakes with each brick and expects matched behavior).',
          'POWER QUALITY at the input is the underappreciated DCFC killer. Harmonics from adjacent large equipment, voltage sags during motor starts, and transients from utility switching events all stress the PFC and rectifier front end. DCFC power quality requirements (IEEE 519 compliance at the point of common coupling, specified input voltage range, specified harmonic limits) are design specifications; persistent operation outside them accelerates failure. If a DCFC sees repeated front-end failures — fused input sections, scorched EMI filters — the power quality story at the site is the investigation, not just the module replacement. A power analyzer on the input for a monitoring period is the confirming test, and the utility or facilities team is the correction path.',
        ],
        keyPoints: [
          'Internal DC bus: 650–800 V; discharge verification before touching internals — every time, by the procedure',
          'Module fault log patterns: thermal (afternoon), random (hardware), post-event (surge) — logs first',
          'Module swap: match model AND firmware to controller expectations — mixed firmware causes instability',
          'Repeated front-end failures → power quality investigation, not just module replacement',
        ],
        quiz: [
          {
            q: 'After opening the AC input disconnect on a 350 kW DCFC, the tech immediately begins measuring internal DC bus voltage. The safety violation is:',
            a: ['The disconnect was not padlocked', 'The required capacitor discharge wait time was skipped — internal bus voltage remains hazardous for seconds to minutes after AC opens', 'The tech should have shut off the vehicle first', 'PPE was incorrect'],
            correct: 1,
            exp: 'DC bus capacitors do not discharge instantly. The manufacturer-specified wait time and the voltage verification procedure exist for this reason — skip neither.',
          },
          {
            q: 'A replacement power module is the correct model number but has older firmware than the controller requires. Installing it will likely cause:',
            a: ['No issues — firmware is backward-compatible', 'Controller-module communication instability; the stack may derate or fault — confirm firmware version before installation', 'A complete output shutoff immediately', 'Only a metering error'],
            correct: 1,
            exp: 'Parallel power modules must run matched firmware. The controller handshakes with each brick — version mismatch produces unpredictable behavior in the stack.',
          },
        ],
      },
    ],
    test: [
      { q: 'DCFC power chain in order is:', a: ['DC-DC → rectifier → output', 'AC input → PFC/rectifier → DC bus → isolated DC-DC → vehicle output', 'Battery → inverter → vehicle', 'Transformer → contactor → cable'], correct: 1, exp: 'The rectifier-bus-converter chain: the UPS architecture aimed at a vehicle instead of a protected load.' },
      { q: 'Modular DCFC design means a single failed power module causes:', a: ['A complete outage', 'Proportional derating — other modules continue; output power drops by one module\'s contribution', 'A network fault only', 'A connector lockout'], correct: 1, exp: 'The sick-brick derating pattern: parallel modules absorb one brick\'s loss. The charger works at reduced output until the module is replaced.' },
      { q: 'Per-module health status on a DCFC is found:', a: ['Only via oscilloscope', 'On the unit\'s status display and/or network monitoring portal — before opening the cabinet', 'In the vehicle\'s infotainment', 'Via the utility meter'], correct: 1, exp: 'The controller reports each module\'s status; read it first, arrive knowing the brick number.' },
      { q: 'DCFC internal DC bus voltage after AC disconnect:', a: ['Drops to zero immediately', 'Remains hazardous for seconds to minutes — capacitors hold charge; verify discharge per procedure before touching', 'Is always less than 50 V', 'Is safely bypassed by the contactor'], correct: 1, exp: 'The UPS bus discipline on a heavier scale: wait, then verify with a CAT III meter per the procedure.' },
      { q: 'A DCFC faults on overtemperature every summer afternoon. The investigation starts with:', a: ['Replacing the power module', 'The cooling system: pump flow, heat exchanger condition, coolant level and temperature, filter restriction', 'Utility voltage', 'Firmware version'], correct: 1, exp: 'Thermal pattern faults point at thermal management. The module is protectively responding; address the cooling path.' },
      { q: 'DCFC liquid cooling target inlet coolant temperature is typically:', a: ['Below 20°C', 'Below 40°C at the module inlet', 'Below 60°C is fine', 'Coolant temperature does not matter'], correct: 1, exp: 'Above ~40°C at the module inlet, thermal derating begins. The cooling system\'s job is to deliver cooler than this.' },
      { q: 'Replacing a DCFC power module, the critical match criteria beyond model number is:', a: ['Cable color', 'Firmware version — the controller requires matched versions across all parallel modules', 'Manufacturing date', 'Weight'], correct: 1, exp: 'Mismatched firmware in a parallel stack causes handshake instability — always confirm firmware before installing a replacement brick.' },
      { q: 'Repeated DCFC front-end failures (scorched EMI filters, blown input fusing) suggest:', a: ['Bad power modules inside', 'A power quality problem at the site input — harmonics, sags, or transients stressing the AC input stage', 'Vehicle compatibility issues', 'NEC 625 violation'], correct: 1, exp: 'When the AC input stage fails repeatedly, look upstream: power quality investigation before continuing to replace hardware.' },
      { q: 'The DCFC output voltage to the vehicle is:', a: ['Fixed at 480 V', 'Actively negotiated and regulated — typically 150–1000 V DC depending on vehicle BMS target', 'Always 800 V', 'The same as the internal DC bus'], correct: 1, exp: 'The charger negotiates with the vehicle\'s BMS and regulates to a commanded target — not a fixed output.' },
      { q: 'Air-cooled DCFC modules failing thermally first check should be:', a: ['Module replacement', 'Air filter condition: clogged filters restrict flow, the same lesson as UPS cooling and HVAC — clean or replace', 'Coolant refill', 'Software version'], correct: 1, exp: 'Dirty filters are the number-one air-cooled thermal failure cause — cheap, fast, and embarrassing to miss.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 14 — HIGH-POWER CABLES, COOLING & CONNECTORS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ev-dcfc-cables',
    num: 14,
    title: 'High-Power Cables, Cooling & Connectors',
    desc: 'Liquid-cooled cables, connector thermals, public hardware abuse, and the mechanical wear life of fast-charge infrastructure.',
    slides: [
      {
        title: 'Liquid-Cooled Cables and Connector Thermals',
        body: [
          'At 350 kW and 500+ amps, copper cable physics reaches a breaking point: a conventional cable large enough to carry the current without overheating would be too heavy and stiff for a human to plug in. The solution is LIQUID-COOLED CABLE: a cable assembly with two small-gauge current conductors surrounded by a coolant jacket — glycol mix circulates continuously through the cable during a session, carrying heat from the conductors to the charger\'s heat exchanger. The result is a 350 kW cable light enough to handle single-handed, roughly thumb-diameter. From the service perspective, the cable becomes part of the cooling system: COOLANT LEAKS at cable fittings are a shutdown event (coolant in the connector is a safety issue and a vehicle-inlet contamination risk); PUMP FAILURE starves the cable of cooling and triggers thermal derating before the cable damages itself; RESTRICTED FLOW from a clogged filter or low coolant level reads as elevated cable temperature sensor readings. The cable temperature sensors at the connector end are real-time inputs to the charger\'s derating algorithm — not just logged data.',
          'The CONNECTOR THERMAL MANAGEMENT at DCFC is a separate system from the cable cooling. At 500 A, even a few milliohms of contact resistance generates meaningful heat at the connector interface — and the connector sees this every session, wearing progressively. TEMPERATURE SENSORS embedded in the connector housing (in both the charger-side handle and the vehicle inlet, on higher-end implementations) feed derating logic: if the connector rises above a threshold during a session, the charger reduces current to protect the hardware. SYMPTOM: a session that starts at 150 kW then derates to 80 kW five minutes in, with no module faults logged, and the cable/connector is hot to the touch. First check: connector pin condition (resistance check across each power pin from handle side), retainer latch engagement (a loose latch degrades pin contact pressure), and visible thermal damage. Second check: coolant flow through the cable if liquid-cooled.',
          'CONNECTOR SYSTEMS at DCFC are standardized but their implementations vary. CCS connectors (both Combo 1 for North American AC/DC and Combo 2 for European) lock with a solenoid-controlled latch: the vehicle commands the latch to release at end-of-session. A stuck latch (solenoid failure, low supply voltage, or mechanical binding) is one of the top DCFC hardware calls — the vehicle won\'t release, and the user is stranded. The NACS connector uses a different mechanical architecture with its own failure modes. In all cases: never force a stuck connector; the latch system has an emergency release procedure (often a cable or lever accessible from the vehicle side or through the charger UI — know it before you get the call). NACS\'s combined AC/DC capability means the same connector handle sees L2 and DCFC service on compatible stations — double the session count on the latch system.',
        ],
        keyPoints: [
          'Liquid-cooled cable: cable is part of the cooling loop — leaks, pump failure, and flow restriction all derate',
          'Connector temp sensors derate current when the contact interface heats — symptom: session derates 5 min in',
          'Connector pins: resistance check and visual for thermal damage; latch engagement affects contact pressure',
          'Stuck latch = vehicle stranded; know the emergency release procedure for each platform before dispatch',
        ],
        quiz: [
          {
            q: 'A 350 kW DCFC session starts at full power then derates to 100 kW after about five minutes with no module faults in the log. The cable is noticeably warm. The first investigation is:',
            a: ['Upgrade the AC feed', 'Connector thermal derating: check connector pin resistance, latch engagement, and coolant flow through the liquid-cooled cable', 'Vehicle BMS fault', 'Firmware version'],
            correct: 1,
            exp: 'Post-start derating with warm cable and no module faults is the connector/cable thermal signature. Connector condition and cooling system check before anything else.',
          },
          {
            q: 'Coolant is found at the DCFC connector fitting during a routine inspection. The correct action is:',
            a: ['Wipe it clean and continue service', 'Shut down the session; coolant at the connector is a safety issue and a vehicle-inlet contamination risk — isolate and repair before returning to service', 'Note it in the log for next visit', 'Reduce to 50% power and continue'],
            correct: 1,
            exp: 'Coolant in the connector means a fitting leak in the liquid-cooled cable system. Return to service after repair only — not a "monitor it" situation.',
          },
        ],
      },
      {
        title: 'Public Hardware Abuse and Service Discipline',
        body: [
          'Public DCFC hardware is the outdoor, unattended edge of the grid — and the damage catalog reflects it. DRIVE-OFFS are among the most expensive failure modes: a vehicle leaves with the cable still plugged in, tearing the connector from the vehicle inlet or yanking the cable from the handle assembly. Most modern DCFC have a CABLE RETRACT SYSTEM (motorized or spring-loaded) that lifts the cable off the ground between sessions; when this system fails, ground-level cables become trip hazards and run-over risks. DROPS: every session is a connector drop opportunity — the ceramic surface of a parking lot is unkind to connector housings and the delicate pin faces inside. VANDALISM: handles cut, cables pulled from conduit fittings, display screens smashed, card readers pried. The field service aesthetic is less "electronics lab" and more "automotive body shop meets telecom outside plant."',
          'CABLE MANAGEMENT failure modes compound abuse damage: CONDUIT and CABLE GUIDE systems keep cables orderly but wear at their pivot points and anchors. A cable dragging on pavement abrades its jacket until conductors are exposed. RETRACTOR MOTOR failure is a call in itself: a cable that stays on the ground 24/7 accumulates damage faster than one that retracts, and the motor\'s replacement involves accessing the retractor mechanism inside the charger body (tool list and procedure from the manufacturer before arrival). At multi-dispenser installations, mismatched cable lengths mean the shorter cable is always the ground-dragger — flag this in service notes for hardware standardization on the next maintenance cycle.',
          'PREVENTIVE MAINTENANCE discipline at DCFC sites is the difference between an operator with 95% uptime and one with 70%. PM items: connector pin inspection and resistance testing, cable jacket visual and meggering at defined intervals, coolant level and inhibitor testing, filter inspection (air and coolant inline), latch function verification, retractor operation, display and card reader function, and a software version and configuration audit. Most network operators specify PM intervals (quarterly or semi-annually); your job is executing the PM, documenting findings, and calling out items approaching the "replace before it fails" threshold. The operator whose charger is down on Thanksgiving weekend paid to skip the PM.',
        ],
        keyPoints: [
          'Drive-offs, drops, and vandalism define the public DCFC damage catalog — budget parts accordingly',
          'Cable retractor failure = ground cable = accelerated jacket damage; replace before the cable fails',
          'PM checklist: pins, jacket, coolant, filters, latch, retractor, software — document every item',
          'Anticipate replacements at intervals rather than waiting for failure — uptime is the product',
        ],
        quiz: [
          {
            q: 'A DCFC cable retractor motor has failed at a high-traffic station. The operator wants to defer the repair. The correct advice is:',
            a: ['Deferred repair is acceptable; the charger still works', 'Prompt repair: a grounded cable accumulates jacket damage rapidly in a high-traffic public environment, converting a minor repair into a cable replacement', 'Lower the power level until the retractor is fixed', 'Mark it out of service immediately'],
            correct: 1,
            exp: 'Ground cables in high-traffic locations damage fast. A retractor motor repair now prevents cable replacement and extended downtime later.',
          },
          {
            q: 'During a quarterly PM visit, connector pin resistance on one of four dispenser heads measures 15 mΩ vs the spec of ≤5 mΩ. The correct action is:',
            a: ['Ignore — it still charges vehicles', 'Flag for connector replacement before the next PM: elevated resistance causes thermal derating under load and will progress to failure', 'Clean and retest; if it improves, leave it', 'Reduce rated power on that head'],
            correct: 1,
            exp: '15 mΩ is already above spec; at 500 A that resistance dissipates 3.75 W in the connector — and it is trending worse. Replace before failure, not after.',
          },
        ],
      },
    ],
    test: [
      { q: 'Liquid-cooled DCFC cable uses active cooling because:', a: ['It looks professional', 'At 350 kW+, copper conductors large enough to handle current passively would be too heavy and stiff to use — liquid cooling lets thin conductors handle the heat', 'It is required by J1772', 'Coolant improves conductivity'], correct: 1, exp: 'Thermal management enables the handling ergonomics: thin cable, any human can plug in, coolant carries the heat away.' },
      { q: 'A coolant leak at a liquid-cooled cable fitting requires:', a: ['A damp-rag wipe and continued service', 'Immediate shutdown: coolant in the connector is a safety issue and vehicle-inlet contamination risk', 'Reduced power operation', 'A log entry for next visit'], correct: 1, exp: 'No continued operation with coolant at the connector — shutdown, isolate, and repair.' },
      { q: 'A DCFC session derates from 200 kW to 90 kW five minutes after start with a warm connector and no module faults. First investigation:', a: ['Replace the module stack', 'Connector pin resistance, latch engagement, and cable cooling flow — thermal derating from the connector interface', 'Firmware update', 'Vehicle compatibility'], correct: 1, exp: 'The connector thermal derating signature: timed post-start derate, warm connector, no module events.' },
      { q: 'CCS connector latching is:', a: ['Manual friction only', 'Solenoid-controlled — the vehicle commands latch release at session end; solenoid failure causes a stuck connector', 'Spring-loaded release', 'Operator-controlled via the screen'], correct: 1, exp: 'The solenoid latch is the stuck-connector failure point — one of the top DCFC hardware calls in the field.' },
      { q: 'A vehicle drives off with the DCFC connector still plugged in. The cable retractor system is designed to:', a: ['Prevent this entirely', 'Lift the cable off the ground between sessions, reducing ground-level exposure — it does not prevent a determined drive-off', 'Lock the connector electrically', 'Alert the operator via email'], correct: 1, exp: 'Retractors manage cable tidiness; they do not stop drive-offs. They do reduce cable damage between sessions.' },
      { q: 'DCFC connector temperature sensors are used to:', a: ['Log energy per session', 'Feed real-time derating logic: if the connector heats, the charger reduces current to protect the hardware', 'Unlock the latch solenoid', 'Detect vehicle compatibility'], correct: 1, exp: 'Connector temp is a real-time derating input, not just logged data — it actively throttles the session.' },
      { q: 'Quarterly DCFC PM connector pin resistance spec is typically:', a: ['Below 50 mΩ', 'Below 5 mΩ — above this, thermal derating under load and progressive failure', 'Below 100 mΩ', 'Resistance is not tested on connectors'], correct: 1, exp: 'Contact resistance above spec means heat at session current — the thermal derating and connector-failure path.' },
      { q: 'Cable jacket cracking from UV exposure indicates:', a: ['Normal aging, no action needed', 'Inspect for conductor exposure, megger the cable, and replace if below insulation spec — jacket cracking is the precursor to conductor exposure', 'Just a cosmetic issue', 'Re-coat with tape'], correct: 1, exp: 'Jacket cracks let moisture in and mechanical damage accelerate — megger and replace at insulation threshold.' },
      { q: 'At a stuck DCFC connector, the first action is:', a: ['Cut the cable', 'Use the manufacturer\'s emergency release procedure — cable, lever, or UI option specific to the platform', 'Call the vehicle dealer', 'Wait for the session to time out'], correct: 1, exp: 'Every platform has an emergency release procedure. Know it before the call — the customer is stranded.' },
      { q: 'A DCFC site with 70% uptime vs 95% for a comparable site most likely reflects:', a: ['Worse utility power', 'Deferred PM: connector wear, clogged filters, and cable damage catch up between PM visits', 'Older hardware models', 'Higher usage volume'], correct: 1, exp: 'PM discipline is the uptime differentiator. Deferred inspections allow small issues to cascade into extended outages.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 15 — NETWORKS, PAYMENT & OCPP DIAGNOSTICS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ev-networks',
    num: 15,
    title: 'Networks, Payment & OCPP Diagnostics',
    desc: 'OCPP, session flow, cellular connectivity, and remote diagnostics — why most public charger outages are software, not hardware.',
    slides: [
      {
        title: 'OCPP and the Session Protocol Layer',
        body: [
          'Most EV charging hardware in North America runs OCPP — the Open Charge Point Protocol — as its charger-to-network management language. OCPP defines the message exchange between a CHARGE POINT (the hardware at the site) and a CENTRAL SYSTEM (the network operator\'s cloud backend). It is an open protocol with versions in active field deployment: OCPP 1.6J (WebSocket-based JSON, the dominant deployed version as of the mid-2020s) and OCPP 2.0.1 (expanded features, security, device management — the upgrade path). As a field tech you do not typically write OCPP, but understanding its vocabulary is diagnostic power: when the network backend logs tell you "StatusNotification: Faulted" or "BootNotification: Rejected," you know what the charger told the server — and what the server told it back.',
          'The OCPP SESSION FLOW maps directly onto what a user experiences: 1) BOOT NOTIFICATION — the charger registers with the central system and announces its configuration on startup or reconnect. If the boot is rejected, the charger cannot accept sessions regardless of its hardware state. 2) HEARTBEAT — the charger pings the server on an interval (default 60–300 seconds) to confirm connectivity; missed heartbeats flag the charger as offline in the network portal. 3) AUTHORIZE — when a user taps an RFID card or opens the app, the charger requests authorization from the central system (or uses a cached local whitelist when offline). 4) START TRANSACTION — session begins; the charger reports meter readings and session start time. 5) METER VALUES — periodic energy readings stream to the backend during charging. 6) STOP TRANSACTION — session ends (by vehicle, by user, by timer, or by fault); final meter reading closes the revenue record. Diagnostic shortcut: a charger that never progresses past Authorize has an authorization backend or connectivity issue, not a power hardware issue.',
          'OCPP also carries REMOTE COMMANDS from the operator: RemoteStartTransaction (operator can start a session for a specific vehicle), RemoteStopTransaction, ChangeConfiguration (set parameters like heartbeat interval, connector timeout, max current limit), Reset (soft or hard), and UpdateFirmware. These are your remote service tools: before rolling a truck, operators should have tried RemoteReset, checked ChangeConfiguration to verify no misconfiguration, and pulled the last error log via the backend. A charger that can be remotely reset and recovers is a network glitch; one that cannot be reached via remote commands needs a site visit.',
        ],
        keyPoints: [
          'OCPP is the charger-to-network protocol: BootNotification, Heartbeat, Authorize, Start/Stop Transaction',
          '"Faulted" in the backend means the charger sent StatusNotification: Faulted — read what triggered it',
          'Boot Rejected = charger cannot accept sessions; Heartbeat failures = connectivity issue flagged as offline',
          'Remote tools first: RemoteReset, ChangeConfiguration, UpdateFirmware — before dispatching',
        ],
        quiz: [
          {
            q: 'A charger shows as "offline" in the network portal and has not sent a Heartbeat in 30 minutes. Logs show a BootNotification: Accepted six hours ago. The first investigation is:',
            a: ['Replace the power module', 'Network connectivity: cellular signal, modem status, and WAN connectivity — the charger may be functioning physically but cannot reach the backend', 'A failed contactor', 'OCPP version mismatch'],
            correct: 1,
            exp: 'Heartbeat loss with no other alerts means the communication link dropped, not the hardware. Connectivity and modem are the first check.' ,
          },
          {
            q: 'A user cannot start a session at a DCFC: they tap their RFID card, the screen acknowledges, but no session begins. Backend logs show Authorize: Accepted followed by no StartTransaction. The fault is:',
            a: ['A bad RFID reader', 'Post-authorization startup: the charger accepted the user but failed to initiate the charge — check for hardware faults, vehicle communication errors, or a stuck contactor after the auth step', 'A network protocol failure', 'Payment system outage'],
            correct: 1,
            exp: 'Authorization succeeded; the failure is between Authorize and StartTransaction — power hardware, vehicle handshake, or contactor initiation is the fault domain.',
          },
        ],
      },
      {
        title: 'Connectivity, Remote Diagnostics, and the Uptime Problem',
        body: [
          'The dirty secret of public charging uptime is that the majority of non-charging reports are NETWORK AND SOFTWARE FAULTS, not power hardware failures. Studies from large network operators consistently show that 30–50% of charger "outages" are connectivity-related: the charger is physically functional but cannot reach the backend to authorize sessions. CELLULAR MODEMS are the single highest-frequency hardware swap in the field — they run 24/7 outdoors in temperature extremes, cellular signal varies with carrier upgrades and tower changes, and firmware bugs periodically brick them. Modem diagnosis: confirm the SIM card is seated, check signal quality (usually visible in a diagnostic menu), ping the backend URL from a console if available, and check for overdue firmware updates on the modem itself. A modem that takes 10 minutes to warm up in January and fails to connect until midday is thermal — the modem needs heat mitigation or replacement.',
          'FIRMWARE MANAGEMENT is both a reliability mechanism and a service liability. Charger firmware updates are delivered over-the-air via OCPP UpdateFirmware messages from the backend; a botched firmware update can leave a charger in a boot loop or with a corrupted configuration. Best practice from the operator side: updates roll in batches with a test unit first; a rollback image is available; updates are pushed off-peak hours. Field reality: a charger that stopped working the morning after a firmware push has a failed-update story. The recovery procedure (factory reset, recovery firmware via USB or serial, manufacturer support line) is site-specific — have it before arriving. UpdateFirmware messages also carry a RetrieveDate and InstallDate; if a charger reports a pending firmware update but is stuck pre-install, the backend retry or a RemoteReset may un-stick it.',
          'PAYMENT SYSTEMS add another software layer below the session flow. Most public DCFC support RFID (card or fob authentication via the backend whitelist), CREDIT CARD via a contactless reader, QR code scan to a mobile payment session, and PLUG-AND-CHARGE (ISO 15118 automatic contract authentication — the vehicle authenticates directly, no user action). Each method has its own failure modes: a failed card reader blocks credit card sessions but RFID may still work (or vice versa); a Plug-and-Charge authentication failure is an ISO 15118 TLS certificate issue, not a hardware problem; a QR code scan that leads to a payment portal error is a backend configuration issue. Distinguish WHICH payment method failed and WHICH still works before characterizing an outage — partial payment failures are system configurations, not hardware replacements.',
        ],
        keyPoints: [
          '30–50% of charger "outages" are connectivity faults — the charger physically works but cannot authorize',
          'Cellular modem: highest swap frequency; check SIM, signal, firmware, and thermal environment',
          'Failed firmware push = charger in boot loop; have the recovery procedure before dispatch',
          'Payment method isolatation: which method failed vs which still works before ordering parts',
        ],
        quiz: [
          {
            q: 'A public DCFC shows "Unavailable" in the operator portal but the screen lights up and shows normal status. No power alarms. Cellular signal reads "1 bar" on the diagnostic screen. The most likely cause:',
            a: ['A failed power module', 'Weak cellular connectivity: the charger cannot maintain a stable connection for authorization and heartbeat', 'A blown input fuse', 'A software bug from last night\'s firmware push'],
            correct: 1,
            exp: 'Functional screen + no power alarms + weak signal = connectivity outage. Modem signal, carrier, and antenna condition are the investigation.',
          },
          {
            q: 'Credit card sessions fail at a DCFC but RFID card sessions work normally. The fault is:',
            a: ['A complete network outage', 'Isolated to the payment card reader or its backend integration — RFID still works; the reader hardware or payment processor connection is the fault domain', 'A power module failure', 'An OCPP version mismatch'],
            correct: 1,
            exp: 'Partial payment method failure isolates the fault. RFID working means the network and session flow are intact; the card reader hardware or backend is the specific fault.',
          },
        ],
      },
    ],
    test: [
      { q: 'OCPP stands for:', a: ['Open Connector Protocol for Payments', 'Open Charge Point Protocol — the charger-to-network management language for EV infrastructure', 'Onboard Charging Power Protocol', 'Output Current Protection Parameter'], correct: 1, exp: 'OCPP is the open standard governing messages between the charge point hardware and the network operator backend.' },
      { q: 'OCPP BootNotification: Rejected means:', a: ['The charger has a power fault', 'The central system refused the charger\'s registration — the charger cannot accept sessions until the boot is accepted', 'A firmware error', 'The vehicle rejected the connection'], correct: 1, exp: 'Boot rejection blocks all sessions regardless of hardware state — it is a backend configuration or credential issue.' },
      { q: 'A charger that shows "Faulted" in the network portal has sent:', a: ['No messages recently', 'An OCPP StatusNotification with status: Faulted — the charger itself reported an error', 'An incorrect heartbeat', 'A firmware request'], correct: 1, exp: 'StatusNotification: Faulted is the charger telling the backend it has an error — read the accompanying error code to identify the fault.' },
      { q: 'The dominant deployed OCPP version in North American charging infrastructure is:', a: ['OCPP 1.5', 'OCPP 1.6J (WebSocket JSON)', 'OCPP 3.0', 'OCPP 2.0.1 everywhere'], correct: 1, exp: 'OCPP 1.6J is the field reality in most deployed infrastructure; 2.0.1 is the upgrade path for new installations.' },
      { q: 'The most common hardware swap in the DCFC field is:', a: ['Power modules', 'Cellular modems — they run outdoors 24/7 and are the primary connectivity failure point', 'Contactors', 'Input fuses'], correct: 1, exp: 'Outdoor cellular modems in temperature extremes with firmware exposure and signal variability are the high-frequency swap item.' },
      { q: 'A charger stopped working the morning after an overnight firmware push. The investigation starts with:', a: ['Replacing the power module', 'The firmware update history: a failed OTA update can cause boot loops or corrupted configurations — have the recovery procedure', 'Cellular signal', 'Connector replacement'], correct: 1, exp: 'Timing correlation with a firmware push is the diagnostic flag. Boot loop or failed update recovery is the procedure.' },
      { q: 'RemoteReset via OCPP should be attempted:', a: ['Never — always dispatch first', 'Before rolling a truck for connectivity or software faults — a remotely recoverable charger does not need a site visit', 'Only for hardware faults', 'Only by the manufacturer'], correct: 1, exp: 'RemoteReset is triage: if the charger responds and recovers, you saved a truck roll. Software and connectivity issues often recover remotely.' },
      { q: 'OCPP Heartbeat messages serve to:', a: ['Authorize charging sessions', 'Confirm charger-to-backend connectivity on an interval — missed heartbeats mark the unit as offline', 'Update firmware', 'Report meter values'], correct: 1, exp: 'Heartbeat is a keepalive; its absence is connectivity loss, not hardware failure.' },
      { q: 'Plug-and-Charge authentication failures are caused by:', a: ['A bad RFID reader', 'ISO 15118 TLS certificate issues — the vehicle-to-charger certificate handshake failed, not hardware', 'A stuck contactor', 'Power module derating'], correct: 1, exp: 'Plug-and-Charge authentication is a certificate protocol issue; RFID and card may still work normally.' },
      { q: 'A charger showing "offline" in the portal with no heartbeat in 2 hours — first remote action is:', a: ['Open the cabinet', 'ChangeConfiguration → check parameters, then RemoteReset — the least invasive remote triage before dispatch', 'Replace the modem', 'Notify the utility'], correct: 1, exp: 'Remote triage sequence: check config, try RemoteReset, confirm recovery — only dispatch if remote commands are unresponsive.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 16 — SITE POWER, UTILITY & LOAD MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ev-site-power',
    num: 16,
    title: 'Site Power, Utility & Load Management',
    desc: 'Site one-lines, demand charges, load sharing, battery-buffered sites, and utility interconnection — getting megawatts to a parking lot.',
    slides: [
      {
        title: 'Site Power Fundamentals and Demand Charges',
        body: [
          'Every DCFC site starts with a UTILITY SERVICE — and reading the one-line from the utility meter to the charger cabinet is generator-course literacy applied to a new load. The typical commercial DCFC service: a UTILITY TRANSFORMER (new or upgraded — most sites require a new pad-mount transformer dedicated to charging, as existing commercial services rarely have headroom for 350+ kW of additional load), a MAIN DISCONNECT or SWITCHGEAR, a CHARGER DISTRIBUTION PANEL or service entrance section, then branch circuits to each dispenser. For a 4-DCFC site at 150 kW each, the service must handle 600 kW peak plus any coincident building load — that is typically a 1500–2000 kVA transformer and a 2000 A service. Voltage is almost always 480 V three-phase at the charger input; each charger has an internal transformer or directly rectifies the 480 V.',
          'DEMAND CHARGES are the operating cost reality that shapes every design decision at a charging site — and understanding them is how field techs advise operators intelligently. Utilities bill commercial customers on two components: ENERGY (kWh consumed) and DEMAND (the highest kW or kVA averaged over a 15- or 30-minute interval in the billing period). A charging site that serves eight vehicles simultaneously for 30 minutes at 150 kW each creates a demand of 1,200 kW — and if that is the month\'s peak, the demand charge (which can be $10–$25 per kW per month in many tariffs) adds $12,000–$30,000 to the monthly bill. LOAD MANAGEMENT exists primarily to control this peak: by limiting how many chargers operate simultaneously or throttling each charger\'s output, the site manager keeps the 15-minute demand peak below a billing threshold. Smart charging software optimizes when to push power (cheapest on-peak tariff time, available capacity, demand headroom) and when to throttle.',
          'ONE-LINE LITERACY for EV sites involves a few site-specific elements beyond the generator-course fundamentals. GROUND FAULT DETECTION and ISOLATION on the DC side of DCFCs must be provided per NEC 625 and the charger\'s listing; the site one-line should show how this is accomplished. METERING at the charging site must meet utility revenue-grade standards for demand billing (utilities take demand charges seriously). PROTECTION COORDINATION between the main breaker, the distribution panel, and each charger\'s branch circuit must be verified during commissioning and checked after any fault event — a charger fault that trips the building main instead of its branch breaker indicates a coordination failure.',
          ],
        tables: [
          {
            caption: 'Typical DCFC site service sizing',
            headers: ['Site configuration', 'Peak power', 'Transformer size', 'Service voltage'],
            rows: [
              ['2 × 150 kW DCFC', '300 kW', '500–750 kVA', '480 V 3Ø'],
              ['4 × 150 kW DCFC', '600 kW', '1000–1500 kVA', '480 V 3Ø'],
              ['4 × 350 kW DCFC', '1400 kW', '2000–2500 kVA', '480 V 3Ø'],
            ],
          },
        ],
        keyPoints: [
          'DCFC sites need dedicated utility transformers — existing commercial services rarely have 350+ kW headroom',
          'Demand charges can be $12,000–$30,000/month at a high-power site — load management controls this',
          'One-line literacy: transformer → main → distribution → charger branches; check coordination',
          'Revenue-grade metering at charging sites is a utility requirement, not optional',
        ],
        quiz: [
          {
            q: 'A new 4-DCFC site at 150 kW per unit has its main breaker tripping when all four charge simultaneously. The breaker is sized at the transformer\'s nameplate. The investigation starts with:',
            a: ['Replace all four chargers', 'Protection coordination: the 600 kW peak demand may exceed the transformer and main breaker sizing — verify the site one-line against actual coincident peak load', 'A ground fault at one charger', 'Demand charge billing error'],
            correct: 1,
            exp: 'Simultaneous full-power operation tests the site one-line rating. If the service was not sized for coincident operation, the main trips — a design gap, not a hardware fault.',
          },
          {
            q: 'A charging network operator asks why their monthly electricity bill is higher than expected despite selling the same energy as last month. The first analysis is:',
            a: ['Energy tariff increase', 'Demand charge: a higher peak 15-minute demand interval this month may have raised the demand component significantly', 'A meter error', 'More vehicles charging overall'],
            correct: 1,
            exp: 'Energy bills can stay flat while demand charges spike from a single peak event. Understanding the two-component tariff is the operator conversation.',
          },
        ],
      },
      {
        title: 'Load Management, Battery-Buffered Sites, and Utility Coordination',
        body: [
          'ENERGY MANAGEMENT SYSTEMS (EMS) or ENERGY MANAGEMENT SOFTWARE (also called site controllers, charge management systems, or smart charging platforms depending on the vendor) sit between the utility service and the individual chargers. Their job: read real-time power at the site meter, allocate capacity across chargers based on rules (maximum site demand, tariff time-of-use, individual vehicle priority, grid signal inputs), and command each charger via OCPP ChangeConfiguration or via a local network protocol. From a service standpoint, the EMS is another layer of software that can override charger behavior: a charger that will not exceed 50 kW despite the vehicle requesting more may be operating under an EMS curtailment command, not failing. Always check the EMS interface before concluding a charger is derated hardware.',
          'BATTERY-BUFFERED CHARGING SITES represent the intersection of the BESS course and the EV course. The model: a large battery storage system (often a containerized BESS, 500 kWh to several MWh) sits between the utility service and the chargers. The battery charges during off-peak hours or when renewables are generating; during peak charging demand, the BESS supplements the utility supply, allowing high-power DCFC operation on a service too small to serve them from the grid alone. The math that makes this viable: a site with a 200 kW utility service and a 400 kWh / 500 kW BESS can serve 2 × 350 kW chargers for short duty cycles, never exceeding the demand threshold that would require a 500 kW utility upgrade. SERVICE REALITY at these sites: the BESS itself requires service (module 17 of the solar course, applied here), the DCFC may receive both grid and battery DC inputs with transfer logic in between, and the EMS controls charging and discharge dispatch. Two energy sources, two fault domains.',
          'UTILITY INTERCONNECTION and NEC CODE compliance are the commissioning and permit layer. NEC ARTICLE 625 covers EVSE; NEC ARTICLE 705 covers interconnected power sources (relevant when BESS or solar is present at the site); NEC ARTICLE 706 covers stand-alone energy storage. The UTILITY INTERCONNECTION AGREEMENT specifies maximum import demand, any export limits, metering requirements, and protection requirements — and it is a legal document that field techs do not unilaterally modify. When a site\'s protection settings seem wrong or a breaker coordination seems off, the correct path is documentation, escalation to the engineering team, and coordination with the utility interconnection contact — not a field adjustment to silence a trip or raise a threshold.',
        ],
        keyPoints: [
          'EMS curtailment: a charger below max may be under a site controller command, not hardware-limited',
          'Battery-buffered sites: BESS supplements the utility service to enable higher peak power on a smaller feed',
          'Two sources = two fault domains; know the site topology before attributing a fault',
          'Interconnection agreements govern protection settings — no field adjustments to silence utility-related trips',
        ],
        quiz: [
          {
            q: 'A DCFC at a battery-buffered site charges at 80 kW maximum despite the vehicle requesting 350 kW. No hardware faults are logged. The EMS dashboard shows "Grid-preserve mode: active." The correct interpretation is:',
            a: ['The DCFC power modules are failed', 'The EMS is actively curtailing the charger to manage site demand or BESS state — normal behavior under site control, not a hardware fault', 'The vehicle BMS is limiting', 'A network outage'],
            correct: 1,
            exp: 'EMS curtailment is a software command to the charger — the hardware is fine. Check the EMS operating mode before dispatching for hardware.',
          },
          {
            q: 'A newly commissioned DCFC site\'s protection settings on the utility interconnection are tripping under normal load. A tech wants to raise the trip setpoints to "stop the nuisance trips." The correct action is:',
            a: ['Raise the setpoints — the utility will not notice', 'Document, do not adjust: protection settings are specified by the interconnection agreement; escalate to the engineering and utility coordination teams', 'Lower the charger power limits instead', 'Replace the relay'],
            correct: 1,
            exp: 'Interconnection protection settings are legal commitments to the utility. Field adjustment without authorization violates the agreement — escalate, document, coordinate.' ,
          },
        ],
      },
    ],
    test: [
      { q: 'A new 4-DCFC site at 350 kW each typically requires:', a: ['An existing 100 A commercial service', 'A dedicated 2000–2500 kVA utility transformer and 480 V three-phase service', 'A residential 200 A panel', '120 V single-phase per charger'], correct: 1, exp: 'Four 350 kW chargers = 1400 kW peak; a dedicated transformer of 2000+ kVA is the site infrastructure reality.' },
      { q: 'Demand charges on a commercial utility bill are based on:', a: ['Total monthly energy (kWh)', 'The highest average kW or kVA over a 15- or 30-minute interval in the billing period', 'Number of sessions', 'Connector type used'], correct: 1, exp: 'Demand charges reflect the peak demand interval — one high-load event can set the month\'s demand charge regardless of average usage.' },
      { q: 'Load management at a DCFC site primarily exists to:', a: ['Improve vehicle battery life', 'Control peak demand to limit demand charges and stay within utility service limits', 'Provide RFID security', 'Enable firmware updates'], correct: 1, exp: 'Demand charge control and service capacity management are the operational and economic drivers of load management.' },
      { q: 'A DCFC limited to 60 kW by the EMS should be treated as:', a: ['Hardware failure requiring module replacement', 'Normal operation under site curtailment — verify EMS mode before dispatching for hardware', 'A network fault', 'A connector temperature derate'], correct: 1, exp: 'EMS curtailment is a software command; check the site controller status before attributing output limits to hardware.' },
      { q: 'Battery-buffered charging sites use BESS to:', a: ['Replace the utility connection entirely', 'Supplement the utility service during peak demand, enabling higher charger power on a smaller utility feed', 'Provide backup power only', 'Reduce installation cost of the chargers'], correct: 1, exp: 'BESS allows a smaller utility connection to serve high-power chargers during peak charging — the demand-charge and infrastructure-upgrade economics.' },
      { q: 'NEC Article 625 covers:', a: ['Utility transformer sizing', 'Electric vehicle charging equipment — the governing code for EVSE', 'Battery storage systems', 'Utility interconnection agreements'], correct: 1, exp: 'Article 625 is the EVSE-specific code article; 705 covers interconnected sources, 706 covers standalone energy storage.' },
      { q: 'Revenue-grade metering at a DCFC site is required because:', a: ['OCPP requires it', 'The utility bills demand charges based on measured peak demand — accuracy directly affects the monthly bill', 'NEC 625.22 mandates it', 'The charger manufacturer specifies it'], correct: 1, exp: 'Demand charge billing depends on metering accuracy; utilities require revenue-grade meters at charging sites.' },
      { q: 'Protection coordination at a DCFC site means:', a: ['All breakers are the same rating', 'A charger-level fault trips the charger\'s branch breaker, not the main — verified during commissioning', 'GFCI is coordinated with OCPP', 'The utility and charger protection settings match'], correct: 1, exp: 'Selective coordination: a fault at the charger opens the nearest upstream OCPD, not the building main — commissioning verification item.' },
      { q: 'Utility interconnection agreements govern:', a: ['OCPP version requirements', 'Maximum import demand, export limits, metering requirements, and protection settings — a legal document, not a field-adjustable document', 'Cable connector types', 'Software update schedules'], correct: 1, exp: 'The interconnection agreement is the utility-operator contract. Field techs document and escalate, they do not unilaterally modify protection settings.' },
      { q: 'A battery-buffered DCFC site has two active fault domains:', a: ['Only the charger hardware', 'The BESS and the DCFC — both require service and have independent fault modes', 'The utility and the network', 'The cable and the connector'], correct: 1, exp: 'Two sources: BESS (charge/discharge, BMS, thermal) and DCFC (power modules, cable, connector, network) — the site topology defines the fault map.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 17 — EV CHARGER TROUBLESHOOTING CAPSTONE
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ev-troubleshooting',
    num: 17,
    title: 'EV Charger Troubleshooting Capstone',
    desc: 'Dead units, failed sessions, derated charging, and backend log reading — the universal method at the charging plaza.',
    slides: [
      {
        title: 'The Dead-Charger Tree and Failed Sessions',
        body: [
          'Every EV charger troubleshooting call reduces to one of four initial findings: COMPLETELY DEAD (no display, no response), AVAILABLE BUT WON\'T START A SESSION, CHARGES BUT DERATED, or INTERMITTENT. Work the tree from outside in — power before boards, network before hardware, remote before rolling. THE COMPLETELY DEAD CHARGER: first remote check (OCPP logs — is it sending Heartbeat? If yes, the hardware is alive; if no, you have either a connectivity or power problem). On-site: utility voltage at the service disconnect (measure it, never assume it), branch circuit breaker status, main disconnect in the charger, and then internal fusing. A DCFC cabinet that powers its display and cooling fans but shows a fault is not dead — it is a fault in one of the power stacks. A cabinet with zero response is a power-supply or control-board failure. The dead-display versus live-display distinction focuses the next step.',
          'THE SESSION-STARTING FAILURE (charger available but will not initiate) cascades through three layers: AUTHORIZATION (did the backend authorize the user? Check OCPP logs for Authorize: Accepted/Rejected), HANDSHAKE (L2: pilot signal states; DCFC: vehicle communication and negotiation), and POWER INITIATION (did the contactor close? Did DC voltage appear on the output?). Work the log first — authorization failures are backend issues (whitelist, payment processor, account status) completely separate from hardware; handshake failures are connector/pilot/communication-protocol issues; power initiation failures are contactor, control board, or power module issues. Arriving on-site without reading the OCPP session log is working blind.',
          'The FAILED-SESSION DURING CHARGING (session starts then terminates) maps onto a different cause set: a session that ends at exactly 15 minutes is a session timeout configured in the OCPP backend (MaxChargingTime parameter); a session that ends when vehicle reaches 80% SOC is the vehicle stopping it (normal BMS behavior on many vehicles in hot weather); a session that ends with a "DeAuthorized" OCPP reason is a backend billing or account issue; a session that ends with an "EVDisconnected" reason on a DCFC suggests a connector latch issue or vehicle-side release. Each OCPP StopTransaction carries a REASON code — reading it in the log is 80% of the diagnosis before the truck leaves the yard.',
        ],
        keyPoints: [
          'Dead charger tree: OCPP Heartbeat present? → hardware alive; absent → connectivity or power',
          'Session won\'t start: work Authorization → Handshake → Power Initiation in log order',
          'Session terminates: read OCPP StopTransaction reason code — 80% of the diagnosis is there',
          'Never dispatch without reading the OCPP session log for the specific session in question',
        ],
        quiz: [
          {
            q: 'A DCFC shows as "offline" in the portal but when you arrive the display is fully lit and shows "Available." The OCPP log shows Heartbeat messages stopped 4 hours ago then resumed 2 hours ago, currently active. The unit is:',
            a: ['Hardware-failed', 'Currently functional: the 4-hour gap was a connectivity outage, now resolved — the charger\'s hardware was never affected', 'Partially failed — needs a module swap', 'Stuck in reboot loop'],
            correct: 1,
            exp: 'Heartbeat resumed = connectivity restored = hardware was fine throughout. The portal\'s "offline" lag reflects the connectivity gap, not a hardware condition.',
          },
          {
            q: 'A session log shows: Authorize: Accepted → StartTransaction → StopTransaction: Reason=DeAuthorized at 3 minutes. The fault is:',
            a: ['A failed power module', 'The backend de-authorized the session mid-charge — billing system, payment processing, or account status issue, not hardware', 'A connector latch failure', 'A vehicle BMS stop'],
            correct: 1,
            exp: 'DeAuthorized is a backend-originated session termination. The hardware worked; the backend pulled the authorization — investigate the payment/account system.',
          },
        ],
      },
      {
        title: 'Derated Charging, Backend Logs, and Field Safety',
        body: [
          'DERATED CHARGING is the most nuanced troubleshooting scenario because derating can come from five distinct sources: 1) EMS CURTAILMENT — site controller limiting per demand threshold (check EMS, no hardware fault); 2) POWER MODULE FAULT — one brick derated or offline (per-module status on display/portal); 3) CONNECTOR THERMAL — contact resistance rising during session (connector temp sensor log, warm handle on disconnect); 4) COOLING SYSTEM — elevated inlet coolant or air temp (coolant temperature log, filter status); 5) VEHICLE BMS — the vehicle commanded lower power (DCFC negotiated output shows declining current with stable module status). The diagnostic discipline: identify which derating source by eliminating them in reverse complexity order — check EMS, then module status, then connector, then cooling, then vehicle. Avoid the expensive sequence of checking hardware before checking software.',
          'USING BACKEND LOGS WITH ON-SITE INSTRUMENTS is the bilateral technique that the kitchen-course telemetry lesson introduced and this course makes mandatory. At a DCFC, the backend logs provide SESSION-RESOLUTION data: timestamps to the second, per-session energy curves, fault codes during the session, and OCPP state transitions. On-site instruments provide PRESENT-STATE data: voltages at the charger input and output terminals, connector pin resistance, coolant temperature, and cellular signal strength. Neither replaces the other: logs tell you what happened historically; instruments tell you what the site is doing right now. The standard diagnostic sequence — logs first, then instrument verification of the suspected subsystem — produces diagnoses that can be written up and defended to the operator. "I replaced the module because it seemed warm" is not a diagnosis; "Module 3 logged Overtemperature at 47°C on three consecutive afternoons, coolant inlet was 52°C against 40°C spec, pump flow was 30% of rated" is.',
          'FIELD SAFETY at EV charger sites has three domains: the AC SIDE (480 V three-phase; NFPA 70E arc-flash PPE per the site\'s hazard analysis; LOTO on the utility disconnect and the charger main before working inside); the DC SIDE inside DCFC cabinets (the DC bus discharge verification protocol from module 13 — wait then verify before touching); and the LIVE-VEHICLE-CONNECTED STATE (DCFC output conductors are energized at negotiated vehicle voltage during a session — never work on output wiring with a vehicle connected; always confirm the session is terminated and output voltage has discharged to zero before accessing output terminals). A battery-buffered site adds a BESS DC source on the same bus — two-source LOTO is required; confirm BOTH sources are isolated before working on any shared conductor. One source, one isolation is the accident waiting to happen at buffered sites.',
        ],
        keyPoints: [
          'Derating source order: EMS → module status → connector → cooling → vehicle BMS (cheapest first)',
          'Logs give historical session data; instruments give present state — the bilateral technique',
          'Document findings: timestamp, measured value, spec, deviation — not "it seemed warm"',
          'Battery-buffered sites: LOTO both BESS and utility before working on any shared DC bus conductor',
        ],
        quiz: [
          {
            q: 'A 350 kW DCFC is consistently delivering 200 kW max. EMS shows no curtailment active. Per-module status shows all modules healthy. Connector pin resistance is 3 mΩ (spec ≤5 mΩ). Coolant inlet is 52°C against 40°C spec. The root cause is:',
            a: ['A failed power module', 'Cooling system: elevated coolant inlet temperature causing thermal derating — investigate pump, heat exchanger, and coolant level', 'EMS configuration error', 'Connector thermal derating'],
            correct: 1,
            exp: 'EMS clear, modules healthy, connector fine — only the elevated coolant temperature remains. Thermal derating at 52°C with a 40°C spec is the root cause; the cooling loop is the fault domain.' ,
          },
          {
            q: 'At a battery-buffered DCFC site, a tech is about to work on the charger output DC wiring. LOTO is complete on the DCFC main disconnect. The remaining safety step is:',
            a: ['Wear standard safety glasses', 'Also isolate the BESS: two-source LOTO — the BESS may still be connected to the output bus even with the charger main open', 'Verify vehicle is unplugged', 'Check the OCPP log'],
            correct: 1,
            exp: 'BESS sites have two DC sources on the output bus. Isolating only the charger main leaves the BESS energizing the same conductors — two-source LOTO is required.',
          },
        ],
      },
    ],
    test: [
      { q: 'A DCFC with a lit display showing "Fault" is:', a: ['Completely dead — replace it', 'Partially functional: display and controls have power; the fault is in the power or communication subsystem, not total loss', 'Network-only failure', 'A connector issue only'], correct: 1, exp: 'Lit display = control system alive; the fault is isolated to the subsystem triggering the error — not a total hardware failure.' },
      { q: 'The first step in EV charger troubleshooting before dispatch is:', a: ['Order a replacement unit', 'Read the OCPP session logs for the specific failed session — authorization, handshake, stop reason', 'Replace the modem', 'Check the utility bill'], correct: 1, exp: 'Logs first: session-specific OCPP data narrows the fault domain before any truck moves.' },
      { q: 'OCPP StopTransaction Reason: "EVDisconnected" on a DCFC suggests:', a: ['A billing system failure', 'The vehicle disconnected (connector latch, vehicle-side release, or drive-off) — a connector or vehicle-side mechanical investigation', 'A power module fault', 'A firmware error'], correct: 1, exp: 'EVDisconnected is the charger reporting that the vehicle plug was removed — mechanical or latch domain, not software or power.' },
      { q: 'Derated charging with EMS curtailment active means:', a: ['Hardware replacement is needed', 'The site controller is deliberately limiting output — verify EMS mode before touching hardware', 'A module has failed', 'The vehicle BMS is at fault'], correct: 1, exp: 'EMS curtailment is intentional software-level throttling. Confirm the site controller state before any hardware intervention.' },
      { q: 'Backend logs vs on-site instruments serve different purposes:', a: ['They are redundant — only use one', 'Logs give historical session timeline; instruments give present state — both required for a complete diagnosis', 'Instruments are always more accurate', 'Logs are only for billing disputes'], correct: 1, exp: 'The bilateral technique: logs tell you what happened; instruments tell you what is happening now. Neither replaces the other.' },
      { q: 'DCFC output terminals should be accessed only after:', a: ['The session timeout expires', 'Session terminated AND output voltage confirmed at zero — not just session stopped', 'LOTO on the AC main only', 'The display shows "Available"'], correct: 1, exp: 'Output DC voltage persists briefly after session termination. Zero-voltage verification on output terminals is the required step before access.' },
      { q: 'A session that consistently ends at exactly 15 minutes is most likely caused by:', a: ['A connector latch failure', 'An OCPP backend configuration (MaxChargingTime parameter) timing out sessions — a backend change, not hardware', 'Vehicle BMS limitation', 'A GFCI trip'], correct: 1, exp: 'Exactly-timed session terminations are a configured backend parameter, not random hardware events.' },
      { q: '"Module 3 logged Overtemperature at 47°C on three consecutive afternoons, coolant inlet was 52°C" is an example of:', a: ['Excessive documentation', 'A proper documented diagnosis: timestamp, measured value, and spec deviation — defensible and actionable', 'An OCPP fault code', 'A vehicle log entry'], correct: 1, exp: 'Quantified findings with time patterns and measured deviations are diagnoses. "It seemed warm" is not.' },
      { q: 'At a battery-buffered DCFC site, two-source LOTO is required because:', a: ['It is always required everywhere', 'BESS and utility are both connected to the DC bus — isolating one source leaves the other energizing shared conductors', 'The charger has two modules', 'NEC 625 requires it at all sites'], correct: 1, exp: 'Two independent DC sources share the output bus at buffered sites — LOTO must account for both before any work on shared conductors.' },
      { q: 'The derating diagnosis order (cheapest to most complex) is:', a: ['Vehicle → cooling → connector → modules → EMS', 'EMS curtailment → module status → connector thermal → cooling → vehicle BMS', 'Modules → EMS → connector → cooling → vehicle', 'Network → utility → cooling → modules → EMS'], correct: 1, exp: 'Software first: EMS is a remote check. Then hardware in order of ease: per-module status (portal), connector resistance (meter), cooling (temperature), vehicle BMS (last — it requires vehicle cooperation).' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 18 — CAREER IN EV CHARGING INFRASTRUCTURE
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ev-career',
    num: 18,
    title: 'Career in EV Charging Infrastructure',
    desc: 'EVITP, network operators, uptime contracts, and where EV charging careers go in the buildout decade.',
    slides: [
      {
        title: 'The EV Charging Market and Your Role In It',
        body: [
          'EV charging infrastructure is one of the fastest-growing electrical trades in North America — not because it is new technology, but because deployment is in a historically accelerated phase. Federal and state grant programs (NEVI — National Electric Vehicle Infrastructure — allocated billions for highway corridor charging deployment), utility incentive programs, automaker charging network investments, and commercial real estate charging mandates are collectively driving installation rates that outpace the available trained workforce by a wide margin. The DCFC service technician shortage is real, documented, and creating premium compensation packages at network operators and OEM service organizations. This is not a niche — it is the mainstream power electronics service trade of the next decade.',
          'The EMPLOYER LANDSCAPE for EV charging techs divides into four sectors: CHARGING NETWORK OPERATORS (companies like EVgo, Blink, ChargePoint, Electrify America, and their regional competitors) employ field service technicians, regional service managers, and operations center analysts — they own the hardware and the uptime obligation. EV CHARGER MANUFACTURERS (ABB E-mobility, BTC Power, Tritium, Delta, Efacec, and others) run factory-trained field service and warranty teams. ELECTRICAL CONTRACTORS who specialize in EVSE installation increasingly add service contracts to their installation business — the install crew and the service crew overlap. FLEET OPERATORS — commercial truck fleets, transit agencies, school districts — build their own charging depots and need technicians who understand both the charger hardware and the fleet operations context. Your EVITP credential and field service training are valued in all four.',
          'COMPENSATION ENTRY POINTS for Jr. EV Charging technicians (the credential this course prepares you for) run $22–$32/hour depending on geography and employer, with progression toward senior field roles at $35–$55/hour and regional service manager roles above that. Uptime contract service roles, where you are accountable for a portfolio of charger sites against an SLA, carry performance bonuses tied to uptime percentages — the commercial incentive that makes PM discipline personal. Per-diem travel roles at network operators are the aggressive income path for techs willing to cover multi-state territories.',
        ],
        keyPoints: [
          'NEVI, utility programs, and automaker networks are driving EV charger deployment beyond trained workforce supply',
          'Four employer sectors: network operators, charger OEMs, electrical contractors, fleet operators',
          'Jr. EV tech entry: $22–$32/hour; senior/regional roles: $35–$55/hour and above',
          'Uptime contract roles tie compensation to SLA performance — PM discipline becomes economic incentive',
        ],
        quiz: [
          {
            q: 'The NEVI program (National Electric Vehicle Infrastructure) is significant to EV charging techs because:',
            a: ['It sets OCPP standards', 'It funds highway corridor DCFC deployment at scale, accelerating the demand for trained installation and service technicians', 'It controls connector standards', 'It manages RFID authentication'],
            correct: 1,
            exp: 'NEVI allocated billions for corridor charging, directly creating deployment volume and the corresponding technician demand that exceeds trained supply.',
          },
          {
            q: 'An uptime contract role at a network operator ties your bonus to charger uptime percentages. This means:',
            a: ['You are penalized for any weather events', 'PM discipline and proactive parts replacement directly affect your compensation — the SLA aligns incentives with reliability', 'You must work weekends only', 'The network operator absorbs all costs'],
            correct: 1,
            exp: 'SLA-tied compensation makes proactive PM personal: your uptime percentage drives your bonus, not just the operator\'s reputation.',
          },
        ],
      },
      {
        title: 'EVITP, Licensing, Credentials, and Career Paths',
        body: [
          'EVITP — the Electric Vehicle Infrastructure Training Program — is the industry\'s primary credential for EV charging installation and service technicians. Developed by IBEW and NECA with automaker and network operator input, EVITP certification validates competency in EVSE installation (NEC 625 knowledge, load calculations, branch circuit requirements) and is increasingly specified by name in network operator service contracts and NEVI-funded project requirements. The EVITP Installer credential (EVITP-I) covers installation; service-focused roles increasingly look for EVITP plus manufacturer training on specific hardware platforms. As this portal\'s credential demonstrates your field service knowledge, pairing it with EVITP-I and OEM training on one or two charger brands builds the most competitive service profile.',
          'ELECTRICAL LICENSING context matters for career trajectory: most jurisdictions require a licensed electrician (journeyperson or master) to pull permits for EVSE installation. A field service tech without an electrical license can legally service and maintain existing EVSE in most jurisdictions (maintenance vs. installation distinction) but cannot pull a permit for a new circuit or a replacement unit on a new branch. The career-accelerating path: your service credential now, EVITP alongside or after, journeyperson apprenticeship if the income progression and permit-pulling scope appeals. Techs with both a service background and an electrical license are the highest-compensation cohort in the EV infrastructure field — they can do the full scope of work, not just maintenance.',
          'CAREER PATH PROGRESSIONS in EV charging service follow the familiar pattern from the other courses: FIELD TECHNICIAN (hardware service, PM, first-line response) → SENIOR TECH (territory ownership, mentoring, complex escalations) → REGIONAL SERVICE MANAGER (portfolio of sites, SLA accountability, team management) → NETWORK OPERATIONS ANALYST (remote diagnostics, OCPP backend, firmware management, not primarily field-based). A parallel path exits toward COMMISSIONING — the tech who starts up new sites, verifies protection coordination, configures OCPP, and conducts acceptance testing is a different specialty with different skills from break/fix service. Both need the foundation this course provides; commissioning adds project management and one-line literacy at depth.',
        ],
        keyPoints: [
          'EVITP-I credential: NEC 625 knowledge, load calculations — specified by network operators and NEVI projects',
          'Service credential + EVITP + OEM platform training = competitive field service profile',
          'Electrical license unlocks permit-pulling scope and the highest compensation bracket',
          'Career paths: field → senior → regional manager; or field → commissioning specialty',
        ],
        quiz: [
          {
            q: 'Why do NEVI-funded DCFC projects increasingly specify EVITP certification?',
            a: ['It is required by the OCPP standard', 'Federal program requirements emphasize trained installation workforce; EVITP is the recognized industry credential for that training', 'EVITP includes a utility license', 'Network operators invented it'],
            correct: 1,
            exp: 'NEVI program guidelines favor credentialed installer workforces; EVITP is the named credential in many program specifications and service contracts.',
          },
          {
            q: 'A field service tech without an electrical license typically:',
            a: ['Cannot legally service any EVSE', 'Can legally maintain and service existing EVSE in most jurisdictions but cannot pull permits for new installations or circuits', 'Is not eligible for EVITP', 'Cannot work at network operator sites'],
            correct: 1,
            exp: 'The installation vs. maintenance distinction governs licensing scope in most jurisdictions. Service work on existing hardware differs from permitted new installation work.',
          },
        ],
      },
    ],
    test: [
      { q: 'EVITP stands for:', a: ['Electric Vehicle Integration Technology Program', 'Electric Vehicle Infrastructure Training Program — the industry credential for EVSE installation and service techs', 'EV Interconnection and Transformer Protocol', 'EVSE Inspection and Testing Procedures'], correct: 1, exp: 'EVITP is the IBEW/NECA-developed credential increasingly required by network operators and federal program projects.' },
      { q: 'The NEVI program is driving technician demand because:', a: ['It trains technicians directly', 'It funds highway corridor DCFC deployment at scale, creating installation and service volume beyond the available trained workforce', 'It controls charger pricing', 'It certifies DCFC manufacturers'], correct: 1, exp: 'NEVI\'s federal funding accelerates deployment. Deployment volume creates technician demand that currently exceeds trained supply — a hiring market.' },
      { q: 'Entry compensation for Jr. EV Charging technicians is approximately:', a: ['$12–$15/hour', '$22–$32/hour depending on geography and employer', '$60–$80/hour immediately', '$18/hour nationally flat'], correct: 1, exp: 'Jr. EV tech entry rates reflect the technical specialty and credential: $22–$32/hour, with progression to $35–$55+ in senior roles.' },
      { q: 'Network operator employers primarily need field techs to:', a: ['Manufacture charger hardware', 'Maintain uptime SLAs on their deployed charger fleet — service, PM, and rapid response to outages', 'Write OCPP software', 'Negotiate utility interconnection agreements'], correct: 1, exp: 'Network operators own the hardware and the uptime obligation; field techs are the SLA delivery mechanism.' },
      { q: 'EVITP-I certification focuses on:', a: ['Vehicle battery service', 'EVSE installation: NEC 625 knowledge, load calculations, branch circuit requirements, and safe installation practice', 'OCPP protocol design', 'Utility transformer sizing'], correct: 1, exp: 'EVITP-I validates the installation competency — NEC 625 knowledge is the core, with load calculation and safe installation practice.' },
      { q: 'A tech with both a service credential and a journeyperson electrical license can:', a: ['Only do service, not installs', 'Pull permits for new EVSE installations in addition to maintenance work — the highest-compensation scope', 'Only install, not service', 'Only work for contractors'], correct: 1, exp: 'The electrical license unlocks permit-pulling scope. Service-trained techs who can also permit installations are the market\'s highest-compensation cohort.' },
      { q: 'A commissioning specialist in EV charging focuses on:', a: ['Break/fix emergency response', 'New site startup: protection coordination verification, OCPP configuration, acceptance testing — distinct from break/fix service', 'Fleet driver training', 'BESS battery chemistry'], correct: 1, exp: 'Commissioning is a distinct specialty from break/fix: one-line verification, OCPP setup, and acceptance testing at new sites.' },
      { q: 'An uptime SLA at a network operator means the technician:', a: ['Has no performance metrics', 'Is accountable for site uptime percentages, with compensation tied to SLA performance', 'Only responds to hardware failures', 'Does not need PM knowledge'], correct: 1, exp: 'SLA accountability aligns tech incentives with reliability. PM and proactive replacement matter financially, not just professionally.' },
      { q: 'Charger OEM (manufacturer) service teams primarily provide:', a: ['Network operator contracts', 'Factory-trained warranty and field service on their specific hardware platforms', 'Utility interconnection services', 'RFID card issuance'], correct: 1, exp: 'OEM service teams know their platform in depth — specialized training on one brand\'s hardware, supporting warranty and out-of-warranty service.' },
      { q: 'The network operations analyst career path focuses on:', a: ['Hands-on hardware replacement', 'Remote diagnostics, OCPP backend, and firmware management — portfolio-level monitoring, not primarily field work', 'Electrical permitting', 'Utility transformer maintenance'], correct: 1, exp: 'NOC analyst is the operations-center path: OCPP expertise, fleet monitoring, remote diagnostics — adjacent to but different from field service.' },
    ],
  },
];
