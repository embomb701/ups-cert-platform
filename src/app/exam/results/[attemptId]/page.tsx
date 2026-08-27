'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { COURSES } from '@/data/courses';

const CERT_TITLES: Record<string, string> = {
  jr_fse: 'Jr. UPS Field Service Engineer',
  fse: 'Field Service Engineer',
  jr_kitchen_fse: 'Jr. Commercial Kitchen Field Service Engineer',
  jr_hvac_fse: 'Jr. HVAC Field Service Engineer',
  jr_gen_fse: 'Jr. Power Generation Field Service Engineer',
  jr_dc_cft: 'Jr. Data Center Critical Facilities Technician',
  jr_solar_fse: 'Jr. Solar & Storage Field Service Engineer',
  jr_ev_tech: 'Jr. EV Charging Infrastructure Technician',
  jr_dcp_tech: 'Jr. Telecom Power Technician',
  jr_battery_tech: 'Jr. Battery Systems Technician',
  jr_dc_engineer: 'Jr. Data Center Engineer',
  jr_marine_tech: 'Jr. Marine Systems Technician',
  jr_pool_tech: 'Jr. Pool Equipment Technician',
  jr_hvac_tech: 'Jr. HVAC Technician',
  jr_solar_inst: 'Jr. Solar Installer',
  jr_wind_tech: 'Jr. Wind Turbine Technician',
  jr_elevator_tech: 'Jr. Elevator Technician',
  jr_fire_alarm_tech: 'Jr. Fire Alarm Technician',
  jr_bmet_tech: 'Jr. Biomedical Equipment Technician',
  jr_bas_tech: 'Jr. Building Automation Systems Technician',
  jr_ref_tech: 'Jr. Commercial Refrigeration Technician',
  jr_plc_tech: 'Jr. Industrial Controls & PLC Technician',
  jr_security_tech: 'Jr. Electronic Security Systems Technician',
  jr_field_pm: 'Jr. Field Project Manager',
  jr_pump_tech: 'Jr. Pump Technician',
  jr_industrial_ref: 'Jr. Industrial Refrigeration Technician',
  jr_dc_ops: 'Jr. Data Center Operations Manager',
  jr_building_cx: 'Jr. Building Commissioning Technician',
  jr_telecom_tech: 'Jr. Telecom Outside Plant Technician',
  jr_switchgear_tech: 'Jr. Switchgear & Substation Technician',
};

interface ChoiceItem {
  id: string;
  text: string;
}

interface QuestionReviewItem {
  id: string;
  questionText: string;
  choices: ChoiceItem[];
  correctAnswerId: string;
  selectedChoiceId: string | null;
  isCorrect: boolean;
  explanation: string;
  category: string;
}

interface ResultData {
  score: number;
  passed: boolean;
  passingScore: number;
  examLevel: string;
  certificateId?: string;
  certificateNumber?: string;
  categoryBreakdown?: Record<string, { correct: number; total: number }>;
  questionReview?: QuestionReviewItem[];
}

