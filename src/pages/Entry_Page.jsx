import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Entry_Page = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 2,
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          mb: 3,
          fontSize: { xs: '2rem', sm: '3rem' },
          fontWeight: 'bold',
          color: theme.palette.primary.main,
        }}
      >
        TransPak Imports
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          mb: 4,
          fontSize: { xs: '0.875rem', sm: '1rem' },
          maxWidth: '600px',
          color: theme.palette.text.primary,
        }}
      >
        Welcome to TransPak Imports, your trusted partner in global trade.
        We've been bridging the gap between international suppliers and local
        businesses, providing seamless import solutions that drive growth and
        profitability. With a keen eye for quality, a deep understanding of
        market trends, and a commitment to customer satisfaction, we source
        and deliver a wide range of products to meet the diverse needs of our
        clients. From raw materials to finished goods, our extensive network
        of suppliers and logistics expertise ensure that your imports arrive
        on time, every time. Explore our website to discover how TransPak
        Imports can help you navigate the complexities of global trade and
        unlock new opportunities for your business.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          component={Link}
          to="/PickupInfo"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            px: 4,
            py: 2,
            borderRadius: 4,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            boxShadow: theme.shadows[2],
            ':hover': {
              boxShadow: theme.shadows[6],
            },
          }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
};

export default Entry_Page;
