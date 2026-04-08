import { motion, useScroll, useTransform } from 'framer-motion';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.92, 1, 1, 0.96]);

  useLayoutEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('.about-card', {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(99,102,241,0.08),transparent_50%)]"
      />

      <motion.div
        style={{ opacity, y, scale }}
        className="mx-auto flex max-w-5xl flex-col items-center space-y-10 text-center sm:space-y-14"
      >
        <div
          ref={copyRef}
          className="group relative rounded-2xl bg-gradient-to-br from-primary/40 via-violet-500/30 to-sky-500/25 p-[1px] transition-transform duration-500 md:rounded-3xl md:hover:scale-[1.01]"
        >
          <div className="about-card rounded-[18px] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-2xl sm:rounded-[22px] sm:p-10 md:p-14">
            <h2 className="mb-6 font-display text-3xl font-black leading-tight tracking-tighter text-white sm:mb-8 sm:text-4xl md:text-6xl">
              BORN TO <span className="text-glow text-primary">CREATE</span>,<br />
              DRIVEN BY <span className="text-sky-400">CODE</span>.
            </h2>
            <p className="mx-auto max-w-3xl text-base font-light leading-relaxed text-slate-300 sm:text-lg md:text-xl">
              I am <span className="font-semibold text-white">Rajesh Reddy</span>, a frontend developer
              focused on polished UX, design systems, and interactive 3D on the web. I bridge{' '}
              <span className="text-white">visual craft</span> and{' '}
              <span className="text-white">robust engineering</span>.
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {[
            { n: '2+', l: 'Years experience' },
            { n: '15+', l: 'Shipped projects' },
            { n: '12+', l: 'Core technologies' },
          ].map((item) => (
            <div
              key={item.l}
              className="about-card glass neon-border rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] sm:rounded-3xl sm:p-8"
            >
              <h3 className="font-display text-3xl font-black text-white sm:text-4xl">{item.n}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {item.l}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
