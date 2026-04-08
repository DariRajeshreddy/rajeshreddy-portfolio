import { useMediaQuery } from './useMediaQuery';

/** Shorter skills scroll track on small viewports (better mobile UX + less scroll jank). */
export function useSkillsScrollVh(itemCount: number): number {
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isMd = useMediaQuery('(min-width: 768px)');

  if (isLg) return Math.max(520, itemCount * 92);
  if (isMd) return Math.max(400, itemCount * 62);
  return Math.max(300, itemCount * 48);
}
