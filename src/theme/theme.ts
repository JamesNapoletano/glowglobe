import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c3aed', // Vibrant violet/purple for creativity
      light: '#8b5cf6',
      dark: '#5b21b6',
    },
    secondary: {
      main: '#0ea5e9', // Sky blue accent
      light: '#38bdf8',
      dark: '#0284c7',
    },
    background: {
      default: '#0f172a', // Slate 900 - Professional dark mode base
      paper: '#1e293b',   // Slate 800 - Slightly elevated surfaces
    },
    text: {
      primary: '#f8fafc', // Slate 50
      secondary: '#94a3b8', // Slate 400
    },
    divider: '#334155', // Slate 700
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.025em' },
    h2: { fontWeight: 700, letterSpacing: '-0.025em' },
    h3: { fontWeight: 600, letterSpacing: '-0.015em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 1,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          backgroundColor: '#7c3aed',
          color: 'white',
          border: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#8b5cf6',
            transform: 'translateY(-1px)',
          }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default MUI overlay
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #334155',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #334155',
          backgroundColor: '#0f172a',
        }
      }
    }
  },
});

export default theme;
