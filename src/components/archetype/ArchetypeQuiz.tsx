'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ARCHETYPE_QUESTIONS,
  ARCHETYPES,
  topArchetype,
  type ArchetypeId,
  type ArchetypeQuizOption,
} from '@/data/archetypeQuiz';

const PANTHEON_BADGE: Record<string, string> = {
  Greek: 'text-sky-300 border-sky-800/60 bg-sky-950/30',
  Norse: 'text-indigo-300 border-indigo-800/60 bg-indigo-950/30',
  Roman: 'text-amber-300 border-amber-800/60 bg-amber-950/30',
};

export function ArchetypeQuiz() {
  const [answers, setAnswers] = useState<(ArchetypeQuizOption | null)[]>(
    () => ARCHETYPE_QUESTIONS.map(() => null)
  );
  const [step, setStep] = useState(0);

  const isComplete = answers.every(Boolean);

  function selectOption(option: ArchetypeQuizOption) {
    const next = [...answers];
    next[step] = option;
    setAnswers(next);
    setStep(step < ARCHETYPE_QUESTIONS.length - 1 ? step + 1 : ARCHETYPE_QUESTIONS.length);
  }

  function goBack() {
    setStep(Math.max(0, step - 1));
  }

  function retake() {
    setAnswers(ARCHETYPE_QUESTIONS.map(() => null));
    setStep(0);
  }

  const result = useMemo(() => {
    if (!isComplete) return null;
    const tally: Partial<Record<ArchetypeId, number>> = {};
    for (const answer of answers) {
      if (!answer) continue;
      tally[answer.archetype] = (tally[answer.archetype] ?? 0) + 1;
    }
    return ARCHETYPES[topArchetype(tally)];
  }, [answers, isComplete]);

  // Results screen
  if (isComplete && result) {
    const badge = PANTHEON_BADGE[result.pantheon];
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
          Your Field Service Archetype
        </p>
        <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-5 ${badge}`}>
          {result.pantheon} Mythology
        </span>
        <h2 className="text-4xl font-bold text-white mb-1">{result.godName}</h2>
        <p className="text-gray-500 text-sm mb-1">{result.archetypeName}</p>
        <p className="text-gray-400 text-sm italic mb-8">{result.epithet}</p>

        <div className="card-dark p-6 text-left mb-6">
          <p className="text-sm text-gray-300 leading-relaxed">{result.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {result.traits.map((trait) => (
            <span
              key={trait}
              className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-300"
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={retake}
            className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm transition-colors"
          >
            Retake Quiz
          </button>
          <Link
            href="/course-finder"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
          >
            Find Your Career Track →
          </Link>
        </div>
      </div>
    );
  }

  // Question screen
  const question = ARCHETYPE_QUESTIONS[step];
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Question {step + 1} of {ARCHETYPE_QUESTIONS.length}</span>
          {step > 0 && (
            <button onClick={goBack} className="text-gray-500 hover:text-white transition-colors">
              ← Back
            </button>
          )}
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${((step + 1) / ARCHETYPE_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center leading-snug">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.label}
            onClick={() => selectOption(option)}
            className="w-full text-left px-5 py-4 rounded-lg border border-gray-700 bg-gray-900/40 hover:border-indigo-600 hover:bg-indigo-950/20 text-gray-200 hover:text-white text-sm font-medium transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
