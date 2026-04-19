'use client';

import { AnimatePresence } from 'motion/react';
import type { Artifact } from '@/lib/types';
import { EmailArtifact } from './EmailArtifact';
import { InvoiceArtifact } from './InvoiceArtifact';
import { CallNoteArtifact } from './CallNoteArtifact';
import { OrderConfirmationArtifact } from './OrderConfirmationArtifact';
import { InternalMemoArtifact } from './InternalMemoArtifact';
import { QuoteArtifact } from './QuoteArtifact';
import { WhatsAppThreadArtifact } from './WhatsAppThreadArtifact';

interface Props {
  artifacts: Artifact[];
}

export function ArtifactStage({ artifacts }: Props) {
  if (artifacts.length === 0) return null;

  return (
    <div className="space-y-10">
      <AnimatePresence initial={false} mode="popLayout">
        {artifacts.map((artifact) => (
          <ArtifactDispatcher key={artifact.id} artifact={artifact} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ArtifactDispatcher({ artifact }: { artifact: Artifact }) {
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
  }
}
