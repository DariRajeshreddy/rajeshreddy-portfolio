import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function LoaderScene() {
  const mesh = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.9;
      mesh.current.rotation.y = t * 1.1;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 6]} intensity={2} color="#60a5fa" />
      <pointLight position={[-4, -2, 4]} intensity={1.2} color="#a78bfa" />

      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.1, 1]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#4f46e5"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.75}
          distort={0.5}
          speed={3}
        />
      </mesh>

      <mesh ref={ring} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.85, 0.04, 12, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </>
  );
}
