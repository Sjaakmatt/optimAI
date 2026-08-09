import type { Metadata } from 'next';
import Script from 'next/script';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

// Externe blog-embed van Soro. De inhoud wordt client-side door hun script in
// #soro-blog gezet; artikel-URL's onder /blog/* moeten daarom ook deze pagina
// serveren, vandaar de optionele catch-all.
const SORO_EMBED_SRC = 'https://app.trysoro.com/api/embed/32b19ece-d2a9-4775-819a-6c816c13aa02';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slug && slug.length > 0 ? `/blog/${slug.join('/')}` : '/blog';
  return {
    title: 'Blog',
    description:
      'Blogartikelen van FactumAI over AI-agents en automatisering voor het Nederlandse MKB.',
    alternates: { canonical: path },
    openGraph: {
      title: 'Blog · FactumAI',
      description:
        'Blogartikelen van FactumAI over AI-agents en automatisering voor het Nederlandse MKB.',
      url: `${SITE_URL}${path}`,
    },
  };
}

export default function BlogPage() {
  return (
    <SitePage>
      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-16">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
            ]}
          />
        </div>
        <div id="soro-blog" />
      </section>
      <Script src={SORO_EMBED_SRC} strategy="afterInteractive" />
    </SitePage>
  );
}
