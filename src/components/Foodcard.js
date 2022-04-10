import React, { useEffect } from "react";
import "../css/foodcard.css";
import { subtract_calories } from "../features/food/foodSlice";
import food from "../images/food.png";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../features/user/userSlice";
import axios from "axios";
import { backendLink } from "../keys_dev";
import { isMobile } from "react-device-detect";

export default function Foodcard(props) {
  const dispatch = useDispatch();
  const [src, setSrc] = React.useState(food);

  const token = useSelector(selectToken);
  const asyncFn = async () => {
    await axios({
      method: "post",
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
      url: `${backendLink}/show_one_food`,
      data: { id: props.id },
    }).then((response) => {
      if (response.data.route !== null) {
        setSrc(`${backendLink}/${response.data.route}`);
      }
    });
  };
  useEffect(() => {
    asyncFn();

    return () => {};
  });

  const handleclick = (user) => {
    console.log(token);
    dispatch(subtract_calories({ calories: props.cal, token: token }));
  };
  return (
    <div className={isMobile ? "cardfood-m" : "cardfood"}>
      <div className={isMobile ? "image-div-m" : "image-div"}>
        <img
          className={isMobile ? "image-m" : "image"}
          alt="img"
          src={src}
        ></img>
      </div>
      <div className={isMobile ? "name-m" : "name"}>{props.name} </div>
      <div className={isMobile ? "cal-m" : "cal"}>
        Calories: {props.cal} cal per {props.serving} g
      </div>
      <button
        className={isMobile ? "card-button-m" : "card-button"}
        onClick={handleclick}
      >
        Add item
      </button>
    </div>
  );
}
