import React from "react";

//Thank you chatGPT!!!

function DropdownGenres(props) {
  function handleOptionChange(event) {
    props.setGenresState(event.target.value);
  }

  return (
    <select value={props.genresState} onChange={handleOptionChange}>
      <option value="genres">Genres...</option>
      <option value="action">Action</option>
      <option value="adventure">Adventure</option>
      <option value="role-playing-games-rpg">RPG</option>
      <option value="shooter">Shooter</option>
      <option value="massively-multiplayer">Massively Multiplayer</option>
      <option value="sports">Sports</option>
      <option value="racing">Racing</option>
      <option value="puzzle">Puzzle</option>
      <option value="platformer">Platformer</option>
      <option value="indie">Indie</option>
    </select>
  );
}

export default DropdownGenres;
