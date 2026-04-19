'use client';

import { useEffect, useRef } from 'react';
import { useStore, ALL_SCENARIOS } from '@/lib/store';

// Kiest elke 15-25s een event dat niet recent is gespeeld.
export function AutonomousRunner() {
  const mode = useStore((s) => s.mode);
  const isPlaying = useStore((s) => s.isPlaying);
  const recent = useStore((s) => s.recentlyPlayedScenarioIds);
  const triggerEvent = useStore((s) => s.triggerEvent);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mode !== 'autonomous') {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      return;
    }
    if (isPlaying) return;

    const delay = 15_000 + Math.random() * 10_000;
    timerRef.current = setTimeout(() => {
      const available = ALL_SCENARIOS.filter((s) => !recent.includes(s.id));
      const pool = available.length ? available : ALL_SCENARIOS;
      const next = pool[Math.floor(Math.random() * pool.length)];
      if (next) void triggerEvent(next.id);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [mode, isPlaying, recent, triggerEvent]);

  return null;
}
