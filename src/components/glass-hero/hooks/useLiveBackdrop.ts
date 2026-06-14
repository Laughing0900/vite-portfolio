import { useFBO } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";
import type { PointerRef } from "../lib/types";

export type LiveBackdrop = {
  texture: THREE.Texture;
  ready: { current: boolean };
};

/**
 * Frames the smoothed pointer must stay still before FBO captures pause.
 * Shard rotations lerp toward pointer-derived targets at ~0.085/frame, so
 * after this many idle frames the residual motion is far below visibility.
 */
const SETTLE_FRAMES = 90;

/**
 * Renders the scene to an offscreen FBO at priority `-1` so the transmission
 * materials can sample a true backdrop. Flips `ready.current` after two
 * captures to avoid sampling a not-yet-stable target.
 *
 * The capture is a full extra scene draw, so it is skipped once the pointer
 * has settled and the backdrop texture is unchanged — otherwise GPU work
 * doubles every frame forever, even with an idle pointer.
 */
export function useLiveBackdrop(
  pointer: PointerRef,
  backdropTexture: THREE.Texture,
): LiveBackdrop {
  const fbo = useFBO();
  const ready = useRef(false);
  const frames = useRef(0);
  const last = useRef({
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY,
    version: -1,
  });
  const settledFrames = useRef(0);
  const { gl, scene, camera } = useThree();

  useFrame(() => {
    const p = pointer.current;
    const changed =
      Math.abs(p.x - last.current.x) > 1e-4 ||
      Math.abs(p.y - last.current.y) > 1e-4 ||
      backdropTexture.version !== last.current.version;
    last.current.x = p.x;
    last.current.y = p.y;
    last.current.version = backdropTexture.version;
    settledFrames.current = changed ? 0 : settledFrames.current + 1;

    if (ready.current && settledFrames.current > SETTLE_FRAMES) return;

    gl.setRenderTarget(fbo);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    frames.current += 1;
    if (frames.current >= 2) ready.current = true;
  }, -1);

  return useMemo(() => ({ texture: fbo.texture, ready }), [fbo]);
}
