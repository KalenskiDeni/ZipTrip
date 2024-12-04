//created by Beatrise

import { useEffect, useState } from "react";
import ExploreCard from "../components/ExploreCard";
import { NavLink } from "react-router-dom";
import "/src/styles.css";
import HeartIcon from "../assets/icons/heart.svg"; //for the button that leads to favorites page
import logo from "../assets/icons/logo-blue.svg";
import backButton from "../assets/icons/backButton.svg";
import bar from "../assets/status-bar.png";

export default function ExplorePage() {
  const [posts, setPosts] = useState([]); // set the initial state to an empty array

  useEffect(() => {
    async function fetchPosts() {
      const url =
        "https://ziptrip-ec0b6-default-rtdb.firebaseio.com//explorePosts.json"; // fetch data from the url, specifically the explorePosts section
      const response = await fetch(url);
      const data = await response.json(); // get the data from the response and parse it
      // from object to array
      const postsArray = Object.keys(data).map((postId) => ({
        id: postId,
        ...data[postId],
      })); // map the data to an array of objects
      setPosts(postsArray); // set the posts state with the postsArray
    }

    fetchPosts();
  }, []);

  return (
    <section className="page">
      <header className="top-bar">
        <div className="top-bar-content">
          <NavLink to="/" activeClassName="active">
            <img src={backButton} alt="Back Button" className="back-button" />
          </NavLink>{" "}
          <img src={bar} alt="status bar" className="bar" />
          <img src={logo} alt="Off The Path Logo" className="logo" />
          <div className="top-bar-icons"></div>
        </div>
      </header>

      <div className="search-bar-button">
        <div className="search-bar">
          <NavLink to="/search" activeClassName="active">
            <span className="placeholder-text">
              What do you want to explore?
            </span>
          </NavLink>
        </div>
        <NavLink to="/favorites" activeClassName="active">
          <img src={HeartIcon} alt="Favorites" className="heart-icon" />
        </NavLink>
      </div>
      <div className="card-container">
        {posts.map((post) => (
          <ExploreCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

//top-bar is the header of the page. it contains the logo, and back button
