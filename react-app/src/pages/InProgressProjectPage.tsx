import SiteFooter from '../components/site/SiteFooter';
import SiteHeader from '../components/site/SiteHeader';

type InProgressProjectPageProps = {
  project: 'pulsegate' | 'novapay';
};

const pageContent = {
  pulsegate: {
    title: 'PULSEGATE',
    subtitle: 'Class & Activity Registration Platform',
    logoSrc: '/assets/img/logos/pulsegate-logo.png',
  },
  novapay: {
    title: 'Novapay',
    subtitle: 'Smart Credit & Payment Management',
    logoSrc: '/assets/img/logos/novapay-logo.png',
  },
} as const;

const InProgressProjectPage = ({ project }: InProgressProjectPageProps) => {
  const data = pageContent[project];

  return (
    <div className="min-h-screen bg-[hsl(220_20%_4%)] text-[hsl(210_20%_95%)]">
      <SiteHeader page="project" />

      <main className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_20%_6%)] via-[hsl(220_18%_5%)] to-[hsl(220_20%_4%)]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(circle at 50% 20%, hsl(185 90% 55% / 0.14) 0%, transparent 30%), radial-gradient(circle at 15% 70%, hsl(185 90% 55% / 0.06) 0%, transparent 24%), radial-gradient(circle at 85% 68%, hsl(185 90% 55% / 0.05) 0%, transparent 22%)',
          }}
        />

        <section className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-5xl items-center px-6 py-16">
          <div className="w-full rounded-[2rem] border border-white/8 bg-white/[0.02] p-8 shadow-[0_0_80px_rgba(0,255,255,0.04)] backdrop-blur-xl md:p-14">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-300">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
                In Progress
              </div>

              <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/30 bg-[rgba(10,18,28,0.55)] shadow-[0_0_38px_rgba(34,211,238,0.12)]">
                <img src={data.logoSrc} alt={data.title} className="h-16 w-16 object-contain" />
              </div>

              <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">{data.title}</h1>
              <p className="mt-4 text-lg text-slate-300 md:text-xl">{data.subtitle}</p>
              <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                This platform is currently under development. AIRMEIZ is shaping the product experience, structure,
                and system direction before the full public reveal.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-400/5 px-6 py-3 text-sm font-medium text-cyan-200 transition-all duration-300 hover:border-cyan-300/45 hover:bg-cyan-400/10"
                >
                  Back to AIRMEIZ
                </a>
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-cyan-300 px-6 py-3 text-sm font-medium text-slate-950 transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                >
                  Contact AIRMEIZ
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default InProgressProjectPage;
