import "./App.css";
import GameDetails from "./Components/GameDetails";
import GameList from "./Components/GameList";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./Components/UserProfile";
import Stats from "./Components/Stats";
import News from "./Components/News";
import { useState, useEffect } from "react";
import SignIn from "./Components/SignIn";
import LogIn from "./Components/Login";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [allProfiles, setAllProfiles] = useState([]);

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

  useEffect(() => {
    // setInterval(() => {
    getAllProfiles();
    // }, 500);
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
              allProfiles={allProfiles}
              setAllProfiles={setAllProfiles}
            />
          }
        />
        <Route
          path="/log-in"
          element={
            <LogIn
              user={user}
              setUser={setUser}
              allProfiles={allProfiles}
              setAllProfiles={setAllProfiles}
            />
          }
        />
        <Route
          path="/stats"
          element={
            <Stats
              user={user}
              setUser={setUser}
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
