import Link from 'next/link';
import { UpsTopologySimulator } from '@/components/labs/UpsTopologySimulator';

export const metadata = { title: 'UPS One-Line Diagram — Interactive Lab' };

export default function UpsTopologyLabPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link href="/training/ups/labs" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Back to Labs</Link>
          <div className="flex items-center gap-2 mt-4 mb-2">
            <span className="text-2xl">⚡</span>
            <h1 className="text-2xl font-bold text-white">How a UPS Works</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Click through Online, Mains Fail, Bypass, and Maintenance Bypass to see exactly what changes —
            and, just as important, what doesn&apos;t — at each stage.
          </p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-800/20 p-5">
          <UpsTopologySimulator />
        </div>
      </div>
    </div>
  );
}
