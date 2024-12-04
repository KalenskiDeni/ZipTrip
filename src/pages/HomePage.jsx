// Created by Mila

// HomePage.js
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Stories from "../components/Stories"; // Import Stories component
import { NavLink } from "react-router-dom";
import "/src/styles/homepage.css";
import avatarImage from "../assets/story-alex.png";
import logo from "../assets/icons/logo-blue.svg";
import searchIcon from "../assets/icons/search-icon.svg";
import settingsIcon from "../assets/icons/cog-icon.svg";
import bar from "../assets/status-bar.png";

// useState is a hook that lets you add state to functional components.
// It returns an array with two elements: the current state value and a function to update that state.
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("forYou");

  // useEffect hook to fetch posts from the database
  useEffect(() => {
    async function fetchPosts() {
      const url =
        "https://ziptrip-ec0b6-default-rtdb.firebaseio.com//posts.json";
      const response = await fetch(url);
      const data = await response.json();

      // Convert object to array for easier iteration, consistent data structure & state management
      const postsArray = Object.keys(data).map((postId) => ({
        id: postId,
        ...data[postId],
      }));
      setPosts(postsArray);
    }

    fetchPosts();
  }, []);

  //a return statement defines the HTML structure of the component that will be rendered on the webpage
  return (
    <section className="page">
      <header className="top-bar">
        <div className="top-bar-content">
          <img src={bar} alt="status bar" className="bar" />
          <img src={logo} alt="Off The Path Logo" className="logo" />
          <div className="top-bar-icons">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="icon search-icon"
            />
            <img
              src={settingsIcon}
              alt="Settings Icon"
              className="icon settings-icon"
            />
          </div>
        </div>
      </header>

      {/* Tabs Section */}
      <div className="tab-buttons-home">
        <button
          className={activeTab === "forYou" ? "active" : ""}
          onClick={() => setActiveTab("forYou")}
        >
          For You
        </button>
        <button
          className={activeTab === "daily" ? "active" : ""}
          onClick={() => setActiveTab("daily")}
        >
          Daily
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "forYou" && (
          <>
            {/* Create Post Button */}
            <div className="create-post-button">
              <NavLink to="/create" activeClassName="active">
                <div className="create-post-box">
                  <img
                    src={avatarImage}
                    alt="User avatar"
                    className="search-avatar"
                  />
                  <span className="placeholder-text">
                    Tell us about your latest adventure...
                  </span>
                </div>
              </NavLink>
            </div>
            <span className="text1-stories">Stories</span>
            {/* Stories Component */}
            <Stories />

            {/* Posts Grid */}
            <div className="grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}

        {activeTab === "daily" && (
          <div className="daily-content">
            <h2>Daily Inspiration</h2>
            <p>Discover new places and experiences every day!</p>
            {/* Add more content or components specific to the "Daily" tab here */}
          </div>
        )}
      </div>
    </section>
  );
}
