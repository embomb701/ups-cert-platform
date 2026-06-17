import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Admin — Question Bank' };

export default function AdminQuestionsPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-white">&larr; Admin</Link>
          <h1 className="text-xl font-bold text-white">Question Bank</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-1">Jr. FSC Bank</h3>
            <p className="text-xs text-gray-500">Target: 1,000 questions</p>
            <p className="text-xs text-gray-500">Active questions: [load from Firestore]</p>
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-1">FSC Bank</h3>
            <p className="text-xs text-gray-500">Target: 1,000 questions</p>
            <p className="text-xs text-gray-500">Active questions: [load from Firestore]</p>
          </div>
        </div>

        <div className="card-dark p-6 mb-6">
          <h2 className="text-sm font-semibold text-white mb-3">Import Questions</h2>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Use the CLI import script to load questions from JSON files:
          </p>
          <pre className="bg-gray-950 rounded-lg p-4 text-xs font-mono text-gray-300 overflow-x-auto">
{`# Validate before import
npm run validate-questions

# Import Jr. FSC sample
npm run import-questions -- --file data/questions/jr-fsc-sample.json

# Import FSC sample
npm run import-questions -- --file data/questions/fsc-sample.json`}
          </pre>
          <p className="text-xs text-gray-500 mt-3">
            See CLAUDE.md and /scripts/import-questions.ts for full documentation.
          </p>
        </div>

        <div className="card-dark p-6">
          <h2 className="text-sm font-semibold text-white mb-3">Question Management Notes</h2>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li>&#x2022; Setting <code className="font-mono">active: false</code> removes a question from future exam selection without deleting it.</li>
            <li>&#x2022; Questions with <code className="font-mono">reviewRequired: true</code> need admin review before activation.</li>
            <li>&#x2022; Both question banks are completely separate — Jr. FSC questions are never shown on FSC exams.</li>
            <li>&#x2022; Maintain a minimum of 100 active questions per bank for meaningful randomization. Target 1,000.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
