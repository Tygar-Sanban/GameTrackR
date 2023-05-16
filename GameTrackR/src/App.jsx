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
  const [likedGames, setLikedGames] = useState([]);
  const [playedGames, setPlayedGames] = useState([]);
  const [wishedGames, setWishedGames] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  console.log("+++++++++++++++++", location.pathname);

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
      // console.log("those are the liked games yo !", likedGames);
    }
  }

  useEffect(() => {
    getUserLikedGames();
    console.log("fetching all the fat games");
    console.log("this is the user", user);
  }, [user, location]);

  useEffect(() => {
    getAllProfiles();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userToJS = JSON.parse(storedUser);
      setUser(userToJS);
    }
  }, []);

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
            />
          }
        />
        <Route
          path="/game-list/:gameId"
          element={
            <GameDetails
              user={user}
              setUser={setUser}
              likedGames={likedGames}
              allProfiles={allProfiles}
              setAllProfiles={setAllProfiles}
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
            />
          }
        />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}

export default App;
