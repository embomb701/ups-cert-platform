import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Admin — Proctored FSC Orders' };

const STATUS_LABELS: Record<string, string> = {
  scheduling_pending: 'Scheduling Pending',
  scheduled: 'Scheduled',
  proctor_assigned: 'Proctor Assigned',
  ready: 'Ready to Start',
  in_progress: 'In Progress',
  completed: 'Completed',
  passed: 'Passed',
  failed: 'Failed',
  certificate_issued: 'Certificate Issued',
};

export default function AdminProctoredPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-white">&larr; Admin</Link>
          <h1 className="text-xl font-bold text-white">Proctored FSC Orders</h1>
        </div>

        <div className="card-dark p-6 mb-6">
          <h2 className="text-sm font-semibold text-white mb-4">FSC Exam Workflow</h2>
          <ol className="space-y-3">
            {[
              ['purchased / scheduling_pending', 'Candidate has paid. Contact candidate to schedule.'],
              ['scheduled', 'Date and time confirmed with candidate.'],
              ['proctor_assigned', 'Specific proctor name assigned to this session.'],
              ['ready', 'Proctor has unlocked the exam. Candidate may now start.'],
              ['in_progress', 'Exam session is live under proctor supervision.'],
              ['completed → passed / failed', 'Proctor marks session complete. Score recorded.'],
              ['certificate_issued', 'Certificate generated and delivered to candidate.'],
            ].map(([status, desc], i) => (
              <li key={i} className="flex gap-3 text-xs">
                <span className="text-indigo-400 font-mono shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}.</span>
                <div>
                  <span className="font-semibold text-gray-300">{status}</span>
                  <span className="text-gray-500 ml-2">— {desc}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="card-dark p-6 mb-6">
          <h2 className="text-sm font-semibold text-white mb-2">Proctor Notes</h2>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li>&#x2022; The exam does NOT unlock until an admin changes status to <code className="font-mono">ready</code>.</li>
            <li>&#x2022; Record the proctor name on the order — do not use the program creator&apos;s personal name. Use &quot;approved representative from the organization.&quot;</li>
            <li>&#x2022; Confirm identity before unlocking the exam session.</li>
            <li>&#x2022; Proctor may add notes to the attempt record at any time.</li>
            <li>&#x2022; An invalidated attempt should be clearly documented with reason.</li>
          </ul>
        </div>

        <div className="card-dark p-5 bg-gray-900/60">
          <p className="text-xs text-gray-500">
            The proctored order list is loaded dynamically from Firestore.
            Wire up <code className="font-mono">adminDb.collection(&apos;proctoredExamOrders&apos;)</code> in a
            Server Component or API route to render live data here.
          </p>
        </div>
      </div>
    </section>
  );
}
