'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { TrainingCourse } from '@/data/courses';
import { QUIZ_QUESTIONS, rankCourseIds, type QuizOption } from '@/data/courseFinderQuiz';
import { COURSE_TEXT_COLOR, COURSE_HUB_ROUTES } from '@/data/courseDisplay';

export function CourseFinderQuiz({ courses }: { courses: TrainingCourse[] }) {
  const courseMap = useMemo(() => Object.fromEntries(courses.map((c) => [c.id, c])), [courses]);
  const [answers, setAnswers] = useState<(QuizOption | null)[]>(
    () => QUIZ_QUESTIONS.map(() => null)
  );
  const [step, setStep] = useState(0);

  const answeredCount = answers.filter(Boolean).length;
  const isComplete = answeredCount === QUIZ_QUESTIONS.length;

  function selectOption(option: QuizOption) {
    const next = [...answers];
    next[step] = option;
    setAnswers(next);
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStep(QUIZ_QUESTIONS.length); // results screen
    }
  }

  function goBack() {
    setStep(Math.max(0, step - 1));
  }

  function retake() {
    setAnswers(QUIZ_QUESTIONS.map(() => null));
    setStep(0);
  }

  const results = useMemo(() => {
    if (!isComplete) return [];
    const scores: Record<string, number> = {};
    for (const answer of answers) {
      if (!answer) continue;
      for (const [id, weight] of Object.entries(answer.weights)) {
        scores[id] = (scores[id] ?? 0) + weight;
      }
    }
    return rankCourseIds(scores)
      .map((id) => courseMap[id])
      .filter((c): c is TrainingCourse => !!c)
      .slice(0, 3);
  }, [answers, isComplete, courseMap]);

  // Results screen
  if (isComplete && step >= QUIZ_QUESTIONS.length) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Your Results
          </p>
          <h2 className="text-2xl font-bold text-white mb-3">Here&apos;s where to start looking</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Not a certified aptitude test — just a fast way to narrow 29 tracks down to a few
            worth a closer look, based on how you answered.
          </p>
        </div>

        <div className="space-y-4">
          {results.map((course, i) => {
            const text = COURSE_TEXT_COLOR[course.color] ?? 'text-gray-400';
            const href = COURSE_HUB_ROUTES[course.id] ?? '/training';
            return (
              <Link
                key={course.id}
                href={href}
                className="block card-dark p-5 hover:bg-gray-800/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 border border-gray-700 text-sm font-bold text-gray-300 shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold uppercase tracking-widest font-mono mb-1 ${text}`}>
                      {i === 0 ? 'Best match' : `Match #${i + 1}`}
                    </p>
                    <p className="text-white font-semibold text-base leading-snug">{course.title}</p>
                    <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{course.tagline}</p>
                    <p className="text-xs text-gray-600 mt-2">{course.totalModules} modules · Preview free →</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <button
            onClick={retake}
            className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm transition-colors"
          >
            Retake Quiz
          </button>
          <Link
            href="/courses"
            className="px-6 py-3 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold text-sm transition-colors"
          >
            Browse All 29 Tracks
          </Link>
        </div>
      </div>
    );
  }

  // Question screen
  const question = QUIZ_QUESTIONS[step];
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Question {step + 1} of {QUIZ_QUESTIONS.length}</span>
          {step > 0 && (
            <button onClick={goBack} className="text-gray-500 hover:text-white transition-colors">
              ← Back
            </button>
          )}
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
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
            className="w-full text-left px-5 py-4 rounded-lg border border-gray-700 bg-gray-900/40 hover:border-blue-600 hover:bg-blue-950/20 text-gray-200 hover:text-white text-sm font-medium transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
