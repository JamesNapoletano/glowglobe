"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import type { ThemeMode } from "@/theme/brand-tokens";

const THEME_STORAGE_KEY = "glowglobe.themeMode";

type ThemeModeContextType = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("glassmorphic");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (storedMode === "earthy" || storedMode === "glassmorphic" || storedMode === "sunset") {
        setThemeModeState(storedMode);
      }
    } finally {
      setHasLoaded(true);
    }
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleThemeMode = () => {
    const modes: ThemeMode[] = ["glassmorphic", "earthy", "sunset"];
    const currentIndex = modes.indexOf(themeMode);
    const nextMode = modes[currentIndex >= 0 ? (currentIndex + 1) % modes.length : 0];
    setThemeMode(nextMode);
  };

  useEffect(() => {
    document.body.classList.remove("theme-glassmorphic", "theme-earthy", "theme-sunset");
    document.body.classList.add(`theme-${themeMode}`);
  }, [themeMode]);

  const muiTheme = useMemo(() => createAppTheme(themeMode), [themeMode]);

  const contextValue = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      toggleThemeMode,
    }),
    [themeMode],
  );

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextType {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
}
