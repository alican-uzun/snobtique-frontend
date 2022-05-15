import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import "./Login.css";
import loginLogo from "../../assets/logo512.png";

function Login() {
  let history = useHistory();
  const [data, setData] = useState({ email: "", password: "" });
  const [cursor, setCursor] = useState('crosshair');
  const hStyle = { color: 'white' };

  let { authState, login } = useContext(AuthContext);

  const changeCursor = () => {
    setCursor(prevState => {
      if(prevState === 'crosshair'){
        return 'pointer';
      }
      return 'crosshair';
    });
  }

  const submit = async () => {
    let isLogined = await login(data.email, data.password);
    console.log({ isLogined });
    if (isLogined) {
      history.push("/home");
    }
  };

  return !authState.isAuth ? (
    <div className="container">
      <div className="panel">
        <div className="panelHeader">
          <img className="loginLogo" src={loginLogo} />
          <span className="panelHeaderText">Login to Snobtique</span>
        </div>
        <div className="inputs">
          <div className="textInputRow">
            <label
              for="Email"
              className="textInputLabel"
              style={{ visibility: data.email === "" ? "visible" : "hidden" }}
            >
            </label>
            <input
              type="text"
              className="textInputLogin"
              name="email"
              placeholder="Email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
            />
          </div>
          <div className="textInputRow">
            <label
              for="Password"
              className="textInputLabel"
              style={{
                visibility: data.password === "" ? "visible" : "hidden",
              }}
            >
            </label>
            <input
              type="password"
              className="textInputLogin"
              name="password"
              placeholder="Password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              value={data.password}
            />
          </div>
        </div>
        <button
          className="loginBtn"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            border: "3px solid #5ddcff",
            borderRadius: "9999px",
          }}
          onClick={() => {
            changeCursor();
            console.log("Button");
            submit();
          }}
        >
          <span className="loginText">Login</span>
        </button>
        <div className="loginLinks">
          <span className="point"></span>
          <h1 style={ hStyle }>You do not have an account?</h1>
          <a href="/signup">
            <span className="link">Sign up now!</span>
          </a>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to={"home"} />
  );
}

export default Login;
