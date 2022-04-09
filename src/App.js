import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import "./css/generic.css";
import Homepage from "./features/food/Homepage";
import Login from "./features/user/Login";
import Signup from "./features/user/Signup";
import { checkauth } from "./features/user/userSlice";
import Calories from "./features/user/Calories";

// const requireAuth = (nextState, replace) => {
//   if (!localStorage.getItem("token")) {
//     replace({
//       pathname: "/login",
//     });
//   }
// };
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requireAuth = async (nextState, replace) => {
    await dispatch(checkauth("app"));

    if (
      !localStorage.getItem("token") &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup"
    ) {
      navigate("/login");
    }
    if (
      localStorage.getItem("token") &&
      (window.location.pathname === "/" ||
        window.location.pathname === "/login" ||
        window.location.pathname === "/signup")
    ) {
      navigate("/homepage");
    }
  };

  // const [token, setToken] = useState();
  // setToken(localStorage.getItem("token"));

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  return (
    <div style={{ overflowX: "clip" }}>
      <Routes>
        <Route
          exact
          path="/homepage"
          onEnter={requireAuth()}
          element={<Homepage />}
        />

        <Route path="login" element={<Login />} />
        <Route path="calories" element={<Calories />} />

        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
export default App;
