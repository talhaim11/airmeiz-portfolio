import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import maplibregl from "maplibre-gl";
import { Package, User, Truck, CarFront, Bike, Laptop } from "lucide-react";
import FullScene from "./FullScene";
import InteractiveMap from "./InteractiveMap";
import SectionHeader from "./SectionHeader";
import useMapRoutes from "./useMapRoutes";
import { useOSRMRoutes } from "./useOSRMRoute";

interface MatchDef {
  id: string;
  seller: { lng: number; lat: number; label: string };
  buyer: { lng: number; lat: number; label: string };
  item: string;
  vehicle: string;
  color: string;
}

const matches: MatchDef[] = [
  {
    id: "m1",
    seller: { lng: 34.778407, lat: 32.08672, label: "Seller A" },
    buyer:  { lng: 34.8093083, lat: 32.0806306, label: "Buyer A" },
    item: "Fridge",
    vehicle: "van",
    color: "#2dd4bf",
  },
  {
    id: "m2",
    seller: { lng: 34.7860, lat: 32.0445, label: "Seller B" },
    buyer:  { lng: 34.8400, lat: 32.0875, label: "Buyer B" },
    item: "Sofa",
    vehicle: "pickup",
    color: "#a78bfa",
  },
  {
    id: "m3",
    seller: { lng: 34.8114903, lat: 32.0857615, label: "Seller C" },
    buyer:  { lng: 34.8420, lat: 32.0480, label: "Buyer C" },
    item: "Laptop",
    vehicle: "motorcycle",
    color: "#f59e0b",
  },
];

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

