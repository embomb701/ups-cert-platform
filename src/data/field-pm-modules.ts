import type { TrainingModule } from './modules';

export const FIELD_PM_MODULES: TrainingModule[] = [
  // ── Module 11: Project Management Fundamentals ──────────────────────────────
  {
    id: 'fpm-foundations',
    num: 11,
    title: 'Project Management Fundamentals',
    desc: 'Core PM concepts: scope, schedule, budget, stakeholders, and the project lifecycle in field service environments.',
    slides: [
      {
        title: 'What Is a Field Project?',
        body: [
          'A field project is any coordinated effort to install, upgrade, repair, or commission equipment at a customer site, with defined scope, schedule, and deliverables.',
          'Field projects differ from break-fix work orders in scale, complexity, and stakeholder count. They often span days to months and involve multiple trades, subcontractors, and approvals.',
          'The field project manager (Field PM) owns the outcome: on time, on budget, and meeting the agreed scope of work (SOW).',
        ],
        keyPoints: [
          'Defined scope, schedule, and deliverables separate projects from routine service calls.',
          'Field PM is accountable for time, cost, scope, and customer satisfaction.',
          'Projects commonly involve multiple trades, vendors, and site approvals.',
        ],
        quiz: [
          {
            q: 'What distinguishes a field project from a routine break-fix service call?',
            a: ['Defined scope, schedule, and deliverables', 'Use of specialized test equipment', 'Requirement for a service contract', 'Presence of a dedicated parts inventory'],
            correct: 0,
            exp: 'Field projects are characterized by defined scope, schedule, and deliverables, separating them from routine service calls.',
          },
        ],
      },
      {
        title: 'Project Lifecycle Phases',
        body: [
          'Every project passes through five standard phases: Initiation, Planning, Execution, Monitoring & Controlling, and Closeout.',
          'Initiation defines why the project exists and whether it is feasible. A project charter is produced, naming the PM and authorizing the work.',
          'Planning converts the charter into a detailed plan: work breakdown structure (WBS), schedule, resource plan, risk register, and communication plan.',
          'Execution is where field work happens. Monitoring tracks actual vs. planned performance. Closeout confirms all deliverables are accepted and lessons are documented.',
        ],
        keyPoints: [
          'Five phases: Initiate, Plan, Execute, Monitor & Control, Close.',
          'Charter authorizes the project and names the PM.',
          'WBS decomposes scope into manageable tasks.',
        ],
        quiz: [
          {
            q: 'Which document formally authorizes a project and names the project manager?',
            a: ['Project charter', 'Work order', 'Risk register', 'Change request'],
            correct: 0,
            exp: 'The project charter authorizes the project, names the PM, and is issued during the Initiation phase.',
          },
        ],
      },
      {
        title: 'Scope, Budget, and Schedule Baselines',
        body: [
          'The triple constraint — scope, cost, and schedule — forms the foundation of project control. Changing one typically affects the others.',
          'A baseline is the approved version of a plan. Changes to baselines require a formal change request and stakeholder approval.',
          'Scope creep — uncontrolled expansion of scope without adjusting budget or schedule — is one of the leading causes of project failure.',
          'The PM\'s job is to protect the baseline while managing change through a documented change control process.',
        ],
        keyPoints: [
          'Triple constraint: scope, cost, and schedule are interdependent.',
          'Baseline = approved plan; changes need formal approval.',
          'Scope creep is uncontrolled scope expansion — combat it with change control.',
        ],
        quiz: [
          {
            q: 'Scope creep refers to:',
            a: ['Uncontrolled expansion of project scope without schedule or budget adjustment', 'A formal process for requesting scope changes', 'Documenting all deliverables in the WBS', 'Reviewing scope after project closeout'],
            correct: 0,
            exp: 'Scope creep is uncontrolled scope expansion without corresponding changes to budget or schedule — managed via change control.',
          },
        ],
      },
      {
        title: 'Stakeholder Identification and Engagement',
        body: [
          'Stakeholders are anyone affected by or having interest in the project: customers, end users, site managers, subcontractors, internal account teams, and regulatory bodies.',
          'A stakeholder register captures each stakeholder\'s role, influence level, interest, and preferred communication method.',
          'High-influence, high-interest stakeholders (e.g., the customer\'s facility director) need frequent, direct updates. Low-influence stakeholders may receive periodic reports.',
          'Proactive stakeholder engagement prevents surprises. Unmanaged expectations are a primary source of escalations.',
        ],
        keyPoints: [
          'Stakeholders include anyone who can affect or be affected by the project.',
          'Stakeholder register: role, influence, interest, communication preference.',
          'Match communication frequency and depth to stakeholder influence and interest.',
        ],
        quiz: [
          {
            q: 'Which stakeholder group typically requires the most frequent direct communication from the Field PM?',
            a: ['High-influence, high-interest stakeholders such as the customer\'s facility director', 'Low-interest regulatory contacts', 'Peripheral subcontractors with a single deliverable', 'Internal accounting staff processing invoices'],
            correct: 0,
            exp: 'High-influence, high-interest stakeholders have the most impact and should receive frequent direct updates to prevent escalations.',
          },
        ],
      },
      {
        title: 'Risk Management Basics',
        body: [
          'Every field project carries risks: site access issues, permit delays, equipment damage in transit, labor shortages, and weather.',
          'The risk management process: Identify → Analyze (probability × impact) → Plan response → Monitor.',
          'Response strategies: Avoid (eliminate the threat), Mitigate (reduce probability or impact), Transfer (insurance, subcontractor), Accept (acknowledge and set aside contingency).',
          'A risk register documents each risk, its score, owner, and planned response. Review it at every status meeting.',
        ],
        keyPoints: [
          'Identify risks early; assess probability × impact.',
          'Four responses: Avoid, Mitigate, Transfer, Accept.',
          'Risk register = living document, reviewed every meeting.',
        ],
        quiz: [
          {
            q: 'Purchasing cargo insurance to cover equipment damaged in transit is an example of which risk response?',
            a: ['Transfer', 'Avoid', 'Mitigate', 'Accept'],
            correct: 0,
            exp: 'Transfer shifts the financial impact of a risk to a third party — insurance is the classic example.',
          },
        ],
      },
    ],
    test: [
      { q: 'What is the primary document produced during project initiation?', a: ['Project charter', 'Work breakdown structure', 'Risk register', 'Punch list'], correct: 0, exp: 'The project charter is produced during initiation to authorize the project and name the PM.' },
      { q: 'Which phase focuses on converting the charter into a detailed plan?', a: ['Planning', 'Initiation', 'Execution', 'Closeout'], correct: 0, exp: 'The Planning phase converts the charter into WBS, schedule, resource plan, risk register, and communication plan.' },
      { q: 'The triple constraint includes scope, cost, and:', a: ['Schedule', 'Quality', 'Risk', 'Stakeholder satisfaction'], correct: 0, exp: 'The classic triple constraint is scope, cost, and schedule — all three are interdependent.' },
      { q: 'What must happen before a project baseline can be changed?', a: ['Formal change request and stakeholder approval', 'Verbal agreement from the lead technician', 'Customer signature on a new service contract', 'Internal accounting approval only'], correct: 0, exp: 'Baseline changes require a formal change request and stakeholder approval to maintain control.' },
      { q: 'A stakeholder register captures each stakeholder\'s role, influence, interest, and:', a: ['Preferred communication method', 'Billing address', 'Job title only', 'Union membership status'], correct: 0, exp: 'The stakeholder register includes role, influence, interest, and preferred communication method.' },
      { q: 'Which risk response strategy shifts impact to a third party?', a: ['Transfer', 'Accept', 'Avoid', 'Mitigate'], correct: 0, exp: 'Transfer (e.g., insurance or subcontractor agreements) shifts the risk\'s financial impact to another party.' },
      { q: 'Scope creep is dangerous primarily because it occurs:', a: ['Without corresponding changes to schedule or budget', 'Only on fixed-price contracts', 'When too many subcontractors are involved', 'After the project charter is signed'], correct: 0, exp: 'Scope creep is uncontrolled — the work grows but budget and schedule are not adjusted accordingly.' },
      { q: 'How often should the risk register be reviewed?', a: ['At every status meeting', 'Only at project closeout', 'Once during planning', 'When a risk actually occurs'], correct: 0, exp: 'The risk register is a living document and should be reviewed at every status meeting.' },
      { q: 'During which phase is field installation work actually performed?', a: ['Execution', 'Planning', 'Initiation', 'Closeout'], correct: 0, exp: 'The Execution phase is where the actual field work is performed.' },
      { q: 'Probability multiplied by impact determines a risk\'s:', a: ['Risk score', 'Transfer value', 'Contingency budget', 'Closeout criteria'], correct: 0, exp: 'Probability × impact produces the risk score used to prioritize and plan responses.' },
    ],
  },

  // ── Module 12: Field Project Planning ─────────────────────────────────────
  {
    id: 'fpm-planning',
    num: 12,
    title: 'Field Project Planning',
    desc: 'Translate scope into actionable plans: WBS, scheduling tools, resource allocation, procurement, and site readiness.',
    slides: [
      {
        title: 'Work Breakdown Structure (WBS)',
        body: [
          'The WBS decomposes the total project scope into progressively smaller work packages that can be assigned, estimated, and tracked.',
          'WBS is structured hierarchically: Level 1 is the project, Level 2 is major deliverables, Level 3 is work packages, and Level 4 may be individual tasks.',
          'Each work package should represent 8–80 hours of effort (the "8/80 rule") — small enough to estimate reliably, large enough not to generate excessive tracking overhead.',
          'The WBS is the foundation for scheduling, resource planning, and cost estimation. Everything in the project must trace back to a WBS element.',
        ],
        images: [
          { src: '/diagrams/wbs-hierarchy.svg', alt: 'Diagram of the WBS four-level hierarchy from the project down through major deliverables, work packages, and individual tasks, plus the 8/80 rule for work package sizing', caption: 'Everything in the project traces back to a work package — and the 8/80 rule keeps each one estimable without excessive tracking overhead.' },
        ],
        keyPoints: [
          'WBS decomposes scope into work packages with traceable deliverables.',
          '8/80 rule: work packages should be 8–80 hours of effort.',
          'All cost and schedule elements trace to a WBS item.',
        ],
        quiz: [
          {
            q: 'The 8/80 rule in WBS development refers to:',
            a: ['Work packages of 8–80 hours of effort', 'Tasks completed within 8–80 days', 'Resources with 80% utilization and 8% float', 'Budget items between $8,000 and $80,000'],
            correct: 0,
            exp: 'The 8/80 rule recommends work packages be 8–80 hours of effort — small enough to estimate but not excessively fragmented.',
          },
        ],
      },
      {
        title: 'Scheduling: Gantt Charts and Critical Path',
        body: [
          'A Gantt chart displays tasks on a timeline, showing start/finish dates, duration, and dependencies. It is the most common field project scheduling tool.',
          'The critical path is the longest sequence of dependent tasks that determines the minimum project duration. Any delay on the critical path delays the project.',
          'Float (or slack) is the amount of time a non-critical task can slip without delaying the project. Critical path tasks have zero float.',
          'Milestone charts mark key events (permit approval, equipment delivery, customer sign-off) without showing task durations — useful for executive reporting.',
        ],
        images: [
          { src: '/diagrams/gantt-critical-path.svg', alt: 'Diagram of a Gantt-style task timeline highlighting the critical path in red and a non-critical task with visible float in teal, plus panels defining critical path and float', caption: 'The critical path sets the minimum project duration — any delay there delays the whole project; float is the cushion everywhere else.' },
        ],
        keyPoints: [
          'Gantt chart: tasks on a timeline with durations and dependencies.',
          'Critical path: longest path through the network = minimum project duration.',
          'Float = allowable delay for non-critical tasks; zero on critical path.',
        ],
        quiz: [
          {
            q: 'What does zero float on a task indicate?',
            a: ['The task is on the critical path and any delay extends the project', 'The task has no predecessor activities', 'The task can be deferred indefinitely', 'The task requires no resources'],
            correct: 0,
            exp: 'Zero float means the task is critical — any delay on it directly delays the project end date.',
          },
        ],
      },
      {
        title: 'Resource Planning and Allocation',
        body: [
          'Resource planning identifies what people, equipment, and materials are needed, when, and in what quantities.',
          'A resource histogram visually shows resource demand over time. Peaks indicate overallocation; the PM must resolve conflicts by leveling resources or adjusting the schedule.',
          'For field projects, confirm technician certifications, tool calibration dates, and travel logistics before committing to the schedule.',
          'Subcontractor management: define scope, deliverables, and acceptance criteria in the subcontract before work begins to avoid disputes later.',
        ],
        keyPoints: [
          'Resource histogram reveals overallocation — resolve by leveling or schedule adjustment.',
          'Verify tech certifications, tool calibration, and travel before committing the schedule.',
          'Subcontractors need defined scope and acceptance criteria in writing.',
        ],
        quiz: [
          {
            q: 'A resource histogram shows a peak well above available capacity. The PM should:',
            a: ['Level resources by adjusting schedule or adding capacity', 'Ignore it if tasks have float', 'Split the peak tasks into parallel execution', 'Request a budget increase immediately'],
            correct: 0,
            exp: 'Overallocation peaks require resource leveling — adjusting schedules, adding staff, or using overtime to match demand to capacity.',
          },
        ],
      },
      {
        title: 'Procurement and Materials Management',
        body: [
          'Procurement planning determines what to buy vs. make in-house, and defines specifications, lead times, and vendor selection criteria.',
          'Long-lead items (custom switchgear, specialty parts) must be identified early and ordered well ahead of the installation date.',
          'Receiving inspection confirms that delivered materials match the purchase order (PO) in quantity, model, and condition before the delivery is accepted.',
          'Material staging — pre-positioning equipment and tools at or near the site — reduces installation downtime and keeps the project on schedule.',
        ],
        keyPoints: [
          'Identify long-lead items early and order ahead of installation.',
          'Receiving inspection: confirm quantity, model, and condition match the PO.',
          'Stage materials near the site before crew mobilization.',
        ],
        quiz: [
          {
            q: 'Why must long-lead items be identified and ordered early in planning?',
            a: ['Their delivery time can extend the project if ordered late', 'They always require import permits', 'They are always the most expensive items', 'Only the customer can approve long-lead purchases'],
            correct: 0,
            exp: 'Long-lead items have extended delivery windows; ordering them late creates schedule risk for the installation date.',
          },
        ],
      },
      {
        title: 'Site Readiness and Pre-Job Planning',
        body: [
          'A site readiness checklist confirms prerequisites are met before crew mobilization: permits obtained, utilities ready, access credentials issued, and staging area cleared.',
          'A pre-job planning meeting ("pre-job brief") aligns the field team on scope, safety, schedule, and contingency plans before work begins.',
          'Confirm electrical infrastructure: panel capacity, conduit pathways, and grounding points for equipment installation.',
          'Identify and document hazards through a job hazard analysis (JHA) or tailgate safety meeting before each phase of work.',
        ],
        keyPoints: [
          'Site readiness checklist: permits, utilities, access, and staging confirmed before mobilization.',
          'Pre-job brief aligns team on scope, safety, schedule, and contingencies.',
          'JHA or tailgate safety meeting identifies hazards before each work phase.',
        ],
        quiz: [
          {
            q: 'What is the primary purpose of a pre-job planning meeting?',
            a: ['Align the field team on scope, safety, schedule, and contingency plans', 'Sign the customer contract', 'Review the billing codes with accounting', 'Train new technicians on basic electrical theory'],
            correct: 0,
            exp: 'The pre-job brief ensures the entire team understands scope, safety requirements, schedule, and what to do if something goes wrong.',
          },
        ],
      },
    ],
    test: [
      { q: 'The WBS decomposes project scope into:', a: ['Work packages that can be assigned, estimated, and tracked', 'Financial accounts for cost tracking', 'Risk categories by severity', 'Customer deliverables only'], correct: 0, exp: 'WBS decomposes scope into traceable work packages used as the basis for scheduling and cost estimation.' },
      { q: 'On a Gantt chart, what does the critical path represent?', a: ['The longest sequence of dependent tasks that determines project duration', 'The tasks with the most resources assigned', 'The highest-cost activities in the project', 'The work assigned to the lead technician'], correct: 0, exp: 'The critical path is the longest path through the project network; it determines the minimum project duration.' },
      { q: 'A task with positive float can:', a: ['Slip by that amount without delaying the project', 'Never be delayed', 'Only start after all critical tasks complete', 'Use any available resource without approval'], correct: 0, exp: 'Positive float means the task has scheduling flexibility — it can slip by that amount without affecting the project end date.' },
      { q: 'During procurement planning, which items require the earliest ordering?', a: ['Long-lead items with extended delivery windows', 'Standard consumable supplies', 'Any item under $500', 'Items the customer will supply'], correct: 0, exp: 'Long-lead items must be ordered early because their delivery timelines can delay installation if procured late.' },
      { q: 'What does a receiving inspection verify?', a: ['Delivered quantity, model, and condition match the purchase order', 'Insurance coverage of delivered goods', 'Subcontractor certification status', 'Customer approval of material selection'], correct: 0, exp: 'Receiving inspection confirms that deliveries match the PO in quantity, model number, and physical condition.' },
      { q: 'The 8/80 rule for work packages recommends effort of:', a: ['8 to 80 hours per work package', '8 to 80 days per task', '8% to 80% of the total budget', '8 to 80 people per activity'], correct: 0, exp: 'Work packages should be 8–80 hours of effort — estimable but not so granular that tracking becomes burdensome.' },
      { q: 'A site readiness checklist is reviewed before:', a: ['Crew mobilization to ensure prerequisites are met', 'The project charter is signed', 'The customer pays the invoice', 'Risk register development'], correct: 0, exp: 'The site readiness checklist confirms permits, utilities, access, and staging are ready before mobilizing the field crew.' },
      { q: 'What is a Job Hazard Analysis (JHA) used for?', a: ['Identifying and documenting site hazards before each work phase', 'Approving subcontractor invoices', 'Tracking labor hours per task', 'Scheduling equipment deliveries'], correct: 0, exp: 'A JHA identifies hazards specific to each work phase so the crew can take preventive action before starting.' },
      { q: 'Resource leveling is performed to address:', a: ['Overallocation of personnel or equipment', 'Budget variances from the baseline', 'Stakeholder communication gaps', 'Scope creep in the WBS'], correct: 0, exp: 'Resource leveling resolves overallocation by adjusting task timing or adding capacity to match available resources.' },
      { q: 'Material staging before crew mobilization reduces:', a: ['Installation downtime and schedule risk', 'Customer escalation frequency', 'The need for a risk register', 'Subcontractor count'], correct: 0, exp: 'Pre-staging equipment and materials near the site means the crew spends time installing — not waiting for parts to arrive.' },
    ],
  },

  // ── Module 13: Project Execution and Coordination ──────────────────────────
  {
    id: 'fpm-execution',
    num: 13,
    title: 'Project Execution & Coordination',
    desc: 'Leading field teams, managing subcontractors, tracking progress, and controlling changes during active project execution.',
    slides: [
      {
        title: 'Directing the Field Team',
        body: [
          'Effective field leadership means giving clear, specific instructions: who does what, by when, with what resources, and to what quality standard.',
          'Daily stand-up meetings (15 minutes max) keep the crew aligned: what was completed yesterday, what is planned today, and what obstacles exist.',
          'The Field PM must balance directing work with removing obstacles — resolving permit issues, material shortages, or access problems so technicians stay productive.',
          'Document verbal instructions in writing (daily log, email confirmation) to maintain a clear record of decisions and assignments.',
        ],
        keyPoints: [
          'Clear instructions: who, what, when, with what resources, and to what standard.',
          'Daily stand-ups surface obstacles early.',
          'PM removes blockers; techs execute — keep everyone in their lane.',
        ],
        quiz: [
          {
            q: 'What is the primary purpose of a daily stand-up meeting on a field project?',
            a: ['Align the team on yesterday\'s results, today\'s plan, and current obstacles', 'Review the full project schedule with all stakeholders', 'Sign change orders with the customer', 'Conduct a final safety inspection'],
            correct: 0,
            exp: 'Daily stand-ups are short alignment meetings covering what was done, what\'s next, and what\'s blocking progress.',
          },
        ],
      },
      {
        title: 'Subcontractor Management',
        body: [
          'The Field PM is accountable for subcontractor performance even though the subs are not direct employees. Define scope, schedule, quality, and acceptance criteria in the subcontract.',
          'Pre-work kickoff meetings with subs confirm understanding of site rules, safety requirements, and deliverable expectations.',
          'Inspect subcontractor work at defined quality gates before covering it up (e.g., confirm conduit fill before pulling wire, verify grounding before energizing).',
          'Enforce the subcontract terms consistently — allowing one deviation without documentation sets a precedent that erodes project control.',
        ],
        keyPoints: [
          'PM is accountable for sub performance; define everything in the subcontract.',
          'Quality gates: inspect before concealing work.',
          'Enforce subcontract terms consistently; document all deviations.',
        ],
        quiz: [
          {
            q: 'When must the Field PM inspect subcontractor work?',
            a: ['At defined quality gates before concealing work', 'Only at final project acceptance', 'Whenever the customer requests an inspection', 'At the beginning of each workday'],
            correct: 0,
            exp: 'Quality gates require inspection before work is covered or energized so defects can be corrected before they become inaccessible.',
          },
        ],
      },
      {
        title: 'Progress Tracking and Earned Value',
        body: [
          'Earned Value Management (EVM) integrates scope, schedule, and cost into one measurement system.',
          'Key EVM metrics: Planned Value (PV) = budgeted cost of scheduled work; Earned Value (EV) = budgeted cost of work actually completed; Actual Cost (AC) = what was spent.',
          'Schedule Variance (SV) = EV − PV. Negative SV means behind schedule. Cost Variance (CV) = EV − AC. Negative CV means over budget.',
          'Percent complete is only meaningful when based on deliverables completed, not hours spent. "90% done" that never becomes 100% is a common project trap.',
        ],
        images: [
          { src: '/diagrams/earned-value-management.svg', alt: 'Diagram of the Planned Value, Earned Value, and Actual Cost earned value metrics, the Schedule Variance and Cost Variance formulas, and the percent-complete measurement trap', caption: 'SV = EV minus PV, CV = EV minus AC — one system that catches whether a project is behind schedule, over budget, or both.' },
        ],
        keyPoints: [
          'EVM: PV = planned, EV = earned, AC = actual spend.',
          'SV = EV − PV (negative = behind). CV = EV − AC (negative = over budget).',
          'Measure percent complete by deliverables, not hours.',
        ],
        quiz: [
          {
            q: 'In Earned Value Management, a negative Cost Variance (CV) means the project is:',
            a: ['Over budget', 'Behind schedule', 'Ahead of schedule', 'Under budget'],
            correct: 0,
            exp: 'CV = EV − AC. When AC exceeds EV (negative CV), more was spent than the value of work completed — the project is over budget.' ,
          },
        ],
      },
      {
        title: 'Change Management and Change Orders',
        body: [
          'A change order is a formal, written amendment to the original contract scope, schedule, or cost. All changes must go through the change control process.',
          'Steps: identify the change → assess impact on scope, schedule, cost, and risk → document the change request → obtain customer/sponsor approval → update the plan.',
          'Never perform out-of-scope work verbally agreed upon without a signed change order. "We\'ll sort it out later" almost never results in payment.',
          'Track change orders in a change log, including status (pending, approved, rejected). The change log is reviewed at every project status meeting.',
        ],
        images: [
          { src: '/diagrams/change-order-process.svg', alt: 'Diagram of the five-step change control process from identify through update the plan, and the pending/approved/rejected change log status tracking', caption: '"We\'ll sort it out later" almost never results in payment — every change goes through identify, assess, document, approve, update.' },
        ],
        keyPoints: [
          'Change order = formal written amendment; never work out-of-scope without one.',
          'Change control: identify → assess impact → document → approve → update plan.',
          'Change log tracks all requests and their status.',
        ],
        quiz: [
          {
            q: 'A customer verbally asks the crew to add additional cable runs not in the SOW. The correct action is to:',
            a: ['Stop, document the request, and obtain a signed change order before proceeding', 'Complete the work and note it in the daily log', 'Refuse and continue with the original scope only', 'Delegate the decision to the lead technician'],
            correct: 0,
            exp: 'Out-of-scope work performed without a signed change order is rarely paid — always document and get approval first.',
          },
        ],
      },
      {
        title: 'Issue Management and Escalation',
        body: [
          'An issue is a problem that has already occurred and needs resolution (unlike a risk, which is potential). Issues must be logged, assigned an owner, and tracked to closure.',
          'The issue log records: description, date identified, owner, priority, planned resolution, and actual resolution date.',
          'Escalation criteria should be defined in the communication plan before the project starts — e.g., escalate to the account manager if the customer requests a scope change that would delay delivery by more than two days.',
          'Escalate early — resolving issues at the PM level is always easier and cheaper than letting them reach the executive or legal level.',
        ],
        keyPoints: [
          'Issue = problem already occurring; log it, assign an owner, track to closure.',
          'Issue log: description, date, owner, priority, resolution.',
          'Escalate early using pre-defined criteria from the communication plan.',
        ],
        quiz: [
          {
            q: 'What differentiates an issue from a risk in project management?',
            a: ['An issue has already occurred; a risk is a potential future event', 'Issues have higher probability than risks', 'Risks are tracked in the issue log', 'Issues only involve cost, not schedule'],
            correct: 0,
            exp: 'Issues are current problems requiring resolution. Risks are potential future events that may or may not happen.',
          },
        ],
      },
    ],
    test: [
      { q: 'Planned Value (PV) in EVM represents:', a: ['The budgeted cost of scheduled work', 'Total actual expenditure to date', 'Value of work completed', 'Final project budget'], correct: 0, exp: 'PV is the budgeted cost of work that was planned to be done by a point in time.' },
      { q: 'Schedule Variance (SV) is calculated as:', a: ['EV minus PV', 'AC minus PV', 'PV minus EV', 'EV minus AC'], correct: 0, exp: 'SV = EV − PV. Negative SV means the project is behind schedule.' },
      { q: 'A change order must be:', a: ['Written and signed before out-of-scope work begins', 'Approved only by the internal PM sponsor', 'Submitted within 30 days of completing the work', 'Verbal approval is sufficient for minor changes'], correct: 0, exp: 'Change orders must be written and approved before performing out-of-scope work to ensure payment and maintain contract integrity.' },
      { q: 'Daily stand-up meetings on a field project should last:', a: ['No more than 15 minutes', 'One hour per day', 'Only as long as issues remain unresolved', 'As long as the entire crew is present'], correct: 0, exp: 'Stand-ups are brief — 15 minutes maximum — to surface obstacles without consuming productive work time.' },
      { q: 'The Field PM is accountable for subcontractor performance because:', a: ['The PM is responsible for all project deliverables regardless of who performs the work', 'Subcontractors are always legally employees of the PM\'s company', 'The customer only communicates with the PM', 'Subcontractors cannot sign safety documents'], correct: 0, exp: 'Even though subs are not direct employees, the PM is accountable for the overall project outcome including sub deliverables.' },
      { q: 'What is captured in the issue log?', a: ['Description, date, owner, priority, and resolution status', 'Budget variances only', 'Future risks with high probability', 'Subcontractor invoices pending approval'], correct: 0, exp: 'The issue log tracks current problems: description, date identified, owner, priority, and status until closure.' },
      { q: 'Measuring percent complete based on hours spent instead of deliverables is problematic because:', a: ['It can show "90% done" that never reaches 100%', 'Hours are not tracked in EVM', 'It overstates cost variance', 'It requires customer sign-off at each increment'], correct: 0, exp: 'Hour-based percent complete can be misleading — the "90% done" trap occurs when work grows but hours seem on track.' },
      { q: 'Quality gates for subcontractors require inspection:', a: ['Before concealing or energizing work', 'Only at final project handover', 'After the customer signs acceptance', 'Randomly without notice'], correct: 0, exp: 'Quality gates prevent defects from being buried — inspect before covering conduit, closing walls, or energizing systems.' },
      { q: 'Escalation criteria should be defined:', a: ['In the communication plan before the project starts', 'After the first issue occurs', 'By the customer at project closeout', 'Only if the project is over budget'], correct: 0, exp: 'Pre-defining escalation thresholds in the communication plan ensures consistent, timely escalation before a crisis.' },
      { q: 'An issue is different from a risk because an issue:', a: ['Has already occurred and requires resolution', 'Has lower probability of impact', 'Is only tracked in the risk register', 'Only affects the schedule, not cost'], correct: 0, exp: 'Issues are active problems. Risks are potential future events. Both are tracked but managed differently.' },
    ],
  },

  // ── Module 14: Customer Relations and Communication ─────────────────────────
  {
    id: 'fpm-customer',
    num: 14,
    title: 'Customer Relations & Communication',
    desc: 'Managing customer expectations, communicating project status, handling escalations, and ensuring satisfaction throughout the project.',
    slides: [
      {
        title: 'Communication Planning',
        body: [
          'The communication plan defines who receives what information, through which channel, at what frequency, and from whom.',
          'Standard outputs: weekly status reports to the customer\'s project sponsor; daily field logs for the operations team; exception reports triggered by issues or delays.',
          'Match the communication medium to the message: informal updates via text or email; formal changes via letter or signed change order; escalations via phone or in-person meeting.',
          'Information overload is as harmful as information gaps — too many reports leads to key data being ignored. Keep reports concise and action-oriented.',
        ],
        keyPoints: [
          'Communication plan: who, what, how, how often, from whom.',
          'Match medium to message: formal for changes, informal for updates.',
          'Concise, action-oriented reports prevent information overload.',
        ],
        quiz: [
          {
            q: 'A communication plan primarily defines:',
            a: ['Who receives what, how, and how often', 'Payment terms for subcontractors', 'Equipment warranty periods', 'Emergency shutdown procedures'],
            correct: 0,
            exp: 'The communication plan maps stakeholders to the information they need, the channel to use, and the frequency of communication.',
          },
        ],
      },
      {
        title: 'Managing Customer Expectations',
        body: [
          'Expectation management starts at kickoff: align on what will be delivered, when, and what the customer\'s responsibilities are (site prep, access, decisions).',
          'Proactive communication about delays is always better than reactive damage control. Inform customers of potential delays before the milestone is missed — not after.',
          'Document customer commitments (access windows, decisions needed by specific dates) in writing. Missed customer commitments are a common cause of project delays that the PM must record to protect the schedule.',
          'A satisfied customer judge the project by their overall experience, not just the technical outcome. Professionalism, cleanliness, and follow-through matter as much as technical execution.',
        ],
        keyPoints: [
          'Align on scope, schedule, and responsibilities at kickoff.',
          'Communicate delays proactively — never let a missed milestone be a surprise.',
          'Document customer commitments to protect schedule accountability.',
        ],
        quiz: [
          {
            q: 'When should a customer be informed of a potential project delay?',
            a: ['Before the milestone is missed, as soon as the risk is identified', 'After the delay has already occurred', 'Only if the delay is more than one week', 'When the customer specifically asks for a status update'],
            correct: 0,
            exp: 'Proactive communication about delays preserves customer trust. Surprises after a missed milestone damage the relationship.',
          },
        ],
      },
      {
        title: 'Conducting Effective Status Meetings',
        body: [
          'A structured status meeting agenda prevents scope drift and ensures productive use of everyone\'s time: accomplishments since last meeting, upcoming work, issues/risks, action items.',
          'Always distribute minutes within 24 hours of the meeting. Minutes capture decisions, action items, owners, and due dates — not just a narrative of the discussion.',
          'Manage tangents: "parking lot" off-topic items to discuss offline rather than derailing the meeting.',
          'Start and end on time. Consistent meeting discipline signals project discipline to the customer.',
        ],
        keyPoints: [
          'Agenda: accomplishments, upcoming work, issues, action items.',
          'Minutes distributed within 24 hours with decisions and action items.',
          'Parking lot for off-topic items; start and end on time.',
        ],
        quiz: [
          {
            q: 'Meeting minutes should be distributed within:',
            a: ['24 hours of the meeting', '1 week of the meeting', '48 hours only if issues were raised', 'The same day only for escalation meetings'],
            correct: 0,
            exp: 'Minutes should be distributed within 24 hours while the discussion is still fresh and action item owners can act promptly.',
          },
        ],
      },
      {
        title: 'Service Level Agreements and KPIs',
        body: [
          'A Service Level Agreement (SLA) defines measurable performance targets the project team commits to meeting — response times, uptime targets, completion milestones.',
          'KPIs (Key Performance Indicators) used in field projects: on-time delivery rate, first-time completion rate, safety incident rate, customer satisfaction score (CSAT).',
          'SLA penalties (liquidated damages) may apply if the team misses contractual milestones. The PM must understand these terms before signing off on the schedule.',
          'Proactively tracking KPIs lets the PM identify trends early — a falling CSAT score signals a relationship problem before it becomes an escalation.',
        ],
        keyPoints: [
          'SLAs define measurable performance commitments with potential penalties.',
          'KPIs: on-time delivery, first-time completion, safety rate, CSAT.',
          'Track KPIs continuously to spot trends before they escalate.',
        ],
        quiz: [
          {
            q: 'Liquidated damages in an SLA represent:',
            a: ['Pre-agreed financial penalties for missing contractual milestones', 'The cost to repair damaged equipment on site', 'A refund for unused service hours', 'The customer\'s deposit held during the project'],
            correct: 0,
            exp: 'Liquidated damages are pre-agreed contract penalties that apply when the contractor misses defined milestones.' ,
          },
        ],
      },
      {
        title: 'Handling Escalations and Complaints',
        body: [
          'Escalations happen when a stakeholder feels their concern is not being addressed at the current level. Most escalations result from communication failures, not technical failures.',
          'Steps for handling an escalation: acknowledge the concern immediately → listen without interrupting → validate the impact → state what you will do and by when → follow through.',
          'Never promise what you cannot deliver. An honest "I\'ll have an answer by Friday" is better than an optimistic "everything will be fine."',
          'Document all escalation interactions — what was said, by whom, and what was committed. This protects all parties and creates an audit trail.',
        ],
        keyPoints: [
          'Most escalations are communication failures — fix the information gap first.',
          'Acknowledge → listen → validate → commit to action → follow through.',
          'Never over-promise; document all commitments.',
        ],
        quiz: [
          {
            q: 'Most project escalations originate from:',
            a: ['Communication failures and unmanaged expectations', 'Technical defects in installed equipment', 'Subcontractor scheduling conflicts', 'Budget overruns discovered at closeout'],
            correct: 0,
            exp: 'Escalations are driven by stakeholders feeling unheard or surprised — both are communication failures that better stakeholder management can prevent.',
          },
        ],
      },
    ],
    test: [
      { q: 'A communication plan defines who receives information, the channel, and:', a: ['The frequency of communication', 'The budget for printed reports', 'Technical training requirements', 'Equipment warranty terms'], correct: 0, exp: 'A communication plan maps stakeholders to the information they need, the medium, and how often they receive it.' },
      { q: 'Proactive communication about a potential delay should occur:', a: ['Before the milestone is missed', 'After the delay is confirmed', 'Only if the delay exceeds one week', 'At the next scheduled status meeting regardless of timing'], correct: 0, exp: 'Informing customers of potential delays before they happen preserves trust and allows time to adjust plans.' },
      { q: 'Meeting minutes should capture:', a: ['Decisions, action items, owners, and due dates', 'A full transcript of the discussion', 'Financial data only', 'Risk register updates exclusively'], correct: 0, exp: 'Minutes should be action-oriented — decisions made, tasks assigned, owners named, and due dates set.' },
      { q: 'CSAT stands for:', a: ['Customer Satisfaction Score', 'Construction Site Assessment Tool', 'Corrective Service Action Trigger', 'Component Safety Acceptance Test'], correct: 0, exp: 'CSAT is Customer Satisfaction Score — a KPI that measures how satisfied the customer is with the project experience.' },
      { q: 'An SLA\'s liquidated damages clause specifies:', a: ['Pre-agreed financial penalties for missing milestones', 'Dispute resolution procedures', 'Equipment replacement cost caps', 'Travel expense reimbursement rates'], correct: 0, exp: 'Liquidated damages are contractually specified penalties the contractor pays when it misses defined performance milestones.' },
      { q: 'During an escalation call, the PM should first:', a: ['Acknowledge the concern and listen without interrupting', 'Immediately offer a financial concession', 'Transfer the call to the account manager', 'Explain why the delay was the customer\'s fault'], correct: 0, exp: 'Acknowledgment and active listening immediately de-escalates tension and shows the customer they are being heard.' },
      { q: 'A "parking lot" in a status meeting is used to:', a: ['Defer off-topic items for separate offline discussion', 'Record closed action items', 'Track pending change orders', 'Note items that require customer approval'], correct: 0, exp: 'A parking lot captures items that are not on the agenda so they can be addressed later without derailing the meeting.' },
      { q: 'Customer commitments (access windows, decision deadlines) should be documented because:', a: ['Missed customer commitments that delay the project need a record to protect the schedule', 'Documentation is required by all SLAs', 'The customer\'s legal team requires written commitments', 'Undocumented commitments are not legally binding'], correct: 0, exp: 'If a customer misses a commitment that causes a delay, documentation protects the PM\'s ability to adjust the schedule.' },
      { q: 'First-time completion rate is a KPI that measures:', a: ['Whether work passes inspection without rework on the first attempt', 'How fast the project was completed', 'Customer satisfaction with the installation crew', 'Number of change orders approved'], correct: 0, exp: 'First-time completion rate tracks how often deliverables meet quality standards without needing rework — an efficiency and quality metric.' },
      { q: 'Over-promising during an escalation is harmful because:', a: ['Commitments that are missed make the situation significantly worse', 'It exceeds the PM\'s authority level', 'It creates scope creep in the project plan', 'Customers prefer pessimistic estimates'], correct: 0, exp: 'A failed promise on top of an existing problem destroys trust faster than the original issue — honest, realistic commitments are safer.' },
    ],
  },

  // ── Module 15: Documentation, Reporting, and Closeout ──────────────────────
  {
    id: 'fpm-documentation',
    num: 15,
    title: 'Documentation & Project Closeout',
    desc: 'Service records, compliance documentation, lessons learned, formal acceptance, and handover best practices.',
    slides: [
      {
        title: 'Project Documentation Types',
        body: [
          'Field projects generate multiple document types: project plans, daily field logs, inspection records, test reports, as-built drawings, change orders, and closeout packages.',
          'Daily field logs document what was accomplished, who was on site, weather/access conditions, safety observations, and any issues encountered. They form the project\'s chronological record.',
          'Test and inspection reports (startup reports, functional test checklists, commissioning reports) provide evidence that installed systems meet specifications.',
          'As-built drawings reflect the actual installed condition, which often differs from design drawings due to field changes. As-builts are essential for future maintenance.',
        ],
        keyPoints: [
          'Daily field logs: chronological record of site activity and conditions.',
          'Test/inspection reports prove systems meet spec.',
          'As-built drawings reflect actual installed conditions — critical for future service.',
        ],
        quiz: [
          {
            q: 'As-built drawings are important because:',
            a: ['They reflect the actual installed condition, which may differ from design drawings', 'They replace the need for startup test reports', 'They are required only on government projects', 'They show the original design intent without field changes'],
            correct: 0,
            exp: 'As-builts capture all field modifications so future technicians and the customer know exactly how the system was installed.',
          },
        ],
      },
      {
        title: 'Regulatory Compliance and Permits',
        body: [
          'Field projects must comply with applicable codes (NEC, local building codes, NFPA, OSHA), permit requirements, and authority having jurisdiction (AHJ) approvals.',
          'Permit close-out requires final AHJ inspection and sign-off before the permit is considered closed. Failing to close permits can create legal liability for the customer.',
          'Keep copies of all permits, inspection records, and code compliance documentation in the project closeout package.',
          'Some industries (healthcare, data centers, defense) have additional compliance requirements (Joint Commission, HIPAA, FISMA) that must be documented.',
        ],
        keyPoints: [
          'Close all permits via AHJ final inspection — unclosed permits create liability.',
          'Closeout package includes permits, inspections, and code compliance records.',
          'Sector-specific compliance (healthcare, data center) adds documentation requirements.',
        ],
        quiz: [
          {
            q: 'Failing to obtain AHJ final inspection and close a permit after project completion creates:',
            a: ['Legal liability for the customer and unresolved code compliance status', 'A warranty void on installed equipment', 'An automatic project extension', 'A penalty on the PM\'s performance review only'],
            correct: 0,
            exp: 'Unclosed permits leave the installation in legal limbo — the AHJ can require work stoppage or demolition of unpermitted work.' ,
          },
        ],
      },
      {
        title: 'Customer Acceptance and Punch Lists',
        body: [
          'A punch list is a documented list of items that must be completed or corrected before the customer grants final acceptance.',
          'Conduct a formal walkthrough with the customer to identify punch list items. Document each item with description, location, responsible party, and due date.',
          'Distinguish between punch list items (deficiencies from the agreed scope) and warranty items (failures that occur after acceptance). Conflating the two leads to disputes.',
          'Once all punch list items are resolved, obtain a written customer acceptance (Certificate of Substantial Completion or Final Acceptance Sign-off).',
        ],
        images: [
          { src: '/diagrams/punch-list-closeout.svg', alt: 'Diagram of the walkthrough-to-written-acceptance closeout process, and the distinction between punch list deficiencies from the original scope versus warranty items that occur after acceptance', caption: 'Punch list items belong to the original scope and must close before acceptance; warranty items are failures that happen after — conflating the two causes disputes.' },
        ],
        keyPoints: [
          'Punch list = documented deficiencies to resolve before acceptance.',
          'Walkthrough with customer; document each item with owner and due date.',
          'Written acceptance certificate marks project completion.',
        ],
        quiz: [
          {
            q: 'A punch list is created to document:',
            a: ['Outstanding deficiencies that must be corrected before final acceptance', 'Planned future maintenance items', 'Customer requests for future project phases', 'All work completed during the project'],
            correct: 0,
            exp: 'A punch list captures uncompleted or deficient items from the agreed scope that must be resolved before the customer grants acceptance.',
          },
        ],
      },
      {
        title: 'Lessons Learned and Continuous Improvement',
        body: [
          'A lessons learned session is conducted at project closeout to capture what went well, what did not, and what to do differently next time.',
          'Include the full project team — field techs, subcontractors, PM, and key stakeholders — in lessons learned sessions. Field crews often surface insights the PM did not observe.',
          'Lessons learned should be documented and shared with the broader organization, not filed and forgotten. They are the primary mechanism for organizational learning.',
          'Common lessons from field projects: earlier procurement of long-lead items, clearer subcontractor scope definitions, more frequent customer check-ins during critical phases.',
        ],
        keyPoints: [
          'Lessons learned: what worked, what did not, what to change.',
          'Include field crew — they see things the PM misses.',
          'Share lessons widely; the value is in application, not documentation.',
        ],
        quiz: [
          {
            q: 'The primary value of a lessons learned session is:',
            a: ['Capturing insights to improve future project performance', 'Assigning blame for project failures', 'Fulfilling a contractual reporting requirement', 'Documenting scope changes after the project ends'],
            correct: 0,
            exp: 'Lessons learned create organizational knowledge that prevents repeating mistakes and amplifies successful practices.',
          },
        ],
      },
      {
        title: 'Project Handover and Warranty Period',
        body: [
          'Project handover transfers operational responsibility from the project team to the customer\'s operations team. A structured handover package includes as-builts, O&M manuals, warranty documents, and training records.',
          'Operator training ensures the customer\'s team can safely operate and maintain the installed system. Training records should be signed and archived.',
          'The warranty period begins at customer acceptance. Clearly define warranty terms: what is covered, who to contact, response time commitments, and exclusions.',
          'A 30-day post-acceptance check-in call demonstrates follow-through and often surfaces warranty items before they become disputes.',
        ],
        keyPoints: [
          'Handover package: as-builts, O&M manuals, warranties, training records.',
          'Define warranty terms clearly: coverage, contact, response time, exclusions.',
          '30-day post-acceptance check-in maintains the relationship and catches early warranty issues.',
        ],
        quiz: [
          {
            q: 'The project handover package should include all of the following EXCEPT:',
            a: ['The internal project profitability analysis', 'As-built drawings', 'O&M manuals', 'Warranty documents'],
            correct: 0,
            exp: 'Internal financial data is not shared in customer handover packages — as-builts, O&M manuals, and warranty documents are the standard deliverables.',
          },
        ],
      },
    ],
    test: [
      { q: 'Daily field logs primarily serve as:', a: ['A chronological record of site activity and conditions', 'Financial tracking documents', 'Customer billing summaries', 'Regulatory permit applications'], correct: 0, exp: 'Daily field logs document who was on site, what was accomplished, conditions, and issues — forming the project\'s chronological record.' },
      { q: 'As-built drawings differ from design drawings in that they:', a: ['Reflect actual installed conditions including field changes', 'Show the original design intent without modifications', 'Are created before the project starts', 'Are only required for electrical work'], correct: 0, exp: 'As-builts capture all deviations from the original design so future technicians and owners know the actual system configuration.' },
      { q: 'A permit must be formally closed by:', a: ['AHJ final inspection and sign-off', 'Customer acceptance signature', 'The project manager\'s written statement', 'The subcontractor who pulled the permit'], correct: 0, exp: 'The Authority Having Jurisdiction (AHJ) must inspect and sign off to formally close a permit.' },
      { q: 'A punch list item differs from a warranty item because:', a: ['Punch list items are deficiencies before acceptance; warranty items are failures after acceptance', 'Warranty items cost more to resolve', 'Punch lists are the customer\'s responsibility', 'Punch list items are always minor; warranty items are always major'], correct: 0, exp: 'Punch list = pre-acceptance deficiency. Warranty = post-acceptance failure. Mixing them leads to cost disputes.' },
      { q: 'The lessons learned session should include:', a: ['The full project team including field technicians and subcontractors', 'Only the PM and project sponsor', 'External auditors only', 'The customer\'s executive team exclusively'], correct: 0, exp: 'Field crews and subcontractors have ground-level insights the PM often misses — their input is essential for meaningful lessons.' },
      { q: 'Written customer acceptance is important because:', a: ['It formally transfers operational responsibility and marks project completion', 'It triggers the PM\'s bonus payment', 'It is required by all state building codes', 'It starts the procurement warranty clock for replacement parts'], correct: 0, exp: 'Written acceptance formally closes the project, begins the warranty period, and documents the transfer of responsibility.' },
      { q: 'An operator training record should be:', a: ['Signed by trainees and archived in the handover package', 'Destroyed after one year for privacy', 'Kept only by the PM for performance reviews', 'Submitted to the AHJ as a permit requirement'], correct: 0, exp: 'Signed training records prove that operators were trained and understand the system — important for warranty and liability purposes.' },
      { q: 'The purpose of a 30-day post-acceptance check-in is to:', a: ['Surface early warranty items and demonstrate follow-through to the customer', 'Renegotiate contract terms', 'Review the project profitability with the customer', 'Collect outstanding payments only'], correct: 0, exp: 'A post-acceptance check-in catches early warranty issues, shows commitment to the customer relationship, and prevents disputes.' },
      { q: 'What does a Certificate of Substantial Completion document?', a: ['Customer acceptance that all punch list items and scope are resolved', 'The start of the permit application process', 'Final payment from the customer to the contractor', 'AHJ approval of the design drawings'], correct: 0, exp: 'A Certificate of Substantial Completion or Final Acceptance marks the formal end of the project and acceptance of all deliverables.' },
      { q: 'Lessons learned documentation is most valuable when:', a: ['It is actively shared across the organization and applied to future projects', 'Filed in the project archive for compliance purposes', 'Used only by the PM for personal development', 'Distributed to customers as a quality report'], correct: 0, exp: 'Lessons learned only improve performance when shared and applied — filed-and-forgotten documentation has no organizational value.' },
    ],
  },

  // ── Module 16: Career Development and Leadership ───────────────────────────
  {
    id: 'fpm-career',
    num: 16,
    title: 'Career Growth & Leadership in Field PM',
    desc: 'Professional development pathways, PM certifications, leadership skills, and advancing from technician to project manager.',
    slides: [
      {
        title: 'From Technician to Project Manager',
        body: [
          'Many field project managers start as technicians. Technical credibility is a significant advantage in the PM role — crews and customers respect PMs who understand the work.',
          'The transition requires developing new competencies: planning, scheduling, budgeting, stakeholder management, and written communication. Technical skills alone are not sufficient.',
          'Entry-level PM roles in field service include: project coordinator, field supervisor, installation project manager. Each builds the experience base for larger projects.',
          'Seek opportunities to shadow experienced PMs, take on small project coordination tasks, and ask for formal PM responsibilities on current projects.',
        ],
        keyPoints: [
          'Technical background builds credibility; new skills (planning, budgeting, communication) must be developed.',
          'Entry path: coordinator → field supervisor → project manager.',
          'Shadow experienced PMs and volunteer for coordination tasks.',
        ],
        quiz: [
          {
            q: 'What advantage does a technician-turned-PM have over a PM without field experience?',
            a: ['Technical credibility with crews and customers who respect hands-on knowledge', 'Automatic PMP certification eligibility', 'Higher salary from day one of the PM role', 'Exemption from project management training requirements'],
            correct: 0,
            exp: 'Technical background earns respect from crews and customers — they trust a PM who understands the actual work being done.',
          },
        ],
      },
      {
        title: 'PM Certifications and Professional Development',
        body: [
          'The Project Management Professional (PMP)® certification from PMI is the most recognized PM credential globally. It requires 36 months of PM experience, 35 hours of PM education, and passing a rigorous exam.',
          'CAPM® (Certified Associate in Project Management) is the entry-level PMI credential suitable for those building their PM experience base.',
          'CompTIA Project+ is a vendor-neutral certification covering PM fundamentals, suitable for IT and field service PM roles.',
          'Continuing education through PMI chapters, workshops, construction PM programs, and field service industry associations builds both skills and professional networks.',
        ],
        keyPoints: [
          'PMP®: most recognized PM credential; requires experience + education + exam.',
          'CAPM®: PMI entry-level credential for those building experience.',
          'Continuing education and professional associations build skills and network.',
        ],
        quiz: [
          {
            q: 'The PMP® certification is awarded by:',
            a: ['PMI (Project Management Institute)', 'CompTIA', 'OSHA', 'IEEE'],
            correct: 0,
            exp: 'The PMP® is the flagship certification of the Project Management Institute (PMI), the leading global PM professional organization.',
          },
        ],
      },
      {
        title: 'Leadership and Team Motivation',
        body: [
          'Field PMs lead without always having formal authority over the people doing the work (subcontractors, cross-functional teams). Influence skills are essential.',
          'Situational leadership: adapt your style to the team member\'s competence and commitment level. Experienced techs need autonomy; new crew members need direction.',
          'Recognition matters: acknowledge good work publicly and promptly. Specific praise ("your conduit layout saved us two hours") is more motivating than generic praise.',
          'Psychological safety — team members feeling safe to raise issues without fear of blame — is the strongest predictor of high-performing project teams.',
        ],
        keyPoints: [
          'Lead through influence, not just authority.',
          'Adapt leadership style to team member competence and commitment.',
          'Psychological safety enables issues to surface before they become failures.',
        ],
        quiz: [
          {
            q: 'Psychological safety in a project team means:',
            a: ['Team members feel safe raising issues without fear of blame or retaliation', 'The team follows all physical safety procedures without reminder', 'The PM approves all safety decisions before work starts', 'Team members are protected from disciplinary action for accidents'],
            correct: 0,
            exp: 'Psychological safety enables honest communication — teams that feel safe surfacing problems solve them before they escalate.',
          },
        ],
      },
      {
        title: 'Negotiation and Conflict Resolution',
        body: [
          'Field PMs negotiate constantly: scope with customers, resources with operations managers, pricing with subcontractors, and schedule with vendors.',
          'Interest-based negotiation (win-win): focus on underlying interests, not stated positions. A subcontractor saying "I need more money" may actually need faster payment terms.',
          'The Thomas-Kilmann conflict model identifies five modes: Competing, Collaborating, Compromising, Avoiding, Accommodating. Collaborating (win-win) is best for ongoing relationships.',
          'Separate people from problems — address the issue, not personalities. "This schedule conflicts with the customer\'s shutdown window" vs. "Your planning is always wrong."',
        ],
        keyPoints: [
          'Negotiate on interests, not positions — uncover what the other party actually needs.',
          'Collaborate (win-win) for ongoing relationships; other modes for specific contexts.',
          'Separate people from problems: address the issue, not the person.',
        ],
        quiz: [
          {
            q: 'Interest-based negotiation focuses on:',
            a: ['Underlying needs rather than stated positions', 'The highest possible financial outcome', 'Legal contract terms exclusively', 'The PM\'s authority to compel agreement'],
            correct: 0,
            exp: 'Interest-based negotiation uncovers what both parties actually need, enabling creative solutions that positions-only negotiation cannot find.',
          },
        ],
      },
      {
        title: 'Building Your PM Career',
        body: [
          'Track your project experience: dollar values, team size, duration, and outcomes. This data supports PMP applications, performance reviews, and job applications.',
          'Build a portfolio of project deliverables (sanitized of confidential data): sample project plans, risk registers, status reports, and lessons learned documents.',
          'Professional networks — colleagues, mentors, industry associations — are the primary source of career advancement opportunities in field service PM.',
          'Seek feedback actively. After each project, ask your sponsor, customer, and team: "What would you want me to do differently next time?" High-growth PMs are relentlessly self-improving.',
        ],
        keyPoints: [
          'Track project metrics (size, value, outcome) for PMP applications and interviews.',
          'Build a PM portfolio with sanitized sample deliverables.',
          'Solicit post-project feedback from every stakeholder group.',
        ],
        quiz: [
          {
            q: 'Why should a PM track the dollar value and size of projects they manage?',
            a: ['This data is required for PMP certification applications and demonstrates experience in interviews', 'It determines annual salary increases automatically', 'It is reported to OSHA as part of safety compliance', 'Customers require project managers to disclose this information'],
            correct: 0,
            exp: 'PMP eligibility and PM job applications require documented project experience by size and complexity — tracking this data is essential for career advancement.',
          },
        ],
      },
    ],
    test: [
      { q: 'Which PMI certification is most appropriate for someone just beginning to build PM experience?', a: ['CAPM® (Certified Associate in Project Management)', 'PMP® (Project Management Professional)', 'CompTIA Project+', 'PMI-ACP'], correct: 0, exp: 'CAPM is PMI\'s entry-level credential for those building their PM experience base before qualifying for the full PMP.' },
      { q: 'Leading without formal authority over subcontractors requires:', a: ['Influence and relationship skills', 'Contractual enforcement only', 'Daily written directives filed with HR', 'Approval from the customer\'s legal team'], correct: 0, exp: 'Subs are not direct employees, so the PM must lead through influence, communication, and relationship — not just authority.' },
      { q: 'Situational leadership requires the PM to:', a: ['Adapt their style to each team member\'s competence and commitment', 'Apply the same directive approach to all team members', 'Delegate all decisions to the most experienced technician', 'Avoid adjusting style to prevent confusion'], correct: 0, exp: 'Experienced, confident team members need autonomy. New or unsure members need direction. Matching style to the person improves performance.' },
      { q: 'The Thomas-Kilmann model\'s "Collaborating" mode is preferred for ongoing relationships because:', a: ['It seeks win-win solutions that address both parties\' needs', 'It is the fastest conflict resolution approach', 'It avoids all confrontation', 'It always results in the PM\'s preferred outcome'], correct: 0, exp: 'Collaborating finds solutions that satisfy both parties\' interests, preserving and strengthening the ongoing relationship.' },
      { q: 'Interest-based negotiation differs from position-based negotiation in that it:', a: ['Focuses on underlying needs rather than stated demands', 'Produces legally binding outcomes', 'Favors the party with more leverage', 'Requires a neutral third-party mediator'], correct: 0, exp: 'Position-based negotiation stalls when parties can\'t budge on stated positions. Interest-based negotiation finds creative solutions by addressing actual needs.' },
      { q: 'A PM portfolio of sanitized project deliverables is useful for:', a: ['Demonstrating capability in job applications and PM certification interviews', 'Filing with the AHJ as a permit requirement', 'Sharing confidential project data with industry peers', 'Calculating billable hours for subcontractors'], correct: 0, exp: 'A portfolio shows concrete evidence of PM skills — sample plans, status reports, and risk registers prove capability better than a resume alone.' },
      { q: 'Specific praise ("your conduit layout saved us two hours") is more effective than generic praise because:', a: ['It shows the PM paid attention and ties the recognition to a concrete outcome', 'Generic praise violates company HR policy', 'Specific praise triggers automatic bonuses for field technicians', 'It satisfies OSHA recognition requirements'], correct: 0, exp: 'Specific recognition shows genuine attention and reinforces exactly the behaviors that led to the positive outcome.' },
      { q: 'The PMP® certification requires which of the following prerequisites?', a: ['36 months of PM experience, 35 hours of PM education, and passing an exam', 'A four-year college degree only', 'Five years of field technician experience', 'Membership in a trade union'], correct: 0, exp: 'PMP prerequisites: 36 months of PM experience (or 60 months without a degree), 35 hours of PM education, and a passing exam score.' },
      { q: 'Post-project feedback should be solicited from:', a: ['The sponsor, customer, and project team', 'Only the customer to avoid internal conflict', 'The PM\'s direct supervisor only', 'Subcontractors who were not satisfied with the experience'], correct: 0, exp: 'Each stakeholder group sees different aspects of the PM\'s performance — all perspectives together create a complete picture for growth.' },
      { q: 'Tracking project dollar value, team size, and duration primarily supports:', a: ['PMP certification applications and career advancement conversations', 'Weekly operational reporting to the dispatch team', 'AHJ permit compliance documentation', 'Subcontractor invoice verification'], correct: 0, exp: 'PMP eligibility, performance reviews, and job applications all require documented project experience by scope and scale.' },
    ],
  },
];
