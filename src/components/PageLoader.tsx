import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function PageLoader() {
  const loaderComplete = useAppStore((s) => s.loaderComplete);
  const setLoaderComplete = useAppStore((s) => s.setLoaderComplete);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaderComplete(true), 2000);
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
          {/* Radial gradient backgrounds */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.12)_0%,transparent_40%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            {/* Animated logo mark */}
            <div className="relative flex h-28 w-28 items-center justify-center">
              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 70%, #6366f1, #38bdf8, transparent 100%) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'destination-out',
                  maskComposite: 'exclude',
                }}
              />
              {/* Middle pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-4 rounded-full border border-violet-500/40"
              />
              {/* Center logo */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.3)]"
              >
                <span className="font-display text-xl font-black text-white">
                  RR<span className="text-primary">.</span>
                </span>
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="w-48 overflow-hidden rounded-full bg-white/5 p-[1px]">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="h-[3px] rounded-full bg-gradient-to-r from-sky-500 via-primary to-violet-500"
              />
            </div>

            <div className="text-center">
              <motion.p
                className="font-display text-xl font-bold tracking-[0.35em] text-white md:text-2xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                LOADING
              </motion.p>
              <p className="mt-2 text-sm text-slate-500">Portfolio · Motion · Design</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
