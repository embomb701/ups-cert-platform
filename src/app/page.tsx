import type { Metadata } from 'next';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import { PlacementQuiz } from '@/components/PlacementQuiz';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';
const OG_IMAGE = `${SITE_URL}/api/og`;

export const metadata: Metadata = {
  title: 'Mastering Field Service Training Portal — 28 Career Tracks in Critical Infrastructure',
  description:
    'Start a $45K–$130K+ career in field service in 3–6 months. No college required. 28 career tracks — UPS, HVAC, Solar, Data Center, Elevator, Field PM, and more.',
  openGraph: {
    title: 'Mastering Field Service Training Portal — 28 Career Tracks in Critical Infrastructure',
    description: 'Start a $45K–$130K+ career in field service in 3–6 months. No college required.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Mastering Field Service Training Portal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mastering Field Service Training Portal — 28 Career Tracks',
    description: 'Start a $45K–$130K+ career in field service. No college required.',
    images: [OG_IMAGE],
  },
};

// ─── Per-course detail data ────────────────────────────────────────────────
interface CourseDetail {
  pay: string;
  senior: string;
  duration: string;
  environment: string;
  highlights: string[];
}

const DETAILS: Record<string, CourseDetail> = {
  'critical-environment': {
    pay: 'Free',
    senior: 'Foundation for all tracks',
    duration: '1–2 weeks',
    environment: 'All mission-critical facilities',
    highlights: [
      'Required baseline for anyone entering data centers, hospitals, or electrical rooms',
      'Covers safety protocols, LOTO basics, environmental controls, and emergency response',
      'Earn your Critical Environment Fundamentals Certificate at no cost',
    ],
  },
  'ups': {
    pay: '$55K–$75K',
    senior: '$95K–$130K',
    duration: '3–6 months · 28 modules',
    environment: 'Data centers, hospitals, financial institutions, military',
    highlights: [
      'Service and maintain UPS systems keeping life-critical systems online 24/7',
      'On-call rotation with premium overtime — nights and weekends add significantly to base',
      'One of the highest-demand roles in critical power with a shrinking technician pool',
    ],
  },
  'kitchen': {
    pay: '$48K–$72K',
    senior: '$80K–$110K',
    duration: '3–6 months · 27 modules',
    environment: 'Restaurants, hotels, hospitals, institutional kitchens',
    highlights: [
      'Service commercial refrigeration, cooking equipment, warewashing, and ice machines',
      'Fast-dispatch, high-volume work — most techs run 5–8 calls per day',
      'Huge install base; nearly every commercial kitchen requires contract service',
    ],
  },
  'hvac': {
    pay: '$55K–$78K',
    senior: '$90K–$125K',
    duration: '3–5 months · 25 modules',
    environment: 'Commercial buildings, data centers, hospitals',
    highlights: [
      'Install and maintain HVAC systems controlling environments in critical facilities',
      'Strong union presence in many markets — apprenticeship paths into IBEW or UA',
      'Cross-training with refrigeration and BAS opens doors to senior system roles',
    ],
  },
  'generator': {
    pay: '$58K–$80K',
    senior: '$95K–$130K',
    duration: '3–5 months · 25 modules',
    environment: 'Hospitals, data centers, utilities, government facilities',
    highlights: [
      'Service diesel and natural gas standby generators protecting critical infrastructure',
      'Emergency dispatch during storms and outages — premium pay for emergency response',
      'Generator techs are in demand everywhere grid reliability is essential',
    ],
  },
  'data-center': {
    pay: '$65K–$88K',
    senior: '$100K–$140K',
    duration: '4–6 months · 28 modules',
    environment: 'Hyperscale and colocation data centers',
    highlights: [
      'Operate, maintain, and troubleshoot all power and cooling systems in a data center',
      'Highest base pay of any field service track — data center operations never stop',
      'Covers UPS, generators, PDUs, cooling, BMS, and emergency procedures end-to-end',
    ],
  },
  'solar': {
    pay: '$52K–$74K',
    senior: '$85K–$118K',
    duration: '3–4 months · 21 modules',
    environment: 'Commercial rooftops, utility-scale solar farms, storage facilities',
    highlights: [
      'Commission, service, and troubleshoot solar PV systems and battery energy storage (BESS)',
      'Fastest-growing sector in energy — installer shortage is creating a service shortage',
      'Combines electrical fundamentals with inverter, string, and battery systems',
    ],
  },
  'ev-charging': {
    pay: '$52K–$72K',
    senior: '$80K–$112K',
    duration: '2–4 months · 18 modules',
    environment: 'Fleet depots, commercial parking, highway corridors, dealerships',
    highlights: [
      'Install, service, and troubleshoot Level 2 and DC fast-charging stations',
      'EV charging infrastructure is expanding at every major retail and fleet location',
      'Combines electrical work with networking, payment systems, and utility coordination',
    ],
  },
  'dc-plants': {
    pay: '$60K–$82K',
    senior: '$95K–$128K',
    duration: '2–4 months · 17 modules',
    environment: 'Telecom central offices, wireless towers, broadband headends',
    highlights: [
      'Maintain 48V DC power plant systems powering the national telecom backbone',
      'Rectifiers, batteries, PDUs, and remote monitoring in unmanned facilities',
      'Work for telecom carriers or independent contractors — remote site dispatch',
    ],
  },
  'battery-tech': {
    pay: '$52K–$74K',
    senior: '$85K–$115K',
    duration: '2–4 months · 18 modules',
    environment: 'UPS systems, telecom sites, utilities, energy storage facilities',
    highlights: [
      'Specialize in battery system maintenance, testing, replacement, and safety',
      'VRLA, lithium-ion, and flooded cell expertise across multiple industries',
      'Battery replacement contracts are a major revenue stream for service companies',
    ],
  },
  'dc-engineer': {
    pay: '$70K–$92K',
    senior: '$110K–$145K',
    duration: '4–7 months · 34 modules',
    environment: 'Data centers, utilities, large-scale industrial facilities',
    highlights: [
      'Senior-level role covering power distribution, UPS, generators, and system design',
      'DC engineers often oversee entire power infrastructure for large facilities',
      'One of the highest-ceiling roles in critical power — path to facility manager',
    ],
  },
  'marine': {
    pay: '$50K–$70K',
    senior: '$80K–$108K',
    duration: '2–4 months · 16 modules',
    environment: 'Commercial vessels, marinas, shipyards, offshore platforms',
    highlights: [
      'Service electrical and mechanical systems on commercial and industrial marine vessels',
      'Travel and per diem pay typical — many positions include housing allowances',
      'Specialized knowledge commands a premium in a field with very few trained techs',
    ],
  },
  'pool': {
    pay: '$45K–$65K',
    senior: '$75K–$100K',
    duration: '2–3 months · 17 modules',
    environment: 'Hotels, resorts, municipalities, HOAs, commercial facilities',
    highlights: [
      'Maintain and repair commercial pool equipment — pumps, filtration, chemical systems',
      'High route density; most techs service 10–15 accounts daily',
      'Low barrier to entry with fast ramp-up — strong demand in Sun Belt states',
    ],
  },
  'hvac-tech': {
    pay: '$52K–$74K',
    senior: '$85K–$118K',
    duration: '2–4 months · 16 modules',
    environment: 'Commercial buildings, medical facilities, retail centers',
    highlights: [
      'Commercial HVAC installation and service with a focus on hands-on technical skills',
      'Strong overlap with refrigeration opens second income stream with one license',
      'High call volume in summer and winter spikes — overtime is consistent',
    ],
  },
  'solar-installer': {
    pay: '$48K–$70K',
    senior: '$80K–$108K',
    duration: '2–4 months · 16 modules',
    environment: 'Residential rooftops, commercial rooftops, ground-mount arrays',
    highlights: [
      'Install, wire, and commission solar PV systems for residential and commercial customers',
      'NABCEP certification pathway — the industry-recognized credential for solar installers',
      'Strong install backlog in most US markets; experienced installers are in high demand',
    ],
  },
  'wind-turbine': {
    pay: '$55K–$78K',
    senior: '$85K–$118K',
    duration: '2–4 months · 16 modules',
    environment: 'Onshore and offshore wind farms, remote rural sites',
    highlights: [
      'Climb and service wind turbines — mechanical, electrical, and hydraulic systems',
      'Per diem and travel pay is standard; remote site premiums add to compensation',
      'Wind capacity is tripling this decade — technician shortage is severe',
    ],
  },
  'elevator': {
    pay: '$65K–$95K',
    senior: '$110K–$145K',
    duration: '2–4 months · 16 modules',
    environment: 'High-rises, hospitals, airports, commercial buildings',
    highlights: [
      'Service and maintain elevators, escalators, and moving walkways',
      'IUEC union track offers apprenticeship paths with top-tier benefits packages',
      'Some of the highest average pay in the trades — experienced mechanics exceed $100K routinely',
    ],
  },
  'fire-alarm': {
    pay: '$55K–$78K',
    senior: '$90K–$125K',
    duration: '2–4 months · 16 modules',
    environment: 'All commercial buildings — required by code nationwide',
    highlights: [
      'Install, inspect, test, and service fire alarm and suppression systems',
      'Code-required inspections on every commercial building create a permanent maintenance market',
      'NICET certification pathway — the national credential for fire alarm technicians',
    ],
  },
  'bmet': {
    pay: '$52K–$75K',
    senior: '$85K–$118K',
    duration: '2–4 months · 16 modules',
    environment: 'Hospitals, surgery centers, medical clinics, imaging facilities',
    highlights: [
      'Maintain and repair biomedical equipment — ventilators, patient monitors, infusion pumps',
      'Healthcare facilities must keep biomedical equipment certified and operational — no exceptions',
      'Combination of electronics, medical device knowledge, and regulatory compliance skills',
    ],
  },
  'bas-tech': {
    pay: '$58K–$80K',
    senior: '$90K–$122K',
    duration: '2–4 months · 16 modules',
    environment: 'Large commercial buildings, campuses, hospitals, government facilities',
    highlights: [
      'Program and service building automation systems (BAS/BMS) controlling HVAC and power',
      'BAS techs bridge IT and building systems — a hybrid role with strong upside',
      'Every modern large building requires ongoing BAS maintenance contracts',
    ],
  },
  'ref-tech': {
    pay: '$52K–$74K',
    senior: '$85K–$112K',
    duration: '2–4 months · 16 modules',
    environment: 'Grocery stores, restaurants, cold storage facilities, food distribution',
    highlights: [
      'Service commercial refrigeration — walk-ins, display cases, condensing units',
      'EPA Section 608 certification required — included in training',
      'Food cold chain is non-negotiable; breakdowns get same-day dispatch response',
    ],
  },
  'plc-tech': {
    pay: '$60K–$85K',
    senior: '$100K–$138K',
    duration: '2–4 months · 16 modules',
    environment: 'Manufacturing plants, utilities, water treatment, automation facilities',
    highlights: [
      'Program, troubleshoot, and maintain PLC-controlled industrial automation systems',
      'PLC techs are among the highest-paid in the trades — programming skills command a premium',
      'Allen-Bradley, Siemens, and Automation Direct platforms covered',
    ],
  },
  'security-tech': {
    pay: '$48K–$70K',
    senior: '$80K–$108K',
    duration: '2–4 months · 16 modules',
    environment: 'Commercial buildings, government facilities, data centers, retail',
    highlights: [
      'Install and service access control, CCTV, intrusion detection, and intercom systems',
      'Recurring maintenance contracts provide stable income base for technicians and companies',
      'Low-voltage license requirements vary by state — training covers national best practices',
    ],
  },
  'field-pm': {
    pay: '$75K–$98K',
    senior: '$110K–$145K',
    duration: '4–6 months · 16 modules',
    environment: 'Construction sites, facility rollouts, infrastructure projects',
    highlights: [
      'Manage field service projects from initiation through closeout — scope, schedule, and budget',
      'PMP® certification pathway — the global standard for project management credentials',
      'Field PMs often earn the highest compensation in a service organization outside of ownership',
    ],
  },
  'pump-tech': {
    pay: '$52K–$74K',
    senior: '$85K–$112K',
    duration: '3–5 months · 16 modules',
    environment: 'Industrial plants, HVAC systems, water treatment, oil and gas facilities',
    highlights: [
      'Install, align, and service centrifugal and positive-displacement pump systems',
      'Mechanical alignment, seal replacement, and cavitation diagnosis are core skills',
      'Pump technicians are required anywhere fluid systems are mission-critical',
    ],
  },
  'industrial-ref': {
    pay: '$45K–$65K',
    senior: '$80K–$100K',
    duration: '1–2 months · 6 modules (growing)',
    environment: 'Food processing plants, cold storage, breweries, pharmaceutical facilities',
    highlights: [
      'Operate and maintain large-scale ammonia refrigeration systems under OSHA PSM compliance',
      'RETA certification pathway — the national credential for industrial refrigeration operators',
      'Severe technician shortage in cold chain and food processing is driving above-average pay growth',
    ],
  },
  'dc-ops': {
    pay: '$65K–$88K',
    senior: '$100K–$140K',
    duration: '1–2 months · 5 modules (growing)',
    environment: 'Colocation facilities, hyperscale campuses, enterprise data centers',
    highlights: [
      'Manage uptime, compliance, and efficiency for data center critical infrastructure',
      'Covers power chain, cooling, change management, DCIM, and financial oversight',
      'One of the fastest-growing management disciplines driven by cloud and AI expansion',
    ],
  },
  'building-cx': {
    pay: '$55K–$75K',
    senior: '$90K–$130K',
    duration: '1–2 months · 5 modules (growing)',
    environment: 'Commercial construction, healthcare campuses, universities, government buildings',
    highlights: [
      'Verify that HVAC, BAS, and enclosure systems meet the Owner\'s Project Requirements',
      'LEED certification requires commissioning on every project — demand is built into code',
      'BCxP/CBCP certification pathway opens doors in MEP engineering and facility management',
    ],
  },
  'telecom': {
    pay: '$45K–$65K',
    senior: '$75K–$95K',
    duration: '1–2 months · 6 modules (growing)',
    environment: 'Rural fiber corridors, telecom right-of-way, cell sites, central offices',
    highlights: [
      'Splice fiber, run OTDR tests, and certify outside plant infrastructure for carriers',
      'BEAD and RDOF federal broadband programs are funding a decade of rural fiber expansion',
      'MasTec, Dycom, AT&T, and Verizon are hiring OSP techs in every US market',
    ],
  },
};

