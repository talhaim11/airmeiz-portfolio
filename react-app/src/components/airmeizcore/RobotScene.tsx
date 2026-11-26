import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alphaflowLogo from '@/assets/airmeizcore/alphaflow-logo-128.webp';
import alphaflowLogo2x from '@/assets/airmeizcore/alphaflow-logo-256.webp';
import pulsegateLogo from '@/assets/airmeizcore/pulsegate-logo-128.webp';
import pulsegateLogo2x from '@/assets/airmeizcore/pulsegate-logo-256.webp';
import swappexLogo from '@/assets/airmeizcore/swappex-logo-128.webp';
import swappexLogo2x from '@/assets/airmeizcore/swappex-logo-256.webp';
import erevshabbatLogo from '@/assets/airmeizcore/erevshabbat-logo-128.webp';
import erevshabbatLogo2x from '@/assets/airmeizcore/erevshabbat-logo-256.webp';
import airmeizLogo128 from '@/assets/airmeizcore/airmeiz-logo-128.webp';
import airmeizLogo256 from '@/assets/airmeizcore/airmeiz-logo-256.webp';
import RobotCore3D from './RobotCore3D';

const novapayLogo = '/assets/img/logos/novapay-logo-128.webp';
const novapayLogo2x = '/assets/img/logos/novapay-logo-256.webp';

type Point = {
  x: number;
  y: number;
};

type LineModel = {
  d: string;
  opacity: number;
  strokeDasharray: string;
  strokeDashoffset: number;
};

const projects = [
  {
    name: 'EREVSHABBAT',
    description: 'Oral cancer early detection',
    logo: erevshabbatLogo,
    logo2x: erevshabbatLogo2x,
    href: '/projects/erevshabbat',
    accent: 'hsl(170 85% 68%)',
    desktopPosition: 'left-[2.5%] top-[3%]',
  },
  {
    name: 'SWAPPEX',
    description: 'Commerce and logistics platform',
    logo: swappexLogo,
    logo2x: swappexLogo2x,
    href: '/projects/swappex',
    accent: 'hsl(188 95% 60%)',
    desktopPosition: 'right-[2.5%] top-[3%]',
  },
  {
    name: 'Novapay',
    description: 'Credit and payment management',
    logo: novapayLogo,
    logo2x: novapayLogo2x,
    href: '/projects/novapay',
    accent: 'hsl(205 95% 72%)',
    desktopPosition: 'left-[-3%] top-[44%]',
  },
  {
    name: 'PULSEGATE',
    description: 'Smart class and activity registration',
    logo: pulsegateLogo,
    logo2x: pulsegateLogo2x,
    href: '/projects/pulsegate',
    accent: 'hsl(180 90% 65%)',
    desktopPosition: 'right-[-3%] top-[44%]',
  },
  {
    name: 'ALPHAFLOW',
    description: 'Athlete monitoring and injury prevention',
    logo: alphaflowLogo,
    logo2x: alphaflowLogo2x,
    href: '/projects/alphaflow',
    accent: 'hsl(195 100% 70%)',
    desktopPosition: 'left-1/2 top-[84%] -translate-x-1/2',
  },
];

const LINE_STROKE_WIDTH = 3;

function createAnimatedBezierLine(origin: Point, target: Point, progress: number): LineModel {
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const curveLift = Math.min(140, Math.abs(dx) * 0.22 + 40);

  const cp1x = origin.x + dx * 0.28;
  const cp1y = origin.y + dy * 0.12 - curveLift;
  const cp2x = origin.x + dx * 0.72;
  const cp2y = origin.y + dy * 0.88 + curveLift * 0.14;

  const d = `M ${origin.x.toFixed(2)} ${origin.y.toFixed(2)} C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${target.x.toFixed(2)} ${target.y.toFixed(2)}`;

  // Estimate Bezier curve length for dash animation
  const straightDist = Math.sqrt(dx * dx + dy * dy);
  const curveLength = straightDist * 1.35; // Bezier curves are ~35% longer than straight line

  return {
    d,
    opacity: Math.max(0, Math.min(1, progress)),
    strokeDasharray: `${curveLength}`,
    strokeDashoffset: curveLength * (1 - progress),
  };
}

