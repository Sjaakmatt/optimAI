'use client';

import { useEffect } from 'react';
import { bootstrapCal } from './calLoader';
import { CAL_NAMESPACE } from './config';

const ELEMENT_ID = 'cal-inline-embed';

export function CalEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    const Cal = bootstrapCal();
    if (!Cal) return;

    Cal.ns[CAL_NAMESPACE]('inline', {
      elementOrSelector: `#${ELEMENT_ID}`,
      calLink,
      config: { layout: 'month_view', theme: 'light' },
    });
  }, [calLink]);

  return (
    <div
      id={ELEMENT_ID}
      style={{ width: '100%', minHeight: 720, overflow: 'auto' }}
    />
  );
}
