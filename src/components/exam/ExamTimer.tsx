'use client';

import { useEffect, useState } from 'react';

interface ExamTimerProps {
  secondsTotal: number;
  onExpire: () => void;
  className?: string;
}

export function ExamTimer({ secondsTotal, onExpire, className }: ExamTimerProps) {
  const [remaining, setRemaining] = useState(secondsTotal);

  useEffect(() => {
    setRemaining(secondsTotal);
  }, [secondsTotal]);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, onExpire]);

  const pct = (remaining / secondsTotal) * 100;
  const urgent = remaining <= 20;
  const warning = remaining <= 45;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono uppercase tracking-wide text-gray-500">Time remaining</span>
        <span
          className={`text-sm font-mono font-bold ${
            urgent ? 'text-red-400' : warning ? 'text-voltage-400' : 'text-gray-200'
          }`}
        >
          {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            urgent ? 'bg-red-500' : warning ? 'bg-voltage-500' : 'bg-arc-500'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
