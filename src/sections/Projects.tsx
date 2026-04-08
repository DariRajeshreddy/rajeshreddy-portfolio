import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GitHubDark as Github } from '@ridemountainpig/svgl-react';
import { useLayoutEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import gsap from 'gsap';
import img from "../assets/black.svg";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROFILE = 'https://github.com/DariRajeshreddy';

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  image: any;
}

/** Roles and stacks aligned with resume — placeholder projects removed */
const projects: ProjectItem[] = [
  {
    title: 'Exchek Admin Portal',
    description:
      'Centralized admin for user management, RBAC, KYC verification with document preview (zoom), leads management, RSuite UIs, REST APIs, and global master configuration.',
    tech: ['React.js', 'RSuite', 'Redux', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
    link: '#',
    github: PROFILE,
    image:img,
  },
  {
    title: 'AuditFY Practice Manager',
    description:
      'Office management for CA/CS: dashboards, UDIN Manager, DSC Register, assessments, billing, and real-time tracking of compliance and client work.',
    tech: ['React', 'JavaScript', 'REST APIs', 'HTML5', 'CSS3'],
    link: '#',
    github: PROFILE,
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Teacher Console',
    description:
      'React and REST APIs for interactive forms, Kanban workflows, and data-driven views; alerts for digital signature expiry and assessments; responsive UI improvements.',
    tech: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'REST APIs'],
    link: '#',
    github: PROFILE,
    image:
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Chimple Student App',
    description:
      'Internship: CRUD for assignments and users, Firestore modeling, Firebase cloud functions & OTP, Ionic Capacitor plugin, local storage performance, and Android testing.',
    tech: ['TypeScript', 'React', 'Firebase', 'JavaScript', 'HTML5', 'CSS'],
    link: '#',
    github: PROFILE,
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
  },
];

function ProjectCard({ project }: { project: ProjectItem }) {
  const finePointer = useMediaQuery('(pointer: fine)');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-120, 120], [22, -22]);
  const rotateY = useTransform(x, [-120, 120], [-22, 22]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - (rect.left + rect.width / 2));
    y.set(event.clientY - (rect.top + rect.height / 2));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={
        finePointer
          ? { rotateX, rotateY, transformPerspective: 1100 }
          : { transformPerspective: 1000 }
      }
      onMouseMove={finePointer ? handleMouseMove : undefined}
      onMouseLeave={finePointer ? handleMouseLeave : undefined}
      className="project-card group relative mb-8 w-full max-w-[100%] justify-self-center sm:mb-10 sm:max-w-sm"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-xl backdrop-blur-xl transition-all duration-500 group-hover:border-primary/45 group-hover:bg-white/[0.07] group-hover:shadow-[0_25px_80px_rgba(99,102,241,0.2)] sm:rounded-3xl sm:p-4">
        <div className="relative mb-4 h-44 overflow-hidden rounded-xl sm:mb-6 sm:h-52 sm:rounded-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="rounded-full bg-white/15 p-3 transition-colors hover:bg-white/25"
            >
              <Github width={20} height={20} />
            </a>
            <a
              href={project.link}
              data-cursor-hover
              className="rounded-full bg-primary/90 p-3 transition-colors hover:bg-primary"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-sky-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from('.projects-head', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });
      gsap.from('.project-card', {
        opacity: 0,
        y: 70,
        scale: 0.94,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.querySelector('.projects-grid'),
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative z-10 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="projects-head mb-12 text-center sm:mb-20">
          <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tighter text-white sm:mb-6 sm:text-5xl md:text-7xl">
            SELECTED <span className="text-glow text-primary">WORK</span>
          </h2>
          <p className="mx-auto max-w-lg text-slate-400">
            Professional products from my experience — stacks match my resume.
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 justify-items-stretch gap-x-6 gap-y-8 sm:justify-items-center md:grid-cols-2 md:gap-x-10 xl:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
