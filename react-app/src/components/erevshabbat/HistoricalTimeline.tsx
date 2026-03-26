import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
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

const HistoricalTimeline = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const index = Math.min(Math.floor(value * events.length), events.length - 1);
      setActiveIndex(index);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  const currentEvent = events[activeIndex];
  const currentBg = currentEvent?.backgroundImage;

  return (
    <section ref={containerRef} className="relative" style={{ height: `${events.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
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
