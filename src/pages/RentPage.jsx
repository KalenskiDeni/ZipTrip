import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "/src/styles.css";

import keylessIcon from "../assets/icons/keyless.svg";
import blackFridayIcon from "../assets/icons/black-friday.svg";
import electricIcon from "../assets/icons/electric.svg";
import luggageIcon from "../assets/icons/luggage.svg";
import seatsIcon from "../assets/icons/seats.svg";
import distanceIcon from "../assets/icons/distance.svg";

import logo from "/src/assets/logoziptrip.png";
import userAvatar from "../assets/icons/userAvatar.svg";
import bar from "../assets/status-bar.png";
import { auth } from "../firebase-config"; // Firebase authentication

const handleAvatarClick = () => {
  navigate("/profile"); // Navigate to ProfilePage when avatar is clicked
};

export default function RentPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching the cars data from Firebase Realtime Database
  useEffect(() => {
    async function fetchCars() {
      try {
        const carsResponse = await fetch(
          "https://ziptrip-ec0b6-default-rtdb.firebaseio.com/cars.json"
        );
        const carsData = await carsResponse.json();
        console.log("Fetched Cars Data:", carsData); // Log the fetched data to check if it's coming in
        setCars(carsData || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  if (loading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  console.log("Cars Data in State:", cars); // Log the cars data stored in state

  return (
    <div className="ziptrip-car-page">
      <div className="top-bar-content">
        <img src={bar} alt="status bar" className="bar" />
        <div className="logo-container">
          <img src={logo} alt="ZipTrip Logo" className="logo" />
        </div>
        {/* Avatar Image from Firebase Authentication */}
      </div>

      <h1>Rent a Car</h1>
      <div className="ziptrip-car-list">
        {cars.map((car, index) => (
          <div key={index} className="ziptrip-car-card">
            <img
              src={car.image || "https://via.placeholder.com/150"}
              alt={car.name}
              className="ziptrip-car-image"
            />
            <h3>{car.name}</h3>
            <p>
              {car.price} {car.currency} for {car.duration}
            </p>
            <div className="ziptrip-details">
              <p>
                <img src={seatsIcon} alt="Seats" /> {car.seats} seats
              </p>
              <p>
                <img src={distanceIcon} alt="Distance Included" />{" "}
                {car.distanceIncluded} km included
              </p>
              <p>
                {car.isElectric ? (
                  <img src={electricIcon} alt="Electric" />
                ) : (
                  "Not Electric"
                )}
              </p>
              <p>
                {car.hasLuggageSpace && (
                  <img src={luggageIcon} alt="Luggage Space" />
                )}
                {car.hasLuggageSpace && " Space for Luggage"}
              </p>
              {car.hasKeyless && (
                <div className="ziptrip-keyless">
                  <img src={keylessIcon} alt="Keyless" />
                </div>
              )}
              {car.discount >= 10 && (
                <div className="ziptrip-black-friday">
                  <img src={blackFridayIcon} alt="Black Friday" />
                </div>
              )}
              <div className="ziptrip-discount">{car.discount}% Off</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
