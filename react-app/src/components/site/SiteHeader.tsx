import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type SiteHeaderProps = {
  page: 'home' | 'project' | 'legal';
};

const SiteHeader = ({ page }: SiteHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = page === 'home';
  const hash = isHome ? location.hash : '#projects';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navClass = ['header', scrolled ? 'scrolled' : ''].filter(Boolean).join(' ');

  const navLinks = [
    { label: 'Home', href: isHome ? '#home' : '/', active: isHome && (hash === '' || hash === '#home') },
    { label: 'About', href: isHome ? '#about' : '/#about', active: isHome && hash === '#about' },
    { label: 'Projects', href: isHome ? '#projects' : '/#projects', active: page === 'project' || (isHome && hash === '#projects') },
    { label: 'Team', href: isHome ? '#team' : '/#team', active: isHome && hash === '#team' },
    { label: 'Contact', href: isHome ? '#contact' : '/#contact', active: isHome && hash === '#contact' },
  ];

  return (
    <header className={navClass}>
      <div className="container">
        <a href="/" className="logo">
          <img src="/assets/img/site-logo.png" alt="AIRMEIZ" className="site-logo" />
        </a>

        <nav>
          <ul className={`nav-menu${menuOpen ? ' active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={`nav-link${link.active ? ' active' : ''}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`mobile-menu-toggle${menuOpen ? ' active' : ''}`}
          aria-label="Toggle navigation menu"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default SiteHeader;
