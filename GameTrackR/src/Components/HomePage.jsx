import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="HomePage-GameList-button">
      <Link to="/game-list">
        <h1>Game list</h1>
      </Link>{" "}
    </div>
  );
}

export default HomePage;
