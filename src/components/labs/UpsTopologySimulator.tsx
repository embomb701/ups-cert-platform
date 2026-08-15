'use client';

import { useState } from 'react';

// ---------------------------------------------------------------
// Interactive UPS one-line diagram — rebuilt from an older internal
// prototype (raw DOM + absolute-pixel positioning, broken on mobile,
// and one dead button — the Maintenance handler referenced an
// undefined `inv` element). This version is a real SVG schematic,
// fully responsive, keyboard accessible, and the electrical logic
// has been tightened up:
//  - Breaker positions only change when a person operates them.
//  - "Mains Fail" no longer flips breakers open on its own — in
//    reality they don't trip themselves just because upstream
//    utility disappears. Only the utility-side wiring goes red;
//    everything the UPS is protecting stays green. That's the
//    entire point of a UPS, and now the diagram actually shows it.
//  - Red = abnormal / lost source. Gray = open by design, nothing
//    wrong. That distinction didn't exist in the original.
// ---------------------------------------------------------------

type Mode = 'online' | 'mainsFail' | 'bypass' | 'maintenance';
type WireState = 'on' | 'off' | 'fault';
type BreakerPos = 'closed' | 'open';
type CompState = 'normal' | 'standby' | 'fault' | 'off';
type SwitchPos = 'inverter' | 'bypass';

interface ModeState {
  label: string;
  blurb: string;
  breakers: { q1: BreakerPos; dcds: BreakerPos; q3: BreakerPos; q5: BreakerPos; q6: BreakerPos };
  utility: CompState;
  rectifier: CompState;
  inverter: CompState;
  staticSwitch: SwitchPos;
  wires: {
    uToQ1: WireState; q1ToRec: WireState; recToDc: WireState; dcToInv: WireState;
    invToQ3: WireState; q3ToSS: WireState; uToQ5: WireState; q5ToSS: WireState;
    ssToQ6: WireState; q6ToLoad: WireState;
  };
}

const MODES: Record<Mode, ModeState> = {
  online: {
    label: 'Online',
    blurb: 'Normal operation. Utility feeds the rectifier, which powers the inverter and floats the battery. The static switch is selecting the inverter. The bypass breaker (Q5) is open and unused.',
    breakers: { q1: 'closed', dcds: 'closed', q3: 'closed', q5: 'open', q6: 'closed' },
    utility: 'normal', rectifier: 'normal', inverter: 'normal', staticSwitch: 'inverter',
    wires: { uToQ1: 'on', q1ToRec: 'on', recToDc: 'on', dcToInv: 'on', invToQ3: 'on', q3ToSS: 'on', uToQ5: 'on', q5ToSS: 'off', ssToQ6: 'on', q6ToLoad: 'on' },
  },
  mainsFail: {
    label: 'Mains Fail',
    blurb: "Utility is gone — nothing about the UPS's own breaker positions changes on its own. The rectifier starves and shows fault, but the inverter keeps running the load from the battery without an interruption the load ever sees.",
    breakers: { q1: 'closed', dcds: 'closed', q3: 'closed', q5: 'open', q6: 'closed' },
    utility: 'fault', rectifier: 'fault', inverter: 'normal', staticSwitch: 'inverter',
    wires: { uToQ1: 'fault', q1ToRec: 'fault', recToDc: 'on', dcToInv: 'on', invToQ3: 'on', q3ToSS: 'on', uToQ5: 'fault', q5ToSS: 'off', ssToQ6: 'on', q6ToLoad: 'on' },
  },
  bypass: {
    label: 'Bypass',
    blurb: 'An operator transfers the static switch to bypass — Q3 opens, Q5 closes, and the load is now fed straight from utility. The UPS module stays powered and ready (rectifier still floating the battery) so it can be transferred back at any time.',
    breakers: { q1: 'closed', dcds: 'closed', q3: 'open', q5: 'closed', q6: 'closed' },
    utility: 'normal', rectifier: 'normal', inverter: 'standby', staticSwitch: 'bypass',
    wires: { uToQ1: 'on', q1ToRec: 'on', recToDc: 'on', dcToInv: 'on', invToQ3: 'on', q3ToSS: 'off', uToQ5: 'on', q5ToSS: 'on', ssToQ6: 'on', q6ToLoad: 'on' },
  },
  maintenance: {
    label: 'Maintenance Bypass',
    blurb: 'The entire UPS module is isolated — Q1, DCDS, and Q3 all open — while the load runs on raw utility through Q5. This is what makes it safe to LOTO the UPS itself and work inside it with the load still up.',
    breakers: { q1: 'open', dcds: 'open', q3: 'open', q5: 'closed', q6: 'closed' },
    utility: 'normal', rectifier: 'off', inverter: 'off', staticSwitch: 'bypass',
    wires: { uToQ1: 'on', q1ToRec: 'off', recToDc: 'off', dcToInv: 'off', invToQ3: 'off', q3ToSS: 'off', uToQ5: 'on', q5ToSS: 'on', ssToQ6: 'on', q6ToLoad: 'on' },
  },
};

