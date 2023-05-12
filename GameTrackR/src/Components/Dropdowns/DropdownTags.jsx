import React from "react";

//Thank you chatGPT!!!

function DropdownTags(props) {
  function handleOptionChange(event) {
    props.setTagsState(event.target.value);
  }

  return (
    <select value={props.tagsState} onChange={handleOptionChange}>
      <option value="tags">Tags...</option>
      <option value="singleplayer">Singleplayer</option>
      <option value="multiplayer">Multiplayer</option>
      <option value="open-world">Open World</option>
      <option value="first-person">First-Person</option>
      <option value="fps">FPS</option>
      <option value="third-person">Third Person</option>
      <option value="pvp">PvP</option>
      <option value="online-pvp">Online PvP</option>
      <option value="cooperative">Cooperative</option>
      <option value="online-co-op">Online Co-Op</option>
      <option value="sci-fi">Sci-fi</option>
      <option value="masterpiece">Masterpiece</option>
      <option value="exploration">Exploration</option>
      <option value="mmorpg">MMORPG</option>
      <option value="survival">Survival</option>
      <option value="horror">Horror</option>
      <option value="difficult">Difficult</option>
      <option value="combat">Combat</option>
      <option value="atmospheric">Atmospheric</option>
      <option value="funny">Funny</option>
      <option value="sandbox">Sandbox</option>
      <option value="moddable">Moddable</option>
      <option value="fantasy">Fantasy</option>
      <option value="dark">Dark</option>
      <option value="time-travel">Time Travel</option>
      <option value="nudity">Nudity</option>
      <option value="choices-matter">Choices Matter</option>
      <option value="mature">Mature</option>
      <option value="medieval">Medieval</option>
      <option value="magic">Magic</option>
      <option value="story-rich">Story Rich</option>
      <option value="female-protagonist">Female Protagonist</option>
      <option value="space">Space</option>
      <option value="science">Science</option>
      <option value="classic">Classic</option>
      <option value="stealth">Stealth</option>
      <option value="retro">Retro</option>
      <option value="cinematic">Cinematic</option>
      <option value="gore">Gore</option>
      <option value="linear">Linear</option>
      <option value="political">Political</option>
      <option value="violent">Violent</option>
      <option value="historical">Historical</option>
      <option value="realistic">Realistic</option>
      <option value="western">Western</option>
      <option value="short">Short</option>
      <option value="mystery">Mystery</option>
      <option value="2d">2D</option>
      <option value="point-click">Point & Click</option>
      <option value="great-soundtrack">Great Soundtrack</option>
      <option value="full-controller-support">Full controller support</option>
    </select>
  );
}

export default DropdownTags;
