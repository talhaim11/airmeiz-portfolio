import ScrollReveal from "./ScrollReveal";
import SectionWrapper from "./SectionWrapper";
import { Package, HandHeart, DollarSign, Unplug } from "lucide-react";

const problems = [
  { icon: Package, title: "No easy way to move large items", desc: "Moving furniture or bulky goods is a logistical nightmare." },
  { icon: HandHeart, title: "No organized borrow / giveaway market", desc: "Israel lacks a unified platform for sharing, lending, or giving away items." },
  { icon: DollarSign, title: "Delivery costs are unpredictable", desc: "Pricing varies wildly with no transparency or standardization." },
  { icon: Unplug, title: "Logistics disconnected from marketplace", desc: "Buying is one step. Delivery is another headache entirely." },
];

const ProblemSection = () => (
  <SectionWrapper id="problem">
    <ScrollReveal>
      <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">The Problem</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-16 max-w-3xl">
        Why moving items is <span className="gradient-text">still broken</span>
      </h2>
    </ScrollReveal>

    <div className="grid md:grid-cols-2 gap-6">
      {problems.map((p, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="group relative rounded-xl bg-card border border-border p-8 hover:border-primary/30 transition-all duration-500 hover:bg-surface-hover">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <p.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </SectionWrapper>
);

export default ProblemSection;
