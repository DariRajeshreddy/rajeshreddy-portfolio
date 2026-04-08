import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

const LoaderCanvas = lazy(() =>
  import('../three/LoaderCanvas').then((m) => ({ default: m.LoaderCanvas }))
);

export function PageLoader() {
  const loaderComplete = useAppStore((s) => s.loaderComplete);
  const setLoaderComplete = useAppStore((s) => s.setLoaderComplete);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaderComplete(true), 2400);
    return () => window.clearTimeout(t);
  }, [setLoaderComplete]);

  return (
    <AnimatePresence>
      {!loaderComplete && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: 'blur(12px)',
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.12)_0%,transparent_40%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            <div className="glass neon-border rounded-[2rem] p-6 shadow-[0_0_60px_rgba(99,102,241,0.2)]">
              <Suspense
                fallback={
                  <div className="flex h-48 w-48 items-center justify-center text-slate-500">
                    <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                }
              >
                <LoaderCanvas />
              </Suspense>
            </div>

            <div className="text-center">
              <motion.p
                className="font-display text-xl font-bold tracking-[0.35em] text-white md:text-2xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                INITIALIZING
              </motion.p>
              <p className="mt-2 text-sm text-slate-500">Portfolio · WebGL · Motion</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
