import { motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { GitHubDark as GitHub, LinkedIn } from '@ridemountainpig/svgl-react';

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

export function Education() {
  return (
    <section id="education" className="relative z-10 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-white underline decoration-primary/50 underline-offset-8 md:text-4xl">
          Education
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {eduData.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass flex items-start gap-4 rounded-3xl border border-white/10 p-8 transition-all hover:border-primary/35"
            >
              <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-white">{edu.degree}</h3>
                <p className="mb-2 text-slate-300">{edu.institute}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">{edu.period}</span>
                  <span className="font-bold text-primary">{edu.grade}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-slate-950/85 px-6 py-20 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <Education />

        <div className="mt-16 grid gap-12 px-2 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="font-display text-3xl font-bold text-white">
              RR<span className="text-primary">.</span>
            </div>
            <p className="max-w-xs text-slate-400">
              Frontend development with emphasis on motion, 3D on the web, and performance.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/DariRajeshreddy"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-white/5 p-2 transition-colors hover:bg-primary/20"
              >
                <GitHub className="h-5 w-5 fill-current" />
              </a>
              <a
                href="https://www.linkedin.com/in/rajeshkumarreddy-dari/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-white/5 p-2 transition-colors hover:bg-primary/20"
              >
                <LinkedIn className="h-5 w-5 fill-current" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Contact</h4>
            <div className="flex items-center gap-3 text-slate-400">
              <Mail size={18} className="text-primary" />
              <a href="mailto:darirajeshreddy@gmail.com" className="hover:text-white">
                darirajeshreddy@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Phone size={18} className="text-primary" />
              <span>+91-9000631287</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <MapPin size={18} className="text-primary" />
              <span>Hyderabad, India</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Navigate</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#about" className="hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-primary">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary">
                  Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-primary">
                  Experience
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Focus</h4>
            <div className="rounded-2xl border border-primary/20 bg-white/[0.03] p-4 text-sm text-slate-300">
              Building immersive web experiences with React, R3F, and motion design.
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Rajesh Reddy. Crafted with React &amp; TypeScript.
        </div>
      </div>
    </footer>
  );
}
