import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { TEAM } from '@/lib/data/team';

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
            dashboard-wirwar. Eén vaste bouwprijs, eerste agent live binnen één tot twee weken,
            optionele retainer voor doorontwikkeling.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <Fact label="Opgericht" value={String(FOUNDED)} />
          <Fact label="Vestiging" value="Hoogkarspel" sub="West-Friesland" />
          <Fact label="Werkgebied" value="Nederland" sub="alle provincies" />
          <Fact label="Branches" value="14" sub="actief in" />
        </div>
      </section>

      <section
        className="border-t border-[var(--paper-edge)]"
        style={{ background: 'var(--paper-warm)' }}
      >
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-14">
          <div className="md:sticky md:top-8 md:self-start">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Wat wij doen
            </div>
            <h2 className="mt-2 font-display text-[28px] sm:text-[34px] leading-[1.1] text-[var(--ink)]">
              AI-agents op maat,{' '}
              <span className="italic text-[var(--oker-deep)]">van losse agent tot platform.</span>
            </h2>
            <p className="mt-5 text-[14px] leading-[1.7] text-[var(--ink-dim)] max-w-[360px]">
              Niet alleen routine-administratie. Ook complexe orchestraties, kennis-systemen,
              guardrails op maat en doorontwikkeling die meegroeit met uw bedrijf.
            </p>
          </div>
          <div className="space-y-7 text-[15px] sm:text-[16px] leading-[1.75] text-[var(--ink)]">
            <Doen
              eyebrow="Solo-agents"
              titel="Eén agent voor één proces."
              body="Voor MKB-bedrijven met een concrete pijn beginnen wij vrijwel altijd met één losse agent: offerte-, order-, facturatie-, mail- of planning-agent. Live in één tot twee weken, gekoppeld aan uw systemen, binnen úw beleidsregels. Bewuste keus voor klein beginnen — uw mensen leren hoe ze het bijsturen voor we uitbreiden."
            />
            <Doen
              eyebrow="Multi-agent platforms"
              titel="Een team van digitale collega's met onderlinge samenwerking."
              body="Voor grotere organisaties bouwen wij multi-agent architecturen: een orchestrator-agent verdeelt werk over gespecialiseerde collega's (offerte, order, inkoop, facturatie, klacht). Elke agent heeft een eigen rol, eigen mandaat, eigen escalatie-pad. Bij één klant draaien zo meerdere afdelings-agents naast elkaar onder één regie."
            />
            <Doen
              eyebrow="Beslissingen onder guardrails"
              titel="Werk dat oordeel vraagt — niet alleen werk dat regels volgt."
              body="Onze agents nemen beslissingen binnen door u expliciet vastgelegd beleid: bedragen-mandaten, klantgroep-uitzonderingen, coulance-regels, escalatie-paden, communicatie-toon per kanaal. Daar waar klassieke automatisering breekt op variatie, kan een goed gebouwde agent met context omgaan en zijn afwegingen logben en motiveren."
            />
            <Doen
              eyebrow="Integraties"
              titel="Praat met de systemen die u al gebruikt."
              body="Boekhouding (Exact, AFAS, Twinfield, Snelstart, Moneybird), CRM (Pipedrive, Teamleader, HubSpot), e-mail (Microsoft 365, Google Workspace), ERP en WMS, branche-specifieke portals (Resengo, Mews, Funda, RVO, NVWA). Via API als die er is, anders via webhooks, e-mail-bridge of een kleine bridge die handmatige CSV-exports nabootst. Verouderd systeem zonder API is zelden een blokkade."
            />
            <Doen
              eyebrow="Eigen kennis & context"
              titel="RAG en kennisbanken op uw bedrijfsdata."
              body="Sommige agents hebben toegang tot uw eigen kennis nodig: jurisprudentie-archieven, productdatabases, prijsafspraken, voorgaande dossiers. Wij bouwen veilige RAG-systemen op uw bedrijfsdata met expliciete logging en bron-vermelding. Data blijft in NL/EU, modellen worden niet getraind op uw inhoud."
            />
            <Doen
              eyebrow="Doorontwikkeling"
              titel="De agent die meegroeit met uw bedrijf."
              body="Een AI-agent is geen statisch product. Modellen worden elk kwartaal beter en goedkoper, uw processen verschuiven, integraties krijgen updates, beleid evolueert. Optionele maandelijkse retainer voor monitoring, model-updates, beleidsreviews en kleine bijstellingen — of alleen de bouw, en aanpassen ad hoc. U kiest zelf."
            />
            <Doen
              eyebrow="Wat wij niet doen"
              titel="Eerlijke afbakening."
              body="Wij verkopen geen kant-en-klaar SaaS-platform en geen consultancy-rapporten. Wij trainen geen foundation-modellen. Wij bouwen geen agent voor een proces dat zich nog niet leent voor automatisering — eerlijk teruggeven wanneer het nog niet rijp is, hoort bij het werk."
            />
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

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
                Het team
              </div>
              <h2 className="mt-2 font-display text-[28px] sm:text-[34px] leading-tight text-[var(--ink)]">
                Wie u te zien krijgt aan tafel.
              </h2>
            </div>
            <p className="text-[14px] text-[var(--ink-dim)] max-w-[360px] sm:text-right">
              Klein team, korte lijnen. De persoon die u spreekt, bouwt ook mee aan uw agent.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/over/${m.slug}`}
                  className="block h-full bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[2px] overflow-hidden hover:border-[var(--oker)] transition-colors group"
                  style={{ boxShadow: 'var(--shadow-lift)' }}
                >
                  <CardPortret member={m} />
                  <div className="px-5 py-5">
                    <div className="font-display text-[19px] leading-tight text-[var(--ink)] group-hover:text-[var(--oker-deep)] transition-colors">
                      {m.voornaam} {m.achternaam}
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider">
                      {m.rol}
                    </div>
                    <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--ink-dim)]">
                      {m.korteBio}
                    </p>
                    <div className="mt-4 font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      Bekijk profiel
                      <ArrowRight size={12} strokeWidth={1.8} />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <div className="h-full min-h-[280px] px-6 py-6 rounded-[2px] border border-dashed border-[var(--paper-edge)] flex flex-col justify-center text-[var(--ink-faint)]">
                <div className="font-display text-[17px] text-[var(--ink-dim)] leading-tight">
                  Ruimte voor uitbreiding
                </div>
                <p className="mt-2 text-[13px] leading-[1.6]">
                  Wij groeien voorzichtig. Een nieuwe collega komt erbij wanneer wij het werk niet
                  meer alleen aankunnen — niet eerder.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

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
                <Row label="Bedrijfsnaam" value="FactumAI" />
                <Row label="Vestiging" value="Hoogkarspel, West-Friesland" />
                <Row label="Werkgebied" value="Heel Nederland" />
                <Row label="E-mail" value="info@factumai.nl" href="mailto:info@factumai.nl" />
                <Row label="Telefoon" value="06-10 55 56 58" href="tel:+31610555658" />
                <Row label="Privacy" value="privacy@factumai.nl" href="mailto:privacy@factumai.nl" />
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

function CardPortret({
  member,
}: {
  member: { initialen: string; portretSrc?: string; voornaam: string; achternaam: string; rolKort: string };
}) {
  if (member.portretSrc) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--paper-warm)] border-b border-[var(--paper-edge)]">
        <Image
          src={member.portretSrc}
          alt={`${member.voornaam} ${member.achternaam} — ${member.rolKort} FactumAI`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className="object-cover object-[center_25%]"
        />
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
    );
  }
  return (
    <div className="relative aspect-[4/3] w-full bg-[var(--paper-warm)] border-b border-[var(--paper-edge)] flex items-center justify-center">
      <span className="font-display text-[64px] text-[var(--oker-deep)]">{member.initialen}</span>
    </div>
  );
}

function Doen({ eyebrow, titel, body }: { eyebrow: string; titel: string; body: string }) {
  return (
    <div className="border-l-[3px] border-[var(--oker)] pl-5">
      <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
        {eyebrow}
      </div>
      <h3 className="mt-1 font-display text-[19px] sm:text-[21px] leading-tight text-[var(--ink)]">
        {titel}
      </h3>
      <p className="mt-3 text-[14.5px] leading-[1.75] text-[var(--ink-dim)]">{body}</p>
    </div>
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
