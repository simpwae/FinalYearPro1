import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const DashBoardLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detect mobile screens

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
          ml: isMobile ? 0 : `${drawerWidth}px`,
          backgroundColor: theme.palette.primary.main,
          transition: 'margin 0.3s', // Smooth transition for drawer toggling
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={!isMobile ? true : undefined} // Always open on larger screens
        onClose={() => { /* Add logic for closing on mobile if needed */ }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/dashboard/orders">
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/Feedbacksystem">
            <ListItemText primary="Feedback System" />
          </ListItem>
          <ListItem button component={Link} to="/">
            <ListItemText primary="GO BACK" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: isMobile ? 0 : `${drawerWidth}px`,
          width: '100%',
          height: '100vh', // Use vh for better full-screen experience
          backgroundColor: '#fff',
          transition: 'margin 0.3s', // Smooth transition for drawer toggling
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default React.memo(DashBoardLayout); // Avoid unnecessary re-renders
