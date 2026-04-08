import { createContext, useContext } from 'react';
import type { MutableRefObject } from 'react';
import type Lenis from '@studio-freight/lenis';

export const LenisRefContext = createContext<MutableRefObject<Lenis | null> | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisRefContext)?.current ?? null;
}
