import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { POSTS, POST_BY_SLUG, type PostBlock, type Post } from '@/lib/data/posts';
import { getSoroPostBySlug, getSoroPostsExcluding, type SoroPost } from '@/lib/data/soro';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

function relatedPosts(current: Post, all: Post[], limit: number): Post[] {
  const tagSet = new Set(current.tags);
  return all
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tagSet.has(t)).length,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.post.published < b.post.published ? 1 : -1;
    })
    .slice(0, limit)
    .map((x) => x.post);
}

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
    dateModified: post.updated ?? post.published,
    inLanguage: 'nl-NL',
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/over#sjaak-ter-veld`,
      name: post.author,
      url: `${SITE_URL}/over/sjaak-ter-veld`,
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
    about: post.tags.map((t) => ({ '@type': 'Thing', name: t })),
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_URL}/kennis#blog`,
      name: 'FactumAI Kennisbank',
    },
  };
}

function faqSchema(post: Post) {
  if (!post.faq || post.faq.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const extern = await getSoroPostsExcluding(new Set(POSTS.map((p) => p.slug)));
  return [...POSTS, ...extern].map((p) => ({ slug: p.slug }));
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
  if (!p) {
    const extern = await getSoroPostBySlug(slug);
    if (!extern) return { title: 'Artikel niet gevonden' };
    return {
      title: extern.title,
      description: extern.lede,
      alternates: { canonical: `/kennis/${slug}` },
      openGraph: {
        title: extern.title,
        description: extern.lede,
        type: 'article',
        publishedTime: extern.published,
        modifiedTime: extern.updated ?? extern.published,
      },
    };
  }
  return {
    title: p.title,
    description: p.lede,
    alternates: { canonical: `/kennis/${slug}` },
    openGraph: {
      title: p.title,
      description: p.lede,
      type: 'article',
      publishedTime: p.published,
      modifiedTime: p.updated ?? p.published,
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
  if (!p) {
    const extern = await getSoroPostBySlug(slug);
    if (!extern) notFound();
    return <ExternArtikel post={extern} />;
  }

  const related = relatedPosts(p, POSTS, 3);
  const nextPost = related[0] ?? POSTS[(POSTS.findIndex((x) => x.slug === slug) + 1) % POSTS.length];
  const faq = faqSchema(p);
  const schemas = faq ? [articleSchema(p), faq] : articleSchema(p);

  return (
    <SitePage>
      <JsonLd data={schemas} />
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
            <Link
              href="/over/sjaak-ter-veld"
              className="underline decoration-dotted underline-offset-[3px] hover:text-[var(--oker-deep)]"
            >
              {p.author}
            </Link>
            {p.updated && p.updated !== p.published && (
              <>
                {' '}
                · bijgewerkt {DATE_FORMATTER.format(new Date(p.updated))}
              </>
            )}
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

        {p.faq && p.faq.length > 0 && (
          <section
            className="border-t border-[var(--paper-edge)]"
            style={{ background: 'var(--paper-warm)' }}
          >
            <div className="mx-auto max-w-[760px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
              <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
                Veelgestelde vragen
              </div>
              <h2 className="mt-2 font-display text-[26px] sm:text-[32px] leading-tight text-[var(--ink)]">
                Over dit onderwerp
              </h2>
              <div className="mt-8 space-y-6">
                {p.faq.map((item) => (
                  <div key={item.q} className="pb-5 border-b border-[var(--paper-edge)]">
                    <h3 className="font-display text-[17px] sm:text-[18px] text-[var(--ink)] leading-snug">
                      {item.q}
                    </h3>
                    <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.7] text-[var(--ink-dim)]">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="border-t border-[var(--paper-edge)]">
            <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 sm:py-14">
              <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
                Verder lezen
              </div>
              <h2 className="mt-2 font-display text-[24px] sm:text-[30px] leading-tight text-[var(--ink)]">
                Andere artikelen over dit onderwerp.
              </h2>
              <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/kennis/${r.slug}`}
                      className="block h-full border border-[var(--paper-edge)] rounded-[2px] px-5 py-5 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                    >
                      <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                        {DATE_FORMATTER.format(new Date(r.published))} · {r.readingMinutes} min
                      </div>
                      <div className="mt-2 font-display text-[16px] leading-snug text-[var(--ink)]">
                        {r.title}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

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

function externArticleSchema(post: SoroPost) {
  const url = `${SITE_URL}/kennis/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.lede,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    inLanguage: 'nl-NL',
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image: post.image ?? `${SITE_URL}/opengraph-image`,
    keywords: post.tags,
    articleSection: 'Kennis',
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_URL}/kennis#blog`,
      name: 'FactumAI Kennisbank',
    },
  };
}

function ExternArtikel({ post }: { post: SoroPost }) {
  const verderLezen = POSTS.slice(0, 3);

  return (
    <SitePage>
      <JsonLd data={externArticleSchema(post)} />
      <article>
        <section className="mx-auto max-w-[740px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-6 sm:pb-8">
          <div className="mb-6 sm:mb-8">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Kennis', href: '/kennis' },
                { label: post.title, href: `/kennis/${post.slug}` },
              ]}
            />
          </div>
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            {DATE_FORMATTER.format(new Date(post.published))} · {post.readingMinutes} min lezen
          </div>
          <h1 className="mt-4 font-display text-[30px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight text-[var(--ink)]">
            {post.title}
          </h1>
          <p className="mt-5 font-display italic text-[18px] sm:text-[22px] leading-[1.45] text-[var(--oker-deep)]">
            {post.lede}
          </p>
        </section>

        <section className="mx-auto max-w-[680px] px-5 sm:px-8 lg:px-10 pb-16 pt-2">
          <div
            className="extern-artikel"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          {post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[var(--paper-edge)] flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 rounded-[2px] bg-[var(--paper-deep)] font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-[0.14em]"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="border-t border-[var(--paper-edge)]">
          <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 sm:py-14">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
              Verder lezen
            </div>
            <h2 className="mt-2 font-display text-[24px] sm:text-[30px] leading-tight text-[var(--ink)]">
              Uit onze eigen kennisbank.
            </h2>
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {verderLezen.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/kennis/${r.slug}`}
                    className="block h-full border border-[var(--paper-edge)] rounded-[2px] px-5 py-5 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                  >
                    <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                      {DATE_FORMATTER.format(new Date(r.published))} · {r.readingMinutes} min
                    </div>
                    <div className="mt-2 font-display text-[16px] leading-snug text-[var(--ink)]">
                      {r.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
          <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <h2 className="font-display text-[22px] text-[var(--ink)] max-w-[560px] leading-snug">
              Benieuwd wat dit voor uw bedrijf betekent?
            </h2>
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
              <span className="text-[var(--oker-deep)] pt-1 shrink-0">·</span>
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
             , {block.by}
            </div>
          )}
        </blockquote>
      );
    case 'divider':
      return <hr className="my-10 border-t border-[var(--paper-edge)]" />;
  }
}
