import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";
import { useParams } from "react-router-dom";

function Follow() {
  let { authState, update } = useContext(AuthContext);
  let { id } = useParams();
  return id !== authState.user.id && !authState.user.following.includes(id) ? (
    <div className="follow">
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          axios
            .post(
              `https://snobtique.herokuapp.com/api/v1/user/follow/${authState.user.id}/${id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${authState.tokens.access.token}`,
                },
              }
            )
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res.data));
              update();
            });
        }}
      >
        Follow
      </span>
    </div>
  ) : (
    <div className="unfollow">
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          axios
            .post(
              `https://snobtique.herokuapp.com/api/v1/user/unfollow/${authState.user.id}/${id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${authState.tokens.access.token}`,
                },
              }
            )
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res.data));
              update();
            });
        }}
      >
        Unfollow
      </span>
    </div>
  );
}

export default Follow;