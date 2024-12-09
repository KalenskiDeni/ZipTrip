import React, { useState } from 'react';
import backButton from "../assets/icons/backButton.svg";
import { useNavigate } from "react-router-dom";

function BookingFlow() {
  const [step, setStep] = useState(1); // Track the current step
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleDoneClick = () => {
    navigate('/'); // Navigate to the home page
  };
  const handleBack = () => {
    navigate("/"); // Navigate to the home page
  };


  return (
    <div className="booking-flow-container">
        <img
        src={backButton}
        onClick={handleBack}
        alt="Back"
        className="backbutton-booking"
      />
      <p className="profile-textt-booking">Book a ride</p>
      {/* Step 1: Booking Details */}
      {step === 1 && (
        <div className="step1-container">
       
          <p className="details-ride-textt">Details for your ride</p>
          <div className="step1-details">
            <div>Date: Wed, 11 Dec</div>
            <div>Pickup: Hovedbanegarden, København</div>
            <div>Dropoff: Sumatravej 1, Aarhus</div>
            <div>Price: DKK 150 per seat</div>
          </div>
          <button className="next-button-book1" onClick={handleNextStep}>Next</button>
        </div>
      )}

      {/* Step 2: Add Payment Card */}
      {step === 2 && (
        <div className="step2-container">
          <h2>Add a Payment Card</h2>
          <div className="payment-form">
            <input type="text" placeholder="Card Holder Name" className="input-field" />
            <input type="text" placeholder="Card Number" className="input-field" />
            <input type="text" placeholder="Expiry Date" className="input-field" />
            <input type="text" placeholder="CVC" className="input-field" />
          </div>
          <button className="next-button-book" onClick={handleNextStep}>Save Card</button>
        </div>
      )}

      {/* Step 3: Booking Completed */}
      {step === 3 && (
        <div className="step3-container">
          <h2>Booking Completed</h2>
          <p>Your ride has been booked successfully.</p>
          <button className="complete-button" onClick={handleDoneClick}>
        Done
      </button>
        </div>
      )}
    </div>
  );
}

export default BookingFlow;
