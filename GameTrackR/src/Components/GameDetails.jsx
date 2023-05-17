import { useNavigate, useParams } from "react-router-dom";
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
import appleLogo from "../../public/assets/Images/apple-logo.png";
import gogLogo from "../../public/assets/Images/gogLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGamepad,
  faHeart,
  faListCheck,
  faPaperPlane,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faHeart);
library.add(faListCheck);
library.add(faGamepad);
library.add(faPaperPlane);

import axios from "axios";
import RealNavBar from "./RealNavBar.jsx";
import Footer from "./Footer.jsx";

function GameDetails(props) {
  const [game, setGame] = useState(null);
  const [relatedGenre, setRelatedGenre] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  const [screenshots, setScreenshots] = useState(null);
  const [liked, setLiked] = useState(false);
  const [wished, setWished] = useState(false);
  const [played, setPlayed] = useState(false);

  const [canUse, setCanUse] = useState(false);

  useEffect(() => {
    if (props.user && props.user.likedGames) {
      props.user.likedGames.map((elem) => {
        elem.id === parseInt(param.gameId) && setLiked(true);
      });
    }
    if (props.user && props.user.wishList) {
      props.user.wishList.map((elem) => {
        elem.id === parseInt(param.gameId) && setWished(true);
      });
    }
    if (props.user && props.user.gamesPlayed) {
      props.user.gamesPlayed.map((elem) => {
        elem.id === parseInt(param.gameId) && setPlayed(true);
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
        console.log("FECHING");
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
        console.log("FETCHING");
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
        console.log("FETCHING");
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
      //   exampleString += &genres=${elem}
      // })
      // And then we put exampleString in the request

      axios
        .get(
          `https://api.rawg.io/api/games?key=fa9c45d8169145c5a9d8796aa3e09890${oneGameGenre[0]}${oneGameGenre[1]}${topTagsName[0]}${topTagsName[1]}${topTagsName[2]}`
        )
        .then((response) => {
          console.log("FETCHING");
          setRelatedGenre(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [game]);

  const filteredRelatedGames = relatedGenre.filter(
    (relatedGame) => relatedGame.id !== game.id
  );
  let allLikedIds;
  if (props.likedGames) {
    allLikedIds = props.likedGames.map((elem) => {
      console.log(elem.id);
      return elem.id;
    });
  }

  let allPlayedIds;
  if (props.playedGames) {
    allPlayedIds = props.playedGames.map((elem) => {
      console.log(elem.id);
      return elem.id;
    });
  }

  let allWisheddIds;
  if (props.wishedGames) {
    allWisheddIds = props.wishedGames.map((elem) => {
      console.log(elem.id);
      return elem.id;
    });
  }

  const filteredRelatedGamesTrue = filteredRelatedGames.filter((elem) => {
    return (
      !allLikedIds.includes(elem.id) &&
      !allPlayedIds.includes(elem.id) &&
      !allWisheddIds.includes(elem.id)
    );
  });

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

  async function handleWishClick() {
    setWished(true);
    const objectToPatch = {
      wishList: [...props.user.wishList, game],
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

  async function handlePlayClick() {
    setPlayed(true);
    const objectToPatch = {
      gamesPlayed: [...props.user.gamesPlayed, game],
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

  async function handleDisWish() {
    setWished(false);

    const objectToPatch = {
      wishList: props.user.wishList.filter((elem) => {
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

  async function handleDisPlay() {
    setPlayed(false);

    const objectToPatch = {
      gamesPlayed: props.user.gamesPlayed.filter((elem) => {
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
    "Apple Macintosh": appleLogo,
  };

  const storeLogos = {
    5: "/assets/Images/gogLogo.svg",
    3: "/assets/Images/psnLogo.png",
    1: "/assets/Images/steamLogo.png",
    2: "/assets/Images/microsoftLogo.png",
    6: "/assets/Images/nintendoShopLogo.svg",
    7: "/assets/Images/xboxMarketPlaceLogo.png",
    11: "/assets/Images/epicLogo.png",
    4: "/assets/Images/apple-logo.png",
    8: "/assets/Images/googlePlayLogo.png",
  };

  // POST COMMENTS
  const [pseudonyme, setPseudonyme] = useState("");
  const [commentary, setCommentary] = useState("");

  useEffect(() => {
    if (props.user) {
      setPseudonyme(props.user.userName);
    }
  }, [props.user]);

  async function handleSubmitComment(event) {
    if (props.user) {
      event.preventDefault();
      const objectToPost = {
        gameId: game.id,
        pseudonyme,
        commentary,
      };
      setCommentary("");

      try {
        const response = await axios.post(
          "https://ironrest.fly.dev/api/GameTrackR_Commentaries",
          objectToPost
        );
        props.fetchComments();
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/sign-in");
    }
  }

  async function handleDelete(commentary) {
    const foundCommentary = props.commentaryDisplay.find((elem) => {
      return elem.commentary === commentary;
    });

    const response = await axios.delete(
      `https://ironrest.fly.dev/api/GameTrackR_Commentaries/${foundCommentary._id}`
    );
    props.fetchComments();
  }

  //

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RealNavBar user={props.user} />
      <div className="gameBackground" style={{ marginTop: "5rem" }}>
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
              <td className="title">
                Click the icons to set a status for your game
              </td>
              <td>
                <div>
                  <div className="iconContainer">
                    <div style={{ textAlign: "center" }}>
                      <i>
                        {canUse ? (
                          played ? (
                            <>
                              <FontAwesomeIcon
                                icon="fa-solid fa-gamepad"
                                size="10x"
                                style={{ color: "#0B7A75", width: "50%" }}
                                onClick={handleDisPlay}
                              />
                              <FontAwesomeIcon
                                icon={faCheck}
                                style={{
                                  position: "absolute",
                                  color: "#0B7A75",
                                  fontSize: "3em",
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon="fa-solid fa-gamepad"
                                size="10x"
                                style={{ color: "#8bc6ef", width: "50%" }}
                                onClick={handlePlayClick}
                              />
                            </>
                          )
                        ) : (
                          <div className="require-log">
                            You need to be logged to interract with the game.{" "}
                            <Link to="/log-in">
                              <h4>Log in ?</h4>
                            </Link>{" "}
                          </div>
                        )}
                      </i>
                      <h4 className="infoIcon">Played it ? Click it !</h4>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <i>
                        {canUse ? (
                          liked ? (
                            <>
                              <FontAwesomeIcon
                                icon="fa-solid fa-heart"
                                size="10x"
                                style={{ color: "#f44336", width: "50%" }}
                                onClick={handleDislike}
                              />
                              <FontAwesomeIcon
                                icon={faCheck}
                                style={{
                                  position: "absolute",
                                  color: "#f44336",
                                  fontSize: "3em",
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon="fa-solid fa-heart"
                                size="10x"
                                style={{ color: "#8bc6ef", width: "50%" }}
                                onClick={handleLikeClick}
                              />
                            </>
                          )
                        ) : (
                          <></>
                        )}
                      </i>
                      <h4 className="infoIcon">Liked it ? Click it !</h4>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <i>
                        {canUse ? (
                          wished ? (
                            <>
                              <FontAwesomeIcon
                                icon="fa-solid fa-list-check"
                                size="10x"
                                style={{ color: "#D7C9AA", width: "50%" }}
                                onClick={handleDisWish}
                              />
                              <FontAwesomeIcon
                                icon={faCheck}
                                style={{
                                  position: "absolute",
                                  color: "#D7C9AA",
                                  fontSize: "3em",
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon="fa-solid fa-list-check"
                                size="10x"
                                style={{ color: "#8bc6ef", width: "50%" }}
                                onClick={handleWishClick}
                              />
                            </>
                          )
                        ) : (
                          <></>
                        )}
                      </i>
                      <h4 className="infoIcon">Wish it ? Click it !</h4>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <div className="divider"></div>
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
                </div>
              </td>
            </tr>
            <div className="divider"></div>
            <tr>
              <td className="title">Description :</td>
              <td className="content">{game.description_raw}</td>
            </tr>
            <div className="divider"></div>
            <tr>
              <td className="title">Average play time</td>
              <td className="genres">{game.playtime} H</td>
            </tr>
            <div className="divider"></div>
            <tr>
              <td className="title">Genres</td>
              <td className="genres">
                {game.genres.map((elem) => {
                  return <div key={game.id}>{elem.name}</div>;
                })}
              </td>
            </tr>

            <tr>
              <td className="title">Top Tags :</td>
              <td className="genres" key={game.tags.id}>
                {game.tags
                  .map((tag) => {
                    return { name: tag.slug, count: tag.games_count };
                  })
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 4)
                  .map((tagg) => {
                    return `${tagg.name} / `;
                  })}
              </td>
            </tr>
            <div className="divider"></div>
            <tr></tr>

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
                <td className="title">Links to the stores</td>
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
              <td className="title">You may also like</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Carousel>
        {relatedGenre &&
          filteredRelatedGamesTrue.map((elem) => {
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
        <>
          <div className="redditTitleDiv">COMMUNITY</div>
          <div className="reddit-comment-container">
            <div className="redditContainer" key={reddit.id}>
              {reddit
                .filter((post) => post.image)
                .map((post) => {
                  return (
                    <>
                      <div className="redditPost">
                        <img
                          src="../../public/assets/Images/redditLogo.png"
                          alt="redditLogo"
                          className="redditLogo"
                        />
                        <p className="redditUsername">
                          Username {post.username}
                        </p>

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

            <div className="comment-section">
              <form onSubmit={handleSubmitComment}>
                <label htmlFor="comment">Your comment here :</label>
                <textarea
                  className="textarea"
                  type="text"
                  value={commentary}
                  onChange={(event) => {
                    event.preventDefault();
                    setCommentary(event.target.value);
                  }}
                />
                <button className="btn-topdown">
                  <h4>Comment</h4>
                </button>
              </form>
              <div className="comment-div">
                {props.commentaryDisplay.map((elem) => {
                  return (
                    elem.gameId === parseInt(param.gameId) && (
                      <div key={elem._id}>
                        <p className="pseudonyme">{elem.pseudonyme}</p>

                        <div className="commentary-container">
                          <p className="commentary">{elem.commentary}</p>
                          {props.user &&
                            props.user.userName &&
                            elem.pseudonyme === props.user.userName && (
                              <div className="delete-com">
                                <img
                                  onClick={() => handleDelete(elem.commentary)}
                                  src="../../public/assets/Images/bin.png"
                                  alt="delete"
                                />
                              </div>
                            )}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

{
  /* We need to add random popular games that matches the genre of the actual game. if (game.genres) ... return un caroussel de jeux au meme */
}
export default GameDetails;
