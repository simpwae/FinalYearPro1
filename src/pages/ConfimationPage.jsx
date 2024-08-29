import React, { useEffect, useState, useCallback } from "react";
import style from "./ConfimationPage.module.css";
import data from "../modules/Prices.json";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEzCNxIgewzTTgXT8hpXYA4x3_Swh4ScY",
  authDomain: "final-year-project-ed293.firebaseapp.com",
  projectId: "final-year-project-ed293",
  storageBucket: "final-year-project-ed293.appspot.com",
  messagingSenderId: "276657063134",
  appId: "1:276657063134:web:2dbcee058a11023115ee4f",
  measurementId: "G-B7V91X07CX",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ConfimationPage = () => {
  const [dataTT, setDataTT] = useState([]);
  const [getdata, setGetData] = useState([]);
  const navigate = useNavigate();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userData"));
        const dataArray = querySnapshot.docs.map((doc) => doc.data());
        console.log("Fetched data from Firestore:", dataArray); // Debug log
        setDataTT(dataArray);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };
    fetchData();
  }, []);

  // Process and filter data
  useEffect(() => {
    if (dataTT.length > 0) {
      const destinationCity = dataTT[0].destinationCity.toLowerCase();
      const filteredPriceData = data.filter(
        (item) => item.destinationCity.trim().toLowerCase() === destinationCity
      );

      console.log("Filtered data:", filteredPriceData); // Debug log
      setGetData(filteredPriceData);
    } else {
      setGetData([]);
    }
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
            "user_id" // Replace 'user_id' with your actual EmailJS user ID
          )
          .then((response) => {
            console.log("Email sent successfully:", response);
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      }
    },
    [getdata, navigate]
  );

  return (
    <div className={style.container}>
      <h1>Confirmation</h1>
      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Service Type</th>
              <th>Payment Type</th>
              <th>Weight</th>
              <th>Destination City</th>
              <th>Destination Country</th>
              <th>Origin City</th>
              <th>Origin Country</th>
              <th>Code Amount</th>
              <th>Tax</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {getdata.length > 0 ? (
              getdata.map((item, index) => {
                const baseAmount = item.codAmount;
                const weightAdjustment =
                  item.weight > 1 ? baseAmount * 0.05 : 0; // Additional 5% for weights greater than 1kg
                const taxAmount = baseAmount * 0.05; // 5% tax
                const totalAmount = baseAmount + weightAdjustment + taxAmount;

                return (
                  <tr key={index}>
                    <td>{item.serviceType}</td>
                    <td>{item.paymentType}</td>
                    <td>{item.weight}kg</td>
                    <td>{item.destinationCity}</td>
                    <td>{item.destinationCountry}</td>
                    <td>{item.originCity}</td>
                    <td>{item.originCountry}</td>
                    <td>{baseAmount.toFixed(2)}</td>
                    <td>{taxAmount.toFixed(2)}</td>
                    <td>{totalAmount.toFixed(2)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button onClick={onBackPage} className={style.button}>
        Go back
      </button>
      <button onClick={nextPage} className={style.button}>
        Continue
      </button>
    </div>
  );
};

export default ConfimationPage;
