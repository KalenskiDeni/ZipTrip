import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "/src/styles.css";
import backButton from "../assets/icons/backButton.svg";

export default function UpdatePage() {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const url = `https://ziptrip-ec0b6-default-rtdb.firebaseio.com/posts/${id}.json`;

  // Fetch the current post details
  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch(url);
        const postData = await response.json();
        if (postData) {
          setPost(postData);
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    }

    getPost();
  }, [url]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    if (name.includes("vehicle")) {
      const fieldName = name.split(".")[1]; // Get nested field (e.g., model, year, type)
      setPost((prev) => ({
        ...prev,
        vehicle: { ...prev.vehicle, [fieldName]: value },
      }));
    } else {
      setPost((prev) => ({ ...prev, [name]: value }));
    }
  }

  const handleBack = () => {
    navigate(-1); // Go one step back in the browser's history
  };

  // Handle image URL change
  function handleImageUrlChange(e) {
    const { value } = e.target;
    setPost((prev) => ({ ...prev, image: value }));
  }

  // Handle image file upload
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file && file.size < 500000) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPost((prev) => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      console.log("Image file is too large or not valid");
    }
  }

  // Handle preference change (checkboxes)
  function handlePreferenceChange(e) {
    const { name, checked } = e.target;
    setPost((prev) => {
      const updatedPreferences = checked
        ? [...(prev.preferences || []), name]
        : prev.preferences.filter((pref) => pref !== name);
      return { ...prev, preferences: updatedPreferences };
    });
  }

  // Submit updated post to the database
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        navigate(`/posts/${id}`);
      } else {
        console.error("Failed to update post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!post) {
    return <p>Loading...</p>; // Display a loading message until post data is fetched
  }

  return (
    <section className="page create-post-page" id="update-page">
      <div className="container post-input-container">
        <img
          src={backButton}
          onClick={handleBack}
          alt="Back"
          className="backbutton-updatepage"
        />
        <h1 className="update-ride-title">Update ride</h1>
        <form className="form-grid" onSubmit={handleSubmit}>
          {/* Date */}
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            name="date"
            value={post.date}
            placeholder="Enter date..."
            onChange={handleChange}
            className="input"
          />

          {/* Pickup Location */}
          <label htmlFor="pickupLocation">Pickup Location</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={post.pickupLocation}
            placeholder="Enter pickup location..."
            onChange={handleChange}
            className="input"
          />

          {/* Dropoff Location */}
          <label htmlFor="dropoffLocation">Dropoff Location</label>
          <input
            type="text"
            id="dropoffLocation"
            name="dropoffLocation"
            value={post.dropoffLocation}
            placeholder="Enter dropoff location..."
            onChange={handleChange}
            className="input"
          />

          {/* Price */}
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={post.price}
            placeholder="Enter price per seat..."
            onChange={handleChange}
            className="input"
          />

          {/* Number of Seats */}
          <label htmlFor="seats">Seats</label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={post.seats}
            placeholder="Enter number of seats..."
            onChange={handleChange}
            className="input"
          />

          {/* Arrival Time */}
          <label htmlFor="arrivalTime">Arrival Time</label>
          <input
            type="time"
            id="arrivalTime"
            name="arrivalTime"
            value={post.arrivalTime || ""}
            onChange={handleChange}
            className="input"
          />

          {/* Departure Time */}
          <label htmlFor="departureTime">Departure Time</label>
          <input
            type="time"
            id="departureTime"
            name="departureTime"
            value={post.departureTime || ""}
            onChange={handleChange}
            className="input"
          />

          {/* Image URL input */}
          <label htmlFor="vehicleImageUrl" className="image-label-custom">
            Enter Vehicle Image URL
          </label>
          <input
            type="text"
            id="vehicleImageUrl"
            placeholder="Enter vehicle image URL"
            value={post.image || ""}
            onChange={handleImageUrlChange} // URL handler
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
            onChange={handleImageChange} // File handler
            className="file-input-custom"
          />

          {/* Display vehicle image preview */}
          {post.image && (
            <div className="vehicle-image-preview-custom">
              <h4>Preview:</h4>
              <img src={post.image} alt="Vehicle" />
            </div>
          )}

          {/* Vehicle Info */}
          <label htmlFor="vehicle.model">Vehicle Model</label>
          <input
            type="text"
            id="vehicle.model"
            name="vehicle.model"
            value={post.vehicle?.model || ""}
            placeholder="Enter vehicle model..."
            onChange={handleChange}
            className="input"
          />

          <label htmlFor="vehicle.year">Vehicle Year</label>
          <input
            type="number"
            id="vehicle.year"
            name="vehicle.year"
            value={post.vehicle?.year || ""}
            placeholder="Enter vehicle year..."
            onChange={handleChange}
            className="input"
          />

          <label htmlFor="vehicle.type">Vehicle Type</label>
          <input
            type="text"
            id="vehicle.type"
            name="vehicle.type"
            value={post.vehicle?.type || ""}
            placeholder="Enter vehicle type..."
            onChange={handleChange}
            className="input"
          />

          {/* Preferences */}
          <label>Preferences</label>
          <div className="preferences-container">
            <div className="preference-item">
              <input
                type="checkbox"
                name="Music"
                checked={post.preferences?.includes("Music")}
                onChange={handlePreferenceChange}
                className="preference-checkbox"
              />
              <span>Music</span>
            </div>
            <div className="preference-item">
              <input
                type="checkbox"
                name="Smoking"
                checked={post.preferences?.includes("Smoking")}
                onChange={handlePreferenceChange}
                className="preference-checkbox"
              />
              <span>Smoking</span>
            </div>
            <div className="preference-item">
              <input
                type="checkbox"
                name="Pets"
                checked={post.preferences?.includes("Pets")}
                onChange={handlePreferenceChange}
                className="preference-checkbox"
              />
              <span>Pets</span>
            </div>
            <div className="preference-item">
              <input
                type="checkbox"
                name="Children"
                checked={post.preferences?.includes("Children")}
                onChange={handlePreferenceChange}
                className="preference-checkbox"
              />
              <span>Children</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="header-btn share-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Ride"}
          </button>
        </form>
      </div>
    </section>
  );
}
