'use client';

import { useState } from 'react';

interface Step {
  id: number;
  label: string;
  detail: string;
  early: string; // shown when clicked out of order
}

const STEPS: Step[] = [
  { id: 1, label: 'Identify all energy sources', detail: 'Identify every source of energy that feeds the equipment: utility power paths, UPS bypass paths, generator connections, battery systems, capacitor banks, and pneumatic lines.', early: "You can't isolate or de-energize what you haven't identified yet — this always comes first." },
  { id: 2, label: 'Notify affected employees', detail: "Anyone working in the area must know the equipment will be de-energized. This prevents someone re-energizing a circuit to \"test something\" while you're inside it.", early: 'Notify people once you know what you\'re about to shut down — not before you\'ve identified it.' },
  { id: 3, label: 'De-energize the equipment', detail: "Shut down the equipment using its normal stopping procedure. Don't forcefully interrupt a live load if a controlled shutdown is possible.", early: "You need to identify the energy sources and notify affected people before shutting anything down." },
  { id: 4, label: 'Isolate all energy sources', detail: "Open all isolating devices — breakers, disconnects, valves. A breaker in the OFF position alone isn't enough; it must be capable of being physically locked.", early: "Isolation happens after the equipment is actually de-energized, not before." },
  { id: 5, label: 'Apply lockout/tagout devices', detail: "Place your personal lock on every isolating device. It's yours — only you hold the key. Each worker applies their own lock to a hasp.", early: "You lock an isolation point after it's open, not before." },
  { id: 6, label: 'Verify isolation', detail: "Test with an appropriate meter to confirm zero energy — voltage for electrical, pressure for pneumatic, discharge time for capacitor banks.", early: "Verification is the last step — you test for zero energy only after everything is isolated and locked." },
];

function shuffledOnce(): Step[] {
  const arr = [...STEPS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function LotoSimulator() {
  const [display] = useState<Step[]>(shuffledOnce);
  const [done, setDone] = useState<number[]>([]);
  const [errorId, setErrorId] = useState<number | null>(null);

  const nextExpected = STEPS[done.length]?.id;
  const complete = done.length === STEPS.length;

  function click(step: Step) {
    if (done.includes(step.id)) return;
    if (step.id === nextExpected) {
      setDone((d) => [...d, step.id]);
      setErrorId(null);
    } else {
      setErrorId(step.id);
    }
  }

  function restart() {
    setDone([]);
    setErrorId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-gray-500">{done.length} / {STEPS.length} steps in order</span>
        {done.length > 0 && (
          <button onClick={restart} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Restart</button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {display.map((step) => {
          const isDone = done.includes(step.id);
          const order = done.indexOf(step.id) + 1;
          const hasError = errorId === step.id;
          return (
            <button
              key={step.id}
              onClick={() => click(step)}
              disabled={isDone}
              className={`text-left rounded-lg border p-4 transition-colors ${
                isDone
                  ? 'border-blue-700 bg-blue-950/20 cursor-default'
                  : hasError
                  ? 'border-red-700 bg-red-950/20'
                  : 'border-gray-700 bg-gray-800/60 hover:border-blue-600 hover:bg-blue-950/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDone ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {isDone ? order : '?'}
                </span>
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${isDone ? 'text-blue-200' : 'text-gray-200'}`}>{step.label}</p>
                  {isDone && <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{step.detail}</p>}
                  {hasError && <p className="text-xs text-red-400 mt-1.5 leading-relaxed">Not yet — {step.early}</p>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {complete && (
        <div className="mt-5 rounded-lg border border-emerald-700/50 bg-emerald-950/20 p-4 text-center">
          <p className="text-emerald-400 font-semibold text-sm">Sequence complete — that&apos;s the six-step LOTO procedure.</p>
          <p className="text-gray-500 text-xs mt-1">Identify → Notify → De-energize → Isolate → Lock → Verify.</p>
        </div>
      )}
    </div>
  );
}