const NodeButton = ({
  id,
  name,
  description,
  logo,
  logo2x,
  href,
  accent,
  onHover,
  buttonRef,
  className = '',
}: {
  id: string;
  name: string;
  description: string;
  logo: string;
  logo2x: string;
  href: string;
  accent: string;
  onHover: (id: string, hovered: boolean) => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      ref={buttonRef}
      onClick={() => navigate(href)}
      onMouseEnter={() => onHover(id, true)}
      onMouseLeave={() => onHover(id, false)}
      onFocus={() => onHover(id, true)}
      onBlur={() => onHover(id, false)}
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
        <img
          src={logo}
          srcSet={`${logo} 1x, ${logo2x} 2x`}
          alt={name}
          className="relative z-10 h-[82%] w-[82%] object-contain"
          width={121}
          height={121}
          loading="lazy"
          decoding="async"
        />
      </div>

      <p className="mt-4 font-heading text-sm uppercase tracking-[0.18em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-[15px]">
        {name}
      </p>
      <p className="mt-1 max-w-[13rem] text-xs leading-relaxed text-muted-foreground md:text-[13px]">{description}</p>
    </motion.button>
  );
};

const DesktopRobotScene = () => {
  const desktopRootRef = useRef<HTMLDivElement | null>(null);
  const anchorLogoRef = useRef<HTMLImageElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const animFrameRef = useRef<number | null>(null);
  const targetPointRef = useRef<Point | null>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [lineGeometry, setLineGeometry] = useState<{ origin: Point; target: Point } | null>(null);
  const [pointerX, setPointerX] = useState(0);
  const [pointerY, setPointerY] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const calcCenter = useCallback((container: DOMRect, node: DOMRect): Point => {
    return {
      x: node.left - container.left + node.width * 0.5,
      y: node.top - container.top + node.height * 0.5,
    };
  }, []);

  const recalcLineGeometry = useCallback(() => {
    const container = desktopRootRef.current;
    const anchorLogo = anchorLogoRef.current;
    const target = targetPointRef.current;
    if (!container || !anchorLogo || !target) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const anchorRect = anchorLogo.getBoundingClientRect();
    const origin = {
      x: anchorRect.left - containerRect.left + anchorRect.width * 0.5,
      y: anchorRect.top - containerRect.top + anchorRect.height * 0.36,
    };
    setLineGeometry({ origin, target });
  }, [calcCenter]);

  const animateProgress = useCallback((to: number) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const start = performance.now();
    const from = lineProgress;
    const duration = to > from ? 260 : 220;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (to - from) * eased;
      setLineProgress(next);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [lineProgress]);

  const updateTargetFromNode = useCallback((id: string) => {
    const container = desktopRootRef.current;
    const node = nodeRefs.current[id];
    if (!container || !node) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    targetPointRef.current = calcCenter(containerRect, nodeRect);
    recalcLineGeometry();
  }, [calcCenter, recalcLineGeometry]);

  const handleHover = useCallback((id: string, hovered: boolean) => {
    setHoveredId(hovered ? id : null);
    if (hovered) {
      updateTargetFromNode(id);
      animateProgress(1);
      return;
    }
    animateProgress(0);
  }, [animateProgress, updateTargetFromNode]);

  // Track pointer position for robot animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = desktopRootRef.current;
      if (!container) return;
      const bounds = container.getBoundingClientRect();
      const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (e.clientY - bounds.top) / bounds.height - 0.44;
      setPointerX(relX * 2.4);
      setPointerY(relY * 2.4);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const onViewportChange = () => {
      recalcLineGeometry();
    };

    window.addEventListener('resize', onViewportChange);
    window.addEventListener('scroll', onViewportChange, { passive: true });
    return () => {
      window.removeEventListener('resize', onViewportChange);
      window.removeEventListener('scroll', onViewportChange);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [recalcLineGeometry]);

  const line = useMemo(() => {
    if (!lineGeometry || lineProgress <= 0.01) {
      return null;
    }
    return createAnimatedBezierLine(lineGeometry.origin, lineGeometry.target, lineProgress);
  }, [lineGeometry, lineProgress]);

  // Calculate hovered node bias for robot animation
  const hoveredProject = useMemo(() => {
    if (!hoveredId) return null;
    return projects.find(p => p.name === hoveredId);
  }, [hoveredId]);

  const hoveredBiasX = useMemo(() => {
    if (!hoveredProject || !desktopRootRef.current) return 0;
    const container = desktopRootRef.current;
    const node = nodeRefs.current[hoveredProject.name];
    if (!node) return 0;
    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const centerX = containerRect.width * 0.5;
    const nodeX = nodeRect.left - containerRect.left + nodeRect.width * 0.5;
    return (nodeX - centerX) / containerRect.width * 1.2;
  }, [hoveredProject]);

  const hoveredBiasY = useMemo(() => {
    if (!hoveredProject || !desktopRootRef.current) return 0;
    const container = desktopRootRef.current;
    const node = nodeRefs.current[hoveredProject.name];
    if (!node) return 0;
    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const centerY = containerRect.height * 0.44;
    const nodeY = nodeRect.top - containerRect.top + nodeRect.height * 0.5;
    return (nodeY - centerY) / containerRect.height * 1.0;
  }, [hoveredProject]);

  return (
    <div className="hidden md:block">
        <div ref={desktopRootRef} className="relative mx-auto h-[940px] w-full max-w-[1260px]">
          <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="airmeiz-node-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(185 95% 58%)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="hsl(193 100% 62%)" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {line && (
              <path
                className="airmeiz-core-line"
                d={line.d}
                strokeWidth={LINE_STROKE_WIDTH}
                style={{
                  opacity: line.opacity,
                  strokeDasharray: line.strokeDasharray,
                  strokeDashoffset: line.strokeDashoffset,
                }}
              />
            )}
          </svg>

          <div className="absolute inset-0">
            {projects.map((project) => (
              <div key={project.name} className={`absolute ${project.desktopPosition}`}>
                <NodeButton
                  id={project.name}
                  {...project}
                  onHover={handleHover}
                  buttonRef={(el) => {
                    nodeRefs.current[project.name] = el;
                  }}
                />
              </div>
            ))}
          </div>

          <RobotCore3D 
            className="absolute left-1/2 top-[44%] z-20 -translate-x-1/2 -translate-y-1/2"
            pointerX={pointerX}
            pointerY={pointerY}
            hoveredBiasX={hoveredBiasX}
            hoveredBiasY={hoveredBiasY}
          />

          <div className="pointer-events-none absolute left-1/2 top-[59%] z-20 -translate-x-1/2 -translate-y-1/2">
            <img
              ref={anchorLogoRef}
              src={airmeizLogo128}
              srcSet={`${airmeizLogo128} 1x, ${airmeizLogo256} 2x`}
              alt="AIRMEIZ mark"
              className="h-[86px] w-auto object-contain opacity-95 md:h-[96px] lg:h-[108px]"
              width={162}
              height={108}
              decoding="async"
              style={{ filter: 'drop-shadow(0 0 18px hsl(185 95% 55% / 0.28)) drop-shadow(0 0 32px hsl(185 95% 55% / 0.12))' }}
            />
          </div>
        </div>
      </div>

  );
};

