import React from "react";
import { isMobile } from "react-device-detect";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import "../../css/generic.css";
import "../../css/signup.css";
import { userSignup } from "./userSlice";

export default function Signup() {
  const [state, setState] = React.useState({
    user: {
      email: "",
      password: "",
      password_confirmation: "",
      fullname: "",
    },
  });
  const userStatus = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }
  const onSignup = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      await dispatch(userSignup(state));
    } else {
      e.target.reportValidity();
    }
    if (userStatus === "succeededd") {
      navigate("/login");
    }
  };

  // useEffect(() => {
  //   const token1 = localStorage.getItem("token");
  //   if (token1) {
  //     navigate("/calories");
  //   }
  // });

  return (
    <div className={isMobile ? "App-header-m" : "App-header"}>
      <div className={isMobile ? "main-card-m" : "main-card"}>
        <h1 className={isMobile ? "h1-m" : ""}>Create a new account</h1>
        <form onSubmit={onSignup}>
          <input
            className={isMobile ? "input-m" : ""}
            required="required"
            onChange={handleChange}
            type="fullName"
            name="fullname"
            placeholder="Full Name"
          />
          <input
            className={isMobile ? "input-m" : ""}
            required="required"
            onChange={handleChange}
            type="Email"
            name="email"
            placeholder="E-mail"
          />
          <input
            className={isMobile ? "input-m" : ""}
            pattern="(?=.*\d)(?=.*[\W_]).{7,}"
            title="Minimum of 7 characters. Should have at least one special character and one number."
            required="required"
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            className={isMobile ? "input-m" : ""}
            required="required"
            onChange={handleChange}
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
          />
          <br />
          <div
            style={
              userStatus === "failed"
                ? {
                    backgroundColor: "rgba(128, 0, 0, 0.2)",
                    height: "1.5vw",
                    color: "rgba(230, 0, 0, 0.7)",
                    fontSize: "1vw",
                    width: "30vw",
                    marginLeft: "5vw",
                    textAlign: "center",
                    borderRadius: "0.5vw",
                    transform: "3s linear",
                  }
                : userStatus === "succeededd"
                ? {
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                    height: "1.5vw",
                    color: "rgba(0, 230, 0, 0.7)",
                    fontSize: "1vw",
                    width: "30vw",
                    marginLeft: "5vw",
                    textAlign: "center",
                    borderRadius: "0.5vw",
                    opacity: "1",
                    transform: "3s linear",
                  }
                : {
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                    height: "1.5vw",
                    color: "rgba(0, 230, 0, 0.7)",
                    fontSize: "1vw",
                    width: "30vw",
                    marginLeft: "5vw",
                    textAlign: "center",
                    borderRadius: "0.5vw",
                    opacity: "0.1",
                    transform: "3s linear",
                  }
            }
          >
            {userStatus === "loading" ? (
              "loaading"
            ) : userStatus === "succeededd" ? (
              <a href="/login">Success! Click to sign in</a>
            ) : userStatus === "failed" ? (
              <div>{error}</div>
            ) : (
              ""
            )}
          </div>

          <br />
          <button className={isMobile ? "button-m" : ""}>Sign up </button>
          <br />
          <a className={isMobile ? "a-m" : ""} href="/login">
            Already have an account?
          </a>
        </form>
      </div>{" "}
    </div>
  );
}
