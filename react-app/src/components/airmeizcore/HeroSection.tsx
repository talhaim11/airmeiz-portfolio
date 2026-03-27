import { motion } from 'framer-motion';
import RobotScene from './RobotScene';

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, hsl(185 90% 50% / 0.12) 0%, transparent 24%), radial-gradient(circle at 20% 70%, hsl(185 90% 50% / 0.06) 0%, transparent 24%), radial-gradient(circle at 80% 68%, hsl(185 90% 50% / 0.05) 0%, transparent 22%)',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-6 pt-28 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl font-semibold tracking-[-0.02em] text-foreground md:text-7xl"
        >
          your vision,
          <br />
          <span className="text-primary text-glow">our mission</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-5 text-sm uppercase tracking-[0.42em] text-muted-foreground md:text-[13px]"
        >
          precision engineered for tomorrow
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-10 w-full"
        >
          <RobotScene />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
