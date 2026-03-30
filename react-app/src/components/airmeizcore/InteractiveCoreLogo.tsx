import { useMemo } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import airmeizLogo from '@/assets/airmeizcore/airmeiz-logo.png';

const springConfig = { stiffness: 120, damping: 18, mass: 0.9 };

type InteractiveCoreLogoProps = {
  logoImageRef?: (el: HTMLImageElement | null) => void;
};

const InteractiveCoreLogo = ({ logoImageRef }: InteractiveCoreLogoProps) => {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const shellRotateX = useSpring(useMotionTemplate`${pointerY}deg`, springConfig);
  const shellRotateY = useSpring(useMotionTemplate`${pointerX}deg`, springConfig);
  const shellShiftX = useSpring(useMotionTemplate`${pointerX}px`, springConfig);
  const shellShiftY = useSpring(useMotionTemplate`${pointerY}px`, springConfig);
  const glowShiftX = useSpring(useMotionTemplate`${pointerX}px`, { stiffness: 80, damping: 20, mass: 1.1 });
  const glowShiftY = useSpring(useMotionTemplate`${pointerY}px`, { stiffness: 80, damping: 20, mass: 1.1 });
  const ringShiftX = useSpring(useMotionTemplate`${pointerX}px`, { stiffness: 90, damping: 18, mass: 1 });
  const ringShiftY = useSpring(useMotionTemplate`${pointerY}px`, { stiffness: 90, damping: 18, mass: 1 });

  const auraStyle = useMemo(
    () => ({
      background:
        'radial-gradient(circle, hsl(185 90% 55% / 0.18) 0%, hsl(185 90% 55% / 0.08) 32%, transparent 72%)',
    }),
    [],
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerX.set(relativeX * 12);
    pointerY.set(relativeY * -10);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div className="relative mx-auto flex h-[340px] w-[340px] items-center justify-center md:h-[540px] md:w-[540px]">
      <motion.div
        style={{ x: glowShiftX, y: glowShiftY }}
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full blur-3xl"
      >
        <div className="h-full w-full rounded-full" style={auraStyle} />
      </motion.div>

      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: shellRotateX,
          rotateY: shellRotateY,
          x: shellShiftX,
          y: shellShiftY,
          transformPerspective: 1400,
          transformOrigin: '50% 50%',
        }}
        animate={{ scale: [1, 1.008, 1] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex h-full w-full items-center justify-center"
      >
        <svg viewBox="0 0 560 560" className="absolute inset-0 h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="airmeiz-core-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="airmeiz-core-shell" x1="280" y1="96" x2="280" y2="464" gradientUnits="userSpaceOnUse">
              <stop stopColor="hsl(187 96% 70%)" />
              <stop offset="0.55" stopColor="hsl(185 94% 62%)" />
              <stop offset="1" stopColor="hsl(193 100% 74%)" />
            </linearGradient>
          </defs>

          <motion.g
            filter="url(#airmeiz-core-soft-glow)"
            stroke="url(#airmeiz-core-shell)"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ x: ringShiftX, y: ringShiftY }}
          >
            <path d="M218 164L246 124H314L342 164V392L314 436H246L218 392V164Z" strokeWidth="3.2" opacity="0.98" />
            <path d="M234 176L254 144H306L326 176V380L306 416H254L234 380V176Z" strokeWidth="2.1" opacity="0.62" />
            <path d="M245 124L280 92L315 124" strokeWidth="1.7" opacity="0.52" />
            <path d="M245 436L280 466L315 436" strokeWidth="1.5" opacity="0.38" />
            <path d="M230 174H330" strokeWidth="1.4" opacity="0.42" />
            <path d="M230 386H330" strokeWidth="1.4" opacity="0.34" />
            <path d="M218 164L184 196V360L218 392" strokeWidth="1.75" opacity="0.38" />
            <path d="M342 164L376 196V360L342 392" strokeWidth="1.75" opacity="0.38" />
            <path d="M184 196H208" strokeWidth="1.4" opacity="0.25" />
            <path d="M352 196H376" strokeWidth="1.4" opacity="0.25" />
            <path d="M184 360H208" strokeWidth="1.4" opacity="0.22" />
            <path d="M352 360H376" strokeWidth="1.4" opacity="0.22" />
            <path d="M234 210C248 192 261 184 280 184C299 184 312 192 326 210" strokeWidth="2.3" opacity="0.82" />
            <path d="M244 222C255 209 266 204 280 204C294 204 305 209 316 222" strokeWidth="1.3" opacity="0.36" />
            <path d="M226 280H334" strokeWidth="1.1" opacity="0.15" />
            <path d="M240 336C252 350 264 356 280 356C296 356 308 350 320 336" strokeWidth="1.8" opacity="0.54" />
            <path d="M248 348C257 357 267 362 280 362C293 362 303 357 312 348" strokeWidth="1.1" opacity="0.28" />
            <path d="M247 244L280 226L313 244" strokeWidth="1.4" opacity="0.22" />
            <path d="M247 316L280 334L313 316" strokeWidth="1.2" opacity="0.18" />
          </motion.g>
        </svg>

        <motion.div
          style={{ x: ringShiftX, y: ringShiftY }}
          animate={{
            boxShadow: [
              '0 0 22px hsl(185 90% 55% / 0.10), inset 0 0 20px hsl(185 90% 55% / 0.05)',
              '0 0 34px hsl(185 90% 55% / 0.16), inset 0 0 26px hsl(185 90% 55% / 0.09)',
              '0 0 22px hsl(185 90% 55% / 0.10), inset 0 0 20px hsl(185 90% 55% / 0.05)',
            ],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 flex h-[126px] w-[126px] items-center justify-center rounded-[38px] border border-primary/30 bg-[linear-gradient(180deg,hsl(220_20%_10%_/0.24),hsl(220_18%_7%_/0.12))] backdrop-blur-md md:h-[166px] md:w-[166px] md:rounded-[46px]"
        >
          <div className="absolute inset-[10px] rounded-[30px] border border-primary/14 md:rounded-[38px]" />
          <div className="absolute inset-[20px] rounded-[24px] border border-primary/10 md:rounded-[30px]" />
          <div className="absolute h-[72%] w-[72%] rounded-[28px] bg-[radial-gradient(circle_at_50%_45%,hsl(185_90%_55%_/0.12),transparent_68%)] blur-2xl" />
          <img
            ref={logoImageRef}
            src={airmeizLogo}
            alt="AIRMEIZ"
            className="relative z-10 h-[42%] w-[42%] object-contain"
            style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 10px hsl(185 90% 55% / 0.28))' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InteractiveCoreLogo;
