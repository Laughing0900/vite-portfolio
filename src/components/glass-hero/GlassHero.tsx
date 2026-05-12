import { GlassHeroOverlay } from "@/components/glass-hero/GlassHeroOverlay";
import { GlassHeroScene } from "@/components/glass-hero/GlassHeroScene";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * Full-viewport liquid-glass hero: HTML underlay for copy + raster source,
 * WebGL canvas with transmission shards and mouse parallax.
 */
export function GlassHero() {
  const sourceRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-dvh w-full bg-[#030407]">
      <GlassHeroOverlay sourceRef={sourceRef} />
      <div className="fixed inset-0 z-10 cursor-grab touch-none active:cursor-grabbing">
        <Canvas
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.35]}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.06;
            if ("transmissionResolutionScale" in gl) {
              (
                gl as THREE.WebGLRenderer & {
                  transmissionResolutionScale: number;
                }
              ).transmissionResolutionScale =
                window.innerWidth < 768 ? 0.85 : 1;
            }
          }}
        >
          <Suspense fallback={null}>
            <GlassHeroScene sourceRef={sourceRef} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
