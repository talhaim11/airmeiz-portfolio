import SiteHeader from '../components/site/SiteHeader';
import SiteFooter from '../components/site/SiteFooter';
import HeroSection from '@/components/swappex/HeroSection';
import ProblemScene from '@/components/swappex/ProblemScene';
import MapScene from '@/components/swappex/MapScene';
import RolesScene from '@/components/swappex/RolesScene';
import TransformScene from '@/components/swappex/TransformScene';
import DriverScene from '@/components/swappex/DriverScene';
import CtaSection from '@/components/swappex/CtaSection';

const SwappexPage = () => (
  <div className="swappex-page bg-background">
    <SiteHeader page="project" />
    <main className="snap-container pt-16">
      <HeroSection />
      <ProblemScene />
      <MapScene />
      <RolesScene />
      <TransformScene />
      <DriverScene />
      <CtaSection />
    </main>
    <SiteFooter />
  </div>
);

export default SwappexPage;
