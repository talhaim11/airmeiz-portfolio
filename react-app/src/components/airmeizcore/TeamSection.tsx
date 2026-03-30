import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import yoavImg from '@/assets/airmeizcore/yoav-shriker.jpg';
import talImg from '@/assets/airmeizcore/tal-haim.jpg';
import sagiImg from '@/assets/airmeizcore/sagi-mutas.jpg';

const team = [
  {
    name: 'Yoav Shriker',
    role: 'CEO + COO',
    image: yoavImg,
    bio: 'Visionary leader driving company operations and strategic growth.',
  },
  {
    name: 'Tal Haim',
    role: 'CTO + CMO',
    image: talImg,
    bio: 'Expert in technology architecture and marketing strategy.',
  },
  {
    name: 'Sagi Mutas',
    role: 'CFO + CHRO',
    image: sagiImg,
    bio: 'Financial strategist and human resources expert driving team excellence.',
  },
];

const TeamCard = ({ member, index }: { member: (typeof team)[number]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group bg-gradient-card rounded-xl border border-border p-8 text-center transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_hsl(185_90%_50%/0.08)]"
    >
      <div className="relative w-28 h-28 mx-auto mb-6">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
            hovered ? 'border-primary glow-primary' : 'border-border'
          }`}
        />
      </div>

      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{member.name}</h3>
      <p className="text-sm text-primary font-medium mb-3">{member.role}</p>

      <motion.p
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm text-muted-foreground overflow-hidden"
      >
        {member.bio}
      </motion.p>
    </motion.div>
  );
};

const TeamSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="snap-section py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-heading tracking-[0.3em] uppercase text-primary mb-4 block">Leadership</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Our Team</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Meet the people behind AIRMEIZ</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
