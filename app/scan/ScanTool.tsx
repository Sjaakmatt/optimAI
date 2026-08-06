'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Check,
  Loader2,
  Sparkles,
  Rocket,
  Database,
  RotateCcw,
  AlertCircle,
  Mail,
} from 'lucide-react';
import type { ScanAnalysis, ScanEvent, ScanStageId } from '@/lib/scan/types';
import { trackEvent } from '@/lib/analytics/gtag';

const CONSENT_TEKST =
  'Ja, FactumAI mag mij af en toe mailen over wat AI voor mijn bedrijf kan betekenen.';

type StageStatus = 'pending' | 'busy' | 'done';
type Phase = 'form' | 'scanning' | 'result' | 'error';

const STAGES: { id: ScanStageId; label: (naam: string) => string }[] = [
  { id: 'website', label: () => 'We analyseren uw website' },
  { id: 'profiel', label: () => 'We brengen uw bedrijfsprofiel in kaart' },
  { id: 'branche', label: () => 'We bekijken de AI-kansen in uw branche' },
  { id: 'voorstellen', label: () => 'We stellen concrete agent-voorstellen op' },
];

const LABEL_TEXT: Record<ScanAnalysis['label'], string> = {
  hoog: 'Hoog AI-potentieel',
  gemiddeld: 'Duidelijke AI-kansen',
  beperkt: 'Beperkt zichtbaar potentieel',
};

const COMPLEX_LABEL: Record<string, string> = {
  gemiddeld: 'Complexiteit: gemiddeld',
  hoog: 'Complexiteit: hoog',
  'zeer hoog': 'Complexiteit: zeer hoog',
};

const IMPACT_LABEL: Record<string, string> = {
  laag: 'Impact: laag',
  middel: 'Impact: middel',
  hoog: 'Impact: hoog',
};

