'use client';

import { useStore } from '@/lib/store';
import { EventTrigger } from './EventTrigger';

export function FloatingTrigger() {
  const activeEventId = useStore((s) => s.activeEventId);
  const completed = useStore((s) => s.completed);

  // Toon als er iets actief is of er al afgehandelde zaken zijn.
  // In empty-state staat de trigger al centraal.
  if (!activeEventId && completed.length === 0) return null;

  return (
    <div className="fixed bottom-16 left-8 z-20">
      <EventTrigger />
    </div>
  );
}
