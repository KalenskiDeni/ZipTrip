import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles.css";
import bar from "../assets/status-bar.png";
import userAvatar from "../assets/icons/userAvatar.svg"; // Placeholder for user avatar
import logo from "/src/assets/logoziptrip.png"; // Path to the logo
import backButton from "../assets/icons/backButton.svg";
import { auth } from "../firebase-config"; // Firebase authentication

const HostRideSteps = () => {
  const [step, setStep] = useState(1);
  const [rideDetails, setRideDetails] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    departureTime: "", // Store the departure time
    arrivalTime: "", // Store the arrival time
    detour: "",
    ferry: false,
    preferences: [],
    vehicle: {
      image: "",
      model: "",
      year: "",
      seats: "",
      type: "",
    },
    price: "",

  });
  const navigate = useNavigate();

  
  const user = auth.currentUser;
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleInputChange = (field, value) => {
    setRideDetails({ ...rideDetails, [field]: value });
  };

  // Format the date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })}, ${date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  // Handle the URL input for the vehicle image
  const handleImageUrlChange = (e) => {
    setRideDetails({
      ...rideDetails,
      vehicle: { ...rideDetails.vehicle, image: e.target.value },
    });
  };




    // Function to handle avatar click and navigate to the ProfilePage
    const handleAvatarClick = () => {
      navigate("/profile"); // Navigate to ProfilePage when avatar is clicked
    };
  

  // Handle the file input for the vehicle image
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 500000) {
      const reader = new FileReader();
      reader.onload = () => {
        setRideDetails({
          ...rideDetails,
          vehicle: { ...rideDetails.vehicle, image: reader.result },
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image smaller than 500 KB.");
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser; // Get the logged-in user's data from Firebase
  
    const rideWithUserInfo = {
      ...rideDetails,
      driver: {
        name: user.displayName || "Anonymous", // Use the displayName from Firebase or fallback to "Anonymous"
        profileImage: user.photoURL || "https://via.placeholder.com/40", // Use the photoURL or fallback to a placeholder image
        rating: 5, // Set a default rating or pull it from somewhere else
        ratingCount: 0, // Default to 0 ratings
      },
    };

    try {
      const response = await fetch(
        "https://ziptrip-ec0b6-default-rtdb.firebaseio.com/posts.json",
        {
          method: "POST",
          body: JSON.stringify(rideWithUserInfo),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        alert("Ride created successfully!");
        navigate("/"); // Redirect to home page
      } else {
        alert("Failed to create the ride. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting ride:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    
    <div className="host-ride-container-custom">
      
      <div className="top-bar-content">
        <img src={bar} alt="status bar" className="bar" />
        <div className="logo-container">
          <img src={logo} alt="ZipTrip Logo" className="logo" />
        </div>
        {/* Avatar Image from Firebase Authentication */}
        <img
            src={user?.photoURL || "https://via.placeholder.com/150"} // Use photoURL from Firebase or fallback
            alt="User Avatar"
            className="avatar-profile"
            onClick={handleAvatarClick} // Navigate to profile page on click
          />
      </div>

      {/* Step 1: Basic Ride Details */}
      {step === 1 && (
        <div className="step-custom">
          <h2>Host a Ride</h2>
          <input
            type="text"
            placeholder="Pickup location"
            value={rideDetails.pickupLocation}
            onChange={(e) =>
              handleInputChange("pickupLocation", e.target.value)
            }
            className="input-field-custom"
          />
          <input
            type="text"
            placeholder="Drop-off location"
            value={rideDetails.dropoffLocation}
            onChange={(e) =>
              handleInputChange("dropoffLocation", e.target.value)
            }
            className="input-field-custom"
          />
          <input
            type="datetime-local"
            value={rideDetails.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="input-field-custom"
            
          />
          {/* Departure Time Input */}
          Departure time
          <input
            type="time"
            value={rideDetails.departureTime}
            onChange={(e) => {
              setRideDetails({
                ...rideDetails,
                departureTime: e.target.value, // Only the time part
              });
            }}
            className="input-field-custom"
          />
          Arrival time
          {/* Arrival Time */}
          <input
            type="time"
            value={rideDetails.arrivalTime}
            onChange={(e) => handleInputChange("arrivalTime", e.target.value)}
            className="input-field-custom"
            placeholder="Arrival time"
          />
          Number of Seats
          <input
            type="number"
            placeholder="Number of Seats"
            value={rideDetails.seats}
            onChange={(e) => handleInputChange("seats", e.target.value)}
            className="input-field-custom"
          />
          Detour
          <input
            type="text"
            placeholder="Detour (e.g., max 5 min)"
            value={rideDetails.detour}
            onChange={(e) => handleInputChange("detour", e.target.value)}
            className="input-field-custom"
          />
          <label className="checkbox-label-custom">
            <input
              type="checkbox"
              checked={rideDetails.ferry}
              onChange={(e) => handleInputChange("ferry", e.target.checked)}
              className="input-checkbox-custom"
            />
            Use ferry
          </label>
          <button
            onClick={handleNext}
            className="button-custom next-button-custom"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Preferences */}
      {step === 2 && (
        <div className="step-custom">
          <img
            src={backButton}
            onClick={handleBack}
            alt="Back"
            className="backbutton-host"
          />
          <h2>Your Preferences</h2>
          <div className="preferences-options-custom">
            {["Music", "Pets", "Smoking", "Children"].map((preference) => (
              <button
                key={preference}
                className={`preference-button-custom ${
                  rideDetails.preferences.includes(preference) ? "selected" : ""
                }`}
                onClick={() => {
                  const updatedPreferences = rideDetails.preferences.includes(
                    preference
                  )
                    ? rideDetails.preferences.filter(
                        (pref) => pref !== preference
                      )
                    : [...rideDetails.preferences, preference];
                  setRideDetails({
                    ...rideDetails,
                    preferences: updatedPreferences,
                  });
                }}
              >
                {preference}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="button-custom next-button-custom"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 3: Vehicle Details */}
      {step === 3 && (
        <div className="step-custom">
          <img
            src={backButton}
            onClick={handleBack}
            alt="Back"
            className="backbutton-host"
          />
          <h2>Type of Vehicle</h2>
          {/* Image URL input */}
          <label htmlFor="vehicleImageUrl" className="image-label-custom">
            Enter Vehicle Image URL
          </label>
          <input
            type="text"
            id="vehicleImageUrl"
            placeholder="Enter vehicle image URL"
            value={rideDetails.vehicle.image}
            onChange={(e) => handleImageUrlChange(e)} // URL handler
            className="input-field-custom"
          />

          {/* Image file upload */}
          <label htmlFor="vehicleImageUpload" className="image-label-custom">
            Or Upload Vehicle Image
          </label>
          <input
            type="file"
            id="vehicleImageUpload"
            accept="image/*"
            onChange={(e) => handleFileUpload(e)} // File handler
            className="file-input-custom"
          />

          {/* Display vehicle image preview */}
          {rideDetails.vehicle.image && (
            <div className="vehicle-image-preview-custom">
              <h4>Preview:</h4>
              <img src={rideDetails.vehicle.image} alt="Vehicle" />
            </div>
          )}
          <input
            type="text"
            placeholder="Model"
            value={rideDetails.vehicle.model}
            onChange={(e) =>
              setRideDetails({
                ...rideDetails,
                vehicle: { ...rideDetails.vehicle, model: e.target.value },
              })
            }
            className="input-field-custom"
          />
          <input
            type="number"
            placeholder="Year"
            value={rideDetails.vehicle.year}
            onChange={(e) =>
              setRideDetails({
                ...rideDetails,
                vehicle: { ...rideDetails.vehicle, year: e.target.value },
              })
            }
            className="input-field-custom"
          />
          <input
            type="number"
            placeholder="Seats"
            value={rideDetails.vehicle.seats}
            onChange={(e) =>
              setRideDetails({
                ...rideDetails,
                vehicle: { ...rideDetails.vehicle, seats: e.target.value },
              })
            }
            className="input-field-custom"
          />
          <input
            type="text"
            placeholder="Type"
            value={rideDetails.vehicle.type}
            onChange={(e) =>
              setRideDetails({
                ...rideDetails,
                vehicle: { ...rideDetails.vehicle, type: e.target.value },
              })
            }
            className="input-field-custom"
          />

          <button
            onClick={handleNext}
            className="button-custom next-button-custom"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 4: Price */}
      {step === 4 && (
        <div className="step-custom">
          <img
            src={backButton}
            onClick={handleBack}
            alt="Back"
            className="backbutton-host"
          />
          <h2>Set a Price</h2>
          <input
            type="number"
            placeholder="Price per seat (DKK)"
            value={rideDetails.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className="input-field-custom-price"
          />

          <button
            onClick={handleSubmit}
            className="button-custom submit-button-custom"
          >
            Submit
          </button>
        </div>
      )}

      {/* Final Step: Confirmation */}
      {step === 5 && (
        <div className="step-custom">
          <h2>Trip Created!</h2>
          <button
            onClick={() => navigate("/")}
            className="button-custom next-button-custom"
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default HostRideSteps;
