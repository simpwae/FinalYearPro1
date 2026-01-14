import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import { Button, AppBar, Toolbar, Typography, Box } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useUser } from "@clerk/clerk-react";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function Navbar() {
  const { user, isLoaded } = useUser();

  // Memoize appbar sx to prevent recalculation on every render
  const appBarSx = useMemo(
    () => ({
      background: `linear-gradient(135deg, ${purple[700]} 0%, ${purple[500]} 100%)`,
      zIndex: (theme) => theme.zIndex.drawer + 1,
      width: "100%",
      boxShadow: "0 4px 12px rgba(98, 0, 234, 0.3)",
      backdropFilter: "blur(10px)",
    }),
    []
  );

  if (!isLoaded) return null;

  return (
    <AppBar position="fixed" sx={appBarSx}>
      <Toolbar sx={{ py: 1 }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            fontSize: { xs: "1.5rem", md: "1.875rem" },
            letterSpacing: "0.5px",
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          <LocalShippingIcon sx={{ fontSize: "2rem" }} />
          TransPak
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/dashboard"
            disabled={!user}
            startIcon={<DashboardIcon />}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                transform: "translateY(-2px)",
              },
              "&.Mui-disabled": {
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/feedback"
            startIcon={<FeedbackIcon />}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Feedback
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/PickupInfo"
            startIcon={<LocalShippingIcon />}
            sx={{
              mr: 2,
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              backgroundColor: "white",
              color: purple[600],
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Start Export
          </Button>
        </Box>
        <LoginForm />
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(Navbar);
