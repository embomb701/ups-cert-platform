import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online UPS Field Service Training — Coming Soon',
};

const modules = [
  'UPS Fundamentals',
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
  'Field Documentation',
  'Customer Communication',
  'Jr. FSE Exam Preparation',
  'FSE Exam Preparation',
];

export default function TrainingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voltage-500/60 to-transparent" />
        <div className="container-site section-pad">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kicker mx-auto mb-6 justify-center">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-voltage-400" />
              Coming Soon
            </p>
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
              Online UPS Field Service{' '}
              <span className="text-voltage-gradient">Training</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              Structured video and text training modules covering UPS field service fundamentals are in
              development. Modules will be available as individual paid products and will directly support
              preparation for both the Jr. FSE and FSE certification exams.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="kicker mb-3 justify-center">The Curriculum</p>
            <h2 className="text-3xl font-bold text-white">Modules In Development</h2>
          </div>
          <div className="grid gap-3 text-left sm:grid-cols-2 md:grid-cols-3">
            {modules.map((mod) => (
              <div
                key={mod}
                className="card-dark flex items-center justify-between gap-2 px-4 py-3.5"
              >
                <span className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-voltage-500/70" />
                  {mod}
                </span>
                <span className="shrink-0 rounded border border-white/10 bg-carbon-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-voltage-400/80">
                  Soon
                </span>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-sm text-gray-500">
              Want to be notified when training launches? Check back here or sign in to your dashboard to track updates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
