import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import {
  GitHubDark as Github,
  LinkedIn as Linkedin,
  XDark as Twitter,
} from '@ridemountainpig/svgl-react';
import { fadeUpItem, fadeUpSimple, staggerContainer } from '../animations/variants';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useState } from 'react';

const socialLinks = [
  { icon: <Github width={22} height={22} />, label: 'GitHub', link: 'https://github.com/DariRajeshreddy', color: '#e6edf3' },
  {
    icon: <Linkedin width={22} height={22} />,
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/rajeshkumarreddy-dari/',
    color: '#0a66c2',
  },
  { icon: <Twitter width={22} height={22} />, label: 'Twitter', link: '#', color: '#1d9bf0' },
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
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "557a9611-ef37-4bdb-afcf-4681774e8ab5");
    
    // Email Template Customization
    formData.append("from_name", "Portfolio Visitor");
    formData.append("subject", "✨ New Message from Rajesh Reddy Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div className="mb-12 text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 block text-[10px] font-black uppercase tracking-[0.65em] text-primary/80"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display text-4xl font-extrabold tracking-tighter text-white sm:text-5xl md:text-7xl"
          >
            LET&apos;S <span className="text-glow text-primary">CONNECT</span>
          </motion.h2>
        </div>

        <div className="grid items-start gap-10 sm:gap-16 md:grid-cols-2">
          {/* Left - contact info */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-10"
          >
            <motion.div variants={fadeVariant}>
              <p className="max-w-md text-sm text-slate-400 sm:text-base">
                New projects, collaborations, or a quick hello — I&apos;m happy to hear from you.
                Let&apos;s build something great together.
              </p>
            </motion.div>

            {/* Contact details */}
            <motion.div variants={fadeVariant} className="space-y-4 sm:space-y-5">
              {[
                {
                  icon: <Mail size={20} className="sm:h-6 sm:w-6" />,
                  label: 'Email',
                  value: 'darirajeshreddy@gmail.com',
                  href: 'mailto:darirajeshreddy@gmail.com',
                },
                {
                  icon: <Phone size={20} className="sm:h-6 sm:w-6" />,
                  label: 'Phone',
                  value: '+91-9000631287',
                  href: 'tel:+919000631287',
                },
              ].map((contact) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  whileHover={finePointer ? { x: 4, scale: 1.01 } : {}}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 text-slate-300 backdrop-blur-md transition-all hover:border-primary/30 hover:bg-white/[0.07]"
                >
                  <div className="shrink-0 rounded-xl border border-primary/25 bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary/20 sm:p-3">
                    {contact.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      {contact.label}
                    </p>
                    <p className="break-all text-sm font-bold text-white sm:text-base">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeVariant}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Find me on
              </p>
              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    whileHover={
                      finePointer && !reduceMotion
                        ? { scale: 1.05, y: -3 }
                        : undefined
                    }
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.08] sm:justify-start"
                  >
                    {s.icon}
                    <span className="text-sm font-semibold text-white">{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - contact form */}
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0.3 : 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="glass neon-border relative rounded-2xl border border-white/10 p-6 shadow-2xl sm:rounded-3xl sm:p-10"
          >
            {/* Decorative corner number */}
            <div className="pointer-events-none absolute top-0 right-0 p-6 font-display text-7xl font-black text-white/[0.04] select-none sm:p-8 sm:text-9xl">
              @
            </div>

            {status === 'success' ? (
              /* Success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                >
                  <CheckCircle size={56} className="text-emerald-400" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-slate-400">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form
                className="relative z-10 space-y-5 sm:space-y-6"
                onSubmit={handleSubmit}
              >
                {/* Honey Potter (hidden field) */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                {[
                  { id: 'name', name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
                  { id: 'email', name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="ml-1 text-sm font-semibold text-slate-400">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 font-medium text-white placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      />
                      {/* Animated focus border line */}
                      <motion.div
                        initial={false}
                        animate={{ scaleX: focused === field.id ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute bottom-0 left-1/2 h-[2px] w-[calc(100%-16px)] -translate-x-1/2 origin-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500"
                      />
                    </div>
                  </div>
                ))}
                <div className="space-y-2">
                  <label htmlFor="msg" className="ml-1 text-sm font-semibold text-slate-400">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="msg"
                      name="message"
                      placeholder="Tell me about your project…"
                      rows={5}
                      required
                      onFocus={() => setFocused('msg')}
                      onBlur={() => setFocused(null)}
                      className="min-h-[130px] w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 font-medium text-white placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 sm:min-h-[140px]"
                    />
                    <motion.div
                      initial={false}
                      animate={{ scaleX: focused === 'msg' ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-0 left-1/2 h-[2px] w-[calc(100%-16px)] -translate-x-1/2 origin-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-sm font-semibold text-rose-400 text-center">
                    Something went wrong. Please try again later.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  data-cursor-hover
                  whileHover={
                    finePointer && status !== 'sending'
                      ? { scale: 1.02, boxShadow: '0 0 50px rgba(99,102,241,0.5)' }
                      : undefined
                  }
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex min-h-[52px] w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 py-3.5 text-base font-bold text-white shadow-[0_0_28px_rgba(99,102,241,0.35)] transition-shadow disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-0 sm:py-4 sm:text-lg"
                >
                  {/* Shimmer */}
                  <span className="absolute inset-0 -skew-x-12 translate-x-[-200%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[200%]" />
                  <span className="relative z-10 flex items-center gap-3">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
