import type { Metadata } from 'next';
import { SitePage } from '@/components/site/SitePage';
import { BevestigKnop } from './BevestigKnop';

export const metadata: Metadata = {
  title: 'Bevestig je kennismaking',
  description: 'Nog één klik en je kennismaking met FactumAI staat vast in de agenda.',
  // Deze pagina hoort niet in Google: hij bestaat alleen met een geldige token
  // uit een mail, en een geïndexeerde variant zonder token is een dood spoor.
  robots: { index: false, follow: false },
};

export default async function BevestigenPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <SitePage>
      <section className="mx-auto max-w-[720px] px-5 sm:px-8 pt-16 sm:pt-24 pb-24">
        <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
          Kennismaking
        </div>
        <h1 className="mt-4 font-display text-[32px] sm:text-[44px] leading-[1.08] tracking-tight text-[var(--ink)]">
          Nog één klik en het{' '}
          <span className="italic text-[var(--oker-deep)]">staat vast.</span>
        </h1>

        <div className="mt-8 rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper)] px-6 sm:px-8 py-7">
          <BevestigKnop token={token ?? ''} />
        </div>
      </section>
    </SitePage>
  );
}
