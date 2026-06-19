'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';
import { AntiCheatWrapper } from '@/components/exam/AntiCheatWrapper';
import { AIProctorWrapper } from '@/components/exam/AIProctorWrapper';
import { ExamQuestion } from '@/components/exam/ExamQuestion';
import { ExamTimer } from '@/components/exam/ExamTimer';
import type { ExamLevel, QuestionForExam, ExamSessionState } from '@/types';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const examType = (params?.examType as ExamLevel) ?? 'jr_fse';

  const [session, setSession] = useState<ExamSessionState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Guards the final submission against re-entry (the timer's onExpire and the
  // Submit button can both fire). A ref is used because `submitting` state is
  // stale inside the submitAnswer closure.
  const submittingRef = useRef(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  // Start exam
  useEffect(() => {
    if (!user || session || starting) return;
    setStarting(true);

    (async () => {
      try {
        const token = await getIdToken();
        if (!token) {
          setError('You must be signed in to start the exam.');
          return;
        }
        const res = await fetch('/api/exam/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ examLevel: examType }),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          setError(data.error ?? 'Failed to start exam. Please try again.');
          return;
        }
        setSession({
          attemptId: data.attemptId,
          examLevel: examType,
          questions: data.questions,
          currentIndex: 0,
          answers: {},
          startedAt: new Date(),
          questionStartedAt: new Date(),
          timePerQuestion: data.timePerQuestion ?? 90,
          totalQuestions: data.questions.length,
          proctored: data.proctored ?? false,
          choiceOrder: data.choiceOrder ?? {},
          elapsedByQuestion: {},
        });
      } catch {
        setError('Failed to start exam. Please try again.');
      } finally {
        setStarting(false);
      }
    })();
  }, [user, examType]);

  const submitAnswer = useCallback(
    async (session: ExamSessionState, forceSubmit = false) => {
      const current = session.questions[session.currentIndex];
      const isLast = session.currentIndex >= session.totalQuestions - 1;

      // Real time spent on the current question, capped at the per-question budget.
      const elapsed = Math.min(
        Math.max(0, Math.round((Date.now() - session.questionStartedAt.getTime()) / 1000)),
        session.timePerQuestion
      );
      const elapsedByQuestion = { ...session.elapsedByQuestion, [current.id]: elapsed };

      if (isLast || forceSubmit) {
        // Guard against double submission — the timer's onExpire and the Submit
        // button can both reach here for the same attempt.
        if (submittingRef.current) return;
        submittingRef.current = true;
        setSubmitting(true);

        const answers = session.questions.map((q) => ({
          questionId: q.id,
          selectedChoiceId: session.answers[q.id] ?? null,
          answeredAt: new Date().toISOString(),
          timeSpentSeconds: elapsedByQuestion[q.id] ?? 0,
        }));

        try {
          const token = await getIdToken();
          const res = await fetch('/api/exam/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ attemptId: session.attemptId, answers }),
          });
          // 409 = already submitted (e.g. the timer beat the button); that is a
          // success path — proceed to results. Any other non-OK is a real error.
          if (!res.ok && res.status !== 409) {
            const data = await res.json().catch(() => ({}));
            submittingRef.current = false;
            setSubmitting(false);
            setError(data.error ?? 'Submission failed. Please contact support.');
            return;
          }
          router.push(`/exam/results/${session.attemptId}`);
        } catch {
          submittingRef.current = false;
          setSubmitting(false);
          setError('Submission failed. Your answers may not have been recorded. Contact support.');
        }
        return;
      }

      // Advance to next question, persisting the elapsed time.
      setSession((s) =>
        s
          ? {
              ...s,
              currentIndex: s.currentIndex + 1,
              questionStartedAt: new Date(),
              elapsedByQuestion,
            }
          : s
      );
    },
    [router]
  );

  const handleSelect = (choiceId: string) => {
    if (!session) return;
    const qId = session.questions[session.currentIndex].id;
    setSession((s) => (s ? { ...s, answers: { ...s.answers, [qId]: choiceId } } : s));
  };

  const handleTimerExpire = useCallback(() => {
    if (!session) return;
    submitAnswer(session);
  }, [session, submitAnswer]);

  const handleNext = () => {
    if (!session) return;
    submitAnswer(session);
  };

  if (loading || starting) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-voltage-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">Loading exam…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card-dark p-8 max-w-sm text-center">
          <p className="text-red-400 font-semibold mb-3">Exam Error</p>
          <p className="text-sm text-gray-400 mb-6">{error}</p>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-voltage-400 hover:text-voltage-300">
            Return to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const current = session.questions[session.currentIndex];
  // Apply the server-supplied randomized choice order; fall back to the
  // question's own order if (for any reason) it is missing.
  const choiceOrder = session.choiceOrder[current.id] ?? current.choices.map((c) => c.id);

  const examContent = (
    <div className="min-h-screen bg-carbon-950 py-8">
      <div className="container-site max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className={session.examLevel === 'jr_fse' ? 'badge-jr' : 'badge-fse'}>
              {session.examLevel === 'jr_fse' ? 'Jr. FSE' : session.examLevel === 'fse_ai' ? 'FSE (AI Proctored)' : 'FSE'} Exam
            </span>
          </div>
            <ExamTimer
              key={session.currentIndex}
              secondsTotal={session.timePerQuestion}
              onExpire={handleTimerExpire}
              className="w-48"
            />
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-voltage-gradient rounded-full transition-all duration-300"
              style={{ width: `${((session.currentIndex) / session.totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question */}
          <ExamQuestion
            question={current}
            questionNumber={session.currentIndex + 1}
            totalQuestions={session.totalQuestions}
            choiceOrder={choiceOrder}
            selectedChoiceId={session.answers[current.id] ?? null}
            onSelect={handleSelect}
            disabled={submitting}
          />

          {/* Next / Submit */}
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleNext}
              disabled={submitting}
              className="btn-voltage btn-lg disabled:opacity-50"
            >
              {session.currentIndex >= session.totalQuestions - 1 ? 'Submit Exam' : 'Next Question'}
            </button>
          </div>

          {/* Safety reminder */}
          <p className="text-xs text-gray-500 text-center mt-8">
            Do not copy, share, or distribute exam questions. Tab switching and browser activity are monitored.
          </p>
        </div>
      </div>
  );

  return (
    <AntiCheatWrapper attemptId={session.attemptId}>
      {session.examLevel === 'fse_ai' ? (
        <AIProctorWrapper attemptId={session.attemptId}>
          {examContent}
        </AIProctorWrapper>
      ) : (
        examContent
      )}
    </AntiCheatWrapper>
  );
}
