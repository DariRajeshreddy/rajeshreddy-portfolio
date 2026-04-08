/* eslint-disable react-refresh/only-export-components -- Provider + hook live together intentionally */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface AppState {
  loaderComplete: boolean;
  activeSection: string;
  setLoaderComplete: (v: boolean) => void;
  setActiveSection: (id: string) => void;
}

const AppStoreContext = createContext<AppState | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const value = useMemo<AppState>(
    () => ({
      loaderComplete,
      activeSection,
      setLoaderComplete,
      setActiveSection,
    }),
    [loaderComplete, activeSection]
  );

  return (
    <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
  );
}

/** Pure dark mode state management. Removed Lite mode logic and theme toggles for performance and visual consistency. */
export function useAppStore<T>(selector: (state: AppState) => T): T {
  const ctx = useContext(AppStoreContext);
  if (!ctx) {
    throw new Error('useAppStore must be used within AppStoreProvider');
  }
  return selector(ctx);
}
