'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { OrderConfirmationArtifact } from '@/components/artifacts/OrderConfirmationArtifact';
import { InvoiceArtifact } from '@/components/artifacts/InvoiceArtifact';
import { CalendarItemArtifact } from '@/components/artifacts/CalendarItemArtifact';
import { MAKEN_ORDER, MAKEN_FACTUUR, MAKEN_PLANNING, type SceneProps } from '../film-content';

/**
 * Halte 3. De orderketen op papier: orderbevestiging, factuur met
 * exportdocumentatie en de verpakkingsplanning. De orderbevestiging
 * krijgt de ruimte; factuur en planning stapelen ernaast.
 */
export function SceneMaken({ beat, reduced }: SceneProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[1.2fr_1fr] md:gap-6">
      <Paper visible={reduced || beat >= 1} rotate={-1.4} reduced={reduced}>
        <OrderConfirmationArtifact artifact={MAKEN_ORDER} />
      </Paper>
      <div className="flex flex-col gap-4">
        <Paper visible={reduced || beat >= 2} rotate={1.3} reduced={reduced}>
          <InvoiceArtifact artifact={MAKEN_FACTUUR} />
        </Paper>
        <Paper visible={reduced || beat >= 3} rotate={-0.9} reduced={reduced}>
          <CalendarItemArtifact artifact={MAKEN_PLANNING} />
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
