// CURRICULUM CONTENT — NOT YET WIRED INTO THE APP.
//
// All 6 trade-specific modules (11-16) are fully authored here, matching
// the depth of an existing "Tech" tier course (e.g.
// src/data/pump-tech-modules.ts). See
// docs/curriculum-scope/water-wastewater-operator.md for the outline this
// was built from. This file is intentionally not imported by
// src/data/index.ts and the `water-wastewater` course id does not exist in
// src/data/courses.ts — the track stays a "Coming Soon" teaser
// (src/data/upcomingCourses.ts) until content review is complete and the
// course is wired in (add to courses.ts/index.ts, remove from
// upcomingCourses.ts, add Stripe products, decide diagram assets).

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

  // ── Module 12: Drinking Water Treatment Processes ────────────────────────
  {
    id: 'drinking-water-treatment',
    num: 12,
    title: 'Drinking Water Treatment Processes',
    desc: 'The treatment train that turns raw source water into safe drinking water — coagulation, sedimentation, filtration, disinfection, corrosion control, and fluoridation.',
    slides: [
      {
        title: 'Coagulation and Flocculation',
        body: [
          'Raw water carries suspended particles too small and too lightly charged to settle on their own — most carry a slight negative charge that keeps them apart, like magnets repelling.',
          'Coagulation neutralizes that charge by adding a coagulant chemical — commonly alum (aluminum sulfate) or ferric chloride — during rapid mix, so particles can start sticking together.',
          'Flocculation follows: slow, gentle mixing in a flocculation basin encourages the destabilized particles to collide and grow into larger clumps called floc.',
          "Polymers are often added to strengthen floc and improve settling. Getting the coagulant dose right is one of the most important — and most frequently adjusted — decisions an operator makes, since raw water quality shifts with weather and season.",
        ],
        keyPoints: [
          'Coagulation neutralizes particle charge so particles can clump together.',
          'Common coagulants: alum (aluminum sulfate) and ferric chloride.',
          'Flocculation is slow, gentle mixing that grows floc particles large enough to settle.',
          'Coagulant dose is adjusted regularly as raw water quality changes.',
        ],
        quiz: [
          {
            q: 'The purpose of adding a coagulant like alum to raw water is to:',
            a: ['Neutralize the charge on suspended particles so they can clump together', 'Kill bacteria and viruses in the water', 'Adjust the pH to a neutral value', 'Add dissolved oxygen for downstream biological treatment'],
            correct: 0,
            exp: 'Coagulants neutralize the charge that normally keeps fine particles apart, allowing them to clump into floc during flocculation.',
          },
        ],
      },
      {
        title: 'Sedimentation and Clarification',
        body: [
          'After flocculation, water flows into a sedimentation basin (clarifier) where flow slows down enough for the heavier floc particles to settle out by gravity.',
          'Settled material collects as sludge at the bottom and is periodically removed; clear water continues on to filtration.',
          'Some plants use a sludge blanket clarifier, where incoming water passes up through a suspended layer of existing floc, which acts as a filter and improves particle capture.',
          "Detention time — how long water stays in the basin — and even flow distribution are both critical. Short-circuiting (water finding a fast path through) reduces settling efficiency and pushes more solids downstream to the filters.",
        ],
        keyPoints: [
          'Sedimentation uses gravity settling in a slowed-flow basin to remove floc.',
          'Settled sludge is periodically removed from the bottom of the basin.',
          'Sludge blanket clarifiers use a suspended floc layer to improve particle capture.',
          'Detention time and even flow distribution both affect settling performance.',
        ],
        quiz: [
          {
            q: 'Short-circuiting in a sedimentation basin refers to:',
            a: ['Water finding a fast path through the basin, reducing settling time', 'A power failure that stops the clarifier motor', 'Sludge building up faster than it can be removed', 'Chemical feed pumps running out of coagulant'],
            correct: 0,
            exp: 'Short-circuiting reduces the effective detention time water spends settling, letting more solids carry through to filtration.',
          },
        ],
      },
      {
        title: 'Filtration Methods',
        body: [
          "Filtration removes the fine particles that settling couldn't catch. Rapid sand filtration — water passing down through layered sand and gravel — is the traditional, most widespread method.",
          'Dual-media filters add a layer of anthracite coal above the sand, which captures larger particles near the surface and finer ones deeper in the bed, extending run time between cleanings.',
          "Membrane filtration (microfiltration, ultrafiltration, and reverse osmosis) uses physical barriers with pore sizes small enough to remove particles — and in RO's case, dissolved salts and many contaminants too — increasingly common for water reuse and difficult source waters.",
          'All filters eventually clog and need backwashing — reversing flow to lift and flush trapped material out of the media — an operator judgment call based on rising headloss (pressure difference across the filter) or a scheduled interval, whichever comes first.',
        ],
        keyPoints: [
          'Rapid sand filtration is the traditional standard filtration method.',
          'Dual-media (anthracite + sand) filters extend run time between cleanings.',
          'Membrane filtration (MF/UF/RO) uses physical barriers; RO also removes dissolved contaminants.',
          'Backwashing reverses flow to clean a clogged filter, triggered by rising headloss or a schedule.',
        ],
        quiz: [
          {
            q: 'Backwashing a filter is done in response to:',
            a: ['Rising headloss as the filter media becomes clogged with trapped particles', 'A drop in disinfectant residual', 'An increase in raw water turbidity', 'A scheduled coagulant dose change'],
            correct: 0,
            exp: 'Backwashing clears trapped particles from the media once headloss (or a fixed schedule) signals the filter needs cleaning.',
          },
        ],
      },
      {
        title: 'Disinfection and the CT Concept',
        body: [
          'Disinfection is the step that actually kills or inactivates pathogens — bacteria, viruses, protozoa — before water reaches customers. Chlorination (adding chlorine gas or hypochlorite) is the most common method in the US.',
          'Chloramination (chlorine plus ammonia) produces a more stable, longer-lasting residual through the distribution system, though it disinfects more slowly than free chlorine.',
          'UV disinfection uses ultraviolet light to damage pathogen DNA/RNA, effective against chlorine-resistant organisms like Cryptosporidium, but leaves no residual protection in the pipes afterward. Ozone is a strong oxidant/disinfectant used similarly, also without a lasting residual.',
          'Regulators evaluate disinfection using the CT concept: Concentration of disinfectant (C) multiplied by Time of contact (T). A required CT value must be met to reliably inactivate a target pathogen — low concentration for a long time can achieve the same inactivation as high concentration for a short time.',
        ],
        keyPoints: [
          'Disinfection kills/inactivates pathogens; chlorination is the most common US method.',
          'Chloramination gives a longer-lasting residual than free chlorine, but disinfects more slowly.',
          'UV and ozone are effective against chlorine-resistant organisms but leave no residual.',
          'CT (Concentration × Time) is the standard measure of disinfection effectiveness.',
        ],
        quiz: [
          {
            q: 'The CT concept in disinfection refers to:',
            a: ['Disinfectant concentration multiplied by contact time', 'Chlorine tolerance of the target pathogen', 'Coagulant dose multiplied by turbidity', 'Cost per thousand gallons treated'],
            correct: 0,
            exp: 'CT (Concentration × Time) is the standard measure regulators use to evaluate whether disinfection reliably inactivates a target pathogen.',
          },
        ],
      },
      {
        title: 'Corrosion Control and Fluoridation',
        body: [
          "Corrosive water can leach lead and copper from customer plumbing and service lines — the exact problem the federal Lead and Copper Rule targets. Operators control corrosivity mainly by adjusting pH and alkalinity, and sometimes adding a corrosion inhibitor like orthophosphate.",
          'The Lead and Copper Rule requires utilities to monitor tap water at customer sites and take action — including corrosion control treatment and public education — if lead or copper levels exceed action levels.',
          'Fluoridation — adding fluoride to a target concentration for dental health benefit — is a local/state policy decision, not a federal mandate, and where practiced requires careful, precise dosing since fluoride is beneficial in a narrow range and harmful in excess.',
          "Both corrosion control and fluoridation share a common theme: they're chemical-feed processes where small dosing errors have real public health consequences, which is why they're documented and calibrated as carefully as disinfection.",
        ],
        keyPoints: [
          'Corrosive water can leach lead and copper from customer plumbing, not the treatment plant.',
          'The Lead and Copper Rule requires tap monitoring and corrosion control action if levels exceed limits.',
          'pH/alkalinity adjustment and corrosion inhibitors (like orthophosphate) reduce corrosivity.',
          'Fluoridation is a local/state decision requiring precise dosing, not a federal mandate.',
        ],
        quiz: [
          {
            q: 'The Lead and Copper Rule primarily addresses contamination that originates from:',
            a: ['Corrosion of customer plumbing and service lines, not the treatment plant itself', 'Coagulant overdosing at the treatment plant', 'Cross-connections with wastewater lines', 'Fluoride overdosing'],
            correct: 0,
            exp: "Lead and copper typically enter drinking water from corrosion of a customer's own plumbing or service line, which is why corrosion control — not just plant treatment — is central to the rule.",
          },
        ],
      },
    ],
    test: [
      { q: 'What is the purpose of adding a coagulant like alum to raw water?', a: ['Neutralize particle charge so particles clump together', 'Kill pathogens directly', 'Increase dissolved oxygen', 'Lower water temperature'], correct: 0, exp: 'Coagulants neutralize the charge keeping fine particles apart so they can form floc.' },
      { q: 'What is "floc"?', a: ['Clumped particles formed during coagulation and flocculation', 'A type of filter media', 'A disinfection byproduct', 'The sludge layer in a digester'], correct: 0, exp: 'Floc is the clumped material formed when destabilized particles collide and stick together during flocculation.' },
      { q: 'Short-circuiting in a sedimentation basin means:', a: ['Water taking a fast path through, reducing settling time', 'An electrical fault in the clarifier drive', 'Sludge overflowing the weir', 'The basin running completely dry'], correct: 0, exp: 'Short-circuiting reduces effective detention time, letting more solids escape settling.' },
      { q: 'Dual-media filters add which material above the sand layer?', a: ['Anthracite coal', 'Activated carbon', 'Limestone', 'Diatomaceous earth'], correct: 0, exp: 'Anthracite coal sits above sand in a dual-media filter, capturing larger particles near the surface.' },
      { q: 'Which filtration method can remove dissolved contaminants, not just suspended particles?', a: ['Reverse osmosis (RO)', 'Rapid sand filtration', 'Dual-media filtration', 'Bar screening'], correct: 0, exp: "RO membranes are fine enough to reject dissolved salts and many dissolved contaminants, not just suspended particles." },
      { q: 'Backwashing a filter is triggered by:', a: ['Rising headloss / clogging of the media', 'A drop in raw water turbidity', 'An increase in disinfectant residual', 'A scheduled coagulant change'], correct: 0, exp: 'Rising headloss (or a set schedule) signals it is time to backwash and clear the clogged media.' },
      { q: 'Which disinfection method leaves no lasting residual in the distribution system?', a: ['UV disinfection', 'Chlorination', 'Chloramination', 'Hypochlorite addition'], correct: 0, exp: 'UV (and ozone) disinfect effectively but leave no residual protection as water travels through the distribution system.' },
      { q: 'CT, the standard measure of disinfection effectiveness, stands for:', a: ['Concentration × Time', 'Chlorine × Turbidity', 'Contact × Temperature', 'Coagulant × Throughput'], correct: 0, exp: 'CT is disinfectant concentration multiplied by contact time, used to evaluate pathogen inactivation.' },
      { q: 'The Lead and Copper Rule primarily addresses:', a: ['Corrosion of customer plumbing and service lines', 'Coagulant overdosing at the plant', 'Fluoride overdosing', 'Turbidity in raw source water'], correct: 0, exp: "Lead and copper enter tap water mainly through corrosion of a customer's own plumbing, which the rule targets through corrosion control." },
      { q: 'Fluoridation of drinking water is:', a: ['A local/state policy decision, not a federal mandate', 'Required nationwide by the Safe Drinking Water Act', 'Only permitted in groundwater systems', 'A byproduct of the disinfection process'], correct: 0, exp: 'Fluoridation is a local or state policy choice; where practiced, it requires precise, carefully monitored dosing.' },
    ],
  },

  // ── Module 13: Wastewater Treatment Processes ────────────────────────────
  {
    id: 'wastewater-treatment',
    num: 13,
    title: 'Wastewater Treatment Processes',
    desc: 'From bar screens to biological treatment — preliminary, primary, secondary (activated sludge and alternatives), advanced nutrient removal, and effluent disinfection.',
    slides: [
      {
        title: 'Preliminary and Primary Treatment',
        body: [
          'Raw wastewater arriving at a plant first passes through preliminary treatment: bar screens remove large debris (rags, sticks, trash) that could damage pumps and equipment downstream, and grit chambers slow the flow just enough for heavy inorganic material like sand and gravel to settle out.',
          "Grit removal matters because grit is abrasive and doesn't break down biologically — leaving it in the stream would wear out pumps and clog downstream equipment.",
          'Primary treatment follows: water enters primary clarifiers, large basins where flow slows enough for settleable organic solids to sink as primary sludge, while floating material (fats, oils, grease) is skimmed off as scum.',
          'Primary treatment alone typically removes a meaningful share of suspended solids and BOD, but the remaining dissolved and fine suspended organic material still needs biological treatment before the water can be safely discharged.',
        ],
        keyPoints: [
          'Bar screens remove large debris; grit chambers remove abrasive sand and gravel.',
          'Grit removal protects downstream pumps and equipment from abrasive wear.',
          'Primary clarifiers settle organic solids as primary sludge and skim floating scum.',
          "Primary treatment alone isn't enough — biological treatment is still needed afterward.",
        ],
        quiz: [
          {
            q: 'Grit chambers remove sand and gravel primarily to:',
            a: ['Protect downstream pumps and equipment from abrasive wear', 'Reduce the BOD of the wastewater', 'Improve disinfection efficiency', 'Remove dissolved phosphorus'],
            correct: 0,
            exp: 'Grit is abrasive and non-biodegradable — removing it early protects pumps and downstream equipment from wear.',
          },
        ],
      },
      {
        title: 'The Activated Sludge Process',
        body: [
          'Activated sludge is the most widely used biological treatment process: wastewater is mixed with a concentrated population of microorganisms (the "mixed liquor") in an aeration basin, where blown or mechanically introduced air supplies the oxygen those organisms need to consume dissolved organic matter.',
          'After aeration, the mixture flows to a secondary clarifier, where the biological solids settle out as activated sludge, leaving clarified water on top.',
          'Most of that settled sludge is pumped back to the aeration basin as Return Activated Sludge (RAS), keeping a healthy microorganism population in the system; the rest is removed as Waste Activated Sludge (WAS) to keep the population from growing unchecked.',
          'Operators track sludge age (also called mean cell residence time, MCRT) and the food-to-microorganism ratio (F:M) — both describe how much "food" (organic load) is available relative to the microorganism population, and both need to stay in a healthy range for the process to work efficiently.',
        ],
        keyPoints: [
          'Activated sludge mixes wastewater with microorganisms in an aerated basin.',
          'Secondary clarifiers settle out biological solids after aeration.',
          'RAS returns settled sludge to maintain the microorganism population; WAS removes the excess.',
          'Sludge age (MCRT) and the F:M ratio are key process control numbers operators track.',
        ],
        quiz: [
          {
            q: 'In the activated sludge process, Return Activated Sludge (RAS) is:',
            a: ['Settled biological solids pumped back to the aeration basin to maintain the microorganism population', 'Excess sludge sent to digestion and dewatering', 'Chemically treated sludge used for phosphorus removal', 'Primary sludge skimmed from the clarifier surface'],
            correct: 0,
            exp: 'RAS recycles settled biological solids back into the aeration basin, keeping the microorganism population healthy and active.',
          },
        ],
      },
      {
        title: 'Other Biological Treatment Methods',
        body: [
          'Trickling filters take a different approach: wastewater is sprayed over a fixed bed of rock or plastic media, where a biological film (biofilm) growing on the media surface consumes organic matter as water trickles past — simpler and lower-energy than activated sludge, but generally less flexible.',
          'Oxidation ditches are a variation of activated sludge using a long, racetrack-shaped basin with mechanical aerators — a robust, relatively simple design common at small to mid-size plants.',
          'Sequencing Batch Reactors (SBRs) run the entire activated sludge process — fill, react (aerate), settle, decant, idle — in a single tank, one phase at a time, instead of separate basins in sequence. That flexibility makes SBRs popular for smaller plants and plants that need to handle variable flow.',
          'Every biological method is ultimately doing the same job — giving microorganisms the contact time and oxygen they need to consume organic pollutants — just with different equipment and operational trade-offs.',
        ],
        keyPoints: [
          'Trickling filters use a fixed biofilm on rock or plastic media instead of suspended microorganisms.',
          'Oxidation ditches are a racetrack-shaped variation of activated sludge.',
          'SBRs run fill-react-settle-decant-idle phases sequentially in a single tank.',
          'All biological methods share the same goal: contact time and oxygen for microorganisms to consume pollutants.',
        ],
        quiz: [
          {
            q: 'A Sequencing Batch Reactor (SBR) is distinct from conventional activated sludge because it:',
            a: ['Runs all treatment phases (fill, react, settle, decant) sequentially in a single tank', 'Uses a fixed biofilm instead of suspended microorganisms', 'Requires no aeration at any stage', 'Only treats primary sludge, not liquid wastewater'],
            correct: 0,
            exp: 'An SBR performs every step of the activated sludge process — fill, react, settle, decant, idle — in one tank, cycling through phases over time.',
          },
        ],
      },
      {
        title: 'Advanced Treatment: Nutrient Removal',
        body: [
          'Even after standard secondary treatment, effluent can still carry nitrogen and phosphorus — nutrients that, released into a lake or slow-moving river, can trigger algae blooms and oxygen depletion downstream. Many permits now require nutrient limits, especially for discharges into sensitive waters.',
          'Nitrogen removal typically uses two biological steps: nitrification, where one group of bacteria converts ammonia to nitrate (requires oxygen), followed by denitrification, where a different group converts nitrate to harmless nitrogen gas (requires an oxygen-free, or anoxic, environment).',
          'Phosphorus removal can be biological (encouraging specific bacteria to store excess phosphorus in their cells, which is then removed with the sludge) or chemical (adding a metal salt like alum or ferric chloride to precipitate phosphorus out of solution).',
          'Because nitrification and denitrification need opposite oxygen conditions, plants doing full nutrient removal are designed with distinct aerobic and anoxic (and sometimes anaerobic) zones the wastewater moves through in sequence.',
        ],
        keyPoints: [
          'Excess nitrogen and phosphorus in effluent can trigger algae blooms downstream.',
          'Nitrogen removal: nitrification (ammonia→nitrate, needs oxygen) then denitrification (nitrate→nitrogen gas, needs none).',
          'Phosphorus removal can be biological or chemical (metal salt precipitation).',
          'Nutrient-removal plants use distinct aerobic and anoxic zones in sequence.',
        ],
        quiz: [
          {
            q: 'Denitrification, the second step of biological nitrogen removal, requires:',
            a: ['An oxygen-free (anoxic) environment', 'High levels of dissolved oxygen', 'Chlorine addition', 'UV light exposure'],
            correct: 0,
            exp: 'Denitrification bacteria convert nitrate to nitrogen gas under anoxic (oxygen-free) conditions — the opposite of the oxygen-rich conditions nitrification needs.',
          },
        ],
      },
      {
        title: 'Effluent Disinfection and Dechlorination',
        body: [
          "Before treated wastewater is discharged, it's typically disinfected to reduce pathogen levels — protecting the receiving water body and anyone who might contact it downstream. Chlorination and UV disinfection are both common at this stage, the same core methods used in drinking water treatment.",
          "Unlike drinking water, wastewater effluent often needs a dechlorination step afterward if chlorine was used — because residual chlorine itself is toxic to fish and aquatic life in the receiving stream, so it has to be neutralized (commonly with sulfur dioxide or sodium bisulfite) before discharge.",
          'UV disinfection avoids the dechlorination step entirely, which is part of why many newer or upgraded plants have shifted to UV for effluent disinfection.',
          "After disinfection (and dechlorination, if needed), the treated effluent is discharged under the plant's NPDES permit limits, or in some cases reused — for irrigation, industrial processes, or, with additional advanced treatment, even indirect drinking water augmentation.",
        ],
        keyPoints: [
          'Effluent disinfection protects the receiving water body from pathogens.',
          'Chlorinated effluent typically needs dechlorination before discharge, since residual chlorine harms aquatic life.',
          'UV disinfection avoids the need for a dechlorination step.',
          'Treated effluent is discharged under NPDES permit limits or reused.',
        ],
        quiz: [
          {
            q: 'Why does chlorinated wastewater effluent typically require dechlorination before discharge?',
            a: ['Residual chlorine is toxic to fish and aquatic life in the receiving water', 'Chlorine interferes with flow measurement', 'It reduces the pH of the discharge below permit limits', 'It causes foaming in the receiving stream'],
            correct: 0,
            exp: 'Residual chlorine left in effluent is toxic to aquatic life, so it must be neutralized before discharge to protect the receiving water.',
          },
        ],
      },
    ],
    test: [
      { q: 'Bar screens in preliminary treatment remove:', a: ['Large debris such as rags, sticks, and trash', 'Dissolved organic matter', 'Fine suspended solids', 'Ammonia and nitrate'], correct: 0, exp: 'Bar screens catch large debris before it can damage downstream pumps and equipment.' },
      { q: 'Grit chambers protect downstream equipment from:', a: ['Abrasive wear from sand and gravel', 'Pathogen contamination', 'Chlorine corrosion', 'Excess dissolved oxygen'], correct: 0, exp: 'Grit is abrasive and non-biodegradable, so removing it early prevents wear on pumps and equipment.' },
      { q: 'In primary clarifiers, floating fats, oils, and grease are removed as:', a: ['Scum', 'Primary sludge', 'Mixed liquor', 'RAS'], correct: 0, exp: 'Floating material is skimmed off the clarifier surface as scum, separate from settled primary sludge.' },
      { q: 'In the activated sludge process, oxygen is supplied in the:', a: ['Aeration basin', 'Primary clarifier', 'Grit chamber', 'Digester'], correct: 0, exp: 'The aeration basin is where air is introduced to support the microorganisms consuming organic matter.' },
      { q: 'Return Activated Sludge (RAS) is:', a: ['Settled sludge pumped back to maintain the microorganism population', 'Sludge sent directly to land application', 'Sludge removed permanently from the process', 'Chemically precipitated phosphorus'], correct: 0, exp: 'RAS keeps a healthy population of treatment microorganisms cycling through the aeration basin.' },
      { q: 'Trickling filters treat wastewater using:', a: ['A fixed biofilm on rock or plastic media', 'Suspended microorganisms in an aeration basin', 'Chemical precipitation only', 'Membrane filtration'], correct: 0, exp: 'Trickling filters rely on a biofilm growing on fixed media rather than a suspended mixed-liquor population.' },
      { q: 'An SBR (Sequencing Batch Reactor) runs treatment phases:', a: ['Sequentially in a single tank', 'Simultaneously across multiple separate basins', 'Only during daylight hours', 'Without any settling step'], correct: 0, exp: 'An SBR cycles through fill, react, settle, decant, and idle phases in one tank rather than using separate basins.' },
      { q: 'Nitrification converts ammonia into:', a: ['Nitrate', 'Nitrogen gas', 'Phosphate', 'Chlorine'], correct: 0, exp: 'Nitrification is the first biological step, converting ammonia to nitrate under aerobic conditions.' },
      { q: 'Denitrification requires what kind of environment?', a: ['Anoxic (oxygen-free)', 'High dissolved oxygen', 'High chlorine residual', 'UV-exposed'], correct: 0, exp: 'Denitrification bacteria convert nitrate to nitrogen gas only in the absence of oxygen.' },
      { q: 'Why is dechlorination typically required before discharging chlorinated effluent?', a: ['Residual chlorine is toxic to aquatic life', 'It raises the effluent BOD', 'It interferes with flow metering', 'It is required only for drinking water, not wastewater'], correct: 0, exp: 'Residual chlorine harms fish and aquatic life in the receiving water, so it must be neutralized before discharge.' },
    ],
  },

  // ── Module 14: Biosolids & Residuals Management ──────────────────────────
  {
    id: 'biosolids-residuals',
    num: 14,
    title: 'Biosolids & Residuals Management',
    desc: 'What happens to the solids treatment removes — thickening, digestion, dewatering, and the 40 CFR Part 503 rules governing land application and beneficial reuse.',
    slides: [
      {
        title: 'Sludge Thickening',
        body: [
          'Sludge removed from primary and secondary clarifiers is mostly water — often 95-99%. Thickening is the first step in residuals processing, concentrating that sludge before the more expensive digestion and dewatering steps, which dramatically reduces the volume (and cost) of everything downstream.',
          'Gravity thickening is the simplest method: sludge sits in a tank and settles further under its own weight, similar in principle to a clarifier but optimized for concentrating sludge rather than clarifying water.',
          "Dissolved Air Flotation (DAF) works in the opposite direction: fine air bubbles are injected into the sludge, attaching to solids and floating them to the surface, where they're skimmed off as a thickened sludge blanket — often more effective than gravity thickening for lighter, harder-to-settle biological (secondary) sludge.",
          'Choosing gravity thickening versus DAF (or a mechanical thickener like a belt or centrifuge thickener) usually comes down to the type of sludge involved — primary sludge settles well with gravity, while activated sludge often thickens better with DAF or mechanical methods.',
        ],
        keyPoints: [
          'Sludge is typically 95-99% water — thickening concentrates it before further processing.',
          'Gravity thickening settles sludge further under its own weight.',
          'Dissolved Air Flotation (DAF) floats solids to the surface using fine air bubbles.',
          'Sludge type (primary vs. biological) often determines which thickening method works best.',
        ],
        quiz: [
          {
            q: 'Dissolved Air Flotation (DAF) thickens sludge by:',
            a: ['Injecting fine air bubbles that attach to solids and float them to the surface', 'Settling solids to the bottom of a tank under gravity', 'Spinning sludge at high speed in a centrifuge', 'Adding polymer to bind solids into a cake'],
            correct: 0,
            exp: 'DAF attaches fine air bubbles to solids, floating them to the surface for skimming, rather than settling them out.',
          },
        ],
      },
      {
        title: 'Anaerobic and Aerobic Digestion',
        body: [
          'Digestion stabilizes sludge — breaking down volatile (biodegradable) solids so the resulting biosolids are less odorous, less attractive to disease vectors, and more suitable for land application or disposal.',
          'Anaerobic digestion happens in sealed tanks without oxygen: bacteria break down organic matter in stages, ultimately producing biogas — mostly methane and carbon dioxide — that many plants capture and burn to generate heat or electricity, offsetting plant energy costs.',
          'Anaerobic digestion is commonly run at mesophilic temperatures (around 95°F / 35°C) or, for faster processing and better pathogen kill, thermophilic temperatures (around 130°F / 55°C).',
          "Aerobic digestion instead uses continued aeration — similar to extended activated sludge treatment — to break down solids using oxygen-consuming bacteria; it's simpler to operate and produces no biogas, but generally costs more in energy and is more common at smaller plants.",
        ],
        keyPoints: [
          'Digestion stabilizes sludge, reducing odor and pathogen/vector attraction.',
          'Anaerobic digestion happens without oxygen and produces usable biogas (mostly methane).',
          'Mesophilic (~95°F) and thermophilic (~130°F) are the two common anaerobic digestion ranges.',
          'Aerobic digestion uses continued aeration, is simpler but more energy-intensive, and produces no biogas.',
        ],
        quiz: [
          {
            q: 'A key advantage of anaerobic digestion over aerobic digestion is that anaerobic digestion:',
            a: ['Produces biogas that can be captured and used for heat or electricity', 'Requires no temperature control at all', 'Eliminates the need for any further dewatering', 'Works faster than aerobic digestion in every case'],
            correct: 0,
            exp: 'Anaerobic digestion produces methane-rich biogas that many plants capture and use to offset energy costs — something aerobic digestion does not offer.',
          },
        ],
      },
      {
        title: 'Dewatering Methods',
        body: [
          'Even after thickening and digestion, biosolids are still mostly water. Dewatering mechanically removes much of that remaining water, producing a solid "cake" that\'s dramatically cheaper to transport, store, and land-apply than liquid sludge.',
          "A belt filter press squeezes sludge between two moving fabric belts under increasing pressure, with polymer added beforehand to help bind solids together so they don't squeeze through the belt weave.",
          'A centrifuge spins sludge at high speed, using centrifugal force to separate solids from water — effective, compact, and increasingly common at mid-size and larger plants, though mechanically more complex and energy-intensive than a belt press.',
          'Drying beds are the simplest and lowest-energy option: sludge is spread over sand or a similar medium and allowed to dewater by gravity drainage and evaporation over days to weeks — practical for smaller plants with available land, but far slower than mechanical methods.',
        ],
        keyPoints: [
          'Dewatering produces a solid "cake" that is much cheaper to transport and land-apply than liquid sludge.',
          'Belt filter presses squeeze sludge between moving belts, aided by polymer conditioning.',
          'Centrifuges use high-speed spinning to separate solids from water.',
          'Drying beds are simple and low-energy but much slower than mechanical dewatering.',
        ],
        quiz: [
          {
            q: 'Polymer is added before belt filter pressing primarily to:',
            a: ["Help bind solids together so they don't squeeze through the belt", 'Kill pathogens in the sludge', 'Reduce the biogas production rate', 'Neutralize residual chlorine'],
            correct: 0,
            exp: 'Polymer conditioning binds fine solids together, improving capture and cake dryness during belt filter pressing.',
          },
        ],
      },
      {
        title: 'The 40 CFR Part 503 Biosolids Rule',
        body: [
          '40 CFR Part 503 is the federal rule governing how treated biosolids can be used or disposed of — covering pathogen reduction, vector attraction reduction, and pollutant (metals) concentration limits.',
          'Class A biosolids meet the strictest pathogen reduction requirements — through processes like thermophilic digestion, composting, or heat drying — and can be land-applied without site restrictions, including for use in home gardens when bagged and sold commercially.',
          'Class B biosolids meet less stringent pathogen reduction requirements and can still be land-applied, but with site restrictions — such as waiting periods before public access, crop harvesting, or grazing on the application site.',
          'Vector attraction reduction (making the biosolids unattractive to insects, birds, and rodents that could spread pathogens) is a separate requirement from pathogen reduction, and pollutant limits cap the concentration of metals like cadmium, lead, and zinc — all three requirements must be satisfied for land application, regardless of class.',
        ],
        keyPoints: [
          '40 CFR Part 503 governs biosolids pathogen reduction, vector attraction reduction, and pollutant limits.',
          'Class A biosolids meet the strictest pathogen standards and can be applied without site restrictions.',
          'Class B biosolids have less stringent pathogen reduction and require site-use restrictions.',
          'Vector attraction reduction and pollutant (metals) limits are separate requirements from pathogen class.',
        ],
        quiz: [
          {
            q: 'The main difference between Class A and Class B biosolids under 40 CFR Part 503 is:',
            a: ['The level of pathogen reduction achieved, which determines site-use restrictions', 'The type of digestion process used, with no effect on use', 'Whether the biosolids came from drinking water or wastewater treatment', 'The color and odor of the finished product'],
            correct: 0,
            exp: 'Class A biosolids meet stricter pathogen reduction standards than Class B, which is why Class A can be applied without the site restrictions Class B requires.',
          },
        ],
      },
      {
        title: 'Land Application and Beneficial Reuse',
        body: [
          "Land application puts treated biosolids' nutrient content — nitrogen, phosphorus, organic matter — to use as a soil amendment on agricultural land, reducing the need for synthetic fertilizer while recycling a resource that would otherwise need to be landfilled or incinerated.",
          "Application rates are calculated to match agronomic need — typically based on the crop's nitrogen requirement — so biosolids aren't over-applied in a way that could leach nutrients into groundwater or surface water.",
          'Not all biosolids go to land application — landfilling and incineration remain common alternatives, especially where land application sites, quality requirements, or public acceptance are limiting factors.',
          "Public perception matters here in a way it doesn't in most of this trade: biosolids management often draws community attention, so accurate recordkeeping, transparent monitoring data, and following every 40 CFR Part 503 requirement to the letter isn't just regulatory box-checking — it's what keeps a land application program viable long-term.",
        ],
        keyPoints: [
          "Land application recycles biosolids' nutrient value as a soil amendment.",
          "Application rates are calculated to match agronomic (typically nitrogen) need.",
          'Landfilling and incineration remain common alternatives to land application.',
          "Public perception and strict compliance are critical to a land application program's long-term viability.",
        ],
        quiz: [
          {
            q: 'Biosolids land application rates are typically calculated based on:',
            a: ["The crop's agronomic nitrogen requirement", 'The total volume the plant produces each year', 'The distance to the nearest landfill', 'The moisture content of the finished cake'],
            correct: 0,
            exp: 'Application rates are set to match what the crop can actually use, primarily based on nitrogen requirement, to avoid over-application.',
          },
        ],
      },
    ],
    test: [
      { q: 'Why is sludge thickened before digestion and dewatering?', a: ['To reduce volume for cheaper downstream processing', 'To kill pathogens before land application', 'To raise the pH before disinfection', 'To remove dissolved phosphorus'], correct: 0, exp: 'Thickening concentrates sludge, dramatically reducing the volume (and cost) of digestion and dewatering.' },
      { q: 'Gravity thickening works by:', a: ['Settling sludge further under its own weight', 'Injecting air bubbles to float solids', 'Spinning sludge at high speed', 'Heating sludge to evaporate water'], correct: 0, exp: 'Gravity thickening lets sludge settle and concentrate under its own weight, similar in principle to a clarifier.' },
      { q: 'DAF (Dissolved Air Flotation) thickens sludge by:', a: ['Floating solids to the surface with air bubbles', 'Settling solids to the bottom', 'Filtering through sand media', 'Adding chlorine to precipitate solids'], correct: 0, exp: 'DAF attaches fine air bubbles to solids, floating them to the surface for skimming.' },
      { q: 'Anaerobic digestion produces useful:', a: ['Biogas (methane and CO2)', 'Chlorine gas', 'Dissolved oxygen', 'Fluoride'], correct: 0, exp: 'Anaerobic digestion produces biogas, mostly methane and carbon dioxide, often captured for heat or electricity.' },
      { q: 'Mesophilic anaerobic digestion typically runs around:', a: ['95°F (35°C)', '32°F (0°C)', '212°F (100°C)', '250°F (121°C)'], correct: 0, exp: 'Mesophilic digestion operates around 95°F; thermophilic digestion runs hotter, around 130°F, for faster processing.' },
      { q: 'A belt filter press requires which chemical addition to work effectively?', a: ['Polymer', 'Chlorine', 'Fluoride', 'Orthophosphate'], correct: 0, exp: 'Polymer conditioning binds solids together before belt pressing so they form a cake instead of squeezing through the belt.' },
      { q: 'What federal rule governs biosolids land application?', a: ['40 CFR Part 503', 'The Clean Water Act directly', 'The Safe Drinking Water Act', 'OSHA 1910.146'], correct: 0, exp: '40 CFR Part 503 is the specific federal rule covering biosolids pathogen reduction, vector attraction reduction, and pollutant limits.' },
      { q: 'Class A biosolids differ from Class B primarily in:', a: ['Level of pathogen reduction achieved', 'Source (drinking water vs. wastewater)', 'Digestion temperature only, with no regulatory effect', 'Whether polymer was used in dewatering'], correct: 0, exp: 'Class A biosolids meet stricter pathogen reduction standards, allowing land application without the site restrictions Class B requires.' },
      { q: 'Vector attraction reduction is required:', a: ['Separately from pathogen reduction, for all land-applied biosolids', 'Only for Class B biosolids', 'Only when incineration is used', 'Only in states with primacy'], correct: 0, exp: 'Vector attraction reduction is a distinct requirement from pathogen reduction and applies regardless of biosolids class.' },
      { q: 'Biosolids land application rates are calculated based on:', a: ["Agronomic (crop nitrogen) need", 'Total plant production volume', 'Distance to the application site', 'Ambient air temperature'], correct: 0, exp: "Rates are set to match the crop's nitrogen need so nutrients aren't over-applied and don't leach into water." },
    ],
  },

  // ── Module 15: Monitoring, Sampling & Regulatory Compliance ──────────────
  {
    id: 'monitoring-compliance',
    num: 15,
    title: 'Monitoring, Sampling & Regulatory Compliance',
    desc: 'The lab tests, sampling protocols, SCADA systems, and reporting requirements (NPDES/DMR, Consumer Confidence Reports) that keep a plant compliant and accountable.',
    slides: [
      {
        title: 'Core Lab Tests Every Operator Should Know',
        body: [
          'BOD (Biochemical Oxygen Demand) measures how much oxygen microorganisms consume breaking down organic matter in a water sample over five days — a core indicator of how much "food" for bacteria (and oxygen-depleting potential) is in wastewater. COD (Chemical Oxygen Demand) measures similar organic strength using a chemical oxidant instead, giving a faster result but not distinguishing biodegradable from non-biodegradable material.',
          'TSS (Total Suspended Solids) measures the solid material suspended in a water sample, filtered out and weighed — a direct measure of how "cloudy" or particle-laden water is, and a standard permit limit parameter for both drinking water and wastewater.',
          'DO (Dissolved Oxygen) measures how much oxygen is actually dissolved in water — critical both inside an aeration basin (too little starves the treatment bacteria) and in a receiving stream after discharge (too little suffocates fish and aquatic life).',
          'pH, turbidity (cloudiness from suspended particles, measured optically), chlorine residual, and coliform/E. coli testing (indicators of fecal contamination) round out the tests operators run routinely — some in an on-site lab, some sent out, but all feeding directly into both process control decisions and regulatory reports.',
        ],
        keyPoints: [
          'BOD measures oxygen consumed by microorganisms over 5 days; COD is a faster chemical-based equivalent.',
          'TSS measures suspended solid material in a water sample.',
          'DO (dissolved oxygen) is critical in aeration basins and in receiving streams after discharge.',
          'pH, turbidity, chlorine residual, and coliform/E. coli testing are also routine, required tests.',
        ],
        quiz: [
          {
            q: 'BOD (Biochemical Oxygen Demand) measures:',
            a: ['How much oxygen microorganisms consume breaking down organic matter over five days', 'The total dissolved solids in a sample', 'The chlorine residual in treated water', 'The pH of a wastewater sample'],
            correct: 0,
            exp: "BOD is a five-day test measuring the oxygen microorganisms consume decomposing organic matter — a core indicator of a sample's organic strength.",
          },
        ],
      },
      {
        title: 'Sampling Protocols and Chain of Custody',
        body: [
          'A grab sample is a single sample collected at one point in time — useful for parameters that must be measured immediately (like chlorine residual or DO) or when a snapshot is what\'s required.',
          'A composite sample combines multiple smaller samples collected over a period (commonly 24 hours), either at fixed time intervals or proportional to flow, to represent an average condition rather than a single moment — required for many NPDES permit parameters precisely because wastewater characteristics vary throughout the day.',
          'Every sample destined for regulatory reporting needs a documented chain of custody: who collected it, when, how it was preserved and transported, and who received it at the lab — a paper (or digital) trail that makes the result legally defensible if a permit violation is ever disputed.',
          'Sample handling errors — wrong preservative, exceeded holding time, improper storage temperature — can invalidate an otherwise-correct result, which is why sampling procedure is treated as seriously as the lab analysis itself.',
        ],
        keyPoints: [
          'Grab samples capture a single point in time; composite samples represent an average over a period.',
          'Composite samples are often required by NPDES permits because conditions vary throughout the day.',
          'Chain of custody documents every step from collection to lab analysis, making results legally defensible.',
          'Sample handling errors can invalidate results even when the lab analysis itself is correct.',
        ],
        quiz: [
          {
            q: 'A composite sample, as opposed to a grab sample, is:',
            a: ['Multiple samples combined over a period of time to represent an average condition', 'A single sample taken at the point of maximum flow', 'A sample collected only during a permit violation', 'A sample analyzed twice for accuracy'],
            correct: 0,
            exp: 'Composite samples combine multiple collections over time (often 24 hours) to represent average conditions, unlike a single-moment grab sample.',
          },
        ],
      },
      {
        title: 'SCADA and Process Instrumentation',
        body: [
          'SCADA (Supervisory Control and Data Acquisition) systems let operators monitor and, in many cases, remotely control plant processes from a central control room — screens showing tank levels, flow rates, pump status, and alarm conditions across the entire facility in real time.',
          'Flow meters (measuring how much water is moving through a pipe or channel) and level sensors (measuring how full a tank or basin is) are the most basic and widely used instruments, feeding both process control logic and regulatory flow reporting.',
          'DO probes continuously monitor dissolved oxygen in aeration basins, letting the system automatically adjust blower output to maintain the target range without an operator manually checking and adjusting all day.',
          "Alarms and telemetry mean a plant doesn't need an operator standing at every basin — but they also mean an operator on duty (even overnight or on-call) can get a page or alert the moment something drifts out of range, which is a big part of why modern plants can safely run with fewer staff per shift than older, fully manual plants required.",
        ],
        keyPoints: [
          'SCADA systems let operators monitor and control plant processes from a central location in real time.',
          'Flow meters and level sensors are the most basic, widely used process instruments.',
          'DO probes enable automatic blower control to maintain target dissolved oxygen levels.',
          'Alarms/telemetry allow smaller on-duty staff to safely monitor an entire plant, including overnight.',
        ],
        quiz: [
          {
            q: 'SCADA systems primarily allow operators to:',
            a: ['Monitor and control plant processes from a central location in real time', 'Replace the need for any lab testing', 'Automatically file NPDES permit renewals', 'Eliminate the need for confined space entry'],
            correct: 0,
            exp: 'SCADA gives operators real-time visibility and control over plant processes from a central control room, rather than replacing lab testing or compliance work.',
          },
        ],
      },
      {
        title: 'NPDES Compliance and Discharge Monitoring Reports',
        body: [
          'Every wastewater plant discharging to a water body operates under an NPDES permit that specifies exactly what can be discharged, how much, and how often it must be measured and reported.',
          "Discharge Monitoring Reports (DMRs) are the standard mechanism for that reporting — regular (often monthly) submissions to the regulatory agency summarizing sample results against permit limits, built directly from the plant's own logged data.",
          'Exceeding a permit limit is a reportable violation, and depending on severity and frequency, can lead to a range of consequences — from a warning letter, to a formal enforcement action, to fines — which is exactly why accurate sampling, careful documentation, and prompt self-reporting of any exceedance (rather than trying to hide it) matter so much.',
          'Many permits also require immediate notification — sometimes within 24 hours — for certain serious violations or unpermitted discharges, separate from the routine periodic DMR filing.',
        ],
        keyPoints: [
          'NPDES permits specify what, how much, and how often a plant can discharge and must report.',
          'DMRs are the standard periodic (often monthly) compliance reporting mechanism, built from logged plant data.',
          'Exceeding a permit limit is a reportable violation with potential enforcement consequences.',
          'Serious violations often require immediate (e.g., 24-hour) notification, separate from routine DMR filing.',
        ],
        quiz: [
          {
            q: 'Discharge Monitoring Reports (DMRs) are used to:',
            a: ['Report sample results against NPDES permit limits to the regulatory agency', 'Request a new NPDES permit', 'Track employee certification renewal dates', 'Schedule confined space entries'],
            correct: 0,
            exp: 'DMRs are the standard periodic report comparing a plant\'s actual sample results against its NPDES permit limits.',
          },
        ],
      },
      {
        title: 'Public Reporting and Recordkeeping',
        body: [
          'Drinking water utilities must issue an annual Consumer Confidence Report (CCR) to customers, summarizing detected contaminants, their levels compared to regulatory limits, and the water\'s source — a public transparency requirement under the Safe Drinking Water Act.',
          'Beyond CCRs and DMRs, both drinking water and wastewater utilities keep extensive operational records — daily logs, lab results, maintenance records, calibration records for monitoring equipment — often required to be retained for years and available for regulatory inspection at any time.',
          "Accurate recordkeeping isn't just a compliance formality: it's also the operational memory of the plant, letting operators (including new ones) spot long-term trends, diagnose recurring problems, and prove a process was operating correctly during a specific event.",
          "As certification exams and real inspections both emphasize: if it isn't documented, from a regulatory standpoint it effectively didn't happen — which is why thorough, contemporaneous logging is treated as a core operator skill, not paperwork to get to later.",
        ],
        keyPoints: [
          'Drinking water utilities must issue an annual Consumer Confidence Report (CCR) to customers.',
          'Both drinking water and wastewater utilities must retain extensive operational records for years.',
          'Good recordkeeping helps diagnose trends and problems, not just satisfy compliance.',
          'Undocumented work is treated as not having happened from a regulatory standpoint.',
        ],
        quiz: [
          {
            q: 'The Consumer Confidence Report (CCR) is:',
            a: ['An annual public report drinking water utilities issue summarizing detected contaminants', 'A wastewater plant\'s NPDES compliance filing', 'An internal maintenance log', 'A one-time report filed only when a new plant opens'],
            correct: 0,
            exp: 'The CCR is an annual public-facing report required of drinking water utilities under the Safe Drinking Water Act.',
          },
        ],
      },
    ],
    test: [
      { q: 'BOD measures:', a: ['Oxygen consumed by microorganisms breaking down organic matter over 5 days', 'Total suspended solids by weight', 'Chlorine residual concentration', 'Dissolved fluoride concentration'], correct: 0, exp: 'BOD is a five-day test of oxygen consumption by microorganisms decomposing organic matter.' },
      { q: 'TSS measures:', a: ['Suspended solid material in a water sample', 'Dissolved oxygen concentration', 'Bacterial count per 100 mL', 'Chlorine demand'], correct: 0, exp: 'TSS is measured by filtering and weighing the solid material suspended in a sample.' },
      { q: 'Why is dissolved oxygen (DO) critical in an aeration basin?', a: ['Treatment bacteria need it to function', 'It disinfects the wastewater directly', 'It precipitates phosphorus', 'It neutralizes chlorine residual'], correct: 0, exp: 'The microorganisms doing biological treatment in the aeration basin require dissolved oxygen to consume organic matter.' },
      { q: 'A composite sample differs from a grab sample by:', a: ['Combining multiple samples over time to represent an average', 'Being collected only during permit violations', 'Requiring no chain of custody', 'Being tested only for pH'], correct: 0, exp: 'Composite samples combine collections over a period (often 24 hours) rather than capturing a single moment.' },
      { q: 'Chain of custody documentation exists to:', a: ['Make sample results legally defensible', 'Replace the need for lab analysis', 'Speed up sample transport', 'Reduce the number of required tests'], correct: 0, exp: 'A documented chain of custody tracks a sample from collection through analysis, supporting the result if challenged.' },
      { q: 'SCADA systems are used primarily to:', a: ['Monitor and control plant processes centrally in real time', 'File DMRs automatically without operator review', 'Replace routine lab testing entirely', 'Perform confined space atmospheric testing'], correct: 0, exp: 'SCADA provides real-time monitoring and control from a central location — it supports, but does not replace, lab testing or compliance work.' },
      { q: 'DMRs (Discharge Monitoring Reports) report results against:', a: ['NPDES permit limits', 'Consumer Confidence Report thresholds', 'OSHA exposure limits', 'Biosolids pollutant limits under 40 CFR 503'], correct: 0, exp: 'DMRs compare a plant\'s actual monitoring results to the limits set in its NPDES permit.' },
      { q: 'Exceeding an NPDES permit limit is:', a: ['A reportable violation', 'Only a concern if it happens more than once a year', 'Automatically covered by the plant\'s CCR', 'Not reportable unless a member of the public complains'], correct: 0, exp: 'Any exceedance of a permit limit is a reportable violation, regardless of frequency, and must be documented and reported.' },
      { q: 'The Consumer Confidence Report (CCR) is issued:', a: ['Annually, by drinking water utilities, to customers', 'Monthly, by wastewater utilities, to regulators', 'Only after a permit violation', 'Only by utilities using surface water sources'], correct: 0, exp: 'The CCR is an annual public report drinking water utilities must issue to their customers.' },
      { q: 'From a regulatory standpoint, undocumented operator work is generally treated as:', a: ['Not having happened', 'Automatically compliant', 'Acceptable if verbally confirmed later', 'Only a concern during formal inspections'], correct: 0, exp: 'Without documentation, there is no record a task or reading occurred — which is why thorough, contemporaneous logging is treated as essential.' },
    ],
  },

  // ── Module 16: Safety, Confined Space & Emergency Response ───────────────
  {
    id: 'safety-confined-space',
    num: 16,
    title: 'Safety, Confined Space & Emergency Response',
    desc: 'The safety topics unique to this trade — confined space entry, chlorine gas and chemical hazards, lockout/tagout, biological exposure, emergency response, and exam prep.',
    slides: [
      {
        title: 'Confined Space Entry (OSHA 1910.146)',
        body: [
          "Wet wells, digesters, storage tanks, and many below-grade vaults meet OSHA's definition of a confined space — large enough to enter, has limited entry/exit, and isn't designed for continuous occupancy — making this one of the most safety-critical topics in the entire trade.",
          'A permit-required confined space adds one or more specific hazards — hazardous atmosphere, engulfment risk, entrapment potential, or another serious hazard — and requires a written entry permit, atmospheric testing before and during entry, and a trained attendant stationed outside the space at all times.',
          'The standard entry team has three roles: the entrant (goes inside), the attendant (stays outside, maintains communication, and can call for rescue), and the entry supervisor (authorizes the entry and ensures all precautions are in place) — no one enters alone, and the attendant never leaves their post while someone is inside.',
          'Atmospheric testing checks for oxygen level (normal is 20.9%; both too low and too high are dangerous), flammability/explosivity, and toxic gases like hydrogen sulfide — a real and common hazard in this industry, produced by decomposing organic matter in wastewater and instantly deadly at high concentrations.',
        ],
        keyPoints: [
          'Confined spaces (wet wells, digesters, tanks) are common in this trade and covered by OSHA 1910.146.',
          'Permit-required confined spaces need a written permit, atmospheric testing, and a dedicated attendant.',
          'Standard roles: entrant, attendant, and entry supervisor — no one enters alone.',
          'Atmospheric testing checks oxygen level, flammability, and toxic gases like hydrogen sulfide.',
        ],
        quiz: [
          {
            q: "In a permit-required confined space entry, the attendant's role is to:",
            a: ['Stay outside, maintain communication, and call for rescue if needed', 'Enter the space alongside the entrant at all times', 'Authorize the entry permit before testing begins', 'Perform the atmospheric testing from inside the space'],
            correct: 0,
            exp: 'The attendant remains outside the space, tracks the entrant, maintains communication, and initiates rescue procedures if something goes wrong.',
          },
        ],
      },
      {
        title: 'Chemical Hazards and Chlorine Gas Safety',
        body: [
          "Chlorine gas, still used at many plants for disinfection, is a serious hazard on its own: it's toxic even at low concentrations, heavier than air (so it collects in low areas), and a leak can spread quickly.",
          'Chlorine gas systems require leak detection equipment, proper ventilation, and — for anyone handling or responding to a leak — Self-Contained Breathing Apparatus (SCBA), which supplies its own air rather than filtering ambient air like a standard respirator.',
          'Beyond chlorine, operators routinely handle other hazardous chemicals — coagulants, corrosion inhibitors, polymers, sodium hypochlorite (liquid bleach, an increasingly common chlorine gas alternative specifically because it removes this hazard) — each with its own Safety Data Sheet (SDS) detailing handling, storage, and emergency response.',
          "Every chemical storage and feed area should have clearly posted emergency procedures, appropriate PPE readily available, and staff trained specifically on that chemical's hazards — generic safety training isn't a substitute for knowing exactly what to do if a specific chemical spills or leaks.",
        ],
        keyPoints: [
          'Chlorine gas is toxic, heavier than air, and requires leak detection and proper ventilation.',
          'SCBA supplies its own air, unlike a standard filtering respirator — required for chlorine leak response.',
          'Sodium hypochlorite (liquid bleach) is an increasingly common chlorine gas alternative, chosen partly to avoid the gas hazard.',
          'Every chemical needs its own SDS-based training, PPE, and posted emergency procedures.',
        ],
        quiz: [
          {
            q: 'Why is chlorine gas considered especially dangerous in a leak scenario?',
            a: ['It is heavier than air and collects in low areas, spreading quickly', 'It is lighter than air and disperses immediately', 'It is only dangerous at very high concentrations', 'It has no detectable odor'],
            correct: 0,
            exp: 'Chlorine gas is heavier than air, so it collects in low-lying areas during a leak, creating pockets of dangerous concentration.',
          },
        ],
      },
      {
        title: 'Lockout/Tagout and Mechanical Safety',
        body: [
          "Pumps, mixers, blowers, and other rotating or moving equipment can seriously injure or kill someone performing maintenance if the equipment unexpectedly starts up or releases stored energy — the exact scenario OSHA's Lockout/Tagout standard (1910.147) exists to prevent.",
          'The core procedure: identify all energy sources for the equipment (electrical, mechanical, hydraulic, pneumatic, gravity), shut them off, physically lock them in the off position with a personal lock, tag the lock with the worker\'s identification, and verify zero energy state before beginning work.',
          "Multiple workers on the same job each apply their own lock — nobody removes another person's lock, and the equipment doesn't get re-energized until every lock is off, which prevents someone from being caught by surprise if a coworker assumes the job is finished.",
          'Beyond formal lockout/tagout, general mechanical safety awareness — guards on rotating equipment, proper footing near wet or elevated surfaces, safe practices around open channels and basins — is a constant, everyday part of the job, not just something invoked during major maintenance.',
        ],
        keyPoints: [
          'Lockout/Tagout (OSHA 1910.147) prevents unexpected equipment startup during maintenance.',
          'Procedure: identify energy sources, shut off, lock, tag, and verify zero energy before work begins.',
          "Each worker applies their own lock; nobody removes another person's lock.",
          'General mechanical safety (guards, footing, awareness near basins/channels) is a constant daily concern.',
        ],
        quiz: [
          {
            q: 'In a lockout/tagout procedure with multiple workers on the same job, each worker should:',
            a: ['Apply their own personal lock, which only they can remove', 'Share a single lock issued by the entry supervisor', 'Rely on the last worker to leave to lock the equipment', 'Only tag the equipment, without physically locking it'],
            correct: 0,
            exp: "Each worker applies an individual lock, and equipment isn't re-energized until every lock is removed by its owner — preventing surprise startup while anyone is still working.",
          },
        ],
      },
      {
        title: 'Biological Hazards and PPE',
        body: [
          "Wastewater carries a wide range of pathogens — bacteria, viruses, and parasites from human waste — making biological exposure a routine, ongoing hazard in this trade in a way that's different from most other field service work.",
          'Standard precautions — treating all wastewater and biosolids as potentially infectious regardless of appearance — combined with proper PPE (gloves, eye protection, and in some tasks, more extensive protective clothing) are the primary defense.',
          'Good hygiene practices — handwashing before eating or drinking, not touching your face with contaminated gloves, showering after shifts involving direct wastewater contact — matter as much as the PPE itself, since PPE only works if used and removed correctly.',
          'Vaccinations (particularly hepatitis A and B, and tetanus) are commonly recommended or required for wastewater workers specifically because of this ongoing pathogen exposure risk, something that sets this trade apart from most other technical fields.',
        ],
        keyPoints: [
          'Wastewater carries pathogens, making biological exposure a routine occupational hazard.',
          'Standard precautions treat all wastewater and biosolids as potentially infectious.',
          'PPE (gloves, eye protection) plus good hygiene practices are the primary defense.',
          'Vaccinations (hepatitis A/B, tetanus) are commonly recommended for wastewater workers.',
        ],
        quiz: [
          {
            q: "The 'standard precautions' approach to biological hazards in wastewater treatment means:",
            a: ['Treating all wastewater and biosolids as potentially infectious, regardless of appearance', 'Testing every batch of wastewater for pathogens before handling it', 'Wearing SCBA at all times on the plant floor', 'Avoiding all direct contact with any plant equipment'],
            correct: 0,
            exp: 'Standard precautions assume all wastewater and biosolids could be infectious, so PPE and hygiene practices are applied consistently rather than based on how a sample looks.',
          },
        ],
      },
      {
        title: 'Emergency Response and Certification Exam Prep',
        body: [
          'Plants need emergency response plans covering the scenarios most likely to actually happen: chemical spills or leaks, power outages (and backup power/generator readiness — a topic that connects directly to the critical power tracks elsewhere on this platform), major equipment failure, and severe weather.',
          'Public notification requirements are a real regulatory obligation in serious situations — a boil water notice for drinking water contamination risk, or public notification of a significant unpermitted wastewater discharge — and knowing when and how notification is legally required is as important as the technical response itself.',
          "Preparing for the state certification exam itself: expect questions covering the material across this entire track, calculation-based questions (dosing, detention time, flow conversions), and scenario questions that test judgment, not just memorized facts — the exam is measuring whether you're ready to make real decisions on a real plant, not just recall terminology.",
          "Study strategy that tends to work well: work practice calculations until the math is automatic (not just understood once), review your state's specific regulations and forms if your state exam covers them, and treat every module test and exam-prep resource here as a genuine practice exam rather than something to skim.",
        ],
        keyPoints: [
          'Emergency response plans should cover spills, power outages, equipment failure, and severe weather.',
          'Public notification (like boil water notices) is a legal requirement in serious situations, not optional.',
          'Certification exams test calculations and scenario judgment, not just memorized terminology.',
          'Effective exam prep means practicing calculations until automatic and treating practice tests seriously.',
        ],
        quiz: [
          {
            q: "A 'boil water notice' is an example of:",
            a: ['A legally required public notification during a serious drinking water contamination risk', 'An optional courtesy communication from the utility', 'A wastewater-only emergency procedure', 'A routine annual report, unrelated to emergencies'],
            correct: 0,
            exp: 'A boil water notice is a legally required public notification issued when drinking water may pose a contamination risk to public health.',
          },
        ],
      },
    ],
    test: [
      { q: 'Which OSHA standard covers permit-required confined space entry?', a: ['1910.146', '1910.147', '1910.132', '1910.1200'], correct: 0, exp: 'OSHA 1910.146 governs permit-required confined spaces, common in this trade (wet wells, digesters, tanks).' },
      { q: 'In confined space entry, who stays outside and maintains communication?', a: ['The attendant', 'The entrant', 'The entry supervisor only, if present', 'No one — communication is not required'], correct: 0, exp: 'The attendant remains outside, tracks the entrant, and can initiate rescue if something goes wrong.' },
      { q: 'Why is chlorine gas especially dangerous in a leak?', a: ["It's heavier than air and collects in low areas", "It's lighter than air and disperses instantly", 'It is odorless and undetectable', 'It only poses a hazard above 500°F'], correct: 0, exp: 'Chlorine gas is heavier than air, so it pools in low-lying areas, creating dangerous concentrations quickly during a leak.' },
      { q: 'SCBA differs from a standard filtering respirator because it:', a: ['Supplies its own air rather than filtering ambient air', 'Filters out only particulates, not gases', "Doesn't require any training to use", 'Is only rated for chemical splashes, not gases'], correct: 0, exp: 'SCBA carries its own air supply, making it appropriate for oxygen-deficient or highly toxic atmospheres like a chlorine leak — unlike a filtering respirator.' },
      { q: 'Which OSHA standard governs lockout/tagout?', a: ['1910.147', '1910.146', '1910.95', '1910.1030'], correct: 0, exp: 'OSHA 1910.147 is the Control of Hazardous Energy (lockout/tagout) standard.' },
      { q: "In a multi-worker lockout/tagout job, who can remove a worker's lock?", a: ['Only that worker', 'Any supervisor on site', 'The next worker to arrive', 'Whoever finishes their task first'], correct: 0, exp: "Each worker's lock can only be removed by that same worker, ensuring no one is caught by surprise if equipment is re-energized." },
      { q: 'The "standard precautions" approach to wastewater biological hazards means:', a: ['Treating all wastewater/biosolids as potentially infectious', 'Testing every sample for pathogens before handling', 'Only using PPE during known contamination events', 'Relying on vaccination alone for protection'], correct: 0, exp: 'Standard precautions apply consistent PPE and hygiene practices to all wastewater and biosolids, regardless of appearance or known contamination status.' },
      { q: 'Vaccinations commonly recommended for wastewater workers include:', a: ['Hepatitis A/B and tetanus', 'Only tetanus', 'Only influenza', 'None are typically recommended'], correct: 0, exp: 'Given routine pathogen exposure, hepatitis A/B and tetanus vaccinations are commonly recommended for wastewater workers.' },
      { q: 'A boil water notice is an example of:', a: ['A required public notification during a drinking water contamination risk', 'A voluntary utility marketing communication', 'A wastewater discharge permit renewal', 'An internal-only maintenance record'], correct: 0, exp: 'A boil water notice is a legally required public health notification, not an optional or internal document.' },
      { q: 'Certification exams for this trade typically test:', a: ['Calculations and scenario-based judgment, not just terminology', 'Only multiple-choice vocabulary recall', 'Only hands-on physical skills, with no written component', 'Only knowledge of federal law, with no math'], correct: 0, exp: 'Operator certification exams combine calculation-based questions with scenario judgment, reflecting the real decisions operators make on the job.' },
    ],
  },
];
