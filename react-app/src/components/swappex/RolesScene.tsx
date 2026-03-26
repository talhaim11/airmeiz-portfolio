import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShoppingCart, Store, Truck, Package, MapPin, Search, Eye, DollarSign, ArrowRight } from "lucide-react";
import FullScene from "./FullScene";
import SectionHeader from "./SectionHeader";

const roles = [
  {
    id: "seller",
    title: "Seller",
    subtitle: "List · Publish · Earn",
    icon: Store,
    color: "hsl(270, 70%, 72%)",
    colorVar: "#a78bfa",
    steps: [
      { icon: Package, label: "List in 60 seconds", detail: "Photo → Category → Size → Done" },
      { icon: Eye, label: "Visible instantly", detail: "Nearby buyers see your item on the map" },
      { icon: DollarSign, label: "Flexible pricing", detail: "Sell, give away, or rent — your choice" },
    ],
  },
  {
    id: "customer",
    title: "Customer",
    subtitle: "Browse · Order · Track",
    icon: ShoppingCart,
    color: "hsl(var(--primary))",
    colorVar: "#2dd4bf",
    steps: [
      { icon: Search, label: "Search nearby", detail: "Find sofas, desks, fridges within 5 km" },
      { icon: DollarSign, label: "Instant pricing", detail: "Item ₪120 + Delivery ₪45 = ₪165 total" },
      { icon: MapPin, label: "Live tracking", detail: "Real-time driver location and ETA" },
    ],
  },
  {
    id: "driver",
    title: "Driver",
    subtitle: "Pickup · Deliver · Earn",
    icon: Truck,
    color: "hsl(38, 92%, 50%)",
    colorVar: "#f59e0b",
    steps: [
      { icon: ArrowRight, label: "Jobs on your route", detail: "Smart detours — 0.3 to 1.2 km extra" },
      { icon: DollarSign, label: "Earn per delivery", detail: "₪45–120 per item, effort-rated" },
      { icon: Truck, label: "Vehicle matched", detail: "Scooter → Car → Van based on size" },
    ],
  },
];

const RolesScene = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <FullScene>
      <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-start bg-background">
        {/* Subtle background texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.03) 0%, transparent 50%)`,
        }} />

        {/* Header */}
        <div className="w-full pt-10 md:pt-16 z-10">
          <SectionHeader
            eyebrow="How It Works"
            headline={<>Three sides,{" "}<span className="gradient-text">one platform</span></>}
            description="A three-sided marketplace connecting customers, sellers, and drivers in one seamless logistics flow."
            inView={inView}
          />
        </div>

        {/* Role selector */}
        <motion.div
          className="flex items-center gap-2 md:gap-3 mt-8 md:mt-10 z-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.3 }}
        >
          {roles.map((role, i) => {
            const isActive = activeRole === i;
            const Icon = role.icon;
            return (
              <motion.button
                key={role.id}
                onClick={() => setActiveRole(i)}
                className="flex items-center gap-2.5 px-4 md:px-6 py-3 md:py-3.5 rounded-xl border cursor-pointer transition-all duration-300"
                style={{
                  borderColor: isActive ? `${role.colorVar}50` : 'hsl(var(--border) / 0.2)',
                  backgroundColor: isActive ? `${role.colorVar}0c` : 'hsl(var(--card) / 0.5)',
                  boxShadow: isActive ? `0 4px 30px ${role.colorVar}15` : 'none',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${role.colorVar}15` }}>
                  <Icon size={18} style={{ color: role.colorVar }} />
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-sm md:text-base text-foreground">{role.title}</p>
                  <p className="text-xs md:text-sm text-muted-foreground font-display">{role.subtitle}</p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active role content */}
        <div className="flex-1 w-full max-w-5xl mx-auto px-6 mt-8 md:mt-12 z-10">
          <AnimatePresence mode="wait">
            {roles.map((role, ri) => {
              if (ri !== activeRole) return null;
              return (
                <motion.div
                  key={role.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  {role.steps.map((step, si) => {
                    const StepIcon = step.icon;
                    return (
                      <motion.div
                        key={si}
                        className="rounded-2xl border bg-card/70 backdrop-blur-sm p-5 md:p-7"
                        style={{ borderColor: `${role.colorVar}18` }}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + si * 0.12 }}
                      >
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: `${role.colorVar}12` }}>
                          <StepIcon size={20} style={{ color: role.colorVar }} />
                        </div>
                        <p className="text-base md:text-lg font-display font-bold text-foreground mb-2">
                          {step.label}
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground font-display leading-relaxed">
                          {step.detail}
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Flow indicator at bottom */}
        <motion.div
          className="w-full max-w-3xl mx-auto px-6 pb-8 md:pb-12 z-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 md:gap-4 px-6 py-4 rounded-xl border border-border/15 bg-card/40 backdrop-blur-sm">
            {roles.map((role, i) => {
              const Icon = role.icon;
              const isActive = activeRole === i;
              return (
                <div key={role.id} className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? `${role.colorVar}18` : `${role.colorVar}08`,
                      }}>
                      <Icon size={14} style={{ color: isActive ? role.colorVar : `${role.colorVar}60` }} />
                    </div>
                    <span className="text-sm font-display font-semibold transition-colors duration-300"
                      style={{ color: isActive ? role.colorVar : 'hsl(var(--muted-foreground))' }}>
                      {role.title}
                    </span>
                  </div>
                  {i < roles.length - 1 && (
                    <ArrowRight size={14} className="text-muted-foreground/30" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </FullScene>
  );
};

export default RolesScene;
