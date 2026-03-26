import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import maplibregl from "maplibre-gl";
import { MapPin, Package, Navigation, CheckCircle, Scan, Route, Truck, Calculator } from "lucide-react";
import FullScene from "./FullScene";
import InteractiveMap from "./InteractiveMap";
import SectionHeader from "./SectionHeader";
import useMapRoutes from "./useMapRoutes";
import useOSRMRoute from "./useOSRMRoute";

// Start + pickup are intentionally bound to the same verified address.
const pickupCoord = { lng: 34.8093083, lat: 32.0806306 }; // same as route start
const dropoffCoord = { lng: 34.794968, lat: 32.072746 }; // Yigal Alon 114, Tel Aviv

const useMapPositions = (map: maplibregl.Map | null, coords: { lng: number; lat: number }[]) => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  useEffect(() => {
    if (!map) return;
    const update = () => {
      setPositions(coords.map((c) => {
        const p = map.project([c.lng, c.lat]);
        return { x: p.x, y: p.y };
      }));
    };
    update();
    map.on("move", update);
    map.on("resize", update);
    return () => { map.off("move", update); map.off("resize", update); };
  }, [map, coords]);
  return positions;
};

const steps = [
  { icon: Scan, label: "Item scanned", detail: "Sofa · Large · 32 kg", phase: 1 },
  { icon: Truck, label: "Vehicle matched", detail: "Van required · 2.3 km away", phase: 2 },
  { icon: Route, label: "Route optimized", detail: "1.2 km · Street-level routing", phase: 2 },
  { icon: Calculator, label: "Cost calculated", detail: "₪65 delivery · ₪120 item", phase: 3 },
];

