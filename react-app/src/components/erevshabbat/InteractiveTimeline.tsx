import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import timelineBg from '../../assets/erevshabbat/fading-facts-bg.png';

const PRECANCEROUS_YEARS = 4.7;
const PROGRESSION_MONTHS = 11;
const TOTAL_UNITS = PRECANCEROUS_YEARS * 12 + PROGRESSION_MONTHS;
const PRECANCEROUS_RATIO = (PRECANCEROUS_YEARS * 12) / TOTAL_UNITS;

const InteractiveTimeline = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredPhase, setHoveredPhase] = useState<'pre' | 'prog' | null>(null);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32 md:px-16 md:py-48">
      <div className="absolute inset-0 z-0">
        <img src={timelineBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            The Window We Must Seize
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
            Oral cancer has a long precancerous stage, an average of 4.7 years where lesions are not yet
            malignant. Once progression begins, the window from Stage I to Stage III or IV is just 10 to 12
            months.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="mb-4 flex">
            <div style={{ width: `${PRECANCEROUS_RATIO * 100}%` }} className="pr-4">
              <p className="text-xs uppercase tracking-wider text-[#fae900]">Precancerous Stage</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#fae900] md:text-3xl">4.7 years</p>
            </div>
            <div style={{ width: `${(1 - PRECANCEROUS_RATIO) * 100}%` }}>
              <p className="text-xs uppercase tracking-wider text-destructive">Rapid Progression</p>
              <p className="mt-1 font-display text-2xl font-bold text-destructive md:text-3xl">10-12 months</p>
            </div>
          </div>

          <div className="relative flex h-16 overflow-hidden rounded-lg border border-border md:h-20">
            <motion.div
              className="relative h-full cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredPhase('pre')}
              onMouseLeave={() => setHoveredPhase(null)}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: `${PRECANCEROUS_RATIO * 100}%`,
                transformOrigin: 'left',
              }}
            >
              <div
                className={`absolute inset-0 transition-colors duration-300 ${
                  hoveredPhase === 'pre' ? 'bg-foreground/20' : 'bg-foreground/10'
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center border-[#fae900] bg-[#fae900]/30 shadow-none">
                <span className="text-xs font-bold text-[#fae900] md:text-lg">
                  Visible but curable - this is where AI intervenes
                </span>
              </div>
              <motion.div
                className="absolute bottom-0 right-0 top-0 w-[3px] bg-glow"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              className="relative h-full cursor-pointer"
              onMouseEnter={() => setHoveredPhase('prog')}
              onMouseLeave={() => setHoveredPhase(null)}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: `${(1 - PRECANCEROUS_RATIO) * 100}%`,
                transformOrigin: 'left',
              }}
            >
              <div
                className={`absolute inset-0 transition-colors duration-300 ${
                  hoveredPhase === 'prog' ? 'bg-destructive/25' : 'bg-destructive/15'
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <span className="text-center text-xs font-medium text-destructive md:text-sm">
                  Stage I to III in under a year
                </span>
              </div>
            </motion.div>
          </div>

          <div className="mt-4 flex text-[10px] font-medium uppercase tracking-wider text-white/80 md:text-xs">
            <div style={{ width: `${PRECANCEROUS_RATIO * 100}%` }} className="flex justify-between pr-2">
              <span />
              <span className="font-medium text-glow" />
            </div>
            <div style={{ width: `${(1 - PRECANCEROUS_RATIO) * 100}%` }} className="flex justify-between">
              <span>Stage I</span>
              <span>Stage III-IV</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;
