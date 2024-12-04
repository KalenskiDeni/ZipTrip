import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "/src/styles.css";
import gif from "/src/assets/tesla.gif"; // GIF for the first screen
import image1 from "/src/assets/onboarding1.png"; // Illustration for the second screen
import image2 from "/src/assets/onboarding2.png"; // Illustration for the third screen
import image3 from "/src/assets/onboarding3.png"; // Illustration for the fourth screen
import image4 from "/src/assets/onboarding4.png"; // Illustration for the fifth screen
import logo from "/src/assets/logoziptrip.png"; // Path to the logo
import whiteLogo from "/src/assets/logoziptripwhite.png"; // White logo for the first screen

const onboardingScreens = [
  {
    title: "Welcome to ZipTrip!",
    description:
      "Join a community of travelers who share rides and reduce the carbon footprint together. Connect with others, save money, and explore new places—all while making a positive impact on the environment.",
    buttonLabel: "Get Started",
    image: gif, // Use GIF for the first screen
    lightText: true, // Light text on the first screen
  },
  {
    title: "Share Your Ride",
    description:
      "Connect with others heading in the same direction! Easily find and join shared rides to save money and make new friends along the way.",
    buttonLabel: "Continue",
    image: image1,
    lightText: false, // Dark text for subsequent screens
  },
  {
    title: "Quick and Simple Booking",
    description:
      "Find available rides in seconds! Our intuitive app lets you book a seat in just a few taps, so you can focus on enjoying your journey.",
    buttonLabel: "Continue",
    image: image2,
    lightText: false,
  },
  {
    title: "Flexible Travel Options",
    description:
      "Whether it’s a daily commute or a weekend getaway, find shared rides that fit your schedule. Enjoy the freedom of spontaneous travel without the hassle!",
    buttonLabel: "Continue",
    image: image3,
    lightText: false,
  },
  {
    title: "Travel Sustainably",
    description:
      "Reduce your carbon footprint by choosing eco-friendly transportation options. Every shared ride helps decrease traffic congestion and lowers emissions.",
    buttonLabel: "Get Started",
    image: image4,
    lightText: false,
  },
];

function MyComponent() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const nextScreen = () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const { title, description, buttonLabel, image, lightText } =
    onboardingScreens[currentScreen];

  return (
    <div
      className={`onboarding-container ${
        lightText ? "onboarding-light" : "onboarding-dark"
      }`}
    >
      {/* For the first screen, show the GIF as the background */}
      {currentScreen === 0 && (
        <div className="onboarding-video-container">
          <img src={gif} alt="Tesla GIF" className="onboarding-video" />
        </div>
      )}

      {/* Logo */}
      <div className="onboarding-logo">
        {/* Conditionally render the white logo on the first screen */}
        <img src={currentScreen === 0 ? whiteLogo : logo} alt="ZipTrip Logo" />
      </div>

      {/* Content */}
      <div className="onboarding-content">
        {/* For other screens, show images */}
        {currentScreen !== 0 && (
          <div className="onboarding-image-container">
            <img src={image} alt="Illustration" className="onboarding-image" />
          </div>
        )}

        {/* Text */}
        <h1 className="onboarding-title">{title}</h1>
        <p className="onboarding-paragraph">{description}</p>

        {/* Dots indicator */}
        {currentScreen > 0 && (
          <div className="onboarding-dots">
            {onboardingScreens.map((_, index) => (
              <div
                key={index}
                className={`onboarding-dot ${currentScreen === index ? "active" : ""}`}
              ></div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="onboarding-navigation">
          {currentScreen < onboardingScreens.length - 1 ? (
            <button className="onboarding-continue" onClick={nextScreen}>
              {buttonLabel}
            </button>
          ) : (
            <NavLink to="/signin" activeClassName="active">
              <button className="onboarding-continue">{buttonLabel}</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
