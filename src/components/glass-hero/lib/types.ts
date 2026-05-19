export type HeroBackdropCopy = {
  line1: string;
  line2: string;
};

/** `"O"` = glass plate, `"X"` = empty. Row `0` is the top row visually. */
export type GlassCell = "O" | "X";

export type PointerRef = { current: { x: number; y: number } };

export type ShardLayout = {
  col: number;
  row: number;
  cx: number;
  cy: number;
  zLift: number;
  inner: number;
  chessLight: boolean;
};
