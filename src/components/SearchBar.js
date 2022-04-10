import React from "react";
import icon from "../images/search-icon.svg";
import "../css/searchbar.css";
import { isMobile } from "react-device-detect";

export default function SearchBar(props) {
  const [searchWord, setSearchWord] = React.useState("");
  const handleClick = () => {
    props.setSearchWord(searchWord);
    props.setSearch(true);
  };
  return (
    <div className="main-search-div">
      <img
        className={isMobile ? "search-icon-m" : "search-icon"}
        alt="img"
        src={icon}
      ></img>
      <input
        className={isMobile ? "search-bar-m" : "search-bar"}
        type="text"
        name="email"
        placeholder="Search for an item"
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
      <button
        onClick={handleClick}
        className={isMobile ? "search-button-m" : "search-button"}
      >
        Search
      </button>
    </div>
  );
}
