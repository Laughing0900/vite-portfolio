import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { DEFAULT_HERO_BACKDROP_COPY } from "../lib/constants";
import { paintHeroBackdrop } from "../lib/paintHeroBackdrop";

function createBackdropTexture() {
  const tex = new THREE.CanvasTexture(document.createElement("canvas"));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 2;
  // Paint immediately so first visible frame never samples an empty canvas.
  paintHeroBackdrop(
    tex,
    DEFAULT_HERO_BACKDROP_COPY.line1,
    DEFAULT_HERO_BACKDROP_COPY.line2,
  );
  return tex;
}

export function useBackdropTexture() {
  const texture = useMemo(() => createBackdropTexture(), []);

  useEffect(() => {
    let cancelled = false;

    const paint = () => {
      if (cancelled) return;
      paintHeroBackdrop(
        texture,
        DEFAULT_HERO_BACKDROP_COPY.line1,
        DEFAULT_HERO_BACKDROP_COPY.line2,
      );
    };

    // Repaint once web fonts are ready to avoid first-load glyph mismatch.
    let onFontsDone: (() => void) | undefined;
    if (document.fonts.check("700 120px Silkscreen")) {
      paint();
    } else {
      onFontsDone = () => paint();
      document.fonts.addEventListener("loadingdone", onFontsDone);
    }

    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(paint, 160);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      if (onFontsDone) {
        document.fonts.removeEventListener("loadingdone", onFontsDone);
      }
      texture.dispose();
    };
  }, [texture]);

  return texture;
}
