import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const faces: {
  label: string;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
}[] = [
  { label: 'React', color: '#61dafb', position: [0, 0, 0.51], rotation: [0, 0, 0] },
  { label: 'Redux', color: '#764abc', position: [0, 0, -0.51], rotation: [0, Math.PI, 0] },
  { label: 'Zustand', color: '#eab308', position: [0.51, 0, 0], rotation: [0, Math.PI / 2, 0] },
  { label: 'TypeScript', color: '#3178c6', position: [-0.51, 0, 0], rotation: [0, -Math.PI / 2, 0] },
  { label: 'Firebase', color: '#ffca28', position: [0, 0.51, 0], rotation: [-Math.PI / 2, 0, 0] },
  { label: 'Tailwind', color: '#38bdf8', position: [0, -0.51, 0], rotation: [Math.PI / 2, 0, 0] },
];

export function SkillsCube() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.x = t * 0.35 + state.pointer.y * 0.25;
    group.current.rotation.y = t * 0.45 + state.pointer.x * 0.35;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 8]} intensity={1.2} color="#e2e8f0" />
      <pointLight position={[-3, -2, 4]} intensity={1.5} color="#8b5cf6" />

      <RoundedBox args={[1, 1, 1]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.88}
          roughness={0.22}
          envMapIntensity={1.1}
        />
        <Edges color="#38bdf8" threshold={22} lineWidth={1.5} />
      </RoundedBox>

      {faces.map((f) => (
        <Text
          key={f.label}
          position={f.position}
          rotation={f.rotation}
          fontSize={0.11}
          maxWidth={0.95}
          color={f.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {f.label}
        </Text>
      ))}
    </group>
  );
}
