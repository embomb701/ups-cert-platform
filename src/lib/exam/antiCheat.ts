/**
 * Anti-cheat event types and risk scoring.
 * This module is imported by both client components (event collection)
 * and server routes (risk scoring).
 */

import type { SuspiciousEvent, SuspiciousRiskLevel } from '@/types';

// Event weights for risk scoring
const EVENT_WEIGHTS: Record<string, number> = {
  // Browser-based events
  tab_switch: 3,
  blur: 1,
  visibility_change: 2,
  fullscreen_exit: 2,
  copy_attempt: 4,
  paste_attempt: 4,
  cut_attempt: 4,
  right_click: 2,
  text_selection: 1,
  devtools_detected: 10,
  // AI camera events — weighted higher since camera confirms physical behavior
  ai_looking_away: 5,   // face turned away from screen
  ai_no_face: 8,        // candidate left the camera view entirely
  ai_multiple_faces: 10, // another person visible — highest camera risk
};

export function calculateRiskScore(events: SuspiciousEvent[]): number {
  let score = 0;
  for (const e of events) {
    const weight = EVENT_WEIGHTS[e.type] ?? 1;
    score += Math.min(e.count * weight, weight * 5); // cap per event type
  }
  return score;
}

export function classifyRiskLevel(score: number): SuspiciousRiskLevel {
  if (score <= 5) return 'low';
  if (score <= 15) return 'medium';
  if (score <= 30) return 'high';
  return 'critical';
}

export function shouldFlagForReview(level: SuspiciousRiskLevel): boolean {
  return level === 'high' || level === 'critical';
}

// Browser-side event handler setup
export interface AntiCheatCallbacks {
  onEvent: (type: SuspiciousEvent['type']) => void;
}

export function setupAntiCheatListeners(callbacks: AntiCheatCallbacks): () => void {
  const { onEvent } = callbacks;

  const handleVisibilityChange = () => {
    if (document.hidden) onEvent('visibility_change');
  };

  const handleBlur = () => onEvent('blur');

  const handleCopy = (e: ClipboardEvent) => {
    e.preventDefault();
    onEvent('copy_attempt');
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    onEvent('paste_attempt');
  };

  const handleCut = (e: ClipboardEvent) => {
    e.preventDefault();
    onEvent('cut_attempt');
  };

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    onEvent('right_click');
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) onEvent('fullscreen_exit');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'u')
    ) {
      e.preventDefault();
      onEvent('devtools_detected');
    }
    // Block Ctrl+A (select all)
    if (e.ctrlKey && e.key === 'a') {
      e.preventDefault();
      onEvent('text_selection');
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('blur', handleBlur);
  document.addEventListener('copy', handleCopy as EventListener);
  document.addEventListener('paste', handlePaste as EventListener);
  document.addEventListener('cut', handleCut as EventListener);
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('keydown', handleKeyDown);

  // Cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('blur', handleBlur);
    document.removeEventListener('copy', handleCopy as EventListener);
    document.removeEventListener('paste', handlePaste as EventListener);
    document.removeEventListener('cut', handleCut as EventListener);
    document.removeEventListener('contextmenu', handleContextMenu);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    document.removeEventListener('keydown', handleKeyDown);
  };
}
