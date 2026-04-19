'use client';

import type { Artifact } from '@/lib/types';
import { EmailArtifact } from './EmailArtifact';
import { InvoiceArtifact } from './InvoiceArtifact';
import { CallNoteArtifact } from './CallNoteArtifact';
import { OrderConfirmationArtifact } from './OrderConfirmationArtifact';
import { InternalMemoArtifact } from './InternalMemoArtifact';
import { QuoteArtifact } from './QuoteArtifact';
import { WhatsAppThreadArtifact } from './WhatsAppThreadArtifact';
import { PickingListArtifact } from './PickingListArtifact';
import { StockMutationArtifact } from './StockMutationArtifact';
import { TransportPlanArtifact } from './TransportPlanArtifact';
import { CalendarItemArtifact } from './CalendarItemArtifact';

export function ArtifactView({ artifact }: { artifact: Artifact }) {
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
}
