// Created by Deni Kalenski
import { NavLink, useLocation } from "react-router-dom";
import homeOutlined from "../assets/icons/home-outlined.svg";
import homeFilled from "../assets/icons/home-filled.svg";
import exploreOutlined from "../assets/icons/explore-outlined.svg";
import exploreFilled from "../assets/icons/explore-filled.svg";
import matchOutlined from "../assets/icons/match-outlined.svg";
import matchFilled from "../assets/icons/match-filled.svg";
import chatOutlined from "../assets/icons/chat-outlined.svg";
import chatFilled from "../assets/icons/chat-filled.svg";
import profileOutlined from "../assets/icons/profile-outlined.svg";
import profileFilled from "../assets/icons/profile-filled.svg";

// Nav component
export default function Nav() {
  const location = useLocation(); // Get the current location to determine active route

  // Return the navigation links
  return (
    <nav>
      <NavLink to="/home" exact activeClassName="active">
        <img
          src={location.pathname === "/home" ? homeFilled : homeOutlined}
          alt="Home"
          className="icon"
        />
        <span>Home</span>
      </NavLink>
      <NavLink to="/explore" activeClassName="active">
        <img
          src={
            location.pathname === "/explore" ? exploreFilled : exploreOutlined
          }
          alt="Explore"
          className="icon"
        />
        <span>Explore</span>
      </NavLink>
      <NavLink to="/match" activeClassName="active">
        <img
          src={location.pathname === "/match" ? matchFilled : matchOutlined}
          alt="Match"
          className="icon"
        />
        <span>Match</span>
      </NavLink>
      <NavLink to="/chat" activeClassName="active">
        <img
          src={location.pathname === "/chat" ? chatFilled : chatOutlined}
          alt="Chat"
          className="icon"
        />
        <span>Chat</span>
      </NavLink>
      <NavLink to="/profile" activeClassName="active">
        <img
          src={
            location.pathname === "/profile" ? profileFilled : profileOutlined
          }
          alt="Profile"
          className="icon"
        />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
