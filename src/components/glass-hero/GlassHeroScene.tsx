import {
  Environment,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  RoundedBox,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import * as THREE from "three";

const TEXT_Z = -3.15;
const GAP = 0.1;
const DEPTH = 0.12;

/** `"O"` = glass plate, `"X"` = empty. Row `0` is the top row visually. */
type GlassCell = "O" | "X";

/**
 * Edit this 2D array to choose the layout. Every row must have the same length.
 * On viewports under 768px wide, the plane is **transposed** (rows ↔ columns) so
 * the layout reads horizontally on phones: fewer tiles across, more down-screen.
 */
const GLASS_PLANE: GlassCell[][] = [
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "O"],
  ["O", "X", "X", "X", "X", "O", "O"],
  ["O", "O", "X", "X", "O", "O", "O"],
  ["X", "X", "O", "O", "O", "O", "O"],
];

const PLANE_ROWS = GLASS_PLANE.length;
const PLANE_COLS = GLASS_PLANE[0]?.length ?? 0;

const MOBILE_LAYOUT_MAX_WIDTH = 768;

/** Logical cell in `GLASS_PLANE` when rendering with optional transpose (mobile). */
function effectivePlaneCell(
  transpose: boolean,
  effRow: number,
  effCol: number,
): GlassCell | undefined {
  return transpose
    ? GLASS_PLANE[effCol]?.[effRow]
    : GLASS_PLANE[effRow]?.[effCol];
}

type ShardLayout = {
  col: number;
  row: number;
  cx: number;
  cy: number;
  zLift: number;
  inner: number;
  chessLight: boolean;
};

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

function paintBackdropTexture(texture: THREE.CanvasTexture, headline: string) {
  const canvas = texture.image as HTMLCanvasElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1024, Math.round(window.innerWidth * dpr));
  const h = Math.max(768, Math.round(window.innerHeight * dpr));
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const base = ctx.createLinearGradient(0, 0, w, h);
  base.addColorStop(0, "#030407");
  base.addColorStop(0.52, "#080b12");
  base.addColorStop(1, "#030407");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  let fontSize = Math.floor(Math.min(w / 7.4, h / 3.8));
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px Inter, ui-sans-serif, system-ui, sans-serif`;
  while (ctx.measureText(headline).width > w * 0.86 && fontSize > 44) {
    fontSize -= 4;
    ctx.font = `900 ${fontSize}px Inter, ui-sans-serif, system-ui, sans-serif`;
  }
  ctx.shadowColor = "rgba(255,255,255,0.25)";
  ctx.shadowBlur = fontSize * 0.12;
  ctx.fillStyle = "rgba(248,249,253,0.94)";
  ctx.fillText(headline, w * 0.5, h * 0.5);
  texture.needsUpdate = true;
}

/**
 * Full-screen backdrop behind the glass grid. Edit `BACKDROP_*` below — the
 * plane is filled by painting a canvas texture (no DOM rasterization).
 */
function BackdropPlane({ z }: { z: number }) {
  /** Main line drawn on the backdrop texture. */
  const BACKDROP_HEADLINE = "Designed in glass.";

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 2;
    return tex;
  }, []);

  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, camera } = useThree();

  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const dist = cam.position.z - z;
    const vFov = (cam.fov * Math.PI) / 180;
    const planeH = 2 * Math.tan(vFov / 2) * dist;
    const planeW = planeH * viewport.aspect;
    meshRef.current?.scale.set(planeW * 1.14, planeH * 1.14, 1);
  }, [camera, viewport.aspect, z]);

  useEffect(() => {
    const redraw = () => paintBackdropTexture(texture, BACKDROP_HEADLINE);
    redraw();

    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(redraw, 160);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      texture.dispose();
    };
  }, [texture]);

  return (
    <mesh ref={meshRef} position={[0, 0, z]} renderOrder={-1000}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

type PointerRef = { current: { x: number; y: number } };

function GlassGrid({
  pointer,
  reducedMotion,
}: {
  pointer: PointerRef;
  reducedMotion: boolean;
}) {
  const rigRef = useRef<THREE.Group>(null);
  const shardRefs = useRef<(THREE.Group | null)[]>([]);
  const { width } = useThree((s) => s.size);

  const { layouts, txResolution, samples } = useMemo(() => {
    const transposeLayout = width < MOBILE_LAYOUT_MAX_WIDTH;
    const effRows = transposeLayout ? PLANE_COLS : PLANE_ROWS;
    const effCols = transposeLayout ? PLANE_ROWS : PLANE_COLS;
    const chessWhiteParity = (effRows - 1 + effCols - 1) % 2;

    const gapCols = (effCols - 1) * GAP;
    const gapRows = (effRows - 1) * GAP;
    /** Narrower span on mobile so tiles stay smaller (transpose already widens each cell). */
    const boardW = transposeLayout ? 3.2 : 5.05;
    const cell = (boardW - gapCols) / effCols;
    const boardH = effRows * cell + gapRows;
    const inner = cell - GAP * 0.55;

    const layouts: ShardLayout[] = [];
    for (let row = 0; row < effRows; row++) {
      for (let col = 0; col < effCols; col++) {
        if (effectivePlaneCell(transposeLayout, row, col) !== "O") continue;
        const cx = -boardW / 2 + cell / 2 + col * (cell + GAP);
        const cy = boardH / 2 - cell / 2 - row * (cell + GAP);
        layouts.push({
          col,
          row,
          cx,
          cy,
          zLift: 0.02 * Math.sin(col * 1.7 + row * 2.1),
          inner,
          chessLight: (row + col) % 2 === chessWhiteParity,
        });
      }
    }
    const txResolution = width < MOBILE_LAYOUT_MAX_WIDTH ? 108 : 272;
    const samples = reducedMotion ? 2 : width < MOBILE_LAYOUT_MAX_WIDTH ? 2 : 3;
    return { layouts, txResolution, samples };
  }, [width, reducedMotion]);

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
      const falloff = Math.exp(-dist * 0.42);
      const w = 0.12 + falloff * 0.55;

      const targetRx = -p.y * 0.52 * w;
      const targetRy = p.x * 0.62 * w;
      const targetRz = ((dx * p.y - dy * p.x) / dist) * 0.06 * w;

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
  });

  return (
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
              transmissionSampler
              samples={samples}
              resolution={txResolution}
              transmission={1}
              roughness={0.048}
              thickness={0.8}
              ior={1.5}
              chromaticAberration={0.045}
              anisotropicBlur={0.5}
              distortion={0.06}
              distortionScale={1}
              temporalDistortion={0}
              color={layout.chessLight ? "#ffffff" : "#38445e"}
              attenuationColor={layout.chessLight ? "#ffffff" : "#d1d1d1"}
              attenuationDistance={25}
              emissive={layout.chessLight ? "#ffffff" : "#000000"}
              emissiveIntensity={0.05}
              // clearcoat={1}
              // clearcoatRoughness={0.06}
              // envMapIntensity={layout.chessLight ? 2.15 : 1.35}
            />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

function useGlassPointer(reducedMotion: boolean) {
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

export function GlassHeroScene() {
  const reducedMotion = usePrefersReducedMotion();
  const pointer = useGlassPointer(reducedMotion);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 9]}
        fov={34}
        near={0.1}
        far={80}
      />
      <BackdropPlane z={TEXT_Z} />

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

      <GlassGrid pointer={pointer} reducedMotion={reducedMotion} />
    </>
  );
}
