"use client";

import { alpha, createTheme } from "@mui/material/styles";
import { getBrandTokens, type ThemeMode } from "@/theme/brand-tokens";

export function createAppTheme(mode: ThemeMode = "glassmorphic") {
  const tokens = getBrandTokens(mode);
  const isDark = mode === "glassmorphic" || mode === "sunset";

  return createTheme({
    cssVariables: true,
    shape: {
      borderRadius: tokens.shape.cardRadius,
    },
    palette: {
      mode: isDark ? "dark" : "light",
      primary: tokens.palette.primary,
      secondary: tokens.palette.secondary,
      background: {
        default: tokens.palette.background.default,
        paper: tokens.palette.background.paper,
        panel: tokens.palette.background.panel,
        panelMuted: tokens.palette.background.panelMuted,
        manuscript: tokens.palette.background.manuscript,
        rail: tokens.palette.background.rail,
      },
      text: {
        primary: tokens.palette.text.primary,
        secondary: tokens.palette.text.secondary,
      },
      divider: tokens.palette.divider,
      success: tokens.palette.success,
      warning: tokens.palette.warning,
      error: tokens.palette.error,
    },
    typography: {
      fontFamily: tokens.typography.uiFontFamily,
      h1: {
        fontFamily: tokens.typography.displayFontFamily,
        fontSize: "2.45rem",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        lineHeight: 1.06,
      },
      h2: {
        fontFamily: tokens.typography.displayFontFamily,
        fontSize: "1.9rem",
        fontWeight: 700,
        letterSpacing: "-0.025em",
        lineHeight: 1.1,
      },
      h3: {
        fontFamily: tokens.typography.displayFontFamily,
        fontSize: "1.2rem",
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: "-0.015em",
      },
      h4: {
        fontFamily: tokens.typography.uiFontFamily,
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: 1.35,
      },
      body1: {
        fontSize: "0.97rem",
        lineHeight: 1.7,
      },
      body2: {
        fontSize: "0.88rem",
        lineHeight: 1.6,
      },
      subtitle1: {
        fontSize: "0.95rem",
        lineHeight: 1.6,
        color: tokens.palette.text.secondary,
      },
      subtitle2: {
        fontSize: "0.82rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      overline: {
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: tokens.typography.labelTracking,
        textTransform: "uppercase",
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: "0.01em",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            colorScheme: isDark ? "dark" : "light",
          },
          ":root": {
            "--font-ui": tokens.typography.uiFontFamily,
            "--font-manuscript": tokens.typography.manuscriptFontFamily,
            "--editor-surface": tokens.palette.background.manuscript,
            "--editor-border": tokens.palette.glassBorder,
            "--surface-alt": tokens.palette.background.panel,
            "--foreground": tokens.palette.text.primary,
            "--editor-selection": alpha(tokens.palette.primary.main, isDark ? 0.25 : 0.18),
            "--editor-focus-ring": alpha(tokens.palette.primary.light, isDark ? 0.4 : 0.28),
            "--editor-placeholder": alpha(tokens.palette.text.secondary, 0.72),
            "--surface-panel": tokens.palette.background.panel,
            "--surface-panel-muted": tokens.palette.background.panelMuted,
          },
          body: {
            margin: 0,
            minHeight: "100vh",
            backgroundColor: tokens.palette.background.default,
            color: tokens.palette.text.primary,
            overflowX: "hidden",
          },
          a: {
            color: "inherit",
            textDecoration: "none",
          },
          "button, input, textarea, select": {
            font: "inherit",
          },
          "::selection": {
            background: alpha(tokens.palette.primary.main, isDark ? 0.35 : 0.2),
            color: isDark ? "#FFFFFF" : "inherit",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: tokens.palette.background.paper,
            ...(isDark ? {
              backdropFilter: tokens.glass.backdropFilter,
              WebkitBackdropFilter: tokens.glass.backdropFilter,
              border: `1px solid ${tokens.palette.glassBorder}`,
              boxShadow: tokens.shadows.card,
            } : {
              border: `1px solid ${tokens.palette.divider}`,
              boxShadow: tokens.shadows.card,
            }),
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.cardRadius,
            backgroundColor: tokens.palette.background.paper,
            border: `1px solid ${isDark ? tokens.palette.glassBorder : tokens.palette.divider}`,
            boxShadow: tokens.shadows.card,
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease",
            ...(isDark ? {
              backdropFilter: tokens.glass.backdropFilter,
              WebkitBackdropFilter: tokens.glass.backdropFilter,
              "&:hover": {
                borderColor: tokens.palette.glassBorderLight,
                boxShadow: tokens.shadows.floating,
              },
            } : {
              "&:hover": {
                borderColor: tokens.palette.primary.main,
                boxShadow: tokens.shadows.floating,
              },
            }),
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.inputRadius,
            paddingInline: "0.9rem",
            minHeight: 34,
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          },
          sizeSmall: {
            minHeight: 30,
            paddingInline: "0.7rem",
            paddingBlock: "0.3rem",
            fontSize: "0.8rem",
          },
          sizeMedium: {
            minHeight: 36,
            paddingInline: "1rem",
            paddingBlock: "0.45rem",
            fontSize: "0.875rem",
          },
          sizeLarge: {
            minHeight: 44,
            paddingInline: "1.4rem",
            paddingBlock: "0.65rem",
            fontSize: "0.95rem",
          },
          outlined: {
            borderColor: tokens.palette.glassBorder,
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : alpha(tokens.palette.background.paper, 0.9),
            color: tokens.palette.text.primary,
            ...(isDark ? {
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: tokens.glass.innerRim,
              "&:hover": {
                borderColor: tokens.palette.glassBorderGlow,
                backgroundColor: "rgba(255, 255, 255, 0.10)",
                boxShadow: `0 0 16px rgba(16, 185, 129, 0.2), ${tokens.glass.innerRim}`,
              },
            } : {
              "&:hover": {
                borderColor: alpha(tokens.palette.primary.dark, 0.4),
                backgroundColor: alpha(tokens.palette.background.manuscript, 0.95),
              },
            }),
          },
          contained: {
            background: isDark
              ? `linear-gradient(135deg, ${tokens.palette.primary.main} 0%, ${tokens.palette.primary.dark} 100%)`
              : tokens.palette.primary.main,
            color: tokens.palette.primary.contrastText,
            boxShadow: tokens.shadows.selected,
            border: isDark ? "1px solid rgba(255, 255, 255, 0.25)" : "none",
            "&:hover": {
              background: isDark
                ? `linear-gradient(135deg, ${tokens.palette.primary.light} 0%, ${tokens.palette.primary.main} 100%)`
                : tokens.palette.primary.dark,
              boxShadow: tokens.shadows.selected,
            },
          },
          text: {
            color: tokens.palette.text.primary,
            "&:hover": {
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : alpha(tokens.palette.primary.main, 0.08),
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.pillRadius,
            fontWeight: 600,
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.06)" : alpha(tokens.palette.background.paper, 0.88),
            border: `1px solid ${tokens.palette.divider}`,
            color: tokens.palette.text.primary,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: tokens.shape.shellRadius,
            backgroundColor: tokens.palette.background.paper,
            border: `1px solid ${tokens.palette.divider}`,
            boxShadow: tokens.shadows.floating,
            ...(isDark ? {
              backdropFilter: tokens.glass.backdropFilterHeavy,
              WebkitBackdropFilter: tokens.glass.backdropFilterHeavy,
            } : {}),
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.inputRadius,
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.25)" : alpha(tokens.palette.background.manuscript, 0.92),
            border: `1px solid ${tokens.palette.divider}`,
            transition: "all 0.2s ease",
            "& fieldset": {
              border: "none",
            },
            "&.Mui-focused": {
              borderColor: tokens.palette.primary.main,
              boxShadow: tokens.shadows.focusRing,
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.cardRadius,
            transition: "all 0.18s ease",
            "&:hover": {
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.07)" : alpha(tokens.palette.primary.main, 0.06),
            },
            "&.Mui-selected": {
              backgroundColor: isDark ? tokens.glass.surfaceActive : alpha(tokens.palette.primary.main, 0.12),
              borderLeft: `3px solid ${tokens.palette.primary.main}`,
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: tokens.palette.divider,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: tokens.shape.cardRadius,
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.85)" : tokens.palette.background.paper,
            border: `1px solid ${tokens.palette.divider}`,
            boxShadow: tokens.shadows.floating,
            ...(isDark ? {
              backdropFilter: tokens.glass.backdropFilterHeavy,
              WebkitBackdropFilter: tokens.glass.backdropFilterHeavy,
            } : {}),
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            marginInline: 6,
            marginBlock: 3,
            borderRadius: tokens.shape.inputRadius,
            transition: "all 0.15s ease",
            "&:hover": {
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.10)" : alpha(tokens.palette.primary.main, 0.08),
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.cardRadius,
            backgroundColor: isDark ? "rgba(16, 185, 129, 0.12)" : alpha(tokens.palette.background.panelMuted, 0.9),
            border: `1px solid ${tokens.palette.divider}`,
            color: tokens.palette.text.primary,
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            "&.Mui-checked": {
              color: tokens.palette.primary.main,
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: tokens.palette.primary.main,
              opacity: 0.8,
            },
          },
          track: {
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
  });
}

const theme = createAppTheme("glassmorphic");
export default theme;

declare module "@mui/material/styles" {
  interface TypeBackground {
    panel: string;
    panelMuted: string;
    manuscript: string;
    rail: string;
  }
}
