'use client';

import { useState } from 'react';

interface Scenario {
  id: string;
  incidentEnergy: string;
  distance: string;
  correctCategory: 1 | 2 | 3 | 4;
}

const SCENARIOS: Scenario[] = [
  { id: 'a', incidentEnergy: '3.1', distance: '18 in', correctCategory: 1 },
  { id: 'b', incidentEnergy: '8.2', distance: '18 in', correctCategory: 2 },
  { id: 'c', incidentEnergy: '22', distance: '18 in', correctCategory: 3 },
  { id: 'd', incidentEnergy: '42', distance: '24 in', correctCategory: 4 },
];

const CATEGORY_MINIMUMS: Record<1 | 2 | 3 | 4, number> = { 1: 4, 2: 8, 3: 25, 4: 40 };

interface GearItem {
  id: string;
  label: string;
  correctFor: (1 | 2 | 3 | 4)[];
  note?: string; // shown after submit if it was a wrong pick or a wrong omission
}

const GEAR: GearItem[] = [
  { id: 'undergarments', label: '100% cotton or other natural-fiber undergarments', correctFor: [1, 2, 3, 4] },
  { id: 'shirt_pants', label: 'Arc-rated shirt and pants', correctFor: [1, 2] },
  { id: 'face_shield', label: 'Arc-rated face shield', correctFor: [1] },
  { id: 'hood', label: 'Arc flash hood or balaclava', correctFor: [2] },
  { id: 'full_suit', label: 'Full arc flash suit (jacket + bibs + hood), rated for this incident energy', correctFor: [3, 4] },
  { id: 'safety_glasses', label: 'Safety glasses', correctFor: [1, 2, 3, 4] },
  { id: 'leather_gloves', label: 'Leather work gloves', correctFor: [1, 2, 3, 4] },
  { id: 'hard_hat', label: 'Hard hat', correctFor: [1, 2, 3, 4] },
  { id: 'rubber_gloves', label: 'Voltage-rated rubber insulating gloves', correctFor: [] },
  { id: 'steel_boots', label: 'Steel-toe boots', correctFor: [] },
];

function pickScenario(): Scenario {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

export function PpeSimulator() {
  const [scenario] = useState<Scenario>(pickScenario);
  const [categoryPick, setCategoryPick] = useState<1 | 2 | 3 | 4 | null>(null);
  const [categoryError, setCategoryError] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  function pickCategory(cat: 1 | 2 | 3 | 4) {
    if (cat === scenario.correctCategory) {
      setCategoryPick(cat);
      setCategoryError(false);
    } else {
      setCategoryError(true);
    }
  }

  function toggleItem(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const correctItemIds = new Set(GEAR.filter((g) => categoryPick && g.correctFor.includes(categoryPick)).map((g) => g.id));
  const allCorrect = submitted && checked.size === correctItemIds.size && [...checked].every((id) => correctItemIds.has(id));

  return (
    <div className="space-y-6">
      {/* Arc flash label */}
      <div className="border-4 border-yellow-500 bg-yellow-950/20 rounded-lg p-4 font-mono">
        <p className="text-yellow-400 text-xs font-bold tracking-widest mb-2">⚠ WARNING — ARC FLASH AND SHOCK HAZARD</p>
        <div className="text-gray-300 text-xs space-y-1">
          <p>Incident Energy: <span className="text-white font-bold">{scenario.incidentEnergy} cal/cm²</span> at {scenario.distance}</p>
          <p>Appropriate PPE required inside the Arc Flash Boundary.</p>
        </div>
      </div>

      {/* Step 1: category */}
      <div>
        <p className="text-sm font-semibold text-gray-200 mb-1">Step 1 — Which PPE category applies?</p>
        <p className="text-xs text-gray-500 mb-3">
          Category minimums: 1 = {CATEGORY_MINIMUMS[1]} cal/cm² · 2 = {CATEGORY_MINIMUMS[2]} cal/cm² · 3 = {CATEGORY_MINIMUMS[3]} cal/cm² · 4 = {CATEGORY_MINIMUMS[4]} cal/cm²
        </p>
        <div className="grid grid-cols-4 gap-2">
          {([1, 2, 3, 4] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => pickCategory(cat)}
              disabled={categoryPick !== null}
              className={`py-3 rounded-lg border text-sm font-bold transition-colors ${
                categoryPick === cat
                  ? 'border-amber-600 bg-amber-950/30 text-amber-300'
                  : categoryPick !== null
                  ? 'border-gray-800 bg-gray-800/20 text-gray-700'
                  : 'border-gray-700 bg-gray-800/60 hover:border-amber-600 text-gray-200'
              }`}
            >
              Cat {cat}
            </button>
          ))}
        </div>
        {categoryError && (
          <p className="text-xs text-red-400 mt-2">
            Not quite — at {scenario.incidentEnergy} cal/cm², check it against the category minimums above and try again.
          </p>
        )}
      </div>

      {/* Step 2: gear checklist */}
      {categoryPick && (
        <div>
          <p className="text-sm font-semibold text-gray-200 mb-1">Step 2 — Build the PPE Category {categoryPick} checklist</p>
          <p className="text-xs text-gray-500 mb-3">Check everything you&apos;d actually put on before opening this panel. Some items here don&apos;t belong.</p>
          <div className="space-y-2">
            {GEAR.map((item) => {
              const isChecked = checked.has(item.id);
              const shouldBeChecked = correctItemIds.has(item.id);
              const feedback = !submitted ? null
                : isChecked && shouldBeChecked ? 'correct'
                : isChecked && !shouldBeChecked ? 'wrong-checked'
                : !isChecked && shouldBeChecked ? 'missed'
                : null;
              return (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors ${
                    feedback === 'correct' ? 'border-emerald-700 bg-emerald-950/20'
                    : feedback === 'wrong-checked' ? 'border-red-700 bg-red-950/20'
                    : feedback === 'missed' ? 'border-amber-700 bg-amber-950/20'
                    : 'border-gray-700 bg-gray-800/40 hover:border-gray-500'
                  } ${submitted ? 'cursor-default' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={submitted}
                    onChange={() => toggleItem(item.id)}
                    className="w-4 h-4 accent-amber-600 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-300 flex-1">{item.label}</span>
                  {feedback === 'wrong-checked' && <span className="text-xs text-red-400 flex-shrink-0">Not needed here</span>}
                  {feedback === 'missed' && <span className="text-xs text-amber-400 flex-shrink-0">You missed this</span>}
                </label>
              );
            })}
          </div>

          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={checked.size === 0}
              className="mt-4 px-5 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 disabled:opacity-40 text-white text-sm font-semibold transition-colors"
            >
              Check my answer
            </button>
          ) : (
            <div className={`mt-4 rounded-lg border p-4 text-center ${allCorrect ? 'border-emerald-700/50 bg-emerald-950/20' : 'border-amber-700/50 bg-amber-950/20'}`}>
              <p className={`font-semibold text-sm ${allCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                {allCorrect ? 'Exactly right.' : 'Close — review the flagged items above.'}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Rubber insulating gloves protect against shock, not arc flash — a separate NFPA 70E requirement based on voltage, not incident energy.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