const clampUnit = (v: number) => Math.min(1, Math.max(-1, v));

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

const MobileProjectNode = ({
  project,
  onSelect,
  buttonRef,
}: {
  project: (typeof projects)[number];
  onSelect: (el: HTMLButtonElement, href: string) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) => (
  <button
    type="button"
    ref={buttonRef}
    data-project={project.name}
    onClick={(e) => onSelect(e.currentTarget, project.href)}
    className="group flex w-full touch-manipulation flex-col items-center rounded-2xl text-center outline-none transition-transform duration-150 focus-visible:ring-2 focus-visible:ring-primary/70 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
    style={{ WebkitTapHighlightColor: 'transparent' }}
  >
    <span
      className="relative flex h-[96px] w-[96px] items-center justify-center rounded-full border backdrop-blur-md min-[380px]:h-[104px] min-[380px]:w-[104px]"
      style={{
        borderColor: project.accent,
        background: 'linear-gradient(180deg, hsl(220 18% 10% / 0.96), hsl(220 20% 6% / 0.92))',
        boxShadow: `0 0 0 1px hsl(220 18% 22% / 0.72), 0 0 24px ${project.accent}22`,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[6px] rounded-full"
        style={{ border: `1px solid ${project.accent}55`, boxShadow: `inset 0 0 20px ${project.accent}16` }}
      />
      <img
        src={project.logo}
        srcSet={`${project.logo} 1x, ${project.logo2x} 2x`}
        alt=""
        className="relative z-10 h-[82%] w-[82%] object-contain"
        width={86}
        height={86}
        decoding="async"
      />
    </span>
    <span className="mt-2.5 font-heading text-[13px] uppercase tracking-[0.16em] text-foreground">{project.name}</span>
    <span className="mt-0.5 max-w-[11rem] text-[11px] leading-snug text-muted-foreground">{project.description}</span>
  </button>
);

/**
 * Mobile layout: the robot sits centred above a two-column project grid. The first row is
 * pulled up under the robot and tied together by a shallow arc so it reads as one scene.
 * The robot idles, glances at projects as they scroll into view, and looks at a tapped
 * project while navigation happens immediately.
 */
const MobileRobotScene = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion() ?? false;
  const robotRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const robotVisibleRef = useRef(true);
  const [robotVisible, setRobotVisible] = useState(true);
  const [gaze, setGaze] = useState<Point>({ x: 0, y: 0 });
  const releaseTimer = useRef<number | undefined>(undefined);
  const pendingTimer = useRef<number | undefined>(undefined);
  const lastLookAt = useRef(0);

  const lookAt = useCallback((el: Element, holdMs: number) => {
    const robot = robotRef.current;
    if (!robot) return;
    const r = robot.getBoundingClientRect();
    const t = el.getBoundingClientRect();
    const dx = t.left + t.width / 2 - (r.left + r.width / 2);
    const dy = t.top + t.height * 0.35 - (r.top + r.height / 2);
    setGaze({
      x: clampUnit(dx / (window.innerWidth * 0.45)) * 0.85,
      y: clampUnit(dy / (window.innerHeight * 0.55)) * 0.8,
    });
    window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => setGaze({ x: 0, y: 0 }), holdMs);
  }, []);

  // Pause rendering when the robot is offscreen; it only "watches" while visible.
  useEffect(() => {
    const robot = robotRef.current;
    if (!robot) return;
    const io = new IntersectionObserver(([entry]) => {
      robotVisibleRef.current = entry.isIntersecting;
      setRobotVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setGaze({ x: 0, y: 0 });
    });
    io.observe(robot);
    return () => io.disconnect();
  }, []);

  // Glance at each project as it scrolls into view, spacing glances out so they don't jitter.
  useEffect(() => {
    if (reduceMotion) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((e) => e.isIntersecting);
        const latest = entering[entering.length - 1];
        if (!latest || !robotVisibleRef.current) return;
        const wait = Math.max(0, lastLookAt.current + 900 - performance.now());
        window.clearTimeout(pendingTimer.current);
        pendingTimer.current = window.setTimeout(() => {
          if (!robotVisibleRef.current) return;
          lastLookAt.current = performance.now();
          lookAt(latest.target, 1300);
        }, wait);
      },
      { threshold: 0.6 },
    );
    Object.values(itemRefs.current).forEach((el) => el && io.observe(el));
    return () => {
      io.disconnect();
      window.clearTimeout(pendingTimer.current);
    };
  }, [lookAt, reduceMotion]);

  useEffect(() => () => window.clearTimeout(releaseTimer.current), []);

  const handleSelect = useCallback(
    (el: HTMLButtonElement, href: string) => {
      if (!reduceMotion && robotVisibleRef.current) lookAt(el, 600);
      navigate(href);
    },
    [lookAt, navigate, reduceMotion],
  );

  return (
    <div className="flex flex-col items-center">
      <div ref={robotRef} className="relative z-20 -mb-7">
        <RobotCore3D
          sizeClassName="h-[128px] w-[170px] min-[380px]:h-[140px] min-[380px]:w-[186px]"
          pointerX={0}
          pointerY={0}
          hoveredBiasX={reduceMotion ? 0 : gaze.x}
          hoveredBiasY={reduceMotion ? 0 : gaze.y}
          idle={!reduceMotion}
          ease={4}
          frameloop={reduceMotion ? 'demand' : robotVisible ? 'always' : 'never'}
        />
      </div>

      <ul className="relative grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-7" aria-label="Projects">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[28px] h-[44px] w-full min-[380px]:top-[32px]"
          viewBox="0 0 100 44"
          preserveAspectRatio="none"
        >
          <path
            d="M 25 20 Q 50 46 75 20"
            fill="none"
            stroke="hsl(185 95% 58% / 0.35)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {projects.map((project, index) => (
          <li
            key={project.name}
            className={`relative flex justify-center ${
              index === projects.length - 1 && projects.length % 2 === 1 ? 'col-span-2 w-1/2 justify-self-center' : ''
            }`}
          >
            <MobileProjectNode
              project={project}
              onSelect={handleSelect}
              buttonRef={(el) => {
                itemRefs.current[project.name] = el;
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const RobotScene = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto w-full max-w-6xl">{isDesktop ? <DesktopRobotScene /> : <MobileRobotScene />}</div>
    </MotionConfig>
  );
};

export default RobotScene;
