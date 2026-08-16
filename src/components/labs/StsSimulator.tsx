'use client';

import { useState } from 'react';

// ---------------------------------------------------------------
// Interactive Static Transfer Switch (STS) lab — companion to the
// UPS topology lab, built from the same Module 12 content (PDU, RPP,
// and STS Systems): <4ms semiconductor transfer between two AC
// sources, and the hard requirement that both sources be
// synchronized before a transfer can happen safely.
// ---------------------------------------------------------------

type Scenario = 'normal' | 'autoTransfer' | 'syncFault' | 'totalLoss';
type SourceState = 'healthy' | 'fault';
type SyncState = 'synced' | 'outOfSync';
type Connected = 1 | 2 | 'none';

interface ScenarioState {
  label: string;
  blurb: string;
  source1: SourceState;
  source2: SourceState;
  source2Sync: SyncState;
  connected: Connected;
  transferMs: number | null; // shown as a badge when a transfer just happened
  loadState: 'on' | 'off';
}

const SCENARIOS: Record<Scenario, ScenarioState> = {
  normal: {
    label: 'Normal',
    blurb: 'Load runs on Source 1 (preferred). Source 2 is healthy, synchronized, and standing by — the STS continuously monitors both sources’ voltage, frequency, and phase, ready to transfer instantly if it has to.',
    source1: 'healthy', source2: 'healthy', source2Sync: 'synced', connected: 1, transferMs: null, loadState: 'on',
  },
  autoTransfer: {
    label: 'Source 1 Fails',
    blurb: 'Source 1 drops out. Because Source 2 was already synchronized, the thyristors transfer the load in under 4ms — about a quarter of one AC cycle. The load never sees the interruption.',
    source1: 'fault', source2: 'healthy', source2Sync: 'synced', connected: 2, transferMs: 3.8, loadState: 'on',
  },
  syncFault: {
    label: 'Sync Fault',
    blurb: 'Source 1 fails, but Source 2 is out of phase — not synchronized. The STS refuses to transfer, because forcing a transfer between unsynchronized sources creates a voltage kick that can destroy downstream equipment. The load drops until a source is actually safe to use.',
    source1: 'fault', source2: 'healthy', source2Sync: 'outOfSync', connected: 'none', transferMs: null, loadState: 'off',
  },
  totalLoss: {
    label: 'Both Sources Fail',
    blurb: 'An STS has no battery and no generator of its own — it only switches between two live sources. If both are down, there is nothing for it to transfer to. This is exactly why STS is a redundancy tool, not a backup power source by itself.',
    source1: 'fault', source2: 'fault', source2Sync: 'synced', connected: 'none', transferMs: null, loadState: 'off',
  },
};

const OK = '#22c55e';
const FAULT = '#ef4444';
const OFF = '#475569';
const WARN = '#f59e0b';

function SourceBox({ x, y, label, sub, state }: { x: number; y: number; label: string; sub: string; state: SourceState }) {
  const color = state === 'healthy' ? OK : FAULT;
  return (
    <g>
      <rect x={x} y={y} width={140} height={56} rx={6} fill="#0f172a" stroke={color} strokeWidth={2.5} />
      <text x={x + 70} y={y + 24} textAnchor="middle" fontSize="13" fontWeight={700} fill={color} fontFamily="ui-monospace, monospace">{label}</text>
      <text x={x + 70} y={y + 42} textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="ui-monospace, monospace">{sub}</text>
    </g>
  );
}

function Thyristor({ x, y, active, faded }: { x: number; y: number; active: boolean; faded: boolean }) {
  const color = faded ? OFF : active ? OK : '#94a3b8';
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1={-22} y1={0} x2={22} y2={0} stroke={color} strokeWidth={3} />
      <polygon points="-6,-9 -6,9 8,0" fill={color} />
      <line x1={8} y1={-9} x2={8} y2={9} stroke={color} strokeWidth={3} />
    </g>
  );
}

