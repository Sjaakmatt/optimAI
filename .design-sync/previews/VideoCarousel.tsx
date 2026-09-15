import { useEffect, useRef } from 'react';
import { VideoCarousel } from 'factumai-demo';

/** Typt een zoekterm in het zoekveld van de bibliotheek zoals een bezoeker dat zou doen. */
function useZoekterm(ref: React.RefObject<HTMLDivElement | null>, term: string) {
  useEffect(() => {
    const input = ref.current?.querySelector<HTMLInputElement>('input[type="search"]');
    if (!input) return;
    const zet = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    zet?.call(input, term);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }, [ref, term]);
}

/** Op de homepage: kop, intro met pijlen, en de rail met video's die je kunt swipen. */
export function OpDeHomepage() {
  return (
    <div className="home-world">
      <VideoCarousel />
    </div>
  );
}

/** De videopagina (library): h1, zoekveld met teller, en alle video's in een raster. */
export function Bibliotheek() {
  return <VideoCarousel library />;
}

/** In de bibliotheek gezocht op "mailbox": één treffer, de teller telt mee. */
export function Gezocht() {
  const ref = useRef<HTMLDivElement>(null);
  useZoekterm(ref, 'mailbox');
  return (
    <div ref={ref}>
      <VideoCarousel library />
    </div>
  );
}

/** Zoekterm zonder treffer: de lege staat met de uitnodiging om iets anders te proberen. */
export function NietsGevonden() {
  const ref = useRef<HTMLDivElement>(null);
  useZoekterm(ref, 'boekhouding');
  return (
    <div ref={ref}>
      <VideoCarousel library />
    </div>
  );
}
