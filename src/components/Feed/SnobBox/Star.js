import React, { Component } from "react";
import EmptyStar from "../../../assets/empty-star.svg";
import FilledStar from "../../../assets/filled-star.svg";
import "./Star.css";

class Stars extends Component {
  constructor(props) {
    super(props);

    if (props.posted !== undefined) {
      this.state = {
        currRating: 1,
        posted: true,
        prevRating: 1,
      };
    } else {
      this.state = {
        currRating: 1,
      };
    }

    this.onHover = this.onHover.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onHover(e) {
    if (this.state.posted === true) return;

    if (e.target.className === "star") {
      this.setRating(e.target.dataset.value);
    }
  }

  onClick(e) {
    if (e.target.dataset.value === this.state.currRating) {
      this.setRating(e.target.dataset.value);
      localStorage.setItem("currRating", this.state.currRating);
    }
  }

  setRating(value) {
    this.setState({ currRating: value });
  }

  render() {
    return [...Array(this.props.starCount).keys()].map((index) => {
      return (
        <img
          data-value={index + 1}
          className="star"
          onMouseOver={this.onHover}
          onClick={this.onClick}
          src={index + 1 <= this.state.currRating ? FilledStar : EmptyStar}
          alt={
            index + 1 <= this.state.currRating ? "filled star" : "empty star"
          }
        />
      );
    });
  }
}

const RatingSystem = (props) => {
  return (
    <div>
      <div className="rating">
        <Stars starCount={props.starCount} posted={props.posted} />
      </div>
    </div>
  );
};

export default function Star(props) {
  return (
    <div className="Star">
      <RatingSystem starCount={5} posted={props.posted} />
    </div>
  );
}
