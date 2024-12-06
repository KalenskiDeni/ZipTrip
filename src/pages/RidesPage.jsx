import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard"; 
import backButton from "../assets/icons/backButton.svg"; // Assuming this is the component you use to display the post
import bar from "../assets/status-bar.png";
import logo from "/src/assets/logoziptrip.png"; 
import userAvatar from "../assets/icons/userAvatar.svg"; 



export default function RidesPage() {
  const location = useLocation();
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);

  // Get query params from the URL
  const queryParams = new URLSearchParams(location.search);
  const fromLocation = queryParams.get("from");
  const toLocation = queryParams.get("to");
  const travelDate = queryParams.get("date");

  // Function to format the travel date from YYYY-MM-DD to a comparable format
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }); // Format to "Wed, 11 Dec"
  };

  // Fetch ride data from Firebase
  useEffect(() => {
    async function fetchRides() {
      const url = "https://ziptrip-ec0b6-default-rtdb.firebaseio.com/posts.json";  // Adjust URL for posts
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        const ridesArray = Object.keys(data).map((postId) => ({
          id: postId,
          ...data[postId],
        }));
        setRides(ridesArray);
      }
    }

    fetchRides();
  }, []);

  // Filter rides based on search parameters
  useEffect(() => {
    const formattedTravelDate = formatDate(travelDate); // Format the travel date

    const filtered = rides.filter((ride) => {
      return (
        (fromLocation === "" || ride.pickupLocation.toLowerCase().includes(fromLocation.toLowerCase())) &&
        (toLocation === "" || ride.dropoffLocation.toLowerCase().includes(toLocation.toLowerCase())) &&
        (travelDate === "" || ride.date === formattedTravelDate)
      );
    });

    setFilteredRides(filtered);

    // Debugging: Log data
    console.log("Filtered Rides:", filtered);
  }, [rides, fromLocation, toLocation, travelDate]);

  return (
    
    <section className="page">
      {/* Top Bar */}
      <header className="top-bar">
        
        <div className="top-bar-content">
          <img src={bar} alt="status bar" className="bar" />
          <div className="logo-container">
            <img src={logo} alt="ZipTrip Logo" className="logo" />
          </div>
          
          <img src={userAvatar} alt="User Profile" className="avatar-profile" />
        </div>
        
      </header>

      <h1 className="rides-h1">Rides from {fromLocation} to {toLocation} on {travelDate}</h1>

      {/* Display filtered rides */}
      <div className="grid">
        {filteredRides.length > 0 ? (
          filteredRides.map((ride) => (
            <PostCard key={ride.id} ride={ride} />
          ))
        ) : (
          <p>No rides found for your search criteria.</p>
        )}
      </div>
    </section>
  );
}
