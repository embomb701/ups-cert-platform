import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UPS Field Service Certification & Training',
};

const whyMatters = [
  {
    title: 'Critical Infrastructure Depends on It',
    body: 'Data centers, hospitals, financial networks, AI infrastructure, and industrial facilities run on reliable power. When a UPS fails or a transfer goes wrong, the consequences are real.',
    icon: (
      <path d="M12 2 4 7v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-5z" />
    ),
  },
  {
    title: 'The Industry Needs Qualified People',
    body: 'Hyperscale computing and AI are driving unprecedented demand for critical power systems. The field needs people who understand UPS systems well enough to learn quickly, work safely, and grow.',
    icon: <path d="M3 21V10l9-7 9 7v11h-6v-7H9v7H3z" />,
  },
  {
    title: 'Field Knowledge is Hard to Find',
    body: 'Most UPS training is OEM-specific, employer-specific, or locked behind years on the job. There is no independent benchmark for foundational UPS field service knowledge. This platform changes that.',
    icon: <path d="M12 3v18M5 8l7-5 7 5M5 8v8l7 5 7-5V8" />,
  },
];

const tiers = [
  {
    level: '01',
    badgeClass: 'badge-jr',
    badge: 'Entry Level',
    name: 'Jr. FSE Exam',
    price: '$200',
    accent: 'text-arc-300',
    href: '/certifications/junior',
    cta: 'View Jr. FSE Details',
    border: 'hover:border-arc-500/40',
    features: [
      'Browser-based online exam',
      '50 randomized questions',
      'Timed — 90 seconds per question',
      'Anti-cheat deterrents & audit logging',
      'One attempt per 90 days',
      'Verifiable digital certificate',
    ],
  },
  {
    level: '02',
    badgeClass: 'badge-ai',
    badge: 'AI Proctored',
    name: 'FSE AI Exam',
    price: '$349',
    accent: 'text-fuchsia-300',
    href: '/certifications/ai-proctored',
    cta: 'View FSE AI Details',
    border: 'hover:border-fuchsia-500/40',
    featured: true,
    features: [
      'AI webcam face & eye tracking',
      '50 randomized questions',
      'Timed — 90 seconds per question',
      'No scheduling — start anytime',
      'Browser lockdown + AI monitoring',
      'Verifiable digital certificate',
    ],
  },
  {
    level: '03',
    badgeClass: 'badge-fse',
    badge: 'Human Proctored',
    name: 'FSE Exam',
    price: '$500',
    accent: 'text-voltage-300',
    href: '/certifications/proctored',
    cta: 'View FSE Details',
    border: 'hover:border-voltage-500/40',
    features: [
      'Proctored live by an organization rep',
      '50 randomized questions',
      'More difficult — scenario-based',
      'Scheduling required',
      'Strongest exam integrity',
      'Verifiable digital certificate',
    ],
  },
];

