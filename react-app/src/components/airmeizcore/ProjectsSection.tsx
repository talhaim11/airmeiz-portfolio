import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import alphaflowLogo from '@/assets/airmeizcore/alphaflow-logo.png';
import pulsegateLogo from '@/assets/airmeizcore/pulsegate-logo.png';
import swappexLogo from '@/assets/airmeizcore/swappex-logo.png';
import erevshabbatLogo from '@/assets/airmeizcore/erevshabbat-logo.png';

const novapayLogo = '/assets/img/logos/novapay-logo.png';

const projects = [
  {
    name: 'ALPHAFLOW',
    logo: alphaflowLogo,
    href: '/projects/alphaflow',
    description:
      'A comprehensive athlete monitoring system engineered for injury prevention and performance optimization. Real-time biomechanical analysis meets predictive intelligence.',
  },
  {
    name: 'PULSEGATE',
    logo: pulsegateLogo,
    href: '/projects/pulsegate',
    description:
      'An intelligent system for class and activity registration. Streamlined scheduling, automated management, and seamless user experiences for educational and fitness environments.',
  },
  {
    name: 'SWAPPEX',
    logo: swappexLogo,
    href: '/projects/swappex',
    description:
      'A multi-sided platform connecting customers, stores, and logistics networks for buying, selling, renting, and transferring goods - built for modern commerce at scale.',
  },
  {
    name: 'EREVSHABBAT',
    logo: erevshabbatLogo,
    href: '/projects/erevshabbat',
    description:
      'A research initiative dedicated to the early detection of oral cancer. Combining clinical insight with technological innovation to save lives through earlier intervention.',
  },
  {
    name: 'Novapay',
    logo: novapayLogo,
    href: '/projects/novapay',
    description:
      'Focused on smarter credit visibility, payment management, and financial control through a more intelligent digital infrastructure.',
  },
];

const ProjectCard = ({ project, index }: { project: (typeof projects)[number]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => navigate(project.href)}
      className="group relative w-full text-left bg-gradient-card rounded-xl border border-border p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_hsl(185_90%_50%/0.08)] hover:-translate-y-1"
    >
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:glow-primary">
          <img src={project.logo} alt={project.name} className="w-8 h-8 object-contain" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        </div>
      </div>
    </motion.button>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-heading tracking-[0.3em] uppercase text-primary mb-4 block">Portfolio</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">What we&apos;re building</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Five ventures spanning healthcare, commerce, fitness, and finance - each driven by deep research and
            real-world impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
