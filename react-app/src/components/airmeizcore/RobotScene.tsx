import { useMemo, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import airmeizLogo from '@/assets/airmeizcore/airmeiz-logo.png';
import alphaflowLogo from '@/assets/airmeizcore/alphaflow-logo.png';
import pulsegateLogo from '@/assets/airmeizcore/pulsegate-logo.png';
import swappexLogo from '@/assets/airmeizcore/swappex-logo.png';
import erevshabbatLogo from '@/assets/airmeizcore/erevshabbat-logo.png';

const novapayLogo = '/assets/img/logos/novapay-logo.png';

const projects = [
  {
    name: 'EREVSHABBAT',
    description: 'Oral cancer early detection',
    logo: erevshabbatLogo,
    href: '/projects/erevshabbat',
    accent: 'hsl(170 85% 68%)',
    desktopPosition: 'left-[2.5%] top-[3%]',
  },
  {
    name: 'SWAPPEX',
    description: 'Commerce and logistics platform',
    logo: swappexLogo,
    href: '/projects/swappex',
    accent: 'hsl(188 95% 60%)',
    desktopPosition: 'right-[2.5%] top-[3%]',
  },
  {
    name: 'Novapay',
    description: 'Credit and payment management',
    logo: novapayLogo,
    href: '/projects/novapay',
    accent: 'hsl(205 95% 72%)',
    desktopPosition: 'left-[-3%] top-[44%]',
  },
  {
    name: 'PULSEGATE',
    description: 'Smart class and activity registration',
    logo: pulsegateLogo,
    href: '/projects/pulsegate',
    accent: 'hsl(180 90% 65%)',
    desktopPosition: 'right-[-3%] top-[44%]',
  },
  {
    name: 'ALPHAFLOW',
    description: 'Athlete monitoring and injury prevention',
    logo: alphaflowLogo,
    href: '/projects/alphaflow',
    accent: 'hsl(195 100% 70%)',
    desktopPosition: 'left-1/2 top-[84%] -translate-x-1/2',
  },
];

const NodeButton = ({
  name,
  description,
  logo,
  href,
  accent,
  className = '',
}: {
  name: string;
  description: string;
  logo: string;
  href: string;
  accent: string;
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => navigate(href)}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`group flex flex-col items-center text-center ${className}`}
    >
      <div
        className="relative flex h-[138px] w-[138px] items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 md:h-[150px] md:w-[150px]"
        style={{
          borderColor: `${accent}`,
          background: 'linear-gradient(180deg, hsl(220 18% 10% / 0.96), hsl(220 20% 6% / 0.92))',
          boxShadow: `0 0 0 1px hsl(220 18% 22% / 0.72), 0 0 30px ${accent}22`,
        }}
      >
        <div
          className="absolute inset-[8px] rounded-full"
          style={{
            border: `1px solid ${accent}55`,
            boxShadow: `inset 0 0 26px ${accent}16`,
          }}
        />
        <img src={logo} alt={name} className="relative z-10 h-[82%] w-[82%] object-contain" />
      </div>

      <p className="mt-4 font-heading text-sm uppercase tracking-[0.18em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-[15px]">
        {name}
      </p>
      <p className="mt-1 max-w-[13rem] text-xs leading-relaxed text-muted-foreground md:text-[13px]">{description}</p>
    </motion.button>
  );
};

const RobotFigure = () => {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useMotionTemplate`${pointerY}deg`, { stiffness: 110, damping: 20, mass: 0.9 });
  const rotateY = useSpring(useMotionTemplate`${pointerX}deg`, { stiffness: 110, damping: 20, mass: 0.9 });
  const [isActive, setIsActive] = useState(false);

  const auraStyle = useMemo(
    () => ({
      background:
        'radial-gradient(circle, hsl(185 90% 55% / 0.16) 0%, hsl(185 90% 55% / 0.08) 28%, transparent 70%)',
    }),
    [],
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;

    // Keep robot anchored and only tilt/rotate toward cursor.
    // Rotate toward cursor (no translation/drift): right cursor => right look.
    pointerX.set(relativeX * -12);
    pointerY.set(relativeY * 10);
    setIsActive(true);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    setIsActive(false);
  };

  return (
    <div className="relative mx-auto flex h-[340px] w-[340px] items-center justify-center md:h-[540px] md:w-[540px]">
      <div className="absolute inset-0 rounded-full blur-3xl" style={auraStyle} />

      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        animate={{ scale: isActive ? 1.015 : 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
          transformOrigin: '50% 50%',
        }}
        className="relative flex h-full w-full items-center justify-center"
      >
        <svg
          viewBox="0 0 560 560"
          className="absolute inset-0 h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="airmeiz-robot-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#airmeiz-robot-soft-glow)" stroke="hsl(185 90% 64%)" strokeLinecap="round" strokeLinejoin="round">
            <path d="M196 184C196 122 234 88 280 88C326 88 364 122 364 184V306C364 380 324 436 280 436C236 436 196 380 196 306V184Z" strokeWidth="3.2" opacity="0.96" />
            <path d="M212 194C212 146 242 118 280 118C318 118 348 146 348 194V300C348 350 318 384 280 384C242 384 212 350 212 300V194Z" strokeWidth="2" opacity="0.5" />
            <path d="M226 206C226 188 244 174 280 174C316 174 334 188 334 206V252C334 280 316 300 280 300C244 300 226 280 226 252V206Z" strokeWidth="2.7" opacity="0.9" />
            <path d="M238 205C249 193 262 188 280 188C298 188 311 193 322 205" strokeWidth="1.7" opacity="0.58" />
            <path d="M238 264C250 274 263 279 280 279C297 279 310 274 322 264" strokeWidth="1.7" opacity="0.56" />
            <path d="M232 326C246 339 261 346 280 346C299 346 314 339 328 326" strokeWidth="2.2" opacity="0.64" />
            <path d="M244 357C255 365 266 369 280 369C294 369 305 365 316 357" strokeWidth="1.4" opacity="0.42" />
            <path d="M242 102L280 68L318 102" strokeWidth="2" opacity="0.48" />
            <path d="M208 250C198 242 194 228 194 212C194 178 212 150 244 136" strokeWidth="1.5" opacity="0.35" />
            <path d="M352 250C362 242 366 228 366 212C366 178 348 150 316 136" strokeWidth="1.5" opacity="0.35" />
          </g>
        </svg>

        <div className="relative z-10 flex h-[118px] w-[118px] items-center justify-center rounded-full border border-primary/35 bg-[hsl(220_22%_6%_/0.25)] shadow-[0_0_38px_hsl(185_90%_55%/0.12)] backdrop-blur-md md:h-[160px] md:w-[160px]">
          <div className="absolute inset-[10px] rounded-full border border-primary/16" />
          <img
            src={airmeizLogo}
            alt="AIRMEIZ"
            className="relative z-10 h-[56%] w-[56%] object-contain"
            style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 10px hsl(185 90% 55% / 0.35))' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

const RobotScene = () => {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="hidden md:block">
        <div className="relative mx-auto h-[940px] w-full max-w-[1260px]">
          <div className="absolute inset-0">
            {projects.map((project) => (
              <div key={project.name} className={`absolute ${project.desktopPosition}`}>
                <NodeButton {...project} />
              </div>
            ))}
          </div>

          <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
            <RobotFigure />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex flex-col items-center">
          <RobotFigure />
          <div className="mt-8 grid w-full max-w-xl grid-cols-2 gap-5">
            {projects.map((project) => (
              <NodeButton key={project.name} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotScene;
