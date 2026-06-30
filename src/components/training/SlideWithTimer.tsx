'use client';

import { useState, useEffect, useCallback } from 'react';
import PracticalActivity from './PracticalActivity';
import MeterSimulator from './MeterSimulator';
import type { PracticalExercise, MeterSimExercise } from '@/data/modules';

interface QuizQ {
  q: string;
  a: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  exp: string;
}

interface Slide {
  title: string;
  body: string[];
  keyPoints: string[];
  quiz: QuizQ[];
  practical?: PracticalExercise;
  meterSim?: MeterSimExercise;
}

interface Props {
  moduleId: string;
  slideIndex: number;
  slide: Slide;
  nextUrl: string;
  skipTimer?: boolean;
}

const REQUIRED_SECONDS = 300;

export default function SlideWithTimer({ moduleId, slideIndex, slide, nextUrl, skipTimer = false }: Props) {
  const hasMeterSim = !!slide.meterSim;
  const [meterSimDone, setMeterSimDone] = useState(!hasMeterSim);

  // A slide with a practical exercise gates the reading material until the exercise is done
  const hasPractical = !!slide.practical;
  const [practicalDone, setPracticalDone] = useState(!hasPractical);

  const [secondsLeft, setSecondsLeft] = useState(skipTimer ? 0 : REQUIRED_SECONDS);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerDone, setTimerDone] = useState(skipTimer);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(slide.quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{ correct: boolean; correctAnswer: number; explanation: string }[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const startSlide = useCallback(async () => {
    try {
      const res = await fetch('/api/training/slide/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, slideIndex }),
      });
      if (!res.ok) {
        const d = await res.json();
        setServerError(d.error ?? 'Failed to start slide');
        return;
      }
      setTimerStarted(true);
    } catch {
      setServerError('Network error');
    }
  }, [moduleId, slideIndex]);

  useEffect(() => {
    startSlide();
  }, [startSlide]);

  useEffect(() => {
    if (!timerStarted || timerDone) return;
    if (secondsLeft <= 0) {
      setTimerDone(true);
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [timerStarted, timerDone, secondsLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (qIdx: number, aIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = aIdx;
      return next;
    });
  };

  const handleSubmit = async () => {
    if (answers.some((a) => a === null)) {
      setError('Please answer all questions before submitting.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/training/slide/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, slideIndex, answers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Submission failed');
        setLoading(false);
        return;
      }
      setResults(data.results);
      setSubmitted(true);
      if (data.passed) {
        setTimeout(() => { window.location.href = nextUrl; }, 2000);
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleRetry = () => {
    setAnswers(new Array(slide.quiz.length).fill(null));
    setSubmitted(false);
    setResults(null);
    setError('');
  };

  if (serverError) {
    return (
      <div className="rounded-lg bg-red-900/30 border border-red-700 p-6 text-center">
        <p className="text-red-300 font-medium">{serverError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Timer bar — hidden for admin bypass */}
      {!skipTimer && (
        <div className="rounded-lg bg-gray-800 border border-gray-700 p-4 flex items-center justify-between gap-4">
          <span className="text-sm text-gray-400 shrink-0">Minimum reading time</span>
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${Math.max(0, ((REQUIRED_SECONDS - secondsLeft) / REQUIRED_SECONDS) * 100)}%`,
                backgroundColor: timerDone ? '#4ade80' : '#facc15',
              }}
            />
          </div>
          <span className={`text-lg font-mono font-bold shrink-0 ${timerDone ? 'text-green-400' : 'text-yellow-400'}`}>
            {timerDone ? 'Ready' : formatTime(secondsLeft)}
          </span>
        </div>
      )}
      {skipTimer && (
        <div className="rounded-lg bg-gray-800 border border-gray-700/50 p-3 flex items-center gap-2">
          <span className="text-xs text-amber-400 font-semibold">ADMIN PREVIEW</span>
          <span className="text-xs text-gray-500">— timer bypassed, progress still recorded</span>
        </div>
      )}

      {/* METER SIM — shown first, gates reading material */}
      {hasMeterSim && !meterSimDone && (
        <MeterSimulator
          exercise={slide.meterSim!}
          onComplete={() => setMeterSimDone(true)}
        />
      )}

      {/* PRACTICAL EXERCISE — shown after meterSim (or first if no meterSim), gates reading */}
      {meterSimDone && hasPractical && !practicalDone && (
        <div className="space-y-4">
          <PracticalActivity
            exercise={slide.practical!}
            onComplete={() => setPracticalDone(true)}
          />
        </div>
      )}

      {/* READING CONTENT — shown after both pre-activities are complete */}
      {meterSimDone && practicalDone && (
        <>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{slide.title}</h2>
            <div className="space-y-4">
              {slide.body.map((para, i) => (
                <p key={i} className="text-gray-300 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>

          {/* Key points */}
          <div className="rounded-lg bg-blue-900/30 border border-blue-700 p-5">
            <h3 className="text-blue-300 font-semibold mb-3">Key Points</h3>
            <ul className="space-y-2">
              {slide.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-blue-400 mt-1 shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiz toggle */}
          {timerDone && !showQuiz && (
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
            >
              Take Section Quiz ({slide.quiz.length} Questions)
            </button>
          )}

          {!timerDone && (
            <p className="text-center text-gray-500 text-sm">
              Section quiz unlocks when the timer reaches 0.
            </p>
          )}

          {/* Quiz */}
          {showQuiz && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Section Quiz</h3>
              {slide.quiz.map((q, qi) => (
                <div
                  key={qi}
                  className={`rounded-lg border p-5 space-y-3 ${
                    submitted && results
                      ? results[qi].correct
                        ? 'border-green-700 bg-green-900/20'
                        : 'border-red-700 bg-red-900/20'
                      : 'border-gray-700 bg-gray-800'
                  }`}
                >
                  <p className="text-white font-medium">{qi + 1}. {q.q}</p>
                  <div className="space-y-2">
                    {q.a.map((option, ai) => {
                      let btnClass =
                        'w-full text-left px-4 py-2 rounded border text-sm transition-colors ';
                      if (submitted && results) {
                        if (ai === results[qi].correctAnswer)
                          btnClass += 'border-green-500 bg-green-900/40 text-green-300';
                        else if (ai === answers[qi] && !results[qi].correct)
                          btnClass += 'border-red-500 bg-red-900/40 text-red-300';
                        else btnClass += 'border-gray-700 bg-gray-700/50 text-gray-400';
                      } else {
                        if (answers[qi] === ai)
                          btnClass += 'border-blue-500 bg-blue-900/40 text-white';
                        else
                          btnClass +=
                            'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500';
                      }
                      return (
                        <button
                          key={ai}
                          className={btnClass}
                          onClick={() => handleAnswer(qi, ai)}
                          disabled={submitted}
                        >
                          {['A', 'B', 'C', 'D'][ai]}. {option}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && results && (
                    <p className="text-sm text-gray-400 italic">{results[qi].explanation}</p>
                  )}
                </div>
              ))}

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              {!submitted && (
                <button
                  onClick={handleSubmit}
                  disabled={loading || answers.some((a) => a === null)}
                  className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                >
                  {loading ? 'Submitting...' : 'Submit Answers'}
                </button>
              )}

              {submitted && results && (
                <div
                  className={`rounded-lg p-5 text-center ${
                    results.every((r) => r.correct)
                      ? 'bg-green-900/40 border border-green-700'
                      : 'bg-red-900/40 border border-red-700'
                  }`}
                >
                  {results.every((r) => r.correct) ? (
                    <p className="text-green-300 font-bold text-lg">
                      Perfect score! Proceeding to next section...
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-red-300 font-bold text-lg">
                        {results.filter((r) => r.correct).length}/{results.length} correct — you
                        must score 100%.
                      </p>
                      <button
                        onClick={handleRetry}
                        className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors"
                      >
                        Retry Quiz
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
