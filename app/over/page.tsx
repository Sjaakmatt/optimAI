import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { TEAM, type TeamMember } from '@/lib/data/team';

export const metadata: Metadata = {
  title: 'Over FactumAI · het bedrijf achter AI-agents voor MKB',
  description:
    'FactumAI is gevestigd in Hoogkarspel en bouwt AI-agents voor Nederlandse MKB-bedrijven. Pragmatisch, op vaste prijs, met grip via expliciete beleidsregels. Wie wij zijn en waar wij in geloven.',
  alternates: { canonical: '/over' },
};

const FOUNDED = 2026;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${SITE_URL}/over`,
  inLanguage: 'nl-NL',
  mainEntity: { '@id': `${SITE_URL}/#organization` },
};

export default function OverPage() {
  return (
    <SitePage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
      />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-10 sm:pb-12">
        <div className="max-w-[760px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Over FactumAI
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Het bedrijf{' '}
            <span className="italic text-[var(--oker-deep)]">achter de agents.</span>
          </h1>
          <p className="mt-6 text-[15px] sm:text-[17px] leading-[1.7] text-[var(--ink-dim)]">
            FactumAI is in {FOUNDED} opgericht in Hoogkarspel om AI-agents bereikbaar te maken voor
            Nederlandse MKB-bedrijven. Geen consultancy-rapport, geen jarenlang traject, geen
            dashboard-wirwar. Een vaste prijs per fase, elke uitgaande actie langs een mens, en een
            opzegtermijn van één maand.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <Fact label="Opgericht" value={String(FOUNDED)} />
          <Fact label="Vestiging" value="Hoogkarspel" sub="West-Friesland" />
          <Fact label="Werkgebied" value="Nederland" sub="alle provincies" />
          <Fact label="Eerste agent live" value="1–2" sub="weken tot productie" />
        </div>
      </section>

      <section
        className="border-t border-[var(--paper-edge)]"
        style={{ background: 'var(--paper-warm)' }}
      >
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="max-w-[640px]">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Wat wij doen
            </div>
            <h2 className="mt-2 font-display text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-[var(--ink)]">
              AI-agents op maat,{' '}
              <span className="italic text-[var(--oker-deep)]">van losse agent tot platform.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-[var(--ink-dim)]">
              Niet alleen routine-administratie. Ook complexe orchestraties, kennis-systemen,
              guardrails op maat en doorontwikkeling die meegroeit met uw bedrijf.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--paper-edge)] border border-[var(--paper-edge)] rounded-[3px] overflow-hidden">
            {DOEN.map((d, i) => (
              <DoenCard key={d.titel} index={i + 1} {...d} />
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start px-5 sm:px-7 py-6 rounded-[3px] border border-dashed border-[var(--oker)]/50 bg-[var(--paper)]">
            <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em] sm:pt-1 shrink-0 sm:w-[160px]">
              Wat wij niet doen
            </div>
            <p className="text-[14.5px] leading-[1.7] text-[var(--ink-dim)]">
              Wij verkopen geen kant-en-klaar SaaS-platform en geen consultancy-rapporten. Wij
              trainen geen foundation-modellen. En wij bouwen geen agent voor een proces dat zich
              nog niet leent voor automatisering. Eerlijk teruggeven wanneer het nog niet rijp is,
              hoort bij het werk.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
            Waar wij in geloven
          </div>
          <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.1] text-[var(--paper)] max-w-[720px]">
            Drie uitgangspunten die{' '}
            <span className="italic text-[var(--oker-deep)]">alles bepalen.</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <DarkPrinciple
              number="I"
              title="Het werk staat centraal. Niet de techniek."
              body="Uw mensen, uw klanten, uw processen zijn waar het om draait. De agent is gereedschap. Goed gereedschap, maar gereedschap."
            />
            <DarkPrinciple
              number="II"
              title="Vakmanschap boven hype."
              body="We bouwen zoals een meubelmaker. Rustig, precies, met materiaal dat blijft staan. Geen wekelijkse pivot in framework."
            />
            <DarkPrinciple
              number="III"
              title="U houdt de knoppen."
              body="Elke automatische beslissing komt voort uit een regel die u zelf kunt aan- of uitzetten. Geen blackbox. Geen verrassingen."
            />
          </div>
        </div>
      </section>

      <TeamSection />

      <section
        className="border-t border-[var(--paper-edge)]"
        style={{ background: 'var(--paper-deep)' }}
      >
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
                Bedrijfsgegevens
              </div>
              <h2 className="mt-2 font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)]">
                Praktisch.
              </h2>
              <dl className="mt-6 space-y-3 text-[14px]">
                <Row label="Bedrijfsnaam" value="FactumAI B.V." />
                <Row label="KvK-nummer" value="42123186" />
                <Row label="Vestiging" value="Hoogkarspel, West-Friesland" />
                <Row label="Werkgebied" value="Heel Nederland" />
                <Row label="E-mail" value="info@factumai.nl" href="mailto:info@factumai.nl" />
                <Row label="Telefoon" value="06-10 55 56 58" href="tel:+31610555658" />
              </dl>
            </div>
            <div>
              <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
                Documenten
              </div>
              <h2 className="mt-2 font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)]">
                Voor de zorgvuldige lezer.
              </h2>
              <ul className="mt-6 space-y-3 text-[14px]">
                <li>
                  <Link
                    href="/privacy"
                    className="block px-4 py-3 bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[2px] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                  >
                    <span className="font-display text-[15px] text-[var(--ink)]">
                      Privacyverklaring
                    </span>
                    <span className="block mt-1 text-[12.5px] text-[var(--ink-dim)]">
                      Welke persoonsgegevens wij verwerken en waarom.
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subverwerkers"
                    className="block px-4 py-3 bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[2px] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                  >
                    <span className="font-display text-[15px] text-[var(--ink)]">
                      Sub-verwerkers
                    </span>
                    <span className="block mt-1 text-[12.5px] text-[var(--ink-dim)]">
                      Overzicht van sub-verwerkers met locatie en juridisch kader.
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[560px] leading-snug">
            Zin in een gesprek?{' '}
            <span className="italic text-[var(--oker-deep)]">Of eerst de demo zien?</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
            >
              Demo openen
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] hover:border-[var(--oker)] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}

