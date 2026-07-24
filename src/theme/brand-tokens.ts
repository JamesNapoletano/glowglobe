export type ThemeMode = "earthy" | "glassmorphic";

export const earthyTokens = {
  palette: {
    primary: {
      main: "#95a284",
      light: "#b6c0aa",
      dark: "#748268",
      contrastText: "#fbf8f1",
    },
    secondary: {
      main: "#b28a62",
      light: "#c7a17d",
      dark: "#8e6847",
      contrastText: "#fbf8f1",
    },
    accent: {
      cyan: "#8fa391",
      indigo: "#a29384",
      violet: "#9a848e",
    },
    background: {
      default: "#ede6da",
      paper: "#f7f1e7",
      panel: "#f3ebde",
      panelMuted: "#efe6d8",
      manuscript: "#fcf8f0",
      rail: "#f4ede1",
    },
    text: {
      primary: "#2c241c",
      secondary: "#6f6559",
      muted: "#998d7e",
    },
    divider: "rgba(117, 102, 83, 0.18)",
    glassBorder: "rgba(117, 102, 83, 0.18)",
    glassBorderLight: "rgba(117, 102, 83, 0.28)",
    glassBorderGlow: "rgba(149, 162, 132, 0.4)",
    success: {
      main: "#6f8462",
    },
    warning: {
      main: "#a97b4f",
    },
    error: {
      main: "#a56455",
    },
  },
  typography: {
    uiFontFamily: 'Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    displayFontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
    manuscriptFontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
    wordmarkFontFamily: 'Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    labelTracking: "0.14em",
  },
  shape: {
    shellRadius: 8,
    cardRadius: 8,
    inputRadius: 6,
    pillRadius: 999,
  },
  spacing: {
    compact: 6,
    cozy: 12,
    roomy: 16,
    spacious: 24,
  },
  glass: {
    backdropFilter: "none",
    backdropFilterHeavy: "none",
    surfaceLight: "rgba(247, 241, 231, 0.9)",
    surfaceMedium: "rgba(243, 235, 222, 0.95)",
    surfaceActive: "rgba(149, 162, 132, 0.14)",
    innerRim: "none",
  },
  shadows: {
    card: "0 10px 24px rgba(67, 52, 35, 0.06)",
    floating: "0 14px 32px rgba(67, 52, 35, 0.10)",
    selected: "0 8px 18px rgba(149, 162, 132, 0.14)",
    focusRing: "0 0 0 3px rgba(149, 162, 132, 0.16)",
  },
  logo: {
    ring: "rgba(117, 102, 83, 0.24)",
    line: "rgba(117, 102, 83, 0.35)",
    glow: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.96), rgba(202, 212, 189, 0.78) 38%, rgba(178, 138, 98, 0.2) 100%)",
  },
} as const;

export const glassmorphicTokens = {
  palette: {
    primary: {
      main: "#10B981", // Luminous Emerald
      light: "#34D399",
      dark: "#059669",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F59E0B", // Warm Amber Glow
      light: "#FBBF24",
      dark: "#D97706",
      contrastText: "#FFFFFF",
    },
    accent: {
      cyan: "#38BDF8",
      indigo: "#818CF8",
      violet: "#A855F7",
    },
    background: {
      default: "#0B0F17", // Deep Midnight Obsidian
      paper: "rgba(18, 26, 42, 0.68)",
      panel: "rgba(15, 23, 38, 0.75)",
      panelMuted: "rgba(12, 18, 30, 0.60)",
      manuscript: "rgba(20, 29, 46, 0.85)",
      rail: "rgba(15, 22, 36, 0.65)",
    },
    text: {
      primary: "#F8FAFC", // Crisp ice white
      secondary: "#94A3B8", // Slate silver
      muted: "#64748B", // Muted slate
    },
    divider: "rgba(255, 255, 255, 0.12)",
    glassBorder: "rgba(255, 255, 255, 0.14)",
    glassBorderLight: "rgba(255, 255, 255, 0.22)",
    glassBorderGlow: "rgba(52, 211, 153, 0.45)",
    success: {
      main: "#10B981",
    },
    warning: {
      main: "#F59E0B",
    },
    error: {
      main: "#EF4444",
    },
  },
  typography: {
    uiFontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    displayFontFamily: '"Plus Jakarta Sans", Inter, -apple-system, sans-serif',
    manuscriptFontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
    wordmarkFontFamily: 'Inter, -apple-system, sans-serif',
    labelTracking: "0.14em",
  },
  shape: {
    shellRadius: 16,
    cardRadius: 16,
    inputRadius: 10,
    pillRadius: 999,
  },
  spacing: {
    compact: 6,
    cozy: 12,
    roomy: 16,
    spacious: 24,
  },
  glass: {
    backdropFilter: "blur(20px) saturate(190%)",
    backdropFilterHeavy: "blur(28px) saturate(200%)",
    surfaceLight: "rgba(255, 255, 255, 0.07)",
    surfaceMedium: "rgba(255, 255, 255, 0.11)",
    surfaceActive: "rgba(16, 185, 129, 0.14)",
    innerRim: "inset 0 1px 0 rgba(255, 255, 255, 0.20)",
  },
  shadows: {
    card: "0 20px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
    floating: "0 25px 60px rgba(0, 0, 0, 0.50), inset 0 1px 0 rgba(255, 255, 255, 0.22)",
    selected: "0 10px 25px rgba(16, 185, 129, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.30)",
    focusRing: "0 0 0 3px rgba(52, 211, 153, 0.35), 0 0 20px rgba(16, 185, 129, 0.25)",
  },
  logo: {
    ring: "rgba(52, 211, 153, 0.4)",
    line: "rgba(255, 255, 255, 0.5)",
    glow: "radial-gradient(circle at 35% 30%, rgba(52, 211, 153, 0.95), rgba(16, 185, 129, 0.8) 42%, rgba(245, 158, 11, 0.45) 100%)",
  },
} as const;

export function getBrandTokens(mode: ThemeMode = "glassmorphic") {
  return mode === "earthy" ? earthyTokens : glassmorphicTokens;
}

export const brandTokens = glassmorphicTokens;
