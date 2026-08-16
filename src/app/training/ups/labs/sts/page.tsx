import Link from 'next/link';
import { StsSimulator } from '@/components/labs/StsSimulator';

export const metadata = { title: 'Static Transfer Switch — Interactive Lab' };

export default function StsLabPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link href="/training/ups/labs" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Back to Labs</Link>
          <div className="flex items-center gap-2 mt-4 mb-2">
            <span className="text-2xl">🔀</span>
            <h1 className="text-2xl font-bold text-white">Static Transfer Switch (STS)</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Run through four scenarios and see why an STS can transfer a load in under 4ms —
            and exactly when it can&apos;t safely transfer at all.
          </p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-800/20 p-5">
          <StsSimulator />
        </div>
      </div>
    </div>
  );
}