// ─── Course categories ─────────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: 'Critical Power',
    color: 'text-blue-400',
    borderColor: 'border-blue-900/40',
    ids: ['ups', 'generator', 'data-center', 'dc-plants', 'battery-tech', 'dc-engineer'],
  },
  {
    label: 'Building & Facility Systems',
    color: 'text-teal-400',
    borderColor: 'border-teal-900/40',
    ids: ['hvac', 'hvac-tech', 'bas-tech', 'ref-tech'],
  },
  {
    label: 'Clean Energy',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-900/40',
    ids: ['solar', 'ev-charging', 'solar-installer', 'wind-turbine'],
  },
  {
    label: 'Specialized Trades',
    color: 'text-violet-400',
    borderColor: 'border-violet-900/40',
    ids: ['elevator', 'fire-alarm', 'bmet', 'plc-tech', 'security-tech', 'pool', 'marine', 'pump-tech'],
  },
  {
    label: 'Commercial Food Service',
    color: 'text-orange-400',
    borderColor: 'border-orange-900/40',
    ids: ['kitchen'],
  },
  {
    label: 'Facilities & Infrastructure',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-900/40',
    ids: ['industrial-ref', 'dc-ops', 'building-cx', 'telecom'],
  },
  {
    label: 'Management & Operations',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-900/40',
    ids: ['field-pm'],
  },
];

