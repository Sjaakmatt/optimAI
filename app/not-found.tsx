import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
  description:
    'De pagina die u zocht bestaat niet (meer). Ga terug naar de homepage of bekijk onze cases en kennisartikelen.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <SitePage>
      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-20 pb-20 sm:pt-28 sm:pb-28">
        <div className="max-w-[680px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            404 · niet gevonden
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Deze pagina bestaat niet.
          </h1>
          <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.7] text-[var(--ink-dim)]">
            Misschien is de link verouderd, of heeft u zich vertypt. Hieronder staan een paar
            plekken waar u wél wat aan heeft.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Terug naar home
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] transition-colors"
            >
              Bekijk de cases
            </Link>
            <Link
              href="/kennis"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] transition-colors"
            >
              Lees de artikelen
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
