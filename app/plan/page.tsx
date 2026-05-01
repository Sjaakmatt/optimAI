import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, Clock, Calendar, ShieldCheck } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { CalEmbed } from '@/components/booking/CalEmbed';

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? 'factumai/kennismaking';

export const metadata: Metadata = {
  title: 'Plan een kennismakingsgesprek',
  description:
    'Plan in een kalender een vrijblijvend gesprek van 30 minuten met FactumAI. Eén half uur, geen verkooppraatje, samen kijken of er iets concreets te winnen valt.',
  alternates: { canonical: '/plan' },
};

export default function PlanPage() {
  return (
    <SitePage>
      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-8 sm:pb-10">
        <div className="max-w-[760px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Kennismaking · 30 minuten
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Plan een gesprek.<br />
            <span className="italic text-[var(--oker-deep)]">Vrijblijvend.</span>
          </h1>
          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)]">
            Geen verkooppraatje. Eén half uur waarin u vertelt waar uw mensen tijd aan kwijt zijn,
            en wij eerlijk inschatten of een AI-agent daar iets aan zou doen. Soms is dat ja, soms
            nee — beide antwoorden krijgt u dezelfde middag.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          <aside className="space-y-7">
            <div>
              <div className="font-mono text-[10px] text-[var(--mos)] uppercase tracking-[0.18em]">
                Wat te verwachten
              </div>
              <ul className="mt-4 space-y-4">
                <Bullet
                  Icon={Clock}
                  title="30 minuten"
                  body="Niet langer. Korter mag, langer hoeft niet."
                />
                <Bullet
                  Icon={Calendar}
                  title="Via Google Meet"
                  body="Link komt automatisch in de agenda-uitnodiging."
                />
                <Bullet
                  Icon={ShieldCheck}
                  title="Geen verplichtingen"
                  body="Vinden we samen niks? Dan niks. Geen herinneringsmails."
                />
              </ul>
            </div>

            <div className="pt-6 border-t border-[var(--paper-edge)]">
              <div className="font-mono text-[10px] text-[var(--steen)] uppercase tracking-[0.16em]">
                Liever direct
              </div>
              <div className="mt-4 space-y-3">
                <a
                  href="tel:+31610555658"
                  className="flex items-start gap-2.5 text-[14px] text-[var(--ink)] hover:text-[var(--oker-deep)] transition-colors"
                >
                  <Phone size={14} strokeWidth={1.5} className="mt-1 shrink-0 text-[var(--oker-deep)]" />
                  <span className="font-display">06-10 55 56 58</span>
                </a>
                <a
                  href="mailto:info@factumai.nl"
                  className="flex items-start gap-2.5 text-[14px] text-[var(--ink)] hover:text-[var(--oker-deep)] transition-colors"
                >
                  <Mail size={14} strokeWidth={1.5} className="mt-1 shrink-0 text-[var(--oker-deep)]" />
                  <span>info@factumai.nl</span>
                </a>
                <Link
                  href="/contact"
                  className="block pt-2 text-[13px] text-[var(--ink-dim)] hover:text-[var(--oker-deep)] transition-colors"
                >
                  Liever een mailtje sturen? →
                </Link>
              </div>
            </div>
          </aside>

          <div
            className="site-card overflow-hidden bg-[var(--paper)]"
            style={{ minHeight: 720 }}
          >
            <CalEmbed calLink={CAL_LINK} />
          </div>
        </div>
      </section>
    </SitePage>
  );
}

function Bullet({
  Icon,
  title,
  body,
}: {
  Icon: typeof Clock;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-[var(--oker-deep)]" />
      <div>
        <div className="font-display text-[15px] text-[var(--ink)] leading-tight">{title}</div>
        <div className="mt-1 text-[13px] text-[var(--ink-dim)] leading-[1.55]">{body}</div>
      </div>
    </li>
  );
}