function Fact({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border-l-[3px] border-[var(--oker)] pl-4">
      <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
        {label}
      </div>
      <div className="mt-1 font-display text-[24px] sm:text-[28px] tabular-nums text-[var(--ink)] leading-tight">
        {value}
      </div>
      {sub && (
        <div className="mt-0.5 font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-wider">
          {sub}
        </div>
      )}
    </div>
  );
}

const DOEN = [
  {
    eyebrow: 'Solo-agents',
    titel: 'Eén agent voor één proces.',
    body: 'Voor MKB-bedrijven met een concrete pijn beginnen wij vrijwel altijd met één losse agent: offerte, order, facturatie, mail of planning. Gekoppeld aan uw systemen, binnen úw beleidsregels. Bewust klein beginnen, zodat uw mensen leren bijsturen voor we uitbreiden.',
  },
  {
    eyebrow: 'Multi-agent platforms',
    titel: 'Een team van digitale collega’s.',
    body: 'Voor grotere organisaties bouwen wij multi-agent architecturen: een orchestrator verdeelt werk over gespecialiseerde collega’s (offerte, order, inkoop, facturatie, klacht). Elke agent heeft een eigen rol, eigen mandaat en eigen escalatie-pad, onder één regie.',
  },
  {
    eyebrow: 'Beslissingen onder guardrails',
    titel: 'Werk dat oordeel vraagt.',
    body: 'Onze agents beslissen binnen door u vastgelegd beleid: bedragen-mandaten, klantgroep-uitzonderingen, coulance-regels, escalatie-paden en toon per kanaal. Waar klassieke automatisering breekt op variatie, gaat een goed gebouwde agent met context om en motiveert hij zijn afwegingen.',
  },
  {
    eyebrow: 'Integraties',
    titel: 'Praat met wat u al gebruikt.',
    body: 'Boekhouding (Exact, AFAS, Twinfield, Moneybird), CRM (Pipedrive, Teamleader, HubSpot), e-mail (Microsoft 365, Google Workspace), ERP, WMS en branche-portals. Via API als die er is, anders via webhooks of een kleine bridge. Een verouderd systeem zonder API is zelden een blokkade.',
  },
  {
    eyebrow: 'Eigen kennis & context',
    titel: 'RAG op uw bedrijfsdata.',
    body: 'Sommige agents hebben toegang tot uw eigen kennis nodig: productdatabases, prijsafspraken, dossiers, archieven. Wij bouwen veilige RAG-systemen met expliciete logging en bronvermelding. Opslag en verwerking in Frankfurt, taalmodelcalls via Anthropic in de VS, opgenomen in onze sub-verwerkerslijst met een transfer impact assessment. Modellen worden niet getraind op uw inhoud.',
  },
  {
    eyebrow: 'Doorontwikkeling',
    titel: 'De agent die meegroeit.',
    body: 'Een AI-agent is geen statisch product. Modellen worden elk kwartaal beter, uw processen verschuiven, beleid evolueert. Optionele retainer voor monitoring, model-updates en beleidsreviews, of alleen de bouw en ad hoc aanpassen. U kiest zelf.',
  },
];

