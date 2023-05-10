import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

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

  return (
    <div className="GameList-video-game-page">
      {!allGames ? (
        <div>Loading...</div>
      ) : (
        allGames.map((elem) => {
          return (
            <div
              key={elem.id}
              className="GameList-video-game"
              style={{ backgroundImage: `url(${elem.background_image})` }}
            >
              <div className="GameList-video-game-name">{elem.name}</div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default GameList;
