import ScrollReveal from "./ScrollReveal";
import SectionWrapper from "./SectionWrapper";
import { ShoppingBag, Store, Car } from "lucide-react";

const flows = [
  {
    icon: ShoppingBag,
    role: "Customers",
    color: "primary",
    items: ["Buy, borrow or receive items easily", "Transparent pricing (item + delivery)", "Real-time tracking"],
  },
  {
    icon: Store,
    role: "Sellers",
    color: "primary",
    items: ["Sell, give away or rent effortlessly", "No logistics headache", "Reach nearby users instantly"],
  },
  {
    icon: Car,
    role: "Drivers",
    color: "primary",
    items: ["Jobs appear \"on the way\"", "Matched by location & vehicle size", "High delivery availability"],
  },
];

const HowItWorksSection = () => (
  <SectionWrapper>
    <ScrollReveal>
      <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">How It Works</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-16 max-w-3xl">
        Three sides, <span className="gradient-text">one platform</span>
      </h2>
    </ScrollReveal>

    <div className="grid md:grid-cols-3 gap-8">
      {flows.map((flow, i) => (
        <ScrollReveal key={i} delay={i * 0.15}>
          <div className="relative rounded-xl bg-card border border-border p-8 h-full hover:border-primary/30 transition-all duration-500">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <flow.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-5">{flow.role}</h3>
            <ul className="space-y-3">
              {flow.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </SectionWrapper>
);

export default HowItWorksSection;
