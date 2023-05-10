import React, { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [allGames, setAllGames] = useState([]);

  async function getVideoGames() {
    try {
      const response = await axios.get(
        "https://api.rawg.io/api/games?key=b600c722cedc401fb777d82d17949bec&search=fifa"
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
    <div>
      {!allGames ? (
        <div>Loading...</div>
      ) : (
        allGames.map((elem) => {
          return (
            <div key={elem.id}>
              {elem.name} <img src={elem.background_image} alt={elem.name} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default HomePage;
