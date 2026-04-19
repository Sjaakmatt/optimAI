import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { ContactForm } from '@/components/site/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — FactumAI',
  description:
    'Neem contact op met FactumAI voor een vrijblijvend kennismakingsgesprek. E-mail, telefoon, of laat een bericht achter.',
};

export default function ContactPage() {
  return (
    <SitePage>
      <section className="mx-auto max-w-[1080px] px-6 sm:px-10 pt-16 pb-12">
        <div className="max-w-[720px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Contact
          </div>
          <h1 className="mt-4 font-display text-[40px] sm:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Eén gesprek,<br />
            <span className="italic text-[var(--ink-dim)]">geen verplichting.</span>
          </h1>
          <p className="mt-6 text-[16px] leading-[1.7] text-[var(--ink-dim)]">
            Eerst kijken of er iets concreets te winnen is bij u? Mail, bel, of laat hier een
            bericht achter. We reageren binnen één werkdag.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-6 sm:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 md:gap-14">
          <aside className="space-y-6">
            <ContactItem
              Icon={Mail}
              label="E-mail"
              value="hallo@factumai.nl"
              href="mailto:hallo@factumai.nl"
            />
            <ContactItem
              Icon={Phone}
              label="Telefoon"
              value="06-12 34 56 78"
              href="tel:+31612345678"
            />
            <ContactItem
              Icon={MapPin}
              label="Regio"
              value={'Noord-Holland en omliggend\nOok bij u op locatie'}
            />

            <div className="pt-6 border-t border-[var(--paper-edge)]">
              <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                Wat we graag weten
              </div>
              <ul className="mt-3 space-y-1.5 text-[13px] text-[var(--ink-dim)] leading-[1.55]">
                <li>• Wat voor bedrijf (branche, aantal mensen)</li>
                <li>• Welk proces kost u de meeste tijd</li>
                <li>• Wanneer zou u iets live willen hebben</li>
              </ul>
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>
    </SitePage>
  );
}

function ContactItem({
  Icon,
  label,
  value,
  href,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <Icon
        size={16}
        strokeWidth={1.5}
        className="mt-0.5 shrink-0 text-[var(--oker-deep)]"
      />
      <div>
        <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
          {label}
        </div>
        <div className="mt-1 font-display text-[16px] text-[var(--ink)] whitespace-pre-line leading-snug">
          {value}
        </div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:text-[var(--oker-deep)] transition-colors">
      {content}
    </a>
  ) : (
    content
  );
}
