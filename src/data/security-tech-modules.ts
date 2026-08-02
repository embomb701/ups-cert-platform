import type { TrainingModule } from './modules';

export const SECURITY_TECH_MODULES: TrainingModule[] = [
  {
    id: 'sec-fundamentals',
    num: 11,
    title: 'Security Systems Fundamentals',
    desc: 'Core principles of electronic security: system types, UL ratings, NFPA 731, and industry standards.',
    slides: [
      {
        title: 'Electronic Security Overview',
        body: [
          'Electronic security systems protect people and property through detection, deterrence, and response. Field technicians install, commission, and maintain access control, video surveillance, intrusion detection, and life safety systems across residential, commercial, and critical infrastructure markets.',
          'Integrated systems connect all four disciplines on a unified platform, allowing a single event — a door forced open — to trigger camera recording, send an alert, and log an access violation simultaneously.',
        ],
        keyPoints: [
          'Four pillars: access control, CCTV, intrusion detection, life safety',
          'Field techs install, commission, test, and service all four disciplines',
          'UL listing differentiates commercial-grade from residential products',
          'ESA (Electronic Security Association) is the primary trade organization',
        ],
        quiz: [
          {
            q: 'Which organization is the primary trade association for electronic security installation professionals?',
            a: ['ASIS International', 'ESA — Electronic Security Association', 'NFPA', 'CompTIA Security+'],
            correct: 1,
            exp: 'ESA (Electronic Security Association) is the trade group focused on alarm and security installation companies; ASIS is more corporate security management oriented.',
          },
        ],
      },
      {
        title: 'UL Certifications & Grading',
        body: [
          'Underwriters Laboratories (UL) certifies security products and central station monitoring centers. UL 681 covers burglar alarm installation standards; UL 2050 governs central station services. A UL-listed system carries insurance and liability benefits for the end user.',
          'Alarm systems are graded by response time and defeat resistance. Grade A (residential) through Grade AA (highest commercial/government) define monitoring requirements, backup power duration, and tamper protection levels.',
        ],
        keyPoints: [
          'UL 681 — burglar alarm installation standards',
          'UL 2050 — central station monitoring certification',
          'Higher UL grade = more stringent monitoring and tamper requirements',
          'UL listing affects insurance premiums and liability for the customer',
        ],
        quiz: [
          {
            q: 'Which UL standard governs burglar alarm installation requirements?',
            a: ['UL 2050', 'UL 681', 'UL 294', 'UL 1076'],
            correct: 1,
            exp: 'UL 681 covers the installation, classification, and certification of burglar alarm systems. UL 2050 governs central station monitoring services.',
          },
        ],
      },
      {
        title: 'NFPA 731 & Industry Codes',
        body: [
          'NFPA 731, Standard for the Installation of Electronic Premises Security Systems, provides installation requirements for intrusion, access control, and video surveillance systems. It parallels NFPA 72 (fire alarm) in structure and is adopted by many jurisdictions as the baseline security installation code.',
          'Additional relevant codes include NEC Article 725 (Class 2 and 3 wiring), NEC Article 800 (communications wiring), and local municipality false alarm ordinances that impose fines after repeated unverified alarms.',
        ],
        keyPoints: [
          'NFPA 731 — installation standard for electronic security systems',
          'NEC Article 725 — Class 2/3 low-voltage power-limited wiring',
          'NEC Article 800 — communications and data cabling in buildings',
          'False alarm ordinances impose fines; verified alarm programs reduce dispatches',
        ],
        quiz: [
          {
            q: 'Which NFPA standard covers the installation of electronic premises security systems?',
            a: ['NFPA 72', 'NFPA 101', 'NFPA 731', 'NFPA 13'],
            correct: 2,
            exp: 'NFPA 731 is specifically for electronic premises security (intrusion, access control, video). NFPA 72 covers fire alarm and signaling systems.',
          },
        ],
      },
      {
        title: 'Low-Voltage Wiring Fundamentals',
        body: [
          'Most security devices operate on low-voltage DC power (12 VDC or 24 VDC) over Class 2 circuits limited to 100 VA. Common conductors include 22 AWG 2-conductor (contact loops), 18/2 (PIR power), 22/4 shielded (RS-485 buses), and CAT6 (IP cameras and access readers).',
          'Proper supervision wiring uses end-of-line (EOL) resistors (typically 1 kΩ–4.7 kΩ) to detect open and short faults on detector loops. The panel monitors loop resistance continuously; a short triggers an alarm, an open triggers a trouble.',
        ],
        keyPoints: [
          '12 VDC / 24 VDC are the two dominant supply voltages for security devices',
          'Class 2 wiring — power limited to 100 VA; no conduit required in most cases',
          'EOL resistor (1 kΩ–4.7 kΩ) detects both open and short faults on supervised loops',
          'CAT6 cabling supports PoE IP cameras and OSDP access readers',
        ],
        quiz: [
          {
            q: 'What is the function of an end-of-line (EOL) resistor in a supervised detector loop?',
            a: [
              'Limit current to protect the detector',
              'Allow the panel to detect both open and short circuit faults',
              'Balance impedance for long cable runs',
              'Step down 24 VDC to 12 VDC for the sensor',
            ],
            correct: 1,
            exp: 'An EOL resistor sits at the far end of the loop, allowing the panel to measure loop resistance. A short drops resistance (alarm), an open raises resistance (trouble), and normal resistance means the zone is secure.',
          },
        ],
      },
      {
        title: 'Power Supplies & Backup Power',
        body: [
          'Security panels include a primary 120 VAC transformer and a standby sealed lead-acid (SLA) battery. UL requires 4 hours of standby power for residential systems and 24 hours for commercial Grade AA installations. Battery capacity is sized based on panel current draw plus all peripheral loads.',
          'Auxiliary power supplies (APS) expand capacity for high-current peripherals like magnetic locks and powered door hardware. Each APS has its own transformer and battery, independently supervised by the access control controller.',
        ],
        keyPoints: [
          'Residential UL requires 4 hours standby; commercial Grade AA requires 24 hours',
          'SLA (sealed lead-acid) is the standard backup battery chemistry',
          'Battery sizing = (panel quiescent current + all peripheral loads) × standby hours',
          'Auxiliary power supplies expand current capacity for mag-locks and door hardware',
        ],
        quiz: [
          {
            q: 'A commercial Grade AA UL-listed security system requires a minimum standby battery duration of:',
            a: ['4 hours', '8 hours', '12 hours', '24 hours'],
            correct: 3,
            exp: 'UL Grade AA (highest commercial/government) requires 24 hours of standby power. Residential Grade A systems require only 4 hours.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'NFPA 731 covers the installation of which types of systems?',
        a: ['Fire sprinkler and suppression systems', 'Intrusion, access control, and video surveillance systems', 'Fire alarm and emergency communications', 'Nurse call and patient monitoring systems'],
        correct: 1,
        exp: 'NFPA 731 is dedicated to electronic premises security: intrusion, access control, and CCTV. Fire alarm is NFPA 72.',
      },
      {
        q: 'Which UL standard certifies central station monitoring services?',
        a: ['UL 681', 'UL 294', 'UL 2050', 'UL 1076'],
        correct: 2,
        exp: 'UL 2050 certifies central station monitoring facilities. UL 681 is the burglar alarm installation standard.',
      },
      {
        q: 'A supervised zone loop with an EOL resistor reads normal resistance. What does this indicate?',
        a: ['The zone is in alarm', 'The zone is in a fault/trouble condition', 'The zone is secure and intact', 'The EOL resistor has failed'],
        correct: 2,
        exp: 'Normal loop resistance (matching the EOL resistor value) means the zone is secure. A short causes alarm; an open causes trouble.',
      },
      {
        q: 'Which NEC article governs Class 2 and Class 3 power-limited wiring used for security devices?',
        a: ['NEC Article 800', 'NEC Article 725', 'NEC Article 760', 'NEC Article 300'],
        correct: 1,
        exp: 'NEC Article 725 covers Class 2 and Class 3 remote-control and low-voltage signaling circuits. Article 800 covers communications; Article 760 covers fire alarm wiring.',
      },
      {
        q: 'What is the typical supply voltage for most commercial security peripherals?',
        a: ['5 VDC', '9 VDC', '12 VDC or 24 VDC', '48 VDC'],
        correct: 2,
        exp: '12 VDC and 24 VDC are the two dominant supply voltages. 12 V is common in residential; 24 V is preferred for commercial due to lower current for the same power.',
      },
      {
        q: 'An auxiliary power supply (APS) in an access control system is used to:',
        a: ['Provide backup internet connectivity', 'Expand current capacity for mag-locks and powered door hardware', 'Convert 24 VDC to 12 VDC for legacy devices', 'Replace the main panel transformer'],
        correct: 1,
        exp: 'APS units add current capacity for high-draw devices like magnetic locks (typically 300–600 mA each) that would exceed the main panel\'s auxiliary output rating.',
      },
      {
        q: 'False alarm ordinances primarily affect security companies by:',
        a: ['Requiring annual UL re-certification', 'Imposing fines after repeated unverified police dispatches', 'Mandating 24-hour standby battery', 'Restricting installation to licensed electricians only'],
        correct: 1,
        exp: 'Municipalities impose false alarm fines on property owners and sometimes on alarm companies after repeated unverified dispatches, incentivizing verified alarm programs.',
      },
      {
        q: 'What type of battery is standard for security panel standby power?',
        a: ['Lithium-ion (Li-ion)', 'Nickel-metal hydride (NiMH)', 'Sealed lead-acid (SLA)', 'Absorbent glass mat AGM only'],
        correct: 2,
        exp: 'Sealed lead-acid (SLA) batteries are the industry standard for security panel backup due to cost, reliability, and UL compatibility. AGM is a subtype of SLA.',
      },
      {
        q: 'Which cabling is preferred for connecting IP cameras and OSDP access readers?',
        a: ['22 AWG 2-conductor unshielded', '18 AWG 4-conductor shielded', 'CAT6 UTP', 'RG-59 coaxial'],
        correct: 2,
        exp: 'CAT6 supports PoE (Power over Ethernet) for IP cameras and OSDP (Open Supervised Device Protocol) readers, carrying both data and power on a single cable.',
      },
      {
        q: 'The primary trade organization for electronic security installation companies is:',
        a: ['IEEE', 'ASIS International', 'ESA — Electronic Security Association', 'BICSI'],
        correct: 2,
        exp: 'ESA (Electronic Security Association) represents alarm and security installation companies. ASIS is for corporate security management professionals.',
      },
    ],
  },
  {
    id: 'sec-access-control',
    num: 12,
    title: 'Access Control Systems',
    desc: 'Card readers, controllers, credentials, door hardware, and OSDP communication for enterprise access control.',
    slides: [
      {
        title: 'Access Control Architecture',
        body: [
          'An access control system grants or denies entry based on credential verification. The three core components are: the credential (card, fob, PIN, biometric), the reader (captures credential data), and the controller (makes the grant/deny decision and activates door hardware).',
          'Enterprise systems use a client-server architecture: field panels communicate over TCP/IP to an access control software server, which stores cardholder databases, schedules, and audit trails. Edge processing on smart readers eliminates single-point-of-failure dependence on the server.',
        ],
        keyPoints: [
          'Three-layer model: credential → reader → controller → door hardware',
          'Controllers store access rules and cardholder data for offline operation',
          'TCP/IP backbone connects distributed field panels to a central server',
          'Smart readers (edge processing) grant access even when the server is offline',
        ],
        quiz: [
          {
            q: 'Which access control component makes the final grant or deny decision?',
            a: ['The credential (card)', 'The card reader', 'The access control controller', 'The server software'],
            correct: 2,
            exp: 'The controller stores cardholder records, access levels, and schedules. It compares the presented credential to its database and sends the output signal to unlock the door.',
          },
        ],
      },
      {
        title: 'Credential Technologies',
        body: [
          'Legacy 125 kHz proximity cards (HID Prox, EM4100) transmit a fixed card number with no encryption, making them vulnerable to skimming. Modern 13.56 MHz smart cards (HID iCLASS, MIFARE DESFire EV2) use mutual authentication and AES-128 encryption, preventing cloning.',
          'Mobile credentials (Bluetooth Low Energy and NFC) store a digital credential on a smartphone, enabling tap-or-twist-to-open interactions. BLE offers longer range (up to 3 m hands-free), while NFC requires close proximity (< 5 cm) similar to contactless payment.',
        ],
        keyPoints: [
          '125 kHz prox cards — no encryption; susceptible to skimming and cloning',
          '13.56 MHz smart cards (DESFire EV2) — AES-128 mutual authentication',
          'Mobile credentials use BLE (long range) or NFC (< 5 cm) on smartphones',
          'Always recommend upgrading from 125 kHz to 13.56 MHz for new deployments',
        ],
        quiz: [
          {
            q: 'Why are 125 kHz proximity cards considered a security risk?',
            a: [
              'They require a battery that can fail',
              'They transmit an unencrypted fixed card number that can be skimmed',
              'They only work within 1 cm of the reader',
              'They are incompatible with OSDP readers',
            ],
            correct: 1,
            exp: '125 kHz cards broadcast a fixed, unencrypted card number; inexpensive skimming devices can capture and clone the credential from several centimeters away.',
          },
        ],
      },
      {
        title: 'Wiegand vs. OSDP',
        body: [
          'Wiegand (26-bit standard, up to 256-bit proprietary) is a one-way, unencrypted protocol that has connected readers to controllers for decades. It transmits card data in the clear with no tamper detection, making it vulnerable to data interception and replay attacks.',
          'OSDP (Open Supervised Device Protocol, IEC 60839-11-5) is a bi-directional RS-485 bus that supports AES-128 encrypted communication, tamper supervision, remote diagnostics, and LED/buzzer control from the controller. PSIA and SIA mandate OSDP for new federal government installations.',
        ],
        keyPoints: [
          'Wiegand — one-way, unencrypted; standard for legacy systems; 50 ft max run',
          'OSDP — bi-directional RS-485; AES-128 encrypted; up to 4,000 ft bus length',
          'OSDP supports remote diagnostics, firmware updates, and reader LED control',
          'Federal installations now require OSDP per PACS (Physical Access Control) guidelines',
        ],
        quiz: [
          {
            q: 'What is the primary security advantage of OSDP over Wiegand?',
            a: [
              'OSDP supports longer cable runs',
              'OSDP provides AES-128 encrypted, bi-directional communication with tamper detection',
              'OSDP works at a higher frequency than Wiegand',
              'OSDP eliminates the need for a controller',
            ],
            correct: 1,
            exp: 'OSDP encrypts the credential data in transit and provides bi-directional supervision, preventing interception and replay attacks that are possible with Wiegand.',
          },
        ],
      },
      {
        title: 'Door Hardware & Electric Strikes',
        body: [
          'Electric strikes replace the fixed strike plate in a door frame, allowing the latch to retract when energized. Fail-secure strikes (normally locked) require power to unlock — used on high-security doors. Fail-safe strikes (normally unlocked) require power to lock — required on fire egress doors per NFPA 101.',
          'Magnetic locks (maglocks) hold 600–1,200 lbf when energized and release instantly on power loss (inherently fail-safe). They require a request-to-exit (REX) sensor, a door position switch (DPS), and a pull station or motion detector on the egress side for life safety compliance.',
        ],
        keyPoints: [
          'Fail-secure = locked on power loss (high security; not for egress paths)',
          'Fail-safe = unlocked on power loss (required on fire egress doors — NFPA 101)',
          'Maglocks are inherently fail-safe; REX + DPS sensors are mandatory',
          'Door position switch (DPS) detects door held open or forced open conditions',
        ],
        quiz: [
          {
            q: 'A door on a required fire egress path must use which type of electric locking hardware?',
            a: ['Fail-secure electric strike', 'Fail-safe magnetic lock or electric strike', 'Double-cylinder deadbolt with key override', 'Motor-driven bolt lock'],
            correct: 1,
            exp: 'NFPA 101 Life Safety Code requires that egress doors unlock automatically on power failure, so fail-safe hardware is mandatory on all required egress paths.',
          },
        ],
      },
      {
        title: 'Access Control Commissioning',
        body: [
          'Commissioning begins with verifying all controller power, network connectivity, and panel communication. Each door is tested through the full cycle: card read → access granted → door unlocks → door contact opens → door closes → relocks. Anti-passback, duress codes, and extended-unlock timers are verified per the project schedule.',
          'The final acceptance test documents all access levels, cardholder enrollments, and alarm outputs. Request-to-exit (REX) delay, door-held-open alarms, and forced-door alarms are tested at each opening before the customer sign-off.',
        ],
        keyPoints: [
          'Full door cycle test: credential → grant → unlock → contact open → relock',
          'Verify anti-passback, duress code, and extended-access timers per schedule',
          'Test REX delay, door-held-open alarm, and forced-door alarm at every door',
          'Customer acceptance sign-off documents all tested functions',
        ],
        quiz: [
          {
            q: 'What does "anti-passback" prevent in an access control system?',
            a: [
              'Tailgating through an open door',
              'A credential being used to exit before it has been used to enter (or vice versa)',
              'A reader from accepting cards from multiple cardholders simultaneously',
              'Unauthorized credential cloning',
            ],
            correct: 1,
            exp: 'Anti-passback enforces entry/exit sequencing: a card used to enter a zone cannot re-enter until it has been used to exit, preventing credential sharing (one person badging in, handing the card back through the door).',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Which credential technology uses AES-128 mutual authentication to prevent cloning?',
        a: ['125 kHz proximity card', '13.56 MHz smart card (DESFire EV2)', 'Magnetic stripe card', 'Wiegand 26-bit card'],
        correct: 1,
        exp: '13.56 MHz smart cards like MIFARE DESFire EV2 use AES-128 mutual authentication, making cloning practically impossible compared to 125 kHz prox cards.',
      },
      {
        q: 'OSDP communicates over which physical layer?',
        a: ['Wiegand D0/D1 lines', 'RS-232 serial', 'RS-485 multi-drop bus', 'CAT6 Ethernet'],
        correct: 2,
        exp: 'OSDP runs over an RS-485 multi-drop bus, allowing up to 32 devices on one bus at cable lengths up to 4,000 ft, compared to Wiegand\'s 50 ft one-way limit.',
      },
      {
        q: 'A fail-secure electric strike is best suited for:',
        a: ['Fire egress stairwell doors', 'Server room doors where security is the priority', 'Emergency exit doors with panic hardware', 'Exterior doors with ADA automatic openers'],
        correct: 1,
        exp: 'Fail-secure means the door stays locked when power is lost, providing maximum security for sensitive areas. It cannot be used on required egress paths.',
      },
      {
        q: 'A magnetic lock requires which sensors for life safety compliance?',
        a: ['REX sensor and door position switch (DPS)', 'Motion detector only', 'EOL resistor and smoke detector', 'Proximity reader and keypad'],
        correct: 0,
        exp: 'Maglocks require a request-to-exit (REX) sensor to allow free egress and a door position switch (DPS) to detect held-open or forced-open conditions.',
      },
      {
        q: 'Anti-passback prevents:',
        a: ['Tailgating through a propped door', 'Credential sharing by enforcing entry/exit sequencing', 'Cloning of 125 kHz credentials', 'Replay attacks on Wiegand lines'],
        correct: 1,
        exp: 'Anti-passback enforces entry/exit sequencing: a card cannot re-enter a zone without first exiting, preventing one credential from being passed back to a second person.',
      },
      {
        q: 'What is the maximum recommended cable run for a Wiegand reader to controller connection?',
        a: ['10 ft', '50 ft', '500 ft', '4,000 ft'],
        correct: 1,
        exp: 'Wiegand is limited to approximately 50 ft due to signal attenuation on the open-collector D0/D1 lines. OSDP on RS-485 supports up to 4,000 ft.',
      },
      {
        q: 'Mobile credentials using NFC require the phone to be:',
        a: ['Within 3 meters of the reader', 'Within 5 cm of the reader', 'Connected to Wi-Fi', 'Paired via Bluetooth first'],
        correct: 1,
        exp: 'NFC operates at very short range (< 5 cm), similar to contactless payment. BLE credentials offer longer range (up to 3 m) for hands-free access.',
      },
      {
        q: 'Which component in an access control system stores cardholder records for offline operation?',
        a: ['The card reader', 'The server software', 'The access control controller/panel', 'The door position switch'],
        correct: 2,
        exp: 'Controllers cache cardholder databases and access rules locally so doors continue to function when the server is offline or the network is down.',
      },
      {
        q: 'Which federal protocol mandates OSDP for new government access control installations?',
        a: ['FIPS 201 / PACS guidelines', 'NFPA 731', 'UL 294', 'IEC 62368'],
        correct: 0,
        exp: 'FIPS 201 and the associated PACS (Physical Access Control System) implementation guidelines now mandate OSDP for new federal government door controller–to-reader communication.',
      },
      {
        q: 'During a door commissioning test, which sequence is correct?',
        a: [
          'Credential presented → door unlocks → card data encrypted → REX tested',
          'Credential presented → access granted → door unlocks → contact opens → door closes → relocks',
          'REX pressed → contact opens → credential presented → door locks',
          'Server grants access → controller notified → credential clears anti-passback',
        ],
        correct: 1,
        exp: 'The correct commissioning cycle is: present credential → controller grants access → strike/lock energizes → door contact opens (verifying the door opened) → door closes → lock re-engages.',
      },
    ],
  },
  {
    id: 'sec-cctv',
    num: 13,
    title: 'CCTV & Video Surveillance',
    desc: 'IP camera architecture, PoE, H.265 compression, NVR/VMS design, and camera placement principles.',
    slides: [
      {
        title: 'IP Camera Fundamentals',
        body: [
          'Modern video surveillance uses IP cameras that encode video at the camera head and transmit compressed streams over standard Ethernet networks. Image sensors are either CMOS (most common, low cost, low power) or CCD (older, better low-light, higher cost). Resolution is expressed in megapixels: 2 MP (1080p), 4 MP (1440p), 8 MP (4K/UHD).',
          'Camera form factors include fixed dome (tamper-resistant, indoor), bullet (outdoor weatherproof, long range), PTZ (pan-tilt-zoom, motorized), fisheye (360° coverage), and multi-imager (multiple sensors in one housing). Each form factor suits specific coverage and deterrence requirements.',
        ],
        keyPoints: [
          '2 MP = 1080p; 4 MP = 1440p; 8 MP = 4K — more pixels means more storage',
          'CMOS sensors dominate modern IP cameras; CCD is legacy',
          'Dome = tamper-resistant indoor; Bullet = outdoor long range; PTZ = motorized',
          'Fisheye provides 180°/360° coverage with dewarping software',
        ],
        quiz: [
          {
            q: 'A camera with a resolution of 8 MP is equivalent to which video standard?',
            a: ['1080p Full HD', '1440p Quad HD', '4K Ultra HD', '720p HD'],
            correct: 2,
            exp: '8 megapixels corresponds to 4K (3840 × 2160) UHD resolution. 2 MP = 1080p, 4 MP ≈ 1440p.',
          },
        ],
      },
      {
        title: 'Power over Ethernet (PoE)',
        body: [
          'PoE delivers DC power over CAT5e/CAT6 cable, eliminating separate power runs to each camera. IEEE 802.3af (PoE) provides up to 15.4 W per port; IEEE 802.3at (PoE+) provides up to 30 W; IEEE 802.3bt (PoE++) provides up to 90 W for PTZ cameras and multi-imager units.',
          'The PoE switch (PSE — Power Sourcing Equipment) negotiates power with the camera (PD — Powered Device) using a handshake protocol. Total switch budget must account for all connected PDs plus a 20% safety margin. Long cable runs (> 200 ft on 23 AWG CAT6) cause voltage drop that may reduce actual available power.',
        ],
        keyPoints: [
          '802.3af — 15.4 W; 802.3at — 30 W; 802.3bt — up to 90 W per port',
          'PSE (switch) sources power; PD (camera) receives power',
          'Plan switch budget: sum all camera wattages + 20% margin',
          'CAT6 23 AWG recommended for runs > 200 ft to minimize voltage drop',
        ],
        quiz: [
          {
            q: 'A PTZ camera requires 45 W. Which PoE standard must the switch support?',
            a: ['IEEE 802.3af (PoE)', 'IEEE 802.3at (PoE+)', 'IEEE 802.3bt (PoE++)', 'Standard Ethernet with a midspan injector'],
            correct: 2,
            exp: '802.3af maxes at 15.4 W and 802.3at at 30 W. A 45 W device requires 802.3bt (PoE++) which supports up to 90 W per port.',
          },
        ],
      },
      {
        title: 'Video Compression: H.264 vs. H.265',
        body: [
          'H.264 (MPEG-4 AVC) is the baseline compression standard, providing good quality at moderate bit rates. H.265 (HEVC) delivers the same image quality at approximately 50% of the H.264 bit rate, significantly reducing storage and bandwidth requirements at the cost of higher encoder/decoder CPU load.',
          'Smart codecs (H.265+ and H.264+) add motion-adaptive bit rate control: the bit rate drops when the scene is static and increases when motion is detected. This can reduce storage requirements by 50–75% compared to standard H.264 in typical low-motion environments.',
        ],
        keyPoints: [
          'H.265 uses ~50% less bandwidth than H.264 at equivalent quality',
          'Smart codecs (H.265+) adapt bit rate to scene motion — less storage in quiet areas',
          'Higher resolution + H.265 = better detail than lower resolution + H.264',
          'All cameras, NVRs, and VMS software must support the same codec',
        ],
        quiz: [
          {
            q: 'Compared to H.264, H.265 compression achieves the same video quality using approximately:',
            a: ['25% of the bit rate', '50% of the bit rate', '75% of the bit rate', '100% of the bit rate (no difference)'],
            correct: 1,
            exp: 'H.265 (HEVC) typically achieves the same perceptual video quality as H.264 at approximately 50% of the bit rate, cutting storage and bandwidth requirements in half.',
          },
        ],
      },
      {
        title: 'NVR, VMS & Storage Design',
        body: [
          'A Network Video Recorder (NVR) is a dedicated appliance that records IP camera streams to internal or attached storage. A Video Management System (VMS) is software-based and runs on server hardware, offering greater scalability, analytics integration, and multi-site management.',
          'Storage sizing uses the formula: Storage (TB) = (bit rate in Mbps × 0.0075) × number of cameras × retention days. A 2 MP H.265 camera at 2 Mbps recording 30 days requires approximately 0.45 TB. RAID 5 or RAID 6 provides redundancy; hot spares protect against multiple drive failures.',
        ],
        keyPoints: [
          'NVR = dedicated appliance; VMS = scalable software on server hardware',
          'Storage (TB) = bit rate (Mbps) × 0.0075 × cameras × retention days',
          'RAID 5 tolerates 1 drive failure; RAID 6 tolerates 2 simultaneous drive failures',
          'Retention requirements: 30 days standard, 90 days for high-security areas',
        ],
        quiz: [
          {
            q: 'Using the storage formula, a single 2 MP H.265 camera recording at 2 Mbps for 30 days requires approximately:',
            a: ['0.45 TB', '1.5 TB', '4.5 TB', '0.045 TB'],
            correct: 0,
            exp: '2 Mbps × 0.0075 × 1 camera × 30 days = 0.45 TB. The factor 0.0075 converts Mbps-days to terabytes.',
          },
        ],
      },
      {
        title: 'Camera Placement & Coverage Design',
        body: [
          'Effective camera coverage requires matching lens focal length to scene width and distance. Wide-angle lenses (2.8 mm–4 mm) cover large areas at close range; telephoto lenses (12 mm–50 mm) provide detail at distance. The Dallmeier JDVS and IEC 62676-4 standards define pixel density requirements for identification (250 PPM), recognition (62 PPM), and detection (12 PPM).',
          'Critical placement rules: cameras should face away from direct sunlight and bright light sources to prevent backlight washout, be positioned at 2.4–3 m mounting height for facial recognition, and cover all entry/exit chokepoints. Overlapping coverage eliminates blind spots and provides redundant evidence.',
        ],
        keyPoints: [
          'Identification quality requires 250 pixels per meter (PPM) at the target',
          '2.8–4 mm lens for wide coverage; 12–50 mm for long-distance detail',
          'Mount at 2.4–3 m for optimal facial recognition angle',
          'Avoid backlight from windows and exterior glare; use WDR cameras if unavoidable',
        ],
        quiz: [
          {
            q: 'Which pixel density standard is required for positive facial identification in video surveillance?',
            a: ['12 PPM (pixels per meter)', '62 PPM', '125 PPM', '250 PPM'],
            correct: 3,
            exp: 'IEC 62676-4 defines 250 PPM as the minimum pixel density for positive identification. 62 PPM allows recognition; 12 PPM is sufficient only for detection of presence.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Which PoE standard delivers up to 30 W per port?',
        a: ['IEEE 802.3af', 'IEEE 802.3at', 'IEEE 802.3bt', 'IEEE 802.3ab'],
        correct: 1,
        exp: 'IEEE 802.3at (PoE+) delivers up to 30 W. 802.3af is 15.4 W; 802.3bt is up to 90 W.',
      },
      {
        q: 'H.265 compression reduces storage requirements compared to H.264 by approximately:',
        a: ['10–15%', '25–30%', '50%', '80%'],
        correct: 2,
        exp: 'H.265 (HEVC) delivers equivalent quality at roughly 50% of the H.264 bit rate, halving storage and bandwidth needs.',
      },
      {
        q: 'Using the storage formula (bit rate × 0.0075 × cameras × days), a 4-camera system at 4 Mbps per camera recording for 30 days requires:',
        a: ['1.8 TB', '3.6 TB', '7.2 TB', '14.4 TB'],
        correct: 1,
        exp: '4 Mbps × 0.0075 × 4 cameras × 30 days = 3.6 TB total storage required.',
      },
      {
        q: 'A camera is mounted facing a large window with bright exterior light. The best solution is:',
        a: ['Increase camera resolution to 4K', 'Use a camera with Wide Dynamic Range (WDR)', 'Switch to H.264 compression', 'Reduce the frame rate to 10 fps'],
        correct: 1,
        exp: 'Wide Dynamic Range (WDR) cameras use tone mapping to simultaneously expose bright and dark areas, preventing washout from backlight and window glare.',
      },
      {
        q: 'Pixel density for positive facial identification per IEC 62676-4 requires:',
        a: ['12 PPM', '62 PPM', '125 PPM', '250 PPM'],
        correct: 3,
        exp: '250 pixels per meter (PPM) is the IEC 62676-4 standard for positive identification. Lower densities support recognition (62 PPM) or detection (12 PPM) only.',
      },
      {
        q: 'A RAID 6 storage array can tolerate:',
        a: ['0 simultaneous drive failures', '1 simultaneous drive failure', '2 simultaneous drive failures', '3 simultaneous drive failures'],
        correct: 2,
        exp: 'RAID 6 uses dual parity, tolerating 2 simultaneous drive failures without data loss. RAID 5 tolerates only 1.',
      },
      {
        q: 'What is the primary benefit of a VMS (Video Management System) over a standalone NVR?',
        a: ['Lower cost per channel', 'No storage required', 'Greater scalability, analytics integration, and multi-site management', 'Faster recording at 60 fps'],
        correct: 2,
        exp: 'A VMS runs on server hardware and scales to thousands of cameras across multiple sites, with analytics, access control integration, and flexible storage management.',
      },
      {
        q: 'The ideal mounting height for facial recognition cameras is:',
        a: ['0.9–1.2 m (counter height)', '1.5–1.8 m (eye level)', '2.4–3 m', '4.5–6 m'],
        correct: 2,
        exp: 'Mounting at 2.4–3 m provides a downward angle that captures face detail without extreme perspective distortion or easy tampering.',
      },
      {
        q: 'Which camera form factor provides 360° panoramic coverage with a single lens?',
        a: ['Bullet', 'PTZ', 'Fisheye', 'Multi-imager'],
        correct: 2,
        exp: 'Fisheye cameras use an ultra-wide lens to capture a 360° or 180° view, which is then dewarped by the VMS or NVR into a flat or corridor-view image.',
      },
      {
        q: 'Smart codec technology (H.265+) reduces storage by:',
        a: ['Using a fixed low bit rate at all times', 'Increasing frame rate during low-motion periods', 'Dynamically reducing bit rate in static scenes and increasing it when motion is detected', 'Deleting older recordings automatically'],
        correct: 2,
        exp: 'Smart codecs apply motion-adaptive encoding: bit rate drops during static scenes (saving storage) and rises when motion is detected (preserving evidence quality).',
      },
    ],
  },
  {
    id: 'sec-intrusion',
    num: 14,
    title: 'Intrusion Detection Systems',
    desc: 'Control panels, detection devices, communication paths, and verification methods for commercial intrusion systems.',
    slides: [
      {
        title: 'Intrusion Panel Architecture',
        body: [
          'A commercial intrusion panel consists of a main control board, a keypad/annunciator, zone inputs, relay outputs, and a communication module. Hardwired zones (typically 8–64 per panel) accept detector loops with EOL resistors; wireless zones use RF receivers that pair to wireless sensors.',
          'Panels partition into areas (groups of zones that arm/disarm together), allowing a building with multiple tenants to have independent alarm areas on one panel. Partition design is documented in the system schedule and programmed via the keypad or a direct PC connection.',
        ],
        keyPoints: [
          'Main board + keypad + zone inputs + relay outputs + communicator',
          'EOL resistors supervise hardwired zones (open = trouble, short = alarm)',
          'Partitions allow independent arming/disarming of separate areas on one panel',
          'Zones are programmed as: entry/exit delay, instant, interior follower, 24-hour',
        ],
        quiz: [
          {
            q: 'What is the purpose of partitions in a commercial intrusion panel?',
            a: [
              'To physically separate wiring inside the panel enclosure',
              'To allow independent arming and disarming of separate areas on one system',
              'To divide the panel into primary and backup zones',
              'To prevent false alarms from cross-zone triggers',
            ],
            correct: 1,
            exp: 'Partitions (also called areas) allow multiple tenants or departments to independently arm and disarm their own zones without affecting other areas on the same panel.',
          },
        ],
      },
      {
        title: 'Detector Technologies',
        body: [
          'Passive infrared (PIR) detectors sense body heat movement across the detection pattern. Dual-technology (dual-tech) detectors combine PIR and microwave or ultrasonic sensing, requiring both technologies to trigger simultaneously — dramatically reducing false alarms in challenging environments (HVAC vents, moving curtains).',
          'Glass break detectors use acoustic analysis to identify the specific sound signature of breaking glass (< 10 kHz thud + > 10 kHz tinkle). Door/window contacts are the simplest detector: a normally closed (NC) magnetic contact opens when the door opens, triggering the alarm.',
        ],
        keyPoints: [
          'PIR — detects body heat movement; susceptible to HVAC drafts and sunlight',
          'Dual-tech (PIR + microwave) requires both to trigger — fewer false alarms',
          'Glass break detectors analyze acoustic signature: thud + tinkle within 150 ms',
          'NC magnetic contacts are the simplest and most reliable detector type',
        ],
        quiz: [
          {
            q: 'Why do dual-technology detectors have fewer false alarms than single PIR detectors?',
            a: [
              'They use a digital filter to ignore movement below 1 m/s',
              'They require both PIR and microwave technologies to trigger simultaneously',
              'They have a longer response time',
              'They are calibrated to human height only',
            ],
            correct: 1,
            exp: 'Dual-tech requires both sensing technologies (PIR + microwave) to detect an event simultaneously. HVAC drafts may trigger the PIR but not the microwave, preventing a false alarm.',
          },
        ],
      },
      {
        title: 'Communication Paths',
        body: [
          'Intrusion panels transmit alarm signals to a central monitoring station via one or more communication paths. PSTN (landline) is legacy and being phased out. IP/broadband reporting over the customer\'s internet connection is now standard. Cellular (4G LTE) provides a backup path independent of the internet and local network.',
          'Dual-path communication (IP primary + cellular backup) is required for UL Grade AA and government applications. Contact ID is the industry-standard reporting format for alarm events. SIA DC-09 (IP reporting) and SIA DC-07 (cellular reporting) define the modern digital communication protocols.',
        ],
        keyPoints: [
          'PSTN landline is end-of-life; IP broadband + cellular dual-path is current standard',
          'Cellular backup is independent of local network — survives cable cuts',
          'Contact ID is the standard event code format for central station reporting',
          'UL Grade AA requires dual-path (IP + cellular) communication',
        ],
        quiz: [
          {
            q: 'Why is cellular backup communication preferred over PSTN for commercial alarm systems?',
            a: [
              'Cellular is lower cost than PSTN per month',
              'Cellular is independent of the local internet and survives telephone line cuts',
              'Cellular supports higher bandwidth for video verification',
              'Cellular eliminates the need for a central monitoring station',
            ],
            correct: 1,
            exp: 'A cellular communicator uses the mobile network, so cutting the telephone line or internet cable does not disable alarm reporting — a common burglary tactic.',
          },
        ],
      },
      {
        title: 'Alarm Verification',
        body: [
          'Traditional alarm monitoring dispatches police on a single alarm activation. Video verification (also called enhanced call verification, ECV) uses IP cameras integrated with the alarm to display a live or clip video to the monitoring operator before dispatch, reducing false alarm dispatches by over 95%.',
          'Sequential alarm verification (SAV) requires two zones to activate within a defined time window before police dispatch. Audio verification uses a two-way audio module to allow the operator to listen to the premises and speak to an intruder or occupant before dispatching.',
        ],
        keyPoints: [
          'Video verification: monitoring operator reviews camera clip before police dispatch',
          'Reduces false alarm dispatches > 95%; municipal false alarm fines avoided',
          'Sequential alarm verification (SAV): requires 2 zones to trigger within time window',
          'Audio verification: two-way audio lets operator listen/speak before dispatch',
        ],
        quiz: [
          {
            q: 'Video verification reduces police dispatch false alarm rates by approximately:',
            a: ['10–20%', '50%', '75%', 'More than 95%'],
            correct: 3,
            exp: 'Video verification allows monitoring operators to confirm an actual intrusion before dispatching, reducing false alarm police responses by over 95% compared to traditional single-sensor activation.',
          },
        ],
      },
      {
        title: 'Panel Programming & Walk-Test',
        body: [
          'Panel programming sets zone types (entry/exit delay, instant, 24-hour), entry/exit delay times, access codes, communicator destination phone numbers or IP addresses, and report codes. Programming is performed via keypad menu navigation or a laptop running the manufacturer\'s programming software over USB or IP.',
          'A walk-test activates each zone individually while the panel logs or annunciates the zone number. The technician walks the protected space, triggers each sensor, and verifies the panel responds correctly. Some panels have a walk-test mode that keeps the siren silent to avoid disturbing the building occupants.',
        ],
        keyPoints: [
          'Program zone types, delays, user codes, and communicator paths before walk-test',
          'Walk-test: activate each zone; verify panel logs correct zone number',
          'Walk-test mode silences sirens but logs all zone activations',
          'Final step: restore all zones, arm/disarm with customer code, hand off to customer',
        ],
        quiz: [
          {
            q: 'What is the purpose of a walk-test in intrusion system commissioning?',
            a: [
              'To test the central station communication path',
              'To verify that each sensor activates and the panel logs the correct zone',
              'To program user access codes for all keypad users',
              'To measure the battery backup runtime',
            ],
            correct: 1,
            exp: 'A walk-test verifies that each detector in the building triggers its correct zone on the panel. The technician physically activates each sensor while checking the panel display or log.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'A zone programmed as "interior follower" will:',
        a: [
          'Trigger an instant alarm at all times',
          'Be bypassed automatically when an entry/exit zone is active during the entry delay',
          'Only alarm when two consecutive zones trigger',
          'Report silently to the central station without local siren',
        ],
        correct: 1,
        exp: 'Interior follower zones (e.g., interior motion detectors) are ignored during the entry delay when an entry/exit zone has been tripped, allowing the user to walk through the building to disarm before triggering an alarm.',
      },
      {
        q: 'A glass break detector triggers on which acoustic signature?',
        a: ['A single high-frequency tone above 15 kHz', 'A low-frequency thud followed by high-frequency tinkle within 150 ms', 'Any sound above 90 dB', 'A sustained vibration between 5–10 Hz'],
        correct: 1,
        exp: 'Glass break detectors use a two-stage filter: they require a low-frequency impact sound (thud) followed immediately by high-frequency shattering (tinkle) within about 150 ms.',
      },
      {
        q: 'Which communication format is the industry standard for transmitting alarm events to a central station?',
        a: ['Modbus RTU', 'Contact ID', 'SIA DC-07', 'Wiegand 26-bit'],
        correct: 1,
        exp: 'Contact ID is the industry-standard digital event reporting format. SIA DC-09 and DC-07 are IP/cellular transmission protocols, but Contact ID defines the event codes within those transmissions.',
      },
      {
        q: 'Dual-path communication (IP + cellular) is required for which UL alarm grade?',
        a: ['Grade A residential', 'Grade B', 'Grade AA commercial/government', 'Grade C retail'],
        correct: 2,
        exp: 'UL Grade AA (highest commercial/government) requires dual-path reporting so a single communication failure (ISP outage or cable cut) cannot disable alarm reporting.',
      },
      {
        q: 'Sequential alarm verification (SAV) prevents false alarm dispatch by requiring:',
        a: ['A live video confirmation from the central station operator', 'Two separate zones to activate within a defined time window', 'The alarm to sustain for 60 seconds before reporting', 'A user PIN to cancel within 30 seconds'],
        correct: 1,
        exp: 'SAV requires two independent zone activations within a short time window, making it unlikely that two separate sensors both false-alarm in sequence.',
      },
      {
        q: 'A PIR detector mounts facing an HVAC vent, causing repeated false alarms. The best solution is:',
        a: ['Replace with a glass break detector', 'Replace with a dual-technology (PIR + microwave) detector', 'Increase the EOL resistor value', 'Increase the zone entry delay to 60 seconds'],
        correct: 1,
        exp: 'A dual-tech detector requires both PIR and microwave to trigger simultaneously. HVAC airflow triggers PIR but not microwave, eliminating these false alarms.',
      },
      {
        q: 'During panel programming, what is the function of the entry/exit delay?',
        a: ['Delays the central station report by 30 seconds', 'Gives the user time to disarm the panel after entering through a designated door', 'Delays the siren activation for noise reduction', 'Waits for a second zone trigger before alarm'],
        correct: 1,
        exp: 'Entry delay gives the user time to reach the keypad and disarm after entering through the designated door without triggering an immediate alarm.',
      },
      {
        q: 'A magnetic contact on a door is wired normally closed (NC). What event triggers an alarm?',
        a: ['The magnet moving closer to the switch', 'The circuit loop opening when the door opens', 'An increase in loop resistance beyond the EOL value', 'A short circuit caused by the door closing'],
        correct: 1,
        exp: 'NC contacts keep the loop closed (normal/secure). Opening the door separates the magnet from the switch, opening the circuit, which the panel interprets as a zone alarm.',
      },
      {
        q: 'What is the primary advantage of audio verification over traditional alarm monitoring?',
        a: ['Audio verification uses AI to automatically identify intruders', 'Operators can listen to the premises and confirm intrusion before dispatching', 'Audio verification replaces the need for a monitoring contract', 'Audio data is stored on the NVR for evidence'],
        correct: 1,
        exp: 'Two-way audio allows a monitoring operator to listen to the protected space and speak before dispatching, confirming an actual intrusion and reducing false dispatch.',
      },
      {
        q: 'Why is PSTN (landline) being phased out as a primary alarm communication path?',
        a: ['PSTN does not support Contact ID format', 'Telephone companies are decommissioning copper landline infrastructure', 'PSTN cannot transmit alarm signals in real time', 'PSTN requires a dedicated UPS for backup power'],
        correct: 1,
        exp: 'Telephone carriers are systematically decommissioning copper PSTN infrastructure in favor of IP and wireless, making PSTN-dependent alarm communicators increasingly unreliable.',
      },
    ],
  },
  {
    id: 'sec-networking',
    num: 15,
    title: 'Security Network Integration',
    desc: 'VLANs, cybersecurity hardening, remote monitoring, and integration of access control with CCTV and intrusion systems.',
    slides: [
      {
        title: 'Security Network Architecture',
        body: [
          'Security devices (cameras, access controllers, intrusion panels) should be isolated from the corporate LAN on a dedicated VLAN or a separate physical network. This limits the blast radius of a compromised security device, prevents unauthorized access to camera streams from corporate workstations, and simplifies bandwidth planning.',
          'A managed PoE switch forms the edge of the security network, connecting IP cameras and access readers. A security-specific router or VLAN-capable switch separates security traffic from corporate traffic. A dedicated NVR or VMS server sits inside the security VLAN with controlled access for authorized monitoring workstations.',
        ],
        keyPoints: [
          'Isolate security devices on a dedicated VLAN or physical network',
          'Managed PoE switch at the edge: connects cameras, readers, and intercoms',
          'Restrict security VLAN access to NVR/VMS and authorized monitoring stations only',
          'Document IP addressing scheme, VLAN IDs, and port assignments in as-built drawings',
        ],
        quiz: [
          {
            q: 'Why should security cameras be placed on a dedicated VLAN rather than the corporate LAN?',
            a: [
              'Cameras cannot use standard Ethernet protocols',
              'To limit exposure of camera streams and contain breaches to the security network',
              'To reduce PoE power draw on the main switch',
              'Corporate VLANs do not support multicast video streaming',
            ],
            correct: 1,
            exp: 'Isolating cameras on a dedicated VLAN prevents unauthorized access to video feeds from corporate workstations and limits the impact of a compromised camera on the rest of the network.',
          },
        ],
      },
      {
        title: 'Cybersecurity Hardening',
        body: [
          'Default factory credentials on IP cameras are a leading cause of security system compromise. Every camera, NVR, controller, and reader must have its default username/password changed during commissioning. Firmware must be updated to the latest version to patch known vulnerabilities.',
          'Additional hardening measures include: disabling unused services (Telnet, HTTP — use HTTPS and SSH only), enabling TLS/SSL encryption for all web interfaces, placing the NVR behind a firewall with strict inbound rules, and using VPN for remote access rather than port forwarding.',
        ],
        keyPoints: [
          'Change default credentials on every device before connecting to the network',
          'Update firmware to the latest version during commissioning',
          'Disable Telnet and HTTP; use only HTTPS and SSH',
          'Use VPN for remote access — never open camera ports directly to the internet',
        ],
        quiz: [
          {
            q: 'Which remote access method is preferred for security system management over the internet?',
            a: ['Port forwarding on the firewall to the NVR IP address', 'UPnP automatic port forwarding', 'VPN tunnel with strong authentication', 'HTTP access on port 80'],
            correct: 2,
            exp: 'VPN encrypts all traffic and requires strong authentication before any system access. Port forwarding exposes devices directly to the internet, where they are vulnerable to brute-force and exploit attacks.',
          },
        ],
      },
      {
        title: 'Bandwidth & QoS Planning',
        body: [
          'IP camera bandwidth consumption is the primary driver of network capacity planning. A 4 MP H.265 camera in motion-active areas consumes approximately 2–4 Mbps; in static scenes with smart codec, this drops to 0.5–1 Mbps. Multiply by all cameras to get aggregate uplink bandwidth requirements from the edge switch to the NVR.',
          'Quality of Service (QoS) policies prioritize video streaming traffic over general corporate data. Marking camera streams with DSCP EF (Expedited Forwarding) ensures frames are not dropped during periods of network congestion, preventing frame drops and buffering in live view.',
        ],
        keyPoints: [
          '4 MP H.265 = ~2–4 Mbps typical; smart codec reduces to ~0.5–1 Mbps in static scenes',
          'Size uplink bandwidth: aggregate all camera bit rates + 20% overhead',
          'QoS (DSCP EF) prioritizes video frames to prevent drops during congestion',
          'NVR requires local write bandwidth = sum of all recording bit rates simultaneously',
        ],
        quiz: [
          {
            q: 'A 16-camera system at 3 Mbps per camera. What is the minimum uplink bandwidth required from the switch to the NVR (with 20% overhead)?',
            a: ['38.4 Mbps', '48 Mbps', '57.6 Mbps', '72 Mbps'],
            correct: 2,
            exp: '16 cameras × 3 Mbps = 48 Mbps base + 20% overhead = 57.6 Mbps minimum uplink bandwidth needed.',
          },
        ],
      },
      {
        title: 'System Integration: Access + CCTV + Intrusion',
        body: [
          'Unified platforms integrate access control events with camera triggers and intrusion panel alerts. Common integrations include: access denied event → nearest camera pops up on monitoring workstation; door forced open → camera starts recording at high bit rate; intrusion alarm → NVR tags the timestamp for rapid forensic search.',
          'Integration is achieved through direct API connections (REST or SDK), hardware I/O (relay output from access controller to NVR alarm input), or middleware platforms that act as brokers between disparate systems. Open standards such as ONVIF (cameras) and OSDP (readers) facilitate interoperability.',
        ],
        keyPoints: [
          'Access denied event → camera popup; forced door → high-quality recording',
          'Integration methods: API/SDK, hardware I/O relay, or middleware broker',
          'ONVIF Profile S/T — camera interoperability standard',
          'OSDP — reader-to-controller communication standard (see Module 12)',
        ],
        quiz: [
          {
            q: 'Which open standard enables interoperability between IP cameras from different manufacturers?',
            a: ['OSDP', 'Contact ID', 'ONVIF', 'Wiegand 26-bit'],
            correct: 2,
            exp: 'ONVIF (Open Network Video Interface Forum) defines an open protocol for IP camera discovery, streaming, and management, enabling cameras from different manufacturers to work with any ONVIF-compatible NVR or VMS.',
          },
        ],
      },
      {
        title: 'Remote Monitoring & Cloud Services',
        body: [
          'Cloud-based video surveillance (VSaaS — Video Surveillance as a Service) stores recordings in the cloud, eliminating on-premises NVR hardware. Cameras upload compressed streams over the internet directly to cloud storage; access is via browser or mobile app. Uplink bandwidth and monthly cloud storage costs must be factored into design.',
          'Remote monitoring centers (RMC) provide 24/7 video monitoring, access control event response, and virtual guard tours. Managed access control (ACaaS — Access Control as a Service) hosts the controller database and user management in the cloud, with local controllers maintaining offline operation.',
        ],
        keyPoints: [
          'VSaaS: cameras upload to cloud; no local NVR; monthly subscription model',
          'VSaaS requires sufficient upload bandwidth per camera at the site',
          'ACaaS: cloud-hosted access control with local offline failover',
          'Remote monitoring centers provide 24/7 video guard services at lower cost than on-site guards',
        ],
        quiz: [
          {
            q: 'What does VSaaS stand for and what is its primary benefit?',
            a: [
              'Video Software as a Service — faster compression algorithms',
              'Video Surveillance as a Service — cloud storage eliminates on-premises NVR hardware',
              'Verified Security as a Service — alarm verification without a monitoring contract',
              'Virtual Security as a Service — AI-powered threat detection',
            ],
            correct: 1,
            exp: 'VSaaS stores video in the cloud, eliminating on-premises NVR hardware, simplifying maintenance, and providing access to recordings from anywhere via browser or mobile app.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Which DSCP marking prioritizes video streaming traffic on a managed switch?',
        a: ['DSCP CS0 (best effort)', 'DSCP AF11', 'DSCP EF (Expedited Forwarding)', 'DSCP CS6 (network control)'],
        correct: 2,
        exp: 'DSCP EF (Expedited Forwarding) is the highest-priority real-time queue marking, ensuring video frames are forwarded before lower-priority traffic during congestion.',
      },
      {
        q: 'The ONVIF standard enables:',
        a: ['Encrypted Wiegand communication', 'Interoperability between IP cameras and NVRs from different manufacturers', 'Cellular backup for intrusion panels', 'Cloud storage for access control databases'],
        correct: 1,
        exp: 'ONVIF defines protocols for discovery, streaming (RTSP/H.264), PTZ control, and event notifications, allowing cameras from any ONVIF-compliant manufacturer to work with any compatible NVR or VMS.',
      },
      {
        q: 'To prevent compromise of IP cameras, a technician should first:',
        a: ['Disable the camera\'s DHCP client', 'Change the default username and password', 'Enable UPnP for easy remote access', 'Set the IP address to the 192.168.0.x subnet'],
        correct: 1,
        exp: 'Default credentials are the most exploited vulnerability in IP cameras. Changing the default username and password during commissioning is the single most important hardening step.',
      },
      {
        q: 'A 20-camera system with each camera consuming 2 Mbps. With 20% overhead, the minimum uplink bandwidth is:',
        a: ['40 Mbps', '44 Mbps', '48 Mbps', '60 Mbps'],
        correct: 2,
        exp: '20 cameras × 2 Mbps = 40 Mbps base + 20% = 48 Mbps minimum uplink bandwidth.',
      },
      {
        q: 'ACaaS (Access Control as a Service) stores the access control database:',
        a: ['On each individual door controller', 'On the premises NVR', 'In the cloud with local offline failover at the controller', 'On the central station monitoring server'],
        correct: 2,
        exp: 'ACaaS hosts cardholder data and management in the cloud but local controllers cache records for offline operation, ensuring doors continue to function during internet outages.',
      },
      {
        q: 'When integrating access control with CCTV using hardware I/O, the most common method is:',
        a: ['Sharing the same RS-485 bus', 'Wiring a relay output from the access controller to the NVR alarm input', 'Using Wiegand output from the reader to the NVR', 'Connecting both systems to the same VLAN only'],
        correct: 1,
        exp: 'A dry contact relay output from the access controller connects to the NVR\'s alarm input, triggering recording, PTZ preset movement, or a camera popup on the monitoring workstation.',
      },
      {
        q: 'VSaaS (Video Surveillance as a Service) requires careful planning of:',
        a: ['On-premises RAID storage capacity', 'Internet upload bandwidth per camera', 'RS-485 bus length from cameras to NVR', 'Cellular signal strength at the NVR rack'],
        correct: 1,
        exp: 'VSaaS cameras stream directly to the cloud; upload bandwidth must support all cameras recording simultaneously. Insufficient uplink causes dropped frames and recording gaps.',
      },
      {
        q: 'Placing security cameras on a separate physical network or VLAN primarily protects against:',
        a: ['PoE power surges from the main switch', 'Unauthorized access to camera streams from corporate workstations', 'IP address conflicts with access control devices', 'EMI interference from corporate network switches'],
        correct: 1,
        exp: 'Isolating cameras on a dedicated VLAN prevents corporate employees from accessing video streams, limits lateral movement if a camera is compromised, and simplifies bandwidth management.',
      },
      {
        q: 'Which protocol should be disabled on IP cameras and NVRs during cybersecurity hardening?',
        a: ['HTTPS', 'SSH', 'Telnet and HTTP', 'ONVIF'],
        correct: 2,
        exp: 'Telnet and HTTP transmit credentials in plaintext. They should be disabled; HTTPS and SSH should be the only management protocols enabled.',
      },
      {
        q: 'Remote monitoring centers provide value by:',
        a: ['Hosting the VMS software on-premises at the customer site', 'Providing 24/7 video monitoring and virtual guard services at lower cost than on-site guards', 'Installing and programming all security devices remotely', 'Replacing the need for a central station alarm monitoring contract'],
        correct: 1,
        exp: 'Remote monitoring centers (RMC) staff trained video surveillance operators around the clock, offering virtual guard tours and real-time intervention at a fraction of the cost of on-site security personnel.',
      },
    ],
  },
  {
    id: 'sec-career',
    num: 16,
    title: 'Career Pathways & Certifications',
    desc: 'Licensing requirements, ESA certifications, career growth from installer to systems integrator, and business development.',
    slides: [
      {
        title: 'Licensing Requirements',
        body: [
          'Most U.S. states require electronic security technicians to hold a state-issued low-voltage or alarm contractor license. Requirements vary by state but typically include: a minimum age (18), a background check (criminal history disqualifies applicants in most states), a written examination, and proof of completed apprenticeship or work experience hours.',
          'Some states require a separate license for each discipline (intrusion, CCTV, access control, fire alarm). Employers often sponsor license applications and cover exam fees. Working without a required license exposes both the technician and the company to fines and project shutdowns.',
        ],
        keyPoints: [
          'Most states require a low-voltage or alarm contractor license for security work',
          'Requirements: background check, written exam, work experience hours',
          'Some states have separate licenses per discipline (intrusion, CCTV, fire alarm)',
          'Unlicensed work can result in fines, project shutdowns, and civil liability',
        ],
        quiz: [
          {
            q: 'What is the most common disqualifier for a state electronic security technician license?',
            a: ['Lack of a college degree', 'A criminal background check failure', 'Age under 25', 'No OSHA 10 card'],
            correct: 1,
            exp: 'A criminal background check failure (typically for felony convictions or crimes involving theft, fraud, or violence) is the most common reason for license denial in electronic security.',
          },
        ],
      },
      {
        title: 'ESA Certifications',
        body: [
          'The Electronic Security Association offers the Certified Alarm Technician (CAT) credential, which validates installation, programming, and troubleshooting skills for intrusion and life safety systems. The Certified Electronic Security Technician (CEST) covers broader disciplines including access control and CCTV.',
          'Earning ESA credentials involves passing a proctored exam. Candidates must demonstrate knowledge of panel programming, wiring standards, UL listings, and central station communication. Certification is renewed every three years with continuing education units (CEUs).',
        ],
        keyPoints: [
          'CAT (Certified Alarm Technician) — intrusion and life safety focus',
          'CEST (Certified Electronic Security Technician) — all security disciplines',
          'Both require proctored exams and CEU renewal every 3 years',
          'ESA membership provides access to training, industry standards, and networking',
        ],
        quiz: [
          {
            q: 'The ESA Certified Alarm Technician (CAT) credential is most focused on:',
            a: ['Access control and CCTV design', 'Intrusion and life safety system installation and programming', 'Network design for IP camera systems', 'Cybersecurity for connected security devices'],
            correct: 1,
            exp: 'The CAT focuses on alarm system installation, programming, and troubleshooting including intrusion panels, sensors, and life safety integration.',
          },
        ],
      },
      {
        title: 'ASIS Certifications',
        body: [
          'ASIS International offers the Physical Security Professional (PSP) credential, which covers threat assessment, physical security design, and technology specification. The PSP is oriented toward security directors, consultants, and systems designers rather than field installation technicians.',
          'The ASIS Certified Protection Professional (CPP) is the highest-level credential for corporate security management. For field technicians advancing into design and sales engineering roles, the PSP provides a recognized credential for consultative security work with enterprise clients.',
        ],
        keyPoints: [
          'PSP (Physical Security Professional) — design, specification, threat assessment',
          'CPP (Certified Protection Professional) — corporate security management',
          'PSP is relevant for technicians moving into design or sales engineering roles',
          'ASIS credentials require experience, an application, and a proctored exam',
        ],
        quiz: [
          {
            q: 'Which ASIS credential is most relevant for a field technician advancing into a security systems design or sales engineering role?',
            a: ['CPP (Certified Protection Professional)', 'PSP (Physical Security Professional)', 'CAT (Certified Alarm Technician)', 'CEST (Certified Electronic Security Technician)'],
            correct: 1,
            exp: 'The PSP (Physical Security Professional) covers physical security survey, design, and technology specification — skills directly applicable to systems design and sales engineering careers.',
          },
        ],
      },
      {
        title: 'Career Progression',
        body: [
          'Entry-level security technicians start as helpers or assistants on installation crews, learning low-voltage wiring, device mounting, and cable management. After 1–2 years they progress to lead installer, then to service technician (troubleshooting and repair). The most experienced technicians become systems integrators or project managers.',
          'Higher-margin career paths include: service contract specialist (preventive maintenance and SLA management), sales engineer (solution design and proposal writing), and independent consultant (security assessment and specification). Manufacturers also recruit experienced field techs for field application engineer (FAE) and technical support roles.',
        ],
        keyPoints: [
          'Helper → Lead Installer → Service Tech → Senior Tech / Systems Integrator',
          'Service contract specialists build recurring revenue through maintenance agreements',
          'Sales engineering combines technical knowledge with customer-facing skills',
          'FAE and technical support roles offer manufacturer career paths without field travel',
        ],
        quiz: [
          {
            q: 'A security technician interested in design work and customer presentations should pursue which career path?',
            a: ['Central station operator', 'Service contract specialist', 'Sales engineering or systems design', 'Field application engineer at a manufacturer'],
            correct: 2,
            exp: 'Sales engineering combines deep technical knowledge with customer-facing design and proposal skills, making it the natural career path for technicians who enjoy both technology and client interaction.',
          },
        ],
      },
      {
        title: 'Service Contracts & Recurring Revenue',
        body: [
          'Preventive maintenance (PM) contracts are the backbone of a security company\'s recurring revenue. Annual PM visits include: cleaning and testing all detectors, testing battery backup, verifying central station communication, testing all door hardware, and updating firmware. Customers on PM contracts have lower failure rates and higher satisfaction.',
          'Service Level Agreements (SLAs) define response time commitments (e.g., 4-hour on-site for critical failures, next business day for minor faults). Multi-year service contracts with annual escalation clauses provide predictable revenue and customer retention. Strong service reputation drives referral-based new installation sales.',
        ],
        keyPoints: [
          'PM contracts: annual cleaning, testing, battery check, firmware update, documentation',
          'SLAs define response time: 4-hour critical, next-day standard',
          'Multi-year service contracts provide predictable recurring revenue',
          'Satisfied service customers are the best source of new installation referrals',
        ],
        quiz: [
          {
            q: 'Which activity is included in a standard annual security system preventive maintenance visit?',
            a: ['Replacing all door contacts and motion detectors', 'Testing battery backup, verifying central station communication, and updating firmware', 'Reprogramming all user access codes', 'Replacing the control panel main board'],
            correct: 1,
            exp: 'Annual PM includes testing backup battery runtime, verifying central station communication paths, cleaning/testing all detectors, and updating device firmware — not replacing functioning hardware.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Which ESA credential covers intrusion, access control, and CCTV disciplines?',
        a: ['CAT — Certified Alarm Technician', 'PSP — Physical Security Professional', 'CEST — Certified Electronic Security Technician', 'CPP — Certified Protection Professional'],
        correct: 2,
        exp: 'The CEST (Certified Electronic Security Technician) covers all electronic security disciplines. The CAT focuses specifically on intrusion and life safety systems.',
      },
      {
        q: 'A state-issued alarm contractor license typically requires:',
        a: ['A 4-year engineering degree', 'Background check, written exam, and work experience hours', 'OSHA 30 certification and CPR/AED card', 'ESA membership and a CAT credential'],
        correct: 1,
        exp: 'State alarm contractor licenses typically require a background check, a written examination, and documented work experience hours. An engineering degree is not required.',
      },
      {
        q: 'The ASIS PSP credential is specifically designed for professionals focused on:',
        a: ['Central station monitoring operations', 'Corporate security management and personnel protection', 'Physical security survey, design, and technology specification', 'Intrusion panel programming and field service'],
        correct: 2,
        exp: 'The PSP (Physical Security Professional) covers physical security assessment, design, and technology selection — oriented toward designers, consultants, and security program managers.',
      },
      {
        q: 'What is the primary business benefit of offering annual preventive maintenance contracts?',
        a: ['They eliminate the need for a central station monitoring agreement', 'They provide predictable recurring revenue and improve customer retention', 'They exempt the company from false alarm fine liability', 'They satisfy UL listing requirements for residential systems'],
        correct: 1,
        exp: 'Service contracts create predictable recurring revenue, reduce equipment failures, and keep the company in ongoing contact with customers — driving retention and referral business.',
      },
      {
        q: 'A field technician advancing toward systems design should obtain which certification?',
        a: ['OSHA 30', 'ESA CAT', 'ASIS PSP', 'CompTIA A+'],
        correct: 2,
        exp: 'The ASIS PSP (Physical Security Professional) is the recognized credential for security design and specification work, relevant for moving into design or sales engineering roles.',
      },
      {
        q: 'Service Level Agreements (SLAs) in security maintenance contracts define:',
        a: ['The brand of equipment that must be used for replacements', 'Response time commitments for different severity levels of failures', 'The central station the customer must use for monitoring', 'The maximum number of false alarms allowed per year'],
        correct: 1,
        exp: 'SLAs specify response time commitments (e.g., 4-hour critical on-site, next-day standard) that the service company must meet, with penalties for non-compliance.',
      },
      {
        q: 'Working without a required state electronic security license can result in:',
        a: ['Automatic disqualification from ESA membership', 'Fines, project shutdowns, and civil liability for the technician and company', 'Voiding of the manufacturer product warranty only', 'Requirement to retake the OSHA 10 course'],
        correct: 1,
        exp: 'Most states impose financial fines on unlicensed security work, have authority to shut down projects, and expose the contractor to civil liability for any subsequent security failures.',
      },
      {
        q: 'Which career path provides recurring revenue by managing annual PM visits and SLA agreements?',
        a: ['Field application engineer (FAE) at a manufacturer', 'Service contract specialist', 'Central station monitoring operator', 'ESA chapter board member'],
        correct: 1,
        exp: 'Service contract specialists build and manage preventive maintenance and SLA agreements, creating a steady book of recurring revenue and long-term customer relationships.',
      },
      {
        q: 'ESA certifications are renewed every:',
        a: ['1 year', '2 years', '3 years', '5 years'],
        correct: 2,
        exp: 'ESA certifications (CAT and CEST) require renewal every 3 years through continuing education units (CEUs) to ensure technicians stay current with evolving technology and standards.',
      },
      {
        q: 'The typical career progression in electronic security is:',
        a: [
          'Helper → Sales Engineer → Service Tech → Lead Installer',
          'Central Station Operator → Lead Installer → Service Tech',
          'Helper → Lead Installer → Service Tech → Systems Integrator / Project Manager',
          'CEST Candidate → CAT → PSP → CPP',
        ],
        correct: 2,
        exp: 'The standard field career ladder is: Helper (learning on the job) → Lead Installer (running crews) → Service Tech (troubleshooting) → Senior Tech or Systems Integrator/PM.',
      },
    ],
  },
];
