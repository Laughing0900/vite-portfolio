import { Environment, PerspectiveCamera } from "@react-three/drei";
import { BackdropPlane } from "./BackdropPlane";
import { GlassGrid } from "./GlassGrid";
import { useBackdropTexture } from "./hooks/useBackdropTexture";
import { useGlassPointer } from "./hooks/useGlassPointer";
import { useLiveBackdrop } from "./hooks/useLiveBackdrop";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { TEXT_Z } from "./lib/constants";

export function GlassHeroScene() {
  const reducedMotion = usePrefersReducedMotion();
  const pointer = useGlassPointer(reducedMotion);
  const backdropTexture = useBackdropTexture();
  const liveBackdrop = useLiveBackdrop();

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 9]}
        fov={34}
        near={0.1}
        far={80}
      />
      <BackdropPlane z={TEXT_Z} texture={backdropTexture} />

      <Environment
        preset="night"
        background={false}
        environmentIntensity={0.45}
      />

      <directionalLight
        position={[-3.8, 4.2, 5.2]}
        intensity={2.2}
        color="#ffffff"
      />
      <directionalLight
        position={[3.5, -1.8, 2.8]}
        intensity={0.55}
        color="#9edaff"
      />

      <GlassGrid
        pointer={pointer}
        reducedMotion={reducedMotion}
        backdropTexture={backdropTexture}
        liveBackdrop={liveBackdrop}
      />
    </>
  );
}
