import type { TrainingModule } from './modules';

export const WIND_TURBINE_MODULES: TrainingModule[] = [
  {
    id: 'wtur-wind-resource',
    num: 11,
    title: 'Wind Resource & Rotor Aerodynamics',
    desc: 'Wind power equation, Weibull distribution, IEC wind classes, hub-height extrapolation, Betz limit, tip speed ratio, and wake losses.',
    slides: [
      {
        title: 'Wind Resource Assessment & the Power Equation',
        body: [
          'Wind power scales with the cube of wind speed — a 10% increase in wind speed yields a 33% increase in available power. The fundamental equation is P = 1/2 * rho * A * v^3 * Cp, where rho is air density (1.225 kg/m^3 at sea level), A is swept area, v is wind speed, and Cp is the power coefficient.',
          'Wind resource is characterized using a Weibull distribution with shape parameter k and scale parameter c. For most sites k = 2 (Rayleigh distribution), and annual energy production (AEP) is derived by integrating the power curve against the probability distribution.',
          'IEC 61400-1 defines wind turbine classes by mean wind speed: Class I >= 10 m/s (50-year extreme gust 70 m/s), Class II 8.5 m/s (59.5 m/s gust), Class III 7.5 m/s (52.5 m/s gust) — selecting the wrong class for a site can void the turbine warranty and fail structural certification.',
          "Hub height wind speed is extrapolated from met mast measurements using the power law: v_hub = v_ref * (h_hub / h_ref)^alpha, where alpha = 0.143 (1/7) for flat terrain and up to 0.25 for forested or complex terrain sites.",
        ],
        images: [
          { src: '/diagrams/wind-power-equation-classes.svg', alt: 'Diagram of the wind power equation showing the cube-law relationship between wind speed and power, the IEC 61400-1 wind classes, and the power-law hub-height extrapolation formula', caption: 'Power scales with the CUBE of wind speed — a 10% speed increase yields 33% more available power.' },
        ],
        keyPoints: [
          'P = 1/2 * rho * A * v^3 * Cp — power scales with the cube of wind speed',
          'IEC Class I sites: mean wind >= 10 m/s; extreme 50-year gust 70 m/s',
          'Power law exponent alpha = 0.143 (1/7) for standard onshore terrain',
          'Weibull k = 2 (Rayleigh distribution) is typical for most wind sites',
        ],
        quiz: [
          {
            q: 'Which IEC 61400-1 wind class defines sites with a mean annual wind speed of at least 10 m/s and a 50-year extreme gust of 70 m/s?',
            a: ['Class I', 'Class II', 'Class III', 'Class S'],
            correct: 0,
            exp: 'IEC Class I is the most demanding classification — turbines rated for Class I can withstand the highest wind loads and are required for high-wind sites. Class II covers 8.5 m/s mean and Class III 7.5 m/s mean. Class S is a special class defined by the designer for site-specific conditions.',
          },
          {
            q: 'A met mast at 60 m records 7.0 m/s mean wind speed. Using the standard onshore power law exponent (alpha = 1/7), what is the estimated speed at an 80 m hub height?',
            a: ['Approximately 7.3 m/s', '6.6 m/s', '8.0 m/s', '7.0 m/s (no change)'],
            correct: 0,
            exp: 'v_hub = 7.0 * (80/60)^(1/7) = 7.0 * 1.333^0.143 = 7.0 * 1.041 = 7.3 m/s. Even a small height increase significantly affects AEP projections because power scales as the cube of wind speed.',
          },
        ],
      },
      {
        title: 'Rotor Aerodynamics & Performance',
        body: [
          "Rotor blades generate lift perpendicular to the relative wind using an airfoil cross-section — the angle of attack (AoA) between the chord line and relative wind determines the lift/drag ratio. Modern pitch-regulated turbines avoid stall by adjusting blade pitch as wind speed changes.",
          'The Betz limit (1919) proves that no turbine can extract more than 16/27 = 59.3% of the kinetic energy in the wind. Real turbines achieve Cp of 0.40-0.50 at their design tip speed ratio.',
          'Tip speed ratio (TSR) lambda = blade tip speed / free stream wind speed = omega*R/v. Three-blade utility turbines are optimized for TSR of 7-9 at rated output — too low increases drag losses; too high creates noise and blade erosion.',
          'Wake effect: a downstream turbine in a wind farm extracts less energy because the upstream turbine depletes wind momentum. Typical wake losses are 5-15%; turbines are spaced 7-10 rotor diameters apart in the prevailing wind direction to minimize losses.',
        ],
        keyPoints: [
          'Betz limit: maximum theoretical Cp = 16/27 = 59.3%',
          'Optimal TSR for 3-blade turbines: 7-9',
          'Real turbine Cp: 0.40-0.50 at design TSR',
          'Wake spacing: 7-10 rotor diameters in prevailing wind direction',
        ],
        quiz: [
          {
            q: 'What is the Betz limit — the theoretical maximum fraction of wind kinetic energy a turbine can capture?',
            a: ['59.3%', '50.0%', '70.7%', '45.0%'],
            correct: 0,
            exp: 'The Betz limit is 16/27 = 0.593 or 59.3%, derived by Albert Betz in 1919. It represents the absolute maximum power coefficient regardless of turbine design — extracting more would require stopping the wind completely, which would prevent new air from entering the rotor disk.',
          },
          {
            q: 'A turbine rotor has a 50 m radius and rotates at 12 RPM in a 10 m/s wind. What is the tip speed ratio?',
            a: ['6.3', '12.0', '3.8', '9.4'],
            correct: 0,
            exp: 'TSR = omega*R/v. omega = 12*2*pi/60 = 1.257 rad/s. TSR = 1.257 * 50 / 10 = 6.28 = 6.3. This is slightly below the optimal 7-9 range — the controller would increase rotor speed or adjust pitch to improve energy capture.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'What does the cube relationship between wind speed and power mean for a site where mean wind speed increases from 6 m/s to 7 m/s?',
        a: ['Available power increases approximately 59%', 'Power increases 17%', 'Power increases 33%', 'Power doubles'],
        correct: 0,
        exp: '(7/6)^3 = 1.587 — approximately 59% increase in available power. The cubic relationship means even small improvements in mean wind speed have a dramatic effect on annual energy production and project economics.',
      },
      {
        q: 'A Weibull shape parameter k = 2 corresponds to which well-known distribution used in wind resource assessment?',
        a: ['Rayleigh distribution', 'Gaussian distribution', 'Log-normal distribution', 'Pareto distribution'],
        correct: 0,
        exp: 'When k = 2, the Weibull distribution reduces to the Rayleigh distribution, commonly used to model wind speed at typical sites. Higher k values indicate more consistent wind resource.',
      },
      {
        q: 'An IEC Wind Class II turbine nameplate indicates the turbine is rated for a minimum mean annual wind speed of:',
        a: ['8.5 m/s', '10.0 m/s', '7.5 m/s', '6.0 m/s'],
        correct: 0,
        exp: 'IEC 61400-1 Class II: mean annual wind speed 8.5 m/s and 50-year extreme gust 59.5 m/s. Class I is >=10 m/s; Class III is >=7.5 m/s. Installing a Class II turbine at a Class I site violates the structural design basis.',
      },
      {
        q: 'What is the swept area of a turbine with a 45 m blade length?',
        a: ['6,362 m^2', '2,827 m^2', '6,700 m^2', '1,590 m^2'],
        correct: 0,
        exp: 'A = pi*R^2 = pi*45^2 = 6,362 m^2. The blade length is the rotor radius R, not the diameter.',
      },
      {
        q: 'Why are turbines in a wind farm spaced 7-10 rotor diameters apart in the prevailing wind direction?',
        a: ['To allow wake recovery so downstream turbines encounter near-freestream wind speed', 'To meet FAA height clearance requirements', 'To minimize cable lengths', 'To keep TSR below 7'],
        correct: 0,
        exp: 'The turbine wake is a turbulent, low-energy zone extending many rotor diameters downwind. Spacing of 7-10 diameters allows partial wake recovery. Tighter spacing causes 10-15%+ energy losses and increases fatigue loads on downstream turbines.',
      },
      {
        q: 'Air density at 2,000 m elevation is approximately 1.0 kg/m^3 vs. 1.225 kg/m^3 at sea level. How does this affect turbine power output?',
        a: ['Power decreases roughly 18% — P = 1/2*rho*A*v^3*Cp scales directly with air density', 'Power increases because lower pressure reduces drag', 'Power is unchanged — turbines self-correct for density', 'Power increases 18%'],
        correct: 0,
        exp: 'Since P = 1/2*rho*A*v^3*Cp, power output is proportional to air density. At 2,000 m (rho = 1.0 kg/m^3) vs. sea level (rho = 1.225 kg/m^3), power is about 18% lower. High-altitude sites require careful AEP modeling using site-specific air density.',
      },
      {
        q: 'Modern pitch-regulated turbines avoid aerodynamic stall above rated wind speed by:',
        a: ['Pitching blades toward 90 degrees to reduce angle of attack and limit rotor torque', 'Allowing the rotor to freewheel in high winds', 'Increasing generator load at cut-in speed', 'Orienting the nacelle parallel to wind direction'],
        correct: 0,
        exp: 'Pitch control reduces the angle of attack as wind increases above rated speed — feathering the blade toward 90 degrees limits rotor torque and maintains constant rated power without stalling. Below rated, pitch is held at fine pitch (approx 0 degrees) for maximum Cp.',
      },
      {
        q: 'What is the primary source of structural fatigue loading on a wind turbine rotor blade?',
        a: ['Cyclic aerodynamic loads as the blade rotates through wind shear, turbulence, and gravity', 'Thermal expansion of the blade material', 'Yaw misalignment in steady winds', 'Foundation settlement'],
        correct: 0,
        exp: 'Each rotation exposes the blade to varying wind speeds (due to shear and turbulence), alternating gravity loads, and aerodynamic fluctuations — producing hundreds of millions of fatigue cycles over a 20-25 year design life. IEC 61400-1 fatigue load cases are a primary turbine design driver.',
      },
      {
        q: 'What is the purpose of wind shear measurement using a multi-height met mast?',
        a: ['To determine the power law exponent (alpha) for accurate hub-height wind speed extrapolation', 'To measure turbulence intensity for noise assessment', 'To set the Weibull k parameter from a single height reading', 'To calibrate the turbine cut-out wind speed'],
        correct: 0,
        exp: 'Wind shear describes how wind speed varies with height. Measuring wind speed at multiple mast heights allows fitting the power law exponent alpha = log(v2/v1) / log(h2/h1), which is then used to extrapolate from met mast height to hub height for AEP calculations.',
      },
      {
        q: 'A turbine operating at TSR significantly above its design value of 8 is likely to experience:',
        a: ['Increased blade tip noise and accelerated leading edge erosion', 'Higher power output due to faster rotor speed', 'Lower aerodynamic drag', 'Improved wake recovery for downstream turbines'],
        correct: 0,
        exp: 'At tip speeds well above the design TSR, blade tip velocities increase, leading to aerodynamic noise (proportional to velocity^5) and accelerated erosion of the blade leading edge from rain and particle impact — a significant maintenance cost driver at high-wind-speed sites.',
      },
    ],
  },

  {
    id: 'wtur-drivetrain',
    num: 12,
    title: 'Drivetrain, Gearbox & Bearing Systems',
    desc: 'Gearbox design and gear ratios, oil analysis (ISO 4406), planetary stage failure modes, main bearing types, vibration analysis, and alignment.',
    slides: [
      {
        title: 'Gearbox Design & Oil Analysis',
        body: [
          'Most utility-scale wind turbines use a 3-stage epicyclic + helical gearbox to step up main shaft speed from 10-20 RPM to 1,200-1,800 RPM for the generator. Typical overall gear ratio: 80:1 to 110:1.',
          'Gearbox oil analysis is the primary condition monitoring tool — samples taken every 6 months are tested for particle count (ISO 4406 cleanliness code), viscosity, water content, and wear metals (Fe, Cu, Cr). Rising iron count indicates ring-gear or planetary-gear wear.',
          'The planetary (epicyclic) stage carries the highest torque and is the most common failure location. Planetary bearing failures begin as micropitting on gear flanks — visible via borescope before progressing to spalling.',
          'Direct-drive turbines eliminate the gearbox using a large-diameter permanent magnet generator at low RPM, reducing drivetrain failure modes but requiring a full-power converter and a heavier nacelle.',
        ],
        images: [
          { src: '/diagrams/gearbox-drivetrain-oil-analysis.svg', alt: 'Diagram of the wind turbine drivetrain from main shaft through the planetary stage, helical stages, and generator, with panels on oil analysis condition monitoring and the direct-drive alternative', caption: 'Full torque hits the planetary stage first — the highest-stress point and the most common gearbox failure location.' },
        ],
        keyPoints: [
          'Typical gearbox ratio: 80:1 to 110:1',
          'Oil analysis interval: every 6 months or per OEM schedule',
          'Planetary stage: highest torque, most common failure location',
          'Rising Fe particle count: indicates gear or bearing wear',
        ],
        quiz: [
          {
            q: 'A gearbox oil sample returns ISO 4406 code 21/19/16; the OEM specifies a maximum of 18/16/13. What is the correct action?',
            a: ['Filter or replace the oil immediately and re-sample to verify the code is within spec', 'Log the result and recheck at next scheduled interval', 'Add fresh oil to dilute the particles', 'Disassemble the gearbox for immediate visual inspection'],
            correct: 0,
            exp: 'An ISO 4406 code above the OEM limit indicates excessive particulate contamination — a leading indicator of wear. Immediate filtration or oil change followed by a re-sample verifies the code is back within spec and prevents escalation to catastrophic gear failure.',
          },
          {
            q: 'Why is the planetary (epicyclic) stage the most critical point to monitor in a wind turbine gearbox?',
            a: ['It carries the highest torque and is the most common location for bearing and gear failures', 'It operates at the highest rotational speed', 'It contains the largest oil volume', 'It is most exposed to thermal cycling'],
            correct: 0,
            exp: 'The planetary stage receives full torque from the main shaft before any speed multiplication — highest stress in the drivetrain. Planetary bearing failures account for a significant proportion of unplanned gearbox replacements across the wind industry.',
          },
        ],
      },
      {
        title: 'Main Shaft, Bearings & Alignment',
        body: [
          'The main bearing supports the rotor hub on the main shaft and experiences combined radial and axial loads. Spherical roller bearings (SRB) and tapered roller bearings (TRB) are most common — grease intervals are 500-1,000 hours per OEM; over-greasing causes heat buildup and seal damage.',
          'Vibration analysis is the primary predictive maintenance tool — accelerometers on the main bearing, gearbox, and generator measure broadband vibration (g RMS) and spectral content. Bearing defect frequencies (BPFO, BPFI, BSF, FTF) appear in the spectrum before failure is audible.',
          'Coupling alignment between gearbox high-speed shaft and generator is verified using laser alignment tools — angular and offset misalignment exceeding OEM tolerances (typically 0.05-0.1 mm) causes premature coupling, seal, and bearing failure.',
          'Main bearing replacement requires supporting the rotor (crane or rotor lock), removing the hub, extracting the bearing with a hydraulic press, inspecting the shaft journal for fretting, and pressing in the new bearing to OEM interference fit specification.',
        ],
        keyPoints: [
          'Main bearing types: spherical roller (SRB) or tapered roller (TRB)',
          'Grease interval: 500-1,000 hours per OEM specification',
          'Bearing defect frequencies: BPFO, BPFI, BSF, FTF',
          'Laser alignment tolerance: typically <= 0.1 mm angular and offset',
        ],
        quiz: [
          {
            q: 'A vibration spectrum at the main bearing shows a rising peak at the Ball Pass Frequency Outer Race (BPFO). What does this most likely indicate?',
            a: ['Outer race bearing defect — schedule replacement before failure progresses', 'Normal rotor imbalance — log and recheck', 'Gearbox micropitting — perform oil analysis', 'Generator misalignment — re-align coupling'],
            correct: 0,
            exp: 'BPFO is a bearing defect frequency calculated from bearing geometry and shaft speed. A rising spectral peak at BPFO indicates outer race damage. Early detection via vibration analysis allows planned replacement at a scheduled outage rather than an emergency crane call.',
          },
          {
            q: 'Why is over-greasing a main bearing as harmful as under-greasing?',
            a: ['Excess grease churning generates heat, pressurizes seals, and can introduce contamination', 'Grease is incompressible so excess has no effect', 'More grease extends the regreasing interval indefinitely', 'Excess grease reduces bearing clearance and improves load capacity'],
            correct: 0,
            exp: 'Over-greasing causes mechanical churning of grease, generating heat that degrades the thickener. It also pressurizes the seal, forcing grease out and potentially allowing contaminants in. Always follow OEM grease volume and interval specifications precisely.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'A 3-stage gearbox has stages of 5:1 (planetary), 5:1 (planetary), and 4:1 (helical). What is the overall gear ratio?',
        a: ['100:1', '14:1', '75:1', '20:1'],
        correct: 0,
        exp: 'Overall ratio = 5 * 5 * 4 = 100:1. At 14 RPM main shaft speed, the generator shaft rotates at 1,400 RPM — within the range of a 4-pole synchronous generator at 60 Hz.',
      },
      {
        q: 'What does an ISO 4406 cleanliness code of 18/16/13 describe?',
        a: ['Particle count ranges at three size thresholds: >=4 um, >=6 um, >=14 um', 'Oil viscosity at three temperatures', 'Gear hardness at three load conditions', 'Contamination level in three gearbox stages'],
        correct: 0,
        exp: 'ISO 4406 uses three numbers representing log-base-2 particle count ranges per mL at >=4 um, >=6 um, and >=14 um. Each point increase of 1 doubles the particle count. OEM specs set the maximum allowable code at each size.',
      },
      {
        q: 'What is a key advantage of direct-drive wind turbines over gearbox-equipped turbines?',
        a: ['Elimination of the gearbox removes the most common source of major drivetrain failures', 'Lower nacelle weight', 'Smaller generator diameter', 'No requirement for a power converter'],
        correct: 0,
        exp: 'Gearbox failures are among the costliest drivetrain events in wind operations. Direct-drive turbines eliminate this failure mode entirely. The trade-off is a heavier nacelle (large-diameter generator) and the requirement for a full-power converter.',
      },
      {
        q: 'A main bearing grease sample shows elevated iron and copper particles. What wear mechanism does this most likely indicate?',
        a: ['Fretting corrosion or adhesive wear — lubricant film breakdown between roller and race', 'Normal run-in wear during commissioning', 'Water contamination causing oxidation', 'Gearbox gear tooth pitting'],
        correct: 0,
        exp: 'Iron and copper particles from the main bearing location suggest metal-to-metal contact from fretting (micro-motion wear) or adhesive wear. Combined with vibration analysis, this guides the decision between regreasing or scheduling bearing replacement.',
      },
      {
        q: 'What is the typical main shaft rotation speed for a modern 2 MW onshore wind turbine?',
        a: ['10-20 RPM', '100-200 RPM', '1,200-1,800 RPM', '60 RPM'],
        correct: 0,
        exp: 'Large-rotor turbines rotate slowly — typically 10-20 RPM at rated wind speed. The gearbox steps this up to generator speed (1,200-1,800 RPM). Variable-speed turbines vary rotor speed from about 6 RPM at cut-in to 20 RPM at rated to maintain optimal TSR.',
      },
      {
        q: 'What does a vibration spectral peak at exactly 1x shaft frequency with no harmonics most likely indicate?',
        a: ['Rotor mass imbalance', 'Shaft misalignment', 'Bearing defect', 'Gear tooth damage'],
        correct: 0,
        exp: 'Mass imbalance creates a synchronous 1x vibration (once per revolution) due to centrifugal force from a heavy spot. Misalignment typically shows 1x and 2x peaks. Bearing defects appear at non-synchronous frequencies (BPFO, BPFI, etc.). Gear tooth damage appears at gear mesh frequency.',
      },
      {
        q: 'During a borescope inspection of a planetary gear, you observe micropitting (gray, matte surface) on multiple gear flanks. What is the correct response?',
        a: ['Document with photos, increase oil analysis frequency, and notify the OEM for engineering review', 'Immediately replace the gearbox', 'Continue operation — micropitting self-corrects', 'Flush and replace oil only'],
        correct: 0,
        exp: 'Micropitting (surface fatigue of the hardened gear flank) is an early warning sign that can progress to spalling and gear fracture. Enhanced monitoring and OEM review are required — the decision to continue, modify oil type, or plan replacement depends on severity and progression rate.',
      },
      {
        q: 'What is the purpose of the rotor lock during gearbox or main bearing maintenance?',
        a: ['To mechanically prevent the rotor from rotating due to wind while technicians work in the nacelle', 'To engage the generator as a parking brake', 'To lock the yaw system during nacelle work', 'To maintain pitch angle during tower climbing'],
        correct: 0,
        exp: 'The rotor lock (brake disk and caliper, or rotor lock pin) mechanically prevents rotor rotation during maintenance — essential when technicians are inside the nacelle or hub. LOTO procedures must verify the rotor is locked and cannot creep before work begins.',
      },
      {
        q: 'Which laser alignment parameter describes the angle between the centerlines of two coupled shafts?',
        a: ['Angular misalignment', 'Offset misalignment', 'Axial float', 'Runout'],
        correct: 0,
        exp: 'Angular misalignment is the angle between two shaft centerlines — even small angular errors (>0.1 degrees) cause cyclic bending loads on the coupling, seals, and adjacent bearings. Offset misalignment is a parallel shift between centerlines. Both must be within OEM tolerance.',
      },
      {
        q: 'Cold gearbox oil at startup poses what risk to the drivetrain?',
        a: ['High viscosity prevents proper lubricating film formation, risking metal-to-metal contact during startup', 'Cold oil expands and overfills the housing, blowing the sight glass', 'Cold oil increases the gear ratio, overspending the generator', 'No risk — cold oil is thicker and provides better protection'],
        correct: 0,
        exp: 'Cold oil has high viscosity that cannot form a proper hydrodynamic lubricating film. Starting the turbine with below-spec oil temperature risks metal-to-metal contact in gears and bearings. OEMs specify minimum oil temperature for startup; some turbines have oil heaters for cold-weather operation.',
      },
    ],
  },

  {
    id: 'wtur-electrical',
    num: 13,
    title: 'Electrical Systems & Grid Interconnection',
    desc: 'DFIG and full-power converter topologies, IGBT cooling, LVRT requirements, reactive power, nacelle transformer protection, and lightning protection.',
    slides: [
      {
        title: 'Generator Types & Power Electronics',
        body: [
          'Doubly-Fed Induction Generators (DFIG) are the most common generator type in 1.5-3 MW onshore turbines. The stator connects directly to the grid at full power; the rotor connects through a partial-scale (~30%) power converter. This allows variable-speed operation over a +/-30% slip range with a smaller, lower-cost converter.',
          'Full-power converter (FPC) topologies use a back-to-back voltage source converter rated at 100% turbine power. The generator is fully decoupled from the grid — enabling precise reactive power control and grid support but requiring a larger, more expensive converter.',
          'Permanent magnet synchronous generators (PMSG) used in direct-drive turbines eliminate excitation losses. The trade-off is the cost and supply-chain risk of rare-earth magnets (neodymium) and the weight of the large-diameter generator.',
          'Power converter cooling is critical — IGBT modules dissipate significant heat and have a maximum junction temperature of approximately 150 degrees C. Most converters use liquid cooling (water-glycol) or forced air. Converter failures are a leading cause of turbine downtime.',
        ],
        images: [
          { src: '/diagrams/generator-types-power-electronics.svg', alt: 'Comparison diagram of DFIG and full-power converter generator architectures, a worked super-synchronous slip calculation, and IGBT converter cooling requirements', caption: 'DFIG trades grid-support capability for a cheaper 30%-rated converter; FPC pays more for complete grid decoupling.' },
        ],
        keyPoints: [
          'DFIG: stator direct to grid, rotor via partial-scale converter; slip +/-30%',
          'FPC: full-power converter; complete grid decoupling; PMSG common',
          'IGBT max junction temp: approximately 150 degrees C — cooling is critical',
          'DFIG converter is approximately 30% of rated power (cost advantage)',
        ],
        quiz: [
          {
            q: 'A DFIG turbine operates at 15% super-synchronous slip. If synchronous speed is 1,500 RPM, what is rotor speed?',
            a: ['1,725 RPM', '1,275 RPM', '1,500 RPM', '2,000 RPM'],
            correct: 0,
            exp: 'Super-synchronous means the rotor spins faster than synchronous speed. Rotor speed = 1,500 * (1 + 0.15) = 1,725 RPM. The DFIG converter feeds slip power from the rotor back to the grid during super-synchronous operation, enabling variable-speed operation above the synchronous point.',
          },
          {
            q: 'What is the primary advantage of a full-power converter (FPC) over a DFIG configuration?',
            a: ['Complete decoupling from the grid allows precise reactive power and frequency support', 'Lower cost due to smaller converter size', 'Higher efficiency due to direct grid connection', 'Simpler rotor winding design'],
            correct: 0,
            exp: 'FPC provides complete electrical isolation between the turbine and grid — the converter can independently control real and reactive power regardless of wind speed or grid conditions. This makes FPC turbines superior for grid support. DFIG converters are cheaper (30% rating) but provide less grid support capability.',
          },
        ],
      },
      {
        title: 'Grid Interconnection & LVRT',
        body: [
          'Low Voltage Ride-Through (LVRT) is a grid code requirement for wind turbines to stay connected during grid faults. NERC FAR 003-4 (North America) requires turbines to ride through voltage dips — typically 0% voltage for 150-625 ms depending on jurisdiction.',
          'During LVRT, turbines must inject reactive current to support grid voltage — a reactive power boost of at least 2% rated reactive current per 1% voltage drop. This helps prevent voltage collapse during grid faults.',
          'The nacelle transformer steps up generator output voltage (typically 690 V or 1,000 V AC) to the collection system voltage (typically 34.5 kV). Protection includes differential relay, overcurrent, and buchholz relay for internal faults.',
          'Tower and nacelle are bonded to earth through the foundation ground grid. Blade lightning receptors conduct strike current down through the pitch bearing, main shaft, and tower to earth — insulated shaft couplings or bypass brushes protect bearings from pitting by lightning current.',
        ],
        images: [
          { src: '/diagrams/grid-lvrt-lightning-path.svg', alt: 'Diagram of the LVRT reactive current injection requirement, the nacelle transformer step-up and protection scheme, and the lightning current path from blade receptor through pitch bearing and main shaft to earth ground', caption: 'LVRT keeps the turbine connected and supporting the grid through a fault — the lightning path routes strike current around, not through, the bearings.' },
        ],
        keyPoints: [
          'LVRT: turbine must stay connected during voltage dip — typically 0% for >=150 ms',
          'Reactive boost during LVRT: >=2% rated reactive current per 1% voltage drop',
          'Nacelle transformer: 690 V or 1 kV -> 34.5 kV collection system',
          'Lightning path: blade receptor -> pitch bearing -> main shaft -> tower -> earth',
        ],
        quiz: [
          {
            q: 'A grid code requires LVRT to 15% of nominal voltage for 625 ms. During this event, what must the wind turbine do?',
            a: ['Stay connected and inject reactive current to support grid voltage recovery', 'Trip offline immediately to protect the converter IGBTs', 'Feather blades to limit rotor speed during the fault', 'Disconnect and reconnect when voltage recovers above 80%'],
            correct: 0,
            exp: 'LVRT requires the turbine to ride through the fault while supporting the grid with reactive current injection. Tripping offline during a fault worsens voltage collapse — a requirement driven by real grid disturbances where wind farm trips accelerated blackouts.',
          },
          {
            q: 'The nacelle transformer differential protection relay trips when:',
            a: ['The difference between primary and secondary current (normalized for turns ratio) exceeds the setpoint, indicating an internal fault', 'Primary voltage drops below the LVRT threshold', 'Transformer oil temperature exceeds 85 degrees C', 'The buchholz relay float rises above the oil level'],
            correct: 0,
            exp: 'Differential protection compares current entering and leaving the transformer windings — a difference beyond normal magnetizing current indicates current leaking through an internal fault (winding short, core fault). It is the fastest transformer protection, typically operating in under 30 ms.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'A DFIG turbine rotor power converter is rated at 900 kW on a 3 MW turbine. What percentage of rated power is this?',
        a: ['30%', '10%', '50%', '100%'],
        correct: 0,
        exp: '900/3000 = 30%. The partial-scale converter is a key economic advantage of DFIG — handling only +/-30% slip power means a significantly smaller and cheaper converter compared to a full-power FPC at 3 MW.',
      },
      {
        q: 'Why do direct-drive turbines require a full-power converter?',
        a: ['The slow-speed generator output cannot be directly connected to the 50/60 Hz grid — the converter matches frequency and voltage', 'To reduce torque on the main shaft', 'To step up voltage from 690 V to 34.5 kV', 'To regulate blade pitch angle'],
        correct: 0,
        exp: 'A direct-drive generator at 10-20 RPM produces AC at far below grid frequency. The AC-DC-AC full-power converter rectifies generator output to DC, then inverts it to 50 or 60 Hz AC for the grid — enabling complete speed and frequency decoupling.',
      },
      {
        q: 'What does a buchholz relay on the nacelle transformer detect?',
        a: ['Gas and oil displacement caused by an internal arc or overheating fault', 'Ground fault on the secondary winding', 'Overcurrent on the primary side', 'Low oil level during routine inspection'],
        correct: 0,
        exp: 'The buchholz relay is installed in the pipe between the transformer tank and conservator. Internal faults (arc, insulation breakdown) produce gas bubbles that displace oil and trigger the relay — providing early warning (alarm stage) or trip (surge stage).',
      },
      {
        q: 'What is the collection system voltage at most onshore wind farms in North America?',
        a: ['34.5 kV', '690 V', '138 kV', '13.8 kV'],
        correct: 0,
        exp: '34.5 kV is the standard feeder voltage for North American wind farm collection systems — each nacelle transformer steps up from generator voltage to 34.5 kV, aggregated and stepped up to transmission voltage (115-345 kV) at the substation.',
      },
      {
        q: 'An IGBT in the power converter shows junction temperature consistently at 148 degrees C versus a maximum of 150 degrees C. What is the recommended action?',
        a: ['Investigate converter cooling immediately — check coolant flow, filter condition, and coolant level', 'No action needed — within specification', 'Reduce turbine power to 50%', 'Replace the IGBT at the next major service'],
        correct: 0,
        exp: 'Operating 2 degrees C below maximum junction temperature leaves no thermal margin. Thermal cycles will stress the IGBT bond wires and solder joints, causing rapid aging. Investigating cooling performance (clogged filter, low coolant, pump issue) is urgent.',
      },
      {
        q: 'A full-power converter wind turbine can supply reactive power to the grid:',
        a: ['Independently of wind speed — even at low or zero wind if the grid needs reactive support', 'Only during above-rated wind speed', 'Only when producing active power above 50%', 'Only during LVRT events'],
        correct: 0,
        exp: 'Because the FPC fully decouples the generator from the grid, the converter can import or export reactive power independently of real power production — a valuable grid support capability during low-wind periods when reactive power from traditional generators is reduced.',
      },
      {
        q: 'What parameter does NERC FAR 003-4 regulate for wind power plants in North America?',
        a: ['Frequency and voltage ride-through requirements during grid disturbances', 'Maximum blade length for environmental permits', 'Tower height lighting (FAA) requirements', 'Cable ampacity for underground collection systems'],
        correct: 0,
        exp: 'NERC FAR 003-4 sets ride-through requirements for wind and solar plants to remain connected and provide reactive support during voltage and frequency deviations — ensuring grid stability as variable renewables displace synchronous generation with inherent inertia.',
      },
      {
        q: 'What does super-synchronous operation mean for a DFIG turbine?',
        a: ['Rotor spins faster than synchronous speed; slip is negative; rotor power flows back to grid', 'Rotor spins slower than synchronous speed; slip is positive', 'Turbine exceeds its rated power output', 'Generator produces power above the power factor limit'],
        correct: 0,
        exp: 'Slip s = (Ns - Nr)/Ns. When the rotor spins faster than synchronous speed, slip is negative (super-synchronous). The converter feeds rotor power back to the grid. Sub-synchronous operation means the rotor is slower; the converter absorbs power from the grid to the rotor.',
      },
      {
        q: 'What is the purpose of a shaft grounding ring or bypass brush at the main shaft?',
        a: ['To provide a low-impedance path for lightning or bearing current past the bearings to prevent raceway pitting', 'To measure shaft speed for the tachometer', 'To ground the rotor hub during maintenance LOTO', 'To transmit control signals to the hub pitch actuators'],
        correct: 0,
        exp: 'Electrical current passing through bearings (from lightning, converter common-mode voltage, or static) can vaporize lubricant at contact points, pitting the raceways and causing premature failure. Shaft grounding rings and bypass brushes provide a low-impedance bypass path to divert current away from the bearings.',
      },
      {
        q: 'When inspecting a nacelle transformer, which condition requires immediate shutdown?',
        a: ['Buchholz relay in alarm mode with gas present in the relay body', 'Oil temperature at 80 degrees C under rated load', 'Slight oil seep at the bushing gasket', 'Core ground current at the OEM-specified maximum'],
        correct: 0,
        exp: 'Gas in the buchholz relay body indicates active internal gas production — strong evidence of internal arcing or insulation breakdown. Immediate shutdown and Dissolved Gas Analysis (DGA) of the oil are required to characterize the fault before the transformer can return to service.',
      },
    ],
  },

  {
    id: 'wtur-controls',
    num: 14,
    title: 'Turbine Controls, SCADA & Fault Diagnosis',
    desc: 'Pitch control systems, emergency feathering, yaw drive and cable twist, SCADA and OPC-UA, condition monitoring, ISO 10816, and power curve analysis.',
    slides: [
      {
        title: 'Pitch Control & Yaw Systems',
        body: [
          'Modern pitch-regulated turbines have three independently pitchable blades driven by electric servo actuators or hydraulic cylinders. Below rated wind speed, blades are held at fine pitch (approx 0 degrees) for maximum Cp; above rated, pitch feathers toward 90 degrees to maintain constant rated power.',
          'Emergency feather is triggered by controller fault, overspeed, or grid loss — battery backup (UPS or supercapacitor) ensures pitch actuators can feather all three blades to 90 degrees even without grid power. Pitch battery health is verified at every major service.',
          'The yaw system keeps the nacelle aligned with wind direction using wind vane or ultrasonic wind sensors — yaw motors drive the nacelle via a slewing ring gear. Each 1 degree of yaw misalignment causes approximately 1.5% power loss (cos^3 law).',
          'Cable twist accumulates as the nacelle yaws — a twist counter tracks cumulative yaw angle. At +/-3 full turns (+/-1,080 degrees), the turbine parks and performs an automatic unwind maneuver. Exceeding the hard stop can sever power and control cables in the tower.',
        ],
        images: [
          { src: '/diagrams/pitch-yaw-control-systems.svg', alt: 'Diagram of pitch control fine-pitch and emergency feather behavior, the yaw system cos-cubed power loss relationship, the cable twist counter hard limit, and pitch battery service guidance', caption: 'Pitch feathers to 90° on any fault; yaw misalignment costs power fast; cable twist has a hard ±3-turn limit.' },
        ],
        keyPoints: [
          'Pitch feathers toward 90 degrees above rated wind and in every emergency (battery-backed)',
          'Yaw error: each 1 degree misalignment causes approximately 1.5% power loss (cos^3 theta)',
          'Cable twist limit: +/-3 turns (+/-1,080 degrees) before automatic unwind',
          'Pitch battery backup: verified at every major PM service',
        ],
        quiz: [
          {
            q: 'A turbine pitch battery fails its capacity test during annual PM. What is the correct action before returning the turbine to service?',
            a: ['Replace the battery immediately — without backup the turbine cannot safely feather in an emergency', 'Log the fault and continue operating until next scheduled service', 'Adjust the pitch controller to use hydraulic backup instead', 'Increase cut-out wind speed to reduce emergency feather demand'],
            correct: 0,
            exp: 'Pitch battery backup is safety-critical — without it, a grid loss or controller fault during high wind can prevent emergency feathering, risking an overspeed event. Most OEM procedures require turbine shutdown and battery replacement before resuming generation.',
          },
          {
            q: 'A turbine cable twist counter reads +1,080 degrees. What will the turbine controller do?',
            a: ['Park the turbine and perform an automatic cable unwind maneuver', 'Trigger a grid disconnection', 'Send a SCADA alert only with no automatic action', 'Increase yaw rate to unwind during normal operation'],
            correct: 0,
            exp: '+1,080 degrees equals +3 full turns — the maximum twist limit. The controller parks the turbine (stops yaw, feathers blades) and executes an unwind: rotating the nacelle in the opposite direction back toward 0 degrees of twist. This prevents cable damage.',
          },
        ],
      },
      {
        title: 'SCADA, Condition Monitoring & Fault Diagnosis',
        body: [
          'SCADA systems collect 10-minute average data per IEC 61400-12 for production reporting, and 1-second or faster data for condition monitoring. OPC-UA is the modern protocol for turbine-to-SCADA communication, replacing proprietary Modbus and DNP3 links.',
          'Condition Monitoring Systems (CMS) use accelerometers on the main bearing, gearbox stages, and generator to track vibration trends. ISO 10816 vibration severity zones guide alarm levels — Zone C triggers an alert; Zone D (severe) requires immediate shutdown.',
          'Common fault codes and responses: Grid fault — check substation breaker and collection cable; Overspeed trip — inspect pitch system and mechanical brake before restart; High gearbox oil temperature — check oil level, cooler, and pump.',
          'Power curve analysis compares actual SCADA production to the contractual power curve — blade soiling, pitch offset, or yaw error shifts the actual curve below the guarantee curve, triggering a turbine performance audit.',
        ],
        keyPoints: [
          'SCADA: 10-minute averages per IEC 61400-12; OPC-UA communication protocol',
          'ISO 10816 Zone C: alert; Zone D: immediate shutdown required',
          'Overspeed trip: always inspect pitch and mechanical brake before restart',
          'Power curve deviation: leading indicator of blade, pitch, or yaw issue',
        ],
        quiz: [
          {
            q: 'After an overspeed trip, what must a technician verify before resetting the fault and restarting?',
            a: ['Pitch system function and mechanical brake condition — confirm root cause before restart', 'SCADA communication link is active', 'Grid voltage is within +/-10% of nominal', 'Oil temperature is below 40 degrees C'],
            correct: 0,
            exp: 'An overspeed trip means the rotor exceeded maximum safe speed — typically caused by pitch system failure or brake delay. Restarting without finding the root cause risks a repeat overspeed event that could damage the drivetrain or cause an emergency shutdown under higher loads.',
          },
          {
            q: 'A turbine actual power curve from 6 months of SCADA data consistently falls 8% below the guarantee curve above 8 m/s. What is the most likely cause?',
            a: ['Pitch offset error causing blades to run at a less-efficient angle of attack above rated', 'Low grid voltage reducing generator efficiency', 'Gearbox micropitting reducing rotor torque', 'SCADA measurement error'],
            correct: 0,
            exp: 'A systematic deficit above rated wind speed strongly suggests a pitch-related issue — the blades are feathering slightly more than optimal, limiting rotor torque. A pitch calibration audit comparing actual blade angle (from encoders) to the SCADA setpoint is the first diagnostic step.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'At what pitch angle are turbine blades typically held to produce maximum power at below-rated wind speed?',
        a: ['Fine pitch — approximately 0 degrees for maximum Cp', '90 degrees (fully feathered)', '45 degrees', 'Adjusted continuously by SCADA setpoint every second'],
        correct: 0,
        exp: 'Below rated wind speed, blades are held at fine pitch (~0 degrees) to maintain the design angle of attack for maximum Cp. Above rated, pitch increases toward 90 degrees to limit rotor torque and maintain constant rated power output.',
      },
      {
        q: 'How does a turbine controller respond when wind speed rises above cut-out speed (typically 25 m/s)?',
        a: ['Feathers blades to 90 degrees, disconnects the generator, and applies the mechanical brake', 'Reduces power to 50% and continues generating', 'Trips the generator but continues rotor rotation in idle mode', 'Yaws the nacelle 90 degrees out of the wind'],
        correct: 0,
        exp: 'At cut-out (~25 m/s for standard turbines), the turbine performs an orderly shutdown: pitch feathers to 90 degrees, the generator is disconnected from the grid, and the mechanical brake is applied to prevent rotor spin. This protects the structure from excessive wind loads.',
      },
      {
        q: 'What is OPC-UA used for in a modern wind turbine SCADA system?',
        a: ['Standardized machine-to-machine communication protocol for turbine data to SCADA and cloud systems', 'Overspeed Protection Controller — Universal Architecture', 'Oil particle count unit — microamp', 'Open Protocol for Converter — Unified Application'],
        correct: 0,
        exp: 'OPC-UA (Unified Architecture) is an open, platform-independent data exchange standard used in industrial automation. It replaced proprietary protocols (Modbus, DNP3) for turbine-to-SCADA communication and enables turbine fleet management and cloud connectivity.',
      },
      {
        q: 'An ISO 10816 Zone D vibration reading at the gearbox requires:',
        a: ['Immediate shutdown — vibration is severe enough to risk rapid failure', 'Increased monitoring — log and check at next service', 'Adding oil and resetting the alarm', 'Firmware update to the CMS to recalibrate thresholds'],
        correct: 0,
        exp: 'ISO 10816 Zone D indicates machinery vibration that is dangerous — continued operation is likely to cause damage. Wind turbine operators follow OEM CMS alarm response tables which mandate shutdown at Zone D thresholds to prevent catastrophic failure.',
      },
      {
        q: 'What is the primary purpose of 10-minute average SCADA data as defined in IEC 61400-12?',
        a: ['Standardized production and power curve measurement for performance assessment and warranty compliance', 'Real-time fault detection with 10-minute response time', 'Gearbox oil temperature trending', 'Monthly average for grid compliance reporting'],
        correct: 0,
        exp: 'IEC 61400-12 requires 10-minute average power, wind speed, and operational data for power curve verification — used to assess turbine performance against the warranted power curve, detect degradation, and satisfy grid operator performance reporting.',
      },
      {
        q: 'What does a pitch encoder error fault indicate?',
        a: ['The controller has lost blade pitch angle position feedback — turbine defaults to safe feathered state', 'The wind vane providing yaw reference has failed', 'The gearbox speed sensor has failed', 'The SCADA communication link is down'],
        correct: 0,
        exp: 'Pitch encoder errors mean the controller cannot read one or more blade pitch angles. Without accurate pitch feedback the controller cannot safely maintain optimal pitch or execute emergency feathering. The turbine typically faults to safe state until the encoder is replaced or calibrated.',
      },
      {
        q: 'A yaw bearing grease inspection finds water contamination and metallic particles. What is the implication?',
        a: ['Yaw bearing seal failure and accelerated wear — schedule replacement and re-grease immediately', 'Normal condition — yaw bearings require periodic wet grease', 'Grid fault caused electrical discharge in the bearing', 'Wind vane miscalibration is causing excessive yaw movement'],
        correct: 0,
        exp: 'Water contamination indicates seal failure, allowing moisture ingress. Combined with metallic wear particles, this signals accelerated yaw bearing damage. Continued operation risks complete yaw bearing failure — one of the most expensive nacelle replacements.',
      },
      {
        q: 'What does storm mode operation mean for a wind turbine rated for it?',
        a: ['Continued power production above standard 25 m/s cut-out, up to 34 m/s, using modified pitch control', 'Emergency shutdown mode activated by lightning detection', 'Grid disconnection mode to protect from storm voltage surges', 'Automatic lubricant flush mode in cold weather'],
        correct: 0,
        exp: 'Storm mode allows turbines to continue generating power in winds above the standard 25 m/s cut-out through aggressive pitch control that limits rotor loads. This increases AEP in high-wind regions but requires a structurally reinforced turbine design rated for the higher loads.',
      },
      {
        q: 'A nacelle temperature reading of 95 degrees C — well above the normal 35 degree range — most likely indicates:',
        a: ['HVAC/cooling system failure in the nacelle — check cooling fan and thermostat', 'Grid fault causing excess reactive power heating', 'Yaw misalignment of 30 degrees', 'Pitch battery overcharge'],
        correct: 0,
        exp: 'Nacelle temperature is regulated by ventilation fans and heat exchangers. Failure of the cooling system (seized fan, blocked filter, stuck thermostat) can rapidly overheat converter, transformer, and generator components. Most controllers trigger a thermal shutdown to prevent damage.',
      },
      {
        q: 'What is the purpose of the wind farm SCADA power curve binning process?',
        a: ['Grouping 10-minute data by wind speed bins to compare actual vs. warranted power output and identify underperforming turbines', 'Sorting production data by time of day for market pricing', 'Averaging turbine RPM across all wind speed ranges', 'Classifying fault codes by frequency for maintenance planning'],
        correct: 0,
        exp: 'Power curve binning (per IEC 61400-12) groups 10-minute data points by wind speed in 0.5 m/s bins and averages the power output in each bin. The resulting measured power curve is compared to the manufacturer guarantee curve to identify deviations caused by blade issues, pitch errors, or yaw misalignment.',
      },
    ],
  },

  {
    id: 'wtur-safety',
    num: 15,
    title: 'Tower Climbing, Fall Protection & Electrical Safety',
    desc: 'PFAS components and 5,000 lb anchor requirements, GWO Working at Heights, 100% tie-off, LOTO for wind turbines, arc flash PPE, and confined space entry.',
    slides: [
      {
        title: 'Fall Protection & Tower Climbing',
        body: [
          'Working at height in a wind turbine requires a Personal Fall Arrest System (PFAS) consisting of: a full-body harness (ANSI Z359.11), a self-retracting lanyard (SRL) rated for fall arrest, and an anchor point rated at 5,000 lb (22.2 kN) per OSHA 29 CFR 1926.502(d)(15).',
          'GWO Working at Heights (WAH) training is the industry-standard certification for wind turbine climbing — covering ladder climbing technique (3-point contact), SRL engagement at each ladder section, rest platform use, and turbine-specific rescue using the nacelle rope descent system (RDS).',
          'The 100% tie-off rule requires a technician be connected to an anchor at all times when at height. When transferring between anchors, a Y-lanyard or twin-leg SRL maintains continuous connection — single-lanyard systems must not be used where a brief disconnect would occur.',
          'Rescue plans are mandatory before any climb — documented procedure, required equipment (rope, stretcher, rescue kit) at the base, and at least one rescue-competent technician on site. Self-rescue using the nacelle RDS is the primary method for a mobile, injured climber.',
        ],
        keyPoints: [
          'PFAS anchor point: 5,000 lb (22.2 kN) minimum per OSHA/ANSI Z359',
          'GWO WAH: industry-standard certification for turbine climbing',
          '100% tie-off: never disconnect from anchor without a backup connection',
          'Rescue plan must be in place before every climb begins',
        ],
        quiz: [
          {
            q: 'What is the minimum anchor point strength required by OSHA 29 CFR 1926.502(d)(15) for personal fall arrest systems?',
            a: ['5,000 lb (22.2 kN)', '3,000 lb (13.3 kN)', '2,000 lb (8.9 kN)', '10,000 lb (44.4 kN)'],
            correct: 0,
            exp: 'OSHA requires fall arrest anchor points to sustain a static load of at least 5,000 lb (22.2 kN). Wind turbine tower ladder climbing cables and nacelle anchor points are engineered and inspected to meet this requirement — always inspect anchor condition before connecting.',
          },
          {
            q: 'A technician needs to transfer from the ladder SRL to the nacelle anchor at 80 m. Which equipment maintains 100% tie-off during the transfer?',
            a: ['A Y-lanyard or twin-leg SRL — clip the second leg to the new anchor before releasing the first', 'A single 1.8 m energy-absorbing lanyard', 'A rope grab on the climbing cable', 'Two separate harnesses, one for each anchor'],
            correct: 0,
            exp: 'A Y-lanyard or dual-leg SRL has two connections — the technician clips the second leg to the new anchor before unclipping from the old one, maintaining continuous fall protection. This is required by GWO and OEM procedures for all anchor-to-anchor transfers at height.',
          },
        ],
      },
      {
        title: 'Electrical Safety & Confined Space',
        body: [
          'LOTO for a wind turbine: (1) park the turbine, (2) lock the nacelle main LV disconnect, (3) lock the pad-mounted transformer MV disconnect, (4) lock the collection feeder breaker at the substation, (5) apply grounds to prove zero energy, (6) verify zero volts at the work point with a calibrated CAT IV meter (test before touch).',
          'Arc flash hazard assessment per NFPA 70E is required before working on or near exposed energized equipment. Wind turbine main switchboards at 690 V typically fall in PPE Category 1 or 2 — Category 2 requires an 8 cal/cm^2 arc flash suit, face shield, leather gloves over voltage-rated gloves, and leather footwear.',
          'Turbine hub and nacelle oil compartments may qualify as permit-required confined spaces under OSHA 29 CFR 1910.146 — requiring a written permit, atmospheric testing (O2, CO, H2S, LEL), continuous monitoring, competent entrant and attendant, and a rescue plan.',
          'Power converter capacitors retain dangerous charge after LOTO. Wait per OEM specification (typically 5-15 minutes) and verify discharge with a CAT IV voltmeter before touching any bus or capacitor terminal — do not assume the capacitors are discharged.',
        ],
        keyPoints: [
          'LOTO: lock MV disconnect + substation feeder breaker + verify zero volts before touching',
          '690 V switchboard arc flash: typically PPE Category 1 or 2 (4-8 cal/cm^2)',
          'Hub confined space: permit required + atmospheric test (O2, CO, H2S, LEL)',
          'Converter capacitors: wait per OEM spec + verify discharge before touching',
        ],
        quiz: [
          {
            q: 'During wind turbine LOTO, after locking the main disconnect and transformer MV switch, what is the next critical step?',
            a: ['Verify zero voltage at the work point using a calibrated CAT IV voltmeter (test before touch)', 'Don arc flash PPE', 'Notify the SCADA operator that maintenance is starting', 'Confirm the rotor lock is engaged'],
            correct: 0,
            exp: 'LOTO requires verifying zero energy state after locking out — never assume lockout has isolated all energy. Test before touch with a calibrated meter at the work point confirms isolation and detects any missed energy source (backfeed, stored capacitive energy, generator residual magnetism).',
          },
          {
            q: 'Why must the collection system feeder breaker at the substation be locked out during wind turbine LOTO — not just the nacelle disconnect?',
            a: ['To prevent backfeed through the nacelle transformer from energizing the MV side of the nacelle', 'Because the substation breaker controls the SCADA link', 'To comply with FAA lighting requirements during maintenance', 'To prevent other turbines on the string from powering down'],
            correct: 0,
            exp: 'The nacelle transformer can be energized from the MV feeder side (from the substation) even after the nacelle LV disconnect is locked. Locking the feeder breaker and grounding at the substation ensures complete MV-side isolation — without it, the nacelle transformer secondary remains energized.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'GWO Basic Safety Training (BST) covers which five modules?',
        a: ['First Aid, Manual Handling, Fire Awareness, Working at Heights, Sea Survival', 'Electrical Safety, Blade Inspection, Gearbox Service, SCADA, Tower Climbing', 'OSHA 10, Fall Protection, Rigging, Confined Space, Arc Flash', 'Hydraulics, Pitch Control, Yaw Service, Generator Service, Grid Codes'],
        correct: 0,
        exp: 'GWO BST (Global Wind Organisation Basic Safety Training) consists of five modules: First Aid (FA), Manual Handling (MH), Fire Awareness (FF), Working at Heights (WAH), and Sea Survival (SS). The certificate is valid for 2 years.',
      },
      {
        q: 'How often must GWO Basic Safety Training be refreshed to remain valid?',
        a: ['Every 2 years', 'Every year', 'Every 5 years', 'Every 3 years'],
        correct: 0,
        exp: 'GWO BST is valid for 2 years. After expiry, technicians must complete a GWO BST Refresher (shorter than initial training) before site access is restored. Some sites may have stricter requirements.',
      },
      {
        q: 'What PPE is required for NFPA 70E arc flash Category 2 work at a 690 V turbine switchboard?',
        a: ['Arc-rated suit (8 cal/cm^2), arc-rated face shield, balaclava, leather gloves over voltage-rated gloves, leather footwear', 'Standard safety glasses and leather gloves', 'Category 4 PPE (40 cal/cm^2) for all switchboard work', 'Rubber insulating mat only'],
        correct: 0,
        exp: 'NFPA 70E Category 2 requires arc-rated clothing with a minimum ATPV of 8 cal/cm^2 — arc flash suit or jacket and pants, arc-rated face shield (8+ cal/cm^2), balaclava, leather work gloves over voltage-rated rubber gloves, and leather footwear. The specific PPE level is confirmed by an arc flash study.',
      },
      {
        q: 'What atmospheric hazard must be tested for before entering the wind turbine nacelle gearbox bay?',
        a: ['Combustible gas/vapor (LEL) from heated gear oil, plus O2 level', 'CO2 from generator cooling gas leaks', 'H2S from battery off-gassing', 'Nitrogen asphyxiation from blanket gas'],
        correct: 0,
        exp: 'Heated gear oil can produce combustible vapors (LEL hazard). Enclosed nacelle spaces with limited ventilation can also become oxygen-deficient. LEL and O2 testing before entry followed by continuous monitoring are required in oil-containing enclosed spaces.',
      },
      {
        q: 'What is the minimum required clearance from energized 34.5 kV overhead collection lines for unqualified workers per OSHA?',
        a: ['10 feet (3 m) for lines up to 50 kV', '6 feet (1.8 m)', '3 feet (0.9 m)', '25 feet (7.6 m)'],
        correct: 0,
        exp: 'OSHA 29 CFR 1926.1408 Table A requires 10 feet (3 m) minimum clearance from energized lines up to 50 kV for unqualified workers and equipment operators. Wind farm collection systems at 34.5 kV fall within this requirement.',
      },
      {
        q: 'A rope descent system (RDS) descender housing has a visible crack. What is the correct action?',
        a: ['Remove from service immediately and tag for replacement — do not use', 'Use for the current job and report at end of shift', 'Wrap the crack with tape as a temporary fix', 'Use at half load capacity'],
        correct: 0,
        exp: 'Any damaged fall protection or rescue equipment must be immediately removed from service and tagged Do Not Use. Cracked hardware may fail catastrophically under load — the consequence is a fatal fall. Never improvise repairs on life-safety equipment.',
      },
      {
        q: 'What is required before a technician enters the wind turbine hub as a confined space?',
        a: ['Written permit, atmospheric test (O2, CO, H2S, LEL), continuous monitoring, competent entrant and attendant, rescue plan', 'Verbal authorization from site supervisor', 'GWO WAH certificate alone is sufficient', 'Completing OSHA 10 general industry training'],
        correct: 0,
        exp: 'OSHA 29 CFR 1910.146 permit-required confined space entry requires: written permit, initial and continuous atmospheric testing (O2, combustibles, CO, H2S), a competent entrant inside, an attendant outside at all times, and a rescue plan with equipment at the entry point.',
      },
      {
        q: 'Power converter capacitors must be verified discharged before touching because:',
        a: ['They retain lethal stored charge even after power is removed — OEM specifies a wait time plus voltage verification', 'They are the last component to cool after operation and can cause burns', 'They remain magnetized and can damage tools', 'They are connected to the blade pitch batteries'],
        correct: 0,
        exp: 'Large DC bus capacitors in wind turbine power converters store significant energy at high voltage (typically 800-1,200 V DC). After LOTO, a discharge wait time (per OEM, typically 5-15 minutes) plus voltage measurement with a CAT IV meter at the DC bus terminals is mandatory before any work near capacitor terminals.',
      },
      {
        q: 'The GWO Advanced Rescue Training (ART) module prepares technicians to:',
        a: ['Perform third-party rescue of an incapacitated worker from height inside a wind turbine', 'Conduct advanced SCADA fault diagnostics', 'Operate crane equipment for major component replacement', 'Certify as a rope access Level 2 technician'],
        correct: 0,
        exp: 'GWO ART trains rescue teams to extract an injured or unconscious worker from a wind turbine nacelle or tower — a more complex operation than self-rescue. Sites with multiple technicians at height typically require at least one ART-certified rescuer on the team.',
      },
      {
        q: 'What does a pre-use inspection of an SRL (self-retracting lanyard) include?',
        a: ['Housing integrity (cracks, deformation), webbing or cable (cuts, kinks, corrosion), snap hook gate latch, and retraction function test', 'Reading the serial number and checking calibration label', 'Checking the weight rating matches the heaviest technician on site', 'Verifying the SRL color-codes match the site safety color system'],
        correct: 0,
        exp: 'Pre-use inspection per ANSI Z359.14 checks: housing for cracks or deformation, cable or webbing for cuts, kinks, or corrosion, snap hook gate for latch function and corrosion, and retraction test (pull and verify lock). Equipment with any defect must be removed from service.',
      },
    ],
  },

  {
    id: 'wtur-career',
    num: 16,
    title: 'Maintenance, Blade Inspection & Wind Career',
    desc: 'PM schedules, leading edge erosion, LPS continuity testing, gearbox borescope, GWO certifications, career progression, and wind industry employers.',
    slides: [
      {
        title: 'Scheduled Maintenance & Blade Inspection',
        body: [
          'Wind turbine PM follows 6-month (minor) and annual (major) cycles. Minor PM covers oil level checks, bolt torque verification, filter inspection, lubrication of pitch/yaw bearings, and vibration data review. Major PM adds oil analysis and changes, full electrical inspection, blade inspection, and gearbox borescope.',
          'Blade inspection methods include ground-based visual (binoculars), drone/UAV photographic survey, and rope access technician inspection. Leading edge erosion (LEE) — caused by rain, dust, and insect impact at the blade tip — reduces AEP by 2-5% and requires leading edge protection (LEP) tape or coating repair.',
          'The lightning protection system (LPS) per IEC 61400-24 routes strike current from blade receptors through the blade down conductor, pitch bearing shaft grounding, main shaft, and tower to the foundation earth electrode. Annual continuity testing measures resistance between each blade receptor and tower base — pass criterion is <= 1 ohm.',
          'Blade bolt torque verification — checking pitch bearing attachment bolt torque using a calibrated torque multiplier — is safety-critical. Loose pitch bearing bolts allow blade root movement and fatigue cracking. OEM torque specs (typically 3,000-8,000 N*m for large turbines) must be applied using calibrated equipment.',
        ],
        keyPoints: [
          '6-month minor PM: checks; annual major PM: oil analysis, blade inspection, borescope',
          'Leading edge erosion: 2-5% AEP loss — repair with LEP tape or polyurethane coating',
          'LPS continuity: <= 1 ohm from blade receptor to tower base per IEC 61400-24',
          'Pitch bearing bolt torque: safety-critical — use OEM spec and calibrated torque multiplier',
        ],
        quiz: [
          {
            q: 'During an annual drone blade inspection, significant leading edge erosion is found from 60% to blade tip on all three blades. What is the expected energy impact and recommended action?',
            a: ['2-5% AEP loss — schedule leading edge protection (LEP) repair at the next opportunity', 'No significant impact — erosion only affects appearance', '50% AEP loss — immediate blade replacement required', 'Increase rotor speed to compensate for reduced aerodynamic efficiency'],
            correct: 0,
            exp: 'Leading edge erosion in the outer blade region (highest tip speed) disrupts the airfoil boundary layer, increasing drag and reducing lift — typically 2-5% AEP loss for moderate to severe LEE. LEP tape or polyurethane coating repair is the standard remediation, scheduled at the next service outage.',
          },
          {
            q: 'An LPS continuity test measures 3.2 ohms between a blade receptor and the tower base. What does this indicate?',
            a: ['A high-resistance fault in the LPS path — investigation and repair required before returning to service', 'Normal — LPS resistance is typically 3-5 ohms', 'The blade receptor is disconnected — replace the blade', 'Moisture in the test lead — re-test with a different lead'],
            correct: 0,
            exp: 'IEC 61400-24 requires <= 1 ohm from receptor to tower base. A reading of 3.2 ohms indicates a high-resistance joint (corroded receptor, loose connector, damaged down conductor or pitch bearing grounding). This must be traced and repaired — inadequate LPS risks lightning damage to bearings and gearbox.',
          },
        ],
      },
      {
        title: 'GWO Certifications & Career Pathways',
        body: [
          "GWO (Global Wind Organisation) certifications are the industry baseline for safety competence. BST covers five core safety modules — valid 2 years. GWO Advanced Rescue Training (ART) and Technical Training modules (blade maintenance, electrical safety) build on BST. Employers require GWO BST as a minimum access condition.",
          'Technician career progression: Wind Turbine Technician I (0-2 years, supervised PM work) -> Technician II (2-5 years, independent fault diagnosis) -> Senior Technician/Lead Tech (5+ years, technical authority) -> Site Manager or Technical Specialist.',
          'Major wind OEM service employers include Vestas, Siemens Gamesa, GE Vernova, Nordex, and Enercon. Independent service operators (ISOs) maintain multi-OEM fleets. Offshore technicians earn a 10-30% wage premium and require GWO Sea Survival and Helicopter Underwater Escape Training (HUET).',
          'BLS (2023) reports median annual salary for wind turbine service technicians at approximately $61,000; offshore and lead technician roles can exceed $90,000. BLS projects 45% job growth for wind turbine technicians from 2022-2032 — the fastest-growing occupation in the U.S.',
        ],
        keyPoints: [
          'GWO BST: 5 modules, valid 2 years, required for site access',
          'Offshore premium: 10-30% above onshore; requires Sea Survival + HUET',
          'Career path: Tech I -> Tech II -> Senior Tech -> Site Manager/Specialist',
          'BLS: ~$61,000 median salary; 45% job growth projected 2022-2032',
        ],
        quiz: [
          {
            q: 'How long is a GWO Basic Safety Training (BST) certificate valid before a refresher is required?',
            a: ['2 years', '1 year', '3 years', '5 years'],
            correct: 0,
            exp: 'GWO BST certificates are valid for 2 years. After expiry, technicians complete a GWO BST Refresher (condensed recertification) rather than the full initial course. Some sites accept a short grace period; always check site-specific access requirements.',
          },
          {
            q: 'What additional certifications beyond GWO BST does an offshore wind technician typically require?',
            a: ['GWO Sea Survival and Helicopter Underwater Escape Training (HUET)', 'NABCEP PV Associate', 'NATE Core certification', 'EPA Section 608 Universal certification'],
            correct: 0,
            exp: 'Offshore work involves crew transfer vessels and potentially helicopter transport — GWO Sea Survival (part of BST for offshore) and HUET cover emergency procedures for water immersion and helicopter ditching. These are mandatory for offshore site access in addition to BST and OEM-specific training.',
          },
        ],
      },
    ],
    test: [
      {
        q: 'What is the standard frequency for a wind turbine major preventive maintenance service?',
        a: ['Every 12 months', 'Every 6 months', 'Every 3 months', 'Every 24 months'],
        correct: 0,
        exp: 'The industry standard is major PM annually and minor PM every 6 months. The annual major PM includes oil changes, oil analysis, full electrical inspection, blade inspection, gearbox borescope, and control system calibration.',
      },
      {
        q: 'A gearbox borescope inspection reveals spalling on the high-speed shaft bearing inner race. What is the appropriate response?',
        a: ['Remove the turbine from service for unplanned gearbox maintenance — spalling indicates imminent failure', 'Log the finding and monitor at the next scheduled borescope', 'Add oil to cushion the damaged bearing', 'Reduce power limit to 50% and continue operating'],
        correct: 0,
        exp: 'Spalling (flaking of the raceway surface) is an advanced bearing failure mode — material is being lost from the raceway, generating debris that accelerates failure. Continued operation risks catastrophic gearbox damage. Unplanned removal for repair or replacement is typically required.',
      },
      {
        q: 'What organization administers the internationally recognized Basic Safety Training (BST) standard for the wind energy industry?',
        a: ['GWO — Global Wind Organisation', 'AWEA — American Wind Energy Association', 'NABCEP — North American Board of Certified Energy Practitioners', 'NATE — North American Technician Excellence'],
        correct: 0,
        exp: 'GWO (Global Wind Organisation), headquartered in Copenhagen, develops and administers safety and technical training standards used by wind turbine manufacturers, operators, and service companies worldwide. The BST standard ensures a consistent safety baseline across different OEM platforms.',
      },
      {
        q: 'The U.S. Bureau of Labor Statistics projects what job growth rate for wind turbine service technicians from 2022 to 2032?',
        a: ['45%', '10%', '25%', '5%'],
        correct: 0,
        exp: 'BLS projects approximately 45% growth in wind turbine technician employment from 2022-2032 — the fastest-growing occupation in the United States, driven by continued wind capacity additions, offshore wind expansion, and fleet repowering.',
      },
      {
        q: 'An LPS continuity test reading of 0.4 ohms between a blade receptor and tower base indicates:',
        a: ['A healthy, low-resistance LPS path — the turbine passes the IEC 61400-24 <= 1 ohm requirement', 'A failed down conductor — repair required', 'Normal — any reading below 10 ohms is acceptable', 'The blade receptor is disconnected'],
        correct: 0,
        exp: '0.4 ohms is well below the IEC 61400-24 requirement of <= 1 ohm — the LPS path from receptor to tower base is intact and provides a low-impedance path for lightning current. This result passes the annual LPS inspection.',
      },
      {
        q: 'What is the standard inspection interval for wind turbine pitch bearing attachment bolts?',
        a: ['Per OEM specification — typically annual or after significant storm or overspeed events', 'Every 5 years', 'Every 500 operating hours only', 'Once at commissioning — no further inspection required'],
        correct: 0,
        exp: 'Pitch bearing bolt torque is verified per OEM PM schedule — typically annually or after overspeed or storm events that may have caused additional loading. Loose bolts can allow blade root movement leading to fatigue cracking and, ultimately, blade loss.',
      },
      {
        q: 'A rope access technician performing blade leading edge repair must be certified to which standard?',
        a: ['IRATA or SPRAT rope access standards, plus GWO WAH for site access', 'OSHA 10 construction only', 'IEC 61400-24 lightning protection standard', 'NFPA 72 fire alarm systems'],
        correct: 0,
        exp: 'Blade rope access work requires IRATA Level 1-3 or SPRAT (Society of Professional Rope Access Technicians) certification in addition to GWO Working at Heights for nacelle and hub access. Both certifications are typically required by wind farm operators for external blade work.',
      },
      {
        q: 'A wind farm owner finds turbine 7 producing 6% less than the fleet average at equivalent wind speeds over 12 months. What is the first diagnostic step?',
        a: ['Power curve test and blade inspection — pitch offset or leading edge erosion is most likely', 'Replace the gearbox', 'Check the SCADA communication link', 'Increase transformer tap voltage'],
        correct: 0,
        exp: 'Persistent underperformance relative to the fleet at equivalent wind speeds suggests a turbine-specific aerodynamic or pitch issue. A power curve test per IEC 61400-12 combined with a blade inspection and pitch calibration audit are the standard first steps before committing to major component replacement.',
      },
      {
        q: 'What is the role of GWO Advanced Rescue Training (ART)?',
        a: ['Training rescue technicians to extract an incapacitated worker from a wind turbine at height', 'Advanced climbing techniques for tower heights above 100 m', 'Helicopter rescue coordination for offshore incidents', 'Advanced SCADA fault diagnosis procedures'],
        correct: 0,
        exp: 'GWO ART trains rescue teams to extract an injured or unconscious worker from a nacelle or tower — more complex than self-rescue using the RDS. Sites with multiple technicians at height typically require at least one ART-certified rescuer on the team.',
      },
      {
        q: 'What is the typical next career step for a Wind Turbine Technician II with 5+ years of experience seeking technical leadership?',
        a: ['Senior Technician or Lead Tech role — demonstrated diagnostic expertise and OEM specialty training required', 'Completing an electrical journeyman apprenticeship in a different trade', 'Obtaining NABCEP PV Associate credential', 'Moving to solar installation to broaden renewable energy experience'],
        correct: 0,
        exp: 'Within wind, progression from Tech II is to Senior/Lead Technician — responsible for mentoring junior techs, performing complex fault diagnostics, and serving as technical authority on site. OEM specialty training (major component replacement, converter service) and leadership experience drive this promotion.',
      },
    ],
  },
];
