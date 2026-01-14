import React, { useState, useCallback } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Container,
} from "@mui/material";
import { db } from "../modules/AuthenticationFirebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";

function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (feedback.trim() === "") {
        console.log("Please enter some feedback");
        return;
      }

      try {
        await addDoc(collection(db, "feedbackData"), {
          feedback: feedback.trim(),
        });
        setFeedback("");
        navigate("/thankspage");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    [feedback, navigate]
  );

  const handleChange = useCallback((e) => {
    setFeedback(e.target.value);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: { xs: 10, md: 12 },
        px: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <FeedbackIcon
              sx={{ fontSize: 64, color: theme.palette.primary.main, mb: 2 }}
            />
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              Share Your Feedback
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We value your input to improve our services
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="Your Feedback"
              multiline
              rows={6}
              value={feedback}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              placeholder="Tell us about your experience, suggestions, or any issues you encountered..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              endIcon={<SendIcon />}
              sx={{
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
              Submit Feedback
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default React.memo(FeedbackPage);
