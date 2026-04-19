'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'factumai.cookie.v1';

type Choice = 'accept' | 'decline';

export function CookieBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Toon pas na korte delay zodat de site eerst rustig landt
        const t = setTimeout(() => setVisible(true), 900);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage niet beschikbaar: toon gewoon
      setVisible(true);
    }
  }, []);

  function choose(c: Choice) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice: c, at: Date.now() }),
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-[420px] z-[90]"
        >
          <div className="artifact-card artifact-card--lift px-5 py-4">
            <div className="flex items-start gap-3">
              <Cookie
                size={16}
                strokeWidth={1.5}
                className="mt-0.5 text-[var(--oker-deep)] shrink-0"
              />
              <div className="flex-1">
                <div className="font-display text-[14px] text-[var(--ink)] leading-snug">
                  Korte vraag over cookies
                </div>
                <p className="mt-1 text-[12.5px] text-[var(--ink-dim)] leading-[1.55]">
                  Wij gebruiken alleen functionele cookies — geen tracking, geen advertenties. Voor
                  statistiek houden we met uw toestemming anoniem bij welke pagina’s populair zijn.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => choose('accept')}
                    className="px-3 py-1.5 rounded-[2px] text-[12.5px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
                  >
                    Akkoord
                  </button>
                  <button
                    onClick={() => choose('decline')}
                    className="px-3 py-1.5 rounded-[2px] text-[12.5px] text-[var(--ink-dim)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] transition-colors"
                  >
                    Alleen functioneel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
