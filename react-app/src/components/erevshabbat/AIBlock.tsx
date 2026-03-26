import { forwardRef, useImperativeHandle, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '',
    title: 'Routine Visit Ends',
    description:
      'Patient completes their regular dental check-up or treatment. Nothing changes in the existing workflow.',
  },
  {
    number: '',
    title: '60-Second Capture',
    description:
      'The dentist photographs all accessible oral areas using a phone. Seven specific angles, sixty seconds.',
  },
  {
    number: '',
    title: 'AI Analysis',
    description:
      "Images are processed in real-time by EREVSHABAT's AI engine, which scans for malignant and precancerous lesions with expert-level accuracy.",
  },
  {
    number: '',
    title: 'Risk Stratification',
    description:
      'Every detected anomaly receives a granular risk-level ranking. High-risk findings trigger immediate referral pathways.',
  },
  {
    number: '',
    title: 'Clinical Action',
    description:
      'Results are delivered to the expert instantly. Early-stage findings are monitored; suspicious lesions are escalated to specialists.',
  },
];

const AIBlock = forwardRef<HTMLElement, Record<string, never>>((_, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useImperativeHandle(ref, () => sectionRef.current as HTMLElement);

  return (
    <section ref={sectionRef} className="relative px-6 py-32 md:px-16 md:py-48">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-text-dim">Human in the Loop</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            AI at the Chair-Side
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
            EREVSHABAT integrates seamlessly into the existing dental workflow. No extra appointments. No
            specialized equipment. Just 60 seconds that could save a life.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-[1px] bg-border md:left-8" />

          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="group relative py-8 pl-16 md:pl-20"
                initial={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0)' } : {}}
                transition={{
                  delay: 0.2 + index * 0.15,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="absolute left-[18px] top-10 h-3 w-3 rounded-full border-2 border-foreground bg-background transition-colors duration-300 group-hover:bg-foreground md:left-[26px]" />

                <div className="mb-2 flex items-baseline gap-4">
                  <span className="font-mono text-xs text-text-dim">{step.number}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">{step.title}</h3>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-text-secondary">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

AIBlock.displayName = 'AIBlock';

export default AIBlock;
