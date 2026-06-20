'use client';

import { useEffect, useRef, useCallback } from 'react';
import { setupAntiCheatListeners } from '@/lib/exam/antiCheat';
import { getIdToken } from '@/lib/firebase/auth';
import type { SuspiciousEvent } from '@/types';

interface AntiCheatWrapperProps {
  attemptId: string;
  children: React.ReactNode;
  onSuspiciousEvent?: (type: SuspiciousEvent['type']) => void;
}

export function AntiCheatWrapper({
  attemptId,
  children,
  onSuspiciousEvent,
}: AntiCheatWrapperProps) {
  const eventQueue = useRef<{ type: SuspiciousEvent['type']; count: number }[]>([]);
  const flushTimer = useRef<NodeJS.Timeout | null>(null);

  const flushEvents = useCallback(async () => {
    const batch = [...eventQueue.current];
    eventQueue.current = [];
    if (batch.length === 0) return;

    try {
      const token = await getIdToken();
      await fetch('/api/exam/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ attemptId, events: batch }),
      });
    } catch {
      // Non-blocking — best effort
    }
  }, [attemptId]);

  const handleEvent = useCallback(
    (type: SuspiciousEvent['type']) => {
      // Update local queue
      const existing = eventQueue.current.find((e) => e.type === type);
      if (existing) {
        existing.count++;
      } else {
        eventQueue.current.push({ type, count: 1 });
      }

      // Notify parent
      onSuspiciousEvent?.(type);

      // Schedule flush
      if (flushTimer.current) clearTimeout(flushTimer.current);
      flushTimer.current = setTimeout(flushEvents, 2000);
    },
    [flushEvents, onSuspiciousEvent]
  );

  useEffect(() => {
    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    const cleanup = setupAntiCheatListeners({ onEvent: handleEvent });

    return () => {
      cleanup();
      if (flushTimer.current) clearTimeout(flushTimer.current);
      flushEvents(); // flush on unmount
    };
  }, [handleEvent, flushEvents]);

  return (
    <div
      className="exam-active select-none"
      onCopy={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
