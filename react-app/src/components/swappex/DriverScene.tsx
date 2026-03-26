import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import maplibregl from "maplibre-gl";
import { Navigation, MapPin, Package } from "lucide-react";
import FullScene from "./FullScene";
import InteractiveMap from "./InteractiveMap";
import SectionHeader from "./SectionHeader";
import useMapRoutes from "./useMapRoutes";
import { useOSRMRoutes } from "./useOSRMRoute";

// Address-anchored waypoints (verified via OpenStreetMap Nominatim), spread wider:
// North Holon -> Ramat Gan -> West Petah Tikva corridor.
// Note: coordinates are [lng, lat].
const workCoord: [number, number] = [34.7881907, 32.0179287]; // Sderot Jerusalem, North Holon
const pickup1: [number, number] = [34.801019, 32.058955]; // La Guardia 76, Tel Aviv
const dropoff1: [number, number] = [34.8093083, 32.0806306]; // HaHashmonaim 32 area, Ramat Gan
const pickup2: [number, number] = [34.8284, 32.0864]; // spread from dropoff1 for clearer phase separation
const dropoff2: [number, number] = [34.8792221, 32.0900899]; // Zeev Jabotinsky 90, Petah Tikva
const homeCoord: [number, number] = [34.8694671, 32.0938520]; // HaRav Moshe Malka, West Petah Tikva

const MOVEMENT_START_DELAY_MS = 1400;
const FULL_ROUTE_DURATION_MS = 15000;

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

