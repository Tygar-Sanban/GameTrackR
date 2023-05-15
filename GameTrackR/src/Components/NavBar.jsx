import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <nav className="header">
      <Link to="/">
        <div className="logo">
          <img
            src="../../public/assets/Images/gameTrackR_v2 (1).png"
            alt="logo.png"
          />
        </div>
      </Link>
      {props.user && (
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
            <h3 className="displaying-user-name">{props.user}</h3>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
