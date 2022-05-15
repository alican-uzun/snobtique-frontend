import React, { useContext, useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "./Widgets.css";
import Topics from "./Topics/Topics";
import Links from "./Links/Links";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";
import { useHistory } from "react-router-dom";

function Widgets() {
  let { authState } = useContext(AuthContext);
  let history = useHistory();

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await axios
      .get("https://snobtique.herokuapp.com/api/v1/user", {
        headers: {
          Authorization: `Bearer ${authState.tokens.access.token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUsers([]);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.username}
        </span>
      </>
    );
  };

  const handleOnSelect = (e) => {
    history.push(`/Profile/${e.id}`);
  };

  return (
    <div className="widgets">
      <ReactSearchAutocomplete
        resultStringKeyName="username"
        fuseOptions={{
          keys: ["username"],
        }}
        items={users}
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
        styling={{ zIndex: 10 }}
        placeholder="Search Snobers!"
      />
      <Topics />
      <Links />
    </div>
  );
}

export default Widgets;