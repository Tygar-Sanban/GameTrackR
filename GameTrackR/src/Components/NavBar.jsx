import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="header">
      <Link to="/">
        <div className="logo-details">
          <img
            src="../../public/assets/Images/gameTrackR_v2 (1).png"
            alt="logo.png"
          />
        </div>
      </Link>
    </nav>
  );
}

export default NavBar;
