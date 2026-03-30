import { motion } from 'framer-motion';
import { Activity, MessageSquare, TrendingUp, FileHeart, BarChart3, Users, User, Stethoscope } from 'lucide-react';
import heroVisual from '@/assets/airmeizcore/alphaflow-lovable-hero.png';
import SiteHeader from '../components/site/SiteHeader';
import SiteFooter from '../components/site/SiteFooter';

const features = [
  { icon: Activity, title: 'Daily readiness tracking', description: 'Monitor sleep, stress, mood, energy, and soreness each day.' },
  { icon: MessageSquare, title: 'AI-based workout logging', description: 'Log training in natural language and structure it automatically.' },
  { icon: TrendingUp, title: 'Training load monitoring', description: 'Track accumulated load and intensity over time.' },
  { icon: FileHeart, title: 'Injury and pain documentation', description: 'Attach pain notes and track symptom patterns.' },
  { icon: BarChart3, title: 'Longitudinal trend visualization', description: 'See how readiness evolves across days and weeks.' },
  { icon: Users, title: 'Professional monitoring dashboard', description: 'Unified view for coaches and physiotherapists.' },
];

const audienceBlocks = [
  {
    icon: User,
    title: 'For Athletes',
    points: [
      'Understand how your body responds to training',
      'Track readiness over time',
      'Log workouts effortlessly',
      'Identify patterns before overload becomes injury',
    ],
  },
  {
    icon: Stethoscope,
    title: 'For Coaches & Physiotherapists',
    points: [
      'Monitor athlete readiness trends',
      'Track accumulated training load',
      'Identify injury risk signals early',
      'Improve communication and coordination',
    ],
  },
];

const AlphaflowLovablePage = () => {
  return (
    <div className="alphaflow-lovable-page min-h-screen bg-background text-foreground">
      <SiteHeader page="project" />

      <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 blur-3xl bg-primary/10" />
        <div className="section-container relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground mb-8">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Performance & Health Platform
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-display tracking-tight mb-6">
                <span className="gradient-text">Alpha</span><span>Flow</span>
              </h1>
              <p className="text-xl lg:text-2xl text-secondary-foreground font-light leading-relaxed mb-4">
                Context-driven training decisions based on readiness, load, and injury signals.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
                A unified system that helps athletes and professionals understand how the body responds to training over time.
              </p>
              <a href="#solution" className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-medium text-primary-foreground transition-all" style={{ background: 'var(--gradient-accent)' }}>
                Explore the concept
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="glow-border rounded-2xl overflow-hidden bg-card border border-border/50 p-8 flex justify-center">
                <img src={heroVisual} alt="AlphaFlow visual" className="w-full max-w-md rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="problem" className="section-padding">
        <div className="section-container max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">The Problem</p>
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-10">Training decisions often lack context</h2>
          <div className="space-y-5">
            {[
              'Athletes and coaches often rely on fragmented information, intuition, or isolated metrics.',
              'Training load, recovery state, and injury signals are rarely integrated into one clear picture.',
              'This makes it difficult to detect overload patterns early and adjust training appropriately.',
            ].map((text) => (
              <div key={text} className="flex gap-4 items-start">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <p className="text-lg text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="section-padding bg-secondary/30">
        <div className="section-container max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">The Solution</p>
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-8">A single system for readiness, training load, and injury monitoring</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-3">
            AlphaFlow combines daily readiness tracking, AI-assisted workout logging, and injury documentation into one continuous workflow.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The system provides context over days and weeks, helping identify meaningful trends rather than isolated values.
          </p>
        </div>
      </section>

      <section id="features" className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">Features</p>
            <h2 className="text-3xl lg:text-5xl font-display font-bold">Everything in one place</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-8 group hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container grid md:grid-cols-2 gap-8">
          {audienceBlocks.map((a) => (
            <div key={a.title} className="glass-card p-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <a.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-6">{a.title}</h3>
              <ul className="space-y-4">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-3 items-start">
                    <span className="mt-2.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="vision" className="section-padding bg-secondary/30">
        <div className="section-container max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">Vision</p>
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-8">Better context leads to better decisions</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>AlphaFlow does not replace professional judgment. It strengthens it by providing structured insight into readiness, load, and injury patterns.</p>
            <p>The goal is consistent performance and reduced injury risk through improved awareness.</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="glass-card glow-border p-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">A smarter way to understand training</h2>
            <p className="text-xl text-muted-foreground mb-10">Performance improves when context is clear.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-medium text-primary-foreground transition-all" style={{ background: 'var(--gradient-accent)' }}>
              Contact AIRMEIZ
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default AlphaflowLovablePage;
