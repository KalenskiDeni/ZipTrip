import { useState } from "react";
import { NavLink } from "react-router-dom";
import "/src/styles.css";
import bar from "../assets/status-bar.png";
import logo from "/src/assets/logoziptrip.png"; // Logo path
import userAvatar from "../assets/icons/userAvatar.svg"; // Placeholder for user avatar
import locationIcon1 from "../assets/icons/locationIcon1.svg"; // Add icons for inputs
import locationIcon2 from "../assets/icons/locationIcon2.svg"; // Add icons for inputs
import calendarIcon from "../assets/icons/calendarIcon.svg";
import illustration from "../assets/icons/car-people.svg";

export default function ExplorePage() {
  // State for inputs
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");

  return (
    <section className="page">
      {/* Top Bar */}
      <header className="top-bar">
  <div className="top-bar-content">
    <img src={bar} alt="status bar" className="bar" />
    <div className="logo-container">
      <img src={logo} alt="ZipTrip Logo" className="logo" />
    </div>
    <img src={userAvatar} alt="User Profile" className="avatar-profile" />
  </div>
</header>


       {/* Page Heading */}
       <div className="weird-text">
        <h1>Search your destination</h1>
      </div>

      {/* Search Inputs */}
      <div className="search-container">
        {/* Where From */}
        <div className="input-container-home">
          <img src={locationIcon1} alt="Where From Icon" className="input-icon-home" />
          <input
            type="text"
            placeholder="Where from?"
            className="input-field-home"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
          />
        </div>

        {/* Where To */}
        <div className="input-container-home">
          <img src={locationIcon2} alt="Where To Icon" className="input-icon-home" />
          <input
            type="text"
            placeholder="Where to?"
            className="input-field-home"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
          />
        </div>

        {/* When */}
        <div className="input-container-home">
          <img src={calendarIcon} alt="When Icon" className="input-icon-home" />
          <input
            type="date"
            className="input-field-home"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
          />
        </div>
      </div>

      {/* Illustration Section */}
      <section className="illustration-section">
        <img src={illustration} alt="People in a car with a map" className="illustration-image" />
      </section>

      {/* CTA Button */}
      <button
        className="cta-button"
        onClick={() =>
          console.log(`From: ${fromLocation}, To: ${toLocation}, Date: ${travelDate}`)
        }
      >
        Search rides
      </button>
    </section>
  );
}
