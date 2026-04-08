import { motion, useScroll, useSpring as useFramerSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { pageTransition } from './animations/variants';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { PageLoader } from './components/PageLoader';
import { SmoothScroll } from './components/SmoothScroll';
import { useActiveSection } from './hooks/useActiveSection';
import { useAppStore } from './store/useAppStore';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';

import { Projects } from './sections/Projects';

function MainContent() {
  const loaderComplete = useAppStore((s) => s.loaderComplete);

  return (
    <motion.main
      className="gpu relative z-10 w-full pt-[5.25rem] sm:pt-20 md:pt-20"
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
      <Projects />
      <Experience />
      <Contact />
    </motion.main>
  );
}

/** 
 * Main Application Shell. 
 * Optimized with Scroll Progress and mobile-friendly interactions.
 */
function App() {
  useActiveSection();
  const { scrollYProgress } = useScroll();
  const scaleX = useFramerSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <SmoothScroll>
      <div className="relative min-h-screen selection:bg-primary/30 selection:text-white bg-[#020617]">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left bg-gradient-to-r from-sky-400 via-primary to-violet-500"
          style={{ scaleX }}
        />

        {/* Enforced dark background for consistent high-end feel */}
        <div className="fixed inset-0 -z-20 bg-[#020617]" />
        
        {/* Subtle persistent glow to prevent "black void" feel */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(99,102,241,0.12),transparent)] opacity-100" />

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

        {/* Floating Scroll to Top - for mobile convenience */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 text-white md:hidden lg:hidden"
          style={{ opacity: scrollYProgress }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </SmoothScroll>
  );
}

export default App;
