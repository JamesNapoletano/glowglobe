"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  shape: {
    borderRadius: 14,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#315a92",
      light: "#5f81b0",
      dark: "#24446f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#5d6f88",
    },
    background: {
      default: "#eef3f8",
      paper: "#fbfdff",
    },
    text: {
      primary: "#132033",
      secondary: "#607086",
    },
    divider: "rgba(79, 98, 126, 0.16)",
    success: {
      main: "#2f7a61",
    },
    error: {
      main: "#b14d5a",
    },
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontSize: "2.65rem",
      fontWeight: 750,
      letterSpacing: "-0.04em",
      lineHeight: 1.05,
    },
    h2: {
      fontSize: "2.1rem",
      fontWeight: 720,
      letterSpacing: "-0.03em",
      lineHeight: 1.08,
    },
    h3: {
      fontSize: "1.18rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.65,
    },
    overline: {
      fontSize: "0.7rem",
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          colorScheme: "light",
        },
        body: {
          margin: 0,
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, rgba(112, 145, 193, 0.16), transparent 24%), linear-gradient(180deg, #f8fbff 0%, #eef3f8 48%, #e7edf5 100%)",
          color: "#132033",
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        "button, input, textarea, select": {
          font: "inherit",
        },
        "::selection": {
          background: "rgba(53, 93, 150, 0.18)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: "1px solid rgba(79, 98, 126, 0.14)",
          boxShadow: "0 14px 34px rgba(20, 32, 51, 0.05)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          paddingInline: "0.95rem",
        },
        contained: {
          boxShadow: "0 8px 18px rgba(49, 90, 146, 0.18)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 22,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "rgba(248, 251, 255, 0.92)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(79, 98, 126, 0.12)",
        },
      },
    },
  },
});

export default theme;