// Course shortTitle and tagline — keyed by id
const COURSE_QUICK: Record<string, { shortTitle: string; tagline: string; totalModules: number; free?: boolean; price?: string }> = {
  'critical-environment': { shortTitle: 'CE Fundamentals', tagline: 'Safety and access protocols for anyone entering mission-critical facilities.', totalModules: 8, free: true },
  'ups':                  { shortTitle: 'UPS FSE',          tagline: 'Service UPS systems in hospitals, data centers, and financial institutions.', totalModules: 28 },
  'kitchen':              { shortTitle: 'Kitchen FSE',      tagline: 'Service commercial kitchen equipment — refrigeration, cooking, warewashing.', totalModules: 27 },
  'hvac':                 { shortTitle: 'HVAC FSE',         tagline: 'Service commercial HVAC systems in critical and commercial environments.', totalModules: 25 },
  'generator':            { shortTitle: 'Generator FSE',    tagline: 'Service standby diesel and gas generators protecting critical facilities.', totalModules: 25 },
  'data-center':          { shortTitle: 'Data Center CFT',  tagline: 'Operate and maintain all power and cooling systems in data centers.', totalModules: 28 },
  'solar':                { shortTitle: 'Solar/BESS',       tagline: 'Commission and service solar PV and battery energy storage systems.', totalModules: 21 },
  'ev-charging':          { shortTitle: 'EV Charging',      tagline: 'Install and service Level 2 and DC fast-charging infrastructure.', totalModules: 18 },
  'dc-plants':            { shortTitle: 'DC Plants Tech',   tagline: 'Maintain 48V DC power plant systems powering the telecom backbone.', totalModules: 17 },
  'battery-tech':         { shortTitle: 'Battery Tech',     tagline: 'VRLA, lithium-ion, and flooded cell maintenance across industries.', totalModules: 18 },
  'dc-engineer':          { shortTitle: 'DC Engineer',      tagline: 'Senior power engineering covering UPS, generators, and full facility power.', totalModules: 34, price: '$1,999' },
  'marine':               { shortTitle: 'Marine Tech',      tagline: 'Service electrical and mechanical systems on commercial marine vessels.', totalModules: 16 },
  'pool':                 { shortTitle: 'Pool Tech',        tagline: 'Maintain commercial pool and aquatic systems — pumps, filtration, chemicals.', totalModules: 17 },
  'hvac-tech':            { shortTitle: 'HVAC Tech',        tagline: 'Commercial HVAC installation and service with a technical depth focus.', totalModules: 16 },
  'solar-installer':      { shortTitle: 'Solar Installer',  tagline: 'Install and wire solar PV systems — NABCEP certification pathway.', totalModules: 16 },
  'wind-turbine':         { shortTitle: 'Wind Turbine',     tagline: 'Climb and service wind turbines — mechanical, electrical, and hydraulic.', totalModules: 16 },
  'elevator':             { shortTitle: 'Elevator Tech',    tagline: 'Service elevators and escalators — IUEC pathway with top-tier pay.', totalModules: 16 },
  'fire-alarm':           { shortTitle: 'Fire Alarm Tech',  tagline: 'Install and service fire alarm systems — NICET certification pathway.', totalModules: 16 },
  'bmet':                 { shortTitle: 'BMET',             tagline: 'Maintain biomedical equipment in hospitals and clinical environments.', totalModules: 16 },
  'bas-tech':             { shortTitle: 'BAS Tech',         tagline: 'Program and service building automation systems — the IT-trades hybrid.', totalModules: 16 },
  'ref-tech':             { shortTitle: 'Ref Tech',         tagline: 'Service commercial refrigeration — walk-ins, display cases, condensing units.', totalModules: 16 },
  'plc-tech':             { shortTitle: 'PLC Tech',         tagline: 'Program and troubleshoot industrial PLC automation systems.', totalModules: 16 },
  'security-tech':        { shortTitle: 'Security Tech',    tagline: 'Install and service access control, CCTV, and intrusion detection systems.', totalModules: 16 },
  'field-pm':             { shortTitle: 'Field PM',         tagline: 'Manage field projects from initiation through closeout — PMP® pathway.', totalModules: 16 },
  'pump-tech':            { shortTitle: 'Pump Tech',        tagline: 'Service centrifugal and positive-displacement pump systems.', totalModules: 16 },
  'industrial-ref':       { shortTitle: 'Industrial Ref',   tagline: 'Ammonia refrigeration systems for food processing, cold storage, and breweries.', totalModules: 6 },
  'dc-ops':               { shortTitle: 'DC Ops Manager',   tagline: 'Manage critical infrastructure uptime, efficiency, and compliance in data centers.', totalModules: 5 },
  'building-cx':          { shortTitle: 'Building Cx',      tagline: 'Commission HVAC and BAS systems — LEED EA prerequisite on every project.', totalModules: 5, price: '$1,299' },
  'telecom':              { shortTitle: 'Telecom OSP',      tagline: 'Outside plant fiber splicing, OTDR testing, and copper plant certification.', totalModules: 6, price: '$1,299' },
};

