import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Compare Certifications — Jr. FSC vs. FSC',
};

const rows: { label: string; jr: string; fsc: string }[] = [
  { label: 'Price', jr: '$200', fsc: '$500' },
  { label: 'Delivery', jr: 'Browser-based online', fsc: 'Proctored live — approved org. representative' },
  { label: 'Questions per attempt', jr: '50 randomized', fsc: '50 randomized' },
  { label: 'Question bank size', jr: '1,000-question Jr. FSC bank', fsc: '1,000-question FSC bank (separate)' },
  { label: 'Difficulty', jr: 'Difficult — junior/entry level', fsc: 'More difficult — scenario-based, technical depth' },
  { label: 'Timed', jr: '90 seconds per question', fsc: '90 seconds per question (configurable)' },
  { label: 'No backtracking', jr: 'Yes', fsc: 'Yes' },
  { label: 'Anti-cheat deterrents', jr: 'Full browser-based controls', fsc: 'Browser controls + live proctoring' },
  { label: 'IP/account cooldown', jr: 'One attempt per 90 days', fsc: 'Audit logging (proctoring provides primary integrity)' },
  { label: 'Scheduling required', jr: 'No — unlocks after payment', fsc: 'Yes — admin/proctor must schedule and unlock' },
  { label: 'Identity verification', jr: 'Google account + payment', fsc: 'Identity confirmed by proctor before session' },
  { label: 'Passing score', jr: '80%', fsc: '80%' },
  { label: 'Certificate on pass', jr: 'Jr. FSC Certificate PDF', fsc: 'FSC Certificate PDF (proctored noted)' },
  { label: 'Public verification', jr: 'Yes', fsc: 'Yes' },
  { label: 'Best for', jr: 'Entry-level candidates preparing for supervised junior field service work', fsc: 'Candidates seeking stronger field service knowledge validation' },
];

export default function ComparePage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Compare Certifications</h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Both certifications are based on{' '}
          <em>Mastering Uninterruptible Power Supplies, Field Service Engineering</em>. The FSC Exam is
          significantly more difficult and requires live proctoring.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 pr-6 text-gray-500 font-medium w-1/3">Feature</th>
                <th className="text-left py-3 px-4 text-white font-semibold w-1/3">
                  <span className="badge-jr mr-2">Jr. FSC</span> Junior Certification
                </th>
                <th className="text-left py-3 px-4 text-white font-semibold w-1/3">
                  <span className="badge-fsc mr-2">FSC</span> Proctored Certification
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-gray-900/40' : ''}>
                  <td className="py-3 pr-6 text-gray-400 font-medium align-top">{row.label}</td>
                  <td className="py-3 px-4 text-gray-300 align-top">{row.jr}</td>
                  <td className="py-3 px-4 text-gray-300 align-top">{row.fsc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-10">
          <Link href="/certifications/junior" className="card-dark p-6 text-center hover:border-indigo-700 transition-colors block">
            <p className="text-lg font-bold text-indigo-400 mb-1">Jr. FSC Exam — $200</p>
            <p className="text-sm text-gray-400">Start here if you are entering the field</p>
          </Link>
          <Link href="/certifications/proctored" className="card-dark p-6 text-center hover:border-amber-700 transition-colors block">
            <p className="text-lg font-bold text-amber-400 mb-1">FSC Exam — $500</p>
            <p className="text-sm text-gray-400">Advanced proctored credential</p>
          </Link>
        </div>

        <div className="mt-10 p-6 card-dark bg-amber-950/20 border-amber-900/40">
          <p className="text-xs text-gray-400 leading-relaxed">
            <strong className="text-amber-200">Disclaimer:</strong> These certifications are educational
            knowledge credentials. They do not authorize energized electrical work, replace employer
            training, replace OEM qualification, replace electrical licensing, replace NFPA 70E or OSHA
            requirements, or replace site-specific procedures. Always follow applicable laws, standards,
            employer policy, and safety procedures.
          </p>
        </div>
      </div>
    </section>
  );
}
