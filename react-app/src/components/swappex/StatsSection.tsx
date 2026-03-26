import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: 40, suffix: "%", label: "Cheaper delivery" },
  { value: 3, suffix: "x", label: "Faster coordination" },
  { value: 60, suffix: "%", label: "Fewer wasted trips" },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-7xl font-bold text-primary counter-glow">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => (
  <SectionWrapper>
    <ScrollReveal>
      <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">Efficiency</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
        Pay less. <span className="gradient-text">Get more.</span>
      </h2>
      <p className="text-muted-foreground text-lg mb-16 max-w-2xl">
        Optimized logistics means real savings for everyone.
      </p>
    </ScrollReveal>

    <div className="grid md:grid-cols-3 gap-10">
      {stats.map((s, i) => (
        <ScrollReveal key={i} delay={i * 0.15}>
          <div className="text-center">
            <AnimatedCounter target={s.value} suffix={s.suffix} />
            <p className="text-muted-foreground mt-3 font-medium">{s.label}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </SectionWrapper>
);

export default StatsSection;
