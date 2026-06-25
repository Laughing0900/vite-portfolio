import Title from "@/components/home/talent/cards/Title";
import {
  animate,
  m,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { memo, useEffect, useRef, useState } from "react";

// Maze geometry. The viewBox hugs a 320x220 board inset by 10px so the
// border strokes don't clip. Start sits on the left edge, "solved" on the right.
const W = 340;
const H = 240;

const WALL = "oklch(52% 0.025 264)"; // faint slate, the maze structure
const SOLVED = "oklch(80% 0.16 70)"; // warm amber, the solution path

// The outer frame plus a scatter of inner walls — purely decorative, tuned to
// read as a half-grid the orange path threads through.
const WALLS: [number, number, number, number][] = [
  // frame
  [10, 10, 330, 10],
  [330, 10, 330, 230],
  [330, 230, 10, 230],
  [10, 230, 10, 10],
  // verticals
  [70, 10, 70, 90],
  [70, 150, 70, 230],
  [110, 55, 110, 165],
  [150, 10, 150, 75],
  [190, 80, 190, 175],
  [230, 40, 230, 120],
  [230, 170, 230, 230],
  [270, 10, 270, 95],
  [292, 120, 292, 200],
  // horizontals
  [10, 90, 120, 90],
  [110, 165, 205, 165],
  [150, 120, 232, 120],
  [190, 200, 292, 200],
  [230, 50, 330, 50],
  [50, 190, 150, 190],
];

// The winning route as a Manhattan polyline from start -> solved. Each pair is
// a corner; getPointAtLength walks it for the traveling explorer dot.
const ROUTE: [number, number][] = [
  [10, 60],
  [55, 60],
  [55, 135],
  [95, 135],
  [95, 60],
  [140, 60],
  [140, 105],
  [180, 105],
  [180, 150],
  [150, 150],
  [150, 195],
  [225, 195],
  [225, 90],
  [265, 90],
  [265, 140],
  [330, 140],
];

const ROUTE_D = ROUTE.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
const START = ROUTE[0];
const END = ROUTE[ROUTE.length - 1];

// Solve duration; the keyframe pauses below read as the path "hitting a wall"
// before finding the way around it.
const SOLVE_DURATION = 2.6;

const ProblemSolving = memo(() => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lengthRef = useRef(0);
  const controls = useRef<ReturnType<typeof animate> | null>(null);

  const inView = useInView(wrapRef, { once: true, amount: 0.4 });
  const [len, setLen] = useState(0);

  // progress (0->1) drives both the dash reveal and the explorer dot.
  const progress = useMotionValue(0);
  const dash = useMotionValue(0);
  const dotX = useMotionValue(START[0]);
  const dotY = useMotionValue(START[1]);

  useMotionValueEvent(progress, "change", (v) => {
    const L = lengthRef.current;
    const path = pathRef.current;
    if (!L || !path) return;
    dash.set(L * (1 - v));
    const pt = path.getPointAtLength(L * v);
    dotX.set(pt.x);
    dotY.set(pt.y);
  });

  const solve = () => {
    const L = lengthRef.current;
    if (!L) return;
    controls.current?.stop();
    progress.set(0);
    dash.set(L);
    controls.current = animate(progress, [0, 0.32, 0.32, 0.66, 0.66, 1], {
      duration: SOLVE_DURATION,
      times: [0, 0.26, 0.33, 0.6, 0.67, 1],
      ease: "easeInOut",
    });
  };

  // Measure the path once it's mounted, then keep it hidden until first solve.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const L = path.getTotalLength();
    lengthRef.current = L;
    setLen(L);
    dash.set(L);
  }, [dash]);

  // First solve plays automatically when the card scrolls into view.
  useEffect(() => {
    if (inView && len) solve();
    return () => controls.current?.stop();
  }, [inView, len]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden pb-5">
      <Title
        title="Problem Solving"
        description="Explore the dead-ends, learn from each wall, and trace the path that works."
      />

      <div
        ref={wrapRef}
        className="flex min-h-0 w-full flex-1 items-center justify-center px-5 md:px-10"
      >
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ cursor: "pointer" }}
          onPointerEnter={solve}
          onClick={solve}
          role="img"
          aria-label="A maze with a glowing path solving its way from start to finish"
        >
          <title>Problem solving maze</title>

          <defs>
            <filter id="ps-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Maze structure — faint, static walls. */}
          <g stroke={WALL} strokeWidth={2} strokeLinecap="round" opacity={0.45}>
            {WALLS.map(([x1, y1, x2, y2]) => (
              <line
                key={`${x1}-${y1}-${x2}-${y2}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              />
            ))}
          </g>

          {/* Ghost of the route so the corridor is hinted before solving. */}
          <path
            d={ROUTE_D}
            fill="none"
            stroke={WALL}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.25}
          />

          {/* The glowing solution, revealed via dash offset as it solves. */}
          <m.path
            ref={pathRef}
            d={ROUTE_D}
            fill="none"
            stroke={SOLVED}
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ps-glow)"
            strokeDasharray={len || undefined}
            style={{ strokeDashoffset: dash }}
          />

          {/* Start marker. */}
          <circle cx={START[0]} cy={START[1]} r={5} fill="oklch(98% 0 0)" />
          <text
            x={START[0] + 12}
            y={START[1] - 10}
            fill="var(--muted)"
            fontSize={11}
            fontFamily="ui-monospace, monospace"
          >
            start
          </text>

          {/* Finish marker. */}
          <circle
            cx={END[0]}
            cy={END[1]}
            r={5}
            fill={SOLVED}
            filter="url(#ps-glow)"
          />
          <text
            x={END[0] - 12}
            y={END[1] - 12}
            textAnchor="end"
            fill="var(--muted)"
            fontSize={11}
            fontFamily="ui-monospace, monospace"
          >
            solved
          </text>

          {/* The explorer dot riding the leading edge of the path. */}
          <m.circle
            r={4}
            fill="oklch(98% 0 0)"
            filter="url(#ps-glow)"
            cx={dotX}
            cy={dotY}
          />
        </svg>
      </div>
    </div>
  );
});

export default ProblemSolving;
