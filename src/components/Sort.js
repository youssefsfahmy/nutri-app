import React from "react";
import "../css/sort.css";

export default function Sort(props) {
  return (
    <div className="dropdown">
      <button className="dropbtn">
        Sort by: <a className="text-filter"> {props.choice}</a>
      </button>
      <div className="dropdown-content">
        <a
          onClick={() => {
            props.setChoice("Name");
          }}
        >
          Name
        </a>
        <a
          onClick={() => {
            props.setChoice("Lowest Cal");
          }}
        >
          Lowest Calories
        </a>
        <a
          onClick={() => {
            props.setChoice("Highest Cal");
          }}
        >
          Highest Calories
        </a>
      </div>
    </div>
  );
}
