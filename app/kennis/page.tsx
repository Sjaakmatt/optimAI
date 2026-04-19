import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { POSTS } from '@/lib/data/posts';

export const metadata: Metadata = {
  title: 'Kennis · artikelen over AI-agents in het MKB',
  description:
    'Lees over hoe AI-agents werken in de praktijk, wat er kan, wat er nog niet kan, en hoe u de stap maakt.',
  alternates: { canonical: '/kennis' },
};

const DATE_FORMATTER = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function KennisPage() {
  return (
    <SitePage>
      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-10 sm:pb-12">
        <div className="max-w-[720px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Kennis
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Gedachten,<br />
            <span className="italic text-[var(--oker-deep)]">zonder jargon.</span>
          </h1>
          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)]">
            Over hoe AI-agents werken, wat ze kunnen en wat (nog) niet, en wat het betekent voor
            uw bedrijf. Geen whitepapers van 40 pagina&rsquo;s. Korte essays die u tijdens een
            kop koffie uitleest.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-20 divide-y divide-[var(--paper-edge)] border-y border-[var(--paper-edge)]">
        {POSTS.map((p) => (
          <Link
            key={p.slug}
            href={`/kennis/${p.slug}`}
            className="block py-7 sm:py-8 group relative"
          >
            <div
              aria-hidden
              className="absolute left-0 top-7 sm:top-8 bottom-7 sm:bottom-8 w-[2px] bg-[var(--oker)] opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <div className="pl-0 group-hover:pl-4 transition-[padding] duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-6">
                <div className="max-w-[660px]">
                  <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                    {DATE_FORMATTER.format(new Date(p.published))} · {p.readingMinutes} min lezen
                  </div>
                  <h2 className="mt-2 font-display text-[22px] sm:text-[26px] lg:text-[28px] leading-[1.15] text-[var(--ink)] group-hover:text-[var(--oker-deep)] transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.65] text-[var(--ink-dim)]">
                    {p.lede}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Lezen
                  <ArrowRight size={12} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </SitePage>
  );
}
