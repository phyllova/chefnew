import React from "react";
import ProfileCard from "./components/ProfileCard";
import InstagramModal from "./components/InstagramModal";
import FacebookModal from "./components/FacebookModal";
import TwitterModal from "./components/TwitterModal";

function App() {
  return (
    <div className="App">
      <ProfileCard />
      <InstagramModal />
      <FacebookModal />
      <TwitterModal />
    </div>
  );
}

export default App;
