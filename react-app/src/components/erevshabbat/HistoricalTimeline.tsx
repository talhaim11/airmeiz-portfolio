import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import timeline1896 from '../../assets/erevshabbat/timeline-1896.png';
import timeline1933 from '../../assets/erevshabbat/timeline-1933.jpg';
import timeline1942 from '../../assets/erevshabbat/timeline-1942.png';
import timeline1971bg from '../../assets/erevshabbat/timeline-1971-bg.png';
import timeline1971newspaper from '../../assets/erevshabbat/timeline-1971-newspaper.webp';
import timeline2010 from '../../assets/erevshabbat/timeline-2010.png';
import timeline2014 from '../../assets/erevshabbat/timeline-2014.png';
import timeline2026 from '../../assets/erevshabbat/timeline-2026.png';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  backgroundImage?: string;
  overlayImage?: string;
}

type HistoricalTimelineProps = {
  onTimelineOwnershipChange?: (active: boolean) => void;
};

const events: TimelineEvent[] = [
  {
    year: '1896',
    title: 'First Radiation Therapy',
    description:
      "Shortly after Wilhelm Rontgen's discovery of X-rays in 1895, physicians began using radiation to treat cancer, marking the dawn of radiotherapy.",
    backgroundImage: timeline1896,
  },
  {
    year: '1933',
    title: 'Radical Neck Dissection',
    description:
      'Dr. Hayes Martin standardizes the radical neck dissection procedure, becoming the gold standard for decades.',
    backgroundImage: timeline1933,
  },
  {
    year: '1942',
    title: 'Chemotherapy Era Begins',
    description:
      'Doctors at Yale University treat a patient with non-Hodgkin lymphoma using nitrogen mustard, paving the way for modern chemotherapy.',
    backgroundImage: timeline1942,
  },
  {
    year: '1971',
    title: 'National Cancer Act',
    description:
      "President Nixon declares 'War on Cancer,' massively increasing funding for cancer research.",
    backgroundImage: timeline1971bg,
    overlayImage: timeline1971newspaper,
  },
  {
    year: '2010',
    title: 'HPV-Positive HNSCC Recognized',
    description:
      'HPV-positive head and neck squamous cell carcinoma is officially recognized as a separate clinical entity with distinct molecular characteristics and better prognosis.',
    backgroundImage: timeline2010,
  },
  {
    year: '2014',
    title: 'Pembrolizumab Approved',
    description:
      'FDA approves Pembrolizumab (Keytruda), the first human PD-1 blocking antibody, initially for unresectable or metastatic melanoma.',
    backgroundImage: timeline2014,
  },
  {
    year: '2026',
    title: 'EREVSHABAT',
    description:
      'AI-powered chair-side screening becomes a universal standard, making late-stage oral cancer a relic of the past.',
    backgroundImage: timeline2026,
  },
];

