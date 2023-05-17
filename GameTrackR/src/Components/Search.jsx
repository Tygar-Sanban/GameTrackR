import React from "react";

function Search(props) {
  return (
    <div className="all-search-bar">
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
      <button onClick={props.handleReset} className="search-bar-button">
        Reset list
      </button>
    </div>
  );
}

export default Search;
