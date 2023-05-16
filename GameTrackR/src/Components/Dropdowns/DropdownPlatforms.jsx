import React, { useState } from "react";

//Thank you chatGPT & the TAs!!!

function DropdownPlatforms(props) {
  function handleOptionChange(event) {
    props.setPlatformsState(event.target.value);
    props.dropdownPlatformSearch();
  }
  return (
    <select value={props.platformsState} onChange={handleOptionChange}>
      <option value="platforms">Platforms...</option>
      <option value="pc">PC</option>
      <option value="playstation5">Playstation 5</option>
      <option value="xbox-series-x">Xbox Series S/X</option>
      <option value="playstation4">PlayStation 4</option>
      <option value="xbox360">Xbox 360</option>
      <option value="playstation3">PlayStation 3</option>
      <option value="xbox-one">Xbox One</option>
      <option value="nintendo-switch">Nintendo Switch</option>
    </select>
  );
}

export default DropdownPlatforms;
