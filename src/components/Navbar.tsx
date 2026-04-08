import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';
import { useState } from 'react';
import { GitHubDark as GitHub, LinkedIn } from '@ridemountainpig/svgl-react';
import { useAppStore } from '../store/useAppStore';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useAppStore((s) => s.activeSection);

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:px-4 md:px-6 md:py-4"
      style={{ paddingLeft: 'max(0.75rem, env(safe-area-inset-left))', paddingRight: 'max(0.75rem, env(safe-area-inset-right))' }}
    >
      <div className="gpu glass neon-border mx-auto flex max-w-7xl min-h-[52px] items-center justify-between rounded-xl px-3 py-2.5 backdrop-blur-md sm:rounded-2xl sm:px-4 sm:py-3 md:min-h-0 md:px-6">
        <motion.a
          href="#hero"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display text-xl font-bold tracking-tighter text-white md:text-2xl"
        >
          RR<span className="text-primary">.</span>
        </motion.a>

        <div className="hidden items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 md:flex lg:gap-2">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            const active = activeSection === id;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                data-cursor-hover
                whileHover={{ y: -1 }}
                className={`relative rounded-full px-3 py-2 transition-colors duration-200 ${
                  active ? 'text-white' : 'hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary/20 ring-1 ring-primary/40"
                    transition={{ type: 'spring' as const, stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </motion.a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://github.com/DariRajeshreddy"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="group text-slate-400 transition-colors hover:text-white"
            >
              <GitHub className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110" />
            </a>
            <a
              href="https://www.linkedin.com/in/rajeshkumarreddy-dari/"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="group text-slate-400 transition-colors hover:text-white"
            >
              <LinkedIn className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110" />
            </a>
            <a
              href="mailto:darirajeshreddy@gmail.com"
              data-cursor-hover
              className="group text-slate-400 transition-colors hover:text-white"
            >
              <Mail size={18} className="transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>

          <div className="hidden h-6 w-px bg-white/10 md:block" />

          {/* Hire Me Button replaced theme toggle for better conversion */}
          <motion.a
            href="#contact"
            data-cursor-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary ring-1 ring-primary/30 transition-all hover:bg-primary/20 hover:ring-primary/50 sm:block"
          >
            Hire Me
          </motion.a>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="glass neon-border mx-auto mt-3 flex max-w-7xl flex-col gap-4 overflow-hidden rounded-2xl p-6 md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`text-center text-lg font-bold uppercase tracking-[0.2em] ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-primary'
                    : 'text-slate-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="flex justify-center gap-8 border-t border-white/10 pt-6">
              <a href="https://github.com/DariRajeshreddy" target="_blank" rel="noreferrer">
                <GitHub className="h-6 w-6 fill-current text-slate-300 transition-colors hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/in/rajeshkumarreddy-dari/" target="_blank" rel="noreferrer">
                <LinkedIn className="h-6 w-6 fill-current text-slate-300 transition-colors hover:text-white" />
              </a>
              <a href="mailto:darirajeshreddy@gmail.com">
                <Mail size={24} className="text-slate-300 transition-colors hover:text-white" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
