import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

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
];

type FadingFactsProps = {
  onFactsOwnershipChange?: (active: boolean) => void;
};

const FadingFacts = forwardRef<HTMLDivElement, FadingFactsProps>(({ onFactsOwnershipChange }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [direction, setDirection] = useState(1);
  const sectionModeRef = useRef(false);
  const wheelLockRef = useRef(false);
  const lastExitDirectionRef = useRef<number>(-1);

  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const scrollContainer = section.closest('.snap-container') as HTMLElement | null;
    if (!scrollContainer) return;

    const COOLDOWN_MS = 450;

    const enterSectionMode = () => {
      if (sectionModeRef.current) return;

      const startIndex = lastExitDirectionRef.current === 1 ? facts.length - 1 : 0;
      activeIndexRef.current = startIndex;
      setActiveIndex(startIndex);
      setDirection(lastExitDirectionRef.current === 1 ? -1 : 1);

      sectionModeRef.current = true;
      onFactsOwnershipChange?.(true);
      console.log('[FADING_FACTS_DEBUG] active section entered', { startIndex });
      console.log('[FADING_FACTS_DEBUG] current internal step', startIndex);
    };

    const releaseSectionMode = (exitDirection: number) => {
      if (!sectionModeRef.current) return;

      sectionModeRef.current = false;
      lastExitDirectionRef.current = exitDirection;
      onFactsOwnershipChange?.(false);
      console.log('[FADING_FACTS_DEBUG] release condition reached', { exitDirection });

      const sibling =
        exitDirection > 0 ? section.nextElementSibling : section.previousElementSibling;

      if (sibling instanceof HTMLElement) {
        window.requestAnimationFrame(() => {
          sibling.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }

      if (exitDirection > 0) {
        const footer = section.closest('#erev-page-root')?.querySelector('footer');
        if (footer instanceof HTMLElement) {
          window.requestAnimationFrame(() => {
            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }
    };

    const wheelHandler = (event: WheelEvent) => {
      if (!sectionModeRef.current) return;

      event.preventDefault();
      event.stopPropagation();

      if (wheelLockRef.current) return;

      const wheelDirection = event.deltaY > 0 ? 1 : -1;
      const current = activeIndexRef.current;
      const next = current + wheelDirection;

      console.log('[FADING_FACTS_DEBUG] wheel direction', wheelDirection > 0 ? 'down' : 'up');

      if (next < 0 || next >= facts.length) {
        releaseSectionMode(wheelDirection);
        return;
      }

      activeIndexRef.current = next;
      setDirection(wheelDirection);
      setActiveIndex(next);
      console.log('[FADING_FACTS_DEBUG] current internal step', next);

      wheelLockRef.current = true;
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, COOLDOWN_MS);
    };

    window.addEventListener('wheel', wheelHandler, { passive: false, capture: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.85) {
          enterSectionMode();
        } else if (!entry.isIntersecting && sectionModeRef.current) {
          sectionModeRef.current = false;
          onFactsOwnershipChange?.(false);
        }
      },
      { root: scrollContainer, threshold: [0, 0.85, 1] },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', wheelHandler, { capture: true } as AddEventListenerOptions);
    };
  }, [onFactsOwnershipChange]);

  const activeFact = facts[activeIndex];

  return (
    <section ref={containerRef} className="relative min-h-screen bg-background">
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
