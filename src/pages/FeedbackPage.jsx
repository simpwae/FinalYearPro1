import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { db } from "../modules/AuthenticationFirebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import style from "./FeedbackPage.module.css";

function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (feedback.trim() === "") {
      console.log("Please enter some feedback");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "feedbackData"), {
        feedback: feedback.trim(),
      });
      console.log("Document written with ID: ", docRef.id);
      setFeedback(""); // Clear feedback field
      navigate("/thankspage");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Box className={style.container}>
      <Typography variant="h4" gutterBottom>
        Feedback
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 600,
          mx: "auto", // Center the form horizontally
          p: 2,
        }}
      >
        <TextField
          label="Any Issues/Suggestions?"
          multiline
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Button variant="contained" type="submit" sx={{ alignSelf: "flex-start" }}>
          Submit Feedback
        </Button>
      </Box>
    </Box>
  );
}

export default FeedbackPage;
