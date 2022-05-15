import React from "react";
import moment from "moment";
import { Avatar } from "@material-ui/core";
import "./Post.css";
import StaticStar from "../SnobBox/StaticStar";

function Post({ post, i }) {
  return (
    <div className="post">
      <div>
        <Avatar src={`https://picsum.photos/20${i}`} />
      </div>
      <div className="post-content-col">
        <div className="post-header">
          <span className="post-header-username">
            {"-" + post.user_id.username}
          </span>
          <span className="post-header-date">
            {moment(post.created_date).fromNow()}
          </span>
        </div>
        <div className="post-song-content" style={{ marginTop: "10px" }}>
          {post.song_id.name}
        </div>
        <div className="post-content" style={{ marginTop: "10px" }}>
          {post.comment}
        </div>
        <div className="post-event">
          <div style={{ marginTop: "10px" }}>
            <StaticStar posted={true} rating={post.score} />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Post;