const DriverScene = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const [driverProgress, setDriverProgress] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [showEarningPop, setShowEarningPop] = useState<{ amount: number } | null>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const dropoff1PaidRef = useRef(false);
  const dropoff2PaidRef = useRef(false);

  // Smooth continuous progress so marker and status stay synchronized.
  useEffect(() => {
    if (!inView) {
      setDriverProgress(0);
      setEarnings(0);
      setShowEarningPop(null);
      dropoff1PaidRef.current = false;
      dropoff2PaidRef.current = false;
      return;
    }

    const startAt = performance.now() + MOVEMENT_START_DELAY_MS;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startAt);
      const next = Math.min(elapsed / FULL_ROUTE_DURATION_MS, 1);
      setDriverProgress(next);
      if (next < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  // OSRM routes fetched per leg, then stitched to keep waypoint transitions stable.
  const osrmWaypointSets = useMemo(() => [
    { id: "leg-0", waypoints: [workCoord, pickup1] },
    { id: "leg-1", waypoints: [pickup1, dropoff1] },
    { id: "leg-2", waypoints: [dropoff1, pickup2] },
    { id: "leg-3", waypoints: [pickup2, dropoff2] },
    { id: "leg-4", waypoints: [dropoff2, homeCoord] },
  ], []);

  const osrmRoutes = useOSRMRoutes(osrmWaypointSets, inView);
  const legRouteById = useMemo(
    () => [0, 1, 2, 3, 4].map((i) => osrmRoutes.get(`leg-${i}`) ?? null),
    [osrmRoutes]
  );
  const allLegsLoaded = legRouteById.every((r) => r && r.length > 1);
  const legRoutes = useMemo(
    () => (allLegsLoaded ? (legRouteById as [number, number][][]) : []),
    [allLegsLoaded, legRouteById]
  );

  const stitched = useMemo(() => {
    if (legRoutes.length === 0) return null;
    const points: [number, number][] = [];
    const stopIdx = [0];
    legRoutes.forEach((leg, i) => {
      if (i === 0) points.push(...leg);
      else points.push(...leg.slice(1));
      stopIdx.push(points.length - 1);
    });
    return { points, stopIdx };
  }, [legRoutes]);

  const fullRoute = stitched?.points ?? null;
  const snappedStops = useMemo(() => {
    if (!stitched || stitched.points.length < 2) {
      return [workCoord, pickup1, dropoff1, pickup2, dropoff2, homeCoord].map(([lng, lat]) => ({ lng, lat }));
    }
    return stitched.stopIdx.map((idx) => ({
      lng: stitched.points[idx][0],
      lat: stitched.points[idx][1],
    }));
  }, [stitched]);

  const milestoneProgress = useMemo(() => {
    if (!stitched || stitched.points.length < 2) {
      return { pickup1: 0.2, dropoff1: 0.4, pickup2: 0.6, dropoff2: 0.8, home: 1 };
    }
    const denom = Math.max(stitched.points.length - 1, 1);
    return {
      pickup1: stitched.stopIdx[1] / denom,
      dropoff1: stitched.stopIdx[2] / denom,
      pickup2: stitched.stopIdx[3] / denom,
      dropoff2: stitched.stopIdx[4] / denom,
      home: 1,
    };
  }, [stitched]);

  const reachedPickup1 = allLegsLoaded && driverProgress >= milestoneProgress.pickup1;
  const reachedDropoff1 = driverProgress >= milestoneProgress.dropoff1;
  const reachedPickup2 = driverProgress >= milestoneProgress.pickup2;
  const reachedDropoff2 = driverProgress >= milestoneProgress.dropoff2;
  const reachedHome = driverProgress >= milestoneProgress.home;

  useEffect(() => {
    if (reachedDropoff1 && !dropoff1PaidRef.current) {
      dropoff1PaidRef.current = true;
      setEarnings(65);
      setShowEarningPop({ amount: 65 });
      const timer = setTimeout(() => setShowEarningPop(null), 1800);
      return () => clearTimeout(timer);
    }
  }, [reachedDropoff1]);

  useEffect(() => {
    if (reachedDropoff2 && !dropoff2PaidRef.current) {
      dropoff2PaidRef.current = true;
      setEarnings(110);
      setShowEarningPop({ amount: 45 });
      const timer = setTimeout(() => setShowEarningPop(null), 1800);
      return () => clearTimeout(timer);
    }
  }, [reachedDropoff2]);

  // Route layers
  const routes = useMemo(() => {
    const result: { id: string; coordinates: [number, number][]; color?: string; width?: number; dasharray?: number[]; opacity?: number; visible?: boolean }[] = [];

    if (allLegsLoaded && fullRoute) {
      const traveledIdx = Math.max(1, Math.floor(driverProgress * (fullRoute.length - 1)));
      result.push({
        id: "remaining-route",
        coordinates: fullRoute,
        color: "#2dd4bf",
        width: 3,
        dasharray: [4, 3],
        opacity: 0.1,
        visible: true,
      });
      if (traveledIdx > 0) {
        result.push({
          id: "traveled-route",
          coordinates: fullRoute.slice(0, traveledIdx + 1),
          color: "#2dd4bf",
          width: 4,
          opacity: 0.8,
          visible: true,
        });
      }
    }
    return result;
  }, [driverProgress, fullRoute, allLegsLoaded]);

  useMapRoutes(map, routes);

  // Driver position on route
  const getRoutePoint = useCallback((route: [number, number][] | undefined, progress: number) => {
    if (!route || route.length === 0) return { lng: workCoord[0], lat: workCoord[1] };
    const idx = Math.min(Math.floor(progress * (route.length - 1)), route.length - 1);
    return { lng: route[idx][0], lat: route[idx][1] };
  }, []);

  const driverCoord = useMemo(
    () => getRoutePoint(allLegsLoaded ? (fullRoute ?? undefined) : undefined, driverProgress),
    [driverProgress, fullRoute, getRoutePoint, allLegsLoaded]
  );
  const driverScreenPos = useMapPositions(map, [driverCoord]);
  const vehiclePos = driverScreenPos[0];

  // Marker positions — snapped to stitched route endpoints in order.
  const markerCoords = useMemo(() => {
    if (!allLegsLoaded || snappedStops.length < 6) {
      return [
        { lng: workCoord[0], lat: workCoord[1] },
        { lng: homeCoord[0], lat: homeCoord[1] },
        { lng: pickup1[0], lat: pickup1[1] },
        { lng: dropoff1[0], lat: dropoff1[1] },
        { lng: pickup2[0], lat: pickup2[1] },
        { lng: dropoff2[0], lat: dropoff2[1] },
      ];
    }
    return [
      snappedStops[0],
      snappedStops[5],
      snappedStops[1],
      snappedStops[2],
      snappedStops[3],
      snappedStops[4],
    ];
  }, [snappedStops, allLegsLoaded]);

  const markerPositions = useMapPositions(map, markerCoords);

  useEffect(() => {
    if (!inView || !map || !allLegsLoaded || !fullRoute || fullRoute.length < 2) return;
    const bounds = new maplibregl.LngLatBounds();
    fullRoute.forEach(([lng, lat]) => bounds.extend([lng, lat]));
    map.fitBounds(bounds, {
      padding: { top: 280, right: 110, bottom: 130, left: 110 },
      maxZoom: 12.7,
      duration: 900,
      linear: true,
    });
  }, [map, allLegsLoaded, fullRoute, inView]);

  // Phase-to-event mapping: which events are visible / completed
  const shouldShowBefore = (milestone: number) => driverProgress >= Math.max(0, milestone - 0.1);
  const renderMarker = (posIdx: number, label: string, icon: React.ReactNode, color: string, show: boolean, completed?: boolean) => {
    const pos = markerPositions[posIdx];
    if (!pos || !show) return null;
    const placeLabelBelow = pos.y < 230;
    return (
      <motion.div
        key={`marker-${posIdx}-${label}`}
        className="absolute z-10 pointer-events-none"
        style={{ left: pos.x, top: pos.y }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: completed ? 0.3 : 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="relative">
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2"
            style={{ backgroundColor: `${color}12`, borderColor: `${color}50` }}
          />
          <div className={`absolute -translate-x-1/2 flex flex-col items-center ${placeLabelBelow ? "translate-y-3" : "-translate-y-full -mt-3"}`}>
            <div
              className="px-3 py-1.5 rounded-lg border backdrop-blur-sm bg-card/85 shadow-md mb-1"
              style={{ borderColor: `${color}40` }}
            >
              <div className="flex items-center gap-1.5">
                {icon}
                <span className="text-sm font-display font-bold" style={{ color }}>
                  {completed ? "Done" : label}
                </span>
              </div>
            </div>
            <div className="w-px h-3" style={{ backgroundColor: `${color}40` }} />
          </div>
        </div>
      </motion.div>
    );
  };

  const deliveryCount = reachedDropoff2 ? 2 : reachedDropoff1 ? 1 : 0;
  const driverStatus = reachedHome
    ? "Completed"
    : reachedDropoff2
      ? "Heading home"
      : reachedPickup2
        ? "Delivering order 2"
        : reachedDropoff1
          ? "En route to Pickup 2"
          : reachedPickup1
            ? "Delivering order 1"
            : driverProgress > 0
              ? "En route to Pickup 1"
              : "Starting soon";

  return (
    <FullScene>
      <div ref={ref} className="absolute inset-0">
        <InteractiveMap
          center={[34.83, 32.065]}
          zoom={12.7}
          onMapReady={setMap}
        />

        {/* Top gradient mask */}
        <div className="absolute inset-x-0 top-0 h-64 md:h-72 z-[15] pointer-events-none bg-gradient-to-b from-background via-background/95 to-transparent" />

        {/* Header */}
        <div className="absolute top-6 md:top-10 left-0 right-0 z-20">
          <SectionHeader
            eyebrow="For Drivers"
            headline={<>Earn while you're{" "}<span className="gradient-text">already moving</span></>}
            description="Smart detours that fit your route — earn extra without going out of your way."
            inView={inView}
          />
        </div>

        {/* Work marker */}
        {renderMarker(0, "Work", <MapPin size={13} className="text-primary" />, "#2dd4bf", inView && allLegsLoaded)}
        {/* Home marker */}
        {renderMarker(1, "Home", <MapPin size={13} className="text-primary" />, "#2dd4bf", inView && allLegsLoaded)}

        {/* Pickup / dropoff markers follow route progress thresholds */}
        {renderMarker(2, "Pickup 1", <Package size={13} style={{ color: '#2dd4bf' }} />, "#2dd4bf", allLegsLoaded && shouldShowBefore(milestoneProgress.pickup1), reachedPickup1)}
        {renderMarker(3, "Dropoff 1", <MapPin size={13} style={{ color: '#f59e0b' }} />, "#f59e0b", allLegsLoaded && shouldShowBefore(milestoneProgress.dropoff1), reachedDropoff1)}
        {renderMarker(4, "Pickup 2", <Package size={13} style={{ color: '#2dd4bf' }} />, "#2dd4bf", allLegsLoaded && shouldShowBefore(milestoneProgress.pickup2), reachedPickup2)}
        {renderMarker(5, "Dropoff 2", <MapPin size={13} style={{ color: '#a78bfa' }} />, "#a78bfa", allLegsLoaded && shouldShowBefore(milestoneProgress.dropoff2), reachedDropoff2)}

        {/* Driver vehicle — stable, smooth movement */}
        {vehiclePos && (
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            animate={{ left: vehiclePos.x, top: vehiclePos.y }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            <div className="w-11 h-11 rounded-full bg-card/90 border-2 border-primary/40 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Navigation size={16} className="text-primary" />
            </div>
          </motion.div>
        )}

        {/* Earnings pop — appears at event positions */}
        {showEarningPop && vehiclePos && (
          <motion.div
            className="absolute z-30 pointer-events-none -translate-x-1/2"
            style={{ left: vehiclePos.x, top: vehiclePos.y - 50 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [10, -5, -15, -35] }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="px-4 py-2 rounded-xl bg-primary/15 border border-primary/30 backdrop-blur-md shadow-xl">
              <span className="text-base font-display font-bold text-primary">+₪{showEarningPop.amount}</span>
            </div>
          </motion.div>
        )}

        {/* Bottom stats — no blinking, stable values */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-8 md:gap-12 px-7 py-4 rounded-xl border border-border/20 bg-card/70 backdrop-blur-md shadow-lg">
            <div className="text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-primary">
                {earnings > 0 ? `₪${earnings}` : "—"}
              </p>
              <p className="text-base text-muted-foreground font-display mt-1 text-center">Earnings</p>
            </div>
            <div className="w-px h-10 bg-border/20" />
            <div className="text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {deliveryCount} / 2
              </p>
              <p className="text-base text-muted-foreground font-display mt-1 text-center">Deliveries</p>
            </div>
            <div className="w-px h-10 bg-border/20" />
            <div className="text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {driverStatus}
              </p>
              <p className="text-base text-muted-foreground font-display mt-1 text-center">Status</p>
            </div>
          </div>
        </motion.div>
      </div>
    </FullScene>
  );
};

export default DriverScene;
