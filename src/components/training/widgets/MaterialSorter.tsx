'use client';

import { useState } from 'react';

interface Item {
  id: string;
  label: string;
  category: 'conductor' | 'insulator' | 'semiconductor';
  fact: string;
}

const ITEMS: Item[] = [
  { id: 'copper', label: 'Copper wire', category: 'conductor', fact: 'Most common conductor in UPS wiring — excellent conductivity and flexibility.' },
  { id: 'pvc', label: 'PVC jacket', category: 'insulator', fact: 'PVC insulation covers conductors to prevent shock and short circuits.' },
  { id: 'igbt', label: 'IGBT', category: 'semiconductor', fact: 'Insulated Gate Bipolar Transistor — controls power switching in UPS inverters.' },
  { id: 'rubber', label: 'Rubber gloves', category: 'insulator', fact: 'Rubber insulates against electrical shock — rated by arc-flash voltage class.' },
  { id: 'aluminum', label: 'Aluminum busbar', category: 'conductor', fact: 'Used for high-current connections in large UPS systems; lighter than copper.' },
  { id: 'silicon', label: 'Silicon diode', category: 'semiconductor', fact: 'Silicon is the most common semiconductor — controls current flow in one direction.' },
  { id: 'glass', label: 'Glass standoff', category: 'insulator', fact: 'Glass insulators support high-voltage conductors and prevent leakage to ground.' },
  { id: 'scr', label: 'SCR (thyristor)', category: 'semiconductor', fact: 'Silicon Controlled Rectifier — used in rectifier stages to convert AC to DC.' },
];

type Category = 'conductor' | 'insulator' | 'semiconductor';

const CAT_STYLE: Record<Category, { border: string; bg: string; label: string; icon: string }> = {
  conductor:    { border: 'border-orange-600', bg: 'bg-orange-950/20', label: 'Conductors',    icon: '🔌' },
  insulator:    { border: 'border-blue-600',   bg: 'bg-blue-950/20',   label: 'Insulators',    icon: '🛡️' },
  semiconductor:{ border: 'border-purple-600', bg: 'bg-purple-950/20', label: 'Semiconductors', icon: '💡' },
};

export default function MaterialSorter() {
  const [sorted, setSorted] = useState<Record<string, Category | null>>(() =>
    Object.fromEntries(ITEMS.map((i) => [i.id, null]))
  );
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const remaining = ITEMS.filter((i) => sorted[i.id] === null);
  const allPlaced = remaining.length === 0;
  const score = allPlaced ? ITEMS.filter((i) => sorted[i.id] === i.category).length : null;

  const handlePlace = (cat: Category) => {
    if (!selected) return;
    setSorted((s) => ({ ...s, [selected]: cat }));
    setSelected(null);
  };

  const handleReset = () => {
    setSorted(Object.fromEntries(ITEMS.map((i) => [i.id, null])));
    setRevealed(false);
    setSelected(null);
  };

  return (
    <div className="rounded-xl border border-gray-600 bg-gray-900/50 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-700 flex items-center gap-2">
        <span className="text-lg">🔬</span>
        <span className="text-sm font-semibold text-gray-300">Material Classifier — Click an item, then click its category</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Item pool */}
        {remaining.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Items to classify ({remaining.length} remaining):</p>
            <div className="flex flex-wrap gap-2">
              {remaining.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(selected === item.id ? null : item.id)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                    selected === item.id
                      ? 'bg-yellow-600 border-yellow-400 text-white scale-105 shadow-md'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {selected && (
              <p className="text-xs text-yellow-400 mt-2 animate-pulse">
                &quot;{ITEMS.find(i => i.id === selected)?.label}&quot; selected — click a category below
              </p>
            )}
          </div>
        )}

        {/* Category bins */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(Object.keys(CAT_STYLE) as Category[]).map((cat) => {
            const style = CAT_STYLE[cat];
            const placedHere = ITEMS.filter((i) => sorted[i.id] === cat);
            return (
              <button
                key={cat}
                onClick={() => handlePlace(cat)}
                disabled={!selected}
                className={`rounded-lg border-2 p-3 text-left transition-all min-h-[100px] ${style.border} ${style.bg} ${selected ? 'cursor-pointer hover:scale-105 ring-2 ring-yellow-500/40' : 'cursor-default'}`}
              >
                <p className="text-xs font-bold text-gray-300 mb-2">{style.icon} {style.label}</p>
                <div className="flex flex-wrap gap-1">
                  {placedHere.map((item) => {
                    const correct = item.category === cat;
                    return (
                      <span
                        key={item.id}
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          revealed
                            ? correct ? 'bg-green-700/60 text-green-200' : 'bg-red-700/60 text-red-200'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {item.label}
                      </span>
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>

        {/* Result */}
        {allPlaced && !revealed && (
          <button
            onClick={() => setRevealed(true)}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors text-sm"
          >
            Check Answers
          </button>
        )}

        {revealed && (
          <div className="space-y-3">
            <div className={`rounded-lg border p-4 text-center ${score === ITEMS.length ? 'border-green-700 bg-green-950/30' : 'border-amber-700 bg-amber-950/20'}`}>
              <p className={`font-bold ${score === ITEMS.length ? 'text-green-300' : 'text-amber-300'}`}>
                {score}/{ITEMS.length} correct
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {ITEMS.map((item) => {
                const placed = sorted[item.id];
                const correct = placed === item.category;
                return (
                  <div key={item.id} className={`rounded-lg p-3 border text-xs ${correct ? 'border-green-800 bg-green-950/20' : 'border-red-800 bg-red-950/20'}`}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={correct ? 'text-green-400' : 'text-red-400'}>{correct ? '✓' : '✗'}</span>
                      <span className="font-semibold text-gray-200">{item.label}</span>
                      {!correct && <span className="text-gray-500">→ {CAT_STYLE[item.category].label.slice(0,-1)}</span>}
                    </div>
                    <p className="text-gray-400 pl-5">{item.fact}</p>
                  </div>
                );
              })}
            </div>

            <button onClick={handleReset} className="w-full py-2 text-sm text-gray-400 hover:text-gray-200 transition-colors">
              ↺ Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
