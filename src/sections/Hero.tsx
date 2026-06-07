import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { MousePointer2, ChevronDown, Sparkles, Play, Pause } from 'lucide-react';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useFinePointer } from '../hooks/usePerformanceProfile';

const INTRO_TEXT = "Hi, I'm Rajesh Reddy, a dedicated Front-End Developer with over two years of experience crafting premium, scalable web applications. I specialize in React, TypeScript, and modern UI frameworks, bringing ideas to life through pixel-perfect design and seamless performance. Welcome to my interactive portfolio. Explore my journey and let's build something amazing together.";
const INTRO_WORDS = INTRO_TEXT.split(" ");

const PARTICLES = [
  { id: 1, char: "< />", top: "15%", left: "5%", size: "text-2xl", delay: 0 },
  { id: 2, char: "{ }", top: "55%", left: "-5%", size: "text-3xl", delay: 1.2 },
  { id: 3, char: "TS", top: "20%", right: "10%", size: "text-xl", delay: 0.5 },
  { id: 4, char: "();", top: "65%", right: "-5%", size: "text-2xl", delay: 1.8 },
  { id: 5, char: "[]", top: "85%", left: "15%", size: "text-xl", delay: 2.5 },
];

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
  
  // Parallax offsets for the image
  const imgX = useTransform(sx, [0, 100], finePointer ? [-15, 15] : [0, 0]);
  const imgY = useTransform(sy, [0, 100], finePointer ? [-15, 15] : [0, 0]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const onEnded = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    
    // Ensure we have duration if it's already loaded
    if (audio.readyState >= 1) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = 1; // Force volume to max
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              if (error.name === 'AbortError') {
                // Ignore abort errors (usually caused by rapid double-clicking play/pause)
                return;
              }
              console.error("Audio playback failed:", error);
              // Fallback if browser blocks audio: fake the text animation over 15 seconds
              setIsPlaying(true);
              setDuration(15);
              let fakeTime = 0;
              const interval = setInterval(() => {
                fakeTime += 0.1;
                setCurrentTime(fakeTime);
                if (fakeTime >= 15) {
                  clearInterval(interval);
                  setIsPlaying(false);
                  setCurrentTime(0);
                }
              }, 100);
            });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // All animations are now handled smoothly by Framer Motion.
      // Removed obsolete GSAP references to prevent mobile rendering conflicts.
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
      style={{ position: 'relative' }}
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-4 pb-28 pt-24 sm:px-6 sm:pt-28"
    >
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/intro2.mp3" preload="auto" />

      {/* Base Background */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[#020617]" />

      {/* Animated gradient background overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(56,189,248,0.1),transparent_50%)]" />
      </div>

      {/* Mouse spotlight */}
      {finePointer && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] opacity-60"
          style={{ background: spotlight }}
        />
      )}

      {/* Content Grid */}
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
        className="gpu relative z-10 mx-auto flex w-full max-w-7xl flex-col lg:flex-row items-center gap-12 lg:gap-8 px-1 sm:px-4"
      >
        
        {/* Left Column - Typography & Actions */}
        <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
          {/* Status badge */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex max-w-[95vw] items-center gap-2.5 rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-2 backdrop-blur-xl sm:mb-8 sm:px-6"
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
          <div className="relative overflow-hidden">
            <h1 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[1.05] tracking-tighter text-white">
              Hi, I'm
              <br />
              <span className="relative inline-block md:inline">
                <span className="bg-gradient-to-r from-sky-400 via-primary to-violet-500 bg-clip-text text-transparent">
                  Rajesh Reddy
                </span>
                {/* Underline accent */}
                <motion.span
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: reduceMotion ? 0 : 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 block h-[3px] origin-left rounded-full bg-gradient-to-r from-sky-400 via-primary to-violet-500"
                />
              </span>
            </h1>
          </div>

          {/* Role tag */}
          <div className="mt-5 sm:mt-6">
            <span className="inline-block rounded-lg border border-white/10 bg-white/5 px-5 py-2 font-display text-sm font-bold uppercase tracking-[0.3em] text-slate-300 backdrop-blur-md sm:text-base">
              Frontend Developer
            </span>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-xl px-1 text-base font-light leading-relaxed text-slate-400 sm:mt-8 sm:text-lg">
            I build fast, scalable, and premium web applications using{' '}
            <span className="font-medium text-white">React, Framer Motion, and GSAP</span>{' '}
            — where performance meets cinematic polish.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center lg:justify-start sm:justify-center sm:gap-4">
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
              <span className="absolute inset-0 -skew-x-12 translate-x-[-200%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[200%]" />
              <span className="relative z-10 inline-flex items-center justify-center gap-3">
                View My Work
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
              className="min-h-[52px] flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-8 text-center text-base font-bold text-white backdrop-blur-md sm:min-h-0 sm:px-8 sm:py-4 sm:text-lg"
            >
              Contact Me
            </motion.a>
          </div>

          {/* Stats row */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-6 sm:gap-10"
          >
            {[
              { n: '2+', l: 'Years Exp.' },
              { n: '15+', l: 'Projects' },
              { n: '12+', l: 'Technologies' },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <p className="font-display text-2xl font-black text-white sm:text-3xl">{stat.n}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">
                  {stat.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Anime Cutout & Interactive Audio */}
        <div className="relative flex w-full justify-center lg:w-1/2">
          
          <motion.div 
            className="group relative w-full max-w-lg lg:max-w-xl cursor-pointer"
            onClick={toggleAudio}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Glowing Aura behind character */}
            <motion.div 
              className="absolute inset-0 z-0 rounded-full blur-[80px]"
              style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)' }}
              animate={isPlaying ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] } : { scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ repeat: Infinity, duration: isPlaying ? 2 : 4, ease: "easeInOut" }}
            />

            {/* Floating Tech Particles */}
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className={`absolute z-0 font-mono font-bold text-sky-400/40 select-none pointer-events-none ${p.size}`}
                style={{ top: p.top, left: p.left, right: p.right }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.6, 0.2],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{
                  duration: 5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut"
                }}
              >
                {p.char}
              </motion.div>
            ))}

            {/* Image gently floating based on audio state and tracking mouse */}
            <motion.div
              style={{ x: imgX, y: imgY }}
              className="relative z-10"
              animate={isPlaying ? { scale: [1, 1.02, 1], y: [-5, -10, -5] } : { y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: isPlaying ? 2.5 : 4, ease: "easeInOut" }}
            >
              <img
                src="/anime_cutout.png"
                alt="Rajesh Reddy Anime"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] [mask-image:linear-gradient(to_bottom,white_70%,transparent_100%)] drop-shadow-2xl"
              />
            </motion.div>

            {/* Floating Audio Play Button */}
            <div
              className={`absolute right-4 top-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full shadow-2xl backdrop-blur-md border pointer-events-none transition-transform duration-300 group-hover:scale-110 z-20 ${
                isPlaying 
                  ? 'bg-red-500/90 border-red-400 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)]' 
                  : 'bg-primary/90 border-primary/50 text-white shadow-[0_0_30px_rgba(99,102,241,0.5)]'
              }`}
            >
              {/* Idle ripple effect */}
              {!isPlaying && (
                <span className="absolute -inset-4 rounded-full border border-sky-400/30 animate-[ping_3s_ease-in-out_infinite]" />
              )}
              
              {isPlaying ? <Pause size={28} className="fill-white" /> : <Play size={28} className="fill-white ml-1" />}
              
              {isPlaying && (
                <span className="absolute -inset-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-40" />
                </span>
              )}
            </div>

            {isPlaying && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute top-full mt-4 sm:top-auto sm:-bottom-4 left-0 right-0 sm:left-4 sm:right-4 z-50 rounded-2xl border border-white/10 bg-slate-950/95 p-4 sm:p-6 backdrop-blur-xl shadow-2xl"
              >
                <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                  {INTRO_WORDS.map((word, i) => {
                    // Calculate how many words should be visible based on audio progress
                    const progress = duration > 0 ? currentTime / duration : 0;
                    const visibleWordsCount = Math.ceil(progress * INTRO_WORDS.length);
                    const isVisible = i < visibleWordsCount;
                    const isActive = i === visibleWordsCount - 1; // The exact word currently being spoken
                    
                    return (
                      <motion.span
                        key={i}
                        animate={{ 
                          opacity: isVisible ? 1 : 0.2, 
                          y: isActive ? -4 : (isVisible ? 0 : 2),
                          scale: isActive ? 1.15 : 1,
                          filter: isVisible ? 'blur(0px)' : 'blur(2px)',
                          color: isActive ? '#38bdf8' : (isVisible ? '#ffffff' : '#475569') // Sky blue for active, white for past
                        }}
                        transition={{ 
                          duration: isActive ? 0.15 : 0.25,
                          type: isActive ? "spring" : "tween",
                          stiffness: 400,
                          damping: 15
                        }}
                        className="inline-block text-sm sm:text-base font-medium shadow-sky-400/50"
                        style={{ originX: 0.5, originY: 1, textShadow: isActive ? '0 0 10px rgba(56,189,248,0.6)' : 'none' }}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>

        </div>

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
