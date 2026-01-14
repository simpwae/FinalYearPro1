import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Container, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";

const OrderDonePage = () => {
  const [completed, setCompleted] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompleted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: theme.palette.success.light,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              transform: completed ? "scale(1)" : "scale(0)",
              opacity: completed ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 64,
                color: theme.palette.success.main,
              }}
            />
          </Box>

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Order Confirmed!
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Thank you for your order. We'll process your shipment request and
            contact you shortly with the details.
          </Typography>

          <Button
            variant="contained"
            size="large"
            href="/"
            startIcon={<HomeIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.125rem",
              fontWeight: 600,
              boxShadow: "0 8px 24px rgba(98, 0, 234, 0.3)",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px rgba(98, 0, 234, 0.4)",
              },
            }}
          >
            Return to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default React.memo(OrderDonePage);
