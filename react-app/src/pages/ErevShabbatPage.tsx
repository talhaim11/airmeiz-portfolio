import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [timelineOwnsScroll, setTimelineOwnsScroll] = useState(false);
  const snapContainerRef = useRef<HTMLElement | null>(null);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded) return;
    const snapContainer = snapContainerRef.current;
    if (!snapContainer) return;
    console.log('[TIMELINE_DEBUG] EREV snap container:', snapContainer);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    console.log('[TIMELINE_DEBUG] timeline owns scroll:', timelineOwnsScroll);
  }, [timelineOwnsScroll, loaded]);

  return (
    <div id="erev-page-root" className="min-h-screen bg-background">
      <LoadingScreen onComplete={handleLoadComplete} />
      <SiteHeader page="project" />

      {loaded && (
        <main
          id="erev-snap-container"
          ref={snapContainerRef}
          className="snap-container pt-20"
        >
          <HeroSection />
          <WhatIsSection />
          <HistoricalTimeline onTimelineOwnershipChange={setTimelineOwnsScroll} />
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
