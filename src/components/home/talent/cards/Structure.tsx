import Title from "@/components/home/talent/cards/Title";
import { animate, m, useMotionValue, useSpring } from "motion/react";
import { type PointerEvent, memo, useCallback, useEffect, useRef } from "react";

// Clean reference snippet rendered as a VSCode-style minimap (colored token bars).
const code = `const UserProfile = ({ user, onUpdate, isLoading }) => {
  // Guard clauses keep the happy path flat and readable.
  if (isLoading) return <Spinner size="medium" />;
  if (!user) return <EmptyState message="User not found" />;

  const handleSubmit = (values) => {
    onUpdate(values)
      .then(() => toast.success('Profile updated'))
      .catch((error) => toast.error(error.message));
  };

  return (
    <Card>
      <ProfileHeader name={user.name} role={user.role} />
      <ProfileForm
        initialValues={user}
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </Card>
  );
};`;

// Minimap geometry: each char maps to UNIT px, each line to LINE_H px.
const UNIT = 2.6;
const LINE_H = 7;
const BAR_H = 3.5;
const VIEW_LINES = 7; // height of the scrolling viewport box, in lines

// Token colors tuned to read as a tiny syntax-highlighted preview.
const COLORS = {
  text: "oklch(78% 0.03 250)",
  keyword: "oklch(72% 0.17 330)",
  string: "oklch(78% 0.15 150)",
  type: "oklch(83% 0.14 95)",
  punct: "oklch(62% 0.02 250)",
  comment: "oklch(56% 0.03 250)",
};

const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "switch",
  "case",
  "break",
  "import",
  "export",
  "default",
  "from",
  "await",
  "async",
  "new",
  "true",
  "false",
  "null",
  "undefined",
  "typeof",
  "this",
]);

const wordColor = (word: string) => {
  if (KEYWORDS.has(word)) return COLORS.keyword;
  if (/^[A-Z]/.test(word)) return COLORS.type;
  return COLORS.text;
};

// Split a line into whitespace spacers and colored token bars.
const TOKEN =
  /(\s+)|('[^']*'|"[^"]*"|`[^`]*`)|(\/\/.*)|([A-Za-z_$][\w$]*)|([^\sA-Za-z_$]+)/g;

type Segment = { w: number; space?: boolean; color?: string };

const lines: Segment[][] = code.split("\n").map((line) => {
  const segments: Segment[] = [];
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  // biome-ignore lint/suspicious/noAssignInExpressions: standard regex exec loop
  while ((match = TOKEN.exec(line)) !== null) {
    const len = match[0].length;
    if (match[1] !== undefined) segments.push({ w: len, space: true });
    else if (match[2] !== undefined)
      segments.push({ w: len, color: COLORS.string });
    else if (match[3] !== undefined)
      segments.push({ w: len, color: COLORS.comment });
    else if (match[4] !== undefined)
      segments.push({ w: len, color: wordColor(match[4]) });
    else segments.push({ w: len, color: COLORS.punct });
  }
  return segments;
});

// Lines outside the moving viewport read as a dim, colorless minimap.
const MUTED = "oklch(48% 0.01 250)";

const VIEW_H = LINE_H * VIEW_LINES;
const VIEW_INSET = 1.5; // horizontal inset of the viewport box, in minimap units

// Precompute every token as an SVG rect: walk each line accumulating x, and
// track the widest line so the viewBox hugs the content.
type Rect = { x: number; y: number; w: number; color: string };
const rects: Rect[] = [];
let contentW = 0;
lines.forEach((segs, row) => {
  let x = 0;
  const y = row * LINE_H + (LINE_H - BAR_H) / 2;
  for (const seg of segs) {
    const w = seg.w * UNIT;
    if (!seg.space) rects.push({ x, y, w, color: seg.color ?? MUTED });
    x += w;
  }
  if (x > contentW) contentW = x;
});
const contentH = lines.length * LINE_H;

// Idle ping-pong scan — deliberately slow so it reads as ambient motion.
const AUTO_DURATION = 14;

const Structure = memo(() => {
  const travel = (lines.length - VIEW_LINES) * LINE_H;
  const svgRef = useRef<SVGSVGElement>(null);
  const autoControls = useRef<ReturnType<typeof animate> | null>(null);

  // targetY is the driver; y is a spring that smooths both the cursor
  // follow and the hand-off back to the auto-scan.
  const targetY = useMotionValue(0);
  const y = useSpring(targetY, { stiffness: 180, damping: 28, mass: 0.6 });

  const startAuto = useCallback(() => {
    autoControls.current?.stop();
    autoControls.current = animate(targetY, [0, travel], {
      duration: AUTO_DURATION,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    });
  }, [targetY, travel]);

  useEffect(() => {
    startAuto();
    return () => autoControls.current?.stop();
  }, [startAuto]);

  // While the cursor is in the minimap, center the viewport box on it.
  const follow = (e: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgY = ((e.clientY - rect.top) / rect.height) * contentH;
    targetY.set(Math.max(0, Math.min(travel, svgY - VIEW_H / 2)));
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden pb-5">
      <Title
        title="Maintainable"
        description="Built with a clear and organized programme structure."
      />

      <div className="flex min-h-0 w-full flex-1 items-center justify-center px-5 md:px-10">
        <m.div
          className="flex h-full w-full items-center justify-center rounded-lg"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <svg
            ref={svgRef}
            className="h-full w-full"
            viewBox={`0 0 ${contentW} ${contentH}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ cursor: "ns-resize" }}
            onPointerEnter={() => autoControls.current?.stop()}
            onPointerMove={follow}
            onPointerLeave={startAuto}
            role="img"
            aria-label="Source code structure minimap"
          >
            <defs>
              {/* Reveal window: a band that scans down in lockstep with the
                  viewport box, clipping the color layer to its bounds. */}
              <clipPath id="structure-reveal">
                <m.rect x={0} width={contentW} height={VIEW_H} style={{ y }} />
              </clipPath>
            </defs>

            {/* Base layer: the whole file in a flat, muted tone. */}
            <g fill={MUTED} opacity={0.85}>
              {rects.map((r, i) => (
                <rect
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable static bars
                  key={i}
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={BAR_H}
                  rx={0.6}
                />
              ))}
            </g>

            {/* Color layer: revealed only within the scanning viewport band. */}
            <g clipPath="url(#structure-reveal)" opacity={0.85}>
              {rects.map((r, i) => (
                <rect
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable static bars
                  key={i}
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={BAR_H}
                  rx={0.6}
                  fill={r.color}
                />
              ))}
            </g>

            {/* VSCode-style viewport box scanning the file. */}
            <m.rect
              x={VIEW_INSET}
              width={contentW - VIEW_INSET * 2}
              height={VIEW_H}
              rx={1.5}
              fill="rgba(255,255,255,0.07)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={0.4}
              style={{ y }}
            />
          </svg>
        </m.div>
      </div>
    </div>
  );
});

export default Structure;
