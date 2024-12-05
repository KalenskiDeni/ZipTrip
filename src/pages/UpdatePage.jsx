import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "/src/styles.css";

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
    setPost((prev) => ({ ...prev, [name]: value }));
  }

  // Handle image upload
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
        <h1>Update Post</h1>
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

          {/* Image */}
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {post.image && (
            <img
              src={post.image}
              alt="Post Preview"
              className="image-preview"
            />
          )}

          {/* Detour Info */}
          <label htmlFor="detour">Detour</label>
          <input
            type="text"
            id="detour"
            name="details.detour"
            value={post.details?.detour || ""}
            placeholder="Enter detour info..."
            onChange={(e) =>
              setPost((prev) => ({
                ...prev,
                details: { ...prev.details, detour: e.target.value },
              }))
            }
            className="input"
          />

          {/* Submit Button */}
          <button type="submit" className="header-btn share-btn" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </section>
  );
}
