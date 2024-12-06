import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase-config"; // Firebase authentication

// Importing all icons and images
import locationIcon from "../assets/icons/location-icon1.svg";
import ferryIcon from "../assets/icons/ferry-icon.svg";
import ecoIcon from "../assets/icons/eco-icon.svg";
import detourIcon from "../assets/icons/detour-icon.svg";
import luggageIcon from "../assets/icons/luggage-icon.svg";
import musicIcon from "../assets/icons/music-icon.svg";
import smokingIcon from "../assets/icons/smoking-icon.svg";
import petsIcon from "../assets/icons/pets-icon.svg";
import childrenIcon from "../assets/icons/children-icon.svg";
import phoneVerifiedIcon from "../assets/icons/phone-verified-icon.svg";
import co2Icon from "../assets/icons/co2-icon.svg";
import airIcon from "../assets/icons/air-icon.svg";
import gasIcon from "../assets/icons/gas-icon.svg";
import treeIcon from "../assets/icons/tree-icon.svg";
import carImage from "../assets/icons/tesla-model-3.png";
import seatsIcon from "../assets/icons/seats-icon.svg";
import vehicleTypeIcon from "../assets/icons/vehicle-type-icon.svg";
import carModelIcon from "../assets/icons/car-model-icon.svg";
import comfortIcon from "../assets/icons/comfort-icon.svg";
import backButton from "../assets/icons/backButton.svg";
import bar from "../assets/status-bar.png";
import carImage2 from "../assets/icons/carimage2.svg";





