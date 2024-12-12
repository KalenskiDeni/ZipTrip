import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import avatarImage from "../assets/story-alex.png";
import logo from "/src/assets/logoziptrip.png";
import searchIcon from "../assets/icons/search-icon.svg";
import settingsIcon from "../assets/icons/cog-icon.svg";
import bar from "../assets/status-bar.png";
import userAvatar from "../assets/icons/userAvatar.svg"; // Placeholder for user avatar
import { auth } from "../firebase-config"; // Firebase authentication

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("forYou");
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const user = auth.currentUser;

  // Fetch posts from the database
  useEffect(() => {
    async function fetchPosts() {
      const url =
        "https://ziptrip-ec0b6-default-rtdb.firebaseio.com/posts.json";
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        // Convert object to array for easier iteration
        const postsArray = Object.keys(data).map((postId) => ({
          id: postId,
          ...data[postId],
        }));
        setPosts(postsArray);
      }
    }

    fetchPosts();
  }, []);

  // Function to handle avatar click and navigate to the ProfilePage
  const handleAvatarClick = () => {
    navigate("/profile"); // Navigate to ProfilePage when avatar is clicked
  };

  return (
    <section className="page">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-content">
         
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
      </header>

      {/* Tabs Section */}
      <div className="tab-buttons-home">
        <button
          className={activeTab === "forYou" ? "active" : ""}
          onClick={() => setActiveTab("forYou")}
        >
          Your Rides
        </button>
        <button
          className={activeTab === "daily" ? "active" : ""}
          onClick={() => setActiveTab("daily")}
        >
          Host a Ride
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "forYou" && (
          <>
            {/* Posts Grid */}
            <div className="grid">
              {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post.id} ride={post} />)
              ) : (
                <p>No rides available.</p>
              )}
            </div>
          </>
        )}

        {activeTab === "daily" && (
          <div className="daily-content">
            <p>No future rides...</p>
          </div>
        )}
      </div>
    </section>
  );
}
