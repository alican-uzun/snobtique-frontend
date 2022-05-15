import React, { useContext, useEffect, useState } from "react";
import "./Topics.css";
import TopicItem from "./TopicItem/TopicItem";
import axios from "axios";
import { AuthContext } from "../../../auth/AuthContext";

function Topics() {
  let { authState } = useContext(AuthContext);

  const [songs, setSongs] = useState([]);
  const [correctSong, setCorrectSong] = useState(null);

  useEffect(() => {
    getGame();
  }, []);

  const getGame = () => {
    axios
      .get("https://snobtique.herokuapp.com/api/v1/game", {
        headers: {
          Authorization: `Bearer ${authState.tokens.access.token}`,
        },
      })
      .then((res) => {
        setSongs(res.data.songs);
        setCorrectSong(res.data.correctSong._id);
      });
  };

  return (
    <div className="widgetsTopics">
      <div className="widgetsTopicsHeader">
        <span>Which one's score is higher?</span>
      </div>
      {songs.map((v, i) => {
        return (
          <TopicItem
            category={v.band}
            title={v.name}
            answer={correctSong}
            id={v._id}
            getGame={getGame}
            key={i}
          />
        );
      })}
    </div>
  );
}

export default Topics;