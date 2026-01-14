import React, { useEffect, useState, useCallback } from "react";
import DashBoardLayout from "./DashBoardLayout";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../modules/AuthenticationFirebase";
import {
  Box,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Paper,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlaceIcon from "@mui/icons-material/Place";

const Orders = () => {
  const [dataTT, setDataTT] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  // Fetch data from Firestore and set up real-time updates
  const fetchData = useCallback(() => {
    const q = query(collection(db, "userData"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userData = querySnapshot.docs.map((doc) => doc.data());
      setDataTT(userData);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DashBoardLayout>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, color: theme.palette.primary.main }}
          >
            Export Orders
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {dataTT.length} {dataTT.length === 1 ? "order" : "orders"} found
          </Typography>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <CircularProgress size={60} />
          </Box>
        ) : dataTT.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderRadius: 3,
            }}
          >
            <LocalShippingIcon
              sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary">
              No orders available
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Orders will appear here once customers submit shipment requests
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {dataTT.map((data, index) => (
              <Grid item xs={12} lg={6} xl={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s",
                    border: `2px solid transparent`,
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocalShippingIcon
                          sx={{
                            fontSize: 28,
                            color: theme.palette.primary.main,
                          }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Order #{index + 1}
                        </Typography>
                      </Box>
                      <Chip
                        label={data.serviceType || "Express"}
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <PlaceIcon
                          sx={{ fontSize: 20, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Route
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          ml: 3.5,
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {data.originCity || "N/A"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          →
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {data.destinationCity || "N/A"}
                        </Typography>
                      </Box>
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Weight
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {data.weight || "0"} kg
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Pickup Date
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {data.pickupDate || "Not set"}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Accordion
                      elevation={0}
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                        "&:before": { display: "none" },
                        borderRadius: 2,
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          minHeight: 48,
                          "&.Mui-expanded": { minHeight: 48 },
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          View Full Details
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ pt: 0 }}>
                        <Grid container spacing={1.5}>
                          {Object.entries(data).map(([key, value]) => (
                            <Grid item xs={12} key={key}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {key.replace(/([A-Z])/g, " $1").trim()}:
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 500,
                                    maxWidth: "60%",
                                    textAlign: "right",
                                  }}
                                >
                                  {value || "N/A"}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </DashBoardLayout>
  );
};

export default React.memo(Orders); // Avoid unnecessary re-renders
