import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { GitHubDark as Github } from '@ridemountainpig/svgl-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface ProjectItem {
  title: string;
  description: string;
  features: string[];
  tech: string[];
  link: string;
  github: string;
  image: string;
  accent: string;
}

const projects: ProjectItem[] = [
  {
    title: 'ChefSheet',
    description: 'Efficient catering preparation manager for professional chefs to track orders, portions, and supplies.',
    features: ['Smart Portioning', 'Inventory Tracking', 'Menu Management', 'Real-time Sync'],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    link: '#',
    github: 'https://github.com/DariRajeshreddy/chefsheet',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
    accent: '#6366f1',
  },
  {
    title: 'Sri Nirmala Catering',
    description: 'A premium, high-motion website for a leading catering service, featuring menu catalog and 3D interactions.',
    features: ['3D Tilt Effects', 'Staggered Reveals', 'Responsive Menu', 'Contact Integration'],
    tech: ['Framer Motion', 'GSAP', 'React', 'Lucide'],
    link: '#',
    github: 'https://github.com/DariRajeshreddy/sri-nirmala-catering-website',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    accent: '#f43f5e',
  },
  {
    title: 'Exchek Admin Portal',
    description: 'Centralized admin for user management, RBAC, KYC verification with document preview, and leads management.',
    features: ['Advanced RBAC', 'KYC Verification', 'Leads Management', 'Global Config'],
    tech: ['React.js', 'RSuite', 'Redux', 'REST APIs'],
    link: '#',
    github: 'https://github.com/DariRajeshreddy',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    accent: '#38bdf8',
  },
  {
    title: 'AuditFY Practice Manager',
    description: 'Office management for CA/CS professionals: dashboards, UDIN Manager, DSC Register, and billing.',
    features: ['UDIN Manager', 'DSC Register', 'Billing System', 'Audit Tracking'],
    tech: ['React', 'JavaScript', 'REST APIs', 'CSS3'],
    link: '#',
    github: 'https://github.com/DariRajeshreddy',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
    accent: '#8b5cf6',
  },
  {
    title: 'Teacher Console',
    description: 'Interactive dashboard for education management involving Kanban workflows and assessment tracking.',
    features: ['Kanban Workflows', 'Alerts System', 'Data Views', 'Progress Tracking'],
    tech: ['React', 'JavaScript', 'Git', 'REST APIs'],
    link: '#',
    github: 'https://github.com/DariRajeshreddy',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800&auto=format&fit=crop',
    accent: '#34d399',
  },
  {
    title: 'Chimple Student App',
    description: 'Student-facing mobile application with Firebase backend and interactive assignments.',
    features: ['Assignments CRUD', 'Firebase Logic', 'Performance Tuning', 'Local Storage'],
    tech: ['TypeScript', 'React', 'Firebase', 'Ionic'],
    link: '#',
    github: 'https://github.com/DariRajeshreddy',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
    accent: '#f59e0b',
  },
];

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const finePointer = useMediaQuery('(pointer: fine)');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={finePointer ? (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      } : undefined}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative flex flex-col sm:flex-row gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_20px_80px_rgba(0,0,0,0.5)] [backface-visibility:hidden] [transform:translate3d(0,0,0)]"
    >
      {/* Dynamic Glow */}
      <div
        className="absolute -inset-2 -z-10 rounded-[2.5rem] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10"
        style={{ backgroundColor: project.accent }}
      />

      {/* Image Section */}
      <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-2xl sm:h-auto sm:w-72 md:w-80">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Quick Tech Overlay */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col justify-center py-2 sm:py-4">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-2xl font-black tracking-tighter text-white sm:text-3xl md:text-4xl">
            {project.title}
          </h3>
          <div className="flex gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              whileHover={{ scale: 1.1, color: '#fff' }}
              className="text-slate-400 transition-colors"
            >
              <Github width={20} height={20} />
            </motion.a>
            <motion.a
              href={project.link}
              target="_blank"
              whileHover={{ scale: 1.1, color: project.accent }}
              className="text-slate-400 transition-colors"
            >
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </div>

        <p className="mt-4 mb-6 text-sm leading-relaxed text-slate-400 sm:text-base">
          {project.description}
        </p>

        {/* Features Hidden on Mobile or in simple list */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {project.features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              <ChevronRight size={12} style={{ color: project.accent }} />
              {f}
            </div>
          ))}
        </div>

        {/* Hover Accent Line */}
        <div
          className="mt-8 h-0.5 w-0 rounded-full transition-all duration-700 group-hover:w-full"
          style={{ backgroundColor: project.accent }}
        />
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative z-10 px-4 py-24 sm:px-6 sm:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.05),transparent_80%)]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 block text-[10px] font-black uppercase tracking-[0.7em] text-primary"
          >
            Portfolio
          </motion.span>
          <h2 className="font-display text-5xl font-black tracking-tighter text-white sm:text-7xl md:text-9xl">
            SELECTED <span className="text-glow text-primary">WORKS</span>
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Global Action */}
        <div className="mt-20 flex justify-center">
          <motion.a
            href="https://github.com/DariRajeshreddy"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.02] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]"
          >
            <Github width={20} height={20} />
            Explore Full Archive
          </motion.a>
        </div>
      </div>
    </section>
  );
}
