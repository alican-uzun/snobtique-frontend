import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../auth/AuthContext";
import "./SignIndex.css";
import logo512 from "../../assets/logo512.png";

function SignIndex() {
  let { authState } = useContext(AuthContext);

  return authState.isAuth ? (
    <Redirect to={"/home"} />
  ) : (
    <div className="container">
      <div className="col1">
      <article
      className="article"
      >
      <h1 className="headerText">Welcome to Snobtique🎉</h1>
      <h1 className="headerText">You are now on the center of Music Critique🎵</h1>
      </article>
        <div className="info">
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="col2">
        <div className="menu">
          <img className="logo512" src={logo512} />
          <span className="header">Join to Snobtique now!</span>
          <div className="buttons">
            <Link to="/signup" className="mainSignup">
              <div className="mainSignupItem">
                <span className="mainSignupText">Sign Up</span>
              </div>
            </Link>
            <Link to="/login" className="mainLogin">
              <div className="mainLoginItem">
                <span className="mainLoginText">Login</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIndex;
