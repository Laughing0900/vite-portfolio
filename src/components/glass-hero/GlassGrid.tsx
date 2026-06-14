import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { LiveBackdrop } from "./hooks/useLiveBackdrop";
import { DEPTH } from "./lib/constants";
import { computeShardLayouts } from "./lib/computeShardLayouts";
import type { PointerRef } from "./lib/types";

type TransmissionMaterial = THREE.MeshPhysicalMaterial & {
  background?: THREE.Texture | null;
};

export function GlassGrid({
  pointer,
  reducedMotion,
  backdropTexture,
  liveBackdrop,
}: {
  pointer: PointerRef;
  reducedMotion: boolean;
  backdropTexture: THREE.Texture;
  liveBackdrop: LiveBackdrop;
}) {
  const rigRef = useRef<THREE.Group>(null);
  const shardRefs = useRef<(THREE.Group | null)[]>([]);
  const materialRefs = useRef<(TransmissionMaterial | null)[]>([]);
  const upgradedRef = useRef(false);

  const width = useThree((s) => s.size.width);
  const viewport = useThree((s) => s.viewport);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  const { layouts, txResolution, samples, bboxRight, bboxBottom } = useMemo(
    () =>
      computeShardLayouts(
        width,
        viewport.width,
        viewport.height,
        reducedMotion,
      ),
    [width, viewport.width, viewport.height, reducedMotion],
  );

  useFrame(() => {
    const p = pointer.current;
    const rig = rigRef.current;
    if (rig) {
      rig.rotation.x = THREE.MathUtils.lerp(rig.rotation.x, -p.y * 0.05, 0.06);
      rig.rotation.y = THREE.MathUtils.lerp(rig.rotation.y, p.x * 0.06, 0.06);
    }

    const px = p.x * 4.8;
    const py = p.y * 3.05;
    for (let i = 0; i < layouts.length; i++) {
      const shard = shardRefs.current[i];
      if (!shard) continue;
      const { cx, cy } = layouts[i];
      const dx = px - cx;
      const dy = py - cy;
      const dist = Math.max(Math.hypot(dx, dy), 0.001);
      const invDist = 1 / dist;
      const dirX = dx * invDist;
      const dirY = dy * invDist;
      const proximity = Math.exp(-dist * 0.42);
      const distanceWeight = 1 - proximity;
      const w = 0.12 + distanceWeight * 0.55;

      const targetRx = -dirY * 0.52 * w;
      const targetRy = dirX * 0.62 * w;
      const targetRz = (dirX * p.y - dirY * p.x) * 0.04 * w;

      shard.rotation.x = THREE.MathUtils.lerp(
        shard.rotation.x,
        targetRx,
        0.085,
      );
      shard.rotation.y = THREE.MathUtils.lerp(
        shard.rotation.y,
        targetRy,
        0.085,
      );
      shard.rotation.z = THREE.MathUtils.lerp(
        shard.rotation.z,
        targetRz,
        0.065,
      );
    }

    /**
     * First frame uses deterministic canvas fallback. As soon as the FBO has at
     * least one capture, upgrade all transmission materials in-place (no state).
     */
    if (!upgradedRef.current && liveBackdrop.ready.current) {
      for (const mat of materialRefs.current) {
        if (!mat) continue;
        mat.background = liveBackdrop.texture;
        mat.needsUpdate = true;
      }
      upgradedRef.current = true;
    }
  });

  const boardPos = useMemo<[number, number, number]>(() => {
    /** World Z of glass tiles — matches `getCurrentViewport` target so margins track frustum. */
    const gridPlaneZ = 0.19;
    const v = viewport.getCurrentViewport(camera, [0, 0, gridPlaneZ], size);
    let bboxLeft = Number.POSITIVE_INFINITY;
    let bboxTop = Number.NEGATIVE_INFINITY;
    for (const layout of layouts) {
      const half = layout.inner * 0.5;
      bboxLeft = Math.min(bboxLeft, layout.cx - half);
      bboxTop = Math.max(bboxTop, layout.cy + half);
    }
    if (!Number.isFinite(bboxLeft) || !Number.isFinite(bboxTop)) {
      bboxLeft = -v.width / 2;
      bboxTop = v.height / 2;
    }
    const centerX = (bboxLeft + bboxRight) * 0.5;
    const centerY = (bboxTop + bboxBottom) * 0.5;
    return [-centerX, -centerY, 0];
  }, [viewport, camera, size, layouts, bboxRight, bboxBottom]);

  return (
    <group position={boardPos}>
      <group ref={rigRef}>
        {layouts.map((layout, i) => (
          <group
            key={`shard-${layout.col}-${layout.row}`}
            ref={(node) => {
              shardRefs.current[i] = node;
            }}
            position={[layout.cx, layout.cy, 0.18 + layout.zLift]}
          >
            <RoundedBox
              args={[layout.inner, layout.inner, DEPTH]}
              radius={0.02}
              smoothness={2}
            >
              <MeshTransmissionMaterial
                ref={(node) => {
                  materialRefs.current[i] =
                    (node as unknown as TransmissionMaterial) ?? null;
                }}
                background={backdropTexture}
                samples={samples}
                resolution={txResolution}
                transmission={1}
                roughness={0.035}
                thickness={0.42}
                ior={1.5}
                chromaticAberration={0.018}
                anisotropicBlur={0.22}
                distortion={0.022}
                distortionScale={0.006}
                temporalDistortion={0}
                color={layout.chessLight ? "#f7f9ff" : "#c5cedf"}
                attenuationColor={layout.chessLight ? "#ffffff" : "#5c6b82"}
                attenuationDistance={layout.chessLight ? 12 : 5.5}
                emissive={layout.chessLight ? "#ffffff" : "#a8b8d0"}
                emissiveIntensity={layout.chessLight ? 0.02 : 0.04}
              />
            </RoundedBox>
          </group>
        ))}
      </group>
    </group>
  );
}
