import { motion } from 'framer-motion';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import { Code2, Zap, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    color: '#6366f1',
    label: 'Clean Code',
    desc: 'Structured, typed, & maintainable',
  },
  {
    icon: Zap,
    color: '#f59e0b',
    label: 'Performance',
    desc: 'Optimized renders & fast load',
  },
  {
    icon: Globe,
    color: '#38bdf8',
    label: 'Responsive',
    desc: 'Pixel-perfect across all devices',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 380, damping: 30 },
  },
};

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('.about-stat', {
        opacity: 0,
        y: 50,
        scale: 0.9,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="relative z-10 px-4 py-24 sm:px-6 sm:py-32"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(99,102,241,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-violet-500/5 blur-[80px]" />

      <div className="mx-auto flex max-w-5xl flex-col items-center space-y-10 text-center sm:space-y-14">
        {/* Section label */}
        <motion.div
           initial={{ opacity: 0, y: 16 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.65em] text-violet-400/80">
            About
          </span>
        </motion.div>

        {/* Main bio card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="group relative w-full rounded-2xl bg-gradient-to-br from-primary/40 via-violet-500/30 to-sky-500/25 p-[1px] transition-transform duration-500 md:rounded-3xl md:hover:scale-[1.01]"
        >
          <div className="rounded-[18px] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-2xl sm:rounded-[22px] sm:p-10 md:p-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mb-6 font-display text-3xl font-black leading-tight tracking-tighter text-white sm:mb-8 sm:text-4xl md:text-6xl"
            >
              BORN TO <span className="text-glow text-primary">CREATE</span>,<br />
              DRIVEN BY <span className="text-sky-400">CODE</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="mx-auto max-w-3xl text-sm font-light leading-relaxed text-slate-300 sm:text-lg md:text-xl"
            >
              I am <span className="font-semibold text-white">Rajesh Reddy</span>, a frontend
              developer focused on polished UX, design systems, and high-performance interfaces. I
              bridge <span className="text-white">visual craft</span> and{' '}
              <span className="text-white">robust engineering</span> to build products that
              recruiters, users, and clients love.
            </motion.p>

            {/* Highlight pills - Grid Optimized for Mobile Alignment */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4"
            >
              {highlights.map((h) => (
                <motion.div
                  key={h.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md hover:bg-white/8 transition-colors"
                >
                  <div className="shrink-0">
                    <h.icon size={20} style={{ color: h.color }} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">{h.label}</p>
                    <p className="text-[10px] leading-tight text-slate-500">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <div ref={statsRef} className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {[
            { n: '2+', l: 'Years Experience', color: '#6366f1' },
            { n: '15+', l: 'Shipped Projects', color: '#38bdf8' },
            { n: '12+', l: 'Core Technologies', color: '#8b5cf6' },
          ].map((item) => (
            <div
              key={item.l}
              className="about-stat glass neon-border group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] sm:rounded-3xl sm:p-8"
            >
              {/* Glow accent */}
              <div
                className="absolute -top-4 -left-4 h-16 w-16 rounded-full blur-2xl opacity-30 transition-opacity group-hover:opacity-60"
                style={{ backgroundColor: item.color }}
              />
              <h3 className="relative font-display text-3xl font-black text-white sm:text-4xl">
                {item.n}
              </h3>
              <p className="relative mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {item.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
