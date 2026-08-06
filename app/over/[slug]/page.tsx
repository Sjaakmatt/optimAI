import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { TEAM, TEAM_BY_SLUG, type TeamMember } from '@/lib/data/team';
import { POST_BY_SLUG } from '@/lib/data/posts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export async function generateStaticParams() {
  return TEAM.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = TEAM_BY_SLUG[slug];
  if (!m) return { title: 'Profiel niet gevonden' };
  const fullName = `${m.voornaam} ${m.achternaam}`;
  return {
    title: `${fullName}, ${m.rolKort} FactumAI`,
    description: m.korteBio,
    alternates: { canonical: `/over/${slug}` },
    openGraph: {
      title: `${fullName} · FactumAI`,
      description: m.korteBio,
      url: `${SITE_URL}/over/${slug}`,
      type: 'profile',
    },
  };
}

function personSchema(m: TeamMember) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/over/${m.slug}#person`,
    name: `${m.voornaam} ${m.achternaam}`,
    givenName: m.voornaam,
    familyName: m.achternaam,
    jobTitle: m.rol,
    description: m.korteBio,
    image: m.portretSrc ? `${SITE_URL}${m.portretSrc}` : undefined,
    url: `${SITE_URL}/over/${m.slug}`,
    email: m.email,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hoogkarspel',
      addressRegion: 'Noord-Holland',
      addressCountry: 'NL',
    },
    knowsAbout: m.knowsAbout,
    knowsLanguage: ['nl-NL', 'en'],
    nationality: { '@type': 'Country', name: 'Netherlands' },
    sameAs: [m.linkedin, m.github, m.twitter].filter(Boolean),
    alumniOf: m.alumniOf
      ? { '@type': 'EducationalOrganization', name: m.alumniOf }
      : undefined,
  };
}

const DATE_FORMATTER = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = TEAM_BY_SLUG[slug];
  if (!m) notFound();

  const fullName = `${m.voornaam} ${m.achternaam}`;
  const isFounder = m.rolKort.toLowerCase().includes('oprichter');
  const publicaties = (m.publicatieSlugs ?? [])
    .map((s) => POST_BY_SLUG[s])
    .filter(Boolean);

  return (
    <SitePage>
      <JsonLd data={personSchema(m) as Record<string, unknown>} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Over', href: '/over' },
              { label: fullName, href: `/over/${m.slug}` },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 md:gap-12">
          <div>
            <Portret member={m} />
            <div className="mt-4">
              <div className="font-display text-[20px] text-[var(--ink)]">{fullName}</div>
              <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider mt-0.5">
                {m.rol}
              </div>
              <div className="mt-2 text-[12.5px] text-[var(--ink-dim)] leading-snug">
                {m.vestiging}
              </div>
              <ul className="mt-4 space-y-1.5 text-[13px] text-[var(--ink-dim)]">
                <li>
                  <a href={`mailto:${m.email}`} className="underline hover:text-[var(--oker-deep)]">
                    {m.email}
                  </a>
                </li>
                {m.linkedin && (
                  <li>
                    <a
                      href={m.linkedin}
                      rel="me noopener"
                      target="_blank"
                      className="underline hover:text-[var(--oker-deep)]"
                    >
                      LinkedIn-profiel
                    </a>
                  </li>
                )}
                {m.github && (
                  <li>
                    <a
                      href={m.github}
                      rel="me noopener"
                      target="_blank"
                      className="underline hover:text-[var(--oker-deep)]"
                    >
                      GitHub
                    </a>
                  </li>
                )}
                <li className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider pt-2">
                  Bij FactumAI sinds {DATE_FORMATTER.format(new Date(m.startedAt))}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
              {isFounder ? 'Oprichtersprofiel' : 'Teamprofiel'}
            </div>
            <h1 className="mt-3 font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
              {fullName}
            </h1>
            <p className="mt-4 font-display italic text-[18px] sm:text-[20px] leading-[1.45] text-[var(--oker-deep)] max-w-[600px]">
              {m.korteBio}
            </p>
            <div className="mt-6 space-y-4 text-[15px] sm:text-[16px] leading-[1.75] text-[var(--ink)] max-w-[640px]">
              {m.langeBio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {m.expertise.length > 0 && (
        <Section eyebrow="Expertise" title="Waar ik aan werk.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {m.expertise.map((e) => (
              <article key={e.titel} className="site-card px-6 py-6">
                <h2 className="font-display text-[19px] leading-tight text-[var(--ink)]">
                  {e.titel}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)]">{e.body}</p>
              </article>
            ))}
          </div>
        </Section>
      )}

      {publicaties.length > 0 && (
        <Section eyebrow="Publicaties" title="Recent gepubliceerd op de FactumAI-kennisbank." tint>
          <ul className="mt-8 space-y-3 max-w-[760px]">
            {publicaties.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/kennis/${p.slug}`}
                  className="block border border-[var(--paper-edge)] rounded-[2px] px-5 py-4 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                >
                  <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                    {DATE_FORMATTER.format(new Date(p.published))}
                  </div>
                  <div className="mt-1 font-display text-[16px] text-[var(--ink)] leading-snug">
                    {p.title}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-[var(--ink-dim)]">
            Alle artikelen op{' '}
            <Link href="/kennis" className="underline text-[var(--ink)] hover:text-[var(--oker-deep)]">
              de kennisbank
            </Link>
            .
          </p>
        </Section>
      )}

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[560px] leading-snug">
            Direct met {m.voornaam} sparren?{' '}
            <span className="italic text-[var(--oker-deep)]">Een gesprek inplannen.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Plan een gesprek
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/over"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
            >
              Over FactumAI
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}

function Portret({ member }: { member: TeamMember }) {
  if (member.portretSrc) {
    return (
      <div
        className="relative aspect-[4/5] w-full max-w-[320px] rounded-[2px] border border-[var(--paper-edge)] overflow-hidden"
        style={{ boxShadow: 'var(--shadow-lift)' }}
      >
        <Image
          src={member.portretSrc}
          alt={`${member.voornaam} ${member.achternaam}, ${member.rolKort} FactumAI`}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: 'url(/paper-grain.svg)',
            backgroundSize: '240px',
            mixBlendMode: 'multiply',
          }}
          aria-hidden
        />
      </div>
    );
  }
  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[320px] rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] flex items-center justify-center"
      style={{ boxShadow: 'var(--shadow-lift)' }}
    >
      <span className="font-display text-[88px] text-[var(--oker-deep)]">{member.initialen}</span>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
  tint,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tint?: boolean;
}) {
  return (
    <section
      className="border-t border-[var(--paper-edge)]"
      style={tint ? { background: 'var(--paper-warm)' } : undefined}
    >
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
          {eyebrow}
        </div>
        <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.1] text-[var(--ink)] max-w-[780px]">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