const VERHAALLIJN = [
  {
    fase: 'Opleiding',
    titel: 'Bedrijfskunde',
    body: 'De taal van ondernemers leren spreken: processen, marges en de keuzes die daar achter zitten.',
  },
  {
    fase: '8+ jaar',
    titel: 'IT-praktijk',
    body: 'Optimalisatie, procesverbetering, strategie en projectmanagement bij bedrijven van elke maat.',
  },
  {
    fase: '2026',
    titel: 'FactumAI',
    body: 'AI-agents bereikbaar maken voor het MKB, zonder groot consultancy-traject of dashboard-wirwar.',
  },
  {
    fase: 'Nu',
    titel: 'Aan tafel én aan de bouw',
    body: 'Ik voer het gesprek met ondernemers en bouw mee aan de agents. Dat houdt de beloftes eerlijk.',
  },
];

function DoenCard({
  index,
  eyebrow,
  titel,
  body,
}: {
  index: number;
  eyebrow: string;
  titel: string;
  body: string;
}) {
  return (
    <div className="bg-[var(--paper)] px-6 py-6 sm:px-7 sm:py-7">
      <div className="flex items-baseline gap-3">
        <span className="font-display italic text-[15px] text-[var(--oker)] tabular-nums">
          {String(index).padStart(2, '0')}
        </span>
        <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
          {eyebrow}
        </div>
      </div>
      <h3 className="mt-2 font-display text-[19px] sm:text-[21px] leading-tight text-[var(--ink)]">
        {titel}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.7] text-[var(--ink-dim)]">{body}</p>
    </div>
  );
}

// Eén oprichter → een persoonlijke verhaallijn. Zodra er meer mensen bij
// komen, schakelt de sectie automatisch over naar een teamraster, zodat de
// pagina niet overvol raakt.
function TeamSection() {
  if (TEAM.length <= 1) return <FounderSpotlight founder={TEAM[0]} />;
  return <TeamGrid members={TEAM} />;
}

