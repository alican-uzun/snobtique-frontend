import React from "react";
import "./NewRating.css";
import NewRatingIcon from "@material-ui/icons/Star";
import { Avatar } from "@material-ui/core";

const NewRating = ({ ratingPost }) => {
  return (
    <div className="NewRating">
      <NewRatingIcon />
      <div>
        <div>
          {ratingPost.ratingUser.map((user) => (
            <Avatar src={user.userImage} />
          ))}
        </div>
        <span>
          <b>{ratingPost.ratingUser[0].username}</b> rating new song!
        </span>
        <span>{ratingPost.post}</span>
      </div>
    </div>
  );
};

export default NewRating;