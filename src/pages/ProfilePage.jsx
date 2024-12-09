import React, { useState, useEffect } from "react";
import { auth } from "../firebase-config"; // firebase authentication
import { updateProfile } from "firebase/auth"; // firebase function to update profile
import "/src/styles.css";
import { useNavigate } from "react-router-dom";

import backButton from "../assets/icons/backButton.svg";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(
    auth.currentUser?.photoURL || "https://via.placeholder.com/150"
  );
  const [imageUrl, setImageUrl] = useState(profileImage); // store the new image URL
  const [name, setName] = useState(
    auth.currentUser?.displayName || "Anonymous"
  );

  useEffect(() => {
    if (auth.currentUser) {
      setProfileImage(
        auth.currentUser.photoURL || "https://via.placeholder.com/150"
      );
      setName(auth.currentUser.displayName || "Anonymous");
    }
  }, []);

  // function to handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // handle the URL input for the profile image
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // Navigate to the home page
  };

  // Save the profile changes to Firebase
  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, {
          displayName: name,
          photoURL: imageUrl, // Use the image URL from the input field
        });
        console.log("Profile updated successfully");
        setProfileImage(imageUrl); // Update the profile image in the state
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("An error occurred while updating your profile.");
      }
    }
  };

  return (
    <section id="profile-page" className="page">
      <img
        src={backButton}
        onClick={handleBack}
        alt="Back"
        className="backbutton-profile"
      />
      <p className="profile-textt">Your Profile</p>

      {/* Profile Image */}
      <div className="profile-image-container">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <input
          type="text"
          placeholder="Enter Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          className="image-url-input"
        />
      </div>

      {/* Name */}
      <div className="profile-name">
        <label className="name-label" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="profile-name-input"
        />
      </div>

      {/* Additional Profile Information */}
      <div className="profile-info">
        <p>Email: {auth.currentUser?.email}</p>
        <p>Account created: {auth.currentUser?.metadata.creationTime}</p>
      </div>

      {/* Save Button */}
      <button onClick={handleSave} className="save-button">
        Save Changes
      </button>
    </section>
  );
};

export default ProfilePage;
