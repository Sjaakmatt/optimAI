import { Verschijn } from 'factumai-demo';
import { Uitgeanimeerd } from '../preview-lib/Uitgeanimeerd';
import { ArrowRight, MapPin } from 'lucide-react';

/**
 * Canoniek: een blok dat bij het laden zacht omhoog komt en verschijnt
 * (18px, 0.6s). Hier een eyebrow met korte alinea, zoals in de
 * founder-sectie.
 */
export function Blok() {
  return (
    <Uitgeanimeerd>
    <div className="band py-10">
      <Verschijn>
        <div className="eyebrow">Wie bouwt dit</div>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.65] text-[var(--fg-faint)]">
          Sjaak bouwt AI-agents voor MKB-bedrijven in West-Friesland: mails, offertes en orders, met een mens die goedkeurt.
        </p>
      </Verschijn>
    </div>
    </Uitgeanimeerd>
  );
}

/**
 * `inView`: pas verschijnen als het blok in beeld schuift (zo wordt hij op
 * de homepage gebruikt). Met de ontdek-band als inhoud.
 */
export function InBeeld() {
  return (
    <Uitgeanimeerd>
    <div className="band py-10">
      <Verschijn inView>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[560px]">
            <h2 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-[var(--fg)] sm:text-[32px]">
              Wat is een AI-agent eigenlijk?
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-[var(--fg-dim)]">
              Zie in drie minuten hoe een digitale collega leest, denkt en levert.
            </p>
          </div>
          <a href="/ontdek" className="knop knop-glas shrink-0 self-start md:self-auto">
            Ontdek FactumAI agents
            <ArrowRight size={15} strokeWidth={2} />
          </a>
        </div>
      </Verschijn>
    </div>
    </Uitgeanimeerd>
  );
}

/**
 * Gestaffeld: drie blokken met oplopende `vertraging` (0, 0.3, 0.4s), zoals
 * bio, naam-en-plaats en knoppen elkaar opvolgen in de founder-sectie.
 * `className` gaat op de motion-div zelf.
 */
export function Gestaffeld() {
  return (
    <Uitgeanimeerd>
    <div className="band py-10 max-w-[560px]">
      <Verschijn>
        <p className="text-[15px] leading-[1.65] text-[var(--fg-faint)]">
          Geen pilot van zes maanden zonder resultaat. Eén agent, vaste prijs per fase.
        </p>
      </Verschijn>
      <Verschijn vertraging={0.3} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div>
          <div className="text-[15px] text-[var(--fg)]">Sjaak ter Veld</div>
          <div className="text-[13px] text-[var(--fg-faint)]">Oprichter, bouwt de agents</div>
        </div>
        <span className="hidden h-8 w-px bg-[var(--border-strong)] sm:block" aria-hidden />
        <div className="flex items-center gap-1.5 text-[13px] text-[var(--fg-faint)]">
          <MapPin size={13} strokeWidth={2} />
          Hoorn, West-Friesland
        </div>
      </Verschijn>
      <Verschijn vertraging={0.4} className="mt-8 flex flex-wrap gap-3">
        <a href="/plan" className="knop knop-primair">Plan een gesprek</a>
        <a href="/over/sjaak" className="knop knop-glas">
          Meer over Sjaak
          <ArrowRight size={15} strokeWidth={2} />
        </a>
      </Verschijn>
    </div>
    </Uitgeanimeerd>
  );
}

/**
 * Grotere slag (`y={40}`): het blok komt van verder onder omhoog. Een
 * site-card met een korte case-tekst.
 */
export function GrotereSlag() {
  return (
    <Uitgeanimeerd>
    <div className="band py-10" style={{ maxWidth: 420 }}>
      <Verschijn y={40}>
        <div className="site-card p-6">
          <div className="eyebrow">Offerte-agent</div>
          <div className="mt-3 text-[20px] leading-tight text-[var(--fg)]">Offertes opgevolgd binnen een dag</div>
          <p className="mt-2 text-[14px] leading-[1.6] text-[var(--fg-dim)]">
            Elke openstaande offerte krijgt een concept-opvolgmail. De verkoper keurt goed, de agent verstuurt.
          </p>
        </div>
      </Verschijn>
    </div>
    </Uitgeanimeerd>
  );
}
