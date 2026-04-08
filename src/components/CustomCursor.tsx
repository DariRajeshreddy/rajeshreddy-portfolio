import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMediaQuery } from '../hooks/useMediaQuery';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const finePointer = useMediaQuery('(pointer: fine)');

  useEffect(() => {
    if (!finePointer) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 6,
        y: e.clientY - 6,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(follower, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.35,
        ease: 'power3.out',
      });
    };

    const onEnter = () => {
      gsap.to(follower, { scale: 1.65, opacity: 0.45, duration: 0.25 });
      gsap.to(cursor, { scale: 1.25, duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.25 });
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMove);
    const clickables = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [finePointer]);

  if (!finePointer) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 mix-blend-screen shadow-[0_0_20px_rgba(56,189,248,0.8)]"
        aria-hidden
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm"
        aria-hidden
      />
    </>
  );
}
