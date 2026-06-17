import Title from "@/components/home/talent/cards/Title";
import useMediaQuery from "@/hooks/useMediaQuery";
import { m } from "motion/react";
import { memo, useMemo, useState } from "react";

// GitHub-style contribution heatmap: 53 weeks (columns) x 7 days (rows).
const WEEKS = 53;
const DAYS = 7;
const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;

// Hover spotlight: Manhattan radius of the rhombus (2 -> 13-cell diamond).
const RHOMBUS_RADIUS = 2;

// Teal -> green intensity scale, level 0 = no activity.
const levelFill = [
  "oklch(60% 0.1 175)",
  "var(--input)",
  "oklch(75% 0.18 140)",
  "oklch(58% 0.13 165)",
  "oklch(68% 0.16 150)",
];

// Relative frequency of each level — green (the highest level) is weighted most.
const levelWeights = [2, 2, 3, 4, 7];
const totalWeight = levelWeights.reduce((sum, weight) => sum + weight, 0);

const pickLevel = (roll: number) => {
  let threshold = roll * totalWeight;
  for (let level = 0; level < levelWeights.length; level++) {
    threshold -= levelWeights[level];
    if (threshold < 0) return level;
  }
  return levelWeights.length - 1;
};

// Deterministic activity pattern (LCG) so the grid is stable across renders.
const buildBaseCells = () => {
  let seed = 1_234_567;
  const random = () => {
    seed = (seed * 1_103_515_245 + 12_345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const cells: { week: number; day: number; level: number }[] = [];
  for (let week = 0; week < WEEKS; week++) {
    for (let day = 0; day < DAYS; day++) {
      cells.push({ week, day, level: pickLevel(random()) });
    }
  }
  return cells;
};

const baseCells = buildBaseCells();

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LABEL_H = 16; // space above each line band for month labels
const LINE_GAP = 12; // vertical gap between stacked lines
const GRID_H = DAYS * STEP - GAP;
const BAND_H = LABEL_H + GRID_H;

// Reflow the year into `lines` stacked rows (1 on desktop, 2 on tablet/mobile).
const buildLayout = (lines: number) => {
  const weeksPerLine = Math.ceil(WEEKS / lines);
  const bandStep = BAND_H + LINE_GAP;

  const cells = baseCells.map(({ week, day, level }) => {
    const line = Math.floor(week / weeksPerLine);
    const col = week % weeksPerLine;
    return {
      x: col * STEP,
      y: line * bandStep + LABEL_H + day * STEP,
      order: line * weeksPerLine + col,
      level,
      line,
      col,
      day,
    };
  });

  const monthLabels = MONTHS.map((label, index) => {
    const startWeek = Math.round((index * WEEKS) / MONTHS.length);
    const line = Math.min(Math.floor(startWeek / weeksPerLine), lines - 1);
    const col = startWeek % weeksPerLine;
    return {
      label,
      x: col * STEP,
      y: line * bandStep + LABEL_H - 6,
    };
  });

  return {
    cells,
    monthLabels,
    width: weeksPerLine * STEP - GAP,
    height: lines * BAND_H + (lines - 1) * LINE_GAP,
  };
};

const ScheduleV2 = memo(() => {
  const isLg = useMediaQuery("lg");
  const lines = isLg ? 1 : 2;
  const { cells, monthLabels, width, height } = useMemo(
    () => buildLayout(lines),
    [lines],
  );

  // Cell under the cursor; drives a rhombus "spotlight" that dims everything else.
  const [hover, setHover] = useState<{
    line: number;
    col: number;
    day: number;
  } | null>(null);

  const isDimmed = (cell: { line: number; col: number; day: number }) => {
    if (!hover || cell.line !== hover.line) return hover !== null;
    const dc = cell.col - hover.col;
    const dd = cell.day - hover.day;
    // Diamond/rhombus centered on the hovered cell. Bump RHOMBUS_RADIUS to grow it.
    const inBlock = Math.abs(dc) + Math.abs(dd) <= RHOMBUS_RADIUS;
    return !inBlock;
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Title
        title="Schedule"
        description="A consistent rhythm of commits — shipping work day after day."
      />
      <div className="flex min-h-0 w-full flex-1 items-center justify-center px-5 pb-5 md:px-10">
        <svg
          className="h-auto max-h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="A year of commit activity shown as a contribution heatmap"
          onMouseLeave={() => setHover(null)}
        >
          <title>Commit contribution heatmap</title>

          {monthLabels.map((month) => (
            <text
              key={`${month.label}-${month.y}`}
              x={month.x}
              y={month.y}
              fill="var(--muted)"
              fontSize={9}
              fontFamily="inherit"
            >
              {month.label}
            </text>
          ))}

          {cells.map((cell) => (
            <m.rect
              key={`${cell.x}-${cell.y}`}
              x={cell.x}
              y={cell.y}
              width={CELL}
              height={CELL}
              rx={2}
              ry={2}
              fill={levelFill[cell.level]}
              initial={{ opacity: 0, scale: 0, fillOpacity: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ fillOpacity: isDimmed(cell) ? 0.2 : 1 }}
              transition={{
                delay: cell.order * 0.012,
                duration: 0.3,
                ease: "backOut",
                fillOpacity: { delay: 0, duration: 0.25, ease: "easeOut" },
              }}
              onMouseEnter={() =>
                setHover({ line: cell.line, col: cell.col, day: cell.day })
              }
              style={{
                transformOrigin: `${cell.x + CELL / 2}px ${cell.y + CELL / 2}px`,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
});

export default ScheduleV2;
