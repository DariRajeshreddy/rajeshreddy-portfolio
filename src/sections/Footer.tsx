import { motion, useInView } from 'framer-motion';
import { GraduationCap, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { GitHubDark as GitHub, LinkedIn } from '@ridemountainpig/svgl-react';
import { useRef } from 'react';

const eduData = [
  {
    degree: 'B.Com Computer Applications',
    institute: 'Mahbub Degree College',
    period: '2019 - 2022',
    grade: '8.2 CGPA',
  },
  {
    degree: 'Intermediate Education',
    institute: 'C.V.Raman Junior College',
    period: '2017 - 2019',
    grade: '8.4 CGPA',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 360, damping: 30 },
  },
};

export function Education() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="education" ref={ref} className="relative z-10 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center font-display text-2xl font-bold text-white underline decoration-primary/50 underline-offset-8 md:text-3xl"
        >
          Education
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-6 md:grid-cols-2"
        >
          {eduData.map((edu, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="glass flex items-start gap-4 rounded-3xl border border-white/10 p-8 transition-all hover:border-primary/35 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]"
            >
              <div className="rounded-2xl bg-primary/15 p-3 text-primary shrink-0">
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="mb-1.5 text-lg font-bold text-white">{edu.degree}</h3>
                <p className="mb-2 text-sm text-slate-300">{edu.institute}</p>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">{edu.period}</span>
                  <span className="font-bold text-primary">{edu.grade}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-slate-950/90 px-6 py-16 backdrop-blur-md">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <Education />

        <div className="mt-12 grid gap-10 px-2 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <div className="font-display text-2xl font-bold text-white">
              RR<span className="text-primary">.</span>
            </div>
            <p className="max-w-xs text-sm text-slate-400">
              Frontend development with emphasis on motion, performance, and beautiful design
              systems.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://github.com/DariRajeshreddy"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2.5 transition-colors hover:border-primary/30 hover:bg-primary/10"
              >
                <GitHub className="h-4 w-4 fill-current" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/rajeshkumarreddy-dari/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2.5 transition-colors hover:border-primary/30 hover:bg-primary/10"
              >
                <LinkedIn className="h-4 w-4 fill-current" />
              </motion.a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:darirajeshreddy@gmail.com"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <Mail size={15} className="text-primary shrink-0" />
                darirajeshreddy@gmail.com
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={15} className="text-primary shrink-0" />
                +91-9000631287
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin size={15} className="text-primary shrink-0" />
                Hyderabad, India
              </div>
            </div>
          </div>

          {/* Navigate */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Navigate</h4>
            <ul className="space-y-2.5">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((page) => (
                <li key={page}>
                  <a
                    href={`#${page.toLowerCase()}`}
                    className="group flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <ArrowUpRight
                      size={13}
                      className="text-primary opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                    />
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Focus</h4>
            <div className="rounded-2xl border border-primary/[0.15] bg-white/[0.03] p-4 text-sm text-slate-300 leading-relaxed">
              Building performant web experiences with React, Framer Motion, and cutting-edge UI
              design systems.
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/20 to-violet-600/20 border border-primary/20 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-primary/40"
            >
              <Mail size={14} />
              Hire me
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Rajesh Reddy. Crafted with React &amp; TypeScript.
          </p>
          <p className="text-xs text-slate-600">
            Powered by Framer Motion &amp; GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
