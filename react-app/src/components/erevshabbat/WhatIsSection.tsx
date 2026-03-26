import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import whatIsBg from '../../assets/erevshabbat/what-is-bg.png';

const fullTitle = 'WHAT IS EREVSHABAT?';
const fullSubtitle =
  'EREVSHABAT is an AI Model that identifies suspicious Lesions through simple photos of the oral cavity.';

const WhatIsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });
  const [titleChars, setTitleChars] = useState(0);
  const [subtitleChars, setSubtitleChars] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let titleCount = 0;
    const titleInterval = setInterval(() => {
      titleCount += 1;
      setTitleChars(titleCount);

      if (titleCount >= fullTitle.length) {
        clearInterval(titleInterval);

        let subtitleCount = 0;
        const subtitleInterval = setInterval(() => {
          subtitleCount += 1;
          setSubtitleChars(subtitleCount);

          if (subtitleCount >= fullSubtitle.length) {
            clearInterval(subtitleInterval);
          }
        }, 40);
      }
    }, 100);

    return () => clearInterval(titleInterval);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32"
    >
      <div className="absolute inset-0 z-0">
        <img src={whatIsBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          {fullTitle.slice(0, titleChars)}
          {isInView && titleChars < fullTitle.length && (
            <span className="ml-1 inline-block h-[1em] w-[3px] animate-pulse align-middle bg-white" />
          )}
        </h2>

        {titleChars >= fullTitle.length && (
          <p className="mt-8 text-lg leading-relaxed text-white/90 md:text-xl">
            {fullSubtitle.slice(0, subtitleChars)}
            {subtitleChars < fullSubtitle.length && (
              <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse align-middle bg-white" />
            )}
          </p>
        )}
      </div>
    </section>
  );
};

export default WhatIsSection;
