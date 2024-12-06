// Created by Deni Kalenski
import { useState, useEffect } from "react";

import "/src/styles.css";

import logo from "/src/assets/logoziptrip.png"; // Logo path
import userAvatar from "../assets/icons/userAvatar.svg"; // Placeholder for user avatar
import bar from "../assets/status-bar.png";
import { auth } from "../firebase-config"; // Firebase authentication




// ChatPage component
export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [chats, setChats] = useState({ allChats: [], matchChats: [] });
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;
  // Fetch the chat data from our firebase
  useEffect(() => {
    async function fetchChats() {
      try {
        // Fetching all the chats 'allChats' data from our firebase
        const allChatsResponse = await fetch(
          "https://ziptrip-ec0b6-default-rtdb.firebaseio.com//allChats.json"
        );
        const allChatsData = await allChatsResponse.json();

        // Fetch all the chats 'matchChats' data from our firebase
        const matchChatsResponse = await fetch(
          "https://ziptrip-ec0b6-default-rtdb.firebaseio.com//matchChats.json"
        );
        const matchChatsData = await matchChatsResponse.json();

        // Set the data to the state
        setChats({
          allChats: allChatsData || [],
          matchChats: matchChatsData || [],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    }
    fetchChats();
  }, []);


    // Function to handle avatar click and navigate to the ProfilePage
    const handleAvatarClick = () => {
      navigate("/profile"); // Navigate to ProfilePage when avatar is clicked
    };
  


  // Determine which chats to display based on the active tab
  const chatsToDisplay =
    activeTab === "all" ? chats.allChats : chats.matchChats;

  if (loading) {
    return <div>Loading...</div>;
  }

  // Return the chat page
  return (
    <section className="chat-page">

        {/* Top Bar */}
        <header className="top-bar">
  <div className="top-bar-content">
    <img src={bar} alt="status bar" className="bar" />
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

        {/* Page Heading */}
        <div className="weird-text-messages">
        <h1>Messages</h1>
      </div>

      <div className="search-bar-chat">
        <input type="text" placeholder="Search..." />
      </div>
     
      <div className="chat-list">
        {chatsToDisplay.map((chat, index) => (
          <div key={index} className="chat-item">
            <img
              src={chat.avatar}
              alt={`${chat.name}'s avatar`}
              className="chat-avatar"
            />
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-message">{chat.message}</div>
            </div>
            <div className="chat-meta">
              <span className="chat-time">{chat.time}</span>
              {chat.unread && <span className="unread-badge">1</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
