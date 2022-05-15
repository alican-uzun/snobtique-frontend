import React, { useContext } from "react";
import SignIndex from "../../pages/SignIndex/SignIndex";
import Login from "../../pages/Login/Login";
import { Route, Switch } from "react-router-dom";
import Signup from "../../pages/Signup/Signup";
import Private from "./Private";
import { NotifiProvider } from "../../notifications/NotifiContext";
import { AuthContext } from "../../auth/AuthContext";

function Router() {
  let { authState } = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/" component={SignIndex} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />

      {authState.user && (
        <NotifiProvider>
          <Private />
        </NotifiProvider>
      )}

      <Route path="*" component={SignIndex} exact />
    </Switch>
  );
}

export default Router;
