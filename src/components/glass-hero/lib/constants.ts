import type { GlassCell, HeroBackdropCopy } from "./types";

/**
 * Edit this 2D array to choose the layout. Every row must have the same length.
 * On viewports under 768px wide, the plane is **transposed** (rows ↔ columns) so
 * the layout reads horizontally on phones: fewer tiles across, more down-screen.
 */
export const GLASS_PLANE: GlassCell[][] = [
  ["O", "X", "X", "X", "X", "X", "X"],
  ["O", "O", "X", "X", "X", "X", "O"],
  ["X", "X", "O", "X", "X", "O", "O"],
  ["X", "X", "X", "X", "O", "O", "O"],
  ["X", "X", "X", "X", "X", "O", "O"],
];

export const PLANE_ROWS = GLASS_PLANE.length;
export const PLANE_COLS = GLASS_PLANE[0]?.length ?? 0;

export const TEXT_Z = -3.15;
export const GAP = 0.02;
export const DEPTH = 0.12;

export const MOBILE_LAYOUT_MAX_WIDTH = 768;

/** Theme primary oklch(76.66% 0.1321 182.38) — canvas cannot read CSS variables. */
export const HERO_PRIMARY_HEX = "#6dd4c8";

/** Quoted for canvas `font` shorthand (matches Google Fonts family name). */
export const FONT_HERO_TITLE = '"Silkscreen", sans-serif';

export const DEFAULT_HERO_BACKDROP_COPY: HeroBackdropCopy = {
  line1: "Laughing",
  line2: "Portfolio",
};
