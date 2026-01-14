// import React from "react";
import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Entry_Page from "../pages/Entry_Page";
import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { CircularProgress, Box } from "@mui/material";

// Lazy load pages for code splitting
const ConfimationPage = lazy(() => import("../pages/ConfimationPage"));
const PickupInfo = lazy(() => import("../pages/PickupInfo"));
const OrderDonePage = lazy(() => import("../pages/OrderDonePage"));
const FeedbackPage = lazy(() => import("../pages/FeedbackPage"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const ThankYouPage = lazy(() => import("../pages/ThanksForFeed"));
const FeedbackSystem = lazy(() => import("../pages/Dashboard/FeedbackSystem"));
const Orders = lazy(() => import("../pages/Dashboard/Orders"));

// Loading component
const LoadingComponent = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

function RoutesPaths() {
  const ProtectedRoute = ({ element }) => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return <LoadingComponent />;

    return user ? element : <RedirectToSignIn />;
  };

  return (
    <div>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/" element={<Entry_Page />} />
          <Route path="/PickupInfo" element={<PickupInfo />} />
          <Route path="/confirm" element={<ConfimationPage />} />
          <Route path="/orderDone" element={<OrderDonePage />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/thankspage" element={<ThankYouPage />} />
          <Route
            path="/dashboard/feedbacksystem"
            element={<FeedbackSystem />}
          />
          <Route path="/dashboard/orders" element={<Orders />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default RoutesPaths;
