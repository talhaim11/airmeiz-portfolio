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
    desktopPosition: 'left-[6%] top-[6%]',
  },
  {
    name: 'SWAPPEX',
    description: 'Commerce and logistics platform',
    logo: swappexLogo,
    href: '/projects/swappex',
    accent: 'hsl(188 95% 60%)',
    desktopPosition: 'right-[6%] top-[6%]',
  },
  {
    name: 'Novapay',
    description: 'Credit and payment management',
    logo: novapayLogo,
    href: '/projects/novapay',
    accent: 'hsl(205 95% 72%)',
    desktopPosition: 'left-[-1%] top-[40%]',
  },
  {
    name: 'PULSEGATE',
    description: 'Smart class and activity registration',
    logo: pulsegateLogo,
    href: '/projects/pulsegate',
    accent: 'hsl(180 90% 65%)',
    desktopPosition: 'right-[-1%] top-[40%]',
  },
  {
    name: 'ALPHAFLOW',
    description: 'Athlete monitoring and injury prevention',
    logo: alphaflowLogo,
    href: '/projects/alphaflow',
    accent: 'hsl(195 100% 70%)',
    desktopPosition: 'left-1/2 top-[72%] -translate-x-1/2',
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
        className="relative flex h-28 w-28 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 md:h-32 md:w-32"
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
        <img src={logo} alt={name} className="relative z-10 h-[60%] w-[60%] object-contain" />
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
  const rotateX = useSpring(useMotionTemplate`${pointerY}deg`, { stiffness: 120, damping: 18, mass: 0.8 });
  const rotateY = useSpring(useMotionTemplate`${pointerX}deg`, { stiffness: 120, damping: 18, mass: 0.8 });
  const translateX = useSpring(useMotionTemplate`${pointerX}px`, { stiffness: 90, damping: 16, mass: 0.9 });
  const translateY = useSpring(useMotionTemplate`${pointerY}px`, { stiffness: 90, damping: 16, mass: 0.9 });
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

    pointerX.set(relativeX * 18);
    pointerY.set(relativeY * -18);
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
          x: translateX,
          y: translateY,
          transformPerspective: 1200,
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
            <path d="M186 176C186 118 227 86 280 86C333 86 374 118 374 176V304C374 370 331 420 280 420C229 420 186 370 186 304V176Z" strokeWidth="3.2" opacity="0.96" />
            <path d="M214 154C233 126 252 114 280 114C308 114 327 126 346 154" strokeWidth="2.4" opacity="0.84" />
            <path d="M219 172C239 145 258 134 280 134C302 134 321 145 341 172" strokeWidth="1.8" opacity="0.48" />
            <path d="M220 232C237 208 256 196 280 196C304 196 323 208 340 232" strokeWidth="2.6" opacity="0.88" />
            <path d="M228 248C244 265 261 274 280 274C299 274 316 265 332 248" strokeWidth="1.9" opacity="0.46" />
            <path d="M222 332C241 356 258 368 280 368C302 368 319 356 338 332" strokeWidth="2.4" opacity="0.78" />
            <path d="M232 388C248 404 263 412 280 412C297 412 312 404 328 388" strokeWidth="1.9" opacity="0.54" />
            <path d="M238 108L280 62L322 108" strokeWidth="2.1" opacity="0.56" />
            <path d="M204 198C209 238 212 270 212 289C212 330 241 360 280 360C319 360 348 330 348 289C348 270 351 238 356 198" strokeWidth="1.6" opacity="0.3" />
            <path d="M246 232C255 221 266 216 280 216C294 216 305 221 314 232" strokeWidth="1.6" opacity="0.38" />
            <path d="M256 318C264 323 272 326 280 326C288 326 296 323 304 318" strokeWidth="1.4" opacity="0.3" />
          </g>
        </svg>

        <div className="relative z-10 flex h-[118px] w-[118px] items-center justify-center rounded-full border border-primary/35 bg-background/70 shadow-[0_0_38px_hsl(185_90%_55%/0.12)] backdrop-blur-md md:h-[160px] md:w-[160px]">
          <div className="absolute inset-[10px] rounded-full border border-primary/16" />
          <img src={airmeizLogo} alt="AIRMEIZ" className="relative z-10 h-[54%] w-[54%] object-contain" />
        </div>
      </motion.div>
    </div>
  );
};

const RobotScene = () => {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="hidden md:block">
        <div className="relative mx-auto h-[820px] w-full max-w-[1180px]">
          <div className="absolute inset-0">
            {projects.map((project) => (
              <div key={project.name} className={`absolute ${project.desktopPosition}`}>
                <NodeButton {...project} />
              </div>
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%]">
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
