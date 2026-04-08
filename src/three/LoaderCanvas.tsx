import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { LoaderScene } from './LoaderScene';

export function LoaderCanvas() {
  return (
    <Canvas
      className="h-48 w-48 md:h-56 md:w-56"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4.2], fov: 50 }}
    >
      <Suspense fallback={null}>
        <LoaderScene />
      </Suspense>
    </Canvas>
  );
}
