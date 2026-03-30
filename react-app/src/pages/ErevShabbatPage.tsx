import { useCallback, useState } from 'react';
import SiteHeader from '../components/site/SiteHeader';
import SiteFooter from '../components/site/SiteFooter';
import LoadingScreen from '../components/erevshabbat/LoadingScreen';
import HeroSection from '../components/erevshabbat/HeroSection';
import HistoricalTimeline from '../components/erevshabbat/HistoricalTimeline';
import WhatIsSection from '../components/erevshabbat/WhatIsSection';
import ProblemBlock from '../components/erevshabbat/ProblemBlock';
import InteractiveTimeline from '../components/erevshabbat/InteractiveTimeline';
import AIBlock from '../components/erevshabbat/AIBlock';
import FadingFacts from '../components/erevshabbat/FadingFacts';

const ErevShabbatPage = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen onComplete={handleLoadComplete} />
      <SiteHeader page="project" />

      {loaded && (
        <main>
          <HeroSection />
          <WhatIsSection />
          <HistoricalTimeline />
          <ProblemBlock />
          <InteractiveTimeline />
          <AIBlock />
          <FadingFacts />
        </main>
      )}
      {loaded && <SiteFooter />}
    </div>
  );
};

export default ErevShabbatPage;
