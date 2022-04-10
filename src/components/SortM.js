import React from "react";
import "../css/sort.css";

export default function SortM(props) {
  return (
    <div className="main-div-sort">
      Sort by:
      <div className="sub-div">
        <button
          className="button-filter"
          onClick={() => {
            props.setChoice("Name");
          }}
        >
          Name
        </button>
        <button
          className="button-filter"
          onClick={() => {
            props.setChoice("Lowest Cal");
          }}
        >
          {" "}
          Lowest Calories
        </button>
        <button
          className="button-filter"
          onClick={() => {
            props.setChoice("Highest Cal");
          }}
        >
          {" "}
          Highest Calories
        </button>
      </div>
    </div>
  );
}
