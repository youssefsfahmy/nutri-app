import React from "react";
import "../../css/generic.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userLogin } from "./userSlice";

import { isMobile } from "react-device-detect";

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const userStatus = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const onLogin = async (user) => {
    await dispatch(userLogin(state)).then((token) => {
      if (token) {
        navigate("/homepage");
      }
    });
  };

  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }
  // useEffect(() => {
  //   const token1 = localStorage.getItem("token");
  //   if (token1) {
  //     navigate("/");
  //   }
  // });

  // useEffect(() => {
  //   if (token !== "") {
  //     if (!calories) {
  //       setTimeout(() => navigate("/calories"), 2000);
  //     }
  //     setTimeout(() => navigate("/"), 2000);
  //   }

  //   return () => {};
  // }, [token]);

  return (
    <div className={isMobile ? "App-header-m" : "App-header"}>
      <div className={isMobile ? "main-card-m" : "main-card"}>
        {/* Use the Submit handler with our own submit handler*/}
        <form>
          <h1 className={isMobile ? "h1-m" : ""}>
            Login to an existing account
          </h1>{" "}
          <div style={{ color: "red", fontSize: isMobile ? "3vw" : "1vw" }}>
            {userStatus === "loading" ? (
              "loading"
            ) : userStatus === "succeeded" ? (
              "DONE"
            ) : userStatus === "failed" ? (
              <div>{error}</div>
            ) : userStatus === "succeededd" ? (
              "Signed up successfuly please login!"
            ) : (
              ""
            )}
          </div>
          <input
            className={isMobile ? "input-m" : ""}
            onChange={handleChange}
            name="email"
            type="text"
            id="email"
            placeholder="E-mail"
            label="Email"
            component="input"
          />
          <input
            className={isMobile ? "input-m" : ""}
            onChange={handleChange}
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            label="Password"
            component="input"
          />
          <button
            type="button"
            className={isMobile ? "button-m" : ""}
            onClick={onLogin}
          >
            SIGN IN
          </button>
          <br />
          <a className={isMobile ? "a-m" : ""} href="/signup">
            Don't have an account?
          </a>
        </form>
      </div>
    </div>
  );
}
