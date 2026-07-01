'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface QuizQ {
  q: string;
  a: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  exp: string;
}

interface Props {
  moduleId: string;
  moduleTitle: string;
  questions: QuizQ[];
}

export default function ModuleTestClient({ moduleId, moduleTitle, questions }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{ correct: boolean; correctAnswer: number; explanation: string }[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passed, setPassed] = useState(false);

  const handleAnswer = (qi: number, ai: number) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = ai;
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
      const res = await fetch('/api/training/module/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, answers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Submission failed');
        setLoading(false);
        return;
      }
      setResults(data.results);
      setSubmitted(true);
      setPassed(data.passed);
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const score = results ? results.filter((r) => r.correct).length : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Module Test</h1>
        <p className="text-gray-400">{moduleTitle}</p>
        <p className="text-yellow-400 text-sm font-medium">You must score 100% to pass. This test can only be taken once per day.</p>
      </div>

      <div className="space-y-6">
        {questions.map((q, qi) => (
          <div key={qi} className={`rounded-lg border p-5 space-y-3 ${submitted && results ? (results[qi].correct ? 'border-green-700 bg-green-900/20' : 'border-red-700 bg-red-900/20') : 'border-gray-700 bg-gray-800'}`}>
            <p className="text-white font-medium">{qi + 1}. {q.q}</p>
            <div className="space-y-2">
              {q.a.map((option, ai) => {
                let btnClass = 'w-full text-left px-4 py-2 rounded border text-sm transition-colors ';
                if (submitted && results) {
                  if (ai === results[qi].correctAnswer) btnClass += 'border-green-500 bg-green-900/40 text-green-300';
                  else if (ai === answers[qi] && !results[qi].correct) btnClass += 'border-red-500 bg-red-900/40 text-red-300';
                  else btnClass += 'border-gray-700 bg-gray-700/50 text-gray-400';
                } else {
                  if (answers[qi] === ai) btnClass += 'border-blue-500 bg-blue-900/40 text-white';
                  else btnClass += 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500';
                }
                return (
                  <button key={ai} className={btnClass} onClick={() => handleAnswer(qi, ai)} disabled={submitted}>
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
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={loading || answers.some((a) => a === null)}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors"
        >
          {loading ? 'Submitting...' : 'Submit Module Test'}
        </button>
      )}

      {submitted && results && (
        <div className={`rounded-lg p-6 text-center space-y-4 ${passed ? 'bg-green-900/40 border border-green-700' : 'bg-red-900/40 border border-red-700'}`}>
          {passed ? (
            <>
              <p className="text-green-300 font-bold text-2xl">Module Complete!</p>
              <p className="text-green-400">Perfect score: {score}/{questions.length}</p>
              <p className="text-gray-400 text-sm">You can proceed to the next module after 3 days from today.</p>
              <button onClick={() => router.push('/training')} className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors">
                Back to Training Portal
              </button>
            </>
          ) : (
            <>
              <p className="text-red-300 font-bold text-2xl">Test Not Passed</p>
              <p className="text-red-400">{score}/{questions.length} correct — 100% required</p>
              <div className="text-gray-300 text-sm space-y-1">
                <p>You must complete all slides for this module again before retrying.</p>
                <p>You may retake the test tomorrow.</p>
              </div>
              <button onClick={() => router.push(`/training/${moduleId}`)} className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors">
                Restart Module Slides
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
