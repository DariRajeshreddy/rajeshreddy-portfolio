import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { pageTransition } from './animations/variants';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { PageLoader } from './components/PageLoader';
import { SmoothScroll } from './components/SmoothScroll';
import { useActiveSection } from './hooks/useActiveSection';
import { useThemeClass } from './hooks/useThemeClass';
import { useAppStore } from './store/useAppStore';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';

const Projects = lazy(() =>
  import('./sections/Projects').then((m) => ({ default: m.Projects }))
);

function MainContent() {
  const loaderComplete = useAppStore((s) => s.loaderComplete);

  return (
    <motion.main
      className="relative z-10 w-full pt-[5.25rem] sm:pt-20 md:pt-20"
      initial={false}
      animate={loaderComplete ? 'enter' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 16 },
        enter: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <Hero />
      <About />
      <Skills />
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
            Loading projects…
          </div>
        }
      >
        <Projects />
      </Suspense>
      <Experience />
      <Contact />
    </motion.main>
  );
}

function App() {
  useThemeClass();
  useActiveSection();
  const theme = useAppStore((s) => s.theme);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen selection:bg-primary selection:text-white">
        <div
          className={`fixed inset-0 -z-20 transition-colors duration-500 ${
            theme === 'dark' ? 'bg-[#020617]' : 'bg-slate-100'
          }`}
        />
        <div
          className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-500 ${
            theme === 'dark'
              ? 'bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(99,102,241,0.15),transparent)] opacity-100'
              : 'bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(59,130,246,0.08),transparent)] opacity-100'
          }`}
        />

        <PageLoader />
        <CustomCursor />

        <motion.div
          initial="initial"
          animate="animate"
          variants={pageTransition}
          className="relative"
        >
          <Navbar />
          <MainContent />
          <Footer />
        </motion.div>
      </div>
    </SmoothScroll>
  );
}

export default App;
