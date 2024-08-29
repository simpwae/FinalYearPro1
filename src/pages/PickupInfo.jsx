import React, { useState, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import data from "../modules/Prices.json";
import "./PickupInfo.css"; // Assuming this is where you style your form

const firebaseConfig = {
  apiKey: "AIzaSyAEzCNxIgewzTTgXT8hpXYA4x3_Swh4ScY",
  authDomain: "final-year-project-ed293.firebaseapp.com",
  projectId: "final-year-project-ed293",
  storageBucket: "final-year-project-ed293.appspot.com",
  messagingSenderId: "276657063134",
  appId: "1:276657063134:web:2dbcee058a11023115ee4f",
  measurementId: "G-B7V91X07CX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PickupInfo = () => {
  const navigate = useNavigate();
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

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "userData"), formData);
      console.log("Document written with ID: ", docRef.id);
      navigate("/confirm");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleCityChange = useCallback(
    (event) => {
      const selectedCity = event.target.value;
      const correspondingCountry = data.find(
        (item) => item.destinationCity === selectedCity
      )?.destinationCountry || "";
      setFormData((prev) => ({
        ...prev,
        destinationCity: selectedCity,
        destinationCountry: correspondingCountry,
      }));
    },
    []
  );

  const handleCountryChange = useCallback(
    (event) => {
      const selectedCountry = event.target.value;
      const firstCity = data.find(
        (item) => item.destinationCountry === selectedCountry
      )?.destinationCity || "";
      setFormData((prev) => ({
        ...prev,
        destinationCountry: selectedCountry,
        destinationCity: firstCity,
      }));
    },
    []
  );

  return (
    <form onSubmit={handleSubmit} className="pickup-form">
      <label>
        Mobile Number*
        <input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email*
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Service Type
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
        >
          <option value="">Please Select</option>
          <option value="Both">Express</option>
          {/* Add more options if needed */}
        </select>
      </label>

      <label>
        Weight (kg)
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
      </label>

      <label>
        Pickup Date
        <input
          type="date"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
        />
      </label>

      <label>
        Origin (City)
        <input
          type="text"
          name="originCity"
          value={formData.originCity}
          readOnly
        />
      </label>

      <label>
        Pickup Address
        <input
          type="text"
          name="pickUpAdd"
          value={formData.pickUpAdd}
          onChange={handleChange}
        />
      </label>

      <label>
        Consignee Name
        <input
          type="text"
          name="consigneeName"
          value={formData.consigneeName}
          onChange={handleChange}
        />
      </label>

      <label>
        Consignee Address
        <input
          type="text"
          name="consigneeAddress"
          value={formData.consigneeAddress}
          onChange={handleChange}
        />
      </label>

      <label>
        Consignee Email
        <input
          type="email"
          name="consigneeEmail"
          value={formData.consigneeEmail}
          onChange={handleChange}
        />
      </label>

      <label>
        Consignee Mobile Number
        <input
          type="tel"
          name="consigneeMobileNumber"
          value={formData.consigneeMobileNumber}
          onChange={handleChange}
        />
      </label>

      <label>
        Pickup Time
        <input
          type="time"
          name="pickupTime"
          value={formData.pickupTime}
          onChange={handleChange}
        />
      </label>

      <label>
        Destination (City)
        <select
          name="destinationCity"
          value={formData.destinationCity}
          onChange={handleCityChange}
          required
        >
          {data.map((item, index) => (
            <option key={index} value={item.destinationCity}>
              {item.destinationCity}
            </option>
          ))}
        </select>
      </label>

      <label>
        Destination Country
        <select
          name="destinationCountry"
          value={formData.destinationCountry}
          onChange={handleCountryChange}
          required
        >
          {[...new Set(data.map((item) => item.destinationCountry))].map(
            (country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            )
          )}
        </select>
      </label>

      <label>
        Special Instructions
        <textarea
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PickupInfo;
