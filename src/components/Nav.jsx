// Created by Deni Kalenski
import { NavLink, useLocation } from "react-router-dom";
import homeOutlined from "../assets/icons/search-outlined.svg";
import homeFilled from "../assets/icons/search-filled.svg";
import exploreOutlined from "../assets/icons/rides-outlined.svg";
import exploreFilled from "../assets/icons/rides-filled.svg";
import matchOutlined from "../assets/icons/host-outlined.svg";
import matchFilled from "../assets/icons/host-filled.svg";
import chatOutlined from "../assets/icons/chat-outlined.svg";
import chatFilled from "../assets/icons/chat-filled.svg";
import profileOutlined from "../assets/icons/rent-outlined.svg";
import profileFilled from "../assets/icons/rent-filled.svg";

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
        <span>Search</span>
      </NavLink>
      <NavLink to="/explore" activeClassName="active">
        <img
          src={
            location.pathname === "/explore" ? exploreFilled : exploreOutlined
          }
          alt="Explore"
          className="icon"
        />
        <span>Rides</span>
      </NavLink>
      <NavLink to="/create" activeClassName="active">
        <img
          src={location.pathname === "/create" ? matchFilled : matchOutlined}
          alt="Match"
          className="icon"
        />
        <span>Host</span>
      </NavLink>
      <NavLink to="/chat" activeClassName="active">
        <img
          src={location.pathname === "/chat" ? chatFilled : chatOutlined}
          alt="Chat"
          className="icon"
        />
        <span>Messages</span>
      </NavLink>
      <NavLink to="/profile" activeClassName="active">
        <img
          src={
            location.pathname === "/profile" ? profileFilled : profileOutlined
          }
          alt="Profile"
          className="icon"
        />
        <span>Rent</span>
      </NavLink>
    </nav>
  );
}
