import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { GitHubDark as Github } from '@ridemountainpig/svgl-react';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  image: string;
  accent: string;
  featured: boolean;
  category: 'Professional' | 'Personal';
  stats: {
    duration: string;
    teamSize: string;
    status: string;
  };
}

const projects: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Exchek Admin Portal',
    description: 'Centralized admin platform for configuring, monitoring, and managing the Exchek User Application with RBAC, KYC verification, and leads management.',
    tech: ['React.js', 'Redux', 'RSuite', 'REST APIs'],
    link: '#',
    github: '#',
    image: '/projects/exchek_admin.png',
    accent: '#10b981',
    featured: true,
    category: 'Professional',
    stats: {
      duration: 'Ongoing',
      teamSize: 'Team',
      status: 'Active',
    },
  },
  {
    id: 'p2',
    title: 'AuditFY Practice Manager',
    description: 'Office management tool for CA/CS professionals featuring real-time tracking, compliance dashboards, and automated billing workflows.',
    tech: ['React.js', 'JavaScript', 'HTML5', 'REST APIs'],
    link: '#',
    github: '#',
    image: '/projects/auditfy.png',
    accent: '#f59e0b',
    featured: false,
    category: 'Professional',
    stats: {
      duration: '6 Months',
      teamSize: 'Team',
      status: 'Completed',
    },
  },
  {
    id: 'p3',
    title: 'Teacher Console',
    description: 'Comprehensive educational dashboard for creating assignments, managing users, and executing live-quiz options using Firebase cloud functions.',
    tech: ['TypeScript', 'React.js', 'Firebase', 'Node.js'],
    link: '#',
    github: '#',
    image: '/projects/teacher_console.png',
    accent: '#38bdf8',
    featured: false,
    category: 'Professional',
    stats: {
      duration: '1 Year',
      teamSize: 'Team',
      status: 'Completed',
    },
  },
  {
    id: 'p3b',
    title: 'Chimple Student App',
    description: 'Student-facing mobile interface featuring OTP authentication, browser local storage optimization, and performance enhancements.',
    tech: ['TypeScript', 'React.js', 'Firebase', 'Ionic'],
    link: '#',
    github: '#',
    image: '/projects/chimple_app.png',
    accent: '#8b5cf6',
    featured: false,
    category: 'Professional',
    stats: {
      duration: '7 Months',
      teamSize: 'Intern',
      status: 'Completed',
    },
  },
  {
    id: 'p4',
    title: 'Nirmala Caterings',
    description: 'Comprehensive digital presence and order management interface designed specifically for local catering businesses.',
    tech: ['React', 'Node.js', 'Tailwind CSS'],
    link: 'https://nirmala-caterings.vercel.app/',
    github: 'https://github.com/DariRajeshreddy',
    image: '/projects/nirmala_caterings.png',
    accent: '#10b981',
    featured: false,
    category: 'Personal',
    stats: {
      duration: '1 Month',
      teamSize: 'Solo',
      status: 'Completed',
    },
  },
  {
    id: 'p5',
    title: 'Sri Nirmala Caterings',
    description: 'A premium, high-motion website for a leading catering service, featuring menu catalog and 3D interactions.',
    tech: ['Framer Motion', 'GSAP', 'React', 'Lucide'],
    link: 'https://sri-nirmala-catering-website.vercel.app/',
    github: 'https://github.com/DariRajeshreddy/sri-nirmala-catering-website',
    image: '/projects/sri_nirmala.png',
    accent: '#f43f5e',
    featured: true,
    category: 'Personal',
    stats: {
      duration: '4 Weeks',
      teamSize: 'Solo',
      status: 'Completed',
    },
  },
  {
    id: 'p6',
    title: 'ChefSheet',
    description: 'Efficient catering preparation manager for professional chefs to track orders, portions, and supplies with real-time sync.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    link: 'https://sri-nirmala-catering-website-c9ek.vercel.app/',
    github: 'https://github.com/DariRajeshreddy/chefsheet',
    image: '/projects/chefsheet.png',
    accent: '#6366f1',
    featured: true,
    category: 'Personal',
    stats: {
      duration: '2 Months',
      teamSize: 'Solo',
      status: 'Completed',
    },
  },
  {
    id: 'p7',
    title: 'My Portfolio',
    description: 'A highly immersive personal portfolio featuring 3D tilt effects, custom cursors, smooth scroll, and meticulously crafted micro-interactions.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'GSAP'],
    link: 'https://rajeshreddy-portfolio.vercel.app',
    github: 'https://github.com/DariRajeshreddy/rajeshreddy-portfolio',
    image: '/projects/portfolio.png',
    accent: '#8b5cf6',
    featured: true,
    category: 'Personal',
    stats: {
      duration: '1 Month',
      teamSize: 'Solo',
      status: 'Continuous',
    },
  },
  {
    id: 'p8',
    title: 'Vibhav Birthday Website',
    description: 'A cinematic and interactive birthday journey featuring auto-scrolling timelines, personalized messages, and dynamic media playback with synchronized audio.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://vibhav-reddy-birthday.vercel.app/',
    github: 'https://github.com/DariRajeshreddy',
    image: '/projects/vibhav_birthday.png',
    accent: '#f43f5e',
    featured: true,
    category: 'Personal',
    stats: {
      duration: '3 Weeks',
      teamSize: 'Solo',
      status: 'Completed',
    },
  },
];

