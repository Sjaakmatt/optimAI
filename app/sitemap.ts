import type { MetadataRoute } from 'next';
import { CASES } from '@/lib/data/cases';
import { POSTS } from '@/lib/data/posts';
import { BRANCHES } from '@/lib/data/branches';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/diensten/ai-agent-laten-bouwen', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/over', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/info', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cases', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/kennis', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const caseEntries: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${SITE_URL}/cases/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE_URL}/kennis/${p.slug}`,
    lastModified: new Date(p.published),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const brancheEntries: MetadataRoute.Sitemap = BRANCHES.map((b) => ({
    url: `${SITE_URL}/branches/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...brancheEntries, ...caseEntries, ...postEntries];
}
