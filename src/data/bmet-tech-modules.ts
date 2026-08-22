import type { TrainingModule } from './modules';

export const BMET_TECH_MODULES: TrainingModule[] = [
  {
    id: 'bmet-fundamentals',
    num: 11,
    title: 'Biomedical Equipment & the Healthcare Environment',
    desc: 'BMET role, healthcare facility structure, medical device classes, NFPA 99 risk categories, and regulatory agencies',
    slides: [
      {
        title: 'The BMET Role and Healthcare Environment',
        body: [
          'Biomedical Equipment Technicians (BMETs) install, inspect, maintain, troubleshoot, and repair medical equipment in hospitals, clinics, imaging centers, and long-term care facilities. BMETs serve as the link between clinical staff and the technology that supports patient care, ensuring that devices are safe, accurate, and operational.',
          'Healthcare facilities are organized around patient care areas with different risk levels. General care areas (such as patient rooms and outpatient clinics) have standard electrical requirements. Critical care areas (ICUs, cardiac catheterization labs, and operating rooms) have more stringent electrical safety requirements due to the presence of invasive procedures and vulnerable patients.',
          'BMETs interface daily with nurses, physicians, and clinical staff to prioritize repairs, explain equipment limitations, and train users on correct operation. Clear communication about equipment status — including quarantine, out-of-service, and return-to-service documentation — is a core competency.',
          'Equipment Management Programs (EMPs) governed by The Joint Commission (TJC) require healthcare facilities to maintain inventories of all medical equipment, establish maintenance schedules, track work orders, and document every inspection and repair. BMETs are the primary workforce executing EMPs.',
        ],
        keyPoints: [
          'BMETs install, maintain, troubleshoot, and repair medical equipment across all care settings',
          'Critical care areas (OR, ICU) have stricter electrical safety requirements than general care',
          'Documentation of every inspection, repair, and calibration is required for regulatory compliance',
          'Equipment Management Programs (EMPs) are required by TJC and managed by BMET departments',
        ],
        quiz: [
          {
            q: 'Which organization requires hospitals to maintain Equipment Management Programs (EMPs) that document all medical device maintenance?',
            a: ['FDA (Food and Drug Administration)', 'TJC (The Joint Commission)', 'OSHA (Occupational Safety and Health Administration)', 'CMS (Centers for Medicare and Medicaid Services)'],
            correct: 1,
            exp: 'The Joint Commission (TJC) accredits healthcare facilities and requires Equipment Management Programs. EMPs must include device inventories, maintenance schedules, work order tracking, and documentation of all inspections and repairs performed by BMETs.',
          },
          {
            q: 'Which patient care environment has the most stringent electrical safety requirements for medical equipment?',
            a: ['General patient rooms', 'Hospital corridors and nurse stations', 'Operating rooms and cardiac catheterization labs', 'Hospital lobbies and outpatient waiting areas'],
            correct: 2,
            exp: 'Operating rooms and cardiac catheterization labs are critical care environments where invasive procedures introduce risk of microshock. Leakage current limits are tighter and grounding requirements are more stringent than in general care areas.',
          },
        ],
      },
      {
        title: 'FDA Device Classifications & Regulatory Framework',
        body: [
          'The FDA classifies medical devices into three classes based on risk level. Class I devices (low risk, such as bandages and tongue depressors) require only general controls. Class II devices (moderate risk, such as infusion pumps and ECG monitors) require 510(k) premarket notification to demonstrate substantial equivalence to a predicate device. Class III devices (high risk, life-sustaining, such as implantable pacemakers) require full Premarket Approval (PMA) with clinical evidence of safety and efficacy.',
          'FDA 21 CFR Part 820, the Quality System Regulation, governs medical device manufacturers and requires a quality management system for design, production, and distribution. BMETs working for manufacturers or independent service organizations must understand these requirements when performing authorized service.',
          'AAMI (Association for the Advancement of Medical Instrumentation) is the primary standards development organization for biomedical technology. AAMI develops technical standards, recommended practices, and the CBET certification program. Key AAMI standards include AAMI TIR12 (decontamination of reusable medical devices) and ANSI/AAMI ES60601-1 (electrical safety).',
          'IEC 60601-1, the international standard for medical electrical equipment, defines classification of applied parts and general safety requirements. Applied parts are portions of equipment that contact patients during normal use. Classification as Type B, BF, or CF determines allowable leakage current limits and isolation requirements.',
        ],
        keyPoints: [
          'Class I: low risk, general controls; Class II: 510(k) notification; Class III: PMA with clinical evidence',
          'FDA 21 CFR Part 820: Quality System Regulation for device manufacturers',
          'AAMI develops biomedical standards and the CBET certification program',
          'IEC 60601-1: international medical equipment standard; B/BF/CF applied part classification',
        ],
        quiz: [
          {
            q: 'An infusion pump is classified as which FDA device class?',
            a: ['Class I — general controls only', 'Class II — requiring 510(k) premarket notification', 'Class III — requiring full Premarket Approval (PMA)', 'Class IV — requiring special labeling only'],
            correct: 1,
            exp: 'Infusion pumps are Class II medical devices. They require 510(k) premarket notification to demonstrate substantial equivalence to a legally marketed predicate device. Class III (PMA) is reserved for high-risk life-sustaining devices like implantable pacemakers.',
          },
          {
            q: 'IEC 60601-1 Type CF applied part classification is most restrictive because it applies to:',
            a: ['Equipment that never contacts patients directly', 'Surface-applied equipment with floating applied parts', 'Equipment with applied parts intended for direct cardiac contact', 'Equipment used only in non-critical areas'],
            correct: 2,
            exp: 'Type CF (Cardiac-Floating) applied parts are intended for direct cardiac contact, such as intracardiac catheters. They have the most stringent leakage current limits (10 µA in normal condition) because even very small currents can induce ventricular fibrillation when applied directly to the heart.',
          },
        ],
      },
      {
        title: 'NFPA 99 Healthcare Facilities Code',
        body: [
          'NFPA 99, Health Care Facilities Code, establishes minimum requirements for medical gas systems, electrical systems, and equipment safety in healthcare facilities. NFPA 99 classifies spaces and systems by risk category: Category 1 covers systems where failure could be immediately life-threatening (OR, ICU), Category 2 covers systems where failure may be hazardous but not immediately life-threatening, Category 3 covers non-patient care areas, and Category 4 covers administrative support areas.',
          'NFPA 99 requires that all patient care area receptacles be tested for grounding integrity, correct polarity, and retention force. Ground continuity must be less than 0.5 ohms from the outlet ground pin to the panel ground bus. Receptacles in critical care areas (Category 1) must be hospital-grade with higher retention force than standard commercial receptacles.',
          'Isolated Power Systems (IPS) are required by NFPA 99 in wet procedure locations such as operating rooms. An IPS uses an isolation transformer to create a floating secondary that is not referenced to ground, preventing the return path for ground-fault current through a patient. A Line Isolation Monitor (LIM) continuously monitors the impedance to ground and alarms if it drops below a threshold, warning of an emerging fault before a complete path develops.',
          'Medical gas systems (oxygen, nitrous oxide, medical air, vacuum, and WAGD) are covered by NFPA 99. BMETs may inspect and verify gas outlets but generally do not service piped gas systems, which require specialized medical gas technicians. BMETs must know alarm setpoints and zone valve locations for emergency response.',
        ],
        keyPoints: [
          'NFPA 99 Categories: 1 = life-threatening if failed (OR/ICU), 2 = hazardous but not immediate, 3 = non-patient, 4 = administrative',
          'Ground continuity: less than 0.5 ohms from receptacle to panel ground bus',
          'Isolated Power Systems required in wet procedure locations (ORs): floating secondary prevents shock hazard',
          'LIM (Line Isolation Monitor) alarms when total hazard current exceeds safe threshold',
        ],
        quiz: [
          {
            q: 'NFPA 99 requires ground continuity in patient care receptacles to be less than:',
            a: ['0.5 ohms', '0.2 ohms', '1.0 ohm', '5.0 ohms'],
            correct: 0,
            exp: 'NFPA 99 requires ground continuity of less than 0.5 ohms from the outlet ground pin to the panel ground bus (0.2 ohms is IEC 60601\'s stricter medical-device limit, not the NFPA 99 facility receptacle requirement). Higher resistance indicates corrosion, loose connections, or damaged wiring that could impair the safety ground path.',
          },
          {
            q: 'An Isolated Power System (IPS) in an operating room protects patients by:',
            a: [
              'Reducing the voltage to safe levels for patient contact',
              'Creating a floating secondary that is not referenced to ground, preventing a ground-fault return path through the patient',
              'Providing backup power if the main circuit trips',
              'Automatically shutting off power if leakage current exceeds limits',
            ],
            correct: 1,
            exp: 'An IPS isolation transformer creates a floating secondary with no reference to ground. If one conductor contacts ground (a single fault), there is no complete return path through the patient, preventing shock. The LIM monitors for this condition and alarms before a second fault can create a hazard.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'The Joint Commission (TJC) requires biomedical departments to maintain what type of program for all medical equipment?',
        a: ['Purchasing Management Program', 'Equipment Management Program (EMP)', 'Patient Safety Program', 'Technology Assessment Program'],
        correct: 1,
        exp: 'TJC requires Equipment Management Programs (EMPs) that include device inventories, PM schedules, work order documentation, and records of all inspections and repairs. EMPs are the framework within which BMETs perform their work.',
      },
      {
        q: 'FDA Class II medical devices require which regulatory pathway before marketing?',
        a: ['PMA (Premarket Approval) with clinical trials', '510(k) premarket notification showing substantial equivalence', 'Only general controls with no submission required', 'Special controls only with no FDA submission'],
        correct: 1,
        exp: 'Class II devices require 510(k) premarket notification demonstrating substantial equivalence to a predicate device. Class III devices require full PMA with clinical evidence. Class I devices need only general controls.',
      },
      {
        q: 'Which NFPA 99 risk category applies to operating rooms and ICUs?',
        a: ['Category 1 — failure could be immediately life-threatening', 'Category 2 — failure may be hazardous but not immediately life-threatening', 'Category 3 — non-patient care areas', 'Category 4 — administrative areas'],
        correct: 0,
        exp: 'NFPA 99 Category 1 covers areas and systems where equipment failure could be immediately life-threatening, including operating rooms, ICUs, and cardiac catheterization labs. These areas have the most stringent requirements.',
      },
      {
        q: 'Ground continuity from a patient care receptacle to the panel ground bus must be less than:',
        a: ['0.5 ohms', '0.2 ohms', '1.0 ohm', '5.0 ohms'],
        correct: 0,
        exp: 'NFPA 99 requires ground continuity of less than 0.5 ohms (0.2 ohms is IEC 60601\'s stricter limit, not NFPA 99\'s). Higher resistance can impair the safety ground and indicates a wiring or connection problem requiring repair.',
      },
      {
        q: 'IEC 60601-1 Type CF applied part classification applies to equipment with:',
        a: ['No patient contact', 'Surface-applied floating parts', 'Direct cardiac contact (intracardiac applications)', 'External-only diagnostic sensors'],
        correct: 2,
        exp: 'Type CF (Cardiac Floating) classification applies to applied parts intended for direct cardiac contact. The most stringent leakage limit of 10 µA normal condition is required because even microampere currents can cause ventricular fibrillation when delivered directly to cardiac tissue.',
      },
      {
        q: 'An Isolated Power System (IPS) is required by NFPA 99 in which type of location?',
        a: ['All general patient rooms', 'Wet procedure locations such as operating rooms', 'Pharmacy and laboratory areas', 'Hospital lobbies and waiting areas'],
        correct: 1,
        exp: 'NFPA 99 requires IPS in wet procedure locations (operating rooms) where the presence of conductive fluids and invasive procedures creates elevated risk of electric shock. The floating secondary prevents a ground-fault current from completing a path through the patient.',
      },
      {
        q: 'The Line Isolation Monitor (LIM) in an OR IPS system serves to:',
        a: ['Shut off power automatically when a fault is detected', 'Monitor impedance to ground and alarm when a fault reduces it below a safe threshold', 'Measure patient leakage current from connected equipment', 'Verify that all equipment is Class II isolated'],
        correct: 1,
        exp: 'The LIM continuously monitors the total impedance to ground of the isolated system. If a single fault develops (a conductor contacting ground), the LIM alarms, warning staff to identify and remove the faulty equipment before a second fault creates a hazard.',
      },
      {
        q: 'AAMI is significant to BMETs primarily because it:',
        a: ['Regulates hospital purchasing of medical equipment', 'Develops biomedical technical standards and administers the CBET certification', 'Licenses BMETs in each state', 'Enforces OSHA workplace safety standards in hospitals'],
        correct: 1,
        exp: 'AAMI (Association for the Advancement of Medical Instrumentation) is the primary standards body for biomedical technology and administers the Certified Biomedical Equipment Technician (CBET) credential.',
      },
      {
        q: 'FDA 21 CFR Part 820 applies to:',
        a: ['Hospital biomedical departments performing repairs', 'Medical device manufacturers and their quality systems', 'BMET certification requirements', 'Insurance reimbursement for medical equipment'],
        correct: 1,
        exp: 'FDA 21 CFR Part 820 is the Quality System Regulation for medical device manufacturers. It requires a quality management system covering design, production, and distribution. BMETs at OEM or ISO service organizations must understand these requirements.',
      },
      {
        q: 'NFPA 99 requires hospital-grade receptacles in Category 1 areas because they provide:',
        a: ['Lower voltage for patient safety', 'Higher retention force and more reliable grounding compared to commercial-grade receptacles', 'Automatic GFCI protection for all circuits', 'Isolated power for every outlet'],
        correct: 1,
        exp: 'Hospital-grade receptacles are required in critical care areas because they provide higher retention force (preventing accidental cord disconnection) and more reliable contact wipe and grounding compared to standard commercial receptacles.',
      },
    ],
  },

  {
    id: 'bmet-electrical',
    num: 12,
    title: 'Electrical Safety & Patient Leakage Current Testing',
    desc: 'Macroshock vs microshock, leakage current limits, electrical safety analyzers, and equipment testing procedures',
    slides: [
      {
        title: 'Macroshock, Microshock & Leakage Current',
        body: [
          'Macroshock occurs when current flows across the body externally — through the skin from hand to hand or hand to foot. The ventricular fibrillation threshold for macroshock is approximately 100 to 300 milliamperes. At 1 to 10 milliamperes, current is painful but typically not lethal for an adult with intact skin. Standard household GFCI devices trip at 5 milliamperes to prevent macroshock fatalities.',
          'Microshock is a hazard specific to patients with electrically conductive paths directly to or near the heart — such as saline-filled catheters, pacemaker leads, or intracardiac monitors. When current bypasses skin resistance and reaches cardiac tissue, ventricular fibrillation can occur at as little as 10 to 50 microamperes (µA). This is 10,000 times more sensitive than the macroshock threshold.',
          'Leakage current is the small unintended current that flows from energized conductors or insulation capacitance to ground or to the patient through normal equipment operation. Three types are measured: chassis leakage (from equipment case to ground), patient lead leakage (from patient-applied leads to ground), and patient lead auxiliary leakage (between leads).',
          'NFPA 99 and IEC 60601 set limits for leakage current based on the applied part type. Normal condition (NC) limits apply when all wiring is intact; single fault condition (SFC) limits apply with a simulated wiring fault (such as an open ground or reversed polarity). Cardiac-applied equipment (Type CF) has the most stringent limits: 10 µA NC, 50 µA SFC.',
        ],
        images: [
          { src: '/diagrams/macroshock-microshock-leakage.svg', alt: 'Diagram comparing macroshock and microshock ventricular fibrillation thresholds, the three leakage current types measured by an ESA, and the Type CF cardiac normal and single-fault condition limits', caption: 'Microshock is 10,000x more sensitive than macroshock — a direct path to cardiac tissue changes everything.' },
        ],
        keyPoints: [
          'Macroshock: VF threshold ~100-300 mA across body; GFCI trips at 5 mA',
          'Microshock: VF threshold ~10-50 µA directly to cardiac tissue — 10,000x more sensitive',
          'Leakage types: chassis leakage, patient lead leakage, patient lead auxiliary leakage',
          'Type CF cardiac limit: 10 µA NC, 50 µA SFC — most stringent class',
        ],
        quiz: [
          {
            q: 'Microshock is most dangerous for patients with which type of condition?',
            a: [
              'Patients with intact dry skin and no external wounds',
              'Patients with electrically conductive paths to or near the heart such as intracardiac catheters or pacemaker leads',
              'Patients receiving only topical medications with no invasive devices',
              'Patients in non-critical general care rooms with no monitoring',
            ],
            correct: 1,
            exp: 'Microshock is a specific hazard for patients with direct electrical paths to cardiac tissue. Skin normally provides significant resistance, but a saline-filled catheter, pacemaker lead, or intracardiac electrode bypasses this resistance, making even microampere currents potentially lethal.',
          },
          {
            q: 'The leakage current limit for Type CF cardiac-applied parts in normal condition per IEC 60601-1 is:',
            a: ['500 µA', '100 µA', '50 µA', '10 µA'],
            correct: 3,
            exp: 'Type CF (cardiac floating) applied parts have a normal-condition leakage limit of 10 µA because the ventricular fibrillation threshold when current is applied directly to cardiac tissue is as low as 10-50 µA. This is the most stringent leakage requirement in IEC 60601-1.',
          },
        ],
      },
      {
        title: 'Electrical Safety Analyzer Testing',
        body: [
          'Electrical Safety Analyzers (ESAs) such as the Fluke Biomedical ESA620 automate leakage current measurement per NFPA 99 and IEC 60601 test sequences. An ESA applies a load and measures leakage in microamperes while simulating normal and single-fault conditions including open neutral, open ground, and reversed polarity.',
          'The standard test sequence includes: (1) line voltage and frequency check; (2) ground continuity from chassis to ground pin; (3) chassis leakage in normal condition; (4) chassis leakage with open neutral; (5) chassis leakage with open ground; (6) chassis leakage with reversed polarity; (7) patient lead leakage for each applied lead; (8) patient lead auxiliary leakage between leads.',
          'A ground continuity test passes when resistance from the chassis ground lug to the supply cord ground pin is less than 0.5 ohms (NFPA 99 facility receptacle requirement) or less than 0.1 ohms (IEC 60601\'s stricter device-level limit). High ground resistance indicates a loose connection, broken ground wire, or corroded terminal that must be repaired before the device can be returned to service.',
          'When an equipment failure is found during electrical safety testing, the device must be tagged out of service (red-tagged) and quarantined until repaired and retested. No device may be returned to clinical use without a passing electrical safety test and documentation of the repair.',
        ],
        images: [
          { src: '/diagrams/esa-test-sequence.svg', alt: 'Diagram of the eight-step electrical safety analyzer test sequence, the NFPA 99 and IEC 60601 ground continuity pass thresholds, a worked failing example, and the red-tag quarantine procedure', caption: 'Eight steps, one hard threshold: ground continuity under 0.5 ohms — anything higher gets red-tagged and repaired before it touches a patient.' },
        ],
        keyPoints: [
          'ESA automates leakage measurement; tests NC, open neutral, open ground, reversed polarity conditions',
          'Ground continuity pass: <0.5 ohms (NFPA 99) or <0.1 ohms (IEC 60601)',
          'Full test sequence: line voltage, ground continuity, chassis leakage, patient lead leakage',
          'Failed devices must be red-tagged and quarantined until repaired and retested',
        ],
        quiz: [
          {
            q: 'A ground continuity test on a patient care device reads 0.65 ohms. The correct action is to:',
            a: [
              'Return the device to service — 0.65 ohms is within normal limits',
              'Tag the device out of service and investigate the high ground resistance before returning it to use',
              'Reset the device and retest — high readings are often transient',
              'Reduce to 0.3 ohms by cleaning the plug and retest',
            ],
            correct: 1,
            exp: 'NFPA 99 requires ground continuity of less than 0.5 ohms. A reading of 0.65 ohms fails this requirement. The device must be red-tagged, the wiring and connectors inspected for corrosion or loose connections, repaired, and retested before returning to patient care.',
          },
          {
            q: 'During electrical safety testing, the "open ground" test condition simulates:',
            a: ['A broken hot conductor', 'A completely unplugged device', 'A broken safety ground conductor while the device remains energized', 'A blown fuse in the device'],
            correct: 2,
            exp: 'The open ground single-fault condition tests how much leakage current could reach a patient if the safety ground conductor were broken while the device remained plugged in and operating. This is a critical safety scenario because the broken ground eliminates the low-impedance return path.',
          },
        ],
      },
      {
        title: 'Electrosurgical Unit Safety & Isolated Patient Circuits',
        body: [
          'Electrosurgical Units (ESUs), also called Bovie units, use high-frequency RF energy (typically 400 kHz to 5 MHz) to cut tissue or coagulate bleeding vessels. At these frequencies, the current passes through tissue thermally without stimulating nerve or cardiac tissue — unlike lower-frequency current. The active electrode concentrates current density at the surgical site; the return electrode (dispersive pad) spreads current over a large area to minimize heating.',
          'Return Electrode Monitoring (REM) systems continuously measure the impedance of the dispersive pad contact with the patient. If the pad makes poor contact due to placement error or adhesive failure, current density at the return site can cause burns. REM systems alarm and disable the ESU when return electrode impedance exceeds safe limits.',
          'ESU safety testing includes output power verification (in watts), return electrode contact quality monitoring function test, leakage current testing, and alarm function verification. ESUs should be tested according to manufacturer specifications and AAMI standards for electrosurgical equipment.',
          'RF interference from ESUs can affect other electronic equipment including ECG monitors, pacemakers, and implantable cardioverter-defibrillators (ICDs). BMET teams must be aware of potential interference during surgical procedures and ensure pacemaker patients are protected according to the device manufacturer guidelines.',
        ],
        keyPoints: [
          'ESU uses 400 kHz-5 MHz RF energy; high frequency prevents nerve/cardiac stimulation',
          'Return Electrode Monitoring (REM) detects poor pad contact and disables ESU to prevent burns',
          'ESU testing: output power, REM function, leakage current, alarm verification',
          'ESU RF interference can affect pacemakers and ICDs — manufacturer guidelines must be followed',
        ],
        quiz: [
          {
            q: 'Electrosurgical units use high-frequency RF energy (400 kHz-5 MHz) because at these frequencies:',
            a: [
              'Current is strong enough to sterilize tissue automatically',
              'Current passes through tissue thermally without stimulating nerve or cardiac tissue',
              'The output is too weak to be felt by the patient',
              'RF energy is not regulated by FDA and avoids approval requirements',
            ],
            correct: 1,
            exp: 'At 400 kHz and above, electrical current passes through tissue faster than nerve and muscle cell membranes can respond, preventing neuromuscular stimulation and cardiac fibrillation. The energy is converted to heat, allowing precise surgical cutting and coagulation.',
          },
          {
            q: 'An ESU Return Electrode Monitoring (REM) system protects patients from:',
            a: ['High output power at the active electrode', 'Burns at the dispersive pad site caused by poor contact and concentrated current density', 'Pacemaker interference during surgery', 'Accidental activation of the ESU foot pedal'],
            correct: 1,
            exp: 'REM monitors the impedance of the dispersive pad. If poor contact increases resistance, current density at the return site increases, generating heat and causing burns. REM alarms and disables the ESU when impedance exceeds safe limits.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Microshock is defined as ventricular fibrillation caused by current as low as 10-50 µA delivered:',
        a: ['Across the chest externally', 'Through intact dry skin', 'Directly to or near cardiac tissue via an intracardiac path', 'Through a patient\'s leg to the floor'],
        correct: 2,
        exp: 'Microshock occurs when tiny currents reach cardiac tissue directly via intracardiac catheters, pacemaker leads, or other electrically conductive paths. Skin resistance normally protects against such small currents; bypassing it makes 10-50 µA potentially lethal.',
      },
      {
        q: 'The normal-condition leakage current limit for Type CF (cardiac) applied parts is:',
        a: ['500 µA', '100 µA', '50 µA', '10 µA'],
        correct: 3,
        exp: 'IEC 60601-1 limits Type CF applied part leakage to 10 µA in normal condition. This is the most stringent requirement, applied to equipment with direct cardiac contact where even microampere currents can cause ventricular fibrillation.',
      },
      {
        q: 'A device chassis leakage reading of 450 µA is found during an electrical safety test. The NFPA 99 normal-condition limit is 300 µA. The correct action is:',
        a: ['Return to service — 450 µA is within the single-fault condition limit', 'Tag the device out of service and investigate before returning to use', 'Reduce to 300 µA by replacing the power cord and retest', 'Accept the result and document as within tolerance'],
        correct: 1,
        exp: 'The reading of 450 µA exceeds the NFPA 99 normal-condition chassis leakage limit of 300 µA. The device must be taken out of service, the fault investigated (often excessive capacitive coupling or a damaged filter), repaired, and retested before being returned to patient care.',
      },
      {
        q: 'Ground continuity of a patient care device measures 0.15 ohms. This result is:',
        a: ['A failure — it must be below 0.1 ohms per NFPA 99', 'A pass — it is below the 0.5 ohm NFPA 99 limit', 'Borderline — requires immediate re-testing with a different analyzer', 'A failure — NFPA 99 requires zero resistance'],
        correct: 1,
        exp: 'NFPA 99 requires ground continuity of less than 0.5 ohms. A reading of 0.15 ohms passes this requirement. IEC 60601 has a more stringent 0.1 ohm limit for detachable-cord equipment, but for NFPA 99 compliance, 0.15 ohms is comfortably acceptable.',
      },
      {
        q: 'The "open neutral" single-fault condition in electrical safety testing simulates:',
        a: ['A broken safety ground wire', 'A broken neutral (return) conductor while the device remains energized', 'A completely unplugged device with no power', 'A tripped circuit breaker on the panel'],
        correct: 1,
        exp: 'The open neutral single-fault condition tests how much chassis or patient leakage current would flow if the neutral conductor broke. In this condition the chassis can rise to line potential through capacitive or resistive paths, significantly increasing leakage current.',
      },
      {
        q: 'Electrosurgical units use RF frequencies above 400 kHz to avoid:',
        a: ['Damaging the active electrode tip at lower frequencies', 'Stimulating nerve and cardiac tissue that would occur at lower frequencies', 'Interference with building electrical systems', 'Tripping the facility GFCI circuits'],
        correct: 1,
        exp: 'At frequencies below about 100 kHz, electrical current can stimulate nerve and muscle cell membranes, causing pain and potentially cardiac fibrillation. Above 400 kHz, current passes through tissue faster than membranes can respond, allowing safe surgical application.',
      },
      {
        q: 'What does an ESU Return Electrode Monitoring (REM) system measure to protect patients?',
        a: ['Output power at the active electrode tip', 'Patient heart rate during surgery', 'Impedance of the dispersive pad contact with the patient', 'RF output frequency stability'],
        correct: 2,
        exp: 'REM continuously monitors the impedance of the dispersive (return) electrode pad. If pad contact is poor, the return current becomes concentrated in a small area, generating heat. REM alarms and disables the ESU when impedance exceeds the safe threshold.',
      },
      {
        q: 'An Isolated Power System (IPS) in an operating room reduces which specific electrical hazard?',
        a: ['Voltage spikes from surgical equipment', 'Ground fault shock hazard to patients through a second fault creating a complete circuit', 'Power outage risk to critical equipment', 'EMI interference from surgical instruments'],
        correct: 1,
        exp: 'IPS creates a floating secondary with no ground reference. A single fault (one conductor contacting ground) does not complete a shock circuit through the patient. The LIM alarms to alert staff to find and correct the fault before a second fault creates a hazard.',
      },
      {
        q: 'When a device fails electrical safety testing, the BMET must:',
        a: ['Continue using the device with caution and schedule repairs', 'Tag the device out of service and quarantine it until repaired and retested', 'Notify the clinical staff to use the device only in non-patient-contact mode', 'Lower the test thresholds and retest to confirm the failure'],
        correct: 1,
        exp: 'Any device that fails electrical safety testing must be immediately removed from service (red-tagged), quarantined to prevent accidental use, repaired, and retested before returning to patient care. No exceptions are permitted for patient-contacting equipment.',
      },
      {
        q: 'Which current level can cause ventricular fibrillation through macroshock (external, skin-surface shock)?',
        a: ['10-50 µA', '1-5 mA', '100-300 mA', '1-5 A'],
        correct: 2,
        exp: 'Macroshock ventricular fibrillation typically requires 100-300 mA crossing the body externally. Skin resistance and current dispersion protect against lower currents. GFCI devices trip at 5 mA to prevent macroshock fatalities well below the fibrillation threshold.',
      },
    ],
  },

  {
    id: 'bmet-equipment',
    num: 13,
    title: 'Diagnostic & Imaging Equipment',
    desc: 'ECG, pulse oximetry, blood pressure monitoring, ultrasound, X-ray, CT, and MRI safety fundamentals',
    slides: [
      {
        title: 'Patient Monitoring Equipment',
        body: [
          'The 12-lead electrocardiograph (ECG/EKG) records the electrical activity of the heart from 12 standard perspectives. Diagnostic ECGs require a bandwidth of 0.05 to 150 Hz to capture all clinically relevant waveform components including ST-segment changes. Monitoring ECGs use a narrower bandwidth (0.5 to 40 Hz) to reduce motion artifact in dynamic patients.',
          'Pulse oximetry (SpO2) uses two wavelengths of light (660 nm red and 940 nm infrared) to differentiate oxygenated and deoxygenated hemoglobin across a tissue bed, typically a finger or earlobe. Normal SpO2 is 95 to 100 percent. Accuracy can be affected by motion, nail polish (especially dark colors), poor perfusion, methemoglobinemia, and carboxyhemoglobinemia.',
          'Non-invasive blood pressure (NIBP) monitors use the oscillometric method: an inflated cuff occludes the brachial artery, and as the cuff deflates, pressure oscillations detected in the cuff correspond to systolic, mean, and diastolic pressures. NIBP accuracy per AAMI standards is plus or minus 5 mmHg mean error with a standard deviation of less than 8 mmHg.',
          'Temperature measurement in healthcare includes oral, axillary, rectal, tympanic, and temporal artery methods. Electronic thermometers use thermistors; infrared tympanic probes measure tympanic membrane radiation. BMET responsibilities include calibration verification against a NIST-traceable reference thermometer and replacing probe covers to prevent cross-contamination.',
        ],
        keyPoints: [
          'Diagnostic ECG bandwidth: 0.05-150 Hz; monitoring ECG: 0.5-40 Hz (narrower to reduce artifact)',
          'SpO2 uses 660 nm (red) and 940 nm (IR) wavelengths; normal 95-100%; affected by motion and nail polish',
          'NIBP oscillometric method: cuff occludes artery; oscillations identify systolic, mean, diastolic',
          'NIBP AAMI accuracy: ±5 mmHg mean error, SD <8 mmHg',
        ],
        quiz: [
          {
            q: 'A diagnostic 12-lead ECG requires a bandwidth of:',
            a: ['0.5 to 40 Hz', '0.05 to 150 Hz', '1 to 500 Hz', '20 to 20,000 Hz'],
            correct: 1,
            exp: 'Diagnostic ECGs require 0.05 to 150 Hz bandwidth to capture all clinically significant frequency components including low-frequency ST-segment changes (0.05 Hz) and high-frequency notches in QRS complexes (up to 150 Hz). Monitoring ECGs use a narrower 0.5-40 Hz bandwidth.',
          },
          {
            q: 'Pulse oximetry accuracy can be significantly reduced by:',
            a: ['Room lighting above 1000 lux', 'Patient weight over 200 pounds', 'Motion artifact, poor perfusion, and dark nail polish', 'Supplemental oxygen flow above 4 L/min'],
            correct: 2,
            exp: 'SpO2 accuracy is most affected by motion artifact (which creates signal noise), poor peripheral perfusion (reduces the pulsatile signal), dark nail polish (absorbs the 660 nm light), and dyshemoglobinemias (methemoglobin and carboxyhemoglobin are misread as oxyhemoglobin).',
          },
        ],
      },
      {
        title: 'Medical Imaging: X-ray & Ultrasound',
        body: [
          'Diagnostic X-ray systems generate X-rays by accelerating electrons from a cathode to a tungsten anode target. kVp (kilovolt peak) controls X-ray penetrating ability (higher kVp = more penetrating, less contrast). mAs (milliampere-seconds) controls X-ray quantity (exposure). BMET quality control (QC) testing verifies kVp accuracy (±5%), mA accuracy, exposure reproducibility, and half-value layer (HVL) for radiation output characterization.',
          'Fluoroscopy provides real-time X-ray imaging. Cumulative radiation dose is measured in milligray (mGy) or gray (Gy). Fluoroscopy units must comply with FDA performance standards (21 CFR 1020.32) including dose rate limits. Radiation safety programs require tracking of radiation workers and proper shielding of fluoroscopy suites.',
          'Ultrasound imaging uses transducer frequencies from 2 to 15 MHz. Higher frequencies provide better resolution but less penetration depth; lower frequencies penetrate deeper for abdominal imaging. B-mode (brightness mode) creates 2D grayscale images; Doppler modes measure blood flow velocity. Transducers contain piezoelectric crystals that convert electrical energy to sound and vice versa.',
          'Ultrasound QC testing includes image uniformity, axial and lateral resolution, distance accuracy, and sensitivity. Tissue-equivalent phantoms with known target spacings are used for calibration verification. BMET responsibilities include transducer inspection for cracks or delamination, probe connector inspection, and gel warmer temperature verification.',
        ],
        keyPoints: [
          'X-ray kVp: penetrating ability (higher = more penetrating); mAs: quantity; BMET QC: ±5% kVp accuracy',
          'Fluoroscopy: real-time X-ray; dose in mGy/Gy; FDA 21 CFR 1020.32 dose rate limits',
          'Ultrasound: 2-15 MHz; higher = better resolution, less depth; B-mode = 2D; Doppler = flow',
          'US QC: image uniformity, resolution, distance accuracy using tissue-equivalent phantoms',
        ],
        quiz: [
          {
            q: 'In medical X-ray imaging, increasing kVp primarily affects:',
            a: ['The quantity of X-rays produced (more exposure)', 'The penetrating ability of the X-ray beam', 'The size of the focal spot on the anode', 'The speed of the image receptor'],
            correct: 1,
            exp: 'kVp (kilovolt peak) controls the energy of the X-ray photons, which determines their penetrating ability. Higher kVp produces more penetrating (harder) X-rays. mAs controls the quantity of X-rays produced. Higher kVp also reduces image contrast by producing a narrower gray scale.',
          },
          {
            q: 'An ultrasound transducer operating at 15 MHz compared to one at 3 MHz will provide:',
            a: ['Greater tissue penetration and lower resolution', 'Better image resolution but reduced tissue penetration depth', 'The same resolution and penetration as the 3 MHz transducer', 'Better penetration and better resolution simultaneously'],
            correct: 1,
            exp: 'Higher ultrasound frequencies (15 MHz) provide better axial and lateral resolution due to shorter wavelengths, but acoustic attenuation increases with frequency, reducing the depth of penetration. Low-frequency transducers (3 MHz) are used for deep abdominal and cardiac imaging.',
          },
        ],
      },
      {
        title: 'MRI Safety & CT Fundamentals',
        body: [
          'Magnetic Resonance Imaging (MRI) uses strong static magnetic fields (typically 1.5 T or 3.0 T), radiofrequency pulses, and gradient magnetic fields to generate images. The primary safety concerns are the strong static field attracting ferromagnetic objects (projectile risk), RF heating of conductive implants, and gradient field-induced nerve stimulation.',
          'MRI facilities are divided into four zones. Zone I is publicly accessible. Zone II is the transition where screening occurs. Zone III requires controlled access by screened individuals. Zone IV is the magnet room itself. All personnel entering Zone III or IV must be screened for ferromagnetic implants, embedded metal fragments, or devices that may be adversely affected by the magnetic field.',
          'MRI-conditional devices are those tested and deemed safe in specific MRI environments under defined conditions. MRI-unsafe devices are strictly prohibited from the MRI suite. BMETs must never bring tools, equipment carts, or oxygen cylinders into Zone IV without verifying they are MRI-safe or MRI-conditional.',
          'CT (Computed Tomography) reconstructs cross-sectional images from X-ray projections acquired at multiple angles. Image quality is measured in Hounsfield Units (HU): water = 0 HU, air = -1000 HU, cortical bone = +400 to +1000 HU, soft tissue = +20 to +80 HU. CT QC testing includes HU accuracy, noise measurement, slice thickness, and CT number uniformity.',
        ],
        images: [
          { src: '/diagrams/mri-zones-safety.svg', alt: 'Diagram of MRI Zones I through IV with increasing screening requirements, the three MRI physics hazard types, and the MRI-conditional versus MRI-unsafe device distinction', caption: 'Screening gets stricter at every zone boundary — and the Zone IV magnetic field is always on, scan or no scan.' },
        ],
        keyPoints: [
          'MRI uses 1.5 T or 3.0 T fields; risks: ferromagnetic projectiles, RF implant heating, nerve stimulation',
          'MRI Zones I-IV: Zone IV is the magnet room; Zones III-IV require personnel screening',
          'MRI-conditional: safe under defined conditions; MRI-unsafe: strictly prohibited in suite',
          'CT HU scale: water = 0, air = -1000, bone = +400 to +1000; QC checks HU accuracy and noise',
        ],
        quiz: [
          {
            q: 'A standard MRI facility Zone IV refers to:',
            a: ['The publicly accessible hospital corridor outside the MRI area', 'The transition zone where patient and staff screening occurs', 'The magnet room itself containing the MRI bore', 'The equipment room with the RF amplifiers and gradient electronics'],
            correct: 2,
            exp: 'Zone IV is the MRI magnet room containing the scanner bore. Only screened individuals with confirmed absence of MRI-unsafe implants or devices may enter. The strong magnetic field exists continuously even when the scanner is not imaging.',
          },
          {
            q: 'In a CT image, a structure reading -900 HU most likely represents:',
            a: ['Dense cortical bone', 'Soft tissue', 'Air or gas', 'Contrast-enhanced blood vessels'],
            correct: 2,
            exp: 'The Hounsfield Unit scale places air at -1000 HU. A value of -900 HU indicates a very low-density gas-containing structure such as lung tissue, a pneumothorax, or bowel gas. Bone is +400 to +1000 HU; soft tissue is +20 to +80 HU; water is 0 HU.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Diagnostic ECG bandwidth extends down to 0.05 Hz to accurately capture which ECG feature?',
        a: ['High-frequency QRS notches', 'ST-segment displacement', 'P-wave timing intervals', 'QT interval duration'],
        correct: 1,
        exp: 'Low-frequency ST-segment changes (elevation or depression) require the ECG bandwidth to extend as low as 0.05 Hz. Monitoring ECGs use 0.5 Hz as the low-frequency cutoff, which can distort ST segments and miss clinically significant changes.',
      },
      {
        q: 'Pulse oximetry uses two wavelengths of light (660 nm and 940 nm) to differentiate:',
        a: ['Arterial and venous blood flow', 'Oxygenated and deoxygenated hemoglobin', 'Blood glucose and plasma levels', 'Heart rate and respiratory rate'],
        correct: 1,
        exp: 'Oxyhemoglobin and deoxyhemoglobin absorb red (660 nm) and infrared (940 nm) light differently. SpO2 is calculated from the ratio of the pulsatile signals at both wavelengths using the Beer-Lambert law.',
      },
      {
        q: 'NIBP monitors use the oscillometric method to determine blood pressure by:',
        a: ['Measuring pressure pulsations in the cuff as it deflates from above systolic pressure', 'Listening with a microphone for Korotkoff sounds under the cuff', 'Measuring the ultrasound Doppler shift of arterial blood flow', 'Comparing arterial impedance between inflated and deflated states'],
        correct: 0,
        exp: 'Oscillometric NIBP measures pressure oscillations in the cuff bladder. As the cuff deflates, oscillations increase to a maximum at mean arterial pressure, then decrease. Systolic and diastolic pressures are derived from the oscillation pattern using proprietary algorithms.',
      },
      {
        q: 'X-ray kVp accuracy must be within what percentage per BMET quality control standards?',
        a: ['±1%', '±5%', '±10%', '±15%'],
        correct: 1,
        exp: 'kVp accuracy is typically required to be within ±5% of the set value per QC standards. Errors beyond this affect image quality and patient dose. kVp meters are used to measure the actual peak voltage output during testing.',
      },
      {
        q: 'An ultrasound transducer frequency of 7.5 MHz compared to 3.5 MHz will produce images with:',
        a: ['Better resolution and greater penetration depth', 'Better resolution but less penetration depth', 'Less resolution but greater penetration depth', 'No difference in clinical image quality'],
        correct: 1,
        exp: 'Higher ultrasound frequencies produce shorter wavelengths with better spatial resolution but greater acoustic attenuation, limiting penetration depth. 7.5 MHz is suited to superficial structures; 3.5 MHz is used for deeper abdominal and cardiac imaging.',
      },
      {
        q: 'The primary projectile risk in an MRI suite is caused by:',
        a: ['RF pulses energizing metal objects', 'Gradient magnetic field switching forces on conductive objects', 'The strong static magnetic field attracting ferromagnetic objects', 'Patient movement during scanning'],
        correct: 2,
        exp: 'The strong static magnetic field (1.5 T or 3.0 T) exerts powerful attraction on ferromagnetic objects (iron, nickel, cobalt-based metals). If brought into Zone IV, these objects can become high-speed projectiles causing patient and staff injury or equipment damage.',
      },
      {
        q: 'MRI Zone IV refers to:',
        a: ['The public area outside the MRI department', 'The screening and transition area', 'The control room outside the magnet', 'The magnet room itself'],
        correct: 3,
        exp: 'Zone IV is the MRI magnet room containing the scanner bore. The magnetic field is always active. Only personnel who have been screened for contraindications may enter Zone III and Zone IV.',
      },
      {
        q: 'A CT scan shows a lesion measuring +60 HU. This is most consistent with:',
        a: ['Air or gas', 'Soft tissue', 'Dense bone', 'Fat tissue (approximately -100 HU)'],
        correct: 1,
        exp: 'Soft tissue has CT HU values approximately +20 to +80 HU. A value of +60 HU is consistent with muscle, solid organ tissue, or unenhanced blood. Air is -1000 HU; fat is approximately -100 HU; dense bone is +400 to +1000 HU.',
      },
      {
        q: 'Fluoroscopy radiation dose is measured in units of:',
        a: ['Millisieverts per hour (mSv/hr) only', 'Milligray (mGy) or Gray (Gy)', 'Milliroentgens (mR)', 'Becquerels (Bq)'],
        correct: 1,
        exp: 'Fluoroscopy dose is measured in milligray (mGy) or gray (Gy), which quantify the absorbed radiation energy in tissue. FDA performance standards (21 CFR 1020.32) limit fluoroscopy dose rates to protect patients from radiation-induced skin injuries during prolonged procedures.',
      },
      {
        q: 'MRI-conditional medical devices are those that have been:',
        a: ['Approved by FDA for all MRI environments without restriction', 'Tested and determined to pose no known hazards in specified MRI environments under defined conditions', 'Prohibited from the MRI suite regardless of manufacturer claims', 'Tested only at 1.5 T and assumed safe at 3.0 T automatically'],
        correct: 1,
        exp: 'MRI-conditional devices have been tested and found safe within specific defined conditions including field strength, spatial gradient, and RF conditions. The conditions must be verified before the device enters the MRI suite. MRI-unsafe devices must never enter Zone III or IV.',
      },
    ],
  },

  {
    id: 'bmet-lifesupport',
    num: 14,
    title: 'Life Support & Therapeutic Equipment',
    desc: 'Ventilators, infusion pumps, defibrillators, physiologic monitoring, and anesthesia machine fundamentals',
    slides: [
      {
        title: 'Mechanical Ventilators',
        body: [
          'Mechanical ventilators support or replace spontaneous breathing in patients with respiratory failure. Key ventilator parameters include tidal volume (VT, typically 6-8 mL/kg ideal body weight), respiratory rate (RR, typically 12-20 breaths/min), peak inspiratory pressure (PIP), PEEP (positive end-expiratory pressure), and FiO2 (fraction of inspired oxygen, 21-100%).',
          'Ventilator modes include volume-controlled ventilation (VCV, delivers a set tidal volume regardless of pressure), pressure-controlled ventilation (PCV, delivers a set pressure and allows tidal volume to vary), and pressure support ventilation (PSV, patient-triggered with pressure support for each breath). SIMV (synchronized intermittent mandatory ventilation) allows patient breaths between mandatory ventilator breaths.',
          'Ventilator alarms are critical for patient safety. High-pressure alarms indicate increased airway resistance or reduced compliance (bronchospasm, mucus plug, pneumothorax). Low-pressure alarms indicate circuit disconnection or leak. High and low tidal volume alarms indicate ventilation changes. Alarms must never be silenced without addressing the underlying cause.',
          'BMET PM for ventilators includes flow sensor calibration, pressure transducer verification, FiO2 sensor replacement or calibration, safety valve testing, alarm function testing, and circuit integrity. Ventilators are high-risk devices; PMs must be performed at intervals specified by the manufacturer (typically every 6-12 months).',
        ],
        images: [
          { src: '/diagrams/ventilator-modes-alarms.svg', alt: 'Diagram of key ventilator parameters VT, RR, PIP, PEEP, and FiO2, the VCV/PCV/PSV ventilation modes, the high- and low-pressure alarm meanings, and the ventilator PM checklist', caption: 'High-pressure alarm means resistance went up; low-pressure means the circuit came apart — never silence either without finding the cause.' },
        ],
        keyPoints: [
          'VT: 6-8 mL/kg IBW; key parameters: VT, RR, PIP, PEEP, FiO2',
          'VCV: set volume; PCV: set pressure; PSV: patient-triggered with pressure support',
          'High-pressure alarm: increased resistance/reduced compliance; low-pressure: disconnection/leak',
          'Ventilator PM: flow sensor calibration, FiO2 sensor, pressure transducer, alarm verification',
        ],
        quiz: [
          {
            q: 'A ventilator high-pressure alarm during a patient breath most likely indicates:',
            a: [
              'A circuit disconnection or large leak',
              'Increased airway resistance or decreased lung compliance such as bronchospasm or mucus plug',
              'A failed FiO2 sensor',
              'An empty oxygen supply cylinder',
            ],
            correct: 1,
            exp: 'High-pressure alarms indicate the ventilator is delivering the set volume but meeting increased resistance or decreased compliance. Common causes include bronchospasm, secretion plugging, patient biting the tube, pneumothorax, or patient-ventilator dyssynchrony. A disconnection would cause a low-pressure alarm.',
          },
          {
            q: 'PEEP (Positive End-Expiratory Pressure) is a ventilator setting that:',
            a: [
              'Increases the tidal volume delivered with each breath',
              'Maintains positive airway pressure at the end of exhalation to prevent alveolar collapse',
              'Controls the rate of pressure rise during inspiration',
              'Sets the FiO2 for each delivered breath',
            ],
            correct: 1,
            exp: 'PEEP maintains positive pressure in the airway at the end of expiration, preventing alveolar collapse (atelectasis) and improving oxygenation by recruiting collapsed alveoli. It is used in ARDS, pneumonia, and other conditions causing alveolar instability.',
          },
        ],
      },
      {
        title: 'Infusion Pumps & Defibrillators',
        body: [
          'Infusion pumps deliver medications, fluids, and nutrients intravenously with controlled flow rates and volumes. Large-volume pumps (LVPs) typically operate at 1-999 mL/hr. Syringe pumps deliver small volumes at precise rates for high-concentration medications (vasopressors, insulin, sedatives). PCA (patient-controlled analgesia) pumps allow patients to self-administer locked doses of pain medication.',
          'FDA has issued numerous recalls and safety communications about infusion pump software errors, free-flow protection failures, and alarm failures. Key BMET safety checks include occlusion alarm testing (verifying the pump alarms and stops when tubing is obstructed), free-flow protection testing (preventing uncontrolled flow when tubing is removed from the pump), and flow rate accuracy verification (typically ±5%).',
          'Defibrillators deliver a controlled high-voltage electrical shock to terminate ventricular fibrillation (VF) or ventricular tachycardia (VT). Monophasic defibrillators deliver 360 J maximum. Biphasic defibrillators are more effective and use lower energy (typically 120-200 J), reducing myocardial damage. AEDs (automated external defibrillators) analyze rhythm and guide lay rescuers through the shock sequence.',
          'Defibrillator testing uses a specialized energy analyzer (such as a Fluke Biomedical QED-6) that measures delivered energy in joules. PM includes energy delivery accuracy (typically ±15% of set energy), battery capacity test, synchronization mode (for cardioversion), and internal self-test verification. Defibrillators must be tested and ready at all times due to their life-saving role.',
        ],
        images: [
          { src: '/diagrams/infusion-defib-safety-checks.svg', alt: 'Diagram of infusion pump types and the three mandatory pump safety checks, plus a comparison of monophasic versus biphasic defibrillation energy and defibrillator PM requirements', caption: 'Free-flow protection stops a gravity bolus; biphasic defibrillation does more with less energy — both are life-safety, not routine PM.' },
        ],
        keyPoints: [
          'LVP: 1-999 mL/hr; syringe pump: precise low volumes; PCA: patient-controlled analgesia',
          'Infusion pump safety checks: occlusion alarm, free-flow protection, flow rate accuracy ±5%',
          'Monophasic: up to 360 J; biphasic: 120-200 J, more effective with less myocardial damage',
          'Defibrillator PM: energy accuracy ±15%, battery test, sync mode, self-test verification',
        ],
        quiz: [
          {
            q: 'Free-flow protection testing on an infusion pump verifies that:',
            a: [
              'The pump delivers the correct flow rate when the set rate is changed',
              'The pump prevents uncontrolled fluid flow when tubing is removed from the pump mechanism',
              'The pump alarms when the IV bag is nearly empty',
              'The pump delivers accurate flow at the highest possible rate',
            ],
            correct: 1,
            exp: 'Free-flow protection prevents gravity-driven uncontrolled flow of medication when IV tubing is removed from the pump or the cassette/door is opened. Without free-flow protection, patients can receive dangerous bolus doses of potent medications.',
          },
          {
            q: 'A biphasic defibrillator is preferred over monophasic because it:',
            a: [
              'Delivers higher energy (up to 720 J) for difficult cases',
              'Terminates arrhythmias more effectively with lower energy, reducing myocardial damage',
              'Does not require electrode pads — delivers through the air',
              'Never requires testing or maintenance due to solid-state design',
            ],
            correct: 1,
            exp: 'Biphasic defibrillators deliver current in two phases (positive then negative), which more efficiently depolarizes myocardium. They achieve equivalent or better defibrillation success with 120-200 J versus the 360 J required by monophasic devices, reducing myocardial injury from the shock.',
          },
        ],
      },
      {
        title: 'Physiologic Monitoring & Anesthesia Systems',
        body: [
          'Bedside physiologic monitors integrate multiple vital sign measurements including ECG, SpO2, NIBP, invasive blood pressure (IBP), temperature, capnography (end-tidal CO2, EtCO2), and respiratory rate. Multi-parameter monitors send data to central nursing stations and hospital information systems (HIS) for continuous patient surveillance.',
          'Invasive blood pressure (IBP) monitoring uses a fluid-filled catheter connected to a pressure transducer (disposable strain gauge). The transducer must be zeroed at the phlebostatic axis (4th intercostal space, mid-axillary line) before measurements. BMET testing verifies pressure transducer accuracy using a mercury column or electronic pressure reference.',
          'Capnography measures end-tidal CO2 (EtCO2) in exhaled breath as an indicator of ventilation adequacy and metabolic status. Normal EtCO2 is 35-45 mmHg. Mainstream capnometers place the sensor directly in the airway circuit; sidestream capnometers aspirate a sample to an external analyzer. BMET calibration uses certified gas mixtures.',
          'Anesthesia delivery systems combine a ventilator, medical gas delivery, vaporizers for volatile anesthetic agents, and a breathing circuit. Vaporizers are calibrated to deliver a precise concentration of agent (measured in percent). BMET anesthesia machine PM includes leak testing of all gas pathways, vaporizer output verification, oxygen flush valve function, and backup power testing.',
        ],
        keyPoints: [
          'Bedside monitors integrate ECG, SpO2, NIBP, IBP, temperature, capnography, and RR',
          'IBP transducer must be zeroed at the phlebostatic axis; verified with pressure reference',
          'Capnography EtCO2 normal: 35-45 mmHg; calibrated with certified gas mixtures',
          'Anesthesia PM: leak test, vaporizer output, O2 flush, backup power verification',
        ],
        quiz: [
          {
            q: 'An invasive blood pressure transducer must be zeroed at which anatomical reference point?',
            a: ['The top of the patient\'s head', 'The 4th intercostal space at the mid-axillary line (phlebostatic axis)', 'The site of the arterial catheter insertion', 'The patient\'s wrist level'],
            correct: 1,
            exp: 'The phlebostatic axis (4th intercostal space, mid-axillary line) represents the level of the right atrium and is the standard zero reference for invasive blood pressure measurements. Zeroing above or below this point creates hydrostatic pressure errors.',
          },
          {
            q: 'Normal end-tidal CO2 (EtCO2) measured by capnography is:',
            a: ['10-20 mmHg', '35-45 mmHg', '60-80 mmHg', '95-100 mmHg'],
            correct: 1,
            exp: 'Normal EtCO2 is 35-45 mmHg, closely approximating arterial PaCO2 in patients with normal cardiopulmonary function. Low EtCO2 indicates hyperventilation or reduced perfusion; high EtCO2 indicates hypoventilation or increased CO2 production.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'A ventilator high-pressure alarm triggers during a breath delivery. The most likely cause is:',
        a: ['Circuit disconnection causing a large leak', 'Increased airway resistance or decreased lung compliance', 'A failed FiO2 sensor', 'Low oxygen supply pressure'],
        correct: 1,
        exp: 'High-pressure alarms indicate the ventilator meets increased resistance when trying to deliver the set volume or pressure. Common causes include bronchospasm, mucus plugging, pneumothorax, or the patient biting the endotracheal tube. A disconnection causes a low-pressure alarm.',
      },
      {
        q: 'PEEP on a ventilator is used to:',
        a: ['Increase tidal volume', 'Maintain positive airway pressure at end-exhalation to prevent alveolar collapse', 'Control inspiratory flow rate', 'Set the FiO2 level'],
        correct: 1,
        exp: 'PEEP maintains positive pressure in the airway at the end of expiration, preventing alveolar collapse and improving oxygenation by recruiting unstable alveoli. It is commonly used in ARDS, pneumonia, and post-surgical respiratory support.',
      },
      {
        q: 'Infusion pump flow rate accuracy is typically required to be within:',
        a: ['±1%', '±5%', '±10%', '±20%'],
        correct: 1,
        exp: 'Standard infusion pump flow rate accuracy specifications are typically ±5% of the set rate. This tolerance is clinically acceptable for most medications. High-alert drugs administered by syringe pump may have tighter clinical accuracy requirements at the bedside.',
      },
      {
        q: 'Free-flow protection on an infusion pump prevents:',
        a: ['Air bubbles from entering the IV line', 'Uncontrolled gravity-driven flow when tubing is removed from the pump', 'The pump from running at rates higher than 999 mL/hr', 'Power surges from damaging the pump motor'],
        correct: 1,
        exp: 'Free-flow protection is a mechanical or electronic mechanism that blocks IV tubing flow when it is removed from the pump cassette or when the door is opened. Without it, gravity can drive a bolus of potent medication into the patient.',
      },
      {
        q: 'Biphasic defibrillators use lower energy than monophasic because:',
        a: ['They cannot store more than 200 J safely', 'Biphasic current more efficiently depolarizes myocardium, achieving better results with less energy', 'Lower energy is required due to improved electrode pad materials', 'FDA mandated lower energy limits for all new defibrillators'],
        correct: 1,
        exp: 'Biphasic waveforms deliver current in two directions, more effectively depolarizing the heart. Clinical evidence shows 120-200 J biphasic energy achieves equivalent or superior defibrillation versus 360 J monophasic, with reduced post-shock myocardial injury.',
      },
      {
        q: 'A defibrillator energy accuracy test measures:',
        a: ['Voltage output at the electrodes', 'Delivered energy in joules compared to the set energy', 'Current waveform frequency in Hz', 'Battery voltage during the charging cycle'],
        correct: 1,
        exp: 'Defibrillator PM includes energy delivery accuracy testing using a calibrated energy analyzer. The delivered joules must be within ±15% (or per manufacturer specification) of the set energy level at each selectable setting tested.',
      },
      {
        q: 'An invasive arterial blood pressure transducer is zeroed at the phlebostatic axis to:',
        a: ['Prevent blood from entering the transducer', 'Establish a reference pressure equal to atmospheric at the level of the right atrium', 'Calibrate the transducer to 100 mmHg', 'Align the sensor with the arterial catheter insertion site'],
        correct: 1,
        exp: 'Zeroing at the phlebostatic axis (4th ICS, mid-axillary line) compensates for hydrostatic pressure differences between the transducer and the measurement site. This reference point corresponds to the right atrium, providing accurate blood pressure values regardless of patient position changes.',
      },
      {
        q: 'Normal end-tidal CO2 (EtCO2) range measured by capnography is:',
        a: ['10-20 mmHg', '35-45 mmHg', '60-80 mmHg', '95-100 mmHg'],
        correct: 1,
        exp: 'EtCO2 normally ranges 35-45 mmHg, closely approximating arterial CO2 in patients with intact cardiopulmonary function. Values outside this range indicate ventilation abnormalities, perfusion problems, or metabolic disorders.',
      },
      {
        q: 'During anesthesia machine preventive maintenance, the BMET must verify:',
        a: ['Patient anesthesia depth using EEG monitoring', 'Leak-free gas pathways, vaporizer output accuracy, oxygen flush valve, and backup power', 'Surgical instrument sterilization records', 'Surgical suite temperature and humidity'],
        correct: 1,
        exp: 'Anesthesia machine PM includes leak testing of all gas pathways (a leak could cause hypoxia), vaporizer output concentration verification, oxygen flush valve function (must deliver 35-75 L/min), and backup power testing to ensure the machine functions during a power failure.',
      },
      {
        q: 'A PCA (Patient-Controlled Analgesia) pump differs from a standard infusion pump by:',
        a: ['Delivering larger volumes at higher flow rates', 'Allowing the patient to self-administer locked doses of pain medication within programmed limits', 'Being gravity-fed rather than motorized', 'Requiring continuous nursing supervision for every dose'],
        correct: 1,
        exp: 'PCA pumps allow patients to request and receive analgesic doses within programmed lockout intervals and dose limits. This provides patient autonomy while preventing overdose. BMET testing includes lockout interval verification, dose accuracy, and maximum dose limit programming verification.',
      },
    ],
  },

  {
    id: 'bmet-itm',
    num: 15,
    title: 'Preventive Maintenance & Regulatory Compliance',
    desc: 'PM programs, work order documentation, equipment recalls, HIPAA for BMETs, and quality management systems',
    slides: [
      {
        title: 'Preventive Maintenance Programs',
        body: [
          'Preventive maintenance (PM) is scheduled service performed at defined intervals to ensure equipment safety, accuracy, and reliability before failures occur. PM intervals are based on manufacturer recommendations, equipment risk assessment, device history, and TJC requirements. High-risk life-support equipment (ventilators, infusion pumps, defibrillators) typically requires PM every 6 to 12 months.',
          'Risk-based PM strategies use equipment criticality scores to prioritize work. Criticality scores consider function (life-support vs. non-critical), physical risk (high voltage vs. low power), required maintenance (manufacturer-required PM vs. no specific PM), and incident history. Equipment with low criticality scores and no maintenance requirements (such as electric beds and some furniture-type items) may be placed on an alternative equipment management (AEM) plan.',
          'Work orders document every interaction with medical equipment including PMs, corrective repairs, inspections, and calibrations. Work orders must capture the device identification (asset number, make, model, serial number), work performed, parts replaced, test results, and technician name and date. Work orders are the primary evidence of compliance during TJC surveys.',
          'Calibration ensures that measuring instruments provide accurate outputs traceable to national or international standards. BMET calibration activities include verifying defibrillator energy output, patient monitor accuracy, infusion pump flow rates, and thermometer accuracy against NIST-traceable references. Calibration records must include the reference standard used, its current calibration certificate, and measurement results.',
        ],
        keyPoints: [
          'PM intervals based on manufacturer recommendations, risk assessment, and TJC requirements',
          'Alternative Equipment Management (AEM) allows low-risk equipment to use modified PM strategies',
          'Work orders document every interaction: device ID, work performed, parts, test results, technician, date',
          'Calibration traceability to NIST-traceable references required for all measuring instruments',
        ],
        quiz: [
          {
            q: 'An Alternative Equipment Management (AEM) plan in a hospital biomedical department allows:',
            a: [
              'Emergency-only repairs without scheduled PM for all equipment',
              'Low-risk, low-criticality equipment to use modified or reduced PM strategies based on risk assessment',
              'Patient-owned personal devices to bypass safety inspections',
              'Deferring all maintenance until equipment fails',
            ],
            correct: 1,
            exp: 'AEM plans are permitted by TJC for low-risk equipment that does not require traditional PM. By demonstrating through risk assessment that the equipment\'s failure would not harm patients and that no manufacturer-required PM exists, departments can redirect BMET resources to higher-risk devices.',
          },
          {
            q: 'BMET calibration records must include which critical element to demonstrate measurement accuracy?',
            a: [
              'A photograph of the equipment being tested',
              'The NIST-traceable reference standard used and its current calibration certificate',
              'A signature from the department director approving the result',
              'The number of clinical staff present during testing',
            ],
            correct: 1,
            exp: 'Calibration traceability requires that the reference standard used be calibrated by a laboratory traceable to NIST (National Institute of Standards and Technology). The calibration certificate, valid during the test, must be documented to demonstrate the accuracy of measurements made during the calibration.',
          },
        ],
      },
      {
        title: 'Equipment Recalls & HIPAA Compliance',
        body: [
          'FDA issues medical device recalls when a product is found to be defective or potentially harmful. Class I recalls involve reasonable probability of serious adverse health consequences or death. Class II recalls involve products that may cause temporary adverse health effects. Class III recalls involve products unlikely to cause adverse health effects but that violate FDA regulations. BMETs must act on Class I and Class II recalls immediately.',
          'When a recall notice is received, the BMET department must: (1) identify all affected devices in the inventory by model and serial number; (2) quarantine affected units from patient use; (3) contact the manufacturer for remediation instructions (software update, repair kit, or device return); (4) document the recall response for every affected device; and (5) report completion to the hospital risk management or compliance office.',
          'HIPAA (Health Insurance Portability and Accountability Act) applies to BMETs because medical equipment often stores Protected Health Information (PHI) — waveforms, images, patient identifiers, and encounter data on hard drives and memory. Before disposing of, returning, or transferring any equipment containing patient data, BMETs must ensure PHI is sanitized according to the hospital HIPAA policies.',
          'PHI sanitization methods include degaussing (magnetic erasure of hard drives), cryptographic erase (if supported by the device), and physical destruction of storage media. Simply deleting files or performing a standard factory reset is insufficient for HIPAA compliance. Certificates of data destruction must be obtained for equipment sent to outside vendors.',
        ],
        keyPoints: [
          'FDA Class I recall: serious risk of death or injury — immediate action required',
          'Recall response: identify affected devices, quarantine, contact manufacturer, document all actions',
          'HIPAA applies to BMET: equipment storing PHI must be sanitized before disposal, transfer, or repair',
          'PHI sanitization: degaussing, cryptographic erase, or physical destruction — factory reset is insufficient',
        ],
        quiz: [
          {
            q: 'An FDA Class I device recall indicates:',
            a: [
              'A minor labeling error with no safety risk',
              'A reasonable probability of serious adverse health consequences or death',
              'A cosmetic defect that does not affect device performance',
              'A voluntary correction by the manufacturer with no safety concern',
            ],
            correct: 1,
            exp: 'FDA Class I is the most serious recall classification, indicating a reasonable probability that the device will cause serious adverse health consequences or death. Immediate action is required to remove affected devices from service and notify affected parties.',
          },
          {
            q: 'Before returning a patient monitor hard drive for warranty replacement, a BMET must:',
            a: [
              'Simply delete the patient files using the device user interface',
              'Ensure PHI on the storage media is sanitized using degaussing, cryptographic erase, or physical destruction',
              'Obtain written patient consent for data transfer to the manufacturer',
              'Label the drive with a HIPAA warning sticker and ship it',
            ],
            correct: 1,
            exp: 'HIPAA requires that PHI be secured before equipment leaves the facility. Standard file deletion or factory reset leaves recoverable data. Proper sanitization uses degaussing, NIST 800-88-compliant overwriting, cryptographic erase, or physical destruction, with a certificate of data destruction obtained from the vendor.',
          },
        ],
      },
      {
        title: 'Incident Reporting & Device Vigilance',
        body: [
          'Medical device adverse events must be reported under the Safe Medical Devices Act (SMDA) and FDA MedWatch program. User facilities (hospitals) must report to FDA and the device manufacturer when a device has or may have caused or contributed to a patient death or serious injury. Reports must be filed within 10 days (death) or 30 days (serious injury) of becoming aware of the event.',
          'The BMET department investigates device-related incidents by preserving the device and all associated accessories (tubing, leads, disposables) in the condition at the time of the incident, documenting the incident timeline, reviewing equipment maintenance history, and performing a technical evaluation of the device to determine if a malfunction occurred.',
          'Near-miss events (events that did not cause harm but could have) should also be documented and investigated within the facility. Root cause analysis (RCA) identifies contributing factors and systemic issues. BMET-identified near-misses often lead to improvements in PM procedures, user training, or equipment standardization.',
          'The hospital\'s Technology Committee or Patient Safety Committee may request BMET input when evaluating new equipment purchases. BMETs assess serviceability, parts availability, manufacturer service support, training requirements, and compatibility with existing systems when advising on technology acquisitions.',
        ],
        keyPoints: [
          'SMDA requires reporting device-related deaths within 10 days, serious injuries within 30 days to FDA',
          'Incident investigation: preserve device and accessories, document timeline, review maintenance history',
          'Near-miss events should be documented and analyzed with root cause analysis',
          'BMETs advise on technology acquisitions: serviceability, parts availability, training requirements',
        ],
        quiz: [
          {
            q: 'Under the Safe Medical Devices Act (SMDA), a hospital must report a device-related patient death to FDA within:',
            a: ['24 hours', '10 days', '30 days', '90 days'],
            correct: 1,
            exp: 'The SMDA requires user facilities to report device-related deaths to the FDA within 10 working days. Serious injuries must be reported within 10 working days as well (to the manufacturer; FDA is copied if the manufacturer is unknown). Reports are submitted through FDA MedWatch.',
          },
          {
            q: 'When a device-related incident occurs, the BMET must first:',
            a: [
              'Immediately repair the device and return it to service',
              'Preserve the device and all associated accessories in the condition at the time of the incident',
              'Send the device to the manufacturer for inspection before documenting anything',
              'Perform a full PM on the device before the clinical team can document the incident',
            ],
            correct: 1,
            exp: 'Preserving the device in its incident state is critical for investigation. Changing settings, replacing consumables, or repairing the device before investigation destroys evidence of potential malfunction. The device should be quarantined with a tag documenting the incident date and circumstances.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'Which regulatory body requires hospitals to report device-related patient deaths within 10 days?',
        a: ['TJC (The Joint Commission)', 'FDA under the Safe Medical Devices Act', 'OSHA', 'CMS (Centers for Medicare and Medicaid)'],
        correct: 1,
        exp: 'The FDA\'s Safe Medical Devices Act (SMDA) requires user facilities to report device-related deaths and serious injuries to FDA and the manufacturer. Death reports are due within 10 working days of becoming aware of the event.',
      },
      {
        q: 'An Alternative Equipment Management (AEM) plan allows a hospital to:',
        a: ['Delay PM on life-support equipment when the BMET department is understaffed', 'Modify PM strategies for low-risk equipment based on risk assessment and evidence', 'Eliminate all PM for equipment over 10 years old', 'Use unqualified staff to perform PM on non-critical equipment'],
        correct: 1,
        exp: 'TJC permits AEM for equipment where risk assessment demonstrates standard PM intervals are not necessary for safety. Equipment must meet criteria including no serious injury history, no manufacturer-required PM, and low risk classification.',
      },
      {
        q: 'FDA Class I medical device recalls require:',
        a: ['Monitoring the situation and reporting at the next annual survey', 'Immediate identification, quarantine of affected devices, and documented manufacturer remediation', 'Only notifying clinical staff verbally with no documentation', 'Returning the devices at the next scheduled delivery window'],
        correct: 1,
        exp: 'Class I recalls involve serious safety risks. BMETs must immediately identify all affected devices by serial number, quarantine them from patient use, contact the manufacturer for remediation instructions, and document every step including completion confirmation.',
      },
      {
        q: 'A standard factory reset of a device hard drive before equipment disposal:',
        a: ['Is sufficient to comply with HIPAA data sanitization requirements', 'Does not adequately sanitize PHI — degaussing, cryptographic erase, or physical destruction is required', 'Complies with HIPAA only if witnessed by a supervisor', 'Is required as the first step before more thorough sanitization methods'],
        correct: 1,
        exp: 'Factory resets typically only delete file system pointers, leaving recoverable data on the drive. HIPAA requires proper sanitization using NIST 800-88-compliant methods: overwriting, cryptographic erase (for self-encrypting drives), degaussing, or physical destruction.',
      },
      {
        q: 'Calibration records must include which element to ensure measurement traceability?',
        a: ['Photographs of the equipment under test', 'The NIST-traceable reference standard used and its current calibration certificate', 'The hospital\'s JCAHO accreditation number', 'A physician signature approving the calibration results'],
        correct: 1,
        exp: 'Calibration traceability requires documentation of the reference standard used (make, model, serial number, calibration due date) and the calibration certificate showing its traceability to NIST. This chain of traceability validates that measurements are accurate relative to national standards.',
      },
      {
        q: 'When investigating a device-related patient incident, the BMET must first:',
        a: ['Repair the device to determine if it was functional', 'Preserve the device and all accessories in incident state before any testing or repair', 'Send the device directly to the manufacturer', 'Perform electrical safety testing immediately'],
        correct: 1,
        exp: 'Preserving the device in its incident state is the first priority. Any modification before investigation — changing settings, replacing parts, or performing repairs — can destroy evidence of malfunction. The device must be quarantined with documentation of the incident.',
      },
      {
        q: 'PM intervals for life-support equipment such as ventilators and defibrillators are typically:',
        a: ['Every 5 years based on TJC minimum requirements', 'Every 6 to 12 months based on manufacturer recommendations and risk assessment', 'Only when the device shows visible signs of malfunction', 'Once at initial installation and not again unless a problem occurs'],
        correct: 1,
        exp: 'Life-support equipment typically requires PM every 6-12 months per manufacturer recommendations. High-risk devices may require more frequent PM intervals based on device history, environmental factors, or clinical experience.',
      },
      {
        q: 'Under HIPAA, biomedical technicians must sanitize PHI from equipment when:',
        a: ['Only when equipment is being permanently disposed of', 'Whenever equipment is disposed of, transferred to another facility, or returned to a vendor for repair', 'Only when the equipment failed and is being scrapped', 'Only if the equipment stores imaging data'],
        correct: 1,
        exp: 'HIPAA requires PHI sanitization whenever equipment leaves the facility\'s control, whether for disposal, transfer, or repair. Medical devices that store any patient-identifiable data (waveforms, images, logs, identifiers) are subject to this requirement.',
      },
      {
        q: 'A near-miss event in a biomedical context should be:',
        a: ['Ignored since no patient was harmed', 'Documented and analyzed using root cause analysis to prevent future occurrences', 'Reported only if it involves life-support equipment', 'Disclosed only to the attending physician'],
        correct: 1,
        exp: 'Near-miss events represent opportunities to identify and correct system vulnerabilities before an actual harm event occurs. Root cause analysis of near-misses often reveals training gaps, equipment issues, or process failures that can be corrected proactively.',
      },
      {
        q: 'Work orders in a BMET department serve primarily as:',
        a: ['Billing documents for patient equipment charges', 'Documentation of every device interaction required for TJC compliance and regulatory evidence', 'Records for equipment lease agreements', 'Inventory purchase orders for replacement parts'],
        correct: 1,
        exp: 'Work orders are the primary compliance evidence for TJC surveys and regulatory audits. They document every PM, repair, inspection, and calibration with device identification, work performed, parts used, test results, technician name, and date.',
      },
    ],
  },

  {
    id: 'bmet-career',
    num: 16,
    title: 'CBET Certification & Biomedical Career Paths',
    desc: 'CBET exam requirements, CLES and CRES credentials, career outlook, and professional development in biomedical technology',
    slides: [
      {
        title: 'CBET Certification',
        body: [
          'The Certified Biomedical Equipment Technician (CBET) credential is administered by AAMI (Association for the Advancement of Medical Instrumentation) and is the primary professional certification for biomedical equipment technicians. CBET is widely recognized by hospitals and healthcare systems as a standard of competency in biomedical technology.',
          'CBET eligibility requires an associate degree or higher in electronics, biomedical technology, or a related field plus 2 years of relevant work experience. Candidates without a degree can qualify with additional work experience (typically 4 years for those with a high school diploma or equivalent). The exam contains 165 questions and must be completed in 3 hours.',
          'The CBET exam covers four domains: anatomy, physiology, and medical terminology; healthcare technology function; healthcare technology management; and safety and regulatory compliance. The exam tests applied knowledge — candidates must be able to interpret schematics, perform calculations, analyze troubleshooting scenarios, and apply regulatory standards.',
          'CBET certification is valid for 5 years and requires 45 continuing education units (CEUs) for renewal. CEUs can be earned through AAMI conferences, manufacturer training, college courses, webinars, and professional association activities. Maintaining CBET demonstrates commitment to professional development and keeps technicians current with evolving technology.',
        ],
        keyPoints: [
          'CBET by AAMI: primary biomedical certification; 165 questions, 3 hours',
          'Eligibility: associate degree + 2 years experience (or more experience without degree)',
          'Four domains: anatomy/physiology, technology function, technology management, safety/compliance',
          'CBET renewal: every 5 years, 45 CEUs required',
        ],
        quiz: [
          {
            q: 'The CBET (Certified Biomedical Equipment Technician) credential is administered by:',
            a: ['TJC (The Joint Commission)', 'AAMI (Association for the Advancement of Medical Instrumentation)', 'FDA (Food and Drug Administration)', 'NICET (National Institute for Certification in Engineering Technologies)'],
            correct: 1,
            exp: 'AAMI (Association for the Advancement of Medical Instrumentation) administers the CBET credential along with CLES (Certified Laboratory Equipment Specialist) and CRES (Certified Radiology Equipment Specialist). AAMI is the primary standards and credentialing organization for biomedical technology.',
          },
          {
            q: 'CBET certification must be renewed every 5 years by completing:',
            a: ['A written re-examination only', '45 continuing education units (CEUs)', 'A practical skills assessment', '30 CEUs plus a supervisor recommendation'],
            correct: 1,
            exp: 'CBET renewal requires 45 CEUs earned over the 5-year certification period. CEUs can be obtained through a wide range of professional development activities including AAMI events, manufacturer training, academic courses, and professional association involvement.',
          },
        ],
      },
      {
        title: 'Specialty Credentials & Career Paths',
        body: [
          'AAMI offers two specialty credentials beyond CBET. The CLES (Certified Laboratory Equipment Specialist) credential focuses on clinical laboratory instruments including analyzers, centrifuges, microscopes, and specimen processing equipment. The CRES (Certified Radiology Equipment Specialist) credential focuses on diagnostic imaging equipment including X-ray, CT, MRI, and ultrasound systems.',
          'BMETs can advance into senior technician roles, team lead positions, and BMET department manager or clinical engineering director roles. Clinical engineers (typically with BS or MS engineering degrees) oversee BMET departments, evaluate technology, manage capital budgets, and consult on facility design. Some BMETs pursue engineering degrees through employer tuition assistance to transition into clinical engineering.',
          'Independent Service Organizations (ISOs) are private companies that compete with OEM (original equipment manufacturer) service representatives to provide medical equipment maintenance. ISOs employ BMETs and require them to develop expertise across multiple OEM platforms. ISO employment can offer broader technical experience and sometimes higher compensation than hospital employment.',
          'Biomed departments in large health systems may specialize by modality: imaging BMETs service X-ray, CT, and MRI; clinical engineering BMETs focus on patient monitoring and life support; laboratory BMETs service analyzers; OR (operating room) BMETs focus on surgical equipment. Specialization combined with CRET, CLES, or CRES credentials commands higher compensation.',
        ],
        keyPoints: [
          'CLES: laboratory equipment specialist; CRES: radiology/imaging equipment specialist',
          'Career path: BMET I/II/III -> senior BMET -> lead tech -> manager -> clinical engineer (with degree)',
          'ISO (Independent Service Organization): multi-OEM service company; broader tech exposure',
          'Specialty areas: imaging, life support, laboratory, OR — specialty credentials increase compensation',
        ],
        quiz: [
          {
            q: 'The CRES (Certified Radiology Equipment Specialist) credential is most relevant for BMETs who primarily service:',
            a: ['ICU patient monitors and infusion pumps', 'X-ray, CT, MRI, and ultrasound imaging systems', 'Laboratory analyzers and specimen processors', 'Operating room surgical instruments'],
            correct: 1,
            exp: 'CRES is an AAMI specialty credential designed for technicians specializing in diagnostic radiology and imaging equipment including X-ray generators, CT scanners, MRI systems, and ultrasound equipment. It demonstrates advanced competency beyond the general CBET credential.',
          },
          {
            q: 'Independent Service Organizations (ISOs) differ from OEM service operations in that ISOs:',
            a: [
              'Only service FDA Class I devices',
              'Provide multi-OEM service across many equipment brands rather than specializing in one manufacturer',
              'Are required to use only original manufacturer parts',
              'Operate exclusively in non-hospital outpatient settings',
            ],
            correct: 1,
            exp: 'ISOs are independent companies that service medical equipment from multiple manufacturers, competing with OEM field service engineers. ISOs may offer hospitals lower cost and faster response, and they provide BMETs with broad multi-platform technical experience.',
          },
        ],
      },
      {
        title: 'Career Outlook & Professional Development',
        body: [
          'The Bureau of Labor Statistics (BLS) classifies biomedical equipment technicians under Medical Equipment Repairers. The median annual wage is approximately $57,000 to $60,000. Experienced BMETs with CBET and specialty credentials, and those in management or ISO roles, earn significantly more. Top earners in imaging and complex device specialties can exceed $80,000 to $100,000 annually.',
          'The BLS projects employment growth of approximately 10 percent over the 10-year outlook period for medical equipment repairers — faster than average for all occupations. Growth is driven by an aging population increasing healthcare utilization, increasing complexity and quantity of medical devices in care delivery, and the expanding scope of telehealth and remote patient monitoring requiring device support.',
          'Professional development resources for BMETs include AAMI membership and publications, HTSI (Healthcare Technology Solutions International) conferences, 24x7 Magazine (trade publication), LinkedIn professional networks, and manufacturer-sponsored training programs. Many hospitals support CBET exam preparation through study groups and exam fee reimbursement.',
          'BMETs work in hospitals, outpatient clinics, skilled nursing facilities, home health agencies, medical device manufacturers, and ISO companies. The field offers job security due to the essential nature of the role, exposure to cutting-edge technology, and the satisfaction of directly supporting patient care through equipment reliability.',
        ],
        keyPoints: [
          'BLS median: ~$57,000-$60,000; CBET, specialty credentials, management, and ISO roles increase earnings',
          '10% employment growth projected; driven by aging population and increasing device complexity',
          'Resources: AAMI, HTSI, 24x7 Magazine, manufacturer training programs',
          'Employment settings: hospitals, outpatient clinics, ISO companies, device manufacturers, home health',
        ],
        quiz: [
          {
            q: 'The BLS projects employment growth for biomedical equipment technicians (medical equipment repairers) at approximately:',
            a: ['2-3%', '5-7%', '10%', '15-20%'],
            correct: 2,
            exp: 'The BLS projects approximately 10 percent growth for medical equipment repairers over the 10-year outlook period — faster than the average for all occupations. This growth is driven by an aging population, increasing healthcare utilization, and the growing complexity of medical technology.',
          },
          {
            q: 'Which professional organization is the primary resource for BMET certification, standards, and professional development?',
            a: ['TJC (The Joint Commission)', 'AAMI (Association for the Advancement of Medical Instrumentation)', 'FDA (Food and Drug Administration)', 'OSHA (Occupational Safety and Health Administration)'],
            correct: 1,
            exp: 'AAMI is the primary professional organization for biomedical technology, providing technical standards, the CBET/CLES/CRES certification program, educational resources, and annual conferences (AAMI Exchange). Membership gives BMETs access to standards documents and professional development opportunities.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'The CBET credential is administered by which organization?',
        a: ['FDA', 'TJC', 'AAMI', 'NICET'],
        correct: 2,
        exp: 'AAMI (Association for the Advancement of Medical Instrumentation) administers the CBET, CLES, and CRES credentials. AAMI is the primary professional and standards organization for biomedical technology in the United States.',
      },
      {
        q: 'CBET eligibility typically requires:',
        a: ['A bachelor\'s degree in biomedical engineering only', 'An associate degree plus 2 years of work experience (or additional experience without a degree)', 'Completion of a 4-year hospital apprenticeship', '10 years of BMET work experience with no degree requirement'],
        correct: 1,
        exp: 'CBET eligibility requires an associate degree or higher plus 2 years of relevant work experience, or additional work experience without a degree. The standard pathway is an associate degree in biomedical technology or electronics plus 2 years of clinical experience.',
      },
      {
        q: 'CBET certification must be renewed every:',
        a: ['2 years', '3 years', '5 years', '10 years'],
        correct: 2,
        exp: 'CBET is valid for 5 years and requires 45 CEUs during that period. Renewal maintains current competency in evolving biomedical technology, standards, and regulations.',
      },
      {
        q: 'The CRES (Certified Radiology Equipment Specialist) credential is designed for BMETs specializing in:',
        a: ['ICU monitoring and life support equipment', 'Clinical laboratory instruments', 'Diagnostic imaging including X-ray, CT, MRI, and ultrasound', 'Surgical robotics and powered surgical instruments'],
        correct: 2,
        exp: 'CRES is an AAMI specialty credential for technicians focusing on diagnostic radiology and imaging equipment. It is an advanced credential complementing CBET for those specializing in imaging modalities.',
      },
      {
        q: 'The BLS projects employment growth for medical equipment repairers at approximately:',
        a: ['2-3%', '5-7%', '10%', '20%'],
        correct: 2,
        exp: 'The BLS projects approximately 10 percent growth over 10 years — faster than average. Demand is driven by the aging population increasing healthcare utilization, the growing complexity of medical devices, and expansion of healthcare settings requiring equipment support.',
      },
      {
        q: 'The BLS median annual wage for biomedical equipment technicians (medical equipment repairers) is approximately:',
        a: ['$35,000-$40,000', '$57,000-$60,000', '$80,000-$85,000', '$100,000-$110,000'],
        correct: 1,
        exp: 'The BLS reports a median annual wage of approximately $57,000 to $60,000 for medical equipment repairers. Experienced technicians with CBET, specialty credentials (CRES, CLES), and those in management or ISO roles typically earn significantly more.',
      },
      {
        q: 'An ISO (Independent Service Organization) in the biomedical field is best described as:',
        a: ['A government agency that issues equipment certifications', 'A private company that services medical equipment from multiple manufacturers, competing with OEM service', 'An internal hospital department that handles equipment purchasing', 'The International Standards Organization that publishes IEC standards'],
        correct: 1,
        exp: 'ISOs are private service companies that maintain and repair medical equipment from multiple OEM brands. They offer hospitals an alternative to OEM service contracts and provide BMETs with broad multi-platform experience across many device types and manufacturers.',
      },
      {
        q: 'CLES (Certified Laboratory Equipment Specialist) is most relevant for BMETs who service:',
        a: ['Patient monitoring and life support equipment', 'Diagnostic imaging and radiology equipment', 'Clinical laboratory analyzers and specimen processing instruments', 'Surgical robots and electrosurgical units'],
        correct: 2,
        exp: 'CLES is an AAMI specialty credential for technicians specializing in clinical laboratory equipment including chemistry analyzers, hematology analyzers, centrifuges, microscopes, and automated specimen processors.',
      },
      {
        q: 'The CBET exam covers which four primary domains?',
        a: ['Anatomy/physiology, technology function, technology management, safety/regulatory compliance', 'Electronics, software, mechanical systems, and quality control', 'Hospital administration, billing, purchasing, and inventory control', 'Medical imaging, life support, laboratory, and surgical equipment only'],
        correct: 0,
        exp: 'The CBET exam tests knowledge across four domains: (1) anatomy, physiology, and medical terminology, (2) healthcare technology function, (3) healthcare technology management, and (4) safety and regulatory compliance. This breadth reflects the full scope of BMET practice.',
      },
      {
        q: 'Growth in biomedical equipment technician employment is primarily driven by:',
        a: ['Declining use of electronic medical records simplifying device maintenance', 'An aging population increasing healthcare utilization and growing complexity of medical devices', 'Reduction in hospital staff requiring BMETs to perform nursing duties', 'Decreasing numbers of medical devices as healthcare shifts to preventive care'],
        correct: 1,
        exp: 'The primary drivers of BMET employment growth are an aging population requiring more healthcare services, the increasing quantity and complexity of medical devices across all care settings, and expansion of telehealth and remote patient monitoring requiring device infrastructure support.',
      },
    ],
  },
];