const FILTERS = ['All', 'React', 'TypeScript', 'Flutter', 'Node.js'];

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 sm:p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
    >
      {/* Glow Effect */}
      <div
        className="absolute -inset-px -z-10 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-20"
        style={{ backgroundColor: project.accent }}
      />

      {/* Image Container */}
      <div className="relative mb-6 h-64 w-full overflow-hidden rounded-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-black/20 to-transparent opacity-80" />
        
        {project.featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md border border-amber-400/20">
            <Star size={14} className="fill-amber-400" />
            Featured
          </div>
        )}

        {/* Tech Stack Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-lg bg-white/10 px-2.5 py-1 text-[10px] sm:text-xs font-bold tracking-wide text-white backdrop-blur-md border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 font-display text-2xl font-bold tracking-tight text-white">
          {project.title}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl bg-black/20 p-4 border border-white/5">
          <div>
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Duration</div>
            <div className="text-xs font-medium text-slate-300">{project.stats.duration}</div>
          </div>
          <div>
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Team</div>
            <div className="text-xs font-medium text-slate-300">{project.stats.teamSize}</div>
          </div>
          <div>
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Status</div>
            <div className="text-xs font-medium text-slate-300">{project.stats.status}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
          {project.link !== '#' && project.link !== '' && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {project.github !== '#' && project.github !== '' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center rounded-xl bg-white/5 p-3 text-white transition-all hover:bg-white/10 ${project.link === '#' ? 'flex-1' : ''}`}
              aria-label="GitHub Repository"
            >
              <Github width={20} height={20} />
              {project.link === '#' && <span className="ml-2 font-semibold text-sm">View Source</span>}
            </a>
          )}
          {(project.link === '#' || project.link === '') && (project.github === '#' || project.github === '') && (
            <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-slate-400 opacity-60">
              Corporate / NDA Protected
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.tech.includes(activeFilter);
  });

  const professionalProjects = filteredProjects.filter((p) => p.category === 'Professional');
  const personalProjects = filteredProjects.filter((p) => p.category === 'Personal');

  return (
    <section id="projects" className="relative z-10 px-4 py-24 sm:px-6 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.05),transparent_80%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 block text-[10px] font-black uppercase tracking-[0.7em] text-primary"
          >
            Portfolio
          </motion.span>
          <h2 className="font-display text-4xl font-black tracking-tighter text-white sm:text-6xl md:text-8xl">
            SELECTED <span className="text-glow text-primary">WORKS</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="mb-16 flex flex-wrap justify-center gap-2 sm:gap-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="active-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/20 border border-primary/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              {filter}
            </button>
          ))}
        </div>

        {/* Professional Projects Section */}
        {professionalProjects.length > 0 && (
          <div className="mb-20">
            <div className="mb-8 flex items-center gap-4">
              <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Professional Projects
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:gap-8">
              <AnimatePresence mode="popLayout">
                {professionalProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* Personal Projects Section */}
        {personalProjects.length > 0 && (
          <div className="mb-10">
            <div className="mb-8 flex items-center gap-4">
              <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Personal Projects
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:gap-8">
              <AnimatePresence mode="popLayout">
                {personalProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-slate-500"
          >
            No projects found for this category.
          </motion.div>
        )}

        <div className="mt-20 flex justify-center">
          <motion.a
            href="https://github.com/DariRajeshreddy"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.02] px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]"
          >
            <Github width={20} height={20} />
            Explore GitHub
          </motion.a>
        </div>
      </div>
    </section>
  );
}
