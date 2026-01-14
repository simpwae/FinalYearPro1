import React, { useEffect, useState, useCallback } from "react";
import DashBoardLayout from "./DashBoardLayout";
import { db } from "../../modules/AuthenticationFirebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Snackbar,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";

function FeedbackSystem() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const theme = useTheme();

  // Fetch feedback data from Firestore
  const fetchFeedbacks = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedbackData"));
      const feedbackData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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

  // Open delete confirmation dialog
  const openDeleteDialog = (feedback) => {
    setFeedbackToDelete(feedback);
    setDeleteDialogOpen(true);
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setFeedbackToDelete(null);
  };

  // Handle feedback deletion
  const handleDelete = async () => {
    if (!feedbackToDelete) return;

    try {
      await deleteDoc(doc(db, "feedbackData", feedbackToDelete.id));
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback.id !== feedbackToDelete.id)
      );
      setOpenSnackbar(true);
      closeDeleteDialog();
    } catch (error) {
      setError("Failed to delete feedback");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <DashBoardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FeedbackIcon sx={{ fontSize: 36 }} />
          Customer Feedback
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review and manage customer feedback submissions
        </Typography>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.dark,
          }}
        >
          <Typography variant="h6">{error}</Typography>
        </Paper>
      ) : feedbacks.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.02)",
          }}
        >
          <FeedbackIcon sx={{ fontSize: 72, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No feedback yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Customer feedback will appear here
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {feedbacks.map((feedback) => (
            <Card
              key={feedback.id}
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  borderColor: theme.palette.primary.main,
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      {feedback.feedback}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => openDeleteDialog(feedback)}
                    color="error"
                    aria-label="delete feedback"
                    sx={{
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Feedback?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this feedback? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
        >
          Feedback deleted successfully!
        </Alert>
      </Snackbar>
    </DashBoardLayout>
  );
}

export default FeedbackSystem;
