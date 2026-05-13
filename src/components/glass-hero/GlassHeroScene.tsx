import {
  Environment,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  RoundedBox,
  useFBO,
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

type HeroBackdropCopy = {
  line1: string;
  line2: string;
};

/** `"O"` = glass plate, `"X"` = empty. Row `0` is the top row visually. */
type GlassCell = "O" | "X";
type PointerRef = { current: { x: number; y: number } };

type ShardLayout = {
  col: number;
  row: number;
  cx: number;
  cy: number;
  zLift: number;
  inner: number;
  chessLight: boolean;
};

/**
 * Edit this 2D array to choose the layout. Every row must have the same length.
 * On viewports under 768px wide, the plane is **transposed** (rows ↔ columns) so
 * the layout reads horizontally on phones: fewer tiles across, more down-screen.
 */
const GLASS_PLANE: GlassCell[][] = [
  ["O", "X", "X", "X", "X", "X", "X"],
  ["O", "O", "X", "X", "X", "X", "O"],
  ["X", "X", "O", "X", "X", "O", "O"],
  ["X", "X", "X", "X", "O", "O", "O"],
  ["X", "X", "X", "X", "X", "O", "O"],
];

const PLANE_ROWS = GLASS_PLANE.length;
const PLANE_COLS = GLASS_PLANE[0]?.length ?? 0;

const TEXT_Z = -3.15;
const GAP = 0.02;
const DEPTH = 0.12;

const MOBILE_LAYOUT_MAX_WIDTH = 768;
const DEFAULT_HERO_BACKDROP_COPY: HeroBackdropCopy = {
  line1: "Laughing",
  line2: "Portfolio",
};

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

/** Theme primary oklch(76.66% 0.1321 182.38) — canvas cannot read CSS variables. */
const HERO_PRIMARY_HEX = "#6dd4c8";

/** Quoted for canvas `font` shorthand (matches Google Fonts family name). */
const FONT_HERO_TITLE = '"Silkscreen", sans-serif';


function paintHeroBackdrop(
  texture: THREE.CanvasTexture,
  line1: string,
  line2: string,
) {
  const canvas = texture.image as HTMLCanvasElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1024, Math.round(window.innerWidth * dpr));
  const h = Math.max(768, Math.round(window.innerHeight * dpr));
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  ctx.clearRect(0, 0, w, h);

  /**
   * Transmission refracts in screen space; mostly-transparent backdrop means
   * samples miss glyphs and read as empty. A soft gradient gives refracted
   * rays something to hit while staying lighter than a flat fill.
   */
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "rgba(3, 6, 16, 0.14)");
  g.addColorStop(1, "rgba(6, 12, 32, 0.62)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const iw = window.innerWidth;
  const isLg = iw >= 1024;
  const isMd = iw >= 768;

  const padX = w * (isMd ? 0.06 : 0.05);
  const titleSize1 = Math.round(
    (isLg ? 0.072 : isMd ? 0.058 : 0.09) * Math.min(w, h * 1.1),
  );
  const titleSize2 = Math.round(titleSize1 * (isLg ? 0.55 : 0.52));

  ctx.textBaseline = "top";
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = Math.round(6 * dpr);

  if (isMd) {
    const titleX = w * 0.2 + padX;
    let y = h * (isLg ? 0.34 : 0.36);
    ctx.textAlign = "left";
    ctx.font = `700 ${titleSize1}px ${FONT_HERO_TITLE}`;
    ctx.fillStyle = "rgba(248,249,253,0.96)";
    ctx.fillText(line1, titleX, y);
    y += titleSize1 * 1.08;
    ctx.font = `700 ${titleSize2}px ${FONT_HERO_TITLE}`;
    ctx.fillStyle = HERO_PRIMARY_HEX;
    ctx.fillText(line2, titleX, y);
  } else {
    ctx.textAlign = "left";
    let y = h * 0.28;
    ctx.font = `700 ${titleSize1}px ${FONT_HERO_TITLE}`;
    ctx.fillStyle = "rgba(248,249,253,0.96)";
    ctx.fillText(line1, padX, y);
    y += titleSize1 * 1.08;
    ctx.font = `700 ${titleSize2}px ${FONT_HERO_TITLE}`;
    ctx.fillStyle = HERO_PRIMARY_HEX;
    ctx.fillText(line2, padX, y);
  }

  texture.needsUpdate = true;
}

