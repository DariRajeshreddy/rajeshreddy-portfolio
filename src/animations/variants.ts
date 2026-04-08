import type { Variants } from 'framer-motion';

const smooth = [0.22, 1, 0.36, 1] as const;

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: smooth },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.38, ease: [0.4, 0, 1, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 420,
      damping: 34,
      mass: 0.85,
    },
  },
};

/** Lighter motion for `prefers-reduced-motion`. */
export const fadeUpSimple: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: smooth },
  },
};
