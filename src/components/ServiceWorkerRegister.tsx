'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    // Register after load so it never competes with the initial page fetch.
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Offline caching is a progressive enhancement — silently skip
        // if registration fails (unsupported browser, blocked, etc.).
      });
    });
  }, []);

  return null;
}
