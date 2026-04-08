import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useThemeClass() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    root.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
  }, [theme]);
}
