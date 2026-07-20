'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { AntiCheatWrapper } from '@/components/exam/AntiCheatWrapper';
import { AIProctorWrapper } from '@/components/exam/AIProctorWrapper';
import { ExamQuestion } from '@/components/exam/ExamQuestion';
import { ExamTimer } from '@/components/exam/ExamTimer';
import type { ExamLevel, QuestionForExam, ExamSessionState } from '@/types';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const examType = (params?.examType as string) ?? 'jr_fse';
  // Practice exam types map to the certification bank they draw from
  const PRACTICE_MAP: Record<string, ExamLevel> = {
    practice_jr_fse: 'jr_fse',
    practice_jr_kitchen_fse: 'jr_kitchen_fse',
    practice_jr_hvac_fse: 'jr_hvac_fse',
    practice_jr_gen_fse: 'jr_gen_fse',
    practice_jr_dc_cft: 'jr_dc_cft',
    practice_jr_solar_fse: 'jr_solar_fse',
    practice_jr_ev_tech: 'jr_ev_tech',
    practice_jr_dcp_tech: 'jr_dcp_tech',
    practice_jr_battery_tech: 'jr_battery_tech',
    practice_jr_dc_engineer: 'jr_dc_engineer',
  };
  const isPractice = examType in PRACTICE_MAP;
  const candidateName = searchParams?.get('name') ?? '';

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
      body: JSON.stringify({ examLevel: examType, candidateName }),
    }))
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setSession({
          attemptId: data.attemptId,
          examLevel: (isPractice ? PRACTICE_MAP[examType] : examType) as ExamLevel,
          questions: data.questions,
          currentIndex: 0,
          answers: {},
          startedAt: new Date(),
          questionStartedAt: new Date(),
          timePerQuestion: data.timePerQuestion ?? 90,
          totalQuestions: data.questions.length,
          proctored: data.proctored ?? false,
          choiceOrder: data.choiceOrder ?? {},
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
  const choiceOrder = session.choiceOrder[current.id] ?? current.choices.map((c) => c.id);

  const examContent = (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="container-site max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className={session.examLevel.startsWith('jr_') ? 'badge-jr' : 'badge-fse'}>
              {(session.examLevel === 'jr_fse' ? 'Jr. FSE' : session.examLevel === 'jr_kitchen_fse' ? 'Jr. Kitchen FSE' : session.examLevel === 'jr_hvac_fse' ? 'Jr. HVAC FSE' : session.examLevel === 'jr_gen_fse' ? 'Jr. Generator FSE' : session.examLevel === 'jr_dc_cft' ? 'Jr. Data Center CFT' : session.examLevel === 'jr_solar_fse' ? 'Jr. Solar FSE' : session.examLevel === 'jr_ev_tech' ? 'Jr. EV Tech' : session.examLevel === 'jr_dcp_tech' ? 'Jr. DC Plants Tech' : session.examLevel === 'jr_battery_tech' ? 'Jr. Battery Tech' : session.examLevel === 'jr_dc_engineer' ? 'Jr. DC Engineer' : 'FSE') + (isPractice ? ' Practice' : '')} Exam
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
      {session.examLevel.startsWith('jr_') ? (
        <AIProctorWrapper attemptId={session.attemptId}>
          {examContent}
        </AIProctorWrapper>
      ) : (
        examContent
      )}
    </AntiCheatWrapper>
  );
}
