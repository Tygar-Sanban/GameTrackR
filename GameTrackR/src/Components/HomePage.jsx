import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  const [allGames, setAllGames] = useState(null);

  async function getVideoGames() {
    try {
      const response = await axios.get(
        "https://api.rawg.io/api/games?key=b600c722cedc401fb777d82d17949bec"
      );
      setAllGames(response);
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
          return <div key={elem.results.id}>{elem.results.name}</div>;
        })
      )}
    </div>
  );
}

export default HomePage;
