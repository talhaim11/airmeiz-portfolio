import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { AlertTriangle, XCircle, DollarSign, Unlink } from "lucide-react";
import FullScene from "./FullScene";
import InteractiveMap from "./InteractiveMap";
import SectionHeader from "./SectionHeader";

const items = [
  { type: "sofa", label: "Sofa", lng: 34.770, lat: 32.078 },
  { type: "fridge", label: "Fridge", lng: 34.795, lat: 32.075 },
  { type: "table", label: "Table", lng: 34.782, lat: 32.068 },
  { type: "box", label: "Boxes", lng: 34.800, lat: 32.066 },
  { type: "box", label: "Package", lng: 34.765, lat: 32.064 },
];

const alerts = [
  { text: "No drivers found", lng: 34.773, lat: 32.074, type: "error" as const, delay: 1.5 },
  { text: "Delivery cost: ₪350+", lng: 34.792, lat: 32.071, type: "warning" as const, delay: 2.3 },
  { text: "0 results nearby", lng: 34.767, lat: 32.067, type: "error" as const, delay: 3.1 },
];

const userLocation = { lng: 34.782, lat: 32.072 };

const FurnitureIcon = ({ type }: { type: string }) => {
  const s = "hsl(var(--muted-foreground))";
  const f = "hsl(var(--card))";
  switch (type) {
    case "sofa":
      return (
        <svg width="36" height="18" viewBox="0 0 40 18">
          <rect x="1" y="4" width="38" height="10" rx="3" fill={f} stroke={s} strokeWidth="0.8" />
          <rect x="3" y="1" width="10" height="16" rx="2" fill="none" stroke={s} strokeWidth="0.5" opacity="0.5" />
          <rect x="27" y="1" width="10" height="16" rx="2" fill="none" stroke={s} strokeWidth="0.5" opacity="0.5" />
        </svg>
      );
    case "fridge":
      return (
        <svg width="18" height="28" viewBox="0 0 16 30">
          <rect x="1" y="1" width="14" height="28" rx="2" fill={f} stroke={s} strokeWidth="0.8" />
          <line x1="1" y1="12" x2="15" y2="12" stroke={s} strokeWidth="0.5" />
          <rect x="11" y="5" width="1.5" height="4" rx="0.5" fill={s} opacity="0.5" />
        </svg>
      );
    case "table":
      return (
        <svg width="30" height="18" viewBox="0 0 32 20">
          <rect x="2" y="2" width="28" height="4" rx="1" fill={f} stroke={s} strokeWidth="0.8" />
          <line x1="6" y1="6" x2="6" y2="18" stroke={s} strokeWidth="1.5" />
          <line x1="26" y1="6" x2="26" y2="18" stroke={s} strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 14 14">
          <rect x="1" y="1" width="12" height="12" rx="1" fill={f} stroke={s} strokeWidth="0.8" />
          <line x1="1" y1="5" x2="13" y2="5" stroke={s} strokeWidth="0.5" />
        </svg>
      );
  }
};

const useMapPositions = (
  map: maplibregl.Map | null,
  coords: { lng: number; lat: number }[]
) => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  useEffect(() => {
    if (!map) return;
    const update = () => {
      setPositions(
        coords.map((c) => {
          const p = map.project([c.lng, c.lat]);
          return { x: p.x, y: p.y };
        })
      );
    };
    update();
    map.on("move", update);
    map.on("resize", update);
    return () => {
      map.off("move", update);
      map.off("resize", update);
    };
  }, [map, coords]);
  return positions;
};

import maplibregl from "maplibre-gl";

