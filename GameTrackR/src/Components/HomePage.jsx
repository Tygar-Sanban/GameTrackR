import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <nav className="header">
        <ul>
          <li>logo</li>
          <li>sort</li>
        </ul>
      </nav>
      <container className="HomePage-container">
        <div className="HomePage-GameList-button">
          <Link to="/game-list">
            <h1>Game list</h1>
          </Link>{" "}
        </div>
        <div className="HomePage-UserProfile-button">
          <Link to="/user-profile">
            <h1>User Profile</h1>
          </Link>{" "}
        </div>
      </container>
    </>
  );
}

export default HomePage;
