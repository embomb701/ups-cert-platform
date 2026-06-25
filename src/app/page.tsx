import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FSE Academy — UPS Field Service Engineering Career Training',
  description: 'Start a $55K–$100K career in critical power systems in 6 months. No college degree required. Industry-recognized Jr. FSE certification included.',
};

export default function HomePage() {
  return (
    <div className="bg-gray-900 text-white">

      {/* ── HERO ──────────────────────────────────────────────────── */}
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
              Uninterruptible Power Supplies. There aren&apos;t enough qualified engineers to keep them running.
              FSE Academy trains you to fill that gap — with a structured 6-month program built by a
              working UPS engineer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-lg transition-colors text-center"
              >
                Start Your Free Account
              </Link>
              <Link
                href="#paths"
                className="px-8 py-4 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold rounded-lg text-lg transition-colors text-center"
              >
                See Training Options
              </Link>
            </div>
            <p className="text-gray-600 text-sm mt-4">Free to create an account. Enroll in training when you&apos;re ready.</p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: '80,000+', label: 'Technicians retiring this decade' },
              { stat: '6 months', label: 'To your first job in the field' },
              { stat: '$1,499', label: 'Total program cost' },
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

      {/* ── THE CRISIS ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">The Problem</span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-6">
              The industry is running out of qualified people to keep the lights on.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Every hospital emergency room, every data center storing your bank account,
              every cell tower keeping your phone connected — they all depend on UPS systems
              to survive power outages. These systems fail without skilled engineers to service them.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              The workforce is aging out faster than it&apos;s being replaced. Young people are being told
              they need a four-year degree to start a career, racking up $80,000 or more in debt —
              while this industry sits with open positions it cannot fill.
            </p>
            <p className="text-gray-300 leading-relaxed font-medium">
              That&apos;s where FSE Academy comes in. We built a direct path — no debt, no four-year wait —
              to a real career in critical power systems.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: '🏥', title: 'Healthcare', body: 'ICUs, operating rooms, and life support systems run on UPS 24/7. A power failure without backup is a catastrophe.' },
              { icon: '🖥️', title: 'Data Centers', body: 'AI, cloud computing, and every major website requires continuous power. A single UPS failure costs millions per hour.' },
              { icon: '🏦', title: 'Financial Systems', body: 'Trading floors and banking systems require zero-interruption power. Service engineers are on call around the clock.' },
              { icon: '📡', title: 'Telecom & Military', body: 'Emergency communications and defense systems depend on power reliability. The need for qualified engineers never stops.' },
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

      {/* ── TWO PATHS ─────────────────────────────────────────────── */}
      <section id="paths" className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Choose Your Path</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-4">
            Train for the career, or test out if you&apos;re already in the field.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you&apos;re starting from zero or you already work in the industry,
            there&apos;s a direct path to your Jr. FSE certification.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Path A */}
          <div className="rounded-xl border-2 border-blue-700 bg-blue-950/20 p-8 relative">
            <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">MOST POPULAR</div>
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-white mb-2">6-Month Training Course</h3>
            <p className="text-3xl font-bold text-white mb-1">$1,499</p>
            <p className="text-gray-400 text-sm mb-6">Jr. FSE Exam included at completion</p>
            <p className="text-gray-300 leading-relaxed mb-6">
              The complete structured program. 24 modules covering electricity fundamentals through
              advanced UPS systems, battery maintenance, troubleshooting, and professional conduct.
              Built to create employable engineers — not just exam takers.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                '24 training modules over 6 months',
                '72 slides with 5-minute minimum reading time',
                '240+ section quiz questions (100% required)',
                '24 module tests requiring 100% to advance',
                'Jr. FSE Certification Exam included',
                'Employer-verifiable credential',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-center transition-colors">
              Start Training Course
            </Link>
          </div>

          {/* Path B */}
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Jr. FSE Test-Out Exam</h3>
            <p className="text-3xl font-bold text-white mb-1">$299</p>
            <p className="text-gray-400 text-sm mb-6">For experienced technicians already in the field</p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Already work with UPS systems? Skip the training and test directly for your Jr. FSE certification.
              You get one attempt. Pass, and you&apos;re certified. If you don&apos;t pass, you&apos;ll need to complete
              the training course before trying again.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Direct path to Jr. FSE certification',
                '50-question timed exam',
                'One attempt — pass or take the training',
                'Best for working technicians with 1+ years experience',
                'Fail: training course unlocks a second attempt',
                'Take it on your own schedule',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-gray-500 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="block w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg text-center transition-colors">
              Take the Test-Out Exam
            </Link>
          </div>
        </div>

        <div className="mt-8 p-5 rounded-lg bg-gray-800/50 border border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            <span className="text-white font-medium">Not sure which path?</span>{' '}
            Create your free account first — you can decide after you explore the portal.
            If you&apos;ve never worked on UPS systems, the training course is the right choice.
          </p>
        </div>
      </section>

      {/* ── HOW TRAINING WORKS ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Why It&apos;s Rigorous</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-4">The training is hard. That&apos;s the point.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The FSE Academy certification means something because it can&apos;t be rushed or gamed.
            Employers know what it took to earn it.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: '5-Minute Minimum Per Slide', body: 'Each slide has a built-in timer. The section quiz only unlocks after 5 full minutes — enforced server-side.' },
            { step: '02', title: '100% Section Quiz Score', body: 'Every slide has a 10-question quiz. You must answer every question correctly before advancing. Retry as needed.' },
            { step: '03', title: '100% Module Test — Once Per Day', body: 'After completing all slides in a module, take a 10-question test. 100% required. One attempt per day. Fail, and you redo all slides.' },
            { step: '04', title: '1 Week Between Modules', body: 'After passing a module test, you must wait one week before the next module. This is a 6-month program — not a weekend cram session.' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-lg bg-gray-800 border border-gray-700">
              <span className="text-blue-600 text-xs font-bold font-mono">{item.step}</span>
              <h3 className="text-white font-semibold mt-2 mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAREER PATH ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Career Trajectory</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-4">Where this takes you.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Field service engineering is a real career with real income growth — no ceiling, no degree required.
          </p>
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
        <p className="text-center text-gray-600 text-xs mt-6">Salaries vary by region, employer, and specialization.</p>
      </section>

      {/* ── COLLEGE VS FSE ACADEMY ────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">The Alternative</span>
          <h2 className="text-3xl font-bold text-white mt-3">$80,000 in debt or $1,499 and a career.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-xl border border-red-900 bg-red-950/20 p-8">
            <h3 className="text-xl font-semibold text-red-400 mb-6">Traditional 4-Year Degree</h3>
            <ul className="space-y-4">
              {[['Cost', '$60,000–$120,000+'], ['Time', '4 years before you earn anything'], ['Debt', '$30,000–$100,000 average student loans'], ['Job guarantee', 'None — compete against thousands of graduates'], ['Field-specific', 'Rarely']].map(([label, value], i) => (
                <li key={i} className="flex justify-between text-sm border-b border-red-900/30 pb-3 last:border-0">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-red-400 font-medium text-right">{value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 border-blue-700 bg-blue-950/20 p-8">
            <h3 className="text-xl font-semibold text-blue-400 mb-6">FSE Academy Training Course</h3>
            <ul className="space-y-4">
              {[['Cost', '$1,499 total'], ['Time', '6 months to job-ready'], ['Debt', '$0 — own it outright'], ['Job placement', 'Niche field, high demand, low competition'], ['Field-specific', '100% — every module is directly employable']].map(([label, value], i) => (
                <li key={i} className="flex justify-between text-sm border-b border-blue-900/30 pb-3 last:border-0">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-blue-400 font-medium text-right">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM OVERVIEW ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Curriculum</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-4">24 modules. 6 months. One career.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { n: '01–06', title: 'Electrical Foundations', topics: 'Electricity, circuits, components, AC/DC, Ohm\'s law, scientific notation' },
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

      {/* ── ABOUT FRANCIS ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">The Instructor</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-6">Built by someone who does this for a living.</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Francis Aiello is a working UPS Field Service Engineer with over 25 years of hands-on experience
            servicing critical power systems at hospitals, data centers, financial institutions, and military
            facilities. He wrote the book — literally. <em>Mastering Uninterruptible Power Supplies</em> is
            the reference manual that FSE Academy is built around.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            This isn&apos;t academic theory. Every module, every quiz question, every test scenario comes from
            real situations you&apos;ll face in the field. The training is rigorous because the job demands it.
          </p>
          <Link href="/about" className="inline-block px-6 py-2.5 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors">
            Read Francis&apos;s Story →
          </Link>
        </div>
      </section>

      {/* ── EMPLOYER SECTION ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">For Employers</span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-6">Train your entire service team.</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Stop paying premium rates to staffing agencies for technicians who don&apos;t know your equipment.
              FSE Academy trains and certifies your team with the same rigor — 100% test scores required,
              structured progression, documented credentials.
            </p>
            <div className="space-y-3 mb-8">
              {[['5-Seat Team Pack', '$6,999', 'Save ~$500 vs. individual'], ['10-Seat Team Pack', '$12,999', 'Save ~$2,000 vs. individual']].map(([name, price, saving], i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-gray-800 border border-gray-700">
                  <div>
                    <p className="text-white font-medium text-sm">{name}</p>
                    <p className="text-gray-500 text-xs">{saving}</p>
                  </div>
                  <p className="text-white font-bold">{price}</p>
                </div>
              ))}
            </div>
            <Link href="/employers" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors">
              View Employer Options
            </Link>
          </div>
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 space-y-6">
            <h3 className="text-white font-semibold text-lg">What employers get with FSE Academy graduates</h3>
            {[
              { icon: '📋', title: 'Verified credentials', body: 'Every certification is publicly verifiable by certificate number.' },
              { icon: '🏆', title: 'Proven rigor', body: '100% test scores at every stage. If they have the cert, they earned it.' },
              { icon: '🔧', title: 'Field-ready from day one', body: 'The curriculum is built from real service scenarios — not textbook theory.' },
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

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-20 border-b border-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Common questions</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: 'Do I need any experience to start?', a: 'No. The training course starts with electrical fundamentals and builds from there. If you can follow structured instructions and study consistently, you can complete this program.' },
            { q: 'What happens if I fail the test-out exam?', a: 'If you purchase the $299 test-out and don\'t pass, you must complete the 6-month training course before you can attempt the exam again. The test-out is for people already working in the field.' },
            { q: 'Why does the training take 6 months? Can I go faster?', a: 'The 1-week minimum between modules is intentional and enforced server-side. Real retention requires spacing. Employers know what it took to earn this credential because the timeline is verifiable.' },
            { q: 'Is the Jr. FSE exam included in the training course?', a: 'Yes. Completing all 24 modules automatically unlocks your Jr. FSE certification exam at no additional cost. The $1,499 covers everything.' },
            { q: 'Will employers actually recognize this certification?', a: 'The certification is built on published content, verifiable credentials, and demonstrably rigorous standards. The niche field of critical power is small — reputation travels fast.' },
            { q: 'What is the FSE Human Proctored exam?', a: 'The advanced FSE certification for experienced professionals. It\'s a live, human-proctored exam by appointment. Separate track from Jr. FSE, costs $649.' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-700 rounded-lg p-6 bg-gray-800/40">
              <p className="text-white font-semibold mb-3">{item.q}</p>
              <p className="text-gray-400 leading-relaxed text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          The industry needs you.{' '}
          <span className="text-blue-400">Start your free account today.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Create your account now. Explore the training portal. Decide between the full 6-month
          course or the test-out exam. Your next career starts here.
        </p>
        <Link href="/login" className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xl rounded-lg transition-colors">
          Create Free Account
        </Link>
        <p className="text-gray-600 text-sm mt-4">No credit card required to sign up. Google account only.</p>
      </section>

    </div>
  );
}
