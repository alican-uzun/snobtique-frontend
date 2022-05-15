import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../../auth/AuthContext";
import "./TopicItem.css";
import { toast } from 'react-toastify';

const TopicItem = ({ category, title, id, answer, getGame }) => {
  let { authState, update } = useContext(AuthContext);

  return (
    <div
      className="widgetsTopicsItem"
      onClick={() => {
        if (id === answer) {
          toast.success('🦄 Correct Answer! +4 Point.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          axios
            .post(
              `https://snobtique.herokuapp.com/api/v1/game/${authState.user.id}`,
              {
                answer: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${authState.tokens.access.token}`,
                },
              }
            )
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res.data));
              update();
              getGame();
            });
        }
        else {
          toast.error('⚠️ Answer Was Wrong! -1 Point.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          axios
            .post(
              `https://snobtique.herokuapp.com/api/v1/game/${authState.user.id}`,
              {
                answer: false,
              },
              {
                headers: {
                  Authorization: `Bearer ${authState.tokens.access.token}`,
                },
              }
            )
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res.data));
              update();
              getGame();
            });
        }
      }}
    >
      <div className="widgetsTopicCategory">
        <span>{category}</span>
      </div>
      <span className="widgetsTopicTitle">{title}</span>
    </div>
  );
};

export default TopicItem;