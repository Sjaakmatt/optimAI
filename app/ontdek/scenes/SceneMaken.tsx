'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { QuoteArtifact } from '@/components/artifacts/QuoteArtifact';
import { WhatsAppThreadArtifact } from '@/components/artifacts/WhatsAppThreadArtifact';
import { CalendarItemArtifact } from '@/components/artifacts/CalendarItemArtifact';
import { MAKEN_QUOTE, MAKEN_WHATSAPP, MAKEN_AGENDA, type SceneProps } from '../film-content';

/**
 * Halte 3. Papieren op het bureau: een offerte, een appje, een
 * agenda-afspraak. Dezelfde documentkaarten als in de Werkbank.
 * De offerte krijgt de ruimte (tabel), appje en agenda stapelen ernaast.
 */
export function SceneMaken({ beat, reduced }: SceneProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[1.2fr_1fr] md:gap-6">
      <Paper visible={reduced || beat >= 1} rotate={-1.4} reduced={reduced}>
        <QuoteArtifact artifact={MAKEN_QUOTE} />
      </Paper>
      <div className="flex flex-col gap-4">
        <Paper visible={reduced || beat >= 2} rotate={1.3} reduced={reduced}>
          <WhatsAppThreadArtifact artifact={MAKEN_WHATSAPP} />
        </Paper>
        <Paper visible={reduced || beat >= 3} rotate={-0.9} reduced={reduced}>
          <CalendarItemArtifact artifact={MAKEN_AGENDA} />
        </Paper>
      </div>
    </div>
  );
}

function Paper({
  visible,
  rotate,
  reduced,
  children,
}: {
  visible: boolean;
  rotate: number;
  reduced: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26, rotate: rotate * 3 }}
      animate={
        visible
          ? { opacity: 1, y: 0, rotate: reduced ? 0 : rotate }
          : { opacity: 0, y: 26, rotate: rotate * 3 }
      }
      transition={{ type: 'spring', stiffness: 130, damping: 17 }}
      style={{ transformOrigin: 'top center' }}
      className="origin-top md:scale-[0.94]"
    >
      <div className="mx-auto w-full max-w-[480px] md:max-w-none">{children}</div>
    </motion.div>
  );
}