export function StsSimulator() {
  const [scenario, setScenario] = useState<Scenario>('normal');
  const s = SCENARIOS[scenario];

  return (
    <div>
      {/* Scenario buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {(Object.keys(SCENARIOS) as Scenario[]).map((key) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            aria-pressed={scenario === key}
            className={`py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
              scenario === key
                ? key === 'autoTransfer' ? 'border-emerald-600 bg-emerald-950/30 text-emerald-300'
                : key === 'syncFault' ? 'border-amber-600 bg-amber-950/30 text-amber-300'
                : key === 'totalLoss' ? 'border-red-600 bg-red-950/30 text-red-300'
                : 'border-blue-600 bg-blue-950/30 text-blue-300'
                : 'border-gray-700 bg-gray-800/60 text-gray-300 hover:border-gray-500'
            }`}
          >
            {SCENARIOS[key].label}
          </button>
        ))}
      </div>

      {/* Diagram */}
      <div className="rounded-lg border border-gray-800 bg-gray-950 p-2 overflow-x-auto">
        <svg viewBox="0 0 640 300" className="w-full min-w-[520px]" role="img" aria-label={`STS diagram in ${s.label} scenario`}>
          <SourceBox x={20} y={20} label="SOURCE 1" sub={s.source1 === 'healthy' ? 'Voltage OK · Synced' : 'FAULT'} state={s.source1} />
          <SourceBox x={20} y={144} label="SOURCE 2" sub={
            s.source2 === 'fault' ? 'FAULT' : s.source2Sync === 'synced' ? 'Voltage OK · Synced' : 'Voltage OK · OUT OF SYNC'
          } state={s.source2Sync === 'outOfSync' && s.source2 === 'healthy' ? 'fault' : s.source2} />

          {/* Wires from sources to thyristors */}
          <line x1={160} y1={48} x2={230} y2={48} stroke={s.connected === 1 ? OK : OFF} strokeWidth={3} />
          <line x1={160} y1={172} x2={230} y2={172} stroke={s.connected === 2 ? OK : OFF} strokeWidth={3} />
          {/* place source2 lower */}

          <Thyristor x={260} y={48} active={s.connected === 1} faded={s.connected !== 1} />
          <Thyristor x={260} y={172} active={s.connected === 2} faded={s.connected !== 2} />

          {/* merge to STS controller */}
          <line x1={286} y1={48} x2={340} y2={48} stroke={s.connected === 1 ? OK : OFF} strokeWidth={3} />
          <line x1={286} y1={172} x2={340} y2={172} stroke={s.connected === 2 ? OK : OFF} strokeWidth={3} />
          <line x1={340} y1={48} x2={340} y2={172} stroke="#334155" strokeWidth={2} strokeDasharray="3 4" />

          <g>
            <circle cx={340} cy={110} r={20} fill="#0f172a" stroke="#94a3b8" strokeWidth={2} />
            <text x={340} y={114} textAnchor="middle" fontSize="10" fontWeight={700} fill="#e2e8f0">STS</text>
          </g>

          {s.transferMs !== null && (
            <g>
              <rect x={300} y={140} width={80} height={22} rx={4} fill="#052e1c" stroke={OK} strokeWidth={1.5} />
              <text x={340} y={155} textAnchor="middle" fontSize="10" fontWeight={700} fill={OK} fontFamily="ui-monospace, monospace">{s.transferMs}ms</text>
            </g>
          )}

          {/* output */}
          <line x1={360} y1={110} x2={430} y2={110} stroke={s.loadState === 'on' ? OK : OFF} strokeWidth={3} />

          <rect x={430} y={80} width={130} height={60} rx={6} fill="#0f172a" stroke={s.loadState === 'on' ? OK : FAULT} strokeWidth={2.5} />
          <rect x={444} y={92} width={100} height={8} rx={2} fill={s.loadState === 'on' ? OK : FAULT} opacity={0.5} />
          <rect x={444} y={106} width={100} height={8} rx={2} fill={s.loadState === 'on' ? OK : FAULT} opacity={0.5} />
          <rect x={444} y={120} width={100} height={8} rx={2} fill={s.loadState === 'on' ? OK : FAULT} opacity={0.5} />
          <text x={495} y={158} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="ui-monospace, monospace">
            LOAD — {s.loadState === 'on' ? 'ENERGIZED' : 'DOWN'}
          </text>

          {scenario === 'syncFault' && (
            <text x={340} y={230} textAnchor="middle" fontSize="11" fontWeight={700} fill={WARN} fontFamily="ui-monospace, monospace">
              ⚠ Transfer blocked — sources not synchronized
            </text>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: OK }} /> Energized / healthy</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: OFF }} /> Not in use</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: FAULT }} /> Fault / down</span>
      </div>

      {/* Explanation */}
      <div className="mt-4 rounded-lg border border-gray-800 bg-gray-800/30 p-4" aria-live="polite">
        <p className="text-sm font-semibold text-white">{s.label}</p>
        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{s.blurb}</p>
      </div>
    </div>
  );
}
