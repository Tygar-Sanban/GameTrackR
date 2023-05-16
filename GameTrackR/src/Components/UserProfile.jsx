import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UserProfile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userToJS = JSON.parse(storedUser);
      props.setUser(userToJS);
    }
  }, []);

  function handleDisconnect() {
    localStorage.removeItem("user");
    props.setUser(null);
    props.setLikedGames([]);
    navigate("/");
  }

  return (
    <div style={{ backgroundColor: "black" }}>
      <button onClick={handleDisconnect}>Disconnect</button>
      <NavBar user={props.user?.userName} />
      {props.user ? (
        props.likedGames.length === 0 ? (
          <div className="empty-user-profile">
            <h1>
              You haven't had any activity on this website yet. Checkout the{" "}
              <Link to="/game-list">
                <span className="link-to-gamelist">Game List</span>
              </Link>{" "}
              !
            </h1>
          </div>
        ) : (
          <div className="GameList-video-game-page">
            <h1>Your Liked Games</h1>
            {props.likedGames.map((likedGame) => {
              const url = `/game-list/${likedGame.id}`;
              return (
                <Link
                  key={likedGame.slug}
                  to={url}
                  target="_blank"
                  className="GameList-video-game"
                  style={{
                    backgroundImage: `url(${likedGame.background_image})`,
                  }}
                >
                  <div>
                    <div className="GameList-video-game-name">
                      {likedGame.name}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )
      ) : (
        <div className="login-or-signin">
          <div className="signin">
            <h2>You don't have an account yet ?</h2>
            <Link to="/sign-in" className="HomePage-UserProfile-button">
              <div>
                <h1>Sign in</h1>
              </div>
            </Link>
          </div>
          <div className="signin">
            <h2>You already have an account ?</h2>
            <Link to="/log-in" className="HomePage-UserProfile-button">
              <div>
                <h1>Log In</h1>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
