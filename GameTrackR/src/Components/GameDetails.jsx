import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel, { CarouselItem } from "./Carousel.jsx";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import playstationLogo from "../../public/assets/Images/playstationLogo.png";
import xboxLogo from "../../public/assets/Images/xboxLogo.png";
import laptopLogo from "../../public/assets/Images/laptopLogo.png";
import switchLogo from "../../public/assets/Images/switchLogo.png";
import linuxLogo from "../../public/assets/Images/linuxLogo.png";

import axios from "axios";

function GameDetails() {
  const [game, setGame] = useState(null);
  const [relatedGenre, setRelatedGenre] = useState(null);
  const param = useParams();
  const [screenshots, setScreenshots] = useState(null);

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
    axios
      .get(
        `https://api.rawg.io/api/games/${param.gameId}/screenshots?key=b600c722cedc401fb777d82d17949bec`
      )
      .then((response) => {
        setScreenshots(response.data.results);
        console.log("screenshots response", screenshots);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param]);

  useEffect(() => {
    if (game) {
      const gameGenres = game.genres.map((elem) => {
        return elem.name;
      });
      console.log("game GENRE", gameGenres);

      const oneGameGenre = game.genres.map((elem) => {
        return `&genres=${elem.name.toLowerCase()}`;
      });

      const gameTags = game.tags.map((tag) => {
        return tag.slug;
      });

      const gameTagsCount = game.tags.map((tagCount) => {
        return { name: tagCount.slug, count: tagCount.games_count };
      });

      const sortedTags = gameTagsCount.sort((a, b) => b.count - a.count);

      const topTagsName = sortedTags.slice(0, 3).map((tag) => {
        return `&tags=${tag.name.toLowerCase()}`;
      });

      axios
        .get(
          `https://api.rawg.io/api/games?key=b600c722cedc401fb777d82d17949bec${oneGameGenre[0]}${oneGameGenre[1]}${topTagsName[0]}${topTagsName[1]}${topTagsName[2]}`
        )
        .then((response) => {
          setRelatedGenre(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [game]);

  const platformLogos = {
    Xbox: xboxLogo,
    PlayStation: playstationLogo,
    Nintendo: switchLogo,
    PC: laptopLogo,
    Linux: linuxLogo,
  };

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
        <h1>{game.name}</h1>
      </div>

      <div className="detailsTable">
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td className="title">Player state</td>
              <td>
                <div className="ratingContainer">
                  <p>Played the game ?</p>
                  <p>Liked the game ?</p>
                  <p>Put in the wishlist</p>
                  <p>Send to a friend</p>
                </div>
              </td>
            </tr>
            <div className="divider"></div>
            <tr>
              <td className="title">Icons Player state</td>

              <td>
                <div className="iconContainer">
                  <img
                    src="/public/assets/Images/gamepad-solid (2).svg"
                    alt="gamepad"
                  />
                  <img
                    src="/public/assets/Images/heart-regular.svg"
                    alt="gamepad"
                  />
                  <img src="/public/assets/Images/wishlist.png" alt="gamepad" />
                  <img src="/public/assets/Images/send.png" alt="gamepad" />
                </div>
              </td>
            </tr>
            <div className="divider"></div>
            <tr>
              <td className="title">screenshots</td>
              <td>
                <div className="screenshot-container">
                  {screenshots &&
                    screenshots.map((elem) => {
                      console.log("elem images", elem.image);
                      return (
                        <div
                          key={elem.id}
                          className="screenshot-image"
                          style={{
                            cursor: "pointer",
                            backgroundImage: `url(${elem.image})`,
                            // width: large ? "800px" : "10rem",
                            // height: large ? "20rem" : "10rem",
                          }}
                        />
                      );
                    })}
                  {/* <button onClick={toggleSize}>Larger pictures</button> */}
                </div>
              </td>
            </tr>
            <tr>
              <td className="title">Rating</td>
              <td className="progress-bar">
                <CircularProgressbar
                  className="small-progress-bar"
                  value={game.rating * 20}
                  text={`${game.rating}/5`}
                  strokeWidth={10}
                  styles={{
                    path: {
                      stroke: `rgba(62, 152, 199, ${game.rating / 5})`,
                    },
                    text: {
                      fill: "#fff",
                      fontSize: "16px",
                    },
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="title" style={{ width: "30%" }}>
                Released on :
              </td>
              <td>{game.released}</td>
            </tr>

            <tr>
              <td className="title">Genres</td>
              <td>
                {game.genres[0].name} / {game.genres[1].name}
              </td>
            </tr>
            <tr>
              <td className="title">Platforms</td>
              <td>
                {game.parent_platforms.map((platform) => (
                  <img
                    className="logos"
                    key={platform.platform.id}
                    src={platformLogos[platform.platform.name]}
                    alt={platform.platform.name}
                  />
                ))}
              </td>
            </tr>

            <tr>
              <td className="title">Tags :</td>
              <td key={game.tags.id}>
                {game.tags.map((tag) => {
                  return `${tag.slug} / `;
                })}
              </td>
            </tr>
            <tr>
              <td className="title">Description :</td>
              <td>{game.description_raw}</td>
            </tr>
            <tr>
              <td className="title">You may also like</td>
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
