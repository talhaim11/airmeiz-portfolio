import ScrollReveal from "./ScrollReveal";
import SectionWrapper from "./SectionWrapper";
import { Recycle, Gift, HandHeart } from "lucide-react";

const points = [
  { icon: Recycle, text: "Reuse items instead of buying new" },
  { icon: Gift, text: "Give away instead of throwing away" },
  { icon: HandHeart, text: "Borrow instead of over-consuming" },
];

const GreenSection = () => (
  <SectionWrapper className="bg-card/50">
    <div className="max-w-3xl mx-auto text-center">
      <ScrollReveal>
        <p className="text-green font-display text-sm tracking-[0.2em] uppercase mb-4">Sustainability</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
          A smarter, greener way to use{" "}
          <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(135deg, hsl(150, 60%, 45%), hsl(175, 80%, 50%))'}}>
            what already exists
          </span>
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8 mt-14">
        {points.map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green/10 border border-green/20 flex items-center justify-center">
                <p.icon className="w-7 h-7 text-green" />
              </div>
              <p className="text-secondary-foreground font-medium">{p.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default GreenSection;
