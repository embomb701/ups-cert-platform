import type { TrainingModule } from './modules';

export const TELECOM_MODULES: TrainingModule[] = [
  {
    id: 'tel-industry-overview',
    num: 1,
    title: 'The Telecom Industry and OSP Career',
    desc: 'Who the employers are, how the network is structured, and what outside plant technicians actually do day-to-day.',
    slides: [
      {
        title: 'The Telecom Network — From Core to Customer',
        body: [
          'The telecommunications network is built in layers. At the center are massive backbone nodes — core routers and long-haul fiber routes crossing continents and oceans. From those cores, regional networks distribute to metro areas. From metros, distribution networks reach individual buildings and homes. The outside plant (OSP) technician works in the distribution and access layers: the miles of fiber and copper that connect real people to the network.',
          'Outside plant refers to everything outside a building: aerial cables strung on utility poles, underground cables in conduit or direct-buried, splice enclosures in vaults, remote terminals and distribution points, and cell towers. Inside plant refers to everything within a facility: central offices, IDF/MDF rooms, equipment racks, and cross-connect frames.',
          'The major employers in telecom OSP: incumbent local exchange carriers (ILECs) like AT&T, Verizon, Lumen, and regional telcos; competitive carriers building fiber-to-the-home (FTTH) networks; tower companies (Crown Castle, American Tower, SBA Communications) for cell site work; cable companies (Comcast, Charter, Cox); and contractors who build and maintain networks on behalf of carriers (MasTec, Dycom, Mastec Network Solutions, Black Box).',
          'Federal infrastructure investment (BEAD Program, RDOF) is funding hundreds of billions of dollars of rural broadband and fiber expansion through 2030. The OSP labor shortage is severe — carriers and contractors are competing hard for qualified technicians. Entry-level pay starts at $45,000–$55,000; experienced OSP techs with splicing and OTDR skills earn $65,000–$85,000+.',
        ],
        keyPoints: [
          'OSP = outside plant: aerial, underground, vaults, splice closures, remote terminals, cell sites',
          'ISP = inside plant: central offices, IDFs, equipment rooms, cross-connect frames',
          'Major employers: ILECs, FTTH overbuilders, tower companies, cable MSOs, and OSP contractors',
          'BEAD/RDOF federal funding driving massive fiber expansion through 2030 — labor shortage is real',
        ],
        quiz: [
          {
            q: 'Outside plant (OSP) refers to:',
            a: ['Cables, splice points, and distribution equipment located outside buildings', 'Equipment rooms and cross-connect frames inside central offices', 'Only aerial cables on utility poles', 'The administrative staff who plan network builds'],
            correct: 0,
            exp: 'OSP covers everything outside buildings: aerial cables, underground plant, vaults, splice closures, remote terminals, and cell tower infrastructure.',
          },
          {
            q: 'Which type of employer builds and maintains networks on behalf of carriers?',
            a: ['OSP contractors like MasTec and Dycom', 'Only the carriers themselves (AT&T, Verizon)', 'Tower companies exclusively', 'Equipment manufacturers'],
            correct: 0,
            exp: 'OSP contractors like MasTec, Dycom, and Black Box build and maintain network infrastructure under contract for carriers, cable companies, and tower owners.',
          },
          {
            q: 'What is driving the current demand for OSP technicians?',
            a: ['Federal broadband funding programs expanding rural fiber networks, combined with a labor shortage', 'Replacement of copper with fiber in urban areas only', 'Cell tower decommissioning creating transition work', 'Only 5G deployment at cell sites'],
            correct: 0,
            exp: 'BEAD, RDOF, and carrier fiber-to-the-home builds are creating enormous OSP labor demand. The funding runs through 2030, making this a long-term career opportunity.',
          },
        ],
      },
      {
        title: 'What OSP Technicians Do',
        body: [
          'The OSP technician\'s work spans construction, installation, splicing, testing, and maintenance. On a construction crew you might be placing conduit, pulling cable, and setting pedestals. On a splicing crew you are in a bucket truck or down a manhole, opening splice closures, preparing cable ends, and fusion-splicing individual fibers. On a cell site crew you are powering equipment, running cable, and verifying connectivity. On a trouble crew you are locating faults using test equipment and repairing or replacing damaged plant.',
          'A typical day for an OSP splicer: load the van with splice enclosures, fusion splicer, fiber preparation tools, OTDR, and PPE. Drive to the job site — an aerial closure on a utility pole or a buried closure in a vault. Obtain the splice record from the previous tech or from the job ticket. Open the existing closure without damaging current fibers. Prepare the new cable end: strip jacket, clean the fibers, identify each by buffer color and position. Splice each fiber pair using the fusion splicer. Verify each splice with an OTDR. Document results, close the enclosure, and transmit records before leaving the site.',
          'The distinction between a fiber tech and an OSP tech: a fiber tech may only handle fiber. A full OSP tech also handles copper plant (still common in existing networks), understands DMARC and demarcation points, can work in central offices, runs and terminates structured cabling, and may work on cell site power systems. Broader skills mean broader employment options.',
        ],
        keyPoints: [
          'OSP work: construction, cable placement, fusion splicing, OTDR testing, cell site work, trouble response',
          'A splicer\'s day: load van, arrive on site, open closures, prepare fibers, fusion splice, OTDR verify, document, close',
          'Full OSP techs handle fiber AND copper, DMARC work, structured cabling, and cell site power',
          'Broader skills = broader employment — specialists are limited to one type of work',
        ],
        quiz: [
          {
            q: 'What does an OSP splicer verify after completing each fiber splice?',
            a: ['Splice loss using an OTDR (Optical Time Domain Reflectometer)', 'Continuity using a multimeter', 'Signal strength using an RF meter', 'Connector cleanliness using a fiber scope only'],
            correct: 0,
            exp: 'An OTDR is used to verify each splice, measuring insertion loss and locating reflections or breaks. The OTDR trace becomes part of the permanent splice record.',
          },
          {
            q: 'What separates a full OSP technician from a fiber-only technician?',
            a: ['A full OSP tech also handles copper plant, DMARC work, structured cabling, and cell site power systems', 'Full OSP techs only work on underground plant while fiber techs work aerially', 'Full OSP techs require a higher-level license but do the same work', 'There is no practical difference — both titles describe the same role'],
            correct: 0,
            exp: 'Full OSP techs have broader skills — copper plant, DMARC, structured cabling, and cell site power — giving them more employment options and higher earning potential.',
          },
          {
            q: 'When arriving at an aerial splice closure, the first action before opening it is:',
            a: ['Obtain the splice record from the job ticket or previous documentation to know what fibers are inside', 'Open the closure immediately and identify fibers by visual inspection', 'Contact the carrier NOC to get permission to proceed', 'Test the closure with an OTDR from the ground before climbing'],
            correct: 0,
            exp: 'The splice record tells you how fibers are currently arranged inside the closure. Opening a closure without this knowledge risks damaging live circuits.',
          },
        ],
      },
      {
        title: 'Safety on the Job — Aerial, Underground, and Traffic',
        body: [
          'OSP work has three primary hazard environments: aerial work on poles and in bucket trucks, underground work in manholes and vaults, and roadway work in traffic. Each has specific safety requirements.',
          'Aerial safety: all pole work requires a hard hat. Bucket truck work requires fall protection per OSHA 1926.502. Before ascending a pole with climbers, inspect for decay, foreign objects, and other cables. Maintain minimum approach distances from power lines — the rules differ by voltage and by state/utility. As a telecom tech you do not work on power lines, but power cables often share poles with telecom cables. Know the rule: if you cannot safely maintain the minimum approach distance, call the utility before climbing.',
          'Confined space: manholes are permit-required confined spaces under OSHA 29 CFR 1910.146. Before entering any manhole: test the atmosphere for oxygen level (19.5–23.5% is safe), combustible gases, and toxic gases (CO, H2S). Use a calibrated four-gas meter. Never enter a manhole that fails atmospheric testing. Ventilate with a blower before entering and keep ventilation running. Work in pairs — one inside, one outside as the attendant.',
          'Traffic control: roadway work requires proper traffic control per MUTCD (Manual on Uniform Traffic Control Devices). Cones, signs, arrow boards, and flaggers are not optional. High-visibility vests (ANSI Class 2 minimum for most roadwork, Class 3 near active lanes) must be worn at all times. Never turn your back to traffic.',
        ],
        keyPoints: [
          'Aerial: hard hat, fall protection, minimum approach distance from power lines — call utility if in doubt',
          'Manholes are permit-required confined spaces: 4-gas test before entry, attendant outside, continuous ventilation',
          'Roadway work: MUTCD traffic control, ANSI Class 2/3 hi-viz vest required',
          'Three hazard zones: aerial, underground/confined space, roadway — each has specific rules',
        ],
        quiz: [
          {
            q: 'Before entering a manhole, the atmosphere must be tested for:',
            a: ['Oxygen level, combustible gases, and toxic gases (CO, H2S) using a calibrated 4-gas meter', 'Only oxygen level using a simple O2 detector', 'CO only — the most common manhole hazard', 'No test is required if the manhole was last opened recently'],
            correct: 0,
            exp: 'Four-gas meters test for oxygen deficiency/enrichment, combustible gases (LEL), CO, and H2S. All four can be present in manholes from sewer gas, fuel spills, or decomposing organic matter.',
          },
          {
            q: 'While working near a power line that shares a utility pole, you cannot maintain the required minimum approach distance. You should:',
            a: ['Call the utility before climbing — do not proceed until the power line is de-energized or the utility establishes the safe approach', 'Proceed if you are wearing rubber gloves rated for the voltage', 'Work as quickly as possible to minimize exposure time', 'The rule only applies to linemen — telecom workers may proceed with standard PPE'],
            correct: 0,
            exp: 'Telecom techs do not work on power lines. If the minimum approach distance cannot be maintained, call the utility. They will de-energize the circuit or provide a line worker to hold the work boundary.',
          },
          {
            q: 'OSHA classifies manholes as:',
            a: ['Permit-required confined spaces — requiring atmospheric testing, attendant, entry permit, and rescue plan', 'Non-permit confined spaces that require only a buddy system', 'General industry spaces requiring only hard hats and safety glasses', 'Restricted access spaces with no specific OSHA classification'],
            correct: 0,
            exp: 'Manholes meet the OSHA definition of permit-required confined spaces: limited entry/exit, not designed for continuous occupancy, and containing potential hazards. Full permit procedures apply.',
          },
        ],
      },
    ],
    test: [
      { q: 'Outside plant (OSP) refers to:', a: ['Cables, closures, and distribution equipment located outside buildings', 'Equipment inside central offices', 'Only aerial cabling on utility poles', 'Administrative planning for network builds'], correct: 0, exp: 'OSP covers all infrastructure outside buildings: aerial, underground, vaults, closures, remote terminals, and cell sites.' },
      { q: 'Major OSP contractors include:', a: ['MasTec, Dycom, and Black Box — companies that build for carriers', 'Only the carriers themselves', 'Equipment manufacturers like Corning and CommScope', 'Government agencies managing BEAD funding'], correct: 0, exp: 'OSP contractors build and maintain network infrastructure under contract for carriers and tower companies.' },
      { q: 'Federal programs like BEAD are primarily funding:', a: ['Rural fiber broadband expansion, creating large OSP labor demand through 2030', 'Urban 5G small cell densification only', 'Copper plant upgrades in existing networks', 'Central office equipment modernization'], correct: 0, exp: 'BEAD and RDOF are funding billions in rural broadband expansion, creating sustained OSP demand for fiber splicing and construction skills.' },
      { q: 'An OSP splicer verifies each splice using:', a: ['An OTDR to measure insertion loss and detect reflections', 'A multimeter for continuity only', 'A visual fault locator for pass/fail', 'Visual inspection of the splice under a microscope'], correct: 0, exp: 'OTDR verification is standard practice — it measures splice loss in dB and provides a permanent trace as the splice record.' },
      { q: 'Before entering a manhole, the safe oxygen range is:', a: ['19.5% to 23.5%', '15% to 25%', 'Any reading above 18%', 'Below 25% only'], correct: 0, exp: 'OSHA defines oxygen-deficient atmosphere as below 19.5% and oxygen-enriched as above 23.5%. Both are hazardous — the safe range is between 19.5% and 23.5%.' },
      { q: 'Manholes are classified as:', a: ['Permit-required confined spaces under OSHA 29 CFR 1910.146', 'Non-permit confined spaces', 'Restricted access areas with buddy-system requirements only', 'General industry work areas with no special classification'], correct: 0, exp: 'Manholes are permit-required confined spaces, requiring atmospheric testing, an attendant, an entry permit, and a rescue plan.' },
      { q: 'When working near a power line on a shared pole that is too close to maintain the approach distance, you should:', a: ['Call the utility before climbing', 'Proceed wearing rubber gloves', 'Work quickly to minimize exposure', 'Proceed if the voltage is below 15 kV'], correct: 0, exp: 'If minimum approach distance cannot be maintained, do not climb. Call the utility to de-energize or provide safety coverage.' },
      { q: 'Roadway work requires high-visibility vests rated at minimum:', a: ['ANSI Class 2 for most roadwork, Class 3 near active traffic lanes', 'Any reflective vest regardless of ANSI rating', 'ANSI Class 1 is sufficient for all telecom work', 'No vest requirement if the work is on the shoulder'], correct: 0, exp: 'ANSI Class 2 is the minimum for most roadway work. Class 3 (full body coverage) is required near active traffic lanes.' },
      { q: 'A full OSP technician, compared to a fiber-only technician, additionally works on:', a: ['Copper plant, DMARC extensions, structured cabling, and cell site power', 'Only larger-diameter fiber cables', 'Underground plant exclusively', 'The same work — both titles are interchangeable'], correct: 0, exp: 'Full OSP techs have skills in copper, DMARC, structured cabling, and cell site power — expanding employment options significantly.' },
      { q: 'Entry-level OSP technician pay is approximately:', a: ['$45,000–$55,000/year, rising to $65,000–$85,000+ with splicing and test skills', '$25,000–$35,000/year with slow advancement', '$90,000+ at entry level due to the labor shortage', '$35,000–$45,000 with no advancement above $60,000'], correct: 0, exp: 'Entry-level OSP pays $45–55K. Experienced techs with splicing and OTDR skills earn $65–85K+. The labor shortage is pushing these numbers upward.' },
    ],
  },

  {
    id: 'tel-fiber-fundamentals',
    num: 2,
    title: 'Fiber Optic Fundamentals',
    desc: 'How light carries data through glass — single-mode vs multi-mode, wavelengths, dB budgets, and the physics OSP techs need to troubleshoot intelligently.',
    slides: [
      {
        title: 'How Fiber Optic Cable Works',
        body: [
          'Fiber optic cable transmits data as pulses of light through a thin glass or plastic core. The core is surrounded by cladding — a second layer of glass with a slightly lower refractive index. This difference in refractive index creates total internal reflection: light that enters at the right angle bounces continuously along the core without escaping into the cladding. The core-cladding interface acts as a mirror that never degrades.',
          'The core diameter determines the fiber type. Single-mode fiber (SMF) has a core diameter of approximately 9 micrometers — small enough that only one propagation mode (light path) can exist, eliminating modal dispersion and allowing transmission over very long distances (tens of kilometers). Multi-mode fiber (MMF) has a core of 50 or 62.5 micrometers — large enough for multiple light paths, which causes modal dispersion and limits distance to roughly 2 km for OM3/OM4 at 10 Gb/s.',
          'Common wavelengths in telecom: 1310 nm (O-band) and 1550 nm (C-band) are the workhorses of single-mode OSP networks. 1310 nm has lower dispersion; 1550 nm has lower attenuation and is preferred for long-haul runs. Multi-mode uses 850 nm (VCSEL-based transceivers). CWDM and DWDM systems multiplex dozens of wavelengths onto a single fiber — each wavelength is a separate channel carrying its own data stream.',
          'Attenuation (signal loss) is measured in decibels per kilometer (dB/km). Single-mode at 1310 nm: ~0.35 dB/km. Single-mode at 1550 nm: ~0.20 dB/km. Multi-mode at 850 nm: ~3.5 dB/km. Every connector, splice, and bend radius violation adds loss on top of the cable baseline. The loss budget determines the maximum distance a signal can travel before it is too weak to detect.',
        ],
        keyPoints: [
          'Total internal reflection: light stays in the core because cladding has a lower refractive index',
          'SMF: 9 µm core, one mode, long distance (tens of km); MMF: 50/62.5 µm, multiple modes, ~2 km limit',
          'Key wavelengths: 1310 nm (O-band), 1550 nm (C-band) for SMF; 850 nm for MMF',
          'Attenuation: SMF ~0.20–0.35 dB/km; loss budget = maximum distance before signal is too weak',
        ],
        quiz: [
          {
            q: 'Why does light stay inside a fiber optic core instead of escaping through the sides?',
            a: ['Total internal reflection — the cladding has a lower refractive index, causing light at the right angle to bounce back into the core', 'The core is coated with a reflective metallic layer', 'The glass core absorbs the light and re-emits it forward', 'The tight bend radius forces light to travel in a straight path'],
            correct: 0,
            exp: 'Total internal reflection occurs at the core-cladding interface because the cladding has a slightly lower refractive index. Light entering within the acceptance angle bounces along the core without escaping.',
          },
          {
            q: 'Single-mode fiber has a core diameter of approximately:',
            a: ['9 micrometers — small enough for only one propagation mode', '50 micrometers — the standard multi-mode core size', '125 micrometers — the outer cladding diameter', '250 micrometers — including the protective coating'],
            correct: 0,
            exp: 'SMF core diameter is ~9 µm. (Note: the total fiber diameter including cladding is 125 µm for both SMF and MMF — a common point of confusion.)',
          },
          {
            q: 'Single-mode fiber at 1550 nm has lower attenuation than at 1310 nm. This makes 1550 nm preferred for:',
            a: ['Long-haul fiber runs where minimizing signal loss per kilometer is critical', 'Short-distance campus links where dispersion matters most', 'Multi-mode applications requiring high LED power', 'Any application — 1550 nm is always the better choice'],
            correct: 0,
            exp: '1550 nm (C-band) attenuation of ~0.20 dB/km vs 1310 nm at ~0.35 dB/km makes it preferred for long-haul. 1310 nm has lower chromatic dispersion, making it preferred for shorter metro distances.',
          },
        ],
      },
      {
        title: 'Fiber Cable Construction and Types',
        body: [
          'A fiber optic cable contains one or more individual fibers, each protected by a buffer coating. Cables are constructed for specific environments. Loose-tube cables contain fibers loosely inside a gel-filled or dry tube that protects against mechanical stress and moisture — the standard for OSP applications. Tight-buffered cables have a thick plastic jacket directly over each fiber — common inside buildings. Ribbon cables organize fibers in flat, mass-fusion-ready arrays of 12 or 24 — standard in high-fiber-count OSP builds where mass fusion splicing accelerates deployment.',
          'Fiber count in OSP cable: older distribution cables may have 12–48 fibers. Modern fiber-to-the-home (FTTH) feeders run 96, 144, 288, or 432 fibers. Large backbone cables can have 1,728 fibers or more. Color coding identifies fibers within a cable: the TIA-598 standard assigns 12 colors per tube or ribbon (blue, orange, green, brown, slate, white, red, black, yellow, violet, rose, aqua), cycling through multiple tubes with thread markers to differentiate.',
          'OSP cable jacket types: direct-buried (DB) cables have a corrugated steel armor layer for rodent protection and ground pressure resistance. Aerial cables (ADSS — All-Dielectric Self-Supporting) are designed to span poles without a messenger wire, using fiberglass strength members. Lashed cables are attached to a separate messenger wire strung between poles. Innerduct cables are designed to be pulled through conduit with a slick outer jacket.',
          'Bend radius is critical: fiber breaks if bent too tightly. The minimum bend radius under tension (installation) is typically 20x the cable outside diameter. The minimum bend radius at rest (permanent installation) is 10x the outside diameter. Violating bend radius causes microbends — tiny distortions in the core that cause signal loss. Macrobends (tight loops) cause immediate and visible signal loss.',
        ],
        keyPoints: [
          'Loose-tube (gel or dry): standard for OSP; tight-buffered: inside buildings; ribbon: mass fusion in high-count builds',
          'TIA-598 color code: 12 colors per tube, cycling with thread markers for multi-tube identification',
          'Cable types: direct-buried (armored), ADSS aerial (self-supporting), lashed aerial, innerduct',
          'Bend radius: 20x OD under tension, 10x OD at rest — violations cause microbend loss',
        ],
        quiz: [
          {
            q: 'Loose-tube cable construction is preferred for OSP because:',
            a: ['Fibers float in gel or dry fill inside the tube, isolating them from mechanical stress and moisture ingress', 'The tight jacket makes pulling easier through conduit', 'It is lighter than tight-buffered construction for aerial applications', 'The loose construction allows easy re-entry without cutting the fibers'],
            correct: 0,
            exp: 'Loose-tube construction decouples the fibers from the outer jacket. The gel or dry fill prevents water migration and protects fibers from the stretching and bending forces applied to the cable jacket.',
          },
          {
            q: 'TIA-598 assigns 12 colors per tube in fiber cable. After the 12th fiber (aqua), the next tube begins with:',
            a: ['Blue again — with a thread or stripe on the tube to differentiate it from tube 1', 'A special 13th color unique to the second tube', 'The same 12 colors in reverse order', 'An uncolored (clear) fiber as position 1 of the new tube'],
            correct: 0,
            exp: 'The 12 TIA-598 colors cycle and repeat. Tubes beyond the first are differentiated by thread colors, stripes, or tube color variations — not by a different fiber color sequence.',
          },
          {
            q: 'A tight loop formed when securing excess fiber in a splice enclosure causes:',
            a: ['A macrobend — immediate, measurable signal loss visible on an OTDR trace', 'No measurable effect if the loop diameter exceeds 2 inches', 'Only temporary loss that recovers when the fiber straightens', 'Physical damage to the cladding but no optical loss'],
            correct: 0,
            exp: 'Tight loops (macrobends) allow light to escape the core where the bend angle exceeds the total internal reflection condition. The OTDR shows this as a step loss at the bend location.',
          },
        ],
      },
      {
        title: 'The Decibel and Loss Budgets',
        body: [
          'The decibel (dB) is the unit of optical power ratio used throughout fiber optic work. It is logarithmic: 3 dB represents half the power; 10 dB represents one-tenth the power; 20 dB represents one-hundredth the power. Loss is additive in dB: 0.1 dB per splice + 0.35 dB/km over 5 km = 1.85 dB from cable alone, before adding connector losses.',
          'Every passive element in a fiber link adds loss: connector pair (mated connectors): 0.3–0.75 dB typical for field-terminated connectors, 0.1–0.3 dB for factory-polished connectors. Fusion splice: 0.02–0.10 dB good fusion splice, 0.10–0.30 dB acceptable. Mechanical splice: 0.1–0.5 dB. Fiber cable attenuation: 0.35 dB/km at 1310 nm, 0.20 dB/km at 1550 nm for SMF.',
          'A loss budget calculation: the transmitter power minus the receiver sensitivity gives the total available loss margin. From that margin, subtract all passive losses (cable, connectors, splices) to determine the system margin. If the margin is positive, the link will work. If negative, the link will not. Example: transmitter power -3 dBm, receiver sensitivity -25 dBm, available budget = 22 dB. 5 km at 0.35 dB/km = 1.75 dB. Four connector pairs at 0.3 dB = 1.2 dB. Six splices at 0.05 dB = 0.3 dB. Total loss = 3.25 dB. Margin = 22 - 3.25 = 18.75 dB — this link works with plenty of margin.',
          'As an OSP tech, you use a power meter and light source (optical loss test set / OLTS) to measure actual end-to-end loss and compare against the loss budget. If measured loss exceeds the budget, you have a problem: a bad splice, a dirty connector, a macrobend, or a damaged section. The OTDR then locates where in the link the excess loss occurs.',
        ],
        images: [
          { src: '/diagrams/fiber-loss-budget-decibels.svg', alt: 'Diagram of the decibel logarithmic scale, typical fusion splice, connector, and cable losses, and a worked loss budget calculation showing available budget minus total losses equals margin', caption: 'Loss is additive in dB — a worked example shows 18.75 dB of margin on a 22 dB budget after subtracting cable, connector, and splice losses.' },
        ],
        keyPoints: [
          '3 dB = half power; 10 dB = one-tenth power; losses are additive in dB',
          'Typical losses: fusion splice 0.02–0.10 dB; connector pair 0.1–0.75 dB; SMF cable 0.20–0.35 dB/km',
          'Loss budget: transmitter power − receiver sensitivity = available budget; subtract all link losses; must be positive',
          'OLTS measures end-to-end loss; OTDR locates where excess loss occurs in the link',
        ],
        quiz: [
          {
            q: 'If a link has an available loss budget of 20 dB and total calculated losses of 7 dB, the system margin is:',
            a: ['13 dB — the link will work with comfortable margin to spare', 'Negative — the link will not operate', '7 dB — the margin equals the losses', '20 dB — the budget is the margin'],
            correct: 0,
            exp: 'System margin = available budget − calculated losses = 20 − 7 = 13 dB. Positive margin means the link will operate. More margin means more tolerance for degradation over time.',
          },
          {
            q: 'A good fusion splice typically adds how much loss to a fiber link?',
            a: ['0.02–0.10 dB per splice', '0.50–1.00 dB per splice', '0.30–0.75 dB per splice (same as a connector pair)', 'Zero loss — a perfect fusion splice is optically transparent'],
            correct: 0,
            exp: 'Quality fusion splices target less than 0.05 dB. The industry-acceptable maximum is typically 0.10–0.15 dB. Splices above 0.30 dB should be redone.',
          },
          {
            q: 'An OLTS (Optical Loss Test Set) is used to:',
            a: ['Measure total end-to-end optical loss and compare against the link\'s loss budget', 'Locate the exact position of a splice or break in the fiber', 'Inspect connector end-face geometry and cleanliness', 'Generate a wavelength-divided signal for DWDM testing'],
            correct: 0,
            exp: 'The OLTS measures end-to-end insertion loss in dB. It does not locate where loss occurs — that is the OTDR\'s job. Both instruments are routinely used together to characterize a fiber link.',
          },
        ],
      },
    ],
    test: [
      { q: 'Total internal reflection in fiber optic cable occurs because:', a: ['The cladding has a lower refractive index than the core, reflecting light back inward', 'The core is made of a metallic alloy that reflects light', 'The fiber is perfectly straight, preventing light from escaping', 'A reflective coating is applied to the cladding outer surface'], correct: 0, exp: 'The refractive index difference between core and cladding causes total internal reflection, keeping light within the core.' },
      { q: 'Single-mode fiber core diameter is approximately:', a: ['9 micrometers', '50 micrometers', '125 micrometers', '250 micrometers'], correct: 0, exp: 'SMF core is ~9 µm. MMF cores are 50 or 62.5 µm. The 125 µm dimension is the total cladding diameter, shared by both types.' },
      { q: 'Single-mode fiber is preferred for long-distance OSP runs because:', a: ['Only one propagation mode exists, eliminating modal dispersion and allowing tens of kilometers of reach', 'It is less expensive than multi-mode for long runs', 'Its 50 µm core accepts more light, improving sensitivity', 'CWDM systems require the larger core diameter of SMF'], correct: 0, exp: 'Single-mode fiber eliminates modal dispersion, allowing signal transmission over tens of kilometers versus ~2 km for MMF at high data rates.' },
      { q: 'The preferred wavelength for long-haul SMF networks is:', a: ['1550 nm — lower attenuation (0.20 dB/km) than 1310 nm', '850 nm — lower cost VCSELs at this wavelength', '1310 nm — always lower loss than other wavelengths', '1625 nm — used for all carrier OSP applications'], correct: 0, exp: '1550 nm has the lowest attenuation in single-mode fiber (~0.20 dB/km), making it preferred for long-haul. 1310 nm has lower dispersion for shorter metro distances.' },
      { q: 'Loose-tube cable construction is standard for OSP because:', a: ['It decouples fibers from the jacket, protecting against mechanical stress and moisture', 'It is lighter than tight-buffered construction', 'The loose design allows easier field re-entry', 'It is cheaper to manufacture than ribbon cable'], correct: 0, exp: 'Loose-tube construction allows the fibers to move independently of the outer jacket, protecting them from tension, compression, and moisture.' },
      { q: 'The minimum bend radius for fiber at rest (permanent installation) is:', a: ['10 times the cable outside diameter', '20 times the cable outside diameter', '5 times the cable outside diameter', '2 inches regardless of cable diameter'], correct: 0, exp: '10x OD is the minimum at rest; 20x OD under tension (pulling). Violating bend radius causes microbend loss or fiber breakage.' },
      { q: '3 dB of optical loss represents:', a: ['Half the optical power — a 50% reduction', 'One-tenth the optical power', 'One-hundredth the optical power', 'A negligible loss — 3 dB is below the measurement threshold'], correct: 0, exp: '3 dB = half power. 10 dB = one-tenth power. This logarithmic scale means losses add arithmetically in dB.' },
      { q: 'A quality fusion splice target loss is:', a: ['Less than 0.05 dB, with 0.10 dB as the acceptable maximum', '0.30–0.75 dB — the same as a connector pair', 'Zero dB — any measurable loss means the splice must be redone', '0.5 dB — the TIA-568 standard for all splices'], correct: 0, exp: 'Fusion splices targeting <0.05 dB are achievable with a quality splicer. 0.10–0.15 dB is the common field acceptance limit. Above 0.30 dB is typically unacceptable.' },
      { q: 'A positive system margin in a loss budget calculation means:', a: ['The link will work — available power exceeds total link losses', 'The link is at the exact threshold of operation', 'The transmitter power exceeds the receiver sensitivity directly', 'The link needs amplification'], correct: 0, exp: 'Positive margin = available budget − total losses > 0. The link will operate, with margin proportional to tolerance for future degradation.' },
      { q: 'An OTDR (Optical Time Domain Reflectometer) is used to:', a: ['Locate the position of splices, connectors, bends, and breaks along a fiber link', 'Measure total end-to-end loss only', 'Inspect connector end-face cleanliness', 'Generate test signals for bit error rate testing'], correct: 0, exp: 'The OTDR sends pulses of light and measures backscatter as a function of time, displaying a trace showing loss events and their distance from the launch point.' },
    ],
  },

  {
    id: 'tel-fusion-splicing',
    num: 3,
    title: 'Fusion Splicing',
    desc: 'Fusion splicer operation, fiber preparation, splice quality factors, enclosure management, and OTDR verification — the core skill of the OSP splicer.',
    slides: [
      {
        title: 'The Fusion Splicer and the Splice Process',
        body: [
          'A fusion splicer permanently joins two fiber ends by melting them together with an electric arc. The result is a continuous glass joint with optical loss typically below 0.05 dB — far better than any mechanical connector. Fusion splicing is the standard method for long-haul OSP joins, aerial closures, and any splice that will be permanent and inaccessible for years.',
          'The splice process, step by step: (1) Strip the outer jacket and buffer from the fiber end using appropriate tools for the cable type. For loose-tube gel cable, clean the gel from the fibers using isopropyl alcohol (IPA) wipes before proceeding. (2) Strip the colored coating from the last 30–40mm of each fiber using a mechanical or thermal stripper. (3) Clean the bare glass with a fresh IPA wipe. (4) Cleave each fiber end using a precision cleaver — the cleave angle must be less than 1° for a quality splice. (5) Place each fiber in the splicer\'s v-grooves, aligned by the splicer\'s imaging system. (6) The splicer fires a pre-fusion arc to clean the end faces, then a main arc to fuse the fibers. (7) Review the estimated loss shown on the splicer\'s screen. (8) Conduct a proof test (the splicer gently pulls the splice) to verify mechanical strength.',
          'Cleave quality is the single most important factor in splice quality. A poor cleave — one with a lip, hackle, or excessive angle — cannot be fused into a low-loss splice regardless of how good the splicer is. Inspect cleaves under the splicer\'s camera before initiating the arc. Discard and re-cleave any fiber with a visible defect. Cleaver blades have a finite life — most blade wheels have 16 positions, each rated for a certain number of cleaves (typically 3,000–6,000 per position). Dull blades produce poor cleaves.',
        ],
        keyPoints: [
          'Fusion splice: fibers melted together by electric arc — <0.05 dB loss, permanent, the OSP standard',
          'Process: strip jacket → clean gel → strip coating → clean bare glass → cleave → load splicer → arc → proof test',
          'Cleave quality is the most critical variable — discard any cleave with lip, hackle, or angle >1°',
          'Cleaver blades have finite life — advance or replace the blade per the manufacturer\'s cycle count',
        ],
        quiz: [
          {
            q: 'What is the single most important factor determining fusion splice quality?',
            a: ['Cleave quality — the end-face angle and surface quality before the arc fires', 'The arc current setting on the fusion splicer', 'The brand of isopropyl alcohol used to clean the fiber', 'The ambient temperature at the time of splicing'],
            correct: 0,
            exp: 'A flat, perpendicular cleave with no surface defects is the prerequisite for a good splice. No splicer can compensate for a bad cleave — re-cleave any fiber with visible defects.',
          },
          {
            q: 'When preparing loose-tube gel-filled cable for splicing, gel must be removed before stripping the fiber coating because:',
            a: ['Gel residue on the fiber surface prevents the IPA clean from reaching the glass, causing contamination at the splice', 'Gel is flammable and creates a fire risk at the splicer arc', 'Gel adds stiffness that prevents the fiber from seating in the v-grooves', 'This step is optional — modern splicers can splice through gel contamination'],
            correct: 0,
            exp: 'Gel must be cleaned off before stripping the coating. If gel reaches the bare glass, the IPA wipe cannot clean it effectively and the end face will be contaminated, causing a high-loss splice.',
          },
          {
            q: 'A proof test after fusion splicing serves to:',
            a: ['Verify the mechanical strength of the splice — a weak splice that would fail in the enclosure breaks during the controlled proof test', 'Measure the optical loss of the splice precisely', 'Remove any residual gel contamination from the fused area', 'Confirm the splicer\'s arc settings were appropriate'],
            correct: 0,
            exp: 'The proof test applies a controlled tensile force to the splice. A splice that passes shows adequate mechanical strength for installation in the enclosure. A splice that fails during the controlled test would have failed in service.',
          },
        ],
      },
      {
        title: 'Splice Enclosures and Fiber Management',
        body: [
          'The splice enclosure (or splice closure) protects the spliced fibers from the environment: moisture, UV, mechanical stress, and temperature extremes. Enclosures are used in manholes, handholes, on poles (aerial), in vaults, and buried directly. The correct enclosure type must be matched to the environment.',
          'Inside the enclosure, fibers are managed in splice trays. Each tray holds a specific number of splices and stores the excess fiber length (fiber slack) in a coil. The coil must follow the minimum bend radius — typically a 30mm loop minimum for the bare 250µm fiber inside a tray. Excess fiber stored as tight loops (violating bend radius) causes macrobend loss, which appears as a step loss on the OTDR trace.',
          'Splice trays use color coding and labeling to identify fibers. The cable\'s fiber color order (TIA-598) is preserved through the enclosure: tube 1, fiber 1 (blue) splices to tube 1, fiber 1 of the through cable. This maintains the cable\'s addressing throughout the network. Any deviation must be documented in the splice record.',
          'Enclosure entry is critical for environmental sealing. All unused cable entry ports must be plugged or sealed. Cable entries are sealed with heat-shrink, gel-filled ports, or mechanical seals depending on the enclosure type. Aerial enclosures must be re-sealed completely each time they are opened. A failed seal allows moisture ingress, which causes fiber attenuation and connector contamination that increases exponentially as the water wicks along the fiber.',
        ],
        keyPoints: [
          'Enclosure type must match environment: manhole, aerial, buried, handhole — each has different sealing requirements',
          'Fiber trays: coil excess fiber in minimum-radius loops — tight coils cause macrobend loss visible on OTDR',
          'Preserve TIA-598 color order through enclosures — deviations must be documented in splice records',
          'Seal all unused ports — moisture ingress causes progressive attenuation that wicks along the fiber',
        ],
        quiz: [
          {
            q: 'After completing splices in a splice enclosure, you notice an unused cable port that has not been plugged. You should:',
            a: ['Seal it before closing the enclosure — open ports allow moisture ingress that degrades fibers over time', 'Leave it open — unused ports are vented to prevent condensation', 'Plug it only if the enclosure is installed underground', 'Note it in the splice record — sealing is done by a separate crew'],
            correct: 0,
            exp: 'All unused ports must be sealed before closing any splice enclosure. Moisture ingress is the primary long-term cause of fiber degradation in OSP closures.',
          },
          {
            q: 'Excess fiber stored in a splice tray with too-tight coils will show on the OTDR as:',
            a: ['A step loss (macrobend loss) at the location of the tight coil', 'A positive reflection (gainer) — tight coils amplify backscatter', 'No measurable effect — fiber is flexible enough to coil tightly', 'A break event — the splicer sees it as a physical discontinuity'],
            correct: 0,
            exp: 'Tight coils violate minimum bend radius and cause macrobend loss — light escapes the core at each bend. The OTDR shows this as a step increase in loss at the enclosure location.',
          },
          {
            q: 'The TIA-598 color order of fibers in a cable must be preserved through splice enclosures because:',
            a: ['The color sequence is the fiber\'s address throughout the network — deviations create confusion and errors when future techs need to trace circuits', 'The splicer automatically detects and enforces color order', 'Only the tube colors matter — individual fiber colors are not tracked at the network level', 'Deviations are acceptable if documented in the splice record only after 24 hours'],
            correct: 0,
            exp: 'Color order is the fiber\'s address. Technicians use it to identify specific circuits. Unpreserved or undocumented deviations cause misidentification and wrong-fiber cuts during future work.',
          },
        ],
      },
      {
        title: 'OTDR Operation and Trace Interpretation',
        body: [
          'An Optical Time Domain Reflectometer (OTDR) sends short pulses of laser light into the fiber and measures the Rayleigh backscatter returning to the instrument as a function of time. Since light travels at a known speed through glass (~2×10⁸ m/s in fiber), time can be converted to distance. The OTDR trace shows optical power (dB) on the vertical axis and distance along the fiber on the horizontal axis.',
          'A typical OTDR trace shows: a launch event at the beginning (strong reflection from the connection to the OTDR); a gradual negative slope representing the cable\'s inherent attenuation (should be linear and consistent); small step losses at each splice; reflective spikes at each connector pair (Fresnel reflection); and a large reflection at the fiber end (end-face reflection or connector reflection). A break or bad splice appears as a sudden step loss. A macrobend appears as a step loss without a reflection.',
          'Key OTDR settings: wavelength (must match the operating wavelength — 1310 nm or 1550 nm for SMF), pulse width (wider pulses provide more range but reduce spatial resolution — for short links use narrow pulses), range (set to slightly beyond the expected link length), and averaging time (more averaging improves signal-to-noise but takes longer). Most modern OTDRs have automatic settings that work for initial characterization.',
          'Bidirectional OTDR measurement: splice loss measured from one end will differ slightly from the same splice measured from the other end, due to fiber geometry differences at the splice interface. The accepted splice loss is the average of both directions. For acceptance testing, bidirectional measurement is required by TIA-526-7. Modern OTDR software can compute the bidirectional average automatically when traces from both ends are provided.',
        ],
        images: [
          { src: '/diagrams/otdr-trace-interpretation.svg', alt: 'Diagram of an OTDR trace showing the launch event, cable attenuation slope, splice step losses without reflection, connector spike-plus-step signatures, and fiber end reflection, plus the bidirectional measurement requirement', caption: 'A step with no reflection means glass-to-glass (splice or macrobend); a spike plus step means a physical gap (connector or break).' },
        ],
        keyPoints: [
          'OTDR sends laser pulses, measures backscatter vs distance — shows attenuation, splices, connectors, breaks along the link',
          'Trace elements: launch event, slope (cable loss), step losses (splices), reflections (connectors), end-face',
          'Settings: wavelength, pulse width (resolution vs range tradeoff), range, averaging time',
          'Bidirectional measurement required for acceptance — average both directions for true splice loss',
        ],
        quiz: [
          {
            q: 'On an OTDR trace, a large reflective spike followed by a step loss at a specific location most likely indicates:',
            a: ['A connector pair — connectors cause Fresnel reflections and insertion loss', 'A fusion splice — fusion splices always cause strong Fresnel reflections', 'A macrobend — tight bends cause both reflection and loss', 'The fiber end — all end points show this signature'],
            correct: 0,
            exp: 'Fresnel reflections (spikes) occur at physical gaps between glass surfaces — characteristic of connectors and physical breaks. Fusion splices are glass-to-glass and produce minimal reflection, only loss.',
          },
          {
            q: 'A step loss on the OTDR trace with no accompanying reflection most likely indicates:',
            a: ['A fusion splice or macrobend — glass-to-glass contact or a bend do not create Fresnel reflections', 'A connector pair — connectors always produce both reflection and loss', 'A fiber break — breaks always show a large end-face reflection', 'Normal cable attenuation — this is expected along every link'],
            correct: 0,
            exp: 'Step loss without reflection = glass-to-glass contact (fusion splice) or a macrobend. Connectors produce reflections; breaks produce large end reflections. Linear cable attenuation appears as a continuous slope, not a step.',
          },
          {
            q: 'Why is bidirectional OTDR measurement required for splice acceptance testing?',
            a: ['Splice loss measured from each end differs due to fiber geometry — the true loss is the average of both directions', 'Single-direction OTDR cannot measure splices — it can only detect connectors', 'Bidirectional testing is required to detect macrobends that are invisible from one end', 'It is not required — bidirectional testing is only done for fault location, not acceptance'],
            correct: 0,
            exp: 'Fiber geometry differences at the splice interface cause the apparent loss to differ depending on which direction the OTDR pulse travels. TIA-526-7 requires bidirectional measurement with the averaged result as the accepted splice loss.',
          },
        ],
      },
    ],
    test: [
      { q: 'Fusion splicing joins two fiber ends by:', a: ['Melting them together with an electric arc, creating a glass-to-glass joint', 'Mechanically aligning them in a precision sleeve with index-matching gel', 'Bonding them with a UV-cured adhesive', 'Clamping them with a precision connector body'], correct: 0, exp: 'Fusion splicing uses an electric arc to melt and fuse the two glass end-faces, creating a single continuous fiber.' },
      { q: 'The most critical step determining fusion splice quality is:', a: ['Cleave quality — a flat, perpendicular end-face with no defects', 'Arc current calibration on the fusion splicer', 'IPA concentration used for cleaning', 'Ambient temperature during splicing'], correct: 0, exp: 'A quality cleave is the prerequisite for a quality splice. No splicer can fix a bad cleave — re-cleave any defective end.' },
      { q: 'Before stripping the fiber coating on loose-tube gel cable, you must first:', a: ['Remove the gel from the fiber using IPA wipes', 'Strip the cable jacket only — gel will not affect the coating stripper', 'Apply heat to liquify the gel before wiping', 'Pre-cleave the fiber through the gel to expose a clean surface'], correct: 0, exp: 'Gel on the bare fiber will prevent the IPA clean from reaching the glass. Remove gel with IPA wipes before stripping the colored coating.' },
      { q: 'A good fusion splice typically achieves insertion loss of:', a: ['Less than 0.05 dB', '0.30–0.75 dB', '0.10–0.50 dB', 'Exactly 0.00 dB — a perfect glass joint'], correct: 0, exp: 'Quality fusion splices target <0.05 dB. The acceptable field limit is typically ≤0.10 dB. Splices above 0.30 dB should be redone.' },
      { q: 'The proof test after splicing verifies:', a: ['Mechanical strength — a weak splice that would fail in the enclosure breaks during the controlled test', 'Optical loss — the test measures dB per the splicer estimate', 'End-face cleanliness — the test pulls any gel residue off the glass', 'Arc calibration — the pull force confirms arc power was correct'], correct: 0, exp: 'The proof test applies controlled tensile load to confirm the splice will survive handling and installation in the enclosure.' },
      { q: 'Excess fiber coiled too tightly in a splice tray causes:', a: ['Macrobend loss — visible as a step loss on the OTDR at the enclosure location', 'No measurable effect — fiber tolerates tight coils', 'A break — fiber snaps immediately at tight radius', 'Fresnel reflection — the bend creates a glass-air interface'], correct: 0, exp: 'Macrobends exceed the minimum bend radius, allowing light to escape the core. The OTDR shows this as a step loss at the enclosure.' },
      { q: 'All unused ports in a splice enclosure must be:', a: ['Sealed before closing — open ports allow moisture ingress', 'Left open for pressure equalization', 'Labeled for future use without sealing', 'Sealed only if the closure is installed underground'], correct: 0, exp: 'Moisture is the primary long-term cause of fiber degradation in closures. All unused ports must be sealed regardless of installation environment.' },
      { q: 'On an OTDR trace, a Fresnel reflection (spike) at a distance point indicates:', a: ['A connector pair or physical gap between glass surfaces', 'A fusion splice — all splices produce Fresnel reflections', 'Normal cable attenuation at that point', 'An OTDR measurement artifact from the pulse width setting'], correct: 0, exp: 'Fresnel reflections occur at glass-air interfaces. Connectors create these interfaces; fusion splices (glass-to-glass) do not.' },
      { q: 'TIA-598 fiber color order must be preserved through splice enclosures because:', a: ['Color is the fiber\'s network address — unpreserved deviations cause identification errors during future work', 'The splicer will not operate if color order is not maintained', 'Color sequence is required by OSHA for OSP work', 'It is optional — any splice order is acceptable if documented'], correct: 0, exp: 'Fiber color sequence is the primary identification system for tracking circuits through the network. Deviations cause misidentification and wrong-fiber cuts.' },
      { q: 'Bidirectional OTDR measurement is required for splice acceptance because:', a: ['Apparent splice loss differs by direction due to fiber geometry — the true value is the average of both', 'Single-direction OTDRs cannot see splices clearly', 'Bidirectional measurement doubles the spatial resolution', 'It detects macrobends that are invisible from one direction only'], correct: 0, exp: 'Fiber geometry at the splice interface causes directional asymmetry in apparent loss. TIA-526-7 requires bidirectional averaging for the accepted splice loss value.' },
    ],
  },

  {
    id: 'tel-copper-dmarc',
    num: 4,
    title: 'Copper Plant and DMARC Extensions',
    desc: 'Twisted pair fundamentals, TDR fault location, structured cabling hierarchy, 66/110 blocks, and demarcation extensions from the serving telco to customer equipment.',
    slides: [
      {
        title: 'Copper Telecommunications Plant Fundamentals',
        body: [
          'Despite massive fiber deployment, copper twisted pair remains the backbone of the last-mile access network for millions of customers, and all telephone and broadband service requires understanding the copper plant. Twisted pair cancels electromagnetic interference (EMI) — the twist causes each wire in the pair to be equally affected by external interference, so the differential signal remains clean. Tighter twists provide better noise rejection.',
          'The telephone outside plant uses a hierarchical distribution system. The central office (CO) connects to feeder cables — large-count cables (hundreds or thousands of pairs) running to distribution points. At field distribution points (cross-connect closures, pedestals, or interface terminal blocks), feeder pairs split into smaller distribution cables that run to serving area interfaces (SAIs). From SAIs, drop cables run to individual premises. The demarcation point (DMARC) is the boundary between the carrier\'s network and the customer\'s wiring.',
          'Pair identification in copper cable: the TIA-568 color code uses a 5-color tip system (White, Red, Black, Yellow, Violet) and 5-color ring system (Blue, Orange, Green, Brown, Slate), combining to create 25 base pairs. Binder groups of 25 pairs are wrapped with a color-coded binder to allow identification of pairs within large cables (600-pair cables have 24 binder groups).',
          'Common copper tests: TDR (Time Domain Reflectometer) for locating opens, shorts, and impedance changes along the cable; POTS line test for voltage, current, and noise; DSL line testing for loop length, noise, and capacity prediction. A well-maintained copper pair for POTS or DSL requires low resistance, high insulation resistance, balanced capacitance between the two conductors, and no bridged taps.',
        ],
        keyPoints: [
          'Twisted pair cancels EMI differentially — tighter twist = better noise rejection',
          'Hierarchy: CO → feeder cable → SAI → distribution cable → premises drop → DMARC',
          'TIA-568 color code: 5 tip colors × 5 ring colors = 25 pairs per binder group',
          'Copper tests: TDR (locate faults), POTS line test, DSL loop qualification',
        ],
        quiz: [
          {
            q: 'Twisted pair cable cancels electromagnetic interference because:',
            a: ['The twist causes each wire to be equally exposed to the interference, so the differential signal is unaffected', 'The twist creates a magnetic shield around the pair', 'The twist reduces cable capacitance below the interference threshold', 'Twisting increases the conductor resistance, which absorbs interference energy'],
            correct: 0,
            exp: 'Differential signaling on twisted pair relies on both wires receiving the same interference. The receiver rejects the common-mode noise (interference) and amplifies only the differential signal.',
          },
          {
            q: 'The demarcation point (DMARC) in a telephone installation is:',
            a: ['The boundary between the carrier\'s network and the customer\'s inside wiring — the carrier is responsible up to this point', 'The physical location of the central office serving the customer', 'The connection point between the SAI and the distribution cable', 'The customer\'s internal telephone handset'],
            correct: 0,
            exp: 'The DMARC is the regulatory and physical boundary of the carrier\'s responsibility. The carrier owns and maintains the network to the DMARC. The customer owns everything beyond it.',
          },
          {
            q: 'A TDR (Time Domain Reflectometer) is used in copper plant to:',
            a: ['Locate opens, shorts, and impedance changes along the cable by measuring reflected pulses', 'Measure POTS line voltage and identify power cross faults', 'Test DSL throughput on a copper loop', 'Identify which binder group contains a specific pair'],
            correct: 0,
            exp: 'A TDR sends pulses along the conductor and measures reflections. Any impedance change (open, short, water damage, connector, or splice) reflects a pulse, allowing the distance to the fault to be calculated.',
          },
        ],
      },
      {
        title: '66 Blocks, 110 Blocks, and Cross-Connect Frames',
        body: [
          'Cross-connect hardware terminates and interconnects telephone pairs at distribution points. The 66-block (M66) is the legacy telecom standard: four columns of clips (20 rows, 50 rows, or 100 rows per block), where incoming pairs land on one side and outgoing pairs land on the other, with jumper wires cross-connecting them. The center clips on a 50-row block can be connected (bridged) or separated. 66-blocks are still found in central offices, building entrance terminals, and existing copper infrastructure.',
          'The 110-block (Type 110) is the modern standard for structured cabling: pairs are punched down onto wiring blocks using an impact punch tool (110 punch tool), which terminates and trims in one operation. 110-blocks are used in patch panels, IDFs, and MDFs in commercial buildings. The advantage of 110 hardware: more pairs per unit area, better high-frequency performance than 66-block for data applications, and a cleaner, more organized appearance.',
          'The krone block (used in European-origin systems) and the BIX block are two other cross-connect formats encountered in the field. While different physically, all cross-connect systems serve the same purpose: provide a manageable point where pairs can be traced, tested, and rerouted without disturbing cables on either side.',
          'Punchdown tools: the 66-block requires a 66-type punchdown tool; the 110-block requires a 110-type tool. Using the wrong tool damages the terminals. Always verify the block type before selecting the tool. The punchdown tool has two sides: "cut" and "no-cut." The cut side trims the conductor flush after termination. Never use the no-cut side on the final termination — it leaves a wire stub that can cause shorts.',
        ],
        images: [
          { src: '/diagrams/cross-connect-blocks-comparison.svg', alt: 'Diagram comparing 66-block legacy cross-connect hardware with modern 110-block punch-down termination, and a warning that 66-type and 110-type punchdown tools are not interchangeable', caption: '66-block degrades above Category 3; 110-block supports Cat 5e and above — and the punchdown tools that terminate them are never interchangeable.' },
        ],
        keyPoints: [
          '66-block: legacy telecom standard, two-sided cross-connect with jumpers, still common in COs and existing plant',
          '110-block: modern structured cabling standard, punch-down termination, better high-frequency performance',
          'Punchdown tools: 66-type and 110-type are not interchangeable — wrong tool damages terminals',
          'Punchdown tool orientation: use the "cut" side for final terminations — the "no-cut" side leaves stubs',
        ],
        quiz: [
          {
            q: 'When terminating pairs on a 110-block, you should use:',
            a: ['A 110-type punch tool with the cut side toward the terminal — this terminates and trims in one operation', 'A 66-type punch tool, which is compatible with all cross-connect blocks', 'A screwdriver to press the conductor into the IDC contact', 'Either a 66 or 110 tool — both work on 110-blocks with the appropriate adaptor'],
            correct: 0,
            exp: 'A 110-type punch tool is required. Using a 66-type tool damages the 110 IDC contacts. The cut side trims the conductor automatically during termination.',
          },
          {
            q: 'The primary advantage of 110-block over 66-block for data applications is:',
            a: ['Better high-frequency performance — 110-block supports Category 5e and above; 66-block performance degrades above Cat 3 speeds', '110-block is less expensive per pair than 66-block', '66-block cannot be used for telephone pairs — only for data', '110-blocks can be terminated with ring-and-tip jumpers, unlike 66-blocks'],
            correct: 0,
            exp: '66-block high-frequency characteristics degrade above Category 3 (16 MHz). 110-block hardware is designed for Category 5e and higher structured cabling performance.',
          },
          {
            q: 'Using the "no-cut" side of a punchdown tool on a final termination leaves:',
            a: ['A wire stub that can cause shorts with adjacent pairs or contacts', 'A cleaner, flush termination preferred for high-frequency applications', 'A strain relief loop that improves the mechanical connection', 'No difference — the cut side and no-cut side produce identical electrical connections'],
            correct: 0,
            exp: 'The no-cut side terminates the conductor but does not trim it. The excess stub of wire remaining can contact adjacent terminals or pairs, causing shorts or signal degradation.',
          },
        ],
      },
      {
        title: 'DMARC Extensions and Inside Wiring',
        body: [
          'A DMARC extension connects the network interface device (NID) — the carrier\'s demarcation point — to the customer\'s telephone system, PBX, or data equipment. Historically, the carrier\'s responsibility ended at the NID on the outside of the building. A DMARC extension runs from the NID to the customer\'s main distribution frame (MDF) or equipment room inside the building.',
          'DMARC extension work: as an OSP tech, you may be asked to extend the carrier\'s service into a building to a customer-designated point. This involves running cable from the NID (typically on an exterior wall or in the building entrance terminal) through the building to the MDF. The cable must follow fire code requirements for plenum (CMP rated) cable in air-handling spaces and riser (CMR rated) cable between floors. The carrier is typically responsible for the extension, but the extension is installed by a field tech.',
          'Building entrance terminals (BETs): the carrier\'s cables enter the building through a building entrance terminal, which provides a gas-discharge or solid-state protector on each pair. The protector limits voltage surges from lightning or power-line contact from damaging the inside plant or the CO equipment. Always verify protector condition when troubleshooting — a fused protector looks like an open circuit from the inside.',
          'Structured cabling hierarchy for commercial buildings (TIA-568): campus distributor (CD) → building distributor (BD) → floor distributor (FD, also called IDF). Horizontal cable runs from the FD to the work area outlet, maximum 90 meters per TIA-568. The total channel length including patch cords is 100 meters. Runs exceeding this limit cause excessive signal loss and near-end crosstalk (NEXT) problems at Gigabit speeds.',
        ],
        keyPoints: [
          'DMARC extension: runs from the NID/building entrance terminal to the customer\'s MDF inside the building',
          'Fire code: plenum (CMP) cable in air-handling spaces; riser (CMR) between floors',
          'Building entrance protectors (gas-discharge or solid-state) limit lightning/power surge voltage on each pair',
          'TIA-568 horizontal: 90m max cable + 10m patch cords = 100m total channel per run',
        ],
        quiz: [
          {
            q: 'The maximum horizontal cable run in a TIA-568 structured cabling system is:',
            a: ['90 meters of horizontal cable, with a total channel of 100 meters including patch cords', '100 meters of horizontal cable only — patch cords are not counted', '50 meters per run — runs beyond this require a repeater', 'No limit — fiber can be used for any run length in structured cabling'],
            correct: 0,
            exp: 'TIA-568 limits horizontal cable to 90m (from the FD to the work area outlet). The additional 10m allows for patch cords at both ends, for a 100m total channel. Exceeding this causes loss and NEXT issues at Gigabit speeds.',
          },
          {
            q: 'A building entrance protector shows an open circuit on an affected pair during troubleshooting. This most likely indicates:',
            a: ['A fused protector — the gas tube or solid-state device has sacrificed itself protecting against a surge', 'The pair is cut outside the building', 'The pair is open at the CO end', 'The protector is not installed — an open reading at this point is normal'],
            correct: 0,
            exp: 'Building entrance protectors are designed to sacrifice themselves (fuse open) during a surge, protecting the inside plant. A fused protector looks like an open from inside. Replace the protector module to restore service.',
          },
          {
            q: 'Cable run through a building\'s air-handling ceiling plenum must be rated:',
            a: ['CMP (Communications Plenum) — low-smoke, low-flame spread rating for HVAC air-handling spaces', 'CMR (Communications Riser) — any listed cable is acceptable in plenum spaces', 'CM (Communications) — only the connector terminations need plenum rating', 'CMX (Communications Limited) — residential-grade cable is acceptable in commercial plenums'],
            correct: 0,
            exp: 'Plenum spaces (air-handling spaces above drop ceilings, under raised floors used for HVAC) require CMP-rated cable. Regular cable in a plenum generates toxic smoke when burning, which circulates through the ventilation system.',
          },
        ],
      },
    ],
    test: [
      { q: 'Twisted pair cancels electromagnetic interference because:', a: ['Both wires receive the same interference, which is rejected by the differential receiver', 'The twist creates a metallic shield', 'The twist increases conductor resistance, absorbing interference', 'Tighter twists reduce cable capacitance below the interference threshold'], correct: 0, exp: 'Common-mode interference affects both wires equally. The differential receiver amplifies the difference (signal) and rejects the common-mode (noise).' },
      { q: 'The DMARC is:', a: ['The boundary between the carrier\'s network and the customer\'s inside wiring', 'The physical connection at the central office', 'The SAI (serving area interface) in the field', 'The customer\'s telephone handset or modem'], correct: 0, exp: 'The DMARC is the regulatory and physical network boundary. The carrier owns everything up to the DMARC; the customer owns everything beyond it.' },
      { q: 'TIA-568 color code uses how many base pairs per binder group?', a: ['25 pairs (5 tip colors × 5 ring colors)', '12 pairs per group', '50 pairs per binder', '100 pairs — one binder per feeder section'], correct: 0, exp: '5 tip colors × 5 ring colors = 25 base pair combinations per binder group.' },
      { q: 'A TDR measures distance to a fault by:', a: ['Sending a pulse and measuring how long a reflection takes to return — time × velocity = distance', 'Measuring the resistance of the conductor loop', 'Comparing signal strength between two test points', 'Applying voltage and measuring current to calculate loop resistance'], correct: 0, exp: 'TDR (and OTDR for fiber) use the same principle: send a pulse, measure round-trip time to the reflection, divide by two and multiply by signal velocity to get distance.' },
      { q: 'The 110-block is preferred over the 66-block for data applications because:', a: ['110-block supports Category 5e and above; 66-block performance degrades above Cat 3', '110-block is less expensive per pair', '66-block is only certified for voice applications by TIA', '110-block pairs can be tested individually; 66-block cannot'], correct: 0, exp: '110-block hardware maintains performance specifications at high frequencies (Cat 5e and above). 66-block degrades significantly above Category 3 (16 MHz).' },
      { q: 'Using the "no-cut" side of a punchdown tool on a final 110 termination leaves:', a: ['A wire stub that can short adjacent pairs', 'A clean flush termination — same result as the cut side', 'A mechanically superior connection', 'Nothing — the no-cut side does not terminate the conductor'], correct: 0, exp: 'The no-cut side terminates but does not trim the conductor, leaving a stub that can contact adjacent terminals.' },
      { q: 'Cable run vertically between floors in a commercial building must be rated:', a: ['CMR (Communications Riser) — fire-resistant jacket that prevents flame spreading between floors', 'CMP (Plenum) — plenum rating is required for all vertical runs', 'CM (Communications) — standard cable is acceptable between floors', 'Any listed cable — floor penetrations are fire-stopped separately'], correct: 0, exp: 'Riser-rated (CMR) cable has a fire-resistant jacket that prevents fire from spreading vertically through the building via the cable jacket. Plenum (CMP) is required only in air-handling spaces.' },
      { q: 'Building entrance protectors protect the inside plant from:', a: ['Lightning and power-line voltage surges on the incoming cable pairs', 'Physical cable damage at the building entrance point', 'Moisture ingress at the cable entry penetration', 'Signal loss from the long feeder cable run'], correct: 0, exp: 'Gas-discharge or solid-state protectors clamp voltage surges from lightning or accidental power contact before they can reach inside wiring and CO equipment.' },
      { q: 'TIA-568 limits horizontal cable runs to:', a: ['90 meters — total channel including patch cords is 100 meters', '100 meters of cable excluding patch cords', '50 meters with a maximum of 25 additional meters in patch cords', 'No limit — fiber cable can be any length in horizontal runs'], correct: 0, exp: '90m of horizontal cable from the FD to the work area outlet, plus 10m in patch cords at both ends, equals the 100m total channel limit.' },
      { q: 'A fused building entrance protector will test as:', a: ['An open circuit on the affected pair — the protector sacrificed itself during a surge', 'A short circuit — the failed element connects tip to ring', 'A correct resistance matching the pair impedance', 'No change — fused protectors remain conductive to the CO side only'], correct: 0, exp: 'Fused protectors open the circuit to protect inside plant. They look like a cable open from the inside but are often the actual fault after a lightning event.' },
    ],
  },

  {
    id: 'tel-cell-site-power',
    num: 5,
    title: 'Cell Site Power Systems',
    desc: '−48V DC power plants at cell sites, battery backup, rectifiers, generators, RF safety, and the OSP tech\'s role in keeping cell sites running.',
    slides: [
      {
        title: 'Cell Site Architecture and Power Needs',
        body: [
          'A cell site (also called a base station or BTS/NodeB/eNodeB/gNodeB depending on the generation) consists of three major subsystems: the radio equipment (antennas, remote radio heads or radio units), the baseband equipment (baseband units, core equipment, routers), and the power system. The OSP power tech\'s domain is primarily the power system and the physical plant — cabinets, cabling, grounding, and backup power.',
          'Most cell site radio and baseband equipment operates on −48V DC. The power system converts AC utility power to −48V DC using rectifiers, maintains a battery string in float to provide instant backup, and manages the transition to generator or UPS backup when utility fails. The battery string provides 4–8 hours of backup at full load in most carrier designs. Tier 1 carriers often require 8 hours minimum.',
          'Cell site physical configurations: a rooftop site installs equipment on a building roof or penthouse. A tower site uses a freestanding monopole, lattice tower, or guyed tower with the equipment in a ground-level cabinet, shelter, or hut. Small cells and DAS (Distributed Antenna System) nodes mount on utility poles, streetlights, or building facades — typically lower power with smaller backup batteries. Each configuration has different power distribution, cabling, and grounding approaches.',
          'Typical power loads at a macro cell site: 2–5 kW for a 2G/3G site, 5–15 kW for an LTE site, 10–30 kW for a 5G NR site (especially with massive MIMO antennas). Power capacity must support not only the current equipment but also planned expansion — undersizing power is a common cause of service-affecting events when carriers upgrade.',
        ],
        keyPoints: [
          'Cell site subsystems: radio equipment, baseband equipment, and power system — OSP power tech owns the power plant and physical plant',
          'Cell sites run on −48V DC from rectifier/battery systems — 4–8 hours backup standard',
          'Site types: rooftop, tower (monopole/lattice/guyed), small cell/DAS — each has different power and cabling configurations',
          '5G sites draw 10–30 kW — much higher than legacy sites; plan for expansion when sizing power',
        ],
        quiz: [
          {
            q: 'The standard operating voltage for cell site radio and baseband equipment is:',
            a: ['-48V DC — converted from AC utility by rectifiers with battery float backup', '+48V DC — standard for all tower equipment', '120V AC — the same as building electrical systems', '24V DC — the standard for small cell sites'],
            correct: 0,
            exp: '−48V DC is the telecom industry standard for cell site power. The negative polarity (positive ground) reduces electrolytic corrosion on copper connections in the presence of ground currents.',
          },
          {
            q: 'A carrier requires 8 hours of battery backup at a cell site. This means:',
            a: ['The battery string must be sized to supply the full site load for 8 hours from a full charge with no utility power', 'The batteries will run the site for 8 hours before the generator starts', 'The batteries provide 8 hours of backup only at reduced power modes', 'The 8-hour requirement applies only to the radio equipment, not the baseband'],
            correct: 0,
            exp: '8 hours of backup means the battery string must deliver enough energy (amp-hours) to run the entire site load for 8 hours at the design discharge rate, starting from a fully charged state.' },
          {
            q: 'Why do 5G NR sites require significantly more power than LTE sites?',
            a: ['5G uses massive MIMO antenna arrays with many more active elements, each consuming power', '5G equipment runs at higher voltages requiring more power conversion', '5G radios must transmit at higher power levels to reach further distances', '5G sites use more battery strings, increasing the standby power consumption'],
            correct: 0,
            exp: '5G massive MIMO uses arrays of 32, 64, or more active antenna elements (Active Antenna Units) compared to 2–4 elements in LTE — each element has its own power amplifier. This drives site power consumption from 5–15 kW (LTE) to 10–30 kW (5G NR).',
          },
        ],
      },
      {
        title: 'Rectifiers, Batteries, and the -48V DC Plant',
        body: [
          'The −48V DC power plant at a cell site works identically to the DC plant covered in the DC Plants (Telecom) course — the same architecture applies at cell sites. Rectifier shelves with modular, hot-swappable rectifier modules convert AC utility (typically 208V or 240V three-phase) to regulated −48V DC. Rectifiers operate in parallel, each contributing current to the DC bus. N+1 redundancy means one rectifier module can fail without affecting site operation.',
          'The battery string floats on the DC bus — the batteries are always connected and always in a float state (trickle charged to maintain full capacity). When utility fails, the batteries seamlessly take over — there is no switching time. The load does not notice the utility failure until the batteries begin to discharge and the bus voltage starts to drop toward the low-voltage disconnect (LVD) threshold.',
          'LVD (Low-Voltage Disconnect): when the battery discharges to the LVD threshold (typically 42–43.5V for a −48V plant), the plant controller disconnects non-critical loads in a prioritized sequence to extend runtime on critical equipment. Critical equipment (typically baseband and radio) stays powered; auxiliary loads (lighting, HVAC, non-essential monitoring) drop first.',
          'Battery maintenance at cell sites: the same testing protocols as any VRLA string — monthly float voltage verification, quarterly impedance testing with a conductance meter, annual visual inspection, and the periodic full-load discharge test (following IEEE 1188 for VRLA). A weak string at a cell site fails silently until the next utility outage — a cold night in winter with a weak battery is when failures become outages.',
        ],
        images: [
          { src: '/diagrams/cell-site-dc-plant-lvd.svg', alt: 'Diagram of the cell site -48V rectifier plant N+1 redundancy, battery float operation with no switching delay, the LVD prioritized load-shedding sequence, and the battery maintenance testing schedule', caption: 'Batteries always float on the bus — when utility fails, they carry the load instantly, with no relay, no gap, no reset.' },
        ],
        keyPoints: [
          'Rectifier plant: modular shelves, hot-swap N+1 redundancy, convert AC to −48V DC',
          'Battery float: batteries always on the bus — seamless transition, no switching delay on utility failure',
          'LVD: disconnects non-critical loads first when voltage drops to threshold, extending runtime on critical equipment',
          'Battery maintenance: monthly float check, quarterly impedance trending, annual visual, periodic discharge test',
        ],
        quiz: [
          {
            q: 'When utility power fails at a cell site, the transition from utility to battery power causes:',
            a: ['No interruption to the load — batteries on float absorb the load instantly with no switching time', 'A brief 10–30ms interruption while the automatic transfer switch operates', 'A 2–4 second gap while the batteries come off float mode', 'A momentary voltage drop that may reset some equipment'],
            correct: 0,
            exp: 'Because batteries float on the DC bus, they are always supporting the load. Utility failure just means rectifiers stop contributing current — the batteries seamlessly carry the full load with no interruption.',
          },
          {
            q: 'N+1 redundancy in a cell site rectifier plant means:',
            a: ['One more rectifier module than required for full load — any single module can fail without affecting site operation', 'One backup rectifier shelf stored at the site for emergency replacement', 'One additional DC bus circuit beyond what the batteries require', 'A redundant AC utility feed from a second power source'],
            correct: 0,
            exp: 'N+1 means N modules required to carry the load, plus 1 additional. If any single module fails, the remaining N modules handle the full load without dropping voltage.',
          },
          {
            q: 'The LVD (Low-Voltage Disconnect) function protects the battery by:',
            a: ['Disconnecting non-critical loads when voltage drops to the LVD threshold, extending runtime on critical equipment and preventing deep discharge', 'Disconnecting all loads to prevent battery damage from deep discharge', 'Starting the generator when battery voltage drops below 48V', 'Reconnecting the utility feed if the voltage drops below a safe minimum'],
            correct: 0,
            exp: 'LVD protects critical equipment AND the battery. By dropping non-critical loads, it extends the time before the battery reaches a damaging deep discharge depth. Critical equipment continues operating longer.',
          },
        ],
      },
      {
        title: 'Grounding, RF Safety, and Generator Integration',
        body: [
          'Cell site grounding is safety-critical and performance-critical. Poor grounding causes RF interference, equipment damage from lightning, and personnel safety hazards. TIA-607 and NEC Article 800 govern telecommunications grounding. The primary grounding conductor runs from the building or tower ground ring to the main equipment grounding terminal bar (MGTB). All equipment frames, cable trays, conduit, and antenna mounts are bonded to this ground system.',
          'Tower grounding: the tower structure itself is grounded at the base with a ring electrode buried around the tower foundation. Down-conductor cables run from the tower legs to the ground ring. Transmission line grounding kits are installed where coaxial cables enter the building — the outer conductor of each coax is bonded to the ground system at the cable entry point. This prevents lightning current from following the coax into the equipment room.',
          'RF safety at cell sites: cellular antennas transmit radio frequency energy. While the levels at the tower base are typically safe, some scenarios create exposure risk: working directly in front of antennas at close range (within the RF exclusion zone), working on a structure where an antenna is still transmitting above or behind you, or working on equipment connected to live antennas. Carriers specify minimum approach distances (MADs) for each antenna installation. Before climbing or working at elevation near active antennas, verify carrier RF safety procedures and ensure antennas are shut down for any work within the exclusion zone.',
          'Generator integration: cell site generators start automatically when utility fails after the batteries reach a threshold or after a timer. Automatic transfer switches (ATS) for cell site generators are typically smaller than data center versions (30–200 kVA for a single site) but operate on the same principles. As the OSP tech, you may be responsible for generator startup testing, ATS exercisers, and fuel level verification. Many cell sites have fuel monitoring systems that report to the carrier NOC remotely.',
        ],
        keyPoints: [
          'Ground system: ground ring → MGTB → all equipment frames, cable trays, and antenna mounts bonded per TIA-607',
          'Coax grounding kits at building entry: bond outer conductor to ground to divert lightning before it enters equipment room',
          'RF exclusion zone: get carrier-specific MADs and ensure antenna shutdown before working within exclusion range',
          'Generator: ATS + timer start after battery threshold; tech responsible for ATS testing, exerciser, and fuel checks',
        ],
        quiz: [
          {
            q: 'Transmission line grounding kits on coaxial cable at the cell site building entry:',
            a: ['Bond the coax outer conductor to the ground system, diverting lightning current before it enters the equipment room', 'Provide waterproof weatherproofing for the cable penetration', 'Connect the center conductor to the antenna mount for improved RF performance', 'Are only required on tower legs — cables entering from ground level do not need grounding kits'],
            correct: 0,
            exp: 'Grounding kits bond the outer conductor of each coaxial cable to the building ground system at the cable entry point. Lightning striking the tower follows the conductor down the coax — the kit diverts that current to ground before it reaches the equipment.',
          },
          {
            q: 'Before working in the vicinity of a transmitting cell site antenna, you should:',
            a: ['Obtain the carrier\'s RF exclusion zone distances and confirm antenna shutdown for any work within the exclusion zone', 'Verify that your RF exposure badge is current — badges are sufficient protection for all cell site work', 'Work only during low-traffic hours when the antenna transmits at reduced power', 'RF exposure at cell sites is negligible — no special precaution is required'],
            correct: 0,
            exp: 'Cell antennas transmit at power levels that can cause RF exposure hazards at close range. Carrier-specific RF safety procedures define the exclusion zone and the shutdown requirements for antenna work.',
          },
          {
            q: 'Cell site generators are sized differently from data center generators primarily because:',
            a: ['Cell sites have smaller loads (30–200 kVA per site) compared to data centers (hundreds to thousands of kVA)', 'Cell sites do not use ATS — generators connect directly to the battery bus', 'Cell site generators operate on natural gas; data center generators use diesel', 'Cell site generators start immediately; data center generators have a longer start sequence'],
            correct: 0,
            exp: 'Individual cell sites typically draw 5–30 kW, requiring 30–200 kVA generators. Data centers may require megawatts. The ATS and start sequence principles are identical.',
          },
        ],
      },
    ],
    test: [
      { q: 'Cell site radio and baseband equipment typically operates on:', a: ['-48V DC from a rectifier/battery plant', '+48V DC', '120V AC directly from utility', '24V DC for all tower equipment'], correct: 0, exp: '-48V DC is the telecom industry standard, using positive-ground architecture that reduces corrosion in copper connections.' },
      { q: 'N+1 redundancy in a cell site rectifier plant means:', a: ['One more module than required — any single module failure does not affect site operation', 'One backup shelf stored at the site', 'A second AC utility feed for the rectifiers', 'One rectifier runs standby while others carry load'], correct: 0, exp: 'N modules carry the load; the +1 additional module ensures single-module failure does not cause a service outage.' },
      { q: 'When utility power fails at a cell site with a floating battery plant:', a: ['There is no interruption — batteries on the bus absorb the load instantly', 'A 10–30ms gap occurs while the ATS transfers to battery', 'Equipment resets briefly during the transfer', 'The generator must start before the load transfers to batteries'], correct: 0, exp: 'Floating batteries are always supporting the bus. Utility failure just removes the rectifiers from the circuit — the batteries carry the load seamlessly.' },
      { q: 'The LVD function at a cell site:', a: ['Disconnects non-critical loads at the voltage threshold to extend runtime on critical equipment', 'Disconnects all loads to prevent battery damage', 'Starts the generator when voltage drops below threshold', 'Reconnects utility power from a backup feed'], correct: 0, exp: 'LVD (Low-Voltage Disconnect) prioritized load shedding extends battery runtime for critical equipment (radio/baseband) by dropping auxiliary loads first.' },
      { q: '5G NR sites require more power than LTE sites primarily because:', a: ['Massive MIMO uses many active antenna elements with individual power amplifiers', '5G radios transmit at higher power for greater range', '5G equipment runs at higher voltages requiring more power conversion', '5G sites use larger battery strings that draw more standby power'], correct: 0, exp: 'Massive MIMO arrays (32–64+ elements) each have their own power amplifier, driving 5G site power from 5–15 kW (LTE) to 10–30 kW (5G NR).' },
      { q: 'The TIA-607 cell site grounding system connects:', a: ['All equipment frames, cable trays, antenna mounts, and coax outer conductors to the MGTB and ground ring', 'Only the AC power system to the building ground', 'Radio equipment to isolated grounds separate from the DC power system', 'The tower structure exclusively — equipment frames bond to the tower'], correct: 0, exp: 'TIA-607 requires bonding of all metallic infrastructure — equipment, cable trays, conduit, antenna mounts, and coax outer conductors — to a common ground reference.' },
      { q: 'Coaxial cable transmission line grounding kits are installed:', a: ['At the building entry point — to divert lightning from the coax into the ground system before it reaches equipment', 'At the antenna mount to bond the antenna to the tower ground', 'At the rectifier to protect the DC bus from lightning', 'Inside the equipment room only — exterior kits are not required by TIA-607'], correct: 0, exp: 'Grounding kits at the building entry are the critical protection point — they divert lightning current to ground before it can travel into the equipment room via the coax shield.' },
      { q: 'RF exclusion zones at cell sites require:', a: ['Antenna shutdown before working within the defined minimum approach distance', 'Only RF exposure badges — no antenna shutdown is needed', 'Working during off-peak hours only', 'No special precautions — levels at the base are always safe'], correct: 0, exp: 'Carrier-specific RF safety procedures define exclusion zones where antenna shutdown is required before personnel approach. These must be followed for any work within the exclusion range.' },
      { q: 'Cell site battery maintenance should include:', a: ['Monthly float voltage check, quarterly impedance trending, annual visual inspection, and periodic discharge testing', 'Annual voltage check only — VRLA batteries are sealed and require minimal maintenance', 'Monthly discharge test to verify capacity', 'Visual inspection only — testing requires specialist equipment not available to OSP techs'], correct: 0, exp: 'VRLA battery maintenance: monthly float voltage, quarterly impedance/conductance trending, annual visual, and periodic discharge test per IEEE 1188.' },
      { q: 'An automatic exerciser on a cell site generator:', a: ['Runs the generator on a scheduled cycle to verify it starts and operates — prevents wet stacking and detects failures before an actual outage', 'Tests the ATS transfer sequence under utility power', 'Exercises the fuel pump to prevent diesel contamination', 'Automatically refuels the generator when the tank drops below a threshold'], correct: 0, exp: 'Generator exercisers run the machine periodically (typically weekly) to keep fuel systems primed, batteries charged, and to detect failures before a real outage occurs.' },
    ],
  },

  {
    id: 'tel-testing-certification',
    num: 6,
    title: 'Testing, Certification, and Documentation',
    desc: 'OTDR operation in depth, OLTS pass/fail testing, fiber inspection, structured cabling certification per TIA-568, and the closeout documentation that gets the job paid.',
    slides: [
      {
        title: 'Structured Cabling Certification Testing',
        body: [
          'Certification testing of a structured cabling installation verifies that every link and channel meets the performance requirements of the targeted cabling category (Cat 5e, Cat 6, Cat 6A, etc.) per TIA-568. Certification is not the same as a continuity test — it measures actual electrical performance parameters at the frequencies the category is rated for and compares against the standard\'s pass/fail limits.',
          'Key parameters measured during copper certification: Insertion Loss (IL) — signal attenuation from end to end. NEXT (Near-End Crosstalk) — interference induced by the transmitting pair on an adjacent pair at the transmitting end. PS-NEXT (Power Sum NEXT) — cumulative crosstalk from all other pairs. FEXT and PS-ELFEXT — far-end crosstalk and its power sum. Return Loss (RL) — energy reflected back toward the transmitter from impedance mismatches. Propagation delay and delay skew (for applications that use multiple pairs simultaneously).',
          'Certification testers (Fluke Networks DSX, Versiv; Ideal Networks R8000; EXFO): these instruments sweep through the entire frequency range for the category (up to 500 MHz for Cat 6A, 2000 MHz for Cat 8) and report pass/fail for each parameter. A failing parameter tells you what the problem is; the margin (how far above or below the pass/fail limit) tells you how bad it is.',
          'Common certification failures: split pairs (one wire from two different pairs twisted together — causes catastrophic NEXT failure), excessive untwisting at terminations (more than 13mm for Cat 5e, 6mm for Cat 6), poor connections at the jack or patch panel, and cable runs exceeding the 90m horizontal limit.',
        ],
        keyPoints: [
          'Certification tests electrical performance (IL, NEXT, RL, etc.) against TIA-568 category limits — not just continuity',
          'Key parameters: Insertion Loss, NEXT, PS-NEXT, Return Loss, delay/skew',
          'Testers: Fluke DSX/Versiv, Ideal R8000, EXFO sweep through the full category frequency range',
          'Common failures: split pairs, excessive untwisting at terminations, runs over 90m, bad jack connections',
        ],
        quiz: [
          {
            q: 'NEXT (Near-End Crosstalk) in a copper cabling certification test measures:',
            a: ['Interference induced by the transmitting pair onto adjacent pairs, measured at the transmitting end', 'Signal loss from end to end of the cable link', 'Reflected energy returning toward the transmitter from impedance changes', 'Crosstalk between cables in the same conduit'],
            correct: 0,
            exp: 'NEXT is the coupling of transmit energy into adjacent pairs, measured at the same end as the transmitter. High NEXT degrades receive signal quality on other pairs in the same cable.',
          },
          {
            q: 'A structured cabling link fails certification with a "NEXT" failure at a jack location. The most likely cause is:',
            a: ['Excessive untwisting of the pair at the jack termination — more than 13mm for Cat 5e or 6mm for Cat 6', 'Cable that exceeds the 90m horizontal limit', 'A split pair error at the patch panel end', 'Wrong category jack installed in a Cat 6A system'],
            correct: 0,
            exp: 'Untwisting pairs at terminations increases crosstalk because the twist provides the NEXT rejection. Cat 5e allows no more than 13mm; Cat 6 allows 6mm. Excessive untwisting is the most common source of NEXT failures at terminations.',
          },
          {
            q: 'Certification testing with a Fluke DSX differs from a simple continuity test because:',
            a: ['It measures electrical performance parameters at all frequencies for the category — confirming the link will carry data at rated speeds', 'It is faster than continuity testing for large installations', 'It generates the cabling documentation automatically without manual entry', 'Continuity tests require two people; certification testing is single-ended'],
            correct: 0,
            exp: 'Continuity tests verify the conductors are connected. Certification tests verify the link performs at the electrical level required for the rated data speed — a link can pass continuity and fail certification badly.',
          },
        ],
      },
      {
        title: 'Fiber Inspection and Cleaning',
        body: [
          'Connector end-face contamination is the #1 cause of fiber link failures and high insertion loss. A single particle of dust on a fiber end-face can cause 1–2 dB of additional loss — equivalent to hundreds of meters of cable loss. In a system designed with minimal margin, a dirty connector can take a link from passing to failing. "Inspect before you connect" is the fundamental discipline of fiber connector work.',
          'Inspection tools: a fiber inspection probe (digital microscope) connects to the end-face and displays it on a screen. Probes are available in 200×, 400×, and higher magnification. IEC 61300-3-35 defines four inspection zones on the connector end-face (Zone A: core, Zone B: cladding, Zone C: contact/adhesive, Zone D: ferrule) and specifies the maximum number and size of defects allowed in each zone per the TIA/IEC standards. Zone A (the core region) is the most critical — even tiny contamination in this zone causes significant insertion loss.',
          'Cleaning methods: dry cleaning (one-stroke fiber cleaning sticks or cassette cleaners) is the first attempt. If the probe still shows contamination after a dry clean, follow with a wet clean using a lint-free wipe dampened with optical-grade IPA (99% pure minimum — lower concentrations leave residue), then finish with a dry wipe. Never touch a cleaned end-face with your fingers — skin oils instantly contaminate the surface.',
          'Connector inspection before mating is mandatory for all permanent installations. Connecting a dirty fiber to a clean fiber contaminates the clean end-face as well — and in some cases permanently scratches the core. Inspect both sides of every mated pair before connection. Connector inspection should also be performed before OTDR testing — a dirty launch connector adds loss to the trace that looks like a fiber problem but is actually at the instrument end.',
        ],
        images: [
          { src: '/diagrams/fiber-inspection-cleaning.svg', alt: 'Diagram of the IEC 61300-3-35 four fiber connector inspection zones, the dry-then-wet-then-dry cleaning sequence, and the rule to inspect both sides of every mated pair', caption: 'A single dust particle in Zone A can cost 1-2 dB — dry clean first, wet clean with optical-grade IPA only if needed, and inspect both sides of every pair.' },
        ],
        keyPoints: [
          '"Inspect before you connect" — contamination is the #1 cause of fiber link failures',
          'IEC 61300-3-35: four end-face zones; Zone A (core) is most critical — even tiny contamination causes loss',
          'Cleaning: dry first, then wet (optical IPA) + dry — never touch a cleaned end-face',
          'Inspect BOTH sides of every mated pair before connection — dirty connector contaminates the clean one',
        ],
        quiz: [
          {
            q: 'Why must you inspect both sides of a fiber connector pair before mating?',
            a: ['A dirty connector pressed against a clean one contaminates the clean end-face — both must be clean before connection', 'Inspection is only required on the transmitter side', 'You only need to inspect the receive side — the transmitter is less sensitive to contamination', 'Inspection of one side is sufficient — the other side is automatically clean if it has a dust cap'],
            correct: 0,
            exp: 'Connecting a dirty fiber to a clean one transfers contamination to the clean end-face. In some cases, hard particles on the dirty connector physically scratch the clean core. Inspect and clean both sides.',
          },
          {
            q: 'The fiber connector end-face zone most critical for optical performance (Zone A per IEC 61300-3-35) is:',
            a: ['The core region — contamination here directly blocks or scatters the transmitted light', 'Zone D (the ferrule surface) — scratches here cause reflection', 'Zone C (the contact/adhesive region) — delamination causes insertion loss', 'Zone B (the cladding) — contamination here causes total internal reflection failure'],
            correct: 0,
            exp: 'Zone A is the active optical core. Any contamination in this zone is in the direct path of the transmitted signal and causes immediate, significant insertion loss.',
          },
          {
            q: 'After dry-cleaning a fiber connector, the inspection probe still shows contamination. The next step is:',
            a: ['Wet-clean with optical-grade IPA on a lint-free wipe, then dry-clean again — in that order', 'Apply more dry-cleaning attempts before using IPA', 'Replace the connector — residual contamination means the end-face is damaged', 'Use tap water and a cotton swab — IPA is not required for mild contamination'],
            correct: 0,
            exp: 'The cleaning protocol is: dry clean first. If contamination remains, wet clean with optical-grade IPA (≥99% pure) then immediately dry clean. IPA leaves no residue if pure grade is used and the fiber is dried promptly.',
          },
        ],
      },
      {
        title: 'Documentation and Closeout',
        body: [
          'Documentation is what converts a completed job into a billable, defensible, warranty-covered installation. Proper closeout documentation includes: test results for every link (pass/fail, actual measured values, test date, technician ID, tester serial number, firmware version), as-built drawings showing cable routes and labeling, splice records with OTDR traces for every fiber, and the completed job packet handed to the customer or kept in the carrier\'s records system.',
          'Test result formats: modern certification testers (Fluke, EXFO) store results in onboard memory and export to PDF or proprietary software for formal test reports. OTDR results are stored as SOR (Standard OTDR Record) files per GR-196-CORE/Bellcore standards, which any OTDR software can read. Results must include the tester settings used (wavelength, pulse width, index of refraction, averaging time) to be reproducible and auditable.',
          'Labeling: every link must be labeled at both ends before testing. Cables, ports, patch panels, and work area outlets must all carry the same identifier. TIA-606 defines labeling conventions for telecommunications infrastructure. Without proper labels, test results cannot be matched to specific links, and future troubleshooting becomes guesswork.',
          'Warranty and acceptance: many structured cabling installations carry manufacturer-backed channel warranties (15-year or 25-year system warranties from vendors like Belden, CommScope, Panduit). These warranties require use of the manufacturer\'s certified system components, certified installation by trained technicians, and submission of the complete test report package to the manufacturer\'s warranty program. A failed or missing test report voids the warranty.',
        ],
        keyPoints: [
          'Closeout package: test results per link, as-built drawings, splice records with OTDR traces, job packet to customer/carrier',
          'OTDR results in SOR format (GR-196); certification results exported from tester software — both must include instrument settings',
          'TIA-606 labeling: every link labeled at both ends before testing — unlabeled results cannot be matched to links',
          'System warranties require: certified components, certified installer, complete test report submitted to manufacturer',
        ],
        quiz: [
          {
            q: 'OTDR results are stored in SOR format because:',
            a: ['SOR (Standard OTDR Record) is an industry-standard format readable by any OTDR software, enabling auditability and long-term storage', 'SOR is proprietary to Fluke and ensures only certified equipment can access the data', 'SOR format compresses the data for easier email transmission to customers', 'SOR is required only for government telecommunications projects — commercial jobs can use any format'],
            correct: 0,
            exp: 'SOR (defined by GR-196-CORE/Bellcore) is an open standard that any OTDR software can read. This ensures results can be shared, compared, and audited regardless of which OTDR brand was used.',
          },
          {
            q: 'A structured cabling system warranty is voided if:',
            a: ['The test report package is missing or incomplete — manufacturer warranties require complete certified test results', 'Any link fails and is repaired — one repair voids all warranty coverage', 'The installation takes longer than the manufacturer\'s standard timeline', 'Non-manufacturer patch cords are used after the installation is complete'],
            correct: 0,
            exp: 'Manufacturer system warranties specifically require submission of complete test results for all links. Missing results = no warranty. The test reports are the proof of certified installation.',
          },
          {
            q: 'Per TIA-606, cabling labels must appear:',
            a: ['At both ends of every link — at the patch panel and at the work area outlet', 'Only at the patch panel end — work area outlets are identified by room number', 'Only at the main equipment room — field labels are not required by TIA-606', 'On the cable itself in the horizontal run — end labels are supplementary'],
            correct: 0,
            exp: 'TIA-606 requires labels at both ends of every horizontal link. Without matching labels at both ends, test results cannot be reliably assigned to specific links during the closeout process or during future troubleshooting.',
          },
        ],
      },
    ],
    test: [
      { q: 'Structured cabling certification testing, unlike a continuity test, verifies:', a: ['Electrical performance at all frequencies for the cabling category against TIA-568 pass/fail limits', 'That all conductors are connected end-to-end', 'Cable length is within the 90m horizontal limit', 'Connector type matches the category specification'], correct: 0, exp: 'Certification tests swept electrical parameters (IL, NEXT, RL, etc.) — a link can pass continuity but fail certification.' },
      { q: 'NEXT (Near-End Crosstalk) is a measure of:', a: ['Interference from the transmitting pair onto adjacent pairs, measured at the transmitting end', 'Signal loss from source to destination', 'Reflected signal returning to the transmitter', 'Interference between cables in adjacent conduits'], correct: 0, exp: 'NEXT measures the coupling of transmit energy into adjacent pairs — too much NEXT degrades the receiver\'s signal quality.' },
      { q: 'Excessive untwisting of pairs at a jack termination causes failures in:', a: ['NEXT — the twist provides the crosstalk rejection; untwisting eliminates it', 'Insertion loss only — NEXT is unaffected by termination untwisting', 'Return loss — impedance changes from cable to jack geometry cause reflections', 'Propagation delay — longer untwisted segment changes the electrical length'], correct: 0, exp: 'The pair twist is what provides NEXT rejection. Untwisting at the termination (>13mm for Cat 5e, >6mm for Cat 6) degrades NEXT performance.' },
      { q: 'The #1 cause of fiber link failures in the field is:', a: ['Connector end-face contamination', 'Bad fusion splices', 'Excessive cable length', 'Incorrect OTDR wavelength selection'], correct: 0, exp: 'Contamination is the leading cause. A single dust particle in the core region can cause 1–2 dB of additional loss, taking a passing link to failing.' },
      { q: 'IEC 61300-3-35 Zone A on a fiber connector end-face is:', a: ['The core region — the most critical zone where contamination causes direct optical loss', 'The outer ferrule surface', 'The adhesive/contact region between core and cladding', 'The cladding region around the core'], correct: 0, exp: 'Zone A is the core. Contamination here is in the direct optical path and causes significant insertion loss immediately.' },
      { q: 'The correct fiber cleaning sequence when dry cleaning leaves contamination is:', a: ['Wet clean with optical-grade IPA, then dry clean — in that order', 'Continue dry cleaning until the surface is clean', 'Wet clean only — do not dry clean after IPA', 'Replace the connector — residual contamination is permanent'], correct: 0, exp: 'Dry first. If contamination remains: wet with optical IPA (≥99%) then immediately dry. This two-step wet/dry sequence dissolves and removes what dry cleaning cannot.' },
      { q: 'Both sides of a fiber connector pair must be inspected before mating because:', a: ['A dirty connector pressed against a clean one contaminates the clean end-face', 'Dust caps protect only one side', 'The inspection scope can only see one end at a time', 'Only the transmitter side requires inspection'], correct: 0, exp: 'Connecting a dirty connector to a clean one transfers contamination — and potentially scratches the core. Both sides must be clean before mating.' },
      { q: 'OTDR results are stored in SOR format to:', a: ['Enable auditability and long-term storage across any OTDR brand\'s software', 'Reduce file size for easier data management', 'Meet Fluke Networks\' proprietary storage requirements', 'Satisfy government procurement requirements only'], correct: 0, exp: 'SOR (GR-196-CORE) is an open industry standard for OTDR trace files, readable by any OTDR software regardless of the instrument brand used.' },
      { q: 'TIA-606 requires cabling labels at:', a: ['Both ends of every link — patch panel and work area outlet', 'The patch panel end only', 'The work area outlet only', 'The midpoint of horizontal runs exceeding 45m'], correct: 0, exp: 'Both-end labeling per TIA-606 allows test results to be matched to specific links and enables accurate future troubleshooting.' },
      { q: 'A manufacturer\'s system cabling warranty requires:', a: ['Certified components, certified installer, and complete test results submitted to the manufacturer', 'Only that certified components are used — installation method is not warranted', 'Test results for 20% of links as a sample basis', 'The installation must be completed within the manufacturer\'s specified timeframe'], correct: 0, exp: 'System warranties require all three: certified components, certified installer, and complete test report submission. Missing any element voids the warranty.' },
    ],
  },
];
