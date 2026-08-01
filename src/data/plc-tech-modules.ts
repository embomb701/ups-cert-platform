import type { TrainingModule } from './modules';

export const PLC_TECH_MODULES: TrainingModule[] = [
  {
    id: 'plc-fundamentals',
    num: 11,
    title: 'PLC Fundamentals',
    desc: 'PLC architecture, CPU scan cycle, I/O modules, power supplies, and industrial control system basics.',
    slides: [
      {
        title: 'PLC Architecture Overview',
        body: [
          'A programmable logic controller (PLC) is an industrial digital computer designed for control of manufacturing processes and machinery. The four main components are: (1) CPU — executes the control program and performs logic; (2) Power supply — converts incoming AC to regulated DC for the CPU and I/O; (3) I/O modules — interface the CPU to field devices (sensors, actuators); (4) Programming device — laptop or HMI used to create and load the control program.',
          'PLCs replaced hard-wired relay panels in the 1970s. The key advantage is programmability — logic changes require software edits rather than rewiring. Major PLC manufacturers include Allen-Bradley (Rockwell Automation), Siemens, Mitsubishi, Omron, and Schneider Electric. Each platform has its own programming software: Studio 5000 (Allen-Bradley), TIA Portal (Siemens), GX Works (Mitsubishi).',
        ],
        keyPoints: [
          'PLC: industrial computer with CPU, power supply, I/O modules, and programming device',
          'Replaced hard-wired relay panels — logic changes via software, not rewiring',
          'Major manufacturers: Allen-Bradley (Rockwell), Siemens, Mitsubishi, Omron, Schneider',
          'Each manufacturer has its own programming software (Studio 5000, TIA Portal, GX Works)',
        ],
        quiz: [
          { q: 'What component of a PLC executes the control program?', a: ['Power supply', 'CPU (central processing unit)', 'Output module', 'Programming terminal'], correct: 1, exp: 'The CPU executes the control program, performs logic operations, and manages communication between I/O modules and the user program.' },
          { q: 'The primary advantage of a PLC over a hard-wired relay panel is:', a: ['Lower cost for very small systems', 'Programmability — logic changes require software edits rather than rewiring', 'Faster switching speed than electromechanical relays', 'No need for a power supply'], correct: 1, exp: 'PLCs allow logic changes through software modifications rather than physical rewiring, dramatically reducing downtime and labor costs when process requirements change.' },
        ],
      },
      {
        title: 'CPU Scan Cycle',
        body: [
          'The PLC executes its program repeatedly in a continuous loop called the scan cycle. Four phases: (1) Input scan — reads all field inputs (sensors, switches) and copies their status to the input image table in memory. (2) Program scan — executes the user program from the first rung to the last using the current input image, writing outputs to the output image table. (3) Output scan — transfers the output image table values to the physical output modules, energizing or de-energizing field devices. (4) Housekeeping — communicates with programming terminals, updates diagnostics.',
          'Scan time is the time to complete one full scan cycle. Typical scan times: 1–20 ms for most industrial PLCs. Scan time increases with program size and I/O count. For time-critical applications (servo drives, high-speed counting), special interrupt routines execute outside the normal scan cycle. Understanding the scan cycle is essential for troubleshooting timing-related problems — outputs reflect input states from the PREVIOUS scan, not the current moment.',
        ],
        keyPoints: [
          'Scan cycle: Input scan → Program scan → Output scan → Housekeeping, repeated continuously',
          'Input image table updated once per scan — not in real time during program execution',
          'Typical scan time: 1–20 ms; increases with program size and I/O count',
          'Time-critical tasks use interrupt routines that execute outside the normal scan cycle',
        ],
        quiz: [
          { q: 'During the PLC scan cycle, when are physical output devices actually updated?', a: ['During the input scan phase', 'During the program scan phase', 'During the output scan phase after program execution', 'Continuously in real time during all phases'], correct: 2, exp: 'Physical output modules are updated during the output scan phase, after the program scan completes. The program scan writes to the output image table, and the output scan transfers those values to physical outputs.' },
          { q: 'A PLC with a 10 ms scan time can detect a sensor pulse that lasts only 5 ms:', a: ['Always — PLCs detect all pulses regardless of scan time', 'Reliably, because 5 ms is half the scan time', 'Possibly — it depends on exactly when the pulse occurs relative to the input scan', 'Never — pulses shorter than scan time are always missed'], correct: 2, exp: 'If a 5 ms pulse occurs between two input scans, it will be missed. High-speed inputs require interrupt-driven routines or dedicated high-speed input modules to reliably capture short pulses.' },
        ],
      },
      {
        title: 'I/O Modules',
        body: [
          'Discrete (digital) I/O modules handle on/off signals. Discrete inputs detect switch states, sensor outputs (NPN/PNP transistor, dry contact). Discrete outputs energize solenoids, starters, indicator lights. Common voltage ranges: 24 VDC, 120 VAC, 240 VAC. Output types: relay (isolated, handles AC or DC, slow — 10 ms), transistor (fast — 0.1 ms, DC only), TRIAC (AC only, fast). Relay outputs are most common for field devices; transistor outputs are used for high-speed applications.',
          'Analog I/O modules handle continuously variable signals. Standard analog input signals: 4–20 mA (most common in process control — 4 mA = zero, 20 mA = full scale; the 4 mA offset allows detection of a broken wire which reads 0 mA), 0–10 VDC, ±10 VDC. Analog outputs control variable-frequency drives, control valves, positioners. Resolution: typically 12-bit (4096 counts) for standard modules. The 4–20 mA standard allows runs of up to 1000 ft without significant signal degradation.',
        ],
        keyPoints: [
          'Discrete I/O: on/off signals; relay output: isolated, AC/DC capable, 10 ms; transistor: fast, DC only',
          'Analog I/O: 4–20 mA (most common), 0–10 VDC; 4 mA offset detects broken wire (reads 0 mA)',
          '4–20 mA standard: 4 mA = zero, 20 mA = full scale; allows ~1000 ft runs',
          'Analog resolution: typically 12-bit (4096 counts) for standard process modules',
        ],
        quiz: [
          { q: 'A 4–20 mA analog signal reading 0 mA indicates:', a: ['The transmitter is at its zero (minimum) value', 'A broken wire or power failure in the field transmitter circuit', 'The signal is at exactly 20% of full scale', 'Normal operation at minimum load'], correct: 1, exp: 'The 4–20 mA standard uses 4 mA as the live zero (minimum process value). A reading of 0 mA indicates a broken wire or failed transmitter — a major safety and diagnostic advantage over 0–20 mA signals.' },
          { q: 'Which PLC output type is best suited for high-speed DC applications (e.g., step motor pulse outputs)?', a: ['Relay output — isolated and handles any voltage', 'Transistor (solid-state) output — very fast switching, DC only', 'TRIAC output — fast, AC only', 'Mechanical contactor driven by relay output'], correct: 1, exp: 'Transistor outputs switch in ~0.1 ms, far faster than relay outputs (10 ms). For step motor pulse trains or high-speed counting outputs, transistor outputs are required.' },
        ],
      },
      {
        title: 'Wiring Practices and Safety',
        body: [
          'PLC wiring follows standard industrial practices. All field wiring should be run in dedicated conduit or cable trays, separated from power wiring to prevent electromagnetic interference (EMI). Control wiring: typically 18–14 AWG stranded wire, rated for the application voltage. Shielded cable is required for analog signals — the shield drains noise and should be grounded at ONE end only (typically the PLC panel end) to avoid ground loops.',
          'Lockout/tagout (LOTO) is mandatory before working inside a PLC panel or on any field wiring connected to the PLC. Even with the PLC in program mode, field devices (solenoids, motors, heaters) may be energized by the control program. Always de-energize and verify zero energy state before entering the panel. Input field devices use 24 VDC (from PLC power supply) or line voltage — treat ALL wiring as potentially energized until proven otherwise.',
        ],
        keyPoints: [
          'Control wiring: 18–14 AWG stranded, separate conduit from power wiring to reduce EMI',
          'Analog signals require shielded cable — ground shield at ONE end (PLC panel) to prevent ground loops',
          'LOTO required before working inside PLC panel — program mode does NOT de-energize field devices',
          'Treat all panel wiring as energized until proven otherwise; verify zero energy state with meter',
        ],
        quiz: [
          { q: 'The shield of an analog signal cable in a PLC installation should be grounded:', a: ['At both ends to maximize noise rejection', 'At the field device end only', 'At one end only — typically the PLC panel end', 'Not at all — shields must float to avoid interference'], correct: 2, exp: 'Grounding the shield at only one end (typically the PLC cabinet) prevents ground loops, which occur when there is a voltage difference between two grounded points and current flows through the shield, creating noise on the signal.' },
          { q: 'Before working inside a PLC control panel, the technician MUST:', a: ['Place the CPU in program mode to prevent output activation', 'Apply LOTO and verify zero energy state — program mode alone does NOT de-energize field devices', 'Disable only the output modules', 'Notify the supervisor and proceed immediately if urgent'], correct: 1, exp: 'Even in program mode, a PLC program may output signals that energize field devices. Full LOTO of all energy sources feeding the panel is required before any work inside.' },
        ],
      },
      {
        title: 'Numbering Systems and PLC Memory',
        body: [
          'PLCs use binary (base-2) internally. Each input/output bit is stored in memory as 0 (off) or 1 (on). Technicians must understand binary, octal (base-8), and hexadecimal (base-16) when reading PLC memory maps. Hexadecimal is widely used for memory addresses and data values: digits 0–9 and A–F represent values 0–15. Example: 0xFF = 255 decimal = 11111111 binary.',
          'PLC memory is organized into data files or data blocks depending on the platform. Key memory areas in Allen-Bradley RSLogix 500: Input file (I:), Output file (O:), Bit file (B3:), Timer file (T4:), Counter file (C5:), Integer file (N7:), Analog file (F8:). In Rockwell Studio 5000 (ControlLogix), tags replace numbered addresses — descriptive tag names like "Pump1_Running" improve program readability and are standard in modern practice.',
        ],
        keyPoints: [
          'PLCs store I/O states as binary bits; hex (0–F) is used for memory addresses and data values',
          'RSLogix 500 memory: I: (inputs), O: (outputs), B3: (bits), T4: (timers), C5: (counters), N7: (integers)',
          'Studio 5000 (ControlLogix): tag-based addressing replaces fixed file numbers',
          'Descriptive tag names ("Pump1_Running") improve readability and are modern standard practice',
        ],
        quiz: [
          { q: 'In Allen-Bradley RSLogix 500, the "T4:" memory file stores:', a: ['Analog input values', 'Timer data (preset, accumulated, and status bits)', 'Binary output states', 'Counter accumulated values'], correct: 1, exp: 'T4: is the Timer file in RSLogix 500. Each timer element contains a preset value (PT), accumulated value (ACC), done bit (DN), timing bit (TT), and enable bit (EN).' },
          { q: 'What is the hexadecimal value 0xFF in decimal?', a: ['15', '160', '255', '256'], correct: 2, exp: '0xFF in hexadecimal = (15 × 16) + 15 = 240 + 15 = 255 decimal. Hex FF = binary 11111111 = 8 bits all set to 1.' },
        ],
      },
    ],
    test: [
      { q: 'What are the four main hardware components of a PLC system?', a: ['CPU, power supply, I/O modules, and programming device', 'CPU, RAM, ROM, and clock', 'Input module, output module, display, and HMI', 'Processor, relay panel, transformer, and terminal block'], correct: 0, exp: 'A PLC consists of: CPU (executes program), power supply (regulated DC), I/O modules (field device interface), and a programming device (laptop/terminal).' },
      { q: 'During which phase of the PLC scan cycle are physical output devices updated?', a: ['Output scan phase', 'Input scan phase', 'Program scan phase', 'Housekeeping phase'], correct: 0, exp: 'Physical outputs are updated during the output scan phase, after program execution writes new values to the output image table.' },
      { q: 'A 4–20 mA signal reading 0 mA indicates:', a: ['Broken wire or power loss in the field transmitter circuit', 'The transmitter is at its minimum (zero) value', 'The process variable is below the range', 'Normal standby operation'], correct: 0, exp: 'The 4–20 mA live-zero standard means 4 mA = process minimum. A 0 mA reading indicates a broken wire or failed transmitter — a key wiring fault indicator.' },
      { q: 'Why must a PLC shield cable be grounded at only one end?', a: ['To prevent ground loops that cause signal noise', 'To allow maximum current flow through the shield', 'Because two-end grounding violates NEC', 'To protect the CPU from overvoltage'], correct: 0, exp: 'Grounding at both ends creates a ground loop — current flows through the shield due to potential differences, injecting noise onto the analog signal.' },
      { q: 'Which output type is required for high-speed pulse output applications on a PLC?', a: ['Transistor (solid-state) output', 'Relay output', 'TRIAC output', 'Mechanical contactor'], correct: 0, exp: 'Transistor outputs switch in ~0.1 ms, far faster than relay outputs (10 ms), making them required for step motor pulse trains and high-speed applications.' },
      { q: 'Allen-Bradley Studio 5000 (ControlLogix) uses what type of addressing?', a: ['Tag-based addressing with descriptive names', 'Fixed file numbers (I:, O:, N7:)', 'Octal-based I/O addressing', 'Memory-mapped ASCII addresses'], correct: 0, exp: 'ControlLogix uses tag-based addressing where variables have descriptive names like "Pump1_Running" instead of fixed addresses like N7:0.' },
      { q: 'LOTO before working in a PLC panel is required because:', a: ['Program mode alone does not de-energize field devices', 'PLC CPUs generate high voltage internally', 'Program mode disables all I/O', 'OSHA only requires LOTO for high-voltage panels'], correct: 0, exp: 'Even in program mode, a PLC may continue to energize field devices (solenoids, motors) through its program. Full LOTO of all panel energy sources is mandatory.' },
      { q: 'What is the typical scan time range for most industrial PLCs?', a: ['1–20 ms', '100–500 ms', '50–100 ms', '0.01–0.1 ms'], correct: 0, exp: 'Most industrial PLCs complete a full scan cycle in 1–20 ms. Scan time increases with program size and I/O count.' },
      { q: 'Hexadecimal digit "F" represents what decimal value?', a: ['15', '16', '10', '14'], correct: 0, exp: 'Hex uses digits 0–9 and A–F. F = 15 decimal. Hex is used extensively in PLC memory maps, fault codes, and data registers.' },
      { q: 'The input image table in a PLC is updated:', a: ['Once per scan cycle during the input scan phase', 'Continuously in real time during program execution', 'Only when an input state changes', 'During the output scan phase'], correct: 0, exp: 'The input image table is a snapshot of all physical input states taken at the beginning of each scan during the input scan phase. It remains static during program execution.' },
    ],
  },
  {
    id: 'plc-programming',
    num: 12,
    title: 'Ladder Logic Programming',
    desc: 'Ladder diagram fundamentals, contacts, coils, timers, counters, comparison instructions, and program structure.',
    slides: [
      {
        title: 'Ladder Diagram Basics',
        body: [
          'Ladder diagram (LD) is the most common PLC programming language, modeled after relay logic schematics. A ladder program consists of rungs, each representing a logical operation. The left vertical line is the power rail (L1); the right vertical line is the neutral rail (L2). Power conceptually flows left to right when all conditions on a rung are true, energizing the output coil. Each rung evaluates independently in sequence during the program scan.',
          'Two fundamental instruction types: contacts (inputs — read tag/bit state) and coils (outputs — write tag/bit state). Normally open (NO) contact: passes power when the referenced bit is 1 (ON). Normally closed (NC) contact: passes power when the referenced bit is 0 (OFF). Output coil: sets the referenced bit to 1 when rung condition is true. The contact symbols mirror relay logic — NO and NC contacts correspond to relay contact behavior.',
        ],
        keyPoints: [
          'Ladder diagram: rungs with contacts (inputs) and coils (outputs); power flows L1 to L2',
          'NO contact (--| |--): passes power when bit = 1 (ON)',
          'NC contact (--|/|--): passes power when bit = 0 (OFF)',
          'Output coil (--( )--): sets bit to 1 when rung conditions are true (energized)',
        ],
        quiz: [
          { q: 'In ladder logic, a normally open (NO) contact passes power when:', a: ['The referenced bit is 0 (OFF)', 'The referenced bit is 1 (ON)', 'The rung has at least one true condition', 'The output coil is energized'], correct: 1, exp: 'A normally open contact passes power (is true) when the bit it references is 1 (ON). It mirrors a mechanical normally open relay contact that closes when the coil is energized.' },
          { q: 'A normally closed (NC) contact in ladder logic is used to:', a: ['Always pass power regardless of bit state', 'Pass power only when the referenced bit is 0 (OFF)', 'Latch an output coil in the energized state', 'Block power flow when the output is energized'], correct: 1, exp: 'NC contacts pass power when the referenced bit is 0 (OFF). They are used for stop buttons, safety interlocks, and conditions that must be inactive for the rung to be true.' },
        ],
      },
      {
        title: 'Timers and Counters',
        body: [
          'Timer instructions delay or measure time. In Allen-Bradley RSLogix 500: TON (Timer On-Delay): starts timing when the rung is true; DN (done) bit turns ON after the preset time elapses. TOF (Timer Off-Delay): starts timing when the rung goes false; DN bit turns OFF after the preset time elapses. RTO (Retentive Timer On-Delay): accumulates time each time the rung is true, retains the accumulated value even when the rung goes false — useful for measuring total motor run time. Timer preset (PT) and accumulator (ACC) are in milliseconds in most platforms.',
          'Counter instructions count events. CTU (Count Up): increments the accumulated value on each positive transition (0→1) of the rung. CTD (Count Down): decrements on each positive transition. CU done (CU.DN) bit sets when ACC reaches preset (PR). Reset (RES) instruction resets the accumulated value to zero. Counters are used to count product pieces, track batch quantities, and trigger maintenance intervals. The CTU/CTD pair allows bidirectional counting (parts in / parts out for inventory control).',
        ],
        keyPoints: [
          'TON: starts timing when rung true; DN bit ON after preset elapses',
          'TOF: starts timing when rung goes false; DN bit OFF after preset elapses',
          'RTO: retentive timer — accumulates time across multiple rung true events',
          'CTU: count up on each rung positive transition; DN bit sets when ACC ≥ preset',
        ],
        quiz: [
          { q: 'A TON (Timer On-Delay) timer DN bit turns ON when:', a: ['The rung goes false after being true', 'The accumulated time reaches the preset value while the rung is true', 'The rung goes true for the first time', 'The RES (reset) coil is energized'], correct: 1, exp: 'TON starts timing when the rung is true and the DN bit turns ON when the accumulated time (ACC) equals or exceeds the preset (PT). If the rung goes false before DN, the timer resets to zero.' },
          { q: 'Which timer type retains its accumulated value even when the rung goes false?', a: ['TON (Timer On-Delay)', 'TOF (Timer Off-Delay)', 'RTO (Retentive Timer On)', 'TMR (standard timer)'], correct: 2, exp: 'RTO accumulates time whenever the rung is true and retains that value when the rung goes false. It requires a separate RES (reset) instruction to clear the accumulated value — useful for tracking total run hours.' },
        ],
      },
      {
        title: 'Comparison and Math Instructions',
        body: [
          'Comparison instructions compare two values and pass power if the condition is true. EQU (Equal): passes power if Source A = Source B. NEQ (Not Equal): passes if A ≠ B. GRT (Greater Than): passes if A > B. GEQ (Greater Than or Equal): passes if A ≥ B. LES (Less Than): passes if A < B. LEQ (Less Than or Equal): passes if A ≤ B. These are used extensively in analog control — for example, LEQ comparing a temperature tag to a setpoint value to control a heating element.',
          'Math instructions perform arithmetic on data. ADD: adds two values. SUB: subtracts. MUL: multiplies. DIV: divides. MOV (Move): copies a value from one location to another. SQR (Square Root): computes square root — used with differential pressure transmitters to linearize flow measurements (flow is proportional to the square root of differential pressure). CPT (Compute): evaluates a complex math expression in one instruction. Math instructions execute once per scan when the rung is true.',
        ],
        keyPoints: [
          'EQU, NEQ, GRT, GEQ, LES, LEQ: comparison instructions that pass power when condition is true',
          'Used for analog setpoint control (e.g., LEQ temp to setpoint to enable heater)',
          'ADD, SUB, MUL, DIV, MOV, SQR: math instructions; execute each scan when rung is true',
          'SQR used with differential pressure transmitters to linearize flow (flow ∝ √ΔP)',
        ],
        quiz: [
          { q: 'A GEQ (Greater Than or Equal) instruction in ladder logic passes power when:', a: ['Source A is less than Source B', 'Source A is greater than or equal to Source B', 'Source A equals Source B only', 'The rung below it is also true'], correct: 1, exp: 'GEQ passes power (evaluates true) when Source A ≥ Source B. It is commonly used in setpoint comparisons — for example, to activate an alarm when a temperature tag meets or exceeds the high alarm setpoint.' },
          { q: 'Why is a SQR (square root) instruction used when processing differential pressure transmitter signals to calculate flow?', a: ['Because differential pressure signals are always negative and must be corrected', 'Because flow is proportional to the square root of differential pressure — SQR linearizes the measurement', 'To convert 4–20 mA to engineering units', 'Because PLC counters require integer inputs'], correct: 1, exp: 'The orifice plate flow equation states that flow rate (Q) is proportional to the square root of differential pressure (ΔP). Without the SQR correction, the displayed flow value would be non-linear and inaccurate.' },
        ],
      },
      {
        title: 'Seal-In (Latch) Circuits',
        body: [
          'A seal-in circuit (also called a latch or holding circuit) is a fundamental ladder logic pattern that keeps an output ON after the momentary initiating contact opens. Implementation: a parallel NO contact using the output coil\'s own bit is placed in parallel with the start contact. When START is pressed (momentary), the output coil energizes and its own contact closes, "sealing in" the circuit. Even when START is released, the sealed-in contact keeps power flowing. A stop button (NC contact) in series breaks the circuit.',
          'The SET and LATCH (OTL) and UNLATCH (OTU) coil instructions provide a similar function. OTL (latch coil) sets a bit to 1 and it remains set even if the rung goes false. OTU (unlatch coil) resets the bit to 0. Unlike a standard output coil (where the bit follows the rung condition every scan), OTL/OTU retain state across scans. This is useful for alarms, fault indicators, and any condition that must be acknowledged before clearing.',
        ],
        keyPoints: [
          'Seal-in circuit: output\'s own NO contact in parallel with start contact — keeps output ON after start released',
          'NC stop contact in series breaks the seal-in circuit to stop the output',
          'OTL (latch coil): sets bit to 1; stays set even when rung goes false',
          'OTU (unlatch coil): resets bit to 0; OTL/OTU must be used as a pair',
        ],
        quiz: [
          { q: 'In a motor start/stop seal-in circuit, the output coil\'s own contact is placed:', a: ['In series with the start button contact', 'In parallel with the start button contact', 'In series with the stop button contact', 'In series with the output coil'], correct: 1, exp: 'The output\'s own NO contact is placed in parallel with the (momentary) start contact. When the output energizes, its own contact closes, creating an alternate path for power flow — "sealing in" the circuit after the start button is released.' },
          { q: 'An OTL (output latch) coil differs from a standard output coil because:', a: ['OTL sets the bit to 1 only while the rung is true', 'OTL sets the bit to 1 and it remains set even when the rung goes false', 'OTL can control multiple bits simultaneously', 'OTL operates only with physical output modules'], correct: 1, exp: 'Unlike a standard coil (bit follows rung condition every scan), OTL latches the bit to 1 when the rung is true and it stays set until an OTU (unlatch) instruction clears it — regardless of subsequent rung state.' },
        ],
      },
      {
        title: 'IEC 61131-3 Languages',
        body: [
          'IEC 61131-3 is the international standard for PLC programming languages, defining five languages: (1) Ladder Diagram (LD) — graphical relay logic; most common in North America. (2) Function Block Diagram (FBD) — graphical blocks with data flow connections; used in process control. (3) Structured Text (ST) — high-level text language similar to Pascal; used for complex math and algorithms. (4) Instruction List (IL) — low-level assembler-like text; largely deprecated. (5) Sequential Function Chart (SFC) — graphical chart for sequential processes (batch, fill-and-drain cycles).',
          'Modern PLC platforms support multiple IEC 61131-3 languages within the same project, allowing engineers to use the best language for each task. Example: use LD for discrete interlocks, ST for PID math and calculations, SFC for batch sequences, FBD for process loop diagrams. Structured Text is increasingly popular for complex calculations because it is more compact and readable than ladder logic for math-intensive code.',
        ],
        keyPoints: [
          'IEC 61131-3 defines five PLC languages: LD, FBD, ST, IL (deprecated), SFC',
          'LD: most common in North America; FBD: process control; ST: complex math/algorithms',
          'SFC: sequential processes (batch, fill-drain cycles)',
          'Modern platforms support multiple languages in the same project — use the best tool for each task',
        ],
        quiz: [
          { q: 'Which IEC 61131-3 programming language is best suited for complex mathematical calculations in a PLC program?', a: ['Ladder Diagram (LD)', 'Function Block Diagram (FBD)', 'Structured Text (ST)', 'Sequential Function Chart (SFC)'], correct: 2, exp: 'Structured Text is a high-level language similar to Pascal/C, ideal for complex math, string handling, and algorithms. What takes 20 rungs in LD may be 5 lines in ST.' },
          { q: 'Sequential Function Chart (SFC) is most appropriate for programming:', a: ['Discrete on/off interlock logic', 'PID control loops', 'Sequential batch processes with defined steps and transitions', 'Analog scaling and signal conditioning'], correct: 2, exp: 'SFC is designed for sequential control — processes that follow defined steps with transitions between them, such as batch mixing, fill-and-drain sequences, or multi-step machine cycles.' },
        ],
      },
    ],
    test: [
      { q: 'A normally open (NO) contact in ladder logic passes power when:', a: ['The referenced bit is 1 (ON)', 'The referenced bit is 0 (OFF)', 'The output coil is de-energized', 'The rung has no other conditions'], correct: 0, exp: 'An NO contact passes power when the bit it references is 1 (ON), mirroring a mechanical NO relay contact that closes when the coil is energized.' },
      { q: 'A TON (Timer On-Delay) timer resets to zero when:', a: ['The rung goes false before the done bit is set', 'The preset time elapses', 'The accumulated value equals the preset', 'A CTU counter reaches its preset'], correct: 0, exp: 'TON is non-retentive — if the rung goes false before DN sets, the accumulated value resets to zero. Use RTO if you need to retain accumulated time across rung false periods.' },
      { q: 'In a motor start/stop circuit, the seal-in contact is placed in parallel with:', a: ['The start button contact', 'The stop button contact', 'The output coil', 'The overload contact'], correct: 0, exp: 'The output\'s own NO contact is placed in parallel with the momentary start button, keeping power flowing after the start button is released.' },
      { q: 'CTU (Count Up) counter increments on:', a: ['Each positive transition (0→1) of the rung', 'Each scan cycle while the rung is true', 'Each negative transition (1→0) of the rung', 'Each second the rung remains true'], correct: 0, exp: 'CTU increments once per positive rung transition (rising edge). If the rung stays true, it does not continue counting — it waits for the next 0→1 transition.' },
      { q: 'Which ladder instruction compares two values and passes power if the first is greater than or equal to the second?', a: ['GEQ', 'EQU', 'LES', 'NEQ'], correct: 0, exp: 'GEQ (Greater Than or Equal) evaluates A ≥ B and passes power when true. It is commonly used to trigger alarms or interlocks when a value meets or exceeds a setpoint.' },
      { q: 'OTL (output latch) coil differs from a standard output coil because OTL:', a: ['Retains the bit state when the rung goes false', 'Follows the rung condition every scan', 'Resets the bit to 0 when energized', 'Only operates during the output scan phase'], correct: 0, exp: 'OTL latches the bit to 1 and it remains set even when the rung goes false. It requires a paired OTU (unlatch) instruction to clear the bit.' },
      { q: 'IEC 61131-3 Structured Text (ST) is best used for:', a: ['Complex mathematical calculations and algorithms', 'Discrete relay-style interlock logic', 'Sequential batch process steps', 'Graphical data flow between function blocks'], correct: 0, exp: 'ST is a high-level text language ideal for complex math, string manipulation, and algorithms that would require many rungs in LD.' },
      { q: 'A SQR instruction in PLC math is used to linearize flow measurements because:', a: ['Flow is proportional to the square root of differential pressure', 'Pressure signals are non-linear by nature of the transmitter', 'Square root converts 4–20 mA to engineering units', 'Flow meters output signals in square units'], correct: 0, exp: 'Q ∝ √ΔP — the orifice plate/venturi flow equation. Without SQR correction, the displayed flow reading would be non-linear (e.g., 50% signal would show incorrect flow).' },
      { q: 'IEC 61131-3 Sequential Function Chart (SFC) is designed for:', a: ['Sequential processes with defined steps and transitions', 'Analog control loop tuning', 'Relay replacement interlock logic', 'High-speed counting applications'], correct: 0, exp: 'SFC is the graphical language for sequential control — batch processes, fill-and-drain sequences, and multi-step machine cycles where each step transitions to the next based on defined conditions.' },
      { q: 'An RTO (Retentive Timer On) retains its accumulated value because:', a: ['It does not reset when the rung goes false — requires RES to clear', 'It uses a battery-backed memory register', 'Its preset value is 0 by default', 'It is triggered by a CTU counter'], correct: 0, exp: 'RTO\'s accumulated time persists when the rung goes false — it only resets when a RES (reset) instruction clears it. This makes it suitable for tracking cumulative run time.' },
    ],
  },
  {
    id: 'plc-hmi-scada',
    num: 13,
    title: 'HMI and SCADA Systems',
    desc: 'Human-machine interfaces, SCADA architecture, data historian, alarm management, and operator display design.',
    slides: [
      {
        title: 'HMI Fundamentals',
        body: [
          'A human-machine interface (HMI) provides the operator view of the control system — displaying process values, alarming conditions, and allowing setpoint changes and manual control. Types: panel-mounted touchscreen HMI (mounted at the machine — dedicated to one process area), PC-based HMI (runs on industrial PCs, more powerful, can show multiple areas), thin-client HMI (connects to a central server — scalable for large facilities), web-based HMI (browser accessible, no client software required).',
          'HMI development involves creating screen graphics that represent the physical process. Best practices: use standardized symbol libraries (ISA 5.1 for P&IDs, ISA 101 for HMI design), use green for normal/running, yellow for warning, red for alarm/fault. Avoid overloading screens with data — operators need clear, actionable information. Navigation: limit screen depth to 3 levels for quick access during emergencies. Critical values (temperature, pressure, level) should be visible without navigating away from the overview screen.',
        ],
        keyPoints: [
          'HMI types: panel touchscreen (local), PC-based, thin-client, web-based',
          'ISA 101 HMI design standard: green = normal, yellow = warning, red = alarm/fault',
          'Limit navigation depth to 3 levels — operators need fast access during emergencies',
          'Overview screen must show critical process values without additional navigation',
        ],
        quiz: [
          { q: 'ISA 101 recommends which color to indicate a normal, running process state on an HMI?', a: ['Red', 'Blue', 'Yellow', 'Green'], correct: 3, exp: 'ISA 101 (HMI Design Standard) recommends green for normal/running states, yellow for warning/advisory conditions, and red for alarm/abnormal states — aligning with traffic light intuition.' },
          { q: 'What is the recommended maximum HMI screen navigation depth for industrial applications?', a: ['5 levels', '10 levels', '3 levels', '1 level (overview only)'], correct: 2, exp: 'ISA 101 and best practices limit HMI navigation to 3 levels (overview → area → detail) so operators can quickly access any screen during an emergency without excessive navigation.' },
        ],
      },
      {
        title: 'SCADA Architecture',
        body: [
          'SCADA (Supervisory Control and Data Acquisition) systems collect data from PLCs and field instruments distributed across a large geographic area or plant, display it in a centralized control room, and allow supervisory control actions. SCADA components: field devices (PLCs, RTUs, sensors), communications network (industrial Ethernet, fiber, cellular, radio), SCADA server (data collection, alarm processing), HMI workstations (operator displays), data historian (time-series database for trend analysis).',
          'RTUs (Remote Terminal Units) are similar to PLCs but optimized for remote, standalone operation over wide-area networks (WAN). RTUs are common in oil/gas pipelines, water distribution, and electric utilities where field sites may be miles from the control center. Protocol: SCADA systems use DNP3 (Distributed Network Protocol 3) for utility applications, Modbus for legacy industrial, and OPC-UA for modern interoperable systems. The SCADA server communicates with all field devices and stores data in a historian.',
        ],
        keyPoints: [
          'SCADA: centralized supervision of distributed PLCs/RTUs across a large area',
          'SCADA components: field devices → comms network → SCADA server → HMI workstations → historian',
          'RTU: PLC-like device optimized for remote standalone operation over WAN (pipeline, utility)',
          'Protocols: DNP3 (utilities), Modbus (legacy), OPC-UA (modern interoperability)',
        ],
        quiz: [
          { q: 'What is the purpose of the data historian in a SCADA system?', a: ['To generate alarm emails to operators', 'To store time-series process data for trend analysis and reporting', 'To replace the SCADA server during maintenance', 'To configure PLC tag databases remotely'], correct: 1, exp: 'The data historian stores time-stamped process values at configurable intervals, enabling trend analysis, compliance reporting, incident investigation, and process optimization over time.' },
          { q: 'Which communication protocol is most widely used in electric utility SCADA systems (substations, distribution)?', a: ['Modbus RTU', 'OPC-UA', 'DNP3 (Distributed Network Protocol 3)', 'PROFIBUS DP'], correct: 2, exp: 'DNP3 was designed for utility SCADA applications — it supports time-stamping, data integrity checking, and efficient bandwidth use over slow WAN links common in substation communications.' },
        ],
      },
      {
        title: 'Alarm Management',
        body: [
          'Effective alarm management is a critical safety function. ANSI/ISA 18.2 (Management of Alarm Systems for the Process Industries) is the governing standard. Key metric: alarm rate. An acceptable alarm rate is 1–2 alarms per 10 minutes under normal operation; more than 10 alarms per 10 minutes indicates alarm flooding — a condition where operators are overwhelmed and cannot effectively respond to any single alarm.',
          'Alarm rationalization: each alarm should be reviewed to confirm it requires operator action (not informational), has an appropriate priority (low/medium/high/critical), has a defined response procedure, and has a realistic response time. Bad alarm practices to avoid: nuisance alarms (trip repeatedly under normal conditions — operators learn to ignore them), chattering alarms (flip between on/off rapidly — filter with dead band or delay), stale alarms (in alarm for hours or days with no action possible). Every alarm should answer: "What happened? How urgent is it? What should the operator do?"',
        ],
        keyPoints: [
          'ANSI/ISA 18.2: alarm management standard — governs alarm system design and performance',
          'Acceptable alarm rate: 1–2 alarms per 10 min; alarm flooding: >10 alarms per 10 min',
          'Each alarm must require operator action, have defined priority and response procedure',
          'Avoid: nuisance alarms, chattering alarms, stale alarms (all lead to alarm blindness)',
        ],
        quiz: [
          { q: 'According to ANSI/ISA 18.2, an alarm rate exceeding 10 alarms per 10 minutes indicates:', a: ['Excellent system performance — high alarm rate means good monitoring', 'Alarm flooding — operators are overwhelmed and cannot effectively respond', 'A network communication failure', 'The alarm system requires firmware update'], correct: 1, exp: 'ISA 18.2 defines alarm flooding as a state where operators receive more alarms than they can process. Rates above 10 alarms per 10 minutes indicate poor alarm management — operators learn to ignore alarms, creating safety risks.' },
          { q: 'A chattering alarm (rapidly alternating between alarmed and cleared states) is best resolved by:', a: ['Deleting the alarm from the alarm list permanently', 'Adding a dead band or on-delay timer to prevent rapid state changes', 'Lowering the alarm priority to informational', 'Increasing the SCADA server polling rate'], correct: 1, exp: 'A dead band (hysteresis zone around the alarm setpoint) or on-delay timer prevents rapid alarm on/off toggling when the process variable fluctuates around the setpoint, eliminating nuisance chattering.' },
        ],
      },
      {
        title: 'OPC and Data Integration',
        body: [
          'OPC (OLE for Process Control) is the standard data connectivity protocol for industrial automation. OPC DA (Data Access) is the original standard — uses COM/DCOM and is Windows-specific. OPC UA (Unified Architecture) is the modern standard — platform-independent (Linux, embedded), secure (built-in encryption and authentication), and supports complex data models. OPC UA is the standard for Industry 4.0 and IIoT (Industrial Internet of Things) integration.',
          'OPC servers act as middleware between PLCs and HMI/SCADA systems. An OPC UA server running on the PLC (or a gateway PC) exposes PLC tags as OPC items. Any OPC UA client — HMI, SCADA, historian, MES (manufacturing execution system), cloud platform — can subscribe to those tags. This eliminates proprietary driver complexity and allows multiple clients to share one server connection. OPC UA supports security profiles including certificate-based authentication and TLS encryption.',
        ],
        keyPoints: [
          'OPC DA: original Windows COM/DCOM standard; OPC UA: modern, cross-platform, secure',
          'OPC UA: built-in TLS encryption and certificate authentication — standard for IIoT/Industry 4.0',
          'OPC server exposes PLC tags; any OPC UA client (HMI, historian, cloud) can subscribe',
          'OPC UA eliminates proprietary driver complexity and allows multiple client connections',
        ],
        quiz: [
          { q: 'OPC UA is preferred over OPC DA in modern industrial systems because OPC UA is:', a: ['Faster, using direct memory access instead of network communication', 'Platform-independent, secure (TLS), and supports complex data models for IIoT', 'Simpler to configure with no authentication required', 'Only compatible with Allen-Bradley PLCs'], correct: 1, exp: 'OPC UA runs on Linux, Windows, and embedded systems; includes built-in certificate-based security and TLS encryption; and supports hierarchical data models — making it the standard for Industry 4.0 and IIoT integration.' },
          { q: 'An OPC UA server in an industrial control system primarily acts as:', a: ['The SCADA historian database', 'Middleware that exposes PLC tags to multiple client applications (HMI, historian, cloud)', 'The PLC programming interface', 'A firewall between PLC and SCADA networks'], correct: 1, exp: 'The OPC UA server reads PLC data and makes it available to any subscribed client. This allows HMI, historian, MES, and cloud platforms to all access the same PLC data through a single, standardized interface.' },
        ],
      },
      {
        title: 'Cybersecurity in Industrial Control Systems',
        body: [
          'Industrial control system (ICS) cybersecurity is critical as PLCs and SCADA systems become network-connected. Key vulnerabilities: default passwords (never left in place on deployed systems), unpatched operating systems (many ICS systems run outdated Windows versions), unnecessary network services, and direct connections between IT networks and OT (operational technology) networks. A compromised PLC can cause physical damage — as demonstrated by Stuxnet (targeted Iran nuclear centrifuges in 2010).',
          'Defense-in-depth for ICS: (1) Network segmentation — separate OT network from IT and internet using firewalls and a DMZ. (2) Industrial DMZ: a demilitarized zone between IT and OT networks where data exchange occurs through controlled pathways. (3) Change default credentials immediately. (4) Minimize remote access — use VPN with multi-factor authentication (MFA) for remote connections. (5) Patch management — test patches before deploying to production systems. NIST SP 800-82 provides the US government framework for ICS security.',
        ],
        keyPoints: [
          'ICS cybersecurity: default passwords, unpatched OS, unnecessary services are primary vulnerabilities',
          'Stuxnet (2010): landmark ICS attack demonstrating that compromised PLCs cause physical damage',
          'Defense: network segmentation (OT/IT separation), industrial DMZ, change defaults, VPN+MFA for remote access',
          'NIST SP 800-82: US government ICS cybersecurity framework',
        ],
        quiz: [
          { q: 'What is the primary purpose of an Industrial DMZ (Demilitarized Zone) in an ICS network?', a: ['To provide a guest Wi-Fi network for plant visitors', 'To create a controlled data exchange zone between the IT and OT networks', 'To host the PLC programming software on an isolated server', 'To store backup PLC programs off the OT network'], correct: 1, exp: 'An industrial DMZ sits between the IT and OT networks, allowing controlled, monitored data flows between them. Data passes through the DMZ rather than directly between networks, limiting the attack surface.' },
          { q: 'The most critical first step in securing a newly installed PLC or HMI from cybersecurity threats is:', a: ['Installing the latest operating system updates', 'Changing all default usernames and passwords immediately', 'Enabling remote access for vendor support', 'Connecting the OT network directly to the internet for updates'], correct: 1, exp: 'Default credentials (admin/admin, guest/guest) are the most common entry point for ICS attacks. All default passwords must be changed immediately upon commissioning any network-connected device.' },
        ],
      },
    ],
    test: [
      { q: 'ISA 101 HMI design standard recommends what color for normal, running process states?', a: ['Green', 'Red', 'Yellow', 'Blue'], correct: 0, exp: 'ISA 101 uses green for normal/running, yellow for warning/advisory, and red for alarm/abnormal states.' },
      { q: 'SCADA systems collect data from PLCs and RTUs distributed across a large area using:', a: ['A communications network connecting field devices to a central server', 'Direct hardwired connections to each field sensor', 'Manual data entry from field operators', 'On-site HMI panels at each device'], correct: 0, exp: 'SCADA architecture: field devices → communications network (industrial Ethernet, radio, cellular) → SCADA server → HMI workstations → historian.' },
      { q: 'ANSI/ISA 18.2 defines alarm flooding as occurring when the alarm rate exceeds:', a: ['10 alarms per 10 minutes', '100 alarms per hour', '1 alarm per minute', '5 alarms per 10 minutes'], correct: 0, exp: 'ISA 18.2 identifies > 10 alarms per 10 minutes as alarm flooding — operators are overwhelmed and cannot respond effectively.' },
      { q: 'Which communication protocol is the modern standard for ICS/SCADA interoperability and IIoT integration?', a: ['OPC UA', 'Modbus RTU', 'DNP3', 'OPC DA'], correct: 0, exp: 'OPC UA is platform-independent, encrypted, and supports complex data models — making it the standard for Industry 4.0 and IIoT integration.' },
      { q: 'A chattering alarm (rapidly toggling between alarm and normal states) is best corrected by:', a: ['Adding a dead band or on-delay timer to the alarm setpoint', 'Deleting the alarm permanently', 'Reducing the SCADA polling interval', 'Increasing alarm priority to critical'], correct: 0, exp: 'A dead band (hysteresis) or on-delay timer prevents rapid toggling when the process variable fluctuates around the setpoint, eliminating nuisance chattering.' },
      { q: 'An Industrial DMZ in an ICS network provides:', a: ['Controlled data exchange between IT and OT networks with defined, monitored pathways', 'Guest network access for plant visitors', 'Direct internet access for PLC firmware updates', 'Wireless coverage throughout the plant'], correct: 0, exp: 'The industrial DMZ is a buffer zone between IT and OT networks where data transfer occurs through controlled, monitored pathways — preventing direct IT-to-OT access.' },
      { q: 'The data historian in a SCADA system is primarily used for:', a: ['Storing time-series process data for trend analysis and reporting', 'Processing alarm logic', 'Programming PLC tag databases', 'Managing operator login credentials'], correct: 0, exp: 'The historian stores time-stamped process values at configurable intervals for trend analysis, compliance reporting, and incident investigation.' },
      { q: 'DNP3 protocol is most commonly used in:', a: ['Electric utility SCADA (substation, distribution automation)', 'Factory automation (machine control)', 'Building automation systems', 'Food and beverage process control'], correct: 0, exp: 'DNP3 was designed for utility SCADA: it handles slow WAN links, time-stamping, and data integrity checks needed in substation and distribution automation.' },
      { q: 'The most critical first cybersecurity step when commissioning a new PLC or HMI is:', a: ['Changing all default usernames and passwords', 'Installing antivirus on the HMI PC', 'Connecting to the internet to check for updates', 'Enabling guest network access for vendor support'], correct: 0, exp: 'Default credentials are the most exploited ICS vulnerability. They must be changed immediately on all network-connected devices before commissioning.' },
      { q: 'An RTU (Remote Terminal Unit) differs from a standard PLC in that it is optimized for:', a: ['Remote standalone operation over wide-area networks (pipelines, utilities)', 'High-speed machine control in a factory', 'Motion control and servo positioning', 'High-count I/O in large process plants'], correct: 0, exp: 'RTUs are designed for remote, standalone sites (pumping stations, pipeline segments) that communicate over WAN links — often cellular or radio — to a distant SCADA control center.' },
    ],
  },
  {
    id: 'plc-networking',
    num: 14,
    title: 'Industrial Networking',
    desc: 'Industrial Ethernet, EtherNet/IP, PROFINET, Modbus TCP, DeviceNet, device-level fieldbus, and network topology.',
    slides: [
      {
        title: 'Industrial Ethernet Fundamentals',
        body: [
          'Industrial Ethernet adapts standard Ethernet (IEEE 802.3) for harsh plant-floor environments. Differences from commercial Ethernet: rugged connectors (M12 circular instead of RJ45), shielded cables rated for EMI-heavy environments, managed switches with deterministic traffic handling (QoS/prioritization), extended temperature range (-40°C to +70°C or higher), redundancy features (ring topology with RSTP or PRP/HSR for sub-millisecond recovery). Standard Ethernet is not designed for real-time control — industrial Ethernet adds real-time extensions.',
          'Key industrial Ethernet standards: EtherNet/IP (Allen-Bradley, Rockwell — most common in North America); PROFINET (Siemens — dominant in Europe); EtherCAT (ultra-high-speed motion control, sub-ms cycle times); Modbus TCP/IP (legacy, widely supported); POWERLINK (Ethernet-based, open source). All use standard Ethernet hardware at Layer 1 and 2 but differ in application-layer protocols (Layer 7). This means they can share physical infrastructure but not mix protocols without gateways.',
        ],
        keyPoints: [
          'Industrial Ethernet: standard Ethernet hardware + rugged connectors, managed switches, EMI shielding',
          'Real-time determinism via QoS prioritization — standard Ethernet is not real-time by default',
          'EtherNet/IP (Allen-Bradley): most common in North America; PROFINET (Siemens): dominant in Europe',
          'EtherCAT: ultra-high-speed (sub-ms), used in motion control; Modbus TCP: legacy, widely supported',
        ],
        quiz: [
          { q: 'What is the primary reason standard commercial Ethernet is not used directly for real-time PLC control?', a: ['Standard Ethernet is too slow at 100 Mbps', 'Standard Ethernet is not deterministic — packet delivery timing cannot be guaranteed', 'Standard Ethernet requires proprietary switches', 'Standard Ethernet does not support more than 16 devices'], correct: 1, exp: 'Standard Ethernet uses CSMA/CD (collision detection) and variable-delay switches, making packet delivery timing unpredictable. Industrial Ethernet adds managed switches with QoS prioritization to provide the determinism required for real-time control.' },
          { q: 'EtherNet/IP is most commonly used with which PLC manufacturer\'s products?', a: ['Siemens', 'Mitsubishi', 'Allen-Bradley (Rockwell Automation)', 'Omron'], correct: 2, exp: 'EtherNet/IP (Ethernet Industrial Protocol) was developed by Rockwell Automation and is the primary industrial Ethernet standard used with Allen-Bradley ControlLogix, CompactLogix, and MicroLogix PLCs.' },
        ],
      },
      {
        title: 'Modbus Protocol',
        body: [
          'Modbus is the most widely used industrial communication protocol due to its simplicity and openness. Originally developed by Modicon in 1979 for serial RS-485/RS-232 communications (Modbus RTU). Modbus TCP/IP is the Ethernet version. Modbus uses a master/slave (client/server in Modbus TCP) architecture — one master polls each slave in sequence. Up to 247 slaves on a Modbus RTU RS-485 network; unlimited on Modbus TCP/IP.',
          'Modbus register types: Coils (0x): single-bit read/write (discrete outputs). Discrete Inputs (1x): single-bit read-only (discrete inputs). Input Registers (3x): 16-bit read-only (analog inputs). Holding Registers (4x): 16-bit read/write (analog outputs, setpoints). The master sends function codes to read or write these register types. Function code 01: read coils. 03: read holding registers. 06: write single holding register. 16 (0x10): write multiple holding registers. Knowing register types and function codes is essential for troubleshooting Modbus communication issues.',
        ],
        keyPoints: [
          'Modbus: most widely used industrial protocol; open, simple, developed 1979 by Modicon',
          'Modbus RTU: RS-485 serial; Modbus TCP/IP: Ethernet version; master/slave architecture',
          'Register types: Coils (R/W bit), Discrete Input (R-only bit), Holding Registers (R/W 16-bit), Input Registers (R-only 16-bit)',
          'Common function codes: FC01 read coils, FC03 read holding registers, FC16 write multiple registers',
        ],
        quiz: [
          { q: 'Modbus Holding Registers (4x) support which access type?', a: ['Read-only from the master', 'Write-only from the master', 'Read/write from the master', 'No access — reserved for diagnostics'], correct: 2, exp: 'Holding Registers (4x) are 16-bit registers that the master can both read (FC03) and write (FC06, FC16). They store setpoints, output values, and configuration parameters.' },
          { q: 'Modbus RTU uses which physical layer for serial communication?', a: ['RS-232 single-ended', 'RS-485 differential (two-wire)', 'USB 2.0', 'CAN bus (ISO 11898)'], correct: 1, exp: 'Modbus RTU commonly uses RS-485 differential signaling, which supports up to 247 devices on a single bus, distances up to 1200 m, and is resistant to common-mode noise — essential for noisy industrial environments.' },
        ],
      },
      {
        title: 'DeviceNet and PROFIBUS',
        body: [
          'DeviceNet is a device-level fieldbus (CAN-based) developed by Allen-Bradley for connecting field devices (drives, sensors, valve banks) to a PLC without individual home-run wiring. Trunkline-dropline topology: a thick trunkline cable runs through the machine; drop lines connect each device. Supports 64 nodes, up to 500 m trunkline. DeviceNet uses sealed micro (M12) or mini connectors that lock positively — eliminating accidental disconnection. Replaces massive multi-conductor control cables with a single 5-wire (power + signal) trunk.',
          'PROFIBUS DP (Decentralized Periphery) is Siemens\' fieldbus standard, widely used in European process and factory automation. PROFIBUS DP: RS-485 based, up to 126 nodes, speeds from 9.6 kbps to 12 Mbps. PROFIBUS PA: process automation variant, MBP (Manchester Bus Powered) physical layer — intrinsically safe, suitable for hazardous areas, powers field transmitters from the bus. As industrial Ethernet has matured, PROFIBUS is being replaced by PROFINET for new installations, but millions of legacy systems still run PROFIBUS.',
        ],
        keyPoints: [
          'DeviceNet: CAN-based, Allen-Bradley, trunkline-dropline, 64 nodes, replaces home-run control cables',
          'DeviceNet: 5-wire trunk (power + signal), M12 sealed connectors, 500 m trunkline max',
          'PROFIBUS DP: RS-485, up to 126 nodes, 12 Mbps max, Siemens/European factory automation',
          'PROFIBUS PA: intrinsically safe, powers field instruments from bus — used in hazardous areas',
        ],
        quiz: [
          { q: 'DeviceNet uses which physical layer technology as its basis?', a: ['RS-485 differential signaling', 'CAN (Controller Area Network) bus', 'IEEE 802.3 Ethernet', 'RS-232 single-ended serial'], correct: 1, exp: 'DeviceNet is built on the CAN (Controller Area Network) physical and data link layers. CAN\'s robust error detection and priority-based arbitration make it well suited for device-level machine control.' },
          { q: 'PROFIBUS PA differs from PROFIBUS DP in that PROFIBUS PA is:', a: ['Faster (up to 100 Mbps) for high-speed process control', 'Intrinsically safe and able to power field instruments from the bus in hazardous areas', 'Only compatible with Siemens S7 PLCs', 'A wireless protocol for remote field devices'], correct: 1, exp: 'PROFIBUS PA uses MBP (Manchester Bus Powered) physical layer, which is intrinsically safe and powers field transmitters from the bus. It is designed for process automation in Zone 1/Zone 2 hazardous areas.' },
        ],
      },
      {
        title: 'Network Topology and Redundancy',
        body: [
          'Industrial networks use several topology options: Star: all devices connect to a central switch — simple, easy to troubleshoot, single switch failure can take down all devices. Ring: devices connected in a loop — a single cable break does not disrupt communication because traffic re-routes in the opposite direction. Ring recovery depends on the protocol: STP/RSTP convergence: 1–30 seconds (too slow for motion control); Media Redundancy Protocol (MRP): sub-200 ms; PRP/HSR: zero-switchover time (duplicate frames sent on both paths simultaneously).',
          'High-availability (HA) systems use redundant PLCs (primary + secondary in hot standby), redundant networks (dual Ethernet rings), redundant power supplies (dual 24 VDC feeds), and uninterruptible power for the PLC panel. The switchover time specification determines which redundancy technology is needed: process control (seconds tolerance) → RSTP; production line (sub-second) → MRP; safety/critical (zero) → PRP/HSR or proprietary redundancy. Always document the network topology as-built — it is essential for troubleshooting.',
        ],
        keyPoints: [
          'Star topology: simple, easy troubleshoot; single switch failure impacts all devices',
          'Ring topology: tolerates single cable break; recovery speed depends on protocol',
          'RSTP: 1–30 s recovery; MRP: sub-200 ms; PRP/HSR: zero-switchover (parallel paths)',
          'HA systems: redundant PLCs, dual networks, dual power supplies, UPS for control panels',
        ],
        quiz: [
          { q: 'What is the main advantage of a ring network topology over a star topology in industrial Ethernet?', a: ['Lower cost — fewer switches required', 'Tolerance of a single cable break without disrupting communication', 'Faster data rates — ring protocols support 10 Gbps', 'Easier to add new devices — just splice into the ring'], correct: 1, exp: 'A ring topology provides path redundancy — if one cable segment fails, traffic automatically re-routes in the opposite direction around the ring. Star topologies have no path redundancy for cable failures.' },
          { q: 'PRP (Parallel Redundancy Protocol) provides zero switchover time because:', a: ['It uses the fastest CPU for switchover decisions', 'It sends duplicate frames simultaneously on two independent networks — no switchover is needed', 'It pre-positions backup switches in a warm standby state', 'It runs a proprietary protocol that bypasses standard Ethernet framing'], correct: 1, exp: 'PRP sends identical frames on two completely independent network paths simultaneously. The receiving device accepts the first frame and discards the duplicate. If one path fails, frames continue arriving on the other path — truly zero switchover time.' },
        ],
      },
      {
        title: 'Network Troubleshooting',
        body: [
          'Systematic network troubleshooting steps: (1) Check physical layer — cable connections (M12 connectors not fully seated is the most common industrial Ethernet fault), link lights on switches and device ports. (2) Check IP addressing — duplicate IP addresses cause intermittent communication issues. Use ping to verify basic connectivity. (3) Check subnet mask and gateway — incorrect subnet masks cause devices to fail to communicate even when physically connected. (4) Check firewall/ACL rules — blocked ports cause protocol-specific failures (EtherNet/IP uses TCP 44818 and UDP 2222).',
          'Protocol-specific tools: EtherNet/IP — use Studio 5000 connection diagnostics, Wireshark with EtherNet/IP dissector. Modbus TCP — use Modbus poll software to manually read registers. PROFIBUS/DeviceNet — use manufacturer diagnostic tools (Siemens SIMATIC Manager, Allen-Bradley DriveExplorer). Common fault codes: EtherNet/IP connection timeout (device offline or network issue), Modbus exception code 02 (illegal data address — register does not exist), PROFIBUS station not found (check station address and baud rate match).',
        ],
        keyPoints: [
          'Physical layer first: check M12 connector seating, link lights on switch ports',
          'Duplicate IP addresses: cause intermittent communication — use ping sweep to detect',
          'EtherNet/IP ports: TCP 44818 and UDP 2222 — must be allowed through firewalls',
          'Modbus exception 02: illegal data address — register number does not exist in the device',
        ],
        quiz: [
          { q: 'The most common cause of industrial Ethernet communication failures in field-level devices is:', a: ['Incorrect IP subnet mask configuration', 'Duplicate IP addresses on the network', 'M12 connector not fully seated or damaged', 'Incorrect VLAN assignment on the managed switch'], correct: 2, exp: 'M12 circular connectors used on industrial Ethernet devices must be fully seated and locked. An unseated connector causes intermittent or no communication and is the most frequent physical-layer fault in industrial Ethernet systems.' },
          { q: 'A Modbus exception code 02 (Illegal Data Address) response means:', a: ['The device is offline or not responding', 'The requested register address does not exist in the Modbus device', 'The master is sending the wrong function code', 'A CRC checksum error occurred in the request'], correct: 1, exp: 'Modbus exception code 02 indicates the slave received a valid request but the register address does not exist in its register map. The technician should consult the device documentation to verify the correct register address.' },
        ],
      },
    ],
    test: [
      { q: 'What makes industrial Ethernet different from commercial Ethernet for real-time control?', a: ['Managed switches with QoS prioritization for deterministic packet delivery', 'Higher data rates (10 Gbps vs. 1 Gbps commercial)', 'Proprietary cables that cannot carry standard Ethernet frames', 'Industrial Ethernet uses RS-485 instead of twisted-pair cable'], correct: 0, exp: 'Industrial Ethernet adds managed switches with quality-of-service prioritization, rugged connectors, and real-time extensions to provide the determinism required for PLC control — standard Ethernet is not deterministic.' },
      { q: 'Modbus Holding Registers (4x) are:', a: ['16-bit read/write registers for setpoints and output values', '1-bit read-only discrete input registers', '16-bit read-only analog input registers', 'Floating-point registers for engineering units'], correct: 0, exp: 'Holding Registers are 16-bit R/W registers accessed via FC03 (read) and FC06/FC16 (write). They store setpoints, output values, and configuration data.' },
      { q: 'DeviceNet is based on which physical layer technology?', a: ['CAN (Controller Area Network)', 'RS-485 differential serial', 'IEEE 802.3 Ethernet', 'Wireless IEEE 802.11'], correct: 0, exp: 'DeviceNet uses CAN bus at the physical and data-link layers, providing robust error detection and deterministic communication for device-level machine control.' },
      { q: 'PRP (Parallel Redundancy Protocol) achieves zero switchover time by:', a: ['Sending duplicate frames on two independent networks simultaneously', 'Pre-warming a backup switch in hot standby', 'Using the fastest available processor for failover decisions', 'Buffering all frames until the primary path is confirmed healthy'], correct: 0, exp: 'PRP sends identical frames on two separate networks simultaneously. The receiver accepts the first-arriving frame and discards the duplicate — if one network fails, frames continue arriving on the other.' },
      { q: 'EtherNet/IP requires which ports to be open through a firewall?', a: ['TCP 44818 and UDP 2222', 'TCP 502 and UDP 502', 'TCP 102 only', 'UDP 1234 and TCP 1234'], correct: 0, exp: 'EtherNet/IP uses TCP port 44818 for explicit messaging (CIP over TCP) and UDP port 2222 for implicit messaging (I/O data). Both must be permitted.' },
      { q: 'PROFIBUS PA (compared to PROFIBUS DP) is used in hazardous areas because it:', a: ['Uses intrinsically safe MBP physical layer and powers field instruments from the bus', 'Uses fiber optic cable immune to sparks', 'Operates at lower data rates that do not generate heat', 'Uses wireless instead of wired connections'], correct: 0, exp: 'PROFIBUS PA uses MBP (Manchester Bus Powered) signaling, which is intrinsically safe and can power field transmitters from the bus — allowing use in Zone 1/2 hazardous locations.' },
      { q: 'The most common physical-layer cause of industrial Ethernet faults in field devices is:', a: ['M12 connector not fully seated or damaged', 'Duplicate IP address on the network', 'Incorrect VLAN configuration', 'Wrong subnet mask on the device'], correct: 0, exp: 'M12 connectors must be fully threaded and locked. An unseated M12 is the most frequent physical-layer fault — it causes intermittent or complete loss of communication.' },
      { q: 'Which industrial network recovery protocol provides sub-200 ms ring recovery time?', a: ['MRP (Media Redundancy Protocol)', 'STP (Spanning Tree Protocol)', 'PRP (Parallel Redundancy Protocol)', 'RSTP (Rapid Spanning Tree Protocol)'], correct: 0, exp: 'MRP provides sub-200 ms ring recovery — fast enough for most production line applications. STP/RSTP take 1–30 seconds (too slow for real-time control), and PRP provides zero switchover.' },
      { q: 'A Modbus exception code 02 response indicates:', a: ['The requested register address does not exist in the device', 'A physical communication error occurred', 'The device is in configuration mode and not responding', 'The master sent an invalid function code'], correct: 0, exp: 'Exception code 02 = Illegal Data Address. The slave received a valid request format but the register number does not exist in its Modbus register map — consult device documentation.' },
      { q: 'EtherNet/IP is most widely used in North American industrial applications because:', a: ['It was developed by Rockwell Automation (Allen-Bradley) and is native to ControlLogix PLCs', 'It supports the highest data rates of any industrial Ethernet protocol', 'It is the only industrial Ethernet protocol compatible with standard commercial switches', 'It was mandated by NEMA for all North American installations after 2010'], correct: 0, exp: 'EtherNet/IP was developed by Rockwell Automation and is the native network protocol for all Allen-Bradley ControlLogix, CompactLogix, and Micro800 PLCs — the dominant platform in North American manufacturing.' },
    ],
  },
  {
    id: 'plc-troubleshoot',
    num: 15,
    title: 'PLC Troubleshooting & Maintenance',
    desc: 'Systematic fault diagnosis, online monitoring, firmware updates, preventive maintenance, and documentation.',
    slides: [
      {
        title: 'Systematic Fault Diagnosis',
        body: [
          'Systematic PLC troubleshooting follows a defined process: (1) Gather information — talk to operators, review alarm history, identify what changed before the fault. (2) Observe — watch the system running (or not running) to identify what is and is not working. (3) Check physical layer — power supply voltage (24 VDC ± 5%), I/O module status LEDs (I/O fault LEDs indicate hardware or configuration issues), wiring continuity. (4) Check PLC diagnostics — CPU fault codes, I/O fault log, communication error counters. (5) Verify program logic — use online monitoring to watch tags in real time while conditions are reproduced.',
          'Divide-and-conquer approach: isolate the fault to subsystem (mechanical, electrical, PLC program, network). If the actuator operates when manually forced from the PLC but not from the program, the fault is in the control program or its inputs. If the actuator does not operate when forced, the fault is in the actuator wiring or the device itself. This systematic approach avoids random part replacement — the most common (and expensive) troubleshooting mistake in PLC-controlled systems.',
        ],
        keyPoints: [
          'Systematic approach: gather info → observe → check physical → check diagnostics → verify program',
          'Divide-and-conquer: isolate fault to subsystem (mechanical, electrical, program, network)',
          'Force test: if actuator works when forced from PLC but not from program → fault is in program/inputs',
          'If actuator does not work when forced → fault is in wiring or the actuator itself',
        ],
        quiz: [
          { q: 'If a PLC output is forced ON but the actuator does not energize, the fault is most likely in:', a: ['The PLC program logic', 'The input sensor feeding the rung', 'The output wiring, fuse, or the actuator itself', 'The PLC power supply'], correct: 2, exp: 'Forcing an output bypasses the program logic and directly sets the output bit. If the actuator still does not respond, the fault is downstream of the PLC — field wiring, a blown fuse, or the actuator (solenoid, starter) itself.' },
          { q: 'The most common troubleshooting mistake in PLC-controlled systems is:', a: ['Using online monitoring to watch tags in real time', 'Systematic divide-and-conquer fault isolation', 'Random part replacement without identifying the root cause', 'Checking alarm history before starting diagnosis'], correct: 2, exp: 'Replacing parts without systematic diagnosis wastes time and money, and may not fix the root cause. The most effective troubleshooting always identifies the root cause before replacing any component.' },
        ],
      },
      {
        title: 'Online Monitoring and Diagnostics',
        body: [
          'Online monitoring connects a programming terminal to the running PLC and displays the current state of all tags, bit states (highlighted in programming software), timer/counter values, and analog data in real time. This is the most powerful PLC troubleshooting tool — it allows the technician to watch the program execute and identify exactly which rung conditions are preventing an output from energizing. Key online monitoring tools: Watch Window (monitor specific tags across multiple rungs), Cross Reference (find every rung that reads or writes a specific tag), Trend (plot tag values over time).',
          'CPU diagnostic fault codes (Allen-Bradley example): Major fault code 4 (I/O fault — a module is not communicating), Major fault code 70 (Unrecoverable I/O fault — module hardware failure), Minor fault code 8 (battery low — program memory backup at risk). Fault codes are displayed on the CPU LED, in the programming software fault log, and on the HMI. Always document fault codes before clearing — clearing without documentation prevents identifying recurring patterns.',
        ],
        keyPoints: [
          'Online monitoring: real-time tag/bit display — watch program execute to find blocking conditions',
          'Watch Window: monitor specific tags; Cross Reference: find all uses of a tag; Trend: plot values over time',
          'CPU fault codes: AB code 4 = I/O fault; code 70 = unrecoverable I/O; code 8 = low battery',
          'Document fault codes before clearing — recurring faults indicate root cause not resolved',
        ],
        quiz: [
          { q: 'The most powerful tool for identifying why a PLC output is not energizing is:', a: ['Multimeter at the output terminal', 'Online monitoring to watch program logic and tag states in real time', 'Replacing the output module', 'Checking the CPU fault log only'], correct: 1, exp: 'Online monitoring lets you watch the program execute in real time — you can see exactly which contact is open (not passing power) that is preventing the rung from energizing the output coil.' },
          { q: 'An Allen-Bradley major fault code 4 indicates:', a: ['Low battery — program memory at risk', 'An I/O module is not communicating (I/O fault)', 'The program has a math overflow error', 'The CPU is in remote program mode'], correct: 1, exp: 'Major fault code 4 = I/O fault. An I/O module is either offline, not configured, or has a hardware problem. Check the I/O module LEDs, power, and connection to the CPU backplane.' },
        ],
      },
      {
        title: 'Preventive Maintenance',
        body: [
          'PLC preventive maintenance (PM) tasks: Clean air filters on VFDs, control panel cooling units, and cabinets with positive pressure purge — quarterly or per manufacturer schedule. Check panel interior temperature — most PLCs rated for 0–55°C ambient; overheating is a primary cause of premature CPU and I/O module failure. Check 24 VDC power supply output voltage (should be 24 VDC ± 1%, not 22 or 26 VDC). Inspect terminal block connections for corrosion and tightness — loose connections cause intermittent faults that are difficult to reproduce.',
          'Battery maintenance: many PLCs use lithium batteries to retain program memory and time-of-day clock during power outages. Battery life: typically 5–7 years. Replace before the "battery low" alarm activates — a failed battery during a power outage causes program loss, requiring reload from a backup. Always keep a backup copy of the PLC program stored offline (USB or server) and verify it matches the current running program. Firmware updates: only update PLC firmware if a specific bug fix is needed or a security patch is required — never update just to have the latest version in a production system without testing.',
        ],
        keyPoints: [
          'PM: clean air filters quarterly; verify panel temp < 55°C; check 24 VDC supply ± 1%',
          'Inspect terminal blocks for corrosion and loose connections — common cause of intermittent faults',
          'PLC battery: lithium, 5–7 year life; replace before low-battery alarm; keep offline program backup',
          'Firmware updates: only for specific bug fix or security patch — test before deploying to production',
        ],
        quiz: [
          { q: 'A loose terminal block connection in a PLC I/O cabinet most commonly causes:', a: ['Permanent (hard) output failure detectable with a multimeter', 'Intermittent faults that are difficult to reproduce', 'Immediate CPU fault and program halt', 'Communication errors on the industrial Ethernet network'], correct: 1, exp: 'Loose connections cause high resistance or open circuits that vary with vibration and temperature. This produces intermittent faults — the device works sometimes but not others — making them notoriously difficult to diagnose.' },
          { q: 'The PLC battery should be replaced:', a: ['Only after the battery low alarm activates', 'Proactively before the battery low alarm, on a scheduled PM interval (5–7 years)', 'Every year regardless of battery condition', 'Only when the CPU fails to retain program after a power outage'], correct: 1, exp: 'Battery low alarm is the last warning before failure. Proactive replacement on a 5–7 year schedule ensures program retention is never at risk. Waiting for the alarm means the battery may fail before the next scheduled maintenance visit.' },
        ],
      },
      {
        title: 'Program Backup and Version Control',
        body: [
          'Every PLC program must have a current backup stored offline in at least two locations. Backup immediately after any program change — never leave a modification undocumented and unbacked. Backup media: USB drive stored in the panel, network server, version control system (recommended for complex projects). Compare backup to running program before modifying — use the programming software Compare function to detect unauthorized or undocumented changes.',
          'Change management: all program modifications in a production system should follow a Management of Change (MOC) procedure: document what is changing and why, test in offline simulation if possible, verify the change does not affect other functions (check cross-references), backup before and after, record the change in a modification log. Undocumented program changes are a serious safety risk — a future technician may not understand that a "temporary" interlock was bypassed and may not know to restore it.',
        ],
        keyPoints: [
          'Backup every PLC program change immediately — store in at least two locations',
          'Compare backup to running program before modifications — detect undocumented changes',
          'MOC procedure: document change, test offline, verify cross-references, backup before/after, log the change',
          'Undocumented program changes are a safety risk — future technicians may not know bypasses were made',
        ],
        quiz: [
          { q: 'Before making any modification to a running PLC program, the technician should first:', a: ['Compare the backup program to the current running program to detect undocumented changes', 'Clear all faults and confirm normal operation', 'Disconnect all network connections to prevent remote interference', 'Create a new project file for the modification'], correct: 0, exp: 'Comparing the backup to the running program before modifying ensures you know the true current state of the program. Undocumented changes by others may affect your modification or reveal a previous bypass.' },
          { q: 'A Management of Change (MOC) procedure for PLC program modifications requires:', a: ['Documentation, offline test if possible, cross-reference check, backup before/after, modification log', 'Only verbal notification to the supervisor before the change', 'Immediate deployment to production without testing to minimize downtime', 'No documentation for minor changes (less than 5 rungs)'], correct: 0, exp: 'MOC ensures every change is documented, tested, verified for unintended effects, backed up, and recorded. This protects against safety hazards from undocumented bypasses and ensures changes can be reversed if issues arise.' },
        ],
      },
      {
        title: 'Motion Control and Drive Integration',
        body: [
          'Variable Frequency Drives (VFDs) are the most common actuator integrated with PLCs. VFDs control motor speed by varying output frequency (0–120 Hz typical) and voltage. PLC-VFD integration methods: discrete control (Run/Stop, Forward/Reverse via hardwired outputs), analog speed reference (0–10 VDC or 4–20 mA for speed setpoint), fieldbus (EtherNet/IP, PROFIBUS, DeviceNet — speed, direction, torque, diagnostics via network). Fieldbus integration provides full VFD diagnostics: actual speed, current draw, fault codes, temperature — all available as PLC tags.',
          'VFD fault conditions commonly returned to PLC via network: over-voltage (line transient), under-voltage (power dip), overcurrent (motor overload or short circuit), ground fault (insulation failure), overtemperature (blocked ventilation). The PLC program should read the VFD fault code on a fault output discrete signal or via network word, display it on the HMI, and log it to the historian. Never reset a VFD fault without identifying the cause — repetitive resets without investigation can cause motor winding failure.',
        ],
        keyPoints: [
          'VFD-PLC integration: discrete (Run/Stop/Direction), analog (speed reference), or fieldbus (full diagnostics)',
          'Fieldbus VFD integration provides: actual speed, current, fault codes, temperature as PLC tags',
          'Common VFD faults: over/under-voltage, overcurrent, ground fault, overtemperature',
          'Never reset a VFD fault without identifying the cause — repeated resets risk motor winding damage',
        ],
        quiz: [
          { q: 'Fieldbus integration of a VFD with a PLC provides which capability that analog speed reference alone cannot?', a: ['Variable speed control of the motor', 'Full diagnostic feedback (fault codes, current, temperature) as PLC network tags', 'Forward and reverse direction control', 'Run/Stop control of the motor'], correct: 1, exp: 'Analog integration provides only a speed reference signal. Fieldbus provides bidirectional communication — speed setpoint, direction, Run/Stop command in one direction, and actual speed, current, fault codes, temperature back to the PLC.' },
          { q: 'A VFD ground fault indicates:', a: ['The input power supply voltage is too high', 'An insulation failure in the motor or power cable allowing current to flow to ground', 'The VFD fan has stopped operating', 'A phase imbalance in the input power'], correct: 1, exp: 'A ground fault indicates that current is flowing from the motor winding or drive output cable to ground — a sign of insulation breakdown. This must be investigated before restarting — a motor winding failure can cause fire or complete motor destruction.' },
        ],
      },
    ],
    test: [
      { q: 'If a PLC output is forced ON but the actuator does not respond, the fault is most likely:', a: ['In the output wiring, fuse, or the actuator itself', 'In the PLC program logic', 'In the input sensor wiring', 'In the PLC power supply'], correct: 0, exp: 'Forcing bypasses the program. If the actuator still does not respond, the fault is downstream — field wiring, blown fuse, or failed actuator.' },
      { q: 'Online monitoring of a PLC program allows the technician to:', a: ['Watch tag states and rung logic execute in real time to identify blocking conditions', 'Modify the program while the PLC is in run mode without any risk', 'Replace I/O modules without powering down the system', 'Update firmware while the machine is running production'], correct: 0, exp: 'Online monitoring displays the live state of all contacts, coils, and data tags — allowing the technician to identify exactly which condition is preventing an output from energizing.' },
      { q: 'An Allen-Bradley PLC major fault code 4 indicates:', a: ['An I/O module is not communicating', 'Low CPU battery', 'Program memory overflow', 'Ethernet communication failure'], correct: 0, exp: 'Major fault code 4 = I/O fault. An I/O module is offline, not configured, or has a hardware problem — check module LEDs and backplane connection.' },
      { q: 'The PLC lithium battery should be replaced on which schedule?', a: ['Proactively every 5–7 years before the low-battery alarm', 'Only after it fails during a power outage', 'Annually regardless of condition', 'Never — PLC batteries are maintenance-free'], correct: 0, exp: 'Proactive replacement every 5–7 years ensures the battery never fails unexpectedly. Waiting for the low-battery alarm means the battery may fail before the next maintenance visit.' },
      { q: 'A loose terminal block connection in an I/O cabinet typically causes:', a: ['Intermittent faults that are difficult to reproduce', 'Permanent output failure detectable immediately', 'Immediate CPU fault code', 'Communication errors on the industrial network'], correct: 0, exp: 'Loose connections cause high resistance or opens that vary with vibration and temperature — producing intermittent, hard-to-reproduce faults.' },
      { q: 'Before modifying a production PLC program, the technician should:', a: ['Compare the backup to the running program to detect undocumented changes', 'Clear all faults first', 'Disconnect the HMI to prevent operator interference', 'Disable the watchdog timer'], correct: 0, exp: 'Comparing backup to running program reveals any undocumented changes made since the last backup — ensuring you understand the true current state before modifying.' },
      { q: 'Fieldbus integration of a VFD provides which advantage over analog speed reference?', a: ['Full diagnostic feedback (fault codes, current, temperature) as PLC tags', 'Variable speed control of the motor', 'Run/Stop control of the motor', 'Forward/Reverse direction control'], correct: 0, exp: 'Fieldbus provides bidirectional communication — setpoints out, diagnostics back. Analog provides only a unidirectional speed reference signal.' },
      { q: 'A VFD ground fault alarm indicates:', a: ['Insulation failure in the motor or cable allowing current to flow to ground', 'Input over-voltage from the utility', 'Ambient temperature too high in the drive enclosure', 'Phase imbalance in the supply voltage'], correct: 0, exp: 'A ground fault indicates current flowing to ground through degraded insulation in the motor winding or power cable — requires investigation before restarting.' },
      { q: 'A Management of Change (MOC) procedure for PLC program changes requires:', a: ['Documentation, offline test, cross-reference check, backup before/after, modification log', 'Only verbal notification to the supervisor', 'Immediate deployment without testing', 'No documentation for changes under 5 rungs'], correct: 0, exp: 'MOC ensures every change is documented, tested, verified for unintended effects on other functions, backed up, and logged — protecting against undocumented bypasses and safety hazards.' },
      { q: 'The best PLC maintenance practice for preventing overheating failures is:', a: ['Cleaning air filters quarterly and verifying panel ambient temperature < 55°C', 'Replacing the CPU every 5 years', 'Keeping the panel door open for airflow', 'Removing unused I/O modules to reduce heat generation'], correct: 0, exp: 'Clogged air filters are the primary cause of PLC cabinet overheating. Regular filter cleaning and temperature monitoring keep the panel within the PLC\'s rated ambient temperature range.' },
    ],
  },
  {
    id: 'plc-career',
    num: 16,
    title: 'PLC Career Pathways',
    desc: 'Certifications (Rockwell, Siemens, ISA CCST), career progression, professional standards, and industry specializations.',
    slides: [
      {
        title: 'Manufacturer Certifications',
        body: [
          'Major PLC manufacturers offer certifications that validate product-specific competency. Rockwell Automation (Allen-Bradley): Rockwell Automation Certified Technician (RACT) — validates ability to install, program, and troubleshoot Allen-Bradley PLC systems. The RACT program covers ControlLogix, CompactLogix, and PanelView HMI platforms. Siemens: Siemens Totally Integrated Automation (TIA) Certification — validates expertise with Siemens SIMATIC S7 PLCs and TIA Portal software. Siemens certifications are tiered: Associate, Professional, Expert.',
          'Manufacturer certifications demonstrate platform-specific expertise to employers. Many integrators and OEMs require at least one manufacturer certification for automation technician roles. Certifications are typically renewed every 2–3 years through re-examination or continuing education. Platform-specific certification is valuable but limits career flexibility to systems using that manufacturer\'s equipment — pairing manufacturer certification with the broader ISA CCST credential provides the strongest professional foundation.',
        ],
        keyPoints: [
          'Rockwell RACT: validates ControlLogix, CompactLogix, PanelView HMI competency',
          'Siemens TIA Certification: SIMATIC S7 and TIA Portal; tiered (Associate, Professional, Expert)',
          'Manufacturer certs: platform-specific; often required by integrators and OEMs',
          'Pair manufacturer cert with ISA CCST for broadest professional foundation',
        ],
        quiz: [
          { q: 'The Rockwell Automation Certified Technician (RACT) credential primarily validates:', a: ['ISA generic control systems knowledge', 'Competency with Allen-Bradley ControlLogix and CompactLogix PLC systems', 'OSHA electrical safety certification', 'SCADA cybersecurity certification'], correct: 1, exp: 'RACT validates the ability to install, program, and troubleshoot Rockwell Automation (Allen-Bradley) PLC and HMI platforms — specifically ControlLogix, CompactLogix, and PanelView.' },
          { q: 'Why is pairing a manufacturer certification with ISA CCST beneficial for a control systems technician?', a: ['ISA CCST is required by all PLC manufacturers for warranty support', 'Manufacturer certs are platform-specific; CCST adds broad, vendor-neutral control systems knowledge', 'CCST is required before taking any manufacturer exam', 'ISA CCST replaces the need for manufacturer-specific certification entirely'], correct: 1, exp: 'Manufacturer certifications are platform-specific. ISA CCST validates broad, vendor-neutral control and instrumentation knowledge — together they make the technician effective on any platform.' },
        ],
      },
      {
        title: 'ISA Certifications',
        body: [
          'The International Society of Automation (ISA) offers the most widely recognized vendor-neutral certifications in industrial automation. CCST (Certified Control Systems Technician): for technicians who calibrate, document, troubleshoot, and repair instrumentation and control systems. Three levels: CCST Level I (associate), CCST Level II (journey), CCST Level III (senior). Examination covers: process control theory, instrumentation, PLCs, DCS, SCADA, calibration, documentation, safety instrumented systems.',
          'CAP (Certified Automation Professional): for engineers and technical professionals who design and implement automation systems. CAP covers project management, system design, installation, maintenance, and business/IT integration. ISA certifications are renewable every 5 years through continuing education points or re-examination. ISA also publishes the S standards (S5.1 instrumentation symbology, S88 batch control, S95 enterprise-control integration, S99 ICS security) that are referenced globally.',
        ],
        keyPoints: [
          'ISA CCST: vendor-neutral certification for control systems technicians; three levels (I, II, III)',
          'CCST exam: process control, instrumentation, PLCs, DCS, SCADA, calibration, SIS',
          'CAP: Certified Automation Professional — for engineers designing and implementing automation systems',
          'ISA standards: S5.1 (symbols), S88 (batch), S95 (enterprise integration), S99 (ICS security)',
        ],
        quiz: [
          { q: 'The ISA CCST certification is designed for professionals who primarily:', a: ['Design and specify new automation systems (engineers)', 'Calibrate, document, troubleshoot, and repair instrumentation and control systems (technicians)', 'Manage automation project budgets and schedules', 'Install PLC hardware without programming responsibility'], correct: 1, exp: 'CCST (Certified Control Systems Technician) targets technicians who maintain, calibrate, troubleshoot, and repair instrumentation and control systems — not design engineers.' },
          { q: 'ISA Standard S5.1 governs:', a: ['Batch process control requirements', 'Instrumentation symbols and identification (P&ID symbology)', 'ICS cybersecurity requirements', 'Enterprise-control system integration'], correct: 1, exp: 'ISA S5.1 defines the standard symbols used on piping and instrumentation diagrams (P&IDs) and instrument loop diagrams — the universal language for documenting process control systems.' },
        ],
      },
      {
        title: 'Career Progression',
        body: [
          'Entry-level: Controls technician apprentice or junior electrician. Tasks: wire panels from drawings, install PLC hardware, support senior technicians. Skills to develop: reading electrical drawings (P&IDs, ladder diagrams, wiring diagrams), multimeter and continuity testing, basic PLC I/O troubleshooting. Certification: EPA 608 if HVAC-adjacent; OSHA 10 for site safety; pursue ISA CCST Level I after 2 years.',
          'Mid-level: Controls technician, automation technician. Tasks: independently commission PLC systems, troubleshoot complex faults, write simple program modifications, configure HMI screens. Skills: PLC programming (at least one manufacturer platform), Modbus/EtherNet/IP networking, VFD commissioning. Senior level: lead controls technician, controls engineer. Tasks: system design, program development, multi-system integration, project management, mentor junior technicians. Certifications: ISA CCST Level II/III, CAP, manufacturer specialist certifications.',
        ],
        keyPoints: [
          'Entry: wire panels, install hardware, basic I/O troubleshooting; target ISA CCST I after 2 years',
          'Mid-level: commission PLC systems independently, write program modifications, configure HMIs',
          'Senior: system design, full program development, multi-system integration, project leadership',
          'Senior certifications: ISA CCST II/III, CAP, manufacturer specialist (Rockwell, Siemens)',
        ],
        quiz: [
          { q: 'Which certification is most appropriate as a first milestone for an entry-level controls technician after 2 years of field experience?', a: ['ISA CAP (Certified Automation Professional)', 'ISA CCST Level I', 'Siemens TIA Expert Level', 'Rockwell Automation RACT Specialist'], correct: 1, exp: 'ISA CCST Level I is designed for technicians with 2+ years of experience in control systems work. It validates foundational knowledge of instrumentation, PLCs, and control theory — the right first certification milestone for a junior technician.' },
          { q: 'A senior controls engineer\'s role differs from a controls technician primarily because the engineer:', a: ['Has a higher level of physical safety clearance', 'Designs control systems and develops full programs from requirements — not just maintains existing systems', 'Only works with one specific PLC manufacturer platform', 'Is not required to troubleshoot field problems'], correct: 1, exp: 'Senior controls engineers design systems, develop programs from functional requirements, specify hardware, and integrate multiple systems. Technicians maintain, troubleshoot, and modify existing systems.' },
        ],
      },
      {
        title: 'Industry Specializations',
        body: [
          'PLC and industrial controls skills apply across many industries, each with specialized requirements. Oil & Gas: safety instrumented systems (SIS/SIL-rated PLC), ATEX/IECEx equipment for hazardous areas, wellhead control, pipeline SCADA. Manufacturing: high-speed packaging, robotic integration (FANUC, KUKA, ABB), servo motion control, machine vision integration. Water/Wastewater: SCADA for distributed pump stations, chemical dosing control, NEMA 4X panels for wet environments.',
          'Building Automation: BAS/BMS integration (BACnet, LonWorks), chiller and AHU sequences, energy management. Pharmaceutical: 21 CFR Part 11 compliance (electronic records/signatures for FDA), GAMP5 validation protocol — all program changes require validation documentation. Food and Beverage: CIP (clean-in-place) sequences, washdown-rated components (IP69K), HACCP integration. Each specialization adds compliance and application-specific requirements on top of core PLC skills.',
        ],
        keyPoints: [
          'Oil & Gas: SIS/SIL-rated PLCs, ATEX/IECEx hazardous area equipment, wellhead SCADA',
          'Manufacturing: servo/motion control, robot integration (FANUC, KUKA), machine vision',
          'Pharmaceutical: 21 CFR Part 11 (FDA electronic records), GAMP5 validation documentation required',
          'Food & Beverage: CIP sequences, IP69K washdown-rated components, HACCP integration',
        ],
        quiz: [
          { q: '21 CFR Part 11 compliance in pharmaceutical PLC applications requires:', a: ['Real-time control with scan time under 1 ms', 'Electronic records and signatures with full audit trail — validated per GAMP5 protocol', 'ATEX-rated hardware for hazardous area installation', 'PROFIBUS DP as the mandated communication protocol'], correct: 1, exp: '21 CFR Part 11 (FDA regulation) requires that electronic records and signatures used in pharmaceutical manufacturing have full audit trails, access controls, and are validated using the GAMP5 framework — all PLC program changes must be documented and validated.' },
          { q: 'Safety Instrumented Systems (SIS) in oil and gas applications require PLC hardware that is:', a: ['The fastest available CPU for real-time response', 'SIL-rated (Safety Integrity Level) with redundant architectures and certified failure mode analysis', 'Lowest cost to minimize capital expenditure', 'Wireless to avoid cable runs in hazardous areas'], correct: 1, exp: 'SIS applications require SIL-rated PLC platforms (like Rockwell GuardLogix, Siemens S7-400F) with certified redundant architectures, mandatory proof testing schedules, and analyzed failure modes — meeting IEC 61511 (SIL standard for process safety).' },
        ],
      },
      {
        title: 'Professional Standards and Documentation',
        body: [
          'Industrial controls documentation standards: Piping and Instrumentation Diagram (P&ID) — ISA S5.1 symbols show instruments, control loops, and interconnections. Instrument data sheets document transmitter ranges, calibration values, and alarm setpoints. Loop diagrams trace wiring from field device through junction box, marshalling panel, and I/O card to the PLC tag. Panel drawings show wiring, terminal strips, device locations. All documentation must be kept current — as-built drawings must reflect actual installed configuration.',
          'ISA S88 (Batch Control Standard) defines the procedural control model for batch processes: procedure → unit procedure → operation → phase. This model maps directly to SFC programming in PLCs. ISA S95 (Enterprise-Control System Integration) defines the interface between PLCs/SCADA (Level 2) and MES (Level 3) systems. These standards ensure that control systems from different vendors can exchange production data consistently — critical for Industry 4.0 smart manufacturing integration.',
        ],
        keyPoints: [
          'P&ID (ISA S5.1): instruments, control loops, and interconnections — the master process document',
          'Loop diagrams: trace wiring from field device → junction box → marshalling → I/O card → PLC tag',
          'ISA S88: batch control model (procedure → operation → phase) maps to SFC programming',
          'ISA S95: defines data interface between PLC/SCADA (Level 2) and MES/ERP (Level 3)',
        ],
        quiz: [
          { q: 'A loop diagram in industrial controls documentation traces:', a: ['PLC program logic from input contact to output coil', 'Wiring from the field device through junction boxes, marshalling panels, to the I/O card and PLC tag', 'Process flow from raw material input to finished product output', 'Network connectivity from PLC to SCADA server'], correct: 1, exp: 'Loop diagrams are wiring documents that trace the complete signal path of a single instrument loop: from the field transmitter, through all junction boxes and marshalling panels, to the specific I/O card terminal and PLC tag — essential for commissioning and troubleshooting.' },
          { q: 'ISA S95 standard defines the interface between:', a: ['PLC/SCADA systems (Level 2) and MES/ERP systems (Level 3)', 'Field instruments (Level 1) and PLC I/O modules (Level 2)', 'Operator HMI screens and PLC data tags', 'ICS cybersecurity requirements and network segmentation'], correct: 0, exp: 'ISA S95 defines standardized data models and interfaces for exchanging production orders, scheduling, and performance data between control-level systems (PLC/SCADA) and enterprise-level systems (MES, ERP) — critical for smart manufacturing integration.' },
        ],
      },
    ],
    test: [
      { q: 'The Rockwell Automation Certified Technician (RACT) credential validates competency with:', a: ['Allen-Bradley ControlLogix and CompactLogix PLC platforms', 'Siemens SIMATIC S7 PLCs', 'Any PLC platform (vendor-neutral)', 'SCADA and historian systems only'], correct: 0, exp: 'RACT certifies installation, programming, and troubleshooting competency specifically on Rockwell Automation (Allen-Bradley) PLC and HMI platforms.' },
      { q: 'The ISA CCST certification targets professionals who:', a: ['Calibrate, troubleshoot, and repair instrumentation and control systems', 'Design and specify new automation systems', 'Manage automation project budgets', 'Develop cybersecurity policies for ICS networks'], correct: 0, exp: 'CCST = Certified Control Systems Technician — for field technicians who maintain, calibrate, troubleshoot, and repair instrumentation and control systems.' },
      { q: 'ISA S5.1 defines the standard symbology used on:', a: ['P&IDs (Piping and Instrumentation Diagrams)', 'PLC ladder logic programs', 'SFC sequential function charts', 'SCADA HMI screens'], correct: 0, exp: 'ISA S5.1 is the Instrumentation Symbols and Identification standard — it defines the graphic symbols used on P&IDs and instrument loop diagrams throughout the process industries.' },
      { q: 'An appropriate first ISA certification milestone for a controls technician with 2 years of experience is:', a: ['ISA CCST Level I', 'ISA CAP (Certified Automation Professional)', 'Siemens TIA Expert', 'Rockwell RACT Specialist'], correct: 0, exp: 'CCST Level I is designed for technicians with 2+ years of field experience and validates foundational control systems, instrumentation, and PLC knowledge.' },
      { q: '21 CFR Part 11 in pharmaceutical PLC applications requires:', a: ['Electronic records with audit trail and GAMP5 validation documentation for all program changes', 'ATEX hardware for hazardous area installation', 'SIL-rated redundant PLC architecture', 'Wireless HART for all field instruments'], correct: 0, exp: '21 CFR Part 11 is the FDA regulation requiring electronic records with full audit trail and access controls in pharmaceutical manufacturing — all program changes must be validated per GAMP5.' },
      { q: 'ISA S88 batch control standard defines the procedural model as:', a: ['Procedure → Unit Procedure → Operation → Phase', 'PLC → HMI → SCADA → MES', 'Input → Processing → Output → Archive', 'Plan → Schedule → Execute → Review'], correct: 0, exp: 'ISA S88 defines the four-level hierarchy: Procedure (full batch) → Unit Procedure (single equipment) → Operation (step group) → Phase (single step). This maps directly to SFC programming in PLCs.' },
      { q: 'ISA S95 defines the data interface between:', a: ['PLC/SCADA (Level 2) and MES/ERP (Level 3) systems', 'Field instruments and PLC I/O modules', 'HMI operator screens and PLC tags', 'ICS network segments and firewalls'], correct: 0, exp: 'ISA S95 standardizes data models for exchanging production orders, schedules, and performance data between control systems (PLC/SCADA) and enterprise systems (MES, ERP).' },
      { q: 'A loop diagram traces:', a: ['Signal path from field device through marshalling to PLC I/O card and tag', 'Process flow from raw material to finished product', 'PLC program execution from input contact to output coil', 'Network path from PLC to SCADA server'], correct: 0, exp: 'Loop diagrams are single-instrument wiring documents tracing the complete signal path: field transmitter → junction box → marshalling panel → I/O card → PLC tag — used for commissioning and troubleshooting.' },
      { q: 'SIL-rated PLCs in oil & gas safety instrumented systems (SIS) are required because:', a: ['They are certified with redundant architectures and analyzed failure modes per IEC 61511', 'They are the fastest CPUs for real-time safety response', 'They are the lowest cost option for safety applications', 'They are wireless-capable for hazardous area installation'], correct: 0, exp: 'SIL-rated systems (like Rockwell GuardLogix, Siemens S7-400F) are certified for specific safety integrity levels per IEC 61511, with proven failure mode analysis, mandatory redundancy, and required proof test intervals.' },
      { q: 'Which specialization requires IP69K-rated washdown components and CIP (clean-in-place) control sequences?', a: ['Food and Beverage', 'Oil and Gas (hazardous area)', 'Pharmaceutical (FDA regulated)', 'Building Automation (BAS/BMS)'], correct: 0, exp: 'Food and Beverage requires IP69K washdown-rated components (high-pressure hot water cleaning) and CIP sequences that automate the cleaning and sanitizing of process equipment between production runs.' },
    ],
  },
];
