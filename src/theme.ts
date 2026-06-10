"use client";

import { alpha, createTheme } from "@mui/material/styles";
import { brandTokens } from "@/theme/brand-tokens";

const theme = createTheme({
  cssVariables: true,
  shape: {
    borderRadius: brandTokens.shape.cardRadius,
  },
  palette: {
    mode: "light",
    primary: brandTokens.palette.primary,
    secondary: brandTokens.palette.secondary,
    background: {
      default: brandTokens.palette.background.default,
      paper: brandTokens.palette.background.paper,
    },
    text: {
      primary: brandTokens.palette.text.primary,
      secondary: brandTokens.palette.text.secondary,
    },
    divider: brandTokens.palette.divider,
    success: brandTokens.palette.success,
    warning: brandTokens.palette.warning,
    error: brandTokens.palette.error,
  },
  typography: {
    fontFamily: brandTokens.typography.uiFontFamily,
    h1: {
      fontFamily: brandTokens.typography.displayFontFamily,
      fontSize: "2.45rem",
      fontWeight: 600,
      letterSpacing: "-0.03em",
      lineHeight: 1.04,
    },
    h2: {
      fontFamily: brandTokens.typography.displayFontFamily,
      fontSize: "1.9rem",
      fontWeight: 600,
      letterSpacing: "-0.025em",
      lineHeight: 1.08,
    },
    h3: {
      fontFamily: brandTokens.typography.displayFontFamily,
      fontSize: "1.15rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.015em",
    },
    h4: {
      fontFamily: brandTokens.typography.uiFontFamily,
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.35,
    },
    body1: {
      fontSize: "0.97rem",
      lineHeight: 1.72,
    },
    body2: {
      fontSize: "0.88rem",
      lineHeight: 1.62,
    },
    subtitle1: {
      fontSize: "0.95rem",
      lineHeight: 1.6,
      color: brandTokens.palette.text.secondary,
    },
    subtitle2: {
      fontSize: "0.82rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: "0.7rem",
      fontWeight: 700,
      letterSpacing: brandTokens.typography.labelTracking,
      textTransform: "uppercase",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          colorScheme: "light",
        },
        ":root": {
          "--font-ui": brandTokens.typography.uiFontFamily,
          "--font-manuscript": brandTokens.typography.manuscriptFontFamily,
          "--editor-surface": brandTokens.palette.background.manuscript,
          "--editor-border": alpha(brandTokens.palette.secondary.dark, 0.28),
          "--surface-alt": brandTokens.palette.background.panel,
          "--foreground": brandTokens.palette.text.primary,
          "--editor-selection": alpha(brandTokens.palette.primary.main, 0.18),
          "--editor-focus-ring": alpha(brandTokens.palette.primary.dark, 0.28),
          "--editor-placeholder": alpha(brandTokens.palette.text.secondary, 0.72),
          "--surface-panel": brandTokens.palette.background.panel,
          "--surface-panel-muted": brandTokens.palette.background.panelMuted,
        },
        body: {
          margin: 0,
          minHeight: "100vh",
          background: `radial-gradient(circle at top, ${alpha(brandTokens.palette.primary.light, 0.14)}, transparent 22%), linear-gradient(180deg, ${brandTokens.palette.background.paper} 0%, ${brandTokens.palette.background.default} 46%, #e6dece 100%)`,
          color: brandTokens.palette.text.primary,
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        "button, input, textarea, select": {
          font: "inherit",
        },
        "::selection": {
          background: alpha(brandTokens.palette.primary.main, 0.18),
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: brandTokens.palette.background.paper,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: brandTokens.shape.cardRadius,
          backgroundColor: brandTokens.palette.background.paper,
          border: `1px solid ${brandTokens.palette.divider}`,
          boxShadow: brandTokens.shadows.card,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: brandTokens.shape.inputRadius,
          paddingInline: "0.9rem",
          minHeight: 34,
        },
        outlined: {
          borderColor: alpha(brandTokens.palette.secondary.dark, 0.26),
          backgroundColor: alpha(brandTokens.palette.background.paper, 0.9),
          color: brandTokens.palette.text.primary,
          "&:hover": {
            borderColor: alpha(brandTokens.palette.primary.dark, 0.4),
            backgroundColor: alpha(brandTokens.palette.background.manuscript, 0.95),
          },
        },
        contained: {
          backgroundColor: brandTokens.palette.primary.main,
          color: brandTokens.palette.primary.contrastText,
          boxShadow: brandTokens.shadows.selected,
          "&:hover": {
            backgroundColor: brandTokens.palette.primary.dark,
            boxShadow: brandTokens.shadows.selected,
          },
        },
        text: {
          "&:hover": {
            backgroundColor: alpha(brandTokens.palette.primary.main, 0.08),
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: brandTokens.shape.pillRadius,
          fontWeight: 600,
          backgroundColor: alpha(brandTokens.palette.background.paper, 0.88),
          borderColor: alpha(brandTokens.palette.secondary.dark, 0.18),
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: brandTokens.shape.shellRadius,
          backgroundColor: brandTokens.palette.background.paper,
          border: `1px solid ${brandTokens.palette.divider}`,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: brandTokens.shape.inputRadius,
          backgroundColor: alpha(brandTokens.palette.background.manuscript, 0.92),
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: brandTokens.palette.primary.main,
            boxShadow: brandTokens.shadows.focusRing,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: brandTokens.shape.cardRadius,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(brandTokens.palette.secondary.dark, 0.18),
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: brandTokens.shape.cardRadius,
          border: `1px solid ${brandTokens.palette.divider}`,
          boxShadow: brandTokens.shadows.card,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          marginInline: 4,
          marginBlock: 2,
          borderRadius: brandTokens.shape.inputRadius,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: brandTokens.shape.cardRadius,
          backgroundColor: alpha(brandTokens.palette.background.panelMuted, 0.9),
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: brandTokens.palette.primary.main,
          },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: brandTokens.palette.primary.main,
          },
        },
      },
    },
  },
});

export default theme;
