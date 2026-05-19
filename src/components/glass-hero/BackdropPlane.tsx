import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

export function BackdropPlane({
  z,
  texture,
}: {
  z: number;
  texture: THREE.Texture;
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
