import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, Mail, Calculator, Workflow, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Logostrook } from '@/components/site/Logostrook';
import { HeroKeuze } from '@/components/home/HeroKeuze';
import { Projecten } from '@/components/home/Projecten';
import { Opkomend, Verschijn } from '@/components/home/Opkomend';
import { calPopupAttrs } from '@/components/booking/config';
import { CASES } from '@/lib/data/cases';
import { OPLOSSINGEN, OPLOSSINGEN_FEATURED } from '@/lib/data/oplossingen';
import { TEAM } from '@/lib/data/team';

export const metadata: Metadata = {
  title: 'FactumAI · AI-agents voor MKB',
  description:
    'FactumAI bouwt AI-agents voor Nederlandse MKB-bedrijven: digitale collega\'s die mails afhandelen, offertes opvolgen en bestellingen klaarzetten. Op maat, binnen uw regels, met een mens die goedkeurt. Vaste prijs per fase.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <SitePage>
      <HeroKeuze />
      <Klanten />
      <WatHijDoet />
      <Wie />
      <ProjectenSectie />
      <Aanpak />
      <Afspraken />
      <OntdekBand />
      <SlotCta />
    </SitePage>
  );
}

function Kop({
  eyebrow,
  regels,
  tekst,
  centreer = false,
}: {
  eyebrow: string;
  regels: string[];
  tekst?: string;
  centreer?: boolean;
}) {
  return (
    <div className={centreer ? 'mx-auto max-w-[720px] text-center' : 'max-w-[720px]'}>
      <Verschijn inView>
        <div className="eyebrow">{eyebrow}</div>
      </Verschijn>
      <Opkomend
        as="h2"
        inView
        className="mt-3 font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)] sm:text-[40px] lg:text-[48px]"
        regels={regels}
      />
      {tekst && (
        <Verschijn inView vertraging={0.2}>
          <p className="mt-5 text-[15.5px] leading-[1.65] text-[var(--fg-dim)] sm:text-[17px]">{tekst}</p>
        </Verschijn>
      )}
    </div>
  );
}

function Klanten() {
  const clients = CASES.filter((c) => c.logo);
  if (clients.length === 0) return null;
  return (
    <section className="band pt-4 pb-6 sm:pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
        <div className="eyebrow shrink-0 !text-[var(--fg-faint)]">In productie bij</div>
        <Logostrook klanten={clients} />
      </div>
    </section>
  );
}

