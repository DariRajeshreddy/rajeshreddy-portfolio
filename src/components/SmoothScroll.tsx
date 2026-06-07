import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisRefContext } from '../context/LenisContext';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    // Completely bypass Lenis on mobile for perfect 120fps native touch momentum scrolling
    if (isMobile) {
      const handleAnchorLinks = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        if (anchor && anchor.hash && anchor.origin === window.location.origin) {
          e.preventDefault();
          const targetElement = document.querySelector(anchor.hash) as HTMLElement;
          if (targetElement) {
            const top = targetElement.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      };
      document.addEventListener('click', handleAnchorLinks);
      return () => document.removeEventListener('click', handleAnchorLinks);
    }

    const instance = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2, 
      lerp: 0.08, 
    });
    
    lenisRef.current = instance;

    // Sync GSAP with Lenis
    instance.on('scroll', () => {
      ScrollTrigger.update();
    });

    const update = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(500, 33);

    // Refresh on layout changes
    const resizeObserver = new ResizeObserver(() => {
      instance.resize();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    const handleAnchorLinks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash) as HTMLElement;
        if (targetElement) {
          instance.scrollTo(targetElement, { offset: -100, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleAnchorLinks);

    return () => {
      instance.destroy();
      gsap.ticker.remove(update);
      resizeObserver.disconnect();
      document.removeEventListener('click', handleAnchorLinks);
      lenisRef.current = null;
    };
  }, []);

  return <LenisRefContext.Provider value={lenisRef}>{children}</LenisRefContext.Provider>;
}
