import type { MotionValue } from 'framer-motion';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { lazy, Suspense, useRef } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useSkillsScrollVh } from '../hooks/useSectionScrollHeight';
import {
  CSS,
  Firebase,
  GitHubDark,
  HTML5,
  JavaScript,
  MySQLDark,
  Nodejs,
  ReactLight,
  Redux,
  TailwindCSS,
  TypeScript,
  
} from '@ridemountainpig/svgl-react';
import type { LucideIcon } from 'lucide-react';
import { Boxes } from 'lucide-react';

const SkillsCubeCanvas = lazy(() =>
  import('../three/SkillsCubeCanvas').then((m) => ({ default: m.SkillsCubeCanvas }))
);

type SvglIcon = typeof ReactLight;

type TechEntry =
  | { name: string; icon: SvglIcon; color: string; desc: string; variant?: 'svgl' }
  | { name: string; icon: LucideIcon; color: string; desc: string; variant: 'lucide' };

/** Resume stack + Tailwind, Redux & Zustand for app state */
const techStack: TechEntry[] = [
  { name: 'React', icon: ReactLight, color: '#61DAFB', desc: 'Components, hooks & responsive UIs' },
  { name: 'JavaScript', icon: JavaScript, color: '#F7DF1E', desc: 'ES6+ logic & modern APIs' },
  { name: 'TypeScript', icon: TypeScript, color: '#3178C6', desc: 'Typed, maintainable frontends' },
  { name: 'Redux', icon: Redux, color: '#764ABC', desc: 'Global store & predictable updates' },
  {
    name: 'Zustand',
    icon: Boxes,
    color: '#EAB308',
    desc: 'Lightweight slice-based state',
    variant: 'lucide',
  },
  { name: 'Node.js', icon: Nodejs, color: '#339933', desc: 'Backend JS & API integration' },
  { name: 'Firebase', icon: Firebase, color: '#FFCA28', desc: 'Auth, Firestore & cloud functions' },
  { name: 'MySQL', icon: MySQLDark, color: '#4479A1', desc: 'Relational data & queries' },
  { name: 'HTML5', icon: HTML5, color: '#E34F26', desc: 'Semantic structure & markup' },
  { name: 'CSS', icon: CSS, color: '#264DE4', desc: 'Layout, styling & responsive CSS3' },
  { name: 'Tailwind CSS', icon: TailwindCSS, color: '#06B6D4', desc: 'Utility-first styling' },
  { name: 'GitHub', icon: GitHubDark, color: '#E6EDF3', desc: 'Git workflow & collaboration' },
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const showCube = useMediaQuery('(min-width: 1024px)');
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: showCube ? 28 : 32,
    damping: showCube ? 36 : 40,
    restDelta: 0.0001,
  });

  const total = techStack.length;
  const segment = 0.88 / total;
  const scrollVh = useSkillsScrollVh(total);

  return (
    <div
      ref={containerRef}
      id="skills"
      className="relative w-full bg-slate-950"
      style={{ height: `${scrollVh}vh` }}
    >
      <div className="sticky top-0 flex min-h-[100dvh] h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        <div className="pointer-events-none absolute top-10 left-1/2 z-20 w-full max-w-4xl -translate-x-1/2 px-4 text-center sm:top-14 sm:px-6">
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]),
              y: useTransform(smoothProgress, [0, 0.06], [24, 0]),
            }}
          >
            <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.65em] text-violet-400/80">
              Stack
            </span>
            <h2 className="font-display text-4xl font-black tracking-tighter text-white md:text-7xl">
              SKILLS &amp; <span className="text-glow text-primary">TOOLS</span>
            </h2>
          </motion.div>
        </div>

        <div className="relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-center gap-6 px-3 sm:px-4 lg:flex-row lg:gap-16">
          <div className="perspective-[1400px] flex min-h-[45vh] flex-1 items-center justify-center lg:min-h-0">
            {techStack.map((tech, i) => (
              <TechCard
                key={tech.name}
                tech={tech}
                index={i}
                segment={segment}
                progress={smoothProgress}
              />
            ))}
          </div>

          {showCube && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="glass neon-border relative h-[min(52vh,420px)] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-0 right-0 z-10 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
                Rotating skill cube
              </p>
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center text-slate-600">
                    Loading 3D…
                  </div>
                }
              >
                <ErrorBoundary>
                  <SkillsCubeCanvas />
                </ErrorBoundary>
              </Suspense>
            </motion.div>
          )}
        </div>

        <div className="pointer-events-none absolute right-3 bottom-6 flex flex-col items-end gap-2 opacity-40 sm:right-6 md:right-12 md:bottom-8">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
            scroll depth
          </span>
          <div className="relative h-28 w-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
              className="absolute inset-0 bg-gradient-to-b from-sky-500 to-violet-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TechCard({
  tech,
  index,
  segment,
  progress,
}: {
  tech: TechEntry;
  index: number;
  segment: number;
  progress: MotionValue<number>;
}) {
  const narrow = useMediaQuery('(max-width: 767px)');
  const startAt = 0.06 + index * segment;
  const finishAt = 0.06 + (index + 1) * segment;
  const peakAt = (startAt + finishAt) / 2;

  const z = useTransform(
    progress,
    [startAt - 0.06, peakAt, finishAt + 0.06],
    narrow ? [-620, 0, 880] : [-900, 0, 1200]
  );
  const opacity = useTransform(
    progress,
    [startAt - 0.03, startAt, peakAt, finishAt, finishAt + 0.03],
    [0, 0.25, 1, 0.25, 0]
  );
  const scale = useTransform(
    progress,
    [startAt, peakAt, finishAt],
    narrow ? [0.52, 1.06, 2.05] : [0.45, 1.15, 3.2]
  );

  const Icon = tech.icon;

  return (
    <motion.div
      style={{
        z,
        opacity,
        scale,
        position: 'absolute',
        transformStyle: 'preserve-3d',
      }}
      className="flex flex-col items-center justify-center will-change-transform"
    >
      <motion.div
        whileHover={{ scale: 1.06 }}
        className="group relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 rounded-[3rem] opacity-30 blur-[80px] transition-opacity group-hover:opacity-50"
          style={{ backgroundColor: tech.color }}
        />
        <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_50px_rgba(99,102,241,0.25)] sm:rounded-[2.5rem] sm:p-10 md:rounded-[3rem] md:p-16">
          {tech.variant === 'lucide' ? (
            <Icon
              className="h-20 w-20 text-amber-400 drop-shadow-2xl sm:h-24 sm:w-24 md:h-36 md:w-36"
              strokeWidth={1.25}
            />
          ) : (
            <Icon
              className="h-20 w-20 drop-shadow-2xl sm:h-24 sm:w-24 md:h-36 md:w-36"
              style={{ color: tech.color }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-white/10 via-transparent to-transparent" />
        </div>
      </motion.div>

      <div className="mt-6 max-w-[92vw] text-center sm:mt-10 md:mt-12">
        <h3 className="font-display text-3xl font-black tracking-tighter text-white sm:text-4xl md:text-6xl lg:text-7xl">
          {tech.name.toUpperCase()}
        </h3>
        <motion.p
          style={{
            opacity: useTransform(progress, [peakAt - 0.02, peakAt, peakAt + 0.02], [0, 1, 0]),
          }}
          className="mt-3 inline-flex max-w-[95vw] flex-wrap items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[8px] font-black uppercase tracking-[0.28em] text-sky-300 sm:mt-4 sm:px-6 sm:text-[10px] sm:tracking-[0.4em]"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
          {tech.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}
