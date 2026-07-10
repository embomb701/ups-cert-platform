import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Employer Solutions — Mastering Field Service',
  description:
    'Stop absorbing training costs internally. Mastering Field Service certifies your candidates and new hires before they cost you a day of trainer time.',
};

export default function EmployersPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">For Employers</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Your next FSE already exists.<br />
            <span className="text-indigo-400">They just haven't been trained yet.</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mb-8">
            The UPS field service industry has a talent problem — not a people problem.
            There are motivated individuals who want this career. What's missing is a
            cost-effective, standardized way to get them ready before they walk through your door.
            That's exactly what Mastering Field Service does.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#packages" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
              View Team Packages →
            </a>
            <Link href="/contact" className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm transition-colors">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-16 border-b border-gray-800">
        <div className="container-site max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">The real cost of in-house training</h2>
              <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>
                  Every company in this industry runs the same playbook: hire someone with
                  little-to-no UPS knowledge, assign your best FSE as their shadow trainer,
                  and absorb 3–6 months of reduced productivity from both people.
                </p>
                <p>
                  Multiply that across multiple hires, account for the inconsistency of trainer-to-trainer
                  knowledge transfer, and the fact that some candidates wash out after you've already
                  invested in them — and the hidden cost of your "free" in-house training is anything but free.
                </p>
                <p className="text-white font-medium">
                  Mastering Field Service externalizes that cost. Candidates arrive trained, tested, and certified
                  before they touch your schedule.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { old: 'Trainer pulled off billable work for weeks', new: 'Candidate trained independently on their own time' },
                { old: 'Knowledge varies by who trained them', new: 'Standardized curriculum from 25+ years of field experience' },
                { old: 'No way to screen knowledge before hiring', new: 'Proctored certification gives you a verifiable baseline' },
                { old: 'Sunk cost if candidate washes out', new: 'Screen with certification before you commit to hiring' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-3 text-xs">
                  <div className="card-dark p-3 border-red-900/40 bg-red-950/10">
                    <span className="text-red-400 block mb-1 font-semibold">Before</span>
                    <span className="text-gray-400">{row.old}</span>
                  </div>
                  <div className="card-dark p-3 border-green-900/40 bg-green-950/10">
                    <span className="text-green-400 block mb-1 font-semibold">After</span>
                    <span className="text-gray-400">{row.new}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Individual certs for employers */}
      <section className="py-16 border-b border-gray-800">
        <div className="container-site max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-2">Certification levels</h2>
          <p className="text-sm text-gray-400 mb-8">Two credentials, built for different career stages.</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card-dark p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="badge-jr text-xs mb-2 block w-fit">Jr. FSE</span>
                  <h3 className="text-base font-bold text-white">Junior FSE Certification</h3>
                  <p className="text-sm text-gray-500">Entry-level knowledge credential</p>
                </div>
                <p className="text-xl font-mono font-bold text-indigo-400">$199</p>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-400 mb-4">
                <li>✓ 50 randomized questions from 1,000-question bank</li>
                <li>✓ AI-proctored with camera monitoring</li>
                <li>✓ Anti-cheat audit logging</li>
                <li>✓ 90-second timer per question</li>
                <li>✓ 80% passing score</li>
                <li>✓ Publicly verifiable certificate</li>
              </ul>
              <p className="text-xs text-gray-500 italic">
                Best signal for: supervised junior candidates, career-changers, recent technical grads
              </p>
            </div>

            <div className="card-dark p-6 border-amber-900/50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="badge-fse text-xs mb-2 block w-fit">FSE</span>
                  <h3 className="text-base font-bold text-white">FSE Human Proctored Certification</h3>
                  <p className="text-sm text-gray-500">Advanced, live-proctored credential</p>
                </div>
                <p className="text-xl font-mono font-bold text-amber-400">$649</p>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-400 mb-4">
                <li>✓ 50 questions from separate FSE-level bank</li>
                <li>✓ Live human proctor — identity confirmed</li>
                <li>✓ Proctor must unlock the session</li>
                <li>✓ Higher technical difficulty — scenario & troubleshooting focus</li>
                <li>✓ 80% passing score</li>
                <li>✓ Stronger exam integrity signal</li>
              </ul>
              <p className="text-xs text-gray-500 italic">
                Best signal for: FSE-level candidates, experienced technicians seeking advancement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team packages */}
      <section id="packages" className="py-16 border-b border-gray-800">
        <div className="container-site max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-2">Employer Team Packages</h2>
            <p className="text-sm text-gray-400 max-w-2xl">
              Buy a block of complete certification bundles for your candidates or current team members.
              Each seat includes Training Portal access, the FSE Human Proctored Exam, and a
              personally signed copy of <em>Mastering Uninterruptible Power Supplies, Field Service Engineering</em>
              — shipped directly to the candidate.
            </p>
          </div>

          {/* What's included in each seat */}
          <div className="card-dark p-5 mb-8 border-indigo-900/50">
            <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-3">Each seat includes</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: '📚', title: 'Training Portal Access', desc: 'Full access to Mastering Field Service interactive training modules — self-paced, available 24/7' },
                { icon: '🎓', title: 'FSE Human Proctored Exam', desc: 'Live-proctored certification exam with a verifiable certificate upon passing' },
                { icon: '✍️', title: 'Signed Copy of the Book', desc: 'A personally signed copy of the textbook shipped directly to your candidate' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing table */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {/* Single */}
            <div className="card-dark p-6 flex flex-col">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Single</p>
              <p className="text-3xl font-mono font-bold text-white mb-1">$699</p>
              <p className="text-sm text-gray-500 mb-1">per seat</p>
              <p className="text-xs text-gray-600 mb-6">1 candidate</p>
              <ul className="space-y-1.5 text-xs text-gray-400 mb-6 flex-1">
                <li>✓ Training Portal Access</li>
                <li>✓ FSE Human Proctored Exam</li>
                <li>✓ Signed copy of the book</li>
              </ul>
              <Link href="/certifications/proctored"
                className="block text-center px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition-colors">
                Purchase Individual →
              </Link>
            </div>

            {/* 5-pack */}
            <div className="card-dark p-6 flex flex-col border-indigo-700/60">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">5-Seat Pack</p>
              <p className="text-3xl font-mono font-bold text-white mb-1">$3,399</p>
              <p className="text-sm text-gray-400 mb-1">
                <span className="font-mono">$679.80</span> per seat
              </p>
              <p className="text-xs text-green-400 mb-6">Save $96 vs. individual</p>
              <ul className="space-y-1.5 text-xs text-gray-400 mb-6 flex-1">
                <li>✓ 5 Training Portal seats</li>
                <li>✓ 5 FSE Human Proctored Exams</li>
                <li>✓ 5 signed copies shipped to candidates</li>
                <li>✓ Coordinated onboarding support</li>
              </ul>
              <Link href="/contact"
                className="block text-center px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
                Contact to Purchase →
              </Link>
            </div>

            {/* 10-pack */}
            <div className="card-dark p-6 flex flex-col border-amber-700/60">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">10-Seat Pack</p>
                <span className="text-xs bg-amber-900/50 border border-amber-700 text-amber-300 px-2 py-0.5 rounded-full">Best Value</span>
              </div>
              <p className="text-3xl font-mono font-bold text-white mb-1">$5,250</p>
              <p className="text-sm text-gray-400 mb-1">
                <span className="font-mono">$525</span> per seat
              </p>
              <p className="text-xs text-green-400 mb-6">Save $1,740 vs. individual — 25% off</p>
              <ul className="space-y-1.5 text-xs text-gray-400 mb-6 flex-1">
                <li>✓ 10 Training Portal seats</li>
                <li>✓ 10 FSE Human Proctored Exams</li>
                <li>✓ 10 signed copies shipped to candidates</li>
                <li>✓ Coordinated onboarding support</li>
                <li>✓ Priority scheduling with Francis Aiello</li>
              </ul>
              <Link href="/contact"
                className="block text-center px-4 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium transition-colors">
                Contact to Purchase →
              </Link>
            </div>
          </div>

          {/* ROI callout */}
          <div className="card-dark p-6 bg-indigo-950/30 border-indigo-900/50">
            <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-3">The Math</p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Average FSE salary</p>
                <p className="text-xl font-mono font-bold text-white">$80–100k<span className="text-sm text-gray-500">/yr</span></p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Estimated in-house training cost per hire</p>
                <p className="text-xl font-mono font-bold text-white">$5,000–20,000+</p>
                <p className="text-xs text-gray-500">(trainer time, lost productivity, repeat attempts)</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Mastering Field Service 10-seat pack, per person</p>
                <p className="text-xl font-mono font-bold text-green-400">$525</p>
                <p className="text-xs text-gray-500">Trained. Tested. Certified. Book in hand.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exam integrity for employers */}
      <section className="py-16">
        <div className="container-site max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-dark p-6">
              <h3 className="text-sm font-semibold text-white mb-3">Exam Integrity</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                The FSE Human Proctored Exam is administered live by an approved proctor.
                Identity is confirmed before the session begins. The proctor must manually
                unlock the exam. This is a meaningful signal — not a self-scored quiz.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every certificate is publicly verifiable at{' '}
                <Link href="/verify" className="text-indigo-400 hover:text-indigo-300">/verify</Link>.
                Share the certificate number and any employer can confirm it is authentic.
              </p>
            </div>

            <div className="card-dark p-6 bg-amber-950/20 border-amber-900/40">
              <h3 className="text-sm font-semibold text-amber-200 mb-3">Important Note for Employers</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                These certifications are educational knowledge credentials. They demonstrate that a
                candidate has studied UPS field service fundamentals and can pass a rigorous knowledge exam.
                They do not replace employer safety qualification, OEM training, electrical licensing,
                NFPA 70E training, or site-specific authorization. Candidates must still be onboarded,
                supervised, and qualified according to your organization's standards.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400 mb-4">
              Questions about team packages, custom arrangements, or employer partnerships?
            </p>
            <Link href="/contact"
              className="px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors inline-block">
              Contact FA Consulting and Recruiting →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
