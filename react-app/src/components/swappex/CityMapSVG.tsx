/**
 * Reusable dark city map background — realistic roads, blocks, intersections.
 * Used across Problem, Map, Engine, and Driver scenes.
 */

interface CityMapSVGProps {
  className?: string;
  opacity?: number;
  variant?: "default" | "dense" | "sparse";
}

const CityMapSVG = ({ className = "", opacity = 1, variant = "default" }: CityMapSVGProps) => {
  const isDense = variant === "dense";
  const isSparse = variant === "sparse";

  // Building blocks
  const blocks = isDense
    ? [
        { x: 3, y: 12, w: 10, h: 14 }, { x: 16, y: 12, w: 12, h: 14 }, { x: 31, y: 12, w: 14, h: 12 },
        { x: 48, y: 12, w: 10, h: 14 }, { x: 61, y: 12, w: 13, h: 12 }, { x: 77, y: 12, w: 14, h: 14 },
        { x: 3, y: 32, w: 10, h: 12 }, { x: 16, y: 32, w: 12, h: 12 }, { x: 31, y: 30, w: 14, h: 14 },
        { x: 48, y: 32, w: 10, h: 12 }, { x: 61, y: 30, w: 13, h: 14 }, { x: 77, y: 32, w: 14, h: 12 },
        { x: 3, y: 52, w: 10, h: 14 }, { x: 16, y: 52, w: 12, h: 14 }, { x: 31, y: 50, w: 14, h: 16 },
        { x: 48, y: 52, w: 10, h: 14 }, { x: 61, y: 50, w: 13, h: 16 }, { x: 77, y: 52, w: 14, h: 14 },
        { x: 3, y: 72, w: 10, h: 12 }, { x: 16, y: 72, w: 12, h: 12 }, { x: 31, y: 72, w: 14, h: 12 },
        { x: 48, y: 72, w: 10, h: 12 }, { x: 61, y: 72, w: 13, h: 12 }, { x: 77, y: 72, w: 14, h: 12 },
      ]
    : isSparse
    ? [
        { x: 5, y: 18, w: 14, h: 18 }, { x: 24, y: 18, w: 18, h: 16 },
        { x: 58, y: 18, w: 16, h: 18 }, { x: 80, y: 18, w: 14, h: 16 },
        { x: 5, y: 52, w: 14, h: 16 }, { x: 24, y: 54, w: 18, h: 14 },
        { x: 58, y: 52, w: 16, h: 16 }, { x: 80, y: 54, w: 14, h: 14 },
      ]
    : [
        { x: 3, y: 15, w: 12, h: 16 }, { x: 18, y: 15, w: 14, h: 14 }, { x: 36, y: 15, w: 12, h: 16 },
        { x: 52, y: 15, w: 16, h: 14 }, { x: 72, y: 15, w: 14, h: 16 },
        { x: 3, y: 42, w: 12, h: 14 }, { x: 18, y: 42, w: 14, h: 14 }, { x: 36, y: 44, w: 12, h: 12 },
        { x: 52, y: 42, w: 16, h: 14 }, { x: 72, y: 44, w: 14, h: 12 },
        { x: 3, y: 66, w: 12, h: 14 }, { x: 18, y: 68, w: 14, h: 12 }, { x: 36, y: 66, w: 12, h: 14 },
        { x: 52, y: 68, w: 16, h: 12 }, { x: 72, y: 66, w: 14, h: 14 },
      ];

  const hRoads = isDense ? [10, 28, 48, 68, 86] : isSparse ? [15, 48, 82] : [12, 38, 62, 84];
  const vRoads = isDense ? [14, 29, 46, 59, 75, 93] : isSparse ? [22, 54, 78] : [16, 34, 50, 70, 88];

  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {/* Horizontal roads */}
        {hRoads.map((y) => (
          <g key={`h-${y}`}>
            <rect x="0" y={`${y - 1}%`} width="100%" height="2%" fill="hsl(var(--muted) / 0.18)" />
            <line x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`}
              stroke="hsl(var(--primary) / 0.07)" strokeWidth="1" strokeDasharray="14 10" />
          </g>
        ))}
        {/* Vertical roads */}
        {vRoads.map((x) => (
          <g key={`v-${x}`}>
            <rect x={`${x - 0.7}%`} y="0" width="1.4%" height="100%" fill="hsl(var(--muted) / 0.14)" />
            <line x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%"
              stroke="hsl(var(--primary) / 0.06)" strokeWidth="1" strokeDasharray="10 12" />
          </g>
        ))}
        {/* Intersection dots */}
        {hRoads.flatMap((y) =>
          vRoads.map((x) => (
            <circle key={`int-${x}-${y}`} cx={`${x}%`} cy={`${y}%`} r="2" fill="hsl(var(--primary) / 0.12)" />
          ))
        )}
      </svg>
      {/* Building blocks */}
      {blocks.map((b, i) => (
        <div
          key={`blk-${i}`}
          className="absolute rounded-sm bg-card/30 border border-border/10"
          style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
        />
      ))}
    </div>
  );
};

export default CityMapSVG;