const HistoricalTimeline = ({ onTimelineOwnershipChange }: HistoricalTimelineProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const timelineModeRef = useRef(false);
  const wheelLockRef = useRef(false);
  // Tracks which direction we last exited: 1 = scrolled forward (down), -1 = scrolled backward (up).
  // Used to determine the correct starting slide when re-entering the section.
  const lastExitDirectionRef = useRef<number>(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollContainer = section.closest('.snap-container') as HTMLElement | null;
    if (!scrollContainer) return;

    console.log('[TIMELINE_DEBUG] timeline mounted');
    console.log('[TIMELINE_DEBUG] section:', section);
    console.log('[TIMELINE_DEBUG] scrollContainer:', scrollContainer);

    const COOLDOWN_MS = 450;

    const enterTimelineMode = () => {
      if (timelineModeRef.current) return;

      // If we last exited by scrolling forward (down past the last slide), the user
      // is now entering from below — show the last slide. Otherwise show the first.
      const startIndex = lastExitDirectionRef.current === 1 ? events.length - 1 : 0;
      activeIndexRef.current = startIndex;
      setActiveIndex(startIndex);

      timelineModeRef.current = true;
      onTimelineOwnershipChange?.(true);
      console.log('[TIMELINE_DEBUG] entered viewport, start slide', startIndex);
    };

    const releaseTimelineMode = (exitDirection: number) => {
      if (!timelineModeRef.current) return;

      timelineModeRef.current = false;
      lastExitDirectionRef.current = exitDirection;
      onTimelineOwnershipChange?.(false);
      console.log('[TIMELINE_DEBUG] release triggered, exit direction', exitDirection);

      // Programmatically advance the snap container to the correct sibling section.
      const sibling =
        exitDirection > 0 ? section.nextElementSibling : section.previousElementSibling;
      if (sibling instanceof HTMLElement) {
        window.requestAnimationFrame(() => {
          sibling.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    };

    const wheelHandler = (event: WheelEvent) => {
      if (!timelineModeRef.current) return;

      event.preventDefault();
      event.stopPropagation();
      console.log('[TIMELINE_DEBUG] wheel captured', {
        deltaY: event.deltaY,
        currentSlide: activeIndexRef.current,
      });

      if (wheelLockRef.current) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const current = activeIndexRef.current;
      const next = current + direction;

      // Boundary: exit timeline and hand control back to the snap container.
      if (next < 0 || next >= events.length) {
        releaseTimelineMode(direction);
        return;
      }

      // Advance slide directly via React state — no DOM scrolling needed.
      activeIndexRef.current = next;
      setActiveIndex(next);
      console.log('[TIMELINE_DEBUG] internal slide index', next);

      wheelLockRef.current = true;
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, COOLDOWN_MS);
    };

    window.addEventListener('wheel', wheelHandler, { passive: false, capture: true });

    // Observe the section itself (now 100vh — same size as the snap container viewport).
    // Ratio approaches 1.0 when the snap container has snapped to this section.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        console.log('[TIMELINE_DEBUG] observer', {
          isIntersecting: entry.isIntersecting,
          ratio: Number(entry.intersectionRatio.toFixed(2)),
        });

        if (entry.isIntersecting && entry.intersectionRatio >= 0.85) {
          enterTimelineMode();
        } else if (!entry.isIntersecting && timelineModeRef.current) {
          // Section left viewport without our explicit release (e.g. programmatic scroll).
          timelineModeRef.current = false;
          onTimelineOwnershipChange?.(false);
        }
      },
      { root: scrollContainer, threshold: [0, 0.85, 1] },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', wheelHandler, { capture: true } as AddEventListenerOptions);
      console.log('[TIMELINE_DEBUG] timeline cleanup');
    };
  }, [onTimelineOwnershipChange]);

  const currentEvent = events[activeIndex];
  const currentBg = currentEvent?.backgroundImage;

  return (
    <section
      id="erev-historical-timeline"
      ref={sectionRef}
      className="relative"
      style={{ outline: '2px dashed #f97316' }}
    >
      {/* DEBUG marker: orange dashed outline confirms section boundaries in the DOM */}

      <div
        data-debug="timeline-sticky-viewport"
        className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {currentBg && (
            <motion.div
              key={activeIndex}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src={currentBg} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-background/70" />

              {currentEvent?.overlayImage && (
                <div className="absolute bottom-6 left-1/2 z-10 w-[90%] max-w-2xl -translate-x-1/2">
                  <img
                    src={currentEvent.overlayImage}
                    alt=""
                    className="w-full rounded-sm border border-foreground/10 opacity-90 shadow-2xl"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!currentBg && <div className="absolute inset-0 z-0 bg-background" />}

        <div className="relative z-10 mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-text-dim">History of Treatment</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            A Century of Progress
          </h2>
        </div>

        <div className="relative z-10 flex w-full justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="w-full max-w-xl p-8 md:p-10"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className={`font-display text-5xl font-bold tracking-tight md:text-6xl ${
                  activeIndex === events.length - 1 ? 'text-glow' : 'text-foreground'
                }`}
              >
                {currentEvent.year}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground md:text-2xl">
                {currentEvent.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                {currentEvent.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 mt-10 flex gap-2">
          {events.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? index === events.length - 1
                    ? 'bg-glow w-6'
                    : 'bg-foreground w-6'
                  : 'bg-foreground/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoricalTimeline;
