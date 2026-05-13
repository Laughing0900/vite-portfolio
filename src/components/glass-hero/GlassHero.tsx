import { GlassHeroScene } from "@/components/glass-hero/GlassHeroScene";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

export function GlassHero() {
  return (
    <div className="relative min-h-dvh w-full bg-[#030407]">
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
            <GlassHeroScene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
