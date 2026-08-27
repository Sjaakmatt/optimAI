'use client';

// De rij klantlogo's onder "In productie bij".
//
// Past de rij binnen de beschikbare breedte, dan staat hij stil. Past hij niet,
// dan schuift hij door in plaats van af te breken naar meerdere regels. Dat is
// een meting en geen breekpunt: bij welke breedte het omslaat hangt af van hoe
// breed de logo's zelf zijn, en er komen er nog bij. Een vaste `sm:`-grens zou
// bij de volgende klant weer niet kloppen.
//
// De snelheid staat vast in pixels per seconde, niet in seconden per omloop.
// Anders gaat de band harder lopen zodra er een logo bij komt.

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import type { CaseStudy } from '@/lib/data/cases';

/** Loopsnelheid van de band. Rustig genoeg om een logo te herkennen. */
const PIXELS_PER_SECONDE = 42;

export function Logostrook({ klanten }: { klanten: CaseStudy[] }) {
  const strookRef = useRef<HTMLDivElement>(null);
  const rijRef = useRef<HTMLUListElement>(null);
  const [schuift, setSchuift] = useState(false);
  const [duur, setDuur] = useState(0);

  const meet = useCallback(() => {
    const strook = strookRef.current;
    const rij = rijRef.current;
    if (!strook || !rij) return;

    // De rij staat op `width: max-content`, dus dit is de breedte die hij
    // nodig heeft, ook als hij nu al ingekort wordt weergegeven.
    const nodig = rij.scrollWidth;
    const beschikbaar = strook.clientWidth;
    setSchuift(nodig > beschikbaar + 1);
    setDuur(nodig / PIXELS_PER_SECONDE);
  }, []);

  useEffect(() => {
    meet();

    const strook = strookRef.current;
    if (!strook) return;

    const observer = new ResizeObserver(meet);
    observer.observe(strook);

    // De logo's zijn SVG's met een eigen verhouding; hun breedte staat pas
    // vast als ze geladen zijn. Zonder deze meting klopt de eerste te vroeg.
    const plaatjes = Array.from(strook.querySelectorAll('img'));
    const nietKlaar = plaatjes.filter((img) => !img.complete);
    for (const img of nietKlaar) img.addEventListener('load', meet, { once: true });

    return () => {
      observer.disconnect();
      for (const img of nietKlaar) img.removeEventListener('load', meet);
    };
  }, [meet]);

  return (
    <div
      ref={strookRef}
      className={`logo-strook min-w-0 flex-1 ${schuift ? 'schuift' : ''}`}
      style={duur > 0 ? { ['--logo-marquee-duur' as string]: `${duur.toFixed(1)}s` } : undefined}
    >
      <div className="logo-spoor">
        <ul ref={rijRef} className="logo-rij">
          {klanten.map((klant) => (
            <li key={klant.slug}>
              <KlantLogo klant={klant} />
            </li>
          ))}
        </ul>

        {/* De tweede rij maakt de lus rond. Voor schermlezers en toetsenbord
            bestaat hij niet, anders staat elke klant er twee keer in. */}
        {schuift && (
          <ul className="logo-rij logo-kopie" aria-hidden>
            {klanten.map((klant) => (
              <li key={klant.slug}>
                <KlantLogo klant={klant} kopie />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function KlantLogo({ klant, kopie = false }: { klant: CaseStudy; kopie?: boolean }) {
  return (
    <Link
      href={`/cases/${klant.slug}`}
      title={kopie ? undefined : `${klant.klant}, bekijk de case`}
      aria-label={kopie ? undefined : `Case: ${klant.klant}, ${klant.tagline}`}
      tabIndex={kopie ? -1 : undefined}
      className="group block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={klant.logo}
        alt={kopie ? '' : klant.klant}
        className="h-12 w-auto object-contain grayscale opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14"
      />
    </Link>
  );
}
