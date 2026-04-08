import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sparkles,
  Torus,
} from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import type { PerformanceProfile } from '../hooks/usePerformanceProfile';

function buildParticleGeometry(count: number) {
  const g = new THREE.BufferGeometry();
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 12 + Math.random() * 18;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  return g;
}

const particleGeoFull = buildParticleGeometry(1000);
const particleGeoMedium = buildParticleGeometry(380);

function Particles({
  geometry,
  size,
}: {
  geometry: THREE.BufferGeometry;
  size: number;
}) {
  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.028;
    ref.current.rotation.x = state.pointer.y * 0.06;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={size}
        color="#a78bfa"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroScene({ profile }: { profile: PerformanceProfile }) {
  const group = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Mesh>(null);
  const isFull = profile === 'full';
  const isMedium = profile === 'medium';
  const isMinimal = profile === 'minimal';

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;
    const rotLerp = isMinimal ? 0.07 : 0.04;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        px * (isMinimal ? 0.25 : 0.45) + t * (isMinimal ? 0.06 : 0.12),
        rotLerp
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        py * (isMinimal ? 0.12 : 0.25),
        rotLerp
      );
    }
    if (sphere.current) {
      const spin = isMinimal ? 0.2 : 0.35;
      sphere.current.rotation.y = t * spin;
      sphere.current.rotation.z = t * (isMinimal ? 0.04 : 0.08);
    }
  });

  const torusSegs: [number, number] = isMinimal ? [8, 48] : isMedium ? [10, 64] : [12, 80];
  const sparkles = isMinimal ? 18 : isMedium ? 42 : 72;
  const icosaDetail = isMinimal ? 0 : 1;

  return (
    <group ref={group}>
      {isFull && (
        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={0.45} background={false} />
        </Suspense>
      )}

      <ambientLight intensity={isMinimal ? 0.45 : 0.32} />
      <spotLight
        position={[6, 8, 8]}
        angle={0.35}
        penumbra={0.85}
        intensity={isFull ? 2.8 : isMedium ? 2 : 1.2}
        color="#7dd3fc"
        castShadow={false}
      />
      <pointLight position={[8, 4, 6]} intensity={isFull ? 2.4 : 1.6} color="#60a5fa" />
      <pointLight position={[-7, -3, -5]} intensity={isFull ? 1.6 : 1} color="#c4b5fd" />

      {/* Rim ring — cheap mesh, strong silhouette */}
      <mesh rotation={[1.05, 0.35, 0.2]}>
        <ringGeometry args={[2.65, 2.72, isMinimal ? 32 : 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={isMinimal ? 0.22 : 0.38}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <Float
        speed={isMinimal ? 0.6 : 1.1}
        rotationIntensity={isMinimal ? 0.15 : 0.32}
        floatIntensity={isMinimal ? 0.35 : 0.55}
      >
        <mesh ref={sphere} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.32, icosaDetail]} />
          {isMinimal ? (
            <meshPhysicalMaterial
              color="#2563eb"
              emissive="#1e40af"
              emissiveIntensity={0.55}
              metalness={0.75}
              roughness={0.28}
              clearcoat={0.9}
              clearcoatRoughness={0.15}
            />
          ) : (
            <MeshDistortMaterial
              color="#3b82f6"
              emissive="#1d4ed8"
              emissiveIntensity={isMedium ? 0.28 : 0.38}
              roughness={0.22}
              metalness={0.72}
              distort={isMedium ? 0.22 : 0.36}
              speed={isMedium ? 1.4 : 2}
            />
          )}
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.65} floatIntensity={0.35}>
        <Torus
          args={[2.15, 0.045, torusSegs[0], torusSegs[1]]}
          position={[0, 0, 0]}
          rotation={[1.12, 0.42, 0]}
        >
          <meshStandardMaterial
            color="#ddd6fe"
            emissive="#6d28d9"
            emissiveIntensity={isFull ? 0.55 : 0.38}
            metalness={0.92}
            roughness={0.12}
            transparent
            opacity={0.88}
          />
        </Torus>
      </Float>

      <Sparkles
        count={sparkles}
        scale={isMinimal ? 10 : 14}
        size={isMinimal ? 1.4 : 2}
        speed={isMinimal ? 0.2 : 0.38}
        opacity={isMinimal ? 0.22 : 0.34}
        color="#7dd3fc"
      />

      {!isMinimal && (
        <Particles
          geometry={isMedium ? particleGeoMedium : particleGeoFull}
          size={isMedium ? 0.055 : 0.06}
        />
      )}
    </group>
  );
}
