import {
  Environment,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  RoundedBox,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import html2canvas from "html2canvas";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import type { RefObject } from "react";
import * as THREE from "three";

const TEXT_Z = -3.15;
const GRID = 4;
const GAP = 0.1;

type GlassHeroSceneProps = {
  sourceRef: RefObject<HTMLDivElement | null>;
};

function drawFallbackCanvasTexture(
  texture: THREE.CanvasTexture,
  label: string,
) {
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
  while (ctx.measureText(label).width > w * 0.86 && fontSize > 44) {
    fontSize -= 4;
    ctx.font = `900 ${fontSize}px Inter, ui-sans-serif, system-ui, sans-serif`;
  }
  ctx.shadowColor = "rgba(255,255,255,0.25)";
  ctx.shadowBlur = fontSize * 0.12;
  ctx.fillStyle = "rgba(248,249,253,0.94)";
  ctx.fillText(label, w * 0.5, h * 0.5);
  texture.needsUpdate = true;
}

function BackdropPlane({
  texture,
  z,
}: {
  texture: THREE.CanvasTexture;
  z: number;
}) {
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

  return (
    <mesh ref={meshRef} position={[0, 0, z]} renderOrder={-1000}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function useDomBackdropTexture(sourceRef: RefObject<HTMLDivElement | null>) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 4;
    return tex;
  }, []);

  const rasterize = useCallback(async () => {
    const el = sourceRef.current;
    if (!el) {
      drawFallbackCanvasTexture(texture, "Designed in glass.");
      return;
    }
    try {
      const captured = await html2canvas(el, {
        backgroundColor: null,
        logging: false,
        scale: Math.min(window.devicePixelRatio || 1, 1.85),
        width: window.innerWidth,
        height: window.innerHeight,
        useCORS: true,
      });
      const canvas = texture.image as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = captured.width;
      canvas.height = captured.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(captured, 0, 0);
      texture.needsUpdate = true;
    } catch {
      drawFallbackCanvasTexture(texture, "Designed in glass.");
    }
  }, [sourceRef, texture]);

  useEffect(() => {
    drawFallbackCanvasTexture(texture, "Designed in glass.");
    void rasterize();

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => void rasterize(), 160);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      texture.dispose();
    };
  }, [rasterize, texture]);

  return texture;
}

type PointerRef = RefObject<{ x: number; y: number }>;

function GlassShard({
  col,
  row,
  cellW,
  cellH,
  boardW,
  boardH,
  pointer,
  samples,
}: {
  col: number;
  row: number;
  cellW: number;
  cellH: number;
  boardW: number;
  boardH: number;
  pointer: PointerRef;
  samples: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const innerW = cellW - GAP * 0.55;
  const innerH = cellH - GAP * 0.55;
  const cx = -boardW / 2 + cellW / 2 + col * (cellW + GAP);
  const cy = -boardH / 2 + cellH / 2 + row * (cellH + GAP);
  const depth = 0.12;
  const zLift = 0.02 * Math.sin(col * 1.7 + row * 2.1);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const p = pointer.current;
    const px = p.x * 4.8;
    const py = p.y * 3.05;
    const dx = px - cx;
    const dy = py - cy;
    const dist = Math.max(Math.hypot(dx, dy), 0.001);
    const falloff = Math.exp(-dist * 0.42);
    const w = 0.12 + falloff * 0.55;

    const targetRx = -p.y * 0.52 * w;
    const targetRy = p.x * 0.62 * w;
    const targetRz = ((dx * p.y - dy * p.x) / dist) * 0.06 * w;

    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRx, 0.085);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRy, 0.085);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, targetRz, 0.065);
  });

  return (
    <group ref={groupRef} position={[cx, cy, 0.18 + zLift]}>
      <RoundedBox args={[innerW, innerH, depth]} radius={0.035} smoothness={3}>
        <MeshTransmissionMaterial
          transmissionSampler
          samples={samples}
          resolution={384}
          transmission={1}
          roughness={0.055}
          thickness={0.8}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropicBlur={0.08}
          distortion={0.07}
          distortionScale={0.25}
          temporalDistortion={0.03}
          color="#f2f9ff"
          metalness={0}
          attenuationColor="#d8f4ff"
          attenuationDistance={14}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={1.85}
        />
      </RoundedBox>
    </group>
  );
}

function GlassGrid({ pointer }: { pointer: PointerRef }) {
  const { width, height } = useThree((s) => s.size);
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const samples = width < 768 || reducedMotion ? 2 : 4;

  const { boardW, boardH, cellW, cellH } = useMemo(() => {
    const aspect = width / Math.max(height, 1);
    const boardH = 4.85;
    const boardW = boardH * aspect;
    const cellW = (boardW - (GRID - 1) * GAP) / GRID;
    const cellH = (boardH - (GRID - 1) * GAP) / GRID;
    return { boardW, boardH, cellW, cellH };
  }, [width, height]);

  const shards = useMemo(() => {
    const list: { col: number; row: number }[] = [];
    for (let row = 0; row < GRID; row++) {
      for (let col = 0; col < GRID; col++) {
        list.push({ col, row });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {shards.map(({ col, row }) => (
        <GlassShard
          key={`${col}-${row}`}
          col={col}
          row={row}
          cellW={cellW}
          cellH={cellH}
          boardW={boardW}
          boardH={boardH}
          pointer={pointer}
          samples={samples}
        />
      ))}
    </group>
  );
}

function RigParallax({
  pointer,
  children,
}: {
  pointer: PointerRef;
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const p = pointer.current;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -p.y * 0.05, 0.06);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, p.x * 0.06, 0.06);
  });
  return <group ref={group}>{children}</group>;
}

/** Smoothed pointer in [-1,1] (y up) for tilt / parallax. */
export function useGlassPointer() {
  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    const k = reduced ? 1 : 0.075;
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

export function GlassHeroScene({ sourceRef }: GlassHeroSceneProps) {
  const texture = useDomBackdropTexture(sourceRef);
  const pointer = useGlassPointer();

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 9]}
        fov={34}
        near={0.1}
        far={80}
      />
      <color attach="background" args={["#030407"]} />
      <BackdropPlane texture={texture} z={TEXT_Z} />

      <Environment
        preset="city"
        background={false}
        environmentIntensity={0.45}
      />

      <hemisphereLight args={["#e8f0ff", "#07040b", 0.85]} />
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
      <pointLight
        position={[3.1, 1.4, 3.2]}
        intensity={10}
        color="#8bdcff"
        distance={14}
        decay={2}
      />
      <pointLight
        position={[-4.2, -2.1, 3]}
        intensity={5}
        color="#ffc8a8"
        distance={14}
        decay={2}
      />

      <RigParallax pointer={pointer}>
        <GlassGrid pointer={pointer} />
      </RigParallax>
    </>
  );
}
