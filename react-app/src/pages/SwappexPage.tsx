import HeroSection from '@/components/swappex/HeroSection';
import ProblemScene from '@/components/swappex/ProblemScene';
import MapScene from '@/components/swappex/MapScene';
import RolesScene from '@/components/swappex/RolesScene';
import TransformScene from '@/components/swappex/TransformScene';
import DriverScene from '@/components/swappex/DriverScene';
import CtaSection from '@/components/swappex/CtaSection';

const SwappexPage = () => (
  <main className="swappex-page snap-container bg-background">
    <HeroSection />
    <ProblemScene />
    <MapScene />
    <RolesScene />
    <TransformScene />
    <DriverScene />
    <CtaSection />
  </main>
);

export default SwappexPage;