const COLOR: Record<WireState, string> = { on: '#22c55e', off: '#475569', fault: '#ef4444' };
const COMP_COLOR: Record<CompState, string> = { normal: '#22c55e', standby: '#f59e0b', fault: '#ef4444', off: '#475569' };

function Wire({ x1, y1, x2, y2, state }: { x1: number; y1: number; x2: number; y2: number; state: WireState }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLOR[state]} strokeWidth={3} strokeDasharray={state === 'off' ? '5 4' : undefined} />;
}

function Breaker({ cx, cy, pos, label }: { cx: number; cy: number; pos: BreakerPos; label: string }) {
  const closed = pos === 'closed';
  return (
    <g>
      <rect x={cx - 8} y={cy - 8} width={16} height={16} rx={2}
        fill={closed ? '#e2e8f0' : '#0f172a'} stroke={closed ? '#e2e8f0' : '#64748b'} strokeWidth={2} />
      <text x={cx} y={cy - 16} textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="ui-monospace, monospace">{label}</text>
    </g>
  );
}

function Box({ x, y, w, h, label, state }: { x: number; y: number; w: number; h: number; label: string; state: CompState }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="#0f172a" stroke={COMP_COLOR[state]} strokeWidth={2.5} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="12" fontWeight={600} fill={COMP_COLOR[state]} fontFamily="ui-monospace, monospace">{label}</text>
    </g>
  );
}

