import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useGlassPointer(reducedMotion: boolean) {
  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    const k = reducedMotion ? 1 : 0.075;
    smooth.current.x = THREE.MathUtils.lerp(
      smooth.current.x,
      target.current.x,
      k,
    );
    smooth.current.y = THREE.MathUtils.lerp(
      smooth.current.y,
      target.current.y,
      k,
    );
  });

  return smooth;
}
