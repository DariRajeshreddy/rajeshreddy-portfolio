import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { MousePointer2, ChevronDown, Sparkles } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useFinePointer } from '../hooks/usePerformanceProfile';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const finePointer = useFinePointer();

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 55, damping: 22, mass: 0.4 });
  const tiltX = useTransform(sy, [0, 100], finePointer ? [3, -3] : [0, 0]);
  const tiltY = useTransform(sx, [0, 100], finePointer ? [-3, 3] : [0, 0]);
  const spotlight = useMotionTemplate`radial-gradient(450px circle at ${sx}% ${sy}%, rgba(56,189,248,0.1), transparent 45%)`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('.hero-reveal', { opacity: 1, y: 0, scale: 1 });
        gsap.set('.hero-glow', { opacity: 0.55, scale: 1 });
        return;
      }
      // Staggered reveal animation
      gsap.from('.hero-reveal', {
        opacity: 0,
        y: 44,
        scale: 0.93,
        stagger: 0.11,
        duration: 1.1,
        ease: 'power4.out',
        delay: 2.2,
      });
      // Pulsing glow orbs
      gsap.to('.hero-glow', {
        opacity: 0.72,
        scale: 1.06,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      // Floating particles
      gsap.to('.hero-particle', {
        y: '-=15',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.3,
          from: 'random',
        },
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
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-4 pb-28 pt-24 sm:px-6 sm:pt-28"
    >
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
        {/* Primary radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.2),transparent_60%)]" />
        {/* Secondary accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(56,189,248,0.06),transparent_50%)]" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />
      </div>

      {/* Floating glow orbs */}
      <div className="hero-glow pointer-events-none absolute top-1/4 left-1/4 -z-10 h-[min(80vw,700px)] w-[min(80vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      <div className="hero-glow pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-[min(70vw,550px)] w-[min(70vw,550px)] translate-x-1/2 translate-y-1/2 rounded-full bg-violet-500/8 blur-[80px]" />

      {/* Floating particles */}
      {!reduceMotion && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="hero-particle pointer-events-none absolute rounded-full bg-primary/20"
              style={{
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                left: `${15 + i * 14}%`,
                top: `${25 + (i % 2) * 30}%`,
                opacity: 0.3 + (i % 2) * 0.1,
              }}
            />
          ))}
        </>
      )}

      {/* Mouse spotlight */}
      {finePointer && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] opacity-60"
          style={{ background: spotlight }}
        />
      )}

      {/* Content */}
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
        className="gpu relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-1 text-center sm:px-4"
      >
        {/* Status badge */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 2.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hero-reveal mb-6 inline-flex max-w-[95vw] items-center gap-2.5 rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-2 backdrop-blur-xl sm:mb-8 sm:px-6"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500 sm:h-3 sm:w-3" />
          </span>
          <Sparkles size={13} className="text-sky-400/70" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300 sm:text-xs sm:tracking-[0.25em]">
            Open to Opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="hero-reveal relative overflow-hidden">
          <h1 className="font-display text-[clamp(2.5rem,10vw,6rem)] font-black leading-[0.95] tracking-tighter text-white">
            RAJESH{' '}
            <span className="relative inline-block md:inline">
              <span className="bg-gradient-to-r from-sky-400 via-primary to-violet-500 bg-clip-text text-transparent">
                REDDY
              </span>
              {/* Underline accent */}
              <motion.span
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: reduceMotion ? 0 : 3.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 right-0 block h-[3px] origin-left rounded-full bg-gradient-to-r from-sky-400 via-primary to-violet-500"
              />
            </span>
          </h1>
        </div>

        {/* Role tag */}
        <div className="hero-reveal mt-5 sm:mt-6">
          <span className="inline-block rounded-lg border border-white/10 bg-white/5 px-5 py-2 font-display text-sm font-bold uppercase tracking-[0.3em] text-slate-300 backdrop-blur-md sm:text-base">
            Frontend Developer
          </span>
        </div>

        {/* Description */}
        <p className="hero-reveal mt-6 max-w-2xl px-1 text-base font-light leading-relaxed text-slate-400 sm:mt-8 sm:text-lg md:text-xl">
          Crafting{' '}
          <span className="font-medium text-white">premium interfaces</span> with React, Framer
          Motion, and GSAP — where performance meets cinematic polish.
        </p>

        {/* CTA buttons */}
        <div className="hero-reveal mt-10 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-12 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <motion.a
            href="#projects"
            data-cursor-hover
            whileHover={
              finePointer
                ? { scale: 1.04, boxShadow: '0 0 60px rgba(99,102,241,0.55)' }
                : undefined
            }
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="group relative min-h-[52px] overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 px-8 py-3.5 text-center text-base font-bold text-white shadow-[0_0_40px_rgba(99,102,241,0.35)] sm:min-h-0 sm:px-10 sm:py-4 sm:text-lg"
          >
            {/* Shimmer sweep on hover */}
            <span className="absolute inset-0 -skew-x-12 translate-x-[-200%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[200%]" />
            <span className="relative z-10 inline-flex items-center justify-center gap-3">
              View Projects
              <MousePointer2
                size={20}
                className="hidden transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:inline sm:h-[22px] sm:w-[22px]"
              />
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            data-cursor-hover
            whileHover={
              finePointer
                ? { scale: 1.03, borderColor: 'rgba(99,102,241,0.5)', backgroundColor: 'rgba(99,102,241,0.1)' }
                : undefined
            }
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="min-h-[52px] rounded-2xl border border-white/15 bg-white/5 px-8 py-3.5 text-center text-base font-bold text-white backdrop-blur-md sm:min-h-0 sm:px-10 sm:py-4 sm:text-lg"
          >
            Contact Me
          </motion.a>
        </div>

        {/* Stats row */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 3.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-reveal mt-14 flex items-center gap-6 sm:gap-10"
        >
          {[
            { n: '2+', l: 'Years Exp.' },
            { n: '15+', l: 'Projects' },
            { n: '12+', l: 'Technologies' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-2xl font-black text-white sm:text-3xl">{stat.n}</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">
                {stat.l}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
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
