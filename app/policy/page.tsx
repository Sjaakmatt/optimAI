import { TopBar } from '@/components/TopBar';
import { PolicyEditor } from '@/components/PolicyEditor';

export default function PolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <main className="flex-1 p-6 max-w-[1280px] w-full mx-auto space-y-6">
        <header>
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
            Policy
          </div>
          <h1 className="font-display text-[34px] leading-tight text-[var(--text)]">
            U bepaalt de regels
          </h1>
          <p className="mt-1 text-[13px] text-[var(--text-dim)] max-w-[640px]">
            Per agent staan hieronder de guardrails die gelden. Schakel ze in of uit — de agent
            past zich direct aan. Niks gaat zonder uw groen licht naar uw klanten.
          </p>
        </header>

        <PolicyEditor />
      </main>
    </div>
  );
}
