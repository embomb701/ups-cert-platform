import type { TrainingModule } from './modules';

export const ELEVATOR_TECH_MODULES: TrainingModule[] = [
  {
    id: 'elev-mechanics',
    num: 11,
    title: 'Elevator Types, Traction & Drive Systems',
    desc: 'Traction vs hydraulic, roping configurations, counterweight, VVVF drives, and machine-room-less design',
    slides: [
      {
        title: 'Traction vs Hydraulic Elevators',
        body: [
          'Traction elevators use steel hoist ropes running over a grooved drive sheave powered by an electric motor. The rope grips the sheave through friction, lifting and lowering the car and counterweight on opposite ends. Traction designs are used from mid-rise to high-rise and can exceed 2,000 fpm contract speed.',
          'Hydraulic elevators use a submersible or above-ground power unit to pressurize hydraulic fluid, extending a ram (jack cylinder) that pushes the car upward. Gravity and controlled release of fluid lower the car. Hydraulic units are limited to roughly 60 fpm and five or six stories due to jack length constraints.',
          'Winding-drum machines represent an older traction variant where ropes wrap around a grooved drum without a counterweight. They are largely obsolete and prohibited for most new installations by ASME A17.1 due to limited rope capacity and free-fall risk.',
          'Selecting the correct type depends on building height, traffic volume, and pit/overhead clearance. Traction provides higher speed, energy efficiency via regenerative drives, and is preferred where a counterweight overhead space is available.',
        ],
        images: [
          { src: '/diagrams/traction-vs-hydraulic-elevators.svg', alt: 'Diagram comparing traction elevators (friction-driven sheave with counterweight) and hydraulic elevators (pressurized ram/jack), plus the obsolete winding-drum variant and selection criteria', caption: 'Two ways to lift a car — traction friction-drives a counterweighted sheave, hydraulic pushes on a fluid-powered ram limited by jack length.' },
        ],
        keyPoints: [
          'Traction: friction-driven sheave, counterweight, unlimited height',
          'Hydraulic: ram/jack extends on pressurized fluid, limited to ~6 stories',
          'Winding-drum: obsolete, no counterweight, prohibited by ASME A17.1 for most uses',
          'Contract speed is the rated design speed of the elevator system',
        ],
        quiz: [
          {
            q: 'Which type of elevator uses a grooved drive sheave and a counterweight to move the car?',
            a: ['Hydraulic elevator', 'Traction elevator', 'Winding-drum machine', 'Rack-and-pinion elevator'],
            correct: 1,
            exp: 'Traction elevators grip steel ropes on a grooved drive sheave. The motor turns the sheave; the counterweight on the opposite rope end balances the car weight, reducing motor load.',
          },
          {
            q: 'What fundamental limitation restricts hydraulic elevators to roughly five or six stories?',
            a: [
              'Motor horsepower limits',
              'Governor rope length restrictions',
              'Maximum practical jack cylinder length',
              'ASME A17.1 pressure rating',
            ],
            correct: 2,
            exp: 'The hydraulic jack (cylinder/ram) must extend far enough to travel the full floor distance. Beyond about five or six floors, the cylinder length becomes impractical and structural constraints in the pit prevent deeper drilling.',
          },
        ],
      },
      {
        title: 'Roping Configurations & the Counterweight',
        body: [
          'In 1:1 roping the rope attaches directly to the car frame; the car travels at the same speed as the rope. This configuration requires the drive sheave and motor to handle the full counterweight-to-car load differential with no mechanical advantage.',
          'In 2:1 roping the rope passes under a sheave mounted on the car frame (or counterweight) and back up to a termination point. The car travels at half the rope speed, but the motor needs to move only half the load — providing a 2:1 mechanical advantage at the expense of double rope travel distance.',
          'Counterweight mass is set to approximately the car empty weight plus 40 to 50 percent of the rated load capacity. At that loading level (roughly half-full car), the drive sheave load is near zero, minimizing motor torque requirements and energy consumption at average traffic conditions.',
          'Dead-end hitches, spring hitches, and shackles secure rope terminations in the overhead and pit. Each rope is individually adjustable to equalize tension; unequal tension causes differential sheave wear and accelerates rope fatigue.',
        ],
        images: [
          { src: '/diagrams/roping-configurations-counterweight.svg', alt: 'Diagram comparing 1:1 and 2:1 roping configurations with a worked speed example, plus the counterweight sizing formula of car weight plus 40-50% rated capacity', caption: '1:1 roping has no mechanical advantage; 2:1 roping halves motor load at double the rope travel — and the counterweight formula that balances both.' },
        ],
        keyPoints: [
          '1:1 roping: car speed equals rope speed, no mechanical advantage',
          '2:1 roping: car travels at half rope speed, 2x mechanical advantage',
          'Counterweight = car weight + 40-50% of rated capacity',
          'Equal rope tension across all hoist ropes is required for even sheave wear',
        ],
        quiz: [
          {
            q: "In 2:1 roping, if the hoist rope travels at 400 fpm, the elevator car moves at:",
            a: ['400 fpm', '800 fpm', '200 fpm', '100 fpm'],
            correct: 2,
            exp: "With 2:1 roping, a sheave under the car frame doubles the rope travel for each unit of car travel. The rope moves twice as fast as the car, so a 400 fpm rope yields a 200 fpm car speed.",
          },
          {
            q: 'Counterweight mass is typically set to car weight plus what percentage of rated load capacity?',
            a: ['20-30%', '40-50%', '60-70%', '75-80%'],
            correct: 1,
            exp: 'ASME A17.1 requires a counterweight of car weight plus 40-50% of rated capacity. This balances the drive sheave near zero load at average traffic, reducing motor energy use and peak rope tension.',
          },
        ],
      },
      {
        title: 'Drive Systems: VVVF Drives & Gearless Machines',
        body: [
          'Variable Voltage Variable Frequency (VVVF) drives are the modern standard for traction elevator speed control. The drive converts incoming AC power to DC internally, then synthesizes a variable-frequency AC output to the motor. Precise frequency and voltage ramping produces smooth acceleration and deceleration without the mechanical jerking of older systems.',
          'Regenerative VVVF drives feed braking energy back to the building electrical system when the elevator decelerates or when a fully loaded car descends. Energy savings of 35 to 50 percent compared to older rheostatic braking are common, and PUE improvements in data centers with elevator traffic are measurable.',
          'Gearless traction machines couple the drive sheave directly to the motor shaft with no gearbox. A permanent-magnet motor or AC induction motor with encoder feedback provides precise position control. Gearless designs are quieter, require less maintenance, and are standard in mid-rise and high-rise applications.',
          'Geared traction machines use a worm gear or helical gear reduction between the motor and drive sheave. They are used in low-rise and mid-rise applications at lower contract speeds. The gearbox requires periodic lubrication and wear inspection, and worm gears are susceptible to heat-related oil breakdown.',
        ],
        keyPoints: [
          'VVVF: variable frequency/voltage AC output for smooth, efficient speed control',
          'Regenerative drives recover braking energy and return it to the building grid',
          'Gearless: motor shaft directly turns drive sheave — quieter, less maintenance',
          'Geared: worm or helical gear between motor and sheave — lower cost for low-speed applications',
        ],
        quiz: [
          {
            q: 'VVVF drives produce smooth elevator speed control primarily by varying:',
            a: [
              'DC field current only',
              'Both output voltage and frequency to the motor',
              'SCR firing angle in the motor armature',
              'Rotor resistance via contactors',
            ],
            correct: 1,
            exp: 'Variable Voltage Variable Frequency drives adjust both voltage and frequency of the AC output to the elevator motor. Reducing frequency reduces motor speed; matching voltage to frequency prevents flux saturation, yielding smooth torque throughout the speed range.',
          },
          {
            q: 'A gearless traction machine differs from a geared machine in that it:',
            a: [
              'Uses 2:1 roping exclusively',
              'Requires a hydraulic assist for starting torque',
              'Directly couples the motor shaft to the drive sheave with no gearbox',
              'Operates only with DC motors',
            ],
            correct: 2,
            exp: "In a gearless machine the drive sheave mounts directly on the motor shaft, eliminating the worm or helical gearbox. This reduces noise, oil maintenance, and gear-wear concerns while enabling high speeds.",
          },
        ],
      },
      {
        title: 'Machine Room & Machine-Room-Less Designs',
        body: [
          'Traditional traction elevators have a dedicated machine room above the hoistway (or sometimes offset at mid-rise). The room houses the drive machine, controller, governor, and electrical panels. ASME A17.1 specifies minimum room dimensions, lighting levels, and temperature requirements (60-90 degrees F) to protect electronics and oil viscosity.',
          'Machine-room-less (MRL) elevators relocate the machine to the hoistway overhead or pit and move the controller to a remote cabinet in the corridor. Flat permanent-magnet motors allow placement in the top of the hoistway without a dedicated room. This recovers rentable floor space and is now standard in new low-rise and mid-rise construction.',
          'Access to MRL machinery requires specialized tools and procedures. Technicians work in the pit or through overhead access panels rather than a dedicated room floor. ASME A17.1 mandates adequate lighting, a stop switch within reach, and sufficient clearance around the equipment for safe maintenance.',
          'Hydraulic machine rooms are typically located in the pit or an adjacent ground-floor room and house the power unit (motor, pump, tank), valve assembly, and controller. Oil containment is mandatory; most jurisdictions require a sealed pit or secondary containment for the hydraulic tank.',
        ],
        keyPoints: [
          'Machine room temp: 60-90 degrees F per ASME A17.1',
          'MRL: machine in hoistway top or pit, controller in corridor cabinet',
          'MRL access requires tools and pit/overhead access panels; stop switch must be within reach',
          'Hydraulic power unit requires oil containment and secondary spill protection',
        ],
        quiz: [
          {
            q: 'Per ASME A17.1, machine room temperature must be maintained within:',
            a: ['40-60 degrees F', '50-70 degrees F', '60-90 degrees F', '70-100 degrees F'],
            correct: 2,
            exp: 'ASME A17.1 specifies a machine room temperature range of 60-90 degrees F (15-32 degrees C). Temperatures below 60 degrees F can cause hydraulic oil to thicken and damage controller electronics; above 90 degrees F risks overheating drives and motor insulation.',
          },
          {
            q: 'In a machine-room-less (MRL) traction elevator, the controller is typically located:',
            a: [
              'In a dedicated room above the hoistway',
              'Inside the elevator car on the ceiling panel',
              'In a remote cabinet in the building corridor near the top landing',
              'Below the pit floor in a sealed vault',
            ],
            correct: 2,
            exp: 'MRL designs move the controller to a wall-mounted enclosure accessible from the building corridor, usually near the top landing. This eliminates the need for a dedicated machine room while keeping the controller accessible for service without entering the hoistway.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Which elevator type operates by extending a hydraulic ram to raise the car?',
        a: ['Traction elevator', 'Hydraulic elevator', 'Gearless traction', 'Winding-drum machine'],
        correct: 1,
        exp: 'Hydraulic elevators use a power unit to pressurize fluid that extends a cylinder/ram, raising the car. Gravity and controlled fluid release lower it. Traction systems use rope and counterweight instead.',
      },
      {
        q: "In 2:1 roping, if the drive rope moves at 600 fpm, the car's contract speed is:",
        a: ['600 fpm', '1200 fpm', '300 fpm', '150 fpm'],
        correct: 2,
        exp: '2:1 roping gives a 2:1 mechanical advantage. The rope travels twice the distance of the car, so a 600 fpm rope yields a 300 fpm car speed.',
      },
      {
        q: 'Counterweight mass is set to car weight plus what percentage of rated load capacity?',
        a: ['20-30%', '40-50%', '60-75%', '80-100%'],
        correct: 1,
        exp: 'ASME A17.1 requires counterweight = car weight + 40-50% of rated capacity, minimizing drive sheave load at average traffic conditions and reducing motor energy consumption.',
      },
      {
        q: 'A regenerative VVVF drive benefits the building by:',
        a: [
          'Eliminating the need for a machine-room controller',
          'Feeding braking energy back to the building electrical system',
          'Allowing the elevator to bypass the governor safety chain',
          'Reducing counterweight weight requirements by 50%',
        ],
        correct: 1,
        exp: 'Regenerative drives convert kinetic energy during deceleration back into electricity returned to the building grid. Energy savings of 35-50% compared to rheostat braking are typical, especially in high-traffic buildings.',
      },
      {
        q: 'A gearless traction machine differs from a geared machine because it:',
        a: [
          'Uses 2:1 roping exclusively',
          'Cannot use VVVF drives',
          'Couples the motor shaft directly to the drive sheave without a gearbox',
          'Requires a separate hydraulic starting assist',
        ],
        correct: 2,
        exp: 'Gearless machines mount the drive sheave directly on the motor shaft. Eliminating the worm or helical gearbox reduces noise, mechanical loss, and oil maintenance requirements.',
      },
      {
        q: 'ASME A17.1 specifies machine room temperature must be maintained between:',
        a: ['40-60 degrees F', '50-75 degrees F', '60-90 degrees F', '80-100 degrees F'],
        correct: 2,
        exp: 'The 60-90 degrees F range protects controller electronics and ensures hydraulic oil viscosity remains within specification. Cold oil thickens; hot environments overheat drive electronics and motor insulation.',
      },
      {
        q: 'What is the primary advantage of a machine-room-less (MRL) traction elevator?',
        a: [
          'Faster contract speeds than geared machines',
          'Elimination of the dedicated machine room, recovering rentable building floor space',
          'Lower cost hoist rope due to 2:1 roping',
          'No need for a governor or safety device',
        ],
        correct: 1,
        exp: 'MRL elevators place the compact flat-motor machine in the hoistway overhead or pit and use a corridor controller cabinet, eliminating the dedicated machine room and recovering valuable floor area on upper floors.',
      },
      {
        q: 'In a 1:1 roped traction elevator, if the drive rope moves at 500 fpm, the car speed is:',
        a: ['1000 fpm', '500 fpm', '250 fpm', '125 fpm'],
        correct: 1,
        exp: 'In 1:1 roping the rope terminates directly at the car frame with no mechanical advantage sheave. The car moves at exactly the same speed as the rope: 500 fpm.',
      },
      {
        q: 'Hydraulic elevator power units must have oil containment primarily to:',
        a: [
          'Maintain oil temperature below 120 degrees F',
          'Prevent soil and groundwater contamination in the event of a leak',
          'Allow the elevator to continue running after a seal failure',
          'Meet ASME A17.1 governor requirements',
        ],
        correct: 1,
        exp: 'Hydraulic elevator oil (typically petroleum or biodegradable synthetic) is an environmental contaminant. Most jurisdictions require secondary containment, a sealed pit floor, or an above-ground tank enclosure to prevent leaks from reaching soil or groundwater.',
      },
      {
        q: 'Which drive system was used in older traction elevators and dissipated braking energy as heat through resistors?',
        a: ['VVVF regenerative drive', 'Permanent-magnet synchronous drive', 'Rheostatic (AC2 or Ward-Leonard) control', 'Inverter flux-vector drive'],
        correct: 2,
        exp: 'Older rheostatic and Ward-Leonard systems controlled speed by inserting variable resistance in the motor circuit, converting excess energy to heat. VVVF drives replaced them with efficient frequency-based control and regenerative capability.',
      },
    ],
  },
  {
    id: 'elev-electrical',
    num: 12,
    title: 'Controllers, Door Systems & Interlocks',
    desc: 'Relay vs microprocessor controllers, door operator types, ASME A17.1 door interlocks, and traveling cable systems',
    slides: [
      {
        title: 'Relay Logic vs Microprocessor Controllers',
        body: [
          'Early elevator controllers used relay ladder logic — physical electromagnetic relays wired to sequence floor calls, door operation, and speed control. Each step of the ride cycle is handled by a specific relay or contactor: up direction, leveling, acceleration, deceleration, door opening. Relay panels are large, noisy, and require skilled technicians who can trace relay logic on schematic diagrams.',
          'Microprocessor-based controllers replaced relay logic beginning in the 1980s. Software handles all sequencing, floor call dispatching, and diagnostics. Modern microprocessor controllers log fault codes, provide remote monitoring via network interfaces, and allow traffic pattern optimization through adjustable parameters.',
          'Solid-state logic does not wear like mechanical contacts, but it introduces the need for software diagnostics rather than physical inspection. Technicians must read fault code lists, navigate menus, and use laptop interfaces or tablet tools provided by the OEM. Controller replacement is modular — failed boards are swapped rather than repaired.',
          'Power conversion in both controller types is handled by drive sections. In relay-era systems, motor-generator sets or silicon-controlled rectifiers managed motor current. Modern microprocessor controllers integrate directly with VVVF drive modules, providing a single diagnostic interface for both motion control and sequencing.',
        ],
        keyPoints: [
          'Relay logic: physical relays wire each step of ride sequence — large, diagnosable by schematic trace',
          'Microprocessor: software sequences all functions, logs fault codes, enables remote monitoring',
          'Solid-state boards are swapped not repaired in the field',
          'VVVF drive and controller are integrated in modern systems',
        ],
        quiz: [
          {
            q: 'A key advantage of microprocessor elevator controllers over relay logic panels is:',
            a: [
              'They require no electrical power during a building fire',
              'Fault code logging and remote diagnostics via network interface',
              'They eliminate the need for a traveling cable to the car',
              'They do not require ASME A17.1 compliance',
            ],
            correct: 1,
            exp: 'Microprocessor controllers log fault events with timestamps, communicate diagnostic data over network connections, and allow traffic analysis. These capabilities are impossible with relay logic, which requires physical inspection and schematic tracing for diagnosis.',
          },
          {
            q: 'When a microprocessor controller board fails in the field, the standard repair approach is:',
            a: [
              'Resolder failed components under magnification',
              'Replace the failed board with a matching spare from stock',
              'Override the faulted board with relay bypass logic',
              'Contact the OEM to reprogram the relay panel',
            ],
            correct: 1,
            exp: 'Microprocessor boards are replaced as modules. Component-level repair requires specialized equipment and OEM firmware. Technicians carry or order matching replacement boards and swap them, then verify operation with diagnostic tools.',
          },
        ],
      },
      {
        title: 'Door Operator Types & Adjustment',
        body: [
          'Center-opening (CO) and two-speed side-opening (2SO) are the two most common door configurations. Center-opening doors split from the center and retract to both sides simultaneously, offering the widest clear opening relative to door panel width. Two-speed side-opening doors have panels that travel at different speeds — the fast panel leads, the slow panel follows at half speed — suitable for narrower hoistways.',
          'Door operators drive the door panels via a mechanical linkage or a lead arm connected to an electromechanical or VVVF-controlled motor. Modern door operators use variable-speed drives to accelerate doors quickly, then decelerate to a gentle close near the full-open and full-close positions, reducing impact and noise.',
          'Door open time is adjustable in the controller: the dwell time the door stays open after a passenger activates the call is set by parameter or potentiometer. Extended dwell time improves accessibility (ADA compliance) but reduces handling capacity in high-traffic buildings.',
          'Nudging operation is activated when a door reopening device has continuously held the door open for a set dwell period (typically 20 seconds). The nudging buzzer sounds and the door continues closing at reduced force and speed (per ASME A17.1 force limits) to recover door operation even if an obstruction remains.',
        ],
        keyPoints: [
          'CO doors open from center; 2SO doors open side with fast/slow panel pairing',
          'VVVF door operators ramp speed smoothly — gentle open and close impact',
          'Door dwell time is controller-adjustable for ADA compliance',
          'Nudging: reduced-force close activates after door held open too long (~20 s)',
        ],
        quiz: [
          {
            q: 'A VVVF-controlled door operator improves door performance primarily by:',
            a: [
              'Allowing doors to operate without a reopening device',
              'Accelerating and decelerating door panels smoothly to reduce impact and noise',
              'Eliminating the mechanical linkage between the operator and door panels',
              'Bypassing the interlock when nudging mode is active',
            ],
            correct: 1,
            exp: "Variable-speed door operators ramp motor speed electronically: fast in mid-travel, slow near open and closed positions. This reduces door slam, wear on rollers and guides, and noise — improving passenger experience and extending hardware life.",
          },
          {
            q: 'Nudging mode activates when:',
            a: [
              'The car is more than 3 inches out of level at a landing',
              'The emergency power supply is engaged',
              "A door reopening device has held the door open beyond the controller's dwell time limit",
              'The governor rope has been lifted by the overspeed device',
            ],
            correct: 2,
            exp: 'When the door reopening device (safety edge or light curtain) repeatedly prevents closing for longer than the programmed dwell period, the controller activates nudging: a reduced-force, reduced-speed close attempt with an audible buzzer. Force limits are specified in ASME A17.1.',
          },
        ],
      },
      {
        title: 'Door Interlocks — ASME A17.1 Section 2.12',
        body: [
          'Hoistway door interlocks are the single most safety-critical element of the elevator system. They prevent the elevator car from moving unless every hoistway door on every floor is mechanically and electrically locked. ASME A17.1 Section 2.12 defines interlock requirements: the locking member must engage mechanically before the electrical contact closes, and the door must be within 1/4 inch of the fully closed position for the circuit to complete.',
          'An interlock consists of a mechanical locking cam and an electrical contact wired in series with all other interlocks in the car door gate switch circuit. If any one door is not fully closed and locked, the control circuit is open and the car cannot move. This series-circuit architecture means a single failed interlock stops the entire elevator, forcing the fault to be identified.',
          'Car door gate switches confirm that the car door is closed before allowing car movement. They are wired in series with the hoistway door interlock string. Some designs allow the car to start with the car door slightly open (door-reopening bypass during leveling) but hoistway interlocks must always be satisfied before full-speed travel.',
          'Inspection (inspection operation) bypasses normal car and hall calls and limits speed to 150 fpm, but hoistway door interlocks still function on inspection operation. The interlock is not bypassed during any normal or inspection mode — only mechanical bypasses using a special tri-key tool (in compliance with ASME A17.1 Section 2.12.5) permit opening a landing door from outside the hoistway.',
        ],
        keyPoints: [
          'Interlock must be mechanically AND electrically engaged before car can move — ASME A17.1 Section 2.12',
          'All interlocks wired in series: one open circuit stops the elevator',
          'Car door gate switch in series with interlock string',
          'Inspection mode maintains interlock requirement; only tri-key bypass for landing access',
        ],
        quiz: [
          {
            q: 'Per ASME A17.1 Section 2.12, hoistway door interlocks must ensure the car cannot move unless all hoistway doors are:',
            a: [
              'Fully open and clear of the sill gap',
              'Electrically AND mechanically locked',
              'Connected to the door operator power supply',
              'Detected as closed by a photoelectric sensor',
            ],
            correct: 1,
            exp: 'ASME A17.1 Section 2.12 requires interlocks to be both electrically and mechanically engaged before car movement is permitted. The mechanical locking member physically prevents hoistway door opening from the landing side while providing the electrical contact that completes the control circuit.',
          },
          {
            q: 'Hoistway door interlocks are wired in series primarily so that:',
            a: [
              'All doors open simultaneously when the car arrives at a floor',
              'Any single unlatched or open door stops the elevator',
              'The car can move at reduced speed with one interlock bypassed',
              'The governor can detect interlock failure independently',
            ],
            correct: 1,
            exp: "Series wiring means the entire interlock circuit opens if any one door is unlatched. There is no partial credit — one unlatched hoistway door breaks the circuit and prevents all car movement, forcing the fault to be found and corrected.",
          },
        ],
      },
      {
        title: 'Traveling Cable & Hoistway Wiring',
        body: [
          'The traveling cable is the flexible multiconductor cable that connects the fixed building wiring (junction box in the hoistway) to the moving elevator car. It carries control signals, lighting power, communication circuits, and often Ethernet or CAT cabling for car cameras and IoT devices. The cable must travel the full height of the hoistway without fouling other equipment.',
          'Traveling cables are suspended from a hitch point at mid-hoistway and from the car sling. As the car moves, the cable forms a free-hanging loop below the suspension points. The loop must clear pit equipment (buffers, compensation sheaves) at the bottom of travel and not contact hoistway walls or other cables at the top.',
          'Cable specifications per ASME A17.1 require insulation rated for the voltage class of circuits carried, jacket material appropriate for the operating environment, and strain-relief provisions at both termination points. Abrasion of the cable jacket against hoistway steel is a common wear failure that must be caught on annual inspection.',
          'Communication circuits in the car include the emergency two-way phone (required by ASME A17.1 for all public elevators), intercom, and increasingly IP-based systems for door-to-cloud diagnostics. The car phone must operate on emergency power when building power is interrupted.',
        ],
        keyPoints: [
          'Traveling cable: flexible multiconductor from fixed hoistway junction to moving car',
          'Loop hangs free at mid-hoistway; must clear pit and walls through full travel',
          'Jacket abrasion is the most common wear failure — inspect annually',
          'Emergency two-way phone in car required by ASME A17.1, must work on emergency power',
        ],
        quiz: [
          {
            q: 'The traveling cable on an elevator connects the:',
            a: [
              'Governor to the car safety device',
              'Drive machine to the motor terminal box in the machine room',
              'Fixed hoistway junction box to the moving elevator car',
              'Counterweight to the hoist rope dead-end hitches',
            ],
            correct: 2,
            exp: 'Traveling cables carry control, lighting, and communication circuits between a fixed junction box in the hoistway wall and the moving car. They are flexible and form a free-hanging loop to accommodate the full range of car travel.',
          },
          {
            q: 'Per ASME A17.1, the emergency two-way phone inside an elevator car must:',
            a: [
              'Connect to the local fire department directly via dedicated phone line',
              'Operate on emergency power when normal building power is interrupted',
              'Be accessible only to elevator inspectors with a tri-key',
              'Dial only the building security desk and no other number',
            ],
            correct: 1,
            exp: 'ASME A17.1 requires the in-car emergency phone to function on emergency (standby) power so that entrapped passengers can communicate even during a power outage. The phone typically connects to a 24/7 monitoring center.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Relay logic elevator controllers sequence the ride cycle using:',
        a: [
          'Solid-state microprocessor boards and software logic',
          'Physical electromagnetic relays and contactors wired in ladder diagrams',
          'Programmable logic controllers loaded with IEC 61131-3 function blocks',
          'Fiber-optic serial bus connecting distributed I/O nodes',
        ],
        correct: 1,
        exp: 'Relay logic controllers use physical relays — each responsible for a specific step in the ride sequence. Technicians diagnose failures by tracing the ladder diagram schematic and testing individual relay contacts with a meter.',
      },
      {
        q: 'A microprocessor elevator controller provides which capability that relay logic cannot?',
        a: [
          'Mechanical interlock of hoistway doors',
          'Fault code logging with timestamps for remote diagnostics',
          'Series wiring of door gate switches',
          'Counterweight balance adjustment',
        ],
        correct: 1,
        exp: 'Microprocessor controllers store fault events with time and date stamps and transmit them over network connections to remote monitoring platforms. Relay logic provides no such logging; failures must be caught in person during a site visit.',
      },
      {
        q: 'VVVF door operator drives improve door performance by:',
        a: [
          'Eliminating the mechanical linkage to the door panels',
          'Bypassing door interlocks during the opening stroke',
          'Ramping motor speed to accelerate quickly then decelerate gently near open/close limits',
          'Increasing door open dwell time to 60 seconds automatically',
        ],
        correct: 2,
        exp: 'Variable-speed door operators ramp frequency and voltage to run doors fast in mid-travel and slow near the limits, reducing impact force on the sill, rollers, and gibs while lowering noise.',
      },
      {
        q: 'Nudging operation is triggered when:',
        a: [
          'The car is detected more than one inch from the floor sill',
          'A door reopening device holds the door open beyond the programmed dwell period',
          'The governor trips on overspeed',
          'Emergency power is activated',
        ],
        correct: 1,
        exp: 'When a reopening device (safety edge or light curtain) prevents the door from closing beyond the set time limit, nudging mode activates a reduced-speed, reduced-force closing cycle with an audible buzzer, per ASME A17.1 force limits.',
      },
      {
        q: 'ASME A17.1 Section 2.12 requires hoistway door interlocks to be what before the car may move?',
        a: [
          'Fully open and clear of the sill',
          'Connected to the emergency lighting circuit',
          'Electrically AND mechanically locked',
          'Within 1 inch of the fully open position',
        ],
        correct: 2,
        exp: "Interlocks must engage the mechanical locking cam first, then close the electrical contact. Both must be satisfied simultaneously — mechanical AND electrical — before the control circuit allows car movement.",
      },
      {
        q: 'If one hoistway door interlock is defective and fails to close its electrical contact, the result is:',
        a: [
          'The elevator runs at half speed only',
          'The elevator is stopped and cannot move on normal or inspection operation',
          'The defective floor is bypassed and other floors operate normally',
          'The governor immediately triggers the car safety',
        ],
        correct: 1,
        exp: "Interlocks are wired in series. One open contact breaks the entire interlock circuit, preventing car movement on all operating modes. The series architecture forces the fault to be identified and corrected rather than bypassed.",
      },
      {
        q: 'The traveling cable on an elevator forms a free-hanging loop in the hoistway primarily to:',
        a: [
          'Equalize tension between multiple hoist rope strands',
          'Absorb the rope stretch during high-speed travel',
          'Allow the cable to travel the full hoistway height without binding or fouling',
          'Provide strain relief at the car termination during earthquake events',
        ],
        correct: 2,
        exp: 'The free-hanging loop accommodates car travel from bottom to top of the hoistway. As the car moves, the loop repositions; the suspension point at mid-hoistway prevents the cable from dragging or wrapping around pit equipment.',
      },
      {
        q: 'The emergency two-way phone required in elevator cars by ASME A17.1 must operate:',
        a: [
          'Only on normal building AC power',
          'On emergency power when normal power is interrupted',
          'Via a cellular modem installed by the building owner',
          'Only during hours when the building is occupied',
        ],
        correct: 1,
        exp: 'ASME A17.1 mandates that the in-car emergency phone function during power outages on emergency (standby) power. This ensures entrapped passengers can communicate with a monitoring center even when the elevator is stopped due to a power failure.',
      },
      {
        q: 'In center-opening (CO) elevator doors, the panels:',
        a: [
          'Slide to the same side at equal speed',
          'Split from the center and retract to both sides simultaneously',
          'Swing outward on hinges from the centerline',
          'Slide in one direction at two different speeds (fast and slow panels)',
        ],
        correct: 1,
        exp: 'Center-opening doors have two panels that separate at the centerline and retract to opposite sides. This provides the widest net clear opening for a given door width and is standard in most passenger elevators.',
      },
      {
        q: 'Traveling cable jacket abrasion against hoistway steel is best identified during:',
        a: [
          'Governor tripping tests at contract speed',
          'Buffer compression tests in the pit',
          'Annual inspection by physically examining the cable through the full travel range',
          'Controller fault code review from the remote monitoring platform',
        ],
        correct: 2,
        exp: "Traveling cable abrasion occurs where the cable rubs against hoistway steel, brackets, or other cables through repeated travel. It is best found by running the car slowly through the full travel range while visually inspecting the cable jacket for wear marks, cuts, or exposed conductors.",
      },
    ],
  },
  {
    id: 'elev-safety',
    num: 13,
    title: 'Safety Devices & ASME A17.1 Codes',
    desc: 'Governors, car safeties, spring and oil buffers, pit safety equipment, and firefighter operation Phase I and Phase II',
    slides: [
      {
        title: 'Governor & Car Safety Device',
        body: [
          'The governor is a centrifugal speed-sensing device in the machine room (or hoistway for MRL). The governor rope connects to the car safety device through sheaves. As the car descends, the governor sheave spins proportionally. If the car exceeds the governor trip speed — set by ASME A17.1 at not less than 115 percent of contract speed — centrifugal force causes the flyweights to engage a latch, gripping the governor rope.',
          'When the governor rope is gripped, it can no longer move freely. As the car continues to descend, the rope activates the car safety mechanism mounted on the car frame. Car safeties use wedge, roller, or flexible-guide-clamp designs to apply clamping force against the guide rails, bringing the car to a stop.',
          'Instantaneous safeties are limited to cars with a contract speed of 150 fpm or less. They stop the car abruptly — acceptable at low speeds but dangerous at high speed due to high deceleration forces. At contract speeds above 150 fpm, gradual (progressive) safeties are required; they apply increasing clamping force progressively, limiting deceleration to levels safe for passengers.',
          'The car safety must be capable of stopping and holding 125 percent of the rated load at governor trip speed, per ASME A17.1. After any safety application, the elevator must be inspected by a qualified elevator mechanic before being returned to service. The governor must be reset manually and the safety device inspected for guide rail damage.',
        ],
        images: [
          { src: '/diagrams/governor-car-safety-device.svg', alt: 'Diagram of the governor-to-car-safety overspeed chain, comparing instantaneous safety devices limited to 150 fpm against gradual progressive safeties required above that speed, plus post-trip inspection requirements', caption: 'Governor sheave to car safety in four steps — instantaneous safeties only below 150 fpm, gradual safeties required above it.' },
        ],
        keyPoints: [
          'Governor trips at minimum 115% of contract speed per ASME A17.1',
          'Governor rope gripped, activates car safety on the guide rails',
          'Instantaneous safety: contract speed 150 fpm or less',
          'Gradual safety: required above 150 fpm to limit deceleration',
          'Car safety must hold 125% rated load at trip speed',
        ],
        quiz: [
          {
            q: 'Per ASME A17.1, the governor must trip and activate the car safety at a minimum overspeed of:',
            a: ['110% of contract speed', '115% of contract speed', '120% of contract speed', '125% of contract speed'],
            correct: 1,
            exp: 'ASME A17.1 requires the governor to trip at not less than 115% of contract speed. Setting it too low causes nuisance trips during normal operation; too high delays safety activation. The 115% minimum ensures safe activation before speed becomes catastrophic.',
          },
          {
            q: 'An instantaneous car safety device may only be used on elevators with a contract speed of:',
            a: ['200 fpm or less', '150 fpm or less', '100 fpm or less', '250 fpm or less'],
            correct: 1,
            exp: "Instantaneous safeties clamp abruptly. At 150 fpm or less, the deceleration forces are within human tolerance. Above 150 fpm, ASME A17.1 requires gradual (progressive) safeties that apply force progressively, limiting peak deceleration to safe levels for passengers and freight.",
          },
        ],
      },
      {
        title: 'Buffers: Spring vs Oil',
        body: [
          'Buffers absorb the kinetic energy of the car and counterweight at the extremes of travel. They are located in the pit below the car and below the counterweight travel path. A buffer engagement must bring the car or counterweight to a stop without causing structural damage to the car frame, guide rails, or pit.',
          'Spring buffers are energy-storage devices: they compress under load, store energy, and release it, potentially causing a rebound. ASME A17.1 limits spring buffers to contract speeds of 200 fpm or less. At higher speeds, the spring rebound could cause the car or counterweight to rebound back into the hoistway at unsafe velocity.',
          'Oil buffers (also called oil hydraulic buffers or energy-dissipating buffers) absorb kinetic energy as a metered oil-flow through an orifice inside a cylinder. The oil converts kinetic energy to heat; there is no rebound. Oil buffers are required for all contract speeds above 200 fpm. The buffer must be filled to the correct oil level; low oil reduces stroke and energy-absorption capacity.',
          'Buffer stroke is the distance the buffer compresses under load. ASME A17.1 specifies minimum stroke requirements based on contract speed. After any buffer engagement in service (not a test), the elevator must be inspected before return to service: the buffer must be re-stroked, oil level checked, and the guide rails and car frame inspected for damage.',
        ],
        keyPoints: [
          'Spring buffers: energy-storage type, limited to contract speeds 200 fpm or less',
          'Oil buffers: energy-dissipating (no rebound), required above 200 fpm',
          'Oil buffer: fill level is critical — low oil reduces stroke and energy capacity',
          'After any buffer engagement in service, full inspection required before return to service',
        ],
        quiz: [
          {
            q: 'Per ASME A17.1, oil buffers are required (rather than spring buffers) at contract speeds:',
            a: ['Above 100 fpm', 'Above 150 fpm', 'Above 200 fpm', 'Above 300 fpm'],
            correct: 2,
            exp: "Spring buffers can rebound the car back into the hoistway at elevated speeds. Above 200 fpm, that rebound velocity becomes dangerous. ASME A17.1 requires energy-dissipating (oil) buffers above 200 fpm to eliminate the rebound hazard entirely.",
          },
          {
            q: 'An oil buffer differs from a spring buffer primarily because it:',
            a: [
              'Is only required on counterweight travel, not car travel',
              'Absorbs kinetic energy as heat through oil flow, with no rebound',
              'Must be replaced after every safety activation',
              'Uses compressed gas rather than oil as the energy medium',
            ],
            correct: 1,
            exp: 'Oil buffers dissipate kinetic energy as heat via metered oil flow through orifices, leaving no stored spring energy to cause rebound. This is critical at higher speeds where spring rebound velocity would be unsafe.',
          },
        ],
      },
      {
        title: 'Pit Safety Equipment',
        body: [
          'The pit is the space below the lowest landing floor level that provides clearance for the car, buffer, and pit-mounted equipment when the car is at the bottom terminal. ASME A17.1 specifies minimum pit depth requirements based on car speed and buffer stroke. An undersized pit is a code violation requiring a waiver or equipment modification.',
          'Pit safety equipment required by ASME A17.1 includes: a stop switch accessible within 3 feet of the pit access door and within 7 feet of the pit floor, adequate permanent lighting (10 foot-candles minimum at pit floor level), a pit ladder for pit depths exceeding 3 feet, and a GFCI-protected duplex outlet for service equipment.',
          'Before entering a pit, the technician must activate the pit stop switch, confirm all cars are stopped, install a pit barrier or tag to prevent car movement, and verify there is no water or hazardous atmosphere. A second person should be present or aware of the pit entry in accordance with local confined-space procedures.',
          'Compensation ropes or chains connect the bottom of the car to the bottom of the counterweight on tall installations. They equalize rope weight as the car moves so that rope weight imbalance does not affect the load on the drive sheave. Compensation sheaves (if used) are mounted in the pit and must be properly tensioned.',
        ],
        keyPoints: [
          'Pit stop switch: within 3 feet of access door, within 7 feet of pit floor',
          'Pit ladder required for pit depth exceeding 3 feet',
          'Minimum lighting: 10 foot-candles at pit floor level',
          'Pre-entry: activate stop switch, confirm car stopped, install barrier, check for hazards',
        ],
        quiz: [
          {
            q: 'Per ASME A17.1, the pit stop switch must be located within what distance of the pit access door?',
            a: ['1 foot', '3 feet', '5 feet', '7 feet'],
            correct: 1,
            exp: 'ASME A17.1 requires the pit stop switch to be accessible within 3 feet of the pit access door so that a technician entering the pit can immediately stop all car movement before fully entering. The switch must also be within 7 feet of the pit floor.',
          },
          {
            q: 'A pit ladder is required by ASME A17.1 when the pit depth exceeds:',
            a: ['1 foot', '2 feet', '3 feet', '5 feet'],
            correct: 2,
            exp: 'When the pit depth exceeds 3 feet, ASME A17.1 requires a permanently mounted pit ladder to allow safe entry and exit. Shallower pits can be entered by stepping down, but deeper pits require a ladder for safe access.',
          },
        ],
      },
      {
        title: 'Firefighter Operation — Phase I & Phase II',
        body: [
          'Firefighter service (FFS) is a two-phase system mandated by ASME A17.1 for all elevators that travel 25 feet or more above the lowest level of fire department access. Phase I is lobby control: initiated by a key switch in the main lobby or by an automatic smoke detector signal, Phase I recalls all cars to the main or alternate landing and prevents any floor from calling the elevator.',
          "Phase I activation: all cars recall to the main landing (or alternate if smoke is detected at the main). Cars already traveling to a floor above the main reverse and return without stopping. Doors open at the main and remain open. The key switch must remain in the RECALL position to hold all cars at the main landing. Returning the key to the OFF or BYPASS position restores normal operation.",
          'Phase II is in-car firefighter operation, activated from a key switch inside the car. With Phase II active, the car responds only to car-operating panel (COP) commands; hall calls are ignored. Doors do not open automatically on arrival — the firefighter must hold the DOOR OPEN button. Doors do not close automatically; the firefighter must press and hold the DOOR CLOSE button.',
          'If the car doors encounter an obstruction during Phase II closing, the doors immediately reopen and remain open. This prevents a firefighter from being trapped by automatic door closing during rescue operations. Phase II is designed for fire department use only; building personnel should not use the elevator during a fire.',
        ],
        images: [
          { src: '/diagrams/firefighter-phase-1-2-operation.svg', alt: 'Diagram of Phase I lobby recall behavior and Phase II in-car firefighter operation, including the automatic door-reopen-on-obstruction safety behavior', caption: 'Phase I recalls every car to the lobby; Phase II hands manual control to the firefighter — with doors that always reopen on an obstruction.' },
        ],
        keyPoints: [
          'Phase I (lobby recall): key switch or smoke detector recalls all cars to main landing',
          'Phase I: cars traveling above main reverse; doors stay open at main landing',
          'Phase II (in-car): car responds only to COP; hall calls ignored; door open/close requires held button',
          'Phase II door obstacle: doors immediately reopen and stay open',
        ],
        quiz: [
          {
            q: 'Phase I firefighter operation is initiated by:',
            a: [
              'The car operating panel FIRE button pressed by the building engineer',
              'A key switch at the main landing or an automatic smoke detector signal',
              'Manual activation from the machine room controller',
              'The pit stop switch being placed in the STOP position',
            ],
            correct: 1,
            exp: 'Phase I is triggered by a key switch in the lobby (or alternate landing) or automatically by a smoke detector in the elevator lobby or elevator machine room. Either signal causes all cars to recall to the designated landing.',
          },
          {
            q: 'During Phase II firefighter operation, elevator doors:',
            a: [
              'Open and close automatically as on normal service',
              'Open automatically but must be held closed manually',
              'Do not open or close automatically — both require the firefighter to hold the respective button',
              'Are locked open throughout Phase II and cannot be closed',
            ],
            correct: 2,
            exp: "In Phase II, automatic door operation is disabled. The firefighter must hold the DOOR OPEN button to open doors and hold the DOOR CLOSE button to close them. If a door obstruction is detected during closing, doors immediately reopen and remain open, preventing entrapment.",
          },
        ],
      },
    ],
    test: [
      {
        q: 'The minimum governor trip speed per ASME A17.1 is set at what percentage of contract speed?',
        a: ['105%', '110%', '115%', '125%'],
        correct: 2,
        exp: 'ASME A17.1 requires the governor to trip at not less than 115% of contract speed. The governor rope is gripped at this speed, activating the car safety and stopping the car on the guide rails.',
      },
      {
        q: 'A gradual (progressive) car safety device is required at contract speeds above:',
        a: ['100 fpm', '150 fpm', '200 fpm', '250 fpm'],
        correct: 1,
        exp: 'Above 150 fpm, instantaneous safeties apply too much deceleration force for passenger safety. ASME A17.1 requires gradual safeties that apply clamping force progressively, limiting peak deceleration.',
      },
      {
        q: 'The car safety device must be capable of stopping and holding what percentage of rated load at governor trip speed?',
        a: ['100%', '110%', '125%', '150%'],
        correct: 2,
        exp: 'ASME A17.1 requires car safeties to stop and hold 125% of rated load at governor trip speed, providing an adequate safety margin beyond full capacity to account for worst-case conditions.',
      },
      {
        q: 'Spring buffers are limited to elevators with a contract speed of:',
        a: ['150 fpm or less', '200 fpm or less', '250 fpm or less', '300 fpm or less'],
        correct: 1,
        exp: 'Spring buffers store energy and rebound. Above 200 fpm, rebound velocity becomes hazardous. ASME A17.1 requires energy-dissipating oil buffers for all contract speeds above 200 fpm.',
      },
      {
        q: 'An oil buffer differs from a spring buffer because it:',
        a: [
          'Requires no inspection after engagement',
          'Absorbs kinetic energy as heat through metered oil flow with no rebound',
          'Can be used at any contract speed including below 200 fpm',
          'Operates only on the counterweight, not the car',
        ],
        correct: 1,
        exp: 'Oil buffers convert kinetic energy to heat via metered oil orifice flow. There is no stored spring energy to cause rebound, making them safe for high-speed elevators.',
      },
      {
        q: 'The pit stop switch must be located within what distance of the pit access door per ASME A17.1?',
        a: ['1 foot', '2 feet', '3 feet', '5 feet'],
        correct: 2,
        exp: 'The pit stop switch must be within 3 feet of the pit access door so that a technician can immediately stop car movement upon entering the pit, before fully stepping inside.',
      },
      {
        q: 'When Phase I firefighter recall is activated, cars that are traveling above the main landing:',
        a: [
          'Stop immediately at the next floor and wait for further instructions',
          'Continue to their original destination and then return to the main landing',
          'Reverse direction and return to the main landing without stopping at any intermediate floor',
          'Shut down in place and require manual reset from the machine room',
        ],
        correct: 2,
        exp: "When Phase I activates, all cars traveling above the main landing reverse immediately and return nonstop. This prevents cars from opening at floors above the fire where passengers could unknowingly board into a smoke-filled lobby.",
      },
      {
        q: 'During Phase II firefighter operation, hall calls are:',
        a: [
          'Answered by the next available car on normal service',
          'Ignored — the car responds only to car-operating panel commands',
          'Redirected to a secondary car on normal service',
          'Recorded and served after Phase II is cancelled',
        ],
        correct: 1,
        exp: 'Phase II gives the firefighter exclusive control via the car-operating panel. Hall calls are disabled to prevent civilians from inadvertently calling the elevator during fire operations.',
      },
      {
        q: 'After any oil buffer is engaged in service (not during a test), the required action is:',
        a: [
          'No action required if no damage is visible',
          'Replace the buffer immediately with a new unit',
          'Inspect the buffer, verify oil level, and inspect the car frame and guide rails before return to service',
          'Tag the elevator out of service for 24 hours for oil to re-settle',
        ],
        correct: 2,
        exp: 'After a buffer engagement, ASME A17.1 requires inspection of the buffer (oil level, re-stroke test), car frame, and guide rails before the elevator is returned to service. Any damage found must be repaired first.',
      },
      {
        q: 'During Phase II firefighter operation, if a door obstruction is detected while the doors are closing, the doors:',
        a: [
          'Continue closing at reduced nudging force',
          'Stop at the partially closed position until the obstruction is removed',
          'Immediately reopen and remain open',
          'Signal the machine room to override and force-close',
        ],
        correct: 2,
        exp: 'In Phase II, any door obstruction during closing causes the doors to immediately reverse and remain open. This protects firefighters from entrapment by automatic door operations during rescue, which is the reason Phase II requires manual hold on the DOOR CLOSE button.',
      },
    ],
  },
  {
    id: 'elev-hydraulic',
    num: 14,
    title: 'Hydraulic Elevator Systems',
    desc: 'Hydraulic power units, jack types, rupture valves, lowering control, and temperature compensation',
    slides: [
      {
        title: 'Hydraulic Power Unit & Pressure Systems',
        body: [
          'The hydraulic power unit (HPU) consists of a motor-pump assembly, oil reservoir, valve manifold (including the lowering valve and relief valve), and control panel. The pump is typically a gear or vane pump driven by a motor sized for the maximum load at contract speed. In submersible units, the motor and pump are submerged in the oil tank, which acts as a cooling and silencing medium.',
          "Working pressure in a hydraulic elevator system typically ranges from 300 to 700 PSI depending on car weight, load, and jack cylinder area. The relief valve is set above the maximum working pressure to prevent overpressure but is not intended to vent regularly — frequent relief valve blowing indicates the lowering valve or pump bypass is mis-adjusted.",
          'Above-ground power units place the motor and pump outside the oil reservoir and require external cooling of the motor. They occupy more floor space and can be noisier than submersible units, but they are more accessible for maintenance and avoid the environmental concerns of having electrical motors submerged in oil.',
          'Oil temperature affects hydraulic system performance significantly. Cold oil (below 60 degrees F) is too viscous: the pump cavitates, the elevator runs slowly or refuses to start, and valve spools stick. Hot oil (above 140 degrees F) loses viscosity: the pump slips internally and the car may creep down when halted. Temperature-compensating flow controls or oil heaters/coolers maintain fluid in the 70-120 degree F operating window.',
        ],
        keyPoints: [
          'HPU: motor-pump, oil tank, valve manifold, control panel',
          'Working pressure: 300-700 PSI typical; relief valve above working pressure',
          'Submersible: motor/pump in oil tank — quiet, compact but more complex maintenance',
          'Oil temperature: 70-120 degrees F operating window; cold = cavitation, hot = slippage',
        ],
        quiz: [
          {
            q: 'If the relief valve on a hydraulic elevator blows frequently during normal operation, the most likely cause is:',
            a: [
              'Correct system operation — relief valves are designed to open regularly',
              'Mis-adjusted lowering valve or pump bypass allowing overpressure build-up',
              'The pump motor is running in reverse direction',
              'The oil tank is overfilled above the maximum level',
            ],
            correct: 1,
            exp: 'Relief valves should open only in a true overpressure event. Frequent opening indicates the lowering valve, pump bypass, or pump itself is not properly regulating pressure, causing the system to reach relief valve setpoint during normal raising. This requires valve adjustment or repair.',
          },
          {
            q: 'Oil temperature below 60 degrees F in a hydraulic elevator causes:',
            a: [
              'Oil becomes too thin, causing excessive pump slippage',
              'Oil becomes too viscous, causing pump cavitation and sluggish operation',
              'The relief valve setpoint drops below working pressure',
              'The car to drift upward due to thermal expansion of the oil',
            ],
            correct: 1,
            exp: "Cold oil is highly viscous. The pump struggles to draw thick oil, cavitates (forming vapor bubbles that collapse and damage pump components), and cannot develop rated flow. The elevator may start slowly, refuse to start, or fault out. Oil heaters or allowing the machine room to warm resolve this.",
          },
        ],
      },
      {
        title: 'Jack Types: Holeless, Telescoping & Single-Stage',
        body: [
          'Single-stage (in-ground) cylinders consist of one cylinder pipe and one plunger extending from it. The cylinder is drilled into the ground in the elevator pit, typically to a depth equal to the rise of the elevator. The plunger extends above the pit floor to support the car. Drilling the casing requires soil boring, and the casing must be sealed against groundwater intrusion. This design is limited to where subsurface drilling is practical.',
          'Telescoping cylinders use two or three concentric tubes that extend sequentially, reducing the overall pit depth required. Each stage extends from inside the previous one. Multi-stage cylinders provide a longer travel in a shorter pit depth than single-stage, but the seals between stages are more complex and require more maintenance attention.',
          'Holeless jack systems eliminate the below-ground cylinder entirely by mounting the hydraulic jack above ground — typically at one or both sides of the car in a J-shaped or inverted U-shaped configuration. The jacks push against the car sling through a spreader beam. Holeless designs are required in locations with high water tables, bedrock, or environmental restrictions on subsurface drilling.',
          'Roped hydraulic systems combine a hydraulic jack with rope and sheave assemblies to multiply the jack travel. The jack extends a short distance; the roping system multiplies this into a longer car travel. This allows a shorter cylinder and pit while achieving multiple-story travel.',
        ],
        keyPoints: [
          'Single-stage: one cylinder drilled in ground, equal depth to elevator rise',
          'Telescoping: nested tubes extend sequentially, shorter pit depth for given rise',
          'Holeless: above-ground jack, no subsurface drilling — required with high water table or bedrock',
          'Roped hydraulic: jack + sheaves multiply travel, shorter cylinder needed',
        ],
        quiz: [
          {
            q: 'A holeless hydraulic elevator is specified primarily when:',
            a: [
              'The building has more than six floors of travel',
              'Subsurface drilling is impractical due to high water table, bedrock, or environmental restrictions',
              'The machine room is located in the sub-basement',
              'The contract speed exceeds 200 fpm',
            ],
            correct: 1,
            exp: 'Holeless jacks mount above ground at the car sling, eliminating the need for a subsurface cylinder casing. They are specified when drilling is not feasible: high groundwater, bedrock, environmental regulations, or existing utility conflicts below the pit.',
          },
          {
            q: 'A telescoping hydraulic cylinder provides what advantage over a single-stage cylinder?',
            a: [
              'Higher maximum working pressure for heavy loads',
              'Longer travel distance with a shorter required cylinder (pit) depth',
              'Elimination of pit stop switch requirements',
              'Compatibility with VVVF drive controls',
            ],
            correct: 1,
            exp: 'Telescoping cylinders use concentric tubes that extend sequentially. A three-stage cylinder can achieve travel two or three times the collapsed cylinder length, allowing a shorter pit depth than a single-stage cylinder for the same floor-to-floor rise.',
          },
        ],
      },
      {
        title: 'Rupture Valve & Lowering Control',
        body: [
          'The rupture valve (also called an uncontrolled-lowering device or velocity fuse) is a safety device mounted at the base of the jack cylinder. It is normally open, allowing oil to flow freely in both directions for normal raising and lowering. If the hydraulic line ruptures or a fitting fails causing oil to flow at a rate significantly faster than normal lowering speed, the rupture valve automatically closes, preventing the car from descending uncontrolled.',
          'ASME A17.1 requires the rupture valve to close automatically when the rate of oil flow exceeds the normal contract lowering speed by approximately 0.3 m/s (approximately 60 fpm above the rated lowering speed). Once closed, the car is safely held in place until the fault is corrected and the valve is manually reset.',
          'The lowering valve controls the rate of car descent during normal operation. It is an electrically operated proportional valve that meters oil flow from the jack cylinder back to the tank. Precise flow control provides smooth deceleration and leveling at each floor. The lowering valve also serves as a holding valve when the car is stationary, preventing drift from load-induced pressure.',
          'Floor leveling accuracy in hydraulic elevators is achieved by the lowering valve metering oil flow in small increments as the car approaches the floor sill. Temperature-compensated flow controls are used in climates with wide temperature swings because oil viscosity changes with temperature affect the flow-versus-valve-position relationship. Automatic temperature compensation adjusts valve opening based on oil temperature feedback.',
        ],
        images: [
          { src: '/diagrams/hydraulic-rupture-lowering-valves.svg', alt: 'Diagram comparing the rupture valve velocity-fuse safety function against the lowering valve normal descent-control function, plus temperature compensation for oil viscosity', caption: 'The rupture valve protects against a catastrophic line failure; the lowering valve handles every normal descent and floor leveling.' },
        ],
        keyPoints: [
          'Rupture valve: normally open; closes automatically when flow exceeds rated lowering speed by ~0.3 m/s',
          'Rupture valve must be manually reset after activation',
          'Lowering valve: proportional control of descent rate and floor leveling',
          'Temperature compensation adjusts lowering valve for oil viscosity changes',
        ],
        quiz: [
          {
            q: 'The rupture valve on a hydraulic elevator automatically closes when:',
            a: [
              'The pressure exceeds the relief valve setpoint',
              'The oil temperature drops below 60 degrees F',
              "Oil flow rate exceeds the rated lowering speed by approximately 0.3 m/s",
              'The pit stop switch is placed in the STOP position',
            ],
            correct: 2,
            exp: 'The rupture valve is a velocity fuse that responds to abnormal flow rate, not pressure. If a hydraulic line ruptures, oil flows far faster than normal lowering; the rupture valve detects this and closes automatically to prevent uncontrolled descent.',
          },
          {
            q: 'The primary function of the lowering valve in a hydraulic elevator is to:',
            a: [
              'Prevent oil from entering the cylinder during descent',
              'Meter oil flow from the jack cylinder to the tank to control descent rate and floor leveling',
              'Open the relief valve when overpressure is detected',
              'Control the pump motor speed during ascent',
            ],
            correct: 1,
            exp: 'The lowering valve is a proportional control valve that regulates oil flow from the cylinder back to the tank during descent. Precise metering provides smooth speed control, accurate floor leveling, and holds the car stationary when closed.',
          },
        ],
      },
      {
        title: 'Hydraulic Seal Maintenance & Environmental Compliance',
        body: [
          'Hydraulic cylinder seals prevent oil from leaking around the plunger or piston. Seal wear is the most common hydraulic elevator maintenance item: worn seals cause the car to creep down from a stationary position as oil bypasses the seal and returns to the tank. ASME A17.1 limits downward drift to 3 inches in any 15-minute period; drift beyond this requires the elevator to be taken out of service.',
          'Seal replacement on in-ground cylinders requires partially disassembling the jack head, removing the old seal assembly, and installing new seals. On single-stage cylinders the plunger must be pulled out of the cylinder — a specialized operation requiring proper equipment. Seal replacement intervals depend on oil cleanliness, plunger surface condition, and operating temperature.',
          'Oil cleanliness directly affects seal and pump life. Contaminated hydraulic oil introduces particles that score the plunger surface and cut the seal lip. Oil sampling and analysis programs monitor particle contamination (ISO 4406 cleanliness codes) and water content. Replacing oil at recommended intervals and using inline filtration extends seal and pump service life significantly.',
          'Environmental regulations in many states require biodegradable or vegetable-based hydraulic oils in hydraulic elevators due to the risk of in-ground cylinder corrosion, pinhole leaks, and soil contamination. Biodegradable oils must be matched to the seals and pump specifications; not all biodegradable fluids are compatible with all hydraulic elevator equipment.',
        ],
        keyPoints: [
          'Seal wear causes car to creep down; ASME A17.1 limit is 3 inches in 15 minutes',
          'Drift beyond 3 inches per 15 minutes: elevator must be taken out of service',
          'Oil cleanliness per ISO 4406 directly affects seal and pump life',
          'Many jurisdictions require biodegradable hydraulic fluid for environmental compliance',
        ],
        quiz: [
          {
            q: 'Per ASME A17.1, hydraulic elevator downward drift from a stationary position is limited to:',
            a: ['1 inch in 5 minutes', '3 inches in 15 minutes', '6 inches in 30 minutes', '1 inch in 1 minute'],
            correct: 1,
            exp: 'ASME A17.1 specifies a maximum allowable drift of 3 inches in any 15-minute period. Drift exceeding this limit indicates seal wear or valve leakage requiring the elevator to be pulled from service until repaired.',
          },
          {
            q: 'Using ISO 4406 cleanliness codes to monitor hydraulic elevator oil primarily helps predict:',
            a: [
              'When the motor requires rewinding',
              'Whether the oil temperature compensation is calibrated correctly',
              'Seal and pump wear life based on particle contamination levels',
              'The required relief valve setpoint adjustment',
            ],
            correct: 2,
            exp: 'ISO 4406 assigns cleanliness codes based on particle counts per milliliter at three size thresholds. Higher particle counts accelerate scoring of the plunger surface and seal lip wear, and increase pump wear. Regular oil analysis allows proactive changes before damage occurs.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'The hydraulic elevator power unit (HPU) components include all of the following EXCEPT:',
        a: ['Motor-pump assembly', 'Oil reservoir', 'Governor and car safety', 'Valve manifold'],
        correct: 2,
        exp: "The HPU contains the motor, pump, oil tank, and valve assembly. The governor and car safety are separate safety devices on the car frame and in the hoistway — they are not part of the hydraulic power unit.",
      },
      {
        q: 'A hydraulic elevator relief valve blowing frequently during normal operation most likely indicates:',
        a: [
          'Normal system operation within design parameters',
          'A mis-adjusted lowering valve or pump bypass causing overpressure',
          'Low oil level in the reservoir requiring refilling',
          'A failed pit stop switch preventing normal circuit operation',
        ],
        correct: 1,
        exp: 'Relief valves are safety devices that should blow only in abnormal overpressure. Regular blowing indicates the system is reaching overpressure during normal operation due to valve mis-adjustment or pump bypass failure.',
      },
      {
        q: 'Hydraulic oil operating temperature should generally be maintained between:',
        a: ['40-80 degrees F', '70-120 degrees F', '100-160 degrees F', '120-180 degrees F'],
        correct: 1,
        exp: 'Below 70 degrees F, oil is too viscous — the pump cavitates and the elevator operates sluggishly. Above 120 degrees F, oil thins excessively, causing pump slippage and potential valve seal degradation.',
      },
      {
        q: 'A holeless hydraulic jack system eliminates the need for:',
        a: [
          'A pit stop switch and emergency lighting',
          'Subsurface drilling for the cylinder casing',
          'An oil reservoir and pump motor',
          'A lowering valve and rupture valve',
        ],
        correct: 1,
        exp: 'Holeless jacks are mounted above the pit floor, pushing the car sling from the side through a spreader beam. No cylinder casing needs to be drilled below the pit, making them suitable for sites with high water tables, bedrock, or environmental restrictions.',
      },
      {
        q: 'A telescoping hydraulic cylinder provides what advantage over a single-stage cylinder?',
        a: [
          'Higher operating pressure for heavier car loads',
          'Faster contract speed capability',
          'Longer travel distance with a shorter required cylinder depth',
          'Compatibility with MRL machine-room requirements',
        ],
        correct: 2,
        exp: 'Concentric telescoping stages allow the total extended length to be a multiple of the collapsed cylinder length, reducing the pit depth required for a given floor rise.',
      },
      {
        q: 'The rupture valve closes automatically when oil flow exceeds rated lowering speed by approximately:',
        a: ['0.1 m/s', '0.3 m/s', '0.5 m/s', '1.0 m/s'],
        correct: 1,
        exp: 'ASME A17.1 requires the rupture valve to close when descent rate exceeds rated lowering speed by approximately 0.3 m/s. This velocity difference indicates a hydraulic line failure rather than normal operation, triggering the safety closure.',
      },
      {
        q: 'After a rupture valve activates and holds the car in place, the required corrective action is:',
        a: [
          'The valve automatically resets when pressure equalizes — no action needed',
          'The valve must be manually reset after the fault is identified and corrected',
          'Replace the rupture valve immediately before returning to service',
          'Lower the car manually using the emergency lowering valve and restart normally',
        ],
        correct: 1,
        exp: 'Rupture valves are designed to require manual reset after activation. This ensures a qualified technician inspects the hydraulic system, identifies the cause of the abnormal flow rate, and corrects it before the elevator returns to service.',
      },
      {
        q: 'Hydraulic elevator downward drift per ASME A17.1 must not exceed:',
        a: ['1 inch per 5 minutes', '3 inches per 15 minutes', '5 inches per 30 minutes', '2 inches per 10 minutes'],
        correct: 1,
        exp: 'ASME A17.1 requires the elevator to be removed from service when drift exceeds 3 inches in any 15-minute period. This indicates seal or valve leakage allowing oil to bypass from the jack cylinder to the tank.',
      },
      {
        q: 'ISO 4406 cleanliness codes in hydraulic elevator oil sampling measure:',
        a: [
          'Oil viscosity at operating temperature',
          'Water content percentage by weight',
          'Particle contamination counts per milliliter at defined size thresholds',
          'Acid number indicating oil oxidation level',
        ],
        correct: 2,
        exp: 'ISO 4406 assigns a three-number cleanliness code based on particle counts per milliliter at three size thresholds (typically 4, 6, and 14 microns). Higher code numbers mean more particles, predicting faster seal and pump wear.',
      },
      {
        q: 'The lowering valve in a hydraulic elevator also serves what secondary function when the car is stationary?',
        a: [
          'Providing backup governor overspeed detection',
          'Energizing the motor for emergency ascent on backup power',
          'Acting as a holding valve to prevent drift from load-induced pressure',
          'Controlling the door operator speed during floor leveling',
        ],
        correct: 2,
        exp: 'When the car is stationary at a floor, the lowering valve is closed. It holds oil in the cylinder against the load-induced pressure from the car weight, preventing drift. A worn or leaking lowering valve allows slow drift toward the bottom terminal.',
      },
    ],
  },
  {
    id: 'elev-maintenance',
    num: 15,
    title: 'Preventive Maintenance & Troubleshooting',
    desc: 'Hoist rope inspection, lubrication schedules, door adjustment, vibration analysis, and systematic fault diagnosis',
    slides: [
      {
        title: 'Hoist Rope Inspection & Replacement Criteria',
        body: [
          'Hoist ropes are the most life-safety-critical consumable on a traction elevator. ASME A17.1 specifies rope retirement criteria based on wire breaks per lay length (one complete twist of the outer strands). For 6x19 classification ropes (6 strands, 19 wires per strand), the rope must be retired if 6 or more wires are broken in one lay length, or 3 or more in any single strand.',
          'Beyond wire breaks, ropes must be retired if their diameter has decreased more than 10 percent from original, if there is visible kinking, bird-caging, waviness, or core protrusion, or if corrosion has penetrated beyond the surface wires. Broken wires near rope terminations indicate fatigue from repeated bending over sheaves and require rope end inspection.',
          'Wire rope safety factor for passenger elevator hoist ropes is a minimum of 8:1 per ASME A17.1: the breaking strength of the rope must be at least 8 times the maximum tension it will experience. At this factor, normal service wear is monitored by the wire break criteria before the rope approaches any structural limit.',
          'Rope lubrication is required to reduce fretting wear between wires and between rope and sheave. Factory-applied rope lubricant depletes over time. Periodic re-lubrication per the rope manufacturer specification maintains wire flexibility and corrosion resistance. Excessive lubricant pickup on car interior or pit equipment indicates over-lubrication.',
        ],
        keyPoints: [
          '6x19 rope: retire at 6 broken wires per lay, or 3 in one strand',
          'Also retire: diameter reduced >10%, kinking, bird-caging, core protrusion, deep corrosion',
          'Minimum safety factor 8:1 (breaking strength / max tension)',
          'Re-lubricate rope per manufacturer schedule to prevent fretting wear',
        ],
        quiz: [
          {
            q: 'For a 6x19 classification hoist rope, ASME A17.1 requires rope retirement when the broken wire count in one lay length reaches:',
            a: ['3 broken wires', '6 broken wires', '12 broken wires', '18 broken wires'],
            correct: 1,
            exp: 'ASME A17.1 requires retirement of 6x19 ropes when 6 or more wires are broken in one lay length (one full twist of the rope strands), or 3 or more in a single strand. These thresholds indicate the rope has reached end-of-life before structural integrity is compromised.',
          },
          {
            q: 'The minimum wire rope safety factor for passenger elevator hoist ropes per ASME A17.1 is:',
            a: ['5:1', '6:1', '8:1', '10:1'],
            correct: 2,
            exp: 'ASME A17.1 requires a minimum 8:1 safety factor for passenger elevator hoist ropes. This means the rope breaking strength must be at least 8 times the maximum load it carries in service, providing a substantial margin before approaching structural failure.',
          },
        ],
      },
      {
        title: 'Lubrication: Guide Rails, Sheaves & Governor',
        body: [
          'Guide rails require lubrication to allow the guide shoes or roller guides on the car and counterweight to travel smoothly. Slide shoes (nylon or Teflon) on low-speed elevators have self-lubricating properties but benefit from periodic application of a light rail oil. Roller guides on high-speed elevators require clean rails; excessive oil accumulation on roller guides attracts dirt and causes vibration.',
          'Guide rail lubricators are automatic devices mounted on the car or counterweight frame that apply a metered amount of oil to the rail face as the car travels. The lubricator reservoir must be refilled periodically; an empty lubricator causes accelerated shoe wear and increased operating noise.',
          'Drive sheave grooves wear over time as rope contact pressure erodes the groove profile. ASME A17.1 specifies maximum groove wear depth and profile change limits. Undercut sheave grooves (where the rope bottom contacts the groove floor) reduce rope-to-sheave grip and must be re-cut or the sheave replaced. Uneven groove wear across all sheave grooves indicates misaligned roping.',
          'The governor rope requires periodic inspection for kinks or broken wires and is typically replaced on the same schedule as hoist ropes. The governor itself requires periodic cleaning of centrifugal flyweights and testing of the trip speed to verify compliance with ASME A17.1 trip speed requirements at each annual inspection.',
        ],
        keyPoints: [
          'Slide shoes: light rail oil; roller guides: clean rails critical — excess oil attracts dirt',
          'Automatic lubricators: must refill reservoir; empty lubricator accelerates shoe wear',
          'Undercut sheave grooves: must be re-cut or replaced to restore grip',
          'Governor: annual trip speed verification required by ASME A17.1',
        ],
        quiz: [
          {
            q: 'What is the risk of excessive oil accumulation on roller guide elevator guide rails?',
            a: [
              'Excessive traction between rope and drive sheave',
              'Dirt and contamination collection causing increased vibration during travel',
              'Guide rail corrosion requiring premature replacement',
              'Interlock circuit shorting due to oil bridging electrical contacts',
            ],
            correct: 1,
            exp: "Roller guides require clean rails to run smoothly. Excess oil is a magnet for dirt, metal particles, and debris from the hoistway. Contaminated roller surfaces cause vibration, noise, and uneven rail contact, degrading ride quality and accelerating roller bearing wear.",
          },
          {
            q: 'Undercut drive sheave grooves (where the rope contacts the groove floor) must be corrected because they:',
            a: [
              'Increase rope bending radius, reducing fatigue life',
              'Reduce rope-to-sheave traction grip, risking rope slippage',
              'Cause the counterweight to contact the governor rope',
              'Prevent proper seating of rope termination shackles',
            ],
            correct: 1,
            exp: "Sheave grooves provide traction by contact between the rope sides and groove walls. When the groove wears down to where the rope sits on the floor rather than the walls, side contact is lost and traction drops significantly. This can allow rope slippage on the sheave under heavy load.",
          },
        ],
      },
      {
        title: 'Door Adjustment & Reopening Device Maintenance',
        body: [
          'Door sills, gibs, and tracks must be kept clean and aligned. Door panels hang from rollers running in an overhead track; worn rollers cause door panels to bounce, run unevenly, or bind. Roller replacement is one of the most frequent door maintenance items in high-traffic commercial elevators where doors cycle thousands of times per day.',
          'The reopening device (safety edge or light curtain) prevents the door from closing on a passenger or object. Mechanical safety edges use a spring-loaded strip on the leading door edge; contact reverses the door. Light curtains project an array of infrared beams across the door opening; breaking any beam reverses the door. Light curtain alignment and cleanliness of emitter/receiver lenses requires periodic inspection.',
          'Door closing force and kinetic energy are limited by ASME A17.1. The maximum kinetic energy of the closing door panel(s) at the point of contact with the reopening device is 2.5 foot-pounds. Door speed and mass determine kinetic energy; if heavier door panels are installed during modernization, door speed must be reduced to maintain compliance.',
          'Hoistway entrances (landing doors) are also subject to door gap limits: the gap between the door panel and the door sill, between panels, and between a panel and the jamb must not exceed 3/8 inch per ASME A17.1. Larger gaps create a hazard for small fingers or objects to contact the hoistway. Worn gibs and bent panels are common causes of excessive gap.',
        ],
        keyPoints: [
          'Door rollers: frequent replacement item in high-traffic elevators — worn rollers cause uneven travel',
          'Light curtain maintenance: lens cleanliness and alignment are critical for reliable reopening',
          'Max door closing kinetic energy: 2.5 foot-pounds at point of contact',
          'Door gap limit: 3/8 inch maximum between panel and sill, jamb, or adjacent panels',
        ],
        quiz: [
          {
            q: 'The maximum closing kinetic energy of elevator door panels at the point of reopening device contact per ASME A17.1 is:',
            a: ['1.0 foot-pound', '2.5 foot-pounds', '5.0 foot-pounds', '7.5 foot-pounds'],
            correct: 1,
            exp: 'ASME A17.1 limits door panel closing kinetic energy to 2.5 foot-pounds at the contact point. This is the threshold that prevents the door from striking a passenger with enough force to cause injury. Speed-times-mass determines kinetic energy; heavier panels require slower closing speed.',
          },
          {
            q: 'The maximum gap permitted between an elevator door panel and the door sill or jamb per ASME A17.1 is:',
            a: ['1/4 inch', '3/8 inch', '1/2 inch', '3/4 inch'],
            correct: 1,
            exp: 'ASME A17.1 limits all door panel clearances (panel-to-sill, panel-to-panel, and panel-to-jamb) to a maximum of 3/8 inch to prevent entrapment of fingers, objects, or clothing in the gap between the moving panel and stationary surfaces.',
          },
        ],
      },
      {
        title: 'Systematic Troubleshooting & Vibration Analysis',
        body: [
          'Systematic elevator troubleshooting follows a logical path: confirm the symptom, identify which system (electrical, mechanical, hydraulic) is involved, isolate the faulty component, and correct and verify. Most elevator complaints fall into categories: doors (most frequent), leveling, ride quality, noise, and no-movement faults. Starting with the simplest explanation before invasive diagnostics saves time.',
          'Vibration analysis is used to identify mechanical defects in rotating components: drive sheave bearings, motor bearings, gearbox, and governor. A handheld vibration meter or laser tachometer identifies components operating with abnormal vibration amplitude or at unexpected frequencies. ISO 10816 zone limits (for machine vibration measured on bearings) provide thresholds for warning and danger levels.',
          'Leveling faults (car stopping above or below the sill) on traction elevators are typically caused by: faulty leveling sensors (inductive proximity or encoder-based), worn floor selector tapes or selector switches, controller parameter mis-adjustment, or rope slip. Hydraulic leveling faults relate to lowering valve response, oil temperature, or temperature compensation calibration.',
          'Microprocessor controller fault codes are the starting point for no-movement diagnostics. The controller stores the most recent fault events with timestamps. Common fault code families include: door faults (interlock or gate switch open), safety chain faults (safety contact open), drive faults (VVVF drive overcurrent or communication failure), and encoder faults (position feedback loss).',
        ],
        keyPoints: [
          'Symptom-to-system-to-component: logical troubleshooting path',
          'Doors are the most frequent source of elevator service calls',
          'ISO 10816 zone limits: warning and danger thresholds for rotating component vibration',
          'Controller fault codes: always check before invasive diagnostics; timestamps show fault sequence',
        ],
        quiz: [
          {
            q: 'The most frequent source of elevator service calls across all elevator types is:',
            a: ['Motor and drive failures', 'Door system faults', 'Rope and sheave wear', 'Governor and safety device failures'],
            correct: 1,
            exp: 'Door system faults — interlock failures, door operator problems, worn rollers, misaligned light curtains, and reopening device issues — account for the majority of elevator service calls in both residential and commercial applications.',
          },
          {
            q: 'ISO 10816 vibration zone limits are used in elevator maintenance primarily to:',
            a: [
              'Set the governor trip speed calibration',
              'Determine when hoist ropes must be replaced',
              'Identify warning and danger thresholds for rotating component vibration',
              'Calibrate door closing force measurements',
            ],
            correct: 2,
            exp: 'ISO 10816 provides zone classifications (A=new machinery, B=acceptable long-term, C=warning/investigate, D=danger) for vibration amplitude measured on bearings. Elevator technicians use these limits to schedule bearing and gearbox maintenance before catastrophic failure.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'For a 6x19 hoist rope, ASME A17.1 requires retirement when broken wires in one lay length reach:',
        a: ['3 broken wires', '6 broken wires', '10 broken wires', '12 broken wires'],
        correct: 1,
        exp: '6x19 ropes must be retired at 6 broken wires in one lay, or 3 in any single strand. These thresholds represent end-of-life before the structural safety factor is compromised.',
      },
      {
        q: 'Elevator hoist rope minimum safety factor per ASME A17.1 is:',
        a: ['5:1', '6:1', '8:1', '12:1'],
        correct: 2,
        exp: 'Passenger elevator hoist ropes require a minimum 8:1 safety factor — breaking strength divided by maximum load in service. This ensures substantial margin above operational loads.',
      },
      {
        q: 'Worn elevator door rollers most commonly cause:',
        a: [
          'Door interlock electrical contact failure',
          'Uneven or bouncing door panel travel',
          'Reduced door closing kinetic energy below ASME A17.1 limits',
          'Car leveling errors at each floor',
        ],
        correct: 1,
        exp: 'Door rollers support the panel weight and guide travel in the overhead track. Worn or flat-spotted rollers cause uneven travel, bouncing, noise, and increased door motor load, and can eventually allow the panel to fall off the track.',
      },
      {
        q: 'The maximum closing kinetic energy of elevator door panels at the contact point is limited by ASME A17.1 to:',
        a: ['1.0 foot-pound', '2.5 foot-pounds', '5.0 foot-pounds', '10 foot-pounds'],
        correct: 1,
        exp: 'ASME A17.1 limits door closing kinetic energy to 2.5 foot-pounds to prevent injury from door impact. When heavier panels are installed during modernization, closing speed must be reduced proportionally.',
      },
      {
        q: 'Light curtain effectiveness on elevator doors depends most critically on:',
        a: [
          'Calibrating the nudging dwell time parameter',
          'Lens cleanliness and optical alignment of emitters and receivers',
          'Setting door open time to a minimum of 5 seconds',
          'Adjusting door panel gap to exactly 1/4 inch',
        ],
        correct: 1,
        exp: 'Light curtains project infrared beams across the door opening. Dirty or misaligned lenses cause beam interruption or failure to detect obstructions. Regular cleaning and alignment verification are essential maintenance items.',
      },
      {
        q: 'Undercut drive sheave grooves are a problem because they:',
        a: [
          'Increase rope diameter stress from excessive groove depth',
          'Allow the rope to contact the groove floor, losing traction grip',
          'Cause the counterweight to overtravel the upper buffer',
          'Reduce motor speed due to increased friction',
        ],
        correct: 1,
        exp: 'Traction depends on the rope sides contacting the groove walls. When grooves wear to the point where the rope bottom contacts the groove floor, side-wall contact is lost and traction is reduced, increasing rope slip risk under heavy load.',
      },
      {
        q: 'Elevator leveling faults on a traction elevator (car stopping above or below the sill) are most commonly traced to:',
        a: [
          'Incorrect counterweight loading',
          'Faulty leveling sensors, selector tapes, controller parameters, or rope slip',
          'Excessive guide rail lubrication',
          'Motor bearing vibration exceeding ISO 10816 Zone B limits',
        ],
        correct: 1,
        exp: 'Leveling accuracy depends on the leveling sensor detecting the floor target, the floor selector knowing the car position, and the controller stopping the car precisely. Worn selector tapes, dirty sensors, rope creep, and mis-adjusted parameters all cause leveling errors.',
      },
      {
        q: 'Maximum door panel gap between a panel and the sill or jamb per ASME A17.1 is:',
        a: ['1/4 inch', '3/8 inch', '1/2 inch', '3/4 inch'],
        correct: 1,
        exp: 'ASME A17.1 limits all panel clearances to 3/8 inch to prevent entrapment of fingers, clothing, or objects between the moving panel and fixed surfaces. Gaps larger than 3/8 inch require adjustment or hardware replacement.',
      },
      {
        q: 'ISO 10816 is referenced in elevator maintenance to assess vibration in:',
        a: [
          'Hoist rope wire break count per lay length',
          'Car safety device clamping force',
          'Rotating components such as drive machine and gearbox bearings',
          'Door operator motor current draw',
        ],
        correct: 2,
        exp: 'ISO 10816 provides zone classifications for machine vibration measured on bearing housings. Elevator technicians use these thresholds to schedule maintenance on drive machines, gearboxes, and governors before vibration-induced bearing failure causes an outage.',
      },
      {
        q: 'When troubleshooting a no-movement fault on a microprocessor-controlled elevator, the recommended first step is:',
        a: [
          'Replace the main controller board',
          'Check the drive sheave for rope slippage',
          'Review controller fault codes and timestamps stored in the event log',
          'Test the hoist rope safety factor with a dynamometer',
        ],
        correct: 2,
        exp: 'Microprocessor controllers store fault events with timestamps. Reading the fault log identifies the fault category (door, safety chain, drive, encoder) and the sequence of events leading to the no-movement condition, directing the technician to the correct system before any invasive diagnostics.',
      },
    ],
  },
  {
    id: 'elev-career',
    num: 16,
    title: 'Inspections, Modernization & Elevator Career',
    desc: 'ASME A17.3 for existing elevators, QEI credential, periodic inspections, modernization scope, and NEIEP/IUEC career pathways',
    slides: [
      {
        title: 'ASME A17.3 & Inspections of Existing Elevators',
        body: [
          'ASME A17.1 governs new elevator installations. ASME A17.3 (Safety Code for Existing Elevators and Escalators) establishes the requirements for continued safe operation, inspection, testing, and alteration of elevators already in service. Jurisdictions adopt A17.3 through their building codes to ensure older elevators meet minimum ongoing safety standards even if they predate the current edition of A17.1.',
          'Periodic inspections under ASME A17.3 are required at intervals set by local jurisdiction — typically annual. The inspector verifies that the elevator continues to meet the applicable code edition under which it was installed, and additionally flags any features that present an unsafe condition regardless of the original code. Safety-critical items found defective result in the elevator being placed out of service.',
          'Category tests required by ASME A17.3 include annual Category 1 tests (no-load and full-load operational tests, safety device checks, door interlock tests) and five-year Category 5 tests (full-load safety device test with the governor tripped and the safety applied). Category 5 tests require specialized equipment and a qualified elevator inspector (QEI) witness.',
          'Alteration of existing elevators triggers re-evaluation under ASME A17.1 for the altered components. Replacing a controller, adding a new landing, or changing contract speed constitutes an alteration. The altered equipment must comply with the current edition of A17.1 even if the rest of the elevator was installed under an older code.',
        ],
        keyPoints: [
          'ASME A17.3: continued safe operation of existing (already-installed) elevators',
          'Annual Category 1 inspections; five-year Category 5 safety tests',
          'Safety deficiencies found during inspection: elevator placed out of service',
          'Alteration of components triggers compliance with current ASME A17.1 for those components',
        ],
        quiz: [
          {
            q: 'ASME A17.3 applies specifically to:',
            a: [
              'New elevator installations only',
              'Existing elevators already in service',
              'Escalator design standards only',
              'Hydraulic elevator new installations',
            ],
            correct: 1,
            exp: 'ASME A17.3 is the Safety Code for Existing Elevators and Escalators. It governs the continued safe operation, inspection, testing, and alteration of elevators already installed, complementing ASME A17.1 which applies to new installations.',
          },
          {
            q: 'Category 5 tests under ASME A17.3 are required at what interval?',
            a: ['Annually', 'Every 3 years', 'Every 5 years', 'Every 10 years'],
            correct: 2,
            exp: 'Category 5 tests — which include full-load safety device tests with the governor tripped and the safety applied under load — are required every 5 years. These tests are more invasive than annual Category 1 tests and require a QEI witness.',
          },
        ],
      },
      {
        title: 'QEI Credential & Inspection Process',
        body: [
          'The Qualified Elevator Inspector (QEI) credential is administered jointly by ASME and NAESA International (National Association of Elevator Safety Authorities). It is recognized in most US jurisdictions as the required credential for performing periodic elevator inspections and witnessing acceptance tests on new installations. QEI candidates must pass a written examination and demonstrate relevant field experience.',
          'QEI certification must be renewed every three years through continuing education and re-examination or documented field activity. Inspectors must keep current with ASME A17.1 and A17.3 code updates and any jurisdiction-specific amendments. Most jurisdictions require the inspector to be either a government-employed authority having jurisdiction (AHJ) inspector or a third-party QEI working under AHJ oversight.',
          'The inspection process involves physically operating the elevator through its full range of features, testing all safety devices, verifying clearances and lighting, examining ropes and sheaves, testing door interlocks, and reviewing maintenance records. The inspector issues a written report identifying deficiencies and their severity (immediate danger requiring shutdown, or advisory items to be corrected within a specified period).',
          'Acceptance inspections (also called construction or final inspections) are performed on newly installed elevators before they are placed in service. The AHJ inspector or QEI witness verifies that the installation meets ASME A17.1 requirements, all tests are passed, and all documentation is in order before issuing a certificate of operation.',
        ],
        keyPoints: [
          'QEI: ASME/NAESA joint credential, required in most jurisdictions for elevator inspections',
          'QEI renewal: every 3 years via continuing education or re-examination',
          'Inspector report: identifies deficiencies as shutdown-required (immediate danger) or advisory',
          'Acceptance inspection: required before a new elevator is placed in public service',
        ],
        quiz: [
          {
            q: 'The QEI (Qualified Elevator Inspector) credential is administered by:',
            a: [
              'OSHA and the Department of Labor jointly',
              'ASME and NAESA International jointly',
              'The International Union of Elevator Constructors (IUEC)',
              'State building departments independently',
            ],
            correct: 1,
            exp: 'ASME and NAESA International jointly administer the QEI credential through examination and experience verification. It is the nationally recognized standard for elevator inspector qualification, required in most US jurisdictions.',
          },
          {
            q: 'QEI certification must be renewed every:',
            a: ['1 year', '2 years', '3 years', '5 years'],
            correct: 2,
            exp: 'QEI holders must renew every 3 years through documented continuing education, field activity, or re-examination, ensuring inspectors remain current with ASME code updates and technology changes.',
          },
        ],
      },
      {
        title: 'Modernization: Controllers, Door Operators & Drives',
        body: [
          'Elevator modernization replaces aged components with modern equivalents to improve reliability, energy efficiency, ride quality, and code compliance. Common modernization projects include: controller replacement (relay to microprocessor), drive replacement (SCR to VVVF), door operator replacement (camming to variable-speed), and car interior renovation.',
          'Controller modernization is the most impactful single upgrade. Replacing a relay panel with a microprocessor controller adds fault logging, remote monitoring, traffic optimization, and compatibility with modern drive and door systems. The new controller must be installed and tested as an alteration under ASME A17.1, requiring an acceptance test and QEI witness.',
          'Drive modernization from an older SCR or generator set to a VVVF regenerative drive delivers energy savings of 35 to 50 percent, eliminates motor-generator noise, and improves leveling accuracy. VVVF drives also enable smooth starting without line voltage dips — an important consideration in buildings with sensitive equipment on shared circuits.',
          'Full modernization (controller + drive + door operator + fixtures) can extend elevator service life by 20 to 30 years at a fraction of new installation cost. The decision between modernization and full replacement depends on jack/cylinder condition (for hydraulic), machine condition, structural clearances, and budget. Elevator consultants and licensed elevator mechanics advise building owners on this assessment.',
        ],
        keyPoints: [
          'Controller mod: relay to microprocessor — adds fault logging, remote monitoring, traffic optimization',
          'Drive mod: VVVF regenerative — 35-50% energy savings, better leveling',
          'Modernization = alteration under ASME A17.1: requires acceptance test and QEI witness',
          'Full mod extends service life 20-30 years vs full replacement cost',
        ],
        quiz: [
          {
            q: 'Replacing an elevator relay controller with a microprocessor controller triggers what code requirement?',
            a: [
              'No code action required if the machine room layout is unchanged',
              'The elevator must be fully decommissioned and reinstalled to current ASME A17.1',
              'The alteration requires an acceptance test and QEI witness for the modified components',
              'The entire elevator must be upgraded to the latest ASME A17.1 edition simultaneously',
            ],
            correct: 2,
            exp: 'Replacing a controller is an alteration under ASME A17.1. The altered equipment must comply with the current code edition; an acceptance test is required and the QEI (or AHJ inspector) must witness that the modified equipment passes all applicable tests before the elevator returns to service.',
          },
          {
            q: 'Modernizing an elevator drive from an SCR system to a VVVF regenerative drive delivers what primary operational benefit?',
            a: [
              'Increases maximum contract speed beyond 2,000 fpm',
              'Eliminates the need for door interlocks on all floors',
              'Energy savings of 35-50% and improved leveling accuracy',
              'Allows the elevator to operate without a counterweight',
            ],
            correct: 2,
            exp: 'VVVF regenerative drives recover braking energy and return it to the building grid, delivering 35-50% energy savings versus SCR systems. They also provide precise motor frequency control that improves leveling accuracy and eliminates the inrush current of older starting methods.',
          },
        ],
      },
      {
        title: 'NEIEP Apprenticeship, IUEC & Career Pathways',
        body: [
          'The National Elevator Industry Educational Program (NEIEP) is the joint apprenticeship training program administered by employer associations and the International Union of Elevator Constructors (IUEC). The program is a 4-year apprenticeship combining on-the-job training hours (typically 8,000) with classroom and online instruction covering theory, ASME codes, motor controls, and hydraulic systems.',
          'The IUEC represents elevator constructors (mechanics) in collective bargaining with elevator companies. IUEC membership provides access to NEIEP training, union wage scales, and job referral through local hiring halls. Elevator mechanics are among the highest-compensated skilled trades workers: the Bureau of Labor Statistics reports a median annual wage of approximately $99,000, with experienced mechanics in high-cost markets frequently earning above $130,000.',
          'BLS projects 6 percent employment growth for elevator installers and repairers over the decade, driven by new construction, modernization projects on aging elevator stock, and increasing elevator density in commercial and residential buildings. The aging elevator fleet — millions of units installed before 1990 — represents a sustained modernization pipeline.',
          "Non-union pathways exist through employer-sponsored training programs and manufacturer (OEM) schools. Companies such as Otis, Schindler, KONE, and TK Elevator operate their own training centers and apprenticeship programs. QEI certification is accessible to mechanics who meet experience requirements regardless of union affiliation. Elevator inspection careers through state agencies and third-party inspection companies offer additional career paths for experienced mechanics.",
        ],
        keyPoints: [
          'NEIEP: 4-year joint apprenticeship (8,000 OJT hours + classroom), administered with IUEC',
          'IUEC: union representing elevator constructors; hiring hall referral',
          'BLS median wage: ~$99,000; growth: 6% projected',
          'Non-union: OEM schools (Otis, Schindler, KONE, TK Elevator), QEI inspection career path',
        ],
        quiz: [
          {
            q: 'The NEIEP elevator mechanic apprenticeship program is how long?',
            a: ['2 years', '3 years', '4 years', '5 years'],
            correct: 2,
            exp: 'NEIEP is a 4-year apprenticeship combining approximately 8,000 hours of on-the-job training with classroom instruction covering electrical theory, ASME codes, hydraulics, and electronic controls. It is jointly administered by employer associations and the IUEC.',
          },
          {
            q: 'BLS data indicates elevator installers and repairers have a median annual wage of approximately:',
            a: ['$60,000', '$75,000', '$99,000', '$140,000'],
            correct: 2,
            exp: 'BLS reports a median annual wage near $99,000 for elevator installers and repairers, making it one of the highest-paid construction and extraction occupations. Experienced mechanics in major urban markets frequently earn above $130,000.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'ASME A17.3 applies to:',
        a: [
          'New elevator installations only',
          'Existing elevators already in service',
          'Escalator design criteria only',
          'Elevator manufacturing plant inspections',
        ],
        correct: 1,
        exp: 'ASME A17.3 is the Safety Code for Existing Elevators and Escalators, governing continued safe operation, periodic inspection, and alteration of elevators already installed — complementing ASME A17.1 for new work.',
      },
      {
        q: 'Category 5 tests under ASME A17.3 are required every:',
        a: ['1 year', '2 years', '5 years', '10 years'],
        correct: 2,
        exp: 'Category 5 tests, including full-load safety device tests with the governor tripped, are required every 5 years. They are more invasive and technically demanding than the annual Category 1 tests.',
      },
      {
        q: 'The QEI credential is jointly administered by:',
        a: ['OSHA and DOL', 'ASME and NAESA International', 'IUEC and NEIEP', 'State agencies and ANSI'],
        correct: 1,
        exp: 'The Qualified Elevator Inspector credential is administered by ASME and NAESA International and is recognized in most US jurisdictions as the required qualification for elevator inspections.',
      },
      {
        q: 'QEI certification must be renewed every:',
        a: ['1 year', '2 years', '3 years', '5 years'],
        correct: 2,
        exp: 'QEI holders must renew every 3 years via continuing education, field activity, or re-examination, keeping inspectors current with code changes.',
      },
      {
        q: 'Replacing an elevator relay controller with a microprocessor controller under ASME A17.1 requires:',
        a: [
          'No code action if the machine room is unchanged',
          'Full elevator replacement to current code',
          'Acceptance testing with QEI witness for the modified components',
          'Removal of all original relay panels as a simultaneous condition',
        ],
        correct: 2,
        exp: 'Controller replacement is an alteration; altered components must meet current ASME A17.1, and an acceptance test witnessed by the QEI (or AHJ) is required before returning the elevator to service.',
      },
      {
        q: 'The primary energy benefit of modernizing to a VVVF regenerative drive is:',
        a: [
          'Eliminating the counterweight for new installation sites',
          'Energy savings of 35-50% by returning braking energy to the building grid',
          'Increasing contract speed to above 2,000 fpm on existing machines',
          'Removing the requirement for periodic governor testing',
        ],
        correct: 1,
        exp: 'VVVF regenerative drives convert kinetic braking energy back to electricity that re-enters the building grid, delivering 35-50% energy savings versus older SCR or rheostat-based speed controls.',
      },
      {
        q: 'The NEIEP elevator apprenticeship program length is:',
        a: ['2 years', '3 years', '4 years', '5 years'],
        correct: 2,
        exp: 'NEIEP is a 4-year program combining approximately 8,000 hours of on-the-job training with classroom and online instruction covering ASME codes, electrical theory, hydraulics, and electronic controls.',
      },
      {
        q: 'The BLS projected employment growth rate for elevator installers and repairers is approximately:',
        a: ['2%', '4%', '6%', '15%'],
        correct: 2,
        exp: 'BLS projects approximately 6% growth in elevator installer and repairer employment over the decade, driven by new construction, the aging elevator fleet requiring modernization, and increased elevator density in urban development.',
      },
      {
        q: 'What organization administers the NEIEP apprenticeship jointly with employer associations?',
        a: [
          'NAESA International (National Association of Elevator Safety Authorities)',
          'IUEC (International Union of Elevator Constructors)',
          'ASME (American Society of Mechanical Engineers)',
          'ANSI (American National Standards Institute)',
        ],
        correct: 1,
        exp: 'NEIEP is a joint labor-management program administered by employer associations and the IUEC. The union provides access to training and job referral through local hiring halls; employers fund and supervise the on-the-job training hours.',
      },
      {
        q: 'An acceptance inspection on a newly installed elevator is required primarily to:',
        a: [
          'Determine the elevator maintenance schedule for the building owner',
          'Verify ASME A17.1 compliance and issue a certificate of operation before public use',
          'Establish the counterweight weight specification for the maintenance log',
          'Train the building engineer on Phase I firefighter recall procedures',
        ],
        correct: 1,
        exp: "Acceptance inspections verify that a new elevator meets ASME A17.1 requirements before it is placed in service. The QEI or AHJ inspector witnesses all required tests and issues a certificate of operation — without which the elevator cannot legally carry the public.",
      },
    ],
  },
];