function FounderSpotlight({ founder }: { founder: TeamMember }) {
  return (
    <section className="border-t border-[var(--paper-edge)]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="max-w-[640px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
            De oprichter
          </div>
          <h2 className="mt-2 font-display text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-[var(--ink)]">
            Wie u aan tafel krijgt.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--ink-dim)]">
            Klein team, korte lijnen. De persoon die u spreekt, bouwt ook mee aan uw agent.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-8 md:gap-12">
          {/* Portret + naam */}
          <div className="md:sticky md:top-8 md:self-start">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-warm)]"
              style={{ boxShadow: 'var(--shadow-lift)' }}
            >
              {founder.portretSrc ? (
                <Image
                  src={founder.portretSrc}
                  alt={`${founder.voornaam} ${founder.achternaam}, ${founder.rolKort} FactumAI`}
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  className="object-cover object-[center_20%]"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[72px] text-[var(--oker-deep)]">
                    {founder.initialen}
                  </span>
                </div>
              )}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'url(/paper-grain.svg)',
                  backgroundSize: '240px',
                  mixBlendMode: 'multiply',
                }}
                aria-hidden
              />
            </div>
            <div className="mt-4">
              <div className="font-display text-[22px] leading-tight text-[var(--ink)]">
                {founder.voornaam} {founder.achternaam}
              </div>
              <div className="mt-1 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider">
                {founder.rol}
              </div>
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-wider hover:text-[var(--ink)] transition-colors"
                >
                  LinkedIn
                  <ArrowRight size={12} strokeWidth={1.8} />
                </a>
              )}
            </div>
          </div>

          {/* Verhaal + verhaallijn */}
          <div>
            <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-[var(--ink)] max-w-[560px]">
              {founder.langeBio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ol className="mt-10 relative">
              <div
                aria-hidden
                className="absolute left-[5px] top-2 bottom-2 w-px bg-[var(--paper-edge)]"
              />
              {VERHAALLIJN.map((m) => (
                <li key={m.titel} className="relative pl-7 pb-6 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[5px] w-[11px] h-[11px] rounded-full bg-[var(--paper)] border-2 border-[var(--oker)]"
                  />
                  <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                    {m.fase}
                  </div>
                  <div className="mt-0.5 font-display text-[17px] leading-tight text-[var(--ink)]">
                    {m.titel}
                  </div>
                  <p className="mt-1 text-[14px] leading-[1.65] text-[var(--ink-dim)] max-w-[440px]">
                    {m.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-9 flex flex-wrap gap-2">
              {founder.expertise.map((e) => (
                <span
                  key={e.titel}
                  className="px-3 py-1.5 rounded-full border border-[var(--paper-edge)] bg-[var(--paper-warm)] font-mono text-[11px] text-[var(--ink-dim)] tracking-wide"
                >
                  {e.titel}
                </span>
              ))}
            </div>

            <Link
              href={`/over/${founder.slug}`}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-warm)] hover:border-[var(--oker)] transition-colors group"
            >
              Lees het volledige profiel
              <ArrowRight size={16} strokeWidth={1.8} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <section className="border-t border-[var(--paper-edge)]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Het team
            </div>
            <h2 className="mt-2 font-display text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-[var(--ink)]">
              Wie u aan tafel krijgt.
            </h2>
          </div>
          <p className="text-[14px] text-[var(--ink-dim)] max-w-[360px] sm:text-right">
            Klein team, korte lijnen. De persoon die u spreekt, bouwt ook mee aan uw agent.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((m) => (
            <li key={m.slug}>
              <MemberCard member={m} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/over/${member.slug}`}
      className="block h-full bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[3px] overflow-hidden hover:border-[var(--oker)] transition-colors group"
      style={{ boxShadow: 'var(--shadow-lift)' }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--paper-warm)] border-b border-[var(--paper-edge)]">
        {member.portretSrc ? (
          <Image
            src={member.portretSrc}
            alt={`${member.voornaam} ${member.achternaam}, ${member.rolKort} FactumAI`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            className="object-cover object-[center_20%]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[64px] text-[var(--oker-deep)]">{member.initialen}</span>
          </div>
        )}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'url(/paper-grain.svg)',
            backgroundSize: '240px',
            mixBlendMode: 'multiply',
          }}
          aria-hidden
        />
      </div>
      <div className="px-5 py-5">
        <div className="font-display text-[19px] leading-tight text-[var(--ink)] group-hover:text-[var(--oker-deep)] transition-colors">
          {member.voornaam} {member.achternaam}
        </div>
        <div className="mt-1 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider">
          {member.rol}
        </div>
        <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--ink-dim)]">{member.korteBio}</p>
        <div className="mt-4 font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
          Bekijk profiel
          <ArrowRight size={12} strokeWidth={1.8} />
        </div>
      </div>
    </Link>
  );
}

function DarkPrinciple({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="relative pl-6">
      <div
        aria-hidden
        className="absolute left-0 top-1 bottom-1 w-px bg-[var(--paper-deep)] opacity-30"
      />
      <div className="font-display italic text-[72px] sm:text-[88px] text-[var(--oker-deep)] leading-none tracking-tight">
        {number}
      </div>
      <h3 className="mt-4 font-display text-[19px] leading-tight text-[var(--paper)]">{title}</h3>
      <p className="mt-3 text-[14px] leading-[1.7] text-[var(--paper-deep)] opacity-90">{body}</p>
    </article>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = href ? (
    <a href={href} className="text-[var(--ink)] hover:text-[var(--oker-deep)] transition-colors">
      {value}
    </a>
  ) : (
    <span className="text-[var(--ink)]">{value}</span>
  );
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--paper-edge)] pb-2">
      <dt className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
        {label}
      </dt>
      <dd className="text-right">{inner}</dd>
    </div>
  );
}
