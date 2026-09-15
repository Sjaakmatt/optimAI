'use client';

// De onderhoudspagina: dezelfde polder als aan het slot van de homepage, in
// dageraadlicht. De boodschap is kort: we zijn even bezig, zo bereikt u ons
// intussen. Geen menu, want elke link zou hier toch weer uitkomen.

import { useLayoutEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import { zetOnderhoudPagina } from '@/lib/site/onderhoudPagina';
import { Woordmerk } from '@/components/site/Woordmerk';
import { useMuisParallax } from '@/components/home/Landschap';
import { PolderFoto, POLDER_DAGERAAD } from '@/components/home/PolderFoto';
import { Opkomend, Verschijn } from '@/components/home/Opkomend';

export function Onderhoud() {
  const { ref, muisX, muisY } = useMuisParallax();

  // Meld de pagina aan, zodat chatknop en cookiebanner wegblijven (zie lib/site/onderhoudPagina.ts).
  useLayoutEffect(() => {
    zetOnderhoudPagina(true);
    return () => zetOnderhoudPagina(false);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden dageraad-lucht-foto"
      style={{ '--hero-lucht-top': '#6d7e98' } as React.CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 korrel" />
      {/* Donkere band over de bovenste helft, zodat de tekst op brede schermen
          niet in de lichte dageraadlucht staat; loopt uit vóór de horizon. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] hidden h-[62%] md:block"
        style={{ background: 'linear-gradient(180deg, rgba(10,10,12,0.78) 0%, rgba(10,10,12,0.62) 45%, rgba(10,10,12,0.32) 78%, rgba(10,10,12,0) 100%)' }}
      />

      <header className="relative z-10 band flex w-full items-center justify-between pt-6">
        <span className="rounded-full border border-white/10 bg-[rgba(14,13,20,0.62)] px-4 py-2 backdrop-blur-md">
          <Woordmerk />
        </span>
        <span className="chip">
          <span className="chip-punt" aria-hidden />
          Onderhoud
        </span>
      </header>

      <div className="relative z-10 band pt-16 text-center sm:pt-24 lg:pt-32">
        <Opkomend
          as="h1"
          inView
          vertraging={0.1}
          className="mx-auto max-w-[900px] font-display text-[36px] leading-[1.04] tracking-[-0.03em] text-[var(--fg)] sm:text-[52px] lg:text-[64px]"
          regels={['Even bezig achter de schermen.', 'Zo zijn we terug.']}
        />
        <Verschijn inView vertraging={0.35}>
          <p className="mx-auto mt-6 max-w-[540px] text-[16px] leading-[1.65] text-[var(--fg-dim)] sm:text-[17px]">
            De website wordt op dit moment bijgewerkt en is tijdelijk niet bereikbaar. Probeer het
            over een uur nog eens. Heeft u ons eerder nodig, dan zijn we gewoon te bereiken.
          </p>
        </Verschijn>
        <Verschijn inView vertraging={0.5} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:info@factumai.nl" className="knop knop-primair">
            <Mail size={15} strokeWidth={2} />
            info@factumai.nl
          </a>
          <a href="tel:+31610555658" className="knop knop-glas">
            <Phone size={15} strokeWidth={2} />
            06 10 55 56 58
          </a>
        </Verschijn>
      </div>

      {/* Op telefoons staat de polder hier als eigen band; op brede schermen
          absoluut onderin de sectie, over de volle breedte. */}
      <div className="relative z-0 mt-10 md:static md:m-0">
        <PolderFoto scene={POLDER_DAGERAAD} muisX={muisX} muisY={muisY} x="50%" mobielInStroom />
      </div>
      <div className="hidden md:block h-[54vh] min-h-[420px]" aria-hidden />
    </section>
  );
}
