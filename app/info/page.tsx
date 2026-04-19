import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';

export const metadata: Metadata = {
  title: 'Wat is een AI-agent · FactumAI',
  description:
    'Een AI-agent is een digitale medewerker die zelf beslissingen neemt binnen door u bepaalde grenzen. Uitleg over wat het is, hoe het werkt, en wat het een MKB-bedrijf kan opleveren.',
};

export default function InfoPage() {
  return (
    <SitePage>
      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-10 sm:pb-12">
        <div className="max-w-[760px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Wat is een AI-agent
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Een digitale medewerker.<br />
            <span className="italic text-[var(--oker-deep)]">Geen dashboard.</span>
          </h1>
          <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.7] text-[var(--ink-dim)]">
            Simpel gezegd: een AI-agent is software die zélf beslissingen neemt en taken uitvoert
            binnen grenzen die u bepaalt. Niet een knop die u moet indrukken. Niet een formulier
            dat u moet invullen. Iets dat <span className="ink-highlight">zelf aan de slag gaat</span>.
          </p>
        </div>
      </section>

      <Section eyebrow="Het verschil" title="Niet een chatbot. Niet een workflow-tool.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <CompareCard
            kind="Chatbot"
            body="Antwoordt op vragen als u begint te typen. Doet verder niks. Wacht op u."
          />
          <CompareCard
            kind="Workflow-tool"
            body="Volgt exact het pad dat u tevoren tekent. Bij iets onverwachts valt hij stil."
          />
          <CompareCard
            kind="AI-agent"
            highlight
            body="Leest een binnenkomende mail, kijkt in uw systemen, past beleid toe, neemt een besluit en voert het uit. Meldt het als iets langs u moet."
          />
        </div>
      </Section>

      <Section
        eyebrow="In de praktijk"
        title="Meerdere agents werken samen, zoals een team."
      >
        <p className="text-[15px] leading-[1.7] text-[var(--ink-dim)] max-w-[720px] mt-4">
          Een typische opzet werkt zo. Een hoofdagent (de dirigent) verdeelt het werk over
          afdelings-agents. Klantservice pakt mails op. Facturatie maakt credits klaar. Inkoop
          vergelijkt leveranciers. Verzending plant ritten. Samen handelen ze een klantzaak af van
          begin tot eind.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-start gap-5">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
          >
            Zie dit in onze demo
            <ArrowRight size={16} strokeWidth={1.8} />
          </Link>
          <p className="text-[13px] text-[var(--ink-faint)] max-w-[420px] leading-[1.6]">
            In onze demo doet een fictief groothandelsbedrijf acht scenario&rsquo;s. Klacht, order,
            offerte, voorraadsignaal. U ziet de agents aan het werk en kunt elke actie
            openklappen.
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Wat kan het"
        title="Voorbeelden uit de dagelijkse praktijk."
        tint
      >
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['Inkomende klantmails', 'Lezen, klassificeren, beantwoorden in uw toon en met uw beleid.'],
            ['Offertes opstellen', 'Op basis van actuele inkoopprijzen en marge-regels, klaar voor uw akkoord.'],
            ['Orderverwerking', 'Kredietcheck, voorraadcheck, bevestigingsmail, koppeling met magazijn.'],
            ['Voorraadbeheer', 'Signalering bij lage niveaus, verbruiksanalyse, automatisch bestellen binnen mandaat.'],
            ['Facturatie', 'Concept-facturen, creditnota’s, debiteurenopvolging. Met persoonlijke toon bij trouwe klanten.'],
            ['Transport & planning', 'Ritten combineren, alternatieven regelen bij vertraging, klanten pro-actief informeren.'],
            ['Leveranciers', 'Bestellingen uitzetten, incidenten registreren, kwartaal-reviews voorbereiden.'],
            ['Interne communicatie', 'Belnotities, memo’s, CRM-notities, agenda-blokken voor wat langs u moet.'],
          ].map(([title, body]) => (
            <li key={title} className="artifact-card px-5 py-4">
              <div className="font-display text-[15px] text-[var(--ink)] leading-snug">{title}</div>
              <div className="text-[13px] text-[var(--ink-dim)] mt-1 leading-[1.55]">{body}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Wat moet u weten" title="Vragen die wij vaak krijgen.">
        <div className="mt-8 space-y-6 max-w-[760px]">
          <FAQ
            q="Heb ik daar dure IT voor nodig?"
            a="Nee. Wij bouwen het en koppelen aan uw bestaande systemen (e-mail, boekhoudpakket, CRM). U hoeft geen ontwikkelaars in dienst te hebben. Een laptop en een mailadres is genoeg."
          />
          <FAQ
            q="Gaat een agent dingen doen die ik niet wil?"
            a="Niet als u het goed inricht. Elke actie hangt aan een beleidsregel die u kunt aan- of uitzetten. Bedragen boven uw mandaat, uitzonderlijke situaties, juridische escalaties. Die komen standaard langs u. We stellen dat samen in."
          />
          <FAQ
            q="Wat als het een fout maakt?"
            a="Alles wat een agent doet is terug te zien. Welke data hij raadpleegde, welk beleid hij toepaste, wat de uiteindelijke actie was. U kunt een beslissing ongedaan maken en het beleid bijstellen zodat het de volgende keer anders gaat."
          />
          <FAQ
            q="Vervangt dit mijn mensen?"
            a="In onze ervaring niet. Het haalt het saaie werk weg, zodat uw mensen meer tijd hebben voor waar ze goed in zijn. Vakmanschap, klantcontact, acquisitie. Teams die wij hebben geholpen groeiden juist in omzet zonder extra FTE."
          />
          <FAQ
            q="Hoe snel werkt het?"
            a="Een eerste agent staat vaak binnen één tot twee weken live. Daarna breiden we uit met meer scenario&rsquo;s of meer afdelingen. Geen jaren-traject."
          />
          <FAQ
            q="Wat kost dat?"
            a="Vaste prijs per agent, afhankelijk van complexiteit en aantal integraties. We geven altijd één concreet voorstel met duidelijke opleveringsdatum. Geen open einden."
          />
        </div>
      </Section>

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[540px] leading-snug">
            Nog vragen? Of eerst even zelf kijken wat mogelijk is?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Open de demo
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] transition-colors"
            >
              Plan een gesprek
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
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
        <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.1] text-[var(--ink)] max-w-[720px]">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function CompareCard({
  kind,
  body,
  highlight,
}: {
  kind: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <article
      className="site-card px-5 py-6"
      style={
        highlight
          ? {
              borderColor: 'var(--oker)',
              boxShadow: 'var(--shadow-hover)',
              background: 'var(--paper)',
            }
          : undefined
      }
    >
      <div
        className="font-mono text-[10px] uppercase tracking-[0.18em]"
        style={{ color: highlight ? 'var(--oker-deep)' : 'var(--ink-faint)' }}
      >
        {kind}
      </div>
      <p className="mt-3 text-[14px] leading-[1.6] text-[var(--ink)]">{body}</p>
    </article>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="pb-5 border-b border-[var(--paper-edge)]">
      <h3 className="font-display text-[17px] sm:text-[18px] text-[var(--ink)] leading-snug">
        {q}
      </h3>
      <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.7] text-[var(--ink-dim)]">{a}</p>
    </div>
  );
}
