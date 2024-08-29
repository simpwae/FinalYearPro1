import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";
import "./OrderDonePage.css";

const OrderDonePage = () => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompleted(true);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="order-done-container">
      <div className={`checkmark-container ${completed ? "done" : ""}`}>
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark-check"
            fill="none"
            d="M16 26l6 6 14-14"
          />
        </svg>
      </div>
      <h1 className="title">Thank you for your order!</h1>
      <Button
        variant="outlined"
        className="btn"
        style={{ color: purple[500], borderColor: purple[500] }}
        href="/"
      >
        Return
      </Button>
    </div>
  );
};

export default OrderDonePage;
