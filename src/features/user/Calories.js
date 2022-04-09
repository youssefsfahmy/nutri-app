import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import "../../css/generic.css";
import "../../css/signup.css";
import { addCalories } from "./userSlice";

export default function Calories() {
  const navigate = useNavigate();

  const [caloriesin, setCaloriesin] = React.useState(1);

  // useEffect(() => {
  //   if (calories !== null && calories != "") {
  //     setTimeout(() => navigate("/homepage"), 2000);
  //   }

  //   return () => {};
  // }, [calories]);
  const dispatch = useDispatch();

  function handleChange(e) {
    setCaloriesin(parseInt(e.target.value));
  }
  const onSignup = async (e) => {
    e.preventDefault();
    var x = false;
    if (e.target.checkValidity()) {
      x = await dispatch(addCalories(caloriesin));
    } else {
      e.target.reportValidity();
    }
    if (x) {
      localStorage.setItem("calories", true);

      navigate("/homepage");
    }
  };

  return (
    <div className="App-header">
      <div className={"main-card"}>
        <h1>Please set your calorie daily intake!</h1>

        <form onSubmit={onSignup}>
          <label>
            <input
              required={true}
              type="number"
              name="caloriesperday"
              placeholder="Calories needed/day"
              onChange={handleChange}
            />

            <br />
            <button> Finish </button>
            <br />
          </label>
        </form>
      </div>{" "}
    </div>
  );
}
