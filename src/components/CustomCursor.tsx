import { useEffect, useRef } from 'react';
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

    let mouseX = 0;
    let mouseY = 0;
    let cursorPosX = 0;
    let cursorPosY = 0;
    let followerPosX = 0;
    let followerPosY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth interpolation for the cursor (very fast)
      cursorPosX += (mouseX - cursorPosX) * 0.25;
      cursorPosY += (mouseY - cursorPosY) * 0.25;

      // Slower interpolation for the follower (lazy follow)
      followerPosX += (mouseX - followerPosX) * 0.12;
      followerPosY += (mouseY - followerPosY) * 0.12;

      if (cursor) {
        cursor.style.transform = `translate3d(${cursorPosX - 6}px, ${cursorPosY - 6}px, 0)`;
      }
      if (follower) {
        follower.style.transform = `translate3d(${followerPosX - 16}px, ${followerPosY - 16}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);

    const onEnter = () => {
      follower.style.transition = 'transform 0.15s ease-out, scale 0.25s ease-out, opacity 0.25s ease-out';
      follower.classList.add('cursor-active');
    };

    const onLeave = () => {
      follower.classList.remove('cursor-active');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    
    // We use event delegation for better performance instead of multiple listeners
    const handleMouseInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [data-cursor-hover]')) {
        if (e.type === 'mouseover') onEnter();
        if (e.type === 'mouseout') onLeave();
      }
    };

    document.addEventListener('mouseover', handleMouseInteraction);
    document.addEventListener('mouseout', handleMouseInteraction);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', handleMouseInteraction);
      document.removeEventListener('mouseout', handleMouseInteraction);
      cancelAnimationFrame(rafId);
    };
  }, [finePointer]);

  if (!finePointer) return null;

  return (
    <>
      <style>
        {`
          .cursor-active {
            scale: 1.8 !important;
            opacity: 0.3 !important;
            background-color: rgba(99, 102, 241, 0.2) !important;
            border-color: rgba(99, 102, 241, 0.5) !important;
          }
        `}
      </style>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 mix-blend-screen shadow-[0_0_15px_rgba(56,189,248,0.6)] will-change-transform"
        aria-hidden
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-[2px] will-change-transform"
        aria-hidden
      />
    </>
  );
}