const bookTopics = [
  'UPS topologies and operating principles',
  'Batteries, rectifiers, inverters, static switches',
  'STS, PDU, RPP systems',
  'Safe meter use, measurement concepts',
  'Troubleshooting logic and escalation judgment',
  'Field documentation and customer communication',
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voltage-500/60 to-transparent" />
        <div className="container-site section-pad">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kicker mx-auto mb-6 justify-center">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-voltage-400" />
              Independent · Knowledge-Based · Verifiable
            </p>
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Power Your Career in{' '}
              <span className="text-voltage-gradient">UPS Field Service</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              A practical book, a tiered certification path, and training built for people who want to
              understand, service, and support Uninterruptible Power Supply systems in the real world.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/certifications/junior" className="btn-voltage btn-lg">
                Get Certified
              </Link>
              <Link href="/book" className="btn-outline btn-lg">
                Read the Book
              </Link>
              <Link href="/verify" className="btn-ghost btn-lg">
                Verify a Certificate
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
              {[
                ['3', 'Certification levels'],
                ['50', 'Questions per exam'],
                ['20+', 'Years of field experience'],
                ['100%', 'Server-scored & verifiable'],
              ].map(([stat, label]) => (
                <div key={label} className="bg-carbon-900/60 px-4 py-5">
                  <p className="font-display text-2xl font-bold text-voltage-400">{stat}</p>
                  <p className="mt-1 text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="section-pad">
        <div className="container-site">
          <div className="mb-12 text-center">
            <p className="kicker mb-3 justify-center">Why It Matters</p>
            <h2 className="text-3xl font-bold text-white">Critical Power Runs the Modern World</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {whyMatters.map((item) => (
              <div key={item.title} className="card-interactive p-7">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-voltage-500/30 bg-voltage-500/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book */}
      <section className="border-y border-white/10 bg-carbon-900/40 section-pad">
        <div className="container-site">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
            <div>
              <p className="kicker mb-3">The Book</p>
              <h2 className="mb-4 text-3xl font-bold text-white">
                Mastering Uninterruptible Power Supplies, Field Service Engineering
              </h2>
              <p className="mb-6 leading-relaxed text-gray-400">
                Written for people entering or advancing in UPS field service. Not theory-only classroom
                material — a practical guide built around what you actually encounter in the field.
              </p>
              <ul className="mb-8 space-y-2.5">
                {bookTopics.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/book" className="btn-voltage">
                Learn More About the Book
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 -z-10 bg-carbon-radial blur-xl" />
                <Image
                  src="/book-cover.jpg"
                  alt="Mastering Uninterruptible Power Supplies — Field Service Engineering"
                  width={320}
                  height={415}
                  className="rounded-xl border border-white/10 shadow-panel"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification ladder */}
      <section className="section-pad">
        <div className="container-site">
          <div className="mb-12 text-center">
            <p className="kicker mb-3 justify-center">The Path</p>
            <h2 className="text-3xl font-bold text-white">Three Levels. One Career Ladder.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Choose the certification that fits your level and preferred exam format — from entry-level
              to advanced, with AI or human proctoring.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`card-dark flex flex-col p-7 transition-all duration-200 hover:-translate-y-1 ${tier.border} ${
                  tier.featured ? 'ring-1 ring-fuchsia-500/30' : ''
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className={tier.badgeClass}>{tier.badge}</span>
                  <span className="font-display text-3xl font-bold text-white/10">{tier.level}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className={`mb-5 mt-1 font-display text-4xl font-bold ${tier.accent}`}>{tier.price}</p>
                <ul className="mb-7 space-y-2.5 text-sm text-gray-400">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-voltage-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`mt-auto block w-full rounded-xl border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/5 ${tier.border}`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/certifications/compare" className="text-sm font-medium text-voltage-400 hover:text-voltage-300">
              Compare all three certifications side-by-side &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Employer value */}
      <section className="border-y border-white/10 bg-carbon-900/40 section-pad">
        <div className="container-site mx-auto max-w-4xl text-center">
          <p className="kicker mb-3 justify-center">For Employers</p>
          <h2 className="mb-4 text-3xl font-bold text-white">A Knowledge Benchmark You Can Trust</h2>
          <p className="mb-7 leading-relaxed text-gray-400">
            Employers hiring for UPS field service roles need a way to distinguish candidates who have
            genuinely studied the fundamentals from those who have not. These certifications provide a
            knowledge benchmark backed by a serious, controlled exam process.
          </p>
          <Link href="/employers" className="btn-outline">
            Employer Resources &rarr;
          </Link>
        </div>
      </section>

      {/* Training coming soon */}
      <section className="section-pad">
        <div className="container-site mx-auto max-w-2xl text-center">
          <span className="badge-jr mb-4">Coming Soon</span>
          <h2 className="mb-3 text-2xl font-bold text-white">Online UPS Field Service Training</h2>
          <p className="mb-6 text-gray-400">
            Structured video and text modules covering UPS fundamentals, electrical theory, meter use,
            batteries, troubleshooting, startup, commissioning, and exam preparation are in development.
          </p>
          <Link href="/training" className="text-sm font-medium text-voltage-400 hover:text-voltage-300">
            Learn more about upcoming training &rarr;
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="border-y border-white/10 bg-carbon-900/40 section-pad">
        <div className="container-site mx-auto max-w-3xl">
          <p className="kicker mb-3 justify-center text-center">The Program</p>
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Built on Real Field Leadership</h2>
          <p className="mb-4 leading-relaxed text-gray-400">
            This platform is built on over two decades of hands-on UPS and critical power field service
            experience — from field service associate work through engineering, supervision, management,
            and director and vice president-level field service leadership.
          </p>
          <p className="mb-6 leading-relaxed text-gray-400">
            The certification exams are based directly on the book{' '}
            <em className="text-gray-300">Mastering Uninterruptible Power Supplies, Field Service Engineering</em>,
            written to give serious candidates the foundation they need before entering or advancing in this field.
          </p>
          <div className="text-center">
            <Link href="/about" className="text-sm font-medium text-voltage-400 hover:text-voltage-300">
              Read the full about page &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-pad">
        <div className="container-site">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-voltage-500/20 bg-carbon-850 p-10 text-center sm:p-14">
            <div className="absolute inset-0 -z-10 bg-carbon-radial" />
            <h2 className="mb-4 text-3xl font-bold text-white">Ready to Get Started?</h2>
            <p className="mx-auto mb-8 max-w-xl text-gray-400">
              Study the book. Pass the exam. Earn a credential that signals you took the time to learn
              the field.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book" className="btn-voltage btn-lg">
                Buy the Book
              </Link>
              <Link href="/certifications/junior" className="btn-outline btn-lg">
                Jr. FSE Exam — $200
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
