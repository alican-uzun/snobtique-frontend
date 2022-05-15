import React, { useContext } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../auth/AuthContext";
import { Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Notifications from "../../pages/Notifications/Notifications";
import Profile from "../../pages/Profile/Profile";
import Lists from "../../pages/Lists/Lists";

function Private() {
  let { authState } = useContext(AuthContext);

  return authState.isAuth ? (
    <>
      <Route path="/home" component={Home} exact />
      <Route path="/Notifications" component={Notifications} exact />
      <Route path="/Lists" component={Lists} exact />
      <Route path="/Profile" component={Profile} exact />
      <Route path="/Profile/:id" component={Profile} exact />
    </>
  ) : (
    <Redirect to={"/"} />
  );
}

export default Private;
