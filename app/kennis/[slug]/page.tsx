import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { POSTS, POST_BY_SLUG, type PostBlock, type Post } from '@/lib/data/posts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

function wordCount(post: Post): number {
  return post.blocks.reduce((sum, b) => {
    if (b.kind === 'p' || b.kind === 'h2' || b.kind === 'h3' || b.kind === 'quote') {
      return sum + b.text.split(/\s+/).filter(Boolean).length;
    }
    if (b.kind === 'list') {
      return sum + b.items.reduce((s, it) => s + it.split(/\s+/).filter(Boolean).length, 0);
    }
    return sum;
  }, 0);
}

function articleSchema(post: Post) {
  const url = `${SITE_URL}/kennis/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.lede,
    datePublished: post.published,
    dateModified: post.published,
    inLanguage: 'nl-NL',
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    image: `${SITE_URL}/opengraph-image`,
    keywords: post.tags,
    wordCount: wordCount(post),
    articleSection: 'Kennis',
  };
}

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
    alternates: { canonical: `/kennis/${slug}` },
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
      <JsonLd data={articleSchema(p)} />
      <article>
        <section className="mx-auto max-w-[740px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-6 sm:pb-8">
          <div className="mb-6 sm:mb-8">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Kennis', href: '/kennis' },
                { label: p.title, href: `/kennis/${p.slug}` },
              ]}
            />
          </div>
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            {DATE_FORMATTER.format(new Date(p.published))} · {p.readingMinutes} min lezen ·{' '}
            {p.author}
          </div>
          <h1 className="mt-4 font-display text-[30px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight text-[var(--ink)]">
            {p.title}
          </h1>
          <p className="mt-5 font-display italic text-[18px] sm:text-[22px] leading-[1.45] text-[var(--oker-deep)]">
            {p.lede}
          </p>
        </section>

        <section className="mx-auto max-w-[680px] px-5 sm:px-8 lg:px-10 pb-16 pt-2">
          <div className="drop-cap">
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
          <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
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
        <p className="my-5 text-[15.5px] sm:text-[16.5px] leading-[1.8] text-[var(--ink)]">
          {block.text}
        </p>
      );
    case 'h2':
      return (
        <h2 className="mt-10 mb-3 font-display text-[22px] sm:text-[26px] leading-tight text-[var(--ink)]">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="mt-7 mb-2 font-display text-[17px] sm:text-[19px] leading-tight text-[var(--ink)]">
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul className="my-5 space-y-2.5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink)]">
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
        <blockquote
          className="my-10 pl-5 sm:pl-6 pr-4 py-2 border-l-[3px] border-[var(--oker)]"
          style={{ background: 'var(--paper-warm)' }}
        >
          <p className="font-display italic text-[19px] sm:text-[22px] leading-[1.5] text-[var(--ink)]">
            &ldquo;{block.text}&rdquo;
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
