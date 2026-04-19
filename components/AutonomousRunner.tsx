'use client';

import { useEffect, useRef } from 'react';
import { useStore, ALL_SCENARIOS } from '@/lib/store';

export function AutonomousRunner() {
  const mode = useStore((s) => s.mode);
  const isPlaying = useStore((s) => s.isPlaying);
  const recent = useStore((s) => s.recentlyPlayedScenarioIds);
  const trigger = useStore((s) => s.triggerEvent);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mode !== 'autonomous' || isPlaying) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const wait = 18000 + Math.random() * 7000; // 18-25s
    timerRef.current = setTimeout(() => {
      const candidates = ALL_SCENARIOS.filter((s) => !recent.includes(s.id));
      const pool = candidates.length > 0 ? candidates : ALL_SCENARIOS;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      void trigger(pick.id);
    }, wait);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [mode, isPlaying, recent, trigger]);

  return null;
}
