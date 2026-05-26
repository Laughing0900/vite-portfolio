import { GlassHeroScene } from "@/components/glass-hero/GlassHeroScene";
import { Canvas } from "@react-three/fiber";
import { Suspense, memo } from "react";
import * as THREE from "three";

const Hero = memo(() => {
  return (
    <section id="hero" className="relative min-h-dvh">
      <div className="relative min-h-dvh overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Canvas
            className="h-full w-full"
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 1.35]}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.06;
              if ("transmissionResolutionScale" in gl) {
                (
                  gl as THREE.WebGLRenderer & {
                    transmissionResolutionScale: number;
                  }
                ).transmissionResolutionScale = 1;
              }
            }}
          >
            <Suspense fallback={null}>
              <GlassHeroScene />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
});

export default Hero;
