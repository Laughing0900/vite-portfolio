import type * as THREE from "three";
import { FONT_HERO_TITLE, HERO_PRIMARY_HEX } from "./constants";

export function paintHeroBackdrop(
  texture: THREE.CanvasTexture,
  line1: string,
  line2: string,
) {
  const canvas = texture.image as HTMLCanvasElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1024, Math.round(window.innerWidth * dpr));
  const h = Math.max(768, Math.round(window.innerHeight * dpr));
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  ctx.clearRect(0, 0, w, h);

  /**
   * Transmission refracts in screen space; mostly-transparent backdrop means
   * samples miss glyphs and read as empty. A soft gradient gives refracted
   * rays something to hit while staying lighter than a flat fill.
   */
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "rgba(3, 6, 16, 0.14)");
  g.addColorStop(1, "rgba(6, 12, 32, 0.62)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const iw = window.innerWidth;
  const isLg = iw >= 1024;
  const isMd = iw >= 768;

  const padX = w * (isMd ? 0.06 : 0.05);
  const titleSize1 = Math.round(
    (isLg ? 0.072 : isMd ? 0.058 : 0.09) * Math.min(w, h * 1.1),
  );
  const titleSize2 = Math.round(titleSize1 * (isLg ? 0.55 : 0.52));

  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = Math.round(6 * dpr);

  const titleX = isMd ? w * 0.2 + padX : padX;
  let y = h * (isMd ? (isLg ? 0.34 : 0.36) : 0.28);

  ctx.font = `700 ${titleSize1}px ${FONT_HERO_TITLE}`;
  ctx.fillStyle = "rgba(248,249,253,0.96)";
  ctx.fillText(line1, titleX, y);

  y += titleSize1 * 1.08;
  ctx.font = `700 ${titleSize2}px ${FONT_HERO_TITLE}`;
  ctx.fillStyle = HERO_PRIMARY_HEX;
  ctx.fillText(line2, titleX, y);

  texture.needsUpdate = true;
}
