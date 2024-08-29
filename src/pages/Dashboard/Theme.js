import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // Purple color
    },
    secondary: {
      main: '#03dac6', // Teal color for secondary actions
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove box shadow for a cleaner look
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#6200ea', // Purple color for the drawer
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#ffffff', // White text color for the drawer items
        },
      },
    },
  },
});

export default theme;
