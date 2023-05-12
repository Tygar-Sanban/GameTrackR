import React from "react";

//Thank you chatGPT!!!

function DropdownStores(props) {
  function handleOptionChange(event) {
    props.setStoresState(event.target.value);
  }

  return (
    <select value={props.storesState} onChange={handleOptionChange}>
      <option value="stores">Stores...</option>
      <option value="steam">Steam</option>
      <option value="epic-games">Epic Games</option>
      <option value="playstation-store">PlayStation Store</option>
      <option value="xbox-store">Xbox Store</option>
      <option value="nintendo">Nintendo Store</option>
      <option value="gog">GOG</option>
    </select>
  );
}

export default DropdownStores;
