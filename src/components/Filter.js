import React from "react";
import "../css/filter.css";
export default function Filter(props) {
  const [min, setMin] = React.useState("");
  const [max, setMax] = React.useState("");

  const handleClick = () => {
    props.setMax(max);
    props.setMin(min);
    props.setFiltered(true);
  };
  return (
    <div className="div-filter-m">
      Apply calorie filter :
      <input
        className="inputs-m"
        type="number"
        name="fullname"
        placeholder="From"
        onChange={(e) => {
          const num = parseInt(e.target.value);
          if (num <= 0) {
            setMin(0);
          } else {
            setMin(num);
            if (num >= max) {
              console.log("AHO");
              setMax(num);
            }
          }
        }}
        value={min}
      />
      <input
        className="inputs-m"
        type="number"
        name="fullname"
        placeholder="To"
        onChange={(e) => {
          const num = parseInt(e.target.value);

          if (num <= 0) {
            setMax(0);
            setMin(0);
          } else {
            setMax(num);
            if (num <= min) {
              setMin(num);
            }
          }
        }}
        value={max}
      />
      <button className="filter-button-m" onClick={handleClick}>
        Apply Filter
      </button>
    </div>
  );
}
