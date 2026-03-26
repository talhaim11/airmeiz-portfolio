import ScrollReveal from "./ScrollReveal";
import SectionWrapper from "./SectionWrapper";
import { Bike, Car, Truck, Route, Building, ArrowUpDown } from "lucide-react";

const vehicles = [
  { icon: Bike, label: "Scooter", size: "Small items" },
  { icon: Car, label: "Car", size: "Medium items" },
  { icon: Truck, label: "Van / Truck", size: "Large items" },
];

const features = [
  { icon: Route, title: "Optimized routes", desc: "Shared logistics & reduced empty trips" },
  { icon: Building, title: "Physical effort aware", desc: "Floors, elevators, item size considered" },
  { icon: ArrowUpDown, title: "Cost efficiency", desc: "Right vehicle for every delivery" },
];

const LogisticsEngine = () => (
  <SectionWrapper className="bg-card/50">
    <ScrollReveal>
      <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">Smart Delivery</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-16 max-w-3xl">
        The logistics <span className="gradient-text">engine</span>
      </h2>
    </ScrollReveal>

    <div className="grid lg:grid-cols-2 gap-16">
      <ScrollReveal>
        <h3 className="font-display text-xl font-semibold mb-8">Vehicle matching</h3>
        <div className="space-y-4">
          {vehicles.map((v, i) => (
            <div key={i} className="flex items-center gap-5 rounded-xl bg-background border border-border p-5 hover:border-primary/20 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold">{v.label}</p>
                <p className="text-sm text-muted-foreground">{v.size}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <h3 className="font-display text-xl font-semibold mb-8">Smart optimization</h3>
        <div className="space-y-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold mb-1">{f.title}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </SectionWrapper>
);

export default LogisticsEngine;
