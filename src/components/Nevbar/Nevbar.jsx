import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useUser } from "@clerk/clerk-react";

function Navbar() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;

  return (
    <AppBar
      position="fixed" // Ensure the navbar stays fixed at the top
      sx={{
        backgroundColor: purple[500],
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure the navbar is above other components
        width: '100%',
         // Ensure it covers the full width of the viewport
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontStyle: "italic", fontSize: "30px" }}
        >
          TransPak
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/dashboard"
          disabled={!user} // Disable if user is not logged in
        >
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/feedback">
          Feedback
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/PickupInfo"
          sx={{ mr: 2 }}
        >
          Export?
        </Button>
        <LoginForm />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