function WatHijDoet() {
  const punten = [
    {
      icoon: Mail,
      titel: 'Hij leest wat er echt staat',
      body:
        'Een mail met een bijlage, een klacht die eigenlijk een retour is, een aanvraag waarvan de voorwaarde nergens in een veld staat. Een agent leest het, toetst het aan uw beleid en zet de afhandeling klaar.',
    },
    {
      icoon: Calculator,
      titel: 'Hij rekent met uw eigen cijfers',
      body:
        'Bestelritme per klant, seizoenspatroon per artikel, offertes die te lang openstaan. De gegevens liggen er al; een agent levert de uitkomst, met de onderbouwing eronder.',
    },
    {
      icoon: Workflow,
      titel: 'Hij werkt tussen uw systemen',
      body:
        'Tussen de webshop en de boekhouding, tussen de mailbox en het ERP, tussen u en de leverancier. Daar staat nu iemand te kopiëren en te plakken. Precies daar doet een agent zijn werk.',
    },
  ];
  return (
    <section className="band pt-20 sm:pt-28">
      <Kop
        eyebrow="Wat een agent doet"
        regels={['Uw pakket onthoudt.', 'Een agent denkt mee.']}
        tekst="Uw administratie draait al ergens in, en dat moet vooral zo blijven. Een agent vervangt uw pakket niet. Hij pakt het werk op dat uw pakket laat liggen."
      />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {punten.map((p, i) => (
          <Verschijn key={p.titel} inView vertraging={0.1 + i * 0.1}>
            <article className="site-card h-full px-6 py-7">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]">
                <p.icoon size={18} strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-[19px] leading-snug text-[var(--fg)]">{p.titel}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--fg-dim)]">{p.body}</p>
            </article>
          </Verschijn>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[16px] text-[var(--fg)]">Waar wij het vaakst bouwen</div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {OPLOSSINGEN_FEATURED.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/oplossingen/${o.slug}`}
                  className="inline-flex rounded-full border border-[var(--border)] px-3 py-1.5 text-[13px] text-[var(--fg-dim)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
                >
                  {o.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/oplossingen" className="knop knop-glas shrink-0 self-start sm:self-auto">
          Alle {OPLOSSINGEN.length} oplossingen
          <ArrowRight size={15} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}

function Wie() {
  const sjaak = TEAM[0];
  return (
    <section className="relative mt-24 sm:mt-32 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-[78%] -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201, 116, 74, 0.28) 0%, rgba(43, 26, 46, 0.35) 45%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div className="band grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <Verschijn inView className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div className="portret-vervaag relative aspect-[916/1315] w-full">
            <Image
              src="/portret-cutout.png"
              alt={`${sjaak.voornaam} ${sjaak.achternaam}, oprichter van FactumAI`}
              fill
              sizes="(min-width: 1024px) 480px, 80vw"
              className="object-contain object-bottom"
              priority={false}
            />
          </div>
        </Verschijn>
        <div className="relative pb-6 lg:pb-16">
          <Verschijn inView>
            <div className="eyebrow">Wie u aan tafel krijgt</div>
          </Verschijn>
          <Opkomend
            as="h2"
            inView
            className="mt-3 font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)] sm:text-[40px] lg:text-[48px]"
            regels={['Geen accountmanager.', 'De bouwer zelf.']}
          />
          <Verschijn inView vertraging={0.2}>
            <p className="mt-6 text-[16px] leading-[1.65] text-[var(--fg-dim)] sm:text-[17px]">
              {sjaak.langeBio[1]}
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-[var(--fg-faint)]">{sjaak.korteBio}</p>
          </Verschijn>
          <Verschijn inView vertraging={0.3} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div>
              <div className="text-[15px] text-[var(--fg)]">
                {sjaak.voornaam} {sjaak.achternaam}
              </div>
              <div className="text-[13px] text-[var(--fg-faint)]">{sjaak.rol}</div>
            </div>
            <span className="hidden h-8 w-px bg-[var(--border-strong)] sm:block" aria-hidden />
            <div className="flex items-center gap-1.5 text-[13px] text-[var(--fg-faint)]">
              <MapPin size={13} strokeWidth={2} />
              {sjaak.vestiging}
            </div>
          </Verschijn>
          <Verschijn inView vertraging={0.4} className="mt-8 flex flex-wrap gap-3">
            <Link href="/plan" {...calPopupAttrs} className="knop knop-primair">
              Plan een gesprek
            </Link>
            <Link href={`/over/${sjaak.slug}`} className="knop knop-glas">
              Meer over {sjaak.voornaam}
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </Verschijn>
        </div>
      </div>
    </section>
  );
}

function ProjectenSectie() {
  return (
    <section className="band pt-24 sm:pt-32">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Kop
          eyebrow="Projecten"
          regels={['Gebouwd, en in gebruik.']}
          tekst="Vier bedrijven, vier agents die elke dag draaien. Geen pilots: dit is werk dat nu wordt gedaan."
        />
        <Verschijn inView vertraging={0.2}>
          <Link href="/cases" className="knop knop-glas shrink-0">
            Alle cases
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </Verschijn>
      </div>
      <Verschijn inView vertraging={0.15} className="mt-10">
        <Projecten />
      </Verschijn>
    </section>
  );
}

function Aanpak() {
  const stappen = [
    ['Kennismaken', 'Eén gesprek bij u of bij ons. Wij kijken wat uw mensen vooral kost.'],
    ['Ontwerpen', 'Samen kiezen we één proces waar de grootste winst zit.'],
    ['Bouwen', 'In fasen. Elke fase eindigt in iets werkends dat u ziet en goedkeurt.'],
    ['Implementeren', 'Koppelen aan uw systemen. Uw mensen krijgen uitleg over het beheer.'],
    ['Bijhouden', 'Maandelijks een kort gesprek om bij te sturen.'],
  ];
  return (
    <section className="band pt-24 sm:pt-32">
      <Kop
        eyebrow="Onze aanpak"
        regels={['Kennismaken, ontwerpen,', 'bouwen, implementeren.']}
        tekst="Het eerste gesprek is altijd vrijblijvend. Zo ja, dan komt er een voorstel: één agent, vaste prijs per fase, en elke fase eindigt in iets dat werkt. Geen pilot van zes maanden zonder resultaat."
      />
      <ol className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stappen.map(([titel, body], i) => (
          <Verschijn key={titel} inView vertraging={0.08 * i}>
            <li className="site-card h-full px-5 py-5">
              <div className="font-mono text-[11px] tracking-[0.12em] text-[var(--accent-text)]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-3 text-[16px] text-[var(--fg)]">{titel}</div>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--fg-dim)]">{body}</p>
            </li>
          </Verschijn>
        ))}
      </ol>
    </section>
  );
}

function Afspraken() {
  const cells = [
    {
      icoon: ShieldCheck,
      label: 'Mens beslist',
      body: 'Elke uitgaande mail, bestelling of statuswijziging staat eerst als concept klaar en wordt door uw mensen goedgekeurd.',
    },
    {
      icoon: MapPin,
      label: 'Data in Frankfurt',
      body: 'Applicatie en database draaien in Europa. De taalmodelcalls lopen via Anthropic in de VS, opgenomen in onze sub-verwerkerslijst.',
    },
    {
      icoon: Clock,
      label: 'Eén maand opzegtermijn',
      body: 'Geen minimale looptijd na de eerste drie maanden. Levert het niet, dan stopt u.',
    },
  ];
  return (
    <section className="band pt-20 sm:pt-24">
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-6 py-8 sm:px-10 sm:py-10">
        <Kop eyebrow="Onze afspraken" regels={['Drie afspraken. Geen kleine lettertjes.']} />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cells.map((c, i) => (
            <Verschijn key={c.label} inView vertraging={0.1 * i}>
              <div className={i > 0 ? 'md:border-l md:border-[var(--border)] md:pl-8' : ''}>
                <c.icoon size={20} strokeWidth={1.8} className="text-[var(--accent-text)]" />
                <div className="mt-4 text-[20px] leading-tight text-[var(--fg)]">{c.label}</div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--fg-dim)]">{c.body}</p>
              </div>
            </Verschijn>
          ))}
        </div>
      </div>
    </section>
  );
}

