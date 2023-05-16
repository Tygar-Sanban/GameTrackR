import "./App.css";
import GameDetails from "./Components/GameDetails";
import GameList from "./Components/GameList";
import HomePage from "./Components/HomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import UserProfile from "./Components/UserProfile";
import Stats from "./Components/Stats";
import News from "./Components/News";
import { useState, useEffect } from "react";
import SignIn from "./Components/SignIn";
import LogIn from "./Components/LogIn";
import axios, { all } from "axios";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [allProfiles, setAllProfiles] = useState([]);
  const [likedGames, setLikedGames] = useState([]);
  const [playedGames, setPlayedGames] = useState([]);
  const [wishedGames, setWishedGames] = useState([]);

  const [commentaryDisplay, setCommentaryDisplay] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  async function getAllProfiles() {
    try {
      const response = await axios.get(
        "https://ironrest.fly.dev/api/GameTrackR_UserData"
      );
      setAllProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function getUserLikedGames() {
    if (user) {
      setLikedGames(user.likedGames);
    }
  }

  function getUserWishedGames() {
    if (user) {
      setWishedGames(user.wishList);
    }
  }

  function getUserPlayedGames() {
    if (user) {
      setPlayedGames(user.gamesPlayed);
    }
  }

  useEffect(() => {
    getUserLikedGames();
    getUserPlayedGames();
    getUserWishedGames();
  }, [user, location]);

  useEffect(() => {
    getAllProfiles();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userToJS = JSON.parse(storedUser);
      setUser(userToJS);
    }
  }, []);

  function fetchComments() {
    axios
      .get(`https://ironrest.fly.dev/api/GameTrackR_Commentaries`)
      .then((response) => {
        console.log("responses ironrest", response);
        setCommentaryDisplay(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchComments();
  }, [location]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              setUser={setUser}
              likedGames={likedGames}
              allProfiles={allProfiles}
              setAllProfiles={setAllProfiles}
              playedGames={playedGames}
              wishedGames={wishedGames}
            />
          }
        ></Route>
        <Route
          path="/game-list"
          element={
            <GameList
              user={user}
              setUser={setUser}
              likedGames={likedGames}
              allProfiles={allProfiles}
              setAllProfiles={setAllProfiles}
              playedGames={playedGames}
              wishedGames={wishedGames}
            />
          }
        />
        <Route
          path="/game-list/:gameId"
          element={
            <GameDetails
              formSubmitted={formSubmitted}
              setFormSubmitted={setFormSubmitted}
              commentaryDisplay={commentaryDisplay}
              setCommentaryDisplay={setCommentaryDisplay}
              user={user}
              setUser={setUser}
              likedGames={likedGames}
              allProfiles={allProfiles}
              setAllProfiles={setAllProfiles}
              fetchComments={fetchComments}
              playedGames={playedGames}
              wishedGames={wishedGames}
            />
          }
        />
        <Route
          path="/user-profile"
          element={
            <UserProfile
              user={user}
              setUser={setUser}
              likedGames={likedGames}
              allProfiles={allProfiles}
              setAllProfiles={setAllProfiles}
              playedGames={playedGames}
              wishedGames={wishedGames}
            />
          }
        />
        <Route
          path="/sign-in"
          element={
            <SignIn
              user={user}
              setUser={setUser}
              likedGames={likedGames}
              allProfiles={allProfiles}
              setAllProfiles={setAllProfiles}
              getAllProfiles={getAllProfiles}
              playedGames={playedGames}
              wishedGames={wishedGames}
            />
          }
        />
        <Route
          path="/log-in"
          element={
            <LogIn
              user={user}
              setUser={setUser}
              likedGames={likedGames}
              allProfiles={allProfiles}
              setAllProfiles={setAllProfiles}
              getAllProfiles={getAllProfiles}
              playedGames={playedGames}
              wishedGames={wishedGames}
            />
          }
        />
        <Route
          path="/stats"
          element={
            <Stats
              user={user}
              setUser={setUser}
              likedGames={likedGames}
              allProfiles={allProfiles}
              setAllProfiles={setAllProfiles}
              playedGames={playedGames}
              wishedGames={wishedGames}
            />
          }
        />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}

export default App;
