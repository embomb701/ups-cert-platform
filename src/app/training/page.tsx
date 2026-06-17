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
  'Jr. FSC Exam Preparation',
  'FSC Exam Preparation',
];

export default function TrainingPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-4xl mx-auto text-center">
        <span className="badge-jr mb-4 inline-block">Coming Soon</span>
        <h1 className="text-3xl font-bold text-white mb-4">
          Online UPS Field Service Training
        </h1>
        <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto mb-12">
          Structured video and text training modules covering UPS field service fundamentals are in
          development. Modules will be available as individual paid products and will directly support
          preparation for both the Jr. FSC and FSC certification exams.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-left mb-12">
          {modules.map((mod) => (
            <div key={mod} className="card-dark px-4 py-3 flex items-center justify-between opacity-60">
              <span className="text-sm text-gray-300">{mod}</span>
              <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded shrink-0 ml-2">Soon</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          Want to be notified when training launches? Check back here or sign in to your dashboard to track updates.
        </p>
      </div>
    </section>
  );
}
