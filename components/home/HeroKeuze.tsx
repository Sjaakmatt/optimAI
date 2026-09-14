'use client';

// Kiest het landschap: bos is de standaard, ?landschap=polder laat de andere
// variant zien. Via de querystring, zodat de homepage statisch blijft. De
// hero en het slot lezen dezelfde keuze, want het is één landschap dat van
// schemering naar dageraad gaat.

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Hero } from './Hero';
import { Dageraad } from './Dageraad';
import type { LandschapVariant } from './Landschap';

function useLandschapVariant(): LandschapVariant {
  const params = useSearchParams();
  return params.get('landschap') === 'polder' ? 'polder' : 'bos';
}

function HeroMetKeuze() {
  return <Hero variant={useLandschapVariant()} />;
}

function DageraadMetKeuze() {
  return <Dageraad variant={useLandschapVariant()} />;
}

export function HeroKeuze() {
  return (
    <Suspense fallback={<Hero variant="bos" />}>
      <HeroMetKeuze />
    </Suspense>
  );
}

export function DageraadKeuze() {
  return (
    <Suspense fallback={<Dageraad variant="bos" />}>
      <DageraadMetKeuze />
    </Suspense>
  );
}
