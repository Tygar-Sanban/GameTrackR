import "./App.css";
import GameDetails from "./Components/GameDetails";
import GameList from "./Components/GameList";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./Components/UserProfile";
import Stats from "./Components/Stats";
import News from "./Components/News";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/game-list" element={<GameList />} />
        <Route path="/game-list/:gameId" element={<GameDetails />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}

export default App;
