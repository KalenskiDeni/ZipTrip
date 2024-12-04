

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles/createpage.css";

// Importing our images and icons
import profileIcon from "../assets/profile-img.png"; 
import publicIcon from "../assets/icons/public-icon.svg"; 
import photosIcon from "../assets/icons/image-icon.svg";
import videosIcon from "../assets/icons/video-icon.svg";
import locationIcon from "../assets/icons/location-icon.svg";

// CreatePage component
export default function CreatePage() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  // Handle submitting the form
  async function handleSubmit(event) {
    event.preventDefault();

    const post = {
      caption,
      image,
      video,
      location,
      uid: "ZfPTVEMQKf9vhNiUh0bj",
    };

    const response = await fetch(
      "https://offthepath-webapp-default-rtdb.firebaseio.com/posts.json",
      {
        method: "POST",
        body: JSON.stringify(post),
      }
    );

    if (response.ok) {
      navigate("/");
    }
  }

  // Function to handle image file selection
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  }

  // Function to handle video file selection
  function handleVideoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideo(videoURL);
    }
  }

  // Return the JSX for the CreatePage component
  return (
    <section className="page create-post-page">
      {/* Header */}
      <header className="create-post-header">
        <button onClick={() => navigate("/")} className="header-btn">
          Cancel
        </button>
        <p>New Post</p>
        <button onClick={handleSubmit} className="header-btn share-btn">
          Share
        </button>
      </header>

      {/* Post Input Area */}
      <div className="post-input-container">
        {/* Profile and Privacy Section */}
        <div className="profile-section">
          <img src={profileIcon} alt="Profile" className="profile-image" />
          <div className="privacy-selector">
            <img src={publicIcon} alt="Public" className="privacy-icon" />
            <span>Public post</span> ▼
          </div>
        </div>

        {/* Caption Text Area */}
        <textarea
          className="caption-input"
          placeholder="Share your moment, ask a question or post a photo/video..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {/* Image URL Input and Preview */}
        <input
          type="url"
          className="image-url-input"
          placeholder="Paste an image URL..."
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Image Preview */}
        {image && (
          <img
            src={image}
            alt="Image Preview"
            className="media-preview"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/600x400?text=Error+loading+image")
            }
          />
        )}

        {/* Video Preview */}
        {video && (
          <video
            src={video}
            controls
            className="media-preview"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/600x400?text=Error+loading+video")
            }
          />
        )}
      </div>

      {/* Media Options Footer */}
      <footer className="media-options">
        {/* Hidden File Inputs for Image and Video */}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="imageUpload"
          onChange={handleImageUpload}
        />
        <input
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          id="videoUpload"
          onChange={handleVideoUpload}
        />

        {/* Buttons to Trigger Image/Video Upload and Location Input */}
        <button
          className="media-option"
          onClick={() => document.getElementById("imageUpload").click()}
        >
          <img src={photosIcon} alt="Photos" className="media-icon" /> Photos
        </button>
        <button
          className="media-option"
          onClick={() => document.getElementById("videoUpload").click()}
        >
          <img src={videosIcon} alt="Videos" className="media-icon" /> Videos
        </button>
        <button
          className="media-option"
          onClick={() => {
            const location = prompt("Enter location:");
            setLocation(location);
          }}
        >
          <img src={locationIcon} alt="Location" className="media-icon" />{" "}
          Location
        </button>
      </footer>
    </section>
  );
}
