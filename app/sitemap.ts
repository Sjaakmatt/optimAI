import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/over', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/info', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cases', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/kennis', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/demo', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
