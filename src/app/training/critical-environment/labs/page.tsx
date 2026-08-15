import Link from 'next/link';

export const metadata = { title: 'Interactive Labs — Critical Environment Fundamentals' };

const LABS = [
  {
    id: 'loto',
    title: 'LOTO Step-Through',
    desc: 'Put the six-step lockout/tagout procedure in the correct order, one decision at a time.',
    icon: '🔒',
    color: 'border-blue-800/50 hover:border-blue-600 bg-blue-950/10',
    accent: 'text-blue-400',
  },
  {
    id: 'ppe',
    title: 'Arc Flash PPE Selection',
    desc: 'Read a real arc flash label, pick the correct PPE category, then build the gear checklist.',
    icon: '🦺',
    color: 'border-amber-800/50 hover:border-amber-600 bg-amber-950/10',
    accent: 'text-amber-400',
  },
  {
    id: 'aisle',
    title: 'Spot the Containment Break',
    desc: 'Walk a row of server racks and click every hot/cold aisle containment mistake you find.',
    icon: '🌡️',
    color: 'border-cyan-800/50 hover:border-cyan-600 bg-cyan-950/10',
    accent: 'text-cyan-400',
  },
];

export default function LabsHubPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link href="/training/critical-environment" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Back to Critical Environment Fundamentals</Link>
          <div className="flex items-center gap-3 mt-4 mb-2">
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">Interactive Labs</span>
            <span className="px-2 py-0.5 bg-emerald-800/50 border border-emerald-600/60 text-emerald-300 text-xs rounded font-semibold">Free — no sign-in required</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Practice, don&apos;t just read.</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
            Three hands-on scenarios built from the exact material in this course. No grading, no time
            limit — work through them as many times as you want before you&apos;re in the field for real.
          </p>
        </div>

        <div className="space-y-3">
          {LABS.map((lab) => (
            <Link
              key={lab.id}
              href={`/training/critical-environment/labs/${lab.id}`}
              className={`block rounded-xl border p-5 transition-colors ${lab.color}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl flex-shrink-0">{lab.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{lab.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{lab.desc}</p>
                </div>
                <span className={`flex-shrink-0 text-xs font-semibold ${lab.accent}`}>Start →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
