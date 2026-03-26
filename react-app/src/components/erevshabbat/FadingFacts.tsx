import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

interface Fact {
  label: string;
  metric: string;
  description: string;
}

const facts: Fact[] = [
  {
    label: 'Cost per scan',
    metric: '<$0.01',
    description:
      'Less than one cent per photo analyzed. Making universal screening economically viable for every clinic on Earth.',
  },
  {
    label: 'Real-time results',
    metric: 'Instant',
    description:
      'AI analysis completes before the patient leaves the chair. No waiting, no follow-up appointments for preliminary results.',
  },
  {
    label: 'Detection accuracy',
    metric: '80%+',
    description:
      'Higher than expert-level accuracy in identifying precancerous and malignant oral lesions. Surpassing the diagnostic precision of seasoned specialists.',
  },
];

const FadingFacts = forwardRef<HTMLDivElement, Record<string, never>>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(0.9999, latest));
    const nextIndex = Math.min(facts.length - 1, Math.floor(clamped * facts.length));

    if (nextIndex !== previousIndexRef.current) {
      setDirection(nextIndex > previousIndexRef.current ? 1 : -1);
      previousIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

  const activeFact = facts[activeIndex];

  return (
    <section ref={containerRef} style={{ height: `${facts.length * 180}vh` }} className="relative bg-background">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
              backgroundSize: '44px 44px',
            }}
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.08),transparent_46%)]" />

        <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-center px-4 md:px-8">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9', maxHeight: '88vh' }}>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={activeFact.label}
                custom={direction}
                className="absolute inset-0 flex items-center justify-center px-6 md:px-10"
                initial={{ opacity: 0, y: direction > 0 ? 56 : -56, filter: 'blur(18px)', scale: 0.96 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: direction > 0 ? -56 : 56, filter: 'blur(18px)', scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'opacity, transform, filter' }}
              >
                <div className="flex max-w-5xl flex-col items-center text-center">
                  <span className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.42em] text-muted-foreground md:text-sm">
                    {activeFact.label}
                  </span>

                  <span className="font-display text-7xl font-bold leading-none tracking-[-0.06em] text-foreground sm:text-8xl md:text-[10rem] lg:text-[12rem]">
                    {activeFact.metric}
                  </span>

                  <p className="mt-8 max-w-3xl text-balance text-base leading-relaxed text-muted-foreground md:text-2xl md:leading-relaxed">
                    {activeFact.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});

FadingFacts.displayName = 'FadingFacts';

export default FadingFacts;
