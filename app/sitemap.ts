import type { MetadataRoute } from 'next';
import { CASES } from '@/lib/data/cases';
import { POSTS } from '@/lib/data/posts';
import { BRANCHES } from '@/lib/data/branches';
import { COMPARISONS } from '@/lib/data/comparisons';
import { RESOURCES } from '@/lib/data/resources';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/diensten/ai-agent-laten-bouwen', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/diensten/ai-automatisering', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/diensten/ai-implementatie', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/diensten/ai-agents-voor-bedrijven', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/over', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/info', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cases', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/kennis', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/branches', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/tools/ai-roi-calculator', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/tools/agent-readiness-check', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/plan', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/subverwerkers', changeFrequency: 'yearly', priority: 0.3 },
];

function withAlternates(url: string) {
  return {
    languages: { 'nl-NL': url },
  } satisfies NonNullable<MetadataRoute.Sitemap[number]['alternates']>;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => {
    const url = `${SITE_URL}${r.path === '/' ? '' : r.path}`;
    return {
      url,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: withAlternates(url),
    };
  });

  const caseEntries: MetadataRoute.Sitemap = CASES.map((c) => {
    const url = `${SITE_URL}/cases/${c.slug}`;
    return {
      url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: withAlternates(url),
    };
  });

  const postEntries: MetadataRoute.Sitemap = POSTS.map((p) => {
    const url = `${SITE_URL}/kennis/${p.slug}`;
    return {
      url,
      lastModified: new Date(p.updated ?? p.published),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: withAlternates(url),
    };
  });

  const brancheEntries: MetadataRoute.Sitemap = BRANCHES.map((b) => {
    const url = `${SITE_URL}/branches/${b.slug}`;
    return {
      url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: withAlternates(url),
    };
  });

  const comparisonEntries: MetadataRoute.Sitemap = COMPARISONS.map((c) => {
    const url = `${SITE_URL}/diensten/vergelijken/${c.slug}`;
    return {
      url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: withAlternates(url),
    };
  });

  const resourceEntries: MetadataRoute.Sitemap = RESOURCES.map((r) => {
    const url = `${SITE_URL}/resources/${r.slug}`;
    return {
      url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: withAlternates(url),
    };
  });

  return [
    ...staticEntries,
    ...brancheEntries,
    ...comparisonEntries,
    ...resourceEntries,
    ...caseEntries,
    ...postEntries,
  ];
}
