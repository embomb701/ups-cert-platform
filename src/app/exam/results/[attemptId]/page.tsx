'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';

interface ResultData {
  score: number;
  passed: boolean;
  passingScore: number;
  examLevel: string;
  certificateId?: string;
  certificateNumber?: string;
  categoryBreakdown?: Record<string, { correct: number; total: number }>;
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
    fetch(`/api/exam/result/${attemptId}`)
      .then((r) => r.json())
      .then((data) => setResult(data))
      .catch(() => {})
      .finally(() => setFetching(false));
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

  return (
    <section className="section-pad">
      <div className="container-site max-w-2xl mx-auto">
        <div className="card-dark p-10 text-center">
          {/* Pass/Fail indicator */}
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
            {result.passed ? 'Exam Passed' : 'Exam Not Passed'}
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
              <p className="text-xs text-gray-400 font-mono">{result.certificateNumber}</p>
              <div className="flex gap-3 justify-center mt-3">
                <Link href="/dashboard" className="text-sm text-indigo-400 hover:text-indigo-300">
                  View in dashboard
                </Link>
                <Link
                  href={`/verify/${result.certificateNumber}`}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Public verification link
                </Link>
              </div>
            </div>
          )}

          {!result.passed && (
            <div className="card-dark p-4 mb-6 text-left">
              <p className="text-sm text-gray-300 font-medium mb-1">What happens next</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                A 90-day cooldown has been applied to your account and network. You may attempt
                the exam again after the cooldown period expires. Study the material and try again.
                The passing score is {result.passingScore}%.
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

        <div className="mt-6 p-4 card-dark bg-amber-950/20 border-amber-900/40">
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
