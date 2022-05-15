import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

export const NotifiContext = createContext();

export const NotifiProvider = ({ children }) => {
  let { authState } = useContext(AuthContext);

  const [notifis, setNotifis] = useState([]);
  const [haveNewNotifi, setHaveNewNotifi] = useState(false);

  useEffect(() => {
    getNotifis();
    let interval = setInterval(() => {
      getNotifis();
    }, 1000 * 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getNotifis = () => {
    axios
      .get(
        `https://snobtique.herokuapp.com/api/v1/notification/user/${authState.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${authState.tokens.access.token}`,
          },
        }
      )
      .then((res) => {
        setNotifis(res.data);
        let haveNew = res.data.find((x) => x.opened === false);
        if (haveNew) {
          setHaveNewNotifi(true);
        }
      });
  };

  return (
    <NotifiContext.Provider
      value={{ notifis, haveNewNotifi, setHaveNewNotifi }}
    >
      {children}
    </NotifiContext.Provider>
  );
};
