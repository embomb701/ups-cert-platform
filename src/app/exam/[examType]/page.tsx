'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
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

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  // Start exam
  useEffect(() => {
    if (!user || session || starting) return;
    setStarting(true);

    user.getIdToken().then((token) =>
    fetch('/api/exam/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ examLevel: examType }),
    }))
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
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
        });
      })
      .catch(() => setError('Failed to start exam. Please try again.'))
      .finally(() => setStarting(false));
  }, [user, examType]);

  const submitAnswer = useCallback(
    async (session: ExamSessionState, forceSubmit = false) => {
      const current = session.questions[session.currentIndex];
      const selected = session.answers[current.id] ?? null;
      const isLast = session.currentIndex >= session.totalQuestions - 1;

      if (isLast || forceSubmit) {
        // Final submission
        setSubmitting(true);
        const answers = session.questions.map((q) => ({
          questionId: q.id,
          selectedChoiceId: session.answers[q.id] ?? null,
          answeredAt: new Date().toISOString(),
          timeSpentSeconds: session.timePerQuestion,
        }));

        try {
          const { getAuth } = await import('firebase/auth');
          const currentUser = getAuth().currentUser;
          const idToken = currentUser ? await currentUser.getIdToken() : null;

          const res = await fetch('/api/exam/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
            },
            body: JSON.stringify({ attemptId: session.attemptId, answers }),
          });
          const data = await res.json();
          if (data.error) {
            setError(`Submission failed: ${data.error}`);
            return;
          }
          router.push(`/exam/results/${session.attemptId}`);
        } catch (err: any) {
          setError('Submission failed. Your answers have been recorded. Contact support.');
        }
        return;
      }

      // Advance to next question
      setSession((s) =>
        s
          ? {
              ...s,
              currentIndex: s.currentIndex + 1,
              questionStartedAt: new Date(),
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
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading exam...</p>
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
          <button onClick={() => router.push('/dashboard')} className="text-sm text-indigo-400 hover:text-indigo-300">
            Return to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const current = session.questions[session.currentIndex];
  const choiceOrder = current.choices.map((c) => c.id); // will be passed from server in real impl

  const examContent = (
    <div className="min-h-screen bg-gray-950 py-8">
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
          <div className="h-1 bg-gray-800 rounded-full mb-8">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
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
              className="px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
            >
              {session.currentIndex >= session.totalQuestions - 1 ? 'Submit Exam' : 'Next Question'}
            </button>
          </div>

          {/* Safety reminder */}
          <p className="text-xs text-gray-700 text-center mt-8">
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
