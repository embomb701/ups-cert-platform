import Link from 'next/link';

export const metadata = { title: 'Interactive Labs — UPS Field Service Engineering' };

const LABS = [
  {
    id: 'topology',
    title: 'UPS One-Line Diagram: Online, Bypass, Mains Fail & Maintenance',
    desc: 'Switch between all four operating modes and watch power flow change across the rectifier, inverter, static switch, and bypass path in real time.',
    icon: '⚡',
    color: 'border-blue-800/50 hover:border-blue-600 bg-blue-950/10',
    accent: 'text-blue-400',
  },
];

export default function UpsLabsHubPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link href="/training/ups" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Back to UPS FSE</Link>
          <div className="flex items-center gap-3 mt-4 mb-2">
            <span className="text-blue-400 font-mono text-xs font-bold uppercase tracking-widest">Interactive Labs</span>
            <span className="px-2 py-0.5 bg-blue-800/50 border border-blue-600/60 text-blue-300 text-xs rounded font-semibold">Free — no sign-in required</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Watch the power flow, don&apos;t just read about it.</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
            Hands-on scenarios built from the same material as the course. No grading, no time limit.
          </p>
        </div>

        <div className="space-y-3">
          {LABS.map((lab) => (
            <Link
              key={lab.id}
              href={`/training/ups/labs/${lab.id}`}
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
