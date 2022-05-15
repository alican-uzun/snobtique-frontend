import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authTypes = {
    LOGIN: "LOGIN",
    UPDATE: "UPDATE",
  };

  let initial = {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    tokens: localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null,
    isAuth: localStorage.getItem("user") ? true : false,
    loading: false,
  };

  const [authState, setState] = useState(initial);

  const dispatchAuth = (action, payload) => {
    switch (action) {
      case "LOGIN":
        setState({
          ...authState,
          user: payload.user,
          tokens: payload.tokens,
          isAuth: true,
        });
        return;
      case "UPDATE":
        setState({
          ...authState,
          user: JSON.parse(localStorage.getItem("user")),
        });
        return;
      default:
        return;
    }
  };

  const login = (email, password) => {
    return axios
      .post("https://snobtique.herokuapp.com/api/v1/auth/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("tokens", JSON.stringify(res.data.tokens));
        dispatchAuth(authTypes.LOGIN, {
          user: res.data.user,
          tokens: res.data.tokens,
        });
        return true;
      })
      .catch((err) => {
        console.log(err);
        return true;
      });
  };

  const register = (username, email, password) => {
    return axios
      .post("https://snobtique.herokuapp.com/api/v1/auth/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("tokens", JSON.stringify(res.data.token));
        dispatchAuth(authTypes.LOGIN, {
          user: res.data.user,
          tokens: res.data.token,
        });
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const update = () => {
    dispatchAuth(authTypes.UPDATE);
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, update }}>
      {children}
    </AuthContext.Provider>
  );
};