function OntdekBand() {
  return (
    <section className="band pt-20 sm:pt-24">
      <Verschijn inView>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[560px]">
            <div className="eyebrow">Nieuw hier?</div>
            <h2 className="mt-3 font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-[var(--fg)] sm:text-[32px]">
              Wat is een AI-agent eigenlijk?
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-[var(--fg-dim)]">
              Zie in drie minuten hoe een digitale collega leest, denkt en levert. En waar hij stopt,
              omdat u beslist.
            </p>
          </div>
          <Link href="/ontdek" className="knop knop-glas shrink-0 self-start md:self-auto">
            Ontdek FactumAI agents
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </Verschijn>
    </section>
  );
}

function SlotCta() {
  return (
    <section className="band pt-28 sm:pt-36">
      <div className="mx-auto max-w-[760px] text-center">
        <Opkomend
          as="h2"
          inView
          className="font-display text-[34px] leading-[1.04] tracking-[-0.03em] text-[var(--fg)] sm:text-[50px] lg:text-[60px]"
          regels={['Eén gesprek.', 'Dan weet u of het loont.']}
        />
        <Verschijn inView vertraging={0.2}>
          <p className="mx-auto mt-6 max-w-[520px] text-[16px] leading-[1.65] text-[var(--fg-dim)] sm:text-[17px]">
            Twintig minuten, vrijblijvend. Wij kijken samen naar het werk dat uw mensen nu de
            meeste tijd kost, en zeggen eerlijk of een agent daar iets aan doet.
          </p>
        </Verschijn>
        <Verschijn inView vertraging={0.3} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/plan" {...calPopupAttrs} className="knop knop-primair">
            Plan een gesprek
          </Link>
          <Link href="/scan" className="knop knop-glas">
            Of doe eerst de AI-scan
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </Verschijn>
      </div>
    </section>
  );
}
