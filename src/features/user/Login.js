import React from "react";
import "../../css/generic.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userLogin } from "./userSlice";

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
    <div className="App-header">
      <div className={"main-card"}>
        {/* Use the Submit handler with our own submit handler*/}
        <form>
          <h1>Login to an existing account</h1>{" "}
          <div style={{ color: "red", fontSize: "1vw" }}>
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
            onChange={handleChange}
            name="email"
            type="text"
            id="email"
            className="email"
            placeholder="E-mail"
            label="Email"
            component="input"
          />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            id="password"
            className="password"
            placeholder="Password"
            label="Password"
            component="input"
          />
          <button type="button" onClick={onLogin}>
            SIGN IN
          </button>
          <br />
          <a href="/signup">Don't have an account?</a>
        </form>
      </div>
    </div>
  );
}
