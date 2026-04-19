'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '@/lib/store';
import { WorkbenchHeader } from './WorkbenchHeader';
import { StatusStrip } from './StatusStrip';
import { TodayPanel } from './TodayPanel';
import { ActiveTicket } from './ActiveTicket';
import { PickupLine } from './PickupLine';
import { CompletedList } from './CompletedList';
import { EventTrigger } from './EventTrigger';
import { PolicyPanel } from './PolicyPanel';
import { ArtifactStage } from './artifacts/ArtifactStage';

export function Workbench() {
  const activeEventId = useStore((s) => s.activeEventId);
  const events = useStore((s) => s.events);
  const artifacts = useStore((s) => s.artifacts);
  const statusText = useStore((s) => s.statusText);

  const activeEvent = events.find((e) => e.id === activeEventId);

  return (
    <div className="flex flex-col min-h-screen">
      <WorkbenchHeader />

      <main className="flex-1 relative">
        <div className="mx-auto max-w-[1080px] px-4 sm:px-8 py-16 space-y-10">
          <AnimatePresence mode="wait">
            {activeEvent ? (
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                <ActiveTicket event={activeEvent} />
                <PickupLine text={statusText} />
                <ArtifactStage artifacts={artifacts} />
              </motion.div>
            ) : (
              <EmptyState key="empty" />
            )}
          </AnimatePresence>

          <CompletedList />
        </div>

        <div className="hidden md:block fixed bottom-16 right-8 z-10">
          <TodayPanel />
        </div>
      </main>

      <StatusStrip />
      <PolicyPanel />
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-[560px] text-center py-16 space-y-6"
    >
      <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
        Rustig op de werkbank
      </div>
      <p className="font-display text-[22px] leading-[1.35] text-[var(--ink)]">
        Trigger een event om te zien hoe het werk zich ontvouwt
      </p>
      <p className="text-[14px] text-[var(--ink-dim)] leading-[1.6]">
        Mails, facturen, belnotities en offertes verschijnen hier — regel voor regel, alsof
        iemand aan de andere kant van de tafel ze voor u uitwerkt.
      </p>
      <div className="pt-4 flex justify-center">
        <EventTrigger />
      </div>
    </motion.div>
  );
}
