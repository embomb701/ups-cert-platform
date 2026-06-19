import type { Metadata } from 'next';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';

export const metadata: Metadata = {
  title: 'FSE AI Proctored Exam — Mastering FSE',
  description:
    'Take the FSE certification exam with AI-powered proctoring. Webcam-based eye and face tracking monitors exam integrity automatically — no scheduling required.',
};

const features = [
  {
    title: 'AI Eye & Face Tracking',
    desc: 'Your webcam monitors face presence, multiple faces, and gaze direction throughout the exam.',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      </>
    ),
  },
  {
    title: 'No Scheduling Required',
    desc: 'Unlock instantly after purchase. Take the exam when you are ready — no appointment needed.',
    icon: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  },
  {
    title: 'Full Anti-Cheat Suite',
    desc: 'Browser lockdown, tab-switch detection, and AI facial monitoring run simultaneously.',
    icon: (
      <>
        <path d="M12 2 4 7v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-5z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Certificate on Pass',
    desc: 'Pass at 80% or higher and receive a verifiable FSE Certificate with proctoring noted.',
    icon: (
      <>
        <rect x="4" y="4" width="16" height="13" rx="2" />
        <path d="M9 21h6M12 17v4" />
      </>
    ),
  },
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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent" />
        <div className="container-site section-pad">
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="badge-fse">FSE</span>
              <span className="badge-ai">
                <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-fuchsia-400" />
                AI Proctored
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
              FSE Exam — AI Proctored
            </h1>
            <p className="mt-5 max-w-2xl leading-relaxed text-gray-400">
              The same rigorous FSE exam with automated webcam proctoring powered by AI face and eye tracking.
              No human proctor scheduling needed — purchase, prepare, and take it on your own schedule.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="card-dark px-5 py-3">
                <span className="font-display text-2xl font-bold text-fuchsia-300">$349</span>
                <span className="ml-2 text-sm text-gray-500">one-time</span>
              </div>
              <div className="card-dark px-5 py-3 text-sm text-gray-400">
                50 questions &bull; 90 sec/question &bull; 80% to pass
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad">
        <div className="container-site mx-auto max-w-4xl">
          <p className="kicker mb-3">AI Proctoring</p>
          <h2 className="mb-8 text-2xl font-bold text-white">How AI Proctoring Works</h2>
          <div className="mb-14 grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="card-interactive p-7">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-fuchsia-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>

          <p className="kicker mb-3">Before You Start</p>
          <h2 className="mb-6 text-2xl font-bold text-white">Exam Rules</h2>
          <div className="card-dark mb-12 p-7">
            <ul className="space-y-3">
              {rules.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-400" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card-dark p-7 ring-1 ring-fuchsia-500/20">
              <h3 className="mb-4 text-sm font-semibold text-white">What the AI Monitors</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                {[
                  'Face presence (flags extended absence)',
                  'Multiple faces in frame',
                  'Gaze direction (repeated looking away)',
                  'Tab switching and browser activity',
                  'Fullscreen exit and focus loss',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fuchsia-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-dark p-7">
              <h3 className="mb-4 text-sm font-semibold text-white">vs. Human Proctored ($500)</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                {[
                  '$151 less expensive',
                  'No scheduling — start anytime',
                  'No live proctor session',
                  'AI monitoring instead of human oversight',
                  'Same exam content and passing standard',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fuchsia-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <PurchaseButton
              productId="fse_ai_exam"
              label="Purchase FSE AI Exam — $349 →"
              className="btn inline-flex bg-fuchsia-600 text-white hover:bg-fuchsia-500 focus-visible:ring-fuchsia-400"
            />
            <p className="mt-3 text-xs text-gray-500">
              Sign in with Google to purchase. Exam unlocks immediately after payment.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-y border-white/10 bg-carbon-900/40 section-pad">
        <div className="container-site mx-auto max-w-3xl">
          <div className="hazard-stripe rounded-2xl p-7">
            <p className="text-xs leading-relaxed text-gray-400">
              <strong className="text-voltage-200">Disclaimer:</strong> This is an educational knowledge
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