const EngineScene = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const [phase, setPhase] = useState(0);
  const [driverRouteProgress, setDriverRouteProgress] = useState(0);
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!inView) { setPhase(0); setDriverRouteProgress(0); return; }
    const timings = [0, 2500, 5000, 8000, 10000, 14000];
    const timers = timings.map((t, i) =>
      setTimeout(() => {
        setPhase(i);
        if (i === 2 || i === 4) setDriverRouteProgress(0);
      }, t)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  useEffect(() => {
    if (phase !== 2 && phase !== 4) return;
    setDriverRouteProgress(0);
    const interval = setInterval(() => {
      setDriverRouteProgress(prev => {
        if (prev >= 1) { clearInterval(interval); return 1; }
        return Math.min(prev + 0.02, 1);
      });
    }, 80);
    return () => clearInterval(interval);
  }, [phase]);

  // Single necessary route: pickup/start -> dropoff.
  const deliveryWaypoints = useMemo(
    () => [[pickupCoord.lng, pickupCoord.lat], [dropoffCoord.lng, dropoffCoord.lat]] as [number, number][],
    []
  );
  const deliveryRoute = useOSRMRoute(deliveryWaypoints, inView);

  const snappedPickupCoord = useMemo(
    () =>
      deliveryRoute && deliveryRoute.length > 0
        ? { lng: deliveryRoute[0][0], lat: deliveryRoute[0][1] }
        : pickupCoord,
    [deliveryRoute]
  );
  const snappedDriverStart = snappedPickupCoord;
  const snappedDropoffCoord = useMemo(
    () =>
      deliveryRoute && deliveryRoute.length > 0
        ? {
            lng: deliveryRoute[deliveryRoute.length - 1][0],
            lat: deliveryRoute[deliveryRoute.length - 1][1],
          }
        : dropoffCoord,
    [deliveryRoute]
  );

  const staticPositions = useMapPositions(map, [snappedDriverStart, snappedPickupCoord, snappedDropoffCoord]);

  // Route layers
  const routes = useMemo(() => {
    const result: { id: string; coordinates: [number, number][]; color?: string; width?: number; dasharray?: number[]; opacity?: number; visible?: boolean }[] = [];
    if (deliveryRoute) {
      result.push({
        id: "delivery-route",
        coordinates: deliveryRoute,
        color: "#f59e0b",
        width: 4,
        dasharray: undefined,
        opacity: phase >= 4 ? 0.8 : 0,
        visible: phase >= 4,
      });
    }
    return result;
  }, [phase, deliveryRoute]);

  useMapRoutes(map, routes);

  const getRoutePoint = useCallback((route: [number, number][] | undefined, progress: number, fallback: { lng: number; lat: number }) => {
    if (!route || route.length === 0) return fallback;
    const idx = Math.min(Math.floor(progress * (route.length - 1)), route.length - 1);
    return { lng: route[idx][0], lat: route[idx][1] };
  }, []);

  const driverCoord = useMemo(() => {
    if (phase < 4) return snappedDriverStart;
    if (phase === 4) return getRoutePoint(deliveryRoute ?? undefined, driverRouteProgress, snappedPickupCoord);
    if (phase >= 5) return snappedDropoffCoord;
    return snappedDriverStart;
  }, [phase, driverRouteProgress, deliveryRoute, getRoutePoint, snappedDriverStart, snappedPickupCoord, snappedDropoffCoord]);

  const driverPos = useMapPositions(map, [driverCoord]);
  const vehiclePos = driverPos[0];
  return (
    <FullScene>
      <div ref={ref} className="absolute inset-0">
        <InteractiveMap
          center={[34.8015, 32.0762]}
          zoom={13.35}
          onMapReady={setMap}
        />

        {/* Top gradient mask — stronger to keep route/startpoint below heading */}
        <div className="absolute inset-x-0 top-0 h-64 md:h-72 z-[15] pointer-events-none bg-gradient-to-b from-background via-background/95 to-transparent" />

        {/* Header */}
        <div className="absolute top-6 md:top-10 left-0 right-0 z-20">
          <SectionHeader
            eyebrow="Smart Delivery"
            headline={<>The logistics{" "}<span className="gradient-text">engine</span></>}
            description="From item scan to delivery — automated, optimized, transparent."
            inView={inView}
          />
        </div>

        {/* Start point marker */}
        {staticPositions[0] && (
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-[9] pointer-events-none"
            style={{ left: staticPositions[0].x, top: staticPositions[0].y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase < 2 ? 1 : 0.3 }}
          >
            <div className="w-4 h-4 rounded-full border-2 bg-primary/15 border-primary/50" />
          </motion.div>
        )}

        {/* Pickup marker */}
        {staticPositions[1] && phase >= 1 && (
          <motion.div
            className="absolute -translate-x-1/2 z-10 pointer-events-none"
            style={{ left: staticPositions[1].x, top: staticPositions[1].y - 48 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex flex-col items-center">
              <div className="px-3 py-1.5 rounded-lg bg-card/90 border border-primary/30 shadow-md backdrop-blur-sm mb-1">
                <div className="flex items-center gap-1.5">
                  <Package size={14} className="text-primary" />
                  <span className="text-sm font-display font-bold text-foreground">Pickup</span>
                </div>
              </div>
              <div className="w-px h-3 bg-primary/40" />
              <div className="w-4 h-4 rounded-full border-2 bg-primary/15 border-primary/50" />
            </div>
          </motion.div>
        )}

        {/* Dropoff marker */}
        {staticPositions[2] && phase >= 3 && (
          <motion.div
            className="absolute -translate-x-1/2 z-10 pointer-events-none"
            style={{ left: staticPositions[2].x, top: staticPositions[2].y - 48 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex flex-col items-center">
              <div className="px-3 py-1.5 rounded-lg bg-card/90 border border-amber-500/30 shadow-md backdrop-blur-sm mb-1">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-amber-500" />
                  <span className="text-sm font-display font-bold text-foreground">Dropoff</span>
                </div>
              </div>
              <div className="w-px h-3 bg-amber-500/40" />
              <div className="w-4 h-4 rounded-full border-2 bg-amber-500/10 border-amber-500/45" />
            </div>
          </motion.div>
        )}

        {/* Driver vehicle */}
        {vehiclePos && (
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            animate={{ left: vehiclePos.x, top: vehiclePos.y }}
            transition={{ duration: 0.12, ease: "linear" }}
          >
            <div className="w-11 h-11 rounded-full bg-card/90 border-2 border-primary/40 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Navigation size={18} className="text-primary" />
            </div>
          </motion.div>
        )}

        {/* Left panel — step cards — positioned to not overlap map routes */}
        <motion.div
          className="hidden xl:block absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-20 w-72"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="space-y-2.5">
            {steps.map((step, i) => {
              const isDone = phase >= step.phase;
              const isActive = phase === step.phase;
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  className="rounded-xl border backdrop-blur-md p-4 md:p-5 transition-all duration-500"
                  style={{
                    borderColor: isDone ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--border) / 0.12)',
                    backgroundColor: isActive ? 'hsl(var(--primary) / 0.06)' : isDone ? 'hsl(var(--card) / 0.8)' : 'hsl(var(--card) / 0.4)',
                    boxShadow: isActive ? '0 0 24px hsl(var(--primary) / 0.08)' : 'none',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: isDone ? 1 : 0.35, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isDone ? 'bg-primary/15' : 'bg-muted/20'
                    }`}>
                      {isDone ? (
                        <CheckCircle size={17} className="text-primary" />
                      ) : (
                        <Icon size={17} className="text-muted-foreground/40" />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm md:text-base font-display font-bold ${isDone ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                        {step.label}
                      </p>
                      <p className={`text-xs md:text-sm font-display mt-0.5 ${isDone ? 'text-muted-foreground' : 'text-muted-foreground/30'}`}>
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right panel — delivery card */}
        <motion.div
          className="hidden xl:block absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-20 w-72"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="rounded-2xl border border-border/20 bg-card/85 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border/12 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
              <span className="text-sm font-display font-bold text-foreground/80 tracking-wider uppercase">SwappeX</span>
              <span className={`ml-auto text-sm font-display font-semibold ${phase >= 5 ? 'text-green-400' : 'text-primary'}`}>
                {phase >= 5 ? "Delivered" : phase >= 4 ? "Delivering" : phase >= 3 ? "Picked up" : phase >= 2 ? "En route" : phase >= 1 ? "Matched" : "Scanning"}
              </span>
            </div>

            <div className="p-5 space-y-3">
              {phase >= 1 && (
                <motion.div
                  className="rounded-lg border border-primary/15 bg-primary/5 p-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-base font-display font-bold text-foreground">Sofa — Large</span>
                    <span className="text-base font-display font-bold text-primary">₪65</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-display">
                      <Route size={12} className="text-primary/60" />
                      <span>Distance: 1.2 km</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-display">
                      <Truck size={12} className="text-primary/60" />
                      <span>Vehicle: Van</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {phase >= 3 && (
                <motion.div
                  className="rounded-lg border border-border/15 bg-background/30 p-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm font-display font-bold text-foreground mb-2.5 uppercase tracking-wide">Cost Analysis</p>
                  <div className="space-y-2">
                    {[
                      { label: "Item value", value: "₪120" },
                      { label: "Delivery fee", value: "₪65" },
                      { label: "Platform fee", value: "₪8" },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between text-sm font-display">
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="text-foreground font-semibold">{row.value}</span>
                      </div>
                    ))}
                    <div className="border-t border-border/15 pt-2 flex justify-between text-base font-display">
                      <span className="text-foreground font-bold">Total</span>
                      <span className="text-primary font-bold">₪193</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom status bar */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-8 md:gap-12 px-7 py-4 rounded-xl border border-border/20 bg-card/70 backdrop-blur-md shadow-lg">
            <div className="text-center">
              <p className="font-display text-xl md:text-2xl font-bold text-foreground">
                {phase >= 1 ? "1.2 km" : "—"}
              </p>
              <p className="text-sm text-muted-foreground font-display mt-0.5">Distance</p>
            </div>
            <div className="w-px h-9 bg-border/20" />
            <div className="text-center">
              <p className="font-display text-xl md:text-2xl font-bold text-primary">
                {phase >= 1 ? "₪65" : "—"}
              </p>
              <p className="text-sm text-muted-foreground font-display mt-0.5">Earnings</p>
            </div>
            <div className="w-px h-9 bg-border/20" />
            <div className="text-center">
              <p className="font-display text-xl md:text-2xl font-bold text-foreground">
                {phase >= 5 ? "Complete" : phase >= 4 ? "Delivering" : phase >= 3 ? "Picked up" : phase >= 2 ? "En route" : phase >= 1 ? "Matched" : "Scanning"}
              </p>
              <p className="text-sm text-muted-foreground font-display mt-0.5">Status</p>
            </div>
          </div>
        </motion.div>
      </div>
    </FullScene>
  );
};

export default EngineScene;
