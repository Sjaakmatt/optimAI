'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';
import { useInstellingen } from './instellingen';
import { EASE_UIT, STAGGER } from './tokens';

gsap.registerPlugin(SplitText, DrawSVGPlugin);

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

/**
 * De opening: de ademende 3D-kern van de agent met de titel die per
 * woord binnenvalt. In de rustige modus: een getekende, statische
 * poster met dezelfde inhoud, direct leesbaar.
 */
export function Held() {
  const { rustig } = useInstellingen();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (rustig) return;
      const titel = ref.current?.querySelector('h1');
      if (titel) {
        const split = SplitText.create(titel, { type: 'words' });
        gsap.from(split.words, {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          ease: EASE_UIT,
          stagger: STAGGER,
          delay: 0.25,
        });
      }
      gsap.from('[data-hero-sub]', { opacity: 0, y: 16, duration: 0.7, ease: EASE_UIT, delay: 0.7 });
      const hint = ref.current?.querySelectorAll<SVGPathElement>('[data-hint] path');
      if (hint?.length) {
        gsap.fromTo(
          hint,
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: 1.1, ease: EASE_UIT, delay: 1 },
        );
        gsap.to('[data-hint]', {
          y: 7,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: 'sine.inOut',
          delay: 2,
        });
      }
    },
    { scope: ref, dependencies: [rustig] },
  );

  return (
    <section
      ref={ref}
      aria-label="Ontdek FactumAI agents"
      className="relative flex min-h-[92vh] flex-col items-center justify-end overflow-hidden px-5 pb-[13vh] text-center"
    >
      {/* de kern van de agent */}
      {rustig ? (
        <div aria-hidden className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-[46vmin] w-[46vmin] rounded-full"
            style={{
              background:
                'radial-gradient(circle at 38% 32%, rgba(168,128,58,0.5), rgba(143,74,54,0.25) 55%, transparent 72%)',
            }}
          />
        </div>
      ) : (
        <Hero3D />
      )}

      <div className="relative z-10 max-w-[760px]">
        <div data-hero-sub className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--oker-deep)]">
          De wandeling · ± 4 minuten · scroll op uw eigen tempo
        </div>
        <h1 className="mt-5 overflow-hidden font-display text-[44px] sm:text-[64px] lg:text-[76px] leading-[1.02] tracking-tight text-[var(--ink)]">
          Ontdek FactumAI <span className="italic text-[var(--oker-deep)]">agents.</span>
        </h1>
        <p
          data-hero-sub
          className="mx-auto mt-6 max-w-[540px] text-[15px] sm:text-[17px] leading-[1.7] text-[var(--ink-dim)]"
        >
          Wat is een AI-agent, als je alle grote woorden weglaat? Loop mee door agent-land: zie hem
          lezen, denken, maken en overleggen. En vooral: netjes stoppen waar u het wilt.
        </p>
      </div>

      {/* scroll-hint */}
      <div data-hint aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <svg viewBox="0 0 24 44" className="h-[44px] w-[24px]" focusable="false">
          <path
            d="M12 4 C 5 10, 5 16, 12 22 C 19 28, 19 32, 12 40"
            fill="none"
            stroke="var(--oker-deep)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M7 34 L 12 40 L 17 34" fill="none" stroke="var(--oker-deep)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}
