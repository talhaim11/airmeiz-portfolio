import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

interface RouteConfig {
  id: string;
  coordinates: [number, number][]; // [lng, lat] pairs — multi-point path following streets
  color?: string;
  width?: number;
  dasharray?: number[];
  opacity?: number;
  visible?: boolean;
}

/**
 * Adds GeoJSON line layers directly on the MapLibre map.
 * Routes are rendered as map layers (not SVG overlays), so they follow
 * the map projection and sit properly on roads.
 */
const useMapRoutes = (map: maplibregl.Map | null, routes: RouteConfig[]) => {
  const addedLayersRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!map) return;

    // Wait for map style to be loaded
    const addRoutes = () => {
      const nextRouteIds = new Set(routes.map((r) => r.id));

      // Remove stale layers/sources that are no longer in the next render set.
      addedLayersRef.current.forEach((existingId) => {
        if (nextRouteIds.has(existingId)) return;
        const sourceId = `route-source-${existingId}`;
        const glowLayerId = `route-glow-${existingId}`;
        const lineLayerId = `route-line-${existingId}`;
        try {
          if (map.getLayer(lineLayerId)) map.removeLayer(lineLayerId);
          if (map.getLayer(glowLayerId)) map.removeLayer(glowLayerId);
          if (map.getSource(sourceId)) map.removeSource(sourceId);
        } catch {
          // Map might be in teardown.
        }
        addedLayersRef.current.delete(existingId);
      });

      routes.forEach((route) => {
        const sourceId = `route-source-${route.id}`;
        const glowLayerId = `route-glow-${route.id}`;
        const lineLayerId = `route-line-${route.id}`;

        const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route.coordinates,
          },
        };

        const source = map.getSource(sourceId) as maplibregl.GeoJSONSource | undefined;

        if (source) {
          // Update existing source data
          source.setData(geojson);
        } else {
          // Add new source
          map.addSource(sourceId, {
            type: "geojson",
            data: geojson,
          });

          // Glow layer (wider, blurred effect)
          map.addLayer({
            id: glowLayerId,
            type: "line",
            source: sourceId,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": route.color || "#2dd4bf",
              "line-width": (route.width || 3) + 6,
              "line-opacity": (route.opacity || 0.7) * 0.15,
              "line-blur": 8,
            },
          });

          // Main line layer
          map.addLayer({
            id: lineLayerId,
            type: "line",
            source: sourceId,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": route.color || "#2dd4bf",
              "line-width": route.width || 3,
              "line-opacity": route.opacity ?? 0.7,
              ...(route.dasharray ? { "line-dasharray": route.dasharray } : {}),
            },
          });

          addedLayersRef.current.add(route.id);
        }

        // Update visibility
        const visibility = route.visible === false ? "none" : "visible";
        if (map.getLayer(glowLayerId)) {
          map.setLayoutProperty(glowLayerId, "visibility", visibility);
          map.setLayoutProperty(lineLayerId, "visibility", visibility);
        }

        // Update opacity
        if (map.getLayer(glowLayerId)) {
          map.setPaintProperty(glowLayerId, "line-opacity", (route.opacity || 0.7) * 0.15);
          map.setPaintProperty(lineLayerId, "line-opacity", route.opacity ?? 0.7);
        }
      });
    };

    if (map.isStyleLoaded()) {
      addRoutes();
    } else {
      map.on("load", addRoutes);
    }

    return () => {
      map.off("load", addRoutes);
    };
  }, [map, routes]);

  // Full cleanup only when map instance is destroyed/unmounted.
  useEffect(() => {
    if (!map) return;
    return () => {
      addedLayersRef.current.forEach((id) => {
        const sourceId = `route-source-${id}`;
        const glowLayerId = `route-glow-${id}`;
        const lineLayerId = `route-line-${id}`;
        try {
          if (map.getLayer(lineLayerId)) map.removeLayer(lineLayerId);
          if (map.getLayer(glowLayerId)) map.removeLayer(glowLayerId);
          if (map.getSource(sourceId)) map.removeSource(sourceId);
        } catch {
          // Map might already be destroyed.
        }
      });
      addedLayersRef.current.clear();
    };
  }, [map]);
};

export default useMapRoutes;
