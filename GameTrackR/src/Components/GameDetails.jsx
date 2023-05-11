import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

function GameDetails() {
  const [game, setGame] = useState(null);
  const param = useParams();
  console.log("this is the param", param);

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/games/${param.gameId}?key=b600c722cedc401fb777d82d17949bec`
      )
      .then((response) => {
        console.log(response);
        setGame(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="gameBackground">
        <img
          style={{ height: "40vh", objectFit: "cover" }}
          src={`${game.background_image}`}
          alt="gameBackground"
        />
      </div>
      <div>
        <h1>{game.name}</h1>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>Released on :</td>
              <td>{game.released}</td>
            </tr>
            <tr>
              <td>Rating</td>
              <td>{game.rating}/5</td>
            </tr>
            <tr>
              <td>Description :</td>
              <td>{game.description_raw}</td>
            </tr>
            <tr>
              <td>You may also like</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

{
  /* We need to add random popular games that matches the genre of the actual game. if (game.genres) ... return un caroussel de jeux au meme */
}
export default GameDetails;
