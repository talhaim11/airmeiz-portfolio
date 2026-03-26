import ScrollReveal from "./ScrollReveal";
import SectionWrapper from "./SectionWrapper";
import { MapPin, Gauge, Zap } from "lucide-react";

const cards = [
  { icon: Zap, metric: "₪85", label: "Avg. earnings per delivery", sub: "Based on optimized routes" },
  { icon: MapPin, metric: "2.3 km", label: "Average detour", sub: "Jobs along your route" },
  { icon: Gauge, metric: "Low", label: "Effort level", sub: "Elevator access considered" },
];

const DriverSection = () => (
  <SectionWrapper>
    <ScrollReveal>
      <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">For Drivers</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 max-w-3xl">
        Earn while you're <span className="gradient-text">already on the way</span>
      </h2>
      <p className="text-muted-foreground text-lg mb-14 max-w-2xl">
        Location-based job matching means you pick up deliveries without going out of your way.
      </p>
    </ScrollReveal>

    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <ScrollReveal key={i} delay={i * 0.15}>
          <div className="rounded-xl bg-card border border-border p-8 hover:border-primary/30 transition-all duration-500 hover:bg-surface-hover">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
              <card.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="font-display text-3xl font-bold text-primary mb-1">{card.metric}</p>
            <p className="font-display font-semibold mb-1">{card.label}</p>
            <p className="text-sm text-muted-foreground">{card.sub}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </SectionWrapper>
);

export default DriverSection;
