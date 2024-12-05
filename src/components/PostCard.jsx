import React from "react";
import { Link } from "react-router-dom";
import "/src/styles.css";
import locationIcon from "../assets/icons/location-icon1.svg"; 
import ferryIcon from "../assets/icons/ferry-icon.svg"; 
import ecoIcon from "../assets/icons/eco-icon.svg"; 

const PostCard = ({ ride }) => {
  // Ensure proper destructuring of the ride object
  const {
    date = "N/A",
    time = "N/A",
    departureTime = "N/A",
    arrivalTime = "N/A",
    pickupLocation = "Unknown Location",
    dropoffLocation = "Unknown Location",
    ferry = false,
    driver = {},
    price = "N/A",
  } = ride || {}; // Ensure ride data is not null or undefined

  const {
    profileImage = "https://via.placeholder.com/40", 
    name = "Unknown Driver",
    rating = 0,
    ratingCount = 0,
  } = driver;




  
  return (
    <Link to={`/posts/${ride.id}`} className="post-card-link">
      <div className="post-card">
        {/* Ride Date and Time */}
        <div className="post-header">
          <h3>{date}, {time}</h3>
          <div className="icons">
            {ferry && <img src={ferryIcon} alt="Ferry Icon" />}
            <img src={ecoIcon} alt="Eco Icon" />
          </div>
        </div>

        {/* Ride Details */}
        <div className="ride-info">
          <div className="time-location">
            <p className="time">{departureTime}</p>
            <p className="location">
              <img src={locationIcon} alt="Location Icon" />
              {pickupLocation}
            </p>
          </div>
          <div className="time-location">
            <p className="time">{arrivalTime}</p>
            <p className="location">
              <img src={locationIcon} alt="Location Icon" />
              {dropoffLocation}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr />

        {/* Driver Info and Price */}
        <div className="driver-info">
          <div className="driver-details">
            <img src={profileImage} alt="Driver" className="driver-image" />
            <div>
              <p className="driver-name">{name}</p>
              <p className="driver-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`star ${i < rating ? "filled" : ""}`}
                  >
                    ★
                  </span>
                ))}
                {ratingCount}
              </p>
            </div>
          </div>
          <p className="price">{price} DKK</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
