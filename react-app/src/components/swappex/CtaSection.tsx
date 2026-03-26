import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import FullScene from "./FullScene";

const CtaSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <FullScene>
      <div ref={ref} className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
          }}
        />

        <motion.p
          className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          Ready?
        </motion.p>

        <motion.h2
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          The Future of Moving Items{" "}
          <span className="gradient-text">is Here</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl mb-10 font-display"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          Simple. Connected. Optimized.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
        >
          <Button variant="hero" size="lg">
            Join SWAPPEX
          </Button>
          <Button variant="heroOutline" size="lg">
            Start Exploring
          </Button>
        </motion.div>
      </div>
    </FullScene>
  );
};

export default CtaSection;