function BackdropPlane({ z }: { z: number }) {
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
    let cancelled = false;

    const paint = () => {
      if (cancelled) return;
      paintHeroBackdrop(
        texture,
        DEFAULT_HERO_BACKDROP_COPY.line1,
        DEFAULT_HERO_BACKDROP_COPY.line2,
      );
    };

    // Paint immediately with fallback fonts
    paint();

    // When font is ready, repaint with proper font
    if (document.fonts.check("700 120px Silkscreen")) {
      paint();
    } else {
      document.fonts.addEventListener("loadingdone", () => {
        if (!cancelled) paint();
      });
    }

    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        paint();
      }, 160);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      texture.dispose();
    };
  }, [texture]);

  return (
    <mesh ref={meshRef} position={[0, 0, z]} renderOrder={-1000}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        toneMapped={false}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function GlassGrid({
  pointer,
  reducedMotion,
  backdropTexture,
}: {
  pointer: PointerRef;
  reducedMotion: boolean;
  backdropTexture: THREE.Texture | undefined;
}) {
  const rigRef = useRef<THREE.Group>(null);
  const shardRefs = useRef<(THREE.Group | null)[]>([]);
  const width = useThree((s) => s.size.width);
  const viewport = useThree((s) => s.viewport);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  const { layouts, txResolution, samples, bboxRight, bboxBottom } =
    useMemo(() => {
      const transposeLayout = width < MOBILE_LAYOUT_MAX_WIDTH;
      const effRows = transposeLayout ? PLANE_COLS : PLANE_ROWS;
      const effCols = transposeLayout ? PLANE_ROWS : PLANE_COLS;
      const chessWhiteParity = (effRows - 1 + effCols - 1) % 2;

      const boardDim = Math.min(viewport.width, viewport.height);
      const gapCols = (effCols - 1) * GAP;
      const cell = (boardDim - gapCols) / effCols;
      const boardH = effRows * cell + (effRows - 1) * GAP;
      const inner = cell - GAP * 0.55;

      const layouts: ShardLayout[] = [];
      for (let row = 0; row < effRows; row++) {
        for (let col = 0; col < effCols; col++) {
          if (effectivePlaneCell(transposeLayout, row, col) !== "O") continue;
          const cx = -boardDim / 2 + cell / 2 + col * (cell + GAP);
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
      const half = inner * 0.5;
      let br = Number.NEGATIVE_INFINITY;
      let bb = Number.POSITIVE_INFINITY;
      for (const L of layouts) {
        br = Math.max(br, L.cx + half);
        bb = Math.min(bb, L.cy - half);
      }
      if (!Number.isFinite(br) || !Number.isFinite(bb)) {
        br = boardDim / 2;
        bb = -boardH / 2;
      }
      const txResolution = width < MOBILE_LAYOUT_MAX_WIDTH ? 220 : 480;
      const samples = reducedMotion
        ? 2
        : width < MOBILE_LAYOUT_MAX_WIDTH
          ? 3
          : 4;
      return {
        layouts,
        txResolution,
        samples,
        bboxRight: br,
        bboxBottom: bb,
      };
    }, [width, viewport.width, viewport.height, reducedMotion]);

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

  /** World Z of glass tiles — matches `getCurrentViewport` target so margins track frustum. */
  const gridPlaneZ = 0.19;
  const v = viewport.getCurrentViewport(camera, [0, 0, gridPlaneZ], size);
  const marginX = v.width * (width < 640 ? 0.04 : width < 1024 ? 0.045 : 0.04);
  const marginY = v.height * (width < 640 ? 0.12 : 0.08);
  const anchorX = v.width / 2 - marginX;
  const anchorY = -v.height / 2 + marginY;
  const boardPos: [number, number, number] = [
    anchorX - bboxRight,
    anchorY - bboxBottom,
    0,
  ];

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
                // clearcoat={1}
                // clearcoatRoughness={0.06}
              />
            </RoundedBox>
          </group>
        ))}
      </group>
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
  const { gl, scene, camera } = useThree();

  const backdropFBO = useFBO();
  const backdropTexture = useMemo(() => {
    const tex = new THREE.CanvasTexture(document.createElement("canvas"));
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  useEffect(() => {
    const canvas = backdropTexture.image as HTMLCanvasElement;
    paintHeroBackdrop(
      { image: canvas } as THREE.CanvasTexture,
      DEFAULT_HERO_BACKDROP_COPY.line1,
      DEFAULT_HERO_BACKDROP_COPY.line2,
    );
    backdropTexture.needsUpdate = true;
  }, [backdropTexture]);

  useFrame(() => {
    gl.setRenderTarget(backdropFBO);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

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

      <GlassGrid
        pointer={pointer}
        reducedMotion={reducedMotion}
        backdropTexture={backdropFBO.texture ?? undefined}
      />
    </>
  );
}
