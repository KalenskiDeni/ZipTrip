// Created by Deni Kalenski
import { useState, useEffect } from "react";

import "/src/styles/chat.css";

// ChatPage component
export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [chats, setChats] = useState({ allChats: [], matchChats: [] });
  const [loading, setLoading] = useState(true);

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

  // Determine which chats to display based on the active tab
  const chatsToDisplay =
    activeTab === "all" ? chats.allChats : chats.matchChats;

  if (loading) {
    return <div>Loading...</div>;
  }

  // Return the chat page
  return (
    <section className="chat-page">
      <div className="search-bar-chat">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="tab-buttons">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          className={activeTab === "matches" ? "active" : ""}
          onClick={() => setActiveTab("matches")}
        >
          Your matches
        </button>
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
