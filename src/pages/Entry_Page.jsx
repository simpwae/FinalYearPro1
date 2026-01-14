import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Box, Button, Paper, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PublicIcon from "@mui/icons-material/Public";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";

const Entry_Page = () => {
  const theme = useTheme();

  // Memoize container styles to avoid recalculation
  const containerStyles = useMemo(
    () => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      px: 0,
      py: 0,
      boxSizing: "border-box",
      background:
        "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.15,
        pointerEvents: "none",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "radial-gradient(circle at 20% 50%, rgba(98, 0, 234, 0.3) 0%, transparent 50%)",
        pointerEvents: "none",
      },
    }),
    []
  );

  const titleStyles = useMemo(
    () => ({
      mb: 2,
      fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
      fontWeight: 900,
      color: "white",
      textShadow: "0 4px 20px rgba(0,0,0,0.3)",
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
      textAlign: "center",
    }),
    [theme]
  );

  const descriptionStyles = useMemo(
    () => ({
      mb: 3,
      fontSize: { xs: "1rem", sm: "1.125rem" },
      maxWidth: "800px",
      color: theme.palette.text.secondary,
      lineHeight: 1.8,
      textAlign: "center",
    }),
    [theme]
  );

  const buttonStyles = useMemo(
    () => ({
      px: 5,
      py: 2,
      borderRadius: 3,
      fontSize: { xs: "1rem", sm: "1.125rem" },
      fontWeight: 600,
      textTransform: "none",
      boxShadow: "0 8px 24px rgba(98, 0, 234, 0.3)",
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 32px rgba(98, 0, 234, 0.4)",
      },
      "&:active": {
        transform: "translateY(-2px)",
      },
    }),
    [theme]
  );

  return (
    <Box sx={containerStyles}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, py: 8 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80"
            alt="Global Shipping"
            sx={{
              width: { xs: 80, md: 120 },
              height: { xs: 80, md: 120 },
              borderRadius: "50%",
              mb: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              border: "4px solid white",
            }}
          />
          <Typography variant="h1" sx={titleStyles}>
            TransPak Imports
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: "rgba(255,255,255,0.95)",
              fontWeight: 600,
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Your Trusted Partner in Global Trade
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 5,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="body1" sx={descriptionStyles}>
              Welcome to TransPak Imports, bridging the gap between
              international suppliers and local businesses. We provide seamless
              import solutions that drive growth and profitability with our
              extensive network of suppliers and logistics expertise.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2, mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    borderRadius: 3,
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80"
                    alt="Global Network"
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                  <PublicIcon
                    sx={{
                      fontSize: 48,
                      mb: 1,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Global Network
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Access to international suppliers and markets worldwide
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                    borderRadius: 3,
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&q=80"
                    alt="Fast Delivery"
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                  <LocalShippingIcon
                    sx={{
                      fontSize: 48,
                      mb: 1,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    On-Time Delivery
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Reliable logistics ensuring your imports arrive as scheduled
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "white",
                    borderRadius: 3,
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&q=80"
                    alt="Quality Assurance"
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                  <VerifiedIcon
                    sx={{
                      fontSize: 48,
                      mb: 1,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Quality Assured
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Commitment to excellence and customer satisfaction
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {/* Statistics Section */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, color: "primary.main", mb: 1 }}
                >
                  500+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Successful Shipments
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  border: "2px solid",
                  borderColor: "secondary.main",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, color: "secondary.main", mb: 1 }}
                >
                  50+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Countries Served
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  border: "2px solid",
                  borderColor: "success.main",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, color: "success.main", mb: 1 }}
                >
                  98%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  On-Time Rate
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  border: "2px solid",
                  borderColor: "warning.main",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, color: "warning.main", mb: 1 }}
                >
                  24/7
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Customer Support
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button
              component={Link}
              to="/PickupInfo"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                ...buttonStyles,
                background: "white",
                color: "primary.main",
                "&:hover": {
                  background: "rgba(255,255,255,0.9)",
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(255,255,255,0.4)",
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(Entry_Page);
