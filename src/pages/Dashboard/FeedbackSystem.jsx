import React, { useEffect, useState, useCallback } from 'react';
import DashBoardLayout from './DashBoardLayout';
import { db } from '../../modules/AuthenticationFirebase';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Typography, Box, IconButton, CircularProgress, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

function FeedbackSystem() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch feedback data from Firestore
  const fetchFeedbacks = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedbackData"));
      const feedbackData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(feedbackData);
    } catch (error) {
      setError("Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  // Handle feedback deletion
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "feedbackData", id));
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
      setOpenSnackbar(true); // Show success message
    } catch (error) {
      setError("Failed to delete feedback");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <DashBoardLayout>
      <Typography variant="h3" align="center" gutterBottom color="textPrimary">
        Feedbacks
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="h6" align="center" color="error">
          {error}
        </Typography>
      ) : feedbacks.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No feedbacks
        </Typography>
      ) : (
        feedbacks.map((feedback) => (
          <Box
            key={feedback.id}
            sx={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
            }}
          >
            <Typography variant="body1" gutterBottom sx={{ mb: { xs: 2, sm: 0 } }}>
              {feedback.feedback}
            </Typography>
            <IconButton
              onClick={() => handleDelete(feedback.id)}
              color="error"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Feedback deleted successfully!
        </Alert>
      </Snackbar>
    </DashBoardLayout>
  );
}

export default FeedbackSystem;
