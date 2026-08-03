import type { TrainingModule } from './modules';

export const PUMP_TECH_MODULES: TrainingModule[] = [
  // ── Module 11: Pump Fundamentals ────────────────────────────────────────────
  {
    id: 'pump-fundamentals',
    num: 11,
    title: 'Pump Fundamentals',
    desc: 'Fluid mechanics basics, pump classifications, performance curves, and how centrifugal and positive-displacement pumps work.',
    slides: [
      {
        title: 'How Pumps Move Fluid',
        body: [
          'A pump converts mechanical energy (from a motor or engine) into hydraulic energy by accelerating or displacing fluid.',
          'All pumps are classified as either kinetic (dynamic) or positive-displacement. Centrifugal pumps are the most common kinetic type in HVAC, water treatment, and process industries.',
          'Positive-displacement (PD) pumps deliver a fixed volume per revolution regardless of pressure — examples include gear pumps, screw pumps, and diaphragm pumps.',
          'Centrifugal pumps use an impeller to impart velocity to fluid; a volute or diffuser converts that velocity into pressure. They are self-limiting in pressure but highly variable in flow.',
        ],
        keyPoints: [
          'Kinetic (centrifugal) vs. positive-displacement — fundamentally different operating principles.',
          'Centrifugal: impeller → velocity → pressure via volute.',
          'PD pumps: fixed volume per revolution, suitable for high-pressure low-flow applications.',
        ],
        quiz: [
          {
            q: 'A gear pump is an example of which pump classification?',
            a: ['Positive-displacement', 'Centrifugal', 'Axial-flow kinetic', 'Regenerative turbine'],
            correct: 0,
            exp: 'Gear pumps are positive-displacement — they deliver a fixed volume of fluid per revolution regardless of system pressure.',
          },
        ],
      },
      {
        title: 'Fluid Properties Affecting Pump Selection',
        body: [
          'Viscosity is the fluid\'s resistance to flow. High-viscosity fluids (oils, slurries) require positive-displacement pumps; centrifugal pumps perform poorly with thick fluids.',
          'Specific gravity (SG) is the ratio of fluid density to water density (SG = 1.0 for water). Heavier fluids require more power to pump the same flow rate.',
          'Vapor pressure is the pressure at which a fluid vaporizes at a given temperature. If system pressure drops below vapor pressure, cavitation occurs.',
          'Corrosive or abrasive fluids dictate material selection: stainless steel, duplex, ceramic-coated, or lined pumps for aggressive services.',
        ],
        keyPoints: [
          'High viscosity → prefer PD pumps.',
          'SG > 1 means heavier fluid → more motor power required.',
          'Vapor pressure determines cavitation risk.',
        ],
        quiz: [
          {
            q: 'Why do high-viscosity fluids typically require positive-displacement pumps rather than centrifugal pumps?',
            a: ['Centrifugal pumps lose efficiency rapidly with thick fluids; PD pumps maintain fixed delivery regardless of viscosity', 'Centrifugal pumps cannot operate without water', 'PD pumps can run dry without damage', 'High-viscosity fluids always have higher vapor pressure'],
            correct: 0,
            exp: 'Centrifugal pump efficiency drops sharply with viscous fluids. PD pumps deliver consistent flow regardless of fluid thickness.',
          },
        ],
      },
      {
        title: 'Pump Performance Curves',
        body: [
          'A pump performance curve plots head (pressure expressed in feet or meters of fluid) vs. flow rate (GPM or m³/h) at a given speed and impeller diameter.',
          'As flow increases, head decreases. The curve\'s shape determines how the pump responds to system changes.',
          'The Best Efficiency Point (BEP) is the flow rate at which the pump operates with maximum efficiency. Operating far from BEP increases vibration, heat, and wear.',
          'The system curve plots the total head required vs. flow rate for the specific piping system. Where system curve and pump curve intersect is the operating point.',
        ],
        keyPoints: [
          'Head decreases as flow increases on a centrifugal pump curve.',
          'BEP = Best Efficiency Point — design the operating point here.',
          'Operating point = intersection of pump curve and system curve.',
        ],
        quiz: [
          {
            q: 'The Best Efficiency Point (BEP) on a pump performance curve represents:',
            a: ['The flow rate at which the pump operates with maximum efficiency', 'The maximum flow the pump can deliver', 'The minimum head the pump can produce', 'The point where the motor draws the least current'],
            correct: 0,
            exp: 'BEP is where efficiency is highest — operating away from BEP wastes energy and increases vibration and wear.',
          },
        ],
      },
      {
        title: 'Affinity Laws and Variable-Speed Pumping',
        body: [
          'The Affinity Laws describe how pump performance changes with speed: Flow ∝ Speed; Head ∝ Speed²; Power ∝ Speed³.',
          'Reducing pump speed to 80% cuts flow to 80%, head to 64%, and power to 51%. This cubic relationship makes variable-frequency drives (VFDs) extremely energy-efficient for pumps.',
          'VFDs allow pump speed to vary with system demand, maintaining near-BEP operation across a wide range of loads.',
          'Throttling a discharge valve to reduce flow wastes energy as heat in the valve; reducing speed via VFD saves that energy as reduced motor power.',
        ],
        keyPoints: [
          'Power scales with speed cubed — reducing speed 20% cuts power by nearly half.',
          'VFDs match pump speed to system demand and save significant energy.',
          'Throttling vs. speed reduction: speed reduction is far more efficient.',
        ],
        quiz: [
          {
            q: 'According to the Affinity Laws, reducing pump speed from 100% to 80% reduces power consumption to approximately:',
            a: ['51% of original (0.8³ ≈ 0.51)', '80% of original', '64% of original', '40% of original'],
            correct: 0,
            exp: 'Power scales with the cube of speed: 0.8³ = 0.512, so power drops to approximately 51% — a major energy saving.',
          },
        ],
      },
      {
        title: 'Pump Types and Applications',
        body: [
          'End-suction centrifugal pumps are the most common HVAC pump — single-stage, horizontal, suitable for clean water in chilled water and heating hot water systems.',
          'Inline pumps mount directly in the piping with suction and discharge on the same centerline — common in small HVAC systems and domestic water booster applications.',
          'Vertical turbine pumps draw water from deep wells or sumps; the motor sits above the water surface, driving a long shaft down to the impellers.',
          'Submersible pumps have a sealed, waterproof motor directly coupled to the pump and are placed entirely below the fluid surface — sewage lift stations, stormwater, and groundwater wells.',
        ],
        keyPoints: [
          'End-suction: most common HVAC pump for chilled and heating water.',
          'Vertical turbine: deep wells and sumps with motor above fluid.',
          'Submersible: motor and pump fully submerged — sewage and drainage.',
        ],
        quiz: [
          {
            q: 'An inline centrifugal pump is characterized by:',
            a: ['Suction and discharge ports on the same centerline, allowing direct pipe mounting', 'Submersed motor and impeller below fluid level', 'Multiple impeller stages for high pressure', 'A gear-driven positive-displacement mechanism'],
            correct: 0,
            exp: 'Inline pumps have their suction and discharge aligned so the pump body mounts directly in the pipeline without elbows.',
          },
        ],
      },
    ],
    test: [
      { q: 'Centrifugal pumps transfer energy to fluid primarily through:', a: ['Impeller rotation imparting velocity converted to pressure', 'Fixed displacement per revolution', 'Diaphragm reciprocating action', 'Gear meshing and unmeshing'], correct: 0, exp: 'The centrifugal impeller accelerates fluid; the volute converts velocity energy to pressure energy.' },
      { q: 'Which pump type delivers the same volume of fluid per revolution regardless of pressure?', a: ['Positive-displacement pump', 'Centrifugal pump', 'Axial-flow pump', 'Regenerative turbine pump'], correct: 0, exp: 'PD pumps deliver a fixed volume per revolution; centrifugal pump output varies with system pressure.' },
      { q: 'The specific gravity of water is:', a: ['1.0', '0.8', '1.3', '0.5'], correct: 0, exp: 'Water is the reference fluid for specific gravity with SG = 1.0 at standard conditions.' },
      { q: 'Cavitation occurs when system pressure drops below the fluid\'s:', a: ['Vapor pressure', 'Atmospheric pressure', 'Discharge pressure', 'Net positive suction head required'], correct: 0, exp: 'When local pressure falls below vapor pressure, the fluid flashes to vapor, causing cavitation bubbles and impeller damage.' },
      { q: 'The operating point of a centrifugal pump in a piping system is:', a: ['The intersection of the pump curve and the system curve', 'The Best Efficiency Point only', 'The maximum head the pump can produce', 'The point of lowest noise and vibration'], correct: 0, exp: 'The operating point is determined where the pump\'s head-flow curve intersects the system\'s resistance curve.' },
      { q: 'According to the Affinity Laws, pump head varies with speed as:', a: ['Head ∝ Speed²', 'Head ∝ Speed', 'Head ∝ Speed³', 'Head is independent of speed'], correct: 0, exp: 'The second Affinity Law: Head scales with the square of speed — doubling speed quadruples head.' },
      { q: 'Variable-frequency drives (VFDs) are particularly beneficial for centrifugal pumps because:', a: ['Power scales with speed cubed, so small speed reductions save large amounts of energy', 'They allow the pump to run at maximum speed at all times', 'They eliminate the need for mechanical seals', 'They prevent cavitation in all operating conditions'], correct: 0, exp: 'The cubic power-speed relationship means even modest speed reductions produce dramatic energy savings.' },
      { q: 'End-suction centrifugal pumps are most commonly found in:', a: ['HVAC chilled water and heating hot water systems', 'Deep well water extraction', 'Sewage lift stations', 'High-pressure hydraulic presses'], correct: 0, exp: 'End-suction single-stage pumps handle the moderate pressure and clean water typical of HVAC hydronic systems.' },
      { q: 'Operating a centrifugal pump far from its Best Efficiency Point results in:', a: ['Increased vibration, heat, and premature wear', 'Improved seal life and reduced maintenance', 'Higher flow at the same power', 'Elimination of cavitation risk'], correct: 0, exp: 'Off-BEP operation creates radial and axial thrust, heat buildup, and vibration that shorten pump life.' },
      { q: 'A submersible pump places the motor:', a: ['Fully below the fluid surface alongside the impeller', 'Above the fluid with a long shaft to the impeller', 'Beside the pump casing in a separate housing', 'Inside the discharge pipe above grade'], correct: 0, exp: 'Submersible pumps have a waterproof, sealed motor directly coupled to the impeller, both located below the fluid surface.' },
    ],
  },

  // ── Module 12: Pump Installation and Alignment ──────────────────────────────
  {
    id: 'pump-installation',
    num: 12,
    title: 'Pump Installation & Alignment',
    desc: 'Baseplate grouting, piping connections, flexible couplings, laser alignment, and proper commissioning before first start.',
    slides: [
      {
        title: 'Foundation and Baseplate Requirements',
        body: [
          'A pump foundation must be rigid enough to prevent vibration amplification. Concrete foundations should weigh at least three times the combined weight of the pump and motor.',
          'Grout fills the space between the baseplate and foundation after leveling. Epoxy grout is preferred over cementitious grout for its superior vibration damping and resistance to oil and water.',
          'Leveling jackscrews on the baseplate are used to achieve level within ±0.001 in/ft (0.08 mm/m) before grouting. After grout cures, jackscrews are removed or backed off.',
          'Check for soft foot — a condition where one or more pump or motor feet do not make full contact with the baseplate. Soft foot causes misalignment and frame distortion during operation.',
        ],
        keyPoints: [
          'Foundation mass ≥ 3× combined pump + motor mass to dampen vibration.',
          'Epoxy grout preferred: better vibration damping and chemical resistance.',
          'Soft foot must be corrected before alignment — shim as needed.',
        ],
        quiz: [
          {
            q: 'Soft foot refers to:',
            a: ['One or more equipment feet not making full contact with the baseplate', 'Insufficient grout curing time', 'A foundation with inadequate mass', 'Flexible isolation pads under the baseplate'],
            correct: 0,
            exp: 'Soft foot means a machine foot lifts when fasteners are loosened — it causes misalignment and must be corrected with shims before final alignment.',
          },
        ],
      },
      {
        title: 'Piping Best Practices',
        body: [
          'Piping must never impose forces or moments on the pump casing. Thermal expansion, dead weight, and pressure forces must be handled by hangers, anchors, and expansion joints — not the pump.',
          'The suction pipe should be one size larger than the pump suction flange and kept as short and straight as possible to minimize friction losses.',
          'An eccentric reducer at the suction inlet should be installed flat-side up (FSUP) to prevent air pockets from collecting at the top of the pipe.',
          'Isolation valves on suction and discharge allow pump removal without draining the system. A check valve on the discharge prevents backflow when the pump stops.',
        ],
        keyPoints: [
          'Piping loads must NOT be transferred to the pump casing.',
          'Suction: short, straight, one size up from pump inlet.',
          'Eccentric reducer: flat side up to prevent air pockets.',
        ],
        quiz: [
          {
            q: 'An eccentric reducer at a centrifugal pump suction should be installed with the flat side:',
            a: ['Up, to prevent air pockets from collecting at the top of the pipe', 'Down, to prevent cavitation at the impeller eye', 'Vertical, to equalize flow distribution', 'In any orientation — it makes no difference'],
            correct: 0,
            exp: 'Flat side up (FSUP) keeps the top of the pipe straight, preventing trapped air pockets that cause cavitation and noise.',
          },
        ],
      },
      {
        title: 'Coupling Types and Selection',
        body: [
          'A flexible coupling connects the pump shaft to the motor shaft while accommodating small amounts of misalignment and dampening shock loads.',
          'Jaw (spider) couplings use a elastomeric "spider" element between two hubs. They tolerate moderate misalignment and provide vibration isolation.',
          'Disc couplings use thin metal discs in place of elastomers — suitable for high-speed, high-temperature applications where elastomers would degrade.',
          'Spacer couplings have an extended middle section that can be removed to access mechanical seals without dismounting the pump or motor.',
        ],
        keyPoints: [
          'Flexible couplings accommodate minor misalignment but are not a substitute for proper alignment.',
          'Jaw coupling: elastomeric spider, vibration isolation, moderate misalignment.',
          'Spacer coupling: allows seal access without moving equipment.',
        ],
        quiz: [
          {
            q: 'The primary advantage of a spacer coupling over a standard flexible coupling is:',
            a: ['The center section can be removed to access mechanical seals without moving the pump or motor', 'It provides zero misalignment tolerance', 'It operates at lower speeds than standard couplings', 'It requires no lubrication'],
            correct: 0,
            exp: 'Spacer couplings save significant labor on seal replacements — the pump and motor stay in place while the seal is accessed.',
          },
        ],
      },
      {
        title: 'Shaft Alignment Methods',
        body: [
          'Shaft alignment corrects the relative positions of pump and motor shafts so their centerlines are collinear during operation.',
          'Rim-and-face (dial indicator) method: one dial indicator measures angular misalignment (face), another measures parallel misalignment (rim). Multiple readings around the coupling are required.',
          'Laser alignment systems project a beam from one shaft to a detector on the other and calculate alignment deviations digitally — faster and more precise than dial indicators.',
          'Alignment tolerances for flexible couplings: typically ≤ 0.002 in (0.05 mm) parallel (offset) and ≤ 0.001 in/in (0.001 mm/mm) angular. Always follow coupling manufacturer specifications.',
        ],
        keyPoints: [
          'Shaft alignment: collinear centerlines under operating conditions.',
          'Rim-and-face dial method or laser alignment — laser is faster and more accurate.',
          'Meet coupling manufacturer tolerance specs: typically ≤ 0.002 in offset.',
        ],
        quiz: [
          {
            q: 'Laser shaft alignment systems are preferred over dial indicators because:',
            a: ['They are faster and provide direct digital readout of misalignment in all planes simultaneously', 'They work without removing the coupling guard', 'They are required by OSHA for all pump installations', 'They eliminate the need to check soft foot'],
            correct: 0,
            exp: 'Laser systems measure angular and parallel misalignment simultaneously in multiple planes and display correction values directly — reducing time and improving accuracy.',
          },
        ],
      },
      {
        title: 'Pre-Start Checks and First Start Procedure',
        body: [
          'Before starting a new or overhauled pump: confirm rotation direction by bumping the motor briefly; verify all guards are in place; check oil levels and grease fittings.',
          'Confirm the pump is primed (suction valve open, casing filled with fluid, air vented). Running a centrifugal pump dry even briefly can destroy the mechanical seal.',
          'Open the discharge valve slowly after starting — never start a centrifugal pump against a closed discharge valve for more than 30–60 seconds (it will overheat from recirculation).',
          'Verify operating parameters against the design point: flow rate (from a flow meter or pressure drop), discharge pressure, current draw, and vibration levels.',
        ],
        keyPoints: [
          'Verify rotation direction before starting (bump test).',
          'Never run a centrifugal pump dry — destroys the mechanical seal.',
          'Start against cracked-open discharge; open fully after achieving speed.',
        ],
        quiz: [
          {
            q: 'Running a centrifugal pump dry (without fluid in the casing) most immediately damages the:',
            a: ['Mechanical seal', 'Impeller shroud', 'Discharge check valve', 'Motor windings'],
            correct: 0,
            exp: 'Mechanical seals rely on the pumped fluid for lubrication and cooling — dry running destroys the seal faces within seconds.',
          },
        ],
      },
    ],
    test: [
      { q: 'A pump concrete foundation should weigh at least how much relative to the pump and motor?', a: ['Three times the combined equipment weight', 'Equal to the equipment weight', 'Ten times the equipment weight', 'Half the equipment weight'], correct: 0, exp: 'A 3:1 mass ratio between foundation and equipment provides adequate vibration damping and stability.' },
      { q: 'Epoxy grout is preferred over cementitious grout for pump baseplates because:', a: ['It has better vibration damping and chemical resistance', 'It sets faster in cold weather', 'It is less expensive', 'It can be used without leveling the baseplate first'], correct: 0, exp: 'Epoxy grout resists oil, water, and vibration better than cementitious grout, making it the standard for rotating equipment foundations.' },
      { q: 'Soft foot is corrected by:', a: ['Shimming the affected foot(s) until all feet make full, even contact with the baseplate', 'Tightening the anchor bolts more firmly', 'Replacing the baseplate', 'Increasing grout thickness'], correct: 0, exp: 'Soft foot is corrected by measuring the gap and inserting precision shims until all machine feet contact the baseplate evenly.' },
      { q: 'Piping forces and moments on a pump casing cause:', a: ['Misalignment, seal failures, and casing distortion', 'Improved efficiency from added pressure', 'Better flow distribution through the impeller', 'Reduced vibration levels'], correct: 0, exp: 'External piping loads distort the pump casing and shift shaft alignment, causing premature failures of seals and bearings.' },
      { q: 'The eccentric reducer at a centrifugal pump suction should be installed flat-side:', a: ['Up', 'Down', 'On either side', 'Vertically'], correct: 0, exp: 'Flat side up keeps the pipe top flat, preventing air pockets from accumulating and causing cavitation or noise.' },
      { q: 'A jaw coupling\'s elastomeric spider element provides:', a: ['Vibration isolation and accommodation of moderate misalignment', 'Zero misalignment tolerance for high-precision applications', 'Metallic rigidity for high-temperature service', 'Magnetic coupling across a gap without physical contact'], correct: 0, exp: 'The elastomeric spider absorbs shock and vibration while tolerating small amounts of angular and parallel misalignment.' },
      { q: 'A spacer coupling allows:', a: ['Access to mechanical seals without moving the pump or motor', 'Higher speeds than standard flexible couplings', 'Operation without alignment', 'Direct bolting of pump to motor without a coupling hub'], correct: 0, exp: 'The removable center section of a spacer coupling allows seal replacement without disturbing the pump or motor position.' },
      { q: 'Typical parallel shaft alignment tolerance for a flexible coupling is:', a: ['≤ 0.002 inches (0.05 mm)', '≤ 0.020 inches (0.5 mm)', '≤ 0.200 inches (5 mm)', '≤ 0.0002 inches (0.005 mm)'], correct: 0, exp: 'Standard flexible coupling tolerance is 0.002 in (0.05 mm) parallel offset — always verify against the specific coupling manufacturer\'s specification.' },
      { q: 'Before starting a pump for the first time, rotation direction should be confirmed by:', a: ['Briefly bumping the motor and observing the direction of shaft rotation', 'Checking the motor nameplate for arrow direction', 'Consulting the pump curve only', 'Running at full speed with the discharge valve closed'], correct: 0, exp: 'A brief motor bump test confirms rotation before the pump is fully started — wrong rotation on a centrifugal pump reduces flow and can damage the seal.' },
      { q: 'Starting a centrifugal pump against a fully closed discharge valve is limited to:', a: ['No more than 30–60 seconds before overheating from internal recirculation', 'Indefinitely with proper cooling water', 'The first 5 minutes of each start as normal procedure', 'Only if an automatic recirculation valve is installed'], correct: 0, exp: 'Closed discharge causes all energy to be dissipated as heat in the recirculating fluid, which rapidly overheats the pump.' },
    ],
  },

  // ── Module 13: Seals, Bearings, and Lubrication ─────────────────────────────
  {
    id: 'pump-seals',
    num: 13,
    title: 'Seals, Bearings & Lubrication',
    desc: 'Mechanical seal types, packing glands, bearing classifications, lubrication methods, and proper storage and handling.',
    slides: [
      {
        title: 'Mechanical Seals vs. Packing',
        body: [
          'The shaft seal prevents fluid from leaking along the rotating shaft where it exits the pump casing. The two primary types are compression packing (gland packing) and mechanical seals.',
          'Packing uses rings of braided fiber (graphite, PTFE, aramid) compressed by a gland follower. It requires a controlled leak of 40–60 drops per minute for lubrication and cooling.',
          'Mechanical seals use lapped flat faces — one stationary, one rotating — held together by spring force and fluid pressure. Properly installed, they leak only drops per day or less.',
          'Mechanical seals are preferred for clean fluid service: lower leakage, longer service intervals, and lower energy loss. Packing is simpler to install and preferred when some leakage is acceptable.',
        ],
        keyPoints: [
          'Packing: controlled leakage (40–60 drops/min) for lubrication — normal operation.',
          'Mechanical seal: near-zero leakage using lapped mating faces.',
          'Never run a mechanical seal dry — lubrication comes from the pumped fluid.',
        ],
        quiz: [
          {
            q: 'Compression packing in a pump gland is designed to:',
            a: ['Allow a controlled leak of 40–60 drops per minute for lubrication', 'Provide zero leakage at all conditions', 'Operate dry without any fluid at the shaft', 'Replace mechanical seals in high-pressure service'],
            correct: 0,
            exp: 'Packing requires a controlled drip for lubrication and cooling — overtightening the gland causes heat buildup and shaft wear.',
          },
        ],
      },
      {
        title: 'Mechanical Seal Configurations',
        body: [
          'Single mechanical seals have one set of seal faces and are exposed to the pumped fluid on one side and atmosphere on the other. Suitable for non-hazardous, non-toxic fluids.',
          'Double mechanical seals have two sets of seal faces with a barrier fluid (usually clean water or oil) between them. Used for hazardous, toxic, or abrasive fluids.',
          'Cartridge seals come as a pre-assembled unit that slides onto the shaft and bolts to the stuffing box without needing to measure spring compression. They reduce installation errors significantly.',
          'The seal flush plan (API Plan 11, 21, 32, 53, etc.) describes how the seal faces are lubricated, cooled, and protected. The correct flush plan depends on fluid characteristics and pressure.',
        ],
        keyPoints: [
          'Single seal: one pair of faces, fluid on one side, atmosphere other.',
          'Double seal: two pairs of faces with barrier fluid — for hazardous fluids.',
          'Cartridge seals: pre-assembled for easier, more accurate installation.',
        ],
        quiz: [
          {
            q: 'A double mechanical seal is required when pumping:',
            a: ['Hazardous, toxic, or abrasive fluids requiring barrier fluid containment', 'Clean chilled water in an HVAC system', 'High-temperature steam condensate', 'Any fluid with a specific gravity less than 1.0'],
            correct: 0,
            exp: 'Double seals use a pressurized barrier fluid between two seal faces to prevent hazardous fluid from reaching the atmosphere.',
          },
        ],
      },
      {
        title: 'Rolling Element Bearings',
        body: [
          'Pump bearings support radial and axial (thrust) loads from the impeller and shaft. Most centrifugal pumps use ball bearings for light radial loads and angular contact ball bearings or roller bearings for combined loads.',
          'Bearing failure modes: fatigue spalling (flaking of raceways), contamination (dirt or moisture), overload, incorrect installation (press fit), and incorrect lubrication.',
          'Bearing numbering systems (ABEC/ANSI/ISO) identify bore diameter, outer diameter, and width. The last two digits of an ISO number × 5 = bore diameter in mm (e.g., bearing 6205 = 25 mm bore).',
          'Never use impact tools to install bearings — heat the bearing in an oil bath or use an induction heater (80–100°C) to expand it for a clean slip fit on the shaft.',
        ],
        keyPoints: [
          'Ball bearings: radial loads. Angular contact: combined radial + thrust.',
          'Install bearings with heat (80–100°C) — never hammer on races.',
          'Bearing number: last two digits × 5 = bore diameter in mm.',
        ],
        quiz: [
          {
            q: 'The correct method to install a press-fit bearing onto a pump shaft is to:',
            a: ['Heat the bearing to 80–100°C in an oil bath or induction heater for a slip fit', 'Strike the outer race with a hammer to press it on', 'Cool the shaft in liquid nitrogen only', 'Press only on the inner race using a bench vise'],
            correct: 0,
            exp: 'Heating expands the bearing bore for easy installation without damaging the races. Impact on the outer race forces loads through the balls, creating brinelling damage.',
          },
        ],
      },
      {
        title: 'Lubrication of Pump Bearings',
        body: [
          'Grease lubrication is the most common for pump bearings: it stays in place, seals against contamination, and requires infrequent regreasing.',
          'Oil lubrication is used for high-speed or high-temperature bearings where grease would break down. Constant-level oilers (Trico oilers) maintain the correct oil level in bearing housings.',
          'Overgreasing is one of the most common bearing failure causes — excess grease creates heat through churning and can contaminate mechanical seals.',
          'Grease compatibility: mixing different grease types (lithium vs. calcium sulfonate) can cause separation and reduced lubrication. When changing grease types, purge the old grease completely.',
        ],
        keyPoints: [
          'Overgreasing is a leading cause of bearing failure — follow manufacturer quantities.',
          'Constant-level oilers maintain correct oil level automatically.',
          'Never mix incompatible grease types without fully purging the old grease.',
        ],
        quiz: [
          {
            q: 'Overgreasing a pump bearing causes:',
            a: ['Heat buildup from churning and potential seal contamination', 'Extended bearing life from extra lubrication', 'Reduced vibration levels', 'Improved corrosion protection for the inner race'],
            correct: 0,
            exp: 'Too much grease generates heat as the rolling elements churn through the excess, increasing temperature and eventually causing bearing failure.',
          },
        ],
      },
      {
        title: 'Seal and Bearing Storage and Handling',
        body: [
          'Store mechanical seals in their original packaging in a clean, dry location away from sunlight and ozone-generating equipment (motors, welders). Elastomers degrade rapidly when exposed to UV and ozone.',
          'Bearings should be stored horizontally in original packaging. Standing bearings on edge can cause brinelling (dents in the raceway) from their own weight over time.',
          'Handle bearings with clean, dry gloves. Fingerprints introduce moisture and salt that initiate corrosion.',
          'Inspect bearings before installation: spin them by hand to check for roughness, clicks, or binding. Any roughness means the bearing is damaged and should not be installed.',
        ],
        keyPoints: [
          'Store seals away from UV and ozone — elastomers degrade.',
          'Bearings: store flat in original packaging; handle with clean gloves.',
          'Spin-check bearings before installation — roughness = reject.',
        ],
        quiz: [
          {
            q: 'Storing bearings vertically (on edge) can cause:',
            a: ['Brinelling — permanent dents in the raceway from the bearing\'s own weight', 'Corrosion from elevated humidity', 'Grease migration out of shielded bearings', 'No damage — storage orientation does not matter'],
            correct: 0,
            exp: 'A heavy bearing standing on edge concentrates its own weight on the lowest contact point of the raceway, creating brinell marks over time.',
          },
        ],
      },
    ],
    test: [
      { q: 'Compression packing in a pump gland should have a controlled leakage rate of approximately:', a: ['40–60 drops per minute', 'Zero drops per minute', '1–2 drops per second', '1 liter per hour'], correct: 0, exp: '40–60 drops/min is the normal operating leakage rate for compression packing — it lubricates and cools the packing rings.' },
      { q: 'Mechanical seal faces are held together by:', a: ['Spring force and fluid pressure', 'Gland bolts only', 'Atmospheric pressure alone', 'The impeller back vanes'], correct: 0, exp: 'Mechanical seal faces are loaded by a spring plus the pressure of the pumped fluid pushing from behind the rotating face.' },
      { q: 'A cartridge mechanical seal\'s primary advantage over a conventional seal is:', a: ['Pre-assembled unit reduces installation errors and eliminates measurement of spring compression', 'Lower cost in all applications', 'Suitable for higher pressures than conventional seals', 'It does not require a flush plan'], correct: 0, exp: 'Cartridge seals are factory-assembled with correct spring compression set — field installation just slides onto the shaft, reducing errors.' },
      { q: 'A double mechanical seal uses a barrier fluid to:', a: ['Prevent hazardous pumped fluid from reaching the atmosphere', 'Cool the motor bearings', 'Increase impeller efficiency', 'Reduce suction lift requirements'], correct: 0, exp: 'The barrier fluid between two seal faces keeps the hazardous pumped fluid contained while lubricating and cooling the inner seal faces.' },
      { q: 'Angular contact ball bearings are used in pump applications that have:', a: ['Combined radial and axial (thrust) loads', 'Only radial loads with no thrust', 'Very low rotational speeds', 'Direct immersion in the pumped fluid'], correct: 0, exp: 'Angular contact bearings are designed to handle combined radial and axial loads — common at centrifugal pump impellers.' },
      { q: 'For a bearing numbered ISO 6210, the bore diameter is:', a: ['50 mm (last two digits 10 × 5 = 50)', '10 mm', '62 mm', '210 mm'], correct: 0, exp: 'ISO bearing bore: last two digits × 5 = bore in mm. "10" × 5 = 50 mm bore.' },
      { q: 'Constant-level oilers on pump bearing housings serve to:', a: ['Automatically maintain the correct oil level regardless of consumption', 'Filter oil particles during operation', 'Cool the bearing housing with circulating water', 'Measure bearing temperature continuously'], correct: 0, exp: 'Constant-level (Trico-type) oilers use a sight glass reservoir to keep oil at exactly the design level in the bearing housing.' },
      { q: 'Mixing two incompatible grease types in a bearing is dangerous because:', a: ['The greases can chemically react, lose consistency, and fail to lubricate', 'Incompatible greases always cause bearing seizure within minutes', 'The combined volume overloads the bearing', 'The color difference makes inspection difficult'], correct: 0, exp: 'Some grease thickeners are chemically incompatible — mixing lithium and calcium sulfonate greases, for example, can cause the combined grease to liquefy and run out.' },
      { q: 'Before installing a bearing, the correct pre-installation check is to:', a: ['Spin the bearing by hand and listen for roughness or clicking', 'Strike the outer race to check hardness', 'Measure the bore with a pin gauge only', 'Heat the bearing first, then check rotation'], correct: 0, exp: 'A manual spin test detects rough raceways, contamination, or brinelling that would cause rapid failure if the bearing were installed.' },
      { q: 'Mechanical seals should be stored away from ozone-generating equipment because:', a: ['Ozone degrades the elastomeric components (O-rings and bellows)', 'Ozone causes corrosion of the seal face materials', 'Ozone increases static electricity and damages seal springs', 'Ozone is toxic and endangers workers during seal installation'], correct: 0, exp: 'Ozone attacks rubber and elastomers, causing cracking and hardening — even low concentrations from nearby motors or welders degrade seal O-rings in storage.' },
    ],
  },

  // ── Module 14: Pump Troubleshooting and Diagnostics ─────────────────────────
  {
    id: 'pump-troubleshooting',
    num: 14,
    title: 'Troubleshooting & Diagnostics',
    desc: 'Diagnosing cavitation, vibration, low flow, high temperature, and seal failures using systematic troubleshooting and condition monitoring.',
    slides: [
      {
        title: 'Systematic Troubleshooting Approach',
        body: [
          'Effective pump troubleshooting follows a structured process: define the problem → gather data → form a hypothesis → test → implement the fix → verify.',
          'Gather baseline data before the problem occurred (design performance, historical vibration readings, normal temperatures) to compare against current readings.',
          'Use all available senses: listen for cavitation (crackling), vibration (imbalance), or bearing noise; feel for unusual heat; look for leaks and discoloration.',
          'Document findings thoroughly — pump trouble can be intermittent, and a complete record helps identify patterns and prevents rework.',
        ],
        keyPoints: [
          'Define → Gather data → Hypothesize → Test → Fix → Verify.',
          'Compare current readings to baseline — deviation is the symptom.',
          'Document everything: intermittent problems require pattern recognition.',
        ],
        quiz: [
          {
            q: 'The first step in a systematic pump troubleshooting approach is to:',
            a: ['Define the problem with specific, measurable symptoms', 'Replace the mechanical seal', 'Check the motor current', 'Shut down and drain the system'],
            correct: 0,
            exp: 'Defining the problem with specific symptoms (e.g., "flow dropped from 300 to 180 GPM at the same discharge pressure") focuses the investigation.',
          },
        ],
      },
      {
        title: 'Cavitation: Causes, Signs, and Remedies',
        body: [
          'Cavitation occurs when fluid pressure at the pump inlet (suction) drops below the fluid\'s vapor pressure, forming vapor bubbles. When these bubbles collapse near the impeller, they release shockwaves that erode metal.',
          'Signs of cavitation: crackling or rumbling noise (like rocks in a dryer), vibration, reduced flow and pressure, rapid impeller and casing erosion.',
          'NPSH (Net Positive Suction Head) is the key cavitation parameter. NPSHR is the minimum head required by the pump; NPSHa is the available head from the system. NPSHa must exceed NPSHR by a margin of at least 1.0 m (3 ft).',
          'Remedies: lower fluid temperature, reduce suction pipe friction (shorter runs, fewer fittings), lower pump elevation relative to the source, reduce pump speed, or select a pump with lower NPSHR.',
        ],
        keyPoints: [
          'Cavitation: vapor bubbles form at low pressure, implode on impeller — causes crackling noise and erosion.',
          'NPSHa must exceed NPSHR by at least 3 ft (1 m).',
          'Reduce suction losses, lower fluid temperature, or reduce speed to fix.',
        ],
        quiz: [
          {
            q: 'The characteristic sound of cavitation in a centrifugal pump is:',
            a: ['A crackling or rumbling sound like gravel in a dryer', 'A high-pitched whistling from the seal area', 'A steady low hum from the motor', 'A rhythmic banging in the discharge pipe'],
            correct: 0,
            exp: 'Cavitation bubbles imploding on the impeller create the characteristic crackling or gravel sound — easily distinguishable from normal pump noise.',
          },
        ],
      },
      {
        title: 'Vibration Analysis Basics',
        body: [
          'Vibration is measured in velocity (in/s or mm/s peak or RMS) or acceleration (g) and is used to detect pump and motor faults before failure occurs.',
          'Common vibration fault frequencies: 1× running speed = imbalance; 2× running speed = misalignment; blade pass frequency (# vanes × RPM/60) = hydraulic unbalance or recirculation.',
          'A vibration spectrum analyzer (FFT analyzer) displays amplitude vs. frequency — each fault produces a characteristic frequency signature.',
          'Trending vibration over time is more important than a single reading. A reading of 0.3 in/s may be normal for a given pump; a sudden jump from 0.1 to 0.3 in/s signals a developing fault.',
        ],
        keyPoints: [
          '1× = imbalance; 2× = misalignment; blade pass = hydraulic issue.',
          'FFT spectrum identifies fault type by frequency signature.',
          'Trend over time — sudden change is more alarming than absolute value.',
        ],
        quiz: [
          {
            q: 'A vibration peak at exactly 2× pump running speed most likely indicates:',
            a: ['Shaft misalignment', 'Impeller imbalance', 'Cavitation', 'Bearing inner race defect'],
            correct: 0,
            exp: 'A 2× running speed vibration component is the classic signature of shaft misalignment between the pump and motor.',
          },
        ],
      },
      {
        title: 'Low Flow and High Temperature Problems',
        body: [
          'Low flow causes: worn or eroded impeller, closed/partially closed valves, clogged strainer, airlocked suction, wrong rotation direction, pump too small for system, or excessive discharge pressure.',
          'High temperature in the pump casing indicates insufficient flow through the pump. Recirculation (minimum flow bypass) may be required if the pump must operate below its minimum continuous stable flow.',
          'Elevated bearing temperature (above 90°C / 194°F for grease-lubricated bearings) signals lubrication failure, overload, misalignment, or bearing defect.',
          'Motor current higher than nameplate full-load amperage (FLA) when pump was on-spec previously suggests the fluid specific gravity increased, a restriction was removed, or the impeller is fouled.',
        ],
        keyPoints: [
          'Low flow: check strainer, valves, rotation, impeller wear, and system curve.',
          'High casing temperature: flow too low — check minimum flow requirements.',
          'Bearing temperature > 90°C: investigate lubrication, alignment, or bearing damage.',
        ],
        quiz: [
          {
            q: 'A centrifugal pump\'s bearing temperature rises above 90°C. The first items to check are:',
            a: ['Lubrication quantity and type, shaft alignment, and bearing condition', 'Discharge pressure and flow rate', 'Suction strainer and vapor pressure', 'Motor current and power factor'],
            correct: 0,
            exp: 'High bearing temperature is primarily caused by lubrication failure, misalignment, or a damaged bearing — these should be checked first.',
          },
        ],
      },
      {
        title: 'Seal Failure Diagnosis',
        body: [
          'Mechanical seal leakage exceeding a few drops per minute indicates face wear, contamination, or installation error. Check for: thermal shock, dry running, misalignment, vibration, or wrong seal for the service.',
          'Carbon face blistering or cracking indicates the seal ran dry or was subjected to thermal shock from rapid temperature change. Quartzite pitting on the ceramic face suggests abrasive particles in the fluid.',
          'A squealing noise from the seal area during startup is usually a dry-running condition — check that the pump is fully primed and that the flush line (if equipped) is flowing.',
          'After replacing a seal, verify flush plan is functioning, check for wobble or run-out on the shaft (should be < 0.001 in), and start slowly to confirm no leakage before returning to normal operation.',
        ],
        keyPoints: [
          'Carbon blistering = dry run or thermal shock.',
          'Quartzite pitting on ceramic face = abrasive particles in fluid.',
          'Post-replacement: verify flush, check shaft runout, start slowly.',
        ],
        quiz: [
          {
            q: 'Carbon face blistering on a mechanical seal indicates:',
            a: ['The seal ran dry or experienced thermal shock from rapid temperature change', 'The seal was installed with excessive spring compression', 'The pumped fluid was below the seal\'s pressure rating', 'The seal material is incompatible with the barrier fluid'],
            correct: 0,
            exp: 'Carbon faces blister or crack when overheated from dry running or rapid temperature changes — the carbon graphite ablates and loses its flat sealing surface.',
          },
        ],
      },
    ],
    test: [
      { q: 'NPSHa must exceed NPSHR by at least:', a: ['3 feet (1 meter)', '10 feet (3 meters)', '0 feet — they can be equal', '20 feet (6 meters)'], correct: 0, exp: 'Industry practice requires a minimum NPSH margin of 3 ft (1 m) to provide a safety buffer against cavitation at the impeller eye.' },
      { q: 'A crackling sound from a centrifugal pump most likely indicates:', a: ['Cavitation', 'Bearing contamination', 'Shaft imbalance', 'Discharge check valve chatter'], correct: 0, exp: 'Cavitation bubbles imploding on the impeller produce the characteristic crackling or gravel-rolling sound.' },
      { q: 'A vibration peak at 1× running speed typically indicates:', a: ['Rotor imbalance', 'Shaft misalignment', 'Bearing defect', 'Hydraulic recirculation'], correct: 0, exp: '1× (once-per-revolution) vibration is the classic signature of mass imbalance in the rotating assembly.' },
      { q: 'Blade pass frequency in a centrifugal pump is calculated as:', a: ['Number of impeller vanes × RPM / 60', 'RPM / 60', 'RPM × 60', 'RPM / number of vanes'], correct: 0, exp: 'Each impeller vane passes the volute cutwater once per revolution, so BPF = (number of vanes) × (rotation frequency in Hz).' },
      { q: 'Operating a centrifugal pump below its minimum continuous stable flow causes:', a: ['Internal recirculation, high temperature, and rapid seal and bearing wear', 'Improved efficiency by reducing hydraulic losses', 'Lower vibration from reduced flow turbulence', 'Increased discharge pressure beneficial for high-resistance systems'], correct: 0, exp: 'Below minimum flow, the pump recirculates fluid internally, generating heat and creating turbulence that destroys the mechanical seal and impeller.' },
      { q: 'A pump\'s motor draws significantly more current than its design FLA after a system modification. The most likely cause is:', a: ['The system resistance dropped, moving the operating point to higher flow and power', 'The seal failed, reducing power consumption', 'The impeller was replaced with a smaller trim', 'The VFD reduced the motor speed'], correct: 0, exp: 'Removing a restriction shifts the operating point to higher flow on the pump curve, which for centrifugal pumps means more horsepower and higher current.' },
      { q: 'Quartzite pitting on the ceramic face of a mechanical seal indicates:', a: ['Abrasive particles in the pumped fluid are scoring the seal face', 'Thermal shock from temperature cycling', 'Incorrect spring force setting', 'Elastomer chemical incompatibility'], correct: 0, exp: 'Hard particles (sand, mill scale, crystallized salts) in the fluid circulate through the seal faces and abrasively wear the softer stationary face.' },
      { q: 'Trending vibration data over time is most useful for:', a: ['Detecting developing faults before catastrophic failure occurs', 'Proving compliance with OSHA vibration limits', 'Selecting the correct bearing replacement', 'Verifying alignment after installation'], correct: 0, exp: 'A sudden or gradual increase in vibration over time signals a developing fault — trending enables planned maintenance before failure.' },
      { q: 'Low flow from a centrifugal pump should prompt checking all of the following EXCEPT:', a: ['Motor insulation resistance', 'Strainer condition', 'Impeller wear and erosion', 'Valve positions in the system'], correct: 0, exp: 'Motor insulation resistance is a motor health check, not related to hydraulic flow problems. The other items all directly affect pump flow output.' },
      { q: 'After replacing a mechanical seal, shaft runout should be verified to be less than:', a: ['0.001 inches (0.025 mm)', '0.010 inches (0.25 mm)', '0.100 inches (2.5 mm)', 'No limit — seal flex accommodates runout'], correct: 0, exp: 'Shaft runout > 0.001 in causes the rotating seal face to wobble, preventing proper face contact and causing leakage.' },
    ],
  },

  // ── Module 15: Preventive Maintenance and Overhaul ──────────────────────────
  {
    id: 'pump-maintenance',
    num: 15,
    title: 'Preventive Maintenance & Overhaul',
    desc: 'Inspection schedules, vibration and oil analysis, impeller service, pump overhaul procedures, and condition-based maintenance strategies.',
    slides: [
      {
        title: 'Preventive Maintenance Programs',
        body: [
          'A PM program establishes scheduled inspection and maintenance tasks to prevent failures rather than react to them. Tasks are organized by frequency: daily, monthly, quarterly, and annually.',
          'Daily checks: observe for unusual noise, vibration, leakage, or temperature. Record oil levels and gland drip rate. Review operating parameters against baseline.',
          'Monthly: lubricate bearings per schedule, check coupling alignment and condition, inspect suction strainers, verify instrumentation calibration.',
          'Annual/overhaul: disassemble, inspect all wear components (impeller, wear rings, bearings, seal, shaft sleeves), replace as needed, and record all clearances.',
        ],
        keyPoints: [
          'PM: prevent failures through scheduled tasks — daily, monthly, quarterly, annual.',
          'Daily checks: noise, vibration, leakage, temperature, oil level.',
          'Annual overhaul: disassemble, inspect, measure clearances, replace wear parts.',
        ],
        quiz: [
          {
            q: 'The primary goal of a pump preventive maintenance program is to:',
            a: ['Prevent failures by identifying and correcting problems before they cause downtime', 'Comply with regulatory inspection requirements only', 'Reduce lubrication costs', 'Maximize run time by delaying maintenance as long as possible'],
            correct: 0,
            exp: 'PM programs convert reactive (break-fix) maintenance to planned maintenance, reducing downtime, repair costs, and safety incidents.',
          },
        ],
      },
      {
        title: 'Vibration and Oil Analysis',
        body: [
          'Vibration analysis (route-based data collection with trending) detects imbalance, misalignment, bearing defects, and hydraulic instabilities before they cause failures.',
          'Oil analysis evaluates lubricating oil condition (viscosity, acid number, water content) and detects wear metals (iron, copper, lead) that indicate bearing or gear wear.',
          'Infrared thermography can identify hot bearings, electrical connection problems, and seal failures through elevated surface temperatures without contact.',
          'Condition-based maintenance (CBM) uses data from these techniques to schedule maintenance only when the equipment actually needs it — avoiding both over-maintenance and unexpected failures.',
        ],
        keyPoints: [
          'Vibration analysis: fault detection before failure.',
          'Oil analysis: fluid condition + wear metal detection.',
          'CBM: maintain when data says needed, not on fixed intervals.',
        ],
        quiz: [
          {
            q: 'Oil analysis on a pump bearing housing that shows elevated iron content indicates:',
            a: ['Ferrous wear metals from bearing or shaft wear within the housing', 'Normal lubricant oxidation over time', 'High water content from seal leakage', 'Lubricant viscosity is too high'],
            correct: 0,
            exp: 'Elevated iron (Fe) in oil analysis signals metal-to-metal contact inside the bearing housing — a sign of bearing wear or inadequate lubrication.',
          },
        ],
      },
      {
        title: 'Wear Rings and Impeller Clearances',
        body: [
          'Wear rings (case wear rings and impeller wear rings) control the internal recirculation path between the high-pressure discharge and low-pressure suction within the pump casing.',
          'As wear rings erode, internal leakage increases, efficiency drops, and flow output decreases. Manufacturers specify maximum allowable radial clearances (typically 0.010–0.025 in per side).',
          'Measure wear ring clearances with feeler gauges or a dial indicator. When clearance exceeds the maximum, replace the wear rings — not always the entire pump.',
          'Impeller eye diameter and vane condition also affect performance. Cavitation erodes impeller vanes; abrasive fluids cause smooth vane erosion. Dimensional inspection determines serviceability.',
        ],
        keyPoints: [
          'Wear rings control internal recirculation — eroded rings reduce efficiency and flow.',
          'Measure clearance; replace rings when clearance exceeds manufacturer limit.',
          'Inspect impeller vanes for cavitation erosion and abrasive wear.',
        ],
        quiz: [
          {
            q: 'When wear ring clearance exceeds the manufacturer\'s maximum allowable value, the recommended action is to:',
            a: ['Replace the wear rings to restore efficiency and flow capacity', 'Replace the entire pump assembly', 'Increase system pressure to compensate', 'Operate at reduced speed only'],
            correct: 0,
            exp: 'Worn rings cause internal recirculation losses but the pump casing and impeller may still be serviceable — replace the rings selectively.',
          },
        ],
      },
      {
        title: 'Pump Overhaul Procedure',
        body: [
          'Before disassembly: isolate and lock out / tag out (LOTO) the pump; relieve system pressure; drain and flush if pumping hazardous fluid; photograph all connections.',
          'Disassembly order: remove coupling, back-pull or remove bearing housings, extract shaft/impeller assembly, remove seal, then remove wear rings and bushings.',
          'During inspection: measure all clearances and runout; photograph unusual wear patterns; bag and label all parts to prevent mix-up.',
          'Reassembly follows reverse order. Torque all fasteners to specification. Verify final alignment and check seal installation before refilling and restarting.',
        ],
        keyPoints: [
          'LOTO before disassembly — no exceptions.',
          'Document before disassembly (photos), measure all clearances during inspection.',
          'Reassemble with torque specs; verify alignment before startup.',
        ],
        quiz: [
          {
            q: 'Before disassembling a pump for overhaul, the first safety step is to:',
            a: ['Isolate and apply lockout/tagout (LOTO) to the pump and driver', 'Drain the fluid from the casing', 'Remove the coupling guard', 'Photograph all pipe connections'],
            correct: 0,
            exp: 'LOTO is always the first and non-negotiable step before any maintenance on rotating equipment — it prevents accidental energization.',
          },
        ],
      },
      {
        title: 'Shaft Sleeves, Impeller Adjustment, and Reassembly Checks',
        body: [
          'Shaft sleeves protect the shaft from wear and corrosion at the seal and packing gland area. Measure sleeve OD and ID for roundness and wear; replace when worn beyond specification.',
          'Some pumps have adjustable impellers (axial adjustment screw) to restore clearances between the impeller face and casing wear plate without replacing parts.',
          'During reassembly, verify shaft deflection and bearing preload. Install O-rings and gaskets dry or with compatible assembly lubricant — never petroleum grease on EPDM O-rings.',
          'Post-assembly rotation check: rotate the shaft by hand to confirm smooth, free rotation without binding. Binding indicates an assembly error — stop and investigate before starting.',
        ],
        keyPoints: [
          'Shaft sleeves protect the shaft — inspect and replace when worn.',
          'Hand-rotate after reassembly — binding means an error; do not start.',
          'O-ring lubricant must be compatible — petroleum grease degrades EPDM.',
        ],
        quiz: [
          {
            q: 'After reassembling a pump, the shaft should be rotated by hand to confirm:',
            a: ['Free, smooth rotation without binding before energizing', 'That the coupling alignment is within tolerance', 'That the motor current matches the nameplate', 'That the discharge valve is fully open'],
            correct: 0,
            exp: 'A hand-rotation check catches assembly errors (rubbing components, misaligned seal, incorrect bearing preload) before they cause immediate damage on startup.',
          },
        ],
      },
    ],
    test: [
      { q: 'The primary goal of a pump PM program is to:', a: ['Prevent failures through scheduled inspection and maintenance', 'Comply with ISO 9001 documentation requirements', 'Reduce lubrication costs only', 'Operate pumps at maximum speed for efficiency'], correct: 0, exp: 'PM programs shift maintenance from reactive to proactive, preventing failures and unplanned downtime.' },
      { q: 'Elevated iron content in pump bearing oil analysis most likely indicates:', a: ['Ferrous wear from bearing or shaft contact', 'High water contamination from seal leakage', 'Oxidized lubricant from overheating', 'Normal baseline lubricant composition'], correct: 0, exp: 'Iron in oil analysis is a wear metal that indicates metal-to-metal contact — bearing wear, shaft wear, or housing scoring.' },
      { q: 'Wear ring clearance exceeding manufacturer limits causes:', a: ['Increased internal recirculation, reduced flow, and lower efficiency', 'Higher discharge pressure from restricted flow path', 'Improved NPSH performance', 'Reduced vibration from softer contact'], correct: 0, exp: 'Excessive wear ring clearance allows high-pressure discharge fluid to leak back to suction internally, reducing usable flow and pump efficiency.' },
      { q: 'LOTO (Lockout/Tagout) is applied before pump maintenance to:', a: ['Prevent accidental energization of the motor during work', 'Record the maintenance event in the log', 'Confirm the pump is at the correct temperature', 'Test the check valve function'], correct: 0, exp: 'LOTO isolates and de-energizes all energy sources (electrical, pneumatic, hydraulic) to prevent accidental startup during maintenance.' },
      { q: 'Condition-based maintenance (CBM) schedules maintenance when:', a: ['Diagnostic data (vibration, oil analysis) indicates a need', 'Fixed calendar intervals are reached regardless of equipment condition', 'The customer requests a service visit', 'Equipment fails and repair is required'], correct: 0, exp: 'CBM uses actual equipment condition data to trigger maintenance — avoiding both over-maintenance and unexpected failures.' },
      { q: 'Shaft sleeves are used in centrifugal pumps primarily to:', a: ['Protect the shaft from wear and corrosion at the sealing area', 'Improve impeller hydraulic efficiency', 'Reduce bearing preload during operation', 'Balance the rotating assembly at the factory'], correct: 0, exp: 'Shaft sleeves are sacrificial components — they absorb wear from packing or seal contact and can be replaced without replacing the more expensive shaft.' },
      { q: 'During pump overhaul disassembly, photographing all connections and components before removal serves to:', a: ['Document the original configuration to guide correct reassembly', 'Prove LOTO compliance to the safety officer', 'Identify hazardous fluid contamination for waste disposal', 'Measure component dimensions for the work order'], correct: 0, exp: 'Photos before disassembly provide a visual reference for reassembly orientation, pipe connections, and component positioning.' },
      { q: 'Petroleum-based grease should NOT be used to lubricate EPDM O-rings because:', a: ['Petroleum products degrade EPDM elastomers, causing swelling and seal failure', 'It is too viscous for O-ring groove installation', 'It contaminates the pumped fluid', 'EPDM O-rings do not require any lubrication'], correct: 0, exp: 'Petroleum hydrocarbons cause EPDM to swell and soften, destroying the O-ring\'s sealing geometry — use silicone grease or the fluid being pumped.' },
      { q: 'Infrared thermography identifies pump problems by detecting:', a: ['Elevated surface temperatures from hot bearings, seal failures, or electrical connections', 'Internal cavitation by imaging bubble formation', 'Shaft misalignment via thermal differential imaging', 'Oil level through tank wall temperature gradients'], correct: 0, exp: 'IR thermography detects heat — hot bearings, poorly connected electrical terminals, and overheated seals all show as thermal anomalies.' },
      { q: 'A hand-rotation binding check after pump reassembly must be performed:', a: ['Before energizing the motor — binding means an assembly error requiring investigation', 'After the first 5 minutes of operation', 'Only if the pump failed during previous operation', 'To verify VFD programming is correct'], correct: 0, exp: 'Binding during hand rotation indicates a misassembled component that will cause immediate damage on startup — always check before energizing.' },
    ],
  },

  // ── Module 16: Career Development and Codes ──────────────────────────────────
  {
    id: 'pump-career',
    num: 16,
    title: 'Career Growth & Codes for Pump Technicians',
    desc: 'Codes and standards (ANSI/HI, API 610, ASME), career pathways, certifications, and advancing in the pump industry.',
    slides: [
      {
        title: 'Key Pump Industry Codes and Standards',
        body: [
          'ANSI/HI (Hydraulic Institute) standards are the primary reference for pump design, installation, testing, and maintenance in the US — covering centrifugal, rotary, and reciprocating pumps.',
          'API 610 (ISO 13709) specifies requirements for centrifugal pumps in petroleum, petrochemical, and natural gas industry service — more rigorous than ANSI/HI for heavy-duty rotating equipment.',
          'ASME B73 covers horizontal end-suction centrifugal pump dimensions for chemical process applications — ensuring dimensional interchangeability between manufacturers.',
          'NFPA 20 governs fire pump installation, including driver, controller, and water supply requirements for centrifugal fire pumps in building fire protection systems.',
        ],
        keyPoints: [
          'ANSI/HI: primary US pump design and installation standard.',
          'API 610: heavy-duty oil & gas centrifugal pump specification.',
          'NFPA 20: fire pump installation requirements.',
        ],
        quiz: [
          {
            q: 'API 610 pump specifications apply primarily to:',
            a: ['Centrifugal pumps in petroleum, petrochemical, and natural gas service', 'Fire pump installation in commercial buildings', 'HVAC chilled water pump systems', 'Domestic water pressure booster applications'],
            correct: 0,
            exp: 'API 610 (ISO 13709) establishes rigorous design, testing, and documentation requirements for centrifugal pumps in refinery and petrochemical service.',
          },
        ],
      },
      {
        title: 'Pump Technician Career Pathways',
        body: [
          'Entry-level pump technicians typically start as installation helpers or maintenance technicians in HVAC, water treatment, wastewater, industrial, or municipal settings.',
          'Mid-career progression: lead technician → service engineer → pump application engineer or reliability engineer. Each step requires deeper diagnostic and systems knowledge.',
          'Specialty areas include fire pump service (requiring Hydraulic Institute certification), industrial rotating equipment (reliability engineering), and OEM factory-authorized service.',
          'Pump system designers and application engineers often hold mechanical engineering (ME) degrees; however, technicians with strong hands-on and theoretical knowledge regularly advance into these roles.',
        ],
        keyPoints: [
          'Entry: installation helper, maintenance tech.',
          'Mid-career: lead tech → service engineer → reliability or application engineer.',
          'Specialty: fire pump, OEM factory service, reliability engineering.',
        ],
        quiz: [
          {
            q: 'NFPA 20-compliant fire pump technicians require specialized training because:',
            a: ['Fire pumps have strict testing, controller, and driver requirements that differ from standard HVAC pumps', 'Fire pumps use positive-displacement mechanisms only', 'NFPA 20 requires annual government licensure', 'Fire pumps must be maintained only by the building owner'],
            correct: 0,
            exp: 'NFPA 20 fire pump service requires knowledge of weekly/annual testing protocols, jockey pump coordination, and controller logic beyond standard centrifugal pump service.',
          },
        ],
      },
      {
        title: 'Certifications and Continuing Education',
        body: [
          'The Hydraulic Institute offers the Pump Systems Matter® Certified Pump System Specialist (CPSS) program, covering pump selection, energy efficiency, and system optimization.',
          'NFPA 20 fire pump inspector and testing certifications (from NICET and state boards) are required in many jurisdictions for fire pump service work.',
          'Manufacturer training programs (Goulds, Grundfos, Armstrong, Bell & Gossett, Xylem) provide factory-authorized technician certifications for specific product lines.',
          'Continuing education through webinars, trade publications (Pumps & Systems magazine), and industry events (Pump Users Expo) keeps technicians current with technology and best practices.',
        ],
        keyPoints: [
          'Hydraulic Institute CPSS: pump system efficiency specialty certification.',
          'NICET: fire pump testing and inspection certifications.',
          'OEM factory programs: product-specific authorized service credentials.',
        ],
        quiz: [
          {
            q: 'The Hydraulic Institute\'s CPSS credential focuses on:',
            a: ['Pump system selection, energy efficiency, and optimization', 'Mechanical seal installation technique', 'Fire suppression system design', 'API 610 rotating equipment inspection'],
            correct: 0,
            exp: 'The Certified Pump System Specialist (CPSS) credential from the Hydraulic Institute certifies knowledge of pump selection, system design, and energy efficiency optimization.',
          },
        ],
      },
      {
        title: 'Energy Efficiency and System Optimization',
        body: [
          'Pumping systems represent 20% of world motor energy use. Even small efficiency improvements have significant energy and cost impacts.',
          'The Pump Systems Matter® energy audit methodology identifies savings opportunities: right-sizing oversized pumps, trimming impellers, adding VFDs, fixing leaks, and correcting system curve mismatch.',
          'Impeller trimming (reducing impeller OD on a lathe) reduces head and flow per the Affinity Laws, moving the operating point closer to BEP and reducing energy consumption — a low-cost alternative to replacing the pump.',
          'Specific speed (Ns) is a dimensionless number that describes a pump\'s hydraulic shape. Matching specific speed to the application ensures the most efficient pump type is selected.',
        ],
        keyPoints: [
          'Pumping = 20% of global motor energy — efficiency gains have large impact.',
          'Impeller trimming moves operating point to BEP without replacing the pump.',
          'Specific speed guides pump type selection for maximum efficiency.',
        ],
        quiz: [
          {
            q: 'Impeller trimming is used to:',
            a: ['Reduce impeller OD to lower head and flow and move the operating point closer to BEP', 'Balance the impeller to reduce vibration only', 'Increase flow capacity for an undersized pump', 'Replace worn impeller vanes without replacing the whole assembly'],
            correct: 0,
            exp: 'Trimming the impeller OD reduces both head and flow per the Affinity Laws, allowing fine-tuning of the operating point to match system requirements more efficiently.',
          },
        ],
      },
      {
        title: 'Professionalism and Field Safety',
        body: [
          'Pump technicians work near rotating machinery, pressurized systems, confined spaces, and potentially hazardous fluids. Consistent safety discipline is non-negotiable.',
          'Key hazards: entanglement (rotating couplings and shafts), stored pressure (pressurized systems), toxic/corrosive fluid exposure, and confined space entry (sumps, tanks, wet wells).',
          'Wear appropriate PPE for the fluid being pumped: face shield and chemical-resistant gloves for corrosives; respirator for toxic vapors; hearing protection near high-noise pump stations.',
          'Documentation of service work — what was found, what was done, what parts were replaced, and what measurements were taken — protects you legally and adds value to the customer relationship.',
        ],
        keyPoints: [
          'Rotating machinery, pressurized systems, confined spaces, hazardous fluids — constant hazard awareness.',
          'PPE selection must match the fluid and environment.',
          'Document every service visit thoroughly — protection and professional value.',
        ],
        quiz: [
          {
            q: 'Before entering a wet well or pump sump for inspection or maintenance, the primary safety requirement is:',
            a: ['Confined space entry permit with atmospheric testing, attendant, and rescue plan in place', 'Wearing a hard hat and safety glasses only', 'Isolating the motor from the electrical panel', 'Reducing pump flow to minimum before entry'],
            correct: 0,
            exp: 'Wet wells and sumps are confined spaces — entry requires atmospheric testing (O2, H2S, LEL), a trained attendant outside, and a documented rescue plan.',
          },
        ],
      },
    ],
    test: [
      { q: 'ANSI/HI standards primarily govern:', a: ['Pump design, testing, installation, and maintenance in the US', 'Fire protection system design only', 'API oil and gas refinery processes', 'HVAC equipment energy efficiency ratings'], correct: 0, exp: 'The Hydraulic Institute (HI) in conjunction with ANSI publishes the primary US standards for pumps of all types.' },
      { q: 'API 610 specifies pump requirements for:', a: ['Petroleum, petrochemical, and natural gas industry service', 'Municipal water treatment plants', 'HVAC chilled water systems', 'Domestic plumbing installations'], correct: 0, exp: 'API 610 is used in oil refineries, chemical plants, and gas processing facilities for heavy-duty centrifugal pump procurement and operation.' },
      { q: 'NFPA 20 governs:', a: ['Fire pump installation, driver, and controller requirements', 'Industrial process pump design', 'Pump energy efficiency ratings', 'Confined space rescue procedures for wet wells'], correct: 0, exp: 'NFPA 20 is the Standard for the Installation of Stationary Pumps for Fire Protection, covering all aspects of fire pump systems in buildings.' },
      { q: 'The Hydraulic Institute CPSS certification demonstrates expertise in:', a: ['Pump system selection, energy efficiency, and optimization', 'Fire pump testing and inspection', 'API 610 heavy-duty rotating equipment', 'Confined space entry procedures'], correct: 0, exp: 'CPSS (Certified Pump System Specialist) is a Pump Systems Matter credential focused on system-level efficiency and optimization knowledge.' },
      { q: 'Impeller trimming reduces pump performance according to:', a: ['The Affinity Laws — reducing OD reduces head and flow in proportion to diameter ratio squared and cubed respectively', 'Bernoulli\'s equation only', 'The system curve independently of the pump curve', 'Specific speed calculations alone'], correct: 0, exp: 'Impeller trimming follows affinity scaling based on diameter ratio, reducing head roughly as (D2/D1)² and flow as (D2/D1).' },
      { q: 'The primary energy efficiency opportunity in pumping systems is often:', a: ['Right-sizing oversized pumps, adding VFDs, and fixing system curve mismatches', 'Replacing all bearing lubricants with premium synthetic oil', 'Reducing operating temperature of the motor', 'Increasing discharge pressure to reduce flow'], correct: 0, exp: 'Many pump systems are oversized, mismatched, or throttled — addressing these root causes through VFDs, impeller trimming, and system design corrections yields the largest energy savings.' },
      { q: 'The primary hazard when working on rotating pump shafts and couplings is:', a: ['Entanglement with rotating components if coupling guards are removed', 'Static electricity discharge from the rotating shaft', 'High-voltage electrical shock from the motor', 'Noise-induced hearing loss only'], correct: 0, exp: 'Entanglement in rotating shafts, couplings, and fans is one of the most severe machinery hazards — always ensure guards are in place before starting equipment.' },
      { q: 'Entering a wet well for pump inspection requires:', a: ['A confined space entry permit with atmospheric testing, attendant, and rescue plan', 'Only a hard hat and fall protection harness', 'An API 610 inspection certificate', 'Hydraulic Institute CPSS certification'], correct: 0, exp: 'Wet wells are permit-required confined spaces with risks of oxygen deficiency, toxic gases (H2S), and engulfment — full confined space procedures are mandatory.' },
      { q: 'Specific speed (Ns) is used in pump selection to:', a: ['Identify the optimal pump hydraulic shape for the required head and flow combination', 'Calculate bearing lubrication intervals', 'Determine the API 610 service classification', 'Set the VFD speed reference signal'], correct: 0, exp: 'Specific speed is a dimensionless index that characterizes pump hydraulic shape — matching Ns to the application ensures the most efficient pump geometry is selected.' },
      { q: 'Documenting each service visit thoroughly benefits the pump technician by:', a: ['Providing legal protection and demonstrating professional value to the customer', 'Reducing the number of return visits required', 'Qualifying the technician for OEM factory certification', 'Fulfilling OSHA confined space entry record requirements'], correct: 0, exp: 'Detailed service records protect technicians in disputes, demonstrate competence and thoroughness to customers, and create a maintenance history that improves future service quality.' },
    ],
  },
];
