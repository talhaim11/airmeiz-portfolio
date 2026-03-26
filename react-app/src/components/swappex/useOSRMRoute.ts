import { useEffect, useState } from "react";

/**
 * Fetches a real street-snapping route from the free OSRM demo server.
 * Returns an array of [lng, lat] coordinates that follow actual roads.
 */
const useOSRMRoute = (
  waypoints: [number, number][] | null, // [lng, lat] pairs
  enabled = true
): [number, number][] | null => {
  const [geometry, setGeometry] = useState<[number, number][] | null>(null);

  useEffect(() => {
    if (!enabled || !waypoints || waypoints.length < 2) {
      setGeometry(null);
      return;
    }

    const coordStr = waypoints.map((w) => `${w[0]},${w[1]}`).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson&alternatives=false&continue_straight=true&steps=false`;

    let cancelled = false;
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("OSRM request failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data.routes?.[0]?.geometry?.coordinates) {
          setGeometry(data.routes[0].geometry.coordinates as [number, number][]);
        }
      })
      .catch(() => {
        // Fallback: use the raw waypoints as-is
        if (!cancelled) setGeometry(waypoints);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [waypoints, enabled]);

  return geometry;
};

/**
 * Batch-fetch multiple OSRM routes at once.
 * Returns an array of route geometries (or null if not yet loaded).
 */
export const useOSRMRoutes = (
  waypointSets: { id: string; waypoints: [number, number][] }[],
  enabled = true
): Map<string, [number, number][]> => {
  const [routes, setRoutes] = useState<Map<string, [number, number][]>>(new Map());

  useEffect(() => {
    if (!enabled || waypointSets.length === 0) return;

    let cancelled = false;

    const fetchAll = async () => {
      const results = new Map<string, [number, number][]>();

      await Promise.all(
        waypointSets.map(async ({ id, waypoints }) => {
          if (waypoints.length < 2) return;
          const coordStr = waypoints.map((w) => `${w[0]},${w[1]}`).join(";");
          const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson&alternatives=false&continue_straight=true&steps=false`;

          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("OSRM request failed");
            const data = await res.json();
            if (data.routes?.[0]?.geometry?.coordinates) {
              results.set(id, data.routes[0].geometry.coordinates as [number, number][]);
            } else {
              results.set(id, waypoints);
            }
          } catch {
            results.set(id, waypoints);
          }
        })
      );

      if (!cancelled) setRoutes(results);
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
    // Serialize waypointSets for dependency check
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(waypointSets), enabled]);

  return routes;
};

export default useOSRMRoute;
