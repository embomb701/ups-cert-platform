import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UPS Field Service Certification & Training',
};

const whyMatters = [
  {
    title: 'Critical Infrastructure Depends on It',
    body: 'Data centers, hospitals, financial networks, AI infrastructure, and industrial facilities run on reliable power. When a UPS fails or a transfer goes wrong, the consequences are real.',
  },
  {
    title: 'The Industry Needs Qualified People',
    body: 'Hyperscale computing and AI are driving unprecedented demand for critical power systems. The field needs people who understand UPS systems well enough to learn quickly, work safely, and grow into reliable technicians.',
  },
  {
    title: 'Field Knowledge is Hard to Find',
    body: 'Most UPS training is OEM-specific, employer-specific, or locked behind years of on-the-job experience. There is no independent benchmark for foundational UPS field service knowledge. This platform is built to change that.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Master UPS Field Service Engineering from{' '}
            <span className="text-indigo-400">Real Field Experience</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 max-w-3xl mx-auto">
            A practical book, certification path, and training platform for people who want to
            understand, service, and support Uninterruptible Power Supply systems in the real world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors">
              Buy the Book
            </Link>
            <Link href="/certifications/junior" className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold border border-gray-700 transition-colors">
              Take the Jr. FSE Exam
            </Link>
            <Link href="/certifications/proctored" className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold border border-gray-700 transition-colors">
              View the Proctored FSE Exam
            </Link>
            <Link href="/verify" className="px-6 py-3 rounded-lg bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold transition-colors">
              Verify a Certificate
            </Link>
          </div>
        </div>
      </section>

      {/* Why UPS Field Service Matters */}
      <section className="section-pad">
        <div className="container-site">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Why UPS Field Service Knowledge Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {whyMatters.map((item) => (
              <div key={item.title} className="card-dark p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Overview */}
      <section className="section-pad bg-gray-900">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">The Book</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Mastering Uninterruptible Power Supplies, Field Service Engineering
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Written for people entering or advancing in UPS field service. Not theory-only classroom
                material — this is a practical guide built around what you actually encounter in the field.
              </p>
              <ul className="space-y-2 mb-8">
                {['UPS topologies and operating principles', 'Batteries, rectifiers, inverters, static switches', 'STS, PDU, RPP systems', 'Safe meter use, measurement concepts', 'Troubleshooting logic and escalation judgment', 'Field documentation and customer communication'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-indigo-400 mt-0.5">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/book" className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors">
                Learn More About the Book
              </Link>
            </div>
            <div className="card-dark p-8 flex flex-col items-center text-center">
              <div className="w-24 h-32 bg-indigo-900 rounded-lg border border-indigo-700 mb-4 flex items-center justify-center">
                <span className="text-indigo-300 text-xs font-mono">BOOK</span>
              </div>
              <p className="text-sm font-semibold text-white">Mastering Uninterruptible Power Supplies</p>
              <p className="text-xs text-gray-500 mt-1">Field Service Engineering</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Overview */}
      <section className="section-pad">
        <div className="container-site">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Two Certification Levels
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            The Junior UPS Field Service Certification validates foundational knowledge. The UPS Field Service
            Certification is a more advanced, proctored credential for deeper technical understanding.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Jr FSE */}
            <div className="card-dark p-8">
              <span className="badge-jr mb-4 block w-fit">Entry Level</span>
              <h3 className="text-xl font-bold text-white mb-2">Jr. FSE Exam</h3>
              <p className="text-3xl font-bold text-indigo-400 mb-4">$200</p>
              <ul className="space-y-2 text-sm text-gray-400 mb-8">
                <li>&#x2022; Browser-based online exam</li>
                <li>&#x2022; 50 randomized questions</li>
                <li>&#x2022; Timed — 90 seconds per question</li>
                <li>&#x2022; Anti-cheat deterrents &amp; audit logging</li>
                <li>&#x2022; One attempt per 90 days</li>
                <li>&#x2022; PDF certificate if passed</li>
                <li>&#x2022; Public verification link</li>
              </ul>
              <Link href="/certifications/junior" className="block w-full text-center px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors">
                View Jr. FSE Exam Details
              </Link>
            </div>

            {/* FSE */}
            <div className="card-dark p-8 border-amber-900/50">
              <span className="badge-fse mb-4 block w-fit">Advanced / Proctored</span>
              <h3 className="text-xl font-bold text-white mb-2">FSE Exam</h3>
              <p className="text-3xl font-bold text-amber-400 mb-4">$500</p>
              <ul className="space-y-2 text-sm text-gray-400 mb-8">
                <li>&#x2022; Proctored live by approved organization representative</li>
                <li>&#x2022; 50 randomized questions</li>
                <li>&#x2022; More difficult — scenario-based</li>
                <li>&#x2022; Scheduling required</li>
                <li>&#x2022; Stronger exam integrity</li>
                <li>&#x2022; PDF certificate if passed</li>
                <li>&#x2022; Public verification link</li>
              </ul>
              <Link href="/certifications/proctored" className="block w-full text-center px-5 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-medium text-sm transition-colors">
                View FSE Exam Details
              </Link>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link href="/certifications/compare" className="text-sm text-indigo-400 hover:text-indigo-300">
              Compare both certifications side-by-side &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Employer Value */}
      <section className="section-pad bg-gray-900">
        <div className="container-site max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Why Employers Value These Certifications
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Employers hiring for UPS field service roles need a way to distinguish candidates who have
            genuinely studied the fundamentals from those who have not. These certifications provide a
            knowledge benchmark backed by a serious, controlled exam process.
          </p>
          <Link href="/employers" className="inline-flex px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-medium text-sm transition-colors">
            Employer Resources &rarr;
          </Link>
        </div>
      </section>

      {/* Training Coming Soon */}
      <section className="section-pad">
        <div className="container-site text-center max-w-2xl mx-auto">
          <span className="badge-jr mb-4 inline-block">Coming Soon</span>
          <h2 className="text-2xl font-bold text-white mb-3">Online UPS Field Service Training</h2>
          <p className="text-gray-400 mb-6">
            Structured video and text modules covering UPS fundamentals, electrical theory, meter use,
            batteries, troubleshooting, startup, commissioning, and exam preparation are in development.
          </p>
          <Link href="/training" className="text-sm text-indigo-400 hover:text-indigo-300">
            Learn more about upcoming training &rarr;
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="section-pad bg-gray-900">
        <div className="container-site max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">About the Program</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            This platform is built on over two decades of hands-on UPS and critical power field service
            experience — from field service associate work through engineering, supervision, management,
            and director and vice president-level field service leadership.
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            The certification exams are based directly on the book{' '}
            <em>Mastering Uninterruptible Power Supplies, Field Service Engineering</em>, written to
            give serious candidates the foundation they need before entering or advancing in this field.
          </p>
          <div className="text-center">
            <Link href="/about" className="text-sm text-indigo-400 hover:text-indigo-300">
              Read the full about page &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-site text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8">
            Study the book. Pass the exam. Earn a credential that signals you took the time to learn the field.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors">
              Buy the Book
            </Link>
            <Link href="/certifications/junior" className="px-6 py-3 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold transition-colors">
              Jr. FSE Exam — $200
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
