import airmeizLogo128 from '@/assets/airmeizcore/airmeiz-logo-128.webp';
import airmeizLogo256 from '@/assets/airmeizcore/airmeiz-logo-256.webp';

const FooterSection = () => {
  return (
    <footer className="snap-section border-t border-border py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src={airmeizLogo128}
            srcSet={`${airmeizLogo128} 1x, ${airmeizLogo256} 2x`}
            alt="AIRMEIZ"
            className="h-8 w-auto"
            width={48}
            height={32}
            loading="lazy"
            decoding="async"
          />
          <span className="font-heading text-sm font-semibold text-foreground tracking-wider">AIRMEIZ</span>
        </div>

        <nav className="flex items-center gap-6">
          {['About', 'Projects', 'Team', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </nav>

        <p className="text-xs text-muted-foreground">{`© ${new Date().getFullYear()} AIRMEIZ. All rights reserved.`}</p>
      </div>
    </footer>
  );
};

export default FooterSection;
