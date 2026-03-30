import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alphaflowLogo from '@/assets/airmeizcore/alphaflow-logo.png';
import pulsegateLogo from '@/assets/airmeizcore/pulsegate-logo.png';
import swappexLogo from '@/assets/airmeizcore/swappex-logo.png';
import erevshabbatLogo from '@/assets/airmeizcore/erevshabbat-logo.png';
import RobotCore3D from './RobotCore3D';

const novapayLogo = '/assets/img/logos/novapay-logo.png';

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
        <img src={logo} alt={name} className="relative z-10 h-[82%] w-[82%] object-contain" />
      </div>

      <p className="mt-4 font-heading text-sm uppercase tracking-[0.18em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-[15px]">
        {name}
      </p>
      <p className="mt-1 max-w-[13rem] text-xs leading-relaxed text-muted-foreground md:text-[13px]">{description}</p>
    </motion.button>
  );
};

const RobotScene = () => {
  const desktopRootRef = useRef<HTMLDivElement | null>(null);
  const robotRef = useRef<HTMLDivElement | null>(null);
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
    const robot = robotRef.current;
    const target = targetPointRef.current;
    if (!container || !robot || !target) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const robotRect = robot.getBoundingClientRect();
    const origin = calcCenter(containerRect, robotRect);
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
    <div className="mx-auto w-full max-w-6xl">
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
            ref={robotRef}
            pointerX={pointerX}
            pointerY={pointerY}
            hoveredBiasX={hoveredBiasX}
            hoveredBiasY={hoveredBiasY}
          />
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex flex-col items-center">
          <div className="h-[220px] w-[270px]">
            <RobotCore3D 
              pointerX={0}
              pointerY={0}
              hoveredBiasX={0}
              hoveredBiasY={0}
            />
          </div>
          <div className="mt-8 grid w-full max-w-xl grid-cols-2 gap-5">
            {projects.map((project) => (
              <NodeButton key={project.name} id={project.name} {...project} onHover={handleHover} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotScene;
