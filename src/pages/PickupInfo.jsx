import React, { useState } from "react";
import "./PickupInfo.css";
const PickupInfo = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [shipperName, setShipperName] = useState("");
  const [consignmentType, setConsignmentType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [weight, setWeight] = useState(0.0);
  const [pickupDate, setPickupDate] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [shipperAddress, setShipperAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [buildingHouseNo, setBuildingHouseNo] = useState("");
  const [consigneeName, setConsigneeName] = useState("");
  const [consigneeAddress, setConsigneeAddress] = useState("");
  const [consigneeEmail, setConsigneeEmail] = useState("");
  const [consigneeMobileNumber, setConsigneeMobileNumber] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API or perform form submission logic here
    console.log("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Mobile Number*
        <input
          type="tel"
          value={mobileNumber}
          onChange={(event) => setMobileNumber(event.target.value)}
          required
        />
      </label>

      <label>
        Email*
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label>
        Shipper Name
        <input
          type="text"
          value={shipperName}
          onChange={(event) => setShipperName(event.target.value)}
        />
      </label>

      <label>
        Consignment Type
        <select
          value={consignmentType}
          onChange={(event) => setConsignmentType(event.target.value)}
        >
          <option value="">Please Select</option>
          {/* Add options for consignment types */}
        </select>
      </label>

      <label>
        Service Type
        <select
          value={serviceType}
          onChange={(event) => setServiceType(event.target.value)}
        >
          <option value="">Please Select</option>
          {/* Add options for service types */}
        </select>
      </label>

      <label>
        Weight (kg)
        <input
          type="number"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          step="0.1"
        />
      </label>

      <label>
        Pickup Date
        <input
          type="date"
          value={pickupDate}
          onChange={(event) => setPickupDate(event.target.value)}
        />
      </label>

      <label>
        Origin (City)
        <input
          type="text"
          value={originCity}
          onChange={(event) => setOriginCity(event.target.value)}
        />
      </label>

      <label>
        Shipper Address
        <input
          type="text"
          value={shipperAddress}
          onChange={(event) => setShipperAddress(event.target.value)}
        />
      </label>

      <label>
        Landmark
        <input
          type="text"
          value={landmark}
          onChange={(event) => setLandmark(event.target.value)}
        />
      </label>

      <label>
        Building/House No.
        <input
          type="text"
          value={buildingHouseNo}
          onChange={(event) => setBuildingHouseNo(event.target.value)}
        />
      </label>

      <label>
        Consignee Name
        <input
          type="text"
          value={consigneeName}
          onChange={(event) => setConsigneeName(event.target.value)}
        />
      </label>

      <label>
        Consignee Address
        <input
          type="text"
          value={consigneeAddress}
          onChange={(event) => setConsigneeAddress(event.target.value)}
        />
      </label>

      <label>
        Consignee Email
        <input
          type="email"
          value={consigneeEmail}
          onChange={(event) => setConsigneeEmail(event.target.value)}
        />
      </label>

      <label>
        Consignee Mobile Number
        <input
          type="tel"
          value={consigneeMobileNumber}
          onChange={(event) => setConsigneeMobileNumber(event.target.value)}
        />
      </label>

      <label>
        Pickup Time
        <input
          type="time"
          value={pickupTime}
          onChange={(event) => setPickupTime(event.target.value)}
        />
      </label>

      <label>
        Destination (City)
        <input
          type="text"
          value={destinationCity}
          onChange={(event) => setDestinationCity(event.target.value)}
        />
      </label>

      <label>
        Special Instructions
        <textarea
          value={specialInstructions}
          onChange={(event) => setSpecialInstructions(event.target.value)}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PickupInfo;
