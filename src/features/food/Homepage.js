import React, { useEffect } from "react";
import "../../css/homepage.css";
import { useSelector, useDispatch } from "react-redux";

import Caloriescard from "../../components/Caloriescard.js";
import Foodcard from "../../components/Foodcard.js";
import SearchBar from "../../components/SearchBar";
import Sort from "../../components/Sort";
import Filter from "../../components/Filter";
import { isMobile } from "react-device-detect";

import {
  checkauth,
  logout,
  removeCalories,
  selectToken,
  selectUserCal,
  selectUserRem,
} from "../user/userSlice";
import { useNavigate } from "react-router-dom";
import {
  selectFood,
  selectfoodMessage,
  selectfoodStatus,
  show_all_food,
  show_all_food_asc,
  show_all_food_desc,
} from "./foodSlice";
import SortM from "../../components/SortM";

export default function Homepage() {
  const [choice, setChoice] = React.useState("Name");
  const [foodsfiltered, setFoodsfiltered] = React.useState([]);
  const [filtered, setFiltered] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [searchWord, setSearchWord] = React.useState("");
  const [min, setMin] = React.useState("");
  const [max, setMax] = React.useState("");

  const dispatch = useDispatch();

  var token = true;
  const foods = useSelector(selectFood);
  token = useSelector(selectToken);
  const calories = useSelector(selectUserCal);
  const remaining = useSelector(selectUserRem);
  const foodState = useSelector(selectfoodStatus);
  const error = useSelector(selectfoodMessage);

  const navigate = useNavigate();
  useEffect(() => {
    const calories = localStorage.getItem("calories");

    if (calories === "false" || !calories) {
      navigate("/calories");
    }
    if (choice === "Name") {
      dispatch(show_all_food(token));
    }
    if (choice === "Lowest Cal") {
      dispatch(show_all_food_asc(token));
    }
    if (choice === "Highest Cal") {
      dispatch(show_all_food_desc(token));
    }
    return () => {};
  }, [choice, token, dispatch, navigate]);

  useEffect(() => {
    dispatch(checkauth());
  }, [foodState, dispatch, navigate]);

  useEffect(() => {
    setFoodsfiltered([]);
    const toot = [];

    foods.map((item) => {
      if (!filtered && !search) {
        toot.push(item);
        return "";
      }
      if (filtered && !search) {
        if (min <= item.calories && item.calories <= max) {
          toot.push(item);
        }
      }
      if (search && !filtered) {
        if (item.name.includes(searchWord)) {
          toot.push(item);
        }
      }
      if (search && filtered) {
        if (item.name.includes(searchWord)) {
          if (min <= item.calories && item.calories <= max) {
            toot.push(item);
          }
        }
      }
      return "";
    });
    setFoodsfiltered(toot);
  }, [filtered, foods, min, max, search, searchWord]);

  const handlelogout = () => {
    dispatch(logout());

    localStorage.clear();
    navigate("/login");
  };

  const handleCalories = () => {
    dispatch(removeCalories());
    navigate("/calories");
  };
  return (
    <div>
      <br />
      <button
        className={isMobile ? "logout-button-m" : "logout-button"}
        onClick={handlelogout}
      >
        Logout{" "}
      </button>
      <button
        className={isMobile ? "calories-button-m" : "calories-button"}
        onClick={handleCalories}
      >
        Edit calorie intake{" "}
      </button>

      <div className={isMobile ? "searchbar-div-m" : "searchbar-div"}>
        <SearchBar setSearchWord={setSearchWord} setSearch={setSearch} />
      </div>
      {isMobile ? (
        ""
      ) : (
        <div
          style={{
            backgroundColor: "rgba(128, 128, 128, 0.2)",
            height: "1.5vw",
            color: "black",
            fontSize: "1vw",
            width: "70vw",
            marginLeft: "15.5vw",
            textAlign: "center",
            borderRadius: "0.25vw",
          }}
          className={foodState === "succeed" ? "notificationBar" : ""}
        >
          {foodState === "loading" ? (
            "loading"
          ) : foodState === "succeed" ? (
            "Food item added Succesfully"
          ) : foodState === "failed" ? (
            <div>{error}</div>
          ) : (
            "Click to add items"
          )}{" "}
        </div>
      )}
      {isMobile ? (
        ""
      ) : (
        <div className="titles-div">
          <div className="title1-div">Goal</div>
          <div className="title2-div">Food Items</div>
          <div className="filter-div">
            <Sort setChoice={setChoice} choice={choice} />
          </div>
        </div>
      )}
      <div className={isMobile ? "main-div-m" : "main-div"}>
        <div className={isMobile ? "calories-div-m" : "calories-div"}>
          <Caloriescard text={"Total Calories Needed"} number={calories} />
          <Caloriescard text={"Remaining Calories"} number={remaining} />
        </div>
        {isMobile ? <SortM setChoice={setChoice} choice={choice} /> : ""}
        <div className={isMobile ? "food-div-m" : "food-div"}>
          {foodsfiltered.map((item) => {
            return (
              <Foodcard
                key={item.id}
                name={item.name}
                cal={item.calories}
                serving={item.serving}
                id={item.id}
              />
            );
          })}
        </div>
      </div>
      <Filter
        setFiltered={setFiltered}
        setMax={setMax}
        min={min}
        max={max}
        setMin={setMin}
      />
    </div>
  );
}
