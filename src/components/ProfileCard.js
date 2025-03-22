import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/index.css";
import "../assets/css/main.css";
import logo from "../assets/img/logo.PNG";
import InstagramModal from "./InstagramModal";
import TwitterModal from "./TwitterModal";
import FacebookModal from "./FacebookModal";

const ProfileCard = () => {
  const openModal = (platform) => {
    const modal = document.getElementById(`${platform}-modal`);
    if (modal) modal.style.display = "flex";
  };

  return (
    <div>
      <div className="profile-card">
        <img src={logo} alt="Profile" className="profile-picture" />
        <h2 className="profile-name">Team Riyadh</h2>
        <p className="profile-title">Tickling your taste bud</p>
        <p className="profile-description">Please we need your vote!</p>

        <div className="social-vote-button">
          <button
            onClick={() => openModal("twitter")}
            className="twitter-button">
            <i className="fab fa-twitter"></i> Vote with Twitter
          </button>
        </div>
        <div className="social-vote-button">
          <button
            onClick={() => openModal("instagram")}
            className="instagram-button2">
            <i className="fab fa-instagram"></i> Vote with Instagram
          </button>
        </div>
        <div className="social-vote-button">
          <button
            onClick={() => openModal("facebook")}
            className="facebook-button3">
            <i className="fab fa-facebook"></i> Vote with Facebook
          </button>
        </div>

        <p className="powered-by">
          Powered by <strong>Food Network</strong>
        </p>
      </div>

      {/* Modals */}
      <InstagramModal />
      <TwitterModal />
      <FacebookModal />
    </div>
  );
};

export default ProfileCard;
