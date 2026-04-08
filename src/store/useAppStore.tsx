/* eslint-disable react-refresh/only-export-components -- Provider + hook live together intentionally */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'dark' | 'light';

export interface AppState {
  theme: Theme;
  loaderComplete: boolean;
  activeSection: string;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLoaderComplete: (v: boolean) => void;
  setActiveSection: (id: string) => void;
}

const AppStoreContext = createContext<AppState | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo<AppState>(
    () => ({
      theme,
      loaderComplete,
      activeSection,
      setTheme,
      toggleTheme,
      setLoaderComplete,
      setActiveSection,
    }),
    [theme, loaderComplete, activeSection, toggleTheme]
  );

  return (
    <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
  );
}

/** Same selector style as before; backed by React Context (no Zustand → no duplicate React / Vite prebundle issues). */
export function useAppStore<T>(selector: (state: AppState) => T): T {
  const ctx = useContext(AppStoreContext);
  if (!ctx) {
    throw new Error('useAppStore must be used within AppStoreProvider');
  }
  return selector(ctx);
}
