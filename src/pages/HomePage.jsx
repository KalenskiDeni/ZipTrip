//created by Beatrise

import { useEffect, useState } from "react";
import ExploreCard from "../components/ExploreCard";
import { NavLink } from "react-router-dom";
import "/src/styles.css";
import HeartIcon from "../assets/icons/heart.svg"; //for the button that leads to favorites page
import logo from "/src/assets/logoziptrip.png"; // Path to the logo
import backButton from "../assets/icons/backButton.svg";
import bar from "../assets/status-bar.png";

export default function ExplorePage() {
  const [posts, setPosts] = useState([]); // set the initial state to an empty array

  

  return (
    <section className="page">
      <header className="top-bar">
        <div className="top-bar-content">
          <img src={bar} alt="status bar" className="bar" />
          <img src={logo} alt="Off The Path Logo" className="logo" />
          <div className="top-bar-icons"></div>
        </div>
      </header>

      <div className="search-bar-button">
        <div className="search-bar">
          <NavLink to="/search" activeClassName="active">
            <span className="placeholder-text">
              Where from?
            </span>
            
          </NavLink>
        </div>
       
      </div>


      <div className="search-bar-button">
        <div className="search-bar">
          <NavLink to="/search" activeClassName="active">
            <span className="placeholder-text">
              Where to?
            </span>
            
          </NavLink>
        </div>
       
      </div>



      <div className="search-bar-button">
        <div className="search-bar">
          <NavLink to="/search" activeClassName="active">
            <span className="placeholder-text">
              When?
            </span>
            
          </NavLink>
        </div>
       
      </div>
     
    </section>
  );
}

//top-bar is the header of the page. it contains the logo, and back button
