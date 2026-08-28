// SCOPE SAMPLE — NOT WIRED INTO THE APP.
//
// Only Module 11 is fully authored here, as a reviewable sample of format
// and technical depth before committing to Modules 12-16 (see
// docs/curriculum-scope/water-wastewater-operator.md for the full outline).
// This file is intentionally not imported by src/data/index.ts and the
// `water-wastewater` course id does not exist in src/data/courses.ts — the
// track stays a "Coming Soon" teaser (src/data/upcomingCourses.ts) until
// all 6 trade modules are written, reviewed, and an exam bank exists.

import type { TrainingModule } from './modules';

export const WATER_WASTEWATER_MODULES: TrainingModule[] = [
  // ── Module 11: Water & Wastewater Industry Fundamentals ─────────────────
  {
    id: 'water-wastewater-fundamentals',
    num: 11,
    title: 'Water & Wastewater Industry Fundamentals',
    desc: 'The water cycle a utility actually manages, the regulatory framework operators work under, how operator certification works, and what the job looks like day to day.',
    slides: [
      {
        title: "The Water Cycle and the Utility's Role",
        body: [
          "Nature runs its own water cycle — evaporation, condensation, precipitation, runoff. A utility runs an engineered version of it: source water gets treated into drinking water, distributed to customers, collected afterward as wastewater, treated again, and either discharged back to the environment or reused.",
          'Source water is either surface water (rivers, lakes, reservoirs) or groundwater (wells). Surface water is more exposed to contamination and runoff, so it usually needs more treatment steps. Groundwater is naturally filtered by the soil it passed through, but can carry its own issues — hardness, dissolved iron and manganese, or contamination from nearby wells and land use.',
          'Drinking water (potable) systems and wastewater (sanitary sewer) systems are functionally separate, even when the same utility runs both. Water going out to a customer\'s tap and water coming back from their drain are treated at different plants, to different standards, under different sections of federal law.',
          'Plant capacity — how much water a plant is designed to treat, or actually treating on a given day — is expressed in MGD: million gallons per day. A small rural system might run under 1 MGD; a major city\'s plant can run well into the hundreds.',
        ],
        keyPoints: [
          'A utility manages an engineered water cycle: source → treatment → distribution → collection → treatment → discharge/reuse.',
          'Surface water and groundwater sources come with different treatment challenges.',
          'Drinking water and wastewater are separate systems, often run by the same utility.',
          'Plant capacity is measured in MGD — million gallons per day.',
        ],
        quiz: [
          {
            q: 'MGD, the standard unit for describing a treatment plant\'s size, stands for:',
            a: ['Million Gallons per Day', 'Maximum Gallons per Discharge', 'Metered Gallons per Distribution', 'Minimum Gallons per Day'],
            correct: 0,
            exp: 'MGD (million gallons per day) is the standard unit for both a plant\'s design capacity and its actual daily flow.',
          },
        ],
      },
      {
        title: 'The Regulatory Framework: SDWA and CWA',
        body: [
          'Two federal laws form the backbone of this whole industry. The Safe Drinking Water Act (SDWA, 1974) governs public drinking water systems — EPA sets National Primary Drinking Water Regulations, which are enforceable maximum contaminant levels for regulated substances.',
          'The Clean Water Act (CWA, 1972) governs what can legally be discharged into waters of the United States. A wastewater treatment plant operates under an NPDES permit — National Pollutant Discharge Elimination System — which sets discharge limits specific to that plant and the water body it discharges into.',
          'EPA sets the federal floor, but most states hold "primacy" — meaning EPA has delegated day-to-day permitting and enforcement authority to the state environmental agency, which can set requirements at least as strict as the federal rules, and often does.',
          'As a working operator, the two documents you\'ll actually interact with are your plant\'s NPDES permit (wastewater side) and your state\'s drinking water regulations — plus your own operator certification requirements, which is its own layer of regulation covering you personally, not just the plant.',
        ],
        keyPoints: [
          'SDWA (1974) governs drinking water; CWA (1972) governs what gets discharged.',
          'NPDES permits set plant-specific wastewater discharge limits under the CWA.',
          'Most states hold "primacy" — delegated federal authority, and can be stricter than the federal floor.',
          "Operators work most directly with their plant's NPDES permit or their state's drinking water rules.",
        ],
        quiz: [
          {
            q: "Under the Clean Water Act, a wastewater treatment plant's specific discharge limits are set by its:",
            a: ['NPDES permit', 'Operator certification', 'Consumer Confidence Report', 'Class A biosolids designation'],
            correct: 0,
            exp: "The NPDES (National Pollutant Discharge Elimination System) permit sets the discharge limits specific to that plant, issued under the Clean Water Act.",
          },
        ],
      },
      {
        title: 'Operator Certification: Classes and the Operator of Record',
        body: [
          "Nearly every state requires a certified operator for public water and wastewater systems. This certification is what actually makes you employable and legally authorized to make process control decisions on a licensed system.",
          'Most states use a tiered class system — commonly Class I through Class IV, from the smallest, simplest systems up to the largest and most complex — with separate licenses typically required for water treatment, water distribution, wastewater treatment, and wastewater collection.',
          'Every licensed plant must designate an Operator of Record (sometimes called Operator in Responsible Charge, or ORC) — the certified individual legally accountable for that plant\'s compliance, even on shifts when other staff are doing the hands-on work.',
          'Getting certified typically requires a combination of qualifying experience or training hours, passing a state exam, and ongoing continuing education units (CEUs) to keep the license current. The Association of Boards of Certification (ABC) coordinates standards across states, which is what makes reciprocity — transferring a license from one state to another — possible.',
        ],
        keyPoints: [
          'Most states use tiered classes (commonly I-IV) for both water and wastewater licenses, held separately.',
          "The Operator of Record (ORC) is legally accountable for a plant's day-to-day compliance.",
          'Certification requires qualifying experience/training hours, a state exam, and ongoing CEUs to renew.',
          'The Association of Boards of Certification (ABC) coordinates multi-state reciprocity.',
        ],
        quiz: [
          {
            q: "The operator who is legally accountable for a plant's day-to-day regulatory compliance is called the:",
            a: ['Operator of Record (ORC)', 'Class IV Technician', 'Plant Superintendent', 'Lab Analyst'],
            correct: 0,
            exp: 'The Operator of Record (or Operator in Responsible Charge) is the certified individual legally accountable for the plant, regardless of who is physically on shift.',
          },
        ],
      },
      {
        title: 'How a Utility Is Organized',
        body: [
          'A water or wastewater utility typically splits into distinct functional groups: treatment plant operations (running the actual treatment process), distribution or collection systems (the pipes, pump stations, and lift stations that move water to and from customers), maintenance, and a laboratory for water quality testing.',
          "Plant classification — based on size (usually expressed in MGD) and process complexity — determines what class of operator license is required to legally run it. A small rural system might only need a Class I operator; a major city's plant needs a Class IV.",
          "Shift structure matters here in a way it doesn't in a lot of trades: many plants, especially wastewater, run 24/7 because sewage doesn't stop flowing at 5pm. Rotating shifts, weekend coverage, and on-call rotations for alarms are normal parts of the job.",
          'The career ladder is real and doesn\'t require a degree at any step: operator-in-training, to certified operator, to senior or chief operator, to Operator of Record, to plant superintendent or utility manager — each step gained through experience and passing the next certification exam.',
        ],
        keyPoints: [
          'Utilities separate into treatment operations, distribution/collection, maintenance, and lab.',
          "Plant size and complexity (often measured in MGD) determine the required operator class.",
          'Many plants run 24/7 — shift work and on-call rotations are normal.',
          'A clear career ladder runs from operator-in-training to plant superintendent, no degree required at any step.',
        ],
        quiz: [
          {
            q: 'Why do many wastewater treatment plants require staffing around the clock?',
            a: ["Wastewater flows continuously and the treatment process can't simply be paused overnight", 'State law requires three shifts at every plant regardless of size', 'Lab testing can only be performed at night', 'NPDES permits require a minimum of three operators on duty at all times'],
            correct: 0,
            exp: "Sewage flow doesn't stop, and most treatment processes (biological treatment especially) need continuous monitoring — so plants staff around the clock rather than pausing overnight.",
          },
        ],
      },
      {
        title: 'What This Job Actually Looks Like Day to Day',
        body: [
          'Routine process checks make up a lot of the shift: reading gauges and SCADA screens, adjusting chemical feed rates, visually checking clarifier and filter performance, and logging readings on a set schedule.',
          'Lab and sampling duties are hands-on and constant — pulling grab samples, running basic on-site tests like chlorine residual, pH, and turbidity, and preparing samples that get sent to an offsite lab for more detailed analysis.',
          "Operators are usually the first to notice something's off mechanically — a pump acting up, a valve stuck, an alarm condition — and either handle the minor fix themselves or flag it for maintenance before it becomes a bigger problem.",
          "Documentation is constant and non-negotiable, because plants operate under strict recordkeeping requirements that regulators can audit at any time — and Discharge Monitoring Reports get built directly from the data operators log every shift. Ultimately, this job protects public health directly: a mistake at a drinking water plant, or an unpermitted discharge from a wastewater plant, has real, immediate consequences for an entire community.",
        ],
        keyPoints: [
          'Daily work mixes process monitoring, basic lab testing, minor troubleshooting, and constant documentation.',
          "Operator logs and sampling data feed directly into required regulatory reports like DMRs.",
          'This is a public-health-critical role — errors have direct, immediate community consequences.',
        ],
        quiz: [
          {
            q: 'Discharge Monitoring Reports (DMRs) are built primarily from:',
            a: ['Operator-collected process and sampling data', 'State inspector site visits', 'Customer complaint records', 'Annual budget reports'],
            correct: 0,
            exp: "DMRs are compiled from the operator's own logged process data and sample results — which is exactly why accurate, consistent documentation matters so much in this job.",
          },
        ],
      },
    ],
    test: [
      { q: 'MGD, used to describe treatment plant capacity, stands for:', a: ['Million Gallons per Day', 'Maximum Gallons per Discharge', 'Metered Gallons per Distribution', 'Minimum Gallons per Day'], correct: 0, exp: 'MGD (million gallons per day) is the standard unit for a plant\'s design capacity or actual daily flow.' },
      { q: 'Which federal law governs public drinking water systems?', a: ['The Safe Drinking Water Act (SDWA)', 'The Clean Water Act (CWA)', 'The Clean Air Act', 'The Resource Conservation and Recovery Act'], correct: 0, exp: 'The SDWA (1974) is the federal law governing public drinking water systems, with EPA setting National Primary Drinking Water Regulations.' },
      { q: 'Which federal law governs what can be discharged into waters of the United States?', a: ['The Clean Water Act (CWA)', 'The Safe Drinking Water Act (SDWA)', 'The Toxic Substances Control Act', 'The National Environmental Policy Act'], correct: 0, exp: 'The CWA (1972) regulates discharges into US waters, primarily enforced through NPDES permits.' },
      { q: "A wastewater treatment plant's specific discharge limits come from its:", a: ['NPDES permit', 'Operator certification card', 'Consumer Confidence Report', 'State primacy agreement'], correct: 0, exp: "The plant's NPDES (National Pollutant Discharge Elimination System) permit sets discharge limits specific to that facility." },
      { q: 'What does it mean for a state to hold "primacy" under the SDWA or CWA?', a: ['EPA has delegated day-to-day permitting and enforcement authority to that state', 'The state is exempt from federal drinking water standards', 'Only that state\'s operators can work in neighboring states', 'The state must use EPA-employed operators at every plant'], correct: 0, exp: 'Primacy means EPA has delegated permitting/enforcement authority to the state agency, which can set requirements at least as strict as federal rules.' },
      { q: "The operator legally accountable for a plant's day-to-day compliance is the:", a: ['Operator of Record (ORC)', 'Lab Technician', 'Class I Trainee', 'Utility Board Member'], correct: 0, exp: 'The Operator of Record (or Operator in Responsible Charge) carries legal accountability for the plant, regardless of who else is on shift.' },
      { q: 'What organization coordinates operator certification standards and reciprocity across states?', a: ['The Association of Boards of Certification (ABC)', 'The Environmental Protection Agency (EPA) directly', 'The American Water Works Association Board of Directors', 'OSHA'], correct: 0, exp: 'The Association of Boards of Certification (ABC) coordinates standards that make multi-state license reciprocity possible.' },
      { q: 'The two main categories of drinking water source are:', a: ['Surface water and groundwater', 'Treated water and raw water', 'Municipal water and private water', 'Potable water and reclaimed water'], correct: 0, exp: 'Drinking water sources are classified as surface water (rivers, lakes, reservoirs) or groundwater (wells), each with different treatment challenges.' },
      { q: 'Why do many wastewater plants require staffing around the clock?', a: ['Flow is continuous and treatment processes need ongoing monitoring', 'State law mandates three shifts regardless of plant size', 'Chemical deliveries only arrive overnight', 'Lab equipment can only run at night'], correct: 0, exp: "Wastewater flow doesn't stop, and biological treatment processes especially need continuous monitoring, so plants typically staff 24/7." },
      { q: 'Discharge Monitoring Reports (DMRs) required under a plant\'s NPDES permit are built primarily from:', a: ['Operator-collected process and sampling data', 'Customer complaint logs', 'Annual capital budget reports', 'State inspector visit notes'], correct: 0, exp: "DMRs are compiled from the operator's own logged readings and sample results, which is why consistent documentation is a core part of the job." },
    ],
  },
];
