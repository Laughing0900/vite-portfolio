import {
  GAP,
  GLASS_PLANE,
  MOBILE_LAYOUT_MAX_WIDTH,
  PLANE_COLS,
  PLANE_ROWS,
} from "./constants";
import type { GlassCell, ShardLayout } from "./types";

/** Logical cell in `GLASS_PLANE` when rendering with optional transpose (mobile). */
function effectivePlaneCell(
  transpose: boolean,
  effRow: number,
  effCol: number,
): GlassCell | undefined {
  return transpose
    ? GLASS_PLANE[effCol]?.[effRow]
    : GLASS_PLANE[effRow]?.[effCol];
}

export type ShardLayoutResult = {
  layouts: ShardLayout[];
  txResolution: number;
  samples: number;
  bboxRight: number;
  bboxBottom: number;
};

export function computeShardLayouts(
  width: number,
  viewportWidth: number,
  viewportHeight: number,
  reducedMotion: boolean,
): ShardLayoutResult {
  const transposeLayout = width < MOBILE_LAYOUT_MAX_WIDTH;
  const effRows = transposeLayout ? PLANE_COLS : PLANE_ROWS;
  const effCols = transposeLayout ? PLANE_ROWS : PLANE_COLS;
  const chessWhiteParity = (effRows - 1 + effCols - 1) % 2;

  const boardDim = Math.min(viewportWidth, viewportHeight);
  const gapCols = (effCols - 1) * GAP;
  const cell = (boardDim - gapCols) / effCols;
  const boardH = effRows * cell + (effRows - 1) * GAP;
  const inner = cell - GAP * 0.55;

  const layouts: ShardLayout[] = [];
  for (let row = 0; row < effRows; row++) {
    for (let col = 0; col < effCols; col++) {
      if (effectivePlaneCell(transposeLayout, row, col) !== "O") continue;
      const cx = -boardDim / 2 + cell / 2 + col * (cell + GAP);
      const cy = boardH / 2 - cell / 2 - row * (cell + GAP);
      layouts.push({
        col,
        row,
        cx,
        cy,
        zLift: 0.02 * Math.sin(col * 1.7 + row * 2.1),
        inner,
        chessLight: (row + col) % 2 === chessWhiteParity,
      });
    }
  }

  const half = inner * 0.5;
  let br = Number.NEGATIVE_INFINITY;
  let bb = Number.POSITIVE_INFINITY;
  for (const L of layouts) {
    br = Math.max(br, L.cx + half);
    bb = Math.min(bb, L.cy - half);
  }
  if (!Number.isFinite(br) || !Number.isFinite(bb)) {
    br = boardDim / 2;
    bb = -boardH / 2;
  }

  const txResolution = width < MOBILE_LAYOUT_MAX_WIDTH ? 220 : 480;
  const samples = reducedMotion ? 2 : width < MOBILE_LAYOUT_MAX_WIDTH ? 3 : 4;

  return {
    layouts,
    txResolution,
    samples,
    bboxRight: br,
    bboxBottom: bb,
  };
}