const MapScene = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const [activeMatch, setActiveMatch] = useState(-1);
  const [vehicleProgress, setVehicleProgress] = useState<number[]>([0, 0, 0]);
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  // Sequential activation — one route at a time, calmer timing
  useEffect(() => {
    if (!inView) { setActiveMatch(-1); setVehicleProgress([0, 0, 0]); return; }
    const timers = matches.map((_, i) =>
      setTimeout(() => setActiveMatch(i), 2000 + i * 4000)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  // Smooth vehicle movement — no jitter
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setVehicleProgress(prev => prev.map((p, i) =>
        activeMatch >= i ? Math.min(p + 0.012, 1) : 0
      ));
    }, 100);
    return () => clearInterval(interval);
  }, [inView, activeMatch]);

  const osrmWaypointSets = useMemo(() =>
    matches.map(m => ({
      id: m.id,
      waypoints: [[m.seller.lng, m.seller.lat], [m.buyer.lng, m.buyer.lat]] as [number, number][],
    })), []);

  const osrmRoutes = useOSRMRoutes(osrmWaypointSets, inView);

  // Snap marker coords to OSRM route start/end
  const snappedCoords = useMemo(() => {
    return matches.flatMap(m => {
      const route = osrmRoutes.get(m.id);
      if (!route || route.length < 2) {
        return [null, null];
      }
      return [
        { lng: route[0][0], lat: route[0][1] },
        { lng: route[route.length - 1][0], lat: route[route.length - 1][1] },
      ];
    });
  }, [osrmRoutes]);

  const positions = useMapPositions(
    map,
    snappedCoords.map((c) => c ?? { lng: 0, lat: 0 })
  );

  // Route layers — active = solid traveled + dashed remaining; past = dim solid; future = hidden
  const routes = useMemo(() => {
    const result: { id: string; coordinates: [number, number][]; color?: string; width?: number; dasharray?: number[]; opacity?: number; visible?: boolean }[] = [];
    matches.forEach((m, mi) => {
      const coords = osrmRoutes.get(m.id);
      if (!coords || coords.length < 2) return;
      const isActive = activeMatch === mi;
      const isPast = activeMatch > mi;

      if (isActive && vehicleProgress[mi] > 0) {
        const traveledIdx = Math.max(1, Math.floor(vehicleProgress[mi] * (coords.length - 1)));
        result.push({
          id: `route-traveled-${m.id}`,
          coordinates: coords.slice(0, traveledIdx + 1),
          color: m.color,
          width: 4,
          opacity: 0.85,
          visible: true,
        });
        result.push({
          id: `route-remaining-${m.id}`,
          coordinates: coords.slice(traveledIdx),
          color: m.color,
          width: 3,
          dasharray: [4, 3],
          opacity: 0.25,
          visible: true,
        });
      } else if (isPast) {
        result.push({
          id: `route-${m.id}`,
          coordinates: coords,
          color: m.color,
          width: 3,
          opacity: 0.15,
          visible: true,
        });
      } else if (isActive) {
        result.push({
          id: `route-${m.id}`,
          coordinates: coords,
          color: m.color,
          width: 4,
          dasharray: [4, 3],
          opacity: 0.4,
          visible: true,
        });
      }
    });
    return result;
  }, [activeMatch, osrmRoutes, vehicleProgress]);

  useMapRoutes(map, routes);

  // Vehicle positions
  const vehicleCoords = useMemo(() => {
    return matches.map((m, mi) => {
      const route = osrmRoutes.get(m.id);
      if (!route || route.length < 2 || activeMatch < mi) return null;
      const idx = Math.min(
        Math.floor(vehicleProgress[mi] * (route.length - 1)),
        route.length - 1
      );
      return { lng: route[idx][0], lat: route[idx][1] };
    });
  }, [vehicleProgress, osrmRoutes, activeMatch]);

  const vehiclePositions = useMapPositions(
    map,
    vehicleCoords.map((c) => c ?? { lng: 0, lat: 0 })
  );

  const getVehicleIcon = (vehicle: string) => {
    if (vehicle === "van") return Truck;
    if (vehicle === "pickup") return CarFront;
    return Bike;
  };

  const allRoutesLoaded = useMemo(
    () => matches.every((m) => {
      const r = osrmRoutes.get(m.id);
      return !!r && r.length > 1;
    }),
    [osrmRoutes]
  );

  useEffect(() => {
    if (!inView || !map || !allRoutesLoaded || osrmRoutes.size === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    let hasPoint = false;
    osrmRoutes.forEach((coords) => {
      coords.forEach(([lng, lat]) => {
        bounds.extend([lng, lat]);
        hasPoint = true;
      });
    });
    if (!hasPoint) return;
    map.fitBounds(bounds, {
      padding: { top: 185, right: 120, bottom: 165, left: 120 },
      maxZoom: 12.1,
      duration: 900,
      linear: true,
    });
  }, [map, osrmRoutes, inView, allRoutesLoaded]);

  return (
    <FullScene>
      <div ref={ref} className="absolute inset-0">
        <InteractiveMap
          center={[34.83, 32.068]}
          zoom={11.8}
          onMapReady={setMap}
        />

        {/* Top gradient — prevents routes crossing text */}
        <div className="absolute inset-x-0 top-0 h-56 md:h-64 z-[15] pointer-events-none bg-gradient-to-b from-background via-background/90 to-transparent" />

        <div className="absolute top-8 md:top-12 left-0 right-0 z-20">
          <SectionHeader
            eyebrow="Real-Time Network"
            headline={<>Everything is{" "}<span className="gradient-text">connected</span></>}
            description="Buyers, sellers, items, and drivers — matched instantly on a live logistics map."
            inView={inView}
          />
        </div>

        {/* Endpoint markers — snapped to OSRM route start/end */}
        {matches.map((m, mi) => {
          const sellerPos = snappedCoords[mi * 2] ? positions[mi * 2] : null;
          const buyerPos = snappedCoords[mi * 2 + 1] ? positions[mi * 2 + 1] : null;
          const isActive = activeMatch === mi;
          const isVisible = activeMatch >= mi;
          const hasRoute = !!osrmRoutes.get(m.id)?.length;

          return (
            <div key={m.id}>
              {hasRoute && sellerPos && (
                <motion.div
                  className="absolute z-10 pointer-events-none"
                  style={{ left: sellerPos.x, top: sellerPos.y }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: isActive ? 1 : 0.4, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="relative">
                    {/* Exact route endpoint anchor */}
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2"
                      style={{ borderColor: isActive ? m.color : `${m.color}45`, backgroundColor: isActive ? `${m.color}22` : `${m.color}10` }}
                    />
                    <div className="absolute -translate-x-1/2 -translate-y-full -mt-3 flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center border-2 backdrop-blur-sm transition-all duration-500"
                        style={{
                          borderColor: isActive ? m.color : `${m.color}30`,
                          backgroundColor: isActive ? `${m.color}18` : `${m.color}08`,
                        }}>
                    {m.item === "Laptop" ? (
                      <Laptop size={16} style={{ color: isActive ? m.color : `${m.color}60` }} />
                    ) : (
                      <Package size={16} style={{ color: isActive ? m.color : `${m.color}60` }} />
                    )}
                      </div>
                      <div className="mt-1.5 px-2.5 py-1 rounded-md border backdrop-blur-sm transition-all duration-500"
                        style={{
                          backgroundColor: 'hsl(var(--card) / 0.85)',
                          borderColor: isActive ? `${m.color}50` : 'hsl(var(--border) / 0.15)',
                        }}>
                        <span className="text-sm font-display font-bold" style={{ color: isActive ? m.color : 'hsl(var(--muted-foreground))' }}>
                          {m.item}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {hasRoute && buyerPos && (
                <motion.div
                  className="absolute z-10 pointer-events-none"
                  style={{ left: buyerPos.x, top: buyerPos.y }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: isActive ? 1 : 0.4, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="relative">
                    {/* Exact route endpoint anchor */}
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2"
                      style={{ borderColor: isActive ? m.color : `${m.color}45`, backgroundColor: isActive ? `${m.color}22` : `${m.color}10` }}
                    />
                    <div className="absolute -translate-x-1/2 -translate-y-full -mt-3 flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center border-2 backdrop-blur-sm transition-all duration-500"
                        style={{
                          borderColor: isActive ? m.color : `${m.color}30`,
                          backgroundColor: isActive ? `${m.color}18` : `${m.color}08`,
                        }}>
                        <User size={16} style={{ color: isActive ? m.color : `${m.color}60` }} />
                      </div>
                      <div className="mt-1.5 px-2.5 py-1 rounded-md border backdrop-blur-sm transition-all duration-500"
                        style={{
                          backgroundColor: 'hsl(var(--card) / 0.85)',
                          borderColor: isActive ? `${m.color}50` : 'hsl(var(--border) / 0.15)',
                        }}>
                        <span className="text-sm font-display font-bold" style={{ color: isActive ? m.color : 'hsl(var(--muted-foreground))' }}>
                          {m.buyer.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Vehicle icons — only for active/past routes with progress */}
        {matches.map((m, mi) => {
          const vPos = vehiclePositions[mi];
          if (!vehicleCoords[mi] || !vPos || activeMatch < mi || vehicleProgress[mi] <= 0) return null;
          const isActive = activeMatch === mi;
          const VehicleIcon = getVehicleIcon(m.vehicle);
          return (
            <motion.div
              key={`v-${m.id}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-[15] pointer-events-none"
              animate={{ left: vPos.x, top: vPos.y }}
              transition={{ duration: 0.15, ease: "linear" }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 backdrop-blur-sm shadow-lg transition-all duration-400"
                style={{
                  backgroundColor: isActive ? `${m.color}20` : `${m.color}08`,
                  borderColor: isActive ? m.color : `${m.color}30`,
                  color: m.color,
                }}>
                <VehicleIcon size={14} />
              </div>
            </motion.div>
          );
        })}

        {/* Bottom stats */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <div className="bg-gradient-to-t from-background via-background/80 to-transparent pt-16 pb-8 px-6">
            <motion.div
              className="flex items-center justify-center gap-6 md:gap-10"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {[
                { label: "Instant matching", value: "< 2s" },
                { label: "Coverage radius", value: "5 km" },
                { label: "Active routes", value: `${Math.max(0, activeMatch + 1)} / 3` },
                { label: "Vehicle types", value: "3" },
              ].map((t) => (
                <div key={t.label} className="text-center">
                  <p className="font-display text-xl md:text-2xl font-bold text-foreground">{t.value}</p>
                  <p className="text-base text-muted-foreground font-display mt-0.5 text-center">{t.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </FullScene>
  );
};

export default MapScene;
