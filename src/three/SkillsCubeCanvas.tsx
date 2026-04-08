import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { SkillsCube } from './SkillsCube';

export function SkillsCubeCanvas() {
  return (
    <Canvas
      className="h-full min-h-[280px] w-full touch-none"
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 2.85], fov: 42 }}
    >
      <Suspense fallback={null}>
        <SkillsCube />
      </Suspense>
    </Canvas>
  );
}
