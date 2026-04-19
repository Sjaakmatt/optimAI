import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { POSTS, POST_BY_SLUG, type PostBlock } from '@/lib/data/posts';

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

const DATE_FORMATTER = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = POST_BY_SLUG[slug];
  if (!p) return { title: 'Artikel niet gevonden' };
  return {
    title: p.title,
    description: p.lede,
    openGraph: {
      title: p.title,
      description: p.lede,
      type: 'article',
      publishedTime: p.published,
      authors: [p.author],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = POST_BY_SLUG[slug];
  if (!p) notFound();

  const currentIndex = POSTS.findIndex((x) => x.slug === slug);
  const nextPost = POSTS[(currentIndex + 1) % POSTS.length];

  return (
    <SitePage>
      <article>
        <section className="mx-auto max-w-[740px] px-6 sm:px-10 pt-14 pb-8">
          <Link
            href="/kennis"
            className="inline-flex items-center gap-1.5 text-[13px] text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors mb-8"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            Alle artikelen
          </Link>
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            {DATE_FORMATTER.format(new Date(p.published))} · {p.readingMinutes} min lezen ·{' '}
            {p.author}
          </div>
          <h1 className="mt-4 font-display text-[34px] sm:text-[44px] leading-[1.1] tracking-tight text-[var(--ink)]">
            {p.title}
          </h1>
          <p className="mt-5 font-display italic text-[20px] leading-[1.45] text-[var(--ink-dim)]">
            {p.lede}
          </p>
        </section>

        <section className="mx-auto max-w-[680px] px-6 sm:px-10 pb-16 pt-2">
          <div className="prose-paper">
            {p.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-[var(--paper-edge)] flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-[2px] bg-[var(--paper-deep)] font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-[0.14em]"
              >
                #{t}
              </span>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
          <div className="mx-auto max-w-[1080px] px-6 sm:px-10 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
                Volgend artikel
              </div>
              <Link
                href={`/kennis/${nextPost.slug}`}
                className="mt-1 font-display text-[22px] text-[var(--ink)] hover:text-[var(--oker-deep)] transition-colors flex items-center gap-2"
              >
                {nextPost.title}
                <ArrowRight size={18} strokeWidth={1.8} />
              </Link>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Sparren over uw situatie
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
          </div>
        </section>
      </article>
    </SitePage>
  );
}

function Block({ block }: { block: PostBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="my-5 text-[16px] leading-[1.75] text-[var(--ink)]">{block.text}</p>
      );
    case 'h2':
      return (
        <h2 className="mt-10 mb-3 font-display text-[24px] leading-tight text-[var(--ink)]">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="mt-7 mb-2 font-display text-[18px] leading-tight text-[var(--ink)]">
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul className="my-5 space-y-2 text-[15.5px] leading-[1.65] text-[var(--ink)]">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-[var(--oker)] pt-1 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote className="my-8 pl-6 border-l-2 border-[var(--oker)]">
          <p className="font-display italic text-[20px] leading-[1.45] text-[var(--ink)]">
            {block.text}
          </p>
          {block.by && (
            <div className="mt-2 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
              — {block.by}
            </div>
          )}
        </blockquote>
      );
    case 'divider':
      return <hr className="my-10 border-t border-[var(--paper-edge)]" />;
  }
}
