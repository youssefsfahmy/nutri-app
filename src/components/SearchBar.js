import React from "react";
import icon from "../images/search-icon.svg";
import "../css/searchbar.css";

export default function SearchBar(props) {
  const [searchWord, setSearchWord] = React.useState("");
  const handleClick = () => {
    props.setSearchWord(searchWord);
    props.setSearch(true);
  };
  return (
    <div className="main-search-div">
      <img className="search-icon" alt="img" src={icon}></img>
      <input
        className="search-bar"
        type="text"
        name="email"
        placeholder="Search for an item"
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
      <button onClick={handleClick} className="search-button">
        Search
      </button>
    </div>
  );
}