export function ScanTool() {
  const [phase, setPhase] = useState<Phase>('form');
  const [bedrijfsnaam, setBedrijfsnaam] = useState('');
  const [url, setUrl] = useState('');
  const [stages, setStages] = useState<Record<ScanStageId, StageStatus>>({
    website: 'pending',
    profiel: 'pending',
    branche: 'pending',
    voorstellen: 'pending',
  });
  const [result, setResult] = useState<ScanAnalysis | null>(null);
  const [resultNaam, setResultNaam] = useState('');
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const displayNaam = resultNaam || bedrijfsnaam || url.replace(/^https?:\/\//, '');

  // Vanaf de homepage-widget (/scan?url=…) start de scan direct.
  const searchParams = useSearchParams();
  const autoStarted = useRef(false);
  useEffect(() => {
    if (autoStarted.current) return;
    const paramUrl = searchParams.get('url')?.trim();
    if (!paramUrl) return;
    autoStarted.current = true;
    const paramNaam = searchParams.get('bedrijf')?.trim() ?? '';
    setUrl(paramUrl);
    setBedrijfsnaam(paramNaam);
    void runScan(paramNaam, paramUrl);
     
  }, [searchParams]);

  function startScan(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    void runScan(bedrijfsnaam, url);
  }

  async function runScan(naam: string, scanUrl: string) {
    setPhase('scanning');
    setError(null);
    setResult(null);
    setStages({ website: 'pending', profiel: 'pending', branche: 'pending', voorstellen: 'pending' });
    trackEvent('scan_start', { url: scanUrl });

    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bedrijfsnaam: naam, url: scanUrl }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          (body as { error?: string }).error ?? 'De scan kon niet worden gestart. Probeer het opnieuw.',
        );
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let gotResult = false;

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let sep: number;
        while ((sep = buffer.indexOf('\n\n')) !== -1) {
          const chunk = buffer.slice(0, sep);
          buffer = buffer.slice(sep + 2);
          const dataLine = chunk
            .split('\n')
            .find((l) => l.startsWith('data:'));
          if (!dataLine) continue;

          let event: ScanEvent;
          try {
            event = JSON.parse(dataLine.slice(5).trim()) as ScanEvent;
          } catch {
            continue;
          }

          if (event.type === 'stage') {
            setStages((prev) => ({ ...prev, [event.stage]: event.status }));
          } else if (event.type === 'result') {
            gotResult = true;
            setResult(event.result);
            setResultNaam(event.bedrijfsnaam);
            trackEvent('scan_complete', {
              score: event.result.score,
              label: event.result.label,
            });
            // Laatste vinkje even laten landen voor we doorschakelen.
            setTimeout(() => setPhase('result'), 650);
          } else if (event.type === 'error') {
            throw new Error(event.message);
          }
        }
      }

      if (!gotResult) {
        throw new Error('De verbinding werd onderbroken. Probeer het opnieuw.');
      }
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : 'De scan is mislukt.');
      setPhase('error');
    }
  }

  function reset() {
    abortRef.current?.abort();
    setPhase('form');
    setResult(null);
    setError(null);
  }

  return (
    <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-16">
      <AnimatePresence mode="wait">
        {phase === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <form
              onSubmit={startScan}
              className="max-w-[640px] bg-[var(--paper-warm)] border border-[var(--paper-edge)] rounded-[2px] p-6 sm:p-8"
            >
              <div className="grid gap-5">
                <div>
                  <label
                    htmlFor="scan-bedrijf"
                    className="block font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-[0.18em] mb-2"
                  >
                    Bedrijfsnaam <span className="text-[var(--ink-faint)]">· optioneel</span>
                  </label>
                  <input
                    id="scan-bedrijf"
                    type="text"
                    value={bedrijfsnaam}
                    onChange={(e) => setBedrijfsnaam(e.target.value)}
                    maxLength={160}
                    placeholder="Bijv. Nordveld Bouwmaterialen"
                    className="w-full px-4 py-3 rounded-[2px] bg-[var(--paper)] border border-[var(--paper-edge)] text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--oker)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="scan-url"
                    className="block font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-[0.18em] mb-2"
                  >
                    Website van uw bedrijf
                  </label>
                  <input
                    id="scan-url"
                    type="text"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    maxLength={300}
                    inputMode="url"
                    placeholder="uwbedrijf.nl"
                    className="w-full px-4 py-3 rounded-[2px] bg-[var(--paper)] border border-[var(--paper-edge)] text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--oker)]"
                  />
                </div>
                {/* Honeypot, verborgen voor mensen */}
                <input
                  type="text"
                  name="emailadres"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] text-[15px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
                >
                  Start de gratis scan
                  <ArrowRight size={16} strokeWidth={1.8} />
                </button>
                <p className="text-[12px] leading-[1.6] text-[var(--ink-faint)]">
                  We analyseren alleen openbare informatie op de website die u opgeeft. Voor de scan
                  zelf hoeft u niets achter te laten. Het resultaat is een automatische analyse,
                  een eerste beeld, geen offerte.
                </p>
              </div>
            </form>
          </motion.div>
        )}

        {phase === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-[640px]"
          >
            <h2 className="font-display text-[26px] sm:text-[32px] leading-[1.15] tracking-tight text-[var(--ink)] mb-8">
              We analyseren nu wat AI-agents kunnen betekenen voor{' '}
              <span className="italic text-[var(--oker-deep)]">{displayNaam}</span>
            </h2>
            <div className="space-y-3" role="status" aria-live="polite">
              {STAGES.map((stage, i) => {
                const status = stages[stage.id];
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className={`flex items-center justify-between gap-4 px-5 py-4 rounded-[2px] border transition-colors ${
                      status === 'pending'
                        ? 'bg-[var(--paper-warm)] border-[var(--paper-edge)] opacity-60'
                        : 'bg-[var(--paper-warm)] border-[var(--paper-edge)]'
                    }`}
                  >
                    <span
                      className={`text-[15px] leading-snug ${
                        status === 'done' ? 'text-[var(--ink)]' : 'text-[var(--ink-dim)]'
                      }`}
                    >
                      {stage.label(displayNaam)}
                    </span>
                    <span className="shrink-0">
                      {status === 'done' ? (
                        <motion.span
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--oker)] text-[var(--paper)]"
                        >
                          <Check size={15} strokeWidth={2.5} />
                        </motion.span>
                      ) : status === 'busy' ? (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--oker)] text-[var(--oker-deep)]">
                          <Loader2 size={15} strokeWidth={2} className="animate-spin" />
                        </span>
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--paper-edge)]">
                          <Check size={15} strokeWidth={2} className="text-[var(--paper-edge)]" />
                        </span>
                      )}
                    </span>
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-6 text-[13px] text-[var(--ink-faint)]">
              Dit duurt doorgaans een halve tot één minuut.
            </p>
          </motion.div>
        )}

        {phase === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-[640px] bg-[var(--paper-warm)] border border-[var(--paper-edge)] rounded-[2px] p-6 sm:p-8"
          >
            <div className="flex items-start gap-3">
              <AlertCircle size={20} strokeWidth={1.8} className="text-[var(--oker-deep)] mt-0.5 shrink-0" />
              <div>
                <p className="text-[15px] leading-[1.7] text-[var(--ink)]">{error}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
                  >
                    <RotateCcw size={15} strokeWidth={1.8} />
                    Opnieuw proberen
                  </button>
                  <Link
                    href="/plan"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
                  >
                    Plan een gesprek
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Score + samenvatting */}
            <div className="grid gap-6 lg:grid-cols-[300px_1fr] items-start">
              <div className="bg-[var(--paper-warm)] border border-[var(--paper-edge)] rounded-[2px] p-6 text-center">
                <div className="font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-[0.18em]">
                  AI-potentieel
                </div>
                <div className="mt-3 font-display text-[56px] leading-none text-[var(--oker-deep)]">
                  {result.score}
                  <span className="text-[22px] text-[var(--ink-faint)]">/100</span>
                </div>
                <div className="mt-3 inline-block px-3 py-1 rounded-[2px] bg-[var(--oker-soft)] font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oker-deep)]">
                  {LABEL_TEXT[result.label]}
                </div>
              </div>
              <div>
                <h2 className="font-display text-[26px] sm:text-[30px] leading-[1.2] tracking-tight text-[var(--ink)]">
                  Wat AI-agents kunnen betekenen voor{' '}
                  <span className="italic text-[var(--oker-deep)]">{displayNaam}</span>
                </h2>
                <p className="mt-4 text-[15px] leading-[1.75] text-[var(--ink-dim)]">
                  {result.samenvatting}
                </p>
                {result.websiteAnalyse && (
                  <p className="mt-3 text-[14px] leading-[1.7] text-[var(--ink-faint)]">
                    {result.websiteAnalyse}
                  </p>
                )}
              </div>
            </div>

            {/* Bedrijfsprofiel */}
            {(result.companyProfile.sector ||
              result.companyProfile.activiteiten ||
              result.companyProfile.doelgroep) && (
              <div className="mt-10">
                <div className="font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-[0.18em] mb-3">
                  Wat we zagen
                </div>
                <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2 bg-[var(--paper-warm)] border border-[var(--paper-edge)] rounded-[2px] p-6">
                  {(
                    [
                      ['Sector', result.companyProfile.sector],
                      ['Activiteiten', result.companyProfile.activiteiten],
                      ['Omvang', result.companyProfile.omvang],
                      ['Doelgroep', result.companyProfile.doelgroep],
                      ['Locatie', result.companyProfile.locatie],
                    ] as const
                  )
                    .filter(([, v]) => v)
                    .map(([label, value]) => (
                      <div key={label}>
                        <dt className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                          {label}
                        </dt>
                        <dd className="mt-1 text-[14px] leading-[1.6] text-[var(--ink)]">{value}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            )}

            {/* Branchekansen */}
            {result.brancheKansen && (
              <div className="mt-10">
                <div className="font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-[0.18em] mb-3">
                  Wat er in uw branche gebeurt
                </div>
                <p className="text-[15px] leading-[1.75] text-[var(--ink-dim)] max-w-[720px]">
                  {result.brancheKansen}
                </p>
              </div>
            )}

            {/* Simpele kansen */}
            {result.aiOpportunities.length > 0 && (
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} strokeWidth={1.8} className="text-[var(--oker-deep)]" />
                  <h3 className="font-display text-[22px] tracking-tight text-[var(--ink)]">
                    Snel te automatiseren
                  </h3>
                </div>
                <p className="text-[13px] text-[var(--ink-faint)] mb-4 max-w-[640px]">
                  Standaardprocessen waar een AI-agent vrijwel direct werk uit handen neemt.
                </p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {result.aiOpportunities.map((kans, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-start gap-3 bg-[var(--paper-warm)] border border-[var(--paper-edge)] rounded-[2px] px-4 py-3.5"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--oker)] text-[var(--paper)]">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="text-[14px] leading-[1.6] text-[var(--ink)]">{kans}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Geavanceerde voorstellen */}
            {result.advancedSolutions.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center gap-2 mb-4">
                  <Rocket size={16} strokeWidth={1.8} className="text-[var(--oker-deep)]" />
                  <h3 className="font-display text-[22px] tracking-tight text-[var(--ink)]">
                    Een stap verder: geavanceerde agents
                  </h3>
                </div>
                <p className="text-[13px] text-[var(--ink-faint)] mb-5 max-w-[640px]">
                  Complexere agent-oplossingen, toegespitst op uw bedrijf, voorbij de
                  standaardprocessen.
                </p>
                <div className="grid gap-4 lg:grid-cols-2">
                  {result.advancedSolutions.map((sol, i) => (
                    <motion.article
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className="bg-[var(--paper-warm)] border border-[var(--paper-edge)] rounded-[2px] p-5 sm:p-6 flex flex-col"
                    >
                      <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.16em]">
                        {sol.categorie}
                      </div>
                      <h4 className="mt-2 font-display text-[19px] leading-snug text-[var(--ink)]">
                        {sol.titel}
                      </h4>
                      <p className="mt-2.5 text-[14px] leading-[1.7] text-[var(--ink-dim)] flex-1">
                        {sol.beschrijving}
                      </p>
                      {sol.voorbeeld && (
                        <p className="mt-3 text-[13px] leading-[1.65] text-[var(--ink-faint)] italic border-l-2 border-[var(--oker)] pl-3">
                          {sol.voorbeeld}
                        </p>
                      )}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-[2px] bg-[var(--oker-soft)] font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--oker-deep)]">
                          {COMPLEX_LABEL[sol.complexiteit]}
                        </span>
                        <span className="px-2.5 py-1 rounded-[2px] bg-[var(--paper)] border border-[var(--paper-edge)] font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-dim)]">
                          {IMPACT_LABEL[sol.impact]}
                        </span>
                      </div>
                      {sol.dataBronnen.length > 0 && (
                        <div className="mt-3 flex items-start gap-2 text-[12px] text-[var(--ink-faint)]">
                          <Database size={13} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                          <span>{sol.dataBronnen.join(' · ')}</span>
                        </div>
                      )}
                    </motion.article>
                  ))}
                </div>
              </div>
            )}

            {/* Volledig rapport per e-mail */}
            <RapportBlok
              result={result}
              bedrijfsnaam={resultNaam || bedrijfsnaam}
              website={url}
            />

            {/* CTA */}
            <div className="mt-8 bg-[var(--paper-deep)] border border-[var(--paper-edge)] rounded-[2px] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h3 className="font-display text-[22px] sm:text-[24px] leading-snug text-[var(--ink)] max-w-[520px]">
                  Benieuwd wat dit concreet oplevert?{' '}
                  <span className="italic text-[var(--oker-deep)]">
                    We rekenen het graag met u door.
                  </span>
                </h3>
                <p className="mt-2 text-[13px] text-[var(--ink-faint)] max-w-[520px]">
                  Deze scan is een automatische eerste analyse op basis van openbare
                  website-informatie. In een gesprek van 30 minuten maken we het concreet.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/plan"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
                >
                  Plan een gesprek
                  <ArrowRight size={16} strokeWidth={1.8} />
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
                >
                  <RotateCcw size={15} strokeWidth={1.8} />
                  Nog een scan
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type RapportStatus = 'idle' | 'busy' | 'done' | 'error';

function RapportBlok({
  result,
  bedrijfsnaam,
  website,
}: {
  result: ScanAnalysis;
  bedrijfsnaam: string;
  website: string;
}) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true); // opt-in standaard aangevinkt
  const [status, setStatus] = useState<RapportStatus>('idle');
  const [foutmelding, setFoutmelding] = useState<string | null>(null);
  const honeypot = useRef('');

  async function verstuur(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === 'busy') return;
    setStatus('busy');
    setFoutmelding(null);
    try {
      const res = await fetch('/api/scan-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website,
          bedrijfsnaam,
          email: email.trim(),
          consent,
          consentText: CONSENT_TEKST,
          result,
          telefoon: honeypot.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setFoutmelding(data.error ?? 'Verzenden mislukte. Probeer het opnieuw.');
        setStatus('error');
        return;
      }
      trackEvent('scan_report_request', { consent });
      setStatus('done');
    } catch {
      setFoutmelding('Verzenden mislukte. Controleer uw verbinding en probeer opnieuw.');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="mt-14 bg-[var(--paper-warm)] border border-[var(--oker)] rounded-[2px] p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--oker)] text-[var(--paper)]">
            <Check size={14} strokeWidth={2.5} />
          </span>
          <div>
            <h3 className="font-display text-[20px] leading-snug text-[var(--ink)]">
              Het volledige rapport is onderweg.
            </h3>
            <p className="mt-1.5 text-[13px] leading-[1.7] text-[var(--ink-dim)]">
              Check uw inbox (en eventueel de spam-map). Niets ontvangen? Mail ons gerust op
              info@factumai.nl.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-14 bg-[var(--paper-warm)] border border-[var(--paper-edge)] rounded-[2px] p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <Mail size={20} strokeWidth={1.8} className="text-[var(--oker-deep)] mt-0.5 shrink-0" />
        <div className="flex-1">
          <h3 className="font-display text-[22px] sm:text-[24px] leading-snug text-[var(--ink)]">
            Wilt u het volledige rapport per e-mail?
          </h3>
          <p className="mt-2 text-[13px] leading-[1.7] text-[var(--ink-dim)] max-w-[560px]">
            U ontvangt een uitgebreide versie van deze analyse, met een concreet stappenplan en een
            duiding per geavanceerd voorstel. Handig om intern te delen.
          </p>

          <form onSubmit={verstuur} className="mt-5 max-w-[520px]">
            {/* Honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              onChange={(e) => (honeypot.current = e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={160}
                placeholder="uw@bedrijf.nl"
                aria-label="Uw e-mailadres"
                className="flex-1 px-4 py-3 rounded-[2px] bg-[var(--paper)] border border-[var(--paper-edge)] text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--oker)]"
              />
              <button
                type="submit"
                disabled={status === 'busy'}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[2px] text-[15px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors disabled:opacity-60"
              >
                {status === 'busy' ? (
                  <>
                    <Loader2 size={16} strokeWidth={2} className="animate-spin" />
                    Versturen…
                  </>
                ) : (
                  <>
                    Stuur mij het rapport
                    <ArrowRight size={16} strokeWidth={1.8} />
                  </>
                )}
              </button>
            </div>

            <label className="mt-4 flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--oker-deep)]"
              />
              <span className="text-[12.5px] leading-[1.6] text-[var(--ink-dim)]">
                {CONSENT_TEKST} U kunt zich altijd weer afmelden. Zie onze{' '}
                <Link
                  href="/privacy"
                  className="underline decoration-dotted underline-offset-2 hover:text-[var(--oker-deep)]"
                >
                  privacyverklaring
                </Link>
                .
              </span>
            </label>

            {foutmelding && (
              <p className="mt-3 text-[13px] leading-[1.6] text-[var(--terra)]">{foutmelding}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
