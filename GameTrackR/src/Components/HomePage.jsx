import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import RealNavBar from "./RealNavBar";

function HomePage(props) {
  return (
    <>
      <RealNavBar user={props.user} />
      <NavBar user={props.user?.userName} />
      <div className="HomePage-container">
        <div className="signin">
          <Link to="/game-list" className="HomePage-GameList-button">
            <div>
              <h1>Game list</h1>
            </div>
          </Link>{" "}
        </div>
        <div className="signin">
          <Link to="/user-profile" className="HomePage-UserProfile-button">
            <div>
              <h1>User Profile</h1>
            </div>
          </Link>{" "}
        </div>
      </div>
    </>
  );
}

export default HomePage;
