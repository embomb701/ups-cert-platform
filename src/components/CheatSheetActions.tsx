'use client';

export function CheatSheetActions() {
  return (
    <div className="flex flex-wrap gap-3 justify-center print:hidden">
      <button
        onClick={() => window.print()}
        className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-600 text-white font-semibold rounded-lg text-sm transition-colors"
      >
        Print / Save as PDF
      </button>
    </div>
  );
}
