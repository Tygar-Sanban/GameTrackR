import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RealNavBar from "./RealNavBar";

function UserProfile(props) {
  const navigate = useNavigate();

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
      <RealNavBar user={props.user} />
      <button onClick={handleDisconnect}>Disconnect</button>
      <NavBar user={props.user?.userName} />
      {(props.user && props.likedGames) ||
      (props.user && props.playedGames) ||
      (props.user && props.likedGames) ? (
        props.likedGames.length === 0 ? (
          <div className="empty-user-profile">
            <h1>
              You don't like any game yet. Check out our{" "}
              <Link to="/game-list">
                <span className="link-to-gamelist">Game List</span>
              </Link>{" "}
              !
            </h1>
          </div>
        ) : (
          <div className="GameList-video-game-page">
            <h1>You've liked {props.likedGames.length} games !</h1>
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
      {props.user && props.playedGames ? (
        props.playedGames.length === 0 ? (
          <div className="empty-user-profile">
            <h1>
              You haven't played any game yet ? That can't be true ! Notify it
              in our{" "}
              <Link to="/game-list">
                <span className="link-to-gamelist">Game List</span>
              </Link>{" "}
              !
            </h1>
          </div>
        ) : (
          <div className="GameList-video-game-page">
            <h1>You've played {props.playedGames.length} games !</h1>
            {props.playedGames.map((playedGame) => {
              const url = `/game-list/${playedGame.id}`;
              return (
                <Link
                  key={playedGame.slug}
                  to={url}
                  target="_blank"
                  className="GameList-video-game"
                  style={{
                    backgroundImage: `url(${playedGame.background_image})`,
                  }}
                >
                  <div>
                    <div className="GameList-video-game-name">
                      {playedGame.name}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )
      ) : (
        <></>
      )}
      {props.user && props.wishedGames ? (
        props.wishedGames.length === 0 ? (
          <div className="empty-user-profile">
            <h1>
              You don't wish for any game? Then, you have to check out our{" "}
              <Link to="/game-list">
                <span className="link-to-gamelist">Game List</span>
              </Link>{" "}
              !
            </h1>
          </div>
        ) : (
          <div className="GameList-video-game-page">
            <h1>You wish for {props.wishedGames.length} games !</h1>
            {props.wishedGames.map((wishedGame) => {
              const url = `/game-list/${wishedGame.id}`;
              return (
                <Link
                  key={wishedGame.slug}
                  to={url}
                  target="_blank"
                  className="GameList-video-game"
                  style={{
                    backgroundImage: `url(${wishedGame.background_image})`,
                  }}
                >
                  <div>
                    <div className="GameList-video-game-name">
                      {wishedGame.name}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserProfile;
