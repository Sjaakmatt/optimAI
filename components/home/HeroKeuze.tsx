'use client';

// Kiest het landschap: bos is de standaard, ?landschap=polder laat de andere
// variant zien. Via de querystring, zodat de homepage statisch blijft.

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Hero } from './Hero';
import type { LandschapVariant } from './Landschap';

function HeroMetKeuze() {
  const params = useSearchParams();
  const variant: LandschapVariant = params.get('landschap') === 'polder' ? 'polder' : 'bos';
  return <Hero variant={variant} />;
}

export function HeroKeuze() {
  return (
    <Suspense fallback={<Hero variant="bos" />}>
      <HeroMetKeuze />
    </Suspense>
  );
}
