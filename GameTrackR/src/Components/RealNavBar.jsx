import React from "react";
import { Link } from "react-router-dom";

function RealNavBar(props) {
  return (
    <nav className="real-nav-bar">
      <div className="real-navbar-logo">
        <Link to="/">
          <div className="logo">
            <img
              src="/public/assets/Images/gameTrackR_v2 (1).png"
              alt="logo.png"
            />
          </div>
        </Link>
      </div>{" "}
      <div className="nav-content">
        <div>
          {" "}
          <Link to="/game-list">Game List</Link>
        </div>
        <div>
          {props.user && (
            <div className="user">
              <Link
                to="/user-profile"
                className="profile-icon-link-to-user-profile"
              >
                <img
                  className="user-icon"
                  src="
                  /public/assets/Images/user.png"
                  alt=""
                />
                <h3 className="displaying-user-name">{props.user.userName}</h3>
              </Link>
            </div>
          )}
          {!props.user && (
            <div className="user">
              <Link
                to="/user-profile"
                className="profile-icon-link-to-user-profile"
              >
                <img
                  className="user-icon"
                  src="../../public/assets/Images/user.png"
                  alt=""
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default RealNavBar;
