import { useMediaQuery } from './useMediaQuery';

/** Drives 3D density, Lenis, and motion intensity. */
export type PerformanceProfile = 'full' | 'medium' | 'minimal';

export function usePerformanceProfile(): PerformanceProfile {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const narrow = useMediaQuery('(max-width: 767px)');
  const tablet = useMediaQuery('(max-width: 1023px)');

  if (reduceMotion || narrow) return 'minimal';
  if (tablet) return 'medium';
  return 'full';
}

export function useFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)');
}
