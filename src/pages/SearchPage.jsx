//created by Beatrise

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "/src/assets/logoziptrip.png"; // Path to the logo
import backButton from "../assets/icons/backButton.svg";
import bar from "../assets/status-bar.png";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.toLowerCase() === "barcelona") {
      navigate("/barcelona");
    } else {
      alert("No results found");
    }
  };

  return (
    <section className="page">
      <header className="top-bar">
        <div className="top-bar-content">
          <NavLink to="/homepage" activeClassName="active">
            <img src={backButton} alt="Back Button" className="back-button" />
          </NavLink>
          <img src={bar} alt="status bar" className="bar" />
          <img src={logo} alt="Off The Path Logo" className="logo" />
          <div className="top-bar-icons"></div>
        </div>
      </header>

      <div className="search-bar-button">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to explore?"
            className="search-input"
          />
        </form>
      </div>
    </section>
  );
}

//top-bar is the header of the page. it contains the logo, and back button
//search-bar-button contains the search bar with placeholder text
