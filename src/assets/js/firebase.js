// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyAn3gcLNM9pCBy6JuLDCZzmUKXxxZaDytw",
  authDomain: "worldexcp.firebaseapp.com",
  databaseURL: "https://worldexcp-default-rtdb.firebaseio.com",
  projectId: "worldexcp",
  storageBucket: "worldexcp.firebasestorage.app",
  messagingSenderId: "170534746273",
  appId: "1:170534746273:web:8689514e10c8a94f56d8e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getDatabase(app);
const auth = getAuth(app);

// Export the services
export { db, auth };
