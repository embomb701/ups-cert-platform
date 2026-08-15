import Link from 'next/link';
import { LotoSimulator } from '@/components/labs/LotoSimulator';

export const metadata = { title: 'LOTO Step-Through — Interactive Lab' };

export default function LotoLabPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <Link href="/training/critical-environment/labs" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Back to Labs</Link>
          <div className="flex items-center gap-2 mt-4 mb-2">
            <span className="text-2xl">🔒</span>
            <h1 className="text-2xl font-bold text-white">LOTO Step-Through</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Click the six steps in the correct order. The cards below are shuffled — figure out what comes next.
          </p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-800/20 p-5">
          <LotoSimulator />
        </div>
      </div>
    </div>
  );
}
