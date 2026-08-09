import { notFound, permanentRedirect } from 'next/navigation';
import { POSTS } from '@/lib/data/posts';
import { getSoroPostsExcluding } from '@/lib/data/soro';

/**
 * Soro publiceert artikelen met een link naar de root van het domein
 * (factumai.nl/<slug>), terwijl wij ze onder /kennis/<slug> hosten. Deze route
 * vangt die root-URL's op en stuurt permanent door, zodat externe links en hun
 * eigen verwijzingen niet op een 404 uitkomen.
 *
 * Statische routes winnen in Next.js altijd van deze dynamische segment, dus
 * bestaande pagina's blijven ongemoeid. Alles wat geen extern artikel is,
 * krijgt gewoon de not-found-pagina.
 */

export const revalidate = 3600;

export async function generateStaticParams() {
  const extern = await getSoroPostsExcluding(new Set(POSTS.map((p) => p.slug)));
  return extern.map((p) => ({ slug: p.slug }));
}

export default async function RootSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const extern = await getSoroPostsExcluding(new Set(POSTS.map((p) => p.slug)));
  if (extern.some((p) => p.slug === slug)) {
    permanentRedirect(`/kennis/${slug}`);
  }
  notFound();
}
