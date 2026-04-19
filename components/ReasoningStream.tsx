'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useStore } from '@/lib/store';
import { ReasoningMessage } from '@/components/ReasoningMessage';

export function ReasoningStream() {
  const messages = useStore((s) => s.messages);
  const activeEventId = useStore((s) => s.activeEventId);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const userScrolledRef = useRef(false);

  const visible = useMemo(() => {
    if (!activeEventId) return messages;
    // Toon messages van actieve event + eerdere events voor context (max 2 extra terug).
    const eventOrder: string[] = [];
    for (const m of messages) {
      if (!eventOrder.includes(m.eventId)) eventOrder.push(m.eventId);
    }
    const activeIndex = eventOrder.indexOf(activeEventId);
    if (activeIndex === -1) return messages;
    const allowed = new Set(eventOrder.slice(Math.max(0, activeIndex - 2)));
    return messages.filter((m) => allowed.has(m.eventId));
  }, [messages, activeEventId]);

  // Auto-scroll behalve wanneer user handmatig naar boven scrolde.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (userScrolledRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [visible]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    userScrolledRef.current = !atBottom;
  };

  return (
    <div className="flex flex-col h-full border-l border-[var(--border)] bg-[var(--bg-elev)]">
      <div className="p-4 border-b border-[var(--border)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
          Live stream
        </div>
        <div className="font-display text-[18px] leading-tight text-[var(--text)]">
          Reasoning
        </div>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
        {visible.length === 0 && (
          <div className="p-6 text-[12px] text-[var(--text-faint)] leading-relaxed">
            Zodra een event binnenkomt verschijnen hier de redeneringen, delegaties en rapporten
            van de agents — in realtime.
          </div>
        )}
        {visible.map((m) => (
          <ReasoningMessage key={m.id} message={m} />
        ))}
      </div>
    </div>
  );
}
