// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyBchp9Lk5rmfUgZ5_1VrPE2YPnV_fYdV_U",
  authDomain: "ziptrip-ec0b6.firebaseapp.com",
  databaseURL: "https://ziptrip-ec0b6-default-rtdb.firebaseio.com",
  projectId: "ziptrip-ec0b6",
  storageBucket: "ziptrip-ec0b6.firebasestorage.app",
  messagingSenderId: "176247955738",
  appId: "1:176247955738:web:5641890a8946bb05a38ca3",
  measurementId: "G-790Y3HM62T"
};

const app = initializeApp(firebaseConfig);

// Export auth for use in other files
export const auth = getAuth(app); 