export function UpsTopologySimulator() {
  const [mode, setMode] = useState<Mode>('online');
  const s = MODES[mode];

  return (
    <div>
      {/* Mode buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
              mode === m
                ? m === 'mainsFail' ? 'border-red-600 bg-red-950/30 text-red-300'
                : m === 'maintenance' ? 'border-amber-600 bg-amber-950/30 text-amber-300'
                : 'border-blue-600 bg-blue-950/30 text-blue-300'
                : 'border-gray-700 bg-gray-800/60 text-gray-300 hover:border-gray-500'
            }`}
            aria-pressed={mode === m}
          >
            {MODES[m].label}
          </button>
        ))}
      </div>

      {/* Diagram */}
      <div className="rounded-lg border border-gray-800 bg-gray-950 p-2 overflow-x-auto">
        <svg viewBox="0 0 860 320" className="w-full min-w-[640px]" role="img" aria-label={`UPS one-line diagram in ${s.label} mode`}>
          {/* Utility source */}
          <g>
            <circle cx={40} cy={160} r={22} fill="none" stroke={COMP_COLOR[s.utility]} strokeWidth={2.5} />
            <path d="M 30 165 L 36 152 L 44 168 L 50 155" fill="none" stroke={COMP_COLOR[s.utility]} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <text x={40} y={200} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="ui-monospace, monospace">UTILITY</text>
          </g>

          {/* Branch to top (main) path */}
          <Wire x1={62} y1={160} x2={90} y2={160} state={s.utility === 'fault' ? 'fault' : 'on'} />
          <Wire x1={90} y1={160} x2={90} y2={70} state={s.wires.uToQ1} />
          <Wire x1={90} y1={70} x2={112} y2={70} state={s.wires.uToQ1} />
          <Breaker cx={130} cy={70} pos={s.breakers.q1} label="Q1" />
          <Wire x1={148} y1={70} x2={175} y2={70} state={s.wires.q1ToRec} />
          <Box x={175} y={50} w={75} h={40} label="RECTIFIER" state={s.rectifier} />
          <Wire x1={250} y1={70} x2={278} y2={70} state={s.wires.recToDc} />
          <Breaker cx={296} cy={70} pos={s.breakers.dcds} label="DCDS" />
          <Wire x1={314} y1={70} x2={340} y2={70} state={s.wires.dcToInv} />
          <Box x={340} y={50} w={75} h={40} label="INVERTER" state={s.inverter} />
          <Wire x1={415} y1={70} x2={443} y2={70} state={s.wires.invToQ3} />
          <Breaker cx={461} cy={70} pos={s.breakers.q3} label="Q3" />
          <Wire x1={477} y1={70} x2={505} y2={70} state={s.wires.q3ToSS} />
          <Wire x1={505} y1={70} x2={505} y2={148} state={s.wires.q3ToSS} />

          {/* Branch to bottom (bypass) path */}
          <Wire x1={62} y1={160} x2={90} y2={160} state="on" />
          <Wire x1={90} y1={160} x2={90} y2={250} state={s.wires.uToQ5} />
          <Wire x1={90} y1={250} x2={252} y2={250} state={s.wires.uToQ5} />
          <Breaker cx={270} cy={250} pos={s.breakers.q5} label="Q5 (Bypass)" />
          <Wire x1={288} y1={250} x2={505} y2={250} state={s.wires.q5ToSS} />
          <Wire x1={505} y1={250} x2={505} y2={172} state={s.wires.q5ToSS} />

          {/* Static switch */}
          <g>
            <circle cx={505} cy={160} r={14} fill="#0f172a" stroke="#94a3b8" strokeWidth={2} />
            <text x={505} y={164} textAnchor="middle" fontSize="10" fontWeight={700} fill="#e2e8f0">SS</text>
            <text x={505} y={200} textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="ui-monospace, monospace">
              STATIC SWITCH — {s.staticSwitch === 'inverter' ? 'on inverter' : 'on bypass'}
            </text>
          </g>

          {/* Output */}
          <Wire x1={519} y1={160} x2={547} y2={160} state={s.wires.ssToQ6} />
          <Breaker cx={565} cy={160} pos={s.breakers.q6} label="Q6" />
          <Wire x1={581} y1={160} x2={640} y2={160} state={s.wires.q6ToLoad} />

          {/* Load */}
          <g>
            <rect x={640} y={130} width={110} height={60} rx={6} fill="#0f172a" stroke={COLOR[s.wires.q6ToLoad]} strokeWidth={2.5} />
            <rect x={654} y={142} width={82} height={8} rx={2} fill={COLOR[s.wires.q6ToLoad]} opacity={0.5} />
            <rect x={654} y={156} width={82} height={8} rx={2} fill={COLOR[s.wires.q6ToLoad]} opacity={0.5} />
            <rect x={654} y={170} width={82} height={8} rx={2} fill={COLOR[s.wires.q6ToLoad]} opacity={0.5} />
            <text x={695} y={205} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="ui-monospace, monospace">CRITICAL LOAD</text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: COLOR.on }} /> Energized</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: COLOR.off }} /> Open / not in use</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: COLOR.fault }} /> Lost / abnormal</span>
      </div>

      {/* Explanation */}
      <div className="mt-4 rounded-lg border border-gray-800 bg-gray-800/30 p-4" aria-live="polite">
        <p className="text-sm font-semibold text-white">{s.label}</p>
        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{s.blurb}</p>
      </div>
    </div>
  );
}
