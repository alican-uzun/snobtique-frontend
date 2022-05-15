import React, { useState, useEffect, useContext } from "react";
import "./SnobBox.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Star from "./Star";
import { AuthContext } from "../../../auth/AuthContext";
import axios from "axios";

function SnobBox({ getFeed }) {
  let { authState } = useContext(AuthContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      await axios
        .get("https://snobtique.herokuapp.com/api/v1/song", {
          headers: {
            Authorization: `Bearer ${authState.tokens.access.token}`,
          },
        })
        .then((res) => {
          setSongs(res.data);
        });
    };
    getSongs();
  }, []);

  const [snob, setSnob] = useState({
    song_id: "",
    comment: "",
  });

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          Name: {item.name}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          Band: {item.band}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          Album: {item.album}
        </span>
      </>
    );
  };

  const handleOnSelect = (e) => {
    setSnob({ ...snob, song_id: e.id });
  };

  const snobSubmit = (e) => {
    e.preventDefault();
    if (snob.text.trim() === "" || snob.song.trim() === "") return;
    var rating = localStorage.getItem("currRating");
    setSnob({ ...snob, currRating: rating, id: Math.random() * 10 + 2 });
  };

  return (
    <>
      <form className="snobBox" onSubmit={(e) => snobSubmit(e)}>
        <Star />
        <div className="snobBoxRow">
          <div className="snobBox-input-row">
            <textarea
              value={snob.comment}
              onChange={(e) => setSnob({ ...snob, comment: e.target.value })}
              className="snobBox-input"
              placeholder="Let's critique that latest song!"
              type="textarea"
              aria-multiline={true}
              maxLength={4000}
            />
          </div>
        </div>
        
        <div className="snobBoxRow">
          <div style={{flex: 1}}>
          <ReactSearchAutocomplete
              resultStringKeyName="name"
              fuseOptions={{
                keys: ["name"],
              }}
              items={songs}
              border="1px solid #00ADB5"
              onSelect={handleOnSelect}
              autoFocus
              formatResult={formatResult}
              placeholder="Search the song!"
              styling={{ zIndex: 10, width:"100%", backgroundColor: "#EEEEEE", hoverBackgroundColor: "#00ADB5", fontSize: "19px" }}
            />
          </div>
           <div style={{marginLeft: 10}}>
           <button
              type="submit"
              className="snobBox-button"
              onClick={(e) => {
                e.preventDefault();
                axios
                  .post(
                    "https://snobtique.herokuapp.com/api/v1/rating",
                    {
                      song_id: snob.song_id,
                      user_id: authState.user.id,
                      score: localStorage.getItem("currRating")
                        ? parseInt(localStorage.getItem("currRating"))
                        : 1,
                      comment: snob.comment,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${authState.tokens.access.token}`,
                      },
                    }
                  )
                  .then((res) => {
                    localStorage.setItem(
                      "user",
                      JSON.stringify(res.data.user_id)
                    );
                    getFeed();
                    localStorage.removeItem("currRating");
                    setSnob({ song_id: "", comment: "" });
                    // });
                  });
              }}
            >
              Snobtique!
            </button>
           </div>
        </div>
      </form>
      <div className="bottomBorder"></div>
    </>
  );
}

export default SnobBox;