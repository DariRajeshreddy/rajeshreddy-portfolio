import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import { usePerformanceProfile } from '../hooks/usePerformanceProfile';
import { HeroScene } from './HeroScene';

function Fallback() {
  return (
    <mesh>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#1e3a8a" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function ScrollParallaxCamera({ enabled }: { enabled: boolean }) {
  useFrame(({ camera }) => {
    if (!enabled) return;
    const y =
      typeof window !== 'undefined'
        ? window.scrollY || document.documentElement.scrollTop
        : 0;
    const targetZ = 7.5 + Math.min(y * 0.001, 2.4);
    const targetY = -Math.min(y * 0.00022, 0.55);
    const cam = camera as THREE.PerspectiveCamera;
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, 0.06);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetY, 0.06);
  });
  return null;
}

export function HeroCanvas() {
  const profile = usePerformanceProfile();
  const isMinimal = profile === 'minimal';

  const dpr: [number, number] =
    profile === 'full' ? [1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1.5)] : [1, 1.35];

  return (
    <Canvas
      className="h-full w-full touch-none"
      dpr={dpr}
      gl={{
        antialias: !isMinimal,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 7.5], fov: profile === 'minimal' ? 48 : 45 }}
      frameloop="always"
    >
      <color attach="background" args={['transparent']} />
      <ScrollParallaxCamera enabled={!isMinimal} />
      <Suspense fallback={<Fallback />}>
        <HeroScene profile={profile} />
      </Suspense>
    </Canvas>
  );
}
