'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { AntiCheatWrapper } from '@/components/exam/AntiCheatWrapper';
import { AIProctorWrapper } from '@/components/exam/AIProctorWrapper';
import { ExamQuestion } from '@/components/exam/ExamQuestion';
import { ExamTimer } from '@/components/exam/ExamTimer';
import type { ExamLevel, QuestionForExam, ExamSessionState } from '@/types';

// Practice exam types map to the certification bank they draw from.
// Module-level (not component-local) so its reference is stable across
// renders — the exam-start effect below reads it without listing it as
// a dependency, which would only be safe if it never changes identity.
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
  practice_jr_marine_tech: 'jr_marine_tech',
  practice_jr_pool_tech: 'jr_pool_tech',
  practice_jr_hvac_tech: 'jr_hvac_tech',
  practice_jr_solar_inst: 'jr_solar_inst',
  practice_jr_wind_tech: 'jr_wind_tech',
  practice_jr_elevator_tech: 'jr_elevator_tech',
  practice_jr_fire_alarm_tech: 'jr_fire_alarm_tech',
  practice_jr_bmet_tech: 'jr_bmet_tech',
  practice_jr_bas_tech: 'jr_bas_tech',
  practice_jr_ref_tech: 'jr_ref_tech',
  practice_jr_plc_tech: 'jr_plc_tech',
  practice_jr_security_tech: 'jr_security_tech',
  practice_jr_field_pm: 'jr_field_pm',
  practice_jr_pump_tech: 'jr_pump_tech',
  practice_jr_industrial_ref: 'jr_industrial_ref',
  practice_jr_dc_ops: 'jr_dc_ops',
  practice_jr_building_cx: 'jr_building_cx',
  practice_jr_telecom_tech: 'jr_telecom_tech',
  practice_jr_switchgear_tech: 'jr_switchgear_tech',
};

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const examType = (params?.examType as string) ?? 'jr_fse';
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
    // session/starting are read only as re-entry guards (skip if an attempt
    // is already starting or started), not reactive triggers — including
    // them would not change behavior but invites confusion. isPractice is a
    // pure function of examType, already a dep. candidateName is read once,
    // at exam start, before session exists — a mid-flight change is a
    // vanishingly rare edge case, not worth re-firing the start request.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              {(session.examLevel === 'jr_fse' ? 'Jr. FSE' : session.examLevel === 'jr_kitchen_fse' ? 'Jr. Kitchen FSE' : session.examLevel === 'jr_hvac_fse' ? 'Jr. HVAC FSE' : session.examLevel === 'jr_gen_fse' ? 'Jr. Generator FSE' : session.examLevel === 'jr_dc_cft' ? 'Jr. Data Center CFT' : session.examLevel === 'jr_solar_fse' ? 'Jr. Solar FSE' : session.examLevel === 'jr_ev_tech' ? 'Jr. EV Tech' : session.examLevel === 'jr_dcp_tech' ? 'Jr. DC Plants Tech' : session.examLevel === 'jr_battery_tech' ? 'Jr. Battery Tech' : session.examLevel === 'jr_dc_engineer' ? 'Jr. DC Engineer' : session.examLevel === 'jr_marine_tech' ? 'Jr. Marine Tech' : session.examLevel === 'jr_pool_tech' ? 'Jr. Pool Tech' : session.examLevel === 'jr_hvac_tech' ? 'Jr. HVAC Tech' : session.examLevel === 'jr_solar_inst' ? 'Jr. Solar Installer' : session.examLevel === 'jr_wind_tech' ? 'Jr. Wind Turbine Tech' : session.examLevel === 'jr_elevator_tech' ? 'Jr. Elevator Tech' : session.examLevel === 'jr_fire_alarm_tech' ? 'Jr. Fire Alarm Tech' : session.examLevel === 'jr_bmet_tech' ? 'Jr. BMET Tech' : session.examLevel === 'jr_bas_tech' ? 'Jr. BAS Tech' : session.examLevel === 'jr_ref_tech' ? 'Jr. Ref Tech' : session.examLevel === 'jr_plc_tech' ? 'Jr. PLC Tech' : session.examLevel === 'jr_security_tech' ? 'Jr. Security Tech' : session.examLevel === 'jr_field_pm' ? 'Jr. Field PM' : session.examLevel === 'jr_pump_tech' ? 'Jr. Pump Tech' : session.examLevel === 'jr_industrial_ref' ? 'Jr. Industrial Ref' : session.examLevel === 'jr_dc_ops' ? 'Jr. DC Ops' : session.examLevel === 'jr_building_cx' ? 'Jr. Building Cx' : session.examLevel === 'jr_telecom_tech' ? 'Jr. Telecom OSP' : session.examLevel === 'jr_switchgear_tech' ? 'Jr. Switchgear Tech' : 'FSE') + (isPractice ? ' Practice' : '')} Exam
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
