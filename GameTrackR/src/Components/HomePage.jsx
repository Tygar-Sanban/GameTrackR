import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function HomePage() {
  return (
    <>
      <NavBar />
      <container className="HomePage-container">
        <Link to="/game-list" className="HomePage-GameList-button">
          <div>
            <h1>Game list</h1>
          </div>
        </Link>{" "}
        <Link to="/user-profile" className="HomePage-UserProfile-button">
          <div>
            <h1>User Profile</h1>
          </div>
        </Link>{" "}
      </container>
    </>
  );
}

export default HomePage;
