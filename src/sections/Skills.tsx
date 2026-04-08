import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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

type SvglIcon = typeof ReactLight;

type TechEntry =
  | { name: string; icon: SvglIcon; color: string; desc: string; variant?: 'svgl' }
  | { name: string; icon: LucideIcon; color: string; desc: string; variant: 'lucide' };

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 360, damping: 28 },
  },
};

function TechCard({ tech }: { tech: TechEntry }) {
  const Icon = tech.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.06,
        y: -6,
        rotateY: 5,
        transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
      }}
      className="group relative cursor-default"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: tech.color }}
      />
      {/* Card */}
      <div className="gpu relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.08] group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)] sm:p-6">
        {/* Icon */}
        <div className="relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
          {tech.variant === 'lucide' ? (
            <Icon
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12"
              strokeWidth={1.5}
              style={{ color: tech.color }}
            />
          ) : (
            <Icon
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12"
              style={{ color: tech.color }}
            />
          )}
        </div>
        {/* Name */}
        <p className="text-center text-xs font-bold text-white/90 sm:text-sm">{tech.name}</p>
        {/* Desc tooltip on hover */}
        <p className="max-h-0 overflow-hidden text-center text-[10px] leading-tight text-slate-500 opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">
          {tech.desc}
        </p>
        {/* Color accent bar */}
        <div
          className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full transition-all duration-500 group-hover:w-3/4"
          style={{ backgroundColor: tech.color }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(99,102,241,0.07),transparent_70%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <div ref={titleRef} className="mb-12 text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 block text-[10px] font-black uppercase tracking-[0.65em] text-violet-400/80"
          >
            Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display text-4xl font-black tracking-tighter text-white md:text-7xl"
          >
            SKILLS &amp; <span className="text-glow text-primary">TOOLS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mx-auto mt-4 max-w-md text-sm text-slate-400"
          >
            Technologies I use daily to build fast, beautiful, and accessible web applications.
          </motion.p>
        </div>

        {/* Tech grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6 lg:gap-5"
        >
          {techStack.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </motion.div>

        {/* Category tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-14"
        >
          {['Frontend', 'State Management', 'Backend', 'Database', 'Styling', 'DevOps'].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-slate-400 backdrop-blur-md"
              >
                {tag}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
