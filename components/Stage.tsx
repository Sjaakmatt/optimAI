'use client';

import { AnimatePresence } from 'motion/react';
import type { Artifact, StageItem } from '@/lib/types';
import { CheckCard } from './CheckCard';
import { ReasoningLine } from './ReasoningLine';
import { EmailArtifact } from './artifacts/EmailArtifact';
import { InvoiceArtifact } from './artifacts/InvoiceArtifact';
import { CallNoteArtifact } from './artifacts/CallNoteArtifact';
import { OrderConfirmationArtifact } from './artifacts/OrderConfirmationArtifact';
import { InternalMemoArtifact } from './artifacts/InternalMemoArtifact';
import { QuoteArtifact } from './artifacts/QuoteArtifact';
import { WhatsAppThreadArtifact } from './artifacts/WhatsAppThreadArtifact';
import { PickingListArtifact } from './artifacts/PickingListArtifact';
import { StockMutationArtifact } from './artifacts/StockMutationArtifact';
import { TransportPlanArtifact } from './artifacts/TransportPlanArtifact';
import { CalendarItemArtifact } from './artifacts/CalendarItemArtifact';

interface Props {
  items: StageItem[];
}

export function Stage({ items }: Props) {
  if (items.length === 0) return null;

  // Find latest artifact id — used to keep focus on the most recent one
  const latestArtifactId = [...items]
    .reverse()
    .find((it) => it.kind === 'artifact')?.id;

  return (
    <div className="space-y-6">
      <AnimatePresence initial={false} mode="popLayout">
        {items.map((item) => {
          if (item.kind === 'check') {
            return <CheckCard key={item.id} check={item.check} />;
          }
          if (item.kind === 'reasoning') {
            return <ReasoningLine key={item.id} reasoning={item.reasoning} />;
          }
          const isLatest = item.id === latestArtifactId;
          return (
            <ArtifactDispatcher
              key={item.id}
              artifact={item.artifact}
              isLatest={isLatest}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function ArtifactDispatcher({
  artifact,
  isLatest,
}: {
  artifact: Artifact;
  isLatest: boolean;
}) {
  // Older completed artifacts get a 'tucked' visual treatment via wrapper class
  const tucked = !isLatest && artifact.state === 'complete';
  const wrapperClass = tucked
    ? 'transition-all duration-700 ease-out opacity-70 scale-[0.95] origin-top'
    : 'transition-all duration-700 ease-out';

  const inner = (() => {
    switch (artifact.type) {
      case 'email':
        return <EmailArtifact artifact={artifact} />;
      case 'invoice':
        return <InvoiceArtifact artifact={artifact} />;
      case 'callnote':
        return <CallNoteArtifact artifact={artifact} />;
      case 'order-confirmation':
        return <OrderConfirmationArtifact artifact={artifact} />;
      case 'memo':
        return <InternalMemoArtifact artifact={artifact} />;
      case 'quote':
        return <QuoteArtifact artifact={artifact} />;
      case 'whatsapp':
        return <WhatsAppThreadArtifact artifact={artifact} />;
      case 'picking-list':
        return <PickingListArtifact artifact={artifact} />;
      case 'stock-mutation':
        return <StockMutationArtifact artifact={artifact} />;
      case 'transport-plan':
        return <TransportPlanArtifact artifact={artifact} />;
      case 'calendar-item':
        return <CalendarItemArtifact artifact={artifact} />;
    }
  })();

  return <div className={wrapperClass}>{inner}</div>;
}
