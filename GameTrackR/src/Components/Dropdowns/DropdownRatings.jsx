import React from "react";

//Thank you chatGPT!!!

function DropdownRatings(props) {
  function handleOptionChange(event) {
    props.setRatingsState(event.target.value);
  }

  return (
    <select value={props.ratingsState} onChange={handleOptionChange}>
      <option value="ratings">Ratings...</option>
      <option value="90+">90+</option>
      <option value="80+">80+</option>
      <option value="70+">70+</option>
      <option value="60+">60+</option>
      <option value="50+">50+</option>
      <option value="40+">40+</option>
      <option value="30+">30+</option>
      <option value="20+">20+</option>
      <option value="10+">10+</option>
      <option value="0+">0+</option>
    </select>
  );
}

export default DropdownRatings;
