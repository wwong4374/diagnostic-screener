import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4A90E2',
    },
    background: {
      default: '#c9dff5',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 1000,
          width: '250px',
          borderRadius: '12px',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
          height: 10,
        },
        bar: {
          backgroundColor: '#4A90E2',
          borderRadius: 5,
        },
      },
    },
  },
});
