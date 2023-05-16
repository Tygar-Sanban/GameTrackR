import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "./Search";
import DropdownPlatforms from "./Dropdowns/DropdownPlatforms";
import DropdownStores from "./Dropdowns/DropdownStores";
import DropdownGenres from "./Dropdowns/DropdownGenres";
import DropdownTags from "./Dropdowns/DropdownTags";
import DropdownRatings from "./Dropdowns/DropdownRatings";
import RealNavBar from "./RealNavBar";

function LikedGamesList(props) {
  // Let's display the games and handle what happens when we reach the bottom of the page :
  const [platformsState, setPlatformsState] = useState("");
  const [storesState, setStoresState] = useState("");
  const [ratingsState, setRatingsState] = useState("");
  const [genresState, setGenresState] = useState("");
  const [tagsState, setTagsState] = useState("");

  const [allGames, setAllGames] = useState([]);
  const [searchString, setSearchString] = useState("");
  const sentinelRef = useRef(null);

  //Now, let's implement a search bar

  useEffect(() => {
    if (props.likedGames) {
      setAllGames(props.likedGames);
    }
  }, [props.likedGames]);

  function handleChange(event) {
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getSearchedGame();
  }

  function getSearchedGame() {
    setAllGames(
      props.likedGames.filter((elem) => {
        return elem.name.toLowerCase().includes(searchString.toLowerCase());
      })
    );
  }
  //Let's now deal with the dropdown menu

  function dropdownPlatformSearch() {
    setAllGames(() =>
      allGames.filter((elem) =>
        elem.platforms.some((elem2) =>
          elem2.platform.slug.includes(platformsState)
        )
      )
    );
  }
  function dropdownGenresSearch() {
    setAllGames(() =>
      allGames.filter((elem) =>
        elem.genres.some((elem2) => elem2.slug.includes(platformsState))
      )
    );
  }

  //Now that it's done, let's display the page !

  return (
    <div style={{ marginTop: "9rem" }}>
      <RealNavBar user={props.user} />
      {allGames.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="GameList-video-game-page">
          <nav className="header-game-list">
            <div className="dropdowns">
              <DropdownPlatforms
                platformsState={platformsState}
                setPlatformsState={setPlatformsState}
                dropdownPlatformSearch={dropdownPlatformSearch}
              />
              <DropdownStores
                storesState={storesState}
                setStoresState={setStoresState}
              />
              <DropdownGenres
                genresState={genresState}
                setGenresState={setGenresState}
              />
              <DropdownTags tagsState={tagsState} setTagsState={setTagsState} />
              <DropdownRatings
                ratingsState={ratingsState}
                setRatingsState={setRatingsState}
              />
            </div>
            <ul className="search-bar">
              <Search
                searchString={searchString}
                setSearchString={setSearchString}
                setAllGames={setAllGames}
                allGames={allGames}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </ul>
          </nav>
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
    </div>
  );
}

export default LikedGamesList;
