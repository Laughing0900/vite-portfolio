import { useFBO } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

export type LiveBackdrop = {
  texture: THREE.Texture;
  ready: { current: boolean };
};

/**
 * Renders the scene to an offscreen FBO each frame at priority `-1` so the
 * transmission materials can sample a true backdrop. Flips `ready.current`
 * after two captures to avoid sampling a not-yet-stable target.
 */
export function useLiveBackdrop(): LiveBackdrop {
  const fbo = useFBO();
  const ready = useRef(false);
  const frames = useRef(0);
  const { gl, scene, camera } = useThree();

  useFrame(() => {
    gl.setRenderTarget(fbo);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    frames.current += 1;
    if (frames.current >= 2) ready.current = true;
  }, -1);

  return { texture: fbo.texture, ready };
}
