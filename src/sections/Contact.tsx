import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, Loader2, MessageSquare, Handshake, Heart } from 'lucide-react';
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

const values = [
  { icon: MessageSquare, title: 'Open Communication', text: "I believe in clear, honest, and frequent updates throughout our collaboration." },
  { icon: Handshake, title: 'Mutual Growth', text: "My goal is to build long-term relationships where both parties thrive and succeed." },
  { icon: Heart, title: 'Kindness & Respect', text: "Every interaction is handled with professionalism and a positive, helpful attitude." }
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
    <section id="contact" className="relative z-10 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 block text-[10px] font-black uppercase tracking-[0.7em] text-primary/80"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display text-4xl font-extrabold tracking-tighter text-white sm:text-5xl md:text-7xl"
          >
            LET&apos;S <span className="text-glow text-primary">DIALOGUE</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-6 max-w-2xl text-slate-400"
          >
            Whether you have a specific project in mind or just want to discuss the future of the web, 
            I am always open to respectful and professional conversations.
          </motion.p>
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left Side: Info & Values */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              variants={containerVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { icon: <Mail size={22} />, label: 'Direct Email', value: 'darirajeshreddy@gmail.com', href: 'mailto:darirajeshreddy@gmail.com' },
                { icon: <Phone size={22} />, label: 'Phone', value: '+91-9000631287', href: 'tel:+919000631287' }
              ].map((contact) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  variants={fadeVariant}
                  className="group flex items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:border-primary/40 hover:bg-white/[0.06]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{contact.label}</p>
                    <p className="text-base font-bold text-white sm:text-lg">{contact.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Respectful Values Row */}
            <div className="space-y-6 border-t border-white/[0.06] pt-12">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/50">My Professional Values</h4>
              <div className="space-y-6">
                {values.map((v, i) => (
                  <motion.div 
                    key={v.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <v.icon size={18} className="text-primary mt-1 shrink-0" />
                    <div>
                      <h5 className="text-sm font-bold text-white">{v.title}</h5>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">{v.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Enhanced Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass relative rounded-3xl border border-white/10 p-8 shadow-2xl sm:p-12"
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-6 py-12 text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    <CheckCircle size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-3xl font-bold text-white">Thank You</h3>
                    <p className="text-slate-400">
                      Your message has been received with respect. 
                      I will review it and respond personally within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                  
                  <div className="grid gap-6 sm:grid-cols-2">
                    {[
                      { id: 'name', name: 'name', label: 'FullName', type: 'text', placeholder: 'Enter your name' },
                      { id: 'email', name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                    ].map((field) => (
                      <div key={field.id} className="space-y-2">
                        <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{field.label}</label>
                        <input
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          required
                          placeholder={field.placeholder}
                          onFocus={() => setFocused(field.id)}
                          onBlur={() => setFocused(null)}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">How can I help?</label>
                    <textarea
                      id="msg"
                      name="message"
                      required
                      placeholder="Start your message here..."
                      rows={6}
                      onFocus={() => setFocused('msg')}
                      onBlur={() => setFocused(null)}
                      className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-center text-sm font-bold text-rose-400">
                      An error occurred. Please reach out via direct email.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 py-4 text-base font-bold text-white shadow-xl transition-all disabled:opacity-50"
                    whileHover={status !== 'sending' ? { scale: 1.01 } : {}}
                    whileTap={{ scale: 0.99 }}
                  >
                    {status === 'sending' ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        <span className="relative z-10">Send Message</span>
                        <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
