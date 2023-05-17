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
import NavBar from "./NavBar";
import Footer from "./Footer";

function GameList(props) {
  // Let's display the games and handle what happens when we reach the bottom of the page :
  const [platformsState, setPlatformsState] = useState("");
  const [storesState, setStoresState] = useState("");
  const [ratingsState, setRatingsState] = useState("");
  const [genresState, setGenresState] = useState("");
  const [tagsState, setTagsState] = useState("");

  const [allGames, setAllGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [searchString, setSearchString] = useState("");
  const sentinelRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    platformsState,
    storesState,
    ratingsState,
    genresState,
    tagsState,
    searchString,
  ]);

  useEffect(() => {
    setSearchString("");
  }, [platformsState, storesState, ratingsState, genresState, tagsState]);

  useEffect(() => {
    if (
      searchString &&
      !genresState &&
      !ratingsState &&
      !platformsState &&
      !tagsState &&
      !storesState
    ) {
      getSearchedGame(true);
    }
  }, [currentPage]);

  useEffect(() => {
    if (
      !searchString &&
      !genresState &&
      !ratingsState &&
      !platformsState &&
      !tagsState &&
      !storesState
    ) {
      fetchElements();
    }
  }, [currentPage]);

  useEffect(() => {
    if (
      (!searchString && genresState) ||
      (!searchString && ratingsState) ||
      (!searchString && platformsState) ||
      (!searchString && tagsState) ||
      (!searchString && storesState)
    ) {
      dropdownSearch(true);
    }
  }, [currentPage]);

  function fetchElements() {
    setIsFetching(true);

    axios
      .get(
        `https://api.rawg.io/api/games?key=fa9c45d8169145c5a9d8796aa3e09890&page=${currentPage}&page_size=40`
      )
      .then((response) => {
        setAllGames((prevElements) => [
          ...prevElements,
          ...response.data.results,
        ]);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
      });
  }

  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  //Now, let's implement a search bar

  function handleChange(event) {
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    getSearchedGame();
  }

  async function getSearchedGame(bool) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=fa9c45d8169145c5a9d8796aa3e09890&page=${currentPage}&search=${searchString}&page_size=40`
      );

      if (bool) {
        return setAllGames((current) => [...current, ...response.data.results]);
      }
      setAllGames((current) => response.data.results);
    } catch (error) {
      console.log(error);
    }
  }
  //Let's now deal with the dropdown menu

  let platformsStateCode;
  let storesStateCode;
  let ratingsStateCode;
  let genresStateCode;
  let tagsStateCode;

  switch (platformsState) {
    case "platforms":
      platformsStateCode = "";
      break;
    case "pc":
      platformsStateCode = "&platforms=4";
      break;
    case "playstation5":
      platformsStateCode = "&platforms=187";
      break;
    case "xbox-series-x":
      platformsStateCode = "&platforms=186";
      break;
    case "playstation4":
      platformsStateCode = "&platforms=18";
      break;
    case "xbox360":
      platformsStateCode = "&platforms=14";
      break;
    case "playstation3":
      platformsStateCode = "&platforms=16";
      break;
    case "xbox-one":
      platformsStateCode = "&platforms=1";
      break;
    case "nintendo-switch":
      platformsStateCode = "&platforms=7";
  }

  switch (storesState) {
    case "stores":
      storesStateCode = "";
      break;
    case "steam":
      storesStateCode = "&stores=1";
      break;
    case "epic-games":
      storesStateCode = "&stores=11";
      break;
    case "playstation-store":
      storesStateCode = "&stores=3";
      break;
    case "xbox-store":
      storesStateCode = "&stores=2";
      break;
    case "nintendo":
      storesStateCode = "&stores=6";
      break;
    case "gog":
      storesStateCode = "&stores=5";
      break;
  }

  switch (ratingsState) {
    case "ratings":
      ratingsStateCode = "";
      break;
    case "90+":
      ratingsStateCode = "&metacritic=90,100";
      break;
    case "80+":
      ratingsStateCode = "&metacritic=80,89";
      break;
    case "70+":
      ratingsStateCode = "&metacritic=70,79";
      break;
    case "60+":
      ratingsStateCode = "&metacritic=60,69";
      break;
    case "50+":
      ratingsStateCode = "&metacritic=50,59";
      break;
    case "40+":
      ratingsStateCode = "&metacritic=40,49";
      break;
    case "30+":
      ratingsStateCode = "&metacritic=30,39";
      break;
    case "20+":
      ratingsStateCode = "&metacritic=20,29";
      break;
    case "10+":
      ratingsStateCode = "&metacritic=10,19";
      break;
    case "0+":
      ratingsStateCode = "&metacritic=0,9";
      break;
  }

  genresStateCode =
    genresState === "genres" ? "" : `&genres=${genresState.toLowerCase()}`;
  tagsStateCode = tagsState === "tags" ? "" : `&tags=${tagsState}`;

  let filterString = "";

  async function dropdownSearch(bool) {
    if (platformsState) {
      filterString += platformsStateCode;
    }
    if (storesState) {
      filterString += storesStateCode;
    }
    if (ratingsState) {
      filterString += ratingsStateCode;
    }
    if (genresState) {
      filterString += genresStateCode;
    }
    if (tagsState) {
      filterString += tagsStateCode;
    }
    let url = `https://api.rawg.io/api/games?key=fa9c45d8169145c5a9d8796aa3e09890&page=${currentPage}${filterString}&page_size=40`;
    try {
      if (!allGames.length) return;
      const response = await axios.get(url);
      // if (allGames[0].id === response.data.results[0].id) {
      //   return setAllGames(response.data.results);
      // }
      if (bool) {
        return setAllGames((current) => [...current, ...response.data.results]);
      }
      setAllGames((current) => response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  function handleReset() {
    window.location.reload();
  }

  useEffect(() => {
    if (
      platformsState ||
      storesState ||
      ratingsState ||
      genresState ||
      tagsState
    ) {
      dropdownSearch();
    }
  }, [platformsState, storesState, ratingsState, genresState, tagsState]);

  //Now that it's done, let's display the page !

  return (
    <div style={{ marginTop: "5rem" }}>
      <RealNavBar user={props.user} />
      {!allGames ? (
        <div>Loading...</div>
      ) : (
        <div className="GameList-video-game-page">
          <NavBar line="All the games... Ever..." />
          <div className="navigation">
            <div className="dropdowns">
              <DropdownPlatforms
                platformsState={platformsState}
                setPlatformsState={setPlatformsState}
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
                handleReset={handleReset}
              />
            </ul>
          </div>
          <div className="GameList-video-game-page">
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
            {isFetching && <div>Loading...</div>}
            <div ref={sentinelRef}></div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default GameList;
