import type { TrainingModule } from './modules';

export const SOLAR_INSTALLER_MODULES: TrainingModule[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULE 11 — PV FUNDAMENTALS & SYSTEM DESIGN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sinst-pv-fundamentals',
    num: 11,
    title: 'PV Cell Physics & System Design',
    desc: 'Photovoltaic effect, I-V curves, STC ratings, irradiance, shading analysis, and system sizing.',
    slides: [
      {
        title: 'PV Cell Physics & I-V Characteristics',
        body: [
          'The photovoltaic effect: photons from sunlight strike semiconductor material (silicon), exciting electrons into the conduction band and creating an electron-hole pair — a p-n junction separates the charges, driving a DC current through an external circuit.',
          'The I-V (current-voltage) curve characterizes a PV module: at short-circuit (V=0), current is maximum (Isc); at open-circuit (I=0), voltage is maximum (Voc); maximum power point (MPP) is the knee of the curve where the product V×I is highest.',
          'Standard Test Conditions (STC) define the reference point for all module ratings: 1000 W/m² irradiance, 25°C cell temperature, AM1.5 solar spectrum — rated power in watts (Wp) and all nameplate values are at STC.',
          'Real-world output is almost always lower than STC: actual irradiance varies, cell temperature frequently exceeds 25°C in sunlight (often 50–65°C), and soiling, wiring losses, and inverter efficiency all reduce system output.',
          'PVUSA Test Conditions (PTC) rate modules at 1000 W/m² irradiance, 20°C ambient temperature, and 1 m/s wind speed — PTC ratings are more representative of actual field performance than STC and are typically 10–15% lower than STC ratings.',
          'Temperature coefficient of power (Pmax) quantifies how module output changes with temperature — a typical monocrystalline module has a coefficient of –0.35%/°C, meaning every degree above STC (25°C) reduces power by 0.35%; a module at 55°C loses approximately 10.5% of its rated power.',
          'Monocrystalline modules (higher efficiency, 18–24%), polycrystalline (slightly lower efficiency, 15–20%), and thin-film (CdTe, CIGS) are the main cell technologies — monocrystalline is now dominant in residential and commercial due to cost parity and better high-temperature performance.',
        ],
        keyPoints: [
          'PV cell: photon excites electron across p-n junction → DC current. I-V curve: Isc (short-circuit), Voc (open-circuit), MPP (max power)',
          'STC ratings at 1000 W/m², 25°C cell temp — real output is lower; temperature coefficients matter in hot climates',
          'Temperature coefficient of Pmax: each °C above 25°C reduces output ~0.35% for monocrystalline modules',
        ],
        quiz: [
          {
            q: 'A PV module is rated 400 Wp at STC. The temperature coefficient of Pmax is –0.35%/°C. If the cell temperature is 60°C, what is the approximate output power?',
            a: ['400 W (STC rating is always the output)', 'About 351 W (35°C above STC × 0.35%/°C = 12.25% reduction)', 'About 380 W (5% thermal derating only)', 'About 320 W (20% derating for all losses)'],
            correct: 1,
            exp: '60°C – 25°C STC = 35°C above STC. 35 × 0.35% = 12.25% power reduction. 400 W × (1 – 0.1225) ≈ 351 W. In hot climates, thermal derating is significant — it is why PTC ratings and energy modeling tools like PVWatts are better predictors of annual yield than STC nameplate.',
          },
          {
            q: 'On a PV module I-V curve, where is the maximum power point (MPP)?',
            a: ['At short-circuit current (Isc), where current is highest', 'At open-circuit voltage (Voc), where voltage is highest', 'At the "knee" of the curve where the product of voltage × current is maximized', 'At 50% of Voc, which always corresponds to maximum power'],
            correct: 2,
            exp: 'The MPP is found at the knee of the I-V curve — the point where V × I (power) is maximum. MPPT (Maximum Power Point Tracking) in inverters and charge controllers continuously finds this point as irradiance and temperature change throughout the day.',
          },
        ],
      },
      {
        title: 'Irradiance, Shading & System Sizing',
        body: [
          'Irradiance is the instantaneous power of solar radiation per unit area (W/m²); irradiation or insolation is the energy received over time (kWh/m²/day) — peak sun hours (PSH) is the equivalent number of hours of 1000 W/m² irradiance that delivers the same daily energy as the actual varying irradiance.',
          'NREL\'s PVWatts calculator uses TMY (Typical Meteorological Year) data to estimate annual energy production given location, system size, tilt, azimuth, and losses — it is the standard tool for residential solar proposals.',
          'Shading is the most destructive performance factor in PV: a small shadow on even one cell in a series string can disproportionately reduce the power of the entire string due to the bypass diode behavior — one shaded string can drag down multiple parallel strings without MPPT at the module level.',
          'Bypass diodes are connected across each sub-string (typically 20–24 cells) within a module — when shading reduces that sub-string\'s current, the bypass diode activates, routing current around the shaded cells and limiting power loss to one-third of the module instead of the whole string.',
          'Module-level power electronics (MLPE) — power optimizers (SolarEdge) and microinverters (Enphase) — enable per-module MPPT, dramatically reducing shading losses and enabling system-level monitoring of every module\'s performance.',
          'Tilt and azimuth optimization: in the Northern Hemisphere, south-facing arrays at a tilt angle equal to the local latitude produce maximum annual energy — east and west faces lose roughly 15–20% of annual energy vs. optimal south orientation.',
          'Derate factors account for all system losses: soiling (2–5%), wiring losses (2%), inverter efficiency (96–98%), module mismatch (1–2%), availability losses (1%), and aging (0.5%/year) — a typical system-level derate factor is 0.77–0.85.',
        ],
        images: [
          { src: '/diagrams/system-sizing-derate-factors.svg', alt: 'Diagram of peak sun hours, shading and MLPE, tilt and azimuth optimization, and the derate factor stack, with a worked Phoenix AZ production example', caption: 'From nameplate watts to delivered kWh — peak sun hours, tilt, shading, and the full derate factor stack.' },
        ],
        keyPoints: [
          'Peak sun hours (PSH) = equivalent hours at 1000 W/m² — use PVWatts with TMY data for accurate production estimates',
          'Even partial shading is highly destructive on unoptimized string systems — bypass diodes limit but don\'t eliminate losses',
          'MLPE (optimizers or microinverters) enable per-module MPPT — best solution for shaded or complex rooftops',
        ],
        quiz: [
          {
            q: 'A rooftop solar array in Phoenix, AZ has 6.5 peak sun hours per day. A 10 kW system (STC) with an 82% derate factor would produce approximately how many kWh per day?',
            a: ['65 kWh/day', '53.3 kWh/day', '10 kWh/day', '79.3 kWh/day'],
            correct: 1,
            exp: '10 kW × 6.5 PSH = 65 kWh at STC. Applying the 82% derate: 65 × 0.82 = 53.3 kWh/day. Annual yield would be approximately 53.3 × 365 = 19,455 kWh/year. Derate accounts for temperature, wiring, inverter, soiling, and other real-world losses.',
          },
          {
            q: 'A customer\'s rooftop has a chimney that casts a shadow on two modules every afternoon. Why is this particularly harmful to an unoptimized string inverter system?',
            a: ['The shadow heats the modules, reducing efficiency', 'Shading those two modules reduces the current of the entire series string — the whole string drops to the lowest shaded module\'s current level', 'The shadow blocks wind cooling, raising cell temperature above STC', 'The shadow triggers the rapid shutdown system, shutting down the inverter'],
            correct: 1,
            exp: 'In a series string, all modules must pass the same current. One shaded module with reduced current limits the current of all other modules in the string to match its lower output — like water flow through a kinked hose. The bypass diode activates around the shaded cells, but the shaded module\'s string section is effectively bypassed, reducing that string\'s voltage and power significantly.',
          },
        ],
      },
    ],
    test: [
      { q: 'What are Standard Test Conditions (STC) for PV module rating?', a: ['800 W/m² irradiance, 20°C ambient, AM1.0', '1000 W/m² irradiance, 25°C cell temperature, AM1.5 solar spectrum', '1200 W/m² irradiance, 30°C cell, AM2.0', '500 W/m² irradiance, 25°C cell, sea level'], correct: 1, exp: 'STC is the universal reference point for all PV module nameplate data: 1000 W/m² irradiance, 25°C cell temperature (not ambient), and AM1.5 solar spectrum. All Wp, Voc, Isc, Vmp, Imp values on the module label are measured at STC.' },
      { q: 'What is the function of a bypass diode in a PV module?', a: ['It prevents the module from producing DC above the rated voltage', 'It blocks reverse current flow from the battery into the module at night', 'It allows current to route around shaded sub-strings, limiting power loss to the shaded portion rather than the whole string', 'It acts as the Maximum Power Point Tracker within the module'], correct: 2, exp: 'Bypass diodes are connected in parallel with each sub-string (group of ~20 cells) in anti-parallel. When a sub-string is shaded and its current drops below the string current, the bypass diode conducts, routing current around that section. Without bypass diodes, one shaded cell would reverse-bias and overheat (hot spot).' },
      { q: 'In PVWatts and energy modeling, what does a "derate factor" of 0.82 represent?', a: ['The module\'s temperature coefficient as a fraction', 'The ratio of actual system output to STC nameplate capacity — accounting for all real-world losses', 'The fraction of peak sun hours usable by the inverter', 'The efficiency of the solar cells relative to their theoretical maximum'], correct: 1, exp: 'The derate factor (also called performance ratio) multiplies the STC DC nameplate capacity to estimate actual AC system output, accounting for inverter efficiency, temperature losses, wiring losses, soiling, shading, mismatch, and other real-world factors. 0.82 means the system delivers 82% of its STC DC nameplate rating as actual AC energy.' },
      { q: 'For maximum annual energy production in the Northern Hemisphere, a fixed-tilt solar array should be oriented toward:', a: ['North at a 90° (vertical) tilt', 'South at a tilt angle approximately equal to the local latitude', 'East at a 45° tilt', 'West at a flat (0°) tilt'], correct: 1, exp: 'South-facing panels at a tilt equal to the local latitude maximize the annual incident solar energy in the Northern Hemisphere. East and west orientations shift production to morning or afternoon but reduce annual total by roughly 15–20%. Flat or low-tilt installations on commercial roofs sacrifice 5–10% annually.' },
      { q: 'What is the PVUSA Test Condition (PTC) rating, and how does it differ from STC?', a: ['PTC tests at 1200 W/m² to find peak power; always higher than STC', 'PTC tests at 1000 W/m², 20°C ambient, 1 m/s wind — more representative of field conditions; typically 10–15% lower than STC Wp', 'PTC is the same as STC but for thin-film modules only', 'PTC is a European standard equivalent to STC plus a 10% margin'], correct: 1, exp: 'PTC conditions (1000 W/m², 20°C ambient, 1 m/s wind) result in cell temperatures around 45°C — 20°C above STC\'s 25°C cell temperature. Since power decreases with temperature, PTC output is typically 10–15% below STC nameplate Wp and better represents what you\'ll actually produce in the field.' },
      { q: 'Which tool is the industry-standard calculator for estimating annual solar energy production for a US residential system?', a: ['HOMER Pro', 'SAM (System Advisor Model)', 'NREL\'s PVWatts Calculator', 'RetScreen'], correct: 2, exp: 'NREL\'s PVWatts is the most widely used and recognized tool for residential and commercial solar production estimates in the US. It uses TMY (Typical Meteorological Year) weather data, allows input of system size, tilt, azimuth, and losses, and outputs monthly and annual energy production in kWh.' },
      { q: 'Module-level power electronics (MLPE) like power optimizers and microinverters primarily solve which problem?', a: ['They eliminate the need for rapid shutdown compliance', 'They allow per-module MPPT tracking, dramatically reducing the impact of partial shading and module mismatch', 'They convert AC to DC more efficiently than string inverters', 'They eliminate the need for bypass diodes within modules'], correct: 1, exp: 'MLPE allow each module to independently track its own maximum power point. On a shaded or complex rooftop, one shaded module no longer drags down the entire string. Power optimizers send DC to a central inverter; microinverters convert to AC at the module level — both enable system-level monitoring of each module.' },
      { q: 'What is "hot spot" failure in a PV module, and what prevents it?', a: ['Module overheating from direct sun — prevented by ventilation gaps behind the module', 'A shaded cell forced into reverse bias by string current — dissipates power as heat, potentially destroying the cell; bypass diodes prevent it', 'Lightning strike damage at the junction box — prevented by surge protection devices', 'Discoloration from UV exposure — prevented by anti-reflective coating'], correct: 1, exp: 'When a shaded cell cannot pass the string current, it reverse-biases and begins dissipating power (instead of producing it) as heat — a hot spot. Temperatures can exceed 200°C, damaging the cell, encapsulant, and backsheet. Bypass diodes conduct when the cell voltage reverses, routing current around the shaded cell and preventing hot spot formation.' },
      { q: 'The temperature coefficient of Pmax for a module is –0.40%/°C. If the cell temperature rises from 25°C (STC) to 70°C, what percentage of rated power is lost?', a: ['18%', '28%', '40%', '4%'], correct: 0, exp: '70°C – 25°C = 45°C above STC. 45°C × 0.40%/°C = 18% power reduction. The module produces 82% of its STC nameplate rating at 70°C cell temperature. In hot climates with poor rear ventilation, cell temperatures of 65–75°C are common.' },
      { q: 'A PV module\'s Voc is measured at 42.5V at STC. The temperature coefficient of Voc is –0.30%/°C. At a cell temperature of 70°C, what is the approximate Voc?', a: ['42.5 V (Voc does not change with temperature)', '37.0 V', '48.0 V (Voc increases with temperature)', '40.2 V'], correct: 1, exp: '70°C – 25°C = 45°C above STC. 45 × 0.30% = 13.5% reduction in Voc. 42.5 × (1 – 0.135) ≈ 36.7 V ≈ 37.0 V. Open-circuit voltage decreases with increasing temperature — important for maximum string voltage calculations at low temperatures (Voc is highest when cold).' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 12 — NEC ARTICLE 690 & SAFETY
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sinst-nec690',
    num: 12,
    title: 'NEC Article 690 & Solar Safety',
    desc: 'NEC 690 wiring requirements, rapid shutdown, arc-fault protection, grounding, and PV installation safety.',
    slides: [
      {
        title: 'NEC Article 690 — Key Requirements',
        body: [
          'NEC Article 690 governs photovoltaic systems — it covers system sizing, conductor ampacity, overcurrent protection, disconnecting means, grounding and bonding, and rapid shutdown requirements.',
          'The maximum PV system voltage is calculated using the module\'s Voc at the lowest expected temperature (using the record low temperature from the local weather dataset and the temperature coefficient of Voc) — in cold climates, maximum string voltage can significantly exceed STC Voc.',
          'NEC 690.7 requires PV system maximum voltage to not exceed 600V for residential systems (1000V for commercial systems); string inverter sizing must ensure the calculated maximum string Voc does not exceed the inverter\'s maximum DC input voltage rating.',
          'Conductors in PV source circuits (module to combiner) and PV output circuits (combiner to inverter) must be rated at 125% of the maximum circuit current (Isc × 1.25) per NEC 690.8 — USE-2 or PV Wire (PVCABLE) conductors rated for sunlight exposure are required for outdoor wiring.',
          'Combiner boxes aggregate multiple source circuits (strings) into a single output circuit using fused or non-fused inputs — source circuit fusing protects the wiring from backfeed current from parallel strings.',
          'The PV system disconnecting means must be in a location accessible to emergency responders, labeled "PV System Disconnect," and capable of interrupting the maximum circuit current — NEC 690.13.',
          'NEC 690.35 allows ungrounded PV systems (transformerless inverters) with isolation monitoring — the system continuously checks for ground faults without requiring a grounded conductor; this design is standard in modern string inverters.',
        ],
        images: [
          { src: '/diagrams/nec690-voltage-conductor-sizing.svg', alt: 'Diagram of NEC 690 maximum string voltage at record-low temperature, the 690.8 conductor ampacity rule at 125% of Isc, and disconnect and grounding requirements, with a worked voltage example', caption: 'Sizing the DC side to survive its coldest morning — the cold-morning Voc ceiling and the 125% Isc conductor rule.' },
        ],
        keyPoints: [
          'Max string Voc calculated at record low temperature — check against inverter\'s maximum DC input voltage rating',
          'All PV conductors must be rated for sunlight exposure (USE-2 or PV Wire) and sized at 125% of Isc',
          'Residential systems: max 600V DC; commercial: max 1000V DC — stay within these limits in string design',
        ],
        quiz: [
          {
            q: 'A PV module has a Voc of 40.0V at STC and a temperature coefficient of Voc of –0.28%/°C. The record low temperature for the site is –15°C. What is the maximum design Voc for one module?',
            a: ['40.0V (STC Voc)', '43.6V', '36.4V', '44.5V'],
            correct: 1,
            exp: 'Temperature difference: 25°C STC – (–15°C) = 40°C below STC (Voc increases as temperature drops). 40 × 0.28% = 11.2% increase. 40.0V × 1.112 ≈ 44.5V. Wait — let me recalculate: 40°C × 0.28% = 11.2% increase from STC Voc. 40.0 × 1.112 = 44.48V ≈ 44.5V. This value must not exceed the inverter\'s maximum DC input voltage when multiplied by the number of modules in the string.',
          },
          {
            q: 'PV source circuit conductors must be rated at what percentage of the module\'s short-circuit current (Isc) per NEC 690.8?',
            a: ['100% of Isc', '115% of Isc', '125% of Isc', '150% of Isc'],
            correct: 2,
            exp: 'NEC 690.8(A) requires the ampacity of PV source and output circuit conductors to be not less than 125% of the maximum current (Isc for source circuits). This continuous duty factor accounts for long periods of full sunlight operation.',
          },
        ],
      },
      {
        title: 'Rapid Shutdown, Arc-Fault & Grounding',
        body: [
          'NEC 690.12 requires rapid shutdown (RSD) of PV systems on buildings to protect firefighters — for systems installed after 2017 NEC adoption, module-level rapid shutdown is required, reducing voltage on rooftop conductors to ≤30V within 30 seconds of initiating shutdown.',
          'Rapid shutdown initiators are typically located at the main electrical panel or near the inverter disconnect — emergency responders can activate RSD to de-energize rooftop wiring, enabling safe access to the roof.',
          'Module-level RSD is accomplished via MLPE (power optimizers, microinverters) that de-energize when the RSD signal is removed, or via dedicated RSD transmitters/receivers installed at each module.',
          'NEC 690.11 requires ground-fault protection (GFPD) for grounded PV systems to detect and interrupt ground faults on the DC side — modern transformerless inverters include integrated ground fault and arc-fault detection.',
          'NEC 690.11(A) requires arc-fault circuit interrupters (AFCI) for PV systems — PV arcs on DC circuits can sustain at lower voltage than AC arcs and can start fires; AFCI protection detects the characteristic waveform signature of an arc and shuts down the system.',
          'The PV array grounding system bonds all metal components (module frames, racking, junction boxes) to the equipment grounding conductor (EGC) running back to the inverter and then to the service equipment grounding electrode system.',
          'Exposed metal conduit and racking must be bonded to the EGC — the use of listed bonding hardware (Weeb clips, lugs, or listed bonding washers) eliminates the need for separate bonding jumpers at each module-to-racking connection.',
        ],
        keyPoints: [
          'RSD required for building-mounted systems (NEC 690.12) — rooftop conductors must drop to ≤30V within 30 sec of shutdown signal',
          'AFCI required (NEC 690.11A) — DC arc faults are difficult to extinguish and can ignite fires; inverter-integrated AFCI is standard',
          'Bond ALL metal components (frames, racking, conduit) to the EGC — use listed bonding hardware, not generic fasteners',
        ],
        quiz: [
          {
            q: 'A fire department arrives at a residence with a rooftop PV system. They activate the rapid shutdown switch at the main panel. Under NEC 690.12, what should happen to the rooftop conductors within 30 seconds?',
            a: ['The inverter should disconnect from the grid only — rooftop conductors remain energized', 'Voltage in the rooftop conductors must reduce to 30V or less, making the roof safe for firefighter access', 'The modules must physically disconnect from the racking', 'The system must remain energized to avoid battery damage'],
            correct: 1,
            exp: 'NEC 690.12 rapid shutdown de-energizes the conductors on the building (rooftop conductors between modules) to ≤30V within 30 seconds. This protects firefighters who may cut through the roof — energized PV conductors at high DC voltage create an electrocution risk. Module-level RSD (via MLPE) achieves this by shutting down each module individually.',
          },
          {
            q: 'Why is arc-fault protection (AFCI) required for PV systems by NEC 690.11?',
            a: ['AC grid arcs are dangerous and must be detected before they enter the PV system', 'DC arcs are self-sustaining at lower voltages than AC arcs and can ignite fires in attics or wall penetrations where wiring is not visible', 'AFCI is required only for battery storage systems, not pure PV', 'Arc-fault protection is required for PV systems only in wildfire hazard zones'],
            correct: 1,
            exp: 'DC arcs do not have a zero-crossing like AC arcs, making them self-sustaining at much lower voltages. A poor connection or damaged conductor on the DC PV circuit can sustain an arc that ignites nearby combustibles — in attics where PV wiring runs, this creates a significant fire hazard. AFCI devices detect the characteristic high-frequency signature of an arc and interrupt the circuit.',
          },
        ],
      },
    ],
    test: [
      { q: 'NEC Article 690 governs which type of electrical system?', a: ['Fuel cell systems for commercial buildings', 'Photovoltaic (solar electric) systems', 'Wind turbine installations', 'Battery energy storage systems (standalone)'], correct: 1, exp: 'NEC Article 690 specifically covers photovoltaic solar electric systems — modules, arrays, combiners, inverters, wiring methods, disconnects, and grounding. Battery storage is addressed in Article 706; wind in Article 694.' },
      { q: 'For a residential PV system, what is the maximum allowable DC system voltage per NEC 690.7?', a: ['480V', '600V', '1000V', '1500V'], correct: 1, exp: 'NEC 690.7 limits residential PV system voltage to 600V DC. Commercial systems (non-dwelling) may use up to 1000V DC. Higher voltages require listed equipment and conductors rated for the higher voltage.' },
      { q: 'Rapid shutdown (NEC 690.12) requires rooftop PV conductor voltage to drop to what level within 30 seconds of RSD activation?', a: ['120V or less', '80V or less', '30V or less', '0V (complete de-energization)'], correct: 2, exp: 'NEC 690.12 specifies that within 30 seconds of rapid shutdown initiation, the voltage in conductors within the array boundary (on the building) must be reduced to 30V or less. This threshold is considered safe for firefighter contact.' },
      { q: 'Which conductor type is required for outdoor PV source circuit wiring exposed to sunlight?', a: ['THWN-2 (wet location, 90°C)', 'USE-2 or PV Wire (PVCABLE) — rated for sunlight and outdoor exposure', 'NM-B (Romex — indoor residential use)', 'THHW (75°C wet location, not UV-rated)'], correct: 1, exp: 'PV source circuit conductors in sunlight must be USE-2 (Underground Service Entrance, 90°C, sunlight-resistant) or listed PV Wire (specifically designed for PV applications). Standard THWN or THHW is not listed for sunlight exposure in outdoor applications.' },
      { q: 'A PV source circuit fuse in a combiner box is sized to protect against what specific hazard?', a: ['Overcurrent from the utility grid backfeeding into the PV array', 'Backfeed current from parallel strings flowing through a string with a failed module or ground fault', 'Lightning surge voltage on the DC side of the inverter', 'Overtemperature of the combiner box in direct sunlight'], correct: 1, exp: 'When multiple strings are connected in parallel, a fault in one string can cause current from the parallel strings to flow backward through the faulted string. Source circuit fuses in the combiner box are sized to interrupt this backfeed current and protect the module wiring from overheating.' },
      { q: 'NEC 690.11(A) requires arc-fault protection for PV systems. What detects a DC arc fault in practice?', a: ['A standard residential AFCI breaker at the main panel', 'An inverter-integrated AFCI function or external AFCI device that detects the high-frequency signature of a sustained DC arc', 'A ground fault protection device (GFPD) that triggers on current imbalance', 'A fuse in the combiner box rated at 125% of Isc'], correct: 1, exp: 'Inverter manufacturers integrate AFCI detection into the inverter firmware — the device monitors current waveforms for the characteristic high-frequency components of a sustaining arc. External AFCI devices are also available for retrofit. Standard residential AFCI breakers are AC-side devices and do not protect DC PV circuits.' },
      { q: 'Which listed hardware eliminates the need for separate bonding jumpers at each module-to-racking connection?', a: ['Standard stainless steel hex bolts', 'Weeb clips or listed bonding washers designed to bite through anodized module frame surfaces', 'Aluminum rivets connecting the module frame to the rail', 'Tape-wrapped copper wire between module frames'], correct: 1, exp: 'Weeb clips and similar listed bonding hardware are designed to penetrate the anodized surface of aluminum module frames and racking, creating a reliable metal-to-metal bonding connection that is listed to UL 2703. Without listed bonding hardware, anodized surfaces can insulate the bond and require separate bonding jumpers.' },
      { q: 'A transformerless (string) inverter uses isolation monitoring (NEC 690.35) instead of a grounded conductor. What does the isolation monitor detect?', a: ['Module-level production imbalance between strings', 'Ground faults — a current path from the DC circuit to ground that would indicate insulation failure', 'Inverter transformer saturation causing harmonics', 'Rapid fluctuations in irradiance causing MPPT instability'], correct: 1, exp: 'In an ungrounded (transformerless) PV system, the isolation monitor continuously checks the impedance between the ungrounded DC conductors and ground. A low impedance (ground fault) triggers an alarm and system shutdown. This approach replaces the grounded conductor requirement and is how modern transformerless inverters achieve NEC compliance.' },
      { q: 'The PV disconnect required by NEC 690.13 must be located where?', a: ['Adjacent to the utility meter on the exterior of the building', 'At a readily accessible location that emergency responders can reach — with a "PV System Disconnect" label', 'Inside the inverter enclosure only', 'At the rooftop array junction box'], correct: 1, exp: 'NEC 690.13 requires the PV system disconnecting means to be at a location accessible to qualified personnel and first responders, clearly labeled "PV System Disconnect." In practice, this is often adjacent to the main electrical panel or on the exterior of the building for easy access.' },
      { q: 'For a combiner box with 4 strings, each having an Isc of 10A, what minimum ampacity is required for the output circuit conductors leaving the combiner?', a: ['40A (4 × 10A)', '50A (4 × 10A × 125%)', '48A (4 × 12A derated)', '44A (4 × 11A with temperature correction)'], correct: 1, exp: 'The maximum circuit current of the combiner output is 4 strings × 10A Isc = 40A. NEC 690.8 requires conductors rated at 125% of this: 40A × 1.25 = 50A minimum ampacity. This must then be further derated for conduit fill and ambient temperature per standard NEC ampacity tables.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 13 — STRING INVERTERS & POWER OPTIMIZERS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sinst-inverters',
    num: 13,
    title: 'String Inverters & Power Optimizers',
    desc: 'MPPT, grid-tie inverter topology, power optimizer operation, microinverters, and anti-islanding.',
    slides: [
      {
        title: 'Grid-Tie Inverter Operation & MPPT',
        body: [
          'A grid-tie (grid-direct) inverter converts DC power from the PV array into AC power synchronized with the utility grid — it cannot operate independently during a grid outage (to protect utility workers from backfeed), unless equipped with a battery and automatic transfer.',
          'Maximum Power Point Tracking (MPPT) is the inverter\'s algorithm for finding and following the maximum power point on the I-V curve — it continuously dithers the DC operating voltage and measures the resulting power to locate the MPP, which shifts with irradiance and temperature throughout the day.',
          'String inverters have one or more MPPT inputs, each connected to one or more strings of modules in series — multi-MPPT inverters (2–4 MPPT inputs) allow different strings with different orientations or tilts to be optimized independently.',
          'Inverter efficiency is the ratio of AC output power to DC input power — European Efficiency (weighted average across multiple irradiance levels) is more representative than CEC Weighted Efficiency or peak efficiency, which occurs only at high power levels.',
          'Transformerless inverters omit the isolation transformer, achieving higher efficiency (97–99%) and lighter weight vs. transformer-based designs (~93–96%) — they require isolation monitoring (per NEC 690.35) since there is no galvanic isolation between DC and AC sides.',
          'Grid frequency and voltage monitoring: if the grid voltage or frequency deviates outside UL 1741 / IEEE 1547 limits, the inverter must disconnect within prescribed time windows (anti-islanding protection) to prevent energizing a de-energized grid section.',
          'The inverter\'s DC voltage operating window (Vmin to Vmax) defines the string sizing constraint: string voltage at maximum temperature must exceed Vmin, and string voltage at minimum temperature must not exceed Vmax — both must be checked during system design.',
        ],
        keyPoints: [
          'Grid-tie inverter: converts DC to AC synchronized with grid; disconnects during outages (anti-islanding)',
          'MPPT continuously tracks the maximum power point as irradiance and temperature change throughout the day',
          'String voltage must stay between inverter Vmin (at max temp) and Vmax (at min temp) — both limits must be verified',
        ],
        quiz: [
          {
            q: 'Why does a standard grid-tie inverter stop producing power during a utility grid outage?',
            a: ['The inverter\'s battery backup depletes immediately during an outage', 'Anti-islanding protection disconnects the inverter to prevent backfeeding a de-energized utility line — protecting utility workers', 'The PV array cannot produce power without the grid\'s synchronization signal', 'The inverter\'s DC input fuses blow during the outage'],
            correct: 1,
            exp: 'Anti-islanding is a required safety function (UL 1741 / IEEE 1547). If a grid-tie inverter continued operating during a utility outage, it could energize a section of de-energized distribution line — creating an electrocution hazard for utility workers attempting to restore power. Inverters must detect the loss of the grid reference and disconnect within specified time windows.',
          },
          {
            q: 'A dual-MPPT string inverter has two separate MPPT inputs. A solar installer connects an east-facing 4-module string to Input 1 and a south-facing 6-module string to Input 2. What is the advantage of this configuration?',
            a: ['The south string will always produce more power and boost the east string', 'Each orientation can be independently tracked to its own MPP — the east string\'s morning peak and the south string\'s midday peak are separately optimized', 'The dual inputs double the maximum DC input voltage', 'Dual MPPT eliminates the need for rapid shutdown on both strings'],
            correct: 1,
            exp: 'Different orientations have different I-V curves at any given time. An east-facing string peaks in the morning while a south-facing string peaks at midday. With dual MPPT, each string is independently tracked — no shade mismatch or orientation mismatch forces one string to operate at a non-optimal point to accommodate the other.',
          },
        ],
      },
      {
        title: 'Power Optimizers & Microinverters',
        body: [
          'Power optimizers (DC-DC converters) are installed at each module and continuously track the module\'s individual MPP, then output a fixed DC voltage to the string — the central (or "hub") inverter handles the DC-to-AC conversion.',
          'SolarEdge\'s optimizer-plus-inverter architecture is the most widely deployed MLPE system: optimizers at each module enable per-module monitoring and de-shading, while the single inverter provides a single point of grid connection and monitoring.',
          'Microinverters (Enphase, AP Systems) convert DC to AC at each module — there is no string DC wiring longer than module-to-module; each microinverter is an independent grid-tie unit, and module-level monitoring is inherent.',
          'Module-level monitoring via MLPE provides a complete production map of each module — installers and homeowners can identify underperforming modules (shading, soiling, failure) before they significantly impact system revenue.',
          'Power optimizers enable safe-voltage operation: when not receiving the enable signal (from rapid shutdown or a disconnected inverter), the optimizers drop module output to 1V — this is how SolarEdge satisfies module-level RSD requirements.',
          'Microinverters provide built-in module-level RSD by shutting down their AC output when grid voltage is absent — since each module has its own inverter, the conductor from module to AC junction box carries AC at line voltage, not DC at high string voltage.',
          'The trade-offs: MLPE costs more per watt than a string inverter, adds complexity at the module level (more components, more potential failure points), but delivers better performance on complex rooftops and provides superior monitoring and warranty tracking capability.',
        ],
        keyPoints: [
          'Power optimizers: per-module DC-DC tracking, fixed DC output to a central inverter — SolarEdge is the dominant system',
          'Microinverters: full DC-to-AC at each module — no high-voltage DC string wiring; inherent module-level RSD',
          'MLPE enables per-module monitoring — identify underperforming modules instantly without a site visit',
        ],
        quiz: [
          {
            q: 'How does a SolarEdge power optimizer system satisfy NEC 690.12 rapid shutdown requirements for the rooftop conductors?',
            a: ['A separate RSD transmitter shuts down the central inverter only', 'When the RSD signal is activated, the optimizers drop module output to 1V, de-energizing the rooftop DC string conductors to a safe level', 'The system automatically calls SolarEdge support to enable shutdown', 'The optimizer physically disconnects the module leads using a relay'],
            correct: 1,
            exp: 'SolarEdge optimizers operate in "safe voltage" mode when the inverter is off or the RSD signal is received — they reduce their output to approximately 1V per module (well below the 30V RSD threshold). This de-energizes the string wiring between optimizers on the rooftop, satisfying the NEC 690.12 module-level RSD requirement.',
          },
          {
            q: 'A homeowner notices that one module on their Enphase microinverter system has been producing 0 kWh for 3 days while all others are normal. What is the most likely cause and best diagnostic step?',
            a: ['Check the string fuse in the combiner box for that section', 'Use the Enphase Enlighten monitoring portal to confirm the specific microinverter\'s status and fault code, then dispatch for physical inspection', 'Replace the central inverter — microinverter system faults are always caused by the central unit', 'Clean the panel — soiling causes complete module outage'],
            correct: 1,
            exp: 'Enphase Enlighten provides per-microinverter monitoring with fault codes — a zero-production module is immediately visible. The portal may show a specific fault (communication loss, AC fault, or internal fault). The installer checks remotely first before dispatching, which saves a truck roll if the issue is a connectivity problem resolvable through the app.',
          },
        ],
      },
    ],
    test: [
      { q: 'What is the function of MPPT (Maximum Power Point Tracking) in a solar inverter?', a: ['It regulates the output AC voltage to exactly 120V', 'It continuously adjusts the DC operating voltage to keep the array at its maximum power output point as irradiance and temperature change', 'It tracks the position of the sun and adjusts panel tilt accordingly', 'It monitors grid frequency and disconnects during an outage'], correct: 1, exp: 'MPPT is the algorithm that maximizes power harvest from the PV array. By continuously sweeping or perturbing the DC operating voltage and measuring the resulting power, the inverter finds and follows the maximum power point on the I-V curve throughout the day.' },
      { q: 'Anti-islanding protection in a grid-tie inverter is required because:', a: ['Islands of solar energy are less efficient than grid-connected energy', 'The inverter could backfeed a de-energized utility line, endangering utility workers restoring power', 'Islands of shade on the array reduce inverter efficiency', 'Without anti-islanding, the inverter cannot detect AC grid frequency'], correct: 1, exp: 'Anti-islanding disconnects the inverter when the grid is absent, preventing the solar system from energizing a section of the distribution network. Energized conductors that lineworkers believe are de-energized create a fatal electrocution hazard.' },
      { q: 'A string inverter\'s DC input window is 200V minimum to 500V maximum MPPT. A 10-module string has Vmp of 35V/module at STC. What is the string Vmp at STC, and is it within the inverter\'s window?', a: ['350V — within the 200–500V window', '300V — within the window', '350V — exceeds the 500V limit', '200V — at the lower limit only'], correct: 0, exp: '10 modules × 35V = 350V Vmp at STC. This is within 200–500V. However, the installer must also check maximum Voc at minimum temperature (vs. 500V limit) and minimum Vmp at maximum temperature (vs. 200V minimum). All three checks are required for proper string design.' },
      { q: 'What is the key difference between a power optimizer system (SolarEdge) and a microinverter system (Enphase)?', a: ['Power optimizers convert DC to AC at each module; microinverters convert AC back to DC for storage', 'Power optimizers perform DC-DC conversion at each module, sending fixed DC to a central inverter; microinverters convert DC to AC at each module individually', 'Microinverters require a combiner box; power optimizers do not', 'Power optimizers only work with battery storage; microinverters work with grid-tie only'], correct: 1, exp: 'Power optimizers are DC-DC converters — they track each module\'s MPP and output a regulated DC voltage to the string, which feeds a central inverter for DC-to-AC conversion. Microinverters perform the full DC-to-AC conversion at each module; the output is AC that aggregates on an AC branch circuit.' },
      { q: 'Which inverter efficiency metric is most representative of typical field performance across a range of irradiance conditions?', a: ['Peak efficiency (measured at full rated power)', 'CEC Weighted Efficiency (weighted across multiple power levels per CEC test)', 'European Weighted Efficiency (weighted for Central European irradiance distribution)', 'STC efficiency (measured at 1000 W/m² and 25°C)'], correct: 2, exp: 'European Weighted Efficiency weights inverter efficiency at six irradiance levels (5%, 10%, 20%, 30%, 50%, 100% of rated power) with weights reflecting typical Central European irradiance distribution. It captures the fact that inverters spend much of their operating time at part load, where efficiency can be lower. CEC weighted efficiency is similar but uses California irradiance weights.' },
      { q: 'A transformerless (non-isolated) grid-tie inverter achieves higher efficiency than a transformer-based inverter because:', a: ['It uses a higher DC bus voltage, reducing resistive losses', 'It eliminates the magnetic core and copper losses of the isolation transformer, typically adding 1–3% to peak efficiency', 'It uses thinner silicon wafers in the IGBT switching devices', 'It connects directly to the utility without an inverter stage'], correct: 1, exp: 'Isolation transformers in transformer-based inverters have core (iron) and copper (winding) losses that typically reduce efficiency by 1–3%. Removing the transformer allows transformerless inverters to achieve 97–99% peak efficiency vs. 93–96% for transformer-based designs. The trade-off is that without galvanic isolation, isolation monitoring (NEC 690.35) is required.' },
      { q: 'Per-module monitoring via MLPE provides which specific operational advantage?', a: ['Reduces inverter warranty period requirements', 'Allows identification of individual underperforming modules — due to shading, soiling, or failure — without a site visit', 'Eliminates the need for annual maintenance inspections', 'Allows the system to exceed the NEC 690.7 voltage limit for the duration of the monitoring period'], correct: 1, exp: 'MLPE monitoring (via Enphase Enlighten or SolarEdge monitoring portal) shows each module\'s daily production history. A module producing significantly less than its neighbors can be identified immediately and investigated — enabling targeted site visits rather than manual inspection of every module.' },
      { q: 'An installer configures a 3-MPPT string inverter with strings of different lengths on east, south, and west roof facets. What is the correct wiring approach?', a: ['Connect all strings to a single MPPT input — the inverter will compensate', 'Connect strings of each orientation to a separate MPPT input so each can be independently tracked', 'Connect the longest string to MPPT 1 and shorter strings to MPPT 2 and 3 regardless of orientation', 'Mix orientations on each MPPT to balance power across inputs'], correct: 1, exp: 'Each orientation has a different irradiance profile throughout the day — connecting them to separate MPPT inputs allows the inverter to independently maximize power from each orientation. Mixing orientations on one MPPT input forces all strings on that input to operate at the same DC voltage, causing mismatch losses when one orientation is in shade and another is in full sun.' },
      { q: 'Which scenario would cause a grid-tie string inverter to report a "ground fault" and shut down?', a: ['High wind loading on the racking system causes a module frame to contact ground', 'A module becomes partially shaded, reducing string current', 'The utility grid voltage drops by 5% during peak demand', 'The inverter reaches its maximum ambient temperature rating'], correct: 0, exp: 'A ground fault occurs when a current-carrying DC conductor makes an unintended connection to ground or grounded metal. Module frame contact with a ground path creates a ground fault detectable by the inverter\'s isolation monitor or GFPD. The inverter shuts down and logs a fault code to prevent continued arc heating at the fault point.' },
      { q: 'Why must a solar installer verify BOTH the minimum and maximum string voltage against the inverter\'s DC input specifications?', a: ['The minimum voltage check ensures the inverter starts in the morning; the maximum voltage check ensures the modules aren\'t overloaded', 'Maximum string Voc at minimum temperature must not exceed the inverter\'s absolute maximum DC input voltage; minimum string Vmp at maximum temperature must exceed the inverter\'s minimum MPPT window voltage', 'Minimum voltage applies to AC-coupled battery systems only; maximum voltage applies to all string inverters', 'The inverter will automatically clamp voltage — these checks are optional but good practice'], correct: 1, exp: 'Two separate failure modes: (1) If max Voc (at record low temp) exceeds the inverter\'s absolute maximum DC voltage, the inverter can be permanently damaged or a protection device trips. (2) If Vmp at max operating temperature falls below the inverter\'s minimum MPPT voltage, the inverter loses lock on the string and production drops to zero. Both must be checked at design time.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 14 — BATTERY STORAGE SYSTEMS & NEC 706
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sinst-battery',
    num: 14,
    title: 'Battery Storage Systems & NEC 706',
    desc: 'AC-coupled vs. DC-coupled storage, LiFePO4 chemistry, NEC Article 706, and backup operation.',
    slides: [
      {
        title: 'Battery Storage Configurations',
        body: [
          'AC-coupled storage: the solar inverter converts PV DC to AC, the grid or loads use the AC, and a separate bidirectional battery inverter/charger converts AC to DC for charging the battery and back to AC for discharge — each conversion step carries efficiency losses.',
          'DC-coupled storage: a DC-DC charge controller or hybrid inverter routes DC directly from the PV array to the battery without an AC conversion step — higher round-trip efficiency but requires the solar and battery DC voltages to be compatible.',
          'Hybrid inverters (SolarEdge Energy Hub, Solaria, SunPower Equinox, Franklin Electric APsystems) combine a string inverter with a bidirectional battery inverter — both PV and battery connect on the DC bus; a single AC connection to the grid and loads simplifies installation.',
          'Self-consumption mode prioritizes solar power to loads, charges the battery with excess solar, and only draws from the grid when both solar and battery are insufficient — the most common homeowner operating mode.',
          'Backup (island mode) operation requires an automatic transfer switch (ATS) or a hybrid inverter with integrated transfer capability — when the grid fails, the inverter disconnects from the grid and forms an autonomous AC microgrid powered by the battery and any available solar.',
          'The solar self-sufficiency metric measures what fraction of total energy consumption is supplied by the solar+storage system — a well-sized system in a sunny climate can achieve 80–95% self-sufficiency; full self-sufficiency requires oversizing both solar and storage.',
          'Virtual power plant (VPP) enrollment allows homeowners with storage to sell grid services (demand response, frequency regulation) back to the utility through a software platform — an emerging revenue stream for residential battery owners.',
        ],
        keyPoints: [
          'AC-coupled: solar and battery have separate inverters; flexible but lower efficiency due to double conversion',
          'DC-coupled / hybrid: PV and battery share a DC bus with single AC conversion — more efficient for new installs',
          'Backup operation requires transfer switch or integrated hybrid inverter; grid-tied systems shut down without it',
        ],
        quiz: [
          {
            q: 'In an AC-coupled battery storage system, what energy conversions occur when excess solar power charges the battery?',
            a: ['PV DC → battery DC (one conversion)', 'PV DC → AC (solar inverter) → battery DC (battery inverter) — two conversions', 'PV DC → AC (grid) → battery DC → AC (loads) — three conversions', 'No conversion required — AC and DC are equivalent for storage purposes'],
            correct: 1,
            exp: 'AC-coupled systems require: PV DC → AC via the solar inverter, then AC → DC via the battery inverter/charger to store in the battery. On discharge, another conversion occurs: battery DC → AC. Each conversion step loses 3–5% efficiency. The round-trip efficiency of AC coupling is approximately 85–90% vs. 93–96% for DC coupling.',
          },
          {
            q: 'A homeowner has a grid-tied solar system without battery storage and wants backup power during outages. The minimum additional equipment required is:',
            a: ['A second solar inverter for backup mode', 'A battery system with a bidirectional inverter and automatic transfer switch capability', 'A transfer switch connected to the solar panels directly', 'A larger solar array to produce more power than the home consumes'],
            correct: 1,
            exp: 'Standard grid-tied inverters have anti-islanding protection that prevents them from operating during grid outages — even with abundant solar production. Adding a battery system with a hybrid inverter (or battery inverter plus ATS) allows the solar+battery system to form an island and power selected loads when the grid is unavailable.',
          },
        ],
      },
      {
        title: 'LiFePO4 Chemistry & NEC Article 706',
        body: [
          'Lithium iron phosphate (LiFePO4 or LFP) is the dominant chemistry for residential storage: it is thermally stable (no thermal runaway at normal operating temperatures unlike NMC), has a 3,000–6,000+ cycle life at 80% depth of discharge, and a 10+ year design life.',
          'Lithium NMC (nickel-manganese-cobalt) batteries — used in Tesla Powerwall 2 — have higher energy density but greater thermal runaway risk; robust battery management systems (BMS) are essential for safe operation.',
          'The BMS (Battery Management System) monitors individual cell voltages, temperatures, and current; balances cells; prevents overcharge (above ~3.65V/cell for LFP) and over-discharge (below ~2.5V/cell); and communicates with the inverter to regulate charge/discharge rates.',
          'Depth of discharge (DoD) is the fraction of the battery\'s rated capacity used in a single cycle — most residential storage warranties are based on a specific cycle count at a specific DoD (e.g., 6,000 cycles at 80% DoD); shallower discharge cycles extend cycle life.',
          'NEC Article 706 covers energy storage systems — it governs installation requirements for battery systems including disconnecting means, overcurrent protection, ventilation (particularly for lead-acid and failing lithium), working clearances, and labeling requirements.',
          'Energy Storage System (ESS) enclosures must include a disconnecting means accessible to emergency responders, and the system must be listed to UL 9540 (standard for energy storage systems); individual battery modules should be listed to UL 9540A (fire safety testing).',
          'Thermal management is critical for lithium batteries: most residential systems include active or passive cooling to maintain cells in the 60–95°F (15–35°C) optimal operating range — operation outside this range reduces capacity and cycle life.',
        ],
        images: [
          { src: '/diagrams/lfp-nec706-battery-safety.svg', alt: 'Comparison diagram of LiFePO4 versus NMC battery chemistry safety, BMS protective functions, and NEC Article 706 energy storage system requirements including UL 9540 listing', caption: 'Why LFP became the residential standard, what the BMS protects against, and what NEC 706 requires of the installation.' },
        ],
        keyPoints: [
          'LiFePO4 (LFP): thermally stable, 3,000–6,000+ cycle life, industry standard for residential storage safety',
          'BMS is mandatory — protects cells from overcharge, over-discharge, over-temperature, and manages state-of-charge reporting',
          'NEC 706: ESS must have accessible disconnect, UL 9540 listing, proper ventilation, and working clearances',
        ],
        quiz: [
          {
            q: 'What is the primary safety advantage of LiFePO4 (LFP) chemistry over lithium NMC in residential battery storage?',
            a: ['LFP has higher energy density, allowing smaller enclosures', 'LFP is thermally stable — it does not undergo thermal runaway under normal abuse conditions, unlike NMC which can enter thermal runaway if overcharged or mechanically damaged', 'LFP requires no battery management system (BMS)', 'LFP batteries can be installed outdoors without enclosures'],
            correct: 1,
            exp: 'LFP\'s olivine crystal structure is thermally stable — even under overcharge, external heat, or internal short conditions, it does not release oxygen and does not exhibit the rapid exothermic reaction (thermal runaway) that NMC and NCA chemistries can exhibit. This makes LFP significantly safer for occupied residential environments.',
          },
          {
            q: 'Per NEC Article 706, an Energy Storage System (ESS) must include which safety feature accessible to emergency responders?',
            a: ['A manual cell balancing port on each battery module', 'A readily accessible disconnecting means that can safely de-energize the system', 'A permanent fire suppression system in the battery enclosure', 'A live-monitoring SIM card for remote shutdown'],
            correct: 1,
            exp: 'NEC 706.15 requires a disconnecting means for the ESS that is readily accessible to emergency responders. This allows fire departments to safely de-energize the battery system during a structural fire without needing to locate hidden controls. The disconnect must be clearly labeled per NEC 706.10.',
          },
        ],
      },
    ],
    test: [
      { q: 'Which battery chemistry is the industry standard for residential solar-plus-storage due to its thermal stability and long cycle life?', a: ['Lithium NMC (nickel-manganese-cobalt)', 'Lithium NCA (nickel-cobalt-aluminum)', 'Lithium Iron Phosphate (LiFePO4 / LFP)', 'Lead-acid (flooded or AGM)'], correct: 2, exp: 'LiFePO4 (LFP) is the dominant chemistry in residential storage products from Sonnen, BYD, Panasonic EverVolt, and others. Its thermal stability, 3,000–6,000+ cycle life, and non-toxic chemistry make it the preferred choice for occupied residential installations.' },
      { q: 'In a DC-coupled solar-plus-storage system, what is the primary efficiency advantage over AC coupling?', a: ['DC coupling uses thicker conductors, reducing resistive losses', 'PV energy charges the battery with only one DC-DC conversion, avoiding the double conversion (DC→AC→DC) required in AC-coupled systems', 'DC-coupled systems use higher-efficiency module types', 'DC coupling eliminates the need for a battery management system'], correct: 1, exp: 'AC coupling requires PV DC → AC (inverter) → DC (battery charger) — two conversion steps before energy reaches the battery. DC coupling routes DC directly from PV to battery via a DC-DC charge controller or hybrid inverter, eliminating one conversion step and improving round-trip efficiency from ~85% (AC) to ~93–96% (DC).' },
      { q: 'NEC Article 706 governs which type of installation?', a: ['Photovoltaic source circuits and arrays', 'Energy storage systems (batteries) connected to PV or the grid', 'Fuel cell power systems', 'Wind electric systems'], correct: 1, exp: 'NEC Article 706 specifically covers stationary energy storage systems — batteries and other storage technologies used with solar, wind, or the grid. PV arrays are covered by Article 690; fuel cells by Article 692; wind by Article 694.' },
      { q: 'A residential LFP battery system is rated for 6,000 cycles at 80% depth of discharge. If the homeowner cycles the battery once per day at 80% DoD, approximately how many years does this represent?', a: ['6.2 years', '8.2 years', '16.4 years', '20 years'], correct: 2, exp: '6,000 cycles ÷ 365 cycles/year = 16.4 years. At one full cycle per day at the rated DoD, the battery achieves its rated cycle count in about 16 years. Shallower daily cycles (50% DoD or less) would extend this further.' },
      { q: 'The BMS (Battery Management System) primarily protects the battery from which conditions?', a: ['Lightning surges on the AC grid side', 'Overcharge (too high voltage), over-discharge (too low voltage), over-temperature, and excess current', 'Grid frequency deviations above 60.2 Hz', 'Rapid shutdown activation by the solar inverter'], correct: 1, exp: 'The BMS monitors individual cell voltages and temperatures in real time. It prevents overcharge (which degrades or damages lithium cells), over-discharge (which can permanently reduce capacity), overtemperature (which accelerates degradation or causes safety incidents), and excessive charge/discharge current.' },
      { q: 'A Tesla Powerwall 2 (NMC chemistry) catches fire in a garage. What is the key hazard that makes lithium NMC battery fires particularly dangerous compared to lead-acid?', a: ['NMC batteries produce hydrogen sulfide gas during a fire', 'NMC thermal runaway is self-sustaining and releases oxygen from the cathode, intensifying the fire and making water suppression ineffective', 'NMC batteries create a thick white smoke that disables fire suppression systems', 'NMC fires always cause an explosion within 60 seconds of ignition'], correct: 1, exp: 'NMC cathode materials release oxygen during thermal runaway, creating a self-sustaining, oxygen-rich fire that cannot be extinguished by smothering. Water is the recommended suppression agent to cool the cell and prevent thermal runaway propagation to adjacent cells. Fire departments follow specific lithium-ion fire protocols.' },
      { q: 'What does a depth of discharge (DoD) of 80% mean for a 10 kWh battery system?', a: ['The battery must always maintain 80% state of charge', 'The battery can discharge 8 kWh (80% of capacity) before reaching its minimum safe voltage', 'The battery charges to 80% of nameplate capacity before terminating charge', 'The battery efficiency is 80% across the full charge-discharge cycle'], correct: 1, exp: 'DoD is the fraction of rated capacity discharged in a cycle. At 80% DoD, a 10 kWh battery delivers 8 kWh before the BMS limits further discharge to protect cell longevity. Most manufacturer warranties specify the guaranteed cycle count at a specific DoD — operating at shallower DoD extends cycle life.' },
      { q: 'Per NEC 706, energy storage systems must be listed to which UL standard?', a: ['UL 1741 (inverters)', 'UL 9540 (energy storage systems)', 'UL 1699 (arc-fault circuit interrupters)', 'UL 508A (industrial control panels)'], correct: 1, exp: 'UL 9540 is the safety standard for energy storage systems and equipment. It covers electrical, mechanical, and environmental requirements for complete ESS systems. UL 9540A tests the fire safety of battery cells and modules under thermal runaway conditions — both listings are increasingly required by AHJs.' },
      { q: 'A hybrid solar-plus-storage inverter (e.g., SolarEdge Energy Hub) operates in self-consumption mode. When PV production exceeds home consumption and the battery is full, what happens to excess energy?', a: ['The system shuts down solar production', 'Excess energy is exported to the grid (if grid-tie is permitted by the utility interconnection agreement)', 'Excess energy is dissipated as heat in a dump load resistor', 'The hybrid inverter reduces PV output by curtailing MPPT'], correct: 1, exp: 'In self-consumption mode with an interconnection agreement allowing export, excess solar beyond battery capacity is exported to the grid. If the interconnection limits export (zero-export configuration), the inverter curtails (clips) PV output via MPPT control to prevent export — the system matches production to load plus battery charge rate.' },
      { q: 'Which residential battery storage product uses LFP (lithium iron phosphate) chemistry?', a: ['Tesla Powerwall 2 (NMC chemistry)', 'LG Chem RESU (NMC chemistry)', 'Sonnen Eco and BYD Battery-Box (LFP chemistry)', 'Generac PWRcell (NMC chemistry)'], correct: 2, exp: 'Sonnen (sonnenbatterie eco series) and BYD (Battery-Box series) are well-known LFP-based residential systems, emphasizing the safety and longevity advantages of LFP. Tesla Powerwall 2 uses NMC; Powerwall 3 transitioned to LFP. LG RESU used NMC in older models.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 15 — MOUNTING, RACKING & COMMISSIONING
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sinst-mounting',
    num: 15,
    title: 'Mounting, Racking & System Commissioning',
    desc: 'Roof attachment methods, structural loading, conduit and wiring methods, and commissioning procedures.',
    slides: [
      {
        title: 'Roof Attachment & Structural Loading',
        body: [
          'Lag bolt roof attachments (flashed standoffs) are the standard method for asphalt shingle roofs — the lag bolt must penetrate at least 2.5 inches into solid rafter wood (not OSB sheathing alone) to develop the required pullout strength for wind uplift loads.',
          'Roof penetrations must be properly flashed: the standoff base plate slides under the shingle course above (or uses a code-compliant flashing kit) to direct water away from the penetration — improper flashing causes roof leaks that void roofing warranties.',
          'Solar array structural loading includes dead load (module and racking weight, typically 3–5 psf), snow load (varies by climate zone, 0–50+ psf), and wind uplift (suction force on the underside of modules — often the governing load in high-wind areas).',
          'Racking manufacturers provide pre-engineered systems with published load tables — the installer selects span (rail spacing), module attachment hardware, and standoff spacing to stay within the system\'s rated load envelope without requiring a site-specific engineering stamp.',
          'For tile roofs (concrete or clay), dedicated tile replacement flashings or hook-mount systems maintain the tile\'s aesthetic while providing a structurally sound penetration — drilling through tiles risks cracking and water infiltration.',
          'Flat roofs (commercial) use ballasted racking (no penetrations, weighted with concrete blocks) or mechanically attached systems — ballasted systems must be assessed for roof membrane loading and wind requirements using aerodynamic models.',
          'The electrical conduit runs from the roof array down to the inverter location: rooftop conduit must be EMT or rigid metal conduit (RMC) exposed on the roof surface in most jurisdictions; PVC conduit is acceptable only where specifically allowed by the AHJ.',
        ],
        images: [
          { src: '/diagrams/roof-attachment-structural-loading.svg', alt: 'Diagram comparing asphalt shingle, tile, and flat-roof attachment methods, the three structural loads racking must survive, pre-engineered load tables, and the two most common field mistakes', caption: 'Every roof penetration is a structural and waterproofing decision — attachment method, load, and the callbacks they prevent.' },
        ],
        keyPoints: [
          'Lag bolts must penetrate 2.5" into solid rafter wood — OSB sheathing alone is insufficient for wind uplift resistance',
          'Flash every roof penetration correctly — improper flashing is the leading cause of post-installation roof leaks and homeowner disputes',
          'Racking load tables allow pre-engineered systems without custom engineering — stay within published span and load limits',
        ],
        quiz: [
          {
            q: 'A solar installer drills lag bolts for standoffs on a composition shingle roof but only achieves 1 inch of penetration into the rafter due to the rafter being narrower than expected. What is the correct action?',
            a: ['Proceed — 1 inch is sufficient for residential wind loads', 'Apply construction adhesive to supplement the lag bolt\'s pullout strength', 'Relocate the standoff to a position where full 2.5" penetration into solid rafter can be achieved', 'Use a longer lag bolt and fill the gap with roofing foam'],
            correct: 2,
            exp: 'Minimum rafter penetration depth (typically 2.5") is a structural requirement for wind uplift resistance. Insufficient penetration can result in standoffs pulling out under high wind, causing module damage, roof damage, and potentially a falling hazard. The standoff must be relocated to a rafter location where full penetration can be achieved.',
          },
          {
            q: 'Which conduit type is typically required for solar PV wiring runs on a rooftop surface in most US jurisdictions?',
            a: ['Schedule 40 PVC (UV-rated)', 'EMT (electrical metallic tubing) or rigid metal conduit (RMC)', 'Liquid-tight flexible conduit (LFMC) throughout the rooftop run', 'No conduit required — USE-2 cable can run loose on the roof surface'],
            correct: 1,
            exp: 'NEC 300.5 and local AHJ requirements generally require EMT or RMC for exposed conduit on rooftops, where protection from physical damage, UV, and heat is important. PVC can exceed thermal ratings in direct summer sun on a dark roof surface and may not be acceptable in all jurisdictions. AHJ inspection is required before energizing.' },
        ],
      },
      {
        title: 'Commissioning, Inspection & Monitoring Setup',
        body: [
          'Pre-commissioning inspection: verify all module connections are tight, correct polarity of strings (positive and negative clearly marked), no visible damage to modules, conduit and wire management complete, and all grounding/bonding hardware properly installed per design.',
          'Open-circuit voltage measurement: before connecting the string to the combiner or inverter, measure Voc of each string with a calibrated multimeter — verify the measured value is within ±5% of the calculated maximum string Voc at the current outdoor temperature and irradiance.',
          'Short-circuit current measurement: connect an amp clamp or use a dedicated PV analyzer to measure Isc of each string — verify it matches the expected value (module Isc × correction factor for measured irradiance vs. STC).',
          'Inverter commissioning: follow manufacturer sequence — power on DC disconnect first, verify DC input voltage is within range, then close AC disconnect, confirm grid synchronization, verify operating parameters (MPPT voltage, AC output voltage, frequency) in the monitoring portal.',
          'String polarity check: before connecting to the combiner box, verify string polarity at the combiner input — connecting a string in reverse polarity will cause a short circuit through the bypass diodes and can damage modules or combiner components.',
          'The AHJ (Authority Having Jurisdiction) inspection must occur and receive a green tag before the utility interconnection meter is set — operating a solar system prior to AHJ inspection and utility permission is a code violation and can result in forced disconnection.',
          'Monitoring system activation: register the system with the manufacturer monitoring platform (Enphase Enlighten, SolarEdge monitoring portal, or inverter-native monitoring), verify all strings or module-level devices appear online, and provide the homeowner with dashboard access.',
        ],
        images: [
          { src: '/diagrams/pv-commissioning-checklist.svg', alt: 'Diagram of the four-step pre-commissioning verification sequence, the inverter commissioning order, the AHJ inspection to utility PTO sequence, monitoring activation, and how to read post-install anomalies', caption: 'Verify before you energize — the four-step check sequence and the AHJ-to-PTO gate before grid connection.' },
        ],
        keyPoints: [
          'Measure open-circuit Voc and short-circuit Isc for each string before energizing — verify against calculated values',
          'Never connect a string in reverse polarity — verify with a meter before landing wires in the combiner or inverter',
          'AHJ inspection and utility PTO (Permission to Operate) required before energizing the grid-connected system',
        ],
        quiz: [
          {
            q: 'A solar installer measures the open-circuit voltage of a 10-module R-410A... wait — measures the open-circuit voltage of a 10-module string (module Voc = 42.5V at STC) on a hot summer day when ambient temperature is 38°C. The measured Voc is 375V. Is this expected?',
            a: ['No — the string is underperforming, indicating a failed module', 'Yes — hot weather reduces Voc below the STC value; 375V is consistent with the temperature coefficient reducing 10 × 42.5V = 425V at STC', 'No — Voc should always equal exactly the STC value', 'No — Voc should be higher on a hot day because irradiance is higher'],
            correct: 1,
            exp: '10 modules × 42.5V STC = 425V at STC (25°C). At 38°C ambient, cell temperature might be ~55–65°C. At –0.28%/°C × 35°C above STC = ~10% Voc reduction. 425V × 0.90 ≈ 382V. Measured 375V is close — consistent with hot weather. Voc decreases as temperature rises; this is expected behavior, not a failure.',
          },
          {
            q: 'Before the utility company will set the interconnection meter and authorize a new solar system to export, what documentation is typically required from the installer?',
            a: ['A letter from the inverter manufacturer certifying installation quality', 'The signed AHJ inspection approval (green tag or equivalent) and the approved interconnection application', 'Only the homeowner\'s signature on the final invoice', 'A third-party safety audit from a licensed electrical engineer'],
            correct: 1,
            exp: 'Utilities require: (1) an approved interconnection application (submitted and approved before installation begins in most programs), and (2) proof of AHJ inspection passing (green tag, certificate of completion, or final inspection sign-off). Together these confirm the installation is both code-compliant and utility-approved before Permission to Operate (PTO) is granted.',
          },
        ],
      },
    ],
    test: [
      { q: 'What is the minimum required penetration depth for a lag bolt standoff into a roof rafter for a residential solar installation?', a: ['1.0 inch', '1.5 inches', '2.0 inches', '2.5 inches'], correct: 3, exp: 'A minimum 2.5" penetration into solid rafter wood (not sheathing) is the industry standard required by racking manufacturer engineering and most AHJs. This depth develops the pullout strength needed to resist wind uplift forces on the array.' },
      { q: 'Which roof type typically uses ballasted racking (no roof penetrations)?', a: ['Asphalt shingle residential roofs', 'Clay tile commercial roofs', 'Standing seam metal roofs', 'Flat commercial roofs (TPO, EPDM membrane)'], correct: 3, exp: 'Flat commercial roofs with membrane systems often use ballasted racking — weighted with concrete pavers — that distributes load across the membrane surface without penetrations. This preserves the roof warranty and avoids leak risk. Wind engineering is required to verify adequate ballast for the specific location.' },
      { q: 'Before connecting strings to the combiner box during commissioning, the installer should verify:', a: ['That the inverter is powered on and in standby mode', 'The polarity (positive and negative) of each string using a multimeter before connecting wires', 'That all modules have been registered in the monitoring portal', 'That the utility PTO (Permission to Operate) has been received'], correct: 1, exp: 'Reverse polarity at the combiner input causes a short circuit through the module bypass diodes, potentially destroying them and the combiner fuse. Always verify positive and negative wire polarity with a multimeter before landing wires in the combiner. Mark each string wire clearly before landing.' },
      { q: 'An installer measures an open-circuit voltage of 0V on a 6-module string that should read approximately 240V. What is the most likely cause?', a: ['The inverter MPPT algorithm has not locked on yet', 'One module in the series string is disconnected or has a failed connector, breaking the series circuit', 'The string Voc is within the inverter\'s minimum MPPT voltage threshold', 'The modules are shaded by clouds, reducing voltage to zero'], correct: 1, exp: 'In a series string, all modules must be connected for current and voltage to be produced. A single disconnected module (failed MC4 connector, broken wire) breaks the series circuit, dropping string voltage to 0V. Clouds reduce irradiance and lower voltage but do not bring it to zero — the string would still show a reduced Voc under overcast conditions.' },
      { q: 'What does "PTO" stand for in the context of solar interconnection, and when is it issued?', a: ['Power Transfer Override — issued when the system exceeds the utility\'s power limit', 'Permission to Operate — issued by the utility after AHJ inspection and interconnection approval, authorizing the system to operate and export to the grid', 'Preliminary Test Order — issued before the final inspection', 'Power Takeoff Operation — used for battery charging only'], correct: 1, exp: 'Permission to Operate (PTO) is the utility\'s formal authorization for the system to connect to the grid and export power. It is issued after: the interconnection application is approved, the system is installed, and the AHJ inspection passes. Operating before PTO can result in forced disconnection and contract penalties.' },
      { q: 'Which flashing method is required at lag bolt standoffs on an asphalt shingle roof to prevent water infiltration?', a: ['Apply roofing tar around the standoff base and re-shingle over it', 'Use a listed flashing kit where the base plate slides under the course of shingles above the standoff, directing water away from the penetration', 'Seal with silicone caulk on top of the shingles surrounding the standoff', 'No flashing is required if the standoff base plate is watertight'], correct: 1, exp: 'Proper flashing is critical: the base plate must slide under the shingle course immediately above the standoff so water running down the roof flows over the plate, not into the penetration. Tar or caulk alone can crack and fail within a few years. Many roofing manufacturers specify that improper flashing voids the roof warranty.' },
      { q: 'After commissioning a new solar system, the monitoring portal shows modules 4, 8, and 12 producing approximately 30% less than adjacent modules. What is the most likely cause?', a: ['The inverter MPPT algorithm is throttling every third module for efficiency', 'Those three modules are from a different manufacturing batch with lower efficiency', 'Partial shading from an obstruction, bird droppings, or soiling affecting those specific locations', 'Random variation — module output naturally varies by up to 40%'], correct: 2, exp: 'When specific non-adjacent modules show consistently lower production, the most common cause is a physical condition at those module locations: partial shading (antenna shadow, HVAC equipment, vent pipe shadow pattern), soiling (bird droppings), or a localized defect. A site visit to inspect those specific modules is warranted.' },
      { q: 'Which organization provides the Authority Having Jurisdiction (AHJ) permit and inspection for a residential solar installation?', a: ['The utility interconnecting to the system', 'The local building department or electrical inspection department', 'The inverter manufacturer\'s field service team', 'NREL (National Renewable Energy Laboratory)'], correct: 1, exp: 'The AHJ is the local building or electrical inspection authority — city, county, or state building department. They review the permit application (plans, specifications, equipment listings), conduct mid-installation inspections if required, and issue a final approval (green tag or certificate of occupancy) when the installation meets code.' },
      { q: 'An installer uses a clamp meter to measure Isc of a 6-module string under clear-sky conditions (measured irradiance: 950 W/m²). The module Isc at STC is 10A. What is the expected measured Isc?', a: ['10A (STC Isc regardless of conditions)', '9.5A (Isc is proportional to irradiance: 950/1000 × 10A)', '9.0A (temperature derating applies to Isc as well)', '8.5A (combined irradiance and temperature derating)'], correct: 1, exp: 'Isc is directly proportional to irradiance. At 950 W/m² vs. 1000 W/m² at STC: 950/1000 × 10A = 9.5A. Note that Isc is nearly unaffected by temperature (the coefficient is small and positive), so the main correction for Isc in the field is the irradiance ratio.' },
      { q: 'How should rooftop PV wiring be protected where it exits the array wire management and enters a rooftop junction box?', a: ['Use UV-rated zip ties to hold cables in place — no additional protection required', 'Install conduit or cable protection from the last module MC4 connector to the junction box; protect all exposed wiring from UV, physical damage, and abrasion', 'Leave wiring loose under the modules where shade prevents UV degradation', 'Use tape to bundle wires — UV tape is code compliant for rooftop exposure'], correct: 1, exp: 'NEC 690 and manufacturer guidelines require wiring between array sections and junction boxes to be protected from UV and physical damage. MC4 wire-to-wire connections between modules are listed for direct burial and UV exposure; wiring transitioning to conduit must enter the conduit with approved fittings and strain relief.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 16 — NABCEP & SOLAR CAREER PATH
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sinst-nabcep',
    num: 16,
    title: 'NABCEP Certification & Solar Career Path',
    desc: 'NABCEP PV Associate and Installer credentials, state licensing, sales and design tools, and career progression.',
    slides: [
      {
        title: 'NABCEP Credentials & Solar Industry Standards',
        body: [
          'NABCEP (North American Board of Certified Energy Practitioners) is the leading credentialing organization for solar and renewable energy professionals — the PV Installation Professional (PVIP) and PV Associate credentials are industry standards recognized by utilities, EPCs, and residential installers.',
          'NABCEP PV Associate is an entry-level credential: open to anyone who completes an accredited PV training course or equivalent experience — it validates foundational knowledge of PV system design, installation, and codes without requiring field experience.',
          'NABCEP PV Installation Professional (PVIP) requires documented field experience (minimum 58 hours of installing PV systems) plus passing an advanced examination — it is the credential that distinguishes experienced installers and is often required by employers and large contractors.',
          'NABCEP continuing education (CE) is required to maintain certification: 18 CE hours every 3 years for PVIP — covering technical updates, code changes (NEC revision cycles), new technology, and safety topics.',
          'NABCEP certifications are not licenses — they are voluntary professional credentials. Electrical licensing requirements for solar installations vary by state: some states require a licensed electrician for all DC and AC wiring; others allow a roofing or general contractor to install while a licensed electrician handles the electrical connections.',
          'IREC (Interstate Renewable Energy Council) accredits solar training programs — attending an IREC-accredited program is one pathway to NABCEP PV Associate eligibility and signals to employers that training meets recognized quality standards.',
          'The Solar Energy Industries Association (SEIA) publishes the Solar Market Insight report quarterly — the leading industry data source for US solar installations by state, market segment, and technology type.',
        ],
        keyPoints: [
          'NABCEP PV Associate: entry-level, knowledge-based — requires accredited training, no experience minimum',
          'NABCEP PVIP: advanced installer credential — requires 58+ hours field experience and passing a comprehensive exam',
          'NABCEP ≠ electrical license — state licensing for solar varies; verify your state\'s requirements before pulling permits',
        ],
        quiz: [
          {
            q: 'What is the minimum field installation experience required to apply for the NABCEP PV Installation Professional (PVIP) credential?',
            a: ['No experience required — the exam alone qualifies', '20 hours of supervised installations', '58 hours of documented PV installation experience', '2 years of full-time employment as a solar installer'],
            correct: 2,
            exp: 'The NABCEP PVIP requires 58 documented hours of hands-on PV installation experience across a minimum of 10 PV system installations, plus passing the PVIP examination. The experience requirement ensures the credential represents actual field competence, not just academic knowledge.',
          },
          {
            q: 'A solar company in a state that requires a licensed electrician for all solar electrical work hires a non-licensed NABCEP PVIP-certified technician to connect a new residential system. Is this compliant?',
            a: ['Yes — NABCEP PVIP is equivalent to an electrical license in all states', 'No — in states requiring a licensed electrician, NABCEP certification is a professional credential but not a substitute for a state electrical license', 'Yes — as long as the NABCEP holder works under a licensed contractor\'s supervision on the permit', 'Yes — NABCEP PVIP holders are exempt from state electrical licensing under the Energy Policy Act'],
            correct: 1,
            exp: 'NABCEP credentials are voluntary professional certifications — not state electrical licenses. In states requiring a licensed electrician for solar PV electrical work, only a holder of the state\'s electrician license (or general/electrical contractor\'s license) may perform or oversee that work. Supervising alone may not satisfy the requirement depending on the state.',
          },
        ],
      },
      {
        title: 'Solar Sales, Design Tools & Career Progression',
        body: [
          'Aurora Solar and OpenSolar are cloud-based solar design and proposal tools that use LiDAR rooftop data, satellite imagery, and shade analysis to automatically generate system designs, shading reports, and financial proposals — the industry-standard sales tools for residential installers.',
          'A solar proposal typically includes: annual production estimate (kWh/year from PVWatts or the design tool), utility bill offset percentage, system cost, federal ITC (Investment Tax Credit — 30% through 2032), state incentives, net metering export rate, payback period, and 25-year savings projection.',
          'The federal Investment Tax Credit (ITC) allows homeowners to claim 30% of total solar system costs (including battery if charged by solar ≥ 50%) as a credit against their federal income tax — it is a credit, not a deduction; it directly reduces taxes owed dollar for dollar.',
          'Net metering credits homeowners for excess solar exported to the grid at either the retail rate (1:1 net metering) or a lower export rate depending on the state utility — the value of net metering is a critical input to financial projections.',
          'Solar career pathways: Installer trainee → Journeyman installer (NABCEP PV Associate) → Lead installer/crew chief (NABCEP PVIP) → System designer → Project manager → Sales engineer → Solar contractor/business owner.',
          'The O&M (operations and maintenance) segment is a growing specialty: monitoring remote utility-scale and commercial systems, identifying underperforming strings, scheduling preventive cleaning and inspection, and replacing failed inverters or optimizers — requiring both technical knowledge and remote monitoring platform proficiency.',
          'Energy storage integration is the fastest-growing technical specialty: solar-plus-storage systems require knowledge of battery technology, hybrid inverters, demand charge management, time-of-use optimization, and virtual power plant (VPP) participation — commanding premium wages.',
        ],
        keyPoints: [
          'Federal ITC = 30% tax credit on total system cost (including battery charged by solar) — credit directly reduces taxes owed',
          'Aurora Solar and PVWatts are the primary production estimate and proposal tools — LiDAR shading analysis improves accuracy',
          'Solar career path: installer → lead installer (PVIP) → designer → project manager → contractor; storage is the premium specialty',
        ],
        quiz: [
          {
            q: 'A homeowner installs an 8 kW solar system for $24,000 and a 10 kWh battery system for $12,000 (charged exclusively by solar). What federal ITC credit amount can they claim?',
            a: ['$7,200 (30% of solar only)', '$10,800 (30% of total $36,000)', '$3,600 (30% of battery only)', '$12,000 (50% ITC for combined systems)'],
            correct: 1,
            exp: 'The federal ITC (30% through 2032) applies to the total installed cost including a battery if the battery is charged by solar power ≥50% of the time. Total cost = $24,000 + $12,000 = $36,000. 30% × $36,000 = $10,800 federal tax credit. This directly reduces the homeowner\'s federal income tax liability dollar for dollar.',
          },
          {
            q: 'Aurora Solar\'s automatic system design uses LiDAR data primarily to accomplish which task?',
            a: ['Calculate the homeowner\'s electricity consumption from utility bills', 'Generate a 3D model of the roof including pitch, orientation, and obstructions for accurate shade analysis and layout', 'Estimate solar incentive and rebate eligibility by zip code', 'Automatically submit permit applications to the local AHJ'],
            correct: 1,
            exp: 'Aurora Solar uses LiDAR (Light Detection and Ranging) data to create accurate 3D models of rooftops including pitch, azimuth, dormers, chimneys, and nearby trees. This enables precise shade analysis at each potential module location, generating a realistic energy production estimate and optimized layout without a site visit.',
          },
        ],
      },
    ],
    test: [
      { q: 'NABCEP stands for:', a: ['National Association of Building Certification and Energy Professionals', 'North American Board of Certified Energy Practitioners', 'National Advisory Board for Clean Energy Programs', 'North American Bureau of Construction and Electrical Practice'], correct: 1, exp: 'NABCEP — North American Board of Certified Energy Practitioners — is the leading credentialing body for solar and renewable energy professionals in North America, offering PV Associate, PV Installation Professional, and other specialty credentials.' },
      { q: 'What is the federal Investment Tax Credit (ITC) percentage for residential solar installations completed in 2024–2032?', a: ['26%', '30%', '40%', '50%'], correct: 1, exp: 'The Inflation Reduction Act (2022) extended and increased the residential clean energy credit (ITC) to 30% for systems installed from 2022 through 2032. It phases down to 26% in 2033 and 22% in 2034 before expiring for residential installations in 2035 unless renewed.' },
      { q: 'Aurora Solar and OpenSolar primarily use which data source to generate automatic rooftop solar designs without a site visit?', a: ['Google Street View photographs', 'LiDAR (aerial 3D point cloud data) and high-resolution satellite imagery', 'Manually entered roof measurements from the homeowner', 'Utility meter data and electricity bills'], correct: 1, exp: 'Aurora Solar uses LiDAR data (available for most US addresses) to build 3D roof models with accurate pitch, azimuth, and obstacle detection. Combined with satellite imagery, this enables automated shade analysis, system layout, and production estimates before visiting the site.' },
      { q: 'Net metering primarily benefits solar homeowners by:', a: ['Providing a state grant for each kWh of solar energy produced', 'Crediting excess solar energy exported to the grid against the homeowner\'s electricity bill, effectively banking energy for use when solar is not producing', 'Eliminating all monthly utility charges for solar customers', 'Providing backup power during grid outages without battery storage'], correct: 1, exp: 'Net metering allows solar homeowners to export excess production to the grid and receive bill credits (at the retail rate in true 1:1 net metering states) that offset nighttime and cloudy-day electricity consumption. It effectively uses the grid as a virtual battery, significantly improving the economics of solar without physical storage.' },
      { q: 'The NABCEP PV Installation Professional (PVIP) credential requires which minimum documented field experience?', a: ['10 hours across 2 installations', '58 hours across 10 installations', '100 hours across 20 installations', '500 hours over 2 years of employment'], correct: 1, exp: 'NABCEP PVIP requires a minimum of 58 documented hours of hands-on PV installation work across at least 10 different PV system installations, plus passing the PVIP examination. The breadth requirement (10 systems) ensures exposure to a variety of installation scenarios.' },
      { q: 'What is the primary difference between the NABCEP PV Associate credential and the NABCEP PV Installation Professional (PVIP)?', a: ['PV Associate covers only battery storage; PVIP covers only solar PV', 'PV Associate is knowledge-based with no experience requirement; PVIP requires documented field installation experience and a more advanced exam', 'PV Associate is for residential installers; PVIP is for commercial and utility-scale installers only', 'PV Associate is a state license; PVIP is a federal certification'], correct: 1, exp: 'PV Associate validates foundational knowledge and is achievable through an accredited training course without field experience — it is an entry-level credential. PVIP requires a minimum 58 hours of documented field experience and a comprehensive advanced examination — it is the professional-level credential for experienced installers.' },
      { q: 'A solar homeowner in a state with 1:1 net metering produces 1,200 kWh in July and consumes 800 kWh. Their electricity rate is $0.15/kWh. What is the net metering credit for the 400 kWh surplus?', a: ['$0 — excess production is forfeited', '$30 (400 kWh × $0.075 — half retail rate)', '$60 (400 kWh × $0.15 retail rate)', '$120 (double credit for exported clean energy)'], correct: 2, exp: '1:1 net metering credits exported kWh at the full retail rate. 400 kWh surplus × $0.15/kWh = $60 credit applied to the next billing period. In states with less than 1:1 net metering, the export rate may be lower (avoided cost rate), reducing the credit value.' },
      { q: 'Which growing technical specialty in the solar industry commands the highest premium wages and requires knowledge beyond basic PV installation?', a: ['Asphalt shingle roofing and flashing', 'Solar-plus-storage integration including battery selection, hybrid inverters, and demand charge management', 'Module-level cleaning and preventive maintenance', 'Permit application processing and AHJ coordination'], correct: 1, exp: 'Solar-plus-storage is the fastest-growing and highest-paying specialty in the solar industry. Technicians who can design, install, commission, and troubleshoot battery storage systems with hybrid inverters, understand time-of-use optimization, and participate in VPP programs are in high demand and command 20–40% wage premiums over basic installers.' },
      { q: 'What does the IREC accreditation of a solar training program indicate?', a: ['The program is approved by the IRS for tax-deductible continuing education', 'The training meets recognized quality standards — IREC accreditation is one pathway to NABCEP PV Associate eligibility', 'The program is funded by the Department of Energy and is free to enrolled students', 'IREC accreditation means the program instructor holds a NABCEP PVIP credential'], correct: 1, exp: 'IREC (Interstate Renewable Energy Council) accredits solar training programs that meet defined quality standards for curriculum, instructor qualifications, and assessment. Completing an IREC-accredited program is one of the approved pathways for NABCEP PV Associate application eligibility.' },
      { q: 'In solar financial proposals, what does "payback period" represent?', a: ['The time the utility takes to approve net metering application', 'The number of years until cumulative solar savings equal the net installed system cost (after incentives)', 'The warranty period for the solar modules', 'The time required to install the system from contract signing to PTO'], correct: 1, exp: 'Payback period = net system cost (after ITC and other incentives) ÷ annual savings (utility bill reduction + net metering credits). A $16,800 net cost system saving $1,800/year has a 9.3-year payback. After payback, the system continues producing electricity at near-zero marginal cost for the remaining 15–20 years of system life.' },
    ],
  },
];
