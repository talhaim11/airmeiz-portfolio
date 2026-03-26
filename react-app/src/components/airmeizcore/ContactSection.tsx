import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    window.alert('Thank you for your interest! Form submission will be implemented in the next phase.');
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-2xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-heading tracking-[0.3em] uppercase text-primary mb-4 block">Connect</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Let&apos;s build something exceptional</h2>
          <p className="mt-4 text-muted-foreground">A short conversation can redefine your direction.</p>
          <p className="mt-4 text-sm text-primary">info@airmeiz.com</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {[
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-sm text-muted-foreground mb-2 block">{field.label}</label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(185_90%_50%/0.1)] transition-all duration-300"
                required
              />
            </div>
          ))}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Message</label>
            <textarea
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              rows={5}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(185_90%_50%/0.1)] transition-all duration-300 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-heading font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_hsl(185_90%_50%/0.3)] hover:brightness-110"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
