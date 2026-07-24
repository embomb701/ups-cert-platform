import type { TrainingModule } from './modules';

export const FIRE_ALARM_TECH_MODULES: TrainingModule[] = [
  {
    id: 'fire-fundamentals',
    num: 11,
    title: 'Fire Alarm Systems & NFPA 72 Fundamentals',
    desc: 'Alarm system types, initiating devices, addressable vs conventional, and the National Fire Alarm and Signaling Code',
    slides: [
      {
        title: 'Introduction to Fire Alarm Systems',
        body: [
          'A fire alarm system is a network of devices that detect fire, alert occupants, and signal the fire department. NFPA 72, the National Fire Alarm and Signaling Code, is the primary standard governing design, installation, inspection, testing, and maintenance of fire alarm systems in the United States.',
          'Fire alarm systems are classified by their application: protected premises systems protect a single building or campus, supervising station systems transmit signals to a central or remote monitoring location, and public emergency alarm reporting systems alert the fire department directly.',
          'Conventional fire alarm systems divide a building into zones, where all devices in a zone share a single circuit pair. If a device activates, the panel identifies only which zone initiated, not which specific device. Conventional systems are cost-effective for small buildings with few zones.',
          'Addressable fire alarm systems assign a unique address to each device on a Signaling Line Circuit (SLC). The FACP communicates digitally with each device and pinpoints which exact detector or module has activated. Addressable systems are the standard for commercial and complex occupancies.',
        ],
        keyPoints: [
          'NFPA 72 governs fire alarm design, installation, testing, and maintenance',
          'Conventional systems identify zones; addressable systems identify individual devices',
          'SLC (Signaling Line Circuit) carries digital communication to addressable devices',
          'Protected premises, supervising station, and public reporting are the three system types',
        ],
        quiz: [
          {
            q: 'Which NFPA standard is the primary code for fire alarm and signaling systems?',
            a: ['NFPA 13', 'NFPA 25', 'NFPA 72', 'NFPA 101'],
            correct: 2,
            exp: 'NFPA 72, the National Fire Alarm and Signaling Code, covers the design, installation, inspection, testing, and maintenance of all fire alarm systems. NFPA 13 covers sprinklers and NFPA 25 covers water-based suppression ITM.',
          },
          {
            q: 'An addressable fire alarm system identifies activated devices by their:',
            a: ['Zone number', 'Unique SLC address', 'IDC circuit color', 'NAC branch number'],
            correct: 1,
            exp: 'Addressable systems assign a unique address to each device on the Signaling Line Circuit. When a device activates, the panel reports that specific address, allowing precise location identification rather than just a zone.',
          },
        ],
      },
      {
        title: 'Initiating Devices: Smoke & Heat Detectors',
        body: [
          'Ionization smoke detectors use a small radioactive source (americium-241) to ionize air between two charged plates, creating a small current. Smoke particles disrupt this current, triggering the alarm. Ionization detectors respond faster to fast-flaming fires that produce smaller combustion particles.',
          'Photoelectric smoke detectors use a light beam and photosensor inside a sensing chamber. In clear air the beam misses the sensor; smoke particles scatter light onto the sensor, triggering the alarm. Photoelectric detectors respond faster to slow-smoldering fires that produce larger, visible smoke particles.',
          'Fixed-temperature heat detectors activate when the sensing element reaches a set temperature, commonly 135 degrees F (57 degrees C) for standard environments. The eutectic alloy or bimetallic element is a one-time-use device and must be replaced after any activation.',
          'Rate-of-rise (ROR) heat detectors trigger when temperature rises faster than 12 degrees F per minute, regardless of actual temperature. This catches rapid fire development before the fixed set point is reached. Combination detectors include both ROR and fixed-temperature elements in a single unit.',
        ],
        keyPoints: [
          'Ionization: detects fast-flaming fires; faster for small combustion particles',
          'Photoelectric: detects slow-smoldering fires; scatters light onto photosensor',
          'Fixed-temp heat: activates at set point (typically 135 F), one-time use',
          'Rate-of-rise heat: triggers at temperature increase exceeding 12 F per minute',
        ],
        quiz: [
          {
            q: 'Which type of smoke detector responds fastest to a slow-smoldering fire producing large, visible smoke particles?',
            a: ['Ionization detector', 'Photoelectric detector', 'Fixed-temperature heat detector', 'Rate-of-rise heat detector'],
            correct: 1,
            exp: 'Photoelectric detectors use light scatter to sense smoke. Slow-smoldering fires produce large, visible particles that scatter light effectively. Ionization detectors are faster for fast-flaming fires with smaller particles.',
          },
          {
            q: 'A rate-of-rise heat detector is designed to activate when the temperature increases faster than:',
            a: ['5 degrees F per minute', '8 degrees F per minute', '12 degrees F per minute', '20 degrees F per minute'],
            correct: 2,
            exp: 'Rate-of-rise heat detectors trigger when the ambient temperature rises more than 12 degrees F per minute. This catches rapidly developing fires before the fixed temperature set point is reached.',
          },
        ],
      },
      {
        title: 'Manual Pull Stations & System Wiring Classes',
        body: [
          'Manual pull stations allow occupants to manually activate the fire alarm. They are required at each means of egress in most occupancies per NFPA 72. Double-action stations require two operations (lift and pull) to reduce accidental activation. Addressable pull stations report their exact address to the panel.',
          'Class B wiring uses a single circuit path with an End-of-Line (EOL) resistor at the last device. If a wire open-circuit occurs, the panel detects a trouble condition; devices beyond the break are no longer supervised. This is simpler to install but has no fault-tolerance for open circuits.',
          'Class A wiring uses a redundant return path — the circuit loops back to the panel on a separate pair of conductors. If any single point opens, devices remain supervised through the return path. Class A is required in high-rise buildings and other critical occupancies per NFPA 72 and local codes.',
          'Signaling Line Circuits (SLC) for addressable systems can also be wired Class A or Class B. Class A SLC wiring ensures that a single wire fault does not take devices offline. The FACP continuously polls each address and reports trouble if a device fails to respond.',
        ],
        keyPoints: [
          'Manual pull stations required at each means of egress',
          'Class B: single path with EOL resistor — open-circuit causes trouble and loss of downstream devices',
          'Class A: redundant return path — single open-circuit does not affect device supervision',
          'SLC Class A wiring required in high-rise and critical occupancies',
        ],
        quiz: [
          {
            q: 'In Class A wiring, how does the system respond to a single open-circuit fault on the initiating device circuit?',
            a: [
              'All devices on the circuit go into alarm',
              'Devices beyond the fault lose supervision',
              'Devices remain supervised through the return path',
              'The panel requires manual reset before restoring supervision',
            ],
            correct: 2,
            exp: 'Class A wiring uses a redundant return path back to the panel. A single wire break allows communication to continue through the alternate path, maintaining supervision of all devices. Class B has no redundant path.',
          },
          {
            q: 'What component terminates a Class B initiating device circuit and allows the panel to supervise for open-circuit faults?',
            a: ['Surge protector', 'End-of-Line resistor', 'Isolation module', 'Relay module'],
            correct: 1,
            exp: 'An End-of-Line (EOL) resistor at the last device in a Class B circuit creates a known resistance the panel monitors. If the wire opens, the panel loses that known resistance and reports a trouble condition.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'NFPA 72 is the primary standard governing which of the following?',
        a: ['Sprinkler system installation', 'Fire alarm installation, testing, and maintenance', 'Building egress requirements', 'Fire pump design and testing'],
        correct: 1,
        exp: 'NFPA 72 is the National Fire Alarm and Signaling Code. It covers design, installation, inspection, testing, and maintenance of fire alarm and signaling systems.',
      },
      {
        q: 'Which fire alarm system type assigns a unique address to every device on the Signaling Line Circuit?',
        a: ['Conventional', 'Zoned', 'Addressable', 'Class B'],
        correct: 2,
        exp: 'Addressable systems digitally communicate with each device by its unique SLC address. The panel can pinpoint which individual detector or module activated, unlike conventional systems that identify only the zone.',
      },
      {
        q: 'Ionization smoke detectors respond faster to which type of fire?',
        a: ['Slow-smoldering fires', 'Fast-flaming fires', 'Electrical arc fires only', 'Liquid fuel fires only'],
        correct: 1,
        exp: 'Ionization detectors sense small combustion particles from fast-flaming fires. Photoelectric detectors respond faster to slow-smoldering fires with large, visible smoke particles.',
      },
      {
        q: 'A fixed-temperature heat detector with a standard rating typically activates at:',
        a: ['100 degrees F', '120 degrees F', '135 degrees F', '165 degrees F'],
        correct: 2,
        exp: 'Standard fixed-temperature heat detectors activate at 135 degrees F (57 degrees C). High-temperature ratings are used in environments with elevated ambient temperatures.',
      },
      {
        q: 'Rate-of-rise heat detectors activate when the temperature rises faster than:',
        a: ['5 degrees F per minute', '12 degrees F per minute', '20 degrees F per minute', '35 degrees F per minute'],
        correct: 1,
        exp: 'Rate-of-rise detectors trigger at a rise exceeding 12 degrees F per minute. This provides early warning of rapidly developing fires before the fixed temperature set point is reached.',
      },
      {
        q: 'Manual pull stations must be located at:',
        a: ['Every stairwell landing only', 'Each means of egress', 'Every other floor only', 'Only at the main entrance'],
        correct: 1,
        exp: 'NFPA 72 requires manual pull stations at each means of egress. Occupants must be able to manually initiate an alarm from any path they would use to exit the building.',
      },
      {
        q: 'Class A circuit wiring differs from Class B by providing:',
        a: ['Higher voltage tolerance', 'A redundant return path to the panel', 'An additional EOL resistor at mid-circuit', 'Wireless backup communication'],
        correct: 1,
        exp: 'Class A wiring loops the circuit back to the panel on a separate conductor pair. A single wire break does not isolate devices because communication continues through the return path.',
      },
      {
        q: 'In a conventional fire alarm system, what does the panel identify when a device activates?',
        a: ['The specific device address', 'The zone containing the device', 'The SLC loop number and device sequence', 'The manufacturer and model of the device'],
        correct: 1,
        exp: 'Conventional systems divide buildings into zones, each on a shared circuit. When any device on a zone activates, the panel knows only which zone alarmed, not the specific device.',
      },
      {
        q: 'Which smoke detector type uses a light beam and photosensor to detect smoke particles?',
        a: ['Ionization', 'Thermal imaging', 'Photoelectric', 'Aspirating'],
        correct: 2,
        exp: 'Photoelectric detectors use a light beam inside a sensing chamber. Smoke particles scatter light onto a photosensor, triggering the alarm. They are most effective for slow-smoldering fires with large visible particles.',
      },
      {
        q: 'After activation, a fixed-temperature heat detector must be:',
        a: ['Reset by the FACP and reused', 'Manually reset at the device', 'Replaced, as it is a one-time-use device', 'Tested with a heat gun every 6 months'],
        correct: 2,
        exp: 'Fixed-temperature heat detectors use a eutectic alloy or bimetallic element that permanently deforms upon activation. The device cannot be reset and must be replaced after any operation.',
      },
    ],
  },

  {
    id: 'fire-panels',
    num: 12,
    title: 'Control Panels, NAC Circuits & Notification Appliances',
    desc: 'FACP programming, SLC loops, NAC circuits, horns, strobes, voice evacuation, and output module wiring',
    slides: [
      {
        title: 'Fire Alarm Control Panel (FACP) Architecture',
        body: [
          'The Fire Alarm Control Panel (FACP) is the brain of the system. It continuously monitors all initiating devices, processes alarm and trouble signals, activates notification appliances, and communicates with supervising stations. Modern FACPs use a microprocessor with non-volatile memory to store programming and maintain event logs.',
          'The SLC carries low-voltage digital polling signals between the FACP and each addressable device. The FACP polls every device address sequentially, reads status, and can send commands such as pre-alarm, alarm, or test. A single SLC loop can support hundreds of addressable devices depending on the panel model.',
          'Input modules on the SLC allow conventional devices to be connected to an addressable system by monitoring the circuit status and reporting it as a single address. Output modules allow the panel to control relays, door holders, elevator recall circuits, and other building systems.',
          'The FACP must have a primary power supply (commercial AC, typically 120V) and a dedicated secondary power supply (sealed lead-acid or lithium batteries) capable of powering the system for at least 24 hours in standby and 5 minutes in full alarm per NFPA 72.',
        ],
        keyPoints: [
          'FACP monitors all devices, activates notifications, and communicates with monitoring stations',
          'SLC carries digital polling; a single loop supports hundreds of addressable devices',
          'Input and output modules bridge conventional devices and controlled systems to the SLC',
          'Battery backup: minimum 24 hours standby + 5 minutes full alarm per NFPA 72',
        ],
        quiz: [
          {
            q: 'Per NFPA 72, the secondary (battery) power supply for a fire alarm system must power the system for a minimum of:',
            a: [
              '8 hours standby and 5 minutes alarm',
              '24 hours standby and 5 minutes alarm',
              '48 hours standby and 15 minutes alarm',
              '72 hours standby and 30 minutes alarm',
            ],
            correct: 1,
            exp: 'NFPA 72 requires the secondary power supply to provide at least 24 hours of standby power followed by 5 minutes in full alarm. Some occupancies and supervising station connections require longer standby periods.',
          },
          {
            q: 'What is the primary purpose of an output module on an SLC loop?',
            a: [
              'To add additional smoke detectors beyond the SLC device limit',
              'To control relays, door holders, and other external systems',
              'To filter noise from the SLC signal',
              'To provide Class A redundancy for the SLC loop',
            ],
            correct: 1,
            exp: 'Output modules receive commands from the FACP via SLC and activate relays or circuits connected to them. Common uses include door holders, elevator recall, HVAC shutdown, and damper control.',
          },
        ],
      },
      {
        title: 'NAC Circuits & Notification Appliances',
        body: [
          'The Notification Appliance Circuit (NAC) distributes power to horns, strobes, speakers, and other audible/visual warning devices. NAC circuits are supervised for open-circuit and short-circuit faults. Like initiating device circuits, NACs can be wired Class A or Class B.',
          'Audible appliances must produce sound levels at least 15 dB above the average ambient sound level, or 5 dB above the maximum ambient sound level, or at least 70 dBA at the pillow level in sleeping areas, whichever is greater per NFPA 72. Sound levels are measured at 10 feet from the device.',
          'Visual notification appliances (strobes) flash at 1 to 2 Hz to alert the hearing-impaired. Strobe intensity must meet the candela (cd) rating required by NFPA 72 for the coverage area. All strobes in a corridor must synchronize within 200 milliseconds of each other.',
          'Combination horn/strobe units simplify installation. Temporal-3 is the standard audible evacuation signal per NFPA 72: three short pulses, a pause, repeated continuously. Addressable notification appliances receive commands directly from the FACP via the SLC.',
        ],
        keyPoints: [
          'NAC delivers power to horns, strobes, and speakers; supervised for faults',
          'Audible minimum: 15 dB above average ambient, or 70 dBA at pillow in sleeping areas',
          'Strobes must synchronize within 200 ms; rating in candela based on coverage area',
          'Temporal-3 is the standard audible evacuation signal per NFPA 72',
        ],
        quiz: [
          {
            q: 'Per NFPA 72, visual alarm appliances (strobes) in a common corridor must synchronize within:',
            a: ['50 milliseconds', '100 milliseconds', '200 milliseconds', '500 milliseconds'],
            correct: 2,
            exp: 'NFPA 72 requires all strobes in the same field of view — such as a corridor — to synchronize within 200 milliseconds of each other. Without synchronization, the combined flicker rate could trigger photosensitive seizures.',
          },
          {
            q: 'The Temporal-3 signal is the standard audible pattern for:',
            a: ['Trouble alerts', 'Pre-alarm warnings', 'Emergency evacuation', 'Supervisory signals'],
            correct: 2,
            exp: 'Temporal-3 is the ANSI/NFPA 72 standard evacuation signal: three short pulses, a pause, repeated. It is universally recognizable as the command to evacuate.',
          },
        ],
      },
      {
        title: 'Voice Evacuation & Mass Notification Systems',
        body: [
          'Voice evacuation systems (VES) use amplified audio to deliver recorded and live voice messages during emergencies. Per NFPA 72 Chapter 24, voice systems must produce intelligible speech at a minimum of 10 dB above the average ambient level or at least 70 dBA at the listener location, whichever is greater.',
          'Emergency Communication Systems (ECS) include both one-way and two-way systems. Two-way in-building warden communication systems allow floor wardens to communicate with a central command station. Elevator intercoms and area-of-rescue assistance call stations are also classified as ECS.',
          'Mass Notification Systems (MNS) extend notification beyond fire to all-hazard scenarios including severe weather, security threats, and chemical spills. MNS can override fire alarm signals with higher-priority messages and interface with public address systems, outdoor speakers, and digital signage.',
          'Amplifier redundancy is required by NFPA 72 for voice evacuation systems serving high-rise buildings. A backup amplifier must be available to replace any single failed amplifier. Amplifier output is rated in watts and speaker circuits must deliver adequate wattage for the required sound level.',
        ],
        keyPoints: [
          'VES minimum: 10 dB above ambient or 70 dBA at listener location',
          'Two-way ECS: floor warden intercom, elevator intercoms, area-of-rescue stations',
          'MNS covers all-hazard scenarios; can override fire alarm priority',
          'High-rise VES requires backup amplifier redundancy per NFPA 72',
        ],
        quiz: [
          {
            q: 'A voice evacuation system must produce intelligible speech at a minimum of how many dB above average ambient sound levels?',
            a: ['5 dB', '10 dB', '15 dB', '20 dB'],
            correct: 1,
            exp: 'NFPA 72 Chapter 24 requires voice evacuation systems to produce intelligible speech at least 10 dB above the average ambient sound level in the served area, ensuring the message can be clearly heard during an emergency.',
          },
          {
            q: 'Mass Notification Systems (MNS) differ from standard fire alarm voice evacuation systems by:',
            a: [
              'Using only outdoor speakers',
              'Providing all-hazard messaging that can override fire alarm signals',
              'Requiring manual activation only',
              'Being limited to government buildings',
            ],
            correct: 1,
            exp: 'MNS cover all-hazard scenarios and can be programmed to override standard fire alarm signals with higher-priority messages. They integrate with PA systems, digital signage, and outdoor speakers.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Per NFPA 72, the minimum secondary battery backup time for a standard commercial fire alarm system is:',
        a: ['8 hours standby and 5 minutes alarm', '24 hours standby and 5 minutes alarm', '48 hours standby and 10 minutes alarm', '72 hours standby and 15 minutes alarm'],
        correct: 1,
        exp: 'NFPA 72 requires at least 24 hours of standby power followed by 5 minutes of full alarm operation. Systems connected to supervising stations or with other special requirements may need longer times.',
      },
      {
        q: 'What does a Notification Appliance Circuit (NAC) supply to the field devices?',
        a: ['Digital SLC polling signals', 'Power for horns, strobes, and speakers', 'Battery backup voltage', 'Programming data for addressable devices'],
        correct: 1,
        exp: 'The NAC distributes controlled power from the FACP to notification appliances including horns, strobes, combination devices, and speakers. NAC circuits are supervised for open-circuit and short-circuit faults.',
      },
      {
        q: 'The minimum audible sound level for a notification appliance in a sleeping area is:',
        a: ['55 dBA at the pillow', '70 dBA at the pillow', '85 dBA at 10 feet', '90 dBA at the appliance'],
        correct: 1,
        exp: 'NFPA 72 requires a minimum of 70 dBA at the pillow level in sleeping areas to ensure occupants are awakened during a fire alarm. This is higher than the standard 15 dB above ambient requirement for waking occupancies.',
      },
      {
        q: 'Corridor strobes must synchronize within what time period of each other?',
        a: ['50 ms', '100 ms', '200 ms', '500 ms'],
        correct: 2,
        exp: 'NFPA 72 requires strobes in the same field of view to synchronize within 200 milliseconds to prevent the combined flash rate from reaching frequencies that could trigger photosensitive seizures.',
      },
      {
        q: 'The Temporal-3 audible evacuation signal pattern consists of:',
        a: ['One long tone followed by silence', 'Three short pulses, a pause, repeated', 'Continuous alternating tones', 'Four pulses followed by a long tone'],
        correct: 1,
        exp: 'Temporal-3 (T3) is the ANSI/NFPA 72 standard evacuation signal: three short pulses followed by a pause, repeated continuously. It is universally recognized as the evacuation signal.',
      },
      {
        q: 'An output module on an SLC loop is used to:',
        a: ['Add more smoke detectors beyond the loop limit', 'Control relays, door holders, and HVAC shutdown', 'Increase SLC loop voltage', 'Terminate the SLC Class A return path'],
        correct: 1,
        exp: 'Output modules receive commands from the FACP via the SLC and switch relays or circuits to control door holders, elevator recall, HVAC shutdown, dampers, and other building systems.',
      },
      {
        q: 'Voice evacuation systems must produce intelligible speech at a minimum of how many dB above average ambient levels?',
        a: ['5 dB', '10 dB', '15 dB', '20 dB'],
        correct: 1,
        exp: 'NFPA 72 Chapter 24 requires intelligible speech at least 10 dB above average ambient sound levels. This ensures the voice message is clearly distinguishable from background noise during an emergency.',
      },
      {
        q: 'A monitor (input) module on an SLC loop allows a conventional smoke detector to be used by:',
        a: ['Converting the detector to an addressable device by assigning it an SLC address', 'Replacing the detector with an addressable equivalent', 'Bypassing the SLC and wiring directly to a NAC', 'Connecting the detector to a conventional zone panel'],
        correct: 0,
        exp: 'A monitor module monitors the circuit status of conventional devices and reports that status as a single SLC address to the FACP. This allows conventional devices to be integrated into an addressable system.',
      },
      {
        q: 'Mass Notification Systems (MNS) are designed to handle:',
        a: ['Fire alarms only', 'Fire and smoke alarms only', 'All-hazard scenarios including fire, weather, and security', 'Only outdoor emergency notifications'],
        correct: 2,
        exp: 'MNS are all-hazard systems covering fire, severe weather, security threats, chemical releases, and other emergencies. They can override fire alarm signals with higher-priority messages and use multiple communication paths.',
      },
      {
        q: 'Per NFPA 72, high-rise voice evacuation systems must include:',
        a: ['Dual SLC loops', 'Amplifier redundancy to replace any single failed amplifier', 'Class A NAC wiring only', 'Wireless backup notification capability'],
        correct: 1,
        exp: 'NFPA 72 requires amplifier redundancy for voice evacuation systems in high-rise buildings. A backup amplifier must be available to automatically or manually replace any single amplifier failure to maintain voice coverage.',
      },
    ],
  },

  {
    id: 'fire-suppression',
    num: 13,
    title: 'Suppression Systems: Sprinklers & Clean Agents',
    desc: 'NFPA 13 sprinkler types, wet/dry/pre-action/deluge systems, clean agent suppression, and kitchen hood systems',
    slides: [
      {
        title: 'Sprinkler System Types & NFPA 13',
        body: [
          'NFPA 13, Standard for the Installation of Sprinkler Systems, governs automatic sprinkler design, installation, and materials. Each sprinkler head contains a fusible element or glass bulb that releases at a specific activation temperature, allowing water to flow and discharge in a pattern over the fire area.',
          'Standard sprinkler activation temperatures are 135-170 degrees F (57-77 degrees C) for ordinary-temperature environments. Intermediate-temperature sprinklers (175-225 degrees F) are used in warmer locations. High-temperature sprinklers (250-300 degrees F) are used in boiler rooms and attics where ambient temperatures are elevated.',
          'Wet pipe systems maintain water in the sprinkler piping at all times. When a sprinkler head activates, water discharges immediately. Wet pipe is the simplest, most reliable, and most common system type. It is not suitable for environments subject to freezing temperatures.',
          'Dry pipe systems use pressurized air or nitrogen to hold a dry pipe valve closed, keeping water out of the sprinkler piping. When a sprinkler activates and releases air pressure, the dry pipe valve trips, allowing water to fill the system and flow. Dry pipe is used in unheated spaces subject to freezing.',
        ],
        keyPoints: [
          'NFPA 13 governs sprinkler installation design and materials',
          'Standard head activation: 135-170 degrees F; higher ratings for warm environments',
          'Wet pipe: water always present, immediate discharge, not for freezing areas',
          'Dry pipe: pressurized air holds valve; air release trips valve to allow water flow',
        ],
        quiz: [
          {
            q: 'Which type of automatic sprinkler system maintains water in the piping at all times?',
            a: ['Dry pipe', 'Pre-action', 'Deluge', 'Wet pipe'],
            correct: 3,
            exp: 'Wet pipe sprinkler systems maintain water in the piping under pressure at all times. When a sprinkler head activates, water discharges immediately without any valve to trip.',
          },
          {
            q: 'A dry pipe sprinkler system is most appropriate for:',
            a: [
              'High-temperature environments above 300 degrees F',
              'Clean rooms requiring contamination control',
              'Unheated spaces subject to freezing',
              'Computer rooms requiring pre-discharge warning',
            ],
            correct: 2,
            exp: 'Dry pipe systems use pressurized air to keep water out of the piping until a sprinkler activates. They are used in unheated warehouses, parking structures, and attic spaces where water in the piping could freeze.',
          },
        ],
      },
      {
        title: 'Pre-Action & Deluge Systems',
        body: [
          'Pre-action sprinkler systems require two independent actions before water can flow: detection of a fire (which opens a pre-action valve) and activation of a sprinkler head (which releases water). Single-interlock systems open the valve upon detection. Double-interlock requires both detection and head activation, providing the highest protection against accidental discharge.',
          'Pre-action systems are used in data centers, museums, libraries, and archival spaces where accidental water discharge would cause severe damage. The double-interlock design ensures water will not discharge due to a single failure of either the detection system or a sprinkler head.',
          'Deluge sprinkler systems have open heads (no fusible element) and a deluge valve that keeps water out of the piping until the valve is tripped by a detection system. When the valve opens, water flows from all heads in the zone simultaneously. Deluge is used for aircraft hangars, transformer vaults, and other high-hazard applications.',
          'Water spray fixed systems are similar to deluge but use directional nozzles aimed at specific hazards such as cable trays or oil-filled transformers rather than providing area coverage. Both are governed by NFPA 15.',
        ],
        keyPoints: [
          'Single-interlock pre-action: detection opens valve; head activation allows flow',
          'Double-interlock pre-action: requires BOTH detection AND head — maximum accidental-discharge protection',
          'Deluge: open heads, single valve trip floods entire zone instantly',
          'Pre-action preferred in data centers; deluge in aircraft hangars and transformer vaults',
        ],
        quiz: [
          {
            q: 'A double-interlock pre-action sprinkler system requires which two conditions before water can flow?',
            a: [
              'Two smoke detectors activating in the same zone',
              'Both fire detection activation AND a sprinkler head opening',
              'Both a pull station and a smoke detector activating',
              'Consecutive activation of two sprinkler heads',
            ],
            correct: 1,
            exp: 'Double-interlock pre-action systems require both the detection system to activate (opening the pre-action valve) AND a sprinkler head to open before water flows. This prevents accidental discharge from either a detection failure or a damaged sprinkler head alone.',
          },
          {
            q: 'Deluge sprinkler systems are most commonly used in:',
            a: ['Data centers and museums', 'Ordinary offices and retail spaces', 'Aircraft hangars and transformer vaults', 'Residential occupancies'],
            correct: 2,
            exp: 'Deluge systems provide immediate total coverage by flooding all open heads simultaneously upon valve trip. They are used in aircraft hangars, flammable liquid areas, transformer vaults, and other high-hazard applications requiring instant suppression.',
          },
        ],
      },
      {
        title: 'Clean Agent Systems & Kitchen Suppression',
        body: [
          'Clean agent fire suppression systems discharge a gas or chemical that suppresses fire without leaving residue or damaging electronics. Halon 1301 was the original clean agent but was banned by the Montreal Protocol due to ozone depletion. Modern replacements include FM-200 (HFC-227ea) and Novec 1230 (FK-5-1-12), both governed by NFPA 2001.',
          'FM-200 (HFC-227ea) suppresses fire primarily by absorbing heat from the combustion process. A design concentration of approximately 7 to 8 percent by volume is typically used for Class A, B, and C hazards. FM-200 has zero ozone depletion potential but has a significant global warming potential.',
          'Novec 1230 (FK-5-1-12) is a fluorinated ketone with zero ozone depletion potential and an extremely low global warming potential. It suppresses fire by absorbing heat and has a design concentration similar to FM-200. Both agents are safe for occupied spaces at design concentrations when properly engineered.',
          'Wet chemical kitchen hood suppression systems are required by NFPA 17A for commercial cooking equipment. The wet chemical agent (a potassium-based solution) saponifies hot cooking oils into a soapy foam, cooling the oil and preventing re-ignition. K-class portable fire extinguishers are required near commercial cooking equipment.',
        ],
        keyPoints: [
          'FM-200 (HFC-227ea) and Novec 1230 are primary Halon replacements; governed by NFPA 2001',
          'FM-200 design concentration: ~7-8% by volume for Class A/B/C hazards',
          'Novec 1230: zero ODP, very low GWP, safe at design concentration',
          'Wet chemical kitchen suppression: NFPA 17A; saponifies cooking oils; K-class extinguishers required',
        ],
        quiz: [
          {
            q: 'Which NFPA standard governs clean agent fire suppression systems?',
            a: ['NFPA 13', 'NFPA 17A', 'NFPA 25', 'NFPA 2001'],
            correct: 3,
            exp: 'NFPA 2001, Standard on Clean Agent Fire Extinguishing Systems, governs the design, installation, testing, and maintenance of clean agent systems using FM-200, Novec 1230, and other total flooding agents.',
          },
          {
            q: 'Wet chemical kitchen suppression systems suppress cooking oil fires primarily by:',
            a: [
              'Cooling with high-pressure water mist',
              'Flooding the hood with inert nitrogen gas',
              'Saponifying hot oils into a soapy foam to prevent re-ignition',
              'Removing oxygen with carbon dioxide discharge',
            ],
            correct: 2,
            exp: 'Wet chemical agents (potassium-based solutions) react with hot cooking oils through saponification, forming a soapy foam layer that cools the oil and seals the surface to prevent oxygen contact and re-ignition.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'NFPA 13 governs the installation of which type of fire protection systems?',
        a: ['Clean agent suppression systems', 'Automatic sprinkler systems', 'Fire alarm and signaling systems', 'Kitchen hood suppression systems'],
        correct: 1,
        exp: 'NFPA 13 is the Standard for the Installation of Sprinkler Systems. It covers design, materials, installation, and occupancy classifications for automatic sprinkler protection.',
      },
      {
        q: 'Standard automatic sprinkler heads for ordinary-temperature environments activate at approximately:',
        a: ['100-115 degrees F', '135-170 degrees F', '200-225 degrees F', '250-300 degrees F'],
        correct: 1,
        exp: 'Standard (ordinary) temperature-rated sprinkler heads activate at 135 to 170 degrees F. Intermediate and high-temperature ratings are used in warmer environments.',
      },
      {
        q: 'Which sprinkler system type keeps water out of the piping using pressurized air or nitrogen?',
        a: ['Wet pipe', 'Deluge', 'Dry pipe', 'Pre-action'],
        correct: 2,
        exp: 'Dry pipe systems use pressurized air or nitrogen to hold the dry pipe valve closed, keeping water out of the piping until a sprinkler activates.',
      },
      {
        q: 'A double-interlock pre-action system is preferred for data centers because:',
        a: ['It provides the fastest water discharge', 'It prevents accidental water discharge from either a detection failure or a single head opening', 'It uses less water than wet pipe systems', 'It is required by NFPA 13 for all critical facilities'],
        correct: 1,
        exp: 'Double-interlock pre-action requires both detection activation AND a sprinkler head to open before water flows. This prevents accidental discharge — critical in data centers where water causes severe equipment damage.',
      },
      {
        q: 'Deluge sprinkler systems use open heads and discharge water from:',
        a: ['Only the heads nearest the fire', 'All heads in the zone simultaneously when the valve trips', 'A pre-selected group of heads based on detection', 'One head at a time in a sequential pattern'],
        correct: 1,
        exp: 'Deluge systems have open heads throughout the zone. When the deluge valve is tripped by the detection system, water flows from all heads simultaneously for total coverage.',
      },
      {
        q: 'FM-200 (HFC-227ea) fire suppression is classified as a replacement for which banned agent?',
        a: ['CO2', 'Halon 1301', 'Dry chemical', 'Wet chemical'],
        correct: 1,
        exp: 'Halon 1301 was banned by the Montreal Protocol because it depletes stratospheric ozone. FM-200 (HFC-227ea) and Novec 1230 (FK-5-1-12) are the primary replacements, both governed by NFPA 2001.',
      },
      {
        q: 'The design concentration for FM-200 (HFC-227ea) in a Class A/B/C hazard application is approximately:',
        a: ['2-3% by volume', '5-6% by volume', '7-8% by volume', '12-15% by volume'],
        correct: 2,
        exp: 'FM-200 is typically designed to a concentration of 7 to 8 percent by volume for Class A, B, and C fire hazards. This concentration is effective at suppressing fire while remaining safe for occupied spaces.',
      },
      {
        q: 'NFPA 17A governs which type of suppression system?',
        a: ['Clean agent systems', 'Dry chemical systems', 'Wet chemical kitchen hood systems', 'Halon systems'],
        correct: 2,
        exp: 'NFPA 17A is the Standard for Wet Chemical Extinguishing Systems. It covers kitchen hood suppression systems using potassium-based wet chemical agents.',
      },
      {
        q: 'Wet chemical kitchen suppression agents suppress cooking oil fires by:',
        a: ['Cooling with high-pressure water', 'Saponification of cooking oils into a soapy foam', 'Smothering with CO2', 'Absorbing heat without chemical reaction'],
        correct: 1,
        exp: 'Potassium-based wet chemical agents react with hot cooking oils through saponification, converting them to a soapy foam that seals the oil surface and prevents re-ignition.',
      },
      {
        q: 'Which portable fire extinguisher class is required near commercial cooking equipment?',
        a: ['A-class', 'B-class', 'C-class', 'K-class'],
        correct: 3,
        exp: 'K-class fire extinguishers use wet chemical agents and are specifically required near commercial cooking equipment. They are effective against cooking oil fires that Class B extinguishers cannot fully suppress.',
      },
    ],
  },

  {
    id: 'fire-itm',
    num: 14,
    title: 'Inspection, Testing & Maintenance (NFPA 72 & NFPA 25)',
    desc: 'Required frequencies for alarm and sprinkler ITM, acceptance testing, and documentation requirements',
    slides: [
      {
        title: 'Fire Alarm System ITM Requirements (NFPA 72 Chapter 14)',
        body: [
          'NFPA 72 Chapter 14 prescribes inspection, testing, and maintenance (ITM) requirements for all fire alarm and signaling system components. ITM must be performed by qualified personnel in accordance with the manufacturers published instructions and NFPA 72 requirements. Records must be maintained on-site and be available to the Authority Having Jurisdiction (AHJ).',
          'Visual inspections verify that devices are in place, unobstructed, and show no visible damage. Smoke detectors require annual functional testing using listed aerosol, heated air, or magnetic test tools. Pull stations must be tested by activating the pull mechanism.',
          'Control panels must be tested annually including power supplies, battery tests, trouble conditions, and all alarm functions. Battery load testing is performed to verify capacity: a full 24-hour discharge test followed by a 5-minute alarm load test confirms the batteries meet NFPA 72 minimum requirements.',
          'Notification appliances must be tested annually to verify operation. Sound levels in sleeping areas must be verified to meet the 70 dBA minimum. Strobe synchronization must be confirmed where required. Voice intelligibility testing is required for emergency voice/alarm communication systems.',
        ],
        keyPoints: [
          'NFPA 72 Ch. 14 governs all fire alarm ITM; records must be maintained and available to AHJ',
          'Smoke detectors: annual functional test using listed aerosol or heated air',
          'Battery: 24-hour discharge + 5-minute alarm load test confirms NFPA 72 capacity requirement',
          'Notification appliances tested annually; voice intelligibility tested for ECS systems',
        ],
        quiz: [
          {
            q: 'Per NFPA 72, how often must automatic smoke detectors be functionally tested?',
            a: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually'],
            correct: 3,
            exp: 'NFPA 72 Chapter 14 requires annual functional testing of automatic smoke detectors using listed aerosol, heated air, or other listed means.',
          },
          {
            q: 'Battery testing for fire alarm systems per NFPA 72 requires verifying the battery can supply:',
            a: [
              '8 hours standby plus 5 minutes alarm',
              '24 hours standby plus 5 minutes alarm',
              '48 hours standby plus 15 minutes alarm',
              '24 hours standby plus 30 minutes alarm',
            ],
            correct: 1,
            exp: 'NFPA 72 requires the secondary battery supply to provide at least 24 hours of standby followed by 5 minutes of full alarm. Battery testing confirms this capacity.',
          },
        ],
      },
      {
        title: 'Sprinkler System ITM Requirements (NFPA 25)',
        body: [
          'NFPA 25, Standard for the Inspection, Testing, and Maintenance of Water-Based Fire Protection Systems, governs ITM for sprinklers, standpipes, fire pumps, and related equipment. Records must be kept and available to the AHJ.',
          'Sprinkler heads must be inspected annually for corrosion, paint, physical damage, and orientation. Standard sprinkler heads must be tested or replaced at 50 years; fast-response heads at 20 years. Dry pipe, pre-action, and deluge systems require an internal inspection after 10 years and every 10 years thereafter.',
          'Main drain tests must be performed annually on each system riser to verify water supply pressure and flow. The static and residual pressures are recorded and compared to previous results to identify degradation. Inspector test valves simulate a single sprinkler head operation to verify alarm valve and water flow switch function.',
          'Dry pipe systems require an annual trip test where the dry pipe valve is tripped to confirm proper operation. The time from tripping to water reaching the inspector test valve must not exceed 60 seconds. Pre-action systems require similar annual testing of the deluge valve trip function.',
        ],
        keyPoints: [
          'NFPA 25 governs sprinkler, standpipe, and fire pump ITM',
          'Standard sprinkler heads: test or replace at 50 years; fast-response at 20 years',
          'Annual main drain test verifies water supply pressure and flow',
          'Dry pipe annual trip test: water must reach inspector test valve within 60 seconds',
        ],
        quiz: [
          {
            q: 'NFPA 25 requires standard sprinkler heads to be tested or replaced at:',
            a: ['20 years', '30 years', '40 years', '50 years'],
            correct: 3,
            exp: 'NFPA 25 requires standard sprinkler heads to be tested or replaced at 50 years. Fast-response sprinkler heads have a shorter requirement of 20 years.',
          },
          {
            q: 'For a dry pipe sprinkler system, the annual trip test requires water to reach the inspector test valve within:',
            a: ['30 seconds', '60 seconds', '90 seconds', '120 seconds'],
            correct: 1,
            exp: 'NFPA 25 requires that water reach the inspector test valve within 60 seconds of a dry pipe valve trip. Excessive delay indicates air volume problems or inadequate water supply pressure.',
          },
        ],
      },
      {
        title: 'Acceptance Testing & Documentation',
        body: [
          'Before any new fire alarm or suppression system is placed in service, a 100 percent acceptance test must be performed. Every device, appliance, and circuit must be tested to verify correct operation and panel response. The installing contractor typically performs the acceptance test witnessed by the AHJ or a third-party inspector.',
          'Acceptance testing for fire alarm systems includes verification of every initiating device, every notification appliance, all control panel functions, all off-premises signal transmission, all auxiliary control outputs (elevator recall, door holders, HVAC shutdown), and all power supply functions.',
          'Record-keeping requirements per NFPA 72 include maintaining a complete written or electronic record of all inspections, tests, maintenance, and alterations. Records must include the date, name of the inspector, their certification or license number, and the result of each test. Records must be kept for the life of the system.',
          'The Authority Having Jurisdiction (AHJ) must approve plans before installation and accept the system after final testing. In most cases the AHJ is the local fire marshal or fire department. All new and modified systems require AHJ approval of plans before installation and final acceptance after testing.',
        ],
        keyPoints: [
          '100% acceptance test required before placing any new system in service',
          'Acceptance test covers every device, circuit, and function; typically witnessed by AHJ',
          'Records must include date, inspector name/credential, and test results; kept for life of system',
          'AHJ approves plans before installation and accepts the system after final testing',
        ],
        quiz: [
          {
            q: 'Before a new fire alarm system is placed into service, what percentage of devices must be acceptance-tested?',
            a: ['25%', '50%', '75%', '100%'],
            correct: 3,
            exp: 'NFPA 72 requires a 100 percent acceptance test of all devices, appliances, and circuits before a new system is placed in service.',
          },
          {
            q: 'Fire alarm ITM records must be retained for:',
            a: ['1 year', '5 years', '10 years', 'The life of the system'],
            correct: 3,
            exp: 'NFPA 72 requires that ITM records be maintained for the life of the system and be available to the AHJ upon request.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Which NFPA standard governs inspection, testing, and maintenance of water-based fire protection systems?',
        a: ['NFPA 13', 'NFPA 25', 'NFPA 72', 'NFPA 101'],
        correct: 1,
        exp: 'NFPA 25 is the Standard for the Inspection, Testing, and Maintenance of Water-Based Fire Protection Systems. It covers sprinkler systems, standpipes, fire pumps, and all water-based suppression equipment.',
      },
      {
        q: 'NFPA 72 Chapter 14 governs which aspect of fire alarm systems?',
        a: ['System design and equipment selection', 'Inspection, testing, and maintenance', 'Acceptance testing only', 'Battery sizing calculations'],
        correct: 1,
        exp: 'NFPA 72 Chapter 14 prescribes all ITM requirements for fire alarm and signaling systems, including frequencies, methods, and documentation for every system component.',
      },
      {
        q: 'How often must automatic smoke detectors be functionally tested per NFPA 72?',
        a: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually'],
        correct: 3,
        exp: 'NFPA 72 Chapter 14 requires annual functional testing of automatic smoke detectors using listed aerosol, magnetic test tools, or heated air.',
      },
      {
        q: 'The correct method to functionally test a smoke detector per NFPA 72 is:',
        a: ['Hold a candle flame near the detector', 'Use a listed aerosol or heated air test tool', 'Spray compressed air from a can', 'Tap the detector housing firmly twice'],
        correct: 1,
        exp: 'NFPA 72 requires smoke detectors to be tested using listed aerosol canned smoke, heated air devices, or magnetic test tools. Open flame testing is prohibited as it can damage detectors.',
      },
      {
        q: 'Standard sprinkler heads must be tested or replaced per NFPA 25 at:',
        a: ['20 years', '30 years', '40 years', '50 years'],
        correct: 3,
        exp: 'NFPA 25 requires standard sprinkler heads to be field tested or replaced at 50 years from the date of installation. Fast-response heads have a shorter requirement of 20 years.',
      },
      {
        q: 'The annual main drain test on a sprinkler riser is performed to:',
        a: ['Flush sediment from the piping', 'Verify water supply pressure and flow are adequate', 'Reset the water flow alarm', 'Test the dry pipe valve trip function'],
        correct: 1,
        exp: 'The annual main drain test records static and residual pressures to verify water supply adequacy and to identify degradation in supply pressure over time.',
      },
      {
        q: 'For a dry pipe sprinkler system, the annual trip test requires water to reach the inspector test valve in no more than:',
        a: ['30 seconds', '45 seconds', '60 seconds', '90 seconds'],
        correct: 2,
        exp: 'NFPA 25 requires water to reach the inspector test valve within 60 seconds of the dry pipe valve tripping. A longer delay indicates problems with air volume, pipe sizing, or water supply.',
      },
      {
        q: 'What percentage of devices must be acceptance-tested before a new fire alarm system is placed in service?',
        a: ['25%', '50%', '75%', '100%'],
        correct: 3,
        exp: 'NFPA 72 requires 100 percent acceptance testing of all initiating devices, notification appliances, circuits, and control functions before a new system is placed in service.',
      },
      {
        q: 'The Authority Having Jurisdiction (AHJ) for a fire alarm system is typically:',
        a: ['The building owner', 'The installing contractor', 'The local fire marshal or fire department', 'The insurance carrier'],
        correct: 2,
        exp: 'The AHJ is the organization or individual responsible for enforcing code requirements and approving installations. For fire alarm systems, this is typically the local fire marshal, fire department, or building department.',
      },
      {
        q: 'Fire alarm ITM records must be maintained for how long?',
        a: ['1 year', '5 years', '10 years', 'The life of the system'],
        correct: 3,
        exp: 'NFPA 72 requires ITM records to be kept for the life of the system and available to the AHJ. This provides a complete history of system performance, modifications, and maintenance.',
      },
    ],
  },

  {
    id: 'fire-troubleshoot',
    num: 15,
    title: 'Troubleshooting, Ground Faults & Special Hazard Systems',
    desc: 'Common trouble conditions, ground fault isolation, VESDA aspirating detection, CO systems, and special hazard applications',
    slides: [
      {
        title: 'Common Trouble Conditions & Fault Isolation',
        body: [
          'Fire alarm trouble conditions indicate a system supervision failure requiring investigation and correction. Common trouble conditions include open circuits (broken wire or disconnected device), short circuits (two conductors touching), ground faults (conductor contacting a grounded surface), and device communication failures (addressable device not responding to SLC polling).',
          'Ground faults occur when a current-carrying conductor makes unintended contact with a grounded surface or equipment housing. On SLC circuits, a ground fault can cause erratic communication with devices near the fault. NFPA 72 requires that a single ground fault not cause an inadvertent alarm or prevent alarm signaling.',
          'Isolation modules are used on Class A SLC loops to isolate sections in the event of a wire-to-wire short circuit. Without isolation, a short on a Class A SLC would defeat both the primary and return paths and disable all devices beyond the fault. Isolation modules automatically disconnect the shorted section while keeping the rest of the loop operational.',
          'Systematic fault isolation involves dividing the circuit at its midpoint and using a multimeter or insulation resistance tester to determine which half contains the fault. For SLC troubles, the FACP event log often identifies the last known good address before the fault, indicating fault proximity.',
        ],
        keyPoints: [
          'Common troubles: open circuit, short circuit, ground fault, device communication failure',
          'NFPA 72: single ground fault must not cause inadvertent alarm or prevent alarm signaling',
          'Isolation modules on Class A SLC isolate shorted sections without disabling the entire loop',
          'Midpoint splitting and resistance measurement systematically locates faults',
        ],
        quiz: [
          {
            q: 'An isolation module on a Class A SLC loop automatically activates when:',
            a: [
              'A device activates an alarm',
              'A wire-to-wire short circuit occurs in its section of the loop',
              'Battery voltage drops below a threshold',
              'The FACP performs its daily self-test',
            ],
            correct: 1,
            exp: 'Isolation modules detect a wire-to-wire short in their section of the SLC loop and automatically disconnect that section, preventing the short from disabling the entire ring.',
          },
          {
            q: 'Per NFPA 72, a single ground fault on a fire alarm circuit must:',
            a: [
              'Immediately trigger a fire alarm as a safety measure',
              'Not cause an inadvertent alarm or prevent alarm signaling',
              'Automatically shut down the affected SLC loop',
              'Cause the panel to go into a pre-alarm condition',
            ],
            correct: 1,
            exp: 'NFPA 72 requires that a single ground fault must not cause an inadvertent alarm signal or prevent the system from correctly signaling a fire alarm.',
          },
        ],
      },
      {
        title: 'VESDA Aspirating Smoke Detection',
        body: [
          'Very Early Smoke Detection Apparatus (VESDA) is a brand name for aspirating smoke detection (ASD) systems. An aspirating detector actively draws air samples through a network of sampling pipes and holes drilled at regular intervals, passing the air through a highly sensitive laser-based detection chamber.',
          'VESDA systems detect smoke at concentrations orders of magnitude lower than conventional spot detectors — typically in the range of 0.001 to 0.2 percent obscuration per meter. This extreme sensitivity provides very early warning for environments where even small amounts of smoke could indicate a developing problem.',
          'Typical applications for VESDA include data centers, server rooms, telecommunications facilities, clean rooms, and cold storage where conventional detectors may be delayed in response or are difficult to install. VESDA systems can be programmed with multiple alarm thresholds (Alert, Action, Fire 1, Fire 2) to allow staged responses.',
          'Maintenance of VESDA systems includes periodic cleaning of the filter, verification of airflow through the sampling pipe network, and testing the laser detector chamber. Sampling holes must remain open and unobstructed.',
        ],
        keyPoints: [
          'VESDA (aspirating smoke detection) actively draws air samples through a pipe network',
          'Detection sensitivity 0.001-0.2% obscuration/meter — far earlier than spot detectors',
          'Applications: data centers, clean rooms, cold storage, telecom facilities',
          'Multiple thresholds (Alert, Action, Fire 1, Fire 2) allow staged response',
        ],
        quiz: [
          {
            q: 'Aspirating smoke detection (VESDA) differs from conventional spot detectors by:',
            a: [
              'Using heat instead of smoke for detection',
              'Actively drawing air samples through a pipe network to a central detection chamber',
              'Requiring connection to the building sprinkler system',
              'Using wireless communication with the FACP',
            ],
            correct: 1,
            exp: 'VESDA/ASD systems use a fan to actively pull air through a network of sampling pipes. The collected air passes through a highly sensitive laser detection chamber, providing much earlier warning than passive spot detectors.',
          },
          {
            q: 'VESDA aspirating detection systems are most commonly applied in:',
            a: [
              'Single-family residential occupancies',
              'Data centers, clean rooms, and telecommunications facilities',
              'Open parking structures',
              'Industrial manufacturing with heavy dust',
            ],
            correct: 1,
            exp: 'VESDA systems are used in data centers, server rooms, telecom facilities, and clean rooms where very early fire detection is critical and conventional detectors may be slow to respond.',
          },
        ],
      },
      {
        title: 'Carbon Monoxide Detection & Special Hazard Systems',
        body: [
          'Carbon monoxide (CO) detection systems are increasingly integrated with fire alarm systems. NFPA 720 governs CO detector installation, which is required in occupancies with fuel-burning appliances, attached garages, or other CO sources. CO detectors use electrochemical cells that generate a small current proportional to CO concentration.',
          'CO alarm thresholds follow UL 2034: the detector must not alarm at 70 ppm over 60 minutes, must alarm within 60 minutes at 150 ppm, and must alarm within 15 minutes at 400 ppm. These delayed-alarm thresholds prevent nuisance alarms while ensuring alarm at dangerous sustained concentrations.',
          'Carbon dioxide (CO2) total-flooding systems are used in enclosed machinery spaces and telecommunication rooms. CO2 displaces oxygen to suppress fire but is toxic to humans above approximately 5 percent concentration, requiring lockout/tagout procedures and pre-discharge alarms before discharge.',
          'Foam suppression systems use AFFF (Aqueous Film Forming Foam) or AR-AFFF to suppress flammable liquid fires. Foam forms a floating film on the liquid surface, cutting off oxygen and preventing re-ignition. Aircraft hangars, fuel loading racks, and chemical storage facilities are common foam system applications, governed by NFPA 11.',
        ],
        keyPoints: [
          'NFPA 720 governs CO detector installation; required near fuel-burning appliances',
          'CO alarm: no alarm at 70 ppm/60 min; alarm within 60 min at 150 ppm; within 15 min at 400 ppm',
          'CO2 total-flooding: displaces oxygen; toxic above 5% — requires pre-discharge alarm',
          'Foam systems (NFPA 11): AFFF for flammable liquid hazards; aircraft hangars, fuel facilities',
        ],
        quiz: [
          {
            q: 'Per UL 2034, a carbon monoxide detector must activate within how many minutes at a concentration of 400 ppm?',
            a: ['5 minutes', '15 minutes', '30 minutes', '60 minutes'],
            correct: 1,
            exp: 'UL 2034 requires CO detectors to alarm within 15 minutes at 400 ppm CO concentration. At 150 ppm the alarm must occur within 60 minutes.',
          },
          {
            q: 'Carbon dioxide (CO2) total-flooding suppression systems require a pre-discharge alarm because:',
            a: [
              'CO2 is corrosive to electronic equipment',
              'CO2 concentration above approximately 5% is toxic to humans',
              'CO2 damages sprinkler heads if discharged simultaneously',
              'Local codes require a manual abort option for all suppression systems',
            ],
            correct: 1,
            exp: 'CO2 suppresses fire by displacing oxygen, but concentrations above approximately 5 percent CO2 are toxic to humans. Pre-discharge alarms and time delays give occupants time to evacuate.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Which NFPA 72 requirement applies to a single ground fault on a fire alarm circuit?',
        a: [
          'It must trigger an immediate fire alarm',
          'It must not cause an inadvertent alarm or prevent alarm signaling',
          'It must automatically disable the affected circuit',
          'It must cause the panel to enter pre-alarm mode',
        ],
        correct: 1,
        exp: 'NFPA 72 requires that a single ground fault must not cause an inadvertent alarm or prevent the system from correctly signaling a real fire.',
      },
      {
        q: 'Isolation modules on Class A SLC loops protect the system from:',
        a: ['Open-circuit faults', 'Wire-to-wire short-circuit faults', 'Ground faults', 'Power supply failures'],
        correct: 1,
        exp: 'Isolation modules detect wire-to-wire shorts in their section of the SLC loop and disconnect that section automatically, keeping the rest of the Class A loop operational.',
      },
      {
        q: 'VESDA (aspirating smoke detection) provides earlier fire warning than conventional spot detectors by:',
        a: [
          'Using a higher voltage power supply for faster response',
          'Actively drawing air samples through a pipe network to a sensitive detection chamber',
          'Connecting directly to the sprinkler system for immediate suppression',
          'Using wireless signals for faster data transmission',
        ],
        correct: 1,
        exp: 'VESDA uses a fan to actively pull air samples through a network of pipes to a centralized, highly sensitive laser detection chamber, catching smoke concentrations far below what passive spot detectors would detect.',
      },
      {
        q: 'VESDA aspirating smoke detection is most commonly applied in:',
        a: ['Open parking garages', 'Data centers and clean rooms', 'Single-family homes', 'Agricultural storage buildings'],
        correct: 1,
        exp: 'VESDA systems are used in data centers, server rooms, clean rooms, cold storage, and telecom facilities where very early detection is critical.',
      },
      {
        q: 'NFPA 720 governs the installation of:',
        a: ['Fire suppression systems', 'Voice evacuation systems', 'Carbon monoxide detection systems', 'Sprinkler systems'],
        correct: 2,
        exp: 'NFPA 720 is the Standard for the Installation of Carbon Monoxide Detection and Warning Equipment.',
      },
      {
        q: 'Per UL 2034, a CO detector must not alarm at what concentration over a 60-minute period?',
        a: ['30 ppm', '70 ppm', '150 ppm', '400 ppm'],
        correct: 1,
        exp: 'UL 2034 requires that CO detectors must not alarm at 70 ppm over a 60-minute period to prevent nuisance alarms from brief, low-level CO exposures.',
      },
      {
        q: 'CO2 total-flooding suppression systems require a pre-discharge alarm primarily because:',
        a: ['CO2 corrodes metal components', 'CO2 concentrations above about 5% are toxic to humans', 'CO2 reacts with water in the air causing damage', 'CO2 is explosive at suppression concentrations'],
        correct: 1,
        exp: 'CO2 suppresses fire by displacing oxygen, but becomes toxic to humans above approximately 5 percent concentration. Pre-discharge alarms and delays of 30 to 60 seconds are required to allow evacuation.',
      },
      {
        q: 'Systematic fault isolation on a fire alarm circuit typically begins by:',
        a: ['Replacing all devices on the circuit', 'Dividing the circuit at its midpoint to determine which half contains the fault', 'Checking the FACP manufacturer website for fault codes', 'Disconnecting each device one by one from the end'],
        correct: 1,
        exp: 'Midpoint splitting halves the circuit and uses a multimeter to test which half contains the fault. Repeating the process progressively narrows the location, making it far more efficient than checking each device individually.',
      },
      {
        q: 'Foam suppression systems using AFFF are governed by which NFPA standard?',
        a: ['NFPA 13', 'NFPA 11', 'NFPA 25', 'NFPA 2001'],
        correct: 1,
        exp: 'NFPA 11, Standard for Low-, Medium-, and High-Expansion Foam, governs foam fire suppression systems for aircraft hangars, fuel loading racks, and flammable liquid storage.',
      },
      {
        q: 'A VESDA system alarm threshold labeled "Alert" is typically the:',
        a: [
          'Highest alarm level requiring immediate suppression discharge',
          'Lowest threshold indicating very early smoke presence warranting investigation',
          'Trouble condition indicating a blocked sampling pipe',
          'Level that triggers automatic fire department notification',
        ],
        correct: 1,
        exp: '"Alert" is the lowest VESDA alarm level, indicating trace smoke that should be investigated. Higher thresholds (Action, Fire 1, Fire 2) trigger progressively more urgent responses.',
      },
    ],
  },

  {
    id: 'fire-career',
    num: 16,
    title: 'Codes, NICET Certification & Career Paths',
    desc: 'AHJ roles, listing agencies, NICET certification levels, career outlook, and the fire protection job market',
    slides: [
      {
        title: 'Authority Having Jurisdiction & Listing Agencies',
        body: [
          'The Authority Having Jurisdiction (AHJ) is defined by NFPA codes as the organization, office, or individual responsible for enforcing requirements, or their designated representative. For fire protection systems, the AHJ is typically the local fire marshal, fire department, or the building department. All new and significantly modified systems must be submitted for plan review and approval before installation.',
          'UL (Underwriters Laboratories) is a nationally recognized testing laboratory (NRTL) that lists fire alarm equipment, sprinklers, and suppression agents tested to applicable UL standards. Products with the UL listing mark have been evaluated for safety and performance. NFPA codes generally require that listed equipment be used in fire protection installations.',
          'FM Approvals (formerly Factory Mutual Research) is another major listing and approval organization, particularly significant in industrial and commercial property applications. Many large insurers and industrial facilities specify FM-approved equipment. FM Approvals publishes approval standards that often align with but are not identical to NFPA requirements.',
          'The International Fire Code (IFC) published by the International Code Council (ICC) is another key code document adopted in many jurisdictions. IFC works in conjunction with NFPA codes and local amendments. State and local jurisdictions adopt and amend these model codes, so technicians must know the specific edition and local amendments adopted by each jurisdiction.',
        ],
        keyPoints: [
          'AHJ (typically fire marshal/fire department) must approve plans before installation and accept the system after testing',
          'UL listing: product tested to UL standards; NFPA codes require listed equipment',
          'FM Approvals: major listing body for industrial/commercial; insurers often specify FM equipment',
          'IFC (ICC) and NFPA codes may both apply; local amendments take precedence',
        ],
        quiz: [
          {
            q: 'Which organization is responsible for enforcing fire code requirements and approving fire alarm system plans and installations?',
            a: ['UL (Underwriters Laboratories)', 'NFPA (National Fire Protection Association)', 'The AHJ (Authority Having Jurisdiction)', 'FM Approvals'],
            correct: 2,
            exp: 'The AHJ — typically the local fire marshal or fire department — is responsible for enforcing code requirements and approving plans before installation and accepting the system after final testing.',
          },
          {
            q: 'NFPA codes typically require that fire alarm and suppression equipment be:',
            a: [
              'Purchased from approved domestic manufacturers only',
              'Listed by a nationally recognized testing laboratory (NRTL) such as UL',
              'Approved by the national NFPA committee before each installation',
              'Inspected by an insurance carrier before installation',
            ],
            correct: 1,
            exp: 'NFPA codes generally require that equipment be listed by a nationally recognized testing laboratory (NRTL) such as UL or FM Approvals. Listing confirms the product has been tested to applicable safety and performance standards.',
          },
        ],
      },
      {
        title: 'NICET Certification',
        body: [
          'NICET (National Institute for Certification in Engineering Technologies) offers a nationally recognized certification program for fire alarm systems technicians. The NICET Fire Alarm Systems certification has four levels, with Level I being entry-level and Level IV representing senior engineering-level expertise.',
          'NICET Level I requires basic knowledge under direct supervision with no minimum experience requirement. Level II requires passing a written examination and demonstrating 2 years of work experience; it is the common journeyman standard recognized by many jurisdictions as the minimum for technicians working independently.',
          'NICET Level III requires 5 years of experience (with some years in a senior technician role) and a more advanced examination covering system design, code interpretation, and project management. Level IV requires 10 years of experience and represents engineering-level fire alarm system design and review capability.',
          'Many states and jurisdictions require NICET Level II (or equivalent state license) for fire alarm technicians working independently. NICET certification is renewable every 3 years through continuing education or retesting. Complementary credentials include NICET Water-Based Systems, state-specific fire alarm licenses, and the CFPE from SFPE.',
        ],
        keyPoints: [
          'NICET Fire Alarm: 4 levels; Level II is common journeyman standard (2 years experience + exam)',
          'Level III: 5 years experience; Level IV: 10 years — engineering-level design capability',
          'NICET certification renewed every 3 years via continuing education or retesting',
          'Many jurisdictions require NICET Level II or equivalent state license to work independently',
        ],
        quiz: [
          {
            q: 'NICET Level II fire alarm certification is commonly considered the minimum for:',
            a: [
              'Entry-level helpers working under direct supervision',
              'Field technicians working independently on fire alarm systems',
              'Engineers designing fire alarm systems',
              'Inspectors reviewing plans for the AHJ',
            ],
            correct: 1,
            exp: 'NICET Level II is widely recognized as the journeyman-level standard. Many state licensing laws require Level II for technicians who install, service, or inspect fire alarm systems without direct supervision.',
          },
          {
            q: 'NICET certifications must be renewed every:',
            a: ['1 year', '2 years', '3 years', '5 years'],
            correct: 2,
            exp: 'NICET certifications are valid for 3 years and must be renewed through continuing education units or retesting to ensure technicians remain current with evolving codes and technology.',
          },
        ],
      },
      {
        title: 'Career Outlook & Professional Development',
        body: [
          'The Bureau of Labor Statistics (BLS) classifies fire alarm system installers and repairers under Electrical and Electronics Installers and Repairers. The median annual wage is approximately $63,000 to $65,000, with experienced technicians and those with NICET III/IV certifications earning significantly more.',
          'The BLS projects employment growth of approximately 5 to 7 percent over the 10-year outlook period for fire alarm and electrical installation occupations, driven by new construction, code updates requiring retrofit of existing buildings, and adoption of connected building technologies.',
          'Career advancement paths include field technician, lead technician, project manager, systems designer, sales engineer, and fire protection engineer. NICET certification, state licenses, and credentials such as CFPE (Certified Fire Protection Engineer from SFPE) open progressively advanced roles.',
          'Fire protection work is governed not only by NFPA codes but also by OSHA 29 CFR 1926 (construction safety) and 29 CFR 1910 (general industry). Technicians working at heights, in confined spaces, or with energized equipment must be trained in relevant OSHA standards.',
        ],
        keyPoints: [
          'BLS median: approximately $63,000-$65,000; NICET III/IV and experience increase earnings',
          '5-7% employment growth projected; driven by new construction and retrofit requirements',
          'Career path: field tech -> lead tech -> project manager -> designer -> fire protection engineer',
          'NICET certification, state licenses, and SFPE CFPE credential advance career progression',
        ],
        quiz: [
          {
            q: 'The BLS projects employment growth for fire alarm installers and repairers at approximately:',
            a: ['1-2%', '3-4%', '5-7%', '10-12%'],
            correct: 2,
            exp: 'The BLS projects approximately 5 to 7 percent employment growth for fire alarm installers over the 10-year outlook period, driven by new construction, building retrofits, and evolving codes.',
          },
          {
            q: 'Which advanced fire protection credential is awarded by the Society of Fire Protection Engineers (SFPE)?',
            a: ['NICET Level IV', 'CFPE (Certified Fire Protection Engineer)', 'CFAA (Certified Fire Alarm Administrator)', 'FPE (Fire Protection Examiner)'],
            correct: 1,
            exp: 'The CFPE (Certified Fire Protection Engineer) credential is awarded by the SFPE and represents engineering-level mastery of fire protection. It typically requires a PE license or equivalent engineering background.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'The AHJ for fire alarm and suppression systems is typically:',
        a: ['The property owner or their representative', 'The local fire marshal or fire department', 'The NFPA code committee', 'The installing contractor'],
        correct: 1,
        exp: 'The AHJ is typically the local fire marshal, fire department, or building department. They review and approve plans before installation and authorize the system to be placed in service.',
      },
      {
        q: 'NFPA codes require that fire alarm and suppression equipment be:',
        a: ['Purchased from U.S. manufacturers only', 'Listed by a recognized testing laboratory such as UL', 'Approved by the local fire marshal individually', 'Covered by a manufacturer warranty of at least 5 years'],
        correct: 1,
        exp: 'NFPA codes require that equipment be listed by a nationally recognized testing laboratory (NRTL) such as UL or FM Approvals.',
      },
      {
        q: 'FM Approvals (Factory Mutual) listing is particularly significant in:',
        a: ['Residential occupancies', 'Industrial and commercial property applications', 'Government and military facilities', 'Healthcare occupancies only'],
        correct: 1,
        exp: 'FM Approvals is a major listing organization for industrial and commercial applications. Large insurers and industrial property owners frequently specify FM-approved equipment.',
      },
      {
        q: 'NICET Level II fire alarm certification requires:',
        a: ['10 years of experience and a design examination', '2 years of experience and a written examination', 'A state engineering license', 'Completion of a 4-year apprenticeship'],
        correct: 1,
        exp: 'NICET Level II requires passing a written examination and demonstrating approximately 2 years of relevant work experience. It is the common journeyman standard for independent fire alarm technicians.',
      },
      {
        q: 'How often must NICET fire alarm certifications be renewed?',
        a: ['Every year', 'Every 2 years', 'Every 3 years', 'Every 5 years'],
        correct: 2,
        exp: 'NICET certifications are valid for 3 years and must be renewed through continuing education or retesting.',
      },
      {
        q: 'The BLS median wage for fire alarm installers and repairers is approximately:',
        a: ['$40,000-$45,000', '$55,000-$60,000', '$63,000-$65,000', '$80,000-$90,000'],
        correct: 2,
        exp: 'The BLS reports a median annual wage of approximately $63,000 to $65,000 for fire alarm installers and repairers. Experienced technicians with NICET III/IV or supervisory roles typically earn more.',
      },
      {
        q: 'The CFPE (Certified Fire Protection Engineer) credential is awarded by:',
        a: ['NICET', 'NFPA', 'SFPE (Society of Fire Protection Engineers)', 'ICC (International Code Council)'],
        correct: 2,
        exp: 'The CFPE is awarded by the Society of Fire Protection Engineers (SFPE) and represents the highest level of fire protection expertise.',
      },
      {
        q: 'Which NFPA code primarily governs fire code enforcement including fire alarm requirements for building occupancies?',
        a: ['NFPA 13', 'NFPA 25', 'NFPA 72', 'NFPA 1'],
        correct: 3,
        exp: 'NFPA 1, the Fire Code, is the comprehensive fire code governing occupancy requirements. NFPA 72 is the technical standard for fire alarm systems referenced by NFPA 1.',
      },
      {
        q: 'For fire alarm technicians working at height or in confined spaces, which OSHA standards apply?',
        a: ['OSHA 29 CFR 1910 and 29 CFR 1926', 'OSHA 29 CFR 1904 only', 'Only state OSHA standards apply', 'NFPA 70E exclusively governs electrical safety'],
        correct: 0,
        exp: 'Fire alarm technicians must comply with OSHA 29 CFR 1910 (general industry) and 29 CFR 1926 (construction industry) as applicable. These cover fall protection, confined space entry, ladder safety, and PPE requirements.',
      },
      {
        q: 'NICET Level IV fire alarm certification requires approximately how many years of experience?',
        a: ['2 years', '5 years', '8 years', '10 years'],
        correct: 3,
        exp: 'NICET Level IV requires approximately 10 years of fire alarm experience at progressively senior levels. It represents engineering-level system design and review capability.',
      },
    ],
  },
];
