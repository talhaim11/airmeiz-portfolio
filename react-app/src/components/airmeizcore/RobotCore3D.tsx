import { useMemo, useRef, forwardRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type RobotCore3DProps = {
  pointerX: number;
  pointerY: number;
  hoveredBiasX: number;
  hoveredBiasY: number;
  className?: string;
};

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

/* ── Canvas pixel textures ──────────────────────────────────────────────── */

function makePixelEyeTex(): THREE.CanvasTexture {
  // 5×5 pixel grid, each pixel 7px + 1px gap → 40×40 canvas
  const S = 40;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  g.clearRect(0, 0, S, S);
  const lit: [number, number][] = [
    [1, 0], [2, 0], [3, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
    [1, 4], [2, 4], [3, 4],
  ];
  const ps = 7, pd = 1;
  g.shadowBlur = 12;
  g.shadowColor = "#00e5ff";
  g.fillStyle = "#00e5ff";
  for (const [px, py] of lit) g.fillRect(px * (ps + pd), py * (ps + pd), ps, ps);
  // bright pixel highlight inside each cell
  g.shadowBlur = 0;
  g.fillStyle = "#ccfffe";
  for (const [px, py] of lit) g.fillRect(px * (ps + pd) + 2, py * (ps + pd) + 2, ps - 4, ps - 4);
  const t = new THREE.CanvasTexture(c);
  return t;
}

function makePixelSmileTex(): THREE.CanvasTexture {
  // 9×3 pixel grid → 72×24 canvas
  const W = 72, H = 32;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d")!;
  g.clearRect(0, 0, W, H);
  // U-shaped smile: corners on top row, sides on middle, arc on bottom
  const lit: [number, number][] = [
    [0, 0], [8, 0],
    [1, 1], [7, 1],
    [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
  ];
  const ps = 7, pd = 1;
  g.shadowBlur = 10;
  g.shadowColor = "#00e5ff";
  g.fillStyle = "#00e5ff";
  for (const [px, py] of lit) g.fillRect(px * (ps + pd), py * (ps + pd), ps, ps);
  g.shadowBlur = 0;
  g.fillStyle = "#ccfffe";
  for (const [px, py] of lit) g.fillRect(px * (ps + pd) + 2, py * (ps + pd) + 2, ps - 4, ps - 4);
  const t = new THREE.CanvasTexture(c);
  return t;
}

/* ── Robot ─────────────────────────────────────────────────────────────── */

function RobotHead({ pointerX, pointerY, hoveredBiasX, hoveredBiasY }: RobotCore3DProps) {
  const rootRef = useRef<THREE.Group>(null);
  const gazeRef = useRef<THREE.Group>(null);
  const eyeTex   = useMemo(() => makePixelEyeTex(),   []);
  const smileTex = useMemo(() => makePixelSmileTex(), []);

  useFrame((_, dt) => {
    if (!rootRef.current) return;
    const tx = clamp(pointerX * 0.82 + hoveredBiasX * 1.15, -1, 1);
    // positive ty = mouse/node is BELOW centre → robot tilts down (positive rotation.x in three.js)
    const ty = clamp(pointerY * 0.72 + hoveredBiasY * 0.94, -0.82, 0.82);
    const k = 1 - Math.exp(-dt * 8);
    rootRef.current.rotation.y += (clamp(tx * 0.2, -0.26, 0.26) - rootRef.current.rotation.y) * k;
    rootRef.current.rotation.x += (clamp(ty * 0.30, -0.28, 0.28) - rootRef.current.rotation.x) * k;
    if (gazeRef.current) {
      const kk = 1 - Math.exp(-dt * 12);
      gazeRef.current.position.x += (clamp(tx * 0.034, -0.05, 0.05) - gazeRef.current.position.x) * kk;
      gazeRef.current.position.y += (clamp(ty * 0.040, -0.055, 0.055) - gazeRef.current.position.y) * kk;
    }
  });

  return (
    <group ref={rootRef} position={[0, 0.06, 0]}>
      {/* ── Outer shell – very-rounded pill (high radius vs depth) ── */}
      <RoundedBox args={[1.45, 1.1, 0.72]} radius={0.34} smoothness={10}>
        <meshPhysicalMaterial
          color="#d2f4fb"
          roughness={0.11}
          metalness={0.26}
          clearcoat={1}
          clearcoatRoughness={0.09}
          emissive="#88e8ff"
          emissiveIntensity={0.13}
        />
      </RoundedBox>

      {/* Subtle cyan edge glow (back-face only = inner rim) */}
      <RoundedBox args={[1.51, 1.15, 0.76]} radius={0.35} smoothness={10}>
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.07} side={THREE.BackSide} />
      </RoundedBox>

      {/* ── Dark screen inset ────────────────────────────────────── */}
      <RoundedBox args={[1.08, 0.76, 0.04]} radius={0.22} smoothness={8} position={[0, 0.04, 0.37]}>
        <meshStandardMaterial color="#030c15" emissive="#041e30" emissiveIntensity={0.55} />
      </RoundedBox>

      {/* ── Pixel eyes ───────────────────────────────────────────── */}
      <group ref={gazeRef}>
        <mesh position={[-0.22, 0.14, 0.41]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshBasicMaterial map={eyeTex} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0.22, 0.14, 0.41]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshBasicMaterial map={eyeTex} transparent depthWrite={false} />
        </mesh>
      </group>

      {/* ── Pixel smile ──────────────────────────────────────────── */}
      <mesh position={[0, -0.08, 0.41]}>
        <planeGeometry args={[0.40, 0.17]} />
        <meshBasicMaterial map={smileTex} transparent depthWrite={false} />
      </mesh>

      {/* ── Ear pods ─────────────────────────────────────────────── */}
      <mesh position={[-0.84, 0.04, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.11, 0.11, 0.18, 32]} />
        <meshPhysicalMaterial color="#183850" metalness={0.7} roughness={0.18}
          emissive="#38dbff" emissiveIntensity={0.24} />
      </mesh>
      <mesh position={[0.84, 0.04, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.11, 0.11, 0.18, 32]} />
        <meshPhysicalMaterial color="#183850" metalness={0.7} roughness={0.18}
          emissive="#38dbff" emissiveIntensity={0.24} />
      </mesh>

      {/* Face screen glow */}
      <pointLight position={[0, 0.04, 0.9]} intensity={0.5} color="#00e5ff" distance={1.8} decay={2} />
    </group>
  );
}

const RobotCore3D = forwardRef<HTMLDivElement, RobotCore3DProps>((
  { pointerX, pointerY, hoveredBiasX, hoveredBiasY, className = '' }, 
  ref
) => {
  return (
    <div ref={ref} className={`pointer-events-none h-[220px] w-[270px] md:h-[310px] md:w-[380px] lg:h-[380px] lg:w-[460px] ${className}`}>
      <Canvas dpr={[1, 1.7]} camera={{ position: [0, 0, 3.6], fov: 30 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.32} />
        <directionalLight position={[2.5, 3.4, 4.0]} intensity={1.2} color="#f2feff" />
        <pointLight position={[-2.0, -0.8, 2.8]} intensity={0.5} color="#54ecff" />
        <RobotHead pointerX={pointerX} pointerY={pointerY} hoveredBiasX={hoveredBiasX} hoveredBiasY={hoveredBiasY} />
      </Canvas>
    </div>
  );
});

RobotCore3D.displayName = "RobotCore3D";

export default RobotCore3D;
