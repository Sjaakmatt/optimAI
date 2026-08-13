'use client';

import { motion } from 'motion/react';
import { TrendingUp, BookOpenCheck, Radar, Eye } from 'lucide-react';
import { VOORUIT_AGENTS, type SceneProps } from '../film-content';
import { beatReveal } from '../film-motion';

/**
 * Stap 7. Vooruitkijken: de geavanceerde agents. Vier kaarten die één
 * voor één opkomen: voorspellen, kennis ontsluiten, autonoom bewaken
 * en de markt volgen.
 */

const ICONS = [TrendingUp, BookOpenCheck, Radar, Eye];

export function SceneVooruit({ beat, reduced }: SceneProps) {
  return (
    <div className="mx-auto grid w-full max-w-[720px] grid-cols-1 gap-4 sm:grid-cols-2">
      {VOORUIT_AGENTS.map((agent, i) => {
        const Icon = ICONS[i];
        const visible = reduced || beat >= i + 1;
        return (
          <motion.article
            key={agent.titel}
            {...beatReveal(visible, reduced)}
            className="site-card px-5 py-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--oker-deep)]">
                {agent.type}
              </span>
              <Icon size={14} strokeWidth={1.5} className="shrink-0 text-[var(--ink-faint)]" aria-hidden />
            </div>
            <h3 className="mt-1.5 font-display text-[16px] leading-snug text-[var(--ink)]">
              {agent.titel}
            </h3>
            <p className="mt-1.5 text-[12px] leading-[1.55] text-[var(--ink-dim)]">{agent.body}</p>
            <p className="mt-2 border-t border-dashed border-[var(--paper-edge)] pt-1.5 text-[11.5px] italic leading-[1.5] text-[var(--ink-dim)]">
              {agent.voorbeeld}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}