const COLOR_ACCENT: Record<string, string> = {
  blue:    'text-blue-400',
  orange:  'text-orange-400',
  teal:    'text-teal-400',
  amber:   'text-amber-400',
  violet:  'text-violet-400',
  yellow:  'text-yellow-400',
  green:   'text-green-400',
  sky:     'text-sky-400',
  rose:    'text-rose-400',
  cyan:    'text-cyan-400',
  emerald: 'text-emerald-400',
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Mastering Field Service Training Portal',
        description: 'Professional field service training and certification. 28 career tracks.',
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `${SITE_URL}/#org`,
        name: 'Mastering Field Service Training Portal',
        url: SITE_URL,
        description: 'Field service career training and certification by FA Consulting and Recruiting.',
        founder: { '@type': 'Person', name: 'Francis Aiello' },
        sameAs: [],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Do I need any experience to start?', acceptedAnswer: { '@type': 'Answer', text: 'No. The training starts with electrical fundamentals and builds from there. Every track begins with the same 10-module foundation — no prior knowledge required.' } },
          { '@type': 'Question', name: 'Can I train in more than one track?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Modules 1–10 are shared across every program. Complete them once and they count toward all certifications. After the foundation you branch into whichever specialty tracks you choose — there is no limit.' } },
          { '@type': 'Question', name: 'Which track should I start with?', acceptedAnswer: { '@type': 'Answer', text: 'If you are not sure, start with UPS Field Service Engineering — it is the broadest critical power track and the most transferable foundation. Or take the free Critical Environment Fundamentals course first to get a feel for the material and the platform.' } },
          { '@type': 'Question', name: 'What is included in the $1,499 training course?', acceptedAnswer: { '@type': 'Answer', text: 'Everything: all modules, section quizzes, module tests, the NFPA 70E certificate (Module 8), the LOTO certificate (Module 9), the practice exam, and your Jr. Certification exam at completion. No hidden fees.' } },
          { '@type': 'Question', name: 'How long does training take?', acceptedAnswer: { '@type': 'Answer', text: 'The 3-day minimum between modules is enforced server-side. At that pace a 28-module track takes at least 3 months. Most students finish in 3–6 months. Shorter tracks (16–24 modules) can be completed in 2–4 months.' } },
          { '@type': 'Question', name: 'What is the NFPA 70E certificate?', acceptedAnswer: { '@type': 'Answer', text: 'A standalone, employer-verifiable credential earned by completing Module 8. Covers arc flash hazards, PPE categories 1–4, approach boundaries, and energized work permits. Included free with the training course.' } },
          { '@type': 'Question', name: 'What is the test-out option?', acceptedAnswer: { '@type': 'Answer', text: 'If you already work in the field and know the material, you can skip training and attempt the certification exam directly for $299. Live proctor. One attempt — fail and the full training course is required before retrying.' } },
        ],
      },
    ],
  };

  return (
    <div className="bg-gray-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-gray-900 to-gray-900 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-60 -left-40 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-900/40 border border-blue-700/60 rounded-full text-blue-300 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Industry facing critical technician shortage across all trades
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Start a <span className="text-gradient">$45K–$130K+</span> career in 3–6 months.{' '}
              <span className="text-gray-300">No college. No debt.</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl">
              Mastering Field Service is a full technical training portal with 28 career tracks —
              critical power, HVAC, solar, data centers, elevators, biomedical, industrial automation, and more.
              One shared electrical and safety foundation. Choose the trade. Earn the credential.
              Get hired.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-lg text-lg transition-all text-center shadow-lg shadow-blue-950/50"
              >
                Create Free Account
              </Link>
              <Link
                href="#courses"
                className="px-8 py-4 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold rounded-lg text-lg transition-colors text-center"
              >
                Browse All 28 Tracks ↓
              </Link>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Free to sign up. Enroll when you&apos;re ready. Not sure which track?{' '}
              <Link href="#quiz" className="text-blue-400 hover:text-blue-300 underline">Take the 90-second quiz ↓</Link>
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: '28', label: 'Career tracks in one portal' },
              { stat: '3–6 months', label: 'To your first field job' },
              { stat: '$130K+', label: 'Management ceiling' },
              { stat: '$0', label: 'Student loan debt' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-800 rounded-lg p-4 bg-gray-800/40">
                <p className="text-2xl font-bold text-white">{item.stat}</p>
                <p className="text-gray-500 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLACEMENT QUIZ ────────────────────────────────────────────── */}
      <section id="quiz" className="max-w-3xl mx-auto px-4 pt-12">
        <PlacementQuiz />
      </section>

      {/* ── FREE CE COURSE CALLOUT ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pt-12">
        <div className="rounded-xl border-2 border-emerald-700/60 bg-emerald-950/20 p-6 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">Free — No Purchase Required</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Critical Environment Fundamentals</h2>
            <p className="text-gray-400 text-sm">
              Before you enter any data center, hospital, or electrical room — you need this. 8 modules covering
              safety protocols, electrical hazard awareness, LOTO basics, environmental controls, and emergency response.
              Free with a site account. Includes a completion certificate.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col gap-2 min-w-[180px]">
            <Link
              href="/login"
              className="block w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg text-sm text-center transition-colors"
            >
              Start Free →
            </Link>
          </div>
        </div>
      </section>

      {/* ── COURSE EXPLORER ───────────────────────────────────────────── */}
      <section id="courses" className="max-w-6xl mx-auto px-4 py-16 border-b border-gray-800">
        <div className="mb-10">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">All Career Tracks</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-3">Choose your path.</h2>
          <p className="text-gray-400 max-w-2xl">
            Every paid program shares the same 10-module electrical and safety foundation —
            so modules you complete in one track count toward every other. Click any course to see pay scale, job overview, and what&apos;s covered.
          </p>
        </div>

        <div className="space-y-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${cat.color}`}>{cat.label}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {cat.ids.map((id) => {
                  const q = COURSE_QUICK[id];
                  const d = DETAILS[id];
                  if (!q || !d) return null;
                  return (
                    <details key={id} className={`group rounded-xl border ${cat.borderColor} bg-gray-800/50 overflow-hidden`}>
                      <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none hover:bg-gray-800 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`font-mono text-[11px] font-bold uppercase tracking-widest ${cat.color}`}>{q.shortTitle}</span>
                            {q.free && (
                              <span className="px-1.5 py-0.5 bg-emerald-800/60 border border-emerald-600/60 text-emerald-300 text-[10px] font-bold rounded">FREE</span>
                            )}
                          </div>
                          <p className="text-white font-semibold text-sm">{COURSE_QUICK[id].tagline}</p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                            <span className="text-green-400 font-semibold">{d.pay}</span>
                            <span>·</span>
                            <span>{d.duration}</span>
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm flex-shrink-0 mt-1 group-open:rotate-180 transition-transform">▾</span>
                      </summary>

                      {/* Expanded content */}
                      <div className="px-5 pb-5 border-t border-gray-700/60 pt-4 space-y-4">
                        {/* Pay scale */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-lg bg-gray-900/60 p-3">
                            <p className="text-xs text-gray-500 mb-0.5">Entry-Level Pay</p>
                            <p className="text-green-400 font-bold text-lg">{d.pay}</p>
                            <p className="text-gray-600 text-xs">After certification</p>
                          </div>
                          <div className="rounded-lg bg-gray-900/60 p-3">
                            <p className="text-xs text-gray-500 mb-0.5">Senior / Lead Pay</p>
                            <p className="text-blue-400 font-bold text-lg">{d.senior}</p>
                            <p className="text-gray-600 text-xs">3–8 years experience</p>
                          </div>
                        </div>

                        {/* Environment */}
                        <div>
                          <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest">Work Environment</p>
                          <p className="text-gray-300 text-sm">{d.environment}</p>
                        </div>

                        {/* Highlights */}
                        <div>
                          <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">What to Expect</p>
                          <ul className="space-y-1.5">
                            {d.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <span className={`flex-shrink-0 mt-0.5 ${cat.color}`}>✓</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA */}
                        <div className="flex gap-3 pt-1">
                          <Link
                            href="/login"
                            className="flex-1 py-2 px-4 bg-blue-700 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg text-center transition-colors"
                          >
                            {q.free ? 'Start Free →' : `Enroll — ${q.price ?? '$1,499'} →`}
                          </Link>
                          <Link
                            href={`/training/${id}`}
                            className="py-2 px-4 border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white text-sm rounded-lg text-center transition-colors"
                          >
                            Preview →
                          </Link>
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAREER TRAJECTORY ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Career Trajectory</span>
          <h2 className="text-3xl font-bold text-white mt-3">Where this takes you.</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">Across all 28 tracks, the same career ladder applies. The trades vary — the ceiling doesn&apos;t.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: 'Jr. Technician', salary: '$45K–$75K', time: 'After certification', color: 'border-blue-800 bg-blue-900/20', tc: 'text-blue-400' },
            { title: 'Technician / FSE', salary: '$75K–$100K', time: '2–3 years', color: 'border-green-900 bg-green-900/10', tc: 'text-green-400' },
            { title: 'Senior / Lead', salary: '$95K–$130K', time: '5–8 years', color: 'border-yellow-900 bg-yellow-900/10', tc: 'text-yellow-400' },
            { title: 'Management', salary: '$130K+', time: '8–12 years', color: 'border-orange-900 bg-orange-900/10', tc: 'text-orange-400' },
          ].map((item, i) => (
            <div key={i} className={`rounded-lg border p-6 text-center ${item.color}`}>
              <p className={`font-bold text-lg ${item.tc}`}>{item.title}</p>
              <p className="text-white font-semibold text-xl mt-1">{item.salary}</p>
              <p className="text-gray-500 text-xs mt-2">{item.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHARED FOUNDATION ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">The Shared Foundation</span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-6">
              Complete 10 modules once. They count toward every certification.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Every track starts with the same 10 foundation modules — electrical theory, AC/DC circuits,
              reading electrical drawings, NFPA 70E arc flash safety, lockout/tagout (LOTO), and test equipment.
              After that, each track branches into its own specialized curriculum.
            </p>
            <p className="text-gray-300 leading-relaxed font-medium">
              Start with UPS. Add HVAC later. The foundation modules don&apos;t repeat — you build on top of them.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { n: 'Modules 1–6', title: 'Electrical Foundations', sub: "Electricity, circuits, components, AC/DC, Ohm's law, transformers", badge: null },
              { n: 'Module 7', title: 'Reading Electrical Drawings', sub: 'Schematics, one-lines, wiring diagrams, IEEE/IEC symbol standards', badge: 'ALL TRACKS' },
              { n: 'Module 8', title: 'NFPA 70E — Arc Flash Safety', sub: 'PPE categories 1–4, approach boundaries, energized work permits', badge: 'FREE CERT' },
              { n: 'Module 9', title: 'Lockout / Tagout (LOTO)', sub: 'OSHA 29 CFR 1910.147, six-step de-energization, group LOTO', badge: 'FREE CERT' },
              { n: 'Module 10', title: 'Meters & Test Equipment', sub: 'DMM, clamp meter, megger — interactive simulation labs', badge: 'LAB' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg bg-gray-800 border border-gray-700 items-start">
                <span className="text-blue-500 font-mono text-xs font-bold flex-shrink-0 mt-0.5 w-24">{item.n}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    {item.badge === 'FREE CERT' && <span className="px-1.5 py-0.5 bg-amber-600/30 border border-amber-600/60 text-amber-300 text-[10px] font-bold rounded">FREE CERT</span>}
                    {item.badge === 'LAB' && <span className="px-1.5 py-0.5 bg-blue-600/30 border border-blue-600/60 text-blue-300 text-[10px] font-bold rounded">LAB</span>}
                    {item.badge === 'ALL TRACKS' && <span className="px-1.5 py-0.5 bg-gray-600/40 border border-gray-500/60 text-gray-300 text-[10px] font-bold rounded">ALL TRACKS</span>}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TRAINING WORKS ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Why It&apos;s Rigorous</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-4">The training is hard. That&apos;s the point.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">The credential means something because it can&apos;t be rushed or gamed.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: '5-Minute Minimum Per Slide', body: 'Each slide has a built-in timer. The section quiz only unlocks after 5 full minutes — enforced server-side.' },
            { step: '02', title: '100% Section Quiz Score', body: 'Every slide has a quiz. You must answer every question correctly before advancing. Retry as needed.' },
            { step: '03', title: '100% Module Test — Once Per Day', body: 'After all slides, take a 10-question test. 100% required. One attempt per day. Fail, and you redo all slides.' },
            { step: '04', title: '3 Days Between Modules', body: 'After passing a module, you wait 3 days before the next unlocks. Complete all modules in as little as 3 months.' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-lg bg-gray-800 border border-gray-700">
              <span className="text-blue-600 text-xs font-bold font-mono">{item.step}</span>
              <h3 className="text-white font-semibold mt-2 mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────── */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Pricing</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-4">Simple pricing. One career-changing investment.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Train from scratch with the full course, or test out if you already work in the field. Same credential either way.
          </p>
        </div>

        <div className="rounded-xl border-2 border-blue-600 bg-blue-950/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-block px-2.5 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full mb-3">MOST POPULAR</div>
              <h3 className="text-2xl font-bold text-white mb-1">Full Training Course</h3>
              <p className="text-4xl font-bold text-white mb-1">$1,499</p>
              <p className="text-blue-300 text-sm mb-5">Certification exam included at completion — no extra charge</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  'Full track curriculum — 20–34 modules',
                  '5-minute enforced slide timers',
                  '100% required on every quiz and test',
                  '3-day minimum between modules',
                  'NFPA 70E certificate — free at Module 8',
                  'LOTO certificate — free at Module 9',
                  'Practice exam unlocked after all modules',
                  'Jr. Certification exam included — no extra charge',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-blue-400 flex-shrink-0 mt-0.5">✓</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-3 min-w-[200px]">
              <PurchaseButton
                productId="training_course"
                label="Enroll — $1,499"
                className="block w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-lg text-center transition-colors"
              />
              <Link
                href="/login"
                className="block w-full py-2 px-6 border border-blue-700 hover:border-blue-500 text-blue-300 hover:text-white rounded-lg text-center text-sm transition-colors"
              >
                Create free account first
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-amber-800/60 bg-amber-950/10 p-6">
            <h4 className="text-white font-bold text-lg mb-1">Jr. Test-Out — For experienced techs</h4>
            <p className="text-3xl font-bold text-white mb-2">$299</p>
            <p className="text-gray-400 text-sm mb-4">Live proctor. One attempt only — fail and the training course is required before retrying.</p>
            <PurchaseButton
              productId="jr_fse_test_human"
              label="Buy Test-Out — $299"
              className="block w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
            />
          </div>
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
            <h4 className="text-white font-bold text-lg mb-1">FSE Exam — Advanced certification</h4>
            <p className="text-3xl font-bold text-white mb-2">$649</p>
            <p className="text-gray-400 text-sm mb-4">The advanced FSE certification for engineers with field experience. Live proctor required.</p>
            <PurchaseButton
              productId="fse_proctored_exam"
              label="Buy FSE Exam — $649"
              className="block w-full py-2.5 px-4 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
            />
          </div>
        </div>

        <div className="rounded-xl border border-amber-900/40 bg-amber-950/10 p-6 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-1">Add the Book — Signed Copy</h4>
            <p className="text-2xl font-bold text-white mb-2">$69.99</p>
            <p className="text-gray-400 text-sm"><em>Mastering Uninterruptible Power Supplies</em> — personally signed by Francis Aiello. Ships to US addresses.</p>
          </div>
          <div className="flex-shrink-0">
            <PurchaseButton
              productId="signed_book"
              label="Buy Signed Book — $69.99"
              className="block py-2.5 px-5 bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ── EMPLOYER ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">For Employers</span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-6">Train your entire service team.</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Stop paying premium rates for technicians who don&apos;t know your equipment.
              Mastering Field Service trains and certifies your team with 100% test scores required,
              structured progression, and employer-verifiable credentials across every track.
            </p>
            <div className="space-y-3">
              {([
                ['5-Seat Team Pack', '$6,999', 'Save ~$500 vs. individual', 'employer_5pack'],
                ['10-Seat Team Pack', '$12,999', 'Save ~$2,000 vs. individual', 'employer_10pack'],
              ] as const).map(([name, price, saving, id], i) => (
                <div key={i} className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white font-medium text-sm">{name}</p>
                      <p className="text-gray-500 text-xs">{saving}</p>
                    </div>
                    <p className="text-white font-bold">{price}</p>
                  </div>
                  <PurchaseButton
                    productId={id}
                    label={`Buy ${name} — ${price}`}
                    className="block w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 space-y-6">
            <h3 className="text-white font-semibold text-lg">What employers get with Mastering Field Service graduates</h3>
            {[
              { icon: '📋', title: 'Verified credentials', body: 'Every certification is publicly verifiable by certificate number.' },
              { icon: '🏆', title: 'Proven rigor', body: '100% test scores at every stage. If they have the cert, they earned it.' },
              { icon: '🔧', title: 'Field-ready from day one', body: 'Curriculum built from real service scenarios — not textbook theory.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Common questions</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: 'Do I need any experience to start?', a: 'No. The training starts with electrical fundamentals and builds from there. Every track begins with the same 10-module foundation — no prior knowledge required.' },
            { q: 'Can I train in more than one track?', a: 'Yes. Modules 1–10 are shared across every program. Complete them once and they count toward all certifications. After the foundation you branch into whichever specialty tracks you choose — there is no limit.' },
            { q: 'Which track should I start with?', a: 'If you are not sure, start with UPS Field Service Engineering — it is the broadest critical power track and the most transferable foundation. Or take the free Critical Environment Fundamentals course first to get a feel for the material and the platform.' },
            { q: 'What is included in the $1,499 training course?', a: 'Everything: all modules, section quizzes, module tests, the NFPA 70E certificate (Module 8), the LOTO certificate (Module 9), the practice exam, and your Jr. Certification exam at completion. No hidden fees.' },
            { q: 'How long does training take?', a: 'The 3-day minimum between modules is enforced server-side. At that pace a 28-module track takes at least 3 months. Most students finish in 3–6 months. Shorter tracks (16–24 modules) can be completed in 2–4 months.' },
            { q: 'What is the NFPA 70E certificate?', a: 'A standalone, employer-verifiable credential earned by completing Module 8. Covers arc flash hazards, PPE categories 1–4, approach boundaries, and energized work permits. Included free with the training course.' },
            { q: 'What is the test-out option?', a: 'If you already work in the field and know the material, you can skip training and attempt the certification exam directly for $299. Live proctor. One attempt — fail and the full training course is required before retrying.' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-700 rounded-lg p-6 bg-gray-800/40">
              <p className="text-white font-semibold mb-3">{item.q}</p>
              <p className="text-gray-400 leading-relaxed text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          28 career tracks. One decision.{' '}
          <span className="text-blue-400">Start your free account.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Create your account, take the free Critical Environment Fundamentals course, and explore every track.
          Enroll when you&apos;re ready. Your career in the trades starts here.
        </p>
        <Link
          href="/login"
          className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xl rounded-lg transition-colors"
        >
          Create Free Account
        </Link>
        <p className="text-gray-600 text-sm mt-4">No credit card to sign up. Google account only.</p>
      </section>

    </div>
  );
}
