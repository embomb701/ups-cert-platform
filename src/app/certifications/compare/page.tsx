import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Compare Certifications',
};

const rows: { label: string; jr: string; ai: string; human: string }[] = [
  { label: 'Price', jr: '$199', ai: '$349', human: '$649' },
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
    <section className="section-pad">
      <div className="container-site max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Compare Certifications</h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          All certifications are based on{' '}
          <em>Mastering Uninterruptible Power Supplies, Field Service Engineering</em>.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 pr-4 text-gray-500 font-medium w-1/4">Feature</th>
                <th className="text-left py-3 px-3 text-white font-semibold w-1/4">
                  <span className="badge-jr mr-2">Jr. FSE</span>
                  <span className="block text-xs text-gray-400 font-normal mt-1">Junior Certification</span>
                </th>
                <th className="text-left py-3 px-3 text-white font-semibold w-1/4">
                  <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-950/50 border border-purple-800/50 px-2 py-0.5 rounded mr-2">FSE AI</span>
                  <span className="block text-xs text-gray-400 font-normal mt-1">AI Proctored</span>
                </th>
                <th className="text-left py-3 px-3 text-white font-semibold w-1/4">
                  <span className="badge-fse mr-2">FSE</span>
                  <span className="block text-xs text-gray-400 font-normal mt-1">Human Proctored</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-gray-900/40' : ''}>
                  <td className="py-3 pr-4 text-gray-400 font-medium align-top">{row.label}</td>
                  <td className="py-3 px-3 text-gray-300 align-top">{row.jr}</td>
                  <td className="py-3 px-3 text-gray-300 align-top">{row.ai}</td>
                  <td className="py-3 px-3 text-gray-300 align-top">{row.human}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          <Link href="/certifications/junior" className="card-dark p-6 text-center hover:border-indigo-700 transition-colors block">
            <p className="text-lg font-bold text-indigo-400 mb-1">Jr. FSE Exam — $199</p>
            <p className="text-sm text-gray-400">Start here if you are entering the field</p>
          </Link>
          <Link href="/certifications/ai-proctored" className="card-dark p-6 text-center hover:border-purple-700 transition-colors block">
            <p className="text-lg font-bold text-purple-400 mb-1">FSE AI Proctored — $349</p>
            <p className="text-sm text-gray-400">Flexible scheduling, AI webcam monitoring</p>
          </Link>
          <Link href="/certifications/proctored" className="card-dark p-6 text-center hover:border-amber-700 transition-colors block">
            <p className="text-lg font-bold text-amber-400 mb-1">FSE Human Proctored — $649</p>
            <p className="text-sm text-gray-400">Highest credential with live proctor</p>
          </Link>
        </div>

        <div className="mt-10 p-6 card-dark bg-amber-950/20 border-amber-900/40">
          <p className="text-xs text-gray-400 leading-relaxed">
            <strong className="text-amber-200">Disclaimer:</strong> These certifications are educational
            knowledge credentials. They do not authorize energized electrical work, replace employer
            training, OEM qualification, electrical licensing, NFPA 70E or OSHA requirements, or
            site-specific procedures. Always follow applicable laws, standards, employer policy, and safety procedures.
          </p>
        </div>
      </div>
    </section>
  );
}