export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(
        `https://ziptrip-ec0b6-default-rtdb.firebaseio.com/posts/${id}.json`
      );
      const data = await response.json();
      setPost(data);
    }

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  const {
    
    date,
    pickupLocation,
    dropoffLocation,
    departureTime,
  arrivalTime,
    price,
    seats,
    details = {},
    preferences = [],
    driver = {},
    vehicle = {},
    environmentalBenefits = {},
  } = post;


  console.log("Pickup Location:", pickupLocation);
  console.log("Dropoff Location:", dropoffLocation);

  async function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete this ride?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(
        `https://ziptrip-ec0b6-default-rtdb.firebaseio.com/posts/${id}.json`,
        { method: "DELETE" }
      );
      if (response.ok) {
        alert("Ride deleted successfully!");
        navigate("/"); // Redirect to home page after deletion
      } else {
        alert("Failed to delete the ride. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting the ride:", error);
    }
  }

  
  const handleBack = () => setStep((prev) => prev - 1);

  const { pickup = "Unknown Pickup", dropoff = "Unknown Dropoff" } = post;

  return (
    <section className="post-detail-page">
    
  
      <header className="detail-header">

    <img src={bar} alt="status bar" className="bar" />
    <img
            src={backButton}
            onClick={/*handleBack*/ () => navigate("/explore")}
            alt="Back"
            className="backbutton-rides"
          />
      <h2>{`${pickupLocation || "Unknown Pickup"} - ${dropoffLocation || "Unknown Dropoff"}`}</h2>

 
      </header>

     
     
    {/* Ride Summary */}
<div className="ride-summary">
  <h3>{date || "Unknown Date"}</h3>
  <div className="ride-times">
    <div>
      <p className="time">{post.departureTime || "Unknown Departure Time"}</p>
      <p className="location">
        <img src={locationIcon} alt="Location Icon" />
        {post.pickupLocation || "Unknown Pickup"}
      </p>
    </div>
    <p className="ferry-route">
      <img src={ferryIcon} alt="Ferry Icon" />
      {details?.ferry ? "Route is via ferry" : "No ferry"}
    </p>
    <div>
      <p className="time">{post.arrivalTime || "Unknown Arrival Time"}</p>
      <p className="location">
        <img src={locationIcon} alt="Location Icon" />
        {post.dropoffLocation || "Unknown Dropoff"}
      </p>
    </div>
  </div>
  <div className="ride-price">
    <p>{post.seats || 0} Seats</p>
    <p>{post.price || "N/A"} DKK Per Seat</p>
  </div>
</div>


      <div className="details-section">
  <h4>Details</h4>
  <div className="details-item">
    <img src={detourIcon} alt="Detour Icon" />
    <div>
      <h5>Detour</h5>
      <p>{details.detour || "The driver is willing to make a 5 min. detour"}</p>
    </div>
  </div>

  <div className="details-item">
    <img src={luggageIcon} alt="Luggage Icon" />
    <div>
      <h5>Luggage size</h5>
      <p>{details.luggageSize || "Large - e.g. bag or suitcase"}</p>
    </div>
  </div>

  <div className="details-item">
    <img src={comfortIcon} alt="Comfort Icon" />
    <div>
      <h5>Comfort</h5>
      <p>{details.comfort || "Driver guarantees a maximum of 2 passengers in the back seat"}</p>
    </div>
  </div>

  <div className="details-item">
    <img src={vehicleTypeIcon} alt="Booking Icon" />
    <div>
      <h5>Instant booking</h5>
      <p>{details.booking || "Book instantly without waiting for driver confirmation"}</p>
    </div>
  </div>
</div>


      {/* Preferences Section */}
      <div className="preferences-section">
        <h4>Preferences</h4>
        <ul>
          {preferences.includes("Music") && (
            <li>
              <img src={musicIcon} alt="Music Icon" /> Music
            </li>
          )}
          {preferences.includes("Smoking") && (
            <li>
              <img src={smokingIcon} alt="Smoking Icon" /> Smoking
            </li>
          )}
          {preferences.includes("Pets") && (
            <li>
              <img src={petsIcon} alt="Pets Icon" /> Pets
            </li>
          )}
          {preferences.includes("Children") && (
            <li>
              <img src={childrenIcon} alt="Children Icon" /> Children
            </li>
          )}
        </ul>
      </div>

      {/* Driver Section */}
      <div className="driver-section">
        <h4>Driver</h4>
        <div className="driver-info">
          <img
            src={driver.profileImage || "https://via.placeholder.com/40"}
            alt="Driver"
          />
          <div>
            <p className="driver-name1">{driver.name || "Unknown Driver"}</p>
          
          </div>
        </div>
        <p>
        Phone
          number
          <img src={phoneVerifiedIcon} alt="Phone Verified Icon" className="verified-img"/> 
        </p>
      </div>

   {/* Vehicle Section */}
<div className="vehicle-section">
  <h4>Vehicle</h4>

  {/* Display uploaded vehicle image */}
  <div className="vehicle-image">
    {post?.vehicle?.image ? (
      <img src={post.vehicle.image} alt="Vehicle" />
    ) : (
      <img src={carImage} alt="Car" /> 
    )}
  </div>

  <ul>
    <li>
      <img src={carModelIcon} alt="Car Model Icon" />
      <p>{post?.vehicle?.model || "Unknown Model"}</p>
    </li>
    <li>
      <img src={ecoIcon} alt="Year Icon" />
      <p>{post?.vehicle?.year || "Unknown Year"}</p>
    </li>
    <li>
      <img src={seatsIcon} alt="Seats Icon" />
      <p>{post?.vehicle?.seats || "Unknown Seats"} Seats</p>
    </li>
    <li>
      <img src={vehicleTypeIcon} alt="Vehicle Type Icon" />
      <p>{post?.vehicle?.type || "Unknown Type"}</p>
    </li>
  </ul>
</div>



      {/* Environmental Benefits Section */}
      <div className="environment-section">
        <h4>Environmental Benefits</h4>
        <img src={carImage2} alt="Car" className="illustration22" />

        <ul>
          
          <li>
            <img src={co2Icon} alt="CO2 Icon" /> {environmentalBenefits.co2 || 89} kg CO2 saved
          </li>
          <li>
            <img src={airIcon} alt="Clean Air Icon" /> {environmentalBenefits.cleanAir || 9}% clean air
          </li>
          <li>
            <img src={gasIcon} alt="Gas Icon" /> {environmentalBenefits.gas || 13} gallons of gas saved
          </li>
          <li>
            <img src={treeIcon} alt="Tree Icon" /> {environmentalBenefits.trees || 1.5} trees saved
          </li>
        </ul>
      </div>

     {/* Report Issue and Action Buttons */}
<div className="action-buttons">
  <button className="edit-button" onClick={() => navigate(`/posts/${id}/update`)}>
    Edit Ride
  </button>
  <button className="delete-button" onClick={handleDelete}>
    Delete Ride
  </button>
  <button className="start-instant-booking">Start Instant Booking</button>
  <button className="report-issue-but">Report issue with ride</button>
</div>

    </section>
  );
}
