import React, { useState, useCallback, useMemo } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import data from "../modules/Prices.json";
import { db } from "../modules/AuthenticationFirebase";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Box,
  Divider,
  InputAdornment,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import BusinessIcon from "@mui/icons-material/Business";
import PlaceIcon from "@mui/icons-material/Place";

const PickupInfo = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
    serviceType: "",
    weight: 0.0,
    pickupDate: "",
    originCity: "Peshawar",
    pickUpAdd: "",
    consigneeName: "",
    consigneeAddress: "",
    consigneeEmail: "",
    consigneeMobileNumber: "",
    pickupTime: "",
    destinationCountry: "",
    destinationCity: "",
    specialInstructions: "",
  });

  // Memoize processed data to avoid recalculation
  const countriesList = useMemo(
    () => [...new Set(data.map((item) => item.destinationCountry))],
    []
  );

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await addDoc(collection(db, "userData"), formData);
        navigate("/confirm");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    [formData, navigate]
  );

  const handleCityChange = useCallback((event) => {
    const selectedCity = event.target.value;
    const correspondingCountry =
      data.find((item) => item.destinationCity === selectedCity)
        ?.destinationCountry || "";
    setFormData((prev) => ({
      ...prev,
      destinationCity: selectedCity,
      destinationCountry: correspondingCountry,
    }));
  }, []);

  const handleCountryChange = useCallback((event) => {
    const selectedCountry = event.target.value;
    const firstCity =
      data.find((item) => item.destinationCountry === selectedCountry)
        ?.destinationCity || "";
    setFormData((prev) => ({
      ...prev,
      destinationCountry: selectedCountry,
      destinationCity: firstCity,
    }));
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: { xs: 10, md: 12 },
        px: 2,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "url('https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 16px 48px rgba(0, 0, 0, 0.2)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"
            alt="Shipping Form"
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 3,
              mb: 4,
            }}
          />
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <LocalShippingIcon
              sx={{ fontSize: 56, color: theme.palette.primary.main, mb: 2 }}
            />
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              Export Shipment Request
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Fill in the details below to initiate your export shipment
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            {/* Contact Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PersonIcon color="primary" />
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Mobile Number"
                    name="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Shipment Details Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LocalShippingIcon color="primary" />
                Shipment Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    select
                    label="Service Type"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Please Select</MenuItem>
                    <MenuItem value="Both">Express</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    inputProps={{ min: 0, step: 0.1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Pickup Date"
                    name="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Pickup Time"
                    name="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Pickup Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LocationOnIcon color="primary" />
                Pickup Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Origin City"
                    name="originCity"
                    value={formData.originCity}
                    InputProps={{ readOnly: true }}
                    sx={{ backgroundColor: "#f5f5f5" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Pickup Address"
                    name="pickUpAdd"
                    value={formData.pickUpAdd}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Consignee Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PersonIcon color="primary" />
                Consignee Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Consignee Name"
                    name="consigneeName"
                    value={formData.consigneeName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Consignee Mobile Number"
                    name="consigneeMobileNumber"
                    type="tel"
                    value={formData.consigneeMobileNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Consignee Email"
                    name="consigneeEmail"
                    type="email"
                    value={formData.consigneeEmail}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Consignee Address"
                    name="consigneeAddress"
                    value={formData.consigneeAddress}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Destination Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LocationOnIcon color="primary" />
                Destination
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    select
                    label="Destination Country"
                    name="destinationCountry"
                    value={formData.destinationCountry}
                    onChange={handleCountryChange}
                  >
                    {countriesList.map((country, index) => (
                      <MenuItem key={index} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    select
                    label="Destination City"
                    name="destinationCity"
                    value={formData.destinationCity}
                    onChange={handleCityChange}
                  >
                    {data.map((item, index) => (
                      <MenuItem key={index} value={item.destinationCity}>
                        {item.destinationCity}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Special Instructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    placeholder="Any special handling requirements or additional information..."
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Submit Button */}
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                sx={{
                  px: 6,
                  py: 2,
                  borderRadius: 3,
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 8px 24px rgba(98, 0, 234, 0.3)",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(98, 0, 234, 0.4)",
                  },
                }}
              >
                Submit Request
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default React.memo(PickupInfo);
