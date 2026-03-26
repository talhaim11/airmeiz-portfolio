import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionWrapper from "./SectionWrapper";
import { MapPin, Truck, Users } from "lucide-react";

const nodes = [
  { x: 20, y: 30, icon: Users, label: "Users", delay: 0 },
  { x: 75, y: 25, icon: MapPin, label: "Items", delay: 0.2 },
  { x: 50, y: 70, icon: Truck, label: "Drivers", delay: 0.4 },
  { x: 30, y: 60, icon: Users, label: "Users", delay: 0.1 },
  { x: 80, y: 65, icon: MapPin, label: "Items", delay: 0.3 },
  { x: 15, y: 75, icon: Truck, label: "Drivers", delay: 0.5 },
];

const connections = [
  { x1: 20, y1: 30, x2: 75, y2: 25 },
  { x1: 75, y1: 25, x2: 50, y2: 70 },
  { x1: 50, y1: 70, x2: 20, y2: 30 },
  { x1: 30, y1: 60, x2: 80, y2: 65 },
  { x1: 15, y1: 75, x2: 50, y2: 70 },
  { x1: 80, y1: 65, x2: 75, y2: 25 },
];

const MapSection = () => (
  <SectionWrapper className="bg-card/50">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">Real-Time Network</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
          Everything is <span className="gradient-text">connected</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Users, items, and drivers form a living network. SWAPPEX matches them instantly based on proximity and availability.
        </p>
        <div className="space-y-4">
          {["Instant matching", "Proximity-based logistics", "Dynamic routing"].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-secondary-foreground font-medium">{item}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="relative aspect-square max-w-lg mx-auto">
          {/* Grid background */}
          <div className="absolute inset-0 rounded-2xl border border-border/50 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }} />
          </div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {connections.map((c, i) => (
              <motion.line
                key={i}
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke="hsl(175, 80%, 50%)"
                strokeWidth="0.3"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.15 }}
              />
            ))}
          </svg>

          {nodes.map((node, i) => (
            <motion.div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + node.delay, type: "spring" }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center node-pulse">
                <node.icon className="w-4 h-4 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </SectionWrapper>
);

export default MapSection;
