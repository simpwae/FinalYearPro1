import React, { useEffect, useState, useCallback, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { db } from "../modules/AuthenticationFirebase";
import data from "../modules/Prices.json";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const ConfimationPage = () => {
  const [dataTT, setDataTT] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Fetch user data from Firestore - only once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userData"));
        const dataArray = querySnapshot.docs.map((doc) => doc.data());
        setDataTT(dataArray);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };
    fetchData();
  }, []);

  // Memoize filtered data to avoid recalculation
  const getdata = useMemo(() => {
    if (dataTT.length === 0) return [];
    const destinationCity = dataTT[0].destinationCity.toLowerCase();
    return data.filter(
      (item) => item.destinationCity.trim().toLowerCase() === destinationCity
    );
  }, [dataTT]);

  // Navigate to previous page
  const onBackPage = useCallback(
    (e) => {
      e.preventDefault();
      navigate("/PickupInfo");
    },
    [navigate]
  );

  // Navigate to next page and send email
  const nextPage = useCallback(
    (e) => {
      e.preventDefault();
      navigate("/orderDone");

      if (getdata.length > 0) {
        const { consigneeName, originCity, destinationCity, codAmount } =
          getdata[0];
        emailjs
          .send(
            "service_jblwlzl",
            "template_l0zl199",
            {
              name: consigneeName,
              order_items: [
                {
                  origin_city: originCity,
                  destination_city: destinationCity,
                  unit_price: codAmount,
                  total_price: codAmount,
                },
              ],
              total_amount: codAmount,
            },
            "user_id"
          )
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      }
    },
    [getdata, navigate]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: { xs: 10, md: 12 },
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <CheckCircleIcon
              sx={{ fontSize: 64, color: theme.palette.success.main, mb: 2 }}
            />
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              Order Confirmation
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please review your shipment details below
            </Typography>
          </Box>

          {getdata.length > 0 && (
            <Card
              sx={{
                mb: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: "white",
                boxShadow: "0 8px 24px rgba(98, 0, 234, 0.3)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                      <Typography variant="caption" sx={{ opacity: 0.9 }}>
                        Origin
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          justifyContent: { xs: "center", md: "flex-start" },
                        }}
                      >
                        <LocalShippingIcon />
                        {getdata[0].originCity}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <ArrowForwardIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
                      <Typography variant="caption" sx={{ opacity: 0.9 }}>
                        Destination
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          justifyContent: { xs: "center", md: "flex-end" },
                        }}
                      >
                        {getdata[0].destinationCity}
                        <LocalShippingIcon />
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Service Type
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {getdata[0].serviceType}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Weight
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {getdata[0].weight} kg
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Base Amount
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ${getdata[0].codAmount?.toFixed(2) || "0.00"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Total Amount
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      $
                      {(
                        getdata[0].codAmount +
                        (getdata[0].weight > 1
                          ? getdata[0].codAmount * 0.05
                          : 0) +
                        getdata[0].codAmount * 0.05
                      ).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {!isMobile ? (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ mb: 4, border: "1px solid #e0e0e0", borderRadius: 2 }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    }}
                  >
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>
                      Service Type
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>
                      Payment Type
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>
                      Weight
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>
                      Destination
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>
                      Origin
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>
                      Base Amount
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>
                      Tax
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getdata.length > 0 ? (
                    getdata.map((item, index) => {
                      const baseAmount = item.codAmount;
                      const weightAdjustment =
                        item.weight > 1 ? baseAmount * 0.05 : 0;
                      const taxAmount = baseAmount * 0.05;
                      const totalAmount =
                        baseAmount + weightAdjustment + taxAmount;

                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:nth-of-type(odd)": {
                              backgroundColor: "#f9f9f9",
                            },
                            "&:hover": { backgroundColor: "#f0f0f0" },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <TableCell>
                            <Chip
                              label={item.serviceType}
                              color="primary"
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{item.paymentType}</TableCell>
                          <TableCell>{item.weight}kg</TableCell>
                          <TableCell>
                            <strong>{item.destinationCity}</strong>
                            <Typography
                              variant="caption"
                              display="block"
                              color="text.secondary"
                            >
                              {item.destinationCountry}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <strong>{item.originCity}</strong>
                            <Typography
                              variant="caption"
                              display="block"
                              color="text.secondary"
                            >
                              {item.originCountry}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            ${baseAmount.toFixed(2)}
                          </TableCell>
                          <TableCell sx={{ color: theme.palette.warning.main }}>
                            ${taxAmount.toFixed(2)}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.success.main,
                              fontSize: "1.1rem",
                            }}
                          >
                            ${totalAmount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No data available
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ mb: 4 }}>
              {getdata.length > 0 ? (
                getdata.map((item, index) => {
                  const baseAmount = item.codAmount;
                  const weightAdjustment =
                    item.weight > 1 ? baseAmount * 0.05 : 0;
                  const taxAmount = baseAmount * 0.05;
                  const totalAmount = baseAmount + weightAdjustment + taxAmount;

                  return (
                    <Card key={index} sx={{ mb: 2, boxShadow: 2 }}>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Chip
                              label={item.serviceType}
                              color="primary"
                              size="small"
                              sx={{ mb: 1 }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Weight
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                              {item.weight}kg
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Payment
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                              {item.paymentType}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              From
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {item.originCity}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              To
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {item.destinationCity}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Base Amount
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                              ${baseAmount.toFixed(2)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Tax
                            </Typography>
                            <Typography variant="body1" color="warning.main">
                              ${taxAmount.toFixed(2)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider sx={{ my: 1 }} />
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="body1" fontWeight={600}>
                                Total Amount
                              </Typography>
                              <Typography
                                variant="h6"
                                color="success.main"
                                fontWeight={700}
                              >
                                ${totalAmount.toFixed(2)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign="center"
                >
                  No data available
                </Typography>
              )}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={onBackPage}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              size="large"
              endIcon={<CheckCircleIcon />}
              onClick={nextPage}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 8px 24px rgba(98, 0, 234, 0.3)",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 32px rgba(98, 0, 234, 0.4)",
                },
              }}
            >
              Confirm Order
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default React.memo(ConfimationPage);
