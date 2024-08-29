// import React from "react";
import { Route, Routes } from "react-router-dom";
import ConfimationPage from "../pages/ConfimationPage";
import Entry_Page from "../pages/Entry_Page";
// import LoginForm from "../components/LoginForm/LoginForm";
import OrderDonePage from "../pages/OrderDonePage";
import PickupInfo from "../pages/PickupInfo";
import FeedbackPage from "../pages/FeedbackPage";
import { RedirectToSignIn, useUser } from '@clerk/clerk-react';
import Dashboard from '../pages/Dashboard/Dashboard';
import ThankYouPage from "../pages/ThanksForFeed";
import FeedbackSystem from "../pages/Dashboard/FeedbackSystem";
import Orders from "../pages/Dashboard/Orders";
function RoutesPaths() {
  const ProtectedRoute = ({ element }) => {
    const { user, isLoaded } = useUser();
  
    if (!isLoaded) return null; // Wait for user info to load
  
    return user ? element : <RedirectToSignIn />;
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Entry_Page />} />
        <Route path="/PickupInfo" element={<PickupInfo />} />
        <Route path="/confirm" element={<ConfimationPage />} />
        <Route path="/orderDone" element={<OrderDonePage />} />
        {/* <Route path="/sign-in" element={<LoginForm />} /> */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/thankspage" element={<ThankYouPage />} />
        <Route path="/dashboard/feedbacksystem" element={<FeedbackSystem />} />
        <Route path="/dashboard/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default RoutesPaths;
