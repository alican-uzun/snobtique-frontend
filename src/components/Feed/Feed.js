import React, { useContext, useEffect, useState } from "react";
import "./Feed.css";
import SnobBox from "./SnobBox/SnobBox";
import Post from "./Post/Post";
import Loading from "../Loading/Loading";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";
import feedLogo from "../../assets/g_logo512.png";

function Feed() {
  let { authState } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = useState([]);

  const getFeed = () => {
    axios
      .get(`https://snobtique.herokuapp.com/api/v1/user/feed`, {
        headers: {
          Authorization: `Bearer ${authState.tokens.access.token}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <section className="feed">
      <div className="feed-header">
      <img className="feedLogo" src={feedLogo} />
        <div className="feed-headerText">
          <span>
            <h1>
              <center>Snobtique</center>
            </h1>
          </span>
        </div>
      </div>
      <SnobBox getFeed={getFeed} />
      {loading ? (
        <Loading />
      ) : (
        <article>
          {posts.map((post, i) => (
            <Post key={post.id} post={post} i={i} />
          ))}
          {posts.map((post) => console.log(post))}
        </article>
      )}
    </section>
  );
}

export default Feed;
