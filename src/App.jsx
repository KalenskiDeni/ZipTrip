//Created by everyone

import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import ExploreRidesPage from "./pages/ExploreRidesPage";

import ChatPage from "./pages/ChatPage";
import RentPage from "./pages/RentPage";
import SearchPage from "./pages/SearchPage";

import UpdatePage from "./pages/UpdatePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import RidesPage from "./pages/RidesPage";
import ProfilePage from "./pages/ProfilePage";
import InstantBookingPage from "./pages/InstantBookingPage";

import OnBoarding from "./pages/OnBoarding";

import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  // Authentication state handler
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // If a user is authenticated, update state
      setIsAuth(true);
      localStorage.setItem("isAuth", "true");
    } else {
      // If no user is authenticated, reset state
      setIsAuth(false);
      localStorage.removeItem("isAuth");
    }
  });

  // Private Routes for authenticated users
  const privateRoutes = (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/explore" element={<ExploreRidesPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/posts/:id/update" element={<UpdatePage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/rides" element={<RidesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/booking" element={<InstantBookingPage />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );

  // Public Routes for unauthenticated users
  const publicRoutes = (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/onboarding" element={<OnBoarding />} />
      <Route path="*" element={<Navigate to="/onboarding" />} />
    </Routes>
  );

  // Render the routes based on authentication state
  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}

export default App;
