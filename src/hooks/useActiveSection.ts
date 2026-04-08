import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

export function useActiveSection() {
  const setActiveSection = useAppStore((s) => s.setActiveSection);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { root: null, rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.15, 0.35, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setActiveSection]);
}
