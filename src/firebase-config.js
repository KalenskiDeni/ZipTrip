
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyBgq-ApIXxlQfv7HcCarBieoXpfqsWi8v8",
  authDomain: "offthepath-webapp.firebaseapp.com",
  databaseURL: "https://offthepath-webapp-default-rtdb.firebaseio.com",
  projectId: "offthepath-webapp",
  storageBucket: "offthepath-webapp.appspot.com",
  messagingSenderId: "809294992298",
  appId: "1:809294992298:web:7111cefe4d3477648dd1d3",
  measurementId: "G-1301NZ0T13",
};


const app = initializeApp(firebaseConfig);




export const auth = getAuth(app);
