import { motion } from 'framer-motion';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Front-End Developer',
    company: 'Exchek Admin Portal',
    period: 'May 2025 - Present',
    description:
      'User management, roles & permissions, KYC verification with interactive document preview, leads management, RSuite components, REST API integration, and global master modules.',
    tech: ['React.js', 'RSuite', 'Redux', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
    accent: '#6366f1',
    current: true,
  },
  {
    title: 'Front-End Developer',
    company: 'AuditFY Practice Manager',
    period: 'Nov 2024 - Apr 2025',
    description:
      'Dashboard, UDIN Manager, DSC Register, assessments, and billing; dynamic UIs for compliance, tasks, and client management.',
    tech: ['React', 'JavaScript', 'REST APIs', 'HTML5', 'CSS3'],
    accent: '#38bdf8',
    current: false,
  },
  {
    title: 'Front-End Developer',
    company: 'Teacher Console',
    period: 'Nov 2023 - Oct 2024',
    description:
      'React and REST APIs for forms, Kanban workflows, and data views; real-time alerts for digital signatures and pending assessments; responsive UI/UX improvements.',
    tech: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'REST APIs'],
    accent: '#a78bfa',
    current: false,
  },
  {
    title: 'Intern — Front-End Developer',
    company: 'Chimple Student App',
    period: 'Apr 2023 - Oct 2023',
    description:
      'Assignments and users CRUD, Firestore collections, Firebase cloud functions, OTP with timer, Ionic Capacitor plugin, local storage optimizations, and Android testing.',
    tech: ['TypeScript', 'React', 'Firebase', 'JavaScript', 'HTML5', 'CSS'],
    accent: '#34d399',
    current: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 340, damping: 30 },
  },
};

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to('.exp-dot', {
        boxShadow: '0 0 20px rgba(59,130,246,0.7)',
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative z-10 px-4 py-24 sm:px-6 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_20%_50%,rgba(99,102,241,0.06),transparent_60%)]" />

      <div className="mx-auto max-w-4xl" ref={containerRef}>
        {/* Title */}
        <div className="mb-10 text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 block text-[10px] font-black uppercase tracking-[0.65em] text-primary/80"
          >
            Career
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mb-3 font-display text-3xl font-extrabold tracking-tighter text-white sm:mb-4 sm:text-4xl md:text-6xl"
          >
            PROFESSIONAL <span className="text-primary">EXPERIENCE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-slate-400"
          >
            Roles, impact, and the tools behind the work.
          </motion.p>
        </div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="relative space-y-6 sm:space-y-8"
        >
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute top-4 bottom-4 left-[15px] w-0.5 origin-top rounded-full bg-gradient-to-b from-primary/50 via-violet-500/30 to-transparent sm:left-[21px]"
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${i}`}
              variants={itemVariants}
              className="group relative pl-[3.25rem] sm:pl-16"
            >
              <div
                className="exp-dot absolute top-3 left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md sm:h-10 sm:w-10"
                style={{
                  backgroundColor: `${exp.accent}22`,
                  borderColor: `${exp.accent}55`,
                  boxShadow: `0 0 12px ${exp.accent}44`,
                }}
              >
                <Briefcase className="h-4 w-4 sm:h-[18px] sm:w-[18px]" style={{ color: exp.accent }} />
              </div>

              {exp.current && (
                <div className="absolute -top-5 left-[3.25rem] z-20 sm:left-16">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-500/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-md">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                    Current Role
                  </span>
                </div>
              )}

              <motion.div
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`glass gpu rounded-2xl border border-white/10 p-5 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(99,102,241,0.15)] sm:rounded-3xl sm:p-8 ${exp.current ? 'mt-6' : ''}`}
                style={{
                  borderTopColor: `${exp.accent}33`,
                }}
              >
                <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white sm:text-2xl">{exp.company}</h3>
                    <div className="mt-1 flex items-center gap-1.5 text-slate-400">
                      <ChevronRight size={14} style={{ color: exp.accent }} />
                      <span className="text-sm font-medium">{exp.title}</span>
                    </div>
                  </div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-sky-300 whitespace-nowrap">
                    <Calendar size={14} />
                    {exp.period}
                  </div>
                </div>

                <p className="mb-5 leading-relaxed text-slate-400 text-sm sm:text-base">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
