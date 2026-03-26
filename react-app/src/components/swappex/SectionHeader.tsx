import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  headline: React.ReactNode;
  description?: string;
  inView: boolean;
  className?: string;
}

/**
 * Reusable centered section header with eyebrow, headline, and optional description.
 * Typography sized for premium readability.
 */
const SectionHeader = ({ eyebrow, headline, description, inView, className = "" }: SectionHeaderProps) => (
  <motion.div
    className={`w-full text-center z-20 px-6 ${className}`}
    initial={{ opacity: 0, y: -20 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
    transition={{ duration: 0.6 }}
  >
    <p className="text-primary font-display text-xs md:text-sm tracking-[0.25em] uppercase mb-3 font-semibold">
      {eyebrow}
    </p>
    <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl mx-auto leading-tight">
      {headline}
    </h2>
    {description && (
      <p className="text-muted-foreground text-base md:text-lg mt-4 max-w-xl mx-auto font-display leading-relaxed">
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeader;
