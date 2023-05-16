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
import gogLogo from "../../public/assets/Images/gogLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faHeart);
library.add(faListCheck);
library.add(faGamepad);
library.add(faPaperPlane);

import axios from "axios";

function GameDetails(props) {
  const [game, setGame] = useState(null);
  const [relatedGenre, setRelatedGenre] = useState(null);
  const param = useParams();
  const [screenshots, setScreenshots] = useState(null);
  const [liked, setLiked] = useState(false);

  const [canUse, setCanUse] = useState(false);

  // if (props.user.likedGames.includes(param.gameId)) {
  //   setLiked(true);
  // }

  useEffect(() => {
    if (props.user && props.user.likedGames) {
      props.user.likedGames.map((elem) => {
        elem.id === parseInt(param.gameId) && setLiked(true);
      });
    }
    if (props.user) {
      setCanUse(true);
    }
  }, [props.user]);

  // useEffect(() => {
  //   if (props.user) {
  //     setCanUse(true);
  //   }
  // }, [props.user]);

  const [stores, setStores] = useState(null);
  const [reddit, setReddit] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/games/${param.gameId}?key=fa9c45d8169145c5a9d8796aa3e09890`
      )
      .then((response) => {
        setGame(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://api.rawg.io/api/games/${param.gameId}/screenshots?key=fa9c45d8169145c5a9d8796aa3e09890`
      )
      .then((response) => {
        setScreenshots(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://api.rawg.io/api/games/${param.gameId}/stores?key=fa9c45d8169145c5a9d8796aa3e09890`
      )
      .then((response) => {
        setStores(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://api.rawg.io/api/games/${param.gameId}/reddit?id=&key=fa9c45d8169145c5a9d8796aa3e09890&page_size=100`
      )
      .then((response) => {
        setReddit(response.data.results);
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

      // We could create a string while mapping like so :
      // let exampleString = "";
      // game.genres.map((elem)=> {
      //   exampleString += elem
      // })
      // And then we put exampleString in the request

      axios
        .get(
          `https://api.rawg.io/api/games?key=fa9c45d8169145c5a9d8796aa3e09890${oneGameGenre[0]}${oneGameGenre[1]}${topTagsName[0]}${topTagsName[1]}${topTagsName[2]}`
        )
        .then((response) => {
          setRelatedGenre(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [game]);

  async function handleLikeClick() {
    setLiked(true);
    const objectToPatch = {
      likedGames: [...props.user.likedGames, game],
    };
    try {
      const response = await axios.patch(
        `https://ironrest.fly.dev/api/GameTrackR_UserData/${props.user._id}`,
        objectToPatch
      );
      delete response.data.password;
      props.setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDislike() {
    setLiked(false);

    const objectToPatch = {
      likedGames: props.user.likedGames.filter((elem) => {
        return elem.id !== parseInt(param.gameId);
      }),
    };

    try {
      const response = await axios.patch(
        `https://ironrest.fly.dev/api/GameTrackR_UserData/${props.user._id}`,
        objectToPatch
      );
      delete response.data.password;
      props.setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  const platformLogos = {
    Xbox: xboxLogo,
    PlayStation: playstationLogo,
    Nintendo: switchLogo,
    PC: laptopLogo,
    Linux: linuxLogo,
  };

  const storeLogos = {
    5: "/assets/Images/gogLogo.svg",
    3: "/assets/Images/psnLogo.png",
    1: "/assets/Images/steamLogo.png",
    2: "/assets/Images/microsoftLogo.png",
    6: "/assets/Images/nintendoShopLogo.svg",
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
              <td className="title">Rating</td>
              <td className="progress-bar">
                <CircularProgressbar
                  className="small-progress-bar"
                  value={game.metacritic}
                  text={`${game.metacritic}/100`}
                  strokeWidth={10}
                  styles={{
                    path: {
                      stroke: `rgba(62, 152, 199, ${game.metacritic / 100})`,
                    },
                    text: {
                      fill: "#fff",
                      fontSize: "16px",
                    },
                  }}
                />
              </td>
            </tr>
            <div className="divider"></div>
            <tr>
              <td className="title">Icons Player state</td>

              <td>
                <div className="iconContainer">
                  <div style={{ textAlign: "center" }}>
                    <i>
                      <FontAwesomeIcon
                        icon="fa-solid fa-gamepad"
                        size="10x"
                        style={{ color: "#8bc6ef" }}
                      />
                    </i>
                    <h4 style={{ marginTop: "1rem" }}>Played it ?</h4>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <i>
                      <FontAwesomeIcon
                        icon="fa-solid fa-heart"
                        size="10x"
                        style={{ color: "#8bc6ef" }}
                      />
                    </i>
                    <h4 style={{ marginTop: "1rem" }}>Liked it ?</h4>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <i>
                      <FontAwesomeIcon
                        icon="fa-solid fa-list-check"
                        size="10x"
                        style={{ color: "#8bc6ef" }}
                      />
                    </i>
                    <h4 style={{ marginTop: "1rem" }}>Add to wishlist</h4>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <i>
                      <FontAwesomeIcon
                        icon="fa-solid fa-paper-plane"
                        size="10x"
                        style={{ color: "#8bc6ef" }}
                      />
                    </i>
                    <h4 style={{ marginTop: "1rem" }}>Send to a friend</h4>
                  </div>
                </div>
              </td>
            </tr>
            <div className="divider"></div>
            <tr>
              <td className="title" style={{ width: "30%" }}>
                Released on :
              </td>
              <td className="released">{game.released}</td>
            </tr>
            <div className="divider"></div>
            <tr>
              <td className="title">Platforms</td>
              <td className="platforms">
                {game.parent_platforms.map((platform) => (
                  <>
                    <img
                      className="logos"
                      key={platform.platform.id}
                      src={platformLogos[platform.platform.name]}
                      alt={platform.platform.name}
                    />
                  </>
                ))}
              </td>
            </tr>
            {stores && (
              <tr>
                <td className="title">Buy the game</td>
                <td className="buy">
                  {stores.map((store) => {
                    return (
                      <a
                        key={stores.id}
                        href={store.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="storeLogos"
                          key={store.store_id}
                          src={storeLogos[store.store_id]}
                          alt="store"
                        />
                      </a>
                    );
                  })}
                </td>
              </tr>
            )}
            <div className="divider"></div>
            <tr>
              <td className="title">Genres</td>
              <td className="genres">
                {game.genres.map((elem) => {
                  return <div key={game.description_raw}>{elem.name}</div>;
                })}
              </td>
            </tr>
            <div className="divider"></div>

            <div className="divider"></div>
            <tr>
              <td className="title">screenshots</td>
              <td>
                <div className="screenshot-container">
                  {screenshots &&
                    screenshots.map((elem) => {
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
            <div className="divider"></div>
            <tr>
              <td className="title">Description :</td>
              <td>{game.description_raw}</td>
            </tr>
            <tr>
              <td className="title">Tags :</td>
              <td key={game.tags.id}>
                {game.tags.map((tag) => {
                  return `${tag.slug} / `;
                })}
              </td>
            </tr>
            <div className="divider"></div>

            <tr>
              <td className="title">Actions</td>
              <td className="like">
                {canUse ? (
                  liked ? (
                    <p onClick={handleDislike}>You like this game</p>
                  ) : (
                    <img
                      style={{ width: "3.5%" }}
                      src="../../public/assets/Images/heart.png"
                      alt="like"
                      onClick={handleLikeClick}
                    />
                  )
                ) : (
                  <div>
                    You need to be logged to interract with the game.{" "}
                    <Link to="/log-in">
                      <h4>Log in ?</h4>
                    </Link>{" "}
                  </div>
                )}
              </td>
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
            const url = `/game-list/${elem.id}`;
            return (
              <CarouselItem key={elem.slug} className="carousel-item">
                <Link className="carousel-image" to={url} target="_blank">
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

      {reddit && (
        <div className="detailsTable">
          <div className="redditTitleDiv">Recent Reddit Posts</div>
          <div className="redditContainer" key={reddit.id}>
            {reddit
              .filter((post) => post.image)
              .map((post) => {
                return (
                  <>
                    <div className="redditPost">
                      <p className="redditUsername">Username {post.username}</p>

                      <p className="redditTitle">{post.name}</p>
                      <img
                        className="redditImg"
                        src={post.image}
                        alt="redditImg"
                      />
                      {/* <aside>{post.text}</aside> */}
                      <a
                        key={post.id}
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p className="redditUsername">Link to Reddit post</p>
                        <p className="redditUrl">{post.url}</p>
                      </a>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

{
  /* We need to add random popular games that matches the genre of the actual game. if (game.genres) ... return un caroussel de jeux au meme */
}
export default GameDetails;
