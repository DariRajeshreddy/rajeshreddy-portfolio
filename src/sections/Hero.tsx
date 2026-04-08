import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MousePointer2, ChevronDown } from 'lucide-react';
import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useFinePointer } from '../hooks/usePerformanceProfile';

const HeroCanvas = lazy(() =>
  import('../three/HeroCanvas').then((m) => ({ default: m.HeroCanvas }))
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const finePointer = useFinePointer();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 55, damping: 22, mass: 0.4 });
  const tiltX = useTransform(sy, [0, 1], finePointer ? [5, -5] : [0, 0]);
  const tiltY = useTransform(sx, [0, 1], finePointer ? [-5, 5] : [0, 0]);
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${sx}% ${sy}%, rgba(56,189,248,0.14), transparent 42%)`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('.hero-reveal', { opacity: 1, y: 0, scale: 1 });
        gsap.set('.hero-glow', { opacity: 0.55, scale: 1 });
        return;
      }
      gsap.from('.hero-reveal', {
        opacity: 0,
        y: 44,
        scale: 0.93,
        stagger: 0.11,
        duration: 1.1,
        ease: 'power4.out',
        delay: 2.85,
      });
      gsap.to('.hero-glow', {
        opacity: 0.72,
        scale: 1.06,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  function onMouseMove(e: React.MouseEvent) {
    if (!finePointer) return;
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  function onMouseLeave() {
    mx.set(50);
    my.set(50);
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[100dvh] min-h-screen flex-col justify-center overflow-hidden px-4 pb-28 pt-24 sm:px-6 sm:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0 min-h-[100dvh]">
        <Suspense
          fallback={
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.35)_0%,transparent_60%)]" />
          }
        >
          <ErrorBoundary>
            <HeroCanvas />
          </ErrorBoundary>
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/75 to-slate-950" />
      </div>

      {finePointer && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] opacity-90"
          style={{ background: spotlight }}
        />
      )}

      <div className="hero-glow absolute top-1/4 left-1/4 -z-10 h-[min(100vw,800px)] w-[min(100vw,800px)] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="hero-glow absolute right-1/4 bottom-1/4 -z-10 h-[min(90vw,640px)] w-[min(90vw,640px)] translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-1 text-center sm:px-4"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: reduceMotion ? 0 : 2.88,
            duration: reduceMotion ? 0.2 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hero-reveal mb-6 inline-flex max-w-[95vw] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-xl sm:mb-8 sm:px-6"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500 sm:h-3 sm:w-3" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300 sm:text-xs sm:tracking-[0.25em]">
            Frontend Developer
          </span>
        </motion.div>

        <h1 className="hero-reveal font-display text-[clamp(2.25rem,9vw,5.5rem)] font-black leading-[0.98] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl">
          RAJESH{' '}
          <span className="block bg-gradient-to-r from-sky-400 via-primary to-violet-500 bg-clip-text text-transparent md:inline">
            REDDY
          </span>
        </h1>

        <p className="hero-reveal mt-6 max-w-2xl px-1 text-base font-light leading-relaxed text-slate-400 sm:mt-8 sm:text-lg md:text-2xl">
          Crafting <span className="font-medium text-white">premium interfaces</span> with React,
          motion, and real-time 3D — where performance meets cinematic polish.
        </p>

        <div className="hero-reveal mt-10 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-12 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <motion.a
            href="#projects"
            data-cursor-hover
            whileHover={{ scale: finePointer ? 1.04 : 1 }}
            whileTap={{ scale: 0.98 }}
            className="group relative min-h-[48px] overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 px-8 py-3.5 text-center text-base font-bold text-white shadow-[0_0_40px_rgba(99,102,241,0.35)] sm:min-h-0 sm:px-10 sm:py-4 sm:text-lg"
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-3">
              View Projects
              <MousePointer2
                size={20}
                className="hidden transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:inline sm:h-[22px] sm:w-[22px]"
              />
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.a>
          <motion.a
            href="#contact"
            data-cursor-hover
            whileHover={{ scale: finePointer ? 1.03 : 1 }}
            whileTap={{ scale: 0.98 }}
            className="min-h-[48px] rounded-2xl border border-white/15 bg-white/5 px-8 py-3.5 text-center text-base font-bold text-white backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-white/10 sm:min-h-0 sm:px-10 sm:py-4 sm:text-lg"
          >
            Contact
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        animate={reduceMotion ? false : { y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-slate-500 sm:bottom-8"
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.35em] opacity-60 sm:text-[10px]">
          Scroll
        </span>
        <ChevronDown size={20} className="opacity-40 sm:h-[22px] sm:w-[22px]" />
      </motion.div>
    </section>
  );
}
