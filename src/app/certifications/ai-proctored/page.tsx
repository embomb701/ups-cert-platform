import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FSE AI Proctored Exam — Mastering FSE',
  description:
    'Take the FSE certification exam with AI-powered proctoring. Webcam-based eye and face tracking monitors exam integrity automatically — no scheduling required.',
};

const features = [
  { icon: '🤖', title: 'AI Eye & Face Tracking', desc: 'Your webcam monitors face presence, multiple faces, and gaze direction throughout the exam.' },
  { icon: '⚡', title: 'No Scheduling Required', desc: 'Unlock instantly after purchase. Take the exam when you are ready — no appointment needed.' },
  { icon: '🔒', title: 'Full Anti-Cheat Suite', desc: 'Browser lockdown, tab-switch detection, and AI facial monitoring run simultaneously.' },
  { icon: '📄', title: 'Certificate on Pass', desc: 'Pass at 80% or higher and receive a verifiable FSE Certificate with proctoring noted.' },
];

const rules = [
  'You must be alone in the room for the entire exam.',
  'Your face must be clearly visible on the webcam at all times.',
  'No phones, notes, books, or second monitors.',
  'You must remain facing the screen — do not look away repeatedly.',
  'The exam must be completed in a single uninterrupted session.',
  'Webcam and microphone access must be granted before the exam starts.',
  'Violations are logged and may result in exam invalidation.',
];

export default function AIProctorPage() {
  return (
    <>
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge-fse">FSE</span>
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider bg-purple-950/50 border border-purple-800/50 px-2 py-0.5 rounded">AI Proctored</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            FSE Exam — AI Proctored
          </h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl mb-8">
            The same rigorous FSE exam with automated webcam proctoring powered by AI face and eye tracking.
            No human proctor scheduling needed — purchase, prepare, and take it on your own schedule.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="card-dark px-5 py-3">
              <span className="text-2xl font-bold text-purple-400">$349</span>
              <span className="text-gray-500 text-sm ml-2">one-time</span>
            </div>
            <div className="card-dark px-5 py-3 text-sm text-gray-400">
              50 questions &bull; 90 sec/question &bull; 80% to pass
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-8">How AI Proctoring Works</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {features.map((f) => (
              <div key={f.title} className="card-dark p-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-white mb-4">Exam Rules</h2>
          <div className="card-dark p-6 mb-10">
            <ul className="space-y-3">
              {rules.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-purple-400 mt-0.5 shrink-0">&#10003;</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="card-dark p-6 bg-purple-950/20 border-purple-900/40">
              <h3 className="text-sm font-semibold text-white mb-3">What the AI Monitors</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>&#x2022; Face presence (flags extended absence)</li>
                <li>&#x2022; Multiple faces in frame</li>
                <li>&#x2022; Gaze direction (repeated looking away)</li>
                <li>&#x2022; Tab switching and browser activity</li>
                <li>&#x2022; Fullscreen exit and focus loss</li>
              </ul>
            </div>
            <div className="card-dark p-6">
              <h3 className="text-sm font-semibold text-white mb-3">vs. Human Proctored ($500)</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>&#x2022; $151 less expensive</li>
                <li>&#x2022; No scheduling — start anytime</li>
                <li>&#x2022; No live proctor session</li>
                <li>&#x2022; AI monitoring instead of human oversight</li>
                <li>&#x2022; Same exam content and passing standard</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/login"
              className="inline-block px-8 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors"
            >
              Get Started — $349 &rarr;
            </Link>
            <p className="text-xs text-gray-600 mt-3">
              Sign in with Google to purchase. Exam unlocks immediately after payment.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-gray-900/50">
        <div className="container-site max-w-3xl mx-auto">
          <div className="p-6 card-dark bg-amber-950/20 border-amber-900/40">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-amber-200">Disclaimer:</strong> This is an educational knowledge
              credential. It does not authorize energized electrical work, replace employer training, OEM
              qualification, electrical licensing, NFPA 70E or OSHA requirements, or site-specific procedures.
              Always follow applicable laws, standards, employer policy, and safety procedures.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
