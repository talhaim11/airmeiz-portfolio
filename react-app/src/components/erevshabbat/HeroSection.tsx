import { motion } from 'framer-motion';
import dentistChair from '../../assets/erevshabbat/dentist-chair.png';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={dentistChair}
          alt="Dental chair illuminated in dramatic lighting"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="font-display text-6xl font-bold leading-[0.9] tracking-[-0.04em] text-foreground md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          EREVSHABAT
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-sm font-normal uppercase tracking-[0.15em] text-foreground opacity-100 md:mt-8 md:text-base lg:text-xl"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          The future is not better treatment. It is earlier interception.
        </motion.p>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
              className="opacity-0"
            >
              <path d="M7 10l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
