import type { TrainingModule } from './modules';

export const POOL_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULE 11 — POOL PUMP MOTORS & HYDRAULICS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'pool-motors',
    num: 11,
    title: 'Pool Pump Motors & Hydraulics',
    desc: 'Variable speed pump technology, DOE efficiency mandates, TDH calculation, and pump-system curve matching.',
    slides: [
      {
        title: 'Variable Speed Pump Technology',
        body: [
          'Pool pumps are classified as single-speed (one fixed RPM), dual-speed (two speeds, typically 3,450 and 1,725 RPM), or variable speed (VSP, continuously adjustable RPM via built-in variable frequency drive).',
          'Pump affinity laws govern the relationship between speed, flow, pressure, and power: flow rate is proportional to speed (Q ∝ N), head pressure is proportional to speed squared (H ∝ N²), and power consumed is proportional to speed cubed (P ∝ N³).',
          'The cubic power relationship makes VSPs dramatically efficient at reduced speeds: operating at half speed consumes only 1/8 the power — a pump drawing 2,000 W at 3,450 RPM draws only 250 W at 1,725 RPM.',
          'The U.S. Department of Energy (DOE) issued a final rule effective July 19, 2021, requiring all single-phase pool pumps above 1 HP (with limited exceptions) to be variable speed — single-speed pumps above 1 HP can no longer be manufactured or imported for residential pools.',
          'Typical VSP operating ranges: filtration at 1,500–2,000 RPM (low flow, high efficiency), feature operation (spa jets, waterfalls) at 2,500–3,000 RPM, priming/vacuum at full speed (3,450 RPM).',
          'VSPs use permanent magnet motors rather than standard induction motors — permanent magnet motors are more efficient at partial speed, have no capacitor failure mode, and provide electronically-adjustable speed via the built-in VFD.',
          'Energy savings from a VSP replacing a single-speed pump are typically 70–80% reduction in pump energy cost — most residential VSPs pay for themselves in 1–3 years through electricity savings alone.',
        ],
        keyPoints: [
          'P ∝ N³: half speed = 1/8 power — the cubic law makes variable speed economically transformative',
          'DOE 2021 mandate: pool pumps >1 HP must be variable speed — single-speed pumps above 1 HP cannot be sold for residential use',
          'VSPs use permanent magnet motors + built-in VFD — no capacitor failure mode, electronically programmable',
        ],
        quiz: [
          {
            q: 'A pool pump operating at full speed (3,450 RPM) draws 1,800 W. If speed is reduced to half (1,725 RPM), approximately how much power does it consume?',
            a: ['900 W (half power)', '450 W (quarter power)', '225 W (one-eighth power)', '150 W (one-twelfth power)'],
            correct: 2,
            exp: 'The pump affinity law states power scales with the cube of speed ratio: (1,725/3,450)³ = (0.5)³ = 0.125. Therefore 1,800 W × 0.125 = 225 W. This cubic relationship is why variable speed pumps produce dramatic energy savings at lower filtration speeds.',
          },
          {
            q: 'The DOE 2021 pool pump rule requires which type of motor in pool pumps above 1 HP sold for residential use?',
            a: ['Single-phase induction motors with two speeds', 'Three-phase motors only', 'Variable speed (permanent magnet) motor with integrated VFD', 'Any ENERGY STAR certified motor regardless of speed'],
            correct: 2,
            exp: 'The DOE rule requires pool pumps above 1 HP for residential use to be variable speed — effectively requiring a permanent magnet motor with integrated variable frequency drive capable of continuous speed adjustment.',
          },
        ],
      },
      {
        title: 'Pump Hydraulics & System Curve Matching',
        body: [
          'Total Dynamic Head (TDH) is the total resistance the pump must overcome to maintain the design flow rate, expressed in feet of head — it is the sum of friction losses through all pipe, fittings, valves, and the filter, plus any static head differences.',
          'Friction loss through pipe depends on pipe diameter, flow rate, and pipe length — larger diameter pipe dramatically reduces friction; doubling pipe diameter reduces friction loss by approximately a factor of 32 at the same flow rate.',
          'Filter resistance is a major TDH contributor and increases as the filter loads with debris — a clean sand filter might add 5 psi; a dirty filter approaching backwash pressure can add 12–15 psi (28–35 feet of head).',
          'The pump curve plots head (feet) versus flow rate (GPM) at a given speed; the system curve plots the TDH the plumbing system requires at each flow rate — the operating point is where these two curves intersect.',
          'VSP flow rates are set by programming the pump speed; at lower speeds, the operating point moves to lower flow and lower head on the system curve — this is why low-speed filtration still works even though pressure is greatly reduced.',
          'Cavitation occurs when absolute pressure at the pump impeller eye drops below the vapor pressure of water — symptoms include a gravel-like noise, reduced flow, and eventual impeller erosion; causes include air leaks on the suction side, partially closed suction valve, clogged basket, or excessive suction lift.',
          'A pump that runs but shows zero or very low flow (with normal motor operation) is most likely air-bound — insufficient priming, a suction-side air leak, or a check valve stuck open on a re-circulation line.',
        ],
        keyPoints: [
          'TDH = sum of all friction losses + filter resistance + static head — filter condition directly affects operating TDH',
          'System curve intersects pump curve at operating point; VSP shifts the pump curve down to find a new lower operating point',
          'Cavitation: suction-side air leaks, low suction pressure, or high flow demand — gravel noise + reduced flow are key symptoms',
        ],
        quiz: [
          {
            q: 'A pool pump is running at rated speed but producing very low flow and making a rattling/gravel noise. The most likely cause is:',
            a: ['High filter pressure indicating the filter needs backwashing', 'Cavitation — caused by air leaks on the suction side, insufficient water level, or a clogged pump basket', 'The pump impeller is oversized for the plumbing', 'A clogged DE filter grid requiring cleaning'],
            correct: 1,
            exp: 'Cavitation produces a distinctive gravel or rattling noise as vapor bubbles collapse on the impeller. The root cause is low absolute pressure at the impeller inlet — suction-side air leaks, low pool water level, partially closed suction valve, or clogged strainer basket are common culprits.',
          },
          {
            q: 'A pool system shows 8 psi at the filter inlet on a clean filter. After two weeks without backwash, pressure reads 20 psi. What has changed about the system TDH?',
            a: ['TDH decreased because the pump is running faster', 'TDH increased because filter media loading adds resistance, requiring more head to maintain the same flow', 'TDH is unchanged — filter pressure does not affect TDH', 'TDH decreased because dirty filter media absorbs pump pulsations'],
            correct: 1,
            exp: 'A dirty filter has more debris embedded in the media, increasing flow resistance. This adds to the system TDH at any given flow rate, moving the operating point up the system curve — flow actually decreases unless the pump speed or pressure increases to compensate.',
          },
        ],
      },
    ],
    test: [
      { q: 'According to the pump affinity law, if a pool pump speed increases from 1,725 to 3,450 RPM (doubles), flow rate:', a: ['Doubles', 'Triples', 'Increases by 4×', 'Increases by 8×'], correct: 0, exp: 'Flow rate scales linearly with speed (Q ∝ N). Doubling speed doubles flow rate. Head scales with speed squared (×4), and power scales with speed cubed (×8).' },
      { q: 'If a pool pump doubles its speed, power consumption changes by a factor of:', a: ['2 (doubles)', '4 (quadruples)', '8 (eight times)', '16 (sixteen times)'], correct: 2, exp: 'Power scales with the cube of speed ratio (P ∝ N³). Doubling speed: 2³ = 8. Power increases eightfold. This is why reducing speed from 3,450 to 1,725 RPM reduces power to 1/8 — the fundamental economic case for variable speed pumps.' },
      { q: 'The DOE pool pump energy efficiency rule that took effect in July 2021 requires:', a: ['All pool pumps to be dual-speed minimum', 'All single-phase pool pumps above 1 HP for residential use to be variable speed', 'All commercial pool pumps to use three-phase motors', 'Single-speed pumps to include a timer'], correct: 1, exp: 'The DOE rule targets the largest energy consumers — above 1 HP single-phase pumps. Pumps at or below 1 HP, three-phase pumps for commercial pools, and submersible pumps have different requirements or exemptions.' },
      { q: 'Total Dynamic Head (TDH) is the sum of:', a: ['Filter pressure × pipe length', 'All pipe, fitting, and filter friction losses plus any static head difference', 'Maximum pressure at the pump discharge only', 'Velocity head at the return jet nozzles'], correct: 1, exp: 'TDH accounts for every component of resistance: pipe friction losses (length + diameter dependent), fitting losses (elbows, tees, valves), filter resistance (varies with cleanliness), and any elevation difference between water surface and pump.' },
      { q: 'A pool pump basket is severely clogged with leaves, restricting suction flow. The most likely effect on pump performance is:', a: ['Higher discharge pressure with same flow rate', 'Reduced flow rate and possible cavitation from reduced suction pressure', 'Higher motor amperage draw without change in flow', 'Increased filter pressure with unchanged pump speed'], correct: 1, exp: 'A clogged basket restricts suction flow, dropping absolute pressure at the impeller. If pressure drops below water\'s vapor pressure, cavitation begins. Flow decreases because the restriction limits how much water the impeller can move.' },
      { q: 'A residential pool pump is rated at 1.5 HP. Under the DOE 2021 rule, this pump must be:', a: ['Single-speed is acceptable since it is under 2 HP', 'Variable speed — any single-phase residential pool pump above 1 HP must be variable speed', 'Dual-speed minimum — variable speed is required only above 2 HP', 'No restriction — HP ratings do not trigger the rule'], correct: 1, exp: 'The DOE rule covers single-phase pool pumps above 1 HP for residential inground pools. At 1.5 HP, this pump is subject to the variable speed requirement — single-speed 1.5 HP pool pumps cannot be manufactured or imported for residential use.' },
      { q: 'Why do variable speed pool pumps use permanent magnet motors rather than traditional capacitor-start induction motors?', a: ['Permanent magnet motors are cheaper to manufacture', 'Permanent magnet motors maintain high efficiency at variable speeds; induction motors have poor efficiency at partial load, and capacitors fail over time', 'Permanent magnet motors run on DC and do not require an inverter', 'Induction motors exceed the DOE efficiency ratings for variable speed operation'], correct: 1, exp: 'Permanent magnet motors have efficiency curves that remain high across a broad speed range. Capacitor-start induction motors are efficient at rated speed but lose efficiency significantly at reduced speed. Eliminating the start/run capacitor also removes a common failure point.' },
      { q: 'A pool pump is programmed to run filtration at 1,200 RPM. What approximate percentage of full-speed (3,450 RPM) power does this consume?', a: ['35%', '12%', '4%', '1%'], correct: 2, exp: '(1,200/3,450)³ = (0.348)³ = 0.042 = approximately 4.2%. At 1,200 RPM, the pump uses about 4% of its full-speed power draw — illustrating why overnight low-speed filtration is so economical.' },
      { q: 'A pool technician replaces an older 2 HP single-speed pump with a 2 HP variable speed pump programmed to run at the same flow rate. The main immediately measurable benefit should be:', a: ['Higher filter pressure indicating better filtration', 'Significantly reduced electrical consumption since VSP optimizes speed to the minimum needed', 'Longer backwash intervals', 'Elimination of the need for a pool timer'], correct: 1, exp: 'Even at the same target flow rate, the VSP can often reduce speed slightly versus the fixed full-speed operation and let the system curve set the operating point more efficiently. Additionally, the owner can program lower speeds for off-peak filtration.' },
      { q: 'In pool hydraulics, doubling the pipe diameter (e.g., from 1.5" to 3") reduces friction loss at the same flow rate by approximately what factor?', a: ['2×', '8×', '16×', '32×'], correct: 3, exp: 'Friction loss in a pipe scales with 1/d⁴·⁸ (Hazen-Williams) — roughly proportional to the fifth power of diameter ratio. Doubling diameter: 2^5 ≈ 32. This is why upgrading undersized plumbing dramatically reduces TDH and allows VSPs to operate at lower, more efficient speeds.' },
      { q: 'The "operating point" of a pool pump system is defined as:', a: ['The maximum RPM the motor can achieve', 'The intersection of the pump curve and the system curve — where the pump\'s output matches what the plumbing system requires', 'The filter pressure when the pump runs at maximum speed', 'The point where cavitation begins on the pump curve'], correct: 1, exp: 'The pump curve shows what head the pump delivers at each flow rate; the system curve shows what head the plumbing demands at each flow rate. The pump runs at the intersection — where supply equals demand. This determines actual flow rate and pressure.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 12 — POOL ELECTRICAL SAFETY (NEC ARTICLE 680)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'pool-electrical',
    num: 12,
    title: 'Pool Electrical Safety — NEC Article 680',
    desc: 'Equipotential bonding, NEC 680 GFCI requirements, receptacle placement, underwater lighting, and service entrance rules.',
    slides: [
      {
        title: 'Equipotential Bonding & NEC 680.26',
        body: [
          'NEC Article 680 governs electrical installations for swimming pools, spas, hot tubs, and fountains — it is among the most detailed and safety-critical articles in the NEC due to the risk of electric shock drowning.',
          'Equipotential bonding (NEC 680.26) connects all metal within or near the pool to a common bonding grid to eliminate voltage gradients in and around the water — voltage gradients as small as 1–2 V in pool water can cause paralysis and drowning in a swimming person.',
          'The bonding grid must connect: the pool shell (rebar in concrete pools, the wall/floor of vinyl pools), all metal ladders, handrails, and deck anchors, underwater light niches, pool equipment metal housings (pump motor, filter, heater), and all metal within 5 feet horizontally of the pool water edge.',
          'The bonding conductor must be a solid copper conductor not smaller than #8 AWG — smaller gauges are not acceptable even for short runs, and aluminum is prohibited.',
          'Bonding is NOT grounding — the bonding conductor does not connect to the electrical service grounding electrode system; it creates an equipotential island that prevents voltage differences, not a path to earth ground.',
          'Stray voltage from nearby utilities, corroded connections, or failing pool equipment can appear in pool water even with no wiring errors — the bonding grid absorbs the voltage difference, but a licensed electrician must trace and eliminate the source.',
          'Pool shell bonding in concrete pools requires #8 AWG copper conductor connected to rebar at not more than 12-inch intervals and at all rebar crossings at the pool perimeter.',
        ],
        keyPoints: [
          'Equipotential bonding creates zero voltage gradient in the pool environment — prevents electric shock drowning',
          '#8 AWG solid copper minimum bonding conductor; all metal within 5 feet of water edge must be bonded',
          'Bonding is NOT grounding — does NOT connect to service ground; it is a separate safety system',
        ],
        quiz: [
          {
            q: 'The purpose of equipotential bonding around a swimming pool (NEC 680.26) is to:',
            a: ['Provide a ground fault path back to the service panel', 'Eliminate voltage gradients in and around the pool water, preventing electric shock drowning', 'Connect all metal fittings to the grounding electrode system', 'Bond the pool to the nearest grounding rod to protect lightning strikes'],
            correct: 1,
            exp: 'Equipotential bonding creates an equal-potential environment — all bonded metal and the water itself are at the same voltage, so no current flows through a person in the water (voltage, not current, causes the first harm). It is NOT a ground fault path; it is a gradient elimination system.',
          },
          {
            q: 'The minimum conductor size for the equipotential bonding grid in a swimming pool installation per NEC 680.26 is:',
            a: ['#12 AWG stranded copper', '#10 AWG solid copper', '#8 AWG solid copper', '#6 AWG stranded copper'],
            correct: 2,
            exp: '#8 AWG solid copper is the NEC minimum for pool bonding conductors. Solid (not stranded) copper is required for the bonding grid connections. Aluminum is prohibited in pool bonding applications due to corrosion concerns in the wet environment.',
          },
        ],
      },
      {
        title: 'GFCI Requirements & Receptacle Placement',
        body: [
          'NEC 680.22 requires GFCI protection for all 15 A and 20 A, 125 V through 250 V receptacles located within 20 feet of the pool edge, measured horizontally from the water\'s edge.',
          'No receptacle may be located closer than 6 feet from the pool edge — this minimum setback applies regardless of GFCI protection.',
          'Lighting within 5 feet of the pool edge must be GFCI protected; fixtures less than 12 feet above the pool water surface require GFCI regardless of horizontal distance.',
          '120 V underwater pool lights must be GFCI protected and installed in wet niches with a ground continuity monitor — if the ground wire in the underwater light cord breaks, the ground continuity monitor trips the circuit.',
          'Low-voltage (12 V or less) underwater lighting systems do not require GFCI but must use listed transformers with proper bonding of secondary winding and light housing.',
          'The pool equipment panelboard (service disconnect for the pool) must be located at least 5 feet from the pool edge and mounted in an accessible, lockable enclosure.',
          'Pool pump motor circuits typically require a time-clock or automation controller — running the pump as required by health codes (6–8 hour turnover for residential) is a regulatory compliance requirement in many jurisdictions.',
        ],
        keyPoints: [
          'GFCI required for all receptacles within 20 feet of pool edge; no receptacle within 6 feet of edge',
          '120 V underwater lights require GFCI + ground continuity monitor — ground wire break trips the circuit automatically',
          'Pool equipment panelboard must be at least 5 feet from pool edge, in accessible lockable enclosure',
        ],
        quiz: [
          {
            q: 'NEC 680.22 requires GFCI protection for receptacles within what distance of the pool water edge?',
            a: ['6 feet', '10 feet', '15 feet', '20 feet'],
            correct: 3,
            exp: 'All 125 V to 250 V receptacles within 20 feet (measured horizontally from the water edge) must be GFCI protected. No receptacle may be located closer than 6 feet from the water edge regardless of GFCI protection.',
          },
          {
            q: 'A 120 V underwater pool light requires which protection beyond standard GFCI?',
            a: ['AFCI protection on the branch circuit', 'A ground continuity monitor that trips the circuit if the light\'s ground conductor is broken', 'A 15-minute timer to prevent overheating of the underwater housing', 'A dual-pole GFCI breaker sized at 150% of the light fixture wattage'],
            correct: 1,
            exp: 'NEC requires underwater pool light circuits to include a ground continuity monitor. If the ground conductor in the light cord is broken (a real failure mode), the monitor detects loss of continuity and trips the circuit — preventing a live chassis from energizing the pool water.',
          },
        ],
      },
    ],
    test: [
      { q: 'NEC Article 680 governs electrical installations for:', a: ['Marine vessels at marina docks', 'Swimming pools, spas, hot tubs, and decorative fountains', 'Hydroelectric power generation facilities', 'Water treatment plant pump stations'], correct: 1, exp: 'NEC 680 is specifically dedicated to swimming pools, hot tubs, spas, fountains, and similar installations where electrical equipment operates in proximity to water where persons may be immersed.' },
      { q: 'Electric shock drowning (ESD) occurs when:', a: ['Pool chemicals create an electrically conductive solution at high concentration', 'Voltage gradients in pool water cause current to flow through a swimmer\'s body, causing paralysis and drowning', 'Lightning strikes the pool water during a storm', 'A GFCI fails to trip when a hair dryer falls into the pool'], correct: 1, exp: 'ESD occurs when AC current (from stray voltage, wiring faults, or nearby utility ground currents) creates a voltage gradient in the pool water. A swimmer bridging the gradient becomes a current path — currents as low as 10 mA through the body can cause muscle paralysis and drowning.' },
      { q: 'The NEC 680.26 equipotential bonding conductor must be:', a: ['#12 AWG stranded aluminum or copper', '#10 AWG stranded copper', '#8 AWG solid copper', '#6 AWG stranded copper or aluminum'], correct: 2, exp: '#8 AWG solid copper is the minimum NEC 680.26 specification. Stranded conductor is not permitted for the bonding grid connections (though it may be used for portions of the run with proper termination). Aluminum is prohibited in pool bonding applications.' },
      { q: 'Under NEC 680.22, what is the minimum setback distance for any receptacle from the pool water edge?', a: ['3 feet', '6 feet', '10 feet', '20 feet'], correct: 1, exp: 'No receptacle may be located within 6 feet of the pool water edge, period. Between 6 and 20 feet, receptacles are permitted but must be GFCI protected. Beyond 20 feet, standard GFCI protection requirements (based on location, bathroom, outdoor, etc.) apply.' },
      { q: 'A pool service technician notices the pool light trips the GFCI breaker immediately when turned on. The most likely cause is:', a: ['The light bulb is the wrong wattage', 'A fault between the hot conductor and ground or water inside the wet niche — the GFCI is working correctly and the light requires inspection and repair', 'The GFCI breaker is oversized for the light circuit', 'The automation controller timer setting conflicts with the GFCI'], correct: 1, exp: 'Underwater pool lights have a specific failure mode: water intrudes into the wet niche, creating a fault path between the hot conductor and the grounded water. The GFCI correctly detects the current imbalance and trips — the light should not be reset until the niche is inspected and the fault resolved.' },
      { q: 'The pool equipment panelboard (disconnect and circuit protection for pool equipment) must be located at minimum how far from the pool edge?', a: ['2 feet', '5 feet', '10 feet', '20 feet'], correct: 1, exp: 'NEC requires the pool equipment panelboard to be at least 5 feet from the pool water edge. It must be in a listed, weatherproof, lockable enclosure to prevent unauthorized access and protect against moisture.' },
      { q: 'Which underwater pool lighting system does NOT require GFCI protection per NEC 680?', a: ['120 V incandescent underwater lights', '120 V LED underwater lights', '12 V or less low-voltage underwater lighting fed from a listed isolation transformer', 'Any light within 5 feet of the water edge'], correct: 2, exp: '12 V (and lower) underwater lighting fed through a listed low-voltage isolation transformer is exempt from the GFCI requirement. However, the transformer must be bonded and installed per NEC 680.23, and the light niche must still be properly bonded.' },
      { q: 'NEC 680.26 requires bonding of metal within the pool environment within what horizontal distance of the pool water edge?', a: ['3 feet', '5 feet', '6 feet', '10 feet'], correct: 1, exp: 'NEC 680.26 requires all metal within 5 feet horizontally of the pool water edge to be bonded to the equipotential grid — including deck anchors, ladders, handrails, diving board hardware, and any other metal structures in this zone.' },
      { q: 'The bonding conductor from a pool pump motor housing connects to:', a: ['The service panel main grounding electrode', 'The pool\'s equipotential bonding grid, which includes the shell, ladders, and all bonded metal', 'The pool heater only — each piece of equipment bonds individually', 'The GFCI breaker ground terminal in the panel'], correct: 1, exp: 'All pool equipment metal housings are interconnected through the equipotential bonding grid. This ties the pump, heater, filter housing, light niches, ladders, deck anchors, and pool shell into a single zero-gradient equipotential system — not to the service ground.' },
      { q: 'A pool deck has a receptacle 8 feet from the pool edge. Per NEC 680.22, this receptacle:', a: ['Is not permitted — no receptacle within 10 feet of pool edge', 'Must be GFCI protected', 'Requires no special protection since it is beyond 6 feet', 'Must be at least 20 amp rated'], correct: 1, exp: 'Receptacles between 6 and 20 feet from the pool edge are permitted but must be GFCI protected. At 8 feet, the receptacle is in the GFCI zone (6–20 feet from the pool edge), so GFCI protection is required.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 13 — POOL HEATING SYSTEMS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'pool-heating',
    num: 13,
    title: 'Pool & Spa Heating Systems',
    desc: 'Gas heater sizing, heat pump COP and limitations, solar thermal collectors, and pool heat loss analysis.',
    slides: [
      {
        title: 'Gas Heaters & Heat Pumps',
        body: [
          'Gas heaters (natural gas or propane) raise pool temperature quickly regardless of air temperature — they are preferred for pools used infrequently or for spas that need rapid heat-up on demand.',
          'Gas heater sizing formula: BTU/hr = (pool volume in gallons × 8.34 lb/gal × ΔT°F) ÷ desired heat-up time in hours — a 20,000-gallon pool needing a 10°F rise in 24 hours requires approximately 69,500 BTU/hr.',
          'Modern gas heaters operate at 82–85% thermal efficiency; older units may be as low as 65% — efficiency directly affects gas consumption and operating cost.',
          'Heat pumps extract thermal energy from the ambient air using a refrigeration cycle (evaporator → compressor → condenser), delivering 4–6 BTU of heat for every 1 BTU of electrical energy consumed — COP (Coefficient of Performance) of 4–6.',
          'Heat pump limitation: COP drops significantly below ambient air temperatures of 50–55°F, and most heat pumps stop operating below 45–50°F — they are not suitable as sole heat source in cool climates.',
          'Heat pumps cost significantly less to operate than gas heaters when COP is high (mild weather), but the higher initial cost and slow heat-up rate make them best suited for maintaining temperature rather than rapid heating.',
          'Titanium heat exchangers are required for heat pumps on salt water and saltwater-chlorine generator pools — copper heat exchangers corrode rapidly in high-salt environments.',
        ],
        keyPoints: [
          'Gas heater: fast heat-up, weather-independent — best for infrequent use or spa',
          'Heat pump COP 4–6 in warm weather; drops below 1.0 COP below ~45°F air temp — not for cold climates as sole source',
          'Salt pools: titanium heat exchanger required — copper corrodes in high-salt environments',
        ],
        quiz: [
          {
            q: 'A 20,000-gallon pool needs to be heated 10°F in 8 hours. Approximately what gas heater BTU/hr rating is required?',
            a: ['52,000 BTU/hr', '104,000 BTU/hr', '208,000 BTU/hr', '416,000 BTU/hr'],
            correct: 2,
            exp: 'BTU/hr = (20,000 gal × 8.34 lb/gal × 10°F) ÷ 8 hrs = 1,668,000 BTU ÷ 8 hrs = 208,500 BTU/hr. At 85% heater efficiency, the actual gas heater rating needed would be approximately 245,000 BTU/hr input to deliver 208,500 BTU/hr to the water.',
          },
          {
            q: 'A heat pump pool heater has a COP of 5.0. This means it delivers:',
            a: ['5 BTU of heat output per BTU of fuel consumed', '5 BTU of heat output per BTU of electrical energy consumed (5× amplification)', '5 degrees of temperature rise per hour of operation', '5 gallons of heated water per minute of operation'],
            correct: 1,
            exp: 'COP 5.0 means the heat pump moves 5 BTU of thermal energy from the outdoor air into the pool water for every 1 BTU of electrical energy consumed. This amplification effect comes from the refrigeration cycle — it does not generate heat, it moves it.',
          },
        ],
      },
      {
        title: 'Solar Heating & Pool Heat Loss',
        body: [
          'Solar pool heaters use unglazed black polypropylene collectors (also called solar panels) mounted on the roof — water circulates through the collectors, absorbs solar radiation, and returns to the pool warmer.',
          'Collector sizing rule of thumb: collector area should be 50–100% of the pool surface area — 50% for mild sunny climates; 100% for cool, cloudy, or windy locations.',
          'Solar heating extends the swimming season by 2–4 months in most climates at very low operating cost (only the additional pump energy to push water through the collectors, often zero if the filtration pump already runs).',
          'Freeze protection is critical: an automatic actuated valve (controlled by a freeze sensor or the solar controller) diverts flow away from roof-mounted collectors when air temperature drops below 38–40°F to prevent ice damage in the collectors.',
          'Evaporation is the dominant source of pool heat loss — evaporation removes approximately 1,050 BTU per pound of water evaporated; a solar or mesh cover reduces evaporation by 50–95% and correspondingly reduces heating costs.',
          'Convective heat loss from the pool surface (air cooling the water) and conductive losses through the pool walls (particularly ground contact) contribute to the total heat load — insulated pool shells and covers address both.',
          'Solar thermal monitoring: the solar controller compares the collector temperature (sensor on roof) to the pool water temperature (return line sensor) and opens the diverter valve when the collector is warmer than the pool by the setpoint (typically 5–8°F).',
        ],
        keyPoints: [
          'Collector area: 50–100% of pool surface area — climate determines the required percentage',
          'Evaporation is the #1 pool heat loss mechanism — covers reduce it 50–95% and are the most cost-effective pool heating improvement',
          'Freeze protection: automatic valve diverts flow from roof collectors below 38–40°F — required in any climate with freezing temperatures',
        ],
        quiz: [
          {
            q: 'A pool has a surface area of 400 square feet. In a mild sunny climate, the minimum recommended solar collector area is approximately:',
            a: ['100 sq ft', '200 sq ft', '300 sq ft', '400 sq ft'],
            correct: 1,
            exp: 'The standard rule is 50–100% of pool surface area. In a mild, sunny climate (Florida, Southern California), 50% is typically sufficient: 400 sq ft × 50% = 200 sq ft of collector area. Cooler or cloudier climates need closer to 100%.',
          },
          {
            q: 'A solar controller opens the collector diverter valve when:',
            a: ['Pool temperature drops 5°F below the setpoint regardless of collector temperature', 'The collector temperature is higher than the pool return temperature by the controller setpoint differential (typically 5–8°F)', 'Sunlight intensity exceeds 500 W/m² measured by an irradiance sensor', 'The filtration pump runs at full speed'],
            correct: 1,
            exp: 'The solar controller compares two temperature sensors — roof collector and pool return. When the collector is warmer than the pool by the differential setpoint (typically 5–8°F), it is worth pumping water through the collectors to add heat. Below this differential, running the collectors would cool the pool.',
          },
        ],
      },
    ],
    test: [
      { q: 'A gas pool heater is rated at 400,000 BTU/hr input at 85% thermal efficiency. Its useful heat output to the pool water is approximately:', a: ['400,000 BTU/hr', '340,000 BTU/hr', '280,000 BTU/hr', '200,000 BTU/hr'], correct: 1, exp: '400,000 BTU/hr input × 0.85 efficiency = 340,000 BTU/hr delivered to the water. The remaining 15% (60,000 BTU/hr) exits through the flue as exhaust heat.' },
      { q: 'Heat pump pool heaters become ineffective below approximately what outdoor air temperature?', a: ['65°F', '55°F', '45–50°F', '32°F'], correct: 2, exp: 'Heat pump COP drops rapidly as outdoor air temperature falls. Below 45–50°F, most residential heat pumps reach COP near 1.0 (same efficiency as electric resistance heating) and many units have low-temperature lockout below this point.' },
      { q: 'Why must a pool heat pump installed on a salt chlorine generator pool use a titanium heat exchanger?', a: ['Titanium conducts heat better than copper for salt water', 'Copper heat exchangers corrode rapidly in high-salt-concentration water, causing premature failure — titanium is corrosion resistant', 'Titanium is required by NEC for pool heat pumps', 'Salt affects the refrigerant inside copper heat exchangers'], correct: 1, exp: 'Salt concentrations in salt chlorine generator pools (2,700–3,400 ppm) are corrosive to copper. Over time, copper heat exchangers in salt pools develop pinhole leaks from the outside of the tubing. Titanium is the standard material for salt pool heat pumps.' },
      { q: 'The most cost-effective single measure to reduce pool heating costs is:', a: ['Installing a larger gas heater', 'Upgrading to a higher-efficiency heat pump', 'Using a solar or mesh cover to reduce evaporation', 'Adding solar collectors sized at 100% of pool surface area'], correct: 2, exp: 'Evaporation accounts for 70–80% of pool heat loss. A solar or liquid solar cover costs $50–200 and reduces evaporation by 50–95%, dramatically cutting heating costs. No capital investment in heating equipment matches the cost-effectiveness of addressing the dominant loss mechanism first.' },
      { q: 'Solar pool collector sizing for a 500 sq ft pool in a northern US location (short season, high heating demand) should target approximately:', a: ['100–150 sq ft (20–30%)', '200–250 sq ft (40–50%)', '400–500 sq ft (80–100%)', '600–700 sq ft (120–140%)'], correct: 2, exp: 'Northern locations have fewer sun-hours and a greater temperature differential between desired pool temperature and ambient air. Collectors sized at 80–100% of pool surface area are needed to extend the season meaningfully — smaller installations do not have enough collection area to overcome the heat loss.' },
      { q: 'Solar heating system freeze protection typically uses:', a: ['Antifreeze added to the pool water when temperature drops', 'An automatic actuated valve that diverts flow away from roof collectors when air temperature approaches freezing', 'A timer that turns off the solar pump after sunset', 'Collector drain-down by gravity when the pump stops'], correct: 1, exp: 'Most residential solar pool systems use a diverter valve controlled by a freeze sensor or the solar controller. When air temperature drops below 38–40°F, the valve closes the path to the roof collectors and water bypasses directly back to the pool, preventing ice formation and collector damage.' },
      { q: 'A heat pump pool heater is operating at COP 4.5 and the electricity rate is $0.15/kWh. For every 1 kWh of electricity consumed, the heat energy added to the pool is:', a: ['1 kWh (3,412 BTU)', '3.0 kWh (10,236 BTU)', '4.5 kWh (15,354 BTU)', '6.0 kWh (20,472 BTU)'], correct: 2, exp: 'COP 4.5 means 4.5 units of heat energy delivered per unit of electrical energy consumed: 1 kWh input × 4.5 COP = 4.5 kWh thermal output = approximately 15,354 BTU. At $0.15/kWh, this delivers 15,354 BTU for $0.15 — far cheaper than gas at equivalent efficiency.' },
      { q: 'A solar controller\'s differential setpoint is 6°F. The pool return sensor reads 78°F. The collector sensor reads 82°F. What does the controller do?', a: ['Opens the diverter valve — collector is 4°F warmer than pool, below the 6°F setpoint', 'Closes the diverter valve — collector is above the pool temperature', 'Opens the diverter valve — any positive differential activates solar', 'Triggers the gas heater backup'], correct: 0, exp: 'The collector (82°F) is only 4°F warmer than the pool (78°F), which is below the 6°F setpoint. The controller keeps the diverter valve closed — running the collectors at this small differential would waste pump energy for minimal gain. The valve opens when the differential reaches 6°F or more.' },
      { q: 'Evaporation removes heat from a pool at approximately:', a: ['100 BTU per pound of water evaporated', '500 BTU per pound of water evaporated', '1,050 BTU per pound of water evaporated', '2,500 BTU per pound of water evaporated'], correct: 2, exp: 'Evaporation removes the latent heat of vaporization — approximately 1,050 BTU per pound of water at pool temperatures. This is why evaporation dominates pool heat loss and why covers that reduce evaporation are so effective at reducing heating costs.' },
      { q: 'Natural gas and propane pool heaters differ primarily in that:', a: ['Propane heaters must be certified to a different efficiency standard', 'Propane has approximately 2.5× the energy content per cubic foot but is sold in gallons — the heater must be configured for the correct fuel (different orifices and manifold pressure)', 'Natural gas heaters have a lower BTU rating for the same burner size', 'Propane requires an electric ignition; natural gas uses a standing pilot only'], correct: 1, exp: 'Propane and natural gas require different orifice sizes and manifold pressures for the same BTU output. Using natural gas orifices with propane (higher pressure, higher energy content) would result in dangerously oversized flame and combustion problems — always verify and configure the heater for the actual fuel at the site.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 14 — POOL FILTRATION SYSTEMS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'pool-filtration',
    num: 14,
    title: 'Pool Filtration Systems',
    desc: 'Sand, cartridge, and DE filter operation; flow rates and turnover calculation; backwash procedures and maintenance.',
    slides: [
      {
        title: 'Filter Types & Filtration Performance',
        body: [
          'Sand filters use silica sand (20-grade) or alternative media (ZeoSand, glass media) as the filtration bed; water flows down through the media, particles are trapped, and clean water exits through a lateral system at the bottom — filtration rating approximately 20–40 microns.',
          'Cartridge filters pass water through polyester fabric element(s) that trap particles 10–15 microns and smaller — no backwash valve needed; cleaning involves removing and hosing or soaking cartridges.',
          'DE (Diatomaceous Earth) filters coat fabric grids (finger or leaf type) with diatomaceous earth powder, providing 3–5 micron filtration — the finest of the three types, producing very clear water.',
          'NSF Standard 50 certification ensures the filter is designed and tested for pool/spa use — required for commercial installations and the benchmark for quality residential filters.',
          'Each filter type has a maximum GPM rating — the pump flow rate must not exceed this rating, as overpressuring the filter damages the media or cartridge and allows unfiltered water to bypass.',
          'Filter selection factors: initial cost (sand lowest, DE highest), water clarity (DE best), maintenance frequency (cartridge: clean every 4–6 weeks; sand: backwash every 2–6 weeks; DE: backwash monthly + recharge), and chemical compatibility.',
          'Alternative sand filter media: ZeoSand (zeolite) filters to 5–10 microns and has cation exchange capacity that removes ammonia — a meaningful upgrade over standard silica sand in pool with high bather load.',
        ],
        keyPoints: [
          'Sand: 20–40 microns; Cartridge: 10–15 microns; DE: 3–5 microns — finer filtration = clearer water',
          'Do not exceed the filter\'s rated maximum GPM — overpressure damages filter and allows bypass',
          'Cartridge filters require no backwash valve; cleaning by removal and hosing only',
        ],
        quiz: [
          {
            q: 'A pool owner wants the finest filtration and clearest water and is willing to perform monthly maintenance. Which filter type is best suited?',
            a: ['Sand filter with ZeoSand media', 'Standard silica sand filter', 'Cartridge filter', 'DE (Diatomaceous Earth) filter'],
            correct: 3,
            exp: 'DE filters provide 3–5 micron filtration — the finest of any pool filter type, producing crystal-clear water. The tradeoff is more complex maintenance: backwashing removes spent DE, and fresh DE powder must be added after each backwash. The monthly maintenance cycle is manageable for the clarity improvement.',
          },
          {
            q: 'A cartridge pool filter needs cleaning. The correct procedure is to:',
            a: ['Backwash through the multiport valve for 2 minutes', 'Remove the cartridge element, hose off debris, and optionally acid-soak for deep cleaning', 'Add a clarifier chemical and increase pump speed for 30 minutes', 'Replace the laterals and add fresh filter sand'],
            correct: 1,
            exp: 'Cartridge filters have no backwash valve or backwash capability — the cartridge must be physically removed and cleaned with a hose. Acid soaking (dilute muriatic acid) removes calcium scale and oils that hosing cannot. Laterals and filter sand apply to sand filters, not cartridge filters.',
          },
        ],
      },
      {
        title: 'Flow Rate, Turnover & Maintenance Schedules',
        body: [
          'Pool turnover rate is the time required for the pump to move the entire pool volume once through the filter — residential health codes typically require 6–8 hour turnover; commercial pools typically require 4–6 hour turnover based on bather load.',
          'Required flow rate (GPM) = pool volume (gallons) ÷ turnover time (hours) ÷ 60 minutes — a 20,000-gallon pool requiring 8-hour turnover needs 20,000 ÷ 8 ÷ 60 = 41.7 GPM.',
          'Filter pressure gauges indicate the resistance across the filter media — the clean baseline pressure (recorded at installation or after cleaning) is the reference; backwash or clean when pressure rises 8–10 psi above the clean baseline.',
          'Sand filter backwash procedure: shut off pump, rotate multiport valve to BACKWASH, restart pump for 2–3 minutes until sight glass runs clear, stop pump, rotate to RINSE for 30 seconds, return to FILTER.',
          'DE filter backwash procedure: backwash as with sand until sight glass clears, then add fresh DE powder through the skimmer with pump running — DE is calculated as approximately 1 lb per 10 sq ft of filter area.',
          'Cartridge filter maintenance: clean every 4–6 weeks (or when pressure rises 8–10 psi), inspect for tears or calcification, acid-soak quarterly, replace cartridges annually or when they no longer clean well.',
          'Year-end winterization in freeze climates: blow or drain all water from filter, pump housing, heater, and plumbing — water left in equipment will expand on freezing and crack housings, manifolds, and heat exchangers.',
        ],
        keyPoints: [
          'Backwash (sand/DE) or clean (cartridge) when pressure rises 8–10 psi above clean baseline',
          'Turnover calculation: pool gallons ÷ turnover hours ÷ 60 = required GPM',
          'After DE backwash, must re-add DE powder — typically 1 lb per 10 sq ft of filter grid area',
        ],
        quiz: [
          {
            q: 'A 25,000-gallon residential pool requires 8-hour turnover. The minimum pump flow rate must be at least:',
            a: ['26 GPM', '32 GPM', '52 GPM', '78 GPM'],
            correct: 2,
            exp: '25,000 gal ÷ 8 hrs ÷ 60 min/hr = 52.1 GPM. The pump and plumbing system must be capable of at least 52 GPM flow through the filter to achieve the required 8-hour turnover for regulatory compliance and water quality.',
          },
          {
            q: 'When should a sand or DE pool filter be backwashed?',
            a: ['On a fixed weekly schedule regardless of pressure', 'When filter pressure rises 8–10 psi above the clean baseline pressure', 'When water clarity begins to visibly decrease in the pool', 'Immediately after adding pool chemicals'],
            correct: 1,
            exp: 'The 8–10 psi rise above clean baseline is the universal trigger for backwash. Earlier backwash wastes water and reduces filtration efficiency (the filter actually filters better with a small amount of debris — called the "filter cake"). Waiting too long significantly reduces flow rate and puts strain on the pump.',
          },
        ],
      },
    ],
    test: [
      { q: 'DE (diatomaceous earth) pool filters achieve filtration ratings of approximately:', a: ['20–40 microns', '10–15 microns', '3–5 microns', '1–2 microns'], correct: 2, exp: 'DE filters use diatomaceous earth (fossilized diatom skeletons with microscopically porous structure) as the filtration medium, achieving 3–5 micron filtration — the finest of any pool filter type, resulting in the clearest possible pool water.' },
      { q: 'A residential pool of 18,000 gallons requires a 6-hour turnover. The minimum required pump flow rate is:', a: ['25 GPM', '38 GPM', '50 GPM', '75 GPM'], correct: 2, exp: '18,000 gal ÷ 6 hrs ÷ 60 min/hr = 50 GPM minimum required flow rate through the filter to achieve 6-hour turnover.' },
      { q: 'The clean pressure baseline on a new sand filter is 8 psi. Backwash should be performed when the pressure gauge reads approximately:', a: ['12 psi', '16–18 psi', '22 psi', '30 psi'], correct: 1, exp: 'Backwash when pressure rises 8–10 psi above clean baseline: 8 + 8 = 16 psi minimum, 8 + 10 = 18 psi maximum. At 16–18 psi, the filter has loaded sufficiently to warrant backwash.' },
      { q: 'After backwashing a DE filter, the technician must:', a: ['Add muriatic acid to the skimmer to clean the DE powder from the grid', 'Add fresh DE powder through the skimmer with the pump running to re-coat the filter grids', 'Run the filter on RECIRCULATE setting for 10 minutes to redistribute the remaining DE', 'Drain the filter tank and manually re-coat each grid element with dry DE powder'], correct: 1, exp: 'Backwashing removes the spent DE and trapped debris from the grids. The filter cannot operate without DE on the grids (water would pass unfiltered through the bare fabric). Fresh DE powder is added through the skimmer in measured quantities (typically 1 lb per 10 sq ft of grid area) with the pump running in FILTER mode.' },
      { q: 'Which pool filter type requires NO backwash valve and is cleaned by physical removal?', a: ['Sand filter', 'DE filter', 'Cartridge filter', 'ZeoSand filter'], correct: 2, exp: 'Cartridge filters have no multiport valve. When cleaning is needed, the pump is shut off, the filter housing lid is removed, and the cartridge element is extracted and cleaned with a garden hose. This simplicity is an advantage; the tradeoff is more frequent manual cleaning.' },
      { q: 'ZeoSand as a sand filter media upgrade provides what advantage over standard 20-grade silica sand?', a: ['Lower initial cost than silica sand', 'Filtration down to 5–10 microns and ammonia reduction via cation exchange capacity', 'Filtration to 3 microns, equivalent to DE quality', 'Lasts 20+ years without replacement vs. 5–7 years for silica sand'], correct: 1, exp: 'ZeoSand (zeolite mineral) filters to a finer particle size (5–10 microns vs. 20–40 for silica sand) and has cation exchange sites that remove ammonium ions from the water — reducing chloramines and combined chlorine that cause eye and skin irritation.' },
      { q: 'A sand filter backwash procedure requires what step immediately after backwash and before returning to FILTER position?', a: ['Open the air release valve', 'Switch to RINSE position for approximately 30 seconds', 'Add fresh silica sand to the tank', 'Bump the filter three times to redistribute the sand bed'], correct: 1, exp: 'After backwash, the sand bed is disturbed and loosened. The RINSE cycle runs water in the normal filter direction briefly to re-settle the sand bed before returning to FILTER — without RINSE, turbid backwash water would be returned to the pool.' },
      { q: 'In cold climates, failing to winterize pool filter equipment results in:', a: ['Premature DE powder degradation', 'Freeze damage: water remaining in filter tank, pump housing, and heater expands on freezing and cracks housings, manifolds, and heat exchanger tubes', 'Excessive chemical consumption during spring startup', 'Sand media compaction requiring replacement'], correct: 1, exp: 'Water expands approximately 9% by volume when it freezes. Equipment housing and heat exchanger materials cannot accommodate this expansion — they crack. A cracked filter tank, pump housing, or heat exchanger requires replacement, which can cost $500–$5,000+ depending on equipment.' },
      { q: 'A commercial pool requires 4-hour turnover per local health code. The pool holds 60,000 gallons. What pump flow rate is required?', a: ['125 GPM', '150 GPM', '200 GPM', '250 GPM'], correct: 3, exp: '60,000 gal ÷ 4 hrs ÷ 60 min/hr = 250 GPM. Commercial pools with high bather loads require shorter turnover times to maintain water quality — this typically requires multiple pumps or a large commercial pump and properly sized plumbing.' },
      { q: 'The maximum GPM rating on a pool filter is important because:', a: ['Exceeding it voids the warranty only, with no performance impact', 'Exceeding the rating causes overpressure that damages filter media, collapses cartridge elements, or opens filter bypass paths — allowing unfiltered water into the pool', 'Higher flow rates improve filtration efficiency regardless of the rating', 'The rating applies only to commercial pools; residential filters have no maximum flow limit'], correct: 1, exp: 'Exceeding the filter\'s rated GPM forces flow through the media too fast for effective filtration. In sand and DE filters, channeling develops that bypasses the media. In cartridge filters, high pressure can collapse or tear the fabric. In all cases, unfiltered water returns to the pool.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 15 — SALT CHLORINE GENERATORS & WATER CHEMISTRY
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'pool-chemical',
    num: 15,
    title: 'Salt Chlorine Generators & Water Chemistry',
    desc: 'SCG electrolysis, cell maintenance, ORP/pH automation, cyanuric acid, and chemical controller calibration.',
    slides: [
      {
        title: 'Salt Chlorine Generator Operation & Maintenance',
        body: [
          'Salt chlorine generators (SCG) use electrolysis to produce chlorine from dissolved sodium chloride: at the cell electrodes, chloride ions are oxidized to chlorine gas, which dissolves in water to form hypochlorous acid (HOCl) — the active sanitizing agent.',
          'Required salt level is typically 2,700–3,400 ppm (specific range varies by manufacturer) — below the low threshold, the controller activates a low-salt alarm and may lock out operation; above the high threshold, the cell efficiency decreases and corrosion risk increases.',
          'Salt concentration of 3,200 ppm is mildly brackish — far below seawater (~35,000 ppm) and generally imperceptible to taste or skin; some swimmers actually prefer the feel of salt water versus traditionally chlorinated water.',
          'SCG cells are self-cleaning in most modern units: the controller reverses electrode polarity on a timed cycle (every few hours) to release calcium scale that deposits on the electrodes during forward polarity operation.',
          'Manual cell cleaning: when scale buildup exceeds what self-cleaning can manage, remove the cell and soak in dilute muriatic acid (1 part acid to 10 parts water) for 15–30 minutes — do not use abrasives which damage the titanium coating.',
          'Cell life is typically 7,000–15,000 operating hours or 3–7 years of residential use — cells degrade as the titanium ruthenium oxide coating wears off the electrode plates, reducing chlorine output per amp hour.',
          'Low chlorine output despite adequate salt level indicates aging cell, low water temperature (<60°F), high CYA stabilizer level, or high demand from bather load or algae — check all four before replacing the cell.',
        ],
        keyPoints: [
          'Salt range 2,700–3,400 ppm typical — low-salt lockout prevents cell damage; too high increases corrosion risk',
          'Self-cleaning cells reverse polarity to remove calcium scale — manual acid wash needed when scale exceeds auto-cleaning',
          'Low chlorine output: check salt level, cell age, water temp (<60°F limits output), and CYA level before replacing cell',
        ],
        quiz: [
          {
            q: 'A salt chlorine generator cell is producing less chlorine than normal. The salt level is correct and the cell is only 2 years old. What should be checked next?',
            a: ['Replace the cell immediately — 2 years is the expected lifespan', 'Check water temperature — SCG cells have significantly reduced output below 60°F, and also check CYA stabilizer level', 'Increase pump speed to force more water through the cell', 'Replace the control board, which regulates cell output'],
            correct: 1,
            exp: 'SCG chlorine output drops significantly in cold water (below 60°F, output may fall to 50% or less). High CYA also reduces effective chlorine despite adequate total chlorine. At 2 years, the cell is unlikely to be worn out. Check water temperature and CYA first before assuming cell failure.' },
          {
            q: 'The self-cleaning feature on a modern SCG cell operates by:',
            a: ['Running a brush mechanism across the electrode plates periodically', 'Reversing electrode polarity on a timed cycle to dislodge calcium scale deposits', 'Increasing current to burn off calcium deposits at higher temperature', 'Injecting acid into the cell body automatically when pH rises'],
            correct: 1,
            exp: 'During normal forward polarity, calcium scale (from the calcium in the water) deposits on the cathode plate. When polarity reverses, the former cathode becomes the anode, and the scale is electrochemically dislodged. This automatic cycle significantly extends cell life compared to older non-reversing cells.',
          },
        ],
      },
      {
        title: 'ORP/pH Automation & Cyanuric Acid',
        body: [
          'ORP (Oxidation-Reduction Potential) measures the oxidizing power of the pool water in millivolts — a direct measure of sanitizing effectiveness; target range 650–750 mV for residential pools (WHO guideline is ≥650 mV).',
          'pH directly affects how much of total chlorine exists as active HOCl — at pH 7.2, approximately 66% of total chlorine is active HOCl; at pH 7.8, only 37% is active; at pH 8.0, only 23% is active despite the same total chlorine reading.',
          'Ideal pH range is 7.4–7.6: adequate HOCl activity, bather comfort (eye and skin compatibility), and surface/equipment longevity — outside this range, chlorine demand rises and equipment corrodes or scales.',
          'pH is controlled with acid addition (muriatic acid or CO₂ injection to lower pH) and soda ash or sodium bicarbonate (to raise pH).',
          'Cyanuric acid (CYA / stabilizer / conditioner) forms a weak chemical bond with chlorine molecules, protecting them from UV degradation in sunlight — without CYA, chlorine dissipates in direct sunlight within 30–60 minutes.',
          'Excessive CYA "over-stabilizes" the pool: chlorine is so tightly complexed with CYA that it cannot effectively oxidize pathogens — this is called "chlorine lock" or "stabilizer lock"; the only remedy is partial water replacement to dilute CYA.',
          'Optimal CYA for traditionally chlorinated outdoor pools: 30–50 ppm; for SCG pools, 60–80 ppm (SCG produces chlorine continuously, slightly higher CYA tolerance acceptable); above 100 ppm, sanitization is significantly compromised regardless of chlorine reading.',
        ],
        keyPoints: [
          'ORP 650–750 mV = adequate sanitization — ORP drops when pH rises even with same total chlorine',
          'pH 7.4–7.6: 50–66% of chlorine active as HOCl; pH 8.0: only 23% active — high pH dramatically reduces effectiveness',
          'CYA 30–50 ppm (traditional) / 60–80 ppm (SCG) — above 100 ppm causes "stabilizer lock"; dilution is the only fix',
        ],
        quiz: [
          {
            q: 'A pool tests at 3.0 ppm free chlorine but ORP reads 580 mV (below the 650 mV target). What is the most likely explanation?',
            a: ['The ORP probe is faulty and needs replacement', 'High pH (above 7.6) or high CYA is reducing the effectiveness of the available chlorine — ORP measures sanitizing power, not total chlorine', 'The chlorine test kit is reading incorrectly', 'The SCG cell needs to produce more chlorine'],
            correct: 1,
            exp: 'ORP measures actual sanitizing capacity, not just the amount of chlorine present. At high pH (above 7.8), most chlorine shifts to the inactive OCl⁻ form. High CYA "ties up" chlorine, also reducing ORP. 3 ppm total chlorine at pH 8.0 with 100 ppm CYA can have an ORP below 600 mV — effectively unprotected water.',
          },
          {
            q: 'A pool has a CYA level of 120 ppm and the owner complains chlorine readings keep dropping despite adding large amounts of chlorine. The correct solution is:',
            a: ['Add more chlorine — 120 ppm CYA needs 10+ ppm free chlorine to be effective', 'Add stabilizer remover chemical to neutralize excess CYA', 'Partially drain and refill the pool to dilute CYA to the 30–50 ppm target range', 'Switch to a non-chlorine sanitizer such as biguanide'],
            correct: 2,
            exp: 'CYA cannot be chemically removed from pool water — no product effectively neutralizes or precipitates it. The only way to reduce CYA is to remove pool water containing dissolved CYA and replace it with fresh water. At 120 ppm, a 50–60% water change is typically needed to reach the 30–50 ppm target.' },
        ],
      },
    ],
    test: [
      { q: 'The active pool sanitizer produced by a salt chlorine generator that kills pathogens is:', a: ['Sodium chloride (NaCl)', 'Chlorine gas stored in the cell housing', 'Hypochlorous acid (HOCl) formed when electrolytically produced Cl₂ dissolves in pool water', 'Sodium hypochlorite pumped from a reservoir'], correct: 2, exp: 'The cell electrolyzes salt water to produce Cl₂ gas at the anode. Cl₂ dissolves immediately in pool water: Cl₂ + H₂O → HOCl + HCl. HOCl (hypochlorous acid) is the active germicidal agent — the same compound produced by liquid chlorine.' },
      { q: 'A typical residential salt chlorine generator pool is maintained at what salt concentration?', a: ['300–500 ppm', '900–1,200 ppm', '2,700–3,400 ppm', '10,000–15,000 ppm'], correct: 2, exp: '2,700–3,400 ppm is the typical manufacturer-specified range. This is high enough for adequate cell efficiency but low enough that it is imperceptible to taste (human taste threshold for salt is approximately 3,500–4,000 ppm) and does not accelerate corrosion.' },
      { q: 'At pH 7.2 versus pH 8.0, approximately what percentage of total chlorine is in the active HOCl form?', a: ['pH 7.2: 10% HOCl; pH 8.0: 90% HOCl', 'pH 7.2: 66% HOCl; pH 8.0: 23% HOCl', 'pH 7.2: 50% HOCl; pH 8.0: 50% HOCl', 'pH 7.2: 90% HOCl; pH 8.0: 66% HOCl'], correct: 1, exp: 'Chlorine equilibrium shifts dramatically with pH: at pH 7.2, ~66% is active HOCl; at pH 7.6, ~50%; at pH 8.0, only ~23%. This is why maintaining pH 7.4–7.6 is essential — high pH pools require much more total chlorine to achieve the same sanitizing power.' },
      { q: 'The ORP target range for adequate pool sanitization is:', a: ['200–400 mV', '450–550 mV', '650–750 mV', '900–1,000 mV'], correct: 2, exp: 'WHO guideline recommends ≥650 mV ORP for recreational water safety. Residential pools target 650–750 mV. Below 650 mV, the oxidizing power is insufficient for reliable pathogen kill. Above 750 mV, there is little additional safety benefit and higher ORP may indicate low pH or excess chlorine.' },
      { q: 'Why does cyanuric acid (CYA) improve chlorine efficiency in outdoor pools?', a: ['CYA increases chlorine\'s germicidal power at any pH', 'CYA forms a protective complex with chlorine that prevents UV radiation from breaking chlorine down — without CYA, chlorine in direct sunlight dissipates in 30–60 minutes', 'CYA reduces chloramine formation from bather contamination', 'CYA lowers pH, increasing HOCl percentage'], correct: 1, exp: 'UV photolysis destroys free chlorine rapidly — a pool without CYA loses essentially all its chlorine on a sunny day within an hour. CYA-chlorine complexes are UV stable, releasing small amounts of free chlorine gradually, dramatically extending residual life.' },
      { q: 'A pool technician determines the CYA level is 140 ppm and the pool is showing poor sanitation despite adequate chlorine readings. The recommended course of action is:', a: ['Add 4 lbs of calcium hypochlorite shock immediately', 'Drain 60–70% of the pool and refill with fresh water to dilute CYA to 30–50 ppm', 'Add a CYA-neutralizing chemical available at pool supply stores', 'Switch to a non-stabilized chlorine source — CYA will naturally degrade in 4–6 weeks'], correct: 1, exp: 'CYA is very stable and does not degrade in pool water. There is no approved chemical that reliably removes CYA from pool water. Partial draining and dilution is the only practical remedy. CYA above 100 ppm renders chlorine largely ineffective regardless of concentration.' },
      { q: 'An SCG cell has been in service for 4 years and is showing heavily scaled electrode plates. After backwashing and confirming adequate salt level, the first maintenance step is:', a: ['Replace the cell — 4 years exceeds the rated life', 'Perform a manual acid wash: remove cell, soak in 1:10 muriatic acid solution for 15–30 minutes, rinse thoroughly', 'Increase the cell output percentage setting from 70% to 100%', 'Clean the cell with a steel brush to remove calcium deposits mechanically'], correct: 1, exp: 'Calcium scale is dissolved by dilute muriatic acid — a 1:10 acid-to-water solution (ALWAYS add acid to water) for 15–30 minutes removes scale that self-cleaning cannot handle. Steel brushes physically damage the titanium oxide electrode coating and must never be used. At 4 years, the cell may still have useful life after cleaning.' },
      { q: 'In a salt chlorine generator pool, the recommended CYA (stabilizer) level is slightly higher than for traditionally chlorinated pools because:', a: ['Higher CYA is needed for the salt cell to produce chlorine efficiently', 'SCG produces chlorine continuously and relatively slowly — higher CYA (60–80 ppm) helps protect this continuous production from UV destruction between production cycles', 'Salt prevents CYA from complexing with chlorine at normal concentrations', 'Higher CYA reduces the amount of salt needed in SCG pools'], correct: 1, exp: 'SCG pools benefit from slightly higher CYA (60–80 ppm vs. 30–50 ppm for traditional) because the cell produces chlorine continuously. Without adequate stabilizer, the slow, continuous production cannot keep up with UV destruction on sunny days.' },
      { q: 'Muriatic acid is added to a pool to:', a: ['Increase pH and total alkalinity', 'Lower pH to the 7.4–7.6 target range and reduce total alkalinity', 'Shock the pool by oxidizing organic compounds', 'Increase calcium hardness to prevent surface etching'], correct: 1, exp: 'Muriatic acid (hydrochloric acid) is the primary pool pH reducer. It lowers both pH and total alkalinity. It must be added slowly while the pump runs, poured in front of a return jet — never into the skimmer or concentrated in one spot to avoid surface damage.' },
      { q: 'What water temperature significantly reduces salt chlorine generator output, often causing apparent low chlorine production in winter?', a: ['Below 75°F', 'Below 65°F', 'Below 60°F', 'Below 50°F'], correct: 2, exp: 'Most SCG manufacturers specify reduced or minimal output below 60°F — some models lock out below 50°F. Cold water reduces the rate of the electrolytic reaction and also reduces chlorine demand (less bather activity, slower algae growth), but operators may struggle to maintain sanitizer levels in transitional seasons.' },
      { q: 'Sodium bicarbonate (baking soda) is added to a pool primarily to:', a: ['Raise pH rapidly', 'Raise total alkalinity without significantly affecting pH', 'Lower total alkalinity and pH simultaneously', 'Add cyanuric acid stabilizer'], correct: 1, exp: 'Sodium bicarbonate primarily raises total alkalinity (TA) with only a modest pH increase. It is the preferred TA increaser because soda ash (sodium carbonate) raises pH more aggressively. Proper TA (80–120 ppm) acts as a pH buffer, preventing pH drift and making pH easier to control.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 16 — POOL AUTOMATION & CONTROL SYSTEMS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'pool-automation',
    num: 16,
    title: 'Pool Automation & Control Systems',
    desc: 'Load centers, relay boards, automation controllers, sensor integration, VSP communication protocols, and freeze protection.',
    slides: [
      {
        title: 'Automation Controllers & Load Centers',
        body: [
          'Pool automation systems control all pool and spa equipment from a single controller — pumps, heater, lights, valves, blower, and chemical dosing — replacing individual timers and manual switching.',
          'The load center houses the relay boards, transformer, circuit breakers, and controller interface in a single weatherproof enclosure mounted near the pool equipment pad.',
          'Relay boards contain individual relays that switch line voltage to each piece of equipment — the automation controller signals each relay via low-voltage control signals, keeping 120/240 V wiring confined to the load center.',
          'Major brands: Pentair IntelliCenter, Hayward OmniLogic, Jandy iAquaLink — each has a proprietary load center + controller ecosystem; most can control up to 16 circuits and integrate with manufacturer-specific pumps and SCG cells.',
          'Scheduling features allow programming of filtration hours, feature operation (waterfall, spa jets, bubblers), lighting scenes, and heater enable/disable — modern systems allow smartphone and voice assistant control.',
          'Combo units combine the load center and controller in one wall-mounted box for smaller systems (1–2 pump systems with basic features); larger systems use separate load center and control panel for greater expansion capacity.',
          'Installing automation on an existing pool requires identifying existing timer, switch, and relay wiring and converting it to the automation system\'s relay inputs — a skilled technician works from the existing electrical diagram or creates one before starting.',
        ],
        keyPoints: [
          'Load center = electrical enclosure with relay boards; controller = programming interface — separate units on larger systems',
          'Relay boards switch line voltage via low-voltage control signals — keep high voltage inside the load center',
          'Brands (Pentair, Hayward, Jandy) have proprietary ecosystems — pumps and SCG cells communicate digitally with their brand\'s controller',
        ],
        quiz: [
          {
            q: 'What is the function of relay boards inside a pool automation load center?',
            a: ['They store programming for the scheduling system', 'They switch 120/240 V line voltage to pool equipment based on low-voltage signals from the automation controller', 'They contain the circuit breakers for the pool electrical service', 'They regulate the variable speed pump motor current'],
            correct: 1,
            exp: 'Relay boards contain electromechanical or solid-state relays that act as switches. The automation controller sends low-voltage signals (typically 24 V AC or 12 V DC) to energize relay coils, closing contacts that switch line voltage to pumps, heaters, lights, and valves.',
          },
          {
            q: 'A homeowner wants pool control from their smartphone and voice assistant. What is required?',
            a: ['A cellular modem wired directly to each piece of pool equipment', 'A compatible pool automation system (e.g., Pentair IntelliCenter, Hayward OmniLogic, Jandy iAquaLink) connected to the home Wi-Fi network', 'A dedicated 4G LTE router installed in the load center', 'A pool technician must program remote control — it cannot be DIY configured'],
            correct: 1,
            exp: 'Modern automation systems include Wi-Fi or Ethernet connectivity and companion smartphone apps. The system connects to the home Wi-Fi and the manufacturer\'s cloud — enabling remote control, scheduling, alerts, and voice assistant integration without additional hardware.',
          },
        ],
      },
      {
        title: 'Sensors, VSP Integration & Freeze Protection',
        body: [
          'Flow sensors confirm water circulation before the heater energizes — a heater that fires without flow overheats its heat exchanger and damages the unit; the automation controller checks flow sensor state before enabling the heater circuit.',
          'Temperature sensors (water temperature, solar collector temperature, outdoor air temperature) allow the automation system to make intelligent decisions — limit heater setpoints, enable/disable solar, and trigger freeze protection.',
          'ORP and pH probes connected to the automation controller or a chemical controller allow automated chemical dosing — the controller activates acid pumps or chlorine sources (SCG percentage, liquid chlorine peristaltic pump) to maintain setpoints.',
          'Variable speed pump integration: Pentair IntelliFlo communicates via RS-485 Modbus protocol with IntelliCenter; Hayward EcoStar uses a similar protocol with OmniLogic — this allows the controller to command specific RPM rather than just on/off.',
          'Analog speed control (0–10 V or 4–20 mA) is available on some third-party VSPs and allows any controller with an analog output to set pump speed proportionally.',
          'Freeze protection: the automation system monitors outdoor air temperature (sensor or programmable threshold, typically 38–40°F) and automatically starts the pump at low speed to circulate water — prevents freezing damage in pool plumbing, heaters, and equipment.',
          'Freeze protection override is automatic and overrides any manual OFF setting — the pump will run even if manually set to off, which surprises owners the first time it triggers on a cold night.',
        ],
        keyPoints: [
          'Flow sensor confirms circulation before heater enable — no flow = heater lockout, preventing heat exchanger damage',
          'IntelliFlo (Pentair) and EcoStar (Hayward) communicate via RS-485 Modbus — controller sets specific RPM, not just on/off',
          'Freeze protection triggers automatically at ~38–40°F air temp and overrides manual off settings',
        ],
        quiz: [
          {
            q: 'Why does a pool automation system check the flow sensor before energizing the heater circuit?',
            a: ['Flow sensors verify that the pool chemistry is balanced before heating', 'Without confirmed water flow through the heater, the heat exchanger overheats and is permanently damaged — the flow sensor is a required safety interlock', 'The heater controller needs flow data to calculate BTU output per hour', 'Flow confirmation is only required for gas heaters, not heat pumps'],
            correct: 1,
            exp: 'Pool heaters are not designed to operate without water flowing through them. Firing a heater with no flow causes the heat exchanger to overheat rapidly — in a gas heater, this can warp or crack the heat exchanger; in a heat pump, it overloads the refrigerant circuit. Flow sensor confirmation is a mandatory safety interlock.' },
          {
            q: 'A Pentair IntelliCenter automation system controls a Pentair IntelliFlo VSP pump. How does the controller communicate the desired pump speed to the pump?',
            a: ['A 0–10 V analog signal proportional to RPM', 'RS-485 Modbus serial communication — the controller sends digital commands specifying the exact RPM', 'A simple on/off relay signal — the pump determines its own speed automatically', '120 V AC voltage level modulation — higher voltage = higher RPM'],
            correct: 1,
            exp: 'Pentair\'s IntelliCenter and IntelliFlo communicate via RS-485 Modbus, a digital serial protocol. The controller sends specific RPM commands (e.g., "run at 2,400 RPM") and can read back status, flow, power draw, and fault codes — full two-way digital control.',
          },
        ],
      },
    ],
    test: [
      { q: 'A pool automation system\'s freeze protection circuit activates when outdoor air temperature drops to approximately:', a: ['32°F (freezing)', '38–40°F', '45°F', '50°F'], correct: 1, exp: 'Freeze protection triggers at 38–40°F — above actual freezing point — to ensure water is circulating before water in exposed plumbing or thin equipment walls reaches 32°F. Water flowing through pipes does not freeze as quickly as standing water.' },
      { q: 'If an owner has manually turned the pool pump to OFF, freeze protection will:', a: ['Respect the OFF setting and not run the pump', 'Override the manual off and run the pump at minimum speed to protect the equipment from freeze damage', 'Send a smartphone alert but not run the pump automatically', 'Open the drain valves instead of running the pump'], correct: 1, exp: 'Freeze protection is designed to be automatic and overriding — if the pump is manually off during a freeze event, the automation system energizes the pump regardless of the manual setting. This is a deliberate safety design that protects the equipment investment.' },
      { q: 'What communication protocol does the Pentair IntelliFlo VSP use to communicate with the IntelliCenter automation controller?', a: ['0–10 V analog signal', 'RS-485 Modbus serial protocol', 'Wi-Fi 802.11b/g/n', 'BACnet IP'], correct: 1, exp: 'Pentair IntelliFlo pumps communicate with IntelliCenter via RS-485 Modbus — a wired digital serial protocol. This enables the controller to command specific RPM values, receive pump feedback (flow, watts, RPM, faults), and coordinate pump speed with heater, solar, and chemical system operation.' },
      { q: 'A pool heater fires successfully when manually bypassing the flow sensor but trips immediately when connected through the automation system. The most likely cause is:', a: ['The automation controller is programmed for spa mode only', 'The flow sensor is not detecting flow at the trigger threshold required by the controller before enabling the heater relay', 'The heater requires 240 V but is wired to a 120 V relay', 'The automation controller software requires a firmware update'], correct: 1, exp: 'If the flow sensor is dirty, mispositioned, or failing, it may not confirm flow to the controller even when adequate flow exists. The controller logic refuses to enable the heater without confirmed flow. Cleaning or replacing the flow sensor resolves the interlock failure.' },
      { q: 'An ORP probe connected to a chemical controller reads 580 mV. The controller\'s setpoint is 700 mV. What does the controller do?', a: ['Add acid to lower pH and raise ORP', 'Activate the chlorine source (SCG percentage increase or liquid chlorine pump) to add more sanitizer and raise ORP', 'Shut down the pump to reduce ORP consumption', 'Trigger an alarm only — chemical controllers do not dose automatically'], correct: 1, exp: 'When ORP falls below the controller setpoint, the controller activates the chlorination source — either increasing the SCG percentage output, pulsing a liquid chlorine pump, or opening a cal-hypo feeder valve — to add oxidizer and raise ORP back to the target range.' },
      { q: 'Which automation controller feature prevents a gas heater from operating when there is no demand for heating?', a: ['ORP interlock — heater only runs when ORP is below setpoint', 'Thermostat setpoint — heater only enables when water temperature is below the set temperature target', 'SCG lockout — heater and SCG cannot run simultaneously', 'Filter pressure interlock — heater only runs when filter is clean'], correct: 1, exp: 'The heater enable logic in the automation controller includes a thermostat setpoint — the heater relay only closes when water temperature (read from the return-line temperature sensor) is below the programmed target. When the set temperature is reached, the heater is disabled, preventing overheating.' },
      { q: 'A pool technician is installing a new automation system on an existing pool with manual wiring. The first step before making any connections should be:', a: ['Power up the new controller to test relay operation', 'Create a complete electrical diagram of the existing wiring before disconnecting anything', 'Disconnect all existing timers and switches, then start fresh', 'Order replacement wiring — existing wiring is not reusable with automation systems'], correct: 1, exp: 'Understanding the existing wiring before touching it prevents miswiring mistakes and loss of circuit identification. Pool equipment wiring can be complex (main pump, booster pump, salt cell, heater, lights, valves) and documenting it first ensures a clean, traceable installation.' },
      { q: 'A combo pool automation unit (controller and load center in one enclosure) is most appropriate for:', a: ['Large pools with 3+ pumps, heater, solar, spa, and 8+ feature circuits', 'Smaller pools with 1–2 pumps and a basic feature set needing a compact, economical control solution', 'Commercial pools requiring redundant controller modules', 'Pools with 240 V three-phase equipment'], correct: 1, exp: 'Combo units (Pentair EasyTouch, Hayward ProLogic all-in-one) are designed for simpler residential pools with limited circuit counts. Their compact, economical design is ideal for pools with 1 pump, a heater, lights, and maybe a valve or cleaner — not expandable to complex multi-feature systems.' },
      { q: 'The outdoor air temperature sensor on a pool automation system is most critical for which function?', a: ['Calculating heat loss to properly size the heater output', 'Triggering freeze protection when air temperature approaches freezing', 'Enabling the solar collector when sunlight is sufficient', 'Controlling the pool pump speed based on ambient temperature'], correct: 1, exp: 'The outdoor air temperature sensor is specifically required for freeze protection logic — the automation system monitors air temperature and automatically starts circulation before pipes freeze. Solar differential control uses a separate roof-mounted collector temperature sensor, not the ambient air sensor.' },
      { q: 'Pool automation systems from different manufacturers (Pentair, Hayward, Jandy) are generally:', a: ['Fully interoperable — any pump works with any controller', 'Proprietary — pumps, SCG, and other smart equipment communicate best within the same brand ecosystem', 'Required to use industry-standard BACnet protocol for equipment communication', 'Interoperable only for basic on/off relay control of pumps'], correct: 1, exp: 'Each manufacturer uses proprietary communication protocols for their smart equipment. A Pentair IntelliFlo pump communicates fully with an IntelliCenter controller (RPM control, status feedback) but can only be turned on/off by a Hayward or Jandy controller via a relay — no speed control or feedback.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 17 — POOL EQUIPMENT TECHNICIAN CAREER PATH
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'pool-career',
    num: 17,
    title: 'Pool Equipment Technician Career Path',
    desc: 'CPO certification, industry credentials, employment sectors, electrical licensing requirements, and compensation ranges.',
    slides: [
      {
        title: 'Industry Credentials & Standards',
        body: [
          'The CPO (Certified Pool Operator) credential is issued by PHTA (Pool & Hot Tub Alliance) — a 2-day course and exam covering water chemistry, filtration, regulatory compliance, and safety; widely required by commercial facility operators.',
          'AFO (Aquatic Facility Operator) is issued by NRPA (National Recreation and Park Association) — similar scope to CPO, preferred by municipal aquatics programs and parks departments.',
          'The CPO and AFO certifications are operations credentials — they demonstrate water chemistry and facility management competency, NOT equipment installation and repair competency.',
          'Equipment service technician skills (pump motor replacement, automation installation, heater repair) are typically learned through manufacturer training programs and on-the-job mentorship, not formal credentialing.',
          'NEC Article 680 electrical work around swimming pools is classified as electrical work requiring a licensed electrician in most U.S. jurisdictions — pool equipment technicians cannot legally install, modify, or repair pool electrical wiring without an electrical license in most states.',
          'Manufacturer training certifications (Pentair, Hayward, Jandy for controls; Hayward, Fluidra/Zodiac for pumps and equipment; Raypak, Hayward for heaters) qualify technicians for warranty service and demonstrate product-specific expertise.',
          'PHTA also offers the Certified Service Technician (CST) and Certified Builder credentials beyond CPO — the CST is specifically for equipment service technicians and covers diagnosis and repair.',
        ],
        keyPoints: [
          'CPO (PHTA) and AFO (NRPA) = operations/chemistry credentials — NOT equipment installation certification',
          'NEC 680 pool electrical work requires a licensed electrician in most jurisdictions — know your scope',
          'PHTA Certified Service Technician (CST) = the equipment service credential beyond CPO',
        ],
        quiz: [
          {
            q: 'A pool equipment technician is asked to replace a failed GFCI breaker in the pool sub-panel. In most U.S. jurisdictions, this requires:',
            a: ['A CPO certification from PHTA', 'A licensed electrician — pool electrical work falls under NEC Article 680 and requires an electrical license', 'No license if the breaker is a direct replacement of the same amperage', 'PHTA Certified Service Technician (CST) credential'],
            correct: 1,
            exp: 'Replacing circuit breakers in an electrical panel is licensed electrical work in virtually every U.S. jurisdiction regardless of the application. Pool sub-panel work additionally falls under NEC Article 680 requirements. Pool equipment technicians should be aware of their legal scope and engage licensed electricians for electrical panel work.',
          },
          {
            q: 'The CPO (Certified Pool Operator) certification issued by PHTA primarily qualifies holders for:',
            a: ['Installing and servicing pool mechanical and electrical equipment', 'Water chemistry management, regulatory compliance, and facility operation — not equipment repair and installation', 'Performing NEC 680 compliant electrical wiring at pool facilities', 'Designing pool hydraulic systems and specifying pump and filter sizing'],
            correct: 1,
            exp: 'CPO is an operations credential. It covers water chemistry (chlorine, pH, alkalinity, calcium hardness, CYA), health code compliance, recordkeeping, and pool safety. Equipment service and installation requires separate technical training — many CPO holders contract out equipment work to service technicians.',
          },
        ],
      },
      {
        title: 'Employment Sectors & Compensation',
        body: [
          'Residential pool service route: a route-based business model where a technician maintains 60–100+ pools per week (weekly or biweekly chemical service, filter cleaning, equipment checks) — the most common starting point for pool service careers.',
          'Pool and spa dealers offer retail service, equipment installation, and new construction plumbing/electrical rough-in coordination — steady year-round work in warm climates; seasonal in northern markets.',
          'Commercial aquatic facilities (hotels, fitness clubs, water parks, municipal pools) hire on-staff pool operators (CPO required) and contract service technicians for equipment maintenance — complex multi-body facilities with automation, chemical controllers, and large commercial equipment.',
          'Self-employed residential route technician: can earn $60,000–$120,000+ annually serving 70–90 pools per week at $100–200/pool/month; requires a vehicle, chemicals, equipment, business administration, and marketing.',
          'Equipment specialist (repair and installation) earns $55,000–$90,000 employed or $90,000–$150,000+ self-employed, especially in high-growth markets (Sun Belt, coastal areas) where new pool construction is strong.',
          'The pool industry has a significant shortage of qualified equipment technicians — demand consistently exceeds supply in growing suburban markets, making this a field with strong job security and compensation growth.',
          'Entry path: start as a route technician helper (learn chemical service and basic equipment checks), earn CPO, add manufacturer training (Pentair, Hayward), and expand into equipment repair and automation installation for higher compensation.',
        ],
        keyPoints: [
          'Residential service route: 70–90 pools/week at $100–200/pool/month = strong self-employment income',
          'Equipment specialist: $55,000–$90,000 employed; $90,000–$150,000+ self-employed in strong markets',
          'Significant technician shortage in most markets — strong job security and compensation growth trajectory',
        ],
        quiz: [
          {
            q: 'A pool equipment technician wants to maximize income. Which path typically yields the highest compensation?',
            a: ['On-staff CPO at a municipal aquatics center', 'Service route technician for a large regional pool company (employed)', 'Self-employed equipment specialist with automation and heater expertise in a growth market', 'Pool sales associate at a specialty retailer'],
            correct: 2,
            exp: 'Self-employed equipment specialists capture the full value of their skills — automation installation at $800–2,500 per job, heater replacements at $500–2,000, VSP upgrades at $600–1,500. In Sun Belt markets with high pool density and new construction, $100,000–$150,000 is achievable for skilled specialists.',
          },
          {
            q: 'The recommended entry path for a pool equipment technician targeting equipment specialization is:',
            a: ['Start with commercial aquatic facility management immediately after CPO', 'Route technician helper (learn chemistry and basic equipment) → CPO → manufacturer training → equipment repair → automation specialist', 'Complete an electrical apprenticeship first, then transition to pool equipment work', 'Earn AFO (NRPA) credential and work in municipal parks before pivoting to private pool service'],
            correct: 1,
            exp: 'Starting as a route technician helper builds practical experience with pool chemistry, equipment identification, and customer relationships. Adding CPO provides operations credibility. Manufacturer training from Pentair, Hayward, or Jandy unlocks warranty service eligibility and equipment-specific expertise — the combination creates a well-rounded equipment specialist.',
          },
        ],
      },
    ],
    test: [
      { q: 'The CPO (Certified Pool Operator) credential is issued by which organization?', a: ['NRPA (National Recreation and Park Association)', 'PHTA (Pool & Hot Tub Alliance)', 'NSF International', 'ICC (International Code Council)'], correct: 1, exp: 'PHTA (Pool & Hot Tub Alliance, formerly NSPF — National Swimming Pool Foundation) administers the CPO certification program, which is the most widely required commercial pool operator credential in the United States.' },
      { q: 'The AFO (Aquatic Facility Operator) credential is issued by which organization?', a: ['PHTA', 'NRPA (National Recreation and Park Association)', 'NSF', 'ICC'], correct: 1, exp: 'NRPA (National Recreation and Park Association) administers the AFO certification, which is common in municipal parks departments, recreation centers, and government-operated aquatic facilities that prefer NRPA credentials over PHTA credentials.' },
      { q: 'The PHTA Certified Service Technician (CST) credential differs from the CPO in that it:', a: ['Is more advanced but covers the same water chemistry content', 'Specifically addresses pool and spa equipment diagnosis, service, and repair — not just operations and chemistry', 'Is required by OSHA for commercial pool service technicians', 'Replaces the CPO for residential pool service work'], correct: 1, exp: 'The CST focuses on equipment — pumps, motors, filters, heaters, controllers, automation systems, and repair procedures. It fills the credential gap for equipment service technicians that the operations-focused CPO does not address.' },
      { q: 'In most U.S. states, installing a new pool sub-panel or adding circuits to an existing pool panel requires:', a: ['A CPO certification and PHTA approval', 'A state-licensed electrician — NEC Article 680 work is classified as licensed electrical work', 'No license for replacement-in-kind work of the same amperage and wiring method', 'A building permit only, without any license requirement'], correct: 1, exp: 'Electrical work at swimming pools falls under NEC Article 680 and state electrical licensing laws. Even "simple" work like replacing a GFCI breaker requires a licensed electrician in most jurisdictions. Pool equipment technicians who perform unlicensed electrical work expose themselves to significant legal and liability risk.' },
      { q: 'A self-employed residential route technician servicing 80 pools per week at an average of $150/pool/month earns approximately what monthly gross revenue?', a: ['$4,800/month', '$12,000/month', '$48,000/month', '$150,000/month'], correct: 1, exp: '80 pools × $150/month = $12,000/month gross revenue. From this, subtract chemical costs, vehicle/fuel, equipment, insurance, and business overhead — typical net margins for established routes are 40–60%, yielding $4,800–$7,200/month net, or $57,600–$86,400 annually.' },
      { q: 'Which pool market segment offers the most complex equipment, greatest automation sophistication, and highest technical skills demand?', a: ['Residential above-ground pool service', 'Small residential inground pool chemical service', 'Commercial aquatic facilities — water parks, hotels, municipal pools with multi-body systems', 'Above-ground spa service'], correct: 2, exp: 'Commercial aquatic facilities have large commercial pumps (often three-phase), chemical controllers, CO₂ injection systems, multiple pool bodies with automation, UV/ozone supplemental treatment, complex heating systems, and strict health department compliance requirements — the highest technical complexity in the pool industry.' },
      { q: 'Manufacturer training certifications from Pentair, Hayward, or Jandy are primarily valuable for pool technicians because:', a: ['They satisfy CPO recertification requirements', 'They qualify technicians for warranty service reimbursement and provide deep product-specific diagnostic and configuration knowledge', 'They replace NEC 680 electrical licensing requirements for that manufacturer\'s equipment', 'They are required to purchase equipment wholesale'], correct: 1, exp: 'Manufacturers require authorized service technicians to complete product-specific training to perform warranty work and process warranty claims. The training also builds hands-on product knowledge — circuit board diagnostics, firmware updates, calibration procedures — that directly translates to faster, more accurate repair work.' },
      { q: 'A pool equipment technician shortage in most U.S. markets means:', a: ['Entry-level technicians receive very low wages due to oversupply of candidates', 'Qualified technicians have strong negotiating power, high job security, and above-average compensation growth potential', 'The industry is contracting — fewer jobs will be available in 5 years', 'Only CPO-certified technicians can find employment'], correct: 1, exp: 'Demand for pool service has grown with new pool construction during and after the pandemic. The supply of qualified equipment technicians (not just chemical service but automation, heater, and pump repair) has not kept pace — creating a sellers\' market for skilled technicians in most U.S. markets.' },
      { q: 'A pool equipment technician who also holds electrical licensing can expand their services to:', a: ['Replacing pool main drain covers, which requires NEC 680 compliance', 'Installing bonding grids, GFCI breakers, sub-panels, and outlet additions — work that unlicensed technicians cannot legally perform', 'Performing pressure testing on pool plumbing underground lines', 'Installing pool covers and automatic safety cover systems'], correct: 1, exp: 'A pool technician who adds electrical licensing (typically journeyman or master electrician) can legally perform NEC Article 680 electrical work — bonding grid installation, GFCI and AFCI breaker replacement, sub-panel installation, and wiring — capturing the highest-value work in the pool service market.' },
      { q: 'The entry path recommended for a pool technician targeting equipment specialization and maximum long-term compensation is:', a: ['Complete a 4-year degree in mechanical engineering first', 'Start as a route helper (chemistry and basic equipment) → earn CPO → add manufacturer training → specialize in automation and equipment repair', 'Earn an electrical license first, then add pool-specific training', 'Apply directly to commercial aquatic facility management and learn equipment through facility work orders'], correct: 1, exp: 'Route service work builds customer-facing skills and product familiarity across many pool types. CPO provides operations credentials. Manufacturer training unlocks warranty eligibility and product-specific expertise. The combination builds the broad-to-deep skill stack that supports a high-compensation equipment specialist career.' },
    ],
  },
];
