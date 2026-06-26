import type { Metadata } from 'next';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';

export const metadata: Metadata = {
  title: 'FSE Academy — UPS Field Service Engineering Career Training',
  description:
    'Start a $55K–$100K career in critical power systems in 6 months. No college required. Jr. FSE and FSE certification programs by Francis Aiello.',
};

export default function HomePage() {
  return (
    <div className="bg-gray-900 text-white">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-gray-900 to-gray-900 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-900/40 border border-blue-700/60 rounded-full text-blue-300 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Industry facing critical technician shortage
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Start a <span className="text-blue-400">$55K–$100K</span> career in 6 months.{' '}
              <span className="text-gray-300">No college. No debt.</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl">
              Hospitals, data centers, military installations, and financial networks run 24/7 on
              Uninterruptible Power Supplies. There aren&apos;t enough qualified engineers to keep them
              running. FSE Academy trains you to fill that gap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-lg transition-colors text-center"
              >
                Create Free Account
              </Link>
              <Link
                href="#pricing"
                className="px-8 py-4 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold rounded-lg text-lg transition-colors text-center"
              >
                See All Options
              </Link>
            </div>
            <p className="text-gray-600 text-sm mt-4">Free to create an account. Enroll when you&apos;re ready.</p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: '80,000+', label: 'Technicians retiring this decade' },
              { stat: '6 months', label: 'To your first job in the field' },
              { stat: '$1,499', label: 'Total training program cost' },
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

      {/* ── THE CRISIS ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">The Problem</span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-6">
              The industry is running out of people to keep the lights on.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Every hospital emergency room, every data center, every cell tower depends on UPS systems
              to survive power outages. These systems fail without skilled engineers to service them.
              The workforce is aging out faster than it&apos;s being replaced.
            </p>
            <p className="text-gray-300 leading-relaxed font-medium">
              FSE Academy builds a direct path — no debt, no four-year wait — to a real career in
              critical power systems.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: '🏥', title: 'Healthcare', body: 'ICUs, operating rooms, and life support run on UPS 24/7. A power failure without backup is catastrophic.' },
              { icon: '🖥️', title: 'Data Centers', body: 'AI, cloud computing, and every major website requires continuous power. UPS failure costs millions per hour.' },
              { icon: '🏦', title: 'Financial Systems', body: 'Trading floors and banking systems require zero-interruption power. Engineers are on call around the clock.' },
              { icon: '📡', title: 'Telecom & Military', body: 'Emergency communications and defense systems depend on power reliability. The need never stops.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg bg-gray-800 border border-gray-700">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mt-1">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING / ALL OPTIONS ─────────────────────────────────────── */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Pricing</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-4">Choose your path</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Train from scratch with the 6-month course, or test out if you already work in the field.
            All paths lead to a verifiable, employer-recognized credential.
          </p>
        </div>

        {/* Main: Training Course */}
        <div className="rounded-xl border-2 border-blue-600 bg-blue-950/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-block px-2.5 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full mb-3">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">6-Month Training Course</h3>
              <p className="text-4xl font-bold text-white mb-1">$1,499</p>
              <p className="text-blue-300 text-sm mb-5">Jr. FSE Certification Exam included at completion</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  '24 modules over 6 months',
                  '72 slides with 5-min timer',
                  '100% required on all quizzes',
                  '100% required on all module tests',
                  '1 week minimum between modules',
                  'Jr. FSE Exam included — no extra charge',
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

        {/* Jr. FSE Test-Outs */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-2">Jr. FSE Test-Out — For experienced technicians</h3>
          <p className="text-gray-500 text-sm mb-5">
            Skip the training. One attempt only — fail and you must complete the training course before retrying.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-purple-800/60 bg-purple-950/10 p-6">
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">AI Proctored</span>
              <h4 className="text-xl font-bold text-white mt-2 mb-1">Jr. FSE Test-Out</h4>
              <p className="text-3xl font-bold text-white mb-3">$199</p>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Browser-based AI anti-cheat. Start immediately after purchase. No scheduling required.
              </p>
              <PurchaseButton
                productId="jr_fse_test_ai"
                label="Buy Test-Out (AI) — $199"
                className="block w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
              />
            </div>
            <div className="rounded-xl border border-amber-800/60 bg-amber-950/10 p-6">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">Human Proctored</span>
              <h4 className="text-xl font-bold text-white mt-2 mb-1">Jr. FSE Test-Out</h4>
              <p className="text-3xl font-bold text-white mb-3">$299</p>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Live proctor session. Higher accountability — stronger credential. Scheduled after purchase.
              </p>
              <PurchaseButton
                productId="jr_fse_test_human"
                label="Buy Test-Out (Human) — $299"
                className="block w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
              />
            </div>
          </div>
        </div>

        {/* FSE Exam */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-5">FSE Certification — Advanced level, human proctored</h3>
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white mb-1">FSE Exam — Human Proctored</h4>
              <p className="text-3xl font-bold text-white mb-3">$649</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                The advanced FSE certification for engineers with field experience. Live proctor required.
                Session scheduled after purchase.
              </p>
            </div>
            <div className="flex-shrink-0">
              <PurchaseButton
                productId="fse_proctored_exam"
                label="Buy FSE Exam — $649"
                className="block py-3 px-6 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-semibold rounded-lg text-center transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Packages */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-2">Packages — Save $49</h3>
          <p className="text-gray-500 text-sm mb-5">Training course bundled with a test-out option.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {([
              { name: 'Training + Jr. FSE AI', price: '$1,649', id: 'pkg_training_jr_ai' },
              { name: 'Training + Jr. FSE Human', price: '$1,749', id: 'pkg_training_jr_human' },
              { name: 'Training + FSE', price: '$2,099', id: 'pkg_training_fse' },
            ] as const).map((pkg, i) => (
              <div key={i} className="rounded-xl border border-blue-900/50 bg-blue-950/10 p-5">
                <h4 className="text-white font-semibold mb-1">{pkg.name}</h4>
                <p className="text-2xl font-bold text-white mb-3">{pkg.price}</p>
                <p className="text-green-400 text-xs font-medium mb-4">Save $49 vs individual</p>
                <PurchaseButton
                  productId={pkg.id}
                  label={`Buy Package — ${pkg.price}`}
                  className="block w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-center text-sm transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Book */}
        <div className="rounded-xl border border-amber-900/40 bg-amber-950/10 p-6 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-1">Add the Book — Signed Copy</h4>
            <p className="text-2xl font-bold text-white mb-2">$69.99</p>
            <p className="text-gray-400 text-sm">
              <em>Mastering Uninterruptible Power Supplies</em> — personally signed by Francis Aiello.
              Ships to US addresses.
            </p>
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

      {/* ── HOW TRAINING WORKS ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Why It&apos;s Rigorous</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-4">The training is hard. That&apos;s the point.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The credential means something because it can&apos;t be rushed or gamed.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: '5-Minute Minimum Per Slide', body: 'Each slide has a built-in timer. The section quiz only unlocks after 5 full minutes — enforced server-side.' },
            { step: '02', title: '100% Section Quiz Score', body: 'Every slide has a 10-question quiz. You must answer every question correctly before advancing. Retry as needed.' },
            { step: '03', title: '100% Module Test — Once Per Day', body: 'After all slides, take a 10-question test. 100% required. One attempt per day. Fail, and you redo all slides.' },
            { step: '04', title: '1 Week Between Modules', body: 'After passing a module test, you wait one week before the next module. This is a 6-month program by design.' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-lg bg-gray-800 border border-gray-700">
              <span className="text-blue-600 text-xs font-bold font-mono">{item.step}</span>
              <h3 className="text-white font-semibold mt-2 mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAREER TRAJECTORY ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Career Trajectory</span>
          <h2 className="text-3xl font-bold text-white mt-3">Where this takes you.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: 'Jr. FSE', salary: '$55K–$65K', time: 'After training', color: 'border-blue-800 bg-blue-900/20', tc: 'text-blue-400' },
            { title: 'FSE', salary: '$75K–$100K', time: '2–3 years', color: 'border-green-900 bg-green-900/10', tc: 'text-green-400' },
            { title: 'Senior FSE', salary: '$95K–$130K', time: '5–8 years', color: 'border-yellow-900 bg-yellow-900/10', tc: 'text-yellow-400' },
            { title: 'Management', salary: '$120K+', time: '8–12 years', color: 'border-orange-900 bg-orange-900/10', tc: 'text-orange-400' },
          ].map((item, i) => (
            <div key={i} className={`rounded-lg border p-6 text-center ${item.color}`}>
              <p className={`font-bold text-lg ${item.tc}`}>{item.title}</p>
              <p className="text-white font-semibold text-xl mt-1">{item.salary}</p>
              <p className="text-gray-500 text-xs mt-2">{item.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CURRICULUM ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Curriculum</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-4">24 modules. 6 months. One career.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { n: '01–06', title: 'Electrical Foundations', topics: "Electricity, circuits, components, AC/DC, Ohm's law, scientific notation" },
            { n: '07–12', title: 'UPS Core Systems', topics: 'UPS overview, PDUs, rectifiers, inverters, transformers, battery types' },
            { n: '13', title: 'Battery Safety', topics: 'PPE, installation, testing, disposal, hazard identification' },
            { n: '14–15', title: 'Power Electronics', topics: 'PWM, duty cycle, digital logic, truth tables, control systems' },
            { n: '16–17', title: 'Control Systems', topics: 'Relay logic, ladder diagrams, AVR, voltage regulation, feedback loops' },
            { n: '18', title: 'Rotating Machines', topics: 'AC/DC motors, generators, synchronization, bearing maintenance' },
            { n: '19–20', title: 'Configurations & Procedures', topics: 'N+1 redundancy, 2N topology, PDU ratings, startup, shutdown, LOTO' },
            { n: '21–22', title: 'Troubleshooting & Repair', topics: 'Systematic diagnosis, fault codes, PM procedures, IGBT replacement' },
            { n: '23–24', title: 'Career & Professionalism', topics: 'Incident response, root cause analysis, customer communication, career development' },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-lg bg-gray-800 border border-gray-700">
              <span className="text-blue-500 text-xs font-mono font-bold">Module {item.n}</span>
              <p className="text-white font-semibold mt-1 mb-2">{item.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{item.topics}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EMPLOYER SECTION ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">For Employers</span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-6">Train your entire service team.</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Stop paying premium staffing rates for technicians who don&apos;t know your equipment.
              FSE Academy trains and certifies your team with the same rigor — 100% test scores required,
              structured progression, employer-verifiable credentials.
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
            <h3 className="text-white font-semibold text-lg">What employers get with FSE Academy graduates</h3>
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
            { q: 'Do I need any experience to start?', a: 'No. The training course starts with electrical fundamentals and builds from there. No prior knowledge required.' },
            { q: 'What happens if I fail the Jr. FSE test-out?', a: 'You must complete the full 6-month training course before you can attempt the exam again. The test-out is for people already working in the field who know the material.' },
            { q: "What's the difference between AI and human proctored test-out?", a: 'AI proctored uses comprehensive browser-based anti-cheat (tab tracking, copy detection, timing analysis). No scheduling — start anytime after purchase. Human proctored adds a live proctor session for higher accountability. Both have one attempt only and the same test content.' },
            { q: 'Why does the training take 6 months?', a: 'The 1-week minimum between modules is enforced server-side. Real retention requires spacing. Employers know what it took because the timeline is verifiable — it cannot be bypassed.' },
            { q: 'Is the Jr. FSE exam included in the training course?', a: 'Yes. Completing all 24 modules automatically unlocks your Jr. FSE certification exam at no additional cost. The $1,499 covers everything.' },
            { q: 'What is the FSE exam?', a: "The advanced certification for experienced engineers. Human proctored, live session, $649. Separate from Jr. FSE — you don't need Jr. FSE first, though the training course prepares you well for it." },
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
          The industry needs you.{' '}
          <span className="text-blue-400">Start your free account.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Create your account and explore the training portal. Decide on your path —
          training course, test-out, or both. Your career in critical power starts here.
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
