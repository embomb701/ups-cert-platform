import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Basic Electricity — UPS Training',
};

const lessons = [
  {
    id: 'ohms-law',
    title: "Ohm's Law",
    subtitle: 'I = V / R',
    description: 'Learn how voltage, current, and resistance relate to each other using a live interactive circuit diagram.',
    available: true,
  },
  {
    id: 'power-formula',
    title: 'Power Formula',
    subtitle: 'P = V × I',
    description: 'Understand how electrical power is calculated and why it matters in UPS systems.',
    available: false,
  },
  {
    id: 'series-parallel',
    title: 'Series vs. Parallel Circuits',
    subtitle: 'Resistance & current distribution',
    description: 'See how combining components changes the behavior of a circuit.',
    available: false,
  },
  {
    id: 'ac-dc',
    title: 'AC vs. DC',
    subtitle: 'Alternating vs. Direct Current',
    description: 'Understand the two types of electrical current used in UPS systems.',
    available: false,
  },
  {
    id: 'kirchhoffs-laws',
    title: "Kirchhoff's Laws",
    subtitle: 'KVL & KCL',
    description: 'The rules governing voltage and current in any circuit network.',
    available: false,
  },
];

export default function BasicElectricityPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-3xl mx-auto">
        <div className="mb-2">
          <Link href="/training" className="text-xs text-gray-500 hover:text-gray-300">&larr; Training</Link>
        </div>
        <div className="mb-10">
          <span className="inline-block text-xs font-semibold text-green-400 bg-green-950/50 border border-green-800 px-2.5 py-0.5 rounded-full mb-3">
            Module 1
          </span>
          <h1 className="text-2xl font-bold text-white mb-3">Basic Electricity</h1>
          <p className="text-gray-400">
            Before you can understand a UPS, you need to understand electricity itself.
            These lessons use interactive diagrams so you can see — not just read — how the physics works.
          </p>
        </div>

        <div className="space-y-3">
          {lessons.map((lesson, i) => (
            lesson.available ? (
              <Link
                key={lesson.id}
                href={`/training/basic-electricity/${lesson.id}`}
                className="block card-dark p-5 hover:border-indigo-700 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-900/60 border border-indigo-700 flex items-center justify-center shrink-0 text-sm font-bold text-indigo-300">
                      {i + 1}
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {lesson.title}
                      </h2>
                      <p className="text-xs font-mono text-indigo-400 mb-1">{lesson.subtitle}</p>
                      <p className="text-sm text-gray-400">{lesson.description}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-indigo-400 group-hover:text-indigo-300">Start →</span>
                </div>
              </Link>
            ) : (
              <div key={lesson.id} className="card-dark p-5 opacity-50">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0 text-sm font-bold text-gray-500">
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base font-semibold text-gray-400">{lesson.title}</h2>
                      <span className="text-xs text-gray-600 bg-gray-800 border border-gray-700 px-2 py-0.5 rounded-full">Soon</span>
                    </div>
                    <p className="text-xs font-mono text-gray-500 mb-1">{lesson.subtitle}</p>
                    <p className="text-sm text-gray-500">{lesson.description}</p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
