import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-heading tracking-[0.3em] uppercase text-primary mb-4 block">Our Origin</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-8">
            Born from adversity.
            <br />
            <span className="text-muted-foreground">Built with purpose.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-muted-foreground text-lg leading-relaxed"
        >
          <p>
            AIRMEIZ began at a personal crossroads. When one of our founders was diagnosed with cancer, the
            experience ignited a relentless pursuit - not for comfort, but for understanding. What followed was an
            intensive research journey into disease mechanisms, early detection, and the intersection of technology and
            human biology.
          </p>
          <p>
            That journey shaped everything. AIRMEIZ evolved into an R&amp;D-driven organization focused on building
            systems that matter - technology designed to improve healthcare outcomes, optimize human performance, and
            solve complex operational challenges across industries.
          </p>
          <p className="text-foreground font-medium">
            We don&apos;t build products for the sake of innovation. We build because we&apos;ve seen what happens when the
            right technology arrives too late.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {[
            { stat: '5', label: 'Active Projects' },
            { stat: 'R&D', label: 'First Approach' },
            { stat: 'Always', label: 'Commitment' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-heading text-4xl font-bold text-primary text-glow mb-2">{item.stat}</div>
              <div className="text-sm text-muted-foreground tracking-wider uppercase">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