export default function ExamResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const attemptId = params?.attemptId as string;

  const [result, setResult] = useState<ResultData | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!attemptId || !user) return;
    user.getIdToken().then((token) => {
      fetch(`/api/exam/result/${attemptId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => {
          if (!r.ok) throw new Error('Failed to load result');
          return r.json();
        })
        .then((data) => setResult(data))
        .catch(() => {})
        .finally(() => setFetching(false));
    });
  }, [attemptId, user]);

  if (loading || fetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Result not found.</p>
      </div>
    );
  }

  const isPerfect = Math.round(result.score) === 100;
  const showReview = result.passed && !isPerfect && (result.questionReview?.length ?? 0) > 0;
  const showReviewFailed = !result.passed && (result.questionReview?.length ?? 0) > 0;

  return (
    <section className="section-pad">
      <div className="container-site max-w-2xl mx-auto">
        {/* Score card */}
        <div className="card-dark p-10 text-center mb-6">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              result.passed
                ? 'bg-green-900 border border-green-700'
                : 'bg-red-900 border border-red-800'
            }`}
          >
            {result.passed ? (
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            {result.passed ? (isPerfect ? 'Perfect Score!' : 'Exam Passed') : 'Exam Not Passed'}
          </h1>

          <p className="text-4xl font-bold mb-1">
            <span className={result.passed ? 'text-green-400' : 'text-red-400'}>
              {Math.round(result.score)}%
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Passing score: {result.passingScore}%
          </p>

          {result.passed && result.certificateNumber && (
            <div className="card-dark bg-green-950/20 border-green-900/40 p-4 mb-6">
              <p className="text-sm text-green-300 font-medium mb-1">Certificate issued</p>
              <p className="text-xs text-gray-400 font-mono mb-3">{result.certificateNumber}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href={`/certificate/${result.certificateNumber}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-700 hover:bg-green-600 text-white text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Certificate (PDF)
                </Link>
                <a
                  href={(() => {
                    const now = new Date();
                    const certTitle = CERT_TITLES[result.examLevel] ?? 'Field Service Certification';
                    const verifyUrl = `${window.location.origin}/verify/${result.certificateNumber}`;
                    return `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(certTitle)}&issueYear=${now.getFullYear()}&issueMonth=${now.getMonth() + 1}&certUrl=${encodeURIComponent(verifyUrl)}&certId=${encodeURIComponent(result.certificateNumber)}`;
                  })()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Add to LinkedIn
                </a>
                {(() => {
                  const accessKey = COURSES.find((c) => c.examLevel === result.examLevel)?.accessKey;
                  return accessKey ? (
                    <Link
                      href={`/jobs?course=${accessKey}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-700 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
                    >
                      Find Matching Jobs →
                    </Link>
                  ) : null;
                })()}
                <Link href="/dashboard" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
                  View in dashboard
                </Link>
                <Link
                  href={`/verify/${result.certificateNumber}`}
                  className="text-sm text-gray-400 hover:text-white flex items-center"
                >
                  Verify →
                </Link>
              </div>
            </div>
          )}

          {!result.passed && (
            <div className="card-dark p-4 mb-6 text-left">
              <p className="text-sm text-gray-300 font-medium mb-1">What happens next</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                A 90-day cooldown has been applied to your account and network. You may attempt
                the exam again after the cooldown period expires. Review the questions below to
                understand what to study. The passing score is {result.passingScore}%.
              </p>
            </div>
          )}

          {result.categoryBreakdown && (
            <div className="text-left mt-6">
              <h3 className="text-sm font-semibold text-white mb-3">Category Breakdown</h3>
              <div className="space-y-2">
                {Object.entries(result.categoryBreakdown).map(([cat, data]) => (
                  <div key={cat} className="flex justify-between text-xs text-gray-400">
                    <span>{cat}</span>
                    <span className={data.correct / data.total >= 0.8 ? 'text-green-400' : 'text-amber-400'}>
                      {data.correct}/{data.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link href="/dashboard" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
              Return to Dashboard
            </Link>
          </div>
        </div>

        {/* Question review — shown if not perfect and there are review items */}
        {(showReview || showReviewFailed) && (
          <div className="card-dark p-6 mb-6">
            <h2 className="text-base font-semibold text-white mb-1">Question Review</h2>
            <p className="text-xs text-gray-500 mb-6">
              {result.passed
                ? 'Green = correct answer · Red = your incorrect answer'
                : 'Review each question to understand what to study before your next attempt.'}
            </p>

            <div className="space-y-8">
              {result.questionReview!.map((q, i) => (
                <div key={q.id} className="border-b border-gray-800 pb-8 last:border-0 last:pb-0">
                  {/* Question header */}
                  <div className="flex items-start gap-3 mb-4">
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                        q.isCorrect
                          ? 'bg-green-900 text-green-400'
                          : 'bg-red-900 text-red-400'
                      }`}
                    >
                      {q.isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Q{i + 1} · {q.category}</p>
                      <p className="text-sm text-white leading-relaxed">{q.questionText}</p>
                    </div>
                  </div>

                  {/* Choices */}
                  <div className="space-y-2 ml-9">
                    {q.choices.map((choice) => {
                      const isCorrect = choice.id === q.correctAnswerId;
                      const isUserPick = choice.id === q.selectedChoiceId;
                      const isWrongPick = isUserPick && !isCorrect;

                      return (
                        <div
                          key={choice.id}
                          className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm ${
                            isCorrect
                              ? 'bg-green-950/50 border border-green-800 text-green-300'
                              : isWrongPick
                              ? 'bg-red-950/50 border border-red-800 text-red-300'
                              : 'text-gray-500'
                          }`}
                        >
                          <span className="font-mono text-xs shrink-0 mt-0.5">{choice.id})</span>
                          <span>{choice.text}</span>
                          {isCorrect && (
                            <span className="ml-auto shrink-0 text-xs text-green-500">correct</span>
                          )}
                          {isWrongPick && (
                            <span className="ml-auto shrink-0 text-xs text-red-500">your answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation — only shown if wrong */}
                  {!q.isCorrect && q.explanation && (
                    <div className="ml-9 mt-3 p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/50">
                      <p className="text-xs text-indigo-300 font-medium mb-1">Why?</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="p-4 card-dark bg-amber-950/20 border-amber-900/40">
          <p className="text-xs text-gray-500 leading-relaxed">
            This certification is an educational knowledge credential. It does not authorize energized
            electrical work or replace employer training, OEM qualification, electrical licensing, NFPA
            70E, OSHA requirements, or site-specific procedures.
          </p>
        </div>
      </div>
    </section>
  );
}
