export const brandTokens = {
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
  shadows: {
    card: "0 10px 24px rgba(67, 52, 35, 0.06)",
    selected: "0 8px 18px rgba(149, 162, 132, 0.14)",
    focusRing: "0 0 0 3px rgba(149, 162, 132, 0.16)",
  },
  logo: {
    ring: "rgba(117, 102, 83, 0.24)",
    line: "rgba(117, 102, 83, 0.35)",
    glow: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.96), rgba(202, 212, 189, 0.78) 38%, rgba(178, 138, 98, 0.2) 100%)",
  },
} as const;
