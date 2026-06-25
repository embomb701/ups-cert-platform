import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UPS Field Service Training',
};

const availableModules = [
  {
    id: 'basic-electricity',
    title: 'Basic Electricity',
    description: 'Voltage, current, resistance, Ohm\'s Law, and circuit fundamentals — the language every FSE must speak.',
    lessons: 1,
    badge: 'New',
    badgeColor: 'text-green-400 bg-green-950/50 border-green-800',
  },
];

const comingSoonModules = [
  'AC/DC Electrical Fundamentals',
  'Meter Usage and Safe Measurement',
  'Battery Systems',
  'Rectifiers',
  'Inverters',
  'Static Switches',
  'STS Systems',
  'Maintenance Bypass',
  'Startup and Commissioning',
  'Troubleshooting Logic',
  'Alarm Analysis',
  'Critical Load Protection',
  'Jr. FSE Exam Preparation',
  'FSE Exam Preparation',
];

export default function TrainingPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-3">Training</h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            Structured interactive training modules covering UPS field service fundamentals.
            Each module uses live diagrams, sliders, and visual simulations — not just reading.
          </p>
        </div>

        {/* Available now */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Available Now</h2>
          <div className="space-y-3">
            {availableModules.map((mod) => (
              <Link
                key={mod.id}
                href={`/training/${mod.id}`}
                className="block card-dark p-5 hover:border-indigo-700 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {mod.title}
                      </h3>
                      <span className={`text-xs font-semibold border px-2 py-0.5 rounded-full ${mod.badgeColor}`}>
                        {mod.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{mod.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-gray-500">{mod.lessons} lesson{mod.lessons !== 1 ? 's' : ''}</p>
                    <p className="text-xs text-indigo-400 group-hover:text-indigo-300 mt-1">Start →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming soon */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Coming Soon</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {comingSoonModules.map((mod) => (
              <div key={mod} className="card-dark px-4 py-3 flex items-center justify-between opacity-50">
                <span className="text-sm text-gray-400">{mod}</span>
                <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded shrink-0 ml-2">Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
