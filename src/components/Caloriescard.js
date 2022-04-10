import React from "react";
import { isMobile } from "react-device-detect";
import "../css/caloriescard.css";

export default function CaloriesCard(props) {
  return (
    <div className={isMobile ? "cardcal-m" : "cardcal"}>
      <div className={isMobile ? "text-m" : "text"}>{props.text} </div>
      <div className={isMobile ? "number-m" : "number"}>{props.number} cal</div>
    </div>
  );
}
