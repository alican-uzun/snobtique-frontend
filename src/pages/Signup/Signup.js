import React, { useContext, useState } from "react";
import "./Signup.css";
import { AuthContext } from "../../auth/AuthContext";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import signupLogo from "../../assets/logo512.png";

function Signup() {
  let history = useHistory();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  let { authState, register } = useContext(AuthContext);

  const submit = async () => {
    let isLogined = await register(
      data.username,
      data.email,
      data.password
    );
    console.log({ isLogined });
    if (isLogined) {
      history.push("/home");
    }
  };

  return !authState.isAuth ? (
    <div className="signUpContainer">
      <div className="card">
        <div className="signupHeader">
          <img className="signupLogo" src={signupLogo} />
          <span>Create your Snobtique gladiator!</span>
        </div>
        <div className="textInputRow">
          <label
            for="Name"
            className="textInputLabel"
            style={{ visibility: data.username === "" ? "visible" : "hidden", }}
          >
          </label>
          <input
            type="text"
            className="textInputSignUp"
            placeholder="Username"
            name="name"
            onChange={(e) => setData({ ...data, username: e.target.value })}
            value={data.username}
          />
        </div>
        <div className="textInputRow">
          <label
            for="Email"
            className="textInputLabel"
            style={{ visibility: data.email === "" ? "visible" : "hidden" }}
          >
          </label>
          <input
            type="text"
            className="textInputSignUp"
            placeholder="Email"
            name="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
        </div>
        <div className="textInputRow">
          <label
            for="Password"
            className="textInputLabel"
            style={{ visibility: data.password === "" ? "visible" : "hidden", }}
          >
          </label>
          <input
            type="password"
            placeholder="Password"
            className="textInputSignUp"
            name="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
          />
        </div>
        <div className="acceptTerm">
          <span>
            You agree to the 
            <span className="acceptTermBlue"></span> <a href="https://www.freeprivacypolicy.com/live/d3389e72-83fb-430c-921f-f634c9b4fcf4"> Privacy Policy</a> when you register.
          </span>
        </div>
        <button
          className="signupBtn"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            border: "3px solid #5ddcff",
            borderRadius: "9999px",
          }}
          onClick={() => {
            console.log("Button");
            submit();
          }}
        >
          <span className="loginText">Join now!</span>
        </button>
         You have an account?
        <div className="signupLinks">
          <span className="point"></span>
          <a href="/login">
            <span className="link">Login</span>
          </a>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to={"home"} />
  );
}

export default Signup;
