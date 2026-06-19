import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Compare Certifications — Mastering FSE',
};

const rows: { label: string; jr: string; ai: string; human: string }[] = [
  { label: 'Price', jr: '$200', ai: '$349', human: '$500' },
  { label: 'Proctoring', jr: 'None — browser controls only', ai: 'AI webcam (face + eye tracking)', human: 'Live human proctor' },
  { label: 'Scheduling required', jr: 'No', ai: 'No — start anytime after purchase', human: 'Yes — admin must schedule & unlock' },
  { label: 'Questions per attempt', jr: '50 randomized', ai: '50 randomized', human: '50 randomized' },
  { label: 'Question bank', jr: 'Jr. FSE bank (1,000 questions)', ai: 'FSE bank (1,000 questions)', human: 'FSE bank (1,000 questions)' },
  { label: 'Difficulty', jr: 'Entry-level / junior', ai: 'Advanced — scenario-based', human: 'Advanced — scenario-based' },
  { label: 'Time per question', jr: '90 seconds', ai: '90 seconds', human: '90 seconds (configurable)' },
  { label: 'Anti-cheat', jr: 'Browser lockdown', ai: 'Browser lockdown + AI face/eye tracking', human: 'Browser lockdown + live proctor' },
  { label: 'Webcam required', jr: 'No', ai: 'Yes', human: 'Yes (for proctor session)' },
  { label: 'IP/account cooldown', jr: '90 days', ai: 'Audit logged', human: 'Audit logged' },
  { label: 'Identity verification', jr: 'Google account + payment', ai: 'Google account + AI monitoring', human: 'ID confirmed by proctor' },
  { label: 'Passing score', jr: '80%', ai: '80%', human: '80%' },
  { label: 'Certificate on pass', jr: 'Jr. FSE Certificate', ai: 'FSE Certificate (AI Proctored)', human: 'FSE Certificate (Human Proctored)' },
  { label: 'Public verification', jr: 'Yes', ai: 'Yes', human: 'Yes' },
  { label: 'Best for', jr: 'Candidates entering the field', ai: 'Experienced technicians who want flexible scheduling', human: 'Highest-credential validation with human oversight' },
];

export default function ComparePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voltage-500/60 to-transparent" />
        <div className="container-site section-pad">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker mx-auto mb-5 justify-center">The Path</p>
            <h1 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Compare Certifications
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-gray-400">
              All certifications are based on{' '}
              <em className="text-gray-300">Mastering Uninterruptible Power Supplies, Field Service Engineering</em>.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site mx-auto max-w-6xl">
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-carbon-900/60">
                  <th className="w-1/4 px-4 py-4 text-left font-mono text-xs uppercase tracking-widest text-gray-500">
                    Feature
                  </th>
                  <th className="w-1/4 px-4 py-4 text-left align-bottom">
                    <span className="badge-jr mb-2 inline-flex">Jr. FSE</span>
                    <span className="block text-xs font-normal text-gray-400">Junior Certification</span>
                  </th>
                  <th className="w-1/4 px-4 py-4 text-left align-bottom">
                    <span className="badge-ai mb-2 inline-flex">FSE AI</span>
                    <span className="block text-xs font-normal text-gray-400">AI Proctored</span>
                  </th>
                  <th className="w-1/4 px-4 py-4 text-left align-bottom">
                    <span className="badge-fse mb-2 inline-flex">FSE</span>
                    <span className="block text-xs font-normal text-gray-400">Human Proctored</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-white/5 last:border-0 ${i % 2 === 0 ? 'bg-carbon-900/30' : ''}`}
                  >
                    <td className="px-4 py-3.5 align-top font-medium text-gray-400">{row.label}</td>
                    <td className="px-4 py-3.5 align-top text-gray-300">{row.jr}</td>
                    <td className="px-4 py-3.5 align-top text-gray-300">{row.ai}</td>
                    <td className="px-4 py-3.5 align-top text-gray-300">{row.human}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Link
              href="/certifications/junior"
              className="card-interactive block p-7 text-center hover:border-arc-500/40"
            >
              <p className="mb-1 font-display text-lg font-bold text-arc-300">Jr. FSE Exam — $200</p>
              <p className="text-sm text-gray-400">Start here if you are entering the field</p>
            </Link>
            <Link
              href="/certifications/ai-proctored"
              className="card-interactive block p-7 text-center hover:border-fuchsia-500/40"
            >
              <p className="mb-1 font-display text-lg font-bold text-fuchsia-300">FSE AI Proctored — $349</p>
              <p className="text-sm text-gray-400">Flexible scheduling, AI webcam monitoring</p>
            </Link>
            <Link
              href="/certifications/proctored"
              className="card-interactive block p-7 text-center hover:border-voltage-500/40"
            >
              <p className="mb-1 font-display text-lg font-bold text-voltage-300">FSE Human Proctored — $500</p>
              <p className="text-sm text-gray-400">Highest credential with live proctor</p>
            </Link>
          </div>

          <div className="hazard-stripe mt-10 rounded-2xl p-7">
            <p className="text-xs leading-relaxed text-gray-400">
              <strong className="text-voltage-200">Disclaimer:</strong> These certifications are educational
              knowledge credentials. They do not authorize energized electrical work, replace employer
              training, OEM qualification, electrical licensing, NFPA 70E or OSHA requirements, or
              site-specific procedures. Always follow applicable laws, standards, employer policy, and safety procedures.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
