import { GlassHeroScene } from "@/components/glass-hero/GlassHeroScene";
import { Canvas } from "@react-three/fiber";
import { Suspense, memo, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Hero = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  // Stop the render loop entirely while the hero is scrolled out of view.
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-dvh">
      <div className="relative min-h-dvh overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Canvas
            className="h-full w-full"
            frameloop={inView ? "always" : "never"}
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
