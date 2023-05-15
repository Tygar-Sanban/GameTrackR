import React from "react";

function Search(props) {
  return (
    <form onSubmit={props.handleSubmit} className="searchBar">
      <input
        className="search-bar-input"
        placeholder="Search a game !"
        type="search"
        value={props.searchString}
        onChange={props.handleChange}
      />
      <button className="search-bar-button">Search</button>
    </form>
  );
}

export default Search;
