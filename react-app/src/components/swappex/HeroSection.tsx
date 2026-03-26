import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import FullScene from "./FullScene";
import heroBg from "@/assets/swappex/hero-bg.jpg";

const HeroSection = () => (
  <FullScene>
    {/* Background */}
    <div className="absolute inset-0">
      <motion.img
        src={heroBg}
        alt=""
        className="w-full h-full object-cover"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.35 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
    </div>

    {/* Grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />

    <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
      <motion.p
        className="text-primary font-display text-sm md:text-base tracking-[0.3em] uppercase mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        SWAPPEX
      </motion.p>

      <motion.h1
        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        Moving Things Should{" "}
        <span className="gradient-text">Be Simple</span>
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        But today, it's expensive, slow, and unorganized.
      </motion.p>

      <motion.p
        className="text-primary font-display text-lg md:text-xl font-medium mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        SWAPPEX changes that.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <Button
          variant="hero"
          size="lg"
          onClick={() =>
            document
              .getElementById("problem")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore the Solution
        </Button>
      </motion.div>
    </div>

    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      <ChevronDown className="w-6 h-6 text-muted-foreground" />
    </motion.div>
  </FullScene>
);

export default HeroSection;
