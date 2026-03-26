import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative h-40 w-40 md:h-56 md:w-56">
            <div className="absolute inset-0 animate-ring-spin">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="5"
                  strokeDasharray="140 30 80 30"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="absolute inset-6 animate-ring-spin-reverse md:inset-8">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="4"
                  strokeDasharray="100 50 60 50"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display text-5xl font-bold tracking-tighter text-foreground md:text-7xl">
                E
              </span>
            </motion.div>
          </div>

          <motion.div className="absolute bottom-16 left-1/2 h-[2px] w-48 -translate-x-1/2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-foreground"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.6, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
