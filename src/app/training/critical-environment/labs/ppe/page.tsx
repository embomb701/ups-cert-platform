import Link from 'next/link';
import { PpeSimulator } from '@/components/labs/PpeSimulator';

export const metadata = { title: 'Arc Flash PPE Selection — Interactive Lab' };

export default function PpeLabPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <Link href="/training/critical-environment/labs" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Back to Labs</Link>
          <div className="flex items-center gap-2 mt-4 mb-2">
            <span className="text-2xl">🦺</span>
            <h1 className="text-2xl font-bold text-white">Arc Flash PPE Selection</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Read the label, pick the right PPE category, then build the gear checklist for it.
          </p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-800/20 p-5">
          <PpeSimulator />
        </div>
      </div>
    </div>
  );
}
