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
      const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (storedMode === "earthy" || storedMode === "glassmorphic") {
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
    setThemeMode(themeMode === "earthy" ? "glassmorphic" : "earthy");
  };

  useEffect(() => {
    if (themeMode === "glassmorphic") {
      document.body.classList.add("theme-glassmorphic");
      document.body.classList.remove("theme-earthy");
    } else {
      document.body.classList.add("theme-earthy");
      document.body.classList.remove("theme-glassmorphic");
    }
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
