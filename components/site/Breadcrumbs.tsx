import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav
        aria-label="Broodkruimelpad"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-faint)]"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((c, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-[var(--ink-dim)]" aria-current="page">
                    {c.label}
                  </span>
                ) : (
                  <Link
                    href={c.href}
                    className="hover:text-[var(--oker-deep)] transition-colors"
                  >
                    {c.label}
                  </Link>
                )}
                {!isLast && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
