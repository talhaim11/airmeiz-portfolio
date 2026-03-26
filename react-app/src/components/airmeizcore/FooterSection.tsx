import airmeizLogo from '@/assets/airmeizcore/airmeiz-logo.png';

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={airmeizLogo} alt="AIRMEIZ" className="h-8 w-auto" />
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
