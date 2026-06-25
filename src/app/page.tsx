import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UPS Field Service Engineering Academy — Start a Career in 6 Months',
};

const stats = [
  { value: '$55–100k', label: 'Starting salary range', sub: 'Jr. FSE to experienced FSE' },
  { value: '6 months', label: 'Time to job-ready', sub: 'With focused study and certification' },
  { value: '$0', label: 'College debt required', sub: 'No degree needed to get started' },
  { value: '25+ years', label: 'Built from real experience', sub: 'Every role, every level' },
];

const whyItMatters = [
  {
    icon: '🏥',
    title: 'Hospitals',
    body: 'UPS systems protect life-critical equipment — ventilators, surgical suites, patient monitoring. When the grid fails, the UPS cannot.',
  },
  {
    icon: '🖥️',
    title: 'Data Centers & AI Infrastructure',
    body: 'Every major AI company, cloud provider, and financial system runs on critical power. Hyperscale expansion is creating more FSE jobs than the industry can fill.',
  },
  {
    icon: '🏭',
    title: 'Industrial & Government',
    body: 'Manufacturing facilities, military installations, and government data centers all depend on continuous power — and skilled people to maintain it.',
  },
];

const careerPath = [
  { role: 'Jr. FSE', salary: '$55–65k', time: 'Month 1–6', desc: 'Entry-level field technician. Supervised work on UPS systems. Begin with Jr. FSE certification.' },
  { role: 'FSE', salary: '$75–100k', time: 'Year 1–3', desc: 'Unsupervised field service. Handle commissioning, troubleshooting, and maintenance independently.' },
  { role: 'Sr. FSE / Lead', salary: '$95–130k', time: 'Year 3–7', desc: 'Lead technician or regional specialist. Handle complex systems, mentor junior staff.' },
  { role: 'Management', salary: '$120k+', time: 'Year 5+', desc: 'Field Service Manager, Director, or VP. Oversee teams, accounts, and regional operations.' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
        <div className="container-site max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">
                An industry in crisis. An opportunity wide open.
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Start a High-Paying Career in Critical Power —
                <span className="text-indigo-400"> Without a Four-Year Degree.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                The UPS field service industry is <strong className="text-white">desperately short of qualified people</strong>.
                Data centers are multiplying. AI infrastructure is exploding. Hospitals can't go dark.
                And the companies that keep all of it running cannot find enough trained technicians to hire.
              </p>
              <p className="text-base text-gray-400 leading-relaxed mb-8">
                FSE Academy gives motivated young men and women a structured, affordable path into a career
                that pays $55,000–$100,000+ — in as little as six months — without the cost or time of a traditional degree.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/training" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
                  Start Training →
                </Link>
                <Link href="/certifications/junior" className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold text-sm transition-colors">
                  Jr. FSE Exam — $199
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.value} className="card-dark p-5">
                  <p className="text-2xl font-mono font-bold text-indigo-400 mb-1">{s.value}</p>
                  <p className="text-xs font-semibold text-white mb-0.5">{s.label}</p>
                  <p className="text-xs text-gray-500">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry crisis */}
      <section className="section-pad bg-gray-900 border-b border-gray-800">
        <div className="container-site max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">The Talent Crisis</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 leading-snug">
                The industry isn't struggling to find applicants.<br />
                It's struggling to find people who actually know anything.
              </h2>
              <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                <p>
                  Hiring managers across the UPS field service industry share the same frustration:
                  candidates show up with minimal electrical knowledge, no understanding of how a UPS actually
                  works, and no way to verify they've studied the field at all.
                </p>
                <p>
                  The result is that companies spend 3–6 months training each new hire from scratch —
                  tying up their best technicians as babysitters instead of letting them do field work.
                  The ones who wash out cost even more.
                </p>
                <p className="text-white font-medium">
                  FSE Academy is the answer to both sides of that problem. Candidates arrive educated,
                  tested, and certified. Employers get a meaningful knowledge signal before they hire.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {whyItMatters.map((item) => (
                <div key={item.title} className="card-dark p-5 flex gap-4">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For young people — college alternative */}
      <section className="section-pad border-b border-gray-800">
        <div className="container-site max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">A Better Path</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why go $100,000 into debt for a degree<br />
              <span className="text-amber-400">when this career doesn't require one?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
              Young men and women are told the only path to a real career is a four-year college degree.
              Nobody tells them about UPS field service — a skilled trade that pays exceptionally well,
              has bulletproof job security, and can be entered without a degree, student loans, or years of waiting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card-dark p-6 border-red-900/40 bg-red-950/10">
              <p className="text-sm font-semibold text-red-400 mb-4">Traditional 4-Year College</p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><span className="text-red-500 shrink-0">✗</span> $40,000–$100,000+ in student debt</li>
                <li className="flex gap-2"><span className="text-red-500 shrink-0">✗</span> 4 years before you earn a dollar</li>
                <li className="flex gap-2"><span className="text-red-500 shrink-0">✗</span> No guarantee of a job after graduation</li>
                <li className="flex gap-2"><span className="text-red-500 shrink-0">✗</span> Debt payments following you for 10–30 years</li>
                <li className="flex gap-2"><span className="text-red-500 shrink-0">✗</span> Degree may not match industry need</li>
              </ul>
            </div>
            <div className="card-dark p-6 border-green-900/40 bg-green-950/10">
              <p className="text-sm font-semibold text-green-400 mb-4">FSE Academy Training Path</p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><span className="text-green-400 shrink-0">✓</span> Training portal access from $149</li>
                <li className="flex gap-2"><span className="text-green-400 shrink-0">✓</span> Job-ready in 6 months with certification</li>
                <li className="flex gap-2"><span className="text-green-400 shrink-0">✓</span> Real, verifiable credential employers recognize</li>
                <li className="flex gap-2"><span className="text-green-400 shrink-0">✓</span> Start earning $55k+ on day one of employment</li>
                <li className="flex gap-2"><span className="text-green-400 shrink-0">✓</span> Built from 25+ years of real field experience</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career path */}
      <section className="section-pad bg-gray-900 border-b border-gray-800">
        <div className="container-site max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">Career Trajectory</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Where this career can take you
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {careerPath.map((step, i) => (
              <div key={step.role} className="card-dark p-5 relative">
                <div className="absolute top-4 right-4 text-xs font-semibold text-gray-600">Step {i + 1}</div>
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wide mb-1">{step.time}</p>
                <p className="text-base font-bold text-white mb-0.5">{step.role}</p>
                <p className="text-lg font-mono font-bold text-green-400 mb-3">{step.salary}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 mt-6">
            Salary ranges are representative of the UPS field service industry. Individual results vary by employer, location, and experience.
          </p>
        </div>
      </section>

      {/* Training Portal */}
      <section className="section-pad border-b border-gray-800">
        <div className="container-site max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">The Training</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
                24 structured modules.<br />Built from the book.
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Every module is based directly on{' '}
                <em>Mastering Uninterruptible Power Supplies, Field Service Engineering</em> — written
                by Francis Aiello from 25+ years of real UPS field service experience, at every level from
                technician to VP of Field Services.
              </p>
              <ul className="space-y-2 mb-8 text-sm">
                {[
                  '24 sequential modules, from electricity basics to field professionalism',
                  'Slide-based lessons with minimum review time enforced',
                  '10-question section quiz before advancing each slide',
                  'Module mastery test — 100% required to complete',
                  'Modules unlock weekly as you progress through the program',
                  'Builds directly toward the Jr. FSE and FSE certification exams',
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-gray-400">
                    <span className="text-indigo-400 shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/training" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors inline-block">
                View All 24 Modules →
              </Link>
            </div>
            <div className="space-y-2">
              {[
                { num: '01', title: 'Introduction to Electricity & Electronics' },
                { num: '02', title: 'Electric Circuits — Series & Parallel' },
                { num: '03', title: 'Electronic Components' },
                { num: '04', title: 'AC & DC Systems' },
                { num: '05', title: 'Ohm\'s Law & Power Formula' },
                { num: '06', title: 'Overview of UPS, PDU & STS Systems' },
                { num: '07', title: 'Rectifiers & Inverters' },
                { num: '08', title: 'Transformers & Circuit Breakers' },
              ].map((m) => (
                <div key={m.num} className="card-dark px-4 py-3 flex gap-3 items-center">
                  <span className="text-xs font-mono text-gray-600 shrink-0 w-6">{m.num}</span>
                  <span className="text-sm text-gray-300">{m.title}</span>
                  {m.num === '01' || m.num === '02' ? (
                    <span className="ml-auto text-xs text-green-400 bg-green-950/40 border border-green-900 px-2 py-0.5 rounded-full shrink-0">Available</span>
                  ) : (
                    <span className="ml-auto text-gray-700 shrink-0 text-xs">🔒</span>
                  )}
                </div>
              ))}
              <p className="text-xs text-gray-600 text-center pt-2">+ 16 more modules</p>
            </div>
          </div>
        </div>
      </section>

      {/* Book */}
      <section className="section-pad bg-gray-900 border-b border-gray-800">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="flex justify-center">
              <Image
                src="/book-cover.jpg"
                alt="Mastering Uninterruptible Power Supplies — Field Service Engineering"
                width={300}
                height={390}
                className="rounded-lg shadow-2xl shadow-blue-950/50"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">The Book</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Mastering Uninterruptible Power Supplies,<br />Field Service Engineering
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4 text-sm">
                Written by Francis Aiello — who has held every position in this industry, from field service
                associate to VP of Field Services — this book gives you the foundation that employers wish
                every candidate walked in with.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                The Jr. FSE and FSE certification exams are based directly on this material.
                The 24 training modules are built from this book chapter by chapter.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="px-5 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-semibold text-sm transition-colors">
                  Buy Signed Copy — $69.99
                </Link>
                <a href="https://a.co/d/046t1AvW" target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold text-sm transition-colors">
                  Buy on Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-pad border-b border-gray-800">
        <div className="container-site max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Certifications</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              A credential employers can verify
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Every certificate is publicly verifiable. Employers can check a candidate's certificate number and confirm it's real.
              These aren't participation trophies — they require genuine study and a controlled exam.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="card-dark p-6 flex flex-col">
              <span className="badge-jr mb-3 w-fit">Jr. FSE</span>
              <p className="font-bold text-white mb-1">Junior FSE Exam</p>
              <p className="text-2xl font-mono font-bold text-indigo-400 mb-3">$199</p>
              <p className="text-xs text-gray-400 flex-1 mb-4">50 questions, AI-proctored, browser-based. Entry-level knowledge credential.</p>
              <Link href="/certifications/junior" className="block text-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">View Details</Link>
            </div>
            <div className="card-dark p-6 flex flex-col border-purple-900/50">
              <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-950/50 border border-purple-800/50 px-2 py-0.5 rounded mb-3 w-fit">FSE AI</span>
              <p className="font-bold text-white mb-1">FSE AI Proctored</p>
              <p className="text-2xl font-mono font-bold text-purple-400 mb-3">$349</p>
              <p className="text-xs text-gray-400 flex-1 mb-4">50 questions, AI webcam monitoring. Advanced level, no scheduling needed.</p>
              <Link href="/certifications/ai-proctored" className="block text-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors">View Details</Link>
            </div>
            <div className="card-dark p-6 flex flex-col border-amber-900/50">
              <span className="badge-fse mb-3 w-fit">FSE</span>
              <p className="font-bold text-white mb-1">FSE Human Proctored</p>
              <p className="text-2xl font-mono font-bold text-amber-400 mb-3">$649</p>
              <p className="text-xs text-gray-400 flex-1 mb-4">Live proctor, identity confirmed. Strongest credential, scheduling required.</p>
              <Link href="/certifications/proctored" className="block text-center px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium transition-colors">View Details</Link>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link href="/certifications/compare" className="text-sm text-indigo-400 hover:text-indigo-300">
              Compare all certifications side-by-side →
            </Link>
          </div>
        </div>
      </section>

      {/* For employers */}
      <section className="section-pad bg-gray-900 border-b border-gray-800">
        <div className="container-site max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">For Employers</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Stop training from zero. Hire people who already studied.
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6 text-sm max-w-2xl mx-auto">
            Employer team packages let you buy blocks of complete FSE certification bundles for your candidates —
            Training Portal, proctored exam, and a signed copy of the book — shipped directly to each person.
            5-seat and 10-seat packs available at significant per-seat savings.
          </p>
          <Link href="/employers" className="inline-block px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold text-sm transition-colors">
            View Employer Packages →
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="section-pad border-b border-gray-800">
        <div className="container-site max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Built by someone who lived it</h2>
          <p className="text-gray-400 leading-relaxed mb-4 text-sm">
            FSE Academy is built by Francis Aiello of FA Consulting and Recruiting — who spent 25+ years in the
            UPS and critical power field service industry, holding every position from field service associate
            through VP of Field Services. He's seen the talent gap from every angle: as the technician,
            as the manager, and as the person doing the hiring.
          </p>
          <p className="text-gray-400 leading-relaxed mb-6 text-sm">
            The goal is simple: help the industry find the qualified candidates it desperately needs,
            while giving motivated young people a real path into a real career — without debt, without waiting.
          </p>
          <Link href="/about" className="text-sm text-indigo-400 hover:text-indigo-300">
            Read the full story →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-pad">
        <div className="container-site text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to start?
          </h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Get the Training Portal, study the modules, pass the certification exam.
            Six months from now you could be employed in a career that pays well and lasts a lifetime.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/training" className="px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors">
              Start Training — $149
            </Link>
            <Link href="/certifications/junior" className="px-6 py-3 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold transition-colors text-sm">
              Just the Exam — $199
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
