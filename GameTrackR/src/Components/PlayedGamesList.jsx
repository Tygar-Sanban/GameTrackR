import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "./Search";
import RealNavBar from "./RealNavBar";
import NavBar from "./NavBar";
import Footer from "./Footer";

function PlayedGamesList(props) {
  // Let's display the games and handle what happens when we reach the bottom of the page :

  const [allGames, setAllGames] = useState([]);
  const [searchString, setSearchString] = useState("");

  //Now, let's implement a search bar

  useEffect(() => {
    if (props.playedGames) {
      setAllGames(props.playedGames);
    }
  }, [props.playedGames]);

  function handleChange(event) {
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getSearchedGame();
  }

  function getSearchedGame() {
    setAllGames(
      props.playedGames.filter((elem) => {
        return elem.name.toLowerCase().includes(searchString.toLowerCase());
      })
    );
  }

  function handleReset() {
    window.location.reload();
  }

  //Now that it's done, let's display the page !

  return (
    <div style={{ marginTop: "5rem" }}>
      <RealNavBar user={props.user} />
      {allGames.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="GameList-video-game-page">
          <NavBar line="All the games you've played so far" />
          <div className="search-bar">
            <Search
              searchString={searchString}
              setSearchString={setSearchString}
              setAllGames={setAllGames}
              allGames={allGames}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleReset={handleReset}
            />
          </div>
          {allGames.map((elem) => {
            const url = `/game-list/${elem.id}`;
            return (
              <Link
                key={elem.slug}
                to={url}
                target="_blank"
                className="GameList-video-game"
                style={{ backgroundImage: `url(${elem.background_image})` }}
              >
                <div>
                  <div className="GameList-video-game-name">{elem.name}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default PlayedGamesList;
