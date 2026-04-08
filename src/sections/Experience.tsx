import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Front-End Developer',
    company: 'Exchek Admin Portal',
    period: 'May 2025 - Present',
    description:
      'User management, roles & permissions, KYC verification with interactive document preview, leads management, RSuite components, REST API integration, and global master modules.',
    tech: ['React.js', 'RSuite', 'Redux', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
  },
  {
    title: 'Front-End Developer',
    company: 'AuditFY Practice Manager',
    period: 'Nov 2024 - Apr 2025',
    description:
      'Dashboard, UDIN Manager, DSC Register, assessments, and billing; dynamic UIs for compliance, tasks, and client management.',
    tech: ['React', 'JavaScript', 'REST APIs', 'HTML5', 'CSS3'],
  },
  {
    title: 'Front-End Developer',
    company: 'Teacher Console',
    period: 'Nov 2023 - Oct 2024',
    description:
      'React and REST APIs for forms, Kanban workflows, and data views; real-time alerts for digital signatures and pending assessments; responsive UI/UX improvements.',
    tech: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'REST APIs'],
  },
  {
    title: 'Intern — Front-End Developer',
    company: 'Chimple Student App',
    period: 'Apr 2023 - Oct 2023',
    description:
      'Assignments and users CRUD, Firestore collections, Firebase cloud functions, OTP with timer, Ionic Capacitor plugin, local storage optimizations, and Android testing.',
    tech: ['TypeScript', 'React', 'Firebase', 'JavaScript', 'HTML5', 'CSS'],
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-head', {
        opacity: 0,
        y: 36,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      gsap.from('.exp-item', {
        opacity: 0,
        x: -40,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-4xl" ref={containerRef}>
        <div className="exp-head mb-10 text-center sm:mb-16">
          <h2 className="mb-3 font-display text-3xl font-extrabold tracking-tighter text-white sm:mb-4 sm:text-4xl md:text-6xl">
            PROFESSIONAL <span className="text-primary">EXPERIENCE</span>
          </h2>
          <p className="text-slate-400">Roles, impact, and the tools behind the work.</p>
        </div>

        <div className="relative space-y-8 before:absolute before:top-4 before:bottom-4 before:left-[15px] before:w-0.5 before:bg-gradient-to-b before:from-primary/40 before:via-white/10 before:to-violet-500/30 sm:space-y-12 sm:before:left-[21px]">
          {experiences.map((exp, i) => (
            <div key={`${exp.company}-${i}`} className="exp-item relative pl-[3.25rem] sm:pl-16">
              <div className="absolute top-2 left-0 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-primary/35 bg-slate-950/80 shadow-[0_0_18px_rgba(59,130,246,0.35)] backdrop-blur-md sm:h-11 sm:w-11">
                <Briefcase className="h-[18px] w-[18px] text-primary sm:h-5 sm:w-5" />
              </div>

              <div className="glass neon-border rounded-2xl border border-white/10 p-5 transition-transform duration-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.12)] sm:rounded-3xl sm:p-8 md:hover:scale-[1.01]">
                <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1 text-sm font-semibold text-sky-300">
                    <Calendar size={16} />
                    {exp.period}
                  </div>
                </div>
                <h4 className="mb-4 text-lg font-medium text-slate-300">{exp.title}</h4>
                <p className="mb-6 leading-relaxed text-slate-400">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
