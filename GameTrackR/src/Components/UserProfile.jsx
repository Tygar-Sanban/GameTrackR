import React, { useState } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import axios from "axios";

function UserProfile(props) {
  const [likedGames, setLikedGames] = useState(null);

  return (
    <div style={{ backgroundColor: "black" }}>
      <NavBar user={props.user} />
      {props.user ? (
        !likedGames ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className="GameList-video-game-page">
            <h1>Your Liked Games</h1>
            {props.user.likedGames.map((elem) => {
              axios
                .get(
                  `https://api.rawg.io/api/games/${elem}?key=b600c722cedc401fb777d82d17949bec`
                )
                .then((response) => {
                  setLikedGames((current) => [...current, ...response]);
                  likedGames.map((likedGame) => {
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
                            {elem.name}
                          </div>
                        </div>
                      </Link>
                    );
                  });
                })
                .catch((error) => console.log(error));
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
