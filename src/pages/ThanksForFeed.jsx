import React from "react";
import { Typography, Container, Box } from "@mui/material";

const ThankYouPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
        boxSizing: "border-box",
        marginTop: "50px",
      }}
    >
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Thank you for your feedback!
        </Typography>
        <Typography variant="body1" gutterBottom>
          We appreciate the time you took to share your thoughts with us. Your
          feedback is invaluable in helping us improve our services.
        </Typography>
      </Box>
    </Container>
  );
};

export default ThankYouPage;
