'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { ExamQuestion } from '@/components/exam/ExamQuestion';
import type { QuestionForExam } from '@/types';

interface ReviewQueueResponse {
  totalTracked: number;
  masteredCount: number;
  dueCount: number;
  questions: QuestionForExam[];
  error?: string;
}

interface AnswerResult {
  correct: boolean;
  correctAnswerId: string;
  explanation: string;
  box: number | null;
  mastered: boolean;
}

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const examLevel = (params?.examLevel as string) ?? '';

  const [loadingQueue, setLoadingQueue] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queue, setQueue] = useState<ReviewQueueResponse | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [masteredThisSession, setMasteredThisSession] = useState(0);
  const [correctThisSession, setCorrectThisSession] = useState(0);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || !examLevel) return;
    let cancelled = false;
    user.getIdToken().then((token) =>
      fetch(`/api/review/${examLevel}`, { headers: { Authorization: `Bearer ${token}` } })
    )
      .then((r) => r.json())
      .then((data: ReviewQueueResponse) => {
        if (cancelled) return;
        if (data.error) {
          setError(data.error);
          return;
        }
        setQueue(data);
      })
      .catch(() => !cancelled && setError('Failed to load your review queue. Please try again.'))
      .finally(() => !cancelled && setLoadingQueue(false));
    return () => {
      cancelled = true;
    };
  }, [user, examLevel]);

  const current = queue?.questions[index];

  const handleSelect = useCallback(
    async (choiceId: string) => {
      if (!current || result || submitting) return;
      setSelected(choiceId);
      setSubmitting(true);
      try {
        const token = await user!.getIdToken();
        const res = await fetch('/api/review/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ questionId: current.id, selectedChoiceId: choiceId }),
        });
        const data: AnswerResult = await res.json();
        setResult(data);
        if (data.correct) setCorrectThisSession((c) => c + 1);
        if (data.mastered) setMasteredThisSession((m) => m + 1);
      } catch {
        setError('Failed to record your answer. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
    [current, result, submitting, user]
  );

  const handleNext = () => {
    setSelected(null);
    setResult(null);
    setIndex((i) => i + 1);
  };

  if (loading || loadingQueue) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading your review queue...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card-dark p-8 max-w-sm text-center">
          <p className="text-red-400 font-semibold mb-3">Couldn&apos;t load review</p>
          <p className="text-sm text-gray-400 mb-6">{error}</p>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-indigo-400 hover:text-indigo-300">
            Return to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!queue) return null;

  // Nothing due right now.
  if (queue.dueCount === 0) {
    return (
      <section className="section-pad">
        <div className="container-site max-w-lg mx-auto text-center">
          <div className="card-dark p-10">
            <h1 className="text-xl font-bold text-white mb-3">You&apos;re all caught up</h1>
            {queue.totalTracked === 0 ? (
              <p className="text-sm text-gray-400 mb-6">
                You haven&apos;t missed any questions on a practice test yet — nothing to review. Take a
                practice test first, and any question you get wrong will show up here for spaced review.
              </p>
            ) : (
              <p className="text-sm text-gray-400 mb-6">
                {queue.masteredCount} of {queue.totalTracked} previously-missed question
                {queue.totalTracked === 1 ? '' : 's'} {queue.masteredCount === 1 ? 'is' : 'are'} fully
                mastered. The rest are scheduled for a later review — check back after your next practice
                attempt, or come back tomorrow.
              </p>
            )}
            <Link
              href="/dashboard"
              className="inline-block px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Session finished.
  if (index >= queue.questions.length) {
    return (
      <section className="section-pad">
        <div className="container-site max-w-lg mx-auto text-center">
          <div className="card-dark p-10">
            <h1 className="text-xl font-bold text-white mb-3">Review session complete</h1>
            <p className="text-sm text-gray-400 mb-2">
              {correctThisSession} of {queue.questions.length} correct this session.
            </p>
            {masteredThisSession > 0 && (
              <p className="text-sm text-emerald-400 mb-6">
                {masteredThisSession} question{masteredThisSession === 1 ? '' : 's'} just moved to mastered —
                nice work.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <Link
                href="/dashboard"
                className="px-6 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm transition-colors"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={() => {
                  setIndex(0);
                  setCorrectThisSession(0);
                  setMasteredThisSession(0);
                  setLoadingQueue(true);
                  user!.getIdToken().then((token) =>
                    fetch(`/api/review/${examLevel}`, { headers: { Authorization: `Bearer ${token}` } })
                  )
                    .then((r) => r.json())
                    .then(setQueue)
                    .finally(() => setLoadingQueue(false));
                }}
                className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
              >
                Check for More
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!current) return null;

  return (
    <section className="section-pad">
      <div className="container-site max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <span className="badge-jr">Review Mode</span>
          <span className="text-xs text-gray-500">
            {queue.dueCount} due · {queue.masteredCount} mastered
          </span>
        </div>

        <div className="card-dark p-6 sm:p-8">
          <ExamQuestion
            question={current}
            questionNumber={index + 1}
            totalQuestions={queue.questions.length}
            choiceOrder={current.choices.map((c) => c.id)}
            selectedChoiceId={selected}
            onSelect={handleSelect}
            disabled={!!result || submitting}
          />

          {result && (
            <div
              className={`mt-6 p-5 rounded-xl border ${
                result.correct
                  ? 'bg-emerald-950/40 border-emerald-800/60'
                  : 'bg-red-950/40 border-red-800/60'
              }`}
            >
              <p className={`text-sm font-semibold mb-2 ${result.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                {result.correct ? 'Correct' : `Incorrect — correct answer: ${result.correctAnswerId}`}
                {result.mastered && ' · Mastered!'}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">{result.explanation}</p>
              <button
                onClick={handleNext}
                className="mt-4 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
              >
                {index + 1 >= queue.questions.length ? 'Finish Session' : 'Next Question →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
