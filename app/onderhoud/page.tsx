import type { Metadata } from 'next';
import { Onderhoud } from '@/components/onderhoud/Onderhoud';

export const metadata: Metadata = {
  title: 'Even onderhoud',
  description:
    'De website van FactumAI wordt op dit moment bijgewerkt en is tijdelijk niet bereikbaar. Probeer het over een uur nog eens.',
  robots: {
    index: false,
    follow: false,
  },
};

// Met ONDERHOUD_MODUS=true schrijft middleware.ts elke paginaweergave naar
// deze route (status 503). Zonder die vlag is hij gewoon te bekijken op
// /onderhoud, zodat je hem kunt nakijken voordat je de site erop zet.
export default function OnderhoudPagina() {
  return (
    <main className="relative">
      <Onderhoud />
    </main>
  );
}
