import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/airmeizcore/Header';
import HeroSection from '../components/airmeizcore/HeroSection';
import AboutSection from '../components/airmeizcore/AboutSection';
import TeamSection from '../components/airmeizcore/TeamSection';
import ContactSection from '../components/airmeizcore/ContactSection';
import FooterSection from '../components/airmeizcore/FooterSection';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const id = location.hash.slice(1);
    const element = document.getElementById(id);
    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location.hash]);

  return (
    <div className="airmeiz-core-page min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default HomePage;