const ProblemScene = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const [phase, setPhase] = useState(0);
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    if (inView) {
      setPhase(1);
      const t1 = setTimeout(() => setPhase(2), 2200);
      return () => clearTimeout(t1);
    } else {
      setPhase(0);
    }
  }, [inView]);

  const itemCoords = useMemo(() => items.map((i) => ({ lng: i.lng, lat: i.lat })), []);
  const alertCoords = useMemo(() => alerts.map((a) => ({ lng: a.lng, lat: a.lat })), []);
  const userCoords = useMemo(() => [{ lng: userLocation.lng, lat: userLocation.lat }], []);

  const itemPositions = useMapPositions(map, itemCoords);
  const alertPositions = useMapPositions(map, alertCoords);
  const userPositions = useMapPositions(map, userCoords);
  const userPos = userPositions[0];

  const painPoints = [
    { icon: AlertTriangle, text: "No easy way to move large items" },
    { icon: XCircle, text: "No organized marketplace for reuse" },
    { icon: DollarSign, text: "Unpredictable delivery pricing" },
    { icon: Unlink, text: "Logistics completely disconnected" },
  ];

  return (
    <FullScene id="problem">
      <div ref={ref} className="absolute inset-0">
        <InteractiveMap
          center={[34.782, 32.072]}
          zoom={14}
          onMapReady={setMap}
        />

        {/* Red tint overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: "radial-gradient(ellipse at 50% 60%, hsl(0 40% 50% / 0.08) 0%, transparent 60%)" }}
          animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
        />

        {/* Top safe zone — tall gradient mask blocks map content from reaching header */}
        <div className="absolute inset-x-0 top-0 h-52 md:h-64 z-[15] pointer-events-none bg-gradient-to-b from-background via-background/80 to-transparent" />

        {/* Header — pushed up with generous spacing */}
        <div className="absolute top-8 md:top-14 left-0 right-0 z-20">
          <SectionHeader
            eyebrow="The Problem"
            headline={<>Why moving items is{" "}<span className="text-destructive">still broken</span></>}
            description="Scattered items, no nearby drivers, unpredictable pricing — logistics that don't connect."
            inView={inView}
          />
        </div>

        {/* Furniture items on map — positioned in lower half of screen */}
        {itemPositions.map((pos, i) => (
          <motion.div
            key={`furn-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 160 }}
          >
            <div className="p-2.5 rounded-lg border border-border/30 bg-card/80 backdrop-blur-sm shadow-md">
              <FurnitureIcon type={items[i].type} />
            </div>
            <span className="mt-1.5 text-xs text-muted-foreground/80 font-display uppercase tracking-wider font-medium">
              {items[i].label}
            </span>
          </motion.div>
        ))}

        {/* "You" pin */}
        {userPos && (
          <motion.div
            className="absolute z-10 pointer-events-none"
            style={{ left: userPos.x, top: userPos.y }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
              <svg width="32" height="42" viewBox="0 0 36 46" fill="none">
                <path d="M18 44 C18 44 34 26 34 16 C34 7.16 26.84 0 18 0 C9.16 0 2 7.16 2 16 C2 26 18 44 18 44Z"
                  fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <circle cx="18" cy="16" r="5" fill="hsl(var(--primary) / 0.5)" stroke="hsl(var(--primary))" strokeWidth="1" />
              </svg>
              <span className="mt-1 text-sm text-primary font-display font-semibold">You</span>
            </div>
          </motion.div>
        )}

        {/* Alert callouts — no blinking dot */}
        {phase >= 1 && alertPositions.map((pos, i) => (
          <motion.div
            key={`alert-${i}`}
            className="absolute -translate-x-1/2 z-20 pointer-events-none"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, scale: 0.7, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: alerts[i].delay, type: "spring", stiffness: 200 }}
          >
            <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 backdrop-blur-md shadow-lg ${
              alerts[i].type === "error"
                ? "border-destructive/40 bg-destructive/10"
                : "border-yellow-500/40 bg-yellow-500/10"
            }`}>
              <div className={`w-2 h-2 rounded-full shrink-0 ${alerts[i].type === "error" ? "bg-destructive" : "bg-yellow-500"}`} />
              <span className={`text-sm font-display font-semibold whitespace-nowrap ${
                alerts[i].type === "error" ? "text-destructive" : "text-yellow-400"
              }`}>
                {alerts[i].text}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Bottom pain points — using Lucide icons, not emojis */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView && phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <div className="bg-gradient-to-t from-background via-background/95 to-transparent pt-16 pb-8 px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {painPoints.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="rounded-xl border border-destructive/20 bg-card/80 backdrop-blur-md p-4 md:p-5 text-center shadow-lg"
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView && phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ delay: 2.4 + i * 0.12 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mx-auto mb-3">
                      <Icon size={20} className="text-destructive" />
                    </div>
                    <p className="text-sm md:text-base text-foreground font-display font-semibold leading-snug">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </FullScene>
  );
};

export default ProblemScene;
