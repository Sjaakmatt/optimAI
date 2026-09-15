import { MapPin } from 'lucide-react';
import { Portret } from 'factumai-demo';
import { TEAM } from '@/lib/data/team';

const sjaak = TEAM[0];
const ALT = `${sjaak.voornaam} ${sjaak.achternaam}, oprichter van FactumAI`;

/** Het portret op zichzelf: de gloed erachter, de uitsnede die onderaan in de pagina vervaagt. */
export function Alleen() {
  return (
    <div style={{ maxWidth: 300, margin: '0 auto' }}>
      <Portret src="/portret-cutout.webp" alt={ALT} />
    </div>
  );
}

/** Zoals op de homepage: in de band van de oprichter, met de kop en de bio ernaast. */
export function Oprichter() {
  return (
    <div className="home-world">
      <div className="home-founder" style={{ padding: '32px 0 0', borderRadius: 12 }}>
        <section className="relative overflow-hidden">
          <div
            className="band"
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 7fr)', gap: 36, alignItems: 'center' }}
          >
            <div style={{ maxWidth: 300 }}>
              <Portret src="/portret-cutout.webp" alt={ALT} />
            </div>
            <div className="relative pb-6">
              <h2 className="font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)]">
                Geen accountmanager.
                <br />
                De bouwer zelf.
              </h2>
              <p className="mt-5 text-[15px] leading-[1.65] text-[var(--fg-dim)]">{sjaak.langeBio[1]}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
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
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/plan" className="knop knop-primair">
                  Plan een gesprek
                </a>
                <a href={`/over/${sjaak.slug}`} className="knop knop-glas">
                  Meer over {sjaak.voornaam}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
