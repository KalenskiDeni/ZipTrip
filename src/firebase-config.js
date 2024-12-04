// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);