import type { Metadata } from 'next';
import Link from 'next/link';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Sub-verwerkers — FactumAI',
  description:
    'Transparant overzicht van de sub-verwerkers die FactumAI inzet voor klantopdrachten, met locatie, doel en juridisch kader.',
  alternates: { canonical: '/subverwerkers' },
};

const LAST_UPDATED = '20 april 2026';

interface SubProcessor {
  naam: string;
  doel: string;
  locatie: string;
  kader: string;
}

const SUB_PROCESSORS: SubProcessor[] = [
  {
    naam: 'SnelStart',
    doel: 'Boekhouding en facturatie',
    locatie: 'Nederland',
    kader: 'AVG, verwerkersovereenkomst',
  },
  {
    naam: 'Microsoft 365',
    doel: 'E-mail en documenten',
    locatie: 'EU / VS',
    kader: 'EU-US Data Privacy Framework, SCCs',
  },
  {
    naam: 'Apple iCloud',
    doel: 'Back-up en synchronisatie',
    locatie: 'EU / VS',
    kader: 'EU-US Data Privacy Framework, SCCs',
  },
  {
    naam: 'Vercel Analytics',
    doel: 'Privacy-vriendelijke website-statistieken',
    locatie: 'VS',
    kader: 'EU-US Data Privacy Framework',
  },
];

interface ChangelogEntry {
  datum: string;
  wijziging: string;
}

const CHANGELOG: ChangelogEntry[] = [
  {
    datum: '20 april 2026',
    wijziging: 'Eerste publicatie van het sub-verwerkersregister.',
  },
];

export default function SubverwerkersPage() {
  return (
    <SitePage>
      <section className="mx-auto max-w-[860px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Sub-verwerkers', href: '/subverwerkers' },
            ]}
          />
        </div>
        <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
          Juridisch
        </div>
        <h1 className="mt-4 font-display text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.05] tracking-tight text-[var(--ink)]">
          Sub-verwerkers.
        </h1>
        <p className="mt-3 font-mono text-[12px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
          Laatst bijgewerkt: {LAST_UPDATED}
        </p>
        <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--ink-dim)]">
          Wanneer wij diensten leveren aan onze klanten schakelen wij sub-verwerkers in. Deze
          pagina geeft een transparant overzicht van wie dat zijn en waarvoor wij ze gebruiken.
        </p>
        <p className="mt-4 text-[15.5px] sm:text-[16px] leading-[1.75] text-[var(--ink)]">
          Met elke sub-verwerker hebben wij een verwerkersovereenkomst gesloten die voldoet aan
          artikel 28 AVG. Wij stellen onze klanten op de hoogte van wijzigingen in deze lijst
          minimaal 30 dagen voordat een nieuwe sub-verwerker toegang krijgt tot klantdata.
        </p>
      </section>

      <section className="mx-auto max-w-[860px] px-5 sm:px-8 lg:px-10 pb-12">
        <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)] mb-5">
          Huidige sub-verwerkers
        </h2>

        <div className="hidden sm:block overflow-hidden rounded-[2px] border border-[var(--paper-edge)]">
          <table className="w-full text-[14.5px] text-left">
            <thead className="bg-[var(--paper-deep)]">
              <tr className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
                <th className="px-4 py-3 font-normal">Naam</th>
                <th className="px-4 py-3 font-normal">Doel</th>
                <th className="px-4 py-3 font-normal">Locatie</th>
                <th className="px-4 py-3 font-normal">Juridisch kader</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--paper-edge)] bg-[var(--paper)]">
              {SUB_PROCESSORS.map((sp) => (
                <tr key={sp.naam} className="align-top">
                  <td className="px-4 py-3 font-display text-[15px] text-[var(--ink)]">
                    {sp.naam}
                  </td>
                  <td className="px-4 py-3 text-[var(--ink-dim)] leading-snug">{sp.doel}</td>
                  <td className="px-4 py-3 text-[var(--ink-dim)] leading-snug">{sp.locatie}</td>
                  <td className="px-4 py-3 text-[var(--ink-dim)] leading-snug">{sp.kader}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="sm:hidden space-y-3">
          {SUB_PROCESSORS.map((sp) => (
            <li key={sp.naam} className="site-card px-5 py-5">
              <div className="font-display text-[17px] text-[var(--ink)]">{sp.naam}</div>
              <dl className="mt-3 space-y-2 text-[14px]">
                <div>
                  <dt className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
                    Doel
                  </dt>
                  <dd className="text-[var(--ink-dim)] leading-snug">{sp.doel}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
                    Locatie
                  </dt>
                  <dd className="text-[var(--ink-dim)] leading-snug">{sp.locatie}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
                    Juridisch kader
                  </dt>
                  <dd className="text-[var(--ink-dim)] leading-snug">{sp.kader}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[860px] px-5 sm:px-8 lg:px-10 pb-12">
        <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)] mb-3">
          Klantspecifieke sub-verwerkers
        </h2>
        <p className="text-[15.5px] sm:text-[16px] leading-[1.75] text-[var(--ink)]">
          De bovenstaande lijst betreft onze standaard-infrastructuur. Voor specifieke
          klantopdrachten kan een afwijkende set sub-verwerkers van toepassing zijn. Dit wordt dan
          vastgelegd in de verwerkersovereenkomst met de betreffende klant.
        </p>
      </section>

      <section className="mx-auto max-w-[860px] px-5 sm:px-8 lg:px-10 pb-12">
        <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)] mb-3">
          Wijzigingsprocedure
        </h2>
        <p className="text-[15.5px] sm:text-[16px] leading-[1.75] text-[var(--ink)]">
          Wanneer wij voornemens zijn een nieuwe sub-verwerker toe te voegen of een bestaande te
          vervangen:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Wij informeren bestaande klanten minimaal 30 dagen van tevoren per e-mail.',
            'Wij passen deze pagina bij en vermelden de wijzigingsdatum.',
            'Klanten kunnen binnen de 30-dagentermijn bezwaar maken op grond van redelijke privacy- of beveiligingsgronden.',
          ].map((s) => (
            <li
              key={s}
              className="flex gap-3 text-[15.5px] sm:text-[16px] leading-[1.7] text-[var(--ink)]"
            >
              <span className="text-[var(--oker)] pt-1 shrink-0">—</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[860px] px-5 sm:px-8 lg:px-10 pb-12">
        <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)] mb-5">
          Wijzigingshistorie
        </h2>
        <ol className="border-l border-[var(--paper-edge)] pl-5 space-y-4">
          {CHANGELOG.map((c) => (
            <li key={c.datum}>
              <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                {c.datum}
              </div>
              <p className="mt-1 text-[15px] leading-[1.7] text-[var(--ink)]">{c.wijziging}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[860px] px-5 sm:px-8 lg:px-10 pb-16 sm:pb-24">
        <p className="text-[15px] leading-[1.7] text-[var(--ink-dim)]">
          Vragen over onze sub-verwerkers? Neem contact op via{' '}
          <a
            href="mailto:privacy@factumai.nl"
            className="text-[var(--oker-deep)] underline decoration-[var(--oker)] underline-offset-4 hover:text-[var(--ink)]"
          >
            privacy@factumai.nl
          </a>
          . Zie ook onze{' '}
          <Link
            href="/privacy"
            className="text-[var(--oker-deep)] underline decoration-[var(--oker)] underline-offset-4 hover:text-[var(--ink)]"
          >
            privacyverklaring
          </Link>
          .
        </p>
      </section>
    </SitePage>
  );
}
