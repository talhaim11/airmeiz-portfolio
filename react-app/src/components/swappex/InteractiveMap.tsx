import { useRef, useEffect, useState, ReactNode } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface InteractiveMapProps {
  className?: string;
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  pitch?: number;
  bearing?: number;
  interactive?: boolean;
  children?: ReactNode;
  onMapReady?: (map: maplibregl.Map) => void;
}

/**
 * Real interactive map using MapLibre GL JS with CartoDB dark basemap.
 * No API key required.
 */
const InteractiveMap = ({
  className = "",
  center = [34.78, 32.08], // Tel Aviv
  zoom = 13,
  pitch = 0,
  bearing = 0,
  interactive = false,
  children,
  onMapReady,
}: InteractiveMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          "carto-dark": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          },
        },
        layers: [
          {
            id: "carto-dark-layer",
            type: "raster",
            source: "carto-dark",
            minzoom: 0,
            maxzoom: 20,
          },
        ],
      },
      center,
      zoom,
      pitch,
      bearing,
      interactive,
      attributionControl: false,
      fadeDuration: 0,
    });

    map.on("load", () => {
      setReady(true);
      onMapReady?.(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <div ref={containerRef} className="absolute inset-0" />
      {/* Teal tint overlay to match brand */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 20% 4% / 0.3) 0%, transparent 30%, transparent 70%, hsl(220 20% 4% / 0.5) 100%)",
        }}
      />
      {ready && children}
    </div>
  );
};

export default InteractiveMap;
