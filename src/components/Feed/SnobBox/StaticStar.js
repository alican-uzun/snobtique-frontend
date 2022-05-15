import React, { Component } from "react";
import EmptyStar from "../../../assets/empty-star.svg";
import FilledStar from "../../../assets/filled-star.svg";
import "./StaticStar.css";

class StaticStars extends Component {
  constructor(props) {
    super(props);
    console.log("rating ", props.rating);
    this.rating = props.rating;
  }

  render() {
    return [...Array(this.props.starCount).keys()].map((index) => {
      return (
        <img
          data-value={index + 1}
          className="staticStar"
          onMouseOver={this.onHover}
          onClick={this.onClick}
          src={index + 1 <= this.rating ? FilledStar : EmptyStar}
          alt={
            index + 1 <= this.rating ? "filled star" : "empty star"
          }
        />
      );
    });
  }
}

const StaticRatingSystem = (props) => {
  return (
    <div>
      <div className="rating">
        <StaticStars starCount={props.starCount} rating = {props.rating}/>
      </div>
    </div>
  );
};

export default function StaticStar(props) {
  return (
    <div className="staticStar">
      <StaticRatingSystem starCount={5} rating = {props.rating}/>
    </div>
  );
}