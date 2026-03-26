/**
 * Production-quality dark city map with hierarchical road network,
 * curved bezier roads, building footprints, and urban geometry.
 */

interface RealisticMapProps {
  className?: string;
  opacity?: number;
  children?: React.ReactNode;
}

const RealisticMap = ({ className = "", opacity = 1, children }: RealisticMapProps) => {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="1200" height="800" fill="hsl(220 20% 5%)" />

        {/* === MAIN ARTERIAL ROADS === */}
        {/* East-West boulevard */}
        <path d="M 0 300 C 150 290, 300 315, 450 305 C 600 295, 750 320, 900 310 C 1000 305, 1100 315, 1200 308"
          fill="none" stroke="hsl(220 14% 18%)" strokeWidth="32" strokeLinecap="round" />
        <path d="M 0 300 C 150 290, 300 315, 450 305 C 600 295, 750 320, 900 310 C 1000 305, 1100 315, 1200 308"
          fill="none" stroke="hsl(45 50% 45%)" strokeWidth="0.8" strokeDasharray="22 28" opacity="0.12" />

        {/* North-South avenue */}
        <path d="M 460 0 C 470 120, 455 250, 465 380 C 475 480, 458 620, 468 800"
          fill="none" stroke="hsl(220 14% 18%)" strokeWidth="30" strokeLinecap="round" />
        <path d="M 460 0 C 470 120, 455 250, 465 380 C 475 480, 458 620, 468 800"
          fill="none" stroke="hsl(45 50% 45%)" strokeWidth="0.8" strokeDasharray="22 28" opacity="0.12" />

        {/* Second horizontal arterial */}
        <path d="M 0 560 C 200 552, 400 568, 600 555 C 800 545, 1000 562, 1200 556"
          fill="none" stroke="hsl(220 14% 17%)" strokeWidth="26" strokeLinecap="round" />

        {/* Second vertical arterial */}
        <path d="M 820 0 C 815 180, 825 360, 818 540 C 812 660, 822 740, 818 800"
          fill="none" stroke="hsl(220 14% 17%)" strokeWidth="24" strokeLinecap="round" />

        {/* === SECONDARY ROADS === */}
        <path d="M 0 150 C 250 145, 500 158, 750 150 C 950 143, 1100 155, 1200 150"
          fill="none" stroke="hsl(220 14% 14%)" strokeWidth="14" strokeLinecap="round" />
        <path d="M 0 680 C 300 674, 600 688, 900 678 C 1050 672, 1150 682, 1200 680"
          fill="none" stroke="hsl(220 14% 14%)" strokeWidth="14" strokeLinecap="round" />
        <path d="M 180 0 C 185 200, 175 400, 182 600 C 188 700, 178 760, 182 800"
          fill="none" stroke="hsl(220 14% 14%)" strokeWidth="14" strokeLinecap="round" />
        <path d="M 650 0 C 648 180, 655 360, 650 540 C 646 660, 652 740, 650 800"
          fill="none" stroke="hsl(220 14% 14%)" strokeWidth="14" strokeLinecap="round" />
        <path d="M 1060 0 C 1055 200, 1065 400, 1058 600 C 1052 700, 1062 760, 1058 800"
          fill="none" stroke="hsl(220 14% 14%)" strokeWidth="12" strokeLinecap="round" />

        {/* === MINOR STREETS === */}
        <path d="M 0 225 C 150 222, 340 228, 455 225" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" strokeLinecap="round" />
        <path d="M 475 225 L 810 222" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 830 225 L 1200 228" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 0 430 C 180 428, 350 434, 455 430" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 475 430 L 815 428" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 830 430 L 1200 432" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 0 620 C 200 618, 350 624, 460 620" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 475 620 L 645 618" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 660 620 L 815 622" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 830 620 L 1055 618" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 310 0 C 308 120, 315 200, 310 295" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 310 315 C 312 400, 308 480, 312 555" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 560 0 C 558 100, 564 200, 560 295" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 560 315 C 562 400, 558 480, 560 555" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 940 150 L 940 295" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 940 315 L 940 555" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 100 150 L 100 295" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />
        <path d="M 100 315 L 100 555" fill="none" stroke="hsl(220 14% 12%)" strokeWidth="6" />

        {/* === BUILDING FOOTPRINTS === */}
        {/* Top-left quadrant */}
        <rect x="22" y="28" width="68" height="48" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="22" y="86" width="68" height="52" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="112" y="28" width="58" height="42" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="112" y="80" width="58" height="58" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />

        {/* Top-center */}
        <rect x="195" y="28" width="50" height="50" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="255" y="28" width="44" height="46" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="195" y="88" width="100" height="48" rx="2" fill="hsl(220 18% 9%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />

        <rect x="322" y="28" width="48" height="44" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="380" y="28" width="65" height="48" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="322" y="82" width="120" height="55" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />

        {/* Top-right */}
        <rect x="480" y="28" width="68" height="50" rx="3" fill="hsl(220 18% 9%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="558" y="28" width="80" height="48" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="480" y="88" width="160" height="48" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />

        <rect x="662" y="28" width="60" height="46" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="732" y="28" width="76" height="50" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="662" y="86" width="146" height="50" rx="2" fill="hsl(220 18% 9%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />

        <rect x="832" y="28" width="96" height="48" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="832" y="86" width="96" height="50" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="952" y="28" width="95" height="46" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="952" y="84" width="95" height="52" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="1072" y="28" width="105" height="108" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />

        {/* Middle row 1 (between secondary and main roads) */}
        <rect x="22" y="165" width="68" height="52" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="112" y="165" width="58" height="48" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="195" y="165" width="100" height="50" rx="2" fill="hsl(220 18% 9%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="322" y="165" width="120" height="48" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="480" y="165" width="70" height="52" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="570" y="165" width="68" height="48" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="662" y="165" width="146" height="50" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="832" y="165" width="96" height="48" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="952" y="165" width="95" height="52" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="1072" y="165" width="105" height="48" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />

        {/* Middle row 2 (between main roads) */}
        <rect x="22" y="330" width="68" height="82" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="112" y="330" width="58" height="78" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="195" y="330" width="50" height="82" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="255" y="330" width="44" height="78" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="322" y="330" width="48" height="82" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="380" y="330" width="65" height="78" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="480" y="330" width="68" height="82" rx="3" fill="hsl(220 18% 9%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="558" y="330" width="80" height="78" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="662" y="330" width="60" height="82" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="732" y="330" width="76" height="78" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="832" y="330" width="96" height="82" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="952" y="330" width="95" height="78" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="1072" y="330" width="105" height="82" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />

        {/* Bottom blocks */}
        <rect x="22" y="575" width="68" height="88" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="112" y="575" width="58" height="84" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="195" y="575" width="100" height="88" rx="2" fill="hsl(220 18% 9%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="322" y="575" width="120" height="84" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="480" y="575" width="68" height="88" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="558" y="575" width="80" height="84" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="662" y="575" width="146" height="88" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="832" y="575" width="96" height="84" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="952" y="575" width="95" height="88" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="1072" y="575" width="105" height="84" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />

        {/* Far bottom */}
        <rect x="22" y="695" width="68" height="80" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="112" y="695" width="58" height="76" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="195" y="695" width="100" height="80" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="322" y="695" width="120" height="76" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="480" y="695" width="160" height="80" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="662" y="695" width="146" height="76" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />
        <rect x="832" y="695" width="96" height="80" rx="2" fill="hsl(220 18% 8%)" stroke="hsl(220 14% 13%)" strokeWidth="0.6" />
        <rect x="952" y="695" width="220" height="76" rx="2" fill="hsl(220 18% 7%)" stroke="hsl(220 14% 12%)" strokeWidth="0.5" />

        {/* === INTERSECTION DOTS === */}
        {[
          [180, 150], [180, 300], [180, 560], [180, 680],
          [310, 150], [310, 300], [310, 560],
          [460, 150], [460, 300], [460, 560], [460, 680],
          [560, 150], [560, 300], [560, 560],
          [650, 150], [650, 300], [650, 560], [650, 680],
          [820, 150], [820, 300], [820, 560], [820, 680],
          [940, 150], [940, 300], [940, 560],
          [1060, 150], [1060, 300], [1060, 560],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="hsl(220 14% 20%)" opacity="0.5" />
        ))}
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, hsl(220 20% 4% / 0.65) 100%)" }} />

      {children}
    </div>
  );
};

export default RealisticMap;
