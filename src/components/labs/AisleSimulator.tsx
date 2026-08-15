'use client';

import { useState } from 'react';

type Problem = 'open-door' | 'missing-panel' | 'cable-breach';

interface RackSlot {
  id: number;
  problem: Problem | null;
}

const PROBLEM_INFO: Record<Problem, { label: string; icon: string; explain: string }> = {
  'open-door': {
    label: 'Rack door left open',
    icon: '🚪',
    explain: 'An open rack door lets hot exhaust air recirculate back around into the cold aisle, raising inlet temperature for every server downstream of it.',
  },
  'missing-panel': {
    label: 'Blanking panel missing',
    icon: '⬜',
    explain: 'An empty rack slot without a blanking panel lets hot aisle air flow backward through the open slot into the cold aisle.',
  },
  'cable-breach': {
    label: 'Cable routed through the containment barrier',
    icon: '🔌',
    explain: 'A cable punched through the containment barrier creates a bypass path — hot and cold air mix right at the breach point.',
  },
};

function buildRow(): RackSlot[] {
  const problems: (Problem | null)[] = [
    'open-door', 'missing-panel', 'cable-breach', null, null, null, null, null,
  ];
  for (let i = problems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [problems[i], problems[j]] = [problems[j], problems[i]];
  }
  return problems.map((problem, id) => ({ id, problem }));
}

export function AisleSimulator() {
  const [row] = useState<RackSlot[]>(buildRow);
  const [found, setFound] = useState<Set<number>>(new Set());
  const [missClickId, setMissClickId] = useState<number | null>(null);

  const totalProblems = row.filter((r) => r.problem).length;
  const allFound = found.size === totalProblems;

  function clickRack(slot: RackSlot) {
    if (found.has(slot.id)) return;
    if (slot.problem) {
      setFound((f) => new Set(f).add(slot.id));
      setMissClickId(null);
    } else {
      setMissClickId(slot.id);
      setTimeout(() => setMissClickId((cur) => (cur === slot.id ? null : cur)), 1200);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-gray-500">{found.size} / {totalProblems} containment breaks found</span>
      </div>

      {/* Cold aisle label */}
      <div className="rounded-t-lg bg-sky-950/40 border border-sky-800/50 border-b-0 px-3 py-1.5 text-center">
        <span className="text-sky-400 text-xs font-semibold uppercase tracking-widest">❄ Cold Aisle — rack fronts, air intake</span>
      </div>

      {/* Rack row */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 bg-gray-950 border-x border-gray-800 p-2">
        {row.map((slot) => {
          const isFound = found.has(slot.id);
          const isMiss = missClickId === slot.id;
          return (
            <button
              key={slot.id}
              onClick={() => clickRack(slot)}
              className={`relative aspect-[3/4] rounded border flex items-center justify-center text-lg transition-colors ${
                isFound
                  ? 'border-red-600 bg-red-950/40'
                  : isMiss
                  ? 'border-gray-500 bg-gray-800'
                  : 'border-gray-700 bg-gray-800/80 hover:border-gray-500'
              }`}
              title={isFound && slot.problem ? PROBLEM_INFO[slot.problem].label : undefined}
            >
              {isFound && slot.problem ? PROBLEM_INFO[slot.problem].icon : '▯▯▯'}
            </button>
          );
        })}
      </div>

      {/* Hot aisle label */}
      <div className="rounded-b-lg bg-orange-950/40 border border-orange-800/50 border-t-0 px-3 py-1.5 text-center">
        <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">🔥 Hot Aisle — rack backs, exhaust</span>
      </div>

      <p className="text-xs text-gray-600 mt-3 text-center">Click any rack that looks like a containment mistake.</p>

      {/* Found list */}
      {found.size > 0 && (
        <div className="mt-4 space-y-2">
          {row.filter((r) => found.has(r.id) && r.problem).map((r) => (
            <div key={r.id} className="rounded-lg border border-red-800/50 bg-red-950/10 p-3">
              <p className="text-sm font-semibold text-red-300">{PROBLEM_INFO[r.problem!].icon} {PROBLEM_INFO[r.problem!].label}</p>
              <p className="text-xs text-gray-500 mt-1">{PROBLEM_INFO[r.problem!].explain}</p>
            </div>
          ))}
        </div>
      )}

      {allFound && (
        <div className="mt-4 rounded-lg border border-emerald-700/50 bg-emerald-950/20 p-4 text-center">
          <p className="text-emerald-400 font-semibold text-sm">Found all {totalProblems} — that&apos;s a fully sealed row.</p>
          <p className="text-gray-500 text-xs mt-1">Any bypass path — a door, a missing panel, a breached barrier — costs cooling efficiency for the whole aisle.</p>
        </div>
      )}
    </div>
  );
}
