import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import problemBg from '../../assets/erevshabbat/problem-bg.png';

interface ProblemFactor {
  title: string;
  stat: string;
  description: string;
}

const factors: ProblemFactor[] = [
  {
    title: 'Silent Progression',
    stat: '80%',
    description: 'of precancerous oral lesions show no pain or obvious symptoms in early stages',
  },
  {
    title: 'Missed Touchpoints',
    stat: '2x/year',
    description: 'patients visit dentists regularly, yet screening for oral cancer is not standardized',
  },
  {
    title: 'Late Detection',
    stat: '60%',
    description: 'of oral cancer cases are discovered at Stage 3 or 4, when survival rates plummet',
  },
  {
    title: 'Survival Impact',
    stat: '~30%',
    description: '5-year survival rate for late-stage oral cancer vs 84% when caught early',
  },
];

const ORBIT_RADIUS = 280;
const CIRCLE_SIZE = 240;
const ORBIT_DURATION = 20;

const ProblemBlock = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-48">
      <div className="absolute inset-0 z-0">
        <img src={problemBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-16">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-display text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            style={{ color: 'hsl(0, 72%, 42%)' }}
          >
            Why Are We Still Losing?
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-6 md:hidden">
          {factors.map((factor, index) => (
            <motion.div
              key={factor.title}
              className="flex h-44 w-44 flex-col items-center justify-center rounded-full border border-border bg-card p-4 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display text-2xl font-bold text-foreground">{factor.stat}</span>
              <span className="mt-1 font-display text-xs font-semibold text-foreground">{factor.title}</span>
              <span className="mt-1 px-2 text-[10px] leading-tight text-text-secondary">{factor.description}</span>
            </motion.div>
          ))}
        </div>

        <div className="hidden items-center justify-center md:flex">
          <div
            className="relative"
            style={{ width: (ORBIT_RADIUS + CIRCLE_SIZE) * 2, height: (ORBIT_RADIUS + CIRCLE_SIZE) * 2 }}
          >
            <motion.div
              className="absolute rounded-full border border-border/30"
              style={{
                width: ORBIT_RADIUS * 2,
                height: ORBIT_RADIUS * 2,
                top: CIRCLE_SIZE,
                left: CIRCLE_SIZE,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {factors.map((factor, index) => {
              const startAngle = (index * 360) / factors.length;

              return (
                <motion.div
                  key={factor.title}
                  className="absolute"
                  style={{
                    width: CIRCLE_SIZE,
                    height: CIRCLE_SIZE,
                    top: ORBIT_RADIUS + CIRCLE_SIZE - CIRCLE_SIZE / 2,
                    left: ORBIT_RADIUS + CIRCLE_SIZE - CIRCLE_SIZE / 2,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                          x: [
                            Math.cos((startAngle * Math.PI) / 180) * ORBIT_RADIUS,
                            Math.cos(((startAngle + 90) * Math.PI) / 180) * ORBIT_RADIUS,
                            Math.cos(((startAngle + 180) * Math.PI) / 180) * ORBIT_RADIUS,
                            Math.cos(((startAngle + 270) * Math.PI) / 180) * ORBIT_RADIUS,
                            Math.cos(((startAngle + 360) * Math.PI) / 180) * ORBIT_RADIUS,
                          ],
                          y: [
                            Math.sin((startAngle * Math.PI) / 180) * ORBIT_RADIUS,
                            Math.sin(((startAngle + 90) * Math.PI) / 180) * ORBIT_RADIUS,
                            Math.sin(((startAngle + 180) * Math.PI) / 180) * ORBIT_RADIUS,
                            Math.sin(((startAngle + 270) * Math.PI) / 180) * ORBIT_RADIUS,
                            Math.sin(((startAngle + 360) * Math.PI) / 180) * ORBIT_RADIUS,
                          ],
                        }
                      : {}
                  }
                  transition={{
                    opacity: { duration: 0.6, delay: 0.3 + index * 0.15 },
                    scale: { duration: 0.6, delay: 0.3 + index * 0.15 },
                    x: { duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear', delay: 0.3 + index * 0.15 },
                    y: { duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear', delay: 0.3 + index * 0.15 },
                  }}
                >
                  <div className="flex h-full w-full cursor-default flex-col items-center justify-center rounded-full border border-border bg-card/80 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-text-dim hover:bg-card">
                    <span className="font-display text-4xl font-bold text-foreground">{factor.stat}</span>
                    <span className="mt-2 font-display text-sm font-semibold text-foreground">{factor.title}</span>
                    <span className="mt-1.5 px-3 text-xs leading-tight text-text-secondary">
                      {factor.description}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemBlock;
