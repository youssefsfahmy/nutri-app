import React from "react";
import "../css/caloriescard.css";

export default function CaloriesCard(props) {
  return (
    <div className="cardcal">
      <div className="text">{props.text} </div>
      <div className="number">{props.number} cal</div>
    </div>
  );
}
