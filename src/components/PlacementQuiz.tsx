'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COURSES, type TrainingCourse } from '@/data/courses';

// ---------------------------------------------------------------
// "Which cert fits you?" — a 3-question placement quiz that routes
// visitors to a recommended track instead of a 29-course wall.
// Pure client-side, no persistence — reuses existing course data.
// ---------------------------------------------------------------

type Background = 'none' | 'mechanical' | 'electrical' | 'it' | 'ops';
type Environment = 'critical_power' | 'healthcare' | 'buildings' | 'kitchens' | 'industrial' | 'remote' | 'management';
type Comfort = 'none' | 'some' | 'strong';

const BACKGROUND_OPTIONS: { value: Background; label: string }[] = [
  { value: 'none', label: 'No trade experience yet' },
  { value: 'mechanical', label: 'Mechanical, HVAC, or refrigeration background' },
  { value: 'electrical', label: 'Electrical or electronics background' },
  { value: 'it', label: 'IT, networking, or computer background' },
  { value: 'ops', label: 'Facilities, operations, or project management background' },
];

const ENVIRONMENT_OPTIONS: { value: Environment; label: string }[] = [
  { value: 'critical_power', label: 'Data centers & critical power facilities' },
  { value: 'healthcare', label: 'Hospitals & healthcare facilities' },
  { value: 'buildings', label: 'Commercial buildings — offices, retail, hotels' },
  { value: 'kitchens', label: 'Restaurants & commercial kitchens' },
  { value: 'industrial', label: 'Industrial plants & manufacturing' },
  { value: 'remote', label: 'Outdoor & remote sites — towers, solar farms, marine, wind' },
  { value: 'management', label: "I'd rather manage projects than turn wrenches" },
];

const COMFORT_OPTIONS: { value: Comfort; label: string }[] = [
  { value: 'none', label: 'Not at all — I want to start from the basics' },
  { value: 'some', label: 'Some — I’ve done basic wiring or DIY work' },
  { value: 'strong', label: 'Very comfortable — I’ve worked with electrical systems before' },
];

function recommend(env: Environment, background: Background, comfort: Comfort): { primary: string; alternates: string[] } {
  switch (env) {
    case 'critical_power':
      if (comfort === 'strong' && background === 'electrical') return { primary: 'dcengineer', alternates: ['ups', 'datacenter'] };
      if (background === 'it') return { primary: 'datacenter', alternates: ['ups', 'dcplants'] };
      return { primary: 'ups', alternates: ['generator', 'datacenter'] };
    case 'healthcare':
      return { primary: 'bmet-tech', alternates: ['hvac', 'ups'] };
    case 'buildings':
      if (background === 'it') return { primary: 'bas-tech', alternates: ['security-tech', 'elevator-tech'] };
      return { primary: 'hvac', alternates: ['elevator-tech', 'fire-alarm-tech'] };
    case 'kitchens':
      return { primary: 'kitchen', alternates: ['ref-tech', 'hvac-tech'] };
    case 'industrial':
      if (background === 'it') return { primary: 'plc-tech', alternates: ['pump-tech', 'industrial-ref'] };
      return { primary: 'pump-tech', alternates: ['plc-tech', 'industrial-ref'] };
    case 'remote':
      if (background === 'it') return { primary: 'telecom', alternates: ['solar', 'wind-tech'] };
      return { primary: 'solar', alternates: ['solar-inst', 'wind-tech'] };
    case 'management':
      return { primary: 'field-pm', alternates: ['dc-ops', 'building-cx'] };
  }
}

function courseById(id: string): TrainingCourse | undefined {
  return COURSES.find((c) => c.id === id);
}

const STEPS = ['background', 'environment', 'comfort', 'result'] as const;

export function PlacementQuiz() {
  const [step, setStep] = useState<number>(0);
  const [background, setBackground] = useState<Background | null>(null);
  const [environment, setEnvironment] = useState<Environment | null>(null);
  const [comfort, setComfort] = useState<Comfort | null>(null);

  const restart = () => {
    setStep(0);
    setBackground(null);
    setEnvironment(null);
    setComfort(null);
  };

  const result = environment && background && comfort ? recommend(environment, background, comfort) : null;
  const showFreeCourseNudge = background === 'none' && comfort === 'none';

  return (
    <div className="rounded-xl border-2 border-blue-700/50 bg-blue-950/10 p-6 md:p-8">
      {step < 3 && (
        <>
          <div className="flex items-center justify-between mb-1">
            <span className="text-blue-400 font-mono text-xs font-bold uppercase tracking-widest">Which cert fits you?</span>
            <span className="text-gray-500 text-xs font-mono">{step + 1} / 3</span>
          </div>
          <div className="flex gap-1.5 mb-6">
            {STEPS.slice(0, 3).map((s, i) => (
              <div key={s} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-blue-500' : 'bg-gray-800'}`} />
            ))}
          </div>
        </>
      )}

      {step === 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">What&apos;s your background?</h3>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {BACKGROUND_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setBackground(opt.value); setStep(1); }}
                className="text-left px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/60 hover:border-blue-600 hover:bg-blue-950/30 text-gray-200 text-sm transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Where do you want to work?</h3>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {ENVIRONMENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setEnvironment(opt.value); setStep(2); }}
                className="text-left px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/60 hover:border-blue-600 hover:bg-blue-950/30 text-gray-200 text-sm transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(0)} className="text-gray-500 hover:text-gray-300 text-xs mt-4 transition-colors">&larr; Back</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">How comfortable are you with electrical work today?</h3>
          <div className="space-y-2.5">
            {COMFORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setComfort(opt.value); setStep(3); }}
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/60 hover:border-blue-600 hover:bg-blue-950/30 text-gray-200 text-sm transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-300 text-xs mt-4 transition-colors">&larr; Back</button>
        </div>
      )}

      {step === 3 && result && (() => {
        const primary = courseById(result.primary);
        const alternates = result.alternates.map(courseById).filter((c): c is TrainingCourse => !!c);
        if (!primary) return null;
        return (
          <div>
            <span className="text-blue-400 font-mono text-xs font-bold uppercase tracking-widest">Your recommended track</span>
            <h3 className="text-2xl font-bold text-white mt-2 mb-1">{primary.title}</h3>
            <p className="text-gray-400 text-sm mb-5 max-w-xl">{primary.tagline}</p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                href={`/training/${primary.id}`}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-sm text-center transition-colors"
              >
                {primary.free ? 'Start Free →' : 'Preview This Track →'}
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold rounded-lg text-sm text-center transition-colors"
              >
                Create free account
              </Link>
            </div>

            {showFreeCourseNudge && primary.id !== 'critical-environment' && (
              <p className="text-emerald-400 text-xs mb-6">
                New to the trades? Consider starting with the free <Link href="/training/critical-environment" className="underline hover:text-emerald-300">Critical Environment Fundamentals</Link> course first — no cost, no commitment.
              </p>
            )}

            {alternates.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Worth a look too</p>
                <div className="flex flex-wrap gap-2">
                  {alternates.map((c) => (
                    <Link
                      key={c.id}
                      href={`/training/${c.id}`}
                      className="px-3 py-1.5 rounded-lg border border-gray-700 bg-gray-800/60 hover:border-gray-500 text-gray-300 hover:text-white text-xs transition-colors"
                    >
                      {c.shortTitle} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <button onClick={restart} className="text-gray-500 hover:text-gray-300 text-xs mt-6 transition-colors">&larr; Retake the quiz</button>
          </div>
        );
      })()}
    </div>
  );
}
