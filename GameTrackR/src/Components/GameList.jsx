import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function GameList() {
  const [allGames, setAllGames] = useState([]);

  async function getVideoGames() {
    try {
      const response = await axios.get(
        "https://api.rawg.io/api/games?key=b600c722cedc401fb777d82d17949bec"
      );
      setAllGames(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideoGames();
  }, []);

  //Now let's handle what happens when we reach the bottom of the page :

  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchElements();
  }, [currentPage]);

  function fetchElements() {
    setIsFetching(true);

    axios
      .get(
        `https://api.rawg.io/api/games?key=b600c722cedc401fb777d82d17949bec&page=${currentPage}`
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

  //Now that it's done, let's display the page !

  return (
    <div>
      {!allGames ? (
        <div>Loading...</div>
      ) : (
        <div className="GameList-video-game-page">
          <nav className="header">
            <ul>
              <li>filter</li>
              <li>sort</li>
            </ul>
          </nav>
          {allGames.map((elem) => {
            const url = `/game-list/${elem.id}`;
            return (
              <Link
                key={elem.id}
                to={url}
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
      )}
    </div>
  );
}

export default GameList;
