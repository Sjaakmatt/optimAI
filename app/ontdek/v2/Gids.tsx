'use client';

import { motion, AnimatePresence } from 'motion/react';

/**
 * De gids: het terugkerende agent-personage dat de bezoeker door de
 * wandeling leidt. Eén state machine met zes toestanden; per toestand
 * wisselen de armen en het attribuut (brief, gedachten, pen, spraak-
 * wolkje, stop-hand). Getekend in de inkt-en-papier-stijl van de
 * wereld.
 *
 * Dit is bewust een code-personage: een Rive-artboard (.riv) vereist de
 * Rive-editor en kan niet in code geschreven worden. De states hier
 * spiegelen exact de gewenste Rive state machine (idle, leest, denkt,
 * maakt, overlegt, stopt), zodat een .riv-bestand later een drop-in
 * vervanging is.
 */

export type GidsState = 'idle' | 'leest' | 'denkt' | 'maakt' | 'overlegt' | 'stopt';

const PROP_TRANS = { duration: 0.35, ease: 'easeOut' } as const;

export function Gids({
  state,
  walking,
  rustig,
  className,
  style,
}: {
  state: GidsState;
  walking: boolean;
  rustig: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      aria-hidden
      className={className}
      style={style}
      animate={!rustig && walking ? { y: [0, -2.5, 0] } : { y: 0 }}
      transition={walking ? { duration: 0.4, repeat: Infinity } : { duration: 0.2 }}
    >
      <svg viewBox="0 0 96 116" className="h-full w-auto overflow-visible" focusable="false">
        {/* ademende romp */}
        <motion.g
          animate={rustig ? undefined : { scaleY: [1, 1.015, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '40px', originY: '86px' }}
        >
          <g stroke="var(--ink)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            {/* hoofd met pet */}
            <circle cx={40} cy={30} r={9} fill="var(--paper)" />
            <path d="M31 26.5 C 33 19.5, 47 19.5, 49 26.5 L 53.5 27.5" fill="none" stroke="var(--terra)" strokeWidth={2.4} />
            {/* oog + glimlach */}
            <circle cx={43.5} cy={29.5} r={1} fill="var(--ink)" strokeWidth={0} />
            <path d="M41 34.5 q 3 2.4 6 0.6" fill="none" strokeWidth={1.4} />
            {/* jas */}
            <path d="M33 40 L 47 40 L 51 74 L 29 74 Z" fill="var(--ink-dim)" fillOpacity={0.88} />
            {/* benen */}
            <motion.path
              fill="none"
              d="M35 74 L 30 96"
              animate={
                walking && !rustig
                  ? { d: ['M35 74 L 30 96', 'M35 74 L 42 97', 'M35 74 L 30 96'] }
                  : { d: 'M35 74 L 32 96' }
              }
              transition={walking ? { duration: 0.5, repeat: Infinity } : { duration: 0.2 }}
            />
            <motion.path
              fill="none"
              d="M45 74 L 50 96"
              animate={
                walking && !rustig
                  ? { d: ['M45 74 L 50 96', 'M45 74 L 36 97', 'M45 74 L 50 96'] }
                  : { d: 'M45 74 L 48 96' }
              }
              transition={walking ? { duration: 0.5, repeat: Infinity } : { duration: 0.2 }}
            />
          </g>

          {/* armen + attribuut per toestand */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.g
              key={state}
              initial={rustig ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={rustig ? { opacity: 0 } : { opacity: 0, transition: { duration: 0.15 } }}
              transition={PROP_TRANS}
              stroke="var(--ink)"
              strokeWidth={2.2}
              strokeLinecap="round"
              fill="none"
            >
              {state === 'leest' && (
                <g>
                  <path d="M34 48 L 24 56 L 26 60" />
                  <path d="M46 48 L 56 56 L 53 60" />
                  {/* de brief in beide handen */}
                  <g transform="translate(40 66) rotate(-4)">
                    <rect x={-15} y={-10} width={30} height={20} rx={1.5} fill="var(--paper)" stroke="var(--ink)" strokeWidth={1.6} />
                    <path d="M-10 -4 H 10 M-10 1 H 10 M-10 6 H 4" stroke="var(--ink-faint)" strokeWidth={1.3} />
                    {/* lees-sweep */}
                    {!rustig && (
                      <motion.rect
                        x={-15}
                        width={8}
                        y={-10}
                        height={20}
                        fill="var(--oker)"
                        opacity={0.25}
                        animate={{ x: [-15, 7, -15] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </g>
                </g>
              )}
              {state === 'denkt' && (
                <g>
                  <path d="M34 48 L 27 62" />
                  <path d="M46 48 L 52 40 L 47 36" />
                  {[0, 1, 2].map((i) => (
                    <motion.circle
                      key={i}
                      cx={56 + i * 7}
                      cy={24 - i * 8}
                      r={2 + i * 1.2}
                      fill="var(--paper)"
                      stroke="var(--ink-faint)"
                      strokeWidth={1.2}
                      animate={rustig ? undefined : { opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </g>
              )}
              {state === 'maakt' && (
                <g>
                  <path d="M34 48 L 26 60" />
                  <path d="M46 48 L 57 56" />
                  {/* pen die schrijft */}
                  <motion.g
                    animate={rustig ? undefined : { x: [0, 4, 0], y: [0, 1, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <line x1={57} y1={56} x2={64} y2={62} stroke="var(--oker-deep)" strokeWidth={2} />
                  </motion.g>
                  <path d="M52 66 q 8 3 16 0" stroke="var(--ink-faint)" strokeWidth={1.3} />
                </g>
              )}
              {state === 'overlegt' && (
                <g>
                  <path d="M34 48 L 26 60" />
                  <path d="M46 48 L 58 44" />
                  {/* spraakwolkje richting de mens */}
                  <g transform="translate(69 34)">
                    <rect x={-10} y={-9} width={24} height={18} rx={5} fill="var(--paper)" stroke="var(--ink-dim)" strokeWidth={1.5} />
                    <path d="M-4 9 L -7 15 L 1 9" fill="var(--paper)" stroke="var(--ink-dim)" strokeWidth={1.5} />
                    <circle cx={-3} cy={0} r={1.4} fill="var(--ink-dim)" strokeWidth={0} />
                    <circle cx={2} cy={0} r={1.4} fill="var(--ink-dim)" strokeWidth={0} />
                    <circle cx={7} cy={0} r={1.4} fill="var(--ink-dim)" strokeWidth={0} />
                  </g>
                </g>
              )}
              {state === 'stopt' && (
                <g>
                  <path d="M34 48 L 26 60" />
                  {/* opgeheven hand: hier beslist een mens */}
                  <path d="M46 48 L 58 38" />
                  <g transform="translate(61 33)">
                    <circle r={6.5} fill="var(--paper)" stroke="var(--terra)" strokeWidth={2} />
                    <path d="M0 -3 L 0 3" stroke="var(--terra)" strokeWidth={2} />
                  </g>
                </g>
              )}
              {state === 'idle' && (
                <g>
                  <path d="M34 48 L 28 60" />
                  <path d="M46 48 L 52 60" />
                  {/* lantaarntje */}
                  <rect x={50} y={58} width={7} height={9} rx={1.5} fill="var(--oker)" stroke="var(--ink)" strokeWidth={1.5} />
                  <circle cx={53.5} cy={63} r={8} fill="var(--oker)" opacity={0.16} strokeWidth={0} />
                </g>
              )}
            </motion.g>
          </AnimatePresence>
        </motion.g>
      </svg>
    </motion.div>
  );
}
