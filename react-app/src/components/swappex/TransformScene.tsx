import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import FullScene from "./FullScene";
import SectionHeader from "./SectionHeader";

const beforeMetrics = [
  { label: "Avg delivery cost", value: "₪180", sub: "unpredictable pricing" },
  { label: "Empty truck trips", value: "62%", sub: "wasted capacity" },
  { label: "Items discarded", value: "34%", sub: "could be reused" },
  { label: "Coordination time", value: "3+ hrs", sub: "phone calls & waiting" },
];

const afterMetrics = [
  { label: "Avg delivery cost", value: "₪65", sub: "transparent pricing" },
  { label: "Empty truck trips", value: "12%", sub: "shared logistics" },
  { label: "Items reused", value: "89%", sub: "marketplace circulation" },
  { label: "Coordination time", value: "< 5 min", sub: "automated matching" },
];

const impactStats = [
  { value: "40%", label: "Cost reduction" },
  { value: "5×", label: "Faster matching" },
  { value: "60%", label: "Fewer empty trips" },
];

const TransformScene = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const [isAfter, setIsAfter] = useState(false);

  const metrics = isAfter ? afterMetrics : beforeMetrics;

  return (
    <FullScene>
      <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {/* Header */}
        <div className="absolute top-8 md:top-14 left-0 right-0 z-10">
          <SectionHeader
            eyebrow={isAfter ? "With SWAPPEX" : "Before SWAPPEX"}
            headline={isAfter
              ? <>A smarter,{" "}<span className="gradient-text">greener</span> way</>
              : <>The cost of{" "}<span className="text-destructive">inefficiency</span></>
            }
            inView={inView}
          />
        </div>

        {/* Content */}
        <div className="w-full max-w-3xl mt-10 md:mt-16">
          {/* Before/After toggle */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <button
              onClick={() => setIsAfter(false)}
              className={`px-6 py-3 rounded-lg text-sm font-display font-semibold transition-all duration-300 cursor-pointer ${
                !isAfter
                  ? "bg-destructive/15 text-destructive border border-destructive/30 shadow-[0_0_16px_hsl(0_84%_60%/0.15)]"
                  : "bg-card/30 text-muted-foreground border border-border/20 hover:text-foreground hover:border-border/40"
              }`}
            >
              BEFORE
            </button>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${!isAfter ? "bg-destructive/60" : "bg-border/30"}`} />
              <div className="w-10 h-px bg-border/30" />
              <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isAfter ? "bg-primary/60" : "bg-border/30"}`} />
            </div>
            <button
              onClick={() => setIsAfter(true)}
              className={`px-6 py-3 rounded-lg text-sm font-display font-semibold transition-all duration-300 cursor-pointer ${
                isAfter
                  ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_16px_hsl(175_80%_50%/0.15)]"
                  : "bg-card/30 text-muted-foreground border border-border/20 hover:text-foreground hover:border-border/40"
              }`}
            >
              AFTER
            </button>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {metrics.map((m, i) => (
              <motion.div
                key={`${isAfter}-${i}`}
                className={`rounded-xl border p-6 md:p-7 text-center transition-colors duration-500 ${
                  isAfter
                    ? "border-primary/20 bg-primary/5"
                    : "border-destructive/15 bg-destructive/5"
                }`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              >
                <p className="text-sm md:text-base text-muted-foreground font-display mb-3 tracking-wide uppercase text-center">
                  {m.label}
                </p>
                <p className={`font-display text-3xl md:text-4xl font-bold ${
                  isAfter ? "text-primary" : "text-destructive/80"
                }`}>
                  {m.value}
                </p>
                <p className="text-sm md:text-base text-muted-foreground/75 font-display mt-2 text-center">
                  {m.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact stats at bottom */}
        <motion.div
          className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView && isAfter ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-10 md:gap-16">
            {impactStats.map((s, i) => (
              <motion.div
                key={i}
                className="text-center min-w-28"
                initial={{ opacity: 0, y: 8 }}
                animate={isAfter ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ delay: 0.4 + i * 0.12 }}
              >
                <p className="font-display text-3xl md:text-4xl font-bold text-primary text-glow">{s.value}</p>
                <p className="text-sm md:text-base text-muted-foreground font-display mt-1 text-center">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hint */}
        {!isAfter && inView && (
          <motion.p
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground/50 text-sm font-display z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
            transition={{ delay: 1.5, duration: 2 }}
          >
            Click "AFTER" to see the difference
          </motion.p>
        )}
      </div>
    </FullScene>
  );
};

export default TransformScene;
