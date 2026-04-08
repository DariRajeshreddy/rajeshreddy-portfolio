import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import {
  GitHubDark as Github,
  LinkedIn as Linkedin,
  XDark as Twitter,
} from '@ridemountainpig/svgl-react';
import { fadeUpItem, fadeUpSimple, staggerContainer } from '../animations/variants';
import { useMediaQuery } from '../hooks/useMediaQuery';

const socialLinks = [
  { icon: <Github width={24} height={24} />, label: 'GitHub', link: 'https://github.com/DariRajeshreddy' },
  {
    icon: <Linkedin width={24} height={24} />,
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/rajeshkumarreddy-dari/',
  },
  { icon: <Twitter width={24} height={24} />, label: 'Twitter', link: '#' },
];

const reduceStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Contact() {
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery('(pointer: fine)');
  const fadeVariant = reduceMotion ? fadeUpSimple : fadeUpItem;
  const containerVariant = reduceMotion ? reduceStagger : staggerContainer;

  return (
    <section id="contact" className="relative z-10 overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 sm:gap-16 md:grid-cols-2">
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-8 sm:space-y-12"
          >
            <motion.div variants={fadeVariant}>
              <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tighter text-white sm:mb-6 sm:text-5xl md:text-7xl">
                LET&apos;S <span className="text-glow text-primary">CONNECT</span>
              </h2>
              <p className="max-w-md text-sm text-slate-400 sm:text-base">
                New projects, collaborations, or a quick hello — I&apos;m happy to hear from you.
              </p>
            </motion.div>

            <motion.div variants={fadeVariant} className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3 text-slate-300 sm:items-center sm:gap-4">
                <div className="shrink-0 rounded-2xl border border-primary/25 bg-primary/10 p-2.5 text-primary sm:p-3">
                  <Mail size={22} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Email
                  </p>
                  <p className="break-all text-base font-bold sm:text-xl">
                    darirajeshreddy@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-300 sm:gap-4">
                <div className="shrink-0 rounded-2xl border border-primary/25 bg-primary/10 p-2.5 text-primary sm:p-3">
                  <Phone size={22} className="sm:h-6 sm:w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Phone
                  </p>
                  <p className="text-base font-bold sm:text-xl">+91-9000631287</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeVariant} className="flex flex-wrap gap-2 sm:gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  whileHover={
                    finePointer && !reduceMotion
                      ? { scale: 1.06, rotateX: 10, rotateY: -10, z: 20 }
                      : undefined
                  }
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="min-h-[48px] min-w-[48px] rounded-2xl border border-white/10 bg-white/5 p-3 text-white backdrop-blur-md transition-shadow hover:border-primary/45 hover:shadow-[0_0_28px_rgba(99,102,241,0.22)] sm:min-h-0 sm:min-w-0 sm:p-4"
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0.3 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="glass neon-border relative rounded-2xl border border-white/10 p-6 shadow-2xl sm:rounded-3xl sm:p-10"
          >
            <div className="pointer-events-none absolute top-0 right-0 p-6 font-display text-7xl font-black text-white/5 select-none sm:p-8 sm:text-9xl">
              @
            </div>
            <form
              className="relative z-10 space-y-5 sm:space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <label htmlFor={field.id} className="ml-1 text-sm font-semibold text-slate-400">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="min-h-[48px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 font-medium text-white placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:min-h-0 sm:px-5 sm:py-4"
                  />
                </div>
              ))}
              <div className="space-y-2">
                <label htmlFor="msg" className="ml-1 text-sm font-semibold text-slate-400">
                  Message
                </label>
                <textarea
                  id="msg"
                  placeholder="Tell me about your project…"
                  rows={5}
                  className="min-h-[130px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 font-medium text-white placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:min-h-[140px] sm:px-5 sm:py-4"
                />
              </div>
              <motion.button
                type="submit"
                data-cursor-hover
                whileHover={finePointer ? { scale: 1.02 } : undefined}
                whileTap={{ scale: 0.98 }}
                className="flex min-h-[48px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 py-3.5 text-base font-bold text-white shadow-[0_0_28px_rgba(99,102,241,0.35)] sm:min-h-0 sm:py-4 sm:text-lg"
              >
                Send message
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
