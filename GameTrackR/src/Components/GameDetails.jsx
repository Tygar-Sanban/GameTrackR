import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel, { CarouselItem } from "./Carousel.jsx";
import { Link } from "react-router-dom";

import axios from "axios";

function GameDetails() {
  const [game, setGame] = useState(null);
  const [relatedGenre, setRelatedGenre] = useState(null);
  const param = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/games/${param.gameId}?key=b600c722cedc401fb777d82d17949bec`
      )
      .then((response) => {
        setGame(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param]);

  useEffect(() => {
    if (game) {
      axios
        .get(
          `https://api.rawg.io/api/games?key=b600c722cedc401fb777d82d17949bec&genres=${game.genres[0].name.toLowerCase()}`
        )
        .then((response) => {
          console.log("this is the ", response);
          console.log(game.genres[1].name);
          console.log("THIIIIS ISSS THE GAME", game);
          setRelatedGenre(response.data.results);
          console.log("this is the relatedGenre", relatedGenre);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [game]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="gameBackground">
        <div
          className="game-details-background"
          style={{ backgroundImage: `url(${game.background_image})` }}
        ></div>
        {/* <img
          style={{
            height: "40vh",

            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          src={`${game.background_image}`}
          alt="gameBackground"
        /> */}
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
              <td>Genres</td>
              <td>
                {game.genres[0].name} / {game.genres[1].name}
              </td>
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

      <Carousel>
        {relatedGenre &&
          relatedGenre.map((elem) => {
            console.log(elem.background_image);
            const url = `/game-list/${elem.id}`;
            return (
              <CarouselItem key={elem.slug} className="carousel-item">
                <Link className="carousel-image" to={url}>
                  <div
                    className="carousel-image"
                    style={{
                      backgroundImage: `url(${elem.background_image})`,
                    }}
                  >
                    <p> {elem.name} </p>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
      </Carousel>
    </>
  );
}

{
  /* We need to add random popular games that matches the genre of the actual game. if (game.genres) ... return un caroussel de jeux au meme */
}
export default GameDetails;
