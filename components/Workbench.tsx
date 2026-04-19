'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '@/lib/store';
import { WorkbenchHeader } from './WorkbenchHeader';
import { CockpitHeader } from './CockpitHeader';
import { StatusStrip } from './StatusStrip';
import { TodayPanel } from './TodayPanel';
import { ActiveTicket } from './ActiveTicket';
import { PickupLine } from './PickupLine';
import { CompletedList } from './CompletedList';
import { CompletedViewer } from './CompletedViewer';
import { PolicyPanel } from './PolicyPanel';
import { DossierStrip } from './DossierStrip';
import { Stage } from './Stage';
import { AutonomousRunner } from './AutonomousRunner';
import { AgentDiagram } from './AgentDiagram';

export function Workbench() {
  const activeEventId = useStore((s) => s.activeEventId);
  const events = useStore((s) => s.events);
  const stageItems = useStore((s) => s.stageItems);
  const statusText = useStore((s) => s.statusText);
  const viewingCompletedId = useStore((s) => s.viewingCompletedId);
  const completed = useStore((s) => s.completed);

  const activeEvent = events.find((e) => e.id === activeEventId);
  const viewingEvent = viewingCompletedId
    ? completed.find((c) => c.id === viewingCompletedId)
    : null;

  // Viewer takes precedence over active/empty.
  // (Triggering a new event automatically clears viewing — see store.triggerEvent.)
  const showViewer = !!viewingEvent;
  const showActive = !showViewer && !!activeEvent;

  return (
    <div className="flex flex-col min-h-screen">
      <WorkbenchHeader />
      <CockpitHeader />

      <main className="flex-1 relative">
        <div className="mx-auto max-w-[1080px] px-4 sm:px-8 pt-6 pb-12 space-y-6">
          <AgentDiagram />

          <AnimatePresence mode="wait">
            {showViewer && viewingEvent ? (
              <CompletedViewer key={`viewer-${viewingEvent.id}`} event={viewingEvent} />
            ) : showActive && activeEvent ? (
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-6"
              >
                <ActiveTicket event={activeEvent} />
                <DossierStrip />
                <PickupLine text={statusText} />
                <Stage items={stageItems} />
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
      <AutonomousRunner />
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
      className="mx-auto max-w-[560px] text-center py-8 space-y-3"
    >
      <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
        Rustig op de werkbank
      </div>
      <p className="text-[14px] text-[var(--ink-dim)] leading-[1.6] max-w-[440px] mx-auto">
        Trigger via De Dirigent een event — mails, facturen, belnotities, pakbonnen en
        transportplannen ontstaan hieronder, regel voor regel.
      </p>
    </motion.div>
  );
}
